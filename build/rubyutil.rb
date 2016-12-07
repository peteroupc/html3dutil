#!/usr/bin/ruby
# Utility methods for Ruby.  Peter O., 2013-2016.
# Any copyright is dedicated to the Public Domain.
# http://creativecommons.org/publicdomain/zero/1.0/
#
# If you like this, you should donate to Peter O.
# at: http://peteroupc.github.io/

require 'digest'
require 'fileutils'
require 'json'
require 'tmpdir'
begin
 require 'fiddle'
rescue LoadError
 begin
 require 'Win32API'
rescue LoadError; end
end
require 'rexml/document'
require 'rexml/formatters/pretty'
require 'rexml/formatters/transitive'

class Win32 # Wrapper class for Win32API
  @function=nil
  def initialize(dll, func, args, retval)
    @dll=dll;@func=func
    if (Win32API rescue nil)
      @function=Win32API.new(dll,func,args,retval)
    else
      lib=Fiddle.dlopen(dll)
      retvalp=Fiddle::TYPE_VOID
      argsp=[]
      retval.scan(/(.)/){|c|
        if c[0]=="i"
          retvalp=Fiddle::TYPE_INT
        elsif c[0]=="l"
          retvalp=Fiddle::TYPE_INT
        elsif c[0]=="f" # probably not supported by real Win32API
          retvalp=Fiddle::TYPE_FLOAT
        elsif c[0]=="d" # probably not supported by real Win32API
          retvalp=Fiddle::TYPE_DOUBLE
        elsif c[0]=="p"
          retvalp=Fiddle::TYPE_VOIDP
        else
          raise ArgumentError.new
        end
      }
      args.scan(/(.)/){|c|
        if c[0]=="i"
          argsp.push Fiddle::TYPE_INT
        elsif c[0]=="l"
          argsp.push Fiddle::TYPE_INT
        elsif c[0]=="d" # probably not supported by real Win32API
          argsp.push Fiddle::TYPE_DOUBLE
        elsif c[0]=="f" # probably not supported by real Win32API
          argsp.push Fiddle::TYPE_FLOAT
        elsif c[0]=="p"
          argsp.push Fiddle::TYPE_VOIDP
        else
          raise ArgumentError.new
        end
      }
      @function=Fiddle::Function.new(lib[func],argsp,retvalp)
    end
  end
  def call(*args)
    @function.call(*args)
  end
end

begin
 SetErrorMode=Win32.new('kernel32.dll','SetErrorMode','i','')
 SetErrorMode.call(0x8001) # Don't show a dialog box on Windows if files on removable storage can't be accessed
rescue; end

def nextUtf8(str,index)
 utf8tbl = [
  [0x00,0x7F,0   ,0   ,0x7F,0],
  [0xC2,0xDF,0x80,0xBF,0x1F,1],
  [0xE0,0xE0,0xA0,0xBF,0x0F,2],
  [0xE1,0xEC,0x80,0xBF,0x0F,2],
  [0xED,0xED,0x80,0x9F,0x0F,2],
  [0xEE,0xEF,0x80,0xBF,0x0F,2],
  [0xF0,0xF0,0x90,0xBF,0x07,3],
  [0xF1,0xF3,0x80,0xBF,0x07,3],
  [0xF4,0xF4,0x80,0x8F,0x07,3],
  [0   ,0   ,0   ,0   ,0   ,0]
 ]
 length=str.length
 if index==length
  return -1
 end
 b1=str[index,1].unpack("C")[0]
 index+=1
 return b1 if b1<0x80
 row=0
 ret=0
 while (utf8tbl[row][4]&&((b1<utf8tbl[row][0])||(b1>utf8tbl[row][1])))
  row+=1
 end
 utfrow=utf8tbl[row]
 if utfrow[4]==0
  return -1
 end
 ret=(b1&utfrow[4])
 if utfrow[5]==0
  return ret
 end
 trail=str[index,utfrow[5]]
 index+=utfrow[5]
 if trail.length!=utfrow[5]
  return -1
 end
 utfrow[5].times do |i|
  tbyte=trail[i,1].unpack("C")[0]
  if i==0
   if(tbyte<utfrow[2]||tbyte>utfrow[3])
    return -1
   end
  else
   if(tbyte<0x80||tbyte>0xBF)
    return -1
   end
  end
  ret=(ret<<6)|(tbyte&0x3F)
 end
 return ret
end

def utf8Length(cp)
 return 1 if cp<=0x7F
 return 2 if cp<=0x7FF
 return 3 if cp<=0xFFFF
 return 4
end

def utf8ToWideChar(text,kind=:nullTerminated)
   index=0
   cp=0
   codepoints=[]
   while ((cp=nextUtf8(text,index))>=0)
   if cp>=0x10000 && cp<=0x10ffff
     c1 = ((cp - 0x10000) >> 10) + 0xd800
     c2 = ((cp - 0x10000) & 0x3ff) + 0xdc00
    codepoints.push(c1)
    codepoints.push(c2)
   else
    codepoints.push((cp<0 || cp>0x10ffff) ? 0x3F : cp)
   end
    index+=utf8Length(cp)
   end
  if kind==:nullTerminated
    codepoints.push(0)
  else
    codepoints.unshift(codepoints.length)
   end
   return codepoints.pack("v*")
 end

def appendUtf8(str,codepoint)
 return str if codepoint<0
 if codepoint<=0x7F
  str+=codepoint.chr
 elsif codepoint<=0x7FF
  str+=(0xC0|((codepoint>>6)&0x1F)).chr
  str+=(0x80|(codepoint   &0x3F)).chr
 elsif codepoint<=0xFFFF
  str+=(0xE0|((codepoint>>12)&0x0F)).chr
  str+=(0x80|((codepoint>>6)&0x3F)).chr
  str+=(0x80|(codepoint   &0x3F)).chr
 elsif codepoint<=0x10FFFF
  str+=(0xF0|((codepoint>>18)&0x07)).chr
  str+=(0x80|((codepoint>>12)&0x3F)).chr
  str+=(0x80|((codepoint>>6)&0x3F)).chr
  str+=(0x80|(codepoint   &0x3F)).chr
 end
 return str
end

def getFreeFile(dest)
  ext=getExt(dest)
  base=changeExt(dest,"")
  fn=base;i=0
  while FileTest.exist?(fn+ext)
    fn=base+i.to_s
    i+=1
  end
  return changeExt(fn,ext)
end

def getFreeFileNumbered(dest)
  ext=getExt(dest)
  base=changeExt(dest,"")
  i=0
  fn=""
  newfn=""
  loop do
    fn=base+i.to_s
    i+=1
    newfn=fn+ext
    break if !FileTest.exist?(newfn)
  end
  return newfn
end

class REXML::Document
  def save(file)
    File.open(file,"wb:utf-8"){|f|
      REXML::Formatters::Pretty.new(2,false).write(self,f)
    }
  end
  def saveCompact(file)
    File.open(file,"wb:utf-8"){|f|
      REXML::Formatters::Default.new(false).write(self,f)
    }
  end
  def addElement(name,text=nil)
   child=REXML::Element.new(name,self)
   if text
     child.add_text(text)
   end
   return child
  end
  def addElementNS(name,ns=nil,text=nil)
    child=nil
    if text && text.include?("\n")
      child=REXML::Element.new(name,self,{:respect_whitespace=>:all})
    else
      child=REXML::Element.new(name,self)
    end
   if ns
     child.add_namespace(ns)
   end
   if text
     child.add_text(text)
   end
   return child
  end
end

# Adds a number of utility classes for XML elements
class REXML::Element
  class Builder
    def initialize; @s=[]; end
    def <<(v); @s.push(v); end
    def to_s; return @s.join(""); end
  end
  def setInnerXML(xml)
    els=[]
    els2=[]
    self.each{|e| els.push(e) }
    begin
     xmldoc=REXML::Document.new("<root>"+xml+"</root>")
    rescue
     raise "Can't set XML to: "+xml+"\n"+$!.message
    end
    xmldoc.root.each{|e| els2.push(e) }
    els.each{|e| self.delete(e) }
    els2.each{|e| self.add(e) }
  end
  def innerXML(pretty=false)
    builder=Builder.new
    formatter=(pretty) ?
      REXML::Formatters::Pretty.new(2,false) :
      REXML::Formatters::Default.new(false)
    each{|node|
       formatter.write(node,builder)
    }
    return builder.to_s
  end
  def save(file)
    File.open(file,"w"){|f|
      REXML::Formatters::Default.new(false).write(self,f)
    }
  end
  def attrs(x)
    # Adds a hash of attribute-value pairs
    #  like:{"attr1"=>"value1","attr2"=>"value2"}
    # or an array like: [["attr1","value1"],["attr2","value2"]]
    if x.is_a?(Hash)
      for k in x.keys
       add_attribute(k,x[k].to_s)
      end
    elsif x.is_a?(Array)
      for k in x
       add_attribute(k[0],k[1].to_s)
      end
    end
    self
  end
  def addElementReturnSelf(name,text=nil)
    addElement(name,text)
    return self
  end
  def addElement(name,text=nil)
   child=REXML::Element.new(name,self)
   if text
     child.add_text(text)
   end
   return child
  end
  def addElementNS(name,ns=nil,text=nil)
    child=REXML::Element.new(name,self)
   if ns
     child.add_namespace(ns)
   end
   if text
     child.add_text(text)
   end
   return child
  end
 class ElementIterator
  include Enumerable
  def initialize(e); @e=e; end
  def each; @e.each {|item| yield item if item.kind_of?(REXML::Element) }; end
 end
 def elems
  return ElementIterator.new(self)
 end
  def getElementsByTagName(name)
    name=nil if name=="*"
    ret=[]; self.eachElementNamedRecursive(name){|o| ret.push(o); }; return ret
  end
 def eachElement
  # Faster version of REXML::Element#elements, since it avoids
  # invoking XPath
  self.each { |child| yield child if child.kind_of?(REXML::Element) }
 end
 def eachElementNamed(name)
  self.each { |child| yield child if child.kind_of?(
       REXML::Element) && (name==nil || child.name==name) }
 end
 def eachElementNamedRecursive(name,&block)
  eachElement(){|child|
   if child.name==name || name==nil
     block.call(child)
   end
   child.eachElementNamedRecursive(name,&block)
  }
end
 def firstElementNamed(name)
  eachElementNamed(name){|e| return e }
  nil
 end
 def firstElementNamedRecursive(name)
  eachElementNamedRecursive(name){|e| return e }
  nil
 end
 def innerText
  ret=""
  self.each { |child|
   ret+=child.value if child.kind_of?(REXML::Text)
   ret+=child.innerText if child.kind_of?(REXML::Element)
  }
  return ret
 end
end

# Make the default entity expansion limit a bit more sensible
# in case text has many, many entities to expand
if REXML.respond_to?("entity_expansion_text_limit") &&
   REXML.entity_expansion_text_limit < 99999999
 REXML.entity_expansion_text_limit = 99999999
end

def daysInMonth(year,month)
  return 29 if month==2 && (year%4==0 && (year%100!=0 || year%400==0))
  return [0,31,28,31,30,31,30,31,31,30,31,30,31][month]
end

def fastExpandPath(f)
  # Can be significantly faster than expand_path
  # for simple paths
  if !f[/[\/\\]/] && f!="." && f!=".."
    pwd=Dir.pwd.sub(/\/$/,"")+"/"
    return pwd+f
  end
  return File.expand_path(f)
end

class Array
 def shuffle
  self.clone.shuffle!
 end
 def ^(other) # xor of two arrays
  return (self|other)-(self&other)
 end
 def shuffle!
  return self if self.length<2
  i=self.length-1; while i>=1
   other=rand(i+1)
   if i!=other
    obj=self[i]; self[i]=self[other]; self[other]=obj
   end
  i-=1;end
  return self
 end
 def rearrange(sortproc,thenbyproc=nil,random=false)
  self.clone.rearrange!(sortproc,thenbyproc,random)
 end
 def rearrange!(sortproc,thenbyproc=nil,random=false)
  return self if self.length<2
  self.sort!{|a,b|
    ret=sortproc.call(a,b)
    next ret
  }
  if !thenbyproc && !random
    return self
  end
  blocks=[[0,1]]
  for i in 1...self.length
   if sortproc.call(self[i-1],self[i])==0 # Both are equal
    blocks[blocks.length-1][1]+=1
   else
    blocks.push([i,1])
   end
  end
  if random
   blocks.shuffle!
  end
  newArray=[]
  for b in blocks
   if b[1]==1
     newArray.push(self[b[0]])
   else
     subArray=self[b[0],b[1]]
     subArray=subArray.clone if subArray===self
     thenbyproc.call(subArray) if thenbyproc
     newArray.concat(subArray)
   end
  end
  self[0,self.length]=newArray
  return self
 end
end

module Enumerable
  def transform_with_index # Converts each item in the enumerable, taking the item and index as arguments
    ret=[]
    i=0; self.each{|item| ret.push(yield(item,i)); i+=1 }
    return ret # Returns a new array
  end
end

def iswin32()
  !!RUBY_PLATFORM[/djgpp|bccwin|mingw|cygwin|mswin/]
end

def getFileName(f) # Gets the base path without the extension
  return changeExt(File.basename(f||""),"")
end

$setCreationTimeHelper={
"CreateFile"=>(Win32.new('kernel32.dll','CreateFileA','piiliil','l') rescue nil),
"SetFileTime"=>(Win32.new('kernel32.dll','SetFileTime','lpll','i') rescue nil),
"CloseHandle"=>(Win32.new('kernel32.dll','CloseHandle','l','') rescue nil)
}
# Supports setting a file's creation time on Windows
def setCreationTime(f,t)
 if $setCreationTimeHelper['CreateFile']
   handle=$setCreationTimeHelper['CreateFile'].call(f,0x40000000,0,0,3,0,0)
   raise Errno::ENOENT.new if handle==0xFFFFFFFF
   begin
    # Convert from Unix time to Windows Filetime
    filetime=116444736000000000+(t.to_f.floor.to_i)*10000000
    filetime+=((t.to_f-t.to_f.floor)*10000000).to_i
    ftdata=[
     (filetime&0xFFFFFFFF),
     ((filetime>>32)&0xFFFFFFFF)].pack("VV")
    $setCreationTimeHelper['SetFileTime'].call(handle,ftdata,0,0)
   ensure
    $setCreationTimeHelper['CloseHandle'].call(handle)
   end
 end
end

def getExt(f) # Gets the extension including the dot
  return "" if !f
  File.basename(f).scan(/(\.[^\.]+)$/){|m|
    return m[0].downcase
  }
  return ""
end

def changeExt(f,ext) # Changes the extension.  Must include the dot
  return "" if !f
  return f if !ext || /[\/\\]/=~ext
  if f.include?("/") || f.include?("\\")
    ridx1=f.rindex("/")||-1
    ridx2=f.rindex("\\")||-1
    ridx=[ridx1,ridx2].max+1
    return f[0,ridx]+changeExt(f[ridx,f.length],ext)
  end
  ext=ext.sub(/^\./,"")
  if ext.length>0
    ext="."+ext
  end
  if f.include?(".")
   return f.sub(/\.[^\.\/\\]+$/i,ext)
  else
   return f+ext
  end
end

def forceMove(s,d)
  return false if !FileTest.exist?(s)
  return true if s==d
  dn=File.dirname(d)
  if !FileTest.directory?(dn)
    begin
      FileUtils.mkdir_p(dn)
    rescue Errno::ENOSPC
      return false
    end
  end
  begin
    FileUtils.mv(s,d,{:force=>true})
  rescue ArgumentError
    s=File.expand_path(s)
    d=File.expand_path(d)
    if s!=d
      FileUtils.mv(s,d,{:force=>true})
    else
      return FileTest.exist?(d)
    end
  end
  return FileTest.exist?(d)
end

def forceCopy(s,d)
  if !s || !FileTest.exist?(s)
   return false
 end
  dn=File.dirname(d)
  if !FileTest.directory?(dn)
    begin
     FileUtils.mkdir_p(dn)
    rescue Errno::ENOSPC
     return false
    end
  end
   if s!=d
    FileUtils.cp(s,d) # rescue nil
   end
   return FileTest.exist?(d)
end

def tryDelete(f)
 if FileTest.directory?(f)
   begin
    FileUtils.rm_rf(f)
    return true
   rescue
    return false
   end
 else
  begin
   File.delete(f)
   return true
  rescue Errno::ENOENT
   ex=File.expand_path(f)
   if iswin32() && f.length>=260
     ex="\\\\?\\"+ex.gsub(/\//,"\\")
     delfile=Win32.new("kernel32.dll","DeleteFileW","p","")
     delfile.call(utf8ToWideChar(ex))
     return FileTest.exist?(f)
   else
     return false
   end
  rescue
   return false
  end
 end
end

GetFileAttributes=Win32.new('kernel32.dll','GetFileAttributesW','p','i') rescue nil
def isSymLink?(f)
  if iswin32() && GetFileAttributes
    # check reparse point attribute on Win32
    # p [f,sprintf("%08X",GetFileAttributes.call(utf8ToWideChar(f)))]
    return (GetFileAttributes.call(utf8ToWideChar(f)) & 0x400)!=0
  else
    return FileTest.symlink?(f)
  end
end

# dirs - true: include directories matching the regular expression
#   false: don't include directories
#  :dirsonly : include directories only
# recurse - recurse subdirectories
# NOTE: Skips links to directories
def globRecurse(dir,regex,dirs=false,recurse=true,&block)
 if regex.is_a?(String)
   # Convert glob pattern to a regex
  x=regex.gsub(/([\|\.\\\{\}\(\)\[\]\/\$\^\+\-\&])/){ "\\"+$1 }
  x=x.gsub(/\*/,".*")
  x=x.gsub(/\?/,".")
  regex=Regexp.new("^"+x+"$","i")
 end
 ret=(!block_given?) ? [] : nil
 withinyield=false
 begin
  dirpath=dir.sub(/[\/\\]+$/,"")+"/"
  Dir.foreach(dir){|filename|
   next if filename=="." || filename==".."
   realname=dirpath+filename
   runfunc=false
   begin
    if recurse && !(filename=="." || filename=="..") &&
         FileTest.directory?(realname) &&
         !isSymLink?(realname) # NOTE: Symbolic links are skipped
     withinyield=true
     newret=globRecurse(realname,regex,dirs,recurse,&block)
     withinyield=false
     ret.concat(newret) if !block_given?
    end
    if regex=~filename && (dirs==true ||
         (dirs==false && FileTest.file?(realname)) ||
         (dirs==:dirsonly && FileTest.directory?(realname)))
     if block_given?
      runfunc=true
     else
      ret.push(realname)
     end
    end
   rescue Exception;
    if ($!.is_a?(Interrupt) || $!.is_a?(SystemExit) || withinyield)
       withinyield=true; raise
    end
   end
   if runfunc
    withinyield=true;yield(realname);withinyield=false
   end
  }
 rescue Exception
  if ($!.is_a?(Interrupt) || $!.is_a?(SystemExit) || withinyield)
    raise
  end
 end
 return ret
end

def latestTime(f) # Gets the latest time of a filename string
    # or among an array of filenames
  if f.is_a?(String)
    return (FileTest.exist?(f)) ? File.mtime(f) : Time.at(0)
  else
    return (f.length==0) ? Time.at(0) : f.map{|ff|
      FileTest.exist?(ff) ? File.mtime(ff) : Time.at(0)
    }.max
  end
end

def keepCreationDate(f)
  ctime=File.ctime(f) rescue nil
  begin
    yield f
  ensure
    if ctime && (File.ctime(f) rescue nil)!=ctime
      setCreationTime(ctime) rescue nil
    end
  end
end

def keepDate(f)
  mtime=File.mtime(f) rescue nil
  ctime=File.ctime(f) rescue nil
  begin
    yield f
  ensure
    if mtime && (File.mtime(f) rescue nil)!=mtime
      FileUtils.touch(f,{:mtime=>mtime}) rescue nil
    end
    if ctime && (File.ctime(f) rescue nil)!=ctime
      setCreationTime(ctime) rescue nil
    end
  end
end
def isNonZeroSize?(f)
 begin
  return FileTest.size(f)>0
 rescue
  return false
 end
end

# Deletes a file only if its size is zero
def deleteZeroSize(f)
 begin
  tryDelete(f) if FileTest.size(f)==0
 rescue
  return false
 end
end
class String
def endsWith?(suffix)
 return self.length>=suffix.length ? (self[self.length-suffix.length,suffix.length]==suffix) : false
end
def endsWithIgnoreCase?(suffix)
 return self && self.length>=suffix.length ? (
      self[s.length-suffix.length,suffix.length].upcase==suffix.upcase) : false
end
end
def getByExt(arr,*exts)
 return arr.find_all {|a| exts.any?{|ext|
   if ext && ext[0,1]!="."
    ext="."+ext
   end
   next getExt(a)==ext
  }
 }
end

# Quotes a filename to appear in a command line argument, except
# that slashes are changed to backslashes on Windows
def ffq(f)
 ret=fq(f)
 if iswin32()
  ret=ret.gsub(/[\/\\]/,"\\")
 end
 return ret
end

# Escapes a filename to appear in a command line argument
# for Posix and Posix-like shells
def ufq(f)
  return "''" if !f || f.length==0
  if f.include?("'") || f[ /^[\-]/ ]
   return f.gsub( /([\'\s\,\;\&\(\)\[\]\|\"\$\\\#\*\?<>\,\;\|]|^[\-\/])/ ){ "\\"+$1 }
  end
  if f[ /[\s\(\)\$\\\#\&\*\?<>\,\;\|]/ ]
   return "'"+f+"'"
  else
   return f
  end
end

# Escapes a filename to appear in a command line argument.
# Uses double quotes on Windows.
def fq(f)
 if !iswin32()
   return ufq(f)
 else
  if f && f[ /^[\-]/ ]
    # Filenames starting with hyphen may be misinterpreted
    # as command line options in some programs, even if they're
    # quoted, so add ".\" to avoid this
   return "\".\\"+(f.gsub(/([\"])/){ "'" })+"\""
  elsif f && f[ /[\"\s\,\;\&<>]|^[\-\/]/ ]
   return "\""+(f.gsub(/([\"])/){ "'" })+"\""
  elsif !f || f.length==0
   return "\"\""
  else
   return f
  end
 end
end

# Returns defValue if str is nil, false, or empty; str otherwise
# Will always be a string
def strOrDefault(str,defValue)
 if (!str||str=="")
  return defValue ? defValue : ""
 end
 return str
end

# Reads a binary file to a string.
def binaryread(x)
  File.open(x,"rb"){|f| return f.read }
end

def utf8clean(data)
    ec1=Encoding::Converter.new("utf-8","utf-16",{
      :undef=>:replace,
      :invalid=>:replace
    })
    ec2=Encoding::Converter.new("utf-16","utf-8",{
      :undef=>:replace,
      :invalid=>:replace,
      :replace=>"\uFFFD"
    })
    data=ec1.convert(data)
    data=ec2.convert(data)
    return data
end

# Reads a UTF-8 file to a string, ignoring the byte order mark.
def utf8read(x)
  File.open(x,"rb"){|f|
    if f.getbyte!=0xef || f.getbyte!=0xbb || f.getbyte!=0xbf
      f.pos=0 # skip UTF-8 byte order mark
    end
    return utf8clean(f.read)
  }
end

# Writes a UTF-8 string to a file
def utf8write(str,f)
  ff=nil
  begin
   begin
    ff=File.open(f,"wb:utf-8")
   rescue Errno::EACCES, Errno::EPERM
    return
   end
   ff.write(str) if ff
  ensure
   ff.close if ff
  end
end

def utf8edit(file,createIfNotFound=false)
  data=""
  found=false
  if !FileTest.exist?(file)
    return if !createIfNotFound
  else
    found=true
    data=utf8read(file)
  end
  return if !data
  data2=yield(data.clone)
  if (createIfNotFound && !found) ||
      (data2!=data && data2!=nil) # nil check for sanity
    utf8write(data2||"",file)
  end
end

def makesafefn(x)
  return (x||"_").gsub(/[^A-Za-z0-9_\.\-&,\'\! ]/,"_")
end

def cachefolder()
 cache=Dir.home()+"/.cache"
 return FileTest.directory?(cache) ? cache : Dir.tmpdir()
end

def normalizeLines(x)
  return x if !x || x.length==0 # do nothing if string is nil or empty
  return normalizeLinesNoTrailing(x)+"\n"
end

def normalizeLinesNoTrailing(x)
  return x if !x || x.length==0 # do nothing if string is nil or empty
  x=x.gsub(/[ \t]+(?=[\r\n]|\z)/,"") # trim spaces at end of line
  x=x.gsub(/\r*\n(\r*\n)+/,"\n\n") # collapse three or more blank lines to two
  x=x.gsub(/\r*\n/,"\n") # normalize line endings
  x=x.gsub(/\A\s*/,"") # Ensure no leading spaces at start of file
  x=x.gsub(/\s+\z/,"") # Ensure no trailing spaces at end of file
  return x
end

def sha1hash(f)
  return Digest::SHA1.new.update(f).hexdigest
end

# Gets an unused filename in the temporary
# folder, whose name is based on the given filename,
# and starts a block returning that name.  When
# the block returns, deletes the file with that name.
def tmppath(file)
  ret=getFreeFile(Dir.tmpdir()+"/"+file)
  if block_given?
    begin
      yield(ret)
    ensure
      tryDelete(ret)
    end
  end
  return ret
end

$runcmdpath=nil;

def setRunCmdExtraPath(path)
  $runcmdpath=path;
end

def runcmd(cmd,err=nil)
 ret=""
 if !iswin32()
  err=(!err) ? "/dev/null" : ffq(err)
  ret=`#{cmd} 2>#{err}`
 else
  err=(!err) ? "nul" : ffq(err)
  if cmd.index("copy ")==0
    ret=`#{cmd} 2>#{err}`
  else
    if $runcmdpath
     firstcmd=(/\s/=~cmd) ? cmd.split(/\s+/)[0] : cmd
     endcmd=cmd[firstcmd.length,cmd.length]
     if firstcmd.length>0
        firstcmdpath=$runcmdpath+"/"+firstcmd+".exe"
        if !FileTest.exist?(firstcmdpath)
         firstcmdpath=$runcmdpath+"/"+firstcmd
         if !FileTest.exist?(firstcmdpath)
          firstcmdpath=firstcmd
         else
          firstcmdpath=ffq(firstcmdpath)
        end
       else
        firstcmdpath=ffq(firstcmdpath)
       end
     end
     cmd=firstcmdpath+endcmd
    end
    ret=`#{cmd} 2>#{err}`
  end
 end
 return ret
end

def copyIfNewer(srcFile,dstFile)
 forceCopy(srcFile,dstFile) if isNewerOrDifferentSize(srcFile,dstFile)
end

# Return true if 'srcFile' is newer than 'dstFile' or has a different size or 'dstFile' doesn't exist
def isNewerOrDifferentSize(srcFile,dstFile)
 return false if !FileTest.exist?(srcFile)
 if FileTest.directory?(dstFile)
  dstFile=dstFile.sub(/\/$/,"")+"/"+File.basename(srcFile)
 end
 return true if !FileTest.exist?(dstFile)
 sizedst=(FileTest.size(dstFile).to_i rescue 0)
 sizesrc=(FileTest.size(srcFile).to_i rescue 0)
 return true if sizedst!=sizesrc
 mtimedst=(File.mtime(dstFile).to_i rescue nil)
 mtimesrc=(File.mtime(srcFile).to_i rescue nil)
 if ((mtimedst-mtimesrc).abs<=2)
  return false
 end
 return true if (mtimedst<mtimesrc)
 return false
end

# Return true if 'srcFile' is newer than 'dstFile' or 'dstFile' doesn't exist
def isNewer(srcFile,dstFile)
 return false if !FileTest.exist?(srcFile)
 if FileTest.directory?(dstFile)
  dstFile=dstFile.sub(/\/$/,"")+"/"+File.basename(srcFile)
 end
 return true if !FileTest.exist?(dstFile)
 mtimedst=(File.mtime(dstFile).to_i rescue 0)
 mtimesrc=(File.mtime(srcFile).to_i rescue 0)
 if ((mtimedst-mtimesrc).abs<=2)
  sizedst=(FileTest.size(dstFile).to_i rescue 0)
  sizesrc=(FileTest.size(srcFile).to_i rescue 0)
  return false if sizedst==sizesrc
 end
 return true if (mtimedst<mtimesrc)
 return false
end

class CacheHash
 def initialize(file)
  @loaded=false
  @data={}
  @changed=false
  @file=file
  at_exit { persist }
 end
 def length
   ensureData()
   return @data.length
 end
 def ensureData
  if !@loaded
   if FileTest.exist?(@file) && FileTest.size(@file)>0
    begin
      @data=JSON.parse(utf8read(@file))
    rescue
      @data={}
    end
   end
   @loaded=true
  end
 end
 def persist
  if @data.length>0 && @changed
   begin
    jsondata=JSON.generate(@data)
   rescue Encoding::UndefinedConversionError
    # try to find the faulty object to help debug the issue
    for val in @data.keys
     begin; JSON.generate([val])
     rescue Encoding::UndefinedConversionError
     raise "Can't encode the object: "+val.inspect
     end
     begin; JSON.generate([@data[val]])
     rescue Encoding::UndefinedConversionError
     raise "Can't encode the object: "+@data[val].inspect
     end
    end
    raise
   end
   utf8write(jsondata,@file)
  end
 end
 def clear()
   ensureData()
   @data={}
   utf8write("{}",@file)
 end
 def delete(key)
   ensureData()
   found=true
   retval=(block_given?) ? (@data.delete(key){ found=false; yield(key) }) :
               (@data.delete(key){ found=false; nil })
   if found
     @changed=true
     if rand([25,@data.length/20].max)==0
       # Persist to disk every once in a while
       persist
     end
   end
   return retval
 end
 def keys
  ensureData()
  @data.keys
 end
 def [](x)
  ensureData()
  return @data[x]
 end
 def []=(x,value)
  ensureData()
  oldvalue=@data[x]
  @data[x]=value
  if oldvalue!=value
    @changed=true
    if rand([25,@data.length/20].max)==0
      # Persist to disk every once in a while
      persist
    end
  end
 end
end

def cleanCacheHash(hash)
  for k in hash.keys
    if !FileTest.exist?(k)
      hash.delete(k)
    end
  end
  hash.persist if hash.respond_to?("persist")
end

# Gets data associated with a file on disk
# from the cache.
def getDataFromCache(file,cache)
 mtime=File.mtime(file) rescue nil
 return nil if !mtime
 size=nil
 file=fastExpandPath(file).gsub(/\\/,"/")
 olddata=cache[file]
 retval=nil
 if !olddata || (olddata[1].to_i rescue 0)!=mtime.to_i ||
    olddata[2]!=(size=FileTest.size(file))
  # Block takes the filename as the argument
  # and returns an arbitrary value to add to
  # the cache
  retval=yield(file)
  size=(FileTest.size(file) rescue 0) # always re-retrieve the size even if it has changed
  mtime=(File.mtime(file) rescue 0)
  newdata=[retval,mtime.to_i,size]
  if olddata==nil || Marshal.dump(newdata)!=Marshal.dump(olddata)
   cache[file]=newdata
  end
 else
  retval=olddata[0]
 end
 return retval
end

######################
#
#   Deprecated methods
#

# Deprecated; use "map" instead
module Enumerable
  def transform # Converts each item in the enumerable, taking the item as the argument
    ret=[]
    self.each{|item| ret.push(yield(item)) }
    return ret # Returns a new array
  end
end
# Deprecated
def endsWith?(s,suffix); return s && s.endsWith?(suffix); end
# Deprecated
def endsWithIgnoreCase?(s,suffix); return s && s.endsWithIgnoreCase?(suffix); end
# Deprecated
def homepath(); return Dir.home(); end
# Deprecated
def tmpfolder(); return Dir.tmpdir(); end
# Deprecated; use idiom (File.size(f) rescue 0) instead
def fsize(f)
 return FileTest.exist?(f) ? (FileTest.size(f) rescue 0) : 0
end

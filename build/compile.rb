Dir.chdir(File.dirname(__FILE__))
require './rubyutil'
require 'fileutils'

if !FileTest.exist?("compiler.jar")
  STDERR.puts("The Closure Compiler (compiler.jar) is needed to minify the HTML 3D library. "+
    "Download the Closure Compiler JAR and put it in the same directory "+
    "as this script. (Running the Closure Compiler requires a Java runtime environment.)")
  exit
end

def normalizeFile(f)
  return if getExt(f)==".jpg"
  return if getExt(f)==".png"
  utf8edit(f){|data| normalizeLines(data) }
end

def normalizeAndCompile(input, output, advanced=false)
  return if !FileTest.exist?(input)
  normalizeFile(input)
  utf8edit(output,true){|data|
   formatting=(false) ? "--formatting PRETTY_PRINT" : ""
   opt=(advanced) ? "ADVANCED_OPTIMIZATIONS" : "SIMPLE_OPTIMIZATIONS"
   cmd="java -jar compiler.jar #{formatting} "+
     "--generate_exports --language_in ECMASCRIPT6 --language_out ECMASCRIPT3 "+
     "--compilation_level #{opt} --create_source_map #{ffq(input)} #{ffq(input)}"
   olddata=data
   log=""
   tmppath("err.log"){|errlog|
    data=runcmd(cmd,errlog)
    log=utf8read(errlog)
   }
   puts log if log.length>0
   data=normalizeLines(data)
   # sanity check: don't overwrite if new data is empty
   next data.length==0 ? olddata : data
  }
end

tmppath("glutil.js"){|tmp|
 utf8write(
  utf8read("../promise.js")+";\n"+
  utf8read("../glmath.js")+";\n"+
  utf8read("../glutil.js")+";\n"+
  (Dir.glob("../glutil-*.js").transform{|x| utf8read(x) }.join(";\n"))+";\n"+
  ";\n",tmp)
 normalizeAndCompile(tmp,"../glutil_min.js")
}
#!/usr/bin/ruby
Dir.chdir(File.dirname(__FILE__))
require './rubyutil'
require 'fileutils'
$compilerJar=File.expand_path("compiler.jar")
def normalizeAndCompile(inputArray, output, advanced=false, useSourceMap=false)
  if !FileTest.exist?($compilerJar)
    STDERR.puts("The Closure Compiler (compiler.jar) is needed to minify the HTML 3D library. "+
      "Download the Closure Compiler JAR and put it in the same directory "+
      "as this script. (Running the Closure Compiler requires a Java runtime environment.)")
    exit
  end
  for input in inputArray
    return if !FileTest.exist?(input)
    utf8edit(input){|data| next normalizeLines(data) }
  end
  inputs=inputArray.map{|x| "--js #{ffq(x)}" }.join(" ")
  sourceMap=output+".map"
  formatting=(false) ? "--formatting PRETTY_PRINT" : ""
  opt=(advanced) ? "ADVANCED_OPTIMIZATIONS" : "SIMPLE_OPTIMIZATIONS"
  cmd="java -jar #{ffq($compilerJar)} #{formatting} "+
     " --warning_level=VERBOSE --jscomp_off=globalThis --jscomp_off=deprecated "+
     " --generate_exports "+
     " --externs extern.js"+
     " --language_in ECMASCRIPT6 --language_out ECMASCRIPT3 "+
     "--compilation_level #{opt} #{inputs} "+
     (useSourceMap ? "--create_source_map #{ffq(sourceMap)} " : "")+
     "--js_output_file #{ffq(output)} --rewrite_polyfills false"
  log=""
  tmppath("err.log"){|errlog|
    data=runcmd(cmd,errlog)
    log=utf8read(errlog)
  }
  puts log if log.length>0
  if FileTest.exist?(output)
   utf8edit(output){|data|
     data=normalizeLines(data)
     if useSourceMap
       data+="/*# sourceMappingURL="+File.basename(sourceMap)+" */\n"
     end
     next data
   }
  end
end

require './generate-websafe-svg'

Dir.chdir(".."){
 files=%w( promise.js h3du.js )
 files|=Dir.glob("h3du-*.js")
 utf8write(
   normalizeLines(
     "/* eslint strict: \"off\", no-unused-expressions: \"off\" */\n/* global define */\n"+
       `rollup --format=umd --name=H3DU ./extras/gltf/gltf.js`),"extras/gltf.js")
 tmppath("h3du_all.js"){|p|
  utf8write(`rollup --format=umd --name=H3DU ./h3du.js`,p)
  normalizeAndCompile([p,"./oldnames.js"],"./h3du_min.js",false,ARGV.include?("--sourcemap"))
  generateSvg("doc/websafe.svg")
  generateColorNameSvg("doc/colornames.svg")
  filesForDoc=[p]|Dir.glob("extras/*.js")
  filesForDoc=filesForDoc.map{|f| ffq(f) }.join(" ")
  FileUtils.mkdir_p("doc")
  FileUtils.mkdir_p("dochtml")
  puts `jsdoc -u tutorials -t build -R README.md -d ./doc #{filesForDoc}`
  puts `jsdoc -u tutorials -t build -R README.md -d ./dochtml #{filesForDoc} -q f=html`
 }
 svgs=%w( doc/websafe.svg doc/colornames.svg).each{|s|
  `svgo -i #{ffq(s)} -o #{ffq(s)}`
 }
}

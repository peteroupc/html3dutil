/* global require */
/*
 Any copyright to this file is released to the Public Domain.
 http://creativecommons.org/publicdomain/zero/1.0/
 If you like this, you should donate
 to Peter O. (original author of
 the Public Domain HTML 3D Library) at:
 http://peteroupc.github.io/
*/

var fs = require("fs");
var os = require("os");
var process = require("process");
var cp = require("child_process");
var util=require("util");
var gwsvg = require("./generate-websafe-svg");

// Escapes a filename to appear in a command line argument
// for Posix and Posix-like shells
function ufq(f) {
  if (!f || f.length === 0)return "''";
  if (f && (/^[\-]/).test(f))
    // Filenames starting with hyphen may be misinterpreted
    // as command line options in some programs, even if they're
    // quoted, so add "./" to avoid this
    return "'./" + f + "'";
  if (f.indexOf("'") >= 0)
    return f.replace( /([\'\s\,\;\&\(\)\[\]\|\"\$\\\#\*\!\?<>\,\;\|]|^[\-\/])/g, (a, b) => "\\" + b );
  if ((/[\s\(\)\$\\\#\&\!\*\?<>\,\;\|]/).test(f))
    return "'" + f + "'";
  else
    return f;
}
// Escapes a filename to appear in a command line argument.
// Uses double quotes on Windows.
function fq(f) {
  if (process.platform !== "win32")
    return ufq(f);
  if (f && (/^[\-]/).test(f))
    // Filenames starting with hyphen may be misinterpreted
    // as command line options in some programs, even if they're
    // quoted, so add ".\" to avoid this
    return "\".\\" + f.replace(/([\"])/g, "'") + "\"";
  else if (f && (/[\"\s\,\;\&<>]|^[\-\/]/ ).test(f))
    return "\"" + f.replace(/([\"])/, "'") + "\"";
  else if(!f || f.length === 0)
    return "\"\"";
  else
    return f;
}

// Quotes a filename to appear in a command line argument, except
// that slashes are changed to backslashes on Windows
function ffq(f) {
  var ret = fq(f);
  if(process.platform === "win32")
    ret = ret.replace(/[\/\\]/g, "\\");
  return ret;
}
function normalizeLines(x) {
  if(!x)return x;
  x = x.replace(/[ \t]+(?=[\r\n]|$)/g, "");
  x = x.replace(/\r*\n(\r*\n)+/g, "\n\n");
  x = x.replace(/\r*\n/g, "\n");
  x = x.replace(/^\s*/g, "");
  x = x.replace(/\s+$/g, "");
  return x + "\n";
}

var fs_readFile=util.promisify(fs.readFile)
var fs_writeFile=util.promisify(fs.writeFile)
var fs_mkdtemp=util.promisify(fs.mkdtemp)
var fs_mkdir=util.promisify(fs.mkdir)
var fs_unlink=util.promisify(fs.unlink)
var fs_rmdir=util.promisify(fs.rmdir)
var cp_exec=util.promisify(cp.exec)
var fs_readdir=util.promisify(fs.readdir)
var fs_realpath=util.promisify(fs.realpath)

async function execAsync(cmd, outOptions) {
 try {
//console.log(cmd)
  // NOTE: Default buffer size is too small for our purposes;
 // increase to 5000 KiB
  var cpe=(await cp_exec(cmd,{maxBuffer:5000*1024}))
  if(outOptions==null)return cpe.stdout.toString()
  if(outOptions=="outerr")return cpe.stdout.toString()+
   "\n"+cpe.stderr.toString()
  if(outOptions=="err")return cpe.stderr.toString()
  return cpe.stdout.toString()
 } catch(ex) {
  if(outOptions==null)return ex.stdout.toString()
  if(outOptions=="outerr")return ex.stdout.toString()+
   "\n"+cpe.stderr.toString()
  if(outOptions=="err")return ex.stderr.toString()
  return cpe.stdout.toString()
 }
}

async function readFileAsync(filename) {
  try {
    return await fs_readFile(filename, "utf8");
  } catch(ex) {
    return "";
  }
}

async function writeFileIfNeededAsync(filename, str) {
  var oldstr = null;
  try {
    oldstr = await fs_readFile(filename, "utf8");
  } catch(ex) {
    oldstr = null;
  }
  if(oldstr !== str) {
console.log(str.length)
    await fs_writeFile(filename, str, "utf8");
  }
return filename
}

async function editFileIfNeededAsync(filename, fstr) {
  var oldstr = null;
  try {
    oldstr = await fs_readFile(filename, "utf8");
    var str = fstr(oldstr);

    if(oldstr !== str) {
      await fs_writeFile(filename, str, "utf8");
    }
  } catch(ex) {
console.log("editFile")
console.log(ex)
  }
return filename
}

async function tmppathAsync(f, cb) {
  var t = await fs_mkdtemp(os.tmpdir() + "/temp");
  await writeFileIfNeededAsync(t + "/" + f, "")
  .then(async ()=>{
    try{
      await cb(t + "/" + f);
    } finally {
      await fs_unlink(t + "/" + f)
        .then(()=>fs_rmdir(t))
    }
  });
}

async function chdirAsync(x, cb) {
  var wd = process.cwd();
  try {
    process.chdir(x);
    await cb();
  } finally {
    process.chdir(wd);
  }
}

async function mkdirAsync(p) {
  try {
    await fs_mkdir(p);
    return p
  } catch(ex) {
return p
   }
}

async function realpathAsync(p) {
  try {
    return await fs_realpath(p);
  } catch(ex) {
    return p
  }
}

async function readdirAsync(dir, regex) {
 try {
    var files=await fs_readdir(dir)
    return regex==null ? files :
        files.filter(f=>regex.test(f))
 } catch(ex) {
    return []
 }
}

async function normalizeAndCompile(compilerJar, inputArray, output,
  advanced, useSourceMap, toModule) {
  var inputs = inputArray.map((x) => "--js " + ffq(x)).join(" ");
  var sourceMap = output + ".map";
  var formatting = false ? "--formatting PRETTY_PRINT" : "";
  var opt = advanced ? "ADVANCED_OPTIMIZATIONS" : "SIMPLE_OPTIMIZATIONS";
  var cmd = "java -jar " + ffq(compilerJar) + " " + formatting + " " +
     " --warning_level=VERBOSE --jscomp_off=globalThis --jscomp_off=deprecated " +
     " --generate_exports " +
     " --externs extern.js" +
     " --language_in ECMASCRIPT6 " +
     (toModule ? "--language_out ECMASCRIPT_2017" : "--language_out ECMASCRIPT3") + " " +
     "--compilation_level " + opt + " " + inputs + " " +
     (useSourceMap ? "--create_source_map " + ffq(sourceMap) + " " : "") +
     "--js_output_file " + ffq(output) + " --rewrite_polyfills false";
  try {
   await Promise.all(inputArray.map(
     input=>editFileIfNeededAsync(input, (d) => normalizeLines(d))))
    .then(()=>execAsync(cmd,"err"))
    .then(x=>{console.log(x); return true})
    .then(()=>editFileIfNeededAsync(output, (data) => {
      data = normalizeLines(data);
      if(useSourceMap) {
        data += "/*# sourceMappingURL=" + File.basename(sourceMap) + " */\n";
      }
      return data;
    }))
   return output
  } catch(ex) {
    console.error("Note that the Closure Compiler (compiler.jar) is needed to minify the HTML 3D library. " +
      "It it doesn't exist yet, download the Closure Compiler JAR and put it in the same directory " +
      "as this script. (Running the Closure Compiler requires a Java runtime environment.)");
    process.exit();
  }
}
async function asyncMain() {
var compilerJar = await realpathAsync("compiler.jar");
await chdirAsync("..", async () => {
  var files = ["promise.js", "h3du.js"];
  files = files.concat(await readdirAsync(".",/^h3du-.*?\.js$/));
  await tmppathAsync("h3du_all.js", async (p) => {
    var filesForDoc = ["./h3du_module.js"].concat(
       await readdirAsync("extras",/^.*?\.js$/));
    filesForDoc = filesForDoc.map((f) => ffq(f)).join(" ");
    await Promise.all([mkdirAsync("doc"),mkdirAsync("dochtml")])
      .then(async ()=>writeFileIfNeededAsync("./h3du_module.js", normalizeLines(
         await execAsync("rollup --output.format=esm --name=H3DU ./h3du.js"))))
      .then(async ()=>writeFileIfNeededAsync(p,
         await execAsync("rollup --output.format=umd --name=H3DU ./h3du.js")))
      .then(()=>normalizeAndCompile(compilerJar,[p],
        "./h3du_min.js", false,
        process.argv.indexOf("--sourcemap") >= 0))
      .then(()=>Promise.all([
        execAsync("jsdoc -u tutorials -t build -R README.md -d ./doc " + filesForDoc)
         .then(x=>console.log(x)),
        execAsync("jsdoc -u tutorials -t build -R README.md -d ./dochtml " + filesForDoc + " -q f=html")
         .then(x=>console.log(x))
        ]));
  });
  var svgs = [["doc/websafe.svg", "dochtml/websafe.svg", gwsvg.generateSvg()],
    ["doc/colornames.svg", "dochtml/colornames.svg", gwsvg.generateColorNameSvg()]];
  for(var i=0;i<svgs.length;i++) {
    var s=svgs[i];
    await writeFileIfNeededAsync(s[0],s[2])
        .then(()=>execAsync("svgo -i " + ffq(s[0]) + " -o " + ffq(s[0])))
        .then(()=>readFileAsync(s[0]))
        .then((r)=>writeFileIfNeededAsync(s[1],r))
  }
});
}

asyncMain();

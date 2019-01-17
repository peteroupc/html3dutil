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
var glob = require("glob");
var process = require("process");
var cp = require("child_process");
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

function readFile(filename) {
  try {
    return fs.readFileSync(filename, "utf8");
  } catch(ex) {
    return "";
  }
}

function writeFileIfNeeded(filename, str) {
  var oldstr = null;
  try {
    oldstr = fs.readFileSync(filename, "utf8");
  } catch(ex) {
    oldstr = null;
  }
  if(oldstr !== str) {
    fs.writeFileSync(filename, str, "utf8");
  }
}

function editFileIfNeeded(filename, fstr) {
  var oldstr = null;
  try {
    oldstr = fs.readFileSync(filename, "utf8");
    var str = fstr(oldstr);

    if(oldstr !== str) {
      fs.writeFileSync(filename, str, "utf8");
    }
  } catch(ex) {
  }

}

function tmppath(f, cb) {
  var t = fs.mkdtempSync(os.tmpdir() + "/temp");
  writeFileIfNeeded(t + "/" + f, "");
  try{
    cb(t + "/" + f);
  } finally {
    fs.unlinkSync(t + "/" + f);
    fs.rmdirSync(t);
  }
}

function chdir(x, cb) {
  var wd = process.cwd();
  try {
    process.chdir(x);
    cb();
  } finally {
    process.chdir(wd);
  }
}

function fmkdir(p) {
  try {
    fs.mkdirSync(p);
  } catch(ex) {}
}

var compilerJar = fs.realpathSync("compiler.jar");
function normalizeAndCompile(inputArray, output,
  advanced, useSourceMap, toModule) {
  if(!fs.existsSync(compilerJar)) {
    console.error("The Closure Compiler (compiler.jar) is needed to minify the HTML 3D library. " +
      "Download the Closure Compiler JAR and put it in the same directory " +
      "as this script. (Running the Closure Compiler requires a Java runtime environment.)");
    process.exit();
  }
  inputArray.forEach((input) => editFileIfNeeded(input, (d) => normalizeLines(d)));
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
  cp.exec(cmd, (e, so, se) => {
    console.log(se);
    editFileIfNeeded(output, (data) => {
      data = normalizeLines(data);
      if(useSourceMap) {
        data += "/*# sourceMappingURL=" + File.basename(sourceMap) + " */\n";
      }
      return data;
    });
  });
}

chdir("..", () => {
  var files = ["promise.js", "h3du.js"];
  files = files.concat(glob.sync("h3du-*.js"));
  tmppath("h3du_all.js", (p) => {
    writeFileIfNeeded("./h3du_module.js", normalizeLines(
      cp.execSync("rollup --output.format=esm --name=H3DU ./h3du.js").toString()));
    // normalizeAndCompile([p],"./h3du_module.js",false,process.argv.indexOf("--sourcemap")>=0,true)
    writeFileIfNeeded(p, cp.execSync("rollup --output.format=umd --name=H3DU ./h3du.js").toString());
    normalizeAndCompile([p, "./oldnames.js"], "./h3du_min.js", false,
      process.argv.indexOf("--sourcemap") >= 0);
    fmkdir("doc");
    fmkdir("dochtml");
    writeFileIfNeeded("doc/websafe.svg", gwsvg.generateSvg());
    writeFileIfNeeded("doc/colornames.svg", gwsvg.generateColorNameSvg());
    var filesForDoc = ["./h3du_module.js"].concat(glob.sync("extras/*.js"));
    filesForDoc = filesForDoc.map((f) => ffq(f)).join(" ");
    console.log(cp.execSync("jsdoc -u tutorials -t build -R README.md -d ./doc " + filesForDoc).toString());
    console.log(cp.execSync("jsdoc -u tutorials -t build -R README.md -d ./dochtml " + filesForDoc + " -q f=html").toString());
  });
  var svgs = [["doc/websafe.svg", "dochtml/websafe.svg"],
    ["doc/colornames.svg", "dochtml/colornames.svg"]];
  svgs.forEach((s) => {
    console.log(cp.execSync("svgo -i " + ffq(s[0]) + " -o " + ffq(s[0])).toString());
    writeFileIfNeeded(s[1], readFile(s[0]));
  });
});

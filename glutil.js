/*
Written by Peter O. in 2015.

Any copyright is dedicated to the Public Domain.
http://creativecommons.org/publicdomain/zero/1.0/
If you like this, you should donate to Peter O.
at: http://upokecenter.dreamhosters.com/articles/donate-now-2/
*/
/**
* Contains classes and methods for easing development
* of WebGL applications.
* @module glutil
*/
(function (root, factory) {
	if (typeof define === "function" && define["amd"]) {
		define([ "exports" ], factory);
	} else if (typeof exports === "object") {
		factory(exports);
	} else {
		factory(root);
	}
}(this, function (exports) {
	if (exports.GLUtil) { return; }

/**
* Contains miscellaneous utility methods.
* @class
* @alias glutil.GLUtil
*/
var GLUtil={
/**
*  Calls a function once per frame. (If the browser doesn't
* support requestAnimationFrame or an equivalent, uses
* setTimeout to implement this method.)
* @param {Function} func The function to call.
*/
"renderLoop":function(func){
  func();
  var selfRefFunc=function(){
   func();
   window.requestAnimationFrame(selfRefFunc);
  };
  window.requestAnimationFrame(selfRefFunc);
},
/**
* Creates a 3D rendering context from an HTML canvas element,
* falling back to a 2D context if that fails.
* @param {HTMLCanvasElement} canvasElement An HTML
* canvas element.
* @return {WebGLRenderingContext} A 3D or 2D rendering context, or null
* if an error occurred in creating the context. Returns null if "canvasElement"
* is null or not an HTML canvas element.
*/
"get3DOr2DContext":function(canvasElement){
  if(!canvasElement)return null;
  if(!canvasElement.getContext)return null;
  var context=null;
  var options={antialias:true};
  try { context=canvasElement.getContext("webgl", options);
  } catch(e) { context=null; }
  if(!context){
    try { context=canvasElement.getContext("experimental-webgl", options);
    } catch(e) { context=null; }
  }
  if(!context){
    try { context=canvasElement.getContext("moz-webgl", options);
    } catch(e) { context=null; }
  }
  if(!context){
    try { context=canvasElement.getContext("webkit-3d", options);
    } catch(e) { context=null; }
  }
  if(!context){
    try { context=canvasElement.getContext("2d", options);
    } catch(e) { context=null; }
  }
  if(GLUtil.is3DContext(context)){
   context.getExtension("OES_element_index_uint");
   context.getExtension("EXT_texture_filter_anisotropic");
  }
  return context;
},
/**
* Creates a 3D rendering context from an HTML canvas element.
*
* @param {HTMLCanvasElement} canvasElement An HTML
* canvas element.
* @param {function} err A function to call if an error occurs in creating
* the context.  The function takes one parameter consisting of a human-
* readable error message.  If "err" is null, window.alert() will be used instead.
* @return {WebGLRenderingContext} A 3D rendering context, or null
* if an error occurred in creating the context.  Returns null if "canvasElement"
* is null or not an HTML canvas element.
*/
"get3DContext":function(canvasElement,err){
  var c=GLUtil.get3DOr2DContext(canvasElement);
  var errmsg=null;
  if(!c && window.WebGLShader){
    errmsg="Failed to initialize graphics support required by this page.";
  } else if(window.WebGLShader && !GLUtil.is3DContext(c)){
    errmsg="This page requires WebGL, but it failed to start. Your computer might not support WebGL.";
  } else if(!c || !GLUtil.is3DContext(c)){
    errmsg="This page requires a WebGL-supporting browser.";
  }
  if(errmsg){
   (err || window.alert)(errmsg);
   return null;
  }
  return c;
},
/**
* Returns whether the given object is a 3D rendering context.
* @return {boolean}
*/
"is3DContext":function(context){
 return context && ("compileShader" in context);
},
/**
* Utility function that returns a promise that
 * resolves after the given list of promises finishes
 * its work.
 * @param {Array<Promise>} promises - an array containing promise objects
 *  @param {Function|undefined} progressResolve - a function called as each
 *   individual promise is resolved; optional
 *  @param {Function|undefined} progressReject - a function called as each
 *   individual promise is rejected; optional
 * @return {Promise} A promise that is never rejected and resolves when
* all of the promises are each resolved or rejected. The result
 * of the promise will be an object with
 * two keys:
 *  "successes" - contains a list of results from the
 *  promises that succeeded.
 *  "failures" - contains a list of results from the
 *  promises that failed.
 */
"getPromiseResults":function(promises,
   progressResolve, progressReject){
 if(!promises || promises.length==0){
  return Promise.resolve({
    successes:[], failures:[]});
 }
 return new Promise(function(resolve, reject){
  var ret={successes:[], failures:[]};
  var totalPromises=promises.length;
  var count=0;
  for(var i=0;i<totalPromises;i++){
   var promise=promises[i];
   promise.then(function(result){
    ret.successes.push(result);
    if(progressResolve)progressResolve(result);
    count++;
    if(count==totalPromises){ resolve(ret); }
   }, function(result){
    ret.failures.push(result);
    if(progressReject)progressReject(result);
    count++;
    if(count==totalPromises){ resolve(ret); }
   });
  }
 });
},
/**
* Creates a mesh of a box (rectangular prism), which
* will be centered at the origin.
* @param {number} xSize Width of the box.
* @param {number} ySize Height of the box.
* @param {number} xSize Depth of the box.
* @return {Mesh}
*/
"createBox":function(xSize,ySize,zSize){
 // Position X, Y, Z, normal NX, NY, NZ, texture U, V
 xSize/=2.0;
 ySize/=2.0;
 zSize/=2.0;
 var vertices=[
 -xSize,-ySize,zSize,1.0,0.0,0.0,1.0,1.0,
 -xSize,ySize,zSize,1.0,0.0,0.0,1.0,0.0,
 -xSize,ySize,-zSize,1.0,0.0,0.0,0.0,0.0,
 -xSize,-ySize,-zSize,1.0,0.0,0.0,0.0,1.0,
 xSize,-ySize,-zSize,-1.0,0.0,0.0,1.0,1.0,
 xSize,ySize,-zSize,-1.0,0.0,0.0,1.0,0.0,
 xSize,ySize,zSize,-1.0,0.0,0.0,0.0,0.0,
 xSize,-ySize,zSize,-1.0,0.0,0.0,0.0,1.0,xSize,-ySize,-zSize,0.0,1.0,0.0,1.0,1.0,xSize,-ySize,zSize,0.0,1.0,0.0,1.0,0.0,-xSize,-ySize,zSize,0.0,1.0,0.0,0.0,0.0,-xSize,-ySize,-zSize,0.0,1.0,0.0,0.0,1.0,xSize,ySize,zSize,0.0,-1.0,0.0,1.0,1.0,xSize,ySize,-zSize,0.0,-1.0,0.0,1.0,0.0,-xSize,ySize,-zSize,0.0,-1.0,0.0,0.0,0.0,-xSize,ySize,zSize,0.0,-1.0,0.0,0.0,1.0,-xSize,-ySize,-zSize,0.0,0.0,1.0,1.0,1.0,-xSize,ySize,-zSize,0.0,0.0,1.0,1.0,0.0,xSize,ySize,-zSize,0.0,0.0,1.0,0.0,0.0,xSize,-ySize,-zSize,0.0,0.0,1.0,0.0,1.0,xSize,-ySize,zSize,0.0,0.0,-1.0,1.0,1.0,xSize,ySize,zSize,0.0,0.0,-1.0,1.0,0.0,-xSize,ySize,zSize,0.0,0.0,-1.0,0.0,0.0,-xSize,-ySize,zSize,0.0,0.0,-1.0,0.0,1.0]
 var faces=[0,1,2,0,2,3,4,5,6,4,6,7,8,9,10,8,10,11,12,
 13,14,12,14,15,16,17,18,16,18,19,20,21,22,20,22,23]
 return new Mesh(vertices,faces,Mesh.NORMALS_BIT | Mesh.TEXCOORDS_BIT);
},
/**
* Creates a mesh of a sphere.  The sphere
* will be centered at the origin.
* @param {number|undefined} radius Radius of the sphere.
*  If omitted, this value is 1.
* @param {number|undefined} div Number of subdivisions.
* Must be 1 or greater.  A value of 1 generates an octahedron,
* and successive values generate an increasingly fine
* approximation to a sphere.  If omitted, this
* value is 6.  There will be 2^div-1 lines
* of latitude generated (excluding the poles).
* @return {Mesh}
*/
"createSphere":function(radius,div){
var radius = 1.0;
var x, y, z;
function hasSamePoints(v,a,b,c){
 return (
   (v[a]==v[b] && v[a+1]==v[b+1] && v[a+2]==v[b+2]) ||
   (v[c]==v[b] && v[c+1]==v[b+1] && v[c+2]==v[b+2]) ||
   (v[a]==v[c] && v[a+1]==v[c+1] && v[a+2]==v[c+2]));
}
if(typeof radius=="undefined")radius=1.0;
if(typeof div=="undefined")div=6;
if(div<=0)throw new Error("div must be 1 or more")
var divisions=1<<div;
var da=(180.0/divisions);
var aCache=[];
var adaCache=[];
var bCache=[];
var tris=[];
var vertices=[];
var newStrip;
for (var i=divisions-1;i>=0;i--) {
 var a=-90.0+(180.0*i/divisions);
 if(i==0){
  aCache[0]=0; // cos(-90deg)
  aCache[1]=-1; // sin(-90deg)
 } else {
  var rada=Math.PI/180*a;
  var ca=Math.cos(rada);
  var sa=Math.sin(rada);
  aCache[i*2]=ca;
  aCache[i*2+1]=sa;
 }
 if(i==divisions-1){
  adaCache[i*2]=0; // cos(90deg)
  adaCache[i*2+1]=1; // sin(90deg)
 } else {
  adaCache[i*2]=aCache[i*2+2];
  adaCache[i*2+1]=aCache[i*2+3];
 }
}
bCache[0]=1; // cos(0deg)
bCache[1]=0; // sin(0deg)
for (var i=1;i<divisions*2;i++) {
 var b=(360.0*i/divisions);
 var radb=Math.PI/180*b;
 var cb=Math.cos(radb);
 var sb=Math.sin(radb);
 bCache.push(cb,sb);
}
for (var i=0;i<divisions;i++) {
newStrip=true;
var ca=aCache[i*2];
var sa=aCache[i*2+1];
var cada=adaCache[i*2];
var sada=adaCache[i*2+1];
var ty1=i*1.0/divisions;
var ty2=(i+1)*1.0/divisions;
var oldtx1=0;
var oldtx2=0;
for (var j=0;j<divisions*2;j++) {
var cb=bCache[j*2];
var sb=bCache[j*2+1];
var tx1=tx2;
var tx2=(divisions-j)*1.0/(divisions);
tx2-=0.25;
if(tx2<0)tx2+=1;
x = -cb * ca;
y = sa;
z = sb * ca;
// set position and normal
vertices.push(radius*x,radius*y,radius*z,-x,-y,-z,0,0);
x = -cb * cada;
y = sada;
z = sb * cada;
vertices.push(radius*x,radius*y,radius*z,-x,-y,-z,0,0);
if(!newStrip){
  var index=(vertices.length/8)-4;
  var start=index*8;
  var startTex=start+6;
  // set texture coordinates
  vertices[startTex]=tx1;
  vertices[startTex+1]=ty1;
  vertices[startTex+8]=tx1;
  vertices[startTex+9]=ty2;
  vertices[startTex+16]=tx2;
  vertices[startTex+17]=ty2;
  vertices[startTex+24]=tx2;
  vertices[startTex+25]=ty1;
  if(i==0 || i==divisions-1){
    // if this is a polar zone it's possible for two vertices
    // of a triangle to be the same, so prune triangles
    // that have at least two matching vertices
   if(!hasSamePoints(vertices,start,start+8,start+16)){
    tris.push(index,index+1,index+2);
   }
   if(!hasSamePoints(vertices,start+8,start+16,start+24)){
    tris.push(index+2,index+1,index+3);
   }
  } else {
   tris.push(index,index+1,index+2,index+2,index+1,index+3);
  }
}
newStrip=false;
}
}
return new Mesh(vertices,tris,
  Mesh.NORMALS_BIT | Mesh.TEXCOORDS_BIT);
},
/**
* Loads a text file asynchronously, using XMLHttpRequest
* @param {string} url URL of the text file to load.
* @return {Promise} A promise that resolves when the text
* file is loaded successfully (the result will be an object with
* two properties: "url", the URL of the file, and "text", the
* file's text), and is rejected when an error occurs (the
*/
"loadFileFromUrl":function(url){
 var urlstr=url;
 return new Promise(function(resolve, reject){
   var xhr=new XMLHttpRequest();
   xhr.onreadystatechange=function(e){
    var t=e.target;
    if(t.readyState==4){
     if(t.status>=200 && t.status<300){
      var resp=t.response
      if(!resp)resp=t.responseText
      resolve({url: urlstr, text: resp+""});
     } else {
      reject({url: urlstr});
     }
    }
   };
   xhr.onerror=function(e){
    reject({url: urlstr});
   }
   xhr.open("get", url, true);
   xhr.send();
 });
}
};

if(!window.requestAnimationFrame){
 window.requestAnimationFrame=window.mozRequestAnimationFrame ||
    window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;
 if(!window.requestAnimationFrame){
  window.requestAnimationFrame=function(func){
   window.setTimeout(func,17);
  }
 }
}

(function(exports){

var hlsToRgb=function(hls) {
 "use strict";
var hueval=hls[0]*1.0;//[0-360)
 var lum=hls[1]*1.0;//[0-255]
 var sat=hls[2]*1.0;//[0-255]
 lum=(lum<0 ? 0 : (lum>255 ? 255 : lum));
 sat=(sat<0 ? 0 : (sat>255 ? 255 : sat));
 if(sat===0){
  return [lum,lum,lum];
 }
 var b=0;
 if (lum<=127.5){
  b=(lum*(255.0+sat))/255.0;
 } else {
  b=lum*sat;
  b=b/255.0;
  b=lum+sat-b;
 }
 var a=(lum*2)-b;
 var r,g,bl;
 if(hueval<0||hueval>=360)hueval=(((hueval%360)+360)%360);
 var hue=hueval+120;
 if(hue>=360)hue-=360;
 if (hue<60) r=(a+(b-a)*hue/60);
 else if (hue<180) r=b;
 else if (hue<240) r=(a+(b-a)*(240-hue)/60);
 else r=a;
 hue=hueval;
 if (hue<60) g=(a+(b-a)*hue/60);
 else if (hue<180) g=b;
 else if (hue<240) g=(a+(b-a)*(240-hue)/60);
 else g=a;
 hue=hueval-120;
 if(hue<0)hue+=360;
 if (hue<60) bl=(a+(b-a)*hue/60);
 else if (hue<180) bl=b;
 else if (hue<240) bl=(a+(b-a)*(240-hue)/60);
 else bl=a;
 return [(r<0 ? 0 : (r>255 ? 255 : r)),
   (g<0 ? 0 : (g>255 ? 255 : g)),
   (bl<0 ? 0 : (bl>255 ? 255 : bl))];
}
// Converts a representation of a color to its RGB form
// Returns a 4-item array containing the intensity of red,
// green, blue, and alpha (each from 0-255)
// Returns null if the color can't be converted
exports["colorToRgba"]=function(x){
 "use strict";
 function parsePercent(x){ var c; return ((c=parseFloat(x))<0 ? 0 : (c>100 ? 100 : c))*255/100; }
 function parseAlpha(x){ var c; return ((c=parseFloat(x))<0 ? 0 : (c>1 ? 1 : c))*255; }
 function parseByte(x){ var c; return ((c=parseInt(x,10))<0 ? 0 : (c>255 ? 255 : c)); }
 function parseHue(x){ var r1=parseFloat(e[1]);if(r1<0||r1>=360)r1=(((r1%360)+360)%360); return r1; }
var e=null;
 if(!x)return null;
 var b,c,r1,r2,r3,r4,rgb;
 if((e=(/^#([A-Fa-f0-9]{2})([A-Fa-f0-9]{2})([A-Fa-f0-9]{2})$/.exec(x)))!==null){
  return [parseInt(e[1],16),parseInt(e[2],16),parseInt(e[3],16),255];
 } else if((e=(/^rgb\(\s*([\+\-]?\d+(?:\.\d+)?%)\s*,\s*([\+\-]?\d+(?:\.\d+)?%)\s*,\s*([\+\-]?\d+(?:\.\d+)?%)\s*\)$/.exec(x)))!==null){
  return [parsePercent(e[1]),parsePercent(e[2]),parsePercent(e[3]),255];
 } else if((e=(/^rgb\(\s*([\+\-]?\d+)\s*,\s*([\+\-]?\d+)\s*,\s*([\+\-]?\d+)\s*\)$/.exec(x)))!==null){
  return [parseByte(e[1]),parseByte(e[2]),parseByte(e[3]),255];
 } else if((e=(/^rgba\(\s*([\+\-]?\d+(?:\.\d+)?%)\s*,\s*([\+\-]?\d+(?:\.\d+)?%)\s*,\s*([\+\-]?\d+(?:\.\d+)?%)\s*,\s*([\+\-]?\d+(?:\.\d+)?)\s*\)$/.exec(x)))!==null){
  return [parsePercent(e[1]),parsePercent(e[2]),parsePercent(e[3]),parseAlpha(e[4])];
 } else if((e=(/^rgba\(\s*([\+\-]?\d+)\s*,\s*([\+\-]?\d+)\s*,\s*([\+\-]?\d+)\s*,\s*([\+\-]?\d+(?:\.\d+)?)\s*\)$/.exec(x)))!==null){
  return [parseByte(e[1]),parseByte(e[2]),parseByte(e[3]),parseAlpha(e[4])];
 } else if((e=(/^#([A-Fa-f0-9]{1})([A-Fa-f0-9]{1})([A-Fa-f0-9]{1})$/.exec(x)))!==null){
  var a=parseInt(e[1],16); b=parseInt(e[2],16); c=parseInt(e[3],16);
  return [a+(a<<4),b+(b<<4),c+(c<<4),255];
 } else if((e=(/^hsl\(\s*([\+\-]?\d+(?:\.\d+)?)\s*,\s*([\+\-]?\d+(?:\.\d+)?)%\s*,\s*([\+\-]?\d+(?:\.\d+)?)%\s*\)$/.exec(x)))!==null){
  rgb=hlsToRgb([parseHue(e[1]),parsePercent(e[3]),parsePercent(e[2])]);
  return [rgb[0],rgb[1],rgb[2],255];
 } else if((e=(/^hsla\(\s*([\+\-]?\d+(?:\.\d+)?)\s*,\s*([\+\-]?\d+(?:\.\d+)?)%\s*,\s*([\+\-]?\d+(?:\.\d+)?)%\s*,\s*([\+\-]?\d+(?:\.\d+)?)\s*\)$/.exec(x)))!==null){
  rgb=hlsToRgb([parseHue(e[1]),parsePercent(e[3]),parsePercent(e[2])]);
  return [rgb[0],rgb[1],rgb[2],parseAlpha(e[4])];
 } else {
  setUpNamedColors();
  x=x.toLowerCase();
  if(x.indexOf("grey")>=0)x=x.replace("grey","gray");// support "grey" variants
  var ret=namedColors[x];
  if(typeof ret==="string")return exports["colorToRgba"](ret);
  if(x==="transparent")return [0,0,0,0];
  return null;
 }
}
exports["toGLColor"]=function(r,g,b,a){
 if(r==null)return [0,0,0,0];
 if(typeof r=="string"){
   var rgba=exports["colorToRgba"](r) || [0,0,0,0];
   var mul=1.0/255;
   rgba[0]*=mul;
   rgba[1]*=mul;
   rgba[2]*=mul;
   rgba[3]*=mul;
   return rgba;
 }
 if(typeof r=="number" &&
     typeof g=="number" && typeof b=="number"){
   return [r,g,b,(typeof a!="number") ? 1.0 : a];
 } else {
   return r || [0,0,0,0];
 }
}

var namedColors=null;
var setUpNamedColors=function(){
  "use strict";
if(!namedColors){
    var nc=("aliceblue,f0f8ff,antiquewhite,faebd7,aqua,00ffff,aquamarine,7fffd4,azure,f0ffff,beige,f5f5dc,bisque,ffe4c4,black,000000,blanchedalmond,ffebcd,blue,0000ff,"+
"blueviolet,8a2be2,brown,a52a2a,burlywood,deb887,cadetblue,5f9ea0,chartreuse,7fff00,chocolate,d2691e,coral,ff7f50,cornflowerblue,6495ed,cornsilk,fff8dc,"+
"crimson,dc143c,cyan,00ffff,darkblue,00008b,darkcyan,008b8b,darkgoldenrod,b8860b,darkgray,a9a9a9,darkgreen,006400,darkkhaki,bdb76b,darkmagenta,8b008b,"+
"darkolivegreen,556b2f,darkorange,ff8c00,darkorchid,9932cc,darkred,8b0000,darksalmon,e9967a,darkseagreen,8fbc8f,darkslateblue,483d8b,darkslategray,2f4f4f,"+
"darkturquoise,00ced1,darkviolet,9400d3,deeppink,ff1493,deepskyblue,00bfff,dimgray,696969,dodgerblue,1e90ff,firebrick,b22222,floralwhite,fffaf0,forestgreen,"+
"228b22,fuchsia,ff00ff,gainsboro,dcdcdc,ghostwhite,f8f8ff,gold,ffd700,goldenrod,daa520,gray,808080,green,008000,greenyellow,adff2f,honeydew,f0fff0,hotpink,"+
"ff69b4,indianred,cd5c5c,indigo,4b0082,ivory,fffff0,khaki,f0e68c,lavender,e6e6fa,lavenderblush,fff0f5,lawngreen,7cfc00,lemonchiffon,fffacd,lightblue,add8e6,"+
"lightcoral,f08080,lightcyan,e0ffff,lightgoldenrodyellow,fafad2,lightgray,d3d3d3,lightgreen,90ee90,lightpink,ffb6c1,lightsalmon,ffa07a,lightseagreen,20b2aa,"+
"lightskyblue,87cefa,lightslategray,778899,lightsteelblue,b0c4de,lightyellow,ffffe0,lime,00ff00,limegreen,32cd32,linen,faf0e6,magenta,ff00ff,maroon,800000,"+
"mediumaquamarine,66cdaa,mediumblue,0000cd,mediumorchid,ba55d3,mediumpurple,9370d8,mediumseagreen,3cb371,mediumslateblue,7b68ee,mediumspringgreen,"+
"00fa9a,mediumturquoise,48d1cc,mediumvioletred,c71585,midnightblue,191970,mintcream,f5fffa,mistyrose,ffe4e1,moccasin,ffe4b5,navajowhite,ffdead,navy,"+
"000080,oldlace,fdf5e6,olive,808000,olivedrab,6b8e23,orange,ffa500,orangered,ff4500,orchid,da70d6,palegoldenrod,eee8aa,palegreen,98fb98,paleturquoise,"+
"afeeee,palevioletred,d87093,papayawhip,ffefd5,peachpuff,ffdab9,peru,cd853f,pink,ffc0cb,plum,dda0dd,powderblue,b0e0e6,purple,800080,rebeccapurple,663399,red,ff0000,rosybrown,"+
"bc8f8f,royalblue,4169e1,saddlebrown,8b4513,salmon,fa8072,sandybrown,f4a460,seagreen,2e8b57,seashell,fff5ee,sienna,a0522d,silver,c0c0c0,skyblue,87ceeb,"+
"slateblue,6a5acd,slategray,708090,snow,fffafa,springgreen,00ff7f,steelblue,4682b4,tan,d2b48c,teal,008080,thistle,d8bfd8,tomato,ff6347,turquoise,40e0d0,violet,"+
"ee82ee,wheat,f5deb3,white,ffffff,whitesmoke,f5f5f5,yellow,ffff00,yellowgreen,9acd32").split(",");
    namedColors={};
    for(var i=0;i<nc.length;i+=2){
     namedColors[nc[i]]="#"+nc[i+1];
    }
  }
};
})(GLUtil);

/**
* Represents a WebGL shader program.  A shader program in
* WebGL consists of a vertex shader (which processes vertices),
* and a fragment shader (which processes pixels).  Shader programs
* are specially designed for running on a graphics processing unit,
* or GPU.
* If compiling or linking the shader program fails, a diagnostic
* log is output to the JavaScript console.
*
* @class
* @alias glutil.ShaderProgram
* @param {WebGLRenderingContext} context A WebGL context associated with the
* compiled shader program.
* @param {String|undefined} vertexShader Source text of a vertex shader, in OpenGL
* ES Shading Language (GLSL).  If null, a default
* vertex shader is used instead.
* @param {String|undefined} fragmentShader Source text of a fragment shader in GLSL.
* If null, a default fragment shader is used instead.
*/
var ShaderProgram=function(context, vertexShader, fragmentShader){
 if(vertexShader==null){
  vertexShader=ShaderProgram.getDefaultVertex();
 }
 if(fragmentShader==null){
  fragmentShader=ShaderProgram.getDefaultFragment();
 }
 this.program=ShaderProgram._compileShaders(context,vertexShader,fragmentShader);
 this.attributes={};
 this.context=context;
 this.actives={};
 this.uniformTypes={};
 if(this.program!=null){
  this.attributes=[];
  var name=null;
  var ret={}
  var count= context.getProgramParameter(this.program, context.ACTIVE_ATTRIBUTES);
  for (var i = 0; i < count; ++i) {
   var attributeInfo=context.getActiveAttrib(this.program, i);
   if(attributeInfo!==null){
    name=attributeInfo.name;
    var attr=context.getAttribLocation(this.program, name);
    if(attr>=0){
     this.attributes.push(attr);
     ret[name]=attr;
    }
   }
  }
  count = context.getProgramParameter(this.program, context.ACTIVE_UNIFORMS);
  for (var i = 0; i < count; ++i) {
   var uniformInfo=context.getActiveUniform(this.program, i);
   if(uniformInfo!==null){
    name = uniformInfo.name;
    ret[name] = context.getUniformLocation(this.program, name);
    this.uniformTypes[name] = uniformInfo.type;
   }
  }
  this.actives=ret;
 }
}
/** Disposes resources from this shader program.
*/
ShaderProgram.prototype.dispose=function(){
 if(this.program){
  this.context.deleteProgram(this.program);
 }
 this.context=null;
 this.program=null;
 this.actives={};
 this.attributes={};
 this.uniformTypes={};
}

/** Gets the WebGL context associated with this shader program.
* @return {WebGLRenderingContext}
*/
ShaderProgram.prototype.getContext=function(){
 return this.context;
}
/**
* Gets the location of the given uniform's name in this program.
* Note that the location may change each time the shader program
* is linked (which, in the case of ShaderProgram, currently only
* happens upon construction).
* @param {string} name The name of a uniform defined in either the
* vertex or fragment shader of this shader program.  If the uniform
* is an array, each element in the array is named as in these examples:
* "unif[0]", "unif[1]".   If the uniform
* is a struct, each member in the struct is named as in these examples:
* "unif.member1", "unif.member2".  If the uniform is an array of struct, each
* member is named as in these examples: "unif[0].member1",
* "unif[0].member2".
* @return {number|null} The location of the uniform name, or null if it doesn't exist.
*/
ShaderProgram.prototype.get=function(name){
 return (!this.actives.hasOwnProperty(name)) ?
   null : this.actives[name];
}
/**
* Makes this program the active program for the WebGL context.
* @return {ShaderProgram} This object.
*/
ShaderProgram.prototype.use=function(){
 this.context.useProgram(this.program);
 return this;
}
/**
*  Sets uniform variables for this program.  This method assumes
*  that this object's program is currently active.  Uniform variables
* are called uniform because they uniformly apply to all vertices
* in a primitive, and are not different per vertex.
* @param {Object} uniforms A hash of key/value pairs.  Each key is
* the name of a uniform, and each value is the value to set
* to that uniform.  Uniform values that are 3- or 4-element
* vectors must be 3 or 4 elements long, respectively.  Uniforms
* that are 4x4 matrices must be 16 elements long.  Keys to
* uniforms that don't exist in this program are ignored.  Keys
* where hasOwnProperty is false are also ignored.  See also
* the "name" parameter of the "get" method for more information on
* uniform names.
* @return {ShaderProgram} This object.
*/
ShaderProgram.prototype.setUniforms=function(uniforms){
  for(var i in uniforms){
    if(uniforms.hasOwnProperty(i)){
      v=uniforms[i];
      var uniform=this.get(i);
      if(uniform===null)continue;
      //console.log("setting "+i+": "+v);
      if(v.length==3){
       this.context.uniform3f(uniform, v[0],v[1],v[2]);
      } else if(v.length==2){
       this.context.uniform2f(uniform, v[0],v[1]);
      } else if(v.length==4){
       this.context.uniform4f(uniform, v[0],v[1],v[2],v[3]);
      } else if(v.length==16){
       this.context.uniformMatrix4fv(uniform,false,v);
      } else if(v.length==9){
       this.context.uniformMatrix3fv(uniform,false,v);
      } else {
       if(this.uniformTypes[i]==this.context.FLOAT){
        this.context.uniform1f(uniform, (typeof v=="number") ? v : v[0]);
       } else {
        this.context.uniform1i(uniform, (typeof v=="number") ? v : v[0]);
       }
      }
    }
  }
  return this;
}
/** @private */
ShaderProgram._compileShaders=function(context, vertexShader, fragmentShader){
  function compileShader(context, kind, text){
    var shader=context.createShader(kind);
    context.shaderSource(shader, text);
    context.compileShader(shader);
    if (!context.getShaderParameter(shader, context.COMPILE_STATUS)) {
      var lines=text.split("\n")
      // add line numbers
      for(var i=0;i<lines.length;i++){
       lines[i]=(i+1)+"   "+lines[i]
      }
      console.log(lines.join("\n"));
	  	console.log((kind==context.VERTEX_SHADER ? "vertex: " : "fragment: ")+
        context.getShaderInfoLog(shader));
	  	return null;
	  }
   return shader;
  }
  var vs=(!vertexShader || vertexShader.length==0) ? null :
    compileShader(context,context.VERTEX_SHADER,vertexShader);
  var fs=(!fragmentShader || fragmentShader.length==0) ? null :
    compileShader(context,context.FRAGMENT_SHADER,fragmentShader);
  var program = null;
  if(vs!==null && fs!==null){
   program = context.createProgram();
   context.attachShader(program, vs);
   context.attachShader(program, fs);
 	 context.linkProgram(program);
   if (!context.getProgramParameter(program, context.LINK_STATUS)) {
		console.log("link: "+context.getProgramInfoLog(program));
		context.deleteProgram(program);
    program=null;
	 }
  }
  if(vs!==null)context.deleteShader(vs);
  if(fs!==null)context.deleteShader(fs);
  return program;
};
/**
* Gets the text of the default vertex shader.  Putting "#define SHADING\n"
* at the start of the return value enables the lighting model.
* @return {string} The resulting shader text.
*/
ShaderProgram.getDefaultVertex=function(){
var shader="" +
"attribute vec3 position;\n" +
"attribute vec3 normal;\n" +
"attribute vec2 textureUV;\n" +
"attribute vec3 colorAttr;\n" +
"uniform mat4 world;\n" +
"uniform mat4 view;\n" +
"uniform mat4 projection;\n"+
"varying vec2 textureUVVar;\n"+
"varying vec3 colorAttrVar;\n" +
"#ifdef SHADING\n"+
"uniform mat3 worldInverseTrans3; /* internal */\n" +
"varying vec4 worldPositionVar;\n" +
"varying vec3 transformedNormalVar;\n"+
"#endif\n"+
"void main(){\n" +
"vec4 positionVec4=vec4(position,1.0);\n" +
"gl_Position=projection*view*world*positionVec4;\n" +
"colorAttrVar=colorAttr;\n" +
"textureUVVar=textureUV;\n" +
"#ifdef SHADING\n"+
"transformedNormalVar=normalize(worldInverseTrans3*normal);\n" +
"worldPositionVar=world*positionVec4;\n" +
"#endif\n"+
"}";
return shader;
};
ShaderProgram.fragmentShaderHeader=function(){
return "" +
"#ifdef GL_ES\n" +
"#ifndef GL_FRAGMENT_PRECISION_HIGH\n" +
"precision mediump float;\n" +
"#else\n" +
"precision highp float;\n" +
"#endif\n" +
"#endif\n";
}
/**
* Generates source code for a fragment shader for applying
* a raster effect to a texture.
* @param {string} functionCode See ShaderProgram.makeEffect().
* @return {string} The source text of the resulting fragment shader.
*/
ShaderProgram.makeEffectFragment=function(functionCode){
var shader=ShaderProgram.fragmentShaderHeader();
shader+=""+
"uniform sampler2D sampler;\n" + // texture sampler
"uniform vec2 textureSize;\n" + // texture size
"varying vec2 textureUVVar;\n"+
"varying vec3 colorAttrVar;\n";
shader+=functionCode;
shader+="\n\nvoid main(){\n" +
" // normalize coordinates to 0..1\n" +
" vec2 uv=gl_FragCoord.xy/textureSize.xy;\n" +
" gl_FragColor=textureEffect(sampler,uv,textureSize);\n" +
"}";
return shader;
}
/**
* Generates a shader program for applying
* a raster effect to a texture.
* @param {WebGLRenderingContext} context A WebGL context associated with the
* compiled shader program.
* @param {string} functionCode A string giving shader code
* in OpenGL ES Shading Language (GLSL) that must contain
* a function with the following signature:
* <pre>
* vec4 textureEffect(sampler2D sampler, vec2 uvCoord, vec2 textureSize)
* </pre>
* where <code>sampler</code> is the texture sampler, <code>uvCoord</code>
* is the texture coordinates ranging from 0 to 1 in each component,
* <code>textureSize</code> is the dimensions of the texture in pixels,
* and the return value is the new color at the given texture coordinates.  Besides
* this requirement, the shader code is also free to define additional uniforms,
* constants, functions, and so on (but not another "main" function).
* @return {ShaderProgram} The resulting shader program.
*/
ShaderProgram.makeEffect=function(context,functionCode){
 return new ShaderProgram(context, null,
   ShaderProgram.makeEffectFragment(functionCode));
}
/**
* Generates a shader program that inverts the colors of a texture.
* @param {WebGLRenderingContext} context A WebGL context associated with the
* compiled shader program.
* @return {ShaderProgram} The resulting shader program.
*/
ShaderProgram.getInvertEffect=function(context){
return ShaderProgram.makeEffect(context,
[
"vec4 textureEffect(sampler2D sampler, vec2 uvCoord, vec2 textureSize){",
" vec4 color=texture2D(sampler,uvCoord);",
" return vec4(vec3(1,1,1.)-color.rgb,color.a);",
"}"].join("\n"));
}
/**
* Generates a shader program that generates a two-color texture showing
* the source texture's edges.
* @param {WebGLRenderingContext} context A WebGL context associated with the
* compiled shader program.
* @return {ShaderProgram} The resulting shader program.
*/
ShaderProgram.getEdgeDetectEffect=function(context){
// Adapted by Peter O. from David C. Bishop's EdgeDetect.frag,
// in the public domain
return ShaderProgram.makeEffect(context,
["float luma(vec3 color) {",
" return 0.2126 * color.r + 0.7152 * color.g + 0.0722 * color.b;",
"}",
"const vec4 edge_color=vec4(0.,0,0,1);",
"const vec4 back_color=vec4(1.,1,1,1);",
"vec4 textureEffect(sampler2D sampler, vec2 uvCoord, vec2 textureSize){",
"float dx = 1.0 / float(textureSize.x);",
"float dy = 1.0 / float(textureSize.y);",
"float s00 = luma(texture2D(sampler, uvCoord + vec2(-dx,dy)).rgb);",
"float s10 = luma(texture2D(sampler, uvCoord + vec2(-dx,0.0)).rgb);",
"float s20 = luma(texture2D(sampler, uvCoord + vec2(-dx,-dy)).rgb);",
"float s01 = luma(texture2D(sampler, uvCoord + vec2(0.0,dy)).rgb);",
"float s21 = luma(texture2D(sampler, uvCoord + vec2(0.0,-dy)).rgb);",
"float s02 = luma(texture2D(sampler, uvCoord + vec2(dx, dy)).rgb);",
"float s12 = luma(texture2D(sampler, uvCoord + vec2(dx, 0.0)).rgb);",
"float s22 = luma(texture2D(sampler, uvCoord + vec2(dx, -dy)).rgb);",
"float sx = s00 + 2.0 * s10 + s20 - (s02 + 2.0 * s12 + s22);",
"float sy = s00 + 2.0 * s01 + s02 - (s20 + 2.0 * s21 + s22);",
"float dist = sx * sx + sy * sy;",
"if(dist > 0.4) {",
"return edge_color;",
"} else {",
"return back_color;",
"}}"
].join("\n"));
}

/**
* Gets the text of the default fragment shader.  Putting "#define SHADING\n"
* at the start of the return value enables the lighting model.
* Putting "#define SPECULAR\n"
* at the start of the return value enables specular highlights (as long
* as SHADING is also enabled).
* @return {string} The resulting shader text.
*/
ShaderProgram.getDefaultFragment=function(){
var shader=ShaderProgram.fragmentShaderHeader() +
 // if shading is disabled, this is solid color instead of material diffuse
 "uniform vec3 md;\n" + // material diffuse color (0-1 each component). Is multiplied by texture/solid color.
"#ifdef SHADING\n" +
"struct light {\n" +
" vec4 position; /* source light direction */\n" +
" vec3 diffuse; /* source light diffuse color */\n" +
"#ifdef SPECULAR\n" +
" vec3 specular; /* source light specular color */\n" +
"#endif\n" +
"};\n" +
"uniform mat4 viewInverse; /* internal */\n" +
"const int MAX_LIGHTS = "+Lights.MAX_LIGHTS+"; /* internal */\n" +
"uniform vec3 sceneAmbient;\n" +
"uniform light lights[MAX_LIGHTS];\n" +
"uniform vec3 ma;\n" + // material ambient color (-1 to 1 each component).
"uniform vec3 me;\n" + // material emission color
"#ifdef SPECULAR\n" +
"uniform vec3 ms;\n" + // material specular color (0-1 each comp.).  Affects how intense highlights are.
"uniform float mshin;\n" + // material shininess
"#endif\n" +
"#endif\n" +
"uniform sampler2D sampler;\n" + // texture sampler
"uniform vec2 textureSize;\n" + // texture size (all zeros if textures not used)
"uniform float useColorAttr;\n" + // use color attribute if 1
"varying vec2 textureUVVar;\n"+
"varying vec3 colorAttrVar;\n" +
"#ifdef SHADING\n" +
"varying vec4 worldPositionVar;\n" +
"varying vec3 transformedNormalVar;\n"+
"const vec4 white=vec4(1.0,1.0,1.0,1.0);\n"+
"vec4 calcLightPower(light lt, vec4 worldPosition){\n" +
" vec3 sdir;\n" +
" float attenuation;\n" +
" if(lt.position.w == 0.0){\n" +
"  sdir=normalize(lt.position.xyz);\n" +
"  attenuation=1.0;\n" +
" } else {\n" +
"  vec3 vertexToLight=vec3(lt.position-worldPosition);\n" +
"  float dist=length(vertexToLight);\n" +
"  sdir=normalize(vertexToLight);\n" +
"  attenuation=1.0;\n" +
" }\n" +
" return vec4(sdir,attenuation);\n" +
"}\n" +
"#endif\n" +
"void main(){\n" +
" float useTexture=sign(textureSize.x+textureSize.y);\n" +
" vec4 baseColor=mix(\n"+
"#ifdef SHADING\n" +
"   white, /*when useTexture is 0*/\n" +
"#else\n" +
"   vec4(md,1.0), /*when useTexture is 0*/\n" +
"#endif\n" +
"   texture2D(sampler,textureUVVar), /*when useTexture is 1*/\n"+
"  useTexture);\n"+
" baseColor=mix(baseColor, /* when useColorAttr is 0 */\n"+
"  vec4(colorAttrVar,1.0), /* when useColorAttr is 1 */\n" +
"  useColorAttr);\n" +
"#ifdef SHADING\n" +
"#define SET_LIGHTPOWER(i) "+
" lightPower[i]=calcLightPower(lights[i],worldPositionVar)\n" +
"#define ADD_DIFFUSE(i) "+
" phong+=lights[i].diffuse*max(0.0,dot(transformedNormalVar," +
"   lightPower[i].xyz))*lightPower[i].w*materialDiffuse;\n" +
"vec4 lightPower["+Lights.MAX_LIGHTS+"];\n";
for(var i=0;i<Lights.MAX_LIGHTS;i++){
 shader+="SET_LIGHTPOWER("+i+");\n";
}
shader+="vec3 viewPosition=normalize(vec3(viewInverse*vec4(0,0,0,1)-worldPositionVar));\n" +
"vec3 phong=sceneAmbient*ma; /* ambient*/\n" +
"#ifdef SPECULAR\n" +
"// specular reflection\n" +
"vec3 specular=vec3(0,0,0.);\n" +
"#define ADD_SPECULAR(i) "+
"  if(dot(transformedNormalVar,lightPower[i].xyz)>=0.0){" +
"   specular+=pow(max(dot(reflect(-lightPower[i].xyz,transformedNormalVar)," +
"      viewPosition),0.0),mshin)*lights[i].specular*lightPower[i].w;" +
"  }\n";
for(var i=0;i<Lights.MAX_LIGHTS;i++){
 shader+="ADD_SPECULAR("+i+");\n";
}
shader+=" phong+=(ms*specular);\n" +
"#endif\n" +
" // diffuse\n"+
" vec3 materialDiffuse=md*baseColor.rgb;\n";
for(var i=0;i<Lights.MAX_LIGHTS;i++){
 shader+="ADD_DIFFUSE("+i+");\n";
}
shader+=" // emission\n"+
" phong+=me;\n" +
" baseColor=vec4(phong,baseColor.a);\n" +
"#endif\n" +
" gl_FragColor=baseColor;\n" +
"}";
return shader;
};

/** Specifies parameters for light sources.
* @class
* @alias glutil.LightSource
*/
function LightSource(position, ambient, diffuse, specular) {
 this.ambient=ambient || [0,0,0,1.0]
 this.position=position ? [position[0],position[1],position[2],1.0] :[0, 0, 1, 0];
 this.diffuse=diffuse||[1,1,1];
 this.specular=specular||[1,1,1];
};

/**
* A collection of light sources.  It stores the scene's
* ambient color as well as data on one or more light sources.
* @class
* @alias glutil.Lights
*/
function Lights(){
 this.lights=[new LightSource()];
 /**
 *  Ambient color for the scene.  In the absence of
 *  other lighting effects, all objects will be given this color.
 *  @default
 */
 this.sceneAmbient=[0.2,0.2,0.2];
}
/** Maximum number of lights supported
   by the default shader program.
   @const
   */
Lights.MAX_LIGHTS = 3;
/** @private */
Lights._createLight=function(index, position, diffuse, specular,directional){
 var lightPosition=position ? [position[0],position[1],position[2],
   directional ? 0.0 : 1.0] : (directional ? [0,0,1,0] : [0,0,0,1]);
 var lightDiffuse=diffuse || (index==0 ? [1,1,1] : [0,0,0]);
 var lightSpecular=specular || (index==0 ? [1,1,1] : [0,0,0]);
 var light=new LightSource();
 light.ambient=[0,0,0,1.0]; // not currently used
 light.position=lightPosition;
 light.diffuse=lightDiffuse;
 light.specular=lightSpecular;
 return light;
}
/**
 *
 * @param {*} index
 * @param {*} position
 * @param {*} diffuse
 * @param {*} specular
 * @return {Lights} This object.
 */
Lights.prototype.setDirectionalLight=function(index,direction,diffuse,specular){
 this.lights[index]=Lights._createLight(index,direction,diffuse,specular,true);
 return this;
}
/**
 *
 * @param {*} index
 * @param {*} position
 * @param {*} diffuse
 * @param {*} specular
 * @return {Lights} This object.
 */
Lights.prototype.setPointLight=function(index,position,diffuse,specular){
 this.lights[index]=Lights._createLight(index,position,diffuse,specular,false);
 return this;
}
/**
 * Adds a directional light.
 * @param {*} position
 * @param {*} diffuse
 * @param {*} specular
 * @return {Lights} This object.
 */
Lights.prototype.addDirectionalLight=function(position,diffuse,specular){
 this.lights.push(Lights._createLight(this.lights.length,position,diffuse,specular,true));
 return this;
}
/**
 *
 * @param {*} position
 * @param {*} diffuse
 * @param {*} specular
 * @return {Lights} This object.
 */
Lights.prototype.addPointLight=function(position,diffuse,specular){
 this.lights.push(Lights._createLight(this.lights.length,position,diffuse,specular,false));
 return this;
}

/**
 * Sets parameters for a shader program based on
 * the information in this light source object.
 * @param {ShaderProgram} program A shader program object
 * where locations of lighting uniforms will come from.
 * @return {Lights} This object.
 */
Lights.prototype.bind=function(program){
 if(!program)return this;
 var uniforms={};
 uniforms["sceneAmbient"]=this.sceneAmbient.slice(0,3);
 for(var i=0;i<this.lights.length;i++){
  uniforms["lights["+i+"].diffuse"]=this.lights[i].diffuse;
  uniforms["lights["+i+"].specular"]=this.lights[i].specular;
  uniforms["lights["+i+"].position"]=this.lights[i].position;
 }
 // Set default values for undefined lights up to MAX_LIGHTS
 for(var i=this.lights.length;i<Lights.MAX_LIGHTS;i++){
  uniforms["lights["+i+"].diffuse"]=[0,0,0];
  uniforms["lights["+i+"].specular"]=[0,0,0];
  uniforms["lights["+i+"].position"]=[0,0,0,0];
 }
 program.setUniforms(uniforms);
 return this;
}

/**
* Specifies parameters for geometry materials, particularly, how an
* object reflects or absorbs light.
* The full structure is only used if the shader program supports lighting, as the
* default shader program does.  If Scene3D.disableLighting() is called,
* disabling lighting calculations in the default shader, only
* the diffuse property of this object is used.
* @class
*
* @alias glutil.MaterialShade
* @param {Array<number>} ambient Ambient reflection.  An array of three numbers
* indicating how much an object reflects ambient lights (lights that color pixels
* the same way regardless of direction or distance) in the red, green,
* and blue components respectively.  Each component ranges from 0 to 1.
* May be omitted; default is (0.2, 0.2, 0.2).
* @param {Array<number>} diffuse Diffuse reflection.  An array of three numbers
* indicating how much an object reflects diffuse lights (lights that point
* in a certain direction) in the red, green,
* and blue components respectively.  Each component ranges from 0 to 1.
* Setting ambient and diffuse to the same value usually defines an object's
* color.  If Scene3D.disableLighting() is called, disabling lighting calculations,
* this value is used for coloring objects.
* May be omitted; default is (0.8, 0.8, 0.8).
* @param {Array<number>} specular Color of specular highlights on an
* object.  An array of three numbers indicating the red, green, and blue
* components.
* Each component ranges from 0 to 1.
* May be omitted; default is (0,0,0).
* @param {Array<number>} shininess Indicates how sharp the specular
* highlights are.  0 means the object creates no specular highlights. Ranges
* from 0 through 128.
* May be omitted; default is 0.
* @param {Array<number>} emission Additive color emitted by an object.
* Used for objects that glow on their own, among other things. An array of
* three numbers indicating the red, green, and blue components.
* Each component ranges from -1 to 1. Positive values add to each component,
* while negative values subtract from each component.
* May be omitted; default is (0,0,0).
*/
function MaterialShade(ambient, diffuse, specular,shininess,emission) {
 // NOTE: A solid color is defined by setting ambient
 // and diffuse to the same value
 /** Specular highlight power of this material. */
 this.shininess=(shininess==null) ? 0 : Math.min(Math.max(0,shininess),128);
 /** Ambient reflection of this material. */
 this.ambient=ambient||[0.2,0.2,0.2];
 /** Diffuse reflection of this material. */
 this.diffuse=diffuse||[0.8,0.8,0.8];
 /** Specular highlight color of this material. */
 this.specular=specular||[0,0,0];
 /** Additive color emitted by objects with this material. */
 this.emission=emission||[0,0,0];
}
/** Clones the parameters to a new MaterialShade
 object and returns that object. */
MaterialShade.prototype.copy=function(){
 return new MaterialShade(
  this.ambient.slice(0,this.ambient.length),
  this.diffuse.slice(0,this.diffuse.length),
  this.specular.slice(0,this.specular.length),
  this.shininess,
  this.emission.slice(0,this.emission.length)
 )
}
/** Convenience method that returns a MaterialShader
 * object from an RGBA color.
* @param {Array<number>|number|string} r Array of three or
* four color components; or the red color component (0-1); or a string
* specifying an HTML or CSS color.
* @param {number} g Green color component (0-1).
* May be omitted if a string or array is given as the "r" parameter.
* @param {number} b Blue color component (0-1).
* May be omitted if a string or array is given as the "r" parameter.
* @param {number} a Alpha color component (0-1).
* May be omitted if a string or array is given as the "r" parameter.
 */
MaterialShade.fromColor=function(r,g,b,a){
 var color=GLUtil["toGLColor"](r,g,b,a);
 return new MaterialShade(color,color);
}
/**
 * Sets parameters for a shader program based on
 * the information in this material data object.
 * @param {ShaderProgram} program A shader program object
 * where the locations of material-related uniforms will be retrieved.
 */
MaterialShade.prototype.bind=function(program){
 program.setUniforms({
 "textureSize":[0,0],
 "mshin":this.shininess,
 "ma":[this.ambient[0], this.ambient[1], this.ambient[2]],
 "md":[this.diffuse[0], this.diffuse[1], this.diffuse[2]],
 "ms":[this.specular[0],this.specular[1],this.specular[2]],
 "me":[this.emission[0],this.emission[1],this.emission[2]]
 });
}

/**
* Specifies the triangles and lines that make up a geometric shape.
* @class
*
* @alias glutil.Mesh
* @param {Array<number>} vertices An array that contains data on each
* vertex of the mesh.
* Each vertex is made up of the same number of elements, as defined in
* format. If null or omitted, creates an initially empty mesh.
* @param {Array<number>} faces An array of vertex indices.  Each trio of
* indices specifies a separate triangle or line segment.
* If null or omitted, creates an initially empty mesh.
* @param {number} format A set of bit flags depending on the kind of data
* each vertex contains.  Each vertex contains 3 elements plus:
*  -- 3 more elements if Mesh.NORMALS_BIT is set, plus
*  -- 3 more elements if Mesh.COLORS_BIT is set, plus
*  -- 2 more elements if Mesh.TEXCOORDS_BIT is set.
* If Mesh.LINES_BIT is set, each vertex index specifies a point of a line
* segment.
*/
function Mesh(vertices,faces,format){
 this.subMeshes=[
  new SubMesh(vertices,faces,format)
 ];
}
/** @private */
Mesh._primitiveType=function(mode){
 if(mode==Mesh.LINES)
  return Mesh.LINES;
 else
  return Mesh.TRIANGLES;
}
/** @private */
Mesh._isCompatibleMode=function(oldMode,newMode){
 if(oldMode==newMode)return true;
 if(Mesh._primitiveType(oldMode)==Mesh._primitiveType(newMode))
   return true;
 return false;
}
/** @private */
Mesh._recalcNormals=function(vertices,faces,stride,offset){
  for(var i=0;i<vertices.length;i+=stride){
    vertices[i+offset]=0.0
    vertices[i+offset+1]=0.0
    vertices[i+offset+2]=0.0
  }
  for(var i=0;i<faces.length;i+=3){
    var v1=faces[i]*stride
    var v2=faces[i+1]*stride
    var v3=faces[i+2]*stride
    var n1=[vertices[v2]-vertices[v3],vertices[v2+1]-vertices[v3+1],vertices[v2+2]-vertices[v3+2]]
    var n2=[vertices[v1]-vertices[v3],vertices[v1+1]-vertices[v3+1],vertices[v1+2]-vertices[v3+2]]
    // cross multiply n1 and n2
    var x=n1[1]*n2[2]-n1[2]*n2[1]
    var y=n1[2]*n2[0]-n1[0]*n2[2]
    var z=n1[0]*n2[1]-n1[1]*n2[0]
    // normalize xyz vector
    len=Math.sqrt(x*x+y*y+z*z);
    if(len!=0){
      len=1.0/len;
      x*=len;
      y*=len;
      z*=len;
      // add normalized normal to each vertex of the face
      vertices[v1+offset]+=x
      vertices[v1+offset+1]+=y
      vertices[v1+offset+2]+=z
      vertices[v2+offset]+=x
      vertices[v2+offset+1]+=y
      vertices[v2+offset+2]+=z
      vertices[v3+offset]+=x
      vertices[v3+offset+1]+=y
      vertices[v3+offset+2]+=z
    }
  }
  // Normalize each normal of the vertex
  for(var i=0;i<vertices.length;i+=stride){
    var x=vertices[i+offset];
    var y=vertices[i+offset+1];
    var z=vertices[i+offset+2];
    len=Math.sqrt(x*x+y*y+z*z);
    if(len){
      len=1.0/len;
      vertices[i+offset]=x*len;
      vertices[i+offset+1]=y*len;
      vertices[i+offset+2]=z*len;
    }
  }
}
/**
 *
 */
Mesh.prototype.getAttributeBits=function(){
  // It is assumed that each sub-mesh has the same
  // attribute bits
  return this.subMeshes[0].attributeBits;
 }
/**
 * Changes the primitive mode for this mesh.
 * Future vertices will be drawn as primitives of the new type.
 * @param {*} m A primitive type.  One of the following:
 * Mesh.TRIANGLES, Mesh.LINES, Mesh.TRIANGLE_STRIP,
 * Mesh.TRIANGLE_FAN, Mesh.QUADS, Mesh.QUAD_STRIP.
 */
Mesh.prototype.mode=function(m){
  if(this.subMeshes.length>0 &&
    !Mesh._isCompatibleMode(this.subMeshes[this.subMeshes.length-1].builderMode,m)){
   this.subMeshes.push(new SubMesh().mode(m));
  } else {
   this.subMeshes[this.subMeshes.length-1].mode(m);
  }
  return this;
 }
 /**
  * Sets the current normal for this mesh.  The next vertex position
  * defined (with vertex3()) will have this normal.  If necessary, rebuilds the mesh
  * to accommodate normals.
  * @param {number} x X-coordinate of the normal.
  * @param {number} y Y-coordinate of the normal.
  * @param {number} z Z-coordinate of the normal.
  * @return {Mesh} This object.
  */
 Mesh.prototype.normal3=function(x,y,z){
  for(var i=0;i<this.subMeshes.length;i++){
   this.subMeshes[i].normal3(x,y,z);
  }
  return this;
 }
 /**
  * Sets the current color for this mesh.  The next vertex position
  * defined (with vertex3()) will have this color.  If necessary, rebuilds the mesh
  * to accommodate colors.
  * @param {number} r Red component of the color.
  * @param {number} g Green component of the color.
  * @param {number} b Blue component of the color.
  * @return {Mesh} This object.
  */
 Mesh.prototype.color3=function(r,g,b){
  for(var i=0;i<this.subMeshes.length;i++){
   this.subMeshes[i].color3(r,g,b);
  }
  return this;
 }
 /**
  * Sets the current texture coordinates for this mesh.  The next vertex position
  * defined (with vertex3()) will have these texture coordinates.  If necessary, rebuilds the mesh
  * to accommodate texture coordinates.
  * @param {number} x X-coordinate of the texture, from 0-1.
  * @param {number} y Y-coordinate of the texture, from 0-1.
  * @return {Mesh} This object.
  */
 Mesh.prototype.texCoord2=function(x,y){
  for(var i=0;i<this.subMeshes.length;i++){
   this.subMeshes[i].texCoord2(x,y);
  }
  return this;
 }
 /**
  * Adds a new vertex to this mesh.  If appropriate, adds an
  * additional face index according to this mesh's current mode.
  * @param {number} x X-coordinate of the vertex.
  * @param {number} y Y-coordinate of the vertex.
  * @param {number} z Z-coordinate of the vertex.
  * @return {Mesh} This object.
  */
 Mesh.prototype.vertex3=function(x,y,z){
  this.subMeshes[this.subMeshes.length-1].vertex3(x,y,z);
  return this;
 }
 /**
  * Recalculates the normal vectors for triangles
  * in this mesh.
  * @return {Mesh} This object.
  */
 Mesh.prototype.recalcNormals=function(){
  for(var i=0;i<this.subMeshes.length;i++){
   if((this.subMeshes[i].attributeBits&Mesh.LINES_BIT)==0){
    this.subMeshes[i].recalcNormals();
   }
  }
  return this;
 }
/**
 * Converts this mesh to a new mesh with triangles converted
 * to line segments.  The new mesh will reuse the vertices
 * contained in this one without copying the vertices.  Parts
 * of the mesh already consisting of line segments will remain
 * unchanged.
 * @return {Mesh} A new mesh with triangles converted
 * to lines.
 */
Mesh.prototype.toWireFrame=function(){
  var mesh=new Mesh();
  for(var i=0;i<this.subMeshes.length;i++){
   mesh.subMeshes.push(this.subMeshes[i].toWireFrame());
  }
  return mesh;
 }

/** @private */
function SubMesh(vertices,faces,format){
 this.vertices=vertices||[];
 this.indices=faces||[];
 this.stride=3;
 this.builderMode=-1;
 this.normal=[0,0,0];
 this.bounds=null;
 this.color=[0,0,0];
 this.texCoord=[0,0];
 this.startIndex=0;
 this.hasLines=false;
 this.attributeBits=(format==null) ? 0 : format;
 this.mode=function(m){
  this.builderMode=m;
  if(Mesh._primitiveType(m)==Mesh.LINES){
   this.attributeBits|=Mesh.LINES_BIT;
  }
  this.startIndex=this.vertices.length;
  return this;
 }
 /** @private */
 this._rebuildVertices=function(newAttributes){
  var oldBits=this.attributeBits;
  var newBits=oldBits|newAttributes;
  if(newBits==oldBits)return;
  // Rebuild the list of vertices if a new kind of
  // attribute is added to the mesh
  var newVertices=[];
  var newStride=3;
  if((newBits&Mesh.COLORS_BIT)!=0)
   newStride+=3;
  if((newBits&Mesh.NORMALS_BIT)!=0)
   newStride+=3;
  if((newBits&Mesh.TEXCOORDS_BIT)!=0)
   newStride+=2;
  for(var i=0;i<this.vertices.length;i+=this.stride){
   var vx=this.vertices[i];
   var vy=this.vertices[i+1];
   var vz=this.vertices[i+2];
   var s=i+3;
   newVertices.push(vx,vy,vz);
   if((newBits&Mesh.NORMALS_BIT)!=0){
    if((oldBits&Mesh.NORMALS_BIT)!=0){
     var x=this.vertices[s];
     var y=this.vertices[s+1];
     var z=this.vertices[s+2];
     s+=3;
     newVertices.push(x,y,z);
    } else {
     newVertices.push(0,0,0);
    }
   }
   if((newBits&Mesh.COLORS_BIT)!=0){
    if((oldBits&Mesh.COLORS_BIT)!=0){
     var r=this.vertices[s];
     var g=this.vertices[s+1];
     var b=this.vertices[s+2];
     s+=3;
     newVertices.push(r,g,b);
    } else {
     newVertices.push(0,0,0);
    }
   }
   if((newBits&Mesh.TEXCOORDS_BIT)!=0){
    if((oldBits&Mesh.TEXCOORDS_BIT)!=0){
     var u=this.vertices[s];
     var v=this.vertices[s+1];
     s+=2;
     newVertices.push(u,v);
    } else {
     newVertices.push(0,0);
    }
   }
  }
  this.stride=newStride;
  this.vertices=newVertices;
  this.attributeBits=newBits;
 }
 this.normal3=function(x,y,z){
  this.normal[0]=x;
  this.normal[1]=y;
  this.normal[2]=z;
  this._rebuildVertices(Mesh.NORMALS_BIT);
  return this;
 }
 this.color3=function(x,y,z){
  this.color[0]=x;
  this.color[1]=y;
  this.color[2]=z;
  this._rebuildVertices(Mesh.COLORS_BIT);
  return this;
 }
 this.texCoord2=function(u,v){
  this.texCoord[0]=u;
  this.texCoord[1]=v;
  this._rebuildVertices(Mesh.TEXCOORDS_BIT);
  return this;
 }
 this.vertex3=function(x,y,z){
  if(this.builderMode==-1)throw new Error("mode() not called");
  this.vertices.push(x,y,z);
  if((this.attributeBits&Mesh.COLORS_BIT)!=0){
   this.vertices.push(this.color[0],this.color[1],this.color[2]);
  }
  if((this.attributeBits&Mesh.NORMALS_BIT)!=0){
   this.vertices.push(this.normal[0],this.normal[1],this.normal[2]);
  }
  if((this.attributeBits&Mesh.TEXCOORDS_BIT)!=0){
   this.vertices.push(this.texCoord[0],this.texCoord[1]);
  }
  if(this.builderMode==Mesh.QUAD_STRIP &&
     (this.vertices.length-this.startIndex)>=this.stride*4 &&
     (this.vertices.length-this.startIndex)%(this.stride*2)==0){
   var index=(this.vertices.length/this.stride)-4;
   this.indices.push(index,index+1,index+2,index+2,index+1,index+3);
  } else if(this.builderMode==Mesh.QUADS &&
     (this.vertices.length-this.startIndex)%(this.stride*4)==0){
   var index=(this.vertices.length/this.stride)-4;
   this.indices.push(index,index+1,index+2,index+2,index+3,index);
  } else if(this.builderMode==Mesh.TRIANGLES &&
     (this.vertices.length-this.startIndex)%(this.stride*3)==0){
   var index=(this.vertices.length/this.stride)-3;
   this.indices.push(index,index+1,index+2);
  } else if(this.builderMode==Mesh.LINES &&
     (this.vertices.length-this.startIndex)%(this.stride*2)==0){
   var index=(this.vertices.length/this.stride)-2;
   this.indices.push(index,index+1);
  } else if(this.builderMode==Mesh.TRIANGLE_FAN &&
     (this.vertices.length-this.startIndex)>=2){
   var index=(this.vertices.length/this.stride)-2;
   var firstIndex=(this.startIndex/this.stride);
   this.indices.push(firstIndex,index,index+1);
  } else if(this.builderMode==Mesh.TRIANGLE_STRIP &&
     (this.vertices.length-this.startIndex)>=2){
   var index=(this.vertices.length/this.stride)-3;
   this.indices.push(index,index+1,index+2);
  }
  return this;
 }
}
/**
 *
 */
SubMesh.prototype.toWireFrame=function(){
  if(this.builderMode==Mesh.LINES){
   return this;
  }
  var faces=[];
  for(var i=0;i<this.indices.length;i+=3){
    var f1=this.indices[i];
    var f2=this.indices[i+1];
    var f3=this.indices[i+2];
    faces.push(f1,f2,f2,f3,f3,f1);
  }
  var ret=new SubMesh(this.vertices, faces, this.attributeBits);
  ret.builderMode=Mesh.LINES;
  return ret;
}
/**
 *
 */
SubMesh.prototype.recalcBounds=function(){
  var stride=Mesh.getStride(this.attributeBits);
  var minx=0;
  var maxx=0;
  var miny=0;
  var maxy=0;
  var minz=0;
  var maxz=0;
  for(var i=0;i<vertices.length;i+=stride){
    var x=vertices[i];
    var y=vertices[i+1];
    var z=vertices[i+2];
    if(i==0){
      minx=maxx=x;
      miny=maxy=y;
      minz=maxz=z;
    } else {
      minx=Math.min(minx,x);
      miny=Math.min(miny,y);
      minz=Math.min(minz,z);
      maxx=Math.max(maxx,x);
      maxy=Math.max(maxy,y);
      maxz=Math.max(maxz,z);
    }
  }
  this.bounds=[[minx,miny,minz],[maxx,maxy,maxz]];
  return this;
};
/**
 *
 */
SubMesh.prototype.recalcNormals=function(){
  this._rebuildVertices(Mesh.NORMALS_BIT);
  Mesh._recalcNormals(this.vertices,this.indices,
    this.stride,3);
  return this;
};
/** @private */
Mesh.getStride=function(format){
  if(format<0 || format>8)return -1;
  return [3,6,6,9,5,8,8,11][format];
 }
/** @private */
Mesh.normalOffset=function(format){
  if(format<0 || format>8)return -1;
  return [-1,3,-1,3,-1,3,-1,3][format];
 }
/** @private */
Mesh.colorOffset=function(format){
  if(format<0 || format>8)return -1;
  return [-1,-1,3,6,-1,-1,3,6][format];
 }
/** @private */
Mesh.texCoordOffset=function(format){
  if(format<0 || format>8)return -1;
  return [-1,-1,-1,-1,3,6,6,9][format];
}
/** The mesh contains normals for each vertex.
 @const
 @default
*/
Mesh.NORMALS_BIT = 1;
/** The mesh contains colors for each vertex.
 @const
 @default
*/
Mesh.COLORS_BIT = 2;
/** The mesh contains texture coordinates for each vertex.
 @const
 @default
*/
Mesh.TEXCOORDS_BIT = 4;
/** The mesh consists of lines (2 vertices per line) instead
of triangles (3 vertices per line).
 @const
 @default
*/
Mesh.LINES_BIT = 8;
/**
Primitive mode for rendering triangles, made up
of 3 vertices each.
 @const
*/
Mesh.TRIANGLES = 0;
/**
Primitive mode for rendering a strip of quadrilaterals (quads).
The first 4 vertices make up the first quad, and each additional
quad is made up of the last 2 vertices of the previous quad and
2 new vertices.
 @const
*/
Mesh.QUAD_STRIP = 1;
/**
Primitive mode for rendering quadrilaterals, made up
of 4 vertices each.
 @const
*/
Mesh.QUADS = 2;
/**
Primitive mode for rendering line segments, made up
of 2 vertices each.
 @const
*/
Mesh.LINES = 3;
/**
Primitive mode for rendering a triangle fan.  The first 3
vertices make up the first triangle, and each additional
triangle is made up of the last vertex, the first vertex, and 1
new vertex.
 @const
*/
Mesh.TRIANGLE_FAN = 4;
/**
Primitive mode for rendering a triangle strip.  The first 3
vertices make up the first triangle, and each additional
triangle is made up of the last 2 vertices and 1
new vertex.
 @const
*/
Mesh.TRIANGLE_STRIP = 5;

/** A geometric mesh in the form of vertex buffer objects.
* @class
* @alias glutil.BufferedMesh
* @param {Mesh} mesh A geometric mesh object.
* @param {WebGLRenderingContext} context A WebGL context to
*  create vertex buffers from. (Note that this constructor takes
*  a WebGL context rather than a shader program because
*  vertex buffer objects are not specific to shader programs.)
*/
function BufferedMesh(mesh, context){
 this.subMeshes=[];
 for(var i=0;i<mesh.subMeshes.length;i++){
  this.subMeshes.push(new BufferedSubMesh(
    mesh.subMeshes[i],context));
 }
}
/**
* Binds the buffers in this object to attributes according
* to their data format.
* @param {ShaderProgram} program A shader program object to get
* the IDs from for uniforms named "position", "normal",
* "colorAttr", and "textureUV".
*/
BufferedMesh.prototype.bind=function(program){
 for(var i=0;i<this.subMeshes.length;i++){
  this.subMeshes[i].bind(program);
 }
}
/**
* Draws the elements in this mesh according to the data in its
* vertex buffers.
* @param {ShaderProgram} program A shader program object..
*/
BufferedMesh.prototype.draw=function(program){
 for(var i=0;i<this.subMeshes.length;i++){
  this.subMeshes[i].draw(program);
 }
}
/**
* Deletes the vertex and index buffers associated with this object.
*/
BufferedMesh.prototype.dispose=function(){
 for(var i=0;i<this.subMeshes;i++){
  this.subMeshes[i].dispose();
 }
}
/** @private */
BufferedMesh._vertexAttrib=function(context, attrib, size, type, stride, offset){
  if(attrib!==null){
    context.enableVertexAttribArray(attrib);
    context.vertexAttribPointer(attrib,size,type,false,stride,offset);
  }
}
/** @private */
function BufferedSubMesh(mesh, context){
 var vertbuffer=context.createBuffer();
 var facebuffer=context.createBuffer();
 context.bindBuffer(context.ARRAY_BUFFER, vertbuffer);
 context.bindBuffer(context.ELEMENT_ARRAY_BUFFER, facebuffer);
 context.bufferData(context.ARRAY_BUFFER,
   new Float32Array(mesh.vertices), context.STATIC_DRAW);
 var type=context.UNSIGNED_SHORT;
 if(mesh.vertices.length>=65536 || mesh.indices.length>=65536){
  type=context.UNSIGNED_INT;
  context.bufferData(context.ELEMENT_ARRAY_BUFFER,
    new Uint32Array(mesh.indices), context.STATIC_DRAW);
 } else if(mesh.vertices.length<=256 && mesh.indices.length<=256){
  type=context.UNSIGNED_BYTE;
  context.bufferData(context.ELEMENT_ARRAY_BUFFER,
    new Uint8Array(mesh.indices), context.STATIC_DRAW);
 } else {
  context.bufferData(context.ELEMENT_ARRAY_BUFFER,
    new Uint16Array(mesh.indices), context.STATIC_DRAW);
 }
  this.verts=vertbuffer;
  this.faces=facebuffer;
  this.facesLength=mesh.indices.length;
  this.type=type;
  this.format=mesh.attributeBits;
  this.context=context;
}
/**
 * @private
 */
BufferedSubMesh.prototype.dispose=function(){
 if(this.verts!=null)
  this.context.deleteBuffer(this.verts);
 if(this.faces!=null)
  this.context.deleteBuffer(this.faces);
 this.verts=null;
 this.faces=null;
}
/**
 * @private
 * @param {*} program
 */
BufferedSubMesh.prototype.bind=function(program){
  var context=program.getContext();
  if(this.verts==null || this.faces==null){
   throw new Error("mesh buffer disposed");
  }
  if(context!=this.context){
   throw new Error("can't bind mesh: context mismatch");
  }
  context.bindBuffer(context.ARRAY_BUFFER, this.verts);
  context.bindBuffer(context.ELEMENT_ARRAY_BUFFER, this.faces);
  var format=this.format;
  var stride=Mesh.getStride(format);
  BufferedMesh._vertexAttrib(context,
    program.get("position"), 3, context.FLOAT, stride*4, 0);
  var offset=Mesh.normalOffset(format);
  if(offset>=0){
   BufferedMesh._vertexAttrib(context,
    program.get("normal"), 3,
    context.FLOAT, stride*4, offset*4);
  }
  offset=Mesh.colorOffset(format);
  if(offset>=0){
   BufferedMesh._vertexAttrib(context,
    program.get("colorAttr"), 3,
    context.FLOAT, stride*4, offset*4);
  }
  offset=Mesh.texCoordOffset(format);
  if(offset>=0){
   BufferedMesh._vertexAttrib(context,
     program.get("textureUV"), 2,
    context.FLOAT, stride*4, offset*4);
  }
}
/**
 *
 * @param {*} program
 */
BufferedSubMesh.prototype.draw=function(program){
  var context=program.getContext();
  if(this.verts==null || this.faces==null){
   throw new Error("mesh buffer disposed");
  }
  if(context!=this.context){
   throw new Error("can't bind mesh: context mismatch");
  }
  context.drawElements(
    ((this.format&Mesh.LINES_BIT)!=0) ? context.LINES :
      context.TRIANGLES,
    this.facesLength,
    this.type, 0);
}

/**
*  Specifies a texture, which can serve as image data applied to
*  the surface of a shape, or even a 2-dimensional array of pixels
*  used for some other purpose, depending on the shader.
* @class
* @alias glutil.Texture
* @param {string} name URL of the texture data.  It will be loaded via
*  the JavaScript DOM's Image class.  However, this constructor
*  will not load that image yet.
*/
var Texture=function(name){
 this.textureImage=null;
 this.name=name;
 this.material=new MaterialShade();
}
/** @private */
Texture._fromTextureImage=function(textureImage){
 var tex=new Texture(textureImage.name);
 tex.textureImage=textureImage;
 tex.name=textureImage.name;
 tex.material=new MaterialShade();
 return tex;
}

/**
*  Loads a texture by its URL.
* @param {string} name URL of the texture data.  It will be loaded via
*  the JavaScript DOM's Image class.  However, this constructor
*  will not load that image yet.
* @param {Object|undefined} textureCache An object whose keys
* are the names of textures already loaded.  This will help avoid loading
* the same texture more than once.  This parameter is optional
* and may be omitted.
* @return {Promise} A promise that resolves when the texture
* is fully loaded.  If it resolves, the result will be a Texture object.
*/
Texture.loadTexture=function(name, textureCache){
 // Get cached texture
 if(textureCache &&
    textureCache[name] && textureCache.hasOwnProperty(name)){
   var ret=Texture._fromTextureImage(textureCache[name]);
   return Promise.resolve(ret);
 }
 var texImage=new TextureImage(name);
 if(textureCache){
  textureCache[name]=texImage;
 }
 // Load new texture and cache it
 return texImage.loadImage().then(
  function(result){
   return Texture._fromTextureImage(result);
  },
  function(name){
    return Promise.reject(name.name);
  });
}

/**
*  Loads a texture by its URL, then uploads its data to
* a texture buffer.
* @param {string} name URL of the texture data.  It will be loaded via
*  the JavaScript DOM's Image class.  However, this constructor
*  will not load that image yet.
* @param {string} context A WebGL context under which a texture
* buffer will be created and the texture data loaded.
* @param {Object|undefined} textureCache An object whose keys
* are the names of textures already loaded.  This will help avoid loading
* the same texture more than once.  This parameter is optional
* and may be omitted.
* @return {Promise} A promise that resolves when the texture
* is fully loaded and its data is uploaded to a texture
* buffer.  If it resolves, the result will be a Texture object.
*/
Texture.loadAndMapTexture=function(name, context, textureCache){
  return Texture.loadTexture(name, textureCache).then(function(result){
    return result.mapToContext(context);
  });
};
/**
 * Sets material parameters for this texture object.
 * @param {MaterialShade} material
 */
Texture.prototype.setParams=function(material){
 this.material=material;
 return this;
}
/**
 *
 * @param {*} context
 */
Texture.prototype.mapToContext=function(context){
 this.textureImage.mapToContext(context);
 return this;
}
/**
 *
 * @param {*} program
 */
Texture.prototype.bind=function(program){
 if(this.textureImage!==null){
  this.textureImage.bind(program);
 } else if(this.name!==null){
  this.textureImage=new TextureImage(this.name);
  this.textureImage.loadImage();
 }
 if(this.material){
   this.material.bind(program);
   program.setUniforms({
     "textureSize":[this.width,this.height]
    });
 }
}

/**
* Represents an off-screen frame buffer.
* @class
* @alias glutil.FrameBuffer
* @param {WebGLRenderingContext} context
* WebGL context associated with this buffer.
* @param {number} width Width, in pixels, of the frame buffer.
* Fractional values are rounded up.
* @param {number} height Height, in pixels, of the frame buffer.
* Fractional values are rounded up.
*/
function FrameBuffer(context, width, height){
 if(width<0 || height<0)throw new Error("width or height negative");
 this.context=context;
 this.buffer=context.createFramebuffer();
 // create color texture
 this.colorTexture = context.createTexture();
 this.width=Math.ceil(width);
 this.height=Math.ceil(height);
this.context.bindTexture(this.context.TEXTURE_2D, this.colorTexture);
this.context.texParameteri(this.context.TEXTURE_2D,
  this.context.TEXTURE_MAG_FILTER, this.context.NEAREST);
this.context.texParameteri(this.context.TEXTURE_2D,
  this.context.TEXTURE_MIN_FILTER, this.context.NEAREST);
this.context.texParameteri(this.context.TEXTURE_2D,
  this.context.TEXTURE_WRAP_S, this.context.CLAMP_TO_EDGE);
this.context.texParameteri(this.context.TEXTURE_2D,
  this.context.TEXTURE_WRAP_T, this.context.CLAMP_TO_EDGE);
this.context.texImage2D(this.context.TEXTURE_2D, 0,
  this.context.RGBA, this.width, this.height, 0,
   this.context.RGBA, this.context.UNSIGNED_BYTE, null);
 // create depth renderbuffer
 this.depthbuffer=context.createRenderbuffer();
 this.context.bindFramebuffer(
   context.FRAMEBUFFER,this.buffer);
 this.context.bindRenderbuffer(
   context.RENDERBUFFER,this.depthbuffer);
 this.context.renderbufferStorage(
   context.RENDERBUFFER,context.DEPTH_COMPONENT16,
   this.width,this.height);
 // attach color and depth buffers
 this.context.framebufferTexture2D(
   context.FRAMEBUFFER,context.COLOR_ATTACHMENT0,
   context.TEXTURE_2D,this.colorTexture,0);
 this.context.framebufferRenderbuffer(
   context.FRAMEBUFFER,context.DEPTH_ATTACHMENT,
   context.RENDERBUFFER,this.depthbuffer);
 this.context.bindFramebuffer(
   context.FRAMEBUFFER,null);
}
/**
 * Returns a material object for binding to Shapes.
 * @return {Object} An object implementing the method
 * bind(program), similar to MaterialShade and Texture
 * objects, and exposing the texture this frame buffer uses.
 */
FrameBuffer.prototype.getMaterial=function(){
  var thisObj=this;
  return {"bind":function(program){
      var uniforms={};
      uniforms["textureSize"]=[thisObj.width,thisObj.height];
      program.setUniforms(uniforms);
      var ctx=program.getContext()
      ctx.activeTexture(ctx.TEXTURE0);
      ctx.bindTexture(ctx.TEXTURE_2D,
        thisObj.colorTexture);
    }
  };
}
/**
 * Not documented yet.
 * @param {WebGLShaderProgram} program
 */
FrameBuffer.prototype.bind=function(program){
  if(program.getContext()!=this.context){
   throw new Error("can't bind buffer: context mismatch");
  }
  this.context.bindFramebuffer(
    this.context.FRAMEBUFFER,this.buffer);
}
/**
 * Not documented yet.
 */
FrameBuffer.prototype.unbind=function(){
  this.context.bindFramebuffer(
    this.context.FRAMEBUFFER,null);
}
/**
 * Not documented yet.
 */
FrameBuffer.prototype.dispose=function(){
 if(this.buffer!=null)
  this.context.deleteFramebuffer(this.buffer);
 if(this.depthbuffer!=null)
  this.context.deleteRenderbuffer(this.depthbuffer);
 if(this.colorTexture!=null)
  this.context.deleteTexture(this.colorTexture);
 this.buffer=null;
 this.depthbuffer=null;
 this.colorTexture=null;
}

//////////////////////////////////
var TextureImage=function(name){
  this.textureName=null;
  this.name=name;
  this.image=null;
  this.width=0;
  this.height=0;
}
/**
 *
 */
TextureImage.prototype.loadImage=function(){
 if(this.image!==null){
  // already loaded
  return Promise.resolve(this);
 }
 var thisImage=this;
 var thisName=this.name;
 return new Promise(function(resolve,reject){
  var image=new Image();
  image.onload=function(e) {
   var target=e.target;
   thisImage.image=target;
   resolve(thisImage);
  }
  image.onerror=function(e){
   reject({name:name});
  }
  image.src=thisName;
 });
}
/**
 * @param {*} context
 */
TextureImage.prototype.mapToContext=function(context){
  if(this.textureName!==null){
   // already loaded
   return this;
  }
  function isPowerOfTwo(a){
   if(Math.floor(a)!=a || a<=0)return false;
   while(a>1 && (a&1)==0){
    a>>=1;
   }
   return (a==1);
  }
  this.textureName=context.createTexture();
  this.width=this.image.width;
  this.height=this.image.height;
  context.pixelStorei(context.UNPACK_FLIP_Y_WEBGL, true);
  context.bindTexture(context.TEXTURE_2D, this.textureName);
  context.texParameteri(context.TEXTURE_2D,
    context.TEXTURE_MAG_FILTER, context.LINEAR);
  context.texImage2D(context.TEXTURE_2D, 0,
    context.RGBA, context.RGBA, context.UNSIGNED_BYTE,
    this.image);
  if(isPowerOfTwo(this.image.width) &&
      isPowerOfTwo(this.image.height)){
   // Enable mipmaps if texture's dimensions are powers of two
   context.texParameteri(context.TEXTURE_2D,
     context.TEXTURE_MIN_FILTER, context.LINEAR_MIPMAP_LINEAR);
   context.generateMipmap(context.TEXTURE_2D);
   context.texParameteri(context.TEXTURE_2D,
     context.TEXTURE_WRAP_S, context.REPEAT);
   context.texParameteri(context.TEXTURE_2D,
     context.TEXTURE_WRAP_T, context.REPEAT);
  } else {
   context.texParameteri(context.TEXTURE_2D,
     context.TEXTURE_MIN_FILTER, context.LINEAR);
   // Other textures require this wrap mode
   context.texParameteri(context.TEXTURE_2D,
     context.TEXTURE_WRAP_S, context.CLAMP_TO_EDGE);
   context.texParameteri(context.TEXTURE_2D,
     context.TEXTURE_WRAP_T, context.CLAMP_TO_EDGE);
  }
  return this;
}
/**
 *
 * @param {*} program
 */
TextureImage.prototype.bind=function(program){
   if(this.image!==null && this.textureName===null){
      // load the image as a texture
      this.mapToContext(program.getContext());
   } else if(this.image===null && this.textureName===null){
      var thisObj=this;
      var prog=program;
      this.loadImage().then(function(e){
        // try again loading the image
        thisObj.bind(prog);
      });
      return;
   }
   if (this.textureName!==null) {
      var uniforms={};
      uniforms["textureSize"]=[this.width,this.height];
      program.setUniforms(uniforms);
      var ctx=program.getContext()
      ctx.activeTexture(ctx.TEXTURE0);
      ctx.bindTexture(ctx.TEXTURE_2D,
        this.textureName);
    }
}
////////////////////////////////////////

/**
 * A holder object representing a 3D scene.  This object includes
 * information on:<ul>
 *<li> A projection matrix, for setting the camera projection.</li>
 *<li> A view matrix, for setting the camera's view and position.</li>
 *<li> Lighting parameters.</li>
 *<li> Shapes to be drawn to the screen.</li>
 *<li> A texture cache.</li>
 *<li> A screen-clearing background color.</li>
 *</ul>
 * When a Scene3D object is created, it compiles and loads
 * a default shader program that enables lighting parameters,
 * and sets the projection and view matrices to identity.
*  @class
* @alias glutil.Scene3D
 * @param {WebGLRenderingContext} context A WebGL 3D context to associate
 * with this scene.
 */
function Scene3D(context){
 this.context=context;
 this.context.viewport(0,0,
    this.context.canvas.width*1.0,this.context.canvas.height*1.0);
 this.lightingEnabled=true;
 this.specularEnabled=true;
 this.program=new ShaderProgram(context,
   this._getDefines()+ShaderProgram.getDefaultVertex(),
   this._getDefines()+ShaderProgram.getDefaultFragment());
 this.shapes=[];
 this.clearColor=[0,0,0,1];
 this.fboFilter=null;
 this.textureCache={};
 this.context.enable(context.BLEND);
 this._projectionMatrix=GLMath.mat4identity();
 this._viewMatrix=GLMath.mat4identity();
 this._matrixDirty=true;
 this._invProjectionView=null;
 this._invTransModel3=null;
 this._invView=null;
 this.lightSource=new Lights();
 this.context.blendFunc(context.SRC_ALPHA,context.ONE_MINUS_SRC_ALPHA);
 this.context.enable(this.context.DEPTH_TEST);
 this.context.depthFunc(this.context.LEQUAL);
 this._setClearColor();
 this.context.clearDepth(999999);
 this.context.clear(
    this.context.COLOR_BUFFER_BIT |
    this.context.DEPTH_BUFFER_BIT);
 this.useProgram(this.program);
}
/** Returns the WebGL context associated with this scene. */
Scene3D.prototype.getContext=function(){
 return this.context;
}
/** @private */
Scene3D.prototype._getDefines=function(){
 var ret="";
 if(this.lightingEnabled)
  ret+="#define SHADING\n"
 if(this.lightingEnabled)
  ret+="#define SPECULAR\n"
 return ret;
}
/** @private */
Scene3D.prototype._initProgramData=function(){
  this.program.setUniforms({
    "sampler":0,
  });
  this.lightSource.bind(this.program);
  // update matrix-related uniforms later
  this._matrixDirty=true;
}
/**
* Changes the active shader program for this scene
* and prepares this object for the new program.
* @param {ShaderProgram} program The shader program to use.
* @return {Scene3D} This object.
*/
Scene3D.prototype.useProgram=function(program){
 if(!program)throw new Error("invalid program");
 program.use();
 this.program=program;
 this._initProgramData();
 return this;
}
/** Changes the active shader program for this scene
* to a program that doesn't support lighting.
* @return {Scene3D} This object.
*/
Scene3D.prototype.disableLighting=function(){
 this.lightingEnabled=false;
 var program=new ShaderProgram(this.context,
   this._getDefines()+ShaderProgram.getDefaultVertex(),
   this._getDefines()+ShaderProgram.getDefaultFragment());
 return this.useProgram(program);
}
/** Gets the viewport width for this scene.
* @return {number}
*/
Scene3D.prototype.getWidth=function(){
 return this.context.canvas.width*1.0;
}
/** Gets the viewport height for this scene.
* @return {number}
*/
Scene3D.prototype.getHeight=function(){
 return this.context.canvas.height*1.0;
}
/** Gets the ratio of width to height for this scene.
* @return {number}
*/
Scene3D.prototype.getAspect=function(){
 return this.getWidth()/this.getHeight();
}
/**
 * Creates a frame buffer object associated with this scene.
 * @return {FrameBuffer} A buffer with the same size as this scene.
 */
Scene3D.prototype.createBuffer=function(){
 return new FrameBuffer(this.context,
   this.getWidth(),this.getHeight());
}

/**
*  Sets this scene's projection matrix to a perspective view.
* @param {number}  fov Vertical field of view, in degrees.  (The smaller
* this number, the bigger close objects appear to be.  As a result,
* zoom can be implemented by multiplying field of view by an
* additional factor.)
* @param {number}  aspect The ratio of width to height of the viewport, usually
*  the scene's aspect ratio (getAspect()).
* @param {number} near The distance from the camera to
* the near clipping plane. This should be slightly greater than 0.
* @param {number}  far The distance from the camera to
* the far clipping plane. Objects beyond this distance will be too far
* to be seen.
* @return {Scene3D} This object.
*/
Scene3D.prototype.setPerspective=function(fov, aspect, near, far){
 return this.setProjectionMatrix(GLMath.mat4perspective(fov,
   aspect,near,far));
}
/**
 * Sets this scene's projection matrix to a perspective view that defines
 * the view frustum, or the limits in the camera's view.
 * @param {number} left
 * @param {number} right
 * @param {number} bottom
 * @param {number} top
* @param {number} near The distance from the camera to
* the near clipping plane. This should be slightly greater than 0.
* @param {number}  far The distance from the camera to
* the far clipping plane. Objects beyond this distance will be too far
* to be seen.
* @return {Scene3D} This object.
 */
Scene3D.prototype.setFrustum=function(left,right,bottom,top,near,far){
 return this.setProjectionMatrix(GLMath.mat4frustum(
   left, right, top, bottom, near, far));
}
/**
 * Sets this scene's projection matrix to an orthographic view.
 * @param {number} left
 * @param {number} right
 * @param {number} bottom
 * @param {number} top
* @param {number} near
* @param {number}  far
* @return {Scene3D} This object.
 */
Scene3D.prototype.setOrtho=function(left,right,bottom,top,near,far){
 return this.setProjectionMatrix(GLMath.mat4ortho(
   left, right, top, bottom, near, far));
}
/**
 * Sets this scene's projection matrix to a 2D orthographic view.
 * @param {number} left Leftmost coordinate of the 2D view.
 * @param {number} right Rightmost coordinate of the 2D view.
 * @param {number} bottom Bottommost coordinate of the 2D view.
 * @param {number} top Topmost coordinate of the 2D view.
* @return {Scene3D} This object.
 */
Scene3D.prototype.setOrtho2D=function(left,right,bottom,top){
 return this.setProjectionMatrix(GLMath.mat4ortho(
   left, right, top, bottom, -1, 1));
}
/** @private */
Scene3D.prototype._setClearColor=function(){
  this.context.clearColor(this.clearColor[0],this.clearColor[1],
    this.clearColor[2],this.clearColor[3]);
  return this;
}

/**
* Sets the color used when clearing the screen each frame.
* This color is black by default.
* @param {Array<number>|number|string} r Array of three or
* four color components; or the red color component (0-1); or a string
* specifying an HTML or CSS color.
* @param {number} g Green color component (0-1).
* May be omitted if a string or array is given as the "r" parameter.
* @param {number} b Blue color component (0-1).
* May be omitted if a string or array is given as the "r" parameter.
* @param {number} a Alpha color component (0-1).
* May be omitted if a string or array is given as the "r" parameter.
* @return {Scene3D} This object.
*/
Scene3D.prototype.setClearColor=function(r,g,b,a){
 this.clearColor=GLUtil["toGLColor"](r,g,b,a);
 return this._setClearColor();
}
/**
* Loads a texture from an image URL.
* @param {string} URL of the image to load.
* @return {Promise} A promise that is resolved when
* the image is loaded successfully (the result will be a Texture
* object), and is rejected when an error occurs.
*/
Scene3D.prototype.loadTexture=function(name){
 return Texture.loadTexture(name, this.textureCache);
}
/**
* Loads a texture from an image URL and uploads it
* to a texture buffer object.
* @param {string} name URL of the image to load.
* @return {Promise} A promise that is resolved when
* the image is loaded successfully and uploaded
* to a texture buffer (the result will be a Texture
* object), and is rejected when an error occurs.
*/
Scene3D.prototype.loadAndMapTexture=function(name){
 return Texture.loadAndMapTexture(
   name, this.context, this.textureCache);
}
/**
* Loads one or more textures from an image URL and uploads each of them
* to a texture buffer object.
* @param {Array<string>} textureFiles A list of URLs of the image to load.
* @param {Function|undefined} resolved Called for each URL that is loaded successfully
* and uploaded to a texture buffer(the argument will be a Texture object.)
* @param {Function|undefined} rejected Called for each URL for which an error
* occurs (the argument will be the data passed upon
* rejection).
* @return {Promise} A promise that is resolved when
* all the URLs in the textureFiles array are either resolved or rejected.
* The result will be an object with two properties: "successes" and "failures".
* See GLUtil.getPromiseResults.
*/
Scene3D.prototype.loadAndMapTextures=function(textureFiles, resolve, reject){
 var promises=[];
 for(var i=0;i<textureFiles.length;i++){
  var objf=textureFiles[i];
  var p=this.loadAndMapTexture(objf);
  promises.push(p);
 }
 return GLUtil.getPromiseResults(promises, resolve, reject);
}
/** @private */
Scene3D.prototype._updateMatrix=function(){
 if(this._matrixDirty){
  var projView=GLMath.mat4multiply(this._projectionMatrix,this._viewMatrix);
  this._invProjectionView=GLMath.mat4invert(projView);
  this._invView=GLMath.mat4invert(this._viewMatrix);
  this.program.setUniforms({
   "view":this._viewMatrix,
   "projection":this._projectionMatrix,
   "viewInverse":this._invView,
  });
  this._matrixDirty=false;
 }
}
/**
 * Sets the projection matrix for this object.  The projection
 * matrix can also be set using the setFrustum(), setOrtho(),
 * setOrtho2D(), and setPerspective() methods.
 * @param {Array<number>} matrix A 16-element matrix (4x4).
 * @return {Scene3D} This object.
 */
Scene3D.prototype.setProjectionMatrix=function(matrix){
 this._projectionMatrix=GLMath.mat4copy(matrix);
 this._matrixDirty=true;
 return this;
}
/**
*  Sets this scene's view matrix. The view matrix can also
* be set using the setLookAt() method.
 * @param {Array<number>} matrix A 16-element matrix (4x4).
 * @return {Scene3D} This object.
*/
Scene3D.prototype.setViewMatrix=function(matrix){
 this._viewMatrix=GLMath.mat4copy(matrix);
 this._matrixDirty=true;
 return this;
}
/**
*  Sets this scene's view matrix to represent a camera view.
* @param {Array<number>} eye A 3-element vector specifying
* the camera position in world space.
* @param {Array<number>} center A 3-element vector specifying
* the point in world space that the camera is looking at.
* @param {Array<number>|undefined} up A 3-element vector specifying
* the up-vector direction.  May be omitted, in which case
* the default is a vector pointing positive on the Y axis.  This
* vector must not point in the same or opposite direction as
* the camera's view direction.
* @return {Scene3D} This object.
*/
Scene3D.prototype.setLookAt=function(eye, center, up){
 up = up || [0,1,0];
 this._viewMatrix=GLMath.mat4lookat(eye, center, up);
 this._matrixDirty=true;
 return this;
}
/**
* Adds a 3D shape to this scene.
* @param {Shape|MultiShape} shape A 3D shape.
* @return {Scene3D} This object.
*/
Scene3D.prototype.addShape=function(shape){
 this.shapes.push(shape.loadMesh(this.context));
 return this;
}
/**
 *
 * @param {*} index
 * @param {*} position
 * @param {*} diffuse
 * @param {*} specular
* @return {Scene3D} This object.
 */
Scene3D.prototype.setDirectionalLight=function(index,position,diffuse,specular){
 this.lightSource.setDirectionalLight(index,position,diffuse,specular);
 this.lightSource.bind(this.program);
 return this;
}
/**
 *
 * @param {*} index
 * @param {*} position
 * @param {*} diffuse
 * @param {*} specular
* @return {Scene3D} This object.
 */
Scene3D.prototype.setPointLight=function(index,position,diffuse,specular){
 this.lightSource.setPointLight(index,position,diffuse,specular);
 this.lightSource.bind(this.program);
 return this;
}
/**
 *  Renders all shapes added to this scene.
 *  This is usually called in a render loop, such
 *  as GLUtil.renderLoop().
 * @return {Scene3D} This object.
 */
Scene3D.prototype.render=function(){
  if(typeof this.fboFilter!="undefined" && this.fboFilter){
   // Render to the framebuffer, then to the main buffer via
   // a filter
   var oldProgram=this.program;
   var oldProj=this._projectionMatrix.slice(0,16);
   var oldView=this._viewMatrix.slice(0,16);
   this.useProgram(oldProgram);
   this.setProjectionMatrix(oldProj);
   this.setViewMatrix(oldView);
   this.fbo.bind(oldProgram);
   this._renderInner();
   this.fbo.unbind();
   this.useProgram(this.fboFilter);
   this.context.clear(
    this.context.COLOR_BUFFER_BIT);
   this.setProjectionMatrix(GLMath.mat4identity());
   this.setViewMatrix(GLMath.mat4identity());
   this._updateMatrix();
   this.fboQuad.render(this.fboFilter);
   this.setProjectionMatrix(oldProj);
   this.setViewMatrix(oldView);
   this.useProgram(oldProgram);
   return this;
  } else {
   // Render as usual
   return this._renderInner();
  }
}
/**
 * Uses a shader program to apply a texture filter after the
 * scene is rendered.  If a filter program is used, the scene will
 * create a frame buffer object, render its shapes to that frame
 * buffer, and then apply the filter program as it renders the
 * frame buffer to the canvas.
 * @param {ShaderProgram} filterProgram A shader
 * program that implements a texture filter.  The program
 * could be created using the ShaderProgram.makeEffect() method.
 * If this value is null, texture filtering is disabled and shapes
 * are rendered to the canvas normally.
 * @return {Scene3D} This object.
 */
Scene3D.prototype.useFilter=function(filterProgram){
 if(filterProgram==null){
  this.fboFilter=null;
 } else {
  if(typeof filterProgram=="string"){
   // Assume the string is GLSL source code
   this.fboFilter=ShaderProgram.makeEffect(this.context,
    filterProgram);
  } else {
   this.fboFilter=filterProgram;
  }
  if(typeof this.fbo=="undefined" || !this.fbo){
   this.fbo=this.createBuffer();
  }
  if(typeof this.fboQuad=="undefined" || !this.fboQuad){
   var width=this.getWidth();
   var height=this.getHeight();
   var mesh=new Mesh(
     [-1,1,0,0,0,
      -1,-1,0,0,1,
      1,1,0,1,0,
      1,-1,0,1,1],
     [0,1,2,2,1,3],
     Mesh.TEXCOORDS_BIT);
   this.fboQuad=new Shape(mesh).setMaterial(this.fbo.getMaterial());
  }
 }
 return this;
}
/** @private */
Scene3D.prototype._renderInner=function(){
  this._updateMatrix();
  this.context.clear(
    this.context.COLOR_BUFFER_BIT |
    this.context.DEPTH_BUFFER_BIT);
  for(var i=0;i<this.shapes.length;i++){
   this.shapes[i].render(this.program);
  }
  this.context.flush();
  return this;
}

/** A shape object that gathers multiple shapes
 and treats them as one bigger shape.
    @class
* @alias glutil.MultiShape
 */
function MultiShape(){
 this.shapes=[];
}
/** Sets the scaling for each individual shape. */
MultiShape.prototype.setScale=function(x,y,z){
 for(var i=0;i<this.shapes.length;i++){
  this.shapes[i].setScale(x,y,z);
 }
}
/**
 *
 * @param {*} program
 */
MultiShape.prototype.render=function(program){
 for(var i=0;i<this.shapes.length;i++){
  this.shapes[i].render(program);
 }
}
/**
 *
 * @param {*} context
 */
MultiShape.prototype.loadMesh=function(context){
 for(var i=0;i<this.shapes.length;i++){
  this.shapes[i].loadMesh(context);
 }
 return this;
}
/**
 *
 * @param {*} shape
 */
MultiShape.prototype.add=function(shape){
 this.shapes.push(shape);
}
/**
 * Not documented yet.
 * @param {*} material
 */
MultiShape.prototype.setMaterial=function(material){
 for(var i=0;i<this.shapes.length;i++){
  this.shapes[i].setMaterial(material);
 }
}

/**
* An object that associates a geometric mesh (the shape of the object) with
*  material data (which defines what is seen on the object's surface)
 * and a transformation matrix (which defines the object's position and size).
 *  @class
* @alias glutil.Shape
* @param {Mesh} mesh A geometric mesh to associate with this shape.
  */
function Shape(mesh){
  if(mesh==null)throw new Error("mesh is null");
  this.mesh=mesh;
  this.vertfaces=null;
  this.material=new MaterialShade();
  this.scale=[1,1,1];
  this.angle=0;
  this.position=[0,0,0];
  this.rotation=[0,0,0];
  this._matrixDirty=true;
  this._invTransModel3=GLMath.mat3identity();
  this.matrix=GLMath.mat4identity();
}
/**
 * Loads this shape's mesh to vertex buffer objects.
 * @param {*} context The WebGL context under which
 * to load this shape's mesh.
 * @return {Shape} This object.
 */
Shape.prototype.loadMesh=function(context){
 if(!this.vertfaces){
  this.vertfaces=new BufferedMesh(this.mesh,context);
 }
 return this;
}
/**
 *
 * @param {*} value
 * @return {Shape} This object.
 */
Shape.prototype.setMatrix=function(value){
 this._matrixDirty=false;
 this.matrix=value;
 this._invTransModel3=GLMath.mat4inverseTranspose3(this.matrix);
 return this;
}
/**
* Sets material parameters that give the shape a certain color.
* @param {Array<number>|number|string} r Array of three or
* four color components; or the red color component (0-1); or a string
* specifying an HTML or CSS color.
* @param {number} g Green color component (0-1).
* May be omitted if a string or array is given as the "r" parameter.
* @param {number} b Blue color component (0-1).
* May be omitted if a string or array is given as the "r" parameter.
* @param {number} a Alpha color component (0-1).
* May be omitted if a string or array is given as the "r" parameter.
 * @return {Shape} This object.
*/
Shape.prototype.setColor=function(r,g,b,a){
 this.material=MaterialShade.fromColor(r,g,b,a);
 return this;
}
/** Sets this shape's material parameters.
* @param {MaterialShade|Texture} material
 * @return {Shape} This object.
*/
Shape.prototype.setMaterial=function(material){
 this.material=material;
 return this;
}
/**
 * Sets the scale of this shape relative to its original
 * size.
 * @param {*} x
 * @param {*} y
 * @param {*} z
* @return {Scene3D} This object.
 */
Shape.prototype.setScale=function(x,y,z){
  if(x!=null && y==null && z==null){
   if(x.constructor==Array)
    this.scale=x.slice(0,3);
   else
    this.scale=[x,x,x];
  } else {
   this.scale=[x,y,z];
  }
  this._matrixDirty=true;
  return this;
}
/**
 * Sets the relative position of this shape from the origin.
 * @param {Array<number>|number} x Either the X-coordinate,
 * or an array of 3 numbers giving the x, y, and z coordinates.
 * @param {number} y The Y-coordinate.
 * If "x" is an array, this parameter may be omitted.
 * @param {number} z The Z-coordinate.
 * If "x" is an array, this parameter may be omitted.
 * @return {Shape} This object.
 */
Shape.prototype.setPosition=function(x,y,z){
  if(x!=null && y==null && z==null){
   if(x.constructor==Array)
    this.position=x.slice(0,3);
   else
    this.position=[x,x,x];
  } else {
   this.position=[x,y,z];
  }
  this._matrixDirty=true;
  return this;
}
/**
 *
 * @param {Array<number>|number} x Rotation about the X-axis in degrees
 * (may be negative),
 * or an array of 3 numbers giving the rotation about the x, y, and z axis.
 * @param {number} y Rotation about the Y-axis in degrees (may be negative).
 * If "x" is an array, this parameter may be omitted.
 * @param {number} z Rotation about the Z-axis in degrees (may be negative).
 * If "x" is an array, this parameter may be omitted.
 * @return {Shape} This object.
 */
Shape.prototype.setRotation=function(x,y,z){
  if(x!=null && y==null && z==null){
   if(x.constructor==Array)
    this.rotation=x.slice(0,3);
   else
    this.rotation=[x,x,x];
  } else {
   this.rotation=[x,y,z];
  }
  this._matrixDirty=true;
  return this;
}
/**
 *
 * @param {*} program
 * @return {Shape} This object.
 */
Shape.prototype.render=function(program){
  // Set material (texture or color)
  if(this.material){
   this.material.bind(program);
  }
  // Bind vertex attributes
  if(this.vertfaces==null){
   this.vertfaces=new BufferedMesh(this.mesh,
     program.getContext());
  }
  this.vertfaces.bind(program);
  // Set world matrix
  var uniforms={};
  var uniformMatrix=program.get("world");
  if(uniformMatrix!==null){
   if(this._matrixDirty){
    this._updateMatrix();
   }
   uniforms["world"]=this.matrix;
   uniforms["worldInverseTrans3"]=this._invTransModel3;
  }
  uniforms["useColorAttr"]=((this.vertfaces.format&Mesh.COLORS_BIT)!=0) ?
     1.0 : 0.0;
  program.setUniforms(uniforms);
  this.vertfaces.draw(program);
  return this;
};
/** @private */
Shape.prototype._updateMatrix=function(){
  this._matrixDirty=false;
  this.matrix=GLMath.mat4identity();
  this.matrix=GLMath.mat4translate(this.matrix,this.position[0],
    this.position[1],this.position[2]);
  if(this.rotation[0]!=0){
    this.matrix=GLMath.mat4rotate(this.matrix,this.rotation[0],[1,0,0]);
  }
  if(this.rotation[1]!=0){
    this.matrix=GLMath.mat4rotate(this.matrix,this.rotation[1],[0,1,0]);
  }
  if(this.rotation[2]!=0){
    this.matrix=GLMath.mat4rotate(this.matrix,this.rotation[2],[0,0,1]);
  }
  this.matrix=GLMath.mat4scale(this.matrix,this.scale);
  this._invTransModel3=GLMath.mat4inverseTranspose3(this.matrix);
}
/////////////
exports["BufferedMesh"]=BufferedMesh;
exports["Lights"]=Lights;
exports["FrameBuffer"]=FrameBuffer;
exports["LightSource"]=LightSource;
exports["Mesh"]=Mesh;
exports["Texture"]=Texture;
exports["MaterialShade"]=MaterialShade;
exports["MultiShape"]=MultiShape;
exports["Shape"]=Shape;
exports["Scene3D"]=Scene3D;
exports["ShaderProgram"]=ShaderProgram;
exports["GLUtil"]=GLUtil;
}));
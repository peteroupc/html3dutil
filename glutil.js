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
* This method will call the function once before returning,
* and queue requests to call that function once per frame.
* (If the browser doesn't
* support requestAnimationFrame or an equivalent, uses
* setTimeout to implement this method.)
* @param {Function} func The function to call.
*/
"renderLoop":function(func){
  func();
  var selfRefFunc=function(){
   window.requestAnimationFrame(selfRefFunc);
   func();
  };
  window.requestAnimationFrame(selfRefFunc);
},
/**
* Creates an HTML canvas element, optionally appending
* it to an existing HTML element.
* @param {number|null} width Width of the new canvas
* element, or if null, the value <code>window.innerWidth</code>.
* The resulting width will be rounded up.
* This parameter can't be a negative number.
* @param {number|null} height Height of the new canvas
* element, or if null, the value <code>window.innerHeight</code>.
* The resulting height will be rounded up.
* This parameter can't be a negative number.
* @param {HTMLElement|null} parent If non-null, the parent
* element of the new HTML canvas element. The element will be
* appended as a child of this parent.
* @return {HTMLCanvasElement} The resulting canvas element.
*/
"createCanvas":function(width, height, parent){
 var canvas=document.createElement("canvas");
 if(width==null){
  canvas.width=Math.ceil(window.innerWidth)+"";
 } else if(width<0){
  throw new Error("width negative");
 } else {
  canvas.width=Math.ceil(width)+"";
 }
 if(height==null){
  canvas.height=Math.ceil(window.innerHeight)+"";
 } else if(height<0){
  throw new Error("height negative");
 } else {
  canvas.height=Math.ceil(height)+"";
 }
 if(parent){
  parent.appendChild(canvas);
 }
 return canvas;
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
  }
  return context;
},
/**
* Creates a 3D rendering context from an HTML canvas element.
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
* See the "{@tutorial shapes}" tutorial.
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
-xSize,-ySize,zSize,-1.0,0.0,0.0,1.0,0.0,
-xSize,ySize,zSize,-1.0,0.0,0.0,1.0,1.0,
-xSize,ySize,-zSize,-1.0,0.0,0.0,0.0,1.0,
-xSize,-ySize,-zSize,-1.0,0.0,0.0,0.0,0.0,
xSize,-ySize,-zSize,1.0,0.0,0.0,1.0,0.0,
xSize,ySize,-zSize,1.0,0.0,0.0,1.0,1.0,
xSize,ySize,zSize,1.0,0.0,0.0,0.0,1.0,
xSize,-ySize,zSize,1.0,0.0,0.0,0.0,0.0,
xSize,-ySize,-zSize,0.0,-1.0,0.0,1.0,0.0,
xSize,-ySize,zSize,0.0,-1.0,0.0,1.0,1.0,
-xSize,-ySize,zSize,0.0,-1.0,0.0,0.0,1.0,
-xSize,-ySize,-zSize,0.0,-1.0,0.0,0.0,0.0,
xSize,ySize,zSize,0.0,1.0,0.0,1.0,0.0,
xSize,ySize,-zSize,0.0,1.0,0.0,1.0,1.0,
-xSize,ySize,-zSize,0.0,1.0,0.0,0.0,1.0,
-xSize,ySize,zSize,0.0,1.0,0.0,0.0,0.0,
-xSize,-ySize,-zSize,0.0,0.0,-1.0,1.0,0.0,
-xSize,ySize,-zSize,0.0,0.0,-1.0,1.0,1.0,
xSize,ySize,-zSize,0.0,0.0,-1.0,0.0,1.0,
xSize,-ySize,-zSize,0.0,0.0,-1.0,0.0,0.0,
xSize,-ySize,zSize,0.0,0.0,1.0,1.0,0.0,
xSize,ySize,zSize,0.0,0.0,1.0,1.0,1.0,
-xSize,ySize,zSize,0.0,0.0,1.0,0.0,1.0,
-xSize,-ySize,zSize,0.0,0.0,1.0,0.0,0.0]
 var faces=[0,1,2,0,2,3,4,5,6,4,6,7,8,9,10,8,10,11,12,
 13,14,12,14,15,16,17,18,16,18,19,20,21,22,20,22,23]
 return new Mesh(vertices,faces,Mesh.NORMALS_BIT | Mesh.TEXCOORDS_BIT);
},
/**
* Creates a mesh of a cylinder.  The cylinder's base will
* be centered at the origin and its height will run along the
* positive z-axis.  The base and top themselves will not be
* included in the mesh.
* See the "{@tutorial shapes}" tutorial.
* @param {number} baseRad Radius of the base of the cylinder. If 0,
* this function will create an approximation to a downward pointing cone.
* @param {number} topRad Radius of the top of the cylinder. If 0,
* this function will create an approximation to an upward pointing cone.
* @param {number} height Height of the cylinder.
* @param {number} slices Number of "slices" (similar to pizza slices) the cylinder consists
* of.  This function will create a triangular prism if "slices" is 3
* and both radiuses are the same; a triangular pyramid if "slices" is
* 3 and either radius is zero; a rectangular prism if "slices" is 4
* and both radiuses are the same; and a rectangular pyramid if "slices"
* is 4 and either radius is zero. Must be 3 or greater.
* May be null or omitted, in which case the default is 32.
* @param {number} stacks Number of vertical stacks the cylinder consists of.
* May be null or omitted, in which case the default is 1.
* @param {boolean} inside If true, the normals generated by this
* method will point inward; otherwise, outward.  Should normally be false
* unless the cylinder will be viewed from the inside.
* @param {boolean} flat If true, will generate normals such that the
* cylinder will be flat shaded; otherwise, will generate normals such that the
* cylinder will be smooth shaded.
* @return {Mesh} The generated mesh.
*/
"createCylinder":function(baseRad, topRad, height, slices, stacks, inside, flat){
 var mesh=new Mesh();
 if(slices==null)slices=32;
 if(stacks==null)stacks=1;
 if(slices<=2)throw new Error("too few slices");
 if(stacks<1)throw new Error("too few stacks");
 if(height<0)throw new Error("negative height")
 if((baseRad<=0 && topRad<=0) || height==0){
  // both baseRad and topRad are zero or negative,
  // or height is zero
  return mesh;
 }
 var normDir=(inside) ? -1 : 1;
 var sc=[0,1]; // sin(0), cos(0)
 var tc=[0];
 var twopi=Math.PI*2;
 for(var i=1;i<slices;i++){
  var t=i*1.0/slices;
  var angle=twopi*t;
  sc.push(Math.sin(angle),Math.cos(angle));
  tc.push(t);
 }
 sc.push(0,1);
 tc.push(1);
 var slicesTimes2=slices*2;
 if(height>0){
  var lastZ=0;
  var lastRad=baseRad;
  var slopeAngle=0,sinSlopeNorm,cosSlopeNorm;
  if(baseRad==topRad){
   sinSlopeNorm=0;
   cosSlopeNorm=normDir;
  } else {
   slopeAngle=Math.atan2(baseRad-topRad,height);
   sinSlopeNorm=Math.sin(slopeAngle)*normDir;
   cosSlopeNorm=Math.cos(slopeAngle)*normDir;
  }
  for(var i=0;i<stacks;i++){
   var zStart=lastZ;
   var zEnd=(i+1)/stacks;
   var zStartHeight=height*zStart;
   var zEndHeight=height*zEnd;
   var radiusStart=lastRad;
   var radiusEnd=baseRad+(topRad-baseRad)*zEnd;
   lastZ=zEnd;
   lastRad=radiusEnd;
   var triangleFanBase=(i==0 && baseRad==0);
   var triangleFanTop=(i==stacks-1 && topRad==0);
   mesh.mode((triangleFanBase || triangleFanTop) ?
     Mesh.TRIANGLE_FAN : Mesh.QUAD_STRIP);
   if(triangleFanTop){
    // Output first vertices in reverse order to
    // allow triangle fan effect to work
    mesh.texCoord2(1,zEnd);
    mesh.normal3(0,cosSlopeNorm,sinSlopeNorm);
    mesh.vertex3(0,radiusEnd,zEndHeight);
    mesh.texCoord2(1,zStart);
    mesh.normal3(0,cosSlopeNorm,sinSlopeNorm);
    mesh.vertex3(0,radiusStart,zStartHeight);
   } else {
    mesh.texCoord2(1,zStart);
    mesh.normal3(0,cosSlopeNorm,sinSlopeNorm);
    mesh.vertex3(0,radiusStart,zStartHeight);
    mesh.texCoord2(1,zEnd);
    mesh.normal3(0,cosSlopeNorm,sinSlopeNorm);
    mesh.vertex3(0,radiusEnd,zEndHeight);
   }
   for(var k=2,j=1;k<=slicesTimes2;k+=2,j++){
    var tx=tc[j];
    var x,y;
    if(!triangleFanBase){
     x=sc[k];
     y=sc[k+1];
     mesh.texCoord2(1-tx,zStart);
     mesh.normal3(x*cosSlopeNorm,y*cosSlopeNorm,sinSlopeNorm);
     mesh.vertex3(x*radiusStart,y*radiusStart,zStartHeight);
    }
    if(!triangleFanTop){
     x=sc[k];
     y=sc[k+1];
     mesh.texCoord2(1-tx,zEnd);
     mesh.normal3(x*cosSlopeNorm,y*cosSlopeNorm,sinSlopeNorm);
     mesh.vertex3(x*radiusEnd,y*radiusEnd,zEndHeight);
    }
   }
  }
 }
 return flat ? mesh.recalcNormals(inside,flat) : mesh;
},
/**
* Creates a mesh of a closed cylinder.  The cylinder's base will
* be centered at the origin and its height will run along the
* positive z-axis.  The base and top will be included in the mesh if
* their radius is greater than 0.
* See the "{@tutorial shapes}" tutorial.
* @param {number} baseRad Radius of the base of the cylinder.
* See {@link glutil.GLUtil.createCylinder}.
* @param {number} topRad Radius of the top of the cylinder.
* See {@link glutil.GLUtil.createCylinder}.
* @param {number} height Height of the cylinder.
* @param {number} slices Number of "slices" (similar to pizza slices) the cylinder consists
* of. See {@link glutil.GLUtil.createCylinder}.
* @param {number} stacks Number of vertical stacks the cylinder consists of.
* May be null or omitted, in which case the default is 1.
* @param {boolean} inside If true, the normals generated by this
* method will point inward; otherwise, outward.  Should normally be false
* unless the cylinder will be viewed from the inside.
* @param {boolean} flat If true, will generate normals such that the
* cylinder will be flat shaded; otherwise, will generate normals such that the
* cylinder will be smooth shaded.
* @return {Mesh} The generated mesh.
*/
"createClosedCylinder":function(base,top,height,slices,stacks,inside,flat){
 var cylinder=GLUtil.createCylinder(base,top,height,slices,stacks,inside,flat);
 var base=GLUtil.createDisk(0,base,slices,2,!inside);
 var top=GLUtil.createDisk(0,top,slices,2,inside);
 // move the top disk to the top of the cylinder
 top.transform(GLMath.mat4translated(0,0,height));
 // merge the base and the top
 return cylinder.merge(base).merge(top);
},
/**
* Loads a file from a URL asynchronously, using XMLHttpRequest.
* @param {string} url URL of the file to load.
* @param {string|null} responseType Expected data type of
* the file.  Can be "json", "xml", or "text".  If null or omitted,
* the default is "text".
* @return {Promise} A promise that resolves when the text
* file is loaded successfully (the result will be an object with
* two properties: "url", the URL of the file, and "data", the
* file's text or data), and is rejected when an error occurs (the
* result may be an object with
* one property: "url", the URL of the file).
*/
"loadFileFromUrl":function(url,responseType){
 var urlstr=url;
 var respType=responseType||"text";
 return new Promise(function(resolve, reject){
   var xhr=new XMLHttpRequest();
   xhr.onreadystatechange=function(e){
    var t=e.target;
    if(t.readyState==4){
     if(t.status>=200 && t.status<300){
      var resp=t.response
      if(!resp){
       if(respType=="xml")resp=t.responseXML
       else if(respType=="json")
        resp=t.responseJSON||JSON.parse(t.responseText)
       else resp=t.responseText
      }
      resolve({url: urlstr, data: resp+""});
     } else {
      reject({url: urlstr});
     }
    }
   };
   xhr.onerror=function(e){
    reject({url: urlstr});
   }
   xhr.open("get", url, true);
   xhr.responseType=respType
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
/**
* Creates a 4-element array representing a color.  Each element
* can range from 0 to 1 and specifies the red, green, blue or alpha
* component, respectively.
* This method also converts HTML and CSS colors to 4-element RGB
* colors.  The following lists the kinds of colors accepted:
* <ul>
* <li>HTML colors with the syntax <code>#RRGGBB</code>, where
* RR is the hexadecimal form of the red component (00-FF), GG
* is the hexadecimal green component, and BB is the hexadecimal
* blue component.  Example: #88DFE0.
* <li>HTML colors with the syntax <code>#RGB</code>, where
* R is the hexadecimal form of the red component (0-F), G
* is the hexadecimal green component, and B is the hexadecimal
* blue component.  Example: #8DE.
* <li>CSS colors with the syntax <code>rgb(red, green, blue)</code> or
* <code>rgba(red, green, blue, alpha)</code> where
* <code>red</code>, <code>green</code>, and <code>blue</code>
* are the red, green, and blue components, respectively, either as a
* number (0-255) or as a percent, and <code>alpha</code> is
* a number from 0-1 specifying the alpha component.
* Examples: <code>rgb(255,0,0)</code>,
* <code>rgb(100%,50%,0%)</code>, <code>rgba(20,255,255,0.5)</code>.
* <li>CSS colors with the syntax <code>hsl(hue, sat, light)</code> or
* <code>hsla(hue, sat, light, alpha)</code> where
* <code>hue</code> is the hue component in degrees (0-360),
* <code>sat</code> and <code>light</code>
* are the saturation and lightness components, respectively, as percents,
* and <code>alpha</code> is
* a number from 0-1 specifying the alpha component.
* Examples: <code>rgb(255,0,0)</code>,
* <code>hsl(200,50%,50%)</code>, <code>hsla(20,80%,90%,0.5)</code>.
* <li>CSS colors such as <code>red</code>, <code>green</code>,
* <code>white</code>, <code>lemonchiffon</code>, <code>chocolate</code>,
* and so on, including the newly added <code>rebeccapurple</code>.
* <li>The value <code>transparent</code>, meaning transparent black.
* </ul>
* For more information:
* [Colors in HTML and How to Enter Them]{@link http://upokecenter.dreamhosters.com/articles/miscellaneous/how-to-enter-colors/}.
* @alias glutil.GLUtil.toGLColor
* @param {Array<number>|number|string} r Array of three or
* four color components; or the red color component (0-1); or a string
* specifying an [HTML or CSS color]{@link glutil.GLUtil.toGLColor}.  Returns (0,0,0,0) if this value is null.
* @param {number} g Green color component (0-1).
* May be null or omitted if a string or array is given as the "r" parameter.
* @param {number} b Blue color component (0-1).
* May be null or omitted if a string or array is given as the "r" parameter.
* @param {number} a Alpha color component (0-1).
* May be null or omitted if a string or array is given as the "r" parameter.
* @return the color as a 4-element array; if the color is
* invalid, returns [0,0,0,0] (transparent black).
*/
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
 } else if(r.constructor==Array){
   return [r[0]||0,r[1]||0,r[2]||0,
     (typeof r[3]!="number") ? 1.0 : r[3]];
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
* Creates a mesh of a 2D disk.
* Assuming the Y axis points up, the X axis right,
* and the Z axis toward the viewer, the first vertex in the outer edge
* of the 2D disk will be at the 12 o'clock position.
* See the "{@tutorial shapes}" tutorial.
* @param {number} inner Radius of the hole in the middle of the
* disk.  If 0, no hole is created and the method will generate a regular
* polygon with n sides, where n is the value of "slices".  For example,
* if "inner" is 0 and "slices" is 3, the result will be an equilateral triangle;
* a square for 4 "slices", a regular pentagon for 5 "slices", and so on.
* @param {number} outer Outer radius of the disk.
* @param {number} slices Number of slices going around the disk.
* May be null or omitted; default is 32.
* @param {number} loops Number of concentric rings the disk makes up.
* May be null or omitted; default is 1.
* @param {boolean} inward If true, the normals generated by this
* method will point away from the positive z-axis; otherwise, toward
* the positive z-axis.  Default is false.
* @return The generated mesh.
*/
GLUtil.createDisk=function(inner, outer, slices, loops, inward){
 return GLUtil.createPartialDisk(inner,outer,slices,loops,0,360,inward);
}

/**
* Creates a mesh of a 2D disk or an arc of a 2D disk.
* See the "{@tutorial shapes}" tutorial.
* @param {number} inner Radius of the hole where the middle of the
* complete disk would be.  If 0, no hole is created.
* @param {number} outer Outer radius of the disk.
* @param {number} slices Number of slices going around the partial disk.
* May be null or omitted; default is 32.
* @param {number} loops Number of concentric rings the partial disk makes up.
* May be null or omitted; default is 1.
* @param {number} start Starting angle of the partial disk, in degrees.
* May be null or omitted; default is 0.
* Assuming the Y axis points up, the X axis right,
* and the Z axis toward the viewer, 0 degrees is at at the 12 o'clock position,
* and 90 degrees at the 3 o'clock position.
* @param {number} sweep Arc length of the partial disk, in degrees.
* May be null or omitted; default is 360. May be negative.
* @param {boolean} inward If true, the normals generated by this
* method will point away from the positive z-axis; otherwise, toward
* the positive z-axis.  Default is false.
* @return The generated mesh.
*/
GLUtil.createPartialDisk=function(inner, outer, slices, loops, start, sweep, inward){
 var mesh=new Mesh();
 if(slices==null)slices=32;
 if(loops==null)loops=1;
 if(start==null)start=0;
 if(sweep==null)sweep=360;
 if(slices<=2)throw new Error("too few slices");
 if(loops<1)throw new Error("too few loops");
 if(inner>outer)throw new Error("inner greater than outer");
 if(inner<0)inner=0;
 if(outer<0)outer=0;
 if(outer==0 || sweep==0)return mesh;
 var fullCircle=(sweep==360 && start==0);
 var sweepDir=sweep<0 ? -1 : 1;
 if(sweep<0)sweep=-sweep;
 sweep%=360;
 if(sweep==0)sweep=360;
 var sc=[];
 var tc=[];
 var twopi=Math.PI*2;
 var arcLength=(sweep==360) ? twopi : sweep*GLMath.PiDividedBy180;
 start=start*GLMath.PiDividedBy180;
 if(sweepDir<0){
  arcLength=-arcLength;
 }
 for(var i=0;i<=slices;i++){
  var t=i*1.0/slices;
  var angle=start+arcLength*t;
  angle=(angle<0) ? twopi-(-angle)%twopi : angle%twopi;
  sc.push(Math.sin(angle),Math.cos(angle));
  tc.push(t);
 }
 if(fullCircle){
  sc[0]=0;
  sc[1]=1;
  sc[sc.length-1]=1;
  sc[sc.length-2]=0;
  tc[0]=0;
  tc[tc.length-1]=1;
 }
 var slicesTimes2=slices*2;
 var height=outer-inner;
  var lastZ=0;
  var lastRad=inner;
  if(inward){
   mesh.normal3(0,0,-1);
  } else {
   mesh.normal3(0,0,1);
  }
  for(var i=0;i<loops;i++){
   var zStart=lastZ;
   var zEnd=(i+1)/loops;
   var radiusStart=lastRad;
   var radiusEnd=inner+height*zEnd;
   var rso=radiusStart/outer;
   var reo=radiusEnd/outer;
   lastZ=zEnd;
   lastRad=radiusEnd;
   var triangleFanBase=(i==0 && inner==0);
   mesh.mode((triangleFanBase) ?
     Mesh.TRIANGLE_FAN : Mesh.QUAD_STRIP);
   for(var k=0,j=0;k<=slicesTimes2;k+=2,j++){
    var tx=tc[j];
    var x,y;
    if((!triangleFanBase) || k==0){
     x=sc[k];
     y=sc[k+1];
     mesh.texCoord2((1+(x*rso))*0.5,(1+(y*rso))*0.5);
     mesh.vertex3(x*radiusStart,y*radiusStart,0);
    }
    x=sc[k];
    y=sc[k+1];
    mesh.texCoord2((1+(x*reo))*0.5,(1+(y*reo))*0.5);
    mesh.vertex3(x*radiusEnd,y*radiusEnd,0);
   }
  }
  return mesh;
}

/**
* Creates a mesh of a torus (donut), centered at the origin.
* See the "{@tutorial shapes}" tutorial.
* @param {number} inner Inner radius (thickness) of the torus.
* @param {number} outer Outer radius of the torus (distance from the
* center to the innermost part of the torus).
* @param {number} lengthwise Number of lengthwise subdivisions.
* May be null or omitted; default is 32.
* @param {number} crosswise Number of crosswise subdivisions.
* May be null or omitted; default is 32.
* @param {boolean} inward If true, the normals generated by this
* method will point inward; otherwise, outward.  Default is false.
* @param {boolean} flat If true, will generate normals such that the
* torus will be flat shaded; otherwise, will generate normals such that it
* will be smooth shaded.
* @return {Mesh} The generated mesh.
*/
GLUtil.createTorus=function(inner, outer, lengthwise, crosswise, inward, flat){
 var mesh=new Mesh();
 if(crosswise==null)crosswise=32;
 if(lengthwise==null)lengthwise=32;
 if(crosswise<3)throw new Error("crosswise is less than 3")
 if(lengthwise<3)throw new Error("lengthwise is less than 3")
 if(inner<0||outer<0)throw new Error("inner or outer is less than 0")
 if(outer==0)return mesh;
 if(inner==0)return mesh;
 var tubeRadius=inner;
 var circleRad=outer;
 var twopi=Math.PI*2.0;
 var sci=[];
 var scj=[];
 for(var i = 0; i <= crosswise; i++){
  var u = i*twopi/crosswise;
  sci.push(Math.sin(u),Math.cos(u));
 }
 for(var i = 0; i <= lengthwise; i++){
  var u = i*twopi/lengthwise;
  scj.push(Math.sin(u),Math.cos(u));
 }
 for(var j = 0; j < lengthwise; j++){
  var v0 = (j)/lengthwise;
  var v1 = (j+1.0)/lengthwise;
  var sinr0=scj[j*2];
  var cosr0=scj[j*2+1];
  var sinr1=scj[j*2+2];
  var cosr1=scj[j*2+3];
  mesh.mode(Mesh.TRIANGLE_STRIP);
  for(var i = 0; i <= crosswise; i++){
   var u = i/crosswise;
   var sint=sci[i*2];
   var cost=sci[i*2+1];
   var x = (cost * (circleRad + cosr1 * tubeRadius));
   var y = (sint * (circleRad + cosr1 * tubeRadius));
   var z = (sinr1 * tubeRadius);
   var nx = (cosr1 * cost);
   var ny = (cosr1 * sint);
   var nz = (sinr1);
   mesh.normal3(nx, ny, nz);
   mesh.texCoord2(u, v1);
   mesh.vertex3(x, y, z);
   x = (cost * (circleRad + cosr0 * tubeRadius));
   y = (sint * (circleRad + cosr0 * tubeRadius));
   z = (sinr0 * tubeRadius);
   nx = (cosr0 * cost);
   ny = (cosr0 * sint);
   nz = (sinr0);
   mesh.normal3(nx, ny, nz);
   mesh.texCoord2(u, v0);
   mesh.vertex3(x, y, z);
  }
 }
 return flat ? mesh.recalcNormals(inward,flat) : mesh;
}

/**
* Creates a mesh of a 2D rectangle, centered at the origin.
* See the "{@tutorial shapes}" tutorial.
* @param {number} width Width of the rectangle.
* May be null or omitted; default is 1.
* @param {number} height Height of the rectangle.
* May be null or omitted; default is 1.
* @param {number} widthDiv Number of horizontal subdivisions.
* May be null or omitted; default is 1.
* @param {number} heightDiv Number of vertical subdivisions.
* May be null or omitted; default is 1.
* @param {boolean} inward If true, the normals generated by this
* method will point away from the positive z-axis; otherwise, toward
* the positive z-axis; otherwise, outward.  Default is false.
* @return {Mesh} The generated mesh.
*/
GLUtil.createPlane=function(width, height, widthDiv, heightDiv,inward){
 var mesh=new Mesh();
 if(width==null)width=1;
 if(height==null)height=1;
 if(widthDiv==null)widthDiv=1;
 if(heightDiv==null)heightDiv=1;
 if(width<0||height<0)throw new Error("width or height is less than 0")
 if(heightDiv<=0 || widthDiv<=0)
  throw new Error("widthDiv or heightDiv is 0 or less")
 if(width==0 || height==0)return mesh;
 var xStart=-width*0.5;
 var yStart=-height*0.5;
  if(inward){
   mesh.normal3(0,0,-1);
  } else {
   mesh.normal3(0,0,1);
  }
 for(var i=0;i<heightDiv;i++){
  mesh.mode(Mesh.QUAD_STRIP);
  var iStart=i/heightDiv;
  var iNext=(i+1)/heightDiv;
  var y=yStart+height*iStart;
  var yNext=yStart+height*iNext;
  mesh.texCoord2(0,iStart);
  mesh.vertex3(xStart,y,0);
  mesh.texCoord2(0,iNext);
  mesh.vertex3(xStart,yNext,0);
  for(var j=0;j<widthDiv;j++){
   var jx=(j+1)/widthDiv;
   var x=xStart+width*jx;
   mesh.texCoord2(jx,iStart);
   mesh.vertex3(x,y,0);
   mesh.texCoord2(jx,iNext);
   mesh.vertex3(x,yNext,0);
  }
 }
 return mesh;
}

/**
* Creates a mesh of a sphere, centered at the origin.
* See the "{@tutorial shapes}" tutorial.
* @param {number} radius Radius of the sphere.
* May be null or omitted, in which case the default is 1.
* @param {number} slices Number of vertical sections the sphere consists
* of.  This function will create an octahedron if "slices" is 4 and "stacks" is 2.
* Must be 3 or greater. May be null or omitted, in which case the default is 32.
* @param {number} stacks Number of horizontal sections the sphere consists of.
* May be null or omitted, in which case the default is 32.
* @param {boolean} inside If true, the normals generated by this
* method will point inward; otherwise, outward.  Should normally be false
* unless the sphere will be viewed from the inside.
* @param {boolean} flat If true, will generate normals such that the
* sphere will be flat shaded; otherwise, will generate normals such that the
* sphere will be smooth shaded.
* @return {Mesh} The generated mesh.
*/
GLUtil.createSphere=function(radius, slices, stacks, inside, flat){
 var mesh=new Mesh();
 if(slices==null)slices=32;
 if(stacks==null)stacks=32;
 if(radius==null)radius=1;
 if(slices<=2)throw new Error("too few slices");
 if(stacks<2)throw new Error("too few stacks");
 if(radius<0)throw new Error("negative radius")
 if(radius==0){
  // radius is zero
  return mesh;
 }
 var normDir=(inside) ? -1 : 1;
 var sc=[0,1]; // sin(0), cos(0)
 var scStack=[];
 var texc=[];
 var tc=[0];
 var twopi=Math.PI*2;
 var pidiv2=Math.PI*0.5;
 for(var i=1;i<slices;i++){
  var t=i*1.0/slices;
  var angle=twopi*t;
  sc.push(Math.sin(angle),Math.cos(angle));
  tc.push(t);
 }
 sc.push(0,1);
 tc.push(1);
 var zEnd=[]
 for(var i=1;i<stacks;i++){
   var origt=i*1.0/stacks;
   var angle=Math.PI*origt;
   var s=Math.sin(angle);
   scStack.push(s);
   zEnd.push(-Math.cos(angle));
   var tex=origt;
   texc.push(tex);
 }
 scStack.push(0); // south pole
 texc.push(1); // south pole
 zEnd.push(1); // south pole
 var slicesTimes2=slices*2;
  var lastZeCen=-1;
  var lastRad=0;
  var lastRadNorm=0;
  var lastTex=0;
  function normAndVertex(m,normDir,x,y,z){
   m.normal3(x*normDir,y*normDir,z*normDir)
   m.vertex3(x,y,z);
  }
  for(var i=0;i<stacks;i++){
   var zsCen=lastZeCen;
   var zeCen=zEnd[i];
   var texStart=lastTex;
   var texEnd=texc[i];
   var zStartHeight=radius*zsCen;
   var zEndHeight=radius*zeCen;
   var zStartNorm=normDir*zsCen;
   var zEndNorm=normDir*zeCen;
   var radiusStart=lastRad;
   var radiusStartNorm=lastRadNorm;
   var radiusEnd=radius*scStack[i];
   var radiusEndNorm=normDir*scStack[i];
   lastZeCen=zeCen;
   lastTex=texEnd;
   lastRadNorm=radiusEndNorm;
   lastRad=radiusEnd;
   if((i==stacks-1 || i==0)){
    mesh.mode(Mesh.TRIANGLES);
   } else {
    mesh.mode(Mesh.QUAD_STRIP);
    mesh.texCoord2(1,texStart);
    normAndVertex(mesh,normDir,0,radiusStart,zStartHeight);
    mesh.texCoord2(1,texEnd);
    normAndVertex(mesh,normDir,0,radiusEnd,zEndHeight);
   }
   var lastTx=0;
   var lastX=0;
   var lastY=1;
   for(var k=2,j=1;k<=slicesTimes2;k+=2,j++){
    var tx=tc[j];
    var x,y;
    if(i==stacks-1){
     var txMiddle=lastTx+(tx-lastTx)*0.5;
     mesh.texCoord2(1-lastTx,texStart);
     normAndVertex(mesh,normDir,lastX*radiusStart,lastY*radiusStart,zStartHeight);
     // point at south pole
     mesh.texCoord2(1-txMiddle,texEnd);
     normAndVertex(mesh,normDir,0,radiusEnd,zEndHeight);
     x=sc[k];
     y=sc[k+1];
     mesh.texCoord2(1-tx,texStart);
     normAndVertex(mesh,normDir,x*radiusStart,y*radiusStart,zStartHeight);
     lastX=x;
     lastY=y;
     lastTx=tx;
    } else if(i==0){
     var txMiddle=lastTx+(tx-lastTx)*0.5;
     // point at north pole
     mesh.texCoord2(1-txMiddle,texStart);
     normAndVertex(mesh,normDir,0,radiusStart,zStartHeight);
     mesh.texCoord2(1-lastTx,texEnd);
     normAndVertex(mesh,normDir,lastX*radiusEnd,lastY*radiusEnd,zEndHeight);
     x=sc[k];
     y=sc[k+1];
     mesh.texCoord2(1-tx,texEnd);
     normAndVertex(mesh,normDir,x*radiusEnd,y*radiusEnd,zEndHeight);
     lastX=x;
     lastY=y;
     lastTx=tx;
    } else {
     x=sc[k];
     y=sc[k+1];
     mesh.texCoord2(1-tx,texStart);
     normAndVertex(mesh,normDir,x*radiusStart,y*radiusStart,zStartHeight);
     mesh.texCoord2(1-tx,texEnd);
     normAndVertex(mesh,normDir,x*radiusEnd,y*radiusEnd,zEndHeight);
    }
   }
  }
 return flat ? mesh.recalcNormals(inside,flat) : mesh.normalizeNormals();
}

/** @private */
GLUtil._toContext=function(context){
 return (context.getContext) ? context.getContext() : context;
}

///////////////////////
/**
* Represents a WebGL shader program.  A shader program in
* WebGL consists of a vertex shader (which processes vertices),
* and a fragment shader (which processes pixels).  Shader programs
* are specially designed for running on a graphics processing unit,
* or GPU.<p>
* When the ShaderProgram constructor is called, it will compile
* and link a shader program from the source text passed to it, but
* it won't use that program until the use() method is called.  If the
* program is compiled and linked successfully, the constructor
* will also gather a list of the program's attributes (vertex-specific variables
* in vertex buffer objects) and uniforms (variables not specific to a vertex).<p>
* If compiling or linking the shader program fails, a diagnostic
* log is output to the JavaScript console.
* @class
* @alias glutil.ShaderProgram
* @param {WebGLRenderingContext|object} context A WebGL context associated with the
* compiled shader program, or an object, such as Scene3D, that
* implements a no-argument <code>getContext</code> method
* that returns a WebGL context.
* @param {String|undefined} vertexShader Source text of a vertex shader, in OpenGL
* ES Shading Language (GLSL).  If null, a default
* vertex shader is used instead.
* @param {String|undefined} fragmentShader Source text of a fragment shader in GLSL.
* If null, a default fragment shader is used instead.
*/
var ShaderProgram=function(context, vertexShader, fragmentShader){
 context=GLUtil._toContext(context);
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
 this.uniformValues={};
 this.uniformTypes={};
 this.savedUniforms={};
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
* Gets the location of the given uniform or attribute's name in this program.
* (Although the location may change each time the shader program
* is linked, that normally only happens upon construction
* in the case of ShaderProgram.)
* @param {string} name The name of an attribute or uniform defined in either the
* vertex or fragment shader of this shader program.  If the uniform or attribute
* is an array, each element in the array is named as in these examples:
* "unif[0]", "unif[1]".   If it's a struct, each member in the struct is named as in these examples:
* "unif.member1", "unif.member2".  If it's an array of struct, each
* member is named as in these examples: "unif[0].member1",
* "unif[0].member2".
* @return {number|WebGLUniformLocation|null} The location of the uniform or attribute
* name, or null if it doesn't exist.
*/
ShaderProgram.prototype.get=function(name){
 var ret=this.actives[name];
 return (ret==null) ? null : ret;
}
/**
* Gets the value of the given uniform in this program. This method
* may be called at any time, even if this program is not currently the
* active program in the WebGL context.
* @param {string} name The name of a uniform defined in either the
* vertex or fragment shader of this shader program.  See get().
* @return {*} The uniform's value, or null if it doesn't exist or if
* an attribute is named, not a uniform.
*/
ShaderProgram.prototype.getUniform=function(name){
 var loc=(typeof name=="string") ? this.get(name) : name;
 // If "loc" is a number that means it's an attribute, not a uniform;
 // we expect WebGLUniformLocation
 if(loc==null || typeof loc=="number")return null;
 // using a cache since context.getUniform can be slow with
 // repeated calls
 var uv=this.uniformValues[name];
 if(uv==null){
  return this.context.getUniform(this.program,loc);
 } else {
  return (uv instanceof Array) ? uv.slice(0,uv.length) : uv;
 }
}
/**
* Makes this program the active program for the WebGL context.
* This method also sets uniforms that couldn't be applied by the
* setUniforms() method because the context used a different
* program.<p>
* Changing the context's active program doesn't reset the uniform
* variables associated with the previous program.
* @return {ShaderProgram} This object.
*/
ShaderProgram.prototype.use=function(){
 this.context.useProgram(this.program);
 this.setUniforms(this.savedUniforms);
 this.savedUniforms={};
 return this;
}
/**
* Sets uniform variables for this program.  Uniform variables
* are called uniform because they uniformly apply to all vertices
* in a primitive, and are not different per vertex.<p>
* This method may be called at any time, even if this program is not currently the
* active program in the WebGL context.  In that case, this method will instead
* save the uniforms to write them later the next time this program
* becomes the currently active program (via the use() method).<p>
* Once the uniform is written to the program, it will be retained even
* after a different program becomes the active program. (It will only
* be reset if this program is re-linked, which won't normally happen
* in the case of the ShaderProgram class.)
* @param {Object} uniforms A hash of key/value pairs.  Each key is
* the name of a uniform (see {@link glutil.ShaderProgram#get}
* for more information), and each
* value is the value to set
* to that uniform.  Uniform values that are 3- or 4-element
* vectors must be 3 or 4 elements long, respectively.  Uniforms
* that are 4x4 matrices must be 16 elements long.  Keys to
* uniforms that don't exist in this program are ignored.  See also
* the "name" parameter of the {@link glutil.ShaderProgram#get}
* method for more information on
* uniform names.
* @return {ShaderProgram} This object.
*/
ShaderProgram.prototype.setUniforms=function(uniforms){
  var isCurrentProgram=null;
  for(var i in uniforms){
      v=uniforms[i];
      var uniform=this.get(i);
      if(uniform===null)continue;
//      console.log("setting "+i+": "+v);
      if(isCurrentProgram==null){
       isCurrentProgram=this.context.getParameter(
         this.context.CURRENT_PROGRAM)==this.program;
      }
      var val=(v instanceof Array) ? v.slice(0,v.length) : v;
      this.uniformValues[i]=val;
      if(!isCurrentProgram){
       // Save this uniform to write later
       this.savedUniforms[i]=val;
      } else if(v.length==3){
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
        this.context.uniform1f(uniform, v);
       } else {
        this.context.uniform1i(uniform, v);
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
/** @private */
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
"varying vec2 uvVar;\n"+
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
* @param {WebGLRenderingContext|object} context A WebGL context associated with the
* compiled shader program, or an object, such as Scene3D, that
* implements a no-argument <code>getContext</code> method
* that returns a WebGL context.
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
* @param {WebGLRenderingContext|object} context A WebGL context associated with the
* compiled shader program, or an object, such as Scene3D, that
* implements a no-argument <code>getContext</code> method
* that returns a WebGL context.
* @return {ShaderProgram} The resulting shader program.
*/
ShaderProgram.getInvertEffect=function(context){
return ShaderProgram.makeEffect(context,
[
"vec4 textureEffect(sampler2D sampler, vec2 uvCoord, vec2 textureSize){",
" vec4 color=texture2D(sampler,uvCoord);",
" vec4 ret; ret.xyz=vec3(1.0,1.0,1.0)-color.xyz; ret.w=color.w; return ret;",
"}"].join("\n"));
}
/**
* Generates a shader program that generates a two-color texture showing
* the source texture's edges.
* @param {WebGLRenderingContext|object} context A WebGL context associated with the
* compiled shader program, or an object, such as Scene3D, that
* implements a no-argument <code>getContext</code> method
* that returns a WebGL context.
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
* Gets the text of the default vertex shader.  Putting "#define SHADING\n"
* at the start of the return value enables the lighting model.
* @return {string} The resulting shader text.
*/
ShaderProgram.getDefaultVertex=function(){
var shader="" +
"attribute vec3 position;\n" +
"attribute vec3 normal;\n" +
"attribute vec2 uv;\n" +
"attribute vec3 colorAttr;\n" +
"uniform mat4 world;\n" +
"uniform mat4 view;\n" +
"uniform mat4 projection;\n"+
"varying vec2 uvVar;\n"+
"varying vec3 colorAttrVar;\n" +
"#ifdef SHADING\n"+
"uniform mat3 worldViewInvTrans3; /* internal */\n" +
"varying vec4 viewWorldPositionVar;\n" +
"varying vec3 transformedNormalVar;\n"+
"#endif\n"+
"void main(){\n" +
"vec4 positionVec4;\n"+
"positionVec4.w=1.0;\n"+
"positionVec4.xyz=position;\n" +
"gl_Position=((projection*view)*world)*positionVec4;\n" +
"colorAttrVar=colorAttr;\n" +
"uvVar=uv;\n" +
"#ifdef SHADING\n"+
"transformedNormalVar=normalize(worldViewInvTrans3*normal);\n" +
"viewWorldPositionVar=view*world*positionVec4;\n" +
"#endif\n"+
"}";
return shader;
};

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
"varying vec2 uvVar;\n"+
"varying vec3 colorAttrVar;\n" +
"#ifdef SHADING\n" +
"varying vec4 viewWorldPositionVar;\n" +
"varying vec3 transformedNormalVar;\n"+
"vec4 calcLightPower(light lt, vec4 viewWorldPosition){\n" +
" vec3 sdir;\n" +
" float attenuation;\n" +
" if(lt.position.w == 0.0){\n" +
"  sdir=normalize((lt.position).xyz);\n" +
"  attenuation=1.0;\n" +
" } else {\n" +
"  vec3 vertexToLight=((lt.position)-viewWorldPosition).xyz;\n" +
"  float dist=length(vertexToLight);\n" +
"  sdir=normalize(vertexToLight);\n" +
"  attenuation=1.0;\n" +
" }\n" +
" return vec4(sdir,attenuation);\n" +
"}\n" +
"#endif\n" +
"void main(){\n" +
" vec4 tmp;\n"+
" float useTexture=sign(textureSize.x+textureSize.y);\n"+
" tmp.w=1.0;\n"+
" tmp.xyz=colorAttrVar;\n"+
" vec4 baseColor=mix(mix(\n"+
"#ifdef SHADING\n" +
"   vec4(1.0,1.0,1.0,1.0), /*when textures are not used*/\n" +
"#else\n" +
"   vec4(md,1.0), /*when textures are not used*/\n" +
"#endif\n" +
"   texture2D(sampler,uvVar), /*when textures are used*/\n"+
"   useTexture), tmp, useColorAttr);\n"+
"#ifdef SHADING\n" +
"#define SET_LIGHTPOWER(i) "+
" lightPower[i]=calcLightPower(lights[i],viewWorldPositionVar)\n" +
"#define ADD_DIFFUSE(i) "+
" phong+=lights[i].diffuse*max(0.0,dot(transformedNormalVar," +
"   lightPower[i].xyz))*lightPower[i].w*materialDiffuse;\n" +
"vec4 lightPower["+Lights.MAX_LIGHTS+"];\n";
for(var i=0;i<Lights.MAX_LIGHTS;i++){
 shader+="SET_LIGHTPOWER("+i+");\n";
}
shader+=""+
"vec3 materialAmbient=mix(ma,baseColor.rgb,sign(useColorAttr+useTexture)); /* ambient*/\n" +
"vec3 phong=sceneAmbient*materialAmbient; /* ambient*/\n" +
"#ifdef SPECULAR\n" +
"// specular reflection\n" +
"vec3 viewDirection=vec3(0,0,1.);\n" +
"bool spectmp;\n" +
"#define ADD_SPECULAR(i) "+
"  if (mshin > 0.0) {" +
"    spectmp = (dot (transformedNormalVar, lightPower[i].xyz) >= 0.0);" +
"  } else {" +
"    spectmp = bool(0);" +
"  };" +
"  if (spectmp) {" +
"    phong += ms*((pow (max (0.0, dot (((-lightPower[i].xyz) - (2.0 * (dot (transformedNormalVar, -lightPower[i].xyz) *" +
"        transformedNormalVar))), viewDirection)), mshin) * lights[i].specular) * lightPower[i].w);" +
"  }\n";
for(var i=0;i<Lights.MAX_LIGHTS;i++){
 shader+="ADD_SPECULAR("+i+");\n";
}
shader+="#endif\n" +
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

/**
* Specifies parameters for light sources.
* @class
* @alias glutil.LightSource
*/
function LightSource(position, ambient, diffuse, specular) {
 this.ambient=ambient || [0,0,0,1.0]
 this.position=position ? [position[0],position[1],position[2],1.0] :
   [0, 0, 1, 0];
 this.diffuse=diffuse||[1,1,1];
 this.specular=specular||[1,1,1];
};

/**
* A collection of light sources.  It stores the scene's
* ambient color as well as data on one or more light sources.
* When constructed, the default lighting will have a default
* ambient color and one directional light source.
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
 if(diffuse!=null)diffuse=GLUtil["toGLColor"](diffuse)
 if(specular!=null)specular=GLUtil["toGLColor"](specular)
 var lightPosition=position ? [position[0],position[1],position[2],
   directional ? 0.0 : 1.0] : (directional ?
   [0, 0, 1, 0] :
   [0,0,0,1]);
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
 * Sets a directional light.
 * @param {number} index Zero-based index of the light to set.  The first
 * light has index 0, the second has index 1, and so on.
 * @param {Array<number>} position A 3-element vector giving the direction of the light, along the X, Y, and Z
 * axes, respectively.  May be null, in which case the default
 * is (0, 0, 1).
 * @param {Array<number>} diffuse A 3-element vector giving the diffuse color of the light, in the red, green,
 * and blue components respectively.  Each component ranges from 0 to 1.
 * May be null, in which case the default is (1, 1, 1), meaning white light. Can also be a string representing
* an [HTML or CSS color]{@link glutil.GLUtil.toGLColor}.
 * @param {Array<number>} specular A 3-element vector giving the color of specular highlights caused by
 * the light, in the red, green,
 * and blue components respectively.  Each component ranges from 0 to 1.
 * May be null, in which case the default is (1, 1, 1), meaning white. Can also be a string representing
* an [HTML or CSS color]{@link glutil.GLUtil.toGLColor}.
 * @return {Lights} This object.
 */
Lights.prototype.setDirectionalLight=function(index,direction,diffuse,specular){
 this.lights[index]=Lights._createLight(index,direction,diffuse,specular,true);
 return this;
}
/**
 *
 * @param {number} index Zero-based index of the light to set.  The first
 * light has index 0, the second has index 1, and so on.
 * @param {*} position
 * @param {Array<number>} diffuse @see {@link glutil.Lights#setDirectionalLight}
 * @param {Array<number>} specular @see {@link glutil.Lights#setDirectionalLight}
 * @return {Lights} This object.
 */
Lights.prototype.setPointLight=function(index,position,diffuse,specular){
 this.lights[index]=Lights._createLight(index,position,diffuse,specular,false);
 return this;
}
/**
 * Adds a directional light.
 * @param {Array<number>} position A 3-element vector giving the direction of the light, along the X, Y, and Z
 * axes, respectively.  May be null, in which case the default
 * is (0, 0, 1).
 * @param {Array<number>} diffuse @see {@link glutil.Lights#setDirectionalLight}
 * @param {Array<number>} specular @see {@link glutil.Lights#setDirectionalLight}
 * @return {Lights} This object.
 */
Lights.prototype.addDirectionalLight=function(position,diffuse,specular){
 this.lights.push(Lights._createLight(this.lights.length,position,diffuse,specular,true));
 return this;
}
/**
 *
 * @param {*} position
 * @param {Array<number>} diffuse @see {@link glutil.Lights#setDirectionalLight}
 * @param {Array<number>} specular @see {@link glutil.Lights#setDirectionalLight}
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
 // Set empty values for undefined lights up to MAX_LIGHTS
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
* object reflects or absorbs light.<p>
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
* May be null or omitted; default is (0.2, 0.2, 0.2).  Can also be a string representing
* an [HTML or CSS color]{@link glutil.GLUtil.toGLColor}.
* @param {Array<number>} diffuse Diffuse reflection.  An array of three numbers
* indicating how much an object reflects diffuse lights (lights that point
* directly on the object) in the red, green,
* and blue components respectively.  Each component ranges from 0 to 1.
* If {@link glutil.Scene3D#disableLighting} is called, disabling
* lighting calculations, this value is used for coloring objects.<p>
* Setting ambient and diffuse to the same value usually defines an object's
* color. Both diffuse and ambient reflection depend on the color of ambient
* and diffuse lights.<p>
* May be null or omitted; default is (0.8, 0.8, 0.8). Can also be a string representing
* an [HTML or CSS color]{@link glutil.GLUtil.toGLColor}.
* @param {Array<number>} specular Color reflection for specular highlights on an
* object.  An array of three numbers indicating the red, green, and blue
* components.
* Each component ranges from 0 to 1.
* May be null or omitted; default is (0,0,0). Can also be a string representing
* an [HTML or CSS color]{@link glutil.GLUtil.toGLColor}.
* @param {Array<number>} shininess The greater the number, the more
* concentrated the specular
* highlights are.  0 means the object creates no specular highlights. Ranges
* from 0 through 128.
* May be null or omitted; default is 0.
* @param {Array<number>} emission Additive color emitted by an object.
* Used for objects that glow on their own, among other things. An array of
* three numbers indicating the red, green, and blue components.
* Each component ranges from -1 to 1. Positive values add to each component,
* while negative values subtract from each component.
* May be null or omitted; default is (0,0,0). Can also be a string representing
* an [HTML or CSS color]{@link glutil.GLUtil.toGLColor}.
*/
function MaterialShade(ambient, diffuse, specular,shininess,emission) {
 if(ambient!=null)ambient=GLUtil["toGLColor"](ambient)
 if(diffuse!=null)diffuse=GLUtil["toGLColor"](diffuse)
 if(specular!=null)specular=GLUtil["toGLColor"](specular)
 if(emission!=null)emission=GLUtil["toGLColor"](emission)
 /** Specular highlight power of this material. */
 this.shininess=(shininess==null) ? 0 : Math.min(Math.max(0,shininess),128);
 /** Ambient reflection of this material.<p>
 * In the default shader program, if a mesh defines its own colors, those
 * colors are used for ambient reflection rather than this property.
 */
 this.ambient=ambient||[0.2,0.2,0.2];
 /** Diffuse reflection of this material.<p>
 * In the default shader program, if a mesh defines its own colors, those
 * colors are used for diffuse reflection rather than this property.
 */
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
* specifying an [HTML or CSS color]{@link glutil.GLUtil.toGLColor}.
* @param {number} g Green color component (0-1).
* May be null or omitted if a string or array is given as the "r" parameter.
* @param {number} b Blue color component (0-1).
* May be null or omitted if a string or array is given as the "r" parameter.
* @param {number} a Alpha color component (0-1).
* May be null or omitted if a string or array is given as the "r" parameter.
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
* See the "{@tutorial shapes}" tutorial.
* @class
* @alias glutil.Mesh
* @param {Array<number>|undefined} vertices An array that contains data on each
* vertex of the mesh.
* Each vertex is made up of the same number of elements, as defined in
* format. If null or omitted, creates an initially empty mesh.
* May be null or omitted, in which case an empty vertex array is used.
* @param {Array<number>|undefined} indices An array of vertex indices.  Each trio of
* indices specifies a separate triangle, or each pair of indices specifies
* a line segment.
* If null or omitted, creates an initially empty mesh.
* @param {number|undefined} format A set of bit flags depending on the kind of data
* each vertex contains.  Each vertex contains 3 elements plus:<ul>
*  <li> 3 more elements if Mesh.NORMALS_BIT is set, plus
*  <li> 3 more elements if Mesh.COLORS_BIT is set, plus
*  <li> 2 more elements if Mesh.TEXCOORDS_BIT is set.</ul>
* If Mesh.LINES_BIT is set, each vertex index specifies a point of a line
* segment.
* May be null or omitted, in which case "format" is set to 0.
*/
function Mesh(vertices,indices,format){
 if(vertices!=null){
  this.subMeshes=[
   new SubMesh(vertices,indices,format)
  ];
 } else {
  this.subMeshes=[];
 }
 this._elementsDefined=0;
 this.currentMode=-1;
 this.normal=[0,0,0];
 this.color=[0,0,0];
 this.texCoord=[0,0];
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
Mesh._recalcNormals=function(vertices,faces,stride,offset,inward,flat){
  var normDir=(inward) ? -1 : 1;
  var uniqueVertices={};
  for(var i=0;i<vertices.length;i+=stride){
    vertices[i+offset]=0.0
    vertices[i+offset+1]=0.0
    vertices[i+offset+2]=0.0
    if(!flat){
     // If smooth shading is requested, find all vertices with
     // duplicate vertex positions
     var uv=[vertices[i],vertices[i+1],vertices[i+2]]
     if(uniqueVertices[uv])uniqueVertices[uv].push(i+offset);
     else uniqueVertices[uv]=[i+offset];
    }
  }
  for(var i=0;i<faces.length;i+=3){
    var v1=faces[i]*stride
    var v2=faces[i+1]*stride
    var v3=faces[i+2]*stride
    var n1=[vertices[v2]-vertices[v3],vertices[v2+1]-vertices[v3+1],vertices[v2+2]-vertices[v3+2]]
    var n2=[vertices[v1]-vertices[v3],vertices[v1+1]-vertices[v3+1],vertices[v1+2]-vertices[v3+2]]
    // cross multiply n1 and n2
    var x=n1[1]*n2[2]-n1[2]*n2[1]*normDir
    var y=n1[2]*n2[0]-n1[0]*n2[2]*normDir
    var z=n1[0]*n2[1]-n1[1]*n2[0]*normDir
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
  if(!flat){
   // If smooth shading is requested, make sure
   // that every vertex with the same position has the
   // same normal
   for(var key in uniqueVertices){
    var v=uniqueVertices[key]
    if(v && v.constructor==Array && v.length>=2){
     var v0=v[0];
     // Add the normals of duplicate vertices
     // to the first vertex
     for(var i=1;i<v.length;i++){
      vertices[v0]+=vertices[v[i]]
      vertices[v0+1]+=vertices[v[i]+1]
      vertices[v0+2]+=vertices[v[i]+2]
     }
     // Propagate the first vertex's normal to the
     // other vertices
     for(var i=1;i<v.length;i++){
      vertices[v[i]]=vertices[v0]
      vertices[v[i]+1]=vertices[v0+1]
      vertices[v[i]+2]=vertices[v0+2]
     }
    }
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
 * Changes the primitive mode for this mesh.
 * Future vertices will be drawn as primitives of the new type.
 * The primitive type can be set to the same mode, in which
 * case future vertices given will not build upon previous
 * vertices.
 * @param {number} m A primitive type.  One of the following:
 * Mesh.TRIANGLES, Mesh.LINES, Mesh.TRIANGLE_STRIP,
 * Mesh.TRIANGLE_FAN, Mesh.QUADS, Mesh.QUAD_STRIP.
 * @return {Mesh} This object.
 */
Mesh.prototype.mode=function(m){
 if(m<0)throw new Error("invalid mode");
 if(this.currentMode==-1 ||
   !Mesh._isCompatibleMode(this.currentMode,m)){
   var format=0;
   if(Mesh._primitiveType(m)==Mesh.LINES)
    format|=Mesh.LINES_BIT;
   this.subMeshes.push(new SubMesh([],[],format));
   this.currentMode=m;
 } else {
   this.subMeshes[this.subMeshes.length-1].newPrimitive();
   this.currentMode=m;
 }
 return this;
}
/**
 * Merges the vertices from another mesh into this one.
 * The vertices from the other mesh will be copied into this one,
 * and the other mesh's indices copied or adapted.
 * Also, resets the primitive
 * mode (see {@link glutil.Mesh#mode}) so that future vertices given
 * will not build upon previous vertices.
 * @param {Mesh} other A mesh to merge into this one. The mesh
 * given in this parameter will remain unchanged.
 * @return {Mesh} This object.
 */
Mesh.prototype.merge=function(other){
 var lastMesh=this.subMeshes[this.subMeshes.length-1]
 var prim=lastMesh ? (lastMesh.attributeBits&Mesh.LINES_BIT) : 0;
 for(var i=0;i<other.subMeshes.length;i++){
  var sm=other.subMeshes[i];
  if(sm.indices.length==0)continue;
  if(!lastMesh ||
     (sm.attributeBits&Mesh.LINES_BIT)!=prim ||
     (lastMesh.vertices.length+sm.vertices.length)>65535*3 ||
     lastMesh.attributeBits!=sm.attributeBits){
   // Add new submesh because its primitive type
   // differs from the last submesh or the combined
   // submesh would be too long, or the attribute bits
   // don't match between this submesh and the last
   lastMesh=new SubMesh(
    sm.vertices.slice(0,sm.vertices.length),
    sm.indices.slice(0,sm.indices.length),
    sm.attributeBits);
   this.subMeshes.push(lastMesh);
   prim=(lastMesh.attributeBits&Mesh.LINES_BIT);
  } else {
   // Add to existing submesh
   var oldVertexLength=lastMesh.vertexCount();
   var oldIndexLength=lastMesh.indices.length;
   lastMesh.vertices.push.apply(lastMesh.vertices,sm.vertices);
   lastMesh.indices.push.apply(lastMesh.indices,sm.indices);
   for(var i=oldIndexLength;i<lastMesh.indices.length;i++){
    lastMesh.indices[i]+=oldVertexLength;
   }
  }
 }
 // Reset the primitive
 lastMesh.newPrimitive();
 return this;
}

 /**
  * Sets the current normal for this mesh.  Future vertex positions
  * defined (with vertex3()) will have this normal.  The new current
  * normal will apply to future vertices even if the current mode
  * is TRIANGLE_FAN and some vertices were already given for
  * that mode.
  * @param {number} x X-coordinate of the normal.
  * @param {number} y Y-coordinate of the normal.
  * @param {number} z Z-coordinate of the normal.
  * @return {Mesh} This object.
  */
Mesh.prototype.normal3=function(x,y,z){
  this.normal[0]=x;
  this.normal[1]=y;
  this.normal[2]=z;
  this._elementsDefined|=Mesh.NORMALS_BIT;
  return this;
}
 /**
  * Transforms the positions and normals of all the vertices currently
  * in this mesh, using a 4x4 matrix.  The matrix won't affect
  * vertices added afterwards.
  * @param {Array<number>} matrix A 4x4 matrix describing
  * the transformation.
  * @return {Mesh} This object.
  */
 Mesh.prototype.transform=function(matrix){
  for(var i=0;i<this.subMeshes.length;i++){
   this.subMeshes[i].transform(matrix);
  }
  return this;
 }
 /**
  * Sets the current color for this mesh.  Future vertex positions
  * defined (with vertex3()) will have this color.The new current
  * color will apply to future vertices even if the current mode
  * is TRIANGLE_FAN and some vertices were already given for
  * that mode.
  * @param {number} r Red component of the color (0-1).
  * Can also be a string
  * specifying an [HTML or CSS color]{@link glutil.GLUtil.toGLColor}.
  * @param {number} g Green component of the color (0-1).
  * May be null or omitted if a string is given as the "r" parameter.
  * @param {number} b Blue component of the color (0-1).
  * May be null or omitted if a string is given as the "r" parameter.
  * @return {Mesh} This object.
  */
 Mesh.prototype.color3=function(x,y,z){
  if(typeof x=="string"){
   var c=GLUtil["toGLColor"](x);
   this.color[0]=c[0];
   this.color[1]=c[1];
   this.color[2]=c[2];
  } else {
   this.color[0]=x;
   this.color[1]=y;
   this.color[2]=z;
  }
  this._elementsDefined|=Mesh.COLORS_BIT;
  return this;
 }
 /**
  * Sets the current texture coordinates for this mesh.  Future vertex positions
  * defined (with vertex3()) will have these texture coordinates.
  * The new current texture coordinates will apply to future vertices
  * even if the current mode
  * is TRIANGLE_FAN and some vertices were already given for
  * that mode.
  * @param {number} x X-coordinate of the texture, from 0-1.
  * @param {number} y Y-coordinate of the texture, from 0-1.
  * @return {Mesh} This object.
  */
 Mesh.prototype.texCoord2=function(u,v){
  this.texCoord[0]=u;
  this.texCoord[1]=v;
  this._elementsDefined|=Mesh.TEXCOORDS_BIT;
  return this;
 }
 /**
  * Adds a new vertex to this mesh.  If appropriate, adds an
  * additional face index according to this mesh's current mode.
  * The vertex will adopt this mesh's current normal, color,
  * and texture coordinates if they have been defined.
  * @param {number} x X-coordinate of the vertex.
  * @param {number} y Y-coordinate of the vertex.
  * @param {number} z Z-coordinate of the vertex.
  * @return {Mesh} This object.
  */
 Mesh.prototype.vertex3=function(x,y,z){
  this.subMeshes[this.subMeshes.length-1].vertex3(x,y,z,this);
  return this;
 }
 /**
  * Sets all the vertices in this mesh to the given color.
  * This method doesn't change this mesh's current color.
  * @param {number} r Red component of the color (0-1).
  * Can also be a string
  * specifying an [HTML or CSS color]{@link glutil.GLUtil.toGLColor}.
  * @param {number} g Green component of the color (0-1).
  * May be null or omitted if a string is given as the "r" parameter.
  * @param {number} b Blue component of the color (0-1).
  * May be null or omitted if a string is given as the "r" parameter.
  * @return {Mesh} This object.
  */
Mesh.prototype.setColor3=function(r,g,b){
  var rr=r;
  var gg=g;
  var bb=b;
  if(typeof r=="string"){
   var c=GLUtil["toGLColor"](r);
   rr=c[0];
   gg=c[1];
   bb=c[2];
  }
  for(var i=0;i<this.subMeshes.length;i++){
   if((this.subMeshes[i].attributeBits&Mesh.LINES_BIT)==0){
    this.subMeshes[i].setColor3(rr,gg,bb);
   }
  }
  return this;
}
 /**
  * Recalculates the normal vectors for triangles
  * in this mesh.
  * @param {boolean} inward If true, the generated normals
  * will point inward; otherwise, outward.
  * @param {boolean} flat If true, each triangle in the mesh
  * will have the same normal, which usually leads to a flat
  * appearance.  If false, each unique vertex in the mesh
  * will have its own normal, which usually leads to a smooth
  * appearance.
  * @return {Mesh} This object.
  */
 Mesh.prototype.recalcNormals=function(inward, flat){
  for(var i=0;i<this.subMeshes.length;i++){
   if((this.subMeshes[i].attributeBits&Mesh.LINES_BIT)==0){
    this.subMeshes[i].recalcNormals(inward, flat);
   }
  }
  return this;
 }
/**
 * Modifies this mesh by normalizing the normals it defines
 * to unit length.
 * @return {Mesh} This object.
 */
Mesh.prototype.normalizeNormals=function(){
  for(var i=0;i<this.subMeshes.length;i++){
   var stride=this.subMeshes[i].getStride();
   var vertices=this.subMeshes[i].vertices;
   var normalOffset=Mesh.normalOffset(
     this.subMeshes[i].attributeBits);
   if(normalOffset<0)continue;
   for(var i=0;i<vertices.length;i+=stride){
    var x=vertices[i+normalOffset];
    var y=vertices[i+normalOffset+1];
    var z=vertices[i+normalOffset+2];
    var len=Math.sqrt(x*x+y*y+z*z);
    if(len!=0){
      len=1.0/len;
      vertices[i+normalOffset]*=len;
      vertices[i+normalOffset+1]*=len;
      vertices[i+normalOffset+2]*=len;
    }
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
 this.startIndex=0;
 this.attributeBits=(format==null) ? 0 : format;
 this.vertexCount=function(){
  return this.vertices.length/this.getStride();
 }
 this.getStride=function(){
  return Mesh.getStride(this.attributeBits);
 }
 this.newPrimitive=function(m){
  this.startIndex=this.vertices.length;
  return this;
 }
 /** @private */
 this._rebuildVertices=function(newAttributes){
  var oldBits=this.attributeBits;
  var newBits=oldBits|(newAttributes&~Mesh.LINES_BIT);
  if(newBits==oldBits)return;
  var currentStride=this.getStride();
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
  for(var i=0;i<this.vertices.length;i+=currentStride){
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
  this.vertices=newVertices;
  this.attributeBits=newBits;
 }
 this.vertex3=function(x,y,z,state){
  var currentMode=state.currentMode;
  if(currentMode==-1)throw new Error("mode() not called");
  this._rebuildVertices(state._elementsDefined);
  this.vertices.push(x,y,z);
  if((this.attributeBits&Mesh.COLORS_BIT)!=0){
   this.vertices.push(state.color[0],state.color[1],state.color[2]);
  }
  if((this.attributeBits&Mesh.NORMALS_BIT)!=0){
   this.vertices.push(state.normal[0],state.normal[1],state.normal[2]);
  }
  if((this.attributeBits&Mesh.TEXCOORDS_BIT)!=0){
   this.vertices.push(state.texCoord[0],state.texCoord[1]);
  }
  var stride=this.getStride();
  if(currentMode==Mesh.QUAD_STRIP &&
     (this.vertices.length-this.startIndex)>=stride*4 &&
     (this.vertices.length-this.startIndex)%(stride*2)==0){
   var index=(this.vertices.length/stride)-4;
   this.indices.push(index,index+1,index+2,index+2,index+1,index+3);
  } else if(currentMode==Mesh.QUADS &&
     (this.vertices.length-this.startIndex)%(stride*4)==0){
   var index=(this.vertices.length/stride)-4;
   this.indices.push(index,index+1,index+2,index+2,index+3,index);
  } else if(currentMode==Mesh.TRIANGLES &&
     (this.vertices.length-this.startIndex)%(stride*3)==0){
   var index=(this.vertices.length/stride)-3;
   this.indices.push(index,index+1,index+2);
  } else if(currentMode==Mesh.LINES &&
     (this.vertices.length-this.startIndex)%(stride*2)==0){
   var index=(this.vertices.length/stride)-2;
   this.indices.push(index,index+1);
  } else if(currentMode==Mesh.TRIANGLE_FAN &&
     (this.vertices.length-this.startIndex)>=(stride*3)){
   var index=(this.vertices.length/stride)-2;
   var firstIndex=(this.startIndex/stride);
   this.indices.push(firstIndex,index,index+1);
  } else if(currentMode==Mesh.TRIANGLE_STRIP &&
     (this.vertices.length-this.startIndex)>=(stride*3)){
   var index=(this.vertices.length/stride)-3;
   if((index&1)==0){
     this.indices.push(index,index+1,index+2);
   } else {
     this.indices.push(index,index+2,index+1);
   }
  }
  return this;
 }
}

/** @private */
SubMesh.prototype.makeRedundant=function(){
  var existingIndices=[];
  var stride=this.getStride();
  var originalIndicesLength=this.indices.length;
  for(var i=0;i<originalIndicesLength;i++){
    var index=this.indices[i];
    if(existingIndices[index]){
     // Index already exists, so duplicate
     var offset=index*stride;
     var newIndex=this.vertices.length/stride;
     for(var j=0;j<stride;j++){
      this.vertices.push(this.vertices[offset+j]);
     }
     this.indices[i]=newIndex;
    }
    existingIndices[index]=true;
  }
  return this;
}
/** @private */
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

/** @private */
SubMesh._isIdentityInUpperLeft=function(matrix){
 return
    m[0]==1 && m[1]==0 && m[2]==0 &&
    m[4]==0 && m[5]==1 && m[6]==0 &&
    m[8]==0 && m[9]==0 && m[10]==1;
}
/** @private */
SubMesh.prototype.transform=function(matrix){
  var stride=this.getStride();
  var v=this.vertices;
  var isNonTranslation=!SubMesh._isIdentityInUpperLeft(matrix);
  var normalOffset=Mesh.normalOffset(this.attributeBits);
  var matrixForNormals=null;
  if(normalOffset>=0 && isNonTranslation){
   matrixForNormals=GLMath.mat4inverseTranspose3(matrix);
  }
  for(var i=0;i<v.length;i+=stride){
    var xform=GLMath.mat4transform(matrix,
      v[i],v[i+1],v[i+2],1.0);
    v[i]=xform[0];
    v[i+1]=xform[1];
    v[i+2]=xform[2];
    if(normalOffset>=0 && isNonTranslation){
     // Transform and normalize the normals
     // (using a modified matrix) to ensure
     // they point in the correct direction
     xform=GLMath.mat3transform(matrixForNormals,
      v[i+normalOffset],v[i+normalOffset+1],v[i+normalOffset+2]);
     GLMath.vec3normInPlace(xform);
     v[i+normalOffset]=xform[0];
     v[i+normalOffset+1]=xform[1];
     v[i+normalOffset+2]=xform[2];
    }
  }
  return this;
}

/**
 *
 */
SubMesh.prototype._getBounds=function(){
  var stride=this.getStride();
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
  return [[minx,miny,minz],[maxx,maxy,maxz]];
};
/** @private */
SubMesh.prototype.recalcNormals=function(inward, flat){
  this._rebuildVertices(Mesh.NORMALS_BIT);
  this.makeRedundant();
  Mesh._recalcNormals(this.vertices,this.indices,
    this.getStride(),3,inward,flat);
  return this;
};
/** @private */
SubMesh.prototype.setColor3=function(r,g,b){
  this._rebuildVertices(Mesh.COLORS_BIT);
  var stride=this.getStride();
  var colorOffset=Mesh.colorOffset(this.attributeBits);
  for(var i=colorOffset;i<this.vertices.length;i+=stride){
    this.vertices[i]=r;
    this.vertices[i+1]=g;
    this.vertices[i+2]=b;
  }
  return this;
};
/** @private */
Mesh.getStride=function(format){
  format&=(Mesh.NORMALS_BIT|Mesh.COLORS_BIT|Mesh.TEXCOORDS_BIT);
  return [3,6,6,9,5,8,8,11][format];
 }
/** @private */
Mesh.normalOffset=function(format){
  format&=(Mesh.NORMALS_BIT|Mesh.COLORS_BIT|Mesh.TEXCOORDS_BIT);
  return [-1,3,-1,3,-1,3,-1,3][format];
 }
/** @private */
Mesh.colorOffset=function(format){
  format&=(Mesh.NORMALS_BIT|Mesh.COLORS_BIT|Mesh.TEXCOORDS_BIT);
  return [-1,-1,3,6,-1,-1,3,6][format];
 }
/** @private */
Mesh.texCoordOffset=function(format){
  format&=(Mesh.NORMALS_BIT|Mesh.COLORS_BIT|Mesh.TEXCOORDS_BIT);
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
triangle is made up of the last vertex, the first vertex of
the first trangle, and 1 new vertex.
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
* @param {WebGLRenderingContext|object} context A WebGL context to
*  create vertex buffers from, or an object, such as Scene3D, that
* implements a no-argument <code>getContext</code> method
* that returns a WebGL context. (Note that this constructor uses
*  a WebGL context rather than a shader program because
*  vertex buffer objects are not specific to shader programs.)
*/
function BufferedMesh(mesh, context){
 this.subMeshes=[];
 this.context=GLUtil._toContext(context);
 for(var i=0;i<mesh.subMeshes.length;i++){
  var sm=mesh.subMeshes[i];
  // skip empty submeshes
  if(sm.indices.length==0)continue;
  this.subMeshes.push(new BufferedSubMesh(
    sm,this.context));
 }
}
/**
 * Returns the WebGL context associated with this object.
 * @return {WebGLRenderingContext}
 */
BufferedMesh.prototype.getContext=function(){
 return this.context;
}
/** @private */
BufferedMesh.prototype.getFormat=function(){
 var format=0;
 for(var i=0;i<this.subMeshes.length;i++){
  var sm=this.subMeshes[i];
  format|=sm.format;
 }
 return format;
}

/**
* Binds the buffers in this object to attributes according
* to their data format.
* @param {ShaderProgram} program A shader program object to get
* the IDs from for attributes named "position", "normal",
* "colorAttr", and "uv".
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
     program.get("uv"), 2,
    context.FLOAT, stride*4, offset*4);
  }
}
/**
 * @private
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
*  used for some other purpose, such as a depth map, a height map,
*  a bump map, a reflection map, and so on.
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
 if(textureCache && textureCache[name]){
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
 * Under the default shader program, the texture's colors,
 * rather than the ones given in the material parameters,
 * will be used as the ambient and diffuse reflection colors.
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
 * Sets up information about this texture and its materials
 * to a WebGL program.
 * @param {ShaderProgram} program The WebGL program in which
 * uniform values related to the texture will be set up.
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
     "textureSize":[
        (this.textureImage) ? this.textureImage.width : 0,
        (this.textureImage) ? this.textureImage.height : 0]
    });
 }
}

/**
* Represents an off-screen frame buffer.<p>
* When FrameBuffer's
* constructor is called, it will create a texture buffer with the given
* width and height and a depth buffer with the same dimensions,
* and will bind both to the frame buffer.  The frame buffer currently
* bound to the WebGL context will remain unchanged.
* @class
* @alias glutil.FrameBuffer
* @param {WebGLRenderingContext|object} context
* WebGL context to associate with this buffer, or an object, such as Scene3D, that
* implements a no-argument <code>getContext</code> method
* that returns a WebGL context.
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
 // In WebGL, texture coordinates start at the upper left corner rather than
  // the lower left as in OpenGL and OpenGL ES, so we use this method call
  // to reestablish the lower left corner.
 this.context.pixelStorei(this.context.UNPACK_FLIP_Y_WEBGL, 1);
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
 var oldBuffer=this.context.getParameter(
   context.FRAMEBUFFER_BINDING);
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
   context.FRAMEBUFFER,oldBuffer);
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
 */
FrameBuffer.prototype.getContext=function(){
 return this.context;
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
 * Unbinds this frame buffer from its associated WebGL context.
 */
FrameBuffer.prototype.unbind=function(){
  this.context.bindFramebuffer(
    this.context.FRAMEBUFFER,null);
}
/**
 * Disposes all resources from this frame buffer object.
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
/** @private */
var TextureImage=function(name){
  this.textureName=null;
  this.name=name;
  this.image=null;
  this.width=0;
  this.height=0;
}
/** @private */
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
/** @private */
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
  // In WebGL, texture coordinates start at the upper left corner rather than
  // the lower left as in OpenGL and OpenGL ES, so we use this method call
  // to reestablish the lower left corner.
 context.pixelStorei(context.UNPACK_FLIP_Y_WEBGL, 1);
 context.bindTexture(context.TEXTURE_2D, this.textureName);
  context.texParameteri(context.TEXTURE_2D,
    context.TEXTURE_MAG_FILTER, context.LINEAR);
  context.texImage2D(context.TEXTURE_2D, 0,
    context.RGBA, context.RGBA, context.UNSIGNED_BYTE,
    this.image);
  var ext=context.getExtension("EXT_texture_filter_anisotropic") ||
    context.getExtension("WEBKIT_EXT_texture_filter_anisotropic") ||
    context.getExtension("MOZ_EXT_texture_filter_anisotropic");
  if(ext){
   context.texParameteri(context.TEXTURE_2D,
     ext.TEXTURE_MAX_ANISOTROPY_EXT,
     context.getParameter(ext.MAX_TEXTURE_MAX_ANISOTROPY_EXT));
  }
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
/** @private */
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
 * The default lighting for the scene will have a default
* ambient color and one directional light source..
*  @class
* @alias glutil.Scene3D
 * @param {WebGLRenderingContext|object} context
 * A WebGL 3D context to associate with this scene, or an HTML
 * canvas element to create a WebGL context from, or an object, such as Scene3D, that
* implements a no-argument <code>getContext</code> method
* that returns a WebGL context.
 */
function Scene3D(canvasOrContext){
 var context=canvasOrContext;
 if(typeof canvasOrContext.getContext=="function"){
  // This might be a canvas, so create a WebGL context.
  if(HTMLCanvasElement && context.constructor==HTMLCanvasElement){
   context=GLUtil.get3DContext(canvasOrContext);
  } else {
   context=GLUtil._toContext(context);
  }
 }
 this.context=context;
 this.context.viewport(0,0,
    this.context.canvas.width*1.0,this.context.canvas.height*1.0);
 this.lightingEnabled=true;
 this.specularEnabled=true;
 this.program=new ShaderProgram(context,
   this._getDefines()+ShaderProgram.getDefaultVertex(),
   this._getDefines()+ShaderProgram.getDefaultFragment());
 /** An array of shapes that are part of the scene. */
 this.shapes=[];
 /** The color used when clearing the screen each frame.
   This value should not be modified directly.  Instead,
   use the {@link #setClearColor} method.
   @default
   */
 this.clearColor=[0,0,0,1];
 this.fboFilter=null;
 this.textureCache={};
 this.context.enable(context.BLEND);
 this._projectionMatrix=GLMath.mat4identity();
 this._viewMatrix=GLMath.mat4identity();
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
 if(this.specularEnabled)
  ret+="#define SPECULAR\n"
 return ret;
}
/** @private */
Scene3D.prototype._initProgramData=function(){
  this.program.setUniforms({
    "sampler":0,
  });
  this.lightSource.bind(this.program);
 this._updateMatrix();
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
/**
* Sets the viewport width and height for this scene.
* @param {number} width Width of the scene, in pixels.
*  Will be rounded up.
* @param {number} height Height of the scene, in pixels.
*  Will be rounded up.
* @return {number}
*/
Scene3D.prototype.setDimensions=function(width, height){
 if(width<0 || height<0)throw new Error("width or height negative");
 this.context.canvas.width=Math.ceil(width)+"";
 this.context.canvas.height=Math.ceil(height)+"";
 this.context.viewport(0,0,Math.ceil(width),Math.ceil(height));
  if(this.fbo!="undefined" && this.fbo){
   this.fbo.dispose();
   this.fbo=this.createBuffer();
  }
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
*  Sets this scene's projection matrix to a perspective projection.
* @param {number}  fov Vertical field of view, in degrees. Should be less
* than 180 degrees. (The smaller
* this number, the bigger close objects appear to be.  As a result,
* zoom can be implemented by multiplying field of view by an
* additional factor.)
* @param {number}  aspect The ratio of width to height of the viewport, usually
*  the scene's aspect ratio (getAspect()).
* @param {number} near The distance from the camera to
* the near clipping plane. Objects closer than this distance won't be
* seen. This should be slightly greater than 0.
* @param {number}  far The distance from the camera to
* the far clipping plane. Objects beyond this distance will be too far
* to be seen.
* @return {Scene3D} This object.
* @example
* // Set the perspective projection.  Camera has a 45-degree field of view
* // and will see objects from 0.1 to 100 units away.
* scene.setPerspective(45,scene.getAspect(),0.1,100);
*/
Scene3D.prototype.setPerspective=function(fov, aspect, near, far){
 return this.setProjectionMatrix(GLMath.mat4perspective(fov,
   aspect,near,far));
}
/**
 * Sets this scene's projection matrix to a perspective projection that defines
 * the view frustum, or the limits in the camera's view.
 * @param {number} left X-coordinate of the point where the left
 * clipping plane meets the near clipping plane.
 * @param {number} right X-coordinate of the point where the right
 * clipping plane meets the near clipping plane.
 * @param {number} bottom Y-coordinate of the point where the bottom
 * clipping plane meets the near clipping plane.
 * @param {number} top Y-coordinate of the point where the top
 * clipping plane meets the near clipping plane.
* @param {number} near The distance from the camera to
* the near clipping plane. Objects closer than this distance won't be
* seen. This should be slightly greater than 0.
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
 * Sets this scene's projection matrix to an orthographic projection.
 * In this projection, the left clipping plane is parallel to the right clipping
 * plane and the top to the bottom.
 * @param {number} left Leftmost coordinate of the 3D view.
 * @param {number} right Rightmost coordinate of the 3D view.
 * (Note that right can be greater than left or vice versa.)
 * @param {number} bottom Bottommost coordinate of the 3D view.
 * @param {number} top Topmost coordinate of the 3D view.
 * (Note that top can be greater than bottom or vice versa.)
 * @param {number} near Distance from the camera to the near clipping
 * plane.  A positive value means the plane is in front of the viewer.
 * @param {number} far Distance from the camera to the far clipping
 * plane.  A positive value means the plane is in front of the viewer.
 * @return {Scene3D} This object.
 */
Scene3D.prototype.setOrtho=function(left,right,bottom,top,near,far){
 return this.setProjectionMatrix(GLMath.mat4ortho(
   left, right, bottom, top, near, far));
}
/**
 * Sets this scene's projection matrix to a 2D orthographic projection.
 * @param {number} left Leftmost coordinate of the 2D view.
 * @param {number} right Rightmost coordinate of the 2D view.
 * (Note that right can be greater than left or vice versa.)
 * @param {number} bottom Bottommost coordinate of the 2D view.
 * @param {number} top Topmost coordinate of the 2D view.
 * (Note that top can be greater than bottom or vice versa.)
 * @return {Scene3D} This object.
 */
Scene3D.prototype.setOrtho2D=function(left,right,bottom,top){
 return this.setProjectionMatrix(GLMath.mat4ortho(
   left, right, bottom, top, -1, 1));
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
* specifying an [HTML or CSS color]{@link glutil.GLUtil.toGLColor}.
* @param {number} g Green color component (0-1).
* May be null or omitted if a string or array is given as the "r" parameter.
* @param {number} b Blue color component (0-1).
* May be null or omitted if a string or array is given as the "r" parameter.
* @param {number} a Alpha color component (0-1).
* May be null or omitted if a string or array is given as the "r" parameter.
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
* and uploaded to a texture buffer (the argument will be a Texture object.)
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
Scene3D.prototype._setIdentityMatrices=function(){
 this._projectionMatrix=GLMath.mat4identity();
 this._viewMatrix=GLMath.mat4identity();
 this._updateMatrix();
}
/** @private */
Scene3D.prototype._updateMatrix=function(){
 this.program.setUniforms({
   "view":this._viewMatrix,
   "projection":this._projectionMatrix,
   "viewMatrix":this._viewMatrix,
   "projectionMatrix":this._projectionMatrix
 });
}
/**
 * Sets the projection matrix for this object.  The projection
 * matrix can also be set using the {@link glutil.Scene3D#setFrustum}, {@link glutil.Scene3D#setOrtho},
 * {@link glutil.Scene3D#setOrtho2D}, and {@link glutil.Scene3D#setPerspective} methods.
 * @param {Array<number>} matrix A 16-element matrix (4x4).
 * @return {Scene3D} This object.
 */
Scene3D.prototype.setProjectionMatrix=function(matrix){
 this._projectionMatrix=GLMath.mat4copy(matrix);
 this._updateMatrix();
 return this;
}
/**
*  Sets this scene's view matrix. The view matrix can also
* be set using the {@link glutil.Scene3D#setLookAt} method.
 * @param {Array<number>} matrix A 16-element matrix (4x4).
 * @return {Scene3D} This object.
*/
Scene3D.prototype.setViewMatrix=function(matrix){
 this._viewMatrix=GLMath.mat4copy(matrix);
 this._updateMatrix();
 return this;
}
/**
*  Sets this scene's view matrix to represent a camera view.
* @param {Array<number>} eye A 3-element vector specifying
* the camera position in world space.
* @param {Array<number>|undefined} center A 3-element vector specifying
* the point in world space that the camera is looking at. May be null or omitted,
* in which case the default is the coordinates (0,0,0).
* @param {Array<number>|undefined} up A 3-element vector specifying
* the up-vector direction.  May be null or omitted, in which case
* the default is a vector pointing positive on the Y axis.  This
* vector must not point in the same or opposite direction as
* the camera's view direction.
* @return {Scene3D} This object.
*/
Scene3D.prototype.setLookAt=function(eye, center, up){
 up = up || [0,1,0];
 center = center || [0,0,0];
 this._viewMatrix=GLMath.mat4lookat(eye, center, up);
 this._updateMatrix();
 return this;
}
/**
* Adds a 3D shape to this scene. This method will load the
* shape's mesh to vertex buffer objects, if it isn't loaded
* already.
* @param {Shape|MultiShape} shape A 3D shape.
* @return {Scene3D} This object.
*/
Scene3D.prototype.addShape=function(shape){
 this.shapes.push(shape.loadMesh(this.context));
 return this;
}
/**
* Removes all instances of a 3D shape from this scene.
* @param {Shape|MultiShape} shape The 3D shape to remove.
* @return {Scene3D} This object.
*/
Scene3D.prototype.removeShape=function(shape){
 for(var i=0;i<this.shapes.length;i++){
   if(this.shapes[i]==shape){
     this.shapes.splice(i,1);
     i--;
   }
 }
 return this;
}
/**
 *
 * @param {number} index Zero-based index of the light to set.  The first
 * light has index 0, the second has index 1, and so on.
 * @param {Array<number>} position A 3-element vector giving the direction of the light, along the X, Y, and Z
 * axes, respectively.  May be null, in which case the default
 * is (0, 0, 1).
 * @param {Array<number>} diffuse A 3-element vector giving the diffuse color of the light, in the red, green,
 * and blue components respectively.  Each component ranges from 0 to 1.
 * May be null, in which case the default is (1, 1, 1).
 * @param {Array<number>} specular A 3-element vector giving the color of specular highlights caused by
 * the light, in the red, green,
 * and blue components respectively.  Each component ranges from 0 to 1.
 * May be null, in which case the default is (1, 1, 1).
* @return {Scene3D} This object.
 */
Scene3D.prototype.setDirectionalLight=function(index,position,diffuse,specular){
 this.lightSource.setDirectionalLight(index,position,diffuse,specular);
 this.lightSource.bind(this.program);
 return this;
}
/**
 * Sets the color of the scene's ambient light.
* @param {Array<number>|number|string} r Array of three or
* four color components; or the red color component (0-1); or a string
* specifying an [HTML or CSS color]{@link glutil.GLUtil.toGLColor}.
* @param {number} g Green color component (0-1).
* May be null or omitted if a string or array is given as the "r" parameter.
* @param {number} b Blue color component (0-1).
* May be null or omitted if a string or array is given as the "r" parameter.
* @param {number} a Alpha color component (0-1).
* May be null or omitted if a string or array is given as the "r" parameter.
* @return {Scene3D} This object.
 */
Scene3D.prototype.setAmbient=function(r,g,b,a){
 this.lightSource.ambient=GLUtil["toGLColor"](r,g,b,a);
 this.lightSource.ambient=this.lightSource.ambient.slice(0,4)
 this.lightSource.bind(this.program);
 return this;
}

/**
 *
 * @param {number} index Zero-based index of the light to set.  The first
 * light has index 0, the second has index 1, and so on.
 * @param {Array<number>} position
 * @param {Array<number>} diffuse A 3-element vector giving the diffuse color of the light, in the red, green,
 * and blue components respectively.  Each component ranges from 0 to 1.
 * May be null, in which case the default is (1, 1, 1).
 * @param {Array<number>} specular A 3-element vector giving the color of specular highlights caused by
 * the light, in the red, green,
 * and blue components respectively.  Each component ranges from 0 to 1.
 * May be null, in which case the default is (1, 1, 1).
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
 *  as {@link glutil.GLUtil.renderLoop}.<p>
 * This method may set the following uniforms if they exist in the
 * shader program:<ul>
 * <li><code>projection</code>, <code>projectionMatrix</code>: this scene's
 * projection matrix
 * <li><code>view</code>, <code>viewMatrix</code>: this scene's view
 * matrix
 * </ul>
 * @return {Scene3D} This object.
 */
Scene3D.prototype.render=function(){
  if(typeof this.fboFilter!="undefined" && this.fboFilter){
   // Render to the framebuffer, then to the main buffer via
   // a filter
   this.fbo.bind(this.program);
   this._renderInner();
   this.fbo.unbind();
   var oldProgram=this.program;
   var oldProj=this._projectionMatrix.slice(0,16);
   var oldView=this._viewMatrix.slice(0,16);
   this.useProgram(this.fboFilter);
   this.context.clear(
    this.context.COLOR_BUFFER_BIT|this.context.DEPTH_BUFFER_BIT);
   this._setIdentityMatrices();
   this.fboQuad.render(this.fboFilter);
   this.setProjectionMatrix(oldProj);
   this.setViewMatrix(oldView);
   this.useProgram(oldProgram);
   this.context.flush();
   return this;
  } else {
   // Render as usual
   this._renderInner();
   this.context.flush();
   return this;
 }
}
/**
 * Uses a shader program to apply a texture filter after the
 * scene is rendered.  If a filter program is used, the scene will
 * create a frame buffer object, render its shapes to that frame
 * buffer, and then apply the filter program as it renders the
 * frame buffer to the canvas.
 * @param {ShaderProgram|string|null} filterProgram A shader
 * program that implements a texture filter.  The program
 * could be created using the {@link glutil.ShaderProgram.makeEffect} method.
 * This parameter can also be a string that could be a parameter
 * to the ShaderProgram.makeEffect() method.
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
   // Create a mesh of a rectangle that will
   // fit the screen in the presence of identity projection
   // and view matrices
   var mesh=new Mesh(
     [-1,1,0,0,1,
      -1,-1,0,0,0,
      1,1,0,1,1,
      1,-1,0,1,0],
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
* See the "{@tutorial shapes}" tutorial.
 *  @class
* @alias glutil.Shape
* @param {Mesh|BufferedMesh} mesh A geometric mesh to associate with this shape,
*  or a mesh in the form of a vertex buffer object.
  */
function Shape(mesh){
  if(mesh==null)throw new Error("mesh is null");
  // NOTE: "mesh" property is only used to generate "bufferedMesh"
  if(mesh.constructor==BufferedMesh){
   this.mesh=null;
   this.bufferedMesh=mesh;
  } else {
   this.mesh=mesh;
   this.bufferedMesh=null;
  }
  this.material=new MaterialShade();
  /**
  * A three-element array giving the scaling of this object for this shape's width,
  * height, and depth, respectively.
  * For each component, 1 means no scaling.
  * The value given here is informational only and should not be modified directly.
  * Use the setScale method to set this value.
  * @default
  */
  this.scale=[1,1,1];
  /**
  * A three-element array giving the X, Y, and Z coordinates of the position
  * of this shape relative to its original position.
  * The value given here is informational only and should not be modified directly.
  * Use the setPosition method to set this value.
  * @default
  */
  this.position=[0,0,0];
  /**
   * The rotation of this object in the form of a [quaternion]{@link glmath.GLMath}.
   * The value given here is informational only and should not be modified directly.
   * Use the setRotation or setQuaternion method to set this value.
   */
  this.rotation=GLMath.quatIdentity();
  this._matrixDirty=true;
  this._invTransModel3=GLMath.mat3identity();
  /**
   * The transformation matrix used by this shape.  It is a combination
   * of the scale, position, and rotation properties.
   * The value given here should not be modified directly.
   * Use the setMatrix method to set this value.
   */
  this.matrix=GLMath.mat4identity();
}
/**
 * Loads this shape's mesh to vertex buffer objects, if it isn't loaded
 * already.
 * @param {WebGLRenderingContext|object} context The WebGL context
 * to load this shape's mesh under, or an object, such as Scene3D, that
* implements a no-argument <code>getContext</code> method
* that returns a WebGL context.
 * @return {Shape} This object.
 */
Shape.prototype.loadMesh=function(context){
 if(!this.bufferedMesh && this.mesh){
  this.bufferedMesh=new BufferedMesh(this.mesh,context);
 }
 return this;
}
/**
 * Sets this shape's transformation matrix. This method
 * will set the position, rotation, and scale properties
 * accordingly to the matrix given.
 * @param {Array<number>} value A 4x4 matrix.
 * This method will copy the value of this parameter.
 * @return {Shape} This object.
 */
Shape.prototype.setMatrix=function(value){
 this._matrixDirty=false;
 this.matrix=value.slice(0,16);
 this.position=[this.matrix[12],this.matrix[13],this.matrix[14]];
 this.rotation=GLMath.quatFromMat4(this.matrix);
 this.rotation=GLMath.quatNormInPlace(this.rotation);
 this.scale=[this.matrix[0],this.matrix[5],this.matrix[10]];
 this._invTransModel3=GLMath.mat4inverseTranspose3(this.matrix);
 return this;
}
/**
* Sets material parameters that give the shape a certain color.
* However, if the mesh defines its own colors, those colors will take
* precedence over the color given in this method.
* @param {Array<number>|number|string} r Array of three or
* four color components; or the red color component (0-1); or a string
* specifying an [HTML or CSS color]{@link glutil.GLUtil.toGLColor}.
* @param {number} g Green color component (0-1).
* May be null or omitted if a string or array is given as the "r" parameter.
* @param {number} b Blue color component (0-1).
* May be null or omitted if a string or array is given as the "r" parameter.
* @param {number} a Alpha color component (0-1).
* May be null or omitted if a string or array is given as the "r" parameter.
 * @return {Shape} This object.
*/
Shape.prototype.setColor=function(r,g,b,a){
 this.material=MaterialShade.fromColor(r,g,b,a);
 return this;
}
/**
 * Sets this shape's material to a texture with the given URL.
 * @param {string} name URL of the texture to use.
 * @return {Shape} This object.
 */
Shape.prototype.setTexture=function(name){
 this.material=new Texture(name);
 return this;
}
/**
* Sets this shape's material parameters.
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
 * @param {number|Array<number>} x Scaling factor for this object's width.
 *   If "y" and "z" are null or omitted, this can
 * instead be a 3-element array giving the scaling factors
 * for width, height, and depth, respectively.
 * @param {number} y Scaling factor for this object's height.
 * @param {number} z Scaling factor for this object's depth.
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
 * Sets the relative position of this shape from its original
 * position.
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
 * Sets this object's rotation in the form of a [quaternion]{@link glmath.GLMath} (a 4-element array
 * for describing 3D rotations).
 * @param {Array<number>} quat A four-element array describing the rotation.
 * A quaternion is returned from the methods {@link glmath.GLMath.quatFromAxisAngle}
 * or {@link glmath.GLMath.quatFromEuler}.
 * @return {Shape} This object.
 * @example
 * // Set this shape's rotation to 30 degrees about the X-axis
 * shape.setQuaternion(GLMath.quatFromAxisAngle(20,1,0,0));
 * // Set this shape's rotation to identity (no rotation)
 * shape.setQuaternion(GLMath.quatIdentity());
 * // Set this shape's rotation to 30 degree pitch multiplied
 * // by 40 degree roll
 * shape.setQuaternion(GLMath.quatFromEuler(30,0,40));
 */
Shape.prototype.setQuaternion=function(quat){
  this.rotation=quat.slice(0,4);
  GLMath.quatNormInPlace(this.rotation);
  this._matrixDirty=true;
  return this;
}
/**
 * Sets this object's rotation in the form of an angle and an axis of
 * rotation.
 * @param {Array<number>|number} angle The desired angle
 * to rotate in degrees.  If "v", "vy", and "vz" are omitted, this can
 * instead be a 4-element array giving the axis
 * of rotation as the first three elements, followed by the angle
 * in degrees as the fourth element.  If the axis of rotation
 * points toward the viewer, the angle's value is increasing in
 * a counterclockwise direction.
 * @param {Array<number>|number} v X-component of the axis
 * of rotation.  If "vy" and "vz" are omitted, this can
 * instead be a 3-element array giving the axis
 * of rotation in x, y, and z, respectively.
 * @param {number} vy Y-component of the axis
 * of rotation.
 * @param {number} vz Z-component of the axis
 * of rotation.
 * @return {Shape} This object.
 */
Shape.prototype.setRotation=function(angle, v,vy,vz){
 return this.setQuaternion(GLMath.quatFromAxisAngle(angle,v,vy,vz));
}
/**
 * Combines this shape's current rotation with another rotation
 * described by a [quaternion]{@link glmath.GLMath} (a 4-element array
 * for describing 3D rotations).  The combined rotation will have the
 * same effect as the new rotation followed by the existing rotation.
 * @param {Array<number>} quat A four-element array describing the rotation.
 * A quaternion is returned from the methods {@link glmath.GLMath.quatFromAxisAngle}
 * or {@link glmath.GLMath.quatFromEuler}.
 * @return {Shape} This object.
 * @example
 * // Combine this shape's rotation with to 30 degrees about the X-axis
 * shape.multQuaternion(GLMath.quatFromAxisAngle(20,1,0,0));
 * // Combine this shape's rotation with identity (no rotation)
 * shape.multQuaternion(GLMath.quatIdentity());
 * // Combine this shape's rotation with 30 degree pitch multiplied
 * // by 40 degree roll
 * shape.multQuaternion(GLMath.quatFromEuler(30,0,40));
 */
Shape.prototype.multQuaternion=function(quat){
  this.rotation=GLMath.quatMultiply(this.rotation,quat);
  GLMath.quatNormInPlace(this.rotation);
  this._matrixDirty=true;
  return this;
}
/**
 * Combines this shape's current rotation with another rotation
 * in the form of an angle and an axis of
 * rotation. The combined rotation will have the
 * same effect as the new rotation followed by the existing rotation.
 * @param {Array<number>|number} angle The desired angle
 * to rotate in degrees. See {@link glutil.Shape#setRotation}.
 * @param {Array<number>|number} v X-component of the axis
 * of rotation.  If "vy" and "vz" are omitted, this can
 * instead be a 3-element array giving the axis
 * of rotation in x, y, and z, respectively.
 * @param {number} vy Y-component of the axis
 * of rotation.
 * @param {number} vz Z-component of the axis
 * of rotation.
 * @return {Shape} This object.
 */
Shape.prototype.multRotation=function(angle, v,vy,vz){
 return this.multQuaternion(GLMath.quatFromAxisAngle(angle,v,vy,vz));
}
/**
 * Renders this object.  This method will load the shape's mesh to vertex
 * buffer objects, if it isn't loaded already.<p>
 * This method may set the following uniforms if they exist in the
 * shader program:<ul>
 * <li><code>world</code>, <code>modelMatrix</code>: this shape's
 * transformation matrix
 * <li><code>modelViewMatrix</code>: the view matrix times this shape's
 * transformation matrix
 * <li><code>worldViewInvTrans3</code>, <code>normalMatrix</code>:
 * 3x3 inverse transpose of the view matrix times this shape's
 * transformation matrix
 * <li><code>useColorAttr</code>: whether this shape uses per-vertex colors
 * </ul>
 * @param {ShaderProgram} program The WebGL program in which attributes
 * and uniforms related to the rendered object will be set up.  The
 * program's shaders will control how the shape will be rendered.
 * @return {Shape} This object.
 */
Shape.prototype.render=function(program){
  // Set material (texture or color)
  if(this.material){
   this.material.bind(program);
  }
  // Bind vertex attributes
  if(this.bufferedMesh==null && this.mesh){
   this.bufferedMesh=new BufferedMesh(this.mesh,
     program.getContext());
  }
  this.bufferedMesh.bind(program);
  // Set world matrix
  var uniforms={};
  var uniformMatrix=program.get("world")
  if(uniformMatrix==null)uniformMatrix=program.get("modelMatrix");
  if(uniformMatrix!==null){
   if(this._matrixDirty){
    this._updateMatrix();
   }
   uniforms["world"]=this.matrix;
   uniforms["modelMatrix"]=this.matrix;
   var viewMatrix=program.getUniform("view")
   if(viewMatrix==null)viewMatrix=program.getUniform("viewMatrix")
   if(viewMatrix){
     var viewWorld=GLMath.mat4multiply(viewMatrix,this.matrix);
     var invTrans=GLMath.mat4inverseTranspose3(viewWorld);
     uniforms["modelViewMatrix"]=viewWorld;
     uniforms["worldViewInvTrans3"]=invTrans;
     uniforms["normalMatrix"]=invTrans;
   } else {
     uniforms["worldViewInvTrans3"]=this._invTransModel3;
     uniforms["normalMatrix"]=this._invTransModel3;
   }
  }
  uniforms["useColorAttr"]=((this.bufferedMesh.getFormat()&Mesh.COLORS_BIT)!=0) ?
     1.0 : 0.0;
  program.setUniforms(uniforms);
  this.bufferedMesh.draw(program);
  return this;
};
/** @private */
Shape.prototype._updateMatrix=function(){
  this._matrixDirty=false;
  this.matrix=GLMath.mat4translated(this.position[0],
  this.position[1],this.position[2]);
  if(!GLMath.quatIsIdentity(this.rotation)){
    this.matrix=GLMath.mat4multiply(this.matrix,
      GLMath.quatToMat4(this.rotation));
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

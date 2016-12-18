/*
Written by Peter O. in 2015.

Any copyright is dedicated to the Public Domain.
http://creativecommons.org/publicdomain/zero/1.0/
If you like this, you should donate to Peter O.
at: http://peteroupc.github.io/
*/
/* global H3DU, console */

/**
* Holds source code for a WebGL shader program.  A shader program in
* WebGL consists of a vertex shader (which processes vertices),
* and a fragment shader (which processes pixels).  Shader programs
* are specially designed for running on a graphics processing unit,
* or GPU.<p>
* This class also stores uniform values associated with the shader
* source code.
* @class
* @alias H3DU.ShaderInfo
* @param {String} [vertexShader] Source text of a vertex shader, in OpenGL
* ES Shading Language (GLSL).  If null, a default
* vertex shader is used instead.
* @param {String} [fragmentShader] Source text of a fragment shader in GLSL.
* If null, a default fragment shader is used instead.
*/
H3DU.ShaderInfo = function(vertexShader, fragmentShader) {
  "use strict";
  if(vertexShader === null || typeof vertexShader === "undefined") {
    vertexShader = H3DU.ShaderProgram.getDefaultVertex();
  }
  if(fragmentShader === null || typeof fragmentShader === "undefined") {
    fragmentShader = H3DU.ShaderProgram.getDefaultFragment();
  }
  this.vertexShader = vertexShader;
  this.fragmentShader = fragmentShader;
  this.uniformValues = {};
};
/**
 * TODO: Not documented yet.
 * @memberof! H3DU.ShaderInfo#
*/
H3DU.ShaderInfo.prototype.copy = function() {
  "use strict";
  var sp = new H3DU.ShaderInfo(this.vertexShader, this.fragmentShader);
  sp.setUniforms(this.uniformValues);
  return sp;
};
/**
 * TODO: Not documented yet.
 * @param {*} uniforms
 * @memberof! H3DU.ShaderInfo#
*/
H3DU.ShaderInfo.prototype.setUniforms = function(uniforms) {
  "use strict";
  H3DU.ShaderInfo._setUniformsInternal(uniforms, this.uniformValues, null);
  return this;
};
/** @private */
H3DU.ShaderInfo._setUniformInternal = function(uniforms, uniformValues, i, changedUniforms) {
  "use strict";
  var v = uniforms[i];
  var uv = uniformValues[i];
  if(typeof v === "number") {
    var newUv = false;
    if(uv === null || typeof uv === "undefined") {
      uniformValues[i] = uv = v;
      newUv = true;
    } else if(uv !== v) {
      uv = v;
      uniformValues[i] = v;
      newUv = true;
    }
    if(newUv) {
      if(changedUniforms)changedUniforms[i] = uv;
    }
  } else if(v.length === 3) {
    if(!uv) {
      uniformValues[i] = uv = v.slice(0, v.length);
      if(changedUniforms)changedUniforms[i] = v.slice(0, v.length);
    } else if(uv[0] !== v[0] || uv[1] !== v[1] || uv[2] !== v[2]) {
      uv[0] = v[0]; uv[1] = v[1]; uv[2] = v[2];
      if(changedUniforms)changedUniforms[i] = uv.slice(0, uv.length);
    }
  } else if(v.length === 2) {
    if(!uv) {
      uniformValues[i] = uv = v.slice(0, v.length);
      if(changedUniforms)changedUniforms[i] = v.slice(0, v.length);
    } else if(uv[0] !== v[0] || uv[1] !== v[1]) {
      uv[0] = v[0]; uv[1] = v[1];
      if(changedUniforms)changedUniforms[i] = uv.slice(0, uv.length);
    }
  } else if(v.length === 4) {
    if(!uv) {
      uniformValues[i] = uv = v.slice(0, v.length);
      if(changedUniforms)changedUniforms[i] = v.slice(0, v.length);
    } else if(uv[0] !== v[0] || uv[1] !== v[1] || uv[2] !== v[2] || uv[3] !== v[3]) {
      uv[0] = v[0]; uv[1] = v[1]; uv[2] = v[2]; uv[3] = v[3];
      if(changedUniforms)changedUniforms[i] = uv.slice(0, uv.length);
    }
  } else if(v.length === 16) {
    if(!uv) {
      uniformValues[i] = uv = v.slice(0, v.length);
      if(changedUniforms)changedUniforms[i] = v.slice(0, v.length);
    } else if(H3DU.ShaderInfo._copyIfDifferent(v, uv, 16)) {
      if(changedUniforms)changedUniforms[i] = uv.slice(0, uv.length);
    }
  } else if(v.length === 9) {
    if(!uv) {
      uniformValues[i] = uv = v.slice(0, v.length);
      if(changedUniforms)changedUniforms[i] = v.slice(0, v.length);
    } else if(H3DU.ShaderInfo._copyIfDifferent(v, uv, 9)) {
      if(changedUniforms)changedUniforms[i] = uv.slice(0, uv.length);
    }
  }
};

/** @private */
H3DU.ShaderInfo._copyIfDifferent = function(src, dst, len) {
  "use strict";
  for(var i = 0;i < len;i++) {
    if(src[i] !== dst[i]) {
   // Arrays are different
      dst[i] = src[i];
      for(var j = i + 1;j < len;j++) {
        dst[j] = src[j];
      }
      return true;
    }
  }
  return false;
};

/** @private */
H3DU.ShaderInfo._setUniformsInternal = function(uniforms, outputUniforms, changedUniforms) {
  "use strict";
  var i;
  if(typeof Object.keys === "undefined") {
    for(i in uniforms) {
      if(Object.prototype.hasOwnProperty.call(uniforms, i)) {
        H3DU.ShaderInfo._setUniformInternal(uniforms, outputUniforms, i, changedUniforms);
      }
    }
  } else {
    var keys = Object.keys(uniforms);
    for(var ki = 0;ki < keys.length;ki++) {
      i = keys[ki];
      H3DU.ShaderInfo._setUniformInternal(uniforms, outputUniforms, i, changedUniforms);
    }
  }
};
/**
* Represents a WebGL shader program.  A shader program in
* WebGL consists of a vertex shader (which processes vertices),
* and a fragment shader (which processes pixels).  Shader programs
* are specially designed for running on a graphics processing unit,
* or GPU.<p>
* When the H3DU.ShaderProgram constructor is called, it will compile
* and link a shader program from the source text passed to it, but
* it won't use that program until the use() method is called.  If the
* program is compiled and linked successfully, the constructor
* will also gather a list of the program's attributes (vertex-specific variables
* in vertex buffer objects) and uniforms (variables not specific to a vertex).<p>
* If compiling or linking the shader program fails, a diagnostic
* log is output to the JavaScript console.
 * @class
 * @alias H3DU.ShaderProgram
 * @param {*} context
 * @param {*} vertexShader
 * @param {*} fragmentShader
 */
H3DU.ShaderProgram = function(context, vertexShader, fragmentShader) {
  "use strict";
  this._init(context, new H3DU.ShaderInfo(vertexShader, fragmentShader));
};
/** @private */
H3DU.ShaderProgram._fromShaderInfo = function(context, shader) {
  "use strict";
  var ret = new H3DU.ShaderProgram(null);
  ret._init(context, shader);
  return ret;
};
/** @private */
H3DU.ShaderProgram.prototype._init = function(context, shaderInfo) {
  "use strict";
  if(!context)return;
  context = context.getContext ? context.getContext() : context;
  this.shaderInfo = shaderInfo;
  this.context = context;
  this.prog = H3DU.ShaderProgram._compileShaders(context,
   shaderInfo.vertexShader,
   shaderInfo.fragmentShader);
  this.uniformValues = {};
  this.actives = {};
  this.attributes = [];
  this.uniformTypes = {};
  this.savedUniforms = {};
  this.attributeNames = [];
  H3DU.ShaderInfo._setUniformsInternal(this.shaderInfo.uniformValues,
  this.uniformValues, this.savedUniforms);
  this.CURRENT_PROGRAM = 35725;
  this.FLOAT = 5126;
  if(typeof this.prog !== "undefined" && this.prog !== null) {
    var name = null;
    var ret = {};
    var count = context.getProgramParameter(this.prog, context.ACTIVE_ATTRIBUTES);
    for (var i = 0; i < count; ++i) {
      var attributeInfo = context.getActiveAttrib(this.prog, i);
      if(attributeInfo !== null && typeof attributeInfo !== "undefined") {
        name = attributeInfo.name;
        var attr = context.getAttribLocation(this.prog, name);
        if(attr >= 0) {
          this.attributes.push(attr);
          ret[name] = attr;
          this.attributeNames.push([name, attr]);
        }
      }
    }
    count = context.getProgramParameter(this.prog, context.ACTIVE_UNIFORMS);
    for (i = 0; i < count; ++i) {
      var uniformInfo = this.context.getActiveUniform(this.prog, i);
      if(uniformInfo !== null && typeof uniformInfo !== "undefined") {
        name = uniformInfo.name;
        ret[name] = this.context.getUniformLocation(this.prog, name);
        this.uniformTypes[name] = uniformInfo.type;
      }
    }
    this.actives = ret;
  }
};
/** @private */
H3DU.ShaderProgram.prototype._disableOthers = function(attrs) {
  "use strict";
  var a = {};
  for(var i = 0;i < attrs.length;i++) {
    a[attrs[i][0]] = true;
  }
  for(i = 0;i < this.attributeNames.length;i++) {
    var name = this.attributeNames[i];
    if(!a[name[0]]) {
      this.context.disableVertexAttribArray(name[1]);
    }
  }
};
/** Disposes resources from this shader program.
* @memberof! H3DU.ShaderProgram#
*/
H3DU.ShaderProgram.prototype.dispose = function() {
  "use strict";
  if(this.program) {
    this.context.deleteProgram(this.program);
  }
  this.context = null;
  this.program = null;
  this.actives = {};
  this.attributes = {};
  this.uniformTypes = {};
};
/**
 * TODO: Not documented yet.
 * @memberof! H3DU.ShaderProgram#
*/
H3DU.ShaderProgram.prototype.getContext = function() {
  "use strict";
  return this.context;
};
/** @private */
H3DU.ShaderProgram.prototype._setUniformInternal = function(uniforms, i) {
  "use strict";
  var uniform = this.get(i);
  if(uniform === null || typeof uniform === "undefined")return;
  var uv = uniforms[i];
  if(typeof uv === "number") {
    if(this.uniformTypes[i] === this.FLOAT) {
      this.context.uniform1f(uniform, uv);
    } else {
      this.context.uniform1i(uniform, uv);
    }
  }  else if(uv.length === 3) {
    this.context.uniform3fv(uniform, uv);
  } else if(uv.length === 2) {
    this.context.uniform2fv(uniform, uv);
  } else if(uv.length === 4) {
    this.context.uniform4fv(uniform, uv);
  } else if(uv.length === 16) {
    this.context.uniformMatrix4fv(uniform, false, uv);
  } else if(uv.length === 9) {
    this.context.uniformMatrix3fv(uniform, false, uv);
  }
};

/**
* Gets the location of the given uniform or attribute's name in this program.
* (Although the location may change each time the shader program
* is linked, that normally only happens upon construction
* in the case of H3DU.ShaderInfo.)
* @param {String} name The name of an attribute or uniform defined in either the
* vertex or fragment shader of this shader program.  If the uniform or attribute
* is an array, each element in the array is named as in these examples:
* "unif[0]", "unif[1]".   If it's a struct, each member in the struct is named as in these examples:
* "unif.member1", "unif.member2".  If it's an array of struct, each
* member is named as in these examples: "unif[0].member1",
* "unif[0].member2".
* @returns {number|WebGLUniformLocation|null} The location of the uniform or attribute
* name, or null if it doesn't exist.
* @memberof! H3DU.ShaderProgram#
*/
H3DU.ShaderProgram.prototype.get = function(name) {
  "use strict";
  var ret = this.actives[name];
  return ret === null || typeof ret === "undefined" ? null : ret;
};
/**
* Gets the value of the given uniform in this program. This method
* may be called at any time, even if this program is not currently the
* active program in the WebGL context.
* @param {String} name The name of a uniform defined in either the
* vertex or fragment shader of this shader program.  See get().
* @returns {*} The uniform's value, or null if it doesn't exist or if
* an attribute is named, not a uniform.
* @memberof! H3DU.ShaderProgram#
*/
H3DU.ShaderProgram.prototype.getUniform = function(name) {
  "use strict";
  var loc = typeof name === "string" ? this.get(name) : name;
 // If "loc" is a number that means it's an attribute, not a uniform;
 // we expect WebGLUniformLocation
  if(loc === null || typeof loc === "number")return null;
 // using a cache since context.getUniform can be slow with
 // repeated calls
  var uv = this.uniformValues[name];
  if(uv === null || typeof uv === "undefined") {
    return this.context.getUniform(this.program, loc);
  } else {
    return uv instanceof Array ? uv.slice(0, uv.length) : uv;
  }
};
/** @private */
H3DU.ShaderProgram.prototype._setSavedUniforms = function() {
  "use strict";
  var i;
  var uniformsLength = 0;
  if(typeof Object.keys === "undefined") {
    for(i in this.savedUniforms) {
      if(Object.prototype.hasOwnProperty.call(this.savedUniforms, i)) {
        this._setUniformInternal(this.savedUniforms, i);
        uniformsLength++;
      }
    }
  } else {
    var keys = Object.keys(this.savedUniforms);
    uniformsLength = keys.length;
    for(var ki = 0;ki < uniformsLength;ki++) {
      i = keys[ki];
      this._setUniformInternal(this.savedUniforms, i);
    }
  }
  return uniformsLength;
};
/**
 * TODO: Not documented yet.
 * @memberof! H3DU.ShaderProgram#
*/
H3DU.ShaderProgram.prototype.use = function() {
  "use strict";
  this.context.useProgram(this.prog);
  if(this._setSavedUniforms() > 0) {
    this.savedUniforms = {};
  }
  return this;
};
/** @private */
H3DU.ShaderProgram.prototype._update = function() {
  "use strict";
  H3DU.ShaderInfo._setUniformsInternal(this.shaderInfo.uniformValues,
   this.uniformValues, this.savedUniforms);
  return this;
};
/**
 * TODO: Not documented yet.
 * @param {*} uniforms
 * @memberof! H3DU.ShaderProgram#
*/
H3DU.ShaderProgram.prototype.setUniforms = function(uniforms) {
  "use strict";

  H3DU.ShaderInfo._setUniformsInternal(uniforms, this.uniformValues,
   this.savedUniforms);
  if(this.context.getParameter(
         this.CURRENT_PROGRAM) === this.prog) {
    if(this._setSavedUniforms() > 0) {
      this.savedUniforms = {};
    }
  }
  return this;
};

/** @private */
H3DU.ShaderProgram._compileShaders = function(context, vertexShader, fragmentShader) {
  "use strict";
  function compileShader(context, kind, text) {
    var shader = context.createShader(kind);
    context.shaderSource(shader, text);
    context.compileShader(shader);
    if (!context.getShaderParameter(shader, context.COMPILE_STATUS)) {
      var lines = text.split("\n");
      // add line numbers
      for(var i = 0;i < lines.length;i++) {
        lines[i] = "/* " + (i + 1) + " */   " + lines[i];
      }
      console.log(lines.join("\n"));
      console.log((kind === context.VERTEX_SHADER ? "vertex: " : "fragment: ") +
        context.getShaderInfoLog(shader));
      return null;
    }
    return shader;
  }
  var vs = !vertexShader || vertexShader.length === 0 ? null :
    compileShader(context, context.VERTEX_SHADER, vertexShader);
  var fs = !fragmentShader || fragmentShader.length === 0 ? null :
    compileShader(context, context.FRAGMENT_SHADER, fragmentShader);
  var program = null;
  if(vs !== null && typeof vs !== "undefined" && (fs !== null && typeof fs !== "undefined")) {
    program = context.createProgram();
    context.attachShader(program, vs);
    context.attachShader(program, fs);
    context.linkProgram(program);
    if (!context.getProgramParameter(program, context.LINK_STATUS)) {
      console.log("link: " + context.getProgramInfoLog(program));
      context.deleteProgram(program);
      program = null;
    }
    context.detachShader(program, vs);
    context.detachShader(program, fs);
  }
  if(vs !== null && typeof vs !== "undefined")context.deleteShader(vs);
  if(fs !== null && typeof fs !== "undefined")context.deleteShader(fs);
  return program;
};
/** @private */
H3DU.ShaderProgram.fragmentShaderHeader = function() {
  "use strict";
  return "" +
"#ifdef GL_ES\n" +
"#ifndef GL_FRAGMENT_PRECISION_HIGH\n" +
"precision mediump float;\n" +
"#else\n" +
"precision highp float;\n" +
"#endif\n" +
"#endif\n";
};
/**
* Generates source code for a fragment shader for applying
* a raster effect to a texture.
* @param {String} functionCode See H3DU.ShaderProgram.makeEffect().
* @returns {String} The source text of the resulting fragment shader.
*/
H3DU.ShaderProgram.makeEffectFragment = function(functionCode) {
  "use strict";
  var shader = H3DU.ShaderProgram.fragmentShaderHeader();
  shader += "" +
"uniform sampler2D sampler;\n" + // texture sampler
"uniform vec2 textureSize;\n" + // texture size
"varying vec2 uvVar;\n" +
"varying vec3 colorAttrVar;\n";
  shader += functionCode;
  shader += "\n\nvoid main() {\n" +
" // normalize coordinates to 0..1\n" +
" vec2 uv=gl_FragCoord.xy/textureSize.xy;\n" +
" gl_FragColor=textureEffect(sampler,uv,textureSize);\n" +
"}";
  return shader;
};
/**
 * TODO: Not documented yet.
 */
H3DU.ShaderProgram.makeCopyEffect = function() {
  "use strict";
  var shader = H3DU.ShaderProgram.fragmentShaderHeader();
  shader += "" +
"uniform sampler2D sampler;\n" + // texture sampler
"varying vec2 uvVar;\n" +
"varying vec3 colorAttrVar;\n";
  shader += "\n\nvoid main() {\n" +
" gl_FragColor=texture2D(sampler,uvVar);\n" +
"}";
  return new H3DU.ShaderInfo(
   H3DU.ShaderProgram.getBasicVertex(), shader);
};

/**
* Generates a shader program for applying
* a raster effect (postprocessing effect) to a texture.
* @param {*} context No longer used; ignored.
* @param {String} functionCode A string giving shader code
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
* @returns {H3DU.ShaderInfo} The resulting shader program.
*/
H3DU.ShaderProgram.makeEffect = function(context, functionCode) {
  "use strict";
  return new H3DU.ShaderInfo(
   H3DU.ShaderProgram.getBasicVertex(),
   H3DU.ShaderProgram.makeEffectFragment(functionCode));
};
/**
* Generates a shader program that inverts the colors of a texture.
* @param {*} [context] No longer used; ignored.
* @returns {H3DU.ShaderInfo} The resulting shader program.
*/
H3DU.ShaderProgram.getInvertEffect = function() {
  "use strict";
  return H3DU.ShaderProgram.makeEffect(null,
[
  "vec4 textureEffect(sampler2D sampler, vec2 uvCoord, vec2 textureSize) {",
  " vec4 color=texture2D(sampler,uvCoord);",
  " vec4 ret; ret.xyz=vec3(1.0,1.0,1.0)-color.xyz; ret.w=color.w; return ret;",
  "}"].join("\n"));
};
/**
* Generates a shader program that generates a two-color texture showing
* the source texture's edges.
* @param {*} [context] No longer used; ignored.
* @returns {H3DU.ShaderInfo} The resulting shader program.
*/
H3DU.ShaderProgram.getEdgeDetectEffect = function() {
  "use strict";
// Adapted by Peter O. from David C. Bishop's EdgeDetect.frag,
// in the public domain

  return H3DU.ShaderProgram.makeEffect(null,
["float luma(vec3 color) {",
  " return 0.2126 * color.r + 0.7152 * color.g + 0.0722 * color.b;",
  "}",
  "const vec4 edge_color=vec4(0.,0,0,1);",
  "const vec4 back_color=vec4(1.,1,1,1);",
  "vec4 textureEffect(sampler2D sampler, vec2 uvCoord, vec2 textureSize) {",
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
};

/** @private */
H3DU.ShaderProgram.getBasicVertex = function() {
  "use strict";
  var shader = "" +
"attribute vec3 position;\n" +
"attribute vec2 uv;\n" +
"varying vec2 uvVar;\n" +
"#ifdef COLORATTR\n" +
"attribute vec3 colorAttr;\n" +
"varying vec3 colorAttrVar;\n" +
"#endif\n" +
"void main() {\n" +
"vec4 positionVec4;\n" +
"positionVec4.w=1.0;\n" +
"positionVec4.xyz=position;\n" +
"gl_PointSize=1.0;\n" +
"uvVar=uv;\n" +
"#ifdef COLORATTR\n" +
"colorAttrVar=colorAttr;\n" +
"#endif\n" +
"gl_Position=positionVec4;\n" +
"}\n";
  return shader;
};
/**
* Gets the text of the default vertex shader.  Putting "#define SHADING\n"
* at the start of the return value enables the lighting model.
* @returns {String} The resulting shader text.
*/
H3DU.ShaderProgram.getDefaultVertex = function() {
  "use strict";
  var shader = [
    "attribute vec3 position;",
    "attribute vec3 normal;",
    "attribute vec2 uv;",
    "#ifdef COLORATTR",
    "attribute vec3 colorAttr;",
    "varying vec3 colorAttrVar;",
    "#endif\n" +
"attribute vec3 tangent;",
    "attribute vec3 bitangent;",
    "uniform mat4 projection;",
    "uniform mat4 modelViewMatrix;",
    "#ifdef SHADING",
    "uniform mat3 normalMatrix; /* internal */",
    "#ifdef NORMAL_MAP",
    "uniform mat4 world;",
    "varying mat3 tbnMatrixVar;",
    "#endif",
    "varying vec4 viewPositionVar;",
    "varying vec3 transformedNormalVar;",
    "#endif",
    "varying vec2 uvVar;",
    "void main() {",
    "vec4 positionVec4;",
    "positionVec4.w=1.0;",
    "positionVec4.xyz=position;",
    "gl_PointSize=1.0;",
    "gl_Position=(projection*modelViewMatrix)*positionVec4;",
    "#ifdef COLORATTR\n" +
"colorAttrVar=colorAttr;\n" +
"#endif\n" +
"uvVar=uv;",
    "#ifdef SHADING",
    "transformedNormalVar=normalize(normalMatrix*normal);",
    "#ifdef NORMAL_MAP",
    "tbnMatrixVar=mat3(normalize(vec3(world*vec4(tangent,0.0))),",
    "   normalize(bitangent),transformedNormalVar);",
    "#endif",
    "viewPositionVar=modelViewMatrix*positionVec4;",
    "#endif",
    "}"].join("\n");
  return shader;
};

/**
* Gets the text of the default fragment shader.  Putting "#define SHADING\n"
* at the start of the return value enables the lighting model.
* Putting "#define SPECULAR\n"
* at the start of the return value enables specular highlights (as long
* as SHADING is also enabled).
* @returns {String} The resulting shader text.
*/
H3DU.ShaderProgram.getDefaultFragment = function() {
  "use strict";
  var i;
  var shader = H3DU.ShaderProgram.fragmentShaderHeader() +
 // if shading is disabled, this is solid color instead of material diffuse
 "uniform vec4 md;\n" +
"#ifdef SHADING\n" +
"struct light {\n" +
// NOTE: These struct members must be aligned to
// vec4 size; otherwise, Chrome may have issues retaining
// the value of lights[i].specular, causing flickering
" vec4 position; /* source light direction/position, in camera/eye space */\n" +
" vec4 diffuse; /* source light diffuse color */\n" +
"#ifdef SPECULAR\n" +
" vec4 specular; /* source light specular color */\n" +
"#endif\n" +
" vec4 radius; /* light radius */\n" +
"};\n" +
"uniform vec3 sceneAmbient;\n" +
"uniform light lights[" + H3DU.Lights.MAX_LIGHTS + "];\n" +
"uniform vec3 ma;\n" +
"uniform vec3 me;\n" +
"#ifdef SPECULAR\n" +
"uniform vec3 ms;\n" +
"uniform float mshin;\n" +
"#ifdef SPECULAR_MAP\n" +
"uniform sampler2D specularMap;\n" +
"#endif\n" +
"#ifdef NORMAL_MAP\n" +
"uniform sampler2D normalMap;\n" +
"#endif\n" +
"#endif\n" +
"#endif\n" +
"#ifdef TEXTURE\n" +
"uniform sampler2D sampler;\n" +
"#endif\n" +
"varying vec2 uvVar;\n" +
"#ifdef COLORATTR\n" +
"varying vec3 colorAttrVar;\n" +
"#endif\n" +
"#ifdef SHADING\n" +
"varying vec4 viewPositionVar;\n" +
"varying vec3 transformedNormalVar;\n" +
"#ifdef NORMAL_MAP\n" +
"varying mat3 tbnMatrixVar;\n" +
"#endif\n" +
"vec4 calcLightPower(light lt, vec4 vertexPosition) {\n" +
" vec3 sdir;\n" +
" float attenuation;\n" +
" if(lt.position.w == 0.0) { /* directional light */\n" +
"  sdir=normalize((lt.position).xyz);\n" +
"  attenuation=1.0;\n" +
" } else { /* point light */\n" +
"  vec3 vertexToLight=(lt.position-vertexPosition).xyz;\n" +
"  float dsSquared=dot(vertexToLight,vertexToLight);\n" +
"  sdir=inversesqrt(dsSquared)*vertexToLight;\n" +
"  if(lt.radius.x == 0.0) {\n" +
"    attenuation=1.0; /* Unlimited extent */\n" +
"  } else {\n" +
// See page 32-33 of
// <http://www.frostbite.com/wp-content/uploads/2014/11/course_notes_moving_frostbite_to_pbr_v2.pdf>
"   float radiusPow4=lt.radius.x; /* Radius is light's radius to power of 4 */\n" +
"   float distPow4=dsSquared*dsSquared;\n" +
"   float attenDivisor=max(0.0001,dsSquared);\n" +
"   float cut=clamp(1.0-distPow4/radiusPow4,0.0,1.0);\n" +
"   attenuation=(cut*cut)/attenDivisor;\n" +
"  }\n" +
" }\n" +
" return vec4(sdir,attenuation);\n" +
"}\n" +
"#endif\n" +
"void main() {\n" +
" vec3 normal;\n" +
"#ifdef TEXTURE\n" +
"   vec4 baseColor=texture2D(sampler,uvVar);\n" +
"#else\n" +
"#ifdef COLORATTR\n" +
"   vec4 baseColor;\n" +
"   baseColor.w=1.0;\n" +
"   baseColor.xyz=colorAttrVar;\n" +
"#else\n" +
"   vec4 baseColor=md;\n" +
"#endif\n" +
"#endif\n" +
"#ifdef SHADING\n" +
"#ifdef NORMAL_MAP\n" +
"normal = normalize(tbnMatrixVar*(2.0*texture2D(normalMap,uvVar).rgb - vec3(1.0)));\n" +
"#else\n" +
"normal = normalize(transformedNormalVar);\n" +
"#endif\n" +
"vec4 lightPower[" + H3DU.Lights.MAX_LIGHTS + "];\n" +
"float lightCosines[" + H3DU.Lights.MAX_LIGHTS + "];\n";
  shader += "" +
"if(baseColor.a == 0.0)discard;\n" +
"vec3 materialAmbient=ma; /* ambient*/\n" +
"vec3 lightedColor=sceneAmbient*materialAmbient; /* ambient*/\n" +
" // diffuse\n" +
" vec3 materialDiffuse=baseColor.rgb;\n";
  for(i = 0;i < H3DU.Lights.MAX_LIGHTS;i++) {
    shader += "lightPower[" + i + "]=calcLightPower(lights[" + i + "],viewPositionVar);\n";
    shader += " /* Lambert diffusion term */\n";
    shader += "lightCosines[" + i + "]=clamp(dot(normal,lightPower[" + i + "].xyz),0.0,1.0);\n";
    shader += "lightedColor+=lights[" + i + "].diffuse.xyz*lightCosines[" + i + "]*\n";
    shader += "   lightPower[" + i + "].w*materialDiffuse;\n";
  }
  shader += "#ifdef SPECULAR\n" +
"bool spectmp;\n" +
"vec3 materialSpecular=ms;\n" +
"#ifdef SPECULAR_MAP\n" +
"materialSpecular*=texture2D(specularMap,uvVar).rgb;\n" +
"#endif\n" +
"// specular reflection\n" +
"if(materialSpecular.x!=0. || materialSpecular.y!=0. || materialSpecular.z!=0.) {\n" +
"vec3 viewDirection=normalize((-viewPositionVar).xyz);\n";
  for(i = 0;i < H3DU.Lights.MAX_LIGHTS;i++) {
    shader += "  spectmp = lightCosines[" + i + "] > 0.0;\n" +
"  if (spectmp) {\n" +
"    /* Blinn-Phong specular term */\n" +
"    float specular=clamp(dot(normalize(viewDirection+lightPower[" + i + "].xyz),normal),0.0,1.0);\n" +
"    specular=pow(specular,mshin);\n" +
"    lightedColor+=materialSpecular*specular*lightPower[" + i + "].w*lights[" + i + "].specular.xyz;\n" +
"  }\n";
  }
  shader += "}\n";
  shader += "#endif\n";
  shader += " // emission\n" +
" lightedColor+=me;\n" +
" baseColor=vec4(lightedColor,baseColor.a);\n" +
"#endif\n" +
" gl_FragColor=baseColor;\n" +
"}";
  return shader;
};

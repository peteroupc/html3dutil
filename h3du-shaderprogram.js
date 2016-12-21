/*
Written by Peter O. in 2015.

Any copyright is dedicated to the Public Domain.
http://creativecommons.org/publicdomain/zero/1.0/
If you like this, you should donate to Peter O.
at: http://peteroupc.github.io/
*/
/* global H3DU, console */

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
 * @param {WebGLRenderingContext|object} context
 * A WebGL context to associate with this scene, or an object, such as {@link H3DU.Scene3D}, that
* implements a no-argument <code>getContext</code> method
* that returns a WebGL context.
* @param {String} [vertexShader] Source text of a vertex shader, in OpenGL
* ES Shading Language (GLSL).  If null, a default
* vertex shader is used instead.
* @param {String} [fragmentShader] Source text of a fragment shader in GLSL.
* If null, a default fragment shader is used instead.
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
* @returns {void} Return value.
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
 * Gets the WebGL context associated with this shader program object.
* @returns {WebGLRenderingContext} Return value.
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
* @returns {Number|Array<Number>} The uniform's value, or null if it doesn't exist or if
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
 * Makes this program the active program in the WebGL
* context associated with it.  If any uniforms were saved to
* be written later (because this program wasn't active in
* the WebGL context when the "setUniforms" method
* was called), sets their values now.
* @returns {H3DU.ShaderProgram} This object.
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
* Sets the values of one or more uniforms in this program.
* If this program is not the active program in the WebGL context,
* saves their values until the next time this object's "use" method is called.
* @param {Object} uniforms An object whose keys are the names of uniforms
* defined in either the
* vertex or fragment shader of this shader program.  If the uniform
* is an array, each element in the array is named as in these examples:
* "unif[0]", "unif[1]".   If it's a struct, each member in the struct is named as in these examples:
* "unif.member1", "unif.member2".  If it's an array of struct, each
* member is named as in these examples: "unif[0].member1",
* "unif[0].member2".  The value of each key depends on the data type
* expected for the uniform named by that key.  The value can be a 3-, 4-,
9-, or 16-element array if the uniform is a "vec3", "vec4", "mat3", or "mat4",
* respectively, or a Number if the uniform is a "float" or "int".
* @returns {H3DU.ShaderProgram} This object.
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

/**
* Generates source code for a fragment shader for applying
* a raster effect to a texture.
* @deprecated Use {@link H3DU.ShaderInfo.makeEffectFragment} instead.
* @param {String} functionCode See H3DU.ShaderProgram.makeEffect().
* @returns {String} The source text of the resulting fragment shader.
* @memberof! H3DU.ShaderProgram
*/
H3DU.ShaderProgram.makeEffectFragment = function(functionCode) {
  "use strict";
  return H3DU.ShaderInfo.makeEffectFragment(functionCode);
};
/**
* Generates a shader program that copies the colors of a texture.
* @deprecated Use {@link H3DU.ShaderInfo.makeCopyEffect} instead.
* @returns {H3DU.ShaderInfo} The resulting shader program.
* @memberof! H3DU.ShaderProgram
*/
H3DU.ShaderProgram.makeCopyEffect = function() {
  "use strict";
  return H3DU.ShaderInfo.makeCopyEffect();
};

/**
* Generates a shader program for applying
* a raster effect (postprocessing effect) to a texture.
* @deprecated Use {@link H3DU.ShaderInfo.makeEffect} instead.
* @param {Object} context No longer used; ignored.
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
* @memberof! H3DU.ShaderProgram
*/
H3DU.ShaderProgram.makeEffect = function(context, functionCode) {
  "use strict";
  return H3DU.ShaderInfo.makeEffect(functionCode);
};
/**
* Generates a shader program that inverts the colors of a texture.
* @deprecated Use {@link H3DU.ShaderInfo.makeInvertEffect} instead.
* @param {Object} [context] No longer used; ignored.
* @returns {H3DU.ShaderInfo} The resulting shader program.
* @memberof! H3DU.ShaderProgram
*/
H3DU.ShaderProgram.getInvertEffect = function() {
  "use strict";
  return H3DU.ShaderInfo.makeInvertEffect();
};
/**
* Generates a shader program that generates a two-color texture showing
* the source texture's edges.
* @deprecated Use {@link H3DU.ShaderInfo.makeEdgeDetectEffect} instead.
* @param {Object} [context] No longer used; ignored.
* @returns {H3DU.ShaderInfo} The resulting shader program.
* @memberof! H3DU.ShaderProgram
*/
H3DU.ShaderProgram.getEdgeDetectEffect = function() {
  "use strict";
// Adapted by Peter O. from David C. Bishop's EdgeDetect.frag,
// in the public domain
  return H3DU.ShaderInfo.makeEdgeDetectEffect();
};

/**
* Gets the text of the default vertex shader.  Putting "#define SHADING\n"
* at the start of the return value enables the lighting model.
* @deprecated Use {@link H3DU.ShaderInfo.getDefaultVertex} instead.
* @returns {String} The resulting shader text.
* @memberof! H3DU.ShaderProgram
*/
H3DU.ShaderProgram.getDefaultVertex = function() {
  "use strict";
  return H3DU.ShaderInfo.getDefaultVertex();
};

/**
* Gets the text of the default fragment shader.  Putting "#define SHADING\n"
* at the start of the return value enables the lighting model.
* Putting "#define SPECULAR\n"
* at the start of the return value enables specular highlights (as long
* as SHADING is also enabled).
* @deprecated Use {@link H3DU.ShaderInfo.getDefaultFragment} instead.
* @returns {String} The resulting shader text.
* @memberof! H3DU.ShaderProgram
*/
H3DU.ShaderProgram.getDefaultFragment = function() {
  "use strict";
  return H3DU.ShaderInfo.getDefaultFragment();
};

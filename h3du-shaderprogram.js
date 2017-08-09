/*
 Any copyright to this file is released to the Public Domain.
 http://creativecommons.org/publicdomain/zero/1.0/
 If you like this, you should donate
 to Peter O. (original author of
 the Public Domain HTML 3D Library) at:
 http://peteroupc.github.io/
*/
/* global H3DU, console */

/**
 * Represents a WebGL shader program. A shader program in
 * WebGL consists of a vertex shader (which processes vertices),
 * and a fragment shader (which processes pixels). Shader programs
 * are specially designed for running on a graphics processing unit,
 * or GPU.<p>
 * When the H3DU.ShaderProgram constructor is called, it will compile
 * and link a shader program from the source text passed to it, but
 * it won't use that program until the use() method is called. If the
 * program is compiled and linked successfully, the constructor
 * will also gather a list of the program's attributes (vertex-specific variables
 * in vertex buffer objects) and uniforms (variables not specific to a vertex).<p>
 * If compiling or linking the shader program fails, a diagnostic
 * log is output to the JavaScript console.
 * @constructor
 * @memberof H3DU
 * @deprecated This class is likely to become a private class.
 * Use the {@link H3DU.ShaderInfo} class instead, which is not coupled to WebGL
 * contexts.
 * @param {WebGLRenderingContext|WebGL2RenderingContext|Object} context
 * A WebGL context to associate with this scene, or an object, such as {@link H3DU.Scene3D}, that
 * implements a no-argument <code>getContext</code> method
 * that returns a WebGL context.
 * @param {string} [vertexShader] Source text of a vertex shader, in OpenGL
 * ES Shading Language (GLSL). If null, a default
 * vertex shader is used instead.
 * @param {string} [fragmentShader] Source text of a fragment shader in GLSL.
 * If null, a default fragment shader is used instead.
 */
export var ShaderProgram = function(context, vertexShader, fragmentShader) {
  this._init(context, new H3DU.ShaderInfo(vertexShader, fragmentShader));
};
/** @ignore */
ShaderProgram._fromShaderInfo = function(context, shader) {
  var ret = new H3DU.ShaderProgram(null);
  ret._init(context, shader);
  return ret;
};
/** @ignore */
ShaderProgram.prototype._init = function(context, shaderInfo) {
  if(!context)return;
  context = context.getContext ? context.getContext() : context;
  this.CURRENT_PROGRAM = 35725;
  this.FLOAT = 5126;
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
  this.attributeSemantics = {};
  var keys = Object.keys(shaderInfo.attributeSemantics);
  for(var i = 0; i < keys.length; i++) {
    this.attributeSemantics[keys[i]] = shaderInfo.attributeSemantics[keys[i]].slice(0, 2);
  }
  this.uniformSemantics = {};
  keys = Object.keys(shaderInfo.uniformSemantics);
  for(i = 0; i < keys.length; i++) {
    this.uniformSemantics[keys[i]] = shaderInfo.uniformSemantics[keys[i]];
  }
  H3DU.ShaderInfo._setUniformsInternal(this.shaderInfo.uniformValues,
    this.uniformValues, this.savedUniforms);
  if(typeof this.prog !== "undefined" && this.prog !== null) {
    var name = null;
    var ret = {};
    var count = context.getProgramParameter(this.prog, context.ACTIVE_ATTRIBUTES);
    for (i = 0; i < count; ++i) {
      var attributeInfo = context.getActiveAttrib(this.prog, i);
      if(typeof attributeInfo !== "undefined" && attributeInfo !== null) {
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
      if(typeof uniformInfo !== "undefined" && uniformInfo !== null) {
        name = uniformInfo.name;
        ret[name] = this.context.getUniformLocation(this.prog, name);
        this.uniformTypes[name] = uniformInfo.type;
      }
    }
    this.actives = ret;
  }
};
/** @ignore */
ShaderProgram.prototype._addNamesWithSemantic = function(array, sem, index) {
  for(var key in this.attributeSemantics) {
    if(Object.prototype.hasOwnProperty.call(this.attributeSemantics, key)) {
      var v = this.attributeSemantics[key];
      if(v[0] === sem && v[1] === index) {
        array.push(key);
      }
    }
  }
};
/** @ignore */
ShaderProgram.prototype._disableOthers = function(names) {
  var a = {};
  for(var i = 0; i < names.length; i++) {
    a[names[i]] = true;
  }
  for(i = 0; i < this.attributeNames.length; i++) {
    var name = this.attributeNames[i];
    if(!a[name[0]]) {
      this.context.disableVertexAttribArray(name[1]);
    }
  }
};
/** Disposes resources from this shader program.
 * @returns {void} This method doesn't return a value.
 * @suppress {deprecated}
 */
ShaderProgram.prototype.dispose = function() {
  if(this.program) {
    this.context.deleteProgram(this.program);
  }
  this.context = null;
  this.program = null;
  this.actives = {};
  this.attributes = {};
  this.uniformTypes = {};
  this.attributeSemantics = {};
};
/** @ignore */
ShaderProgram.prototype.setSemantic = function(name, sem, index) {
  var an = this.attributeSemantics[name];
  var semIndex = H3DU.MeshBuffer._resolveSemantic(name, index);
  if(an) {
    an[0] = semIndex[0];
    an[1] = semIndex[1];
  } else {
    this.attributeSemantics[name] = semIndex;
  }
  return null;
};

/**
 * Gets the WebGL context associated with this shader program object.
 * @returns {WebGLRenderingContext|WebGL2RenderingContext} Return value.
 */
ShaderProgram.prototype.getContext = function() {
  return this.context;
};
/** @ignore */
ShaderProgram.prototype._setUniformInternal = function(uniforms, i) {
  var uniform = this.get(i);
  if(typeof uniform === "undefined" || uniform === null)return;
  var uv = uniforms[i];
  if(uv instanceof H3DU.TextureInfo) {
    // NOTE: TextureInfo not supported for ShaderPrograms
    return;
  }
  if(typeof uv === "number") {
    if(this.uniformTypes[i] === this.FLOAT) {
      this.context.uniform1f(uniform, uv);
    } else {
      this.context.uniform1i(uniform, uv);
    }
  } else if(uv.length === 3) {
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
 * @param {string} name The name of an attribute or uniform defined in either the
 * vertex or fragment shader of this shader program. If the uniform or attribute
 * is an array, each element in the array is named as in these examples:
 * "unif[0]", "unif[1]". If it's a struct, each member in the struct is named as in these examples:
 * "unif.member1", "unif.member2". If it's an array of struct, each
 * member is named as in these examples: "unif[0].member1",
 * "unif[0].member2".
 * @returns {number|WebGLUniformLocation|null} The location of the uniform or attribute
 * name, or null if it doesn't exist.
 */
ShaderProgram.prototype.get = function(name) {
  var ret = this.actives[name];
  return typeof ret === "undefined" || ret === null ? null : ret;
};
/**
 * Gets the value of the given uniform in this program. This method
 * may be called at any time, even if this program is not currently the
 * active program in the WebGL context.
 * @param {string} name The name of a uniform defined in either the
 * vertex or fragment shader of this shader program. See get().
 * @returns {Number|Array<number>} The uniform's value, or null if it doesn't exist or if
 * an attribute is named, not a uniform.
 */
ShaderProgram.prototype.getUniform = function(name) {
  var loc = typeof name === "string" ? this.get(name) : name;
  // If "loc" is a number that means it's an attribute, not a uniform;
  // we expect WebGLUniformLocation
  if(loc === null || typeof loc === "number")return null;
  // using a cache since context.getUniform can be slow with
  // repeated calls
  var uv = this.uniformValues[name];
  if(typeof uv === "undefined" || uv === null) {
    return this.context.getUniform(this.program, loc);
  } else {
    return uv instanceof Array ? uv.slice(0, uv.length) : uv;
  }
};

/** @ignore */
ShaderProgram.prototype._setSavedUniforms = function() {
  var i;
  var uniformsLength = 0;
  var keys = Object.keys(this.savedUniforms);
  uniformsLength = keys.length;
  for(var ki = 0; ki < uniformsLength; ki++) {
    i = keys[ki];
    this._setUniformInternal(this.savedUniforms, i);
  }
  return uniformsLength;
};
/**
 * Makes this program the active program in the WebGL
 * context associated with it. If any uniforms were saved to
 * be written later (because this program wasn't active in
 * the WebGL context when the "setUniforms" method
 * was called), sets their values now.
 * @returns {H3DU.ShaderProgram} This object.
 */
ShaderProgram.prototype.use = function() {
  this.context.useProgram(this.prog);
  if(this._setSavedUniforms() > 0) {
    this.savedUniforms = {};
  }
  return this;
};
/** @ignore */
ShaderProgram.prototype._update = function() {
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
 * vertex or fragment shader of this shader program. If the uniform
 * is an array, each element in the array is named as in these examples:
 * "unif[0]", "unif[1]". If it's a struct, each member in the struct is named as in these examples:
 * "unif.member1", "unif.member2". If it's an array of struct, each
 * member is named as in these examples: "unif[0].member1",
 * "unif[0].member2". The value of each key depends on the data type
 * expected for the uniform named by that key. The value can be a 3-, 4-,
 * 9-, or 16-element array if the uniform is a "vec3", "vec4", "mat3", or "mat4",
 * respectively, or a Number if the uniform is a "float" or "int".
 * @returns {H3DU.ShaderProgram} This object.
 */
ShaderProgram.prototype.setUniforms = function(uniforms) {
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

/** @ignore */
ShaderProgram._compileShaders = function(context, vertexShader, fragmentShader) {
  function compileShader(context, kind, text) {
    var shader = context.createShader(kind);
    context.shaderSource(shader, text);
    context.compileShader(shader);
    if (!context.getShaderParameter(shader, context.COMPILE_STATUS)) {
      if(!text)text = "";
      var lines = text.split("\n");
      // add line numbers
      for(var i = 0; i < lines.length; i++) {
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
  if(typeof vs !== "undefined" && vs !== null && (typeof fs !== "undefined" && fs !== null)) {
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
  if(typeof vs !== "undefined" && vs !== null)context.deleteShader(vs);
  if(typeof fs !== "undefined" && fs !== null)context.deleteShader(fs);
  return program;
};

/**
 * Generates source code for a fragment shader for applying
 * a raster effect to a texture.
 * @deprecated Use {@link H3DU.ShaderInfo.makeEffectFragment} instead.
 * @param {string} functionCode See H3DU.ShaderProgram.makeEffect().
 * @returns {string} The source text of the resulting fragment shader.
 */
ShaderProgram.makeEffectFragment = function(functionCode) {
  return H3DU.ShaderInfo.makeEffectFragment(functionCode);
};
/**
 * Generates a shader program that copies the colors of a texture.
 * @deprecated Use {@link H3DU.ShaderInfo.makeCopyEffect} instead.
 * @returns {H3DU.ShaderInfo} The resulting shader program.
 */
ShaderProgram.makeCopyEffect = function() {
  return H3DU.ShaderInfo.makeCopyEffect();
};

/**
 * Generates a shader program for applying
 * a raster effect (postprocessing effect) to a texture.
 * @deprecated Use {@link H3DU.ShaderInfo.makeEffect} instead.
 * @param {Object} context No longer used; ignored.
 * @param {string} functionCode A string giving shader code
 * in OpenGL ES Shading Language (GLSL) that must contain
 * a function with the following signature:
 * <pre>
 * vec4 textureEffect(sampler2D sampler, vec2 uvCoord, vec2 textureSize)
 * </pre>
 * where <code>sampler</code> is the texture sampler, <code>uvCoord</code>
 * is the texture coordinates ranging from 0 to 1 in each component,
 * <code>textureSize</code> is the dimensions of the texture in pixels,
 * and the return value is the new color at the given texture coordinates. Besides
 * this requirement, the shader code is also free to define additional uniforms,
 * constants, functions, and so on (but not another "main" function).
 * @returns {H3DU.ShaderInfo} The resulting shader program.
 */
ShaderProgram.makeEffect = function(context, functionCode) {
  if(typeof context !== "undefined" && context !== null) {
    console.warn("Unused parameter context is defined");
  }
  return H3DU.ShaderInfo.makeEffect(functionCode);
};
/**
 * Generates a shader program that inverts the colors of a texture.
 * @deprecated Use {@link H3DU.ShaderInfo.makeInvertEffect} instead.
 * @param {Object} [context] No longer used; ignored.
 * @returns {H3DU.ShaderInfo} The resulting shader program.
 */
ShaderProgram.getInvertEffect = function(context) {
  if(typeof context !== "undefined" && context !== null) {
    console.warn("Unused parameter context is defined");
  }
  return H3DU.ShaderInfo.makeInvertEffect();
};
/**
 * Generates a shader program that generates a two-color texture showing
 * the source texture's edges.
 * @deprecated Use {@link H3DU.ShaderInfo.makeEdgeDetectEffect} instead.
 * @param {Object} [context] No longer used; ignored.
 * @returns {H3DU.ShaderInfo} The resulting shader program.
 */
ShaderProgram.getEdgeDetectEffect = function(context) {
// Adapted by Peter O. from David C. Bishop's EdgeDetect.frag,
// in the public domain
  if(typeof context !== "undefined" && context !== null) {
    console.warn("Unused parameter context is defined");
  }
  return H3DU.ShaderInfo.makeEdgeDetectEffect();
};

/**
 * Gets the text of the default vertex shader.  Putting "#define SHADING\n"
 * at the start of the return value enables the lighting model.
 * @deprecated Use {@link H3DU.ShaderInfo.getDefaultVertex} instead.
 * @returns {string} The resulting shader text.
 */
ShaderProgram.getDefaultVertex = function() {
  return H3DU.ShaderInfo.getDefaultVertex();
};

/**
 * Gets the text of the default fragment shader.  Putting "#define SHADING\n"
 * at the start of the return value enables the lighting model.
 * Putting "#define SPECULAR\n"
 * at the start of the return value enables specular highlights (as long
 * as SHADING is also enabled).
 * @deprecated Use {@link H3DU.ShaderInfo.getDefaultFragment} instead.
 * @returns {string} The resulting shader text.
 */
ShaderProgram.getDefaultFragment = function() {
  return H3DU.ShaderInfo.getDefaultFragment();
};

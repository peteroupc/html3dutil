/*
 Any copyright to this file is released to the Public Domain.
 http://creativecommons.org/publicdomain/zero/1.0/
 If you like this, you should donate
 to Peter O. (original author of
 the Public Domain HTML 3D Library) at:
 http://peteroupc.github.io/
*/
/* global H3DU, Uint32Array, console */

/**
 * Holds source code for a WebGL shader program. A shader program in
 * WebGL consists of a vertex shader (which processes vertices),
 * and a fragment shader (which processes pixels). Shader programs
 * are specially designed for running on a graphics processing unit,
 * or GPU.<p>
 * This class also stores semantics and uniform values associated with the shader
 * source code.<p>
 * Note that this class is not associated with any WebGL context, so the
 * uniform values this object stores is not set for any WebGL context.
 * <p>Currently, the following attribute names are associated
 * with this object by default:<ul>
 * <li><code>position</code> - "POSITION" semantic</li>
 * <li><code>normal</code> - "NORMAL" semantic</li>
 * <li><code>uv</code> - "TEXCOORD_0" semantic</li>
 * <li><code>tangent</code> - Attribute for tangents.</li>
 * <li><code>bitangent</code> - Attribute for bitangents</li>
 * <li><code>colorAttr</code> - "COLOR"</li>
 * </ul>
 * <p>Currently, the following uniform names are associated
 * with this object by default:<ul>
 * <li><code>projection</code> - Projection matrix</li>
 * <li><code>modelViewMatrix</code> - Model-view matrix</li>
 * <li><code>normalMatrix</code> - Inverse transpose of the model-view matrix</li>
 * <li><code>world</code> - World matrix.</li>
 * <li><code>inverseView</code> - Inverse view matrix.</li>
 * </ul>
 * @class
 * @alias H3DU.ShaderInfo
 * @param {String} [vertexShader] Source text of a vertex shader, in OpenGL
 * ES Shading Language (GLSL). If null, a default
 * vertex shader is used instead.
 * @param {String} [fragmentShader] Source text of a fragment shader in GLSL.
 * If null, a default fragment shader is used instead.
 */
H3DU.ShaderInfo = function(vertexShader, fragmentShader) {
  "use strict";
  if(typeof vertexShader === "undefined" || vertexShader === null) {
    vertexShader = H3DU.ShaderInfo.getDefaultVertex();
  }
  if(typeof fragmentShader === "undefined" || fragmentShader === null) {
    fragmentShader = H3DU.ShaderInfo.getDefaultFragment();
  }
  this.vertexShader = vertexShader;
  this.fragmentShader = fragmentShader;
  this.uniformValues = {};
  this.attributeSemantics = {};
  this.attributeSemantics.position = new Uint32Array([H3DU.Semantic.POSITION, 0]);
  this.attributeSemantics.tangent = new Uint32Array([H3DU.Semantic.TANGENT, 0]);
  this.attributeSemantics.bitangent = new Uint32Array([H3DU.Semantic.BITANGENT, 0]);
  this.attributeSemantics.normal = new Uint32Array([H3DU.Semantic.NORMAL, 0]);
  this.attributeSemantics.uv = new Uint32Array([H3DU.Semantic.TEXCOORD, 0]);
  this.attributeSemantics.colorAttr = new Uint32Array([H3DU.Semantic.COLOR, 0]);
  this.uniformSemantics = {};
  this.uniformSemantics.projection = H3DU.Semantic.PROJECTION;
  this.uniformSemantics.world = H3DU.Semantic.MODEL;
  this.uniformSemantics.inverseView = H3DU.Semantic.VIEWINVERSE;
  this.uniformSemantics.modelViewMatrix = H3DU.Semantic.MODELVIEW;
  this.uniformSemantics.normalMatrix = H3DU.Semantic.MODELVIEWINVERSETRANSPOSE;
};
/**
 * Sets a semantic for the given named uniform.
 * @param {String} u The name of the uniform.
 * @param {Number} sem A uniform semantic given in {@link H3DU.Semantic}.
 * @returns {H3DU.ShaderInfo} This object.
 * @memberof! H3DU.ShaderInfo#
 */
H3DU.ShaderInfo.prototype.setUniformSemantic = function(u, sem) {
  "use strict";
  this.uniformSemantics[u] = sem;
  return this;
};

/**
 * Gets the text of the vertex shader stored in this object.
 * @returns {String} return value.
 * @memberof! H3DU.ShaderInfo#
 */
H3DU.ShaderInfo.prototype.getVertexShader = function() {
  "use strict";
  return this.vertexShader;
};
/**
 * Gets the text of the fragment shader stored in this object.
 * @returns {String} return value.
 * @memberof! H3DU.ShaderInfo#
 */
H3DU.ShaderInfo.prototype.getFragmentShader = function() {
  "use strict";
  return this.fragmentShader;
};

/**
 * Has no effect. A method introduced for compatibility reasons.
 * @deprecated
 * @memberof! H3DU.ShaderInfo#
 */
H3DU.ShaderInfo.prototype.dispose = function() {
  "use strict";
};

/**
 * Sets the semantic for a vertex attribute.
 * @param {String} name Name of the attribute.
 * @param {Number|String} semantic An attribute semantic, such
 * as {@link H3DU.Semantic.POSITION}, "POSITION", or "TEXCOORD_0".
 * @param {Number} semanticIndex The set index of the attribute
 * for the given semantic.
 * 0 is the first index of the attribute, 1 is the second, and so on.
 * This is ignored if "semantic" is a string.
 * @returns {H3DU.ShaderInfo} This object. Throws an error if the given
 * semantic is unsupported.
 * @memberof! H3DU.ShaderProgram#
 */
H3DU.ShaderInfo.prototype.setSemantic = function(name, sem, index) {
  "use strict";
  var an = this.attributeSemantics[name];
  var semIndex = H3DU.MeshBuffer._resolveSemantic(sem, index);
  if(!semIndex) {
    throw new Error("Can't resolve " + [name, sem, index]);
  }
  if(an) {
    an[0] = semIndex[0];
    an[1] = semIndex[1];
  } else {
    this.attributeSemantics[name] = semIndex;
  }
  return this;
};

/**
 * Returns a new shader info object with the information in this object
 * copied to that object.
 * @returns {H3DU.ShaderInfo} Return value.
 * @memberof! H3DU.ShaderInfo#
 */
H3DU.ShaderInfo.prototype.copy = function() {
  "use strict";
  var sp = new H3DU.ShaderInfo(this.vertexShader, this.fragmentShader);
  sp.setUniforms(this.uniformValues);
  for(var k in this.attributeSemantics)
    if(Object.prototype.hasOwnProperty.call(this.attributeSemantics, k)) {
      var v = this.attributeSemantics[k];
      sp.attributeSemantics[k] = v.slice(0, 2);
    }
  for(k in this.uniformSemantics)
    if(Object.prototype.hasOwnProperty.call(this.uniformSemantics, k)) {
      v = this.uniformSemantics[k];
      sp.uniformSemantics[k] = v;
    }
  return sp;
};
/**
 * Sets the values of one or more uniforms used by this shader program.
 * Since this object doesn't store a WebGL context, or receive one as input,
 * the uniforms won't be associated with a WebGL context.
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
 * @returns {H3DU.ShaderInfo} This object.
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
    if(typeof uv === "undefined" || uv === null) {
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
  } else if(v instanceof H3DU.TextureInfo) {
    if(typeof uv === "undefined" || uv === null || !(uv instanceof H3DU.TextureInfo)) {
      uniformValues[i] = uv = new H3DU.TextureInfo().copyFrom(v);
    } else {
      uv.copyFrom(v);
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
  for(var i = 0; i < len; i++) {
    if(src[i] !== dst[i]) {
   // Arrays are different
      dst[i] = src[i];
      for(var j = i + 1; j < len; j++) {
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
  var keys = Object.keys(uniforms);
  for(var ki = 0; ki < keys.length; ki++) {
    i = keys[ki];
    H3DU.ShaderInfo._setUniformInternal(uniforms, outputUniforms, i, changedUniforms);
  }
};
/** @private */
H3DU.ShaderInfo.fragmentShaderHeader = function() {
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
 * @param {String} functionCode See {@link H3DU.ShaderInfo.makeEffect}.
 * @returns {String} The source text of the resulting fragment shader.
 * @memberof! H3DU.ShaderInfo
 */
H3DU.ShaderInfo.makeEffectFragment = function(functionCode) {
  "use strict";
  var shader = H3DU.ShaderInfo.fragmentShaderHeader();
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
 * Generates source code for a shader program that copies the colors of a texture.
 * @returns {H3DU.ShaderInfo} The resulting shader program.
 * @memberof! H3DU.ShaderInfo
 */
H3DU.ShaderInfo.makeCopyEffect = function() {
  "use strict";
  var shader = H3DU.ShaderInfo.fragmentShaderHeader();
  shader += "" +
"uniform sampler2D sampler;\n" + // texture sampler
"varying vec2 uvVar;\n" +
"varying vec3 colorAttrVar;\n";
  shader += "\n\nvoid main() {\n" +
" gl_FragColor=texture2D(sampler,uvVar);\n" +
"}";
  return new H3DU.ShaderInfo(
   H3DU.ShaderInfo.getBasicVertex(), shader);
};

/**
 * Generates source code for a shader program for applying
 * a raster effect (postprocessing effect) to a texture.
 * @param {String} functionCode A string giving shader code
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
 * @memberof! H3DU.ShaderInfo
 */
H3DU.ShaderInfo.makeEffect = function(functionCode) {
  "use strict";
  return new H3DU.ShaderInfo(
   H3DU.ShaderInfo.getBasicVertex(),
   H3DU.ShaderInfo.makeEffectFragment(functionCode));
};
/**
 * Generates source code for a shader program that inverts the colors of a texture.
 * @returns {H3DU.ShaderInfo} The resulting shader program.
 * @memberof! H3DU.ShaderInfo
 */
H3DU.ShaderInfo.makeInvertEffect = function() {
  "use strict";
  return H3DU.ShaderInfo.makeEffect(
[
  "vec4 textureEffect(sampler2D sampler, vec2 uvCoord, vec2 textureSize) {",
  " vec4 color=texture2D(sampler,uvCoord);",
  " vec4 ret; ret.xyz=vec3(1.0,1.0,1.0)-color.xyz; ret.w=color.w; return ret;",
  "}"].join("\n"));
};
/**
 * Generates source code for a shader program that generates a two-color texture showing
 * the source texture's edges.
 * @returns {H3DU.ShaderInfo} The resulting shader program.
 * @memberof! H3DU.ShaderInfo
 */
H3DU.ShaderInfo.makeEdgeDetectEffect = function() {
  "use strict";
// Adapted by Peter O. from David C. Bishop's EdgeDetect.frag,
// in the public domain

  return H3DU.ShaderInfo.makeEffect(
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

/**
 * Gets the text of a basic vertex shader.
 * @returns {String} The resulting shader text.
 * @memberof! H3DU.ShaderInfo
 */
H3DU.ShaderInfo.getBasicVertex = function() {
  "use strict";
  var shader = [
    "attribute vec3 position;\n",
    "attribute vec2 uv;\n",
    "varying vec2 uvVar;\n",
    "#ifdef COLORATTR\n",
    "attribute vec3 colorAttr;\n",
    "varying vec3 colorAttrVar;\n",
    "#endif\n",
    "void main() {\n",
    "vec4 positionVec4;\n",
    "positionVec4.w=1.0;\n",
    "positionVec4.xyz=position;\n",
    "gl_PointSize=1.0;\n",
    "uvVar=uv;\n",
    "#ifdef COLORATTR\n",
    "colorAttrVar=colorAttr;\n",
    "#endif\n",
    "gl_Position=positionVec4;\n",
    "}\n"].join("\n");
  return shader;
};
/**
 * Gets the text of the default vertex shader.  Putting "#define SHADING\n"
 * at the start of the return value enables the lighting model.
 * @returns {String} The resulting shader text.
 * @memberof! H3DU.ShaderInfo
 */
H3DU.ShaderInfo.getDefaultVertex = function() {
  "use strict";
  var shader = [
    "attribute vec3 position;",
    "attribute vec3 normal;",
    "attribute vec2 uv;",
    "#ifdef COLORATTR",
    "attribute vec3 colorAttr;",
    "varying vec3 colorAttrVar;",
    "#endif",
    "attribute vec3 tangent;",
    "attribute vec3 bitangent;",
    "uniform mat4 projection;",
    "uniform mat4 modelViewMatrix;",
    "#ifdef SHADING",
    "uniform mat3 normalMatrix; /* internal */",
    "uniform mat4 world;",
    "#ifdef NORMAL_MAP",
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
 * Gets the text of the default fragment shader.
 * @returns {String} The resulting shader text.
 * @memberof! H3DU.ShaderInfo
 */
H3DU.ShaderInfo.getDefaultFragment = function() {
  "use strict";
  var i;
  var shader = H3DU.ShaderInfo.fragmentShaderHeader() + [
    "#define ONE_DIV_PI 0.318309886",
    "#define ONE_DIV_TWOPI 0.159154943",
    "#define PI 3.141592654",
    "#define TWOPI 6.283185307",
    // Clamp to range [0, 1]
    "#define saturate(f) clamp(f, 0.0, 1.0)",
    // Convert from sRGB to linear RGB
    "vec3 tolinear(vec3 c) {",
    " c=saturate(c);",
    " bvec3 lt=lessThanEqual(c,vec3(0.03928));",
    " return mix(pow((0.0556+c)*0.947328534,vec3(2.4)),0.077399381*c,vec3(lt));",
    "}",
    // Convert from linear RGB to sRGB
    "vec3 fromlinear(vec3 c) {",
    " c=saturate(c);",
    " bvec3 lt=lessThanEqual(c,vec3(0.00304));",
    " return mix(pow(c,vec3(0.41666666667))*1.0556-0.0556,12.92*c,vec3(lt));",
    "}",
 // if shading is disabled, this is solid color instead of material diffuse
    "uniform vec4 md;",
    "#ifdef SHADING",
    "struct light {",
// NOTE: These struct members must be aligned to
// vec4 size; otherwise, Chrome may have issues retaining
// the value of lights[i].specular, causing flickering.
// ---
// Source light direction/position, in camera/eye space
    " vec4 position;",
// Source light diffuse color
    " vec4 diffuse;",
// Source light specular color
    "#ifdef SPECULAR", " vec4 specular;", "#endif",
// Light radius
    " vec4 radius;",
    "};",
    "uniform vec3 sceneAmbient;",
    "uniform light lights[" + H3DU.Lights.MAX_LIGHTS + "];",
    "uniform vec3 ma;",
    "uniform vec3 me;",
    "#ifdef METALNESS", "uniform float metalness;", "#endif",
    "#ifdef METALNESS_MAP", "uniform sampler2D metalnessMap;", "#endif",
    "#ifdef ROUGHNESS", "uniform float roughness;", "#endif",
    "#ifdef ROUGHNESS_MAP", "uniform sampler2D roughnessMap;", "#endif",
    "#ifdef SPECULAR_MAP", "uniform sampler2D specularMap;", "#endif",
    "#ifdef ENV_MAP", "uniform samplerCube envMap;", "#endif",
    "#ifdef ENV_EQUIRECT", "uniform sampler2D envMap;", "#endif",
    "#ifdef EMISSION_MAP", "uniform sampler2D emissionMap;", "#endif",
    "uniform mat4 inverseView;",
    "#ifdef NORMAL_MAP", "uniform sampler2D normalMap;", "#endif",
    "#ifdef NORMAL_MAP", "varying mat3 tbnMatrixVar;", "#endif",
    "#ifdef SPECULAR",
    "uniform vec3 ms;",
    "uniform float mshin;",
    "#endif",
    "#endif",
    "#ifdef TEXTURE", "uniform sampler2D sampler;", "#endif",
    "#ifdef COLORATTR", "varying vec3 colorAttrVar;", "#endif",
    "varying vec2 uvVar;",
    "#ifdef SHADING",
    "varying vec4 viewPositionVar;",
    "varying vec3 transformedNormalVar;",
    "vec4 calcLightPower(light lt, vec4 vertexPosition) {",
    " vec3 sdir;",
    " float attenuation;",
    " if(lt.position.w == 0.0) { /* directional light */",
    "  sdir=normalize((lt.position).xyz);",
    "  attenuation=1.0;",
    " } else { /* point light */",
    "  vec3 vertexToLight=(lt.position-vertexPosition).xyz;",
    "  float dsSquared=dot(vertexToLight,vertexToLight);",
    "  sdir=inversesqrt(dsSquared)*vertexToLight;",
    "  if(lt.radius.x == 0.0) {",
    "    attenuation=1.0;", // Unlimited extent
    "  } else {",
// See page 32-33 of
// <http://www.frostbite.com/wp-content/uploads/2014/11/course_notes_moving_frostbite_to_pbr_v2.pdf>
    "   float radiusPow4=lt.radius.x;", // Radius is light's radius to power of 4
    "   float distPow4=dsSquared*dsSquared;",
    "   float attenDivisor=max(0.0001,dsSquared);",
    "   float cut=saturate(1.0-distPow4/radiusPow4);",
    "   attenuation=(cut*cut)/attenDivisor;",
    "  }",
    " }",
    " return vec4(sdir,attenuation);",
    "}",
    "#endif",
// ////////////
    "#ifdef PHYSICAL_BASED",
     // John Hable's tonemapping function, mentioned at
     // at http://filmicgames.com/archives/75
    "#define HABLE_TONEMAP_WHITE 1.37906425",
    "vec3 tonemapHable(vec3 c) {",
    "  vec3 c2=c*2.0;",
    "  return HABLE_TONEMAP_WHITE*",
    "    (((c2*(0.15*c2+0.05)+0.004)/",
    "     (c2*(0.15*c2+0.5)+0.06))-0.066666);",
    "}",
    // Reflectance function
    "float ndf(float dotnh, float alpha) {",
    " float alphasq=alpha*alpha;",
    " float d=dotnh*dotnh*(alphasq-1.0)+1.0;",
    " return alphasq*ONE_DIV_PI/(d*d);",
    "}",
    "float gsmith(float dotnv, float dotnl, float alpha) {",
    " float a1=(alpha+1.0);",
    " float k=a1*a1*0.125;",
    " float invk=(1.0-k);",
    " return dotnl/(dotnl*invk+k)*dotnv/(dotnv*invk+k);",
    "}",
    "float gsmithindirect(float dotnv, float dotnl, float alpha) {",
    " float k=alpha*alpha*0.5;",
    " float invk=(1.0-k);",
    " return dotnl/(dotnl*invk+k)*dotnv/(dotnv*invk+k);",
    "}",
    "vec3 fresnelschlick(float dothl, vec3 f0) {",
    " float id=1.0-dothl;",
    " float idsq=id*id;",
    " return f0+(vec3(1.0)-f0)*idsq*idsq*id;",
    "}",
    // NOTE: Color and specular parameters are in linear RGB
    "vec3 reflectancespec(vec3 diffuse, vec3 specular, vec3 lightDir, vec3 viewDir, vec3 n, float rough) {",
    " vec3 h=normalize(viewDir+lightDir);",
    " float dotnv=abs(dot(n,viewDir))+0.0001;",
    " float dotnh=saturate(dot(n,h));",
    " float dotnl=saturate(dot(n,lightDir));",
    " float dothl=saturate(dot(h,lightDir));",
    " vec3 ctnum=ndf(dotnh,rough)*gsmith(dotnv,dotnl,rough)*fresnelschlick(dothl,specular);",
    " float ctden=min(dotnl*dotnv,0.0001);",
    " return diffuse*ONE_DIV_PI+ctnum*0.25/ctden;",
    "}",
    "#ifndef SPECULAR",
   // NOTE: Color parameter is in linear RGB
    "vec3 reflectance(vec3 color, vec3 lightDir, vec3 viewDir, vec3 n, float rough, float metal) {",
    " vec3 h=normalize(viewDir+lightDir);",
    " float dothl=saturate(dot(h,lightDir));",
    // 0.04 is a good approximation of F0 reflectivity for most nonmetals (with the exception of gemstones,
    // which can go at least as high as 0.17 for diamond). On the other hand, most metals reflect
    // all the light that passes through them, so their F0 is approximated with the base color (assuming the
    // metallic workflow is used)
    " vec3 refl=mix(vec3(0.04),color,metal);",
    " vec3 fr=fresnelschlick(dothl,refl);",
    " vec3 refr=mix((vec3(1.0)-fr),vec3(0.0),metal);",
    " return reflectancespec(refr*color, refl, lightDir, viewDir, n, rough);",
    "}",
    "#endif",
    "#endif",
// ////////////
    "void main() {",
    " vec3 normal;",
    "#ifdef TEXTURE",
    "   vec4 baseColor=texture2D(sampler,uvVar);",
    "#else",
    "#ifdef COLORATTR",
    "   vec4 baseColor;",
    "   baseColor.w=1.0;",
    "   baseColor.xyz=colorAttrVar;",
    "#else",
    "   vec4 baseColor=md;",
    "#endif",
    "#endif",
    "#ifdef SHADING",
    "#ifdef NORMAL_MAP",
    "normal = normalize(tbnMatrixVar*(2.0*texture2D(normalMap,uvVar).rgb - vec3(1.0)));",
    "#else",
    "normal = normalize(transformedNormalVar);",
    "#endif",
    "vec4 lightPowerVec;",
    "float lightCosine, specular;",
    "vec3 materialAmbient=tolinear(ma);", // ambient
    "vec3 materialDiffuse=tolinear(baseColor.rgb);",
    "vec3 materialEmission;",
    "#ifdef EMISSION_MAP", "materialEmission=texture2D(emissionMap,uvVar).rgb;", "#else",
    " materialEmission=me.rgb;", "#endif",
    " materialEmission=tolinear(materialEmission);",
    "float materialAlpha=baseColor.a;",
    "vec4 tview=inverseView*vec4(0.0,0.0,0.0,1.0)-viewPositionVar;",
    "vec3 viewDirection=normalize(tview.xyz/tview.w);",
    "vec3 environment=vec3(1.0);",
/* LATER: Support environment maps
    "#ifdef ENV_MAP",
    "vec3 eyepos=vec3(inverseView*vec4(viewPositionVar.xyz,1.0));",
    "vec3 refl=reflect(-eyepos,normal);",
    "environment=vec3(textureCube(envMap,vec3(-refl.x,refl.y,refl.z)));",
    "environment=tolinear(environment);",
    "#else", "#ifdef ENV_EQUIRECT",
    "vec3 eyepos=vec3(inverseView*vec4(viewPositionVar.xyz,1.0));",
    "vec3 refl=reflect(-eyepos,normal);",
    "refl.x=-refl.x;",
    "environment=vec3(texture2D(envMap,vec2(",
    "  (atan(refl.x,refl.z)+PI)*ONE_DIV_TWOPI, acos(clamp(-refl.y,-1.0,1.0))*ONE_DIV_PI )));",
    "environment=tolinear(environment);",
    "#endif", "#endif",
*/
    "#ifdef PHYSICAL_BASED",
    "vec3 lightedColor=vec3(0.05)*materialDiffuse;", // ambient
    "#else",
    "vec3 lightedColor=sceneAmbient*materialAmbient;", // ambient
    "#endif",
    "#if defined(SPECULAR) || defined(SPECULAR_MAP)", "vec3 materialSpecular=vec3(0.0);", "#endif",
    "vec3 spectmp, lightFactor;",
    "float rough = 0.0;",
    "float metal = 0.0;",
    // Specular reflection
    "#ifdef SPECULAR", "materialSpecular=tolinear(ms);", "#endif",
    // NOTE: Default shader no longer multiplies specular by the specular texture
    "#ifdef SPECULAR_MAP", "materialSpecular=tolinear(texture2D(specularMap,uvVar).rgb);", "#endif",
    "#ifdef PHYSICAL_BASED",
    "#ifdef ROUGHNESS", "rough=roughness;", "#endif",
// Convert Blinn-Phong shininess to roughness
// See http://simonstechblog.blogspot.ca/2011/12/microfacet-brdf.html
    "#ifndef ROUGHNESS", "#ifdef SPECULAR", "rough=clamp(sqrt(2.0/(2.0+mshin)),0.0,1.0);", "#endif", "#endif",
    "#ifdef ROUGHNESS_MAP", "rough=texture2D(roughnessMap,uvVar).r;", "#endif",
    "#ifdef INVERT_ROUGHNESS", "rough=1.0-rough;", "#endif",
    "#ifdef METALNESS", "metal=metalness;", "#endif",
    "#ifdef METALNESS_MAP", "metal=texture2D(metalnessMap,uvVar).r;", "#endif",
    "#endif", // PHYSICAL_BASED
    ""].join("\n") + "\n";
  for(i = 0; i < H3DU.Lights.MAX_LIGHTS; i++) {
    shader += [
      "lightPowerVec=calcLightPower(lights[" + i + "],viewPositionVar);",
      "lightCosine=saturate(dot(normal,lightPowerVec.xyz));",
// not exactly greater than 0 in order to avoid speckling or
// flickering specular highlights if the surface normal is perpendicular to
// the light's direction vector
      "spectmp = vec3(greaterThan(vec3(lightCosine),vec3(0.0001)));",
      "#ifdef PHYSICAL_BASED",
      "    lightFactor=spectmp*lightCosine*lightPowerVec.w*tolinear(lights[" + i + "].diffuse.xyz);",
      "#ifdef SPECULAR",
      "    lightedColor+=reflectancespec(materialDiffuse,materialSpecular,normalize(lightPowerVec.xyz),",
      "         normalize(viewDirection),normal,rough)*lightFactor;",
      "#else",
      "    lightedColor+=reflectance(materialDiffuse,normalize(lightPowerVec.xyz),",
      "         normalize(viewDirection),normal,rough,metal)*lightFactor;",
      "#endif",
      "#else",
     // Lambert diffusion term
      "    lightedColor+=spectmp*materialDiffuse*lightCosine*lightPowerVec.w*tolinear(lights[" + i + "].diffuse.xyz);",
      "#ifdef SPECULAR",
      "    specular=saturate(dot(normalize(viewDirection+lightPowerVec.xyz),normal));",
      "    specular=pow(specular,mshin);",
     // Blinn-Phong specular term
      "    lightedColor+=spectmp*materialSpecular*specular*lightPowerVec.w*tolinear(lights[" + i + "].specular.xyz);",
      "#endif",
      "#endif",
      ""].join("\n") + "\n";
  }
  shader += [
    " lightedColor+=materialEmission.rgb;",
    // "#ifdef PHYSICAL_BASED"," lightedColor=tonemapHable(lightedColor);","#endif",
    " lightedColor=fromlinear(lightedColor);",
    " baseColor=vec4(lightedColor,materialAlpha);",
    "#endif",
    " gl_FragColor=baseColor;",
    "}"
  ].join("\n") + "\n";
  return shader;
};

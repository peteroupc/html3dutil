/*
 Any copyright to this file is released to the Public Domain.
 http://creativecommons.org/publicdomain/zero/1.0/
 If you like this, you should donate
 to Peter O. (original author of
 the Public Domain HTML 3D Library) at:
 http://peteroupc.github.io/
*/
/* global H3DU */
/**
 * Specifies parameters for geometry materials, which describe the appearance of a
 * 3D object. This includes how an object scatters, reflects, or absorbs light,
 * as well as a texture image to apply on that object's surface.<p>
 * NOTE: The default shader program assumes that all colors and the diffuse texture specified in this object are in
 * the [sRGB color space]{@link H3DU.Math.colorTosRGB}.
 * @class
 * @alias H3DU.Material
 * @param {Array<Number>} [params] An object as described in {@link H3DU.Material#setParams}.
 * <i>Using this parameter as a [color vector or string]{@link H3DU.toGLColor} giving the ambient color is deprecated
 * since version 2.0.</i>
 * @param {Array<Number>} [diffuse] A [color vector or string]{@link H3DU.toGLColor} giving the diffusion color (also called "albedo").
 * <i>This parameter is deprecated.</i>
 * @param {Array<Number>} [specular] A [color vector or string]{@link H3DU.toGLColor} giving the specular highlight reflection.
 * <i>This parameter is deprecated.</i>
 * @param {Array<Number>} [shininess] Specular highlight exponent of this material.
 * <i>This parameter is deprecated.</i>
 * @param {Array<Number>} [emission] A [color vector or string]{@link H3DU.toGLColor} giving the additive color emitted by an object.
 * <i>This parameter is deprecated.</i>
 */
H3DU.Material = function(params, diffuse, specular, shininess, emission) {
  "use strict";
 /** Specular highlight exponent of this material.
  * The greater the number, the more concentrated the specular
  * highlights are (and the smoother the material behaves).
  * The lower the number, the more extended the highlights are (and the rougher the material behaves).
  * Ranges from 0 through 128.
  * @default
  */
  this.shininess = 32;
 /** Ambient color of this material.<p>
  * Ambient color indicates how much an object's color is affected by ambient
  * lights, those that color pixels the same way regardless
  * of direction or distance.
  * Because every part of an object will be shaded the same way by ambient
  * colors, an object with just ambient color will not look much like a 3D object.<p>
  * (Ambient color simulates the effect of light being scattered multiple times
  * from the same surface.)</p>
  * This value is a 3-element array giving the red, green, and blue
  * components of the ambient color; the final ambient color depends
  * on the ambient color of the scene.
  * (0,0,0) means no ambient color,
  * and (1,1,1) means total ambient color.<p>
  * Setting ambient color and diffusion color to the same value usually defines an object's
  * color.<p>
  * @default
  */
  this.ambient = [0.2, 0.2, 0.2];
 /**
  * Diffusion color of this material (also called "albedo").
  * This is the generally perceived color of the material when
  * specular highlights are absent on the material's surface.
  * See also {@link H3DU.PbrMaterial#albedo}; this property corresponds
  * more closely to that in the metallic workflow rather than the specular
  * workflow.
  * @type {Array<Number>}
  * @default
  */
  this.diffuse = [0.8, 0.8, 0.8, 1.0];
 /**
  * Specular highlight reflection of this material.
  * This is usually a shade of gray (all three components are the same),
  * but can be colored if the material represents an uncoated metal of some sort.
  * See also {@link H3DU.PbrMaterial#specular}.
  * NOTE: Before version 2.0, this value's default was (0,0,0).
  * @type {Array<Number>}
  * @default
  */
  this.specular = [0.2, 0.2, 0.2];
 /**
  * Additive color emitted by objects with this material.
  * See {@link H3DU.PbrMaterial#emission}.
  * @type {Array<Number>}
  * @default
  */
  this.emission = [0, 0, 0];
/**
 * Texture for this material. Each color in the texture
 * sets the diffusion (also called "albedo")
 * of each part of the material.
 * @default
 * @type {H3DU.Texture|H3DU.TextureInfo}
 */
  this.texture = null;
/**
 * Specular map texture.
 * See {@link H3DU.PbrMaterial#specularMap}.
 * @type {H3DU.Texture|H3DU.TextureInfo}
 * @default
 */
  this.specularMap = null;
 /**
  * Normal map (bump map) texture. See {@link H3DU.PbrMaterial#normalMap}.
  * @type {H3DU.Texture|H3DU.TextureInfo}
  * @default
  */
  this.normalMap = null;
 /**
  * Emission map texture.
  * @type {H3DU.Texture|H3DU.TextureInfo}
  * @default
  */
  this.emissionMap = null;
 /**
  * Shader program to use when rendering objects with this material.
  * @default
  */
  this.shader = null;
  if(params && (params.constructor === Array || typeof params === "string")) {
    this.setParams({
      "ambient":params,
      "diffuse":diffuse,
      "specular":specular,
      "shininess":shininess,
      "emission":emission
    });
  } else if(typeof params !== "undefined" && params !== null) {
    this.setParams(params);
  }
};
/**
 * Clones this object's parameters to a new H3DU.Material
 * object and returns that object. The material's texture
 * maps and shader info, if any, won't be cloned, but rather, a reference
 * to the same object will be used.
 * @returns {H3DU.Material} A copy of this object.
 * @memberof! H3DU.Material#
 */
H3DU.Material.prototype.copy = function() {
  "use strict";
  return new H3DU.Material().setParams({
    "ambient":this.ambient,
    "diffuse":this.diffuse,
    "specular":this.specular,
    "shininess":this.shininess,
    "emission":this.emission,
    "texture":this.texture,
    "specularMap":this.specularMap,
    "normalMap":this.normalMap,
    "shader":this.shader
  });
};
/**
 * Creates a material with its emission color set to the given color.
 * The effect will be that objects with that material will be drawn in that
 * color without shading.
 * @returns {H3DU.Material} A new material with the given emission color.
 * @memberof! H3DU.Material#
 */
H3DU.Material.fromBasic = function(color) {
  "use strict";
  return new H3DU.Material({
    "shininess":1.0,
    "specular":[0, 0, 0],
    "diffuse":[0, 0, 0],
    "ambient":[0, 0, 0],
    "texture":null,
    "specularMap":null,
    "normalMap":null,
    "emission":color,
    "emissionMap":null
  });
};
/**
 * Creates a material with its emission texture set to the given texture.
 * The effect will be that objects with that material will be drawn in that
 * texture without shading.
 * @returns {H3DU.Material} A new material with the given emission texture.
 * @memberof! H3DU.Material#
 */
H3DU.Material.fromBasicTexture = function(texture) {
  "use strict";
  return new H3DU.Material({
    "shininess":1.0,
    "specular":[0, 0, 0],
    "diffuse":[0, 0, 0],
    "ambient":[0, 0, 0],
    "texture":null,
    "specularMap":null,
    "normalMap":null,
    "emission":[0, 0, 0],
    "emissionMap":texture
  });
};

/**
 * Sets parameters for this material object.
 * @param {Object} params An object whose keys have
 * the possibilities given below, and whose values are those
 * allowed for each key.<ul>
 * <li><code>ambient</code> - A [color vector or string]{@link H3DU.toGLColor} giving the ambient color. (See {@link H3DU.Material#ambient}.)
 * The default is (0.2, 0.2, 0.2).
 * <li><code>diffuse</code> - A [color vector or string]{@link H3DU.toGLColor} giving
 * the diffusion color (also called "albedo"). (See {@link H3DU.Material#diffuse}.) The default is (0.8, 0.8, 0.8).
 * <li><code>specular</code> - A [color vector or string]{@link H3DU.toGLColor} giving
 * the specular reflection. (See {@link H3DU.Material#specular}.) The default is (0,0,0), meaning no specular highlights.
 * <li><code>shininess</code> - Specular reflection exponent. (See {@link H3DU.Material#shininess}).
 * Ranges from 0 through 128. The default is 0.
 * <li><code>emission</code> - A [color vector or string]{@link H3DU.toGLColor} giving
 * the additive color. (See {@link H3DU.Material#emission}.) If this is an array, its numbers can
 * range from -1 to 1. The default is (0,0,0).
 * <li><code>texture</code> - {@link H3DU.Texture} object, {@link H3DU.TextureInfo} object, or a string with the URL of the texture
 * to use. Can be null.
 * <li><code>specularMap</code> - Specular map texture, taking the same types as the "texture" parameter (see {@link H3DU.Material#specularMap}). Can be null.
 * <li><code>normalMap</code> - Normal map texture, taking the same types as the "texture" parameter (see {@link H3DU.Material#normalMap}). Can be null.
 * <li><code>emissionMap</code> - Emission map texture, taking the same types as the "texture" parameter (see {@link H3DU.Material#emissionMap}). Can be null.
 * <li><code>shader</code> - {@link H3DU.ShaderInfo} object for a WebGL shader program
 * to use when rendering objects with this material. <i>Using {@link H3DU.ShaderProgram} objects in
 * this parameter is deprecated.</i>
 * </ul>
 * Any or all of these keys can exist in the parameters object. If a value is null or undefined, it is ignored
 * unless otherwise noted.
 * @returns {H3DU.Material} This object.
 * @memberof! H3DU.Material#
 */
H3DU.Material.prototype.setParams = function(params) {
  "use strict";
  if(typeof params.ambient !== "undefined" && params.ambient !== null) {
    this.ambient = H3DU.toGLColor(params.ambient);
    if(this.ambient.length > 3)this.ambient = this.ambient.slice(0, 3);
  }
  if(typeof params.diffuse !== "undefined" && params.diffuse !== null) {
    this.diffuse = H3DU.toGLColor(params.diffuse);
    if(this.diffuse.length > 4)this.diffuse = this.diffuse.slice(0, 4);
  }
  if(typeof params.specular !== "undefined" && params.specular !== null) {
    this.specular = H3DU.toGLColor(params.specular);
    if(this.specular.length > 3)this.specular = this.specular.slice(0, 3);
  }
  if(typeof params.emission !== "undefined" && params.emission !== null) {
    this.emission = H3DU.toGLColor(params.emission);
    if(this.emission.length > 3)this.emission = this.emission.slice(0, 3);
  }
  if(typeof params.shininess !== "undefined" && params.shininess !== null) {
    this.shininess = Math.min(Math.max(0, params.shininess), 128);
  }
  if(typeof params.texture !== "undefined") {
    this.texture = H3DU.TextureInfo._texInfoOrString(params.texture);
  }
  if(typeof params.specularMap !== "undefined") {
    this.specularMap = H3DU.TextureInfo._texInfoOrString(params.specularMap);
  }
  if(typeof params.normalMap !== "undefined") {
    this.normalMap = H3DU.TextureInfo._texInfoOrString(params.normalMap);
  }
  if(typeof params.emissionMap !== "undefined") {
    this.emissionMap = H3DU.TextureInfo._texInfoOrString(params.emissionMap);
  }
  if(typeof params.shader !== "undefined" && params.shader !== null) {
    this.shader = params.shader;
  }
  return this;
};
/** Convenience method that returns an {@link H3DU.Material}
 * object from an RGBA color.
 * @param {Array<Number>|number|string} r A [color vector or string]{@link H3DU.toGLColor},
 * or the red color component (0-1).
 * @param {Number} g Green color component (0-1).
 * May be null or omitted if a string or array is given as the "r" parameter.
 * @param {Number} b Blue color component (0-1).
 * May be null or omitted if a string or array is given as the "r" parameter.
 * @param {Number} [a] Alpha color component (0-1).
 * If the "r" parameter is given and this parameter is null or omitted,
 * this value is treated as 1.0.
 * @returns {H3DU.Material} The resulting material object.
 * @memberof! H3DU.Material
 */
H3DU.Material.fromColor = function(r, g, b, a) {
  "use strict";
  var color = H3DU.toGLColor(r, g, b, a);
  return new H3DU.Material(color, color);
};

/** Convenience method that returns an {@link H3DU.Material}
 * object from a texture to apply to a 3D object's surface.
 * @param {H3DU.Texture|H3DU.TextureInfo|string} texture An {@link H3DU.Texture} object,
 * an {@link H3DU.TextureInfo} object, or a string with the
 * URL of the texture data. In the case of a string the texture will be loaded via
 * the JavaScript DOM's Image class. However, this method
 * will not load that image yet.
 * @returns {H3DU.Material} The resulting material object.
 * @memberof! H3DU.Material
 */
H3DU.Material.fromTexture = function(texture) {
  "use strict";
  return new H3DU.Material({"texture":texture});
};

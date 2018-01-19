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
 * 3D object. This includes how an object scatters or reflects light,
 * as well as a texture image to apply on that object's surface.<p>
 * NOTE: The default shader program assumes that all colors and the diffuse texture specified in this object are in
 * [companded sRGB]{@link H3DU.Math.colorTosRGB}.
 * @constructor
 * @memberof H3DU
 * @param {Array<number>} [params] An object as described in {@link H3DU.Material#setParams}.
 * <i>Using this parameter as a [color vector or string]{@link H3DU.toGLColor} giving the ambient color is deprecated
 * since version 2.0.</i>
 * @param {Array<number>} [diffuse] A [color vector or string]{@link H3DU.toGLColor} giving the diffusion color (also called "albedo").
 * <i>This parameter is deprecated.</i>
 * @param {Array<number>} [specular] A [color vector or string]{@link H3DU.toGLColor} giving the specular highlight reflection.
 * <i>This parameter is deprecated.</i>
 * @param {Array<number>} [shininess] Specular highlight exponent of this material.
 * <i>This parameter is deprecated.</i>
 * @param {Array<number>} [emission] A [color vector or string]{@link H3DU.toGLColor} giving the additive color emitted by an object.
 * <i>This parameter is deprecated.</i>
 */
function Material(params, diffuse, specular, shininess, emission) {
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
   * @type {Array<number>}
   * @default
   */
  this.diffuse = [1.0, 1.0, 1.0, 1.0];
  /**
   * Specular highlight reflection of this material.
   * This is usually a shade of gray (all three components are the same),
   * but can be colored if the material represents an uncoated metal of some sort.
   * See also {@link H3DU.PbrMaterial#specular}.
   * NOTE: Before version 2.0, this value's default was (0,0,0).
   * @type {Array<number>}
   * @default
   */
  this.specular = [0.2, 0.2, 0.2];
  /**
   * Additive color emitted by objects with this material.
   * See {@link H3DU.PbrMaterial#emission}.
   * @type {Array<number>}
   * @default
   */
  this.emission = [0, 0, 0]; // NOTE: Should use only 3-component emissions
  /**
   * Texture for this material. Each color in the texture
   * sets the diffusion (also called "albedo")
   * of each part of the material.
   * @default
   * @type {H3DU.Texture|H3DU.TextureInfo|H3DU.FrameBufferInfo}
   */
  this.texture = null;
  /**
   * Specular map texture.
   * See {@link H3DU.PbrMaterial#specularMap}.
   * NOTE: If this property specifies a texture, this property will be used
   * for the specular reflection rather than the "specular" property. This behavior
   * is a change from versions earlier than 2.0, where this property, if present,
   * multiplied the value of the "specular" property.
   * @type {H3DU.Texture|H3DU.TextureInfo|H3DU.FrameBufferInfo}
   * @default
   */
  this.specularMap = null;
  /**
   * Normal map (bump map) texture. See {@link H3DU.PbrMaterial#normalMap}.
   * @type {H3DU.Texture|H3DU.TextureInfo|H3DU.FrameBufferInfo}
   * @default
   */
  this.normalMap = null;
  /**
   * Emission map texture. See {@link H3DU.PbrMaterial#emissionMap}.
   * @type {H3DU.Texture|H3DU.TextureInfo|H3DU.FrameBufferInfo}
   * @default
   */
  this.emissionMap = null;// NOTE: Should use only 3-component emissions
  /**
   * Ambient occlusion map texture.
   * See {@link H3DU.PbrMaterial#occlusionMap}.
   * @type {H3DU.Texture|H3DU.TextureInfo|H3DU.FrameBufferInfo}
   * @default
   */
  this.occlusionMap = null;
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
}
/**
 * Clones this object's parameters to a new H3DU.Material
 * object and returns that object. The material's texture
 * maps and shader info, if any, won't be cloned, but rather, a reference
 * to the same object will be used.
 * @returns {H3DU.Material} A copy of this object.
 */
Material.prototype.copy = function() {
  return new H3DU.Material().setParams({
    "ambient":this.ambient,
    "diffuse":this.diffuse,
    "specular":this.specular,
    "shininess":this.shininess,
    "emission":this.emission,
    "texture":this.texture,
    "specularMap":this.specularMap,
    "normalMap":this.normalMap,
    "emissionMap":this.emissionMap,
    "occlusionMap":this.occlusionMap,
    "shader":this.shader
  });
};
/**
 * Creates a material with its emission color set to the given color.
 * The effect will be that objects with that material will be drawn in that
 * color without shading.
 * @returns {H3DU.Material} A new material with the given emission color.
 */
Material.fromBasic = function(color) {
  return new H3DU.Material({
    "shininess":1.0,
    "specular":[0, 0, 0],
    "diffuse":[0, 0, 0],
    "ambient":[0, 0, 0],
    "texture":null,
    "specularMap":null,
    "normalMap":null,
    "emission":color,
    "emissionMap":null,
    "occlusionMap":null
  });
};
/**
 * Creates a material with its emission texture set to the given texture.
 * The effect will be that objects with that material will be drawn in that
 * texture without shading.
 * @returns {H3DU.Material} A new material with the given emission texture.
 */
Material.fromBasicTexture = function(texture) {
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
 * <li><code>texture</code> - {@link H3DU.Texture} object, {@link H3DU.TextureInfo} object, {@link H3DU.FrameBufferInfo} object, ora string with the URL of the texture
 * to use. Can be null.
 * <li><code>specularMap</code> - Specular map texture, taking the same types as the "texture" parameter (see {@link H3DU.Material#specularMap}). Can be null.
 * <li><code>normalMap</code> - Normal map texture, taking the same types as the "texture" parameter (see {@link H3DU.Material#normalMap}). Can be null.
 * <li><code>occlusionMap</code> - Ambient occlusion map texture, taking the same types as the "texture" parameter (see {@link H3DU.Material#occlusionMap}). Can be null.
 * <li><code>emissionMap</code> - Emission map texture, taking the same types as the "texture" parameter (see {@link H3DU.Material#emissionMap}). Can be null.
 * <li><code>shader</code> - {@link H3DU.ShaderInfo} object for a WebGL shader program
 * to use when rendering objects with this material. <i>Using {@link H3DU.ShaderProgram} objects in
 * this parameter is deprecated.</i>
 * </ul>
 * Any or all of these keys can exist in the parameters object. If a value is null or undefined, it is ignored
 * unless otherwise noted.
 * @returns {H3DU.Material} This object.
 */
Material.prototype.setParams = function(params) {
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
  if(typeof params.occlusionMap !== "undefined") {
    this.specularMap = H3DU.TextureInfo._texInfoOrString(params.occlusionMap);
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
 * @param {Array<number>|number|string} r A [color vector or string]{@link H3DU.toGLColor},
 * or the red color component (0-1).
 * @param {number} g Green color component (0-1).
 * May be null or omitted if a string or array is given as the "r" parameter.
 * @param {number} b Blue color component (0-1).
 * May be null or omitted if a string or array is given as the "r" parameter.
 * @param {number} [a] Alpha color component (0-1).
 * If the "r" parameter is given and this parameter is null, undefined, or omitted,
 * this value is treated as 1.0.
 * @returns {H3DU.Material} The resulting material object.
 */
Material.fromColor = function(r, g, b, a) {
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
 */
Material.fromTexture = function(texture) {
  return new H3DU.Material({"texture":texture});
};

export {Material};

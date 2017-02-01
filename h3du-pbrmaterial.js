/* global H3DU */
/*
 Any copyright to this file is released to the Public Domain.
 http://creativecommons.org/publicdomain/zero/1.0/
 If you like this, you should donate
 to Peter O. (original author of
 the Public Domain HTML 3D Library) at:
 http://peteroupc.github.io/
*/
/**
 * A material for physically-based rendering. Specifies parameters for geometry materials,
 * which describe the appearance of a 3D object. This includes how an object
 * scatters, reflects, or absorbs light.<p>
 * NOTE: The default shader program assumes that all colors, as well as the albedo and
 * specular map, specified in this object are in
 * the [sRGB color space]{@link H3DU.Math.colorTosRGB}.
 * @param {Object} [params] An object described in {@link H3DU.PbrMaterial.setParams}.
 * @class
 * @alias H3DU.PbrMaterial
 */
H3DU.PbrMaterial = function(params) {
  "use strict";
/**
 * Albedo (or base color) of this material.<p>
 * This value is a 3- or 4-element array giving the red, green, blue, and
 * alpha components of the albedo (in the [sRGB color space]{@link H3DU.Math.colorTosRGB}). (0,0,0,1) means an
 * albedo value of black, and (1,1,1,1) means an albedo value of white.<p>
 * In the <b>metallic workflow</b>, this color specifies the amount
 * of light that is reflected by this material's surface. For both metals and nonmetals, this color
 * is the generally observed color of the surface. <p>
 * In the <b>specular workflow</b>, this color specifies the amount
 * of light that passes through the material and bounces back (<i>diffuse</i> color). For most nonmetals, this color
 * is the generally observed color of the surface, though somewhat desaturated. Most metals absorb
 * all the light that passes through them,
 * so for most metals, this color should generally be black or a very
 * dark shade of gray. (In physically-based rendering, the sum of albedo and specular
 * colors should not exceed 1.0 in each [linear RGB]{@link H3DU.Math.colorToLinear} channel.)<p>
 * In <b>both workflows</b> in physically-based rendering, the albedo
 * color should not have any added lighting.<p>
 * This value can have an optional fourth element giving the alpha component
 * (0-1). If this element is omitted, the default is 1.<p>
 * In the default shader program, if a mesh defines its own colors, those
 * colors are used rather than this property to set the color defined here.<p>
 * @type {Array<Number>}
 * @default
 */
  this.albedo = [0.8, 0.8, 0.8, 1.0];
  /**
   * A texture indicating the albedo (or base color) of each part of the texture,
   * in the red, green, blue, and alpha channels. In physically-based rendering, the albedo
   * texture should not have any added lighting or shadow detail.
   * @type {H3DU.Texture|H3DU.TextureInfo}
   * @default
   */
  this.albedoMap = null;
  /**
   * A value indicating whether objects described by this material are metals.
   * This value ranges from 0 through 1. If 0, the surface is a nonmetal; if 1,
   * the surface is a metal. Values in between
   * 0 and 1 are rather rare and generally appear in transitions between metals and nonmetals.
   * This value is only used in the <b>metallic workflow</b>.
   * @type {Number}
   * @default
   */
  this.metalness = 0;
  /**
   * A texture indicating the metalness of each part of the texture,
   * as specified in the texture's red channel.
   * Each pixel value in the red channel (which ranges from 0-255 in most image
   * formats) is scaled to the range [0, 1].<p>
   * This value is only used in the <b>metallic workflow</b>.
   * Any texture used for this map should not be in JPEG format or any other
   * format that uses lossy compression, as compression artifacts can result in inaccurate
   * metalness values in certain areas.
   * @type {H3DU.Texture|H3DU.TextureInfo}
   * @default
   */
  this.metalnessMap = null;
  /**
   * Describes the roughness of the surface described
   * by this material. The inverse of roughness is <i>glossiness</i> or <i>smoothness</i>,
   * which equals 1 minus roughness. To make this property equivalent to glossiness
   * or smoothness, set the <code>invertRoughness</code> property to <code>true</code>.
   * @type {Number}
   * @default
   */
  this.roughness = 0.35;
  /**
   * A texture indicating the roughness of each part of the texture,
   * as specified in the texture's red channel.
   * Each pixel value in the red channel (which ranges from 0-255 in most image
   * formats) is scaled to the range [0, 1].<p>
   * The inverse of roughness is <i>glossiness</i> or <i>smoothness</i>;
   * to treat the texture as a glossiness or smoothness map, set the
   * <code>invertRoughness</code> property to <code>true</code>.
   * Any texture used for this map should not be in JPEG format or any other
   * format that uses lossy compression, as compression artifacts can result in inaccurate
   * roughness values in certain areas.
   * @type {H3DU.Texture|H3DU.TextureInfo}
   * @default
   */
  this.roughnessMap = null;
 /**
  * Specular reflectivity of this material.
  * Specular reflection is a reflection in the opposite direction from the direction
  * the light reaches the material in, similar to a mirror. As a result, depending
  * on the viewing angle, specular reflection can give off
  * shiny highlights on the material.<p>
  * This value is a 3-element array giving the red, green, and blue
  * components of the surface's base reflectivity when looking directly at the surface
  * (base reflectivity at 0 degree incidence, or F<sub>0</sub>).
  * For most nonmetals, this is a shade of gray ranging from
  * (0.15, 0.15, 0.15) to (0.32, 0.32, 0.32) in sRGB. For most metals,
  * this is a very bright version of the surface's color.<p>
  * This value is only used in the <b>specular workflow</b>.
  * @type {Array<Number>}
  * @default
  */
  this.specular = [0.2, 0.2, 0.2];
  /**
   * A texture where each pixel identifies the "specular" property of that
   * part of the texture, as specified in the texture's red, green, and blue channels
   * (in the [sRGB color space]{@link H3DU.Math.colorTosRGB}).<p>
   * This value is only used in the <b>specular workflow</b>.<p>
   * Any texture used for this map should not be in JPEG format or any other
   * format that uses lossy compression, as compression artifacts can result in inaccurate
   * specular factors in certain areas.
   * @type {H3DU.Texture|H3DU.TextureInfo}
   * @default
   */
  this.specularMap = null;
/**
 * Specifies which workflow to use when interpreting values for this
 * material. <p>
 * The <b>metallic workflow</b> (<code>H3DU.PbrMaterial.Metallic</code>, the default)
 * is usually easier to understand and uses <code>albedo</code> to set the
 * surface's color and <code>metalness</code> to set whether the surface
 * is a metal or not.<p>
 * The <b>specular workflow</b> (<code>H3DU.PbrMaterial.Specular</code>)
 * uses <code>albedo</code> to set the
 * surface's color for nonmetals and <code>specular</code> to set the
 * surface's specular reflectivity.
 * @type {Number}
 * @default
 */
  this.workflow = H3DU.PbrMaterial.Metallic;
 /**
  * Normal map (bump map) texture. Normal maps are used either to add
  * a sense of roughness to an otherwise flat surface or to give an object a highly-detailed
  * appearance with fewer polygons.<p>
  * In a normal map texture, each pixel is a vector in which
  * each component (which usually ranges from 0-255 in most image formats) is scaled to
  * the range [-1, 1], where:
  * <ul>
  * <li>The pixel's red component is the vector's X component.
  * <li>The pixel's green component is the vector's Y component.
  * <li>The pixel's blue component is the vector's Z component.
  * <li>An unchanged normal vector will have the value (0, 0, 1), which is usually
  * the value (127, 127, 255) in most image formats.
  * <li>The vector is normalized so its length is about equal to 1.
  * <li>The vector is expressed in tangent space, where the Z axis points outward
  * and away from the surface's edges.
  * </ul>
  * Each pixel indicates a tilt from the vector (0, 0, 1), or positive Z axis,
  * to the vector given in that pixel. This tilt adjusts the normals used for the
  * purpose of calculating lighting effects at that part of the surface.
  * A strong tilt indicates strong relief detail at that point.<p>
  * Any texture used for normal maps should not be in JPEG format or any other
  * format that uses lossy compression, as compression artifacts can result in inaccurate
  * normals in certain areas.
  * <p>
  * For normal mapping to work, an object's mesh must include normals,
  * tangents, bitangents, and texture coordinates, though if a <code>H3DU.Mesh</code>
  * object only has normals and texture coordinates, the <code>recalcTangents()</code>
  * method can calculate the tangents and bitangents appropriate for normal mapping.
  * @type {H3DU.Texture|H3DU.TextureInfo}
  * @default
  */
  this.normalMap = null;
  /**
   * TODO
   * @type {H3DU.Texture|H3DU.TextureInfo}
   * @default
   */
  this.occlusionMap = null;
 /**
  * Additive color emitted by objects with this material.
  * Used for objects that glow on their own, among other things.
  * This additive color is unaffected by lighting or shading.<p>
  * This value is a 3-element array giving the red, green, and blue
  * components.
  * For each of the three color components, positive values add to that component,
  * while negative values subtract from it. (0,0,0), the default, means no additive color.
  * @type {Array<Number>}
  * @default
  */
  this.emission = [0, 0, 0];
 /**
  * Shader program to use when rendering objects with this material.
  * @default
  */
  this.shader = null;
  /**
   * TODO
   * @default
   */
  this.invertRoughness = false;
  /**
   * TODO
   * @default
   */
  this.environmentMap = null; // TODO: Store environment maps in H3DU.Lights, not here
  if(params !== null && typeof params !== "undefined") {
    this.setParams(params);
  }
};
H3DU.PbrMaterial.Specular = 0;
H3DU.PbrMaterial.Metallic = 1;
/**
 * Sets parameters for this material object.
 * @param {Object} params An object whose keys have
 * the possibilities given below, and whose values are those
 * allowed for each key.<ul>
 * <li><code>workflow</code> - Either {@link H3DU.PbrMaterial.Specular} or {@link H3DU.PbrMaterial.Metalness}
 * <li><code>invertRoughness</code> - TODO.
 * <li><code>environmentMap</code> - {@link H3DU.CubeMap} object of an environment
 * map texture (see {@link H3DU.PbrMaterial#environmentMap}).
 * <li><code>diffuse</code> or <code>albedo</code> - A [color vector or string]{@link H3DU.toGLColor} giving
 * the diffusion color (also called "albedo"). (See {@link H3DU.PbrMaterial#diffuse}.) The default is (0.8, 0.8, 0.8).
 * <li><code>specular</code> - A [color vector or string]{@link H3DU.toGLColor} giving
 * the specular reflection. (See {@link H3DU.PbrMaterial#specular}.) The default is (0,0,0), meaning no specular highlights.
 * <li><code>roughness</code> - Roughness.
 * <li><code>emission</code> - A [color vector or string]{@link H3DU.toGLColor} giving
 * the additive color. (See {@link H3DU.PbrMaterial#emission}.) If this is an array, its numbers can
 * range from -1 to 1. The default is (0,0,0).
 * <li><code>texture</code> or <code>albedoMap</code> - {@link H3DU.Texture} object, {@link H3DU.TextureInfo} object, or a string with the URL of the texture
 * to use.
 * <li><code>specularMap</code> - Specular
 * map texture, taking the same types as for "albedoMap" (see {@link H3DU.PbrMaterial#specularMap}).
 * <li><code>normalMap</code> - Normal
 * map (bump map) texture, taking the same types as for "albedoMap" (see {@link H3DU.PbrMaterial#normalMap}).
 * <li><code>metalnessMap</code> - Metalness texture, taking the same types as for "albedoMap" (see {@link H3DU.PbrMaterial#metalnessMap}).
 * <li><code>roughnessMap</code> - Roughness texture, taking the same types as for "albedoMap" (see {@link H3DU.PbrMaterial#roughnessMap}).
 * <li><code>shader</code> - {@link H3DU.ShaderInfo} object for a WebGL shader program
 * to use when rendering objects with this material.
 * </ul>
 * Any or all of these keys can exist in the parameters object. If a value is null or undefined, it is ignored.
 * @returns {H3DU.PbrMaterial} This object.
 * @memberof! H3DU.PbrMaterial#
 */
H3DU.PbrMaterial.prototype.setParams = function(params) {
  "use strict";
  if(typeof params.diffuse !== "undefined" && params.diffuse !== null) {
    this.albedo = H3DU.toGLColor(params.diffuse);
    if(this.albedo.length > 4)this.albedo = this.diffuse.slice(0, 4);
  }
  if(typeof params.albedo !== "undefined" && params.albedo !== null) {
    this.albedo = H3DU.toGLColor(params.albedo);
    if(this.albedo.length > 4)this.albedo = this.albedo.slice(0, 4);
  }
  if(typeof params.specular !== "undefined" && params.specular !== null) {
    this.specular = H3DU.toGLColor(params.specular);
    if(this.specular.length > 3)this.specular = this.specular.slice(0, 3);
  }
  if(typeof params.emission !== "undefined" && params.emission !== null) {
    this.emission = H3DU.toGLColor(params.emission);
    if(this.emission.length > 3)this.emission = this.emission.slice(0, 3);
  }
  if(typeof params.texture !== "undefined" && params.texture !== null) {
    this.albedoMap = H3DU.TextureInfo._texInfoOrString(params.texture);
  }
  if(typeof params.albedoMap !== "undefined" && params.albedoMap !== null) {
    this.albedoMap = H3DU.TextureInfo._texInfoOrString(params.albedoMap);
  }
  if(typeof params.specularMap !== "undefined" && params.specularMap !== null) {
    this.specularMap = H3DU.TextureInfo._texInfoOrString(params.specularMap);
  }
  if(typeof params.normalMap !== "undefined" && params.normalMap !== null) {
    this.normalMap = H3DU.TextureInfo._texInfoOrString(params.normalMap);
  }
  if(typeof params.metalnessMap !== "undefined" && params.metalnessMap !== null) {
    this.metalnessMap = H3DU.TextureInfo._texInfoOrString(params.metalnessMap);
  }
  if(typeof params.roughnessMap !== "undefined" && params.roughnessMap !== null) {
    this.roughnessMap = H3DU.TextureInfo._texInfoOrString(params.roughnessMap);
  }
  if(typeof params.environmentMap !== "undefined" && params.environmentMap !== null) {
    this.environmentMap = params.environmentMap;
  }
  if(typeof params.metalness !== "undefined" && params.metalness !== null) {
    this.metalness = params.metalness;
  }
  if(typeof params.invertRoughness !== "undefined" && params.invertRoughness !== null) {
    this.invertRoughness = params.invertRoughness;
  }
  if(typeof params.roughness !== "undefined" && params.roughness !== null) {
    this.roughness = params.roughness;
  }
  if(typeof params.shader !== "undefined" && params.shader !== null) {
    this.shader = params.shader;
  }
  return this;
};

/**
 * Clones this object's parameters to a new {@link H3DU.PbrMaterial}
 * object and returns that object. The material's texture
 * maps and shader info, if any, won't be cloned, but rather, a reference
 * to the same object will be used.
 * @returns {H3DU.PbrMaterial} A copy of this object.
 * @memberof! H3DU.PbrMaterial#
 */
H3DU.PbrMaterial.prototype.copy = function() {
  "use strict";
  return new H3DU.PbrMaterial({
    "environmentMap":this.environmentMap,
    "metalness":this.metalness,
    "metalnessMap":this.metalnessMap,
    "roughness":this.roughness,
    "roughnessMap":this.roughnessMap,
    "albedo":this.albedo,
    "invertRoughness":this.invertRoughness,
    "specular":this.specular,
    "emission":this.emission,
    "albedoMap":this.albedoMap,
    "specularMap":this.specularMap,
    "normalMap":this.normalMap,
    "basic":this.basic,
    "shader":this.shader
  });
};

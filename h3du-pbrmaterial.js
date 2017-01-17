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
 * @param {Object} [params] An object described in {@link H3DU.PbrMaterial.setParams}.
 */
H3DU.PbrMaterial = function(params) {
  "use strict";
/**
 * Diffusion color of this material (also called "albedo").
 * This is the color seen when light passes through this material
 * and bounces back; it scatters equally in all directions. Because different parts of an object are shaded
 * more brightly the more directly they face diffuse lights, diffusion can contribute
 * much of the 3D appearance of that object.<p>
 * This value is a 4-element array giving the red, green, blue, and
 * alpha components of the diffusion; the final diffusion color depends
 * on the colors of lights that shine on the material.
 * (0,0,0,1) means no diffusion,
 * and (1,1,1,1) means total diffusion.<p>
 * In physically-based rendering, the diffusion color should be the color of lights
 * absorbed by the surface without regard to the lighting environment.<p>
 * In the <b>specular workflow</b>, this color should generally be black, otherwise
 * a very dark shade of gray, if the object describes a metal.
 * In the <b>metallic workflow</b>, this should be the object's color for metals and nonmetals.<p>
 * In the default shader program, if a mesh defines its own colors, those
 * colors are used for diffusion rather than this property.<p>
 * This value can have an optional fourth element giving the alpha component
 * (0-1). If this element is omitted, the default is 1.<p>
 * @type {Array<Number>}
 * @default
 */
  this.albedo = [0.8, 0.8, 0.8, 1.0];
  /**
   * A texture indicating the diffusion of each part of the texture,
   * in the red, green, blue, and alpha channels.
   * @type {Number}
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
   * This value is only used in the <b>metallic workflow</b>.
   * Any texture used for this map should not be in JPEG format or any other
   * format that uses lossy compression, as compression artifacts can result in inaccurate
   * specular factors in certain areas.
   * @type {Number}
   * @default
   */
  this.metalnessMap = null;
  /**
   * Describes the roughness of the surface described
   * by this material. The inverse of roughness is <i>glossiness</i> or <i>smoothness</i>,
   * which equals 1 minus roughness.
   * @type {Number}
   * @default
   */
  this.roughness = 0.35;
  /**
   * A texture indicating the roughness of each part of the texture,
   * as specified in the texture's red channel.
   * The inverse of roughness is <i>glossiness</i> or <i>smoothness</i>;
   * to convert a texture to a glossiness or smoothness map, invert the roughness
   * map's red channel.
   * Any texture used for this map should not be in JPEG format or any other
   * format that uses lossy compression, as compression artifacts can result in inaccurate
   * specular factors in certain areas.
   * @type {Number}
   * @default
   */
  this.roughnessMap = null;
 /**
  * Specular highlight reflection of this material.
  * Specular reflection is a reflection in the opposite direction from the direction
  * the light reaches the material in, similar to a mirror. As a result, depending
  * on the viewing angle, specular reflection can give off
  * shiny highlights on the material.<p>
  * This value is a 3-element array giving the red, green, and blue
  * components of the specular reflection; the final specular color depends
  * on the specular color of lights that shine on the material.
  * (0,0,0) means no specular reflection and (1,1,1) means total specular reflection,
  * This value is only used in the <b>specular workflow</b>.
  * The specular color is usually a value close to (0.2, 0.2, 0.2),
  * but can be colored if the material represents an uncoated metal of some sort.<p>
  * This value is only used in the specular workflow.
  * @type {Array<Number>}
  * @default
  */
  this.specular = [0.2, 0.2, 0.2];
  /**
   * A texture indicating the specular reflection of each part of the texture,
   * as specified in the texture's red, green, and blue channels.
   * This value is only used in the <b>specular workflow</b>.
   * Any texture used for this map should not be in JPEG format or any other
   * format that uses lossy compression, as compression artifacts can result in inaccurate
   * specular factors in certain areas.
   * @type {Number}
   * @default
   */
  this.specularMap = null;
  /*
     * [TODO: Specular map texture, where each pixel is an additional factor to multiply the specular color by, for
 * each part of the object's surface (note that the material must have a specular color of other
 * than the default black for this to have an effect).<p>
 * The specular map is usually grayscale (all three components are the same in each pixel),
 * but can be colored if the material represents an uncoated metal of some sort (in which case the specular
 * color property should be (1,1,1) or another grayscale color).<p>]
 */
/**
 * TODO
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
  * @default
  */
  this.normalMap = null;
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
  this.environmentMap = null;
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
 * map texture (see {@link H3DU.Material#environmentMap}).
 * <li><code>diffuse</code> or <code>albedo</code> - A [color vector or string]{@link H3DU.toGLColor} giving
 * the diffusion color (also called "albedo"). (See {@link H3DU.Material#diffuse}.) The default is (0.8, 0.8, 0.8).
 * <li><code>specular</code> - A [color vector or string]{@link H3DU.toGLColor} giving
 * the specular reflection. (See {@link H3DU.Material#specular}.) The default is (0,0,0), meaning no specular highlights.
 * <li><code>roughness</code> - Roughness.
 * <li><code>emission</code> - A [color vector or string]{@link H3DU.toGLColor} giving
 * the additive color. (See {@link H3DU.Material#emission}.) If this is an array, its numbers can
 * range from -1 to 1. The default is (0,0,0).
 * <li><code>texture</code> or <code>albedoMap</code> - {@link H3DU.Texture} object, or a string with the URL of the texture
 * to use.
 * <li><code>specularMap</code> - {@link H3DU.Texture} object, or a string with the URL, of a specular
 * map texture (see {@link H3DU.Material#specularMap}).
 * <li><code>normalMap</code> - {@link H3DU.Texture} object, or a string with the URL, of a normal
 * map (bump map) texture (see {@link H3DU.Material#normalMap}).
 * <li><code>metalnessMap</code> - {@link H3DU.Texture} object, or a string with the URL, of a metalness texture (see {@link H3DU.Material#metalnessMap}).
 * <li><code>roughnessMap</code> - {@link H3DU.Texture} object, or a string with the URL, of a roughness texture (see {@link H3DU.Material#roughnessMap}).
 * <li><code>shader</code> - {@link H3DU.ShaderInfo} object for a WebGL shader program
 * to use when rendering objects with this material. <i>Using {@link H3DU.ShaderProgram} objects in
 * this parameter is deprecated.</i>
 * </ul>
 * Any or all of these keys can exist in the parameters object. If a value is null or undefined, it is ignored.
 * @returns {H3DU.Material} This object.
 * @memberof! H3DU.Material#
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
    this.albedoMap = H3DU.Texture._texOrString(params.texture);
  }
  if(typeof params.albedoMap !== "undefined" && params.albedoMap !== null) {
    this.albedoMap = H3DU.Texture._texOrString(params.albedoMap);
  }
  if(typeof params.specularMap !== "undefined" && params.specularMap !== null) {
    this.specularMap = H3DU.Texture._texOrString(params.specularMap);
  }
  if(typeof params.normalMap !== "undefined" && params.normalMap !== null) {
    this.normalMap = H3DU.Texture._texOrString(params.normalMap);
  }
  if(typeof params.metalnessMap !== "undefined" && params.metalnessMap !== null) {
    this.metalnessMap = H3DU.Texture._texOrString(params.metalnessMap);
  }
  if(typeof params.roughnessMap !== "undefined" && params.roughnessMap !== null) {
    this.roughnessMap = H3DU.Texture._texOrString(params.roughnessMap);
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
 * @returns {H3DU.Material} A copy of this object.
 * @memberof! H3DU.Material#
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

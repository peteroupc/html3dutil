/*
Written by Peter O. in 2015.

Any copyright is dedicated to the Public Domain.
http://creativecommons.org/publicdomain/zero/1.0/
If you like this, you should donate to Peter O.
at: http://peteroupc.github.io/
*/
/* global H3DU */
/**
* Specifies parameters for geometry materials, which describe the appearance of a
* 3D object. This includes how an object scatters, reflects, or absorbs light, as well
* as well as a texture image to apply on that object's surface.<p>
* <i>For more information on this constructor's parameters,
* see the {@link H3DU.Material#setParams} method.</i>
* @class
* @alias H3DU.Material
* @param {Array<Number>} [ambient] A [color vector or string]{@link H3DU.toGLColor} giving the ambient color.
* @param {Array<Number>} [diffuse] A [color vector or string]{@link H3DU.toGLColor} giving the diffusion color (also called "albedo").
* @param {Array<Number>} [specular] A [color vector or string]{@link H3DU.toGLColor} giving the specular highlight reflection.
* @param {Array<Number>} [shininess] Specular highlight exponent of this material.
* @param {Array<Number>} [emission] A [color vector or string]{@link H3DU.toGLColor} giving the additive color emitted by an object.
*/
H3DU.Material = function(ambient, diffuse, specular, shininess, emission) {
 // console.log([ambient,diffuse,specular,shininess,emission]+"")
  "use strict";
  if(ambient !== null && typeof ambient !== "undefined")ambient = H3DU.toGLColor(ambient);
  if(diffuse !== null && typeof diffuse !== "undefined")diffuse = H3DU.toGLColor(diffuse);
  if(specular !== null && typeof specular !== "undefined")specular = H3DU.toGLColor(specular);
  if(emission !== null && typeof emission !== "undefined")emission = H3DU.toGLColor(emission);
 /** Specular highlight exponent of this material.
* The greater the number, the more concentrated the specular
* highlights are (and the smoother the material behaves).
* The lower the number, the more extended the highlights are (and the rougher the material behaves).
* Ranges from 0 through 128.
*/
  this.shininess = shininess === null || typeof shininess === "undefined" ? 0 : Math.min(Math.max(0, shininess), 128);
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
*/
  this.ambient = ambient ? ambient.slice(0, 3) : [0.2, 0.2, 0.2];
 /**
 * Diffusion color of this material (also called "albedo"). This is the color seen when light passes through this material
 * and bounces back; it scatters equally in all directions. Because different parts of an object are shaded
 * differently depending
 * on how directly they face diffuse lights, diffusion can contribute
 * much of the 3D appearance of that object.<p>
 * This value is a 4-element array giving the red, green, blue, and
 * alpha components of the diffusion; the final diffusion color depends
 * on the diffusion colors of lights that shine on the material.
 * (0,0,0,1) means no diffusion,
 * and (1,1,1,1) means total diffusion.<p>
 * Setting ambient and diffusion to the same value usually defines an object's
 * color.<p>
 * In the default shader program, if a mesh defines its own colors, those
 * colors are used for diffusion rather than this property.<p>
 * This value can have an optional fourth element giving the alpha component
 * (0-1).  If this element is omitted, the default is 1.<p>
*/
  this.diffuse = diffuse ? diffuse.slice(0, diffuse.length) : [0.8, 0.8, 0.8, 1.0];
 /**
 * Specular highlight reflection of this material.
 * Specular reflection is a reflection in the opposite direction from the direction
 * the light reaches the material in, similar to a mirror.  As a result, depending
 * on the viewing angle, specular reflection can give off
 * shiny highlights on the material.<p>
 * This value is a 3-element array giving the red, green, and blue
 * components of the specular reflection; the final specular color depends
 * on the specular color of lights that shine on the material.
 * (0,0,0) means no specular reflection and (1,1,1) means total specular reflection,
 * The specular color is usually grayscale
 * (all three components are the same), but can be colored if the material represents an
* uncoated metal of some sort. If this element is omitted, the default is (0.1,0.1,0.1).<p>
* NOTE: Before version 2.0, the default was (0,0,0).
*/
  this.specular = specular ? specular.slice(0, 3) : [0.1, 0.1, 0.1];
// NOTE: Setting to (1,1,1) apparently made everything that faced the light white;
// it was much too strong
 /**
* Additive color emitted by objects with this material.
* Used for objects that glow on their own, among other things.
* Each part of the object will be affected by the additive color the
* same way regardless of lighting (this property won't be used in the
* default shader if [H3DU.Scene3D.disableLighting()]{@link H3DU.Scene3D#disableLighting}
* is called, disabling lighting calculations).<p>
* This value is a 3-element array giving the red, green, and blue
* components.
* For each of the three color components, positive values add to that component,
* while negative values subtract from it. (0,0,0), the default, means no additive color.
*/
  this.emission = emission ? emission.slice(0, 3) : [0, 0, 0];
/**
* H3DU.Texture for this material.  Each color in the texture
* sets the diffusion (also called "albedo")
* of each part of the material.
* @default
*/
  this.texture = null;
/**
* Specular map texture, where each pixel is an additional factor to multiply the specular color by, for
* each part of the object's surface (note that the material must have a specular color of other
* than the default black for this to have an effect).<p>
* The specular map is usually grayscale (all three components are the same in each pixel),
* but can be colored if the material represents an uncoated metal of some sort (in which case the specular
* color property should be (1,1,1) or another grayscale color). See {@link H3DU.Material#specular}.<p>
* Any texture used for specular maps should not be in JPEG format or any other
* format that uses lossy compression, as compression artifacts can result in inaccurate
* specular factors in certain areas.
* @default
*/
  this.specularMap = null;
 /**
 * Normal map (bump map) texture.  Normal maps are used either to add
 * a sense of roughness to an otherwise flat surface or to give an object a highly-detailed
 * appearance with fewer polygons.<p>
 * In a normal map texture, each pixel is a vector in which
 each component (which usually ranges from 0-255 in most image formats) is scaled to
 the range [-1, 1], where:
<ul>
<li>The pixel's red component is the vector's X component.
<li>The pixel's green component is the vector's Y component.
<li>The pixel's blue component is the vector's Z component.
<li>An unchanged normal vector will have the value (0, 0, 1), which is usually
the value (127, 127, 255) in most image formats.
<li>The vector is normalized so its length is about equal to 1.
<li>The vector is expressed in tangent space, where the Z axis points outward
and away from the surface's edges.
</ul>
Each pixel indicates a tilt from the vector (0, 0, 1), or positive Z axis,
to the vector given in that pixel.  This tilt adjusts the normals used for the
purpose of calculating lighting effects at that part of the surface.
A strong tilt indicates strong relief detail at that point.<p>
* Any texture used for normal maps should not be in JPEG format or any other
* format that uses lossy compression, as compression artifacts can result in inaccurate
* normals in certain areas.
*<p>
* For normal mapping to work, an object's mesh must include normals,
* tangents, bitangents, and texture coordinates, though if a <code>H3DU.Mesh</code>
* object only has normals and texture coordinates, the <code>recalcTangents()</code>
* method can calculate the tangents and bitangents appropriate for normal mapping.
* @default
*/
  this.normalMap = null;
 /**
 * If true, only the "diffuse" and "texture" properties of this object are used
 * when processing objects that use this material.
* @default
*/
  this.basic = false;
 /**
 * Shader program to use when rendering objects with this material.
 * @default
*/
  this.shader = null;
};
/**
* Clones this object's parameters to a new H3DU.Material
* object and returns that object. The material's texture
* maps and shader program, if any, won't be cloned, but rather, a reference
* to the same object will be used.
* @returns {H3DU.Material} A copy of this object.
* @memberof! H3DU.Material#
*/
H3DU.Material.prototype.copy = function() {
  "use strict";
  return new H3DU.Material(
  this.ambient.slice(0, this.ambient.length),
  this.diffuse.slice(0, this.diffuse.length),
  this.specular.slice(0, this.specular.length),
  this.shininess,
  this.emission.slice(0, this.emission.length)
 ).setParams({
   "texture":this.texture,
   "specularMap":this.specularMap,
   "normalMap":this.normalMap,
   "basic":this.basic,
   "shader":this.shader
 });
};
/**
* Sets parameters for this material object.
* @param {Object} params An object whose keys have
* the possibilities given below, and whose values are those
* allowed for each key.<ul>
* <li><code>basic</code> - If set to true, only the "diffuse" and "texture" properties
* of this material are used, and the object with this material will be drawn without
* regard to lighting.
* <li><code>ambient</code> - A [color vector or string]{@link H3DU.toGLColor} giving the ambient color. (See {@link H3DU.Material#ambient}.)
* The default is (0.2, 0.2, 0.2).
* <li><code>diffuse</code> - A [color vector or string]{@link H3DU.toGLColor} giving
* the diffusion color (also called "albedo"). (See {@link H3DU.Material#diffuse}.) The default is (0.8, 0.8, 0.8).
* <li><code>specular</code> - A [color vector or string]{@link H3DU.toGLColor} giving
* the specular reflection.  (See {@link H3DU.Material#specular}.) The default is (0,0,0), meaning no specular highlights.
* <li><code>shininess</code> - Specular reflection exponent.  (See {@link H3DU.Material#shininess}).
* Ranges from 0 through 128. The default is 0.
* <li><code>emission</code> - A [color vector or string]{@link H3DU.toGLColor} giving
* the additive color.  (See {@link H3DU.Material#emission}.) If this is an array, its numbers can
* range from -1 to 1. The default is (0,0,0).
* <li><code>texture</code> - {@link H3DU.Texture} object, or a string with the URL of the texture
* to use.
* <li><code>specularMap</code> - {@link H3DU.Texture} object, or a string with the URL, of a specular
* map texture (see {@link H3DU.Material#specularMap}).
* <li><code>normalMap</code> - {@link H3DU.Texture} object, or a string with the URL, of a normal
* map (bump map) texture (see {@link H3DU.Material#normalMap}).
* <li><code>shader</code> - {@link H3DU.ShaderInfo} object for a WebGL shader program
* to use when rendering objects with this material. <i>Using {@link H3DU.ShaderProgram} objects in
* this parameter is deprecated.</i>
* </ul>
* Any or all of these keys can exist in the parameters object.  If a value is null or undefined, it is ignored.
* @returns {H3DU.Material} This object.
* @memberof! H3DU.Material#
*/
H3DU.Material.prototype.setParams = function(params) {
  "use strict";
  var param;
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
    this.shininess = params.shininess;
  }
  if(typeof params.texture !== "undefined" && params.texture !== null) {
    param = params.texture;
    if(typeof param === "string") {
      this.texture = new H3DU.Texture(param);
    } else {
      this.texture = param;
    }
  }
  if(typeof params.specularMap !== "undefined" && params.specularMap !== null) {
    param = params.specularMap;
    if(typeof param === "string") {
      this.specularMap = new H3DU.Texture(param);
    } else {
      this.specularMap = param;
    }
  }
  if(typeof params.normalMap !== "undefined" && params.normalMap !== null) {
    param = params.normalMap;
    if(typeof param === "string") {
      this.normalMap = new H3DU.Texture(param);
    } else {
      this.normalMap = param;
    }
  }
  if(typeof params.basic !== "undefined" && params.basic !== null) {
    this.basic = params.basic;
  }
  if(typeof params.shader !== "undefined" && params.shader !== null) {
    this.shader = params.shader;
  }
  return this;
};
/** Convenience method that returns an H3DU.Material
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

/** Convenience method that returns an H3DU.Material
 * object from a texture to apply to a 3D object's surface.
* @param {H3DU.Texture|string} texture {@link H3DU.Texture} object, or a string with the
* URL of the texture data.  In the case of a string the texture will be loaded via
*  the JavaScript DOM's Image class.  However, this method
*  will not load that image yet.
* @returns {H3DU.Material} The resulting material object.
 * @memberof! H3DU.Material
*/
H3DU.Material.fromTexture = function(texture) {
  "use strict";
  return new H3DU.Material().setParams({"texture":texture});
};

/**
 * Convenience method that returns an H3DU.Material
 * object from a shader information object to use when drawing a 3D object.
* @param {H3DU.ShaderInfo} shader Shader information object to use.
* @returns {H3DU.Material} The resulting material object.
 * @memberof! H3DU.Material
*/
H3DU.Material.forShader = function(shader) {
  "use strict";
  return new H3DU.Material().setParams({"shader":shader});
};

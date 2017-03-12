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
 * A collection of light sources. It stores the scene's
 * ambient color as well as data on one or more light sources.
 * When constructed, the list of light sources will be empty.<p>
 * NOTE: The default shader program assumes that all colors specified in this object are in
 * the [sRGB color space]{@link H3DU.Math.colorTosRGB}.
 * @constructor
 * @memberof H3DU
 */
export var Lights = function() {
  this._init();
};
/** @ignore */
Lights.prototype._init = function() {
  this.lights = [];
 /**
  * Ambient color for the scene. This is the color of the light
  * that shines on every part of every object equally and in
  * every direction. In the absence of
  * other lighting effects, all objects will be given this color.<p>
  * <small>Ambient light is a simplified simulation of the
  * real-world effect of light bouncing back and forth between
  * many different objects in an area. One example of this
  * phenomenon is sunlight reaching an indoor room without
  * directly hitting it, such that the sunlight bounces off the walls
  * and so illuminates most of the room pretty much uniformly.
  * Ambient lights simulate this phenomenon.</small><p>
  * NOTE: In the default shader program, this property is
  * only used on objects that use {@link H3DU.Material}, not {@link H3DU.PbrMaterial}.
  * @default
  */
  this.sceneAmbient = [0.2, 0.2, 0.2];
};
/**
 * Resets this object to a basic configuration for
 * light sources: one light source with its default
 * values, and the default value for <code>sceneAmbient</code>.
 * @returns {H3DU.Lights} This object.
 */
Lights.prototype.setBasic = function() {
  var ls = new H3DU.LightSource().setParams({
    "ambient":[0, 0, 0, 1],
    "position":[0, 0, 1, 0],
    "diffuse":[1, 1, 1, 1],
    "specular":[1, 1, 1],
    "radius":0.0
  });
  this.lights = [ls];
  this.sceneAmbient = [0.2, 0.2, 0.2];
  return this;
};

/** Maximum number of lights supported
 * by the default shader program.
 * @const
 * @default
 */
Lights.MAX_LIGHTS = 3;
/** @ignore */
Lights._createNewLight = function(index) {
  var ret = new H3DU.LightSource();
  if(index !== 0) {
    ret.diffuse = [0, 0, 0, 0];
    ret.specular = [0, 0, 0];
  }
  return ret;
};
/**
 * Gets the number of lights defined in this object.
 * @returns {number} Return value.
 */
Lights.prototype.getCount = function() {
  return this.lights.length;
};

/**
 * Gets information about the light source at the given index.
 * @param {number} index Zero-based index of the light to set. The first
 * light has index 0, the second has index 1, and so on.
 * If the light doesn't exist at that index, it will be created.
 * @returns {H3DU.LightSource} The corresponding light source object.
 */
Lights.prototype.getLight = function(index) {
  var oldLength = this.lights.length;
  if(!this.lights[index])this.lights[index] = H3DU.Lights._createNewLight(index);
  if(this.lights.length - oldLength >= 2) {
  // Ensure existence of lights that come between the new
  // light and the last light
    for(var i = oldLength; i < this.lights.length; i++) {
      if(!this.lights[i]) {
        this.lights[i] = H3DU.Lights._createNewLight(i);
      }
    }
  }
  return this.lights[index];
};
/**
 * Sets parameters for the light source at the given index.
 * @param {number} index Zero-based index of the light to set. The first
 * light has index 0, the second has index 1, and so on.
 * If the light doesn't exist at that index, it will be created.
 * @param {Object} params An object as described in {@link H3DU.LightSource.setParams}.
 * @returns {H3DU.Lights} This object.
 */
Lights.prototype.setParams = function(index, params) {
  this.getLight(index).setParams(params);
  return this;
};

/**
 * Sets a directional light.
 * @param {number} index Zero-based index of the light to set. The first
 * light has index 0, the second has index 1, and so on.
 * If the light doesn't exist at that index, it will be created.
 * @param {Array<number>} direction A 3-element array giving the X, Y, and Z world space
 * components, respectively, of the a vector; the light will shine the brightest on surfaces that face the light in this vector's direction from the origin (0, 0, 0).
 * @param {Array<number>} [diffuse] A [color vector or string]{@link H3DU.toGLColor} giving the diffuse color of the light.
 * If null or omitted, the diffuse color will remain unchanged. The default is (1, 1, 1, 1) for light index 0 and (0, 0, 0, 0) otherwise.
 * @param {Array<number>} [specular] A [color vector or string]{@link H3DU.toGLColor} giving the color of specular highlights caused by
 * the light.
 * If null or omitted, the specular highlight color will
 * remain unchanged. The default is (1, 1, 1) for light index 0 and (0, 0, 0) otherwise.
 * @returns {H3DU.Lights} This object.
 */
Lights.prototype.setDirectionalLight = function(index, direction, diffuse, specular) {
  var ret = this.setParams(index, {"position":[direction[0], direction[1], direction[2], 0]});
  if(typeof diffuse !== "undefined" && diffuse !== null)
    ret = ret.setParams(index, {"diffuse":diffuse});
  if(typeof specular !== "undefined" && specular !== null)
    ret = ret.setParams(index, {"specular":specular});
  return ret;
};
/**
 * Sets a point light.
 * @param {number} index Zero-based index of the light to set. The first
 * light has index 0, the second has index 1, and so on.
 * If the light doesn't exist at that index, it will be created.
 * @param {Array<number>} position A 3-element array giving the X, Y, and Z world space
 * coordinates, respectively, of the light's position.
 * @param {Array<number>} [diffuse] Diffuse color, as described in {@link H3DU.Lights.setDirectionalLight}.
 * @param {Array<number>} [specular] Specular color, as described in {@link H3DU.Lights.setDirectionalLight}.
 * @returns {H3DU.Lights} This object.
 */
Lights.prototype.setPointLight = function(index, position, diffuse, specular) {
  var ret = this.setParams(index, {"position":[position[0], position[1], position[2], 1]});
  if(typeof diffuse !== "undefined" && diffuse !== null)
    ret = ret.setParams(index, {"diffuse":diffuse});
  if(typeof specular !== "undefined" && specular !== null)
    ret = ret.setParams(index, {"specular":specular});
  return ret;
};

/**
 * Sets the color of the scene's ambient light.
 * @param {Array<number>|number|string} r Array of three or
 * four color components; or the red color component (0-1); or a string
 * specifying an [HTML or CSS color]{@link H3DU.toGLColor}.
 * @param {number} g Green color component (0-1).
 * May be null or omitted if a string or array is given as the "r" parameter.
 * @param {number} b Blue color component (0-1).
 * May be null or omitted if a string or array is given as the "r" parameter.
 * @param {number} [a] Alpha color component (0-1).
 * Currently not used.
 * @returns {H3DU.Lights} This object.
 */
Lights.prototype.setAmbient = function(r, g, b, a) {
  this.sceneAmbient = H3DU.toGLColor(r, g, b, a);
  return this;
};

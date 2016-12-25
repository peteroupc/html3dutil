/* global H3DU */
/**
* A collection of light sources.  It stores the scene's
* ambient color as well as data on one or more light sources.
* When constructed, the default lighting will have a default
* ambient color and one directional light source.
* @class
* @alias H3DU.Lights
*/
H3DU.Lights = function() {
  "use strict";
  this.lights = [];
 /**
 *  Ambient color for the scene.  This is the color of the light
 *  that shines on every part of every object equally and in
 *  every direction. In the absence of
 *  other lighting effects, all objects will be given this color.<p>
 *  <small>Ambient light is a simplified simulation of the
 * real-world effect of light bouncing back and forth between
 * many different objects in an area.  One example of this
 * phenomenon is sunlight reaching an indoor room without
 * directly hitting it, such that the sunlight bounces off the walls
 * and so illuminates most of the room pretty much uniformly.
 * Ambient lights simulate this phenomenon.</small>
 *  @default
*/
  this.sceneAmbient = [0.2, 0.2, 0.2];
};
/**
 * Resets this object to the default configuration for
 * light sources: one light source with its default
  * values, and the default value for <code>sceneAmbient</code>.
  * @returns {H3DU.Lights} This object.
 * @memberof! H3DU.Lights#
*/
H3DU.Lights.prototype.setDefaults = function() {
  "use strict";
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
   by the default shader program.
   @const
   @default
* @memberof! H3DU.Lights
*/
H3DU.Lights.MAX_LIGHTS = 3;
/** @private */
H3DU.Lights._createNewLight = function(index) {
  "use strict";
  var ret = new H3DU.LightSource();
  if(index !== 0) {
    ret.diffuse = [0, 0, 0, 0];
    ret.specular = [0, 0, 0];
  }
  return ret;
};
/**
 * Gets the number of lights defined in this object.
 * @returns {Number} Return value.
* @memberof! H3DU.Lights#
*/
H3DU.Lights.prototype.getCount = function() {
  "use strict";
  return this.lights.length;
};

/**
 * Gets information about the light source at the given index.
 * @param {Number} index Zero-based index of the light to set.  The first
 * light has index 0, the second has index 1, and so on.
 * If the light doesn't exist at that index, it will be created.
 * @returns {LightSource} The corresponding light source object.
 * @memberof! H3DU.Lights#
*/
H3DU.Lights.prototype.getLight = function(index) {
  "use strict";
  var oldLength = this.lights.length;
  if(!this.lights[index])this.lights[index] = H3DU.Lights._createNewLight(index);
  if(this.lights.length - oldLength >= 2) {
  // Ensure existence of lights that come between the new
  // light and the last light
    for(var i = oldLength;i < this.lights.length;i++) {
      if(!this.lights[i]) {
        this.lights[i] = H3DU.Lights._createNewLight(i);
      }
    }
  }
  return this.lights[index];
};
/**
 * Sets parameters for the light source at the given index.
 * @param {Number} index Zero-based index of the light to set.  The first
 * light has index 0, the second has index 1, and so on.
 * If the light doesn't exist at that index, it will be created.
 * @param {Object} params An object as described in {@link H3DU.LightSource.setParams}.
 * @returns {H3DU.Lights} This object.
 * @memberof! H3DU.Lights#
*/
H3DU.Lights.prototype.setParams = function(index, params) {
  "use strict";
  this.getLight(index).setParams(params);
  return this;
};

/**
 * Sets a directional light.
 * @param {Number} index Zero-based index of the light to set.  The first
 * light has index 0, the second has index 1, and so on.
 * If the light doesn't exist at that index, it will be created.
 * @param {Array<Number>} direction A 3-element vector giving the direction of the light, along the X, Y, and Z
 * axes, respectively.
 * @param {Array<Number>} [diffuse] A [color vector or string]{@link H3DU.toGLColor} giving the diffuse color of the light.
 * If null or omitted, the diffuse color will remain unchanged. The default is (1, 1, 1, 1) for light index 0 and (0, 0, 0, 0) otherwise.
 * @param {Array<Number>} [specular] A [color vector or string]{@link H3DU.toGLColor} giving the color of specular highlights caused by
 * the light.
 * If null or omitted, the specular highlight color will
 * remain unchanged.  The default is (1, 1, 1) for light index 0 and (0, 0, 0) otherwise.
 * @returns {H3DU.Lights} This object.
 * @memberof! H3DU.Lights#
*/
H3DU.Lights.prototype.setDirectionalLight = function(index, direction, diffuse, specular) {
  "use strict";
  var ret = this.setParams(index, {"position":[direction[0], direction[1], direction[2], 0]});
  if(diffuse !== null && typeof diffuse !== "undefined")
    ret = ret.setParams(index, {"diffuse":diffuse});
  if(specular !== null && typeof specular !== "undefined")
    ret = ret.setParams(index, {"specular":specular});
  return ret;
};
/**
 * Sets a point light.
 * @param {Number} index Zero-based index of the light to set.  The first
 * light has index 0, the second has index 1, and so on.
 * If the light doesn't exist at that index, it will be created.
 * @param {Array<Number>} position A 3-element vector giving the X, Y, and Z
 * coordinates, respectively, of the light, in world coordinates.
 * @param {Array<Number>} [diffuse] Diffuse color, as described in {@link H3DU.Lights.setDirectionalLight}.
 * @param {Array<Number>} [specular] Specular color, as described in {@link H3DU.Lights.setDirectionalLight}.
 * @returns {H3DU.Lights} This object.
 * @memberof! H3DU.Lights#
*/
H3DU.Lights.prototype.setPointLight = function(index, position, diffuse, specular) {
  "use strict";
  var ret = this.setParams(index, {"position":[position[0], position[1], position[2], 1]});
  if(diffuse !== null && typeof diffuse !== "undefined")
    ret = ret.setParams(index, {"diffuse":diffuse});
  if(specular !== null && typeof specular !== "undefined")
    ret = ret.setParams(index, {"specular":specular});
  return ret;
};

/**
 * Sets the color of the scene's ambient light.
* @param {Array<Number>|number|string} r Array of three or
* four color components; or the red color component (0-1); or a string
* specifying an [HTML or CSS color]{@link H3DU.toGLColor}.
* @param {Number} g Green color component (0-1).
* May be null or omitted if a string or array is given as the "r" parameter.
* @param {Number} b Blue color component (0-1).
* May be null or omitted if a string or array is given as the "r" parameter.
* @param {Number} [a] Alpha color component (0-1).
* Currently not used.
* @returns {H3DU.Scene3D} This object.
 * @memberof! H3DU.Lights#
*/
H3DU.Lights.prototype.setAmbient = function(r, g, b, a) {
  "use strict";
  this.sceneAmbient = H3DU.toGLColor(r, g, b, a);
  return this;
};

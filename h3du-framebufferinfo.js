/* global H3DU */
/**
 * Describes a frame buffer.  In the HTML 3D Library,
each frame buffer consists of a texture of a given size and a <i>renderbuffer</i> of the same
size to use as the depth buffer.
 * @param {Number} width Width to use for the frame buffer.
 * Throws an error if this value is less than 0.  The width will be set
 * to this value rounded up.
 * @param {Number} height Height to use for the frame buffer.
 * Throws an error if this value is less than 0.  The height will be set
 * to this value rounded up.
  * @class
  * @alias H3DU.FrameBufferInfo
*/
H3DU.FrameBufferInfo = function(width, height) {
  "use strict";
  if(width < 0 || height < 0)throw new Error("width or height negative");
  this.width = Math.ceil(width);
  this.height = Math.ceil(height);
};
/**
 * Changes the width and height of this frame buffer information object.
 * @param {Number} width New width to use for the frame buffer.
 * Throws an error if this value is less than 0.  The width will be set
 * to this value rounded up.
 * @param {Number} height New height to use for the frame buffer.
 * Throws an error if this value is less than 0.  The height will be set
 * to this value rounded up.
 * @memberof! H3DU.FrameBufferInfo#
*/
H3DU.FrameBufferInfo.prototype.resize = function(width, height) {
  "use strict";
  if(width < 0 || height < 0)throw new Error("width or height negative");
  width = Math.ceil(width);
  height = Math.ceil(height);
  this.width = width;
  this.height = height;
};
/**
 * Gets the width to use for the frame buffer.
* @returns {Number} Return value.
 * @memberof! H3DU.FrameBufferInfo#
*/
H3DU.FrameBufferInfo.prototype.getWidth = function() {
  "use strict";
  return this.width;
};
/**
 * Gets the height to use for the frame buffer.
* @returns {Number} Return value.
 * @memberof! H3DU.FrameBufferInfo#
*/
H3DU.FrameBufferInfo.prototype.getHeight = function() {
  "use strict";
  return this.height;
};

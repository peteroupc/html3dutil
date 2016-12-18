/* global H3DU */
// NOTE: FrameBufferInfo is independent of
// any WebGL context or the WebGL API.

/**
 * TODO: Not documented yet.
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
 * TODO: Not documented yet.
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
* @return {Number} Return value.
 * @memberof! H3DU.FrameBufferInfo#
*/
H3DU.FrameBufferInfo.prototype.getWidth = function() {
  "use strict";
  return this.width;
};
/**
 * Gets the height to use for the frame buffer.
* @return {Number} Return value.
 * @memberof! H3DU.FrameBufferInfo#
*/
H3DU.FrameBufferInfo.prototype.getHeight = function() {
  "use strict";
  return this.height;
};

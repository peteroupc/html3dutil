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
 * Describes a frame buffer. In the HTML 3D Library,
 * each frame buffer consists of a texture of a given size and a <i>renderbuffer</i> of the same
 * size to use as the depth buffer.
 * @param {number} width Width to use for the frame buffer.
 * Throws an error if this value is less than 0. The width will be set
 * to this value rounded up.
 * @param {number} height Height to use for the frame buffer.
 * Throws an error if this value is less than 0. The height will be set
 * to this value rounded up.
 * @constructor
 * @memberof H3DU
 */
function FrameBufferInfo(width, height) {
  "use strict";
  if(width < 0 || height < 0)throw new Error("width or height negative");
  this.width = Math.ceil(width);
  this.height = Math.ceil(height);
};
/**
 * Changes the width and height of this frame buffer information object.
 * @param {number} width New width to use for the frame buffer.
 * Throws an error if this value is less than 0. The width will be set
 * to this value rounded up.
 * @param {number} height New height to use for the frame buffer.
 * Throws an error if this value is less than 0. The height will be set
 * to this value rounded up.
 * @returns {H3DU.FrameBufferInfo} This object.
 */
FrameBufferInfo.prototype.resize = function(width, height) {
  "use strict";
  if(width < 0 || height < 0)throw new Error("width or height negative");
  width = Math.ceil(width);
  height = Math.ceil(height);
  this.width = width;
  this.height = height;
  return this;
};
/**
 * Gets the width to use for the frame buffer.
 * @returns {number} Return value.
 */
FrameBufferInfo.prototype.getWidth = function() {
  "use strict";
  return this.width;
};
/**
 * Gets the height to use for the frame buffer.
 * @returns {number} Return value.
 */
FrameBufferInfo.prototype.getHeight = function() {
  "use strict";
  return this.height;
};

export { FrameBufferInfo };

/* global H3DU */
// NOTE: FrameBufferInfo is independent of
// any WebGL context or the WebGL API.

H3DU.FrameBufferInfo = function(width, height) {
  "use strict";
  if(width < 0 || height < 0)throw new Error("width or height negative");
  this.width = width;
  this.height = height;
};
H3DU.FrameBufferInfo.prototype.resize = function(width, height) {
  "use strict";
  width = Math.ceil(width);
  height = Math.ceil(height);
  this.width = width;
  this.height = height;
};
H3DU.FrameBufferInfo.prototype.getWidth = function() {
  "use strict";
  return this.width;
};
H3DU.FrameBufferInfo.prototype.getHeight = function() {
  "use strict";
  return this.height;
};

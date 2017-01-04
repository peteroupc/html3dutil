/*
 Any copyright to this file is released to the Public Domain.
 http://creativecommons.org/publicdomain/zero/1.0/
 If you like this, you should donate
 to Peter O. (original author of
 the Public Domain HTML 3D Library) at:
 http://peteroupc.github.io/
*/
/* global H3DU */

/** @private */
H3DU.FrameBufferLoader = function() {
  "use strict";
  this._frameBuffers = [];
};
/** @private */
H3DU.FrameBufferLoader.prototype.mapFrameBuffer = function(info, context) {
  "use strict";
  var fb;
  for(var i = 0;i < this._frameBuffers.length;i++) {
    fb = this._frameBuffers[i];
    if(fb[0] === info && fb[1] === context) {
      if(info.width !== fb[3] || info.height !== fb[4]) {
         // Width and height change, rebuild frame buffer
        fb[2].dispose();
        fb[2] = new H3DU.FrameBuffer(fb[1], info.width, info.height);
        fb[3] = info.width;
        fb[4] = info.height;
      }
      return fb[2];
    }
  }
  fb = new H3DU.FrameBuffer(context, info.width, info.height);
  this._frameBuffers.push([info, context, fb, info.width, info.height]);
  return fb;
};
/** @private */
H3DU.FrameBufferLoader.prototype.dispose = function() {
  "use strict";
  for(var i = 0;i < this._frameBuffers.length;i++) {
    this._frameBuffers[i][2].dispose();
  }
  this._frameBuffers = [];
};
/** @private */
H3DU.FrameBufferLoader.prototype.bind = function(info, context) {
  "use strict";
  if(info !== null && typeof info !== "undefined") {
    var fc = this.mapFrameBuffer(info, context);
    context.activeTexture(context.TEXTURE0 + fc.textureUnit);
    context.bindFramebuffer(
    context.FRAMEBUFFER, fc.buffer);
    context.framebufferTexture2D(
   context.FRAMEBUFFER, context.COLOR_ATTACHMENT0,
   context.TEXTURE_2D, fc.colorTexture, 0);
    context.framebufferRenderbuffer(
   context.FRAMEBUFFER, context.DEPTH_ATTACHMENT,
   context.RENDERBUFFER, fc.depthbuffer);
  }
};
/** @private */
H3DU.FrameBufferLoader.prototype.unbind = function(info, context) {
  "use strict";
  if(info !== null && typeof info !== "undefined") {
    context.framebufferTexture2D(
     context.FRAMEBUFFER, context.COLOR_ATTACHMENT0,
     context.TEXTURE_2D, null, 0);
    context.framebufferRenderbuffer(
     context.FRAMEBUFFER, context.DEPTH_ATTACHMENT,
     context.RENDERBUFFER, null);
    context.bindFramebuffer(
     context.FRAMEBUFFER, null);
  }
};
/**
* Represents an off-screen frame buffer.<p>
* When H3DU.FrameBuffer's
* constructor is called, it will create a texture buffer with the given
* width and height and a depth buffer with the same dimensions,
* and will bind both to the frame buffer.  The frame buffer currently
* bound to the WebGL context will remain unchanged.
* @deprecated This class is likely to become a private class.
* Use the FrameBufferInfo class instead, which is not coupled to WebGL
* contexts.
* @class
* @alias H3DU.FrameBuffer
* @param {WebGLRenderingContext|object} context
* WebGL context to associate with this buffer, or an object, such as H3DU.Scene3D, that
* implements a no-argument <code>getContext</code> method
* that returns a WebGL context.
* @param {Number} width Width, in pixels, of the frame buffer.
* Fractional values are rounded up.
* @param {Number} height Height, in pixels, of the frame buffer.
* Fractional values are rounded up.
*/
H3DU.FrameBuffer = function(context, width, height) {
  "use strict";
  if(width < 0 || height < 0)throw new Error("width or height negative");
  context = context.getContext ? context.getContext() : context;
  this.context = context;
 // give the framebuffer its own texture unit, since the
 // shader program may bind samplers to other texture
 // units, such as texture unit 0
  this.textureUnit = 3;
  this._init(context, width, height);
};
/** @private */
H3DU.FrameBuffer.prototype._init = function(context, width, height) {
  "use strict";
  this.buffer = context.createFramebuffer();
 // create color texture
  this.colorTexture = context.createTexture();
 /** The frame buffer's width.
* @memberof! H3DU.FrameBuffer
@alias width
  @readonly */
  this.width = Math.ceil(width);
 /** The frame buffer's height.
* @memberof! H3DU.FrameBuffer
  @alias height
  @readonly */
  this.height = Math.ceil(height);
  this.context.activeTexture(this.context.TEXTURE0 + this.textureUnit);
  this.context.bindTexture(this.context.TEXTURE_2D, this.colorTexture);
 // In WebGL, texture coordinates start at the upper left corner rather than
 // the lower left as in OpenGL and OpenGL ES, so we use this method call
 // to reestablish the lower left corner.
  this.context.pixelStorei(this.context.UNPACK_FLIP_Y_WEBGL, 1);
  this.context.texImage2D(this.context.TEXTURE_2D, 0,
   this.context.RGBA, this.width, this.height, 0,
   this.context.RGBA, this.context.UNSIGNED_BYTE, null);
 // set essential parameters now to eliminate warnings (will
 // be set again as the texture is bound)
  this.context.texParameteri(this.context.TEXTURE_2D,
   this.context.TEXTURE_MAG_FILTER, this.context.NEAREST);
  this.context.texParameteri(this.context.TEXTURE_2D,
   this.context.TEXTURE_MIN_FILTER, this.context.NEAREST);
  this.context.texParameteri(this.context.TEXTURE_2D,
   this.context.TEXTURE_WRAP_S, this.context.CLAMP_TO_EDGE);
  this.context.texParameteri(this.context.TEXTURE_2D,
   this.context.TEXTURE_WRAP_T, this.context.CLAMP_TO_EDGE);
 // create depth renderbuffer
  this.depthbuffer = this.context.createRenderbuffer();
  var oldBuffer = this.context.getParameter(
   context.FRAMEBUFFER_BINDING);
  this.context.bindFramebuffer(
   context.FRAMEBUFFER, this.buffer);
  this.context.bindRenderbuffer(
   context.RENDERBUFFER, this.depthbuffer);
  this.context.renderbufferStorage(
   context.RENDERBUFFER, context.DEPTH_COMPONENT16,
   this.width, this.height);
  this.context.bindFramebuffer(
   context.FRAMEBUFFER, oldBuffer);
};
/**
 * Resizes the frame buffer to a new width and height,
 * if either differs from the current width or height.
* @param {Number} width New width, in pixels, of the frame buffer.
* Fractional values are rounded up.
* @param {Number} height New height, in pixels, of the frame buffer.
* Fractional values are rounded up.
* @returns {H3DU.FrameBuffer} This object.
 * @memberof! H3DU.FrameBuffer#
*/
H3DU.FrameBuffer.prototype.resize = function(width, height) {
  "use strict";
  width = Math.ceil(width);
  height = Math.ceil(height);
  if(width !== this.width || height !== this.height) {
    this.dispose();
    this._init(this.context, width, height);
  }
  return this;
};

/** @private */
H3DU.FrameBuffer.prototype.getWidth = function() {
  "use strict";
  return this.width;
};
/** @private */
H3DU.FrameBuffer.prototype.getHeight = function() {
  "use strict";
  return this.height;
};

/**
 * Gets the WebGL context associated with this frame buffer.
 * @returns {WebGLRenderingContext} Return value.
* @memberof! H3DU.FrameBuffer#
*/
H3DU.FrameBuffer.prototype.getContext = function() {
  "use strict";
  return this.context;
};
/**
 * Has no effect. (Previously, bound this frame buffer to the WebGL context associated with
 * it.)
 * @returns {H3DU.FrameBuffer} This object.
 * @memberof! H3DU.FrameBuffer#
*/
H3DU.FrameBuffer.prototype.bind = function() {
  "use strict";
  console.log("FrameBuffer bind method has no effect.");
  return this;
};
/**
 * Has no effect. (Previously, unbound this frame buffer from its associated WebGL context.)
 * @memberof! H3DU.FrameBuffer#
 * @returns {void} Return value.*/
H3DU.FrameBuffer.prototype.unbind = function() {
  "use strict";
  console.log("FrameBuffer unbind method has no effect.");
};
/**
 * Disposes all resources from this frame buffer object.
 * @memberof! H3DU.FrameBuffer#
 * @returns {void} Return value.*/
H3DU.FrameBuffer.prototype.dispose = function() {
  "use strict";
  if(typeof this.buffer !== "undefined" && this.buffer !== null) {
    var oldBuffer = this.context.getParameter(
    this.context.FRAMEBUFFER_BINDING);
    if(oldBuffer === this.buffer) {
      this.unbind();
    }
    this.context.deleteFramebuffer(this.buffer);
  }
  if(typeof this.depthbuffer !== "undefined" && this.depthbuffer !== null) {
    this.context.deleteRenderbuffer(this.depthbuffer);
  }
  if(typeof this.colorTexture !== "undefined" && this.colorTexture !== null) {
    this.context.deleteTexture(this.colorTexture);
  }
  this.buffer = null;
  this.depthbuffer = null;
  this.colorTexture = null;
};

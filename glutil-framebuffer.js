/**
* Represents an off-screen frame buffer.<p>
* When FrameBuffer's
* constructor is called, it will create a texture buffer with the given
* width and height and a depth buffer with the same dimensions,
* and will bind both to the frame buffer.  The frame buffer currently
* bound to the WebGL context will remain unchanged.
* @class
* @alias glutil.FrameBuffer
* @param {WebGLRenderingContext|object} context
* WebGL context to associate with this buffer, or an object, such as Scene3D, that
* implements a no-argument <code>getContext</code> method
* that returns a WebGL context.
* @param {Number} width Width, in pixels, of the frame buffer.
* Fractional values are rounded up.
* @param {Number} height Height, in pixels, of the frame buffer.
* Fractional values are rounded up.
*/
function FrameBuffer(context, width, height){
 "use strict";
 if(width<0 || height<0)throw new Error("width or height negative");
 context= (context.getContext) ? context.getContext() : context;
 this.context=context;
 this._init(context,width,height);
 // give the framebuffer its own texture unit, since the
 // shader program may bind samplers to other texture
 // units, such as texture unit 0
 this.textureUnit=3;
}
/** @private */
FrameBuffer.prototype._init=function(context,width,height){
 this.buffer=context.createFramebuffer();
 // create color texture
 this.colorTexture = context.createTexture();
 /** The frame buffer's width.
  @readonly */
 this.width=Math.ceil(width);
 /** The frame buffer's height.
  @readonly */
 this.height=Math.ceil(height);
 this.context.activeTexture(this.context.TEXTURE0+this.textureUnit);
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
 this.depthbuffer=this.context.createRenderbuffer();
 var oldBuffer=this.context.getParameter(
   context.FRAMEBUFFER_BINDING);
 this.context.bindFramebuffer(
   context.FRAMEBUFFER,this.buffer);
 this.context.bindRenderbuffer(
   context.RENDERBUFFER,this.depthbuffer);
 this.context.renderbufferStorage(
   context.RENDERBUFFER,context.DEPTH_COMPONENT16,
   this.width,this.height);
 this.context.bindFramebuffer(
   context.FRAMEBUFFER,oldBuffer);
}
/**
 * Resizes the frame buffer to a new width and height,
 * if either differs from the current width or height.
* @param {Number} width New width, in pixels, of the frame buffer.
* Fractional values are rounded up.
* @param {Number} height New height, in pixels, of the frame buffer.
* Fractional values are rounded up.
* @returns {glutil.FrameBuffer} This object.
 */
FrameBuffer.prototype.resize=function(width,height){
 width=Math.ceil(width);
 height=Math.ceil(height);
 if(width!=this.width || height!=this.height){
  this.dispose();
  this._init(this.context,width,height);
 }
 return this;
}

/**
 * Gets the WebGL context associated with this frame buffer.
 * @returns {WebGLRenderingContext} Return value. */
FrameBuffer.prototype.getContext=function(){
 "use strict";
return this.context;
};
/**
 * Binds this frame buffer to the WebGL context associated with
 * it.  Future draw calls that use the WebGL context will be rendered
 * to this frame buffer until it's unbound with the {@link glutil.FrameBuffer#unbind}
 * method.
 * @returns {glutil.FrameBuffer} This object.
 */
FrameBuffer.prototype.bind=function(){
  "use strict";
 this.context.activeTexture(this.context.TEXTURE0+this.textureUnit);
 this.context.bindFramebuffer(
    this.context.FRAMEBUFFER,this.buffer);
 this.context.framebufferTexture2D(
   this.context.FRAMEBUFFER,this.context.COLOR_ATTACHMENT0,
   this.context.TEXTURE_2D,this.colorTexture,0);
 this.context.framebufferRenderbuffer(
   this.context.FRAMEBUFFER,this.context.DEPTH_ATTACHMENT,
   this.context.RENDERBUFFER,this.depthbuffer);
 return this;
};
/**
 * Unbinds this frame buffer from its associated WebGL context.
 */
FrameBuffer.prototype.unbind=function(){
 "use strict";
this.context.framebufferTexture2D(
   this.context.FRAMEBUFFER,this.context.COLOR_ATTACHMENT0,
   this.context.TEXTURE_2D,null,0);
 this.context.framebufferRenderbuffer(
   this.context.FRAMEBUFFER,this.context.DEPTH_ATTACHMENT,
   this.context.RENDERBUFFER,null);
 this.context.bindFramebuffer(
    this.context.FRAMEBUFFER,null);
};
/**
 * Disposes all resources from this frame buffer object.
 */
FrameBuffer.prototype.dispose=function(){
 "use strict";
if(this.buffer!==null){
   var oldBuffer=this.context.getParameter(
    this.context.FRAMEBUFFER_BINDING);
   if(oldBuffer==this.buffer){
     this.unbind();
   }
   this.context.deleteFramebuffer(this.buffer);
 }
 if(this.depthbuffer!==null){
  this.context.deleteRenderbuffer(this.depthbuffer);
 }
 if(this.colorTexture!==null){
  this.context.deleteTexture(this.colorTexture);
 }
 this.buffer=null;
 this.depthbuffer=null;
 this.colorTexture=null;
};

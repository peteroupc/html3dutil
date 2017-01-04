/*
 Any copyright to this file is released to the Public Domain.
 http://creativecommons.org/publicdomain/zero/1.0/
 If you like this, you should donate
 to Peter O. (original author of
 the Public Domain HTML 3D Library) at:
 http://peteroupc.github.io/
*/
/* global H3DU */
// NOTE: RenderPass3D is independent of
// any WebGL context or the WebGL API.
/**
* Describes a batch (a scene graph of 3D objects) and options for
* rendering that batch.
* @class H3DU.RenderPass3D
* @param {H3DU.Batch3D} subScene The batch to render using
* the options described by this object.
* @param {Object} [parameters] An object whose keys have
* the possibilities given in {@link H3DU.RenderParams#setParams}, and whose values are those
* allowed for each key.
*/
H3DU.RenderPass3D = function(subScene, parameters) {
  "use strict";
 /** The batch to render.
   * @type {H3DU.Batch3D}
*/
  this.subScene = subScene;
 /** Whether to clear the color buffer before rendering the batch.
  @default
*/
  this.clearColor = true;
 /** Whether to clear the depth buffer before rendering the batch.
  @default
*/
  this.clearDepth = true;
 /** Whether to clear the stencil buffer before rendering the batch.
  @default
*/
  this.clearStencil = true;
 /** Framebuffer to render to.
  @type {H3DU.FrameBufferInfo}
  @default
*/
  this.frameBuffer = null;
  this.setParams(parameters);
};
/**
* Sets parameters for this render pass object.
* @param {Object} parameters An object whose keys have
* the possibilities given below, and whose values are those
* allowed for each key.<ul>
* <li><code>subScene</code> - The batch to render. An {@link H3DU.Batch3D} object.
* <li><code>clearColor</code> - Whether to clear the color buffer before rendering the batch. Either true or false.
* <li><code>clearDepth</code> - Whether to clear the depth buffer before rendering the batch. Either true or false.
* <li><code>clearStencil</code> - Whether to clear the stencil buffer before rendering the batch. Either true or false.
* <li><code>frameBuffer</code> - Framebuffer to render to. An {@link H3DU.FrameBufferInfo} object.
* </ul>
* Any or all of these keys can exist in the parameters object.  If a value is null or undefined, it is ignored.
 * @returns {H3DU.RenderPass3D} This object.
 * @memberof! H3DU.RenderPass3D#
*/
H3DU.RenderPass3D.prototype.setParams = function(parameters) {
  "use strict";
  if(!parameters)return;
  if(typeof parameters.clearColor !== "undefined") {
    this.clearColor = parameters.clearColor;
  }
  if(typeof parameters.clearDepth !== "undefined") {
    this.clearDepth = parameters.clearDepth;
  }
  if(typeof parameters.clearStencil !== "undefined") {
    this.clearStencil = parameters.clearStencil;
  }
  if(typeof parameters.frameBuffer !== "undefined") {
    if(parameters.frameBuffer instanceof H3DU.FrameBuffer) {
      throw new Error("FrameBuffer not supported");
    }
    this.frameBuffer = parameters.frameBuffer;
  }
  return this;
};

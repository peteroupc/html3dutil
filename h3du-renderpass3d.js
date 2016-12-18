/* global H3DU */
// NOTE: RenderPass3D is independent of
// any WebGL context or the WebGL API.
/**
* Describes a batch and options for
* rendering that batch.
* @class H3DU.RenderPass3D
* @param {H3DU.Batch3D} subScene
* @param {Object} [parameters]
*/
H3DU.RenderPass3D = function(subScene, parameters) {
  "use strict";
 /** The batch to render.
   * @type {H3DU.Batch3D}
  */
  this.subScene = subScene;
 /** Whether to clear the color buffer before rendering the scene.
  @default */
  this.clearColor = true;
 /** Whether to clear the depth buffer before rendering the scene.
  @default */
  this.clearDepth = true;
 /** Whether to clear the stencil buffer before rendering the scene.
  @default */
  this.clearStencil = true;
 /** Framebuffer to render to.
  @type {H3DU.FrameBufferInfo}
  @default */
  this.frameBuffer = null;
  this.setParams(parameters);
};
/**
 * TODO: Not documented yet.
 * @param {Object} parameters
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
};

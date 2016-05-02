/**
* Not documented yet.
* @class glutil.RenderPass3D
* @param {Subscene3D} subScene
* @param {Object} parameters
*/
function RenderPass3D(subScene,parameters){
 /** The scene to render. */
 this.subScene=subScene;
 /** Whether to clear the color buffer before rendering the scene.
  @default */
 this.clearColor=true;
 /** Whether to clear the depth buffer before rendering the scene.
  @default */
 this.clearDepth=true;
 /** Whether to clear the stencil buffer before rendering the scene.
  @default */
 this.clearStencil=true;
 /** Framebuffer to render to. */
 this.frameBuffer=null;
 this.setParams(parameters)
}
/**
 * Not documented yet.
 * @param {*} parameters
 */
RenderPass3D.prototype.setParams=function(parameters){
 if(!parameters)return;
 if(typeof parameters.clearColor!=="undefined"){
  this.clearColor=parameters.clearColor
 }
 if(typeof parameters.clearDepth!=="undefined"){
  this.clearDepth=parameters.clearDepth
 }
 if(typeof parameters.clearStencil!=="undefined"){
  this.clearStencil=parameters.clearStencil
 }
 if(typeof parameters.frameBuffer!=="undefined"){
  this.frameBuffer=parameters.frameBuffer
 }
}

# H3DU.RenderPass3D

[Back to documentation index.](index.md)

### H3DU.RenderPass3D(subScene, [parameters]) <a id='H3DU_RenderPass3D'></a>

Describes a batch (a scene graph of 3D objects) and options for
rendering that batch.

#### Parameters

* `subScene` (Type: <a href="H3DU_Batch3D.md">H3DU.Batch3D</a>)<br>
    The batch to render using the options described by this object.
* `parameters` (Type: Object) (optional)<br>
    An object whose keys have the possibilities given in H3DU.RenderParams#setParams, and whose values are those allowed for each key.

### Members

* [clearColor](#H3DU_RenderPass3D_clearColor)
* [clearDepth](#H3DU_RenderPass3D_clearDepth)
* [clearStencil](#H3DU_RenderPass3D_clearStencil)
* [frameBuffer](#H3DU_RenderPass3D_frameBuffer)
* [subScene](#H3DU_RenderPass3D_subScene)

### Methods

* [setParams](#H3DU_RenderPass3D_H3DU_RenderPass3D_setParams)

### H3DU.RenderPass3D#clearColor <a id='H3DU_RenderPass3D_clearColor'></a>

Whether to clear the color buffer before rendering the batch.

Default Value: `true`

### H3DU.RenderPass3D#clearDepth <a id='H3DU_RenderPass3D_clearDepth'></a>

Whether to clear the depth buffer before rendering the batch.

Default Value: `true`

### H3DU.RenderPass3D#clearStencil <a id='H3DU_RenderPass3D_clearStencil'></a>

Whether to clear the stencil buffer before rendering the batch.

Default Value: `true`

### H3DU.RenderPass3D#frameBuffer <a id='H3DU_RenderPass3D_frameBuffer'></a>

Framebuffer to render to.

Type: <a href="H3DU_FrameBufferInfo.md">H3DU.FrameBufferInfo</a>

Default Value: `null`

### H3DU.RenderPass3D#subScene <a id='H3DU_RenderPass3D_subScene'></a>

The batch to render.

Type: <a href="H3DU_Batch3D.md">H3DU.Batch3D</a>

### H3DU.RenderPass3D#setParams(parameters) <a id='H3DU_RenderPass3D_H3DU_RenderPass3D_setParams'></a>

Sets parameters for this render pass object.

#### Parameters

* `parameters` (Type: Object)<br>
    An object whose keys have the possibilities given below, and whose values are those allowed for each key.<ul> <li><code>subScene</code> - The batch to render. An <a href="H3DU_Batch3D.md">H3DU.Batch3D</a> object. <li><code>clearColor</code> - Whether to clear the color buffer before rendering the batch. Either true or false. <li><code>clearDepth</code> - Whether to clear the depth buffer before rendering the batch. Either true or false. <li><code>clearStencil</code> - Whether to clear the stencil buffer before rendering the batch. Either true or false. <li><code>frameBuffer</code> - Framebuffer to render to. An <a href="H3DU_FrameBufferInfo.md">H3DU.FrameBufferInfo</a> object. </ul> Any or all of these keys can exist in the parameters object. If a value is null or undefined, it is ignored.

#### Return Value

This object. (Type: <a href="H3DU_RenderPass3D.md">H3DU.RenderPass3D</a>)

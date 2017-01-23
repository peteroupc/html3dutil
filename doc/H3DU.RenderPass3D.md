# H3DU.RenderPass3D

[Back to documentation index.](index.md)

 <a name='H3DU.RenderPass3D'></a>
### H3DU.RenderPass3D(subScene, [parameters])

Describes a batch (a scene graph of 3D objects) and options for
rendering that batch.

#### Parameters

* `subScene` (Type: <a href="H3DU.Batch3D.md">H3DU.Batch3D</a>)<br>
    The batch to render using the options described by this object.
* `parameters` (Type: Object) (optional)<br>
    An object whose keys have the possibilities given in H3DU.RenderParams#setParams, and whose values are those allowed for each key.

### Members

* [clearColor](#H3DU.RenderPass3D_clearColor)<br>Whether to clear the color buffer before rendering the batch.
* [clearDepth](#H3DU.RenderPass3D_clearDepth)<br>Whether to clear the depth buffer before rendering the batch.
* [clearStencil](#H3DU.RenderPass3D_clearStencil)<br>Whether to clear the stencil buffer before rendering the batch.
* [frameBuffer](#H3DU.RenderPass3D_frameBuffer)<br>Framebuffer to render to.
* [shader](#H3DU.RenderPass3D_shader)<br>Shader to use.
* [subScene](#H3DU.RenderPass3D_subScene)<br>The batch to render.

### Methods

* [setParams](#H3DU.RenderPass3D_H3DU.RenderPass3D_setParams)<br>Sets parameters for this render pass object.

<a id='H3DU.RenderPass3D_clearColor'></a>
### H3DU.RenderPass3D#clearColor

Whether to clear the color buffer before rendering the batch.

Default Value: `true`

<a id='H3DU.RenderPass3D_clearDepth'></a>
### H3DU.RenderPass3D#clearDepth

Whether to clear the depth buffer before rendering the batch.

Default Value: `true`

<a id='H3DU.RenderPass3D_clearStencil'></a>
### H3DU.RenderPass3D#clearStencil

Whether to clear the stencil buffer before rendering the batch.

Default Value: `true`

<a id='H3DU.RenderPass3D_frameBuffer'></a>
### H3DU.RenderPass3D#frameBuffer

Framebuffer to render to.

Type: <a href="H3DU.FrameBufferInfo.md">H3DU.FrameBufferInfo</a>

Default Value: `null`

<a id='H3DU.RenderPass3D_shader'></a>
### H3DU.RenderPass3D#shader

Shader to use.

Type: <a href="H3DU.ShaderInfo.md">H3DU.ShaderInfo</a>

Default Value: `null`

<a id='H3DU.RenderPass3D_subScene'></a>
### H3DU.RenderPass3D#subScene

The batch to render.

Type: <a href="H3DU.Batch3D.md">H3DU.Batch3D</a>

 <a name='H3DU.RenderPass3D_H3DU.RenderPass3D_setParams'></a>
### H3DU.RenderPass3D#setParams(parameters)

Sets parameters for this render pass object.

#### Parameters

* `parameters` (Type: Object)<br>
    An object whose keys have the possibilities given below, and whose values are those allowed for each key.<ul> <li><code>subScene</code> - The batch to render. An <a href="H3DU.Batch3D.md">H3DU.Batch3D</a> object. <li><code>clearColor</code> - Whether to clear the color buffer before rendering the batch. Either true or false. <li><code>clearDepth</code> - Whether to clear the depth buffer before rendering the batch. Either true or false. <li><code>clearStencil</code> - Whether to clear the stencil buffer before rendering the batch. Either true or false. <li><code>frameBuffer</code> - Framebuffer to render to. An <a href="H3DU.FrameBufferInfo.md">H3DU.FrameBufferInfo</a> object. <li><code>shader</code> - Shader to use. An <a href="H3DU.ShaderInfo.md">H3DU.ShaderInfo</a> object. </ul> Any or all of these keys can exist in the parameters object. If a value is undefined, it is ignored.

#### Return Value

This object. (Type: <a href="H3DU.RenderPass3D.md">H3DU.RenderPass3D</a>)

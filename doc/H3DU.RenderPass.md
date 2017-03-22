# H3DU.RenderPass

[Back to documentation index.](index.md)

<a name='H3DU.RenderPass'></a>
### H3DU.RenderPass(batch, [parameters])

Describes a batch (a scene graph of 3D objects) and options for
rendering that batch.

#### Parameters

* `batch` (Type: <a href="H3DU.Batch3D.md">H3DU.Batch3D</a>)<br>The batch to render using the options described by this object.
* `parameters` (Type: Object) (optional)<br>An object whose keys have the possibilities given in H3DU.RenderParams#setParams, and whose values are those allowed for each key.

### Members

* [batch](#H3DU.RenderPass_batch)<br>The batch to render.
* [clearColor](#H3DU.RenderPass_clearColor)<br>Whether to clear the color buffer before rendering the batch.
* [clearDepth](#H3DU.RenderPass_clearDepth)<br>Whether to clear the depth buffer before rendering the batch.
* [clearStencil](#H3DU.RenderPass_clearStencil)<br>Whether to clear the stencil buffer before rendering the batch.
* [frameBuffer](#H3DU.RenderPass_frameBuffer)<br>Framebuffer to render to.
* [shader](#H3DU.RenderPass_shader)<br>Shader to use.
* [useFrameBufferSize](#H3DU.RenderPass_useFrameBufferSize)<br>Use the dimensions of the given framebuffer rather than those
of the scene rendering it.

### Methods

* [setParams](#H3DU.RenderPass_setParams)<br>Sets parameters for this render pass object.

<a name='H3DU.RenderPass_batch'></a>
### H3DU.RenderPass#batch

The batch to render.

Type: <a href="H3DU.Batch3D.md">H3DU.Batch3D</a>

<a name='H3DU.RenderPass_clearColor'></a>
### H3DU.RenderPass#clearColor

Whether to clear the color buffer before rendering the batch.

Default Value: `true`

<a name='H3DU.RenderPass_clearDepth'></a>
### H3DU.RenderPass#clearDepth

Whether to clear the depth buffer before rendering the batch.

Default Value: `true`

<a name='H3DU.RenderPass_clearStencil'></a>
### H3DU.RenderPass#clearStencil

Whether to clear the stencil buffer before rendering the batch.

Default Value: `true`

<a name='H3DU.RenderPass_frameBuffer'></a>
### H3DU.RenderPass#frameBuffer

Framebuffer to render to.

Type: <a href="H3DU.FrameBufferInfo.md">H3DU.FrameBufferInfo</a>

Default Value: `null`

<a name='H3DU.RenderPass_shader'></a>
### H3DU.RenderPass#shader

Shader to use.

Type: <a href="H3DU.ShaderInfo.md">H3DU.ShaderInfo</a>

Default Value: `null`

<a name='H3DU.RenderPass_useFrameBufferSize'></a>
### H3DU.RenderPass#useFrameBufferSize

Use the dimensions of the given framebuffer rather than those
of the scene rendering it.

Type: boolean

Default Value: `false`

<a name='H3DU.RenderPass_setParams'></a>
### H3DU.RenderPass#setParams(parameters)

Sets parameters for this render pass object.

#### Parameters

* `parameters` (Type: Object)<br>An object whose keys have the possibilities given below, and whose values are those allowed for each key.<ul> <li><code>subScene</code> - The batch to render. An <a href="H3DU.Batch3D.md">H3DU.Batch3D</a> object. <li><code>clearColor</code> - Whether to clear the color buffer before rendering the batch. Either true or false. <li><code>clearDepth</code> - Whether to clear the depth buffer before rendering the batch. Either true or false. <li><code>clearStencil</code> - Whether to clear the stencil buffer before rendering the batch. Either true or false. <li><code>frameBuffer</code> - Framebuffer to render to. An <a href="H3DU.FrameBufferInfo.md">H3DU.FrameBufferInfo</a> object. <li><code>shader</code> - Shader to use. An <a href="H3DU.ShaderInfo.md">H3DU.ShaderInfo</a> object. <li><code>useFrameBufferSize</code> - Use the dimensions of the given framebuffer rather than those of the scene rendering it. </ul> Any or all of these keys can exist in the parameters object. If a value is undefined, it is ignored.

#### Return Value

This object. (Type: <a href="H3DU.RenderPass.md">H3DU.RenderPass</a>)

[Back to documentation index.](index.md)
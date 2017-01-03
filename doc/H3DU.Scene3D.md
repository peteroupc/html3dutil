# H3DU.Scene3D

[Back to documentation index.](index.md)

### H3DU.Scene3D(canvasOrContext) <a id='H3DU.Scene3D'></a>

An object that holds a rendering context for rendering
3D objects.

#### Parameters

* `canvasOrContext` (Type: WebGLRenderingContext | object)<br>
    A WebGL context to associate with this scene, or an HTML canvas element to create a WebGL context from, or an object, such as H3DU.Scene3D, that implements a no-argument <code>getContext</code> method that returns a WebGL context.

### Members

* [.BACK](#H3DU.Scene3D.BACK)<br>Back side of a triangle.
* [.CCW](#H3DU.Scene3D.CCW)<br>Counterclockwise winding.
* [.CW](#H3DU.Scene3D.CW)<br>Clockwise winding, the opposite of counterclockwise winding.
* [.FRONT](#H3DU.Scene3D.FRONT)<br>Front side of a triangle.
* [.FRONT_AND_BACK](#H3DU.Scene3D.FRONT_AND_BACK)<br>Back and front sides of a triangle.
* [.NONE](#H3DU.Scene3D.NONE)<br>No face culling.
* [shapes](#H3DU.Scene3D_shapes)<br><b>Deprecated: Shapes should now be managed in H3DU.Batch3D objects,
 rather than through this class.</b>

### Methods

* [addShape](#H3DU.Scene3D_H3DU.Scene3D_addShape)<br><b>Deprecated: Use the addShape method of individual H3DU.Batch3D instances
instead. For compatibility, existing code that doesn't use H3DU.Batch3D can still call this method until it renders a custom
H3DU.Batch3D. This compatibility behavior may be dropped in the future.</b>
* [clear](#H3DU.Scene3D_H3DU.Scene3D_clear)<br>Clears the color, depth, and stencil buffers used in this scene,
if any
* [clearDepth](#H3DU.Scene3D_H3DU.Scene3D_clearDepth)<br>Clears the depth buffer used in this scene, if any.
* [createBuffer](#H3DU.Scene3D_H3DU.Scene3D_createBuffer)<br>Creates a frame buffer object associated with this scene.
* [cullFace](#H3DU.Scene3D_H3DU.Scene3D_cullFace)<br>Specifies which kinds of triangle faces are culled (not drawn)
when rendering this scene.
* [dispose](#H3DU.Scene3D_H3DU.Scene3D_dispose)<br>Disposes all resources used by this object.
* [frontFace](#H3DU.Scene3D_H3DU.Scene3D_frontFace)<br>Specifies the winding of front faces.
* [getAspect](#H3DU.Scene3D_H3DU.Scene3D_getAspect)<br>Gets the ratio of width to height for this scene (getWidth()
divided by getHeight()).
* [getCanvas](#H3DU.Scene3D_H3DU.Scene3D_getCanvas)<br>Gets the HTML canvas associated with this scene.
* [getClearColor](#H3DU.Scene3D_H3DU.Scene3D_getClearColor)<br>Gets the color used when clearing the screen each frame.
* [getClientAspect](#H3DU.Scene3D_H3DU.Scene3D_getClientAspect)<br>Gets the ratio of width to height for this scene,
as actually displayed on the screen.
* [getContext](#H3DU.Scene3D_H3DU.Scene3D_getContext)<br>Returns the WebGL context associated with this scene.
* [getHeight](#H3DU.Scene3D_H3DU.Scene3D_getHeight)<br>Gets the viewport height for this scene.
* [getLights](#H3DU.Scene3D_H3DU.Scene3D_getLights)<br><b>Deprecated: Use the removeShape method of individual H3DU.Batch3D instances
instead. For compatibility, existing code that doesn't use H3DU.Batch3D can still call this method until it renders a custom
H3DU.Batch3D. This compatibility behavior may be dropped in the future.</b>
* [getProjectionMatrix](#H3DU.Scene3D_H3DU.Scene3D_getProjectionMatrix)<br><b>Deprecated: Use H3DU.Batch3D instead. To get the projection matrix of a Batch3D, call its getProjectionMatrix method. For compatibility, existing code that doesn't use H3DU.Batch3D can still call this method until it renders a custom H3DU.Batch3D. This compatibility behavior may be dropped in the future.</b>
* [getViewMatrix](#H3DU.Scene3D_H3DU.Scene3D_getViewMatrix)<br><b>Deprecated: Use H3DU.Batch3D instead. To get the view matrix of a Batch3D, call its getViewMatrix method. For compatibility, existing code that doesn't use H3DU.Batch3D can still call this method until it renders a custom H3DU.Batch3D. This compatibility behavior may be dropped in the future.</b>
* [getWidth](#H3DU.Scene3D_H3DU.Scene3D_getWidth)<br>Gets the viewport width for this scene.
* [loadAndMapTexture](#H3DU.Scene3D_H3DU.Scene3D_loadAndMapTexture)<br><b>Deprecated: Use the H3DU.TextureLoader method loadAndMapTexturesAll
instead.</b>
* [loadAndMapTextures](#H3DU.Scene3D_H3DU.Scene3D_loadAndMapTextures)<br><b>Deprecated: Use the H3DU.TextureLoader method loadAndMapTexturesAll
instead.</b>
* [loadTexture](#H3DU.Scene3D_H3DU.Scene3D_loadTexture)<br><b>Deprecated: Use the H3DU.TextureLoader method loadTexture or
loadTexturesAll instead.</b>
* [makeShape](#H3DU.Scene3D_H3DU.Scene3D_makeShape)<br><b>Deprecated: Use the H3DU.Shape constructor instead.</b>
* [primitiveCount](#H3DU.Scene3D_H3DU.Scene3D_primitiveCount)<br><b>Deprecated: Use the <code>primitiveCount</code> method of H3DU.Batch3D objects instead. For compatibility, existing code that doesn't use H3DU.Batch3D can still call this method until it renders a custom H3DU.Batch3D. This compatibility behavior may be dropped in the future.</b>
* [removeShape](#H3DU.Scene3D_H3DU.Scene3D_removeShape)<br><b>Deprecated: Use the removeShape method of individual H3DU.Batch3D instances
instead. For compatibility, existing code that doesn't use H3DU.Batch3D can still call this method until it renders a custom
H3DU.Batch3D. This compatibility behavior may be dropped in the future.</b>
* [render](#H3DU.Scene3D_H3DU.Scene3D_render)<br>Renders all shapes added to this scene.
* [setAmbient](#H3DU.Scene3D_H3DU.Scene3D_setAmbient)<br><b>Deprecated: Use the Lights method setAmbient instead and the H3DU.Batch3D method getLights. For compatibility, existing code that doesn't use H3DU.Batch3D can still call this method until it renders a custom H3DU.Batch3D. This compatibility behavior may be dropped in the future.</b>
* [setAutoResize](#H3DU.Scene3D_H3DU.Scene3D_setAutoResize)<br>Sets whether to check whether to resize the canvas
when the render() method is called.
* [setClearColor](#H3DU.Scene3D_H3DU.Scene3D_setClearColor)<br>Sets the color used when clearing the screen each frame.
* [setDimensions](#H3DU.Scene3D_H3DU.Scene3D_setDimensions)<br>Sets the viewport width and height for this scene.
* [setDirectionalLight](#H3DU.Scene3D_H3DU.Scene3D_setDirectionalLight)<br><b>Deprecated: Use the Lights method setDirectionalLight instead and the H3DU.Batch3D method getLights. For compatibility, existing code that doesn't use H3DU.Batch3D can still call this method until it renders a custom H3DU.Batch3D. This compatibility behavior may be dropped in the future.</b>
* [setFrustum](#H3DU.Scene3D_H3DU.Scene3D_setFrustum)<br><b>Deprecated: Instead of this method, use H3DU.Batch3D#setProjectionMatrix in conjunction with H3DU.Math.mat4frustum. For compatibility, existing code that doesn't use H3DU.Batch3D can still call this method until it renders a custom H3DU.Batch3D. This compatibility behavior may be dropped in the future.</b>
* [setLightParams](#H3DU.Scene3D_H3DU.Scene3D_setLightParams)<br><b>Deprecated: Use the Lights method setParams instead and the H3DU.Batch3D method getLights. For compatibility, existing code that doesn't use H3DU.Batch3D can still call this method until it renders a custom H3DU.Batch3D. This compatibility behavior may be dropped in the future.</b>
* [setLookAt](#H3DU.Scene3D_H3DU.Scene3D_setLookAt)<br><b>Deprecated: Instead of this method, use H3DU.Batch3D#setLookAt. For compatibility, existing code that doesn't use H3DU.Batch3D can still call this method until it renders a custom H3DU.Batch3D. This compatibility behavior may be dropped in the future.</b>
* [setOrtho](#H3DU.Scene3D_H3DU.Scene3D_setOrtho)<br><b>Deprecated: Instead of this method, use H3DU.Batch3D#setProjectionMatrix in conjunction with H3DU.Math.mat4ortho. For compatibility, existing code that doesn't use H3DU.Batch3D can still call this method until it renders a custom H3DU.Batch3D. This compatibility behavior may be dropped in the future.</b>
* [setOrtho2D](#H3DU.Scene3D_H3DU.Scene3D_setOrtho2D)<br><b>Deprecated: Instead of this method, use H3DU.Batch3D#setProjectionMatrix in conjunction with H3DU.Math.mat4ortho2d. For compatibility, existing code that doesn't use H3DU.Batch3D can still call this method until it renders a custom H3DU.Batch3D. This compatibility behavior may be dropped in the future.</b>
* [setOrtho2DAspect](#H3DU.Scene3D_H3DU.Scene3D_setOrtho2DAspect)<br><b>Deprecated: Instead of this method, use H3DU.Batch3D#setProjectionMatrix in conjunction with H3DU.Math.mat4ortho2dAspect. For compatibility, existing code that doesn't use H3DU.Batch3D can still call this method until it renders a custom H3DU.Batch3D. This compatibility behavior may be dropped in the future.</b>
* [setOrthoAspect](#H3DU.Scene3D_H3DU.Scene3D_setOrthoAspect)<br><b>Deprecated: Instead of this method, use H3DU.Batch3D#setProjectionMatrix in conjunction with H3DU.Math.mat4orthoAspect. For compatibility, existing code that doesn't use H3DU.Batch3D can still call this method until it renders a custom H3DU.Batch3D. This compatibility behavior may be dropped in the future.</b>
* [setPerspective](#H3DU.Scene3D_H3DU.Scene3D_setPerspective)<br><b>Deprecated: Instead of this method, use H3DU.Batch3D#setProjectionMatrix in conjunction with H3DU.Math.mat4perspective. This compatibility behavior may be dropped in the future.</b>
* [setPointLight](#H3DU.Scene3D_H3DU.Scene3D_setPointLight)<br><b>Deprecated: Use the LightSource method setPointLight instead and the H3DU.Batch3D method getLights. For compatibility, existing code that doesn't use H3DU.Batch3D can still call this method until it renders a custom H3DU.Batch3D. This compatibility behavior may be dropped in the future.</b>
* [setProjectionMatrix](#H3DU.Scene3D_H3DU.Scene3D_setProjectionMatrix)<br><b>Deprecated: Instead of this method, use H3DU.Batch3D#setProjectionMatrix. For compatibility, existing code that doesn't use H3DU.Batch3D can still call this method until it renders a custom H3DU.Batch3D. This compatibility behavior may be dropped in the future.</b>
* [setUseDevicePixelRatio](#H3DU.Scene3D_H3DU.Scene3D_setUseDevicePixelRatio)<br>Sets whether to use the device's pixel ratio (if supported by
the browser) in addition to the canvas's size when setting
the viewport's dimensions.
* [setViewMatrix](#H3DU.Scene3D_H3DU.Scene3D_setViewMatrix)<br><b>Deprecated: Instead of this method, use H3DU.Batch3D#setViewMatrix in conjunction with H3DU.Math.mat4ortho2dAspect. For compatibility, existing code that doesn't use H3DU.Batch3D can still call this method until it renders a custom H3DU.Batch3D. This compatibility behavior may be dropped in the future.</b>
* [useFilter](#H3DU.Scene3D_H3DU.Scene3D_useFilter)<br><b>Deprecated: Use the H3DU.Batch3D.forFilter method to create a batch
for rendering filter effects from a frame buffer.</b>
* [useProgram](#H3DU.Scene3D_H3DU.Scene3D_useProgram)<br><b>Deprecated: Instead of this method, use the "setShader" program of individual shapes
to set the shader programs they use.</b>
* [vertexCount](#H3DU.Scene3D_H3DU.Scene3D_vertexCount)<br><b>Deprecated: Use the vertexCount method of H3DU.Batch3D objects instead. For compatibility, existing code that doesn't use H3DU.Batch3D can still call this method until it renders a custom H3DU.Batch3D. This compatibility behavior may be dropped in the future.</b>

### H3DU.Scene3D.BACK <a id='H3DU.Scene3D.BACK'></a> (constant)

Back side of a triangle. By default, triangles with clockwise winding are back-facing.

### H3DU.Scene3D.CCW <a id='H3DU.Scene3D.CCW'></a> (constant)

Counterclockwise winding. A triangle has counterclockwise winding if
its vertices are ordered such that the path from the first to second to third
to first vertex, in window coordinates (X and Y only), runs counterclockwise.

### H3DU.Scene3D.CW <a id='H3DU.Scene3D.CW'></a> (constant)

Clockwise winding, the opposite of counterclockwise winding.

### H3DU.Scene3D.FRONT <a id='H3DU.Scene3D.FRONT'></a> (constant)

Front side of a triangle. By default, triangles with counterclockwise winding are front-facing.

### H3DU.Scene3D.FRONT_AND_BACK <a id='H3DU.Scene3D.FRONT_AND_BACK'></a> (constant)

Back and front sides of a triangle.

### H3DU.Scene3D.NONE <a id='H3DU.Scene3D.NONE'></a> (constant)

No face culling.

### H3DU.Scene3D#shapes <a id='H3DU.Scene3D_shapes'></a>

<b>Deprecated: Shapes should now be managed in <a href="H3DU.Batch3D.md">H3DU.Batch3D</a> objects,
 rather than through this class.</b>

An array of shapes that are part of the scene.

### H3DU.Scene3D#addShape(shape) <a id='H3DU.Scene3D_H3DU.Scene3D_addShape'></a>

<b>Deprecated: Use the addShape method of individual <a href="H3DU.Batch3D.md">H3DU.Batch3D</a> instances
instead. For compatibility, existing code that doesn't use <a href="H3DU.Batch3D.md">H3DU.Batch3D</a> can still call this method until it renders a custom
H3DU.Batch3D. This compatibility behavior may be dropped in the future.</b>

Adds a 3D shape to this scene. Its reference, not a copy,
will be stored in the 3D scene's list of shapes.
Its parent will be set to no parent.

#### Parameters

* `shape` (Type: <a href="H3DU.Shape.md">H3DU.Shape</a> | <a href="H3DU.ShapeGroup.md">H3DU.ShapeGroup</a>)<br>
    A 3D shape.

#### Return Value

This object. (Type: <a href="H3DU.Scene3D.md">H3DU.Scene3D</a>)

### H3DU.Scene3D#clear() <a id='H3DU.Scene3D_H3DU.Scene3D_clear'></a>

Clears the color, depth, and stencil buffers used in this scene,
if any

#### Return Value

This object. (Type: <a href="H3DU.Scene3D.md">H3DU.Scene3D</a>)

### H3DU.Scene3D#clearDepth() <a id='H3DU.Scene3D_H3DU.Scene3D_clearDepth'></a>

Clears the depth buffer used in this scene, if any.

#### Return Value

This object. (Type: <a href="H3DU.Scene3D.md">H3DU.Scene3D</a>)

### H3DU.Scene3D#createBuffer() <a id='H3DU.Scene3D_H3DU.Scene3D_createBuffer'></a>

Creates a frame buffer object associated with this scene.

#### Return Value

A buffer with the same size as this scene. (Type: <a href="H3DU.FrameBuffer.md">H3DU.FrameBuffer</a>)

### H3DU.Scene3D#cullFace(value) <a id='H3DU.Scene3D_H3DU.Scene3D_cullFace'></a>

Specifies which kinds of triangle faces are culled (not drawn)
when rendering this scene.

#### Parameters

* `value` (Type: Number)<br>
    If this is <a href="H3DU.Scene3D.md#H3DU.Scene3D.BACK">H3DU.Scene3D.BACK</a>, <a href="H3DU.Scene3D.md#H3DU.Scene3D.FRONT">H3DU.Scene3D.FRONT</a>, or <a href="H3DU.Scene3D.md#H3DU.Scene3D.FRONT_AND_BACK">H3DU.Scene3D.FRONT_AND_BACK</a>, enables face culling of the specified faces. For any other value, disables face culling. By default, face culling is disabled.

#### Return Value

This object. (Type: <a href="H3DU.Scene3D.md">H3DU.Scene3D</a>)

### H3DU.Scene3D#dispose() <a id='H3DU.Scene3D_H3DU.Scene3D_dispose'></a>

Disposes all resources used by this object.

#### Return Value

Return value. (Type: Object)

### H3DU.Scene3D#frontFace(value) <a id='H3DU.Scene3D_H3DU.Scene3D_frontFace'></a>

Specifies the winding of front faces.

#### Parameters

* `value` (Type: Number)<br>
    If this is <a href="H3DU.Scene3D.md#H3DU.Scene3D.CW">H3DU.Scene3D.CW</a>, clockwise triangles are front-facing. For any other value, counterclockwise triangles are front-facing, which is the default behavior. If using a left-handed coordinate system, set this value to <a href="H3DU.Scene3D.md#H3DU.Scene3D.CW">H3DU.Scene3D.CW</a>.

#### Return Value

This object. (Type: <a href="H3DU.Scene3D.md">H3DU.Scene3D</a>)

### H3DU.Scene3D#getAspect() <a id='H3DU.Scene3D_H3DU.Scene3D_getAspect'></a>

Gets the ratio of width to height for this scene (getWidth()
divided by getHeight()).
Note that if auto-resizing is enabled, this value may change
after each call to the render() method.

#### Return Value

Aspect ratio, or 1 if height is 0. (Type: Number)

### H3DU.Scene3D#getCanvas() <a id='H3DU.Scene3D_H3DU.Scene3D_getCanvas'></a>

Gets the HTML canvas associated with this scene.

#### Return Value

Return value. (Type: Object)

### H3DU.Scene3D#getClearColor() <a id='H3DU.Scene3D_H3DU.Scene3D_getClearColor'></a>

Gets the color used when clearing the screen each frame.

#### Return Value

An array of four numbers, from 0 through
 1, specifying the red, green, blue, and alpha components of the color. (Type: Array.&lt;Number>)

### H3DU.Scene3D#getClientAspect() <a id='H3DU.Scene3D_H3DU.Scene3D_getClientAspect'></a>

Gets the ratio of width to height for this scene,
as actually displayed on the screen.

#### Return Value

Aspect ratio, or 1 if height is 0. (Type: Number)

### H3DU.Scene3D#getContext() <a id='H3DU.Scene3D_H3DU.Scene3D_getContext'></a>

Returns the WebGL context associated with this scene.

#### Return Value

Return value. (Type: WebGLRenderingContext)

### H3DU.Scene3D#getHeight() <a id='H3DU.Scene3D_H3DU.Scene3D_getHeight'></a>

Gets the viewport height for this scene.
Note that if auto-resizing is enabled, this value may change
after each call to the render() method.

#### Return Value

Return value. (Type: Number)

### H3DU.Scene3D#getLights() <a id='H3DU.Scene3D_H3DU.Scene3D_getLights'></a>

<b>Deprecated: Use the removeShape method of individual <a href="H3DU.Batch3D.md">H3DU.Batch3D</a> instances
instead. For compatibility, existing code that doesn't use <a href="H3DU.Batch3D.md">H3DU.Batch3D</a> can still call this method until it renders a custom
H3DU.Batch3D. This compatibility behavior may be dropped in the future.</b>

Gets the light sources used in this scene.

#### Return Value

The light sources used in this scene. (Type: <a href="H3DU.Lights.md">H3DU.Lights</a>)

### H3DU.Scene3D#getProjectionMatrix() <a id='H3DU.Scene3D_H3DU.Scene3D_getProjectionMatrix'></a>

<b>Deprecated: Use <a href="H3DU.Batch3D.md">H3DU.Batch3D</a> instead. To get the projection matrix of a Batch3D, call its getProjectionMatrix method. For compatibility, existing code that doesn't use <a href="H3DU.Batch3D.md">H3DU.Batch3D</a> can still call this method until it renders a custom H3DU.Batch3D. This compatibility behavior may be dropped in the future.</b>

Gets the current projection matrix for this scene.

#### Return Value

Return value. (Type: Array.&lt;Number>)

### H3DU.Scene3D#getViewMatrix() <a id='H3DU.Scene3D_H3DU.Scene3D_getViewMatrix'></a>

<b>Deprecated: Use <a href="H3DU.Batch3D.md">H3DU.Batch3D</a> instead. To get the view matrix of a Batch3D, call its getViewMatrix method. For compatibility, existing code that doesn't use <a href="H3DU.Batch3D.md">H3DU.Batch3D</a> can still call this method until it renders a custom H3DU.Batch3D. This compatibility behavior may be dropped in the future.</b>

Gets the current view matrix for this scene.

#### Return Value

Return value. (Type: Array.&lt;Number>)

### H3DU.Scene3D#getWidth() <a id='H3DU.Scene3D_H3DU.Scene3D_getWidth'></a>

Gets the viewport width for this scene.
Note that if auto-resizing is enabled, this value may change
after each call to the render() method.

#### Return Value

Return value. (Type: Number)

### H3DU.Scene3D#loadAndMapTexture(texture) <a id='H3DU.Scene3D_H3DU.Scene3D_loadAndMapTexture'></a>

<b>Deprecated: Use the H3DU.TextureLoader method loadAndMapTexturesAll
instead.</b>

Loads a texture from an image URL and uploads it
to a texture buffer object.

#### Parameters

* `texture` (Type: string | <a href="H3DU.Texture.md">H3DU.Texture</a>)<br>
    String giving the URL of the image to load, or an H3DU.Texture object whose data may or may not be loaded.

#### Return Value

A promise that is resolved when
the image is loaded successfully and uploaded
to a texture buffer (the result will be an H3DU.Texture
object), and is rejected when an error occurs. (Type: <a href="Promise.md">Promise</a>)

### H3DU.Scene3D#loadAndMapTextures(textureFiles, [resolve], [reject]) <a id='H3DU.Scene3D_H3DU.Scene3D_loadAndMapTextures'></a>

<b>Deprecated: Use the H3DU.TextureLoader method loadAndMapTexturesAll
instead.</b>

Loads one or more textures from an image URL and uploads each of them
to a texture buffer object.

#### Parameters

* `textureFiles` (Type: Array.&lt;String>)<br>
    A list of URLs of the image to load.
* `resolve` (Type: function) (optional)<br>
    Called for each URL that is loaded successfully and uploaded to a texture buffer (the argument will be an H3DU.Texture object.)
* `reject` (Type: function) (optional)<br>
    Called for each URL for which an error occurs (the argument will be the data passed upon rejection).

#### Return Value

A promise that is resolved when
all the URLs in the textureFiles array are either resolved or rejected.
The result will be an object with three properties:
"successes", "failures", and "results".
See <a href="H3DU.md#H3DU.getPromiseResults">H3DU.getPromiseResults</a>. (Type: <a href="Promise.md">Promise</a>)

### H3DU.Scene3D#loadTexture(name) <a id='H3DU.Scene3D_H3DU.Scene3D_loadTexture'></a>

<b>Deprecated: Use the H3DU.TextureLoader method loadTexture or
loadTexturesAll instead.</b>

Loads a texture from an image URL.

#### Parameters

* `name` (Type: String)<br>
    URL of the image to load.

#### Return Value

A promise that is resolved when
the image is loaded successfully (the result will be an H3DU.Texture
object), and is rejected when an error occurs. (Type: <a href="Promise.md">Promise</a>)

### H3DU.Scene3D#makeShape(mesh) <a id='H3DU.Scene3D_H3DU.Scene3D_makeShape'></a>

<b>Deprecated: Use the H3DU.Shape constructor instead.</b>

Creates a buffer from a geometric mesh and
returns a shape object.

#### Parameters

* `mesh` (Type: <a href="H3DU.Mesh.md">H3DU.Mesh</a>)<br>
    A geometric mesh object. The shape created will use the mesh in its current state and won't track future changes.

#### Return Value

The generated shape object. (Type: <a href="H3DU.Shape.md">H3DU.Shape</a>)

### H3DU.Scene3D#primitiveCount() <a id='H3DU.Scene3D_H3DU.Scene3D_primitiveCount'></a>

<b>Deprecated: Use the <code>primitiveCount</code> method of <a href="H3DU.Batch3D.md">H3DU.Batch3D</a> objects instead. For compatibility, existing code that doesn't use <a href="H3DU.Batch3D.md">H3DU.Batch3D</a> can still call this method until it renders a custom H3DU.Batch3D. This compatibility behavior may be dropped in the future.</b>

Gets the number of primitives (triangles, lines,
and points) composed by all shapes in this scene.

#### Return Value

Return value. (Type: Number)

### H3DU.Scene3D#removeShape(shape) <a id='H3DU.Scene3D_H3DU.Scene3D_removeShape'></a>

<b>Deprecated: Use the removeShape method of individual <a href="H3DU.Batch3D.md">H3DU.Batch3D</a> instances
instead. For compatibility, existing code that doesn't use <a href="H3DU.Batch3D.md">H3DU.Batch3D</a> can still call this method until it renders a custom
H3DU.Batch3D. This compatibility behavior may be dropped in the future.</b>

Removes all instances of a 3D shape from this scene.

#### Parameters

* `shape` (Type: <a href="H3DU.Shape.md">H3DU.Shape</a> | <a href="H3DU.ShapeGroup.md">H3DU.ShapeGroup</a>)<br>
    The 3D shape to remove.

#### Return Value

This object. (Type: <a href="H3DU.Scene3D.md">H3DU.Scene3D</a>)

### H3DU.Scene3D#render(renderPasses) <a id='H3DU.Scene3D_H3DU.Scene3D_render'></a>

Renders all shapes added to this scene.
 This is usually called in a render loop, such
 as <a href="H3DU.md#H3DU.renderLoop">H3DU.renderLoop</a>.

NOTE: For compatibility, the "render" function with a null or omitted parameter will clear the color
buffer and depth buffer. This compatibility option may be dropped in the future.

#### Parameters

* `renderPasses` (Type: Array.&lt;<a href="H3DU.RenderPass3D.md">H3DU.RenderPass3D</a>> | <a href="H3DU.Batch3D.md">H3DU.Batch3D</a>)<br>
    An array of scenes to draw, or a single batch to render. Can be null.

#### Return Value

This object. (Type: <a href="H3DU.Scene3D.md">H3DU.Scene3D</a>)

### H3DU.Scene3D#setAmbient(r, g, b, [a]) <a id='H3DU.Scene3D_H3DU.Scene3D_setAmbient'></a>

<b>Deprecated: Use the Lights method setAmbient instead and the <a href="H3DU.Batch3D.md">H3DU.Batch3D</a> method getLights. For compatibility, existing code that doesn't use <a href="H3DU.Batch3D.md">H3DU.Batch3D</a> can still call this method until it renders a custom H3DU.Batch3D. This compatibility behavior may be dropped in the future.</b>

Sets the color of the scene's ambient light.

#### Parameters

* `r` (Type: Array.&lt;Number> | number | string)<br>
    Array of three or four color components; or the red color component (0-1); or a string specifying an <a href="H3DU.md#H3DU.toGLColor">HTML or CSS color</a>.
* `g` (Type: Number)<br>
    Green color component (0-1). May be null or omitted if a string or array is given as the "r" parameter.
* `b` (Type: Number)<br>
    Blue color component (0-1). May be null or omitted if a string or array is given as the "r" parameter.
* `a` (Type: Number) (optional)<br>
    Alpha color component (0-1). Currently not used.

#### Return Value

This object. (Type: <a href="H3DU.Scene3D.md">H3DU.Scene3D</a>)

### H3DU.Scene3D#setAutoResize(value) <a id='H3DU.Scene3D_H3DU.Scene3D_setAutoResize'></a>

Sets whether to check whether to resize the canvas
when the render() method is called.

#### Parameters

* `value` (Type: Boolean)<br>
    If true, will check whether to resize the canvas when the render() method is called. Default is true.

#### Return Value

This object. (Type: <a href="H3DU.Scene3D.md">H3DU.Scene3D</a>)

### H3DU.Scene3D#setClearColor(r, g, b, [a]) <a id='H3DU.Scene3D_H3DU.Scene3D_setClearColor'></a>

Sets the color used when clearing the screen each frame.
This color is black by default.

#### Parameters

* `r` (Type: Array.&lt;Number> | number | string)<br>
    Array of three or four color components; or the red color component (0-1); or a string specifying an <a href="H3DU.md#H3DU.toGLColor">HTML or CSS color</a>.
* `g` (Type: Number)<br>
    Green color component (0-1). May be null or omitted if a string or array is given as the "r" parameter.
* `b` (Type: Number)<br>
    Blue color component (0-1). May be null or omitted if a string or array is given as the "r" parameter.
* `a` (Type: Number) (optional)<br>
    Alpha color component (0-1). If the "r" parameter is given and this parameter is null or omitted, this value is treated as 1.0.

#### Return Value

This object. (Type: <a href="H3DU.Scene3D.md">H3DU.Scene3D</a>)

### H3DU.Scene3D#setDimensions(width, height) <a id='H3DU.Scene3D_H3DU.Scene3D_setDimensions'></a>

Sets the viewport width and height for this scene.

#### Parameters

* `width` (Type: Number)<br>
    Width of the scene, in pixels. Will be rounded up.
* `height` (Type: Number)<br>
    Height of the scene, in pixels. Will be rounded up.

#### Return Value

Return value. (Type: Number)

### H3DU.Scene3D#setDirectionalLight(index, position, [diffuse], [specular]) <a id='H3DU.Scene3D_H3DU.Scene3D_setDirectionalLight'></a>

<b>Deprecated: Use the Lights method setDirectionalLight instead and the <a href="H3DU.Batch3D.md">H3DU.Batch3D</a> method getLights. For compatibility, existing code that doesn't use <a href="H3DU.Batch3D.md">H3DU.Batch3D</a> can still call this method until it renders a custom H3DU.Batch3D. This compatibility behavior may be dropped in the future.</b>

Sets a light source in this scene to a directional light.

#### Parameters

* `index` (Type: Number)<br>
    Zero-based index of the light to set. The first light has index 0, the second has index 1, and so on. Will be created if the light doesn't exist.
* `position` (Type: Array.&lt;Number>)<br>
    A 3-element vector giving the direction of the light, along the X, Y, and Z axes, respectively. May be null, in which case the default is (0, 0, 1).
* `diffuse` (Type: Array.&lt;Number>) (optional)<br>
    A <a href="H3DU.md#H3DU.toGLColor">color vector or string</a> giving the diffuse color of the light. If null or omitted, the default is (1, 1, 1, 1) for light index 0 and (0, 0, 0, 0) otherwise.
* `specular` (Type: Array.&lt;Number>) (optional)<br>
    A <a href="H3DU.md#H3DU.toGLColor">color vector or string</a> giving the color of specular highlights caused by the light. If null or omitted, the default is (1, 1, 1) for light index 0 and (0, 0, 0) otherwise.

#### Return Value

This object. (Type: <a href="H3DU.Scene3D.md">H3DU.Scene3D</a>)

### H3DU.Scene3D#setFrustum(left, right, bottom, top, near, far) <a id='H3DU.Scene3D_H3DU.Scene3D_setFrustum'></a>

<b>Deprecated: Instead of this method, use H3DU.Batch3D#setProjectionMatrix in conjunction with <a href="H3DU.Math.md#H3DU.Math.mat4frustum">H3DU.Math.mat4frustum</a>. For compatibility, existing code that doesn't use <a href="H3DU.Batch3D.md">H3DU.Batch3D</a> can still call this method until it renders a custom H3DU.Batch3D. This compatibility behavior may be dropped in the future.</b>

Sets this scene's projection matrix to a perspective projection that defines
the view frustum, or the limits in the camera's view.

For considerations when choosing the "near" and "far" parameters,
see <a href="H3DU.Math.md#H3DU.Math.mat4perspective">H3DU.Math.mat4perspective</a>.

#### Parameters

* `left` (Type: Number)<br>
    X-coordinate of the point where the left clipping plane meets the near clipping plane.
* `right` (Type: Number)<br>
    X-coordinate of the point where the right clipping plane meets the near clipping plane.
* `bottom` (Type: Number)<br>
    Y-coordinate of the point where the bottom clipping plane meets the near clipping plane.
* `top` (Type: Number)<br>
    Y-coordinate of the point where the top clipping plane meets the near clipping plane.
* `near` (Type: Number)<br>
    The distance from the camera to the near clipping plane. Objects closer than this distance won't be seen.
* `far` (Type: Number)<br>
    The distance from the camera to the far clipping plane. Objects beyond this distance will be too far to be seen.

#### Return Value

This object. (Type: <a href="H3DU.Scene3D.md">H3DU.Scene3D</a>)

### H3DU.Scene3D#setLightParams(index, params) <a id='H3DU.Scene3D_H3DU.Scene3D_setLightParams'></a>

<b>Deprecated: Use the Lights method setParams instead and the <a href="H3DU.Batch3D.md">H3DU.Batch3D</a> method getLights. For compatibility, existing code that doesn't use <a href="H3DU.Batch3D.md">H3DU.Batch3D</a> can still call this method until it renders a custom H3DU.Batch3D. This compatibility behavior may be dropped in the future.</b>

Sets parameters for a light in this scene.

#### Parameters

* `index` (Type: Number)<br>
    Zero-based index of the light to set. The first light has index 0, the second has index 1, and so on. Will be created if the light doesn't exist.
* `params` (Type: Object)<br>
    An object as described in H3DU.LightSource.setParams.

#### Return Value

This object. (Type: <a href="H3DU.Scene3D.md">H3DU.Scene3D</a>)

### H3DU.Scene3D#setLookAt(eye, [center], [up]) <a id='H3DU.Scene3D_H3DU.Scene3D_setLookAt'></a>

<b>Deprecated: Instead of this method, use H3DU.Batch3D#setLookAt. For compatibility, existing code that doesn't use <a href="H3DU.Batch3D.md">H3DU.Batch3D</a> can still call this method until it renders a custom H3DU.Batch3D. This compatibility behavior may be dropped in the future.</b>

Sets this scene's view matrix to represent a camera view.
This method takes a camera's position (<code>eye</code>), and the point the camera is viewing
(<code>center</code>).

#### Parameters

* `eye` (Type: Array.&lt;Number>)<br>
    A 3-element vector specifying the camera position in world space.
* `center` (Type: Array.&lt;Number>) (optional)<br>
    A 3-element vector specifying the point in world space that the camera is looking at. May be null or omitted, in which case the default is the coordinates (0,0,0).
* `up` (Type: Array.&lt;Number>) (optional)<br>
    A 3-element vector specifying the direction from the center of the camera to its top. This parameter may be null or omitted, in which case the default is the vector (0, 1, 0), the vector that results when the camera is held upright. This vector must not point in the same or opposite direction as the camera's view direction. (For best results, rotate the vector (0, 1, 0) so it points perpendicular to the camera's view direction.)

#### Return Value

This object. (Type: <a href="H3DU.Scene3D.md">H3DU.Scene3D</a>)

### H3DU.Scene3D#setOrtho(left, right, bottom, top, near, far) <a id='H3DU.Scene3D_H3DU.Scene3D_setOrtho'></a>

<b>Deprecated: Instead of this method, use H3DU.Batch3D#setProjectionMatrix in conjunction with <a href="H3DU.Math.md#H3DU.Math.mat4ortho">H3DU.Math.mat4ortho</a>. For compatibility, existing code that doesn't use <a href="H3DU.Batch3D.md">H3DU.Batch3D</a> can still call this method until it renders a custom H3DU.Batch3D. This compatibility behavior may be dropped in the future.</b>

Sets this scene's projection matrix to an orthographic projection.
In this projection, the left clipping plane is parallel to the right clipping
plane and the top to the bottom.

#### Parameters

* `left` (Type: Number)<br>
    Leftmost coordinate of the 3D view.
* `right` (Type: Number)<br>
    Rightmost coordinate of the 3D view. (Note that right can be greater than left or vice versa.)
* `bottom` (Type: Number)<br>
    Bottommost coordinate of the 3D view.
* `top` (Type: Number)<br>
    Topmost coordinate of the 3D view. (Note that top can be greater than bottom or vice versa.)
* `near` (Type: Number)<br>
    Distance from the camera to the near clipping plane. A positive value means the plane is in front of the viewer.
* `far` (Type: Number)<br>
    Distance from the camera to the far clipping plane. A positive value means the plane is in front of the viewer. (Note that near can be greater than far or vice versa.) The absolute difference between near and far should be as small as the application can accept.

#### Return Value

This object. (Type: <a href="H3DU.Scene3D.md">H3DU.Scene3D</a>)

### H3DU.Scene3D#setOrtho2D(left, right, bottom, top) <a id='H3DU.Scene3D_H3DU.Scene3D_setOrtho2D'></a>

<b>Deprecated: Instead of this method, use H3DU.Batch3D#setProjectionMatrix in conjunction with <a href="H3DU.Math.md#H3DU.Math.mat4ortho2d">H3DU.Math.mat4ortho2d</a>. For compatibility, existing code that doesn't use <a href="H3DU.Batch3D.md">H3DU.Batch3D</a> can still call this method until it renders a custom H3DU.Batch3D. This compatibility behavior may be dropped in the future.</b>

Sets this scene's projection matrix to a 2D orthographic projection.
The near and far clipping planes will be set to -1 and 1, respectively.

#### Parameters

* `left` (Type: Number)<br>
    Leftmost coordinate of the 2D view.
* `right` (Type: Number)<br>
    Rightmost coordinate of the 2D view. (Note that right can be greater than left or vice versa.)
* `bottom` (Type: Number)<br>
    Bottommost coordinate of the 2D view.
* `top` (Type: Number)<br>
    Topmost coordinate of the 2D view. (Note that top can be greater than bottom or vice versa.)

#### Return Value

This object. (Type: <a href="H3DU.Scene3D.md">H3DU.Scene3D</a>)

### H3DU.Scene3D#setOrtho2DAspect(left, right, bottom, top, [aspect]) <a id='H3DU.Scene3D_H3DU.Scene3D_setOrtho2DAspect'></a>

<b>Deprecated: Instead of this method, use H3DU.Batch3D#setProjectionMatrix in conjunction with <a href="H3DU.Math.md#H3DU.Math.mat4ortho2dAspect">H3DU.Math.mat4ortho2dAspect</a>. For compatibility, existing code that doesn't use <a href="H3DU.Batch3D.md">H3DU.Batch3D</a> can still call this method until it renders a custom H3DU.Batch3D. This compatibility behavior may be dropped in the future.</b>

Sets this scene's projection matrix to a 2D orthographic projection.
The near and far clipping planes will be set to -1 and 1, respectively.

If the view rectangle's aspect ratio doesn't match the desired aspect
ratio, the view rectangle will be centered on the 3D scene's viewport
or otherwise moved and scaled so as to keep the entire view rectangle visible without stretching
or squishing it.

#### Parameters

* `left` (Type: Number)<br>
    Leftmost coordinate of the view rectangle.
* `right` (Type: Number)<br>
    Rightmost coordinate of the view rectangle. (Note that right can be greater than left or vice versa.)
* `bottom` (Type: Number)<br>
    Bottommost coordinate of the view rectangle.
* `top` (Type: Number)<br>
    Topmost coordinate of the view rectangle. (Note that top can be greater than bottom or vice versa.)
* `aspect` (Type: Number) (optional)<br>
    Desired aspect ratio of the viewport (ratio of width to height). If null or omitted, uses this scene's aspect ratio instead.

#### Return Value

This object. (Type: <a href="H3DU.Scene3D.md">H3DU.Scene3D</a>)

### H3DU.Scene3D#setOrthoAspect(left, right, bottom, top, near, far, [aspect]) <a id='H3DU.Scene3D_H3DU.Scene3D_setOrthoAspect'></a>

<b>Deprecated: Instead of this method, use H3DU.Batch3D#setProjectionMatrix in conjunction with <a href="H3DU.Math.md#H3DU.Math.mat4orthoAspect">H3DU.Math.mat4orthoAspect</a>. For compatibility, existing code that doesn't use <a href="H3DU.Batch3D.md">H3DU.Batch3D</a> can still call this method until it renders a custom H3DU.Batch3D. This compatibility behavior may be dropped in the future.</b>

Sets this scene's projection matrix to an orthographic projection.
In this projection, the left clipping plane is parallel to the right clipping
plane and the top to the bottom.

If the view rectangle's aspect ratio doesn't match the desired aspect
ratio, the view rectangle will be centered on the 3D scene's viewport
or otherwise moved and scaled so as to keep the entire view rectangle visible without stretching
or squishing it.

#### Parameters

* `left` (Type: Number)<br>
    Leftmost coordinate of the view rectangle.
* `right` (Type: Number)<br>
    Rightmost coordinate of the view rectangle. (Note that right can be greater than left or vice versa.)
* `bottom` (Type: Number)<br>
    Bottommost coordinate of the view rectangle.
* `top` (Type: Number)<br>
    Topmost coordinate of the view rectangle. (Note that top can be greater than bottom or vice versa.)
* `near` (Type: Number)<br>
    Distance from the camera to the near clipping plane. A positive value means the plane is in front of the viewer.
* `far` (Type: Number)<br>
    Distance from the camera to the far clipping plane. A positive value means the plane is in front of the viewer. (Note that near can be greater than far or vice versa.) The absolute difference between near and far should be as small as the application can accept.
* `aspect` (Type: Number) (optional)<br>
    Desired aspect ratio of the viewport (ratio of width to height). If null or omitted, uses this scene's aspect ratio instead.

#### Return Value

This object. (Type: <a href="H3DU.Scene3D.md">H3DU.Scene3D</a>)

### H3DU.Scene3D#setPerspective(fov, aspect, near, far) <a id='H3DU.Scene3D_H3DU.Scene3D_setPerspective'></a>

<b>Deprecated: Instead of this method, use H3DU.Batch3D#setProjectionMatrix in conjunction with <a href="H3DU.Math.md#H3DU.Math.mat4perspective">H3DU.Math.mat4perspective</a>. This compatibility behavior may be dropped in the future.</b>

Sets this scene's projection matrix to a perspective projection.

For considerations when choosing the "near" and "far" parameters,
see <a href="H3DU.Math.md#H3DU.Math.mat4perspective">H3DU.Math.mat4perspective</a>.

#### Parameters

* `fov` (Type: Number)<br>
    Y-axis field of view, in degrees. Should be less than 180 degrees. (The smaller this number, the bigger close objects appear to be. As a result, zooming out can be implemented by raising this value, and zooming in by lowering it.)
* `aspect` (Type: Number)<br>
    The ratio of width to height of the viewport, usually the scene's aspect ratio (getAspect() or getClientAspect()).
* `near` (Type: Number)<br>
    The distance from the camera to the near clipping plane. Objects closer than this distance won't be seen.
* `far` (Type: Number)<br>
    The distance from the camera to the far clipping plane. Objects beyond this distance will be too far to be seen.

#### Return Value

This object. (Type: <a href="H3DU.Scene3D.md">H3DU.Scene3D</a>)

#### Example

    // Set the perspective projection. Camera has a 45-degree field of view
    // and will see objects from 0.1 to 100 units away.
    scene.setPerspective(45,scene.getClientAspect(),0.1,100);

### H3DU.Scene3D#setPointLight(index, position, [diffuse], [specular]) <a id='H3DU.Scene3D_H3DU.Scene3D_setPointLight'></a>

<b>Deprecated: Use the LightSource method setPointLight instead and the <a href="H3DU.Batch3D.md">H3DU.Batch3D</a> method getLights. For compatibility, existing code that doesn't use <a href="H3DU.Batch3D.md">H3DU.Batch3D</a> can still call this method until it renders a custom H3DU.Batch3D. This compatibility behavior may be dropped in the future.</b>

Sets a light source in this scene to a point light.

#### Parameters

* `index` (Type: Number)<br>
    Zero-based index of the light to set. The first light has index 0, the second has index 1, and so on.
* `position` (Type: Array.&lt;Number>)<br>
    Light position. (See <a href="H3DU.LightSource.md#H3DU.LightSource_position">H3DU.LightSource#position</a>.)
* `diffuse` (Type: Array.&lt;Number>) (optional)<br>
    A <a href="H3DU.md#H3DU.toGLColor">color vector or string</a> giving the diffuse color of the light. If null or omitted, the default is (1, 1, 1, 1) for light index 0 and (0, 0, 0, 0) otherwise.
* `specular` (Type: Array.&lt;Number>) (optional)<br>
    A <a href="H3DU.md#H3DU.toGLColor">color vector or string</a> giving the color of specular highlights caused by the light. If null or omitted, the default is (1, 1, 1) for light index 0 and (0, 0, 0) otherwise.

#### Return Value

This object. (Type: <a href="H3DU.Scene3D.md">H3DU.Scene3D</a>)

### H3DU.Scene3D#setProjectionMatrix(matrix) <a id='H3DU.Scene3D_H3DU.Scene3D_setProjectionMatrix'></a>

<b>Deprecated: Instead of this method, use H3DU.Batch3D#setProjectionMatrix. For compatibility, existing code that doesn't use <a href="H3DU.Batch3D.md">H3DU.Batch3D</a> can still call this method until it renders a custom H3DU.Batch3D. This compatibility behavior may be dropped in the future.</b>

Sets the projection matrix for this object. The projection
matrix can also be set using the H3DU.Scene3D#setFrustum, H3DU.Scene3D#setOrtho,
H3DU.Scene3D#setOrtho2D, and H3DU.Scene3D#setPerspective methods.

#### Parameters

* `matrix` (Type: Array.&lt;Number>)<br>
    A 16-element matrix (4x4).

#### Return Value

This object. (Type: <a href="H3DU.Scene3D.md">H3DU.Scene3D</a>)

### H3DU.Scene3D#setUseDevicePixelRatio(value) <a id='H3DU.Scene3D_H3DU.Scene3D_setUseDevicePixelRatio'></a>

Sets whether to use the device's pixel ratio (if supported by
the browser) in addition to the canvas's size when setting
the viewport's dimensions.

When this value changes, the H3DU.Scene3D will automatically
adjust the viewport.

#### Parameters

* `value` (Type: Boolean)<br>
    If true, use the device's pixel ratio when setting the viewport's dimensions. Default is true.

#### Return Value

This object. (Type: <a href="H3DU.Scene3D.md">H3DU.Scene3D</a>)

### H3DU.Scene3D#setViewMatrix(matrix) <a id='H3DU.Scene3D_H3DU.Scene3D_setViewMatrix'></a>

<b>Deprecated: Instead of this method, use H3DU.Batch3D#setViewMatrix in conjunction with <a href="H3DU.Math.md#H3DU.Math.mat4ortho2dAspect">H3DU.Math.mat4ortho2dAspect</a>. For compatibility, existing code that doesn't use <a href="H3DU.Batch3D.md">H3DU.Batch3D</a> can still call this method until it renders a custom H3DU.Batch3D. This compatibility behavior may be dropped in the future.</b>

Sets this scene's view matrix. The view matrix can also
be set using the H3DU.Scene3D#setLookAt method.

#### Parameters

* `matrix` (Type: Array.&lt;Number>)<br>
    A 16-element matrix (4x4).

#### Return Value

This object. (Type: <a href="H3DU.Scene3D.md">H3DU.Scene3D</a>)

### H3DU.Scene3D#useFilter(filterProgram) <a id='H3DU.Scene3D_H3DU.Scene3D_useFilter'></a>

<b>Deprecated: Use the <a href="H3DU.Batch3D.md#H3DU.Batch3D.forFilter">H3DU.Batch3D.forFilter</a> method to create a batch
for rendering filter effects from a frame buffer.</b>

Has no effect. (Previously, used a shader program to apply a texture filter after the
scene is rendered.)

#### Parameters

* `filterProgram` (Type: <a href="H3DU.ShaderProgram.md">H3DU.ShaderProgram</a> | string | null)<br>
    Not used.

#### Return Value

This object. (Type: <a href="H3DU.Scene3D.md">H3DU.Scene3D</a>)

### H3DU.Scene3D#useProgram(program) <a id='H3DU.Scene3D_H3DU.Scene3D_useProgram'></a>

<b>Deprecated: Instead of this method, use the "setShader" program of individual shapes
to set the shader programs they use.</b>

Has no effect. (In previous versions, this method changed
the active shader program for this scene
and prepared this object for the new program.)

#### Parameters

* `program` (Type: <a href="H3DU.ShaderProgram.md">H3DU.ShaderProgram</a> | null)<br>
    No longer used.

#### Return Value

This object. (Type: <a href="H3DU.Scene3D.md">H3DU.Scene3D</a>)

### H3DU.Scene3D#vertexCount() <a id='H3DU.Scene3D_H3DU.Scene3D_vertexCount'></a>

<b>Deprecated: Use the vertexCount method of <a href="H3DU.Batch3D.md">H3DU.Batch3D</a> objects instead. For compatibility, existing code that doesn't use <a href="H3DU.Batch3D.md">H3DU.Batch3D</a> can still call this method until it renders a custom H3DU.Batch3D. This compatibility behavior may be dropped in the future.</b>

Gets the number of vertices composed by
all shapes in this scene.

#### Return Value

Return value. (Type: Number)

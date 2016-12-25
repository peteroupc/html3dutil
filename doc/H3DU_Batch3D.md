# H3DU.Batch3D

[Back to documentation index.](index.md)

### H3DU.Batch3D() <a id='H3DU_Batch3D'></a>

A `Batch3D` represents a so-called "scene graph". It holds
3D objects which will be drawn to the screen, as well as the camera&#39;s projection, the camera&#39;s
position, and light sources to illuminate the 3D scene.

### Methods

* [.forFilter](#H3DU_Batch3D_forFilter)
* [addShape](#H3DU_Batch3D_H3DU_Batch3D_addShape)
* [getLights](#H3DU_Batch3D_H3DU_Batch3D_getLights)
* [getProjectionMatrix](#H3DU_Batch3D_H3DU_Batch3D_getProjectionMatrix)
* [getViewMatrix](#H3DU_Batch3D_H3DU_Batch3D_getViewMatrix)
* [ortho2DAspect](#H3DU_Batch3D_H3DU_Batch3D_ortho2DAspect)
* [orthoAspect](#H3DU_Batch3D_H3DU_Batch3D_orthoAspect)
* [perspectiveAspect](#H3DU_Batch3D_H3DU_Batch3D_perspectiveAspect)
* [primitiveCount](#H3DU_Batch3D_H3DU_Batch3D_primitiveCount)
* [removeShape](#H3DU_Batch3D_H3DU_Batch3D_removeShape)
* [render](#H3DU_Batch3D_H3DU_Batch3D_render)
* [setLookAt](#H3DU_Batch3D_H3DU_Batch3D_setLookAt)
* [setProjectionMatrix](#H3DU_Batch3D_H3DU_Batch3D_setProjectionMatrix)
* [setViewMatrix](#H3DU_Batch3D_H3DU_Batch3D_setViewMatrix)
* [vertexCount](#H3DU_Batch3D_H3DU_Batch3D_vertexCount)

### H3DU.Batch3D.forFilter(scene, fbo, shader) <a id='H3DU_Batch3D_forFilter'></a>

Creates a batch whose purpose is to render the contents
of a frame buffer using a particular shader. This is often used
to apply a graphics filter to that frame buffer's contents.
See the <a href="tutorial-filters.md">Graphics Filters</a> tutorial.

#### Parameters

* `scene` (Type: <a href="H3DU_Scene3D.md">H3DU.Scene3D</a>)<br>
    Scene to associate with the returned batch.
* `fbo` (Type: <a href="H3DU_FrameBufferInfo.md">H3DU.FrameBufferInfo</a>)<br>
    Identifies a frame buffer whose contents will be rendered to the batch.
* `shader` (Type: <a href="H3DU_ShaderInfo.md">H3DU.ShaderInfo</a>)<br>
    Contains information about the shader to use when rendering the contents of the frame buffer

#### Return Value

The created batch. (Type: <a href="H3DU_Batch3D.md">H3DU.Batch3D</a>)

### H3DU.Batch3D#addShape(shape) <a id='H3DU_Batch3D_H3DU_Batch3D_addShape'></a>

Adds a 3D shape to this batch of shapes. Its reference, not a copy,
will be stored in the 3D scene's list of shapes.
Its parent will be set to no parent.

#### Parameters

* `shape` (Type: <a href="H3DU_Shape.md">H3DU.Shape</a> | <a href="H3DU_ShapeGroup.md">H3DU.ShapeGroup</a>)<br>
    A 3D shape.

#### Return Value

This object. (Type: <a href="H3DU_Batch3D.md">H3DU.Batch3D</a>)

### H3DU.Batch3D#getLights() <a id='H3DU_Batch3D_H3DU_Batch3D_getLights'></a>

Gets the light sources used by this batch.

#### Return Value

Return value. (Type: <a href="H3DU_Lights.md">H3DU.Lights</a>)

### H3DU.Batch3D#getProjectionMatrix() <a id='H3DU_Batch3D_H3DU_Batch3D_getProjectionMatrix'></a>

Gets the current projection matrix for this batch of shapes.

#### Return Value

A 4x4 matrix used as the current
projection matrix. (Type: Array.&lt;Number>)

### H3DU.Batch3D#getViewMatrix() <a id='H3DU_Batch3D_H3DU_Batch3D_getViewMatrix'></a>

Gets the current view matrix for this batch of shapes.

#### Return Value

Return value. (Type: Array.&lt;Number>)

### H3DU.Batch3D#ortho2DAspect(l, r, b, t) <a id='H3DU_Batch3D_H3DU_Batch3D_ortho2DAspect'></a>

Uses a 2D orthographic projection for this batch. It will be adjusted
to the scene's aspect ratio each time this batch is rendered.

The near and far clipping planes will be set to -1 and 1, respectively.

If the view rectangle's aspect ratio doesn't match the desired aspect
ratio, the view rectangle will be centered on the 3D scene's viewport
or otherwise moved and scaled so as to keep the entire view rectangle visible without stretching
or squishing it.

#### Parameters

* `l` (Type: Number)<br>
    Leftmost coordinate of the view rectangle.
* `r` (Type: Number)<br>
    Rightmost coordinate of the view rectangle. (Note that right can be greater than left or vice versa.)
* `b` (Type: Number)<br>
    Bottommost coordinate of the view rectangle.
* `t` (Type: Number)<br>
    Topmost coordinate of the view rectangle. (Note that top can be greater than bottom or vice versa.)

#### Return Value

This object. (Type: <a href="H3DU_Batch3D.md">H3DU.Batch3D</a>)

### H3DU.Batch3D#orthoAspect(l, r, b, t, e, f) <a id='H3DU_Batch3D_H3DU_Batch3D_orthoAspect'></a>

Uses an orthographic projection for this batch. It will be adjusted
to the scene's aspect ratio each time this batch is rendered.

In this projection, the left clipping plane is parallel to the right clipping
plane and the top to the bottom.

If the view rectangle's aspect ratio doesn't match the desired aspect
ratio, the view rectangle will be centered on the 3D scene's viewport
or otherwise moved and scaled so as to keep the entire view rectangle visible without stretching
or squishing it.

#### Parameters

* `l` (Type: Number)<br>
    Leftmost coordinate of the view rectangle.
* `r` (Type: Number)<br>
    Rightmost coordinate of the view rectangle. (Note that right can be greater than left or vice versa.)
* `b` (Type: Number)<br>
    Bottommost coordinate of the view rectangle.
* `t` (Type: Number)<br>
    Topmost coordinate of the view rectangle. (Note that top can be greater than bottom or vice versa.)
* `e` (Type: Number)<br>
    Distance from the camera to the near clipping plane. A positive value means the plane is in front of the viewer.
* `f` (Type: Number)<br>
    Distance from the camera to the far clipping plane. A positive value means the plane is in front of the viewer. (Note that near can be greater than far or vice versa.) The absolute difference between near and far should be as small as the application can accept.

#### Return Value

This object. (Type: <a href="H3DU_Batch3D.md">H3DU.Batch3D</a>)

### H3DU.Batch3D#perspectiveAspect(fov, near, far) <a id='H3DU_Batch3D_H3DU_Batch3D_perspectiveAspect'></a>

Uses a perspective projection for this batch. It will be adjusted
to the scene's aspect ratio each time this batch is rendered.

For considerations when choosing the "near" and "far" parameters,
see @{link H3DU.Math.mat4perspective}.

#### Parameters

* `fov` (Type: Number)<br>
    Y-axis field of view, in degrees. Should be less than 180 degrees. (The smaller this number, the bigger close objects appear to be. As a result, zooming out can be implemented by raising this value, and zooming in by lowering it.)
* `near` (Type: Number)<br>
    The distance from the camera to the near clipping plane. Objects closer than this distance won't be seen.
* `far` (Type: Number)<br>
    The distance from the camera to the far clipping plane. Objects beyond this distance will be too far to be seen.

#### Return Value

This object. (Type: <a href="H3DU_Batch3D.md">H3DU.Batch3D</a>)

### H3DU.Batch3D#primitiveCount() <a id='H3DU_Batch3D_H3DU_Batch3D_primitiveCount'></a>

Gets the number of primitives (triangles, lines,
and points) composed by all shapes in this batch of shapes.

#### Return Value

Return value. (Type: Number)

### H3DU.Batch3D#removeShape(shape) <a id='H3DU_Batch3D_H3DU_Batch3D_removeShape'></a>

Removes all instances of a 3D shape from this batch of shapes.

#### Parameters

* `shape` (Type: <a href="H3DU_Shape.md">H3DU.Shape</a> | <a href="H3DU_ShapeGroup.md">H3DU.ShapeGroup</a>)<br>
    The 3D shape to remove.

#### Return Value

This object. (Type: <a href="H3DU_Batch3D.md">H3DU.Batch3D</a>)

### H3DU.Batch3D#render(scene) <a id='H3DU_Batch3D_H3DU_Batch3D_render'></a>

Renders this batch using the given scene object.

#### Parameters

* `scene` (Type: Object)<br>
    Description of scene.

#### Return Value

This object. (Type: <a href="H3DU_Batch3D.md">H3DU.Batch3D</a>)

### H3DU.Batch3D#setLookAt(eye, [center], [up]) <a id='H3DU_Batch3D_H3DU_Batch3D_setLookAt'></a>

Sets this batch's view matrix to represent a camera view.
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

This object. (Type: <a href="H3DU_Batch3D.md">H3DU.Batch3D</a>)

### H3DU.Batch3D#setProjectionMatrix(mat) <a id='H3DU_Batch3D_H3DU_Batch3D_setProjectionMatrix'></a>

Sets the projection matrix for this batch.

#### Parameters

* `mat` (Type: Array.&lt;Number>)<br>
    A 16-element matrix (4x4).

#### Return Value

This object. (Type: <a href="H3DU_Batch3D.md">H3DU.Batch3D</a>)

### H3DU.Batch3D#setViewMatrix(mat) <a id='H3DU_Batch3D_H3DU_Batch3D_setViewMatrix'></a>

Sets the current view matrix for this batch of shapes.

#### Parameters

* `mat` (Type: Array.&lt;Number>)<br>
    A 4x4 matrix to use as the view matrix.

#### Return Value

This object. (Type: <a href="H3DU_Batch3D.md">H3DU.Batch3D</a>)

### H3DU.Batch3D#vertexCount() <a id='H3DU_Batch3D_H3DU_Batch3D_vertexCount'></a>

Gets the number of vertices composed by
all shapes in this batch of shapes.

#### Return Value

Return value. (Type: Number)

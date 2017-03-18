# H3DU.Batch3D

[Back to documentation index.](index.md)

<a name='H3DU.Batch3D'></a>
### H3DU.Batch3D()

A `Batch3D` represents a so-called "scene graph". It holds
3D objects which will be drawn to the screen, as well as the camera&#39;s projection, the camera&#39;s
position, and light sources to illuminate the 3D scene.

#### Parameters

### Methods

* [addShape](#H3DU.Batch3D_addShape)<br>Adds a 3D shape to this batch of shapes, at the end of the list
of shapes.
* [forFilter](#H3DU.Batch3D.forFilter)<br>Creates a batch whose purpose is to render the contents
of a frame buffer using a particular shader.
* [getLights](#H3DU.Batch3D_getLights)<br>Gets the light sources used by this batch.
* [getProjectionMatrix](#H3DU.Batch3D_getProjectionMatrix)<br>Gets the current projection matrix for this batch of shapes.
* [getProjectionViewMatrix](#H3DU.Batch3D_getProjectionViewMatrix)<br>Gets the current projection matrix multiplied by the current
view matrix for this batch of shapes.
* [getShape](#H3DU.Batch3D_getShape)<br>Gets the shape or shape group located
in this batch at the given index.
* [getViewMatrix](#H3DU.Batch3D_getViewMatrix)<br>Gets the current view matrix for this batch of shapes.
* [ortho2DAspect](#H3DU.Batch3D_ortho2DAspect)<br>Uses a 2D orthographic projection for this batch.
* [orthoAspect](#H3DU.Batch3D_orthoAspect)<br>Uses an orthographic projection for this batch.
* [perspectiveAspect](#H3DU.Batch3D_perspectiveAspect)<br>Uses a perspective projection for this batch.
* [primitiveCount](#H3DU.Batch3D_primitiveCount)<br>Gets the number of primitives (triangles, lines,
and points) composed by all shapes in this batch of shapes.
* [removeShape](#H3DU.Batch3D_removeShape)<br>Removes all instances of a 3D shape from this batch of shapes.
* [setLookAt](#H3DU.Batch3D_setLookAt)<br>Sets this batch's view matrix to represent a camera view.
* [setProjectionMatrix](#H3DU.Batch3D_setProjectionMatrix)<br>Sets the projection matrix for this batch.
* [setShape](#H3DU.Batch3D_setShape)<br>Sets a shape or shape group at the given index in this batch.
* [setViewMatrix](#H3DU.Batch3D_setViewMatrix)<br>Sets the current view matrix for this batch of shapes.
* [shapeCount](#H3DU.Batch3D_shapeCount)<br>Returns the number of shapes and/or shape groups that
are direct children of this batch.
* [vertexCount](#H3DU.Batch3D_vertexCount)<br>Gets the number of vertices composed by
all shapes in this batch of shapes.

<a name='H3DU.Batch3D_addShape'></a>
### H3DU.Batch3D#addShape(shape)

Adds a 3D shape to this batch of shapes, at the end of the list
of shapes. Its reference, not a copy,
will be stored in the 3D scene's list of shapes.
Its parent will be set to no parent.

#### Parameters

* `shape` (Type: <a href="H3DU.Shape.md">H3DU.Shape</a> | <a href="H3DU.ShapeGroup.md">H3DU.ShapeGroup</a>)<br>A 3D shape. Throws an error if null.

#### Return Value

This object. (Type: <a href="H3DU.Batch3D.md">H3DU.Batch3D</a>)

<a name='H3DU.Batch3D.forFilter'></a>
### (static) H3DU.Batch3D.forFilter(scene, fbo, shader)

Creates a batch whose purpose is to render the contents
of a frame buffer using a particular shader. This is often used
to apply a graphics filter to that frame buffer's contents.
See the <a href="tutorial-filters.md">Graphics Filters</a> tutorial.

#### Parameters

* `scene` (Type: <a href="H3DU.Scene3D.md">H3DU.Scene3D</a>)<br>Scene to associate with the returned batch.
* `fbo` (Type: <a href="H3DU.FrameBufferInfo.md">H3DU.FrameBufferInfo</a>)<br>Identifies a frame buffer whose contents will be rendered to the batch.
* `shader` (Type: <a href="H3DU.ShaderInfo.md">H3DU.ShaderInfo</a>)<br>Contains information about the shader to use when rendering the contents of the frame buffer

#### Return Value

The created batch. (Type: <a href="H3DU.Batch3D.md">H3DU.Batch3D</a>)

<a name='H3DU.Batch3D_getLights'></a>
### H3DU.Batch3D#getLights()

Gets the light sources used by this batch.

#### Return Value

Return value. (Type: <a href="H3DU.Lights.md">H3DU.Lights</a>)

<a name='H3DU.Batch3D_getProjectionMatrix'></a>
### H3DU.Batch3D#getProjectionMatrix()

Gets the current projection matrix for this batch of shapes.

#### Return Value

A 4x4 matrix used as the current
projection matrix. (Type: Array.&lt;number>)

<a name='H3DU.Batch3D_getProjectionViewMatrix'></a>
### H3DU.Batch3D#getProjectionViewMatrix()

Gets the current projection matrix multiplied by the current
view matrix for this batch of shapes.

#### Return Value

A 4x4 matrix used as the current
projection-view matrix. (Type: Array.&lt;number>)

<a name='H3DU.Batch3D_getShape'></a>
### H3DU.Batch3D#getShape(index)

Gets the shape or shape group located
in this batch at the given index.

#### Parameters

* `index` (Type: number)<br>Integer index, starting from 0, of the shape or shape group to set.

#### Return Value

The shape or shape group located
in this batch at the given index, or null if none is found there. (Type: <a href="H3DU.Shape.md">H3DU.Shape</a> | <a href="H3DU.ShapeGroup.md">H3DU.ShapeGroup</a>)

<a name='H3DU.Batch3D_getViewMatrix'></a>
### H3DU.Batch3D#getViewMatrix()

Gets the current view matrix for this batch of shapes.

#### Return Value

Return value. (Type: Array.&lt;number>)

<a name='H3DU.Batch3D_ortho2DAspect'></a>
### H3DU.Batch3D#ortho2DAspect(l, r, b, t)

Uses a 2D orthographic projection for this batch. It will be adjusted
to the scene's aspect ratio each time this batch is rendered.

The near and far clipping planes will be set to -1 and 1, respectively.

If the view rectangle's aspect ratio doesn't match the desired aspect
ratio, the view rectangle will be centered on the 3D scene's viewport
or otherwise moved and scaled so as to keep the entire view rectangle visible without stretching
or squishing it.

#### Parameters

* `l` (Type: number)<br>Leftmost coordinate of the view rectangle.
* `r` (Type: number)<br>Rightmost coordinate of the view rectangle. (Note that right can be greater than left or vice versa.)
* `b` (Type: number)<br>Bottommost coordinate of the view rectangle.
* `t` (Type: number)<br>Topmost coordinate of the view rectangle. (Note that top can be greater than bottom or vice versa.)

#### Return Value

This object. (Type: <a href="H3DU.Batch3D.md">H3DU.Batch3D</a>)

<a name='H3DU.Batch3D_orthoAspect'></a>
### H3DU.Batch3D#orthoAspect(l, r, b, t, e, f)

Uses an orthographic projection for this batch. It will be adjusted
to the scene's aspect ratio each time this batch is rendered.

In this projection, the left clipping plane is parallel to the right clipping
plane and the top to the bottom.

If the view rectangle's aspect ratio doesn't match the desired aspect
ratio, the view rectangle will be centered on the 3D scene's viewport
or otherwise moved and scaled so as to keep the entire view rectangle visible without stretching
or squishing it.

#### Parameters

* `l` (Type: number)<br>Leftmost coordinate of the view rectangle.
* `r` (Type: number)<br>Rightmost coordinate of the view rectangle. (Note that right can be greater than left or vice versa.)
* `b` (Type: number)<br>Bottommost coordinate of the view rectangle.
* `t` (Type: number)<br>Topmost coordinate of the view rectangle. (Note that top can be greater than bottom or vice versa.)
* `e` (Type: number)<br>Distance from the camera to the near clipping plane. A positive value means the plane is in front of the viewer.
* `f` (Type: number)<br>Distance from the camera to the far clipping plane. A positive value means the plane is in front of the viewer. (Note that near can be greater than far or vice versa.) The absolute difference between near and far should be as small as the application can accept.

#### Return Value

This object. (Type: <a href="H3DU.Batch3D.md">H3DU.Batch3D</a>)

<a name='H3DU.Batch3D_perspectiveAspect'></a>
### H3DU.Batch3D#perspectiveAspect(fov, near, far)

Uses a perspective projection for this batch. It will be adjusted
to the scene's aspect ratio each time this batch is rendered.

For considerations when choosing the "near" and "far" parameters,
see <a href="H3DU.Math.md#H3DU.Math.mat4perspective">H3DU.Math.mat4perspective</a>.

#### Parameters

* `fov` (Type: number)<br>Y axis field of view, in degrees. Should be less than 180 degrees. (The smaller this number, the bigger close objects appear to be. As a result, zooming out can be implemented by raising this value, and zooming in by lowering it.)
* `near` (Type: number)<br>The distance from the camera to the near clipping plane. Objects closer than this distance won't be seen.
* `far` (Type: number)<br>The distance from the camera to the far clipping plane. Objects beyond this distance will be too far to be seen.

#### Return Value

This object. (Type: <a href="H3DU.Batch3D.md">H3DU.Batch3D</a>)

<a name='H3DU.Batch3D_primitiveCount'></a>
### H3DU.Batch3D#primitiveCount()

Gets the number of primitives (triangles, lines,
and points) composed by all shapes in this batch of shapes.

#### Return Value

Return value. (Type: number)

<a name='H3DU.Batch3D_removeShape'></a>
### H3DU.Batch3D#removeShape(shape)

Removes all instances of a 3D shape from this batch of shapes.

#### Parameters

* `shape` (Type: <a href="H3DU.Shape.md">H3DU.Shape</a> | <a href="H3DU.ShapeGroup.md">H3DU.ShapeGroup</a>)<br>The 3D shape to remove.

#### Return Value

This object. (Type: <a href="H3DU.Batch3D.md">H3DU.Batch3D</a>)

<a name='H3DU.Batch3D_setLookAt'></a>
### H3DU.Batch3D#setLookAt(eye, [center], [up])

Sets this batch's view matrix to represent a camera view.
This method takes a camera's position (<code>eye</code>), and the point the camera is viewing
(<code>center</code>).

#### Parameters

* `eye` (Type: Array.&lt;number>)<br>A 3-element vector specifying the camera position in world space.
* `center` (Type: Array.&lt;number>) (optional)<br>A 3-element vector specifying the point in world space that the camera is looking at. May be null or omitted, in which case the default is the coordinates (0,0,0).
* `up` (Type: Array.&lt;number>) (optional)<br>A 3-element vector specifying the direction from the center of the camera to its top. This parameter may be null or omitted, in which case the default is the vector (0, 1, 0), the vector that results when the camera is held upright. This vector must not point in the same or opposite direction as the camera's view direction. (For best results, rotate the vector (0, 1, 0) so it points perpendicular to the camera's view direction.)

#### Return Value

This object. (Type: <a href="H3DU.Batch3D.md">H3DU.Batch3D</a>)

<a name='H3DU.Batch3D_setProjectionMatrix'></a>
### H3DU.Batch3D#setProjectionMatrix(mat)

Sets the projection matrix for this batch.

#### Parameters

* `mat` (Type: Array.&lt;number>)<br>A 16-element matrix (4x4).

#### Return Value

This object. (Type: <a href="H3DU.Batch3D.md">H3DU.Batch3D</a>)

<a name='H3DU.Batch3D_setShape'></a>
### H3DU.Batch3D#setShape(index, shape)

Sets a shape or shape group at the given index in this batch.

#### Parameters

* `index` (Type: number)<br>Integer index, starting from 0, to set the shape or shape group at.
* `shape` (Type: <a href="H3DU.Shape.md">H3DU.Shape</a> | <a href="H3DU.ShapeGroup.md">H3DU.ShapeGroup</a>)<br>Shape object to set at the given index.

#### Return Value

This object. (Type: <a href="H3DU.Batch3D.md">H3DU.Batch3D</a>)

<a name='H3DU.Batch3D_setViewMatrix'></a>
### H3DU.Batch3D#setViewMatrix(mat)

Sets the current view matrix for this batch of shapes.

#### Parameters

* `mat` (Type: Array.&lt;number>)<br>A 4x4 matrix to use as the view matrix.

#### Return Value

This object. (Type: <a href="H3DU.Batch3D.md">H3DU.Batch3D</a>)

<a name='H3DU.Batch3D_shapeCount'></a>
### H3DU.Batch3D#shapeCount()

Returns the number of shapes and/or shape groups that
are direct children of this batch.

#### Return Value

Return value. (Type: number)

<a name='H3DU.Batch3D_vertexCount'></a>
### H3DU.Batch3D#vertexCount()

Gets the number of vertices composed by
all shapes in this batch of shapes.

#### Return Value

Return value. (Type: number)

[Back to documentation index.](index.md)

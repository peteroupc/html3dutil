# MatrixStack

[Back to documentation index.](index.md)

<a name='MatrixStack'></a>
### MatrixStack()

**Deprecated: Use H3DU.MatrixStack instead.**

Alias for the H3DU.MatrixStack class.

### Methods

* [frustum](#MatrixStack_frustum)<br>Modifies the matrix at the top of this stack by multiplying it by
a frustum matrix.
* [get](#MatrixStack_get)<br>Gets a copy of the matrix at the top of this stack.
* [loadIdentity](#MatrixStack_loadIdentity)<br>Modifies the matrix at the top of this stack by replacing it with the identity matrix.
* [loadMatrix](#MatrixStack_loadMatrix)<br>Modifies the matrix at the top of this stack by replacing it with the given matrix.
* [loadTransposeMatrix](#MatrixStack_loadTransposeMatrix)<br>Modifies the matrix at the top of this stack by replacing it with the
transpose of the given matrix.
* [lookAt](#MatrixStack_lookAt)<br>Modifies the matrix at the top of this stack by multiplying it by
a matrix representing a camera view.
* [multMatrix](#MatrixStack_multMatrix)<br>Modifies the matrix at the top of this stack by multiplying it by another matrix.
* [multTransposeMatrix](#MatrixStack_multTransposeMatrix)<br><b>Deprecated: Use <code>multMatrix(H3DU.MathUtil.mat4transpose(mat))</code> instead.</b>
* [ortho](#MatrixStack_ortho)<br>Modifies the matrix at the top of this stack by multiplying it by
an orthographic projection.
* [ortho2d](#MatrixStack_ortho2d)<br>Modifies the matrix at the top of this stack by multiplying it by
a 2D orthographic projection.
* [perspective](#MatrixStack_perspective)<br>Modifies the matrix at the top of this stack by multiplying it by
a matrix that defines a perspective projection.
* [pickMatrix](#MatrixStack_pickMatrix)<br>Modifies the matrix at the top of this stack by multiplying it by
a matrix that transforms the view to a portion of the viewport.
* [popMatrix](#MatrixStack_popMatrix)<br>Removes the matrix at the top of this stack, making
the matrix beneath it the new top matrix.
* [pushMatrix](#MatrixStack_pushMatrix)<br>Makes a copy of the matrix at the top of this stack
and puts the copy on top of the stack.
* [rotate](#MatrixStack_rotate)<br>Modifies the matrix at the top of this stack by multiplying it by a rotation transformation.
* [scale](#MatrixStack_scale)<br>Modifies the matrix at the top of this stack by multiplying it by a
scaling transformation.
* [translate](#MatrixStack_translate)<br>Modifies the matrix at the top of this stack by multiplying it by a
translation transformation.

<a name='MatrixStack_frustum'></a>
### MatrixStack#frustum(l, r, b, t, n, f)

Modifies the matrix at the top of this stack by multiplying it by
a frustum matrix.
This method is designed for enabling a <a href="tutorial-glmath.md">right-handed coordinate system</a>.

#### Parameters

* `l` (Type: number)<br>X coordinate of the point where the left clipping plane meets the near clipping plane.
* `r` (Type: number)<br>X coordinate of the point where the right clipping plane meets the near clipping plane.
* `b` (Type: number)<br>Y coordinate of the point where the bottom clipping plane meets the near clipping plane.
* `t` (Type: number)<br>Y coordinate of the point where the top clipping plane meets the near clipping plane.
* `n` (Type: number)<br>The distance from the camera to the near clipping plane. Objects closer than this distance won't be seen. This should be slightly greater than 0.
* `f` (Type: number)<br>The distance from the camera to the far clipping plane. Objects beyond this distance will be too far to be seen.

#### Return Value

This object. (Type: H3DU.MatrixStack)

<a name='MatrixStack_get'></a>
### MatrixStack#get()

Gets a copy of the matrix at the top of this stack.

#### Return Value

. (Type: Array.&lt;number>)

<a name='MatrixStack_loadIdentity'></a>
### MatrixStack#loadIdentity()

Modifies the matrix at the top of this stack by replacing it with the identity matrix.

#### Return Value

This object. (Type: H3DU.MatrixStack)

<a name='MatrixStack_loadMatrix'></a>
### MatrixStack#loadMatrix(mat)

Modifies the matrix at the top of this stack by replacing it with the given matrix.

#### Parameters

* `mat` (Type: Array.&lt;number>)<br>A matrix to replace the top of the stack with.

#### Return Value

This object. (Type: H3DU.MatrixStack)

<a name='MatrixStack_loadTransposeMatrix'></a>
### MatrixStack#loadTransposeMatrix(mat)

Modifies the matrix at the top of this stack by replacing it with the
transpose of the given matrix.

#### Parameters

* `mat` (Type: Array.&lt;number>)<br>A matrix whose transpose will replace the top of the stack.

#### Return Value

This object. (Type: H3DU.MatrixStack)

<a name='MatrixStack_lookAt'></a>
### MatrixStack#lookAt(ex, ey, ez, cx, cy, cz, ux, uy, uz)

Modifies the matrix at the top of this stack by multiplying it by
a matrix representing a camera view.
This method is designed for enabling a <a href="tutorial-glmath.md">right-handed coordinate system</a>.

#### Parameters

* `ex` (Type: number)<br>X coordinate of the camera position in world space.
* `ey` (Type: number)<br>Y coordinate of the camera position.
* `ez` (Type: number)<br>Z coordinate of the camera position.
* `cx` (Type: number)<br>X coordinate of the position in world space that the camera is looking at.
* `cy` (Type: number)<br>Y coordinate of the position looked at.
* `cz` (Type: number)<br>Z coordinate of the position looked at.
* `ux` (Type: number)<br>X coordinate of the up direction vector. This vector must not point in the same or opposite direction as the camera's view direction.
* `uy` (Type: number)<br>Y coordinate of the up vector.
* `uz` (Type: number)<br>Z coordinate of the up vector.

#### Return Value

This object. (Type: H3DU.MatrixStack)

<a name='MatrixStack_multMatrix'></a>
### MatrixStack#multMatrix(mat)

Modifies the matrix at the top of this stack by multiplying it by another matrix.
The matrices are multiplied such that the transformations
they describe happen in reverse order. For example, if the matrix
at the top of the stack describes a translation and the matrix
passed to this method describes a scaling, the multiplied matrix will describe
the effect of scaling then translation.

#### Parameters

* `mat` (Type: Array.&lt;number>)<br>A matrix to multiply the current one by.

#### Return Value

This object. (Type: H3DU.MatrixStack)

<a name='MatrixStack_multTransposeMatrix'></a>
### MatrixStack#multTransposeMatrix(mat)

<b>Deprecated: Use <code>multMatrix(H3DU.MathUtil.mat4transpose(mat))</code> instead.</b>

Modifies the matrix at the top of this stack by multiplying it by the transpose of
another matrix.

#### Parameters

* `mat` (Type: Array.&lt;number>)<br>A matrix whose transpose the current matrix will be multiplied by.

#### Return Value

This object. (Type: H3DU.MatrixStack)

<a name='MatrixStack_ortho'></a>
### MatrixStack#ortho(l, r, b, t, n, f)

Modifies the matrix at the top of this stack by multiplying it by
an orthographic projection.
In this projection, the left clipping plane is parallel to the right clipping
plane and the top to the bottom.

This method is designed for enabling a <a href="tutorial-glmath.md">right-handed coordinate system</a>.

#### Parameters

* `l` (Type: number)<br>Leftmost coordinate of the 3D view.
* `r` (Type: number)<br>Rightmost coordinate of the 3D view. (Note that r can be greater than l or vice versa.)
* `b` (Type: number)<br>Bottommost coordinate of the 3D view.
* `t` (Type: number)<br>Topmost coordinate of the 3D view. (Note that t can be greater than b or vice versa.)
* `n` (Type: number)<br>Distance from the camera to the near clipping plane. A positive value means the plane is in front of the viewer.
* `f` (Type: number)<br>Distance from the camera to the far clipping plane. A positive value means the plane is in front of the viewer.

#### Return Value

This object. (Type: H3DU.MatrixStack)

<a name='MatrixStack_ortho2d'></a>
### MatrixStack#ortho2d(l, r, b, t)

Modifies the matrix at the top of this stack by multiplying it by
a 2D orthographic projection.
This method is designed for enabling a <a href="tutorial-glmath.md">right-handed coordinate system</a>.

#### Parameters

* `l` (Type: number)<br>Leftmost coordinate of the 2D view.
* `r` (Type: number)<br>Rightmost coordinate of the 2D view. (Note that r can be greater than l or vice versa.)
* `b` (Type: number)<br>Bottommost coordinate of the 2D view.
* `t` (Type: number)<br>Topmost coordinate of the 2D view. (Note that t can be greater than b or vice versa.)

#### Return Value

This object. (Type: H3DU.MatrixStack)

<a name='MatrixStack_perspective'></a>
### MatrixStack#perspective(fov, aspect, n, f)

Modifies the matrix at the top of this stack by multiplying it by
a matrix that defines a perspective projection.

This method is designed for enabling a <a href="tutorial-glmath.md">right-handed coordinate system</a>.

#### Parameters

* `fov` (Type: number)<br>Vertical field of view, in degrees. Should be less than 180 degrees. (The smaller this number, the bigger close objects appear to be. As a result, zoom can be implemented by multiplying field of view by an additional factor.)
* `aspect` (Type: number)<br>The ratio of width to height of the viewport, usually the scene's aspect ratio.
* `n` (Type: number)<br>The distance from the camera to the near clipping plane. Objects closer than this distance won't be seen. This should be slightly greater than 0.
* `f` (Type: number)<br>The distance from the camera to the far clipping plane. Objects beyond this distance will be too far to be seen.

#### Return Value

This object. (Type: H3DU.MatrixStack)

<a name='MatrixStack_pickMatrix'></a>
### MatrixStack#pickMatrix(wx, wy, ww, wh, vp)

Modifies the matrix at the top of this stack by multiplying it by
a matrix that transforms the view to a portion of the viewport.

#### Parameters

* `wx` (Type: number)<br>X coordinate of the center of the desired viewport portion.
* `wy` (Type: number)<br>Y coordinate of the center of the desired viewport portion.
* `ww` (Type: number)<br>Width of the desired viewport portion.
* `wh` (Type: number)<br>Height of the desired viewport portion.
* `vp` (Type: Array.&lt;number>)<br>A 4-element array giving the X and Y coordinates of the lower left corner followed by the width and height of a rectangle indicating the current viewport.

#### Return Value

This object. (Type: H3DU.MatrixStack)

<a name='MatrixStack_popMatrix'></a>
### MatrixStack#popMatrix()

Removes the matrix at the top of this stack, making
the matrix beneath it the new top matrix. Has no
effect if the stack has only one matrix.

#### Return Value

This object. (Type: H3DU.MatrixStack)

<a name='MatrixStack_pushMatrix'></a>
### MatrixStack#pushMatrix()

Makes a copy of the matrix at the top of this stack
and puts the copy on top of the stack.

#### Return Value

This object. (Type: H3DU.MatrixStack)

<a name='MatrixStack_rotate'></a>
### MatrixStack#rotate(angle, x, y, z)

Modifies the matrix at the top of this stack by multiplying it by a rotation transformation.

#### Parameters

* `angle` (Type: number)<br>The desired angle to rotate in degrees. If the axis of rotation points toward the viewer, the angle's value is increasing in a counterclockwise direction.
* `x` (Type: number)<br>X-component of the axis of rotation.
* `y` (Type: number)<br>Y-component of the axis of rotation.
* `z` (Type: number)<br>Z-component of the axis of rotation.

#### Return Value

This object. (Type: H3DU.MatrixStack)

<a name='MatrixStack_scale'></a>
### MatrixStack#scale(x, y, z)

Modifies the matrix at the top of this stack by multiplying it by a
scaling transformation.

#### Parameters

* `x` (Type: number)<br>Scale factor along the X axis.
* `y` (Type: number)<br>Scale factor along the Y axis.
* `z` (Type: number)<br>Scale factor along the Z axis.

#### Return Value

This object. (Type: H3DU.MatrixStack)

<a name='MatrixStack_translate'></a>
### MatrixStack#translate(x, y, z)

Modifies the matrix at the top of this stack by multiplying it by a
translation transformation.

#### Parameters

* `x` (Type: number)<br>Translation along the X axis.
* `y` (Type: number)<br>Translation along the Y axis.
* `z` (Type: number)<br>Translation along the Z axis.

#### Return Value

This object. (Type: H3DU.MatrixStack)

[Back to documentation index.](index.md)

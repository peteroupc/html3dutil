# module:extras/matrixstack.MatrixStack

[Back to documentation index.](index.md)

<a name='extras_matrixstack.MatrixStack'></a>
### new module:extras/matrixstack.MatrixStack()

This class implements a stack
of 4 &times; 4 transformation matrices.

When the constructor is called, it will create a stack whose
only element is the identity matrix.

### Methods

* [frustum](#extras_matrixstack_MatrixStack_frustum)<br>Modifies the matrix at the top of this stack by multiplying it by
a frustum matrix.
* [get](#extras_matrixstack_MatrixStack_get)<br>Gets a copy of the matrix at the top of this stack.
* [loadIdentity](#extras_matrixstack_MatrixStack_loadIdentity)<br>Modifies the matrix at the top of this stack by replacing it with the identity matrix.
* [loadMatrix](#extras_matrixstack_MatrixStack_loadMatrix)<br>Modifies the matrix at the top of this stack by replacing it with the given matrix.
* [loadTransposeMatrix](#extras_matrixstack_MatrixStack_loadTransposeMatrix)<br>Modifies the matrix at the top of this stack by replacing it with the
transpose of the given matrix.
* [lookAt](#extras_matrixstack_MatrixStack_lookAt)<br>Modifies the matrix at the top of this stack by multiplying it by
a matrix representing a "camera" view.
* [multMatrix](#extras_matrixstack_MatrixStack_multMatrix)<br>Modifies the matrix at the top of this stack by multiplying it by another matrix.
* [multTransposeMatrix](#extras_matrixstack_MatrixStack_multTransposeMatrix)<br>Modifies the matrix at the top of this stack by multiplying it by the transpose of another matrix.
* [ortho](#extras_matrixstack_MatrixStack_ortho)<br>Modifies the matrix at the top of this stack by multiplying it by
an orthographic projection matrix.
* [ortho2d](#extras_matrixstack_MatrixStack_ortho2d)<br>Modifies the matrix at the top of this stack by multiplying it by
a 2D orthographic projection matrix.
* [perspective](#extras_matrixstack_MatrixStack_perspective)<br>Modifies the matrix at the top of this stack by multiplying it by
a matrix that defines a perspective projection.
* [pickMatrix](#extras_matrixstack_MatrixStack_pickMatrix)<br>Modifies the matrix at the top of this stack by multiplying it by
a matrix that transforms the view to a portion of the viewport.
* [popMatrix](#extras_matrixstack_MatrixStack_popMatrix)<br>Removes the matrix at the top of this stack, making
the matrix beneath it the new top matrix.
* [pushMatrix](#extras_matrixstack_MatrixStack_pushMatrix)<br>Makes a copy of the matrix at the top of this stack
and puts the copy on top of the stack.
* [rotate](#extras_matrixstack_MatrixStack_rotate)<br>Modifies the matrix at the top of this stack by multiplying it by a rotation transformation matrix.
* [scale](#extras_matrixstack_MatrixStack_scale)<br>Modifies the matrix at the top of this stack by multiplying it by a
scaling transformation.
* [translate](#extras_matrixstack_MatrixStack_translate)<br>Modifies the matrix at the top of this stack by multiplying it by a
translation transformation.

<a name='extras_matrixstack_MatrixStack_frustum'></a>
### module:extras/matrixstack~MatrixStack#frustum(l, r, b, t, n, f)

Modifies the matrix at the top of this stack by multiplying it by
a frustum matrix.

For more information on the frustum matrix and the parameters, see MathUtil.mat4frustum.

#### Parameters

* `l` (Type: number)<br>The Xcoordinate of the point where the left clipping plane meets the near clipping plane.
* `r` (Type: number)<br>The Xcoordinate of the point where the right clipping plane meets the near clipping plane.
* `b` (Type: number)<br>The Ycoordinate of the point where the bottom clipping plane meets the near clipping plane.
* `t` (Type: number)<br>The Ycoordinate of the point where the top clipping plane meets the near clipping plane.
* `n` (Type: number)<br>The distance from the camera to the near clipping plane.
* `f` (Type: number)<br>The distance from the camera to the far clipping plane.

#### Return Value

This object. (Type: MatrixStack)

<a name='extras_matrixstack_MatrixStack_get'></a>
### module:extras/matrixstack~MatrixStack#get()

Gets a copy of the matrix at the top of this stack.

#### Return Value

. (Type: Array.&lt;number>)

<a name='extras_matrixstack_MatrixStack_loadIdentity'></a>
### module:extras/matrixstack~MatrixStack#loadIdentity()

Modifies the matrix at the top of this stack by replacing it with the identity matrix.

#### Return Value

This object. (Type: MatrixStack)

<a name='extras_matrixstack_MatrixStack_loadMatrix'></a>
### module:extras/matrixstack~MatrixStack#loadMatrix(mat)

Modifies the matrix at the top of this stack by replacing it with the given matrix.

#### Parameters

* `mat` (Type: Array.&lt;number>)<br>A matrix to replace the top of the stack with.

#### Return Value

This object. (Type: MatrixStack)

<a name='extras_matrixstack_MatrixStack_loadTransposeMatrix'></a>
### module:extras/matrixstack~MatrixStack#loadTransposeMatrix(mat)

Modifies the matrix at the top of this stack by replacing it with the
transpose of the given matrix.

#### Parameters

* `mat` (Type: Array.&lt;number>)<br>A matrix whose transpose will replace the top of the stack.

#### Return Value

This object. (Type: MatrixStack)

<a name='extras_matrixstack_MatrixStack_lookAt'></a>
### module:extras/matrixstack~MatrixStack#lookAt(ex, ey, ez, cx, cy, cz, ux, uy, uz)

Modifies the matrix at the top of this stack by multiplying it by
a matrix representing a "camera" view.

For more information on that matrix and the parameters, see MathUtil.mat4lookat.

#### Parameters

* `ex` (Type: number)<br>The Xcoordinate of the "camera" position in world space.
* `ey` (Type: number)<br>The Ycoordinate of the "camera" position.
* `ez` (Type: number)<br>The Zcoordinate of the "camera" position.
* `cx` (Type: number)<br>The Xcoordinate of the position in world space that the "camera" is "looking at".
* `cy` (Type: number)<br>The Ycoordinate of the position "looked at".
* `cz` (Type: number)<br>The Zcoordinate of the position "looked at".
* `ux` (Type: number)<br>The Xcoordinate of the up direction vector.
* `uy` (Type: number)<br>The Ycoordinate of the up vector.
* `uz` (Type: number)<br>The Zcoordinate of the up vector.

#### Return Value

This object. (Type: MatrixStack)

<a name='extras_matrixstack_MatrixStack_multMatrix'></a>
### module:extras/matrixstack~MatrixStack#multMatrix(mat)

Modifies the matrix at the top of this stack by multiplying it by another matrix.
The matrices are multiplied such that the transformations
they describe happen in reverse order. For example, if the matrix
at the top of the stack describes a translation and the matrix
passed to this method describes a scaling, the multiplied matrix will describe
the effect of scaling then translation.

#### Parameters

* `mat` (Type: Array.&lt;number>)<br>A matrix to multiply the current one by.

#### Return Value

This object. (Type: MatrixStack)

<a name='extras_matrixstack_MatrixStack_multTransposeMatrix'></a>
### module:extras/matrixstack~MatrixStack#multTransposeMatrix(mat)

Modifies the matrix at the top of this stack by multiplying it by the transpose of another matrix. Both matrices are multiplied such that the transformation described
by the top matrix "happens before" the transformation described by the matrix passed
to this method. For example, if the matrix
at the top of the stack describes a translation and the matrix
passed to this method describes a scaling, the multiplied matrix will describe
the effect of translation than scaling.

#### Parameters

* `mat` (Type: Array.&lt;number>)<br>A matrix whose transpose the current matrix is to be multiplied.

#### Return Value

This object. (Type: MatrixStack)

<a name='extras_matrixstack_MatrixStack_ortho'></a>
### module:extras/matrixstack~MatrixStack#ortho(l, r, b, t, n, f)

Modifies the matrix at the top of this stack by multiplying it by
an orthographic projection matrix.

For more information on the projection matrix and the parameters, see MathUtil.mat4ortho.

#### Parameters

* `l` (Type: number)<br>Leftmost coordinate of the orthographic view.
* `r` (Type: number)<br>Rightmost coordinate of the orthographic view.
* `b` (Type: number)<br>Bottommost coordinate of the orthographic view.
* `t` (Type: number)<br>Topmost coordinate of the 3D view.
* `n` (Type: number)<br>Distance from the camera to the near clipping plane.
* `f` (Type: number)<br>Distance from the camera to the far clipping plane.

#### Return Value

This object. (Type: MatrixStack)

<a name='extras_matrixstack_MatrixStack_ortho2d'></a>
### module:extras/matrixstack~MatrixStack#ortho2d(l, r, b, t)

Modifies the matrix at the top of this stack by multiplying it by
a 2D orthographic projection matrix.

For more information on that matrix and the parameters, see MathUtil.mat4ortho2d.

#### Parameters

* `l` (Type: number)<br>Leftmost coordinate of the orthographic view.
* `r` (Type: number)<br>Rightmost coordinate of the orthographic view.
* `b` (Type: number)<br>Bottommost coordinate of the orthographic view.
* `t` (Type: number)<br>Topmost coordinate of the orthographic view.

#### Return Value

This object. (Type: MatrixStack)

<a name='extras_matrixstack_MatrixStack_perspective'></a>
### module:extras/matrixstack~MatrixStack#perspective(fov, aspect, n, f)

Modifies the matrix at the top of this stack by multiplying it by
a matrix that defines a perspective projection.

For more information on that matrix and the parameters, see MathUtil.mat4perspective.

#### Parameters

* `fov` (Type: number)<br>Vertical field of view, in degrees.
* `aspect` (Type: number)<br>The ratio of width to height of the viewport, usually the scene's aspect ratio.
* `n` (Type: number)<br>The distance from the camera to the near clipping plane.
* `f` (Type: number)<br>The distance from the camera to the far clipping plane.

#### Return Value

This object. (Type: MatrixStack)

<a name='extras_matrixstack_MatrixStack_pickMatrix'></a>
### module:extras/matrixstack~MatrixStack#pickMatrix(wx, wy, ww, wh, vp)

Modifies the matrix at the top of this stack by multiplying it by
a matrix that transforms the view to a portion of the viewport.

For more information on that matrix and the parameters, see MathUtil.mat4pickMatrix.

#### Parameters

* `wx` (Type: number)<br>The Xcoordinate of the center of the desired viewport portion.
* `wy` (Type: number)<br>The Ycoordinate of the center of the desired viewport portion.
* `ww` (Type: number)<br>Width of the desired viewport portion.
* `wh` (Type: number)<br>Height of the desired viewport portion.
* `vp` (Type: Array.&lt;number>)<br>A 4-element array giving the x- and y-coordinates of the current viewport's origin followed by the width and height of a rectangle indicating the current viewport.

#### Return Value

This object. (Type: MatrixStack)

<a name='extras_matrixstack_MatrixStack_popMatrix'></a>
### module:extras/matrixstack~MatrixStack#popMatrix()

Removes the matrix at the top of this stack, making
the matrix beneath it the new top matrix. Has no
effect if the stack has only one matrix.

#### Return Value

This object. (Type: MatrixStack)

<a name='extras_matrixstack_MatrixStack_pushMatrix'></a>
### module:extras/matrixstack~MatrixStack#pushMatrix()

Makes a copy of the matrix at the top of this stack
and puts the copy on top of the stack.

#### Return Value

This object. (Type: MatrixStack)

<a name='extras_matrixstack_MatrixStack_rotate'></a>
### module:extras/matrixstack~MatrixStack#rotate(angle, x, y, z)

Modifies the matrix at the top of this stack by multiplying it by a rotation transformation matrix. For more information on that matrix and the parameters, see MathUtil.mat4rotate.

#### Parameters

* `angle` (Type: number)<br>The desired angle to rotate, in degrees.
* `x` (Type: number)<br>X-component of the axis of rotation.
* `y` (Type: number)<br>Y-component of the axis of rotation.
* `z` (Type: number)<br>Z-component of the axis of rotation.

#### Return Value

This object. (Type: MatrixStack)

<a name='extras_matrixstack_MatrixStack_scale'></a>
### module:extras/matrixstack~MatrixStack#scale(x, y, z)

Modifies the matrix at the top of this stack by multiplying it by a
scaling transformation.

#### Parameters

* `x` (Type: number)<br>Scale factor along the x-axis.
* `y` (Type: number)<br>Scale factor along the y-axis.
* `z` (Type: number)<br>Scale factor along the z-axis.

#### Return Value

This object. (Type: MatrixStack)

<a name='extras_matrixstack_MatrixStack_translate'></a>
### module:extras/matrixstack~MatrixStack#translate(x, y, z)

Modifies the matrix at the top of this stack by multiplying it by a
translation transformation.

#### Parameters

* `x` (Type: number)<br>Translation along the x-axis.
* `y` (Type: number)<br>Translation along the y-axis.
* `z` (Type: number)<br>Translation along the z-axis.

#### Return Value

This object. (Type: MatrixStack)

[Back to documentation index.](index.md)

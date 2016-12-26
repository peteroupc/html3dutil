# H3DU.MatrixStack

[Back to documentation index.](index.md)

### H3DU.MatrixStack() <a id='H3DU.MatrixStack'></a>

H3DU.MatrixStack is a class that implements a stack
of 4x4 transformation matrices.

When the constructor is called, it will create a stack whose
only element is the identity matrix.

This class is considered a supplementary class to the
Public Domain HTML 3D Library and is not considered part of that
library.

To use this class, you must include the script "extras/matrixstack.js"; the
class is not included in the "h3du_min.js" file which makes up
the HTML 3D Library. Example:

    <script type="text/javascript" src="extras/matrixstack.js"></script>

### Methods

* [frustum](#H3DU.MatrixStack_H3DU.MatrixStack_frustum)
* [get](#H3DU.MatrixStack_H3DU.MatrixStack_get)
* [loadIdentity](#H3DU.MatrixStack_H3DU.MatrixStack_loadIdentity)
* [loadMatrix](#H3DU.MatrixStack_H3DU.MatrixStack_loadMatrix)
* [loadTransposeMatrix](#H3DU.MatrixStack_H3DU.MatrixStack_loadTransposeMatrix)
* [lookAt](#H3DU.MatrixStack_H3DU.MatrixStack_lookAt)
* [multMatrix](#H3DU.MatrixStack_H3DU.MatrixStack_multMatrix)
* [multTransposeMatrix](#H3DU.MatrixStack_H3DU.MatrixStack_multTransposeMatrix)
* [ortho](#H3DU.MatrixStack_H3DU.MatrixStack_ortho)
* [ortho2d](#H3DU.MatrixStack_H3DU.MatrixStack_ortho2d)
* [perspective](#H3DU.MatrixStack_H3DU.MatrixStack_perspective)
* [pickMatrix](#H3DU.MatrixStack_H3DU.MatrixStack_pickMatrix)
* [popMatrix](#H3DU.MatrixStack_H3DU.MatrixStack_popMatrix)
* [pushMatrix](#H3DU.MatrixStack_H3DU.MatrixStack_pushMatrix)
* [rotate](#H3DU.MatrixStack_H3DU.MatrixStack_rotate)
* [scale](#H3DU.MatrixStack_H3DU.MatrixStack_scale)
* [translate](#H3DU.MatrixStack_H3DU.MatrixStack_translate)

### H3DU.MatrixStack#frustum(l, r, b, t, n, f) <a id='H3DU.MatrixStack_H3DU.MatrixStack_frustum'></a>

Modifies the matrix at the top of this stack by multiplying it by
a frustum matrix.
This method assumes a right-handed coordinate system, such as
OpenGL's.

#### Parameters

* `l` (Type: Number)<br>
    X-coordinate of the point where the left clipping plane meets the near clipping plane.
* `r` (Type: Number)<br>
    X-coordinate of the point where the right clipping plane meets the near clipping plane.
* `b` (Type: Number)<br>
    Y-coordinate of the point where the bottom clipping plane meets the near clipping plane.
* `t` (Type: Number)<br>
    Y-coordinate of the point where the top clipping plane meets the near clipping plane.
* `n` (Type: Number)<br>
    The distance from the camera to the near clipping plane. Objects closer than this distance won't be seen. This should be slightly greater than 0.
* `f` (Type: Number)<br>
    The distance from the camera to the far clipping plane. Objects beyond this distance will be too far to be seen.

#### Return Value

This object. (Type: <a href="H3DU.MatrixStack.md">H3DU.MatrixStack</a>)

### H3DU.MatrixStack#get() <a id='H3DU.MatrixStack_H3DU.MatrixStack_get'></a>

Gets a copy of the matrix at the top of this stack.

#### Return Value

. (Type: Array.&lt;Number>)

### H3DU.MatrixStack#loadIdentity() <a id='H3DU.MatrixStack_H3DU.MatrixStack_loadIdentity'></a>

Modifies the matrix at the top of this stack by replacing it with the identity matrix.

#### Return Value

This object. (Type: <a href="H3DU.MatrixStack.md">H3DU.MatrixStack</a>)

### H3DU.MatrixStack#loadMatrix(mat) <a id='H3DU.MatrixStack_H3DU.MatrixStack_loadMatrix'></a>

Modifies the matrix at the top of this stack by replacing it with the given matrix.

#### Parameters

* `mat` (Type: Array.&lt;Number>)<br>
    A matrix to replace the top of the stack with.

#### Return Value

This object. (Type: <a href="H3DU.MatrixStack.md">H3DU.MatrixStack</a>)

### H3DU.MatrixStack#loadTransposeMatrix(mat) <a id='H3DU.MatrixStack_H3DU.MatrixStack_loadTransposeMatrix'></a>

Modifies the matrix at the top of this stack by replacing it with the
transpose of the given matrix.

#### Parameters

* `mat` (Type: Array.&lt;Number>)<br>
    A matrix whose transpose will replace the top of the stack.

#### Return Value

This object. (Type: <a href="H3DU.MatrixStack.md">H3DU.MatrixStack</a>)

### H3DU.MatrixStack#lookAt(ex, ey, ez, cx, cy, cz, ux, uy, uz) <a id='H3DU.MatrixStack_H3DU.MatrixStack_lookAt'></a>

Modifies the matrix at the top of this stack by multiplying it by
a matrix representing a camera view.
This method assumes a right-handed coordinate system, such as
OpenGL's.

#### Parameters

* `ex` (Type: Number)<br>
    X coordinate of the camera position in world space.
* `ey` (Type: Number)<br>
    Y coordinate of the camera position.
* `ez` (Type: Number)<br>
    Z coordinate of the camera position.
* `cx` (Type: Number)<br>
    X coordinate of the position in world space that the camera is looking at.
* `cy` (Type: Number)<br>
    Y coordinate of the position looked at.
* `cz` (Type: Number)<br>
    Z coordinate of the position looked at.
* `ux` (Type: Number)<br>
    X coordinate of the up direction vector. This vector must not point in the same or opposite direction as the camera's view direction.
* `uy` (Type: Number)<br>
    Y coordinate of the up vector.
* `uz` (Type: Number)<br>
    Z coordinate of the up vector.

#### Return Value

This object. (Type: <a href="H3DU.MatrixStack.md">H3DU.MatrixStack</a>)

### H3DU.MatrixStack#multMatrix(mat) <a id='H3DU.MatrixStack_H3DU.MatrixStack_multMatrix'></a>

Modifies the matrix at the top of this stack by multiplying it by another matrix.
The matrices are multiplied such that the transformations
they describe happen in reverse order. For example, if the matrix
at the top of the stack describes a translation and the matrix
passed to this method describes a scaling, the multiplied matrix will describe
the effect of scaling then translation.

#### Parameters

* `mat` (Type: Array.&lt;Number>)<br>
    A matrix to multiply the current one by.

#### Return Value

This object. (Type: <a href="H3DU.MatrixStack.md">H3DU.MatrixStack</a>)

### H3DU.MatrixStack#multTransposeMatrix(mat) <a id='H3DU.MatrixStack_H3DU.MatrixStack_multTransposeMatrix'></a>

Modifies the matrix at the top of this stack by multiplying it by the transpose of
another matrix.
The matrices are multiplied such that the transformations
they describe happen in the order given. For example, if the matrix
at the top of the stack describes a translation and the matrix
passed to this method describes a scaling, the multiplied matrix will describe
the effect of translation then scaling.

#### Parameters

* `mat` (Type: Array.&lt;Number>)<br>
    A matrix whose transpose the current matrix will be multiplied by.

#### Return Value

This object. (Type: <a href="H3DU.MatrixStack.md">H3DU.MatrixStack</a>)

### H3DU.MatrixStack#ortho(l, r, b, t, n, f) <a id='H3DU.MatrixStack_H3DU.MatrixStack_ortho'></a>

Modifies the matrix at the top of this stack by multiplying it by
an orthographic projection.
In this projection, the left clipping plane is parallel to the right clipping
plane and the top to the bottom.

This method assumes a right-handed coordinate system, such as
OpenGL's.

#### Parameters

* `l` (Type: Number)<br>
    Leftmost coordinate of the 3D view.
* `r` (Type: Number)<br>
    Rightmost coordinate of the 3D view. (Note that r can be greater than l or vice versa.)
* `b` (Type: Number)<br>
    Bottommost coordinate of the 3D view.
* `t` (Type: Number)<br>
    Topmost coordinate of the 3D view. (Note that t can be greater than b or vice versa.)
* `n` (Type: Number)<br>
    Distance from the camera to the near clipping plane. A positive value means the plane is in front of the viewer.
* `f` (Type: Number)<br>
    Distance from the camera to the far clipping plane. A positive value means the plane is in front of the viewer.

#### Return Value

This object. (Type: <a href="H3DU.MatrixStack.md">H3DU.MatrixStack</a>)

### H3DU.MatrixStack#ortho2d(l, r, b, t) <a id='H3DU.MatrixStack_H3DU.MatrixStack_ortho2d'></a>

Modifies the matrix at the top of this stack by multiplying it by
a 2D orthographic projection.
This method assumes a right-handed coordinate system, such as
OpenGL's.

#### Parameters

* `l` (Type: Number)<br>
    Leftmost coordinate of the 2D view.
* `r` (Type: Number)<br>
    Rightmost coordinate of the 2D view. (Note that r can be greater than l or vice versa.)
* `b` (Type: Number)<br>
    Bottommost coordinate of the 2D view.
* `t` (Type: Number)<br>
    Topmost coordinate of the 2D view. (Note that t can be greater than b or vice versa.)

#### Return Value

This object. (Type: <a href="H3DU.MatrixStack.md">H3DU.MatrixStack</a>)

### H3DU.MatrixStack#perspective(fov, aspect, n, f) <a id='H3DU.MatrixStack_H3DU.MatrixStack_perspective'></a>

Modifies the matrix at the top of this stack by multiplying it by
a matrix that defines a perspective projection.

This method assumes a right-handed coordinate system, such as
OpenGL's.

#### Parameters

* `fov` (Type: Number)<br>
    Vertical field of view, in degrees. Should be less than 180 degrees. (The smaller this number, the bigger close objects appear to be. As a result, zoom can be implemented by multiplying field of view by an additional factor.)
* `aspect` (Type: Number)<br>
    The ratio of width to height of the viewport, usually the scene's aspect ratio.
* `n` (Type: Number)<br>
    The distance from the camera to the near clipping plane. Objects closer than this distance won't be seen. This should be slightly greater than 0.
* `f` (Type: Number)<br>
    The distance from the camera to the far clipping plane. Objects beyond this distance will be too far to be seen.

#### Return Value

This object. (Type: <a href="H3DU.MatrixStack.md">H3DU.MatrixStack</a>)

### H3DU.MatrixStack#pickMatrix(wx, wy, ww, wh, vp) <a id='H3DU.MatrixStack_H3DU.MatrixStack_pickMatrix'></a>

Modifies the matrix at the top of this stack by multiplying it by
a matrix that transforms the view to a portion of the viewport.

#### Parameters

* `wx` (Type: Number)<br>
    X-coordinate of the center of the desired viewport portion.
* `wy` (Type: Number)<br>
    Y-coordinate of the center of the desired viewport portion.
* `ww` (Type: Number)<br>
    Width of the desired viewport portion.
* `wh` (Type: Number)<br>
    Height of the desired viewport portion.
* `vp` (Type: Array.&lt;Number>)<br>
    A 4-element array giving the X and Y coordinates of the lower left corner followed by the width and height of a rectangle indicating the current viewport.

#### Return Value

This object. (Type: <a href="H3DU.MatrixStack.md">H3DU.MatrixStack</a>)

### H3DU.MatrixStack#popMatrix() <a id='H3DU.MatrixStack_H3DU.MatrixStack_popMatrix'></a>

Removes the matrix at the top of this stack, making
the matrix beneath it the new top matrix. Has no
effect if the stack has only one matrix.

#### Return Value

This object. (Type: <a href="H3DU.MatrixStack.md">H3DU.MatrixStack</a>)

### H3DU.MatrixStack#pushMatrix() <a id='H3DU.MatrixStack_H3DU.MatrixStack_pushMatrix'></a>

Makes a copy of the matrix at the top of this stack
and puts the copy on top of the stack.

#### Return Value

This object. (Type: <a href="H3DU.MatrixStack.md">H3DU.MatrixStack</a>)

### H3DU.MatrixStack#rotate(angle, x, y, z) <a id='H3DU.MatrixStack_H3DU.MatrixStack_rotate'></a>

Modifies the matrix at the top of this stack by multiplying it by a rotation transformation.

#### Parameters

* `angle` (Type: Number)<br>
    The desired angle to rotate in degrees. If the axis of rotation points toward the viewer, the angle's value is increasing in a counterclockwise direction.
* `x` (Type: Number)<br>
    X-component of the axis of rotation.
* `y` (Type: Number)<br>
    Y-component of the axis of rotation.
* `z` (Type: Number)<br>
    Z-component of the axis of rotation.

#### Return Value

This object. (Type: <a href="H3DU.MatrixStack.md">H3DU.MatrixStack</a>)

### H3DU.MatrixStack#scale(x, y, z) <a id='H3DU.MatrixStack_H3DU.MatrixStack_scale'></a>

Modifies the matrix at the top of this stack by multiplying it by a
scaling transformation.

#### Parameters

* `x` (Type: Number)<br>
    Scale factor along the X axis.
* `y` (Type: Number)<br>
    Scale factor along the Y axis.
* `z` (Type: Number)<br>
    Scale factor along the Z axis.

#### Return Value

This object. (Type: <a href="H3DU.MatrixStack.md">H3DU.MatrixStack</a>)

### H3DU.MatrixStack#translate(x, y, z) <a id='H3DU.MatrixStack_H3DU.MatrixStack_translate'></a>

Modifies the matrix at the top of this stack by multiplying it by a
translation transformation.

#### Parameters

* `x` (Type: Number)<br>
    Translation along the X axis.
* `y` (Type: Number)<br>
    Translation along the Y axis.
* `z` (Type: Number)<br>
    Translation along the Z axis.

#### Return Value

This object. (Type: <a href="H3DU.MatrixStack.md">H3DU.MatrixStack</a>)

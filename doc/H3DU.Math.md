# H3DU.Math

[Back to documentation index.](index.md)

### H3DU.Math() <a id='H3DU.Math'></a>

A collection of math functions for working
with vectors, matrices, quaternions, and other
mathematical objects.

See the tutorial "<a href="tutorial-glmath.md">H3DU's Math Functions</a>" for more information.

### Members

* [.HalfPi](#H3DU.Math.HalfPi)
* [.Num180DividedByPi](#H3DU.Math.Num180DividedByPi)
* [.PiDividedBy180](#H3DU.Math.PiDividedBy180)
* [.PiTimes2](#H3DU.Math.PiTimes2)
* [.PitchRollYaw](#H3DU.Math.PitchRollYaw)
* [.PitchYawRoll](#H3DU.Math.PitchYawRoll)
* [.RollPitchYaw](#H3DU.Math.RollPitchYaw)
* [.RollYawPitch](#H3DU.Math.RollYawPitch)
* [.YawPitchRoll](#H3DU.Math.YawPitchRoll)
* [.YawRollPitch](#H3DU.Math.YawRollPitch)

### Methods

* [.quatCopy](#H3DU.Math.quatCopy)
* [.quatDot](#H3DU.Math.quatDot)
* [.quatInverse](#H3DU.Math.quatInverse)
* [.quatLength](#H3DU.Math.quatLength)
* [.quatNorm](#H3DU.Math.quatNorm)
* [.quatNormInPlace](#H3DU.Math.quatNormInPlace)
* [.quatScale](#H3DU.Math.quatScale)
* [.quatScaleInPlace](#H3DU.Math.quatScaleInPlace)
* [boxIsEmpty](#H3DU.Math.boxIsEmpty)
* [frustumHasBox](#H3DU.Math.frustumHasBox)
* [frustumHasPoint](#H3DU.Math.frustumHasPoint)
* [frustumHasSphere](#H3DU.Math.frustumHasSphere)
* [mat3identity](#H3DU.Math.mat3identity)
* [mat3transform](#H3DU.Math.mat3transform)
* [mat4copy](#H3DU.Math.mat4copy)
* [mat4frustum](#H3DU.Math.mat4frustum)
* [mat4identity](#H3DU.Math.mat4identity)
* [mat4inverseTranspose3](#H3DU.Math.mat4inverseTranspose3)
* [mat4invert](#H3DU.Math.mat4invert)
* [mat4isIdentity](#H3DU.Math.mat4isIdentity)
* [mat4lookat](#H3DU.Math.mat4lookat)
* [mat4multiply](#H3DU.Math.mat4multiply)
* [mat4ortho](#H3DU.Math.mat4ortho)
* [mat4ortho2d](#H3DU.Math.mat4ortho2d)
* [mat4ortho2dAspect](#H3DU.Math.mat4ortho2dAspect)
* [mat4orthoAspect](#H3DU.Math.mat4orthoAspect)
* [mat4perspective](#H3DU.Math.mat4perspective)
* [mat4perspectiveHorizontal](#H3DU.Math.mat4perspectiveHorizontal)
* [mat4projectVec3](#H3DU.Math.mat4projectVec3)
* [mat4rotate](#H3DU.Math.mat4rotate)
* [mat4rotated](#H3DU.Math.mat4rotated)
* [mat4scale](#H3DU.Math.mat4scale)
* [mat4scaleInPlace](#H3DU.Math.mat4scaleInPlace)
* [mat4scaled](#H3DU.Math.mat4scaled)
* [mat4toFrustumPlanes](#H3DU.Math.mat4toFrustumPlanes)
* [mat4toMat3](#H3DU.Math.mat4toMat3)
* [mat4transform](#H3DU.Math.mat4transform)
* [mat4transformVec3](#H3DU.Math.mat4transformVec3)
* [mat4translate](#H3DU.Math.mat4translate)
* [mat4translated](#H3DU.Math.mat4translated)
* [mat4transpose](#H3DU.Math.mat4transpose)
* [mat4transposeInPlace](#H3DU.Math.mat4transposeInPlace)
* [planeNorm](#H3DU.Math.planeNorm)
* [planeNormInPlace](#H3DU.Math.planeNormInPlace)
* [quatConjugate](#H3DU.Math.quatConjugate)
* [quatFromAxisAngle](#H3DU.Math.quatFromAxisAngle)
* [quatFromMat4](#H3DU.Math.quatFromMat4)
* [quatFromTaitBryan](#H3DU.Math.quatFromTaitBryan)
* [quatFromVectors](#H3DU.Math.quatFromVectors)
* [quatIdentity](#H3DU.Math.quatIdentity)
* [quatInvert](#H3DU.Math.quatInvert)
* [quatIsIdentity](#H3DU.Math.quatIsIdentity)
* [quatMultiply](#H3DU.Math.quatMultiply)
* [quatNlerp](#H3DU.Math.quatNlerp)
* [quatRotate](#H3DU.Math.quatRotate)
* [quatSlerp](#H3DU.Math.quatSlerp)
* [quatToAxisAngle](#H3DU.Math.quatToAxisAngle)
* [quatToMat4](#H3DU.Math.quatToMat4)
* [quatToTaitBryan](#H3DU.Math.quatToTaitBryan)
* [quatTransform](#H3DU.Math.quatTransform)
* [vec3add](#H3DU.Math.vec3add)
* [vec3addInPlace](#H3DU.Math.vec3addInPlace)
* [vec3assign](#H3DU.Math.vec3assign)
* [vec3copy](#H3DU.Math.vec3copy)
* [vec3cross](#H3DU.Math.vec3cross)
* [vec3dot](#H3DU.Math.vec3dot)
* [vec3length](#H3DU.Math.vec3length)
* [vec3lerp](#H3DU.Math.vec3lerp)
* [vec3mul](#H3DU.Math.vec3mul)
* [vec3mulInPlace](#H3DU.Math.vec3mulInPlace)
* [vec3negate](#H3DU.Math.vec3negate)
* [vec3negateInPlace](#H3DU.Math.vec3negateInPlace)
* [vec3norm](#H3DU.Math.vec3norm)
* [vec3normInPlace](#H3DU.Math.vec3normInPlace)
* [vec3scale](#H3DU.Math.vec3scale)
* [vec3scaleInPlace](#H3DU.Math.vec3scaleInPlace)
* [vec3sub](#H3DU.Math.vec3sub)
* [vec3subInPlace](#H3DU.Math.vec3subInPlace)
* [vec3toScreenPoint](#H3DU.Math.vec3toScreenPoint)
* [vec4assign](#H3DU.Math.vec4assign)
* [vec4copy](#H3DU.Math.vec4copy)
* [vec4dot](#H3DU.Math.vec4dot)
* [vec4length](#H3DU.Math.vec4length)
* [vec4lerp](#H3DU.Math.vec4lerp)
* [vec4norm](#H3DU.Math.vec4norm)
* [vec4normInPlace](#H3DU.Math.vec4normInPlace)
* [vec4scale](#H3DU.Math.vec4scale)
* [vec4scaleInPlace](#H3DU.Math.vec4scaleInPlace)

### H3DU.Math.HalfPi <a id='H3DU.Math.HalfPi'></a> (constant)

Closest approximation to pi divided by 2, or a 90-degree turn in radians.

Default Value: `1.5707963267948966`

### H3DU.Math.Num180DividedByPi <a id='H3DU.Math.Num180DividedByPi'></a> (constant)

Closest approximation to 180 divided by pi, or the number of
 degrees in a radian. Multiply by this number to convert radians to degrees.

Default Value: `57.29577951308232`

### H3DU.Math.PiDividedBy180 <a id='H3DU.Math.PiDividedBy180'></a> (constant)

Closest approximation to pi divided by 180, or the number
 of radians in a degree. Multiply by this number to convert degrees to radians.

Default Value: `0.017453292519943295`

### H3DU.Math.PiTimes2 <a id='H3DU.Math.PiTimes2'></a> (constant)

Closest approximation to pi times 2, or a 360-degree turn in radians.

Default Value: `6.283185307179586`

### H3DU.Math.PitchRollYaw <a id='H3DU.Math.PitchRollYaw'></a> (constant)

Indicates that a rotation occurs as a pitch, then roll, then yaw (each rotation around the original axes).

### H3DU.Math.PitchYawRoll <a id='H3DU.Math.PitchYawRoll'></a> (constant)

Indicates that a rotation occurs as a pitch, then yaw, then roll (each rotation around the original axes).

### H3DU.Math.RollPitchYaw <a id='H3DU.Math.RollPitchYaw'></a> (constant)

Indicates that a rotation occurs as a roll, then pitch, then yaw (each rotation around the original axes).

### H3DU.Math.RollYawPitch <a id='H3DU.Math.RollYawPitch'></a> (constant)

Indicates that a rotation occurs as a roll, then yaw, then pitch (each rotation around the original axes).

### H3DU.Math.YawPitchRoll <a id='H3DU.Math.YawPitchRoll'></a> (constant)

Indicates that a rotation occurs as a yaw, then pitch, then roll (each rotation around the original axes).

### H3DU.Math.YawRollPitch <a id='H3DU.Math.YawRollPitch'></a> (constant)

Indicates that a rotation occurs as a yaw, then roll, then pitch (each rotation around the original axes).

### (static) H3DU.Math.quatCopy() <a id='H3DU.Math.quatCopy'></a>

Returns a copy of a quaternion.

#### Return Value

Return value. (Type: Array.&lt;Number>)

#### See Also

<a href="H3DU.Math.md#H3DU.Math.vec4copy">H3DU.Math.vec4copy</a>

### (static) H3DU.Math.quatDot(a, b) <a id='H3DU.Math.quatDot'></a>

Finds the dot product of two quaternions.
It's equal to the sum of the products of
their components (for example, <b>a</b>'s X times <b>b</b>'s X).

#### Parameters

* `a` (Type: Array.&lt;Number>)<br>
    The first quaternion.
* `b` (Type: Array.&lt;Number>)<br>
    The second quaternion.

#### Return Value

Return value. (Type: Number)

#### See Also

<a href="H3DU.Math.md#H3DU.Math.vec4dot">H3DU.Math.vec4dot</a>

### (static) H3DU.Math.quatInverse(quat) <a id='H3DU.Math.quatInverse'></a>

<b>Deprecated: Use <a href="H3DU.Math.md#H3DU.Math.quatInvert">H3DU.Math.quatInvert</a> instead.</b>

Inverts the rotation given in this quaternion, describing a rotation that undoes the given rotation.
Returns a new quaternion; same as the quatInverse method.

#### Parameters

* `quat` (Type: Array.&lt;Number>)<br>
    A quaternion, containing four elements.

#### Return Value

Return value. (Type: Array.&lt;Number>)

### (static) H3DU.Math.quatLength(quat) <a id='H3DU.Math.quatLength'></a>

Returns the distance of this quaternion from the origin.
It's the same as the square root of the sum of the squares
of its components.

#### Parameters

* `quat` (Type: Array.&lt;Number>)<br>
    The quaternion.

#### Return Value

Return value. (Type: Number)

#### See Also

<a href="H3DU.Math.md#H3DU.Math.vec4length">H3DU.Math.vec4length</a>

### (static) H3DU.Math.quatNorm(quat) <a id='H3DU.Math.quatNorm'></a>

Converts a quaternion to its normalized version; returns a new quaternion.
When a quaternion is normalized, the distance from the origin
to that quaternion becomes 1 (unless all its components are 0).
A quaternion is normalized by dividing each of its components
by its length.

#### Parameters

* `quat` (Type: Array.&lt;Number>)<br>
    A quaternion.

#### Return Value

The normalized quaternion. (Type: Array.&lt;Number>)

#### See Also

<a href="H3DU.Math.md#H3DU.Math.vec4norm">H3DU.Math.vec4norm</a>

### (static) H3DU.Math.quatNormInPlace(quat) <a id='H3DU.Math.quatNormInPlace'></a>

Converts a quaternion to its normalized version.
When a quaternion is normalized, it describes the same orientation but the distance from the origin
to that quaternion becomes 1 (unless all its components are 0).
A quaternion is normalized by dividing each of its components
by its length.

#### Parameters

* `quat` (Type: Array.&lt;Number>)<br>
    A quaternion.

#### Return Value

The parameter "quat". (Type: Array.&lt;Number>)

#### See Also

<a href="H3DU.Math.md#H3DU.Math.vec4normInPlace">H3DU.Math.vec4normInPlace</a>

### (static) H3DU.Math.quatScale(a, scalar) <a id='H3DU.Math.quatScale'></a>

Multiplies each element of a quaternion by a factor
and returns the result as a new quaternion.

#### Parameters

* `a` (Type: Array.&lt;Number>)<br>
    A quaternion.
* `scalar` (Type: Number)<br>
    A factor to multiply.

#### Return Value

The resulting quaternion. (Type: Array.&lt;Number>)

#### See Also

<a href="H3DU.Math.md#H3DU.Math.vec4scaleInPlace">H3DU.Math.vec4scaleInPlace</a>

### (static) H3DU.Math.quatScaleInPlace(a, scalar) <a id='H3DU.Math.quatScaleInPlace'></a>

Multiplies each element of a quaternion by a factor
and stores the result in that quaternion.

#### Parameters

* `a` (Type: Array.&lt;Number>)<br>
    A quaternion.
* `scalar` (Type: Number)<br>
    A factor to multiply.

#### Return Value

The parameter "a". (Type: Array.&lt;Number>)

#### See Also

<a href="H3DU.Math.md#H3DU.Math.vec4scaleInPlace">H3DU.Math.vec4scaleInPlace</a>

### (static) H3DU.Math.boxIsEmpty(box) <a id='H3DU.Math.boxIsEmpty'></a>

Determines whether a bounding box is empty.
This is determined if the minimum coordinate
is larger than the corresponding maximum coordinate.

#### Parameters

* `box` (Type: Array.&lt;Number>)<br>
    An axis-aligned bounding box in world space, which is an array of six values. The first three values are the smallest X, Y, and Z coordinates, and the last three values are the largest X, Y, and Z coordinates.

#### Return Value

<code>true</code> if at least one
of the minimum coordinates is greater than its
corresponding maximum coordinate; otherwise, <code>false</code>. (Type: Boolean)

### (static) H3DU.Math.frustumHasBox(frustum, box) <a id='H3DU.Math.frustumHasBox'></a>

Determines whether an axis-aligned bounding box
is at least partially inside a view frustum.

#### Parameters

* `frustum` (Type: Array.&lt;Array.&lt;Number>>)<br>
    An array of six 4-element arrays representing the six clipping planes of the view frustum. In order, they are the left, right, top, bottom, near, and far clipping planes.
* `box` (Type: Array.&lt;Number>)<br>
    An axis-aligned bounding box in world space, which is an array of six values. The first three values are the smallest X, Y, and Z coordinates, and the last three values are the largest X, Y, and Z coordinates.

#### Return Value

<code>true</code> if the box
may be partially or totally
inside the frustum; <code>false</code> if the box is
definitely outside the frustum, or if the box is empty
(see "boxIsEmpty"). (Type: Boolean)

### (static) H3DU.Math.frustumHasPoint(frustum, x, y, z) <a id='H3DU.Math.frustumHasPoint'></a>

Determines whether a point is
outside or inside a view frustum.

#### Parameters

* `frustum` (Type: Array.&lt;Array.&lt;Number>>)<br>
    An array of six 4-element arrays representing the six clipping planes of the view frustum. In order, they are the left, right, top, bottom, near, and far clipping planes.
* `x` (Type: Number)<br>
    X coordinate of a point in world space.
* `y` (Type: Number)<br>
    Y coordinate of a point in world space.
* `z` (Type: Number)<br>
    Z coordinate of a point in world space.

#### Return Value

true if the point is inside;
otherwise false; (Type: Boolean)

### (static) H3DU.Math.frustumHasSphere(frustum, x, y, z, radius) <a id='H3DU.Math.frustumHasSphere'></a>

Determines whether a sphere is at least
partially inside a view frustum.

#### Parameters

* `frustum` (Type: Array.&lt;Array.&lt;Number>>)<br>
    An array of six 4-element arrays representing the six clipping planes of the view frustum. In order, they are the left, right, top, bottom, near, and far clipping planes.
* `x` (Type: Number)<br>
    X coordinate of the sphere's center in world space.
* `y` (Type: Number)<br>
    Y coordinate of the sphere's center in world space.
* `z` (Type: Number)<br>
    Z coordinate of the sphere's center in world space.
* `radius` (Type: Number)<br>
    Radius of the sphere in world-space units.

#### Return Value

<code>true</code> if the sphere
is partially or totally
inside the frustum; <code>false</code> otherwise. (Type: Boolean)

### (static) H3DU.Math.mat3identity() <a id='H3DU.Math.mat3identity'></a>

Returns the identity 3x3 matrix.

#### Return Value

Return value. (Type: Array.&lt;Number>)

### (static) H3DU.Math.mat3transform(mat, v, vy, vz) <a id='H3DU.Math.mat3transform'></a>

Transforms a 3-element vector with a 3x3 matrix and returns
the transformed vector.

#### Parameters

* `mat` (Type: Array.&lt;Number>)<br>
    A 3x3 matrix.
* `v` (Type: Array.&lt;Number> | Number)<br>
    X coordinate. If "vy", and "vz" are omitted, this value can instead be a 4-element array giving the X, Y, and Z coordinates.
* `vy` (Type: Number)<br>
    Y coordinate.
* `vz` (Type: Number)<br>
    Z coordinate. To transform a 2D point, set Z to 1.

#### Return Value

The transformed vector. (Type: Array.&lt;Number>)

### (static) H3DU.Math.mat4copy(mat) <a id='H3DU.Math.mat4copy'></a>

Returns a copy of a 4x4 matrix.

#### Parameters

* `mat` (Type: Array.&lt;Number>)<br>
    A 4x4 matrix.

#### Return Value

Return value. (Type: Array.&lt;Number>)

### (static) H3DU.Math.mat4frustum(l, r, b, t, near, far) <a id='H3DU.Math.mat4frustum'></a>

Returns a 4x4 matrix representing a perspective projection
in the form of a view frustum, or the limits in the "camera"'s view.

This method assumes a right-handed coordinate system, such as
in OpenGL. To adjust the result of this method to a left-handed system,
such as in legacy Direct3D, reverse the sign of the 9th, 10th, 11th, and 12th
elements of the result (zero-based indices 8, 9, 10, and 11).

#### Parameters

* `l` (Type: Number)<br>
    X-coordinate of the point where the left clipping plane meets the near clipping plane.
* `r` (Type: Number)<br>
    X-coordinate of the point where the right clipping plane meets the near clipping plane.
* `b` (Type: Number)<br>
    Y-coordinate of the point where the bottom clipping plane meets the near clipping plane.
* `t` (Type: Number)<br>
    Y-coordinate of the point where the top clipping plane meets the near clipping plane.
* `near` (Type: Number)<br>
    The distance from the "camera" to the near clipping plane. Objects closer than this distance won't be seen.

This value should not be 0 or less, and should be set to the highest distance from the "camera" that the application can afford to clip out for being too close, for example, 0.5, 1, or higher.
* `far` (Type: Number)<br>
    The distance from the "camera" to the far clipping plane. Objects beyond this distance will be too far to be seen.

This value should be greater than "near" and be set so that the ratio of "far" to "near" is as small as the application can accept.

 (Most WebGL implementations support 24-bit depth buffers, meaning they support 16,777,216 possible values per pixel, which are more spread out toward the far clipping plane than toward the near plane due to the perspective projection. The greater the ratio of "far" to "near", the more the values spread out, and the more likely two objects close to the far plane will have identical depth values.)

#### Return Value

The resulting 4x4 matrix. (Type: Array.&lt;Number>)

### (static) H3DU.Math.mat4identity() <a id='H3DU.Math.mat4identity'></a>

Returns the identity 4x4 matrix.

#### Return Value

Return value. (Type: Array.&lt;Number>)

### (static) H3DU.Math.mat4inverseTranspose3(m4) <a id='H3DU.Math.mat4inverseTranspose3'></a>

Returns the transposed result of the inverted 3x3 upper left corner of
the given 4x4 matrix.

This is usually used to convert a model-view matrix to a matrix
for transforming surface normals in order to keep them perpendicular
to a surface transformed by the world matrix. Normals are then
transformed by this matrix and then converted to unit vectors
(<a href="H3DU.Math.md#H3DU.Math.vec3norm">"normalized" vectors</a> with a length of 1). But if the
input matrix uses only rotations, translations, and/or uniform scaling
(same scaling in X, Y, and Z), the 3x3 upper left of the input matrix can
be used instead of the inverse-transpose matrix to transform the normals.

#### Parameters

* `m4` (Type: Array.&lt;Number>)<br>
    A 4x4 matrix.

#### Return Value

The resulting 3x3 matrix. If the matrix
can't be inverted, returns the identity 3x3 matrix. (Type: Array.&lt;Number>)

### (static) H3DU.Math.mat4invert(m) <a id='H3DU.Math.mat4invert'></a>

Finds the inverse of a 4x4 matrix, describing a transformation that undoes the given transformation.

#### Parameters

* `m` (Type: Array.&lt;Number>)<br>
    A 4x4 matrix.

#### Return Value

The resulting 4x4 matrix.
Returns the identity matrix if this matrix is not invertible. (Type: Array.&lt;Number>)

### (static) H3DU.Math.mat4isIdentity(mat) <a id='H3DU.Math.mat4isIdentity'></a>

Returns whether a 4x4 matrix is the identity matrix.

#### Parameters

* `mat` (Type: Array.&lt;Number>)<br>
    A 4x4 matrix.

#### Return Value

Return value. (Type: Boolean)

### (static) H3DU.Math.mat4lookat(viewerPos, [lookingAt], [up]) <a id='H3DU.Math.mat4lookat'></a>

Returns a 4x4 matrix representing a camera view.

This method assumes a right-handed coordinate system, such as
in OpenGL. To adjust the result of this method to a left-handed system,
such as in legacy Direct3D, reverse the sign of the 1st, 3rd, 5th, 7th, 9th, 11th,
13th, and 15th elements of the result (zero-based indices 0, 2, 4, 6, 8,
10, 12, and 14).

#### Parameters

* `viewerPos` (Type: Array.&lt;Number>)<br>
    A 3-element vector specifying the "camera" position in world space.
* `lookingAt` (Type: Array.&lt;Number>) (optional)<br>
    A 3-element vector specifying the point in world space that the "camera" is looking at. May be null or omitted, in which case the default is the coordinates (0,0,0).
* `up` (Type: Array.&lt;Number>) (optional)<br>
    A 3-element vector specifying the direction from the center of the "camera" to its top. This parameter may be null or omitted, in which case the default is the vector (0, 1, 0), the vector that results when the "camera" is held upright. This vector must not point in the same or opposite direction as the "camera"'s view direction. (For best results, rotate the vector (0, 1, 0) so it points perpendicular to the "camera"'s view direction.)

#### Return Value

The resulting 4x4 matrix. (Type: Array.&lt;Number>)

### (static) H3DU.Math.mat4multiply(a, b) <a id='H3DU.Math.mat4multiply'></a>

Multiplies two 4x4 matrices. A new matrix is returned.
The matrices are multiplied such that the transformations
they describe happen in reverse order. For example, if the first
matrix (input matrix) describes a translation and the second
matrix describes a scaling, the multiplied matrix will describe
the effect of scaling then translation. (Multiplying the first matrix
by the second is the same as multiplying the second matrix
by the first matrix's transpose.)

#### Parameters

* `a` (Type: Array.&lt;Number>)<br>
    The first matrix.
* `b` (Type: Array.&lt;Number>)<br>
    The second matrix.

#### Return Value

The resulting 4x4 matrix. (Type: Array.&lt;Number>)

### (static) H3DU.Math.mat4ortho(l, r, b, t, n, f) <a id='H3DU.Math.mat4ortho'></a>

Returns a 4x4 matrix representing an orthographic projection.
In this projection, the left clipping plane is parallel to the right clipping
plane and the top to the bottom.

This method assumes a right-handed coordinate system, such as
in OpenGL. To adjust the result of this method to a left-handed system,
such as in legacy Direct3D, reverse the sign of the 9th, 10th, 11th, and 12th
elements of the result (zero-based indices 8, 9, 10, and 11).

#### Parameters

* `l` (Type: Number)<br>
    Leftmost coordinate of the orthographic view.
* `r` (Type: Number)<br>
    Rightmost coordinate of the orthographic view. (If l is greater than r, X-coordinates increase rightward; otherwise, they increase leftward.)
* `b` (Type: Number)<br>
    Bottommost coordinate of the orthographic view.
* `t` (Type: Number)<br>
    Topmost coordinate of the orthographic view. (If b is greater than t, X-coordinates increase downward; otherwise, they increase upward.)
* `n` (Type: Number)<br>
    Distance from the "camera" to the near clipping plane. A positive value means the plane is in front of the viewer.
* `f` (Type: Number)<br>
    Distance from the "camera" to the far clipping plane. A positive value means the plane is in front of the viewer. (Note that n can be greater than f or vice versa.) The absolute difference between n and f should be as small as the application can accept.

#### Return Value

The resulting 4x4 matrix. (Type: Array.&lt;Number>)

### (static) H3DU.Math.mat4ortho2d(l, r, b, t) <a id='H3DU.Math.mat4ortho2d'></a>

Returns a 4x4 matrix representing a 2D orthographic projection.

This method assumes a right-handed coordinate system; see mat4ortho().

This is the same as mat4ortho() with the near clipping plane
set to -1 and the far clipping plane set to 1.

#### Parameters

* `l` (Type: Number)<br>
    Leftmost coordinate of the orthographic view.
* `r` (Type: Number)<br>
    Rightmost coordinate of the orthographic view. (If l is greater than r, X-coordinates increase rightward; otherwise, they increase leftward.)
* `b` (Type: Number)<br>
    Bottommost coordinate of the orthographic view.
* `t` (Type: Number)<br>
    Topmost coordinate of the orthographic view. (If b is greater than t, X-coordinates increase downward; otherwise, they increase upward.)

#### Return Value

The resulting 4x4 matrix. (Type: Array.&lt;Number>)

### (static) H3DU.Math.mat4ortho2dAspect(l, r, b, t, aspect) <a id='H3DU.Math.mat4ortho2dAspect'></a>

Returns a 4x4 matrix representing a 2D orthographic projection,
retaining the view rectangle's aspect ratio.

If the view rectangle's aspect ratio doesn't match the desired aspect
ratio, the view rectangle will be centered on the viewport
or otherwise moved and scaled so as to keep the entire view rectangle visible without stretching
or squishing it.

This is the same as mat4orthoAspect() with the near clipping plane
set to -1 and the far clipping plane set to 1.

This method assumes a right-handed coordinate system; see mat4ortho().

#### Parameters

* `l` (Type: Number)<br>
    Leftmost coordinate of the view rectangle.
* `r` (Type: Number)<br>
    Rightmost coordinate of the view rectangle. (If l is greater than r, X-coordinates increase rightward; otherwise, they increase leftward.)
* `b` (Type: Number)<br>
    Bottommost coordinate of the view rectangle.
* `t` (Type: Number)<br>
    Topmost coordinate of the view rectangle. (If b is greater than t, X-coordinates increase downward; otherwise, they increase upward.)
* `aspect` (Type: Number)<br>
    The ratio of width to height of the viewport, usually the scene's aspect ratio.

#### Return Value

The resulting 4x4 matrix. (Type: Array.&lt;Number>)

### (static) H3DU.Math.mat4orthoAspect(l, r, b, t, n, f, aspect) <a id='H3DU.Math.mat4orthoAspect'></a>

Returns a 4x4 matrix representing an orthographic projection,
retaining the view rectangle's aspect ratio.

If the view rectangle's aspect ratio doesn't match the desired aspect
ratio, the view rectangle will be centered on the viewport
or otherwise moved and scaled so as to keep the entire view rectangle visible without stretching
or squishing it.

This method assumes a right-handed coordinate system; see mat4ortho().

#### Parameters

* `l` (Type: Number)<br>
    Leftmost coordinate of the view rectangle.
* `r` (Type: Number)<br>
    Rightmost coordinate of the view rectangle. (If l is greater than r, X-coordinates increase rightward; otherwise, they increase leftward.)
* `b` (Type: Number)<br>
    Bottommost coordinate of the view rectangle.
* `t` (Type: Number)<br>
    Topmost coordinate of the view rectangle. (If b is greater than t, X-coordinates increase downward; otherwise, they increase upward.)
* `n` (Type: Number)<br>
    Distance from the "camera" to the near clipping plane. A positive value means the plane is in front of the viewer.
* `f` (Type: Number)<br>
    Distance from the "camera" to the far clipping plane. A positive value means the plane is in front of the viewer. (Note that n can be greater than f or vice versa.) The absolute difference between n and f should be as small as the application can accept.
* `aspect` (Type: Number)<br>
    The ratio of width to height of the viewport, usually the scene's aspect ratio.

#### Return Value

The resulting 4x4 matrix. (Type: Array.&lt;Number>)

### (static) H3DU.Math.mat4perspective(fovY, aspectRatio, near, far) <a id='H3DU.Math.mat4perspective'></a>

Returns a 4x4 matrix representing a perspective projection.

This method assumes a right-handed coordinate system, such as
in OpenGL. To adjust the result of this method to a left-handed system,
such as in legacy Direct3D, reverse the sign of the 9th, 10th, 11th, and 12th
elements of the result (zero-based indices 8, 9, 10, and 11).

#### Parameters

* `fovY` (Type: Number)<br>
    Y-axis field of view, in degrees. Should be less than 180 degrees. (The smaller this number, the bigger close objects appear to be. As a result, zooming out can be implemented by raising this value, and zooming in by lowering it.)
* `aspectRatio` (Type: Number)<br>
    The ratio of width to height of the viewport, usually the scene's aspect ratio.
* `near` (Type: Number)<br>
    The distance from the "camera" to the near clipping plane. Objects closer than this distance won't be seen.

This value should not be 0 or less, and should be set to the highest distance from the "camera" that the application can afford to clip out for being too close, for example, 0.5, 1, or higher.
* `far` (Type: Number)<br>
    The distance from the "camera" to the far clipping plane. Objects beyond this distance will be too far to be seen.

This value should be greater than "near" and be set so that the ratio of "far" to "near" is as small as the application can accept.

 (Most WebGL implementations support 24-bit depth buffers, meaning they support 16,777,216 possible values per pixel, which are more spread out toward the far clipping plane than toward the near plane due to the perspective projection. The greater the ratio of "far" to "near", the more the values spread out, and the more likely two objects close to the far plane will have identical depth values.)

#### Return Value

The resulting 4x4 matrix. (Type: Array.&lt;Number>)

### (static) H3DU.Math.mat4perspectiveHorizontal(fovX, aspectRatio, near, far) <a id='H3DU.Math.mat4perspectiveHorizontal'></a>

Returns a 4x4 matrix representing a perspective projection,
given an X-axis field of view.
This method assumes a right-handed coordinate system, such as
in OpenGL. To adjust the result of this method to a left-handed system,
such as in legacy Direct3D, reverse the sign of the 9th, 10th, 11th, and 12th
elements of the result (zero-based indices 8, 9, 10, and 11).

#### Parameters

* `fovX` (Type: Number)<br>
    X-axis field of view, in degrees. Should be less than 180 degrees. (The smaller this number, the bigger close objects appear to be. As a result, zooming out can be implemented by raising this value, and zooming in by lowering it.)
* `aspectRatio` (Type: Number)<br>
    The ratio of width to height of the viewport, usually the scene's aspect ratio.
* `near` (Type: Number)<br>
    The distance from the "camera" to the near clipping plane. Objects closer than this distance won't be seen.

This value should not be 0 or less, and should be set to the highest distance from the "camera" that the application can afford to clip out for being too close, for example, 0.5, 1, or higher.
* `far` (Type: Number)<br>
    The distance from the "camera" to the far clipping plane. Objects beyond this distance will be too far to be seen.

This value should be greater than "near" and be set so that the ratio of "far" to "near" is as small as the application can accept.

 (Most WebGL implementations support 24-bit depth buffers, meaning they support 16,777,216 possible values per pixel, which are more spread out toward the far clipping plane than toward the near plane due to the perspective projection. The greater the ratio of "far" to "near", the more the values spread out, and the more likely two objects close to the far plane will have identical depth values.)

#### Return Value

The resulting 4x4 matrix. (Type: Array.&lt;Number>)

### (static) H3DU.Math.mat4projectVec3(mat, v, vy, vz) <a id='H3DU.Math.mat4projectVec3'></a>

Transforms a 3-element vector with a 4x4 matrix and returns
a transformation of the vector in <i>normalized device coordinates</i>.

The transformation involves
multiplying the matrix by a 4-element column vector with the same X,
Y, and Z coordinates, but with a W coordinate equal to 1, and
then dividing X, Y, and Z of the resulting 4-element
vector by that vector's W (a <i>perspective divide</i>),
then returning that vector's new X, Y, and Z.

<b>About normalized device coordinates</b>

In normalized device coordinates, a 3D point located on or within
the viewport (visible area) ranges from -1 to 1 in the X and Y coordinates.
and the coordinates increase from left to right and from front to back.

In OpenGL by default, the Z coordinates located on or within the
viewport range from -1 to 1, and the Y coordinates increase
from bottom to top. For Y coordinates that increase from top to bottom,
reverse the sign of the Y coordinate of this method's return value.

#### Parameters

* `mat` (Type: Array.&lt;Number>)<br>
    A 4x4 matrix to use to transform the vector to normalized device coordinates. This will generally be a projection-view matrix, that is, the projection matrix multiplied by the view matrix, in that order, if the vector to transform is in <i>world space</i>, or a model-view-projection matrix, that is, a projection-view matrix multiplied by the model (world) matrix, in that order, if the vector is in <i>model (object) space</i>.
* `v` (Type: Array.&lt;Number> | Number)<br>
    X coordinate of a 3D point to transform. If "vy" and "vz" are omitted, this value can instead be a 3-element array giving the X, Y, and Z coordinates.
* `vy` (Type: Number)<br>
    Y coordinate.
* `vz` (Type: Number)<br>
    Z coordinate. To transform a 2D point, set Z to 1.

#### Return Value

The transformed 3-element vector
in normalized device coordinates. The elements, in order, are
the transformed vector's X, Y, and Z coordinates. (Type: Array.&lt;Number>)

### (static) H3DU.Math.mat4rotate(mat, angle, v, vy, vz) <a id='H3DU.Math.mat4rotate'></a>

Multiplies a 4x4 matrix by a rotation transformation,
and returns a new matrix.

#### Parameters

* `mat` (Type: Array.&lt;Number>)<br>
    A 4x4 matrix to multiply.
* `angle` (Type: Array.&lt;Number> | Number)<br>
    The desired angle to rotate in degrees. If "v", "vy", and "vz" are omitted, this can instead be a 4-element array giving the axis of rotation as the first three elements, followed by the angle in degrees as the fourth element. If the axis of rotation points toward the viewer, a positive value means the angle runs in a counterclockwise direction for right-handed coordinate systems and in a clockwise direction for left-handed systems.
* `v` (Type: Array.&lt;Number> | Number)<br>
    X-component of the point lying on the axis of rotation. If "vy" and "vz" are omitted, this can instead be a 3-element array giving the axis of rotation in x, y, and z, respectively.
* `vy` (Type: Number)<br>
    Y-component of the point lying on the axis of rotation.
* `vz` (Type: Number)<br>
    Z-component of the point lying on the axis of rotation.

#### Return Value

The resulting 4x4 matrix. (Type: Array.&lt;Number>)

### (static) H3DU.Math.mat4rotated(angle, v, vy, vz) <a id='H3DU.Math.mat4rotated'></a>

Returns a 4x4 matrix representing a rotation transformation.

#### Parameters

* `angle` (Type: Array.&lt;Number> | Number)<br>
    The desired angle to rotate in degrees. If "v", "vy", and "vz" are omitted, this can instead be a 4-element array giving the axis of rotation as the first three elements, followed by the angle in degrees as the fourth element. If the axis of rotation points toward the viewer, a positive value means the angle runs in a counterclockwise direction for right-handed coordinate systems and in a clockwise direction for left-handed systems.
* `v` (Type: Array.&lt;Number> | Number)<br>
    X-component of the point lying on the axis of rotation. If "vy" and "vz" are omitted, this can instead be a 3-element array giving the axis of rotation in x, y, and z, respectively.
* `vy` (Type: Number)<br>
    Y-component of the point lying on the axis of rotation.
* `vz` (Type: Number)<br>
    Z-component of the point lying on the axis of rotation.

#### Return Value

The resulting 4x4 matrix. (Type: Array.&lt;Number>)

### (static) H3DU.Math.mat4scale(mat, v3, v3y, v3z) <a id='H3DU.Math.mat4scale'></a>

Multiplies a 4x4 matrix by a scaling transformation.

#### Parameters

* `mat` (Type: Array.&lt;Number>)<br>
    4x4 matrix to multiply.
* `v3` (Type: Array.&lt;Number> | Number)<br>
    Scaling factor along the X axis. If "v3y" and "v3z" are omitted, this value can instead be a 3-element array giving the scaling factors along the X, Y, and Z axes.
* `v3y` (Type: Number)<br>
    Scaling factor along the Y axis.
* `v3z` (Type: Number)<br>
    Scaling factor along the Z axis.

#### Return Value

The resulting 4x4 matrix. (Type: Array.&lt;Number>)

### (static) H3DU.Math.mat4scaleInPlace(mat, v3, v3y, v3z) <a id='H3DU.Math.mat4scaleInPlace'></a>

Modifies a 4x4 matrix by multiplying it by a
scaling transformation.

#### Parameters

* `mat` (Type: Array.&lt;Number>)<br>
    A 4x4 matrix.
* `v3` (Type: Array.&lt;Number> | Number)<br>
    Scale factor along the X axis. If "v3y" and "v3z" are omitted, this value can instead be a 3-element array giving the scale factors along the X, Y, and Z axes.
* `v3y` (Type: Number)<br>
    Scale factor along the Y axis.
* `v3z` (Type: Number)<br>
    Scale factor along the Z axis.

#### Return Value

The same parameter as "mat". (Type: Array.&lt;Number>)

### (static) H3DU.Math.mat4scaled(v3, v3y, v3z) <a id='H3DU.Math.mat4scaled'></a>

Returns a 4x4 matrix representing a scaling transformation.

#### Parameters

* `v3` (Type: Array.&lt;Number> | Number)<br>
    Scaling factor along the X axis. If "v3y" and "v3z" are omitted, this value can instead be a 3-element array giving the scaling factors along the X, Y, and Z axes.
* `v3y` (Type: Number)<br>
    Scaling factor along the Y axis.
* `v3z` (Type: Number)<br>
    Scaling factor along the Z axis.

#### Return Value

The resulting 4x4 matrix. (Type: Array.&lt;Number>)

### (static) H3DU.Math.mat4toFrustumPlanes(matrix) <a id='H3DU.Math.mat4toFrustumPlanes'></a>

Finds the six clipping planes of a view frustum defined
by a 4x4 matrix. These six planes together form the
shape of a "chopped-off" pyramid (or frustum).

In this model, the eye, or camera, is placed at the top
of the pyramid (before being chopped off), four planes are placed at the pyramid's
sides, one plane (the far plane) forms its base, and a
final plane (the near plane) is the pyramid's chopped
off top.

#### Parameters

* `matrix` (Type: Array.&lt;Number>)<br>
    A 4x4 matrix. This will usually be a projection-view matrix (projection matrix multiplied by view matrix).

#### Return Value

An array of six
4-element arrays representing the six clipping planes of the
view frustum. In order, they are the left, right, top,
bottom, near, and far clipping planes. All six planes
will be normalized (see <a href="H3DU.Math.md#H3DU.Math.planeNormInPlace">H3DU.Math.planeNormInPlace</a>). (Type: Array.&lt;Array.&lt;Number>>)

### (static) H3DU.Math.mat4toMat3(m4) <a id='H3DU.Math.mat4toMat3'></a>

Returns the upper-left part of a 4x4 matrix as a new
3x3 matrix.

#### Parameters

* `m4` (Type: Array.&lt;Number>)<br>
    A 4x4 matrix.

#### Return Value

The resulting 3x3 matrix. (Type: Array.&lt;Number>)

### (static) H3DU.Math.mat4transform(mat, v, vy, vz, vw) <a id='H3DU.Math.mat4transform'></a>

Transforms a 4-element vector with a 4x4 matrix and returns
the transformed vector.

#### Parameters

* `mat` (Type: Array.&lt;Number>)<br>
    A 4x4 matrix.
* `v` (Type: Array.&lt;Number> | Number)<br>
    X coordinate. If "vy", "vz", and "vw" are omitted, this value can instead be a 4-element array giving the X, Y, Z, and W coordinates.
* `vy` (Type: Number)<br>
    Y coordinate.
* `vz` (Type: Number)<br>
    Z coordinate.
* `vw` (Type: Number)<br>
    W coordinate. To transform a 3D point, set W to 1; to transform a 2D point, set Z and W to 1.

#### Return Value

The transformed vector. (Type: Array.&lt;Number>)

### (static) H3DU.Math.mat4transformVec3(mat, v, vy, vz) <a id='H3DU.Math.mat4transformVec3'></a>

Transforms a 3-element vector with the first three rows
of a 4x4 matrix (in column-major order) and returns the transformed vector.
This method assumes the matrix describes an affine
transformation, without perspective.

The effect is as though elements
3, 7, 11, and 15 (counting from 0) of the matrix
were assumed to be (0, 0, 0, 1) instead of their actual values
(those elements correspond to the last
row of the matrix in column-major order) and as though the 3-element
vector had a fourth element valued at 1.

For transforming 3-dimensional coordinates
with a matrix that may be in a perspective
projection (whose last row is not necessarily (0, 0, 0, 1)), use
the <a href="H3DU.Math.md#H3DU.Math.mat4projectVec3">H3DU.Math.mat4projectVec3</a> method instead.

#### Parameters

* `mat` (Type: Array.&lt;Number>)<br>
    A 4x4 matrix.
* `v` (Type: Array.&lt;Number> | Number)<br>
    X coordinate. If "vy" and "vz" are omitted, this value can instead be a 4-element array giving the X, Y, and Z coordinates.
* `vy` (Type: Number)<br>
    Y coordinate.
* `vz` (Type: Number)<br>
    Z coordinate. To transform a 2D point, set Z to 1.

#### Return Value

The transformed 3-element vector. (Type: Array.&lt;Number>)

### (static) H3DU.Math.mat4translate(mat, v3, v3y, v3z) <a id='H3DU.Math.mat4translate'></a>

Multiplies a 4x4 matrix by a translation transformation.

#### Parameters

* `mat` (Type: Array.&lt;Number>)<br>
    The matrix to multiply.
* `v3` (Type: Array.&lt;Number> | Number)<br>
    Translation along the X axis. If "v3y" and "v3z" are omitted, this value can instead be a 3-element array giving the translations along the X, Y, and Z axes.
* `v3y` (Type: Number)<br>
    Translation along the Y axis.
* `v3z` (Type: Number)<br>
    Translation along the Z axis.

#### Return Value

The resulting 4x4 matrix. (Type: Array.&lt;Number>)

### (static) H3DU.Math.mat4translated(v3, v3y, v3z) <a id='H3DU.Math.mat4translated'></a>

Returns a 4x4 matrix representing a translation.

#### Parameters

* `v3` (Type: Array.&lt;Number> | Number)<br>
    Translation along the X axis. If "v3y" and "v3z" are omitted, this value can instead be a 3-element array giving the translations along the X, Y, and Z axes.
* `v3y` (Type: Number)<br>
    Translation along the Y axis.
* `v3z` (Type: Number)<br>
    Translation along the Z axis.

#### Return Value

The resulting 4x4 matrix. (Type: Array.&lt;Number>)

### (static) H3DU.Math.mat4transpose(m4) <a id='H3DU.Math.mat4transpose'></a>

Returns the transpose of a 4x4 matrix.

#### Parameters

* `m4` (Type: Array.&lt;Number>)<br>
    A 4x4 matrix.

#### Return Value

The resulting 4x4 matrix. (Type: Array.&lt;Number>)

### (static) H3DU.Math.mat4transposeInPlace(mat) <a id='H3DU.Math.mat4transposeInPlace'></a>

Transposes a 4x4 matrix in place without creating
a new matrix.

#### Parameters

* `mat` (Type: Array.&lt;Number>)<br>
    A 4x4 matrix.

#### Return Value

The parameter "mat". (Type: Array.&lt;Number>)

### (static) H3DU.Math.planeNorm(plane) <a id='H3DU.Math.planeNorm'></a>

Normalizes this plane so that its normal is unit
length (unless all the normal's components are 0).
The plane's distance will be divided by the
normal's length. Returns a new plane.

#### Parameters

* `plane` (Type: Array.&lt;Number>)<br>
    A four-element array defining the plane. The first three elements of the array are the X, Y, and Z components of the plane's normal vector, and the fourth element is the shortest distance from the plane to the origin, or if negative, from the origin to the plane, divided by the normal's length.

#### Return Value

A normalized version of
the plane. (Type: Array.&lt;Number>)

### (static) H3DU.Math.planeNormInPlace(plane) <a id='H3DU.Math.planeNormInPlace'></a>

Normalizes this plane so that its normal is a unit vector (a <a href="H3DU.Math.md#H3DU.Math.vec3norm">"normalized" vector</a> with a length of 1),
unless all the normal's components are 0.
The plane's distance will be divided by the
current normal's length.

#### Parameters

* `plane` (Type: Array.&lt;Number>)<br>
    A four-element array defining the plane. The first three elements of the array are the X, Y, and Z components of the plane's normal vector, and the fourth element is the shortest distance from the plane to the origin, or if negative, from the origin to the plane, divided by the normal's length.

#### Return Value

The parameter "plane". (Type: Array.&lt;Number>)

### (static) H3DU.Math.quatConjugate(quat) <a id='H3DU.Math.quatConjugate'></a>

Inverts the rotation given in this quaternion, describing a rotation that undoes the given rotation,
but without changing its length (the return value won't necessarily be a unit vector, a <a href="H3DU.Math.md#H3DU.Math.vec3norm">"normalized" vector</a> with a length of 1).
Returns a new quaternion.

#### Parameters

* `quat` (Type: Array.&lt;Number>)<br>
    A quaternion, containing four elements.

#### Return Value

Return value. (Type: Array.&lt;Number>)

### (static) H3DU.Math.quatFromAxisAngle(angle, v, vy, vz) <a id='H3DU.Math.quatFromAxisAngle'></a>

Generates a quaternion from an angle and axis of rotation.
(The axis of rotation is a ray that starts at the
origin (0,0,0) and points toward a 3D point.)

#### Parameters

* `angle` (Type: Array.&lt;Number> | Number)<br>
    The desired angle to rotate in degrees. If "v", "vy", and "vz" are omitted, this can instead be a 4-element array giving the axis of rotation as the first three elements, followed by the angle in degrees as the fourth element.
* `v` (Type: Array.&lt;Number> | Number)<br>
    X-component of the point lying on the axis of rotation. If "vy" and "vz" are omitted, this can instead be a 3-element array giving the axis of rotation in x, y, and z, respectively. If the axis of rotation points toward the viewer, a positive value means the angle runs in a counterclockwise direction for right-handed coordinate systems and in a clockwise direction for left-handed systems.
* `vy` (Type: Number)<br>
    Y-component of the point lying on the axis of rotation.
* `vz` (Type: Number)<br>
    Z-component of the point lying on the axis of rotation.

#### Return Value

The generated quaternion. (Type: Array.&lt;Number>)

### (static) H3DU.Math.quatFromMat4(m) <a id='H3DU.Math.quatFromMat4'></a>

Generates a quaternion from the rotation described in a 4x4 matrix.
The upper 3x3 portion of the matrix is used for this calculation.
The results are undefined if the matrix includes shearing.

#### Parameters

* `m` (Type: Array.&lt;Number>)<br>
    A 4x4 matrix.

#### Return Value

The resulting quaternion. (Type: Array.&lt;Number>)

### (static) H3DU.Math.quatFromTaitBryan(pitchDegrees, yawDegrees, rollDegrees, [mode]) <a id='H3DU.Math.quatFromTaitBryan'></a>

Generates a quaternion from pitch, yaw and roll angles.
In the parameters given below, when the axis of rotation
points toward the viewer, a positive value means the angle runs in
a counterclockwise direction for right-handed coordinate systems and
in a clockwise direction for left-handed systems.
 (The axis of rotation is a ray that starts at the
origin (0,0,0) and points toward a 3D point.)

#### Parameters

* `pitchDegrees` (Type: Number)<br>
    Rotation about the x-axis (upward or downward turn), in degrees. This can instead be a 3-element array giving the rotation about the x-axis, y-axis, and z-axis, respectively.
* `yawDegrees` (Type: Number)<br>
    Rotation about the y-axis (left or right turn), in degrees. May be null or omitted if "pitchDegrees" is an array.
* `rollDegrees` (Type: Number)<br>
    Rotation about the z-axis (swaying side by side), in degrees. May be null or omitted if "pitchDegrees" is an array.
* `mode` (Type: Number) (optional)<br>
    Specifies the order in which the rotations will occur (in terms of their effect). Is one of the H3DU.Math constants such as H3DU.Math.PitchYawRoll and H3DU.Math.RollYawPitch. If null or omitted, the rotation will be described as the effect of a roll, then pitch, then yaw (each rotation around the original axes).

#### Return Value

The generated quaternion. (Type: Array.&lt;Number>)

### (static) H3DU.Math.quatFromVectors(vec1, vec2) <a id='H3DU.Math.quatFromVectors'></a>

Generates a quaternion describing a rotation between
two 3-element vectors. The quaternion
will describe the rotation required to rotate
the ray described in the first vector toward the ray described
in the second vector. The vectors need not be unit vectors (<a href="H3DU.Math.md#H3DU.Math.vec3norm">"normalized" vectors</a> with a length of 1).

#### Parameters

* `vec1` (Type: Array.&lt;Number>)<br>
    The first 3-element vector.
* `vec2` (Type: Array.&lt;Number>)<br>
    The second 3-element vector.

#### Return Value

The generated quaternion, which
will be unit vectors (<a href="H3DU.Math.md#H3DU.Math.vec3norm">"normalized" vectors</a> with a length of 1). (Type: Array.&lt;Number>)

### (static) H3DU.Math.quatIdentity() <a id='H3DU.Math.quatIdentity'></a>

Returns the identity quaternion of multiplication, (0, 0, 0, 1).

#### Return Value

Return value. (Type: Array.&lt;Number>)

### (static) H3DU.Math.quatInvert(quat) <a id='H3DU.Math.quatInvert'></a>

Inverts the rotation given in this quaternion, describing a rotation that undoes the given rotation,
and converts this quaternion to a unit vector (a <a href="H3DU.Math.md#H3DU.Math.vec3norm">"normalized" vector</a> with a length of 1).
Returns a new quaternion.

#### Parameters

* `quat` (Type: Array.&lt;Number>)<br>
    A quaternion, containing four elements.

#### Return Value

Return value. (Type: Array.&lt;Number>)

#### See Also

<a href="H3DU.Math.md#H3DU.Math.quatConjugate">H3DU.Math.quatConjugate</a>

### (static) H3DU.Math.quatIsIdentity(quat) <a id='H3DU.Math.quatIsIdentity'></a>

#### Parameters

* `quat` (Type: Object)<br>
    Description of quat. Returns whether this quaternion is the identity quaternion, (0, 0, 0, 1).

#### Return Value

Return value. (Type: Boolean)

### (static) H3DU.Math.quatMultiply(a, b) <a id='H3DU.Math.quatMultiply'></a>

Multiplies two quaternions, creating a composite rotation.
The quaternions are multiplied such that the second quaternion's
rotation happens before the first quaternion's rotation.

Multiplying two unit quaternions (each with a length of 1) will result
in a unit quaternion. However, for best results, you should
normalize the quaternions every few multiplications (using
quatNorm or quatNormInPlace), since successive
multiplications can cause rounding errors.

#### Parameters

* `a` (Type: Array.&lt;Number>)<br>
    The first quaternion.
* `b` (Type: Array.&lt;Number>)<br>
    The second quaternion.

#### Return Value

The resulting quaternion. (Type: Array.&lt;Number>)

### (static) H3DU.Math.quatNlerp(q1, q2, factor) <a id='H3DU.Math.quatNlerp'></a>

Returns a quaternion that lies along the shortest path between the
given two quaternion rotations, using a linear interpolation function, and converts
it to a unit vector (a <a href="H3DU.Math.md#H3DU.Math.vec4norm">"normalized" vector</a> with a length of 1).
This is called a normalized linear interpolation, or "nlerp".

Because the shortest path is curved, not straight, this method
will generally not interpolate at constant velocity;
however, the difference in this velocity when interpolating is
rarely noticeable and this method is generally faster than
the <a href="H3DU.Math.md#H3DU.Math.quatSlerp">H3DU.Math.quatSlerp</a> method.

#### Parameters

* `q1` (Type: Array.&lt;Number>)<br>
    The first quaternion. Must be a unit vector.
* `q2` (Type: Array.&lt;Number>)<br>
    The second quaternion. Must be a unit vector.
* `factor` (Type: Number)<br>
    A value from 0 through 1. Closer to 0 means closer to q1, and closer to 1 means closer to q2.

#### Return Value

The interpolated quaternion,
which will be a unit vector. (Type: Array.&lt;Number>)

### (static) H3DU.Math.quatRotate(quat, angle, v, vy, vz) <a id='H3DU.Math.quatRotate'></a>

Multiplies a quaternion by a rotation transformation
described as an angle and axis of rotation.
The result is such that the angle-axis
rotation happens before the quaternion's rotation.

This method is equivalent to the following:

    return quatMultiply(quat,quatFromAxisAngle(angle,v,vy,vz));

#### Parameters

* `quat` (Type: Array.&lt;Number>)<br>
    Quaternion to rotate.
* `angle` (Type: Array.&lt;Number> | Number)<br>
    The desired angle to rotate in degrees. If "v", "vy", and "vz" are omitted, this can instead be a 4-element array giving the axis of rotation as the first three elements, followed by the angle in degrees as the fourth element. If the axis of rotation points toward the viewer, a positive value means the angle runs in a counterclockwise direction for right-handed coordinate systems and in a clockwise direction for left-handed systems.
* `v` (Type: Array.&lt;Number> | Number)<br>
    X-component of the point lying on the axis of rotation. If "vy" and "vz" are omitted, this can instead be a 3-element array giving the axis of rotation in x, y, and z, respectively.
* `vy` (Type: Number)<br>
    Y-component of the point lying on the axis of rotation.
* `vz` (Type: Number)<br>
    Z-component of the point lying on the axis of rotation.

#### Return Value

The resulting quaternion. (Type: Array.&lt;Number>)

### (static) H3DU.Math.quatSlerp(q1, q2, factor) <a id='H3DU.Math.quatSlerp'></a>

Returns a quaternion that lies along the shortest path between the
given two quaternion rotations, using a spherical interpolation function.
This is called spherical linear interpolation, or "slerp". (A spherical
interpolation finds the angle between the two quaternions -- which
are treated as 4D vectors -- and then finds a vector with a smaller angle
between it and the first quaternion. The "factor" parameter specifies
how small the new angle will be relative to the original angle.)

This method will generally interpolate at constant velocity; however,
this method is commutative (the order in which the quaternions are given
matters), unlike <a href="H3DU.Math.md#H3DU.Math.quatNlerp">quatNlerp</a>, making it
unsuitable for blending multiple quaternion rotations,
and this method is generally more computationally expensive
than the <a href="H3DU.Math.md#H3DU.Math.quatNlerp">quatNlerp</a> method.

#### Parameters

* `q1` (Type: Array.&lt;Number>)<br>
    The first quaternion. Must be a unit vector (a <a href="H3DU.Math.md#H3DU.Math.vec4norm">"normalized" vector</a> with a length of 1).
* `q2` (Type: Array.&lt;Number>)<br>
    The second quaternion. Must be a unit vector.
* `factor` (Type: Number)<br>
    A value from 0 through 1. Closer to 0 means closer to q1, and closer to 1 means closer to q2.

#### Return Value

The interpolated quaternion. (Type: Array.&lt;Number>)

#### See Also

["Understanding Slerp, Then Not Using It", Jonathan Blow](http://number-none.com/product/Understanding%20Slerp,%20Then%20Not%20Using%20It/),
for additional background

### (static) H3DU.Math.quatToAxisAngle(a) <a id='H3DU.Math.quatToAxisAngle'></a>

Calculates the angle and axis of rotation for this
quaternion. (The axis of rotation is a ray that starts at the
origin (0,0,0) and points toward a 3D point.)

#### Parameters

* `a` (Type: Array.&lt;Number>)<br>
    A quaternion. Must be a unit vector (<a href="H3DU.Math.md#H3DU.Math.vec3norm">a "normalized" vector</a> with a length of 1).

#### Return Value

A 4-element array giving the axis
of rotation as the first three elements, followed by the angle
in degrees as the fourth element. If the axis of rotation
points toward the viewer, a positive value means the angle runs in
a counterclockwise direction for right-handed coordinate systems and
in a clockwise direction for left-handed systems. (Type: Array.&lt;Number>)

### (static) H3DU.Math.quatToMat4(quat) <a id='H3DU.Math.quatToMat4'></a>

Generates a 4x4 matrix describing the rotation
described by this quaternion.

#### Parameters

* `quat` (Type: Array.&lt;Number>)<br>
    A quaternion.

#### Return Value

Return value. (Type: Array.&lt;Number>)

### (static) H3DU.Math.quatToTaitBryan(a, [mode]) <a id='H3DU.Math.quatToTaitBryan'></a>

Converts this quaternion to the same version of the rotation
in the form of pitch, yaw, and roll angles.

#### Parameters

* `a` (Type: Array.&lt;Number>)<br>
    A quaternion. Should be a unit vector (a <a href="H3DU.Math.md#H3DU.Math.vec3norm">"normalized" vector</a> with a length of 1).
* `mode` (Type: Number) (optional)<br>
    Specifies the order in which the rotations will occur (in terms of their effect, not in terms of how they will be returned by this method). Is one of the H3DU.Math constants such as H3DU.Math.PitchYawRoll and H3DU.Math.RollYawPitch. If null or omitted, the rotation will be described as the effect of a roll, then pitch, then yaw (each rotation around the original axes).

#### Return Value

A 3-element array containing the
pitch, yaw, and roll angles, in that order, in degrees. For each
angle, if the corresponding axis
points toward the viewer, a positive value means the angle runs in
a counterclockwise direction for right-handed coordinate systems and
in a clockwise direction for left-handed systems. (Type: Array.&lt;Number>)

### (static) H3DU.Math.quatTransform(q, v) <a id='H3DU.Math.quatTransform'></a>

Transforms a 3- or 4-element vector using a quaternion's rotation.

#### Parameters

* `q` (Type: Array.&lt;Number>)<br>
    A quaternion describing the rotation.
* `v` (Type: Array.&lt;Number>)<br>
    A 3- or 4-element vector to transform. The fourth element, if any, is ignored.

#### Return Value

A 4-element vector representing
the transformed vector. The fourth element will be 1.0.
If the input vector has 3 elements, a 3-element vector will
be returned instead. (Type: Array.&lt;Number>)

### (static) H3DU.Math.vec3add(a, b) <a id='H3DU.Math.vec3add'></a>

Adds two 3-element vectors and returns a new
vector with the result. Adding two vectors
is the same as adding each of their components.

#### Parameters

* `a` (Type: Array.&lt;Number>)<br>
    The first 3-element vector.
* `b` (Type: Array.&lt;Number>)<br>
    The second 3-element vector.

#### Return Value

The resulting 3-element vector. (Type: Array.&lt;Number>)

### (static) H3DU.Math.vec3addInPlace(a, b) <a id='H3DU.Math.vec3addInPlace'></a>

Adds two 3-element vectors and stores
the result in the first vector. Adding two vectors
is the same as adding each of their components.

#### Parameters

* `a` (Type: Array.&lt;Number>)<br>
    The first 3-element vector.
* `b` (Type: Array.&lt;Number>)<br>
    The second 3-element vector.

#### Return Value

The parameter "a" (Type: Array.&lt;Number>)

### (static) H3DU.Math.vec3assign(dst, src) <a id='H3DU.Math.vec3assign'></a>

Assigns the values of a 3-element vector into another
3-element vector.

#### Parameters

* `dst` (Type: Array.&lt;Number>)<br>
    The 3-element vector to assign to.
* `src` (Type: Array.&lt;Number>)<br>
    The 3-element vector whose values will be copied.

#### Return Value

The parameter "dst" (Type: Array.&lt;Number>)

### (static) H3DU.Math.vec3copy(vec) <a id='H3DU.Math.vec3copy'></a>

Returns a copy of a 3-element vector.

#### Parameters

* `vec` (Type: Array.&lt;Number>)<br>
    A 3-element vector.

#### Return Value

Return value. (Type: Array.&lt;Number>)

### (static) H3DU.Math.vec3cross(a, b) <a id='H3DU.Math.vec3cross'></a>

Finds the cross product of two 3-element vectors (called A and B).
The following are properties of
the cross product:<ul>
<li>The cross product will be a vector that is perpendicular to both A and B.
<li>Switching the order of A and B results in a cross product
vector with the same length but opposite direction.
<li>If the cross product's length is 0, then A and B are parallel vectors.
<li>Let there be a triangle formed by point A, point B, and the point (0,0,0) in that order.
Assume the X axis points to the right and the Y axis points up.
If the cross product of A and B has a positive Z component, the triangle's points are
oriented counterclockwise; otherwise, clockwise. (If the X axis points right and the Y
axis down, the reverse is
true.) The triangle's area is half of the cross product's length.
<li>If A and B are unit vectors (<a href="H3DU.Math.md#H3DU.Math.vec3norm">"normalized" vectors</a> with a length of 1), the absolute value
of the sine of the shortest angle between them is equal to the length of their
cross product. <small>(More formally, the length of the cross
product equals |<b>a</b>| \* |<b>b</b>| \* |sin &theta;|;
where |<b>x</b>| is the length of vector <b>x</b>.)</small></ul>
The cross product (<b>c</b>) of vectors <b>a</b> and <b>b</b> is found as
follows:

    <b>c</b>.x = <b>a</b>.y * <b>b</b>.z - <b>a</b>.z * <b>b</b>.y
    <b>c</b>.y = <b>a</b>.z * <b>b</b>.x - <b>a</b>.x * <b>b</b>.z
    <b>c</b>.z = <b>a</b>.x * <b>b</b>.y - <b>a</b>.y * <b>b</b>.x

#### Parameters

* `a` (Type: Array.&lt;Number>)<br>
    The first vector.
* `b` (Type: Array.&lt;Number>)<br>
    The second vector.

#### Return Value

A 3-element vector containing the cross product. (Type: Array.&lt;Number>)

#### Example

The following example uses the cross product to
calculate a triangle's normal vector and its area.

    var a=triangle[0];
     var b=triangle[1];
     var c=triangle[2];
     // Find vector from C to A
     var da=H3DU.Math.vec3sub(a,c);
     // Find vector from C to B
     var db=H3DU.Math.vec3sub(b,c);
     // The triangle's normal is the cross product of da and db
     var normal=H3DU.Math.vec3cross(da,db);
     // Find the triangle's area
     var area=H3DU.Math.vec3length(normal)*0.5;

### (static) H3DU.Math.vec3dot(a, b) <a id='H3DU.Math.vec3dot'></a>

Finds the dot product of two 3-element vectors. It's the
sum of the products of their components (for example, <b>a</b>'s X times
<b>b</b>'s X).

The dot product has the following properties:
<ul>
<li>If both vectors are unit vectors (<a href="H3DU.Math.md#H3DU.Math.vec3norm">"normalized" vectors</a> with a length of 1), the cosine
of the angle between them is equal to their dot product.
<small>(More formally, the dot
product equals |<b>a</b>| \* |<b>b</b>| \* cos &theta;
where |<b>x</b>| is the length of vector <b>x</b>.)</small>
However, the resulting angle (found using the <code>Math.acos</code>
function) will never be negative, so it can't
be used to determine if one vector is "ahead of" or "behind" another
vector.
<li>A dot product of 0 indicates that the two vectors
are <i>orthogonal</i> (perpendicular to each other).
<li>If the two vectors are the same, the return value indicates
the vector's length squared. This is illustrated in the example.
</ul>

#### Parameters

* `a` (Type: Array.&lt;Number>)<br>
    The first vector.
* `b` (Type: Array.&lt;Number>)<br>
    The second vector.

#### Return Value

A number representing the dot product. (Type: Number)

#### Example

The following shows a fast way to compare
a vector's length using the dot product.

    // Check if the vector's length squared is less than 20 units squared
    if(H3DU.Math.vec3dot(vector, vector)<20*20) {
     // The vector's length is shorter than 20 units
    }

### (static) H3DU.Math.vec3length(a) <a id='H3DU.Math.vec3length'></a>

Returns the distance of this 3-element vector from the origin.
It's the same as the square root of the sum of the squares
of its components.

#### Parameters

* `a` (Type: Array.&lt;Number>)<br>
    A 3-element vector.

#### Return Value

Return value. (Type: Number)

### (static) H3DU.Math.vec3lerp(v1, v2, factor) <a id='H3DU.Math.vec3lerp'></a>

Does a linear interpolation between two 3-element vectors;
returns a new vector.

#### Parameters

* `v1` (Type: Array.&lt;Number>)<br>
    The first vector.
* `v2` (Type: Array.&lt;Number>)<br>
    The second vector.
* `factor` (Type: Number)<br>
    A value from 0 through 1. Closer to 0 means closer to v1, and closer to 1 means closer to v2.

#### Return Value

The interpolated vector. (Type: Array.&lt;Number>)

### (static) H3DU.Math.vec3mul(a, b) <a id='H3DU.Math.vec3mul'></a>

Multiplies two vectors and returns a new
vector with the result. Multiplying two vectors
is the same as multiplying each of their components.

#### Parameters

* `a` (Type: Array.&lt;Number>)<br>
    The first 3-element vector.
* `b` (Type: Array.&lt;Number>)<br>
    The second 3-element vector.

#### Return Value

The resulting 3-element vector. (Type: Array.&lt;Number>)

### (static) H3DU.Math.vec3mulInPlace(a, b) <a id='H3DU.Math.vec3mulInPlace'></a>

Multiplies two 3-element vectors and stores
the result in the first vector. Multiplying two vectors
is the same as multiplying each of their components.

#### Parameters

* `a` (Type: Array.&lt;Number>)<br>
    The first 3-element vector.
* `b` (Type: Array.&lt;Number>)<br>
    The second 3-element vector.

#### Return Value

The parameter "a" (Type: Array.&lt;Number>)

### (static) H3DU.Math.vec3negate(a) <a id='H3DU.Math.vec3negate'></a>

Negates a 3-element vector and returns a new
vector with the result. Negating a vector
is the same as reversing the sign of each of its components.

#### Parameters

* `a` (Type: Array.&lt;Number>)<br>
    A 3-element vector.

#### Return Value

The resulting 3-element vector. (Type: Array.&lt;Number>)

### (static) H3DU.Math.vec3negateInPlace(a) <a id='H3DU.Math.vec3negateInPlace'></a>

Negates a 3-element vector in place.
Negating a vector
is the same as reversing the sign of each of its components.

#### Parameters

* `a` (Type: Array.&lt;Number>)<br>
    A 3-element vector.

#### Return Value

The parameter "a". (Type: Array.&lt;Number>)

### (static) H3DU.Math.vec3norm(vec) <a id='H3DU.Math.vec3norm'></a>

Returns a normalized version of a 3-element vector.
When a vector is normalized, its direction remains the same but the distance from the origin
to that vector becomes 1 (unless all its components are 0).
A vector is normalized by dividing each of its components
by its length.

#### Parameters

* `vec` (Type: Array.&lt;Number>)<br>
    A 3-element vector.

#### Return Value

The resulting vector. (Type: Array.&lt;Number>)

### (static) H3DU.Math.vec3normInPlace(vec) <a id='H3DU.Math.vec3normInPlace'></a>

Converts a 3-element vector to its normalized version.
When a vector is normalized, its direction remains the same but the distance from the origin
to that vector becomes 1 (unless all its components are 0).
A vector is normalized by dividing each of its components
by its length.

#### Parameters

* `vec` (Type: Array.&lt;Number>)<br>
    A 3-element vector.

#### Return Value

The parameter "vec". (Type: Array.&lt;Number>)

### (static) H3DU.Math.vec3scale(a, scalar) <a id='H3DU.Math.vec3scale'></a>

Multiplies a 3-element vector by a factor
(thus multiplying that vector's length by that factor)
and returns a new vector with the result.

#### Parameters

* `a` (Type: Array.&lt;Number>)<br>
    A 3-element vector.
* `scalar` (Type: Number)<br>
    A factor to multiply.

#### Return Value

The parameter "a". (Type: Array.&lt;Number>)

### (static) H3DU.Math.vec3scaleInPlace(a, scalar) <a id='H3DU.Math.vec3scaleInPlace'></a>

Multiplies each element of a 3-element vector by a factor
(thus multiplying that vector's length by that factor)
and stores the result in that vector.

#### Parameters

* `a` (Type: Array.&lt;Number>)<br>
    A 3-element vector.
* `scalar` (Type: Number)<br>
    A factor to multiply.

#### Return Value

The parameter "a". (Type: Array.&lt;Number>)

### (static) H3DU.Math.vec3sub(a, b) <a id='H3DU.Math.vec3sub'></a>

Subtracts the second vector from the first vector and returns a new
vector with the result. Subtracting two vectors
is the same as subtracting each of their components.

#### Parameters

* `a` (Type: Array.&lt;Number>)<br>
    The first 3-element vector.
* `b` (Type: Array.&lt;Number>)<br>
    The second 3-element vector.

#### Return Value

The resulting 3-element vector.
This is the vector <i>to <code>a</code> from <code>b</code></i>. (Type: Array.&lt;Number>)

### (static) H3DU.Math.vec3subInPlace(a, b) <a id='H3DU.Math.vec3subInPlace'></a>

Subtracts the second vector from the first vector and stores
the result in the first vector. Subtracting two vectors
is the same as subtracting each of their components.

#### Parameters

* `a` (Type: Array.&lt;Number>)<br>
    The first 3-element vector.
* `b` (Type: Array.&lt;Number>)<br>
    The second 3-element vector.

#### Return Value

The parameter "a" (Type: Array.&lt;Number>)

### (static) H3DU.Math.vec3toScreenPoint(vector, matrix, viewport, [yUp]) <a id='H3DU.Math.vec3toScreenPoint'></a>

Transforms the 3D point specified in this 3-element vector to its X
and Y coordinates in <i>screen space</i>, and its normalized device Z coordinate,
using the given transformation matrix and viewport
width and height. The X coordinates in this screen space increase
rightward, the Y coordinates in this space increase upward
or downward depending on the "yUp" parameter, and the Z
coordinates increase away from the viewer.

#### Parameters

* `vector` (Type: Array.&lt;Number>)<br>
    A 3-element vector giving the X, Y, and Z coordinates of the 3D point to transform.
* `matrix` (Type: Array.&lt;Number>)<br>
    A 4x4 matrix to use to transform the vector to normalized device coordinates. This will generally be a projection-view matrix, that is, the projection matrix multiplied by the view matrix, in that order, if the vector to transform is in <i>world space</i>, or a model-view-projection matrix, that is, a projection-view matrix multiplied by the model (world) matrix, in that order, if the vector is in <i>model (object) space</i>. The rest of the method will transform the normalized device coordinates to screen space.
* `viewport` (Type: Array.&lt;Number>)<br>
    A 4-element array specifying the starting position and size of the viewport in screen space units (such as pixels). In order, the four elements are the starting position's X coordinate, its Y coordinate, the viewport's width, and the viewport's height. Throws an error if the width or height is less than 0.
* `yUp` (Type: Boolean) (optional)<br>
    If true, the viewport's starting position is at the lower left corner and Y coordinates in screen space increase upward. If false, null, or omitted, the viewport's starting position is at the upper left corner and Y coordinates in screen space increase downward.

#### Return Value

A 3-element array giving the X and Y
coordinates, both in screen space, and the normalized device
Z coordinate, in that order. (Type: Array.&lt;Number>)

#### See Also

<a href="H3DU.Math.md#H3DU.Math.mat4projectVec3">H3DU.Math.mat4projectVec3</a>, for more information
on normalized device coordinates.

### (static) H3DU.Math.vec4assign(dst, src) <a id='H3DU.Math.vec4assign'></a>

Assigns the values of a 4-element vector into another
4-element vector.

#### Parameters

* `dst` (Type: Array.&lt;Number>)<br>
    The 4-element vector to copy the source values to.
* `src` (Type: Array.&lt;Number>)<br>
    The 4-element vector whose values will be copied.

#### Return Value

The parameter "dst". (Type: Array.&lt;Number>)

### (static) H3DU.Math.vec4copy(vec) <a id='H3DU.Math.vec4copy'></a>

Returns a copy of a 4-element vector.

#### Parameters

* `vec` (Type: Array.&lt;Number>)<br>
    A 4-element vector.

#### Return Value

Return value. (Type: Array.&lt;Number>)

### (static) H3DU.Math.vec4dot(a, b) <a id='H3DU.Math.vec4dot'></a>

Finds the dot product of two 4-element vectors. It's the
sum of the products of their components (for example, <b>a</b>'s X times <b>b</b>'s X).

#### Parameters

* `a` (Type: Array.&lt;Number>)<br>
    The first 4-element vector.
* `b` (Type: Array.&lt;Number>)<br>
    The second 4-element vector.

#### Return Value

Return value. (Type: Object)

### (static) H3DU.Math.vec4length(a) <a id='H3DU.Math.vec4length'></a>

Returns the distance of this 4-element vector from the origin.
It's the same as the square root of the sum of the squares
of its components.

#### Parameters

* `a` (Type: Array.&lt;Number>)<br>
    A 4-element vector.

#### Return Value

Return value. (Type: Number)

### (static) H3DU.Math.vec4lerp(v1, v2, factor) <a id='H3DU.Math.vec4lerp'></a>

Does a linear interpolation between two 4-element vectors;
returns a new vector.

#### Parameters

* `v1` (Type: Array.&lt;Number>)<br>
    The first vector.
* `v2` (Type: Array.&lt;Number>)<br>
    The second vector.
* `factor` (Type: Number)<br>
    A value from 0 through 1. Closer to 0 means closer to v1, and closer to 1 means closer to v2.

#### Return Value

The interpolated vector. (Type: Array.&lt;Number>)

### (static) H3DU.Math.vec4norm(vec) <a id='H3DU.Math.vec4norm'></a>

Returns a normalized version of a 4-element vector.
When a vector is normalized, its direction remains the same but the distance from the origin
to that vector becomes 1 (unless all its components are 0).
A vector is normalized by dividing each of its components
by its length.

#### Parameters

* `vec` (Type: Array.&lt;Number>)<br>
    A 4-element vector.

#### Return Value

The resulting vector. (Type: Array.&lt;Number>)

### (static) H3DU.Math.vec4normInPlace(vec) <a id='H3DU.Math.vec4normInPlace'></a>

Converts a 4-element vector to its normalized version.
When a vector is normalized, its direction remains the same but the distance from the origin
to that vector becomes 1 (unless all its components are 0).
A vector is normalized by dividing each of its components
by its length.

#### Parameters

* `vec` (Type: Array.&lt;Number>)<br>
    A 4-element vector.

#### Return Value

The parameter "vec". (Type: Array.&lt;Number>)

### (static) H3DU.Math.vec4scale(a, scalar) <a id='H3DU.Math.vec4scale'></a>

Multiplies each element of a 4-element vector by a factor
(thus multiplying that vector's length by that factor)
and returns a new vector with the result.

#### Parameters

* `a` (Type: Array.&lt;Number>)<br>
    A 4-element vector.
* `scalar` (Type: Number)<br>
    A factor to multiply.

#### Return Value

The resulting 4-element vector. (Type: Array.&lt;Number>)

### (static) H3DU.Math.vec4scaleInPlace(a, scalar) <a id='H3DU.Math.vec4scaleInPlace'></a>

Multiplies each element of a 4-element vector by a factor
(thus multiplying that vector's length by that factor)
and stores the result in that vector.

#### Parameters

* `a` (Type: Array.&lt;Number>)<br>
    A 4-element vector.
* `scalar` (Type: Number)<br>
    A factor to multiply.

#### Return Value

The parameter "a". (Type: Array.&lt;Number>)

# H3DU.Transform

[Back to documentation index.](index.md)

### H3DU.Transform() <a id='H3DU.Transform'></a>

A class offering a convenient way to set a transformation
from one coordinate system to another.

### Methods

* [copy](#H3DU.Transform_H3DU.Transform_copy)
* [getMatrix](#H3DU.Transform_H3DU.Transform_getMatrix)
* [getPosition](#H3DU.Transform_H3DU.Transform_getPosition)
* [getQuaternion](#H3DU.Transform_H3DU.Transform_getQuaternion)
* [getScale](#H3DU.Transform_H3DU.Transform_getScale)
* [isIdentity](#H3DU.Transform_H3DU.Transform_isIdentity)
* [movePosition](#H3DU.Transform_H3DU.Transform_movePosition)
* [multOrientation](#H3DU.Transform_H3DU.Transform_multOrientation)
* [multQuaternion](#H3DU.Transform_H3DU.Transform_multQuaternion)
* [reset](#H3DU.Transform_H3DU.Transform_reset)
* [resetTransform](#H3DU.Transform_H3DU.Transform_resetTransform)
* [setMatrix](#H3DU.Transform_H3DU.Transform_setMatrix)
* [setOrientation](#H3DU.Transform_H3DU.Transform_setOrientation)
* [setPosition](#H3DU.Transform_H3DU.Transform_setPosition)
* [setQuaternion](#H3DU.Transform_H3DU.Transform_setQuaternion)
* [setScale](#H3DU.Transform_H3DU.Transform_setScale)

### H3DU.Transform#copy() <a id='H3DU.Transform_H3DU.Transform_copy'></a>

Makes a copy of this object. The copied object
will have its own version of the rotation, scale,
position, and matrix data.

#### Return Value

A copy of this object. (Type: <a href="H3DU.Transform.md">H3DU.Transform</a>)

### H3DU.Transform#getMatrix() <a id='H3DU.Transform_H3DU.Transform_getMatrix'></a>

Gets the transformation matrix used by an object. Depending
on the state of this object, will return either:<ul>
<li>The 4x4 matrix passed to H3DU.Transform#setMatrix, if the
matrix was defined with that method
and the transform wasn't reset yet with H3DU.Transform#resetTransform.
<li>The matrix resulting from the position, rotation, and scale properties,
multiplied in that order, otherwise.
</ul>

#### Return Value

Return value. (Type: Array.&lt;Number>)

### H3DU.Transform#getPosition() <a id='H3DU.Transform_H3DU.Transform_getPosition'></a>

Returns a copy of a three-element array giving the X, Y, and Z coordinates of the position
of an object relative to its original position.

#### Return Value

Return value. (Type: Array.&lt;Number>)

### H3DU.Transform#getQuaternion() <a id='H3DU.Transform_H3DU.Transform_getQuaternion'></a>

Returns a copy of the rotation of an object in the form of a <a href="tutorial-glmath.md">quaternion</a>.

#### Return Value

Return value. (Type: Array.&lt;Number>)

### H3DU.Transform#getScale() <a id='H3DU.Transform_H3DU.Transform_getScale'></a>

Returns a copy of a three-element array giving the scaling for an object's width,
height, and depth, respectively.
For each component, 1 means no scaling.

#### Return Value

Return value. (Type: Array.&lt;Number>)

### H3DU.Transform#isIdentity() <a id='H3DU.Transform_H3DU.Transform_isIdentity'></a>

Returns whether this transform is the identity transform.

#### Return Value

Return value. (Type: Boolean)

### H3DU.Transform#movePosition(x, y, z) <a id='H3DU.Transform_H3DU.Transform_movePosition'></a>

Moves the relative position of an object from its original
position. Has no effect if a matrix was defined with H3DU.Transform#setMatrix
and the transform wasn't reset yet with H3DU.Transform#resetTransform.

#### Parameters

* `x` (Type: Array.&lt;Number> | number)<br>
    Number to add to the X-coordinate, If "y" and "z" are null or omitted, this is instead a 3-element array giving the numbers to add to the X, Y, and Z coordinates, or a single number to add to all three coordinates.
* `y` (Type: Number)<br>
    Number to add to the Y-coordinate. If "x" is an array, this parameter may be omitted.
* `z` (Type: Number)<br>
    Number to add to the Z-coordinate. If "x" is an array, this parameter may be omitted.

#### Return Value

This object. (Type: <a href="H3DU.Transform.md">H3DU.Transform</a>)

### H3DU.Transform#multOrientation(angle, v, vy, vz) <a id='H3DU.Transform_H3DU.Transform_multOrientation'></a>

Combines an object's current rotation with another rotation
in the form of an angle and an axis of
rotation. The combined rotation will have the
same effect as the new rotation followed by the existing rotation.
 Has no effect if a matrix was defined with H3DU.Transform#setMatrix
and the transform wasn't reset yet with H3DU.Transform#resetTransform.

#### Parameters

* `angle` (Type: Array.&lt;Number> | number)<br>
    The desired angle to rotate in degrees. See H3DU.Transform#setOrientation.
* `v` (Type: Array.&lt;Number> | number)<br>
    X-component of the point lying on the axis of rotation. If "vy" and "vz" are omitted, this can instead be a 3-element array giving the axis of rotation in x, y, and z, respectively.
* `vy` (Type: Number)<br>
    Y-component of the point lying on the axis of rotation.
* `vz` (Type: Number)<br>
    Z-component of the point lying on the axis of rotation.

#### Return Value

This object. (Type: <a href="H3DU.Transform.md">H3DU.Transform</a>)

### H3DU.Transform#multQuaternion(quat) <a id='H3DU.Transform_H3DU.Transform_multQuaternion'></a>

Combines an object's current rotation with another rotation
described by a <a href="tutorial-glmath.md">quaternion</a> (a 4-element array
for describing 3D rotations). The combined rotation will have the
same effect as the new rotation followed by the existing rotation.
 Has no effect if a matrix was defined with H3DU.Transform#setMatrix
and the transform wasn't reset yet with H3DU.Transform#resetTransform.

#### Parameters

* `quat` (Type: Array.&lt;Number>)<br>
    A four-element array describing the rotation. A quaternion is returned from the methods glmath.H3DU.Math.quatFromAxisAngle or glmath.H3DU.Math.quatFromTaitBryan.

#### Return Value

This object. (Type: <a href="H3DU.Transform.md">H3DU.Transform</a>)

#### Example

    // Combine an object's orientation with a rotation 20 degrees about the X-axis
    transform.multQuaternion(H3DU.Math.quatFromAxisAngle(20,1,0,0));
    // Combine an object's orientation with identity (no rotation)
    transform.multQuaternion(H3DU.Math.quatIdentity());
    // Combine an object's orientation with 30 degree pitch multiplied
    // by 40 degree roll
    transform.multQuaternion(H3DU.Math.quatFromTaitBryan(30,0,40));

### H3DU.Transform#reset() <a id='H3DU.Transform_H3DU.Transform_reset'></a>

Resets this shape to the untransformed state.

#### Return Value

This object. (Type: <a href="H3DU.Shape.md">H3DU.Shape</a>)

### H3DU.Transform#resetTransform() <a id='H3DU.Transform_H3DU.Transform_resetTransform'></a>

<b>Deprecated: Use the "reset" method instead.</b>

Resets this transform to the untransformed state.

#### Return Value

This object. (Type: <a href="H3DU.Transform.md">H3DU.Transform</a>)

### H3DU.Transform#setMatrix(value) <a id='H3DU.Transform_H3DU.Transform_setMatrix'></a>

Sets this shape's transformation matrix. This method
will set the position, rotation, and scale properties
accordingly to the matrix given.

#### Parameters

* `value` (Type: Array.&lt;Number>)<br>
    A 4x4 matrix. This method will copy the value of this parameter.

#### Return Value

This object. (Type: <a href="H3DU.Transform.md">H3DU.Transform</a>)

### H3DU.Transform#setOrientation(angle, v, vy, vz) <a id='H3DU.Transform_H3DU.Transform_setOrientation'></a>

Sets this object's orientation in the form of an angle and an axis of
rotation. Has no effect if a matrix was defined with H3DU.Transform#setMatrix
and the transform wasn't reset yet with H3DU.Transform#resetTransform.

#### Parameters

* `angle` (Type: Array.&lt;Number> | number)<br>
    The desired angle to rotate in degrees. If "v", "vy", and "vz" are omitted, this can instead be a 4-element array giving the axis of rotation as the first three elements, followed by the angle in degrees as the fourth element. If the axis of rotation points toward the viewer, a positive value means the angle runs in a counterclockwise direction for right-handed coordinate systems and in a clockwise direction for left-handed systems.
* `v` (Type: Array.&lt;Number> | number)<br>
    X-component of the point lying on the axis of rotation. If "vy" and "vz" are omitted, this can instead be a 3-element array giving the axis of rotation in x, y, and z, respectively.
* `vy` (Type: Number)<br>
    Y-component of the point lying on the axis of rotation.
* `vz` (Type: Number)<br>
    Z-component of the point lying on the axis of rotation.

#### Return Value

This object. (Type: <a href="H3DU.Transform.md">H3DU.Transform</a>)

### H3DU.Transform#setPosition(x, y, z) <a id='H3DU.Transform_H3DU.Transform_setPosition'></a>

Sets the relative position of an object from its original
position. Has no effect if a matrix was defined with H3DU.Transform#setMatrix
and the transform wasn't reset yet with H3DU.Transform#resetTransform.

#### Parameters

* `x` (Type: Array.&lt;Number> | number)<br>
    The X-coordinate. If "y" and "z" are null or omitted, this is instead a 3-element array giving the X, Y, and Z coordinates, or a single number giving the coordinate for all three dimensions.
* `y` (Type: Number)<br>
    The Y-coordinate. If "x" is an array, this parameter may be omitted.
* `z` (Type: Number)<br>
    The Z-coordinate. If "x" is an array, this parameter may be omitted.

#### Return Value

This object. (Type: <a href="H3DU.Transform.md">H3DU.Transform</a>)

### H3DU.Transform#setQuaternion(quat) <a id='H3DU.Transform_H3DU.Transform_setQuaternion'></a>

Sets this object's orientation in the form of a <a href="tutorial-glmath.md">quaternion</a> (a 4-element array
for describing 3D rotations). Has no effect if a matrix was defined with H3DU.Transform#setMatrix
and the transform wasn't reset yet with H3DU.Transform#resetTransform.

#### Parameters

* `quat` (Type: Array.&lt;Number>)<br>
    A four-element array describing the rotation. A quaternion is returned from the methods glmath.H3DU.Math.quatFromAxisAngle and glmath.H3DU.Math.quatFromTaitBryan, among others.

#### Return Value

This object. (Type: <a href="H3DU.Transform.md">H3DU.Transform</a>)

#### Example

    // Set an object's orientation to 30 degrees about the X-axis
    transform.setQuaternion(H3DU.Math.quatFromAxisAngle(20,1,0,0));
    // Set an object's orientation to identity (no rotation)
    transform.setQuaternion(H3DU.Math.quatIdentity());
    // Set an object's orientation to 30 degree pitch multiplied
    // by 40 degree roll
    transform.setQuaternion(H3DU.Math.quatFromTaitBryan(30,0,40));

### H3DU.Transform#setScale(x, y, z) <a id='H3DU.Transform_H3DU.Transform_setScale'></a>

Sets the scale of an object relative to its original
size. Has no effect if a matrix was defined with H3DU.Transform#setMatrix
and the transform wasn't reset yet with H3DU.Transform#resetTransform.

#### Parameters

* `x` (Type: number | Array.&lt;Number>)<br>
    Scaling factor for this object's width. If "y" and "z" are null or omitted, this is instead a 3-element array giving the scaling factors for width, height, and depth, respectively, or a single number giving the scaling factor for all three dimensions.
* `y` (Type: Number)<br>
    Scaling factor for this object's height.
* `z` (Type: Number)<br>
    Scaling factor for this object's depth.

#### Return Value

This object. (Type: <a href="H3DU.Transform.md">H3DU.Transform</a>)

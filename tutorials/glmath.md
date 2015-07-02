The GLMath library, part of the HTML 3D library, is a collection
of math functions for working with vectors, matrices, and quaternions.

Here is an overview of these three data types.

## Contents <a id=Contents></a>

[Contents](#Contents)<br>[Vectors](#Vectors)<br>[Matrices](#Matrices)<br>&nbsp;&nbsp;[Translation](#Translation)<br>&nbsp;&nbsp;[Scaling](#Scaling)<br>&nbsp;&nbsp;[Rotation](#Rotation)<br>&nbsp;&nbsp;[Combining Transforms](#Combining_Transforms)<br>[Quaternions](#Quaternions)<br>&nbsp;&nbsp;[Multiplying quaternions](#Multiplying_quaternions)<br>&nbsp;&nbsp;[Using Quaternions](#Using_Quaternions)<br>&nbsp;&nbsp;[Tait-Bryan angles and their disadvantages](#Tait_Bryan_angles_and_their_disadvantages)<br>[Planes](#Planes)<br>[Coordinate Systems](#Coordinate_Systems)<br>&nbsp;&nbsp;[Differences in Behavior](#Differences_in_Behavior)<br>

## Vectors <a id=Vectors></a>

A vector is simply a set of 3 or 4 elements that are related
to each other.  As such, a vector can symbolize a position, a direction,
a ray, a color, or anything else.  The methods in this class treat arrays
as vectors.  Functions dealing with vectors begin with "vec".

If a vector describes a position, direction,
or normal, the four elements are given as X, Y, Z, and W, in that order.

If a vector describes a color, the four elements are given as red, green,
blue, and alpha, in that order (where each element ranges from 0-1).

If a 3D _position_ (point) is used in a 4-element vector function (one beginning
with "vec4"), use 1 as the fourth element of the vector.  If a 3D _direction_
is used in a 4-element vector function, use 0 as the fourth element.

## Matrices <a id=Matrices></a>

A matrix is a 16- or 9-element array that describes a
transformation from one coordinate system to another. Transformations
include translation (shifting), scaling, and rotation.
Functions dealing with matrices begin with "mat".

### Translation <a id=Translation></a>

A translation is a shifting of an object's position.

To create a translation matrix, use [GLMath.mat4translated()]{@link glmath.GLMath.mat4translated},
and specify the X-offset, the Y-offset, and the Z-offset.  For example, an X-offset of 1 moves
an object 1 unit to the right, and a Y offset of -1 moves it 1 unit down.

To multiply an existing matrix by a translation, use
[GLMath.mat4translate()]{@link glmath.GLMath.mat4translate}.  This will put the translation
before the other transformations.

### Scaling <a id=Scaling></a>

Scaling changes an object's size.

To create a scaling matrix, use [GLMath.mat4scaled()]{@link glmath.GLMath.mat4scaled},
and specify the scaling factors for the X, Y, and Z axis.  Each point is multiplied by the scaling
factors to change the object's size.  For example, a Y-factor of 2 doubles an object's height.

To multiply an existing matrix by a scaling, use
[GLMath.mat4scale()]{@link glmath.GLMath.mat4scale}.  This will put the scaling
before the other transformations.

### Rotation <a id=Rotation></a>

Rotation changes an object's orientation.

To create a rotation matrix, use [GLMath.mat4rotated()]{@link glmath.GLMath.mat4rotated},
and specify the angle (in degrees) to rotate, and the axis of rotation (a ray that starts at the
origin and points toward a 3D point given as three parameters).  For example, specifying (45, 1, 0, 0) means a 45-degree rotation around the X-axis, and (80, 0, 2, 3) means a 45-degree rotation around the axis that starts at the origin (0, 0, 0) and points toward the point (0, 2, 3).

To multiply an existing matrix by a rotation, use
[GLMath.mat4rotate()]{@link glmath.GLMath.mat4rotate}.  This will put the rotation
before the other transformations.

### Combining Transforms <a id=Combining_Transforms></a>

The order in which you do transforms is important.  In general, scaling then translating is
not the same as translating then scaling.  Assuming your geometry is centered at the origin
(0, 0, 0), you should create a transformation in this order:

* Call `GLMath.mat4identity()`, creating a matrix without a transformation.
* Do your translations if needed, using `mat4translate()`.
* Do your rotations if needed, using `mat4rotate()`.
* Do your scalings if needed, using `mat4scale()`.

This way, the scalings and rotations will affect the object while it's still centered, and
before the translations (shifts) take place.

You can also multiply transforms using [GLMath.mat4multiply()]{@link glmath.GLMath.mat4multiply}.
This takes two matrices and returns one combined matrix.  The combined matrix will have the effect
of doing the second matrix's transform, then the first matrix's transform.

## Quaternions <a id=Quaternions></a>

A quaternion is a 4-element array that describes a
3D rotation.  The first three elements (X, Y, and Z), represent
an axis of rotation, and the fourth element is
the W component. Functions dealing with quaternions begin with
"quat".  A quaternion is generated as follows:

* Set X, Y, and Z to the (normalized) axis of rotation multiplied by the sine of
half the angle.  This results in the same axis of rotation as before,
but in a different form.
* Set W to the cosine of half the angle.

### Multiplying quaternions <a id=Multiplying_quaternions></a>

The methods quatMultiply and quatFromTaitBryan, among others, involve
multiplying quaternions, combining multiple rotations into a single
rotation.  In these methods, multiplying one rotation by another
creates a combined rotation in which the second rotation happens
before the first rotation.  Like matrix multiplication, the
order in which you multiply quaternions is important. This multiplication behavior
is opposite to that in the D3DX and DirectXMath libraries.

### Using Quaternions <a id=Using_Quaternions></a>

For best results when using quaternions:

* Store the orientation of each object as a single quaternion, created
 with `quatIdentity()`.
* As rotations happen each frame, convert the rotation (which may be
  in pitch/yaw/roll or another form, depending on the input device) to a quaternion
  and multiply that quaternion by the current orientation to get a new orientation
  for that object.
* Normalize the orientation quaternion (using `quatNorm()` or `quatNormInPlace()`)
  every few frames.

### Tait-Bryan angles and their disadvantages <a id=Tait_Bryan_angles_and_their_disadvantages></a>

Tait-Bryan angles (pitch, yaw, and roll angles) can also be used to describe 3D
rotations, but they have disadvantages:

* In general, the order of Tait-Bryan angle rotations is important. For example, a 30-degree
pitch followed by a 20-degree roll is not the same as a 20-degree pitch followed
by a 30-degree roll.
* There are multiple conventions for Tait-Bryan angles, such as the order of
rotations; pitch then yaw, or yaw then pitch?
* Tait-Bryan angle rotations are not easily reversible when the same order
of angles is used. For example, a negative 30-degree
pitch followed by a negative 20-degree roll does not undo a 30-degree
pitch followed by a 20-degree roll.
* Tait-Bryan angles can cause a problem called "gimbal lock", in which a rotation along
one axis (say, a pitch) can cause a vector to be parallel to another axis (say, the roll
axis), so that a rotation along that axis will do nothing.

Related functions:

* [GLMath.quatFromTaitBryan()]{@link glmath.GLMath.quatFromTaitBryan} -
Converts from Tait-Bryan angles to a quaternion
* [GLMath.quatToTaitBryan()]{@link glmath.GLMath.quatToTaitBryan} -
Converts from a quaternion to Tait-Bryan angles

## Planes <a id=Planes></a>

A 4-element array can describe a 3D plane in the following manner:

* The 4 elements, labeled A, B, C, and D in that order, describe a plane
 whose points satisfy the equation:
 <blockquote>Ax + By + Cz + D = 0</blockquote>
 where x, y, and z are the
 coordinates of any point lying on the plane.
* A, B, and C are
 the X, Y, and Z components of the plane's normal vector.
* D is the distance in the normal's direction from the plane to the origin,
 or if negative, in the opposite direction from the origin to the plane, divided
 by the normal's length.  Alternatively, D is the negative dot product of the
 plane's normal and any point on the plane.

There is one method that deals with planes:

* [GLMath.planeNormInPlace()]{@link glmath.GLMath.planeNormInPlace} -
Converts the plane to a form in which its normal is unit length.

## Coordinate Systems <a id=Coordinate_Systems></a>

There are two conventions of 3D coordinate systems, left-handed and right-handed:

* In a _left-handed_ coordinate system, like in legacy Direct3D, the z-axis points _away from
the viewer_ whenever the x-axis points to the right and the y-axis points up.
* In a _right-handed_ coordinate system, like in OpenGL, the z-axis points _toward
the viewer_ whenever the x-axis points to the right and the y-axis points up.

If a GLMath method works differently in left- and right-handed coordinate systems,
its description will note this. (In the absence of z-axis transformations, the coordinate
system is effectively left-handed.)  The differences are also noted below.

### Differences in Behavior <a id=Differences_in_Behavior></a>

**3D Vectors**

If a 3D vector's Z component is positive, it points toward the viewer (outward) in a
right-handed coordinate system, and away from the viewer (inward) in a left-handed
system. The reverse is true if the Z component is negative.

**Cross product (`vec3cross(A, B)`):**

Let there be a triangle formed by point A, point B, and the point (0,0,0) in that order.
Assume the X axis points to the right and the Y axis points up.
If the cross product of A and B has a positive Z component, the triangle's points are
oriented counterclockwise; otherwise, clockwise.  (If the X axis points right and
the Y axis down, the reverse is true.)

**Projection matrix (such as `mat4perspective`, `mat4ortho`):**

Returns a result for right-handed coordinate systems.  For left-handed systems,
reverse the sign of the 9th, 10th, 11th, and 12th elements of the result (zero-based
indices 8, 9, 10, and 11).

**Look-at matrix (`mat4lookat`):**

Returns a result for right-handed coordinate systems.  For left-handed systems,
reverse the sign of the 1st, 3rd, 5th, 7th, 9th, 11th,
13th, and 15th elements of the result (zero-based indices 0, 2, 4, 6, 8,
10, 12, and 14).

**Rotation angles (such as used in `mat4rotate` and `quatRotate`):**

If the axis of rotation points toward the viewer, the angle runs:

* Right handed: Counterclockwise if the angle's value is positive, clockwise if negative.
* Left handed: Clockwise if the angle's value is positive, counterclockwise if negative.

**Normals and triangle orientation**

The orientation of a triangle formed by points A, B, and C can be found by applying the rules
for the cross product of the two vectors (A minus C) and (B minus C),
in that order.

The resulting cross product is that triangle's _normal_.  For each normal
to point outward, as it usually is, each triangle should be oriented
counterclockwise for right-handed coordinate systems and clockwise for left-handed
systems.

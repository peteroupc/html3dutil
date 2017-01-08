# H3DU's Math Functions

[Back to documentation index.](index.md)

The HTML 3D library includes a collection
of math functions for working with vectors, matrices, and quaternions.

Here is an overview of these data types.

## Contents <a id=Contents></a>

[Contents](#Contents)<br>[Vectors](#Vectors)<br>&nbsp;&nbsp;[Unit Vectors](#Unit_Vectors)<br>&nbsp;&nbsp;[Axis of Rotation](#Axis_of_Rotation)<br>[Matrices](#Matrices)<br>&nbsp;&nbsp;[Translation](#Translation)<br>&nbsp;&nbsp;[Scaling](#Scaling)<br>&nbsp;&nbsp;[Rotation](#Rotation)<br>&nbsp;&nbsp;[Combining Transforms](#Combining_Transforms)<br>[Quaternions](#Quaternions)<br>&nbsp;&nbsp;[Using Quaternions](#Using_Quaternions)<br>&nbsp;&nbsp;[Makeup of Quaternions](#Makeup_of_Quaternions)<br>&nbsp;&nbsp;[Multiplying quaternions](#Multiplying_quaternions)<br>&nbsp;&nbsp;[Tait-Bryan angles and their disadvantages](#Tait_Bryan_angles_and_their_disadvantages)<br>[Planes](#Planes)<br>[Boxes](#Boxes)<br>[Coordinate Systems](#Coordinate_Systems)<br>&nbsp;&nbsp;[Differences in Behavior](#Differences_in_Behavior)<br>&nbsp;&nbsp;&nbsp;&nbsp;[Projection and view matrices](#Projection_and_view_matrices)<br>&nbsp;&nbsp;&nbsp;&nbsp;[Rotation angles (such as used in `mat4rotate` and `quatRotate`)](#Rotation_angles_such_as_used_in_mat4rotate_and_quatRotate)<br>&nbsp;&nbsp;&nbsp;&nbsp;[Cross product (`vec3cross`) and normals](#Cross_product_vec3cross_and_normals)<br>&nbsp;&nbsp;[Orientation and face classification](#Orientation_and_face_classification)<br>&nbsp;&nbsp;&nbsp;&nbsp;[Finding Orientation](#Finding_Orientation)<br>

## Vectors <a id=Vectors></a>

A vector is simply an array of elements that are related
to each other. As such, a vector can describe a position, a direction,
a ray, a color, or anything else. The methods in this class treat arrays
as vectors.  Functions dealing with vectors begin with "vec".
Many of H3DU.Math's functions use 3- or 4-element vectors.

If a 4-element vector describes a position, direction,
or normal, the elements are given as X, Y, Z, and W, in that order.

If a 4-element vector describes a color, the elements are given as red, green,
blue, and alpha, in that order (where each element ranges from 0-1).

If a 3D _direction_ is used in a 4-element vector function (one beginning with "vec4"),
use 0 as the fourth element. If a 3D _position_ (point) is used in a 4-element vector
function, the fourth element is generally 1. (If the
fourth element is anything other than 0, the vector is in _homogeneous
coordinates_, where the 3D position equals the first three elements divided
by the fourth.)

### Unit Vectors <a id=Unit_Vectors></a>

A _unit vector_ is a vector with a length of 1. (A vector's _length_ is the square root
of the sum of the squares of its components.) A vector can be "normalized" to
a unit vector by dividing each of its components by its length.

The following functions normalize vectors and find their length.

* <a href="H3DU.Math.md#H3DU.Math.vec3norm">H3DU.Math.vec3norm</a> - Converts a 3-element vector to a unit vector.
* <a href="H3DU.Math.md#H3DU.Math.vec4norm">H3DU.Math.vec4norm</a> - Converts a 4-element vector to a unit vector.
* <a href="H3DU.Math.md#H3DU.Math.vec3length">H3DU.Math.vec3length</a> - Finds a 3-element vector's length.
* <a href="H3DU.Math.md#H3DU.Math.vec4length">H3DU.Math.vec4length</a> - Finds a 4-element vector's length.

### Axis of Rotation <a id=Axis_of_Rotation></a>

A rotation can be described using an _angle_ and an _axis of rotation_,
for example, in the <a href="H3DU.Math.md#H3DU.Math.mat4rotate">H3DU.Math.mat4rotate</a> method.

An axis of rotation is a 3-element vector or three numbers that describe a ray
that starts at the origin (0,0,0) and points toward a 3D point. The vector's elements are
the X, Y, and Z coordinates of that point, in that order. Here are examples.

* The X axis of rotation (upward or downward turn) is (1, 0, 0).
* The Y axis of rotation (leftward or rightward turn) is (0, 1, 0).
* The Z axis of rotation (side-by-side sway) is (0, 0, 1).

While the axis of rotation points toward the viewer, if the angle's value
is positive (resp. negative) and the [coordinate system](#Coordinate_Systems) is...

* ...right handed, then the angle runs counterclockwise (resp. clockwise).
* ...left handed, then the angle runs clockwise (resp. counterclockwise).

Vectors that point in the same direction (for example, vectors (1, 0, 0) and (2, 0, 0))
describe the same axis of rotation.

Unless stated otherwise, an axis of rotation passed to an `H3DU.Math`
method need not be a [unit vector](#Unit_Vectors).

## Matrices <a id=Matrices></a>

A matrix is a 16- or 9-element array that can describe a
transformation from one coordinate system to another. Transformations
include translation (shifting), scaling, and rotation.
Functions dealing with matrices begin with "mat".
For more details, see the <a href="tutorial-matrixdetails.md">Matrix Details</a> tutorial.

### Translation <a id=Translation></a>

A translation is a shifting of an object's position.

To create a translation matrix, use <a href="H3DU.Math.md#H3DU.Math.mat4translated">H3DU.Math.mat4translated()</a>,
and specify the X-offset, the Y-offset, and the Z-offset. For example, an X-offset of 1 moves
an object 1 unit to the right, and a Y offset of -1 moves it 1 unit down.

To multiply an existing matrix by a translation, use
<a href="H3DU.Math.md#H3DU.Math.mat4translate">H3DU.Math.mat4translate()</a>. This will put the translation
before the other transformations.

### Scaling <a id=Scaling></a>

Scaling changes an object's size.

To create a scaling matrix, use <a href="H3DU.Math.md#H3DU.Math.mat4scaled">H3DU.Math.mat4scaled()</a>,
and specify the scaling factors for the X, Y, and Z axis. Each point is multiplied by the scaling
factors to change the object's size. For example, a Y-factor of 2 doubles an object's height.

To multiply an existing matrix by a scaling, use
<a href="H3DU.Math.md#H3DU.Math.mat4scale">H3DU.Math.mat4scale()</a>. This will put the scaling
before the other transformations.

### Rotation <a id=Rotation></a>

Rotation changes an object's orientation.

To create a rotation matrix, use <a href="H3DU.Math.md#H3DU.Math.mat4rotated">H3DU.Math.mat4rotated()</a>,
and specify the angle (in degrees) to rotate, and the [axis of rotation](#Axis_of_Rotation). For example, specifying `(45, [1, 0, 0])` means a 45-degree rotation around the X axis, and `(80, [0, 2, 3])` means a 45-degree rotation around the axis that starts at the origin (0, 0, 0) and points toward the point (0, 2, 3).

To multiply an existing matrix by a rotation, use
<a href="H3DU.Math.md#H3DU.Math.mat4rotate">H3DU.Math.mat4rotate()</a>. This will put the rotation
before the other transformations.

### Combining Transforms <a id=Combining_Transforms></a>

The order in which you do transforms is important. In general, scaling then translating is
not the same as translating then scaling. Assuming your geometry is centered at the origin
(0, 0, 0), you should create a transformation in this order:

* Call <a href="H3DU.Math.md#H3DU.Math.mat4identity">`H3DU.Math.mat4identity()`</a>, creating a matrix without a transformation.
* Do your translations if needed, using <a href="H3DU.Math.md#H3DU.Math.mat4translate">`mat4translate()`</a>.
* Do your rotations if needed, using <a href="H3DU.Math.md#H3DU.Math.mat4rotate">`mat4rotate()`</a>.
* Do your scalings if needed, using <a href="H3DU.Math.md#H3DU.Math.mat4scale">`mat4scale()`</a>.

This way, the scalings and rotations will affect the object while it's still centered, and
before the translations (shifts) take place.

You can also multiply transforms using <a href="H3DU.Math.md#H3DU.Math.mat4multiply">H3DU.Math.mat4multiply()</a>.
This takes two matrices and returns one combined matrix. The combined matrix will have the effect
of doing the second matrix's transform, then the first matrix's transform.

## Quaternions <a id=Quaternions></a>

A quaternion is a 4-element array that can describe a
3D rotation. Functions dealing with quaternions begin with
"quat".

### Using Quaternions <a id=Using_Quaternions></a>

For best results when using quaternions:

* Store the orientation of each object as a single quaternion, created
 with <a href="H3DU.Math.md#H3DU.Math.quatIdentity">H3DU.Math.quatIdentity</a>.
* As rotations happen each frame, convert the rotation (which may be
  in pitch/yaw/roll or another form, depending on the input device) to a quaternion
  and <a href="H3DU.Math.md#H3DU.Math.quatMultiply">multiply</a> that quaternion by the current orientation to get a new orientation
  for that object.
* Normalize the orientation quaternion (using `quatNorm()` or `quatNormInPlace()`)
  every few frames.

### Makeup of Quaternions <a id=Makeup_of_Quaternions></a>

A quaternion's...

* ...first three elements (X, Y, Z) describe a 3D point, where the
direction from the origin (0, 0, 0) to that point is the [axis of rotation](#Axis_of_Rotation),
and the distance from the origin to that point is the sine
of half the rotation angle. <small> (The distance is 0 at 0 and 360
degrees, and 1 at 180 degrees.)</small>
* ...fourth element (W) is the cosine of half the rotation angle.
<small>(W is 1 at 0 degrees, 0 at 180 and -1 at 360 degrees.)</small>

Quaternions that describe a 3D rotation should be [unit vectors](#Unit_Vectors).

### Multiplying quaternions <a id=Multiplying_quaternions></a>

The methods quatMultiply and quatFromTaitBryan, among others, involve
multiplying quaternions, combining multiple rotations into a single
rotation. In these methods, multiplying one rotation by another
creates a combined rotation in which the second rotation happens
before the first rotation (when applied in the global coordinate frame).
Like matrix multiplication, the order in which you multiply quaternions is important.

### Tait-Bryan angles and their disadvantages <a id=Tait_Bryan_angles_and_their_disadvantages></a>

Pitch-yaw-roll angles (also called Tait-Bryan angles) can also be used to describe 3D rotations, but
they have disadvantages:

* In general, the order of pitch, yaw, and roll rotations is important. For example, a 30-degree
pitch followed by a 20-degree roll is not the same as a 20-degree pitch followed
by a 30-degree roll.
* There are multiple conventions for Tait-Bryan angles, such as the order of
rotations; pitch then yaw, or yaw then pitch?
* Pitch-yaw-roll angle rotations are not easily reversible when the same order
of angles is used. For example, a negative 30-degree
pitch followed by a negative 20-degree roll does not undo a 30-degree
pitch followed by a 20-degree roll.
* Pitch-yaw-roll angles can cause a problem called "gimbal lock", in which a rotation along
one axis (say, a pitch) can cause a vector to be parallel to another axis (say, the roll
axis), so that a rotation along that axis will do nothing.

Related functions:

* <a href="H3DU.Math.md#H3DU.Math.quatFromTaitBryan">H3DU.Math.quatFromTaitBryan()</a> -
Converts from Tait-Bryan angles to a quaternion
* <a href="H3DU.Math.md#H3DU.Math.quatToTaitBryan">H3DU.Math.quatToTaitBryan()</a> -
Converts from a quaternion to Tait-Bryan angles

## Planes <a id=Planes></a>

A 4-element array can describe a 3D plane in the following manner:

* The 4 elements, labeled A, B, C, and D in that order, describe a plane
 whose points satisfy the equation:

        Ax + By + Cz + D = 0

 where x, y, and z are the
 coordinates of any point lying on the plane.
* A, B, and C are
 the X, Y, and Z components of the plane's normal vector.
* D is the distance in the normal's direction from the plane to the origin (0,0,0),
 or if negative, in the opposite direction from the origin to the plane, divided
 by the normal's length. Alternatively, D is the negative dot product of the
 plane's normal and any point on the plane.

There is one method that deals with planes:

* <a href="H3DU.Math.md#H3DU.Math.planeNormInPlace">H3DU.Math.planeNormInPlace</a> - Converts the plane to a form in which
its normal has a length of 1.

## Boxes <a id=Boxes></a>

An array of six numbers can describe an axis-aligned bounding box (AABB).
If it does, the first three numbers are the box's minimum X, Y, and Z coordinates,
and the last three numbers are the box's maximum X, Y, and Z coordinates.

If a minimum coordinate is greater than a maximum coordinate, then the
box is considered empty.

Methods that deal with boxes include:

* <a href="H3DU.Math.md#H3DU.Math.boxCenter">H3DU.Math.boxCenter</a> - Finds a box's center.
* <a href="H3DU.Math.md#H3DU.Math.boxDimensions">H3DU.Math.boxDimensions</a> - Finds a box's dimensions.
* <a href="H3DU.Math.md#H3DU.Math.boxIsEmpty">H3DU.Math.boxIsEmpty</a> - Determines whether a box is empty.

## Coordinate Systems <a id=Coordinate_Systems></a>

There are two conventions of 3D coordinate systems, left-handed and
right-handed:

* In a _left-handed_ coordinate system, the Z axis points _away from
the viewer_ whenever the X axis points to the right and the Y axis points up.
* In a _right-handed_ coordinate system, the Z axis points _toward
the viewer_ whenever the X axis points to the right and the Y axis points up.

### Differences in Behavior <a id=Differences_in_Behavior></a>

#### Projection and view matrices <a id=Projection_and_view_matrices></a>

The difference between a left-handed and right-handed coordinate system
lies in how 3D points are transformed, mainly due to the projection and view
matrices.

The following methods return **projection matrices** for a right-handed coordinate system.
To adjust the matrices for a left-handed system, reverse the sign of the 9th, 10th, 11th, and
12th elements of the result (zero-based indices 8, 9, 10, and 11).

* <a href="H3DU.Math.md#H3DU.Math.mat4perspective">H3DU.Math.mat4perspective</a>,
<a href="H3DU.Math.md#H3DU.Math.mat4perspectiveHorizontal">H3DU.Math.mat4perspectiveHorizontal</a>,
<a href="H3DU.Math.md#H3DU.Math.mat4frustum">H3DU.Math.mat4frustum</a>,
<a href="H3DU.Math.md#H3DU.Math.mat4ortho">H3DU.Math.mat4ortho</a>,
<a href="H3DU.Math.md#H3DU.Math.mat4ortho2d">H3DU.Math.mat4ortho2d</a>,
<a href="H3DU.Math.md#H3DU.Math.mat4orthoAspect">H3DU.Math.mat4orthoAspect</a>,
<a href="H3DU.Math.md#H3DU.Math.mat4ortho2dAspect">H3DU.Math.mat4ortho2dAspect</a>.

The <a href="H3DU.Math.md#H3DU.Math.mat4lookat">H3DU.Math.mat4lookat</a> method returns a **view matrix** for a right-handed
coordinate system. To adjust the matrix for a left-handed system,
reverse the sign of the 1st, 3rd, 5th, 7th, 9th, 11th,
13th, and 15th elements of the result (zero-based indices 0, 2, 4, 6, 8,
10, 12, and 14).

#### Rotation angles (such as used in `mat4rotate` and `quatRotate`) <a id=Rotation_angles_such_as_used_in_mat4rotate_and_quatRotate></a>

While the [axis of rotation](#Axis_of_Rotation) points toward the viewer, if the angle's value
is positive (resp. negative) and the coordinate system is...

* ...right handed, then the angle runs counterclockwise (resp. clockwise).
* ...left handed, then the angle runs clockwise (resp. counterclockwise).

#### Cross product (`vec3cross`) and normals <a id=Cross_product_vec3cross_and_normals></a>

* Given a triangle formed by points A, B, and C, in that order, the [cross product](<a href="H3DU.Math.md#H3DU.Math.vec3cross">H3DU.Math.vec3cross</a>)
of the vector (A minus C) with (B minus C), in that order, is a _normal_ of that triangle (a vector that points away
from the triangle's surface).
* By extension, given a triangle formed by point A, point B, and point (0,0,0), in that order, the cross product of A
with B, in that order, is a normal of that triangle.

In either case, whenever this particular normal points toward the viewer, the triangle's vertices
are oriented counterclockwise for right-handed coordinate systems, or
clockwise for left-handed systems. (In general, there are two possible choices for normals, which each
point in opposite directions.)

### Orientation and face classification <a id=Orientation_and_face_classification></a>

A triangle has counterclockwise _orientation_ if its vertices are ordered in a counterclockwise path from the first to second to third to first vertex, in the triangle's two-dimensional projection in _window coordinates_ (which roughly correspond to its location on the screen or frame buffer). Otherwise, the triangle has clockwise orientation.

By default, counterclockwise oriented triangles are _front faces_, and
other triangles are _back faces_. To change which kinds of triangles are
front faces, call the `frontFace` method of Scene3D.

#### Finding Orientation <a id=Finding_Orientation></a>

To find a triangle's orientation, do the following calculation (X1, X2, X3 and Y1, Y2, Y3 are the window coordinates of its vertices). Note that half of the result will be the triangle's signed area.

    (X3 - X1) * (Y3 - Y2) - (X3 - X2) * (Y3 - Y1)

If the result is positive (resp. negative), and the window space X axis points right and the Y axis points...

* ...up (which is the case in WebGL), then the triangle's vertices
 are oriented counterclockwise (resp. clockwise).
* ...down, then the vertices are oriented clockwise (resp. counterclockwise).

[Back to documentation index.](index.md)

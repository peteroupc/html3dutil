The HTML 3D library includes a collection
of math functions for working with vectors, matrices, and quaternions.

Here is an overview of these three data types.

## Contents <a id=Contents></a>

[Contents](#Contents)<br>[Vectors](#Vectors)<br>[Matrices](#Matrices)<br>&nbsp;&nbsp;[Translation](#Translation)<br>&nbsp;&nbsp;[Scaling](#Scaling)<br>&nbsp;&nbsp;[Rotation](#Rotation)<br>&nbsp;&nbsp;[Combining Transforms](#Combining_Transforms)<br>[Quaternions](#Quaternions)<br>&nbsp;&nbsp;[Multiplying quaternions](#Multiplying_quaternions)<br>&nbsp;&nbsp;[Using Quaternions](#Using_Quaternions)<br>&nbsp;&nbsp;[Tait-Bryan angles and their disadvantages](#Tait_Bryan_angles_and_their_disadvantages)<br>[Planes](#Planes)<br>[Coordinate Systems](#Coordinate_Systems)<br>&nbsp;&nbsp;[Differences in Behavior](#Differences_in_Behavior)<br>&nbsp;&nbsp;&nbsp;&nbsp;[3D Vectors](#3D_Vectors)<br>&nbsp;&nbsp;&nbsp;&nbsp;[Projection matrix (such as `mat4perspective`, `mat4ortho`)](#Projection_matrix_such_as_mat4perspective_mat4ortho)<br>&nbsp;&nbsp;&nbsp;&nbsp;[Look-at matrix (`mat4lookat`)](#Look_at_matrix_mat4lookat)<br>&nbsp;&nbsp;&nbsp;&nbsp;[Rotation angles (such as used in `mat4rotate` and `quatRotate`)](#Rotation_angles_such_as_used_in_mat4rotate_and_quatRotate)<br>&nbsp;&nbsp;&nbsp;&nbsp;[Cross product (`vec3cross(A, B)`) and normals](#Cross_product_vec3cross_A_B_and_normals)<br>&nbsp;&nbsp;[Orientation and face classification](#Orientation_and_face_classification)<br>

## Vectors <a id=Vectors></a>

A vector is simply an array of elements that are related
to each other.  As such, a vector can symbolize a position, a direction,
a ray, a color, or anything else.  The methods in this class treat arrays
as vectors.  Functions dealing with vectors begin with "vec".
Many of H3DU.Math's functions use 3- or 4-element vectors.

If a 4-element vector describes a position, direction,
or normal, the elements are given as X, Y, Z, and W, in that order.

If a 4-element vector describes a color, the elements are given as red, green,
blue, and alpha, in that order (where each element ranges from 0-1).

If a 3D _direction_ is used in a 4-element vector function (one beginning with "vec4"),
use 0 as the fourth element.  If a 3D _position_ (point) is used in a 4-element vector
function, the fourth element is generally 1.   (If the
fourth element is anything other than 0, the vector is in _homogeneous
coordinates_, where the 3D position equals the first three elements divided
by the fourth.)

## Matrices <a id=Matrices></a>

A matrix is a 16- or 9-element array that can describe a
transformation from one coordinate system to another. Transformations
include translation (shifting), scaling, and rotation.
Functions dealing with matrices begin with "mat".
For more details, see the {@tutorial matrixdetails} tutorial.

### Translation <a id=Translation></a>

A translation is a shifting of an object's position.

To create a translation matrix, use [H3DU.Math.mat4translated()]{@link H3DU.Math.mat4translated},
and specify the X-offset, the Y-offset, and the Z-offset.  For example, an X-offset of 1 moves
an object 1 unit to the right, and a Y offset of -1 moves it 1 unit down.

To multiply an existing matrix by a translation, use
[H3DU.Math.mat4translate()]{@link H3DU.Math.mat4translate}.  This will put the translation
before the other transformations.

### Scaling <a id=Scaling></a>

Scaling changes an object's size.

To create a scaling matrix, use [H3DU.Math.mat4scaled()]{@link H3DU.Math.mat4scaled},
and specify the scaling factors for the X, Y, and Z axis.  Each point is multiplied by the scaling
factors to change the object's size.  For example, a Y-factor of 2 doubles an object's height.

To multiply an existing matrix by a scaling, use
[H3DU.Math.mat4scale()]{@link H3DU.Math.mat4scale}.  This will put the scaling
before the other transformations.

### Rotation <a id=Rotation></a>

Rotation changes an object's orientation.

To create a rotation matrix, use [H3DU.Math.mat4rotated()]{@link H3DU.Math.mat4rotated},
and specify the angle (in degrees) to rotate, and the axis of rotation (a ray that starts at the
origin and points toward a 3D point given as three parameters).  For example, specifying (45, 1, 0, 0) means a 45-degree rotation around the X-axis, and (80, 0, 2, 3) means a 45-degree rotation around the axis that starts at the origin (0, 0, 0) and points toward the point (0, 2, 3).

To multiply an existing matrix by a rotation, use
[H3DU.Math.mat4rotate()]{@link H3DU.Math.mat4rotate}.  This will put the rotation
before the other transformations.

### Combining Transforms <a id=Combining_Transforms></a>

The order in which you do transforms is important.  In general, scaling then translating is
not the same as translating then scaling.  Assuming your geometry is centered at the origin
(0, 0, 0), you should create a transformation in this order:

* Call `H3DU.Math.mat4identity()`, creating a matrix without a transformation.
* Do your translations if needed, using `mat4translate()`.
* Do your rotations if needed, using `mat4rotate()`.
* Do your scalings if needed, using `mat4scale()`.

This way, the scalings and rotations will affect the object while it's still centered, and
before the translations (shifts) take place.

You can also multiply transforms using [H3DU.Math.mat4multiply()]{@link H3DU.Math.mat4multiply}.
This takes two matrices and returns one combined matrix.  The combined matrix will have the effect
of doing the second matrix's transform, then the first matrix's transform.

## Quaternions <a id=Quaternions></a>

A quaternion is a 4-element array that can describe a
3D rotation.  Functions dealing with quaternions begin with
"quat".  A quaternion's:

* ...first three elements (X, Y, Z) describe a 3D point, where the
direction from the origin (0, 0, 0) to that point is the _axis of rotation_,
and the distance from the origin to that point is the sine
of half the rotation angle. <small> (The distance is 0 at 0 and 360
degrees, and 1 at 180 degrees.)</small>
* ...fourth element (W) is the cosine of half the rotation angle.
<small>(W is 1 at 0 degrees, 0 at 180 and -1 at 360 degrees.)</small>

Quaternions that describe a 3D rotation should be _unit vectors_
(["normalized" vectors]{@link H3DU.Math.quatNorm} with a length of 1).

### Multiplying quaternions <a id=Multiplying_quaternions></a>

The methods quatMultiply and quatFromTaitBryan, among others, involve
multiplying quaternions, combining multiple rotations into a single
rotation.  In these methods, multiplying one rotation by another
creates a combined rotation in which the second rotation happens
before the first rotation.  Like matrix multiplication, the
order in which you multiply quaternions is important.

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

* [H3DU.Math.quatFromTaitBryan()]{@link H3DU.Math.quatFromTaitBryan} -
Converts from Tait-Bryan angles to a quaternion
* [H3DU.Math.quatToTaitBryan()]{@link H3DU.Math.quatToTaitBryan} -
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
 by the normal's length.  Alternatively, D is the negative dot product of the
 plane's normal and any point on the plane.

There is one method that deals with planes:

* [H3DU.Math.planeNormInPlace()]{@link H3DU.Math.planeNormInPlace} -
Converts the plane to a form in which its normal has a length of 1.

## Coordinate Systems <a id=Coordinate_Systems></a>

There are two conventions of 3D coordinate systems, left-handed and right-handed:

* In a _left-handed_ coordinate system, the z-axis points _away from
the viewer_ whenever the x-axis points to the right and the y-axis points up.
* In a _right-handed_ coordinate system, the z-axis points _toward
the viewer_ whenever the x-axis points to the right and the y-axis points up.

If an `H3DU.Math` method works differently in left- and right-handed coordinate systems,
its description will note this. The differences are also noted below.

### Differences in Behavior <a id=Differences_in_Behavior></a>

#### 3D Vectors <a id=3D_Vectors></a>

If a 3D vector's Z component is positive, it points toward the viewer (outward) in a
right-handed coordinate system, and away from the viewer (inward) in a left-handed
system. The reverse is true if the Z component is negative.

#### Projection matrix (such as `mat4perspective`, `mat4ortho`) <a id=Projection_matrix_such_as_mat4perspective_mat4ortho></a>

Returns a result for right-handed coordinate systems.  For left-handed systems,
reverse the sign of the 9th, 10th, 11th, and 12th elements of the result (zero-based
indices 8, 9, 10, and 11).

#### Look-at matrix (`mat4lookat`) <a id=Look_at_matrix_mat4lookat></a>

Returns a result for right-handed coordinate systems.  For left-handed systems,
reverse the sign of the 1st, 3rd, 5th, 7th, 9th, 11th,
13th, and 15th elements of the result (zero-based indices 0, 2, 4, 6, 8,
10, 12, and 14).

#### Rotation angles (such as used in `mat4rotate` and `quatRotate`) <a id=Rotation_angles_such_as_used_in_mat4rotate_and_quatRotate></a>

Whenever the axis of rotation points toward the viewer, if the coordinate system is...

* ...right handed, and the angle's value is positive (resp. negative), then the angle runs counterclockwise (resp. clockwise).
* ...left handed, and the angle's value is positive (resp. negative), then the angle runs clockwise (resp. counterclockwise).

#### Cross product (`vec3cross(A, B)`) and normals <a id=Cross_product_vec3cross_A_B_and_normals></a>

Given a triangle formed by points A, B, and C, the [cross product]({@link H3DU.Math.vec3cross})
of the two vectors (A minus C) and (B minus C), in that order, is a _normal_ of that triangle (a vector that points away from
the triangle's surface).  The cross product normal will be such that, whenever it points toward the viewer,
the triangle's vertices are oriented counterclockwise for right-handed coordinate systems, or
clockwise for left-handed systems. (In general, there are two possible choices for normals, which each
point in opposite directions.)

It follows from this that the cross product of A and B will behave like the cross product normal of the
triangle formed by point A, point B, and the point (0,0,0) in that order (since A minus (0,0,0) is A,
and B minus (0,0,0) is B).

### Orientation and face classification <a id=Orientation_and_face_classification></a>

To find the orientation of a triangle, apply the following formula:

    (X3 - X1) * (Y3 - Y2) - (X3 - X2) * (Y3 - Y1)

(Half of the result will be the triangle's signed area.)

If the window space X axis points right and the Y axis points...

* ...up (which is the case in WebGL), and the result is positive (resp. negative), then the triangle's vertices
 are oriented counterclockwise (resp. clockwise).
* ...down, and the result is positive (resp. negative), then the vertices are oriented clockwise (resp. counterclockwise).

Note that finding the orientation is done on the triangle's two-dimensional projection in
_window coordinates_ (which roughly correspond to the triangle's
location on the screen or frame buffer).

By default, counterclockwise oriented triangles are _front faces_, and
other triangles are _back faces_.  To change which kinds of triangles are
front faces, call the [`frontFace` method of Scene3D]{@link H3DU.Scene3D#frontFace}.

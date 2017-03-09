<a id=Matrix_Details></a>
## Matrix Details

A matrix is a rectangular array that can describe a
transformation from one coordinate system to another. Transformations
include translation (shifting), scaling, and rotation.
Functions dealing with matrices begin with "mat".
A 3x3 or 4x4 matrix has 9 or 16 elements, respectively.

This section contains detailed information on matrices.

<a id=Contents></a>
## Contents

[Matrix Details](#Matrix_Details)<br>[Contents](#Contents)<br>[Arrangement](#Arrangement)<br>&nbsp;&nbsp;[A Matrix Transforms Between Coordinate Systems](#A_Matrix_Transforms_Between_Coordinate_Systems)<br>&nbsp;&nbsp;[Why a 4x4 Matrix?](#Why_a_4x4_Matrix)<br>[Transforming Points](#Transforming_Points)<br>&nbsp;&nbsp;[Scaling](#Scaling)<br>&nbsp;&nbsp;[Translation](#Translation)<br>&nbsp;&nbsp;[Rotation](#Rotation)<br>&nbsp;&nbsp;[Matrix Multiplication](#Matrix_Multiplication)<br>&nbsp;&nbsp;[Projective Transformations](#Projective_Transformations)<br>&nbsp;&nbsp;[Matrix Inversions](#Matrix_Inversions)<br>[Rotation Example](#Rotation_Example)<br>

## Arrangement

In mathematical publications,
matrices are often notated in column-major order, in which each
element of the matrix is placed in columns as opposed to rows, as in the following example:

<math>
<mfenced open="[" close="]">
 <mtable>
 <mtr>
 <mtd><mi>matrix[0]</mi></mtd>
 <mtd><mi>matrix[4]</mi></mtd>
 <mtd><mi>matrix[8]</mi></mtd>
 <mtd><mi>matrix[12]</mi></mtd>
 </mtr>
 <mtr>
 <mtd><mi>matrix[1]</mi></mtd>
 <mtd><mi>matrix[5]</mi></mtd>
 <mtd><mi>matrix[9]</mi></mtd>
 <mtd><mi>matrix[13]</mi></mtd>
 </mtr>
 <mtr>
 <mtd><mi>matrix[2]</mi></mtd>
 <mtd><mi>matrix[6]</mi></mtd>
 <mtd><mi>matrix[10]</mi></mtd>
 <mtd><mi>matrix[14]</mi></mtd>
 </mtr>
 <mtr>
 <mtd><mi>matrix[3]</mi></mtd>
 <mtd><mi>matrix[7]</mi></mtd>
 <mtd><mi>matrix[11]</mi></mtd>
 <mtd><mi>matrix[15]</mi></mtd>
 </mtr>
</mtable>
</mfenced>
</math>

The numbers in brackets in the matrix above are the zero-based indices
into the matrix arrays passed to `H3DU.Math`'s matrix methods.

For 3x3 matrices, the elements are arranged in the following order:

<math>
<mfenced open="[" close="]">
 <mtable>
 <mtr>
 <mtd><mi>matrix[0]</mi></mtd>
 <mtd><mi>matrix[3]</mi></mtd>
 <mtd><mi>matrix[6]</mi></mtd>
 </mtr>
 <mtr>
 <mtd><mi>matrix[1]</mi></mtd>
 <mtd><mi>matrix[4]</mi></mtd>
 <mtd><mi>matrix[7]</mi></mtd>
 </mtr>
 <mtr>
 <mtd><mi>matrix[2]</mi></mtd>
 <mtd><mi>matrix[5]</mi></mtd>
 <mtd><mi>matrix[8]</mi></mtd>
 </mtr>
</mtable>
</mfenced>
</math>

<a id=A_Matrix_Transforms_Between_Coordinate_Systems></a>
### A Matrix Transforms Between Coordinate Systems

A transformed 3D coordinate system is made up of an X, Y, and Z axis, and a center of the coordinate
system.  These are four 3-element vectors that describe how the three axes and the center map
to the new coordinate system in relation to the old coordinate system.

The following depiction of a 4x4 matrix illustrates the meaning of each of its elements. To keep things
simple, this matrix's transformation is one that keeps straight lines straight and parallel lines parallel.

<math>
<mfenced open="[" close="]">
 <mtable>
 <mtr>
 <mtd><mi>[0] X-axis X</mi></mtd>
 <mtd><mi>[4] Y-axis X</mi></mtd>
 <mtd><mi>[8] Z-axis X</mi></mtd>
 <mtd><mi>[12] Center X</mi></mtd>
 </mtr>
 <mtr>
 <mtd><mi>[1] X-axis Y</mi></mtd>
 <mtd><mi>[5] Y-axis Y</mi></mtd>
 <mtd><mi>[9] Z-axis Y</mi></mtd>
 <mtd><mi>[13] Center Y</mi></mtd>
 </mtr>
 <mtr>
 <mtd><mi>[2] X-axis Z</mi></mtd>
 <mtd><mi>[6] Y-axis Z</mi></mtd>
 <mtd><mi>[10] Z-axis Z</mi></mtd>
 <mtd><mi>[14] Center Z</mi></mtd>
 </mtr>
 <mtr>
 <mtd><mi>[3] 0</mi></mtd>
 <mtd><mi>[7] 0</mi></mtd>
 <mtd><mi>[11] 0</mi></mtd>
 <mtd><mi>[15] 1</mi></mtd>
 </mtr>
</mtable>
</mfenced>
</math>

The following is an example of a transformation matrix.

<math>
<mfenced open="[" close="]">
 <mtable>
 <mtr>
 <mtd><mn>1</mn></mtd>
 <mtd><mn>0</mn></mtd>
 <mtd><mn>0</mn></mtd>
 <mtd><mn>2</mn></mtd>
 </mtr>
 <mtr>
 <mtd><mn>0</mn></mtd>
 <mtd><mi>0.5</mi></mtd>
 <mtd><mo>-0.866025</mtd>
 <mtd><mn>3</mn></mtd>
 </mtr>
 <mtr>
 <mtd><mn>0</mn></mtd>
 <mtd><mi>0.866025</mtd>
 <mtd><mi>0.5</mtd>
 <mtd><mn>4</mn></mtd>
 </mtr>
 <mtr>
 <mtd><mi>0</mi></mtd>
 <mtd><mi>0</mi></mtd>
 <mtd><mi>0</mi></mtd>
 <mtd><mn>1</mn></mtd>
 </mtr>
</mtable>
</mfenced>
</math>

Here, the first column shows an X-axis vector at (1, 0, 0),
the second column shows a Y-axis vector at (0, 0.5, 0.866025),
the third column shows a Z-axis vector at (0, -0.866025, 0.5),
and the fourth column centers the coordinate system at (2, 3, 4).

Provided the matrix can be [inverted](#Matrix_Inversions), the three axis vectors are
_basis vectors_ of the coordinate system.

<a id=Why_a_4x4_Matrix></a>
### Why a 4x4 Matrix?
A matrix can describe _linear transformations_ from one vector in space
to another.  These transformations, which include [scaling](#Scaling),
[rotation](#Rotation), and shearing, can change where a vector points _at_,
but not where it points _from_.  It's enough to use a 3x3 matrix to describe
linear transformations in 3D space.

But certain other transformations, such as [translation](#Translation) and
[perspective](#Projective_Transformations), are common in 3D computer graphics.
To describe translation and perspective in 3D, the 3x3 matrix must be
augmented by an additional row and column, turning it into a 4x4 matrix.

A 4x4 matrix can describe linear transformations in 4D space and
transform 4-element vectors.  A 4-element vector has four components:
X, Y, Z, and W. If a 4-element vector represents a 3D point, these
components are the point's _homogeneous coordinates_ (unless the
vector's W is 0).  To convert these coordinates back to 3D, divide
X, Y, and Z by W.  This is usually only required, however, if the
matrix describes a perspective projection (see
["Projective Transformations"](#Projective_Transformations)).

A similar situation applies in 2D between 2x2 and 3x3 matrices as it does
in 3D between 3x3 and 4x4 matrices.

<a id=Transforming_Points></a>
## Transforming Points

The transformation formula multiplies a matrix by a 3D point to change that point's
position:

* **a&prime;**<sub>_x_</sub> = matrix[0] &#x22c5; **a**<sub>_x_</sub> + matrix[4] &#x22c5; **a**<sub>_y_</sub> + matrix[8] &#x22c5; **a**<sub>_z_</sub> + matrix[12] &#x22c5; **a**<sub>_w_</sub>
* **a&prime;**<sub>_y_</sub> = matrix[1] &#x22c5; **a**<sub>_x_</sub> + matrix[5] &#x22c5; **a**<sub>_y_</sub> + matrix[9] &#x22c5; **a**<sub>_z_</sub> + matrix[13] &#x22c5; **a**<sub>_w_</sub>
* **a&prime;**<sub>_z_</sub> = matrix[2] &#x22c5; **a**<sub>_x_</sub> + matrix[6] &#x22c5; **a**<sub>_y_</sub> + matrix[10] &#x22c5; **a**<sub>_z_</sub> + matrix[14] &#x22c5; **a**<sub>_w_</sub>
* **a&prime;**<sub>_w_</sub> = matrix[3] &#x22c5; **a**<sub>_x_</sub> + matrix[7] &#x22c5; **a**<sub>_y_</sub> + matrix[11] &#x22c5; **a**<sub>_z_</sub> + matrix[15] &#x22c5; **a**<sub>_w_</sub>

For more on why **a&prime;**<sub>_w_</sub> appears here, see ["Why a 4x4 Matrix?"](#Why_a_4x4_Matrix).  In each formula that follows,  **a**<sub>_w_</sub> is assumed to be 1 (indicating a conventional 3D point).

The following sections describe different kinds of matrix transformations in more detail.

Related functions:

* [H3DU.Math.mat4transform()]{@link H3DU.Math.mat4transform} -
 Transforms a 4-element vector with a 4x4 matrix
* [H3DU.Math.mat3transform()]{@link H3DU.Math.mat3transform} -
 Transforms a 3-element vector with a 3x3 matrix
* {@link H3DU.Math.mat4projectVec3} -
 Does a perspective-correct transformation of a 3D point with a 4x4 matrix

<a id=Scaling></a>
### Scaling

Scaling changes an object's size. Scaling uses the 1st,
6th, and 11th elements of the matrix as seen here:

<math>
<mfenced open="[" close="]">
 <mtable>
 <mtr>
 <mtd><mi>sx</mi></mtd>
 <mtd><mn>0</mn></mtd>
 <mtd><mn>0</mn></mtd>
 <mtd><mn>0</mn></mtd>
 </mtr>
 <mtr>
 <mtd><mn>0</mn></mtd>
 <mtd><mi>sy</mi></mtd>
 <mtd><mn>0</mn></mtd>
 <mtd><mn>0</mn></mtd>
 </mtr>
 <mtr>
 <mtd><mn>0</mn></mtd>
 <mtd><mn>0</mn></mtd>
 <mtd><mi>sz</mi></mtd>
 <mtd><mn>0</mn></mtd>
 </mtr>
 <mtr>
 <mtd><mi>0</mi></mtd>
 <mtd><mi>0</mi></mtd>
 <mtd><mi>0</mi></mtd>
 <mtd><mn>1</mn></mtd>
 </mtr>
</mtable>
</mfenced>
</math>

where the X coordinate is multiplied by `sx`, the Y coordinate is multiplied by `sy`, and
the Z coordinate is multiplied by `sz`.

The scaling formula would look like:

* **a&prime;**<sub>_x_</sub> = sx &#x22c5; **a**<sub>_x_</sub> + 0 &#x22c5; **a**<sub>_y_</sub> + 0 &#x22c5; **a**<sub>_z_</sub> + 0
* **a&prime;**<sub>_y_</sub> = 0 &#x22c5; **a**<sub>_x_</sub> + sy &#x22c5; **a**<sub>_y_</sub> + 0 &#x22c5; **a**<sub>_z_</sub> + 0
* **a&prime;**<sub>_z_</sub> = 0 &#x22c5; **a**<sub>_x_</sub> + 0 &#x22c5; **a**<sub>_y_</sub> + sz &#x22c5; **a**<sub>_z_</sub> + 0
* **a&prime;**<sub>_w_</sub> = 0 &#x22c5; **a**<sub>_x_</sub> + 0 &#x22c5; **a**<sub>_y_</sub> + 0 &#x22c5; **a**<sub>_z_</sub> + 1 = 1

For example, we multiply the input x by `sx` to get the output x. If `sx` is 1, x
remains unchanged. Likewise for y and z.

If `sx`, `sy`, or `sz` is -1, that coordinate is _reflected_ along the corresponding axis.

If `sx`, `sy`, and `sz` are all 1, we have an _identity matrix_, where the input vector
is equal to the output vector.

> When the transformed X, Y, or Z axis has a length other than 1, the coordinate
system will be scaled up or down along that axis.  The scalings given
here will scale the lengths of the corresponding axes.  For example,
if `sx` is 2, the X axis will be (2, 0, 0) and thus have a length of 2.

Related functions:

* [H3DU.Math.mat4scaled()]{@link H3DU.Math.mat4scaled} -
 Returns a scaling matrix
* [H3DU.Math.mat4scale()]{@link H3DU.Math.mat4scale} -
 Multiplies a matrix by a scaling.
* [H3DU.Math.mat4scaleInPlace()]{@link H3DU.Math.mat4scaleInPlace} -
 Multiplies a matrix in place by a scaling.
* [H3DU.Math.mat4identity()]{@link H3DU.Math.mat4identity} -
 Returns a 4x4 identity matrix
* [H3DU.Math.mat3identity()]{@link H3DU.Math.mat3identity} -
 Returns a 3x3 identity matrix

<a id=Translation></a>
### Translation

A translation is a shifting of an object's position. In a transformation matrix,
this shifting effectively happens after all other transformations such as scaling and rotation.
It uses the 13th, 14th, and 15th elements of the matrix as seen here:

<math>
<mfenced open="[" close="]">
 <mtable>
 <mtr>
 <mtd><mn>1</mn></mtd>
 <mtd><mn>0</mn></mtd>
 <mtd><mn>0</mn></mtd>
 <mtd><mn>tx</mn></mtd>
 </mtr>
 <mtr>
 <mtd><mn>0</mn></mtd>
 <mtd><mn>1</mn></mtd>
 <mtd><mn>0</mn></mtd>
 <mtd><mn>ty</mn></mtd>
 </mtr>
 <mtr>
 <mtd><mn>0</mn></mtd>
 <mtd><mn>0</mn></mtd>
 <mtd><mn>1</mn></mtd>
 <mtd><mn>tz</mn></mtd>
 </mtr>
 <mtr>
 <mtd><mi>0</mi></mtd>
 <mtd><mi>0</mi></mtd>
 <mtd><mi>0</mi></mtd>
 <mtd><mn>1</mn></mtd>
 </mtr>
</mtable>
</mfenced>
</math>

where `tx` is added to the X coordinate, `ty` is added to the Y coordinate, and
`tz` is added to the Z coordinate. The transformation formulas would look like:

* **a&prime;**<sub>_x_</sub> = 1 &#x22c5; **a**<sub>_x_</sub> + 0 &#x22c5; **a**<sub>_y_</sub> + 0 &#x22c5; **a**<sub>_z_</sub> + tx
* **a&prime;**<sub>_y_</sub> = 0 &#x22c5; **a**<sub>_x_</sub> + 1 &#x22c5; **a**<sub>_y_</sub> + 0 &#x22c5; **a**<sub>_z_</sub> + ty
* **a&prime;**<sub>_z_</sub> = 0 &#x22c5; **a**<sub>_x_</sub> + 0 &#x22c5; **a**<sub>_y_</sub> + 1 &#x22c5; **a**<sub>_z_</sub> + tz
* **a&prime;**<sub>_w_</sub> = 0 &#x22c5; **a**<sub>_x_</sub> + 0 &#x22c5; **a**<sub>_y_</sub> + 0 &#x22c5; **a**<sub>_z_</sub> + 1 = 1

For example, we add the input x and `tx` to get the output x. If `tx` is 0, x
remains unchanged. Likewise for y and z.

Related functions:

* [H3DU.Math.mat4translated()]{@link H3DU.Math.mat4translated} -
 Returns a translation matrix
* [H3DU.Math.mat4translate()]{@link H3DU.Math.mat4translate} -
 Multiplies a matrix by a translation.

<a id=Rotation></a>
### Rotation

Rotation changes an object's orientation. Given an angle of rotation, &theta;,
the transformation matrix for rotating 3D points is as follows. (For a list of common
sines and cosines, see the end of this section.)

<figure>
<math>
<mfenced open="[" close="]">
 <mtable>
 <mtr>
 <mtd><mn>1</mn></mtd>
 <mtd><mn>0</mn></mtd>
 <mtd><mn>0</mn></mtd>
 <mtd><mn>0</mn></mtd>
 </mtr>
 <mtr>
 <mtd><mn>0</mn></mtd>
 <mtd><mi>cos</mi><mi>&theta;</mi></mtd>
 <mtd><mo>-</mo><mi>sin</mi><mi>&theta;</mi></mtd>
 <mtd><mn>0</mn></mtd>
 </mtr>
 <mtr>
 <mtd><mn>0</mn></mtd>
 <mtd><mi>sin</mi><mi>&theta;</mi></mtd>
 <mtd><mi>cos</mi><mi>&theta;</mi></mtd>
 <mtd><mn>0</mn></mtd>
 </mtr>
 <mtr>
 <mtd><mi>0</mi></mtd>
 <mtd><mi>0</mi></mtd>
 <mtd><mi>0</mi></mtd>
 <mtd><mn>1</mn></mtd>
 </mtr>
</mtable>
</mfenced>
</math>
<figcaption>Rotation about the X axis.</figcaption></figure>
<figure>
<math>
<mfenced open="[" close="]">
 <mtable>
 <mtr>
 <mtd><mi>cos</mi><mi>&theta;</mi></mtd>
 <mtd><mn>0</mn></mtd>
 <mtd><mi>sin</mi><mi>&theta;</mi></mtd>
 <mtd><mn>0</mn></mtd>
 </mtr>
 <mtr>
 <mtd><mn>0</mn></mtd>
 <mtd><mn>1</mn></mtd>
 <mtd><mn>0</mn></mtd>
 <mtd><mn>0</mn></mtd>
 </mtr>
 <mtr>
 <mtd><mo>-</mo><mi>sin</mi><mi>&theta;</mi></mtd>
 <mtd><mn>0</mn></mtd>
 <mtd><mi>cos</mi><mi>&theta;</mi></mtd>
 <mtd><mn>0</mn></mtd>
 </mtr>
 <mtr>
 <mtd><mi>0</mi></mtd>
 <mtd><mi>0</mi></mtd>
 <mtd><mi>0</mi></mtd>
 <mtd><mn>1</mn></mtd>
 </mtr>
</mtable>
</mfenced>
</math>
<figcaption>Rotation about the Y axis.</figcaption></figure>
<figure>
<math>
<mfenced open="[" close="]">
 <mtable>
 <mtr>
 <mtd><mi>cos</mi><mi>&theta;</mi></mtd>
 <mtd><mo>-</mo><mi>sin</mi><mi>&theta;</mi></mtd>
 <mtd><mn>0</mn></mtd>
 <mtd><mn>0</mn></mtd>
 </mtr>
 <mtr>
 <mtd><mi>sin</mi><mi>&theta;</mi></mtd>
 <mtd><mi>cos</mi><mi>&theta;</mi></mtd>
 <mtd><mn>0</mn></mtd>
 <mtd><mn>0</mn></mtd>
 </mtr>
 <mtr>
 <mtd><mn>0</mn></mtd>
 <mtd><mn>0</mn></mtd>
 <mtd><mn>1</mn></mtd>
 <mtd><mn>0</mn></mtd>
 </mtr>
 <mtr>
 <mtd><mi>0</mi></mtd>
 <mtd><mi>0</mi></mtd>
 <mtd><mi>0</mi></mtd>
 <mtd><mn>1</mn></mtd>
 </mtr>
</mtable>
</mfenced>
</math>
<figcaption>Rotation about the Z axis.</figcaption></figure>

Note that:

* When we rotate a point about the X axis, the X coordinate is unchanged
and the Y and Z coordinates are adjusted in the rotation. For rotations about the
Y axis or the Z axis, the Y or Z coordinate, respectively, is likewise unchanged.
* If the axis of rotation points toward the viewer, positive rotations mean
counterclockwise rotation in [right-handed coordinate systems]{@tutorial glmath}. For example,
60 degrees about the axis means
60 degrees counterclockwise, and negative 60 degrees means 60 degrees
clockwise.
* Rotating a point around an arbitrary axis of rotation is more complicated to describe.
When describing an axis of rotation, <code>[1, 0, 0]</code> is the X axis,
 <code>[0, 1, 0]</code> is the Y axis, and  <code>[0, 0, 1]</code> is the Z axis.

See ["Rotation example"](#Rotation_Example) for an illustration of a rotation
transformation.

Related functions:

* [H3DU.Math.mat4rotated()]{@link H3DU.Math.mat4rotated} -
 Returns a rotation matrix
* [H3DU.Math.mat4rotate()]{@link H3DU.Math.mat4rotate} -
 Multiplies a matrix by a translation.

A list of common sines and cosines follows.  Values
shown with three decimal places are approximate.

| &nbsp; | 0&deg;| 22.5&deg;| 30&deg;| 45&deg;| 60&deg;| 67.5&deg;| 90&deg;| 112.5&deg;| 120&deg;| 135&deg;| 150&deg;| 157.5&deg;| 180&deg;|
 -------|---|------|----|----|----|------|----|------|-----|-----|-----|-------|-----|
| sin | 0 | 0.383 | 0.5 | 0.707 | 0.866 | 0.924 | 1 | 0.924 | 0.866 | 0.707 | 0.5 | 0.383 | 0 |
| cos | 1 | 0.924 | 0.866 | 0.707 | 0.5 | 0.383 | 0 | -0.383 | -0.5 | -0.707 | -0.866 | -0.924 | -1 |

| &nbsp; | 180&deg;| 202.5&deg;| 210&deg;| 225&deg;| 240&deg;| 247.5&deg;| 270&deg;| 292.5&deg;| 300&deg;| 315&deg;| 330&deg;| 337.5&deg;| 360&deg;|
 -------|---|------|----|----|----|------|----|------|-----|-----|-----|-------|-----|
| sin | 0 | -0.383 | -0.5 | -0.707 | -0.866 | -0.924 | -1 | -0.924 | -0.866 | -0.707 | -0.5 | -0.383 | 0 |
| cos | -1 | -0.924 | -0.866 | -0.707 | -0.5 | -0.383 | 0 | 0.383 | 0.5 | 0.707 | 0.866 | 0.924 | 1 |

<a id=Matrix_Multiplication></a>
### Matrix Multiplication

When two matrices are multiplied, the combined matrix will be such
that the transformations they describe happen in reverse
order. For example, if the first matrix (input matrix) describes a translation and the second
matrix describes a scaling, the multiplied matrix will
describe the effect of scaling then translation.

Matrix multiplication is not commutative; the order of multiplying matrices is important.

To get an insight of how matrix multiplication works, treat the second matrix as a group
of column vectors (with the same number of rows as the number of columns in the
first matrix).  Multiplying the two matrices transforms these vectors to new ones in the
same way as if the column vectors were transformed individually.  (This also explains why there can
be one or more column vectors in the second matrix and not just four in the case of a 4x4 matrix,
and also why transforming a column vector is the same as multiplying a 4x4 matrix by a
matrix with one column and four rows.*)

This insight reveals a practical use of matrix multiplication: transforming four 4-element
vectors at once using a single matrix operation involving two 4x4 matrices.  After the
matrix multiplication, each of the transformed vectors will be contained in one of the four columns
of the output matrix.

The methods `mat4multiply`, `mat4scale`, `mat4scaleInPlace`, `mat4translate`, and
mat4rotate involve multiplying 4x4 matrices.

Related functions:

* [H3DU.Math.mat4multiply()]{@link H3DU.Math.mat4multiply} -
 Multiplies two matrices

\* Reading the [tutorial by Dmitry Sokolov](https://github.com/ssloy/tinyrenderer/wiki/Lesson-4:-Perspective-projection)
led me to this highly useful insight.

<a id=Projective_Transformations></a>
### Projective Transformations

In all the transformations described above, the last row in the transformation matrix is
(0, 0, 0, 1). (Such transformations are called _affine transformations_, those that
keep parallel lines parallel.) However, this is not the case for
some transformations in the `H3DU.Math` library.

Transformations that don't necessarily preserve straightness and parallelism of lines are
called _projective transformations_.  An NxN matrix which has one more row and one more column
than the number of dimensions, can describe projective transformations.  For example,
a 4x4 matrix can describe 3D projective transformations in the form of linear transformations
on homogeneous coordinates (see ["Why a 4x4 Matrix?"](#Why_a_4x4_Matrix)).  For a
3D projective transformation, the last row in the matrix is not necessarily (0, 0, 0, 1).

One example of a projective transformation is found in a _perspective projection_ matrix,
as returned by {@link H3DU.Math.mat4perspective} or {@link H3DU.Math.mat4frustum}. When
a 4-element vector is transformed with this matrix, its W component is generated by setting
it to the negative Z coordinate in _eye space_, or more specifically, as follows:

* **a&prime;**<sub>_w_</sub> = 0 &#x22c5; **a**<sub>_x_</sub> + 0 &#x22c5; **a**<sub>_y_</sub> + -1 &#x22c5; **a**<sub>_z_</sub> + 0

For more on perspective projections, see [_The "Camera" and Geometric Transforms_]{@tutorial camera}).

Related functions:

* [H3DU.Math.mat4frustum()]{@link H3DU.Math.mat4frustum} -
 Returns a frustum matrix
* [H3DU.Math.mat4perspective()]{@link H3DU.Math.mat4perspective} -
 Returns a field-of-view perspective matrix

<a id=Matrix_Inversions></a>
### Matrix Inversions

An inverted matrix describes a transformation that undoes another transformation. For
example, if a scaling enlarges an object, the inverted matrix reduces the object to its original
size.

To invert a **translation**, reverse the sign of the translation elements (given above as `tx`, `ty`, and `tz`)
and generate a new translation matrix with the new translation elements. For example,
to invert the translation (5, 2, -3), use the translation (-5, -2, 3).

To invert a **scaling**, use 1 divided by each of the scaling elements (given above as `sx`, `sy`, and `sz`)
and generate a new scaling matrix with those elements.
For example, to invert the scaling (2, 3, 4), use the scaling (1/2, 1/3, 1/4).

To invert a **rotation** for a 4x4 matrix, swap the 2nd and 5th elements of the matrix,
the 3rd and 9th elements, and the 7th and 10th elements of the matrix (zero-based
elements 1, 4, 2, 8, 6, and 9 respectively). The effect is like reversing the angle of the
rotation to reset an object to its previous orientation.  In general, to invert an NxN
rotation matrix, _transpose_ that matrix (so that its rows become its columns and vice versa).

Matrices that use some combination of translation, scaling, and rotation as well as other kinds of matrices are more complicated to invert. In fact, some matrices can't be inverted at all.  The formula for inverting a general matrix is too complicated to discuss here.

Related functions:

* [H3DU.Math.mat4invert()]{@link H3DU.Math.mat4invert} -
 Inverts a 4x4 matrix
* [H3DU.Math.mat4invert()]{@link H3DU.Math.mat4invert} -
 Inverts a 3x3 matrix

<a id=Rotation_Example></a>
## Rotation Example

As an example, say we rotate 60 degrees about the X axis (`mat4rotated(60, 1, 0, 0)`,
&theta; = 60&deg;).  First, we find the rotation formula for the X axis:

* **a&prime;**<sub>_x_</sub> = 1 &#x22c5; **a**<sub>_x_</sub> + 0 &#x22c5; **a**<sub>_y_</sub> + 0 &#x22c5; **a**<sub>_z_</sub> + 0
* **a&prime;**<sub>_y_</sub> = 0 &#x22c5; **a**<sub>_x_</sub> + (cos &theta;) &#x22c5; **a**<sub>_y_</sub> + -(sin &theta;) &#x22c5; **a**<sub>_z_</sub> + 0
* **a&prime;**<sub>_z_</sub> = 0 &#x22c5; **a**<sub>_x_</sub> + (sin &theta;) &#x22c5; **a**<sub>_y_</sub> + (cos &theta;) &#x22c5; **a**<sub>_z_</sub> + 0
* **a&prime;**<sub>_w_</sub> = 0 &#x22c5; **a**<sub>_x_</sub> + 0 &#x22c5; **a**<sub>_y_</sub> + 0 &#x22c5; **a**<sub>_z_</sub> + 1 = 1

We calculate <i>cos &theta;</i> as 0.5 and <i>sin &theta;</i> as about 0.866025.
We plug those numbers into the rotation formula to get a formula for rotating a
point 60 degrees about the X axis.

* **a&prime;**<sub>_x_</sub> = 1 &#x22c5; **a**<sub>_x_</sub> + 0 &#x22c5; **a**<sub>_y_</sub> + 0 &#x22c5; **a**<sub>_z_</sub> + 0 = **a**<sub>_x_</sub>
* **a&prime;**<sub>_y_</sub> ~= 0 &#x22c5; **a**<sub>_x_</sub> + 0.5 &#x22c5; **a**<sub>_y_</sub> + -0.866025 &#x22c5; **a**<sub>_z_</sub> + 0
* **a&prime;**<sub>_z_</sub> ~= 0 &#x22c5; **a**<sub>_x_</sub> + 0.866025 &#x22c5; **a**<sub>_y_</sub> + 0.5 &#x22c5; **a**<sub>_z_</sub> + 0
* **a&prime;**<sub>_w_</sub> = 0 &#x22c5; **a**<sub>_x_</sub> + 0 &#x22c5; **a**<sub>_y_</sub> + 0 &#x22c5; **a**<sub>_z_</sub> + 1 = 1

If a point is located at (10, 20, 30), the rotated point would now be:

* **a&prime;**<sub>_x_</sub> = 1 &#x22c5; 10 + 0 &#x22c5; 20 + 0 &#x22c5; 30 + 0
* = 1 &#x22c5; 10
* = 10
* **a&prime;**<sub>_y_</sub> ~= 0 &#x22c5; 10 + 0.5 &#x22c5; 20 + -0.866025 &#x22c5; 30 + 0
* ~= 0.5 &#x22c5; 20 + -0.866025 &#x22c5; 30
* ~= 10 + -25.98075
* ~= -15.98075
* **a&prime;**<sub>_z_</sub> ~= 0 &#x22c5; 10 + 0.866025 &#x22c5; 20 + 0.5 &#x22c5; 30 + 0
* ~= 0.866025 &#x22c5; 20 + 0.5 &#x22c5; 30
* ~= 17.3205 + 15
* ~= 32.3205
* **a&prime;**<sub>_w_</sub> = 0 &#x22c5; 10 + 0 &#x22c5; 20 + 0 &#x22c5; 30 + 1
* = 1

So the rotated point would be at about (10, -15.98075, 32.3205).

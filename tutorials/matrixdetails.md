## Matrix Details <a id=Matrix_Details></a>

A matrix is a 16- or 9-element array that describes a
transformation from one coordinate system to another. Transformations
include translation (shifting), scaling, and rotation.
Functions dealing with matrices begin with "mat".

This section contains detailed information on matrices.

## Contents <a id=Contents></a>

[Matrix Details](#Matrix_Details)<br>[Contents](#Contents)<br>[Arrangement](#Arrangement)<br>&nbsp;&nbsp;[Transforming Points](#Transforming_Points)<br>&nbsp;&nbsp;[Translation](#Translation)<br>&nbsp;&nbsp;[Scaling](#Scaling)<br>&nbsp;&nbsp;[Rotation](#Rotation)<br>&nbsp;&nbsp;[Matrix Multiplication](#Matrix_Multiplication)<br>&nbsp;&nbsp;[Other Transformations](#Other_Transformations)<br>&nbsp;&nbsp;[Matrix Inversions](#Matrix_Inversions)<br>

## Arrangement <a id=Arrangement></a>

All functions dealing with 4x4 matrices assume that
the translation elements in x, y, and z are located in the
13th, 14th, and 15th elements of the matrix array
(zero-based indices 12, 13, and 14).

In mathematical publications,
matrices are often notated in column-major order, in which each
element of the matrix is placed in columns, rather than in rows, as in the following example:

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
into the matrix arrays passed to GLMath's matrix methods.

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
 <mtr>
 <mtd><mi>matrix[3]</mi></mtd>
 <mtd><mi>matrix[7]</mi></mtd>
 <mtd><mi>matrix[11]</mi></mtd>
 </mtr>
</mtable>
</mfenced>
</math>

### Transforming Points <a id=Transforming_Points></a>

The transformation formula multiplies a matrix by a 3D point to change that point's
position:

* **a&prime;**<sub>_x_</sub> = matrix[0] &#x22c5; **a**<sub>_x_</sub> + matrix[4] &#x22c5; **a**<sub>_y_</sub> + matrix[8] &#x22c5; **a**<sub>_z_</sub> + matrix[12]
* **a&prime;**<sub>_y_</sub> = matrix[1] &#x22c5; **a**<sub>_x_</sub> + matrix[5] &#x22c5; **a**<sub>_y_</sub> + matrix[9] &#x22c5; **a**<sub>_z_</sub> + matrix[13]
* **a&prime;**<sub>_z_</sub> = matrix[2] &#x22c5; **a**<sub>_x_</sub> + matrix[6] &#x22c5; **a**<sub>_y_</sub> + matrix[10] &#x22c5; **a**<sub>_z_</sub> + matrix[14]

Note that:

* For the purpose of transforming 3D points, the last row of the matrix above can be ignored,
since it doesn't transform x, y, or z. (It would correspond to the W component of the
output.)
* To make the formula equivalent to multiplying by a 4-component vector, set the input
vector's W component to 1.

The following sections describe different kinds of matrix transformations in more detail.

Related functions:

* [GLMath.mat4transform()]{@link glmath.GLMath.mat4transform} -
 Transforms a 4-element vector with a 4x4 matrix
* [GLMath.mat3transform()]{@link glmath.GLMath.mat3transform} -
 Transforms a 3-element vector with a 3x3 matrix

### Translation <a id=Translation></a>

A translation is a shifting of an object's position.  In a transformation matrix,
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

where `tx` is added to the x-coordinate, `ty` is added to the y-coordinate, and
`tz` is added to the z-coordinate.  The transformation formulas would look like:

* **a&prime;**<sub>_x_</sub> = 1 &#x22c5; **a**<sub>_x_</sub> + 0 &#x22c5; **a**<sub>_y_</sub> + 0 &#x22c5; **a**<sub>_z_</sub> + tx
* **a&prime;**<sub>_y_</sub> = 0 &#x22c5; **a**<sub>_x_</sub> + 1 &#x22c5; **a**<sub>_y_</sub> + 0 &#x22c5; **a**<sub>_z_</sub> + ty
* **a&prime;**<sub>_z_</sub> = 0 &#x22c5; **a**<sub>_x_</sub> + 0 &#x22c5; **a**<sub>_y_</sub> + 1 &#x22c5; **a**<sub>_z_</sub> + tz

For example, we add the input x and `tx` to get the output x.  If `tx` is 0, x
remains unchanged.  Likewise for y and z.

Related functions:

* [GLMath.mat4translated()]{@link glmath.GLMath.mat4translated} -
 Returns a translation matrix
* [GLMath.mat4translate()]{@link glmath.GLMath.mat4translate} -
 Multiplies a matrix by a translation.

### Scaling <a id=Scaling></a>

Scaling changes an object's size.  Scaling uses the 1st,
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

where the x-coordinate is multiplied by `sx`, the y-coordinate is multiplied by `sy`, and
the z-coordinate is multiplied by `sz`.

The scaling formula would look like:

* **a&prime;**<sub>_x_</sub> = sx &#x22c5; **a**<sub>_x_</sub> + 0 &#x22c5; **a**<sub>_y_</sub> + 0 &#x22c5; **a**<sub>_z_</sub> + 0
* **a&prime;**<sub>_y_</sub> = 0 &#x22c5; **a**<sub>_x_</sub> + sy &#x22c5; **a**<sub>_y_</sub> + 0 &#x22c5; **a**<sub>_z_</sub> + 0
* **a&prime;**<sub>_z_</sub> = 0 &#x22c5; **a**<sub>_x_</sub> + 0 &#x22c5; **a**<sub>_y_</sub> + sz &#x22c5; **a**<sub>_z_</sub> + 0

For example, we multiply the input x by `sx` to get the output x.  If `sx` is 1, x
remains unchanged.  Likewise for y and z.

If `sx`, `sy`, or `sz` is -1, that coordinate is _reflected_ along the corresponding axis.

If `sx`, `sy`, and `sz` are all 1, we have an _identity matrix_, where the input vector
is equal to the output vector.

Related functions:

* [GLMath.mat4identity()]{@link glmath.GLMath.mat4identity} -
 Returns a 4x4 identity matrix
* [GLMath.mat3identity()]{@link glmath.GLMath.mat3identity} -
 Returns a 3x3 identity matrix
* [GLMath.mat4scaled()]{@link glmath.GLMath.mat4scaled} -
 Returns a scaling matrix
* [GLMath.mat4scale()]{@link glmath.GLMath.mat4scale} -
 Multiplies a matrix by a scaling.
* [GLMath.mat4scaleInPlace()]{@link glmath.GLMath.mat4scaleInPlace} -
 Multiplies a matrix in place by a scaling.

### Rotation <a id=Rotation></a>

Rotation changes an object's orientation.  Rotation uses the upper-left
corner of a matrix.  Given an angle of rotation, &theta; (in radians; multiply
degrees by &pi; and divide by 180), the transformation matrix is as follows.

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

For conciseness, we only give the rotation formula for the X axis,
which would look like:

* **a&prime;**<sub>_x_</sub> = 1 &#x22c5; **a**<sub>_x_</sub> + 0 &#x22c5; **a**<sub>_y_</sub> + 0 &#x22c5; **a**<sub>_z_</sub> + 0
* **a&prime;**<sub>_y_</sub> = 0 &#x22c5; **a**<sub>_x_</sub> + (cos &theta;) &#x22c5; **a**<sub>_y_</sub> + -(sin &theta;) &#x22c5; **a**<sub>_z_</sub> + 0
* **a&prime;**<sub>_z_</sub> = 0 &#x22c5; **a**<sub>_x_</sub> + (sin &theta;) &#x22c5; **a**<sub>_y_</sub> + (cos &theta;) &#x22c5; **a**<sub>_z_</sub> + 0

Note that:

* When we rotate a point about the X axis, the X coordinate is unchanged
and the Y and Z coordinates are adjusted in the rotation.  For rotations about the
Y axis or the Z axis, the Y or Z coordinate, respectively, is likewise unchanged.
* If the axis of rotation points toward the viewer, positive rotations mean
counterclockwise rotation in right-handed coordinate systems.  For example,
60 degrees about the axis means
60 degrees counterclockwise, and negative 60 degrees means 60 degrees
clockwise.

As an example, say we rotate 60 degrees about the X axis (`mat4rotated(60, 1, 0, 0)`,
&theta; = 60).
We calculate <i>cos &theta;</i> as 0.5 and <i>sin &theta;</i> as about 0.866025.
We plug those numbers into the rotation formula to get a formula for rotating a
point 60 degrees about the X axis.

* **a&prime;**<sub>_x_</sub> = 1 &#x22c5; **a**<sub>_x_</sub> + 0 &#x22c5; **a**<sub>_y_</sub> + 0 &#x22c5; **a**<sub>_z_</sub> + 0 = **a**<sub>_x_</sub>
* **a&prime;**<sub>_y_</sub> ~= 0 &#x22c5; **a**<sub>_x_</sub> + 0.5 &#x22c5; **a**<sub>_y_</sub> + -0.866025 &#x22c5; **a**<sub>_z_</sub> + 0
* **a&prime;**<sub>_z_</sub> ~= 0 &#x22c5; **a**<sub>_x_</sub> + 0.866025 &#x22c5; **a**<sub>_y_</sub> + 0.5 &#x22c5; **a**<sub>_z_</sub> + 0

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

So the rotated point would be at about (10, -15.98075, 32.3205).

Related functions:

* [GLMath.mat4rotated()]{@link glmath.GLMath.mat4rotated} -
 Returns a rotation matrix
* [GLMath.mat4rotate()]{@link glmath.GLMath.mat4rotate} -
 Multiplies a matrix by a translation.

### Matrix Multiplication <a id=Matrix_Multiplication></a>

Two matrices can be combined into a single transformation. To do so,
the matrices are multiplied such that the transformations
they describe happen in reverse order.  For example, if the first matrix
(input matrix) describes a translation and the second
matrix describes a scaling, the multiplied matrix will
describe the effect of scaling then translation.

Matrix multiplication is not commutative; the order
of multiplying matrices is important.  This multiplication
behavior in GLMath follows that of OpenGL and is opposite to that in the
D3DX and DirectXMath libraries.

The methods mat4multiply, mat4scale, mat4scaleInPlace, mat4translate, and
mat4rotate involve multiplying 4x4 matrices

Related functions:

* [GLMath.mat4multiply()]{@link glmath.GLMath.mat4multiply} -
 Multiplies two matrices

### Other Transformations <a id=Other_Transformations></a>

In all the transformations described above, the last row in the transformation matrix is
(0, 0, 0, 1).  (For that reason, they are called _affine transformations_, those that
keep parallel lines parallel.) However, this is not the case for
some transformations in the GLMath library.

One example of such a transformation is the frustum matrix.  When a 4-element
vector is transformed with this matrix, its W component is generated as follows:

* **a&prime;**<sub>_w_</sub> = 0 &#x22c5; **a**<sub>_x_</sub> + 0 &#x22c5; **a**<sub>_y_</sub> + -1 &#x22c5; **a**<sub>_z_</sub> + 0

<small>The graphics system (outside of this JavaScript library) uses this W component
to help achieve the perspective rendering effect.  Assuming the transformed vector
is a device coordinate returned by a vertex shader, the system will divide the vector's
X, Y, and Z by its W to get the vector's _normalized device coordinates_.</small>

Related functions:

* [GLMath.mat4frustum()]{@link glmath.GLMath.mat4frustum} -
 Returns a frustum matrix
* [GLMath.mat4perspective()]{@link glmath.GLMath.mat4perspective} -
 Returns a field-of-view perspective matrix

### Matrix Inversions <a id=Matrix_Inversions></a>

An inverted matrix describes a transformation that undoes another transformation.  For
example, if a scaling enlarges an object, the inverted matrix reduces the object to its original
size.

To invert a **translation**, reverse the sign of the translation elements `tx`, `ty`, and `tz`
and generate a new translation matrix with the new translation elements.  For example,
to invert the translation (5, 2, -3), use the translation (-5, -2, 3).

To invert a **scaling**, use the reciprocal of `sx`, `sy`, and `sz`
and generate a new scaling matrix with those elements.
For example, to invert the scaling (2, 3, 4), use the scaling (1/2, 1/3, 1/4).

To invert a **rotation**, swap the 2nd and 5th elements of the matrix, the 3rd and 9th
elements, and the 7th and 10th elements of the matrix (zero-based elements 1, 4, 2, 8,
6, and 9 respectively).  The effect is like reversing the angle of the rotation to reset an object
to its original orientation.

Matrices that use some combination of translation, scaling, and rotation
as well as other kinds of matrices are more complicated
to invert.  In fact, some matrices can't be inverted at all.  The formula for inverting a general
matrix is too complicated to discuss here.

Related functions:

* [GLMath.mat4invert()]{@link glmath.GLMath.mat4invert} -
 Inverts a matrix

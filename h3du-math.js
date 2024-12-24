/*
 Any copyright to this file is released to the Public Domain.
 In case this is not possible, this file is also licensed under the Unlicense: https://unlicense.org/
*/

/**
 * A collection of math functions for working
 * with vectors, matrices, quaternions, and other
 * mathematical objects of interest to three-dimensional graphics programming.<p>
 * <a id=Vectors></a>
 * ## Vectors
 * A vector is a line segment pointing in a certain _direction_ in space and
 * having a certain _length_ and an unspecified starting point.
 * A particular vector can instead be treated as describing a position
 * (by pointing to that position from an _origin_ (0,0,0)), or a color.
 * In `MathUtil`, vectors are stored in arrays of numbers (usually
 * three or four numbers), and functions dealing with vectors begin
 * with "vec".
 * If a 4-element vector describes a position or direction, the elements
 * are given as X, Y, Z, and W, in that order.
 * If a 4-element vector describes a color, the elements are given as red, green,
 * blue, and alpha, in that order (where each element ranges from 0-1).
 * If a 3D _direction_ is used in a 4-element vector function (one beginning with "vec4"),
 * use 0 as the fourth element. If a 3D _position_ (point) is used in a 4-element vector
 * function, the fourth element is generally 1. (If the
 * fourth element is anything other than 0, the vector is in _homogeneous
 * coordinates_, where the 3D position equals the first three elements divided
 * by the fourth.)
 * A _unit vector_ is a vector with a length of 1. (A vector's _length_, or _norm_, is the square root
 * of the sum of the squares of its components.) A vector can be "normalized" to
 * a unit vector by dividing each of its components by its length (doing so won't change
 * the vector's direction). The following functions normalize vectors and find their length: {@link MathUtil.vec3normalize} converts a 3-element vector to a unit vector; {@link MathUtil.vec4normalize} converts a 4-element vector to a unit vector; {@link MathUtil.vec3length} finds a 3-element vector's length; {@link MathUtil.vec4length} finds a 4-element vector's length. Note that due to rounding error, normalizing a vector with a `MathUtil` method might not necessarily result in a vector with a length of 1.
 * <a id=Matrices></a>
 * ## Matrices
 * A matrix is a rectangular array that can describe a
 * transformation from one coordinate system to another. Transformations
 * that matrices can describe include translation (shifting), scaling, and rotation.
 * Functions dealing with matrices begin with "mat".
 * A 3 &times; 3 or 4 &times; 4 matrix has 9 or 16 elements, respectively. In mathematical publications,
 * matrices are often notated in column-major order, in which each
 * element of the matrix is placed in columns as opposed to rows, as in the following example:
 * <math>
 * <mfenced open="[" close="]">
 * <mtable>
 * <mtr>
 * <mtd><mi>matrix[0]</mi></mtd>
 * <mtd><mi>matrix[4]</mi></mtd>
 * <mtd><mi>matrix[8]</mi></mtd>
 * <mtd><mi>matrix[12]</mi></mtd>
 * </mtr>
 * <mtr>
 * <mtd><mi>matrix[1]</mi></mtd>
 * <mtd><mi>matrix[5]</mi></mtd>
 * <mtd><mi>matrix[9]</mi></mtd>
 * <mtd><mi>matrix[13]</mi></mtd>
 * </mtr>
 * <mtr>
 * <mtd><mi>matrix[2]</mi></mtd>
 * <mtd><mi>matrix[6]</mi></mtd>
 * <mtd><mi>matrix[10]</mi></mtd>
 * <mtd><mi>matrix[14]</mi></mtd>
 * </mtr>
 * <mtr>
 * <mtd><mi>matrix[3]</mi></mtd>
 * <mtd><mi>matrix[7]</mi></mtd>
 * <mtd><mi>matrix[11]</mi></mtd>
 * <mtd><mi>matrix[15]</mi></mtd>
 * </mtr>
 * </mtable>
 * </mfenced>
 * </math>
 * The numbers in brackets in the matrix above are the zero-based indices
 * into the matrix arrays passed to `MathUtil`'s matrix methods.
 * For 3 &times; 3 matrices, the elements are arranged in the following order:
 * <math>
 * <mfenced open="[" close="]">
 * <mtable>
 * <mtr>
 * <mtd><mi>matrix[0]</mi></mtd>
 * <mtd><mi>matrix[3]</mi></mtd>
 * <mtd><mi>matrix[6]</mi></mtd>
 * </mtr>
 * <mtr>
 * <mtd><mi>matrix[1]</mi></mtd>
 * <mtd><mi>matrix[4]</mi></mtd>
 * <mtd><mi>matrix[7]</mi></mtd>
 * </mtr>
 * <mtr>
 * <mtd><mi>matrix[2]</mi></mtd>
 * <mtd><mi>matrix[5]</mi></mtd>
 * <mtd><mi>matrix[8]</mi></mtd>
 * </mtr>
 * </mtable>
 * </mfenced>
 * </math>
 * <b>A Matrix Transforms Between Coordinate Systems:</b> A transformed 3D coordinate system is made up of an x-, y-, and z-axes, and a center of the coordinate system. These are four 3-element vectors that describe how the three axes and the center map to the new coordinate system in relation to the old coordinate system.
 * The following depiction of a 4 &times; 4 matrix illustrates the meaning of each of its elements. To keep things
 * simple, this matrix's transformation is one that keeps straight lines straight and parallel lines parallel.
 * <math>
 * <mfenced open="[" close="]">
 * <mtable>
 * <mtr>
 * <mtd><mi>[0] x-axis X</mi></mtd>
 * <mtd><mi>[4] y-axis X</mi></mtd>
 * <mtd><mi>[8] z-axis X</mi></mtd>
 * <mtd><mi>[12] Center X</mi></mtd>
 * </mtr>
 * <mtr>
 * <mtd><mi>[1] x-axis Y</mi></mtd>
 * <mtd><mi>[5] y-axis Y</mi></mtd>
 * <mtd><mi>[9] z-axis Y</mi></mtd>
 * <mtd><mi>[13] Center Y</mi></mtd>
 * </mtr>
 * <mtr>
 * <mtd><mi>[2] x-axis Z</mi></mtd>
 * <mtd><mi>[6] y-axis Z</mi></mtd>
 * <mtd><mi>[10] z-axis Z</mi></mtd>
 * <mtd><mi>[14] Center Z</mi></mtd>
 * </mtr>
 * <mtr>
 * <mtd><mi>[3] 0</mi></mtd>
 * <mtd><mi>[7] 0</mi></mtd>
 * <mtd><mi>[11] 0</mi></mtd>
 * <mtd><mi>[15] 1</mi></mtd>
 * </mtr>
 * </mtable>
 * </mfenced>
 * </math>
 * The following is an example of a transformation matrix.
 * <math>
 * <mfenced open="[" close="]">
 * <mtable>
 * <mtr>
 * <mtd><mn>1</mn></mtd>
 * <mtd><mn>0</mn></mtd>
 * <mtd><mn>0</mn></mtd>
 * <mtd><mn>2</mn></mtd>
 * </mtr>
 * <mtr>
 * <mtd><mn>0</mn></mtd>
 * <mtd><mi>0.5</mi></mtd>
 * <mtd><mo>-0.866025</mtd>
 * <mtd><mn>3</mn></mtd>
 * </mtr>
 * <mtr>
 * <mtd><mn>0</mn></mtd>
 * <mtd><mi>0.866025</mtd>
 * <mtd><mi>0.5</mtd>
 * <mtd><mn>4</mn></mtd>
 * </mtr>
 * <mtr>
 * <mtd><mi>0</mi></mtd>
 * <mtd><mi>0</mi></mtd>
 * <mtd><mi>0</mi></mtd>
 * <mtd><mn>1</mn></mtd>
 * </mtr>
 * </mtable>
 * </mfenced>
 * </math>
 * Here, the first column shows an x-axis vector at (1, 0, 0),
 * the second column shows a y-axis vector at (0, 0.5, 0.866025),
 * the third column shows a z-axis vector at (0, -0.866025, 0.5),
 * and the fourth column centers the coordinate system at (2, 3, 4).
 * Provided the matrix can be inverted (see the documentation for mat4invert), the three axis vectors are
 * _basis vectors_ of the coordinate system.
 * *Why a 4 &times; 4 matrix?** A matrix can describe _linear transformations_ from one vector in space
 * to another. These transformations, which include [**scaling**](#Scaling),
 * [**rotation**](#Rotation), and shearing, can change where a vector points _at_,
 * but not where it points _from_. It's enough to use a 3 &times; 3 matrix to describe
 * linear transformations in 3D space.
 * But certain other transformations, such as [**translation**](#Translation) and
 * [**perspective**](#Projective_Transformations), are common in 3D computer graphics.
 * To describe translation and perspective in 3D, the 3 &times; 3 matrix must be
 * augmented by an additional row and column, turning it into a 4 &times; 4 matrix.
 * A 4 &times; 4 matrix can describe linear transformations in 4D space and
 * transform 4-element vectors. A 4-element vector has four components:
 * X, Y, Z, and W. If a 4-element vector represents a 3D point, these
 * components are the point's _homogeneous coordinates_ (unless the
 * vector's W is 0). To convert these coordinates back to 3D, divide
 * X, Y, and Z by W. This is usually only required, however, if the
 * matrix describes a perspective projection (see
 * [**"Projective Transformations"**](#Projective_Transformations)).
 * A similar situation applies in 2D between 2 &times; 2 and 3 &times; 3 matrices as it does
 * in 3D between 3 &times; 3 and 4 &times; 4 matrices.
 * *Transforming points.** The transformation formula multiplies a matrix by a 3D point to change that point's
 * position:
 * **a&prime;**<sub>_x_</sub> = matrix[0] &#x22c5; **a**<sub>_x_</sub> + matrix[4] &#x22c5; **a**<sub>_y_</sub> + matrix[8] &#x22c5; **a**<sub>_z_</sub> + matrix[12] &#x22c5; **a**<sub>_w_</sub>
 * **a&prime;**<sub>_y_</sub> = matrix[1] &#x22c5; **a**<sub>_x_</sub> + matrix[5] &#x22c5; **a**<sub>_y_</sub> + matrix[9] &#x22c5; **a**<sub>_z_</sub> + matrix[13] &#x22c5; **a**<sub>_w_</sub>
 * **a&prime;**<sub>_z_</sub> = matrix[2] &#x22c5; **a**<sub>_x_</sub> + matrix[6] &#x22c5; **a**<sub>_y_</sub> + matrix[10] &#x22c5; **a**<sub>_z_</sub> + matrix[14] &#x22c5; **a**<sub>_w_</sub>
 * **a&prime;**<sub>_w_</sub> = matrix[3] &#x22c5; **a**<sub>_x_</sub> + matrix[7] &#x22c5; **a**<sub>_y_</sub> + matrix[11] &#x22c5; **a**<sub>_z_</sub> + matrix[15] &#x22c5; **a**<sub>_w_</sub>
 * For more on why **a&prime;**<sub>_w_</sub> appears here, see **"Why a 4 &times; 4 Matrix?"**, earlier. In each formula that follows, **a**<sub>_w_</sub> is assumed to be 1 (indicating a conventional 3D point).
 * * Scaling.** Scaling changes an object's size.
 * To create a scaling matrix, use [MathUtil.mat4scaled()]{@link MathUtil.mat4scaled},
 * and specify the scaling factors for the x-, y-, and z-axes. Each point is multiplied by the scaling
 * factors to change the object's size. For example, a Y-factor of 2 doubles an object's height.
 * To multiply an existing matrix by a scaling, use
 * [MathUtil.mat4scale()]{@link MathUtil.mat4scale}. This will put the scaling
 * before the other transformations.
 * Scaling uses the 1st, 6th, and 11th elements of the matrix as seen here:
 * <math>
 * <mfenced open="[" close="]">
 * <mtable>
 * <mtr>
 * <mtd><mi>sx</mi></mtd>
 * <mtd><mn>0</mn></mtd>
 * <mtd><mn>0</mn></mtd>
 * <mtd><mn>0</mn></mtd>
 * </mtr>
 * <mtr>
 * <mtd><mn>0</mn></mtd>
 * <mtd><mi>sy</mi></mtd>
 * <mtd><mn>0</mn></mtd>
 * <mtd><mn>0</mn></mtd>
 * </mtr>
 * <mtr>
 * <mtd><mn>0</mn></mtd>
 * <mtd><mn>0</mn></mtd>
 * <mtd><mi>sz</mi></mtd>
 * <mtd><mn>0</mn></mtd>
 * </mtr>
 * <mtr>
 * <mtd><mi>0</mi></mtd>
 * <mtd><mi>0</mi></mtd>
 * <mtd><mi>0</mi></mtd>
 * <mtd><mn>1</mn></mtd>
 * </mtr>
 * </mtable>
 * </mfenced>
 * </math>
 * where the x-coordinate is multiplied by `sx`, the y-coordinate is multiplied by `sy`, and
 * the z-coordinate is multiplied by `sz`.
 * The scaling formula would look like:
 * **a&prime;**<sub>_x_</sub> = sx &#x22c5; **a**<sub>_x_</sub> + 0 &#x22c5; **a**<sub>_y_</sub> + 0 &#x22c5; **a**<sub>_z_</sub> + 0
 * **a&prime;**<sub>_y_</sub> = 0 &#x22c5; **a**<sub>_x_</sub> + sy &#x22c5; **a**<sub>_y_</sub> + 0 &#x22c5; **a**<sub>_z_</sub> + 0
 * **a&prime;**<sub>_z_</sub> = 0 &#x22c5; **a**<sub>_x_</sub> + 0 &#x22c5; **a**<sub>_y_</sub> + sz &#x22c5; **a**<sub>_z_</sub> + 0
 * **a&prime;**<sub>_w_</sub> = 0 &#x22c5; **a**<sub>_x_</sub> + 0 &#x22c5; **a**<sub>_y_</sub> + 0 &#x22c5; **a**<sub>_z_</sub> + 1 = 1
 * For example, we multiply the input x by `sx` to get the output x. If `sx` is 1, x
 * remains unchanged. Likewise for y (`sy`) and z (`sz`).
 * If `sx`, `sy`, or `sz` is -1, that coordinate is _reflected_ along the corresponding axis.
 * If `sx`, `sy`, and `sz` are all 1, we have an _identity matrix_, where the input vector
 * is equal to the output vector.
 * When the transformed X, Y, or z-axis has a length other than 1, the coordinate
 * system will be scaled up or down along that axis. The scalings given
 * here will scale the lengths of the corresponding axes. For example,
 * if `sx` is 2, the x-axis will be (2, 0, 0) and thus have a length of 2.
 * **Translation.** A translation is a shifting of an object's position.
 * To create a translation matrix, use [MathUtil.mat4translated()]{@link MathUtil.mat4translated},
 * and specify the X-offset, the Y-offset, and the Z-offset. For example, an X-offset of 1 moves
 * an object 1 unit to the right, and a Y offset of -1 moves it 1 unit down.
 * To multiply an existing matrix by a translation, use
 * [MathUtil.mat4translate()]{@link MathUtil.mat4translate}. This will put the translation
 * before the other transformations. In a transformation matrix,
 * translation effectively occurs after all other transformations such as scaling and rotation.
 * It uses the 13th, 14th, and 15th elements of the matrix as seen here:
 * <math>
 * <mfenced open="[" close="]">
 * <mtable>
 * <mtr>
 * <mtd><mn>1</mn></mtd>
 * <mtd><mn>0</mn></mtd>
 * <mtd><mn>0</mn></mtd>
 * <mtd><mn>tx</mn></mtd>
 * </mtr>
 * <mtr>
 * <mtd><mn>0</mn></mtd>
 * <mtd><mn>1</mn></mtd>
 * <mtd><mn>0</mn></mtd>
 * <mtd><mn>ty</mn></mtd>
 * </mtr>
 * <mtr>
 * <mtd><mn>0</mn></mtd>
 * <mtd><mn>0</mn></mtd>
 * <mtd><mn>1</mn></mtd>
 * <mtd><mn>tz</mn></mtd>
 * </mtr>
 * <mtr>
 * <mtd><mi>0</mi></mtd>
 * <mtd><mi>0</mi></mtd>
 * <mtd><mi>0</mi></mtd>
 * <mtd><mn>1</mn></mtd>
 * </mtr>
 * </mtable>
 * </mfenced>
 * </math>
 * where `tx` is added to the x-coordinate, `ty` is added to the y-coordinate, and
 * `tz` is added to the z-coordinate. The transformation formulas would look like:
 * **a&prime;**<sub>_x_</sub> = 1 &#x22c5; **a**<sub>_x_</sub> + 0 &#x22c5; **a**<sub>_y_</sub> + 0 &#x22c5; **a**<sub>_z_</sub> + tx
 * **a&prime;**<sub>_y_</sub> = 0 &#x22c5; **a**<sub>_x_</sub> + 1 &#x22c5; **a**<sub>_y_</sub> + 0 &#x22c5; **a**<sub>_z_</sub> + ty
 * **a&prime;**<sub>_z_</sub> = 0 &#x22c5; **a**<sub>_x_</sub> + 0 &#x22c5; **a**<sub>_y_</sub> + 1 &#x22c5; **a**<sub>_z_</sub> + tz
 * **a&prime;**<sub>_w_</sub> = 0 &#x22c5; **a**<sub>_x_</sub> + 0 &#x22c5; **a**<sub>_y_</sub> + 0 &#x22c5; **a**<sub>_z_</sub> + 1 = 1
 * For example, we add the input x and `tx` to get the output x. If `tx` is 0, x
 * remains unchanged. Likewise for y (`ty`) and z (`tz`).
 * *Rotation.** Rotation changes an object's orientation.
 * To create a rotation matrix, use [MathUtil.mat4rotated()]{@link MathUtil.mat4rotated},
 * and specify the angle (in degrees) to rotate, and the [**axis of rotation**](#Axis_of_Rotation). For example:
 * Specifying `(45, [1, 0, 0])` means a 45-degree rotation of the point around the x-axis.
 * Specifying `(80, [0, 2, 3])` means a 45-degree rotation of the point around the axis that
 * starts at the origin (0, 0, 0) and points toward the point (0, 2, 3).
 * When describing an axis of rotation, <code>[1, 0, 0]</code> is the x-axis,
 * <code>[0, 1, 0]</code> is the y-axis, and <code>[0, 0, 1]</code> is the z-axis.
 * To multiply an existing matrix by a rotation, use
 * [MathUtil.mat4rotate()]{@link MathUtil.mat4rotate}. This will put the rotation
 * before the other transformations.
 * Given an angle of rotation, &theta;,
 * the transformation matrix for rotating 3D points is as follows. (For a list of common
 * sines and cosines, see the end of this section.)
 * <figure>
 * <math>
 * <mfenced open="[" close="]">
 * <mtable>
 * <mtr>
 * <mtd><mn>1</mn></mtd>
 * <mtd><mn>0</mn></mtd>
 * <mtd><mn>0</mn></mtd>
 * <mtd><mn>0</mn></mtd>
 * </mtr>
 * <mtr>
 * <mtd><mn>0</mn></mtd>
 * <mtd><mi>cos</mi><mi>&theta;</mi></mtd>
 * <mtd><mo>-</mo><mi>sin</mi><mi>&theta;</mi></mtd>
 * <mtd><mn>0</mn></mtd>
 * </mtr>
 * <mtr>
 * <mtd><mn>0</mn></mtd>
 * <mtd><mi>sin</mi><mi>&theta;</mi></mtd>
 * <mtd><mi>cos</mi><mi>&theta;</mi></mtd>
 * <mtd><mn>0</mn></mtd>
 * </mtr>
 * <mtr>
 * <mtd><mi>0</mi></mtd>
 * <mtd><mi>0</mi></mtd>
 * <mtd><mi>0</mi></mtd>
 * <mtd><mn>1</mn></mtd>
 * </mtr>
 * </mtable>
 * </mfenced>
 * </math>
 * <figcaption>Rotation about the x-axis.</figcaption></figure>
 * <figure>
 * <math>
 * <mfenced open="[" close="]">
 * <mtable>
 * <mtr>
 * <mtd><mi>cos</mi><mi>&theta;</mi></mtd>
 * <mtd><mn>0</mn></mtd>
 * <mtd><mi>sin</mi><mi>&theta;</mi></mtd>
 * <mtd><mn>0</mn></mtd>
 * </mtr>
 * <mtr>
 * <mtd><mn>0</mn></mtd>
 * <mtd><mn>1</mn></mtd>
 * <mtd><mn>0</mn></mtd>
 * <mtd><mn>0</mn></mtd>
 * </mtr>
 * <mtr>
 * <mtd><mo>-</mo><mi>sin</mi><mi>&theta;</mi></mtd>
 * <mtd><mn>0</mn></mtd>
 * <mtd><mi>cos</mi><mi>&theta;</mi></mtd>
 * <mtd><mn>0</mn></mtd>
 * </mtr>
 * <mtr>
 * <mtd><mi>0</mi></mtd>
 * <mtd><mi>0</mi></mtd>
 * <mtd><mi>0</mi></mtd>
 * <mtd><mn>1</mn></mtd>
 * </mtr>
 * </mtable>
 * </mfenced>
 * </math>
 * <figcaption>Rotation about the y-axis.</figcaption></figure>
 * <figure>
 * <math>
 * <mfenced open="[" close="]">
 * <mtable>
 * <mtr>
 * <mtd><mi>cos</mi><mi>&theta;</mi></mtd>
 * <mtd><mo>-</mo><mi>sin</mi><mi>&theta;</mi></mtd>
 * <mtd><mn>0</mn></mtd>
 * <mtd><mn>0</mn></mtd>
 * </mtr>
 * <mtr>
 * <mtd><mi>sin</mi><mi>&theta;</mi></mtd>
 * <mtd><mi>cos</mi><mi>&theta;</mi></mtd>
 * <mtd><mn>0</mn></mtd>
 * <mtd><mn>0</mn></mtd>
 * </mtr>
 * <mtr>
 * <mtd><mn>0</mn></mtd>
 * <mtd><mn>0</mn></mtd>
 * <mtd><mn>1</mn></mtd>
 * <mtd><mn>0</mn></mtd>
 * </mtr>
 * <mtr>
 * <mtd><mi>0</mi></mtd>
 * <mtd><mi>0</mi></mtd>
 * <mtd><mi>0</mi></mtd>
 * <mtd><mn>1</mn></mtd>
 * </mtr>
 * </mtable>
 * </mfenced>
 * </math>
 * <figcaption>Rotation about the z-axis.</figcaption></figure>
 * Note that:
 * When we rotate a point about the x-axis, the x-coordinate is unchanged
 * and the y- and z-coordinates are adjusted in the rotation. For rotations about the
 * y-axis or the z-axis, the Y or z-coordinate, respectively, is likewise unchanged.
 * If the axis of rotation points backward from the "eye", positive rotations mean
 * counterclockwise rotation in right-handed coordinate systems. For example,
 * 60 degrees about the axis means
 * 60 degrees counterclockwise, and negative 60 degrees means 60 degrees
 * clockwise.
 * Rotating a point around an arbitrary axis of rotation is more complicated to describe.
 * When describing an axis of rotation, <code>[1, 0, 0]</code> is the x-axis,
 * <code>[0, 1, 0]</code> is the y-axis, and <code>[0, 0, 1]</code> is the z-axis.
 * See [**"Rotation example"**](#Rotation_Example) for an illustration of a rotation
 * transformation.
 * Related functions:
 * [MathUtil.mat4rotated()]{@link MathUtil.mat4rotated} -
 * Returns a rotation matrix
 * [MathUtil.mat4rotate()]{@link MathUtil.mat4rotate} -
 * Multiplies a matrix by a translation.
 * A list of common sines and cosines follows. Values
 * shown with three decimal places are approximate.
 * | &nbsp; | 0&deg;| 22.5&deg;| 30&deg;| 45&deg;| 60&deg;| 67.5&deg;| 90&deg;| 112.5&deg;| 120&deg;| 135&deg;| 150&deg;| 157.5&deg;| 180&deg;|
 * -------|---|------|----|----|----|------|----|------|-----|-----|-----|-------|-----|
 * | sin | 0 | 0.383 | 0.5 | 0.707 | 0.866 | 0.924 | 1 | 0.924 | 0.866 | 0.707 | 0.5 | 0.383 | 0 |
 * | cos | 1 | 0.924 | 0.866 | 0.707 | 0.5 | 0.383 | 0 | -0.383 | -0.5 | -0.707 | -0.866 | -0.924 | -1 |
 * | &nbsp; | 180&deg;| 202.5&deg;| 210&deg;| 225&deg;| 240&deg;| 247.5&deg;| 270&deg;| 292.5&deg;| 300&deg;| 315&deg;| 330&deg;| 337.5&deg;| 360&deg;|
 * -------|---|------|----|----|----|------|----|------|-----|-----|-----|-------|-----|
 * | sin | 0 | -0.383 | -0.5 | -0.707 | -0.866 | -0.924 | -1 | -0.924 | -0.866 | -0.707 | -0.5 | -0.383 | 0 |
 * | cos | -1 | -0.924 | -0.866 | -0.707 | -0.5 | -0.383 | 0 | 0.383 | 0.5 | 0.707 | 0.866 | 0.924 | 1 |
 * <a id=Matrix_Multiplication></a>
 * ### Matrix Multiplication
 * The order in which you do transforms is important. In general, scaling then translating is
 * not the same as translating then scaling. Assuming your geometry is centered at the origin
 * (0, 0, 0), you should create a transformation in this order:
 * Call [`MathUtil.mat4identity()`]{@link MathUtil.mat4identity}, creating a matrix without a transformation.
 * Do your translations if needed, using [`mat4translate()`]{@link MathUtil.mat4translate}.
 * Do your rotations if needed, using [`mat4rotate()`]{@link MathUtil.mat4rotate}.
 * Do your scalings if needed, using [`mat4scale()`]{@link MathUtil.mat4scale}.
 * This way, the scalings and rotations will affect the object while it's still centered, and
 * before the translations (shifts) take place.
 * You can also multiply transforms using [MathUtil.mat4multiply()]{@link MathUtil.mat4multiply}.
 * This takes two matrices and returns one combined matrix. The combined matrix will have the effect
 * of doing the second matrix's transform, then the first matrix's transform.
 * When two matrices are multiplied, the combined matrix will be such
 * that the transformations they describe happen in reverse
 * order. For example, if the first matrix (input matrix) describes a translation and the second
 * matrix describes a scaling, the multiplied matrix will
 * describe the effect of scaling then translation.
 * Matrix multiplication is not commutative; the order of multiplying matrices is important.
 * To get an insight of how matrix multiplication works, treat the second matrix as a group
 * of column vectors (with the same number of rows as the number of columns in the
 * first matrix). Multiplying the two matrices transforms these vectors to new ones in the
 * same way as if the column vectors were transformed individually. (This also explains why there can
 * be one or more column vectors in the second matrix and not just four in the case of a 4 &times; 4 matrix,
 * and also why transforming a 4-element column vector is the same as multiplying a 4 &times; 4 matrix by a
 * matrix with one column and four rows.*)
 * This insight reveals a practical use of matrix multiplication: transforming four 4-element
 * vectors at once using a single matrix operation involving two 4 &times; 4 matrices. After the
 * matrix multiplication, each of the transformed vectors will be contained in one of the four columns
 * of the output matrix.
 * The methods `mat4multiply`, `mat4scale`, `mat4scaleInPlace`, `mat4translate`, and
 * mat4rotate involve multiplying 4 &times; 4 matrices.
 * Related functions:
 * [MathUtil.mat4multiply()]{@link MathUtil.mat4multiply} -
 * Multiplies two matrices
 * \* Reading the [**tutorial by Dmitry Sokolov**](https://github.com/ssloy/tinyrenderer/wiki/Lesson-4:-Perspective-projection)
 * led me to this highly useful insight.
 * *Projective transformations.** In all the transformations described earlier, the last row in the transformation matrix is
 * (0, 0, 0, 1). (Such transformations are called _affine transformations_, those that
 * keep straight lines straight and parallel lines parallel.) However, this is not the case for
 * some transformations in the `MathUtil` class.
 * Transformations that don't necessarily preserve parallelism of lines are called _projective transformations_.
 * An NxN matrix can describe certain projective transformations if it has one more row and one more column
 * than the number of dimensions. For example, a 4 &times; 4 matrix can describe 3D projective transformations
 * in the form of linear transformations on homogeneous coordinates (see
 * [**"Why a 4 &times; 4 Matrix?"**](#Why_a_4x4_Matrix)). For a 3D projective transformation, the last row
 * in the matrix is not necessarily (0, 0, 0, 1).
 * One example of a projective transformation is found in a _perspective projection_ matrix,
 * as returned by {@link MathUtil.mat4perspective} or {@link MathUtil.mat4frustum}. When a 4-element vector is transformed with this matrix, its W component is generated by setting it to the negative z-coordinate in _eye space_, or more specifically, as follows:
 * **a&prime;**<sub>_w_</sub> = 0 &#x22c5; **a**<sub>_x_</sub> + 0 &#x22c5; **a**<sub>_y_</sub> + -1 &#x22c5; **a**<sub>_z_</sub> + 0
 * For more on perspective projections, see [_The "Camera" and Geometric Transforms_]{@tutorial camera}.
 * Related functions:
 * [MathUtil.mat4frustum()]{@link MathUtil.mat4frustum} -
 * Returns a frustum matrix
 * [MathUtil.mat4perspective()]{@link MathUtil.mat4perspective} -
 * Returns a field-of-view perspective matrix
 * ## Rotation Example
 * As an example, say we rotate 60 degrees about the x-axis (`mat4rotated(60, 1, 0, 0)`,
 * &theta; = 60&deg;). First, we find the rotation formula for the x-axis:
 * **a&prime;**<sub>_x_</sub> = 1 &#x22c5; **a**<sub>_x_</sub> + 0 &#x22c5; **a**<sub>_y_</sub> + 0 &#x22c5; **a**<sub>_z_</sub> + 0
 * **a&prime;**<sub>_y_</sub> = 0 &#x22c5; **a**<sub>_x_</sub> + (cos &theta;) &#x22c5; **a**<sub>_y_</sub> + -(sin &theta;) &#x22c5; **a**<sub>_z_</sub> + 0
 * **a&prime;**<sub>_z_</sub> = 0 &#x22c5; **a**<sub>_x_</sub> + (sin &theta;) &#x22c5; **a**<sub>_y_</sub> + (cos &theta;) &#x22c5; **a**<sub>_z_</sub> + 0
 * **a&prime;**<sub>_w_</sub> = 0 &#x22c5; **a**<sub>_x_</sub> + 0 &#x22c5; **a**<sub>_y_</sub> + 0 &#x22c5; **a**<sub>_z_</sub> + 1 = 1
 * We calculate <i>cos &theta;</i> as 0.5 and <i>sin &theta;</i> as about 0.866025.
 * We plug those numbers into the rotation formula to get a formula for rotating a
 * point 60 degrees about the x-axis.
 * **a&prime;**<sub>_x_</sub> = 1 &#x22c5; **a**<sub>_x_</sub> + 0 &#x22c5; **a**<sub>_y_</sub> + 0 &#x22c5; **a**<sub>_z_</sub> + 0 = **a**<sub>_x_</sub>
 * **a&prime;**<sub>_y_</sub> ~= 0 &#x22c5; **a**<sub>_x_</sub> + 0.5 &#x22c5; **a**<sub>_y_</sub> + -0.866025 &#x22c5; **a**<sub>_z_</sub> + 0
 * **a&prime;**<sub>_z_</sub> ~= 0 &#x22c5; **a**<sub>_x_</sub> + 0.866025 &#x22c5; **a**<sub>_y_</sub> + 0.5 &#x22c5; **a**<sub>_z_</sub> + 0
 * **a&prime;**<sub>_w_</sub> = 0 &#x22c5; **a**<sub>_x_</sub> + 0 &#x22c5; **a**<sub>_y_</sub> + 0 &#x22c5; **a**<sub>_z_</sub> + 1 = 1
 * If a point is located at (10, 20, 30), the rotated point would now be:
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
 * So the rotated point would be at about (10, -15.98075, 32.3205).
 * ## Describing Rotations
 * Rotations in 3D space can be described in many ways, including
 * quaternions, Tait-Bryan angles, and an angle and axis.
 * <a id=Axis_of_Rotation></a>
 * ### Axis of Rotation
 * A rotation of vectors or points can be described using an _angle_
 * and an _axis of rotation_, for example, in the {@link MathUtil.mat4rotate} method.
 * An axis of rotation is a vector pointing in a certain direction. When a point (or vector)
 * is rotated at any angle around this axis, the new point (or vector) will lie
 * on the same plane as the previous point. The axis of rotation describes
 * a vector that is perpendicular to that plane's surface (the plane's _normal_).
 * Here are examples of an axis of rotation.
 * The x-axis of rotation (upward or downward turn) is (1, 0, 0).
 * The y-axis of rotation (leftward or rightward turn) is (0, 1, 0).
 * The z-axis of rotation (side-by-side sway) is (0, 0, 1).
 * While the axis of rotation points backward from the "eye", if the angle's value
 * is positive and the [**coordinate system**](#Coordinate_Systems) is...
 * ...right handed, then the angle runs counterclockwise.
 * ...left handed, then the angle runs clockwise.
 * While the axis of rotation points backward from the "eye", if the angle's value
 * is negative, then the angle runs in the opposite direction.
 * Vectors that point in the same direction (for example, vectors (1, 0, 0) and (2, 0, 0))
 * describe the same axis of rotation.
 * Unless stated otherwise, an axis of rotation passed to a `MathUtil`
 * method need not be a [**unit vector**](#Unit_Vectors).
 * ### Quaternions
 * A quaternion is a 4-element vector that can describe a 3D rotation. Functions dealing with quaternions begin with "quat". Functions that generate quaternions include: {@link MathUtil.quatIdentity}, which generates a quaternion describing an
 * absence of rotations; {@link MathUtil.quatFromVectors}, which generates a quaternion describing
 * a rotation from one vector to another; {@link MathUtil.quatFromMat4}, which generates a quaternion from a [**4 &times; 4 matrix**](#Matrices); {@link MathUtil.quatFromAxisAngle}, which generates a quaternion from an angle and [**axis of rotation**](#Axis_of_Rotation); {@link MathUtil.quatFromTaitBryan}, which generates a quaternion from Tait-Bryan angles.
 * <a id=Using_Quaternions></a>
 * #### Using Quaternions
 * For best results when using quaternions:
 * - Store the rotation of each object as a single quaternion.
 * - As rotations occur each frame, convert the rotation (which may be
 * in pitch/yaw/roll or another form, depending on the input device) to a quaternion
 * (see [**"Generating Quaternions"**](#Generating_Quaternions)
 * and [multiply]{@link MathUtil.quatMultiply} that quaternion by the current
 * quaternion to get the object's new rotation.
 * - Normalize the rotation quaternion (using [`quatNormalize()`]{@link MathUtil.quatNormalize}
 * or [`quatNormalizeInPlace()`]{@link MathUtil.quatNormalizeInPlace})
 * every few frames. (Quaternions that describe a 3D rotation should be [**unit vectors**](#Unit_Vectors).)
 * <a id=Multiplying_Quaternions></a>
 * #### Multiplying Quaternions
 * When two quaternions are multiplied (for example, with {@MathUtil.quatMultiply}),
 * the result is a combined rotation in which the second rotation happens
 * before the first rotation (when applied in the global coordinate frame).
 * Like matrix multiplication, the order in which you multiply quaternions is important.
 * <a id=Tait_Bryan_angles></a>
 * ### Tait-Bryan angles
 * Pitch-yaw-roll angles (also called Tait-Bryan angles) describe three different rotations
 * of the same vector around three different axes, called the pitch, yaw, and roll axes
 * (or the X, Y, z-axes, respectively), which occur one after the other. However:
 * There are multiple conventions for pitch-yaw-roll angles, including the order of
 * rotations (for example: pitch-roll-yaw, roll-pitch-yaw), and whether the rotations occur
 * around the object's original axes ("extrinsic") or its new axes ("intrinsic").
 * Rotations are multiplied like in quaternions and matrices, so the order the rotations
 * occur is important. For example, a 30-degree pitch followed by a 20-degree
 * roll is not the same as a 20-degree pitch followed by a 30-degree roll.
 * Pitch-yaw-roll angles can cause a problem called "gimbal lock", in which a rotation along
 * one axis (say, a pitch) can cause a vector to be parallel to another axis (say, the roll
 * axis), so that a rotation along that axis will do nothing.
 * Related functions:
 * [MathUtil.quatFromTaitBryan()]{@link MathUtil.quatFromTaitBryan} -
 * Converts from Tait-Bryan angles to a quaternion
 * <a id=4 &times; 4_Matrices></a>
 * ### 4 &times; 4 Matrices
 * A 4 &times; 4 matrix can describe a 3D vector rotation; see [**"Rotation", earlier**](#Rotation).
 * <a id=Planes></a>
 * ## Planes
 * A 4-element array can describe a plane in the following manner:
 * The 4 elements, labeled A, B, C, and D in that order, describe a plane
 * whose points satisfy the equation&mdash;
 * Ax + By + Cz + D = 0
 * where x, y, and z are the
 * coordinates of any point lying on the plane.
 * A, B, and C are
 * the X, Y, and Z components of the plane's normal vector.
 * D is the signed distance from the plane to the origin (0,0,0).
 * It's positive if the plane's normal points toward the origin, and
 * negative if it points away from the origin.
 * D is the negative dot product of the
 * plane's normal and any point on the plane.
 * There is one method that deals with planes:
 * {@link MathUtil.planeNormalizeInPlace} - Converts the plane to a form in which
 * its normal has a length of 1.
 * <a id=Boxes></a>
 * ## Boxes
 * An array of six numbers can describe an axis-aligned bounding box (AABB).
 * If it does, the first three numbers are the box's minimum x-, y-, and z-coordinates,
 * and the last three numbers are the box's maximum x-, y-, and z-coordinates.
 * If a minimum coordinate is greater than a maximum coordinate, then the
 * box is considered empty.
 * Methods that deal with boxes include:
 * {@link MathUtil.boxCenter} - Finds a box's center.
 * {@link MathUtil.boxDimensions} - Finds a box's dimensions.
 * {@link MathUtil.boxIsEmpty} - Determines whether a box is empty.
 * <a id=Coordinate_Systems></a>
 * ## Coordinate Systems
 * There are two conventions of 3D coordinate systems, left-handed and
 * right-handed:
 * In a _left-handed_ coordinate system, the positive z-axis points _forward from the "eye"_ whenever the positive x-axis points to the right and the positive y-axis points up.
 * In a _right-handed_ coordinate system, the positive z-axis points _backward from the "eye"_ whenever the positive x-axis points to the right and the positive y-axis points up.
 * To show this more visually, point one hand's thumb to your right and
 * its index finger up, and bend the other three fingers halfway down. In a
 * coordinate system named after that hand (left-handed or
 * right-handed), if the positive x-axis points in the thumb's
 * direction and the positive y-axis points in the index finger's direction, the z-axis will
 * point in the direction the other three fingers point.
 * As used here, the z-axis is the [cross product]{@link MathUtil.vec3cross}
 * of two perpendicular axes, namely the x-axis and the y-axis, in that order.
 * Which of the X, Y, or z-axes is the right, up, or forward axis is
 * arbitrary; for example, some conventions may have the z-axis, rather than Y,
 * be the up axis. Therefore, these three axes are defined here to avoid
 * confusion.
 * <a id=Differences_in_Behavior></a>
 * ### Differences in Behavior
 * <a id=Projection_and_view_matrices></a>
 * #### Projection and view matrices
 * The difference between a left-handed and right-handed coordinate system
 * affects how 3D points are transformed, mainly in the projection and view
 * matrices. The projection and view matrices returned by {@link Math}
 * matrix methods are designed for a right-handed coordinate system. Their
 * documentation describes how to adjust them for a left-handed coordinate system.
 * <a id=Rotation_angles_such_as_used_in_mat4rotate_and_quatRotate></a>
 * #### Rotation angles (such as used in `mat4rotate` and `quatRotate`)
 * While the [**axis of rotation**](#Axis_of_Rotation) points backward from the "eye", if the angle's value
 * is positive and the [**coordinate system**](#Coordinate_Systems) is...
 * ...right handed, then the angle runs counterclockwise.
 * ...left handed, then the angle runs clockwise.
 * While the axis of rotation points backward from the "eye", if the angle's value
 * is negative, then the angle runs in the opposite direction.
 * <a id=Cross_product_vec3cross_and_normals></a>
 * #### Cross product (`vec3cross`) and normals
 * Given a triangle formed by...
 * - points (A minus C), (B minus C), and C, in that order, or
 * - points A, B, and (0, 0, 0), in that order,
 * the [cross product]{@link MathUtil.vec3cross} of the first point with the second,
 * in that order, is a _normal_ of that triangle (a vector that's perpendicular to the triangle's surface).
 * While this particular normal points backward from the "eye", the triangle's vertices
 * run in a counterclockwise path for right-handed coordinate systems, or a clockwise path
 * for left-handed systems. (In general, there are two possible choices for normals, which each
 * point in opposite directions.)
 * <a id=Winding_and_face_classification></a>
 * ### Winding and face classification
 * A two-dimensional triangle has counterclockwise _winding_ if its vertices are ordered in a counterclockwise path from the first to second to third to first vertex. Otherwise, it has clockwise winding. If the triangle is in 3D space, it's first transformed into 2D _window coordinates_ before its winding is found. (Window coordinates roughly correspond to screen pixels.)
 * By default, in the WebGL pipeline, triangles with counterclockwise winding are _front faces_, and
 * other triangles are _back faces_.
 * <a id=Finding_a_triangle_s_winding></a>
 * #### Finding a triangle's winding
 * To find a triangle's winding, do the following calculation (X1, X2, X3 and Y1, Y2, Y3 are the window coordinates of its vertices). Note that half of the result will be the triangle's signed area.
 * (X3 - X1) * (Y3 - Y2) - (X3 - X2) * (Y3 - Y1)
 * If the result is positive, and the window space x-axis points right and the positive y-axis points...
 * ...up (which is the case in WebGL), then the triangle
 * has counterclockwise winding.
 * ...down, then the triangle has clockwise winding.
 * If the result is negative, then the triangle has the opposite winding.
 * @class
 */
const MathUtil = {
/** @ignore */
  "_frustumPoints":function(frustum) {
    const p0 = frustum[0];
    const p1 = frustum[1];
    const p2 = frustum[2];
    const p3 = frustum[3];
    const p4 = frustum[4];
    const p5 = frustum[5];
    // left-top-near, left-bottom-near, right-top-near, ..., right-bottom-far
    const ret = [];
    const t1 = p2[1] * p4[2];
    const t2 = p2[2] * p4[1];
    const t3 = t1 - t2;
    const t4 = p2[2] * p4[0];
    const t5 = p2[0] * p4[2];
    const t6 = t4 - t5;
    const t7 = p2[0] * p4[1];
    const t8 = p2[1] * p4[0];
    const t9 = t7 - t8;
    const t10 = p0[2] * p2[0];
    const t11 = p0[0] * p2[2];
    const t12 = p0[0] * p2[1];
    const t13 = p0[1] * p2[0];
    const t14 = p4[2] * p0[0];
    const t15 = p4[0] * p0[2];
    const t16 = p4[0] * p0[1];
    const t17 = p4[1] * p0[0];
    const t18 = 1.0 / (p0[0] * t3 + p0[1] * t6 + p0[2] * t9);
    const t19 = p4[1] * p0[2];
    const t20 = p4[2] * p0[1];
    const t21 = p0[1] * p2[2];
    const t22 = p0[2] * p2[1];
    const t23 = -p0[3];
    const t24 = -p2[3];
    const t25 = -p4[3];
    ret[0] = (t3 * t23 + (t19 - t20) * t24 + (t21 - t22) * t25) * t18;
    ret[1] = (t6 * t23 + (t14 - t15) * t24 + (t10 - t11) * t25) * t18;
    ret[2] = (t9 * t23 + (t16 - t17) * t24 + (t12 - t13) * t25) * t18;
    const t26 = p3[1] * p4[2];
    const t27 = p3[2] * p4[1];
    const t28 = t26 - t27;
    const t29 = p3[2] * p4[0];
    const t30 = p3[0] * p4[2];
    const t31 = t29 - t30;
    const t32 = p3[0] * p4[1];
    const t33 = p3[1] * p4[0];
    const t34 = t32 - t33;
    const t35 = p0[2] * p3[0];
    const t36 = p0[0] * p3[2];
    const t37 = p0[0] * p3[1];
    const t38 = p0[1] * p3[0];
    const t39 = 1.0 / (p0[0] * t28 + p0[1] * t31 + p0[2] * t34);
    const t40 = p0[1] * p3[2];
    const t41 = p0[2] * p3[1];
    const t42 = -p3[3];
    ret[3] = (t28 * t23 + (t19 - t20) * t42 + (t40 - t41) * t25) * t39;
    ret[4] = (t31 * t23 + (t14 - t15) * t42 + (t35 - t36) * t25) * t39;
    ret[5] = (t34 * t23 + (t16 - t17) * t42 + (t37 - t38) * t25) * t39;
    const t43 = t1 - t2;
    const t44 = t4 - t5;
    const t45 = t7 - t8;
    const t46 = p1[2] * p2[0];
    const t47 = p1[0] * p2[2];
    const t48 = p1[0] * p2[1];
    const t49 = p1[1] * p2[0];
    const t50 = p4[2] * p1[0];
    const t51 = p4[0] * p1[2];
    const t52 = p4[0] * p1[1];
    const t53 = p4[1] * p1[0];
    const t54 = 1.0 / (p1[0] * t43 + p1[1] * t44 + p1[2] * t45);
    const t55 = p4[1] * p1[2];
    const t56 = p4[2] * p1[1];
    const t57 = p1[1] * p2[2];
    const t58 = p1[2] * p2[1];
    const t59 = -p1[3];
    ret[6] = (t43 * t59 + (t55 - t56) * t24 + (t57 - t58) * t25) * t54;
    ret[7] = (t44 * t59 + (t50 - t51) * t24 + (t46 - t47) * t25) * t54;
    ret[8] = (t45 * t59 + (t52 - t53) * t24 + (t48 - t49) * t25) * t54;
    const t60 = t26 - t27;
    const t61 = t29 - t30;
    const t62 = t32 - t33;
    const t63 = p1[2] * p3[0];
    const t64 = p1[0] * p3[2];
    const t65 = p1[0] * p3[1];
    const t66 = p1[1] * p3[0];
    const t67 = 1.0 / (p1[0] * t60 + p1[1] * t61 + p1[2] * t62);
    const t68 = p1[1] * p3[2];
    const t69 = p1[2] * p3[1];
    ret[9] = (t60 * t59 + (t55 - t56) * t42 + (t68 - t69) * t25) * t67;
    ret[10] = (t61 * t59 + (t50 - t51) * t42 + (t63 - t64) * t25) * t67;
    ret[11] = (t62 * t59 + (t52 - t53) * t42 + (t65 - t66) * t25) * t67;
    const t70 = p2[1] * p5[2];
    const t71 = p2[2] * p5[1];
    const t72 = t70 - t71;
    const t73 = p2[2] * p5[0];
    const t74 = p2[0] * p5[2];
    const t75 = t73 - t74;
    const t76 = p2[0] * p5[1];
    const t77 = p2[1] * p5[0];
    const t78 = t76 - t77;
    const t79 = p5[2] * p0[0];
    const t80 = p5[0] * p0[2];
    const t81 = p5[0] * p0[1];
    const t82 = p5[1] * p0[0];
    const t83 = 1.0 / (p0[0] * t72 + p0[1] * t75 + p0[2] * t78);
    const t84 = p5[1] * p0[2];
    const t85 = p5[2] * p0[1];
    const t86 = -p5[3];
    ret[12] = (t72 * t23 + (t84 - t85) * t24 + (t21 - t22) * t86) * t83;
    ret[13] = (t75 * t23 + (t79 - t80) * t24 + (t10 - t11) * t86) * t83;
    ret[14] = (t78 * t23 + (t81 - t82) * t24 + (t12 - t13) * t86) * t83;
    const t87 = p3[1] * p5[2];
    const t88 = p3[2] * p5[1];
    const t89 = t87 - t88;
    const t90 = p3[2] * p5[0];
    const t91 = p3[0] * p5[2];
    const t92 = t90 - t91;
    const t93 = p3[0] * p5[1];
    const t94 = p3[1] * p5[0];
    const t95 = t93 - t94;
    const t96 = 1.0 / (p0[0] * t89 + p0[1] * t92 + p0[2] * t95);
    ret[15] = (t89 * t23 + (t84 - t85) * t42 + (t40 - t41) * t86) * t96;
    ret[16] = (t92 * t23 + (t79 - t80) * t42 + (t35 - t36) * t86) * t96;
    ret[17] = (t95 * t23 + (t81 - t82) * t42 + (t37 - t38) * t86) * t96;
    const t97 = t70 - t71;
    const t98 = t73 - t74;
    const t99 = t76 - t77;
    const t100 = p5[2] * p1[0];
    const t101 = p5[0] * p1[2];
    const t102 = p5[0] * p1[1];
    const t103 = p5[1] * p1[0];
    const t104 = 1.0 / (p1[0] * t97 + p1[1] * t98 + p1[2] * t99);
    const t105 = p5[1] * p1[2];
    const t106 = p5[2] * p1[1];
    ret[18] = (t97 * t59 + (t105 - t106) * t24 + (t57 - t58) * t86) * t104;
    ret[19] = (t98 * t59 + (t100 - t101) * t24 + (t46 - t47) * t86) * t104;
    ret[20] = (t99 * t59 + (t102 - t103) * t24 + (t48 - t49) * t86) * t104;
    const t107 = t87 - t88;
    const t108 = t90 - t91;
    const t109 = t93 - t94;
    const t110 = 1.0 / (p1[0] * t107 + p1[1] * t108 + p1[2] * t109);
    ret[21] = (t107 * t59 + (t105 - t106) * t42 + (t68 - t69) * t86) * t110;
    ret[22] = (t108 * t59 + (t100 - t101) * t42 + (t63 - t64) * t86) * t110;
    ret[23] = (t109 * t59 + (t102 - t103) * t42 + (t65 - t66) * t86) * t110;
    return ret;
  },
  /**
   * Finds the center of a 3D bounding box.
   * @param {Array<number>} box An axis-aligned bounding
   * box, which is an array of six values.
   * The first three values are the smallest x-, y-, and z-coordinates,
   * and the last three values are the largest X, Y, and Z
   * coordinates.
   * @returns {Array<number>} A 3-element array containing the
   * x-, y-, and z-coordinates, respectively, of the bounding box's
   * center.
   */
  "boxCenter":function(box) {
    return [box[0] + (box[3] - box[0]) * 0.5,
      box[1] + (box[4] - box[1]) * 0.5,
      box[2] + (box[5] - box[2]) * 0.5];
  },
  /**
   * Finds the dimensions of a 3D bounding box. This is done by subtracting
   * the first three values of the given array with its last three values.
   * @param {Array<number>} box An axis-aligned bounding
   * box, which is an array of six values.
   * The first three values are the smallest x-, y-, and z-coordinates,
   * and the last three values are the largest X, Y, and Z
   * coordinates.
   * @returns {Array<number>} A 3-element array containing the
   * width, height, and depth of the bounding box, respectively. If
   * at least one of the minimum coordinates is greater than its
   * corresponding maximum coordinate, the array can contain
   * negative values.
   */
  "boxDimensions":function(box) {
    return [box[3] - box[0], box[4] - box[1], box[5] - box[2]];
  },
  /**
   * Determines whether a 3D bounding box is empty.
   * This is determined if the minimum coordinate
   * is larger than the corresponding maximum coordinate.
   * @param {Array<number>} box An axis-aligned bounding
   * box, which is an array of six values.
   * The first three values are the smallest x-, y-, and z-coordinates,
   * and the last three values are the largest X, Y, and Z
   * coordinates.
   * @returns {boolean} <code>true</code> if at least one
   * of the minimum coordinates is greater than its
   * corresponding maximum coordinate; otherwise, <code>false</code>.
   */
  "boxIsEmpty":function(box) {
    return box[0] > box[3] || box[1] > box[4] || box[2] > box[5];
  },
  /**
   * Converts a color from encoded sRGB to linear sRGB using the sRGB transfer function, and returns
   * a new vector with the result.<p>Linear RGB is linear because of its linear relationship of light emitted
   * by a surface of the given color.
   * @param {Array<number>} srgb A three- or four-element vector giving
   * the red, green, and blue components, in that order, of an sRGB color. The alpha component
   * is either the fourth element in the case of a four-element vector, or 1.0
   * in the case of a three-element vector. Each element in the vector ranges from 0 through 1.
   * @returns {Array<number>} A three-element vector giving
   * the red, green, and blue components, in that order, of the given color
   * in linear sRGB. The alpha component will be as specified
   * in the "srgb" parameter.
   */
  "colorToLinear":function(srgb) {
    return [
      srgb[0] <= 0.04045 ? srgb[0] / 12.92 : Math.pow((0.055 + srgb[0]) / 1.055, 2.4),
      srgb[1] <= 0.04045 ? srgb[1] / 12.92 : Math.pow((0.055 + srgb[1]) / 1.055, 2.4),
      srgb[2] <= 0.04045 ? srgb[2] / 12.92 : Math.pow((0.055 + srgb[2]) / 1.055, 2.4),
      srgb.length <= 3 ? 1.0 : srgb[3]];
  },
  /**
   * Converts a color from linear sRGB to encoded sRGB using the sRGB transfer function, and returns
   * a new vector with the result.<p>Linear RGB is linear because of its linear relationship of light emitted
   * by a surface of the given color.
   * @param {Array<number>} lin A three- or four-element vector giving
   * the red, green, and blue components, in that order, of a linear RGB color. The alpha component
   * is either the fourth element in the case of a four-element vector, or 1.0
   * in the case of a three-element vector. Each element in the vector ranges from 0 through 1.
   * @returns {Array<number>} lin A four-element vector giving
   * the red, green, blue, and alpha components, in that order, of the given color
   * in encoded sRGB. The alpha component will be as specified
   * in the "lin" parameter.
   */
  "colorTosRGB":function(lin) {
    return [
      lin[0] <= 0.0031308 ? 12.92 * lin[0] : Math.pow(lin[0], 1.0 / 2.4) * 1.055 - 0.055,
      lin[1] <= 0.0031308 ? 12.92 * lin[1] : Math.pow(lin[1], 1.0 / 2.4) * 1.055 - 0.055,
      lin[2] <= 0.0031308 ? 12.92 * lin[2] : Math.pow(lin[2], 1.0 / 2.4) * 1.055 - 0.055,
      lin.length <= 3 ? 1.0 : lin[3]];
  },
  /**
   * Determines whether an axis-aligned bounding box
   * is at least partially inside a view frustum.
   * @param {Array<Array<number>>} frustum An array of six
   * 4-element arrays representing the six clipping planes of the
   * view frustum. In order, they are the left, right, top,
   * bottom, near, and far clipping planes.
   * @param {Array<number>} box An axis-aligned bounding
   * box in world space, which is an array of six values.
   * The first three values are the smallest x-, y-, and z-coordinates,
   * and the last three values are the largest X, Y, and Z
   * coordinates.
   * @returns {boolean} <code>true</code> if the box
   * may be partially or totally
   * inside the frustum; <code>false</code> if the box is
   * definitely outside the frustum, or if the box is empty
   * (see "boxIsEmpty").
   */
  "frustumHasBox":function(frustum, box) {
    if(MathUtil.boxIsEmpty(box)) {
      return false;
    }
    let i;
    for (i = 0; i < 6; i++) {
      const plane = frustum[i];
      const p3 = plane[3];
      const p0b0 = plane[0] * box[0];
      const p2b2 = plane[2] * box[2];
      const p1b1 = plane[1] * box[1];
      if( p0b0 + p1b1 + p2b2 + p3 <= 0.0 &&
      plane[0] * box[3] + plane[1] * box[4] + plane[2] * box[5] + p3 <= 0.0 &&
      p0b0 + plane[1] * box[4] + p2b2 + p3 <= 0.0 &&
      p0b0 + plane[1] * box[4] + plane[2] * box[5] + p3 <= 0.0 &&
      p0b0 + p1b1 + plane[2] * box[5] + p3 <= 0.0 &&
      plane[0] * box[3] + plane[1] * box[4] + p2b2 + p3 <= 0.0 &&
      plane[0] * box[3] + p1b1 + p2b2 + p3 <= 0.0 &&
      plane[0] * box[3] + p1b1 + plane[2] * box[5] + p3 <= 0.0) {
        return false;
      }
    }
    // To increase robustness in frustum culling; see
    // <http://www.iquilezles.org/www/articles/frustumcorrect/frustumcorrect.htm>
    const pts = MathUtil._frustumPoints(frustum);

    for (i = 0; i < 3; i++) {
      const minval = box[i];
      if(pts[i] < minval && pts[3 + i] < minval && pts[6 + i] < minval &&
      pts[9 + i] < minval && pts[12 + i] < minval && pts[15 + i] < minval &&
    pts[18 + i] < minval && pts[21 + i] < minval) {
        return false;
      }
      const maxval = box[i + 3];
      if(pts[i] > maxval && pts[3 + i] > maxval && pts[6 + i] > maxval &&
      pts[9 + i] > maxval && pts[12 + i] > maxval && pts[15 + i] > maxval &&
    pts[18 + i] > maxval && pts[21 + i] > maxval) {
        return false;
      }
    }
    return true;
  },
  /**
   * Determines whether a point is
   * outside or inside a view frustum.
   * @param {Array<Array<number>>} frustum An array of six
   * 4-element arrays representing the six clipping planes of the
   * view frustum. In order, they are the left, right, top,
   * bottom, near, and far clipping planes.
   * @param {number} x The Xcoordinate of a point
   * in world space.
   * @param {number} y The Ycoordinate of a point
   * in world space.
   * @param {number} z The Zcoordinate of a point
   * in world space.
   * @returns {boolean} true if the point is inside;
   * otherwise false;
   */
  "frustumHasPoint":function(frustum, x, y, z) {
    let i;
    for (i = 0; i < 6; i++) {
      const d = frustum[i][0] * x + frustum[i][1] * y +
     frustum[i][2] * z + frustum[i][3];
      if(d <= 0)return false;
    }
    return true;
  },
  /**
   * Determines whether a sphere is at least
   * partially inside a view frustum.
   * @param {Array<Array<number>>} frustum An array of six
   * 4-element arrays representing the six clipping planes of the
   * view frustum. In order, they are the left, right, top,
   * bottom, near, and far clipping planes.
   * @param {number} x The Xcoordinate of the sphere's center
   * in world space.
   * @param {number} y The Ycoordinate of the sphere's center
   * in world space.
   * @param {number} z The Zcoordinate of the sphere's center
   * in world space.
   * @param {number} radius Radius of the sphere
   * in world-space units.
   * @returns {boolean} <code>true</code> if the sphere
   * is partially or totally
   * inside the frustum; <code>false</code> otherwise.
   */
  "frustumHasSphere":function(frustum, x, y, z, radius) {
    if(radius < 0)throw new Error("radius is negative");
    let i;
    for (i = 0; i < 6; i++) {
      const plane = frustum[i];
      const dot = plane[3] + plane[0] * x +
     plane[1] * y + plane[2] * z;
      if(dot < -radius)return false;
    }
    return true;
  },
  /**
   * Returns a copy of a 3 &times; 3 matrix.
   * @param {Array<number>} mat A 3 &times; 3atrix.
   * @returns {Array<number>} Return value. */
  "mat3copy":function(mat) {
    return [mat[0], mat[1], mat[2], mat[3],
      mat[4], mat[5], mat[6], mat[7],
      mat[8]];
  },
  /**
   * Returns the identity 3 &times; 3 matrix (a matrix that keeps
   * vectors unchanged when they are transformed with this matrix).
   * @returns {Array<number>} Return value. */
  "mat3identity":function() {
    return [1, 0, 0, 0, 1, 0, 0, 0, 1];
  },

  /**
   * Finds the inverse of a 3 &times; 3 matrix, describing a transformation that undoes the given transformation.
   * @param {Array<number>} m A 3 &times; 3 matrix.
   * @returns {Array<number>} The resulting 3 &times; 3 matrix.
   * Returns the identity matrix if this matrix's determinant, or overall scaling factor, is 0 or extremely close to 0.
   */
  "mat3invert":function(m) {
    const ret = [];
    const t4 = m[4] * m[8] - m[5] * m[7];
    const t5 = m[5] * m[6] - m[3] * m[8];
    const t6 = m[3] * m[7] - m[4] * m[6];
    const t7 = 1.0 / (
      m[0] * t4 + m[1] * t5 + m[2] * t6);
    if(t7 === 0)return MathUtil.mat3identity();
    ret[0] = t4 * t7;
    ret[1] = (m[2] * m[7] - m[1] * m[8]) * t7;
    ret[2] = (m[1] * m[5] - m[2] * m[4]) * t7;
    ret[3] = t5 * t7;
    ret[4] = (m[0] * m[8] - m[2] * m[6]) * t7;
    ret[5] = (m[2] * m[3] - m[0] * m[5]) * t7;
    ret[6] = t6 * t7;
    ret[7] = (m[1] * m[6] - m[0] * m[7]) * t7;
    ret[8] = (m[0] * m[4] - m[1] * m[3]) * t7;
    return ret;
  },
  /**
   * Multiplies two 3 &times; 3 matrices. A new matrix is returned.
   * The matrices are multiplied such that the transformations
   * they describe happen in reverse order. For example, if the first
   * matrix (input matrix) describes a translation and the second
   * matrix describes a scaling, the multiplied matrix will describe
   * the effect of scaling then translation.
   * <p>The matrix multiplication is effectively done by breaking up matrix <code>b</code>
   * into three 3-element vectors (the first 3 elements make up the first vector, and so on),
   * [transforming]{@link MathUtil.mat3transform} each vector with
   * matrix <code>a</code>, and putting the vectors back together into a new matrix.
   * @param {Array<number>} a The first matrix.
   * @param {Array<number>} b The second matrix.
   * @returns {Array<number>} The resulting 3 &times; 3 matrix.
   */
  "mat3multiply":function(a, b) {
    const ret = [];
    ret[0] = b[0] * a[0] + b[1] * a[3] + b[2] * a[6];
    ret[1] = b[0] * a[1] + b[1] * a[4] + b[2] * a[7];
    ret[2] = b[0] * a[2] + b[1] * a[5] + b[2] * a[8];
    ret[3] = b[3] * a[0] + b[4] * a[3] + b[5] * a[6];
    ret[4] = b[3] * a[1] + b[4] * a[4] + b[5] * a[7];
    ret[5] = b[3] * a[2] + b[4] * a[5] + b[5] * a[8];
    ret[6] = b[6] * a[0] + b[7] * a[3] + b[8] * a[6];
    ret[7] = b[6] * a[1] + b[7] * a[4] + b[8] * a[7];
    ret[8] = b[6] * a[2] + b[7] * a[5] + b[8] * a[8];
    return ret;
  },
  /**
   * Transforms a 3-element vector with a 3 &times; 3 matrix and returns
   * the transformed vector.<p>
   * Transforming a vector (<code>v</code>) with a matrix (<code>mat</code>)
   * is effectively done by breaking up <code>mat</code> into three 3-element vectors
   * (the first 3 elements make up the first vector, and so on), multiplying
   * each vector in <code>mat</code> by the corresponding component in
   * <code>v</code>, and adding up the resulting vectors (except <code>v</code>) to
   * get the transformed vector.
   * @param {Array<number>} mat A 3 &times; 3 matrix.
   * @param {Array<number>|number} v x-coordinate.
   * If "vy", and "vz" are omitted, this value can instead
   * be a 4-element array giving the x-, y-, and z-coordinates.
   * @param {number} [vy] The Ycoordinate.
   * @param {number} [vz] The Zcoordinate. To transform a 2D
   * point, set Z to 1, and divide the result's X and Y by
   * the result's Z.
   * @returns {Array<number>} The transformed vector.
   */
  "mat3transform":function(mat, v, vy, vz) {
    let x;
    let y;
    let z;
    if(typeof vy !== "undefined" && typeof vz !== "undefined") {
      x = v;
      y = vy;
      z = vz;
    } else {
      x = v[0];
      y = v[1];
      z = v[2];
    }
    return [x * mat[0] + y * mat[3] + z * mat[6],
      x * mat[1] + y * mat[4] + z * mat[7],
      x * mat[2] + y * mat[5] + z * mat[8]];
  },
  /**
   * Returns the transpose of a 3 &times; 3 matrix. (A transpose is a
   * matrix whose rows are converted to columns and vice versa.)
   * @param {Array<number>} m3 A 3 &times; 3 matrix.
   * @returns {Array<number>} The resulting 3 &times; 3 matrix.
   */
  "mat3transpose":function(m3) {
    return MathUtil.mat3transposeInPlace(MathUtil.mat3copy(m3));
  },
  /**
   * Transposes a 3 &times; 3 matrix in place without creating
   * a new matrix. (A transpose is a matrix whose rows
   * are converted to columns and vice versa.)
   * @param {Array<number>} mat A 3 &times; 3 matrix.
   * @returns {Array<number>} The parameter "mat".
   */
  "mat3transposeInPlace":function(mat) {
    let tmp = mat[1]; mat[1] = mat[3]; mat[3] = tmp;
    tmp = mat[2]; mat[2] = mat[6]; mat[6] = tmp;
    tmp = mat[5]; mat[5] = mat[7]; mat[7] = tmp;
    return mat;
  },
  /**
   * Returns a copy of a 4 &times; 4 matrix.
   * @param {Array<number>} mat A 4 &times; 4 matrix.
   * @returns {Array<number>} Return value. */
  "mat4copy":function(mat) {
    return [mat[0], mat[1], mat[2], mat[3],
      mat[4], mat[5], mat[6], mat[7],
      mat[8], mat[9], mat[10], mat[11],
      mat[12], mat[13], mat[14], mat[15]];
  },
  /**
   * Returns a 4 &times; 4 matrix representing a [perspective projection]{@tutorial camera}
   * in the form of a view frustum, or the limits in the "eye"'s view.<p>
   * When just this matrix is used to transform vertices, transformed coordinates in the view volume will have the following meanings:<ul>
   * <li>x-coordinates range from -W to W (where W is the fourth component of the transformed vertex) and increase from "l" to "r".</li>
   * <li>y-coordinates range from -W to W and increase from "b" to "t" (or from "t" to "b" by default in Vulkan).</li>
   * <li>z-coordinates range from -W to W and increase from "near" to "far". (For view volume z-coordinates ranging from 0 to W, to accommodate how DirectX, Metal, and Vulkan handle such coordinates by default, divide the 15th element of the result, or zero-based index 14, by 2.)</li></ul>
   * The transformed coordinates have the meanings given earlier assuming that the eye space (untransformed) x-, y-, and z-coordinates increase rightward, upward, and from the "eye" backward, respectively (so that the eye space is a [right-handed coordinate system]{@tutorial glmath}). To adjust this method's result for the opposite "hand", reverse the sign of the result's:<ul>
   * <li>1st to 4th elements (zero-based indices 0 to 3), to reverse the direction in which x-coordinates increase, or
   * <li>5th to 8th elements (zero-based indices 4 to 7), to reverse the direction in which y-coordinates increase (e.g., to make those coordinates increase upward in Vulkan rather than downward), or
   * <li>9th to 12th elements (zero-based indices 8 to 11), to reverse the direction in which z-coordinates increase.</ul>
   * @param {number} l The Xcoordinate of the point in eye space where the left
   * clipping plane meets the near clipping plane.
   * @param {number} r The Xcoordinate of the point in eye space where the right
   * clipping plane meets the near clipping plane.
   * ("l" is usually less than "r", so that x-coordinates increase from left to right when just this matrix is used to transform vertices.
   * If "l" is greater than "r", x-coordinates increase in the opposite direction.)
   * @param {number} b The Ycoordinate of the point in eye space where the bottom
   * clipping plane meets the near clipping plane.
   * @param {number} t The Ycoordinate of the point in eye space where the top
   * clipping plane meets the near clipping plane.
   * ("b" is usually less than "t", so that, in WebGL and OpenGL by default, y-coordinates increase upward when just this matrix is used to transform vertices.
   * If "b" is greater than "t", y-coordinates increase in the opposite direction.)
   * @param {number} near The distance, in eye space, from the "eye" to
   * the near clipping plane. Objects closer than this distance won't be
   * seen.<br>This value should be greater than 0, and should be set to the highest distance
   * from the "eye" that the application can afford to clip out for being too
   * close, for example, 0.5, 1, or higher.
   * @param {number} far The distance, in eye space, from the "eye" to
   * the far clipping plane. Objects farther than this distance won't
   * be seen.<br>This value should be greater than 0 and should be set
   * so that the absolute ratio of "far" to "near" is as small as
   * the application can accept.
   * ("near" is usually less than "far", so that, in WebGL and most other graphics pipelines by default, z-coordinates increase from the "eye" backward when just this matrix is used to transform vertices.
   * If "near" is greater than "far", z-coordinates increase in the opposite direction.)<br>
   * In the usual case that "far" is greater than "near", depth
   * buffer values will be more concentrated around the near
   * plane than around the far plane due to the perspective
   * projection.  The greater the ratio of "far" to "near", the more
   * concentrated the values will be around the near plane, and the
   * more likely two objects close to the far plane will have identical depth values.
   * (Most WebGL implementations support 24-bit depth buffers, meaning they support 16,777,216 possible values per pixel.)
   * @returns {Array<number>} The resulting 4 &times; 4 matrix.
   */
  "mat4frustum":function(l, r, b, t, near, far) {
    const dn = 2 * near;
    const onedx = 1 / (r - l);
    const onedy = 1 / (t - b);
    const onedz = 1 / (far - near);
    return [
      dn * onedx, 0, 0, 0,
      0, dn * onedy, 0, 0,
      (l + r) * onedx, (t + b) * onedy, -(far + near) * onedz, -1,
      0, 0, -(dn * far) * onedz, 0];
  },
  /**
   * Returns the identity 4 &times; 4 matrix (a matrix that keeps
   * vectors unchanged when they are transformed with this matrix).
   * @returns {Array<number>} Return value. */
  "mat4identity":function() {
    return [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1];
  },
  /**
   * Returns the transposed result of the inverted 3 &times; 3 upper-left corner of
   * the given 4 &times; 4 matrix.<p>
   * This is usually used to convert a model-view matrix (view matrix multiplied by model or world matrix) to a matrix
   * for transforming surface normals in order to keep them perpendicular
   * to a surface transformed by the model-view matrix. Normals are then
   * transformed by this matrix and then converted to unit vectors. But if the
   * input matrix uses only rotations, translations, and/or uniform scaling
   * (same scaling in X, Y, and Z), the 3 &times; 3 upper left of the input matrix can
   * be used instead of the inverse-transpose matrix to transform the normals.
   * @param {Array<number>} m4 A 4 &times; 4 matrix.
   * @returns {Array<number>} The resulting 3 &times; 3 matrix. If the matrix
   * can't be inverted, returns the identity 3 &times; 3 matrix.
   */
  "mat4inverseTranspose3":function(m4) {
    if(m4[1] === 0 && m4[2] === 0 && m4[4] === 0 &&
   m4[6] === 0 && m4[8] === 0 && m4[9] === 0) {
      if(m4[0] === 1 && m4[5] === 1 && m4[10] === 1) {
        // upper 3 &times; 3 is identity
        return [1, 0, 0, 0, 1, 0, 0, 0, 1];
      } else if(m4[0] * m4[5] * m4[10] !== 0) {
        // upper 3 &times; 3 is simple scaling
        return [1 / m4[0], 0, 0, 0, 1 / m4[5], 0, 0, 0, 1 / m4[10]];
      } else {
        // upper 3 &times; 3 is uninvertable scaling
        return [1, 0, 0, 0, 1, 0, 0, 0, 1];
      }
    }
    const m = [m4[0], m4[1], m4[2], m4[4], m4[5], m4[6],
      m4[8], m4[9], m4[10]];
    let det = m[0] * m[4] * m[8] +
m[3] * m[7] * m[2] +
m[6] * m[1] * m[5] -
m[6] * m[4] * m[2] -
m[3] * m[1] * m[8] -
m[0] * m[7] * m[5];
    if(det === 0) {
      return [1, 0, 0, 0, 1, 0, 0, 0, 1];
    }
    det = 1.0 / det;
    return [
      (-m[5] * m[7] + m[4] * m[8]) * det,
      (m[5] * m[6] - m[3] * m[8]) * det,
      (-m[4] * m[6] + m[3] * m[7]) * det,
      (m[2] * m[7] - m[1] * m[8]) * det,
      (-m[2] * m[6] + m[0] * m[8]) * det,
      (m[1] * m[6] - m[0] * m[7]) * det,
      (-m[2] * m[4] + m[1] * m[5]) * det,
      (m[2] * m[3] - m[0] * m[5]) * det,
      (-m[1] * m[3] + m[0] * m[4]) * det];
  },
  /**
   * Finds the inverse of a 4 &times; 4 matrix.
   * An inverted matrix can describe a transformation in three-dimensional space that undoes another transformation. For
   * example, if a scaling enlarges an object, the inverted matrix reduces the object to its original
   * size.
   * To invert a **translation**, reverse the sign of the translation elements (given earlier as `tx`, `ty`, and `tz`)
   * and generate a new translation matrix with the new translation elements. For example,
   * to invert the translation (5, 2, -3), use the translation (-5, -2, 3).
   * To invert a **scaling**, use 1 divided by each of the scaling elements (given earlier as `sx`, `sy`, and `sz`)
   * and generate a new scaling matrix with those elements.
   * For example, to invert the scaling (2, 3, 4), use the scaling (1/2, 1/3, 1/4).
   * To invert a **rotation** for a 4 &times; 4 matrix, swap the 2nd and 5th elements of the matrix,
   * the 3rd and 9th elements, and the 7th and 10th elements of the matrix (zero-based
   * elements 1, 4, 2, 8, 6, and 9 respectively). The effect is like reversing the angle of the
   * rotation to reset an object to its previous orientation. In general, to invert an NxN
   * rotation matrix, _transpose_ that matrix (so that its rows become its columns and vice versa).
   * *Inverting a general NxN matrix.** Matrices that use some combination of translation, scaling, and rotation as well as other kinds of matrices are more complicated to invert. In fact, some matrices can't be inverted at all. Many 4 &times; 4 or 3 &times; 3 matrices can be inverted using the [MathUtil.mat4invert()]{@link MathUtil.mat4invert} or [MathUtil.mat3invert()]{@link MathUtil.mat3invert} methods, respectively.
   * To describe how inverting a matrix works, we will need to define some terms:
   * A matrix cell's _row index_ and _column index_ tell where that cell appears in the matrix. For example, a cell on the first row has row index 0 and a cell on the second column has column index 1.
   * A matrix's _determinant_ is its overall
   * scaling factor. Only an NxN matrix with a determinant other
   * than 0 can be inverted. To find a matrix's determinant:
   * 1. For each cell in the first row (or first column), find the matrix's _minor_ at that cell (that is, the determinant of a matrix generated by eliminating the row and column where that cell appears in the original matrix).
   * 2. Label the minors (A, B, C, D, ...), in that order.
   * 3. The matrix's determinant is (A - B + C - D + ...).
   * A 1 &times; 1 matrix's determinant is simply the value of its only cell.
   * To invert an NxN matrix:
   * 1. Create a new NxN matrix.
   * 2. For each cell in the original matrix, find its minor at that cell (that is, the determinant of a matrix generated by eliminating the row and column where that cell appears in the original matrix), and set the corresponding cell
   * in the new matrix to that value.
   * 3. In the new matrix, reverse the sign of each cell whose row index
   * plus column index is odd. (These cells will alternate in a checkerboard
   * pattern in the matrix.)
   * 4. Transpose the new matrix (convert its rows to columns
   * and vice versa).
   * 5. Find the original matrix's determinant and divide each
   * cell in the new matrix by that value.
   * 6. The new matrix will be the inverted form of the original NxN matrix.
   * @param {Array<number>} m A 4 &times; 4 matrix.
   * @returns {Array<number>} The resulting 4 &times; 4 matrix.
   * Returns the identity matrix if this matrix's determinant, or overall scaling factor, is 0 or extremely close to 0.
   */
  "mat4invert":function(m) {
    const tvar0 = m[0] * m[10];
    const tvar1 = m[0] * m[11];
    const tvar2 = m[0] * m[5];
    const tvar3 = m[0] * m[6];
    const tvar4 = m[0] * m[7];
    const tvar5 = m[0] * m[9];
    const tvar6 = m[10] * m[12];
    const tvar7 = m[10] * m[13];
    const tvar8 = m[10] * m[15];
    const tvar9 = m[11] * m[12];
    const tvar10 = m[11] * m[13];
    const tvar11 = m[11] * m[14];
    const tvar14 = m[1] * m[4];
    const tvar15 = m[1] * m[6];
    const tvar16 = m[1] * m[7];
    const tvar17 = m[1] * m[8];
    const tvar19 = m[2] * m[4];
    const tvar20 = m[2] * m[5];
    const tvar21 = m[2] * m[7];
    const tvar22 = m[2] * m[8];
    const tvar23 = m[2] * m[9];
    const tvar25 = m[3] * m[4];
    const tvar26 = m[3] * m[5];
    const tvar27 = m[3] * m[6];
    const tvar28 = m[3] * m[8];
    const tvar29 = m[3] * m[9];
    const tvar32 = m[4] * m[9];
    const tvar35 = m[5] * m[8];
    const tvar37 = m[6] * m[8];
    const tvar38 = m[6] * m[9];
    const tvar40 = m[7] * m[8];
    const tvar41 = m[7] * m[9];
    const tvar42 = m[8] * m[13];
    const tvar43 = m[8] * m[14];
    const tvar44 = m[8] * m[15];
    const tvar45 = m[9] * m[12];
    const tvar46 = m[9] * m[14];
    const tvar47 = m[9] * m[15];
    const tvar48 = tvar14 - tvar2;
    const tvar49 = tvar15 - tvar20;
    const tvar50 = tvar16 - tvar26;
    const tvar51 = tvar19 - tvar3;
    const tvar52 = tvar2 - tvar14;
    const tvar53 = tvar20 - tvar15;
    const tvar54 = tvar21 - tvar27;
    const tvar55 = tvar25 - tvar4;
    const tvar56 = tvar26 - tvar16;
    const tvar57 = tvar27 - tvar21;
    const tvar58 = tvar3 - tvar19;
    const tvar59 = tvar4 - tvar25;
    let det = tvar45 * tvar57 + tvar6 * tvar50 + tvar9 * tvar53 + tvar42 * tvar54 + tvar7 * tvar55 +
tvar10 * tvar58 + tvar43 * tvar56 + tvar46 * tvar59 + tvar11 * tvar48 + tvar44 * tvar49 +
tvar47 * tvar51 + tvar8 * tvar52;
    if(det === 0)return MathUtil.mat4identity();
    det = 1.0 / det;
    const r = [];
    r[0] = m[6] * tvar10 - m[7] * tvar7 + tvar41 * m[14] - m[5] * tvar11 - tvar38 * m[15] + m[5] * tvar8;
    r[1] = m[3] * tvar7 - m[2] * tvar10 - tvar29 * m[14] + m[1] * tvar11 + tvar23 * m[15] - m[1] * tvar8;
    r[2] = m[13] * tvar54 + m[14] * tvar56 + m[15] * tvar49;
    r[3] = m[9] * tvar57 + m[10] * tvar50 + m[11] * tvar53;
    r[4] = m[7] * tvar6 - m[6] * tvar9 - tvar40 * m[14] + m[4] * tvar11 + tvar37 * m[15] - m[4] * tvar8;
    r[5] = m[2] * tvar9 - m[3] * tvar6 + m[14] * (tvar28 - tvar1) + m[15] * (tvar0 - tvar22);
    r[6] = m[12] * tvar57 + m[14] * tvar59 + m[15] * tvar51;
    r[7] = m[8] * tvar54 + m[10] * tvar55 + m[11] * tvar58;
    r[8] = m[5] * tvar9 - tvar41 * m[12] + tvar40 * m[13] - m[4] * tvar10 + m[15] * (tvar32 - tvar35);
    r[9] = tvar29 * m[12] - m[1] * tvar9 + m[13] * (tvar1 - tvar28) + m[15] * (tvar17 - tvar5);
    r[10] = m[12] * tvar50 + m[13] * tvar55 + m[15] * tvar52;
    r[11] = m[8] * tvar56 + m[9] * tvar59 + m[11] * tvar48;
    r[12] = tvar38 * m[12] - m[5] * tvar6 - tvar37 * m[13] + m[4] * tvar7 + m[14] * (tvar35 - tvar32);
    r[13] = m[1] * tvar6 - tvar23 * m[12] + m[13] * (tvar22 - tvar0) + m[14] * (tvar5 - tvar17);
    r[14] = m[12] * tvar53 + m[13] * tvar58 + m[14] * tvar48;
    r[15] = m[8] * tvar49 + m[9] * tvar51 + m[10] * tvar52;
    let i;
    for (i = 0; i < 16; i++) {
      r[i] *= det;
    }
    return r;
  },
  /**
   * Returns whether a 4 &times; 4 matrix is the identity matrix.
   * @param {Array<number>} mat A 4 &times; 4 matrix.
   * @returns {boolean} Return value. */
  "mat4isIdentity":function(mat) {
    return (
      mat[0] === 1 && mat[1] === 0 && mat[2] === 0 && mat[3] === 0 &&
    mat[4] === 0 && mat[5] === 1 && mat[6] === 0 && mat[7] === 0 &&
    mat[8] === 0 && mat[9] === 0 && mat[10] === 1 && mat[11] === 0 &&
    mat[12] === 0 && mat[13] === 0 && mat[14] === 0 && mat[15] === 1
    );
  },
  /**
   * Returns a 4 &times; 4 matrix that represents a "camera" view,
   * transforming world space coordinates, shared by every object in a scene, to coordinates in <i>eye space</i>
   * (also called <i>camera space</i> or <i>view space</i>). This essentially rotates a "camera"
   * and moves it to somewhere in the scene. In eye space, when just this matrix is used to transform vertices:<ul>
   * <li>The "camera" is located at the origin (0,0,0), or
   * at <code>cameraPos</code> in world space,
   * and points forward to the <code>lookingAt</code>
   * position in world space. This generally
   * puts <code>lookingAt</code> at the center of the view.
   * <li>The x-axis points rightward from the "camera"'s viewpoint.
   * <li>The y-axis points upward from the center of the "camera" to its top. The
   * <code>up</code> vector guides this direction.
   * <li>The z-axis points away from the <code>lookingAt</code> point toward the "camera", so that the eye space is a [right-handed coordinate system]{@tutorial glmath}.</ul><p>
   * To adjust the result of this method for a left-handed coordinate system (so that the z-axis points in the opposite direction), reverse the sign of the 1st, 3rd, 5th, 7th, 9th, 11th, 13th, and 15th elements of the result (zero-based indices 0, 2, 4, 6, 8, 10, 12, and 14).<p>
   * @param {Array<number>} cameraPos A 3-element vector specifying
   * the "camera" position in world space.<br>
   * When used in conjunction with an [orthographic projection]{@link MathUtil.mat4ortho}, set this parameter to
   * the value of <code>lookingAt</code> plus a [unit vector]{@tutorial glmath}
   * (for example, using {@link MathUtil.vec3add}) to form an
   * <i>axonometric projection</i> (if the unit vector is <code>[sqrt(1/3),sqrt(1/3),sqrt(1/3)]</code>, the result is
   * an <i>isometric projection</i>). See the following examples.
   * @param {Array<number>} [lookingAt] A 3-element vector specifying
   * the point in world space that the "camera" is looking at. May be null or omitted,
   * in which case the default is the coordinates (0,0,0).
   * @param {Array<number>} [up] A 3-element vector specifying
   * the direction from the center of the "camera" to its top. This parameter may
   * be null or omitted, in which case the default is the vector (0, 1, 0),
   * the vector that results when the "camera" is held upright.<br>
   * This vector must not be parallel to the view direction
   * (the direction from "cameraPos" to "lookingAt").
   * (See the example for one way to ensure this.)<br>
   * @returns {Array<number>} The resulting 4 &times; 4 matrix.
   * @example <caption>The following example calls this method with an
   * up vector of (0, 1, 0) except if the view direction is parallel to that
   * vector or nearly so.</caption>
   * var upVector=[0,1,0]; // y-axis
   * var viewdir=MathUtil.vec3sub(lookingAt, cameraPos);
   * var par=MathUtil.vec3length(MathUtil.vec3cross(viewdir,upVector));
   * if(par<0.00001)upVector=[0,0,1]; // view is almost parallel, so use z-axis
   * var matrix=MathUtil.mat4lookat(cameraPos,lookingAt,upVector);
   * @example <caption>The following example creates an
   * isometric projection for a right-handed coordinate system. The Y
   * axis will point up, the z-axis toward the lower left, and the x-axis toward
   * the lower right.</caption>
   * // Assumes an orthographic projection matrix is used. Example:
   * // var projectionMatrix=MathUtil.mat4ortho(-10,10,-10,10,-50,50);
   * // "Camera" will be at (1,1,1) -- actually (sqrt(1/3),sqrt(1/3),sqrt(1/3)) --
   * // and point toward [0,0,0]
   * var lookPoint=[0,0,0];
   * var cameraPoint=MathUtil.vec3normalize([1,1,1]);
   * cameraPoint=MathUtil.vec3add(cameraPoint,lookPoint);
   * var matrix=MathUtil.mat4lookat(cameraPoint,lookPoint);
   * @example <caption>The following example is like the previous
   * example, but with the z-axis pointing up.</caption>
   * var lookPoint=[0,0,0];
   * var cameraPoint=MathUtil.vec3normalize([1,1,1]);
   * cameraPoint=MathUtil.vec3add(cameraPoint,lookPoint);
   * // Positive z-axis is the up vector
   * var matrix=MathUtil.mat4lookat(cameraPoint,lookPoint,[0,0,1]);
   * @example <caption>The following example creates a "camera" view matrix using the
   * viewer position, the viewing direction, and the up vector (a "look-to" matrix):</caption>
   * var viewDirection=[0,0,1]
   * var cameraPos=[0,0,0]
   * var upVector=[0,1,0]
   * var lookingAt=MathUtil.vec3add(cameraPos,viewDirection);
   * var matrix=MathUtil.mat4lookat(cameraPos,lookingAt,upVector);
   */
  "mat4lookat":function(cameraPos, lookingAt, up) {
    if(typeof up === "undefined" || up === null)up = [0, 1, 0];
    if(typeof lookingAt === "undefined" || lookingAt === null)lookingAt = [0, 0, 0];
    const f = MathUtil.vec3sub(lookingAt, cameraPos);
    const len = MathUtil.vec3length(f);
    if(len < 1e-6) {
      return MathUtil.mat4identity();
    }
    // "f" is the normalized vector from "cameraPos" to "lookingAt"
    MathUtil.vec3scaleInPlace(f, 1.0 / len);
    // normalize the "up" vector
    up = MathUtil.vec3normalize(up);
    // make "s" a vector perpendicular to "f" and "up" vector;
    // "s" will point rightward from the "camera"'s viewpoint.
    const s = MathUtil.vec3cross(f, up);
    MathUtil.vec3normalizeInPlace(s);
    // orthogonalize the "up" vector
    const u = MathUtil.vec3cross(s, f);
    MathUtil.vec3normalizeInPlace(u);
    // negate the "f" vector so that it points forward from
    // the "camera"'s viewpoint
    MathUtil.vec3negateInPlace(f);
    return [s[0], u[0], f[0], 0, s[1], u[1], f[1], 0, s[2], u[2], f[2], 0,
      -MathUtil.vec3dot(cameraPos, s),
      -MathUtil.vec3dot(cameraPos, u),
      -MathUtil.vec3dot(cameraPos, f), 1];
  },
  /**
   * Multiplies two 4 &times; 4 matrices. A new matrix is returned.
   * The matrices are multiplied such that the transformations
   * they describe happen in reverse order. For example, if the first
   * matrix (input matrix) describes a translation and the second
   * matrix describes a scaling, the multiplied matrix will describe
   * the effect of scaling then translation.
   * <p>The matrix multiplication is effectively done by breaking up matrix <code>b</code>
   * into four 4-element vectors (the first 4 elements make up the first vector, and so on),
   * [transforming]{@link MathUtil.mat4transform} each vector with
   * matrix <code>a</code>, and putting the vectors back together into a new matrix.
   * @param {Array<number>} a The first matrix.
   * @param {Array<number>} b The second matrix.
   * @returns {Array<number>} The resulting 4 &times; 4 matrix.
   */
  "mat4multiply":function(a, b) {
    const dst = [];
    let i;
    for (i = 0; i < 16; i += 4) {
      let j;
      for (j = 0; j < 4; j++) {
        dst[i + j] =
    b[i] * a[j] +
    b[i + 1] * a[j + 4] +
    b[i + 2] * a[j + 8] +
    b[i + 3] * a[j + 12];
      }
    }
    return dst;
  },
  /**
   * Returns a 4 &times; 4 view matrix representing an oblique "eye" view,
   * when used in conjunction with an [orthographic projection]{@link MathUtil.mat4ortho}.<p>
   * This method works the same way in right-handed and left-handed
   * coordinate systems.
   * @param {number} alpha Controls how much the z-axis is stretched. In degrees. A value of 45
   * (<code>arctan(1)</code>) indicates
   * a cabinet projection, and a value of 63.435 (<code>arctan(2)</code>) indicates a cavalier projection.
   * @param {number} phi Controls the apparent angle of the negative z-axis in relation to the
   * positive x-axis. In degrees. 0 means the negative z-axis appears to point in the same direction as
   * the positive x-axis, and 90, in the same direction as the positive y-axis.
   * @returns {Array<number>} The resulting 4 &times; 4 matrix.
   */
  "mat4oblique":function(alpha, phi) {
    const alphaAngle = (alpha >= 0 && alpha < 360 ? alpha : alpha % 360 + (alpha < 0 ? 360 : 0)) * MathUtil.PiDividedBy180;
    const phiAngle = (phi >= 0 && phi < 360 ? phi : phi % 360 + (phi < 0 ? 360 : 0)) * MathUtil.PiDividedBy180;
    const ca = Math.cos(alphaAngle);
    const sa = alphaAngle >= 0 && alphaAngle < 6.283185307179586 ? alphaAngle <= 3.141592653589793 ? Math.sqrt(1.0 - ca * ca) : -Math.sqrt(1.0 - ca * ca) : Math.sin(alphaAngle);
    const cp = Math.cos(phiAngle);
    const sp = phiAngle >= 0 && phiAngle < 6.283185307179586 ? phiAngle <= 3.141592653589793 ? Math.sqrt(1.0 - cp * cp) : -Math.sqrt(1.0 - cp * cp) : Math.sin(phiAngle);
    const cota = ca / sa;
    return [
      1, 0, 0, 0,
      0, 1, 0, 0,
      -cp * cota, -sp * cota, 1, 0,
      0, 0, 0, 1
    ];
  },
  /**
   * Returns a 4 &times; 4 matrix representing an [orthographic projection]{@tutorial camera}.
   * In this projection, the left clipping plane is parallel to the right clipping
   * plane and the top to the bottom.<p>
   * The projection returned by this method only scales and/or shifts the view, so that
   * objects with the same size won't appear smaller as they get more distant from the  "camera".<p>
   * When just this matrix is used to transform vertices, transformed coordinates in the view volume will have the following meanings:<ul>
   * <li>x-coordinates range from -1 to 1 and increase from "l" to "r".</li>
   * <li>y-coordinates range from -1 to 1 and increase from "b" to "t" (or from "t" to "b" by default in Vulkan).</li>
   * <li>z-coordinates range from -1 to 1 and increase from "n" to "f". (For view volume z-coordinates ranging from 0 to 1, to accommodate how DirectX, Metal, and Vulkan handle such coordinates by default, divide the 11th and 15th elements of the result, or zero-based indices 10 and 14, by 2, then add 0.5 to the 15th element.)</li></ul>
   * The transformed coordinates have the meanings given earlier assuming that the eye space (untransformed) x-, y-, and z-coordinates increase rightward, upward, and from the "eye" backward, respectively (so that the eye space is a [right-handed coordinate system]{@tutorial glmath}). To adjust this method's result for the opposite "hand", reverse the sign of the result's:<ul>
   * <li>1st to 4th elements (zero-based indices 0 to 3), to reverse the direction in which x-coordinates increase, or
   * <li>5th to 8th elements (zero-based indices 4 to 7), to reverse the direction in which y-coordinates increase (e.g., to make those coordinates increase upward in Vulkan rather than downward), or
   * <li>9th to 12th elements (zero-based indices 8 to 11), to reverse the direction in which z-coordinates increase.</ul>
   * @param {number} l Leftmost coordinate of the orthographic view.
   * @param {number} r Rightmost coordinate of the orthographic view.
   * ("l" is usually less than "r", so that x-coordinates increase from left to right when just this matrix is used to transform vertices.
   * If "l" is greater than "r", x-coordinates increase in the opposite direction.)
   * @param {number} b Bottommost coordinate of the orthographic view.
   * @param {number} t Topmost coordinate of the orthographic view.
   * ("b" is usually less than "t", so that, in WebGL and OpenGL by default, y-coordinates increase upward when just this matrix is used to transform vertices.
   * If "b" is greater than "t", y-coordinates increase in the opposite direction.)
   * @param {number} n The Zcoordinate, in eye space, of the near clipping plane. If z-coordinates in eye space increase from the "eye" forward, a positive value for "n" means the plane is in front of the "eye".
   * @param {number} f The Zcoordinate, in eye space, of the far clipping plane. If z-coordinates in eye space increase from the "eye" forward, a positive value for "f" means the plane is in front of the "eye".
   *  ("n" is usually less than "f", so that, in WebGL and most other graphics pipelines by default, z-coordinates increase from the "eye" backward when just this matrix is used to transform vertices.
   * If "n" is greater than "f", z-coordinates increase in the opposite direction.)
   * The absolute difference
   * between n and f should be as small as the application can accept.
   * @returns {Array<number>} The resulting 4 &times; 4 matrix.
   */
  "mat4ortho":function(l, r, b, t, n, f) {
    const width = 1 / (r - l);
    const height = 1 / (t - b);
    const depth = 1 / (f - n);
    return [
      2 * width, 0, 0, 0,
      0, 2 * height, 0, 0,
      0, 0, -2 * depth, 0,
      -(l + r) * width, -(t + b) * height, -(n + f) * depth, 1];
  },

  /**
   * Returns a 4 &times; 4 matrix representing a 2D [orthographic projection]{@tutorial camera}.<p>
   * This is the same as mat4ortho() with the near clipping plane
   * set to -1 and the far clipping plane set to 1.<p>
   * See [mat4ortho()]{@link MathUtil.mat4ortho} for information on the meaning of coordinates
   * when using this matrix and on adjusting the matrix for different coordinate systems.
   * @param {number} l Leftmost coordinate of the orthographic view.
   * @param {number} r Rightmost coordinate of the orthographic view. See [mat4ortho()]{@link MathUtil.mat4ortho} for more information on the relationship between the "l" and "r" parameters.
   * @param {number} b Bottommost coordinate of the orthographic view.
   * @param {number} t Topmost coordinate of the orthographic view. See [mat4ortho()]{@link MathUtil.mat4ortho} for more information on the relationship between the "b" and "t" parameters.
   * @returns {Array<number>} The resulting 4 &times; 4 matrix.
   */
  "mat4ortho2d":function(l, r, b, t) {
    return MathUtil.mat4ortho(l, r, b, t, -1, 1);
  },
  /**
   * Returns a 4 &times; 4 matrix representing a 2D [orthographic projection]{@tutorial camera},
   * retaining the view rectangle's aspect ratio.<p>
   * If the view rectangle's aspect ratio doesn't match the desired aspect
   * ratio, the view rectangle will be centered on the viewport
   * or otherwise moved and scaled so as to keep the entire view rectangle visible without stretching
   * or squishing it; the projection matrix generated will then use a view volume based on the new view rectangle.<p>
   * This is the same as mat4orthoAspect() with the near clipping plane
   * set to -1 and the far clipping plane set to 1.<p>
   * See [mat4ortho()]{@link MathUtil.mat4ortho} for information on the meaning
   * of coordinates when using this matrix and on adjusting the matrix for different coordinate systems.
   * @param {number} l Leftmost coordinate of the orthographic view.
   * @param {number} r Rightmost coordinate of the orthographic view. See [mat4ortho()]{@link MathUtil.mat4ortho} for more information on the relationship between the "l" and "r" parameters.
   * @param {number} b Bottommost coordinate of the orthographic view.
   * @param {number} t Topmost coordinate of the orthographic view. See [mat4ortho()]{@link MathUtil.mat4ortho} for more information on the relationship between the "b" and "t" parameters.
   * @param {number} aspect The ratio of width to height of the viewport, usually
   * the scene's aspect ratio.
   * @returns {Array<number>} The resulting 4 &times; 4 matrix.
   * @example <caption>The following example generates an orthographic
   * projection matrix with a square view rectangle and an aspect ratio
   * retrieved from the HTML DOM.</caption>
   * var matrix=MathUtil.mat4ortho2dAspect(0,100,0,100,
   * window.innerWidth/Math.max(1,window.innerHeight));
   */
  "mat4ortho2dAspect":function(l, r, b, t, aspect) {
    return MathUtil.mat4orthoAspect(l, r, b, t, -1, 1, aspect);
  },
  /**
   * Returns a 4 &times; 4 matrix representing an [orthographic projection]{@tutorial camera},
   * retaining the view rectangle's aspect ratio.<p>
   * If the view rectangle's aspect ratio doesn't match the desired aspect
   * ratio, the view rectangle will be centered on the viewport
   * or otherwise moved and scaled so as to keep the entire view rectangle visible without stretching
   * or squishing it; the projection matrix generated will then use a view volume based on the new view rectangle.
   * <p>The projection returned by this method only scales and/or shifts the view, so that
   * objects with the same size won't appear smaller as they get more distant from the  "eye".<p>
   * See [mat4ortho()]{@link MathUtil.mat4ortho} for information on the meaning of coordinates
   * when using this matrix and on adjusting the matrix for different coordinate systems.
   * @param {number} l Leftmost coordinate of the orthographic view.
   * @param {number} r Rightmost coordinate of the orthographic view. See [mat4ortho()]{@link MathUtil.mat4ortho} for more information on the relationship between the "l" and "r" parameters.
   * @param {number} b Bottommost coordinate of the orthographic view.
   * @param {number} t Topmost coordinate of the orthographic view. See [mat4ortho()]{@link MathUtil.mat4ortho} for more information on the relationship between the "b" and "t" parameters.
   * @param {number} n Distance, in eye space, from the "eye" to the near clipping
   * plane.
   * @param {number} f Distance, in eye space, from the "eye" to the far clipping
   * plane. See [mat4ortho()]{@link MathUtil.mat4ortho} for more information on the "n" and "f" parameters and the relationship between them.
   * @param {number} aspect The ratio of width to height of the viewport, usually
   * the scene's aspect ratio.
   * @returns {Array<number>} The resulting 4 &times; 4 matrix.
   * @example <caption>The following example generates an orthographic
   * projection matrix with a square view rectangle, a Z range of 0 to 100, and an aspect ratio
   * retrieved from the HTML DOM.</caption>
   * var matrix=MathUtil.mat4orthoAspect(0,100,0,100,
   * 0, 100,
   * window.innerWidth/Math.max(1,window.innerHeight));
   */
  "mat4orthoAspect":function(l, r, b, t, n, f, aspect) {
    let newDim;
    const boxAspect = Math.abs((r - l) / (t - b));
    aspect /= boxAspect;
    const w = Math.abs(r - l);
    const h = Math.abs(t - b);
    if (aspect < 1.0) {
      newDim = h / aspect;
      if(t > b) {
        b -= (newDim - h) * 0.5;
        t += (newDim - h) * 0.5;
      } else {
        t -= (newDim - h) * 0.5;
        b += (newDim - h) * 0.5;
      }
    } else {
      newDim = w * aspect;
      if(r > l) {
        l -= (newDim - w) * 0.5;
        r += (newDim - w) * 0.5;
      } else {
        r -= (newDim - w) * 0.5;
        l += (newDim - w) * 0.5;
      }
    }
    return MathUtil.mat4ortho(l, r, b, t, n, f);
  },
  /**
   * Returns a 4 &times; 4 matrix representing a [perspective projection]{@tutorial camera}.<p>
   * When just this matrix is used to transform vertices, transformed coordinates in the view volume will have the following meanings:<ul>
   * <li>x-coordinates range from -W to W (where W is the fourth component of the transformed vertex) and increase from left to right.</li>
   * <li>y-coordinates range from -W to W and increase upward (or downward by default in Vulkan).</li>
   * <li>z-coordinates range from -W to W and increase from "near" to "far". (For view volume z-coordinates ranging from 0 to W, to accommodate how DirectX, Metal, and Vulkan handle such coordinates by default, divide the 15th element of the result, or zero-based index 14, by 2.)</li></ul>
   * The transformed coordinates have the meanings given earlier assuming that the eye space (untransformed) x-, y-, and z-coordinates increase rightward, upward, and from the "eye" backward, respectively (so that the eye space is a [right-handed coordinate system]{@tutorial glmath}). To adjust this method's result for the opposite "hand", reverse the sign of the result's:<ul>
   * <li>1st to 4th elements (zero-based indices 0 to 3), to reverse the direction in which x-coordinates increase, or
   * <li>5th to 8th elements (zero-based indices 4 to 7), to reverse the direction in which y-coordinates increase (e.g., to make those coordinates increase upward in Vulkan rather than downward), or
   * <li>9th to 12th elements (zero-based indices 8 to 11), to reverse the direction in which z-coordinates increase.</ul>
   * @param {number} fovY The Yaxis field of view, in degrees, that is, the shortest angle
   * between the top and bottom clipping planes. Should be less
   * than 180 degrees. (The smaller
   * this number, the bigger close objects appear to be. As a result, zooming out
   * can be implemented by raising this value, and zooming in by lowering it.)
   * @param {number} aspectRatio The ratio of width to height of the viewport, usually
   * the scene's aspect ratio.
   * @param {number} near The distance, in eye space, from the "eye" to
   * the near clipping plane. Objects closer than this distance won't be
   * seen.<br>This value should be greater than 0, and should be set to the highest distance
   * from the "eye" that the application can afford to clip out for being too
   * close, for example, 0.5, 1, or higher.
   * @param {number} far The distance, in eye space, from the "eye" to
   * the far clipping plane. Objects farther than this distance won't
   * be seen.<br>This value should be greater than 0 and should be set
   * so that the absolute ratio of "far" to "near" is as small as
   * the application can accept.
   * ("near" is usually less than "far", so that, in WebGL and most other graphics pipelines by default, z-coordinates increase from the "eye" backward when just this matrix is used to transform vertices.
   * If "near" is greater than "far", z-coordinates increase in the opposite direction.)<br>
   * In the usual case that "far" is greater than "near", depth
   * buffer values will be more concentrated around the near
   * plane than around the far plane due to the perspective
   * projection.  The greater the ratio of "far" to "near", the more
   * concentrated the values will be around the near plane, and the
   * more likely two objects close to the far plane will have identical depth values.
   * (Most WebGL implementations support 24-bit depth buffers, meaning they support 16,777,216 possible values per pixel.)
   * @returns {Array<number>} The resulting 4 &times; 4 matrix.
   * @example <caption>The following example generates a perspective
   * projection matrix with a 55 degree field of view and an aspect ratio
   * retrieved from the HTML DOM.</caption>
   * var matrix=MathUtil.mat4perspective(55,
   * window.innerWidth/Math.max(1,window.innerHeight),
   * 0.01,100);
   */
  "mat4perspective":function(fovY, aspectRatio, near, far) {
    // NOTE: Converts fovY to radians then divides it by 2
    const fov = (fovY >= 0 && fovY < 360 ? fovY : fovY % 360 + (fovY < 0 ? 360 : 0)) * MathUtil.PiDividedBy360;
    const f = 1 / Math.tan(fov);
    let nmf = near - far;
    nmf = 1 / nmf;
    return [f / aspectRatio, 0, 0, 0, 0, f, 0, 0, 0, 0,
      nmf * (near + far), -1, 0, 0, nmf * near * far * 2, 0];
  },
  /**
   * Returns a 4 &times; 4 matrix representing a [perspective projection]{@tutorial camera},
   * given an x-axis field of view.<p>
   * See [mat4perspective()]{@link MathUtil.mat4perspective} for information on the meaning of coordinates
   * when using this matrix and on adjusting the matrix for different coordinate systems.
   * @param {number} fovX The Xaxis field of view, in degrees, that is, the shortest angle
   * between the left and right clipping planes. Should be less
   * than 180 degrees. (The smaller
   * this number, the bigger close objects appear to be. As a result, zooming out
   * can be implemented by raising this value, and zooming in by lowering it.)
   * @param {number} aspectRatio The ratio of width to height of the viewport, usually
   * the scene's aspect ratio.
   * @param {number} near The distance, in eye space, from the "eye" to
   * the near clipping plane. Objects closer than this distance won't be
   * seen.<br>See [mat4perspective()]{@link MathUtil.mat4perspective} for further information on this parameter.
   * @param {number} far The distance, in eye space, from the "eye" to
   * the far clipping plane. Objects farther than this distance won't
   * be seen.<br>See [mat4perspective()]{@link MathUtil.mat4perspective} for further information on this parameter.
   * @returns {Array<number>} The resulting 4 &times; 4 matrix.
   * @example <caption>The following example generates a perspective
   * projection matrix with a 120 degree horizontal field of view and an aspect ratio
   * retrieved from the HTML DOM.</caption>
   * var matrix=MathUtil.mat4perspectiveHorizontal(120,
   * window.innerWidth/Math.max(1,window.innerHeight),
   * 0.01,100);
   */
  "mat4perspectiveHorizontal":function(fovX, aspectRatio, near, far) {
    // NOTE: Converts fovX to radians then divides it by 2
    const fov = (fovX >= 0 && fovX < 360 ? fovX : fovX % 360 + (fovX < 0 ? 360 : 0)) * MathUtil.PiDividedBy360;
    // NOTE: Converts to degrees then multiplies by 2
    const fovY = MathUtil.Num360DividedByPi * Math.atan2(Math.tan(fov), aspectRatio);
    return MathUtil.mat4perspective(fovY, aspectRatio, near, far);
  },

  /**
   * Returns a 4 &times; 4 matrix that transforms the view to the center of the viewport. The resulting matrix should be multiplied by a projection matrix (such as that returned by {@link MathUtil.mat4perspective}), a projection-view matrix (projection matrix multiplied
   * by the view matrix, in that order),
   * or a model-view-projection matrix, that is, (projection-view matrix multiplied
   * by the model [world] matrix, in that order).
   * @param {number} wx The Xcoordinate of the center of the desired viewport portion, in window coordinates.
   * @param {number} wy The Ycoordinate of the center of the desired viewport portion, in window coordinates.
   * @param {number} ww Width of the desired viewport portion.
   * @param {number} wh Height of the desired viewport portion.
   * @param {Array<number>} vp A 4-element array giving the x- and y-coordinates
   * of the current viewport's origin followed by the width and height
   * of a rectangle indicating the current viewport. If the return value of this method will be multiplied by another matrix (such as that returned
   * by {@link MathUtil.mat4ortho}, {@link MathUtil.mat4perspective}, or
   * similar {@link MathUtil} methods), the viewport's origin is the lower-left corner if x- and y-coordinates within the view volume increase rightward and upward, respectively, or the upper-left corner if x- and y-coordinates within the view volume increase rightward and downward, respectively.
   * @returns {Array<number>} The resulting 4 &times; 4 matrix.
   */
  "mat4pickMatrix":function(wx, wy, ww, wh, vp) {
    const invww = 1.0 / ww;
    const invwh = 1.0 / wh;
    const t5 = -(wx - vp[0]) * 2.0 * invww;
    const t6 = -(wy - vp[1]) * 2.0 * invwh;
    const t7 = vp[2] * invww * 2.0;
    const t8 = -(vp[3] * invwh) * 2.0;
    // const mat = this.stack[this.stack.length - 1];
    return [
      0.5 * t7, 0, 0, 0,
      0, -0.5 * t8, 0, 0,
      0, 0, 1, 0,
      0.5 * t7 + t5,
      -0.5 * t8 + t6, 0, 1];
  },
  /**
   * Transforms a 3-element vector with a 4 &times; 4 matrix and returns
   * a perspective-correct version of the vector as a 3D point. <p>
   * The transformation involves transforming a 4-element vector with the same X,
   * Y, and z-coordinates, but with a W coordinate equal to 1, with the 4 &times; 4 matrix, and
   * then dividing X, Y, and Z of the transformed 4-element
   * vector by that vector's W (a <i>perspective divide</i>),
   * then returning that vector's new X, Y, and Z.<p>
   * @param {Array<number>} mat A 4 &times; 4 matrix to use to transform
   * the vector. This will generally be
   * a projection-view matrix (projection matrix multiplied
   * by the view matrix, in that order), if the vector to transform is in <i>world space</i>,
   * or a model-view-projection matrix, that is, (projection-view matrix multiplied
   * by the model [world] matrix, in that order), if the vector is in <i>model
   * (object) space</i>.<br>
   * If the matrix includes a projection transform returned
   * by {@link MathUtil.mat4ortho}, {@link MathUtil.mat4perspective}, or
   * similar {@link MathUtil} methods, the x-, y-, and z-coordinates within the
   * view volume, before the perspective divide, will have the range specified in those methods' documentation and increase in the direction given in that documentation, and those coordinates, after the perspective divide will range from -1 to 1 (or 0 to 1) if they previously ranged from -W to W (or 0 to W, respectively).
   * @param {Array<number>|number} v x-coordinate of a 3D point to transform.
   * If "vy" and "vz" are omitted, this value can instead
   * be a 3-element array giving the x-, y-, and z-coordinates.
   * @param {number} [vy] The Ycoordinate.
   * @param {number} [vz] The Zcoordinate. To transform a 2D
   * point, set Z to 0.
   * @returns {Array<number>} The transformed 3-element vector.
   * The elements, in order, are
   * the transformed vector's x-, y-, and z-coordinates.
   */
  "mat4projectVec3":function(mat, v, vy, vz) {
    let x;
    let y;
    let z;
    if(typeof vy !== "undefined" && typeof vz !== "undefined") {
      x = v;
      y = vy;
      z = vz;
    } else {
      x = v[0];
      y = v[1];
      z = v[2];
    }
    const x1 = x * mat[0] + y * mat[4] + z * mat[8] + mat[12];
    const y1 = x * mat[1] + y * mat[5] + z * mat[9] + mat[13];
    const z1 = x * mat[2] + y * mat[6] + z * mat[10] + mat[14];
    const w = 1.0 / (x * mat[3] + y * mat[7] + z * mat[11] + mat[15]);
    return [x1 * w, y1 * w, z1 * w];
  },
  /**
   * Multiplies a 4 &times; 4 matrix by a rotation transformation that rotates vectors
   * by the given rotation angle and around the given [axis of rotation]{@tutorial glmath},
   * and returns a new matrix.
   * The effect will be that the rotation transformation will
   * happen before the transformation described in the given matrix,
   * when applied in the global coordinate frame.
   * @param {Array<number>} mat A 4 &times; 4 matrix to multiply.
   * @param {Array<number>|number} angle The desired angle
   * to rotate in degrees.  If "v", "vy", and "vz" are omitted, this can
   * instead be a 4-element array giving the [axis of rotation]{@tutorial glmath}
   * as the first three elements, followed by the angle
   * in degrees as the fourth element.
   * @param {Array<number>|number} v X-component of the point lying on the axis
   * of rotation.  If "vy" and "vz" are omitted, this can
   * instead be a 3-element array giving the axis
   * of rotation.
   * @param {number} vy Y-component of the point lying on the axis
   * of rotation.
   * @param {number} vz Z-component of the point lying on the axis
   * of rotation.
   * @returns {Array<number>} The resulting 4 &times; 4 matrix.
   */
  "mat4rotate":function(mat, angle, v, vy, vz) {
    let v0;
    let v1;
    let v2;
    let ang;
    if(typeof vy !== "undefined" && typeof vz !== "undefined") {
      v0 = v;
      v1 = vy;
      v2 = vz;
      ang = angle;
    } else if(typeof v === "undefined") {
      v0 = angle[0];
      v1 = angle[1];
      v2 = angle[2];
      ang = angle[3];
    } else {
      v0 = v[0];
      v1 = v[1];
      v2 = v[2];
      ang = angle;
    }
    ang = (ang >= 0 && ang < 360 ? ang : ang % 360 + (ang < 0 ? 360 : 0)) * MathUtil.PiDividedBy180;
    const cost = Math.cos(ang);
    const sint = ang <= 3.141592653589793 ? Math.sqrt(1.0 - cost * cost) : -Math.sqrt(1.0 - cost * cost);
    if( v0 === 1 && v1 === 0 && v2 === 0 ) {
      return [mat[0], mat[1], mat[2], mat[3],
        cost * mat[4] + mat[8] * sint, cost * mat[5] + mat[9] * sint, cost * mat[6] + mat[10] * sint, cost * mat[7] + mat[11] * sint,
        cost * mat[8] - sint * mat[4], cost * mat[9] - sint * mat[5], cost * mat[10] - sint * mat[6], cost * mat[11] - sint * mat[7],
        mat[12], mat[13], mat[14], mat[15]];
    } else if( v0 === 0 && v1 === 1 && v2 === 0 ) {
      return [cost * mat[0] - sint * mat[8], cost * mat[1] - sint * mat[9], cost * mat[2] - sint * mat[10], cost * mat[3] - sint * mat[11],
        mat[4], mat[5], mat[6], mat[7],
        cost * mat[8] + mat[0] * sint, cost * mat[9] + mat[1] * sint, cost * mat[10] + mat[2] * sint, cost * mat[11] + mat[3] * sint,
        mat[12], mat[13], mat[14], mat[15]];
    } else if( v0 === 0 && v1 === 0 && v2 === 1 ) {
      return [cost * mat[0] + mat[4] * sint, cost * mat[1] + mat[5] * sint, cost * mat[2] + mat[6] * sint, cost * mat[3] + mat[7] * sint,
        cost * mat[4] - sint * mat[0], cost * mat[5] - sint * mat[1], cost * mat[6] - sint * mat[2], cost * mat[7] - sint * mat[3],
        mat[8], mat[9], mat[10], mat[11], mat[12], mat[13], mat[14], mat[15]];
    } else if(v0 === 0 && v1 === 0 && v2 === 0) {
      return MathUtil.mat4copy(mat);
    } else {
      const iscale = 1.0 / Math.sqrt(v0 * v0 + v1 * v1 + v2 * v2);
      v0 *= iscale;
      v1 *= iscale;
      v2 *= iscale;
      const x2 = v0 * v0;
      const y2 = v1 * v1;
      const z2 = v2 * v2;
      const mcos = 1.0 - cost;
      const xy = v0 * v1;
      const xz = v0 * v2;
      const yz = v1 * v2;
      const xs = v0 * sint;
      const ys = v1 * sint;
      const zs = v2 * sint;
      v1 = mcos * x2;
      const v10 = mcos * yz;
      const v12 = mcos * z2;
      const v3 = mcos * xy;
      const v5 = mcos * xz;
      const v7 = mcos * y2;
      const v15 = cost + v1;
      const v16 = v3 + zs;
      const v17 = v5 - ys;
      const v18 = cost + v7;
      const v19 = v3 - zs;
      const v20 = v10 + xs;
      const v21 = cost + v12;
      const v22 = v5 + ys;
      const v23 = v10 - xs;
      return [
        mat[0] * v15 + mat[4] * v16 + mat[8] * v17, mat[1] * v15 + mat[5] * v16 + mat[9] * v17,
        mat[10] * v17 + mat[2] * v15 + mat[6] * v16, mat[11] * v17 + mat[3] * v15 + mat[7] * v16,
        mat[0] * v19 + mat[4] * v18 + mat[8] * v20, mat[1] * v19 + mat[5] * v18 + mat[9] * v20,
        mat[10] * v20 + mat[2] * v19 + mat[6] * v18, mat[11] * v20 + mat[3] * v19 + mat[7] * v18,
        mat[0] * v22 + mat[4] * v23 + mat[8] * v21, mat[1] * v22 + mat[5] * v23 + mat[9] * v21,
        mat[10] * v21 + mat[2] * v22 + mat[6] * v23, mat[11] * v21 + mat[3] * v22 + mat[7] * v23,
        mat[12], mat[13], mat[14], mat[15]];
    }
  },
  /**
   * Returns a 4 &times; 4 matrix representing a rotation transformation that rotates vectors
   * by the given rotation angle and around the given [axis of rotation]{@tutorial glmath}.
   * @param {Array<number>|number} angle The desired angle
   * to rotate in degrees.  If "v", "vy", and "vz" are omitted, this can
   * instead be a 4-element array giving the axis of rotation as the first three elements, followed by the angle
   * in degrees as the fourth element.
   * @param {Array<number>|number} v X-component of the point lying on the axis
   * of rotation.  If "vy" and "vz" are omitted, this can
   * instead be a 3-element array giving the axis
   * of rotation.
   * @param {number} vy Y-component of the point lying on the axis
   * of rotation.
   * @param {number} vz Z-component of the point lying on the axis
   * of rotation.
   * @returns {Array<number>} The resulting 4 &times; 4 matrix.
   * @example <caption>The following example rotates a vector,
   * "vec", about the z-axis by the given angle, "angle".</caption>
   * var newVector = MathUtil.mat4projectVec3(
   * MathUtil.mat4rotated(angle, 0, 0, 1), vec);
   */
  "mat4rotated":function(angle, v, vy, vz) {
    let v0;
    let v1;
    let v2;
    let ang;
    if(typeof vy !== "undefined" && typeof vz !== "undefined") {
      v0 = v;
      v1 = vy;
      v2 = vz;
      ang = angle;
    } else if(typeof v === "undefined") {
      v0 = angle[0];
      v1 = angle[1];
      v2 = angle[2];
      ang = angle[3];
    } else {
      v0 = v[0];
      v1 = v[1];
      v2 = v[2];
      ang = angle;
    }
    ang = (ang >= 0 && ang < 360 ? ang : ang % 360 + (ang < 0 ? 360 : 0)) * MathUtil.PiDividedBy180;
    let iscale;
    if(ang === 90 || ang === -270) {
      iscale = 1.0 / Math.sqrt(v0 * v0 + v1 * v1 + v2 * v2);
      v0 *= iscale;
      v1 *= iscale;
      v2 *= iscale;
      return [v0 * v0, v0 * v1 + v2, v0 * v2 - v1, 0.0,
        v1 * v0 - v2, v1 * v1, v1 * v2 + v0, 0.0,
        v2 * v0 + v1, v2 * v1 - v0, v2 * v2, 0.0,
        0.0, 0.0, 0.0, 1.0];
    }
    if(ang === -90 || ang === 270) {
      iscale = 1.0 / Math.sqrt(v0 * v0 + v1 * v1 + v2 * v2);
      v0 *= iscale;
      v1 *= iscale;
      v2 *= iscale;
      return [v0 * v0, v0 * v1 - v2, v0 * v2 + v1, 0.0,
        v1 * v0 + v2, v1 * v1, v1 * v2 - v0, 0,
        v2 * v0 - v1, v2 * v1 + v0, v2 * v2, 0,
        0.0, 0.0, 0.0, 1.0];
    }
    if(ang === 180 || ang === -180) {
      iscale = 1.0 / Math.sqrt(v0 * v0 + v1 * v1 + v2 * v2);
      v0 *= iscale;
      v1 *= iscale;
      v2 *= iscale;
      return [v0 * v0 * 2.0 - 1.0,
        v0 * v1 * 2.0,
        v0 * v2 * 2.0,
        0.0,
        v1 * v0 * 2.0,
        v1 * v1 * 2.0 - 1.0,
        v1 * v2 * 2.0,
        0.0,
        v2 * v0 * 2.0,
        v2 * v1 * 2.0,
        v2 * v2 * 2.0 - 1.0,
        0.0, 0.0, 0.0, 0.0, 1.0];
    }
    const cost = Math.cos(ang);
    const sint = ang >= 0 && ang < 6.283185307179586 ? ang <= 3.141592653589793 ? Math.sqrt(1.0 - cost * cost) : -Math.sqrt(1.0 - cost * cost) : Math.sin(ang);
    if( v0 === 1 && v1 === 0 && v2 === 0 ) {
      return[1, 0, 0, 0, 0, cost, sint, 0, 0, -sint, cost, 0, 0, 0, 0, 1];
    } else if( v0 === 0 && v1 === 1 && v2 === 0 ) {
      return [cost, 0, -sint, 0, 0, 1, 0, 0, sint, 0, cost, 0, 0, 0, 0, 1];
    } else if( v0 === 0 && v1 === 0 && v2 === 1 ) {
      return [cost, sint, 0, 0, -sint, cost, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1];
    } else if(v0 === 0 && v1 === 0 && v2 === 0) {
      return [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1];
    } else {
      iscale = 1.0 / Math.sqrt(v0 * v0 + v1 * v1 + v2 * v2);
      v0 *= iscale;
      v1 *= iscale;
      v2 *= iscale;
      const x2 = v0 * v0;
      const y2 = v1 * v1;
      const z2 = v2 * v2;
      const xy = v0 * v1;
      const xz = v0 * v2;
      const yz = v1 * v2;
      const xs = v0 * sint;
      const ys = v1 * sint;
      const zs = v2 * sint;
      const mcos = 1.0 - cost;
      v0 = mcos * xy;
      v1 = mcos * xz;
      v2 = mcos * yz;
      return [cost + mcos * x2, v0 + zs, v1 - ys, 0, v0 - zs, cost + mcos * y2, v2 + xs, 0, v1 + ys,
        v2 - xs, cost + mcos * z2, 0, 0, 0, 0, 1];
    }
  },
  /**
   * Multiplies a 4 &times; 4 matrix by a scaling transformation.
   * @param {Array<number>} mat 4 &times; 4 matrix to multiply.
   * @param {Array<number>|number} v3 Scale factor along the
   * x-axis. A scale factor can be negative, in which case the transformation
   * also causes reflection about the corresponding axis.  If "v3y" and "v3z" are omitted, this value can instead
   * be a 3-element array giving the scale factors along the X, Y, and
   * z-axes.
   * @param {number} v3y Scale factor along the y-axis.
   * @param {number} v3z Scale factor along the z-axis.
   * @returns {Array<number>} The resulting 4 &times; 4 matrix.
   */
  "mat4scale":function(mat, v3, v3y, v3z) {
    let scaleX;
    let scaleY;
    let scaleZ;
    if(typeof v3y !== "undefined" && typeof v3z !== "undefined") {
      scaleX = v3;
      scaleY = v3y;
      scaleZ = v3z;
    } else {
      scaleX = v3[0];
      scaleY = v3[1];
      scaleZ = v3[2];
    }
    return [
      mat[0] * scaleX, mat[1] * scaleX, mat[2] * scaleX, mat[3] * scaleX,
      mat[4] * scaleY, mat[5] * scaleY, mat[6] * scaleY, mat[7] * scaleY,
      mat[8] * scaleZ, mat[9] * scaleZ, mat[10] * scaleZ, mat[11] * scaleZ,
      mat[12], mat[13], mat[14], mat[15]
    ];
  },
  /**
   * Modifies a 4 &times; 4 matrix by multiplying it by a
   * scaling transformation.
   * @param {Array<number>} mat A 4 &times; 4 matrix.
   * @param {Array<number>|number} v3 Scale factor along the
   * x-axis. A scale factor can be negative, in which case the transformation
   * also causes reflection about the corresponding axis.  If "v3y" and "v3z" are omitted, this value can instead
   * be a 3-element array giving the scale factors along the X, Y, and
   * z-axes.
   * @param {number} [v3y] Scale factor along the y-axis.
   * @param {number} [v3z] Scale factor along the z-axis.
   * @returns {Array<number>} The same parameter as "mat".
   */
  "mat4scaleInPlace":function(mat, v3, v3y, v3z) {
    let x;
    let y;
    let z;
    if(typeof v3y !== "undefined" && typeof v3z !== "undefined") {
      x = v3;
      y = v3y;
      z = v3z;
    } else {
      x = v3[0];
      y = v3[1];
      z = v3[2];
    }
    mat[0] *= x;
    mat[1] *= x;
    mat[2] *= x;
    mat[3] *= x;
    mat[4] *= y;
    mat[5] *= y;
    mat[6] *= y;
    mat[7] *= y;
    mat[8] *= z;
    mat[9] *= z;
    mat[10] *= z;
    mat[11] *= z;
    return mat;
  },

  /**
   * Returns a 4 &times; 4 matrix representing a scaling transformation.
   * @param {Array<number>|number} v3 Scale factor along the
   * x-axis. A scale factor can be negative, in which case the transformation
   * also causes reflection about the corresponding axis.  If "v3y" and "v3z" are omitted, this value can instead
   * be a 3-element array giving the scale factors along the X, Y, and
   * z-axes.
   * @param {number} v3y Scale factor along the y-axis.
   * @param {number} v3z Scale factor along the z-axis.
   * @returns {Array<number>} The resulting 4 &times; 4 matrix.
   */
  "mat4scaled":function(v3, v3y, v3z) {
    if(typeof v3y !== "undefined" && typeof v3z !== "undefined") {
      return [v3, 0, 0, 0, 0, v3y, 0, 0, 0, 0, v3z, 0, 0, 0, 0, 1];
    } else {
      return [v3[0], 0, 0, 0, 0, v3[1], 0, 0, 0, 0, v3[2], 0, 0, 0, 0, 1];
    }
  },
  /**
   * Finds the six clipping planes of a view frustum defined
   * by a 4 &times; 4 matrix. These six planes together form the
   * shape of a "chopped-off" pyramid (or frustum).<p>
   * In this model, the "eye" is placed at the top
   * of the pyramid (before being chopped off), four planes are placed at the pyramid's
   * sides, one plane (the far plane) forms its base, and a
   * final plane (the near plane) is the pyramid's chopped
   * off top.
   * @param {Array<number>} matrix A 4 &times; 4 matrix. This will
   * usually be a projection-view matrix (projection matrix
   * multiplied by view matrix, in that order).
   * @returns {Array<Array<number>>} An array of six
   * 4-element arrays representing the six clipping planes of the
   * view frustum. In order, they are the left, right, top,
   * bottom, near, and far clipping planes. All six planes
   * will be normalized (see {@link MathUtil.planeNormalizeInPlace}).
   */
  "mat4toFrustumPlanes":function(matrix) {
    const frustum = [[], [], [], [], [], []];
    // Left clipping plane
    frustum[0] = MathUtil.planeNormalizeInPlace([
      matrix[3] + matrix[0],
      matrix[7] + matrix[4],
      matrix[11] + matrix[8],
      matrix[15] + matrix[12]
    ]);
    // Right clipping plane
    frustum[1] = MathUtil.planeNormalizeInPlace([
      matrix[3] - matrix[0],
      matrix[7] - matrix[4],
      matrix[11] - matrix[8],
      matrix[15] - matrix[12]
    ]);
    // Top clipping plane
    frustum[2] = MathUtil.planeNormalizeInPlace([
      matrix[3] - matrix[1],
      matrix[7] - matrix[5],
      matrix[11] - matrix[9],
      matrix[15] - matrix[13]
    ]);
    // Bottom clipping plane
    frustum[3] = MathUtil.planeNormalizeInPlace([
      matrix[3] + matrix[1],
      matrix[7] + matrix[5],
      matrix[11] + matrix[9],
      matrix[15] + matrix[13]
    ]);
    // Near clipping plane
    frustum[4] = MathUtil.planeNormalizeInPlace([
      matrix[3] + matrix[2],
      matrix[7] + matrix[6],
      matrix[11] + matrix[10],
      matrix[15] + matrix[14]
    ]);
    // Far clipping plane
    frustum[5] = MathUtil.planeNormalizeInPlace([
      matrix[3] - matrix[2],
      matrix[7] - matrix[6],
      matrix[11] - matrix[10],
      matrix[15] - matrix[14]
    ]);
    return frustum;
  },
  /**
   * Returns the upper-left part of a 4 &times; 4 matrix as a new
   * 3 &times; 3 matrix.
   * @param {Array<number>} m4 A 4 &times; 4 matrix.
   * @returns {Array<number>} The resulting 3 &times; 3 matrix.
   */
  "mat4toMat3":function(m4) {
    return [
      m4[0], m4[1], m4[2],
      m4[4], m4[5], m4[6],
      m4[8], m4[9], m4[10]
    ];
  },
  /**
   * Transforms a 4-element vector with a 4 &times; 4 matrix and returns
   * the transformed vector.<p>
   * Transforming a vector (<code>v</code>) with a matrix (<code>mat</code>)
   * is effectively done by breaking up <code>mat</code> into four 4-element vectors
   * (the first 4 elements make up the first vector, and so on), multiplying
   * each vector in <code>mat</code> by the corresponding component in
   * <code>v</code>, and adding up the resulting vectors (except <code>v</code>) to
   * get the transformed vector.
   * @param {Array<number>} mat A 4 &times; 4 matrix.
   * @param {Array<number>|number} v x-coordinate.
   * If "vy", "vz", and "vw" are omitted, this value can instead
   * be a 4-element array giving the X, Y, Z, and W coordinates.
   * @param {number} [vy] The Ycoordinate.
   * @param {number} [vz] The Zcoordinate.
   * @param {number} [vw] W coordinate. To transform a 3D
   * point, set W to 1 and divide the result's X, Y, and Z by the
   * result's W. To transform a 2D point, set Z to 0 and W to 1
   * and divide the result's X and Y by the result's W.
   * @returns {Array<number>} The transformed vector.
   */
  "mat4transform":function(mat, v, vy, vz, vw) {
    let x;
    let y;
    let z;
    let w;
    if(typeof vy !== "undefined" && typeof vz !== "undefined" &&
      typeof vw !== "undefined") {
      x = v;
      y = vy;
      z = vz;
      w = vw;
    } else {
      x = v[0];
      y = v[1];
      z = v[2];
      w = v[3];
    }
    return [x * mat[0] + y * mat[4] + z * mat[8] + w * mat[12],
      x * mat[1] + y * mat[5] + z * mat[9] + w * mat[13],
      x * mat[2] + y * mat[6] + z * mat[10] + w * mat[14],
      x * mat[3] + y * mat[7] + z * mat[11] + w * mat[15]];
  },
  /**
   * Transforms a 3-element vector with a 4 &times; 4 matrix as though it were
   * an affine transformation matrix (without perspective) and returns the transformed vector.
   * The effect is as though elements
   * 3, 7, 11, and 15 (counting from 0) of the matrix
   * were assumed to be (0, 0, 0, 1) instead of their actual values and as though the 3-element
   * vector had a fourth element valued at 1.<p>
   * For most purposes, use
   * the {@link MathUtil.mat4projectVec3} method instead, which supports
   * 4 &times; 4 matrices that may be in a perspective
   * projection (whose last row is not necessarily (0, 0, 0, 1)).
   * @param {Array<number>} mat A 4 &times; 4 matrix.
   * @param {Array<number>|number} v x-coordinate.
   * If "vy" and "vz" are omitted, this value can instead
   * be a 4-element array giving the x-, y-, and z-coordinates.
   * @param {number} [vy] The Ycoordinate.
   * @param {number} [vz] The Zcoordinate. To transform a 2D
   * point, set Z to 0.
   * @returns {Array<number>} The transformed 3-element vector.
   */
  "mat4transformVec3":function(mat, v, vy, vz) {
    let x;
    let y;
    let z;
    if(typeof vy !== "undefined" && typeof vz !== "undefined") {
      x = v;
      y = vy;
      z = vz;
    } else {
      x = v[0];
      y = v[1];
      z = v[2];
    }
    return [x * mat[0] + y * mat[4] + z * mat[8] + mat[12],
      x * mat[1] + y * mat[5] + z * mat[9] + mat[13],
      x * mat[2] + y * mat[6] + z * mat[10] + mat[14]];
  },
  /**
   * Multiplies a 4 &times; 4 matrix by a translation transformation.
   * @param {Array<number>} mat The matrix to multiply.
   * @param {Array<number>|number} v3 Translation along the
   * x-axis.  If "v3y" and "v3z" are omitted, this value can instead
   * be a 3-element array giving the translations along the X, Y, and
   * z-axes.
   * @param {number} v3y Translation along the y-axis.
   * @param {number} v3z Translation along the z-axis.
   * @returns {Array<number>} The resulting 4 &times; 4 matrix.
   */
  "mat4translate":function(mat, v3, v3y, v3z) {
    let x;
    let y;
    let z;
    if(typeof v3y !== "undefined" && typeof v3z !== "undefined") {
      x = v3;
      y = v3y;
      z = v3z;
    } else {
      x = v3[0];
      y = v3[1];
      z = v3[2];
    }
    return [
      mat[0], mat[1], mat[2], mat[3],
      mat[4], mat[5], mat[6], mat[7],
      mat[8], mat[9], mat[10], mat[11],
      mat[0] * x + mat[4] * y + mat[8] * z + mat[12],
      mat[1] * x + mat[5] * y + mat[9] * z + mat[13],
      mat[2] * x + mat[6] * y + mat[10] * z + mat[14],
      mat[3] * x + mat[7] * y + mat[11] * z + mat[15]
    ];
  },
  /**
   * Returns a 4 &times; 4 matrix representing a translation.
   * @param {Array<number>|number} v3 Translation along the
   * x-axis.  If "v3y" and "v3z" are omitted, this value can instead
   * be a 3-element array giving the translations along the X, Y, and
   * z-axes.
   * @param {number} v3y Translation along the y-axis.
   * @param {number} v3z Translation along the z-axis.
   * @returns {Array<number>} The resulting 4 &times; 4 matrix.
   */
  "mat4translated":function(v3, v3y, v3z) {
    let x;
    let y;
    let z;
    if(typeof v3y !== "undefined" && typeof v3z !== "undefined") {
      x = v3;
      y = v3y;
      z = v3z;
    } else {
      x = v3[0];
      y = v3[1];
      z = v3[2];
    }
    return [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, x, y, z, 1];
  },
  /**
   * Returns the transpose of a 4 &times; 4 matrix. (A transpose is a
   * matrix whose rows are converted to columns and vice versa.)
   * @param {Array<number>} m4 A 4 &times; 4 matrix.
   * @returns {Array<number>} The resulting 4 &times; 4 matrix.
   */
  "mat4transpose":function(m4) {
    return MathUtil.mat4transposeInPlace(MathUtil.mat4copy(m4));
  },
  /**
   * Transposes a 4 &times; 4 matrix in place without creating
   * a new matrix. (A transpose is a matrix whose rows
   * are converted to columns and vice versa.)
   * @param {Array<number>} mat A 4 &times; 4 matrix.
   * @returns {Array<number>} The parameter "mat".
   */
  "mat4transposeInPlace":function(mat) {
    let tmp = mat[1]; mat[1] = mat[4]; mat[4] = tmp;
    tmp = mat[2]; mat[2] = mat[8]; mat[8] = tmp;
    tmp = mat[3]; mat[3] = mat[12]; mat[12] = tmp;
    tmp = mat[6]; mat[6] = mat[9]; mat[9] = tmp;
    tmp = mat[7]; mat[7] = mat[13]; mat[13] = tmp;
    tmp = mat[11]; mat[11] = mat[14]; mat[14] = tmp;
    return mat;
  },
  /**
   * Creates a plane from a normal vector and a point on the plane.
   * @param {Array<number>} normal A three-element array identifying the plane's normal vector.
   * @param {Array<number>} point A three-element array identifying a point on the plane.
   * @returns {Array<number>} A four-element array describing the plane.
   */
  "planeFromNormalAndPoint":function(normal, point) {
    const d = -(normal[0] * point[0] + normal[1] * point[1] + normal[2] * point[2]);
    return [normal[0], normal[1], normal[2], d];
  },
  /**
   * Normalizes this plane so that its normal is a [unit vector]{@tutorial glmath},
   * unless all the normal's components are 0, and returns a new plane with the result.
   * The plane's distance will be divided by the
   * normal's length. Returns a new plane.
   * @param {Array<number>} plane A four-element array
   * defining the plane. The first three elements of the array
   * are the X, Y, and Z components of the plane's normal vector, and
   * the fourth element is the shortest distance from the plane
   * to the origin, or if negative, from the origin to the plane,
   * divided by the normal's length.
   * @returns {Array<number>} A normalized version of
   * the plane.
   * Note that due to rounding error, the length of the plane's normal might not be exactly equal to 1, and that the vector will remain unchanged if its length is 0 or extremely close to 0.
   */
  "planeNormalize":function(plane) {
    return MathUtil.planeNormalizeInPlace(MathUtil.vec4copy(plane));
  },
  /**
   * Normalizes this plane so that its normal is a [unit vector]{@tutorial glmath},
   * unless all the normal's components are 0, and sets this plane to the result.
   * The plane's distance will be divided by the
   * current normal's length.<p>
   * @param {Array<number>} plane A four-element array
   * defining the plane. The first three elements of the array
   * are the X, Y, and Z components of the plane's normal vector, and
   * the fourth element is the shortest distance from the plane
   * to the origin, or if negative, from the origin to the plane,
   * divided by the normal's length.
   * @returns {Array<number>} The parameter "plane".
   */
  "planeNormalizeInPlace":function(plane) {
    const x = plane[0];
    const y = plane[1];
    const z = plane[2];

    let len = Math.sqrt(x * x + y * y + z * z);
    if(len !== 0) {
      len = 1.0 / len;
      plane[0] *= len;
      plane[1] *= len;
      plane[2] *= len;
      plane[3] *= len;
    }
    return plane;
  },
  /**
   * Returns a quaternion that describes a rotation that undoes the given rotation (an "inverted" rotation); this is done by reversing the sign of the X, Y, and Z components (which describe the quaternion's [axis of rotation]{@tutorial glmath}). The return value won't necessarily be a [unit vector]{@tutorial glmath}.
   * @param {Array<number>} quat A quaternion, containing four elements.
   * @returns {Array<number>} Return value. */
  "quatConjugate":function(quat) {
    return [-quat[0], -quat[1], -quat[2], quat[3]];
  },
  /**
   * Generates a quaternion from a rotation transformation that rotates vectors
   * by the given rotation angle and around the given [axis of rotation]{@tutorial glmath},
   * @param {Array<number>|number} angle The desired angle
   * to rotate in degrees.  If "v", "vy", and "vz" are omitted, this can
   * instead be a 4-element array giving the axis
   * of rotation as the first three elements, followed by the angle
   * in degrees as the fourth element.
   * @param {Array<number>|number} v X-component of the point lying on the axis
   * of rotation.  If "vy" and "vz" are omitted, this can
   * instead be a 3-element array giving the axis
   * of rotation.
   * @param {number} vy Y-component of the point lying on the axis
   * of rotation.
   * @param {number} vz Z-component of the point lying on the axis
   * of rotation.
   * @returns {Array<number>} The generated quaternion.
   * A quaternion's first three elements (X, Y, Z) describe an
   * [axis of rotation]{@tutorial glmath} whose length is the sine of half of "angle",
   * and its fourth element (W) is the cosine of half of "angle".
   */
  "quatFromAxisAngle":function(angle, v, vy, vz) {
    let v0;
    let v1;
    let v2;
    let ang;
    if(typeof vy !== "undefined" && typeof vz !== "undefined") {
      v0 = v;
      v1 = vy;
      v2 = vz;
      ang = (angle >= 0 && angle < 360 ? angle : angle % 360 + (angle < 0 ? 360 : 0)) * MathUtil.PiDividedBy360;
    } else if(typeof v === "undefined") {
      v0 = angle[0];
      v1 = angle[1];
      v2 = angle[2];
      ang = angle[3];
      ang = (angle >= 0 && angle < 360 ? angle : angle % 360 + (angle < 0 ? 360 : 0)) * MathUtil.PiDividedBy360;
    } else {
      v0 = v[0];
      v1 = v[1];
      v2 = v[2];
      ang = (angle >= 0 && angle < 360 ? angle : angle % 360 + (angle < 0 ? 360 : 0)) * MathUtil.PiDividedBy360;
    }
    const cost = Math.cos(ang);
    const sint = ang >= 0 && ang < 6.283185307179586 ? ang <= 3.141592653589793 ? Math.sqrt(1.0 - cost * cost) : -Math.sqrt(1.0 - cost * cost) : Math.sin(ang);
    const vec = MathUtil.vec3normalizeInPlace([v0, v1, v2]);
    const ret = [vec[0], vec[1], vec[2], cost];
    ret[0] *= sint;
    ret[1] *= sint;
    ret[2] *= sint;
    return ret;
  },
  /**
   * Generates a quaternion from the vector rotation described in a 4 &times; 4 matrix.
   * The upper 3 &times; 3 portion of the matrix is used for this calculation.
   * The results are undefined if the matrix includes any transformation
   * other than rotation.
   * @param {Array<number>} m A 4 &times; 4 matrix.
   * @returns {Array<number>} The resulting quaternion.
   */
  "quatFromMat4":function(m) {
    const ret = [];
    const xy = m[1];
    const xz = m[2];
    const yx = m[4];
    const yz = m[6];
    const zx = m[8];
    const zy = m[9];
    const trace = m[0] + m[5] + m[10];
    let s;
    let t;
    if (trace >= 0.0) {
      s = Math.sqrt(trace + 1.0) * 0.5;
      t = 0.25 / s;
      ret[0] = (yz - zy) * t;
      ret[1] = (zx - xz) * t;
      ret[2] = (xy - yx) * t;
      ret[3] = s;
    } else if(m[0] > m[5] && m[0] > m[10]) {
      // s=4*x
      s = Math.sqrt(1.0 + m[0] - m[5] - m[10]) * 0.5;
      t = 0.25 / s;
      ret[0] = s;
      ret[1] = (yx + xy) * t;
      ret[2] = (xz + zx) * t;
      ret[3] = (yz - zy) * t;
    } else if(m[5] > m[10]) {
      // s=4*y
      s = Math.sqrt(1.0 + m[5] - m[0] - m[10]) * 0.5;
      t = 0.25 / s;
      ret[0] = (yx + xy) * t;
      ret[1] = s;
      ret[2] = (zy + yz) * t;
      ret[3] = (zx - xz) * t;
    } else{
      // s=4*z
      s = Math.sqrt(1.0 + m[10] - m[0] - m[5]) * 0.5;
      t = 0.25 / s;
      ret[0] = (zx + xz) * t;
      ret[1] = (zy + yz) * t;
      ret[2] = s;
      ret[3] = (xy - yx) * t;
    }
    return ret;
  },
  /*
   * Generates a quaternion from pitch, yaw and roll angles (or <i>Tait&ndash;Bryan angles</i>).
   * See "Axis of Rotation" in "{@tutorial glmath}" for the meaning of each angle.
   * @param {number} pitchDegrees Vector rotation about the x-axis (upward or downward turn), in degrees.
   * This can instead be a 3-element
   * array giving the rotation about the x-axis, y-axis, and z-axis,
   * respectively.
   * @param {number} yawDegrees Vector rotation about the y-axis (left or right turn), in degrees.
   * May be null or omitted if "pitchDegrees" is an array.
   * @param {number} rollDegrees Vector rotation about the z-axis (swaying side by side), in degrees.
   * May be null or omitted if "pitchDegrees" is an array.
   * @param {number} [mode] Specifies the order in which the rotations will occur (in terms of their effect).
   * This is one of the {@link MathUtil} constants such as {@link MathUtil.LocalPitchYawRoll}
   * and {@link MathUtil.GlobalYawRollPitch}. If null, undefined, or omitted, the default is {@link MathUtil.GlobalRollPitchYaw}.
   * The constants starting with <code>Global</code>
   * describe a vector rotation in the order given, each about the original axes (these angles are also called <i>extrinsic</i>
   * angles). The constants starting with <code>Local</code> describe a vector rotation in the order given,
   * where the second and third rotations occur around the rotated object's new axes
   * and not necessarily the original axes (these angles are also called <i>intrinsic</i>
   * angles). The order of <code>Local</code> rotations has the same result as the reversed
   * order of <code>Global</code> rotations and vice versa.
   * @returns {Array<number>} The generated quaternion.
   */
  "quatFromTaitBryan":function(pitchDegrees, yawDegrees, rollDegrees, mode) {
    let rollRad;
    let pitchRad;
    let yawRad;
    if(typeof mode === "undefined" || mode === null)mode = MathUtil.GlobalRollPitchYaw;
    if(mode < 0 || mode >= 6)throw new Error("invalid mode");
    if(pitchDegrees.constructor === Array) {
      rollRad = (pitchDegrees[2] >= 0 && pitchDegrees[2] < 360 ? pitchDegrees[2] : pitchDegrees[2] % 360 + (pitchDegrees[2] < 0 ? 360 : 0)) * MathUtil.PiDividedBy360;
      pitchRad = (pitchDegrees[0] >= 0 && pitchDegrees[0] < 360 ? pitchDegrees[0] : pitchDegrees[0] % 360 + (pitchDegrees[0] < 0 ? 360 : 0)) * MathUtil.PiDividedBy360;
      yawRad = (pitchDegrees[1] >= 0 && pitchDegrees[1] < 360 ? pitchDegrees[1] : pitchDegrees[1] % 360 + (pitchDegrees[1] < 0 ? 360 : 0)) * MathUtil.PiDividedBy360;
    } else {
      rollRad = (rollDegrees >= 0 && rollDegrees < 360 ? rollDegrees : rollDegrees % 360 + (rollDegrees < 0 ? 360 : 0)) * MathUtil.PiDividedBy360;
      pitchRad = (pitchDegrees >= 0 && pitchDegrees < 360 ? pitchDegrees : pitchDegrees % 360 + (pitchDegrees < 0 ? 360 : 0)) * MathUtil.PiDividedBy360;
      yawRad = (yawDegrees >= 0 && yawDegrees < 360 ? yawDegrees : yawDegrees % 360 + (yawDegrees < 0 ? 360 : 0)) * MathUtil.PiDividedBy360;
    }
    const py = Math.cos(pitchRad);
    const px = pitchRad >= 0 && pitchRad < 6.283185307179586 ? pitchRad <= 3.141592653589793 ? Math.sqrt(1.0 - py * py) : -Math.sqrt(1.0 - py * py) : Math.sin(pitchRad);
    const yy = Math.cos(yawRad);
    const yx = yawRad >= 0 && yawRad < 6.283185307179586 ? yawRad <= 3.141592653589793 ? Math.sqrt(1.0 - yy * yy) : -Math.sqrt(1.0 - yy * yy) : Math.sin(yawRad);
    const ry = Math.cos(rollRad);
    const rx = rollRad >= 0 && rollRad < 6.283185307179586 ? rollRad <= 3.141592653589793 ? Math.sqrt(1.0 - ry * ry) : -Math.sqrt(1.0 - ry * ry) : Math.sin(rollRad);
    let t8;
    let t7;
    if(mode === MathUtil.GlobalPitchYawRoll || mode === MathUtil.GlobalPitchRollYaw) {
      t7 = [rx * yx, ry * yx, rx * yy, ry * yy];
      if(mode === MathUtil.GlobalPitchYawRoll)t7[0] = -t7[0];
      t8 = [t7[3] * px + t7[0] * py, t7[1] * py + t7[2] * px, t7[2] * py - t7[1] * px, t7[3] * py - t7[0] * px];
    } else if(mode === MathUtil.GlobalYawPitchRoll || mode === MathUtil.GlobalYawRollPitch) {
      t7 = [ry * px, rx * px, rx * py, ry * py];
      if(mode === MathUtil.GlobalYawRollPitch)t7[1] = -t7[1];
      t8 = [t7[0] * yy - t7[2] * yx, t7[3] * yx + t7[1] * yy, t7[2] * yy + t7[0] * yx, t7[3] * yy - t7[1] * yx];
    } else {
      t7 = [yy * px, yx * py, yx * px, yy * py];
      if(mode === MathUtil.GlobalRollPitchYaw)t7[2] = -t7[2];
      t8 = [t7[0] * ry + t7[1] * rx, t7[1] * ry - t7[0] * rx, t7[3] * rx + t7[2] * ry, t7[3] * ry - t7[2] * rx];
    }
    return t8;
  },
  /*
   * XXX: Has a logic error but I can't see it. The return value of
   * the method as currently written, when passed to quatFromTaitBryan,
   * will return the correct quaternion but with the wrong signs.
   * https://github.com/peteroupc/html3dutil/issues/8
   * ----
   * Converts this quaternion to the same version of the rotation
   * in the form of pitch, yaw, and roll angles (or <i>Tait&ndash;Bryan angles</i>).
   * @param {Array<number>} a A quaternion. Should be a [unit vector]{@tutorial glmath}.
   * @param {number} [mode] Specifies the order in which the rotations will occur
   * (in terms of their effect, not in terms of how they will be returned by this method).
   * This is one of the {@link MathUtil} constants such as {@link MathUtil.LocalPitchYawRoll}
   * and {@link MathUtil.GlobalYawRollPitch}. If null, undefined, or omitted, the default is {@link MathUtil.GlobalRollPitchYaw}.
   * The constants starting with <code>Global</code>
   * describe a vector rotation in the order given, each about the original axes (these angles are also called <i>extrinsic</i>
   * angles). The constants starting with <code>Local</code> describe a vector rotation in the order given,
   * where the second and third rotations occur around the rotated object's new axes
   * and not necessarily the original axes (these angles are also called <i>intrinsic</i>
   * angles). The order of <code>Local</code> rotations has the same result as the reversed
   * order of <code>Global</code> rotations and vice versa.
   * @returns {Array<number>} A 3-element array containing the
   * pitch, yaw, and roll angles (x-, y-, and z-axes angles), in that order and in degrees, by which to rotate vectors.
   * See "Axis of Rotation" in "{@tutorial glmath}" for the meaning of each angle.
  "quatToTaitBryan":function(a, mode) {
    const c0 = a[3];
    let c1;
    let c2;
    let c3;
    let e = 1;
    if(typeof mode === "undefined" || mode === null)mode = MathUtil.GlobalRollPitchYaw;
    if(mode < 0 || mode >= 6)throw new Error("invalid mode");
    if(mode === MathUtil.GlobalRollPitchYaw) {
      c1 = a[1]; c2 = a[0]; c3 = a[2];
      e = -1;
    } else if(mode === MathUtil.GlobalPitchYawRoll) {
      c1 = a[2]; c2 = a[1]; c3 = a[0];
      e = -1;
    } else if(mode === MathUtil.GlobalPitchRollYaw) {
      c1 = a[1]; c2 = a[2]; c3 = a[0];
    } else if(mode === MathUtil.GlobalYawPitchRoll) {
      c1 = a[2]; c2 = a[0]; c3 = a[1];
    } else if(mode === MathUtil.GlobalYawRollPitch) {
      c1 = a[0]; c2 = a[2]; c3 = a[1];
      e = -1;
    } else {
      c1 = a[0]; c2 = a[1]; c3 = a[2];
    }
    const sq1 = c1 * c1;
    const sq2 = c2 * c2;
    const sq3 = c3 * c3;
    let e1 = Math.atan2(2 * (c0 * c1 - e * c2 * c3), 1 - (sq1 + sq2) * 2);
    e1 *= MathUtil.Num180DividedByPi;
    let sine = 2 * (c0 * c2 + e * c1 * c3);
    if(sine > 1.0)sine = 1.0; // for stability
    if(sine < -1.0)sine = -1.0; // for stability
    let e2 = Math.asin(sine);
    let e3 = Math.atan2(2 * (c0 * c3 - e * c1 * c2), 1 - (sq2 + sq3) * 2);
    e2 *= MathUtil.Num180DividedByPi;
    e3 *= MathUtil.Num180DividedByPi;
    // Singularity near the poles
    if(Math.abs(e2 - 90) < 0.000001 ||
      Math.abs(e2 + 90) < 0.000001) {
      e3 = 0;
      e1 = Math.atan2(c1, c0) * MathUtil.Num180DividedByPi;
      if(isNaN(e1))e1 = 0;
    }
    // Return the pitch/yaw/roll angles in the standard order
    const angles = [];
    if(mode === MathUtil.GlobalRollPitchYaw) {
      angles[0] = e2; angles[1] = e1; angles[2] = e3;
    } else if(mode === MathUtil.GlobalPitchYawRoll) {
      angles[0] = e3; angles[1] = e2; angles[2] = e1;
    } else if(mode === MathUtil.GlobalPitchRollYaw) {
      angles[0] = e3; angles[1] = e1; angles[2] = e2;
    } else if(mode === MathUtil.GlobalYawPitchRoll) {
      angles[0] = e2; angles[1] = e3; angles[2] = e1;
    } else if(mode === MathUtil.GlobalYawRollPitch) {
      angles[0] = e1; angles[1] = e3; angles[2] = e2;
    } else {
      angles[0] = e1; angles[1] = e2; angles[2] = e3;
    }
    return angles;
  },
  */
  /**
   * Generates a quaternion describing a rotation between
   * two 3-element vectors. The quaternion
   * will describe the rotation required to rotate
   * the ray described in the first vector toward the ray described
   * in the second vector. The vectors need not be unit vectors.
   * @param {Array<number>} vec1 The first 3-element vector.
   * @param {Array<number>} vec2 The second 3-element vector.
   * @returns {Array<number>} The generated quaternion, which
   * will be a unit vector.
   */
  "quatFromVectors":function(vec1, vec2) {
    let ret = MathUtil.vec3cross(vec1, vec2);
    if(MathUtil.vec3dot(ret, ret) < 1e-9) {
      // The vectors are parallel or close to parallel; there are two possible cases
      const dot = MathUtil.vec3dot(vec1, vec2);
      if(dot > 0) {
        // The vectors point in the same direction or almost so
        return [0, 0, 0, 1];
      } else {
        // The vectors point in opposite directions
        ret = MathUtil.vec3perp(vec1);
        ret[3] = 0;
      }
    } else {
      let vecLengths = MathUtil.vec3length(vec1) * MathUtil.vec3length(vec2);
      if(vecLengths === 0)vecLengths = 1; // degenerate case
      ret[3] = vecLengths + MathUtil.vec3dot(vec1, vec2);
    }
    return MathUtil.quatNormalizeInPlace(ret);
  },
  /** Returns the identity quaternion of multiplication, (0, 0, 0, 1).
   * @returns {Array<number>} Return value.
   */
  "quatIdentity":function() {
    return [0, 0, 0, 1];
  },
  /**
   * Returns a quaternion that describes a rotation that undoes the given rotation (an "inverted" rotation) and is converted to a [unit vector]{@tutorial glmath}.
   * @param {Array<number>} quat A quaternion, containing four elements.
   * @returns {Array<number>} Return value.
   * @see {@link MathUtil.quatConjugate}
   */
  "quatInvert":function(quat) {
    const lsq = 1.0 / MathUtil.quatDot(quat, quat);
    return MathUtil.vec4scaleInPlace(
      MathUtil.quatConjugate(quat), lsq);
  },
  /**
   * Returns whether this quaternion is the identity quaternion, (0, 0, 0, 1).
   * @param {Array<number>} quat A quaternion, containing four elements.
   * @returns {boolean} Return value.
   */
  "quatIsIdentity":function(quat) {
    return quat[0] === 0 && quat[1] === 0 && quat[2] === 0 && quat[3] === 1;
  },
  /**
   * Multiplies two quaternions, creating a composite rotation.
   * The quaternions are multiplied such that the second quaternion's
   * rotation happens before the first quaternion's rotation when applied
   * in the global coordinate frame.<p>
   * If both quaternions are unit vectors, the resulting
   * quaternion will also be a unit vector. However, for best results, you should
   * normalize the quaternions every few multiplications (using
   * {@link MathUtil.quatNormalize} or {@link MathUtil.quatNormalizeInPlace}), since successive
   * multiplications can cause rounding errors.<p>
   * Quaternion multiplication is not commutative except in the last component
   * of the resulting quaternion, since the definition of quaternion multiplication
   * includes taking a cross product of <code>a</code>'s and <code>b</code>'s first three components,
   * in that order, and the cross product is not commutative (see also {@link MathUtil.vec3cross}).
   * @param {Array<number>} a The first quaternion.
   * @param {Array<number>} b The second quaternion.
   * @returns {Array<number>} The resulting quaternion.
   */
  "quatMultiply":function(a, b) {
    return [
      a[3] * b[0] + a[0] * b[3] + a[1] * b[2] - a[2] * b[1],
      a[3] * b[1] + a[1] * b[3] + a[2] * b[0] - a[0] * b[2],
      a[3] * b[2] + a[2] * b[3] + a[0] * b[1] - a[1] * b[0],
      a[3] * b[3] - a[0] * b[0] - a[1] * b[1] - a[2] * b[2]];
  },
  /**
   * Returns a quaternion that lies along the shortest path between the
   * given two quaternion rotations, using a linear interpolation function, and converts
   * it to a [unit vector]{@tutorial glmath}.
   * This is called a normalized linear interpolation, or "nlerp".<p>
   * Because the shortest path is curved, not straight, this method
   * will generally not interpolate at constant velocity;
   * however, the difference in this velocity when interpolating is
   * rarely noticeable and this method is generally faster than
   * the {@link MathUtil.quatSlerp} method.
   * @param {Array<number>} q1 The first quaternion. Must be a unit vector.
   * @param {Array<number>} q2 The second quaternion. Must be a unit vector.
   * @param {number} factor A value that usually ranges from 0 through 1. Closer to 0 means
   * closer to q1, and closer to 1 means closer to q2.
   * @returns {Array<number>} The interpolated quaternion,
   * which will be a unit vector.
   */
  "quatNlerp":function(q1, q2, factor) {
    const t1 = 1.0 - factor;
    const t2 = q1[0] * t1;
    const t3 = q1[1] * t1;
    const t4 = q1[2] * t1;
    const t5 = q1[3] * t1;
    const t6 = q2[0] * factor;
    const t7 = q2[1] * factor;
    const t8 = q2[2] * factor;
    const t9 = q2[3] * factor;
    const t10 = q1[0] * q2[0] + q1[1] * q2[1] + q1[2] * q2[2] + q1[3] * q2[3];
    if (t10 < 0.0) {
      return MathUtil.quatNormalizeInPlace([t2 - t6, t3 - t7, t4 - t8, t5 - t9]);
    } else {
      return MathUtil.quatNormalizeInPlace([t2 + t6, t3 + t7, t4 + t8, t5 + t9]);
    }
  },
  /**
   * Multiplies a quaternion by a rotation transformation that rotates vectors
   * by the given rotation angle and around the given [axis of rotation]{@tutorial glmath}.
   * The result is such that the angle-axis
   * rotation happens before the quaternion's rotation when applied
   * in the global coordinate frame.<p>
   * This method is equivalent to the following (see also {@link MathUtil.quatMultiply}):<pre>
   * return quatMultiply(quat,quatFromAxisAngle(angle,v,vy,vz));
   * </pre>
   * @param {Array<number>} quat Quaternion to rotate.
   * @param {Array<number>|number} angle The desired angle
   * to rotate in degrees.  If "v", "vy", and "vz" are omitted, this can
   * instead be a 4-element array giving the axis
   * of rotation as the first three elements, followed by the angle
   * in degrees as the fourth element.
   * @param {Array<number>|number} v X-component of the point lying on the axis
   * of rotation.  If "vy" and "vz" are omitted, this can
   * instead be a 3-element array giving the axis
   * of rotation.
   * @param {number} vy Y-component of the point lying on the axis
   * of rotation.
   * @param {number} vz Z-component of the point lying on the axis
   * of rotation.
   * @returns {Array<number>} The resulting quaternion.
   */
  "quatRotate":function(quat, angle, v, vy, vz) {
    return MathUtil.quatMultiply(quat,
      MathUtil.quatFromAxisAngle(angle, v, vy, vz));
  },
  /**
   * Returns a quaternion that lies along the shortest path between the
   * given two quaternion rotations, using a spherical interpolation function.
   * This is called spherical linear interpolation, or "slerp". (A spherical
   * interpolation finds the shortest angle between the two quaternions -- which
   * are treated as 4D vectors -- and then finds a vector with a smaller angle
   * between it and the first quaternion.  The "factor" parameter specifies
   * how small the new angle will be relative to the original angle.)<p>
   * This method will generally interpolate at constant velocity; however,
   * this method is not commutative (that is, the order in which the quaternions are given
   * matters), unlike [quatNlerp]{@link MathUtil.quatNlerp}, making it
   * unsuitable for blending multiple quaternion rotations,
   * and this method is generally more computationally expensive
   * than the [quatNlerp]{@link MathUtil.quatNlerp} method.
   * @param {Array<number>} q1 The first quaternion. Must be a [unit vector]{@tutorial glmath}.
   * @param {Array<number>} q2 The second quaternion. Must be a unit vector.
   * @param {number} factor A value that usually ranges from 0 through 1. Closer to 0 means
   * closer to q1, and closer to 1 means closer to q2.
   * @returns {Array<number>} The interpolated quaternion.
   * @see ["Understanding Slerp, Then Not Using It", Jonathan Blow](http://number-none.com/product/Understanding%20Slerp,%20Then%20Not%20Using%20It/),
   * for additional background
   */
  "quatSlerp":function(q1, q2, factor) {
    let cosval = MathUtil.quatDot(q1, q2);
    let qd = q2;
    if(cosval < 0) {
      qd = [-q2[0], -q2[1], -q2[2], -q2[3]];
      cosval = MathUtil.quatDot(q1, qd);
    }
    let angle = 0;
    if(cosval > -1) {
      if(cosval < 1) {
        angle = Math.acos(cosval);
        if(angle === 0)
          return MathUtil.quatNlerp(q1, q2, factor);
      } else {
        return MathUtil.quatNlerp(q1, q2, factor);
      }
    } else {
      angle = Math.PI;
    }
    const s = Math.sin(angle);
    const sinv = 1.0 / s;
    const c1 = Math.sin((1.0 - factor) * angle) * sinv;
    const c2 = Math.sin(factor * angle) * sinv;
    return [
      q1[0] * c1 + qd[0] * c2,
      q1[1] * c1 + qd[1] * c2,
      q1[2] * c1 + qd[2] * c2,
      q1[3] * c1 + qd[3] * c2
    ];
  },
  /**
   * Calculates the vector rotation for this quaternion in the form
   * of the angle to rotate the vector by and an [axis of rotation]{@tutorial glmath} to
   * rotate that vector around.
   * @param {Array<number>} a A quaternion. Must be a [unit vector]{@tutorial glmath}.
   * @returns {Array<number>} A 4-element array giving the axis
   * of rotation as the first three elements, followed by the angle
   * in degrees as the fourth element. If "a" is a unit vector, the axis
   * of rotation will be a unit vector.
   */
  "quatToAxisAngle":function(a) {
    const w = a[3];
    let d = 1.0 - w * w;
    if(d > 0) {
      d = 1 / Math.sqrt(d);
      return [a[0] * d, a[1] * d, a[2] * d,
        Math.acos(Math.min(1.0, Math.max(-1.0, w))) * MathUtil.Num360DividedByPi];
    } else {
      return [0, 1, 0, 0];
    }
  },
  /**
   * Generates a 4 &times; 4 matrix describing the rotation
   * described by this quaternion.
   * @param {Array<number>} quat A quaternion, containing four elements.
   * @returns {Array<number>} The generated 4 &times; 4 matrix.
   */
  "quatToMat4":function(quat) {
    const tx = 2.0 * quat[0];

    const ty = 2.0 * quat[1];

    const tz = 2.0 * quat[2];

    const xx = tx * quat[0];

    const xy = tx * quat[1];

    const xz = tx * quat[2];

    const yy = ty * quat[1];

    const yz = tz * quat[1];

    const zz = tz * quat[2];

    const wx = tx * quat[3];

    const wy = ty * quat[3];

    const wz = tz * quat[3];
    return [
      1 - (yy + zz), xy + wz, xz - wy, 0,
      xy - wz, 1 - (xx + zz), yz + wx, 0,
      xz + wy, yz - wx, 1 - (xx + yy), 0,
      0, 0, 0, 1
    ];
  },
  /**
   * Transforms a 3- or 4-element vector using a
   * quaternion's vector rotation.
   * @param {Array<number>} q A quaternion describing
   * the rotation.
   * @param {Array<number>} v A 3- or 4-element vector to
   * transform. The fourth element, if any, is ignored.
   * @returns {Array<number>} A 4-element vector representing
   * the transformed vector. The fourth element will be 1.0.
   * If the input vector has 3 elements, a 3-element vector will
   * be returned instead.
   */
  "quatTransform":function(q, v) {
    const t1 = q[1] * v[2] - q[2] * v[1] + v[0] * q[3];
    const t2 = q[2] * v[0] - q[0] * v[2] + v[1] * q[3];
    const t3 = q[0] * v[1] - q[1] * v[0] + v[2] * q[3];
    const t4 = q[0] * v[0] + q[1] * v[1] + q[2] * v[2];
    if(v.length === 3) {
      return [t1 * q[3] - (t2 * q[2] - t3 * q[1]) + q[0] * t4,
        t2 * q[3] - (t3 * q[0] - t1 * q[2]) + q[1] * t4,
        t3 * q[3] - (t1 * q[1] - t2 * q[0]) + q[2] * t4];
    }
    return [t1 * q[3] - (t2 * q[2] - t3 * q[1]) + q[0] * t4,
      t2 * q[3] - (t3 * q[0] - t1 * q[2]) + q[1] * t4,
      t3 * q[3] - (t1 * q[1] - t2 * q[0]) + q[2] * t4, 1.0];
  },
  /**
   * Returns a new 2-element
   * vector with the absolute value of each of its components.
   * @param {Array<number>} a A 2-element vector.
   * @returns {Array<number>} The resulting 2-element vector.
   */
  "vec2abs":function(a) {
    return [Math.abs(a[0]), Math.abs(a[1])];
  },
  /**
   * Sets each component of the given 2-element
   * vector to its absolute value.
   * @param {Array<number>} a A 2-element vector.
   * @returns {Array<number>} The vector "a".
   */
  "vec2absInPlace":function(a) {
    a[0] = Math.abs(a[0]);
    a[1] = Math.abs(a[1]);
    return a;
  },
  /**
   * Adds two 2-element vectors and returns a new
   * vector with the result. Adding two vectors
   * is the same as adding each of their components.
   * The resulting vector:<ul>
   * <li>describes a straight-line path for the
   * combined paths described by the given vectors, in either order, and
   * <li>will come "between" the two vectors given (at their shortest angle) if all three start
   * at the same position.</ul>
   * @param {Array<number>} a The first 2-element vector.
   * @param {Array<number>} b The second 2-element vector.
   * @returns {Array<number>} The resulting 2-element vector.
   */
  "vec2add":function(a, b) {
    return [a[0] + b[0], a[1] + b[1]];
  },
  /**
   * Adds two 2-element vectors and stores
   * the result in the first vector. Adding two vectors
   * is the same as adding each of their components.
   * The resulting vector:<ul>
   * <li>describes a straight-line path for the
   * combined paths described by the given vectors, in either order, and
   * <li>will come "between" the two vectors given (at their shortest angle) if all three start
   * at the same position.</ul>
   * @param {Array<number>} a The first 2-element vector.
   * @param {Array<number>} b The second 2-element vector.
   * @returns {Array<number>} The parameter "a"
   */
  "vec2addInPlace":function(a, b) {
    // Use variables in case a and b are the same
    const b0 = b[0];
    const b1 = b[1];
    a[0] += b0;
    a[1] += b1;
    return a;
  },
  /**
   * Assigns the values of a 2-element vector into another
   * 2-element vector.
   * @param {Array<number>} dst The 2-element vector to
   * assign to.
   * @param {Array<number>} src The 2-element vector whose
   * values will be copied.
   * @returns {Array<number>} The parameter "dst"
   */
  "vec2assign":function(dst, src) {
    dst[0] = src[0];
    dst[1] = src[1];
    return dst;
  },
  /**
   * Returns a 2-element vector in which each element of the given 2-element vector is clamped
   * so it's not less than one value or greater than another value.
   * @param {Array<number>} a The vector to clamp.
   * @param {number} min Lowest possible value. Should not be greater than "max".
   * @param {number} max Highest possible value. Should not be less than "min".
   * @returns {Array<number>} The resulting vector. */
  "vec2clamp":function(a, min, max) {
    return MathUtil.vec2clampInPlace(MathUtil.vec2copy(a), min, max);
  },
  /**
   * Clamps each element of the given 2-element vector
   * so it's not less than one value or greater than another value.
   * @param {Array<number>} a The vector to clamp.
   * @param {number} min Lowest possible value. Should not be greater than "max".
   * @param {number} max Highest possible value. Should not be less than "min".
   * @returns {Array<number>} The resulting vector. */
  "vec2clampInPlace":function(a, min, max) {
    const x = Math.min(max, Math.max(min, a[0]));
    const y = Math.min(max, Math.max(min, a[1]));
    a[0] = x;
    a[1] = y;
    return a;
  },
  /**
   * Returns a copy of a 2-element vector.
   * @param {Array<number>} vec A 2-element vector.
   * @returns {Array<number>} Return value. */
  "vec2copy":function(vec) {
    return [vec[0], vec[1]];
  },
  /**
   * Finds the straight-line distance from one three-element vector
   * to another, treating both as 3D points.
   * @param {Array<number>} vecFrom The first 2-element vector.
   * @param {Array<number>} vecTo The second 2-element vector.
   * @returns {number} The distance between the two vectors.
   */
  "vec2dist":function(vecFrom, vecTo) {
    return MathUtil.vec2length(MathUtil.vec2sub(vecFrom, vecTo));
  },
  /**
   * Finds the dot product of two 2-element vectors. It's the
   * sum of the products of their components (for example, <b>a</b>'s X times
   * <b>b</b>'s X).<p> For properties of the dot product, see {@link MathUtil.vec3dot}.
   * @param {Array<number>} a The first 2-element vector.
   * @param {Array<number>} b The second 2-element vector.
   * @returns {number} A number representing the dot product.
   * @example <caption>The following shows a fast way to compare
   * a vector's length using the dot product.</caption>
   * // Check if the vector's length squared is less than 20 units squared
   * if(MathUtil.vec2dot(vector, vector)<20*20) {
   * // The vector's length is shorter than 20 units
   * }
   */
  "vec2dot":function(a, b) {
    return a[0] * b[0] + a[1] * b[1];
  },
  /**
   * Returns the distance of this 2-element vector from the origin,
   * also known as its <i>length</i> or <i>magnitude</i>.
   * It's the same as the square root of the sum of the squares
   * of its components.<p>
   * Note that if vectors are merely sorted or compared by their lengths (and
   * those lengths are not added or multiplied together or the like),
   * it's faster to sort or compare them by the squares of their lengths (to find
   * the square of a 2-element vector's length, call {@link MathUtil.vec2dot}
   * passing the same vector as both of its arguments).
   * @param {Array<number>} a A 2-element vector.
   * @returns {number} Return value. */
  "vec2length":function(a) {
    const dx = a[0];
    const dy = a[1];
    return Math.sqrt(dx * dx + dy * dy);
  },
  /**
   * Does a linear interpolation between two 2-element vectors;
   * returns a new vector.
   * @param {Array<number>} v1 The first vector to interpolate.
   * The interpolation will occur on each component of this vector and v2.
   * @param {Array<number>} v2 The second vector to interpolate.
   * @param {number} factor A value that usually ranges from 0 through 1. Closer to 0 means
   * closer to v1, and closer to 1 means closer to v2.<br>For a nonlinear
   * interpolation, define a function that takes a value that usually ranges from 0 through 1 and returns
   * a value generally ranging from 0 through 1, and pass the result of that
   * function to this method. For examples, see {@link MathUtil.vec3lerp}.
   * @returns {Array<number>} The interpolated vector.
   */
  "vec2lerp":function(v1, v2, factor) {
    return [
      v1[0] + (v2[0] - v1[0]) * factor,
      v1[1] + (v2[1] - v1[1]) * factor
    ];
  },
  /**
   * Multiplies each of the components of two 2-element vectors and returns a new
   * vector with the result.
   * @param {Array<number>} a The first 2-element vector.
   * @param {Array<number>} b The second 2-element vector.
   * @returns {Array<number>} The resulting 2-element vector.
   */
  "vec2mul":function(a, b) {
    return [a[0] * b[0], a[1] * b[1]];
  },
  /**
   * Multiplies each of the components of two 2-element vectors and stores
   * the result in the first vector.
   * @param {Array<number>} a The first 2-element vector.
   * @param {Array<number>} b The second 2-element vector.
   * @returns {Array<number>} The parameter "a"
   */
  "vec2mulInPlace":function(a, b) {
    // Use variables in case a and b are the same
    const b0 = b[0];
    const b1 = b[1];
    a[0] *= b0;
    a[1] *= b1;
    return a;
  },
  /**
   * Negates a 2-element vector and returns a new
   * vector with the result, which is generally a vector with
   * the same length but opposite direction. Negating a vector
   * is the same as reversing the sign of each of its components.
   * @param {Array<number>} a A 2-element vector.
   * @returns {Array<number>} The resulting 2-element vector.
   */
  "vec2negate":function(a) {
    return [-a[0], -a[1]];
  },
  /**
   * Negates a 2-element vector in place, generally resulting in a vector with
   * the same length but opposite direction.
   * Negating a vector
   * is the same as reversing the sign of each of its components.
   * @param {Array<number>} a A 2-element vector.
   * @returns {Array<number>} The parameter "a".
   */
  "vec2negateInPlace":function(a) {
    a[0] = -a[0];
    a[1] = -a[1];
    return a;
  },
  /**
   * Converts a 2-element vector to a [unit vector]{@tutorial glmath}; returns a new vector.
   * When a vector is normalized, its direction remains the same but the distance from the origin
   * to that vector becomes 1 (unless all its components are 0).
   * A vector is normalized by dividing each of its components
   * by its [length]{@link MathUtil.vec2length}.<p>
   * @param {Array<number>} vec A 2-element vector.
   * @returns {Array<number>} The resulting vector.
   * Note that due to rounding error, the vector's length might not be exactly equal to 1, and that the vector will remain unchanged if its length is 0 or extremely close to 0.
   * @example <caption>The following example changes the
   * length of a line segment. </caption>
   * var startPt=[x1,y1]; // Line segment's start
   * var endPt=[x2,y2]; // Line segment's end
   * // Find difference between endPt and startPt
   * var delta=MathUtil.vec2sub(endPt,startPt);
   * // Normalize delta to a unit vector
   * var deltaNorm=MathUtil.vec2normalize(delta);
   * // Rescale to the desired length, here, 10
   * MathUtil.vec2scaleInPlace(deltaNorm,10);
   * // Find the new endpoint
   * endPt=MathUtil.vec2add(startPt,deltaNorm);
   */
  "vec2normalize":function(vec) {
    return MathUtil.vec2normalizeInPlace([vec[0], vec[1]]);
  },
  /**
   * Converts a 2-element vector to a [unit vector]{@tutorial glmath}.
   * When a vector is normalized, its direction remains the same but the distance from the origin
   * to that vector becomes 1 (unless all its components are 0).
   * A vector is normalized by dividing each of its components
   * by its [length]{@link MathUtil.vec2length}.<p>
   * @param {Array<number>} vec A 2-element vector.
   * @returns {Array<number>} The parameter "vec".
   * Note that due to rounding error, the vector's length might not be exactly equal to 1, and that the vector will remain unchanged if its length is 0 or extremely close to 0.
   */
  "vec2normalizeInPlace":function(vec) {
    const x = vec[0];
    const y = vec[1];
    let len = Math.sqrt(x * x + y * y);
    if(len !== 0) {
      len = 1.0 / len;
      vec[0] *= len;
      vec[1] *= len;
    }
    return vec;
  },
  /**
   * Returns an arbitrary 2-element vector that is perpendicular
   * (orthogonal) to the given 2-element vector. The return value
   * will not be converted to a [unit vector]{@tutorial glmath}.
   * @param {Array<number>} vec A 2-element vector.
   * @returns {Array<number>} A perpendicular 2-element
   * vector.  Returns (0,0) if "vec" is (0,0).
   */
  "vec2perp":function(vec) {
    return [-vec[1], vec[0]];
  },
  /**
   * Returns the projection of a 2-element vector on the given
   * reference vector. Assuming both vectors
   * start at the same point, the resulting vector
   * will be parallel to the
   * reference vector but will make the closest
   * approach possible to the projected vector's
   * endpoint. The difference between the projected
   * vector and the return value will be perpendicular
   * to the reference vector.
   * @param {Array<number>} vec The vector to project.
   * @param {Array<number>} refVec The reference vector whose length
   * will be adjusted.
   * @returns {Array<number>} The projection of
   * "vec" on "refVec".  Returns (0,0,0) if "refVec"'s
   * length is 0 or extremely close to 0.
   */
  "vec2proj":function(vec, refVec) {
    const lensq = MathUtil.vec2dot(refVec, refVec);
    if(lensq === 0.0)return [0, 0];
    return MathUtil.vec2scale(refVec,
      MathUtil.vec2dot(vec, refVec) / lensq);
  },
  /**
   * Returns a vector that reflects off a surface.
   * @param {Array<number>} incident Incident vector, or
   * a vector headed in the direction of the surface, as a 2-element vector.
   * @param {Array<number>} normal Surface normal vector, or
   * a vector that's perpendicular to the surface, as a 2-element vector.
   * Should be a [unit vector]{@tutorial glmath}.
   * @returns {Array<number>} A vector that has the same length
   * as "incident" but is reflected away from the surface.
   */
  "vec2reflect":function(incident, normal) {
    return MathUtil.vec2sub(incident,
      MathUtil.vec2scale(normal, 2 * MathUtil.vec2dot(normal, incident)));
  },
  /**
   * Multiplies each element of a 2-element vector by a factor. Returns
   * a new vector that is parallel to the old vector
   * but with its length multiplied by the given factor. If the factor
   * is positive, the vector will point in the same direction; if negative,
   * in the opposite direction; if zero, the vector's components will all be 0.
   * @param {Array<number>} a A 2-element vector.
   * @param {number} scalar A factor to multiply. To divide
   * a vector by a number, the factor will be 1 divided by that number.
   * @returns {Array<number>} The parameter "a".
   */
  "vec2scale":function(a, scalar) {
    return MathUtil.vec2scaleInPlace([a[0], a[1]], scalar);
  },
  /**
   * Multiplies each element of a 2-element vector by a factor, so
   * that the vector is parallel to the old vector
   * but its length is multiplied by the given factor. If the factor
   * is positive, the vector will point in the same direction; if negative,
   * in the opposite direction; if zero, the vector's components will all be 0.
   * @param {Array<number>} a A 2-element vector.
   * @param {number} scalar A factor to multiply. To divide
   * a vector by a number, the factor will be 1 divided by that number.
   * @returns {Array<number>} The parameter "a".
   */
  "vec2scaleInPlace":function(a, scalar) {
    a[0] *= scalar;
    a[1] *= scalar;
    return a;
  },
  /**
   * Subtracts the second vector from the first vector and returns a new
   * vector with the result. Subtracting two vectors
   * is the same as subtracting each of their components.<p>
   * @param {Array<number>} a The first 2-element vector.
   * @param {Array<number>} b The second 2-element vector.
   * @returns {Array<number>} The resulting 2-element vector.
   * This is the vector <i>to <code>a</code> from <code>b</code></i>.
   */
  "vec2sub":function(a, b) {
    return [a[0] - b[0], a[1] - b[1]];
  },
  /**
   * Subtracts the second vector from the first vector and stores
   * the result in the first vector. Subtracting two vectors
   * is the same as subtracting each of their components.
   * @param {Array<number>} a The first 2-element vector.
   * @param {Array<number>} b The second 2-element vector.
   * @returns {Array<number>} The parameter "a".
   * This is the vector <i>to the previous <code>a</code> from <code>b</code></i>.
   */
  "vec2subInPlace":function(a, b) {
    // Use variables in case a and b are the same
    const b0 = b[0];
    const b1 = b[1];
    a[0] -= b0;
    a[1] -= b1;
    return a;
  },
  /**
   * Returns a new 3-element
   * vector with the absolute value of each of its components.
   * @param {Array<number>} a A 3-element vector.
   * @returns {Array<number>} The resulting 3-element vector.
   */
  "vec3abs":function(a) {
    return [Math.abs(a[0]), Math.abs(a[1]), Math.abs(a[2])];
  },
  /**
   * Sets each component of the given 3-element
   * vector to its absolute value.
   * @param {Array<number>} a A 3-element vector.
   * @returns {Array<number>} The vector "a".
   */
  "vec3absInPlace":function(a) {
    a[0] = Math.abs(a[0]);
    a[1] = Math.abs(a[1]);
    a[2] = Math.abs(a[2]);
    return a;
  },
  /**
   * Adds two 3-element vectors and returns a new
   * vector with the result. Adding two vectors
   * is the same as adding each of their components.
   * The resulting vector:<ul>
   * <li>describes a straight-line path for the
   * combined paths described by the given vectors, in either order, and
   * <li>will come "between" the two vectors given (at their shortest angle) if all three start
   * at the same position.</ul>
   * @param {Array<number>} a The first 3-element vector.
   * @param {Array<number>} b The second 3-element vector.
   * @returns {Array<number>} The resulting 3-element vector.
   */
  "vec3add":function(a, b) {
    return [a[0] + b[0], a[1] + b[1], a[2] + b[2]];
  },
  /**
   * Adds two 3-element vectors and stores
   * the result in the first vector. Adding two vectors
   * is the same as adding each of their components.
   * The resulting vector:<ul>
   * <li>describes a straight-line path for the
   * combined paths described by the given vectors, in either order, and
   * <li>will come "between" the two vectors given (at their shortest angle) if all three start
   * at the same position.</ul>
   * @param {Array<number>} a The first 3-element vector.
   * @param {Array<number>} b The second 3-element vector.
   * @returns {Array<number>} The parameter "a"
   */
  "vec3addInPlace":function(a, b) {
    // Use variables in case a and b are the same

    const b0 = b[0];
    const b1 = b[1];
    const b2 = b[2];
    a[0] += b0;
    a[1] += b1;
    a[2] += b2;
    return a;
  },
  /**
   * Assigns the values of a 3-element vector into another
   * 3-element vector.
   * @param {Array<number>} dst The 3-element vector to
   * assign to.
   * @param {Array<number>} src The 3-element vector whose
   * values will be copied.
   * @returns {Array<number>} The parameter "dst"
   */
  "vec3assign":function(dst, src) {
    dst[0] = src[0];
    dst[1] = src[1];
    dst[2] = src[2];
    return dst;
  },
  /**
   * Returns a 3-element vector in which each element of the given 3-element vector is clamped
   * so it's not less than one value or greater than another value.
   * @param {Array<number>} a The vector to clamp.
   * @param {number} min Lowest possible value. Should not be greater than "max".
   * @param {number} max Highest possible value. Should not be less than "min".
   * @returns {Array<number>} The resulting vector. */
  "vec3clamp":function(a, min, max) {
    return MathUtil.vec3clampInPlace(MathUtil.vec3copy(a), min, max);
  },
  /**
   * Clamps each element of the given 3-element vector
   * so it's not less than one value or greater than another value.
   * @param {Array<number>} a The vector to clamp.
   * @param {number} min Lowest possible value. Should not be greater than "max".
   * @param {number} max Highest possible value. Should not be less than "min".
   * @returns {Array<number>} The resulting vector. */
  "vec3clampInPlace":function(a, min, max) {
    const x = Math.min(max, Math.max(min, a[0]));
    const y = Math.min(max, Math.max(min, a[1]));
    const z = Math.min(max, Math.max(min, a[2]));
    a[0] = x;
    a[1] = y;
    a[2] = z;
    return a;
  },
  /**
   * Returns a copy of a 3-element vector.
   * @param {Array<number>} vec A 3-element vector.
   * @returns {Array<number>} Return value. */
  "vec3copy":function(vec) {
    return [vec[0], vec[1], vec[2]];
  },
  /**
   * Finds the cross product of two 3-element vectors (called A and B).
   * The following are properties of the cross product:<ul>
   * <li>The cross product will be a vector that is <i>orthogonal</i> (perpendicular) to both A and B.
   * <li>Switching the order of A and B results in a cross product
   * vector with the same length but opposite direction. (Thus, the cross product is not <i>commutative</i>,
   * but it is <i>anticommutative</i>.)
   * <li>Let there be a triangle formed by point A, point B, and the point (0,0,0) in that order.
   * While the cross product of A and B points backward from the "eye",
   * the triangle's vertices are oriented counterclockwise for [right-handed coordinate systems]{@tutorial glmath},
   * or clockwise for left-handed systems. The triangle's area is half of the cross product's length.
   * <li>The length of the cross
   * product equals |<b>a</b>| &#x2a; |<b>b</b>| &#x2a; |sin &theta;|
   * where |<b>x</b>| is the length of vector <b>x</b>, and
   * &theta; is the shortest angle between <b>a</b> and <b>b</b>.
   * It follows that:<ul>
   * <li>If the length is 0, then A and B are parallel vectors (0 or 180 degrees apart).
   * <li>If A and B are unit vectors, the length equals the absolute value
   * of the sine of the shortest angle between A and B.
   * <li>If A and B are unit vectors, the cross product will be a unit vector only if A is perpendicular
   * to B (the shortest angle between A and B will be 90 degrees, since sin 90&deg; = 1).
   * </ul></ul>
   * The cross product (<b>c</b>) of vectors <b>a</b> and <b>b</b> is found as
   * follows:<br>
   * <b>c</b>.x = <b>a</b>.y &#x2a; <b>b</b>.z - <b>a</b>.z &#x2a; <b>b</b>.y<br>
   * <b>c</b>.y = <b>a</b>.z &#x2a; <b>b</b>.x - <b>a</b>.x &#x2a; <b>b</b>.z<br>
   * <b>c</b>.z = <b>a</b>.x &#x2a; <b>b</b>.y - <b>a</b>.y &#x2a; <b>b</b>.x<br>
   * @param {Array<number>} a The first 3-element vector.
   * @param {Array<number>} b The second 3-element vector.
   * @returns {Array<number>} A 3-element vector containing the cross product.
   * @example <caption>The following example uses the cross product to
   * calculate a triangle's normal vector and its area.</caption>
   * var a=triangle[0];
   * var b=triangle[1];
   * var c=triangle[2];
   * // Find vector from C to A
   * var da=MathUtil.vec3sub(a,c);
   * // Find vector from C to B
   * var db=MathUtil.vec3sub(b,c);
   * // The triangle's normal is the cross product of da and db
   * var normal=MathUtil.vec3cross(da,db);
   * // Find the triangle's area
   * var area=MathUtil.vec3length(normal)*0.5;
   * @example <caption>The following example finds the cosine and sine of
   * the angle between two unit vectors and the orthogonal unit vector of both.</caption>
   * var cr=MathUtil.vec3cross(unitA,unitB);
   * // Cosine of the angle. Will be positive or negative depending on
   * // the shortest angle between the vectors.
   * var cosine=MathUtil.vec3dot(unitA,unitB);
   * // Sine of the angle. Note that the sine will always be 0 or greater because
   * // the shortest angle between them is positive or 0 degrees.
   * var sine=MathUtil.vec3length(cr);
   */
  "vec3cross":function(a, b) {
    return [a[1] * b[2] - a[2] * b[1],
      a[2] * b[0] - a[0] * b[2],
      a[0] * b[1] - a[1] * b[0]];
  },
  /**
   * Finds the straight-line distance from one three-element vector
   * to another, treating both as 3D points.
   * @param {Array<number>} vecFrom The first 3-element vector.
   * @param {Array<number>} vecTo The second 3-element vector.
   * @returns {number} The distance between the two vectors.
   */
  "vec3dist":function(vecFrom, vecTo) {
    return MathUtil.vec3length(MathUtil.vec3sub(vecFrom, vecTo));
  },
  /**
   * Finds the dot product of two 3-element vectors. It's the
   * sum of the products of their components (for example, <b>a</b>'s X times
   * <b>b</b>'s X).<p>
   * The following are properties of the dot product:
   * <ul>
   * <li>The dot
   * product equals |<b>a</b>| &#x2a; |<b>b</b>| &#x2a; cos &theta;
   * where |<b>x</b>| is the length of vector <b>x</b>, and
   * &theta; is the shortest angle between <b>a</b> and <b>b</b>.
   * It follows that:<ul>
   * <li>A dot product of 0 indicates that the vectors are 90
   * degrees apart, making them <i>orthogonal</i>
   * (perpendicular to each other).
   * <li>A dot product greater than 0 means less than 90 degrees apart.
   * <li>A dot product less than 0 means greater than 90 degrees apart.
   * <li>If both vectors are unit vectors, the cosine
   * of the shortest angle between them is equal to their dot product.
   * However, <code>Math.acos</code> won't return a negative angle
   * from that cosine, so the dot product can't
   * be used to determine if one vector is "ahead of" or "behind" another
   * vector.
   * <li>If both vectors are unit vectors, a dot product of 1 or -1 indicates
   * that the two vectors are parallel (and the vectors are 0 or
   * 180 degrees apart, respectively.)
   * <li>If one of the vectors is a unit vector, the dot product's absolute
   * value will be the length that vector must have to make the closest
   * approach to the other vector's endpoint. If the dot product is negative,
   * the unit vector must also be in the opposite direction to approach the
   * other vector's endpoint.
   * </ul></li>
   * <li>If the two vectors are the same, the return value indicates
   * the vector's length squared. This is illustrated in the example.
   * <li>Switching the order of the two vectors results in the
   * same dot product. (Thus, the dot product is <i>commutative</i>.)
   * </ul>
   * @param {Array<number>} a The first 3-element vector.
   * @param {Array<number>} b The second 3-element vector.
   * @returns {number} A number representing the dot product.
   * @example <caption>The following shows a fast way to compare
   * a vector's length using the dot product.</caption>
   * // Check if the vector's length squared is less than 20 units squared
   * if(MathUtil.vec3dot(vector, vector)<20*20) {
   * // The vector's length is shorter than 20 units
   * }
   */
  "vec3dot":function(a, b) {
    return a[0] * b[0] + a[1] * b[1] + a[2] * b[2];
  },
  /**
   * Unprojects the <i>window coordinates</i> given in a
   * 3-element vector,
   * using the given transformation matrix and viewport
   * rectangle.<p>
   * In the window coordinate space, x-coordinates increase
   * rightward and y-coordinates increase upward
   * or downward depending on the "yUp" parameter, and
   * z-coordinates within the view volume range from 0 to 1 (assuming
   * {@link MathUtil.mat4projectVec3} treated view volume z-coordinates as ranging from
   * -1 to 1) and increase from front to back.
   * @param {Array<number>} vector A 3-element vector giving
   * the x-, y-, and z-coordinates of the 3D point to transform, in window coordinates.
   * @param {Array<number>} matrix A 4 &times; 4 matrix.
   * After undoing the transformation to window coordinates, the vector will
   * be transformed by the inverse of this matrix according to the
   * {@link MathUtil.mat4projectVec3} method.<br>
   * To convert to
   * world space, this parameter will generally be a projection-view matrix
   * (projection matrix multiplied by the view matrix, in that order). To convert to
   * object (model) space, this parameter will generally be a model-view-projection
   * matrix (projection-view matrix
   * multiplied by the world [model] matrix, in that order).
   * See {@link MathUtil.vec3toWindowPoint} for the meaning of window coordinates
   * with respect to the "matrix" and "yUp" parameters.
   * @param {Array<number>} viewport A 4-element array specifying
   * the starting position and size of the viewport in window units
   * (such as pixels). In order, the four elements are the starting position's
   * x-coordinate, its y-coordinate, the viewport's width, and the viewport's
   * height. Throws an error if the width or height is less than 0.
   * @param {boolean} [yUp] If false, null, undefined, or omitted, reverses the sign of
   * the y-coordinate returned by the {@link MathUtil.mat4projectVec3} method
   * before converting it to window coordinates. If true, the Y
   * coordinate will remain unchanged. If window y-coordinates increase
   * upward, the viewport's starting position is at the lower-left corner. If those
   * coordinates increase downward, the viewport's starting position is
   * at the upper-left corner.
   * @returns {Array<number>} A 3-element array giving the coordinates
   * of the unprojected point, in that order.
   */
  "vec3fromWindowPoint":function(vector, matrix, viewport, yUp) {
    const halfWidth = viewport[2] * 0.5;
    const halfHeight = viewport[3] * 0.5;
    let x = 0;
    let y = 0;
    const z = vector[2] * 2.0 - 1.0;
    if(halfWidth !== 0 && halfHeight !== 0) {
      x = (vector[0] - viewport[0] - halfWidth) / halfWidth;
      y = (vector[1] - viewport[1] - halfHeight) / halfHeight;
    }

    const yupfalse = typeof yUp === "undefined" || yUp === null || yUp === false;
    y = !yupfalse ? y : -y;
    const invMatrix = MathUtil.mat4invert(matrix);
    return MathUtil.mat4projectVec3(invMatrix, [x, y, z]);
  },
  /**
   * Returns the distance of this 3-element vector from the origin,
   * also known as its <i>length</i> or <i>magnitude</i>.
   * It's the same as the square root of the sum of the squares
   * of its components.<p>
   * Note that if vectors are merely sorted or compared by their lengths (and
   * those lengths are not added or multiplied together or the like),
   * it's faster to sort or compare them by the squares of their lengths (to find
   * the square of a 3-element vector's length, call {@link MathUtil.vec3dot}
   * passing the same vector as both of its arguments).
   * @param {Array<number>} a A 3-element vector.
   * @returns {number} Return value. */
  "vec3length":function(a) {
    const dx = a[0];
    const dy = a[1];
    const dz = a[2];
    return Math.sqrt(dx * dx + dy * dy + dz * dz);
  },
  /**
   * Does a linear interpolation between two 3-element vectors;
   * returns a new vector.
   * @param {Array<number>} v1 The first vector to interpolate.
   * The interpolation will occur on each component of this vector and v2.
   * @param {Array<number>} v2 The second vector to interpolate.
   * @param {number} factor A value that usually ranges from 0 through 1. Closer to 0 means
   * closer to v1, and closer to 1 means closer to v2.<br>For a nonlinear
   * interpolation, define a function that takes a value that usually ranges from 0 through 1 and returns
   * a value generally ranging from 0 through 1, and pass the result of that
   * function to this method.<br>
   * The following are examples of interpolation functions. See also
   * the code examples following this list.<ul>
   * <li>Linear: <code>factor</code>. Constant speed.
   * <li>Powers: <code>Math.pow(factor, N)</code>, where N &gt; 0.
   * For example, N=2 means a square, N=3 means cube, N=1/2 means square root,
   * and N=1/3 means cube root. If N &gt; 1, this
   * function starts slow and ends fast. If N &lt; 1,
   * this function starts fast and ends slow.
   * <li>Sine: <code>Math.sin(Math.PI*0.5*factor)</code>. This function starts fast and ends slow.
   * <li>Smoothstep: <code>(3.0-2.0*factor)*factor*factor</code>. This function
   * starts and ends slow, and speeds up in the middle.
   * <li>Perlin's "Smootherstep": <code>(10+factor*(factor*6-15))*factor*factor*factor</code>. This function
   * starts and ends slow, and speeds up in the middle.
   * <li>Discrete-step timing, where N is a number of steps greater than 0:<ul>
   * <li>Position start: <code>factor &lt; 0 ? 0 : Math.max(1.0,(1.0+Math.floor(factor*N))/N)</code>.</li>
   * <li>Position end: <code>Math.floor(factor*N)/N</code>.</li></ul>
   * <li>Inverted interpolation: <code>1.0-INTF(1.0-factor)</code>,
   * where <code>INTF(x)</code>
   * is another interpolation function. This function reverses the speed behavior;
   * for example, a function that started fast now starts slow.
   * <li>Ease: <code>factor &lt; 0.5 ? INTF(factor*2)*0.5 : 1.0-(INTF((1.0-factor)*2)*0.5)</code>,
   * where <code>INTF(x)</code> is another interpolation function.
   * Depending on the underlying function, this function eases in,
   * then eases out, or vice versa.
   * </ul>
   * @returns {Array<number>} The interpolated vector.
   * @example <caption>The following code does a nonlinear
   * interpolation of two vectors that uses the cube of "factor" rather than
   * "factor". Rather than at a constant speed, the vectors are interpolated
   * slowly then very fast.</caption>
   * factor = factor*factor*factor; // cube the interpolation factor
   * var newVector = MathUtil.vec3lerp(vector1, vector2, factor);
   * @example <caption>The following code does an inverted cubic
   * interpolation. This time, vectors are interpolated fast then very slowly.</caption>
   * factor = 1 - factor; // Invert the factor
   * factor = factor*factor*factor; // cube the interpolation factor
   * factor = 1 - factor; // Invert the result
   * var newVector = MathUtil.vec3lerp(vector1, vector2, factor);
   * @example <caption>The following code does the nonlinear
   *  interpolation called "smoothstep". It slows down at the beginning
   * and end, and speeds up in the middle.</caption>
   * factor = (3.0-2.0*factor)*factor*factor; // smoothstep interpolation
   * var newVector = MathUtil.vec3lerp(vector1, vector2, factor);
   */
  "vec3lerp":function(v1, v2, factor) {
    return [
      v1[0] + (v2[0] - v1[0]) * factor,
      v1[1] + (v2[1] - v1[1]) * factor,
      v1[2] + (v2[2] - v1[2]) * factor
    ];
  },
  /**
   * Multiplies each of the components of two 3-element vectors and returns a new
   * vector with the result.
   * @param {Array<number>} a The first 3-element vector.
   * @param {Array<number>} b The second 3-element vector.
   * @returns {Array<number>} The resulting 3-element vector.
   */
  "vec3mul":function(a, b) {
    return [a[0] * b[0], a[1] * b[1], a[2] * b[2]];
  },
  /**
   * Multiplies each of the components of two 3-element vectors and stores
   * the result in the first vector.
   * @param {Array<number>} a The first 3-element vector.
   * @param {Array<number>} b The second 3-element vector.
   * @returns {Array<number>} The parameter "a"
   */
  "vec3mulInPlace":function(a, b) {
    // Use variables in case a and b are the same

    const b0 = b[0];
    const b1 = b[1];
    const b2 = b[2];
    a[0] *= b0;
    a[1] *= b1;
    a[2] *= b2;
    return a;
  },
  /**
   * Negates a 3-element vector and returns a new
   * vector with the result, which is generally a vector with
   * the same length but opposite direction. Negating a vector
   * is the same as reversing the sign of each of its components.
   * @param {Array<number>} a A 3-element vector.
   * @returns {Array<number>} The resulting 3-element vector.
   */
  "vec3negate":function(a) {
    return [-a[0], -a[1], -a[2]];
  },
  /**
   * Negates a 3-element vector in place, generally resulting in a vector with
   * the same length but opposite direction.
   * Negating a vector
   * is the same as reversing the sign of each of its components.
   * @param {Array<number>} a A 3-element vector.
   * @returns {Array<number>} The parameter "a".
   */
  "vec3negateInPlace":function(a) {
    a[0] = -a[0];
    a[1] = -a[1];
    a[2] = -a[2];
    return a;
  },
  /**
   * Converts a 3-element vector to a [unit vector]{@tutorial glmath}; returns a new vector.
   * When a vector is normalized, its direction remains the same but the distance from the origin
   * to that vector becomes 1 (unless all its components are 0).
   * A vector is normalized by dividing each of its components
   * by its [length]{@link MathUtil.vec3length}.<p>
   * @param {Array<number>} vec A 3-element vector.
   * @returns {Array<number>} The resulting vector.
   * Note that due to rounding error, the vector's length might not be exactly equal to 1, and that the vector will remain unchanged if its length is 0 or extremely close to 0.
   * @example <caption>The following example changes the
   * length of a line segment. </caption>
   * var startPt=[x1,y1,z1]; // Line segment's start
   * var endPt=[x2,y2,z2]; // Line segment's end
   * // Find difference between endPt and startPt
   * var delta=MathUtil.vec3sub(endPt,startPt);
   * // Normalize delta to a unit vector
   * var deltaNorm=MathUtil.vec3normalize(delta);
   * // Rescale to the desired length, here, 10
   * MathUtil.vec3scaleInPlace(deltaNorm,10);
   * // Find the new endpoint
   * endPt=MathUtil.vec3add(startPt,deltaNorm);
   */
  "vec3normalize":function(vec) {
    return MathUtil.vec3normalizeInPlace([vec[0], vec[1], vec[2]]);
  },
  /**
   * Converts a 3-element vector to a [unit vector]{@tutorial glmath}.
   * When a vector is normalized, its direction remains the same but the distance from the origin
   * to that vector becomes 1 (unless all its components are 0).
   * A vector is normalized by dividing each of its components
   * by its [length]{@link MathUtil.vec3length}.<p>
   * @param {Array<number>} vec A 3-element vector.
   * @returns {Array<number>} The parameter "vec".
   * Note that due to rounding error, the vector's length might not be exactly equal to 1, and that the vector will remain unchanged if its length is 0 or extremely close to 0.
   */
  "vec3normalizeInPlace":function(vec) {
    const x = vec[0];
    const y = vec[1];
    const z = vec[2];
    let len = Math.sqrt(x * x + y * y + z * z);
    if(len !== 0) {
      len = 1.0 / len;
      vec[0] *= len;
      vec[1] *= len;
      vec[2] *= len;
    }
    return vec;
  },
  /**
   * Returns an arbitrary 3-element vector that is perpendicular
   * (orthogonal) to the given 3-element vector. The return value
   * will not be converted to a [unit vector]{@tutorial glmath}.
   * @param {Array<number>} vec A 3-element vector.
   * @returns {Array<number>} A perpendicular 3-element
   * vector.  Returns (0,0,0) if "vec" is (0,0,0).
   */
  "vec3perp":function(vec) {
    const absx = Math.abs(vec[0]);
    const absy = Math.abs(vec[1]);
    const absz = Math.abs(vec[2]);
    const mx = Math.max(absx, absy, absz);
    const normal = [0, 0, 0];
    if(mx === absx) {
      normal[0] = vec[1];
      normal[1] = -vec[0];
      normal[2] = 0;
    } else if(mx === absy) {
      normal[0] = 0;
      normal[1] = vec[2];
      normal[2] = -vec[1];
    } else {
      normal[0] = -vec[2];
      normal[1] = 0;
      normal[2] = vec[0];
    }
    return normal;
  },
  /**
   * Returns the projection of a 3-element vector on the given
   * reference vector. Assuming both vectors
   * start at the same point, the resulting vector
   * will be parallel to the
   * reference vector but will make the closest
   * approach possible to the projected vector's
   * endpoint. The difference between the projected
   * vector and the return value will be perpendicular
   * to the reference vector.
   * @param {Array<number>} vec The vector to project.
   * @param {Array<number>} refVec The reference vector whose length
   * will be adjusted.
   * @returns {Array<number>} The projection of
   * "vec" on "refVec".  Returns (0,0,0) if "refVec"'s
   * length is 0 or extremely close to 0.
   */
  "vec3proj":function(vec, refVec) {
    const lensq = MathUtil.vec3dot(refVec, refVec);
    if(lensq === 0.0)return [0, 0, 0];
    return MathUtil.vec3scale(refVec,
      MathUtil.vec3dot(vec, refVec) / lensq);
  },
  /**
   * Returns a vector that reflects off a surface.
   * @param {Array<number>} incident Incident vector, or
   * a vector headed in the direction of the surface, as a 3-element vector.
   * @param {Array<number>} normal Surface normal vector, or
   * a vector that's perpendicular to the surface, as a 3-element vector.
   * Should be a [unit vector]{@tutorial glmath}.
   * @returns {Array<number>} A vector that has the same length
   * as "incident" but is reflected away from the surface.
   */
  "vec3reflect":function(incident, normal) {
    return MathUtil.vec3sub(incident,
      MathUtil.vec3scale(normal, 2 * MathUtil.vec3dot(normal, incident)));
  },
  /**
   * Multiplies each element of a 3-element vector by a factor. Returns
   * a new vector that is parallel to the old vector
   * but with its length multiplied by the given factor. If the factor
   * is positive, the vector will point in the same direction; if negative,
   * in the opposite direction; if zero, the vector's components will all be 0.
   * @param {Array<number>} a A 3-element vector.
   * @param {number} scalar A factor to multiply. To divide
   * a vector by a number, the factor will be 1 divided by that number.
   * @returns {Array<number>} The parameter "a".
   */
  "vec3scale":function(a, scalar) {
    return MathUtil.vec3scaleInPlace([a[0], a[1], a[2]], scalar);
  },
  /**
   * Multiplies each element of a 3-element vector by a factor, so
   * that the vector is parallel to the old vector
   * but its length is multiplied by the given factor. If the factor
   * is positive, the vector will point in the same direction; if negative,
   * in the opposite direction; if zero, the vector's components will all be 0.
   * @param {Array<number>} a A 3-element vector.
   * @param {number} scalar A factor to multiply. To divide
   * a vector by a number, the factor will be 1 divided by that number.
   * @returns {Array<number>} The parameter "a".
   */
  "vec3scaleInPlace":function(a, scalar) {
    a[0] *= scalar;
    a[1] *= scalar;
    a[2] *= scalar;
    return a;
  },
  /**
   * Subtracts the second vector from the first vector and returns a new
   * vector with the result. Subtracting two vectors
   * is the same as subtracting each of their components.<p>
   * @param {Array<number>} a The first 3-element vector.
   * @param {Array<number>} b The second 3-element vector.
   * @returns {Array<number>} The resulting 3-element vector.
   * This is the vector <i>to <code>a</code> from <code>b</code></i>.
   */
  "vec3sub":function(a, b) {
    return [a[0] - b[0], a[1] - b[1], a[2] - b[2]];
  },
  /**
   * Subtracts the second vector from the first vector and stores
   * the result in the first vector. Subtracting two vectors
   * is the same as subtracting each of their components.
   * @param {Array<number>} a The first 3-element vector.
   * @param {Array<number>} b The second 3-element vector.
   * @returns {Array<number>} The parameter "a".
   * This is the vector <i>to the previous <code>a</code> from <code>b</code></i>.
   */
  "vec3subInPlace":function(a, b) {
    // Use variables in case a and b are the same
    const b0 = b[0];
    const b1 = b[1];
    const b2 = b[2];
    a[0] -= b0;
    a[1] -= b1;
    a[2] -= b2;
    return a;
  },
  /**
   * Transforms the 3D point specified in this 3-element vector to its
   * <i>window coordinates</i>
   * using the given transformation matrix and viewport rectangle.
   * @param {Array<number>} vector A 3-element vector giving
   * the x-, y-, and z-coordinates of the 3D point to transform.
   * @param {Array<number>} matrix A 4 &times; 4 matrix to use to transform
   * the vector according to the {@link MathUtil.mat4projectVec3} method,
   * before the transformed vector is converted to window coordinates.
   * <br>This parameter will generally be
   * a projection-view matrix (projection matrix multiplied
   * by the view matrix, in that order), if the vector to transform is in <i>world space</i>,
   * or a model-view-projection matrix, that is, (projection-view matrix multiplied
   * by the model [world] matrix, in that order), if the vector is in <i>model
   * (object) space</i>.<br>
   * If the matrix includes a projection transform returned
   * by {@link MathUtil.mat4ortho}, {@link MathUtil.mat4perspective}, or
   * similar {@link MathUtil} methods, the x-, y-, and z-coordinates within the
   * view volume will increase in the direction given in those methods' documentation (except that if "yUp" is false, null, undefined, or omitted, y-coordinates increase in the opposite direction), and z-coordinates in the view volume will range from 0 to 1 in <card>window coordinates</card>, assuming {@link MathUtil.mat4projectVec3} made such z-coordinates range from -1 to 1.
   * @param {Array<number>} viewport A 4-element array specifying
   * the starting position and size of the viewport in window units
   * (such as pixels). In order, the four elements are the starting position's
   * x-coordinate, its y-coordinate, the viewport's width, and the viewport's
   * height. Throws an error if the width or height is less than 0.
   * @param {boolean} [yUp] If false, null, undefined, or omitted, reverses the sign of
   * the y-coordinate returned by the {@link MathUtil.mat4projectVec3} method
   * before converting it to window coordinates. If true, the Y
   * coordinate will remain unchanged. If window y-coordinates increase
   * upward, the viewport's starting position is at the lower-left corner. If those
   * coordinates increase downward, the viewport's starting position is
   * at the upper-left corner.
   * @returns {Array<number>} A 3-element array giving the window
   * coordinates, in that order.
   */
  "vec3toWindowPoint":function(vector, matrix, viewport, yUp) {
    if(viewport[2] < 0 || viewport[3] < 0)throw new Error();
    // Transform the vector and do a perspective divide
    const vec = MathUtil.mat4projectVec3(matrix, vector);
    // Now convert the projected vector to window coordinates
    const yupfalse = typeof yUp === "undefined" || yUp === null || yUp === false;
    const halfWidth = viewport[2] * 0.5;
    const halfHeight = viewport[3] * 0.5;
    const vecY = !yupfalse ? vec[1] : -vec[1];
    const x = vec[0] * halfWidth + halfWidth + viewport[0];
    const y = vecY * halfHeight + halfHeight + viewport[1];
    const z = (vec[2] + 1.0) * 0.5;
    return [x, y, z];
  },
  /**
   * Finds the scalar triple product of three vectors (A, B, and C). The triple
   * product is the [dot product]{@link MathUtil.vec3dot} of both A and the
   * [cross product]{@link MathUtil.vec3cross}
   * of B and C. The following are properties of the scalar triple product
   * (called triple product in what follows):<ul>
   * <li>Switching the order of B and C, A and C, or A and B results in a triple product
   * with its sign reversed. Moving all three parameters to different positions, though,
   * results in the same triple product.
   * <li>The triple product's absolute value is the volume of a parallelepiped (skewed
   * box) where three of its sides having a vertex in common are
   * defined by A, B, and C, in any order.
   * <li>The triple product's absolute value divided by 6 is the volume of a tetrahedron,
   * where three of its sides having a vertex in common are
   * defined by A, B, and C, in any order.
   * <li>If the triple product is 0, all three vectors lie on the same plane (are <i>coplanar</i>).
   * <li>The triple product is the same as the <i>determinant</i> (overall scaling factor)
   * of a 3 &times; 3 matrix whose rows or columns are the vectors A, B, and C, in that order.
   * <li>Assume A is perpendicular to vectors B and C. If the triple product is positive,
   * then A points in the same direction as the cross product of
   * B and C -- which will be perpendicular -- and the angle from B to C, when rotated
   * about vector A, is positive. If the triple product is negative, then A points in the
   * opposite direction from that cross product, and that angle is negative.
   * (See the following example.)
   * </ul>
   * @param {Array<number>} a The first 3-element vector.
   * @param {Array<number>} b The second 3-element vector, or the
   * first parameter to the cross product.
   * @param {Array<number>} c The third 3-element vector, or the
   * second parameter to the cross product.
   * @returns {number} A number giving the triple product.
   */
  "vec3triple":function(a, b, c) {
    return MathUtil.vec3dot(a, MathUtil.vec3cross(b, c));
  },
  /**
   * Returns a new 4-element
   * vector with the absolute value of each of its components.
   * @param {Array<number>} a A 4-element vector.
   * @returns {Array<number>} The resulting 4-element vector.
   */
  "vec4abs":function(a) {
    return [Math.abs(a[0]), Math.abs(a[1]), Math.abs(a[2]), Math.abs(a[3])];
  },
  /**
   * Sets each component of the given 4-element
   * vector to its absolute value.
   * @param {Array<number>} a A 4-element vector.
   * @returns {Array<number>} The vector "a".
   */
  "vec4absInPlace":function(a) {
    a[0] = Math.abs(a[0]);
    a[1] = Math.abs(a[1]);
    a[2] = Math.abs(a[2]);
    a[3] = Math.abs(a[3]);
    return a;
  },
  /**
   * Adds two 4-element vectors and returns a new
   * vector with the result. Adding two vectors
   * is the same as adding each of their components.
   * The resulting vector:<ul>
   * <li>describes a straight-line path for the
   * combined paths described by the given vectors, in either order, and
   * <li>will come "between" the two vectors given (at their shortest angle) if all three start
   * at the same position.</ul>
   * @param {Array<number>} a The first 4-element vector.
   * @param {Array<number>} b The second 4-element vector.
   * @returns {Array<number>} The resulting 4-element vector.
   */
  "vec4add":function(a, b) {
    return [a[0] + b[0], a[1] + b[1], a[2] + b[2], a[3] + b[3]];
  },
  /**
   * Adds two 4-element vectors and stores
   * the result in the first vector. Adding two vectors
   * is the same as adding each of their components.
   * The resulting vector:<ul>
   * <li>describes a straight-line path for the
   * combined paths described by the given vectors, in either order, and
   * <li>will come "between" the two vectors given (at their shortest angle) if all three start
   * at the same position.</ul>
   * @param {Array<number>} a The first 4-element vector.
   * @param {Array<number>} b The second 4-element vector.
   * @returns {Array<number>} The parameter "a".
   * This is the vector <i>to the previous <code>a</code> from <code>b</code></i>.
   */
  "vec4addInPlace":function(a, b) {
    // Use variables in case a and b are the same

    const b0 = b[0];
    const b1 = b[1];
    const b2 = b[2];
    const b3 = b[3];
    a[0] += b0;
    a[1] += b1;
    a[2] += b2;
    a[3] += b3;
    return a;
  },
  /**
   * Assigns the values of a 4-element vector into another
   * 4-element vector.
   * @param {Array<number>} dst The 4-element vector to copy
   * the source values to.
   * @param {Array<number>} src The 4-element vector whose
   * values will be copied.
   * @returns {Array<number>} The parameter "dst".
   */
  "vec4assign":function(dst, src) {
    dst[0] = src[0];
    dst[1] = src[1];
    dst[2] = src[2];
    dst[3] = src[3];
    return dst;
  },
  /**
   * Returns a 4-element vector in which each element of the given 4-element vector is clamped
   * @param {Array<number>} a The vector to clamp.
   * @param {number} min Lowest possible value. Should not be greater than "max".
   * @param {number} max Highest possible value. Should not be less than "min".
   * @returns {Array<number>} The resulting vector. */
  "vec4clamp":function(a, min, max) {
    return MathUtil.vec4clampInPlace(MathUtil.vec4copy(a), min, max);
  },
  /**
   * Clamps each element of the given 4-element vector
   * so it's not less than one value or greater than another value.
   * @param {Array<number>} a The vector to clamp.
   * @param {number} min Lowest possible value. Should not be greater than "max".
   * @param {number} max Highest possible value. Should not be less than "min".
   * @returns {Array<number>} The resulting vector. */
  "vec4clampInPlace":function(a, min, max) {
    const x = Math.min(max, Math.max(min, a[0]));
    const y = Math.min(max, Math.max(min, a[1]));
    const z = Math.min(max, Math.max(min, a[2]));
    const w = Math.min(max, Math.max(min, a[3]));
    a[0] = x;
    a[1] = y;
    a[2] = z;
    a[3] = w;
    return a;
  },
  /**
   * Returns a copy of a 4-element vector.
   * @param {Array<number>} vec A 4-element vector.
   * @returns {Array<number>} Return value. */
  "vec4copy":function(vec) {
    return [vec[0], vec[1], vec[2], vec[3]];
  },
  /**
   * Finds the dot product of two 4-element vectors. It's the
   * sum of the products of their components (for example, <b>a</b>'s X times <b>b</b>'s X).
   * For properties of the dot product, see {@link MathUtil.vec3dot}.
   * @param {Array<number>} a The first 4-element vector.
   * @param {Array<number>} b The second 4-element vector.
   * @returns {number} Return value.
   */
  "vec4dot":function(a, b) {
    return a[0] * b[0] + a[1] * b[1] + a[2] * b[2] + a[3] * b[3];
  },
  /**
   * Returns the distance of this 4-element vector from the origin,
   * also known as its <i>length</i> or <i>magnitude</i>.
   * It's the same as the square root of the sum of the squares
   * of its components.<p>
   * Note that if vectors are merely sorted or compared by their lengths,
   * it's faster to sort or compare them by the squares of their lengths (to find
   * the square of a 4-element vector's length, call {@link MathUtil.vec4dot}
   * passing the same vector as both of its arguments).
   * @param {Array<number>} a A 4-element vector.
   * @returns {number} Return value. */
  "vec4length":function(a) {
    const dx = a[0];
    const dy = a[1];
    const dz = a[2];
    const dw = a[3];
    return Math.sqrt(dx * dx + dy * dy + dz * dz + dw * dw);
  },
  /**
   * Does a linear interpolation between two 4-element vectors;
   * returns a new vector.
   * @param {Array<number>} v1 The first vector to interpolate.
   * The interpolation will occur on each component of this vector and v2.
   * @param {Array<number>} v2 The second vector to interpolate.
   * @param {number} factor A value that usually ranges from 0 through 1. Closer to 0 means
   * closer to v1, and closer to 1 means closer to v2. For a nonlinear
   * interpolation, define a function that takes a value that usually ranges from 0 through 1
   * and generally returns
   * A value that usually ranges from 0 through 1, and pass the result of that function to this method.
   * See the documentation for {@link MathUtil.vec3lerp}
   * for examples of interpolation functions.
   * @returns {Array<number>} The interpolated vector.
   */
  "vec4lerp":function(v1, v2, factor) {
    return [
      v1[0] + (v2[0] - v1[0]) * factor,
      v1[1] + (v2[1] - v1[1]) * factor,
      v1[2] + (v2[2] - v1[2]) * factor,
      v1[3] + (v2[3] - v1[3]) * factor
    ];
  },
  /**
   * Negates a 4-element vector and returns a new
   * vector with the result, which is generally a vector with
   * the same length but opposite direction. Negating a vector
   * is the same as reversing the sign of each of its components.
   * @param {Array<number>} a A 4-element vector.
   * @returns {Array<number>} The resulting 4-element vector.
   */
  "vec4negate":function(a) {
    return [-a[0], -a[1], -a[2], -a[3]];
  },
  /**
   * Negates a 4-element vector in place, generally resulting in a vector with
   * the same length but opposite direction.
   * Negating a vector
   * is the same as reversing the sign of each of its components.
   * @param {Array<number>} a A 4-element vector.
   * @returns {Array<number>} The parameter "a".
   */
  "vec4negateInPlace":function(a) {
    a[0] = -a[0];
    a[1] = -a[1];
    a[2] = -a[2];
    a[3] = -a[3];
    return a;
  },
  /**
   * Converts a 4-element vector to a [unit vector]{@tutorial glmath}; returns a new vector.
   * When a vector is normalized, its direction remains the same but the distance from the origin
   * to that vector becomes 1 (unless all its components are 0).
   * A vector is normalized by dividing each of its components
   * by its [length]{@link MathUtil.vec4length}.<p>
   * @param {Array<number>} vec A 4-element vector.
   * @returns {Array<number>} The resulting vector.
   * Note that due to rounding error, the vector's length might not be exactly equal to 1, and that the vector will remain unchanged if its length is 0 or extremely close to 0.
   */
  "vec4normalize":function(vec) {
    return MathUtil.vec4normalizeInPlace([vec[0], vec[1], vec[2], vec[3]]);
  },
  /**
   * Converts a 4-element vector to a [unit vector]{@tutorial glmath}.
   * When a vector is normalized, its direction remains the same but the distance from the origin
   * to that vector becomes 1 (unless all its components are 0).
   * A vector is normalized by dividing each of its components
   * by its [length]{@link MathUtil.vec4length}.<p>
   * @param {Array<number>} vec A 4-element vector.
   * @returns {Array<number>} The parameter "vec".
   * Note that due to rounding error, the vector's length might not be exactly equal to 1, and that the vector will remain unchanged if its length is 0 or extremely close to 0.
   */
  "vec4normalizeInPlace":function(vec) {
    const x = vec[0];
    const y = vec[1];
    const z = vec[2];
    const w = vec[3];
    let len = Math.sqrt(x * x + y * y + z * z + w * w);
    if(len !== 0) {
      len = 1.0 / len;
      vec[0] *= len;
      vec[1] *= len;
      vec[2] *= len;
      vec[3] *= len;
    }
    return vec;
  },
  /**
   * Returns the projection of a 4-element vector on the given
   * reference vector. Assuming both vectors
   * start at the same point, the resulting vector
   * will be parallel to the
   * reference vector but will make the closest
   * approach possible to the projected vector's
   * endpoint. The difference between the projected
   * vector and the return value will be perpendicular
   * to the reference vector.
   * @param {Array<number>} vec The vector to project.
   * @param {Array<number>} refVec The reference vector whose length
   * will be adjusted.
   * @returns {Array<number>} The projection of
   * "vec" on "refVec".  Returns (0,0,0,0) if "refVec"'s
   * length is 0 or extremely close to 0.
   */
  "vec4proj":function(vec, refVec) {
    const lensq = MathUtil.vec4dot(refVec, refVec);
    if(lensq === 0.0)return [0, 0, 0];
    return MathUtil.vec4scale(refVec,
      MathUtil.vec4dot(vec, refVec) / lensq);
  },
  /**
   * Multiplies each element of a 4-element vector by a factor, returning
   * a new vector that is parallel to the old vector
   * but with its length multiplied by the given factor. If the factor
   * is positive, the vector will point in the same direction; if negative,
   * in the opposite direction; if zero, the vector's components will all be 0.
   * @param {Array<number>} a A 4-element vector.
   * @param {number} scalar A factor to multiply. To divide
   * a vector by a number, the factor will be 1 divided by that number.
   * @returns {Array<number>} The resulting 4-element vector.
   */
  "vec4scale":function(a, scalar) {
    return [a[0] * scalar, a[1] * scalar, a[2] * scalar, a[3] * scalar];
  },
  /**
   * Multiplies each element of a 4-element vector by a factor, so
   * that the vector is parallel to the old vector
   * but its length is multiplied by the given factor. If the factor
   * is positive, the vector will point in the same direction; if negative,
   * in the opposite direction; if zero, the vector's components will all be 0.
   * @param {Array<number>} a A 4-element vector.
   * @param {number} scalar A factor to multiply. To divide
   * a vector by a number, the factor will be 1 divided by that number.
   * @returns {Array<number>} The parameter "a".
   */
  "vec4scaleInPlace":function(a, scalar) {
    a[0] *= scalar;
    a[1] *= scalar;
    a[2] *= scalar;
    a[3] *= scalar;
    return a;
  },
  /**
   * Subtracts the second vector from the first vector and returns a new
   * vector with the result. Subtracting two vectors
   * is the same as subtracting each of their components.<p>
   * @param {Array<number>} a The first 4-element vector.
   * @param {Array<number>} b The second 4-element vector.
   * @returns {Array<number>} The resulting 4-element vector.
   * This is the vector <i>to <code>a</code> from <code>b</code></i>.
   */
  "vec4sub":function(a, b) {
    return [a[0] - b[0], a[1] - b[1], a[2] - b[2], a[3] - b[3]];
  },
  /**
   * Subtracts the second vector from the first vector and stores
   * the result in the first vector. Subtracting two vectors
   * is the same as subtracting each of their components.
   * @param {Array<number>} a The first 4-element vector.
   * @param {Array<number>} b The second 4-element vector.
   * @returns {Array<number>} The parameter "a"
   */
  "vec4subInPlace":function(a, b) {
    // Use variables in case a and b are the same
    const b0 = b[0];
    const b1 = b[1];
    const b2 = b[2];
    const b3 = b[3];
    a[0] -= b0;
    a[1] -= b1;
    a[2] -= b2;
    a[3] -= b3;
    return a;
  },
  "vecZeros":function(count) {
    const vec = [];
    let i;
    for (i = 0; i < count; i++) {
      vec[i] = 0;
    }
    return vec;
  },
  "vecSub":function(vec, subVec) {
    const ret = [];
    let i;
    for (i = 0; i < vec.length; i++) {
      ret[i] = vec[i] - subVec[i];
    }
    return ret;
  },
  "vecSubInPlace":function(vec, subVec) {
    let i;
    for (i = 0; i < vec.length; i++) {
      vec[i] -= subVec[i];
    }
    return vec;
  },
  "vecScale":function(vec, scalar) {
    const ret = [];
    let i;
    for (i = 0; i < vec.length; i++) {
      ret[i] = vec[i] * scalar;
    }
    return ret;
  },
  "vecSubScaleInPlace":function(vec, subVec, scaleNum) {
    let i;
    for (i = 0; i < vec.length; i++) {
      vec[i] = (vec[i] - subVec[i]) * scaleNum;
    }
    return vec;
  },
  "vecScaleInPlace":function(vec, scaleNum) {
    let i;
    for (i = 0; i < vec.length; i++) {
      vec[i] *= scaleNum;
    }
    return vec;
  },
  "vecNormalizeInPlace":function(vec) {
    let len = 0;
    let i;
    for (i = 0; i < vec.length; i++) {
      len += vec[i] * vec[i];
    }
    len = Math.sqrt(len);
    if(len !== 0) {
      const invlen = 1.0 / len;
      let i;
      for (i = 0; i < vec.length; i++) {
        vec[i] *= invlen;
      }
    }
    return vec;
  },
  "vecLength":function(vec) {
    let dsq = 0;
    let i;
    for (i = 0; i < vec.length; i++) {
      dsq += vec[i] * vec[i];
    }
    return Math.sqrt(dsq);
  }
};

/**
 * An interpolation timing function based on the path of a
 * cubic B&eacute;zier
 * curve with end points (0, 0) and (1, 1) and with two
 * configurable control points. The x-coordinates of the
 * curve indicate time, and the y-coordinates of the curve
 * indicate how far the interpolation has reached.
 * @param {number} a The Xcoordinate of the first configurable control
 * point of the curve. Should be within the range 0 through 1.
 * @param {number} b The Ycoordinate of the first configurable control
 * point of the curve. Should be within the range 0 through 1,
 * but may exceed this range.
 * @param {number} c The Xcoordinate of the second configurable control
 * point of the curve. Should be within the range 0 through 1.
 * @param {number} d The Ycoordinate of the second configurable control
 * point of the curve. Should be within the range 0 through 1,
 * but may exceed this range.
 * @param {number} t Number ranging from 0 through 1 that
 * indicates time.
 * @returns {number} Number ranging from 0 through 1 that indicates
 * how far the interpolation has reached. Returns 0 if <code>t</code>
 * is 0 or less, and 1 if <code>t</code> is 1 or greater.
 */
MathUtil.interpCubicBezier = function(a, b, c, d, t) {
  if(t <= 0)return 0;
  if(t >= 1)return 1;
  // Find Bezier curve's T for given x-coordinate ("t" parameter passed to
  // this method) using Newton's method
  let tx = t;
  let i;
  for (i = 0; i < 10; i++) {
    const fx = tx * (3 * a * (tx * (tx - 2) + 1) - 3 * c * tx * (tx - 1) + tx * tx) - t;
    if(Math.abs(fx) < 1e-9)break;
    const dfx = 3 * (((3 * tx - 4) * tx + 1) * a + (-3 * tx + 2) * tx * c + tx * tx);
    tx -= fx / dfx;
  }
  // Get y-coordinate
  return tx * (3 * b * (tx * (tx - 2) + 1) - 3 * d * tx * (tx - 1) + tx * tx);
};
/**
 * Finds the dot product of two quaternions.
 * It's equal to the sum of the products of
 * their components (for example, <b>a</b>'s X times <b>b</b>'s X).
 * @function
 * @param {Array<number>} a The first quaternion.
 * @param {Array<number>} b The second quaternion.
 * @returns {number} Return value.
 * @method
 * @static
 * @see {@link MathUtil.vec4dot}
 */
MathUtil.quatDot = MathUtil.vec4dot;
/**
 * Converts a quaternion to a [unit vector]{@tutorial glmath}.
 * When a quaternion is normalized, it describes the same rotation but the distance from the origin
 * to that quaternion becomes 1 (unless all its components are 0).
 * A quaternion is normalized by dividing each of its components
 * by its [length]{@link MathUtil.quatLength}.<p>
 * @function
 * @param {Array<number>} quat A quaternion, containing four elements.
 * @returns {Array<number>} The parameter "quat".
 * Note that due to rounding error, the vector's length might not be exactly equal to 1, and that the vector will remain unchanged if its length is 0 or extremely close to 0.
 * @method
 * @static
 * @see {@link MathUtil.vec4normalizeInPlace}
 */
MathUtil.quatNormalizeInPlace = MathUtil.vec4normalizeInPlace;
/**
 * Converts a quaternion to a [unit vector]{@tutorial glmath}; returns a new quaternion.
 * When a quaternion is normalized, the distance from the origin
 * to that quaternion becomes 1 (unless all its components are 0).
 * A quaternion is normalized by dividing each of its components
 * by its [length]{@link MathUtil.quatLength}.<p>
 * @function
 * @param {Array<number>} quat A quaternion, containing four elements.
 * @returns {Array<number>} The normalized quaternion.
 * Note that due to rounding error, the vector's length might not be exactly equal to 1, and that the vector will remain unchanged if its length is 0 or extremely close to 0.
 * @method
 * @static
 * @see {@link MathUtil.vec4normalize}
 */
MathUtil.quatNormalize = MathUtil.vec4normalize;
/**
 * Returns the distance of this quaternion from the origin.
 * It's the same as the square root of the sum of the squares
 * of its components.
 * @function
 * @param {Array<number>} quat The quaternion.
 * @returns {number} Return value.
 * @method
 * @static
 * @see {@link MathUtil.vec4length}
 */
MathUtil.quatLength = MathUtil.vec4length;
/**
 * Multiplies each element of a quaternion by a factor
 * and stores the result in that quaternion.
 * @function
 * @param {Array<number>} a A quaternion.
 * @param {number} scalar A factor to multiply.
 * @returns {Array<number>} The parameter "a".
 * @method
 * @static
 * @see {@link MathUtil.vec4scaleInPlace}
 */
MathUtil.quatScaleInPlace = MathUtil.vec4scaleInPlace;
/**
 * Multiplies each element of a quaternion by a factor
 * and returns the result as a new quaternion.
 * @function
 * @param {Array<number>} a A quaternion.
 * @param {number} scalar A factor to multiply.
 * @returns {Array<number>} The resulting quaternion.
 * @method
 * @static
 * @see {@link MathUtil.vec4scaleInPlace}
 */
MathUtil.quatScale = MathUtil.vec4scale;
/**
 * Returns a copy of a quaternion.
 * @function
 * @param {Array<number>} a A quaternion.
 * @returns {Array<number>} Return value.
 * @method
 * @static
 * @see {@link MathUtil.vec4copy}
 */
MathUtil.quatCopy = MathUtil.vec4copy;
/**
 * Closest approximation to pi times 2, or a 360-degree turn in radians.
 * @const
 * @default
 */
MathUtil.PiTimes2 = 6.283185307179586476925286766559;
/**
 * Closest approximation to pi divided by 2, or a 90-degree turn in radians.
 * @const
 * @default
 */
MathUtil.HalfPi = 1.5707963267948966192313216916398;
/**
 * Closest approximation to pi divided by 180, or the number
 * of radians in a degree. Multiply by this number to convert degrees to radians.
 * @const
 * @default
 */
MathUtil.PiDividedBy180 = 0.01745329251994329576923690768489;
/**
 * Closest approximation to pi divided by 180, or the number
 * of radians in a degree. Multiply by this number to convert degrees to radians.
 * @const
 * @default
 */
MathUtil.ToRadians = MathUtil.PiDividedBy180;
/**
 * @private
 * @const */
MathUtil.PiDividedBy360 = 0.00872664625997164788461845384244;
/**
 * @private
 * @const */
MathUtil.Num360DividedByPi = 114.59155902616464175359630962821;
/**
 * Closest approximation to 180 divided by pi, or the number of
 * degrees in a radian. Multiply by this number to convert radians to degrees.
 * @const
 * @default
 */
MathUtil.Num180DividedByPi = 57.295779513082320876798154814105;
/**
 * Closest approximation to 180 divided by pi, or the number of
 * degrees in a radian. Multiply by this number to convert radians to degrees.
 * @const
 * @default
 */
MathUtil.ToDegrees = MathUtil.Num180DividedByPi;
/**
 * Indicates that a vector's rotation occurs as a pitch, then yaw, then roll (each rotation around the original axes).
 * @const */
MathUtil.GlobalPitchYawRoll = 0;
/**
 * Indicates that a vector's rotation occurs as a pitch, then roll, then yaw (each rotation around the original axes).
 * @const */
MathUtil.GlobalPitchRollYaw = 1;
/**
 * Indicates that a vector's rotation occurs as a yaw, then pitch, then roll (each rotation around the original axes).
 * @const */
MathUtil.GlobalYawPitchRoll = 2;
/**
 * Indicates that a vector's rotation occurs as a yaw, then roll, then pitch (each rotation around the original axes).
 * @const */
MathUtil.GlobalYawRollPitch = 3;
/**
 * Indicates that a vector's rotation occurs as a roll, then pitch, then yaw (each rotation around the original axes).
 * @const */
MathUtil.GlobalRollPitchYaw = 4;
/**
 * Indicates that a vector's rotation occurs as a roll, then yaw, then pitch (each rotation around the original axes).
 * @const */
MathUtil.GlobalRollYawPitch = 5;
/**
 * Indicates that a vector's rotation occurs as a pitch, then yaw, then roll, where the yaw and roll
 * occur around the rotated object's new axes and not necessarily the original axes.
 * @const */
MathUtil.LocalPitchYawRoll = MathUtil.GlobalRollYawPitch;
/**
 * Indicates that a vector's rotation occurs as a pitch, then roll, then yaw, where the roll and yaw
 * occur around the rotated object's new axes and not necessarily the original axes.
 * @const */
MathUtil.LocalPitchRollYaw = MathUtil.GlobalYawRollPitch;
/**
 * Indicates that a vector's rotation occurs as a yaw, then pitch, then roll, where the pitch and roll
 * occur around the rotated object's new axes and not necessarily the original axes.
 * @const */
MathUtil.LocalYawPitchRoll = MathUtil.GlobalRollPitchYaw;
/**
 * Indicates that a vector's rotation occurs as a yaw, then roll, then pitch, where the roll and pitch
 * occur around the rotated object's new axes and not necessarily the original axes.
 * @const */
MathUtil.LocalYawRollPitch = MathUtil.GlobalPitchRollYaw;
/**
 * Indicates that a vector's rotation occurs as a roll, then pitch, then yaw, where the pitch and yaw
 * occur around the rotated object's new axes and not necessarily the original axes.
 * @const */
MathUtil.LocalRollPitchYaw = MathUtil.GlobalYawPitchRoll;
/**
 * Indicates that a vector's rotation occurs as a roll, then yaw, then pitch, where the yaw and pitch
 * occur around the rotated object's new axes and not necessarily the original axes.
 * @const */
MathUtil.LocalRollYawPitch = MathUtil.GlobalPitchYawRoll;
export {MathUtil};

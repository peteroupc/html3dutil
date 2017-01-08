/*
 Any copyright to this file is released to the Public Domain.
 http://creativecommons.org/publicdomain/zero/1.0/
 If you like this, you should donate
 to Peter O. (original author of
 the Public Domain HTML 3D Library) at:
 http://peteroupc.github.io/
*/
/* global H3DU */

/**
* A collection of math functions for working
* with vectors, matrices, quaternions, and other
* mathematical objects.<p>
* See the tutorial "{@tutorial glmath}" for more information.
* @class
* @alias H3DU.Math
*/
H3DU.Math = {
/**
 * Finds the cross product of two 3-element vectors (called A and B).
 * The following are properties of the cross product:<ul>
 * <li>The cross product will be a vector that is perpendicular to both A and B.
<li>Switching the order of A and B results in a cross product
vector with the same length but opposite direction.
 * <li>If the cross product's [length]{@link H3DU.Math.vec3length} is 0, then A and B are parallel vectors.
 * <li>Let there be a triangle formed by point A, point B, and the point (0,0,0) in that order.
While the cross product of A and B points toward the viewer,
the triangle's vertices are oriented counterclockwise for [right-handed coordinate systems]{@tutorial glmath},
or clockwise for left-handed systems. The triangle's area is half of the cross product's length.
<li>If A and B are [unit vectors]{@tutorial glmath}, the absolute value
 * of the sine of the shortest angle between them is equal to the length of their
 * cross product. <small>(More formally, the length of the cross
 * product equals |<b>a</b>| * |<b>b</b>| * |sin &theta;|;
 * where |<b>x</b>| is the length of vector <b>x</b>.)</small>
* <li>If A and B are unit vectors, the cross product will be a unit vector only if A is perpendicular
  * to B (the shortest angle between A and B will be 90 degrees, since sin 90&deg; = 1).
* </ul>
 * The cross product (<b>c</b>) of vectors <b>a</b> and <b>b</b> is found as
 * follows:<pre>
 * <b>c</b>.x = <b>a</b>.y * <b>b</b>.z - <b>a</b>.z * <b>b</b>.y
 * <b>c</b>.y = <b>a</b>.z * <b>b</b>.x - <b>a</b>.x * <b>b</b>.z
 * <b>c</b>.z = <b>a</b>.x * <b>b</b>.y - <b>a</b>.y * <b>b</b>.x
 * </pre>
 * @param {Array<Number>} a The first 3-element vector.
 * @param {Array<Number>} b The second 3-element vector.
 * @returns {Array<Number>} A 3-element vector containing the cross product.
 * @example <caption>The following example uses the cross product to
 * calculate a triangle's normal vector and its area.</caption>
 * var a=triangle[0];
 * var b=triangle[1];
 * var c=triangle[2];
 * // Find vector from C to A
 * var da=H3DU.Math.vec3sub(a,c);
 * // Find vector from C to B
 * var db=H3DU.Math.vec3sub(b,c);
 * // The triangle's normal is the cross product of da and db
 * var normal=H3DU.Math.vec3cross(da,db);
 * // Find the triangle's area
 * var area=H3DU.Math.vec3length(normal)*0.5;
 */
  "vec3cross":function(a, b) {
    "use strict";
    return [a[1] * b[2] - a[2] * b[1],
      a[2] * b[0] - a[0] * b[2],
      a[0] * b[1] - a[1] * b[0]];
  },
/**
 * Finds the dot product of two 3-element vectors. It's the
 * sum of the products of their components (for example, <b>a</b>'s X times
 * <b>b</b>'s X).<p>
 * The following are properties of the dot product:
 * <ul>
 * <li>If both vectors are [unit vectors]{@tutorial glmath}, the cosine
 * of the angle between them is equal to their dot product.
 * <small>(More formally, the dot
 * product equals |<b>a</b>| * |<b>b</b>| * cos &theta;
 * where |<b>x</b>| is the length of vector <b>x</b>.)</small>
 * However, the resulting angle (found using the <code>Math.acos</code>
 * function) will never be negative, so it can't
 * be used to determine if one vector is "ahead of" or "behind" another
 * vector.
 * <li>A dot product of 0 indicates that the two vectors
 * are <i>orthogonal</i> (perpendicular to each other).
 * <li>If the two vectors are the same, the return value indicates
 * the vector's length squared. This is illustrated in the example.
 * </ul>
 * @param {Array<Number>} a The first 3-element vector.
 * @param {Array<Number>} b The second 3-element vector.
 * @returns {Number} A number representing the dot product.
 * @example <caption>The following shows a fast way to compare
 * a vector's length using the dot product.</caption>
 * // Check if the vector's length squared is less than 20 units squared
 * if(H3DU.Math.vec3dot(vector, vector)<20*20) {
 * // The vector's length is shorter than 20 units
 * }
 */
  "vec3dot":function(a, b) {
    "use strict";
    return a[0] * b[0] + a[1] * b[1] + a[2] * b[2];
  },
/**
  * Finds the scalar triple product of three vectors (A, B, and C). The triple
  * product is the [dot product]{@link H3DU.Math.vec3dot} of both A and the
  * [cross product]{@link H3DU.Math.vec3cross}
  * of B and C. The following are properties of the scalar triple product
  * (called triple product in what follows):<ul>
  * <li>Switching the order of B and C, A and C, or A and B results in a triple product
  * with its sign reversed. Moving all three parameters to different positions, though,
  * results in the same triple product.
  * <li>The triple product's absolute value is the volume of a parallelepiped (skewed
  * box) where three of its sides having a vertex in common are
  * defined by A, B, and C, in any order.
  * <li>If the triple product is 0, all three vectors lie on the same plane (are <i>coplanar</i>).
  * <li>The triple product is the same as the <i>determinant</i> of a 3x3 matrix whose
  * rows or columns are the vectors A, B, and C, in that order.
  * <li>Assume A is a [unit vector]{@tutorial glmath} and perpendicular to vectors B and C. If the triple product
  * is negative (resp. positive), then A points directly away from (resp. points at) the cross product of
  * B and C -- which will be perpendicular -- and the angle from B to C, when rotated
  * about vector A, is negative (resp. positive). (See the example below.)
  *</ul>
  * @param {Array<Number>} a The first 3-element vector.
  * @param {Array<Number>} b The second 3-element vector, or the
  * first parameter to the cross product.
  * @param {Array<Number>} c The third 3-element vector, or the
  * second parameter to the cross product.
  * @returns {Number} A number giving the triple product.
  * @example <caption>The following example finds the signed angle of
  * two vectors that lie on a plane with the given normal.</caption>
  * // The following example uses the positive Z axis as the normal
  * // vector, since it's known to be perpendicular to vectorB and vectorC
  * var normalVector = [0, 0, 1];
  * var vectorB = [4, 2, 0];
  * var vectorC = [5, 0, 0];
  * vectorB=H3DU.Math.vec3normInPlace(vectorB);
  * vectorC=H3DU.Math.vec3normInPlace(vectorC);
  * normalVector=H3DU.Math.vec3normInPlace(normalVector);
  * var dot=H3DU.Math.dot(vectorB,vectorC);
  * // adjust dot for robustness
  * dot=(dot<-1 ? -1 : (dot>1 ? 1 : dot));
  * // acos will always return a positive angle here
  * var angle=Math.acos(dot);
  * var triple=H3DU.Math.vec3triple(normalVector,vectorB,vectorC);
  * // The angle is negative if triple product is negative.
  * // NOTE: While the "normalVector" points toward the viewer,
  * // a positive value for the angle means the angle runs in
  * // a counterclockwise direction for right-handed coordinate systems
  * // and in a clockwise direction for left-handed systems.
  * angle*=(triple<0 ? -1.0 : 1.0);
  */
  "vec3triple":function(a, b, c) {
    "use strict";
    return H3DU.Math.vec3dot(H3DU.Math.vec3cross(b, c));
  },
/**
 * Adds two 3-element vectors and returns a new
 * vector with the result. Adding two vectors
 * is the same as adding each of their components.
 * @param {Array<Number>} a The first 3-element vector.
 * @param {Array<Number>} b The second 3-element vector.
 * @returns {Array<Number>} The resulting 3-element vector.
 */
  "vec3add":function(a, b) {
    "use strict";
    return [a[0] + b[0], a[1] + b[1], a[2] + b[2]];
  },
/**
 * Subtracts the second vector from the first vector and returns a new
 * vector with the result. Subtracting two vectors
 * is the same as subtracting each of their components.<p>
 * @param {Array<Number>} a The first 3-element vector.
 * @param {Array<Number>} b The second 3-element vector.
 * @returns {Array<Number>} The resulting 3-element vector.
 * This is the vector <i>to <code>a</code> from <code>b</code></i>.
 */
  "vec3sub":function(a, b) {
    "use strict";
    return [a[0] - b[0], a[1] - b[1], a[2] - b[2]];
  },
/**
 * Returns a new 3-element
 * vector with the absolute value of each of its components.
 * @param {Array<Number>} a A 3-element vector.
 * @returns {Array<Number>} The resulting 3-element vector.
 */
  "vec3abs":function(a) {
    "use strict";
    return [Math.abs(a[0]), Math.abs(a[1]), Math.abs(a[2])];
  },
/**
 * Returns a new 4-element
 * vector with the absolute value of each of its components.
 * @param {Array<Number>} a A 4-element vector.
 * @returns {Array<Number>} The resulting 4-element vector.
 */
  "vec4abs":function(a) {
    "use strict";
    return [Math.abs(a[0]), Math.abs(a[1]), Math.abs(a[2]), Math.abs(a[3])];
  },
/**
 * Sets each component of the given 3-element
 * vector to its absolute value.
 * @param {Array<Number>} a A 3-element vector.
 * @returns {Array<Number>} The vector "a".
 */
  "vec3absInPlace":function(a) {
    "use strict";
    a[0] = Math.abs(a[0]);
    a[1] = Math.abs(a[1]);
    a[2] = Math.abs(a[2]);
    return a;
  },
/**
 * Sets each component of the given 4-element
 * vector to its absolute value.
 * @param {Array<Number>} a A 4-element vector.
 * @returns {Array<Number>} The vector "a".
 */
  "vec4absInPlace":function(a) {
    "use strict";
    a[0] = Math.abs(a[0]);
    a[1] = Math.abs(a[1]);
    a[2] = Math.abs(a[2]);
    a[3] = Math.abs(a[3]);
    return a;
  },
/**
 * Negates a 3-element vector and returns a new
 * vector with the result, which is generally a vector with
 * the same length but opposite direction. Negating a vector
 * is the same as reversing the sign of each of its components.
 * @param {Array<Number>} a A 3-element vector.
 * @returns {Array<Number>} The resulting 3-element vector.
 */
  "vec3negate":function(a) {
    "use strict";
    return [-a[0], -a[1], -a[2]];
  },
/**
 * Negates a 4-element vector and returns a new
 * vector with the result, which is generally a vector with
 * the same length but opposite direction. Negating a vector
 * is the same as reversing the sign of each of its components.
 * @param {Array<Number>} a A 4-element vector.
 * @returns {Array<Number>} The resulting 4-element vector.
 */
  "vec4negate":function(a) {
    "use strict";
    return [-a[0], -a[1], -a[2], -a[3]];
  },
/**
 * Negates a 3-element vector in place.
Negating a vector
 * is the same as reversing the sign of each of its components.
 * @param {Array<Number>} a A 3-element vector.
 * @returns {Array<Number>} The parameter "a".
 */
  "vec3negateInPlace":function(a) {
    "use strict";
    a[0] = -a[0];
    a[1] = -a[1];
    a[2] = -a[2];
    return a;
  },
/**
 * Negates a 4-element vector in place.
Negating a vector
 * is the same as reversing the sign of each of its components.
 * @param {Array<Number>} a A 4-element vector.
 * @returns {Array<Number>} The parameter "a".
 */
  "vec4negateInPlace":function(a) {
    "use strict";
    a[0] = -a[0];
    a[1] = -a[1];
    a[2] = -a[2];
    a[3] = -a[3];
    return a;
  },
/**
 * Multiplies two vectors and returns a new
 * vector with the result. Multiplying two vectors
 * is the same as multiplying each of their components.
 * @param {Array<Number>} a The first 3-element vector.
 * @param {Array<Number>} b The second 3-element vector.
 * @returns {Array<Number>} The resulting 3-element vector.
 */
  "vec3mul":function(a, b) {
    "use strict";
    return [a[0] * b[0], a[1] * b[1], a[2] * b[2]];
  },
/**
 * Adds two 3-element vectors and stores
 * the result in the first vector. Adding two vectors
 * is the same as adding each of their components.
 * @param {Array<Number>} a The first 3-element vector.
 * @param {Array<Number>} b The second 3-element vector.
 * @returns {Array<Number>} The parameter "a"
 */
  "vec3addInPlace":function(a, b) {
// Use variables in case a and b are the same
    "use strict";
    var b0 = b[0];
    var b1 = b[1];
    var b2 = b[2];
    a[0] += b0;
    a[1] += b1;
    a[2] += b2;
    return a;
  },
/**
 * Subtracts the second vector from the first vector and stores
 * the result in the first vector. Subtracting two vectors
 * is the same as subtracting each of their components.
 * @param {Array<Number>} a The first 3-element vector.
 * @param {Array<Number>} b The second 3-element vector.
 * @returns {Array<Number>} The parameter "a"
 */
  "vec3subInPlace":function(a, b) {
// Use variables in case a and b are the same
    "use strict";
    var b0 = b[0];
    var b1 = b[1];
    var b2 = b[2];
    a[0] -= b0;
    a[1] -= b1;
    a[2] -= b2;
    return a;
  },
/**
 * Multiplies two 3-element vectors and stores
 * the result in the first vector. Multiplying two vectors
 * is the same as multiplying each of their components.
 * @param {Array<Number>} a The first 3-element vector.
 * @param {Array<Number>} b The second 3-element vector.
 * @returns {Array<Number>} The parameter "a"
 */
  "vec3mulInPlace":function(a, b) {
// Use variables in case a and b are the same
    "use strict";
    var b0 = b[0];
    var b1 = b[1];
    var b2 = b[2];
    a[0] *= b0;
    a[1] *= b1;
    a[2] *= b2;
    return a;
  },
/**
 * Multiplies each element of a 3-element vector by a factor
 * (thus multiplying that vector's length by that factor)
 * and stores the result in that vector.
 * @param {Array<Number>} a A 3-element vector.
 * @param {Number} scalar A factor to multiply.
 * @returns {Array<Number>} The parameter "a".
 */
  "vec3scaleInPlace":function(a, scalar) {
    "use strict";
    a[0] *= scalar;
    a[1] *= scalar;
    a[2] *= scalar;
    return a;
  },

/**
 * Multiplies a 3-element vector by a factor
 * (thus multiplying that vector's length by that factor)
 * and returns a new vector with the result.
 * @param {Array<Number>} a A 3-element vector.
 * @param {Number} scalar A factor to multiply.
 * @returns {Array<Number>} The parameter "a".
 */
  "vec3scale":function(a, scalar) {
    "use strict";
    return H3DU.Math.vec3scaleInPlace([a[0], a[1], a[2]], scalar);
  },
/**
 * Does a linear interpolation between two 3-element vectors;
 * returns a new vector.
 * @param {Array<Number>} v1 The first vector to interpolate.
 * The interpolation will occur on each component of this vector and v2.
 * @param {Array<Number>} v2 The second vector to interpolate.
 * @param {Number} factor A value from 0 through 1. Closer to 0 means
 * closer to v1, and closer to 1 means closer to v2.<br>For a nonlinear
 * interpolation, define a function that takes a value from 0 through 1 and returns
 * a value generally ranging from 0 through 1, and pass the result of that
 * function to this method.<br>
 * The following are examples of interpolation functions. See also
 * the code examples following this list.<ul>
 * <li>Linear: <code>factor</code>. Constant speed.
 * <li>Powers: <code>Math.pow(factor, N)</code>, where N &gt; 0.
 * For example, N=2 means a square, N=3 means cube, N=1/2 means square root,
 * and N=1/3 means cube root. If N &gt; 1, this
 * function eases in, that is, it starts slow and ends fast. If N &lt; 1,
 * this function eases out, that is, it starts fast and ends slow.
 * <li>Sine: <code>Math.sin(Math.PI*0.5*factor)</code>. This function eases in.
 * <li>Smoothstep: <code>(3.0-2.0*factor)*factor*factor</code>. This function
 * starts and ends slow, and speeds up in the middle.
<li>Discrete-step timing, where N is a number of steps greater than 0:<ul>
<li>Position start: <code>factor &lt; 0 ? 0 : Math.max(1.0,(1.0+Math.floor(factor*N))/N)</code>.</li>
<li>Position end: <code>Math.floor(factor*N)/N</code>.</li></ul>
 * <li>Inverted interpolation: <code>1.0-INTF(1.0-factor)</code>,
 * where <code>INTF(x)</code>
 * is another interpolation function. This function reverses the speed behavior;
 * for example, a function that eased in now eases out.
 * <li>Ease: <code>factor &lt; 0.5 ? INTF(factor*2)*0.5 : 1.0-(INTF((1.0-factor)*2)*0.5)</code>,
 * where <code>INTF(x)</code> is another interpolation function.
 * Depending on the underlying function, this function eases in,
 * then eases out, or vice versa.
 * </ul>
 * @returns {Array<Number>} The interpolated vector.
 * @example <caption>The following code does a nonlinear
 * interpolation of two vectors that uses the cube of "factor" rather than
 * "factor". Rather than at a constant speed, the vectors are interpolated
 * slowly then very fast.</caption>
 * factor = factor*factor*factor; // cube the interpolation factor
 * var newVector = H3DU.Math.vec3lerp(vector1, vector2, factor);
 * @example <caption>The following code does an inverted cubic
 * interpolation. This time, vectors are interpolated fast then very slowly.</caption>
 * factor = 1 - factor; // Invert the factor
 * factor = factor*factor*factor; // cube the interpolation factor
 * factor = 1 - factor; // Invert the result
 * var newVector = H3DU.Math.vec3lerp(vector1, vector2, factor);
 * @example <caption>The following code does the nonlinear
 *  interpolation called "smoothstep". It slows down at the beginning
 * and end, and speeds up in the middle.</caption>
 * factor = (3.0-2.0*factor)*factor*factor; // smoothstep interpolation
 * var newVector = H3DU.Math.vec3lerp(vector1, vector2, factor);
 */
  "vec3lerp":function(v1, v2, factor) {
    "use strict";
    return [
      v1[0] + (v2[0] - v1[0]) * factor,
      v1[1] + (v2[1] - v1[1]) * factor,
      v1[2] + (v2[2] - v1[2]) * factor
    ];
  },
/**
Returns an arbitrary 3-element vector that is perpendicular
(orthogonal) to the given 3-element vector. The return value
will not be converted to a [unit vector]{@tutorial glmath}.
@param {Array<Number>} vec A 3-element vector.
@returns {Array<Number>} A perpendicular 3-element
vector.  Returns (0,0,0) if "vec" is (0,0,0).
*/
  "vec3perp":function(vec) {
    "use strict";
    var absx = Math.abs(vec[0]);
    var absy = Math.abs(vec[1]);
    var absz = Math.abs(vec[2]);
    var mx = Math.max(absx, absy, absz);
    var normal = [0, 0, 0];
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
* Transforms the 3D point specified in this 3-element vector to its X
* and Y <i>window coordinates</i>, and its projected Z coordinate,
* using the given transformation matrix and viewport
* width and height. The X coordinates in this space increase
* rightward and the Y coordinates in this space increase upward
* or downward depending on the "yUp" parameter.
* @param {Array<Number>} vector A 3-element vector giving
* the X, Y, and Z coordinates of the 3D point to transform.
* @param {Array<Number>} matrix A 4x4 matrix to use to transform
 * the vector according to the {@link H3DU.Math.mat4projectVec3} method.
 * This will generally be
 * a projection-view matrix, that is, the projection matrix multiplied
 * by the view matrix, in that order, if the vector to transform is in <i>world space</i>,
 * or a model-view-projection matrix, that is, a projection-view matrix multiplied
 * by the model (world) matrix, in that order, if the vector is in <i>model (object) space</i>.
* The rest of the method will convert the transformed X and Y coordinates
* to window coordinates. If the matrix includes a projection transform returned
* by {@link H3DU.Math.mat4ortho}, {@link H3DU.Math.mat4perspective}, or
* similar {@link H3DU.Math} methods, the coordinates transformed this way will be
* as described in {@link H3DU.Math.mat4projectVec3} under the "matrix" parameter,
* before they are converted to window coordinates.
* @param {Array<Number>} viewport A 4-element array specifying
* the starting position and size of the viewport in window units
* (such as pixels). In order, the four elements are the starting position's
* X coordinate, its Y coordinate, the viewport's width, and the viewport's
* height. Throws an error if the width or height is less than 0.
* @param {Boolean} [yUp] If true, the viewport's starting position is
* at the lower left corner and Y coordinates in window coordinate space
* increase upward. If false, null, or omitted, the viewport's starting
* position is at the upper left corner and Y coordinates increase downward.
* @returns {Array<Number>} A 3-element array giving the X and Y
* window coordinates, and the projected Z coordinate, in that order.
*/
  "vec3toWindowPoint":function(vector, matrix, viewport, yUp) {
    "use strict";
    if(viewport[2] < 0 || viewport[3] < 0)throw new Error();
   // Transform the vector and do a perspective divide
    var vec = H3DU.Math.mat4projectVec3(matrix, vector);
   // Now convert the projected vector them to window coordinates
    var halfWidth = viewport[2] * 0.5;
    var halfHeight = viewport[3] * 0.5;
    var vecY = yUp ? vec[1] : -vec[1];
    var x = vec[0] * halfWidth + halfWidth + viewport[0];
    var y = vecY * halfHeight + halfHeight + viewport[1];
    return [x, y, vec[2]];
  },
/**
 * Finds the dot product of two 4-element vectors. It's the
 * sum of the products of their components (for example, <b>a</b>'s X times <b>b</b>'s X).
 * @param {Array<Number>} a The first 4-element vector.
 * @param {Array<Number>} b The second 4-element vector.
 * @returns {Object} Return value.
*/
  "vec4dot":function(a, b) {
    "use strict";
    return a[0] * b[0] + a[1] * b[1] + a[2] * b[2] + a[3] * b[3];
  },
/**
 * Multiplies each element of a 4-element vector by a factor
 * (thus multiplying that vector's length by that factor)
 * and stores the result in that vector.
 * @param {Array<Number>} a A 4-element vector.
 * @param {Number} scalar A factor to multiply.
 * @returns {Array<Number>} The parameter "a".
 */
  "vec4scaleInPlace":function(a, scalar) {
    "use strict";
    a[0] *= scalar;
    a[1] *= scalar;
    a[2] *= scalar;
    a[3] *= scalar;
    return a;
  },
/**
 * Multiplies each element of a 4-element vector by a factor
 * (thus multiplying that vector's length by that factor)
 * and returns a new vector with the result.
 * @param {Array<Number>} a A 4-element vector.
 * @param {Number} scalar A factor to multiply.
 * @returns {Array<Number>} The resulting 4-element vector.
 */
  "vec4scale":function(a, scalar) {
    "use strict";
    return [a[0] * scalar, a[1] * scalar, a[2] * scalar, a[3] * scalar];
  },
/**
 * Does a linear interpolation between two 4-element vectors;
 * returns a new vector.
 * @param {Array<Number>} v1 The first vector to interpolate.
 * The interpolation will occur on each component of this vector and v2.
 * @param {Array<Number>} v2 The second vector to interpolate.
 * @param {Number} factor A value from 0 through 1. Closer to 0 means
 * closer to v1, and closer to 1 means closer to v2. For a nonlinear
 * interpolation, define a function that takes a value from 0 through 1
 * and generally returns
 * a value from 0 through 1, and pass the result of that function to this method.
 * See the examples in the documentation for {@link H3DU.Math.vec3lerp}
 * for examples of interpolation functions.
 * @returns {Array<Number>} The interpolated vector.
 */
  "vec4lerp":function(v1, v2, factor) {
    "use strict";
    return [
      v1[0] + (v2[0] - v1[0]) * factor,
      v1[1] + (v2[1] - v1[1]) * factor,
      v1[2] + (v2[2] - v1[2]) * factor,
      v1[3] + (v2[3] - v1[3]) * factor
    ];
  },
/**
 * Converts a 3-element vector to a [unit vector]{@tutorial glmath}.
 * When a vector is normalized, its direction remains the same but the distance from the origin
 * to that vector becomes 1 (unless all its components are 0).
 * A vector is normalized by dividing each of its components
 * by its [length]{@link H3DU.Math.vec3length}.
 * @param {Array<Number>} vec A 3-element vector.
 * @returns {Array<Number>} The parameter "vec".
 */
  "vec3normInPlace":function(vec) {
    "use strict";
    var x = vec[0];
    var y = vec[1];
    var z = vec[2];
    var len = Math.sqrt(x * x + y * y + z * z);
    if(len !== 0) {
      len = 1.0 / len;
      vec[0] *= len;
      vec[1] *= len;
      vec[2] *= len;
    }
    return vec;
  },
  /**
  * Finds the Euclidean distance from one three-element vector
  * to another, treating both as 3D points.
  * @param {Array<Number>} vecFrom The first 3-element vector.
  * @param {Array<Number>} vecTo The second 3-element vector.
  * @returns {Number} The distance between the two vectors.
  */
  "vec3dist":function(vecFrom, vecTo) {
    "use strict";
    return H3DU.Math.vec3length(H3DU.Math.vec3sub(vecFrom, vecTo));
  },
/**
 * Converts a 4-element vector to a [unit vector]{@tutorial glmath}.
 * When a vector is normalized, its direction remains the same but the distance from the origin
 * to that vector becomes 1 (unless all its components are 0).
 * A vector is normalized by dividing each of its components
 * by its [length]{@link H3DU.Math.vec4length}.
 * @param {Array<Number>} vec A 4-element vector.
 * @returns {Array<Number>} The parameter "vec".
 */
  "vec4normInPlace":function(vec) {
    "use strict";
    var x = vec[0];
    var y = vec[1];
    var z = vec[2];
    var w = vec[3];
    var len = Math.sqrt(x * x + y * y + z * z + w * w);
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
 * Converts 3-element vector to a [unit vector]{@tutorial glmath}; returns a new vector.
 * When a vector is normalized, its direction remains the same but the distance from the origin
 * to that vector becomes 1 (unless all its components are 0).
 * A vector is normalized by dividing each of its components
 * by its [length]{@link H3DU.Math.vec3length}.
 * @param {Array<Number>} vec A 3-element vector.
 * @returns {Array<Number>} The resulting vector.
 */
  "vec3norm":function(vec) {
    "use strict";
    return H3DU.Math.vec3normInPlace([vec[0], vec[1], vec[2]]);
  },
/**
 * Converts 3-element vector to a [unit vector]{@tutorial glmath}; returns a new vector.
 * When a vector is normalized, its direction remains the same but the distance from the origin
 * to that vector becomes 1 (unless all its components are 0).
 * A vector is normalized by dividing each of its components
 * by its [length]{@link H3DU.Math.vec4length}.
 * @param {Array<Number>} vec A 4-element vector.
 * @returns {Array<Number>} The resulting vector.
 */
  "vec4norm":function(vec) {
    "use strict";
    return H3DU.Math.vec4normInPlace([vec[0], vec[1], vec[2], vec[3]]);
  },
/**
 * Returns the distance of this 3-element vector from the origin,
  * also known as its <i>length</i> or <i>magnitude</i>.
 * It's the same as the square root of the sum of the squares
 * of its components.
 * @param {Array<Number>} a A 3-element vector.
 * @returns {Number} Return value. */
  "vec3length":function(a) {
    "use strict";
    var dx = a[0];
    var dy = a[1];
    var dz = a[2];
    return Math.sqrt(dx * dx + dy * dy + dz * dz);
  },
/**
 * Returns the distance of this 4-element vector from the origin,
    * also known as its <i>length</i> or <i>magnitude</i>.
 * It's the same as the square root of the sum of the squares
 * of its components.
 * @param {Array<Number>} a A 4-element vector.
 * @returns {Number} Return value. */
  "vec4length":function(a) {
    "use strict";
    var dx = a[0];
    var dy = a[1];
    var dz = a[2];
    var dw = a[3];
    return Math.sqrt(dx * dx + dy * dy + dz * dz + dw * dw);
  },
/**
 * Returns the identity 3x3 matrix (a matrix that keeps
 * vectors unchanged when they are transformed with this matrix).
 * @returns {Array<Number>} Return value. */
  "mat3identity":function() {
    "use strict";
    return [1, 0, 0, 0, 1, 0, 0, 0, 1];
  },
/**
 * Returns the identity 4x4 matrix (a matrix that keeps
 * vectors unchanged when they are transformed with this matrix).
 * @returns {Array<Number>} Return value. */
  "mat4identity":function() {
    "use strict";
    return [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1];
  },
/** Returns the identity quaternion of multiplication, (0, 0, 0, 1).
 * @returns {Array<Number>} Return value.
  */
  "quatIdentity":function() {
    "use strict";
    return [0, 0, 0, 1];
  },
/**
 * Returns a copy of a 4x4 matrix.
 * @param {Array<Number>} mat A 4x4 matrix.
 * @returns {Array<Number>} Return value. */
  "mat4copy":function(mat) {
    "use strict";
    return mat.slice(0, 16);
  },
/**
 * Returns a copy of a 3-element vector.
 * @param {Array<Number>} vec A 3-element vector.
 * @returns {Array<Number>} Return value. */
  "vec3copy":function(vec) {
    "use strict";
    return vec.slice(0, 3);
  },
/**
 * Returns a copy of a 4-element vector.
 * @param {Array<Number>} vec A 4-element vector.
 * @returns {Array<Number>} Return value. */
  "vec4copy":function(vec) {
    "use strict";
    return vec.slice(0, 4);
  },
/**
 * Assigns the values of a 3-element vector into another
 * 3-element vector.
 * @param {Array<Number>} dst The 3-element vector to
 * assign to.
 * @param {Array<Number>} src The 3-element vector whose
 * values will be copied.
 * @returns {Array<Number>} The parameter "dst"
 */
  "vec3assign":function(dst, src) {
    "use strict";
    dst[0] = src[0];
    dst[1] = src[1];
    dst[2] = src[2];
    return dst;
  },
/**
 * Assigns the values of a 4-element vector into another
 * 4-element vector.
 * @param {Array<Number>} dst The 4-element vector to copy
 * the source values to.
 * @param {Array<Number>} src The 4-element vector whose
 * values will be copied.
 * @returns {Array<Number>} The parameter "dst".
 */
  "vec4assign":function(dst, src) {
    "use strict";
    dst[0] = src[0];
    dst[1] = src[1];
    dst[2] = src[2];
    dst[3] = src[3];
    return dst;
  },
/**
 * Returns whether a 4x4 matrix is the identity matrix.
 * @param {Array<Number>} mat A 4x4 matrix.
 * @returns {Boolean} Return value. */
  "mat4isIdentity":function(mat) {
    "use strict";
    return (
    mat[0] === 1 && mat[1] === 0 && mat[2] === 0 && mat[3] === 0 &&
    mat[4] === 0 && mat[5] === 1 && mat[6] === 0 && mat[7] === 0 &&
    mat[8] === 0 && mat[9] === 0 && mat[10] === 1 && mat[11] === 0 &&
    mat[12] === 0 && mat[13] === 0 && mat[14] === 0 && mat[15] === 1
    );
  },
/**
 * Finds the inverse of a 4x4 matrix, describing a transformation that undoes the given transformation.
 * @param {Array<Number>} m A 4x4 matrix.
 * @returns {Array<Number>} The resulting 4x4 matrix.
 * Returns the identity matrix if this matrix is not invertible.
 */
  "mat4invert":function(m) {
    "use strict";
    var tvar0 = m[0] * m[10];
    var tvar1 = m[0] * m[11];
    var tvar2 = m[0] * m[5];
    var tvar3 = m[0] * m[6];
    var tvar4 = m[0] * m[7];
    var tvar5 = m[0] * m[9];
    var tvar6 = m[10] * m[12];
    var tvar7 = m[10] * m[13];
    var tvar8 = m[10] * m[15];
    var tvar9 = m[11] * m[12];
    var tvar10 = m[11] * m[13];
    var tvar11 = m[11] * m[14];
    var tvar14 = m[1] * m[4];
    var tvar15 = m[1] * m[6];
    var tvar16 = m[1] * m[7];
    var tvar17 = m[1] * m[8];
    var tvar19 = m[2] * m[4];
    var tvar20 = m[2] * m[5];
    var tvar21 = m[2] * m[7];
    var tvar22 = m[2] * m[8];
    var tvar23 = m[2] * m[9];
    var tvar25 = m[3] * m[4];
    var tvar26 = m[3] * m[5];
    var tvar27 = m[3] * m[6];
    var tvar28 = m[3] * m[8];
    var tvar29 = m[3] * m[9];
    var tvar32 = m[4] * m[9];
    var tvar35 = m[5] * m[8];
    var tvar37 = m[6] * m[8];
    var tvar38 = m[6] * m[9];
    var tvar40 = m[7] * m[8];
    var tvar41 = m[7] * m[9];
    var tvar42 = m[8] * m[13];
    var tvar43 = m[8] * m[14];
    var tvar44 = m[8] * m[15];
    var tvar45 = m[9] * m[12];
    var tvar46 = m[9] * m[14];
    var tvar47 = m[9] * m[15];
    var tvar48 = tvar14 - tvar2;
    var tvar49 = tvar15 - tvar20;
    var tvar50 = tvar16 - tvar26;
    var tvar51 = tvar19 - tvar3;
    var tvar52 = tvar2 - tvar14;
    var tvar53 = tvar20 - tvar15;
    var tvar54 = tvar21 - tvar27;
    var tvar55 = tvar25 - tvar4;
    var tvar56 = tvar26 - tvar16;
    var tvar57 = tvar27 - tvar21;
    var tvar58 = tvar3 - tvar19;
    var tvar59 = tvar4 - tvar25;
    var det = tvar45 * tvar57 + tvar6 * tvar50 + tvar9 * tvar53 + tvar42 * tvar54 + tvar7 * tvar55 +
tvar10 * tvar58 + tvar43 * tvar56 + tvar46 * tvar59 + tvar11 * tvar48 + tvar44 * tvar49 +
tvar47 * tvar51 + tvar8 * tvar52;
    if(det === 0)return H3DU.Math.mat4identity();
    det = 1.0 / det;
    var r = [];
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
    for(var i = 0;i < 16;i++) {
      r[i] *= det;
    }
    return r;
  },
/**
 * Returns a quaternion that describes a rotation that undoes the given rotation (an "inverted" rotation); this is done by reversing the sign of the X, Y, and Z components (which describe the quaternion's [axis of rotation]{@tutorial glmath}). The return value won't necessarily be a [unit vector]{@tutorial glmath}.
 * @param {Array<Number>} quat A quaternion, containing four elements.
 * @returns {Array<Number>} Return value. */
  "quatConjugate":function(quat) {
    "use strict";
    return [-quat[0], -quat[1], -quat[2], quat[3]];
  },
/**
 * Returns a quaternion that describes a rotation that undoes the given rotation (an "inverted" rotation) and is converted to a [unit vector]{@tutorial glmath}.
 * @param {Array<Number>} quat A quaternion, containing four elements.
 * @returns {Array<Number>} Return value.
 * @see {@link H3DU.Math.quatConjugate}
*/
  "quatInvert":function(quat) {
    "use strict";
    var lsq = 1.0 / H3DU.Math.quatDot(quat, quat);
    return H3DU.Math.vec4scaleInPlace(
  H3DU.Math.quatConjugate(quat), lsq);
  },
/**
* Returns whether this quaternion is the identity quaternion, (0, 0, 0, 1).
 * @param {Array<Number>} quat A quaternion, containing four elements.
* @returns {Boolean} Return value.
*/
  "quatIsIdentity":function(quat) {
    "use strict";
    return quat[0] === 0 && quat[1] === 0 && quat[2] === 0 && quat[3] === 1;
  },
/**
 * Generates a 4x4 matrix describing the rotation
 * described by this quaternion.
 * @param {Array<Number>} quat A quaternion, containing four elements.
 * @returns {Array<Number>} The generated 4x4 matrix.
 */
  "quatToMat4":function(quat) {
    "use strict";
    var tx, ty, tz, xx, xy, xz, yy, yz, zz, wx, wy, wz;
    tx = 2.0 * quat[0];
    ty = 2.0 * quat[1];
    tz = 2.0 * quat[2];
    xx = tx * quat[0];
    xy = tx * quat[1];
    xz = tx * quat[2];
    yy = ty * quat[1];
    yz = tz * quat[1];
    zz = tz * quat[2];
    wx = tx * quat[3];
    wy = ty * quat[3];
    wz = tz * quat[3];
    return [
      1 - (yy + zz), xy + wz, xz - wy, 0,
      xy - wz, 1 - (xx + zz), yz + wx, 0,
      xz + wy, yz - wx, 1 - (xx + yy), 0,
      0, 0, 0, 1
    ];
  },
/**
* Calculates the angle and [axis of rotation]{@tutorial glmath} for this
* quaternion.
* @param {Array<Number>} a A quaternion. Must be a [unit vector]{@tutorial glmath}.
* @returns {Array<Number>} A 4-element array giving the axis
 * of rotation as the first three elements, followed by the angle
 * in degrees as the fourth element. If "a" is a unit vector, the axis
 * of rotation will be a unit vector.
*/
  "quatToAxisAngle":function(a) {
    "use strict";
    var w = a[3];
    var d = 1.0 - w * w;
    if(d > 0) {
      d = 1 / Math.sqrt(d);
      return [a[0] * d, a[1] * d, a[2] * d,
        Math.acos(w) * H3DU.Math.Num360DividedByPi];
    } else {
      return [0, 1, 0, 0];
    }
  },
/**
 * Generates a quaternion describing a rotation between
 * two 3-element vectors. The quaternion
 * will describe the rotation required to rotate
 * the ray described in the first vector toward the ray described
 * in the second vector. The vectors need not be [unit vectors]{@tutorial glmath}.
 * @param {Array<Number>} vec1 The first 3-element vector.
* @param {Array<Number>} vec2 The second 3-element vector.
 * @returns {Array<Number>} The generated quaternion, which
 * will be a unit vector.
 */
  "quatFromVectors":function(vec1, vec2) {
    "use strict";
    var ret = H3DU.Math.vec3cross(vec1, vec2);
    var vecLengths = H3DU.Math.vec3length(vec1) * H3DU.Math.vec3length(vec2);
    if(H3DU.Math.vec3dot(ret, ret) < 1e-9) {
      // The vectors are parallel or close to parallel; there are two possible cases
      var vn1 = H3DU.Math.vec3norm(vec1);
      var vn2 = H3DU.Math.vec3norm(vec2);
      var dot = H3DU.Math.vec3dot(vn1, vn2);
      if(Math.abs(dot) >= 1 - 1e-9) {
       // The vectors point in the same direction or almost so
        return [0, 0, 0, 1];
      } else {
       // The vectors point in opposite directions
        ret = H3DU.Math.vec3perp(vec1);
        ret[3] = 0;
      }
    } else {
      if(vecLengths === 0)vecLengths = 1; // degenerate case
      ret[3] = vecLengths + H3DU.Math.vec3dot(vec1, vec2);
    }
    return H3DU.Math.quatNormInPlace(ret);
  },
/**
 * Generates a quaternion from an angle and [axis of rotation]{@tutorial glmath}.
 * @param {Array<Number>|Number} angle The desired angle
 * to rotate in degrees.  If "v", "vy", and "vz" are omitted, this can
 * instead be a 4-element array giving the axis
 * of rotation as the first three elements, followed by the angle
 * in degrees as the fourth element.
 * @param {Array<Number>|Number} v X-component of the point lying on the axis
 * of rotation.  If "vy" and "vz" are omitted, this can
 * instead be a 3-element array giving the axis
 * of rotation.
 * @param {Number} vy Y-component of the point lying on the axis
 * of rotation.
 * @param {Number} vz Z-component of the point lying on the axis
 * of rotation.
 * @returns {Array<Number>} The generated quaternion.
 */
  "quatFromAxisAngle":function(angle, v, vy, vz) {
    "use strict";
    var v0, v1, v2, ang;
    if(typeof vy !== "undefined" && typeof vz !== "undefined") {
      v0 = v;
      v1 = vy;
      v2 = vz;
      ang = (angle >= 0 && angle < 360 ? angle : angle % 360 + (angle < 0 ? 360 : 0)) * H3DU.Math.PiDividedBy360;
    } else if(typeof v === "undefined") {
      v0 = angle[0];
      v1 = angle[1];
      v2 = angle[2];
      ang = angle[3];
      ang = (angle >= 0 && angle < 360 ? angle : angle % 360 + (angle < 0 ? 360 : 0)) * H3DU.Math.PiDividedBy360;
    } else {
      v0 = v[0];
      v1 = v[1];
      v2 = v[2];
      ang = (angle >= 0 && angle < 360 ? angle : angle % 360 + (angle < 0 ? 360 : 0)) * H3DU.Math.PiDividedBy360;
    }
    var cost = Math.cos(ang);
    var sint = ang >= 0 && ang < 6.283185307179586 ? ang <= 3.141592653589793 ? Math.sqrt(1.0 - cost * cost) : -Math.sqrt(1.0 - cost * cost) : Math.sin(ang);
    var vec = H3DU.Math.vec3normInPlace([v0, v1, v2]);
    var ret = [vec[0], vec[1], vec[2], cost];
    ret[0] *= sint;
    ret[1] *= sint;
    ret[2] *= sint;
    return ret;
  },
/**
 * Generates a quaternion from pitch, yaw and roll angles (or <i>Tait-Bryan angles</i>).
 * See "Axis of Rotation" in "{@tutorial glmath}" for the meaning of each angle.
 * @param {Number} pitchDegrees Rotation about the X axis (upward or downward turn), in degrees.
* This can instead be a 3-element
 * array giving the rotation about the X axis, Y axis, and Z axis,
 * respectively.
 * @param {Number} yawDegrees Rotation about the Y axis (left or right turn), in degrees.
 * May be null or omitted if "pitchDegrees" is an array.
 * @param {Number} rollDegrees Rotation about the Z axis (swaying side by side), in degrees.
 * May be null or omitted if "pitchDegrees" is an array.
 * @param {Number} [mode] Specifies the order in which the rotations will occur (in terms of their effect).
 * This is one of the {@link H3DU.Math} constants such as {@link H3DU.Math.LocalPitchYawRoll}
 * and {@link H3DU.Math.GlobalYawRollPitch}. If null or omitted, the default is {@link H3DU.Math.GlobalRollPitchYaw}.
 * The constants starting with <code>Global</code>
 * describe a rotation in the order given, each about the original axes (these angles are also called <i>extrinsic</i>
 * angles). The constants starting with <code>Local</code> describe a rotation in the order given,
 * where the second and third rotations occur around the rotated object's new axes
 * and not necessarily the original axes (these angles are also called <i>intrinsic</i>
 * angles). The order of <code>Local</code> rotations has the same result as the reversed
 * order of <code>Global</code> rotations and vice versa.
 * @returns {Array<Number>} The generated quaternion.
 */
  "quatFromTaitBryan":function(pitchDegrees, yawDegrees, rollDegrees, mode) {
    "use strict";
    var rollRad, pitchRad, yawRad;
    if(mode === null || typeof mode === "undefined")mode = H3DU.Math.GlobalRollPitchYaw;
    if(mode < 0 || mode >= 6)throw new Error("invalid mode");
    if(pitchDegrees.constructor === Array) {
      rollRad = (pitchDegrees[2] >= 0 && pitchDegrees[2] < 360 ? pitchDegrees[2] : pitchDegrees[2] % 360 + (pitchDegrees[2] < 0 ? 360 : 0)) * H3DU.Math.PiDividedBy360;
      pitchRad = (pitchDegrees[0] >= 0 && pitchDegrees[0] < 360 ? pitchDegrees[0] : pitchDegrees[0] % 360 + (pitchDegrees[0] < 0 ? 360 : 0)) * H3DU.Math.PiDividedBy360;
      yawRad = (pitchDegrees[1] >= 0 && pitchDegrees[1] < 360 ? pitchDegrees[1] : pitchDegrees[1] % 360 + (pitchDegrees[1] < 0 ? 360 : 0)) * H3DU.Math.PiDividedBy360;
    } else {
      rollRad = (rollDegrees >= 0 && rollDegrees < 360 ? rollDegrees : rollDegrees % 360 + (rollDegrees < 0 ? 360 : 0)) * H3DU.Math.PiDividedBy360;
      pitchRad = (pitchDegrees >= 0 && pitchDegrees < 360 ? pitchDegrees : pitchDegrees % 360 + (pitchDegrees < 0 ? 360 : 0)) * H3DU.Math.PiDividedBy360;
      yawRad = (yawDegrees >= 0 && yawDegrees < 360 ? yawDegrees : yawDegrees % 360 + (yawDegrees < 0 ? 360 : 0)) * H3DU.Math.PiDividedBy360;
    }
    var py = Math.cos(pitchRad);
    var px = pitchRad >= 0 && pitchRad < 6.283185307179586 ? pitchRad <= 3.141592653589793 ? Math.sqrt(1.0 - py * py) : -Math.sqrt(1.0 - py * py) : Math.sin(pitchRad);
    var yy = Math.cos(yawRad);
    var yx = yawRad >= 0 && yawRad < 6.283185307179586 ? yawRad <= 3.141592653589793 ? Math.sqrt(1.0 - yy * yy) : -Math.sqrt(1.0 - yy * yy) : Math.sin(yawRad);
    var ry = Math.cos(rollRad);
    var rx = rollRad >= 0 && rollRad < 6.283185307179586 ? rollRad <= 3.141592653589793 ? Math.sqrt(1.0 - ry * ry) : -Math.sqrt(1.0 - ry * ry) : Math.sin(rollRad);
    var t8, t7;
    if(mode === H3DU.Math.GlobalPitchYawRoll || mode === H3DU.Math.GlobalPitchRollYaw) {
      t7 = [rx * yx, ry * yx, rx * yy, ry * yy];
      if(mode === H3DU.Math.GlobalPitchYawRoll)t7[0] = -t7[0];
      t8 = [t7[3] * px + t7[0] * py, t7[1] * py + t7[2] * px, t7[2] * py - t7[1] * px, t7[3] * py - t7[0] * px];
    } else if(mode === H3DU.Math.GlobalYawPitchRoll || mode === H3DU.Math.GlobalYawRollPitch) {
      t7 = [ry * px, rx * px, rx * py, ry * py];
      if(mode === H3DU.Math.GlobalYawRollPitch)t7[1] = -t7[1];
      t8 = [t7[0] * yy - t7[2] * yx, t7[3] * yx + t7[1] * yy, t7[2] * yy + t7[0] * yx, t7[3] * yy - t7[1] * yx];
    } else {
      t7 = [yy * px, yx * py, yx * px, yy * py];
      if(mode === H3DU.Math.GlobalRollPitchYaw)t7[2] = -t7[2];
      t8 = [t7[0] * ry + t7[1] * rx, t7[1] * ry - t7[0] * rx, t7[3] * rx + t7[2] * ry, t7[3] * ry - t7[2] * rx];
    }
    return t8;
  },
/**
 * Converts this quaternion to the same version of the rotation
 * in the form of pitch, yaw, and roll angles (or <i>Tait-Bryan angles</i>).
 * @param {Array<Number>} a A quaternion. Should be a [unit vector]{@tutorial glmath}.
 * @param {Number} [mode] Specifies the order in which the rotations will occur
 * (in terms of their effect, not in terms of how they will be returned by this method).
 * This is one of the {@link H3DU.Math} constants such as {@link H3DU.Math.LocalPitchYawRoll}
 * and {@link H3DU.Math.GlobalYawRollPitch}. If null or omitted, the default is {@link H3DU.Math.GlobalRollPitchYaw}.
 * The constants starting with <code>Global</code>
 * describe a rotation in the order given, each about the original axes (these angles are also called <i>extrinsic</i>
 * angles). The constants starting with <code>Local</code> describe a rotation in the order given,
 * where the second and third rotations occur around the rotated object's new axes
 * and not necessarily the original axes (these angles are also called <i>intrinsic</i>
 * angles). The order of <code>Local</code> rotations has the same result as the reversed
 * order of <code>Global</code> rotations and vice versa.
 * @returns {Array<Number>} A 3-element array containing the
 * pitch, yaw, and roll angles (X, Y, and Z axis angles), in that order, in degrees.
 * See "Axis of Rotation" in "{@tutorial glmath}" for the meaning of each angle.
 */
  "quatToTaitBryan":function(a, mode) {
    "use strict";
    var c0 = a[3];
    var c1, c2, c3;
    var e = 1;
    if(mode === null || typeof mode === "undefined")mode = H3DU.Math.GlobalRollPitchYaw;
    if(mode < 0 || mode >= 6)throw new Error("invalid mode");
    if(mode === H3DU.Math.GlobalRollPitchYaw) {
      c1 = a[1]; c2 = a[0]; c3 = a[2];
      e = -1;
    } else if(mode === H3DU.Math.GlobalPitchYawRoll) {
      c1 = a[2]; c2 = a[1]; c3 = a[0];
      e = -1;
    } else if(mode === H3DU.Math.GlobalPitchRollYaw) {
      c1 = a[1]; c2 = a[2]; c3 = a[0];
    } else if(mode === H3DU.Math.GlobalYawPitchRoll) {
      c1 = a[2]; c2 = a[0]; c3 = a[1];
    } else if(mode === H3DU.Math.GlobalYawRollPitch) {
      c1 = a[0]; c2 = a[2]; c3 = a[1];
      e = -1;
    } else {
      c1 = a[0]; c2 = a[1]; c3 = a[2];
    }
    var sq1 = c1 * c1;
    var sq2 = c2 * c2;
    var sq3 = c3 * c3;
    var e1 = Math.atan2(2 * (c0 * c1 - e * c2 * c3), 1 - (sq1 + sq2) * 2);
    var sine = 2 * (c0 * c2 + e * c1 * c3);
    if(sine > 1.0)sine = 1.0; // for stability
    if(sine < -1.0)sine = -1.0; // for stability
    var e2 = Math.asin(sine);
    var e3 = Math.atan2(2 * (c0 * c3 - e * c1 * c2), 1 - (sq2 + sq3) * 2);
    e1 *= H3DU.Math.Num180DividedByPi;
    e2 *= H3DU.Math.Num180DividedByPi;
    e3 *= H3DU.Math.Num180DividedByPi;
  // Singularity near the poles
    if(Math.abs(e2 - 90) < 0.000001 ||
      Math.abs(e2 + 90) < 0.000001) {
      e3 = 0;
      e1 = Math.atan2(c1, c0) * H3DU.Math.Num180DividedByPi;
      if(isNaN(e1))e1 = 0;
    }
  // Return the pitch/yaw/roll angles in the standard order
    var angles = [];
    if(mode === H3DU.Math.GlobalRollPitchYaw) {
      angles[0] = e2; angles[1] = e1; angles[2] = e3;
    } else if(mode === H3DU.Math.GlobalPitchYawRoll) {
      angles[0] = e3; angles[1] = e2; angles[2] = e1;
    } else if(mode === H3DU.Math.GlobalPitchRollYaw) {
      angles[0] = e3; angles[1] = e1; angles[2] = e2;
    } else if(mode === H3DU.Math.GlobalYawPitchRoll) {
      angles[0] = e2; angles[1] = e3; angles[2] = e1;
    } else if(mode === H3DU.Math.GlobalYawRollPitch) {
      angles[0] = e1; angles[1] = e3; angles[2] = e2;
    } else {
      angles[0] = e1; angles[1] = e2; angles[2] = e3;
    }
    return angles;
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
 * the {@link H3DU.Math.quatSlerp} method.
 * @param {Array<Number>} q1 The first quaternion. Must be a unit vector.
 * @param {Array<Number>} q2 The second quaternion. Must be a unit vector.
 * @param {Number} factor A value from 0 through 1. Closer to 0 means
 * closer to q1, and closer to 1 means closer to q2.
 * @returns {Array<Number>} The interpolated quaternion,
 * which will be a unit vector.
*/
  "quatNlerp":function(q1, q2, factor) {
    "use strict";
    var t1 = 1.0 - factor;
    var t2 = q1[0] * t1;
    var t3 = q1[1] * t1;
    var t4 = q1[2] * t1;
    var t5 = q1[3] * t1;
    var t6 = q2[0] * factor;
    var t7 = q2[1] * factor;
    var t8 = q2[2] * factor;
    var t9 = q2[3] * factor;
    var t10 = q1[0] * q2[0] + q1[1] * q2[1] + q1[2] * q2[2] + q1[3] * q2[3];
    if (t10 < 0.0) {
      return H3DU.Math.quatNormInPlace([t2 - t6, t3 - t7, t4 - t8, t5 - t9]);
    } else {
      return H3DU.Math.quatNormInPlace([t2 + t6, t3 + t7, t4 + t8, t5 + t9]);
    }
  },
/**
 * Returns a quaternion that lies along the shortest path between the
 * given two quaternion rotations, using a spherical interpolation function.
 * This is called spherical linear interpolation, or "slerp". (A spherical
 * interpolation finds the angle between the two quaternions -- which
 * are treated as 4D vectors -- and then finds a vector with a smaller angle
 * between it and the first quaternion.  The "factor" parameter specifies
 * how small the new angle will be relative to the original angle.)<p>
 * This method will generally interpolate at constant velocity; however,
 * this method is commutative (the order in which the quaternions are given
 * matters), unlike [quatNlerp]{@link H3DU.Math.quatNlerp}, making it
 * unsuitable for blending multiple quaternion rotations,
 * and this method is generally more computationally expensive
 * than the [quatNlerp]{@link H3DU.Math.quatNlerp} method.
 * @param {Array<Number>} q1 The first quaternion. Must be a [unit vector]{@tutorial glmath}.
 * @param {Array<Number>} q2 The second quaternion. Must be a unit vector.
 * @param {Number} factor A value from 0 through 1. Closer to 0 means
 * closer to q1, and closer to 1 means closer to q2.
 * @returns {Array<Number>} The interpolated quaternion.
 * @see ["Understanding Slerp, Then Not Using It", Jonathan Blow](http://number-none.com/product/Understanding%20Slerp,%20Then%20Not%20Using%20It/),
 * for additional background
 */
  "quatSlerp":function(q1, q2, factor) {
    "use strict";
    var cosval = H3DU.Math.quatDot(q1, q2);
    var qd = q2;
    if(cosval < 0) {
      qd = [-q2[0], -q2[1], -q2[2], -q2[3]];
      cosval = H3DU.Math.quatDot(q1, qd);
    }
    var angle = 0;
    if(cosval > -1) {
      if(cosval < 1) {
        angle = Math.acos(cosval);
        if(angle === 0)
          return H3DU.Math.quatNlerp(q1, q2, factor);
      } else {
        return H3DU.Math.quatNlerp(q1, q2, factor);
      }
    } else {
      angle = Math.PI;
    }
    var s = Math.sin(angle);
    var sinv = 1.0 / s;
    var c1 = Math.sin((1.0 - factor) * angle) * sinv;
    var c2 = Math.sin(factor * angle) * sinv;
    return [
      q1[0] * c1 + qd[0] * c2,
      q1[1] * c1 + qd[1] * c2,
      q1[2] * c1 + qd[2] * c2,
      q1[3] * c1 + qd[3] * c2
    ];
  },
/**
 * Multiplies a quaternion by a rotation transformation
 * described as an angle and [axis of rotation]{@tutorial glmath}.
 * The result is such that the angle-axis
 * rotation happens before the quaternion's rotation when applied
 * in the global coordinate frame.<p>
 * This method is equivalent to the following:<pre>
 * return quatMultiply(quat,quatFromAxisAngle(angle,v,vy,vz));
 * </pre>
 * @param {Array<Number>} quat Quaternion to rotate.
 * @param {Array<Number>|Number} angle The desired angle
 * to rotate in degrees.  If "v", "vy", and "vz" are omitted, this can
 * instead be a 4-element array giving the axis
 * of rotation as the first three elements, followed by the angle
 * in degrees as the fourth element.
 * @param {Array<Number>|Number} v X-component of the point lying on the axis
 * of rotation.  If "vy" and "vz" are omitted, this can
 * instead be a 3-element array giving the axis
 * of rotation.
 * @param {Number} vy Y-component of the point lying on the axis
 * of rotation.
 * @param {Number} vz Z-component of the point lying on the axis
 * of rotation.
 * @returns {Array<Number>} The resulting quaternion.
 */
  "quatRotate":function(quat, angle, v, vy, vz) {
    "use strict";
    return H3DU.Math.quatMultiply(quat,
    H3DU.Math.quatFromAxisAngle(angle, v, vy, vz));
  },
/**
 * Transforms a 3- or 4-element vector using a quaternion's rotation.
 * @param {Array<Number>} q A quaternion describing
 * the rotation.
 * @param {Array<Number>} v A 3- or 4-element vector to
 * transform. The fourth element, if any, is ignored.
 * @returns {Array<Number>} A 4-element vector representing
* the transformed vector. The fourth element will be 1.0.
* If the input vector has 3 elements, a 3-element vector will
  * be returned instead.
 */
  "quatTransform":function(q, v) {
    "use strict";
    var t1 = q[1] * v[2] - q[2] * v[1] + v[0] * q[3];
    var t2 = q[2] * v[0] - q[0] * v[2] + v[1] * q[3];
    var t3 = q[0] * v[1] - q[1] * v[0] + v[2] * q[3];
    var t4 = q[0] * v[0] + q[1] * v[1] + q[2] * v[2];
    if(v.length === 3) {
      return [t1 * q[3] - (t2 * q[2] - t3 * q[1]) + q[0] * t4,
        t2 * q[3] - (t3 * q[0] - t1 * q[2]) + q[1] * t4,
        t3 * q[3] - (t1 * q[1] - t2 * q[0]) + q[2] * t4];
    }
    return [t1 * q[3] - (t2 * q[2] - t3 * q[1]) + q[0] * t4,
      t2 * q[3] - (t3 * q[0] - t1 * q[2]) + q[1] * t4,
      t3 * q[3] - (t1 * q[1] - t2 * q[0]) + q[2] * t4];
  },
/**
 * Generates a quaternion from the rotation described in a 4x4 matrix.
 * The upper 3x3 portion of the matrix is used for this calculation.
 * The results are undefined if the matrix includes any transformation
 * other than rotation.
 * @param {Array<Number>} m A 4x4 matrix.
 * @returns {Array<Number>} The resulting quaternion.
 */
  "quatFromMat4":function(m) {
    "use strict";
    var ret = [];
    var xy = m[1];
    var xz = m[2];
    var yx = m[4];
    var yz = m[6];
    var zx = m[8];
    var zy = m[9];
    var trace = m[0] + m[5] + m[10];
    var s, t;
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
/**
 * Returns the upper-left part of a 4x4 matrix as a new
 * 3x3 matrix.
 * @param {Array<Number>} m4 A 4x4 matrix.
 * @returns {Array<Number>} The resulting 3x3 matrix.
 */
  "mat4toMat3":function(m4) {
    "use strict";
    return [
      m4[0], m4[1], m4[2],
      m4[4], m4[5], m4[6],
      m4[8], m4[9], m4[10]
    ];
  },
/**
 * Returns the transpose of a 4x4 matrix. (A transpose is a
  * matrix whose rows are converted to columns and vice versa.)
 * @param {Array<Number>} m4 A 4x4 matrix.
 * @returns {Array<Number>} The resulting 4x4 matrix.
 */
  "mat4transpose":function(m4) {
    "use strict";
    return H3DU.Math.mat4transposeInPlace(m4.slice(0, 16));
  },
/**
 * Transposes a 4x4 matrix in place without creating
 * a new matrix. (A transpose is a matrix whose rows
 * are converted to columns and vice versa.)
 * @param {Array<Number>} mat A 4x4 matrix.
 * @returns {Array<Number>} The parameter "mat".
 */
  "mat4transposeInPlace":function(mat) {
    "use strict";
    var tmp = mat[1];mat[1] = mat[4];mat[4] = tmp;
    tmp = mat[2];mat[2] = mat[8];mat[8] = tmp;
    tmp = mat[3];mat[3] = mat[12];mat[12] = tmp;
    tmp = mat[6];mat[6] = mat[9];mat[9] = tmp;
    tmp = mat[7];mat[7] = mat[13];mat[13] = tmp;
    tmp = mat[11];mat[11] = mat[14];mat[14] = tmp;
    return mat;
  },
/**
* Returns the transposed result of the inverted 3x3 upper left corner of
* the given 4x4 matrix.<p>
* This is usually used to convert a model-view matrix to a matrix
* for transforming surface normals in order to keep them perpendicular
* to a surface transformed by the world matrix. Normals are then
* transformed by this matrix and then converted to [unit vectors]{@tutorial glmath}. But if the
* input matrix uses only rotations, translations, and/or uniform scaling
* (same scaling in X, Y, and Z), the 3x3 upper left of the input matrix can
* be used instead of the inverse-transpose matrix to transform the normals.
* @param {Array<Number>} m4 A 4x4 matrix.
* @returns {Array<Number>} The resulting 3x3 matrix. If the matrix
* can't be inverted, returns the identity 3x3 matrix.
*/
  "mat4inverseTranspose3":function(m4) {
    "use strict";
    if(m4[1] === 0 && m4[2] === 0 && m4[4] === 0 &&
   m4[6] === 0 && m4[8] === 0 && m4[9] === 0) {
      if(m4[0] === 1 && m4[5] === 1 && m4[10] === 1) {
  // upper 3x3 is identity
        return [1, 0, 0, 0, 1, 0, 0, 0, 1];
      } else if(m4[0] * m4[5] * m4[10] !== 0) {
  // upper 3x3 is simple scaling
        return [1 / m4[0], 0, 0, 0, 1 / m4[5], 0, 0, 0, 1 / m4[10]];
      } else {
  // upper 3x3 is uninvertable scaling
        return [1, 0, 0, 0, 1, 0, 0, 0, 1];
      }
    }
    var m = [m4[0], m4[1], m4[2], m4[4], m4[5], m4[6],
      m4[8], m4[9], m4[10]];
    var det = m[0] * m[4] * m[8] +
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
 * Multiplies a 4x4 matrix by a scaling transformation.
 * @param {Array<Number>} mat 4x4 matrix to multiply.
 * @param {Array<Number>|Number} v3 Scale factor along the
 * X axis. A scale factor can be negative, in which case the transformation
 * also causes reflection about the corresponding axis.  If "v3y" and "v3z" are omitted, this value can instead
 * be a 3-element array giving the scale factors along the X, Y, and
 * Z axes.
 * @param {Number} v3y Scale factor along the Y axis.
 * @param {Number} v3z Scale factor along the Z axis.
 * @returns {Array<Number>} The resulting 4x4 matrix.
 */
  "mat4scale":function(mat, v3, v3y, v3z) {
    "use strict";
    var scaleX, scaleY, scaleZ;
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
 * Returns a 4x4 matrix representing a scaling transformation.
 * @param {Array<Number>|Number} v3 Scale factor along the
 * X axis. A scale factor can be negative, in which case the transformation
 * also causes reflection about the corresponding axis.  If "v3y" and "v3z" are omitted, this value can instead
 * be a 3-element array giving the scale factors along the X, Y, and
 * Z axes.
 * @param {Number} v3y Scale factor along the Y axis.
 * @param {Number} v3z Scale factor along the Z axis.
 * @returns {Array<Number>} The resulting 4x4 matrix.
 */
  "mat4scaled":function(v3, v3y, v3z) {
    "use strict";
    if(typeof v3y !== "undefined" && typeof v3z !== "undefined") {
      return [v3, 0, 0, 0, 0, v3y, 0, 0, 0, 0, v3z, 0, 0, 0, 0, 1];
    } else {
      return [v3[0], 0, 0, 0, 0, v3[1], 0, 0, 0, 0, v3[2], 0, 0, 0, 0, 1];
    }
  },
/**
 * Transforms a 4-element vector with a 4x4 matrix and returns
 * the transformed vector.
 * @param {Array<Number>} mat A 4x4 matrix.
 * @param {Array<Number>|Number} v X coordinate.
 * If "vy", "vz", and "vw" are omitted, this value can instead
 * be a 4-element array giving the X, Y, Z, and W coordinates.
 * @param {Number} vy Y coordinate.
 * @param {Number} vz Z coordinate.
 * @param {Number} vw W coordinate. To transform a 3D
 * point, set W to 1; to transform a 2D
 * point, set Z and W to 1.
 * @returns {Array<Number>} The transformed vector.
 */
  "mat4transform":function(mat, v, vy, vz, vw) {
    "use strict";
    var x, y, z, w;
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
 * Transforms a 3-element vector with the first three rows
 * of a 4x4 matrix (in column-major order) and returns the transformed vector.
 * This method assumes the matrix describes an affine
 * transformation, without perspective.<p>
 * The effect is as though elements
 * 3, 7, 11, and 15 (counting from 0) of the matrix
 * were assumed to be (0, 0, 0, 1) instead of their actual values
 * (those elements correspond to the last
 * row of the matrix in column-major order) and as though the 3-element
 * vector had a fourth element valued at 1.<p>
 * For transforming 3-dimensional coordinates
 * with a matrix that may be in a perspective
 * projection (whose last row is not necessarily (0, 0, 0, 1)), use
 * the {@link H3DU.Math.mat4projectVec3} method instead.
 * @param {Array<Number>} mat A 4x4 matrix.
 * @param {Array<Number>|Number} v X coordinate.
 * If "vy" and "vz" are omitted, this value can instead
 * be a 4-element array giving the X, Y, and Z coordinates.
 * @param {Number} vy Y coordinate.
 * @param {Number} vz Z coordinate. To transform a 2D
 * point, set Z to 1.
 * @returns {Array<Number>} The transformed 3-element vector.
 */
  "mat4transformVec3":function(mat, v, vy, vz) {
    "use strict";
    var x, y, z;
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
 * Transforms a 3-element vector with a 4x4 matrix and returns
 * a perspective-correct version of the vector as a 3D point. <p>
 * The transformation involves
 * multiplying the matrix by a 4-element column vector with the same X,
 * Y, and Z coordinates, but with a W coordinate equal to 1, and
 * then dividing X, Y, and Z of the resulting 4-element
 * vector by that vector's W (a <i>perspective divide</i>),
 * then returning that vector's new X, Y, and Z.<p>
 * @param {Array<Number>} mat A 4x4 matrix to use to transform
 * the vector. This will generally be
 * a projection-view matrix, that is, the projection matrix multiplied
 * by the view matrix, in that order, if the vector to transform is in <i>world space</i>,
 * or a model-view-projection matrix, that is, a projection-view matrix multiplied
 * by the model (world) matrix, in that order, if the vector is in <i>model (object) space</i>.
 * If the matrix includes a projection transform returned
 * by {@link H3DU.Math.mat4ortho}, {@link H3DU.Math.mat4perspective}, or
 * similar {@link H3DU.Math} methods, the view volume will range from -1 to 1
 * in the X, Y, and Z coordinates (as is the case in WebGL) and the X, Y, and Z coordinates
 * increase from left to right, front to back, and bottom to top (as is the case in WebGL).
 * (For Y coordinates that increase from
 * top to bottom, reverse the sign of the Y coordinate of this method's return value.)
 * @param {Array<Number>|Number} v X coordinate of a 3D point to transform.
 * If "vy" and "vz" are omitted, this value can instead
 * be a 3-element array giving the X, Y, and Z coordinates.
 * @param {Number} vy Y coordinate.
 * @param {Number} vz Z coordinate. To transform a 2D
 * point, set Z to 1.
 * @returns {Array<Number>} The transformed 3-element vector.
 * The elements, in order, are
 * the transformed vector's X, Y, and Z coordinates.
 */
  "mat4projectVec3":function(mat, v, vy, vz) {
    "use strict";
    var x, y, z;
    if(typeof vy !== "undefined" && typeof vz !== "undefined") {
      x = v;
      y = vy;
      z = vz;
    } else {
      x = v[0];
      y = v[1];
      z = v[2];
    }
    var x1 = x * mat[0] + y * mat[4] + z * mat[8] + mat[12];
    var y1 = x * mat[1] + y * mat[5] + z * mat[9] + mat[13];
    var z1 = x * mat[2] + y * mat[6] + z * mat[10] + mat[14];
    var w = 1.0 / (x * mat[3] + y * mat[7] + z * mat[11] + mat[15]);
    return [x1 * w, y1 * w, z1 * w];
  },
/**
 * Transforms a 3-element vector with a 3x3 matrix and returns
 * the transformed vector.
 * @param {Array<Number>} mat A 3x3 matrix.
 * @param {Array<Number>|Number} v X coordinate.
 * If "vy", and "vz" are omitted, this value can instead
 * be a 4-element array giving the X, Y, and Z coordinates.
 * @param {Number} vy Y coordinate.
 * @param {Number} vz Z coordinate. To transform a 2D
 * point, set Z to 1.
 * @returns {Array<Number>} The transformed vector.
 */
  "mat3transform":function(mat, v, vy, vz) {
    "use strict";
    var x, y, z;
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
 * Returns a 4x4 matrix representing a translation.
 * @param {Array<Number>|Number} v3 Translation along the
 * X axis.  If "v3y" and "v3z" are omitted, this value can instead
 * be a 3-element array giving the translations along the X, Y, and
 * Z axes.
 * @param {Number} v3y Translation along the Y axis.
 * @param {Number} v3z Translation along the Z axis.
 * @returns {Array<Number>} The resulting 4x4 matrix.
 */
  "mat4translated":function(v3, v3y, v3z) {
    "use strict";
    var x, y, z;
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
 * Multiplies a 4x4 matrix by a translation transformation.
 * @param {Array<Number>} mat The matrix to multiply.
 * @param {Array<Number>|Number} v3 Translation along the
 * X axis.  If "v3y" and "v3z" are omitted, this value can instead
 * be a 3-element array giving the translations along the X, Y, and
 * Z axes.
 * @param {Number} v3y Translation along the Y axis.
 * @param {Number} v3z Translation along the Z axis.
 * @returns {Array<Number>} The resulting 4x4 matrix.
 */
  "mat4translate":function(mat, v3, v3y, v3z) {
    "use strict";
    var x, y, z;
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
 * Returns a 4x4 matrix representing a [perspective projection]{@tutorial camera}.<p>
 * This method is designed for enabling a [right-handed coordinate system]{@tutorial glmath}.
 * To adjust the result of this method for a left-handed system,
 * reverse the sign of the 9th, 10th, 11th, and 12th
 * elements of the result (zero-based indices 8, 9, 10, and 11).
* @param {Number} fovY Y axis field of view, in degrees, that is, the shortest angle
* between the top and bottom clipping planes. Should be less
* than 180 degrees. (The smaller
* this number, the bigger close objects appear to be. As a result, zooming out
* can be implemented by raising this value, and zooming in by lowering it.)
* @param {Number} aspectRatio The ratio of width to height of the viewport, usually
* the scene's aspect ratio.
* @param {Number} near The distance from the "camera" to
* the near clipping plane. Objects closer than this distance won't be
* seen.<p>This value should be greater than 0, and should be set to the highest distance
* from the "camera" that the application can afford to clip out for being too
* close, for example, 0.5, 1, or higher.
* @param {Number} far The distance from the "camera" to
* the far clipping plane. Objects beyond this distance will be too far
* to be seen.<br>This value is usually greater than "near", should be greater than 0, and should be set so that the absolute ratio of "far" to "near"
* is as small as the application can accept.<br>
 * (Most WebGL implementations support 24-bit depth buffers, meaning they support 16,777,216 possible values per pixel,
 * which, in the usual case that "far" is greater than "near", are more spread out toward the far clipping plane than toward the
 * near plane due to the perspective projection.  The greater the ratio of "far" to
 * "near", the more the values spread out, and the more likely two objects close
 * to the far plane will have identical depth values.)
 * @returns {Array<Number>} The resulting 4x4 matrix.
 */
  "mat4perspective":function(fovY, aspectRatio, near, far) {
    "use strict";
    var fov = (fovY >= 0 && fovY < 360 ? fovY : fovY % 360 + (fovY < 0 ? 360 : 0)) * H3DU.Math.PiDividedBy360;
    var f = 1 / Math.tan(fov);
    var nmf = near - far;
    nmf = 1 / nmf;
    return [f / aspectRatio, 0, 0, 0, 0, f, 0, 0, 0, 0,
      nmf * (near + far), -1, 0, 0, nmf * near * far * 2, 0];
  },
/**
 * Returns a 4x4 matrix that represents a camera view and
  * transforms world space coordinates to <i>eye space</i>
  * (or <i>camera space</i>). In eye space:<ul>
  * <li>The "camera" is found at the origin (0,0,0), or
       * at <code>viewerPos</code> in world space,
       * and faces the <code>lookingAt</code> position in world space. This generally
       * puts <code>lookingAt</code> at the center of the view.
  * <li>The X axis points rightward from the "camera"'s viewpoint.
  * <li>The <code>up</code> vector guides which direction the Y axis points in.
  * <li>The "camera" points along the Z axis away from the viewer.</ul><p>
 * This method is designed for use in a [right-handed coordinate system]{@tutorial glmath}
 * (the "camera" will point away from the Z axis).
 * To adjust the result of this method for a left-handed system,
 * reverse the sign of the 1st, 3rd, 5th, 7th, 9th, 11th,
 * 13th, and 15th elements of the result (zero-based indices 0, 2, 4, 6, 8,
 * 10, 12, and 14); doing so will point the "camera" toward the Z axis.
* @param {Array<Number>} viewerPos A 3-element vector specifying
* the "camera" position in world space.
* @param {Array<Number>} [lookingAt] A 3-element vector specifying
* the point in world space that the "camera" is looking at. May be null or omitted,
* in which case the default is the coordinates (0,0,0).
* @param {Array<Number>} [up] A 3-element vector specifying
* the direction from the center of the "camera" to its top. This parameter may
* be null or omitted, in which case the default is the vector (0, 1, 0),
* the vector that results when the "camera" is held upright.<br>
* This vector must not point in the same or opposite direction as
* the view direction (the direction from "viewerPos" to "lookingAt").
* (See the example for one way to ensure this.)<br>
 * @returns {Array<Number>} The resulting 4x4 matrix.
 * @example <caption>The following example calls this method with an
 * up vector of (0, 1, 0) except if the view direction is parallel to that
 * vector or nearly so.</caption>
 * var upVector=[0,1,0]; // Y axis
 * var viewdir=H3DU.Math.vec3sub(lookingAt, viewerPos);
 * var par=H3DU.Math.vec3length(H3DU.Math.vec3cross(viewdir,upVector));
 * if(par<0.00001)upVector=[0,0,1]; // view is almost parallel, so use Z axis
 * var matrix=H3DU.Math.mat4lookat(viewerPos,lookingAt,upVector);
 */
  "mat4lookat":function(viewerPos, lookingAt, up) {
    "use strict";
    if(up === null || typeof up === "undefined")up = [0, 1, 0];
    if(lookingAt === null || typeof lookingAt === "undefined")lookingAt = [0, 0, 0];
    var f = H3DU.Math.vec3sub(lookingAt, viewerPos);
    var len = H3DU.Math.vec3length(f);
    if(len < 1e-6) {
      return H3DU.Math.mat4identity();
    }
   // "f" is the normalized vector from "viewerPos" to "lookingAt"
    H3DU.Math.vec3scaleInPlace(f, 1.0 / len);
    // normalize the "up" vector
    up = H3DU.Math.vec3norm(up);
    // make "s" a vector perpendicular to "f" and "up" vector;
    // "s" will point rightward from the camera's viewpoint.
    var s = H3DU.Math.vec3cross(f, up);
    H3DU.Math.vec3normInPlace(s);
    // orthonormalize the "up" vector
    var u = H3DU.Math.vec3cross(s, f);
    H3DU.Math.vec3normInPlace(u);
    // negate the "f" vector so that it points forward from
    // the camera's viewpoint
    H3DU.Math.vec3negateInPlace(f);
    return [s[0], u[0], f[0], 0, s[1], u[1], f[1], 0, s[2], u[2], f[2], 0,
      -H3DU.Math.vec3dot(viewerPos, s),
      -H3DU.Math.vec3dot(viewerPos, u),
      -H3DU.Math.vec3dot(viewerPos, f), 1];
  },
/**
 * Returns a 4x4 matrix representing an [orthographic projection]{@tutorial camera}.
 * In this projection, the left clipping plane is parallel to the right clipping
 * plane and the top to the bottom.<p>
   * This method is designed for enabling a [right-handed coordinate system]{@tutorial glmath}.
 * To adjust the result of this method for a left-handed system,
 * reverse the sign of the 9th, 10th, 11th, and 12th
 * elements of the result (zero-based indices 8, 9, 10, and 11).
  *<p>The projection returned by this method only scales and/or shifts the view, so that
  * objects with the same size won't appear smaller as they get more distant from the  "camera".
 * @param {Number} l Leftmost coordinate of the orthographic view.
 * @param {Number} r Rightmost coordinate of the orthographic view.
 * (If l is greater than r, X coordinates increase leftward; otherwise,
 * they increase rightward.)
 * @param {Number} b Bottommost coordinate of the orthographic view.
 * @param {Number} t Topmost coordinate of the orthographic view.
 * (If t is greater than b, Y coordinates increase upward [as they do in WebGL when just this matrix is used to transform vertices]; otherwise, they increase downward.)
 * @param {Number} n Distance from the "camera" to the near clipping
 * plane. A positive value means the plane is in front of the viewer.
 * @param {Number} f Distance from the "camera" to the far clipping
 * plane. A positive value means the plane is in front of the viewer.
 * (Note that n can be greater than f or vice versa.) The absolute difference
 * between n and f should be as small as the application can accept.
 * @returns {Array<Number>} The resulting 4x4 matrix.
 */
  "mat4ortho":function(l, r, b, t, n, f) {
    "use strict";
    var width = 1 / (r - l);
    var height = 1 / (t - b);
    var depth = 1 / (f - n);
    return [2 * width, 0, 0, 0, 0, 2 * height, 0, 0, 0, 0, -2 * depth, 0,
      -(l + r) * width, -(t + b) * height, -(n + f) * depth, 1];
  },

/**
 * Returns a 4x4 matrix representing a [perspective projection]{@tutorial camera},
 * given an X axis field of view.</p>
   * This method is designed for enabling a [right-handed coordinate system]{@tutorial glmath}.
 * To adjust the result of this method for a left-handed system,
 * reverse the sign of the 9th, 10th, 11th, and 12th
 * elements of the result (zero-based indices 8, 9, 10, and 11).
* @param {Number} fovX X axis field of view, in degrees, that is, the shortest angle
* between the left and right clipping planes. Should be less
* than 180 degrees. (The smaller
* this number, the bigger close objects appear to be. As a result, zooming out
* can be implemented by raising this value, and zooming in by lowering it.)
* @param {Number} aspectRatio The ratio of width to height of the viewport, usually
* the scene's aspect ratio.
* @param {Number} near The distance from the "camera" to
* the near clipping plane. Objects closer than this distance won't be
* seen.<p>This value should be greater than 0, and should be set to the highest distance
* from the "camera" that the application can afford to clip out for being too
* close, for example, 0.5, 1, or higher.
* @param {Number} far The distance from the "camera" to
* the far clipping plane. Objects beyond this distance will be too far
* to be seen.<br>This value is usually greater than "near", should be greater than 0, and should be set so that the absolute ratio of "far" to "near"
* is as small as the application can accept.<br>
 * (Most WebGL implementations support 24-bit depth buffers, meaning they support 16,777,216 possible values per pixel,
 * which, in the usual case that "far" is greater than "near", are more spread out toward the far clipping plane than toward the
 * near plane due to the perspective projection.  The greater the ratio of "far" to
 * "near", the more the values spread out, and the more likely two objects close
 * to the far plane will have identical depth values.)
 * @returns {Array<Number>} The resulting 4x4 matrix.
 */
  "mat4perspectiveHorizontal":function(fovX, aspectRatio, near, far) {
    "use strict";
    var fov = (fovX >= 0 && fovX < 360 ? fovX : fovX % 360 + (fovX < 0 ? 360 : 0)) * H3DU.Math.PiDividedBy360;
    var fovY = H3DU.Math.Num360DividedByPi * Math.atan2(Math.tan(fov), aspectRatio);
    return H3DU.Math.mat4perspective(fovY, aspectRatio, near, far);
  },
/**
 * Returns a 4x4 matrix representing a 2D orthographic projection.<p>
 * This is the same as mat4ortho() with the near clipping plane
 * set to -1 and the far clipping plane set to 1.<p>
 * This method is designed for enabling a [right-handed coordinate system]{@tutorial glmath}; see [mat4ortho()]{@link H3DU.Math.mat4ortho}.
 * @param {Number} l Leftmost coordinate of the orthographic view.
 * @param {Number} r Rightmost coordinate of the orthographic view.
* (If l is greater than r, X coordinates increase leftward; otherwise,
 * they increase rightward.)
 * @param {Number} b Bottommost coordinate of the orthographic view.
 * @param {Number} t Topmost coordinate of the orthographic view.
 * (If t is greater than b, Y coordinates increase upward [as they do in WebGL when just this matrix is used to transform vertices]; otherwise, they increase downward.)
 * @returns {Array<Number>} The resulting 4x4 matrix.
 */
  "mat4ortho2d":function(l, r, b, t) {
    "use strict";
    return H3DU.Math.mat4ortho2d(l, r, b, t, -1, 1);
  },
/**
 * Returns a 4x4 matrix representing a 2D orthographic projection,
 * retaining the view rectangle's aspect ratio.<p>
 * If the view rectangle's aspect ratio doesn't match the desired aspect
 * ratio, the view rectangle will be centered on the viewport
 * or otherwise moved and scaled so as to keep the entire view rectangle visible without stretching
 * or squishing it.<p>
 * This is the same as mat4orthoAspect() with the near clipping plane
 * set to -1 and the far clipping plane set to 1.<p>
 * This method is designed for enabling a [right-handed coordinate system]{@tutorial glmath}; see [mat4ortho()]{@link H3DU.Math.mat4ortho}.
* @param {Number} l Leftmost coordinate of the view rectangle.
 * @param {Number} r Rightmost coordinate of the view rectangle.
* (If l is greater than r, X coordinates increase leftward; otherwise,
 * they increase rightward.)
 * @param {Number} b Bottommost coordinate of the view rectangle.
 * @param {Number} t Topmost coordinate of the view rectangle.
 * (If t is greater than b, Y coordinates increase upward [as they do in WebGL when just this matrix is used to transform vertices]; otherwise, they increase downward.)
* @param {Number} aspect The ratio of width to height of the viewport, usually
* the scene's aspect ratio.
* @returns {Array<Number>} The resulting 4x4 matrix.
 */
  "mat4ortho2dAspect":function(l, r, b, t, aspect) {
    "use strict";
    return H3DU.Math.mat4orthoAspect(l, r, b, t, -1, 1, aspect);
  },
/**
 * Returns a 4x4 matrix representing an [orthographic projection]{@tutorial camera},
 * retaining the view rectangle's aspect ratio.<p>
 * If the view rectangle's aspect ratio doesn't match the desired aspect
 * ratio, the view rectangle will be centered on the viewport
 * or otherwise moved and scaled so as to keep the entire view rectangle visible without stretching
 * or squishing it.<p>
 * This method is designed for enabling a [right-handed coordinate system]{@tutorial glmath}; see [mat4ortho()]{@link H3DU.Math.mat4ortho}.
  *<p>The projection returned by this method only scales and/or shifts the view, so that
  * objects with the same size won't appear smaller as they get more distant from the  "camera".
* @param {Number} l Leftmost coordinate of the view rectangle.
 * @param {Number} r Rightmost coordinate of the view rectangle.
* (If l is greater than r, X coordinates increase leftward; otherwise,
 * they increase rightward.)
 * @param {Number} b Bottommost coordinate of the view rectangle.
 * @param {Number} t Topmost coordinate of the view rectangle.
 * (If t is greater than b, Y coordinates increase upward [as they do in WebGL when just this matrix is used to transform vertices]; otherwise, they increase downward.)
 * @param {Number} n Distance from the "camera" to the near clipping
 * plane. A positive value means the plane is in front of the viewer.
 * @param {Number} f Distance from the "camera" to the far clipping
 * plane. A positive value means the plane is in front of the viewer.
 * (Note that n can be greater than f or vice versa.) The absolute difference
 * between n and f should be as small as the application can accept.
* @param {Number} aspect The ratio of width to height of the viewport, usually
* the scene's aspect ratio.
* @returns {Array<Number>} The resulting 4x4 matrix.
 */
  "mat4orthoAspect":function(l, r, b, t, n, f, aspect) {
    "use strict";
    var newDim;
    var boxAspect = Math.abs((r - l) / (t - b));
    aspect /= boxAspect;
    var w = Math.abs(r - l);
    var h = Math.abs(t - b);
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
    return H3DU.Math.mat4ortho(l, r, b, t, n, f);
  },
/**
 * Returns a 4x4 matrix representing a [perspective projection]{@tutorial camera}
 * in the form of a view frustum, or the limits in the "camera"'s view.<p>
  * This method is designed for enabling a [right-handed coordinate system]{@tutorial glmath}.
 * To adjust the result of this method for a left-handed system,
 * reverse the sign of the 9th, 10th, 11th, and 12th
 * elements of the result (zero-based indices 8, 9, 10, and 11).
 * @param {Number} l X coordinate of the point where the left
 * clipping plane meets the near clipping plane.
 * @param {Number} r X coordinate of the point where the right
 * clipping plane meets the near clipping plane.
 * (If l is greater than r, X coordinates increase leftward; otherwise,
 * they increase rightward.)
 * @param {Number} b Y coordinate of the point where the bottom
 * clipping plane meets the near clipping plane.
 * @param {Number} t Y coordinate of the point where the top
 * clipping plane meets the near clipping plane.
 * (If t is greater than b, Y coordinates increase upward [as they do in WebGL when just this matrix is used to transform vertices]; otherwise, they increase downward.)
* @param {Number} near The distance from the "camera" to
* the near clipping plane. Objects closer than this distance won't be
* seen.<p>This value should be greater than 0, and should be set to the highest distance
* from the "camera" that the application can afford to clip out for being too
* close, for example, 0.5, 1, or higher.
* @param {Number} far The distance from the "camera" to
* the far clipping plane. Objects beyond this distance will be too far
* to be seen.<br>This value is usually greater than "near", should be greater than 0, and should be set so that the absolute ratio of "far" to "near"
* is as small as the application can accept.<br>
 * (Most WebGL implementations support 24-bit depth buffers, meaning they support 16,777,216 possible values per pixel,
 * which, in the usual case that "far" is greater than "near", are more spread out toward the far clipping plane than toward the
 * near plane due to the perspective projection.  The greater the ratio of "far" to
 * "near", the more the values spread out, and the more likely two objects close
 * to the far plane will have identical depth values.)
 * @returns {Array<Number>} The resulting 4x4 matrix.
 */
  "mat4frustum":function(l, r, b, t, near, far) {
    "use strict";
    var dn = 2 * near;
    var onedx = 1 / (r - l);
    var onedy = 1 / (t - b);
    var onedz = 1 / (far - near);
    return [
      dn * onedx, 0, 0, 0,
      0, dn * onedy, 0, 0,
      (l + r) * onedx, (t + b) * onedy, -(far + near) * onedz, -1,
      0, 0, -(dn * far) * onedz, 0];
  },
/**
 * Modifies a 4x4 matrix by multiplying it by a
 * scaling transformation.
 * @param {Array<Number>} mat A 4x4 matrix.
 * @param {Array<Number>|Number} v3 Scale factor along the
 * X axis. A scale factor can be negative, in which case the transformation
 * also causes reflection about the corresponding axis.  If "v3y" and "v3z" are omitted, this value can instead
 * be a 3-element array giving the scale factors along the X, Y, and
 * Z axes.
 * @param {Number} v3y Scale factor along the Y axis.
 * @param {Number} v3z Scale factor along the Z axis.
 * @returns {Array<Number>} The same parameter as "mat".
 */
  "mat4scaleInPlace":function(mat, v3, v3y, v3z) {
    "use strict";
    var x, y, z;
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
 * Multiplies two 4x4 matrices. A new matrix is returned.
 * The matrices are multiplied such that the transformations
 * they describe happen in reverse order. For example, if the first
 * matrix (input matrix) describes a translation and the second
 * matrix describes a scaling, the multiplied matrix will describe
 * the effect of scaling then translation. (Multiplying the first matrix
 * by the second is the same as multiplying the second matrix
 * by the first matrix's transpose; a transpose is a matrix whose rows
 * are converted to columns and vice versa.)
 * @param {Array<Number>} a The first matrix.
 * @param {Array<Number>} b The second matrix.
 * @returns {Array<Number>} The resulting 4x4 matrix.
 */
  "mat4multiply":function(a, b) {
    "use strict";
    var dst = [];
    for(var i = 0; i < 16; i += 4) {
      for(var j = 0; j < 4; j++) {
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
* Multiplies two quaternions, creating a composite rotation.
* The quaternions are multiplied such that the second quaternion's
* rotation happens before the first quaternion's rotation when applied
 * in the global coordinate frame.<p>
* Multiplying two unit quaternions (each with a length of 1) will result
* in a unit quaternion. However, for best results, you should
* normalize the quaternions every few multiplications (using
* quatNorm or quatNormInPlace), since successive
* multiplications can cause rounding errors.
 * @param {Array<Number>} a The first quaternion.
 * @param {Array<Number>} b The second quaternion.
 * @returns {Array<Number>} The resulting quaternion.
*/
  "quatMultiply":function(a, b) {
    "use strict";
    return [
      a[3] * b[0] + a[0] * b[3] + a[1] * b[2] - a[2] * b[1],
      a[3] * b[1] + a[1] * b[3] + a[2] * b[0] - a[0] * b[2],
      a[3] * b[2] + a[2] * b[3] + a[0] * b[1] - a[1] * b[0],
      a[3] * b[3] - a[0] * b[0] - a[1] * b[1] - a[2] * b[2]];
  },
/**
 * Multiplies a 4x4 matrix by a rotation transformation,
 * and returns a new matrix.
 * The effect will be that the rotation transformation will
 * happen before the transformation described in the given matrix,
 * when applied in the global coordinate frame.
 * @param {Array<Number>} mat A 4x4 matrix to multiply.
 * @param {Array<Number>|Number} angle The desired angle
 * to rotate in degrees.  If "v", "vy", and "vz" are omitted, this can
 * instead be a 4-element array giving the [axis of rotation]{@tutorial glmath}
 * as the first three elements, followed by the angle
 * in degrees as the fourth element.
 * @param {Array<Number>|Number} v X-component of the point lying on the axis
 * of rotation.  If "vy" and "vz" are omitted, this can
 * instead be a 3-element array giving the axis
 * of rotation.
 * @param {Number} vy Y-component of the point lying on the axis
 * of rotation.
 * @param {Number} vz Z-component of the point lying on the axis
 * of rotation.
 * @returns {Array<Number>} The resulting 4x4 matrix.
 */
  "mat4rotate":function(mat, angle, v, vy, vz) {
    "use strict";
    var v0, v1, v2, ang;
    if(typeof vy !== "undefined" && typeof vz !== "undefined") {
      v0 = v;
      v1 = vy;
      v2 = vz;
      ang = (angle >= 0 && angle < 360 ? angle : angle % 360 + (angle < 0 ? 360 : 0)) * H3DU.Math.PiDividedBy180;
    } else if(typeof v === "undefined") {
      v0 = angle[0];
      v1 = angle[1];
      v2 = angle[2];
      ang = angle[3];
      ang = (ang >= 0 && ang < 360 ? ang : ang % 360 + (ang < 0 ? 360 : 0)) * H3DU.Math.PiDividedBy180;
    } else {
      v0 = v[0];
      v1 = v[1];
      v2 = v[2];
      ang = (angle >= 0 && angle < 360 ? angle : angle % 360 + (angle < 0 ? 360 : 0)) * H3DU.Math.PiDividedBy180;
    }
    var cost = Math.cos(ang);
    var sint = ang >= 0 && ang < 6.283185307179586 ? ang <= 3.141592653589793 ? Math.sqrt(1.0 - cost * cost) : -Math.sqrt(1.0 - cost * cost) : Math.sin(ang);
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
      return mat.slice(0, 16);
    } else {
      var iscale = 1.0 / Math.sqrt(v0 * v0 + v1 * v1 + v2 * v2);
      v0 *= iscale;
      v1 *= iscale;
      v2 *= iscale;
      var x2 = v0 * v0;
      var y2 = v1 * v1;
      var z2 = v2 * v2;
      var mcos = 1.0 - cost;
      var xy = v0 * v1;
      var xz = v0 * v2;
      var yz = v1 * v2;
      var xs = v0 * sint;
      var ys = v1 * sint;
      var zs = v2 * sint;
      v1 = mcos * x2;
      var v10 = mcos * yz;
      var v12 = mcos * z2;
      var v3 = mcos * xy;
      var v5 = mcos * xz;
      var v7 = mcos * y2;
      var v15 = cost + v1;
      var v16 = v3 + zs;
      var v17 = v5 - ys;
      var v18 = cost + v7;
      var v19 = v3 - zs;
      var v20 = v10 + xs;
      var v21 = cost + v12;
      var v22 = v5 + ys;
      var v23 = v10 - xs;
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
 * Returns a 4x4 matrix representing a rotation transformation
 * given in the form of a rotation angle and an [axis of rotation]{@tutorial glmath}.
 * @param {Array<Number>|Number} angle The desired angle
 * to rotate in degrees.  If "v", "vy", and "vz" are omitted, this can
 * instead be a 4-element array giving the axis of rotation as the first three elements, followed by the angle
 * in degrees as the fourth element.
 * @param {Array<Number>|Number} v X-component of the point lying on the axis
 * of rotation.  If "vy" and "vz" are omitted, this can
 * instead be a 3-element array giving the axis
 * of rotation.
 * @param {Number} vy Y-component of the point lying on the axis
 * of rotation.
 * @param {Number} vz Z-component of the point lying on the axis
 * of rotation.
 * @returns {Array<Number>} The resulting 4x4 matrix.
 */
  "mat4rotated":function(angle, v, vy, vz) {
    "use strict";
    var v0, v1, v2, ang;
    if(typeof vy !== "undefined" && typeof vz !== "undefined") {
      v0 = v;
      v1 = vy;
      v2 = vz;
      ang = (angle >= 0 && angle < 360 ? angle : angle % 360 + (angle < 0 ? 360 : 0)) * H3DU.Math.PiDividedBy180;
    } else if(typeof v === "undefined") {
      v0 = angle[0];
      v1 = angle[1];
      v2 = angle[2];
      ang = angle[3];
      ang = (ang >= 0 && ang < 360 ? ang : ang % 360 + (ang < 0 ? 360 : 0)) * H3DU.Math.PiDividedBy180;
    } else {
      v0 = v[0];
      v1 = v[1];
      v2 = v[2];
      ang = (angle >= 0 && angle < 360 ? angle : angle % 360 + (angle < 0 ? 360 : 0)) * H3DU.Math.PiDividedBy180;
    }
    var cost = Math.cos(ang);
    var sint = ang >= 0 && ang < 6.283185307179586 ? ang <= 3.141592653589793 ? Math.sqrt(1.0 - cost * cost) : -Math.sqrt(1.0 - cost * cost) : Math.sin(ang);
    if( v0 === 1 && v1 === 0 && v2 === 0 ) {
      return[1, 0, 0, 0, 0, cost, sint, 0, 0, -sint, cost, 0, 0, 0, 0, 1];
    } else if( v0 === 0 && v1 === 1 && v2 === 0 ) {
      return [cost, 0, -sint, 0, 0, 1, 0, 0, sint, 0, cost, 0, 0, 0, 0, 1];
    } else if( v0 === 0 && v1 === 0 && v2 === 1 ) {
      return [cost, sint, 0, 0, -sint, cost, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1];
    } else if(v0 === 0 && v1 === 0 && v2 === 0) {
      return [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1];
    } else {
      var iscale = 1.0 / Math.sqrt(v0 * v0 + v1 * v1 + v2 * v2);
      v0 *= iscale;
      v1 *= iscale;
      v2 *= iscale;
      var x2 = v0 * v0;
      var y2 = v1 * v1;
      var z2 = v2 * v2;
      var xy = v0 * v1;
      var xz = v0 * v2;
      var yz = v1 * v2;
      var xs = v0 * sint;
      var ys = v1 * sint;
      var zs = v2 * sint;
      var mcos = 1.0 - cost;
      v0 = mcos * xy;
      v1 = mcos * xz;
      v2 = mcos * yz;
      return [cost + mcos * x2, v0 + zs, v1 - ys, 0, v0 - zs, cost + mcos * y2, v2 + xs, 0, v1 + ys,
        v2 - xs, cost + mcos * z2, 0, 0, 0, 0, 1];
    }
  },
/**
* Normalizes this plane so that its normal is a [unit vector]{@tutorial glmath},
* unless all the normal's components are 0.
* The plane's distance will be divided by the
* current normal's length.
* @param {Array<Number>} plane A four-element array
* defining the plane. The first three elements of the array
* are the X, Y, and Z components of the plane's normal vector, and
* the fourth element is the shortest distance from the plane
* to the origin, or if negative, from the origin to the plane,
* divided by the normal's length.
* @returns {Array<Number>} The parameter "plane".
*/
  "planeNormInPlace":function(plane) {
    "use strict";
    var x = plane[0];
    var y = plane[1];
    var z = plane[2];

    var len = Math.sqrt(x * x + y * y + z * z);
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
* Normalizes this plane so that its normal is a [unit vector]{@tutorial glmath},
* unless all the normal's components are 0.
* The plane's distance will be divided by the
* normal's length. Returns a new plane.
* @param {Array<Number>} plane A four-element array
* defining the plane. The first three elements of the array
* are the X, Y, and Z components of the plane's normal vector, and
* the fourth element is the shortest distance from the plane
* to the origin, or if negative, from the origin to the plane,
* divided by the normal's length.
* @returns {Array<Number>} A normalized version of
* the plane.
*/
  "planeNorm":function(plane) {
    "use strict";
    return H3DU.Math.planeNormInPlace(plane.slice(0, 4));
  },
/**
* Finds the six clipping planes of a view frustum defined
* by a 4x4 matrix. These six planes together form the
* shape of a "chopped-off" pyramid (or frustum).<p>
* In this model, the eye, or camera, is placed at the top
* of the pyramid (before being chopped off), four planes are placed at the pyramid's
* sides, one plane (the far plane) forms its base, and a
* final plane (the near plane) is the pyramid's chopped
* off top.
* @param {Array<Number>} matrix A 4x4 matrix. This will
* usually be a projection-view matrix (projection matrix
* multiplied by view matrix).
* @returns {Array<Array<Number>>} An array of six
* 4-element arrays representing the six clipping planes of the
* view frustum. In order, they are the left, right, top,
* bottom, near, and far clipping planes. All six planes
* will be normalized (see {@link H3DU.Math.planeNormInPlace}).
*/
  "mat4toFrustumPlanes":function(matrix) {
    "use strict";
    var frustum = [[], [], [], [], [], []];
 // Left clipping plane
    frustum[0] = H3DU.Math.planeNormInPlace([
      matrix[3] + matrix[0],
      matrix[7] + matrix[4],
      matrix[11] + matrix[8],
      matrix[15] + matrix[12]
    ]);
 // Right clipping plane
    frustum[1] = H3DU.Math.planeNormInPlace([
      matrix[3] - matrix[0],
      matrix[7] - matrix[4],
      matrix[11] - matrix[8],
      matrix[15] - matrix[12]
    ]);
 // Top clipping plane
    frustum[2] = H3DU.Math.planeNormInPlace([
      matrix[3] - matrix[1],
      matrix[7] - matrix[5],
      matrix[11] - matrix[9],
      matrix[15] - matrix[13]
    ]);
 // Bottom clipping plane
    frustum[3] = H3DU.Math.planeNormInPlace([
      matrix[3] + matrix[1],
      matrix[7] + matrix[5],
      matrix[11] + matrix[9],
      matrix[15] + matrix[13]
    ]);
 // Near clipping plane
    frustum[4] = H3DU.Math.planeNormInPlace([
      matrix[3] + matrix[2],
      matrix[7] + matrix[6],
      matrix[11] + matrix[10],
      matrix[15] + matrix[14]
    ]);
 // Far clipping plane
    frustum[5] = H3DU.Math.planeNormInPlace([
      matrix[3] - matrix[2],
      matrix[7] - matrix[6],
      matrix[11] - matrix[10],
      matrix[15] - matrix[14]
    ]);
    return frustum;
  },
/**
* Determines whether a sphere is at least
* partially inside a view frustum.
* @param {Array<Array<Number>>} frustum An array of six
* 4-element arrays representing the six clipping planes of the
* view frustum. In order, they are the left, right, top,
* bottom, near, and far clipping planes.
* @param {Number} x X coordinate of the sphere's center
* in world space.
* @param {Number} y Y coordinate of the sphere's center
* in world space.
* @param {Number} z Z coordinate of the sphere's center
* in world space.
* @param {Number} radius Radius of the sphere
* in world-space units.
* @returns {Boolean} <code>true</code> if the sphere
* is partially or totally
* inside the frustum; <code>false</code> otherwise.
*/
  "frustumHasSphere":function(frustum, x, y, z, radius) {
    "use strict";
    if(radius < 0)throw new Error("radius is negative");
    for(var i = 0;i < 6;i++) {
      var plane = frustum[i];
      var dot = plane[3] + plane[0] * x +
     plane[1] * y + plane[2] * z;
      if(dot < -radius)return false;
    }
    return true;
  },
/**
* Determines whether a 3D bounding box is empty.
* This is determined if the minimum coordinate
* is larger than the corresponding maximum coordinate.
* @param {Array<Number>} box An axis-aligned bounding
* box, which is an array of six values.
* The first three values are the smallest X, Y, and Z coordinates,
* and the last three values are the largest X, Y, and Z
* coordinates.
* @returns {Boolean} <code>true</code> if at least one
* of the minimum coordinates is greater than its
* corresponding maximum coordinate; otherwise, <code>false</code>.
*/
  "boxIsEmpty":function(box) {
    "use strict";
    return box[0] > box[3] || box[1] > box[4] || box[2] > box[5];
  },
/**
* Finds the dimensions of a 3D bounding box. This is done by subtracting
* the first three values of the given array with its last three values.
* @param {Array<Number>} box An axis-aligned bounding
* box, which is an array of six values.
* The first three values are the smallest X, Y, and Z coordinates,
* and the last three values are the largest X, Y, and Z
* coordinates.
* @returns {Array<Number>} A 3-element array containing the
* width, height, and depth of the bounding box, respectively. If
* at least one of the minimum coordinates is greater than its
* corresponding maximum coordinate, the array can contain
* negative values.
*/
  "boxDimensions":function(box) {
    "use strict";
    return [box[3] - box[0], box[4] - box[1], box[5] - box[2]];
  },
/**
* Finds the center of a 3D bounding box.
* @param {Array<Number>} box An axis-aligned bounding
* box, which is an array of six values.
* The first three values are the smallest X, Y, and Z coordinates,
* and the last three values are the largest X, Y, and Z
* coordinates.
* @returns {Array<Number>} A 3-element array containing the
* X, Y, and Z coordinates, respectively, of the bounding box's
* center.
*/
  "boxCenter":function(box) {
    "use strict";
    return [box[0] + (box[3] - box[0]) * 0.5,
      box[1] + (box[4] - box[1]) * 0.5,
      box[2] + (box[5] - box[2]) * 0.5];
  },
/**
* Determines whether an axis-aligned bounding box
* is at least partially inside a view frustum.
* @param {Array<Array<Number>>} frustum An array of six
* 4-element arrays representing the six clipping planes of the
* view frustum. In order, they are the left, right, top,
* bottom, near, and far clipping planes.
* @param {Array<Number>} box An axis-aligned bounding
* box in world space, which is an array of six values.
* The first three values are the smallest X, Y, and Z coordinates,
* and the last three values are the largest X, Y, and Z
* coordinates.
* @returns {Boolean} <code>true</code> if the box
* may be partially or totally
* inside the frustum; <code>false</code> if the box is
* definitely outside the frustum, or if the box is empty
* (see "boxIsEmpty").
*/
  "frustumHasBox":function(frustum, box) {
    "use strict";
    if(H3DU.Math.boxIsEmpty(box)) {
      return false;
    }
    for(var i = 0;i < 6;i++) {
      var plane = frustum[i];
      var p3 = plane[3];
      var p0b0 = plane[0] * box[0];
      var p2b2 = plane[2] * box[2];
      var p1b1 = plane[1] * box[1];
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
    return true;
  },
/**
* Determines whether a point is
* outside or inside a view frustum.
* @param {Array<Array<Number>>} frustum An array of six
* 4-element arrays representing the six clipping planes of the
* view frustum. In order, they are the left, right, top,
* bottom, near, and far clipping planes.
* @param {Number} x X coordinate of a point
* in world space.
* @param {Number} y Y coordinate of a point
* in world space.
* @param {Number} z Z coordinate of a point
* in world space.
* @returns {Boolean} true if the point is inside;
* otherwise false;
*/
  "frustumHasPoint":function(frustum, x, y, z) {
    "use strict";
    for(var i = 0;i < 6;i++) {
      var d = frustum[i][0] * x + frustum[i][1] * y +
     frustum[i][2] * z + frustum[i][3];
      if(d <= 0)return false;
    }
    return true;
  }

};

/**
* Finds the dot product of two quaternions.
* It's equal to the sum of the products of
* their components (for example, <b>a</b>'s X times <b>b</b>'s X).
 * @function
 * @param {Array<Number>} a The first quaternion.
 * @param {Array<Number>} b The second quaternion.
 * @returns {Number} Return value.
 * @method
@static
@memberof! H3DU.Math
* @see {@link H3DU.Math.vec4dot}
*/
H3DU.Math.quatDot = H3DU.Math.vec4dot;
/**
 * Converts a quaternion to a [unit vector]{@tutorial glmath}.
 * When a quaternion is normalized, it describes the same orientation but the distance from the origin
 * to that quaternion becomes 1 (unless all its components are 0).
 * A quaternion is normalized by dividing each of its components
 * by its [length]{@link H3DU.Math.quatLength}.
 * @function
 * @param {Array<Number>} quat A quaternion, containing four elements.
 * @returns {Array<Number>} The parameter "quat".
 * @method
@static
@memberof! H3DU.Math
* @see {@link H3DU.Math.vec4normInPlace}
 */
H3DU.Math.quatNormInPlace = H3DU.Math.vec4normInPlace;
/**
 * Converts a quaternion to a [unit vector]{@tutorial glmath}; returns a new quaternion.
 * When a quaternion is normalized, the distance from the origin
 * to that quaternion becomes 1 (unless all its components are 0).
 * A quaternion is normalized by dividing each of its components
 * by its [length]{@link H3DU.Math.quatLength}.
 * @function
 * @param {Array<Number>} quat A quaternion, containing four elements.
 * @returns {Array<Number>} The normalized quaternion.
 * @method
@static
@memberof! H3DU.Math
* @see {@link H3DU.Math.vec4norm}
 */
H3DU.Math.quatNorm = H3DU.Math.vec4norm;
/**
* Returns the distance of this quaternion from the origin.
* It's the same as the square root of the sum of the squares
* of its components.
* @function
 * @param {Array<Number>} quat The quaternion.
  * @returns {Number} Return value.
 * @method
@static
@memberof! H3DU.Math
* @see {@link H3DU.Math.vec4length}
*/
H3DU.Math.quatLength = H3DU.Math.vec4length;
/**
 * Multiplies each element of a quaternion by a factor
 * and stores the result in that quaternion.
 * @function
 * @param {Array<Number>} a A quaternion.
 * @param {Number} scalar A factor to multiply.
 * @returns {Array<Number>} The parameter "a".
 * @method
@static
@memberof! H3DU.Math
* @see {@link H3DU.Math.vec4scaleInPlace}
 */
H3DU.Math.quatScaleInPlace = H3DU.Math.vec4scaleInPlace;
/**
 * Multiplies each element of a quaternion by a factor
 * and returns the result as a new quaternion.
 * @function
 * @param {Array<Number>} a A quaternion.
 * @param {Number} scalar A factor to multiply.
 * @returns {Array<Number>} The resulting quaternion.
 * @method
@static
@memberof! H3DU.Math
* @see {@link H3DU.Math.vec4scaleInPlace}
 */
H3DU.Math.quatScale = H3DU.Math.vec4scale;
/**
 * Returns a copy of a quaternion.
* @function
 * @returns {Array<Number>} Return value.
 * @method
@static
@memberof! H3DU.Math
* @see {@link H3DU.Math.vec4copy}
*/
H3DU.Math.quatCopy = H3DU.Math.vec4copy;
/**
 * Closest approximation to pi times 2, or a 360-degree turn in radians.
@memberof! H3DU.Math
 * @const
 * @default
*/
H3DU.Math.PiTimes2 = 6.283185307179586476925286766559;
/**
 * Closest approximation to pi divided by 2, or a 90-degree turn in radians.
@memberof! H3DU.Math
 * @const
 * @default
*/
H3DU.Math.HalfPi = 1.5707963267948966192313216916398;
/**
 * Closest approximation to pi divided by 180, or the number
 * of radians in a degree. Multiply by this number to convert degrees to radians.
@memberof! H3DU.Math
 * @const
 * @default
*/
H3DU.Math.PiDividedBy180 = 0.01745329251994329576923690768489;
/**
 * Closest approximation to pi divided by 180, or the number
 * of radians in a degree. Multiply by this number to convert degrees to radians.
@memberof! H3DU.Math
 * @const
 * @default
*/
H3DU.Math.ToRadians = H3DU.Math.PiDividedBy180;
/**
 * @private
@const */
H3DU.Math.PiDividedBy360 = 0.00872664625997164788461845384244;
/**
 * @private
@const */
H3DU.Math.Num360DividedByPi = 114.59155902616464175359630962821;
/**
 * Closest approximation to 180 divided by pi, or the number of
 * degrees in a radian. Multiply by this number to convert radians to degrees.
@memberof! H3DU.Math
 * @const
 * @default
*/
H3DU.Math.Num180DividedByPi = 57.295779513082320876798154814105;
/**
 * Closest approximation to 180 divided by pi, or the number of
 * degrees in a radian. Multiply by this number to convert radians to degrees.
@memberof! H3DU.Math
 * @const
 * @default
*/
H3DU.Math.ToDegrees = H3DU.Math.Num180DividedByPi;
/**
* Indicates that a rotation occurs as a pitch, then yaw, then roll (each rotation around the original axes),
or in the reverse order around
@memberof! H3DU.Math
* @const
*/
H3DU.Math.GlobalPitchYawRoll = 0;
/**
* Indicates that a rotation occurs as a pitch, then roll, then yaw (each rotation around the original axes).
@memberof! H3DU.Math
* @const
*/
H3DU.Math.GlobalPitchRollYaw = 1;
/**
* Indicates that a rotation occurs as a yaw, then pitch, then roll (each rotation around the original axes).
@memberof! H3DU.Math
* @const
*/
H3DU.Math.GlobalYawPitchRoll = 2;
/**
* Indicates that a rotation occurs as a yaw, then roll, then pitch (each rotation around the original axes).
@memberof! H3DU.Math
* @const
*/
H3DU.Math.GlobalYawRollPitch = 3;
/**
* Indicates that a rotation occurs as a roll, then pitch, then yaw (each rotation around the original axes).
@memberof! H3DU.Math
* @const
*/
H3DU.Math.GlobalRollPitchYaw = 4;
/**
* Indicates that a rotation occurs as a roll, then yaw, then pitch (each rotation around the original axes).
@memberof! H3DU.Math
* @const
*/
H3DU.Math.GlobalRollYawPitch = 5;
/**
* Indicates that a rotation occurs as a pitch, then yaw, then roll, where the yaw and roll
occur around the rotated object's new axes and not necessarily the original axes.
@memberof! H3DU.Math
* @const
*/
H3DU.Math.LocalPitchYawRoll = H3DU.Math.GlobalRollYawPitch;
/**
* Indicates that a rotation occurs as a pitch, then roll, then yaw, where the roll and yaw
occur around the rotated object's new axes and not necessarily the original axes.
@memberof! H3DU.Math
* @const
*/
H3DU.Math.LocalPitchRollYaw = H3DU.Math.GlobalYawRollPitch;
/**
* Indicates that a rotation occurs as a yaw, then pitch, then roll, where the pitch and roll
occur around the rotated object's new axes and not necessarily the original axes.
@memberof! H3DU.Math
* @const
*/
H3DU.Math.LocalYawPitchRoll = H3DU.Math.GlobalRollPitchYaw;
/**
* Indicates that a rotation occurs as a yaw, then roll, then pitch, where the roll and pitch
occur around the rotated object's new axes and not necessarily the original axes.
@memberof! H3DU.Math
* @const
*/
H3DU.Math.LocalYawRollPitch = H3DU.Math.GlobalPitchRollYaw;
/**
* Indicates that a rotation occurs as a roll, then pitch, then yaw, where the pitch and yaw
occur around the rotated object's new axes and not necessarily the original axes.
@memberof! H3DU.Math
* @const
*/
H3DU.Math.LocalRollPitchYaw = H3DU.Math.GlobalYawPitchRoll;
/**
* Indicates that a rotation occurs as a roll, then yaw, then pitch, where the yaw and pitch
occur around the rotated object's new axes and not necessarily the original axes.
@memberof! H3DU.Math
* @const
*/
H3DU.Math.LocalRollYawPitch = H3DU.Math.GlobalPitchYawRoll;
/**
* Indicates that a rotation occurs as a pitch, then yaw, then roll (each rotation around the original axes).
@deprecated This constant's name is ambiguous between local and global rotations.
Use {@link H3DU.Math.GlobalPitchYawRoll} instead.
@memberof! H3DU.Math
* @const
*/
H3DU.Math.PitchYawRoll = 0;
/**
* Indicates that a rotation occurs as a pitch, then roll, then yaw (each rotation around the original axes).
* @deprecated This constant's name is ambiguous between local and global rotations.
Use {@link H3DU.Math.GlobalPitchRollYaw} instead.
@memberof! H3DU.Math
* @const
*/
H3DU.Math.PitchRollYaw = 1;
/**
* Indicates that a rotation occurs as a yaw, then pitch, then roll (each rotation around the original axes).
@deprecated This constant's name is ambiguous between local and global rotations.
Use {@link H3DU.Math.GlobalYawPitchRoll} instead.
@memberof! H3DU.Math
* @const
*/
H3DU.Math.YawPitchRoll = 2;
/**
* Indicates that a rotation occurs as a yaw, then roll, then pitch (each rotation around the original axes).
@deprecated This constant's name is ambiguous between local and global rotations.
Use {@link H3DU.Math.GlobalYawRollPitch} instead.
@memberof! H3DU.Math
* @const
*/
H3DU.Math.YawRollPitch = 3;
/**
* Indicates that a rotation occurs as a roll, then pitch, then yaw (each rotation around the original axes).
@deprecated This constant's name is ambiguous between local and global rotations.
Use {@link H3DU.Math.GlobalRollPitchYaw} instead.
@memberof! H3DU.Math
* @const
*/
H3DU.Math.RollPitchYaw = 4;
/**
* Indicates that a rotation occurs as a roll, then yaw, then pitch (each rotation around the original axes).
@deprecated This constant's name is ambiguous between local and global rotations.
Use {@link H3DU.Math.GlobalRollYawPitch} instead.
@memberof! H3DU.Math
* @const
*/
H3DU.Math.RollYawPitch = 5;
/**
 * Inverts the rotation given in this quaternion, describing a rotation that undoes the given rotation.
 * Returns a new quaternion; same as the quatInverse method.
 * @deprecated Use {@link H3DU.Math.quatInvert} instead.
 * @param {Array<Number>} quat A quaternion, containing four elements.
 * @returns {Array<Number>} Return value.
 * @method
@static
@memberof! H3DU.Math
*/
H3DU.Math.quatInverse = H3DU.Math.quatInvert;

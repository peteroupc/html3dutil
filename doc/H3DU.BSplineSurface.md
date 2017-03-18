# H3DU.BSplineSurface

[Back to documentation index.](index.md)

<a name='H3DU.BSplineSurface'></a>
### H3DU.BSplineSurface(controlPoints, knotsU, knotsV, [bits])

**Augments:** <a href="H3DU.Surface.md">H3DU.Surface</a>

A <a href="H3DU.SurfaceEval.md#H3DU.SurfaceEval_vertex">surface evaluator object</a> for a B-spline (basis spline) surface.
B-spline surfaces can also represent all B&eacute;zier surfaces (see <a href="H3DU.BSplineSurface.md#H3DU.BSplineSurface.fromBezierSurface">H3DU.BSplineSurface.fromBezierSurface</a>).
A B&eacute;zier surface is defined by a series of control points, where
the control points on each corner define the end points of the surface, and
the remaining control points define the surface's shape, though they don't
necessarily cross the surface.

#### Parameters

* `controlPoints` (Type: Array.&lt;Array.&lt;Array.&lt;number>>>)<br>An array of control point arrays, which in turn contain a number of control points. Each control point is an array with the same length as the other control points. It is assumed that:<ul> <li>The length of this parameter is the number of control points in each row of the V axis. <li>The length of the first control point array is the number of control points in each column of the U axis. <li>The first control point's length represents the size of all the control points. </ul>
* `knotsU` (Type: Array.&lt;number>)<br>Knot vector of the curve, along the U axis. For more information, see <a href="H3DU.BSplineCurve.md">H3DU.BSplineCurve</a>.
* `knotsV` (Type: Array.&lt;number>)<br>Knot vector of the curve, along the V axis.
* `bits` (Type: number) (optional)<br>Bits for defining input and controlling output. Zero or more of BSplineCurve.WEIGHTED_BIT, BSplineCurve.HOMOGENEOUS_BIT, and BSplineCurve.DIVIDE_BIT. If null or omitted, no bits are set.

### Methods

* [bitangent](#H3DU.BSplineSurface_bitangent)<br>Finds the <a href="H3DU.SurfaceEval.md#H3DU.SurfaceEval_vertex">bitangent vector</a> at the
given point on the surface.
* [clamped](#H3DU.BSplineSurface.clamped)<br>Creates a B-spline surface with uniform knots, except that
the surface's edges lie on the edges of the control point array.
* [endPoints](#H3DU.BSplineSurface_endPoints)<br>Returns the starting and ending U and V coordinates of this surface.
* [evaluate](#H3DU.BSplineSurface_evaluate)<br>Evaluates the surface function based on a point
in a B-spline surface.
* [fromBezierSurface](#H3DU.BSplineSurface.fromBezierSurface)<br>Creates a B-spline surface from the control points of a B&eacute;zier surface.
* [getControlPoints](#H3DU.BSplineSurface_getControlPoints)<br>Gets a reference to the array of control point arrays used
in this surface object.
* [getKnots](#H3DU.BSplineSurface_getKnots)<br>Gets a reference to the array of knot vectors used
in this curve object.
* [gradient](#H3DU.BSplineSurface_gradient)<br>Finds an approximate gradient vector of this surface at the given U and V coordinates.
* [normal](#H3DU.BSplineSurface_normal)<br>Convenience method for finding an approximate normal vector of this surface at the given U and V coordinates.
* [tangent](#H3DU.BSplineSurface_tangent)<br>Finds the <a href="H3DU.SurfaceEval.md#H3DU.SurfaceEval_vertex">tangent vector</a> at the
given point on the surface.
* [uniform](#H3DU.BSplineSurface.uniform)<br>Creates a B-spline surface with uniform knots.

<a name='H3DU.BSplineSurface_bitangent'></a>
### H3DU.BSplineSurface#bitangent(u, v)

Finds the <a href="H3DU.SurfaceEval.md#H3DU.SurfaceEval_vertex">bitangent vector</a> at the
given point on the surface.

#### Parameters

* `u` (Type: number)<br>U coordinate of the surface to evaluate.
* `v` (Type: number)<br>V coordinate of the surface to evaluate.

#### Return Value

An array giving the bitangent vector.
It will have as many elements as a control point (or one fewer
if DIVIDE_BIT is set), as specified in the constructor. (Type: Array.&lt;number>)

<a name='H3DU.BSplineSurface.clamped'></a>
### (static) H3DU.BSplineSurface.clamped(controlPoints, [degreeU], [degreeV], [bits])

Creates a B-spline surface with uniform knots, except that
the surface's edges lie on the edges of the control point array.

#### Parameters

* `controlPoints` (Type: Array.&lt;Array.&lt;Array.&lt;number>>>)<br>Array of control point arrays as specified in the <a href="H3DU.BSplineSurface.md">H3DU.BSplineSurface</a> constructor.
* `degreeU` (Type: number) (optional)<br>Degree of the B-spline surface along the U axis. For example, 3 means a degree-3 (cubic) curve. If null or omitted, the default is 3.
* `degreeV` (Type: number) (optional)<br>Degree of the B-spline surface along the V axis If null or omitted, the default is 3.
* `bits` (Type: number) (optional)<br>Bits as specified in the <a href="H3DU.BSplineSurface.md">H3DU.BSplineSurface</a> constructor.

#### Return Value

Return value. The first
knot of the curve will be 0 and the last knot will be 1. (This is a change from previous
versions.) (Type: <a href="H3DU.BSplineSurface.md">H3DU.BSplineSurface</a>)

<a name='H3DU.BSplineSurface_endPoints'></a>
### H3DU.BSplineSurface#endPoints()

Returns the starting and ending U and V coordinates of this surface.
This method calls the evaluator's <code>endPoints</code>
method if it implements it; otherwise, returns <code>[0, 1, 0, 1]</code>

#### Return Value

A four-element array. The first and second
elements are the starting and ending U coordinates, respectively, of the surface, and the third
and fourth elements are its starting and ending V coordinates.
Returns <code>[0, 1, 0, 1]</code> if the evaluator doesn't implement an <code>endPoints</code>
method.

<a name='H3DU.BSplineSurface_evaluate'></a>
### H3DU.BSplineSurface#evaluate(u, v)

Evaluates the surface function based on a point
in a B-spline surface.

#### Parameters

* `u` (Type: number)<br>U coordinate of the surface to evaluate. NOTE: Since version 2.0, this parameter and the "v" parameter are no longer scaled according to the curve's knot vector. To get the surface's extents, call this object's <code>endPoints</code> method.
* `v` (Type: number)<br>V coordinate of the surface to evaluate.

#### Return Value

An array of the result of
the evaluation. It will have as many elements as a control point (or one fewer
if DIVIDE_BIT is set), as specified in the constructor. (Type: Array.&lt;number>)

<a name='H3DU.BSplineSurface.fromBezierSurface'></a>
### (static) H3DU.BSplineSurface.fromBezierSurface(controlPoints, [bits])

Creates a B-spline surface from the control points of a B&eacute;zier surface.

#### Parameters

* `controlPoints` (Type: Array.&lt;Array.&lt;Array.&lt;number>>>)<br>An array of control point arrays, which in turn contain a number of control points. Each control point is an array with the same length as the other control points. It is assumed that:<ul> <li>The length of this parameter minus 1 represents the degree of the B&eacute;zier surface along the V axis. For example, a degree-3 (cubic) surface along the V axis contains 4 control points, one in each control point array. A degree of 1 on both the U and V axes results in a flat surface. <li>The length of the first control point array minus 1 represents the degree of the B&eacute;zier surface along the U axis. <li>The number of elements in the first control point represents the number of elements in all the control points. </ul>
* `bits` (Type: number) (optional)<br>Bits as specified in the <a href="H3DU.BSplineSurface.md">H3DU.BSplineSurface</a> constructor.

#### Return Value

Return value. (Type: <a href="H3DU.BSplineSurface.md">H3DU.BSplineSurface</a>)

<a name='H3DU.BSplineSurface_getControlPoints'></a>
### H3DU.BSplineSurface#getControlPoints()

Gets a reference to the array of control point arrays used
in this surface object.

#### Return Value

An object described in the constructor to <a href="H3DU.BSplineCurve.md">H3DU.BSplineCurve</a>. (Type: Array.&lt;Array.&lt;number>>)

<a name='H3DU.BSplineSurface_getKnots'></a>
### H3DU.BSplineSurface#getKnots()

Gets a reference to the array of knot vectors used
in this curve object.

#### Return Value

An object described in the constructor to <a href="H3DU.BSplineSurface.md">H3DU.BSplineSurface</a>. (Type: Array.&lt;Array.&lt;number>>)

<a name='H3DU.BSplineSurface_gradient'></a>
### H3DU.BSplineSurface#gradient(u, v)

Finds an approximate gradient vector of this surface at the given U and V coordinates.

The implementation in <a href="H3DU.Surface.md">H3DU.Surface</a> calls the evaluator's <code>gradient</code>
method if it implements it; otherwise uses the surface's tangent and bitangent vectors to implement the gradient
(however, this approach is generally only meaningful for a three-dimensional surface).

The <b>gradient</b> is a vector pointing up and away from the surface.
If the evaluator describes a regular three-dimensional surface (usually
a continuous, unbroken surface such as a sphere, an open
cylinder, or a disk rotated in three dimensions), this can be the cross product
of the <a href="H3DU.Surface.md#H3DU.Surface_tangent">tangent vector</a>
and <a href="H3DU.Surface.md#H3DU.Surface_bitangent">bitangent vector</a>,
in that order. The gradient returned by this method <i>should not</i> be "normalized" to a <a href="tutorial-glmath.md">unit vector</a>.

#### Parameters

* `u` (Type: number)<br>U coordinate of a point on the surface.
* `v` (Type: number)<br>V coordinate of a point on the surface.

#### Return Value

An array describing a gradient vector. It should have at least as many
elements as the number of dimensions of the underlying surface. (Type: Array.&lt;number>)

<a name='H3DU.BSplineSurface_normal'></a>
### H3DU.BSplineSurface#normal(u, v)

Convenience method for finding an approximate normal vector of this surface at the given U and V coordinates.
The <b>normal vector</b> is the same as the gradient vector, but "normalized" to a unit vector.

#### Parameters

* `u` (Type: number)<br>U coordinate of a point on the surface.
* `v` (Type: number)<br>V coordinate of a point on the surface.

#### Return Value

An array describing a normal vector. It should have at least as many
elements as the number of dimensions of the underlying surface. (Type: Array.&lt;number>)

<a name='H3DU.BSplineSurface_tangent'></a>
### H3DU.BSplineSurface#tangent(u, v)

Finds the <a href="H3DU.SurfaceEval.md#H3DU.SurfaceEval_vertex">tangent vector</a> at the
given point on the surface.

#### Parameters

* `u` (Type: number)<br>U coordinate of the surface to evaluate.
* `v` (Type: number)<br>V coordinate of the surface to evaluate.

#### Return Value

An array giving the tangent vector.
It will have as many elements as a control point (or one fewer
if DIVIDE_BIT is set), as specified in the constructor. (Type: Array.&lt;number>)

<a name='H3DU.BSplineSurface.uniform'></a>
### (static) H3DU.BSplineSurface.uniform(controlPoints, [degreeU], [degreeV], [bits])

Creates a B-spline surface with uniform knots.

#### Parameters

* `controlPoints` (Type: Array.&lt;Array.&lt;Array.&lt;number>>>)<br>Array of control point arrays as specified in the <a href="H3DU.BSplineSurface.md">H3DU.BSplineSurface</a> constructor.
* `degreeU` (Type: number) (optional)<br>Degree of the B-spline surface along the U axis. For example, 3 means a degree-3 (cubic) curve. If null or omitted, the default is 3.
* `degreeV` (Type: number) (optional)<br>Degree of the B-spline surface along the V axis If null or omitted, the default is 3.
* `bits` (Type: number) (optional)<br>Bits as specified in the <a href="H3DU.BSplineSurface.md">H3DU.BSplineSurface</a> constructor.

#### Return Value

Return value. The first
knot of the curve will be 0 and the last knot will be 1. (This is a change from previous
versions.) (Type: <a href="H3DU.BSplineSurface.md">H3DU.BSplineSurface</a>)

[Back to documentation index.](index.md)

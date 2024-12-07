# BSplineSurface

[Back to documentation index.](index.md)

<a name='BSplineSurface'></a>
### new BSplineSurface(controlPoints, knotsU, knotsV, [bits])

**Augments:** <a href="Surface.md">Surface</a>

A <a href="Surface.md">surface evaluator object</a> for a B-spline (basis spline) surface,
whose edges are made up of B-spline curves. For more on B-spline curves, see the constructor
for <a href="BSplineCurve.md">BSplineCurve</a>.

#### Parameters

* `controlPoints` (Type: Array.&lt;Array.&lt;Array.&lt;number>>>)<br>An array of control point arrays, which in turn contain a number of control points. Each control point is an array with the same length as the other control points. It is assumed that:<ul> <li>The length of this parameter is the number of control points in each row of the V axis. <li>The length of the first control point array is the number of control points in each column of the U axis. <li>The first control point's length represents the size of all the control points. </ul>
* `knotsU` (Type: Array.&lt;number>)<br>Knot vector of the surface, along the U axis. For more information, see <a href="BSplineCurve.md">BSplineCurve</a>.
* `knotsV` (Type: Array.&lt;number>)<br>Knot vector of the surface, along the V axis.
* `bits` (Type: number) (optional)<br>Bits for defining input and controlling output. Zero or more of <a href="BSplineCurve.md#BSplineCurve.DIVIDE_BIT">BSplineCurve.DIVIDE_BIT</a>. If null, undefined, or omitted, no bits are set.

#### Examples

Together with 'convertToHomogen' given in the <a href="BSplineCurve.md">BSplineCurve</a> documentation, the following function can be used
to convert an array of arrays of control points, each consisting of conventional
coordinates and a weight, to homogeneous coordinates.
For example, the single-control point array
'[[[2, 3, 4, 0.1]]]' becomes '[[[0.2, 0.3, 0.4, 0.1]]]'; the
return value can then be used in the BSplineSurface constructor
to create a rational B-Spline surface.

    function convertSurfaceToHomogen(cp) {
    var ret = [];
    for(var i = 0; i < cp.length; i++) {
    ret.push(convertToHomogen(cp[i]));
    }
    return ret;
    };

### Methods

* [bitangent](#BSplineSurface_bitangent)<br>Finds the <a href="Surface.md">bitangent vector</a> at the
given point on the surface.
* [clamped](#BSplineSurface.clamped)<br>Creates a B-spline surface with uniform knots, except that
the surface's edges lie on the edges of the control point array.
* [endPoints](#BSplineSurface_endPoints)<br>Returns the starting and ending U and V coordinates of this surface.
* [evaluate](#BSplineSurface_evaluate)<br>Evaluates the surface function based on a point
in a B-spline surface.
* [fromBezierSurface](#BSplineSurface.fromBezierSurface)<br>Creates a B-spline surface from the control points of a B&eacute;zier surface.
* [getControlPoints](#BSplineSurface_getControlPoints)<br>Gets a reference to the array of control point arrays used
in this surface object.
* [getKnots](#BSplineSurface_getKnots)<br>Gets a reference to the array of knot vectors used
in this curve object.
* [gradient](#BSplineSurface_gradient)<br>Finds an approximate gradient vector of this surface at the given U and V coordinates.
* [normal](#BSplineSurface_normal)<br>Convenience method for finding an approximate normal vector of this surface at the given U and V coordinates.
* [tangent](#BSplineSurface_tangent)<br>Finds the <a href="Surface.md">tangent vector</a> at the
given point on the surface.
* [uniform](#BSplineSurface.uniform)<br>Creates a B-spline surface with uniform knots.

<a name='BSplineSurface_bitangent'></a>
### BSplineSurface#bitangent(u, v)

Finds the <a href="Surface.md">bitangent vector</a> at the
given point on the surface.

#### Parameters

* `u` (Type: number)<br>U coordinate of the surface to evaluate.
* `v` (Type: number)<br>V coordinate of the surface to evaluate.

#### Return Value

An array giving the bitangent vector.
It will have as many elements as a control point (or one fewer
if DIVIDE_BIT is set), as specified in the constructor. (Type: Array.&lt;number>)

<a name='BSplineSurface.clamped'></a>
### (static) BSplineSurface.clamped(controlPoints, [degreeU], [degreeV], [bits])

Creates a B-spline surface with uniform knots, except that
the surface's edges lie on the edges of the control point array.

#### Parameters

* `controlPoints` (Type: Array.&lt;Array.&lt;Array.&lt;number>>>)<br>Array of control point arrays as specified in the <a href="BSplineSurface.md">BSplineSurface</a> constructor.
* `degreeU` (Type: number) (optional)<br>Degree of the B-spline surface along the U axis. For example, 3 means a degree-3 (cubic) curve. If null, undefined, or omitted, the default is 3.
* `degreeV` (Type: number) (optional)<br>Degree of the B-spline surface along the V axis If null, undefined, or omitted, the default is 3.
* `bits` (Type: number) (optional)<br>Bits as specified in the <a href="BSplineSurface.md">BSplineSurface</a> constructor.

#### Return Value

Return value. The first
knot of the curve will be 0 and the last knot will be 1. (Type: <a href="BSplineSurface.md">BSplineSurface</a>)

<a name='BSplineSurface_endPoints'></a>
### BSplineSurface#endPoints()

Returns the starting and ending U and V coordinates of this surface.
This method calls the evaluator's <code>endPoints</code>
method if it implements it; otherwise, returns <code>[0, 1, 0, 1]</code>

#### Return Value

A four-element array. The first and second
elements are the starting and ending U coordinates, respectively, of the surface, and the third
and fourth elements are its starting and ending V coordinates.
Returns <code>[0, 1, 0, 1]</code> if the evaluator doesn't implement an <code>endPoints</code>
method.

<a name='BSplineSurface_evaluate'></a>
### BSplineSurface#evaluate(u, v)

Evaluates the surface function based on a point
in a B-spline surface.

#### Parameters

* `u` (Type: number)<br>U coordinate of the surface to evaluate.
* `v` (Type: number)<br>V coordinate of the surface to evaluate.

#### Return Value

An array of the result of
the evaluation. It will have as many elements as a control point (or one fewer
if DIVIDE_BIT is set), as specified in the constructor. (Type: Array.&lt;number>)

<a name='BSplineSurface.fromBezierSurface'></a>
### (static) BSplineSurface.fromBezierSurface(controlPoints, [bits])

Creates a B-spline surface from the control points of a B&eacute;zier surface.

#### Parameters

* `controlPoints` (Type: Array.&lt;Array.&lt;Array.&lt;number>>>)<br>An array of control point arrays, which in turn contain a number of control points. Each control point is an array with the same length as the other control points. It is assumed that:<ul> <li>The length of this parameter minus 1 represents the degree of the B&eacute;zier surface along the V axis. For example, a degree-3 (cubic) surface along the V axis contains 4 control points, one in each control point array. A degree of 1 on both the U and V axes results in a flat surface. <li>The length of the first control point array minus 1 represents the degree of the B&eacute;zier surface along the U axis. <li>The number of elements in the first control point represents the number of elements in all the control points. </ul>
* `bits` (Type: number) (optional)<br>Bits as specified in the <a href="BSplineSurface.md">BSplineSurface</a> constructor.

#### Return Value

Return value. (Type: <a href="BSplineSurface.md">BSplineSurface</a>)

<a name='BSplineSurface_getControlPoints'></a>
### BSplineSurface#getControlPoints()

Gets a reference to the array of control point arrays used
in this surface object.

#### Return Value

An object described in the constructor to <a href="BSplineCurve.md">BSplineCurve</a>. (Type: Array.&lt;Array.&lt;number>>)

<a name='BSplineSurface_getKnots'></a>
### BSplineSurface#getKnots()

Gets a reference to the array of knot vectors used
in this curve object.

#### Return Value

An object described in the constructor to <a href="BSplineSurface.md">BSplineSurface</a>. (Type: Array.&lt;Array.&lt;number>>)

<a name='BSplineSurface_gradient'></a>
### BSplineSurface#gradient(u, v)

Finds an approximate gradient vector of this surface at the given U and V coordinates.

The implementation in <a href="Surface.md">Surface</a> calls the evaluator's <code>gradient</code>
method if it implements it; otherwise uses the surface's tangent and bitangent vectors to implement the gradient
(however, this approach is generally only meaningful for a surface in three-dimensional space).

The <b>gradient</b> is a vector pointing up and away from the surface.
If the evaluator describes a regular three-dimensional surface (usually
a continuous, unbroken surface such as a sphere, an open
cylinder, or a disk rotated in three dimensions), this can be the cross product
of the <a href="Surface.md#Surface_tangent">tangent vector</a>
and <a href="Surface.md#Surface_bitangent">bitangent vector</a>,
in that order. The gradient returned by this method <i>should not</i> be "normalized" to a glmath.

#### Parameters

* `u` (Type: number)<br>U coordinate of a point on the surface.
* `v` (Type: number)<br>V coordinate of a point on the surface.

#### Return Value

An array describing a gradient vector. It should have at least as many
elements as the number of dimensions of the underlying surface. (Type: Array.&lt;number>)

#### Examples

The following example is a surface evaluator
object for a parametric surface with a gradient method. To illustrate how the gradient method is derived
from the vector calculation method, that method is also given later. To
derive the normal calculation, first look at the vector function:

<b>F</b>(u, v) = (cos(u), sin(u), sin(u)\*cos(v))

Then, find the partial derivatives with respect to <i>u</i> and to <i>v</i>:

&#x2202;<b>F</b>/&#x2202;<i>u</i> = (-sin(u), cos(u), cos(u)\*cos(v))<br>
&#x2202;<b>F</b>/&#x2202;<i>v</i> = (0, 0, -sin(v)\*sin(u))

Next, take their cross product:

<b>&Del;F</b>(u, v) = (-sin(v)\*cos(u)\*sin(u), -sin(v)\*sin(u)\*sin(u), 0)<br>

The result is the gradient, which will point up and away from the surface.

    var surface=new Surface({"evaluate":function(u,v) {
    "use strict";
    return [Math.cos(u),Math.sin(u),Math.sin(u)*Math.cos(v)];
    },
    "gradient":function(u,v) {
    "use strict";
    return [
    Math.cos(u)*-Math.sin(v)*Math.sin(u),
    Math.sin(u)*-Math.sin(v)*Math.sin(u),
    0];
    }})

<a name='BSplineSurface_normal'></a>
### BSplineSurface#normal(u, v)

Convenience method for finding an approximate normal vector of this surface at the given U and V coordinates.
The <b>normal vector</b> is the same as the gradient vector, but "normalized" to a unit vector.

#### Parameters

* `u` (Type: number)<br>U coordinate of a point on the surface.
* `v` (Type: number)<br>V coordinate of a point on the surface.

#### Return Value

An array describing a normal vector. It should have at least as many
elements as the number of dimensions of the underlying surface. (Type: Array.&lt;number>)

<a name='BSplineSurface_tangent'></a>
### BSplineSurface#tangent(u, v)

Finds the <a href="Surface.md">tangent vector</a> at the
given point on the surface.

#### Parameters

* `u` (Type: number)<br>U coordinate of the surface to evaluate.
* `v` (Type: number)<br>V coordinate of the surface to evaluate.

#### Return Value

An array giving the tangent vector.
It will have as many elements as a control point (or one fewer
if DIVIDE_BIT is set), as specified in the constructor. (Type: Array.&lt;number>)

<a name='BSplineSurface.uniform'></a>
### (static) BSplineSurface.uniform(controlPoints, [degreeU], [degreeV], [bits])

Creates a B-spline surface with uniform knots.

#### Parameters

* `controlPoints` (Type: Array.&lt;Array.&lt;Array.&lt;number>>>)<br>Array of control point arrays as specified in the <a href="BSplineSurface.md">BSplineSurface</a> constructor.
* `degreeU` (Type: number) (optional)<br>Degree of the B-spline surface along the U axis. For example, 3 means a degree-3 (cubic) curve. If null, undefined, or omitted, the default is 3.
* `degreeV` (Type: number) (optional)<br>Degree of the B-spline surface along the V axis If null, undefined, or omitted, the default is 3.
* `bits` (Type: number) (optional)<br>Bits as specified in the <a href="BSplineSurface.md">BSplineSurface</a> constructor.

#### Return Value

Return value. The first
knot of the curve will be 0 and the last knot will be 1. (Type: <a href="BSplineSurface.md">BSplineSurface</a>)

[Back to documentation index.](index.md)

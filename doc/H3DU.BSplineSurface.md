# H3DU.BSplineSurface

[Back to documentation index.](index.md)

<a name='H3DU.BSplineSurface'></a>
### H3DU.BSplineSurface(controlPoints, knotsU, knotsV, [bits])

**Augments:** Surface

A surface evaluator object for a B-spline (basis spline) surface,
whose edges are made up of B-spline curves. For more on B-spline curves, see the constructor
for BSplineCurve.

#### Parameters

* `controlPoints` (Type: Array.&lt;Array.&lt;Array.&lt;number>>>)<br>An array of control point arrays, which in turn contain a number of control points. Each control point is an array with the same length as the other control points. It is assumed that:<ul> <li>The length of this parameter is the number of control points in each row of the V axis. <li>The length of the first control point array is the number of control points in each column of the U axis. <li>The first control point's length represents the size of all the control points. </ul>
* `knotsU` (Type: Array.&lt;number>)<br>Knot vector of the curve, along the U axis. For more information, see BSplineCurve.
* `knotsV` (Type: Array.&lt;number>)<br>Knot vector of the curve, along the V axis.
* `bits` (Type: number) (optional)<br>Bits for defining input and controlling output. Zero or more of BSplineCurve.DIVIDE_BIT. If null, undefined, or omitted, no bits are set.

#### Example

Together with 'convertToHomogen' given in the BSplineCurve documentation, the following function can be used
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

* [bitangent](#H3DU.BSplineSurface_bitangent)<br>Finds the bitangent vector at the
given point on the surface.
* [clamped](#H3DU.BSplineSurface.clamped)<br>Creates a B-spline surface with uniform knots, except that
the surface's edges lie on the edges of the control point array.
* [evaluate](#H3DU.BSplineSurface_evaluate)<br>Evaluates the surface function based on a point
in a B-spline surface.
* [fromBezierSurface](#H3DU.BSplineSurface.fromBezierSurface)<br>Creates a B-spline surface from the control points of a B&eacute;zier surface.
* [getControlPoints](#H3DU.BSplineSurface_getControlPoints)<br>Gets a reference to the array of control point arrays used
in this surface object.
* [getKnots](#H3DU.BSplineSurface_getKnots)<br>Gets a reference to the array of knot vectors used
in this curve object.
* [tangent](#H3DU.BSplineSurface_tangent)<br>Finds the tangent vector at the
given point on the surface.
* [uniform](#H3DU.BSplineSurface.uniform)<br>Creates a B-spline surface with uniform knots.

<a name='H3DU.BSplineSurface_bitangent'></a>
### H3DU.BSplineSurface#bitangent(u, v)

Finds the bitangent vector at the
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

* `controlPoints` (Type: Array.&lt;Array.&lt;Array.&lt;number>>>)<br>Array of control point arrays as specified in the BSplineSurface constructor.
* `degreeU` (Type: number) (optional)<br>Degree of the B-spline surface along the U axis. For example, 3 means a degree-3 (cubic) curve. If null, undefined, or omitted, the default is 3.
* `degreeV` (Type: number) (optional)<br>Degree of the B-spline surface along the V axis If null, undefined, or omitted, the default is 3.
* `bits` (Type: number) (optional)<br>Bits as specified in the BSplineSurface constructor.

#### Return Value

Return value. The first
knot of the curve will be 0 and the last knot will be 1. (Type: BSplineSurface)

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
* `bits` (Type: number) (optional)<br>Bits as specified in the BSplineSurface constructor.

#### Return Value

Return value. (Type: BSplineSurface)

<a name='H3DU.BSplineSurface_getControlPoints'></a>
### H3DU.BSplineSurface#getControlPoints()

Gets a reference to the array of control point arrays used
in this surface object.

#### Return Value

An object described in the constructor to BSplineCurve. (Type: Array.&lt;Array.&lt;number>>)

<a name='H3DU.BSplineSurface_getKnots'></a>
### H3DU.BSplineSurface#getKnots()

Gets a reference to the array of knot vectors used
in this curve object.

#### Return Value

An object described in the constructor to BSplineSurface. (Type: Array.&lt;Array.&lt;number>>)

<a name='H3DU.BSplineSurface_tangent'></a>
### H3DU.BSplineSurface#tangent(u, v)

Finds the tangent vector at the
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

* `controlPoints` (Type: Array.&lt;Array.&lt;Array.&lt;number>>>)<br>Array of control point arrays as specified in the BSplineSurface constructor.
* `degreeU` (Type: number) (optional)<br>Degree of the B-spline surface along the U axis. For example, 3 means a degree-3 (cubic) curve. If null, undefined, or omitted, the default is 3.
* `degreeV` (Type: number) (optional)<br>Degree of the B-spline surface along the V axis If null, undefined, or omitted, the default is 3.
* `bits` (Type: number) (optional)<br>Bits as specified in the BSplineSurface constructor.

#### Return Value

Return value. The first
knot of the curve will be 0 and the last knot will be 1. (Type: BSplineSurface)

[Back to documentation index.](index.md)

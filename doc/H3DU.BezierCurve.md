# H3DU.BezierCurve

[Back to documentation index.](index.md)

 <a name='H3DU.BezierCurve'></a>
### H3DU.BezierCurve(cp, [u1], [u2])

A parametric evaluator for B&eacute;zier curves.

A B&eacute;zier curve is defined by a series of control points, where
the first and last control points define the endpoints of the curve, and
the remaining control points define the curve's shape, though they don't
necessarily cross the curve.

#### Parameters

* `cp` (Type: Array.&lt;Array.&lt;Number>>)<br>
    An array of control points. Each control point is an array with the same length as the other control points. It is assumed that:<ul> <li>The length of this parameter minus 1 represents the degree of the B&eacute;zier curve. For example, a degree-3 (cubic) curve contains 4 control points. A degree of 1 results in a straight line segment. <li>The first control point's length represents the size of all the control points. </ul>
* `u1` (Type: Number) (optional)<br>
    Starting point for the purpose of interpolation; it will correspond to 0. May be omitted; default is 0.
* `u2` (Type: Number) (optional)<br>
    Ending point for the purpose of interpolation; it will correspond to 1. May be omitted; default is 1.

### Methods

* [evaluate](#H3DU.BezierCurve_H3DU.BezierCurve_evaluate)<br>Evaluates the curve function based on a point
in a B&eacute;zier curve.
* [getPoints](#H3DU.BezierCurve_H3DU.BezierCurve_getPoints)<br>TODO: Not documented yet.
* [split](#H3DU.BezierCurve_H3DU.BezierCurve_split)<br>Splits this B&eacute;zier curve into two.
* [tangent](#H3DU.BezierCurve_H3DU.BezierCurve_tangent)<br>TODO: Not documented yet.
* [H3DU.BezierCurve.fromHermiteCurve](#H3DU.BezierCurve_H3DU.BezierCurve.fromHermiteCurve)<br>Creates a B&eacute;zier curve from the control points of a Hermite curve.

 <a name='H3DU.BezierCurve_H3DU.BezierCurve_evaluate'></a>
### H3DU.BezierCurve#evaluate(u)

Evaluates the curve function based on a point
in a B&eacute;zier curve.

#### Parameters

* `u` (Type: Number)<br>
    Point on the curve to evaluate (generally within the range given in the constructor).

#### Return Value

An array of the result of
the evaluation. It will have as many elements as a control point, as specified in the constructor. (Type: Array.&lt;Number>)

#### Example

    // Generate 11 points forming the B&eacute;zier curve.
    // Assumes the curve was created with u1=0 and u2=1 (the default).
    var points=[];
    for(var i=0;i<=10;i++) {
    points.push(curve.evaluate(i/10.0));
    }

 <a name='H3DU.BezierCurve_H3DU.BezierCurve_getPoints'></a>
### H3DU.BezierCurve#getPoints()

TODO: Not documented yet.

#### Return Value

Return value. (Type: *)

 <a name='H3DU.BezierCurve_H3DU.BezierCurve_split'></a>
### H3DU.BezierCurve#split(u)

Splits this B&eacute;zier curve into two.

#### Parameters

* `u` (Type: Number)<br>
    U coordinate of the point in the curve to split it in two (generally within the range given in the constructor).

#### Return Value

An array of two B&eacute;zier curves: the
first is the curve from the start of the original curve to the point given in "u", and the second
is the curve from that point to the end of the original curve. (Type: Array.&lt;BezierCurve>)

 <a name='H3DU.BezierCurve_H3DU.BezierCurve_tangent'></a>
### H3DU.BezierCurve#tangent(u)

TODO: Not documented yet.

#### Parameters

* `u` (Type: *)

#### Return Value

Return value. (Type: *)

 <a name='H3DU.BezierCurve_H3DU.BezierCurve.fromHermiteCurve'></a>
### H3DU.BezierCurve#H3DU.BezierCurve.fromHermiteCurve(curve, [u1], [u2])

Creates a B&eacute;zier curve from the control points of a Hermite curve.

#### Parameters

* `curve` (Type: Array.&lt;Array.&lt;Number>>)<br>
    An array of four control points, each with the same number of elements. The first and second control points are the start and end points of the Hermite curve, respectively; the third control point is the tangent vector (derivative) at the start point; and the fourth control point is the tangent vector at the end point.
* `u1` (Type: Number) (optional)<br>
    Starting point for the purpose of interpolation; it will correspond to 0. May be omitted; default is 0.
* `u2` (Type: Number) (optional)<br>
    Ending point for the purpose of interpolation; it will correspond to 1. May be omitted; default is 1.

#### Return Value

A B&eacute;zier curve describing the same path as the Hermite curve. (Type: <a href="H3DU.BezierCurve.md">H3DU.BezierCurve</a>)

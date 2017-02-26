# H3DU.BezierCurve

[Back to documentation index.](index.md)

 <a name='H3DU.BezierCurve'></a>
### H3DU.BezierCurve(cp, [u1], [u2])

A curve evaluator object for a B&eacute;zier curve.

A B&eacute;zier curve is defined by a series of control points, where
the first and last control points define the endpoints of the curve, and
the remaining control points define the curve's shape, though they don't
necessarily cross the curve.

#### Parameters

* `cp` (Type: Array.&lt;Array.&lt;Number>>)<br>
    An array of control points. Each control point is an array with the same length as the other control points. It is assumed that:<ul> <li>The length of this parameter minus 1 represents the degree of the B&eacute;zier curve. For example, a degree-3 (cubic) curve contains 4 control points. A degree of 1 results in a straight line segment. <li>The first control point's length represents the size of all the control points. </ul>
* `u1` (Type: Number) (optional)<br>
    Starting point for the purpose of interpolation; it will correspond to 0. Default is 0.
* `u2` (Type: Number) (optional)<br>
    Ending point for the purpose of interpolation; it will correspond to 1. Default is 1.

### Methods

* [.fromCardinalSpline](#H3DU.BezierCurve.fromCardinalSpline)<br>Creates an array of B&eacute;zier curves from the control points of a cardinal spline.
* [.fromHermiteSpline](#H3DU.BezierCurve.fromHermiteSpline)<br>Creates an array of B&eacute;zier curves from the control points of a Hermite spline.
* [endpoints](#H3DU.BezierCurve_H3DU.BezierCurve_endpoints)<br>TODO: Not documented yet.
* [evaluate](#H3DU.BezierCurve_H3DU.BezierCurve_evaluate)<br>Evaluates the curve function based on a point
in a B&eacute;zier curve.
* [getPoints](#H3DU.BezierCurve_H3DU.BezierCurve_getPoints)<br>TODO: Not documented yet.
* [split](#H3DU.BezierCurve_H3DU.BezierCurve_split)<br>Splits this B&eacute;zier curve into two.
* [tangent](#H3DU.BezierCurve_H3DU.BezierCurve_tangent)<br>Finds the tangent (derivative) of
this curve at the given point.

 <a name='H3DU.BezierCurve.fromCardinalSpline'></a>
### H3DU.BezierCurve.fromCardinalSpline(curve, [tension])

Creates an array of B&eacute;zier curves from the control points of a cardinal spline.

#### Parameters

* `curve` (Type: Array.&lt;Array.&lt;Number>>)<br>
    An array of control points, each with the same number of values, that describe a cardinal spline. Each point, except the first and the last, will be tangent to the line that connects the points adjacent to it. The spline starts at the second control point and ends at the next-to-last control point. The array must have at least four control points.
* `tension` (Type: Number) (optional)<br>
    A tension parameter ranging from 0 to 1. Closer to 1 means closer to a straight line. If null or omitted, this value is 0.5 (indicating what is commonly called a <i>Catmull-Rom spline</i>).

#### Return Value

A array of cubic B&eacute;zier curves describing the
same path as the cardinal spline. (Type: <a href="H3DU.BezierCurve.md">H3DU.BezierCurve</a>)

 <a name='H3DU.BezierCurve.fromHermiteSpline'></a>
### H3DU.BezierCurve.fromHermiteSpline(curve)

Creates an array of B&eacute;zier curves from the control points of a Hermite spline.

#### Parameters

* `curve` (Type: Array.&lt;Array.&lt;Number>>)<br>
    An array of control points, each with the same number of values, that describe a Hermite spline. Each pair of control points takes up two elements of the array and consists of the coordinates of that point followed by the tangent vector (derivative) at that point. The array must have an even number of control points and at least four control points.

#### Return Value

A array of cubic B&eacute;zier curves describing the
same path as the Hermite spline. (Type: <a href="H3DU.BezierCurve.md">H3DU.BezierCurve</a>)

 <a name='H3DU.BezierCurve_H3DU.BezierCurve_endpoints'></a>
### H3DU.BezierCurve#endpoints()

TODO: Not documented yet.

#### Return Value

Return value. (Type: *)

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

TODO: Not documented yet. (Type: Array.&lt;Array.&lt;Number>>)

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

Finds the tangent (derivative) of
this curve at the given point.

#### Parameters

* `u` (Type: Number)<br>
    Point on the curve to evaluate (generally within the range given in the constructor).

#### Return Value

An array giving the tangent at the given point.
It will have as many elements as a control point, as specified in the constructor. (Type: Array.&lt;Number>)

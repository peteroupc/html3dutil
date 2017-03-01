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
    No longer used since version 2.0. The starting and ending points will be (0, 0). (This parameter was the starting point for the purpose of interpolation.)
* `u2` (Type: Number) (optional)<br>
    No longer used since version 2.0. The starting and ending points will be (0, 0). (This parameter was the ending point for the purpose of interpolation.)

### Methods

* [evaluate](#H3DU.BezierCurve_H3DU.BezierCurve_evaluate)<br>Evaluates the curve function based on a point
in a B&eacute;zier curve.
* [tangent](#H3DU.BezierCurve_H3DU.BezierCurve_tangent)<br>Finds the tangent (derivative) of
this curve at the given point.

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

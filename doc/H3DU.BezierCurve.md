# H3DU.BezierCurve

[Back to documentation index.](index.md)

 <a name='H3DU.BezierCurve'></a>
### H3DU.BezierCurve(cp, [u1], [u2])

<b>Deprecated: Instead of this class, use <a href="H3DU.BSplineCurve.md#H3DU.BSplineCurve.fromBezierCurve">H3DU.BSplineCurve.fromBezierCurve</a>
to create a B&eacute;zier curve.</b>

A <a href="H3DU.Curve.md">curve evaluator object</a> for a B&eacute;zier curve.

**Augments:** <a href="H3DU.BezierCurve.md">H3DU.BezierCurve</a>

#### Parameters

* `cp` (Type: Array.&lt;Array.&lt;Number>>)<br>
    An array of control points as specified in <a href="H3DU.BSplineCurve.md#H3DU.BSplineCurve.fromBezierCurve">H3DU.BSplineCurve.fromBezierCurve</a>.
* `u1` (Type: Number) (optional)<br>
    No longer used since version 2.0. The starting and ending points will be (0, 0). (This parameter was the starting point for the purpose of interpolation.)
* `u2` (Type: Number) (optional)<br>
    No longer used since version 2.0. The starting and ending points will be (0, 0). (This parameter was the ending point for the purpose of interpolation.)

### Methods

* [endPoints](#H3DU.BezierCurve_endPoints)<br>Returns the starting and ending U coordinates of this curve.
* [evaluate](#H3DU.BezierCurve_evaluate)<br>Evaluates the curve function based on a point
in a B&eacute;zier curve.

 <a name='H3DU.BezierCurve_endPoints'></a>
### H3DU.BezierCurve#endPoints()

Returns the starting and ending U coordinates of this curve.

#### Return Value

A two-element array. The first and second
elements are the starting and ending U coordinates, respectively, of the curve. (Type: Array.&lt;Number>)

 <a name='H3DU.BezierCurve_evaluate'></a>
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

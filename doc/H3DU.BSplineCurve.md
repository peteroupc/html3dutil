# H3DU.BSplineCurve

[Back to documentation index.](index.md)

 <a name='H3DU.BSplineCurve'></a>
### H3DU.BSplineCurve(controlPoints, knots, [bits])

A curve evaluator object for a B-spline (basis spline) curve.

#### Parameters

* `controlPoints` (Type: Array.&lt;Array.&lt;Number>>)<br>
    An array of control points. Each control point is an array with the same length as the other control points. It is assumed that the first control point's length represents the size of all the control points.
* `knots` (Type: Array.&lt;Number>)<br>
    Knot vector of the curve. Its size must be at least 2 plus the number of control points and not more than twice the number of control points.

 The length of this parameter minus 1, minus the number of control points, represents the <i>degree</i> of the B-spline curve. For example, a degree-3 (cubic) B-spline curve contains 4 more knots than the number of control points. A degree of 1 results in straight line segments.

 The knot vector must be a monotonically nondecreasing sequence and the first knot must not equal the last.

 If the difference between one knot and the next isn't the same, the curve is considered a <i>non-uniform</i> B-spline curve.

 If there are N times 2 knots with the first N knots equal to 0 and the rest equal to 1, where N is the number of control points, the control points describe a <i>B&eacute;zier</i> curve, in which the first and last control points match the curve's end points.

* `bits` (Type: Boolean) (optional)<br>
    Bits for defining input and controlling output. Zero or more of H3DU.BSplineCurve.WEIGHTED_BIT, H3DU.BSplineCurve.HOMOGENEOUS_BIT, and H3DU.BSplineCurve.DIVIDE_BIT. If null or omitted, no bits are set.

### Members

* [.DIVIDE_BIT](#H3DU.BSplineCurve.DIVIDE_BIT)<br>Indicates to divide each other coordinate of the returned point
by the last coordinate of the point and omit the last
coordinate.
* [.HOMOGENEOUS_BIT](#H3DU.BSplineCurve.HOMOGENEOUS_BIT)<br><b>Deprecated: This bit is deprecated because the B-spline
equation works the same whether control points are in conventional
coordinates or in homogeneous coordinates.</b>
* [.WEIGHTED_BIT](#H3DU.BSplineCurve.WEIGHTED_BIT)<br><b>Deprecated: Support for this control point format may be dropped
in the future. Instead of using this bit, supply control points in homogeneous
coordinates (where each other coordinate is premultiplied by the last)
and use <code>DIVIDE_BIT</code> to convert the
results to conventional coordinates.</b>
* [.WEIGHTED_DIVIDE_BITS](#H3DU.BSplineCurve.WEIGHTED_DIVIDE_BITS)<br><b>Deprecated: Deprecated because WEIGHTED_BIT is deprecated.</b>

### Methods

* [.clamped](#H3DU.BSplineCurve.clamped)<br>Creates a B-spline curve with uniform knots, except that
the curve will start and end at the first and last control points and will
be tangent to the line between the first and second control points
and to the line between the next-to-last and last control points.
* [.clampedKnots](#H3DU.BSplineCurve.clampedKnots)<br>Generates a knot vector with uniform knots, to be
passed to the <a href="H3DU.BSplineCurve.md">H3DU.BSplineCurve</a> or <a href="H3DU.BSplineCurve.md">H3DU.BSplineCurve</a> constructor,
except that with the knot vector curve will start and end at the first and last control points and will
be tangent to the line between the first and second control points
and to the line between the next-to-last and last control points.
* [.uniform](#H3DU.BSplineCurve.uniform)<br>Creates a B-spline curve with uniform knots.
* [.uniformKnots](#H3DU.BSplineCurve.uniformKnots)<br>Generates a knot vector with uniform knots, to be
passed to the <a href="H3DU.BSplineCurve.md">H3DU.BSplineCurve</a> or <a href="H3DU.BSplineCurve.md">H3DU.BSplineCurve</a> constructor.
* [evaluate](#H3DU.BSplineCurve_H3DU.BSplineCurve_evaluate)<br>Evaluates the curve function based on a point
in a B-spline curve.
* [tangent](#H3DU.BSplineCurve_H3DU.BSplineCurve_tangent)<br>TODO: Not documented yet.

<a id='H3DU.BSplineCurve.DIVIDE_BIT'></a>
### H3DU.BSplineCurve.DIVIDE_BIT (constant)

Indicates to divide each other coordinate of the returned point
by the last coordinate of the point and omit the last
coordinate. This is used to convert
homogeneous coordinates to conventional coordinates.
If this bit is set, the length of each control point must be at least 2.

A B-spline curve that has control points whose last coordinate is other than
1 is a <i>rational</i> B-spline curve.

Default Value: `2`

<a id='H3DU.BSplineCurve.HOMOGENEOUS_BIT'></a>
### H3DU.BSplineCurve.HOMOGENEOUS_BIT (constant)

<b>Deprecated: This bit is deprecated because the B-spline
equation works the same whether control points are in conventional
coordinates or in homogeneous coordinates.</b>

Indicates that each other coordinate of each control point
was premultiplied by the last coordinate of the point, that is,
each control point is in homogeneous coordinates.
Only used with WEIGHTED_BIT.

Default Value: `4`

<a id='H3DU.BSplineCurve.WEIGHTED_BIT'></a>
### H3DU.BSplineCurve.WEIGHTED_BIT (constant)

<b>Deprecated: Support for this control point format may be dropped
in the future. Instead of using this bit, supply control points in homogeneous
coordinates (where each other coordinate is premultiplied by the last)
and use <code>DIVIDE_BIT</code> to convert the
results to conventional coordinates.</b>

Indicates whether the last coordinate of each control point is a
weight. If some of the weights differ, the curve is
considered a <i>rational</i> B-spline curve.
If this bit is set, points returned by the curve's <code>evaluate</code>
method will be in homogeneous coordinates.

Default Value: `1`

<a id='H3DU.BSplineCurve.WEIGHTED_DIVIDE_BITS'></a>
### H3DU.BSplineCurve.WEIGHTED_DIVIDE_BITS (constant)

<b>Deprecated: Deprecated because WEIGHTED_BIT is deprecated.</b>

Combination of WEIGHTED_BIT and DIVIDE_BIT.

 <a name='H3DU.BSplineCurve.clamped'></a>
### H3DU.BSplineCurve.clamped(controlPoints, [degree], [bits])

Creates a B-spline curve with uniform knots, except that
the curve will start and end at the first and last control points and will
be tangent to the line between the first and second control points
and to the line between the next-to-last and last control points.

#### Parameters

* `controlPoints` (Type: Array.&lt;Array.&lt;Number>>)<br>
    Array of control points as specified in the <a href="H3DU.BSplineCurve.md">H3DU.BSplineCurve</a> constructor.
* `degree` (Type: Number) (optional)<br>
    Degree of the B-Spline curve. For example, 3 means a degree-3 (cubic) curve. If null or omitted, the default is 3.
* `bits` (Type: Number) (optional)<br>
    Bits as specified in the <a href="H3DU.BSplineCurve.md">H3DU.BSplineCurve</a> constructor.

#### Return Value

Return value. The first
knot of the curve will be 0 and the last knot will be 1. (This is a change from previous
versions.) (Type: <a href="H3DU.BSplineCurve.md">H3DU.BSplineCurve</a>)

 <a name='H3DU.BSplineCurve.clampedKnots'></a>
### H3DU.BSplineCurve.clampedKnots(controlPoints, degree)

Generates a knot vector with uniform knots, to be
passed to the <a href="H3DU.BSplineCurve.md">H3DU.BSplineCurve</a> or <a href="H3DU.BSplineCurve.md">H3DU.BSplineCurve</a> constructor,
except that with the knot vector curve will start and end at the first and last control points and will
be tangent to the line between the first and second control points
and to the line between the next-to-last and last control points.

#### Parameters

* `controlPoints` (Type: Number)<br>
    Number of control points the curve will have.
* `degree` (Type: Number)<br>
    Degree of the B-Spline curve. For example, 3 means a degree-3 (cubic) curve. If null or omitted, the default is 3.

#### Return Value

A clamped uniform knot vector.
The first knot will be 0 and the last knot will be 1.
(This is a change in version 2.0.) (Type: Array.&lt;Number>)

 <a name='H3DU.BSplineCurve.uniform'></a>
### H3DU.BSplineCurve.uniform(controlPoints, [degree], [bits])

Creates a B-spline curve with uniform knots.

#### Parameters

* `controlPoints` (Type: Array.&lt;Array.&lt;Number>>)<br>
    Array of control points as specified in the <a href="H3DU.BSplineCurve.md">H3DU.BSplineCurve</a> constructor.
* `degree` (Type: Number) (optional)<br>
    Degree of the B-Spline curve. For example, 3 means a degree-3 (cubic) curve. If null or omitted, the default is 3.
* `bits` (Type: Number) (optional)<br>
    Bits as specified in the <a href="H3DU.BSplineCurve.md">H3DU.BSplineCurve</a> constructor.

#### Return Value

Return value. The first
knot of the curve will be 0 and the last knot will be 1. (This is a change from previous
versions.) (Type: <a href="H3DU.BSplineCurve.md">H3DU.BSplineCurve</a>)

 <a name='H3DU.BSplineCurve.uniformKnots'></a>
### H3DU.BSplineCurve.uniformKnots(controlPoints, degree)

Generates a knot vector with uniform knots, to be
passed to the <a href="H3DU.BSplineCurve.md">H3DU.BSplineCurve</a> or <a href="H3DU.BSplineCurve.md">H3DU.BSplineCurve</a> constructor.

#### Parameters

* `controlPoints` (Type: Number)<br>
    Number of control points the curve will have.
* `degree` (Type: Number)<br>
    Degree of the B-Spline curve. For example, 3 means a degree-3 (cubic) curve. If null or omitted, the default is 3.

#### Return Value

A uniform knot vector. The first
knot will be 0 and the last knot will be 1. (This is a change from previous
versions.) (Type: Array.&lt;Number>)

 <a name='H3DU.BSplineCurve_H3DU.BSplineCurve_evaluate'></a>
### H3DU.BSplineCurve#evaluate(u)

Evaluates the curve function based on a point
in a B-spline curve.

#### Parameters

* `u` (Type: Number)<br>
    Point on the curve to evaluate (from 0 through 1).

#### Return Value

An array of the result of
the evaluation. Its length will be equal to the
length of a control point (minus 1 if DIVIDE_BIT is set), as specified in the constructor. (Type: Array.&lt;Number>)

#### Example

    // Generate 11 points forming the B-spline curve.
    var points=[];
    for(var i=0;i<=10;i++) {
    points.push(curve.evaluate(i/10.0));
    }

 <a name='H3DU.BSplineCurve_H3DU.BSplineCurve_tangent'></a>
### H3DU.BSplineCurve#tangent(u)

TODO: Not documented yet.

#### Parameters

* `u` (Type: *)

#### Return Value

Return value. (Type: *)

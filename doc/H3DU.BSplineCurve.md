# H3DU.BSplineCurve

[Back to documentation index.](index.md)

 <a name='H3DU.BSplineCurve'></a>
### H3DU.BSplineCurve(controlPoints, knots, [bits])

A <a href="H3DU.CurveEval.md#H3DU.CurveEval_vertex">curve evaluator object</a> for a B-spline (basis spline) curve.
B-spline curves can also represent all B&eacute;zier curves (see <a href="H3DU.BSplineCurve.md#H3DU.BSplineCurve.fromBezierCurve">H3DU.BSplineCurve.fromBezierCurve</a>).
A B&eacute;zier curve is defined by a series of control points, where
the first and last control points define the endPoints of the curve, and
the remaining control points define the curve's shape, though they don't
necessarily cross the curve.

#### Parameters

* `controlPoints` (Type: Array.&lt;Array.&lt;Number>>)<br>
    An array of control points. Each control point is an array with the same length as the other control points. It is assumed that the first control point's length represents the size of all the control points.
* `knots` (Type: Array.&lt;Number>)<br>
    Knot vector of the curve. Its size must be at least 2 plus the number of control points and not more than twice the number of control points.<br> The length of this parameter minus 1, minus the number of control points, represents the <i>degree</i> of the B-spline curve. For example, a degree-3 (cubic) B-spline curve contains eight knots, that is, four more knots than the number of control points (four). A degree of 1 results in straight line segments.<br> The knot vector must be a monotonically nondecreasing sequence, the first knot must not equal the last, and the same knot may not be repeated more than N+1 times at the beginning and end of the vector, or more than N times elsewhere, where N is the curve's degree. If the difference between one knot and the next isn't the same, the curve is considered a <i>non-uniform</i>B-spline curve. Usually the first knot will be 0 or less and the last knot will be 1 or greater.<br> If there are N times 2 knots with the first N knots equal to 0 and the rest equal to 1, where N is the number of control points, the control points describe a <i>B&eacute;zier</i> curve, in which the first and last control points match the curve's end points.

* `bits` (Type: Boolean) (optional)<br>
    Bits for defining input and controlling output. Zero or more of H3DU.BSplineCurve.WEIGHTED_BIT, H3DU.BSplineCurve.HOMOGENEOUS_BIT, and H3DU.BSplineCurve.DIVIDE_BIT. If null or omitted, no bits are set.

### Members

* [DIVIDE_BIT](#H3DU.BSplineCurve.DIVIDE_BIT)<br>Indicates to divide each other coordinate of the returned point
by the last coordinate of the point and omit the last
coordinate.
* [HOMOGENEOUS_BIT](#H3DU.BSplineCurve.HOMOGENEOUS_BIT)<br><b>Deprecated: This bit is deprecated because the B-spline
equation works the same whether control points are in conventional
coordinates or in homogeneous coordinates.</b>
* [WEIGHTED_BIT](#H3DU.BSplineCurve.WEIGHTED_BIT)<br><b>Deprecated: Support for this control point format may be dropped
in the future. Instead of using this bit, supply control points in homogeneous
coordinates (where each other coordinate is premultiplied by the last)
and use <code>DIVIDE_BIT</code> to convert the
results to conventional coordinates.</b>
* [WEIGHTED_DIVIDE_BITS](#H3DU.BSplineCurve.WEIGHTED_DIVIDE_BITS)<br><b>Deprecated: Deprecated because WEIGHTED_BIT is deprecated.</b>

### Methods

* [clamped](#H3DU.BSplineCurve.clamped)<br>Creates a B-spline curve with uniform knots, except that
the curve will start and end at the first and last control points and will
be tangent to the line between the first and second control points
and to the line between the next-to-last and last control points.
* [clampedKnots](#H3DU.BSplineCurve.clampedKnots)<br>Generates a knot vector with uniform knots, to be
passed to the <a href="H3DU.BSplineCurve.md">H3DU.BSplineCurve</a> or <a href="H3DU.BSplineCurve.md">H3DU.BSplineCurve</a> constructor,
except that with the knot vector curve will start and end at the first and last control points and will
be tangent to the line between the first and second control points
and to the line between the next-to-last and last control points.
* [endPoints](#H3DU.BSplineCurve_endPoints)<br>TODO: Not documented yet.
* [evaluate](#H3DU.BSplineCurve_evaluate)<br>Evaluates the curve function based on a point
in a B-spline curve.
* [fromBezierCurve](#H3DU.BSplineCurve.fromBezierCurve)<br>Creates a B-spline curve from the control points of a B&eacute;zier curve.
* [fromCardinalSpline](#H3DU.BSplineCurve.fromCardinalSpline)<br>Creates an array of B-spline curves from the control points of a cardinal spline.
* [fromHermiteSpline](#H3DU.BSplineCurve.fromHermiteSpline)<br>Creates an array of B-spline curves from the control points of a Hermite spline.
* [getPoints](#H3DU.BSplineCurve_getPoints)<br>Gets a reference to the array of control points used
in this curve object.
* [split](#H3DU.BSplineCurve_split)<br>Splits this B-spline curve into two at the given point.
* [tangent](#H3DU.BSplineCurve_tangent)<br>Finds the <a href="H3DU.CurveEval.md#H3DU.CurveEval_vertex">tangent</a> (derivative) of
this curve at the given point.
* [uniform](#H3DU.BSplineCurve.uniform)<br>Creates a B-spline curve with uniform knots.
* [uniformKnots](#H3DU.BSplineCurve.uniformKnots)<br>Generates a knot vector with uniform knots, to be
passed to the <a href="H3DU.BSplineCurve.md">H3DU.BSplineCurve</a> or <a href="H3DU.BSplineCurve.md">H3DU.BSplineCurve</a> constructor.

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
### (static) H3DU.BSplineCurve.clamped(controlPoints, [degree], [bits])

Creates a B-spline curve with uniform knots, except that
the curve will start and end at the first and last control points and will
be tangent to the line between the first and second control points
and to the line between the next-to-last and last control points.

#### Parameters

* `controlPoints` (Type: Array.&lt;Array.&lt;Number>>)<br>
    Array of control points as specified in the <a href="H3DU.BSplineCurve.md">H3DU.BSplineCurve</a> constructor.
* `degree` (Type: Number) (optional)<br>
    Degree of the B-spline curve. For example, 3 means a degree-3 (cubic) curve. If null or omitted, the default is 3.
* `bits` (Type: Number) (optional)<br>
    Bits as specified in the <a href="H3DU.BSplineCurve.md">H3DU.BSplineCurve</a> constructor.

#### Return Value

Return value. The first
knot of the curve will be 0 and the last knot will be 1. (This is a change from previous
versions.) (Type: <a href="H3DU.BSplineCurve.md">H3DU.BSplineCurve</a>)

 <a name='H3DU.BSplineCurve.clampedKnots'></a>
### (static) H3DU.BSplineCurve.clampedKnots(controlPoints, degree)

Generates a knot vector with uniform knots, to be
passed to the <a href="H3DU.BSplineCurve.md">H3DU.BSplineCurve</a> or <a href="H3DU.BSplineCurve.md">H3DU.BSplineCurve</a> constructor,
except that with the knot vector curve will start and end at the first and last control points and will
be tangent to the line between the first and second control points
and to the line between the next-to-last and last control points.

#### Parameters

* `controlPoints` (Type: Number)<br>
    Number of control points the curve will have.
* `degree` (Type: Number)<br>
    Degree of the B-spline curve. For example, 3 means a degree-3 (cubic) curve. If null or omitted, the default is 3.

#### Return Value

A clamped uniform knot vector.
The first knot will be 0 and the last knot will be 1.
(This is a change in version 2.0.) (Type: Array.&lt;Number>)

 <a name='H3DU.BSplineCurve_endPoints'></a>
### H3DU.BSplineCurve#endPoints()

TODO: Not documented yet.

#### Return Value

Return value. (Type: *)

 <a name='H3DU.BSplineCurve_evaluate'></a>
### H3DU.BSplineCurve#evaluate(u)

Evaluates the curve function based on a point
in a B-spline curve.

#### Parameters

* `u` (Type: Number)<br>
    Point on the curve to evaluate. NOTE: Since version 2.0, this parameter is no longer scaled according to the curve's knot vector. To get the curve's extents, call this object's <code>endPoints</code> method.

#### Return Value

An array of the result of
the evaluation. Its length will be equal to the
length of a control point (minus 1 if DIVIDE_BIT is set), as specified in the constructor. (Type: Array.&lt;Number>)

#### Example

    // Generate 11 points forming the curve.
    var points=[];
    for(var i=0;i<=10;i++) {
    points.push(curve.evaluate(i/10.0));
    }

 <a name='H3DU.BSplineCurve.fromBezierCurve'></a>
### (static) H3DU.BSplineCurve.fromBezierCurve(controlPoints, [bits])

Creates a B-spline curve from the control points of a B&eacute;zier curve.

#### Parameters

* `controlPoints` (Type: Array.&lt;Array.&lt;Number>>)<br>
    Array of control points as specified in the <a href="H3DU.BSplineCurve.md">H3DU.BSplineCurve</a> constructor. The curve's degree will equal the number of control points minus 1.
* `bits` (Type: Number) (optional)<br>
    Bits as specified in the <a href="H3DU.BSplineCurve.md">H3DU.BSplineCurve</a> constructor.

#### Return Value

Return value. (Type: <a href="H3DU.BSplineCurve.md">H3DU.BSplineCurve</a>)

 <a name='H3DU.BSplineCurve.fromCardinalSpline'></a>
### (static) H3DU.BSplineCurve.fromCardinalSpline(curve, [tension])

Creates an array of B-spline curves from the control points of a cardinal spline.

To use this method, you must include the script "extras/spline.js". Example:

    <script type="text/javascript" src="extras/spline.js"></script>

#### Parameters

* `curve` (Type: Array.&lt;Array.&lt;Number>>)<br>
    An array of control points, each with the same number of values, that describe a cardinal spline. Each point, except the first and the last, will be tangent to the line that connects the points adjacent to it. The spline starts at the second control point and ends at the next-to-last control point. The array must have at least four control points.
* `tension` (Type: Number) (optional)<br>
    A tension parameter ranging from 0 to 1. Closer to 1 means closer to a straight line. If null or omitted, this value is 0.5 (indicating what is commonly called a <i>Catmull-Rom spline</i>).

#### Return Value

A array of cubic B-spline curves describing the
same path as the cardinal spline. (Type: <a href="H3DU.BSplineCurve.md">H3DU.BSplineCurve</a>)

 <a name='H3DU.BSplineCurve.fromHermiteSpline'></a>
### (static) H3DU.BSplineCurve.fromHermiteSpline(curve)

Creates an array of B-spline curves from the control points of a Hermite spline.

To use this method, you must include the script "extras/spline.js". Example:

    <script type="text/javascript" src="extras/spline.js"></script>

#### Parameters

* `curve` (Type: Array.&lt;Array.&lt;Number>>)<br>
    An array of control points, each with the same number of values, that describe a Hermite spline. Each pair of control points takes up two elements of the array and consists of the coordinates of that point followed by the tangent vector (derivative) at that point. The array must have an even number of control points and at least four control points.

#### Return Value

A array of cubic B-spline curves describing the
same path as the Hermite spline. (Type: <a href="H3DU.BSplineCurve.md">H3DU.BSplineCurve</a>)

 <a name='H3DU.BSplineCurve_getPoints'></a>
### H3DU.BSplineCurve#getPoints()

Gets a reference to the array of control points used
in this curve object.

#### Return Value

An object described in the constructor to <a href="H3DU.BSplineCurve.md">H3DU.BSplineCurve</a>. (Type: Array.&lt;Array.&lt;Number>>)

 <a name='H3DU.BSplineCurve_split'></a>
### H3DU.BSplineCurve#split(u)

Splits this B-spline curve into two at the given point.

#### Parameters

* `u` (Type: Number)<br>
    Point on the curve where this curve will be split.

#### Return Value

An array containing two B-spline curves: the
first is the part of the curve before the given point, and the second
is the part of the curve after the given point. The first element
will be null if <code>u</code> is at or before the start of the curve.
The second element
will be null if <code>u</code> is at or after the end of the curve. (Type: Array.&lt;<a href="H3DU.BSplineCurve.md">H3DU.BSplineCurve</a>>)

 <a name='H3DU.BSplineCurve_tangent'></a>
### H3DU.BSplineCurve#tangent(u)

Finds the <a href="H3DU.CurveEval.md#H3DU.CurveEval_vertex">tangent</a> (derivative) of
this curve at the given point.

#### Parameters

* `u` (Type: Number)<br>
    Point on the curve to evaluate.

#### Return Value

An array giving the tangent vector.
It will have as many elements as a control point (or one fewer
if DIVIDE_BIT is set), as specified in the constructor. (Type: Array.&lt;Number>)

 <a name='H3DU.BSplineCurve.uniform'></a>
### (static) H3DU.BSplineCurve.uniform(controlPoints, [degree], [bits])

Creates a B-spline curve with uniform knots.

#### Parameters

* `controlPoints` (Type: Array.&lt;Array.&lt;Number>>)<br>
    Array of control points as specified in the <a href="H3DU.BSplineCurve.md">H3DU.BSplineCurve</a> constructor.
* `degree` (Type: Number) (optional)<br>
    Degree of the B-spline curve. For example, 3 means a degree-3 (cubic) curve. If null or omitted, the default is 3.
* `bits` (Type: Number) (optional)<br>
    Bits as specified in the <a href="H3DU.BSplineCurve.md">H3DU.BSplineCurve</a> constructor.

#### Return Value

Return value. The first
knot of the curve will be 0 and the last knot will be 1. (This is a change from previous
versions.) (Type: <a href="H3DU.BSplineCurve.md">H3DU.BSplineCurve</a>)

 <a name='H3DU.BSplineCurve.uniformKnots'></a>
### (static) H3DU.BSplineCurve.uniformKnots(controlPoints, degree)

Generates a knot vector with uniform knots, to be
passed to the <a href="H3DU.BSplineCurve.md">H3DU.BSplineCurve</a> or <a href="H3DU.BSplineCurve.md">H3DU.BSplineCurve</a> constructor.

#### Parameters

* `controlPoints` (Type: Number)<br>
    Number of control points the curve will have.
* `degree` (Type: Number)<br>
    Degree of the B-spline curve. For example, 3 means a degree-3 (cubic) curve. If null or omitted, the default is 3.

#### Return Value

A uniform knot vector. The first
knot will be 0 and the last knot will be 1. (This is a change from previous
versions.) (Type: Array.&lt;Number>)

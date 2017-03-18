# H3DU.BSplineCurve

[Back to documentation index.](index.md)

<a name='H3DU.BSplineCurve'></a>
### H3DU.BSplineCurve(controlPoints, knots, [bits])

**Augments:** <a href="H3DU.Curve.md">H3DU.Curve</a>

A <a href="H3DU.Curve.md">curve evaluator object</a> for a B-spline (basis spline) curve.
B-spline curves can also represent all B&eacute;zier curves (see <a href="H3DU.BSplineCurve.md#H3DU.BSplineCurve.fromBezierCurve">H3DU.BSplineCurve.fromBezierCurve</a>).

<b>B&eacute;zier Curves</b>

A B&eacute;zier curve is defined by a series of control points, where
the first and last control points define the end points of the curve, and
the remaining control points define the curve's shape, though they don't
necessarily cross the curve.

#### Parameters

* `controlPoints` (Type: Array.&lt;Array.&lt;number>>)<br>An array of control points. Each control point is an array with the same length as the other control points. It is assumed that the first control point's length represents the size of all the control points.
* `knots` (Type: Array.&lt;number>)<br>Knot vector of the curve. Its size must be at least 2 plus the number of control points and not more than twice the number of control points.<br> The length of this parameter minus 1, minus the number of control points, represents the <i>degree</i> of the B-spline curve. For example, a degree-3 (cubic) B-spline curve contains eight knots, that is, four more knots than the number of control points (four). A degree of 1 results in straight line segments.<br> The knot vector must be a monotonically nondecreasing sequence, the first knot must not equal the last, and the same knot may not be repeated more than N+1 times at the beginning and end of the vector, or more than N times elsewhere, where N is the curve's degree. If the difference between one knot and the next isn't the same, the curve is considered a <i>non-uniform</i>B-spline curve. Usually the first knot will be 0 or less and the last knot will be 1 or greater.<br> If there are N times 2 knots with the first N knots equal to 0 and the rest equal to 1, where N is the number of control points, the control points describe a <i>B&eacute;zier</i> curve, in which the first and last control points match the curve's end points.

* `bits` (Type: number) (optional)<br>Bits for defining input and controlling output. Zero or more of BSplineCurve.WEIGHTED_BIT, BSplineCurve.HOMOGENEOUS_BIT, and BSplineCurve.DIVIDE_BIT. If null or omitted, no bits are set.

### Members

* [DIVIDE_BIT](#H3DU.BSplineCurve.DIVIDE_BIT)<br>Indicates to divide each other coordinate of the returned point
by the last coordinate of the point and omit the last
coordinate.
* [HOMOGENEOUS_BIT](#H3DU.BSplineCurve.HOMOGENEOUS_BIT)<br>**Deprecated: This bit is deprecated because the B-spline
equation works the same whether control points are in conventional
coordinates or in homogeneous coordinates.**
* [WEIGHTED_BIT](#H3DU.BSplineCurve.WEIGHTED_BIT)<br><b>Deprecated: Support for this control point format may be dropped
in the future. Instead of using this bit, supply control points in homogeneous
coordinates (where each other coordinate is premultiplied by the last)
and use <code>DIVIDE_BIT</code> to convert the
results to conventional coordinates.</b>
* [WEIGHTED_DIVIDE_BITS](#H3DU.BSplineCurve.WEIGHTED_DIVIDE_BITS)<br>**Deprecated: Deprecated because WEIGHTED_BIT is deprecated.**

### Methods

* [accel](#H3DU.BSplineCurve_accel)<br>Finds an approximate acceleration vector at the given U coordinate of this curve.
* [arcLength](#H3DU.BSplineCurve_arcLength)<br>Finds an approximate arc length (distance) between the start of this
curve and the point at the given U coordinate of this curve.
* [changeEnds](#H3DU.BSplineCurve_changeEnds)<br>Creates a curve evaluator object for a curve that is generated using
the same formula as this one (and uses the same U coordinates),
but has a different set of end points.
* [clamped](#H3DU.BSplineCurve.clamped)<br>Creates a B-spline curve with uniform knots, except that
the curve will start and end at the first and last control points and will
be tangent to the line between the first and second control points
and to the line between the next-to-last and last control points.
* [clampedKnots](#H3DU.BSplineCurve.clampedKnots)<br>Generates a knot vector with uniform knots, to be
passed to the <a href="H3DU.BSplineCurve.md">H3DU.BSplineCurve</a> or <a href="H3DU.BSplineCurve.md">H3DU.BSplineCurve</a> constructor,
except that with the knot vector curve will start and end at the first and last control points and will
be tangent to the line between the first and second control points
and to the line between the next-to-last and last control points.
* [endPoints](#H3DU.BSplineCurve_endPoints)<br>Returns the starting and coordinates of this curve.
* [evaluate](#H3DU.BSplineCurve_evaluate)<br>Evaluates the curve function based on a point
in a B-spline curve.
* [fitRange](#H3DU.BSplineCurve_fitRange)<br>Creates a curve evaluator object for a curve that follows the same
path as this one but has its U coordinates remapped to fit the given range.
* [fromBezierCurve](#H3DU.BSplineCurve.fromBezierCurve)<br>Creates a B-spline curve from the control points of a B&eacute;zier curve.
* [getControlPoints](#H3DU.BSplineCurve_getControlPoints)<br>Gets a reference to the array of control points used
in this curve object.
* [getKnots](#H3DU.BSplineCurve_getKnots)<br>Gets a reference to the array of knots used
in this curve object.
* [getLength](#H3DU.BSplineCurve_getLength)<br>Convenience method for getting the total length of this curve.
* [getPoints](#H3DU.BSplineCurve_getPoints)<br>Gets an array of positions on the curve at fixed intervals
of U coordinates.
* [jerk](#H3DU.BSplineCurve_jerk)<br>Finds an approximate jerk vector at the given U coordinate of this curve.
* [normal](#H3DU.BSplineCurve_normal)<br>Finds an approximate principal normal vector at the given U coordinate of this curve.
* [split](#H3DU.BSplineCurve_split)<br>Splits this B-spline curve into two at the given point.
* [tangent](#H3DU.BSplineCurve_tangent)<br>Convenience method for finding an approximate tangent vector of this curve at the given U and V coordinates.
* [toArcLengthParam](#H3DU.BSplineCurve_toArcLengthParam)<br>Creates a curve evaluator object for a curve that follows the same
path as this one but has its U coordinates remapped to
an <i>arc length parameterization</i>.
* [uniform](#H3DU.BSplineCurve.uniform)<br>Creates a B-spline curve with uniform knots.
* [uniformKnots](#H3DU.BSplineCurve.uniformKnots)<br>Generates a knot vector with uniform knots, to be
passed to the <a href="H3DU.BSplineCurve.md">H3DU.BSplineCurve</a> or <a href="H3DU.BSplineCurve.md">H3DU.BSplineCurve</a> constructor.
* [velocity](#H3DU.BSplineCurve_velocity)<br>Finds the velocity (derivative) of
this curve at the given point.

<a name='H3DU.BSplineCurve.DIVIDE_BIT'></a>
### H3DU.BSplineCurve.DIVIDE_BIT (constant)

Indicates to divide each other coordinate of the returned point
by the last coordinate of the point and omit the last
coordinate. This is used to convert
homogeneous coordinates to conventional coordinates.
If this bit is set, the length of each control point must be at least 2.

A B-spline curve that has control points whose last coordinate is other than
1 is a <i>rational</i> B-spline curve.

Default Value: `2`

<a name='H3DU.BSplineCurve.HOMOGENEOUS_BIT'></a>
### H3DU.BSplineCurve.HOMOGENEOUS_BIT (constant)

**Deprecated: This bit is deprecated because the B-spline
equation works the same whether control points are in conventional
coordinates or in homogeneous coordinates.**

Indicates that each other coordinate of each control point
was premultiplied by the last coordinate of the point, that is,
each control point is in homogeneous coordinates.
Only used with WEIGHTED_BIT.

Default Value: `4`

<a name='H3DU.BSplineCurve.WEIGHTED_BIT'></a>
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

<a name='H3DU.BSplineCurve.WEIGHTED_DIVIDE_BITS'></a>
### H3DU.BSplineCurve.WEIGHTED_DIVIDE_BITS (constant)

**Deprecated: Deprecated because WEIGHTED_BIT is deprecated.**

Combination of WEIGHTED_BIT and DIVIDE_BIT.

<a name='H3DU.BSplineCurve_accel'></a>
### H3DU.BSplineCurve#accel(u)

Finds an approximate acceleration vector at the given U coordinate of this curve.
The implementation in <a href="H3DU.Curve.md">H3DU.Curve</a> calls the evaluator's <code>accel</code>
method if it implements it; otherwise, does a numerical differentiation using
the velocity vector.

The <b>acceleration</b> of a curve is a vector which is the second-order derivative of the curve's position at the given coordinate. The vector returned by this method <i>should not</i> be "normalized" to a <a href="tutorial-glmath.md">unit vector</a>.

#### Parameters

* `u` (Type: number)<br>U coordinate of a point on the curve.

#### Return Value

An array describing an acceleration vector. It should have at least as many
elements as the number of dimensions of the underlying curve. (Type: Array.&lt;number>)

<a name='H3DU.BSplineCurve_arcLength'></a>
### H3DU.BSplineCurve#arcLength(u)

Finds an approximate arc length (distance) between the start of this
curve and the point at the given U coordinate of this curve.
The implementation in <a href="H3DU.Curve.md">H3DU.Curve</a> calls the evaluator's <code>arcLength</code>
method if it implements it; otherwise, calculates a numerical integral using the velocity vector.

The <b>arc length</b> function returns a number; if the curve is "smooth", this is the integral, from the starting point to <code>u</code>, of the length of the velocity vector.

#### Parameters

* `u` (Type: number)<br>U coordinate of a point on the curve.

#### Return Value

The approximate arc length of this curve at the given U coordinate. (Type: number)

<a name='H3DU.BSplineCurve_changeEnds'></a>
### H3DU.BSplineCurve#changeEnds(ep1, ep2)

Creates a curve evaluator object for a curve that is generated using
the same formula as this one (and uses the same U coordinates),
but has a different set of end points.
For example, this method can be used to shrink the path of a curve
from [0, &pi] to [0, &pi/8].

Note, however, that in general, shrinking
the range of a curve will not shrink the length of a curve
in the same proportion, unless the curve's path runs at
constant speed with respect to time. For example, shrinking the range of a curve
from [0, 1] to [0, 0.5] will not generally result in a curve that's exactly half as
long as the original curve.

#### Parameters

* `ep1` (Type: number)<br>New start point of the curve.
* `ep2` (Type: number)<br>New end point of the curve.

#### Return Value

Return value. (Type: <a href="H3DU.Curve.md">H3DU.Curve</a>)

<a name='H3DU.BSplineCurve.clamped'></a>
### (static) H3DU.BSplineCurve.clamped(controlPoints, [degree], [bits])

Creates a B-spline curve with uniform knots, except that
the curve will start and end at the first and last control points and will
be tangent to the line between the first and second control points
and to the line between the next-to-last and last control points.

#### Parameters

* `controlPoints` (Type: Array.&lt;Array.&lt;number>>)<br>Array of control points as specified in the <a href="H3DU.BSplineCurve.md">H3DU.BSplineCurve</a> constructor.
* `degree` (Type: number) (optional)<br>Degree of the B-spline curve. For example, 3 means a degree-3 (cubic) curve. If null or omitted, the default is 3.
* `bits` (Type: number) (optional)<br>Bits as specified in the <a href="H3DU.BSplineCurve.md">H3DU.BSplineCurve</a> constructor.

#### Return Value

Return value. The first
knot of the curve will be 0 and the last knot will be 1. (This is a change from previous
versions.) (Type: <a href="H3DU.BSplineCurve.md">H3DU.BSplineCurve</a>)

<a name='H3DU.BSplineCurve.clampedKnots'></a>
### (static) H3DU.BSplineCurve.clampedKnots(controlPoints, [degree])

Generates a knot vector with uniform knots, to be
passed to the <a href="H3DU.BSplineCurve.md">H3DU.BSplineCurve</a> or <a href="H3DU.BSplineCurve.md">H3DU.BSplineCurve</a> constructor,
except that with the knot vector curve will start and end at the first and last control points and will
be tangent to the line between the first and second control points
and to the line between the next-to-last and last control points.

#### Parameters

* `controlPoints` (Type: number | Object)<br>Number of control points the curve will have, or an array of control points.
* `degree` (Type: number) (optional)<br>Degree of the B-spline curve. For example, 3 means a degree-3 (cubic) curve. If null or omitted, the default is 3.

#### Return Value

A clamped uniform knot vector.
The first knot will be 0 and the last knot will be 1.
(This is a change in version 2.0.) (Type: Array.&lt;number>)

<a name='H3DU.BSplineCurve_endPoints'></a>
### H3DU.BSplineCurve#endPoints()

Returns the starting and coordinates of this curve.

#### Return Value

A two-element array containing
the starting and ending U coordinates, respectively, of the curve. (Type: Array.&lt;number>)

<a name='H3DU.BSplineCurve_evaluate'></a>
### H3DU.BSplineCurve#evaluate(u)

Evaluates the curve function based on a point
in a B-spline curve.

#### Parameters

* `u` (Type: number)<br>Point on the curve to evaluate. NOTE: Since version 2.0, this parameter is no longer scaled according to the curve's knot vector. To get the curve's extents, call this object's <code>endPoints</code> method.

#### Return Value

An array of the result of
the evaluation. Its length will be equal to the
length of a control point (minus 1 if DIVIDE_BIT is set), as specified in the constructor. (Type: Array.&lt;number>)

#### Example

    // Generate 11 points forming the curve.
    var points=[];
    for(var i=0;i<=10;i++) {
    points.push(curve.evaluate(i/10.0));
    }

<a name='H3DU.BSplineCurve_fitRange'></a>
### H3DU.BSplineCurve#fitRange(ep1, ep2)

Creates a curve evaluator object for a curve that follows the same
path as this one but has its U coordinates remapped to fit the given range.
For example, this method can be used to shrink the range of U coordinates
from [-&pi;, &pi;] to [0, 1] without shortening the path of the curve.
Here, -&pi; now maps to 0, and &pi; now maps to 1.

#### Parameters

* `ep1` (Type: number)<br>New value to use as the start point of the curve.
* `ep2` (Type: number)<br>New value to use as the end point of the curve.

#### Return Value

Return value. (Type: <a href="H3DU.Curve.md">H3DU.Curve</a>)

<a name='H3DU.BSplineCurve.fromBezierCurve'></a>
### (static) H3DU.BSplineCurve.fromBezierCurve(controlPoints, [bits])

Creates a B-spline curve from the control points of a B&eacute;zier curve.

#### Parameters

* `controlPoints` (Type: Array.&lt;Array.&lt;number>>)<br>An array of control points. Each control point is an array with the same length as the other control points. It is assumed that:<ul> <li>The length of this parameter minus 1 represents the degree of the B&eacute;zier curve. For example, a degree-3 (cubic) curve contains 4 control points. A degree of 1 results in a straight line segment. <li>The first control point's length represents the size of all the control points. </ul>
* `bits` (Type: number) (optional)<br>Bits as specified in the <a href="H3DU.BSplineCurve.md">H3DU.BSplineCurve</a> constructor.

#### Return Value

Return value. (Type: <a href="H3DU.BSplineCurve.md">H3DU.BSplineCurve</a>)

<a name='H3DU.BSplineCurve_getControlPoints'></a>
### H3DU.BSplineCurve#getControlPoints()

Gets a reference to the array of control points used
in this curve object.

#### Return Value

An object described in the constructor to <a href="H3DU.BSplineCurve.md">H3DU.BSplineCurve</a>. (Type: Array.&lt;Array.&lt;number>>)

<a name='H3DU.BSplineCurve_getKnots'></a>
### H3DU.BSplineCurve#getKnots()

Gets a reference to the array of knots used
in this curve object.

#### Return Value

An object described in the constructor to <a href="H3DU.BSplineCurve.md">H3DU.BSplineCurve</a>. (Type: Array.&lt;Array.&lt;number>>)

<a name='H3DU.BSplineCurve_getLength'></a>
### H3DU.BSplineCurve#getLength()

Convenience method for getting the total length of this curve.

#### Return Value

The distance from the start of the curve to its end. (Type: number)

<a name='H3DU.BSplineCurve_getPoints'></a>
### H3DU.BSplineCurve#getPoints(count)

Gets an array of positions on the curve at fixed intervals
of U coordinates. Note that these positions will not generally be
evenly spaced along the curve unless the curve uses
an arc-length parameterization.

#### Parameters

* `count` (Type: number)<br>Number of positions to generate. Throws an error if this number is 0. If this value is 1, returns an array containing the starting point of this curve.

#### Return Value

An array of curve positions. The first
element will be the start of the curve. If "count" is 2 or greater, the last element
will be the end of the curve. (Type: Array.&lt;Array.&lt;number>>)

<a name='H3DU.BSplineCurve_jerk'></a>
### H3DU.BSplineCurve#jerk(u)

Finds an approximate jerk vector at the given U coordinate of this curve.
The implementation in <a href="H3DU.Curve.md">H3DU.Curve</a> calls the evaluator's <code>jerk</code>
method if it implements it; otherwise, does a numerical differentiation using
the acceleration vector.

The <b>jerk</b> of a curve is a vector which is the third-order derivative of the curve's position at the given coordinate. The vector returned by this method <i>should not</i> be "normalized" to a <a href="tutorial-glmath.md">unit vector</a>.

#### Parameters

* `u` (Type: number)<br>U coordinate of a point on the curve.

#### Return Value

An array describing a jerk vector. It should have at least as many
elements as the number of dimensions of the underlying curve. (Type: Array.&lt;number>)

<a name='H3DU.BSplineCurve_normal'></a>
### H3DU.BSplineCurve#normal(u)

Finds an approximate principal normal vector at the given U coordinate of this curve.
The implementation in <a href="H3DU.Curve.md">H3DU.Curve</a> calls the evaluator's <code>normal</code>
method if it implements it; otherwise, does a numerical differentiation using the velocity vector.

The <b>principal normal</b> of a curve is the derivative of the "normalized" velocity
vector divided by that derivative's length. The normal returned by this method
<i>should</i> be "normalized" to a <a href="tutorial-glmath.md">unit vector</a>. (Compare with <a href="H3DU.Surface.md#H3DU.Surface_gradient">H3DU.Surface#gradient</a>.)

#### Parameters

* `u` (Type: number)<br>U coordinate of a point on the curve.

#### Return Value

An array describing a normal vector. It should have at least as many
elements as the number of dimensions of the underlying curve. (Type: Array.&lt;number>)

<a name='H3DU.BSplineCurve_split'></a>
### H3DU.BSplineCurve#split(u)

Splits this B-spline curve into two at the given point.

#### Parameters

* `u` (Type: number)<br>Point on the curve where this curve will be split.

#### Return Value

An array containing two B-spline curves: the
first is the part of the curve before the given point, and the second
is the part of the curve after the given point. The first element
will be null if <code>u</code> is at or before the start of the curve.
The second element
will be null if <code>u</code> is at or after the end of the curve. (Type: Array.&lt;<a href="H3DU.BSplineCurve.md">H3DU.BSplineCurve</a>>)

<a name='H3DU.BSplineCurve_tangent'></a>
### H3DU.BSplineCurve#tangent(u)

Convenience method for finding an approximate tangent vector of this curve at the given U and V coordinates.
The <b>tangent vector</b> is the same as the velocity vector, but "normalized" to a unit vector.

#### Parameters

* `u` (Type: number)<br>U coordinate of a point on the curve.

#### Return Value

An array describing a normal vector. It should have at least as many
elements as the number of dimensions of the underlying curve. (Type: Array.&lt;number>)

<a name='H3DU.BSplineCurve_toArcLengthParam'></a>
### H3DU.BSplineCurve#toArcLengthParam()

Creates a curve evaluator object for a curve that follows the same
path as this one but has its U coordinates remapped to
an <i>arc length parameterization</i>. Arc length
parameterization allows for moving along a curve's path at a uniform
speed and for generating points which are spaced evenly along that
path -- both features are more difficult with most other kinds
of curve parameterization.

The <i>end points</i> of the curve (obtained by calling the <code>endPoints</code>
method) will be (0, N), where N is the distance to the end of the curve from its
start.

When converting to an arc length parameterization, the curve
should be continuous and have a speed greater than 0 at every
point on the curve.

#### Return Value

Return value. (Type: <a href="H3DU.Curve.md">H3DU.Curve</a>)

<a name='H3DU.BSplineCurve.uniform'></a>
### (static) H3DU.BSplineCurve.uniform(controlPoints, [degree], [bits])

Creates a B-spline curve with uniform knots.

#### Parameters

* `controlPoints` (Type: Array.&lt;Array.&lt;number>>)<br>Array of control points as specified in the <a href="H3DU.BSplineCurve.md">H3DU.BSplineCurve</a> constructor.
* `degree` (Type: number) (optional)<br>Degree of the B-spline curve. For example, 3 means a degree-3 (cubic) curve. If null or omitted, the default is 3.
* `bits` (Type: number) (optional)<br>Bits as specified in the <a href="H3DU.BSplineCurve.md">H3DU.BSplineCurve</a> constructor.

#### Return Value

Return value. The first
knot of the curve will be 0 and the last knot will be 1. (This is a change from previous
versions.) (Type: <a href="H3DU.BSplineCurve.md">H3DU.BSplineCurve</a>)

<a name='H3DU.BSplineCurve.uniformKnots'></a>
### (static) H3DU.BSplineCurve.uniformKnots(controlPoints, [degree])

Generates a knot vector with uniform knots, to be
passed to the <a href="H3DU.BSplineCurve.md">H3DU.BSplineCurve</a> or <a href="H3DU.BSplineCurve.md">H3DU.BSplineCurve</a> constructor.

#### Parameters

* `controlPoints` (Type: number | Object)<br>Number of control points the curve will have, or an array of control points.
* `degree` (Type: number) (optional)<br>Degree of the B-spline curve. For example, 3 means a degree-3 (cubic) curve. If null or omitted, the default is 3.

#### Return Value

A uniform knot vector. The first
knot will be 0 and the last knot will be 1. (This is a change from previous
versions.) (Type: Array.&lt;number>)

<a name='H3DU.BSplineCurve_velocity'></a>
### H3DU.BSplineCurve#velocity(u)

Finds the velocity (derivative) of
this curve at the given point.

#### Parameters

* `u` (Type: number)<br>Point on the curve to evaluate.

#### Return Value

An array giving the velocity vector.
It will have as many elements as a control point (or one fewer
if DIVIDE_BIT is set), as specified in the constructor. (Type: Array.&lt;number>)

[Back to documentation index.](index.md)

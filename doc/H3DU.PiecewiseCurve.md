# H3DU.PiecewiseCurve

[Back to documentation index.](index.md)

<a name='H3DU.PiecewiseCurve'></a>
### H3DU.PiecewiseCurve(curves)

**Augments:** <a href="H3DU.Curve.md">H3DU.Curve</a>

A <a href="H3DU.Curve.md">curve evaluator object</a> for a curve
made up of one or more individual curves.

#### Parameters

* `curves` (Type: Array.&lt;Object>)<br>An array of curve evaluator objects, such as an instance of <a href="H3DU.Curve.md">H3DU.Curve</a> or one of its subclasses. The combined curve should be continuous in that the curves that make it up should connect at their end points (except the curve need not be closed).

### Methods

* [accel](#H3DU.PiecewiseCurve_accel)<br>Finds an approximate acceleration vector at the given U coordinate of this curve.
* [arcLength](#H3DU.PiecewiseCurve_arcLength)<br>TODO: Not documented yet.
* [changeEnds](#H3DU.PiecewiseCurve_changeEnds)<br>Creates a curve evaluator object for a curve that is generated using
the same formula as this one (and uses the same U coordinates),
but has a different set of end points.
* [endPoints](#H3DU.PiecewiseCurve_endPoints)<br>Returns the starting and ending U coordinates of this curve.
* [evaluate](#H3DU.PiecewiseCurve_evaluate)<br>TODO: Not documented yet.
* [fitRange](#H3DU.PiecewiseCurve_fitRange)<br>Creates a curve evaluator object for a curve that follows the same
path as this one but has its U coordinates remapped to fit the given range.
* [fromCardinalSpline](#H3DU.PiecewiseCurve.fromCardinalSpline)<br>Creates a piecewise curve made up of B-spline curves from the control points of a cardinal spline.
* [fromHermiteSpline](#H3DU.PiecewiseCurve.fromHermiteSpline)<br>Creates a piecewise curve made up of B-spline curves from the control points of a Hermite spline.
* [getCurves](#H3DU.PiecewiseCurve_getCurves)<br>Gets a reference to the curves that make up this piecewise curve.
* [getLength](#H3DU.PiecewiseCurve_getLength)<br>Convenience method for getting the total length of this curve.
* [getPoints](#H3DU.PiecewiseCurve_getPoints)<br>Gets an array of positions on the curve at fixed intervals
of U coordinates.
* [jerk](#H3DU.PiecewiseCurve_jerk)<br>Finds an approximate jerk vector at the given U coordinate of this curve.
* [normal](#H3DU.PiecewiseCurve_normal)<br>Finds an approximate principal normal vector at the given U coordinate of this curve.
* [tangent](#H3DU.PiecewiseCurve_tangent)<br>Convenience method for finding an approximate tangent vector of this curve at the given U and V coordinates.
* [toArcLengthParam](#H3DU.PiecewiseCurve_toArcLengthParam)<br>Creates a curve evaluator object for a curve that follows the same
path as this one but has its U coordinates remapped to
an <i>arc length parameterization</i>.
* [velocity](#H3DU.PiecewiseCurve_velocity)<br>TODO: Not documented yet.

<a name='H3DU.PiecewiseCurve_accel'></a>
### H3DU.PiecewiseCurve#accel(u)

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

<a name='H3DU.PiecewiseCurve_arcLength'></a>
### H3DU.PiecewiseCurve#arcLength(u)

TODO: Not documented yet.

#### Parameters

* `u` (Type: number)

#### Return Value

Return value. (Type: number)

<a name='H3DU.PiecewiseCurve_changeEnds'></a>
### H3DU.PiecewiseCurve#changeEnds(ep1, ep2)

Creates a curve evaluator object for a curve that is generated using
the same formula as this one (and uses the same U coordinates),
but has a different set of end points.
For example, this method can be used to shrink the path of a curve
from [0, &pi] to [0, &pi/8], so that the curve runs 1/8 of its former path.

#### Parameters

* `ep1` (Type: number)<br>New start point of the curve.
* `ep2` (Type: number)<br>New end point of the curve.

#### Return Value

Return value. (Type: <a href="H3DU.Curve.md">H3DU.Curve</a>)

<a name='H3DU.PiecewiseCurve_endPoints'></a>
### H3DU.PiecewiseCurve#endPoints()

Returns the starting and ending U coordinates of this curve.

#### Return Value

A two-element array. The first element is the starting coordinate of
the curve, and the second is its ending coordinate.
Returns <code>[0, n]</code>, where <code>n</code> is the number
of curves that make up this piecewise curve.

<a name='H3DU.PiecewiseCurve_evaluate'></a>
### H3DU.PiecewiseCurve#evaluate(u)

TODO: Not documented yet.

#### Parameters

* `u` (Type: *)

#### Return Value

Return value. (Type: *)

<a name='H3DU.PiecewiseCurve_fitRange'></a>
### H3DU.PiecewiseCurve#fitRange(ep1, ep2)

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

<a name='H3DU.PiecewiseCurve.fromCardinalSpline'></a>
### (static) H3DU.PiecewiseCurve.fromCardinalSpline(curve, [tension])

Creates a piecewise curve made up of B-spline curves from the control points of a cardinal spline.

To use this method, you must include the script "extras/spline.js". Example:

    <script type="text/javascript" src="extras/spline.js"></script>

#### Parameters

* `curve` (Type: Array.&lt;Array.&lt;number>>)<br>An array of control points, each with the same number of values, that describe a cardinal spline. Each point, except the first and the last, will be tangent to the line that connects the points adjacent to it. The spline starts at the second control point and ends at the next-to-last control point. The array must have at least four control points.
* `tension` (Type: number) (optional)<br>A tension parameter ranging from 0 to 1. Closer to 1 means closer to a straight line. If null or omitted, this value is 0.5 (indicating what is commonly called a <i>Catmull-Rom spline</i>).

#### Return Value

A piecewise curve made up
of cubic B-spline curves describing the
same path as the cardinal spline. (Type: <a href="H3DU.PiecewiseCurve.md">H3DU.PiecewiseCurve</a>)

<a name='H3DU.PiecewiseCurve.fromHermiteSpline'></a>
### (static) H3DU.PiecewiseCurve.fromHermiteSpline(curve)

Creates a piecewise curve made up of B-spline curves from the control points of a Hermite spline.

To use this method, you must include the script "extras/spline.js". Example:

    <script type="text/javascript" src="extras/spline.js"></script>

#### Parameters

* `curve` (Type: Array.&lt;Array.&lt;number>>)<br>An array of control points, each with the same number of values, that describe a Hermite spline. Each pair of control points takes up two elements of the array and consists of the coordinates of that point followed by the velocity vector (derivative) at that point. The array must have an even number of control points and at least four control points.

#### Return Value

A piecewise curve made up of cubic B-spline curves describing the
same path as the Hermite spline. (Type: <a href="H3DU.PiecewiseCurve.md">H3DU.PiecewiseCurve</a>)

<a name='H3DU.PiecewiseCurve_getCurves'></a>
### H3DU.PiecewiseCurve#getCurves()

Gets a reference to the curves that make up this piecewise curve.

#### Return Value

The curves that make up this piecewise curve. (Type: Array.&lt;<a href="H3DU.Curve.md">H3DU.Curve</a>>)

<a name='H3DU.PiecewiseCurve_getLength'></a>
### H3DU.PiecewiseCurve#getLength()

Convenience method for getting the total length of this curve.

#### Return Value

The distance from the start of the curve to its end. (Type: number)

<a name='H3DU.PiecewiseCurve_getPoints'></a>
### H3DU.PiecewiseCurve#getPoints(count)

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

<a name='H3DU.PiecewiseCurve_jerk'></a>
### H3DU.PiecewiseCurve#jerk(u)

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

<a name='H3DU.PiecewiseCurve_normal'></a>
### H3DU.PiecewiseCurve#normal(u)

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

<a name='H3DU.PiecewiseCurve_tangent'></a>
### H3DU.PiecewiseCurve#tangent(u)

Convenience method for finding an approximate tangent vector of this curve at the given U and V coordinates.
The <b>tangent vector</b> is the same as the velocity vector, but "normalized" to a unit vector.

#### Parameters

* `u` (Type: number)<br>U coordinate of a point on the curve.

#### Return Value

An array describing a normal vector. It should have at least as many
elements as the number of dimensions of the underlying curve. (Type: Array.&lt;number>)

<a name='H3DU.PiecewiseCurve_toArcLengthParam'></a>
### H3DU.PiecewiseCurve#toArcLengthParam()

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

<a name='H3DU.PiecewiseCurve_velocity'></a>
### H3DU.PiecewiseCurve#velocity(u)

TODO: Not documented yet.

#### Parameters

* `u` (Type: *)

#### Return Value

Return value. (Type: *)

[Back to documentation index.](index.md)
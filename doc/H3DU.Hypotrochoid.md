# H3DU.Hypotrochoid

[Back to documentation index.](index.md)

<a name='H3DU.Hypotrochoid'></a>
### H3DU.Hypotrochoid(outerRadius, innerRadius, distFromInnerCenter, [rotationDegrees])

**Augments:** <a href="H3DU.Curve.md">H3DU.Curve</a>

A <a href="H3DU.Curve.md">curve evaluator object</a> for a curve drawn by a circle that rolls along the inside
of another circle, whose position is fixed, with a center of (0,0).

The following curves can be generated with this class (in the following
descriptions, O = <code>outerRadius</code>, R means <code>innerRadius</code>,
and D = <code>distFromRollerCenter</code>).<ul>
<li>Hypocycloid: D = R (hypotrochoid touching the fixed circle).</li>
<li>Curtate hypocycloid: D < R (hypotrochoid not touching the fixed circle).</li>
<li>Prolate hypocycloid: D > R (hypotrochoid crossing the fixed circle).</li>
<li>Circle: O = R\*2; the circle will have radius R - D.</li>
<li>Ellipse: O = R\*2; the ellipse (unrotated) will have width abs(R+D)\*2
and height abs(R-D)\*2.</li>
<li>Line segment with length O\*2: O = R\*2; D = R.</li>
<li>Deltoid: O = R\*3; D = R.</li>
<li>Astroid: O = R\*4; D = R.</li>
<li>N-pointed hypocycloid: O = R \* N; D = R.</li></ul>

This class is considered a supplementary class to the
Public Domain HTML 3D Library and is not considered part of that
library.

To use this class, you must include the script "extras/evaluators.js"; the
class is not included in the "h3du_min.js" file which makes up
the HTML 3D Library. Example:

    <script type="text/javascript" src="extras/evaluators.js"></script>

#### Parameters

* `outerRadius` (Type: number)<br>Radius of the circle whose position is fixed.
* `innerRadius` (Type: number)<br>Radius of the rolling circle. A hypocycloid results when distFromInnerCenter=innerRadius.
* `distFromInnerCenter` (Type: number)<br>Distance from the center of the rolling circle to the drawing pen.
* `rotationDegrees` (Type: number) (optional)<br>Starting angle of the curve from the positive X axis toward the positive Y axis, in degrees. Default is 0.

### Methods

* [accel](#H3DU.Hypotrochoid_accel)<br>Finds an approximate acceleration vector at the given U coordinate of this curve.
* [arcLength](#H3DU.Hypotrochoid_arcLength)<br>Finds an approximate arc length (distance) between the start of this
curve and the point at the given U coordinate of this curve.
* [changeEnds](#H3DU.Hypotrochoid_changeEnds)<br>Creates a curve evaluator object for a curve that is generated using
the same formula as this one (and uses the same U coordinates),
but has a different set of end points.
* [endPoints](#H3DU.Hypotrochoid_endPoints)<br>Gets the endpoints of this curve.
* [evaluate](#H3DU.Hypotrochoid_evaluate)<br>Finds the coordinates of a point on the curve from the given U coordinate.
* [fitRange](#H3DU.Hypotrochoid_fitRange)<br>Creates a curve evaluator object for a curve that follows the same
path as this one but has its U coordinates remapped to fit the given range.
* [getLength](#H3DU.Hypotrochoid_getLength)<br>Convenience method for getting the total length of this curve.
* [getPoints](#H3DU.Hypotrochoid_getPoints)<br>Gets an array of positions on the curve at fixed intervals
of U coordinates.
* [jerk](#H3DU.Hypotrochoid_jerk)<br>Finds an approximate jerk vector at the given U coordinate of this curve.
* [normal](#H3DU.Hypotrochoid_normal)<br>Finds an approximate principal normal vector at the given U coordinate of this curve.
* [rose](#H3DU.Hypotrochoid.rose)<br>Creates a <a href="H3DU.Curve.md">curve evaluator object</a> for a rose, a special
form of hypotrochoid.
* [scaleTo](#H3DU.Hypotrochoid_scaleTo)<br>Creates a modified version of this curve so that it
fits the given radius.
* [tangent](#H3DU.Hypotrochoid_tangent)<br>Convenience method for finding an approximate tangent vector of this curve at the given U and V coordinates.
* [toArcLengthParam](#H3DU.Hypotrochoid_toArcLengthParam)<br>Creates a curve evaluator object for a curve that follows the same
path as this one but has its U coordinates remapped to
an <i>arc length parameterization</i>.
* [velocity](#H3DU.Hypotrochoid_velocity)<br>Finds an approximate velocity vector at the given U coordinate of this curve.

<a name='H3DU.Hypotrochoid_accel'></a>
### H3DU.Hypotrochoid#accel(u)

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

<a name='H3DU.Hypotrochoid_arcLength'></a>
### H3DU.Hypotrochoid#arcLength(u)

Finds an approximate arc length (distance) between the start of this
curve and the point at the given U coordinate of this curve.

#### Parameters

* `u` (Type: number)<br>U coordinate of a point on the curve.

#### Return Value

The approximate arc length of this curve at the given U coordinate. (Type: Array.&lt;number>)

<a name='H3DU.Hypotrochoid_changeEnds'></a>
### H3DU.Hypotrochoid#changeEnds(ep1, ep2)

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

<a name='H3DU.Hypotrochoid_endPoints'></a>
### H3DU.Hypotrochoid#endPoints()

Gets the endpoints of this curve.
For this curve evaluator object, the curve
starts at 0 and ends at &pi;\*2.

#### Return Value

An array containing the two
endpoints of the curve. The first number is the start of the curve,
and the second number is the end of the curve. (Type: Array.&lt;number>)

<a name='H3DU.Hypotrochoid_evaluate'></a>
### H3DU.Hypotrochoid#evaluate(u)

Finds the coordinates of a point on the curve from the given U coordinate.

#### Parameters

* `u` (Type: number)<br>U coordinate.

#### Return Value

A 3-element array specifying a 3D point.
Only the X and Y coordinates can be other than 0. (Type: Array.&lt;number>)

<a name='H3DU.Hypotrochoid_fitRange'></a>
### H3DU.Hypotrochoid#fitRange(ep1, ep2)

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

<a name='H3DU.Hypotrochoid_getLength'></a>
### H3DU.Hypotrochoid#getLength()

Convenience method for getting the total length of this curve.

#### Return Value

The distance from the start of the curve to its end. (Type: number)

<a name='H3DU.Hypotrochoid_getPoints'></a>
### H3DU.Hypotrochoid#getPoints(count)

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

<a name='H3DU.Hypotrochoid_jerk'></a>
### H3DU.Hypotrochoid#jerk(u)

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

<a name='H3DU.Hypotrochoid_normal'></a>
### H3DU.Hypotrochoid#normal(u)

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

<a name='H3DU.Hypotrochoid.rose'></a>
### (static) H3DU.Hypotrochoid.rose(n, distFromInnerCenter, [rotationDegrees])

Creates a <a href="H3DU.Curve.md">curve evaluator object</a> for a rose, a special
form of hypotrochoid.

#### Parameters

* `n` (Type: number)<br>Parameter that determines the petal form of the rose. For example, the rose is symmetrical if this number is even.
* `distFromInnerCenter` (Type: number)<br>Distance from the center of the rolling circle to the drawing pen.
* `rotationDegrees` (Type: number) (optional)<br>Starting angle of the curve from the positive X axis toward the positive Y axis, in degrees. Default is 0.

#### Return Value

The resulting curve evaluator object. (Type: <a href="H3DU.Hypotrochoid.md">H3DU.Hypotrochoid</a>)

<a name='H3DU.Hypotrochoid_scaleTo'></a>
### H3DU.Hypotrochoid#scaleTo(radius)

Creates a modified version of this curve so that it
fits the given radius.

#### Parameters

* `radius` (Type: number)<br>Desired radius of the curve.

#### Return Value

Return value. (Type: <a href="H3DU.Hypotrochoid.md">H3DU.Hypotrochoid</a>)

<a name='H3DU.Hypotrochoid_tangent'></a>
### H3DU.Hypotrochoid#tangent(u)

Convenience method for finding an approximate tangent vector of this curve at the given U and V coordinates.
The <b>tangent vector</b> is the same as the velocity vector, but "normalized" to a unit vector.

#### Parameters

* `u` (Type: number)<br>U coordinate of a point on the curve.

#### Return Value

An array describing a normal vector. It should have at least as many
elements as the number of dimensions of the underlying curve. (Type: Array.&lt;number>)

<a name='H3DU.Hypotrochoid_toArcLengthParam'></a>
### H3DU.Hypotrochoid#toArcLengthParam()

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

<a name='H3DU.Hypotrochoid_velocity'></a>
### H3DU.Hypotrochoid#velocity(u)

Finds an approximate velocity vector at the given U coordinate of this curve.
The implementation in <a href="H3DU.Curve.md">H3DU.Curve</a> calls the evaluator's <code>velocity</code>
method if it implements it; otherwise, does a numerical differentiation using
the position (from the <code>evaluate</code> method).

The <b>velocity</b> of a curve is a vector which is the derivative of the curve's position at the given coordinate. The vector returned by this method <i>should not</i> be "normalized" to a <a href="tutorial-glmath.md">unit vector</a>.

#### Parameters

* `u` (Type: number)<br>U coordinate of a point on the curve.

#### Return Value

An array describing a velocity vector. It should have at least as many
elements as the number of dimensions of the underlying curve. (Type: Array.&lt;number>)

[Back to documentation index.](index.md)

# H3DU.Trochoid

[Back to documentation index.](index.md)

<a name='H3DU.Trochoid'></a>
### H3DU.Trochoid(radius, distFromCenter)

<b>Augments:</b> <a href="H3DU.Curve.md">H3DU.Curve</a>

A <a href="H3DU.Curve.md">curve evaluator object</a> for a curve drawn by a circle that rolls along the X axis.

The following curves can be generated with this class (in the following
descriptions, R means <code>radius</code>
and D = <code>distFromCenter</code>).<ul>
<li>Cycloid: D = R (trochoid touching the fixed circle).</li>
<li>Curtate cycloid: D < R (trochoid not touching the fixed circle).</li>
<li>Prolate cycloid: D > R (trochoid crossing the fixed circle).</li></ul>

This class is considered a supplementary class to the
Public Domain HTML 3D Library and is not considered part of that
library.

To use this class, you must include the script "extras/evaluators.js"; the
class is not included in the "h3du_min.js" file which makes up
the HTML 3D Library. Example:

    <script type="text/javascript" src="extras/evaluators.js"></script>

#### Parameters

* `radius` (Type: number)<br>Radius of the rolling circle.
* `distFromCenter` (Type: number)<br>Distance from the center of the rolling circle to the drawing pen.

### Methods

* [accel](#H3DU.Trochoid_accel)<br>Finds an approximate acceleration vector at the given U coordinate of this curve.
* [arcLength](#H3DU.Trochoid_arcLength)<br>Finds an approximate arc length (distance) between the start of this
curve and the point at the given U coordinate of this curve.
* [endPoints](#H3DU.Trochoid_endPoints)<br>Gets the endpoints of this curve.
* [evaluate](#H3DU.Trochoid_evaluate)<br>Generates a point on the curve from the given U coordinate.
* [normal](#H3DU.Trochoid_normal)<br>Finds an approximate principal normal vector at the given U coordinate of this curve.
* [velocity](#H3DU.Trochoid_velocity)<br>Finds the velocity (derivative) of this curve at the given point.

<a name='H3DU.Trochoid_accel'></a>
### H3DU.Trochoid#accel(u)

Finds an approximate acceleration vector at the given U coordinate of this curve.
The implementation in <a href="H3DU.Curve.md">H3DU.Curve</a> calls the evaluator's <code>accel</code>
method if it implements it; otherwise, does a numerical differentiation using
the velocity vector.

The <b>acceleration</b> of a curve is a vector which is the second derivative of the curve's position at the given coordinate. The vector returned by this method <i>should not</i> be "normalized" to a <a href="tutorial-glmath.md">unit vector</a>.

#### Parameters

* `u` (Type: number)<br>U coordinate of a point on the curve.

#### Return Value

An array describing an acceleration vector. It should have at least as many
elements as the number of dimensions of the underlying curve. (Type: Array.&lt;number>)

<a name='H3DU.Trochoid_arcLength'></a>
### H3DU.Trochoid#arcLength(u)

Finds an approximate arc length (distance) between the start of this
curve and the point at the given U coordinate of this curve.
The implementation in <a href="H3DU.Curve.md">H3DU.Curve</a> calls the evaluator's <code>arcLength</code>
method if it implements it; otherwise, calculates a numerical integral using the velocity vector.

The <b>arc length</b> function returns a number; if the curve is "smooth", this is the integral, from the starting point to <code>u</code>, of the length of the velocity vector.

#### Parameters

* `u` (Type: number)<br>U coordinate of a point on the curve.

#### Return Value

The approximate arc length of this curve at the given U coordinate. (Type: number)

<a name='H3DU.Trochoid_endPoints'></a>
### H3DU.Trochoid#endPoints()

Gets the endpoints of this curve.
For this curve evaluator object, the curve
starts at 0 and ends at &pi;\*2.

#### Return Value

An array containing the two
endpoints of the curve. The first number is the start of the curve,
and the second number is the end of the curve. \* (Type: Array.&lt;number>)

<a name='H3DU.Trochoid_evaluate'></a>
### H3DU.Trochoid#evaluate(u)

Generates a point on the curve from the given U coordinate.

#### Parameters

* `u` (Type: number)<br>U coordinate.

#### Return Value

A 3-element array specifying a 3D point.
Only the X and Y coordinates will be other than 0. (Type: Array.&lt;number>)

<a name='H3DU.Trochoid_normal'></a>
### H3DU.Trochoid#normal(u)

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

<a name='H3DU.Trochoid_velocity'></a>
### H3DU.Trochoid#velocity(u)

Finds the velocity (derivative) of this curve at the given point.

#### Parameters

* `u` (Type: number)<br>Point on the curve to evaluate.

#### Return Value

An array giving the velocity vector. (Type: Array.&lt;number>)

[Back to documentation index.](index.md)

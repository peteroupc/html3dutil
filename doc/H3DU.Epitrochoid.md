# H3DU.Epitrochoid

[Back to documentation index.](index.md)

<a name='H3DU.Epitrochoid'></a>
### H3DU.Epitrochoid(outerRadius, rollerRadius, distFromRollerCenter, [rotationDegrees])

<b>Augments:</b> <a href="H3DU.Curve.md">H3DU.Curve</a>

A <a href="H3DU.Curve.md">curve evaluator object</a> for a curve drawn by a circle that rolls along the outside
of another circle, whose position is fixed, with a center of (0,0).
The rolling circle will start at the positive X axis of the fixed circle.

The following curves can be generated with this class (in the following
descriptions, O = <code>outerRadius</code>, R means <code>rollerRadius</code>,
and D = <code>distFromRollerCenter</code>).<ul>
<li>Epicycloid: D = R (epitrochoid touching the fixed circle).</li>
<li>Curtate epicycloid: D < R (epitrochoid not touching the fixed circle).</li>
<li>Prolate epicycloid: D > R (epitrochoid crossing the fixed circle).</li>
<li>Cardioid: R = O; D = O.</li>
<li>Nephroid: R = O/2; D = O/2.</li>
<li>Ranunculoid: R = O/5; D = O/5.</li>
<li>N-cusped epicycloid: R = O/N; D = O/N.</li>
<li>Circle: O = 0; the radius will be R - D.</li>
<li>Epicycloid: R = D.</li></ul>

This class is considered a supplementary class to the
Public Domain HTML 3D Library and is not considered part of that
library.

To use this class, you must include the script "extras/evaluators.js"; the
class is not included in the "h3du_min.js" file which makes up
the HTML 3D Library. Example:

    <script type="text/javascript" src="extras/evaluators.js"></script>

#### Parameters

* `outerRadius` (Type: number)<br>Radius of the circle whose position is fixed.
* `rollerRadius` (Type: number)<br>Radius of the rolling circle. An epicycloid results when distFromRollerCenter=rollerRadius.
* `distFromRollerCenter` (Type: number)<br>Distance from the center of the rolling circle to the drawing pen.
* `rotationDegrees` (Type: number) (optional)<br>Starting angle of the curve from the positive X axis toward the positive Y axis, in degrees. Default is 0.

### Methods

* [accel](#H3DU.Epitrochoid_accel)<br>Finds an approximate acceleration vector at the given U coordinate of this curve.
* [arcLength](#H3DU.Epitrochoid_arcLength)<br>Finds an approximate arc length (distance) between the start of this
curve and the point at the given U coordinate of this curve.
* [endPoints](#H3DU.Epitrochoid_endPoints)<br>Gets the endpoints of this curve.
* [evaluate](#H3DU.Epitrochoid_evaluate)<br>Generates a point on the curve from the given U coordinate.
* [jerk](#H3DU.Epitrochoid_jerk)<br>Finds an approximate jerk vector at the given U coordinate of this curve.
* [normal](#H3DU.Epitrochoid_normal)<br>Finds an approximate principal normal vector at the given U coordinate of this curve.
* [scaleTo](#H3DU.Epitrochoid_scaleTo)<br>Creates a modified version of this curve so that it
fits the given radius.
* [velocity](#H3DU.Epitrochoid_velocity)<br>Finds an approximate velocity vector at the given U coordinate of this curve.

<a name='H3DU.Epitrochoid_accel'></a>
### H3DU.Epitrochoid#accel(u)

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

<a name='H3DU.Epitrochoid_arcLength'></a>
### H3DU.Epitrochoid#arcLength(u)

Finds an approximate arc length (distance) between the start of this
curve and the point at the given U coordinate of this curve.
The implementation in <a href="H3DU.Curve.md">H3DU.Curve</a> calls the evaluator's <code>arcLength</code>
method if it implements it; otherwise, calculates a numerical integral using the velocity vector.

The <b>arc length</b> function returns a number; if the curve is "smooth", this is the integral, from the starting point to <code>u</code>, of the length of the velocity vector.

#### Parameters

* `u` (Type: number)<br>U coordinate of a point on the curve.

#### Return Value

The approximate arc length of this curve at the given U coordinate. (Type: number)

<a name='H3DU.Epitrochoid_endPoints'></a>
### H3DU.Epitrochoid#endPoints()

Gets the endpoints of this curve.
For this curve evaluator object, the curve
starts at 0 and ends at &pi;\*2.

#### Return Value

An array containing the two
endpoints of the curve. The first number is the start of the curve,
and the second number is the end of the curve. \* (Type: Array.&lt;number>)

<a name='H3DU.Epitrochoid_evaluate'></a>
### H3DU.Epitrochoid#evaluate(u)

Generates a point on the curve from the given U coordinate.

#### Parameters

* `u` (Type: number)<br>U coordinate.

#### Return Value

A 3-element array specifying a 3D point.
Only the X and Y coordinates will be other than 0. (Type: Array.&lt;number>)

<a name='H3DU.Epitrochoid_jerk'></a>
### H3DU.Epitrochoid#jerk(u)

Finds an approximate jerk vector at the given U coordinate of this curve.
The implementation in <a href="H3DU.Curve.md">H3DU.Curve</a> calls the evaluator's <code>jerk</code>
method if it implements it; otherwise, does a numerical differentiation using
the acceleration vector.

The <b>jerk</b> of a curve is a vector which is the third derivative of the curve's position at the given coordinate. The vector returned by this method <i>should not</i> be "normalized" to a <a href="tutorial-glmath.md">unit vector</a>.

#### Parameters

* `u` (Type: number)<br>U coordinate of a point on the curve.

#### Return Value

An array describing a jerk vector. It should have at least as many
elements as the number of dimensions of the underlying curve. (Type: Array.&lt;number>)

<a name='H3DU.Epitrochoid_normal'></a>
### H3DU.Epitrochoid#normal(u)

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

<a name='H3DU.Epitrochoid_scaleTo'></a>
### H3DU.Epitrochoid#scaleTo(radius)

Creates a modified version of this curve so that it
fits the given radius.

#### Parameters

* `radius` (Type: number)<br>Desired radius of the curve.

#### Return Value

Return value. (Type: <a href="H3DU.Epitrochoid.md">H3DU.Epitrochoid</a>)

<a name='H3DU.Epitrochoid_velocity'></a>
### H3DU.Epitrochoid#velocity(u)

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

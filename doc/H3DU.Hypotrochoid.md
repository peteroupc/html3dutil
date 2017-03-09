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

* `outerRadius` (Type: Number)<br>
    Radius of the circle whose position is fixed.
* `innerRadius` (Type: Number)<br>
    Radius of the rolling circle. A hypocycloid results when distFromInnerCenter=innerRadius.
* `distFromInnerCenter` (Type: Number)<br>
    Distance from the center of the rolling circle to the drawing pen.
* `rotationDegrees` (Type: number) (optional)<br>
    Starting angle of the curve from the positive X axis toward the positive Y axis, in degrees. Default is 0.

### Methods

* [accel](#H3DU.Hypotrochoid_accel)<br>Finds an approximate acceleration vector at the given U coordinate of this curve.
* [arcLength](#H3DU.Hypotrochoid_arcLength)<br>Finds an approximate arc length (distance) between the start of this
curve and the point at the given U coordinate of this curve.
* [endPoints](#H3DU.Hypotrochoid_endPoints)<br>Gets the endpoints of this curve.
* [evaluate](#H3DU.Hypotrochoid_evaluate)<br>Finds the coordinates of a point on the curve from the given U coordinate.
* [normal](#H3DU.Hypotrochoid_normal)<br>Finds an approximate principal normal vector at the given U coordinate of this curve.
* [rose](#H3DU.Hypotrochoid.rose)<br>Creates a <a href="H3DU.Curve.md">curve evaluator object</a> for a rose, a special
form of hypotrochoid.
* [scaleTo](#H3DU.Hypotrochoid_scaleTo)<br>Creates a modified version of this curve so that it
fits the given radius.
* [velocity](#H3DU.Hypotrochoid_velocity)<br>Finds an approximate velocity vector at the given U coordinate of this curve.

 <a name='H3DU.Hypotrochoid_accel'></a>
### H3DU.Hypotrochoid#accel(u)

Finds an approximate acceleration vector at the given U coordinate of this curve.
The implementation in <a href="H3DU.Curve.md">H3DU.Curve</a> calls the evaluator's <code>accel</code>
method if it implements it; otherwise, does a numerical differentiation using
the velocity vector.

The <b>acceleration</b> of a curve is a vector which is the second derivative of the curve's position at the given coordinate. The vector returned by this method <i>should not</i> be "normalized" to a <a href="tutorial-glmath.md">unit vector</a>.

#### Parameters

* `u` (Type: Number)<br>
    U coordinate of a point on the curve.

#### Return Value

An array describing an acceleration vector. It should have at least as many
elements as the number of dimensions of the underlying curve. (Type: Array.&lt;number>)

 <a name='H3DU.Hypotrochoid_arcLength'></a>
### H3DU.Hypotrochoid#arcLength(u)

Finds an approximate arc length (distance) between the start of this
curve and the point at the given U coordinate of this curve.

#### Parameters

* `u` (Type: Number)<br>
    U coordinate of a point on the curve.

#### Return Value

The approximate arc length of this curve at the given U coordinate. (Type: Array.&lt;number>)

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

* `u` (Type: Number)<br>
    U coordinate.

#### Return Value

A 3-element array specifying a 3D point.
Only the X and Y coordinates can be other than 0. (Type: Array.&lt;number>)

 <a name='H3DU.Hypotrochoid_normal'></a>
### H3DU.Hypotrochoid#normal(u)

Finds an approximate principal normal vector at the given U coordinate of this curve.
The implementation in <a href="H3DU.Curve.md">H3DU.Curve</a> calls the evaluator's <code>normal</code>
method if it implements it; otherwise, does a numerical differentiation using the velocity vector.

The <b>principal normal</b> of a curve is the derivative of the "normalized" velocity
vector divided by that derivative's length. The normal returned by this method
<i>should</i> be "normalized" to a <a href="tutorial-glmath.md">unit vector</a>. (Compare with <a href="H3DU.Surface.md#H3DU.Surface_gradient">H3DU.Surface#gradient</a>.)

#### Parameters

* `u` (Type: Number)<br>
    U coordinate of a point on the curve.

#### Return Value

An array describing a normal vector. It should have at least as many
elements as the number of dimensions of the underlying curve. (Type: Array.&lt;number>)

 <a name='H3DU.Hypotrochoid.rose'></a>
### (static) H3DU.Hypotrochoid.rose(n, distFromInnerCenter, [rotationDegrees])

Creates a <a href="H3DU.Curve.md">curve evaluator object</a> for a rose, a special
form of hypotrochoid.

#### Parameters

* `n` (Type: Number)<br>
    Parameter that determines the petal form of the rose. For example, the rose is symmetrical if this number is even.
* `distFromInnerCenter` (Type: Number)<br>
    Distance from the center of the rolling circle to the drawing pen.
* `rotationDegrees` (Type: number) (optional)<br>
    Starting angle of the curve from the positive X axis toward the positive Y axis, in degrees. Default is 0.

#### Return Value

The resulting curve evaluator object. (Type: <a href="H3DU.Hypotrochoid.md">H3DU.Hypotrochoid</a>)

 <a name='H3DU.Hypotrochoid_scaleTo'></a>
### H3DU.Hypotrochoid#scaleTo(radius)

Creates a modified version of this curve so that it
fits the given radius.

#### Parameters

* `radius` (Type: Number)<br>
    Desired radius of the curve.

#### Return Value

Return value. (Type: <a href="H3DU.Hypotrochoid.md">H3DU.Hypotrochoid</a>)

 <a name='H3DU.Hypotrochoid_velocity'></a>
### H3DU.Hypotrochoid#velocity(u)

Finds an approximate velocity vector at the given U coordinate of this curve.
The implementation in <a href="H3DU.Curve.md">H3DU.Curve</a> calls the evaluator's <code>velocity</code>
method if it implements it; otherwise, does a numerical differentiation using
the position (from the <code>evaluate</code> method).

The <b>velocity</b> of a curve is a vector which is the derivative of the curve's position at the given coordinate. The vector returned by this method <i>should not</i> be "normalized" to a <a href="tutorial-glmath.md">unit vector</a>.

#### Parameters

* `u` (Type: Number)<br>
    U coordinate of a point on the curve.

#### Return Value

An array describing a velocity vector. It should have at least as many
elements as the number of dimensions of the underlying curve. (Type: Array.&lt;number>)

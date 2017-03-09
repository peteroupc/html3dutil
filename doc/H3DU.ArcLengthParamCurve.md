# H3DU.ArcLengthParamCurve

[Back to documentation index.](index.md)

 <a name='H3DU.ArcLengthParamCurve'></a>
### H3DU.ArcLengthParamCurve(curve)

A <a href="H3DU.Curve.md">curve evaluator object</a> that
wraps another curve evaluator object and remaps its U coordinates
to an <i>arc length parameterization</i>. Arc length
parameterization allows for moving along a curve's path at a uniform
speed and for generating points which are spaced evenly along that
path -- both features are more difficult with most other kinds
of curve parameterization.

This class is considered a supplementary class to the
Public Domain HTML 3D Library and is not considered part of that
library.

To use this class, you must include the script "extras/evaluators.js"; the
class is not included in the "h3du_min.js" file which makes up
the HTML 3D Library. Example:

    <script type="text/javascript" src="extras/evaluators.js"></script>

**Augments:** <a href="H3DU.Curve.md">H3DU.Curve</a>

#### Parameters

* `curve` (Type: Object)<br>
    A <a href="H3DU.Curve.md">curve evaluator object</a> that describes a curve to convert to an arc length parameterization. The curve should be continuous and have a speed greater than 0 at every point on the curve.

### Methods

* [accel](#H3DU.ArcLengthParamCurve_accel)<br>Finds an approximate acceleration vector at the given U coordinate of this curve.
* [arcLength](#H3DU.ArcLengthParamCurve_arcLength)<br>Finds the arc length (distance) between the start of this
curve and the point at the given U coordinate of this curve.
* [endPoints](#H3DU.ArcLengthParamCurve_endPoints)<br>Gets the endpoints of this curve.
* [evaluate](#H3DU.ArcLengthParamCurve_evaluate)<br>Generates a point on the curve which is the given distance away
from the start of the curve.
* [getCoordinate](#H3DU.ArcLengthParamCurve_getCoordinate)<br>Finds the U coordinate for the point on the curve which is the given distance away
from the start of the curve.
* [getPoints](#H3DU.ArcLengthParamCurve_getPoints)<br>TODO: Not documented yet.
* [normal](#H3DU.ArcLengthParamCurve_normal)<br>Finds an approximate principal normal vector at the given U coordinate of this curve.
* [velocity](#H3DU.ArcLengthParamCurve_velocity)<br>Finds an approximate velocity vector at the given U coordinate of this curve.

 <a name='H3DU.ArcLengthParamCurve_accel'></a>
### H3DU.ArcLengthParamCurve#accel(u)

Finds an approximate acceleration vector at the given U coordinate of this curve.
This method calls the evaluator's <code>accel</code>
method if it implements it; otherwise, does a numerical differentiation using
the velocity vector.

The <b>acceleration</b> of a curve is a vector which is the second derivative of the curve's position at the given coordinate. The vector returned by this method <i>should not</i> be "normalized" to a <a href="tutorial-glmath.md">unit vector</a>.

#### Parameters

* `u` (Type: Number)<br>
    U coordinate of a point on the curve.

#### Return Value

An array describing an acceleration vector. It should have at least as many
elements as the number of dimensions of the underlying curve. (Type: Array.&lt;Number>)

 <a name='H3DU.ArcLengthParamCurve_arcLength'></a>
### H3DU.ArcLengthParamCurve#arcLength(u)

Finds the arc length (distance) between the start of this
curve and the point at the given U coordinate of this curve.

#### Parameters

* `u` (Type: Number)<br>
    U coordinate of a point on the curve.

#### Return Value

The arc length of this curve at the given U coordinate. (Type: Array.&lt;Number>)

 <a name='H3DU.ArcLengthParamCurve_endPoints'></a>
### H3DU.ArcLengthParamCurve#endPoints()

Gets the endpoints of this curve.

#### Return Value

An array containing the two
endpoints of the curve. The first number is the start of the curve,
and the second number is the end of the curve (also the curve's
total length). (Type: Array.&lt;Number>)

 <a name='H3DU.ArcLengthParamCurve_evaluate'></a>
### H3DU.ArcLengthParamCurve#evaluate(u)

Generates a point on the curve which is the given distance away
from the start of the curve.

#### Parameters

* `u` (Type: Number)<br>
    Distance to the point from the start of the curve.

#### Return Value

An array specifying the position of the given
point. It will have as many elements as for the underlying curve. (Type: Array.&lt;Number>)

 <a name='H3DU.ArcLengthParamCurve_getCoordinate'></a>
### H3DU.ArcLengthParamCurve#getCoordinate(u)

Finds the U coordinate for the point on the curve which is the given distance away
from the start of the curve. This can be used as the U coordinate to
pass to the underlying <a href="H3DU.Curve.md">curve evaluator object</a>'s
methods. (Note that velocity and acceleration depend on parameterization; for
example, the length of the velocity vector may differ for the underlying curve object
than for this one, even though both vectors generally point in the same direction.)

#### Parameters

* `u` (Type: Number)<br>
    Distance to the point from the start of the curve.

#### Return Value

The U coordinate for the given point. (Type: Number)

#### Example

The following example gets an array
of U coordinates for the curve, spaced evenly.

    var points=[]; // Create an array of points
    var length=this.endPoints()[0]; // Get the curve's length
    for(var i=0;i<20;i++) { // Generate 20 points
    var dist=i*length/19; // Will be spaced 1/19 of the total length
    points.push(this.getCoordinate(dist));
    }

 <a name='H3DU.ArcLengthParamCurve_getPoints'></a>
### H3DU.ArcLengthParamCurve#getPoints(count)

TODO: Not documented yet.

#### Parameters

* `count` (Type: *)

#### Return Value

Return value. (Type: *)

 <a name='H3DU.ArcLengthParamCurve_normal'></a>
### H3DU.ArcLengthParamCurve#normal(u)

Finds an approximate principal normal vector at the given U coordinate of this curve.
This method calls the evaluator's <code>normal</code>
method if it implements it; otherwise, does a numerical differentiation using the velocity vector.

The <b>principal normal</b> of a curve is the derivative of the "normalized" velocity
vector divided by that derivative's length. The normal returned by this method
<i>should</i> be "normalized" to a <a href="tutorial-glmath.md">unit vector</a>. (Compare with H3DU.Surface#gradient.)

#### Parameters

* `u` (Type: Number)<br>
    U coordinate of a point on the curve.

#### Return Value

An array describing a normal vector. It should have at least as many
elements as the number of dimensions of the underlying curve. (Type: Array.&lt;Number>)

 <a name='H3DU.ArcLengthParamCurve_velocity'></a>
### H3DU.ArcLengthParamCurve#velocity(u)

Finds an approximate velocity vector at the given U coordinate of this curve.
This method calls the evaluator's <code>velocity</code>
method if it implements it; otherwise, does a numerical differentiation using
the position (from the <code>evaluate</code> method).

The <b>velocity</b> of a curve is a vector which is the derivative of the curve's position at the given coordinate. The vector returned by this method <i>should not</i> be "normalized" to a <a href="tutorial-glmath.md">unit vector</a>.

#### Parameters

* `u` (Type: Number)<br>
    U coordinate of a point on the curve.

#### Return Value

An array describing a velocity vector. It should have at least as many
elements as the number of dimensions of the underlying curve. (Type: Array.&lt;Number>)

# H3DU.BezierCurve

[Back to documentation index.](index.md)

 <a name='H3DU.BezierCurve'></a>
### H3DU.BezierCurve(cp, [u1], [u2])

**Augments:** <a href="H3DU.Curve.md">H3DU.Curve</a>

<b>Deprecated: Instead of this class, use <a href="H3DU.BSplineCurve.md#H3DU.BSplineCurve.fromBezierCurve">H3DU.BSplineCurve.fromBezierCurve</a>
to create a B&eacute;zier curve.</b>

A <a href="H3DU.Curve.md">curve evaluator object</a> for a B&eacute;zier curve.

#### Parameters

* `cp` (Type: Array.&lt;Array.&lt;Number>>)<br>
    An array of control points as specified in <a href="H3DU.BSplineCurve.md#H3DU.BSplineCurve.fromBezierCurve">H3DU.BSplineCurve.fromBezierCurve</a>.
* `u1` (Type: number) (optional)<br>
    No longer used since version 2.0. The starting and ending points will be (0, 0). (This parameter was the starting point for the purpose of interpolation.)
* `u2` (Type: number) (optional)<br>
    No longer used since version 2.0. The starting and ending points will be (0, 0). (This parameter was the ending point for the purpose of interpolation.)

### Methods

* [accel](#H3DU.BezierCurve_accel)<br>Finds an approximate acceleration vector at the given U coordinate of this curve.
* [arcLength](#H3DU.BezierCurve_arcLength)<br>Finds an approximate arc length (distance) between the start of this
curve and the point at the given U coordinate of this curve.
* [endPoints](#H3DU.BezierCurve_endPoints)<br>Returns the starting and ending U coordinates of this curve.
* [evaluate](#H3DU.BezierCurve_evaluate)<br>Evaluates the curve function based on a point
in a B&eacute;zier curve.
* [normal](#H3DU.BezierCurve_normal)<br>Finds an approximate principal normal vector at the given U coordinate of this curve.
* [velocity](#H3DU.BezierCurve_velocity)<br>Finds an approximate velocity vector at the given U coordinate of this curve.

 <a name='H3DU.BezierCurve_accel'></a>
### H3DU.BezierCurve#accel(u)

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

 <a name='H3DU.BezierCurve_arcLength'></a>
### H3DU.BezierCurve#arcLength(u)

Finds an approximate arc length (distance) between the start of this
curve and the point at the given U coordinate of this curve.
The implementation in <a href="H3DU.Curve.md">H3DU.Curve</a> calls the evaluator's <code>arcLength</code>
method if it implements it; otherwise, calculates a numerical integral using the velocity vector.

The <b>arc length</b> function returns a number; if the curve is "smooth", this is the integral, from the starting point to <code>u</code>, of the length of the velocity vector.

#### Parameters

* `u` (Type: Number)<br>
    U coordinate of a point on the curve.

#### Return Value

The approximate arc length of this curve at the given U coordinate. (Type: Array.&lt;number>)

 <a name='H3DU.BezierCurve_endPoints'></a>
### H3DU.BezierCurve#endPoints()

Returns the starting and ending U coordinates of this curve.

#### Return Value

A two-element array. The first and second
elements are the starting and ending U coordinates, respectively, of the curve. (Type: Array.&lt;number>)

 <a name='H3DU.BezierCurve_evaluate'></a>
### H3DU.BezierCurve#evaluate(u)

Evaluates the curve function based on a point
in a B&eacute;zier curve.

#### Parameters

* `u` (Type: Number)<br>
    Point on the curve to evaluate (generally within the range given in the constructor).

#### Return Value

An array of the result of
the evaluation. It will have as many elements as a control point, as specified in the constructor. (Type: Array.&lt;number>)

#### Example

    // Generate 11 points forming the B&eacute;zier curve.
    // Assumes the curve was created with u1=0 and u2=1 (the default).
    var points=[];
    for(var i=0;i<=10;i++) {
    points.push(curve.evaluate(i/10.0));
    }

 <a name='H3DU.BezierCurve_normal'></a>
### H3DU.BezierCurve#normal(u)

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

 <a name='H3DU.BezierCurve_velocity'></a>
### H3DU.BezierCurve#velocity(u)

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

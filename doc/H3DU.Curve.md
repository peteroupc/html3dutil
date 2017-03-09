# H3DU.Curve

[Back to documentation index.](index.md)

 <a name='H3DU.Curve'></a>
### H3DU.Curve(curve)

A curve evaluator object for a parametric curve.

A parametric curve is a curve whose points are based on a
parametric curve function. A curve function takes a number
(U) and returns a point (in 1, 2, 3 or more dimensions, but
usually 2 or 3) that lies on the curve. For example, in 3
dimensions, a curve function has the following form:

<b>F</b>(u) = [ x(u), y(u), z(u) ]

where x(u) returns an X coordinate, y(u) a Y coordinate,
and z(u) returns a Z coordinate.

Specialized curves should <a href="tutorial-subclass.md">subclass</a> this class and implement
the <code>evaluate</code> method and, optionally, the other methods mentioned in the "curve" parameter below.

#### Parameters

* `curve` (Type: Object)<br>
    A <b>curve evaluator object</b>, which is an object that must contain an <code>evaluate</code> method and may contain the <code>endPoints</code>, <code>velocity</code>, <code>accel</code>, <code>normal</code>, and/or <code>arcLength</code> methods, as described in the corresponding methods of this class.

### Methods

* [accel](#H3DU.Curve_accel)<br>Finds an approximate acceleration vector at the given U coordinate of this curve.
* [arcLength](#H3DU.Curve_arcLength)<br>Finds an approximate arc length (distance) between the start of this
curve and the point at the given U coordinate of this curve.
* [endPoints](#H3DU.Curve_endPoints)<br>Returns the starting and ending U coordinates of this curve.
* [evaluate](#H3DU.Curve_evaluate)<br>Finds the position of this curve at the given U coordinate.
* [normal](#H3DU.Curve_normal)<br>Finds an approximate principal normal vector at the given U coordinate of this curve.
* [velocity](#H3DU.Curve_velocity)<br>Finds an approximate velocity vector at the given U coordinate of this curve.

 <a name='H3DU.Curve_accel'></a>
### H3DU.Curve#accel(u)

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

 <a name='H3DU.Curve_arcLength'></a>
### H3DU.Curve#arcLength(u)

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

 <a name='H3DU.Curve_endPoints'></a>
### H3DU.Curve#endPoints()

Returns the starting and ending U coordinates of this curve.

#### Return Value

A two-element array. The first element is the starting coordinate of
the curve, and the second is its ending coordinate.
Returns <code>[0, 1]</code> if the evaluator doesn't implement an <code>endPoints</code>
method.

 <a name='H3DU.Curve_evaluate'></a>
### H3DU.Curve#evaluate(u)

Finds the position of this curve at the given U coordinate.

#### Parameters

* `u` (Type: Number)<br>
    U coordinate of a point on the curve.

#### Return Value

An array describing a position. It should have at least as many
elements as the number of dimensions of the underlying curve. (Type: Array.&lt;number>)

 <a name='H3DU.Curve_normal'></a>
### H3DU.Curve#normal(u)

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

 <a name='H3DU.Curve_velocity'></a>
### H3DU.Curve#velocity(u)

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

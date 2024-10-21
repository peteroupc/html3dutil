# PiecewiseCurve

[Back to documentation index.](index.md)

<a name='PiecewiseCurve'></a>
### new PiecewiseCurve(curves)

**Augments:** <a href="Curve.md">Curve</a>

A <a href="Curve.md">curve evaluator object</a> for a curve
made up of one or more individual curves.

The combined curve's U coordinates range from 0 to N,
where N is the number of curves. In this way, the integer
part of a U coordinate indicates the curve the coordinate
refers to. For example, if there are four curves, coordinates
from 0, but less than 1, belong to the first curve, and coordinates
from 1, but less than 2, belong to the second curve. The U
coordinate equal to N refers to the end of the last curve in
the piecewise curve.

#### Parameters

* `curves` (Type: Array.&lt;Object>)<br>An array of curve evaluator objects, such as an instance of <a href="Curve.md">Curve</a> or one of its subclasses. The combined curve should be continuous in that the curves that make it up should connect at their end points (except the curve need not be closed).

#### Examples

    // Generates a piecewise polygon curve from an array of
    // vectors (arrays with the same number of elements) that
    // specify the points that make up the polygon.
    function polygonCurve(points) {
    var curves=[]
    for(var i=0;<points.length;i++) {
    var cp=points[i]
    var np=(i==points.length-1) ? points[0] : points[i+1]
    curves.push(BSplineCurve.fromBezierCurve([cp,np]))
    }
    return new PiecewiseCurve(curves)
    }

### Methods

* [accel](#PiecewiseCurve_accel)<br>Finds an approximate acceleration vector at the given U coordinate of this curve.
* [arcLength](#PiecewiseCurve_arcLength)<br>Finds an approximate arc length (distance) between the start of this
curve and the point at the given U coordinate of this curve.
* [changeEnds](#PiecewiseCurve_changeEnds)<br>Creates a curve evaluator object for a curve that is generated using
the same formula as this one (and uses the same U coordinates),
but has a different set of end points.
* [endPoints](#PiecewiseCurve_endPoints)<br>Returns the starting and ending U coordinates of this curve.
* [evaluate](#PiecewiseCurve_evaluate)<br>Finds the position of this curve at the given U coordinate.
* [fitRange](#PiecewiseCurve_fitRange)<br>Creates a curve evaluator object for a curve that follows the same
path as this one but has its U coordinates remapped to fit the given range.
* [fromCatmullRomSpline](#PiecewiseCurve.fromCatmullRomSpline)<br>Creates a piecewise curve made up of B-spline curves from the control points of a
cubic Catmull&ndash;Rom spline.
* [fromEllipseArc](#PiecewiseCurve.fromEllipseArc)<br>Creates a piecewise curve that describes an arc running along an axis-aligned
ellipse, or a shape based on that arc and ellipse, given the ellipse's center
and dimensions, start angle, and sweep angle.
* [fromHermiteSpline](#PiecewiseCurve.fromHermiteSpline)<br>Creates a piecewise curve made up of B-spline curves from the control points of a
Hermite spline.
* [fromTCBSpline](#PiecewiseCurve.fromTCBSpline)<br>Creates a piecewise curve made up of B-spline curves from the control points of a
cubic TCB spline (tension/continuity/bias spline, also known as Kochanek&ndash;Bartels spline).
* [getCurves](#PiecewiseCurve_getCurves)<br>Gets a reference to the curves that make up this piecewise curve.
* [getLength](#PiecewiseCurve_getLength)<br>Convenience method for getting the total length of this curve.
* [getPoints](#PiecewiseCurve_getPoints)<br>Gets an array of positions on the curve at fixed intervals
of U coordinates.
* [getPointsAsObjects](#PiecewiseCurve_getPointsAsObjects)<br>Gets an array of positions on the curve at fixed intervals
of U coordinates.
* [jerk](#PiecewiseCurve_jerk)<br>Finds an approximate jerk vector at the given U coordinate of this curve.
* [normal](#PiecewiseCurve_normal)<br>Finds an approximate principal normal vector at the given U coordinate of this curve.
* [tangent](#PiecewiseCurve_tangent)<br>Convenience method for finding an approximate tangent vector of this curve at the given U coordinate.
* [toArcLengthParam](#PiecewiseCurve_toArcLengthParam)<br>Gets a curve evaluator object for a curve that follows the same
path as this one but has its U coordinates remapped to
an <i>arc length parameterization</i>.
* [velocity](#PiecewiseCurve_velocity)<br>Finds an approximate velocity vector at the given U coordinate of this curve.

<a name='PiecewiseCurve_accel'></a>
### PiecewiseCurve#accel(u)

Finds an approximate acceleration vector at the given U coordinate of this curve.
The implementation in <a href="Curve.md">Curve</a> calls the evaluator's <code>accel</code>
method if it implements it; otherwise, does a numerical differentiation using
the velocity vector.

The <b>acceleration</b> of a curve is a vector which is the second-order derivative of the curve's position at the given coordinate. The vector returned by this method <i>should not</i> be "normalized" to a glmath.

#### Parameters

* `u` (Type: number)<br>U coordinate of a point on the curve.

#### Return Value

An array describing an acceleration vector. It should have at least as many
elements as the number of dimensions of the underlying curve. (Type: Array.&lt;number>)

<a name='PiecewiseCurve_arcLength'></a>
### PiecewiseCurve#arcLength(u)

Finds an approximate arc length (distance) between the start of this
curve and the point at the given U coordinate of this curve.

#### Parameters

* `u` (Type: number)<br>U coordinate of a point on the curve.

#### Return Value

The approximate arc length of this curve at the given U coordinate. (Type: number)

<a name='PiecewiseCurve_changeEnds'></a>
### PiecewiseCurve#changeEnds(ep1, ep2)

Creates a curve evaluator object for a curve that is generated using
the same formula as this one (and uses the same U coordinates),
but has a different set of end points.
For example, this method can be used to shrink the path of a curve
from [0, &pi;] to [0, &pi;/8].

Note, however, that in general, shrinking
the range of a curve will not shrink the length of a curve
in the same proportion, unless the curve's path runs at
constant speed with respect to time. For example, shrinking the range of a curve
from [0, 1] to [0, 0.5] will not generally result in a curve that's exactly half as
long as the original curve.

For some curves, this method can
also be used to grow the path of the curve.

#### Parameters

* `ep1` (Type: number)<br>New start point of the curve.
* `ep2` (Type: number)<br>New end point of the curve.

#### Return Value

Return value. (Type: <a href="Curve.md">Curve</a>)

<a name='PiecewiseCurve_endPoints'></a>
### PiecewiseCurve#endPoints()

Returns the starting and ending U coordinates of this curve.

#### Return Value

A two-element array. The first element is the starting coordinate of
the curve, and the second is its ending coordinate.
Returns <code>[0, n]</code>, where <code>n</code> is the number
of curves that make up this piecewise curve.

<a name='PiecewiseCurve_evaluate'></a>
### PiecewiseCurve#evaluate(u)

Finds the position of this curve at the given U coordinate.

#### Parameters

* `u` (Type: number)<br>U coordinate of a point on the curve.

#### Return Value

An array describing a position. It should have at least as many
elements as the number of dimensions of the underlying curve. (Type: Array.&lt;number>)

<a name='PiecewiseCurve_fitRange'></a>
### PiecewiseCurve#fitRange(ep1, ep2)

Creates a curve evaluator object for a curve that follows the same
path as this one but has its U coordinates remapped to fit the given range.
For example, this method can be used to shrink the range of U coordinates
from [-&pi;, &pi;] to [0, 1] without shortening the path of the curve.
Here, -&pi; now maps to 0, and &pi; now maps to 1.

#### Parameters

* `ep1` (Type: number)<br>New value to use as the start point of the curve.
* `ep2` (Type: number)<br>New value to use as the end point of the curve.

#### Return Value

Return value. (Type: <a href="Curve.md">Curve</a>)

<a name='PiecewiseCurve.fromCatmullRomSpline'></a>
### (static) PiecewiseCurve.fromCatmullRomSpline(spline, [param], [closed])

Creates a piecewise curve made up of B-spline curves from the control points of a
cubic Catmull&ndash;Rom spline. A Catmull&ndash;Rom spline is defined by
a collection of control points that the spline
will go through, and the shape of each curve segment is also determined by the positions
of neighboring points on the spline.

#### Parameters

* `spline` (Type: Array.&lt;Array.&lt;number>>)<br>An array of control points, each with the same number of values, that the curve will pass through. Throws an error if there are fewer than two control points.
* `param` (Type: number) (optional)<br>A value that describes the curve's parameterization. Ranges from 0 to 1. A value of 0 indicates a uniform parameterization, 0.5 indicates a centripetal parameterization, and 1 indicates a chordal parameterization. Default is 0.5.
* `closed` (Type: number) (optional)<br>If true, connects the last control point of the curve with the first. Default is false.

#### Return Value

A piecewise curve made up of cubic B-spline curves describing the same path as the Catmull&ndash;Rom spline. (Type: <a href="PiecewiseCurve.md">PiecewiseCurve</a>)

<a name='PiecewiseCurve.fromEllipseArc'></a>
### (static) PiecewiseCurve.fromEllipseArc(x, y, w, h, start, sweep)

Creates a piecewise curve that describes an arc running along an axis-aligned
ellipse, or a shape based on that arc and ellipse, given the ellipse's center
and dimensions, start angle, and sweep angle. The arc is rendered as
cubic rational B-spline curves.

#### Parameters

* `x` (Type: number)<br>X coordinate of the ellipse's center.
* `y` (Type: number)<br>Y coordinate of the ellipse's center.
* `w` (Type: number)<br>Width of the ellipse's bounding box.
* `h` (Type: number)<br>Height of the ellipse's bounding box.
* `start` (Type: number)<br>Starting angle of the arc, in degrees. 0 means the positive X axis, 90 means the positive Y axis, 180 means the negative X axis, and 270 means the negative Y axis.
* `sweep` (Type: number)<br>Length of the arc in degrees. Can be positive or negative. Can be greater than 360 or less than -360, in which case the arc will wrap around the ellipse multiple times. Assuming the coordinate system's X axis points right and the Y axis down, positive angles run clockwise and negative angles counterclockwise.

#### Return Value

The resulting piecewise curve. (Type: <a href="PiecewiseCurve.md">PiecewiseCurve</a>)

<a name='PiecewiseCurve.fromHermiteSpline'></a>
### (static) PiecewiseCurve.fromHermiteSpline(spline)

Creates a piecewise curve made up of B-spline curves from the control points of a
Hermite spline. A Hermite spline is a collection of points that the curve will go through,
together with the velocity vectors (derivatives or instantaneous rates of change) at
those points.

Hermite splines are useful for representing an approximate polynomial form
of a function or curve whose derivative is known; however, Hermite splines are not
guaranteed to preserve the increasing or decreasing nature of the function or curve.

#### Parameters

* `spline` (Type: Array.&lt;Array.&lt;number>>)<br>An array of control points, each with the same number of values, that describe a Hermite spline. Each pair of control points takes up two elements of the array and consists of the coordinates of that point followed by the velocity vector (derivative) at that point. The array must have an even number of control points and at least four control points.

#### Return Value

A piecewise curve made up of cubic B-spline curves describing the
same path as the Hermite spline. (Type: <a href="PiecewiseCurve.md">PiecewiseCurve</a>)

<a name='PiecewiseCurve.fromTCBSpline'></a>
### (static) PiecewiseCurve.fromTCBSpline(spline, [tension], [continuity], [bias], [closed], [rigidEnds])

Creates a piecewise curve made up of B-spline curves from the control points of a
cubic TCB spline (tension/continuity/bias spline, also known as Kochanek&ndash;Bartels spline).
(If tension, continuity, and bias are all 0, the result is a cubic Catmull&ndash;Rom spline
in uniform parameterization.)

#### Parameters

* `spline` (Type: Array.&lt;Array.&lt;number>>)<br>An array of control points, each with the same number of values, that the curve will pass through. Throws an error if there are fewer than two control points.
* `tension` (Type: number) (optional)<br>A parameter that adjusts the length of the starting and ending tangents of each curve segment. Ranges from -1 for double-length tangents to 1 for zero-length tangents. A value of 1 results in straight line segments. Default is 0.
* `continuity` (Type: number) (optional)<br>A parameter that adjusts the direction of the starting and ending tangents of each curve segment. Ranges from -1 to 1, where values closer to -1 or closer to 1 result in tangents that are closer to perpendicular. A value of -1 results in straight line segments. Default is 0.
* `bias` (Type: number) (optional)<br>A parameter that adjusts the influence of the starting and ending tangents of each curve segment. The greater this number, the greater the ending tangents influence the direction of the next curve segment in comparison to the starting tangents. Ranges from -1 to 1. Default is 0.
* `closed` (Type: number) (optional)<br>If true, connects the last control point of the curve with the first. Default is false.
* `rigidEnds` (Type: number) (optional)<br>If true, the start and end of the piecewise curve will, by default, more rigidly follow the direction to the next or previous control point, respectively. This makes the curve compatible with GDI+ cardinal splines with 0 continuity, 0 bias, and tension equal to <code>-((T\*2)-1)</code>, where T is the GDI+ cardinal spline tension parameter. Default is false.

#### Return Value

A piecewise curve made up of cubic B-spline curves describing the
same path as the TCB spline. (Type: <a href="PiecewiseCurve.md">PiecewiseCurve</a>)

<a name='PiecewiseCurve_getCurves'></a>
### PiecewiseCurve#getCurves()

Gets a reference to the curves that make up this piecewise curve.

#### Return Value

The curves that make up this piecewise curve. (Type: Array.&lt;<a href="Curve.md">Curve</a>>)

<a name='PiecewiseCurve_getLength'></a>
### PiecewiseCurve#getLength()

Convenience method for getting the total length of this curve.

#### Return Value

The distance from the start of the curve to its end. (Type: number)

<a name='PiecewiseCurve_getPoints'></a>
### PiecewiseCurve#getPoints(count)

Gets an array of positions on the curve at fixed intervals
of U coordinates. Note that these positions will not generally be
evenly spaced along the curve unless the curve uses
an arc-length parameterization.

#### Parameters

* `count` (Type: number)<br>Number of positions to generate. Throws an error if this number is 0. If this value is 1, returns an array containing the starting point of this curve.

#### Return Value

An array of curve positions. The first
element will be the start of the curve. If "count" is 2 or greater, the last element
will be the end of the curve. (Type: Array.&lt;Array.&lt;number>> | Array.&lt;Object>)

<a name='PiecewiseCurve_getPointsAsObjects'></a>
### PiecewiseCurve#getPointsAsObjects(count)

Gets an array of positions on the curve at fixed intervals
of U coordinates. Note that these positions will not generally be
evenly spaced along the curve unless the curve uses
an arc-length parameterization. The positions will be in the form of objects with
up to four properties: x, y, z, and w retrieve the first, second, third,
and fourth coordinate of each position, respectively.

#### Parameters

* `count` (Type: number)<br>Number of positions to generate. Throws an error if this number is 0. If this value is 1, returns an array containing the starting point of this curve.

#### Return Value

An array of curve positions. The first
element will be the start of the curve. If "count" is 2 or greater, the last element
will be the end of the curve. (Type: Array.&lt;Array.&lt;number>> | Array.&lt;Object>)

#### Examples

The following example initializes a three.js BufferGeometry with the points retrieved by this method. This example requires the three.js library.

    var points=curve.getPointsAsObjects(50)
    var buffer=new THREE.BufferGeometry()
    .setFromPoints(points);

<a name='PiecewiseCurve_jerk'></a>
### PiecewiseCurve#jerk(u)

Finds an approximate jerk vector at the given U coordinate of this curve.
The implementation in <a href="Curve.md">Curve</a> calls the evaluator's <code>jerk</code>
method if it implements it; otherwise, does a numerical differentiation using
the acceleration vector.

The <b>jerk</b> of a curve is a vector which is the third-order derivative of the curve's position at the given coordinate. The vector returned by this method <i>should not</i> be "normalized" to a glmath.

#### Parameters

* `u` (Type: number)<br>U coordinate of a point on the curve.

#### Return Value

An array describing a jerk vector. It should have at least as many
elements as the number of dimensions of the underlying curve. (Type: Array.&lt;number>)

<a name='PiecewiseCurve_normal'></a>
### PiecewiseCurve#normal(u)

Finds an approximate principal normal vector at the given U coordinate of this curve.
The implementation in <a href="Curve.md">Curve</a> calls the evaluator's <code>normal</code>
method if it implements it; otherwise, does a numerical differentiation using the velocity vector.

The <b>principal normal</b> of a curve is the derivative of the "normalized" velocity
vector divided by that derivative's length. The normal returned by this method
<i>should</i> be "normalized" to a glmath. (Compare with <a href="Surface.md#Surface_gradient">Surface#gradient</a>.)

#### Parameters

* `u` (Type: number)<br>U coordinate of a point on the curve.

#### Return Value

An array describing a normal vector. It should have at least as many
elements as the number of dimensions of the underlying curve. (Type: Array.&lt;number>)

<a name='PiecewiseCurve_tangent'></a>
### PiecewiseCurve#tangent(u)

Convenience method for finding an approximate tangent vector of this curve at the given U coordinate.
The <b>tangent vector</b> is the same as the velocity vector, but "normalized" to a unit vector.

#### Parameters

* `u` (Type: number)<br>U coordinate of a point on the curve.

#### Return Value

An array describing a normal vector. It should have at least as many
elements as the number of dimensions of the underlying curve. (Type: Array.&lt;number>)

<a name='PiecewiseCurve_toArcLengthParam'></a>
### PiecewiseCurve#toArcLengthParam()

Gets a curve evaluator object for a curve that follows the same
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
point on the curve. The arc length parameterization used in
this method is approximate.

#### Return Value

Return value. Returns this object if this curve already uses an arc length parameterization. (Type: <a href="Curve.md">Curve</a>)

#### Examples

The following example uses the arc-length
parameterization to generate, uniformly at random, a point that lies anywhere
on a curve.

    var arclen = curve.toArcLengthParam();
    var point = arclen.evaluate(Math.random()*arclen.getLength())

<a name='PiecewiseCurve_velocity'></a>
### PiecewiseCurve#velocity(u)

Finds an approximate velocity vector at the given U coordinate of this curve.

#### Parameters

* `u` (Type: number)<br>U coordinate of a point on the curve.

#### Return Value

An array describing a velocity vector. It should have at least as many
elements as the number of dimensions of the underlying curve. (Type: Array.&lt;number>)

[Back to documentation index.](index.md)

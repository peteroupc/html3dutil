# H3DU.PiecewiseCurve

[Back to documentation index.](index.md)

<a name='H3DU.PiecewiseCurve'></a>
### new H3DU.PiecewiseCurve(curves)

**Augments:** Curve

A curve evaluator object for a curve
made up of one or more individual curves.

The combined curve's u-coordinates range from 0 to N,
where N is the number of curves. In this way, the integer
part of a u-coordinate indicates the curve the coordinate
refers to. For example, if there are four curves, coordinates
from 0, but less than 1, belong to the first curve, and coordinates
from 1, but less than 2, belong to the second curve. The u-coordinate equal to N refers to the end of the last curve in
the piecewise curve.

#### Parameters

* `curves` (Type: Array.&lt;Object>)<br>An array of curve evaluator objects, such as an instance of Curve or one of its subclasses. The combined curve should be continuous in that the curves that make it up should connect at their end points (except the curve need not be closed).

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

* [arcLength](#H3DU.PiecewiseCurve_arcLength)<br>Finds an approximate arc length (distance) between the start of this
curve and the point at the given u-coordinate of this curve.
* [endPoints](#H3DU.PiecewiseCurve_endPoints)<br>Returns the starting and ending u-coordinates of this curve.
* [evaluate](#H3DU.PiecewiseCurve_evaluate)<br>Finds the position of this curve at the given u-coordinate.
* [fromCatmullRomSpline](#H3DU.PiecewiseCurve.fromCatmullRomSpline)<br>Creates a piecewise curve made up of B-spline curves from the control points of a
cubic Catmull&ndash;Rom spline.
* [fromEllipseArc](#H3DU.PiecewiseCurve.fromEllipseArc)<br>TODO: Not documented yet.
* [fromHermiteSpline](#H3DU.PiecewiseCurve.fromHermiteSpline)<br>Creates a piecewise curve made up of B-spline curves from the control points of a
Hermite spline.
* [fromTCBSpline](#H3DU.PiecewiseCurve.fromTCBSpline)<br>Creates a piecewise curve made up of B-spline curves from the control points of a
cubic TCB spline (tension/continuity/bias spline, also known as Kochanek&ndash;Bartels spline).
* [getCurves](#H3DU.PiecewiseCurve_getCurves)<br>Gets a reference to the curves that make up this piecewise curve.
* [velocity](#H3DU.PiecewiseCurve_velocity)<br>Finds an approximate velocity vector at the given u-coordinate of this curve.

<a name='H3DU.PiecewiseCurve_arcLength'></a>
### H3DU.PiecewiseCurve#arcLength(u)

Finds an approximate arc length (distance) between the start of this
curve and the point at the given u-coordinate of this curve.

#### Parameters

* `u` (Type: number)<br>u-coordinate of a point on the curve.

#### Return Value

The approximate arc length of this curve at the given u-coordinate. (Type: number)

<a name='H3DU.PiecewiseCurve_endPoints'></a>
### H3DU.PiecewiseCurve#endPoints()

Returns the starting and ending u-coordinates of this curve.

#### Return Value

A two-element array. The first element is the starting coordinate of
the curve, and the second is its ending coordinate.
Returns <code>[0, n]</code>, where <code>n</code> is the number
of curves that make up this piecewise curve.

<a name='H3DU.PiecewiseCurve_evaluate'></a>
### H3DU.PiecewiseCurve#evaluate(u)

Finds the position of this curve at the given u-coordinate.

#### Parameters

* `u` (Type: number)<br>u-coordinate of a point on the curve.

#### Return Value

An array describing a position. It should have at least as many
elements as the number of dimensions of the underlying curve. (Type: Array.&lt;number>)

<a name='H3DU.PiecewiseCurve.fromCatmullRomSpline'></a>
### (static) H3DU.PiecewiseCurve.fromCatmullRomSpline(spline, [param], [closed])

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

A piecewise curve made up of cubic B-spline curves describing the same path as the Catmull&ndash;Rom spline. (Type: PiecewiseCurve)

<a name='H3DU.PiecewiseCurve.fromEllipseArc'></a>
### (static) H3DU.PiecewiseCurve.fromEllipseArc(x, y, radiusX, radiusY, start, sweep)

TODO: Not documented yet.

#### Parameters

* `x` (Type: number)
* `y` (Type: number)
* `radiusX` (Type: number)
* `radiusY` (Type: number)
* `start` (Type: number)
* `sweep` (Type: number)

#### Return Value

Return value. (Type: PiecewiseCurve)

<a name='H3DU.PiecewiseCurve.fromHermiteSpline'></a>
### (static) H3DU.PiecewiseCurve.fromHermiteSpline(spline)

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
same path as the Hermite spline. (Type: PiecewiseCurve)

<a name='H3DU.PiecewiseCurve.fromTCBSpline'></a>
### (static) H3DU.PiecewiseCurve.fromTCBSpline(spline, [tension], [continuity], [bias], [closed], [rigidEnds])

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
same path as the TCB spline. (Type: PiecewiseCurve)

<a name='H3DU.PiecewiseCurve_getCurves'></a>
### H3DU.PiecewiseCurve#getCurves()

Gets a reference to the curves that make up this piecewise curve.

#### Return Value

The curves that make up this piecewise curve. (Type: Array.&lt;Curve>)

<a name='H3DU.PiecewiseCurve_velocity'></a>
### H3DU.PiecewiseCurve#velocity(u)

Finds an approximate velocity vector at the given u-coordinate of this curve.

#### Parameters

* `u` (Type: number)<br>u-coordinate of a point on the curve.

#### Return Value

An array describing a velocity vector. It should have at least as many
elements as the number of dimensions of the underlying curve. (Type: Array.&lt;number>)

[Back to documentation index.](index.md)

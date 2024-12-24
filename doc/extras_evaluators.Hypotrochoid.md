# module:extras/evaluators.Hypotrochoid

[Back to documentation index.](index.md)

<a name='extras_evaluators.Hypotrochoid'></a>
### new module:extras/evaluators.Hypotrochoid(outerRadius, innerRadius, distFromInnerCenter, [rotationDegrees])

**Augments:** Curve

A curve evaluator object for a curve drawn by a circle that rolls along the inside
of another circle, whose position is fixed, with a center of (0,0).

The following curves can be generated with this class (in the following
descriptions, O = <code>outerRadius</code>, R means <code>innerRadius</code>,
and D = <code>distFromInnerCenter</code>).<ul>
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

#### Parameters

* `outerRadius` (Type: number)<br>Radius of the circle whose position is fixed.
* `innerRadius` (Type: number)<br>Radius of the rolling circle. A hypocycloid results when distFromInnerCenter=innerRadius.
* `distFromInnerCenter` (Type: number)<br>Distance from the center of the rolling circle to the drawing pen.
* `rotationDegrees` (Type: number) (optional)<br>Starting angle of the curve from the positive x-axis toward the positive y-axis, in degrees. Default is 0.

### Methods

* [arcLength](#extras_evaluators_Hypotrochoid_arcLength)<br>Finds an approximate arc length (distance) between the start of this
curve and the point at the given u-coordinate of this curve.
* [endPoints](#extras_evaluators_Hypotrochoid_endPoints)<br>Gets the endpoints of this curve.
* [evaluate](#extras_evaluators_Hypotrochoid_evaluate)<br>Finds the coordinates of a point on the curve from the given u-coordinate.
* [rose](#extras_evaluators_Hypotrochoid.rose)<br>Creates a curve evaluator object for a rose, a special
form of hypotrochoid.
* [scaleTo](#extras_evaluators_Hypotrochoid_scaleTo)<br>Creates a modified version of this curve so that it
fits the given radius.

<a name='extras_evaluators_Hypotrochoid_arcLength'></a>
### module:extras/evaluators~Hypotrochoid#arcLength(u)

Finds an approximate arc length (distance) between the start of this
curve and the point at the given u-coordinate of this curve.

#### Parameters

* `u` (Type: number)<br>u-coordinate of a point on the curve.

#### Return Value

The approximate arc length of this curve at the given u-coordinate. (Type: Array.&lt;number>)

<a name='extras_evaluators_Hypotrochoid_endPoints'></a>
### module:extras/evaluators~Hypotrochoid#endPoints()

Gets the endpoints of this curve.
For this curve evaluator object, the curve
starts at 0 and ends at &pi;\*2.

#### Return Value

An array containing the two
endpoints of the curve. The first number is the start of the curve,
and the second number is the end of the curve. (Type: Array.&lt;number>)

<a name='extras_evaluators_Hypotrochoid_evaluate'></a>
### module:extras/evaluators~Hypotrochoid#evaluate(u)

Finds the coordinates of a point on the curve from the given u-coordinate.

#### Parameters

* `u` (Type: number)<br>u-coordinate.

#### Return Value

A 3-element array specifying a 3D point.
Only the x- and y-coordinates can be other than 0. (Type: Array.&lt;number>)

<a name='extras_evaluators_Hypotrochoid.rose'></a>
### (static) module:extras/evaluators~Hypotrochoid.rose(n, distFromInnerCenter, [rotationDegrees])

Creates a curve evaluator object for a rose, a special
form of hypotrochoid.

#### Parameters

* `n` (Type: number)<br>Parameter that determines the petal form of the rose. For example, the rose is symmetrical if this number is even.
* `distFromInnerCenter` (Type: number)<br>Distance from the center of the rolling circle to the drawing pen.
* `rotationDegrees` (Type: number) (optional)<br>Starting angle of the curve from the positive x-axis toward the positive y-axis, in degrees. Default is 0.

#### Return Value

The resulting curve evaluator object. (Type: Hypotrochoid)

<a name='extras_evaluators_Hypotrochoid_scaleTo'></a>
### module:extras/evaluators~Hypotrochoid#scaleTo(radius)

Creates a modified version of this curve so that it
fits the given radius.

#### Parameters

* `radius` (Type: number)<br>Desired radius of the curve.

#### Return Value

Return value. (Type: Hypotrochoid)

[Back to documentation index.](index.md)

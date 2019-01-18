# module:extras/evaluators.Roulette

[Back to documentation index.](index.md)

<a name='extras_evaluators.Roulette'></a>
### new module:extras/evaluators.Roulette(rollingCurve, fixedCurve, polePoint, [revolutions])

**Augments:** Curve

A curve evaluator object for a curve drawn by a curve that rolls along another curve whose position is fixed.

#### Parameters

* `rollingCurve` (Type: Object)<br>A curve evaluator object that describes the curve that rolls to generate the roulette curve. This curve is assumed to be a smooth closed curve such as a circle.
* `fixedCurve` (Type: Object)<br>A curve evaluator object that describes the curve on which the rolling curve will move. This curve is assumed to be smooth at every point; this includes periodic waves and circles. The curve evaluator object <i>should</i> support extrapolating curve positions outside its <code>endPoints()</code> range.
* `polePoint` (Type: Array.&lt;number>)<br>X and Y coordinates of a point, from the same coordinate system (reference frame) as <i>rollingCurve</i>, that will generate the roulette curve.
* `revolutions` (Type: number) (optional)<br>Number of complete rotations of the rolling curve to perform when generating the roulette curve; this will be reflected in this instance's <code>endPoints</code> method.

### Methods

* [hypotrochoid](#extras_evaluators_Roulette.hypotrochoid)<br>Creates a curve evaluator object for a <i>hypotrochoid</i>, a curve drawn by a circle that rolls along the inside
of another circle, whose position is fixed, with a center of (0,0).
* [rose](#extras_evaluators_Roulette.rose)<br>Creates a curve evaluator object for a rose, a special
form of hypotrochoid (roulette curve generated when one circle rolls
inside another fixed circle).
* [trochoid](#extras_evaluators_Roulette.trochoid)<br>Creates a curve evaluator object for a <i>trochoid</i>, a curve drawn by a circle that rolls along the X axis.

<a name='extras_evaluators_Roulette.hypotrochoid'></a>
### (static) module:extras/evaluators~Roulette.hypotrochoid(outerRadius, innerRadius, distFromInnerCenter, [rotationDegrees])

Creates a curve evaluator object for a <i>hypotrochoid</i>, a curve drawn by a circle that rolls along the inside
of another circle, whose position is fixed, with a center of (0,0).

This is a special case of a roulette in which the fixed and rolling curves are circles, and the pole point is the starting point of a circle with the same center as the rolling circle.

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
* `rotationDegrees` (Type: number) (optional)<br>Starting angle of the curve from the positive X axis toward the positive Y axis, in degrees. Default is 0.

<a name='extras_evaluators_Roulette.rose'></a>
### (static) module:extras/evaluators~Roulette.rose(n, distFromInnerCenter, [rotationDegrees])

Creates a curve evaluator object for a rose, a special
form of hypotrochoid (roulette curve generated when one circle rolls
inside another fixed circle).

#### Parameters

* `n` (Type: number)<br>Parameter that determines the petal form of the rose. For example, the rose is symmetrical if this number is even.
* `distFromInnerCenter` (Type: number)<br>Distance from the center of the rolling circle to the drawing pen.
* `rotationDegrees` (Type: number) (optional)<br>Starting angle of the curve from the positive X axis toward the positive Y axis, in degrees. Default is 0.

#### Return Value

The resulting curve evaluator object. (Type: Roulette)

<a name='extras_evaluators_Roulette.trochoid'></a>
### (static) module:extras/evaluators~Roulette.trochoid(radius, distFromCenter)

Creates a curve evaluator object for a <i>trochoid</i>, a curve drawn by a circle that rolls along the X axis.

The following curves can be generated with this class (in the following
descriptions, R = <code>radius</code>
and D = <code>distFromCenter</code>).<ul>
<li>Cycloid: D = R (trochoid touching the X axis).</li>
<li>Curtate cycloid: D < R (trochoid not touching the X axis).</li>
<li>Prolate cycloid: D > R (trochoid crossing the X axis).</li></ul>

#### Parameters

* `radius` (Type: number)<br>Radius of the rolling circle.
* `distFromCenter` (Type: number)<br>Distance from the center of the rolling circle to the drawing pen.

[Back to documentation index.](index.md)

# module:extras/evaluators.Roulette

[Back to documentation index.](index.md)

<a name='extras_evaluators.Roulette'></a>
### new module:extras/evaluators.Roulette(rollingCurve, fixedCurve, polePoint, [revolutions])

TODO: Not documented yet.

#### Parameters

* `rollingCurve` (Type: Object)<br>A curve evaluator object that describes the curve that rolls to generate the roulette curve. This curve is assumed to be a smooth closed curve such as a circle.
* `fixedCurve` (Type: Object)<br>A curve evaluator object that describes the curve on which the rolling curve will move. This curve is assumed to be repeating (periodic) and smooth at every point; this includes periodic waves and circles.
* `polePoint` (Type: Array.&lt;number>)<br>X and Y coordinates of a point, from the same coordinate system (reference frame) as <i>rollingCurve</i>, that will generate the roulette curve.
* `revolutions` (Type: number) (optional)<br>TODO: Not documented yet.

[Back to documentation index.](index.md)

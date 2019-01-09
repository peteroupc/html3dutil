# Hypotrochoid

[Back to documentation index.](index.md)

<a name='Hypotrochoid'></a>
### Hypotrochoid(outerRadius, innerRadius, distFromInnerCenter, [rotationDegrees])

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

This class is considered a supplementary class to the
Public Domain HTML 3D Library and is not considered part of that
library.

To use this class, you must include the script "extras/evaluators.js"; the
class is not included in the "h3du_min.js" file which makes up
the HTML 3D Library. Example:

    <script type="text/javascript" src="extras/evaluators.js"></script>

#### Parameters

* `outerRadius` (Type: number)<br>Radius of the circle whose position is fixed.
* `innerRadius` (Type: number)<br>Radius of the rolling circle. A hypocycloid results when distFromInnerCenter=innerRadius.
* `distFromInnerCenter` (Type: number)<br>Distance from the center of the rolling circle to the drawing pen.
* `rotationDegrees` (Type: number) (optional)<br>Starting angle of the curve from the positive X axis toward the positive Y axis, in degrees. Default is 0.

### Methods

* [arcLength](#Hypotrochoid_arcLength)<br>Finds an approximate arc length (distance) between the start of this
curve and the point at the given U coordinate of this curve.
* [endPoints](#Hypotrochoid_endPoints)<br>Gets the endpoints of this curve.
* [evaluate](#Hypotrochoid_evaluate)<br>Finds the coordinates of a point on the curve from the given U coordinate.
* [rose](#Hypotrochoid.rose)<br>Creates a curve evaluator object for a rose, a special
form of hypotrochoid.
* [scaleTo](#Hypotrochoid_scaleTo)<br>Creates a modified version of this curve so that it
fits the given radius.

<a name='Hypotrochoid_arcLength'></a>
### Hypotrochoid#arcLength(u)

Finds an approximate arc length (distance) between the start of this
curve and the point at the given U coordinate of this curve.

#### Parameters

* `u` (Type: number)<br>U coordinate of a point on the curve.

#### Return Value

The approximate arc length of this curve at the given U coordinate. (Type: Array.&lt;number>)

<a name='Hypotrochoid_endPoints'></a>
### Hypotrochoid#endPoints()

Gets the endpoints of this curve.
For this curve evaluator object, the curve
starts at 0 and ends at &pi;\*2.

#### Return Value

An array containing the two
endpoints of the curve. The first number is the start of the curve,
and the second number is the end of the curve. (Type: Array.&lt;number>)

<a name='Hypotrochoid_evaluate'></a>
### Hypotrochoid#evaluate(u)

Finds the coordinates of a point on the curve from the given U coordinate.

#### Parameters

* `u` (Type: number)<br>U coordinate.

#### Return Value

A 3-element array specifying a 3D point.
Only the X and Y coordinates can be other than 0. (Type: Array.&lt;number>)

<a name='Hypotrochoid.rose'></a>
### (static) Hypotrochoid.rose(n, distFromInnerCenter, [rotationDegrees])

Creates a curve evaluator object for a rose, a special
form of hypotrochoid.

#### Parameters

* `n` (Type: number)<br>Parameter that determines the petal form of the rose. For example, the rose is symmetrical if this number is even.
* `distFromInnerCenter` (Type: number)<br>Distance from the center of the rolling circle to the drawing pen.
* `rotationDegrees` (Type: number) (optional)<br>Starting angle of the curve from the positive X axis toward the positive Y axis, in degrees. Default is 0.

#### Return Value

The resulting curve evaluator object. (Type: <a href="Hypotrochoid.md">Hypotrochoid</a>)

<a name='Hypotrochoid_scaleTo'></a>
### Hypotrochoid#scaleTo(radius)

Creates a modified version of this curve so that it
fits the given radius.

#### Parameters

* `radius` (Type: number)<br>Desired radius of the curve.

#### Return Value

Return value. (Type: <a href="Hypotrochoid.md">Hypotrochoid</a>)

[Back to documentation index.](index.md)

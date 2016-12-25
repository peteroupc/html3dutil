# Hypotrochoid

[Back to documentation index.](index.md)

### Hypotrochoid(outerRadius, innerRadius, distFromInnerCenter) <a id='Hypotrochoid'></a>

Parametric evaluator for a
curve drawn by a circle that rolls along the inside
of another circle, whose position is fixed with a center of (0,0).

This class is considered a supplementary class to the
Public Domain HTML 3D Library and is not considered part of that
library.

To use this class, you must include the script "extras/evaluators.js"; the
class is not included in the "h3du_min.js" file which makes up
the HTML 3D Library. Example:

    &lt;script type="text/javascript" src="extras/evaluators.js">&lt;/script>

#### Parameters

* `outerRadius` (Type: Number)<br>
    Radius of the circle whose position is fixed.
* `innerRadius` (Type: Number)<br>
    Radius of the rolling circle. A hypocycloid results when outerRadius=innerRadius.
* `distFromInnerCenter` (Type: Number)<br>
    Distance from the center of the rolling circle to the drawing pen.. A prolate hypotrochoid results when distFromInnerCenter is greater than innerRadius.

### Methods

* [evaluate](#Hypotrochoid_evaluate)
* [scaleTo](#Hypotrochoid_scaleTo)

### Hypotrochoid#evaluate(u) <a id='Hypotrochoid_evaluate'></a>

Generates a point on the curve from the given u coordinate.

#### Parameters

* `u` (Type: Number)<br>
    U coordinate.

#### Return Value

A 3-element array specifying a 3D point.
Only the X and Y coordinates will be other than 0. (Type: Array.&lt;Number>)

### Hypotrochoid#scaleTo(radius) <a id='Hypotrochoid_scaleTo'></a>

Creates a modified version of this curve so that it
fits the given radius.

#### Parameters

* `radius` (Type: Number)<br>
    Desired radius of the curve.

#### Return Value

Return value. (Type: <a href="Hypotrochoid.md">Hypotrochoid</a>)

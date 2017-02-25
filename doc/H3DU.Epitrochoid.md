# H3DU.Epitrochoid

[Back to documentation index.](index.md)

 <a name='H3DU.Epitrochoid'></a>
### H3DU.Epitrochoid(outerRadius, innerRadius, distFromInnerCenter)

A curve evaluator object for a curve drawn by a circle that rolls along the outside
of another circle, whose position is fixed, with a center of (0,0).

This class is considered a supplementary class to the
Public Domain HTML 3D Library and is not considered part of that
library.

To use this class, you must include the script "extras/evaluators.js"; the
class is not included in the "h3du_min.js" file which makes up
the HTML 3D Library. Example:

    <script type="text/javascript" src="extras/evaluators.js"></script>

#### Parameters

* `outerRadius` (Type: Number)<br>
    Radius of the circle whose position is fixed.
* `innerRadius` (Type: Number)<br>
    Radius of the rolling circle. An epicycloid results when outerRadius=innerRadius.
* `distFromInnerCenter` (Type: Number)<br>
    Distance from the center of the rolling circle to the drawing pen. A prolate epitrochoid results when distFromInnerCenter is greater than innerRadius.

### Methods

* [evaluate](#H3DU.Epitrochoid_evaluate)<br>Generates a point on the curve from the given U coordinate.
* [scaleTo](#H3DU.Epitrochoid_scaleTo)<br>Creates a modified version of this curve so that it
fits the given radius.

 <a name='H3DU.Epitrochoid_evaluate'></a>
### H3DU.Epitrochoid#evaluate(u)

Generates a point on the curve from the given U coordinate.

#### Parameters

* `u` (Type: Number)<br>
    U coordinate.

#### Return Value

A 3-element array specifying a 3D point.
Only the X and Y coordinates will be other than 0. (Type: Array.&lt;Number>)

 <a name='H3DU.Epitrochoid_scaleTo'></a>
### H3DU.Epitrochoid#scaleTo(radius)

Creates a modified version of this curve so that it
fits the given radius.

#### Parameters

* `radius` (Type: Number)<br>
    Desired radius of the curve.

#### Return Value

Return value. (Type: <a href="H3DU.Epitrochoid.md">H3DU.Epitrochoid</a>)

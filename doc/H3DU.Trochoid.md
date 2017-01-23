# H3DU.Trochoid

[Back to documentation index.](index.md)

 <a name='H3DU.Trochoid'></a>
### H3DU.Trochoid(radius, distFromCenter)

Parametric evaluator for a
curve drawn by a circle that rolls along the X axis.

This class is considered a supplementary class to the
Public Domain HTML 3D Library and is not considered part of that
library.

To use this class, you must include the script "extras/evaluators.js"; the
class is not included in the "h3du_min.js" file which makes up
the HTML 3D Library. Example:

    <script type="text/javascript" src="extras/evaluators.js"></script>

#### Parameters

* `radius` (Type: Number)<br>
    Radius of the rolling circle.
* `distFromCenter` (Type: Number)<br>
    Distance from the center of the rolling circle to the drawing pen.

### Methods

* [evaluate](#H3DU.Trochoid_evaluate)<br>Generates a point on the curve from the given u coordinate.

 <a name='H3DU.Trochoid_evaluate'></a>
### H3DU.Trochoid#evaluate(u)

Generates a point on the curve from the given u coordinate.

#### Parameters

* `u` (Type: Number)<br>
    U coordinate.

#### Return Value

A 3-element array specifying a 3D point.
Only the X and Y coordinates will be other than 0. (Type: Array.&lt;Number>)

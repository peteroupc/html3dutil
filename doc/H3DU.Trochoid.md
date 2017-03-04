# H3DU.Trochoid

[Back to documentation index.](index.md)

 <a name='H3DU.Trochoid'></a>
### H3DU.Trochoid(radius, distFromCenter)

A <a href="H3DU.CurveEval.md#H3DU.CurveEval_vertex">curve evaluator object</a> for a curve drawn by a circle that rolls along the X axis.

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

* [endPoints](#H3DU.Trochoid_endPoints)<br>Gets the endpoints of this curve.
* [evaluate](#H3DU.Trochoid_evaluate)<br>Generates a point on the curve from the given U coordinate.

 <a name='H3DU.Trochoid_endPoints'></a>
### H3DU.Trochoid#endPoints()

Gets the endpoints of this curve.
For this curve evaluator object, the curve
starts at 0 and ends at &pi;\*2.

#### Return Value

An array containing the two
endpoints of the curve. The first number is the start of the curve,
and the second number is the end of the curve. (Type: Array.&lt;Number>)

 <a name='H3DU.Trochoid_evaluate'></a>
### H3DU.Trochoid#evaluate(u)

Generates a point on the curve from the given U coordinate.

#### Parameters

* `u` (Type: Number)<br>
    U coordinate.

#### Return Value

A 3-element array specifying a 3D point.
Only the X and Y coordinates will be other than 0. (Type: Array.&lt;Number>)

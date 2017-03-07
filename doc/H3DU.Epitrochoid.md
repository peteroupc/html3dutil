# H3DU.Epitrochoid

[Back to documentation index.](index.md)

 <a name='H3DU.Epitrochoid'></a>
### H3DU.Epitrochoid(outerRadius, rollerRadius, distFromRollerCenter, [phaseInDegree])

A <a href="H3DU.CurveEval.md#H3DU.CurveEval_vertex">curve evaluator object</a> for a curve drawn by a circle that rolls along the outside
of another circle, whose position is fixed, with a center of (0,0).
The rolling circle will start at the positive X axis of the fixed circle.

The following curves can be generated with this class (in the following
descriptions, O = <code>outerRadius</code>, R means <code>rollerRadius</code>,
and D = <code>distFromRollerCenter</code>).<ul>
<li>Epicycloid: D = R.</li>
<li>Curtate epicycloid: D < R.</li>
<li>Prolate epicycloid: D > R.</li>
<li>Cardioid: R = O; D = O.</li>
<li>Nephroid: R = O/2; D = O/2.</li>
<li>Ranunculoid: R = O/5; D = O/5.</li>
<li>N-cusped epicycloid: R = O/N; D = O/N.</li>
<li>Circle: O = 0; the radius will be R - D.</li>
<li>Epicycloid: R = D.</li></ul>

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
* `rollerRadius` (Type: Number)<br>
    Radius of the rolling circle. An epicycloid results when distFromRollerCenter=rollerRadius.
* `distFromRollerCenter` (Type: Number)<br>
    Distance from the center of the rolling circle to the drawing pen.
* `phaseInDegree` (Type: Number) (optional)<br>
    Rotation angle of the curve, in degrees. Default is 0.

### Methods

* [endPoints](#H3DU.Epitrochoid_endPoints)<br>Gets the endpoints of this curve.
* [evaluate](#H3DU.Epitrochoid_evaluate)<br>Generates a point on the curve from the given U coordinate.
* [scaleTo](#H3DU.Epitrochoid_scaleTo)<br>Creates a modified version of this curve so that it
fits the given radius.

 <a name='H3DU.Epitrochoid_endPoints'></a>
### H3DU.Epitrochoid#endPoints()

Gets the endpoints of this curve.
For this curve evaluator object, the curve
starts at 0 and ends at &pi;\*2.

#### Return Value

An array containing the two
endpoints of the curve. The first number is the start of the curve,
and the second number is the end of the curve. (Type: Array.&lt;Number>)

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

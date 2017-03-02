# H3DU.CurveTube

[Back to documentation index.](index.md)

 <a name='H3DU.CurveTube'></a>
### H3DU.CurveTube(func, [thickness], [sweptCurve])

A <a href="H3DU.SurfaceEval.md#H3DU.SurfaceEval_vertex">surface evaluator object</a> for a tube extruded from a parametric curve.

This class is considered a supplementary class to the
Public Domain HTML 3D Library and is not considered part of that
library.

To use this class, you must include the script "extras/curvetube.js"; the
class is not included in the "h3du_min.js" file which makes up
the HTML 3D Library. Example:

    <script type="text/javascript" src="extras/curvetube.js"></script>

#### Parameters

* `func` (Type: Object)<br>
    A <a href="H3DU.CurveEval.md#H3DU.CurveEval_vertex">curve evaluator object</a> that describes the 3-dimensional curve to extrude a tube from.
* `thickness` (Type: Number) (optional)<br>
    Radius of the extruded tube. If this parameter is null or omitted, the default is 0.125.
* `sweptCurve` (Type: Object) (optional)<br>
    A <a href="H3DU.CurveEval.md#H3DU.CurveEval_vertex">curve evaluator object</a> that describes a two-dimensional curve to serve as the cross section of the extruded shape. The curve need not be closed. If this parameter is null or omitted, uses a circular cross section in which the V coordinate ranges from 0 through 1. The cross section will generally have a radius of 1 unit; bigger or smaller cross sections will affect the meaning of the "thickness" parameter.

### Methods

* [endpoints](#H3DU.CurveTube_endpoints)<br>TODO: Not documented yet.
* [evaluate](#H3DU.CurveTube_evaluate)<br>Generates a point on the extruded tube from the given u and V coordinates.

 <a name='H3DU.CurveTube_endpoints'></a>
### H3DU.CurveTube#endpoints()

TODO: Not documented yet.

#### Return Value

Return value. (Type: *)

 <a name='H3DU.CurveTube_evaluate'></a>
### H3DU.CurveTube#evaluate(u, v)

Generates a point on the extruded tube from the given u and V coordinates.

#### Parameters

* `u` (Type: Number)<br>
    U coordinate. This will run the length of the curve.
* `v` (Type: Number)<br>
    V coordinate. This will sweep around the extruded tube.

#### Return Value

A 3-element array specifying a 3D point. (Type: Array.&lt;Number>)

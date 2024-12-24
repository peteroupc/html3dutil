# H3DU.CurveTube

[Back to documentation index.](index.md)

<a name='H3DU.CurveTube'></a>
### new H3DU.CurveTube(func, [thickness], [sweptCurve])

A <a href="H3DU.Surface.md">surface evaluator object</a> for a tube extruded from a parametric curve.

This class is considered a supplementary class to the
Public Domain HTML 3D Library and is not considered part of that
library.

#### Parameters

* `func` (Type: Object)<br>A <a href="H3DU.Curve.md">curve evaluator object</a> that describes the 3-dimensional curve to extrude a tube from. For best results, the curve should be continuous and smooth.
* `thickness` (Type: number) (optional)<br>Radius of the extruded tube. If this parameter is null, undefined, or omitted, the default is 0.125.
* `sweptCurve` (Type: Object) (optional)<br>A <a href="H3DU.Curve.md">curve evaluator object</a> that describes a two-dimensional curve to serve as the cross section of the extruded shape. The curve need not be closed. If this parameter is null, undefined, or omitted, uses a circular cross section in which the v-coordinate ranges from 0 through 1. The cross section will generally have a radius of 1 unit; bigger or smaller cross sections will affect the meaning of the "thickness" parameter.

[Back to documentation index.](index.md)

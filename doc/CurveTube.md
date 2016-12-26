# CurveTube

[Back to documentation index.](index.md)

### CurveTube(func, [thickness], [sweptCurve]) <a id='CurveTube'></a>

Evaluator for a parametric surface in the form
of a tube extruded from a parametric curve.

This class is considered a supplementary class to the
Public Domain HTML 3D Library and is not considered part of that
library.

To use this class, you must include the script "extras/curvetube.js"; the
class is not included in the "h3du_min.js" file which makes up
the HTML 3D Library. Example:

    <script type="text/javascript" src="extras/curvetube.js"></script>

#### Parameters

* `func` (Type: Object)<br>
    An object that must contain a function named "evaluate", which takes the following parameter:<ul> <li><code>u</code> - A curve coordinate, generally from 0 to 1. </ul> The evaluator function returns a 3-element array: the first element is the X coordinate of the curve's position, the second element is the Y coordinate, and the third is the Z coordinate.
* `thickness` (Type: Number) (optional)<br>
    Radius of the extruded tube. If this parameter is null or omitted, the default is 0.125.
* `sweptCurve` (Type: Object) (optional)<br>
    Object describing a two-dimensional curve to serve as the cross section of the extruded shape, corresponding to the V coordinate of the CurveTube's "evaluate" method. If this parameter is null or omitted, uses a circular cross section in which the V coordinate ranges from 0 through 1. The curve object must contain a function named "evaluate", with the same meaning as for the "func" parameter, except the third element, if any, of the return value is ignored.

 The curve need not be closed.

 The cross section will generally have a radius of 1 unit; bigger or smaller cross sections will affect the meaning of the "thickness" parameter.

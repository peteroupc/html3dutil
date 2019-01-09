# H3DU.exports.SurfaceOfRevolution

[Back to documentation index.](index.md)

<a name='H3DU.exports.SurfaceOfRevolution'></a>
### H3DU.exports.SurfaceOfRevolution(curve, minval, maxval, [axis])

A surface evaluator object for a surface of revolution,
which results by revolving a two-dimensional curve around an axis.

This class is considered a supplementary class to the
Public Domain HTML 3D Library and is not considered part of that
library.

#### Parameters

* `curve` (Type: Object)<br>A curve evaluator object that describes a 2-dimensional curve to rotate about the axis of rotation, as specified in the "axis" parameter. The curve's X coordinates correspond to elevation, and its Y coordinates correspond to radius.

 If the curve function draws a curve that goes both above and below the axis of rotation, such as a circle or ellipse, the V coordinates given in _minval_ and _maxval_ must restrict the curve definition to no more than half of the curve.
* `minval` (Type: number)<br>Smallest V coordinate.
* `maxval` (Type: number)<br>Largest V coordinate. If _minval_ is greater than _maxval_, both values will be swapped.
* `axis` (Type: Array.&lt;number>) (optional)<br>Axis of rotation, around which the curve will be rotated to generate the surface of revolution. If null, undefined, or omitted, the positive Z axis (0, 0, 1) will be the axis of rotation. This parameter is a 3-element array describing the X, Y, and Z coordinates, respectively, of a 3D point. The axis of rotation will run in the direction from the origin to the point given in this parameter. This parameter need not be a <a href="tutorial-glmath.md">unit vector</a>.

[Back to documentation index.](index.md)

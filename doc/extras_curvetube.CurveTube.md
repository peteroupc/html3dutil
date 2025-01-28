# module:extras/curvetube.CurveTube

[Back to documentation index.](index.md)

<a name='extras_curvetube.CurveTube'></a>
### new module:extras/curvetube.CurveTube(func, [thickness], [sweptCurve])

A <a href="Surface.md">surface evaluator object</a> for a tube extruded from a parametric curve.

This class is considered a supplementary class to the
Public Domain HTML 3D Library and is not considered part of that
library.

#### Parameters

* `func` (Type: Object)<br>A <a href="Curve.md">curve evaluator object</a> that describes the 3-dimensional curve to extrude a tube from. For best results, the curve should be continuous and smooth.
* `thickness` (Type: number) (optional)<br>Radius of the extruded tube. If this parameter is null, undefined, or omitted, the default is 0.125.
* `sweptCurve` (Type: Object) (optional)<br>A <a href="Curve.md">curve evaluator object</a> that describes a two-dimensional curve to serve as the cross section of the extruded shape. The curve need not be closed. If this parameter is null, undefined, or omitted, uses a circular cross section in which the v-coordinate ranges from 0 through 1. The cross section will generally have a radius of 1 unit; bigger or smaller cross sections will affect the meaning of the "thickness" parameter.

### Methods

* [endPoints](#extras_curvetube_CurveTube_endPoints)<br>Returns the starting and ending u- and v-coordinates of this surface.
* [evaluate](#extras_curvetube_CurveTube_evaluate)<br>Generates a point on the extruded tube from the specified u- and v-coordinates.

<a name='extras_curvetube_CurveTube_endPoints'></a>
### module:extras/curvetube~CurveTube#endPoints()

Returns the starting and ending u- and v-coordinates of this surface.

#### Return Value

A four-element array. The first and second
elements are the starting and ending u-coordinates, respectively, of the surface, and the third
and fourth elements are its starting and ending v-coordinates.
The starting and ending u-coordinates will be the extruded curve's end points (or <code>[0, 1]</code>
if it doesn't implement an <code>endPoints</code> method).
The starting and ending v-coordinates are <code>[0, &pi;]</code> by default, but if a cross
section curve is defined, those v-coordinates will be that curve's end points (or <code>[0, 1]</code>
if it doesn't implement an <code>endPoints</code> method).

<a name='extras_curvetube_CurveTube_evaluate'></a>
### module:extras/curvetube~CurveTube#evaluate(u, v)

Generates a point on the extruded tube from the specified u- and v-coordinates.

#### Parameters

* `u` (Type: number)<br>The u-coordinate. This will run the length of the curve.
* `v` (Type: number)<br>The v-coordinate. This will sweep around the extruded tube.

#### Return Value

A 3-element array specifying a 3D point. (Type: Array.&lt;number>)

[Back to documentation index.](index.md)

# H3DU.CurveEval

[Back to documentation index.](index.md)

### H3DU.CurveEval() <a id='H3DU.CurveEval'></a>

An evaluator of parametric curve functions for generating
vertex positions and colors of a curve.

A parametric curve is a curve whose points are based on a
parametric curve function. A curve function takes a number
(U) and returns a point (in 1, 2, 3 or more dimensions, but
usually 2 or 3) that lies on the curve. For example, in 3
dimensions, a curve function has the following form:

<b>F</b>(u) = [ x(u), y(u), z(u) ]

where x(u) returns an X coordinate, y(u) a Y coordinate,
and z(u) returns a Z coordinate.

For more information, see the <a href="tutorial-surfaces.md">Parametric Curves and Parametric Surfaces</a> tutorial.

### Methods

* [color](#H3DU.CurveEval_H3DU.CurveEval_color)
* [evalCurve](#H3DU.CurveEval_H3DU.CurveEval_evalCurve)
* [evalOne](#H3DU.CurveEval_H3DU.CurveEval_evalOne)
* [normal](#H3DU.CurveEval_H3DU.CurveEval_normal)
* [texCoord](#H3DU.CurveEval_H3DU.CurveEval_texCoord)
* [vertex](#H3DU.CurveEval_H3DU.CurveEval_vertex)

### H3DU.CurveEval#color(evaluator) <a id='H3DU.CurveEval_H3DU.CurveEval_color'></a>

Specifies a parametric curve function for generating color values.

#### Parameters

* `evaluator` (Type: Object)<br>
    An object that must contain a function named "evaluate", giving 3 values as a result. See H3DU.CurveEval#vertex. </ul>

#### Return Value

This object. (Type: <a href="H3DU.CurveEval.md">H3DU.CurveEval</a>)

### H3DU.CurveEval#evalCurve(mesh, [mode], [n], [u1], [u2]) <a id='H3DU.CurveEval_H3DU.CurveEval_evalCurve'></a>

Generates vertices and attribute values that follow a parametric curve
function.

#### Parameters

* `mesh` (Type: <a href="H3DU.Mesh.md">H3DU.Mesh</a>)<br>
    A geometric mesh where the vertices will be generated.
* `mode` (Type: Number) (optional)<br>
    If this value is H3DU.Mesh.LINES, or is null or omitted, generates a series of lines defining the curve. If this value is H3DU.Mesh.POINTS, generates a series of points along the curve. For any other value, this method has no effect.
* `n` (Type: Number) (optional)<br>
    Number of subdivisions of the curve to be drawn. May be omitted; default is 24.
* `u1` (Type: Number) (optional)<br>
    Starting point of the curve (within the range given in the <code>vector</code>, <code>normal</code>, <code>color</code>, and <code>texCoord</code> methods). May be omitted; default is 0.
* `u2` (Type: Number) (optional)<br>
    Ending point of the curve (within the range given in the <code>vector</code>, <code>normal</code>, <code>color</code>, and <code>texCoord</code> methods). May be omitted; default is 1.

#### Return Value

This object. (Type: <a href="H3DU.CurveEval.md">H3DU.CurveEval</a>)

### H3DU.CurveEval#evalOne(mesh, u) <a id='H3DU.CurveEval_H3DU.CurveEval_evalOne'></a>

Generates vertex positions and attributes based on a point
in a parametric curve.

#### Parameters

* `mesh` (Type: <a href="H3DU.Mesh.md">H3DU.Mesh</a>)<br>
    H3DU.Mesh where vertex positions and attributes will be generated. When this method returns, the current color, normal, and texture coordinates will be the same as they were before the method started.
* `u` (Type: Number)<br>
    Point of the curve to evaluate.

#### Return Value

This object. (Type: <a href="H3DU.CurveEval.md">H3DU.CurveEval</a>)

### H3DU.CurveEval#normal(evaluator) <a id='H3DU.CurveEval_H3DU.CurveEval_normal'></a>

<b>Deprecated: May be removed in the future; it makes little sense
to generate normals for a curve.</b>

Specifies a parametric curve function for generating normals.

#### Parameters

* `evaluator` (Type: Object)<br>
    An object that must contain a function named "evaluate", giving 3 values as a result. See H3DU.CurveEval#vertex. </ul>

#### Return Value

This object. (Type: <a href="H3DU.CurveEval.md">H3DU.CurveEval</a>)

### H3DU.CurveEval#texCoord(evaluator) <a id='H3DU.CurveEval_H3DU.CurveEval_texCoord'></a>

Specifies a parametric curve function for generating texture coordinates.

#### Parameters

* `evaluator` (Type: Object)<br>
    An object that must contain a function named "evaluate", giving one or two values as a result. See H3DU.CurveEval#vertex. </ul>

#### Return Value

This object. (Type: <a href="H3DU.CurveEval.md">H3DU.CurveEval</a>)

### H3DU.CurveEval#vertex(evaluator) <a id='H3DU.CurveEval_H3DU.CurveEval_vertex'></a>

Specifies a parametric curve function for generating vertex positions.

#### Parameters

* `evaluator` (Type: Object)<br>
    An object that must contain a function named "evaluate". It takes the following parameter:<ul> <li><code>u</code> - A curve coordinate, generally from 0 to 1. </ul> The evaluator function returns an array of the result of the evaluation.

#### Return Value

This object. (Type: <a href="H3DU.CurveEval.md">H3DU.CurveEval</a>)

#### Example

The following function sets a circle as the curve
to use for generating vertex positions.

    // "u" can range from 0 to 2\*Math.PI
    curveEval.vertex({"evaluate":function(u) {
    "use strict";
     return [Math.cos(u),Math.sin(u),0]
    }});

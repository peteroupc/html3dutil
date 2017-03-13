# H3DU.CurveEval

[Back to documentation index.](index.md)

<a name='H3DU.CurveEval'></a>
### H3DU.CurveEval()

An evaluator of curve evaluator objects for generating
vertex positions and colors of a curve.

For more information, see the <a href="tutorial-surfaces.md">Parametric Curves and Parametric Surfaces</a> tutorial.

### Methods

* [color](#H3DU.CurveEval_color)<br>Specifies a parametric curve function for generating color values.
* [evalCurve](#H3DU.CurveEval_evalCurve)<br>Generates vertices and attribute values that follow a parametric curve
function.
* [evalOne](#H3DU.CurveEval_evalOne)<br>Generates vertex positions and attributes based on a point
in a parametric curve.
* [normal](#H3DU.CurveEval_normal)<br><b>Deprecated: Use the "vertex" method instead.</b>
* [texCoord](#H3DU.CurveEval_texCoord)<br>Specifies a parametric curve function for generating texture coordinates.
* [vertex](#H3DU.CurveEval_vertex)<br>Specifies a curve evaluator object for generating the vertex positions of a parametric curve.

<a name='H3DU.CurveEval_color'></a>
### H3DU.CurveEval#color(evaluator)

Specifies a parametric curve function for generating color values.

#### Parameters

* `evaluator` (Type: Object)<br>An object that must contain a method named <code>evaluate</code> that takes a single U coordinate and returns a 3-element array.

#### Return Value

This object. (Type: <a href="H3DU.CurveEval.md">H3DU.CurveEval</a>)

<a name='H3DU.CurveEval_evalCurve'></a>
### H3DU.CurveEval#evalCurve(mesh, [mode], [n], [u1], [u2])

Generates vertices and attribute values that follow a parametric curve
function.

#### Parameters

* `mesh` (Type: <a href="H3DU.Mesh.md">H3DU.Mesh</a>)<br>A geometric mesh where the vertices will be generated.
* `mode` (Type: number) (optional)<br>If this value is H3DU.Mesh.LINES, or is null or omitted, generates a series of lines defining the curve. If this value is H3DU.Mesh.POINTS, generates a series of points along the curve. For any other value, this method has no effect.
* `n` (Type: number) (optional)<br>Number of subdivisions of the curve to be drawn. Default is 24.
* `u1` (Type: number) (optional)<br>Starting point of the curve. Default is the starting coordinate given by the <a href="H3DU.Curve.md">curve evaluator object</a>, or 0 if not given.
* `u2` (Type: number) (optional)<br>Ending point of the curve. Default is the ending coordinate given by the <a href="H3DU.Curve.md">curve evaluator object</a>, or 1 if not given.

#### Return Value

This object. (Type: <a href="H3DU.CurveEval.md">H3DU.CurveEval</a>)

<a name='H3DU.CurveEval_evalOne'></a>
### H3DU.CurveEval#evalOne(mesh, u)

Generates vertex positions and attributes based on a point
in a parametric curve.

#### Parameters

* `mesh` (Type: <a href="H3DU.Mesh.md">H3DU.Mesh</a>)<br>H3DU.Mesh where vertex positions and attributes will be generated. When this method returns, the current color, normal, and texture coordinates will be the same as they were before the method started.
* `u` (Type: number)<br>Point of the curve to evaluate.

#### Return Value

This object. (Type: <a href="H3DU.CurveEval.md">H3DU.CurveEval</a>)

<a name='H3DU.CurveEval_normal'></a>
### H3DU.CurveEval#normal(evaluator)

<b>Deprecated: Use the "vertex" method instead.</b>

Specifies a parametric curve function for generating normals.

#### Parameters

* `evaluator` (Type: Object)<br>An object that must contain a method named <code>evaluate</code> that takes a single U coordinate and returns a 3-element array.

#### Return Value

This object. (Type: <a href="H3DU.CurveEval.md">H3DU.CurveEval</a>)

<a name='H3DU.CurveEval_texCoord'></a>
### H3DU.CurveEval#texCoord(evaluator)

Specifies a parametric curve function for generating texture coordinates.

#### Parameters

* `evaluator` (Type: Object)<br>An object that must contain a method named <code>evaluate</code> that takes a single U coordinate and returns a 1- or 2-element array.

#### Return Value

This object. (Type: <a href="H3DU.CurveEval.md">H3DU.CurveEval</a>)

<a name='H3DU.CurveEval_vertex'></a>
### H3DU.CurveEval#vertex(evaluator)

Specifies a curve evaluator object for generating the vertex positions of a parametric curve.

#### Parameters

* `evaluator` (Type: <a href="H3DU.Curve.md">H3DU.Curve</a> | Object)<br>An object described in <a href="H3DU.Curve.md">H3DU.Curve</a>. Can be null, in which case, disables generating vertex positions.

#### Return Value

This object. (Type: <a href="H3DU.CurveEval.md">H3DU.CurveEval</a>)

[Back to documentation index.](index.md)

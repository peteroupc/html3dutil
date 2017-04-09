# H3DU.CurveBuilder

[Back to documentation index.](index.md)

<a name='H3DU.CurveBuilder'></a>
### H3DU.CurveBuilder()

An evaluator of curve evaluator objects for generating
vertex attributes for a curve.

For more information, see the <a href="tutorial-surfaces.md">Parametric Curves and Parametric Surfaces</a> tutorial.

### Methods

* [attribute](#H3DU.CurveBuilder_attribute)<br>TODO: Not documented yet.
* [clearVertices](#H3DU.CurveBuilder_clearVertices)<br>TODO: Not documented yet.
* [curveToBuffer](#H3DU.CurveBuilder.curveToBuffer)<br>TODO: Not documented yet.
* [evalCurve](#H3DU.CurveBuilder_evalCurve)<br>TODO: Not documented yet.
* [position](#H3DU.CurveBuilder_position)<br>TODO: Not documented yet.
* [toMeshBuffer](#H3DU.CurveBuilder_toMeshBuffer)<br>TODO: Not documented yet.

<a name='H3DU.CurveBuilder_attribute'></a>
### H3DU.CurveBuilder#attribute(curve, semantic, semanticIndex, size)

TODO: Not documented yet.

#### Parameters

* `curve` (Type: *)
* `semantic` (Type: *)
* `semanticIndex` (Type: *)
* `size` (Type: *)

#### Return Value

Return value. (Type: *)

<a name='H3DU.CurveBuilder_clearVertices'></a>
### H3DU.CurveBuilder#clearVertices()

TODO: Not documented yet.

#### Return Value

Return value. (Type: *)

<a name='H3DU.CurveBuilder.curveToBuffer'></a>
### (static) H3DU.CurveBuilder.curveToBuffer(curve, mode, n, u1, u2)

TODO: Not documented yet.

#### Parameters

* `curve` (Type: *)
* `mode` (Type: *)
* `n` (Type: *)
* `u1` (Type: *)
* `u2` (Type: *)

#### Return Value

Return value. (Type: *)

<a name='H3DU.CurveBuilder_evalCurve'></a>
### H3DU.CurveBuilder#evalCurve([mode], [n], [u1], [u2])

TODO: Not documented yet.

#### Parameters

* `mode` (Type: number) (optional)<br>If this value is <a href="H3DU.Mesh.md#H3DU.Mesh.LINES">H3DU.Mesh.LINES</a>, or is null or omitted, generates a series of lines defining the curve. If this value is <a href="H3DU.Mesh.md#H3DU.Mesh.POINTS">H3DU.Mesh.POINTS</a>, generates a series of points along the curve. For any other value, this method has no effect.
* `n` (Type: number) (optional)<br>Number of subdivisions of the curve to be drawn. Default is 24.
* `u1` (Type: number) (optional)<br>Starting point of the curve. Default is the starting coordinate given by the <a href="H3DU.Curve.md">curve evaluator object</a>, or 0 if not given.
* `u2` (Type: number) (optional)<br>Ending point of the curve. Default is the ending coordinate given by the <a href="H3DU.Curve.md">curve evaluator object</a>, or 1 if not given.

#### Return Value

This object. (Type: <a href="H3DU.CurveBuilder.md">H3DU.CurveBuilder</a>)

<a name='H3DU.CurveBuilder_position'></a>
### H3DU.CurveBuilder#position(curve, size)

TODO: Not documented yet.

#### Parameters

* `curve` (Type: *)
* `size` (Type: *)

#### Return Value

Return value. (Type: *)

<a name='H3DU.CurveBuilder_toMeshBuffer'></a>
### H3DU.CurveBuilder#toMeshBuffer()

TODO: Not documented yet.

#### Return Value

Return value. (Type: *)

[Back to documentation index.](index.md)

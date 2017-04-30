# H3DU.CurveBuilder

[Back to documentation index.](index.md)

<a name='H3DU.CurveBuilder'></a>
### H3DU.CurveBuilder()

An evaluator of curve evaluator objects for generating
vertex attributes for a curve.

For more information, see the <a href="tutorial-surfaces.md">Parametric Curves and Parametric Surfaces</a> tutorial.

### Methods

* [attribute](#H3DU.CurveBuilder_attribute)<br>Sets the parametric curve used to generate vertex attribute values.
* [clearVertices](#H3DU.CurveBuilder_clearVertices)<br>Clears the arrays of attribute values (such as positions and normals)
and vertex indices generated so far.
* [curveToBuffer](#H3DU.CurveBuilder.curveToBuffer)<br>Convenience method for creating a mesh buffer from a parametric
curve.
* [evalCurve](#H3DU.CurveBuilder_evalCurve)<br>Generates the vertex attributes of the parametric curves.
* [position](#H3DU.CurveBuilder_position)<br>Sets the parametric curve used to generate vertex positions.
* [toMeshBuffer](#H3DU.CurveBuilder_toMeshBuffer)<br>Generates a mesh buffer containing the vertex attributes
generated so far.

<a name='H3DU.CurveBuilder_attribute'></a>
### H3DU.CurveBuilder#attribute(curve, semantic, semanticIndex, [size])

Sets the parametric curve used to generate vertex attribute values.

#### Parameters

* `curve` (Type: Object)<br>A <a href="H3DU.Curve.md">curve evaluator object</a> that describes the parametric curve used to generate attribute.
* `semantic` (Type: number | string)<br>An attribute semantic, such as <a href="H3DU.Semantic.md#H3DU.Semantic.POSITION">H3DU.Semantic.POSITION</a>, "POSITION", or "TEXCOORD_0". Throws an error if this value is a string and the string is invalid.
* `semanticIndex` (Type: number)<br>The set index of the attribute for the given semantic. 0 is the first index of the attribute, 1 is the second, and so on. This is ignored if "name" is a string. If null or undefined, this value is 0.
* `size` (Type: number) (optional)<br>The number of elements in each position value. For example, if the attribute is 3-dimensional, this parameter is 3. If null, undefined, or omitted, the default is 3. Throws an error if this value is 0 or less.

#### Return Value

This object. (Type: <a href="H3DU.CurveBuilder.md">H3DU.CurveBuilder</a>)

<a name='H3DU.CurveBuilder_clearVertices'></a>
### H3DU.CurveBuilder#clearVertices()

Clears the arrays of attribute values (such as positions and normals)
and vertex indices generated so far. The attributes themselves will remain.

#### Return Value

This object. (Type: <a href="H3DU.CurveBuilder.md">H3DU.CurveBuilder</a>)

<a name='H3DU.CurveBuilder.curveToBuffer'></a>
### (static) H3DU.CurveBuilder.curveToBuffer(curve, [mode], [n], [u1], [u2])

Convenience method for creating a mesh buffer from a parametric
curve. The mesh buffer will contain positions and vertex normals that
cover the given surface.

#### Parameters

* `curve` (Type: Object)<br>A <a href="H3DU.Curve.md">curve evaluator object</a> that describes the parametric curve used to generate positions.
* `mode` (Type: number) (optional)<br>If this value is <a href="H3DU.Mesh.md#H3DU.Mesh.LINES">H3DU.Mesh.LINES</a>, or is null, undefined, or omitted, generates a series of lines defining the curve. If this value is <a href="H3DU.Mesh.md#H3DU.Mesh.POINTS">H3DU.Mesh.POINTS</a>, generates a series of points along the curve. For any other value, this method has no effect.
* `n` (Type: number) (optional)<br>Number of subdivisions of the curve to be drawn. Default is 24.
* `u1` (Type: number) (optional)<br>Starting point of the curve. Default is the starting coordinate given by the <a href="H3DU.Curve.md">curve evaluator object</a>, or 0 if not given.
* `u2` (Type: number) (optional)<br>Ending point of the curve. Default is the ending coordinate given by the <a href="H3DU.Curve.md">curve evaluator object</a>, or 1 if not given.

#### Return Value

The generated mesh buffer. (Type: <a href="H3DU.MeshBuffer.md">H3DU.MeshBuffer</a>)

<a name='H3DU.CurveBuilder_evalCurve'></a>
### H3DU.CurveBuilder#evalCurve([mode], [n], [u1], [u2])

Generates the vertex attributes of the parametric curves.

#### Parameters

* `mode` (Type: number) (optional)<br>If this value is <a href="H3DU.Mesh.md#H3DU.Mesh.LINES">H3DU.Mesh.LINES</a>, or is null, undefined, or omitted, generates a series of lines defining the curve. If this value is <a href="H3DU.Mesh.md#H3DU.Mesh.POINTS">H3DU.Mesh.POINTS</a>, generates a series of points along the curve. For any other value, this method has no effect.
* `n` (Type: number) (optional)<br>Number of subdivisions of the curve to be drawn. Default is 24. If 0, this method has no effect. Throws an error if this value is less than 0.
* `u1` (Type: number) (optional)<br>Starting point of the curve. Default is the starting coordinate given by the <a href="H3DU.Curve.md">curve evaluator object</a>, or 0 if not given.
* `u2` (Type: number) (optional)<br>Ending point of the curve. Default is the ending coordinate given by the <a href="H3DU.Curve.md">curve evaluator object</a>, or 1 if not given.

#### Return Value

This object. (Type: <a href="H3DU.CurveBuilder.md">H3DU.CurveBuilder</a>)

<a name='H3DU.CurveBuilder_position'></a>
### H3DU.CurveBuilder#position(curve, [size])

Sets the parametric curve used to generate vertex positions.

#### Parameters

* `curve` (Type: Object)<br>A <a href="H3DU.Curve.md">curve evaluator object</a> that describes the parametric curve used to generate positions.
* `size` (Type: number) (optional)<br>The number of elements in each position value. For example, if the attribute is 3-dimensional, this parameter is 3. If null, undefined, or omitted, the default is 3. Throws an error if this value is 0 or less.

#### Return Value

This object. (Type: <a href="H3DU.CurveBuilder.md">H3DU.CurveBuilder</a>)

<a name='H3DU.CurveBuilder_toMeshBuffer'></a>
### H3DU.CurveBuilder#toMeshBuffer()

Generates a mesh buffer containing the vertex attributes
generated so far. The mesh buffer's primitive type will equal the
last type passed to the "mode" parameter in the H3DU.CurveBuilder.curveEval method.

#### Return Value

The generated mesh buffer. (Type: <a href="H3DU.MeshBuffer.md">H3DU.MeshBuffer</a>)

[Back to documentation index.](index.md)

# H3DU.SurfaceBuilder

[Back to documentation index.](index.md)

<a name='H3DU.SurfaceBuilder'></a>
### H3DU.SurfaceBuilder()

An evaluator of surface evaluator objects for generating
vertex attributes for a surface.

For more information, see the <a href="tutorial-surfaces.md">Parametric Curves and Parametric Surfaces</a> tutorial.

### Methods

* [attribute](#H3DU.SurfaceBuilder_attribute)<br>Sets the parametric surface used to generate vertex attribute values.
* [clearVertices](#H3DU.SurfaceBuilder_clearVertices)<br>Clears the arrays of attribute values (such as positions and normals)
and vertex indices generated so far.
* [evalSurface](#H3DU.SurfaceBuilder_evalSurface)<br>Generates the vertex attributes of the parametric surfaces.
* [position](#H3DU.SurfaceBuilder_position)<br>Sets the parametric surface used to generate vertex positions.
* [positionNormal](#H3DU.SurfaceBuilder_positionNormal)<br>Sets the parametric surface used to generate vertex positions and normals.
* [positionNormalTexCoord](#H3DU.SurfaceBuilder_positionNormalTexCoord)<br>Sets the parametric surface used to generate vertex positions and normals, and
sets a surface evaluator that generates texture coordinates ranging
from (0,1) along the U and V axes of the surface.
* [positionTexCoord](#H3DU.SurfaceBuilder_positionTexCoord)<br>Sets the parametric surface used to generate vertex positions, and
sets a surface evaluator that generates texture coordinates ranging
from (0,1) along the U and V axes of the surface.
* [surfaceToBuffer](#H3DU.SurfaceBuilder.surfaceToBuffer)<br>Convenience method for creating a mesh buffer from a parametric
surface.
* [texCoord](#H3DU.SurfaceBuilder_texCoord)<br>Sets the parametric surface used to generate texture coordinates.
* [toMeshBuffer](#H3DU.SurfaceBuilder_toMeshBuffer)<br>Generates a mesh buffer containing the vertex attributes
generated so far.

<a name='H3DU.SurfaceBuilder_attribute'></a>
### H3DU.SurfaceBuilder#attribute(surface, semantic, [semanticIndex], [size])

Sets the parametric surface used to generate vertex attribute values.

#### Parameters

* `surface` (Type: Object)<br>A <a href="H3DU.Surface.md">surface evaluator object</a> that describes the parametric surface used to generate attribute's values.
* `semantic` (Type: number | string)<br>An attribute semantic, such as <a href="H3DU.Semantic.md#H3DU.Semantic.POSITION">H3DU.Semantic.POSITION</a>, "POSITION", or "TEXCOORD_0". Throws an error if this value is a string and the string is invalid.
* `semanticIndex` (Type: number) (optional)<br>The set index of the attribute for the given semantic. 0 is the first index of the attribute, 1 is the second, and so on. This is ignored if "name" is a string. If null or undefined, this value is 0.
* `size` (Type: number) (optional)<br>The number of elements in each position and normal. For example, if the attribute is 3-dimensional, this parameter is 3. If null, undefined, or omitted, the default is 3. Throws an error if this value is 0 or less.

#### Return Value

This object. (Type: <a href="H3DU.SurfaceBuilder.md">H3DU.SurfaceBuilder</a>)

#### Example

The following example sets the surface
function for texture coordinates to a linear evaluator. Thus, coordinates passed to the
evalSurface method will be interpolated as direct
texture coordinates.

    surface.attribute({"evaluate":function(u,v) {
    "use strict"; return [u,v] }},H3DU.Semantic.TEXCOORD);

<a name='H3DU.SurfaceBuilder_clearVertices'></a>
### H3DU.SurfaceBuilder#clearVertices()

Clears the arrays of attribute values (such as positions and normals)
and vertex indices generated so far. The attributes themselves will remain.

#### Return Value

This object. (Type: <a href="H3DU.SurfaceBuilder.md">H3DU.SurfaceBuilder</a>)

<a name='H3DU.SurfaceBuilder_evalSurface'></a>
### H3DU.SurfaceBuilder#evalSurface([mode], [un], [vn], [u1], [u2], [v1], [v2])

Generates the vertex attributes of the parametric surfaces.

#### Parameters

* `mode` (Type: number) (optional)<br>If this value is <a href="H3DU.Mesh.md#H3DU.Mesh.TRIANGLES">H3DU.Mesh.TRIANGLES</a>, or is null, undefined, or omitted, generates a series of triangles defining the surface. If this value is <a href="H3DU.Mesh.md#H3DU.Mesh.LINES">H3DU.Mesh.LINES</a>, generates a series of lines defining the surface. If this value is <a href="H3DU.Mesh.md#H3DU.Mesh.POINTS">H3DU.Mesh.POINTS</a>, generates a series of points along the surface. For any other value, this method has no effect.
* `un` (Type: number) (optional)<br>Number of subdivisions along the U axis. Default is 24. If 0, this method has no effect. Throws an error if this value is less than 0.
* `vn` (Type: number) (optional)<br>Number of subdivisions along the V axis. Default is 24. If 0, this method has no effect. Throws an error if this value is less than 0.
* `u1` (Type: number) (optional)<br>Starting U coordinate of the surface to evaluate. Default is the starting U coordinate given by the <a href="H3DU.Surface.md">surface evaluator object</a>, or 0 if not given.
* `u2` (Type: number) (optional)<br>Ending U coordinate of the surface to evaluate. Default is the ending U coordinate given by the <a href="H3DU.Surface.md">surface evaluator object</a>, or 1 if not given.
* `v1` (Type: number) (optional)<br>Starting V coordinate of the surface to evaluate. Default is the starting V coordinate given by the <a href="H3DU.Surface.md">surface evaluator object</a>, or 0 if not given.
* `v2` (Type: number) (optional)<br>Ending V coordinate of the surface to evaluate. Default is the ending V coordinate given by the <a href="H3DU.Surface.md">surface evaluator object</a>, or 1 if not given.

#### Return Value

This object. (Type: <a href="H3DU.SurfaceBuilder.md">H3DU.SurfaceBuilder</a>)

<a name='H3DU.SurfaceBuilder_position'></a>
### H3DU.SurfaceBuilder#position(surface, [size])

Sets the parametric surface used to generate vertex positions.

#### Parameters

* `surface` (Type: Object)<br>A <a href="H3DU.Surface.md">surface evaluator object</a> that describes the parametric surface used to generate position values.
* `size` (Type: number) (optional)<br>The number of elements in each position value. For example, if the attribute is 3-dimensional, this parameter is 3. If null, undefined, or omitted, the default is 3. Throws an error if this value is 0 or less.

#### Return Value

This object. (Type: <a href="H3DU.SurfaceBuilder.md">H3DU.SurfaceBuilder</a>)

<a name='H3DU.SurfaceBuilder_positionNormal'></a>
### H3DU.SurfaceBuilder#positionNormal(surface, [size])

Sets the parametric surface used to generate vertex positions and normals.

#### Parameters

* `surface` (Type: Object)<br>A <a href="H3DU.Surface.md">surface evaluator object</a> that describes the parametric surface used to generate positions.
* `size` (Type: number) (optional)<br>The number of elements in each position and normal. For example, if the attribute is 3-dimensional, this parameter is 3. If null, undefined, or omitted, the default is 3. Throws an error if this value is 0 or less.

#### Return Value

This object. (Type: <a href="H3DU.SurfaceBuilder.md">H3DU.SurfaceBuilder</a>)

<a name='H3DU.SurfaceBuilder_positionNormalTexCoord'></a>
### H3DU.SurfaceBuilder#positionNormalTexCoord(surface, [size])

Sets the parametric surface used to generate vertex positions and normals, and
sets a surface evaluator that generates texture coordinates ranging
from (0,1) along the U and V axes of the surface.

#### Parameters

* `surface` (Type: Object)<br>A <a href="H3DU.Surface.md">surface evaluator object</a> that describes the parametric surface used to generate positions.
* `size` (Type: number) (optional)<br>The number of elements in each position and normal. For example, if the attribute is 3-dimensional, this parameter is 3. If null, undefined, or omitted, the default is 3. The texture coordinates will be 2-dimensional.

#### Return Value

This object. (Type: <a href="H3DU.SurfaceBuilder.md">H3DU.SurfaceBuilder</a>)

<a name='H3DU.SurfaceBuilder_positionTexCoord'></a>
### H3DU.SurfaceBuilder#positionTexCoord(surface, [size])

Sets the parametric surface used to generate vertex positions, and
sets a surface evaluator that generates texture coordinates ranging
from (0,1) along the U and V axes of the surface.

#### Parameters

* `surface` (Type: Object)<br>A <a href="H3DU.Surface.md">surface evaluator object</a> that describes the parametric surface used to generate positions.
* `size` (Type: number) (optional)<br>The number of elements in each position. For example, if the attribute is 3-dimensional, this parameter is 3. If null, undefined, or omitted, the default is 3. The texture coordinates will be 2-dimensional. Throws an error if this value is 0 or less.

#### Return Value

This object. (Type: <a href="H3DU.SurfaceBuilder.md">H3DU.SurfaceBuilder</a>)

<a name='H3DU.SurfaceBuilder.surfaceToBuffer'></a>
### (static) H3DU.SurfaceBuilder.surfaceToBuffer(surface, [mode], [un], [vn], [u1], [u2], [v1], [v2])

Convenience method for creating a mesh buffer from a parametric
surface. The mesh buffer will contain positions, vertex normals, and
texture coordinates that cover the given surface.

#### Parameters

* `surface` (Type: Object)<br>A <a href="H3DU.Surface.md">surface evaluator object</a> that describes the parametric surface used to generate positions.
* `mode` (Type: number) (optional)<br>If this value is <a href="H3DU.Mesh.md#H3DU.Mesh.TRIANGLES">H3DU.Mesh.TRIANGLES</a>, or is null, undefined, or omitted, generates a series of triangles defining the surface. If this value is <a href="H3DU.Mesh.md#H3DU.Mesh.LINES">H3DU.Mesh.LINES</a>, generates a series of lines defining the surface. If this value is <a href="H3DU.Mesh.md#H3DU.Mesh.POINTS">H3DU.Mesh.POINTS</a>, generates a series of points along the surface. For any other value, this method has no effect.
* `un` (Type: number) (optional)<br>Number of subdivisions along the U axis. Default is 24.
* `vn` (Type: number) (optional)<br>Number of subdivisions along the V axis. Default is 24.
* `u1` (Type: number) (optional)<br>Starting U coordinate of the surface to evaluate. Default is the starting U coordinate given by the <a href="H3DU.Surface.md">surface evaluator object</a>, or 0 if not given.
* `u2` (Type: number) (optional)<br>Ending U coordinate of the surface to evaluate. Default is the ending U coordinate given by the <a href="H3DU.Surface.md">surface evaluator object</a>, or 1 if not given.
* `v1` (Type: number) (optional)<br>Starting V coordinate of the surface to evaluate. Default is the starting V coordinate given by the <a href="H3DU.Surface.md">surface evaluator object</a>, or 0 if not given.
* `v2` (Type: number) (optional)<br>Ending V coordinate of the surface to evaluate. Default is the ending V coordinate given by the <a href="H3DU.Surface.md">surface evaluator object</a>, or 1 if not given.

#### Return Value

The generated mesh buffer. (Type: <a href="H3DU.MeshBuffer.md">H3DU.MeshBuffer</a>)

<a name='H3DU.SurfaceBuilder_texCoord'></a>
### H3DU.SurfaceBuilder#texCoord(surface, [size])

Sets the parametric surface used to generate texture coordinates.

#### Parameters

* `surface` (Type: Object)<br>A <a href="H3DU.Surface.md">surface evaluator object</a> that describes the parametric surface used to generate texture coordinates.
* `size` (Type: number) (optional)<br>The number of elements in each value of the attribute. For example, if the attribute is 3-dimensional, this parameter is 3. If null, undefined, or omitted, the default is 2.

#### Return Value

This object. (Type: <a href="H3DU.SurfaceBuilder.md">H3DU.SurfaceBuilder</a>)

<a name='H3DU.SurfaceBuilder_toMeshBuffer'></a>
### H3DU.SurfaceBuilder#toMeshBuffer()

Generates a mesh buffer containing the vertex attributes
generated so far. The mesh buffer's primitive type will equal the
last type passed to the "mode" parameter in the H3DU.SurfaceBuilder.surfaceEval method.

#### Return Value

The generated mesh buffer. (Type: <a href="H3DU.MeshBuffer.md">H3DU.MeshBuffer</a>)

[Back to documentation index.](index.md)
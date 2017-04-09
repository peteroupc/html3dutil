# H3DU.SurfaceBuilder

[Back to documentation index.](index.md)

<a name='H3DU.SurfaceBuilder'></a>
### H3DU.SurfaceBuilder()

An evaluator of surface evaluator objects for generating
vertex attributes for a surface.

For more information, see the <a href="tutorial-surfaces.md">Parametric Curves and Parametric Surfaces</a> tutorial.

### Methods

* [attribute](#H3DU.SurfaceBuilder_attribute)<br>TODO: Not documented yet.
* [clearVertices](#H3DU.SurfaceBuilder_clearVertices)<br>TODO: Not documented yet.
* [evalSurface](#H3DU.SurfaceBuilder_evalSurface)<br>TODO: Not documented yet.
* [position](#H3DU.SurfaceBuilder_position)<br>TODO: Not documented yet.
* [positionNormal](#H3DU.SurfaceBuilder_positionNormal)<br>TODO: Not documented yet.
* [surfaceToBuffer](#H3DU.SurfaceBuilder.surfaceToBuffer)<br>Convenience method for creating a mesh buffer from a parametric
surface.
* [texCoord](#H3DU.SurfaceBuilder_texCoord)<br>TODO: Not documented yet.
* [toMeshBuffer](#H3DU.SurfaceBuilder_toMeshBuffer)<br>TODO: Not documented yet.

<a name='H3DU.SurfaceBuilder_attribute'></a>
### H3DU.SurfaceBuilder#attribute(surface, semantic, semanticIndex, size)

TODO: Not documented yet.

#### Parameters

* `surface` (Type: *)
* `semantic` (Type: *)
* `semanticIndex` (Type: *)
* `size` (Type: *)

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

TODO: Not documented yet.

#### Return Value

Return value. (Type: *)

<a name='H3DU.SurfaceBuilder_evalSurface'></a>
### H3DU.SurfaceBuilder#evalSurface([mode], [un], [vn], [u1], [u2], [v1], [v2])

TODO: Not documented yet.

#### Parameters

* `mode` (Type: number) (optional)<br>If this value is <a href="H3DU.Mesh.md#H3DU.Mesh.TRIANGLES">H3DU.Mesh.TRIANGLES</a>, or is null or omitted, generates a series of triangles defining the surface. If this value is <a href="H3DU.Mesh.md#H3DU.Mesh.LINES">H3DU.Mesh.LINES</a>, generates a series of lines defining the surface. If this value is <a href="H3DU.Mesh.md#H3DU.Mesh.POINTS">H3DU.Mesh.POINTS</a>, generates a series of points along the surface. For any other value, this method has no effect.
* `un` (Type: number) (optional)<br>Number of subdivisions along the U axis. Default is 24.
* `vn` (Type: number) (optional)<br>Number of subdivisions along the V axis. Default is 24.
* `u1` (Type: number) (optional)<br>Starting U coordinate of the surface to evaluate. Default is the starting U coordinate given by the <a href="H3DU.Surface.md">surface evaluator object</a>, or 0 if not given.
* `u2` (Type: number) (optional)<br>Ending U coordinate of the surface to evaluate. Default is the ending U coordinate given by the <a href="H3DU.Surface.md">surface evaluator object</a>, or 1 if not given.
* `v1` (Type: number) (optional)<br>Starting V coordinate of the surface to evaluate. Default is the starting V coordinate given by the <a href="H3DU.Surface.md">surface evaluator object</a>, or 0 if not given.
* `v2` (Type: number) (optional)<br>Ending V coordinate of the surface to evaluate. Default is the ending V coordinate given by the <a href="H3DU.Surface.md">surface evaluator object</a>, or 1 if not given.

#### Return Value

This object. (Type: <a href="H3DU.SurfaceBuilder.md">H3DU.SurfaceBuilder</a>)

<a name='H3DU.SurfaceBuilder_position'></a>
### H3DU.SurfaceBuilder#position(surface, size)

TODO: Not documented yet.

#### Parameters

* `surface` (Type: *)
* `size` (Type: *)

#### Return Value

This object. (Type: <a href="H3DU.SurfaceBuilder.md">H3DU.SurfaceBuilder</a>)

<a name='H3DU.SurfaceBuilder_positionNormal'></a>
### H3DU.SurfaceBuilder#positionNormal(surface, size)

TODO: Not documented yet.

#### Parameters

* `surface` (Type: *)
* `size` (Type: *)

#### Return Value

This object. (Type: <a href="H3DU.SurfaceBuilder.md">H3DU.SurfaceBuilder</a>)

<a name='H3DU.SurfaceBuilder.surfaceToBuffer'></a>
### (static) H3DU.SurfaceBuilder.surfaceToBuffer(surface, mode, un, vn, u1, u2, v1, v2)

Convenience method for creating a mesh buffer from a parametric
surface. The mesh buffer will contain positions and vertex normals that
cover the given surface.

#### Parameters

* `surface` (Type: *)
* `mode` (Type: *)
* `un` (Type: *)
* `vn` (Type: *)
* `u1` (Type: *)
* `u2` (Type: *)
* `v1` (Type: *)
* `v2` (Type: *)

#### Return Value

This object. (Type: <a href="H3DU.SurfaceBuilder.md">H3DU.SurfaceBuilder</a>)

<a name='H3DU.SurfaceBuilder_texCoord'></a>
### H3DU.SurfaceBuilder#texCoord(surface, size)

TODO: Not documented yet.

#### Parameters

* `surface` (Type: *)
* `size` (Type: *)

#### Return Value

This object. (Type: <a href="H3DU.SurfaceBuilder.md">H3DU.SurfaceBuilder</a>)

<a name='H3DU.SurfaceBuilder_toMeshBuffer'></a>
### H3DU.SurfaceBuilder#toMeshBuffer()

TODO: Not documented yet.

#### Return Value

Return value. (Type: *)

[Back to documentation index.](index.md)

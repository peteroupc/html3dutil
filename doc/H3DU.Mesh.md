# H3DU.Mesh

[Back to documentation index.](index.md)

<a name='H3DU.Mesh'></a>
### H3DU.Mesh([vertices], [indices], [format])

Specifies the triangles, lines, or points that make up a geometric shape.
Each vertex, that is, each point, each end of a line, and each corner
of a triangle, can also specify the following attributes:
<ul>
<li>A color, which is a set of 3 values each ranging from 0 to 1 (the red, green,
and blue components, respectively.)
<li>A normal vector, which is a set of 3 values.
Normal values are required for lighting to work properly.
<li>A tangent vector, which is a set of 3 values. (This is deprecated.)
<li>A bitangent vector, which is a set of 3 values. (This is deprecated.)
<li>Texture coordinates, which are a set of 2 values each ranging from 0 to
1, where (0, 0) is the lower right corner of the texture (by default), and (1, 1) is the upper
right corner (by default).
</ul>

Notes:<ul>
<li>Previous versions of this class allowed meshes to contain more than one
primitive type (triangles, lines, and points are the primitive types). This is
no longer the case, to simplify the implementation.

<li>The default shader program assumes that all colors specified in this object are in
<a href="H3DU.Math.md#H3DU.Math.colorTosRGB">companded sRGB</a>.
<li>Starting in version 2.0, this class should not be used as a general purpose
class for storing geometric meshes. It should only be used as a convenient
way to build mesh buffers. In the future, some of the functionality in this class
may be reimplemented in the MeshBuffer class and the corresponding methods
in this class may be rewritten by having them convert objects to a MeshBuffer and
call the new H3DU.MeshBuffer method; this may affect performance. Afterward,
or at that point, those methods may be deprecated.</li></ul>

#### Parameters

* `vertices` (Type: Array.&lt;number>) (optional)<br>An array that contains data on each vertex of the mesh. Each vertex is made up of the same number of elements, as defined in format. May be null or omitted, in which case an empty vertex array is used.
* `indices` (Type: Array.&lt;number>) (optional)<br>An array of vertex indices. Each trio of indices specifies a separate triangle, or each pair of indices specifies a line segment. If null, undefined, or omitted, creates an initially empty mesh.
* `format` (Type: number) (optional)<br>A set of bit flags depending on the kind of data each vertex contains. Each vertex contains 3 elements plus:<ul> <li> 3 more elements if Mesh.NORMALS_BIT is set, plus <li> 3 more elements if Mesh.COLORS_BIT is set, plus <li> 2 more elements if Mesh.TEXCOORDS_BIT is set, plus <li> 3 more elements if Mesh.TANGENTS_BIT is set (deprecated), plus <li> 3 more elements if Mesh.BITANGENTS_BIT is set (deprecated). </ul> If Mesh.LINES_BIT is set, each vertex index specifies a point of a line segment. If Mesh.POINTS_BIT is set, each vertex index specifies an individual point. Both bits can't be set. May be null or omitted, in which case "format" is set to 0.

### Members

* [BITANGENTS_BIT](#H3DU.Mesh.BITANGENTS_BIT)<br><b>Deprecated: Deprecated because the default shader no longer
uses tangent and bitangent attributes for normal mapping. To define
bitangent vectors for a mesh, use the <a href="H3DU.MeshBuffer.md">H3DU.MeshBuffer</a> class
and create a buffer attribute with the <a href="H3DU.Semantic.md#H3DU.Semantic.BITANGENT">H3DU.Semantic.BITANGENT</a>
semantic.</b>
* [COLORS_BIT](#H3DU.Mesh.COLORS_BIT)<br>The mesh contains colors for each vertex.
* [LINES](#H3DU.Mesh.LINES)<br>Primitive mode for rendering line segments, made up
of 2 vertices each.
* [LINES_BIT](#H3DU.Mesh.LINES_BIT)<br>The mesh consists of lines (2 vertices per line) instead
of triangles (3 vertices per line).
* [LINE_STRIP](#H3DU.Mesh.LINE_STRIP)<br>Primitive mode for rendering connected line segments.
* [NORMALS_BIT](#H3DU.Mesh.NORMALS_BIT)<br>The mesh contains normals for each vertex.
* [POINTS](#H3DU.Mesh.POINTS)<br>Primitive mode for rendering points, made up
of 1 vertex each.
* [POINTS_BIT](#H3DU.Mesh.POINTS_BIT)<br>The mesh consists of points (1 vertex per line).
* [QUADS](#H3DU.Mesh.QUADS)<br>Primitive mode for rendering quadrilaterals, made up
of 4 vertices each.
* [QUAD_STRIP](#H3DU.Mesh.QUAD_STRIP)<br>Primitive mode for rendering a strip of quadrilaterals (quads).
* [TANGENTS_BIT](#H3DU.Mesh.TANGENTS_BIT)<br><b>Deprecated: Deprecated because the default shader no longer
uses tangent and bitangent attributes for normal mapping. To define
tangent vectors for a mesh, use the <a href="H3DU.MeshBuffer.md">H3DU.MeshBuffer</a> class
and create a buffer attribute with the <a href="H3DU.Semantic.md#H3DU.Semantic.TANGENT">H3DU.Semantic.TANGENT</a>
semantic.</b>
* [TEXCOORDS_BIT](#H3DU.Mesh.TEXCOORDS_BIT)<br>The mesh contains texture coordinates for each vertex.
* [TRIANGLES](#H3DU.Mesh.TRIANGLES)<br>Primitive mode for rendering triangles, made up
of 3 vertices each.
* [TRIANGLE_FAN](#H3DU.Mesh.TRIANGLE_FAN)<br>Primitive mode for rendering a triangle fan.
* [TRIANGLE_STRIP](#H3DU.Mesh.TRIANGLE_STRIP)<br>Primitive mode for rendering a triangle strip.

### Methods

* [color3](#H3DU.Mesh_color3)<br>Sets the current color for this mesh.
* [getVertex](#H3DU.Mesh_getVertex)<br>Gets the position of the vertex with the given
index in this mesh.
* [getVertexNormal](#H3DU.Mesh_getVertexNormal)<br>Gets the normal of the vertex with the given
index in this mesh.
* [mode](#H3DU.Mesh_mode)<br>Changes the primitive mode for this mesh.
* [normal3](#H3DU.Mesh_normal3)<br>Sets the current normal for this mesh.
* [primitiveCount](#H3DU.Mesh_primitiveCount)<br>Gets the number of primitives (triangles, lines,
or points) that this mesh contains.
* [setVertex](#H3DU.Mesh_setVertex)<br>Sets the X, Y, and Z coordinates of the vertex with the
given index.
* [setVertexNormal](#H3DU.Mesh_setVertexNormal)<br>Sets the normal associated with the vertex with the
given index.
* [texCoord2](#H3DU.Mesh_texCoord2)<br>Sets the current texture coordinates for this mesh.
* [toMeshBuffer](#H3DU.Mesh_toMeshBuffer)<br>Generates a mesh buffer from the information in this mesh object.
* [vertex2](#H3DU.Mesh_vertex2)<br>Adds a new vertex to this mesh.
* [vertex3](#H3DU.Mesh_vertex3)<br>Adds a new vertex to this mesh.
* [vertexCount](#H3DU.Mesh_vertexCount)<br>Gets the number of vertices included in this mesh.

<a name='H3DU.Mesh.BITANGENTS_BIT'></a>
### H3DU.Mesh.BITANGENTS_BIT (constant)

<b>Deprecated: Deprecated because the default shader no longer
uses tangent and bitangent attributes for normal mapping. To define
bitangent vectors for a mesh, use the <a href="H3DU.MeshBuffer.md">H3DU.MeshBuffer</a> class
and create a buffer attribute with the <a href="H3DU.Semantic.md#H3DU.Semantic.BITANGENT">H3DU.Semantic.BITANGENT</a>
semantic.</b>

The mesh contains bitangent vectors for each vertex.

Default Value: `16`

<a name='H3DU.Mesh.COLORS_BIT'></a>
### H3DU.Mesh.COLORS_BIT (constant)

The mesh contains colors for each vertex.

Default Value: `2`

<a name='H3DU.Mesh.LINES'></a>
### H3DU.Mesh.LINES (constant)

Primitive mode for rendering line segments, made up
of 2 vertices each.

<a name='H3DU.Mesh.LINES_BIT'></a>
### H3DU.Mesh.LINES_BIT (constant)

The mesh consists of lines (2 vertices per line) instead
of triangles (3 vertices per line).

Default Value: `256`

<a name='H3DU.Mesh.LINE_STRIP'></a>
### H3DU.Mesh.LINE_STRIP (constant)

Primitive mode for rendering connected line segments.
The first 2 vertices make up the first line, and each additional
line is made up of the last vertex and 1 new vertex.

Default Value: `3`

<a name='H3DU.Mesh.NORMALS_BIT'></a>
### H3DU.Mesh.NORMALS_BIT (constant)

The mesh contains normals for each vertex.

Default Value: `1`

<a name='H3DU.Mesh.POINTS'></a>
### H3DU.Mesh.POINTS (constant)

Primitive mode for rendering points, made up
of 1 vertex each.

Default Value: `0`

<a name='H3DU.Mesh.POINTS_BIT'></a>
### H3DU.Mesh.POINTS_BIT (constant)

The mesh consists of points (1 vertex per line).

Default Value: `512`

<a name='H3DU.Mesh.QUADS'></a>
### H3DU.Mesh.QUADS (constant)

Primitive mode for rendering quadrilaterals, made up
of 4 vertices each. Each quadrilateral is broken into two triangles: the first
triangle consists of the first, second, and third vertices, in that order,
and the second triangle consists of the first, third, and fourth
vertices, in that order.

Default Value: `7`

<a name='H3DU.Mesh.QUAD_STRIP'></a>
### H3DU.Mesh.QUAD_STRIP (constant)

Primitive mode for rendering a strip of quadrilaterals (quads).
The first 4 vertices make up the first quad, and each additional
quad is made up of the last 2 vertices of the previous quad and
2 new vertices. Each quad is broken into two triangles: the first
triangle consists of the first, second, and third vertices, in that order,
and the second triangle consists of the third, second, and fourth
vertices, in that order.

Default Value: `8`

<a name='H3DU.Mesh.TANGENTS_BIT'></a>
### H3DU.Mesh.TANGENTS_BIT (constant)

<b>Deprecated: Deprecated because the default shader no longer
uses tangent and bitangent attributes for normal mapping. To define
tangent vectors for a mesh, use the <a href="H3DU.MeshBuffer.md">H3DU.MeshBuffer</a> class
and create a buffer attribute with the <a href="H3DU.Semantic.md#H3DU.Semantic.TANGENT">H3DU.Semantic.TANGENT</a>
semantic.</b>

The mesh contains tangent vectors for each vertex.

Default Value: `8`

<a name='H3DU.Mesh.TEXCOORDS_BIT'></a>
### H3DU.Mesh.TEXCOORDS_BIT (constant)

The mesh contains texture coordinates for each vertex.

Default Value: `4`

<a name='H3DU.Mesh.TRIANGLES'></a>
### H3DU.Mesh.TRIANGLES (constant)

Primitive mode for rendering triangles, made up
of 3 vertices each.

Default Value: `4`

<a name='H3DU.Mesh.TRIANGLE_FAN'></a>
### H3DU.Mesh.TRIANGLE_FAN (constant)

Primitive mode for rendering a triangle fan. The first 3
vertices make up the first triangle, and each additional
triangle is made up of the first vertex of the first triangle,
the previous vertex, and 1 new vertex.

Default Value: `6`

<a name='H3DU.Mesh.TRIANGLE_STRIP'></a>
### H3DU.Mesh.TRIANGLE_STRIP (constant)

Primitive mode for rendering a triangle strip. The first 3
vertices make up the first triangle, and each additional
triangle is made up of the last 2 vertices and 1
new vertex. For the second triangle in the strip, and
every other triangle after that, the first and second
vertices are swapped when generating that triangle.

Default Value: `5`

<a name='H3DU.Mesh_color3'></a>
### H3DU.Mesh#color3(r, [g], [b])

Sets the current color for this mesh. Future vertex positions
defined (with vertex3()) will have this color. The new current
color will apply to future vertices even if the current mode
is TRIANGLE_FAN and some vertices were already given for
that mode. Only the red, green, and blue components will be used.

#### Parameters

* `r` (Type: Array.&lt;number> | number | string)<br>A <a href="H3DU.md#H3DU.toGLColor">color vector or string</a>, or the red color component (0-1).
* `g` (Type: number) (optional)<br>Green color component (0-1). May be null or omitted if a string or array is given as the "r" parameter.
* `b` (Type: number) (optional)<br>Blue color component (0-1). May be null or omitted if a string or array is given as the "r" parameter.

#### Return Value

This object. (Type: <a href="H3DU.Mesh.md">H3DU.Mesh</a>)

<a name='H3DU.Mesh_getVertex'></a>
### H3DU.Mesh#getVertex(index)

Gets the position of the vertex with the given
index in this mesh.

#### Parameters

* `index` (Type: number)<br>Zero-based index of the vertex to get. The index ranges from 0 to less than the number of vertices in the mesh, not the number of vertex indices.

#### Return Value

A 3-element array giving
the X, Y, and Z coordinates, respectively, of the vertex
position, or null if the index is less than 0 or
equals the number of vertices in this mesh or greater. (Type: Array.&lt;number>)

<a name='H3DU.Mesh_getVertexNormal'></a>
### H3DU.Mesh#getVertexNormal(index)

Gets the normal of the vertex with the given
index in this mesh.

#### Parameters

* `index` (Type: number)<br>Zero-based index of the vertex normal to get. The index ranges from 0 to less than the number of vertices in the mesh, not the number of vertex indices.

#### Return Value

A 3-element array giving
the X, Y, and Z coordinates, respectively, of the vertex
normal, or null if the index is less than 0 or
equals the number of vertices in this mesh or greater.
Returns (0,0,0) if the given vertex exists but doesn't define
a normal. (Type: Array.&lt;number>)

<a name='H3DU.Mesh_mode'></a>
### H3DU.Mesh#mode(m)

Changes the primitive mode for this mesh.
Future vertices will be drawn as primitives of the new type.
The primitive type can be set to the same mode, in which
case future vertices given will not build upon previous
vertices.

An H3DU.Mesh object can contain primitives of different
types, such as triangles and lines. For example, it's allowed
to have a mesh with triangles, then call this method, say,
with <code>Mesh.LINE_STRIP</code> to add line segments
to that mesh. However, this functionality may be deprecated
in future versions.

#### Parameters

* `m` (Type: number)<br>A primitive type. One of the following: Mesh.TRIANGLES, Mesh.LINES, Mesh.LINE_STRIP, Mesh.TRIANGLE_STRIP, Mesh.TRIANGLE_FAN, Mesh.QUADS, Mesh.QUAD_STRIP. Throws an error if the primitive type is incompatible with the current primitive type (for example, a triangle type with LINE_STRIP).

#### Return Value

This object. (Type: <a href="H3DU.Mesh.md">H3DU.Mesh</a>)

<a name='H3DU.Mesh_normal3'></a>
### H3DU.Mesh#normal3(x, [y], [z])

Sets the current normal for this mesh. Future vertex positions
defined (with vertex3()) will have this normal. The new current
normal will apply to future vertices even if the current mode
is TRIANGLE_FAN and some vertices were already given for
that mode. The normal passed to this method will
not automatically be normalized to unit length.

#### Parameters

* `x` (Type: Array.&lt;number> | number)<br>X coordinate of the normal. If "y" and "z" are null or omitted, this is instead a 3-element array giving the X, Y, and Z coordinates, or a single number giving the coordinate for all three dimensions.
* `y` (Type: number) (optional)<br>Y coordinate of the normal. If "x" is an array, this parameter may be omitted.
* `z` (Type: number) (optional)<br>Z coordinate of the normal. If "x" is an array, this parameter may be omitted.

#### Return Value

This object. (Type: <a href="H3DU.Mesh.md">H3DU.Mesh</a>)

<a name='H3DU.Mesh_primitiveCount'></a>
### H3DU.Mesh#primitiveCount()

Gets the number of primitives (triangles, lines,
or points) that this mesh contains.

#### Return Value

Return value. (Type: number)

<a name='H3DU.Mesh_setVertex'></a>
### H3DU.Mesh#setVertex(index, x, y, z)

Sets the X, Y, and Z coordinates of the vertex with the
given index. Has no effect if the index is less than 0 or
equals the number of vertices in this mesh or greater.

#### Parameters

* `index` (Type: number)<br>Zero-based index of the vertex to set. The index ranges from 0 to less than the number of vertices in the mesh, not the number of vertex indices.
* `x` (Type: number | Array.&lt;number>)<br>X coordinate of the vertex position. Can also be a 3-element array giving the X, Y, and Z coordinates, respectively, of the vertex position.
* `y` (Type: number)<br>Y coordinate of the vertex position. May be null or omitted if "x" is an array.
* `z` (Type: number)<br>Z coordinate of the vertex position. May be null or omitted if "x" is an array.

#### Return Value

This object. (Type: <a href="H3DU.Mesh.md">H3DU.Mesh</a>)

<a name='H3DU.Mesh_setVertexNormal'></a>
### H3DU.Mesh#setVertexNormal(index, x, y, z)

Sets the normal associated with the vertex with the
given index. Has no effect if the index is less than 0 or
equals the number of vertices in this mesh or greater.

#### Parameters

* `index` (Type: number)<br>Zero-based index of the vertex to set. The index ranges from 0 to less than the number of vertices in the mesh, not the number of vertex indices.
* `x` (Type: number | Array.&lt;number>)<br>X coordinate of the vertex normal. Can also be a 3-element array giving the X, Y, and Z coordinates, respectively, of the vertex normal.
* `y` (Type: number)<br>Y coordinate of the vertex normal. May be null or omitted if "x" is an array.
* `z` (Type: number)<br>Z coordinate of the vertex normal. May be null or omitted if "x" is an array.

#### Return Value

This object. (Type: <a href="H3DU.Mesh.md">H3DU.Mesh</a>)

<a name='H3DU.Mesh_texCoord2'></a>
### H3DU.Mesh#texCoord2(u, [v])

Sets the current texture coordinates for this mesh. Future vertex positions
defined (with vertex3()) will have these texture coordinates.
The new current texture coordinates will apply to future vertices
even if the current mode
is TRIANGLE_FAN and some vertices were already given for
that mode.

H3DU.Texture coordinates are a set of 2 values each ranging from 0 to
1, where (0, 0) is the lower right corner of the texture (by default), and (1, 1) is the upper
right corner (by default).

#### Parameters

* `u` (Type: Array.&lt;number> | number)<br>X coordinate of the texture, from 0-1. If "v" are null or omitted, this is instead a 2-element array giving the X and Y coordinates, or a single number giving the coordinate for all three dimensions.
* `v` (Type: number) (optional)<br>Y coordinate of the texture, from 0-1. If "u" is an array, this parameter can be omitted.

#### Return Value

This object. (Type: <a href="H3DU.Mesh.md">H3DU.Mesh</a>)

<a name='H3DU.Mesh_toMeshBuffer'></a>
### H3DU.Mesh#toMeshBuffer()

Generates a mesh buffer from the information in this mesh object.

#### Return Value

The generated mesh buffer. (Type: <a href="H3DU.MeshBuffer.md">H3DU.MeshBuffer</a>)

<a name='H3DU.Mesh_vertex2'></a>
### H3DU.Mesh#vertex2(x, y)

Adds a new vertex to this mesh. The Z coordinate will
be treated as 0.

#### Parameters

* `x` (Type: Array.&lt;number> | number)<br>The X coordinate. If "y" is null, undefined, or omitted, this is instead a 3-element array giving the X, Y, and Z coordinates, or a single number giving the coordinate for all three dimensions.
* `y` (Type: number)<br>The Y coordinate. If "x" is an array, this parameter may be omitted.

#### Return Value

This object. (Type: <a href="H3DU.Mesh.md">H3DU.Mesh</a>)

<a name='H3DU.Mesh_vertex3'></a>
### H3DU.Mesh#vertex3(x, [y], [z])

Adds a new vertex to this mesh. If appropriate, adds an
additional face index according to this mesh's current mode.
The vertex will adopt this mesh's current normal, color,
and texture coordinates if they have been defined.

#### Parameters

* `x` (Type: Array.&lt;number> | number)<br>The X coordinate. If "y" and "z" are null or omitted, this is instead a 3-element array giving the X, Y, and Z coordinates, or a single number giving the coordinate for all three dimensions.
* `y` (Type: number) (optional)<br>The Y coordinate. If "x" is an array, this parameter may be omitted.
* `z` (Type: number) (optional)<br>The Z coordinate. If "x" is an array, this parameter may be omitted.

#### Return Value

This object. (Type: <a href="H3DU.Mesh.md">H3DU.Mesh</a>)

<a name='H3DU.Mesh_vertexCount'></a>
### H3DU.Mesh#vertexCount()

Gets the number of vertices included in this mesh.

#### Return Value

Return value. (Type: number)

[Back to documentation index.](index.md)

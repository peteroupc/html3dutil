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
the <a href="H3DU.Math.md#H3DU.Math.colorTosRGB">sRGB color space</a>.
<li>Starting in version 2.0, this class should not be used as a general purpose
class for storing geometric meshes. It should only be used as a convenient
way to build mesh buffers. In the future, some of the functionality in this class
may be reimplemented in the MeshBuffer class and the corresponding methods
in this class may be rewritten by having them convert objects to a MeshBuffer and
call the new H3DU.MeshBuffer method; this may affect performance. Afterward,
or at that point, those methods may be deprecated.</li></ul>

#### Parameters

* `vertices` (Type: Array.&lt;number>) (optional)<br>An array that contains data on each vertex of the mesh. Each vertex is made up of the same number of elements, as defined in format. May be null or omitted, in which case an empty vertex array is used.
* `indices` (Type: Array.&lt;number>) (optional)<br>An array of vertex indices. Each trio of indices specifies a separate triangle, or each pair of indices specifies a line segment. If null or omitted, creates an initially empty mesh.
* `format` (Type: number) (optional)<br>A set of bit flags depending on the kind of data each vertex contains. Each vertex contains 3 elements plus:<ul> <li> 3 more elements if Mesh.NORMALS_BIT is set, plus <li> 3 more elements if Mesh.COLORS_BIT is set, plus <li> 2 more elements if Mesh.TEXCOORDS_BIT is set.</ul> If Mesh.LINES_BIT is set, each vertex index specifies a point of a line segment. If Mesh.POINTS_BIT is set, each vertex index specifies an individual point. Both bits can't be set. May be null or omitted, in which case "format" is set to 0.

### Members

* [BITANGENTS_BIT](#H3DU.Mesh.BITANGENTS_BIT)<br><b>Deprecated: Deprecated because the default shader no longer
uses tangent and bitangent attributes for normal mapping. To define
bitangent vectors for a mesh, use the <a href="H3DU.MeshBuffer.md">H3DU.MeshBuffer</a> class
and create a buffer attribute with the H3DU.Semantics.BITANGENT
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
and create a buffer attribute with the H3DU.Semantics.TANGENT
semantic.</b>
* [TEXCOORDS_BIT](#H3DU.Mesh.TEXCOORDS_BIT)<br>The mesh contains texture coordinates for each vertex.
* [TRIANGLES](#H3DU.Mesh.TRIANGLES)<br>Primitive mode for rendering triangles, made up
of 3 vertices each.
* [TRIANGLE_FAN](#H3DU.Mesh.TRIANGLE_FAN)<br>Primitive mode for rendering a triangle fan.
* [TRIANGLE_STRIP](#H3DU.Mesh.TRIANGLE_STRIP)<br>Primitive mode for rendering a triangle strip.

### Methods

* [bitangent3](#H3DU.Mesh_bitangent3)<br><b>Deprecated: Deprecated because the default shader no longer
uses tangent and bitangent attributes for normal mapping. To define
bitangent vectors for a mesh, use the <a href="H3DU.MeshBuffer.md">H3DU.MeshBuffer</a> class
and create a buffer attribute with the H3DU.Semantics.BITANGENT
semantic.</b>
* [color3](#H3DU.Mesh_color3)<br>Sets the current color for this mesh.
* [enumPrimitives](#H3DU.Mesh_enumPrimitives)<br>Enumerates the primitives (lines, triangles, and points) included
in this mesh.
* [getBoundingBox](#H3DU.Mesh_getBoundingBox)<br><b>Deprecated: Use <code>new H3DU.MeshBuffer(this).getBounds()</code> instead.</b>
* [getVertex](#H3DU.Mesh_getVertex)<br>Gets the position of the vertex with the given
index in this mesh.
* [getVertexNormal](#H3DU.Mesh_getVertexNormal)<br>Gets the normal of the vertex with the given
index in this mesh.
* [merge](#H3DU.Mesh_merge)<br><b>Deprecated: Use <code>new H3DU.MeshBuffer(mesh).merge(other)</code> instead.</b>
* [mode](#H3DU.Mesh_mode)<br>Changes the primitive mode for this mesh.
* [normal3](#H3DU.Mesh_normal3)<br>Sets the current normal for this mesh.
* [normalizeNormals](#H3DU.Mesh_normalizeNormals)<br>Modifies this mesh by converting the normals it defines
to "unit vectors" ("normalized" vectors with a length of 1).
* [primitiveCount](#H3DU.Mesh_primitiveCount)<br>Gets the number of primitives (triangles, lines,
or points) that this mesh contains.
* [recalcNormals](#H3DU.Mesh_recalcNormals)<br><b>Deprecated: Use <code>new H3DU.MeshBuffer(this).recalcNormals()</code> instead.</b>
* [recalcTangents](#H3DU.Mesh_recalcTangents)<br><b>Deprecated: Deprecated because the default shader no longer
uses tangent and bitangent attributes for normal mapping. This method
may be reimplemented in the <a href="H3DU.MeshBuffer.md">H3DU.MeshBuffer</a> class in the future.</b>
* [reverseNormals](#H3DU.Mesh_reverseNormals)<br>Modifies this mesh by reversing the sign of normals it defines.
* [reverseWinding](#H3DU.Mesh_reverseWinding)<br>Reverses the winding order of the triangles in this mesh
by swapping the second and third vertex indices of each one.
* [setColor3](#H3DU.Mesh_setColor3)<br>Sets all the vertices in this mesh to the given color.
* [setVertex](#H3DU.Mesh_setVertex)<br>Sets the X, Y, and Z coordinates of the vertex with the
given index.
* [setVertexNormal](#H3DU.Mesh_setVertexNormal)<br>Sets the normal associated with the vertex with the
given index.
* [tangent3](#H3DU.Mesh_tangent3)<br><b>Deprecated: Deprecated because the default shader no longer
uses tangent and bitangent attributes for normal mapping. To define
tangent vectors for a mesh, use the <a href="H3DU.MeshBuffer.md">H3DU.MeshBuffer</a> class
and create a buffer attribute with the H3DU.Semantics.TANGENT
semantic.</b>
* [texCoord2](#H3DU.Mesh_texCoord2)<br>Sets the current texture coordinates for this mesh.
* [toWireFrame](#H3DU.Mesh_toWireFrame)<br>Converts this mesh to a new mesh with triangles converted
to line segments.
* [transform](#H3DU.Mesh_transform)<br><b>Deprecated: Use <code>new H3DU.MeshBuffer(this).transform()</code> instead.</b>
* [vertex2](#H3DU.Mesh_vertex2)<br>Adds a new vertex to this mesh.
* [vertex3](#H3DU.Mesh_vertex3)<br>Adds a new vertex to this mesh.
* [vertexCount](#H3DU.Mesh_vertexCount)<br>Gets the number of vertices included in this mesh.

<a name='H3DU.Mesh.BITANGENTS_BIT'></a>
### H3DU.Mesh.BITANGENTS_BIT (constant)

<b>Deprecated: Deprecated because the default shader no longer
uses tangent and bitangent attributes for normal mapping. To define
bitangent vectors for a mesh, use the <a href="H3DU.MeshBuffer.md">H3DU.MeshBuffer</a> class
and create a buffer attribute with the H3DU.Semantics.BITANGENT
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
and create a buffer attribute with the H3DU.Semantics.TANGENT
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

<a name='H3DU.Mesh_bitangent3'></a>
### H3DU.Mesh#bitangent3(x, y, z)

<b>Deprecated: Deprecated because the default shader no longer
uses tangent and bitangent attributes for normal mapping. To define
bitangent vectors for a mesh, use the <a href="H3DU.MeshBuffer.md">H3DU.MeshBuffer</a> class
and create a buffer attribute with the H3DU.Semantics.BITANGENT
semantic.</b>

Sets the current bitangent vector for this mesh. Future vertex positions
defined (with vertex3()) will have this bitangent. The new current
bitangent will apply to future vertices even if the current mode
is TRIANGLE_FAN and some vertices were already given for
that mode. The bitangent passed to this method will
not automatically be normalized to unit length.

#### Parameters

* `x` (Type: number)<br>X coordinate of the bitangent vector. If "y" and "z" are null or omitted, this is instead a 3-element array giving the X, Y, and Z coordinates, or a single number giving the coordinate for all three dimensions.
* `y` (Type: number)<br>Y coordinate of the bitangent vector. If "x" is an array, this parameter may be omitted.
* `z` (Type: number)<br>Z coordinate of the bitangent vector. If "x" is an array, this parameter may be omitted.

#### Return Value

This object. (Type: <a href="H3DU.Mesh.md">H3DU.Mesh</a>)

<a name='H3DU.Mesh_color3'></a>
### H3DU.Mesh#color3(r, g, b)

Sets the current color for this mesh. Future vertex positions
defined (with vertex3()) will have this color. The new current
color will apply to future vertices even if the current mode
is TRIANGLE_FAN and some vertices were already given for
that mode. Only the red, green, and blue components will be used.

#### Parameters

* `r` (Type: Array.&lt;number> | number | string)<br>A <a href="H3DU.md#H3DU.toGLColor">color vector or string</a>, or the red color component (0-1).
* `g` (Type: number)<br>Green color component (0-1). May be null or omitted if a string or array is given as the "r" parameter.
* `b` (Type: number)<br>Blue color component (0-1). May be null or omitted if a string or array is given as the "r" parameter.

#### Return Value

This object. (Type: <a href="H3DU.Mesh.md">H3DU.Mesh</a>)

<a name='H3DU.Mesh_enumPrimitives'></a>
### H3DU.Mesh#enumPrimitives(func)

Enumerates the primitives (lines, triangles, and points) included
in this mesh.

#### Parameters

* `func` (Type: function)<br>A function that will be called for each primitive in the mesh. The function takes a single parameter, consisting of an array of one, two, or three vertex objects. A point will have one vertex, a line two vertices and a triangle three. Each vertex object may have these properties:<ul> <li>"position": A 3-element array of the vertex's position. Always present. <li>"normal": A 3-element array of the vertex's normal. May be absent. <li>"color": An at least 3-element array of the vertex's color. Each component generally ranges from 0 to 1. May be absent. <li>"uv": A 2-element array of the vertex's texture coordinates (the first element is U, the second is V). Each component generally ranges from 0 to 1. May be absent. </ul>

#### Return Value

This object. (Type: <a href="H3DU.Mesh.md">H3DU.Mesh</a>)

<a name='H3DU.Mesh_getBoundingBox'></a>
### H3DU.Mesh#getBoundingBox()

<b>Deprecated: Use <code>new H3DU.MeshBuffer(this).getBounds()</code> instead.</b>

Finds the tightest axis-aligned
bounding box that holds all vertices in the mesh.

#### Return Value

An array of six numbers describing the tightest
axis-aligned bounding box
that fits all vertices in the mesh. The first three numbers
are the smallest-valued X, Y, and Z coordinates, and the
last three are the largest-valued X, Y, and Z coordinates.
If the mesh is empty, returns the array [Inf, Inf, Inf, -Inf,
-Inf, -Inf]. (Type: Array.&lt;number>)

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

<a name='H3DU.Mesh_merge'></a>
### H3DU.Mesh#merge(other)

<b>Deprecated: Use <code>new H3DU.MeshBuffer(mesh).merge(other)</code> instead.</b>

Merges the vertices from another mesh into this one.
The vertices from the other mesh will be copied into this one,
and the other mesh's indices copied or adapted.
Also, resets the primitive
mode (see <a href="H3DU.Mesh.md#H3DU.Mesh_mode">H3DU.Mesh#mode</a>) so that future vertices given
will not build upon previous vertices.

#### Parameters

* `other` (Type: <a href="H3DU.Mesh.md">H3DU.Mesh</a>)<br>A mesh to merge into this one. The mesh given in this parameter will remain unchanged. Throws an error if this mesh's primitive type is incompatible with the the other mesh's primitive type (for example, a triangle type with LINE_STRIP).

#### Return Value

This object. (Type: <a href="H3DU.Mesh.md">H3DU.Mesh</a>)

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
### H3DU.Mesh#normal3(x, y, z)

Sets the current normal for this mesh. Future vertex positions
defined (with vertex3()) will have this normal. The new current
normal will apply to future vertices even if the current mode
is TRIANGLE_FAN and some vertices were already given for
that mode. The normal passed to this method will
not automatically be normalized to unit length.

#### Parameters

* `x` (Type: number)<br>X coordinate of the normal. If "y" and "z" are null or omitted, this is instead a 3-element array giving the X, Y, and Z coordinates, or a single number giving the coordinate for all three dimensions.
* `y` (Type: number)<br>Y coordinate of the normal. If "x" is an array, this parameter may be omitted.
* `z` (Type: number)<br>Z coordinate of the normal. If "x" is an array, this parameter may be omitted.

#### Return Value

This object. (Type: <a href="H3DU.Mesh.md">H3DU.Mesh</a>)

<a name='H3DU.Mesh_normalizeNormals'></a>
### H3DU.Mesh#normalizeNormals()

Modifies this mesh by converting the normals it defines
to "unit vectors" ("normalized" vectors with a length of 1).

#### Return Value

This object. (Type: <a href="H3DU.Mesh.md">H3DU.Mesh</a>)

<a name='H3DU.Mesh_primitiveCount'></a>
### H3DU.Mesh#primitiveCount()

Gets the number of primitives (triangles, lines,
or points) that this mesh contains.

#### Return Value

Return value. (Type: number)

<a name='H3DU.Mesh_recalcNormals'></a>
### H3DU.Mesh#recalcNormals(flat, inward)

<b>Deprecated: Use <code>new H3DU.MeshBuffer(this).recalcNormals()</code> instead.</b>

Recalculates the normal vectors for triangles
in this mesh. For this to properly affect shading, each triangle in
the mesh must have its vertices defined in
counterclockwise order (if the triangle is being rendered
in a right-handed coordinate system). Each normal calculated will
be normalized to have a length of 1 (unless the normal is (0,0,0)).

#### Parameters

* `flat` (Type: Boolean)<br>If true, each triangle in the mesh will have the same normal, which usually leads to a flat appearance. If false, each unique vertex in the mesh will have its own normal, which usually leads to a smooth appearance.
* `inward` (Type: Boolean)<br>If true, the generated normals will point inward; otherwise, outward.

#### Return Value

This object. (Type: <a href="H3DU.Mesh.md">H3DU.Mesh</a>)

<a name='H3DU.Mesh_recalcTangents'></a>
### H3DU.Mesh#recalcTangents()

<b>Deprecated: Deprecated because the default shader no longer
uses tangent and bitangent attributes for normal mapping. This method
may be reimplemented in the <a href="H3DU.MeshBuffer.md">H3DU.MeshBuffer</a> class in the future.</b>

Recalculates the tangent and bitangent vectors for triangles
in this mesh. This method only has an effect if this mesh
includes normals and texture coordinates.

#### Return Value

This object. (Type: <a href="H3DU.Mesh.md">H3DU.Mesh</a>)

<a name='H3DU.Mesh_reverseNormals'></a>
### H3DU.Mesh#reverseNormals()

Modifies this mesh by reversing the sign of normals it defines.
If this mesh defines normals, also resets the primitive
mode (see <a href="H3DU.Mesh.md#H3DU.Mesh_mode">H3DU.Mesh#mode</a>) so that future vertices given
will not build upon previous vertices.

#### Return Value

This object. (Type: <a href="H3DU.Mesh.md">H3DU.Mesh</a>)

<a name='H3DU.Mesh_reverseWinding'></a>
### H3DU.Mesh#reverseWinding()

Reverses the winding order of the triangles in this mesh
by swapping the second and third vertex indices of each one.

#### Return Value

This object. (Type: <a href="H3DU.Mesh.md">H3DU.Mesh</a>)

#### Example

The following code generates a mesh that survives face culling,
since the same triangles occur on each side of the mesh, but
with different winding orders. This is useful when enabling
back-face culling and drawing open geometric shapes such as
those generated by H3DU.Meshes.createCylinder or H3DU.Meshes.createDisk.
Due to the z-fighting effect, drawing this kind of mesh is
recommended only if face culling is enabled.

    var frontBackMesh = originalMesh.merge(
    new H3DU.Mesh().merge(originalMesh).reverseWinding()
    );

<a name='H3DU.Mesh_setColor3'></a>
### H3DU.Mesh#setColor3(r, g, b)

Sets all the vertices in this mesh to the given color.
This method doesn't change this mesh's current color.
Only the color's red, green, and blue components will be used.

#### Parameters

* `r` (Type: Array.&lt;number> | number | string)<br>A <a href="H3DU.md#H3DU.toGLColor">color vector or string</a>, or the red color component (0-1).
* `g` (Type: number)<br>Green component of the color (0-1). May be null or omitted if a string is given as the "r" parameter.
* `b` (Type: number)<br>Blue component of the color (0-1). May be null or omitted if a string is given as the "r" parameter.

#### Return Value

This object. (Type: <a href="H3DU.Mesh.md">H3DU.Mesh</a>)

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

<a name='H3DU.Mesh_tangent3'></a>
### H3DU.Mesh#tangent3(x, y, z)

<b>Deprecated: Deprecated because the default shader no longer
uses tangent and bitangent attributes for normal mapping. To define
tangent vectors for a mesh, use the <a href="H3DU.MeshBuffer.md">H3DU.MeshBuffer</a> class
and create a buffer attribute with the H3DU.Semantics.TANGENT
semantic.</b>

Sets the current tangent vector for this mesh. Future vertex positions
defined (with vertex3()) will have this normal. The new current
tangent will apply to future vertices even if the current mode
is TRIANGLE_FAN and some vertices were already given for
that mode. The tangent passed to this method will
not automatically be normalized to unit length.

#### Parameters

* `x` (Type: number)<br>X coordinate of the tangent vector. If "y" and "z" are null or omitted, this is instead a 3-element array giving the X, Y, and Z coordinates, or a single number giving the coordinate for all three dimensions.
* `y` (Type: number)<br>Y coordinate of the tangent vector. If "x" is an array, this parameter may be omitted.
* `z` (Type: number)<br>Z coordinate of the tangent vector. If "x" is an array, this parameter may be omitted.

#### Return Value

This object. (Type: <a href="H3DU.Mesh.md">H3DU.Mesh</a>)

<a name='H3DU.Mesh_texCoord2'></a>
### H3DU.Mesh#texCoord2(u, v)

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

* `u` (Type: number)<br>X coordinate of the texture, from 0-1. If "v" are null or omitted, this is instead a 3-element array giving the X and Y coordinates, or a single number giving the coordinate for all three dimensions.
* `v` (Type: number)<br>Y coordinate of the texture, from 0-1. If "u" is an array, this parameter can be omitted.

#### Return Value

This object. (Type: <a href="H3DU.Mesh.md">H3DU.Mesh</a>)

<a name='H3DU.Mesh_toWireFrame'></a>
### H3DU.Mesh#toWireFrame()

Converts this mesh to a new mesh with triangles converted
to line segments. The new mesh will reuse the vertices
contained in this one without copying the vertices. If the mesh consists
of points or line segments, it will remain
unchanged.

#### Return Value

A new mesh with triangles converted
to lines. (Type: <a href="H3DU.Mesh.md">H3DU.Mesh</a>)

<a name='H3DU.Mesh_transform'></a>
### H3DU.Mesh#transform(matrix)

<b>Deprecated: Use <code>new H3DU.MeshBuffer(this).transform()</code> instead.</b>

Transforms the positions and normals of all the vertices currently
in this mesh. The matrix won't affect vertices added afterwards, and
won't affect other attributes, including tangents and bitangents.
Also, resets the primitive
mode (see <a href="H3DU.Mesh.md#H3DU.Mesh_mode">H3DU.Mesh#mode</a>) so that future vertices given
will not build upon previous vertices. Future vertices should not be
added after calling this method without calling mode() first.

#### Parameters

* `matrix` (Type: Array.&lt;number>)<br>A 4x4 matrix described in the <a href="H3DU.Math.md#H3DU.Math.mat4projectVec3">H3DU.Math.mat4projectVec3</a> method. The normals will be transformed using the 3x3 inverse transpose of this matrix (see <a href="H3DU.Math.md#H3DU.Math.mat4inverseTranspose3">H3DU.Math.mat4inverseTranspose3</a>). (Normals need to be transformed specially because they describe directions, not points.)

#### Return Value

This object. (Type: <a href="H3DU.Mesh.md">H3DU.Mesh</a>)

<a name='H3DU.Mesh_vertex2'></a>
### H3DU.Mesh#vertex2(x, y)

Adds a new vertex to this mesh. The Z coordinate will
be treated as 0.

#### Parameters

* `x` (Type: Array.&lt;number> | number)<br>The X coordinate. If "y" is null or omitted, this is instead a 3-element array giving the X, Y, and Z coordinates, or a single number giving the coordinate for all three dimensions.
* `y` (Type: number)<br>The Y coordinate. If "x" is an array, this parameter may be omitted.

#### Return Value

This object. (Type: <a href="H3DU.Mesh.md">H3DU.Mesh</a>)

<a name='H3DU.Mesh_vertex3'></a>
### H3DU.Mesh#vertex3(x, y, z)

Adds a new vertex to this mesh. If appropriate, adds an
additional face index according to this mesh's current mode.
The vertex will adopt this mesh's current normal, color,
and texture coordinates if they have been defined.

#### Parameters

* `x` (Type: Array.&lt;number> | number)<br>The X coordinate. If "y" and "z" are null or omitted, this is instead a 3-element array giving the X, Y, and Z coordinates, or a single number giving the coordinate for all three dimensions.
* `y` (Type: number)<br>The Y coordinate. If "x" is an array, this parameter may be omitted.
* `z` (Type: number)<br>The Z coordinate. If "x" is an array, this parameter may be omitted.

#### Return Value

This object. (Type: <a href="H3DU.Mesh.md">H3DU.Mesh</a>)

<a name='H3DU.Mesh_vertexCount'></a>
### H3DU.Mesh#vertexCount()

Gets the number of vertices included in this mesh.

#### Return Value

Return value. (Type: number)

[Back to documentation index.](index.md)

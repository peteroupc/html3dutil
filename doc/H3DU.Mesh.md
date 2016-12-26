# H3DU.Mesh

[Back to documentation index.](index.md)

### H3DU.Mesh([vertices], [indices], [format]) <a id='H3DU.Mesh'></a>

Specifies the triangles, lines, or points that make up a geometric shape.
Each vertex, that is, each point, each end of a line, and each corner
of a triangle, can also specify the following attributes:
<ul>
<li>A color, which is a set of 3 values each ranging from 0 to 1 (the red, green,
and blue components, respectively.)
<li>A normal vector, which is a set of 3 values.
Normal values are required for lighting to work properly.
<li>A tangent vector, which is a set of 3 values.
<li>A bitangent vector, which is a set of 3 values.
<li>Texture coordinates, which are a set of 2 values each ranging from 0 to
1, where (0, 0) is the lower right corner of the texture (by default), and (1, 1) is the upper
right corner (by default).
</ul>
For bump mapping to work properly, a mesh needs to define
normals, tangents, bitangents, and texture coordinates.

See the "<a href="tutorial-shapes.md">Creating Shapes</a>" and "<a href="tutorial-meshexamples.md">Examples of Creating Meshes on the Fly</a>" tutorials.

NOTE: Previous versions of this class allowed meshes to contain more than one
primitive type (triangles, lines, and points are the primitive types). This is
no longer the case, to simplify the implementation.

#### Parameters

* `vertices` (Type: Array.&lt;Number>) (optional)<br>
    An array that contains data on each vertex of the mesh. Each vertex is made up of the same number of elements, as defined in format. May be null or omitted, in which case an empty vertex array is used.
* `indices` (Type: Array.&lt;Number>) (optional)<br>
    An array of vertex indices. Each trio of indices specifies a separate triangle, or each pair of indices specifies a line segment. If null or omitted, creates an initially empty mesh.
* `format` (Type: Number) (optional)<br>
    A set of bit flags depending on the kind of data each vertex contains. Each vertex contains 3 elements plus:<ul> <li> 3 more elements if H3DU.Mesh.NORMALS_BIT is set, plus <li> 3 more elements if H3DU.Mesh.COLORS_BIT is set, plus <li> 2 more elements if H3DU.Mesh.TEXCOORDS_BIT is set.</ul> If H3DU.Mesh.LINES_BIT is set, each vertex index specifies a point of a line segment. If H3DU.Mesh.POINTS_BIT is set, each vertex index specifies an individual point. Both bits can't be set. May be null or omitted, in which case "format" is set to 0.

### Members

* [.BITANGENTS_BIT](#H3DU.Mesh.BITANGENTS_BIT)
* [.COLORS_BIT](#H3DU.Mesh.COLORS_BIT)
* [.LINES](#H3DU.Mesh.LINES)
* [.LINES_BIT](#H3DU.Mesh.LINES_BIT)
* [.LINE_STRIP](#H3DU.Mesh.LINE_STRIP)
* [.NORMALS_BIT](#H3DU.Mesh.NORMALS_BIT)
* [.POINTS](#H3DU.Mesh.POINTS)
* [.POINTS_BIT](#H3DU.Mesh.POINTS_BIT)
* [.QUADS](#H3DU.Mesh.QUADS)
* [.QUAD_STRIP](#H3DU.Mesh.QUAD_STRIP)
* [.TANGENTS_BIT](#H3DU.Mesh.TANGENTS_BIT)
* [.TEXCOORDS_BIT](#H3DU.Mesh.TEXCOORDS_BIT)
* [.TRIANGLES](#H3DU.Mesh.TRIANGLES)
* [.TRIANGLE_FAN](#H3DU.Mesh.TRIANGLE_FAN)
* [.TRIANGLE_STRIP](#H3DU.Mesh.TRIANGLE_STRIP)

### Methods

* [bitangent3](#H3DU.Mesh_H3DU.Mesh_bitangent3)
* [color3](#H3DU.Mesh_H3DU.Mesh_color3)
* [enumPrimitives](#H3DU.Mesh_H3DU.Mesh_enumPrimitives)
* [getBoundingBox](#H3DU.Mesh_H3DU.Mesh_getBoundingBox)
* [getVertex](#H3DU.Mesh_H3DU.Mesh_getVertex)
* [getVertexNormal](#H3DU.Mesh_H3DU.Mesh_getVertexNormal)
* [merge](#H3DU.Mesh_H3DU.Mesh_merge)
* [mode](#H3DU.Mesh_H3DU.Mesh_mode)
* [normal3](#H3DU.Mesh_H3DU.Mesh_normal3)
* [normalizeNormals](#H3DU.Mesh_H3DU.Mesh_normalizeNormals)
* [primitiveCount](#H3DU.Mesh_H3DU.Mesh_primitiveCount)
* [recalcNormals](#H3DU.Mesh_H3DU.Mesh_recalcNormals)
* [recalcTangents](#H3DU.Mesh_H3DU.Mesh_recalcTangents)
* [reverseNormals](#H3DU.Mesh_H3DU.Mesh_reverseNormals)
* [reverseWinding](#H3DU.Mesh_H3DU.Mesh_reverseWinding)
* [setColor3](#H3DU.Mesh_H3DU.Mesh_setColor3)
* [setVertex](#H3DU.Mesh_H3DU.Mesh_setVertex)
* [setVertexNormal](#H3DU.Mesh_H3DU.Mesh_setVertexNormal)
* [tangent3](#H3DU.Mesh_H3DU.Mesh_tangent3)
* [texCoord2](#H3DU.Mesh_H3DU.Mesh_texCoord2)
* [toWireFrame](#H3DU.Mesh_H3DU.Mesh_toWireFrame)
* [transform](#H3DU.Mesh_H3DU.Mesh_transform)
* [vertex2](#H3DU.Mesh_H3DU.Mesh_vertex2)
* [vertex3](#H3DU.Mesh_H3DU.Mesh_vertex3)
* [vertexCount](#H3DU.Mesh_vertexCount)

### H3DU.Mesh.BITANGENTS_BIT <a id='H3DU.Mesh.BITANGENTS_BIT'></a> (constant)

The mesh contains bitangent vectors for each vertex.

Default Value: `16`

### H3DU.Mesh.COLORS_BIT <a id='H3DU.Mesh.COLORS_BIT'></a> (constant)

The mesh contains colors for each vertex.

Default Value: `2`

### H3DU.Mesh.LINES <a id='H3DU.Mesh.LINES'></a> (constant)

Primitive mode for rendering line segments, made up
of 2 vertices each.

### H3DU.Mesh.LINES_BIT <a id='H3DU.Mesh.LINES_BIT'></a> (constant)

The mesh consists of lines (2 vertices per line) instead
of triangles (3 vertices per line).

Default Value: `256`

### H3DU.Mesh.LINE_STRIP <a id='H3DU.Mesh.LINE_STRIP'></a> (constant)

Primitive mode for rendering connected line segments.
The first 2 vertices make up the first line, and each additional
line is made up of the last vertex and 1 new vertex.

Default Value: `3`

### H3DU.Mesh.NORMALS_BIT <a id='H3DU.Mesh.NORMALS_BIT'></a> (constant)

The mesh contains normals for each vertex.

Default Value: `1`

### H3DU.Mesh.POINTS <a id='H3DU.Mesh.POINTS'></a> (constant)

Primitive mode for rendering points, made up
of 1 vertex each.

Default Value: `0`

### H3DU.Mesh.POINTS_BIT <a id='H3DU.Mesh.POINTS_BIT'></a> (constant)

The mesh consists of points (1 vertex per line).

Default Value: `512`

### H3DU.Mesh.QUADS <a id='H3DU.Mesh.QUADS'></a> (constant)

Primitive mode for rendering quadrilaterals, made up
of 4 vertices each. Each quadrilateral is broken into two triangles: the first
triangle consists of the first, second, and third vertices, in that order,
and the second triangle consists of the first, third, and fourth
vertices, in that order.

Default Value: `7`

### H3DU.Mesh.QUAD_STRIP <a id='H3DU.Mesh.QUAD_STRIP'></a> (constant)

Primitive mode for rendering a strip of quadrilaterals (quads).
The first 4 vertices make up the first quad, and each additional
quad is made up of the last 2 vertices of the previous quad and
2 new vertices. Each quad is broken into two triangles: the first
triangle consists of the first, second, and third vertices, in that order,
and the second triangle consists of the third, second, and fourth
vertices, in that order.

Default Value: `8`

### H3DU.Mesh.TANGENTS_BIT <a id='H3DU.Mesh.TANGENTS_BIT'></a> (constant)

The mesh contains tangent vectors for each vertex.

Default Value: `8`

### H3DU.Mesh.TEXCOORDS_BIT <a id='H3DU.Mesh.TEXCOORDS_BIT'></a> (constant)

The mesh contains texture coordinates for each vertex.

Default Value: `4`

### H3DU.Mesh.TRIANGLES <a id='H3DU.Mesh.TRIANGLES'></a> (constant)

Primitive mode for rendering triangles, made up
of 3 vertices each.

Default Value: `4`

### H3DU.Mesh.TRIANGLE_FAN <a id='H3DU.Mesh.TRIANGLE_FAN'></a> (constant)

Primitive mode for rendering a triangle fan. The first 3
vertices make up the first triangle, and each additional
triangle is made up of the first vertex of the first triangle,
the previous vertex, and 1 new vertex.

Default Value: `6`

### H3DU.Mesh.TRIANGLE_STRIP <a id='H3DU.Mesh.TRIANGLE_STRIP'></a> (constant)

Primitive mode for rendering a triangle strip. The first 3
vertices make up the first triangle, and each additional
triangle is made up of the last 2 vertices and 1
new vertex. For the second triangle in the strip, and
every other triangle after that, the first and second
vertices are swapped when generating that triangle.

Default Value: `5`

### H3DU.Mesh#bitangent3(x, y, z) <a id='H3DU.Mesh_H3DU.Mesh_bitangent3'></a>

Sets the current bitangent vector for this mesh. Future vertex positions
defined (with vertex3()) will have this bitangent. The new current
bitangent will apply to future vertices even if the current mode
is TRIANGLE_FAN and some vertices were already given for
that mode. The bitangent passed to this method will
not automatically be normalized to unit length.

#### Parameters

* `x` (Type: Number)<br>
    X-coordinate of the bitangent vector. If "y" and "z" are null or omitted, this is instead a 3-element array giving the X, Y, and Z coordinates, or a single number giving the coordinate for all three dimensions.
* `y` (Type: Number)<br>
    Y-coordinate of the bitangent vector. If "x" is an array, this parameter may be omitted.
* `z` (Type: Number)<br>
    Z-coordinate of the bitangent vector. If "x" is an array, this parameter may be omitted.

#### Return Value

This object. (Type: <a href="H3DU.Mesh.md">H3DU.Mesh</a>)

### H3DU.Mesh#color3(r, g, b) <a id='H3DU.Mesh_H3DU.Mesh_color3'></a>

Sets the current color for this mesh. Future vertex positions
defined (with vertex3()) will have this color. The new current
color will apply to future vertices even if the current mode
is TRIANGLE_FAN and some vertices were already given for
that mode. Only the red, green, and blue components will be used.

#### Parameters

* `r` (Type: Array.&lt;Number> | number | string)<br>
    A <a href="H3DU.md#H3DU.toGLColor">color vector or string</a>, or the red color component (0-1).
* `g` (Type: Number)<br>
    Green color component (0-1). May be null or omitted if a string or array is given as the "r" parameter.
* `b` (Type: Number)<br>
    Blue color component (0-1). May be null or omitted if a string or array is given as the "r" parameter.

#### Return Value

This object. (Type: <a href="H3DU.Mesh.md">H3DU.Mesh</a>)

### H3DU.Mesh#enumPrimitives(func) <a id='H3DU.Mesh_H3DU.Mesh_enumPrimitives'></a>

Enumerates the primitives (lines, triangles, and points) included
in this mesh.

#### Parameters

* `func` (Type: function)<br>
    A function that will be called for each primitive in the mesh. The function takes a single parameter, consisting of an array of one, two, or three vertex objects. A point will have one vertex, a line two vertices and a triangle three. Each vertex object may have these properties:<ul> <li>"position": A 3-element array of the vertex's position. Always present. <li>"normal": A 3-element array of the vertex's normal. May be absent. <li>"color": An at least 3-element array of the vertex's color. Each component generally ranges from 0 to 1. May be absent. <li>"uv": A 2-element array of the vertex's texture coordinates (the first element is U, the second is V). Each component generally ranges from 0 to 1. May be absent. </ul>

#### Return Value

This object. (Type: <a href="H3DU.Mesh.md">H3DU.Mesh</a>)

### H3DU.Mesh#getBoundingBox() <a id='H3DU.Mesh_H3DU.Mesh_getBoundingBox'></a>

Finds the tightest axis-aligned
bounding box that holds all vertices in the mesh.

#### Return Value

An array of six numbers describing the tightest
axis-aligned bounding box
that fits all vertices in the mesh. The first three numbers
are the smallest-valued X, Y, and Z coordinates, and the
last three are the largest-valued X, Y, and Z coordinates.
If the mesh is empty, returns the array [Inf, Inf, Inf, -Inf,
-Inf, -Inf]. (Type: Array.&lt;Number>)

### H3DU.Mesh#getVertex(index) <a id='H3DU.Mesh_H3DU.Mesh_getVertex'></a>

Gets the position of the vertex with the given
index in this mesh.

#### Parameters

* `index` (Type: Number)<br>
    Zero-based index of the vertex to get. The index ranges from 0 to less than the number of vertices in the mesh, not the number of vertex indices.

#### Return Value

A 3-element array giving
the X, Y, and Z coordinates, respectively, of the vertex
position, or null if the index is less than 0 or
equals the number of vertices in this mesh or greater. (Type: Array.&lt;Number>)

### H3DU.Mesh#getVertexNormal(index) <a id='H3DU.Mesh_H3DU.Mesh_getVertexNormal'></a>

Gets the normal of the vertex with the given
index in this mesh.

#### Parameters

* `index` (Type: Number)<br>
    Zero-based index of the vertex normal to get. The index ranges from 0 to less than the number of vertices in the mesh, not the number of vertex indices.

#### Return Value

A 3-element array giving
the X, Y, and Z coordinates, respectively, of the vertex
normal, or null if the index is less than 0 or
equals the number of vertices in this mesh or greater.
Returns (0,0,0) if the given vertex exists but doesn't define
a normal. (Type: Array.&lt;Number>)

### H3DU.Mesh#merge(other) <a id='H3DU.Mesh_H3DU.Mesh_merge'></a>

Merges the vertices from another mesh into this one.
The vertices from the other mesh will be copied into this one,
and the other mesh's indices copied or adapted.
Also, resets the primitive
mode (see H3DU.Mesh#mode) so that future vertices given
will not build upon previous vertices.

#### Parameters

* `other` (Type: <a href="H3DU.Mesh.md">H3DU.Mesh</a>)<br>
    A mesh to merge into this one. The mesh given in this parameter will remain unchanged. Throws an error if this mesh's primitive type is incompatible with the the other mesh's primitive type (for example, a triangle type with LINE_STRIP).

#### Return Value

This object. (Type: <a href="H3DU.Mesh.md">H3DU.Mesh</a>)

#### Example

    // Use the following idiom to make a copy of a geometric mesh:
    var copiedMesh = new H3DU.Mesh().merge(meshToCopy);

### H3DU.Mesh#mode(m) <a id='H3DU.Mesh_H3DU.Mesh_mode'></a>

Changes the primitive mode for this mesh.
Future vertices will be drawn as primitives of the new type.
The primitive type can be set to the same mode, in which
case future vertices given will not build upon previous
vertices.

An H3DU.Mesh object can contain primitives of different
types, such as triangles and lines. For example, it's allowed
to have a mesh with triangles, then call this method, say,
with <code>H3DU.Mesh.LINE_STRIP</code> to add line segments
to that mesh. However, this functionality may be deprecated
in future versions.

#### Parameters

* `m` (Type: Number)<br>
    A primitive type. One of the following: H3DU.Mesh.TRIANGLES, H3DU.Mesh.LINES, H3DU.Mesh.LINE_STRIP, H3DU.Mesh.TRIANGLE_STRIP, H3DU.Mesh.TRIANGLE_FAN, H3DU.Mesh.QUADS, H3DU.Mesh.QUAD_STRIP. Throws an error if the primitive type is incompatible with the current primitive type (for example, a triangle type with LINE_STRIP).

#### Return Value

This object. (Type: <a href="H3DU.Mesh.md">H3DU.Mesh</a>)

### H3DU.Mesh#normal3(x, y, z) <a id='H3DU.Mesh_H3DU.Mesh_normal3'></a>

Sets the current normal for this mesh. Future vertex positions
defined (with vertex3()) will have this normal. The new current
normal will apply to future vertices even if the current mode
is TRIANGLE_FAN and some vertices were already given for
that mode. The normal passed to this method will
not automatically be normalized to unit length.

#### Parameters

* `x` (Type: Number)<br>
    X-coordinate of the normal. If "y" and "z" are null or omitted, this is instead a 3-element array giving the X, Y, and Z coordinates, or a single number giving the coordinate for all three dimensions.
* `y` (Type: Number)<br>
    Y-coordinate of the normal. If "x" is an array, this parameter may be omitted.
* `z` (Type: Number)<br>
    Z-coordinate of the normal. If "x" is an array, this parameter may be omitted.

#### Return Value

This object. (Type: <a href="H3DU.Mesh.md">H3DU.Mesh</a>)

### H3DU.Mesh#normalizeNormals() <a id='H3DU.Mesh_H3DU.Mesh_normalizeNormals'></a>

Modifies this mesh by normalizing the normals it defines
to unit length.

#### Return Value

This object. (Type: <a href="H3DU.Mesh.md">H3DU.Mesh</a>)

### H3DU.Mesh#primitiveCount() <a id='H3DU.Mesh_H3DU.Mesh_primitiveCount'></a>

Gets the number of primitives (triangles, lines,
or points) composed by all shapes in this mesh.

#### Return Value

Return value. (Type: Number)

### H3DU.Mesh#recalcNormals(flat, inward) <a id='H3DU.Mesh_H3DU.Mesh_recalcNormals'></a>

Recalculates the normal vectors for triangles
in this mesh. For this to properly affect shading, each triangle in
the mesh must have its vertices defined in
counterclockwise order. Each normal calculated will
be normalized to have a length of 1 (unless the normal is (0,0,0)).

#### Parameters

* `flat` (Type: Boolean)<br>
    If true, each triangle in the mesh will have the same normal, which usually leads to a flat appearance. If false, each unique vertex in the mesh will have its own normal, which usually leads to a smooth appearance.
* `inward` (Type: Boolean)<br>
    If true, the generated normals will point inward; otherwise, outward.

#### Return Value

This object. (Type: <a href="H3DU.Mesh.md">H3DU.Mesh</a>)

### H3DU.Mesh#recalcTangents() <a id='H3DU.Mesh_H3DU.Mesh_recalcTangents'></a>

Recalculates the tangent vectors for triangles
in this mesh. Tangent vectors are required for
normal mapping (bump mapping) to work.
This method only affects those parts of the mesh
that define normals and texture coordinates.

#### Return Value

This object. (Type: <a href="H3DU.Mesh.md">H3DU.Mesh</a>)

### H3DU.Mesh#reverseNormals() <a id='H3DU.Mesh_H3DU.Mesh_reverseNormals'></a>

Modifies this mesh by reversing the sign of normals it defines.

#### Return Value

This object. (Type: <a href="H3DU.Mesh.md">H3DU.Mesh</a>)

#### Example

The following code generates a two-sided mesh, where
the normals on each side face in the opposite direction.
This is only useful when drawing open geometric shapes such as
those generated by H3DU.Meshes.createCylinder or H3DU.Meshes.createDisk.
Due to the z-fighting effect, drawing a two-sided mesh is
recommended only if face culling is enabled.

    var twoSidedMesh = originalMesh.merge(
     new H3DU.Mesh().merge(originalMesh).reverseWinding().reverseNormals()
    );

### H3DU.Mesh#reverseWinding() <a id='H3DU.Mesh_H3DU.Mesh_reverseWinding'></a>

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

### H3DU.Mesh#setColor3(r, g, b) <a id='H3DU.Mesh_H3DU.Mesh_setColor3'></a>

Sets all the vertices in this mesh to the given color.
This method doesn't change this mesh's current color.
Only the color's red, green, and blue components will be used.

#### Parameters

* `r` (Type: Array.&lt;Number> | number | string)<br>
    A <a href="H3DU.md#H3DU.toGLColor">color vector or string</a>, or the red color component (0-1).
* `g` (Type: Number)<br>
    Green component of the color (0-1). May be null or omitted if a string is given as the "r" parameter.
* `b` (Type: Number)<br>
    Blue component of the color (0-1). May be null or omitted if a string is given as the "r" parameter.

#### Return Value

This object. (Type: <a href="H3DU.Mesh.md">H3DU.Mesh</a>)

### H3DU.Mesh#setVertex(index, x, y, z) <a id='H3DU.Mesh_H3DU.Mesh_setVertex'></a>

Sets the X, Y, and Z coordinates of the vertex with the
given index. Has no effect if the index is less than 0 or
equals the number of vertices in this mesh or greater.

#### Parameters

* `index` (Type: Number)<br>
    Zero-based index of the vertex to set. The index ranges from 0 to less than the number of vertices in the mesh, not the number of vertex indices.
* `x` (Type: number | Array.&lt;Number>)<br>
    X coordinate of the vertex position. Can also be a 3-element array giving the X, Y, and Z coordinates, respectively, of the vertex position.
* `y` (Type: Number)<br>
    Y coordinate of the vertex position. May be null or omitted if "x" is an array.
* `z` (Type: Number)<br>
    Z coordinate of the vertex position. May be null or omitted if "x" is an array.

#### Return Value

This object. (Type: <a href="H3DU.Mesh.md">H3DU.Mesh</a>)

### H3DU.Mesh#setVertexNormal(index, x, y, z) <a id='H3DU.Mesh_H3DU.Mesh_setVertexNormal'></a>

Sets the normal associated with the vertex with the
given index. Has no effect if the index is less than 0 or
equals the number of vertices in this mesh or greater.

#### Parameters

* `index` (Type: Number)<br>
    Zero-based index of the vertex to set. The index ranges from 0 to less than the number of vertices in the mesh, not the number of vertex indices.
* `x` (Type: number | Array.&lt;Number>)<br>
    X coordinate of the vertex normal. Can also be a 3-element array giving the X, Y, and Z coordinates, respectively, of the vertex normal.
* `y` (Type: Number)<br>
    Y coordinate of the vertex normal. May be null or omitted if "x" is an array.
* `z` (Type: Number)<br>
    Z coordinate of the vertex normal. May be null or omitted if "x" is an array.

#### Return Value

This object. (Type: <a href="H3DU.Mesh.md">H3DU.Mesh</a>)

### H3DU.Mesh#tangent3(x, y, z) <a id='H3DU.Mesh_H3DU.Mesh_tangent3'></a>

Sets the current tangent vector for this mesh. Future vertex positions
defined (with vertex3()) will have this normal. The new current
tangent will apply to future vertices even if the current mode
is TRIANGLE_FAN and some vertices were already given for
that mode. The tangent passed to this method will
not automatically be normalized to unit length.

#### Parameters

* `x` (Type: Number)<br>
    X-coordinate of the tangent vector. If "y" and "z" are null or omitted, this is instead a 3-element array giving the X, Y, and Z coordinates, or a single number giving the coordinate for all three dimensions.
* `y` (Type: Number)<br>
    Y-coordinate of the tangent vector. If "x" is an array, this parameter may be omitted.
* `z` (Type: Number)<br>
    Z-coordinate of the tangent vector. If "x" is an array, this parameter may be omitted.

#### Return Value

This object. (Type: <a href="H3DU.Mesh.md">H3DU.Mesh</a>)

### H3DU.Mesh#texCoord2(u, v) <a id='H3DU.Mesh_H3DU.Mesh_texCoord2'></a>

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

* `u` (Type: Number)<br>
    X-coordinate of the texture, from 0-1. If "v" are null or omitted, this is instead a 3-element array giving the X and Y coordinates, or a single number giving the coordinate for all three dimensions.
* `v` (Type: Number)<br>
    Y-coordinate of the texture, from 0-1. If "u" is an array, this parameter can be omitted.

#### Return Value

This object. (Type: <a href="H3DU.Mesh.md">H3DU.Mesh</a>)

### H3DU.Mesh#toWireFrame() <a id='H3DU.Mesh_H3DU.Mesh_toWireFrame'></a>

Converts this mesh to a new mesh with triangles converted
to line segments. The new mesh will reuse the vertices
contained in this one without copying the vertices. If the mesh consists
of points or line segments, it will remain
unchanged.

#### Return Value

A new mesh with triangles converted
to lines. (Type: <a href="H3DU.Mesh.md">H3DU.Mesh</a>)

### H3DU.Mesh#transform(matrix) <a id='H3DU.Mesh_H3DU.Mesh_transform'></a>

Transforms the positions and normals of all the vertices currently
in this mesh, using a 4x4 matrix. The matrix won't affect
vertices added afterwards. Also, resets the primitive
mode (see H3DU.Mesh#mode) so that future vertices given
will not build upon previous vertices. Future vertices should not be
added after calling this method without calling mode() first.

#### Parameters

* `matrix` (Type: Array.&lt;Number>)<br>
    A 4x4 matrix describing the transformation.

#### Return Value

This object. (Type: <a href="H3DU.Mesh.md">H3DU.Mesh</a>)

### H3DU.Mesh#vertex2(x, y) <a id='H3DU.Mesh_H3DU.Mesh_vertex2'></a>

Adds a new vertex to this mesh. The Z-coordinate will
be treated as 0.

#### Parameters

* `x` (Type: Array.&lt;Number> | number)<br>
    The X-coordinate. If "y" is null or omitted, this is instead a 3-element array giving the X, Y, and Z coordinates, or a single number giving the coordinate for all three dimensions.
* `y` (Type: Number)<br>
    The Y-coordinate. If "x" is an array, this parameter may be omitted.

#### Return Value

This object. (Type: <a href="H3DU.Mesh.md">H3DU.Mesh</a>)

### H3DU.Mesh#vertex3(x, y, z) <a id='H3DU.Mesh_H3DU.Mesh_vertex3'></a>

Adds a new vertex to this mesh. If appropriate, adds an
additional face index according to this mesh's current mode.
The vertex will adopt this mesh's current normal, color,
and texture coordinates if they have been defined.

#### Parameters

* `x` (Type: Array.&lt;Number> | number)<br>
    The X-coordinate. If "y" and "z" are null or omitted, this is instead a 3-element array giving the X, Y, and Z coordinates, or a single number giving the coordinate for all three dimensions.
* `y` (Type: Number)<br>
    The Y-coordinate. If "x" is an array, this parameter may be omitted.
* `z` (Type: Number)<br>
    The Z-coordinate. If "x" is an array, this parameter may be omitted.

#### Return Value

This object. (Type: <a href="H3DU.Mesh.md">H3DU.Mesh</a>)

### H3DU.Mesh#vertexCount() <a id='H3DU.Mesh_vertexCount'></a>

Gets the number of vertices included in this mesh.

#### Return Value

Return value. (Type: Number)

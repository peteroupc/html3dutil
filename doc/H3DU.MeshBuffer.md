# H3DU.MeshBuffer

[Back to documentation index.](index.md)

<a name='H3DU.MeshBuffer'></a>
### H3DU.MeshBuffer([mesh])

A geometric mesh in the form of buffer objects.

#### Parameters

* `mesh` (Type: <a href="H3DU.Mesh.md">H3DU.Mesh</a>) (optional)<br>A geometric mesh object. A series of default attributes will be set based on that mesh's data. If null or omitted, an empty mesh buffer will be generated.

### Methods

* [getAttribute](#H3DU.MeshBuffer_getAttribute)<br>TODO: Not documented yet.
* [getBounds](#H3DU.MeshBuffer_getBounds)<br>Finds the tightest
bounding box that holds all vertices in the mesh buffer.
* [getIndices](#H3DU.MeshBuffer_getIndices)<br>Gets the array of vertex indices used by this mesh buffer.
* [getPositions](#H3DU.MeshBuffer_getPositions)<br>Gets an array of vertex positions held by this mesh buffer,
arranged by primitive
* [merge](#H3DU.MeshBuffer_merge)<br>TODO: Not documented yet.
* [primitiveCount](#H3DU.MeshBuffer_primitiveCount)<br>Gets the number of primitives (triangles, lines,
and points) composed by all shapes in this mesh.
* [primitiveType](#H3DU.MeshBuffer_primitiveType)<br>Gets the type of primitive stored in this mesh buffer.
* [recalcNormals](#H3DU.MeshBuffer_recalcNormals)<br>Recalculates the normal vectors for triangles
in this mesh.
* [reverseNormals](#H3DU.MeshBuffer_reverseNormals)<br>Modifies this mesh buffer by reversing the sign of normals it defines.
* [setAttribute](#H3DU.MeshBuffer_setAttribute)<br>Adds information about a buffer attribute to this
mesh buffer (or sets an
existing attribute's information).
* [setIndices](#H3DU.MeshBuffer_setIndices)<br>Sets the array of vertex indices used by this mesh buffer.
* [setPrimitiveType](#H3DU.MeshBuffer_setPrimitiveType)<br>Sets the type of graphics primitives stored in this mesh buffer.
* [transform](#H3DU.MeshBuffer_transform)<br>Transforms the positions and normals of all the vertices currently
in this mesh.
* [vertexCount](#H3DU.MeshBuffer_vertexCount)<br>Gets the number of vertices in this mesh buffer
* [vertexIndices](#H3DU.MeshBuffer_vertexIndices)<br>Gets the vertex indices of a given primitive (triangle, line,
or point) in this mesh buffer.

<a name='H3DU.MeshBuffer_getAttribute'></a>
### H3DU.MeshBuffer#getAttribute(name, index)

TODO: Not documented yet.

#### Parameters

* `name` (Type: Number | string)<br>An attribute semantic, such as <a href="H3DU.Semantic.md#H3DU.Semantic.POSITION">H3DU.Semantic.POSITION</a>, "POSITION", or "TEXCOORD_0".
* `index` (Type: number)<br>The set index of the attribute for the given semantic. 0 is the first index of the attribute, 1 is the second, and so on. This is ignored if "name" is a string.

#### Return Value

Return value. (Type: *)

<a name='H3DU.MeshBuffer_getBounds'></a>
### H3DU.MeshBuffer#getBounds()

Finds the tightest
bounding box that holds all vertices in the mesh buffer.

#### Return Value

An array of six numbers describing the tightest
axis-aligned bounding box
that fits all vertices in the mesh. The first three numbers
are the smallest-valued X, Y, and Z coordinates, and the
last three are the largest-valued X, Y, and Z coordinates.
This calculation uses the attribute with the semantic POSITION
and set index 0. If there is no such attribute,
or no vertices are defined in this buffer, returns the array
[Inf, Inf, Inf, -Inf, -Inf, -Inf]. (Type: Array.&lt;number>)

<a name='H3DU.MeshBuffer_getIndices'></a>
### H3DU.MeshBuffer#getIndices()

Gets the array of vertex indices used by this mesh buffer.

#### Return Value

Return value. (Type: Uint16Array | Uint32Array | Uint8Array)

<a name='H3DU.MeshBuffer_getPositions'></a>
### H3DU.MeshBuffer#getPositions()

Gets an array of vertex positions held by this mesh buffer,
arranged by primitive

#### Return Value

An array of primitives,
each of which holds the vertices that make up that primitive.
If this mesh holds triangles, each primitive will contain three
vertices; if lines, two; and if points, one. Each vertex is an at least 3-element
array containing that vertex's X, Y, and Z coordinates, in that order. (Type: Array.&lt;Array.&lt;number>>)

<a name='H3DU.MeshBuffer_merge'></a>
### H3DU.MeshBuffer#merge(other)

TODO: Not documented yet.

#### Parameters

* `other` (Type: *)

#### Return Value

Return value. (Type: *)

#### Example

    var copiedMesh = new H3DU.MeshBuffer().merge(meshToCopy);

<a name='H3DU.MeshBuffer_primitiveCount'></a>
### H3DU.MeshBuffer#primitiveCount()

Gets the number of primitives (triangles, lines,
and points) composed by all shapes in this mesh.

#### Return Value

Return value. (Type: number)

<a name='H3DU.MeshBuffer_primitiveType'></a>
### H3DU.MeshBuffer#primitiveType()

Gets the type of primitive stored in this mesh buffer.

#### Return Value

Either <a href="H3DU.Mesh.md#H3DU.Mesh.TRIANGLES">H3DU.Mesh.TRIANGLES</a>,
<a href="H3DU.Mesh.md#H3DU.Mesh.LINES">H3DU.Mesh.LINES</a>, or <a href="H3DU.Mesh.md#H3DU.Mesh.POINTS">H3DU.Mesh.POINTS</a>. (Type: number)

<a name='H3DU.MeshBuffer_recalcNormals'></a>
### H3DU.MeshBuffer#recalcNormals(flat, inward)

Recalculates the normal vectors for triangles
in this mesh. For this to properly affect shading, each triangle in
the mesh must have its vertices defined in
counterclockwise order (if the triangle is being rendered
in a right-handed coordinate system). Each normal calculated will
be normalized to have a length of 1 (unless the normal is (0,0,0)).
Will have an effect only if the position vector is at least 3 elements
long. If the normal vector exists, but is not at least 3 elements long,
this method will have no effect.

#### Parameters

* `flat` (Type: Boolean)<br>If true, each triangle in the mesh will have the same normal, which usually leads to a flat appearance. If false, each unique vertex in the mesh will have its own normal, which usually leads to a smooth appearance.
* `inward` (Type: Boolean)<br>If true, the generated normals will point inward; otherwise, outward.

#### Return Value

This object. (Type: <a href="H3DU.Mesh.md">H3DU.Mesh</a>)

<a name='H3DU.MeshBuffer_reverseNormals'></a>
### H3DU.MeshBuffer#reverseNormals()

Modifies this mesh buffer by reversing the sign of normals it defines.
Has no effect if this mesh buffer doesn't define any normals.

#### Return Value

This object. (Type: <a href="H3DU.MeshBuffer.md">H3DU.MeshBuffer</a>)

#### Example

The following code generates a two-sided mesh, where
the normals on each side face in the opposite direction.
This is only useful when drawing open geometric shapes, such as open
cylinders and two-dimensional planar shapes.
Due to the z-fighting effect, drawing a two-sided mesh is
recommended only if face culling is enabled.
TODO: Implement reverseWinding.

    var twoSidedMesh = originalMesh.merge(
    new H3DU.Mesh().merge(originalMesh).reverseWinding().reverseNormals()
    );

<a name='H3DU.MeshBuffer_setAttribute'></a>
### H3DU.MeshBuffer#setAttribute(name, index, buffer, startIndex, countPerVertex, stride)

Adds information about a buffer attribute to this
mesh buffer (or sets an
existing attribute's information). An attribute
gives information about the per-vertex data used and
stored in a vertex buffer.

#### Parameters

* `name` (Type: Number | string)<br>An attribute semantic, such as <a href="H3DU.Semantic.md#H3DU.Semantic.POSITION">H3DU.Semantic.POSITION</a>, "POSITION", or "TEXCOORD_0".
* `index` (Type: number)<br>The set index of the attribute for the given semantic. 0 is the first index of the attribute, 1 is the second, and so on. This is ignored if "name" is a string.
* `buffer` (Type: Float32Array | Array)<br>The buffer where the per-vertex data is stored.
* `startIndex` (Type: number)<br>The index into the array (starting from 0) where the first per-vertex item starts.
* `countPerVertex` (Type: number)<br>The number of elements in each per-vertex item. For example, if each vertex is a 3-element vector, this value is 3.
* `stride` (Type: number)<br>The number of elements from the start of one per-vertex item to the start of the next.

#### Return Value

This object.Throws an error if the given
semantic is unsupported. (Type: <a href="H3DU.MeshBuffer.md">H3DU.MeshBuffer</a>)

<a name='H3DU.MeshBuffer_setIndices'></a>
### H3DU.MeshBuffer#setIndices(indices)

Sets the array of vertex indices used by this mesh buffer.

#### Parameters

* `indices` (Type: Uint16Array | Uint32Array | Uint8Array)<br>Array of vertex indices.

#### Return Value

This object. (Type: <a href="H3DU.MeshBuffer.md">H3DU.MeshBuffer</a>)

<a name='H3DU.MeshBuffer_setPrimitiveType'></a>
### H3DU.MeshBuffer#setPrimitiveType(primType)

Sets the type of graphics primitives stored in this mesh buffer.

#### Parameters

* `primType` (Type: number)<br>The primitive type, either <a href="H3DU.Mesh.md#H3DU.Mesh.TRIANGLES">H3DU.Mesh.TRIANGLES</a>, <a href="H3DU.Mesh.md#H3DU.Mesh.LINES">H3DU.Mesh.LINES</a>, or <a href="H3DU.Mesh.md#H3DU.Mesh.POINTS">H3DU.Mesh.POINTS</a>.

#### Return Value

This object. (Type: <a href="H3DU.MeshBuffer.md">H3DU.MeshBuffer</a>)

<a name='H3DU.MeshBuffer_transform'></a>
### H3DU.MeshBuffer#transform(matrix)

Transforms the positions and normals of all the vertices currently
in this mesh. The matrix won't affect other attributes, including tangents and bitangents.

#### Parameters

* `matrix` (Type: Array.&lt;number>)<br>A 4x4 matrix described in the <a href="H3DU.Math.md#H3DU.Math.mat4projectVec3">H3DU.Math.mat4projectVec3</a> method. The normals will be transformed using the 3x3 inverse transpose of this matrix (see <a href="H3DU.Math.md#H3DU.Math.mat4inverseTranspose3">H3DU.Math.mat4inverseTranspose3</a>). (Normals need to be transformed specially because they describe directions, not points.)

#### Return Value

This object. (Type: <a href="H3DU.MeshBuffer.md">H3DU.MeshBuffer</a>)

<a name='H3DU.MeshBuffer_vertexCount'></a>
### H3DU.MeshBuffer#vertexCount()

Gets the number of vertices in this mesh buffer

#### Return Value

Return value. (Type: number)

<a name='H3DU.MeshBuffer_vertexIndices'></a>
### H3DU.MeshBuffer#vertexIndices(primitiveIndex, ret)

Gets the vertex indices of a given primitive (triangle, line,
or point) in this mesh buffer.

#### Parameters

* `primitiveIndex` (Type: number)<br>The index (counting from 0) of the primitive whose indices will be retrieved.
* `ret` (Type: Array.&lt;number>)<br>An array where the vertex indices for the given primitive will be stored. If this mesh buffer stores triangles, three indices will be stored; if lines, two; and if points, one.

#### Return Value

The parameter "ret". (Type: Array.&lt;number>)

[Back to documentation index.](index.md)

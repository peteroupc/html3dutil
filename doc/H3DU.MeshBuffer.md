# H3DU.MeshBuffer

[Back to documentation index.](index.md)

<a name='H3DU.MeshBuffer'></a>
### H3DU.MeshBuffer(mesh)

A geometric mesh in the form of buffer objects.

#### Parameters

* `mesh` (Type: <a href="H3DU.Mesh.md">H3DU.Mesh</a>)<br>A geometric mesh object. A series of default attributes will be set based on that mesh's data.

### Methods

* [getBounds](#H3DU.MeshBuffer_getBounds)<br>Finds the tightest
bounding box that holds all vertices in the mesh buffer.
* [getPositions](#H3DU.MeshBuffer_getPositions)<br>Gets an array of vertex positions held by this mesh buffer,
arranged by primitive
* [primitiveCount](#H3DU.MeshBuffer_primitiveCount)<br>Gets the number of primitives (triangles, lines,
and points) composed by all shapes in this mesh.
* [primitiveType](#H3DU.MeshBuffer_primitiveType)<br>Gets the type of primitive stored in this mesh buffer.
* [setAttribute](#H3DU.MeshBuffer_setAttribute)<br>Adds information about a buffer attribute to this
mesh buffer (or sets an
existing attribute's information).
* [setIndices](#H3DU.MeshBuffer_setIndices)<br>Sets the array of vertex indices used by this mesh buffer.
* [setPrimitiveType](#H3DU.MeshBuffer_setPrimitiveType)<br>Sets the type of graphics primitives stored in this mesh buffer.
* [vertexCount](#H3DU.MeshBuffer_vertexCount)<br>Gets the number of vertices in this mesh buffer

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

<a name='H3DU.MeshBuffer_getPositions'></a>
### H3DU.MeshBuffer#getPositions()

Gets an array of vertex positions held by this mesh buffer,
arranged by primitive

#### Return Value

An array of primitives,
each of which holds the vertices that make up that primitive.
If this mesh holds triangles, each primitive will contain three
vertices; if lines, two; and if points, one. Each vertex is a 3-element
array containing that vertex's X, Y, and Z coordinates, in that order. (Type: Array.&lt;Array.&lt;number>>)

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

Either <a href="H3DU.Mesh.md#H3DU.Mesh.md">H3DU.Mesh.TRIANGLES</a>,
<a href="H3DU.Mesh.md#H3DU.Mesh.LINES">H3DU.Mesh.LINES</a>, or <a href="H3DU.Mesh.md#H3DU.Mesh.POINTS">H3DU.Mesh.POINTS</a>. (Type: number)

<a name='H3DU.MeshBuffer_setAttribute'></a>
### H3DU.MeshBuffer#setAttribute(name, index, buffer, startIndex, countPerVertex, stride)

Adds information about a buffer attribute to this
mesh buffer (or sets an
existing attribute's information). An attribute
gives information about the per-vertex data used and
stored in a vertex buffer.

#### Parameters

* `name` (Type: Number | string)<br>An attribute semantic, such as <a href="H3DU.Semantic.md#H3DU.Semantic.md">H3DU.Semantic.POSITION</a>, "POSITION", or "TEXCOORD_0".
* `index` (Type: number)<br>The set index of the attribute for the given semantic. 0 is the first index of the attribute, 1 is the second, and so on. This is ignored if "name" is a string.
* `buffer` (Type: Float32Array | Array)<br>The buffer where the per-vertex data is stored.
* `startIndex` (Type: number)<br>The index into the array (starting from 0) where the first per-vertex item starts.
* `countPerVertex` (Type: number)<br>The number of elements in each per-vertex item. For example, if each vertex is a 3-element vector, this value is 3.
* `stride` (Type: number)<br>The number of elements from the start of one per-vertex item to the start of the next.

#### Return Value

This object.Throws an error if the given
semantic is unsupported. (Type: <a href="H3DU.MeshBuffer.md">H3DU.MeshBuffer</a>)

<a name='H3DU.MeshBuffer_setIndices'></a>
### H3DU.MeshBuffer#setIndices(indices, byteSize)

Sets the array of vertex indices used by this mesh buffer.

#### Parameters

* `indices` (Type: Uint16Array | Uint32Array | Uint8Array)<br>Array of vertex indices.
* `byteSize` (Type: number)<br>Size, in bytes, of each index. Must be 1, 2, or 4.

#### Return Value

This object. (Type: <a href="H3DU.MeshBuffer.md">H3DU.MeshBuffer</a>)

<a name='H3DU.MeshBuffer_setPrimitiveType'></a>
### H3DU.MeshBuffer#setPrimitiveType(primType)

Sets the type of graphics primitives stored in this mesh buffer.

#### Parameters

* `primType` (Type: number)<br>The primitive type, either <a href="H3DU.Mesh.md#H3DU.Mesh.md">H3DU.Mesh.TRIANGLES</a>, <a href="H3DU.Mesh.md#H3DU.Mesh.LINES">H3DU.Mesh.LINES</a>, or <a href="H3DU.Mesh.md#H3DU.Mesh.POINTS">H3DU.Mesh.POINTS</a>.

#### Return Value

This object. (Type: <a href="H3DU.MeshBuffer.md">H3DU.MeshBuffer</a>)

<a name='H3DU.MeshBuffer_vertexCount'></a>
### H3DU.MeshBuffer#vertexCount()

Gets the number of vertices in this mesh buffer

#### Return Value

Return value. (Type: number)

[Back to documentation index.](index.md)

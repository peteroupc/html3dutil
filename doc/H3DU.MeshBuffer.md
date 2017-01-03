# H3DU.MeshBuffer

[Back to documentation index.](index.md)

### H3DU.MeshBuffer(mesh) <a id='H3DU.MeshBuffer'></a>

A geometric mesh in the form of buffer objects.

#### Parameters

* `mesh` (Type: <a href="H3DU.Mesh.md">H3DU.Mesh</a>)<br>
    A geometric mesh object. A series of default attributes will be set based on that mesh's data.

### Methods

* [getBounds](#H3DU.MeshBuffer_H3DU.MeshBuffer_getBounds)<br>Finds the tightest
bounding box that holds all vertices in the mesh buffer.
* [getFormat](#H3DU.MeshBuffer_H3DU.MeshBuffer_getFormat)
* [primitiveCount](#H3DU.MeshBuffer_H3DU.MeshBuffer_primitiveCount)<br>Gets the number of primitives (triangles, lines,
and points) composed by all shapes in this mesh.
* [primitiveType](#H3DU.MeshBuffer_H3DU.MeshBuffer_primitiveType)<br>Gets the type of primitive stored in this mesh buffer.
* [setAttribute](#H3DU.MeshBuffer_H3DU.MeshBuffer_setAttribute)<br>Adds information about a buffer attribute to this
mesh buffer (or sets an
existing attribute's information).
* [vertexCount](#H3DU.MeshBuffer_H3DU.MeshBuffer_vertexCount)<br>Gets the number of vertices in this mesh buffer

### H3DU.MeshBuffer#getBounds() <a id='H3DU.MeshBuffer_H3DU.MeshBuffer_getBounds'></a>

Finds the tightest
bounding box that holds all vertices in the mesh buffer.

#### Return Value

An array of six numbers describing the tightest
axis-aligned bounding box
that fits all vertices in the mesh. The first three numbers
are the smallest-valued X, Y, and Z coordinates, and the
last three are the largest-valued X, Y, and Z coordinates.
If the mesh buffer is empty or has no attribute named
"position", returns the array [Inf, Inf, Inf, -Inf,
-Inf, -Inf]. (Type: Array.&lt;Number>)

### H3DU.MeshBuffer#getFormat(name) <a id='H3DU.MeshBuffer_H3DU.MeshBuffer_getFormat'></a>

#### Parameters

* `name` (Type: Object)<br>
    Description of name.

#### Return Value

Return value. (Type: Object)

### H3DU.MeshBuffer#primitiveCount() <a id='H3DU.MeshBuffer_H3DU.MeshBuffer_primitiveCount'></a>

Gets the number of primitives (triangles, lines,
and points) composed by all shapes in this mesh.

#### Return Value

Return value. (Type: Number)

### H3DU.MeshBuffer#primitiveType() <a id='H3DU.MeshBuffer_H3DU.MeshBuffer_primitiveType'></a>

Gets the type of primitive stored in this mesh buffer.

#### Return Value

Either <a href="H3DU.Mesh.md#H3DU.Mesh.TRIANGLES">H3DU.Mesh.TRIANGLES</a>,
 <a href="H3DU.Mesh.md#H3DU.Mesh.LINES">H3DU.Mesh.LINES</a>, or <a href="H3DU.Mesh.md#H3DU.Mesh.POINTS">H3DU.Mesh.POINTS</a>. (Type: Number)

### H3DU.MeshBuffer#setAttribute(name, buffer, startIndex, countPerVertex, stride) <a id='H3DU.MeshBuffer_H3DU.MeshBuffer_setAttribute'></a>

Adds information about a buffer attribute to this
mesh buffer (or sets an
existing attribute's information). An attribute
gives information about the per-vertex data used and
stored in a vertex buffer.

#### Parameters

* `name` (Type: String)<br>
    The name of the attribute.
* `buffer` (Type: Float32Array | Array)<br>
    The buffer where the per-vertex data is stored.
* `startIndex` (Type: Number)<br>
    The index into the array (starting from 0) where the first per-vertex item starts.
* `countPerVertex` (Type: Number)<br>
    The number of elements in each per-vertex item. For example, if each vertex is a 3-element vector, this value is 3.
* `stride` (Type: Number)<br>
    The number of elements from the start of one per-vertex item to the start of the next.

#### Return Value

This object. (Type: <a href="H3DU.MeshBuffer.md">H3DU.MeshBuffer</a>)

### H3DU.MeshBuffer#vertexCount() <a id='H3DU.MeshBuffer_H3DU.MeshBuffer_vertexCount'></a>

Gets the number of vertices in this mesh buffer

#### Return Value

Return value. (Type: Number)

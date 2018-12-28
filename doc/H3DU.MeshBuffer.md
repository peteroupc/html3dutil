# H3DU.MeshBuffer

[Back to documentation index.](index.md)

<a name='H3DU.MeshBuffer'></a>
### H3DU.MeshBuffer()

A geometric mesh in the form of buffer objects.
A mesh buffer is made up of one or more <a href="H3DU.BufferAccessor.md">vertex attribute objects</a>,
and an array of vertex indices. Each vertex attribute object contains
the values of one attribute of the mesh, such as positions,
vertex normals, and texture coordinates. A mesh buffer
can store vertices that make up triangles, line segments, or points.

This constructor creates an empty mesh buffer.

### Methods

* [getAttribute](#H3DU.MeshBuffer_getAttribute)<br>Gets a vertex attribute included in this mesh buffer.
* [getBounds](#H3DU.MeshBuffer_getBounds)<br>Finds the tightest
bounding box that holds all vertices in the mesh buffer.
* [getIndices](#H3DU.MeshBuffer_getIndices)<br>Gets the array of vertex indices used by this mesh buffer.
* [getPositions](#H3DU.MeshBuffer_getPositions)<br>Gets an array of vertex positions held by this mesh buffer,
arranged by primitive.
* [merge](#H3DU.MeshBuffer_merge)<br>Merges the vertices from another mesh into this one.
* [normalizeNormals](#H3DU.MeshBuffer_normalizeNormals)<br>Modifies this mesh buffer by converting the normals it defines to <a href="tutorial-glmath.md">unit vectors</a>
("normalized" vectors with a length of 1).
* [primitiveCount](#H3DU.MeshBuffer_primitiveCount)<br>Gets the number of primitives (triangles, lines,
and points) composed by all shapes in this mesh.
* [primitiveType](#H3DU.MeshBuffer_primitiveType)<br>Gets the type of primitive stored in this mesh buffer.
* [recalcNormals](#H3DU.MeshBuffer_recalcNormals)<br>Recalculates the normal vectors for triangles
in this mesh.
* [reverseNormals](#H3DU.MeshBuffer_reverseNormals)<br>Modifies this mesh buffer by reversing the sign of normals it defines.
* [reverseWinding](#H3DU.MeshBuffer_reverseWinding)<br>Reverses the winding order of the triangles in this mesh buffer
by swapping the second and third vertex indices of each one.
* [setAttribute](#H3DU.MeshBuffer_setAttribute)<br>Adds information about a buffer attribute to this
mesh buffer (or sets an
existing attribute's information).
* [setAttributeEx](#H3DU.MeshBuffer_setAttributeEx)<br>Adds information about a buffer attribute to this
mesh buffer (or sets an
existing attribute's information), taking a semantic index as
an additional parameter.
* [setColor](#H3DU.MeshBuffer_setColor)<br>Sets all the vertices in this mesh to the given color, by
assigning each value with the attribute semantic <code>COLOR</code>
to the given color.
* [setColor3](#H3DU.MeshBuffer_setColor3)<br><b>Deprecated: Use <a href="H3DU.MeshBuffer.md#H3DU.MeshBuffer_setColor">H3DU.MeshBuffer#setColor</a> instead.</b>
* [setIndices](#H3DU.MeshBuffer_setIndices)<br>Sets the vertex indices used by this mesh buffer.
* [setPrimitiveType](#H3DU.MeshBuffer_setPrimitiveType)<br>Sets the type of graphics primitives stored in this mesh buffer.
* [toWireFrame](#H3DU.MeshBuffer_toWireFrame)<br><b>Deprecated: Included here for compatibility with <a href="H3DU.Mesh.md">H3DU.Mesh</a>.
Use H3DU.MeshBuffer.wireFrame instead.</b>
* [transform](#H3DU.MeshBuffer_transform)<br>Transforms the positions and normals of all the vertices currently
in this mesh.
* [vertexCount](#H3DU.MeshBuffer_vertexCount)<br>Gets the number of vertices in this mesh buffer, that
is, the number of vertex indices in its index buffer (some of which
may be duplicates).
* [vertexIndices](#H3DU.MeshBuffer_vertexIndices)<br>Gets the vertex indices of a given primitive (triangle, line,
or point) in this mesh buffer.
* [wireFrame](#H3DU.MeshBuffer_wireFrame)<br>Converts the triangles in this mesh to line segments.

<a name='H3DU.MeshBuffer_getAttribute'></a>
### H3DU.MeshBuffer#getAttribute(name, [semanticIndex])

Gets a vertex attribute included in this mesh buffer.

#### Parameters

* `name` (Type: number | string)<br>An attribute semantic, such as <a href="H3DU.Semantic.md#H3DU.Semantic.POSITION">H3DU.Semantic.POSITION</a>, "POSITION", or "TEXCOORD_0". Throws an error if this value is a string and the string is invalid.
* `semanticIndex` (Type: number) (optional)<br>The set index of the attribute for the given semantic. 0 is the first index of the attribute, 1 is the second, and so on. This is ignored if "name" is a string. Otherwise, if null or omitted, the default value is 0.

#### Return Value

A vertex buffer accessor, or null
if the attribute doesn't exist. (Type: <a href="H3DU.BufferAccessor.md">H3DU.BufferAccessor</a>)

#### Example

The following function gets the positions,
normals, texture coordinates, and colors of each primitive
(line, text, or point) in the mesh buffer. A point will have one
vertex per primitive, a line two vertices and a triangle three.
The attributes, if present, will be stored in the "position",
"normal", "uv", and "color" properties of each vertex.

    function getPrimitives(mesh) {
    var p=mesh.getAttribute("POSITION")
    var n=mesh.getAttribute("NORMAL")
    var t=mesh.getAttribute("TEXCOORD_0")
    var c=mesh.getAttribute("COLOR")
    var ind=mesh.getIndices()
    var primSize = 3;
    if(mesh.primitiveType() === Mesh.LINES)primSize = 2;
    if(mesh.primitiveType() === Mesh.POINTS)primSize = 1;
    var ret=[]
    for(var i=0;i<ind.length;i+=primSize) {
    var prim=[]
    var index=ind[i]
    for(var j=0;j<primSize;j++) {
    var info={}
    if(p)info.position=p.getVec(index,[])
    if(n)info.normal=n.getVec(index,[])
    if(t)info.uv=t.getVec(index,[])
    if(c)info.color=c.getVec(index,[])
    }
    ret.push(prim)
    }
    return ret
    }

<a name='H3DU.MeshBuffer_getBounds'></a>
### H3DU.MeshBuffer#getBounds()

Finds the tightest
bounding box that holds all vertices in the mesh buffer.
Only positions with attribute semantic <code>POSITION</code> are
used in the bounding box calculation.

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
arranged by primitive.
Only values with the attribute semantic <code>POSITION_0</code> are returned.

#### Return Value

An array of primitives,
each of which holds the vertices that make up that primitive.
If this mesh holds triangles, each primitive will contain three
vertices; if lines, two; and if points, one. Each vertex is an at least 3-element
array containing that vertex's X, Y, and Z coordinates, in that order. (Type: Array.&lt;Array.&lt;number>>)

<a name='H3DU.MeshBuffer_merge'></a>
### H3DU.MeshBuffer#merge(other)

Merges the vertices from another mesh into this one.
The vertices from the other mesh will be copied into this one,
and the other mesh's indices copied or adapted.

#### Parameters

* `other` (Type: <a href="H3DU.MeshBuffer.md">H3DU.MeshBuffer</a>)<br>A mesh to merge into this one. The mesh given in this parameter will remain unchanged. Throws an error if this mesh's primitive type is not the same as the other mesh's primitive type.

#### Return Value

This object. (Type: <a href="H3DU.MeshBuffer.md">H3DU.MeshBuffer</a>)

#### Example

    var copiedMesh = new H3DU.MeshBuffer().merge(meshToCopy);

<a name='H3DU.MeshBuffer_normalizeNormals'></a>
### H3DU.MeshBuffer#normalizeNormals()

Modifies this mesh buffer by converting the normals it defines to <a href="tutorial-glmath.md">unit vectors</a>
("normalized" vectors with a length of 1).
Has no effect if this mesh buffer doesn't define any normals.
All attributes with the semantic <code>NORMAL</code>,
regardless of semantic index, are affected.

#### Return Value

This object. (Type: <a href="H3DU.MeshBuffer.md">H3DU.MeshBuffer</a>)

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
be normalized to have a length of 1 (unless the normal is (0,0,0)),
and will be stored in an attribute with semantic <code>NORMAL_0</code>.
Will have an effect only if the buffer includes an attribute with
semantic <code>POSITION_0</code> and each of that attribute's values is at least 3 elements
long. If the buffer already includes an attribute with semantic <code>NORMAL_0</code>,
ensures its values are each at least 3 elements long.

#### Parameters

* `flat` (Type: Boolean)<br>If true, each triangle in the mesh will have the same normal, which usually leads to a flat appearance. If false, each unique vertex in the mesh will have its own normal, which usually leads to a smooth appearance.
* `inward` (Type: Boolean)<br>If true, the generated normals will point inward; otherwise, outward.

#### Return Value

This object. (Type: <a href="H3DU.MeshBuffer.md">H3DU.MeshBuffer</a>)

<a name='H3DU.MeshBuffer_reverseNormals'></a>
### H3DU.MeshBuffer#reverseNormals()

Modifies this mesh buffer by reversing the sign of normals it defines.
Has no effect if this mesh buffer doesn't define any normals.
All attributes with the semantic <code>NORMAL</code>,
regardless of semantic index, are affected.

#### Return Value

This object. (Type: <a href="H3DU.MeshBuffer.md">H3DU.MeshBuffer</a>)

#### Example

The following code generates a two-sided mesh, where
the normals on each side face in the opposite direction.
This is only useful when drawing open geometric shapes, such as open
cylinders and two-dimensional planar shapes.
Due to the z-fighting effect, drawing a two-sided mesh is
recommended only if face culling is enabled.

    var twoSidedMesh = originalMesh.merge(
    new H3DU.MeshBuffer().merge(originalMesh).reverseWinding().reverseNormals()
    );

<a name='H3DU.MeshBuffer_reverseWinding'></a>
### H3DU.MeshBuffer#reverseWinding()

Reverses the winding order of the triangles in this mesh buffer
by swapping the second and third vertex indices of each one.
Has an effect only if this mesh buffer consists of triangles.

#### Return Value

This object. (Type: <a href="H3DU.MeshBuffer.md">H3DU.MeshBuffer</a>)

#### Example

The following code generates a mesh that survives face culling,
since the same triangles occur on each side of the mesh, but
with different winding orders. This is useful when enabling
This is only useful when drawing open geometric shapes, such as open
cylinders and two-dimensional planar shapes.
Due to the z-fighting effect, drawing this kind of mesh is
recommended only if face culling is enabled.

    var frontBackMesh = originalMesh.merge(
    new H3DU.MeshBuffer().merge(originalMesh).reverseWinding()
    );

<a name='H3DU.MeshBuffer_setAttribute'></a>
### H3DU.MeshBuffer#setAttribute(name, buffer, countPerValue, [offset], [stride])

Adds information about a buffer attribute to this
mesh buffer (or sets an
existing attribute's information). An attribute
gives information about the per-vertex data used and
stored in a vertex buffer.

#### Parameters

* `name` (Type: number | string)<br>An attribute semantic, such as <a href="H3DU.Semantic.md#H3DU.Semantic.POSITION">H3DU.Semantic.POSITION</a>, "POSITION", or "TEXCOORD_0". Throws an error if this value is a string and the string is invalid. If this isn't a string, the set index of the attribute will be 0 (see <a href="H3DU.MeshBuffer.md#H3DU.MeshBuffer_setAttributeEx">H3DU.MeshBuffer#setAttributeEx</a>).
* `buffer` (Type: Float32Array | Array)<br>The buffer where the per-vertex data is stored. See <a href="H3DU.MeshBuffer.md#H3DU.MeshBuffer_setAttributeEx">H3DU.MeshBuffer#setAttributeEx</a>.
* `countPerValue` (Type: number)<br>The number of elements in each per-vertex item. See <a href="H3DU.MeshBuffer.md#H3DU.MeshBuffer_setAttributeEx">H3DU.MeshBuffer#setAttributeEx</a>.
* `offset` (Type: number) (optional)<br>The index into the array (starting from 0) where the first per-vertex item starts.See <a href="H3DU.MeshBuffer.md#H3DU.MeshBuffer_setAttributeEx">H3DU.MeshBuffer#setAttributeEx</a>.
* `stride` (Type: number) (optional)<br>The number of elements from the start of one per-vertex item to the start of the next. See <a href="H3DU.MeshBuffer.md#H3DU.MeshBuffer_setAttributeEx">H3DU.MeshBuffer#setAttributeEx</a>.

#### Return Value

This object. Throws an error if the given
semantic is unsupported. (Type: <a href="H3DU.MeshBuffer.md">H3DU.MeshBuffer</a>)

<a name='H3DU.MeshBuffer_setAttributeEx'></a>
### H3DU.MeshBuffer#setAttributeEx(name, index, buffer, [countPerValue], [offset], [stride])

Adds information about a buffer attribute to this
mesh buffer (or sets an
existing attribute's information), taking a semantic index as
an additional parameter. An attribute
gives information about the per-vertex data used and
stored in a vertex buffer.

#### Parameters

* `name` (Type: number | string)<br>An attribute semantic, such as <a href="H3DU.Semantic.md#H3DU.Semantic.POSITION">H3DU.Semantic.POSITION</a>, "POSITION", or "TEXCOORD_0". Throws an error if this value is a string and the string is invalid.
* `index` (Type: number)<br>The semantic index of the attribute for the given semantic. 0 is the first index of the attribute, 1 is the second, and so on. This is ignored if "name" is a string.
* `buffer` (Type: Float32Array | Array | BufferAccessor)<br>The buffer where the per-vertex data is stored.
* `countPerValue` (Type: number) (optional)<br>The number of elements in each per-vertex item. For example, if each vertex is a 3-element vector, this value is 3. Throws an error if this value is 0 or less. If "buffer" is a <a href="H3DU.BufferAccessor.md">H3DU.BufferAccessor</a>, the value of "countPerValue" is taken from that accessor and this parameter is ignored; this parameter is currently required otherwise.
* `offset` (Type: number) (optional)<br>The index into the array (starting from 0) where the first per-vertex item starts. If null, undefined, or omitted, the default is 0. Throws an error if less than 0. If "buffer" is a <a href="H3DU.BufferAccessor.md">H3DU.BufferAccessor</a>, the value of "offset" is taken from that accessor and this parameter is ignored.
* `stride` (Type: number) (optional)<br>The number of elements from the start of one per-vertex item to the start of the next. If null, undefined, or omitted, this value is the same as "countPerValue". Throws an error if this value is 0 or less. If "buffer" is a <a href="H3DU.BufferAccessor.md">H3DU.BufferAccessor</a>, the value of "stride" is taken from that accessor and this parameter is ignored.

#### Return Value

This object.Throws an error if the given
semantic is unsupported. (Type: <a href="H3DU.MeshBuffer.md">H3DU.MeshBuffer</a>)

<a name='H3DU.MeshBuffer_setColor'></a>
### H3DU.MeshBuffer#setColor(color)

Sets all the vertices in this mesh to the given color, by
assigning each value with the attribute semantic <code>COLOR</code>
to the given color. (If the attribute's <a href="H3DU.BufferAccessor.md#H3DU.BufferAccessor_countPerValue">count per value</a>
is less than 4, each such value will be set to as many elements of the converted 4-element
color as possible.) If an attribute with the semantic <code>COLOR</code>
doesn't exist, an attribute with the semantic <code>COLOR_0</code> and a count per
value of 3 is created.

All attributes with the semantic <code>COLOR</code>,
regardless of semantic index, are affected by this method.

#### Parameters

* `color` (Type: Array.&lt;number> | number | string)<br>A <a href="H3DU.md#H3DU.toGLColor">color vector or string</a> identifying the color to set. This will be converted to a 4-element color.

#### Return Value

This object. (Type: <a href="H3DU.MeshBuffer.md">H3DU.MeshBuffer</a>)

<a name='H3DU.MeshBuffer_setColor3'></a>
### H3DU.MeshBuffer#setColor3()

<b>Deprecated: Use <a href="H3DU.MeshBuffer.md#H3DU.MeshBuffer_setColor">H3DU.MeshBuffer#setColor</a> instead.</b>

Alias for the <a href="H3DU.MeshBuffer.md#H3DU.MeshBuffer_setColor">H3DU.MeshBuffer#setColor</a> method
for compatibility.

<a name='H3DU.MeshBuffer_setIndices'></a>
### H3DU.MeshBuffer#setIndices(indices)

Sets the vertex indices used by this mesh buffer.

#### Parameters

* `indices` (Type: Array.&lt;number> | Uint16Array | Uint32Array | Uint8Array)<br>Array of vertex indices that the mesh buffer will use.

#### Return Value

This object. (Type: <a href="H3DU.MeshBuffer.md">H3DU.MeshBuffer</a>)

<a name='H3DU.MeshBuffer_setPrimitiveType'></a>
### H3DU.MeshBuffer#setPrimitiveType(primType)

Sets the type of graphics primitives stored in this mesh buffer.

#### Parameters

* `primType` (Type: number)<br>The primitive type, either <a href="H3DU.Mesh.md#H3DU.Mesh.TRIANGLES">H3DU.Mesh.TRIANGLES</a>, <a href="H3DU.Mesh.md#H3DU.Mesh.LINES">H3DU.Mesh.LINES</a>, or <a href="H3DU.Mesh.md#H3DU.Mesh.POINTS">H3DU.Mesh.POINTS</a>.

#### Return Value

This object. (Type: <a href="H3DU.MeshBuffer.md">H3DU.MeshBuffer</a>)

<a name='H3DU.MeshBuffer_toWireFrame'></a>
### H3DU.MeshBuffer#toWireFrame()

<b>Deprecated: Included here for compatibility with <a href="H3DU.Mesh.md">H3DU.Mesh</a>.
Use H3DU.MeshBuffer.wireFrame instead.</b>

Creates a new mesh with triangles converted
to line segments.

#### Return Value

A new mesh with triangles converted
to lines. (Type: <a href="H3DU.MeshBuffer.md">H3DU.MeshBuffer</a>)

<a name='H3DU.MeshBuffer_transform'></a>
### H3DU.MeshBuffer#transform(matrix)

Transforms the positions and normals of all the vertices currently
in this mesh. Only values with the attribute semantic <code>POSITION_0</code>
or <code>NORMAL_0</code> will be affected by this method; values of
other attributes will be unaffected.

#### Parameters

* `matrix` (Type: Array.&lt;number>)<br>A 4x4 matrix described in the <a href="H3DU.Math.md#H3DU.Math.mat4projectVec3">H3DU.Math.mat4projectVec3</a> method. The normals will be transformed using the 3x3 inverse transpose of this matrix (see <a href="H3DU.Math.md#H3DU.Math.mat4inverseTranspose3">H3DU.Math.mat4inverseTranspose3</a>). (Normals need to be transformed specially because they describe directions, not points.)

#### Return Value

This object. (Type: <a href="H3DU.MeshBuffer.md">H3DU.MeshBuffer</a>)

<a name='H3DU.MeshBuffer_vertexCount'></a>
### H3DU.MeshBuffer#vertexCount()

Gets the number of vertices in this mesh buffer, that
is, the number of vertex indices in its index buffer (some of which
may be duplicates).

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

<a name='H3DU.MeshBuffer_wireFrame'></a>
### H3DU.MeshBuffer#wireFrame()

Converts the triangles in this mesh to line segments.
Has no effect if this mesh doesn't use triangles as primitives.

#### Return Value

This object. (Type: <a href="H3DU.MeshBuffer.md">H3DU.MeshBuffer</a>)

[Back to documentation index.](index.md)

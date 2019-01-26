# H3DU.MeshBuffer

[Back to documentation index.](index.md)

<a name='H3DU.MeshBuffer'></a>
### new H3DU.MeshBuffer()

A geometric mesh in the form of buffer objects.
A mesh buffer is made up of one or more vertex attribute objects,
and an optional array of vertex indices. Each vertex attribute object contains
the values of one attribute of the mesh, such as positions,
vertex normals, and texture coordinates. A mesh buffer
can store vertices that make up triangles, line segments, or points.

This constructor creates an empty mesh buffer and sets the array
of vertex indices to null.

The `MeshBuffer` class contains four methods (`fromPositions`,
`fromPositionsNormals`, `fromPositionsUV`, and `fromPositionsNormalsUV`) that let you define a mesh buffer from a predefined array of vertex data. See the documentation for those methods for more information.

The <a href="H3DU.Meshes.md">`Meshes`</a> class includes several handy methods for creating built-in shapes; those methods return a `H3DU.MeshBuffer` object that describes the triangles they
are composed of.

<b>Instancing</b>

Some 3D rendering pipelines support <i>instancing</i>, which is a technique for rendering multiple versions of a mesh buffer with a single draw call. Instancing involves the use of a second mesh buffer (an <i>instance buffer</i>); rather than holding vertex data, the instance buffer holds <i>instance data</i>, that is, data to be used when rendering each instance of the first mesh buffer. Besides this, however, instance buffers are largely similar to vertex buffers as far as the <code>MeshBuffer</code> class is concerned; any reference to vertices in the documentation applies analogously to instances in instance buffers. However, instance buffers should use the primitive mode <code>MeshBuffer.POINTS</code>; it makes little sense to have instance buffers describe triangles or line segments.

#### Examples

The following example converts a MeshBuffer object to three.js buffer geometries (and thus serves as a bridge between this library and three.js). Pass the return value to the <code>THREE.Mesh</code>, <code>THREE.LineSegments</code>, or <code>THREE.Points</code> constructor to generate the appropriate kind of shape object depending on the MeshBuffer's primitive type. This example requires the three.js library.

    function toBufferGeometry(mesh) {
    var p=mesh.getAttribute("POSITION")
    var n=mesh.getAttribute("NORMAL")
    var t=mesh.getAttribute("TEXCOORD_0")
    var c=mesh.getAttribute("COLOR")
    var ind=mesh.getIndices()
    var geom=new THREE.BufferGeometry()
    var attributes=[p,n,t,c]
    var attributeNames=["position","normal","uv","color"]
    for(var i=0;i<attributes.length;i++) {
    if(attributes[i]) {
    var a=attributes[i]
    //console.log(a)
    var attr=new THREE.InterleavedBufferAttribute(
    new THREE.InterleavedBuffer(a.buffer,a.stride),
    a.countPerValue,a.offset)
    geom.addAttribute(attributeNames[i],attr)
    }
    }
    if(ind)geom.index=new THREE.BufferAttribute(
    ind,1)
    return geom
    }

### Members

* [LINES](#H3DU.MeshBuffer.LINES)<br>TODO: Not documented yet.
* [POINTS](#H3DU.MeshBuffer.POINTS)<br>TODO: Not documented yet.
* [TRIANGLES](#H3DU.MeshBuffer.TRIANGLES)<br>TODO: Not documented yet.

### Methods

* [fromPositions](#H3DU.MeshBuffer.fromPositions)<br>Creates a new mesh buffer with the given array of vertex positions.
* [fromPositionsNormals](#H3DU.MeshBuffer.fromPositionsNormals)<br>Creates a new mesh buffer with the given array of vertex positions
and vertex normals.
* [fromPositionsNormalsUV](#H3DU.MeshBuffer.fromPositionsNormalsUV)<br>Creates a new mesh buffer with the given array of vertex positions,
vertex normals, and texture coordinates.
* [fromPositionsUV](#H3DU.MeshBuffer.fromPositionsUV)<br>Creates a new mesh buffer with the given array of vertex positions
and texture coordinates.
* [getAttribute](#H3DU.MeshBuffer_getAttribute)<br>Gets a vertex attribute included in this mesh buffer.
* [getBounds](#H3DU.MeshBuffer_getBounds)<br>Finds the tightest
bounding box that holds all vertices in the mesh buffer.
* [getIndex](#H3DU.MeshBuffer_getIndex)<br>TODO: Not documented yet.
* [getIndices](#H3DU.MeshBuffer_getIndices)<br>Gets the array of vertex indices used by this mesh buffer.
* [getPositions](#H3DU.MeshBuffer_getPositions)<br>Gets an array of vertex positions held by this mesh buffer,
arranged by primitive.
* [lineLoopIndices](#H3DU.MeshBuffer.lineLoopIndices)<br>Creates an array of vertex indices corresponding to triangles that make up a line loop, a series of vertices that make up a connected line segment path, with the last point also connected to the first.
* [lineStripIndices](#H3DU.MeshBuffer.lineStripIndices)<br>Creates an array of vertex indices corresponding to triangles that make up a line strip, a series of vertices that make up a connected line segment path.
* [merge](#H3DU.MeshBuffer_merge)<br>Merges the vertices from another mesh into this one.
* [normalizeNormals](#H3DU.MeshBuffer_normalizeNormals)<br>Modifies this mesh buffer by converting the normals it defines to <a href="tutorial-glmath.md">unit vectors</a>
("normalized" vectors with a length of 1).
* [primitiveCount](#H3DU.MeshBuffer_primitiveCount)<br>Gets the number of primitives (triangles, lines,
and points) composed by all shapes in this mesh.
* [primitiveType](#H3DU.MeshBuffer_primitiveType)<br>Gets the type of primitive stored in this mesh buffer.
* [quadStripIndices](#H3DU.MeshBuffer.quadStripIndices)<br>Creates an array of vertex indices corresponding to triangles that make up a strip of quadrilaterals.
* [quadsIndices](#H3DU.MeshBuffer.quadsIndices)<br>Creates an array of vertex indices corresponding to triangles that make up a series of quadrilaterals, where every 4 vertices is a separate quadrilateral.
* [recalcNormals](#H3DU.MeshBuffer_recalcNormals)<br>Recalculates the normal vectors (directions that generally point up and away from the mesh buffer's surface) for triangles
in this mesh buffer, in order to give the shape described by this buffer a flat or smooth appearance or to shade the shape from the inside or the outside upon rendering.
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
* [setIndices](#H3DU.MeshBuffer_setIndices)<br>Sets the vertex indices used by this mesh buffer.
* [setPrimitiveType](#H3DU.MeshBuffer_setPrimitiveType)<br>Sets the type of graphics primitives stored in this mesh buffer.
* [transform](#H3DU.MeshBuffer_transform)<br>Transforms the positions and normals of all the vertices currently
in this mesh, with the help of a <a href="tutorial-glmath.md">4x4 matrix</a>.
* [triangleFanIndices](#H3DU.MeshBuffer.triangleFanIndices)<br>Creates an array of vertex indices corresponding to triangles that make up a triangle fan or convex polygon.
* [triangleStripIndices](#H3DU.MeshBuffer.triangleStripIndices)<br>Creates an array of vertex indices corresponding to triangles that make up a triangle strip.
* [vertexCount](#H3DU.MeshBuffer_vertexCount)<br>Gets the number of vertices in this mesh buffer, that
is, the number of vertex indices in its index buffer (some of which
may be duplicates), or if there is no index buffer, the lowest maximum
number of items that a buffer attribute can hold.
* [vertexIndices](#H3DU.MeshBuffer_vertexIndices)<br>Gets the vertex indices of a given primitive (triangle, line,
or point) in this mesh buffer.
* [wireFrame](#H3DU.MeshBuffer_wireFrame)<br>Converts the triangles in this mesh to line segments.

<a name='H3DU.MeshBuffer.LINES'></a>
### H3DU.MeshBuffer.LINES (constant)

TODO: Not documented yet.

<a name='H3DU.MeshBuffer.POINTS'></a>
### H3DU.MeshBuffer.POINTS (constant)

TODO: Not documented yet.

<a name='H3DU.MeshBuffer.TRIANGLES'></a>
### H3DU.MeshBuffer.TRIANGLES (constant)

TODO: Not documented yet.

<a name='H3DU.MeshBuffer.fromPositions'></a>
### (static) H3DU.MeshBuffer.fromPositions(vertices, [indices])

Creates a new mesh buffer with the given array of vertex positions.

#### Parameters

* `vertices` (Type: Array.&lt;number> | Float32Array)<br>An array of vertex positions. This array's length must be divisible by 3; every 3 elements are the X, Y, and Z coordinates, in that order, of one vertex.
* `indices` (Type: Array.&lt;number> | Uint16Array | Uint32Array | Uint8Array | null | undefined) (optional)<br>Array of vertex indices that the mesh buffer will use. Each index (n) is a number referring to the (n+1)th vertex. If you are defining a set of triangles, there should be 3 indices for each triangle; for line segments, 2 indices for each segment; and for points, 1 index for each point. Can be null, undefined, or omitted, in which case no index array is used and primitives in the mesh buffer are marked by consecutive vertices.

#### Return Value

A new mesh buffer. (Type: MeshBuffer)

#### Examples

The following example shows how to define a mesh
buffer from a predefined array of vertex positions.

    // First, create an array of numbers giving the X, Y, and
    // Z coordinate for each vertex position. Here, three vertices
    // are defined.
    var vertices = [x1, y1, z1, x2, y2, z2, x3, y3, z3 ];
    // Second -- and this is optional -- create a second array of numbers
    // giving the indices to vertices defined in the previous step.
    // Each index refers to the (n+1)th vertex; since 3 vertices
    // were defined, the highest index is 2.
    var indices = [0, 1, 2];
    // Finally, create the mesh buffer. (If there are no indices,
    // leave out the "indices" argument.)
    var meshBuffer=MeshBuffer.fromPositions(vertices, indices);

<a name='H3DU.MeshBuffer.fromPositionsNormals'></a>
### (static) H3DU.MeshBuffer.fromPositionsNormals(vertices, [indices])

Creates a new mesh buffer with the given array of vertex positions
and vertex normals.

#### Parameters

* `vertices` (Type: Array.&lt;number> | Float32Array)<br>An array of vertex data. This array's length must be divisible by 6; every 6 elements describe one vertex and are in the following order:<ol> <li>X, Y, and Z coordinates, in that order, of the vertex position. <li>X, Y, and Z components, in that order, of the vertex normal.</ol>
* `indices` (Type: Array.&lt;number> | Uint16Array | Uint32Array | Uint8Array | null | undefined) (optional)<br>Array of vertex indices that the mesh buffer will use. Each index (n) is a number referring to the (n+1)th vertex. If you are defining a set of triangles, there should be 3 indices for each triangle; for line segments, 2 indices for each segment; and for points, 1 index for each point. Can be null, undefined, or omitted, in which case no index array is used and primitives in the mesh buffer are marked by consecutive vertices.

#### Return Value

A new mesh buffer. (Type: MeshBuffer)

#### Examples

The following example shows how to define a mesh
buffer from a predefined array of vertex positions and normals.

    // First, create an array of numbers giving the X, Y, and
    // Z coordinate for each vertex position and normal. Here, three vertices
    // are defined. For each vertex, the position is given, followed by
    // the normal.
    var vertices = [
    x1, y1, z1, nx1, ny1, nz1,
    x2, y2, z2, nx2, ny2, nz2,
    x3, y3, z3, nx3, ny3, nz3 ];
    // Second -- and this is optional -- create a second array of numbers
    // giving the indices to vertices defined in the previous step.
    // Each index refers to the (n+1)th vertex; since 3 vertices
    // were defined, the highest index is 2.
    var indices = [0, 1, 2];
    // Finally, create the mesh buffer. (If there are no indices,
    // leave out the "indices" argument.)
    var meshBuffer=MeshBuffer.fromPositionsNormals(vertices, indices);

<a name='H3DU.MeshBuffer.fromPositionsNormalsUV'></a>
### (static) H3DU.MeshBuffer.fromPositionsNormalsUV(vertices, [indices])

Creates a new mesh buffer with the given array of vertex positions,
vertex normals, and texture coordinates.

#### Parameters

* `vertices` (Type: Array.&lt;number> | Float32Array)<br>An array of vertex data. This array's length must be divisible by 8; every 8 elements describe one vertex and are in the following order:<ol> <li>X, Y, and Z coordinates, in that order, of the vertex position. <li>X, Y, and Z components, in that order, of the vertex normal. <li>U and V texture coordinates in that order, of the vertex.</ol>
* `indices` (Type: Array.&lt;number> | Uint16Array | Uint32Array | Uint8Array | null | undefined) (optional)<br>Array of vertex indices that the mesh buffer will use. Each index (n) is a number referring to the (n+1)th vertex. If you are defining a set of triangles, there should be 3 indices for each triangle; for line segments, 2 indices for each segment; and for points, 1 index for each point. Can be null, undefined, or omitted, in which case no index array is used and primitives in the mesh buffer are marked by consecutive vertices.

#### Return Value

A new mesh buffer. (Type: MeshBuffer)

#### Examples

The following example shows how to define a mesh
buffer from a predefined array of vertex positions, normals,
and texture cordinates.

    // First, create an array of numbers giving the X, Y, and
    // Z coordinate for each vertex position, normal, and associated
    // texture coordinates. Here, three vertices
    // are defined. For each vertex, the position is given, followed by
    // the normal, followed by the texture coordinates.
    var vertices = [
    x1, y1, z1, nx1, ny1, nz1, u1, v1,
    x2, y2, z2, nx2, ny2, nz2, u2, v2,
    x3, y3, z3, nx3, ny3, nz3, u3, v3 ];
    // Second -- and this is optional -- create a second array of numbers
    // giving the indices to vertices defined in the previous step.
    // Each index refers to the (n+1)th vertex; since 3 vertices
    // were defined, the highest index is 2.
    var indices = [0, 1, 2];
    // Finally, create the mesh buffer. (If there are no indices,
    // leave out the "indices" argument.)
    var meshBuffer=MeshBuffer.fromPositionsNormalsUV(vertices, indices);

<a name='H3DU.MeshBuffer.fromPositionsUV'></a>
### (static) H3DU.MeshBuffer.fromPositionsUV(vertices, [indices])

Creates a new mesh buffer with the given array of vertex positions
and texture coordinates.

#### Parameters

* `vertices` (Type: Array.&lt;number> | Float32Array)<br>An array of vertex data. This array's length must be divisible by 5; every 5 elements describe one vertex and are in the following order:<ol> <li>X, Y, and Z coordinates, in that order, of the vertex position. <li>U and V texture coordinates in that order, of the vertex.</ol>
* `indices` (Type: Array.&lt;number> | Uint16Array | Uint32Array | Uint8Array | null | undefined) (optional)<br>Array of vertex indices that the mesh buffer will use. Each index (n) is a number referring to the (n+1)th vertex. If you are defining a set of triangles, there should be 3 indices for each triangle; for line segments, 2 indices for each segment; and for points, 1 index for each point. Can be null, undefined, or omitted, in which case no index array is used and primitives in the mesh buffer are marked by consecutive vertices.

#### Return Value

A new mesh buffer. (Type: MeshBuffer)

#### Examples

The following example shows how to define a mesh
buffer from a predefined array of vertex positions, normals,
and texture cordinates.

    // First, create an array of numbers giving the X, Y, and
    // Z coordinate for each vertex position and associated
    // texture coordinates. Here, three vertices
    // are defined. For each vertex, the position is given, followed by
    // the texture coordinates.
    var vertices = [
    x1, y1, z1, u1, v1,
    x2, y2, z2, u2, v2,
    x3, y3, z3, u3, v3 ];
    // Second -- and this is optional -- create a second array of numbers
    // giving the indices to vertices defined in the previous step.
    // Each index refers to the (n+1)th vertex; since 3 vertices
    // were defined, the highest index is 2.
    var indices = [0, 1, 2];
    // Finally, create the mesh buffer. (If there are no indices,
    // leave out the "indices" argument.)
    var meshBuffer=MeshBuffer.fromPositionsUV(vertices, indices);

<a name='H3DU.MeshBuffer_getAttribute'></a>
### H3DU.MeshBuffer#getAttribute(name, [semanticIndex])

Gets a vertex attribute included in this mesh buffer.

#### Parameters

* `name` (Type: number | string)<br>An attribute semantic, such as <a href="Semantic.md#Semantic.POSITION">Semantic.POSITION</a>, "POSITION", or "TEXCOORD_0". Throws an error if this value is a string and the string is invalid.
* `semanticIndex` (Type: number) (optional)<br>The set index of the attribute for the given semantic. 0 is the first index of the attribute, 1 is the second, and so on. This is ignored if "name" is a string. Otherwise, if null or omitted, the default value is 0.

#### Return Value

A vertex buffer accessor, or null
if the attribute doesn't exist. (Type: BufferAccessor)

#### Examples

The following function gets the positions,
normals, texture coordinates and colors of each primitive
(line, text, or point) in the mesh buffer. A point will have one
vertex per primitive, a line two vertices and a triangle three.
The attributes, if present, will be stored in the "position",
"normal", "uv", and "color" properties of each vertex.

    function getPrimitives(mesh) {
    var p=mesh.getAttribute("POSITION")
    var n=mesh.getAttribute("NORMAL")
    var t=mesh.getAttribute("TEXCOORD_0")
    var c=mesh.getAttribute("COLOR")
    var count=mesh.vertexCount()
    var primSize = 3;
    if(mesh.primitiveType() === MeshBuffer.LINES)
    primSize = 2;
    if(mesh.primitiveType() === MeshBuffer.POINTS)
    primSize = 1;
    var ret=[]
    for(var i=0;i<ind.length;i+=primSize) {
    var prim=[]
    var index=mesh.getIndex(i)
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

<a name='H3DU.MeshBuffer_getIndex'></a>
### H3DU.MeshBuffer#getIndex(indicesIndex)

TODO: Not documented yet.

#### Parameters

* `indicesIndex` (Type: *)<br>TODO: Not documented yet.

#### Return Value

TODO: Not documented yet. (Type: *)

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
vertices; if lines, two; and if points, one. Each vertex is an array containing that vertex's coordinates (for example, if the attribute holds 3 elements per value, the coordinates are X, Y, and Z coordinates, in that order). (Type: Array.&lt;Array.&lt;number>>)

<a name='H3DU.MeshBuffer.lineLoopIndices'></a>
### (static) H3DU.MeshBuffer.lineLoopIndices(vertexCount)

Creates an array of vertex indices corresponding to triangles that make up a line loop, a series of vertices that make up a connected line segment path, with the last point also connected to the first.

#### Parameters

* `vertexCount` (Type: number)<br>Number of vertices that make up the line loop.

#### Return Value

Array of vertex indices corresponding to line segments that make up the line loop. Every two indices in the array is a separate line segment. Returns an empty array if 'vertexCount' is less than 2. (Type: Array.&lt;number>)

#### Examples

The following example sets appropriate indices for a mesh buffer with vertices ordered in line loop vertex order.

    mesh.setIndices(
    MeshBuffer.lineLoopIndices(mesh.vertexCount())
    .map(x=>mesh.getIndex(x)));

<a name='H3DU.MeshBuffer.lineStripIndices'></a>
### (static) H3DU.MeshBuffer.lineStripIndices(vertexCount)

Creates an array of vertex indices corresponding to triangles that make up a line strip, a series of vertices that make up a connected line segment path.

#### Parameters

* `vertexCount` (Type: number)<br>Number of vertices that make up the line loop.

#### Return Value

Array of vertex indices corresponding to line segments that make up the line strip. Every two indices in the array is a separate line segment. Returns an empty array if 'vertexCount' is less than 2. (Type: Array.&lt;number>)

#### Examples

The following example sets appropriate indices for a mesh buffer with vertices ordered in line strip vertex order.

    mesh.setIndices(
    MeshBuffer.lineStripIndices(mesh.vertexCount())
    .map(x=>mesh.getIndex(x)));

<a name='H3DU.MeshBuffer_merge'></a>
### H3DU.MeshBuffer#merge(other)

Merges the vertices from another mesh into this one.
The vertices from the other mesh will be copied into this one,
and the other mesh's indices copied or adapted.

#### Parameters

* `other` (Type: MeshBuffer)<br>A mesh to merge into this one. The mesh given in this parameter will remain unchanged. Throws an error if this mesh's primitive type is not the same as the other mesh's primitive type.

#### Return Value

This object. (Type: MeshBuffer)

#### Examples

    var copiedMesh = new MeshBuffer().merge(meshToCopy);

<a name='H3DU.MeshBuffer_normalizeNormals'></a>
### H3DU.MeshBuffer#normalizeNormals()

Modifies this mesh buffer by converting the normals it defines to <a href="tutorial-glmath.md">unit vectors</a>
("normalized" vectors with a length of 1).
Has no effect if this mesh buffer doesn't define any normals.
All attributes with the semantic <code>NORMAL</code>,
regardless of semantic index, are affected.

#### Return Value

This object. (Type: MeshBuffer)

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

Either MeshBuffer.TRIANGLES,
MeshBuffer.LINES, or MeshBuffer.POINTS. (Type: number)

<a name='H3DU.MeshBuffer.quadStripIndices'></a>
### (static) H3DU.MeshBuffer.quadStripIndices(vertexCount)

Creates an array of vertex indices corresponding to triangles that make up a strip of quadrilaterals. For a quadrilateral strip, the first 4 vertices make up the first quadrilateral, and each additional
quadrilateral is made up of the last 2 vertices of the previous quadrilateral and
2 new vertices.

#### Parameters

* `vertexCount` (Type: number)<br>Number of vertices that make up the quadrilateral strip.

#### Return Value

Array of vertex indices corresponding to triangles that make up the quadrilateral strip. Every three indices in the array is a separate triangle. Returns an empty array if 'vertexCount' is less than 4. If 'vertexCount' is not divisible by 2, the excess vertex is ignored. (Type: Array.&lt;number>)

#### Examples

The following example sets appropriate indices for a mesh buffer with vertices ordered in quadrilateral strip vertex order.

    mesh.setIndices(
    MeshBuffer.quadStripIndices(mesh.vertexCount())
    .map(x=>mesh.getIndex(x)));

<a name='H3DU.MeshBuffer.quadsIndices'></a>
### (static) H3DU.MeshBuffer.quadsIndices(vertexCount)

Creates an array of vertex indices corresponding to triangles that make up a series of quadrilaterals, where every 4 vertices is a separate quadrilateral.

#### Parameters

* `vertexCount` (Type: number)<br>Number of vertices that make up the quadrilaterals.

#### Return Value

Array of vertex indices corresponding to triangles that make up the quadrilaterals. Every three indices in the array is a separate triangle. Returns an empty array if 'vertexCount' is less than 4. If 'vertexCount' is not divisible by 4, any excess vertices are ignored. (Type: Array.&lt;number>)

#### Examples

The following example sets appropriate indices for a mesh buffer with vertices ordered in quadrilateral vertex order.

    mesh.setIndices(
    MeshBuffer.quadsIndices(mesh.vertexCount())
    .map(x=>mesh.getIndex(x)));

<a name='H3DU.MeshBuffer_recalcNormals'></a>
### H3DU.MeshBuffer#recalcNormals([flat], [inward])

Recalculates the normal vectors (directions that generally point up and away from the mesh buffer's surface) for triangles
in this mesh buffer, in order to give the shape described by this buffer a flat or smooth appearance or to shade the shape from the inside or the outside upon rendering.

 Each normal calculated will
be normalized to have a length of 1 (unless the normal is (0,0,0)),
and will be stored in an attribute with semantic <code>NORMAL_0</code>.

This method will have an effect only if the buffer includes an attribute with
semantic <code>POSITION_0</code> and each of that attribute's values is at least 3 elements
long. If the buffer already includes an attribute with semantic <code>NORMAL_0</code>,
ensures its values are each at least 3 elements long.

For normal calculation to properly affect shading:<ul>
<li>Each triangle's vertices in the mesh buffer (as they appear when the triangle's front side is seen) must be ordered in the same winding (counterclockwise or clockwise) throughout. If the vertices have the wrong order, use the <a href="H3DU.MeshBuffer.md#H3DU.MeshBuffer_reverseWinding">`reverseWinding()`</a>
method to change their order.
<li>If the mesh describes a closed convex surface (such as a sphere or cube) and is being rendered in a right-handed coordinate system (e.g., X-right, Y-up, Z-backward), each of its triangles must have counterclockwise winding for the shape to be shaded from the outside.</ul>

#### Parameters

* `flat` (Type: boolean) (optional)<br>If true, each triangle in the mesh will have the same normal, which usually leads to a flat appearance. If false, each unique vertex in the mesh will have its own normal, which usually leads to a smooth appearance. If null, undefined, or omitted, the default is false.
* `inward` (Type: boolean) (optional)<br>If true, the generated normals will point inward, so that the shape is shaded from the inside upon rendering; otherwise, the normals will point outward. If null, undefined, or omitted, the default is false.

#### Return Value

This object. (Type: MeshBuffer)

#### Examples

    // Use flat shading, and shape is shaded from the outside
    meshBuffer.recalcNormals(true, false);
    // Both parameters can be omitted, setting both to false
    meshBuffer.recalcNormals();

<a name='H3DU.MeshBuffer_reverseNormals'></a>
### H3DU.MeshBuffer#reverseNormals()

Modifies this mesh buffer by reversing the sign of normals it defines.
Has no effect if this mesh buffer doesn't define any normals.
All attributes with the semantic <code>NORMAL</code>,
regardless of semantic index, are affected.

#### Return Value

This object. (Type: MeshBuffer)

#### Examples

The following code generates a two-sided mesh, where
the normals on each side face in the opposite direction.
This is only useful when drawing open geometric shapes, such as open
cylinders and two-dimensional planar shapes.
Due to the z-fighting effect, drawing a two-sided mesh is
recommended only if face culling is enabled.

    var twoSidedMesh = originalMesh.merge(
    new MeshBuffer().merge(originalMesh)
    .reverseWinding().reverseNormals()
    );

<a name='H3DU.MeshBuffer_reverseWinding'></a>
### H3DU.MeshBuffer#reverseWinding()

Reverses the winding order of the triangles in this mesh buffer
by swapping the second and third vertex indices of each one.
Has an effect only if this mesh buffer consists of triangles.

#### Return Value

This object. (Type: MeshBuffer)

#### Examples

The following code generates a mesh that survives face culling,
since the same triangles occur on each side of the mesh, but
with different winding orders.
This is only useful when drawing open geometric shapes, such as open
cylinders and two-dimensional planar shapes.
Due to the z-fighting effect, drawing this kind of mesh is
recommended only if face culling is enabled.

    var frontBackMesh = originalMesh.merge(
    new MeshBuffer().merge(originalMesh).reverseWinding()
    );

<a name='H3DU.MeshBuffer_setAttribute'></a>
### H3DU.MeshBuffer#setAttribute(name, buffer, countPerValue, [offset], [stride])

Adds information about a buffer attribute to this
mesh buffer (or sets an
existing attribute's information). An attribute
gives information about the per-vertex data used and
stored in a vertex buffer.

#### Parameters

* `name` (Type: number | string)<br>An attribute semantic, such as <a href="Semantic.md#Semantic.POSITION">Semantic.POSITION</a>, "POSITION", or "TEXCOORD_0". Throws an error if this value is a string and the string is invalid. If this isn't a string, the set index of the attribute will be 0 (see MeshBuffer#setAttributeEx).
* `buffer` (Type: Float32Array | Array)<br>The buffer where the per-vertex data is stored. See MeshBuffer#setAttributeEx.
* `countPerValue` (Type: number)<br>The number of elements in each per-vertex item. See MeshBuffer#setAttributeEx.
* `offset` (Type: number) (optional)<br>The index into the array (starting from 0) where the first per-vertex item starts.See MeshBuffer#setAttributeEx.
* `stride` (Type: number) (optional)<br>The number of elements from the start of one per-vertex item to the start of the next. See MeshBuffer#setAttributeEx.

#### Return Value

This object. Throws an error if the given
semantic is unsupported. (Type: MeshBuffer)

<a name='H3DU.MeshBuffer_setAttributeEx'></a>
### H3DU.MeshBuffer#setAttributeEx(name, index, buffer, [countPerValue], [offset], [stride])

Adds information about a buffer attribute to this
mesh buffer (or sets an
existing attribute's information), taking a semantic index as
an additional parameter. An attribute
gives information about the per-vertex data used and
stored in a vertex buffer.

#### Parameters

* `name` (Type: number | string)<br>An attribute semantic, such as <a href="Semantic.md#Semantic.POSITION">Semantic.POSITION</a>, "POSITION", or "TEXCOORD_0". Throws an error if this value is a string and the string is invalid.
* `index` (Type: number)<br>The semantic index of the attribute for the given semantic. 0 is the first index of the attribute, 1 is the second, and so on. This is ignored if "name" is a string.
* `buffer` (Type: Float32Array | Array | BufferAccessor)<br>The buffer where the per-vertex data is stored. If this parameter is an (untyped) Array, converts that parameter to a Float32Array.
* `countPerValue` (Type: number) (optional)<br>The number of elements in each per-vertex item. For example, if each vertex is a 3-element vector, this value is 3. Throws an error if this value is 0 or less. If "buffer" is a BufferAccessor, the value of "countPerValue" is taken from that accessor and this parameter is ignored; this parameter is currently required otherwise.
* `offset` (Type: number) (optional)<br>The index into the array (starting from 0) where the first per-vertex item starts. If null, undefined, or omitted, the default is 0. Throws an error if less than 0. If "buffer" is a BufferAccessor, the value of "offset" is taken from that accessor and this parameter is ignored.
* `stride` (Type: number) (optional)<br>The number of elements from the start of one per-vertex item to the start of the next. If null, undefined, or omitted, this value is the same as "countPerValue". Throws an error if this value is 0 or less. If "buffer" is a BufferAccessor, the value of "stride" is taken from that accessor and this parameter is ignored.

#### Return Value

This object.Throws an error if the given
semantic is unsupported. (Type: MeshBuffer)

<a name='H3DU.MeshBuffer_setColor'></a>
### H3DU.MeshBuffer#setColor(color)

Sets all the vertices in this mesh to the given color, by
assigning each value with the attribute semantic <code>COLOR</code>
to the given color. (If the attribute's count per value
is less than 4, each such value will be set to as many elements of the converted 4-element
color as possible.) If an attribute with the semantic <code>COLOR</code>
doesn't exist, an attribute with the semantic <code>COLOR_0</code> and a count per
value of 3 is created.

All attributes with the semantic <code>COLOR</code>,
regardless of semantic index, are affected by this method.

#### Parameters

* `color` (Type: Array.&lt;number> | number | string)<br>A color vector or string identifying the color to set.

#### Return Value

This object. (Type: MeshBuffer)

<a name='H3DU.MeshBuffer_setIndices'></a>
### H3DU.MeshBuffer#setIndices([indices])

Sets the vertex indices used by this mesh buffer.

#### Parameters

* `indices` (Type: Array.&lt;number> | Uint16Array | Uint32Array | Uint8Array | null) (optional)<br>Array of vertex indices that the mesh buffer will use. Can be null, in which case no index array is used and primitives in the mesh buffer are marked by consecutive vertices.

#### Return Value

This object. (Type: MeshBuffer)

<a name='H3DU.MeshBuffer_setPrimitiveType'></a>
### H3DU.MeshBuffer#setPrimitiveType(primType)

Sets the type of graphics primitives stored in this mesh buffer.

#### Parameters

* `primType` (Type: number)<br>The primitive type, either MeshBuffer.TRIANGLES, MeshBuffer.LINES, or MeshBuffer.POINTS. For TRIANGLES, every three vertices or vertex indices identify a single triangle. For LINES, every two vertices or vertex indices identify a single line segment. For POINTS, every vertex or vertex index identifies a single point.

#### Return Value

This object. (Type: MeshBuffer)

<a name='H3DU.MeshBuffer_transform'></a>
### H3DU.MeshBuffer#transform(matrix)

Transforms the positions and normals of all the vertices currently
in this mesh, with the help of a <a href="tutorial-glmath.md">4x4 matrix</a>. Only values with the attribute semantic <code>POSITION_0</code>
or <code>NORMAL_0</code> will be affected by this method; values of
other attributes will be unaffected.

#### Parameters

* `matrix` (Type: Array.&lt;number>)<br>A 4x4 matrix described in the MathUtil.mat4projectVec3 method. The normals will be transformed using the 3x3 inverse transpose of this matrix (see MathUtil.mat4inverseTranspose3). (Normals need to be transformed specially because they describe directions, not points.)

#### Return Value

This object. (Type: MeshBuffer)

#### Examples

The following example transforms positions
and normals to move the mesh 2 units to the right.

    mesh.transform(MathUtil.mat4translated(2, 0, 0));

The following example transforms positions
and normals to double the mesh's size.

    mesh.transform(MathUtil.mat4scaled(2, 2, 2));

<a name='H3DU.MeshBuffer.triangleFanIndices'></a>
### (static) H3DU.MeshBuffer.triangleFanIndices(vertexCount)

Creates an array of vertex indices corresponding to triangles that make up a triangle fan or convex polygon. For triangle fans and convex polygons, the first 3
vertices make up the first triangle, and each additional
triangle is made up of the last vertex, the first vertex of
the first trangle, and 1 new vertex.

#### Parameters

* `vertexCount` (Type: number)<br>Number of vertices that make up the triangle fan or convex polygon.

#### Return Value

Array of vertex indices corresponding to triangles that make up the triangle fan or convex polygon. Every three indices in the array is a separate triangle. Returns an empty array if 'vertexCount' is less than 3. (Type: Array.&lt;number>)

#### Examples

The following example sets appropriate indices for a mesh buffer with vertices ordered in triangle fan vertex order.

    mesh.setIndices(
    MeshBuffer.triangleFanIndices(mesh.vertexCount())
    .map(x=>mesh.getIndex(x)));

<a name='H3DU.MeshBuffer.triangleStripIndices'></a>
### (static) H3DU.MeshBuffer.triangleStripIndices(vertexCount)

Creates an array of vertex indices corresponding to triangles that make up a triangle strip. For a triangle strip, the first 3
vertices make up the first triangle, and each additional
triangle is made up of the last 2 vertices and 1
new vertex.

#### Parameters

* `vertexCount` (Type: number)<br>Number of vertices that make up the triangle strip.

#### Return Value

Array of vertex indices corresponding to triangles that make up the triangle strip. Every three indices in the array is a separate triangle. Returns an empty array if 'vertexCount' is less than 3. (Type: Array.&lt;number>)

#### Examples

The following example sets appropriate indices for a mesh buffer with vertices ordered in triangle strip vertex order.

    mesh.setIndices(
    MeshBuffer.triangleStripIndices(mesh.vertexCount())
    .map(x=>mesh.getIndex(x)));

<a name='H3DU.MeshBuffer_vertexCount'></a>
### H3DU.MeshBuffer#vertexCount()

Gets the number of vertices in this mesh buffer, that
is, the number of vertex indices in its index buffer (some of which
may be duplicates), or if there is no index buffer, the lowest maximum
number of items that a buffer attribute can hold.

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

This object. (Type: MeshBuffer)

[Back to documentation index.](index.md)

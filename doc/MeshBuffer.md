# MeshBuffer

[Back to documentation index.](index.md)

<a name='MeshBuffer'></a>
### new MeshBuffer()

**Deprecated: It is planned to render this class obsolete and rely on three.js's BufferGeometry.**

A geometric mesh in the form of buffer objects.
A mesh buffer is made up of one or more <a href="BufferAccessor.md">vertex attribute objects</a>,
and an optional array of vertex indices. Each vertex attribute object contains
the values of one attribute of the mesh, such as positions,
vertex normals, and texture coordinates. A mesh buffer
can store vertices that make up triangles, line segments, or points.

This constructor creates an empty mesh buffer and sets the array
of vertex indices to null and the primitive type to <a href="MeshBuffer.md#MeshBuffer.TRIANGLES">MeshBuffer.TRIANGLES</a>.

The `MeshBuffer` class contains four methods (`fromPositions`,
`fromPositionsNormals`, `fromPositionsUV`, and `fromPositionsNormalsUV`) that let you define a mesh buffer from a predefined array of vertex data. See the documentation for those methods for more information.

The <a href="Meshes.md">`Meshes`</a> class includes several handy methods for creating built-in shapes; those methods return a `MeshBuffer` object that describes the triangles they
are composed of.

<b>Instancing</b>

Some 3D rendering pipelines support <i>instancing</i>, which is a technique for rendering multiple versions of a mesh buffer with a single draw call. Instancing involves the use of a second mesh buffer (an <i>instance buffer</i>); rather than holding vertex data, the instance buffer holds <i>instance data</i>, that is, data to be used when rendering each instance of the first mesh buffer. Besides this, however, instance buffers are largely similar to vertex buffers as far as the <code>MeshBuffer</code> class is concerned; any reference to vertices in the documentation applies analogously to instances in instance buffers. However, instance buffers should use the primitive type <code>MeshBuffer.POINTS</code>; it makes little sense to have instance buffers describe triangles or line segments.

### Members

* [LINES](#MeshBuffer.LINES)<br>Indicates that a mesh buffer contains line segments; the mesh
buffer stores each line segment using two consecutive vertices.
* [POINTS](#MeshBuffer.POINTS)<br>Indicates that a mesh buffer contains points; the mesh
buffer stores each point using one vertex.
* [TRIANGLES](#MeshBuffer.TRIANGLES)<br>Indicates that a mesh buffer contains triangles; the mesh
buffer stores each triangle using three consecutive vertices.

<a name='MeshBuffer.LINES'></a>
### MeshBuffer.LINES (constant)

Indicates that a mesh buffer contains line segments; the mesh
buffer stores each line segment using two consecutive vertices.

Default Value: `1`

<a name='MeshBuffer.POINTS'></a>
### MeshBuffer.POINTS (constant)

Indicates that a mesh buffer contains points; the mesh
buffer stores each point using one vertex.

Default Value: `0`

<a name='MeshBuffer.TRIANGLES'></a>
### MeshBuffer.TRIANGLES (constant)

Indicates that a mesh buffer contains triangles; the mesh
buffer stores each triangle using three consecutive vertices.

Default Value: `4`

[Back to documentation index.](index.md)

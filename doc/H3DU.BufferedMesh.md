# H3DU.BufferedMesh

[Back to documentation index.](index.md)

 <a name='H3DU.BufferedMesh'></a>
### H3DU.BufferedMesh(mesh, context)

<b>Deprecated: This class is likely to become a private class.
Use the <a href="H3DU.MeshBuffer.md">H3DU.MeshBuffer</a> class instead, which is not coupled to WebGL
contexts.</b>

A geometric mesh in the form of buffer objects.

#### Parameters

* `mesh` (Type: <a href="H3DU.Mesh.md">H3DU.Mesh</a> | <a href="H3DU.MeshBuffer.md">H3DU.MeshBuffer</a>)<br>
    A geometric mesh object. Cannot be null.
* `context` (Type: WebGLRenderingContext | WebGL2RenderingContext | object)<br>
    A WebGL context to create a buffer from, or an object, such as H3DU.Scene3D, that implements a no-argument <code>getContext</code> method that returns a WebGL context. (Note that this constructor uses a WebGL context rather than a shader program because buffer objects are not specific to shader programs.)

### Methods

* [dispose](#H3DU.BufferedMesh_dispose)<br>Deletes the vertex and index buffers associated with this object.
* [draw](#H3DU.BufferedMesh_draw)<br><b>Deprecated: Yes</b>
* [getContext](#H3DU.BufferedMesh_getContext)<br><b>Deprecated: Yes</b>
* [primitiveCount](#H3DU.BufferedMesh_primitiveCount)<br>Gets the number of primitives (triangles, lines,
and points) composed by all shapes in this mesh.
* [vertexCount](#H3DU.BufferedMesh_vertexCount)<br>Gets the number of vertices composed by all shapes in this mesh.

 <a name='H3DU.BufferedMesh_dispose'></a>
### H3DU.BufferedMesh#dispose()

Deletes the vertex and index buffers associated with this object.

#### Return Value

Return value. (Type: Object)

 <a name='H3DU.BufferedMesh_draw'></a>
### H3DU.BufferedMesh#draw(program)

<b>Deprecated: Yes</b>

Binds the buffers in this object to attributes according
to their data format, and draws the elements in this mesh
according to the data in its buffers.

#### Parameters

* `program` (Type: <a href="H3DU.ShaderProgram.md">H3DU.ShaderProgram</a>)<br>
    A shader program object to get the IDs from for attributes named "position", "normal", "colorAttr", and "uv", and the "useColorAttr" uniform.

#### Return Value

Return value. (Type: Object)

 <a name='H3DU.BufferedMesh_getContext'></a>
### H3DU.BufferedMesh#getContext()

<b>Deprecated: Yes</b>

Returns the WebGL context associated with this object.

#### Return Value

Return value. (Type: WebGLRenderingContext | WebGL2RenderingContext)

 <a name='H3DU.BufferedMesh_primitiveCount'></a>
### H3DU.BufferedMesh#primitiveCount()

Gets the number of primitives (triangles, lines,
and points) composed by all shapes in this mesh.

#### Return Value

Return value. (Type: Number)

 <a name='H3DU.BufferedMesh_vertexCount'></a>
### H3DU.BufferedMesh#vertexCount()

Gets the number of vertices composed by all shapes in this mesh.

#### Return Value

Return value. (Type: Number)

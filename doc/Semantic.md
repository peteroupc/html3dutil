# Semantic

[Back to documentation index.](index.md)

<a name='Semantic'></a>
### new Semantic()

**Deprecated: It is planned to render this class obsolete and rely on three.js's BufferGeometry.**

Contains constants for assigning semantics
to vertex attributes found in mesh buffers and
to data that is uniform throughout a particular
geometry draw call.

### Members

* [BITANGENT](#Semantic.BITANGENT)<br>Attribute semantic for a bitangent vector.
* [COLOR](#Semantic.COLOR)<br>Attribute semantic for a color.
* [CUSTOM](#Semantic.CUSTOM)<br>Attribute semantic for custom attributes.
* [JOINT](#Semantic.JOINT)<br>Attribute semantic for a skinning joint.
* [JOINTMATRIX](#Semantic.JOINTMATRIX)<br>Uniform semantic for a joint matrix.
* [MODEL](#Semantic.MODEL)<br>Uniform semantic for a model matrix.
* [MODELVIEW](#Semantic.MODELVIEW)<br>Uniform semantic for a model-view matrix.
* [MODELVIEWINVERSETRANSPOSE](#Semantic.MODELVIEWINVERSETRANSPOSE)<br>Uniform semantic for the inverse of the 3 &times; 3 transpose of the model-view matrix.
* [MODELVIEWPROJECTION](#Semantic.MODELVIEWPROJECTION)<br>Uniform semantic for a model-view-projection matrix.
* [NORMAL](#Semantic.NORMAL)<br>Attribute semantic for a vertex normal.
* [POSITION](#Semantic.POSITION)<br>Attribute semantic for a vertex position.
* [PROJECTION](#Semantic.PROJECTION)<br>Uniform semantic for a projection matrix.
* [TANGENT](#Semantic.TANGENT)<br>Attribute semantic for a tangent vector.
* [TEXCOORD](#Semantic.TEXCOORD)<br>Attribute semantic for a tuple of texture coordinates.
* [VIEW](#Semantic.VIEW)<br>Uniform semantic for a view matrix.
* [VIEWINVERSE](#Semantic.VIEWINVERSE)<br>Uniform semantic for an inverse view matrix.
* [WEIGHT](#Semantic.WEIGHT)<br>Attribute semantic for a skinning weight.

<a name='Semantic.BITANGENT'></a>
### Semantic.BITANGENT (constant)

Attribute semantic for a bitangent vector.

<a name='Semantic.COLOR'></a>
### Semantic.COLOR (constant)

Attribute semantic for a color.
In general, each color consists of three components.

<a name='Semantic.CUSTOM'></a>
### Semantic.CUSTOM (constant)

Attribute semantic for custom attributes.

<a name='Semantic.JOINT'></a>
### Semantic.JOINT (constant)

Attribute semantic for a skinning joint.

<a name='Semantic.JOINTMATRIX'></a>
### Semantic.JOINTMATRIX (constant)

Uniform semantic for a joint matrix.

<a name='Semantic.MODEL'></a>
### Semantic.MODEL (constant)

Uniform semantic for a model matrix.

<a name='Semantic.MODELVIEW'></a>
### Semantic.MODELVIEW (constant)

Uniform semantic for a model-view matrix.

<a name='Semantic.MODELVIEWINVERSETRANSPOSE'></a>
### Semantic.MODELVIEWINVERSETRANSPOSE (constant)

Uniform semantic for the inverse of the 3 &times; 3 transpose of the model-view matrix.

<a name='Semantic.MODELVIEWPROJECTION'></a>
### Semantic.MODELVIEWPROJECTION (constant)

Uniform semantic for a model-view-projection matrix.

<a name='Semantic.NORMAL'></a>
### Semantic.NORMAL (constant)

Attribute semantic for a vertex normal.

For 3D graphics libraries to calculate a mesh buffer's lighting and shading correctly, that mesh buffer must specify normals for all its vertices.

<b>What are normals?</b> A normal is a set of numbers (usually three numbers) describing a particular direction. Generally, a normal's direction is perpendicular to a surface's edges, and points up and
away from the surface.

Normals are important in the lighting and shading model. When light hits an object's surface, how brightly the surface will be lit depends on how directly the light points to the surface. It will be lit the most brightly if the light is directly opposite to its normal, and not at all if the light is perpendicular to the normal or in the same direction as the normal.

In general, vertex normals are 3-dimensional
and are defined for a mesh buffer only if it
also contains vertex positions.

<a name='Semantic.POSITION'></a>
### Semantic.POSITION (constant)

Attribute semantic for a vertex position.
In general, vertex positions are 2-dimensional or 3-dimensional.

<a name='Semantic.PROJECTION'></a>
### Semantic.PROJECTION (constant)

Uniform semantic for a projection matrix.

<a name='Semantic.TANGENT'></a>
### Semantic.TANGENT (constant)

Attribute semantic for a tangent vector.

<a name='Semantic.TEXCOORD'></a>
### Semantic.TEXCOORD (constant)

Attribute semantic for a tuple of texture coordinates.

If a texture (array of memory units) will be applied to a mesh buffer's geometry, then texture coordinates need to be specified for each vertex in that mesh buffer. In general, a texture coordinate is one of two numbers, called U and V, that map to a specific point in the texture. Each texture coordinate ranges from 0 to 1.

In most 3D graphics pipelines, U coordinates start at the left of the texture (0) and increase to the right (1). In some graphics pipelines, such as OpenGL, V coordinates start by default at the bottom of the texture (0) and increase to the top (1), while in others, such as WebGL, Vulkan, Metal, and Direct3D, V coordinates start by default at the top of the texture and increase to the bottom. Thus, for example, in OpenGL by default, texture coordinates (0, 1) indicate the upper-left corner of the texture, and texture coordinates (0.5, 0.5) indicate the center of the texture.

In general, texture coordinates describe 2-dimensional points.
However, for such texturing tasks as mapping
a square to a trapezoid, trios of 3-dimensional texture coordinates (U, V, and Z)
are useful to ensure the texturing remains perspective-correct.
In this case, the 3-D texture coordinates are converted
to 2-D by dividing the U and V components by the Z component.
In a fragment shader or pixel shader, this can look like
the following
code: <code>texCoord.xy/texCoord.z</code>.

<a name='Semantic.VIEW'></a>
### Semantic.VIEW (constant)

Uniform semantic for a view matrix.

<a name='Semantic.VIEWINVERSE'></a>
### Semantic.VIEWINVERSE (constant)

Uniform semantic for an inverse view matrix.

<a name='Semantic.WEIGHT'></a>
### Semantic.WEIGHT (constant)

Attribute semantic for a skinning weight.

[Back to documentation index.](index.md)

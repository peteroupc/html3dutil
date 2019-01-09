# Semantic

[Back to documentation index.](index.md)

<a name='Semantic'></a>
### Semantic()

Contains constants for assigning semantics
to uniforms and vertex attributes.

### Members

* [BITANGENT](#Semantic.BITANGENT)<br>Attribute semantic for a bitangent vector.
* [COLOR](#Semantic.COLOR)<br>Attribute semantic for a color.
* [CUSTOM](#Semantic.CUSTOM)<br>Attribute semantic for custom attributes.
* [JOINT](#Semantic.JOINT)<br>Attribute semantic for a skinning joint.
* [JOINTMATRIX](#Semantic.JOINTMATRIX)<br>Uniform semantic for a joint matrix.
* [MODEL](#Semantic.MODEL)<br>Uniform semantic for a model matrix.
* [MODELVIEW](#Semantic.MODELVIEW)<br>Uniform semantic for a model-view matrix.
* [MODELVIEWINVERSETRANSPOSE](#Semantic.MODELVIEWINVERSETRANSPOSE)<br>Uniform semantic for the inverse of the 3x3 transpose of the model-view matrix.
* [MODELVIEWPROJECTION](#Semantic.MODELVIEWPROJECTION)<br>Uniform semantic for a model-view-projection matrix.
* [NORMAL](#Semantic.NORMAL)<br>Attribute semantic for a vertex normal.
* [POSITION](#Semantic.POSITION)<br>Attribute semantic for a vertex position.
* [PROJECTION](#Semantic.PROJECTION)<br>Uniform semantic for a projection matrix.
* [TANGENT](#Semantic.TANGENT)<br>Attribute semantic for a tangent vector.
* [TEXCOORD](#Semantic.TEXCOORD)<br>Attribute semantic for a texture coordinate.
* [VIEW](#Semantic.VIEW)<br>Uniform semantic for a view matrix.
* [VIEWINVERSE](#Semantic.VIEWINVERSE)<br>Uniform semantic for an inverse view matrix.
* [WEIGHT](#Semantic.WEIGHT)<br>Attribute semantic for a skinning weight.

<a name='Semantic.BITANGENT'></a>
### Semantic.BITANGENT (constant)

Attribute semantic for a bitangent vector.

<a name='Semantic.COLOR'></a>
### Semantic.COLOR (constant)

Attribute semantic for a color.
The default shader uses 3-component colors.

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

Uniform semantic for the inverse of the 3x3 transpose of the model-view matrix.

<a name='Semantic.MODELVIEWPROJECTION'></a>
### Semantic.MODELVIEWPROJECTION (constant)

Uniform semantic for a model-view-projection matrix.

<a name='Semantic.NORMAL'></a>
### Semantic.NORMAL (constant)

Attribute semantic for a vertex normal.
The default shader uses 3-dimensional normals.

<a name='Semantic.POSITION'></a>
### Semantic.POSITION (constant)

Attribute semantic for a vertex position.
The default shader uses 3-dimensional positions.

<a name='Semantic.PROJECTION'></a>
### Semantic.PROJECTION (constant)

Uniform semantic for a projection matrix.

<a name='Semantic.TANGENT'></a>
### Semantic.TANGENT (constant)

Attribute semantic for a tangent vector.

<a name='Semantic.TEXCOORD'></a>
### Semantic.TEXCOORD (constant)

Attribute semantic for a texture coordinate.

Note that the default shader supports only 2-dimensional
texture coordinates. For such texturing tasks as mapping
a square to a trapezoid, 3-dimensional texture coordinates
are useful to ensure the texturing is perspective-correct.
In this case, the 3-D texture coordinates are converted
to 2-D by dividing the X and Y components by the Z component.
In a fragment shader, this can look like the following
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

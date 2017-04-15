# H3DU.Semantic

[Back to documentation index.](index.md)

<a name='H3DU.Semantic'></a>
### H3DU.Semantic()

Contains constants for assigning semantics
to uniforms and vertex attributes.

### Members

* [BITANGENT](#H3DU.Semantic.BITANGENT)<br>Attribute semantic for a bitangent vector.
* [COLOR](#H3DU.Semantic.COLOR)<br>Attribute semantic for a color.
* [CUSTOM](#H3DU.Semantic.CUSTOM)<br>Attribute semantic for custom attributes.
* [JOINT](#H3DU.Semantic.JOINT)<br>Attribute semantic for a skinning joint.
* [MODEL](#H3DU.Semantic.MODEL)<br>Uniform semantic for a model matrix.
* [MODELVIEW](#H3DU.Semantic.MODELVIEW)<br>Uniform semantic for a model-view matrix.
* [MODELVIEWINVERSETRANSPOSE](#H3DU.Semantic.MODELVIEWINVERSETRANSPOSE)<br>Uniform semantic for the inverse of the 3x3 transpose of the model-view matrix.
* [MODELVIEWPROJECTION](#H3DU.Semantic.MODELVIEWPROJECTION)<br>Uniform semantic for a model-view-projection matrix.
* [NORMAL](#H3DU.Semantic.NORMAL)<br>Attribute semantic for a vertex normal.
* [POSITION](#H3DU.Semantic.POSITION)<br>Attribute semantic for a vertex position.
* [PROJECTION](#H3DU.Semantic.PROJECTION)<br>Uniform semantic for a projection matrix.
* [TANGENT](#H3DU.Semantic.TANGENT)<br>Attribute semantic for a tangent vector.
* [TEXCOORD](#H3DU.Semantic.TEXCOORD)<br>Attribute semantic for a texture coordinate.
* [VIEW](#H3DU.Semantic.VIEW)<br>Uniform semantic for a view matrix.
* [VIEWINVERSE](#H3DU.Semantic.VIEWINVERSE)<br>Uniform semantic for an inverse view matrix.
* [WEIGHT](#H3DU.Semantic.WEIGHT)<br>Attribute semantic for a skinning weight.

<a name='H3DU.Semantic.BITANGENT'></a>
### H3DU.Semantic.BITANGENT (constant)

Attribute semantic for a bitangent vector.

<a name='H3DU.Semantic.COLOR'></a>
### H3DU.Semantic.COLOR (constant)

Attribute semantic for a color.

<a name='H3DU.Semantic.CUSTOM'></a>
### H3DU.Semantic.CUSTOM (constant)

Attribute semantic for custom attributes.

<a name='H3DU.Semantic.JOINT'></a>
### H3DU.Semantic.JOINT (constant)

Attribute semantic for a skinning joint.

<a name='H3DU.Semantic.MODEL'></a>
### H3DU.Semantic.MODEL (constant)

Uniform semantic for a model matrix.

<a name='H3DU.Semantic.MODELVIEW'></a>
### H3DU.Semantic.MODELVIEW (constant)

Uniform semantic for a model-view matrix.

<a name='H3DU.Semantic.MODELVIEWINVERSETRANSPOSE'></a>
### H3DU.Semantic.MODELVIEWINVERSETRANSPOSE (constant)

Uniform semantic for the inverse of the 3x3 transpose of the model-view matrix.

<a name='H3DU.Semantic.MODELVIEWPROJECTION'></a>
### H3DU.Semantic.MODELVIEWPROJECTION (constant)

Uniform semantic for a model-view-projection matrix.

<a name='H3DU.Semantic.NORMAL'></a>
### H3DU.Semantic.NORMAL (constant)

Attribute semantic for a vertex normal.
The default shader uses 3-dimensional normals.

<a name='H3DU.Semantic.POSITION'></a>
### H3DU.Semantic.POSITION (constant)

Attribute semantic for a vertex position.
The default shader uses 3-dimensional positions.

<a name='H3DU.Semantic.PROJECTION'></a>
### H3DU.Semantic.PROJECTION (constant)

Uniform semantic for a projection matrix.

<a name='H3DU.Semantic.TANGENT'></a>
### H3DU.Semantic.TANGENT (constant)

Attribute semantic for a tangent vector.

<a name='H3DU.Semantic.TEXCOORD'></a>
### H3DU.Semantic.TEXCOORD (constant)

Attribute semantic for a texture coordinate.

Note that the default shader supports only 2-dimensional
texture coordinates. For such texturing tasks as mapping
a square to a trapezoid, 3-dimensional texture coordinates
are useful to ensure the texturing is perspective-correct.
In this case, the 3-D texture coordinates are converted
to 2-D by dividing the X and Y components by the Z component.
In a fragment shader, this can look like the following
code: <code>texCoord.xy/texCoord.z</code>.

<a name='H3DU.Semantic.VIEW'></a>
### H3DU.Semantic.VIEW (constant)

Uniform semantic for a view matrix.

<a name='H3DU.Semantic.VIEWINVERSE'></a>
### H3DU.Semantic.VIEWINVERSE (constant)

Uniform semantic for an inverse view matrix.

<a name='H3DU.Semantic.WEIGHT'></a>
### H3DU.Semantic.WEIGHT (constant)

Attribute semantic for a skinning weight.

[Back to documentation index.](index.md)

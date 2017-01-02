# H3DU.Shape

[Back to documentation index.](index.md)

### H3DU.Shape(mesh) <a id='H3DU.Shape'></a>

An object that associates a geometric mesh (the shape of the object) with
 material data (which defines what is seen on the object's surface)
and a transformation matrix (which defines the object's position and size).
See the "<a href="tutorial-shapes.md">Creating Shapes</a>" tutorial.

#### Parameters

* `mesh` (Type: <a href="H3DU.MeshBuffer.md">H3DU.MeshBuffer</a>)<br>
    A mesh in the form of a buffer object. Cannot be null. For <a href="H3DU.Mesh.md">H3DU.Mesh</a> objects, the <a href="H3DU.Material.md">H3DU.Material</a> created will use the mesh in its current state and won't track future changes. <i>Using <a href="H3DU.BufferedMesh.md">H3DU.BufferedMesh</a> objects as the parameter is deprecated.</i>

### Methods

* [getMeshBuffer](#H3DU.Shape_getMeshBuffer)
* [copy](#H3DU.Shape_H3DU.Shape_copy)
* [getBounds](#H3DU.Shape_H3DU.Shape_getBounds)
* [getMatrix](#H3DU.Shape_H3DU.Shape_getMatrix)
* [getTransform](#H3DU.Shape_H3DU.Shape_getTransform)
* [getVisible](#H3DU.Shape_H3DU.Shape_getVisible)
* [primitiveCount](#H3DU.Shape_H3DU.Shape_primitiveCount)
* [setColor](#H3DU.Shape_H3DU.Shape_setColor)
* [setMaterial](#H3DU.Shape_H3DU.Shape_setMaterial)
* [setMaterialParams](#H3DU.Shape_H3DU.Shape_setMaterialParams)
* [setPosition](#H3DU.Shape_H3DU.Shape_setPosition)
* [setQuaternion](#H3DU.Shape_H3DU.Shape_setQuaternion)
* [setScale](#H3DU.Shape_H3DU.Shape_setScale)
* [setShader](#H3DU.Shape_H3DU.Shape_setShader)
* [setTexture](#H3DU.Shape_H3DU.Shape_setTexture)
* [setTextureAndColor](#H3DU.Shape_H3DU.Shape_setTextureAndColor)
* [setTransform](#H3DU.Shape_H3DU.Shape_setTransform)
* [setVisible](#H3DU.Shape_H3DU.Shape_setVisible)
* [vertexCount](#H3DU.Shape_H3DU.Shape_vertexCount)

### #getMeshBuffer() <a id='H3DU.Shape_getMeshBuffer'></a>

Returns a reference to the mesh buffer used by this shape.

#### Return Value

Return value. (Type: <a href="H3DU.MeshBuffer.md">H3DU.MeshBuffer</a>)

### H3DU.Shape#copy() <a id='H3DU.Shape_H3DU.Shape_copy'></a>

Makes a copy of this object. The copied object
will have its own version of the transform and
material data, but any texture
image data and mesh buffers will not be duplicated,
but rather just references to them will be used.
The copied shape won't have a parent.

#### Return Value

A copy of this object. (Type: <a href="H3DU.Shape.md">H3DU.Shape</a>)

### H3DU.Shape#getBounds() <a id='H3DU.Shape_H3DU.Shape_getBounds'></a>

Finds a bounding box that holds all vertices in this shape.
 The bounding box is not guaranteed to be the
tightest, and the box will be transformed to world space
using this object's transform.

#### Return Value

An array of six numbers describing an
axis-aligned bounding box
that fits all vertices in the shape. The first three numbers
are the smallest-valued X, Y, and Z coordinates, and the
last three are the largest-valued X, Y, and Z coordinates.
If the shape has no vertices, returns the array [Inf, Inf, Inf, -Inf,
-Inf, -Inf]. (Type: Array.&lt;Number>)

### H3DU.Shape#getMatrix() <a id='H3DU.Shape_H3DU.Shape_getMatrix'></a>

Gets the transformation matrix used by this shape.
See H3DU.Transform#getMatrix.

#### Return Value

The current transformation matrix. (Type: Array.&lt;Number>)

### H3DU.Shape#getTransform() <a id='H3DU.Shape_H3DU.Shape_getTransform'></a>

Returns the transform used by this shape object.
The transform won't be copied.

#### Return Value

Return value. (Type: <a href="H3DU.Transform.md">H3DU.Transform</a>)

### H3DU.Shape#getVisible() <a id='H3DU.Shape_H3DU.Shape_getVisible'></a>

Gets whether this shape will be drawn on rendering.

#### Return Value

True if this shape will be visible; otherwise, false. (Type: Boolean)

### H3DU.Shape#primitiveCount() <a id='H3DU.Shape_H3DU.Shape_primitiveCount'></a>

Gets the number of primitives (triangles, lines,
and points) composed by all shapes in this scene.

#### Return Value

Return value. (Type: Number)

### H3DU.Shape#setColor(r, g, b, [a]) <a id='H3DU.Shape_H3DU.Shape_setColor'></a>

Sets material parameters that give the shape a certain color.
(If a material is already defined, sets its ambient and diffusion
colors.)
However, if the mesh defines its own colors, those colors will take
precedence over the color given in this method.

#### Parameters

* `r` (Type: Array.&lt;Number> | number | string)<br>
    A <a href="H3DU.md#H3DU.toGLColor">color vector or string</a>, or the red color component (0-1).
* `g` (Type: Number)<br>
    Green color component (0-1). May be null or omitted if a string or array is given as the "r" parameter.
* `b` (Type: Number)<br>
    Blue color component (0-1). May be null or omitted if a string or array is given as the "r" parameter.
* `a` (Type: Number) (optional)<br>
    Alpha color component (0-1). If the "r" parameter is given and this parameter is null or omitted, this value is treated as 1.0.

#### Return Value

This object. (Type: <a href="H3DU.Shape.md">H3DU.Shape</a>)

### H3DU.Shape#setMaterial(material) <a id='H3DU.Shape_H3DU.Shape_setMaterial'></a>

Sets this shape's material parameters.

#### Parameters

* `material` (Type: Material)<br>
    The material object to use.

#### Return Value

This object. (Type: <a href="H3DU.Shape.md">H3DU.Shape</a>)

### H3DU.Shape#setMaterialParams(params) <a id='H3DU.Shape_H3DU.Shape_setMaterialParams'></a>

Sets parameters of this shape's material.

#### Parameters

* `params` (Type: Object)<br>
    An object described in H3DU.Material#setParams.

#### Return Value

This object. (Type: <a href="H3DU.Shape.md">H3DU.Shape</a>)

### H3DU.Shape#setPosition(x, y, z) <a id='H3DU.Shape_H3DU.Shape_setPosition'></a>

Sets the relative position of this shape from its original
position. See H3DU.Transform#setPosition

#### Parameters

* `x` (Type: number | Array.&lt;Number>)<br>
    X coordinate or a 3-element position array, as specified in H3DU.Transform#setScale.
* `y` (Type: Number)<br>
    Y-coordinate.
* `z` (Type: Number)<br>
    Z-coordinate.

#### Return Value

This object. (Type: <a href="H3DU.Scene3D.md">H3DU.Scene3D</a>)

### H3DU.Shape#setQuaternion(quat) <a id='H3DU.Shape_H3DU.Shape_setQuaternion'></a>

Sets this object's orientation in the form of a <a href="tutorial-glmath.md">quaternion</a>.
See H3DU.Transform#setQuaternion.

#### Parameters

* `quat` (Type: Array.&lt;Number>)<br>
    A four-element array describing the rotation.

#### Return Value

This object. (Type: <a href="H3DU.Shape.md">H3DU.Shape</a>)

### H3DU.Shape#setScale(x, y, z) <a id='H3DU.Shape_H3DU.Shape_setScale'></a>

Sets the scale of this shape relative to its original
size. See H3DU.Transform#setScale

#### Parameters

* `x` (Type: number | Array.&lt;Number>)<br>
    Scaling factor for this object's width, or a 3-element scaling array, as specified in H3DU.Transform#setScale.
* `y` (Type: Number)<br>
    Scaling factor for this object's height.
* `z` (Type: Number)<br>
    Scaling factor for this object's depth.

#### Return Value

This object. (Type: <a href="H3DU.Scene3D.md">H3DU.Scene3D</a>)

### H3DU.Shape#setShader(shader) <a id='H3DU.Shape_H3DU.Shape_setShader'></a>

Sets this shape's material to a shader with the given URL.

#### Parameters

* `shader` (Type: <a href="H3DU.ShaderInfo.md">H3DU.ShaderInfo</a>)<br>
    Source code for a WebGL shader program. <i>Using a <a href="H3DU.ShaderProgram.md">H3DU.ShaderProgram</a> here is deprecated.</i>

#### Return Value

This object. (Type: <a href="H3DU.Shape.md">H3DU.Shape</a>)

### H3DU.Shape#setTexture(name) <a id='H3DU.Shape_H3DU.Shape_setTexture'></a>

Sets material parameters that give the shape a texture with the given URL.

#### Parameters

* `name` (Type: <a href="H3DU.Texture.md">H3DU.Texture</a> | String)<br>
    <a href="H3DU.Texture.md">H3DU.Texture</a> object, or a string with the URL of the texture data. In the case of a string the texture will be loaded via the JavaScript DOM's Image class. However, this method will not load that image if it hasn't been loaded yet.

#### Return Value

This object. (Type: <a href="H3DU.Shape.md">H3DU.Shape</a>)

### H3DU.Shape#setTextureAndColor(name, r, g, b, [a]) <a id='H3DU.Shape_H3DU.Shape_setTextureAndColor'></a>

Sets this shape's material to the given texture, and its ambient and
diffuse parameters to the given color.

#### Parameters

* `name` (Type: String)<br>
    <a href="H3DU.Texture.md">H3DU.Texture</a> object, or a string with the URL of the texture data. In the case of a string the texture will be loaded via the JavaScript DOM's Image class. However, this method will not load that image if it hasn't been loaded yet.
* `r` (Type: Array.&lt;Number> | number | string)<br>
    A <a href="H3DU.md#H3DU.toGLColor">color vector or string</a>, or the red color component (0-1).
* `g` (Type: Number)<br>
    Green color component (0-1). May be null or omitted if a string or array is given as the "r" parameter.
* `b` (Type: Number)<br>
    Blue color component (0-1). May be null or omitted if a string or array is given as the "r" parameter.
* `a` (Type: Number) (optional)<br>
    Alpha color component (0-1). If the "r" parameter is given and this parameter is null or omitted, this value is treated as 1.0.

#### Return Value

This object. (Type: <a href="H3DU.Shape.md">H3DU.Shape</a>)

### H3DU.Shape#setTransform(transform) <a id='H3DU.Shape_H3DU.Shape_setTransform'></a>

Sets this shape's transformation
to a copy of the given transformation.

#### Parameters

* `transform` (Type: <a href="H3DU.Transform.md">H3DU.Transform</a>)<br>
    The transformation to set to a copy of.

#### Return Value

This object. (Type: <a href="H3DU.Shape.md">H3DU.Shape</a>)

### H3DU.Shape#setVisible(value) <a id='H3DU.Shape_H3DU.Shape_setVisible'></a>

Sets whether this shape will be drawn on rendering.

#### Parameters

* `value` (Type: Boolean)<br>
    True if this shape will be visible; otherwise, false.

#### Return Value

This object. (Type: <a href="H3DU.Shape.md">H3DU.Shape</a>)

### H3DU.Shape#vertexCount() <a id='H3DU.Shape_H3DU.Shape_vertexCount'></a>

Gets the number of vertices composed by
all shapes in this scene.

#### Return Value

Return value. (Type: Number)

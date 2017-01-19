# H3DU.ShapeGroup

[Back to documentation index.](index.md)

### H3DU.ShapeGroup() <a id='H3DU.ShapeGroup'></a>

Represents a grouping of shapes. This object
can hold both <a href="H3DU.Shape.md">H3DU.Shape</a> objects and
other <a href="H3DU.ShapeGroup.md">H3DU.ShapeGroup</a> objects.

### Members

* [shapes](#H3DU.ShapeGroup_shapes)<br>List of shapes contained in this group.

### Methods

* [addShape](#H3DU.ShapeGroup_H3DU.ShapeGroup_addShape)<br>Adds a 3D shape to this shape group.
* [getBounds](#H3DU.ShapeGroup_H3DU.ShapeGroup_getBounds)<br>Finds a bounding box that holds all vertices in this shape group.
* [getMatrix](#H3DU.ShapeGroup_H3DU.ShapeGroup_getMatrix)<br>Gets a copy of the transformation needed to transform
this shape group's coordinates to world coordinates.
* [getTransform](#H3DU.ShapeGroup_H3DU.ShapeGroup_getTransform)<br>Gets a reference to the transform used by this shape group object.
* [getVisible](#H3DU.ShapeGroup_H3DU.ShapeGroup_getVisible)<br>Gets whether this shape group will be drawn on rendering.
* [primitiveCount](#H3DU.ShapeGroup_H3DU.ShapeGroup_primitiveCount)<br>Gets the number of primitives (triangles, lines,
and points) composed by all shapes in this shape group.
* [removeShape](#H3DU.ShapeGroup_H3DU.ShapeGroup_removeShape)<br>Removes all instances of a 3D shape from this shape group
* [setMaterial](#H3DU.ShapeGroup_H3DU.ShapeGroup_setMaterial)<br>Sets the material used by all shapes in this shape group.
* [setMaterialParams](#H3DU.ShapeGroup_H3DU.ShapeGroup_setMaterialParams)<br>Sets material parameters for all shapes in this shape group.
* [setPosition](#H3DU.ShapeGroup_H3DU.ShapeGroup_setPosition)<br>Sets the relative position of the shapes in this group
from their original position.
* [setQuaternion](#H3DU.ShapeGroup_H3DU.ShapeGroup_setQuaternion)<br>Sets this shape group's rotation in the form of a <a href="tutorial-glmath.md">quaternion</a>.
* [setScale](#H3DU.ShapeGroup_H3DU.ShapeGroup_setScale)<br>Sets the scale of this shape group relative to its original
size.
* [setShader](#H3DU.ShapeGroup_H3DU.ShapeGroup_setShader)<br>Sets the shader program used by all shapes in this shape group.
* [setTexture](#H3DU.ShapeGroup_H3DU.ShapeGroup_setTexture)<br>Sets the texture used by all shapes in this shape group.
* [setTransform](#H3DU.ShapeGroup_H3DU.ShapeGroup_setTransform)<br>Sets the transform used by this shape group to a copy
of the given transform.
* [setVisible](#H3DU.ShapeGroup_H3DU.ShapeGroup_setVisible)<br>Sets whether this shape group will be drawn on rendering.
* [vertexCount](#H3DU.ShapeGroup_H3DU.ShapeGroup_vertexCount)<br>Gets the number of vertices composed by all shapes in this shape group.

### H3DU.ShapeGroup#shapes <a id='H3DU.ShapeGroup_shapes'></a>

List of shapes contained in this group.
This property should only be used to access properties
and call methods on each shape, and not to add, remove
or replace shapes directly.

### H3DU.ShapeGroup#addShape(shape) <a id='H3DU.ShapeGroup_H3DU.ShapeGroup_addShape'></a>

Adds a 3D shape to this shape group. Its reference, not a copy,
will be stored in the list of shapes.

#### Parameters

* `shape` (Type: <a href="H3DU.Shape.md">H3DU.Shape</a> | <a href="H3DU.ShapeGroup.md">H3DU.ShapeGroup</a>)<br>
    A 3D shape.

#### Return Value

This object. (Type: <a href="H3DU.ShapeGroup.md">H3DU.ShapeGroup</a>)

### H3DU.ShapeGroup#getBounds() <a id='H3DU.ShapeGroup_H3DU.ShapeGroup_getBounds'></a>

Finds a bounding box that holds all vertices in this shape group.
The bounding box is not guaranteed to be the
tightest, and the box will be in world space coordinates.

#### Return Value

An array of six numbers describing an
axis-aligned bounding box
that fits all vertices in the shape group. The first three numbers
are the smallest-valued X, Y, and Z coordinates, and the
last three are the largest-valued X, Y, and Z coordinates.
If the shape group has no vertices, returns the array [Inf, Inf, Inf, -Inf,
-Inf, -Inf]. (Type: Array.&lt;Number>)

### H3DU.ShapeGroup#getMatrix() <a id='H3DU.ShapeGroup_H3DU.ShapeGroup_getMatrix'></a>

Gets a copy of the transformation needed to transform
this shape group's coordinates to world coordinates.

#### Return Value

A 4x4 matrix. (Type: <a href="H3DU.Transform.md">H3DU.Transform</a>)

### H3DU.ShapeGroup#getTransform() <a id='H3DU.ShapeGroup_H3DU.ShapeGroup_getTransform'></a>

Gets a reference to the transform used by this shape group object.

#### Return Value

Return value. (Type: <a href="H3DU.Transform.md">H3DU.Transform</a>)

### H3DU.ShapeGroup#getVisible() <a id='H3DU.ShapeGroup_H3DU.ShapeGroup_getVisible'></a>

Gets whether this shape group will be drawn on rendering.

#### Return Value

value True if this shape group will be visible; otherwise, false. (Type: Boolean)

### H3DU.ShapeGroup#primitiveCount() <a id='H3DU.ShapeGroup_H3DU.ShapeGroup_primitiveCount'></a>

Gets the number of primitives (triangles, lines,
and points) composed by all shapes in this shape group.

#### Return Value

Return value. (Type: Number)

### H3DU.ShapeGroup#removeShape(shape) <a id='H3DU.ShapeGroup_H3DU.ShapeGroup_removeShape'></a>

Removes all instances of a 3D shape from this shape group

#### Parameters

* `shape` (Type: <a href="H3DU.Shape.md">H3DU.Shape</a> | <a href="H3DU.ShapeGroup.md">H3DU.ShapeGroup</a>)<br>
    The 3D shape to remove.

#### Return Value

This object. (Type: <a href="H3DU.ShapeGroup.md">H3DU.ShapeGroup</a>)

### H3DU.ShapeGroup#setMaterial(material) <a id='H3DU.ShapeGroup_H3DU.ShapeGroup_setMaterial'></a>

Sets the material used by all shapes in this shape group.

#### Parameters

* `material` (Type: <a href="H3DU.Material.md">H3DU.Material</a>)<br>
    The material to use.

#### Return Value

Return value. (Type: Object)

### H3DU.ShapeGroup#setMaterialParams(params) <a id='H3DU.ShapeGroup_H3DU.ShapeGroup_setMaterialParams'></a>

Sets material parameters for all shapes in this shape group.

#### Parameters

* `params` (Type: Object)<br>
    An object described in H3DU.Material#setParams.

#### Return Value

This object. (Type: <a href="H3DU.Shape.md">H3DU.Shape</a>)

### H3DU.ShapeGroup#setPosition(x, y, z) <a id='H3DU.ShapeGroup_H3DU.ShapeGroup_setPosition'></a>

Sets the relative position of the shapes in this group
from their original position.
See H3DU.Transform#setPosition
This method will modify this shape group's transform
rather than the transform for each shape in the group.

#### Parameters

* `x` (Type: number | Array.&lt;Number>)<br>
    X coordinate or a 3-element position array, as specified in H3DU.Transform#setScale.
* `y` (Type: Number)<br>
    Y coordinate.
* `z` (Type: Number)<br>
    Z coordinate.

#### Return Value

This object. (Type: <a href="H3DU.Scene3D.md">H3DU.Scene3D</a>)

### H3DU.ShapeGroup#setQuaternion(quat) <a id='H3DU.ShapeGroup_H3DU.ShapeGroup_setQuaternion'></a>

Sets this shape group's rotation in the form of a <a href="tutorial-glmath.md">quaternion</a>.
See H3DU.Transform#setQuaternion.
This method will modify this shape group's transform
rather than the transform for each shape in the group.

#### Parameters

* `quat` (Type: Array.&lt;Number>)<br>
    A four-element array describing the rotation.

#### Return Value

This object. (Type: <a href="H3DU.Shape.md">H3DU.Shape</a>)

### H3DU.ShapeGroup#setScale(x, y, z) <a id='H3DU.ShapeGroup_H3DU.ShapeGroup_setScale'></a>

Sets the scale of this shape group relative to its original
size. See H3DU.Transform#setScale.
This method will modify this shape group's transform
rather than the transform for each shape in the group.

#### Parameters

* `x` (Type: number | Array.&lt;Number>)<br>
    Scaling factor for this object's width, or a 3-element scaling array, as specified in H3DU.Transform#setScale.
* `y` (Type: Number)<br>
    Scaling factor for this object's height.
* `z` (Type: Number)<br>
    Scaling factor for this object's depth.

#### Return Value

This object. (Type: <a href="H3DU.Scene3D.md">H3DU.Scene3D</a>)

### H3DU.ShapeGroup#setShader(material) <a id='H3DU.ShapeGroup_H3DU.ShapeGroup_setShader'></a>

Sets the shader program used by all shapes in this shape group.

#### Parameters

* `material` (Type: <a href="H3DU.ShaderInfo.md">H3DU.ShaderInfo</a>)<br>
    Source code for a WebGL shader program. <i>Using a <a href="H3DU.ShaderProgram.md">H3DU.ShaderProgram</a> here is deprecated.</i>

#### Return Value

Return value. (Type: Object)

### H3DU.ShapeGroup#setTexture(material) <a id='H3DU.ShapeGroup_H3DU.ShapeGroup_setTexture'></a>

Sets the texture used by all shapes in this shape group.

#### Parameters

* `material` (Type: <a href="H3DU.Texture.md">H3DU.Texture</a> | String)<br>
    <a href="H3DU.Texture.md">H3DU.Texture</a> object, or a string with the URL of the texture data. In the case of a string the texture will be loaded via the JavaScript DOM's Image class. However, this method will not load that image if it hasn't been loaded yet. NOTE: The default shader program assumes that the texture is in the sRGB color space (linear RGB with a gamma correction exponent of 1/2.2).

#### Return Value

Return value. (Type: Object)

### H3DU.ShapeGroup#setTransform(transform) <a id='H3DU.ShapeGroup_H3DU.ShapeGroup_setTransform'></a>

Sets the transform used by this shape group to a copy
of the given transform. Child
shapes can set their own transforms, in which case the
rendering process will multiply this shape group's transform
with the child shape's transform as it renders the child shape.

#### Parameters

* `transform` (Type: <a href="H3DU.Transform.md">H3DU.Transform</a>)<br>
    The transform to copy for the use of this shape group.

#### Return Value

Return value. (Type: Object)

### H3DU.ShapeGroup#setVisible(value) <a id='H3DU.ShapeGroup_H3DU.ShapeGroup_setVisible'></a>

Sets whether this shape group will be drawn on rendering.

#### Parameters

* `value` (Type: Boolean)<br>
    True if this shape group will be visible; otherwise, false.

#### Return Value

This object. (Type: <a href="H3DU.ShapeGroup.md">H3DU.ShapeGroup</a>)

### H3DU.ShapeGroup#vertexCount() <a id='H3DU.ShapeGroup_H3DU.ShapeGroup_vertexCount'></a>

Gets the number of vertices composed by all shapes in this shape group.

#### Return Value

Return value. (Type: Number)

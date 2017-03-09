# H3DU.ShapeGroup

[Back to documentation index.](index.md)

 <a name='H3DU.ShapeGroup'></a>
### H3DU.ShapeGroup()

Represents a grouping of shapes. This object
can hold both <a href="H3DU.Shape.md">H3DU.Shape</a> objects and
other <a href="H3DU.ShapeGroup.md">H3DU.ShapeGroup</a> objects.

### Members

* [shapes](#H3DU.ShapeGroup_shapes)<br><b>Deprecated: Use the <a href="H3DU.ShapeGroup.md#H3DU.ShapeGroup_shapeCount">H3DU.ShapeGroup#shapeCount</a>,
<a href="H3DU.ShapeGroup.md#H3DU.ShapeGroup_getShape">H3DU.ShapeGroup#getShape</a>, and
<a href="H3DU.ShapeGroup.md#H3DU.ShapeGroup_setShape">H3DU.ShapeGroup#setShape</a> methods instead.</b>

### Methods

* [addShape](#H3DU.ShapeGroup_addShape)<br>Adds a 3D shape to this shape group, at the end of the list
of shapes.
* [copy](#H3DU.ShapeGroup_copy)<br>Makes a copy of this shape group and the objects contained
in it.
* [getBounds](#H3DU.ShapeGroup_getBounds)<br>Finds a bounding box that holds all vertices in this shape group.
* [getMatrix](#H3DU.ShapeGroup_getMatrix)<br>Gets a copy of the transformation needed to transform
this shape group's coordinates to world coordinates.
* [getShape](#H3DU.ShapeGroup_getShape)<br>Gets the shape or shape group located
in this shape group at the given index.
* [getTransform](#H3DU.ShapeGroup_getTransform)<br>Gets a reference to the transform used by this shape group object.
* [getVisible](#H3DU.ShapeGroup_getVisible)<br>Gets whether this shape group will be drawn on rendering.
* [primitiveCount](#H3DU.ShapeGroup_primitiveCount)<br>Gets the number of primitives (triangles, lines,
and points) composed by all shapes in this shape group.
* [removeShape](#H3DU.ShapeGroup_removeShape)<br>Removes all instances of a 3D shape from this shape group
* [setMaterial](#H3DU.ShapeGroup_setMaterial)<br>Sets the material used by all shapes in this shape group.
* [setPosition](#H3DU.ShapeGroup_setPosition)<br>Sets the relative position of the shapes in this group
from their original position.
* [setQuaternion](#H3DU.ShapeGroup_setQuaternion)<br>Sets this shape group's rotation in the form of a <a href="tutorial-glmath.md">quaternion</a>.
* [setScale](#H3DU.ShapeGroup_setScale)<br>Sets the scale of this shape group relative to its original
size.
* [setShader](#H3DU.ShapeGroup_setShader)<br>Sets the shader program used by all shapes in this shape group.
* [setShape](#H3DU.ShapeGroup_setShape)<br>Sets a shape or shape group at the given index in this shape group.
* [setTexture](#H3DU.ShapeGroup_setTexture)<br>Sets the texture used by all shapes in this shape group.
* [setTransform](#H3DU.ShapeGroup_setTransform)<br>Sets the transform used by this shape group to a copy
of the given transform.
* [setVisible](#H3DU.ShapeGroup_setVisible)<br>Sets whether this shape group will be drawn on rendering.
* [shapeCount](#H3DU.ShapeGroup_shapeCount)<br>Returns the number of shapes and/or shape groups that
are direct children of this shape group.
* [vertexCount](#H3DU.ShapeGroup_vertexCount)<br>Gets the number of vertices composed by all shapes in this shape group.

<a id='H3DU.ShapeGroup_shapes'></a>
### H3DU.ShapeGroup#shapes

<b>Deprecated: Use the <a href="H3DU.ShapeGroup.md#H3DU.ShapeGroup_shapeCount">H3DU.ShapeGroup#shapeCount</a>,
<a href="H3DU.ShapeGroup.md#H3DU.ShapeGroup_getShape">H3DU.ShapeGroup#getShape</a>, and
<a href="H3DU.ShapeGroup.md#H3DU.ShapeGroup_setShape">H3DU.ShapeGroup#setShape</a> methods instead.</b>

List of shapes contained in this group.
This property should only be used to access properties
and call methods on each shape, and not to add, remove
or replace shapes directly.

 <a name='H3DU.ShapeGroup_addShape'></a>
### H3DU.ShapeGroup#addShape(shape)

Adds a 3D shape to this shape group, at the end of the list
of shapes. Its reference, not a copy,
will be stored in the list of shapes.

#### Parameters

* `shape` (Type: <a href="H3DU.Shape.md">H3DU.Shape</a> | <a href="H3DU.ShapeGroup.md">H3DU.ShapeGroup</a>)<br>
    A 3D shape. Throws an error if null.

#### Return Value

This object. (Type: <a href="H3DU.ShapeGroup.md">H3DU.ShapeGroup</a>)

 <a name='H3DU.ShapeGroup_copy'></a>
### H3DU.ShapeGroup#copy()

Makes a copy of this shape group and the objects contained
in it. The copied object will
will have its own version of the transform and
visibility flag, and any objects contained in this one
will be copied using their <code>copy()</code> method.
The copied shape group won't have a parent.

#### Return Value

A copy of this shape group. (Type: <a href="H3DU.ShapeGroup.md">H3DU.ShapeGroup</a>)

 <a name='H3DU.ShapeGroup_getBounds'></a>
### H3DU.ShapeGroup#getBounds()

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
-Inf, -Inf]. (Type: Array.&lt;number>)

 <a name='H3DU.ShapeGroup_getMatrix'></a>
### H3DU.ShapeGroup#getMatrix()

Gets a copy of the transformation needed to transform
this shape group's coordinates to world coordinates.

#### Return Value

A 4x4 matrix. (Type: <a href="H3DU.Transform.md">H3DU.Transform</a>)

 <a name='H3DU.ShapeGroup_getShape'></a>
### H3DU.ShapeGroup#getShape(index)

Gets the shape or shape group located
in this shape group at the given index.

#### Parameters

* `index` (Type: Number)<br>
    Integer index, starting from 0, of the shape or shape group to set.

#### Return Value

The shape or shape group located
in this shape group at the given index, or null if none is found there. (Type: <a href="H3DU.Shape.md">H3DU.Shape</a> | <a href="H3DU.ShapeGroup.md">H3DU.ShapeGroup</a>)

 <a name='H3DU.ShapeGroup_getTransform'></a>
### H3DU.ShapeGroup#getTransform()

Gets a reference to the transform used by this shape group object.

#### Return Value

Return value. (Type: <a href="H3DU.Transform.md">H3DU.Transform</a>)

 <a name='H3DU.ShapeGroup_getVisible'></a>
### H3DU.ShapeGroup#getVisible()

Gets whether this shape group will be drawn on rendering.

#### Return Value

value True if this shape group will be visible; otherwise, false. (Type: boolean)

 <a name='H3DU.ShapeGroup_primitiveCount'></a>
### H3DU.ShapeGroup#primitiveCount()

Gets the number of primitives (triangles, lines,
and points) composed by all shapes in this shape group.

#### Return Value

Return value. (Type: number)

 <a name='H3DU.ShapeGroup_removeShape'></a>
### H3DU.ShapeGroup#removeShape(shape)

Removes all instances of a 3D shape from this shape group

#### Parameters

* `shape` (Type: <a href="H3DU.Shape.md">H3DU.Shape</a> | <a href="H3DU.ShapeGroup.md">H3DU.ShapeGroup</a>)<br>
    The 3D shape to remove.

#### Return Value

This object. (Type: <a href="H3DU.ShapeGroup.md">H3DU.ShapeGroup</a>)

 <a name='H3DU.ShapeGroup_setMaterial'></a>
### H3DU.ShapeGroup#setMaterial(material)

Sets the material used by all shapes in this shape group.

#### Parameters

* `material` (Type: <a href="H3DU.Material.md">H3DU.Material</a>)<br>
    The material to use.

#### Return Value

Return value. (Type: Object)

 <a name='H3DU.ShapeGroup_setPosition'></a>
### H3DU.ShapeGroup#setPosition(x, y, z)

Sets the relative position of the shapes in this group
from their original position.
See <a href="H3DU.Transform.md#H3DU.Transform_setPosition">H3DU.Transform#setPosition</a>
This method will modify this shape group's transform
rather than the transform for each shape in the group.

#### Parameters

* `x` (Type: number | Array.&lt;Number>)<br>
    X coordinate or a 3-element position array, as specified in <a href="H3DU.Transform.md#H3DU.Transform_setScale">H3DU.Transform#setScale</a>.
* `y` (Type: Number)<br>
    Y coordinate.
* `z` (Type: Number)<br>
    Z coordinate.

#### Return Value

This object. (Type: <a href="H3DU.Scene3D.md">H3DU.Scene3D</a>)

 <a name='H3DU.ShapeGroup_setQuaternion'></a>
### H3DU.ShapeGroup#setQuaternion(quat)

Sets this shape group's rotation in the form of a <a href="tutorial-glmath.md">quaternion</a>.
See <a href="H3DU.Transform.md#H3DU.Transform_setQuaternion">H3DU.Transform#setQuaternion</a>.
This method will modify this shape group's transform
rather than the transform for each shape in the group.

#### Parameters

* `quat` (Type: Array.&lt;number>)<br>
    A four-element array describing the rotation.

#### Return Value

This object. (Type: <a href="H3DU.Shape.md">H3DU.Shape</a>)

 <a name='H3DU.ShapeGroup_setScale'></a>
### H3DU.ShapeGroup#setScale(x, y, z)

Sets the scale of this shape group relative to its original
size. See <a href="H3DU.Transform.md#H3DU.Transform_setScale">H3DU.Transform#setScale</a>.
This method will modify this shape group's transform
rather than the transform for each shape in the group.

#### Parameters

* `x` (Type: number | Array.&lt;Number>)<br>
    Scaling factor for this object's width, or a 3-element scaling array, as specified in <a href="H3DU.Transform.md#H3DU.Transform_setScale">H3DU.Transform#setScale</a>.
* `y` (Type: Number)<br>
    Scaling factor for this object's height.
* `z` (Type: Number)<br>
    Scaling factor for this object's depth.

#### Return Value

This object. (Type: <a href="H3DU.Scene3D.md">H3DU.Scene3D</a>)

 <a name='H3DU.ShapeGroup_setShader'></a>
### H3DU.ShapeGroup#setShader(material)

Sets the shader program used by all shapes in this shape group.

#### Parameters

* `material` (Type: <a href="H3DU.ShaderInfo.md">H3DU.ShaderInfo</a>)<br>
    Source code for a WebGL shader program. <i>Using a <a href="H3DU.ShaderProgram.md">H3DU.ShaderProgram</a> here is deprecated.</i>

#### Return Value

Return value. (Type: Object)

 <a name='H3DU.ShapeGroup_setShape'></a>
### H3DU.ShapeGroup#setShape(index, shape)

Sets a shape or shape group at the given index in this shape group.

#### Parameters

* `index` (Type: Number)<br>
    Integer index, starting from 0, to set the shape or shape group at.
* `shape` (Type: <a href="H3DU.Shape.md">H3DU.Shape</a> | <a href="H3DU.ShapeGroup.md">H3DU.ShapeGroup</a>)<br>
    Shape object to set at the given index.

#### Return Value

This object. (Type: <a href="H3DU.ShapeGroup.md">H3DU.ShapeGroup</a>)

 <a name='H3DU.ShapeGroup_setTexture'></a>
### H3DU.ShapeGroup#setTexture(material)

Sets the texture used by all shapes in this shape group.

#### Parameters

* `material` (Type: <a href="H3DU.Texture.md">H3DU.Texture</a> | String)<br>
    <a href="H3DU.Texture.md">H3DU.Texture</a> object, or a string with the URL of the texture data. In the case of a string the texture will be loaded via the JavaScript DOM's Image class. However, this method will not load that image if it hasn't been loaded yet. This parameter can also be a <a href="H3DU.FrameBuffer.md">H3DU.FrameBuffer</a> object that refers to a frame buffer; this can be useful if that frame buffer refers to a shader-generated texture (see the <code>procedtexture</code> demo in the HTML 3D Library to see how this is done). NOTE: The default shader program assumes that the texture is in the <a href="H3DU.Math.md#H3DU.Math.colorTosRGB">sRGB color space</a>.

#### Return Value

Return value. (Type: Object)

 <a name='H3DU.ShapeGroup_setTransform'></a>
### H3DU.ShapeGroup#setTransform(transform)

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

 <a name='H3DU.ShapeGroup_setVisible'></a>
### H3DU.ShapeGroup#setVisible(value)

Sets whether this shape group will be drawn on rendering.

#### Parameters

* `value` (Type: Boolean)<br>
    True if this shape group will be visible; otherwise, false.

#### Return Value

This object. (Type: <a href="H3DU.ShapeGroup.md">H3DU.ShapeGroup</a>)

 <a name='H3DU.ShapeGroup_shapeCount'></a>
### H3DU.ShapeGroup#shapeCount()

Returns the number of shapes and/or shape groups that
are direct children of this shape group.

#### Return Value

Return value. (Type: number)

 <a name='H3DU.ShapeGroup_vertexCount'></a>
### H3DU.ShapeGroup#vertexCount()

Gets the number of vertices composed by all shapes in this shape group.

#### Return Value

Return value. (Type: number)

# H3DU.ShapeGroup

[Back to documentation index.](index.md)

<a name='H3DU.ShapeGroup'></a>
### H3DU.ShapeGroup()

Represents a grouping of shapes. This object
can hold both Shape objects and
other ShapeGroup objects.

### Members

* [shapes](#H3DU.ShapeGroup_shapes)<br>**Deprecated: Use the ShapeGroup#shapeCount,
ShapeGroup#getShape, and
ShapeGroup#setShape methods instead.**

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
* [setPosition](#H3DU.ShapeGroup_setPosition)<br>Sets the relative position of the shapes in this group
from their original position.
* [setQuaternion](#H3DU.ShapeGroup_setQuaternion)<br>Sets this shape group's rotation in the form of a <a href="tutorial-glmath.md">quaternion</a>.
* [setScale](#H3DU.ShapeGroup_setScale)<br>Sets the scale of this shape group relative to its original
size.
* [setShape](#H3DU.ShapeGroup_setShape)<br>Sets a shape or shape group at the given index in this shape group.
* [setTransform](#H3DU.ShapeGroup_setTransform)<br>Sets the transform used by this shape group to a copy
of the given transform.
* [setVisible](#H3DU.ShapeGroup_setVisible)<br>Sets whether this shape group will be drawn on rendering.
* [shapeCount](#H3DU.ShapeGroup_shapeCount)<br>Returns the number of shapes and/or shape groups that
are direct children of this shape group.
* [vertexCount](#H3DU.ShapeGroup_vertexCount)<br>Gets the number of vertices composed by all shapes in this shape group.

<a name='H3DU.ShapeGroup_shapes'></a>
### H3DU.ShapeGroup#shapes

**Deprecated: Use the ShapeGroup#shapeCount,
ShapeGroup#getShape, and
ShapeGroup#setShape methods instead.**

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

* `shape` (Type: Shape | ShapeGroup)<br>A 3D shape. Throws an error if null.

#### Return Value

This object. (Type: ShapeGroup)

<a name='H3DU.ShapeGroup_copy'></a>
### H3DU.ShapeGroup#copy()

Makes a copy of this shape group and the objects contained
in it. The copied object will
will have its own version of the transform and
visibility flag, and any objects contained in this one
will be copied using their <code>copy()</code> method.
The copied shape group won't have a parent.

#### Return Value

A copy of this shape group. (Type: ShapeGroup)

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

A 4x4 matrix. (Type: Transform)

<a name='H3DU.ShapeGroup_getShape'></a>
### H3DU.ShapeGroup#getShape(index)

Gets the shape or shape group located
in this shape group at the given index.

#### Parameters

* `index` (Type: number)<br>Integer index, starting from 0, of the shape or shape group to set.

#### Return Value

The shape or shape group located
in this shape group at the given index, or null if none is found there. (Type: Shape | ShapeGroup)

<a name='H3DU.ShapeGroup_getTransform'></a>
### H3DU.ShapeGroup#getTransform()

Gets a reference to the transform used by this shape group object.

#### Return Value

Return value. (Type: Transform)

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

* `shape` (Type: Shape | ShapeGroup)<br>The 3D shape to remove.

#### Return Value

This object. (Type: ShapeGroup)

<a name='H3DU.ShapeGroup_setPosition'></a>
### H3DU.ShapeGroup#setPosition(x, y, z)

Sets the relative position of the shapes in this group
from their original position.
See Transform#setPosition
This method will modify this shape group's transform
rather than the transform for each shape in the group.

#### Parameters

* `x` (Type: number | Array.&lt;number>)<br>X coordinate or a 3-element position array, as specified in Transform#setScale.
* `y` (Type: number)<br>Y coordinate.
* `z` (Type: number)<br>Z coordinate.

#### Return Value

This object. (Type: ShapeGroup)

<a name='H3DU.ShapeGroup_setQuaternion'></a>
### H3DU.ShapeGroup#setQuaternion(quat)

Sets this shape group's rotation in the form of a <a href="tutorial-glmath.md">quaternion</a>.
See Transform#setQuaternion.
This method will modify this shape group's transform
rather than the transform for each shape in the group.

#### Parameters

* `quat` (Type: Array.&lt;number>)<br>A four-element array describing the rotation.

#### Return Value

This object. (Type: ShapeGroup)

<a name='H3DU.ShapeGroup_setScale'></a>
### H3DU.ShapeGroup#setScale(x, y, z)

Sets the scale of this shape group relative to its original
size. See Transform#setScale.
This method will modify this shape group's transform
rather than the transform for each shape in the group.

#### Parameters

* `x` (Type: number | Array.&lt;number>)<br>Scaling factor for this object's width, or a 3-element scaling array, as specified in Transform#setScale.
* `y` (Type: number)<br>Scaling factor for this object's height.
* `z` (Type: number)<br>Scaling factor for this object's depth.

#### Return Value

This object. (Type: ShapeGroup)

<a name='H3DU.ShapeGroup_setShape'></a>
### H3DU.ShapeGroup#setShape(index, shape)

Sets a shape or shape group at the given index in this shape group.

#### Parameters

* `index` (Type: number)<br>Integer index, starting from 0, to set the shape or shape group at.
* `shape` (Type: Shape | ShapeGroup)<br>Shape object to set at the given index.

#### Return Value

This object. (Type: ShapeGroup)

<a name='H3DU.ShapeGroup_setTransform'></a>
### H3DU.ShapeGroup#setTransform(transform)

Sets the transform used by this shape group to a copy
of the given transform. Child
shapes can set their own transforms, in which case the
rendering process will multiply this shape group's transform
with the child shape's transform as it renders the child shape.

#### Parameters

* `transform` (Type: Transform)<br>The transform to copy for the use of this shape group.

#### Return Value

Return value. (Type: Object)

<a name='H3DU.ShapeGroup_setVisible'></a>
### H3DU.ShapeGroup#setVisible(value)

Sets whether this shape group will be drawn on rendering.

#### Parameters

* `value` (Type: boolean)<br>True if this shape group will be visible; otherwise, false.

#### Return Value

This object. (Type: ShapeGroup)

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

[Back to documentation index.](index.md)

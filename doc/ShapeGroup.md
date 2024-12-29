# ShapeGroup

[Back to documentation index.](index.md)

<a name='ShapeGroup'></a>
### new ShapeGroup()

**Deprecated: It is intended to render this class obsolete and rely on three.js.**

Represents a grouping of shapes. This object
can hold both Shape objects and
other <a href="ShapeGroup.md">ShapeGroup</a> objects.

### Methods

* [addShape](#ShapeGroup_addShape)<br>Adds a 3D shape to this shape group, at the end of the list
of shapes.
* [copy](#ShapeGroup_copy)<br>Makes a copy of this shape group and the objects contained
in it.
* [getBounds](#ShapeGroup_getBounds)<br>Finds a bounding box that holds all vertices in this shape group.
* [getMatrix](#ShapeGroup_getMatrix)<br>Gets a copy of the transformation needed to transform
this shape group's-coordinates to world coordinates.
* [getShape](#ShapeGroup_getShape)<br>Gets the shape or shape group located
in this shape group at the given index.
* [getTransform](#ShapeGroup_getTransform)<br>Gets a reference to the transform used by this shape group object.
* [getVisible](#ShapeGroup_getVisible)<br>Gets whether this shape group will be drawn on rendering.
* [primitiveCount](#ShapeGroup_primitiveCount)<br>Gets the number of primitives (triangles, lines,
and points) composed by all shapes in this shape group.
* [removeShape](#ShapeGroup_removeShape)<br>Removes all instances of a 3D shape from this shape group
* [setPosition](#ShapeGroup_setPosition)<br>Sets the relative position of the shapes in this group
from their original position.
* [setQuaternion](#ShapeGroup_setQuaternion)<br>Sets this shape group's rotation in the form of a glmath.
* [setScale](#ShapeGroup_setScale)<br>Sets the scale of this shape group relative to its original
size.
* [setShape](#ShapeGroup_setShape)<br>Sets a shape or shape group at the given index in this shape group.
* [setTransform](#ShapeGroup_setTransform)<br>Sets the transform used by this shape group to a copy
of the given transform.
* [setVisible](#ShapeGroup_setVisible)<br>Sets whether this shape group will be drawn on rendering.
* [shapeCount](#ShapeGroup_shapeCount)<br>Returns the number of shapes and/or shape groups that
are direct children of this shape group.
* [vertexCount](#ShapeGroup_vertexCount)<br>Gets the number of vertices composed by all shapes in this shape group.

<a name='ShapeGroup_addShape'></a>
### ShapeGroup#addShape(shape)

Adds a 3D shape to this shape group, at the end of the list
of shapes. Its reference, not a copy,
will be stored in the list of shapes.

#### Parameters

* `shape` (Type: <a href="ShapeGroup.md">ShapeGroup</a>)<br>A 3D shape. Throws an error if null.

#### Return Value

This object. (Type: <a href="ShapeGroup.md">ShapeGroup</a>)

<a name='ShapeGroup_copy'></a>
### ShapeGroup#copy()

Makes a copy of this shape group and the objects contained
in it. The copied object will
will have its own version of the transform and
visibility flag, and any objects contained in this one
will be copied using their <code>copy()</code> method.
The copied shape group won't have a parent.

#### Return Value

A copy of this shape group. (Type: <a href="ShapeGroup.md">ShapeGroup</a>)

<a name='ShapeGroup_getBounds'></a>
### ShapeGroup#getBounds()

Finds a bounding box that holds all vertices in this shape group.
The bounding box is not guaranteed to be the
tightest, and the box will be in world space coordinates.

#### Return Value

An array of six numbers describing an
axis-aligned bounding box
that fits all vertices in the shape group. The first three numbers
are the smallest-valued x-, y-, and z-coordinates, and the
last three are the largest-valued x-, y-, and z-coordinates.
If the shape group has no vertices, returns the array [Inf, Inf, Inf, -Inf,
-Inf, -Inf]. (Type: Array.&lt;number>)

<a name='ShapeGroup_getMatrix'></a>
### ShapeGroup#getMatrix()

Gets a copy of the transformation needed to transform
this shape group's-coordinates to world coordinates.

#### Return Value

A 4 &times; 4 matrix. (Type: <a href="Transform.md">Transform</a>)

<a name='ShapeGroup_getShape'></a>
### ShapeGroup#getShape(index)

Gets the shape or shape group located
in this shape group at the given index.

#### Parameters

* `index` (Type: number)<br>Integer index, starting from 0, of the shape or shape group to set.

#### Return Value

The shape or shape group located
in this shape group at the given index, or null if none is found there. (Type: <a href="ShapeGroup.md">ShapeGroup</a>)

<a name='ShapeGroup_getTransform'></a>
### ShapeGroup#getTransform()

Gets a reference to the transform used by this shape group object.

#### Return Value

Return value. (Type: <a href="Transform.md">Transform</a>)

<a name='ShapeGroup_getVisible'></a>
### ShapeGroup#getVisible()

Gets whether this shape group will be drawn on rendering.

#### Return Value

value True if this shape group will be visible; otherwise, false. (Type: boolean)

<a name='ShapeGroup_primitiveCount'></a>
### ShapeGroup#primitiveCount()

Gets the number of primitives (triangles, lines,
and points) composed by all shapes in this shape group.

#### Return Value

Return value. (Type: number)

<a name='ShapeGroup_removeShape'></a>
### ShapeGroup#removeShape(shape)

Removes all instances of a 3D shape from this shape group

#### Parameters

* `shape` (Type: <a href="ShapeGroup.md">ShapeGroup</a>)<br>The 3D shape to remove.

#### Return Value

This object. (Type: <a href="ShapeGroup.md">ShapeGroup</a>)

<a name='ShapeGroup_setPosition'></a>
### ShapeGroup#setPosition(x, y, z)

Sets the relative position of the shapes in this group
from their original position.
See <a href="Transform.md#Transform_setPosition">Transform#setPosition</a>
This method will modify this shape group's transform
rather than the transform for each shape in the group.

#### Parameters

* `x` (Type: number | Array.&lt;number>)<br>x-coordinate or a 3-element position array, as specified in <a href="Transform.md#Transform_setScale">Transform#setScale</a>.
* `y` (Type: number)<br>The y-coordinate.
* `z` (Type: number)<br>The z-coordinate.

#### Return Value

This object. (Type: <a href="ShapeGroup.md">ShapeGroup</a>)

<a name='ShapeGroup_setQuaternion'></a>
### ShapeGroup#setQuaternion(quat)

Sets this shape group's rotation in the form of a glmath.
See <a href="Transform.md#Transform_setQuaternion">Transform#setQuaternion</a>.
This method will modify this shape group's transform
rather than the transform for each shape in the group.

#### Parameters

* `quat` (Type: Array.&lt;number>)<br>A four-element array describing the rotation.

#### Return Value

This object. (Type: <a href="ShapeGroup.md">ShapeGroup</a>)

<a name='ShapeGroup_setScale'></a>
### ShapeGroup#setScale(x, y, z)

Sets the scale of this shape group relative to its original
size. See <a href="Transform.md#Transform_setScale">Transform#setScale</a>.
This method will modify this shape group's transform
rather than the transform for each shape in the group.

#### Parameters

* `x` (Type: number | Array.&lt;number>)<br>Scaling factor for this object's width, or a 3-element scaling array, as specified in <a href="Transform.md#Transform_setScale">Transform#setScale</a>.
* `y` (Type: number)<br>Scaling factor for this object's height.
* `z` (Type: number)<br>Scaling factor for this object's depth.

#### Return Value

This object. (Type: <a href="ShapeGroup.md">ShapeGroup</a>)

<a name='ShapeGroup_setShape'></a>
### ShapeGroup#setShape(index, shape)

Sets a shape or shape group at the given index in this shape group.

#### Parameters

* `index` (Type: number)<br>Integer index, starting from 0, to set the shape or shape group at.
* `shape` (Type: <a href="ShapeGroup.md">ShapeGroup</a>)<br>Shape object to set at the given index.

#### Return Value

This object. (Type: <a href="ShapeGroup.md">ShapeGroup</a>)

<a name='ShapeGroup_setTransform'></a>
### ShapeGroup#setTransform(transform)

Sets the transform used by this shape group to a copy
of the given transform. Child
shapes can set their own transforms, in which case the
rendering process will multiply this shape group's transform
with the child shape's transform as it renders the child shape.

#### Parameters

* `transform` (Type: <a href="Transform.md">Transform</a>)<br>The transform to copy for the use of this shape group.

#### Return Value

Return value. (Type: Object)

<a name='ShapeGroup_setVisible'></a>
### ShapeGroup#setVisible(value)

Sets whether this shape group will be drawn on rendering.

#### Parameters

* `value` (Type: boolean)<br>True if this shape group will be visible; otherwise, false.

#### Return Value

This object. (Type: <a href="ShapeGroup.md">ShapeGroup</a>)

<a name='ShapeGroup_shapeCount'></a>
### ShapeGroup#shapeCount()

Returns the number of shapes and/or shape groups that
are direct children of this shape group.

#### Return Value

Return value. (Type: number)

<a name='ShapeGroup_vertexCount'></a>
### ShapeGroup#vertexCount()

Gets the number of vertices composed by all shapes in this shape group.

#### Return Value

Return value. (Type: number)

[Back to documentation index.](index.md)

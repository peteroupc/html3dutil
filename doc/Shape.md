# Shape

[Back to documentation index.](index.md)

<a name='Shape'></a>
### new Shape(mesh)

An object that associates a geometric mesh (the shape of the object) with
a transformation matrix (which defines the object's position and size).
See the "<a href="tutorial-shapes.md">Creating Shapes</a>" tutorial.

#### Parameters

* `mesh` (Type: <a href="MeshBuffer.md">MeshBuffer</a>)<br>A mesh in the form of a buffer object. Cannot be null.

### Methods

* [copy](#Shape_copy)<br>Makes a copy of this object.
* [getBounds](#Shape_getBounds)<br>Finds a bounding box that holds all vertices in this shape.
* [getMatrix](#Shape_getMatrix)<br>Gets the transformation matrix used by this shape.
* [getMeshBuffer](#Shape_getMeshBuffer)<br>Returns a reference to the mesh buffer used by this shape.
* [getTransform](#Shape_getTransform)<br>Returns the transform used by this shape object.
* [getVisible](#Shape_getVisible)<br>Gets whether this shape will be drawn on rendering.
* [primitiveCount](#Shape_primitiveCount)<br>Gets the number of primitives (triangles, lines,
and points) composed by all shapes in this scene.
* [setPosition](#Shape_setPosition)<br>Sets the relative position of this shape from its original
position.
* [setQuaternion](#Shape_setQuaternion)<br>Sets this object's rotation in the form of a <a href="tutorial-glmath.md">quaternion</a>.
* [setScale](#Shape_setScale)<br>Sets the scale of this shape relative to its original
size.
* [setTransform](#Shape_setTransform)<br>Sets this shape's transformation
to a copy of the given transformation.
* [setVisible](#Shape_setVisible)<br>Sets whether this shape will be drawn on rendering.
* [vertexCount](#Shape_vertexCount)<br>Gets the number of vertices composed by
all shapes in this scene.

<a name='Shape_copy'></a>
### Shape#copy()

Makes a copy of this object. The copied object
will have its own version of the transform.
The copied shape won't have a parent.

#### Return Value

A copy of this object. (Type: <a href="Shape.md">Shape</a>)

<a name='Shape_getBounds'></a>
### Shape#getBounds()

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
-Inf, -Inf]. (Type: Array.&lt;number>)

<a name='Shape_getMatrix'></a>
### Shape#getMatrix()

Gets the transformation matrix used by this shape.
See <a href="Transform.md#Transform_getMatrix">Transform#getMatrix</a>.

#### Return Value

The current transformation matrix. (Type: Array.&lt;number>)

<a name='Shape_getMeshBuffer'></a>
### Shape#getMeshBuffer()

Returns a reference to the mesh buffer used by this shape.

#### Return Value

Return value. (Type: <a href="MeshBuffer.md">MeshBuffer</a>)

<a name='Shape_getTransform'></a>
### Shape#getTransform()

Returns the transform used by this shape object.
The transform won't be copied.

#### Return Value

Return value. (Type: <a href="Transform.md">Transform</a>)

<a name='Shape_getVisible'></a>
### Shape#getVisible()

Gets whether this shape will be drawn on rendering.

#### Return Value

True if this shape will be visible; otherwise, false. (Type: boolean)

<a name='Shape_primitiveCount'></a>
### Shape#primitiveCount()

Gets the number of primitives (triangles, lines,
and points) composed by all shapes in this scene.

#### Return Value

Return value. (Type: number)

<a name='Shape_setPosition'></a>
### Shape#setPosition(x, [y], [z])

Sets the relative position of this shape from its original
position. See <a href="Transform.md#Transform_setPosition">Transform#setPosition</a>

#### Parameters

* `x` (Type: Array.&lt;number> | number)<br>The X coordinate. If "y" and "z" are null, undefined, or omitted, this is instead a 3-element array giving the X, Y, and Z coordinates, or a single number giving the coordinate for all three dimensions.
* `y` (Type: number) (optional)<br>The Y coordinate. If "x" is an array, this parameter may be omitted.
* `z` (Type: number) (optional)<br>The Z coordinate. If "x" is an array, this parameter may be omitted.

#### Return Value

This object. (Type: <a href="Shape.md">Shape</a>)

#### Examples

    // Set the relative position to 2 units along X axis, 4 units along Y axis,
    // and 5 units along Z axis
    shape.setPosition(2,4,5);
    // same, but passing an array
    shape.setPosition([2,4,5]);

<a name='Shape_setQuaternion'></a>
### Shape#setQuaternion(quat)

Sets this object's rotation in the form of a <a href="tutorial-glmath.md">quaternion</a>.
See <a href="Transform.md#Transform_setQuaternion">Transform#setQuaternion</a>.

#### Parameters

* `quat` (Type: Array.&lt;number>)<br>A four-element array describing the rotation.

#### Return Value

This object. (Type: <a href="Shape.md">Shape</a>)

#### Examples

    // rotate the shape 40 units about X axis, 20 units about Y axis,
    // and 50 units about Z axis
    shape.setQuaternion(H3DU.MathUtil.quatFromTaitBryan(40,20,50));
    // rotate the shape 20 units about Y axis
    shape.setQuaternion(H3DU.MathUtil.quatFromAxisAngle(20,0,1,0));

<a name='Shape_setScale'></a>
### Shape#setScale(x, [y], [z])

Sets the scale of this shape relative to its original
size. See <a href="Transform.md#Transform_setScale">Transform#setScale</a>

#### Parameters

* `x` (Type: number | Array.&lt;number>)<br>X axis scaling factor for this shape object. If "y" and "z" are null, undefined, or omitted, this is instead a 3-element array giving the scaling factors for the X, Y, and Z dimensions, respectively, or a single number giving the scaling factor for all three dimensions.
* `y` (Type: number) (optional)<br>Y axis scaling factor for this shape object.
* `z` (Type: number) (optional)<br>Z axis scaling factor for this shape object.

#### Return Value

This object. (Type: <a href="Shape.md">Shape</a>)

#### Examples

    // scale the shape by 2x in all axes
    shape.setScale(2,2,2);
    // same, but passing an array
    shape.setScale([2,2,2]);

<a name='Shape_setTransform'></a>
### Shape#setTransform(transform)

Sets this shape's transformation
to a copy of the given transformation.

#### Parameters

* `transform` (Type: <a href="Transform.md">Transform</a>)<br>The transformation to set to a copy of.

#### Return Value

This object. (Type: <a href="Shape.md">Shape</a>)

<a name='Shape_setVisible'></a>
### Shape#setVisible(value)

Sets whether this shape will be drawn on rendering.

#### Parameters

* `value` (Type: boolean)<br>True if this shape will be visible; otherwise, false.

#### Return Value

This object. (Type: <a href="Shape.md">Shape</a>)

<a name='Shape_vertexCount'></a>
### Shape#vertexCount()

Gets the number of vertices composed by
all shapes in this scene.

#### Return Value

Return value. (Type: number)

[Back to documentation index.](index.md)

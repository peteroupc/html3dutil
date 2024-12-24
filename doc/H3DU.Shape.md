# H3DU.Shape

[Back to documentation index.](index.md)

<a name='H3DU.Shape'></a>
### new H3DU.Shape(mesh)

An object that associates a geometric mesh (the shape of the object) with
a transformation matrix (which defines the object's position and size).
See the "<a href="tutorial-shapes.md">Creating Shapes</a>" tutorial.

#### Parameters

* `mesh` (Type: MeshBuffer)<br>A mesh in the form of a buffer object. Cannot be null.

### Methods

* [copy](#H3DU.Shape_copy)<br>Makes a copy of this object.
* [getBounds](#H3DU.Shape_getBounds)<br>Finds a bounding box that holds all vertices in this shape.
* [getMatrix](#H3DU.Shape_getMatrix)<br>Gets the transformation matrix used by this shape.
* [getMeshBuffer](#H3DU.Shape_getMeshBuffer)<br>Returns a reference to the mesh buffer used by this shape.
* [getTransform](#H3DU.Shape_getTransform)<br>Returns the transform used by this shape object.
* [getVisible](#H3DU.Shape_getVisible)<br>Gets whether this shape will be drawn on rendering.
* [primitiveCount](#H3DU.Shape_primitiveCount)<br>Gets the number of primitives (triangles, lines,
and points) composed by all shapes in this scene.
* [setPosition](#H3DU.Shape_setPosition)<br>Sets the relative position of this shape from its original
position.
* [setQuaternion](#H3DU.Shape_setQuaternion)<br>Sets this object's rotation in the form of a <a href="tutorial-glmath.md">quaternion</a>.
* [setScale](#H3DU.Shape_setScale)<br>Sets the scale of this shape relative to its original
size.
* [setTransform](#H3DU.Shape_setTransform)<br>Sets this shape's transformation
to a copy of the given transformation.
* [setVisible](#H3DU.Shape_setVisible)<br>Sets whether this shape will be drawn on rendering.
* [vertexCount](#H3DU.Shape_vertexCount)<br>Gets the number of vertices composed by
all shapes in this scene.

<a name='H3DU.Shape_copy'></a>
### H3DU.Shape#copy()

Makes a copy of this object. The copied object
will have its own version of the transform.
The copied shape won't have a parent.

#### Return Value

A copy of this object. (Type: Shape)

<a name='H3DU.Shape_getBounds'></a>
### H3DU.Shape#getBounds()

Finds a bounding box that holds all vertices in this shape.
The bounding box is not guaranteed to be the
tightest, and the box will be transformed to world space
using this object's transform.

#### Return Value

An array of six numbers describing an
axis-aligned bounding box
that fits all vertices in the shape. The first three numbers
are the smallest-valued x-, y-, and z-coordinates, and the
last three are the largest-valued x-, y-, and z-coordinates.
If the shape has no vertices, returns the array [Inf, Inf, Inf, -Inf,
-Inf, -Inf]. (Type: Array.&lt;number>)

<a name='H3DU.Shape_getMatrix'></a>
### H3DU.Shape#getMatrix()

Gets the transformation matrix used by this shape.
See Transform#getMatrix.

#### Return Value

The current transformation matrix. (Type: Array.&lt;number>)

<a name='H3DU.Shape_getMeshBuffer'></a>
### H3DU.Shape#getMeshBuffer()

Returns a reference to the mesh buffer used by this shape.

#### Return Value

Return value. (Type: MeshBuffer)

<a name='H3DU.Shape_getTransform'></a>
### H3DU.Shape#getTransform()

Returns the transform used by this shape object.
The transform won't be copied.

#### Return Value

Return value. (Type: Transform)

<a name='H3DU.Shape_getVisible'></a>
### H3DU.Shape#getVisible()

Gets whether this shape will be drawn on rendering.

#### Return Value

True if this shape will be visible; otherwise, false. (Type: boolean)

<a name='H3DU.Shape_primitiveCount'></a>
### H3DU.Shape#primitiveCount()

Gets the number of primitives (triangles, lines,
and points) composed by all shapes in this scene.

#### Return Value

Return value. (Type: number)

<a name='H3DU.Shape_setPosition'></a>
### H3DU.Shape#setPosition(x, [y], [z])

Sets the relative position of this shape from its original
position. See Transform#setPosition

#### Parameters

* `x` (Type: Array.&lt;number> | number)<br>The x-coordinate. If "y" and "z" are null, undefined, or omitted, this is instead a 3-element array giving the x-, y-, and z-coordinates, or a single number giving the coordinate for all three dimensions.
* `y` (Type: number) (optional)<br>The y-coordinate. If "x" is an array, this parameter may be omitted.
* `z` (Type: number) (optional)<br>The z-coordinate. If "x" is an array, this parameter may be omitted.

#### Return Value

This object. (Type: Shape)

#### Examples

    // Set the relative position to 2 units along x-axis, 4 units along y-axis,
    // and 5 units along z-axis
    shape.setPosition(2,4,5);
    // same, but passing an array
    shape.setPosition([2,4,5]);

<a name='H3DU.Shape_setQuaternion'></a>
### H3DU.Shape#setQuaternion(quat)

Sets this object's rotation in the form of a <a href="tutorial-glmath.md">quaternion</a>.
See Transform#setQuaternion.

#### Parameters

* `quat` (Type: Array.&lt;number>)<br>A four-element array describing the rotation.

#### Return Value

This object. (Type: Shape)

#### Examples

    // rotate the shape 40 units about x-axis, 20 units about y-axis,
    // and 50 units about z-axis
    shape.setQuaternion(H3DU.MathUtil.quatFromTaitBryan(40,20,50));
    // rotate the shape 20 units about y-axis
    shape.setQuaternion(H3DU.MathUtil.quatFromAxisAngle(20,0,1,0));

<a name='H3DU.Shape_setScale'></a>
### H3DU.Shape#setScale(x, [y], [z])

Sets the scale of this shape relative to its original
size. See Transform#setScale

#### Parameters

* `x` (Type: number | Array.&lt;number>)<br>x-axis scaling factor for this shape object. If "y" and "z" are null, undefined, or omitted, this is instead a 3-element array giving the scaling factors for the X, Y, and Z dimensions, respectively, or a single number giving the scaling factor for all three dimensions.
* `y` (Type: number) (optional)<br>y-axis scaling factor for this shape object.
* `z` (Type: number) (optional)<br>z-axis scaling factor for this shape object.

#### Return Value

This object. (Type: Shape)

#### Examples

    // scale the shape by 2x in all axes
    shape.setScale(2,2,2);
    // same, but passing an array
    shape.setScale([2,2,2]);

<a name='H3DU.Shape_setTransform'></a>
### H3DU.Shape#setTransform(transform)

Sets this shape's transformation
to a copy of the given transformation.

#### Parameters

* `transform` (Type: Transform)<br>The transformation to set to a copy of.

#### Return Value

This object. (Type: Shape)

<a name='H3DU.Shape_setVisible'></a>
### H3DU.Shape#setVisible(value)

Sets whether this shape will be drawn on rendering.

#### Parameters

* `value` (Type: boolean)<br>True if this shape will be visible; otherwise, false.

#### Return Value

This object. (Type: Shape)

<a name='H3DU.Shape_vertexCount'></a>
### H3DU.Shape#vertexCount()

Gets the number of vertices composed by
all shapes in this scene.

#### Return Value

Return value. (Type: number)

[Back to documentation index.](index.md)

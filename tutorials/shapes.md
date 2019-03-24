<a id=Introduction></a>
## Introduction

This page explains how my [**HTML 3D Library**](http://peteroupc.github.io/html3dutil)
supports 3D shapes and how to use the library to create shapes, both built-in and custom
shapes.

This page will discuss:

* Binding mesh buffers to shapes
* Shape groups, or combinations of several shapes

<a id=Contents></a>
## Contents

- [**Introduction**](#Introduction)
- [**Contents**](#Contents)
- [**Binding Shapes**](#Binding_Shapes)
- [**Shape Groups**](#Shape_Groups)

<a id=Binding_Shapes></a>
## Binding Shapes

Once you have a mesh of a 3D shape, you still need to attach it to a shape
and a batch of shapes in order for the renderer to draw it. This is where
the [`H3DU.Shape`]{@link Shape} class comes into
play; this class associates a 3D mesh with its location in the scene,
as well as its color, its appearance, and how its vertices will be transformed.
To attach a mesh to a 3D scene:

1. Create a `Shape` object by passing the mesh buffer to the `H3DU.Shape` constructor:

        var shape = new H3DU.Shape(meshBuffer);

    Note that `setPosition`, `setQuaternion`, and `setScale` don't change
the vertices of the underlying mesh the shape uses, but rather set up
a [_transformation matrix_]{@tutorial glmath} that adjusts each vertex
in the shape "on the fly" when it comes time to draw it each frame.

    If `setMatrix` wasn't called, then when the shape is rendered, it will generate
a transformation matrix that has the effect of scaling, then rotating,
then translating (shifting) the shape in 3D space.

3. Add the shape to a 3D batch ([`H3DU.Batch3D]{@link Batch3D}):

        batch3d.addShape(shape);

    Now, the next time `scene3d.render(batch)` is called, the [`H3DU.Scene3D`]{@link Scene3D} will render the
given shape to the scene through the 3D batch.

<a id=Shape_Groups></a>
## Shape Groups

The `H3DU.ShapeGroup` class represents a shape that's a combination of multiple shapes. Usually,
they form different pieces of a combined shape that can be positioned, rotated, and scaled
at once. Here is an example of a clock made up of multiple shapes:

![**Clock**](clock.png)

This clock is made up of shapes, which
are added to a single ShapeGroup which represents the whole clock, as follows:

* Clock: `ShapeGroup`
    * Edge, faces, 12 o'clock, center: Torus, two disks, two spheres
    * Hour hand: Capsule
    * Minute hand: Capsule
    * Seconds hand: Capsule

To create a shape group, call `new H3DU.ShapeGroup()`. To add a `Shape` object to the group,
call `new H3DU.Shape(shape)`. Note that you can add only shapes or other shape groups, not meshes, to a shape group.

# Creating Shapes

[Back to documentation index.](index.md)

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
- [**Creating Shapes**](#Creating_Shapes)
    - [**Built-In Shapes**](#Built_In_Shapes)
    - [**Custom Shapes**](#Custom_Shapes)
    - [**The Mesh Constructor**](#The_Mesh_Constructor)
- [**Binding Shapes**](#Binding_Shapes)
- [**Shape Groups**](#Shape_Groups)

<a id=Creating_Shapes></a>
## Creating Shapes

The HTML 3D library contains several methods for creating 3D shapes such
as cubes, cylinders, spheres, and custom shapes.

![**An assortment of shapes: a red box, a blue sphere, a bright green 2D ring, and an
orange partial ring on the first row; and a yellow 3D ring, a brown cylinder, a dark
green square, and a purple cone on the second row.**](shapes.png)

<a id=Built_In_Shapes></a>
### Built-In Shapes

The <a href="H3DU.Meshes.md">`H3DU.Meshes`</a> class includes several handy methods for creating built-in shapes.
All methods described below return a `H3DU.MeshBuffer` object that describes the triangles they
are composed of.  See "Custom Shapes" below for more on meshes.

<a id=Custom_Shapes></a>
### Custom Shapes

The `H3DU.MeshBuffer` class can be used to store geometric figures not given among the built-in ones.
Such figures can consist of triangles, lines, or points.

<a id=The_Mesh_Constructor></a>
### The Mesh Constructor

The `MeshBuffer` class contains four methods (`fromPositions`,
`fromPositionsNormals`, `fromPositionsUV`, and `fromPositionsNormalsUV`) that let you define a mesh buffer from a predefined array of vertex data.  See the documentation for those methods for more information.

<a id=Binding_Shapes></a>
## Binding Shapes

Once you have a mesh of a 3D shape, you still need to attach it to a shape
and a batch of shapes in order for the renderer to draw it. This is where
the <a href="H3DU.Shape.md">`H3DU.Shape`</a> class comes into
play; this class associates a 3D mesh with its location in the scene,
as well as its color, its appearance, and how its vertices will be transformed.
To attach a mesh to a 3D scene:

1. Create a `Shape` object by passing the mesh buffer to the `H3DU.Shape` constructor:

        var shape = new H3DU.Shape(meshBuffer);

    Note that `setPosition`, `setQuaternion`, and `setScale` don't change
the vertices of the underlying mesh the shape uses, but rather set up
a <a href="tutorial-glmath.md">_transformation matrix_</a> that adjusts each vertex
in the shape "on the fly" when it comes time to draw it each frame.

    If `setMatrix` wasn't called, then when the shape is rendered, it will generate
a transformation matrix that has the effect of scaling, then rotating,
then translating (shifting) the shape in 3D space.

3. Add the shape to a 3D batch (`H3DU.Batch3D):

        batch3d.addShape(shape);

    Now, the next time `scene3d.render(batch)` is called, the `H3DU.Scene3D` will render the
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
    * Edge: Torus
    * Front face: Disk
    * Back face: Disk
    * Hour hand: Capsule
    * Minute hand: Capsule
    * Seconds hand: Capsule
    * 12 o'clock: Sphere
    * Center: Sphere

To create a shape group, call `new H3DU.ShapeGroup()`. To add a `Shape` object to the group,
call `new H3DU.Shape(shape)`. Note that you can add only shapes or other shape groups, not meshes,
to a shape group.

[Back to documentation index.](index.md)

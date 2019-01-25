# Creating Shapes

[Back to documentation index.](index.md)

<a id=Introduction></a>
## Introduction

This page explains how my [**HTML 3D Library**](http://peteroupc.github.io/html3dutil)
supports 3D shapes and how to use the library to create shapes, both built-in and custom
shapes.

**Download the latest version of the HTML 3D Library at the [**library's Releases page**](https://github.com/peteroupc/html3dutil/releases).** As of version 1.2.1, it includes
the _shapes.html_ and _platonic.html_ demos mentioned in this page.

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
- [**Other Pages**](#Other_Pages)

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

2. You may also set the `Shape`'s color, appearance, and position, using the examples below:

    Examples for setting appearance:

        shape.setColor("red"); // set the color to a CSS color
        shape.setColor("#338845"); // set the color to an HTML color
        shape.setColor(0.2,0.5,1); // set the color to its RGB values, each from 0 to 1
        // set material parameters (NOTE: if the mesh defines its own colors they
        // will override diffuse reflection given below)
        shape.setMaterial(new H3DU.Material({
     "ambient":"blue",
     "diffuse":"blue",
     "specular":"white",
     "shininess":30}));
        // set material parameters: ambient, diffuse,
        // specular, shininess, emission
        shape.setMaterial(new H3DU.Material({
     "ambient":"lime",
     "diffuse":"lime",
     "specular":"white",
     "emission":[0.2,0.2,0.2],
     "shininess":30}));
        // set a texture; this requires the mesh to have texture
        // coordinates assigned to each vertex
        shape.setTexture("texture.png");

    Examples for setting position and transformation:

        // move the shape 2 units along X axis, 4 units along Y axis,
        // and 5 units along Z axis
        shape.setPosition(2,4,5);
        // same, but passing an array
        shape.setPosition([2,4,5]);
        // rotate the shape 40 units about X axis, 20 units about Y axis,
        // and 50 units about Z axis
        shape.setQuaternion(H3DU.MathUtil.quatFromTaitBryan(40,20,50));
        // rotate the shape 20 units about Y axis
        shape.setQuaternion(H3DU.MathUtil.quatFromAxisAngle(20,0,1,0));
        // scale the shape by 2x in all axes
        shape.setScale(2,2,2);
        // same, but passing an array
        shape.setScale([2,2,2]);

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

<a id=Other_Pages></a>
## Other Pages

The following pages of mine on CodeProject also discuss this library:

* [**_Public-Domain HTML 3D Library_**](http://www.codeproject.com/Tips/896839/Public-Domain-HTML-ThreeD-Library)
* [**_Drawing parametric surfaces using the Public Domain HTML 3D Library_**](http://www.codeproject.com/Tips/990798/Drawing-Parametric-Surfaces-Using-the-Public-Domai)
* [**_The "Camera" and the Projection and View Transforms_**](http://www.codeproject.com/Tips/989978/The-Camera-and-the-Projection-and-View-Transforms)

[Back to documentation index.](index.md)

<a id=Introduction></a>
## Introduction

This page explains how my [**HTML 3D Library**](http://peteroupc.github.io/html3dutil)
supports 3D shapes and how to use the library to create shapes, both built-in and custom
shapes.

**Download the latest version of the HTML 3D Library at the [**library's Releases page**](https://github.com/peteroupc/html3dutil/releases).** As of version 1.2.1, it includes
the _shapes.html_ and _platonic.html_ demos mentioned in this page.

This page will discuss:

* Using the Meshes methods to make built-in shapes
* Making your own shapes with the [`H3DU.Mesh`]{@link H3DU.Mesh} constructor
* Building up your own shapes using the vertex methods of [`H3DU.Mesh`]{@link H3DU.Mesh}
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
    - [**Vertex Methods**](#Vertex_Methods)
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

The [`H3DU.Meshes`]{@link H3DU.Meshes} class includes several handy methods for creating built-in shapes.
All methods described below return a `H3DU.MeshBuffer` object that describes the triangles they
are composed of.  See "Custom Shapes" below for more on meshes.

**3D Figures:**

* [Meshes.createBox()]{@link H3DU.Meshes.createBox} - Creates a cube or box.
* [Meshes.createCylinder()]{@link H3DU.Meshes.createCylinder} - Creates a cylinder or cone, not including the base
  or top.
* [Meshes.createClosedCylinder()]{@link H3DU.Meshes.createClosedCylinder} - Creates a cylinder or cone, including the base or top.
* [Meshes.createTorus()]{@link H3DU.Meshes.createTorus} - Creates a torus (doughnut shape).
* [Meshes.createSphere()]{@link H3DU.Meshes.createSphere} - Creates a sphere.
* [Meshes.createCapsule()]{@link H3DU.Meshes.createCapsule} - Creates a capsule shape.

**2D Figures:**

* [Meshes.createDisk()]{@link H3DU.Meshes.createDisk} - Creates a circular disk or a regular polygon, possibly
  with a hole in the middle.
* [Meshes.createPartialDisk()]{@link H3DU.Meshes.createPartialDisk} - Creates a portion of a circular disk, possibly
  with a hole where the middle of the complete disk would be.
* [Meshes.createPlane()]{@link H3DU.Meshes.createPlane} - Creates a rectangle.

<a id=Custom_Shapes></a>
### Custom Shapes

The `H3DU.MeshBuffer` class can be used to define geometric figures, up to three dimensions, not given among the built-in ones.
Such figures can consist of triangles, lines, or points.

There are two ways for specifying shapes: through the Mesh constructor, or through
methods that specify the mesh's data vertex by vertex.

<a id=The_Mesh_Constructor></a>
### The Mesh Constructor

The `MeshBuffer` class contains four methods (`fromPositions`,
`fromPositionsNormals`, `fromPositionsUV`, and `fromPositionsNormalsUV`) that let you define a mesh buffer from a predefined array of vertex data.  See the documentation for those methods for more information.

<a id=Vertex_Methods></a>
### Vertex Methods

Alternatively, or in addition, to the method described above,
you can specify the mesh's shape by calling methods that give each vertex's position and parameters:

1. Call the `mode()` method and choose a primitive mode, such as `H3DU.Mesh.TRIANGLES`
or `H3DU.Mesh.QUAD_STRIP`:

        mesh.mode(H3DU.Mesh.TRIANGLES);

    The mesh will build up the shape from the vertices you give it depending on the mesh's
primitive mode. For example, `QUAD_STRIP` defines a strip of connecting quadrilaterals,
and `TRIANGLES` defines a set of triangles that are not necessarily connected:

    * `H3DU.Mesh.TRIANGLES` - Set of triangles, 3 vertices each.
    * `H3DU.Mesh.LINES` - Set of line segments, 2 vertices each.
    * `H3DU.Mesh.QUADS` - Set of quadrilaterals, 4 vertices each.
    * `H3DU.Mesh.TRIANGLE_STRIP` - A triangle strip. The first 3
vertices make up the first triangle, and each additional
triangle is made up of the last 2 vertices and 1
new vertex.
    * `H3DU.Mesh.TRIANGLE_FAN` - A triangle fan. The first 3
vertices make up the first triangle, and each additional
triangle is made up of the last vertex, the first vertex of
the first trangle, and 1 new vertex.
    * `H3DU.Mesh.QUAD_STRIP` - A strip of quadrilaterals (quads).
The first 4 vertices make up the first quad, and each additional
quad is made up of the last 2 vertices of the previous quad and
2 new vertices.
    * `H3DU.Mesh.LINE_STRIP` - A series of points making up a connected line segment path.

2. Call the `normal3()`, `color3()`, and `texCoord2()` methods, as needed, to set the
next vertex's parameters. You don't need to do this for each vertex if multiple
consecutive vertices will share the same normal, color, or texture coordinates.

        mesh.normal3(2, 3, 4); // Set the x, y, and z of the normal.
        mesh.color3(0.1,0.6,1); // Set the red, green, and blue of the color.
        mesh.color3("red"); // Set a CSS color.
        mesh.color3("#123FE8"); // Set an HTML color.
        mesh.texCoord3(0.5,0.5); // Set the texture coordinates.

3. Call the `vertex3()` method to add a new vertex and set its position. The vertex will
have the last normal, color, and texture coordinates defined on the mesh, if any
were given:

        mesh.vertex3(x, y, z);

You can also call the `mode()` method any time to change the primitive mode, even to
the same mode. What this does is reset the state of the primitive so that future vertices
won't depend on previous vertices. For example, if you define a `TRIANGLE_FAN`, and
you call `mesh.mode(H3DU.Mesh.TRIANGLE_FAN)`, the newly defined `TRIANGLE_FAN` will be
"disconnected" from the previous one as far as the mesh object is concerned. However,
a single `Mesh` can contain only one kind of primitive (triangles, lines, or points) at a time.

<a id=Binding_Shapes></a>
## Binding Shapes

Once you have a mesh of a 3D shape, you still need to attach it to a shape
and a batch of shapes in order for the renderer to draw it. This is where
the [`H3DU.Shape`]{@link H3DU.Shape} class comes into
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
a [_transformation matrix_]{@tutorial glmath} that adjusts each vertex
in the shape "on the fly" when it comes time to draw it each frame.

    If `setMatrix` wasn't called, then when the shape is rendered, it will generate
a transformation matrix that has the effect of scaling, then rotating,
then translating (shifting) the shape in 3D space.

3. Add the shape to a 3D batch ([`H3DU.Batch3D]{@link H3DU.Batch3D}):

        batch3d.addShape(shape);

    Now, the next time `scene3d.render(batch)` is called, the [`H3DU.Scene3D`]{@link H3DU.Scene3D} will render the
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

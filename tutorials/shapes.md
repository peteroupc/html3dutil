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

NOTE: This page will largely discuss the 2.0.0-beta3 version of the HTML 3D library, which differs considerably from the current release (version 1.5.1) of the library. (See the library's [change history]{@tutorial history} for more information.)

<a id=Contents></a>
## Contents

- [**Introduction**](#Introduction)
- [**Contents**](#Contents)
- [**Creating Shapes**](#Creating_Shapes)
    - [**Built-In Shapes**](#Built_In_Shapes)
    - [**Custom Shapes**](#Custom_Shapes)
    - [**The Mesh Constructor**](#The_Mesh_Constructor)
    - [**Vertex Methods**](#Vertex_Methods)
    - [**Texture Coordinates**](#Texture_Coordinates)
    - [**Building the Mesh**](#Building_the_Mesh)
    - [**Transforming the Mesh**](#Transforming_the_Mesh)
    - [**Normals**](#Normals)
        - [**What Are Normals?**](#What_Are_Normals)
        - [**Normals on Built-in Shapes**](#Normals_on_Built_in_Shapes)
        - [**recalcNormals()**](#recalcNormals)
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

Demos:

* [**shapes.html**](https://peteroupc.github.io/html3dutil/demos/shapes.html) - Demonstrates
the built-in shapes.
* [**platonic.html**](https://peteroupc.github.io/html3dutil/demos/platonic.html) - A demo featuring the five
platonic solids. Demonstrates how vertex and index arrays are built up to create geometric meshes.

Examples:

See [**Examples of Creating Meshes on the Fly**](https://peteroupc.github.io/html3dutil/tutorial.meshexamples.html) for
examples of 3D models that can be created using the Mesh class and built-in shapes.

<a id=Built_In_Shapes></a>
### Built-In Shapes

The [`H3DU.Meshes`]{@link H3DU.Meshes} class includes several handy methods for creating built-in shapes.
All methods described below return a `H3DU.Mesh` object that describes the triangles they
are composed of.  See "Custom Shapes" below for more on meshes.

**3D Figures:**

* [H3DU.Meshes.createBox()]{@link H3DU.Meshes.createBox} - Creates a cube or box.
* [H3DU.Meshes.createCylinder()]{@link H3DU.Meshes.createCylinder} - Creates a cylinder or cone, not including the base
  or top.
* [H3DU.Meshes.createClosedCylinder()]{@link H3DU.Meshes.createClosedCylinder} - Creates a cylinder or cone, including the base or top.
* [H3DU.Meshes.createTorus()]{@link H3DU.Meshes.createTorus} - Creates a torus (doughnut shape).
* [H3DU.Meshes.createSphere()]{@link H3DU.Meshes.createSphere} - Creates a sphere.
* [H3DU.Meshes.createCapsule()]{@link H3DU.Meshes.createCapsule} - Creates a capsule shape.

**2D Figures:**

* [Meshes.createDisk()]{@link H3DU.Meshes.createDisk} - Creates a circular disk or a regular polygon, possibly
  with a hole in the middle.
* [Meshes.createPartialDisk()]{@link H3DU.Meshes.createPartialDisk} - Creates a portion of a circular disk, possibly
  with a hole where the middle of the complete disk would be.
* [Meshes.createPlane()]{@link H3DU.Meshes.createPlane} - Creates a rectangle.

<a id=Custom_Shapes></a>
### Custom Shapes

Also included is a `H3DU.Mesh` class for defining shapes not given among the built-in ones.
Shapes can consist of triangles, lines, or points.

There are two ways for specifying shapes: through the Mesh constructor, or through
methods that specify the mesh's data vertex by vertex.

<a id=The_Mesh_Constructor></a>
### The Mesh Constructor

The `H3DU.Mesh` constructor lets you define a shape from a predefined array of vertex data.
Here's how.

1. Create an array of numbers giving the X, Y, and Z coordinate for each vertex:

        var vertices = [x1, y1, z1, x2, y2, z2, ... ];

    If you also specify [**normals**](#Normals), colors, or [**texture coordinates**](#Texture_Coordinates) for each vertex, you must add
    them after each vertex position in this order: normals first, colors second, and texture
    coordinates last. If you don't specify normals, colors, and/or texture coordinates per
    vertex, you can omit them. The following are examples of this:

        // An array of vertices each with a set of normals
        var vertices = [
         x1, y1, z1, nx1, ny1, nz1,
         x2, y2, z2, nx2, ny2, nz2,
         ...
        ];
        // An array of vertices each with a set of colors
        // and texture coordinates
        var vertices = [
         x1, y1, z1, cr1, cg1, cb1, u1, v1,
         x2, y2, z2, cr2, cg2, cb2, u2, v2,
         ...
        ];

2. Create a second array of numbers giving the indices to vertices defined in the
previous step:

        var indices = [0, 1, 2, 1, 2, 3, ... ];

    Each index refers to the (n+1)th vertex, no matter how many array elements each vertex
    consists of (a vertex with just coordinates will use 3 array elements).

    If you are defining a set of triangles, there should be 3 indices for each triangle,
    and if you are defining a set of line segments, there should be 2 indices for each
    line segment.

3. Call the mesh constructor with the vertex and index arrays.

        var bits = H3DU.Mesh.NORMALS_BIT; // Assumes we used the vertex array with normals
        var mesh = new H3DU.Mesh(vertices, indices, bits);

    Note that you must include a set of bits indicating what kind of data the vertex
    array contains.  (If none of the bits apply, use 0 or omit the "bits" parameter.) The bits are:

      * `H3DU.Mesh.NORMALS_BIT` - if you included [**normals**](#Normals) for each vertex (3 elements)
      * `H3DU.Mesh.COLORS_BIT` - if you included colors for each vertex (3 elements)
      * `H3DU.Mesh.TEXCOORDS_BIT` - if you included [**texture coordinates**](#Texture_Coordinates) for each vertex (2 elements)
      * `H3DU.Mesh.LINES_BIT` - if the mesh defines a set of lines rather than triangles
      * `H3DU.Mesh.POINTS_BIT` - if the mesh defines a set of points (you can't set both `LINES_BIT` and
 `POINTS_BIT`).

    The bits may be combined as in the following example:

        var bits = H3DU.Mesh.NORMALS_BIT | H3DU.Mesh.COLORS_BIT;

    Alternatively, you can call the `H3DU.Mesh` constructor with no arguments:

        var mesh = new H3DU.Mesh();

    Doing so will create a mesh with no vertices.

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
    * `H3DU.Mesh.POINTS` - A series of points.

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

<a id=Texture_Coordinates></a>
### Texture Coordinates

If the mesh has a texture associated with it, you must specify texture coordinates
for each vertex in the mesh.  A texture coordinate is a set of two numbers,
called U and V, that map to a specific point in the texture.  Each texture coordinate
ranges from 0 to 1. U coordinates start at the left of the texture (0) and increase to the right
(1), and V coordinates start at the bottom of the texture (0) and
increase to the top (1).

For example, texture coordinates (0, 1) indicate the top left corner of the texture,
and texture coordinates (0.5, 0.5) indicate the center of the texture.

<a id=Building_the_Mesh></a>
### Building the Mesh

Call the MeshBuffer class to create a mesh buffer, whether it's created
using the `H3DU.Mesh` constructor or by building it vertex by vertex:

    var meshBuffer = new MeshBuffer(mesh);

<a id=Transforming_the_Mesh></a>
### Transforming the Mesh

Once you've created the mesh buffer, you can use the `transform()` method to transform
all the vertices in the mesh buffer with a [4x4 matrix]{@tutorial glmath}. The
[**shapes.html**](https://peteroupc.github.io/html3dutil/demos/shapes.html) demo uses
this method to adjust some of the mesh bufferes to make them look better on the screen.
Example:

    var matrix = H3DU.MathUtil.mat4scaled(2,2,2);
    // Use the transform to double the mesh buffer's size
    meshBuffer.transform(matrix);

<a id=Normals></a>
### Normals

For lighting and shading to work correctly, you must specify normals for all the
vertices in the mesh buffer.

<a id=What_Are_Normals></a>
#### What Are Normals?

A normal is a set of 3 numbers describing a particular direction. Generally,
a normal's direction is perpendicular to a surface's edges, and points
away from the surface.

Normals are important in the lighting and shading model. When light
hits an object's surface, how brightly the surface will be lit depends on how directly the
light points to the surface. It will be lit the most brightly if the light
is directly opposite to its normal, and not at all if the light is perpendicular to the
normal or in the same direction as the normal.

<a id=Normals_on_Built_in_Shapes></a>
#### Normals on Built-in Shapes

The `Meshes` class includes built-in methods that will automatically
specify the proper normals.

<a id=recalcNormals></a>
#### recalcNormals()

You can use the [`recalcNormals()`]{@link H3DU.MeshBuffer#recalcNormals} method to
recalculate the mesh buffer's normals,
in order to give the shape a flat or smooth appearance or to shade the shape from
the inside or the outside. This method takes two parameters:

* The first parameter is `true` if the normals will be calculated such that the shape
will have a flat appearance; otherwise, `false` (giving the shape a smooth appearance).
This works by either giving each triangle the same normal (flat shading) or giving
each unique vertex its own normal (smooth shading).
* The second parameter is `true` if the normals will be calculated such that the shape
is shaded from the inside; otherwise, `false`.

For normal calculation to properly affect shading, each triangle in
the mesh buffer must have its vertices ordered in the same winding (counterclockwise or
clockwise) throughout. If the
vertices have the wrong order, use the [`reverseWinding()`]{@link H3DU.MeshBuffer#reverseWinding}
method to change their order.

> Note: For right-handed coordinate systems, as will be the case when using,
> for example, the [`Batch3D.perspectiveAspect()`]{@link H3DU.Batch3D#perspectiveAspect} method,
> if the mesh buffer describes a closed convex surface (such as a sphere or cube),
> each triangle's vertices (as they appear when the triangle's front side is seen)
> must be ordered counterclockwise for the shape to be shaded from the outside.

Example:

    // Use flat shading, and shape is shaded from the outside
    meshBuffer.recalcNormals(true, false);
    // Both parameters can be omitted, setting both to false
    meshBuffer.recalcNormals();

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

This clock is made up of a **torus** for the edge, **disks** for the front and back,
**capsules** for the hands, and crude **spheres** for the center and top. These shapes
are added to a single ShapeGroup which represents the whole clock:

* Clock: `ShapeGroup`
    * Edge: Torus
    * Front face: Disk
    * Back face: Disk
    * Hour hand: Capsule
    * Minute hand: Capsule
    * Seconds hand: Capsule
    * 12 o'clock: Sphere
    * Center: Sphere

The demo for the clock is:

* [**clock.html**](https://peteroupc.github.io/html3dutil/demos/clock.html) - A demo
featuring a wall clock.

To create a shape group, call `new H3DU.ShapeGroup()`. To add a `Shape` object to the group,
call `new H3DU.Shape(shape)`. Note that you can only add shapes, not meshes,
to a shape group, just as for a 3D batch (`H3DU.Batch3D`). A shape group, though, is perfectly allowed to contain
other shape groups.

<a id=Other_Pages></a>
## Other Pages

The following pages of mine on CodeProject also discuss this library:

* [**_Public-Domain HTML 3D Library_**](http://www.codeproject.com/Tips/896839/Public-Domain-HTML-ThreeD-Library)
* [**_Drawing parametric surfaces using the Public Domain HTML 3D Library_**](http://www.codeproject.com/Tips/990798/Drawing-Parametric-Surfaces-Using-the-Public-Domai)
* [**_The "Camera" and the Projection and View Transforms_**](http://www.codeproject.com/Tips/989978/The-Camera-and-the-Projection-and-View-Transforms)

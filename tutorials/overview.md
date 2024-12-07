<a id=Public_Domain_Geometry_Utilities_Library></a>

## Public-Domain Geometry Utilities Library

This page will introduce the [**Geometry Utilities Library**](https://github.com/peteroupc/html3dutil), an open-source JavaScript library that I wrote.

This library contains classes and utility methods to represent 3-D geometries, including curves and surfaces, in JavaScript, and methods that support the development of 3D applications, including HTML applications that use the 3-D canvas.

The library differs from many others because this one is in the public domain, so no permission is required to use it.

This page includes information on how to use the Geometry Utilities Library and an overview of its features.

> **Note:** The Geometry Utilities Library was formerly called the Public-Domain HTML 3D Library.  Classes that involved the HTML 3D canvas, shaders, or the 3-D scene graph were removed, to make this library much more general-purpose.  In any case, such classes are not as trivial to port to other 3-D rendering APIs or other programming languages as classes that merely generate and store 3-D geometry or implement math functions (however, shader-based filters are still included as extras, even though the Geometry Utilities Library currently doesn't use them directly).

<a id=Example></a>

## Example

The following is a screen shot of a scene generated with the help of the former Public Domain HTML 3D Library.  Currently, however, the Geometry Utilities library has no means to render 3-D geometry directly.

![](https://peteroupc.github.io/html3dutil/html3d.png)

<a id=Contents></a>

## Contents

- [**Public-Domain Geometry Utilities Library**](#Public_Domain_Geometry_Utilities_Library)
- [**Example**](#Example)
- [**Contents**](#Contents)
- [**How to Use**](#How_to_Use)
    - [**List of Classes**](#List_of_Classes)
    - [**The "Camera"**](#The_Camera)
    - [**3D Models**](#3D_Models)
    - [**Shapes**](#Shapes)
    - [**The Render Loop**](#The_Render_Loop)
- [**History**](#History)

<a id=How_to_Use></a>

## How to Use

1. [**Download the Geometry Utilities Library**](https://github.com/peteroupc/html3dutil/releases).
2. Extract the file <i>"h3du_min.js"</i> or <i>"h3du_module.js"</i>, as appropriate.
3.  If using the script version in an HTML Web page, and write the following code in every HTML page where you will use the library.

        <script type="text/javascript" src="h3du_min.js"></script>

4.  If using the module version in a modern HTML Web page or a modern ECMAScript module, you can import all symbols in this module with either of the following:

        import * from "h3du_module.js";
        // -- or --
        import * as H3DU from "h3du_module.js";

<a id=List_of_Classes></a>

### List of Classes
This is an overview of most of the JavaScript classes available in this library:

* [**`H3DU`**](https://peteroupc.github.io/html3dutil/html) - Contains various utility methods in the Geometry Utilities Library.
* [**`MathUtil`**](https://peteroupc.github.io/html3dutil/MathUtil.html) - Contains math methods useful in 3D applications, such as matrices and vectors.
* [**`MeshBuffer`**](https://peteroupc.github.io/html3dutil/MeshBuffer.html) - Represents a 3D model.
* [**`Meshes`**](https://peteroupc.github.io/html3dutil/Meshes.html) - Contains methods for generating common 3D models.
* [**`Shape`**](https://peteroupc.github.io/html3dutil/Shape.html) - Represents an instance of a 3D shape with its own transform.
* [**`ShapeGroup`**](https://peteroupc.github.io/html3dutil/ShapeGroup.html) - Represents a group of 3D shapes.
*  [**`BSplineCurve`**](https://peteroupc.github.io/html3dutil/BSplineCurve.html),
 [**`BSplineSurface`**](https://peteroupc.github.io/html3dutil/BSplineSurface.html),
 [**`CurveBuilder`**](https://peteroupc.github.io/html3dutil/CurveBuilder.html),
 [**`SurfaceBuilder`**](https://peteroupc.github.io/html3dutil/SurfaceBuilder.html) - Supports generating parametric curves and surfaces. Many curves and surfaces can be expressed as so-called _curve evaluator objects_ and _surface evaluator objects_, and the extras to the library include many kinds of such objects.

For much more information on all of these classes, see my <a href="https://peteroupc.github.io/html3dutil">documentation for the Geometry Utilities Library</a>.

The following sections detail how an application that renders 3-D graphics can use this library.

<a id=The_Camera></a>

### The "Camera"

The `MathUtil` class contains methods that support the concepts of a "projection transform" and a "view transform", as are common in many 3D rendering libraries. If we
use the concept of a "camera", the projection is like setting the camera&#39;s focus and lens, and the view transform is like setting its position and orientation. `MathUtil` has methods for generating 4 &times; 4 matrices that represent some kinds of projection and view transformations, including `MathUtil.mat4perspective` (a perspective projection) and `MathUtil.mat4lookat` (a look-at view transform). For more information, see [**_The "Camera" and Geometric Transforms_**](http://www.codeproject.com/Tips/989978/The-Camera-and-the-Projection-and-View-Transforms).

<a id=3D_Models></a>

### 3D Models

Most 3D scenes are made up of _meshes_, or the triangles, lines, and points that make up a geometric three-dimensional object. Meshes can be simple, such as a cube, or very complex, such as a town model complete with houses. You create a mesh using the `MeshBuffer` class, or create a built-in geometric shape using a method in the `Meshes` class. The example below shows how you can create a box mesh:

    // Create a box mesh 10 units in width, 20 units
    // in height, and 25 units in depth
    var mesh=Meshes.createBox(10,20,25);

Here are some other built-in methods for creating meshes. This page doesn&#39;t explain all the features or parameters in the `Meshes` class; for that, see the
<a href="http://peteroupc.github.io/html3dutil/Meshes.html">Meshes API documentation</a>.

  * <dfn>`Meshes.createSphere(radius)`</dfn>
  <br>Creates a sphere with the given `radius`.
  * <dfn>`Meshes.createCylinder(base, top, height)`</dfn>
  <br>Creates a cylinder with the given `base` radius, `top` radius, and `height`. Can be used
  to create a cone if `base` or `top` is `0`.
  * <dfn>`Meshes.createClosedCylinder(base, top, height)`</dfn>
  <br>Like `createCylinder`, except it also covers the base and top.
  * <dfn>`Meshes.createPartialDisk(inner, outer, start, sweep)`</dfn>
  <br>Creates a circular ring, of radius `outer` with a hole of radius `inner`, starting at `start`
  degrees and sweeping `sweep` degrees.
  * <dfn>`Meshes.createDisk(inner, outer)`</dfn>
  <br>Same as calling `createPartialDisk` with `start` 0 and `sweep` 360.

The methods described above return a `MeshBuffer` object describing the appropriate mesh's geometry.  Methods that can be called on a `MeshBuffer` include the following:

  * <dfn>`meshBuffer.setColor(color)`</dfn>
  <br>Gives all vertices in a mesh a particular color. `color` can be an HTML color ("#ff0000"), CSS color ("red"), RGB color("rgb(20, 30, 40)") or HSL color("hsl(20, 50%, 50%)"), or a set of values from 0 to 1 (example: `[1.0,0.5,0.0]`).
   See my [**colors tutorial**](https://peteroupc.github.io/html3dutil/tutorial-colors.html).

<a id=Shapes></a>

### Shapes

The `Shape` constructor method assigns a linear or perspective transformation (including shifting position, scaling, and rotation) to meshes.  The library calls this a 3D shape.

    // Create a shape based on the mesh
    var shape=new Shape(mesh);
    // Move it 1 unit along the X axis
    shape.setPosition(1,0,0);

> **Note:** The appearance of a 3D shape's surface is known in the 3D graphics world as a _material_. It includes textures (images), colors, and light reflection parameters. Materials are not directly supported by this geometry library, not least because there are many ways to describe a material's parameters, as well as many ways to implement the rendering behavior of materials associated with shapes, such as physically-based rendering, cartoon styling, constant-color shading, the Blinn&ndash;Phong model, and so on.

Here are details on some of the `Shape` class&#39;s methods.

  * <dfn>`shape.setPosition(x, y, z)`</dfn>
  <br>Sets the shape&#39;s position to the given coordinates.
  * <dfn>`shape.setScale(x, y, z)`</dfn>
  <br>Sets the shape&#39;s scaling along the x, y, and z axes. Examples: (1, 1, 1) means no scaling, (2, 1, 1) means a doubled width, (1, 1, 0.5) means a halved depth.
  * <dfn>`shape.getTransform().setRotation(angle, x, y, z)`</dfn>
  <br>Sets the shape&#39;s rotation given an angle in degrees, and an axis of rotation (the x, y, and z parameters). Example: (40, 1, 0, 0) means a 40-degree rotation around the X axis (x is 1 in the axis of rotation).
  * <dfn>`shape.copy()`</dfn>
  <br>Creates a copy of this shape.

<a id=The_Render_Loop></a>

### The Render Loop

An important part of a 3D application is the render loop. The render loop is a block of code that is called many times a second (or many "frames" a second) to redraw the 3D scene. Each frame, the state of the application is updated, and the 3D scene is re-rendered to account for that state. The exact details of rendering depend on the 3D rendering library in use; the Geometry Utilities Library has no means to directly render 3D objects.

For example, in an HTML Web page, a render loop could look like the following; it depends on the `requestAnimationFrame` API implemented in most modern Web browsers.

    // Set up the render loop
    var rafCallback = function(time){
     // This will be called once each frame.
     // Render the scene here before calling
     // requestAnimationFrame again
     requestAnimationFrame(rafCallback);
    });
    requestAnimationFrame(rafCallback);

In this example, the callback to `requestAnimationFrame` takes a parameter (here "time"), containing the number of milliseconds since the page was started.&nbsp; This can be used to implement frame-rate independent animations.

<a id=History></a>

## History

See [**version history**](https://peteroupc.github.io/html3dutil/tutorial-history.html).

<a id=Public_Domain_Geometry_Utilities_Library></a>
## Public-Domain Geometry Utilities Library

This page will introduce the [**Geometry Utilities Library**](https://github.com/peteroupc/html3dutil/releases), an open-source JavaScript library that I wrote.

This library contains classes and utility methods to represent 3-D geometries, including curves and surfaces, in JavaScript, and methods that support the development of 3D applications, including HTML applications that use the 3-D canvas.

The library differs from many others because this one is in the public domain, so no permission is required to use it.

This page includes information on how to use the Geometry Utilities Library and an overview of its features.

NOTE: The Geometry Utilities Library was formerly called the Public-Domain HTML 3D Library.  Classes that involved the HTML 3D canvas, shaders, or the 3-D scene graph were removed, to make this library much more general-purpose.  In any case, such classes are not as trivial to port to other 3-D rendering APIs or other programming languages as classes that merely generate and store 3-D geometry or implement math functions (however, shader-based filters are still included as extras, even though the Geometry Utilities Library currently doesn't use them directly).

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
- [**Demos**](#Demos)
    - [**Shapes and meshes**](#Shapes_and_meshes)
    - [**Paths**](#Paths)
    - [**Curves and Surfaces**](#Curves_and_Surfaces)
    - [**Textures**](#Textures)
    - [**Shaders**](#Shaders)
    - [**Particle Systems**](#Particle_Systems)
    - [**Loading 3D Models**](#Loading_3D_Models)
    - [**Selecting Objects**](#Selecting_Objects)
    - [**Lights**](#Lights)
    - [**Text**](#Text)
    - [**Projections**](#Projections)
- [**Example**](#Example_2)
- [**History**](#History)

<a id=How_to_Use></a>
## How to Use

1. [**Download the Geometry Utilities Library**](https://github.com/peteroupc/html3dutil/releases).
2. Extract the file <i>"h3du_min.js"</i>, and write the following code in every HTML page where you will use the library.

        <script type="text/javascript" src="h3du_min.js"></script>

3. Include an HTML 3D canvas somewhere on the Web page, since drawing 3D objects requires a 3D canvas. You may set its `width` and `height`. You should also give it an ID so you can refer to it more easily in your JavaScript code, as shown in this example.

        <canvas width="640" height="480" id="canvas"></canvas>

4. To use the Geometry Utilities Library in JavaScript, either add the JavaScript code to the bottom of the page or use an event listener, as in this example:

        <script>
        window.addEventListener("load",function(){
          var scene=new Scene3D(document.getElementById("canvas"));
          // We have the 3D scene, use it. (See the example code
          // at the bottom of this article for a more complete example.)
        })
        </script>

<a id=List_of_Classes></a>
### List of Classes
This is an overview of most of the JavaScript classes available in this library:

* [**`H3DU`**](https://peteroupc.github.io/html3dutil/H3DU.html) - Contains various utility methods in the Geometry Utilities Library
* [**`H3DU.MathUtil`**](https://peteroupc.github.io/html3dutil/H3DU.MathUtil.html) - Contains math methods useful in 3D applications, such as matrices and vectors
* [**`H3DU.MeshBuffer`**](https://peteroupc.github.io/html3dutil/H3DU.MeshBuffer.html) - Represents a 3D model.
* [**`H3DU.Meshes`**](https://peteroupc.github.io/html3dutil/H3DU.Meshes.html) - Contains methods for generating common 3D models.
* [**`H3DU.Shape`**](https://peteroupc.github.io/html3dutil/H3DU.Shape.html) - Represents an instance of a 3D shape with its own transform.
* [**`H3DU.ShapeGroup`**](https://peteroupc.github.io/html3dutil/H3DU.ShapeGroup.html) - Represents a group of 3D shapes.
*  [**`H3DU.BSplineCurve`**](https://peteroupc.github.io/html3dutil/H3DU.BSplineCurve.html),
 [**`H3DU.BSplineSurface`**](https://peteroupc.github.io/html3dutil/H3DU.BSplineSurface.html),
 [**`H3DU.CurveBuilder`**](https://peteroupc.github.io/html3dutil/H3DU.CurveBuilder.html),
 [**`H3DU.SurfaceBuilder`**](https://peteroupc.github.io/html3dutil/H3DU.SurfaceBuilder.html) - Supports generating parametric curves and surfaces. Many curves and surfaces can be expressed as so-called _curve evaluator objects_ and _surface evaluator objects_, and the extras to the library include many kinds of such objects.

For much more information on all of these classes, see my <a href="https://peteroupc.github.io/html3dutil">documentation for the Geometry Utilities Library</a>.

The following sections detail how an application that renders 3-D graphics can use this library.

<a id=The_Camera></a>
### The "Camera"

The `H3DU.MathUtil` class contains methods that support the concepts of a "projection transform" and a "view transform", as are common in many 3D rendering libraries. If we
use the concept of a "camera", the projection is like setting the camera&#39;s focus and lens, and the view transform is like setting its position and orientation. `H3DU.MathUtil` has methods for generating 4x4 matrices that represent some kinds of projection and view transformations, including `H3DU.MathUtil.mat4perspective` (a perspective projection) and `H3DU.MathUtil.mat4lookat` (a look-at view transform). For more information, see [**_The "Camera" and Geometric Transforms_**](http://www.codeproject.com/Tips/989978/The-Camera-and-the-Projection-and-View-Transforms).

<a id=3D_Models></a>
### 3D Models

Most 3D scenes are made up of _meshes_, or the triangles, lines, and points that make up a geometric three-dimensional object. Meshes can be simple, such as a cube, or very complex, such as a town model complete with houses. You create a mesh using the `H3DU.MeshBuffer` class, or create a built-in geometric shape using a method in the `H3DU.Meshes` class. The example below shows how you can create a box mesh:

    // Create a box mesh 10 units in width, 20 units
    // in height, and 25 units in depth
    var mesh=H3DU.Meshes.createBox(10,20,25);

Here are some other built-in methods for creating meshes. This page doesn&#39;t explain all the features or parameters in the `Meshes` class; for that, see the
<a href="http://peteroupc.github.io/html3dutil/H3DU.Meshes.html">Meshes API documentation</a>.

  * <dfn>`H3DU.Meshes.createSphere(radius)`</dfn>
  <br>Creates a sphere with the given `radius`.
  * <dfn>`H3DU.Meshes.createCylinder(base, top, height)`</dfn>
  <br>Creates a cylinder with the given `base` radius, `top` radius, and `height`. Can be used
  to create a cone if `base` or `top` is `0`.
  * <dfn>`H3DU.Meshes.createClosedCylinder(base, top, height)`</dfn>
  <br>Like `createCylinder`, except it also covers the base and top.
  * <dfn>`H3DU.Meshes.createPartialDisk(inner, outer, start, sweep)`</dfn>
  <br>Creates a circular ring, of radius `outer` with a hole of radius `inner`, starting at `start`
  degrees and sweeping `sweep` degrees.
  * <dfn>`H3DU.Meshes.createDisk(inner, outer)`</dfn>
  <br>Same as calling `createPartialDisk` with `start` 0 and `sweep` 360.

The methods described above return a `MeshBuffer` object describing the appropriate mesh's geometry.  Methods that can be called on a `MeshBuffer` include the following:

  * <dfn>`meshBuffer.setColor(color)`</dfn>
  <br>Gives all vertices in a mesh a particular color. `color` can be an HTML color ("#ff0000"), CSS color ("red"), RGB color("rgb(20, 30, 40)") or HSL color("hsl(20, 50%, 50%)"), or a set of values from 0 to 1 (example: `[1.0,0.5,0.0]`).
   See my [**colors tutorial**](https://peteroupc.github.io/html3dutil/tutorial-colors.html).

<a id=Shapes></a>
### Shapes

TODO: Rewrite.

Once a mesh is created, it needs to be added to the 3D scene in order to be rendered.
Use the `H3DU.Shape` constructor method to convert the mesh to a shape. Then you can set the shape&#39;s properties such as color, size, and position. Then, call `addShape()` to add the shape to the 3D object batch.

    // Create a shape based on the mesh
    var shape=new H3DU.Shape(mesh);
    // Move it 1 unit along the X axis
    shape.setPosition(1,0,0);
    // Add the shape to the scene
    batch.addShape(shape);

> **Note:** The appearance of a 3D shape is known in the 3D graphics world as a _material_. It includes textures (images), colors, and light reflection parameters. Materials are not directly supported by this geometry library, not least because there are many ways to describe a material's parameters, as well as many ways to implement the rendering behavior of materials associated with shapes, such as physically-based rendering, cartoon styling, constant-color shading, the Blinn&ndash;Phong model, and so on.

Here are details on some of the `Shape` class&#39;s methods.

  * <dfn>`shape.setPosition(x, y, z)`</dfn>
  <br>Sets the shape&#39;s position to the given coordinates.
  * <dfn>`shape.setScale(x, y, z)`</dfn>
  <br>Sets the shape&#39;s scaling along the x, y, and z axes. Examples: (1, 1, 1) means no scaling, (2, 1, 1) means a doubled width, (1, 1, 0.5) means a halved depth.
  * <dfn>`shape.getTransform().setRotation(angle, x, y, z)`</dfn>
  <br>Sets the shape&#39;s rotation given an angle in degrees, and an axis of rotation (the x, y, and z parameters). Example: (40, 1, 0, 0) means a 40-degree rotation around the X axis (x is 1 in the axis of rotation).
  * <dfn>`shape.copy()`</dfn>
  <br>Creates a copy of this shape. Can be more efficient than calling `new H3DU.Shape` if the same geometric mesh will be used more than once in the same 3D scene, with different transformations.

<a id=The_Render_Loop></a>
### The Render Loop

An important part of a 3D application is the render loop. The render loop is a block of code that is called many times a second (or many "frames" a second) to redraw the 3D scene. Each frame, the state of the application is updated, and the 3D scene is re-rendered to account for that state. To render a scene, use the `H3DU.Scene3D.render()` method, passing a batch of shapes to render. Render loops are created using the `H3DU.renderLoop()` method. Here is an example of a render loop.

    // Set up the render loop
    H3DU.renderLoop(function(time){
     // This will be called once each frame.
     // Here, we render the scene
     scene.render(batch);
    });

The render loop method takes a parameter (here "time"), containing the number of milliseconds since the page was started.&nbsp; This can be used to implement frame-rate independent animations.

<a id=Demos></a>
## Demos

The following are HTML Web pages showing a variety of features of the Geometry Utilities Library. Each demo includes a link to access source code for that demo.

<a id=Shapes_and_meshes></a>
### Shapes and meshes

* [**demos/compositeMesh.html**](https://peteroupc.github.io/html3dutil/demos/compositeMesh.html) - Demonstrates
combining multiple meshes into one.
* [**demos/shapes.html**](https://peteroupc.github.io/html3dutil/demos/shapes.html) - Demonstrates
the built-in shapes.
* [**demos/newshapes.html**](https://peteroupc.github.io/html3dutil/demos/newshapes.html) - Fancier
demo of some of the built-in shapes.
* [**demos/builtinshapes.html**](https://peteroupc.github.io/html3dutil/demos/builtinshapes.html) - Interactive demo of
the built-in shapes.
* [**demos/platonic.html**](https://peteroupc.github.io/html3dutil/demos/platonic.html) - A demo featuring the five
platonic solids. Demonstrates:
    * How vertex and index arrays are built up to create geometric meshes, and
    * How to position HTML elements on top of 3D models based on their 3D positions.
* [**demos/clock.html**](https://peteroupc.github.io/html3dutil/demos/clock.html) - A demo
featuring a wall clock.
* [**demos/gears.html**](https://peteroupc.github.io/html3dutil/demos/gears.html) - A demonstration of rotating gears.

<a id=Paths></a>
### Paths

* [**demos/marchingdots.html**](https://peteroupc.github.io/html3dutil/demos/marchingdots.html) - Demo
of a series of dots following a path like marching ants. Shows some of the functionality of graphics paths.
* [**demos/polyclip.html**](https://peteroupc.github.io/html3dutil/demos/polyclip.html) -
Similar to "marchingdots.html", but now uses the union of two circles as a path to demonstrate polygon
clipping.
* [**demos/pathtube.html**](https://peteroupc.github.io/html3dutil/demos/pathtube.html) - Demo
of a tube formed by a path curve.
* [**demos/pathshapes.html**](https://peteroupc.github.io/html3dutil/demos/pathshapes.html) - Demo
of 3D and 2D shapes generated by a 2D path.

<a id=Curves_and_Surfaces></a>
### Curves and Surfaces

* [**demos/surfaces.html**](https://peteroupc.github.io/html3dutil/demos/surfaces.html) - Demonstrates
using evaluators to generate parametric surfaces.
* [**demos/curves.html**](https://peteroupc.github.io/html3dutil/demos/curves.html) - Demonstrates
using evaluators to generate parametric curves.
* [**demos/surfacesexpr.html**](https://peteroupc.github.io/html3dutil/demos/surfacesexpr.html) - Demonstrates
parametric surfaces, with a custom formula editor.
* [**demos/curvesexpr.html**](https://peteroupc.github.io/html3dutil/demos/curvesexpr.html) - Demonstrates
parametric curves, with a custom formula editor.
* [**demos/implicit.html**](https://peteroupc.github.io/html3dutil/demos/implicit.html) - Demonstrates
implicit surfaces.
* [**demos/invoevo.html**](https://peteroupc.github.io/html3dutil/demos/invoevo.html) - Demonstrates drawing certain custom curves.
* [**demos/drawingtoy.html**](https://peteroupc.github.io/html3dutil/demos/drawingtoy.html) - Draws a design that's reminiscent of a popular drawing toy.
* [**demos/bsplinecircles.html**](https://peteroupc.github.io/html3dutil/demos/bsplinecircles.html) - Demonstrates how circles and ellipses can be generated using the `BSplineCurve` class.

<a id=Textures></a>
### Textures

* [**demos/textured.html**](https://peteroupc.github.io/html3dutil/demos/textured.html) - Demonstrates loading textures
and applying them to 3D shapes.
* [**demos/specular.html**](https://peteroupc.github.io/html3dutil/demos/specular.html) - Demonstrates using
textures as specular reflection maps.
* [**demos/normalmap.html**](https://peteroupc.github.io/html3dutil/demos/normalmap.html) - Demonstrates using
normal map textures.
* [**demos/gradient.html**](https://peteroupc.github.io/html3dutil/demos/gradient.html) - Demonstrates generating a custom
texture -- a linear gradient from one color to another.
* [**demos/skysphere.html**](https://peteroupc.github.io/html3dutil/demos/skysphere.html) - Demonstrates how to
implement a 360-degree background texture -- a _sky sphere_ -- using custom shader materials.
* [**demos/procedtexture.html**](https://peteroupc.github.io/html3dutil/demos/procedtexture.html) - Demonstrates how to apply a shader-generated texture to a 3D shape.

<a id=Shaders></a>
### Shaders

* [**demos/squares.html**](https://peteroupc.github.io/html3dutil/demos/squares.html) - Demonstrates shader-based filters.
* [**demos/raymarch.html**](https://peteroupc.github.io/html3dutil/demos/gears.html) - A demonstration of the following:
   * Custom shaders in HTML `script` blocks.
   * The "ray marching" technique for procedural 3D content.
* [**demos/checkerboard.html**](https://peteroupc.github.io/html3dutil/demos/checkerboard.html) - Shader for generating a checkerboard texture.
* [**demos/gradient2.html**](https://peteroupc.github.io/html3dutil/demos/gradient2.html) - Shader-based version of the "gradient" demo.
* [**demos/marble.html**](https://peteroupc.github.io/html3dutil/demos/marble.html) - Shader for generating a marble background.
* [**demos/marble2.html**](https://peteroupc.github.io/html3dutil/demos/marble2.html) - Another shader for generating a marble background.
* [**demos/wood.html**](https://peteroupc.github.io/html3dutil/demos/wood.html) - Shader for generating a wood background.

<a id=Particle_Systems></a>
### Particle Systems

* [**demos/tris.html**](https://peteroupc.github.io/html3dutil/demos/tris.html) - Demonstrates a particle system.
* [**demos/fallingballs.html**](https://peteroupc.github.io/html3dutil/demos/fallingballs.html) - Demonstrates falling balls
of different sizes.

<a id=Loading_3D_Models></a>
### Loading 3D Models

* [**demos/obj.html**](https://peteroupc.github.io/html3dutil/demos/obj.html) - An object file loader.
* [**demos/stl.html**](https://peteroupc.github.io/html3dutil/demos/stl.html) - Demonstrates loading 3D models.

<a id=Selecting_Objects></a>
### Selecting Objects

* [**demos/picking.html**](https://peteroupc.github.io/html3dutil/demos/picking.html),  [**demos/picking2.html**](https://peteroupc.github.io/html3dutil/demos/picking2.html),
[**demos/picking3.html**](https://peteroupc.github.io/html3dutil/demos/picking3.html) - These demos demonstrate how object picking can be implemented.

<a id=Lights></a>
### Lights

* [**demos/animation-light.html**](https://peteroupc.github.io/html3dutil/demos/animation-light.html) - Much like _animation.html_, but illuminated using a point light.

<a id=Text></a>
### Text

* [**demos/textwith3D.html**](https://peteroupc.github.io/html3dutil/demos/textwith3d.html) - Demonstrates loading bitmap fonts and displaying text with them. Demonstrates showing bitmap font text on top of a 3D animation.

<a id=Projections></a>
### Projections

* [**demos/perspective.html**](https://peteroupc.github.io/html3dutil/demos/perspective.html) - Demonstrates a perspective projection.
* [**demos/animation-isometric.html**](https://peteroupc.github.io/html3dutil/demos/animation-isometric.html) - Much like _animation.html_, but demonstrates an isometric projection.

<a id=Example_2></a>
## Example

The following is a simple example of an HTML page that uses the Geometry Utilities Library. It sets up the 3D scene, generates a 3D box, colors it red, and rotates it each frame as time passes. Look at the comments; they explain better what each part of the code is doing. Also note the `<canvas>` element it uses on the page.

    <head>
    <script type="text/javascript" src="h3du_min.js"></script>
    </head>
    <body>
    <canvas width="600" height="450" id=canvas></canvas>
    <script>
     // Create the 3D scene; find the HTML canvas and pass it
     // to Scene3D.
     var scene=new H3DU.Scene3D(document.getElementById("canvas"));
     var sub=new H3DU.Batch3D();
      // Set the perspective view. Camera has a 45-degree field of view
      // and will see objects from 0.1 to 100 units away.
      .perspectiveAspect(45,0.1,100)
      // Move the camera back 40 units.
      .setLookAt([0,0,40]);
    sub.getLights().setBasic();
     // Create a box mesh 10 units in size
     var mesh=H3DU.Meshes.createBox(10,20,20);
     // Create a shape based on the mesh and give it a red color
     var shape=new H3DU.Shape(mesh).setColor("red");
     // Add the shape to the scene
     sub.addShape(shape);
     // Create a timer
     var timer={};
     // Set up the render loop
     H3DU.renderLoop(function(time){
      // Update the shape's rotation
      var q=H3DU.MathUtil.quatFromTaitBryan(
        360*H3DU.getTimePosition(timer,time,6000),
        360*H3DU.getTimePosition(timer,time,12000),
        0
      );
      shape.setQuaternion(q);
      // Render the scene
      scene.render(sub);
    });
    //-->
    </script>
    </body>

<a id=History></a>
## History

See [**older version history**](https://peteroupc.github.io/html3dutil/tutorial-history.html).

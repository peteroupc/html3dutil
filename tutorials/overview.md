## Public-Domain HTML 3D Library <a id=Public_Domain_HTML_3D_Library></a>

This page will introduce the [**HTML 3D Library**](https://github.com/peteroupc/html3dutil/releases), an open-source JavaScript library that I wrote.

This library contains classes and utility methods to ease the development of HTML 3D applications, such as Web sites, in browsers that support 3D drawing using the HTML5 Canvas.

The library differs from many others because this one is in the public domain, so no license is required to use it.

This page includes information on how to use the HTML 3D library, an overview of its features, and an example of a simple 3D-enabled Web page.

## Example <a id=Example></a>

![](https://peteroupc.github.io/html3dutil/html3d.png)

## Contents <a id=Contents></a>

[Public-Domain HTML 3D Library](#Public_Domain_HTML_3D_Library)<br>[Example](#Example)<br>[Contents](#Contents)<br>[How to Use](#How_to_Use)<br>&nbsp;&nbsp;[List of Classes](#List_of_Classes)<br>&nbsp;&nbsp;[`H3DU.Scene3D`](#H3DU_Scene3D)<br>&nbsp;&nbsp;[The "Camera"](#The_Camera)<br>&nbsp;&nbsp;[3D Models](#3D_Models)<br>&nbsp;&nbsp;[Shapes](#Shapes)<br>&nbsp;&nbsp;[The Render Loop](#The_Render_Loop)<br>[A Skeleton for 3D Apps](#A_Skeleton_for_3D_Apps)<br>[Demos](#Demos)<br>&nbsp;&nbsp;[Simple Demos](#Simple_Demos)<br>&nbsp;&nbsp;[Materials](#Materials)<br>&nbsp;&nbsp;[Shapes and meshes](#Shapes_and_meshes)<br>&nbsp;&nbsp;[Paths](#Paths)<br>&nbsp;&nbsp;[Curves and Surfaces](#Curves_and_Surfaces)<br>&nbsp;&nbsp;[Textures](#Textures)<br>&nbsp;&nbsp;[Shaders](#Shaders)<br>&nbsp;&nbsp;[Particle Systems](#Particle_Systems)<br>&nbsp;&nbsp;[Loading 3D Models](#Loading_3D_Models)<br>&nbsp;&nbsp;[Text](#Text)<br>&nbsp;&nbsp;[Alternative Rendering](#Alternative_Rendering)<br>&nbsp;&nbsp;[Miscellaneous](#Miscellaneous)<br>[Example](#Example)<br>

## How to Use <a id=How_to_Use></a>

1. [**Download the HTML 3D library**](https://github.com/peteroupc/html3dutil/releases).
2. Extract the file <i>"h3du_min.js"</i>, and write the following code in every HTML page where you will use the library.

        <script type="text/javascript" src="h3du_min.js"></script>

3. Include an HTML 3D canvas somewhere on the Web page, since drawing 3D objects requires a 3D canvas. You may set its `width` and `height`. You should also give it an ID so you can refer to it more easily in your JavaScript code, as shown in this example.

        <canvas width="640" height="480" id="canvas"></canvas>

4. To use the HTML 3D library in JavaScript, either add the JavaScript code to the bottom of the page or use an event listener, as in this example:

        <script>
        window.addEventListener("load",function(){
          var scene=new Scene3D(document.getElementById("canvas"));
          // We have the 3D scene, use it.  (See the example code
          // at the bottom of this article for a more complete example.)
        })
        </script>

This is an overview of most of the JavaScript classes available in this library:
### List of Classes <a id=List_of_Classes></a>

* `H3DU` - Contains various utility methods in the HTML 3D Library
* `H3DU.Math` - Contains math methods useful in 3D applications, such as matrices and vectors
* `H3DU.Mesh` - Helper class for building a 3D model
* `H3DU.MeshBuffer` - Represents a 3D model
* `H3DU.Meshes` - Generates built-in 3D models
* `H3DU.Material`, `Texture` - Represents textures and colors for a 3D object&#39;s appearance
* `H3DU.Lights`, `LightSource` - Represents light sources
* `H3DU.Scene3D` - Represents a 3D scene
* `H3DU.Batch3D` - Represents a collection of shapes to draw and a projection and view
* `H3DU.FrameBuffer` - Represents a frame buffer object
* `H3DU.ShaderProgram` - Represents a GLSL shader program
* `H3DU.Shape` - Represents an instance of a 3D shape with its own transform and appearance
* `H3DU.ShapeGroup` - Represents a group of 3D shapes
* `H3DU.BezierCurve`, `H3DU.BezierSurface`, `H3DU.CurveEval`, `H3DU.SurfaceEval `- Supports generating parametric curves and surfaces

For much more information on all of these classes, see my <a href="https://peteroupc.github.io/html3dutil">documentation for the HTML 3D library</a>.

The following sections detail how a 3D application using this library works.

### `H3DU.Scene3D` <a id=H3DU_Scene3D></a>

The `H3DU.Scene3D` class is a renderer for a canvas 3D context.  It renders batches of 3D shapes
in the form of `H3DU.Batch3D` objects.  Each `Batch3D` represents a so-called "scene graph". It holds
3D objects which will be drawn to the screen, as well as the camera&#39;s projection, the camera&#39;s
position, and light sources to illuminate the 3D scene.

To create a `H3DU.Scene3D`, you first need to find the HTML canvas in your JavaScript, then you
need to pass it to `new Scene3D()`. Once you do so, `H3DU.Scene3D` will use that canvas to draw
3D objects. Here is an example. You will also need to create a `H3DU.Batch3D` to hold 3D objects.

    // Find the HTML canvas with the ID "canvas".
    var canvas=document.getElementById("canvas")
    // Create a 3D scene using that canvas.
    var scene=new H3DU.Scene3D(canvas);
    var batch=new H3DU.Batch3D();

### The "Camera" <a id=The_Camera></a>

The `H3DU.Batch3D` class has a concept of a "projection transform" and a "view transform". If we
use the concept of a "camera", the projection is like setting the camera&#39;s focus and lens, and the view transform is like setting its position and orientation. `H3DU.Batch3D` has methods for setting all these attributes of this abstract "camera". Two of them are `perspectiveAspect()` and `setLookAt()`, which are shown in the example below.

    // Set the perspective view.  Camera has a 45-degree field of view
    // and will see objects from 0.1 to 100 units away.
    batch.perspectiveAspect(45,0.1,100);
    // Move the camera back 40 units.
    batch.setLookAt([0,0,40]);
    // Move the camera back 30 units instead, and turn it so it
    // points at (0, 2, 0), that is, up 2 units.
    batch.setLookAt([0,0,30], [0,2,0]);

For more information, see _<a href="http://www.codeproject.com/Tips/989978/The-Camera-and-the-Projection-and-View-Transforms">The "Camera" and Perspective and View Transforms</a>_.
### 3D Models <a id=3D_Models></a>

Every 3D scene is made up of "meshes", or the triangles, lines, and points that make up a geometric three-dimensional object. Meshes can be simple, such as a cube, or very complex, such as a town model complete with houses. You create a mesh using the `H3DU.Mesh` class, or create a built-in geometric shape using a method in the `H3DU.Meshes` class. The example below shows how you can create a box mesh:

    // Create a box mesh 10 units in width, 20 units
    // in height, and 25 units in depth
    var mesh=H3DU.Meshes.createBox(10,20,25);

Here are some other built-in mesh methods. This page doesn&#39;t explain all the
features or parameters in the `Meshes` class; for that, see the
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

For more information on meshes, see <a href="http://www.codeproject.com/Tips/987914/Creating-shapes-using-the-Public-Domain-HTML-D-Lib">_Creating shapes using the Public Domain HTML 3D Library_</a>.
### Shapes <a id=Shapes></a>

Once a mesh is created, it needs to be added to the 3D scene in order to be rendered.
Use the `H3DU.Shape` constructor method to convert the mesh to a shape. Then you can set the shape&#39;s properties such as color, size, and position. Then, call `addShape()` to add the shape to the 3D object batch.

    // Create a shape based on the mesh
    var shape=new H3DU.Shape(mesh);
    // Make it red (you can also use the HTML color string
    // "#FF0000" instead)
    shape.setColor("red");
    // Move it 1 unit along the X axis
    shape.setPosition(1,0,0);
    // Add the shape to the scene
    batch.addShape(shape);

The appearance of a 3D shape is known in the 3D graphics world as a "material". It includes textures (images), colors, and light reflection parameters. The <a href="http://peteroupc.github.io/html3dutil/H3DU.Material.html">`Material`</a> class holds data on some of these parameters, and is part of the definition of a shape.

Here are details on some of the `Shape` class&#39;s methods.

  * <dfn>`<i>shape</i>.setPosition(x, y, z)`</dfn>
  <br>Sets the shape&#39;s position to the given coordinates.
  * <dfn>`<i>shape</i>.setScale(x, y, z)`</dfn>
  <br>Sets the shape&#39;s scaling along the x, y, and z axes. Examples: (1, 1, 1) means no scaling, (2, 1, 1) means a doubled width, (1, 1, 0.5) means a halved depth.
  * <dfn>`<i>shape</i>.getTransform().setOrientation(angle, x, y, z)`</dfn>
  <br>Sets the shape&#39;s rotation given an angle in degrees, and an axis of rotation (the x, y, and z parameters). Example: (40, 1, 0, 0) means a 40-degree rotation around the X axis (x is 1 in the axis of rotation).
  * <dfn>`<i>shape</i>.setColor(color)`</dfn>
  <br>Gives the shape a particular color. `color` can be an HTML color ("#ff0000"), CSS color ("red"), RGB color("rgb(20, 30, 40)") or HSL color("hsl(20, 50%, 50%)"), or a set of values from 0 to 1 (example: `[1.0,0.5,0.0]`).
  * <dfn>`<i>shape</i>.setTexture(name)`</dfn>
  <br>Gives the shape a particular texture, with the URL `name`. The texture should be in the same origin as the Web page (which usually means the same directory).
  * <dfn>`<i>shape</i>.copy()`</dfn>
  <br>Creates a copy of this shape. Can be more efficient than calling `new H3DU.Shape` if the same geometric mesh will be used more than once in the same 3D scene, with different positions and attributes.

### The Render Loop <a id=The_Render_Loop></a>

An important part of a 3D application is the render loop. The render loop is a block of code that is called many times a second (or many "frames" a second) to redraw the 3D scene. Each frame, the state of the application is updated, and the 3D scene is re-rendered to account for that state. To render a scene, use the `H3DU.Scene3D.render()` method, passing a batch of shapes to render. Render loops are created using the `H3DU.renderLoop()` method. Here is an example of a render loop.

   // Set up the render loop
   H3DU.renderLoop(function(time){
    // This will be called once each frame.
    // Here, we render the scene
    scene.render(batch);
   });

The render loop method takes a parameter (here "time"), containing the number of milliseconds since the page was started.&nbsp; This can be used to implement frame-rate independent animations.

## A Skeleton for 3D Apps <a id=A_Skeleton_for_3D_Apps></a>

The following is a minimal skeleton you can use for writing HTML apps using this library.

    <head>
    <meta charset=utf-8>
    <meta name="viewport" content="user-scalable=no,initial-scale=1,maximum-scale=1">
    <script type="text/javascript" src="h3du_min.js"></script>
    </head>
    <body style="margin:0px">
    <canvas id=canvas style="width:100%; height:100%; overflow: hidden;"></canvas>
    <script>
    // Your script goes here
    </script>
    </body>

## Demos <a id=Demos></a>

The following are HTML Web pages showing a variety of features of the HTML 3D library. Each demo includes a link to access source code for that demo.

### Simple Demos <a id=Simple_Demos></a>

* [demos/simple.html](https://peteroupc.github.io/html3dutil/demos/simple.html) - A simple demo using this library.
* [demos/triangle.html](https://peteroupc.github.io/html3dutil/demos/triangle.html) - Demonstrates drawing a triangle.

### Materials <a id=Materials></a>

* [demos/selfpulse.html](https://peteroupc.github.io/html3dutil/demos/selfpulse.html) - Demonstrates
a rotating, pulsating box.

### Shapes and meshes <a id=Shapes_and_meshes></a>

* [demos/compositeMesh.html](https://peteroupc.github.io/html3dutil/demos/compositeMesh.html) - Demonstrates
combining multiple meshes into one.
* [demos/shapes.html](https://peteroupc.github.io/html3dutil/demos/shapes.html) - Demonstrates
the built-in shapes.
* [demos/newshapes.html](https://peteroupc.github.io/html3dutil/demos/newshapes.html) - Fancier
demo of some of the built-in shapes.
* [demos/builtinshapes.html](https://peteroupc.github.io/html3dutil/demos/builtinshapes.html) - Interactive demo of
the built-in shapes.
* [demos/platonic.html](https://peteroupc.github.io/html3dutil/demos/platonic.html) - A demo featuring the five
platonic solids.  Demonstrates how vertex and index arrays are built up to create geometric meshes.
* [demos/clock.html](https://peteroupc.github.io/html3dutil/demos/clock.html) - A demo
featuring a wall clock.

### Paths <a id=Paths></a>

* [demos/marchingdots.html](https://peteroupc.github.io/html3dutil/demos/marchingdots.html) - Demo
of a series of dots following a path like marching ants. Shows some of the functionality of graphics paths.
* [demos/polyclip.html](https://peteroupc.github.io/html3dutil/demos/polyclip.html) -
Similar to "marchingdots.html", but now uses the union of two circles as a path to demonstrate polygon
clipping.
* [demos/pathtube.html](https://peteroupc.github.io/html3dutil/demos/pathtube.html) - Demo
of a tube formed by a path curve.
* [demos/pathshapes.html](https://peteroupc.github.io/html3dutil/demos/pathshapes.html) - Demo
of 3D and 2D shapes generated by a 2D path.

### Curves and Surfaces <a id=Curves_and_Surfaces></a>

* [demos/surfaces.html](https://peteroupc.github.io/html3dutil/demos/surfaces.html) - Demonstrates
using evaluators to generate parametric surfaces.
* [demos/curves.html](https://peteroupc.github.io/html3dutil/demos/curves.html) - Demonstrates
using evaluators to generate parametric curves.
* [demos/surfacesexpr.html](https://peteroupc.github.io/html3dutil/demos/surfacesexpr.html) - Demonstrates
parametric surfaces, with a custom formula editor.
* [demos/curvesexpr.html](https://peteroupc.github.io/html3dutil/demos/curvesexpr.html) - Demonstrates
parametric curves, with a custom formula editor.
* [demos/implicit.html](https://peteroupc.github.io/html3dutil/demos/implicit.html) - Demonstrates
implicit surfaces.

### Textures <a id=Textures></a>

* [demos/textured.html](https://peteroupc.github.io/html3dutil/demos/textured.html) - Demonstrates loading textures
and applying them to 3D shapes.
* [demos/specular.html](https://peteroupc.github.io/html3dutil/demos/specular.html) - Demonstrates using
textures as specular reflection maps.
* [demos/gradient.html](https://peteroupc.github.io/html3dutil/demos/gradient.html) - Demonstrates generating a custom
texture -- a linear gradient from one color to another.

### Shaders <a id=Shaders></a>

* [demos/squares.html](https://peteroupc.github.io/html3dutil/demos/squares.html) - Demonstrates shader-based filters.

### Particle Systems <a id=Particle_Systems></a>

* [demos/tris.html](https://peteroupc.github.io/html3dutil/demos/tris.html) - Demonstrates a particle system.
* [demos/fallingballs.html](https://peteroupc.github.io/html3dutil/demos/fallingballs.html) - Demonstrates falling balls
of different sizes.

### Loading 3D Models <a id=Loading_3D_Models></a>

* [demos/obj.html](https://peteroupc.github.io/html3dutil/demos/obj.html) - An object file loader.
* [demos/stl.html](https://peteroupc.github.io/html3dutil/demos/stl.html) - Demonstrates loading 3D models.

### Text <a id=Text></a>

* [demos/textwith3D.html](https://peteroupc.github.io/html3dutil/demos/textwith3d.html) - Demonstrates loading bitmap fonts and displaying text with them. Demonstrates showing bitmap font text on top of a 3D animation.

### Alternative Rendering <a id=Alternative_Rendering></a>

* [demos/surfaces2d.html](https://peteroupc.github.io/html3dutil/demos/surfaces2d.html) - Same as the surfaces.html
demo, but uses an experimental renderer using the HTML 2D Canvas instead of an HTML 3D context.  Only a limited
set of features are currently supported.

### Miscellaneous <a id=Miscellaneous></a>

* [demos/background.html](https://peteroupc.github.io/html3dutil/demos/background.html) - A demo
featuring a background with continuously drawn 3D shapes.
* [demos/animation.html](https://peteroupc.github.io/html3dutil/demos/animation.html) - A demo
illustrating a simple animation of 3D shapes.
* [demos/starfield.html](https://peteroupc.github.io/html3dutil/demos/starfield.html) - Demo of a star field.
* [demos/perspective.html](https://peteroupc.github.io/html3dutil/demos/perspective.html) - Demonstrates a perspective projection.

## Example <a id=Example></a>

The following is a simple example of an HTML page that uses the HTML 3D library. It sets up the 3D scene, generates a 3D box, colors it red, and rotates it each frame as time passes. Look at the comments; they explain better what each part of the code is doing. Also note the `<canvas>` element it uses on the page.

    <head>
    <script type="text/javascript" src="h3du_min.js"></script>
    </head>
    <body>
    <canvas width="600" height="450" id=canvas></canvas>
    <script>
     // Create the 3D scene; find the HTML canvas and pass it
     // to Scene3D.
     var scene=new H3DU.Scene3D(document.getElementById("canvas"));
     var sub=new H3DU.Batch3D()
      // Set the perspective view.  Camera has a 45-degree field of view
      // and will see objects from 0.1 to 100 units away.
      .perspectiveAspect(45,0.1,100)
      // Move the camera back 40 units.
      .setLookAt([0,0,40]);
    sub.getLights().setDefaults();
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
      var q=H3DU.Math.quatFromTaitBryan(
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

<h2>History</h2>

<h3>Version 1.5.1</h3>

* Fixed bug in normal calculation
* Make certain changes to the demos to ensure compatibility with the next major version
* Fix curve returned by `GraphicsPath#getCurves()` so that closed paths remain smooth at their endpoints when a curve tube is generated from them

<h3>Version 1.5</h3>

* Add support for specular maps and normal maps, including in the JSON mesh format and MTL material format.
* To support normal maps, extra methods for bitangents and tangents were added to the `Mesh` class.
* Added six new demos and modified several others
* Support 24-bit color versions of TGA files
* `Scene3D` now does frustum culling of its shapes
* Fixed vertex normal calculation in the `recalcNormals()` method of the `Mesh` class.
* Allow two-element arrays to be passed to the `Mesh` class&#39;s `texCoord3()` method.
* Add `getBoundingBox` method to the `Mesh` class.
* Add the `setVisible` method to the `Shape` and `ShapeGroup` classes.
* Allow reading <em>OBJ</em> files with negative reference numbers
* Add <em>path.js </em>(2D graphics paths) to extras
* Added an &quot;`axis`&quot; parameter to the `SurfaceOfRevolution` constructor and `fromFunction` method
* Add `vec3negate`, `vec3negateInPlace`, `vec3mul`, and `plane` and `frustum` methods to the `GLMath` class
* Deprecate the practice of setting shape materials directly to textures (calling the Shape#setMaterial method with a `Texture` object rather than a `Material` object).
* Deprecate certain properties of `Transform` that shouldn&#39;t be exposed as a `public` API and add corresponding methods for those properties
* Fix `getPromiseResults`
* Documentation added in many places
* &quot;<em>meshexamples.md</em>&quot; demo added and other demos edited or rearranged
* Other changes and fixes

See [older version history](https://peteroupc.github.io/html3dutil/tutorial-history.html).

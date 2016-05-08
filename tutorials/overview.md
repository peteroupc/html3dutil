## Public-Domain HTML 3D Library <a id=Public_Domain_HTML_3D_Library></a>

This page will introduce a new open-source JavaScript library that I wrote, called the [**HTML 3D Library**](https://github.com/peteroupc/html3dutil/releases).

This library contains classes and utility methods to ease the development of HTML 3D applications, such as Web sites, in browsers that support 3D drawing using the HTML5 Canvas.

The library differs from many others because this one is in the public domain, so no license is required to use it.

This tip will include information on how to use the HTML 3D library, an overview of its features, and an example of a simple 3D-enabled Web page.

## Example <a id=Example></a>

![](https://peteroupc.github.io/html3dutil/html3d.png)

## Contents <a id=Contents></a>

[Public-Domain HTML 3D Library](#Public_Domain_HTML_3D_Library)<br>[Example](#Example)<br>[Contents](#Contents)<br>[How to Use](#How_to_Use)<br>&nbsp;&nbsp;[List of Classes](#List_of_Classes)<br>&nbsp;&nbsp;[Scene3D](#Scene3D)<br>&nbsp;&nbsp;[The "Camera"](#The_Camera)<br>&nbsp;&nbsp;[3D Models](#3D_Models)<br>&nbsp;&nbsp;[Shapes](#Shapes)<br>&nbsp;&nbsp;[The Render Loop](#The_Render_Loop)<br>[A Skeleton for 3D Apps](#A_Skeleton_for_3D_Apps)<br>[Demos](#Demos)<br>&nbsp;&nbsp;[Simple Demos](#Simple_Demos)<br>&nbsp;&nbsp;[Materials](#Materials)<br>&nbsp;&nbsp;[Shapes and meshes](#Shapes_and_meshes)<br>&nbsp;&nbsp;[Paths](#Paths)<br>&nbsp;&nbsp;[Curves and Surfaces](#Curves_and_Surfaces)<br>&nbsp;&nbsp;[Textures](#Textures)<br>&nbsp;&nbsp;[Shaders](#Shaders)<br>&nbsp;&nbsp;[Particle Systems](#Particle_Systems)<br>&nbsp;&nbsp;[Loading 3D Models](#Loading_3D_Models)<br>&nbsp;&nbsp;[Text](#Text)<br>&nbsp;&nbsp;[Alternative Rendering](#Alternative_Rendering)<br>&nbsp;&nbsp;[Miscellaneous](#Miscellaneous)<br>[Example](#Example)<br>

## How to Use <a id=How_to_Use></a>

1. [**Download the HTML 3D library**](https://github.com/peteroupc/html3dutil/releases).
2. Extract the file <i>"glutil_min.js"</i>, and write the following code in every HTML page where you will use the library.

        <script type="text/javascript" src="glutil_min.js"></script>

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

* `GLMath` - Contains math methods useful in 3D applications, such as matrices and vectors
* `GLUtil` - Contains various utility methods in the HTML 3D Library
* `Mesh` - Represents a 3D model
* `Meshes` - Generates built-in 3D models
* `Material`, `Texture` - Represents textures and colors for a 3D object&#39;s appearance
* `Lights`, `LightSource` - Represents light sources
* `Scene3D` - Represents a 3D scene
* `BufferedMesh` - Represents a 3D model as vertex buffer objects
* `FrameBuffer` - Represents a frame buffer object
* `ShaderProgram` - Represents a GLSL shader program
* `Shape` - Represents an instance of a 3D shape with its own transform and appearance
* `ShapeGroup` - Represents a group of 3D shapes
* `BezierCurve`, `BezierSurface`, `CurveEval`, `SurfaceEval `- Supports generating parametric curves and surfaces

For much more information on all of these classes, see my <a href="https://peteroupc.github.io/html3dutil">documentation for the HTML 3D library</a>.

The following sections detail how a 3D application using this library works.

### Scene3D <a id=Scene3D></a>

The `Scene3D` class represents a so-called "scene graph". It holds every 3D object which will be drawn to the screen, as well as the camera&#39;s projection, the camera&#39;s position, and light sources to illuminate the 3D scene, among many other things.

To create a `Scene3D`, you first need to find the HTML canvas in your JavaScript, then you need to pass it to `new Scene3D()`. Once you do so, `Scene3D `will use that canvas to draw all 3D objects it receives. Here is an example.

    // Find the HTML canvas with the ID "canvas".
    var canvas=document.getElementById("canvas")
    // Create a 3D scene using that canvas.
    var scene=new Scene3D(canvas);

### The "Camera" <a id=The_Camera></a>

The `Scene3D` class has a concept of a "projection transform" and a "view transform". If we use the concept of a "camera", the projection is like setting the camera&#39;s focus and lens, and the view transform is like setting its position and orientation. `Scene3D` has methods for setting all these attributes of this abstract "camera". Two of them are `setPerspective()` and `setLookAt()`, which are shown in the example below.

    // Set the perspective view.  Camera has a 45-degree field of view
    // and will see objects from 0.1 to 100 units away.
    scene.setPerspective(45,scene.getClientAspect(),0.1,100);
    // Move the camera back 40 units.
    scene.setLookAt([0,0,40]);
    // Move the camera back 30 units instead, and turn it so it
    // points at (0, 2, 0), that is, up 2 units.
    scene.setLookAt([0,0,30], [0,2,0]);

For more information, see _<a href="http://www.codeproject.com/Tips/989978/The-Camera-and-the-Projection-and-View-Transforms">The "Camera" and Perspective and View Transforms</a>_.
### 3D Models <a id=3D_Models></a>

Every 3D scene is made up of "meshes", or the triangles, lines, and points that make up a geometric three-dimensional object. Meshes can be simple, such as a cube, or very complex, such as a town model complete with houses. You create a mesh using the `Mesh` class, or create a built-in geometric shape using a method in the `Meshes` class. The example below shows how you can create a box mesh:

    // Create a box mesh 10 units in width, 20 units
    // in height, and 25 units in depth
    var mesh=Meshes.createBox(10,20,25);

Here are some other built-in mesh methods. This tip doesn&#39;t explain all the features or parameters in the `Meshes` class; for that, see the <a href="http://peteroupc.github.io/html3dutil/glutil.Meshes.html">Meshes API documentation</a>.

  * <dfn>`Meshes.createSphere(radius)`</dfn>
  <br>Creates a sphere with the given `radius`.
  * <dfn>`Meshes.createCylinder(base, top, height)`</dfn>
  <br>Creates a cylinder with the given `base` radius, `top` radius, and `height`. Can be used to create a cone if `base` or `top` is `0`.
  * <dfn>`Meshes.createClosedCylinder(base, top, height)`</dfn>
  <br>Like `createCylinder`, except it also covers the base and top.
  * <dfn>`Meshes.createPartialDisk(inner, outer, start, sweep)`</dfn>
  <br>Creates a circular ring, of radius `outer` with a hole of radius `inner`, starting at `start` degrees and sweeping `sweep` degrees.
  * <dfn>`Meshes.createDisk(inner, outer)`</dfn>
  <br>Same as calling `createPartialDisk` with `start` 0 and `sweep` 360.

For more information on meshes, see <a href="http://www.codeproject.com/Tips/987914/Creating-shapes-using-the-Public-Domain-HTML-D-Lib">_Creating shapes using the Public Domain HTML 3D Library_</a>.
### Shapes <a id=Shapes></a>

Once a mesh is created, it needs to be added to the 3D scene in order to be rendered.
Use the `Shape` constructor method to convert the mesh to a shape. Now you can set the shape&#39;s properties such as color, size, and position. Then, call `addShape()` to add the shape to the 3D scene.

    // Create a shape based on the mesh
    var shape=new Shape(mesh);
    // Make it red (you can also use the HTML color string
    // "#FF0000" instead)
    shape.setColor("red");
    // Move it 1 unit along the X axis
    shape.setPosition(1,0,0);
    // Add the shape to the scene
    scene.addShape(shape);

The appearance of a 3D shape is known in the 3D graphics world as a "material". It includes textures (images), colors, and light reflection parameters. The <a href="http://peteroupc.github.io/html3dutil/glutil.Material.html">`Material`</a> class holds data on some of these parameters, and is part of the definition of a shape.

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
  <br>Creates a copy of this shape. Can be more efficient than calling `new Shape` if the same geometric mesh will be used more than once in the same 3D scene, with different positions and attributes.

### The Render Loop <a id=The_Render_Loop></a>

An important part of a 3D application is the render loop. The render loop is a block of code that is called many times a second (or many "frames" a second) to redraw the 3D scene. Each frame, the state of the application is updated, and the 3D scene is re-rendered to account for that state. To render a scene, use the `Scene3D.render()` method.&nbsp; Render loops are created using the `GLUtil.renderLoop()` method. Here is an example of a render loop.

   // Set up the render loop
   GLUtil.renderLoop(function(time){
    // This will be called once each frame.
    // Here, we render the scene
    scene.render();
   });

The render loop method takes a parameter (here "time"), containing the number of milliseconds since the page was started.&nbsp; This can be used to implement frame-rate independent animations.
## A Skeleton for 3D Apps <a id=A_Skeleton_for_3D_Apps></a>

The following is a minimal skeleton you can use for writing HTML apps using this library.

    <head>
    <meta charset=utf-8>
    <meta name="viewport" content="user-scalable=no,initial-scale=1,maximum-scale=1">
    <script type="text/javascript" src="glutil_min.js"></script>
    </head>
    <body style="margin:0px">
    <canvas id=canvas style="width:100%; height:100%; overflow: hidden;"></canvas>
    <script>
    // Your script goes here
    </script>
    </body>

## Demos <a id=Demos></a>

The following are HTML Web pages showing a variety of features of the HTML 3D library. Each demo includes source code for that demo at the bottom of the page.

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
    <script type="text/javascript" src="glutil_min.js"></script>
    </head>
    <body>
    <canvas width="600" height="450" id=canvas></canvas>
    <script>
      // Create the 3D scene; find the HTML canvas and pass it
      // to Scene3D.
      var scene=new Scene3D(document.getElementById("canvas"));
      // Set the perspective view.  Camera has a 45-degree field of view
      // and will see objects from 0.1 to 100 units away.
      scene.setPerspective(45,scene.getClientAspect(),0.1,100);
      // Move the camera back 40 units.
      scene.setLookAt([0,0,40]);
      // Create a box mesh 10 units in width, 20 units
      // in height, and 20 units in depth
      var mesh=Meshes.createBox(10,20,20);
      // Create a shape based on the mesh and give it a red color
      var shape=new Shape(mesh).setColor("red");
      // Add the shape to the scene
      scene.addShape(shape);
      // Set the starting rotation
      var rotation=[0,0,0];
      // Set up the render loop
      GLUtil.renderLoop(function(){
       rotation[0]+=.5; // Adjust x-rotation by .5 degree
       rotation[1]+=1.0; // Adjust y-rotation by 1 degree
       // Update the shape&#39;s rotation
       shape.setQuaternion(GLMath.quatFromTaitBryan(rotation));
       // Render the scene
       scene.render();
      });
    //-->
    </script>
    </body>

<h2>History</h2>

<h3>Version 1.5.1</h3>

* Fixed bug in normal calculation
* Make certain changes to the demos to ensure compatibility with the next major version
* Fix curve returned by <code>GraphicsPath#getCurves() </code>so that closed paths remain smooth at their endpoints when a curve tube is generated from them

<h3>Version 1.5</h3>

* Add support for specular maps and normal maps, including in the JSON mesh format and MTL material format.
* To support normal maps, extra methods for bitangents and tangents were added to the <code>Mesh</code> class.
* Added six new demos and modified several others
* Support 24-bit color versions of TGA files
* <code>Scene3D </code>now does frustum culling of its shapes
* Fixed vertex normal calculation in the <code>recalcNormals() </code>method of the <code>Mesh</code> class.
* Allow two-element arrays to be passed to the <code>Mesh</code> class&#39;s <code>texCoord3() </code>method.
* Add <code>getBoundingBox </code>method to the <code>Mesh </code>class.
* Add the <code>setVisible </code>method to the <code>Shape </code>and <code>ShapeGroup </code>classes.
* Allow reading <em>OBJ</em> files with negative reference numbers
* Add <em>path.js </em>(2D graphics paths) to extras
* Added an &quot;<code>axis</code>&quot; parameter to the <code>SurfaceOfRevolution </code>constructor and <code>fromFunction </code>method
* Add <code>vec3negate</code>, <code>vec3negateInPlace</code>, <code>vec3mul</code>, and <code>plane</code> and <code>frustum</code> methods to the <code>GLMath</code> class
* Deprecate the practice of setting shape materials directly to textures (calling the Shape#setMaterial method with a <code>Texture</code> object rather than a <code>Material</code> object).
* Deprecate certain properties of <code>Transform </code>that shouldn&#39;t be exposed as a <code>public </code>API and add corresponding methods for those properties
* Fix <code>getPromiseResults</code>
* Documentation added in many places
* &quot;<em>meshexamples.md</em>&quot; demo added and other demos edited or rearranged
* Other changes and fixes

<h3>Version 1.4</h3>

* Fixed <em>camera.js </em>issues (thanks to the user &quot;<code>the-sz</code>&quot; on GitHub)
* Added an <em>extras</em> folder with the following new scripts:

  * A <code>CurveTube </code>class for creating tubes from 3D curves
  * A parametric evaluator for surfaces of revolution and 3 kinds of curves (<em>evaluators.js</em>)
  * A frame counter (moved from the demos)
  * A JSON converter and loader for 3D meshes (<em>meshjson.js</em>)

* Made <em>objmtl.js</em> compatible with more MTL files
* <code>Math.sin</code>/<code>Math.cos </code>pairs were replaced with optimized versions throughout the code
* Add <code>mat4transformVec3 </code>method to <code>GLMath</code>
* Add <code>BSplineCurve </code>class
* Deprecate <code>vertexBezier</code>, <code>normalBezier</code>, <code>colorBezier</code>, and <code>texCoordBezier </code>methods of <code>CurveEval </code>and <code>SurfaceEval</code>
* Optimize <code>SurfaceEval</code>&#39;s <code>evalSurface </code>method when generating triangles
* Add <code>primitiveCount </code>and <code>enumPrimitives </code>methods to the <code>Mesh </code>class
* Add <code>setMaterial </code>and <code>removeShape </code>methods to the <code>ShapeGroup </code>class
* Default shader program now uses <code>modelViewMatrix</code> instead of separate <code>world</code> and <code>view</code> uniforms
* FIx JSON issues in <code>GLUtil.loadFileFromUrl </code>method
* Many new demos added
* Add graphics filters tutorial and expanded several other tutorials

<h3>Version 1.3.1</h3>

* Fixed touch events in some of the interactive demos
* Fixed issues with <code>BezierCurve</code>, <code>BezierSurface</code>
* Robustness improvement in autonormal feature of <code>SurfaceEval</code>
* Correctness and other fixes

<h3>Version 1.3</h3>

* <code>Camera</code> class rewritten again, but backwards compatible with version 1.0
* Adds <code>vec3add</code>, <code>vec3sub</code>, <code>vec3copy</code>, <code>vec3assign</code>, <code>vec4assign </code>methods to <code>GLMath</code>
* Fixes <code>quatInvert </code>method and optimized <code>mat4inverseTranspose </code>method of <code>GLMath</code>
* Adds <code>reverseNormals </code>method to <code>GLMath</code>
* Adds <code>createCanvasElement</code>, <code>getTimePosition</code>, and <code>newFrames </code>methods to <code>GLUtil</code>
* Deprecates <code>createCanvas </code>method of <code>GLUtil</code>
* Improves <code>renderLoop </code>method of <code>GLUtil</code>
* Improves specular highlights
* Allows coordinate arrays in <code>vertex2 </code>and <code>vertex3 </code>methods of <code>Mesh </code>class
* Resolves some autonormal degenerate cases in <code>SurfaceEval</code> class
* Adds <code>getCount</code> method to <code>Lights</code> class
* Adds face culling, auto resize, and pixel depth methods to <code>Scene3D </code>class
* Adds <code>getClientAspect </code>method to <code>Scene3D </code>class
* Other fixes and improvements

<h3>Version 1.2.1</h3>

* Fixes bug that occurs when a shape derived from a mesh that defines its own colors is drawn before a shape derived from a mesh that doesn&#39;t define its own colors

<h3>Version 1.2</h3>

* Supports TGA textures
* <code>Camera </code>class rewritten and support added for the mouse wheel and middle mouse button
* Lines and points supported in OBJ files
* Supports loading custom textures from byte arrays
* Adds method to create capsule shapes in <code>Meshes </code>class
* Mesh builder (<code>vector3 </code>method) avoids adding degenerate triangles
* Optimizations and bug fixes

<h3>Version 1.1</h3>

* Adds <em>frame.js</em>, a frame counter helper used in some of the demos
* Adds <code>quatInvert </code>method to the <code>GLMath </code>class
* Fixes texture mapping bugs
* Expands use of the <code>color3</code> method of the <code>Mesh</code> class
* Optimizes <code>setUniforms</code> method of the <code>ShaderProgram </code>class
* Adds <code>movePosition </code>method of the <code>Transform </code>class
* New methods in the <code>ShapeGroup </code>and <code>Scene3D </code>classes
* Bug fixes

<h3>Version 1.0</h3>

* Adds <code>setOrtho2DAspect </code>and <code>setOrthoAspect </code>methods to <code>Scene3D</code>
* Adds <code>mat4TransposeInPlace </code>method and two constants to <code>GLMath</code>
* Renames <code>fromEuler</code> and <code>toEuler</code> methods in <code>GLMath</code> to <code>fromTaitBryan</code> and <code>toTaitBryan</code>
* Modifies the <code>Lights</code> class
* Allows alpha component in material diffuse
* Optimizes setting uniforms in shader programs
* Adds <code>vertex2</code> method to <code>Mesh</code> class
* New classes: <code>Transform</code> and <code>ShapeGroup</code>
* Most methods that affect transforms removed, and their functionality now uses a new <code>getTransform</code> method and the <code>Transform</code> class
* Bug fixes

<h3>Version 0.2</h3>

* First CodeProject release

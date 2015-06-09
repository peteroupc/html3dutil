## Contents <a id=Contents></a>

[Contents](#Contents)<br>[How to Use](#How_to_Use)<br>&nbsp;&nbsp;[List of Classes](#List_of_Classes)<br>&nbsp;&nbsp;[Scene3D](#Scene3D)<br>&nbsp;&nbsp;[The "Camera"](#The_Camera)<br>&nbsp;&nbsp;[3D Models](#3D_Models)<br>&nbsp;&nbsp;[Shapes](#Shapes)<br>&nbsp;&nbsp;[The Render Loop](#The_Render_Loop)<br>[A Skeleton for 3D Apps](#A_Skeleton_for_3D_Apps)<br>[Demos](#Demos)<br>[Example](#Example)<br>

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

```
  // Find the HTML canvas with the ID "canvas".
  var canvas=document.getElementById("canvas")
  // Create a 3D scene using that canvas.
  var scene=new Scene3D(canvas);
```

### The "Camera" <a id=The_Camera></a>

The `Scene3D` class has a concept of a "projection transform" and a "view transform". If we use the concept of a "camera", the projection is like setting the camera&#39;s focus and lens, and the view transform is like setting its position and orientation. `Scene3D` has methods for setting all these attributes of this abstract "camera". Two of them are `setPerspective()` and `setLookAt()`, which are shown in the example below.

```
  // Set the perspective view.  Camera has a 45-degree field of view
  // and will see objects from 0.1 to 100 units away.
  scene.setPerspective(45,scene.getClientAspect(),0.1,100);
  // Move the camera back 40 units.
  scene.setLookAt([0,0,40]);
  // Move the camera back 30 units instead, and turn it so it
  // points at (0, 2, 0), that is, up 2 units.
  scene.setLookAt([0,0,30], [0,2,0]);
```

For more information, see _<a href="http://www.codeproject.com/Tips/989978/The-Camera-and-the-Projection-and-View-Transforms">The "Camera" and Perspective and View Transforms</a>_.
### 3D Models <a id=3D_Models></a>

Every 3D scene is made up of "meshes", or the triangles, lines, and points that make up a geometric three-dimensional object. Meshes can be simple, such as a cube, or very complex, such as a town model complete with houses. You create a mesh using the `Mesh` class, or create a built-in geometric shape using a method in the `Meshes` class. The example below shows how you can create a box mesh:

```
  // Create a box mesh 10 units in width, 20 units
  // in height, and 25 units in depth
  var mesh=Meshes.createBox(10,20,25);
```

Here are some other built-in mesh methods. This tip doesn&#39;t explain all the features or parameters in the `Meshes` class; for that, see the <a href="http://peteroupc.github.io/html3dutil/glutil.Meshes.html">Meshes API documentation</a>.
<dl>
  <dt>`Meshes.createSphere(radius)`</dt>
  <dd>Creates a sphere with the given `radius`.</dd>
  <dt>`Meshes.createCylinder(base, top, height)`</dt>
  <dd>Creates a cylinder with the given `base` radius, `top` radius, and `height`. Can be used to create a cone if `base` or `top` is `0`.</dd>
  <dt>`Meshes.createClosedCylinder(base, top, height)`</dt>
  <dd>Like `createCylinder`, except it also covers the base and top.</dd>
  <dt>`Meshes.createPartialDisk(inner, outer, start, sweep)`</dt>
  <dd>Creates a circular ring, of radius `outer` with a hole of radius `inner`, starting at `start` degrees and sweeping `sweep` degrees.</dd>
  <dt>`Meshes.createDisk(inner, outer)`</dt>
  <dd>Same as calling `createPartialDisk` with `start` 0 and `sweep` 360.</dd>
</dl>

For more information on meshes, see <a href="http://www.codeproject.com/Tips/987914/Creating-shapes-using-the-Public-Domain-HTML-D-Lib">_Creating shapes using the Public Domain HTML 3D Library_</a>.
### Shapes <a id=Shapes></a>

Once a mesh is created, it needs to be added to the 3D scene in order to be rendered. Use the 3D scene&#39;s `makeShape()` method to convert the mesh to a shape. Now you can set the shape&#39;s properties such as color, size, and position. Then, call `addShape()` to add the shape to the 3D scene.

```
  // Create a shape based on the mesh
  var shape=scene.makeShape(mesh);
  // Make it red (you can also use the HTML color string
  // "#FF0000" instead)
  shape.setColor("red");
  // Move it 1 unit along the X axis
  shape.setPosition(1,0,0);
  // Add the shape to the scene
  scene.addShape(shape);
```

The appearance of a 3D shape is known in the 3D graphics world as a "material". It includes textures (images), colors, and light reflection parameters. The <a href="http://peteroupc.github.io/html3dutil/glutil.Material.html">`Material`</a> class holds data on some of these parameters, and is part of the definition of a shape.

Here are details on some of the `Shape` class&#39;s methods.
<dl>
  <dt>`<i>shape</i>.setPosition(x, y, z)`</dt>
  <dd>Sets the shape&#39;s position to the given coordinates.</dd>
  <dt>`<i>shape</i>.setScale(x, y, z)`</dt>
  <dd>Sets the shape&#39;s scaling along the x, y, and z axes. Examples: (1, 1, 1) means no scaling, (2, 1, 1) means a doubled width, (1, 1, 0.5) means a halved depth.</dd>
  <dt>`<i>shape</i>.getTransform().setOrientation(angle, x, y, z)`</dt>
  <dd>Sets the shape&#39;s rotation given an angle in degrees, and an axis of rotation (the x, y, and z parameters). Example: (40, 1, 0, 0) means a 40-degree rotation around the X axis (x is 1 in the axis of rotation).</dd>
  <dt>`<i>shape</i>.setColor(color)`</dt>
  <dd>Gives the shape a particular color. `color` can be an HTML color ("#ff0000"), CSS color ("red"), RGB color("rgb(20, 30, 40)") or HSL color("hsl(20, 50%, 50%)"), or a set of values from 0 to 1 (example: `[1.0,0.5,0.0]`).</dd>
  <dt>`<i>shape</i>.setTexture(name)`</dt>
  <dd>Gives the shape a particular texture, with the URL `name`. The texture should be in the same origin as the Web page (which usually means the same directory).</dd>
  <dt>`<i>shape</i>.copy()`</dt>
  <dd>Creates a copy of this shape. Can be more efficient than calling `scene.makeShape` if the same geometric mesh will be used more than once in the same 3D scene, with different positions and attributes.</dd>
</dl>

### The Render Loop <a id=The_Render_Loop></a>

An important part of a 3D application is the render loop. The render loop is a block of code that is called many times a second (or many "frames" a second) to redraw the 3D scene. Each frame, the state of the application is updated, and the 3D scene is re-rendered to account for that state. To render a scene, use the `Scene3D.render()` method.&nbsp; Render loops are created using the `GLUtil.renderLoop()` method. Here is an example of a render loop.

```
  // Set up the render loop
  GLUtil.renderLoop(function(time){
   // This will be called once each frame.
   // Here, we render the scene
   scene.render();
  });
```

The render loop method takes a parameter (here "time"), containing the number of milliseconds since the page was started.&nbsp; This can be used to implement frame-rate independent animations.
## A Skeleton for 3D Apps <a id=A_Skeleton_for_3D_Apps></a>

The following is a minimal skeleton you can use for writing HTML apps using this library.

    <meta charset=utf-8>
    <head>
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

* <a href="https://peteroupc.github.io/html3dutil/simple.html">simple.html</a> - A simple demo using this library
* <a href="https://peteroupc.github.io/html3dutil/squares.html">squares.html</a> - Demonstrates shader-based filters
* <a href="https://peteroupc.github.io/html3dutil/compositeMesh.html">compositeMesh.html</a> - Demonstrates combining multiple meshes (3D models) into one
* <a href="https://peteroupc.github.io/html3dutil/shapes.html">shapes.html</a> - Demonstrates the built-in shapes
* <a href="https://peteroupc.github.io/html3dutil/platonic.html">platonic.html</a> - A demo featuring the five platonic solids. Demonstrates how vertex and index arrays are built up to create geometric meshes
* <a href="https://peteroupc.github.io/html3dutil/selfpulse.html">selfpulse.html</a> - Demonstrates a rotating, pulsating box.
* <a href="https://peteroupc.github.io/html3dutil/surfaces.html">surfaces.html</a> - Demonstrates using evaluators to generate parametric surfaces.
* <a href="https://peteroupc.github.io/html3dutil/stl.html">stl.html</a> - Demonstrates loading 3D models.
* <a href="https://peteroupc.github.io/html3dutil/textured.html">textured.html</a> - Demonstrates loading textures and applying them to 3D shapes.
* <a href="https://peteroupc.github.io/html3dutil/tris.html">tris.html</a> - Demonstrates a particle system
* <a href="https://peteroupc.github.io/html3dutil/gradient.html">gradient.html</a> - Demonstrates generating a custom texture -- a linear gradient from one color to another.
* <a href="https://peteroupc.github.io/html3dutil/starfield.html">starfield.html</a> - Demo of a star field.

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
      var shape=scene.makeShape(mesh).setColor("red");
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

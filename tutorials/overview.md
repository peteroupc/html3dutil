This is an overview of most of the JavaScript classes available in this library.

### List of Classes

* GLMath - Contains math methods useful in 3D applications, such as matrices and vectors.
* GLUtil - Contains various utility methods in the HTML 3D Library.
* Mesh - Represents a 3D model
* Meshes - Generates built-in 3D models
* Material, Texture - Represents textures and colors for a 3D object&#39;s appearance
* Lights, LightSource - Represents light sources
* Scene3D - Represents a 3D scene
* BufferedMesh - Represents a 3D model as vertex buffer objects
* FrameBuffer - Represents a frame buffer object
* ShaderProgram - Represents a GLSL shader program
* Shape - Represents an instance of a 3D shape with its own transform and appearance.
* BezierCurve, BezierSurface, CurveEval, SurfaceEval - Supports generating parametric curves and surfaces

### Scene3D

The Scene3D class represents a so-called "scene graph". It holds every 3D object which will be drawn to the screen, as well as the camera's projection, the camera's position, and light sources to illuminate the 3D scene, among many other things.

To create a Scene3D, you first need to find the HTML canvas in your JavaScript, then you need to pass it to `new Scene3D()`. Once you do so, Scene3D will use that canvas to draw all 3D objects it receives. Here is an example.

```
  // Find the HTML canvas with the ID "canvas".
  var canvas=document.getElementById("canvas")
  // Create a 3D scene using that canvas.
  var scene=new Scene3D(canvas);
```

### The "Camera"

The Scene3D class has a concept of a "projection transform" and a "view transform". If we use the concept of a "camera", the projection is like setting the camera's focus and lens, and the view transform is like setting its position and orientation. Scene3D has methods for setting all these attributes of this abstract "camera". Two of them are `setPerspective()` and `setLookAt()`, which are shown in the example below.

```
  // Set the perspective view.  Camera has a 45-degree field of view
  // and will see objects from 0.1 to 100 units away.
  scene.setPerspective(45,scene.getAspect(),0.1,100);
  // Move the camera back 40 units.
  scene.setLookAt([0,0,40]);
  // Move the camera back 30 units instead, and turn it so it
  // points at (0, 2, 0), that is, up 2 units.
  scene.setLookAt([0,0,30], [0,2,0]);
```

For more information, see the {@tutorial camera} tutorial.

### 3D Models

Every 3D scene is made up of "meshes", or the triangles, lines, and points that make up a geometric three-dimensional object. Meshes can be simple, such as a cube, or very complex, such as a town model complete with houses. You create a mesh using the `Mesh` class, or create a built-in geometric shape using a method in the `Meshes` class. The example below shows how you can create a box mesh:

```
  // Create a box mesh 10 units in width, 20 units
  // in height, and 25 units in depth
  var mesh=Meshes.createBox(10,20,25);
```

Here are some other built-in mesh methods. This article doesn't explain all the features or parameters in the Meshes class; for that, see the <a href="http://peteroupc.github.io/html3dutil/glutil.Meshes.html">Meshes API documentation</a>.

<dl>
	<dt>Meshes.createSphere(radius)</dt>
	<dd>Creates a sphere with the given `radius`.</dd>
	<dt>Meshes.createCylinder(base, top, height)</dt>
	<dd>Creates a cylinder with the given `base` radius, `top` radius, and `height`. Can be used to create a cone if `base` or `top` is 0.</dd>
	<dt>Meshes.createClosedCylinder(base, top, height)</dt>
	<dd>Like `createCylinder`, except it also covers the base and top.</dd>
	<dt>Meshes.createPartialDisk(inner, outer, start, sweep)</dt>
	<dd>Creates a circular ring, of radius `outer` with a hole of radius
  `inner`, starting at `start` degrees and
  sweeping `sweep` degrees.</dd>
  <dt>Meshes.createDisk(inner, outer)</dt>
	<dd>Same as calling `createPartialDisk` with `start` 0 and
  `sweep` 360.</dd>
</dl>

For more information, see the {@tutorial shapes} tutorial.

### Shapes

Once a mesh is created, it needs to be added to the 3D scene in order to be rendered. Use the 3D scene's `makeShape()` method to convert the mesh to a shape. Now you can set the shape's properties such as color, size, and position. Then, call `addShape()` to add the shape to the 3D scene.

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

Here are details on some of the Shape class's methods.

<dl>
	<dt><i>shape</i>.setPosition(x, y, z)</dt>
	<dd>Sets the shape's position to the given coordinates.</dd>
	<dt><i>shape</i>.setScale(x, y, z)</dt>
	<dd>Sets the shape's scaling along the x, y, and z axes. Examples: (1, 1, 1) means
  no scaling, (2, 1, 1) means a doubled width, (1, 1, 0.5) means a halved depth.</dt>
	<dt><i>shape</i>.getTransform().setOrientation(angle, x, y, z)</dd>
	<dd>Sets the shape's rotation given an angle in degrees, and an axis of rotation (the x, y, and z parameters).
  Example: (40, 1, 0, 0) means a 40-degree rotation around the X axis (x is 1 in the axis of rotation).</dd>
	<dt><i>shape</i>.setColor(color)</dt>
	<dd>Gives the shape a particular color.  `color` can be an HTML color ("#ff0000"),
  CSS color ("red"), RGB color("rgb(20, 30, 40)") or HSL color("hsl(20, 50%, 50%)"), or a set
  of values from 0 to 1 (example: `[1.0,0.5,0.0]`).</dd>
  <dt><i>shape</i>.setTexture(name)</dt>
	<dd>Gives the shape a particular texture, with the URL `name`.
  The texture should be in the same origin as the Web page (which usually means the same directory).</dd>
	<dt><i>shape</i>.copy()</dt>
	<dd>Creates a copy of this shape.  Can be more efficient than calling `scene.makeShape`
  if the same geometric mesh will be used more than once in the same 3D scene,
  with different positions and attributes.</dd>
</dl>

### The Render Loop

An important part of a 3D application is the render loop. The render loop is a block of code that is called many times a second (or many "frames" a second) to redraw the 3D scene. Each frame, the state of the application is updated, and the 3D scene is re-rendered to account for that state. To render a scene, use the `Scene3D.render()` method. Render loops are created using the `GLUtil.renderLoop()` method. Here is an example of a render loop.

```
  // Set up the render loop
  GLUtil.renderLoop(function(){
   // This will be called once each frame.
   // Here, we render the scene
   scene.render();
  });
```

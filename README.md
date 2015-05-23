HTML 3D Utility Library
====

**Download source code: [ZIP file](https://github.com/peteroupc/html3dutil/archive/master.zip)**

If you like this software, consider donating to me at this link: [http://upokecenter.dreamhosters.com/articles/donate-now-2/](http://upokecenter.dreamhosters.com/articles/donate-now-2/)

----

A public domain JavaScript library for easing the development of HTML 3D applications.

* Source code is available in the [project page](https://github.com/peteroupc/html3dutil).
* API documentation is found at: [https://peteroupc.github.io/html3dutil](https://peteroupc.github.io/html3dutil)

The file "glutil_min.js" is a minified single-file version of the library.  Include it in your HTML
as follows:

```html
  <script type="text/javascript" src="glutil_min.js"></script>
```

Overview
---------

For detailed instructions on using this library and a summary of the library's features, visit:

[https://peteroupc.github.io/html3dutil/tutorial-overview.html](https://peteroupc.github.io/html3dutil/tutorial-overview.html)

Demos
---------
* [demos/simple.html](https://peteroupc.github.io/html3dutil/demos/simple.html) - A simple demo using this library.
* [demos/squares.html](https://peteroupc.github.io/html3dutil/demos/squares.html) - Demonstrates shader-based filters.
* [demos/compositeMesh.html](https://peteroupc.github.io/html3dutil/demos/compositeMesh.html) - Demonstrates
combining multiple meshes into one.
* [demos/shapes.html](https://peteroupc.github.io/html3dutil/demos/shapes.html) - Demonstrates
the built-in shapes.
* [demos/builtinshapes.html](https://peteroupc.github.io/html3dutil/demos/builtinshapes.html) - Interactive demo of
the built-in shapes.
* [demos/clock.html](https://peteroupc.github.io/html3dutil/demos/clock.html) - A demo
featuring a wall clock.
* [demos/obj.html](https://peteroupc.github.io/html3dutil/demos/obj.html) - An object file loader.
* [demos/platonic.html](https://peteroupc.github.io/html3dutil/demos/platonic.html) - A demo featuring the five
platonic solids.  Demonstrates how vertex and index arrays are built up to create geometric meshes.
* [demos/selfpulse.html](https://peteroupc.github.io/html3dutil/demos/selfpulse.html) - Demonstrates
a rotating, pulsating box.
* [demos/surfaces.html](https://peteroupc.github.io/html3dutil/demos/surfaces.html) - Demonstrates
using evaluators to generate parametric surfaces.
* [demos/surfaces2d.html](https://peteroupc.github.io/html3dutil/demos/surfaces2d.html) - Same as the surfaces.html
demo, but uses an experimental renderer using the HTML 2D Canvas instead of an HTML 3D context.  Only a limited
set of features are currently supported.
* [demos/surfacesexpr.html](https://peteroupc.github.io/html3dutil/demos/surfacesexpr.html) - Demonstrates
parametric surfaces, with a custom formula editor.
* [demos/stl.html](https://peteroupc.github.io/html3dutil/demos/stl.html) - Demonstrates loading 3D models.
* [demos/textured.html](https://peteroupc.github.io/html3dutil/demos/textured.html) - Demonstrates loading textures
and applying them to 3D shapes.
* [demos/triangle.html](https://peteroupc.github.io/html3dutil/demos/triangle.html) - Demonstrates drawing a triangle.
* [demos/tris.html](https://peteroupc.github.io/html3dutil/demos/tris.html) - Demonstrates a particle system.
* [demos/gradient.html](https://peteroupc.github.io/html3dutil/demos/gradient.html) - Demonstrates generating a custom
texture -- a linear gradient from one color to another.
* [demos/starfield.html](https://peteroupc.github.io/html3dutil/demos/starfield.html) - Demo of a star field.
* [demos/perspective.html](https://peteroupc.github.io/html3dutil/demos/perspective.html) - Demonstrates a perspective projection.

Other Sites
--------
* CodePlex: [https://html3dutil.codeplex.com/](https://html3dutil.codeplex.com/)
* Code Project: [http://www.codeproject.com/Tips/896839/Public-Domain-HTML-ThreeD-Library](http://www.codeproject.com/Tips/896839/Public-Domain-HTML-ThreeD-Library)
* SourceForge: [https://sourceforge.net/p/html3dutil](https://sourceforge.net/p/html3dutil)

Examples
---------
```javascript
  // Create the 3D scene; find the HTML canvas and pass it
  // to Scene3D.
  var scene=new Scene3D(document.getElementById("canvas"));
  // Create a box mesh 10 units in width, 20 units
  // in height, and 20 units in depth
  var mesh=Meshes.createBox(10,10,10);
  // Create a shape based on the mesh and give it a red color
  var shape=scene.makeShape(mesh).setColor("red");
  // Add the shape to the scene
  scene.addShape(shape);
  // Create a timer
  var timer={};
  // Set up the render loop
  GLUtil.renderLoop(function(time){
   // Set the perspective view.  Camera has a 45-degree field of view
   // and will see objects from 0.1 to 100 units away.
   scene.setPerspective(45,scene.getClientAspect(),0.1,100);
   // Move the camera back 40 units.
   scene.setLookAt([0,0,40]);
   // Update the shape's rotation
   var q=GLMath.quatFromTaitBryan(
     360*GLUtil.getTimePosition(timer,time,6000),
     360*GLUtil.getTimePosition(timer,time,12000),
     0
   );
   shape.setQuaternion(q);
   // Render the scene
   scene.render();
  });
```

History
---------

Version 1.3.1:

- Fixed touch events in some of the interactive demos
- Fixed issues with BezierCurve, BezierSurface
- Robustness improvement in autonormal feature of SurfaceEval
- Correctness and other fixes

Version 1.3:

- Camera class rewritten again, but backwards compatible with
version 1.0
- Add vec3add, vec3sub, vec3copy, vec3assign, vec4assign methods
to GLMath
- Fix quatInvert method and optimize mat4inverseTranspose
method of GLMath
- Add reverseNormals method to GLMath
- Add createCanvasElement, getTimePosition, and newFrames methods to GLUtil
- Deprecate createCanvas method of GLUtil
- Improve renderLoop method of GLUtil
- Improved specular highlights
- Allow coordinate arrays in vertex2 and vertex3 methods of Mesh class
- Resolve some autonormal degenerate cases in SurfaceEval class
- Add getCount method to Lights class
- Add face culling, auto resize, and pixel depth methods to Scene3D class
- Add getClientAspect method to Scene3D class
- Other fixes and improvements

Version 1.2.1:

- Fix bug that occurs when a shape derived from a mesh that defines its own
colors is drawn before a shape derived from a mesh that doesn't define its own colors

Version 1.2:

- Support TGA textures
- Camera class rewritten and support added for the mouse wheel
and middle mouse button
- Lines and points supported in OBJ files
- Support loading custom textures from byte arrays
- Add method to create capsule shapes in Meshes class
- Mesh builder (vector3 method) avoids adding degenerate triangles
- Optimizations and bug fixes

Version 1.1:

- Add frame.js, a frame counter helper used in some of the demos
- Add quatInvert method to the GLMath class
- Fix texture mapping bugs
- Expand use of the color3 method of the Mesh class
- Optimize setUniforms method of the ShaderProgram class
- Add movePosition method of the Transform class
- New methods in the ShapeGroup and Scene3D classes
- Bug fixes

Version 1.0:

- Adds setOrtho2DAspect and setOrthoAspect methods to Scene3D
- Adds mat4TransposeInPlace method and two constants to GLMath
- Renames fromEuler and toEuler methods in GLMath to fromTaitBryan
 and toTaitBryan
- Modifies the Lights class
- Allows alpha component in material diffuse
- Optimizes setting uniforms in shader programs
- Adds vertex2 method to Mesh class
- New classes: Transform and ShapeGroup
- Most methods that affect transforms removed, and their functionality
  now uses a new getTransform method and the Transform class
- Bug fixes

Version 0.2:

- First Code Project release

About
-----------

Written in 2015 by Peter O.

Any copyright is dedicated to the Public Domain.
[http://creativecommons.org/publicdomain/zero/1.0/](http://creativecommons.org/publicdomain/zero/1.0/)

If you like this, you should donate to Peter O.
at: [http://upokecenter.dreamhosters.com/articles/donate-now-2/](http://upokecenter.dreamhosters.com/articles/donate-now-2/)

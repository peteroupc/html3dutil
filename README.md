HTML 3D Utility Library
====

**Download source code: [ZIP file](https://github.com/peteroupc/html3dutil/archive/master.zip)**

If you like this software, consider donating to me at this link: [http://upokecenter.dreamhosters.com/articles/donate-now-2/](http://upokecenter.dreamhosters.com/articles/donate-now-2/)

----

A public domain JavaScript library for easing the development of HTML 3D applications.

API documentation is found at: [https://peteroupc.github.io/html3dutil](https://peteroupc.github.io/html3dutil)

The file "glutil_min.js" is a minified single-file version of the library.  Include it in your HTML
as follows:

```html
  <script type="text/javascript" src="glutil_min.js"></script>
```

Overview
---------

[https://peteroupc.github.io/html3dutil/tutorial-overview.html](https://peteroupc.github.io/html3dutil/tutorial-overview.html)

Demos
---------
* [simple.html](https://peteroupc.github.io/html3dutil/simple.html) - A simple demo using this library.
* [squares.html](https://peteroupc.github.io/html3dutil/squares.html) - Demonstrates shader-based filters.
* [compositeMesh.html](https://peteroupc.github.io/html3dutil/compositeMesh.html) - Demonstrates
combining multiple meshes into one.
* [shapes.html](https://peteroupc.github.io/html3dutil/shapes.html) - Demonstrates
the built-in shapes.
* [platonic.html](https://peteroupc.github.io/html3dutil/platonic.html) - A demo featuring the five
platonic solids.  Demonstrates how vertex and index arrays are built up to create geometric meshes.
* [selfpulse.html](https://peteroupc.github.io/html3dutil/selfpulse.html) - Demonstrates
a rotating, pulsating box.
* [surfaces.html](https://peteroupc.github.io/html3dutil/surfaces.html) - Demonstrates
using evaluators to generate parametric surfaces.
* [stl.html](https://peteroupc.github.io/html3dutil/stl.html) - Demonstrates loading 3D models.

Examples
---------
```javascript
  // Create the 3D scene; find the HTML canvas and pass it
  // to Scene3D.
  var scene=new Scene3D(document.getElementById("canvas"));
  // Set the perspective view.  Camera has a 45-degree field of view
  // and will see objects from 0.1 to 100 units away.
  scene.setPerspective(45,scene.getAspect(),0.1,100);
  // Move the camera back 40 units.
  scene.setLookAt([0,0,40]);
  // Create a box mesh 10 units in width, 20 units
  // in height, and 20 units in depth
  var mesh=Meshes.createBox(10,10,10);
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
   // Update the shape's rotation
   shape.setQuaternion(GLMath.quatFromTaitBryan(rotation));
   // Render the scene
   scene.render();
  });
```

Source Code
---------
Source code is available in the [project page](https://github.com/peteroupc/html3dutil).

About
-----------

Written in 2015 by Peter O.

Any copyright is dedicated to the Public Domain.
[http://creativecommons.org/publicdomain/zero/1.0/](http://creativecommons.org/publicdomain/zero/1.0/)

If you like this, you should donate to Peter O.
at: [http://upokecenter.dreamhosters.com/articles/donate-now-2/](http://upokecenter.dreamhosters.com/articles/donate-now-2/)

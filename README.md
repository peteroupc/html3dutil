HTML 3D Utility Library
====

If you like this software, consider donating to me at this link: [http://upokecenter.dreamhosters.com/articles/donate-now-2/](http://upokecenter.dreamhosters.com/articles/donate-now-2/)

----

A public domain JavaScript library for easing the development of WebGL applications.

API documentation is found at: [https://peteroupc.github.io/html3dutil](https://peteroupc.github.io/html3dutil)

The file "glutil_min.js" is a minified single-file version of the library.

Demos
---------
* [squares.html](https://peteroupc.github.io/html3dutil/squares.html) - Demonstrates shader-based filters.

Examples
---------
```javascript
  // Create the 3D scene; find the HTML canvas and pass it
  // to Scene3D.
  var scene=new Scene3D(document.getElementById("canvas"));
  // Set lighting, here located at the positive Z-axis, where the viewer
  // is found, so it will shine directly on objects on the screen.
  scene.setDirectionalLightByPos(0,[0,0,1]);
  // Set the perspective view.  Camera has a 45-degree field of view
  // and will see objects from 0.1 to 100 units away.
  scene.setPerspective(45,scene.getAspect(),0.1,100);
  // Move the camera back 40 units.
  scene.setLookAt([0,0,40]);
  // Create a box mesh 10 units in size
  var mesh=GLUtil.createBox(10,10,10);
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
   // Update the shape's rotation
   shape.setRotation(rotation);
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

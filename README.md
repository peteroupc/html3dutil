HTML 3D Utility Library
====

**Download source code: [ZIP file](https://github.com/peteroupc/html3dutil/archive/master.zip)**

If you like this software, consider donating to me at this link: [http://peteroupc.github.io/](http://peteroupc.github.io/)

----

A public domain JavaScript library for easing the development of HTML 3D applications.

API documentation is found at: [https://peteroupc.github.io/html3dutil](https://peteroupc.github.io/html3dutil)
or [https://github.com/peteroupc/html3dutil/blob/master/doc/index.md](https://github.com/peteroupc/html3dutil/blob/master/doc/index.md).

The file "h3du_min.js" is a minified single-file version of the library.  Include it in your HTML
as follows:

```html
  <script type="text/javascript" src="h3du_min.js"></script>
```

Source Code and Building
---------

Source code is available in the [project page](https://github.com/peteroupc/html3dutil).

To build, you will need a Java runtime environment, Ruby, and a JavaScript environment
that supports `npm`.

* Put `compiler.jar` (the JAR file for the Closure Compiler) in the `build` directory.
* Install [JSDoc](https://github.com/jsdoc3/jsdoc) via `npm`.
* Run the Ruby script `build.js`. This will generate the documentation and compile
the library's source code into a single file called `h3du_min.js`.

Overview and Demos
---------

For a list of demos, as well as detailed instructions on using this library and a summary of the library's features, visit:

[https://peteroupc.github.io/html3dutil/tutorial-overview.html](https://peteroupc.github.io/html3dutil/tutorial-overview.html)

Other Sites
--------
* CodePlex: [https://html3dutil.codeplex.com/](https://html3dutil.codeplex.com/)
* Code Project: [http://www.codeproject.com/Tips/896839/Public-Domain-HTML-ThreeD-Library](http://www.codeproject.com/Tips/896839/Public-Domain-HTML-ThreeD-Library)
* SourceForge: [https://sourceforge.net/p/html3dutil](https://sourceforge.net/p/html3dutil)

Example
---------
```javascript
  // Create the 3D scene; find the HTML canvas and pass it
  // to Scene3D.
  var scene=new H3DU.Scene3D(document.getElementById("canvas"));
  var sub=new H3DU.Batch3D()
   // Set the perspective view.  Camera has a 45-degree field of view
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
   var q=H3DU.Math.quatFromTaitBryan(
     360 * H3DU.getTimePosition(timer,time,6000),
     360 * H3DU.getTimePosition(timer,time,12000),
     0
   );
   shape.setQuaternion(q);
   // Render the scene
   scene.render(sub);
  });
```

History
---------

See [the history page](https://peteroupc.github.io/html3dutil/tutorial-history.html) to find
information about what has changed in this library.

About
-----------

Any copyright is dedicated to the Public Domain.
[http://creativecommons.org/publicdomain/zero/1.0/](http://creativecommons.org/publicdomain/zero/1.0/)

If you like this, you should donate to Peter O. (original author of
the Public Domain HTML 3D Library) at:
[http://peteroupc.github.io/](http://peteroupc.github.io/)

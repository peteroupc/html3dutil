# Documentation Index

* <a href="Camera.md">Camera</a>
* <a href="CurveTube.md">CurveTube</a>
* <a href="Epitrochoid.md">Epitrochoid</a>
* <a href="FrameCounter.md">FrameCounter</a>
* <a href="FrameCounterDiv.md">FrameCounterDiv</a>
* <a href="GraphicsPath.md">GraphicsPath</a>
* <a href="H3DU.md">H3DU</a>
* <a href="H3DU.BSplineCurve.md">H3DU.BSplineCurve</a>
* <a href="H3DU.BSplineSurface.md">H3DU.BSplineSurface</a>
* <a href="H3DU.Batch3D.md">H3DU.Batch3D</a>
* <a href="H3DU.BezierCurve.md">H3DU.BezierCurve</a>
* <a href="H3DU.BezierSurface.md">H3DU.BezierSurface</a>
* <a href="H3DU.BufferedMesh.md">H3DU.BufferedMesh</a>
* <a href="H3DU.CurveEval.md">H3DU.CurveEval</a>
* <a href="H3DU.FrameBuffer.md">H3DU.FrameBuffer</a>
* <a href="H3DU.FrameBufferInfo.md">H3DU.FrameBufferInfo</a>
* <a href="H3DU.LightSource.md">H3DU.LightSource</a>
* <a href="H3DU.Lights.md">H3DU.Lights</a>
* <a href="H3DU.Material.md">H3DU.Material</a>
* <a href="H3DU.Math.md">H3DU.Math</a>
* <a href="H3DU.MatrixStack.md">H3DU.MatrixStack</a>
* <a href="H3DU.Mesh.md">H3DU.Mesh</a>
* <a href="H3DU.MeshBuffer.md">H3DU.MeshBuffer</a>
* <a href="H3DU.Meshes.md">H3DU.Meshes</a>
* <a href="H3DU.RenderPass3D.md">H3DU.RenderPass3D</a>
* <a href="H3DU.Scene3D.md">H3DU.Scene3D</a>
* <a href="H3DU.ShaderInfo.md">H3DU.ShaderInfo</a>
* <a href="H3DU.ShaderProgram.md">H3DU.ShaderProgram</a>
* <a href="H3DU.Shape.md">H3DU.Shape</a>
* <a href="H3DU.ShapeGroup.md">H3DU.ShapeGroup</a>
* <a href="H3DU.SurfaceEval.md">H3DU.SurfaceEval</a>
* <a href="H3DU.TextFont.md">H3DU.TextFont</a>
* <a href="H3DU.Texture.md">H3DU.Texture</a>
* <a href="H3DU.TextureAtlas.md">H3DU.TextureAtlas</a>
* <a href="H3DU.TextureLoader.md">H3DU.TextureLoader</a>
* <a href="H3DU.Transform.md">H3DU.Transform</a>
* <a href="Hypotrochoid.md">Hypotrochoid</a>
* <a href="InputTracker.md">InputTracker</a>
* <a href="MeshJSON.md">MeshJSON</a>
* <a href="ObjData.md">ObjData</a>
* <a href="PrimitiveCounter.md">PrimitiveCounter</a>
* <a href="Promise.md">Promise</a>
* <a href="SurfaceOfRevolution.md">SurfaceOfRevolution</a>
* <a href="Trochoid.md">Trochoid</a>

## Tutorials

* <a href="tutorial-camera.md">The "Camera" and the Projection and View Transforms</a>
* <a href="tutorial-colors.md">Color Strings</a>
* <a href="tutorial-filters.md">Graphics Filters</a>
* <a href="tutorial-glmath.md">H3DU's Math Functions</a>
* <a href="tutorial-history.md">Older Version History</a>
* <a href="tutorial-matrixdetails.md">Matrix Details</a>
* <a href="tutorial-meshexamples.md">Examples of Creating Meshes on the Fly</a>
* <a href="tutorial-overview.md">Library Overview</a>
* <a href="tutorial-paths.md">2-Dimensional Graphics Paths</a>
* <a href="tutorial-shapes.md">Creating Shapes</a>
* <a href="tutorial-surfaces.md">Parametric Curves and Parametric Surfaces</a>
* <a href="tutorial-textures.md">Texture Examples</a>

## Read Me

<h1>HTML 3D Utility Library</h1><p><strong>Download source code: <a href="https://github.com/peteroupc/html3dutil/archive/master.zip">ZIP file</a></strong></p>
<p>If you like this software, consider donating to me at this link: <a href="http://peteroupc.github.io/">http://peteroupc.github.io/</a></p>
<hr>
<p>A public domain JavaScript library for easing the development of HTML 3D applications.</p>
<p>API documentation is found at: <a href="https://peteroupc.github.io/html3dutil">https://peteroupc.github.io/html3dutil</a>
or <a href="https://github.com/peteroupc/html3dutil/blob/master/doc/index.md">https://github.com/peteroupc/html3dutil/blob/master/doc/index.md</a>.</p>
<p>The file &quot;h3du_min.js&quot; is a minified single-file version of the library.  Include it in your HTML
as follows:</p>
<pre class="prettyprint source lang-html"><code>  &lt;script type=&quot;text/javascript&quot; src=&quot;h3du_min.js&quot;>&lt;/script></code></pre><h2>Source Code and Building</h2><p>Source code is available in the <a href="https://github.com/peteroupc/html3dutil">project page</a>.</p>
<p>To build, you will need a Java runtime environment, Ruby, and a JavaScript environment
that supports <code>npm</code>.  </p>
<ul>
<li>Put <code>compiler.jar</code> (the JAR file for the Closure Compiler) in the <code>build</code> directory.</li>
<li>Install <a href="https://github.com/jsdoc3/jsdoc">JSDoc</a> via <code>npm</code>.</li>
<li>Run the Ruby script <code>build.js</code>. This will generate the documentation and compile
the library's source code into a single file called <code>h3du_min.js</code>. </li>
</ul>
<h2>Overview and Demos</h2><p>For a list of demos, as well as detailed instructions on using this library and a summary of the library's features, visit:</p>
<p><a href="https://peteroupc.github.io/html3dutil/tutorial-overview.html">https://peteroupc.github.io/html3dutil/tutorial-overview.html</a></p>
<h2>Other Sites</h2><ul>
<li>CodePlex: <a href="https://html3dutil.codeplex.com/">https://html3dutil.codeplex.com/</a></li>
<li>Code Project: <a href="http://www.codeproject.com/Tips/896839/Public-Domain-HTML-ThreeD-Library">http://www.codeproject.com/Tips/896839/Public-Domain-HTML-ThreeD-Library</a></li>
<li>SourceForge: <a href="https://sourceforge.net/p/html3dutil">https://sourceforge.net/p/html3dutil</a></li>
</ul>
<h2>Example</h2><pre class="prettyprint source lang-javascript"><code>  // Create the 3D scene; find the HTML canvas and pass it
  // to Scene3D.
  var scene=new H3DU.Scene3D(document.getElementById(&quot;canvas&quot;));
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
  var shape=new H3DU.Shape(mesh).setColor(&quot;red&quot;);
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
  });</code></pre><h2>History</h2><p>See <a href="https://peteroupc.github.io/html3dutil/tutorial-history.html">the history page</a> to find
information about what has changed in this library.</p>
<h2>About</h2><p>Written in 2015-2016 by Peter O.</p>
<p>Any copyright is dedicated to the Public Domain.
<a href="http://creativecommons.org/publicdomain/zero/1.0/">http://creativecommons.org/publicdomain/zero/1.0/</a></p>
<p>If you like this, you should donate to Peter O.
at: <a href="http://peteroupc.github.io/">http://peteroupc.github.io/</a></p>

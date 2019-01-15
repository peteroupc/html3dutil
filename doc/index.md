# Documentation Index

* <a href="DrawingToy.md">DrawingToy</a><br>Generates curves similar to those possible using commercially available drawing toys containing gear-toothed rings and wheels.
* <a href="Epitrochoid.md">Epitrochoid</a><br>A curve evaluator object for a curve drawn by a circle that rolls along the outside
of another circle, whose position is fixed, with a center of (0,0).
* [Global Members](Global.md)
* <a href="H3DU.md">H3DU</a><br>This is a library with classes and methods that were formerly in the Public Domain HTML 3D Library.
* <a href="H3DU.BSplineCurve.md">H3DU.BSplineCurve</a><br>A curve evaluator object for a B-spline (basis spline) curve.
* <a href="H3DU.BSplineSurface.md">H3DU.BSplineSurface</a><br>A surface evaluator object for a B-spline (basis spline) surface,
whose edges are made up of B-spline curves.
* <a href="H3DU.BufferAccessor.md">H3DU.BufferAccessor</a><br>A <b>vertex attribute object</b>.
* <a href="H3DU.Curve.md">H3DU.Curve</a><br>A curve evaluator object for a parametric curve.
* <a href="H3DU.CurveBuilder.md">H3DU.CurveBuilder</a><br>An evaluator of curve evaluator objects for generating
vertex attributes for a curve.
* <a href="H3DU.CurveTube.md">H3DU.CurveTube</a><br>A <a href="H3DU.Surface.md">surface evaluator object</a> for a tube extruded from a parametric curve.
* <a href="H3DU.GraphicsPath.md">H3DU.GraphicsPath</a><br>Represents a two-dimensional path.
* <a href="H3DU.MathUtil.md">H3DU.MathUtil</a><br>A collection of math functions for working
with vectors, matrices, quaternions, and other
mathematical objects.
* <a href="H3DU.MeshBuffer.md">H3DU.MeshBuffer</a><br>A geometric mesh in the form of buffer objects.
* <a href="H3DU.Meshes.md">H3DU.Meshes</a><br>Contains methods that create meshes
of various geometric shapes and solids.
* <a href="H3DU.PiecewiseCurve.md">H3DU.PiecewiseCurve</a><br>A curve evaluator object for a curve
made up of one or more individual curves.
* <a href="H3DU.Shape.md">H3DU.Shape</a><br>An object that associates a geometric mesh (the shape of the object) with
material data (which defines what is seen on the object's surface)
and a transformation matrix (which defines the object's position and size).
* <a href="H3DU.ShapeGroup.md">H3DU.ShapeGroup</a><br>Represents a grouping of shapes.
* <a href="H3DU.Surface.md">H3DU.Surface</a><br>A surface evaluator object for a parametric surface.
* <a href="H3DU.SurfaceBuilder.md">H3DU.SurfaceBuilder</a><br>An evaluator of surface evaluator objects for generating
vertex attributes for a surface.
* <a href="H3DU.TextFont.md">H3DU.TextFont</a><br>Represents a bitmap font, which supports drawing two-dimensional
text.
* <a href="H3DU.TextureAtlas.md">H3DU.TextureAtlas</a><br>A texture atlas specifies the location and size of images within a single
texture.
* <a href="H3DU.Transform.md">H3DU.Transform</a><br>A class offering a convenient way to set a transformation
from one coordinate system to another.
* <a href="H3DU.exports.Camera.md">H3DU.exports.Camera</a><br>A class for controlling the projection and
view of a 3D scene, in the nature of an abstract "camera".
* <a href="Hypotrochoid.md">Hypotrochoid</a><br>A curve evaluator object for a curve drawn by a circle that rolls along the inside
of another circle, whose position is fixed, with a center of (0,0).
* <a href="InputTracker.md">InputTracker</a><br>A class for tracking key press, mouse, touch, and mouse wheel
events.
* <a href="KleinBottle.md">KleinBottle</a><br>Surface evaluator object for the Klein surface, also known as the "Klein bottle".
* <a href="MatrixStack.md">MatrixStack</a><br>This class implements a stack
of 4x4 transformation matrices.
* <a href="MoebiusStrip.md">MoebiusStrip</a><br>Surface evaluator object for a M&ouml;bius strip.
* <a href="Polyhedra.md">Polyhedra</a><br>Contains helper methods for generating the five platonic solids
and other polyhedra.
* <a href="Promise.md">Promise</a><br>A promise holds a value to be resolved in the future.
* <a href="Semantic.md">Semantic</a><br>Contains constants for assigning semantics
to uniforms and vertex attributes.
* <a href="Superellipsoid.md">Superellipsoid</a><br>TODO: Not documented yet.
* <a href="Supertoroid.md">Supertoroid</a><br>TODO: Not documented yet.
* <a href="SurfaceOfRevolution.md">SurfaceOfRevolution</a><br>A surface evaluator object for a surface of revolution,
which results by revolving a two-dimensional curve around an axis.
* <a href="TorusKnot.md">TorusKnot</a><br>Generates torus knots and torus-knot-like curves.
* <a href="Trochoid.md">Trochoid</a><br>A curve evaluator object for a curve drawn by a circle that rolls along the X axis.

## Tutorials

* [The "Camera" and Geometric Transforms](tutorial-camera.md)
* [Color Strings](tutorial-colors.md)
* [Graphics Filters](tutorial-filters.md)
* [H3DU's Math Functions](tutorial-glmath.md)
* [Older Version History](tutorial-history.md)
* [Matrix Details](tutorial-matrixdetails.md)
* [Examples of Creating Meshes on the Fly](tutorial-meshexamples.md)
* [Library Overview](tutorial-overview.md)
* [Creating Shapes](tutorial-shapes.md)
* [Parametric Curves and Parametric Surfaces](tutorial-surfaces.md)

## Read Me

<h1>Geometry Utilities</h1><p><strong>Download source code: <a href="https://github.com/peteroupc/html3dutil/archive/master.md">ZIP file</a></strong></p>
<p>If you like this software, consider donating to me at this link: <a href="http://peteroupc.github.io/">http://peteroupc.github.io/</a></p>
<hr>
<p>This is a public-domain library with classes and methods that were formerly in the Public Domain HTML 3D Library.  Classes and methods that involved WebGL, shaders, or a 3D scene graph were removed, to make this library much more general-purpose.  In any case, maintaining a 3D scene graph, textures, materials, and shaders is not trivial and is better handled by established 3D engines, such as three.js.  The classes and methods remaining in this library don't assume the existence of a 3D rendering pipeline such as WebGL or OpenGL ES, or even the existence of an HTML DOM, and are thus more easily portable to other programming languages.</p>
<p>(Speaking of OpenGL ES, there are some things supported by some implementations that are strictly not necessary, since they can be implemented with shaders and clever mesh construction.  These things include line primitives, triangle fans, triangle strips, and built-in antialiasing.)</p>
<p>API documentation is found at: <a href="https://peteroupc.github.io/html3dutil">https://peteroupc.github.io/html3dutil</a>
or <a href="https://github.com/peteroupc/html3dutil/blob/master/doc/index.md">https://github.com/peteroupc/html3dutil/blob/master/doc/index.md</a>.</p>
<p>The file &quot;h3du_min.js&quot; is a minified single-file version of the library.  Include it in your HTML
as follows:</p>
<pre class="prettyprint source lang-html"><code>  &lt;script type=&quot;text/javascript&quot; src=&quot;h3du_min.js&quot;>&lt;/script></code></pre><h2>Source Code and Building</h2><p>Source code is available in the <a href="https://github.com/peteroupc/html3dutil">project page</a>.</p>
<p>To build, you will need a Java runtime environment, Ruby, and a JavaScript environment
that supports <code>npm</code>.</p>
<ul>
<li>Put <code>compiler.jar</code> (the JAR file for the Closure Compiler) in the <code>build</code> directory.</li>
<li>Install <a href="https://github.com/jsdoc3/jsdoc">JSDoc</a> and <code>rollup</code> via <code>npm</code>.</li>
<li>Run <code>npm run build</code>. This will generate the documentation and compile
the library's source code into a single file called <code>h3du_min.js</code>.</li>
</ul>
<h2>Overview and Demos</h2><p>For detailed instructions on using this library and a summary of the library's features, visit:</p>
<p><a href="https://peteroupc.github.io/html3dutil/tutorial-overview.html">https://peteroupc.github.io/html3dutil/tutorial-overview.html</a></p>
<h2>History</h2><p>See <a href="https://peteroupc.github.io/html3dutil/tutorial-history.html">the history page</a> to find
information about what has changed in this library.</p>
<h2>Possible Later Improvements</h2><ul>
<li>Support &quot;deg&quot;, &quot;grad&quot;, &quot;rad&quot;, and &quot;turn&quot; in CSS color hue parsing</li>
</ul>
<h2>About</h2><p>Any copyright is dedicated to the Public Domain.
<a href="http://creativecommons.org/publicdomain/zero/1.0/">http://creativecommons.org/publicdomain/zero/1.0/</a></p>
<p>If you like this, you should donate to Peter O. (original author of
the Public Domain HTML 3D Library) at:
<a href="http://peteroupc.github.io/">http://peteroupc.github.io/</a></p>

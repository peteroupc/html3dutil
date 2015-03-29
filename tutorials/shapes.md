Shapes
------------

The HTML 3D library contains several methods for creating built-in shapes such
as cubes, cylinders, and spheres.  They are listed here.

**3D Figures**

* [GLUtil.createBox()]{@link glutil.GLUtil.createBox} - Creates a cube or box.
* [GLUtil.createCylinder()]{@link glutil.GLUtil.createCylinder} - Creates a cylinder or cone, not including the base
  or top.
* [GLUtil.createClosedCylinder()]{@link glutil.GLUtil.createClosedCylinder} - Creates a cylinder or cone, including the base or top.
* [GLUtil.createTorus()]{@link glutil.GLUtil.createTorus} - Creates a torus (doughnut shape).
* [GLUtil.createSphere()]{@link glutil.GLUtil.createSphere} - Creates a sphere.

**2D Figures**

* [GLUtil.createDisk()]{@link glutil.GLUtil.createDisk} - Creates a circular disk or a regular polygon, possibly
  with a hole in the middle.
* [GLUtil.createPartialDisk()]{@link glutil.GLUtil.createPartialDisk} - Creates a portion of circular disk, possibly
  with a hole where the middle of the complete disk would be.
* [GLUtil.createPlane()]{@link glutil.GLUtil.createPlane} - Creates a rectangle.

**Custom Shapes**

Also included is a `Mesh` class for defining shapes not given among the built-in ones.
Shapes can consist of triangles or lines.

There are two ways for specifying shapes:  through the Mesh constructor, or through
methods that specify the mesh's data vertex by vertex.


**The Mesh Constructor**
The Mesh constructor lets you define a shape from a predefined array of vertex data.
Here's how.

(1) Create an array of numbers giving the X, Y, and Z coordinate for each vertex:

    var vertices = [x1, y1, z1, x2, y2, z2, ... ];

If you also specify normals, colors, or texture coordinates for each vertex, you must add
them after each vertex position in that order: normals first, colors second, and texture
coordinates last.  If you don't specify normals, colors, and/or texture coordinates per
vertex, you can omit them.  The following are examples of this:

   var vertices = [
     x1, y1, z1, nx1, ny1, nz1,
     x2, y2, z2, nx2, ny2, nz2,
     ...
   ];
   var vertices = [
     x1, y1, z1, cr1, cg1, cb1, u1, v1,
     x2, y2, z2, cr2, cg2, cb2, u2, v2
     ...
   ];
   
(2) Create a second array of numbers giving the indices to vertices defined in the
previous step:

   var indices = [0, 1, 2, 1, 2, 3, ... ];
   
Each index refers to the (n+1)th vertex, no matter how many array elements each vertex
consists of (a vertex with just coordinates will use 3 array elements).

If you are defining a set of triangles, there should be 3 indices for each triangle,
and if you are defining a set of line segments, there should be 2 indices for each
line segment.

(3) Call the mesh constructor with the vertex and index arrays.

    var bits = Mesh.NORMALS_BIT; // Assumes we used the vertex array with normals
    var mesh = new Mesh(vertices, indices, bits);
    
Note that you must include a set of bits indicating what kind of data the vertex
array contains.  The bits are:

* Mesh.NORMALS_BIT - if you included normals for each vertex (3 elements)
* Mesh.COLORS_BIT - if you included colors for each vertex (3 elements)
* Mesh.TEXCOORDS_BIT - if you included texture coordinates for each vertex (2 elements)
* Mesh.LINES_BIT - if the mesh defines a set of lines rather than triangles

The bits may be combined as in the following example:

   var bits = Mesh.NORMALS_BIT | Mesh.COLORS_BIT;

Alternatively, you can call the Mesh constructor with no parameters:

    var mesh = new Mesh();
    
Doing so will create a mesh with no vertices.

**Vertex Methods**
Alternatively, or in addition, to the method described above, 
you can specify the mesh's shape by calling methods that give each vertex's position and parameters:

(1) Call the `mode()` method and choose a primitive mode, such as `Mesh.TRIANGLES`
or `Mesh.QUAD_STRIP`:

    mesh.mode(Mesh.TRIANGLES);
    
The mesh will build up the shape from the vertices you give it depending on the mesh's 
primitive mode.  For example, QUAD_STRIP defines a strip of connecting quadrilaterals,
and TRIANGLES defines a set of triangles that are not necessarily connected.

(2) Call the `normal3()`, `color3()`, and `texCoord2()` methods, as needed, to set the
next vertex's parameters.  You don't need to do this for each vertex if multiple 
consecutive vertices will share the same normal, color, or texture coordinates.

    mesh.normal3(2, 3, 4); // Set the x, y, and z of the normal.
    
(3) Call the `vertex3()` method to add a new vertex and set its position.  The vertex will
have the last normal, color, and texture coordinates defined on the mesh, if any
were given:

    mesh.vertex(x, y, z);

You can also call the mode() method any time to change the primitive mode, even to
the same mode.  What this does is reset the state of the primitive so that future vertices
won't depend on previous vertices.  For example, if you define a `TRIANGLE_FAN`, and
you call `mesh.mode(Mesh.TRIANGLE_FAN)`, the newly defined `TRIANGLE_FAN` will be
"disconnected" from the previous one as far as the mesh object is concerned.

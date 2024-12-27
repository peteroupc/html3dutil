# module:extras/meshes/convex

[Back to documentation index.](index.md)

<a name='extras_meshes_convex'></a>
### module:extras/meshes/convex()

The <code>extras/meshes/convex.js</code> module.
To import all symbols in this module, either of the following can be used:

    import * from "extras/meshes/convex.js";
    // -- or --
    import * as CustomModuleName from "extras/meshes/convex.js";

### Methods

* [createConvexHull](#extras_meshes_convex.createConvexHull)<br>Generates the convex hull of a set of 3-dimensional points, that is, the smallest convex set
that contains all the points given.
* [planePointsToConvexHull](#extras_meshes_convex.planePointsToConvexHull)<br>Generates a convex hull of the half-space representation
of several planes.
* [randomConvexPolyhedron](#extras_meshes_convex.randomConvexPolyhedron)<br>Generates a mesh buffer of a convex polyhedron at random.

<a name='extras_meshes_convex.createConvexHull'></a>
### (static) module:extras/meshes/convex.createConvexHull(points)

Generates the convex hull of a set of 3-dimensional points, that is, the smallest convex set
that contains all the points given.

#### Parameters

* `points` (Type: Array.&lt;number>)<br>An array of 3-element vectors each identifying a 3-dimensional point.

#### Return Value

A buffer geometry. The generated convex hull. (Type: *)

<a name='extras_meshes_convex.planePointsToConvexHull'></a>
### (static) module:extras/meshes/convex.planePointsToConvexHull(planepoints)

Generates a convex hull of the half-space representation
of several planes. Each plane is defined by the triangle it lies on.

#### Parameters

* `planepoints` (Type: Array.&lt;Array.&lt;number>>)<br>An array of planes. Each plane is defined by three points that form a triangle that lies on the plane. The triangle's normal vector will point outward, meaning all points on the side pointed to by the normal vector will be "outside" the plane, and other points will be "inside" the plane.

#### Return Value

A buffer geometry. The generated convex hull. (Type: *)

<a name='extras_meshes_convex.randomConvexPolyhedron'></a>
### (static) module:extras/meshes/convex.randomConvexPolyhedron(avgsize, maxfaces)

Generates a mesh buffer of a convex polyhedron at random.

#### Parameters

* `avgsize` (Type: number)<br>Average size of the polyhedron generated.
* `maxfaces` (Type: number)<br>Maximum number of faces for the convex polyhedron.

#### Return Value

A buffer geometry. The resulting polyhedron. (Type: *)

[Back to documentation index.](index.md)

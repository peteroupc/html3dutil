# module:extras/contourlines

[Back to documentation index.](index.md)

<a name='extras_contourlines'></a>
### module:extras/contourlines()

The <code>extras/contourlines.js</code> module.
To import all symbols in this module, either of the following can be used:

    import * from "extras/contourlines.js";
    // -- or --
    import * as CustomModuleName from "extras/contourlines.js";

### Methods

* [contourLines](#extras_contourlines.contourLines)<br>Generates contour lines for two-dimensional data, using Paul Bourke's
CONREC algorithm.
* [contourLines3D](#extras_contourlines.contourLines3D)<br>Generates a mesh buffer of
contour lines along the surface of a 3-dimensional triangle mesh.

<a name='extras_contourlines.contourLines'></a>
### (static) module:extras/contourlines.contourLines(func, levels, u1, u2, v1, v2, usize, vsize)

Generates contour lines for two-dimensional data, using Paul Bourke's
CONREC algorithm.

#### Parameters

* `func` (Type: function)<br>A function that takes two parameters--a U coordinate and a V coordinate--and returns a number at that point.
* `levels` (Type: Array.&lt;number>)<br>An array of values at which to draw contour lines. For example, if levels is `[20, 25]`, this function will draw contour lines along the values 20 and 25.
* `u1` (Type: number)<br>Starting U coordinate to sample.
* `u2` (Type: number)<br>Ending U coordinate to sample.
* `v1` (Type: number)<br>Starting V coordinate to sample.
* `v2` (Type: number)<br>Ending V coordinate to sample.
* `usize` (Type: number)<br>The number of levels between grid points along the U axis. This method will sample (usize+1)\*(vsize+1) grid points in total.
* `vsize` (Type: number)<br>The number of levels between grid points along the V axis.

#### Return Value

A mesh buffer of line segments for the contour lines. (Type: MeshBuffer)

#### Examples

This example generates contour lines for a simple
function. This method samples the function at integer grid points.

    var mesh=contourLines((u,v)=>(Math.sin((u+v)/6)),
    [0, 1, 2, 3],
    0,10,0,10,10,10);

<a name='extras_contourlines.contourLines3D'></a>
### (static) module:extras/contourlines.contourLines3D(mesh, planes)

Generates a mesh buffer of
contour lines along the surface of a 3-dimensional triangle mesh.

#### Parameters

* `mesh` (Type: MeshBuffer)<br>A triangle mesh. It must contain a "POSITION" buffer attribute with three elements per value. If the number of vertices in the mesh is not divisible by 3, any excess vertices at the end are ignored.
* `planes` (Type: Array.&lt;Array.&lt;number>>)<br>An array of 4-element arrays that serve as contour planes. The contour lines will be drawn at the intersection of the contour planes and the surface of the mesh. Each 4-element array describes a plane (A, B, C, D), in that order, whose points satisfy the equation <code>Ax + By + Cz + D = 0</code>, where (x, y, z) is a point lying on the plane.

#### Return Value

A mesh buffer containing the generated contour lines.
Returns null if the input mesh's primitive type isn't triangles, or if
the input mesh doesn't contain a "POSITION" buffer attribute with
three elements per value. (Type: MeshBuffer)

[Back to documentation index.](index.md)

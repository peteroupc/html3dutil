# H3DU.SurfaceEval

[Back to documentation index.](index.md)

<a name='H3DU.SurfaceEval'></a>
### H3DU.SurfaceEval()

An evaluator of parametric functions for generating
vertex attributes of a surface.

See the <a href="tutorial-surfaces.md">Parametric Curves and Parametric Surfaces</a> tutorial for more information.

#### Parameters

### Methods

* [color](#H3DU.SurfaceEval_color)<br>Specifies a parametric surface function for generating color values.
* [evalOne](#H3DU.SurfaceEval_evalOne)<br>Generates vertex positions and attributes based on a point
in a parametric surface.
* [evalSurface](#H3DU.SurfaceEval_evalSurface)<br>Generates the vertex positions and attributes of a parametric
surface.
* [normal](#H3DU.SurfaceEval_normal)<br>**Deprecated: Use the "vertex" method instead, specifying an object
that implements a method named "gradient".**
* [setAutoNormal](#H3DU.SurfaceEval_setAutoNormal)<br>**Deprecated: In the future, this class may always generate
normals, rendering this method unnecessary. You should use the "vertex"
method, specifying an object that implements a method named
"gradient".**
* [texCoord](#H3DU.SurfaceEval_texCoord)<br>Specifies a parametric surface function for generating texture coordinates.
* [vertex](#H3DU.SurfaceEval_vertex)<br>Specifies a surface evaluator object for generating the vertex positions of a parametric surface.

<a name='H3DU.SurfaceEval_color'></a>
### H3DU.SurfaceEval#color(evaluator)

Specifies a parametric surface function for generating color values.

#### Parameters

* `evaluator` (Type: Object)<br>An object that must contain a method named <code>evaluate</code> that takes a U coordinate and a V coordinate and returns a 3-element array.

#### Return Value

This object. (Type: <a href="H3DU.SurfaceEval.md">H3DU.SurfaceEval</a>)

<a name='H3DU.SurfaceEval_evalOne'></a>
### H3DU.SurfaceEval#evalOne(mesh, u, v)

Generates vertex positions and attributes based on a point
in a parametric surface.

#### Parameters

* `mesh` (Type: <a href="H3DU.Mesh.md">H3DU.Mesh</a>)<br>H3DU.Mesh where vertex positions and attributes will be generated. When this method returns, the current color, normal, and texture coordinates will be the same as they were before the method started.
* `u` (Type: number)<br>U coordinate of the surface to evaluate.
* `v` (Type: number)<br>V coordinate of the surface to evaluate.

#### Return Value

This object. (Type: <a href="H3DU.SurfaceEval.md">H3DU.SurfaceEval</a>)

<a name='H3DU.SurfaceEval_evalSurface'></a>
### H3DU.SurfaceEval#evalSurface(mesh, [mode], [un], [vn], [u1], [u2], [v1], [v2])

Generates the vertex positions and attributes of a parametric
surface.

#### Parameters

* `mesh` (Type: <a href="H3DU.Mesh.md">H3DU.Mesh</a>)<br>H3DU.Mesh where vertex positions and attributes will be generated. When this method returns, the current color, normal, and texture coordinates will be the same as they were before the method started.
* `mode` (Type: number) (optional)<br>If this value is H3DU.Mesh.TRIANGLES, or is null or omitted, generates a series of triangles defining the surface. If this value is H3DU.Mesh.LINES, generates a series of lines defining the surface. If this value is H3DU.Mesh.POINTS, generates a series of points along the surface. For any other value, this method has no effect.
* `un` (Type: number) (optional)<br>Number of subdivisions along the U axis. Default is 24.
* `vn` (Type: number) (optional)<br>Number of subdivisions along the V axis. Default is 24.
* `u1` (Type: number) (optional)<br>Starting U coordinate of the surface to evaluate. Default is the starting U coordinate given by the <a href="H3DU.SurfaceEval.md#H3DU.SurfaceEval_vertex">surface evaluator object</a>, or 0 if not given.
* `u2` (Type: number) (optional)<br>Ending U coordinate of the surface to evaluate. Default is the ending U coordinate given by the <a href="H3DU.SurfaceEval.md#H3DU.SurfaceEval_vertex">surface evaluator object</a>, or 1 if not given.
* `v1` (Type: number) (optional)<br>Starting V coordinate of the surface to evaluate. Default is the starting V coordinate given by the <a href="H3DU.SurfaceEval.md#H3DU.SurfaceEval_vertex">surface evaluator object</a>, or 0 if not given.
* `v2` (Type: number) (optional)<br>Ending V coordinate of the surface to evaluate. Default is the ending V coordinate given by the <a href="H3DU.SurfaceEval.md#H3DU.SurfaceEval_vertex">surface evaluator object</a>, or 1 if not given.

#### Return Value

This object. (Type: <a href="H3DU.SurfaceEval.md">H3DU.SurfaceEval</a>)

<a name='H3DU.SurfaceEval_normal'></a>
### H3DU.SurfaceEval#normal(evaluator)

**Deprecated: Use the "vertex" method instead, specifying an object
that implements a method named "gradient".**

Specifies a parametric surface function for generating normals.

#### Parameters

* `evaluator` (Type: Object)<br>An object that must contain a method named <code>evaluate</code> that takes a U coordinate and a V coordinate and returns a 3-element array.

#### Return Value

This object. (Type: <a href="H3DU.SurfaceEval.md">H3DU.SurfaceEval</a>)

<a name='H3DU.SurfaceEval_setAutoNormal'></a>
### H3DU.SurfaceEval#setAutoNormal(value)

**Deprecated: In the future, this class may always generate
normals, rendering this method unnecessary. You should use the "vertex"
method, specifying an object that implements a method named
"gradient".**

Sets whether this object will automatically generate
normals rather than use the parametric evaluator
specified for normal generation, if any.
By default, normals won't be generated automatically.

#### Parameters

* `value` (Type: Boolean)<br>Either true or false. True means normals will automatically be generated; false means they won't.

#### Return Value

This object. (Type: <a href="H3DU.SurfaceEval.md">H3DU.SurfaceEval</a>)

<a name='H3DU.SurfaceEval_texCoord'></a>
### H3DU.SurfaceEval#texCoord(evaluator)

Specifies a parametric surface function for generating texture coordinates.

#### Parameters

* `evaluator` (Type: Object)<br>An object that must contain a method named <code>evaluate</code> that takes a U coordinate and a V coordinate and returns a 2-element array.

#### Return Value

This object. (Type: <a href="H3DU.SurfaceEval.md">H3DU.SurfaceEval</a>)

#### Example

The following example sets the surface
function to a linear evaluator. Thus, coordinates passed to the
evalOne and evalSurface methods will be interpolated as direct
texture coordinates.

    surface.texCoord({"evaluate":function(u,v) {
    "use strict"; return [u,v] }});

<a name='H3DU.SurfaceEval_vertex'></a>
### H3DU.SurfaceEval#vertex(evaluator)

Specifies a surface evaluator object for generating the vertex positions of a parametric surface.

#### Parameters

* `evaluator` (Type: <a href="H3DU.Surface.md">H3DU.Surface</a> | Object)<br>An object described in <a href="H3DU.Surface.md">H3DU.Surface</a>. Can be null, in which case, disables generating vertex positions.

#### Return Value

This object. (Type: <a href="H3DU.SurfaceEval.md">H3DU.SurfaceEval</a>)

[Back to documentation index.](index.md)

# H3DU.SurfaceEval

[Back to documentation index.](index.md)

 <a name='H3DU.SurfaceEval'></a>
### H3DU.SurfaceEval()

An evaluator of parametric functions for generating
vertex positions, normals, colors, and texture coordinates
of a surface.

A parametric surface is a surface whose points are based on a
parametric surface function. A surface function takes two numbers
(U and V) and returns a point (in 1, 2, 3 or more dimensions, but
usually 2 or 3) that lies on the surface. For example, in 3
dimensions, a surface function has the following form:

<b>F</b>(u, v) = [ x(u, v), y(u, v), z(u, v) ]

where x(u, v) returns an X coordinate, y(u, v) a Y coordinate,
and z(u, v) returns a Z coordinate.

See the <a href="tutorial-surfaces.md">Parametric Curves and Parametric Surfaces</a> tutorial for more information.

### Methods

* [color](#H3DU.SurfaceEval_H3DU.SurfaceEval_color)<br>Specifies a parametric surface function for generating color values.
* [evalOne](#H3DU.SurfaceEval_H3DU.SurfaceEval_evalOne)<br>Generates vertex positions and attributes based on a point
in a parametric surface.
* [evalSurface](#H3DU.SurfaceEval_H3DU.SurfaceEval_evalSurface)<br>Generates the vertex positions and attributes of a parametric
surface.
* [normal](#H3DU.SurfaceEval_H3DU.SurfaceEval_normal)<br><b>Deprecated: Use the "vertex" method instead, specifying an object
that implements a method named "gradient".</b>
* [setAutoNormal](#H3DU.SurfaceEval_H3DU.SurfaceEval_setAutoNormal)<br><b>Deprecated: In the future, this class may always generate
normals, rendering this method unnecessary. You should use the "vertex"
method, specifying an object that implements a method named
"gradient".</b>
* [texCoord](#H3DU.SurfaceEval_H3DU.SurfaceEval_texCoord)<br>Specifies a parametric surface function for generating texture coordinates.
* [vertex](#H3DU.SurfaceEval_H3DU.SurfaceEval_vertex)<br>Specifies a parametric surface function for generating vertex positions.

 <a name='H3DU.SurfaceEval_H3DU.SurfaceEval_color'></a>
### H3DU.SurfaceEval#color(evaluator)

Specifies a parametric surface function for generating color values.

#### Parameters

* `evaluator` (Type: Object)<br>
    An object that must contain a function named "evaluate", giving 3 values as a result. See H3DU.SurfaceEval#vertex. </ul>

#### Return Value

This object. (Type: <a href="H3DU.SurfaceEval.md">H3DU.SurfaceEval</a>)

 <a name='H3DU.SurfaceEval_H3DU.SurfaceEval_evalOne'></a>
### H3DU.SurfaceEval#evalOne(mesh, u, v)

Generates vertex positions and attributes based on a point
in a parametric surface.

#### Parameters

* `mesh` (Type: <a href="H3DU.Mesh.md">H3DU.Mesh</a>)<br>
    H3DU.Mesh where vertex positions and attributes will be generated. When this method returns, the current color, normal, and texture coordinates will be the same as they were before the method started.
* `u` (Type: Number)<br>
    U-coordinate of the curve to evaluate.
* `v` (Type: Number)<br>
    V-coordinate of the curve to evaluate.

#### Return Value

This object. (Type: <a href="H3DU.SurfaceEval.md">H3DU.SurfaceEval</a>)

 <a name='H3DU.SurfaceEval_H3DU.SurfaceEval_evalSurface'></a>
### H3DU.SurfaceEval#evalSurface(mesh, [mode], [un], [vn], [u1], [u2], [v1], [v2])

Generates the vertex positions and attributes of a parametric
surface.

#### Parameters

* `mesh` (Type: <a href="H3DU.Mesh.md">H3DU.Mesh</a>)<br>
    H3DU.Mesh where vertex positions and attributes will be generated. When this method returns, the current color, normal, and texture coordinates will be the same as they were before the method started.
* `mode` (Type: Number) (optional)<br>
    If this value is H3DU.Mesh.TRIANGLES, or is null or omitted, generates a series of triangles defining the surface. If this value is H3DU.Mesh.LINES, generates a series of lines defining the curve. If this value is H3DU.Mesh.POINTS, generates a series of points along the curve. For any other value, this method has no effect.
* `un` (Type: Number) (optional)<br>
    Number of subdivisions along the U-axis. Default is 24.
* `vn` (Type: Number) (optional)<br>
    Number of subdivisions along the V-axis. Default is 24.
* `u1` (Type: Number) (optional)<br>
    Starting U-coordinate of the surface to evaluate. Default is 0.
* `u2` (Type: Number) (optional)<br>
    Ending U-coordinate of the surface to evaluate. Default is 1.
* `v1` (Type: Number) (optional)<br>
    Starting U-coordinate of the surface to evaluate. Default is 0.
* `v2` (Type: Number) (optional)<br>
    Ending U-coordinate of the surface to evaluate. Default is 1.

#### Return Value

This object. (Type: <a href="H3DU.SurfaceEval.md">H3DU.SurfaceEval</a>)

 <a name='H3DU.SurfaceEval_H3DU.SurfaceEval_normal'></a>
### H3DU.SurfaceEval#normal(evaluator)

<b>Deprecated: Use the "vertex" method instead, specifying an object
that implements a method named "gradient".</b>

Specifies a parametric surface function for generating normals.

#### Parameters

* `evaluator` (Type: Object)<br>
    An object that must contain a function named "evaluate", giving 3 values as a result. See H3DU.SurfaceEval#vertex. </ul>

#### Return Value

This object. (Type: <a href="H3DU.SurfaceEval.md">H3DU.SurfaceEval</a>)

 <a name='H3DU.SurfaceEval_H3DU.SurfaceEval_setAutoNormal'></a>
### H3DU.SurfaceEval#setAutoNormal(value)

<b>Deprecated: In the future, this class may always generate
normals, rendering this method unnecessary. You should use the "vertex"
method, specifying an object that implements a method named
"gradient".</b>

Sets whether this object will automatically generate
normals rather than use the parametric evaluator
specified for normal generation, if any.
By default, normals won't be generated automatically.

#### Parameters

* `value` (Type: Boolean)<br>
    Either true or false. True means normals will automatically be generated; false means they won't.

#### Return Value

This object. (Type: <a href="H3DU.SurfaceEval.md">H3DU.SurfaceEval</a>)

 <a name='H3DU.SurfaceEval_H3DU.SurfaceEval_texCoord'></a>
### H3DU.SurfaceEval#texCoord(evaluator)

Specifies a parametric surface function for generating texture coordinates.

#### Parameters

* `evaluator` (Type: Object)<br>
    An object that must contain a function named "evaluate", giving 2 values as a result. See H3DU.SurfaceEval#vertex. </ul>

#### Return Value

This object. (Type: <a href="H3DU.SurfaceEval.md">H3DU.SurfaceEval</a>)

#### Example

The following example sets the surface
function to a linear evaluator. Thus, coordinates passed to the
evalOne and evalSurface methods will be interpolated as direct
texture coordinates.

    surface.texCoord({"evaluate":function(u,v) {
    "use strict"; return [u,v] }});

 <a name='H3DU.SurfaceEval_H3DU.SurfaceEval_vertex'></a>
### H3DU.SurfaceEval#vertex(evaluator)

Specifies a parametric surface function for generating vertex positions.

#### Parameters

* `evaluator` (Type: Object)<br>
    An object that may or must contain the following methods:<ul> <li>evaluate(<code>u</code>, <code>v</code>) - A method that takes a horizontal-axis coordinate (<code>u</code>), generally from 0 to 1, and a vertical-axis coordinate (<code>v</code>), generally from 0 to 1. This method is required. This method returns a vector of the result of the evaluation. <li>gradient(<code>u</code>, <code>v</code>) - A method that takes the same parameters as "evaluate" and returns the gradient of the surface at the given coordinates. The return value should not be "normalized" to a unit vector. This method is optional. <li>tangent(<code>u</code>, <code>v</code>) - A method that takes the same parameters as "evaluate" and returns the tangent of the surface at the given coordinates. The return value should not be "normalized" to a unit vector. This method is optional. <li>bitangent(<code>u</code>, <code>v</code>) - A method that takes the same parameters as "evaluate" and returns the bitangent of the surface at the given coordinates. The return value should not be "normalized" to a unit vector. This method is optional. </ul>

#### Return Value

This object. (Type: <a href="H3DU.SurfaceEval.md">H3DU.SurfaceEval</a>)

#### Example

The following example sets the vertex position and
normal generation
function for a parametric surface. To illustrate how the method is derived
from the vector calculation method, that method is also given below. To
derive the normal calculation, first look at the vector function:

<b>F</b>(u, v) = (cos(u), sin(u), sin(u)\*cos(v))

Then, find the partial derivatives with respect to u and v:

&#x2202;<b>F</b>/&#x2202;<i>u</i> = (-sin(u), cos(u), cos(u)\*cos(v))<br>
&#x2202;<b>F</b>/&#x2202;<i>v</i> = (0, 0, -sin(v)\*sin(u))

Next, take their cross product:

<b>c</b>(u, v) = (-sin(v)\*cos(u)\*sin(u), -sin(v)\*sin(u)\*sin(u), 0)<br>

The result is the gradient, which will be normal to the surface.

    surfaceEval.vertex({"evaluate":function(u,v) {
    "use strict";
    return [Math.cos(u),Math.sin(u),Math.sin(u)*Math.cos(v)];
    },
    "gradient":function(u,v) {
    "use strict";
    return [
    Math.cos(u)*-Math.sin(v)*Math.sin(u),
    Math.sin(u)*-Math.sin(v)*Math.sin(u),
    0];
    }})

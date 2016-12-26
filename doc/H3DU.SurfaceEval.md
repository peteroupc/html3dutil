# H3DU.SurfaceEval

[Back to documentation index.](index.md)

### H3DU.SurfaceEval() <a id='H3DU.SurfaceEval'></a>

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

* [color](#H3DU.SurfaceEval_H3DU.SurfaceEval_color)
* [evalOne](#H3DU.SurfaceEval_H3DU.SurfaceEval_evalOne)
* [evalSurface](#H3DU.SurfaceEval_H3DU.SurfaceEval_evalSurface)
* [normal](#H3DU.SurfaceEval_H3DU.SurfaceEval_normal)
* [setAutoNormal](#H3DU.SurfaceEval_H3DU.SurfaceEval_setAutoNormal)
* [texCoord](#H3DU.SurfaceEval_H3DU.SurfaceEval_texCoord)
* [vertex](#H3DU.SurfaceEval_H3DU.SurfaceEval_vertex)

### H3DU.SurfaceEval#color(evaluator) <a id='H3DU.SurfaceEval_H3DU.SurfaceEval_color'></a>

Specifies a parametric surface function for generating color values.

#### Parameters

* `evaluator` (Type: Object)<br>
    An object that must contain a function named "evaluate", giving 3 values as a result. See H3DU.SurfaceEval#vertex. </ul>

#### Return Value

This object. (Type: <a href="H3DU.SurfaceEval.md">H3DU.SurfaceEval</a>)

### H3DU.SurfaceEval#evalOne(mesh, u, v) <a id='H3DU.SurfaceEval_H3DU.SurfaceEval_evalOne'></a>

Generates vertex positions and attributes based on a point
in a parametric surface.

#### Parameters

* `mesh` (Type: <a href="H3DU.Mesh.md">H3DU.Mesh</a>)<br>
    H3DU.Mesh where vertex positions and attributes will be generated. When this method returns, the current color, normal, and texture coordinates will be the same as they were before the method started.
* `u` (Type: Number)<br>
    U-coordinate of the curve to evaluate
* `v` (Type: Number)<br>
    V-coordinate of the curve to evaluate.

#### Return Value

This object. (Type: <a href="H3DU.SurfaceEval.md">H3DU.SurfaceEval</a>)

### H3DU.SurfaceEval#evalSurface(mesh, [mode], [un], [vn], [u1], [u2], [v1], [v2]) <a id='H3DU.SurfaceEval_H3DU.SurfaceEval_evalSurface'></a>

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

### H3DU.SurfaceEval#normal(evaluator) <a id='H3DU.SurfaceEval_H3DU.SurfaceEval_normal'></a>

Specifies a parametric surface function for generating normals.

To generate normals for a function for a regular surface (usually
a continuous, unbroken surface such as a sphere, disk, or open
cylinder), find the <a href="http://en.wikipedia.org/wiki/Partial_derivative">partial derivative</a> of
the function used for vertex calculation (we'll call it <b>F</b>) with
respect to u, then find the partial derivative of <b>F</b> with respect to
v, then take their <a href="http://en.wikipedia.org/wiki/Cross_product">cross
product</a> (e.g., <a href="H3DU.Math.md#H3DU.Math.vec3cross">H3DU.Math.vec3cross</a>), then convert the result to a unit vector
(a <a href="H3DU.Math.md#H3DU.Math.vec3norm">"normalized" vector</a> with a length of 1).
In mathematical notation, this looks like:
<b>c</b> = &#x2202;<b>F</b>/&#x2202;<i>u</i> &times;
&#x2202;<b>F</b>/&#x2202;<i>v</i>; <b>n</b> = <b>c</b> / |<b>c</b>|.

If autonormal is enabled (see setAutoNormal()), H3DU.SurfaceEval uses an approximation to this approach,
as the H3DU.SurfaceEval class doesn't know the implementation of the method used
for vertex calculation.

(Note: &#x2202;<b>F</b>/&#x2202;<i>u</i> is also called the <i>bitangent</i>
or <i>binormal vector</i>, and &#x2202;<b>F</b>/&#x2202;<i>v</i> is also
called the <i>tangent vector</i>.)

#### Parameters

* `evaluator` (Type: Object)<br>
    An object that must contain a function named "evaluate", giving 3 values as a result. See H3DU.SurfaceEval#vertex. </ul>

#### Return Value

This object. (Type: <a href="H3DU.SurfaceEval.md">H3DU.SurfaceEval</a>)

#### Example

The following example sets the normal generation
function for a parametric surface. To illustrate how the method is derived
from the vector calculation method, that method is also given below. To
derive the normal calculation, first look at the vector function:

<b>F</b>(u, v) = (cos(u), sin(u), sin(u)\*cos(v))

Then, find the partial derivatives with respect to u and v:

&#x2202;<b>F</b>/&#x2202;<i>u</i> = (-sin(u), cos(u), cos(u)\*cos(v))<br>
&#x2202;<b>F</b>/&#x2202;<i>v</i> = (0, 0, -sin(v)\*sin(u))

Next, take their cross product:

<b>c</b>(u, v) = (-sin(v)\*cos(u)\*sin(u), -sin(v)\*sin(u)\*sin(u), 0)<br>

And finally, normalize the result:

<b>n</b>(u, v) = <b>c</b>(u, v)/|<b>c</b>(u, v)|

    surfaceEval.vertex({"evaluate":function(u,v) {
    "use strict";
     return [Math.cos(u),Math.sin(u),Math.sin(u)\*Math.cos(v)];
    }})
    .normal({"evaluate":function(u,v) {
    "use strict";
     return H3DU.Math.vec3normInPlace([
     Math.cos(u)\*-Math.sin(v)\*Math.sin(u),
     Math.sin(u)\*-Math.sin(v)\*Math.sin(u),
     0]);
    }})

### H3DU.SurfaceEval#setAutoNormal(value) <a id='H3DU.SurfaceEval_H3DU.SurfaceEval_setAutoNormal'></a>

Sets whether this object will automatically generate
normals rather than use the parametric evaluator
specified for normal generation, if any.
By default, normals won't be generated automatically.

#### Parameters

* `value` (Type: Boolean)<br>
    Either true or false. True means normals will automatically be generated; false means they won't.

#### Return Value

This object. (Type: <a href="H3DU.SurfaceEval.md">H3DU.SurfaceEval</a>)

### H3DU.SurfaceEval#texCoord(evaluator) <a id='H3DU.SurfaceEval_H3DU.SurfaceEval_texCoord'></a>

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

### H3DU.SurfaceEval#vertex(evaluator) <a id='H3DU.SurfaceEval_H3DU.SurfaceEval_vertex'></a>

Specifies a parametric surface function for generating vertex positions.

#### Parameters

* `evaluator` (Type: Object)<br>
    An object that must contain a function named "evaluate". It takes the following parameters in this order:<ul> <li><code>u</code> - Horizontal-axis coordinate, generally from 0 to 1. <li><code>v</code> - Vertical-axis coordinate, generally from 0 to 1. </ul> The evaluator function returns an array of the result of the evaluation.

#### Return Value

This object. (Type: <a href="H3DU.SurfaceEval.md">H3DU.SurfaceEval</a>)

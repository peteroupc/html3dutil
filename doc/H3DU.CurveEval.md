# H3DU.CurveEval

[Back to documentation index.](index.md)

 <a name='H3DU.CurveEval'></a>
### H3DU.CurveEval()

An evaluator of parametric curve functions for generating
vertex positions and colors of a curve.

A parametric curve is a curve whose points are based on a
parametric curve function. A curve function takes a number
(U) and returns a point (in 1, 2, 3 or more dimensions, but
usually 2 or 3) that lies on the curve. For example, in 3
dimensions, a curve function has the following form:

<b>F</b>(u) = [ x(u), y(u), z(u) ]

where x(u) returns an X coordinate, y(u) a Y coordinate,
and z(u) returns a Z coordinate.

This class also contains methods for calculating several useful
properties of a parametric curve, such as its tangent vector.
For more information, see the <a href="tutorial-surfaces.md">Parametric Curves and Parametric Surfaces</a> tutorial.

### Methods

* [color](#H3DU.CurveEval_color)<br>Specifies a parametric curve function for generating color values.
* [evalCurve](#H3DU.CurveEval_evalCurve)<br>Generates vertices and attribute values that follow a parametric curve
function.
* [evalOne](#H3DU.CurveEval_evalOne)<br>Generates vertex positions and attributes based on a point
in a parametric curve.
* [findAccel](#H3DU.CurveEval.findAccel)<br>Finds an approximate <a href="H3DU.CurveEval.md#H3DU.CurveEval_vertex">acceleration vector</a>
(second derivative) for the given curve evaluator object
at the given U coordinate.
* [findArcLength](#H3DU.CurveEval.findArcLength)<br>Finds an approximate <a href="H3DU.CurveEval.md#H3DU.CurveEval_vertex">arc length</a> between the start of the curve
described by the given curve evaluator object and the point at the given U coordinate.
* [findEndPoints](#H3DU.CurveEval.findEndPoints)<br>Finds the end points of the curve described by the given <a href="H3DU.CurveEval.md#H3DU.CurveEval_vertex">curve evaluator object</a>.
* [findNormal](#H3DU.CurveEval.findNormal)<br>Finds an approximate <a href="H3DU.CurveEval.md#H3DU.CurveEval_vertex">principal normal vector</a> for the given
curve evaluator object
at the given U coordinate.
* [findTangent](#H3DU.CurveEval.findTangent)<br>Finds an approximate <a href="H3DU.CurveEval.md#H3DU.CurveEval_vertex">tangent (derivative)</a> for the given curve evaluator object
at the given U coordinate.
* [normal](#H3DU.CurveEval_normal)<br><b>Deprecated: Use the "vertex" method instead.</b>
* [texCoord](#H3DU.CurveEval_texCoord)<br>Specifies a parametric curve function for generating texture coordinates.
* [vertex](#H3DU.CurveEval_vertex)<br>Specifies a curve evaluator object for generating the vertex positions of a parametric curve.
* [wrapEvaluator](#H3DU.CurveEval.wrapEvaluator)<br>Wraps a curve evaluator object to one that implements all
methods defined in the documentation for <a href="H3DU.CurveEval.md#H3DU.CurveEval_vertex">H3DU.CurveEval#vertex</a>.

 <a name='H3DU.CurveEval_color'></a>
### H3DU.CurveEval#color(evaluator)

Specifies a parametric curve function for generating color values.

#### Parameters

* `evaluator` (Type: Object)<br>
    An object that must contain a function named <code>evaluate</code>, giving 3 values as a result. See <a href="H3DU.CurveEval.md#H3DU.CurveEval_vertex">H3DU.CurveEval#vertex</a>. </ul>

#### Return Value

This object. (Type: <a href="H3DU.CurveEval.md">H3DU.CurveEval</a>)

 <a name='H3DU.CurveEval_evalCurve'></a>
### H3DU.CurveEval#evalCurve(mesh, [mode], [n], [u1], [u2])

Generates vertices and attribute values that follow a parametric curve
function.

#### Parameters

* `mesh` (Type: <a href="H3DU.Mesh.md">H3DU.Mesh</a>)<br>
    A geometric mesh where the vertices will be generated.
* `mode` (Type: Number) (optional)<br>
    If this value is H3DU.Mesh.LINES, or is null or omitted, generates a series of lines defining the curve. If this value is H3DU.Mesh.POINTS, generates a series of points along the curve. For any other value, this method has no effect.
* `n` (Type: Number) (optional)<br>
    Number of subdivisions of the curve to be drawn. Default is 24.
* `u1` (Type: Number) (optional)<br>
    Starting point of the curve. Default is the starting coordinate given by the <a href="H3DU.CurveEval.md#H3DU.CurveEval_vertex">curve evaluator object</a>, or 0 if not given.
* `u2` (Type: Number) (optional)<br>
    Ending point of the curve. Default is the ending coordinate given by the <a href="H3DU.CurveEval.md#H3DU.CurveEval_vertex">curve evaluator object</a>, or 1 if not given.

#### Return Value

This object. (Type: <a href="H3DU.CurveEval.md">H3DU.CurveEval</a>)

 <a name='H3DU.CurveEval_evalOne'></a>
### H3DU.CurveEval#evalOne(mesh, u)

Generates vertex positions and attributes based on a point
in a parametric curve.

#### Parameters

* `mesh` (Type: <a href="H3DU.Mesh.md">H3DU.Mesh</a>)<br>
    H3DU.Mesh where vertex positions and attributes will be generated. When this method returns, the current color, normal, and texture coordinates will be the same as they were before the method started.
* `u` (Type: Number)<br>
    Point of the curve to evaluate.

#### Return Value

This object. (Type: <a href="H3DU.CurveEval.md">H3DU.CurveEval</a>)

 <a name='H3DU.CurveEval.findAccel'></a>
### (static) H3DU.CurveEval.findAccel(e, u)

Finds an approximate <a href="H3DU.CurveEval.md#H3DU.CurveEval_vertex">acceleration vector</a>
(second derivative) for the given curve evaluator object
at the given U coordinate. This method calls the evaluator's <code>accel</code>
method if it implements it; otherwise, does a numerical differentiation
using the <a href="H3DU.CurveEval.md#H3DU.CurveEval.findTangent">H3DU.CurveEval.findTangent</a> method.

#### Parameters

* `e` (Type: Object)<br>
    An object described in <a href="H3DU.CurveEval.md#H3DU.CurveEval_vertex">H3DU.CurveEval#vertex</a>.
* `u` (Type: Number)<br>
    U coordinate of the curve to evaluate.

#### Return Value

A tangent vector. (Type: Array.&lt;Number>)

 <a name='H3DU.CurveEval.findArcLength'></a>
### (static) H3DU.CurveEval.findArcLength(e, u)

Finds an approximate <a href="H3DU.CurveEval.md#H3DU.CurveEval_vertex">arc length</a> between the start of the curve
described by the given curve evaluator object and the point at the given U coordinate.
This method calls the evaluator's <code>arcLength</code>
method if it implements it; otherwise, calculates a numerical integral using the <a href="H3DU.CurveEval.md#H3DU.CurveEval.findTangent">H3DU.CurveEval.findTangent</a> method.

#### Parameters

* `e` (Type: Object)<br>
    An object described in <a href="H3DU.CurveEval.md#H3DU.CurveEval_vertex">H3DU.CurveEval#vertex</a>.
* `u` (Type: Number)<br>
    U coordinate of the curve to evaluate.

#### Return Value

A tangent vector. (Type: Array.&lt;Number>)

 <a name='H3DU.CurveEval.findEndPoints'></a>
### (static) H3DU.CurveEval.findEndPoints(e)

Finds the end points of the curve described by the given <a href="H3DU.CurveEval.md#H3DU.CurveEval_vertex">curve evaluator object</a>.
This method calls the evaluator's <code>endPoints</code>
method if it implements it; otherwise, returns <code>[0, 1]</code>

#### Parameters

* `e` (Type: Object)<br>
    An object described in <a href="H3DU.CurveEval.md#H3DU.CurveEval_vertex">H3DU.CurveEval#vertex</a>.

#### Return Value

A two-element array giving the curve's end points. (Type: Array.&lt;Number>)

 <a name='H3DU.CurveEval.findNormal'></a>
### (static) H3DU.CurveEval.findNormal(e, u)

Finds an approximate <a href="H3DU.CurveEval.md#H3DU.CurveEval_vertex">principal normal vector</a> for the given
curve evaluator object
at the given U coordinate. This method calls the evaluator's <code>normal</code>
method if it implements it; otherwise, does a numerical differentiation
using the <a href="H3DU.CurveEval.md#H3DU.CurveEval.findTangent">H3DU.CurveEval.findTangent</a> and <a href="H3DU.CurveEval.md#H3DU.CurveEval.findAccel">H3DU.CurveEval.findAccel</a> methods.

#### Parameters

* `e` (Type: Object)<br>
    An object described in <a href="H3DU.CurveEval.md#H3DU.CurveEval_vertex">H3DU.CurveEval#vertex</a>.
* `u` (Type: Number)<br>
    U coordinate of the curve to evaluate.

#### Return Value

A tangent vector. (Type: Array.&lt;Number>)

 <a name='H3DU.CurveEval.findTangent'></a>
### (static) H3DU.CurveEval.findTangent(e, u)

Finds an approximate <a href="H3DU.CurveEval.md#H3DU.CurveEval_vertex">tangent (derivative)</a> for the given curve evaluator object
at the given U coordinate. This method calls the evaluator's <code>tangent</code>
method if it implements it; otherwise, does a numerical differentiation
using the <code>evaluate</code> method.

#### Parameters

* `e` (Type: Object)<br>
    An object described in <a href="H3DU.CurveEval.md#H3DU.CurveEval_vertex">H3DU.CurveEval#vertex</a>.
* `u` (Type: Number)<br>
    U coordinate of the curve to evaluate.

#### Return Value

A tangent vector. (Type: Array.&lt;Number>)

 <a name='H3DU.CurveEval_normal'></a>
### H3DU.CurveEval#normal(evaluator)

<b>Deprecated: Use the "vertex" method instead.</b>

Specifies a parametric curve function for generating normals.

#### Parameters

* `evaluator` (Type: Object)<br>
    An object that must contain a function named <code>evaluate</code>, giving 3 values as a result. See <a href="H3DU.CurveEval.md#H3DU.CurveEval_vertex">H3DU.CurveEval#vertex</a>. </ul>

#### Return Value

This object. (Type: <a href="H3DU.CurveEval.md">H3DU.CurveEval</a>)

 <a name='H3DU.CurveEval_texCoord'></a>
### H3DU.CurveEval#texCoord(evaluator)

Specifies a parametric curve function for generating texture coordinates.

#### Parameters

* `evaluator` (Type: Object)<br>
    An object that must contain a function named <code>evaluate</code>, giving one or two values as a result. See <a href="H3DU.CurveEval.md#H3DU.CurveEval_vertex">H3DU.CurveEval#vertex</a>. </ul>

#### Return Value

This object. (Type: <a href="H3DU.CurveEval.md">H3DU.CurveEval</a>)

 <a name='H3DU.CurveEval_vertex'></a>
### H3DU.CurveEval#vertex(evaluator)

Specifies a curve evaluator object for generating the vertex positions of a parametric curve.

#### Parameters

* `evaluator` (Type: Object)<br>
    A <b>curve evaluator object</b>, which is an object that may contain the following methods (except that <code>evaluate</code> is required):<ul> <li><code>evaluate(u)</code> - A method that takes a curve coordinate (<code>u</code>), generally from 0 to 1. This method is required. This method returns an array of the result of the evaluation. <li><code>tangent(u)</code> - A method that takes the same parameter as <code>evaluate</code> and returns the tangent (or velocity) of the surface at the given coordinate.

 The <b>tangent</b> of a curve is a vector which is the derivative of the <code>evaluate</code> method at the given coordinate. The tangent vector returned by this method <i>should not</i> be "normalized" to a <a href="tutorial-glmath.md">unit vector</a>. This method is optional. <li><code>accel(u)</code> - A method that takes the same parameter as <code>evaluate</code> and returns the acceleration of the surface at the given coordinate.

 The <b>acceleration</b> of a curve is a vector which is the second derivative of the <code>evaluate</code> method at the given coordinate. The vector returned by this method <i>should not</i> be "normalized" to a <a href="tutorial-glmath.md">unit vector</a>. This method is optional. <li><code>normal(u)</code> - A method that takes the same parameter as <code>evaluate</code> and returns the principal normal of the surface at the given coordinate, as a unit vector.

 The <b>principal normal</b> of a curve is the derivative of the "normalized" tangent vector divided by that derivative's length. The normal returned by this method <i>should</i> be "normalized" to a <a href="tutorial-glmath.md">unit vector</a>. (Compare with the "gradient" method for <a href="H3DU.SurfaceEval.md#H3DU.SurfaceEval_vertex">H3DU.SurfaceEval#vertex</a>.) This method is optional. <li><code>arcLength(u)</code> - A method that takes the same parameter as <code>evaluate</code> and returns the length of the curve from the starting point to the point at the given coordinate.

 The <b>arc length</b> function returns a number; if the curve is "smooth", this is the integral, from the starting point to <code>u</code>, of the length of the tangent vector. This method is optional. <li><code>endPoints()</code> - A method that returns a two-element array. The first element is the starting coordinate of the curve, and the second is its ending coordinate. This method is optional. If not given, the default end points are <code>[0, 1]</code>. </ul>

#### Return Value

This object. (Type: <a href="H3DU.CurveEval.md">H3DU.CurveEval</a>)

#### Example

The following function sets a circle as the curve
to use for generating vertex positions. It demonstrates how all methods
defined for curve evaluator objects can be implemented.

    curveEval.vertex({"evaluate":function(u) {
    "use strict";
    return [Math.cos(u),Math.sin(u),0]
    },
    "tangent":function(u) {
    return [-Math.sin(u),Math.cos(u),0]
    },
    "accel":function(u) {
    return [-Math.cos(u),-Math.sin(u),0]
    },
    "normal":function(u) {
    // NOTE: The tangent vector will already be a
    // unit vector, so we use the accel vector instead
    return H3DU.Math.vec3norm(this.accel(u));
    },
    "arcLength":function(u) {
    return u;
    },
    "endPoints":function(u) {
    return [0,H3DU.Math.PiTimes2]
    }
    });

 <a name='H3DU.CurveEval.wrapEvaluator'></a>
### (static) H3DU.CurveEval.wrapEvaluator(evaluator)

Wraps a curve evaluator object to one that implements all
methods defined in the documentation for <a href="H3DU.CurveEval.md#H3DU.CurveEval_vertex">H3DU.CurveEval#vertex</a>.

#### Parameters

* `evaluator` (Type: Object)<br>
    The curve evaluator object to wrap.

#### Return Value

A wrapper for the given curve evaluator object. (Type: Object)

# H3DU.Surface

[Back to documentation index.](index.md)

<a name='H3DU.Surface'></a>
### new H3DU.Surface(surface)

A surface evaluator object for a parametric surface.

A parametric surface is a surface whose points are based on a
parametric surface function. A surface function takes two numbers
(U and V) and returns a point (in 1, 2, 3 or more dimensions, but
usually 2 or 3) that lies on the surface. For example, in 3
dimensions, a surface function has the following form:

<b>F</b>(u, v) = [ x(u, v), y(u, v), z(u, v) ]

where x(u, v) returns an x-coordinate, y(u, v) a y-coordinate,
and z(u, v) returns a z-coordinate.

Classes or JavaScript objects defining parametric surfaces should implement
the <code>evaluate</code> method and, optionally, the other methods mentioned in the "surface" parameter below.

#### Parameters

* `surface` (Type: Object)<br>A <b>surface evaluator object</b>, which is an object that must contain an <code>evaluate</code> method and may contain an <code>endPoints</code>, <code>tangent</code>, <code>bitangent</code>, and/or <code>gradient</code> method, as described in the corresponding methods of this class.

### Methods

* [bitangent](#H3DU.Surface_bitangent)<br>Finds an approximate bitangent vector of this surface at the given u- and v-coordinates.
* [endPoints](#H3DU.Surface_endPoints)<br>Returns the starting and ending u- and v-coordinates of this surface.
* [evaluate](#H3DU.Surface_evaluate)<br>Finds the position of this surface at the given u- and v-coordinates.
* [gradient](#H3DU.Surface_gradient)<br>Finds an approximate gradient vector of this surface at the given u- and v-coordinates.
* [normal](#H3DU.Surface_normal)<br>Convenience method for finding an approximate normal vector of this surface at the given u- and v-coordinates.
* [tangent](#H3DU.Surface_tangent)<br>Finds an approximate tangent vector of this surface at the given u- and v-coordinates.

<a name='H3DU.Surface_bitangent'></a>
### H3DU.Surface#bitangent(u, v)

Finds an approximate bitangent vector of this surface at the given u- and v-coordinates.

The implementation in Surface calls the evaluator's <code>bitangent</code>
method if it implements it; otherwise, does a numerical differentiation
with respect to the v-axis using the <code>evaluate</code> method.

The <b>bitangent vector</b> is the vector pointing in the direction of the v-axis, or alternatively,
the partial derivative of the <code>evaluate</code> method with respect to <code>v</code>. The bitangent vector returned by this method <i>should not</i> be "normalized" to a <a href="tutorial-glmath.md">unit vector</a>.

#### Parameters

* `u` (Type: number)<br>u-coordinate of a point on the surface.
* `v` (Type: number)<br>v-coordinate of a point on the surface.

#### Return Value

An array describing a bitangent vector. It should have at least as many
elements as the number of dimensions of the underlying surface. (Type: Array.&lt;number>)

#### Examples

    <caption> The following code is a very simple surface evaluator object.
    var evaluator = new Surface({
    "evaluate":function(u, v) {
    // Take the U parameter as the x-coordinate,
    // the V parameter as the y-coordinate, and 0 as
    // the z-coordinate.
    return [u, v, 0];
    }
    });

<a name='H3DU.Surface_endPoints'></a>
### H3DU.Surface#endPoints()

Returns the starting and ending u- and v-coordinates of this surface.
This method calls the evaluator's <code>endPoints</code>
method if it implements it; otherwise, returns <code>[0, 1, 0, 1]</code>

#### Return Value

A four-element array. The first and second
elements are the starting and ending u-coordinates, respectively, of the surface, and the third
and fourth elements are its starting and ending v-coordinates.
Returns <code>[0, 1, 0, 1]</code> if the evaluator doesn't implement an <code>endPoints</code>
method.

<a name='H3DU.Surface_evaluate'></a>
### H3DU.Surface#evaluate(u, v)

Finds the position of this surface at the given u- and v-coordinates.

#### Parameters

* `u` (Type: number)<br>u-coordinate of a point on the surface.
* `v` (Type: number)<br>v-coordinate of a point on the surface.

#### Return Value

An array describing a position. It should have at least as many
elements as the number of dimensions of the underlying surface. (Type: Array.&lt;number>)

<a name='H3DU.Surface_gradient'></a>
### H3DU.Surface#gradient(u, v)

Finds an approximate gradient vector of this surface at the given u- and v-coordinates.

The implementation in Surface calls the evaluator's <code>gradient</code>
method if it implements it; otherwise uses the surface's tangent and bitangent vectors to implement the gradient
(however, this approach is generally only meaningful for a surface in three-dimensional space).

The <b>gradient</b> is a vector pointing up and away from the surface.
If the evaluator describes a regular three-dimensional surface (usually
a continuous, unbroken surface such as a sphere, an open
cylinder, or a disk rotated in three dimensions), this can be the cross product
of the tangent vector
and bitangent vector,
in that order. The gradient returned by this method <i>should not</i> be "normalized" to a <a href="tutorial-glmath.md">unit vector</a>.

#### Parameters

* `u` (Type: number)<br>u-coordinate of a point on the surface.
* `v` (Type: number)<br>v-coordinate of a point on the surface.

#### Return Value

An array describing a gradient vector. It should have at least as many
elements as the number of dimensions of the underlying surface. (Type: Array.&lt;number>)

#### Examples

The following example is a surface evaluator
object for a parametric surface with a gradient method. To illustrate how the gradient method is derived
from the vector calculation method, that method is also given later. To
derive the normal calculation, first look at the vector function:

<b>F</b>(u, v) = (cos(u), sin(u), sin(u)\*cos(v))

Then, find the partial derivatives with respect to <i>u</i> and to <i>v</i>:

&#x2202;<b>F</b>/&#x2202;<i>u</i> = (-sin(u), cos(u), cos(u)\*cos(v))<br>
&#x2202;<b>F</b>/&#x2202;<i>v</i> = (0, 0, -sin(v)\*sin(u))

Next, take their cross product:

<b>&Del;F</b>(u, v) = (-sin(v)\*cos(u)\*sin(u), -sin(v)\*sin(u)\*sin(u), 0)<br>

The result is the gradient, which will point up and away from the surface.

    var surface=new Surface({"evaluate":function(u,v) {
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

<a name='H3DU.Surface_normal'></a>
### H3DU.Surface#normal(u, v)

Convenience method for finding an approximate normal vector of this surface at the given u- and v-coordinates.
The <b>normal vector</b> is the same as the gradient vector, but "normalized" to a unit vector.

#### Parameters

* `u` (Type: number)<br>u-coordinate of a point on the surface.
* `v` (Type: number)<br>v-coordinate of a point on the surface.

#### Return Value

An array describing a normal vector. It should have at least as many
elements as the number of dimensions of the underlying surface. (Type: Array.&lt;number>)

<a name='H3DU.Surface_tangent'></a>
### H3DU.Surface#tangent(u, v)

Finds an approximate tangent vector of this surface at the given u- and v-coordinates.
The implementation in Surface calls the evaluator's <code>tangent</code>
method if it implements it; otherwise, does a numerical differentiation
with respect to the u-axis using the <code>evaluate</code> method.

The <b>tangent vector</b> is the vector pointing in the direction of the u-axis,
or alternatively, the partial derivative of the <code>evaluate</code> method with respect to <code>u</code>.
The tangent vector returned by this method <i>should not</i> be "normalized" to a <a href="tutorial-glmath.md">unit vector</a>.

#### Parameters

* `u` (Type: number)<br>u-coordinate of a point on the surface.
* `v` (Type: number)<br>v-coordinate of a point on the surface.

#### Return Value

An array describing a tangent vector. It should have at least as many
elements as the number of dimensions of the underlying surface. (Type: Array.&lt;number>)

[Back to documentation index.](index.md)

# H3DU.BezierSurface

[Back to documentation index.](index.md)

<a name='H3DU.BezierSurface'></a>
### H3DU.BezierSurface(cp, [u1], [u2], [v1], [v2])

**Augments:** <a href="H3DU.Surface.md">H3DU.Surface</a>

<b>Deprecated: Instead of this class, use <a href="H3DU.BSplineSurface.md#H3DU.BSplineSurface.fromBezierSurface">H3DU.BSplineSurface.fromBezierSurface</a>
to create a B&eacute;zier surface.</b>

A <a href="H3DU.Surface.md">surface evaluator object</a> for a B&eacute;zier surface.

#### Parameters

* `cp` (Type: Array.&lt;Array.&lt;Array.&lt;number>>>)<br>An array of control point arrays as specified in <a href="H3DU.BSplineSurface.md#H3DU.BSplineSurface.fromBezierSurface">H3DU.BSplineSurface.fromBezierSurface</a>.
* `u1` (Type: number) (optional)<br>No longer used since version 2.0. The starting and ending points will be (0, 1). (This parameter was the starting point for the purpose of interpolation along the U axis.)
* `u2` (Type: number) (optional)<br>No longer used since version 2.0. The starting and ending points will be (0, 1). (This parameter was the ending point for the purpose of interpolation along the U axis.)
* `v1` (Type: number) (optional)<br>No longer used since version 2.0. The starting and ending points will be (0, 1). (This parameter was the starting point for the purpose of interpolation along the V axis.)
* `v2` (Type: number) (optional)<br>No longer used since version 2.0. The starting and ending points will be (0, 1). (This parameter was the ending point for the purpose of interpolation along the V axis.)

### Methods

* [bitangent](#H3DU.BezierSurface_bitangent)<br>Finds an approximate bitangent vector of this surface at the given U and V coordinates.
* [endPoints](#H3DU.BezierSurface_endPoints)<br>Returns the starting and ending U and V coordinates of this surface.
* [evaluate](#H3DU.BezierSurface_evaluate)<br>Evaluates the surface function based on a point
in a B&eacute;zier surface.
* [gradient](#H3DU.BezierSurface_gradient)<br>Finds an approximate gradient vector of this surface at the given U and V coordinates.
* [normal](#H3DU.BezierSurface_normal)<br>Convenience method for finding an approximate normal vector of this surface at the given U and V coordinates.
* [tangent](#H3DU.BezierSurface_tangent)<br>Finds an approximate tangent vector of this surface at the given U and V coordinates.

<a name='H3DU.BezierSurface_bitangent'></a>
### H3DU.BezierSurface#bitangent(u, v)

Finds an approximate bitangent vector of this surface at the given U and V coordinates.

The implementation in <a href="H3DU.Surface.md">H3DU.Surface</a> calls the evaluator's <code>bitangent</code>
method if it implements it; otherwise, does a numerical differentiation
with respect to the V axis using the <code>evaluate</code> method.

The <b>bitangent vector</b> is the vector pointing in the direction of the V axis, or alternatively,
the partial derivative of the <code>evaluate</code> method with respect to <code>v</code>. The bitangent vector returned by this method <i>should not</i> be "normalized" to a <a href="tutorial-glmath.md">unit vector</a>.

#### Parameters

* `u` (Type: number)<br>U coordinate of a point on the surface.
* `v` (Type: number)<br>V coordinate of a point on the surface.

#### Return Value

An array describing a bitangent vector. It should have at least as many
elements as the number of dimensions of the underlying surface. (Type: Array.&lt;number>)

<a name='H3DU.BezierSurface_endPoints'></a>
### H3DU.BezierSurface#endPoints()

Returns the starting and ending U and V coordinates of this surface.

#### Return Value

A four-element array. The first and second
elements are the starting and ending U coordinates, respectively, of the surface, and the third
and fourth elements are its starting and ending V coordinates. (Type: Array.&lt;number>)

<a name='H3DU.BezierSurface_evaluate'></a>
### H3DU.BezierSurface#evaluate(u, v)

Evaluates the surface function based on a point
in a B&eacute;zier surface.

#### Parameters

* `u` (Type: number)<br>U coordinate of the surface to evaluate (generally within the range given in the constructor).
* `v` (Type: number)<br>V coordinate of the surface to evaluate.

#### Return Value

An array of the result of
the evaluation. It will have as many elements as a control point, as specified in the constructor. (Type: Array.&lt;number>)

<a name='H3DU.BezierSurface_gradient'></a>
### H3DU.BezierSurface#gradient(u, v)

Finds an approximate gradient vector of this surface at the given U and V coordinates.

The implementation in <a href="H3DU.Surface.md">H3DU.Surface</a> calls the evaluator's <code>gradient</code>
method if it implements it; otherwise uses the surface's tangent and bitangent vectors to implement the gradient
(however, this approach is generally only meaningful for a three-dimensional surface).

The <b>gradient</b> is a vector pointing up and away from the surface.
If the evaluator describes a regular three-dimensional surface (usually
a continuous, unbroken surface such as a sphere, an open
cylinder, or a disk rotated in three dimensions), this can be the cross product
of the <a href="H3DU.Surface.md#H3DU.Surface_tangent">tangent vector</a>
and <a href="H3DU.Surface.md#H3DU.Surface_bitangent">bitangent vector</a>,
in that order. The gradient returned by this method <i>should not</i> be "normalized" to a <a href="tutorial-glmath.md">unit vector</a>.

#### Parameters

* `u` (Type: number)<br>U coordinate of a point on the surface.
* `v` (Type: number)<br>V coordinate of a point on the surface.

#### Return Value

An array describing a gradient vector. It should have at least as many
elements as the number of dimensions of the underlying surface. (Type: Array.&lt;number>)

<a name='H3DU.BezierSurface_normal'></a>
### H3DU.BezierSurface#normal(u, v)

Convenience method for finding an approximate normal vector of this surface at the given U and V coordinates.
The <b>normal vector</b> is the same as the gradient vector, but "normalized" to a unit vector.

#### Parameters

* `u` (Type: number)<br>U coordinate of a point on the surface.
* `v` (Type: number)<br>V coordinate of a point on the surface.

#### Return Value

An array describing a normal vector. It should have at least as many
elements as the number of dimensions of the underlying surface. (Type: Array.&lt;number>)

<a name='H3DU.BezierSurface_tangent'></a>
### H3DU.BezierSurface#tangent(u, v)

Finds an approximate tangent vector of this surface at the given U and V coordinates.
The implementation in <a href="H3DU.Surface.md">H3DU.Surface</a> calls the evaluator's <code>tangent</code>
method if it implements it; otherwise, does a numerical differentiation
with respect to the U axis using the <code>evaluate</code> method.

The <b>tangent vector</b> is the vector pointing in the direction of the U axis,
or alternatively, the partial derivative of the <code>evaluate</code> method with respect to <code>u</code>.
The tangent vector returned by this method <i>should not</i> be "normalized" to a <a href="tutorial-glmath.md">unit vector</a>.

#### Parameters

* `u` (Type: number)<br>U coordinate of a point on the surface.
* `v` (Type: number)<br>V coordinate of a point on the surface.

#### Return Value

An array describing a tangent vector. It should have at least as many
elements as the number of dimensions of the underlying surface. (Type: Array.&lt;number>)

[Back to documentation index.](index.md)

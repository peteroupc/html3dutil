# module:extras/superellipsoid.Supershape

[Back to documentation index.](index.md)

<a name='extras_superellipsoid.Supershape'></a>
### new module:extras/superellipsoid.Supershape(m, n1, n2, n3, a, b, rx, ry, phase)

TODO: Not documented yet.

#### Parameters

* `m` (Type: *)<br>TODO: Not documented yet.
* `n1` (Type: *)<br>TODO: Not documented yet.
* `n2` (Type: *)<br>TODO: Not documented yet.
* `n3` (Type: *)<br>TODO: Not documented yet.
* `a` (Type: *)<br>TODO: Not documented yet.
* `b` (Type: *)<br>TODO: Not documented yet.
* `rx` (Type: *)<br>TODO: Not documented yet.
* `ry` (Type: *)<br>TODO: Not documented yet.
* `phase` (Type: *)<br>TODO: Not documented yet.

### Methods

* [roundedPolygon](#extras_superellipsoid.Supershape.roundedPolygon)<br>TODO: Not documented yet.
* [supercircle](#extras_superellipsoid.Supershape.supercircle)<br>TODO: Not documented yet.
* [superellipse](#extras_superellipsoid.Supershape.superellipse)<br>TODO: Not documented yet.
* [superellipse2](#extras_superellipsoid.Supershape.superellipse2)<br>Creates a curve evaluator object for a superellipse (a special
case of a 2-D supershape),
but using Paul Bourke's parameterization (using the circle parametric
equation but raising all sines and cosines to a power of n).
* [superellipsoid](#extras_superellipsoid.Supershape.superellipsoid)<br>TODO: Not documented yet.
* [superellipsoid2](#extras_superellipsoid.Supershape.superellipsoid2)<br>Creates a surface evaluator object for a superellipsoid (a special
case of a 3-D supershape),
but using Paul Bourke's parameterization (using the sphere parametric
equation but raising all sines and cosines to a power of n1 or n2).
* [supershape3D](#extras_superellipsoid.Supershape.supershape3D)<br>TODO: Not documented yet.

<a name='extras_superellipsoid.Supershape.roundedPolygon'></a>
### (static) module:extras/superellipsoid.Supershape.roundedPolygon(sides, rounding, rx, ry)

TODO: Not documented yet.

#### Parameters

* `sides` (Type: *)<br>TODO: Not documented yet.
* `rounding` (Type: *)<br>TODO: Not documented yet.
* `rx` (Type: *)<br>TODO: Not documented yet.
* `ry` (Type: *)<br>TODO: Not documented yet.

#### Return Value

TODO: Not documented yet. (Type: *)

<a name='extras_superellipsoid.Supershape.supercircle'></a>
### (static) module:extras/superellipsoid.Supershape.supercircle(n, rx)

TODO: Not documented yet.

#### Parameters

* `n` (Type: *)<br>TODO: Not documented yet.
* `rx` (Type: *)<br>TODO: Not documented yet.

#### Return Value

TODO: Not documented yet. (Type: *)

<a name='extras_superellipsoid.Supershape.superellipse'></a>
### (static) module:extras/superellipsoid.Supershape.superellipse(n, rx, ry)

TODO: Not documented yet.

#### Parameters

* `n` (Type: *)<br>TODO: Not documented yet.
* `rx` (Type: *)<br>TODO: Not documented yet.
* `ry` (Type: *)<br>TODO: Not documented yet.

#### Return Value

TODO: Not documented yet. (Type: *)

<a name='extras_superellipsoid.Supershape.superellipse2'></a>
### (static) module:extras/superellipsoid.Supershape.superellipse2(n, rx, ry)

Creates a curve evaluator object for a superellipse (a special
case of a 2-D supershape),
but using Paul Bourke's parameterization (using the circle parametric
equation but raising all sines and cosines to a power of n).

#### Parameters

* `n` (Type: number)<br>Exponent for the sines and cosines in the superellipse equation. A value of 1 forms a circle, values approaching 0 have the circle approach a square, and values approaching infinity have the circle approach a plus sign.
* `rx` (Type: number)<br>Radius along the x-axis of the figure.
* `ry` (Type: number)<br>Radius along the y-axis of the figure.

#### Return Value

Curve evaluator object for a superellipse curve. (Type: Object)

<a name='extras_superellipsoid.Supershape.superellipsoid'></a>
### (static) module:extras/superellipsoid.Supershape.superellipsoid(n1, n2, rx, ry, rz, phase)

TODO: Not documented yet.

#### Parameters

* `n1` (Type: *)<br>TODO: Not documented yet.
* `n2` (Type: *)<br>TODO: Not documented yet.
* `rx` (Type: *)<br>TODO: Not documented yet.
* `ry` (Type: *)<br>TODO: Not documented yet.
* `rz` (Type: *)<br>TODO: Not documented yet.
* `phase` (Type: *)<br>TODO: Not documented yet.

#### Return Value

TODO: Not documented yet. (Type: *)

<a name='extras_superellipsoid.Supershape.superellipsoid2'></a>
### (static) module:extras/superellipsoid.Supershape.superellipsoid2(n1, n2, rx, ry, rz)

Creates a surface evaluator object for a superellipsoid (a special
case of a 3-D supershape),
but using Paul Bourke's parameterization (using the sphere parametric
equation but raising all sines and cosines to a power of n1 or n2).

#### Parameters

* `n1` (Type: number)<br>Exponent for the sines and cosines along the v-axis.
* `n2` (Type: number)<br>Exponent for the sines and cosines along the u-axis.
* `rx` (Type: number)<br>Radius along the x-axis of the figure.
* `ry` (Type: number)<br>Radius along the y-axis of the figure.
* `rz` (Type: number)<br>Radius along the z-axis of the figure.

#### Return Value

Surface evaluator object for a superellipsoid. (Type: Object)

<a name='extras_superellipsoid.Supershape.supershape3D'></a>
### (static) module:extras/superellipsoid.Supershape.supershape3D(m, n1, n2, n3, a, b, rx, ry, phase)

TODO: Not documented yet.

#### Parameters

* `m` (Type: *)<br>TODO: Not documented yet.
* `n1` (Type: *)<br>TODO: Not documented yet.
* `n2` (Type: *)<br>TODO: Not documented yet.
* `n3` (Type: *)<br>TODO: Not documented yet.
* `a` (Type: *)<br>TODO: Not documented yet.
* `b` (Type: *)<br>TODO: Not documented yet.
* `rx` (Type: *)<br>TODO: Not documented yet.
* `ry` (Type: *)<br>TODO: Not documented yet.
* `phase` (Type: *)<br>TODO: Not documented yet.

#### Return Value

TODO: Not documented yet. (Type: *)

[Back to documentation index.](index.md)

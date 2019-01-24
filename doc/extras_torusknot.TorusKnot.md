# module:extras/torusknot.TorusKnot

[Back to documentation index.](index.md)

<a name='extras_torusknot.TorusKnot'></a>
### new module:extras/torusknot.TorusKnot(revolutions, r, q, s1, m1)

A curve evaluator object for a torus knot or torus-knot-like curve.
Uses the formula given in "Decorative Knot Patterns"
by L. D. Taylor, 2011.

#### Parameters

* `revolutions` (Type: number)<br>Integer greater than 0. Labeled 'p' by Taylor.
* `r` (Type: Array.&lt;number>)<br>Array of integers and/or non-integers.
* `q` (Type: Array.&lt;number>)<br>Array of integers. Lowest 'q' is the number of equal "parts" of the torus knot.
* `s1` (Type: number)<br>Integer or non-integer parameter.
* `m1` (Type: number)<br>Integer parameter.

### Methods

* [interlaced](#extras_torusknot_TorusKnot.interlaced)<br>TODO: Not documented yet.
* [simple](#extras_torusknot_TorusKnot.simple)<br>Generates a torus knot with simple parameters.

<a name='extras_torusknot_TorusKnot.interlaced'></a>
### (static) module:extras/torusknot~TorusKnot.interlaced(p, q, r1, s1)

TODO: Not documented yet.

#### Parameters

* `p` (Type: number)<br>Integer greater than 0 giving the number of revolutions.
* `q` (Type: number)<br>Integer greater than 0 giving the number of loop crossings.
* `r1` (Type: *)
* `s1` (Type: *)

#### Return Value

The resulting torus knot evaluator. (Type: TorusKnot)

<a name='extras_torusknot_TorusKnot.simple'></a>
### (static) module:extras/torusknot~TorusKnot.simple(p, q, r1)

Generates a torus knot with simple parameters.

#### Parameters

* `p` (Type: number)<br>Integer greater than 0 giving the number of revolutions.
* `q` (Type: number)<br>Integer greater than 0 giving the number of loop crossings.
* `r1` (Type: *)

#### Return Value

The resulting torus knot evaluator. (Type: TorusKnot)

[Back to documentation index.](index.md)

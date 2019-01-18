# module:extras/fourierknot

[Back to documentation index.](index.md)

<a name='extras_fourierknot'></a>
### module:extras/fourierknot()

The <code>extras/fourierknot.js</code> module.
To import all symbols in this module, either of the following can be used:

    import * from "extras/fourierknot.js";
    // -- or --
    import * as CustomModuleName from "extras/fourierknot.js";

### Methods

* [FourierKnot](#extras_fourierknot.FourierKnot)<br>A curve evaluator object that calculates a knot in the form of the Fourier series

<b>F</b>(u) = &Sigma;<sub>i=1, n</sub> <b>a</b> cos(<i>iu</i>) + <b>b</b> sin(<i>iu</i>).

<a name='extras_fourierknot.FourierKnot'></a>
### (static) module:extras/fourierknot.FourierKnot(a, b)

A curve evaluator object that calculates a knot in the form of the Fourier series

<b>F</b>(u) = &Sigma;<sub>i=1, n</sub> <b>a</b> cos(<i>iu</i>) + <b>b</b> sin(<i>iu</i>).

#### Parameters

* `a` (Type: Array.&lt;Array.&lt;number>>)<br>The cosine coefficients.
* `b` (Type: Array.&lt;Array.&lt;number>>)<br>The sine coefficients.

[Back to documentation index.](index.md)

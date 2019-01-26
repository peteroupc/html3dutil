# module:extras/derivedcurves

[Back to documentation index.](index.md)

<a name='extras_derivedcurves'></a>
### module:extras/derivedcurves()

Additional curve evaluator and surface evaluator objects.

To import all symbols in this module, either of the following can be used:

    import * from "extras/derivedcurves.js";
    // -- or --
    import * as CustomModuleName from "extras/derivedcurves.js";

### Methods

* [curveInverse](#extras_derivedcurves.curveInverse)<br>Creates a curve evaluator object for TODO: Not documented yet.
* [curvePedalCurve](#extras_derivedcurves.curvePedalCurve)<br>Creates a curve evaluator object for TODO: Not documented yet.
* [polarCurve](#extras_derivedcurves.polarCurve)<br>Creates a curve evaluator object for a <i>polar curve</i>, a curve generated from its polar coordinates using a <i>polar function</i>, a function that determines a point's radius given its angle.
* [spiralCurve](#extras_derivedcurves.spiralCurve)<br>Creates a curve evaluator object for TODO: Not documented yet.

<a name='extras_derivedcurves.curveInverse'></a>
### (static) module:extras/derivedcurves.curveInverse(evaluator, ox, oy, radius)

Creates a curve evaluator object for TODO: Not documented yet.

#### Parameters

* `evaluator` (Type: Curve | Object)<br>A curve evaluator object for TODO: Not documented yet.
* `ox` (Type: *)
* `oy` (Type: *)
* `radius` (Type: *)

#### Return Value

The resulting curve evaluator object. (Type: Object)

<a name='extras_derivedcurves.curvePedalCurve'></a>
### (static) module:extras/derivedcurves.curvePedalCurve(evaluator, ox, oy)

Creates a curve evaluator object for TODO: Not documented yet.

#### Parameters

* `evaluator` (Type: Curve | Object)<br>A curve evaluator object for TODO: Not documented yet.
* `ox` (Type: *)
* `oy` (Type: *)

#### Return Value

The resulting curve evaluator object. (Type: Object)

<a name='extras_derivedcurves.polarCurve'></a>
### (static) module:extras/derivedcurves.polarCurve(func, phase)

Creates a curve evaluator object for a <i>polar curve</i>, a curve generated from its polar coordinates using a <i>polar function</i>, a function that determines a point's radius given its angle.

#### Parameters

* `func`
* `phase` (Type: number)<br>Starting angle of the curve. If null, undefined, or omitted, the default is 0.

#### Return Value

The resulting curve evaluator object. (Type: Object)

<a name='extras_derivedcurves.spiralCurve'></a>
### (static) module:extras/derivedcurves.spiralCurve(radius, phase)

Creates a curve evaluator object for TODO: Not documented yet.

#### Parameters

* `radius` (Type: *)
* `phase` (Type: *)

#### Return Value

The resulting curve evaluator object. (Type: Object)

[Back to documentation index.](index.md)

# module:extras/gradients

[Back to documentation index.](index.md)

<a name='extras_gradients'></a>
### module:extras/gradients()

The <code>extras/gradients.js</code> module.
To import all symbols in this module, either of the following can be used:

    import * from "extras/gradients.js";
    // -- or --
    import * as CustomModuleName from "extras/gradients.js";

### Methods

* [horizontalGradient](#extras_gradients.horizontalGradient)<br>Generates a 32x32 bitmap of a linear gradient in the horizontal direction.
* [radialGradient](#extras_gradients.radialGradient)<br>Generates a 32x32 bitmap of a radial gradient.

<a name='extras_gradients.horizontalGradient'></a>
### (static) module:extras/gradients.horizontalGradient(color1, color2)

Generates a 32x32 bitmap of a linear gradient in the horizontal direction. This function demonstrates generating a custom texture.

#### Parameters

* `color1` (Type: Array.&lt;number> | number | string)<br>A color vector or string identifying the color at the left edge of the gradient.
* `color2` (Type: Array.&lt;number> | number | string)<br>A color vector or string identifying the color at the right edge of the gradient.

#### Return Value

An array with 32x32x4 bytes, arranged in 32 rows of 32 pixels
of 4 bytes each. For each pixel, the four bytes are color components
in the following order: red, green, blue, alpha. (Type: UInt8Array)

<a name='extras_gradients.radialGradient'></a>
### (static) module:extras/gradients.radialGradient(colorCenter, colorEdges)

Generates a 32x32 bitmap of a radial gradient. This function demonstrates generating a custom texture.

#### Parameters

* `colorCenter` (Type: Array.&lt;number> | number | string)<br>A color vector or string identifying the color at the center of the gradient.
* `colorEdges` (Type: Array.&lt;number> | number | string)<br>A color vector or string identifying the color at the edges of the gradient.

#### Return Value

An array with 32x32x4 bytes, arranged in 32 rows of 32 pixels
of 4 bytes each. For each pixel, the four bytes are color components
in the following order: red, green, blue, alpha. (Type: UInt8Array)

[Back to documentation index.](index.md)

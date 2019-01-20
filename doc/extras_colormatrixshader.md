# module:extras/colormatrixshader

[Back to documentation index.](index.md)

<a name='extras_colormatrixshader'></a>
### module:extras/colormatrixshader()

The <code>extras/colormatrixshader.js</code> module.
To import all symbols in this module, either of the following can be used:

    import * from "extras/colormatrixshader.js";
    // -- or --
    import * as CustomModuleName from "extras/colormatrixshader.js";

### Members

* [colorMatrixShader](#extras_colormatrixshader.colorMatrixShader)<br>GLSL shader data for a family of image processing filters, which modify colors based on a transformation matrix, a 4x4 matrix that is multiplied by the red/green/blue color to get a new color.

### Methods

* [getColorMatrix](#extras_colormatrixshader.getColorMatrix)<br>Gets a specific kind of color matrix for the color
matrix shader.

<a name='extras_colormatrixshader.colorMatrixShader'></a>
### module:extras/colormatrixshader.colorMatrixShader (constant)

GLSL shader data for a family of image processing filters, which modify colors based on a transformation matrix, a 4x4 matrix that is multiplied by the red/green/blue color to get a new color. The shader program takes three uniforms: "sampler", which
is the input texture, "t", a value from 0 to 1 indicating how strongly to
apply the color matrix, and "matrix", which is the 4x4 matrix just described.

<a name='extras_colormatrixshader.getColorMatrix'></a>
### (static) module:extras/colormatrixshader.getColorMatrix(kind)

Gets a specific kind of color matrix for the color
matrix shader.

#### Parameters

* `kind` (Type: string)<br>One of the following:<ul> <li>"grayscale" - Filter that averages the red, green, and blue components to result in black, white, or a shade of gray. <li>"boosted-red" - Filter that boosts the red component of the input. <li>"boosted-blue" - Filter that boosts the blue component of the input. <li>"sepia" or "sepia2" - One of two filters that adjust the colors of the image to achieve a sepia coloring. <li>"invert" - Filter that inverts the colors of the input so the effect looks like a film negative. </ul>

#### Return Value

4x4 color matrix. (Type: Array.&lt;number>)

[Back to documentation index.](index.md)

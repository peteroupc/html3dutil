# module:extras/shaders/radgradshader

[Back to documentation index.](index.md)

<a name='extras_shaders_radgradshader'></a>
### module:extras/shaders/radgradshader()

The <code>extras/shaders/radgradshader.js</code> module.
To import all symbols in this module, either of the following can be used:

    import * from "extras/shaders/radgradshader.js";
    // -- or --
    import * as CustomModuleName from "extras/shaders/radgradshader.js";

### Members

* [radialGradientShader](#extras_shaders_radgradshader.radialGradientShader)<br>GLSL shader code for a screen-space radial gradient.

<a name='extras_shaders_radgradshader.radialGradientShader'></a>
### module:extras/shaders/radgradshader.radialGradientShader (constant)

GLSL shader code for a screen-space radial gradient.
It takes the following uniforms: "colorCenter" is a 4-element array
giving the red, green, blue, and alpha components, in that order,
of the color at the center; and "colorEdges" is those same components
of the color at the edges.

[Back to documentation index.](index.md)

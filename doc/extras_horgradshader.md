# module:extras/horgradshader

[Back to documentation index.](index.md)

<a name='extras_horgradshader'></a>
### module:extras/horgradshader()

The <code>extras/horgradshader.js</code> module.
To import all symbols in this module, either of the following can be used:

    import * from "extras/horgradshader.js";
    // -- or --
    import * as CustomModuleName from "extras/horgradshader.js";

### Members

* [horGradientShader](#extras_horgradshader.horGradientShader)<br>GLSL shader code for a screen-space horizontal gradient.

<a name='extras_horgradshader.horGradientShader'></a>
### module:extras/horgradshader.horGradientShader

GLSL shader code for a screen-space horizontal gradient.
It takes the following uniforms: "color1" is a 4-element array
giving the red, green, blue, and alpha components, in that order,
of the left-hand color; and "color2" is those same components
of the right-hand color.

[Back to documentation index.](index.md)

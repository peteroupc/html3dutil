# module:extras/shaders/horgradshader

[Back to documentation index.](index.md)

<a name='extras_shaders_horgradshader'></a>
### module:extras/shaders/horgradshader()

Horizontal gradient shader.
To import all symbols in this module, either of the following can be used:

    import * from "extras/shaders/horgradshader.js";
    // -- or --
    import * as CustomModuleName from "extras/shaders/horgradshader.js";

### Members

* [horGradientShader](#extras_shaders_horgradshader.horGradientShader)<br>GLSL shader code for a screen-space horizontal gradient.

<a name='extras_shaders_horgradshader.horGradientShader'></a>
### module:extras/shaders/horgradshader.horGradientShader (constant)

GLSL shader code for a screen-space horizontal gradient.
It takes the following uniforms: "color1" is a 4-element array
giving the red, green, blue, and alpha components, in that order,
of the left-hand color; and "color2" is those same components
of the right-hand color.

[Back to documentation index.](index.md)

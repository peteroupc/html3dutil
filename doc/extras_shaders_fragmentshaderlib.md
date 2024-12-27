# module:extras/shaders/fragmentshaderlib

[Back to documentation index.](index.md)

<a name='extras_shaders_fragmentshaderlib'></a>
### module:extras/shaders/fragmentshaderlib()

The <code>extras/shaders/fragmentshaderlib.js</code> module.
To import all symbols in this module, either of the following can be used:

    import * from "extras/shaders/fragmentshaderlib.js";
    // -- or --
    import * as CustomModuleName from "extras/shaders/fragmentshaderlib.js";

### Methods

* [fragmentShaderLib](#extras_shaders_fragmentshaderlib.fragmentShaderLib)<br>Returns GLSL shader code for several useful functions
for shaders, especially fragment shaders.

<a name='extras_shaders_fragmentshaderlib.fragmentShaderLib'></a>
### (static) module:extras/shaders/fragmentshaderlib.fragmentShaderLib()

Returns GLSL shader code for several useful functions
for shaders, especially fragment shaders.
TODO: Not documented fully yet.
Contains the following functions:<ul>
<li><code>float rand(float seed)</code>: Generates a randomized
hash of a number, in the interval [0, 1).
<li><code>float rand(vec2 seed)</code>: Generates a randomized
hash of a two-number vector, in the interval [0, 1).
<li><code>float rand(vec3 seed)</code>: Generates a randomized
hash of a three-number vector, in the interval [0, 1).
<li><code>float signedrand(float seed)</code>: Generates a randomized
hash of a number, in the interval [-1, 1).
<li><code>float signedrand(vec2 seed)</code>: Generates a randomized
hash of a two-number vector, in the interval [-1, 1).
<li><code>float signedrand(vec3 seed)</code>: Generates a randomized
hash of a three-number vector, in the interval [-1, 1).
</ul>

#### Return Value

The GLSL shader code. (Type: string)

[Back to documentation index.](index.md)

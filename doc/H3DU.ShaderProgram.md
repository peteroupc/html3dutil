# H3DU.ShaderProgram

[Back to documentation index.](index.md)

 <a name='H3DU.ShaderProgram'></a>
### H3DU.ShaderProgram(context, [vertexShader], [fragmentShader])

<b>Deprecated: This class is likely to become a private class.
Use the <a href="H3DU.ShaderInfo.md">H3DU.ShaderInfo</a> class instead, which is not coupled to WebGL
contexts.</b>

Represents a WebGL shader program. A shader program in
WebGL consists of a vertex shader (which processes vertices),
and a fragment shader (which processes pixels). Shader programs
are specially designed for running on a graphics processing unit,
or GPU.

When the H3DU.ShaderProgram constructor is called, it will compile
and link a shader program from the source text passed to it, but
it won't use that program until the use() method is called. If the
program is compiled and linked successfully, the constructor
will also gather a list of the program's attributes (vertex-specific variables
in vertex buffer objects) and uniforms (variables not specific to a vertex).

If compiling or linking the shader program fails, a diagnostic
log is output to the JavaScript console.

#### Parameters

* `context` (Type: WebGLRenderingContext | WebGL2RenderingContext | object)<br>
    A WebGL context to associate with this scene, or an object, such as <a href="H3DU.Scene3D.md">H3DU.Scene3D</a>, that implements a no-argument <code>getContext</code> method that returns a WebGL context.
* `vertexShader` (Type: String) (optional)<br>
    Source text of a vertex shader, in OpenGL ES Shading Language (GLSL). If null, a default vertex shader is used instead.
* `fragmentShader` (Type: String) (optional)<br>
    Source text of a fragment shader in GLSL. If null, a default fragment shader is used instead.

### Methods

* [.getDefaultFragment](#H3DU.ShaderProgram.getDefaultFragment)<br><b>Deprecated: Use <a href="H3DU.ShaderInfo.md#H3DU.ShaderInfo.getDefaultFragment">H3DU.ShaderInfo.getDefaultFragment</a> instead.</b>
* [.getDefaultVertex](#H3DU.ShaderProgram.getDefaultVertex)<br><b>Deprecated: Use <a href="H3DU.ShaderInfo.md#H3DU.ShaderInfo.getDefaultVertex">H3DU.ShaderInfo.getDefaultVertex</a> instead.</b>
* [.getEdgeDetectEffect](#H3DU.ShaderProgram.getEdgeDetectEffect)<br><b>Deprecated: Use <a href="H3DU.ShaderInfo.md#H3DU.ShaderInfo.makeEdgeDetectEffect">H3DU.ShaderInfo.makeEdgeDetectEffect</a> instead.</b>
* [.getInvertEffect](#H3DU.ShaderProgram.getInvertEffect)<br><b>Deprecated: Use <a href="H3DU.ShaderInfo.md#H3DU.ShaderInfo.makeInvertEffect">H3DU.ShaderInfo.makeInvertEffect</a> instead.</b>
* [.makeCopyEffect](#H3DU.ShaderProgram.makeCopyEffect)<br><b>Deprecated: Use <a href="H3DU.ShaderInfo.md#H3DU.ShaderInfo.makeCopyEffect">H3DU.ShaderInfo.makeCopyEffect</a> instead.</b>
* [.makeEffect](#H3DU.ShaderProgram.makeEffect)<br><b>Deprecated: Use <a href="H3DU.ShaderInfo.md#H3DU.ShaderInfo.makeEffect">H3DU.ShaderInfo.makeEffect</a> instead.</b>
* [.makeEffectFragment](#H3DU.ShaderProgram.makeEffectFragment)<br><b>Deprecated: Use <a href="H3DU.ShaderInfo.md#H3DU.ShaderInfo.makeEffectFragment">H3DU.ShaderInfo.makeEffectFragment</a> instead.</b>
* [setSemantic](#H3DU.ShaderProgram_H3DU.ShaderInfo_setSemantic)<br>TODO: Not documented yet.
* [dispose](#H3DU.ShaderProgram_H3DU.ShaderProgram_dispose)<br>Disposes resources from this shader program.
* [get](#H3DU.ShaderProgram_H3DU.ShaderProgram_get)<br>Gets the location of the given uniform or attribute's name in this program.
* [getContext](#H3DU.ShaderProgram_H3DU.ShaderProgram_getContext)<br>Gets the WebGL context associated with this shader program object.
* [getUniform](#H3DU.ShaderProgram_H3DU.ShaderProgram_getUniform)<br>Gets the value of the given uniform in this program.
* [setUniforms](#H3DU.ShaderProgram_H3DU.ShaderProgram_setUniforms)<br>Sets the values of one or more uniforms in this program.
* [use](#H3DU.ShaderProgram_H3DU.ShaderProgram_use)<br>Makes this program the active program in the WebGL
context associated with it.

 <a name='H3DU.ShaderProgram.getDefaultFragment'></a>
### H3DU.ShaderProgram.getDefaultFragment()

<b>Deprecated: Use <a href="H3DU.ShaderInfo.md#H3DU.ShaderInfo.getDefaultFragment">H3DU.ShaderInfo.getDefaultFragment</a> instead.</b>

Gets the text of the default fragment shader. Putting "#define SHADING\n"
at the start of the return value enables the lighting model.
Putting "#define SPECULAR\n"
at the start of the return value enables specular highlights (as long
as SHADING is also enabled).

#### Return Value

The resulting shader text. (Type: String)

 <a name='H3DU.ShaderProgram.getDefaultVertex'></a>
### H3DU.ShaderProgram.getDefaultVertex()

<b>Deprecated: Use <a href="H3DU.ShaderInfo.md#H3DU.ShaderInfo.getDefaultVertex">H3DU.ShaderInfo.getDefaultVertex</a> instead.</b>

Gets the text of the default vertex shader. Putting "#define SHADING\n"
at the start of the return value enables the lighting model.

#### Return Value

The resulting shader text. (Type: String)

 <a name='H3DU.ShaderProgram.getEdgeDetectEffect'></a>
### H3DU.ShaderProgram.getEdgeDetectEffect([context])

<b>Deprecated: Use <a href="H3DU.ShaderInfo.md#H3DU.ShaderInfo.makeEdgeDetectEffect">H3DU.ShaderInfo.makeEdgeDetectEffect</a> instead.</b>

Generates a shader program that generates a two-color texture showing
the source texture's edges.

#### Parameters

* `context` (Type: Object) (optional)<br>
    No longer used; ignored.

#### Return Value

The resulting shader program. (Type: <a href="H3DU.ShaderInfo.md">H3DU.ShaderInfo</a>)

 <a name='H3DU.ShaderProgram.getInvertEffect'></a>
### H3DU.ShaderProgram.getInvertEffect([context])

<b>Deprecated: Use <a href="H3DU.ShaderInfo.md#H3DU.ShaderInfo.makeInvertEffect">H3DU.ShaderInfo.makeInvertEffect</a> instead.</b>

Generates a shader program that inverts the colors of a texture.

#### Parameters

* `context` (Type: Object) (optional)<br>
    No longer used; ignored.

#### Return Value

The resulting shader program. (Type: <a href="H3DU.ShaderInfo.md">H3DU.ShaderInfo</a>)

 <a name='H3DU.ShaderProgram.makeCopyEffect'></a>
### H3DU.ShaderProgram.makeCopyEffect()

<b>Deprecated: Use <a href="H3DU.ShaderInfo.md#H3DU.ShaderInfo.makeCopyEffect">H3DU.ShaderInfo.makeCopyEffect</a> instead.</b>

Generates a shader program that copies the colors of a texture.

#### Return Value

The resulting shader program. (Type: <a href="H3DU.ShaderInfo.md">H3DU.ShaderInfo</a>)

 <a name='H3DU.ShaderProgram.makeEffect'></a>
### H3DU.ShaderProgram.makeEffect(context, functionCode)

<b>Deprecated: Use <a href="H3DU.ShaderInfo.md#H3DU.ShaderInfo.makeEffect">H3DU.ShaderInfo.makeEffect</a> instead.</b>

Generates a shader program for applying
a raster effect (postprocessing effect) to a texture.

#### Parameters

* `context` (Type: Object)<br>
    No longer used; ignored.
* `functionCode` (Type: String)<br>
    A string giving shader code in OpenGL ES Shading Language (GLSL) that must contain a function with the following signature:

    vec4 textureEffect(sampler2D sampler, vec2 uvCoord, vec2 textureSize)

 where <code>sampler</code> is the texture sampler, <code>uvCoord</code> is the texture coordinates ranging from 0 to 1 in each component, <code>textureSize</code> is the dimensions of the texture in pixels, and the return value is the new color at the given texture coordinates. Besides this requirement, the shader code is also free to define additional uniforms, constants, functions, and so on (but not another "main" function).

#### Return Value

The resulting shader program. (Type: <a href="H3DU.ShaderInfo.md">H3DU.ShaderInfo</a>)

 <a name='H3DU.ShaderProgram.makeEffectFragment'></a>
### H3DU.ShaderProgram.makeEffectFragment(functionCode)

<b>Deprecated: Use <a href="H3DU.ShaderInfo.md#H3DU.ShaderInfo.makeEffectFragment">H3DU.ShaderInfo.makeEffectFragment</a> instead.</b>

Generates source code for a fragment shader for applying
a raster effect to a texture.

#### Parameters

* `functionCode` (Type: String)<br>
    See H3DU.ShaderProgram.makeEffect().

#### Return Value

The source text of the resulting fragment shader. (Type: String)

 <a name='H3DU.ShaderProgram_H3DU.ShaderInfo_setSemantic'></a>
### H3DU.ShaderInfo#setSemantic(name, sem, index)

TODO: Not documented yet.

#### Parameters

* `name` (Type: *)
* `sem` (Type: *)
* `index` (Type: *)

#### Return Value

Return value. (Type: *)

 <a name='H3DU.ShaderProgram_H3DU.ShaderProgram_dispose'></a>
### H3DU.ShaderProgram#dispose()

Disposes resources from this shader program.

#### Return Value

Return value. (Type: void)

 <a name='H3DU.ShaderProgram_H3DU.ShaderProgram_get'></a>
### H3DU.ShaderProgram#get(name)

Gets the location of the given uniform or attribute's name in this program.
(Although the location may change each time the shader program
is linked, that normally only happens upon construction
in the case of H3DU.ShaderInfo.)

#### Parameters

* `name` (Type: String)<br>
    The name of an attribute or uniform defined in either the vertex or fragment shader of this shader program. If the uniform or attribute is an array, each element in the array is named as in these examples: "unif[0]", "unif[1]". If it's a struct, each member in the struct is named as in these examples: "unif.member1", "unif.member2". If it's an array of struct, each member is named as in these examples: "unif[0].member1", "unif[0].member2".

#### Return Value

The location of the uniform or attribute
name, or null if it doesn't exist. (Type: number | WebGLUniformLocation | null)

 <a name='H3DU.ShaderProgram_H3DU.ShaderProgram_getContext'></a>
### H3DU.ShaderProgram#getContext()

Gets the WebGL context associated with this shader program object.

#### Return Value

Return value. (Type: WebGLRenderingContext | WebGL2RenderingContext)

 <a name='H3DU.ShaderProgram_H3DU.ShaderProgram_getUniform'></a>
### H3DU.ShaderProgram#getUniform(name)

Gets the value of the given uniform in this program. This method
may be called at any time, even if this program is not currently the
active program in the WebGL context.

#### Parameters

* `name` (Type: String)<br>
    The name of a uniform defined in either the vertex or fragment shader of this shader program. See get().

#### Return Value

The uniform's value, or null if it doesn't exist or if
an attribute is named, not a uniform. (Type: Number | Array.&lt;Number>)

 <a name='H3DU.ShaderProgram_H3DU.ShaderProgram_setUniforms'></a>
### H3DU.ShaderProgram#setUniforms(uniforms)

Sets the values of one or more uniforms in this program.
If this program is not the active program in the WebGL context,
saves their values until the next time this object's "use" method is called.

#### Parameters

* `uniforms` (Type: Object)<br>
    An object whose keys are the names of uniforms defined in either the vertex or fragment shader of this shader program. If the uniform is an array, each element in the array is named as in these examples: "unif[0]", "unif[1]". If it's a struct, each member in the struct is named as in these examples: "unif.member1", "unif.member2". If it's an array of struct, each member is named as in these examples: "unif[0].member1", "unif[0].member2". The value of each key depends on the data type expected for the uniform named by that key. The value can be a 3-, 4-, 9-, or 16-element array if the uniform is a "vec3", "vec4", "mat3", or "mat4", respectively, or a Number if the uniform is a "float" or "int".

#### Return Value

This object. (Type: <a href="H3DU.ShaderProgram.md">H3DU.ShaderProgram</a>)

 <a name='H3DU.ShaderProgram_H3DU.ShaderProgram_use'></a>
### H3DU.ShaderProgram#use()

Makes this program the active program in the WebGL
context associated with it. If any uniforms were saved to
be written later (because this program wasn't active in
the WebGL context when the "setUniforms" method
was called), sets their values now.

#### Return Value

This object. (Type: <a href="H3DU.ShaderProgram.md">H3DU.ShaderProgram</a>)

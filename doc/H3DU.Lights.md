# H3DU.Lights

[Back to documentation index.](index.md)

<a name='H3DU.Lights'></a>
### H3DU.Lights()

A collection of light sources. It stores the scene's
ambient color as well as data on one or more light sources.
When constructed, the list of light sources will be empty.

NOTE: The default shader program assumes that all colors specified in this object are in
<a href="H3DU.Math.md#H3DU.Math.colorTosRGB">companded sRGB</a>.

### Members

* [MAX_LIGHTS](#H3DU.Lights.MAX_LIGHTS)<br>Maximum number of lights supported
by the default shader program.
* [sceneAmbient](#H3DU.Lights_sceneAmbient)<br>Ambient color for the scene.

### Methods

* [getCount](#H3DU.Lights_getCount)<br>Gets the number of lights defined in this object.
* [getLight](#H3DU.Lights_getLight)<br>Gets information about the light source at the given index.
* [setAmbient](#H3DU.Lights_setAmbient)<br>Sets the color of the scene's ambient light.
* [setBasic](#H3DU.Lights_setBasic)<br>Resets this object to a basic configuration for
light sources: one light source with its default
values, and the default value for <code>sceneAmbient</code>.
* [setDirectionalLight](#H3DU.Lights_setDirectionalLight)<br>Sets a directional light.
* [setParams](#H3DU.Lights_setParams)<br>Sets parameters for the light source at the given index.
* [setPointLight](#H3DU.Lights_setPointLight)<br>Sets a point light.

<a name='H3DU.Lights.MAX_LIGHTS'></a>
### H3DU.Lights.MAX_LIGHTS (constant)

Maximum number of lights supported
by the default shader program.

Default Value: `3`

<a name='H3DU.Lights_sceneAmbient'></a>
### H3DU.Lights#sceneAmbient

Ambient color for the scene. This is the color of the light
that shines on every part of every object equally and in
every direction. In the absence of
other lighting effects, all objects will be given this color.

<small>Ambient light is a simplified simulation of the
real-world effect of light bouncing back and forth between
many different objects in an area. One example of this
phenomenon is sunlight reaching an indoor room without
directly hitting it, such that the sunlight bounces off the walls
and so illuminates most of the room pretty much uniformly.
Ambient lights simulate this phenomenon.</small>

NOTE: In the default shader program, this property is
only used on objects that use <a href="H3DU.Material.md">H3DU.Material</a>, not <a href="H3DU.PbrMaterial.md">H3DU.PbrMaterial</a>.

Default Value: `"[0.2,0.2,0.2]"`

<a name='H3DU.Lights_getCount'></a>
### H3DU.Lights#getCount()

Gets the number of lights defined in this object.

#### Return Value

Return value. (Type: number)

<a name='H3DU.Lights_getLight'></a>
### H3DU.Lights#getLight(index)

Gets information about the light source at the given index.

#### Parameters

* `index` (Type: number)<br>Zero-based index of the light to set. The first light has index 0, the second has index 1, and so on. If the light doesn't exist at that index, it will be created.

#### Return Value

The corresponding light source object. (Type: <a href="H3DU.LightSource.md">H3DU.LightSource</a>)

<a name='H3DU.Lights_setAmbient'></a>
### H3DU.Lights#setAmbient(r, g, b, [a])

Sets the color of the scene's ambient light.

#### Parameters

* `r` (Type: Array.&lt;number> | number | string)<br>Array of three or four color components; or the red color component (0-1); or a string specifying an <a href="H3DU.md#H3DU.toGLColor">HTML or CSS color</a>.
* `g` (Type: number)<br>Green color component (0-1). May be null or omitted if a string or array is given as the "r" parameter.
* `b` (Type: number)<br>Blue color component (0-1). May be null or omitted if a string or array is given as the "r" parameter.
* `a` (Type: number) (optional)<br>Alpha color component (0-1). Currently not used.

#### Return Value

This object. (Type: <a href="H3DU.Lights.md">H3DU.Lights</a>)

<a name='H3DU.Lights_setBasic'></a>
### H3DU.Lights#setBasic()

Resets this object to a basic configuration for
light sources: one light source with its default
values, and the default value for <code>sceneAmbient</code>.

#### Return Value

This object. (Type: <a href="H3DU.Lights.md">H3DU.Lights</a>)

<a name='H3DU.Lights_setDirectionalLight'></a>
### H3DU.Lights#setDirectionalLight(index, direction, [diffuse], [specular])

Sets a directional light.

#### Parameters

* `index` (Type: number)<br>Zero-based index of the light to set. The first light has index 0, the second has index 1, and so on. If the light doesn't exist at that index, it will be created.
* `direction` (Type: Array.&lt;number>)<br>A 3-element array giving the X, Y, and Z world space components, respectively, of the a vector; the light will shine the brightest on surfaces that face the light in this vector's direction from the origin (0, 0, 0).
* `diffuse` (Type: Array.&lt;number>) (optional)<br>A <a href="H3DU.md#H3DU.toGLColor">color vector or string</a> giving the diffuse color of the light. If null, undefined, or omitted, the diffuse color will remain unchanged. The default is (1, 1, 1, 1) for light index 0 and (0, 0, 0, 0) otherwise.
* `specular` (Type: Array.&lt;number>) (optional)<br>A <a href="H3DU.md#H3DU.toGLColor">color vector or string</a> giving the color of specular highlights caused by the light. If null, undefined, or omitted, the specular highlight color will remain unchanged. The default is (1, 1, 1) for light index 0 and (0, 0, 0) otherwise.

#### Return Value

This object. (Type: <a href="H3DU.Lights.md">H3DU.Lights</a>)

<a name='H3DU.Lights_setParams'></a>
### H3DU.Lights#setParams(index, params)

Sets parameters for the light source at the given index.

#### Parameters

* `index` (Type: number)<br>Zero-based index of the light to set. The first light has index 0, the second has index 1, and so on. If the light doesn't exist at that index, it will be created.
* `params` (Type: Object)<br>An object as described in H3DU.LightSource.setParams.

#### Return Value

This object. (Type: <a href="H3DU.Lights.md">H3DU.Lights</a>)

<a name='H3DU.Lights_setPointLight'></a>
### H3DU.Lights#setPointLight(index, position, [diffuse], [specular])

Sets a point light.

#### Parameters

* `index` (Type: number)<br>Zero-based index of the light to set. The first light has index 0, the second has index 1, and so on. If the light doesn't exist at that index, it will be created.
* `position` (Type: Array.&lt;number>)<br>A 3-element array giving the X, Y, and Z world space coordinates, respectively, of the light's position.
* `diffuse` (Type: Array.&lt;number>) (optional)<br>Diffuse color, as described in H3DU.Lights.setDirectionalLight.
* `specular` (Type: Array.&lt;number>) (optional)<br>Specular color, as described in H3DU.Lights.setDirectionalLight.

#### Return Value

This object. (Type: <a href="H3DU.Lights.md">H3DU.Lights</a>)

[Back to documentation index.](index.md)

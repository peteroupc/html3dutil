# H3DU.Lights

[Back to documentation index.](index.md)

### H3DU.Lights() <a id='H3DU.Lights'></a>

A collection of light sources. It stores the scene's
ambient color as well as data on one or more light sources.
When constructed, the list of light sources will be empty.

### Members

* [.MAX_LIGHTS](#H3DU.Lights.MAX_LIGHTS)<br>Maximum number of lights supported
by the default shader program.
* [sceneAmbient](#H3DU.Lights_sceneAmbient)<br>Ambient color for the scene.

### Methods

* [getCount](#H3DU.Lights_H3DU.Lights_getCount)<br>Gets the number of lights defined in this object.
* [getLight](#H3DU.Lights_H3DU.Lights_getLight)<br>Gets information about the light source at the given index.
* [setAmbient](#H3DU.Lights_H3DU.Lights_setAmbient)<br>Sets the color of the scene's ambient light.
* [setBasic](#H3DU.Lights_H3DU.Lights_setBasic)<br>Resets this object to a basic configuration for
light sources: one light source with its default
values, and the default value for <code>sceneAmbient</code>.
* [setDirectionalLight](#H3DU.Lights_H3DU.Lights_setDirectionalLight)<br>Sets a directional light.
* [setParams](#H3DU.Lights_H3DU.Lights_setParams)<br>Sets parameters for the light source at the given index.
* [setPointLight](#H3DU.Lights_H3DU.Lights_setPointLight)<br>Sets a point light.

### H3DU.Lights.MAX_LIGHTS <a id='H3DU.Lights.MAX_LIGHTS'></a> (constant)

Maximum number of lights supported
by the default shader program.

Default Value: `3`

### H3DU.Lights#sceneAmbient <a id='H3DU.Lights_sceneAmbient'></a>

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

Default Value: `"[0.2,0.2,0.2]"`

### H3DU.Lights#getCount() <a id='H3DU.Lights_H3DU.Lights_getCount'></a>

Gets the number of lights defined in this object.

#### Return Value

Return value. (Type: Number)

### H3DU.Lights#getLight(index) <a id='H3DU.Lights_H3DU.Lights_getLight'></a>

Gets information about the light source at the given index.

#### Parameters

* `index` (Type: Number)<br>
    Zero-based index of the light to set. The first light has index 0, the second has index 1, and so on. If the light doesn't exist at that index, it will be created.

#### Return Value

The corresponding light source object. (Type: LightSource)

### H3DU.Lights#setAmbient(r, g, b, [a]) <a id='H3DU.Lights_H3DU.Lights_setAmbient'></a>

Sets the color of the scene's ambient light.

#### Parameters

* `r` (Type: Array.&lt;Number> | number | string)<br>
    Array of three or four color components; or the red color component (0-1); or a string specifying an <a href="H3DU.md#H3DU.toGLColor">HTML or CSS color</a>.
* `g` (Type: Number)<br>
    Green color component (0-1). May be null or omitted if a string or array is given as the "r" parameter.
* `b` (Type: Number)<br>
    Blue color component (0-1). May be null or omitted if a string or array is given as the "r" parameter.
* `a` (Type: Number) (optional)<br>
    Alpha color component (0-1). Currently not used.

#### Return Value

This object. (Type: <a href="H3DU.Scene3D.md">H3DU.Scene3D</a>)

### H3DU.Lights#setBasic() <a id='H3DU.Lights_H3DU.Lights_setBasic'></a>

Resets this object to a basic configuration for
light sources: one light source with its default
values, and the default value for <code>sceneAmbient</code>.

#### Return Value

This object. (Type: <a href="H3DU.Lights.md">H3DU.Lights</a>)

### H3DU.Lights#setDirectionalLight(index, direction, [diffuse], [specular]) <a id='H3DU.Lights_H3DU.Lights_setDirectionalLight'></a>

Sets a directional light.

#### Parameters

* `index` (Type: Number)<br>
    Zero-based index of the light to set. The first light has index 0, the second has index 1, and so on. If the light doesn't exist at that index, it will be created.
* `direction` (Type: Array.&lt;Number>)<br>
    A 3-element vector giving the direction of the light, along the X, Y, and Z axes, respectively.
* `diffuse` (Type: Array.&lt;Number>) (optional)<br>
    A <a href="H3DU.md#H3DU.toGLColor">color vector or string</a> giving the diffuse color of the light. If null or omitted, the diffuse color will remain unchanged. The default is (1, 1, 1, 1) for light index 0 and (0, 0, 0, 0) otherwise.
* `specular` (Type: Array.&lt;Number>) (optional)<br>
    A <a href="H3DU.md#H3DU.toGLColor">color vector or string</a> giving the color of specular highlights caused by the light. If null or omitted, the specular highlight color will remain unchanged. The default is (1, 1, 1) for light index 0 and (0, 0, 0) otherwise.

#### Return Value

This object. (Type: <a href="H3DU.Lights.md">H3DU.Lights</a>)

### H3DU.Lights#setParams(index, params) <a id='H3DU.Lights_H3DU.Lights_setParams'></a>

Sets parameters for the light source at the given index.

#### Parameters

* `index` (Type: Number)<br>
    Zero-based index of the light to set. The first light has index 0, the second has index 1, and so on. If the light doesn't exist at that index, it will be created.
* `params` (Type: Object)<br>
    An object as described in H3DU.LightSource.setParams.

#### Return Value

This object. (Type: <a href="H3DU.Lights.md">H3DU.Lights</a>)

### H3DU.Lights#setPointLight(index, position, [diffuse], [specular]) <a id='H3DU.Lights_H3DU.Lights_setPointLight'></a>

Sets a point light.

#### Parameters

* `index` (Type: Number)<br>
    Zero-based index of the light to set. The first light has index 0, the second has index 1, and so on. If the light doesn't exist at that index, it will be created.
* `position` (Type: Array.&lt;Number>)<br>
    A 3-element vector giving the X, Y, and Z coordinates, respectively, of the light, in world coordinates.
* `diffuse` (Type: Array.&lt;Number>) (optional)<br>
    Diffuse color, as described in H3DU.Lights.setDirectionalLight.
* `specular` (Type: Array.&lt;Number>) (optional)<br>
    Specular color, as described in H3DU.Lights.setDirectionalLight.

#### Return Value

This object. (Type: <a href="H3DU.Lights.md">H3DU.Lights</a>)

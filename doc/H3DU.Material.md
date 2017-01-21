# H3DU.Material

[Back to documentation index.](index.md)

### H3DU.Material([params], [diffuse], [specular], [shininess], [emission]) <a id='H3DU.Material'></a>

Specifies parameters for geometry materials, which describe the appearance of a
3D object. This includes how an object scatters, reflects, or absorbs light,
as well as a texture image to apply on that object's surface.

NOTE: The default shader program assumes that all colors and the diffuse texture specified in this object are in
the sRGB color space (linear RGB with a gamma correction exponent of 1/2.2).

#### Parameters

* `params` (Type: Array.&lt;Number>) (optional)<br>
    An object as described in H3DU.Material#setParams. <i>Using this parameter as a <a href="H3DU.md#H3DU.toGLColor">color vector or string</a> giving the ambient color is deprecated since version 2.0.</i>
* `diffuse` (Type: Array.&lt;Number>) (optional)<br>
    A <a href="H3DU.md#H3DU.toGLColor">color vector or string</a> giving the diffusion color (also called "albedo"). <i>This parameter is deprecated.</i>
* `specular` (Type: Array.&lt;Number>) (optional)<br>
    A <a href="H3DU.md#H3DU.toGLColor">color vector or string</a> giving the specular highlight reflection. <i>This parameter is deprecated.</i>
* `shininess` (Type: Array.&lt;Number>) (optional)<br>
    Specular highlight exponent of this material. <i>This parameter is deprecated.</i>
* `emission` (Type: Array.&lt;Number>) (optional)<br>
    A <a href="H3DU.md#H3DU.toGLColor">color vector or string</a> giving the additive color emitted by an object. <i>This parameter is deprecated.</i>

### Members

* [ambient](#H3DU.Material_ambient)<br>Ambient color of this material.
* [basic](#H3DU.Material_basic)<br>If true, only the "diffuse" and "texture" properties of this object are used
when processing objects that use this material.
* [diffuse](#H3DU.Material_diffuse)<br>Diffusion color of this material (also called "albedo").
* [emission](#H3DU.Material_emission)<br>Additive color emitted by objects with this material.
* [normalMap](#H3DU.Material_normalMap)<br>Normal map (bump map) texture.
* [shader](#H3DU.Material_shader)<br>Shader program to use when rendering objects with this material.
* [shininess](#H3DU.Material_shininess)<br>Specular highlight exponent of this material.
* [specular](#H3DU.Material_specular)<br>Specular highlight reflection of this material.
* [specularMap](#H3DU.Material_specularMap)<br>Specular map texture.
* [texture](#H3DU.Material_texture)<br>Texture for this material.

### Methods

* [.forShader](#H3DU.Material.forShader)<br>Convenience method that returns an <a href="H3DU.Material.md">H3DU.Material</a>
object from a shader information object to use when drawing a 3D object.
* [.fromColor](#H3DU.Material.fromColor)<br>Convenience method that returns an <a href="H3DU.Material.md">H3DU.Material</a>
object from an RGBA color.
* [.fromTexture](#H3DU.Material.fromTexture)<br>Convenience method that returns an <a href="H3DU.Material.md">H3DU.Material</a>
object from a texture to apply to a 3D object's surface.
* [copy](#H3DU.Material_H3DU.Material_copy)<br>Clones this object's parameters to a new H3DU.Material
object and returns that object.
* [setParams](#H3DU.Material_H3DU.Material_setParams)<br>Sets parameters for this material object.

### H3DU.Material#ambient <a id='H3DU.Material_ambient'></a>

Ambient color of this material.

Ambient color indicates how much an object's color is affected by ambient
lights, those that color pixels the same way regardless
of direction or distance.
Because every part of an object will be shaded the same way by ambient
colors, an object with just ambient color will not look much like a 3D object.

(Ambient color simulates the effect of light being scattered multiple times
from the same surface.)
This value is a 3-element array giving the red, green, and blue
components of the ambient color; the final ambient color depends
on the ambient color of the scene.
(0,0,0) means no ambient color,
and (1,1,1) means total ambient color.

Setting ambient color and diffusion color to the same value usually defines an object's
color.

Default Value: `"[0.2,0.2,0.2]"`

### H3DU.Material#basic <a id='H3DU.Material_basic'></a>

If true, only the "diffuse" and "texture" properties of this object are used
when processing objects that use this material.

Default Value: `false`

### H3DU.Material#diffuse <a id='H3DU.Material_diffuse'></a>

Diffusion color of this material (also called "albedo").
This is the generally perceived color of the material when
specular highlights are absent on the material's surface.
See also H3DU.PbrMaterial#diffuse; this property corresponds
more closely to that in the metallic workflow rather than the specular
workflow.

Type: Array.&lt;Number>

Default Value: `"[0.8,0.8,0.8,1]"`

### H3DU.Material#emission <a id='H3DU.Material_emission'></a>

Additive color emitted by objects with this material.
See <a href="H3DU.PbrMaterial.md#H3DU.PbrMaterial_emission">H3DU.PbrMaterial#emission</a>.

Type: Array.&lt;Number>

Default Value: `"[0,0,0]"`

### H3DU.Material#normalMap <a id='H3DU.Material_normalMap'></a>

Normal map (bump map) texture. See <a href="H3DU.PbrMaterial.md#H3DU.PbrMaterial_normalMap">H3DU.PbrMaterial#normalMap</a>.

Default Value: `null`

### H3DU.Material#shader <a id='H3DU.Material_shader'></a>

Shader program to use when rendering objects with this material.

Default Value: `null`

### H3DU.Material#shininess <a id='H3DU.Material_shininess'></a>

Specular highlight exponent of this material.
The greater the number, the more concentrated the specular
highlights are (and the smoother the material behaves).
The lower the number, the more extended the highlights are (and the rougher the material behaves).
Ranges from 0 through 128.

Default Value: `32`

### H3DU.Material#specular <a id='H3DU.Material_specular'></a>

Specular highlight reflection of this material.
This is usually a shade of gray (all three components are the same),
but can be colored if the material represents an uncoated metal of some sort.
See also <a href="H3DU.PbrMaterial.md#H3DU.PbrMaterial_specular">H3DU.PbrMaterial#specular</a>.
NOTE: Before version 2.0, this value's default was (0,0,0).

Type: Array.&lt;Number>

Default Value: `"[0.2,0.2,0.2]"`

### H3DU.Material#specularMap <a id='H3DU.Material_specularMap'></a>

Specular map texture.
See <a href="H3DU.PbrMaterial.md#H3DU.PbrMaterial_specularMap">H3DU.PbrMaterial#specularMap</a>.

Default Value: `null`

### H3DU.Material#texture <a id='H3DU.Material_texture'></a>

Texture for this material. Each color in the texture
sets the diffusion (also called "albedo")
of each part of the material.

Type: <a href="H3DU.Texture.md">H3DU.Texture</a>

Default Value: `null`

### H3DU.Material.forShader(shader) <a id='H3DU.Material.forShader'></a>

Convenience method that returns an <a href="H3DU.Material.md">H3DU.Material</a>
object from a shader information object to use when drawing a 3D object.

#### Parameters

* `shader` (Type: <a href="H3DU.ShaderInfo.md">H3DU.ShaderInfo</a>)<br>
    Shader information object to use.

#### Return Value

The resulting material object. (Type: <a href="H3DU.Material.md">H3DU.Material</a>)

### H3DU.Material.fromColor(r, g, b, [a]) <a id='H3DU.Material.fromColor'></a>

Convenience method that returns an <a href="H3DU.Material.md">H3DU.Material</a>
object from an RGBA color.

#### Parameters

* `r` (Type: Array.&lt;Number> | number | string)<br>
    A <a href="H3DU.md#H3DU.toGLColor">color vector or string</a>, or the red color component (0-1).
* `g` (Type: Number)<br>
    Green color component (0-1). May be null or omitted if a string or array is given as the "r" parameter.
* `b` (Type: Number)<br>
    Blue color component (0-1). May be null or omitted if a string or array is given as the "r" parameter.
* `a` (Type: Number) (optional)<br>
    Alpha color component (0-1). If the "r" parameter is given and this parameter is null or omitted, this value is treated as 1.0.

#### Return Value

The resulting material object. (Type: <a href="H3DU.Material.md">H3DU.Material</a>)

### H3DU.Material.fromTexture(texture) <a id='H3DU.Material.fromTexture'></a>

Convenience method that returns an <a href="H3DU.Material.md">H3DU.Material</a>
object from a texture to apply to a 3D object's surface.

#### Parameters

* `texture` (Type: <a href="H3DU.Texture.md">H3DU.Texture</a> | string)<br>
    <a href="H3DU.Texture.md">H3DU.Texture</a> object, or a string with the URL of the texture data. In the case of a string the texture will be loaded via the JavaScript DOM's Image class. However, this method will not load that image yet.

#### Return Value

The resulting material object. (Type: <a href="H3DU.Material.md">H3DU.Material</a>)

### H3DU.Material#copy() <a id='H3DU.Material_H3DU.Material_copy'></a>

Clones this object's parameters to a new H3DU.Material
object and returns that object. The material's texture
maps and shader info, if any, won't be cloned, but rather, a reference
to the same object will be used.

#### Return Value

A copy of this object. (Type: <a href="H3DU.Material.md">H3DU.Material</a>)

### H3DU.Material#setParams(params) <a id='H3DU.Material_H3DU.Material_setParams'></a>

Sets parameters for this material object.

#### Parameters

* `params` (Type: Object)<br>
    An object whose keys have the possibilities given below, and whose values are those allowed for each key.<ul> <li><code>basic</code> - If set to true, only the "diffuse" and "texture" properties of this material are used, and the object with this material will be drawn without regard to lighting. <li><code>ambient</code> - A <a href="H3DU.md#H3DU.toGLColor">color vector or string</a> giving the ambient color. (See <a href="H3DU.Material.md#H3DU.Material_ambient">H3DU.Material#ambient</a>.) The default is (0.2, 0.2, 0.2). <li><code>diffuse</code> - A <a href="H3DU.md#H3DU.toGLColor">color vector or string</a> giving the diffusion color (also called "albedo"). (See <a href="H3DU.Material.md#H3DU.Material_diffuse">H3DU.Material#diffuse</a>.) The default is (0.8, 0.8, 0.8). <li><code>specular</code> - A <a href="H3DU.md#H3DU.toGLColor">color vector or string</a> giving the specular reflection. (See <a href="H3DU.Material.md#H3DU.Material_specular">H3DU.Material#specular</a>.) The default is (0,0,0), meaning no specular highlights. <li><code>shininess</code> - Specular reflection exponent. (See <a href="H3DU.Material.md#H3DU.Material_shininess">H3DU.Material#shininess</a>). Ranges from 0 through 128. The default is 0. <li><code>emission</code> - A <a href="H3DU.md#H3DU.toGLColor">color vector or string</a> giving the additive color. (See <a href="H3DU.Material.md#H3DU.Material_emission">H3DU.Material#emission</a>.) If this is an array, its numbers can range from -1 to 1. The default is (0,0,0). <li><code>texture</code> - <a href="H3DU.Texture.md">H3DU.Texture</a> object, or a string with the URL of the texture to use. <li><code>specularMap</code> - <a href="H3DU.Texture.md">H3DU.Texture</a> object, or a string with the URL, of a specular map texture (see <a href="H3DU.Material.md#H3DU.Material_specularMap">H3DU.Material#specularMap</a>). <li><code>normalMap</code> - <a href="H3DU.Texture.md">H3DU.Texture</a> object, or a string with the URL, of a normal map (bump map) texture (see <a href="H3DU.Material.md#H3DU.Material_normalMap">H3DU.Material#normalMap</a>). <li><code>shader</code> - <a href="H3DU.ShaderInfo.md">H3DU.ShaderInfo</a> object for a WebGL shader program to use when rendering objects with this material. <i>Using <a href="H3DU.ShaderProgram.md">H3DU.ShaderProgram</a> objects in this parameter is deprecated.</i> </ul> Any or all of these keys can exist in the parameters object. If a value is null or undefined, it is ignored.

#### Return Value

This object. (Type: <a href="H3DU.Material.md">H3DU.Material</a>)

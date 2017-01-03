# H3DU.Material

[Back to documentation index.](index.md)

### H3DU.Material([ambient], [diffuse], [specular], [shininess], [emission]) <a id='H3DU.Material'></a>

Specifies parameters for geometry materials, which describe the appearance of a
3D object. This includes how an object scatters, reflects, or absorbs light, as well
as well as a texture image to apply on that object's surface.

<i>For more information on this constructor's parameters,
see the H3DU.Material#setParams method.</i>

#### Parameters

* `ambient` (Type: Array.&lt;Number>) (optional)<br>
    A <a href="H3DU.md#H3DU.toGLColor">color vector or string</a> giving the ambient color.
* `diffuse` (Type: Array.&lt;Number>) (optional)<br>
    A <a href="H3DU.md#H3DU.toGLColor">color vector or string</a> giving the diffusion color (also called "albedo").
* `specular` (Type: Array.&lt;Number>) (optional)<br>
    A <a href="H3DU.md#H3DU.toGLColor">color vector or string</a> giving the specular highlight reflection.
* `shininess` (Type: Array.&lt;Number>) (optional)<br>
    Specular highlight exponent of this material.
* `emission` (Type: Array.&lt;Number>) (optional)<br>
    A <a href="H3DU.md#H3DU.toGLColor">color vector or string</a> giving the additive color emitted by an object.

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
* [specularMap](#H3DU.Material_specularMap)<br>Specular map texture, where each pixel is an additional factor to multiply the specular color by, for
each part of the object's surface (note that the material must have a specular color of other
than the default black for this to have an effect).
* [texture](#H3DU.Material_texture)<br>H3DU.Texture for this material.

### Methods

* [.forShader](#H3DU.Material.forShader)<br>Convenience method that returns an H3DU.Material
object from a shader information object to use when drawing a 3D object.
* [.fromColor](#H3DU.Material.fromColor)<br>Convenience method that returns an H3DU.Material
object from an RGBA color.
* [.fromTexture](#H3DU.Material.fromTexture)<br>Convenience method that returns an H3DU.Material
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

### H3DU.Material#basic <a id='H3DU.Material_basic'></a>

If true, only the "diffuse" and "texture" properties of this object are used
when processing objects that use this material.

Default Value: `false`

### H3DU.Material#diffuse <a id='H3DU.Material_diffuse'></a>

Diffusion color of this material (also called "albedo"). This is the color seen when light passes through this material
and bounces back; it scatters equally in all directions. Because different parts of an object are shaded
differently depending
on how directly they face diffuse lights, diffusion can contribute
much of the 3D appearance of that object.

This value is a 4-element array giving the red, green, blue, and
alpha components of the diffusion; the final diffusion color depends
on the diffusion colors of lights that shine on the material.
(0,0,0,1) means no diffusion,
and (1,1,1,1) means total diffusion.

Setting ambient and diffusion to the same value usually defines an object's
color.

In the default shader program, if a mesh defines its own colors, those
colors are used for diffusion rather than this property.

This value can have an optional fourth element giving the alpha component
(0-1). If this element is omitted, the default is 1.

### H3DU.Material#emission <a id='H3DU.Material_emission'></a>

Additive color emitted by objects with this material.
Used for objects that glow on their own, among other things.
Each part of the object will be affected by the additive color the
same way regardless of lighting (this property won't be used in the
default shader if H3DU.Scene3D.disableLighting()
is called, disabling lighting calculations).

This value is a 3-element array giving the red, green, and blue
components.
For each of the three color components, positive values add to that component,
while negative values subtract from it. (0,0,0), the default, means no additive color.

### H3DU.Material#normalMap <a id='H3DU.Material_normalMap'></a>

Normal map (bump map) texture. Normal maps are used either to add
a sense of roughness to an otherwise flat surface or to give an object a highly-detailed
appearance with fewer polygons.

In a normal map texture, each pixel is a vector in which
 each component (which usually ranges from 0-255 in most image formats) is scaled to
 the range [-1, 1], where:
<ul>
<li>The pixel's red component is the vector's X component.
<li>The pixel's green component is the vector's Y component.
<li>The pixel's blue component is the vector's Z component.
<li>An unchanged normal vector will have the value (0, 0, 1), which is usually
the value (127, 127, 255) in most image formats.
<li>The vector is normalized so its length is about equal to 1.
<li>The vector is expressed in tangent space, where the Z axis points outward
and away from the surface's edges.
</ul>
Each pixel indicates a tilt from the vector (0, 0, 1), or positive Z axis,
to the vector given in that pixel. This tilt adjusts the normals used for the
purpose of calculating lighting effects at that part of the surface.
A strong tilt indicates strong relief detail at that point.

Any texture used for normal maps should not be in JPEG format or any other
format that uses lossy compression, as compression artifacts can result in inaccurate
normals in certain areas.

For normal mapping to work, an object's mesh must include normals,
tangents, bitangents, and texture coordinates, though if a <code>H3DU.Mesh</code>
object only has normals and texture coordinates, the <code>recalcTangents()</code>
method can calculate the tangents and bitangents appropriate for normal mapping.

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

### H3DU.Material#specular <a id='H3DU.Material_specular'></a>

Specular highlight reflection of this material.
Specular reflection is a reflection in the opposite direction from the direction
the light reaches the material in, similar to a mirror. As a result, depending
on the viewing angle, specular reflection can give off
shiny highlights on the material.

This value is a 3-element array giving the red, green, and blue
components of the specular reflection; the final specular color depends
on the specular color of lights that shine on the material.
(0,0,0) means no specular reflection and (1,1,1) means total specular reflection,
The specular color is usually grayscale
(all three components are the same), but can be colored if the material represents an
uncoated metal of some sort. If this element is omitted, the default is (0.1,0.1,0.1).

NOTE: Before version 2.0, the default was (0,0,0).

### H3DU.Material#specularMap <a id='H3DU.Material_specularMap'></a>

Specular map texture, where each pixel is an additional factor to multiply the specular color by, for
each part of the object's surface (note that the material must have a specular color of other
than the default black for this to have an effect).

The specular map is usually grayscale (all three components are the same in each pixel),
but can be colored if the material represents an uncoated metal of some sort (in which case the specular
color property should be (1,1,1) or another grayscale color). See <a href="H3DU.Material.md#H3DU.Material_specular">H3DU.Material#specular</a>.

Any texture used for specular maps should not be in JPEG format or any other
format that uses lossy compression, as compression artifacts can result in inaccurate
specular factors in certain areas.

Default Value: `null`

### H3DU.Material#texture <a id='H3DU.Material_texture'></a>

H3DU.Texture for this material. Each color in the texture
sets the diffusion (also called "albedo")
of each part of the material.

Default Value: `null`

### H3DU.Material.forShader(shader) <a id='H3DU.Material.forShader'></a>

Convenience method that returns an H3DU.Material
object from a shader information object to use when drawing a 3D object.

#### Parameters

* `shader` (Type: <a href="H3DU.ShaderInfo.md">H3DU.ShaderInfo</a>)<br>
    Shader information object to use.

#### Return Value

The resulting material object. (Type: <a href="H3DU.Material.md">H3DU.Material</a>)

### H3DU.Material.fromColor(r, g, b, [a]) <a id='H3DU.Material.fromColor'></a>

Convenience method that returns an H3DU.Material
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

Convenience method that returns an H3DU.Material
object from a texture to apply to a 3D object's surface.

#### Parameters

* `texture` (Type: <a href="H3DU.Texture.md">H3DU.Texture</a> | string)<br>
    <a href="H3DU.Texture.md">H3DU.Texture</a> object, or a string with the URL of the texture data. In the case of a string the texture will be loaded via the JavaScript DOM's Image class. However, this method will not load that image yet.

#### Return Value

The resulting material object. (Type: <a href="H3DU.Material.md">H3DU.Material</a>)

### H3DU.Material#copy() <a id='H3DU.Material_H3DU.Material_copy'></a>

Clones this object's parameters to a new H3DU.Material
object and returns that object. The material's texture
maps and shader program, if any, won't be cloned, but rather, a reference
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

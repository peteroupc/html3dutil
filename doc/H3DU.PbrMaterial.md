# H3DU.PbrMaterial

[Back to documentation index.](index.md)

<a name='H3DU.PbrMaterial'></a>
### H3DU.PbrMaterial([params])

A material for physically-based rendering. Specifies parameters for geometry materials,
which describe the appearance of a 3D object. This includes how an object
scatters or reflects light.

NOTE: The default shader program assumes that all colors, as well as the albedo,
specular, and emission maps, specified in this object are in
<a href="H3DU.Math.md#H3DU.Math.colorTosRGB">companded sRGB</a>.

#### Parameters

* `params` (Type: Object) (optional)<br>An object described in H3DU.PbrMaterial.setParams.

### Members

* [Metallic](#H3DU.PbrMaterial.Metallic)<br>Metallic workflow.
* [Specular](#H3DU.PbrMaterial.Specular)<br>Specular workflow.
* [albedo](#H3DU.PbrMaterial_albedo)<br>Albedo (or base color) of this material.
* [albedoMap](#H3DU.PbrMaterial_albedoMap)<br>A texture indicating the albedo (or base color) of each part of the texture,
in the red, green, blue, and alpha channels.
* [emission](#H3DU.PbrMaterial_emission)<br>Additive color emitted by objects with this material.
* [emissionMap](#H3DU.PbrMaterial_emissionMap)<br>A texture where each pixel identifies the emission of that
part of the texture, as specified in the texture's red, green, and blue channel.
* [invertRoughness](#H3DU.PbrMaterial_invertRoughness)<br>If true, the roughness property is treated as a "glossiness" property,
or 1 minus roughness, and the roughness map is treated as a "glossiness"
map, or an inverted roughness map.
* [metalness](#H3DU.PbrMaterial_metalness)<br>A value indicating whether objects described by this material are metals.
* [metalnessMap](#H3DU.PbrMaterial_metalnessMap)<br>A texture indicating the metalness of each part of the texture,
as specified in the texture's blue channel.
* [normalMap](#H3DU.PbrMaterial_normalMap)<br>Normal map (bump map) texture.
* [occlusionMap](#H3DU.PbrMaterial_occlusionMap)<br>A texture where each pixel identifies the ambient occlusion of that
part of the texture, as specified in the texture's red channel.
* [roughness](#H3DU.PbrMaterial_roughness)<br>Describes the roughness of the surface described
by this material.
* [roughnessMap](#H3DU.PbrMaterial_roughnessMap)<br>A texture indicating the roughness of each part of the texture,
as specified in the texture's green channel.
* [shader](#H3DU.PbrMaterial_shader)<br>Shader program to use when rendering objects with this material.
* [specular](#H3DU.PbrMaterial_specular)<br>Specular reflectivity of this material.
* [specularMap](#H3DU.PbrMaterial_specularMap)<br>A texture where each pixel identifies the "specular" property of that
part of the texture, as specified in the texture's red, green, and blue channels
(in <a href="H3DU.Math.md#H3DU.Math.colorTosRGB">companded sRGB</a>).
* [workflow](#H3DU.PbrMaterial_workflow)<br>Specifies which workflow to use when interpreting values for this
material.

### Methods

* [copy](#H3DU.PbrMaterial_copy)<br>Clones this object's parameters to a new <a href="H3DU.PbrMaterial.md">H3DU.PbrMaterial</a>
object and returns that object.
* [setParams](#H3DU.PbrMaterial_setParams)<br>Sets parameters for this material object.

<a name='H3DU.PbrMaterial.Metallic'></a>
### H3DU.PbrMaterial.Metallic (constant)

Metallic workflow.

Default Value: `1`

<a name='H3DU.PbrMaterial.Specular'></a>
### H3DU.PbrMaterial.Specular (constant)

Specular workflow.

Default Value: `0`

<a name='H3DU.PbrMaterial_albedo'></a>
### H3DU.PbrMaterial#albedo

Albedo (or base color) of this material.

This value is a 3- or 4-element array giving the red, green, blue, and
alpha components of the albedo (in <a href="H3DU.Math.md#H3DU.Math.colorTosRGB">companded sRGB</a>). (0,0,0,1) means an
albedo value of black, and (1,1,1,1) means an albedo value of white.

In the <b>metallic workflow</b>, this color specifies the amount
of light that is reflected by this material's surface. For both metals and nonmetals, this color
is the generally observed color of the surface.

In the <b>specular workflow</b>, this color specifies the amount
of light that scatters off the material in random directions upon reaching it (<i>diffuse</i> color). For most nonmetals, this color
is the generally observed color of the surface, though somewhat desaturated. Most metals do not reflect
the light that passes through them,
so for most metals, this color should generally be black or a very
dark shade of gray. (In physically-based rendering, the sum of albedo and specular
colors should not exceed 1.0 in each <a href="H3DU.Math.md#H3DU.Math.colorToLinear">linear sRGB</a> channel.)

In <b>both workflows</b> in physically-based rendering, the albedo
color should not have any added lighting.

This value can have an optional fourth element giving the alpha component
(0-1). If this element is omitted, the default is 1.

In the default shader program, if a mesh defines its own colors, those
colors are used rather than this property to set the color defined here.

Type: Array.&lt;number>

Default Value: `"[1,1,1,1]"`

<a name='H3DU.PbrMaterial_albedoMap'></a>
### H3DU.PbrMaterial#albedoMap

A texture indicating the albedo (or base color) of each part of the texture,
in the red, green, blue, and alpha channels. In physically-based rendering, the albedo
texture should not have any added lighting or shadow detail.

Type: <a href="H3DU.Texture.md">H3DU.Texture</a> | <a href="H3DU.TextureInfo.md">H3DU.TextureInfo</a> | <a href="H3DU.FrameBufferInfo.md">H3DU.FrameBufferInfo</a>

Default Value: `null`

<a name='H3DU.PbrMaterial_emission'></a>
### H3DU.PbrMaterial#emission

Additive color emitted by objects with this material.
Used for objects that glow on their own, among other things.
This additive color is unaffected by lighting or shading.

This value is a 3-element array giving the red, green, and blue
components.
For each of the three color components, positive values add to that component,
while negative values subtract from it. (0,0,0), the default, means no additive color.

Type: Array.&lt;number>

Default Value: `"[0,0,0]"`

<a name='H3DU.PbrMaterial_emissionMap'></a>
### H3DU.PbrMaterial#emissionMap

A texture where each pixel identifies the emission of that
part of the texture, as specified in the texture's red, green, and blue channel.
If a texture is given, the emission found with this texture is multiplied by
the value of the <a href="H3DU.PbrMaterial.md#H3DU.PbrMaterial_emission">H3DU.PbrMaterial#emission</a> property.

Type: <a href="H3DU.Texture.md">H3DU.Texture</a> | <a href="H3DU.TextureInfo.md">H3DU.TextureInfo</a> | <a href="H3DU.FrameBufferInfo.md">H3DU.FrameBufferInfo</a>

Default Value: `null`

<a name='H3DU.PbrMaterial_invertRoughness'></a>
### H3DU.PbrMaterial#invertRoughness

If true, the roughness property is treated as a "glossiness" property,
or 1 minus roughness, and the roughness map is treated as a "glossiness"
map, or an inverted roughness map.

Type: boolean

Default Value: `false`

<a name='H3DU.PbrMaterial_metalness'></a>
### H3DU.PbrMaterial#metalness

A value indicating whether objects described by this material are metals.
This value ranges from 0 through 1. If 0, the surface is a nonmetal; if 1,
the surface is a metal. Values in between
0 and 1 are rather rare and generally appear in transitions between metals and nonmetals.
This value is only used in the <b>metallic workflow</b>.

Type: number

Default Value: `0`

<a name='H3DU.PbrMaterial_metalnessMap'></a>
### H3DU.PbrMaterial#metalnessMap

A texture indicating the metalness of each part of the texture,
as specified in the texture's blue channel.
Each pixel value in the blue channel (which ranges from 0-255 in most image
formats) is scaled to the range [0, 1].

This value is only used in the <b>metallic workflow</b>.
Any texture used for this map should not be in JPEG format or any other
format that uses lossy compression, as compression artifacts can result in inaccurate
metalness values in certain areas.

Type: <a href="H3DU.Texture.md">H3DU.Texture</a> | <a href="H3DU.TextureInfo.md">H3DU.TextureInfo</a> | <a href="H3DU.FrameBufferInfo.md">H3DU.FrameBufferInfo</a>

Default Value: `null`

<a name='H3DU.PbrMaterial_normalMap'></a>
### H3DU.PbrMaterial#normalMap

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
<li>An unchanged normal vector is indicated by the value (0, 0, 1), which is usually
the value (127, 127, 255) in most image formats.
<li>The vector is normalized so its length is about equal to 1.
<li>The vector is expressed in <i>tangent space</i>, where the Z axis points outward
and away from the surface's edges.
</ul>
Each pixel indicates a tilt from the vector (0, 0, 1), or positive Z axis,
to the vector given in that pixel. This tilt adjusts the normals used for the
purpose of calculating lighting effects at that part of the surface.
A strong tilt indicates strong relief detail at that point.

Any texture used for normal maps should not be in JPEG format or any other
format that uses lossy compression, as compression artifacts can result in inaccurate
normals in certain areas.

For normal mapping to work, an object's mesh must include normals
and texture coordinates.

Type: <a href="H3DU.Texture.md">H3DU.Texture</a> | <a href="H3DU.TextureInfo.md">H3DU.TextureInfo</a> | <a href="H3DU.FrameBufferInfo.md">H3DU.FrameBufferInfo</a>

Default Value: `null`

<a name='H3DU.PbrMaterial_occlusionMap'></a>
### H3DU.PbrMaterial#occlusionMap

A texture where each pixel identifies the ambient occlusion of that
part of the texture, as specified in the texture's red channel.

Type: <a href="H3DU.Texture.md">H3DU.Texture</a> | <a href="H3DU.TextureInfo.md">H3DU.TextureInfo</a> | <a href="H3DU.FrameBufferInfo.md">H3DU.FrameBufferInfo</a>

Default Value: `null`

<a name='H3DU.PbrMaterial_roughness'></a>
### H3DU.PbrMaterial#roughness

Describes the roughness of the surface described
by this material. The inverse of roughness is <i>glossiness</i> or <i>smoothness</i>,
which equals 1 minus roughness. To make this property equivalent to glossiness
or smoothness, set the <code>invertRoughness</code> property to <code>true</code>.

Type: number

Default Value: `0.35`

<a name='H3DU.PbrMaterial_roughnessMap'></a>
### H3DU.PbrMaterial#roughnessMap

A texture indicating the roughness of each part of the texture,
as specified in the texture's green channel.
Each pixel value in the green channel (which ranges from 0-255 in most image
formats) is scaled to the range [0, 1].

The inverse of roughness is <i>glossiness</i> or <i>smoothness</i>;
to treat the texture as a glossiness or smoothness map, set the
<code>invertRoughness</code> property to <code>true</code>.
Any texture used for this map should not be in JPEG format or any other
format that uses lossy compression, as compression artifacts can result in inaccurate
roughness values in certain areas.

Type: <a href="H3DU.Texture.md">H3DU.Texture</a> | <a href="H3DU.TextureInfo.md">H3DU.TextureInfo</a> | <a href="H3DU.FrameBufferInfo.md">H3DU.FrameBufferInfo</a>

Default Value: `null`

<a name='H3DU.PbrMaterial_shader'></a>
### H3DU.PbrMaterial#shader

Shader program to use when rendering objects with this material.

Default Value: `null`

<a name='H3DU.PbrMaterial_specular'></a>
### H3DU.PbrMaterial#specular

Specular reflectivity of this material.
Specular reflection is a bounced-back reflection from the direction
the light reaches the material in, similar to a mirror. As a result, depending
on the viewing angle, specular reflection can give off
shiny highlights on the material.

This value is a 3-element array giving the red, green, and blue
components of the surface's base reflectivity when looking directly at the surface
(base reflectivity at 0 degree incidence, or F<sub>0</sub>).
For most nonmetals, this is a shade of gray ranging from
(0.15, 0.15, 0.15) to (0.32, 0.32, 0.32) in sRGB. For most metals,
this is a very light version of the surface's color.

This value is only used in the <b>specular workflow</b>.

Type: Array.&lt;number>

Default Value: `"[0.2,0.2,0.2]"`

<a name='H3DU.PbrMaterial_specularMap'></a>
### H3DU.PbrMaterial#specularMap

A texture where each pixel identifies the "specular" property of that
part of the texture, as specified in the texture's red, green, and blue channels
(in <a href="H3DU.Math.md#H3DU.Math.colorTosRGB">companded sRGB</a>).

This value is only used in the <b>specular workflow</b>.

Any texture used for this map should not be in JPEG format or any other
format that uses lossy compression, as compression artifacts can result in inaccurate
specular factors in certain areas.

Type: <a href="H3DU.Texture.md">H3DU.Texture</a> | <a href="H3DU.TextureInfo.md">H3DU.TextureInfo</a> | <a href="H3DU.FrameBufferInfo.md">H3DU.FrameBufferInfo</a>

Default Value: `null`

<a name='H3DU.PbrMaterial_workflow'></a>
### H3DU.PbrMaterial#workflow

Specifies which workflow to use when interpreting values for this
material.

The <b>metallic workflow</b> (<code>H3DU.PbrMaterial.Metallic</code>, the default)
is usually easier to understand and uses <code>albedo</code> to set the
surface's color and <code>metalness</code> to set whether the surface
is a metal or not.

The <b>specular workflow</b> (<code>H3DU.PbrMaterial.Specular</code>)
uses <code>albedo</code> to set the
surface's color for nonmetals and <code>specular</code> to set the
surface's specular reflectivity.

Type: number

<a name='H3DU.PbrMaterial_copy'></a>
### H3DU.PbrMaterial#copy()

Clones this object's parameters to a new <a href="H3DU.PbrMaterial.md">H3DU.PbrMaterial</a>
object and returns that object. The material's texture
maps and shader info, if any, won't be cloned, but rather, a reference
to the same object will be used.

#### Return Value

A copy of this object. (Type: <a href="H3DU.PbrMaterial.md">H3DU.PbrMaterial</a>)

<a name='H3DU.PbrMaterial_setParams'></a>
### H3DU.PbrMaterial#setParams(params)

Sets parameters for this material object.

#### Parameters

* `params` (Type: Object)<br>An object whose keys have the possibilities given below, and whose values are those allowed for each key.<ul> <li><code>workflow</code> - Either <a href="H3DU.PbrMaterial.md#H3DU.PbrMaterial.Specular">H3DU.PbrMaterial.Specular</a> or H3DU.PbrMaterial.Metalness <li><code>invertRoughness</code> - If true, the roughness property is treated as a "glossiness" property, or 1 minus roughness, and the roughness map is treated as a "glossiness" map, or an inverted roughness map. See <a href="H3DU.PbrMaterial.md#H3DU.PbrMaterial_invertRoughness">H3DU.PbrMaterial#invertRoughness</a>. <li><code>diffuse</code> or <code>albedo</code> - A <a href="H3DU.md#H3DU.toGLColor">color vector or string</a> giving the diffusion color (also called "albedo"). (See H3DU.PbrMaterial#diffuse.) The default is (0.8, 0.8, 0.8). <li><code>specular</code> - A <a href="H3DU.md#H3DU.toGLColor">color vector or string</a> giving the specular reflection. (See <a href="H3DU.PbrMaterial.md#H3DU.PbrMaterial_specular">H3DU.PbrMaterial#specular</a>.) The default is (0,0,0), meaning no specular highlights. <li><code>roughness</code> - Roughness. <li><code>emission</code> - A <a href="H3DU.md#H3DU.toGLColor">color vector or string</a> giving the additive color. (See <a href="H3DU.PbrMaterial.md#H3DU.PbrMaterial_emission">H3DU.PbrMaterial#emission</a>.) If this is an array, its numbers can range from -1 to 1. The default is (0,0,0). <li><code>texture</code> or <code>albedoMap</code> - <a href="H3DU.Texture.md">H3DU.Texture</a> object, <a href="H3DU.TextureInfo.md">H3DU.TextureInfo</a> object, <a href="H3DU.FrameBufferInfo.md">H3DU.FrameBufferInfo</a> object, ora string with the URL of the texture to use. Can be null. <li><code>specularMap</code> - Specular map texture, taking the same types as for "albedoMap" (see <a href="H3DU.PbrMaterial.md#H3DU.PbrMaterial_specularMap">H3DU.PbrMaterial#specularMap</a>). Can be null. <li><code>normalMap</code> - Normal map (bump map) texture, taking the same types as for "albedoMap" (see <a href="H3DU.PbrMaterial.md#H3DU.PbrMaterial_normalMap">H3DU.PbrMaterial#normalMap</a>). Can be null. <li><code>metalnessMap</code> - Metalness texture, taking the same types as for "albedoMap" (see <a href="H3DU.PbrMaterial.md#H3DU.PbrMaterial_metalnessMap">H3DU.PbrMaterial#metalnessMap</a>). Can be null. <li><code>roughnessMap</code> - Roughness texture, taking the same types as for "albedoMap" (see <a href="H3DU.PbrMaterial.md#H3DU.PbrMaterial_roughnessMap">H3DU.PbrMaterial#roughnessMap</a>). Can be null. <li><code>emissionMap</code> - Emission texture, taking the same types as for "albedoMap" (see <a href="H3DU.PbrMaterial.md#H3DU.PbrMaterial_emissionMap">H3DU.PbrMaterial#emissionMap</a>). Can be null. <li><code>occlusionMap</code> - Ambient occlusion map texture, taking the same types as the "texture" parameter (see <a href="H3DU.PbrMaterial.md#H3DU.PbrMaterial_occlusionMap">H3DU.PbrMaterial#occlusionMap</a>). Can be null. <li><code>shader</code> - <a href="H3DU.ShaderInfo.md">H3DU.ShaderInfo</a> object for a WebGL shader program to use when rendering objects with this material. Can be null. </ul> Any or all of these keys can exist in the parameters object. If a value is null or undefined, it is ignored unless otherwise noted.

#### Return Value

This object. (Type: <a href="H3DU.PbrMaterial.md">H3DU.PbrMaterial</a>)

[Back to documentation index.](index.md)

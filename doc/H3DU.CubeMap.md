# H3DU.CubeMap

[Back to documentation index.](index.md)

<a name='H3DU.CubeMap'></a>
### H3DU.CubeMap(textures)

A cube map, or a set of six textures forming the sides of a cube.

#### Parameters

* `textures` (Type: Array.&lt;(String|Texture|TextureInfo)>)<br>An array of six elements, each of which is a URL of the texture data or the texture object itself. However, this constructor will not load those images yet. The six texture are, in order, the texture seen when looking toward the positive X axis, the negative X axis, positive Y, negative Y, positive Z, and negative Z.

### Methods

* [getHeight](#H3DU.CubeMap_getHeight)<br>Gets this texture's known height.
* [getTexture](#H3DU.CubeMap_getTexture)<br>Gets a texture used by this cube map.
* [getWidth](#H3DU.CubeMap_getWidth)<br>Gets this texture's known width.
* [setTexture](#H3DU.CubeMap_setTexture)<br>Sets a texture used by this cube map.

<a name='H3DU.CubeMap_getHeight'></a>
### H3DU.CubeMap#getHeight()

Gets this texture's known height.

#### Return Value

This texture's height in pixels.
Will be 0 if the texture's image data wasn't loaded yet. (Type: number)

<a name='H3DU.CubeMap_getTexture'></a>
### H3DU.CubeMap#getTexture(index)

Gets a texture used by this cube map.

#### Parameters

* `index` (Type: number)<br>Texture index to get.

#### Return Value

The texture with the given index,
or null if the index is out of range. (Type: <a href="H3DU.Texture.md">H3DU.Texture</a>)

<a name='H3DU.CubeMap_getWidth'></a>
### H3DU.CubeMap#getWidth()

Gets this texture's known width.

#### Return Value

This texture's width in pixels.
Will be 0 if the texture's image data wasn't loaded yet. (Type: number)

<a name='H3DU.CubeMap_setTexture'></a>
### H3DU.CubeMap#setTexture(index, texture)

Sets a texture used by this cube map.

#### Parameters

* `index` (Type: number)<br>Texture index to set, from 0 through 5.
* `texture` (Type: <a href="H3DU.Texture.md">H3DU.Texture</a> | <a href="H3DU.TextureInfo.md">H3DU.TextureInfo</a> | String)<br>An <a href="H3DU.Texture.md">H3DU.Texture</a> object, a texture information object, or a string with the URL of the texture data.

#### Return Value

This object. (Type: <a href="H3DU.CubeMap.md">H3DU.CubeMap</a>)

[Back to documentation index.](index.md)

# H3DU.CubeMap

[Back to documentation index.](index.md)

 <a name='H3DU.CubeMap'></a>
### H3DU.CubeMap(name)

TODO: Not documented yet.

#### Parameters

* `name` (Type: Array.&lt;(String|Texture)>)<br>
    An array of six elements, each of which is a URL of the texture data or the texture object itself. However, this constructor will not load those images yet. The six images are, in order, the image seen when looking toward the positive X axis, the negative X axis, positive Y, negative Y, positive Z, and negative Z.

### Methods

* [getHeight](#H3DU.CubeMap_H3DU.CubeMap_getHeight)<br>Gets this texture's known height.
* [getTextures](#H3DU.CubeMap_H3DU.CubeMap_getTextures)<br>Gets a reference to the array of textures used by this cube
map.
* [getWidth](#H3DU.CubeMap_H3DU.CubeMap_getWidth)<br>Gets this texture's known width.

 <a name='H3DU.CubeMap_H3DU.CubeMap_getHeight'></a>
### H3DU.CubeMap#getHeight()

Gets this texture's known height.

#### Return Value

This texture's height in pixels.
Will be 0 if the texture's image data wasn't loaded yet. (Type: Number)

 <a name='H3DU.CubeMap_H3DU.CubeMap_getTextures'></a>
### H3DU.CubeMap#getTextures()

Gets a reference to the array of textures used by this cube
map. TODO: Reference or copy?

#### Return Value

Return value. (Type: *)

 <a name='H3DU.CubeMap_H3DU.CubeMap_getWidth'></a>
### H3DU.CubeMap#getWidth()

Gets this texture's known width.

#### Return Value

This texture's width in pixels.
Will be 0 if the texture's image data wasn't loaded yet. (Type: Number)

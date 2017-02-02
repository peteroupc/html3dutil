# H3DU.TextureInfo

[Back to documentation index.](index.md)

 <a name='H3DU.TextureInfo'></a>
### H3DU.TextureInfo([params])

Specifies information about a texture, which can serve as image data applied to
the surface of a shape, or even a 2-dimensional array of pixels
used for some other purpose, such as a depth map, a height map,
a bump map, a specular map, and so on.

By default, texture coordinates go from (0,0) at the lower left corner
to (1,1) at the upper right corner (because the "topDown" property is false
by default).

For best results, any textures to be used in WebGL should have
width and height each equal to a power of 2, such as 2, 4, 8, 16,
and 32.

#### Parameters

* `params` (Type: Object) (optional)<br>
    An object as described in H3DU.TextureInfo.setParams.

### Methods

* [copyFrom](#H3DU.TextureInfo_H3DU.TextureInfo_copyFrom)<br>Copies the parameters from another texture information object to this
object.
* [setParams](#H3DU.TextureInfo_H3DU.TextureInfo_setParams)<br>Sets parameters for this texture information object.

 <a name='H3DU.TextureInfo_H3DU.TextureInfo_copyFrom'></a>
### H3DU.TextureInfo#copyFrom([other])

Copies the parameters from another texture information object to this
object.

#### Parameters

* `other` (Type: <a href="H3DU.TextureInfo.md">H3DU.TextureInfo</a>) (optional)<br>
    Texture information object to copy.

#### Return Value

This object. (Type: <a href="H3DU.TextureInfo.md">H3DU.TextureInfo</a>)

 <a name='H3DU.TextureInfo_H3DU.TextureInfo_setParams'></a>
### H3DU.TextureInfo#setParams(params)

Sets parameters for this texture information object.

#### Parameters

* `params` (Type: Object)<br>
    An object whose keys have the possibilities given below, and whose values are those allowed for each key.<ul> <li><code>uri</code> - TODO: Not documented yet. <li><code>format</code> - TODO: Not documented yet. <li><code>internalFormat</code> - TODO: Not documented yet. <li><code>target</code> - TODO: Not documented yet. <li><code>type</code> - TODO: Not documented yet. <li><code>magFilter</code> - TODO: Not documented yet. <li><code>minFilter</code> - TODO: Not documented yet. <li><code>wrapS</code> - TODO: Not documented yet. <li><code>wrapT</code> - TODO: Not documented yet. <li><code>topDown</code> - TODO: Not documented yet. </ul> Any or all of these keys can exist in the parameters object. If a value is null or undefined, it is ignored unless otherwise noted.

#### Return Value

This object. (Type: <a href="H3DU.TextureInfo.md">H3DU.TextureInfo</a>)

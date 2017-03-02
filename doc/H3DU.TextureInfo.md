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

* [copyFrom](#H3DU.TextureInfo_copyFrom)<br>Copies the parameters from another texture information object to this
object.
* [setParams](#H3DU.TextureInfo_setParams)<br>Sets parameters for this texture information object.

 <a name='H3DU.TextureInfo_copyFrom'></a>
### H3DU.TextureInfo#copyFrom([other])

Copies the parameters from another texture information object to this
object.

#### Parameters

* `other` (Type: <a href="H3DU.TextureInfo.md">H3DU.TextureInfo</a>) (optional)<br>
    Texture information object to copy.

#### Return Value

This object. (Type: <a href="H3DU.TextureInfo.md">H3DU.TextureInfo</a>)

 <a name='H3DU.TextureInfo_setParams'></a>
### H3DU.TextureInfo#setParams(params)

Sets parameters for this texture information object.

#### Parameters

* `params` (Type: Object)<br>
    An object whose keys have the possibilities given below, and whose values are those allowed for each key.<ul> <li><code>uri</code> - URI (Internet address) of the texture's data. <li><code>format</code> - Specifies the kind of data stored in each pixel of the texture. Can be 6406, 6407, 6408 (RGBA), 6409, 6410. <li><code>internalFormat</code> - Specifies the format of the texture. Can be one of the values for "format". <li><code>target</code> - Specifies the texture target. Can be 3553 (TEXTURE_2D). <li><code>type</code> - Specifies the data type used to encode each pixel component in the texture. Can be 5121, 33635, 32819, 32820. <li><code>magFilter</code> - Specifies the filter to use when enlarging the texture. Can be 9728 (NEAREST) or 9729 (LINEAR). <li><code>minFilter</code> - Specifies the filter to use when shrinking the texture. Can be one of the values for "magFilter" or 9984, 9985, 9986 (NEAREST_MIPMAP_LINEAR), 9987. <li><code>wrapS</code> - Specifies the wrapping mode in the S (horizontal) axis. Can be 10497 (REPEAT), 33071, 33648. <li><code>wrapT</code> -Specifies the wrapping mode in the T (horizontal) axis. Can be one of the values for "wrapS". <li><code>topDown</code> - If true, the image's data will be stored starting from the top row and proceeding downwards. </ul> Any or all of these keys can exist in the parameters object. If a value is null or undefined, it is ignored unless otherwise noted.

#### Return Value

This object. (Type: <a href="H3DU.TextureInfo.md">H3DU.TextureInfo</a>)

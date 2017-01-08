# H3DU.Texture

[Back to documentation index.](index.md)

### H3DU.Texture(name) <a id='H3DU.Texture'></a>

Specifies a texture, which can serve as image data applied to
the surface of a shape, or even a 2-dimensional array of pixels
used for some other purpose, such as a depth map, a height map,
a bump map, a specular map, and so on.

By default, texture coordinates go from (0,0) at the lower left corner
to (1,1) at the upper right corner.

For best results, any textures to be used in WebGL should have
width and height each equal to a power of 2, such as 2, 4, 8, 16,
and 32.

#### Parameters

* `name` (Type: String)<br>
    URL of the texture data. Based on the URL, the texture may be loaded via the JavaScript DOM's Image class. However, this constructor will not load that image yet.

### Methods

* [.fromUint8Array](#H3DU.Texture.fromUint8Array)<br>Creates a texture from a byte array specifying the texture data.
* [.loadTexture](#H3DU.Texture.loadTexture)<br>Loads a texture by its URL.
* [dispose](#H3DU.Texture_H3DU.Texture_dispose)<br>Disposes resources used by this texture.
* [getHeight](#H3DU.Texture_H3DU.Texture_getHeight)<br>Gets this texture's known height.
* [getName](#H3DU.Texture_H3DU.Texture_getName)<br>Gets the name of this texture.
* [getWidth](#H3DU.Texture_H3DU.Texture_getWidth)<br>Gets this texture's known width.
* [setClamp](#H3DU.Texture_H3DU.Texture_setClamp)<br>Sets the wrapping behavior of texture coordinates that
fall out of range when using this texture.

### H3DU.Texture.fromUint8Array(array, width, height) <a id='H3DU.Texture.fromUint8Array'></a>

Creates a texture from a byte array specifying the texture data.

#### Parameters

* `array` (Type: Uint8Array)<br>
    A byte array containing the texture data, with the pixels arranged in left-to-right rows from top to bottom. Each pixel takes 4 bytes, where the bytes are the red, green, blue, and alpha components, in that order.
* `width` (Type: Uint8Array)<br>
    Width, in pixels, of the texture.
* `height` (Type: Uint8Array)<br>
    Height, in pixels, of the texture.

#### Return Value

The new H3DU.Texture object. (Type: <a href="H3DU.Texture.md">H3DU.Texture</a>)

### H3DU.Texture.loadTexture(name, [textureCache]) <a id='H3DU.Texture.loadTexture'></a>

Loads a texture by its URL.

#### Parameters

* `name` (Type: String)<br>
    URL of the texture data. Images with a TGA extension that use the RGBA or grayscale format are supported. Images supported by the browser will be loaded via the JavaScript DOM's Image class.
* `textureCache` (Type: Object) (optional)<br>
    An object whose keys are the names of textures already loaded. This will help avoid loading the same texture more than once. This parameter is optional and may be omitted.

#### Return Value

A promise that resolves when the texture
is fully loaded. If it resolves, the result will be an H3DU.Texture object. (Type: <a href="Promise.md">Promise</a>)

### H3DU.Texture#dispose() <a id='H3DU.Texture_H3DU.Texture_dispose'></a>

Disposes resources used by this texture.

#### Return Value

Return value. (Type: Object)

### H3DU.Texture#getHeight() <a id='H3DU.Texture_H3DU.Texture_getHeight'></a>

Gets this texture's known height.

#### Return Value

This texture's height in pixels.
Will be 0 if the texture's image data wasn't loaded yet. (Type: Number)

### H3DU.Texture#getName() <a id='H3DU.Texture_H3DU.Texture_getName'></a>

Gets the name of this texture.

#### Return Value

Return value. (Type: String)

### H3DU.Texture#getWidth() <a id='H3DU.Texture_H3DU.Texture_getWidth'></a>

Gets this texture's known width.

#### Return Value

This texture's width in pixels.
Will be 0 if the texture's image data wasn't loaded yet. (Type: Number)

### H3DU.Texture#setClamp(clamp) <a id='H3DU.Texture_H3DU.Texture_setClamp'></a>

Sets the wrapping behavior of texture coordinates that
fall out of range when using this texture. This setting
will only have an effect on textures whose width and height
are both powers of two. For other textures, this setting
is ignored and out-of-range texture coordinates are
always clamped.

#### Parameters

* `clamp` (Type: Boolean)<br>
    If true, the texture's texture coordinates will be clamped to the range [0, 1]. If false, the fractional parts of the texture coordinates' be used as the coordinates (causing wraparound). The default is false.

#### Return Value

This object. (Type: <a href="H3DU.Texture.md">H3DU.Texture</a>)

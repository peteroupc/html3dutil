# H3DU.TextureLoader

[Back to documentation index.](index.md)

 <a name='H3DU.TextureLoader'></a>
### H3DU.TextureLoader()

An object that caches loaded textures and uploads them
to WebGL contexts.

### Methods

* [dispose](#H3DU.TextureLoader_H3DU.TextureLoader_dispose)<br>Disposes all resources used by this texture loader.
* [getTexture](#H3DU.TextureLoader_H3DU.TextureLoader_getTexture)<br>Gets an already loaded texture by name from this texture loader.
* [loadAndMapTexture](#H3DU.TextureLoader_H3DU.TextureLoader_loadAndMapTexture)<br>Loads the texture referred to in an array of URLs and
uploads its texture data to a WebGL context.
* [loadAndMapTexturesAll](#H3DU.TextureLoader_H3DU.TextureLoader_loadAndMapTexturesAll)<br>Loads one or more textures by their URL and uploads their data to a WebGL context.
* [loadCubeMap](#H3DU.TextureLoader_H3DU.TextureLoader_loadCubeMap)<br>TODO: Not documented yet.
* [loadTexture](#H3DU.TextureLoader_H3DU.TextureLoader_loadTexture)<br>Loads a texture by its URL and stores its data.
* [loadTexturesAll](#H3DU.TextureLoader_H3DU.TextureLoader_loadTexturesAll)<br>Loads the textures referred to in an array of URLs and
stores their texture data.

 <a name='H3DU.TextureLoader_H3DU.TextureLoader_dispose'></a>
### H3DU.TextureLoader#dispose()

Disposes all resources used by this texture loader.

#### Return Value

Return value. (Type: void)

 <a name='H3DU.TextureLoader_H3DU.TextureLoader_getTexture'></a>
### H3DU.TextureLoader#getTexture(name)

Gets an already loaded texture by name from this texture loader.

#### Parameters

* `name` (Type: String)<br>
    The name of the texture, usually its file name.

#### Return Value

The texture with the given name, or null
if it doesn't exist. (Type: Texture)

 <a name='H3DU.TextureLoader_H3DU.TextureLoader_loadAndMapTexture'></a>
### H3DU.TextureLoader#loadAndMapTexture(texture, context)

Loads the texture referred to in an array of URLs and
uploads its texture data to a WebGL context.

#### Parameters

* `texture` (Type: String | <a href="H3DU.TextureInfo.md">H3DU.TextureInfo</a> | <a href="H3DU.Texture.md">H3DU.Texture</a>)<br>
    An object described in H3DU.TextureLoader.loadTexture.
* `context` (Type: WebGLRenderingContext | WebGL2RenderingContext | object)<br>
    A WebGL context to associate with this scene, or an object, such as <a href="H3DU.Scene3D.md">H3DU.Scene3D</a>, that implements a no-argument <code>getContext</code> method that returns a WebGL context.

#### Return Value

A promise that resolves when
the texture is loaded successfully (the result will be an H3DU.Texture object)
and is rejected when an error occurs. (Type: <a href="Promise.md">Promise</a>.&lt;<a href="H3DU.Texture.md">H3DU.Texture</a>>)

 <a name='H3DU.TextureLoader_H3DU.TextureLoader_loadAndMapTexturesAll'></a>
### H3DU.TextureLoader#loadAndMapTexturesAll(textures, context, [resolve], [reject])

Loads one or more textures by their URL and uploads their data to a WebGL context.

#### Parameters

* `textures` (Type: Array.&lt;(String|<a href="H3DU.TextureInfo.md">H3DU.TextureInfo</a>|<a href="H3DU.Texture.md">H3DU.Texture</a>)>)<br>
    An array of objects described in H3DU.TextureLoader.loadTexture.
* `context` (Type: WebGLRenderingContext | WebGL2RenderingContext | object)<br>
    A WebGL context to associate with this scene, or an object, such as <a href="H3DU.Scene3D.md">H3DU.Scene3D</a>, that implements a no-argument <code>getContext</code> method that returns a WebGL context.
* `resolve` (Type: function) (optional)<br>
    A function called as each individual texture is loaded.
* `reject` (Type: function) (optional)<br>
    A function called as each individual texture is loaded.

#### Return Value

A promise as described in
<a href="H3DU.md#H3DU.getPromiseResultsAll">H3DU.getPromiseResultsAll</a>. If the promise
resolves, each item in the resulting array will be a loaded
<a href="H3DU.Texture.md">H3DU.Texture</a> object. (Type: <a href="Promise.md">Promise</a>.&lt;<a href="H3DU.Texture.md">H3DU.Texture</a>>)

 <a name='H3DU.TextureLoader_H3DU.TextureLoader_loadCubeMap'></a>
### H3DU.TextureLoader#loadCubeMap(texturesOrCubeMap, resolve, reject)

TODO: Not documented yet.

#### Parameters

* `texturesOrCubeMap` (Type: *)
* `resolve` (Type: *)
* `reject` (Type: *)

#### Return Value

Return value. (Type: *)

 <a name='H3DU.TextureLoader_H3DU.TextureLoader_loadTexture'></a>
### H3DU.TextureLoader#loadTexture(texture)

Loads a texture by its URL and stores its data.

#### Parameters

* `texture` (Type: String | <a href="H3DU.TextureInfo.md">H3DU.TextureInfo</a> | <a href="H3DU.Texture.md">H3DU.Texture</a>)<br>
    An <a href="H3DU.Texture.md">H3DU.Texture</a> object, an <a href="H3DU.TextureInfo.md">H3DU.TextureInfo</a> object, or a string with the URL of the texture data.

 Images with a TGA extension that use the RGBA or grayscale format are supported. Images supported by the browser will be loaded via the JavaScript DOM's Image class.

#### Return Value

A promise that resolves when the texture
is fully loaded. If it resolves, the result will be an H3DU.Texture object. (Type: <a href="Promise.md">Promise</a>.&lt;<a href="H3DU.Texture.md">H3DU.Texture</a>>)

 <a name='H3DU.TextureLoader_H3DU.TextureLoader_loadTexturesAll'></a>
### H3DU.TextureLoader#loadTexturesAll(textures, [resolve], [reject])

Loads the textures referred to in an array of URLs and
stores their texture data.

#### Parameters

* `textures` (Type: Array.&lt;(String|<a href="H3DU.TextureInfo.md">H3DU.TextureInfo</a>|<a href="H3DU.Texture.md">H3DU.Texture</a>)>)<br>
    An array of objects described in H3DU.TextureLoader.loadTexture.
* `resolve` (Type: function) (optional)<br>
    A function called as each individual texture is loaded.
* `reject` (Type: function) (optional)<br>
    A function called as each individual texture is loaded.

#### Return Value

A promise as described in
<a href="H3DU.md#H3DU.getPromiseResultsAll">H3DU.getPromiseResultsAll</a>. If the promise
resolves, each item in the resulting array will be a loaded
<a href="H3DU.Texture.md">H3DU.Texture</a> object. (Type: <a href="Promise.md">Promise</a>.&lt;<a href="H3DU.Texture.md">H3DU.Texture</a>>)

# H3DU.TextureLoader

[Back to documentation index.](index.md)

### H3DU.TextureLoader() <a id='H3DU_TextureLoader'></a>

An object that caches loaded textures and uploads them
to WebGL contexts.

### Methods

* [dispose](#H3DU_TextureLoader_H3DU_TextureLoader_dispose)
* [getTexture](#H3DU_TextureLoader_H3DU_TextureLoader_getTexture)
* [loadAndMapTexture](#H3DU_TextureLoader_H3DU_TextureLoader_loadAndMapTexture)
* [loadAndMapTexturesAll](#H3DU_TextureLoader_H3DU_TextureLoader_loadAndMapTexturesAll)
* [loadTexture](#H3DU_TextureLoader_H3DU_TextureLoader_loadTexture)
* [loadTexturesAll](#H3DU_TextureLoader_H3DU_TextureLoader_loadTexturesAll)
* [mapTexture](#H3DU_TextureLoader_H3DU_TextureLoader_mapTexture)
* [mapTextures](#H3DU_TextureLoader_H3DU_TextureLoader_mapTextures)

### H3DU.TextureLoader#dispose() <a id='H3DU_TextureLoader_H3DU_TextureLoader_dispose'></a>

Disposes all resources used by this texture loader.

#### Return Value

Return value. (Type: void)

### H3DU.TextureLoader#getTexture(name) <a id='H3DU_TextureLoader_H3DU_TextureLoader_getTexture'></a>

Gets an already loaded texture by name from this texture loader.

#### Parameters

* `name` (Type: String)<br>
    The name of the texture, usually its file name.

#### Return Value

The texture with the given name, or null
if it doesn't exist. (Type: Texture)

### H3DU.TextureLoader#loadAndMapTexture(texture, context) <a id='H3DU_TextureLoader_H3DU_TextureLoader_loadAndMapTexture'></a>

Loads the textures referred to in an array of URLs and
uploads their texture data to a WebGL context.

#### Parameters

* `texture` (Type: String)<br>
    URL of the texture data. Images with a TGA extension that use the RGBA or grayscale format are supported. Images supported by the browser will be loaded via the JavaScript DOM's Image class.
* `context` (Type: WebGLRenderingContext | object)<br>
    A WebGL context to associate with this scene, or an object, such as <a href="H3DU_Scene3D.md">H3DU.Scene3D</a>, that implements a no-argument <code>getContext</code> method that returns a WebGL context.

#### Return Value

A promise that resolves when
the texture is loaded successfully (the result will be an H3DU.Texture object)
and is rejected when an error occurs. (Type: <a href="Promise.md">Promise</a>.&lt;<a href="H3DU_Texture.md">H3DU.Texture</a>>)

### H3DU.TextureLoader#loadAndMapTexturesAll(textures, context, [resolve], [reject]) <a id='H3DU_TextureLoader_H3DU_TextureLoader_loadAndMapTexturesAll'></a>

Loads one or more textures by their URL and uploads their data to a WebGL context.

#### Parameters

* `textures` (Type: Array.&lt;String>)<br>
    Arrays of URLs of the texture data. Images with a TGA extension that use the RGBA or grayscale format are supported. Images supported by the browser will be loaded via the JavaScript DOM's Image class.
* `context` (Type: WebGLRenderingContext | object)<br>
    A WebGL context to associate with this scene, or an object, such as <a href="H3DU_Scene3D.md">H3DU.Scene3D</a>, that implements a no-argument <code>getContext</code> method that returns a WebGL context.
* `resolve` (Type: function) (optional)<br>
    A function called as each individual texture is loaded.
* `reject` (Type: function) (optional)<br>
    A function called as each individual texture is loaded.

#### Return Value

A promise as described in
<a href="H3DU.md#H3DU_getPromiseResultsAll">H3DU.getPromiseResultsAll</a>. If the promise
resolves, each item in the resulting array will be a loaded
<a href="H3DU_Texture.md">H3DU.Texture</a> object. (Type: <a href="Promise.md">Promise</a>.&lt;<a href="H3DU_Texture.md">H3DU.Texture</a>>)

### H3DU.TextureLoader#loadTexture(name) <a id='H3DU_TextureLoader_H3DU_TextureLoader_loadTexture'></a>

Loads a texture by its URL and stores its data.

#### Parameters

* `name` (Type: String)<br>
    URL of the texture data. Images with a TGA extension that use the RGBA or grayscale format are supported. Images supported by the browser will be loaded via the JavaScript DOM's Image class.

#### Return Value

A promise that resolves when the texture
is fully loaded. If it resolves, the result will be an H3DU.Texture object. (Type: <a href="Promise.md">Promise</a>.&lt;<a href="H3DU_Texture.md">H3DU.Texture</a>>)

### H3DU.TextureLoader#loadTexturesAll(textures, [resolve], [reject]) <a id='H3DU_TextureLoader_H3DU_TextureLoader_loadTexturesAll'></a>

Loads the textures referred to in an array of URLs and
stores their texture data.

#### Parameters

* `textures` (Type: Array.&lt;String>)<br>
    An array of URLs of the texture data. Images with a TGA extension that use the RGBA or grayscale format are supported. Images supported by the browser will be loaded via the JavaScript DOM's Image class.
* `resolve` (Type: function) (optional)<br>
    A function called as each individual texture is loaded.
* `reject` (Type: function) (optional)<br>
    A function called as each individual texture is loaded.

#### Return Value

A promise as described in
<a href="H3DU.md#H3DU_getPromiseResultsAll">H3DU.getPromiseResultsAll</a>. If the promise
resolves, each item in the resulting array will be a loaded
<a href="H3DU_Texture.md">H3DU.Texture</a> object. (Type: <a href="Promise.md">Promise</a>.&lt;<a href="H3DU_Texture.md">H3DU.Texture</a>>)

### H3DU.TextureLoader#mapTexture(texture, context) <a id='H3DU_TextureLoader_H3DU_TextureLoader_mapTexture'></a>

Uploads a texture object to a WebGL context.

#### Parameters

* `texture` (Type: <a href="H3DU_Texture.md">H3DU.Texture</a>)<br>
    The texture object to map. Each texture's data must already have been loaded. If the texture has the same name as a texture already uploaded to the given context, it will be skipped.
* `context` (Type: WebGLRenderingContext | object)<br>
    A WebGL context to associate with this scene, or an object, such as <a href="H3DU_Scene3D.md">H3DU.Scene3D</a>, that implements a no-argument <code>getContext</code> method that returns a WebGL context.

#### Return Value

This object. (Type: <a href="H3DU_TextureLoader.md">H3DU.TextureLoader</a>)

### H3DU.TextureLoader#mapTextures(textures, context) <a id='H3DU_TextureLoader_H3DU_TextureLoader_mapTextures'></a>

Uploads an array of textures to a WebGL context.

#### Parameters

* `textures` (Type: Array.&lt;<a href="H3DU_Texture.md">H3DU.Texture</a>>)<br>
    An array of texture objects to upload. Each texture's data must already have been loaded. Textures with the same name as textures already uploaded to the given context will be skipped.
* `context` (Type: WebGLRenderingContext | object)<br>
    A WebGL context to associate with this scene, or an object, such as <a href="H3DU_Scene3D.md">H3DU.Scene3D</a>, that implements a no-argument <code>getContext</code> method that returns a WebGL context.

#### Return Value

This object. (Type: <a href="H3DU_TextureLoader.md">H3DU.TextureLoader</a>)

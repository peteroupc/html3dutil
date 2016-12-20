/* global H3DU, Promise */
/**
* An object that caches loaded textures and uploads them
* to WebGL contexts.
* @class
* @alias H3DU.TextureLoader
*/
H3DU.TextureLoader = function() {
  "use strict";
  this.loadedTextures = [];
  this.textureImages = {};
  this.maxAnisotropy = [];
  this.fbLoader = new H3DU.FrameBufferLoader();
};
/**
 * Gets an already loaded texture by name from this texture loader.
 * @param {String} name The name of the texture, usually its file name.
* @returns {Texture} The texture with the given name, or null
* if it doesn't exist.
 * @memberof! H3DU.TextureLoader#
*/
H3DU.TextureLoader.prototype.getTexture = function(name) {
  "use strict";
  return this.textureImages[name] || null;
};

/**
 * Loads a texture by its URL and stores its data.
* @param {String} name URL of the texture data.  Images with a TGA
* extension that use the RGBA or grayscale format are supported.
* Images supported by the browser will be loaded via
* the JavaScript DOM's Image class.
* @returns {Promise<H3DU.Texture>} A promise that resolves when the texture
* is fully loaded.  If it resolves, the result will be an H3DU.Texture object.
 * @memberof! H3DU.TextureLoader#
*/
H3DU.TextureLoader.prototype.loadTexture = function(name) {
  "use strict";
  return H3DU.Texture.loadTexture(name, this.textureImages);
};
/** @private */
H3DU.TextureLoader.prototype._setMaxAnisotropy = function(context) {
  "use strict";
  context = context.getContext ? context.getContext() : context;
  var ma = this.maxAnisotropy;
  for(var i = 0;i < ma.length;i++) {
    if(ma[i][0] === context) {
      if(ma[i][2] >= 0) {
        context.texParameteri(context.TEXTURE_2D, ma[i][2], ma[i][1]);
      } else {
        return;
      }
    }
  }
  var ext = context.getExtension("EXT_texture_filter_anisotropic") ||
         context.getExtension("WEBKIT_EXT_texture_filter_anisotropic") ||
         context.getExtension("MOZ_EXT_texture_filter_anisotropic");
  if(!ext) {
    ma.push([context, 1, -1, null]);
    return 1;
  } else {
    var cnst = ext.TEXTURE_MAX_ANISOTROPY_EXT;
    var ret = context.getParameter(
    ext.MAX_TEXTURE_MAX_ANISOTROPY_EXT);
    ma.push([context, ret, cnst]);
    context.texParameteri(context.TEXTURE_2D, cnst, ret);
    return ret;
  }
};
/**
 * Loads the textures referred to in an array of URLs and
 * stores their texture data.
 * @param {Array<String>} textures An array of URLs of
 * the texture data.  Images with a TGA
 * extension that use the RGBA or grayscale format are supported.
 * Images supported by the browser will be loaded via
 * the JavaScript DOM's Image class.
 *  @param {Function} [resolve] A function called as each
 *   individual texture is loaded.
 *  @param {Function} [reject] A function called as each
 *   individual texture is loaded.
 * @returns {Promise<H3DU.Texture>} A promise as described in
 * {@link H3DU.getPromiseResultsAll}.  If the promise
 * resolves, each item in the resulting array will be a loaded
 * {@link H3DU.Texture} object.
 * @memberof! H3DU.TextureLoader#
*/
H3DU.TextureLoader.prototype.loadTexturesAll = function(textures, resolve, reject) {
  "use strict";
  var promises = [];
  for(var i = 0;i < textures.length;i++) {
    promises.push(this.loadTexture(textures[i]));
  }
  return H3DU.getPromiseResultsAll(promises, resolve, reject);
};
/**
 * Loads the textures referred to in an array of URLs and
 * uploads their texture data to a WebGL context.
* @param {String} name URL of the texture data.  Images with a TGA
* extension that use the RGBA or grayscale format are supported.
* Images supported by the browser will be loaded via
* the JavaScript DOM's Image class.
 * @param {WebGLRenderingContext|object} context
 * A WebGL context to associate with this scene, or an object, such as {@link H3DU.Scene3D}, that
* implements a no-argument <code>getContext</code> method
* that returns a WebGL context.
 * @returns {Promise<H3DU.Texture>} A promise that resolves when
 * the texture is loaded successfully (the result will be an H3DU.Texture object)
 * and is rejected when an error occurs.
 * @memberof! H3DU.TextureLoader#
*/
H3DU.TextureLoader.prototype.loadAndMapTexture = function(texture, context) {
  "use strict";
  context = context.getContext ? context.getContext() : context;
  var that = this;
  return this.loadTexture(texture).then(function(tex) {
    that.mapTexture(tex, context);
    return Promise.resolve(tex);
  });
};
/**
 * Loads a texture by its URL and uploads its data to a WebGL context.
 * @param {Array<String>} textures
 * @param {WebGLRenderingContext|object} context
 * A WebGL context to associate with this scene, or an object, such as {@link H3DU.Scene3D}, that
* implements a no-argument <code>getContext</code> method
* that returns a WebGL context.
 *  @param {Function} [resolve] A function called as each
 *   individual texture is loaded.
 *  @param {Function} [reject] A function called as each
 *   individual texture is loaded.
 * @returns {Promise<H3DU.Texture>} A promise as described in
 * {@link H3DU.getPromiseResultsAll}.  If the promise
 * resolves, each item in the resulting array will be a loaded
 * {@link H3DU.Texture} object.
 * @memberof! H3DU.TextureLoader#
*/
H3DU.TextureLoader.prototype.loadAndMapTexturesAll = function(textures, context, resolve, reject) {
  "use strict";
  context = context.getContext ? context.getContext() : context;
  var promises = [];

  for(var i = 0;i < textures.length;i++) {
    promises.push(this.loadAndMapTexture(textures[i], context));
  }
  return H3DU.getPromiseResultsAll(promises, resolve, reject);
};
/**
 * Uploads an array of textures to a WebGL context.
 * @param {H3DU.Texture} texture An array of texture objects to upload.
 * Each texture's data must already have been loaded.    Textures with the
* same name as textures already uploaded to the given context will be skipped.
 * @param {WebGLRenderingContext|object} context
 * A WebGL context to associate with this scene, or an object, such as {@link H3DU.Scene3D}, that
* implements a no-argument <code>getContext</code> method
* that returns a WebGL context.
 * @returns {H3DU.TextureLoader} This object.
 * @memberof! H3DU.TextureLoader#
*/
H3DU.TextureLoader.prototype.mapTextures = function(textures, context) {
  "use strict";
  context = context.getContext ? context.getContext() : context;
  for(var i = 0;i < textures.length;i++) {
    this.mapTexture(textures[i], context);
  }
  return this;
};
/**
 * Uploads a texture object to a WebGL context.
 * @param {H3DU.Texture} texture The texture object to map.
 * Each texture's data must already have been loaded.    If the texture has the
* same name as a texture already uploaded to the given context, it will be skipped.
 * @param {WebGLRenderingContext|object} context
 * A WebGL context to associate with this scene, or an object, such as {@link H3DU.Scene3D}, that
* implements a no-argument <code>getContext</code> method
* that returns a WebGL context.
 * @returns {H3DU.TextureLoader} This object.
 * @memberof! H3DU.TextureLoader#
*/
H3DU.TextureLoader.prototype.mapTexture = function(texture, context) {
  "use strict";
  context = context.getContext ? context.getContext() : context;
  var lt = this.loadedTextures;
  for(var i = 0;i < lt.length;i++) {
    if(lt[i][0] === texture && lt[i][1] === context) {
      return lt[i][2];
    }
  }
  var loadedTex = new H3DU._LoadedTexture(texture, context);
  lt.push([texture, context, loadedTex]);
  return loadedTex;
};

/** @private */
H3DU.TextureLoader.prototype.mapFrameBuffer = function(info, context) {
  "use strict";
  context = context.getContext ? context.getContext() : context;
  return this.fbLoader.mapFrameBuffer(info, context);
};
/** @private */
H3DU.TextureLoader.prototype.bindFrameBuffer = function(info, context) {
  "use strict";
  context = context.getContext ? context.getContext() : context;
  this.fbLoader.bind(info, context);
};
/** @private */
H3DU.TextureLoader.prototype.unbindFrameBuffer = function(info, context) {
  "use strict";
  context = context.getContext ? context.getContext() : context;
  this.fbLoader.unbind(info, context);
};
/**
 * Disposes all resources used by this texture loader.
 * @memberof! H3DU.TextureLoader#
*/
H3DU.TextureLoader.prototype.dispose = function() {
  "use strict";
  for(var tex in this.textureImages) {
    if(Object.prototype.hasOwnProperty.call(this.textureImages, tex)) {
      this.textureImages[tex].dispose();
    }
  }
  var lt = this.loadedTextures;
  for(var i = 0;i < lt.length;i++) {
    this.loadedTextures[i][2].dispose();
  }
  if(typeof this.fbLoader === "undefined" || this.fbLoader === null) {
    this.fbLoader.dispose();
  }
  this.fbLoader = null;
  this.textureImages = {};
  this.loadedTextures = [];
  this.maxAnisotropy = [];
};

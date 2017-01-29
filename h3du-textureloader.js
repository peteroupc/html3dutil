/*
 Any copyright to this file is released to the Public Domain.
 http://creativecommons.org/publicdomain/zero/1.0/
 If you like this, you should donate
 to Peter O. (original author of
 the Public Domain HTML 3D Library) at:
 http://peteroupc.github.io/
*/
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
  var tex = this.textureImages[name] || null;
  if(tex && tex.loadStatus !== 2) {
    this.textureImages[name] = null;
    return null;
  }
  return this.textureImages[name] || null;
};

/**
 * Loads a texture by its URL and stores its data.
 * @param {String|TextureInfo} name URL of the texture data. Images with a TGA
 * extension that use the RGBA or grayscale format are supported.
 * Images supported by the browser will be loaded via
 * the JavaScript DOM's Image class. TODO: More docs.
 * @returns {Promise<H3DU.Texture>} A promise that resolves when the texture
 * is fully loaded. If it resolves, the result will be an H3DU.Texture object.
 * @memberof! H3DU.TextureLoader#
 */
H3DU.TextureLoader.prototype.loadTexture = function(name) {
  "use strict";
  // TODO: Support passing H3DU.Texture objects
  return H3DU.Texture.loadTexture(name, this.textureImages);
};
/** @private */
H3DU.TextureLoader.prototype._setMaxAnisotropy = function(context, target) {
  "use strict";
  context = context.getContext ? context.getContext() : context;
  var ma = this.maxAnisotropy;
  for(var i = 0;i < ma.length;i++) {
    if(ma[i][0] === context) {
      if(ma[i][2] >= 0) {
        context.texParameteri(target, ma[i][2], ma[i][1]);
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
    context.texParameteri(target, cnst, ret);
    return ret;
  }
};
/**
 * Loads the textures referred to in an array of URLs and
 * stores their texture data.
 * @param {Array<String|H3DU.TextureInfo>} textures An array of objects described in
 * {@link H3DU.TextureLoader.loadTexture}.
 * @param {Function} [resolve] A function called as each
 * individual texture is loaded.
 * @param {Function} [reject] A function called as each
 * individual texture is loaded.
 * @returns {Promise<H3DU.Texture>} A promise as described in
 * {@link H3DU.getPromiseResultsAll}. If the promise
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
 * Loads the texture referred to in an array of URLs and
 * uploads its texture data to a WebGL context.
 * @param {String|H3DU.TextureInfo} texture An object described in
 * {@link H3DU.TextureLoader.loadTexture}.
 * @param {WebGLRenderingContext|WebGL2RenderingContext|object} context
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
    var texinfo = H3DU.TextureInfo._texInfoOrString(texture);
    that._mapTextureWithInfo(tex, texinfo, context);
    return Promise.resolve(tex);
  });
};
/**
 * Loads one or more textures by their URL and uploads their data to a WebGL context.
 * @param {Array<String|H3DU.TextureInfo>} textures An array of objects described in
 * {@link H3DU.TextureLoader.loadTexture}.
 * @param {WebGLRenderingContext|WebGL2RenderingContext|object} context
 * A WebGL context to associate with this scene, or an object, such as {@link H3DU.Scene3D}, that
 * implements a no-argument <code>getContext</code> method
 * that returns a WebGL context.
 * @param {Function} [resolve] A function called as each
 * individual texture is loaded.
 * @param {Function} [reject] A function called as each
 * individual texture is loaded.
 * @returns {Promise<H3DU.Texture>} A promise as described in
 * {@link H3DU.getPromiseResultsAll}. If the promise
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

/** @private */
H3DU.TextureLoader.prototype._mapTextureWithInfo = function(texture, textureInfo, context) {
  "use strict";
  context = context.getContext ? context.getContext() : context;
  var lt = this.loadedTextures;
  for(var i = 0;i < lt.length;i++) {
    if(lt[i][0] === texture && lt[i][1] === context) {
      return lt[i][2];
    }
  }
  var loadedTex = texture instanceof H3DU.CubeMap ?
     new H3DU._LoadedCubeMap(texture, context) :
     new H3DU._LoadedTexture(texture, textureInfo, context);
  lt.push([texture, context, loadedTex]);
  return loadedTex;
};

/**
 * TODO: Not documented yet.
 * @param {*} texturesOrCubeMap
 * @param {*} resolve
 * @param {*} reject
 * @returns {*} Return value.
 * @memberof! H3DU.TextureLoader#
 */
H3DU.TextureLoader.prototype.loadCubeMap = function(texturesOrCubeMap, resolve, reject) {
  "use strict";
  var cubemap = texturesOrCubeMap;
  if(!(texturesOrCubeMap instanceof H3DU.CubeMap)) {
    cubemap = new H3DU.CubeMap(texturesOrCubeMap);
  }
  return H3DU.TextureLoader.prototype.loadTexturesAll(cubemap.textures, resolve, reject)
 .then(function() {
   return Promise.resolve(cubemap);
 });
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
 * @returns {void} Return value.
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

/*
 Any copyright to this file is released to the Public Domain.
 http://creativecommons.org/publicdomain/zero/1.0/
 If you like this, you should donate
 to Peter O. (original author of
 the Public Domain HTML 3D Library) at:
 http://peteroupc.github.io/
*/
/* global H3DU, Promise */

import {_LoadedCubeMap, _LoadedTexture} from "./h3du-binders";
import {FrameBufferLoader} from "./h3du-framebuffer";

/**
 * An object that caches loaded textures and uploads them
 * to WebGL contexts.
 * @constructor
 * @memberof H3DU
 */
export var TextureLoader = function() {
  this.loadedTextures = [];
  this.textureImages = {};
  this.maxAnisotropy = [];
  this.fbLoader = new FrameBufferLoader();
};
/**
 * Gets an already loaded texture by name from this texture loader.
 * @param {string} name The name of the texture, usually its file name.
 * @returns {H3DU.Texture} The texture with the given name, or null
 * if it isn't fully loaded or doesn't exist.
 */
TextureLoader.prototype.getTexture = function(name) {
  var tex = this.textureImages[name] || null;
  if(tex && tex.loadStatus !== 2) {
    return null;
  }
  return this.textureImages[name] || null;
};

/**
 * Loads a texture by its URL and stores its data.
 * @param {String|H3DU.TextureInfo|H3DU.Texture} texture An {@link H3DU.Texture} object,
 * an {@link H3DU.TextureInfo} object, or a string with the
 * URL of the texture data.<p>
 * Images with a TGA
 * extension that use the RGBA or grayscale format are supported.
 * Images supported by the browser will be loaded via
 * the JavaScript DOM's Image class.
 * @returns {Promise<H3DU.Texture>} A promise that resolves when the texture
 * is fully loaded. If it resolves, the result will be an H3DU.Texture object.
 */
TextureLoader.prototype.loadTexture = function(texture) {
  return H3DU.Texture.loadTexture(texture, this.textureImages);
};
/** @ignore */
TextureLoader.prototype._setMaxAnisotropy = function(context, target) {
  context = context.getContext ? context.getContext() : context;
  var ma = this.maxAnisotropy;
  for(var i = 0; i < ma.length; i++) {
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
 * @param {Array<String|H3DU.TextureInfo|H3DU.Texture>} textures An array of objects described in
 * {@link H3DU.TextureLoader.loadTexture}.
 * @param {Function} [resolve] A function called as each
 * individual texture is loaded and its promise resolves.
 * @param {Function} [reject] A function called as each
 * individual texture is loaded and its promise is rejected.
 * @returns {Promise<H3DU.Texture>} A promise as described in
 * {@link H3DU.getPromiseResultsAll}. If the promise
 * resolves, each item in the resulting array will be a loaded
 * {@link H3DU.Texture} object.
 */
TextureLoader.prototype.loadTexturesAll = function(textures, resolve, reject) {
  var promises = [];
  for(var i = 0; i < textures.length; i++) {
    promises.push(this.loadTexture(textures[i]));
  }
  return H3DU.getPromiseResultsAll(promises, resolve, reject);
};
/**
 * Loads the texture referred to in an array of URLs and
 * uploads its texture data to a WebGL context.
 * @param {String|H3DU.TextureInfo|H3DU.Texture} texture An object described in
 * {@link H3DU.TextureLoader.loadTexture}.
 * @param {WebGLRenderingContext|WebGL2RenderingContext|Object} context
 * A WebGL context to associate with this scene, or an object, such as {@link H3DU.Scene3D}, that
 * implements a no-argument <code>getContext</code> method
 * that returns a WebGL context.
 * @returns {Promise<H3DU.Texture>} A promise that resolves when
 * the texture is loaded successfully (the result will be an H3DU.Texture object)
 * and is rejected when an error occurs.
 */
TextureLoader.prototype.loadAndMapTexture = function(texture, context) {
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
 * @param {Array<String|H3DU.TextureInfo|H3DU.Texture>} textures An array of objects described in
 * {@link H3DU.TextureLoader.loadTexture}.
 * @param {WebGLRenderingContext|WebGL2RenderingContext|Object} context
 * A WebGL context to associate with this scene, or an object, such as {@link H3DU.Scene3D}, that
 * implements a no-argument <code>getContext</code> method
 * that returns a WebGL context.
 * @param {Function} [resolve] A function called as each
 * individual texture is loaded and its promise resolves.
 * @param {Function} [reject] A function called as each
 * individual texture is loaded and its promise is rejected.
 * @returns {Promise<H3DU.Texture>} A promise as described in
 * {@link H3DU.getPromiseResultsAll}. If the promise
 * resolves, each item in the resulting array will be a loaded
 * {@link H3DU.Texture} object.
 */
TextureLoader.prototype.loadAndMapTexturesAll = function(textures, context, resolve, reject) {
  context = context.getContext ? context.getContext() : context;
  var promises = [];
  for(var i = 0; i < textures.length; i++) {
    promises.push(this.loadAndMapTexture(textures[i], context));
  }
  return H3DU.getPromiseResultsAll(promises, resolve, reject);
};

/** @ignore */
TextureLoader.prototype._mapTextureWithInfo = function(texture, textureInfo, context) {
  context = context.getContext ? context.getContext() : context;
  var lt = this.loadedTextures;
  for(var i = 0; i < lt.length; i++) {
    if(lt[i][0] === texture && lt[i][1] === context) {
      return lt[i][2];
    }
  }
  var loadedTex = texture instanceof H3DU.CubeMap ?
     new _LoadedCubeMap(texture, context) :
     new _LoadedTexture(texture, textureInfo, context);
  lt.push([texture, context, loadedTex]);
  return loadedTex;
};

/**
 * Loads the textures described in a cube map.
 * @param {Array<String|H3DU.TextureInfo|H3DU.Texture>|H3DU.CubeMap} texturesOrCubeMap Either
 * an array of objects described in
 * {@link H3DU.TextureLoader.loadTexture} or a cube map object.
 * @param {Function} [resolve] A function called as each
 * individual texture is loaded and its promise resolves.
 * @param {Function} [reject] A function called as each
 * individual texture is loaded and its promise is rejected.
 * @returns {Promise<H3DU.Texture>} A promise that resolves when
 * all textures used by the cube map are loaded successfully
 * (the result will be an H3DU.CubeMap object)
 * and is rejected when an error occurs.
 */
TextureLoader.prototype.loadCubeMap = function(texturesOrCubeMap, resolve, reject) {
  var cubemap = texturesOrCubeMap;
  if(!(texturesOrCubeMap instanceof H3DU.CubeMap)) {
    cubemap = new H3DU.CubeMap(texturesOrCubeMap);
  }
  return H3DU.TextureLoader.prototype.loadTexturesAll(cubemap.textures, resolve, reject)
 .then(function() {
   return Promise.resolve(cubemap);
 });
};

/** @ignore */
TextureLoader.prototype.mapFrameBuffer = function(info, context) {
  context = context.getContext ? context.getContext() : context;
  return this.fbLoader.mapFrameBuffer(info, context);
};
/** @ignore */
TextureLoader.prototype.bindFrameBuffer = function(info, context, textureUnit) {
  context = context.getContext ? context.getContext() : context;
  return this.fbLoader.bind(info, context, textureUnit);
};
/** @ignore */
TextureLoader.prototype.unbindFrameBuffer = function(info, context) {
  context = context.getContext ? context.getContext() : context;
  this.fbLoader.unbind(info, context);
};
/**
 * Disposes all resources used by this texture loader.
 * @returns {void} This method doesn't return a value.
 */
TextureLoader.prototype.dispose = function() {
  for(var tex in this.textureImages) {
    if(Object.prototype.hasOwnProperty.call(this.textureImages, tex)) {
      this.textureImages[tex].dispose();
    }
  }
  var lt = this.loadedTextures;
  for(var i = 0; i < lt.length; i++) {
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

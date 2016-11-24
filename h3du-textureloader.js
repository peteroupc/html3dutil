/* global H3DU, Promise */
/**
* An object that caches loaded textures and uploads them
* to WebGL contexts.
* @class
* @alias H3DU.TextureLoader
*/
H3DU.TextureLoader = function(){
 "use strict";
this.loadedTextures=[];
 this.textureImages={};
 this.maxAnisotropy=[];
};
/**
 * Not documented yet.
 * @param {*} name
 * @memberof! H3DU.TextureLoader#
*/
H3DU.TextureLoader.prototype.getTexture=function(name){
 "use strict";
return this.textureImages[name]||null;
};

/**
 * Not documented yet.
 * @param {*} name
 * @memberof! H3DU.TextureLoader#
*/
H3DU.TextureLoader.prototype.loadTexture=function(name){
 "use strict";
return H3DU.Texture.loadTexture(name,this.textureImages);
};
/** @private */
H3DU.TextureLoader.prototype._setMaxAnisotropy=function(context){
 "use strict";
context= (context.getContext) ? context.getContext() : context;
 var ma=this.maxAnisotropy;
 for(var i=0;i<ma.length;i++){
  if(ma[i][0]===context){
   if(ma[i][2]>=0){
    context.texParameteri(context.TEXTURE_2D,ma[i][2],ma[i][1]);
   } else {
    return;
   }
  }
 }
 var ext=context.getExtension("EXT_texture_filter_anisotropic") ||
         context.getExtension("WEBKIT_EXT_texture_filter_anisotropic") ||
         context.getExtension("MOZ_EXT_texture_filter_anisotropic");
 if(!ext){
  ma.push([context,1,-1,null]);
  return 1;
 } else {
  var cnst=ext.TEXTURE_MAX_ANISOTROPY_EXT;
  var ret=context.getParameter(
    ext.MAX_TEXTURE_MAX_ANISOTROPY_EXT);
  ma.push([context,ret,cnst]);
  context.texParameteri(context.TEXTURE_2D,cnst,ret);
  return ret;
 }
};
/**
 * Not documented yet.
 * @param {*} textures
 * @param {*} resolve
 * @param {*} reject
 * @returns {Promise<H3DU.Texture>} A promise as described in
 * {@link H3DU.getPromiseResultsAll}.  If the promise
 * resolves, each item in the resulting array will be a loaded
 * {@link H3DU.Texture} object.
 * @memberof! H3DU.TextureLoader#
*/
H3DU.TextureLoader.prototype.loadTexturesAll=function(textures,resolve,reject){
 "use strict";
var promises=[];
 for(var i=0;i<textures.length;i++){
  promises.push(this.loadTexture(textures[i]));
 }
 return H3DU.getPromiseResultsAll(promises,resolve,reject);
};
/**
 * Not documented yet.
 * @param {String} texture
 * @param {*} context
 * @returns {Promise<H3DU.Texture>} A promise that resolves when
 * the texture is loaded successfully (the result will be an H3DU.Texture object)
 * and is rejected when an error occurs.
 * @memberof! H3DU.TextureLoader#
*/
H3DU.TextureLoader.prototype.loadAndMapTexture=function(texture,context){
  "use strict";
context= (context.getContext) ? context.getContext() : context;
  var thisObject=this;
  return this.loadTexture(texture).then(function(tex){
      thisObject.mapTexture(tex,context);
      return Promise.resolve(tex);
  });
};
/**
 * Not documented yet.
 * @param {Array<String>} textures
 * @param {*} context
 * @param {*} resolve
 * @param {*} reject
 * @returns {Promise<H3DU.Texture>} A promise as described in
 * {@link H3DU.getPromiseResultsAll}.  If the promise
 * resolves, each item in the resulting array will be a loaded
 * {@link H3DU.Texture} object.
 * @memberof! H3DU.TextureLoader#
*/
H3DU.TextureLoader.prototype.loadAndMapTexturesAll=function(textures,context,resolve,reject){
 "use strict";
context= (context.getContext) ? context.getContext() : context;
 var promises=[];
 var thisObject=this;
 for(var i=0;i<textures.length;i++){
  promises.push(this.loadAndMapTexture(textures[i],context));
 }
 return H3DU.getPromiseResultsAll(promises,resolve,reject);
};
/**
 * Not documented yet.
 * @param {*} textures
 * @param {*} context
 * @memberof! H3DU.TextureLoader#
*/
H3DU.TextureLoader.prototype.mapTextures=function(textures,context){
 "use strict";
context= (context.getContext) ? context.getContext() : context;
 for(var i=0;i<textures.length;i++){
  this.mapTexture(textures[i],context);
 }
 return this;
};
/**
 * Not documented yet.
 * @param {*} texture
 * @param {*} context
 * @memberof! H3DU.TextureLoader#
*/
H3DU.TextureLoader.prototype.mapTexture=function(texture,context){
 "use strict";
context= (context.getContext) ? context.getContext() : context;
 var lt=this.loadedTextures;
 for(var i=0;i<lt.length;i++){
  if(lt[i][0]===texture && lt[i][1]===context){
   return lt[i][2];
  }
 }
 var loadedTex=new H3DU._LoadedTexture(texture,context);
 lt.push([texture,context,loadedTex]);
 return loadedTex;
};
/**
 * Disposes all resources used by this texture loader.
 * @memberof! H3DU.TextureLoader#
*/
H3DU.TextureLoader.prototype.dispose=function(){
 "use strict";
for(var tex in this.textureImages){
  this.textureImages[tex].dispose();
 }
 var lt=this.loadedTextures;
 for(var i=0;i<lt.length;i++){
  this.loadedTextures[i][2].dispose();
 }
 this.textureImages={};
 this.loadedTextures=[];
 this.maxAnisotropy=[];
};

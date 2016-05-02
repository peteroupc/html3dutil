/**
* An object that caches loaded textures and uploads them
* to WebGL contexts.
*/
function TextureLoader(){
 this.loadedTextures=[];
 this.textureImages={};
 this.maxAnisotropy=[];
}
/**
 * Not documented yet.
 * @param {*} name
 */
TextureLoader.prototype.loadTexture=function(name){
 return Texture.loadTexture(name,this.textureImages);
}
/** @private */
TextureLoader.prototype._setMaxAnisotropy=function(context){
 context= (context.getContext) ? context.getContext() : context;
 var ma=this.maxAnisotropy;
 for(var i=0;i<ma.length;i++){
  if(ma[i][0]==context){
   if(ma[i][2]>=0){
    context.texParameteri(context.TEXTURE_2D,ma[i][2],ma[i][1]);
   } else {
    return;
   }
  }
 }
 var ext=context.getExtension("EXT_texture_filter_anisotropic") ||
         context.getExtension("WEBKIT_EXT_texture_filter_anisotropic") ||
         context.getExtension("MOZ_EXT_texture_filter_anisotropic")
 if(!ext){
  ma.push([context,1,-1])
  return 1
 } else {
  var cnst=ext.MAX_TEXTURE_MAX_ANISOTROPY_EXT;
  var ret=context.getParameter(cnst);
  ma.push([context,ret,cnst])
  context.texParameteri(context.TEXTURE_2D,cnst,ret);
  return ret
 }
}
/**
 * Not documented yet.
 * @param {*} textures
 * @param {*} resolve
 * @param {*} reject
 */
TextureLoader.prototype.loadTexturesAll=function(textures,resolve,reject){
 context= (context.getContext) ? context.getContext() : context;
 var promises=[]
 for(var i=0;i<textures.length;i++){
  promises.push(this.loadTexture(textures[i]));
 }
 return GLUtil.getPromiseResultsAll(textures,resolve,reject);
}
/**
 * Not documented yet.
 * @param {*} textures
 * @param {*} context
 */
TextureLoader.prototype.mapTextures=function(textures,context){
 context= (context.getContext) ? context.getContext() : context;
 for(var i=0;i<textures.length;i++){
  this.mapTexture(textures[i],context);
 }
 return this;
}
/**
 * Not documented yet.
 * @param {*} texture
 * @param {*} context
 */
TextureLoader.prototype.mapTexture=function(texture,context){
 context= (context.getContext) ? context.getContext() : context;
 var lt=this.loadedTextures;
 for(var i=0;i<lt.length;i++){
  if(lt[i][0]==texture && lt[i][1]==context){
   return lt[i][2];
  }
 }
 var loadedTex=new GLUtil._LoadedTexture(texture,context);
 lt.push([texture,context,loadedTex])
 return loadedTex;
}
/**
 * Not documented yet.
 */
TextureLoader.prototype.dispose=function(){
 for(var tex in this.textureImages){
  this.textureImages[tex].dispose();
 }
 for(var i=0;i<lt.length;i++){
  this.loadedTextures[i][2].dispose();
 }
 this.textureImages={}
 this.loadedTextures=[]
 this.maxAnisotropy=[]
}

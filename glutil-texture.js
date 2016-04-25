/**
*  Specifies a texture, which can serve as image data applied to
*  the surface of a shape, or even a 2-dimensional array of pixels
*  used for some other purpose, such as a depth map, a height map,
*  a bump map, a specular map, and so on.<p>
* By default, texture coordinates go from (0,0) at the lower left corner
* to (1,1) at the upper right corner.
* @class
* @alias glutil.Texture
* @param {string} name URL of the texture data.  It will be loaded via
*  the JavaScript DOM's Image class.  However, this constructor
*  will not load that image yet.
*/
var Texture=function(name){
 this.image=null;
 this.loadStatus=0;
 this.loadedTexture=null;
 this.name=name;
 this.width=0;
 this.clamp=false;
 this.height=0;
};

/**
* Sets the wrapping behavior of texture coordinates that
* fall out of range when using this texture.  This setting
* will only have an effect on textures whose width and height
* are both powers of two.  For other textures, this setting
* is ignored and out-of-range texture coordinates are
* always clamped.
* @param {boolean} clamp If true, the image's texture
* coordinates will be clamped to the range [0, 1].  If false,
* the image's texture coordinates' fractional parts will
* be used as the coordinates (causing wraparound).
* The default is false.
* @return {glutil.Texture} This object.
*/
Texture.prototype.setClamp=function(clamp){
 this.clamp=clamp;
 return this;
};

/**
*  Loads a texture by its URL.
* @param {string} name URL of the texture data.  Images with a TGA
* extension that use the RGBA or grayscale format are supported.
* Images supported by the browser will be loaded via
* the JavaScript DOM's Image class.
* @param {Object} [textureCache] An object whose keys
* are the names of textures already loaded.  This will help avoid loading
* the same texture more than once.  This parameter is optional
* and may be omitted.
* @return {Promise} A promise that resolves when the texture
* is fully loaded.  If it resolves, the result will be a Texture object.
*/
Texture.loadTexture=function(name, textureCache){
 // Get cached texture
 if(textureCache && textureCache[name]){
   return Promise.resolve(textureCache[name]);
 }
 var texImage=new Texture(name);
 if(textureCache){
  textureCache[name]=texImage;
 }
 // Load new texture and cache it
 return texImage.loadImage().then(
  function(result){
   return result;
  },
  function(name){
    return Promise.reject(name.name);
  });
};

/**
*  Creates a texture from a byte array specifying the texture data.
* @param {Uint8Array} array A byte array containing the texture data,
* with the pixels arranged in left-to-right rows from top to bottom.
* Each pixel takes 4 bytes, where the bytes are the red, green, blue,
* and alpha components, in that order.
* @param {Uint8Array} width Width, in pixels, of the texture.
* @param {Uint8Array} height Height, in pixels, of the texture.
* @return {glutil.Texture} The new Texture object.
*/
Texture.fromUint8Array=function(array, width, height){
 if(width<0)throw new Error("width less than 0");
 if(height<0)throw new Error("height less than 0");
 if(array.length<width*height*4)throw new Error("array too short for texture");
 var texImage=new Texture("");
 texImage.image=array;
 texImage.width=Math.ceil(width);
 texImage.height=Math.ceil(height);
 texImage.loadStatus=2;
 return texImage;
};

/** @private */
Texture.loadTga=function(name){
 var tex=this;
 return GLUtil.loadFileFromUrl(name,"arraybuffer")
 .then(function(buf){
   var view=new DataView(buf.data);
   var id=view.getUint8(0);
   var cmaptype=view.getUint8(1);
   var imgtype=view.getUint8(2);
   if(imgtype!==2 && imgtype!==3){
    return Promise.reject(new Error("unsupported image type"));
   }
   var xorg=view.getUint16(8,true);
   var yorg=view.getUint16(10,true);
   if(xorg!==0 || yorg!==0){
    return Promise.reject(new Error("unsupported origins"));
   }
   var width=view.getUint16(12,true);
   var height=view.getUint16(14,true);
   if(width===0 || height === 0){
    return Promise.reject(new Error("invalid width or height"));
   }
   var pixelsize=view.getUint8(16);
   if(!(pixelsize===32 && imgtype === 2) &&
      !(pixelsize===24 && imgtype === 2) &&
      !(pixelsize===8 && imgtype === 3)){
    return Promise.reject(new Error("unsupported pixelsize"));
   }
   var size=width*height;
   if(size>buf.data.length){
    return Promise.reject(new Error("size too big"));
   }
   var i;
   var arr=new Uint8Array(size*4);
   var offset=18;
   var io=0;
   if(pixelsize===32 && imgtype === 2){
    for(i=0,io=0;i<size;i++,io+=4){
     arr[io+2]=view.getUint8(offset);
     arr[io+1]=view.getUint8(offset+1);
     arr[io]=view.getUint8(offset+2);
     arr[io+3]=view.getUint8(offset+3);
     offset+=4;
    }
   } else if(pixelsize===24 && imgtype === 2){
    for(i=0,io=0;i<size;i++,io+=4){
     arr[io+2]=view.getUint8(offset);
     arr[io+1]=view.getUint8(offset+1);
     arr[io]=view.getUint8(offset+2);
     arr[io+3]=0xFF;
     offset+=3;
    }
   } else if(pixelsize===8 && imgtype === 3){
    for(i=0,io=0;i<size;i++,io+=4){
     var col=view.getUint8(offset);
     arr[io]=col;
     arr[io+1]=col;
     arr[io+2]=col;
     arr[io+3]=0xFF;
     offset++;
    }
   }
   buf.data=null;
   return {"width":width,"height":height,"image":arr};
  });
};

/** @private */
Texture.prototype.loadImage=function(){
 if(this.image!==null){
  // already loaded
  return Promise.resolve(this);
 }
 var thisImage=this;
 var thisName=this.name;
 thisImage.loadStatus=1;
 if((/\.tga$/i).test(thisName)){
  return Texture.loadTga(thisName).then(function(e){
   thisImage.image=e.image;
   thisImage.width=e.width;
   thisImage.height=e.height;
   thisImage.loadStatus=2;
   return thisImage;
  },function(e){
   thisImage.loadStatus=-1;
   return Promise.reject({"name":thisName,"error":e});
  });
 }
 return new Promise(function(resolve,reject){
  var image=new Image();
  image.onload=function(e) {
   var target=e.target;
   thisImage.image=target;
   thisImage.width=target.width;
   thisImage.height=target.height;
   thisImage.loadStatus=2;
   resolve(thisImage);
  };
  image.onerror=function(e){
   thisImage.loadStatus=-1;
   reject({"name":thisName,"error":e});
  };
  image.src=thisName;
 });
};
/**
 * Disposes the texture data in this object.
 */
Texture.prototype.dispose=function(){
 if(this.loadedTexture!==null){
  this.loadedTexture.dispose();
  this.loadedTexture=null;
 }
};

/**
* Gets the name of this texture.
*/
Texture.prototype.getName=function(){
 return name;
}

/*
 Any copyright to this file is released to the Public Domain.
 http://creativecommons.org/publicdomain/zero/1.0/
 If you like this, you should donate
 to Peter O. (original author of
 the Public Domain HTML 3D Library) at:
 http://peteroupc.github.io/
*/
/* global DataView, H3DU, Promise, Uint8Array */

/**
 * Specifies a texture, which can serve as image data applied to
 * the surface of a shape, or even a 2-dimensional array of pixels
 * used for some other purpose, such as a depth map, a height map,
 * a bump map, a specular map, and so on.<p>
 * For best results, any textures to be used in WebGL should have
 * width and height each equal to a power of 2, such as 2, 4, 8, 16,
 * and 32.
 * @class
 * @memberof H3DU
 * @param {String} name URL of the texture data. Based on the
 * URL, the texture may be loaded via the JavaScript DOM's Image
 * class. However, this constructor will not load that image yet.
 */
H3DU.Texture = function(name) {
  "use strict";
  this.image = null;
  // 0 = not loaded; 1 = loading; 2 = loaded; -1 = error
  this.loadStatus = 0;
  this.name = name;
  this.width = 0;
  this.height = 0;
  this.clamp = false;
};
/**
 * Gets this texture's known width.
 * @returns {Number} This texture's width in pixels.
 * Will be 0 if the texture's image data wasn't loaded yet.
 * @instance
 */
H3DU.Texture.prototype.getWidth = function() {
  "use strict";
  return this.width;
};
/**
 * Gets this texture's known height.
 * @returns {Number} This texture's height in pixels.
 * Will be 0 if the texture's image data wasn't loaded yet.
 * @instance
 */
H3DU.Texture.prototype.getHeight = function() {
  "use strict";
  return this.height;
};
/** @ignore */
H3DU.Texture.prototype._toInfo = function() {
  "use strict";
  return new H3DU.TextureInfo({
    "uri":this.name,
    "wrapS":this.clamp ? 33071 : 10497,
    "wrapT":this.clamp ? 33071 : 10497
  });
};

/**
 * Sets the wrapping behavior of texture coordinates that
 * fall out of range when using this texture. This setting
 * will only have an effect on textures whose width and height
 * are both powers of two. For other textures, this setting
 * is ignored and out-of-range texture coordinates are
 * always clamped.
 * @deprecated Use the TextureInfo class's "wrapS" and
 * "wrapT" parameters instead.
 * @param {Boolean} clamp If true, the texture's texture
 * coordinates will be clamped to the range [0, 1]. If false,
 * the fractional parts of the texture coordinates'
 * be used as the coordinates (causing wraparound).
 * The default is false.
 * @returns {H3DU.Texture} This object.
 * @instance
 */
H3DU.Texture.prototype.setClamp = function(clamp) {
  "use strict";
  this.clamp = !!clamp;
  return this;
};

/**
 * Loads a texture by its URL.
 * @param {String|H3DU.TextureInfo|H3DU.Texture} name An {@link H3DU.Texture} object,
 * an {@link H3DU.TextureInfo} object, or a string with the
 * URL of the texture data. Images with a TGA
 * extension that use the RGBA or grayscale format are supported.
 * Images supported by the browser will be loaded via
 * the JavaScript DOM's Image class.
 * @param {Object} [textureCache] An object whose keys
 * are the names of textures already loaded. This will help avoid loading
 * the same texture more than once.
 * @returns {Promise} A promise that resolves when the texture
 * is fully loaded. If it resolves, the result will be an H3DU.Texture object.
 */
H3DU.Texture.loadTexture = function(info, textureCache) {
 // Get cached texture
  "use strict";
  var texImage;
  var name;
  if(!(typeof info !== "undefined" && info !== null)) {
    throw new Error();
  }
  if(info instanceof H3DU.Texture) {
    name = info.name;
    texImage = info;
  } else {
    name = info instanceof H3DU.TextureInfo ? info.uri : info;
    if(textureCache && textureCache[name] && name && name.length > 0) {
      return Promise.resolve(textureCache[name]);
    }
    texImage = new H3DU.Texture(name);
  }
  if(textureCache && name && name.length > 0) {
    textureCache[name] = texImage;
  }
 // Load new texture
  return texImage.loadImage().then(
  function(result) {
    return result;
  },
  function(name) {
    return Promise.reject(name.name);
  });
};

/**
 * Creates a texture from a byte array specifying the texture data.
 * @param {Uint8Array} array A byte array containing the texture data,
 * with the pixels arranged in left-to-right rows from top to bottom.
 * Each pixel takes 4 bytes, where the bytes are the red, green, blue,
 * and alpha components, in that order.
 * @param {Uint8Array} width Width, in pixels, of the texture.
 * @param {Uint8Array} height Height, in pixels, of the texture.
 * @returns {H3DU.Texture} The new H3DU.Texture object.
 */
H3DU.Texture.fromUint8Array = function(array, width, height) {
  "use strict";
  if(width < 0)throw new Error("width less than 0");
  if(height < 0)throw new Error("height less than 0");
  if(array.length < width * height * 4)throw new Error("array too short for texture");
  var texImage = new H3DU.Texture("");
  texImage.image = array;
  texImage.width = Math.ceil(width);
  texImage.height = Math.ceil(height);
  texImage.loadStatus = 2;
  return texImage;
};

/** @ignore */
H3DU.Texture.loadTga = function(name) {
  "use strict";
  return H3DU.loadFileFromUrl(name, "arraybuffer")
 .then(function(buf) {
   var view = new DataView(buf.data);
  // NOTE: id is byte 0; cmaptype is byte 1
   var imgtype = view.getUint8(2);
   if(imgtype !== 2 && imgtype !== 3) {
     return Promise.reject(new Error("unsupported image type"));
   }
   var xorg = view.getUint16(8, true);
   var yorg = view.getUint16(10, true);
   if(xorg !== 0 || yorg !== 0) {
     return Promise.reject(new Error("unsupported origins"));
   }
   var width = view.getUint16(12, true);
   var height = view.getUint16(14, true);
   if(width === 0 || height === 0) {
     return Promise.reject(new Error("invalid width or height"));
   }
   var pixelsize = view.getUint8(16);
   if(!(pixelsize === 32 && imgtype === 2) &&
      !(pixelsize === 24 && imgtype === 2) &&
      !(pixelsize === 8 && imgtype === 3)) {
     return Promise.reject(new Error("unsupported pixelsize"));
   }
   var size = width * height;
   if(size > buf.data.length) {
     return Promise.reject(new Error("size too big"));
   }
   var i;
   var arr = new Uint8Array(size * 4);
   var offset = 18;
   var io = 0;
   if(pixelsize === 32 && imgtype === 2) {
     for(i = 0, io = 0; i < size; i++, io += 4) {
       arr[io + 2] = view.getUint8(offset);
       arr[io + 1] = view.getUint8(offset + 1);
       arr[io] = view.getUint8(offset + 2);
       arr[io + 3] = view.getUint8(offset + 3);
       offset += 4;
     }
   } else if(pixelsize === 24 && imgtype === 2) {
     for(i = 0, io = 0; i < size; i++, io += 4) {
       arr[io + 2] = view.getUint8(offset);
       arr[io + 1] = view.getUint8(offset + 1);
       arr[io] = view.getUint8(offset + 2);
       arr[io + 3] = 0xFF;
       offset += 3;
     }
   } else if(pixelsize === 8 && imgtype === 3) {
     for(i = 0, io = 0; i < size; i++, io += 4) {
       var col = view.getUint8(offset);
       arr[io] = col;
       arr[io + 1] = col;
       arr[io + 2] = col;
       arr[io + 3] = 0xFF;
       offset++;
     }
   }
   buf.data = null;
   return {
     "width":width,
     "height":height,
     "image":arr
   };
 });
};

/** @ignore */
H3DU.Texture.prototype.loadImage = function() {
  "use strict";
  if(typeof this.image !== "undefined" && this.image !== null) {
  // already loaded
    return Promise.resolve(this);
  }
  var that = this;
  var thisName = this.name;
  that.loadStatus = 1;
 // Use the TGA image loader if it has the TGA file
 // extension
  if((/\.tga$/i).test(thisName)) {
    return H3DU.Texture.loadTga(thisName).then(function(e) {
      that.image = e.image;
      that.width = e.width;
      that.height = e.height;
      that.loadStatus = 2;
      return that;
    }, function(e) {
      that.loadStatus = -1;
      return Promise.reject({
        "name":thisName,
        "error":e
      });
    });
  }
  return new Promise(function(resolve, reject) {
    var image = new Image();
    image.onload = function(e) {
      var target = e.target;
      that.image = target;
      that.width = target.width;
      that.height = target.height;
      that.loadStatus = 2;
   // console.log("loaded: "+thisName)
      image.onload = null;
      image.onerror = null;
      resolve(that);
    };
    image.onerror = function(e) {
      that.loadStatus = -1;
   // console.log("error: "+thisName)
   // console.log(e)
      image.onload = null;
      image.onerror = null;
      reject({
        "name":thisName,
        "error":e
      });
    };
    image.src = thisName;
  });
};
/**
 * Disposes resources used by this texture.
 * @instance
 * @returns {Object} Return value.
 */
H3DU.Texture.prototype.dispose = function() {
  "use strict";
  this.width = 0;
  this.height = 0;
  this.name = "";
  if(this.image) {
    if(typeof this.image.onload !== "undefined" && this.image.onload !== null) {
      this.image.onload = null;
    }
    if(typeof this.image.onerror !== "undefined" && this.image.onerror !== null) {
      this.image.onerror = null;
    }
  }
  this.image = null;
  this.clamp = false;
  this.loadStatus = 0;
};

/**
 * Gets the name of this texture.
 * @returns {String} Return value.
 * @instance
 */
H3DU.Texture.prototype.getName = function() {
  "use strict";
  return name;
};
/** @ignore */
H3DU.Texture._texOrString = function(tex) {
  "use strict";
  return typeof tex === "string" ? new H3DU.Texture(tex) : tex;
};
/** @ignore */
H3DU.Texture._texOrInfoOrString = function(tex) {
  "use strict";
  if(typeof tex === "undefined" || tex === null)return null;
  if(typeof tex === "string")return new H3DU.Texture(tex);
  if(tex instanceof H3DU.TextureInfo)return new H3DU.TextureInfo(tex.uri);
  return tex;
};

// //////////////////////////////////////////

/**
 * A cube map, or a set of six textures forming the sides of a cube.
 * @param {Array<String|Texture|TextureInfo>} name An array of six elements,
 * each of which is a URL of the texture data or the texture object itself.
 * However, this constructor will not load those images yet.
 * The six texture are, in order, the texture seen when looking toward the positive
 * X axis, the negative X axis, positive Y, negative Y, positive Z,
 * and negative Z.
 * @class
 * @memberof H3DU
 */
H3DU.CubeMap = function(textures) {
  "use strict";
  this.textures = [];
  this.loadStatus = 0;
  for(var i = 0; i < 6; i++) {
    this.textures.push(H3DU.Texture._texOrInfoOrString(textures[i]));
  }
};
/**
 * Gets this texture's known width.
 * @returns {Number} This texture's width in pixels.
 * Will be 0 if the texture's image data wasn't loaded yet.
 * @instance
 */
H3DU.CubeMap.prototype.getWidth = function() {
  "use strict";
  return this.textures[0].getWidth();
};
/**
 * Gets this texture's known height.
 * @returns {Number} This texture's height in pixels.
 * Will be 0 if the texture's image data wasn't loaded yet.
 * @instance
 */
H3DU.CubeMap.prototype.getHeight = function() {
  "use strict";
  return this.textures[0].getHeight();
};
/**
 * Sets a texture used by this cube map.
 * @param {Number} index Texture index to set, from 0 through 5.
 * @param {H3DU.Texture|H3DU.TextureInfo|String} texture An {@link H3DU.Texture} object,
 * a texture information object,
 * or a string with the URL of the texture data.
 * @returns {H3DU.CubeMap} This object.
 * @instance
 */
H3DU.CubeMap.prototype.setTexture = function(index, texture) {
  "use strict";
  if(index < 0 || index >= 6)return this;
  this.textures[index] = H3DU.Texture._texOrInfoOrString(texture);
  return this;
};
/**
 * Gets a texture used by this cube map.
 * @param {Number} index Texture index to get.
 * @returns {H3DU.Texture} The texture with the given index.
 * @instance
 */
H3DU.CubeMap.prototype.getTexture = function(index) {
  "use strict";
  if(index < 0 || index >= 6)return this;
  return this.textures[index];
};
/** @ignore */
H3DU.CubeMap.prototype.loadImage = function() {
  "use strict";
  var i;
  if(this.loadStatus === 2) {
    for(i = 0; i < 6; i++) {
      if(this.textures[i].loadStatus !== 2) {
        this.loadStatus = 0;
      }
    }
    if(this.loadStatus === 2) {
      return Promise.resolve(this);
    }
  }
  var promises = [];
  for(i = 0; i < 6; i++) {
    promises.push(this.textures[i].loadImage());
  }
  var that = this;
  that.loadStatus = 1;
  return H3DU.getPromiseResultsAll(promises).then(function() {
    that.loadStatus = 2;
    return Promise.resolve(that);
  });
};

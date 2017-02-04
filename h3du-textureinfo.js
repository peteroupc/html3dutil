/* global H3DU */
/*
 Any copyright to this file is released to the Public Domain.
 http://creativecommons.org/publicdomain/zero/1.0/
 If you like this, you should donate
 to Peter O. (original author of
 the Public Domain HTML 3D Library) at:
 http://peteroupc.github.io/
*/

/**
 * Specifies information about a texture, which can serve as image data applied to
 * the surface of a shape, or even a 2-dimensional array of pixels
 * used for some other purpose, such as a depth map, a height map,
 * a bump map, a specular map, and so on.<p>
 * By default, texture coordinates go from (0,0) at the lower left corner
 * to (1,1) at the upper right corner (because the "topDown" property is false
 * by default).<p>
 * For best results, any textures to be used in WebGL should have
 * width and height each equal to a power of 2, such as 2, 4, 8, 16,
 * and 32.
 * @class
 * @alias H3DU.TextureInfo
 * @param {Object} [params] An object as described in {@link H3DU.TextureInfo.setParams}.
 */
H3DU.TextureInfo = function(params) {
  "use strict";
  this.uri = "";
  this.topDown = false;
  this.format = 6408;
  this.internalFormat = 6408;
  this.target = 3553;
  this.type = 5121;
  this.magFilter = 9729;
  this.minFilter = 9986;
  this.wrapS = 10497;
  this.wrapT = 10497;
  this.setParams(params);
};
/**
 * Copies the parameters from another texture information object to this
 * object.
 * @param {H3DU.TextureInfo} [other] Texture information object to copy.
 * @returns {H3DU.TextureInfo} This object.
 * @memberof! H3DU.TextureInfo#
 */
H3DU.TextureInfo.prototype.copyFrom = function(other) {
  "use strict";
  if(typeof other !== "undefined" && (other !== null && typeof other !== "undefined")) {
    this.uri = typeof other.uri === "undefined" || other.uri === null ? "" : other.uri;
    this.format = typeof other.format === "undefined" || other.format === null ? 6408 : other.format;
    this.internalFormat = typeof other.internalFormat === "undefined" || other.internalFormat === null ? 6408 : other.internalFormat;
    this.target = typeof other.target === "undefined" || other.target === null ? 3553 : other.target;
    this.type = typeof other.type === "undefined" || other.type === null ? 5121 : other.type;
    this.magFilter = typeof other.magFilter === "undefined" || other.magFilter === null ? 9729 : other.magFilter;
    this.minFilter = typeof other.minFilter === "undefined" || other.minFilter === null ? 9986 : other.minFilter;
    this.wrapS = typeof other.wrapS === "undefined" || other.wrapS === null ? 10497 : other.wrapS;
    this.wrapT = typeof other.wrapT === "undefined" || other.wrapT === null ? 10497 : other.wrapT;
    this.topDown = typeof other.topDown === "undefined" || other.topDown === null ? 10497 : other.topDown;
  }
  return this;
};

/**
 * Sets parameters for this texture information object.
 * @param {Object} params An object whose keys have
 * the possibilities given below, and whose values are those
 * allowed for each key.<ul>
 * <li><code>uri</code> - URI (Internet address) of the texture's data.
 * <li><code>format</code> - Specifies the kind of data stored in each pixel of the texture.
 * Can be 6406, 6407, 6408 (RGBA), 6409, 6410.
 * <li><code>internalFormat</code> - Specifies the format of the texture.  Can be one of the values for "format".
 * <li><code>target</code> - Specifies the texture target. Can be 3553 (TEXTURE_2D).
 * <li><code>type</code> - Specifies the data type used to encode each pixel component in the texture. Can be 5121, 33635, 32819, 32820.
 * <li><code>magFilter</code> - Specifies the filter to use when enlarging the texture. Can be 9728 (NEAREST) or 9729 (LINEAR).
 * <li><code>minFilter</code> -  Specifies the filter to use when shrinking the texture.  Can be one of the values for "magFilter" or 9984, 9985, 9986 (NEAREST_MIPMAP_LINEAR), 9987.
 * <li><code>wrapS</code> - Specifies the wrapping mode in the S (horizontal) axis. Can be 10497 (REPEAT), 33071, 33648.
 * <li><code>wrapT</code> -Specifies the wrapping mode in the T (horizontal) axis.  Can be one of the values for "wrapS".
 * <li><code>topDown</code> - If true, the image's data will be stored starting from the top row and proceeding downwards.
 * </ul>
 * Any or all of these keys can exist in the parameters object. If a value is null or undefined, it is ignored
 * unless otherwise noted.
 * @returns {H3DU.TextureInfo} This object.
 * @memberof! H3DU.TextureInfo#
 */
H3DU.TextureInfo.prototype.setParams = function(params) {
  "use strict";
  if(typeof params !== "undefined" && (params !== null && typeof params !== "undefined")) {
    if(typeof params.uri !== "undefined" && params.uri !== null) {
      this.uri = params.uri;
    }
    if(typeof params.format !== "undefined" && params.format !== null) {
      this.format = params.format;
    }
    if(typeof params.internalFormat !== "undefined" && params.internalFormat !== null) {
      this.internalFormat = params.internalFormat;
    }
    if(typeof params.target !== "undefined" && params.target !== null) {
      this.target = params.target;
    }
    if(typeof params.type !== "undefined" && params.type !== null) {
      this.type = params.type;
    }
    if(typeof params.magFilter !== "undefined" && params.magFilter !== null) {
      this.magFilter = params.magFilter;
    }
    if(typeof params.minFilter !== "undefined" && params.minFilter !== null) {
      this.minFilter = params.minFilter;
    }
    if(typeof params.wrapS !== "undefined" && params.wrapS !== null) {
      this.wrapS = params.wrapS;
    }
    if(typeof params.wrapT !== "undefined" && params.wrapT !== null) {
      this.wrapT = params.wrapT;
    }
    if(typeof params.topDown !== "undefined" && params.topDown !== null) {
      this.topDown = params.topDown;
    }
  }
  return this;
};
/** @private */
H3DU.TextureInfo._texInfoOrString = function(tex) {
  "use strict";
  return typeof tex === "string" ? new H3DU.TextureInfo({"uri":tex}) : tex;
};

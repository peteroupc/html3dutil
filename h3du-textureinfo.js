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
 * to (1,1) at the upper right corner.<p>
 * For best results, any textures to be used in WebGL should have
 * width and height each equal to a power of 2, such as 2, 4, 8, 16,
 * and 32.
 * @class
 * @alias H3DU.TextureInfo
 * @param {Object} [params] An object as described in {@link H3DU.TextureInfo.setParams}.
 */
H3DU.TextureInfo = function(params) {
  "use strict";
  this.url = "";
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
 * TODO: Not documented yet.
 * @param {H3DU.TextureInfo} [other] Texture information object to copy.
 * @returns {H3DU.TextureInfo} This object.
 * @memberof! H3DU.TextureInfo#
 */
H3DU.TextureInfo.prototype.copyFrom = function(other) {
  "use strict";
  if(typeof other !== "undefined" && (other !== null && typeof other !== "undefined")) {
    this.url = typeof other.url === "undefined" || other.url === null ? "" : other.url;
    this.format = typeof other.format === "undefined" || other.format === null ? 6408 : other.format;
    this.internalFormat = typeof other.internalFormat === "undefined" || other.internalFormat === null ? 6408 : other.internalFormat;
    this.target = typeof other.target === "undefined" || other.target === null ? 3553 : other.target;
    this.type = typeof other.type === "undefined" || other.type === null ? 5121 : other.type;
    this.magFilter = typeof other.magFilter === "undefined" || other.magFilter === null ? 9729 : other.magFilter;
    this.minFilter = typeof other.minFilter === "undefined" || other.minFilter === null ? 9986 : other.minFilter;
    this.wrapS = typeof other.wrapS === "undefined" || other.wrapS === null ? 10497 : other.wrapS;
    this.wrapT = typeof other.wrapT === "undefined" || other.wrapT === null ? 10497 : other.wrapT;
  }
  return this;
};

/**
 * TODO: Not documented yet.
 * @param {Object} params TODO: Not documented yet.
 * @returns {H3DU.TextureInfo} This object.
 * @memberof! H3DU.TextureInfo#
 */
H3DU.TextureInfo.prototype.setParams = function(params) {
  "use strict";
  if(typeof params !== "undefined" && (params !== null && typeof params !== "undefined")) {
    if(typeof params.url !== "undefined" && params.url !== null) {
      this.url = params.url;
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
  }
  return this;
};/** @private */
H3DU.TextureInfo._texInfoOrString = function(tex) {
  "use strict";
  return typeof tex === "string" ? new H3DU.TextureInfo({"uri":tex}) : tex;
};

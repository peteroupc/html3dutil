/* global Float32Array, H3DU, Int16Array, Int32Array, Int8Array, Uint16Array, Uint32Array, Uint8Array */
/*
 Any copyright to this file is released to the Public Domain.
 http://creativecommons.org/publicdomain/zero/1.0/
 If you like this, you should donate
 to Peter O. (original author of
 the Public Domain HTML 3D Library) at:
 http://peteroupc.github.io/
*/

/** @ignore */
var GltfArray = function(array, count, type, byteSize, byteStride) {
  this.type = type;
  this.array = array;
  this.elementByteSize = byteSize;
  this.byteStride = byteStride;
  this.elementsPerValue = 0;
  if(type === "SCALAR")this.elementsPerValue = 1;
  if(type === "VEC2")this.elementsPerValue = 2;
  if(type === "VEC3")this.elementsPerValue = 3;
  if(type === "VEC4")this.elementsPerValue = 4;
  if(type === "MAT2")this.elementsPerValue = 4;
  if(type === "MAT3")this.elementsPerValue = 9;
  if(type === "MAT4")this.elementsPerValue = 16;
  this.valueCount = count;
  this.elementCount = count * this.elementsPerValue;
};
/** @ignore */
GltfArray.prototype.valueByteSize = function() {
  return this.elementByteSize * this.elementsPerValue;
};
/** @ignore */
GltfArray.prototype.elementStride = function() {
  if(this.byteStride === 0) {
    return this.elementsPerValue;
  }
  return this.byteStride / this.elementByteSize | 0;
};

/** @ignore */
GltfArray.prototype.toValueArray = function() {
  if(this.byteStride !== 0 && this.byteStride !== this.valueByteSize()) {
    throw new Error("Byte stride not yet supported in toValueArray");
  }
  if(this.elementsPerValue === 1) {
    return this.array.slice(0, this.elementCount);
  } else {
    var ret = [];
    var j = 0;
    for(var i = 0; i < this.valueCount; i++) {
      ret.push(this.array.slice(j, j + this.elementsPerValue));
      j += this.elementsPerValue;
    }
    return ret;
  }
};
  /** @ignore
   * @constructor */
var GltfUtil = function() {
    // empty
};
  /** @ignore */
GltfUtil.arrayToView = function(arr, reference) {
  if(reference instanceof Uint8Array) {
    return new Uint8Array(arr);
  }
  if(reference instanceof Uint32Array) {
    return new Uint32Array(arr);
  }
  return new Uint16Array(arr);
};
  /** @ignore */
GltfUtil.lineStripToLines = function(strip) {
  var ret = [];
  if(strip.length < 2) {
    return strip;
  }

  for(var i = 1; i < strip.length; i++) {
    ret.push(strip[i - 1], strip[i]);
  }
  return GltfUtil.arrayToView(ret, strip);
};
  /** @ignore */
GltfUtil.lineLoopToLines = function(strip) {
  var ret = [];
  if(strip.length < 2) {
    return strip;
  }
  for(var i = 1; i < strip.length; i++) {
    ret.push(strip[i - 1], strip[i]);
  }
  ret.push(strip[strip.length - 1], strip[0]);
  return GltfUtil.arrayToView(ret, strip);
};

/** @ignore */
GltfUtil.triangleFanToTriangles = function(fan) {
  var ret = [];
  if(fan.length < 3) {
    return fan;
  }
  for(var i = 2; i < fan.length; i++) {
    ret.push(fan[0], fan[i - 1], fan[i]);
  }
  return GltfUtil.arrayToView(ret, fan);
};

/** @ignore */
GltfUtil.triangleStripToTriangles = function(strip) {
  var ret = [];
  if(strip.length < 3) {
    return strip;
  }
  var flip = false;
  for(var i = 2; i < strip.length; i++) {
    if(flip) {
      ret.push(strip[i - 2], strip[i - 1], strip[i]);
    } else {
      ret.push(strip[i - 1], strip[i - 2], strip[i]);
    }
  }
  return GltfUtil.arrayToView(ret, strip);
};

/** @ignore */
GltfUtil._elementsPerValue = function(type) {
  if(type === "SCALAR")return 1;
  if(type === "VEC2")return 2;
  if(type === "VEC3")return 3;
  if(type === "VEC4")return 4;
  if(type === "MAT2")return 4;
  if(type === "MAT3")return 9;
  if(type === "MAT4")return 16;
  return 0;
};
/** @ignore */
GltfUtil._resolvePath = function(path, name) {
 // Return data URIs directly
  if(name.indexOf("data:") === 0) {
    return name;
  }
 // Relatively dumb for a relative path
 // resolver, but sufficient here, as it will
 // only be used with relative path
 // strings
  var ret = path;
  var lastSlash = ret.lastIndexOf("/");
  if(lastSlash >= 0) {
    ret = ret.substr(0, lastSlash + 1) + name.replace(/\\/g, "/");
  } else {
    ret = name.replace(/\\/g, "/");
  }
  return ret;
};

/** @ignore */
GltfUtil._makeArray = function(componentType, buffer, bufferOffset, elementCount) {
  if(componentType === 5120) {
    return new Int8Array(buffer, bufferOffset, elementCount);
  }
  if(componentType === 5121) {
    return new Uint8Array(buffer, bufferOffset, elementCount);
  }
  if(componentType === 5122) {
    return new Int16Array(buffer, bufferOffset, elementCount);
  }
  if(componentType === 5123) {
    return new Uint16Array(buffer, bufferOffset, elementCount);
  }
  if(componentType === 5124) {
    return new Int32Array(buffer, bufferOffset, elementCount);
  }
  if(componentType === 5125) {
    return new Uint32Array(buffer, bufferOffset, elementCount);
  }
  if(componentType === 5126) {
    return new Float32Array(buffer, bufferOffset, elementCount);
  }
  return null;
};
/** @ignore */
GltfUtil._bytesPerElement = function(componentType) {
  if(componentType === 5120 || componentType === 5121)return 1;
  if(componentType === 5122 || componentType === 5123)return 2;
  if(componentType === 5124 || componentType === 5125)return 4;
  if(componentType === 5126)return 4;
  return 0;
};
  /** @ignore */
GltfUtil._lerp = function(s, e, t) {
  if(s.length === 4 && e.length === 4) {
    return H3DU.Math.vec4lerp(s, e, t);
  } else if(s.length === 3 && e.length === 3) {
    return H3DU.Math.vec3lerp(s, e, t);
  } else {
    console.warn("Lerp not supported with this kind of data");
    return null;
  }
};
/** @ignore */
GltfUtil._slerp = function(s, e, t) {
  if(s.length === 4 && e.length === 4) {
    return H3DU.Math.quatSlerp(s, e, t);
  } else {
    console.warn("Slerp not supported with this kind of data");
    return null;
  }
};
/** @ignore */
GltfUtil.hasUniqueItems = function(items) {
  if(items.length === 0)return true;
  if(items.length === 1 && items[0] >= 0)return true;
  if(items[0] < 0)return false;
  var s = items.sort();
  for(var i = 0; i < s.length - 1; i++) {
    if(s[i] === s[i + 1])return false;
  }
  return true;
};
  /** @ignore */
GltfUtil.addExtensionsExtras = function(property, retval) {
  retval.extras = typeof property.extras !== "undefined" && property.extras !== null ?
  property.extras : {};
  retval.extensions = typeof property.extensions !== "undefined" && property.extensions !== null ?
    property.extensions : {};
  return retval;
};
  /** @ignore */
GltfUtil.parseStringDefault = function(value, defaultValue) {
  if(typeof value === "undefined")return defaultValue;
  if(typeof value !== "string")throw new Error();
  return value;
};
  /** @ignore */
GltfUtil.parseString = function(value) {
  if(typeof value === "undefined")return "";
  if(typeof value !== "string")throw new Error();
  return value;
};
  /** @ignore */
GltfUtil.parseArrayFixedLength = function(value, len, defvalue) {
  if(typeof value === "undefined")return defvalue;
  if(!(value instanceof Array) || value.length !== len)throw new Error();
  return value;
};
  /** @ignore */
GltfUtil.parseArrayMin1 = function(value) {
  if(typeof value === "undefined")return [];
  if(!(value instanceof Array) || value.length === 0)throw new Error();
  return value;
};
/**
 * TODO: Not documented yet.
 * @param {*} value
 * @returns {*} Return value.
 */
GltfUtil.parseArrayUniqueMin1 = function(value) {
  if(typeof value === "undefined")return [];
  if(!(value instanceof Array) || value.length === 0 ||
     !GltfUtil.hasUniqueItems(value))throw new Error();
  return value;
};
// Process a nonnegative integer value, returning -1
// if the value is undefined
GltfUtil.parseNonnegativeInteger = function(value) {
  if(typeof value === "undefined")return -1;
  if(typeof value !== "number" || Math.floor(value) !== value || isNaN(value) ||
     value === Number.POSITIVE_INFINITY || value < 0)throw new Error();
  return value;
};
  /** @ignore */
GltfUtil.parseNonnegativeNumber = function(value) {
  if(typeof value === "undefined")return -1;
  if(typeof value !== "number" || isNaN(value) ||
     value === Number.POSITIVE_INFINITY || value < 0)throw new Error();
  return value;
};
  /** @ignore */
GltfUtil.parseNonnegativeNumberDefault = function(value, defValue) {
  return typeof value === "undefined" ? defValue :
     GltfUtil.parseNonnegativeNumber(value);
};
  /** @ignore */
GltfUtil.parseNonnegativeIntegerDefault = function(value, defValue) {
  return typeof value === "undefined" ? defValue :
     GltfUtil.parseNonnegativeInteger(value);
};
export {GltfArray, GltfUtil};

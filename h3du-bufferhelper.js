/* global ArrayBuffer, Float32Array, H3DU, Uint16Array, Uint32Array */
/*
 Any copyright to this file is released to the Public Domain.
 http://creativecommons.org/publicdomain/zero/1.0/
 If you like this, you should donate
 to Peter O. (original author of
 the Public Domain HTML 3D Library) at:
 http://peteroupc.github.io/
*/

/**
 * A helper class for accessing and setting data in vertex attributes.<p>
 * A vertex attribute holds a <i>buffer</i> of arbitrary size.<p>
 * A vertex attribute object includes the following:<ul>
 * <li>A semantic, such as {@link H3DU.Semantic.POSITION}, which describes
 * the kind of data each value holds.
 * <li>A semantic index, which distinguishes attributes with the same semantic
 * in the same mesh buffer object.
 * <li>A <i>buffer</i> of arbitrary size. This buffer
 * is made up of <i>values</i>, one for each vertex, and each value
 * is made up of one or more <i>elements</i>, which are numbers such
 * as X coordinates or red components, depending on the attribute's semantic.
 * Each value has the same number of elements.
 * <li>An offset, which identifies the index, starting from 0, of the first value
 * of the attribute within the given buffer.
 * <li>A count of the number of elements each value has. For example, 3-dimensional
 * positions will have 3 elements, one for each coordinate.
 * <li>A stride, which gives the number of elements from the start of one
 * value to the start of the next.  A "packed" buffer will have a stride
 * equal to the number of elements per value.</ul>
 * @constructor
 * @memberof H3DU
 */
export var BufferHelper = function() {
 // Has no properties to initialize.
};
/**
 * TODO: Not documented yet.
 * @param {*} a
 * @returns {*} Return value.
 */
BufferHelper.prototype.getBuffer = function(a) {
  return typeof a === "undefined" || a === null ? null : a[2];
};
/**
 * Gets the number of values defined for a vertex attribute.
 * @param {Array<Object>} a An object describing information about a vertex attribute.
 * @returns {number} The number of values defined in the attribute object's buffer.
 */
BufferHelper.prototype.count = function(a) {
  var olen = a[2].length - a[1];
  var odiv = Math.floor(olen / a[4]);
  return odiv + (olen % a[4] >= a[3] ? 1 : 0);
};
/**
 * Gets the number of elements (numbers) that each value of a vertex attribute uses.
 * @param {Array<Object>} a An object describing information about a vertex attribute.
 * Can be null.
 * @returns {number} The number of elements per value of the vertex attribute, or 0 if "a" is null,
 * undefined, or omitted.
 */
BufferHelper.prototype.countPerValue = function(a) {
  return typeof a === "undefined" || a === null ? 0 : a[3] * 1.0;
};
/**
 * Creates an object describing information about a vertex attribute.
 * Each value in the attribute will be initialized to all zeros.
 * @param {number|String} semantic An attribute semantic, such
 * as {@link H3DU.Semantic.POSITION}, "POSITION", or "TEXCOORD_0".
 * Throws an error if this value is a string and the string is invalid.
 * @param {number} semanticIndex The set index of the attribute
 * for the given semantic.
 * 0 is the first index of the attribute, 1 is the second, and so on.
 * This is ignored if "semantic" is a string.
 * @param {number} count Number of values. Each value describes the attribute's value
 * for the corresponding vertex.
 * @param {number} countPerValue Number of elements (numbers) for each value.
 * @returns {Array<Object>} A new vertex attribute with blank values.
 */
BufferHelper.prototype.makeBlank = function(semantic, index, count, countPerValue) {
  if(typeof semantic === "number") {
    var els = new Float32Array(new ArrayBuffer(count * countPerValue * 4));
    return [semantic, index, els, countPerValue, countPerValue, index];
  } else {
    var sem = this.resolveSemantic(semantic, index);
    if(typeof sem === "undefined" || sem === null)throw new Error();
    els = new Float32Array(new ArrayBuffer(count * countPerValue * 4));
    return [sem[0], sem[1], els, countPerValue, countPerValue, index];
  }
};
/**
 * Generates an array of increasing vertex indices
 * @param {number} numIndices The number of vertex indices to generate.
 * The array will range from 0 to the number of vertex indices minus 1.
 * @returns {Uint16Array|Uint32Array} An array of vertex indices.
 */
BufferHelper.prototype.makeIndices = function(numIndices) {
  var array;
  if(numIndices < 65536) {
    array = new Uint16Array(new ArrayBuffer(numIndices * 2));
  } else {
    array = new Uint32Array(new ArrayBuffer(numIndices * 4));
  }
  for(var i = 0; i < numIndices; i++) {
    array[i] = i;
  }
  return array;
};
/**
 * Merges two vertex attributes, whose vertices can be indexed differently, into one
 * combined vertex attribute, where one of the input attributes is assumed to consist
 * of all-zero values.
 * @param {Array<Object>} attr An object describing information about a vertex attribute.
 * @param {Array<number>|Uint8Array|Uint16Array|Uint32Array} indices1 An array of vertex indices to vertices that will appear first in the merged attribute. The vertex indices are those of the first vertex attribute.
 * @param {Array<number>|Uint8Array|Uint16Array|Uint32Array} indices2 An array of vertex indices to vertices that will appear second in the merged attribute. The vertex indices are those of the first vertex attribute.
 * @param {*} attrIsSecond
 * @returns {Array<Object>} The merged attribute, where the vertices from the first vertex
 * attribute come before those from the second.
 */
BufferHelper.prototype.mergeBlank = function(attr, indices1, indices2, attrIsSecond) {
  var newAttribute = this.makeBlank(attr[0], attr[5], indices1.length + indices2.length, attr[3]);
  var value = [];
  var startIndex = attrIsSecond ? indices1.length : 0;
  var attrIndices = attrIsSecond ? indices2 : indices1;
  for(var i = 0; i < attrIndices.length; i++) {
    var index = attrIndices[i];
    this.getVec(attr, index, value);
    this.setVec(newAttribute, startIndex + i, value);
  }
  return newAttribute;
};
/**
 * Copies the values of a vertex attribute into a new vertex attribute object.
 * @param {Array<Object>} attr An object describing information about a vertex attribute.
 * @returns {Array<Object>} A copy of the vertex attribute object.
 */
BufferHelper.prototype.copy = function(attr) {
  var c = this.count(attr);
  var newAttribute = this.makeBlank(attr[0], attr[5], c, attr[3]);
  var value = [];
  for(var i = 0; i < c; i++) {
    this.getVec(attr, i, value);
    this.setVec(newAttribute, i, value);
  }
  return newAttribute;
};
/**
 * Merges two vertex attributes, whose vertices can be indexed differently, into one
 * combined vertex attribute. The two attributes must have the same semantic and semantic
 * index, for example, semantic POSITION and semantic index 0.
 * @param {Array<Object>} attr1 An object describing information about the first vertex attribute.
 * @param {*} indices1
 * @param {Array<Object>} attr2 An object describing information about the second vertex attribute.
 * @param {*} indices2
 * @returns {Array<Object>} The merged attribute, where the vertices from the first vertex
 * attribute come before those from the second. Returns null if the two objects have different semantics
 * or semantic indices.
 */
BufferHelper.prototype.merge = function(attr1, indices1, attr2, indices2) {
  // Different semantics
  if(attr1[0] !== attr2[0])return null;
  // Different semantic indices
  if(attr1[5] !== attr2[5])return null;
  var elementsPerValue = Math.max(attr1[3], attr2[3]);
  var elements = (indices1.length + indices2.length) * elementsPerValue;
  var els = new Float32Array(new ArrayBuffer(elements * 4));
  var newAttribute = [attr1[0], 0, els, elementsPerValue, elementsPerValue, attr1[5]];
  var value = [];
  for(var i = 0; i < indices1.length; i++) {
    var index = indices1[i];
    this.getVec(attr1, index, value);
    for(var j = attr1[3]; j < elementsPerValue; j++) {
      value[j] = 0;
    }
    this.setVec(newAttribute, i, value);
  }
  for(i = 0; i < indices2.length; i++) {
    index = indices2[i];
    this.getVec(attr2, index, value);
    for(j = attr2[3]; j < elementsPerValue; j++) {
      value[j] = 0;
    }
    this.setVec(newAttribute, indices1.length + i, value);
  }
  return newAttribute;
};
/**
 * TODO: Not documented yet.
 * @param {Array<Object>} a An object describing information about a vertex attribute.
 * @param {*} indices
 * @returns {*} Return value.
 */
BufferHelper.prototype.makeRedundant = function(a, indices) {
  var elements = a[3] * indices.length;
  var els = new Float32Array(new ArrayBuffer(elements * 4));
  var newAttribute = [a[0], 0, els, a[3], a[3], a[5]];
  var value = [];
  for(var i = 0; i < indices.length; i++) {
    var index = indices[i];
    this.getVec(a, index, value);
    this.setVec(newAttribute, i, value);
  }
  return newAttribute;
};
/**
 * Gets the first element of the attribute value with the given vertex index.
 * @param {Array<Object>} a An object describing information about a vertex attribute.
 * @param {number} index A numeric index, starting from 0, that identifies
 * a value stored in the attribute's buffer. For example, 0 identifies the first
 * value, 1 identifies the second, and so on.
 * @returns {*} Return value.
 */
BufferHelper.prototype.get = function(a, index) {
  var o = a[1] + index * a[4];
  return a[2][o];
};
/**
 * Sets the first element of the attribute value with the given vertex index.
 * @param {Array<Object>} a An object describing information about a vertex attribute.
 * @param {number} index A numeric index, starting from 0, that identifies
 * a value stored in the attribute's buffer. For example, 0 identifies the first
 * value, 1 identifies the second, and so on.
 * @param {number} value The number to set the first element to.
 * @returns {H3DU.BufferHelper} This object.
 */
BufferHelper.prototype.set = function(a, index, value) {
  var o = a[1] + index * a[4];
  a[2][o] = value;
  return this;
};
/**
 * TODO: Not documented yet.
 * @param {Array<Object>} a An object describing information about a vertex attribute.
 * @param {number} index A numeric index, starting from 0, that identifies
 * a value stored in the attribute's buffer. For example, 0 identifies the first
 * value, 1 identifies the second, and so on.
 * @param {number} v1
 * @param {number} v2
 * @returns {H3DU.BufferHelper} This object.
 */
BufferHelper.prototype.set2 = function(a, index, v1, v2) {
  var o = a[1] + index * a[4];
  a[2][o] = v1;
  a[2][o + 1] = v2;
  return this;
};
/**
 * TODO: Not documented yet.
 * @param {Array<Object>} a An object describing information about a vertex attribute.
 * @param {number} index A numeric index, starting from 0, that identifies
 * a value stored in the attribute's buffer. For example, 0 identifies the first
 * value, 1 identifies the second, and so on.
 * @param {number} v1
 * @param {number} v2
 * @param {number} v3
 * @returns {H3DU.BufferHelper} This object.
 */
BufferHelper.prototype.set3 = function(a, index, v1, v2, v3) {
  var o = a[1] + index * a[4];
  a[2][o] = v1;
  a[2][o + 1] = v2;
  a[2][o + 2] = v3;
  return this;
};
/**
 * TODO: Not documented yet.
 * @param {Array<Object>} a An object describing information about a vertex attribute.
 * @param {number} index A numeric index, starting from 0, that identifies
 * a value stored in the attribute's buffer. For example, 0 identifies the first
 * value, 1 identifies the second, and so on.
 * @param {*} element
 * @param {*} value
 * @returns {*} Return value.
 */
BufferHelper.prototype.setElement = function(a, index, element, value) {
  var o = a[1] + index * a[4] + element;
  a[2][o] = value;
  return this;
};
/**
 * TODO: Not documented yet.
 * @param {Array<Object>} a An object describing information about a vertex attribute.
 * @param {number} index
 * @param {*} element
 * @returns {*} Return value.
 */
BufferHelper.prototype.getElement = function(a, index, element) {
  var o = a[1] + index * a[4] + element;
  return a[2][o];
};
/**
 * TODO: Not documented yet.
 * @param {Array<Object>} a An object describing information about a vertex attribute.
 * @param {number} index A numeric index, starting from 0, that identifies
 * a value stored in the attribute's buffer. For example, 0 identifies the first
 * value, 1 identifies the second, and so on.
 * @param {*} element
 * @param {*} value
 * @returns {BufferHelper} This object.
 */
BufferHelper.prototype.setElement = function(a, index, element, value) {
  var o = a[1] + index * a[4] + element;
  a[2][o] = value;
  return this;
};
/**
 * Gets the elements of a vertex attribute value.
 * @param {Array<Object>} a An object describing information about a vertex attribute.
 * @param {number} index A numeric index, starting from 0, that identifies
 * a value stored in the attribute's buffer. For example, 0 identifies the first
 * value, 1 identifies the second, and so on.
 * @param {Array<number>} vec An array whose elements will be set to those
 * of the value at the given index. The number of elements copied to this
 * array is the attribute's count per value (see {@link H3DU.BufferHelper.countPerValue}).
 * @returns {Array<number>} The parameter "vec".
 */
BufferHelper.prototype.getVec = function(a, index, vec) {
  var o = a[1] + index * a[4];
  var buffer = a[2];
  for(var i = 0; i < a[3]; i++) {
    vec[i] = buffer[o + i];
  }
  return vec;
};
/**
 * Sets the elements of a vertex attribute value.
 * @param {Array<Object>} a An object describing information about a vertex attribute.
 * @param {number} index A numeric index, starting from 0, that identifies
 * a value stored in the attribute's buffer. For example, 0 identifies the first
 * value, 1 identifies the second, and so on.
 * @param {Array<number>} vec An array containing the elements
 * to copy to the value at the given index. The number of elements copied is this
 * array's length or the attribute's count per value (see {@link H3DU.BufferHelper.countPerValue}),
 * whichever is less.
 * @returns {BufferHelper} This object.
 */
BufferHelper.prototype.setVec = function(a, index, vec) {
  var o = a[1] + index * a[4];
  var buffer = a[2];
  var alen = Math.min(vec.length, a[3]);
  for(var i = 0; i < alen; i++) {
    buffer[o + i] = vec[i];
  }
  return this;
};
/**
 * TODO: Not documented yet.
 * @param {number|String} name An attribute semantic, such
 * as {@link H3DU.Semantic.POSITION}, "POSITION", or "TEXCOORD_0".
 * Throws an error if this value is a string and the string is invalid.
 * @param {number} index The set index of the attribute
 * for the given semantic.
 * 0 is the first index of the attribute, 1 is the second, and so on.
 * This is ignored if "name" is a string.
 * @returns {Array<number>} A two-element array consisting
 * of the semantic and semantic index, respectively, described in
 * the "name" and "index" parameters.  Returns null if "name" is a string,
 * but doesn't describe a valid semantic.
 */
BufferHelper.prototype.resolveSemantic = function(name, index) {
  if(typeof name === "number") {
    return [name, index | 0];
  } else {
    var wka = BufferHelper._wellKnownAttributes[name];
    if(typeof wka === "undefined" || wka === null) {
      var io = name.indexOf(name);
      if(io < 0) {
        return null;
      }
      wka = H3DU.MeshBuffer._wellKnownAttributes[name.substr(0, io)];
      if(typeof wka === "undefined" || wka === null) {
        return null;
      }
      var number = name.substr(io + 1);
      if(number.length <= 5 && (/^\d$/).test(number)) {
  // Only allow 5-digit-or-less numbers; more than
        // that is unreasonable
        return new Uint32Array([wka, parseInt(number, 10)]);
      } else {
        return null;
      }
    } else {
      return new Uint32Array([wka, 0]);
    }
  }
};

BufferHelper._wellKnownAttributes = {
  "POSITION":0,
  "TEXCOORD":2,
  "TEXCOORD_0":2,
  "NORMAL":1,
  "JOINT":4,
  "WEIGHT":5,
  "TANGENT":6,
  "BITANGENT":7
};

/* global ArrayBuffer, Float32Array, Uint16Array, Uint32Array */
/*
 Any copyright to this file is released to the Public Domain.
 http://creativecommons.org/publicdomain/zero/1.0/
 If you like this, you should donate
 to Peter O. (original author of
 the Public Domain HTML 3D Library) at:
 http://peteroupc.github.io/
*/

import {_MathInternal} from "./h3du-mathinternal";

/**
 * A <b>vertex attribute object</b>.
 * @constructor
 * @memberof H3DU
 * @param {Float32Array} buffer A buffer to store vertex attribute data; see
 * {@link H3DU.BufferAccessor#buffer}.
 * @param {number} offset Offset to the first value; see
 * {@link H3DU.BufferAccessor#offset}. Throws an error if less than 0.
 * @param {number} countPerValue Number of elements per value; see
 * {@link H3DU.BufferAccessor#countPerValue}. Throws an error if 0 or less.
 * @param {number} [stride] Number of elements from the start of one
 * value to the start of the next; see
 * {@link H3DU.BufferAccessor#stride}. If null, undefined, or
 * omitted, has the same value as "countPerValue".
 * Throws an error if 0 or less.
 */
export var BufferAccessor = function(buffer, offset, countPerValue, stride) {
  if(typeof stride === "undefined" || stride === null)stride = countPerValue;
  if(offset < 0 || countPerValue <= 0 || stride <= 0)throw new Error();
  /**
   * A <i>buffer</i> of arbitrary size. This buffer
   * is made up of <i>values</i>, one for each vertex, and each value
   * is takes up one or more <i>elements</i> in the buffer, which are numbers such
   * as X coordinates or red components, depending on the attribute's semantic.
   * Each value has the same number of elements. An example of a <i>value</i>
   * is (10, 20, 5), which can take up three consecutive <i>elements</i>
   * in a <code>Float32Array</code> buffer such as the one given in this
   * property.
   * @type {Float32Array} */
  this.buffer = buffer;
  /**
   * An offset, which identifies the index, starting from 0, of the first value
   * of the attribute within the buffer. The offset counts the number of
   * elements in the buffer to the first value. For example, if this value is 6,
   * then the first element of the first value in the buffer is found at
   * <code>acc.buffer[acc.offset]</code> (assuming the buffer is
   * more than 6 elements long).
   * @type {number} */
  this.offset = offset;
  /**
   * A count of the number of elements each value has. For example, 3-dimensional
   * positions will have 3 elements, one for each coordinate.
   * @type {number} */
  this.countPerValue = countPerValue;
  /**
   * A stride, which gives the number of elements from the start of one
   * value to the start of the next.  A "packed" buffer will have a stride
   * equal to the [count per value]{@link H3DU.BufferAccessor#countPerValue}.
   * @type {number} */
  this.stride = stride;
};
/**
 * Gets the number of [values]{@link H3DU.BufferAccessor#buffer} defined for this accessor.
 * @returns {number} The number of values defined in this accessor's buffer.
 */
BufferAccessor.prototype.count = function() {
  var olen = this.buffer.length - this.offset;
  var odiv = Math.floor(olen / this.stride);
  return odiv + (olen % this.stride >= this.countPerValue ? 1 : 0);
};
/**
 * Gets the first element of the attribute value with the given vertex index.<p>
 * Note that currently, this method does no bounds checking beyond the
 * checking naturally done when accessing the attribute's buffer.
 * @param {number} index A numeric index, starting from 0, that identifies
 * a value stored in the attribute's buffer. For example, 0 identifies the first
 * value, 1 identifies the second, and so on.
 * @returns {number} The first element of the given attribute value.
 */
BufferAccessor.prototype.get = function( index) {
  var o = this.offset + index * this.stride;
  return this.buffer[o];
};
/**
 * Sets the first element of the attribute value with the given vertex index.<p>
 * Note that currently, this method does no bounds checking beyond the
 * checking naturally done when writing to the attribute's buffer.
 * @param {number} index A numeric index, starting from 0, that identifies
 * a value stored in the attribute's buffer. For example, 0 identifies the first
 * value, 1 identifies the second, and so on.
 * @param {number} value The number to set the first element to.
 * @returns {H3DU.BufferAccessor} This object.
 */
BufferAccessor.prototype.set = function(index, value) {
  var o = this.offset + index * this.stride;
  this.buffer[o] = value;
  return this;
};
/**
 * Gets the elements of a vertex attribute value.<p>
 * Note that currently, this method does no bounds checking beyond the
 * checking naturally done when accessing the attribute's buffer.
 * @param {number} index A numeric index, starting from 0, that identifies
 * a value stored in the attribute's buffer. For example, 0 identifies the first
 * value, 1 identifies the second, and so on.
 * @param {Array<number>} vec An array whose elements will be set to those
 * of the value at the given index. The number of elements copied to this
 * array is the attribute's count per value (see {@link H3DU.BufferAccessor#countPerValue}).
 * @returns {Array<number>} The parameter "vec".
 */
BufferAccessor.prototype.getVec = function(index, vec) {
  var o = this.offset + index * this.stride;
  var buffer = this.buffer;
  for(var i = 0; i < this.countPerValue; i++) {
    vec[i] = buffer[o + i];
  }
  return vec;
};
/**
 * Sets the elements of a vertex attribute value.<p>
 * Note that currently, this method does no bounds checking beyond the
 * checking naturally done when writing to the attribute's buffer, except
 * where noted otherwise.
 * @param {number} index A numeric index, starting from 0, that identifies
 * a value stored in the attribute's buffer. For example, 0 identifies the first
 * value, 1 identifies the second, and so on.
 * @param {Array<number>} vec An array containing the elements
 * to copy to the value at the given index. The number of elements copied is this
 * array's length or the attribute's count per value (see {@link H3DU.BufferAccessor#countPerValue}),
 * whichever is less.
 * @returns {H3DU.BufferAccessor} This object.
 */
BufferAccessor.prototype.setVec = function(index, vec) {
  var o = this.offset + index * this.stride;
  var buffer = this.buffer;
  var alen = Math.min(vec.length, this.countPerValue);
  for(var i = 0; i < alen; i++) {
    buffer[o + i] = vec[i];
  }
  return this;
};
/**
 * Copies the values of this accessor into a new vertex attribute object.
 * @returns {H3DU.BufferAccessor} A copy of the vertex attribute object.
 */
BufferAccessor.prototype.copy = function() {
  var c = this.count();
  var newAttribute = BufferAccessor.makeBlank(c, this.countPerValue);
  var value = [];
  for(var i = 0; i < c; i++) {
    this.getVec(i, value);
    newAttribute.setVec( i, value);
  }
  return newAttribute;
};
/**
 * Generates a vertex attribute buffer, with each value set to all zeros.
 * @param {number} count The number of [values]{@link H3DU.BufferAccessor#buffer}
 * the buffer will hold. For example, (10, 20, 5) is a 3-element value.
 * @param {number} countPerValue The number of elements each value will take in the buffer.
 * @returns {H3DU.BufferAccessor} A blank vertex attribute buffer.
 */
BufferAccessor.makeBlank = function(count, countPerValue) {
  return new BufferAccessor(
    new Float32Array(new ArrayBuffer(count * countPerValue * 4)), 0,
    countPerValue, countPerValue);
};

/**
 * Generates an array of increasing vertex indices.
 * @param {number} numIndices The number of vertex indices to generate.
 * The array will range from 0 to the number of vertex indices minus 1.
 * @returns {Uint16Array|Uint32Array} An array of vertex indices.
 */
BufferAccessor.makeIndices = function(numIndices) {
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
 * combined vertex attribute.
 * @param {H3DU.BufferAccessor} attr1 A vertex buffer accessor for the first vertex attribute.
 * Can be null, in which case it is assumed that the attribute contains as many values
 * as the length of "indices1" and all the values are zeros.
 * @param {Array<number>|Uint16Array|Uint8Array|Uint32Array} indices1 An array of vertex indices
 * associated with the first vertex attribute.
 * @param {H3DU.BufferAccessor} attr2 A vertex buffer accessor for the second vertex attribute.
 * Can be null, in which case it is assumed that the attribute contains as many values as the
 * length of "indices2" and all the values are zeros.
 * @param {Array<number>|Uint16Array|Uint8Array|Uint32Array} indices2 An array of vertex indices
 * associated with the second vertex attribute.
 * @returns {H3DU.BufferAccessor} The merged attribute, where the vertices from the first vertex
 * attribute come before those from the second. The merged attribute will have as many
 * values as the sum of the lengths of "indices1" and "indices2".
 */
BufferAccessor.merge = function(attr1, indices1, attr2, indices2) {
  var countPerValue1 = typeof attr1 === "undefined" || attr1 === null ? 0 : attr1.countPerValue;
  var countPerValue2 = typeof attr2 === "undefined" || attr2 === null ? 0 : attr2.countPerValue;
  var i;
  var elementsPerValue = Math.max(countPerValue1, countPerValue2);
  // NOTE: Buffer returned by makeBlank will be all zeros
  var newAttribute = BufferAccessor.makeBlank(
    indices1.length + indices2.length, elementsPerValue);
  var value = _MathInternal.vecZeros(elementsPerValue);
  // NOTE: If undefined or null, first part of buffer will remain all zeros
  if(typeof attr1 !== "undefined" && attr1 !== null) {
    for(i = 0; i < indices1.length; i++) {
      if(attr1)attr1.getVec(indices1[i], value);
      newAttribute.setVec(i, value);
    }
  }
  // NOTE: If undefined or null, second part of buffer will remain all zeros
  if(typeof attr2 !== "undefined" && attr2 !== null) {
    for(i = 0; i < indices2.length; i++) {
      if(attr2)attr2.getVec(indices2[i], value);
      newAttribute.setVec(indices1.length + i, value);
    }
  }
  return newAttribute;
};

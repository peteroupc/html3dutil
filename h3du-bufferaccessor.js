/*
 Any copyright to this file is released to the Public Domain.
 In case this is not possible, this file is also licensed under the Unlicense: https://unlicense.org/
*/
/*
 Any copyright to this file is released to the Public Domain.
 In case this is not possible, this file is also licensed under the Unlicense: https://unlicense.org/
*/
/*
 Any copyright to this file is released to the Public Domain.
 In case this is not possible, this file is also licensed under the Unlicense: https://unlicense.org/
*/
/*
 Any copyright to this file is released to the Public Domain.
 In case this is not possible, this file is also licensed under the Unlicense: https://unlicense.org/
*/
/*
 Any copyright to this file is released to the Public Domain.
 In case this is not possible, this file is also licensed under the Unlicense: https://unlicense.org/
*/
/*
 Any copyright to this file is released to the Public Domain.
 In case this is not possible, this file is also licensed under the Unlicense: https://unlicense.org/
*/
/*
 Any copyright to this file is released to the Public Domain.
 In case this is not possible, this file is also licensed under the Unlicense: https://unlicense.org/
*/
/*
 Any copyright to this file is released to the Public Domain.
 In case this is not possible, this file is also licensed under the Unlicense: https://unlicense.org/
*/
/*
 Any copyright to this file is released to the Public Domain.
 In case this is not possible, this file is also licensed under the Unlicense: https://unlicense.org/
*/
/*
 Any copyright to this file is released to the Public Domain.
 In case this is not possible, this file is also licensed under the Unlicense: https://unlicense.org/
*/
/*
 Any copyright to this file is released to the Public Domain.
 In case this is not possible, this file is also licensed under the Unlicense: https://unlicense.org/
*/
/*
 Any copyright to this file is released to the Public Domain.
 In case this is not possible, this file is also licensed under the Unlicense: https://unlicense.org/
*/
/*
 Any copyright to this file is released to the Public Domain.
 In case this is not possible, this file is also licensed under the Unlicense: https://unlicense.org/
*/
/*
 Any copyright to this file is released to the Public Domain.
 In case this is not possible, this file is also licensed under the Unlicense: https://unlicense.org/
*/
/*
 Any copyright to this file is released to the Public Domain.
 In case this is not possible, this file is also licensed under the Unlicense: https://unlicense.org/
*/
/*
 Any copyright to this file is released to the Public Domain.
 In case this is not possible, this file is also licensed under the Unlicense: https://unlicense.org/
*/
/*
 Any copyright to this file is released to the Public Domain.
 In case this is not possible, this file is also licensed under the Unlicense: https://unlicense.org/
*/
/*
 Any copyright to this file is released to the Public Domain.
 In case this is not possible, this file is also licensed under the Unlicense: https://unlicense.org/
*/
/*
 Any copyright to this file is released to the Public Domain.
 In case this is not possible, this file is also licensed under the Unlicense: https://unlicense.org/
*/
/*
 Any copyright to this file is released to the Public Domain.
 In case this is not possible, this file is also licensed under the Unlicense: https://unlicense.org/
*/
/*
 Any copyright to this file is released to the Public Domain.
 In case this is not possible, this file is also licensed under the Unlicense: https://unlicense.org/
*/
/*
 Any copyright to this file is released to the Public Domain.
 In case this is not possible, this file is also licensed under the Unlicense: https://unlicense.org/
*/
/*
 Any copyright to this file is released to the Public Domain.
 In case this is not possible, this file is also licensed under the Unlicense: https://unlicense.org/
*/
/*
 Any copyright to this file is released to the Public Domain.
 In case this is not possible, this file is also licensed under the Unlicense: https://unlicense.org/
*/
/*
 Any copyright to this file is released to the Public Domain.
 In case this is not possible, this file is also licensed under the Unlicense: https://unlicense.org/
*/
/*
 Any copyright to this file is released to the Public Domain.
 In case this is not possible, this file is also licensed under the Unlicense: https://unlicense.org/
*/
/*
 Any copyright to this file is released to the Public Domain.
 In case this is not possible, this file is also licensed under the Unlicense: https://unlicense.org/
*/
/*
 Any copyright to this file is released to the Public Domain.
 In case this is not possible, this file is also licensed under the Unlicense: https://unlicense.org/
*/
/*
 Any copyright to this file is released to the Public Domain.
 In case this is not possible, this file is also licensed under the Unlicense: https://unlicense.org/
*/
/*
 Any copyright to this file is released to the Public Domain.
 In case this is not possible, this file is also licensed under the Unlicense: https://unlicense.org/
*/
/*
 Any copyright to this file is released to the Public Domain.
 In case this is not possible, this file is also licensed under the Unlicense: https://unlicense.org/
*/
/*
 Any copyright to this file is released to the Public Domain.
 In case this is not possible, this file is also licensed under the Unlicense: https://unlicense.org/
*/
/*
 Any copyright to this file is released to the Public Domain.
 In case this is not possible, this file is also licensed under the Unlicense: https://unlicense.org/
*/
/* global ArrayBuffer, Float32Array, Uint16Array, Uint32Array */
/*
 Any copyright to this file is released to the Public Domain.
 In case this is not possible, this file is also licensed under the Unlicense: https://unlicense.org/
*/

import {MathInternal} from "./h3du-mathinternal";

/**
 * A <b>vertex attribute object</b>.
 * @constructor
 * @param {Float32Array} buffer A buffer to store vertex attribute data; see
 * {@link BufferAccessor#buffer}.
 * @param {number} countPerValue Number of elements per value; see
 * {@link BufferAccessor#countPerValue}. Throws an error if 0 or less.
 * @param {number} [offset] Offset to the first value; see
 * {@link BufferAccessor#offset}. If null, undefined, or
 * omitted, the default is 0. Throws an error if less than 0.
 * @param {number} [stride] Number of elements from the start of one
 * value to the start of the next; see
 * {@link BufferAccessor#stride}. If null, undefined, or
 * omitted, has the same value as "countPerValue".
 * Throws an error if 0 or less.
 */
export const BufferAccessor = function(buffer, countPerValue, offset, stride) {
  if(typeof stride === "undefined" || stride === null)stride = countPerValue;
  if(typeof offset === "undefined" || offset === null)offset = 0;
  if(offset < 0 || countPerValue <= 0 || stride <= 0)throw new Error();
  /**
   * A <i>buffer</i> of arbitrary size. This buffer
   * is made up of <i>values</i>, one for each vertex, and each value
   * takes up one or more <i>elements</i> in the buffer, which are numbers such
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
   * elements in the buffer to the first value. For example, if this property is 6,
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
   * equal to the [count per value]{@link BufferAccessor#countPerValue}.
   * @type {number} */
  this.stride = stride;
};
/**
 * Gets the number of [values]{@link BufferAccessor#buffer} defined for this accessor.
 * @returns {number} The number of values defined in this accessor's buffer.
 */
BufferAccessor.prototype.count = function() {
  const olen = this.buffer.length - this.offset;
  const odiv = Math.floor(olen / this.stride);
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
  const o = this.offset + index * this.stride;
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
 * @returns {BufferAccessor} This object.
 */
BufferAccessor.prototype.set = function(index, value) {
  const o = this.offset + index * this.stride;
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
 * array is the attribute's count per value (see {@link BufferAccessor#countPerValue}).
 * @returns {Array<number>} The parameter "vec".
 */
BufferAccessor.prototype.getVec = function(index, vec) {
  const o = this.offset + index * this.stride;
  const buffer = this.buffer;
  let i;
  for (i = 0; i < this.countPerValue; i++) {
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
 * array's length or the attribute's count per value (see {@link BufferAccessor#countPerValue}),
 * whichever is less.
 * @returns {BufferAccessor} This object.
 */
BufferAccessor.prototype.setVec = function(index, vec) {
  const o = this.offset + index * this.stride;
  const buffer = this.buffer;
  const alen = Math.min(vec.length, this.countPerValue);
  let i;
  for (i = 0; i < alen; i++) {
    buffer[o + i] = vec[i];
  }
  return this;
};
/**
 * Sets the first and second elements of a vertex attribute value.<p>
 * Note that currently, this method does no bounds checking beyond the
 * checking naturally done when writing to the attribute's buffer, except
 * where noted otherwise.
 * @param {number} index A numeric index, starting from 0, that identifies
 * a value stored in the attribute's buffer. For example, 0 identifies the first
 * value, 1 identifies the second, and so on.
 * @param {number} x The value to copy to the first element of the value at the given
 * index, if the attribute stores 1-element or bigger values.
 * @param {number} y The value to copy to the second element of the value at the given
 * index, if the attribute stores 2-element or bigger values.
 * @returns {BufferAccessor} This object.
 */
BufferAccessor.prototype.setXy = function(index, x, y) {
  const o = this.offset + index * this.stride;
  const buffer = this.buffer;
  if(this.countPerValue >= 1)buffer[o] = x;
  if(this.countPerValue >= 2)buffer[o + 1] = y;
  return this;
};
/**
 * Sets the first, second, and third elements of a vertex attribute value.<p>
 * Note that currently, this method does no bounds checking beyond the
 * checking naturally done when writing to the attribute's buffer, except
 * where noted otherwise.
 * @param {number} index A numeric index, starting from 0, that identifies
 * a value stored in the attribute's buffer. For example, 0 identifies the first
 * value, 1 identifies the second, and so on.
 * @param {number} x The value to copy to the first element of the value at the given
 * index, if the attribute stores 1-element or bigger values.
 * @param {number} y The value to copy to the second element of the value at the given
 * index, if the attribute stores 2-element or bigger values.
 * @param {number} z The value to copy to the third element of the value at the given
 * index, if the attribute stores 3-element or bigger values.
 * @returns {BufferAccessor} This object.
 */
BufferAccessor.prototype.setXyz = function(index, x, y, z) {
  const o = this.offset + index * this.stride;
  const buffer = this.buffer;
  if(this.countPerValue >= 1)buffer[o] = x;
  if(this.countPerValue >= 2)buffer[o + 1] = y;
  if(this.countPerValue >= 2)buffer[o + 2] = z;
  return this;
};
/**
 * Copies the values of this accessor into a new vertex attribute object.
 * @returns {BufferAccessor} A copy of the vertex attribute object.
 */
BufferAccessor.prototype.copy = function() {
  const c = this.count();
  const newAttribute = BufferAccessor.makeBlank(c, this.countPerValue);
  const value = [];
  let i;
  for (i = 0; i < c; i++) {
    this.getVec(i, value);
    newAttribute.setVec( i, value);
  }
  return newAttribute;
};
/**
 * Generates a vertex attribute buffer, with each value set to all zeros.
 * @param {number} count The number of [values]{@link BufferAccessor#buffer}
 * the buffer will hold. For example, (10, 20, 5) is a 3-element value.
 * @param {number} countPerValue The number of elements each value will take in the buffer.
 * @returns {BufferAccessor} A blank vertex attribute buffer.
 */
BufferAccessor.makeBlank = function(count, countPerValue) {
  return new BufferAccessor(
    new Float32Array(new ArrayBuffer(count * countPerValue * 4)), countPerValue);
};

/**
 * Generates an array of increasing vertex indices.
 * @param {number} numIndices The number of vertex indices to generate.
 * The array will range from 0 to the number of vertex indices minus 1.
 * @returns {Uint16Array|Uint32Array} An array of vertex indices.
 */
BufferAccessor.makeIndices = function(numIndices) {
  let array;
  if(numIndices < 65536) {
    array = new Uint16Array(new ArrayBuffer(numIndices * 2));
  } else {
    array = new Uint32Array(new ArrayBuffer(numIndices * 4));
  }
  let i;
  for (i = 0; i < numIndices; i++) {
    array[i] = i;
  }
  return array;
};
/**
 * Merges two vertex attributes, whose vertices can be indexed differently, into one
 * combined vertex attribute.
 * @param {BufferAccessor} attr1 A vertex buffer accessor for the first vertex attribute.
 * Can be null, in which case it is assumed that the attribute contains as many values
 * as the length of "indices1" and all the values are zeros.
 * @param {Array<number>|Uint16Array|Uint8Array|Uint32Array} indices1 An array of vertex indices
 * associated with the first vertex attribute.
 * @param {BufferAccessor} attr2 A vertex buffer accessor for the second vertex attribute.
 * Can be null, in which case it is assumed that the attribute contains as many values as the
 * length of "indices2" and all the values are zeros.
 * @param {Array<number>|Uint16Array|Uint8Array|Uint32Array} indices2 An array of vertex indices
 * associated with the second vertex attribute.
 * @returns {BufferAccessor} The merged attribute, where the vertices from the first vertex
 * attribute come before those from the second. The merged attribute will have as many
 * values as the sum of the lengths of "indices1" and "indices2".
 */
BufferAccessor.merge = function(attr1, indices1, attr2, indices2) {
  const countPerValue1 = typeof attr1 === "undefined" || attr1 === null ? 0 : attr1.countPerValue;
  const countPerValue2 = typeof attr2 === "undefined" || attr2 === null ? 0 : attr2.countPerValue;
  let i;
  const elementsPerValue = Math.max(countPerValue1, countPerValue2);
  // NOTE: Buffer returned by makeBlank will be all zeros
  const newAttribute = BufferAccessor.makeBlank(
    indices1.length + indices2.length, elementsPerValue);
  const value = MathInternal.vecZeros(elementsPerValue);
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

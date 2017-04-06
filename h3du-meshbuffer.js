/*
 Any copyright to this file is released to the Public Domain.
 http://creativecommons.org/publicdomain/zero/1.0/
 If you like this, you should donate
 to Peter O. (original author of
 the Public Domain HTML 3D Library) at:
 http://peteroupc.github.io/
*/
/* global ArrayBuffer, Float32Array, H3DU, Uint16Array, Uint32Array, Uint8Array */

/**
 * A helper class for accessing and setting data in buffer attributes.
 * @constructor
 * @memberof H3DU
 */
export var BufferHelper = function() {};
/**
 * TODO: Not documented yet.
 * @param {*} a
 * @returns {*} Return value.
 */
BufferHelper.prototype.count = function(a) {
  var olen = a[2].length - a[1];
  var odiv = Math.floor(olen / a[4]);
  return odiv + (olen % a[4] >= a[3] ? 1 : 0);
};
/**
 * TODO: Not documented yet.
 * @param {*} numIndices
 * @returns {*} Return value.
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
 * TODO: Not documented yet.
 * @param {*} attr
 * @param {*} indices1
 * @param {*} indices2
 * @param {*} attrIsSecond
 * @returns {*} Return value.
 */
BufferHelper.prototype.mergeBlank = function(attr, indices1, indices2, attrIsSecond) {
  var elementsPerValue = attr[3];
  var elements = (indices1.length + indices2.length) * elementsPerValue;
  var els = new Float32Array(new ArrayBuffer(elements * 4));
  var newAttribute = [attr[0], 0, els, elementsPerValue, elementsPerValue, attr[5]];
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
 * TODO: Not documented yet.
 * @param {*} attr
 * @returns {*} Return value.
 */
BufferHelper.prototype.copy = function(attr) {
  var elementsPerValue = attr[3];
  var c = this.count(attr);
  var elements = c * elementsPerValue;
  var els = new Float32Array(new ArrayBuffer(elements * 4));
  var newAttribute = [attr[0], 0, els, elementsPerValue, elementsPerValue, attr[5]];
  var value = [];
  for(var i = 0; i < c; i++) {
    this.getVec(attr, i, value);
    this.setVec(newAttribute, i, value);
  }
  return newAttribute;
};
/**
 * TODO: Not documented yet.
 * @param {*} attr1
 * @param {*} indices1
 * @param {*} attr2
 * @param {*} indices2
 * @returns {*} Return value.
 */
BufferHelper.prototype.merge = function(attr1, indices1, attr2, indices2) {
  // Different semantics
  if(attr1[0] !== attr2[0])return null;
  // Different semantic indices
  if(attr1[5] !== attr2[5])return null;
  var elementsPerValue = Math.max(attr1[3], attr2[3]);
  var minElements = Math.min(attr1[3], attr2[3]);
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
 * @param {*} a
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
 * TODO: Not documented yet.
 * @param {*} a
 * @param {*} index
 * @returns {*} Return value.
 */
BufferHelper.prototype.get = function(a, index) {
  var o = a[1] + index * a[4];
  return a[2][o];
};
/**
 * TODO: Not documented yet.
 * @param {*} a
 * @param {number} index
 * @param {*} value
 * @returns {H3DU.BufferHelper} This object.
 */
BufferHelper.prototype.set = function(a, index, value) {
  var o = a[1] + index * a[4];
  a[2][o] = value;
  return this;
};
/**
 * TODO: Not documented yet.
 * @param {*} a
 * @param {number} index
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
 * @param {*} a
 * @param {number} index
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
 * @param {*} a
 * @param {*} index
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
 * @param {*} a
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
 * @param {*} a
 * @param {number} index
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
 * @param {*} a
 * @param {number} index
 * @param {*} vec
 * @returns {*} Return value.
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
 * TODO: Not documented yet.
 * @param {*} a
 * @param {number} index
 * @param {*} vec
 * @returns {*} Return value.
 */
BufferHelper.prototype.setVec = function(a, index, vec) {
  var o = a[1] + index * a[4];
  var buffer = a[2];
  for(var i = 0; i < a[3]; i++) {
    buffer[o + i] = vec[i];
  }
  return this;
};

/**
 * A geometric mesh in the form of buffer objects.
 * @constructor
 * @memberof H3DU
 * @param {H3DU.Mesh} mesh A geometric mesh object.
 * A series of default attributes will be set based on that mesh's
 * data.
 */
export var MeshBuffer = function(mesh) {
  // TODO: Make "mesh" optional, creating an empty mesh buffer
  var vertices = new Float32Array(mesh.vertices);
  if(mesh.vertices.length >= 65536 || mesh.indices.length >= 65536) {
    this.indexBufferSize = 4;
    this.indices = new Uint32Array(mesh.indices);
  } else if(mesh.vertices.length <= 256 && mesh.indices.length <= 256) {
    this.indexBufferSize = 1;
    this.indices = new Uint8Array(mesh.indices);
  } else {
    this.indexBufferSize = 2;
    this.indices = new Uint16Array(mesh.indices);
  }
  this.format = mesh.attributeBits;
  var stride = H3DU.Mesh._getStride(this.format);
  this.attributes = [];
  this.setAttribute(H3DU.Semantic.POSITION, 0, vertices, 0, 3, stride);
  var o = H3DU.Mesh._normalOffset(this.format);
  if(o >= 0) {
    this.setAttribute(H3DU.Semantic.NORMAL, 0, vertices, o, 3, stride);
  }
  o = H3DU.Mesh._colorOffset(this.format);
  if(o >= 0) {
    this.setAttribute(H3DU.Semantic.COLOR, 0, vertices, o, 3, stride);
  }
  o = H3DU.Mesh._texCoordOffset(this.format);
  if(o >= 0) {
    this.setAttribute(H3DU.Semantic.TEXCOORD, 0, vertices, o, 2, stride);
  }
  var tangents = new Float32Array(mesh.tangents);
  if((this.format & H3DU.Mesh.TANGENTS_BIT) !== 0) {
    this.setAttribute(H3DU.Semantic.TANGENT, 0, tangents, 0, 3, 3);
  }
  if((this.format & H3DU.Mesh.BITANGENTS_BIT) !== 0) {
    this.setAttribute(H3DU.Semantic.BITANGENT, 0, tangents, 3, 3, 3);
  }
};
/**
 * TODO: Not documented yet.
 * @returns {*} Return value.
 */
MeshBuffer.prototype.getIndices = function() {
  return this.indices;
};
/**
 * Sets the array of vertex indices used by this mesh buffer.
 * @param {Uint16Array|Uint32Array|Uint8Array} indices Array of vertex indices.
 * @returns {H3DU.MeshBuffer} This object.
 */
MeshBuffer.prototype.setIndices = function(indices) {
  this.indices = indices;
  if(indices instanceof Uint8Array) {
    this.indexBufferSize = 1;
  } else if(indices instanceof Uint16Array) {
    this.indexBufferSize = 2;
  } else {
    this.indexBufferSize = 4;
  }
  return this;
};
/**
 * Sets the type of graphics primitives stored in this mesh buffer.
 * @param {number} primType The primitive type, either {@link H3DU.Mesh.TRIANGLES},
 * {@link H3DU.Mesh.LINES}, or {@link H3DU.Mesh.POINTS}.
 * @returns {H3DU.MeshBuffer} This object.
 */
MeshBuffer.prototype.setPrimitiveType = function(primType) {
  if(primType === H3DU.Mesh.TRIANGLES) {
    this.format = 0;
  } else if(primType === H3DU.Mesh.LINES) {
    this.format = H3DU.Mesh.LINES_BIT;
  } else if(primType === H3DU.Mesh.POINTS) {
    this.format = H3DU.Mesh.POINTS_BIT;
  }
  return this;
};

/**
 * Adds information about a buffer attribute to this
 * mesh buffer (or sets an
 * existing attribute's information). An attribute
 * gives information about the per-vertex data used and
 * stored in a vertex buffer.
 * @param {Number|string} name An attribute semantic, such
 * as {@link H3DU.Semantic.POSITION}, "POSITION", or "TEXCOORD_0".
 * @param {number} index The set index of the attribute
 * for the given semantic.
 * 0 is the first index of the attribute, 1 is the second, and so on.
 * This is ignored if "name" is a string.
 * @param {Float32Array|Array} buffer The buffer where
 * the per-vertex data is stored.
 * @param {number} startIndex The index into the array
 * (starting from 0) where the first per-vertex
 * item starts.
 * @param {number} countPerVertex The number of elements in each
 * per-vertex item. For example, if each vertex is a 3-element
 * vector, this value is 3.
 * @param {number} stride The number of elements from the start of
 * one per-vertex item to the start of the next.
 * @returns {H3DU.MeshBuffer} This object.Throws an error if the given
 * semantic is unsupported.
 */
MeshBuffer.prototype.setAttribute = function(
  name, index, buffer, startIndex, countPerVertex, stride
) {
  if(buffer.constructor === Array) {
    buffer = new Float32Array(buffer);
  }
  var semanticIndex = 0;
  var semantic = 0;
  var sem = H3DU.MeshBuffer._resolveSemantic(name, index);
  if(typeof sem === "undefined" || sem === null) {
    console.warn("Unsupported attribute semantic: " + name);
    return this;
  }
  semantic = sem[0];
  semanticIndex = sem[1];
  var attr = this.getAttribute(semantic, semanticIndex);
  if(attr) {
    attr[1] = startIndex;
    attr[2] = buffer;
    attr[3] = countPerVertex;
    attr[4] = stride;
  } else {
    this.attributes.push([semantic, startIndex, buffer, countPerVertex, stride, semanticIndex]);
  }
  if(name === "position") {
    this._bounds = null;
  }
  return this;
};
/** @ignore */
MeshBuffer._resolveSemantic = function(name, index) {
  if(typeof name === "number") {
    return [name, index | 0];
  } else {
    var wka = H3DU.MeshBuffer._wellKnownAttributes[name];
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

/** @ignore */
MeshBuffer.prototype._getAttributes = function() {
  return this.attributes;
};
/**
 * TODO: Not documented yet.
 * @param {Number|string} name An attribute semantic, such
 * as {@link H3DU.Semantic.POSITION}, "POSITION", or "TEXCOORD_0".
 * @param {number} index The set index of the attribute
 * for the given semantic.
 * 0 is the first index of the attribute, 1 is the second, and so on.
 * This is ignored if "name" is a string.
 * @returns {*} Return value.
 */
MeshBuffer.prototype.getAttribute = function(name, index) {
  var idx = typeof index === "undefined" || index === null ? 0 : index;
  for(var i = 0; i < this.attributes.length; i++) {
    if(this.attributes[i][0] === name &&
    this.attributes[i][5] === idx) {
      return this.attributes[i];
    }
  }
  return null;
};
/**
 * TODO: Not documented yet.
 * @param {*} primitiveIndex
 * @param {*} ret
 * @returns {*} Return value.
 */
MeshBuffer.prototype.vertexIndices = function(primitiveIndex, ret) {
  var count = 3;
  if((this.format & H3DU.Mesh.LINES_BIT) !== 0)count = 2;
  if((this.format & H3DU.Mesh.POINTS_BIT) !== 0)count = 1;
  var i = primitiveIndex * count;
  ret[0] = this.indices[i];
  if(count >= 2)ret[1] = this.indices[i + 1];
  if(count >= 3)ret[2] = this.indices[i + 2];
  return ret;
};

/**
 * Gets the number of primitives (triangles, lines,
 * and points) composed by all shapes in this mesh.
 * @returns {number} Return value.
 */
MeshBuffer.prototype.primitiveCount = function() {
  if((this.format & H3DU.Mesh.LINES_BIT) !== 0)
    return Math.floor(this.indices.length / 2);
  if((this.format & H3DU.Mesh.POINTS_BIT) !== 0)
    return this.indices.length;
  return Math.floor(this.indices.length / 3);
};
/**
 * Gets an array of vertex positions held by this mesh buffer,
 * arranged by primitive
 * @returns {Array<Array<number>>} An array of primitives,
 * each of which holds the vertices that make up that primitive.
 * If this mesh holds triangles, each primitive will contain three
 * vertices; if lines, two; and if points, one. Each vertex is an at least 3-element
 * array containing that vertex's X, Y, and Z coordinates, in that order.
 */
MeshBuffer.prototype.getPositions = function() {
  var helper = new H3DU.BufferHelper();
  var posattr = this.getAttribute(H3DU.Semantic.POSITION, 0);
  if(!posattr) {
    return [];
  }
  var ret = [];
  var indices = [];
  var primcount = this.primitiveCount();
  for(var j = 0; j < primcount; j++) {
    this.vertexIndices(j, indices);
    var primitive = [];
    for(var k = 0; k < indices.length; k++) {
      primitive.push(helper.getVec(posattr, indices[k], [0, 0, 0]));
    }
    ret.push(primitive);
  }
  return ret;
};
/**
 * Modifies this mesh buffer by reversing the sign of normals it defines.
 * Has no effect if this mesh buffer doesn't define any normals.
 * @returns {H3DU.MeshBuffer} This object.
 * @example <caption>
 * The following code generates a two-sided mesh, where
 * the normals on each side face in the opposite direction.
 * This is only useful when drawing open geometric shapes, such as open
 * cylinders and two-dimensional planar shapes.
 * Due to the z-fighting effect, drawing a two-sided mesh is
 * recommended only if face culling is enabled.
 * TODO: Implement reverseWinding.</caption>
 * var twoSidedMesh = originalMesh.merge(
 * new H3DU.Mesh().merge(originalMesh).reverseWinding().reverseNormals()
 * );
 */
MeshBuffer.prototype.reverseNormals = function() {
  var helper = new H3DU.BufferHelper();
  for(var i = 0; i < this.attributes.length; i++) {
    var attr = this.attributes[i];
    if(attr[1] !== H3DU.Semantic.NORMAL) {
      continue;
    }
    var value = [];
    var count = helper.count(attr);
    for(var j = 0; j < count; j++) {
      helper.getVec(attr, j, value);
      for(var k = 0; k < value.length; k++) {
        value[k] = -value[k];
      }
      helper.setVec(attr, j, value);
    }
  }
  return this;
};
/**
 * TODO: Not documented yet.
 * @param {*} other
 * @returns {*} Return value.
 */
MeshBuffer.prototype.merge = function(other) {
// TODO: Make the following example work:
// * @example
// * // Use the following idiom to make a copy of a geometric mesh:
// * var copiedMesh = new H3DU.Mesh().merge(meshToCopy);
  if(!other)throw new Error();
  if(other.indices.length === 0) {
    // Nothing to merge into this one, just return
    return this;
  }
  // TODO: Copy all attributes if no attributes or indices
  // are given on this object
  var newAttributes = [];
  var helper = new H3DU.BufferHelper();
  for(var i = 0; i < this.attributes.length; i++) {
    var existingAttribute = null;
    var newAttribute = null;
    var attr = this.attributes[i];
    for(var j = 0; j < other.attributes.length; j++) {
      var oattr = other.attributes[j];
       // TODO: Move attribute access to BufferHelper
      if(oattr[0] === attr[0] && oattr[5] === attr[5]) {
        existingAttribute = oattr;
        break;
      }
    }
    if(existingAttribute) {
      newAttribute = helper.merge(attr, this.indices, existingAttribute, other.indices);
    } else {
      newAttribute = helper.mergeBlank(attr, this.indices, other.indices, false);
    }
    if(!newAttribute)throw new Error();
    newAttributes.push(newAttribute);
  }
  for(i = 0; i < other.attributes.length; i++) {
    existingAttribute = null;
    oattr = other.attributes[i];
    for(j = 0; j < this.attributes.length; j++) {
      attr = this.attributes[j];
       // TODO: Move attribute access to BufferHelper
      if(oattr[0] === attr[0] && oattr[5] === attr[5]) {
        existingAttribute = attr;
        break;
      }
    }
    if(typeof existingAttribute === "undefined" || existingAttribute === null) {
      newAttribute = helper.mergeBlank(oattr, this.indices, other.indices, true);
      if(!newAttribute)throw new Error();
      newAttributes.push(newAttribute);
    }
  }
  var newIndices = helper.makeIndices(this.indices.length + other.indices.length);
  this._bounds = null;
  this.attributes = newAttributes;
  this.setIndices(newIndices);
  return this;
};

/**
 * Transforms the positions and normals of all the vertices currently
 * in this mesh. The matrix won't affect other attributes, including tangents and bitangents.
 * @param {Array<number>} matrix A 4x4 matrix described in
 * the {@link H3DU.Math.mat4projectVec3} method. The normals will be transformed using the
 * 3x3 inverse transpose of this matrix (see {@link H3DU.Math.mat4inverseTranspose3}).
 * @returns {H3DU.MeshBuffer} This object.
 */
MeshBuffer.prototype.transform = function(matrix) {
  // TODO: Implement and favor MeshBuffer version of this method
  var helper = new H3DU.BufferHelper();
  var positionAttribute = this.getAttribute(H3DU.Semantic.POSITION);
  var normalAttribute = this.getAttribute(H3DU.Semantic.NORMAL);
  if(!positionAttribute) {
    return this;
  }
  var isLinearIdentity = !(matrix[0] === 1 && matrix[1] === 0 &&
    matrix[2] === 0 && matrix[4] === 0 && matrix[5] === 1 &&
    matrix[6] === 0 && matrix[8] === 0 && matrix[9] === 0 && matrix[10] === 1);
  var matrixForNormals = null;
  if(normalAttribute >= 0 && isLinearIdentity) {
    matrixForNormals = H3DU.Math.mat4inverseTranspose3(matrix);
  }
  var count = helper.count(positionAttribute);
  if(normalAttribute)count = Math.min(count, helper.count(normalAttribute));
  var position = [0, 0, 0];
  var normal = [0, 0, 0];
  for(var i = 0; i < count; i++) {
    helper.getVec(positionAttribute, i, position);
    var xform = H3DU.Math.mat4projectVec3(matrix,
  position[0], position[1], position[2]);
    helper.setVec(positionAttribute, i, xform);
    if(normalAttribute && isLinearIdentity) {
     // Transform and normalize the normals
     // (using a modified matrix) to ensure
     // they point in the correct direction
      helper.getVec(normalAttribute, i, normal);
      xform = H3DU.Math.mat3transform(matrixForNormals,
        normal[0], normal[1], normal[2]);
      H3DU.Math.vec3normalizeInPlace(xform);
      helper.setVec(normalAttribute, i, xform);
    }
  }
  this._bounds = null;
  return this;
};
/**
 * Finds the tightest
 * bounding box that holds all vertices in the mesh buffer.
 * @returns {Array<number>} An array of six numbers describing the tightest
 * axis-aligned bounding box
 * that fits all vertices in the mesh. The first three numbers
 * are the smallest-valued X, Y, and Z coordinates, and the
 * last three are the largest-valued X, Y, and Z coordinates.
 * This calculation uses the attribute with the semantic POSITION
 * and set index 0. If there is no such attribute,
 * or no vertices are defined in this buffer, returns the array
 * [Inf, Inf, Inf, -Inf, -Inf, -Inf].
 */
MeshBuffer.prototype.getBounds = function() {
  if(!this._bounds) {
    var empty = true;
    var inf = Number.POSITIVE_INFINITY;
    var ret = [inf, inf, inf, -inf, -inf, -inf];
    var posattr = this.getAttribute(H3DU.Semantic.POSITION, 0);
    if(!posattr)return ret;
    var indices = [];
    var vec = [0, 0, 0];
    var helper = new H3DU.BufferHelper();
    var primcount = this.primitiveCount();
    for(var j = 0; j < primcount; j++) {
      this.vertexIndices(j, indices);
      var primitive = [];
      for(var k = 0; k < indices.length; k++) {
        var v = helper.getVec(posattr, indices[k], vec);
        if(empty) {
          empty = false;
          ret[0] = ret[3] = v[0];
          ret[1] = ret[4] = v[1];
          ret[2] = ret[5] = v[2];
        } else {
          ret[0] = Math.min(ret[0], v[0]);
          ret[3] = Math.max(ret[3], v[0]);
          ret[1] = Math.min(ret[1], v[1]);
          ret[4] = Math.max(ret[4], v[1]);
          ret[2] = Math.min(ret[2], v[2]);
          ret[5] = Math.max(ret[5], v[2]);
        }
      }
      ret.push(primitive);
    }
    this._bounds = ret.slice(0, 6);
    return ret;
  }
  return this._bounds.slice(0, 6);
};
/**
 * Gets the type of primitive stored in this mesh buffer.
 * @returns {number} Either {@link H3DU.Mesh.TRIANGLES},
 * {@link H3DU.Mesh.LINES}, or {@link H3DU.Mesh.POINTS}.
 */
MeshBuffer.prototype.primitiveType = function() {
  if((this.format & H3DU.Mesh.LINES_BIT) !== 0)
    return H3DU.Mesh.LINES;
  if((this.format & H3DU.Mesh.POINTS_BIT) !== 0)
    return H3DU.Mesh.POINTS;
  return H3DU.Mesh.TRIANGLES;
};
MeshBuffer._wellKnownAttributes = {
  "POSITION":0,
  "TEXCOORD":2,
  "TEXCOORD_0":2,
  "NORMAL":1,
  "JOINT":4,
  "WEIGHT":5,
  "TANGENT":6,
  "BITANGENT":7
};

/** @ignore */
MeshBuffer.prototype.getFormat = function() {
  return this.format;
};
/**
 * Gets the number of vertices in this mesh buffer
 * @returns {number} Return value.
 */
MeshBuffer.prototype.vertexCount = function() {
  return this.indices.length;
};

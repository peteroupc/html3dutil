/*
 Any copyright to this file is released to the Public Domain.
 http://creativecommons.org/publicdomain/zero/1.0/
 If you like this, you should donate
 to Peter O. (original author of
 the Public Domain HTML 3D Library) at:
 http://peteroupc.github.io/
*/
/* global Float32Array, H3DU, Uint16Array, Uint32Array, Uint8Array, v3 */

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
 * @param {*} index
 * @param {*} value
 * @returns {*} Return value.
 */
BufferHelper.prototype.set = function(a, index, value) {
  var o = a[1] + index * a[4];
  a[2][o] = value;
  return this;
};
/**
 * TODO: Not documented yet.
 * @param {*} a
 * @param {*} index
 * @param {*} v1
 * @param {*} v2
 * @returns {*} Return value.
 */
BufferHelper.prototype.set2 = function(a, index, v1, v2) {
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
 * @param {*} v1
 * @param {*} v2
 * @param {*} v3
 * @returns {*} Return value.
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
 * @param {*} index
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
 * @param {*} index
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
 * @param {*} index
 * @param {*} vec
 * @returns {*} Return value.
 */
BufferHelper.prototype.setVec = function(a, index, vec) {
  var o = a[1] + index * a[3];
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
  this.attributes.push([
    H3DU.Semantic.POSITION, // Semantic
    0, // Index of first attribute
    vertices, // Buffer
    3, // Number of elements
    stride, // Number of elements from start of first to start of next
    0 // Semantic index
  ]);
  var o = H3DU.Mesh._normalOffset(this.format);
  if(o >= 0) {
    this.attributes.push([H3DU.Semantic.NORMAL, o, vertices, 3, stride, 0]);
  }
  o = H3DU.Mesh._colorOffset(this.format);
  if(o >= 0) {
    this.attributes.push([H3DU.Semantic.COLOR, o, vertices, 3, stride, 0]);
  }
  o = H3DU.Mesh._texCoordOffset(this.format);
  if(o >= 0) {
    this.attributes.push([H3DU.Semantic.TEXCOORD, o, vertices, 2, stride, 0]);
  }
  var tangents = new Float32Array(mesh.tangents);
  if((this.format & H3DU.Mesh.TANGENTS_BIT) !== 0) {
    this.attributes.push([H3DU.Semantic.TANGENT, 0, tangents, 3, stride, 0]);
  }
  if((this.format & H3DU.Mesh.BITANGENTS_BIT) !== 0) {
    this.attributes.push([H3DU.Semantic.BITANGENT, 3, tangents, 3, stride, 0]);
  }
};
/**
 * Sets the array of vertex indices used by this mesh buffer.
 * @param {Uint16Array|Uint32Array|Uint8Array} indices Array of vertex indices.
 * @param {number} byteSize Size, in bytes, of each index. Must be 1, 2, or 4.
 * @returns {H3DU.MeshBuffer} This object.
 */
MeshBuffer.prototype.setIndices = function(indices, byteSize) {
  if(byteSize !== 1 && byteSize !== 2 && byteSize !== 4)
    throw new Error();
  this.indexBufferSize = byteSize;
  this.indices = indices;
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
 * @param {*} name
 * @param {*} index
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
MeshBuffer.prototype.getIndices = function(primitiveIndex, ret) {
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
    this.getIndices(j, indices);
    var primitive = [];
    for(var k = 0; k < indices.length; k++) {
      primitive.push(helper.getVec(posattr, indices[k], [0, 0, 0]));
    }
    ret.push(primitive);
  }
  return ret;
};
/**
 * TODO: Not documented yet.
 * @param {*} matrix
 * @returns {*} Return value.
 */
MeshBuffer.prototype.transform = function(matrix) {
  // TODO: Implement and favor MeshBuffer version of this method
  var helper = new H3DU.BufferHelper();
  var positionAttribute = this.getAttribute(H3DU.Semantic.POSITION);
  var normalAttribute = this.getAttribute(H3DU.Semantic.NORMAL);
  if(!positionAttribute)return this;
  var isLinearIdentity = !(matrix[0] === 1 && matrix[1] === 0 &&
    matrix[2] === 0 && matrix[4] === 0 && matrix[5] === 1 &&
    matrix[6] === 0 && matrix[8] === 0 && matrix[9] === 0 && matrix[10] === 1);
  var matrixForNormals = null;
  if(normalAttribute >= 0 && isLinearIdentity) {
    matrixForNormals = H3DU.Math.mat4inverseTranspose3(matrix);
  }
  var count = helper.count(positionAttribute);
  if(normalAttribute)count = Math.min(helper.count(normalAttribute));
  var position = [];
  for(var i = 0; i < count; i++) {
    helper.getVec(positionAttribute, i, position);
    var xform = H3DU.Math.mat4projectVec3(matrix,
  position[i], position[i + 1], position[i + 2] || 0);
    helper.setVec(positionAttribute, i, xform);
    if(normalAttribute && isLinearIdentity) {
     // Transform and normalize the normals
     // (using a modified matrix) to ensure
     // they point in the correct direction
      helper.getVec(normalAttribute, i, position);
      xform = H3DU.Math.mat3transform(matrixForNormals,
        position[i], position[i + 1], position[i + 2] || 0);
      H3DU.Math.vec3normalizeInPlace(xform);
      helper.setVec(normalAttribute, i, xform);
    }
  }
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
      this.getIndices(j, indices);
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

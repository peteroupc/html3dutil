/*
 Any copyright to this file is released to the Public Domain.
 http://creativecommons.org/publicdomain/zero/1.0/
 If you like this, you should donate
 to Peter O. (original author of
 the Public Domain HTML 3D Library) at:
 http://peteroupc.github.io/
*/
/* global Float32Array, H3DU, Uint16Array, Uint32Array, Uint8Array */

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
  this.attributes.push([H3DU.Semantic.POSITION, 0, vertices, 3, stride, 0]);
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
  o = H3DU.Mesh._tangentOffset(this.format);
  if(o >= 0) {
    this.attributes.push([H3DU.Semantic.TANGENT, o, vertices, 3, stride, 0]);
  }
  o = H3DU.Mesh._bitangentOffset(this.format);
  if(o >= 0) {
    this.attributes.push([H3DU.Semantic.BITANGENT, o, vertices, 3, stride, 0]);
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
  var attr = this._getAttribute(semantic, semanticIndex);
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

/** @ignore */
MeshBuffer.prototype._getAttribute = function(name, index) {
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
 * vertices; if lines, two; and if points, one. Each vertex is a 3-element
 * array containing that vertex's X, Y, and Z coordinates, in that order.
 */
MeshBuffer.prototype.getPositions = function() {
  var count = 3;
  var primtype = this.primitiveType();
  if(primtype === H3DU.Mesh.LINES) {
    count = 2;
  }
  if(primtype === H3DU.Mesh.POINTS) {
    count = 1;
  }
  var posattr = this._getAttribute(H3DU.Semantic.POSITION, 0);
  if(!posattr || posattr[3] < 3) {
    return [];
  }
  var primcount = this.primitiveCount();
  var stride = posattr[4];
  var v = posattr[2];
  var vindex = posattr[1];
  var ret = [];
  for(var j = 0; j < primcount; j++) {
    var jc = j * count;
    var i1 = this.indices[jc];
    var i2 = count < 2 ? i1 : this.indices[jc + 1];
    var i3 = count < 3 ? i2 : this.indices[jc + 2];
    var vi1 = i1 * stride + vindex;
    var vi2 = i2 * stride + vindex;
    var vi3 = i3 * stride + vindex;
    var primitive = [];
    primitive.push( [v[vi1], v[vi1 + 1], v[vi1 + 2]]);
    if(count >= 2) {
      primitive.push([v[vi2], v[vi2 + 1], v[vi2 + 2]]);
    }
    if(count >= 3) {
      primitive.push([v[vi3], v[vi3 + 1], v[vi3 + 2]]);
    }
    ret.push(primitive);
  }
  return ret;
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
    var posattr = this._getAttribute(H3DU.Semantic.POSITION, 0);
    if(!posattr || posattr[3] < 3)return ret;
    var stride = posattr[4];
    var v = posattr[2];
    var vindex = posattr[1];
    for(var j = 0; j < this.indices.length; j++) {
      var vi = this.indices[j] * stride + vindex;
      if(empty) {
        empty = false;
        ret[0] = ret[3] = v[vi];
        ret[1] = ret[4] = v[vi + 1];
        ret[2] = ret[5] = v[vi + 2];
      } else {
        ret[0] = Math.min(ret[0], v[vi]);
        ret[3] = Math.max(ret[3], v[vi]);
        ret[1] = Math.min(ret[1], v[vi + 1]);
        ret[4] = Math.max(ret[4], v[vi + 1]);
        ret[2] = Math.min(ret[2], v[vi + 2]);
        ret[5] = Math.max(ret[5], v[vi + 2]);
      }
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

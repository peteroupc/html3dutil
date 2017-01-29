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
 * @class
 * @alias H3DU.MeshBuffer
 * @param {H3DU.Mesh} mesh A geometric mesh object.
 * A series of default attributes will be set based on that mesh's
 * data.
 */
H3DU.MeshBuffer = function(mesh) {
  "use strict";
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
  this.attributes.push([H3DU.MeshBuffer.POSITION, 0, vertices, 3, stride, 0]);
  var o = H3DU.Mesh._normalOffset(this.format);
  if(o >= 0) {
    this.attributes.push([H3DU.MeshBuffer.NORMAL, o, vertices, 3, stride, 0]);
  }
  o = H3DU.Mesh._colorOffset(this.format);
  if(o >= 0) {
    this.attributes.push([H3DU.MeshBuffer.COLOR, o, vertices, 3, stride, 0]);
  }
  o = H3DU.Mesh._texCoordOffset(this.format);
  if(o >= 0) {
    this.attributes.push([H3DU.MeshBuffer.TEXCOORD, o, vertices, 2, stride, 0]);
  }
  o = H3DU.Mesh._tangentOffset(this.format);
  if(o >= 0) {
    this.attributes.push([H3DU.MeshBuffer.TANGENT, o, vertices, 3, stride, 0]);
  }
  o = H3DU.Mesh._bitangentOffset(this.format);
  if(o >= 0) {
    this.attributes.push([H3DU.MeshBuffer.BITANGENT, o, vertices, 3, stride, 0]);
  }
};
/**
 * TODO: Not documented yet.
 * @param {*} indices
 * @param {*} byteSize
 * @returns {*} Return value.
 * @memberof! H3DU.MeshBuffer#
 */
H3DU.MeshBuffer.prototype.setIndices = function(indices, byteSize) {
  "use strict";
  this.indexBufferSize = byteSize;
  this.indices = indices;
  return this;
};

/**
 * Adds information about a buffer attribute to this
 * mesh buffer (or sets an
 * existing attribute's information). An attribute
 * gives information about the per-vertex data used and
 * stored in a vertex buffer.
 * @param {Number|String} semantic An attribute semantic, such
 * as {@link H3DU.MeshBuffer.POSITION}, "POSITION", or "TEXCOORD_0".
 * @param {Number} semanticIndex The set index of the attribute
 * for the given semantic.
 * 0 is the first index of the attribute, 1 is the second, and so on.
 * This is ignored if "semantic" is a string.
 * @param {Float32Array|Array} buffer The buffer where
 * the per-vertex data is stored.
 * @param {Number} startIndex The index into the array
 * (starting from 0) where the first per-vertex
 * item starts.
 * @param {Number} countPerVertex The number of elements in each
 * per-vertex item. For example, if each vertex is a 3-element
 * vector, this value is 3.
 * @param {Number} stride The number of elements from the start of
 * one per-vertex item to the start of the next.
 * @returns {H3DU.MeshBuffer} This object.
 * @memberof! H3DU.MeshBuffer#
 */
H3DU.MeshBuffer.prototype.setAttribute = function(
  name, index, buffer, startIndex, countPerVertex, stride
) {
  "use strict";
  if(buffer.constructor === Array) {
    buffer = new Float32Array(buffer);
  }
  var semanticIndex = 0;
  var semantic = 0;
  var sem = H3DU.MeshBuffer._resolveSemantic(name, index);
  if(sem === null || typeof sem === "undefined") {
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
/** @private */
H3DU.MeshBuffer._resolveSemantic = function(name, index) {
  "use strict";
  if(typeof name === "number") {
    return [name, index | 0];
  } else {
    var wka = H3DU.MeshBuffer._wellKnownAttributes[name];
    if(wka === null || typeof wka === "undefined") {
      var io = name.indexOf(name);
      if(io < 0) {
        return null;
      }
      wka = H3DU.MeshBuffer._wellKnownAttributes[name.substr(0, io)];
      if(wka === null || typeof wka === "undefined") {
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

/** @private */
H3DU.MeshBuffer.prototype._getAttributes = function() {
  "use strict";
  return this.attributes;
};

/** @private */
H3DU.MeshBuffer.prototype._getAttribute = function(name, index) {
  "use strict";
  var idx = index === null || typeof index === "undefined" ? 0 : index;
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
 * @returns {Number} Return value.
 * @memberof! H3DU.MeshBuffer#
 */
H3DU.MeshBuffer.prototype.primitiveCount = function() {
  "use strict";
  if((this.format & H3DU.Mesh.LINES_BIT) !== 0)
    return Math.floor(this.indices.length / 2);
  if((this.format & H3DU.Mesh.POINTS_BIT) !== 0)
    return this.indices.length;
  return Math.floor(this.indices.length / 3);
};
/**
 * Finds the tightest
 * bounding box that holds all vertices in the mesh buffer.
 * @returns {Array<Number>} An array of six numbers describing the tightest
 * axis-aligned bounding box
 * that fits all vertices in the mesh. The first three numbers
 * are the smallest-valued X, Y, and Z coordinates, and the
 * last three are the largest-valued X, Y, and Z coordinates.
 * This calculation uses the attribute with the semantic POSITION
 * and set index 0. If there is no such attribute,
 * or no vertices are defined in this buffer, returns the array
 * [Inf, Inf, Inf, -Inf, -Inf, -Inf].
 * @memberof! H3DU.MeshBuffer#
 */
H3DU.MeshBuffer.prototype.getBounds = function() {
  "use strict";
  if(!this._bounds) {
    var empty = true;
    var inf = Number.POSITIVE_INFINITY;
    var ret = [inf, inf, inf, -inf, -inf, -inf];
    var posattr = this._getAttribute(H3DU.MeshBuffer.POSITION);
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
 * @returns {Number} Either {@link H3DU.Mesh.TRIANGLES},
 * {@link H3DU.Mesh.LINES}, or {@link H3DU.Mesh.POINTS}.
 * @memberof! H3DU.MeshBuffer#
 */
H3DU.MeshBuffer.prototype.primitiveType = function() {
  "use strict";
  if((this.format & H3DU.Mesh.LINES_BIT) !== 0)
    return H3DU.Mesh.LINES;
  if((this.format & H3DU.Mesh.POINTS_BIT) !== 0)
    return H3DU.Mesh.POINTS;
  return H3DU.Mesh.TRIANGLES;
};
// TODO: Consider moving these constants to their own class
H3DU.MeshBuffer.POSITION = 0;
H3DU.MeshBuffer.NORMAL = 1;
H3DU.MeshBuffer.TEXCOORD = 2;
H3DU.MeshBuffer.COLOR = 3;
H3DU.MeshBuffer.JOINT = 4;
H3DU.MeshBuffer.WEIGHT = 5;
H3DU.MeshBuffer.TANGENT = 6;
H3DU.MeshBuffer.BITANGENT = 7;
H3DU.MeshBuffer._wellKnownAttributes = {
  "POSITION":H3DU.MeshBuffer.POSITION,
  "TEXCOORD":H3DU.MeshBuffer.TEXCOORD,
  "TEXCOORD_0":H3DU.MeshBuffer.TEXCOORD,
  "NORMAL":H3DU.MeshBuffer.NORMAL,
  "JOINT":H3DU.MeshBuffer.JOINT,
  "WEIGHT":H3DU.MeshBuffer.WEIGHT,
  "TANGENT":H3DU.MeshBuffer.TANGENT,
  "BITANGENT":H3DU.MeshBuffer.BITANGENT
};

/** @private */
H3DU.MeshBuffer.prototype.getFormat = function() {
  "use strict";
  return this.format;
};
/**
 * Gets the number of vertices in this mesh buffer
 * @returns {Number} Return value.
 * @memberof! H3DU.MeshBuffer#
 */
H3DU.MeshBuffer.prototype.vertexCount = function() {
  "use strict";
  return this.indices.length;
};

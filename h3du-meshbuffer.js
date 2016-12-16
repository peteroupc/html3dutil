/*
Written by Peter O. in 2015.

Any copyright is dedicated to the Public Domain.
http://creativecommons.org/publicdomain/zero/1.0/
If you like this, you should donate to Peter O.
at: http://peteroupc.github.io/
*/
/* global Float32Array, H3DU, Uint16Array, Uint32Array, Uint8Array */

/**
* A geometric mesh in the form of buffer objects.
* @class
* @alias H3DU.MeshBuffer
* @param {H3DU.Mesh} mesh A geometric mesh object.
*/
H3DU.MeshBuffer = function(mesh) {
  "use strict";
  this._bounds = mesh.getBoundingBox();
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
  this.numVertices = mesh.vertices.length / stride;
  this.facesLength = mesh.indices.length;
  this.attributes = [];
  this.attributes.push(["position", 0, vertices, 3, stride]);
  var o = H3DU.Mesh._normalOffset(this.format);
  if(o >= 0) {
    this.attributes.push(["normal", o, vertices, 3, stride]);
  }
  o = H3DU.Mesh._colorOffset(this.format);
  if(o >= 0) {
    this.attributes.push(["colorAttr", o, vertices, 3, stride]);
  }
  o = H3DU.Mesh._texCoordOffset(this.format);
  if(o >= 0) {
    this.attributes.push(["uv", o, vertices, 2, stride]);
  }
  o = H3DU.Mesh._tangentOffset(this.format);
  if(o >= 0) {
    this.attributes.push(["tangent", o, vertices, 3, stride]);
  }
  o = H3DU.Mesh._bitangentOffset(this.format);
  if(o >= 0) {
    this.attributes.push(["bitangent", o, vertices, 3, stride]);
  }
};
/**
 * Not documented yet.
 * @param {*} name
 * @param {*} buffer
 * @param {*} startIndex
 * @param {*} countPerVertex
 * @param {*} stride
 * @memberof! H3DU.MeshBuffer#
*/
H3DU.MeshBuffer.prototype.setAttribute = function(
  name, buffer, startIndex, countPerVertex, stride
) {
  "use strict";
  if(buffer.constructor === Array) {
    buffer = new Float32Array(buffer);
  }
  var attr = this._getAttribute(name);
  if(attr) {
    attr[1] = startIndex;
    attr[2] = buffer;
    attr[3] = countPerVertex;
    attr[4] = stride;
  } else {
    this.attributes.push([name, startIndex, buffer, countPerVertex, stride]);
  }
};

/** @private */
H3DU.MeshBuffer.prototype._getAttributes = function() {
  "use strict";
  return this.attributes;
};

/** @private */
H3DU.MeshBuffer.prototype._getAttribute = function(name) {
  "use strict";
  for(var i = 0;i < this.attributes.length;i++) {
    if(this.attributes[i][0] === name)return this.attributes[i];
  }
  return null;
};

/**
 * Gets the number of primitives (triangles, lines,
* and points) composed by all shapes in this mesh.
* @param {*} Return value.
* @memberof! H3DU.MeshBuffer#
*/
H3DU.MeshBuffer.prototype.primitiveCount = function() {
  "use strict";
  if((this.format & H3DU.Mesh.LINES_BIT) !== 0)
    return Math.floor(this.facesLength / 2);
  if((this.format & H3DU.Mesh.POINTS_BIT) !== 0)
    return this.facesLength;
  return Math.floor(this.facesLength / 3);
};
/**
* Finds the tightest
* bounding box that holds all vertices in the mesh buffer.
* @returns An array of six numbers describing the tightest
* axis-aligned bounding box
* that fits all vertices in the mesh. The first three numbers
* are the smallest-valued X, Y, and Z coordinates, and the
* last three are the largest-valued X, Y, and Z coordinates.
* If the mesh buffer is empty or has no attribute named
* "position", returns the array [Inf, Inf, Inf, -Inf,
* -Inf, -Inf].
 * @memberof! H3DU.MeshBuffer#
*/
H3DU.MeshBuffer.prototype.getBounds = function() {
  "use strict";
  if(!this._bounds) {
    var empty = true;
    var inf = Number.POSITIVE_INFINITY;
    var ret = [inf, inf, inf, -inf, -inf, -inf];
    var posattr = this._getAttribute("position");
    if(!posattr || posattr[3] < 3)return ret;
    var stride = posattr[4];
    var v = posattr[2];
    var vindex = posattr[1];
    for(var j = 0;j < this.indices.length;j++) {
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
  }
  return this._bounds;
};

H3DU.MeshBuffer.prototype.getType = function() {
  "use strict";
  if((this.format & H3DU.Mesh.LINES_BIT) !== 0)
    return H3DU.Mesh.LINES;
  if((this.format & H3DU.Mesh.POINTS_BIT) !== 0)
    return H3DU.Mesh.POINTS;
  return H3DU.Mesh.TRIANGLES;
};

/** @private */
H3DU.MeshBuffer.prototype.getFormat = function() {
  "use strict";
  return this.format;
};
/**
 * Gets the number of vertices in this mesh buffer
 * @memberof! H3DU.MeshBuffer#
*/
H3DU.MeshBuffer.prototype.vertexCount = function() {
  "use strict";
  return this.numVertices;
};

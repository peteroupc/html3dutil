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
 * @param {*} a
 * @returns {*} Return value.
 */
BufferHelper.prototype.countPerElement = function(a) {
  return a === null ? 0 : a[3];
};
/**
 * TODO: Not documented yet.
 * @param {*} semantic
 * @param {*} index
 * @param {*} count
 * @param {*} countPerElement
 * @returns {*} Return value.
 */
BufferHelper.prototype.makeBlank = function(semantic, index, count, countPerElement) {
  var els = new Float32Array(new ArrayBuffer(count * countPerElement * 4));
  return [semantic, 0, els, countPerElement, countPerElement, index];
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
 * @param {H3DU.Mesh} [mesh] A geometric mesh object.
 * A series of default attributes will be set based on that mesh's
 * data. If null or omitted, an empty mesh buffer will be generated.
 */
export var MeshBuffer = function(mesh) {
  if(typeof mesh !== "undefined" && mesh !== null) {
    var vertices = new Float32Array(mesh.vertices);
    if(mesh.vertices.length >= 65536 || mesh.indices.length >= 65536) {
      this.indices = new Uint32Array(mesh.indices);
    } else if(mesh.vertices.length <= 256 && mesh.indices.length <= 256) {
      this.indices = new Uint8Array(mesh.indices);
    } else {
      this.indices = new Uint16Array(mesh.indices);
    }
    this.format = mesh.primitiveType();
    var stride = H3DU.Mesh._getStride(mesh.attributeBits);
    this.attributes = [];
    this.setAttribute(H3DU.Semantic.POSITION, 0, vertices, 0, 3, stride);
    var o = H3DU.Mesh._normalOffset(mesh.attributeBits);
    if(o >= 0) {
      this.setAttribute(H3DU.Semantic.NORMAL, 0, vertices, o, 3, stride);
    }
    o = H3DU.Mesh._colorOffset(mesh.attributeBits);
    if(o >= 0) {
      this.setAttribute(H3DU.Semantic.COLOR, 0, vertices, o, 3, stride);
    }
    o = H3DU.Mesh._texCoordOffset(mesh.attributeBits);
    if(o >= 0) {
      this.setAttribute(H3DU.Semantic.TEXCOORD, 0, vertices, o, 2, stride);
    }
    var tangents = new Float32Array(mesh.tangents);
    if((mesh.attributeBits & H3DU.Mesh.TANGENTS_BIT) !== 0) {
      this.setAttribute(H3DU.Semantic.TANGENT, 0, tangents, 0, 3, 3);
    }
    if((mesh.attributeBits & H3DU.Mesh.BITANGENTS_BIT) !== 0) {
      this.setAttribute(H3DU.Semantic.BITANGENT, 0, tangents, 3, 3, 3);
    }
    this._bounds = null;
  } else {
    this.format = H3DU.Mesh.TRIANGLES;
    this.attributes = [];
    this._bounds = null;
    this.indices = new Uint8Array([]);
  }
};
/**
 * Gets the array of vertex indices used by this mesh buffer.
 * @returns {Uint16Array|Uint32Array|Uint8Array} Return value.
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
  return this;
};
/**
 * Sets the type of graphics primitives stored in this mesh buffer.
 * @param {number} primType The primitive type, either {@link H3DU.Mesh.TRIANGLES},
 * {@link H3DU.Mesh.LINES}, or {@link H3DU.Mesh.POINTS}.
 * @returns {H3DU.MeshBuffer} This object.
 */
MeshBuffer.prototype.setPrimitiveType = function(primType) {
  this.format = primType;
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
 * Gets the vertex indices of a given primitive (triangle, line,
 * or point) in this mesh buffer.
 * @param {number} primitiveIndex The index (counting from 0)
 * of the primitive whose indices will be retrieved.
 * @param {Array<number>} ret An array where the vertex indices for
 * the given primitive will be stored. If this mesh buffer stores
 * triangles, three indices will be stored; if lines, two; and if
 * points, one.
 * @returns {Array<number>} The parameter "ret".
 */
MeshBuffer.prototype.vertexIndices = function(primitiveIndex, ret) {
  var count = 3;
  var prim = this.primitiveType();
  if(prim === H3DU.Mesh.LINES)count = 2;
  if(prim === H3DU.Mesh.POINTS)count = 1;
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
  if(this.format === H3DU.Mesh.LINES)
    return Math.floor(this.indices.length / 2);
  if(this.format === H3DU.Mesh.POINTS)
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

/** @ignore */
MeshBuffer._recalcNormals = function(positions, normals, indices, flat, inward) {
  var normDir = inward ? -1 : 1;
  var uniqueVertices = {};
  var dupverts = [];
  var dupvertcount = 0;
  var i;
  var helper = new BufferHelper();
  var count = Math.min(helper.count(positions), helper.count(normals));
  var v1 = [0, 0, 0];
  var v2 = [0, 0, 0];
  var v3 = [0, 0, 0];
  var normal = [0, 0, 0];
  for(i = 0; i < count; i++) {
     // Set normal to 0
    helper.setVec(normals, i, v1);
    if(!flat) {
     // If non-flat shading is requested, find all vertices with
     // duplicate vertex positions
      var uv = helper.getVec(positions, i, []);
      if(uniqueVertices[uv])uniqueVertices[uv].push(i);
      else uniqueVertices[uv] = [i];
    }
  }
  for(i = 0; i < indices.length; i += 3) {
    v1 = helper.getVec(positions, indices[i], v1);
    v2 = helper.getVec(positions, indices[i + 1], v2);
    v3 = helper.getVec(positions, indices[i + 2], v3);
    var n1 = H3DU.Math.vec3sub(v1, v3);
    var n2 = H3DU.Math.vec3sub(v2, v3);
    // cross multiply n1 and n2
    var n1xn2 = H3DU.Math.vec3cross(n1, n2);
    H3DU.Math.vec3normalizeInPlace(n1xn2);
    H3DU.Math.vec3scaleInPlace(n1xn2, normDir);
    // add normalized normal to each vertex of the face
    helper.getVec(normals, indices[i], v1);
    helper.getVec(normals, indices[i + 1], v2);
    helper.getVec(normals, indices[i + 2], v3);
    H3DU.Math.vec3addInPlace(v1, n1xn2);
    H3DU.Math.vec3addInPlace(v2, n1xn2);
    H3DU.Math.vec3addInPlace(v3, n1xn2);
    helper.setVec(normals, indices[i], v1);
    helper.setVec(normals, indices[i + 1], v2);
    helper.setVec(normals, indices[i + 2], v3);
  }
  if(!flat) {
   // If non-flat shading is requested, make sure
   // that every vertex with the same position has the
   // same normal
    for(var key in uniqueVertices) {
      if(Object.prototype.hasOwnProperty.call(uniqueVertices, key)) {
        var v = uniqueVertices[key];
        if(v && v.constructor === Array && v.length >= 2) {
          var v0 = v[0];
          helper.getVec(normals, v0, normal);
          var avg = [normal[0], normal[1], normal[2]];
          dupverts[0] = normal[0];
          dupverts[1] = normal[1];
          dupverts[2] = normal[2];
          dupvertcount = 3;
          for(i = 1; i < v.length; i++) {
            var dupfound = false;
            helper.getVec(positions, v[i], normal);
            var nx = normal[0];
            var ny = normal[1];
            var nz = normal[2];
            for(var j = 0; j < dupvertcount; j += 3) {
              if(nx === dupverts[j] && ny === dupverts[j + 1] && nz === dupverts[j + 2]) {
                dupfound = true;
                break;
              }
            }
            if(!dupfound) {
              dupverts[dupvertcount++] = nx;
              dupverts[dupvertcount++] = ny;
              dupverts[dupvertcount++] = nz;
              H3DU.Math.vec3addInPlace(avg, normal);
            }
          }
          for(i = 0; i < v.length; i++) {
            helper.setVec(normals, v[i], avg);
          }
        }
      }
    }
  }
  // Normalize each normal of the vertex
  count = helper.count(normals);
  for(i = 0; i < count; i++) {
    helper.getVec(normals, i, normal);
    H3DU.Math.vec3normalize(normal);
    helper.setVec(normals, i, normal);
  }
};

/** @ignore */
MeshBuffer._recalcTangentsInternal = function(positions, normals, texCoords, tangents, bitangents, indices) {
  var helper = new BufferHelper();
  var v1 = [0, 0, 0];
  var v2 = [0, 0, 0];
  var v3 = [0, 0, 0];
  tangents = [];
  for(var i = 0; i < indices.length; i += 3) {
    v1 = helper.getVec(positions, indices[i], v1);
    v2 = helper.getVec(positions, indices[i + 1], v2);
    v3 = helper.getVec(positions, indices[i + 2], v3);
    // Find the tangent and bitangent
    var ret;
    var t1 = v2[0] - v1[0];
    var t2 = v2[1] - v1[1];
    var t3 = v2[2] - v1[2];
    var t4 = v3[0] - v1[0];
    var t5 = v3[1] - v1[1];
    var t6 = v3[2] - v1[2];
    v1 = helper.getVec(texCoords, indices[i], v1);
    v2 = helper.getVec(texCoords, indices[i + 1], v2);
    v3 = helper.getVec(texCoords, indices[i + 2], v3);
    var t7 = v2[0] - v1[0];
    var t8 = v2[1] - v1[1];
    var t9 = v3[0] - v1[0];
    var t10 = v3[1] - v1[1];
    var t11 = t7 * t10 - t8 * t9;
    if(t11 === 0) {
    // Degenerate case
      ret = [0, 0, 0, 0, 0, 0];
    } else {
      t11 = 1.0 / t11;
      var t12 = -t8;
      var t13 = -t9;
      var t14 = (t10 * t1 + t12 * t4) * t11;
      var t15 = (t10 * t2 + t12 * t5) * t11;
      var t16 = (t10 * t3 + t12 * t6) * t11;
      var t17 = (t13 * t1 + t7 * t4) * t11;
      var t18 = (t13 * t2 + t7 * t5) * t11;
      var t19 = (t13 * t3 + t7 * t6) * t11;
      ret = [t14, t15, t16, t17, t18, t19];
    }
  // NOTE: It would be more mathematically correct to use the inverse
  // of the matrix
  // [ Ax Bx Nx ]
  // [ Ay By Ny ]
  // [ Az Bz Nz ]
  // (where A and B are the tangent and bitangent and returned
  // in _findTangentAndBitangent) as the tangent space
  // transformation, that is, include three
  // different vectors (tangent, bitangent, and modified normal).
  // Instead we use the matrix
  // [ AAx AAy AAz ]
  // [ BBx BBy BBz ]
  // [ Nx Ny Nz ]
  // (where AA and BB are the orthonormalized versions of the tangent
  // and bitangent) as the tangent space transform, in order to avoid
  // the need to also specify a transformed normal due to matrix inversion.
    for(var j = 0; j < 3; j++) {
      var m = ret;
      v1 = helper.getVec(normals, indices[i + j], v1);
      var norm0 = v1[0];
      var norm1 = v1[1];
      var norm2 = v1[2];
      var t20 = m[0] * norm0 + m[1] * norm1 + m[2] * norm2;
      var tangent = H3DU.Math.vec3normalizeInPlace([
        m[0] - t20 * norm0,
        m[1] - t20 * norm1,
        m[2] - t20 * norm2]);
      var t22 = m[3] * norm0 + m[4] * norm1 + m[5] * norm2;
      var t23 = m[3] * tangent[0] + m[4] * tangent[1] + m[5] * tangent[2];
      var bitangent = H3DU.Math.vec3normalizeInPlace([
        m[3] - t22 * norm0 - t23 * tangent[0],
        m[4] - t22 * norm1 - t23 * tangent[1],
        m[5] - t22 * norm2 - t23 * tangent[2]]);
      helper.setVec(tangents, indices[i + j], tangent);
      helper.setVec(bitangents, indices[i + j], bitangent);
    }
  }
};

/** @ignore */
MeshBuffer.prototype._makeRedundant = function(helper) {
  var newAttributes = [];
  for(var i = 0; i < this.attributes.length; i++) {
    newAttributes.push(helper.makeRedundant(this.attributes[i], this.indices));
  }
  this.attributes = newAttributes;
  this.setIndices(helper.makeIndices(this.indices.length));
};
/** @ignore */
MeshBuffer.prototype._threeEl = function(helper, sem, count) {
  var attr = this.getAttribute(sem);
  if(!attr) {
    attr = helper.makeBlank(sem, 0, count, 3);
    this.attributes.push(attr);
  } else if(helper.countPerElement(attr) < 3) {
    var newattr = helper.makeBlank(sem, 0, count, 3);
    var vec = [0, 0, 0];
    for(var i = 0; i < count; i++) {
      helper.getVec(attr, i, vec);
      helper.setVec(newattr, i, vec);
    }
    attr = newattr;
    this.attributes.push(attr);
  }
  return attr;
};

/**
 * Recalculates the normal vectors for triangles
 * in this mesh. For this to properly affect shading, each triangle in
 * the mesh must have its vertices defined in
 * counterclockwise order (if the triangle is being rendered
 * in a right-handed coordinate system). Each normal calculated will
 * be normalized to have a length of 1 (unless the normal is (0,0,0)).
 * Will have an effect only if the position vector is at least 3 elements
 * long. If the normal vector exists, but is not at least 3 elements long,
 * this method will have no effect.
 * @param {Boolean} flat If true, each triangle in the mesh
 * will have the same normal, which usually leads to a flat
 * appearance. If false, each unique vertex in the mesh
 * will have its own normal, which usually leads to a smooth
 * appearance.
 * @param {Boolean} inward If true, the generated normals
 * will point inward; otherwise, outward.
 * @returns {H3DU.Mesh} This object.
 */
MeshBuffer.prototype.recalcNormals = function(flat, inward) {
  var primtype = this.primitiveType();
  if(primtype === H3DU.Mesh.TRIANGLES) {
    var helper = new BufferHelper();
    var positions = this.getAttribute(H3DU.Semantic.POSITION);
    if(helper.countPerElement(positions) < 3) {
      return this;
    }
    this._makeRedundant(helper);
    positions = this.getAttribute(H3DU.Semantic.POSITION);
    var normals = this._threeEl(helper, H3DU.Semantic.NORMAL, helper.count(positions));
    MeshBuffer._recalcNormals(positions, normals, this.indices, flat, inward);
  }
  return this;
};
/** @ignore */
MeshBuffer.prototype._recalcTangents = function() {
  var primtype = this.primitiveType();
  if(primtype === H3DU.Mesh.TRIANGLES) {
    var helper = new BufferHelper();
    var positions = this.getAttribute(H3DU.Semantic.POSITION);
    var normals = this.getAttribute(H3DU.Semantic.NORMAL);
    var texCoords = this.getAttribute(H3DU.Semantic.TEXCOORD);
    if(helper.countPerElement(positions) < 3 || helper.countPerElement(normals) < 3 ||
      helper.countPerElement(texCoords) < 3) {
      return this;
    }
    this._makeRedundant(helper);
    positions = this.getAttribute(H3DU.Semantic.POSITION);
    normals = this.getAttribute(H3DU.Semantic.NORMAL);
    texCoords = this.getAttribute(H3DU.Semantic.TEXCOORD);
    var tangents = this._threeEl(helper, H3DU.Semantic.TANGENT, helper.count(positions));
    var bitangents = this._threeEl(helper, H3DU.Semantic.BITANGENT, helper.count(positions));
    MeshBuffer._recalcTangentsInternal(positions, normals, texCoords,
      tangents, bitangents, this.indices);
  }
  return this;
};

/**
 * TODO: Not documented yet.
 * @param {*} other
 * @returns {*} Return value.
 * @example
 * var copiedMesh = new H3DU.MeshBuffer().merge(meshToCopy);
 */
MeshBuffer.prototype.merge = function(other) {
  var helper = new H3DU.BufferHelper();
  var newAttributes = [];
  if(!other)throw new Error();
  if(other.indices.length === 0) {
    // Nothing to merge into this one, just return
    return this;
  } else if(this.indices.length === 0) {
    var empty = true;
    for(var i = 0; i < this.attributes.length; i++) {
      empty = empty && helper.count(this.attributes[i]) === 0;
    }
    if(empty) {
  // If this object is empty, copy the attributes and
  // indices from the other object
      for(i = 0; i < other.attributes.length; i++) {
        newAttributes.push(helper.copy(other.attributes[i]));
      }
      this._bounds = null;
      this.format = other.format;
      this.attributes = newAttributes;
      // NOTE: Copies the index buffer
      this.setIndices(other.indices.slice(0, other.indices.length));
      return this;
    }
  }
  if(this.format !== other.format) {
    throw new Error();
  }
  for(i = 0; i < this.attributes.length; i++) {
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
 * (Normals need to be transformed specially because they describe directions, not points.)
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
  return this.format;
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

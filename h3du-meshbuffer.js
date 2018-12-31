/*
 Any copyright to this file is released to the Public Domain.
 http://creativecommons.org/publicdomain/zero/1.0/
 If you like this, you should donate
 to Peter O. (original author of
 the Public Domain HTML 3D Library) at:
 http://peteroupc.github.io/
*/
/* global Float32Array, H3DU, Uint16Array, Uint32Array */

import {BufferAccessor} from "./h3du-bufferaccessor.js";
import {_MathInternal} from "./h3du-mathinternal.js";

/**
 * A geometric mesh in the form of buffer objects.
 * A mesh buffer is made up of one or more [vertex attribute objects]{@link H3DU.BufferAccessor},
 * and an array of vertex indices. Each vertex attribute object contains
 * the values of one attribute of the mesh, such as positions,
 * vertex normals, and texture coordinates. A mesh buffer
 * can store vertices that make up triangles, line segments, or points.<p>
 * This constructor creates an empty mesh buffer and sets the array
 * of vertex indices to null.
 * @constructor
 * @memberof H3DU
 */
export var MeshBuffer = function() {
  this.format = H3DU.MeshBuffer.TRIANGLES;
  this.attributes = [];
  this._bounds = null;
  this.indices = null;
};
/**
 * Gets the array of vertex indices used by this mesh buffer.
 * @returns {Uint16Array|Uint32Array|Uint8Array} Return value.
 */
MeshBuffer.prototype.getIndices = function() {
  return this.indices;
};
/**
 * Sets the vertex indices used by this mesh buffer.
 * @param {Array<number>|Uint16Array|Uint32Array|Uint8Array} indices Array of vertex indices
 * that the mesh buffer will use.
 * @returns {H3DU.MeshBuffer} This object.
 */
MeshBuffer.prototype.setIndices = function(indices) {
  if(indices instanceof Array) {
    var index = 0;
    for(var i = indices.length - 1; i >= 0; i--) {
      index = Math.max(index, indices[i]);
      if(index >= 65536)break;
    }
    if(index >= 65536) {
      this.indices = new Uint32Array(indices);
    } else {
      this.indices = new Uint16Array(indices);
    }
  } else {
    this.indices = indices.slice(0, indices.length);
  }
  return this;
};
/**
 * Sets the type of graphics primitives stored in this mesh buffer.
 * @param {number} primType The primitive type, either {@link H3DU.MeshBuffer.TRIANGLES},
 * {@link H3DU.MeshBuffer.LINES}, or {@link H3DU.MeshBuffer.POINTS}.
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
 * @param {number|string} name An attribute semantic, such
 * as {@link H3DU.Semantic.POSITION}, "POSITION", or "TEXCOORD_0".
 * Throws an error if this value is a string and the string is invalid.
 * If this isn't a string, the set index of the attribute will be 0 (see {@link H3DU.MeshBuffer#setAttributeEx}).
 * @param {Float32Array|Array} buffer The buffer where
 * the per-vertex data is stored. See {@link H3DU.MeshBuffer#setAttributeEx}.
 * @param {number} countPerValue The number of elements in each
 * per-vertex item. See {@link H3DU.MeshBuffer#setAttributeEx}.
 * @param {number} [offset] The index into the array
 * (starting from 0) where the first per-vertex
 * item starts.See {@link H3DU.MeshBuffer#setAttributeEx}.
 * @param {number} [stride] The number of elements from the start of
 * one per-vertex item to the start of the next. See {@link H3DU.MeshBuffer#setAttributeEx}.
 * @returns {H3DU.MeshBuffer} This object. Throws an error if the given
 * semantic is unsupported.
 */
MeshBuffer.prototype.setAttribute = function(
  name, buffer, countPerValue, offset, stride
) {
  return this.setAttributeEx(name, 0, buffer, countPerValue, offset, stride);
};

/**
 * Adds information about a buffer attribute to this
 * mesh buffer (or sets an
 * existing attribute's information), taking a semantic index as
 * an additional parameter. An attribute
 * gives information about the per-vertex data used and
 * stored in a vertex buffer.
 * @param {number|string} name An attribute semantic, such
 * as {@link H3DU.Semantic.POSITION}, "POSITION", or "TEXCOORD_0".
 * Throws an error if this value is a string and the string is invalid.
 * @param {number} index The semantic index of the attribute
 * for the given semantic.
 * 0 is the first index of the attribute, 1 is the second, and so on.
 * This is ignored if "name" is a string.
 * @param {Float32Array|Array|BufferAccessor} buffer The buffer where
 * the per-vertex data is stored. If this parameter is an (untyped) Array, converts
 * that parameter to a Float32Array.
 * @param {number} [countPerValue] The number of elements in each
 * per-vertex item. For example, if each vertex is a 3-element
 * vector, this value is 3. Throws an error if this value is 0 or less.
 * If "buffer" is a {@link H3DU.BufferAccessor}, the value of "countPerValue"
 * is taken from that accessor and this parameter is ignored; this parameter
 * is currently required otherwise.
 * @param {number} [offset] The index into the array
 * (starting from 0) where the first per-vertex
 * item starts. If null, undefined, or
 * omitted, the default is 0. Throws an error if less than 0.
 * If "buffer" is a {@link H3DU.BufferAccessor}, the value of "offset"
 * is taken from that accessor and this parameter is ignored.
 * @param {number} [stride] The number of elements from the start of
 * one per-vertex item to the start of the next. If null, undefined, or omitted,
 * this value is the same as "countPerValue". Throws an error if this value is 0 or less.
 * If "buffer" is a {@link H3DU.BufferAccessor}, the value of "stride"
 * is taken from that accessor and this parameter is ignored.
 * @returns {H3DU.MeshBuffer} This object.Throws an error if the given
 * semantic is unsupported.
 */
MeshBuffer.prototype.setAttributeEx = function(
  name, index, buffer, countPerValue, offset, stride
) {
  var bufferArray;
  if(buffer instanceof BufferAccessor) {
    if(buffer.buffer instanceof BufferAccessor)throw new Error();
    return this.setAttributeEx(name, index, buffer.buffer,
      buffer.countPerValue, buffer.offset, buffer.stride);
  } else if(typeof countPerValue === "undefined" || countPerValue === null)throw new Error();
  if(buffer instanceof Array) {
    bufferArray = new Float32Array(buffer);
  } else {
    bufferArray = buffer;
  }
  var semanticIndex = 0;
  var semantic = 0;
  var strideValue = typeof stride === "undefined" || stride === null ? countPerValue : stride;
  var startIndex = typeof offset === "undefined" || offset === null ? 0 : offset;
  if(countPerValue <= 0 || strideValue <= 0 || startIndex < 0)throw new Error();
  var sem = MeshBuffer._resolveSemantic(name, index);
  if(typeof sem === "undefined" || sem === null) {
    console.warn("Unsupported attribute semantic: " + name);
    return this;
  }
  semantic = sem[0];
  semanticIndex = sem[1];
  var attr = this.getAttribute(semantic, semanticIndex);
  if(attr) {
    attr[2].buffer = buffer;
    attr[2].offset = startIndex;
    attr[2].countPerValue = countPerValue;
    attr[2].stride = strideValue;
  } else {
    this.attributes.push([semantic, semanticIndex,
      new BufferAccessor(bufferArray, countPerValue, startIndex, strideValue)]);
  }
  this._bounds = null;
  return this;
};

/** @ignore */
MeshBuffer.prototype._getAttributes = function() {
  return this.attributes;
};
/**
 * Gets a vertex attribute included in this mesh buffer.
 * @param {number|string} name An attribute semantic, such
 * as {@link H3DU.Semantic.POSITION}, "POSITION", or "TEXCOORD_0".
 * Throws an error if this value is a string and the string is invalid.
 * @param {number} [semanticIndex] The set index of the attribute
 * for the given semantic.
 * 0 is the first index of the attribute, 1 is the second, and so on.
 * This is ignored if "name" is a string. Otherwise, if null or omitted, the default value is 0.
 * @returns {H3DU.BufferAccessor} A vertex buffer accessor, or null
 * if the attribute doesn't exist.
 * @example <caption>The following function gets the positions,
 * normals, texture coordinates, and colors of each primitive
 * (line, text, or point) in the mesh buffer. A point will have one
 * vertex per primitive, a line two vertices and a triangle three.
 * The attributes, if present, will be stored in the "position",
 * "normal", "uv", and "color" properties of each vertex.</caption>
 * function getPrimitives(mesh) {
 * var p=mesh.getAttribute("POSITION")
 * var n=mesh.getAttribute("NORMAL")
 * var t=mesh.getAttribute("TEXCOORD_0")
 * var c=mesh.getAttribute("COLOR")
 * var ind=mesh.getIndices()
 * var primSize = 3;
 * if(mesh.primitiveType() === Mesh.LINES)primSize = 2;
 * if(mesh.primitiveType() === Mesh.POINTS)primSize = 1;
 * var ret=[]
 * for(var i=0;i&lt;ind.length;i+=primSize) {
 * var prim=[]
 * var index=ind[i]
 * for(var j=0;j&lt;primSize;j++) {
 * var info={}
 * if(p)info.position=p.getVec(index,[])
 * if(n)info.normal=n.getVec(index,[])
 * if(t)info.uv=t.getVec(index,[])
 * if(c)info.color=c.getVec(index,[])
 * }
 * ret.push(prim)
 * }
 * return ret
 * }
 */
MeshBuffer.prototype.getAttribute = function(name, semanticIndex) {
  var sem = MeshBuffer._resolveSemantic(name, semanticIndex);
  if(typeof sem === "undefined" || sem === null) {
    console.warn("Unsupported attribute semantic: " + name);
    return null;
  }
  for(var i = 0; i < this.attributes.length; i++) {
    if(this.attributes[i][0] === sem[0] &&
    this.attributes[i][1] === sem[1]) {
      return this.attributes[i][2];
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
  if(prim === H3DU.MeshBuffer.LINES)count = 2;
  if(prim === H3DU.MeshBuffer.POINTS)count = 1;
  if(typeof this.indices === "undefined" || this.indices === null) {
    var i = primitiveIndex * count;
    if(i + count > this.vertexCount())throw new Error();
    ret[0] = i;
    if(count >= 2)ret[1] = i + 1;
    if(count >= 3)ret[2] = i + 2;
  } else {
    i = primitiveIndex * count;
    ret[0] = this.indices[i];
    if(count >= 2)ret[1] = this.indices[i + 1];
    if(count >= 3)ret[2] = this.indices[i + 2];
  }
  return ret;
};

/**
 * Creates a new mesh buffer with the given array of vertex positions.
 * @param {Array<number>|Float32Array} vertices An array of vertex positions. This
 * array's length must be divisible by 3; every 3 elements are the
 * X, Y, and Z coordinates, in that order, of one vertex.
 * @returns {MeshBuffer} A new mesh buffer.
 */
MeshBuffer.fromPositions = function(vertices) {
  var vertarray = new Float32Array(vertices);
  return new MeshBuffer().setAttribute("POSITION", vertarray, 3, 0);
};

/**
 * Creates a new mesh buffer with the given array of vertex positions
 * and vertex normals.
 * @param {Array<number>|Float32Array} vertices An array of vertex data. This
 * array's length must be divisible by 6; every 6 elements describe
 * one vertex and are in the following order:<ol>
 * <li>X, Y, and Z coordinates, in that order, of the vertex position.
 * <li>X, Y, and Z components, in that order, of the vertex normal.</ol>
 * @returns {MeshBuffer} A new mesh buffer.
 */
MeshBuffer.fromPositionsNormals = function(vertices) {
  var vertarray = new Float32Array(vertices);
  return new MeshBuffer()
   .setAttribute("POSITION", vertarray, 3, 0, 6)
   .setAttribute("NORMAL", vertarray, 3, 3, 6);
};

/**
 * Creates a new mesh buffer with the given array of vertex positions,
 * vertex normals, and texture coordinates.
 * @param {Array<number>|Float32Array} vertices An array of vertex data. This
 * array's length must be divisible by 8; every 8 elements describe
 * one vertex and are in the following order:<ol>
 * <li>X, Y, and Z coordinates, in that order, of the vertex position.
 * <li>X, Y, and Z components, in that order, of the vertex normal.
 * <li>U and V texture coordinates, in that order, of the vertex.</ol>
 * @returns {MeshBuffer} A new mesh buffer.
 */
MeshBuffer.fromPositionsNormalsUV = function(vertices) {
  var vertarray = new Float32Array(vertices);
  return new MeshBuffer()
   .setAttribute("POSITION", vertarray, 3, 0, 8)
   .setAttribute("NORMAL", vertarray, 3, 3, 8)
   .setAttribute("TEXCOORD", vertarray, 2, 6, 8);
};

/**
 * Gets the number of primitives (triangles, lines,
 * and points) composed by all shapes in this mesh.
 * @returns {number} Return value.
 */
MeshBuffer.prototype.primitiveCount = function() {
  if(this.format === H3DU.MeshBuffer.LINES)
    return Math.floor(this.vertexCount() / 2);
  if(this.format === H3DU.MeshBuffer.POINTS)
    return this.vertexCount();
  return Math.floor(this.vertexCount() / 3);
};
/**
 * Gets an array of vertex positions held by this mesh buffer,
 * arranged by primitive.
 * Only values with the attribute semantic <code>POSITION_0</code> are returned.
 * @returns {Array<Array<number>>} An array of primitives,
 * each of which holds the vertices that make up that primitive.
 * If this mesh holds triangles, each primitive will contain three
 * vertices; if lines, two; and if points, one. Each vertex is an at least 3-element
 * array containing that vertex's X, Y, and Z coordinates, in that order.
 */
MeshBuffer.prototype.getPositions = function() {
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
      primitive.push(posattr.getVec(indices[k], [0, 0, 0]));
    }
    ret.push(primitive);
  }
  return ret;
};

/**
 * Modifies this mesh buffer by converting the normals it defines to [unit vectors]{@tutorial glmath}
 * ("normalized" vectors with a length of 1).
 * Has no effect if this mesh buffer doesn't define any normals.
 * All attributes with the semantic <code>NORMAL</code>,
 * regardless of semantic index, are affected.
 * @returns {H3DU.MeshBuffer} This object.
 */
MeshBuffer.prototype.normalizeNormals = function() {
  for(var i = 0; i < this.attributes.length; i++) {
    var attr = this.attributes[i];
    if(attr[0] !== H3DU.Semantic.NORMAL) {
      continue;
    }
    var value = [];
    var count = attr[2].count();
    for(var j = 0; j < count; j++) {
      attr[2].getVec(j, value);
      _MathInternal.vecNormalizeInPlace(value);
      attr[2].setVec(j, value);
    }
  }
  return this;
};

/**
 * Modifies this mesh buffer by reversing the sign of normals it defines.
 * Has no effect if this mesh buffer doesn't define any normals.
 * All attributes with the semantic <code>NORMAL</code>,
 * regardless of semantic index, are affected.
 * @returns {H3DU.MeshBuffer} This object.
 * @example <caption>
 * The following code generates a two-sided mesh, where
 * the normals on each side face in the opposite direction.
 * This is only useful when drawing open geometric shapes, such as open
 * cylinders and two-dimensional planar shapes.
 * Due to the z-fighting effect, drawing a two-sided mesh is
 * recommended only if face culling is enabled.</caption>
 * var twoSidedMesh = originalMesh.merge(
 * new H3DU.MeshBuffer().merge(originalMesh)
 * .reverseWinding().reverseNormals()
 * );
 */
MeshBuffer.prototype.reverseNormals = function() {
  for(var i = 0; i < this.attributes.length; i++) {
    var attr = this.attributes[i];
    if(attr[0] !== H3DU.Semantic.NORMAL) {
      continue;
    }
    var value = [];
    var count = attr[2].count();
    for(var j = 0; j < count; j++) {
      attr[2].getVec(j, value);
      for(var k = 0; k < value.length; k++) {
        value[k] = -value[k];
      }
      attr[2].setVec(j, value);
    }
  }
  return this;
};
/**
 * Alias for the {@link H3DU.MeshBuffer#setColor} method
 * for compatibility.
 * @deprecated Use {@link H3DU.MeshBuffer#setColor} instead.
 */
MeshBuffer.prototype.setColor3 = function(color) {
  if(arguments.length === 3)return this.setColor([arguments[0], arguments[1], arguments[2]]);
  return this.setColor(color);
};
/**
 * Sets all the vertices in this mesh to the given color, by
 * assigning each value with the attribute semantic <code>COLOR</code>
 * to the given color. (If the attribute's [count per value]{@link H3DU.BufferAccessor#countPerValue}
 * is less than 4, each such value will be set to as many elements of the converted 4-element
 * color as possible.) If an attribute with the semantic <code>COLOR</code>
 * doesn't exist, an attribute with the semantic <code>COLOR_0</code> and a count per
 * value of 3 is created.<p>
 * All attributes with the semantic <code>COLOR</code>,
 * regardless of semantic index, are affected by this method.
 * @param {Array<number>|number|string} color A [color vector or string]{@link H3DU.toGLColor}
 * identifying the color to set. This will be converted to a 4-element color.
 * @returns {H3DU.MeshBuffer} This object.
 */
MeshBuffer.prototype.setColor = function(color) {
  var colorValue = H3DU.toGLColor(color);
  var haveColor = false;
  for(var i = 0; i < this.attributes.length; i++) {
    var attr = this.attributes[i];
    var count = attr[2].count();
    if(attr[0] !== H3DU.Semantic.COLOR) {
      continue;
    }
    haveColor = true;
    for(var j = 0; j < count; j++) {
      attr[2].setVec(j, colorValue);
    }
  }
  if(!haveColor) {
    this._ensureAttribute(H3DU.Semantic.COLOR, 0, 3);
    return this.setColor(colorValue);
  }
  return this;
};

/**
 * Reverses the winding order of the triangles in this mesh buffer
 * by swapping the second and third vertex indices of each one.
 * Has an effect only if this mesh buffer consists of triangles.
 * @returns {H3DU.MeshBuffer} This object.
 * @example <caption>
 * The following code generates a mesh that survives face culling,
 * since the same triangles occur on each side of the mesh, but
 * with different winding orders. This is useful when enabling
 * This is only useful when drawing open geometric shapes, such as open
 * cylinders and two-dimensional planar shapes.
 * Due to the z-fighting effect, drawing this kind of mesh is
 * recommended only if face culling is enabled.</caption>
 * var frontBackMesh = originalMesh.merge(
 * new H3DU.MeshBuffer().merge(originalMesh).reverseWinding()
 * );
 */
MeshBuffer.prototype.reverseWinding = function() {
  if(this.primitiveType() === H3DU.MeshBuffer.TRIANGLES) {
    this._ensureIndices();
    for(var i = 0; i + 2 < this.indices.length; i += 3) {
      var tmp = this.indices[i + 1];
      this.indices[i + 1] = this.indices[i + 2];
      this.indices[i + 2] = tmp;
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
  var normalsCount = normals.count();
  var count = Math.min(positions.count(), normalsCount);
  var v1 = [0, 0, 0];
  var v2 = [0, 0, 0];
  var v3 = [0, 0, 0];
  var normal = [0, 0, 0];
  for(i = 0; i < count; i++) {
    // Set normal to 0
    normals.setVec(i, v1);
    if(!flat) {
      // If non-flat shading is requested, find all vertices with
      // duplicate vertex positions
      var uv = positions.getVec(i, []);
      if(uniqueVertices[uv])uniqueVertices[uv].push(i);
      else uniqueVertices[uv] = [i];
    }
  }
  for(i = 0; i < indices.length; i += 3) {
    v1 = positions.getVec(indices[i], v1);
    v2 = positions.getVec(indices[i + 1], v2);
    v3 = positions.getVec(indices[i + 2], v3);
    var n1 = H3DU.Math.vec3sub(v1, v3);
    var n2 = H3DU.Math.vec3sub(v2, v3);
    // cross multiply n1 and n2
    var n1xn2 = H3DU.Math.vec3cross(n1, n2);
    H3DU.Math.vec3normalizeInPlace(n1xn2);
    H3DU.Math.vec3scaleInPlace(n1xn2, normDir);
    // add normalized normal to each vertex of the face
    normals.getVec(indices[i], v1);
    normals.getVec(indices[i + 1], v2);
    normals.getVec(indices[i + 2], v3);
    H3DU.Math.vec3addInPlace(v1, n1xn2);
    H3DU.Math.vec3addInPlace(v2, n1xn2);
    H3DU.Math.vec3addInPlace(v3, n1xn2);
    normals.setVec(indices[i], v1);
    normals.setVec(indices[i + 1], v2);
    normals.setVec(indices[i + 2], v3);
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
          normals.getVec(v0, normal);
          var avg = [normal[0], normal[1], normal[2]];
          dupverts[0] = normal[0];
          dupverts[1] = normal[1];
          dupverts[2] = normal[2];
          dupvertcount = 3;
          for(i = 1; i < v.length; i++) {
            var dupfound = false;
            positions.getVec(v[i], normal);
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
            normals.setVec(v[i], avg);
          }
        }
      }
    }
  }
  // Normalize each normal of the vertex
  for(i = 0; i < normalsCount; i++) {
    normals.getVec(i, normal);
    H3DU.Math.vec3normalize(normal);
    normals.setVec(i, normal);
  }
};

/** @ignore */
MeshBuffer._recalcTangentsInternal = function(positions, normals, texCoords, tangents, bitangents, indices) {
  var v1 = [0, 0, 0];
  var v2 = [0, 0, 0];
  var v3 = [0, 0, 0];
  for(var i = 0; i < indices.length; i += 3) {
    v1 = positions.getVec(indices[i], v1);
    v2 = positions.getVec(indices[i + 1], v2);
    v3 = positions.getVec(indices[i + 2], v3);
    // Find the tangent and bitangent
    var ret;
    var t1 = v2[0] - v1[0];
    var t2 = v2[1] - v1[1];
    var t3 = v2[2] - v1[2];
    var t4 = v3[0] - v1[0];
    var t5 = v3[1] - v1[1];
    var t6 = v3[2] - v1[2];
    v1 = texCoords.getVec(indices[i], v1);
    v2 = texCoords.getVec(indices[i + 1], v2);
    v3 = texCoords.getVec(indices[i + 2], v3);
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
    // (where A and B are the tangent and bitangent in the "ret" variable above)
    // as the tangent space transformation, that is, include three
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
      v1 = normals.getVec(indices[i + j], v1);
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
      tangents.setVec(indices[i + j], tangent);
      bitangents.setVec(indices[i + j], bitangent);
    }
  }
};
/** @ignore */
MeshBuffer.prototype._ensureIndices = function() {
  if(typeof this.indices === "undefined" || this.indices === null) {
    this.indices = BufferAccessor.makeIndices(this.vertexCount());
  }
};

/** @ignore */
MeshBuffer.prototype._makeRedundant = function() {
  this._ensureIndices();
  var newAttributes = [];
  for(var i = 0; i < this.attributes.length; i++) {
    var a = this.attributes[i];
    newAttributes.push([a[0], a[1], BufferAccessor.merge(a[2], this.indices, null, [])]);
  }
  this.attributes = newAttributes;
  this.setIndices(BufferAccessor.makeIndices(this.indices.length));
};
/** @ignore */
MeshBuffer.prototype._ensureAttribute = function(semantic, semanticIndex, desiredCount) {
  var attr = this.getAttribute(semantic, semanticIndex);
  var vertexCount = this.attributes.length === 0 ? 0 : this.attributes[0][2].count();
  var attrCount = typeof attr !== "undefined" && attr !== null ? attr.countPerValue : 0;
  if(attr && attrCount >= desiredCount)
    return attr;
  var newattr = BufferAccessor.makeBlank(vertexCount, desiredCount);
  if(attrCount > 0) {
    var vec = _MathInternal.vecZeros(desiredCount);
    for(var i = 0; i < vertexCount; i++) {
      attr.getVec(i, vec);
      newattr.setVec(i, vec);
    }
  }
  this.attributes.push([semantic, semanticIndex, newattr]);
  return newattr;
};
/** @ignore */
MeshBuffer.prototype._countPerValue = function(sem) {
  var a = this.getAttribute(sem);
  return typeof a !== "undefined" && a !== null ? a.countPerValue : 0;
};

/**
 * Recalculates the normal vectors for triangles
 * in this mesh. For this to properly affect shading, each triangle in
 * the mesh must have its vertices defined in
 * counterclockwise order (if the triangle is being rendered
 * in a right-handed coordinate system). Each normal calculated will
 * be normalized to have a length of 1 (unless the normal is (0,0,0)),
 * and will be stored in an attribute with semantic <code>NORMAL_0</code>.
 * Will have an effect only if the buffer includes an attribute with
 * semantic <code>POSITION_0</code> and each of that attribute's values is at least 3 elements
 * long. If the buffer already includes an attribute with semantic <code>NORMAL_0</code>,
 * ensures its values are each at least 3 elements long.
 * @param {Boolean} flat If true, each triangle in the mesh
 * will have the same normal, which usually leads to a flat
 * appearance. If false, each unique vertex in the mesh
 * will have its own normal, which usually leads to a smooth
 * appearance.
 * @param {Boolean} inward If true, the generated normals
 * will point inward; otherwise, outward.
 * @returns {H3DU.MeshBuffer} This object.
 */
MeshBuffer.prototype.recalcNormals = function(flat, inward) {
  var primtype = this.primitiveType();
  if(primtype === H3DU.MeshBuffer.TRIANGLES) {
    if(this._countPerValue(H3DU.Semantic.POSITION) < 3) {
      return this;
    }
    this._makeRedundant();
    var positions = this.getAttribute(H3DU.Semantic.POSITION);
    var normals = this._ensureAttribute(H3DU.Semantic.NORMAL, 0, 3);
    // NOTE: Indices ensured by makeRedundant
    MeshBuffer._recalcNormals(positions, normals, this.indices, flat, inward);
  }
  return this;
};
/** @ignore */
MeshBuffer.prototype._recalcTangents = function() {
  if(this.primitiveType() === H3DU.MeshBuffer.TRIANGLES) {
    if(this._countPerValue(H3DU.Semantic.POSITION) < 3 ||
  this._countPerValue(H3DU.Semantic.NORMAL) < 3 ||
        this._countPerValue(H3DU.Semantic.TEXCOORD) < 2) {
      return this;
    }
    this._makeRedundant();
    var positions = this.getAttribute(H3DU.Semantic.POSITION);
    var normals = this.getAttribute(H3DU.Semantic.NORMAL);
    var texCoords = this.getAttribute(H3DU.Semantic.TEXCOORD);
    var tangents = this._ensureAttribute(H3DU.Semantic.TANGENT, 0, 3);
    var bitangents = this._ensureAttribute(H3DU.Semantic.BITANGENT, 0, 3);
    // NOTE: Indices ensured by makeRedundant
    MeshBuffer._recalcTangentsInternal(positions, normals, texCoords,
      tangents, bitangents, this.indices);
  }
  return this;
};

/**
 * Merges the vertices from another mesh into this one.
 * The vertices from the other mesh will be copied into this one,
 * and the other mesh's indices copied or adapted.
 * @param {H3DU.MeshBuffer} other A mesh to merge into this one. The mesh
 * given in this parameter will remain unchanged.
 * Throws an error if this mesh's primitive type is not the same as
 * the other mesh's primitive type.
 * @returns {H3DU.MeshBuffer} This object.
 * @example
 * var copiedMesh = new H3DU.MeshBuffer().merge(meshToCopy);
 */
MeshBuffer.prototype.merge = function(other) {
  var newAttributes = [];
  var attr;
  if(!other)throw new Error();
  if(other.indices.length === 0) {
    // Nothing to merge into this one, just return
    return this;
  } else if(this.indices && this.indices.length === 0) {
    var empty = true;
    for(var i = 0; i < this.attributes.length; i++) {
      attr = this.attributes[i][2];
      empty = empty && (typeof attr === "undefined" || attr === null || attr.count() === 0);
    }
    if(empty) {
      // If this object is empty, copy the attributes and
      // indices from the other object
      for(i = 0; i < other.attributes.length; i++) {
        var o = other.attributes[i];
        newAttributes.push([o[0], o[1], o[2].copy()]);
      }
      this._bounds = null;
      this.format = other.format;
      this.attributes = newAttributes;
      // NOTE: Copies the index buffer
      if(typeof other.indices === "undefined" || other.indices === null) {
        this.indices = null;
        this._ensureIndices();
      } else {
        this.setIndices(other.indices.slice(0, other.indices.length));
      }
      return this;
    }
  }
  if(this.format !== other.format) {
    // Primitive types are different
    throw new Error();
  }
  this._ensureIndices();
  other._ensureIndices();
  for(i = 0; i < this.attributes.length; i++) {
    var existingAttribute = null;
    var newAttribute = null;
    attr = this.attributes[i];
    var sem = attr[0];
    var semIndex = attr[1];
    for(var j = 0; j < other.attributes.length; j++) {
      var oattr = other.attributes[j];
      if(oattr[0] === sem && oattr[1] === semIndex) {
        existingAttribute = oattr[2];
        break;
      }
    }
    newAttribute = BufferAccessor.merge(attr[2], this.indices, existingAttribute, other.indices);
    if(!newAttribute)throw new Error();
    newAttributes.push([sem, semIndex, newAttribute]);
  }
  for(i = 0; i < other.attributes.length; i++) {
    existingAttribute = null;
    oattr = other.attributes[i];
    for(j = 0; j < this.attributes.length; j++) {
      attr = this.attributes[j];
      if(oattr[0] === attr[0] && oattr[1] === attr[1]) {
        existingAttribute = attr;
        break;
      }
    }
    if(typeof existingAttribute === "undefined" || existingAttribute === null) {
      newAttribute = BufferAccessor.merge(null, this.indices, oattr[2], other.indices);
      if(!newAttribute)throw new Error();
      newAttributes.push([oattr[0], oattr[1], newAttribute]);
    }
  }
  var newIndices = BufferAccessor.makeIndices(this.indices.length + other.indices.length);
  this._bounds = null;
  this.attributes = newAttributes;
  this.setIndices(newIndices);
  return this;
};

/**
 * Transforms the positions and normals of all the vertices currently
 * in this mesh. Only values with the attribute semantic <code>POSITION_0</code>
 * or <code>NORMAL_0</code> will be affected by this method; values of
 * other attributes will be unaffected.
 * @param {Array<number>} matrix A 4x4 matrix described in
 * the {@link H3DU.Math.mat4projectVec3} method. The normals will be transformed using the
 * 3x3 inverse transpose of this matrix (see {@link H3DU.Math.mat4inverseTranspose3}).
 * (Normals need to be transformed specially because they describe directions, not points.)
 * @returns {H3DU.MeshBuffer} This object.
 */
MeshBuffer.prototype.transform = function(matrix) {
  var positionAttribute = this.getAttribute(H3DU.Semantic.POSITION);
  if(!positionAttribute) {
    return this;
  }
  var normalAttribute = this.getAttribute(H3DU.Semantic.NORMAL);
  var isLinearIdentity = !(matrix[0] === 1 && matrix[1] === 0 &&
    matrix[2] === 0 && matrix[4] === 0 && matrix[5] === 1 &&
    matrix[6] === 0 && matrix[8] === 0 && matrix[9] === 0 && matrix[10] === 1);
  var matrixForNormals = null;
  if(typeof normalAttribute !== "undefined" && normalAttribute !== null && isLinearIdentity) {
    matrixForNormals = H3DU.Math.mat4inverseTranspose3(matrix);
  }
  var count = positionAttribute.count();
  if(normalAttribute)count = Math.min(count, normalAttribute.count());
  var position = [0, 0, 0];
  var normal = [0, 0, 0];
  for(var i = 0; i < count; i++) {
    positionAttribute.getVec(i, position);
    var xform = H3DU.Math.mat4projectVec3(matrix,
      position[0], position[1], position[2]);
    positionAttribute.setVec(i, xform);
    if(normalAttribute && isLinearIdentity && (typeof matrixForNormals !== "undefined" && matrixForNormals !== null)) {
      // Transform and normalize the normals
      // (using a modified matrix) to ensure
      // they point in the correct direction
      normalAttribute.getVec(i, normal);
      xform = H3DU.Math.mat3transform(matrixForNormals,
        normal[0], normal[1], normal[2]);
      H3DU.Math.vec3normalizeInPlace(xform);
      normalAttribute.setVec(i, xform);
    }
  }
  this._bounds = null;
  return this;
};
// Adds a line only if it doesn't exist
MeshBuffer._addLine = function(lineIndices, existingLines, f1, f2) {
  // Ensure ordering of the indices
  if(f1 < f2) {
    var tmp = f1; f1 = f2; f2 = tmp;
  }
  var e = existingLines[f1];
  if(e) {
    if(e.indexOf(f2) < 0) {
      e.push(f2);
      lineIndices.push(f1, f2);
    }
  } else {
    existingLines[f1] = [f2];
    lineIndices.push(f1, f2);
  }
};

/**
 * Creates a new mesh with triangles converted
 * to line segments.
 * @deprecated Included here for compatibility with {@link H3DU.Mesh}.
 * Use {@link H3DU.MeshBuffer.wireFrame} instead.
 * @returns {H3DU.MeshBuffer} A new mesh with triangles converted
 * to lines.
 */
MeshBuffer.prototype.toWireFrame = function() {
  return new MeshBuffer().merge(this).wireFrame();
};

/**
 * Converts the triangles in this mesh to line segments.
 * Has no effect if this mesh doesn't use triangles as primitives.
 * @returns {H3DU.MeshBuffer} This object.
 */
MeshBuffer.prototype.wireFrame = function() {
  if(this.primitiveType() !== H3DU.MeshBuffer.TRIANGLES) {
    // Not a triangle mesh
    return this;
  }
  var lineIndices = [];
  var existingLines = {};
  var primitive = [];
  var primcount = this.primitiveCount();
  for(var i = 0; i < primcount; i++) {
    this.vertexIndices(i, primitive);
    var f1 = primitive[0];
    var f2 = primitive[1];
    var f3 = primitive[2];
    MeshBuffer._addLine(lineIndices, existingLines, f1, f2);
    MeshBuffer._addLine(lineIndices, existingLines, f2, f3);
    MeshBuffer._addLine(lineIndices, existingLines, f3, f1);
  }
  return this.setIndices(lineIndices)
    .setPrimitiveType(H3DU.MeshBuffer.LINES);
};
/**
 * Finds the tightest
 * bounding box that holds all vertices in the mesh buffer.
 * Only positions with attribute semantic <code>POSITION</code> are
 * used in the bounding box calculation.
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
    var primcount = this.primitiveCount();
    for(var j = 0; j < primcount; j++) {
      this.vertexIndices(j, indices);
      var primitive = [];
      for(var k = 0; k < indices.length; k++) {
        var v = posattr.getVec(indices[k], vec);
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
 * @returns {number} Either {@link H3DU.MeshBuffer.TRIANGLES},
 * {@link H3DU.MeshBuffer.LINES}, or {@link H3DU.MeshBuffer.POINTS}.
 */
MeshBuffer.prototype.primitiveType = function() {
  return this.format;
};
/**
 * Gets the number of vertices in this mesh buffer, that
 * is, the number of vertex indices in its index buffer (some of which
 * may be duplicates), or if there is no index buffer, the maximum
 * number of items that a buffer attribute can hold.
 * @returns {number} Return value.
 */
MeshBuffer.prototype.vertexCount = function() {
  if(typeof this.indices === "undefined" || this.indices === null) {
    var mincount = 0;
    for(var i = 0; i < this.attributes.length; i++) {
      var a = this.attributes[i];
      if(i === 0 || a.count() < mincount)mincount = a.count();
    }
    return mincount;
  } else {
    return this.indices.length;
  }
};

/** @ignore */
MeshBuffer._resolveSemantic = function(name, index) {
  if(typeof name === "number") {
    return [name, index | 0];
  } else {
    var wka = MeshBuffer._wellKnownAttributes[name];
    if(typeof wka === "undefined" || wka === null) {
      var io = name.indexOf("_");
      if(io < 0) {
        return null;
      }
      wka = MeshBuffer._wellKnownAttributes[name.substr(0, io)];
      if(typeof wka === "undefined" || wka === null) {
        return null;
      }
      var number = name.substr(io + 1);
      if(number.length <= 5 && (/^\d$/).test(number)) {
        // Only allow 5-digit-or-less numbers; more than
        // that is unreasonable
        return [wka, parseInt(number, 10)];
      } else {
        return null;
      }
    } else {
      return [wka, 0];
    }
  }
};

MeshBuffer.LINES = 1;
MeshBuffer.TRIANGLES = 4;
MeshBuffer.POINTS = 0;

MeshBuffer._wellKnownAttributes = {
  "POSITION":0,
  "TEXCOORD":2,
  "TEXCOORD_0":2,
  "NORMAL":1,
  "COLOR":3,
  "JOINT":4,
  "WEIGHT":5,
  "JOINTS":4,
  "WEIGHTS":5,
  "TANGENT":6,
  "BITANGENT":7
};

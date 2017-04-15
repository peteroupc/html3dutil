/*
 Any copyright to this file is released to the Public Domain.
 http://creativecommons.org/publicdomain/zero/1.0/
 If you like this, you should donate
 to Peter O. (original author of
 the Public Domain HTML 3D Library) at:
 http://peteroupc.github.io/
*/
/* global Float32Array, H3DU */

import {MeshBuffer} from "./h3du-meshbuffer";

/**
 * Specifies the triangles, lines, or points that make up a geometric shape.
 * Each vertex, that is, each point, each end of a line, and each corner
 * of a triangle, can also specify the following attributes:
 * <ul>
 * <li>A color, which is a set of 3 values each ranging from 0 to 1 (the red, green,
 * and blue components, respectively.)
 * <li>A normal vector, which is a set of 3 values.
 * Normal values are required for lighting to work properly.
 * <li>A tangent vector, which is a set of 3 values. (This is deprecated.)
 * <li>A bitangent vector, which is a set of 3 values. (This is deprecated.)
 * <li>Texture coordinates, which are a set of 2 values each ranging from 0 to
 * 1, where (0, 0) is the lower right corner of the texture (by default), and (1, 1) is the upper
 * right corner (by default).
 * </ul>
 * <p>Notes:<ul>
 * <li>Previous versions of this class allowed meshes to contain more than one
 * primitive type (triangles, lines, and points are the primitive types). This is
 * no longer the case, to simplify the implementation.<p>
 * <li>The default shader program assumes that all colors specified in this object are in
 * the [sRGB color space]{@link H3DU.Math.colorTosRGB}.
 * <li>Starting in version 2.0, this class should not be used as a general purpose
 * class for storing geometric meshes. It should only be used as a convenient
 * way to build mesh buffers. In the future, some of the functionality in this class
 * may be reimplemented in the MeshBuffer class and the corresponding methods
 * in this class may be rewritten by having them convert objects to a MeshBuffer and
 * call the new H3DU.MeshBuffer method; this may affect performance. Afterward,
 * or at that point, those methods may be deprecated.</li></ul>
 * @constructor
 * @memberof H3DU
 * @param {Array<number>} [vertices] An array that contains data on each
 * vertex of the mesh.
 * Each vertex is made up of the same number of elements, as defined in
 * format. May be null or omitted, in which case an empty vertex array is used.
 * @param {Array<number>} [indices] An array of vertex indices. Each trio of
 * indices specifies a separate triangle, or each pair of indices specifies
 * a line segment.
 * If null, undefined, or omitted, creates an initially empty mesh.
 * @param {number} [format] A set of bit flags depending on the kind of data
 * each vertex contains. Each vertex contains 3 elements plus:<ul>
 * <li> 3 more elements if Mesh.NORMALS_BIT is set, plus
 * <li> 3 more elements if Mesh.COLORS_BIT is set, plus
 * <li> 2 more elements if Mesh.TEXCOORDS_BIT is set, plus
 * <li> 3 more elements if Mesh.TANGENTS_BIT is set (deprecated), plus
 * <li> 3 more elements if Mesh.BITANGENTS_BIT is set (deprecated).
 * </ul>
 * If Mesh.LINES_BIT is set, each vertex index specifies a point of a line
 * segment. If Mesh.POINTS_BIT is set, each vertex index specifies an
 * individual point. Both bits can't be set.
 * May be null or omitted, in which case "format" is set to 0.
 */
export var Mesh = function(vertices, indices, format) {
  this._initialize(vertices, indices, format);
  this._elementsDefined = 0;
  this.currentMode = -1;
  this.normal = [0, 0, 0];
  this.color = [0, 0, 0];
  this.tangent = [0, 0, 0];
  this.bitangent = [0, 0, 0];
  this.texCoord = [0, 0];
};
/** @ignore */
Mesh._modeToPrimitiveType = function(mode) {
  if(mode === Mesh.LINES || mode === Mesh.LINE_STRIP)
    return Mesh.LINES;
  else if(mode === Mesh.POINTS)
    return Mesh.POINTS;
  else
  return Mesh.TRIANGLES;
};
/** @ignore */
Mesh._isCompatibleMode = function(oldMode, newMode) {
  return Mesh._modeToPrimitiveType(oldMode) === Mesh._modeToPrimitiveType(newMode);
};

/**
 * Changes the primitive mode for this mesh.
 * Future vertices will be drawn as primitives of the new type.
 * The primitive type can be set to the same mode, in which
 * case future vertices given will not build upon previous
 * vertices.<p>
 * An H3DU.Mesh object can contain primitives of different
 * types, such as triangles and lines. For example, it's allowed
 * to have a mesh with triangles, then call this method, say,
 * with <code>Mesh.LINE_STRIP</code> to add line segments
 * to that mesh. However, this functionality may be deprecated
 * in future versions.
 * @param {number} m A primitive type. One of the following:
 * Mesh.TRIANGLES, Mesh.LINES, Mesh.LINE_STRIP, Mesh.TRIANGLE_STRIP,
 * Mesh.TRIANGLE_FAN, Mesh.QUADS, Mesh.QUAD_STRIP.
 * Throws an error if the primitive type is incompatible with the
 * current primitive type (for example, a triangle type with LINE_STRIP).
 * @returns {H3DU.Mesh} This object.
 */
Mesh.prototype.mode = function(m) {
  if(m < 0)throw new Error("invalid mode");
  if(this.currentMode === -1) {
    var format = 0;
    var primtype = Mesh._modeToPrimitiveType(m);
    if(primtype === Mesh.LINES)
      format |= Mesh.LINES_BIT;
    else if(primtype === Mesh.POINTS)
      format |= Mesh.POINTS_BIT;
    this._initialize([], [], format);
    this.currentMode = m;
  } else if( !Mesh._isCompatibleMode(this.currentMode, m)) {
    throw new Error("Storing a different primitive mode in this mesh is no longer supported");
  } else {
    this.newPrimitive();
    this.currentMode = m;
  }
  return this;
};

 /**
  * Sets the current normal for this mesh. Future vertex positions
  * defined (with vertex3()) will have this normal. The new current
  * normal will apply to future vertices even if the current mode
  * is TRIANGLE_FAN and some vertices were already given for
  * that mode. The normal passed to this method will
  * not automatically be normalized to unit length.
  * @param {Array<number>|number} x X coordinate of the normal.
  *   If "y" and "z" are null or omitted, this is instead
  * a 3-element array giving the X, Y, and Z coordinates, or a single number
  * giving the coordinate for all three dimensions.
  * @param {number} [y] Y coordinate of the normal.
  * If "x" is an array, this parameter may be omitted.
  * @param {number} [z] Z coordinate of the normal.
  * If "x" is an array, this parameter may be omitted.
  * @returns {H3DU.Mesh} This object.
  */
Mesh.prototype.normal3 = function(x, y, z) {
  if(typeof x === "number" && typeof y === "number" && typeof z === "number") {
    this.normal[0] = x;
    this.normal[1] = y;
    this.normal[2] = z;
  } else {
    this.normal[0] = x[0];
    this.normal[1] = x[1];
    this.normal[2] = x[2];
  }
  this._elementsDefined |= Mesh.NORMALS_BIT;
  return this;
};

 /**
  * Sets the current color for this mesh. Future vertex positions
  * defined (with vertex3()) will have this color. The new current
  * color will apply to future vertices even if the current mode
  * is TRIANGLE_FAN and some vertices were already given for
  * that mode. Only the red, green, and blue components will be used.
  * @param {Array<number>|number|string} r A [color vector or string]{@link H3DU.toGLColor},
  * or the red color component (0-1).
  * @param {number} [g] Green color component (0-1).
  * May be null or omitted if a string or array is given as the "r" parameter.
  * @param {number} [b] Blue color component (0-1).
  * May be null or omitted if a string or array is given as the "r" parameter.
  * @returns {H3DU.Mesh} This object.
  */
Mesh.prototype.color3 = function(r, g, b) {
  if(typeof r === "string") {
    var c = H3DU.toGLColor(r);
    this.color[0] = c[0];
    this.color[1] = c[1];
    this.color[2] = c[2];
  } else if(typeof r === "number" && typeof g === "number" &&
   typeof b === "number") {
    this.color[0] = r;
    this.color[1] = g;
    this.color[2] = b;
  } else {
    this.color[0] = r[0];
    this.color[1] = r[1];
    this.color[2] = r[2];
  }
  this._elementsDefined |= Mesh.COLORS_BIT;
  return this;
};
 /**
  * Sets the current texture coordinates for this mesh. Future vertex positions
  * defined (with vertex3()) will have these texture coordinates.
  * The new current texture coordinates will apply to future vertices
  * even if the current mode
  * is TRIANGLE_FAN and some vertices were already given for
  * that mode.<p>
  * H3DU.Texture coordinates are a set of 2 values each ranging from 0 to
  * 1, where (0, 0) is the lower right corner of the texture (by default), and (1, 1) is the upper
  * right corner (by default).
  * @param {Array<number>|number} u X coordinate of the texture, from 0-1.
  *   If "v" are null or omitted, this is instead
  * a 2-element array giving the X and Y coordinates, or a single number
  * giving the coordinate for all three dimensions.
  * @param {number} [v] Y coordinate of the texture, from 0-1.
  * If "u" is an array, this parameter can be omitted.
  * @returns {H3DU.Mesh} This object.
  */
Mesh.prototype.texCoord2 = function(u, v) {
  if(typeof u === "number" && typeof v === "number") {
    this.texCoord[0] = u;
    this.texCoord[1] = v;
  } else {
    this.texCoord[0] = u[0];
    this.texCoord[1] = u[1];
  }
  this._elementsDefined |= Mesh.TEXCOORDS_BIT;
  return this;
};
 /**
  * Adds a new vertex to this mesh. If appropriate, adds an
  * additional face index according to this mesh's current mode.
  * The vertex will adopt this mesh's current normal, color,
  * and texture coordinates if they have been defined.
  * @param {Array<number>|number} x The X coordinate.
  *   If "y" and "z" are null or omitted, this is instead
  * a 3-element array giving the X, Y, and Z coordinates, or a single number
  * giving the coordinate for all three dimensions.
  * @param {number} [y] The Y coordinate.
  * If "x" is an array, this parameter may be omitted.
  * @param {number} [z] The Z coordinate.
  * If "x" is an array, this parameter may be omitted.
  * @returns {H3DU.Mesh} This object.
  */
Mesh.prototype.vertex3 = function(x, y, z) {
  if(typeof x !== "undefined" && x !== null && (typeof y === "undefined" || y === null) && (typeof z === "undefined" || z === null)) {
    if(typeof x !== "number")
      this._vertex3(x[0], x[1], x[2]);
    else
    this._vertex3(x, x, x);
  } else {
    this._vertex3(x, y, z);
  }
  return this;
};
 /**
  * Adds a new vertex to this mesh. The Z coordinate will
  * be treated as 0.
  * @param {Array<number>|number} x The X coordinate.
  * If "y" is null, undefined, or omitted, this is instead
  * a 3-element array giving the X, Y, and Z coordinates, or a single number
  * giving the coordinate for all three dimensions.
  * @param {number} y The Y coordinate.
  * If "x" is an array, this parameter may be omitted.
  * @returns {H3DU.Mesh} This object.
  */
Mesh.prototype.vertex2 = function(x, y) {
  if(typeof x !== "undefined" && x !== null && (typeof y === "undefined" || y === null)) {
    if(typeof x !== "number")
      return this.vertex3(x[0], x[1], 0.0);
    else
    return this.vertex3(x, x, 0.0);
  } else {
    return this.vertex3(x, y, 0.0);
  }
};

/**
 * Sets the X, Y, and Z coordinates of the vertex with the
 * given index. Has no effect if the index is less than 0 or
 * equals the number of vertices in this mesh or greater.
 * @param {number} index Zero-based index of
 * the vertex to set.
 * The index ranges from 0 to less than
 * the number of vertices in the mesh, not the
 * number of vertex indices.
 * @param {number|Array<number>} x X coordinate of the vertex position.
 * Can also be a 3-element array giving
 * the X, Y, and Z coordinates, respectively, of the vertex
 * position.
 * @param {number} y Y coordinate of the vertex position.
 * May be null or omitted if "x" is an array.
 * @param {number} z Z coordinate of the vertex position.
 * May be null or omitted if "x" is an array.
 * @returns {H3DU.Mesh} This object.
 */
Mesh.prototype.setVertex = function(index, x, y, z) {
  if(index < 0)return this;
  if(typeof y === "undefined" && typeof z === "undefined") {
    y = x[1];
    z = x[2];
    x = x[0];
  }
  var c = this.vertexCount();
  if(index < c) {
    index *= this.getStride();
    this.vertices[index] = x;
    this.vertices[index + 1] = y;
    this.vertices[index + 2] = z;
  }
  return this;
};
/**
 * Sets the normal associated with the vertex with the
 * given index. Has no effect if the index is less than 0 or
 * equals the number of vertices in this mesh or greater.
 * @param {number} index Zero-based index of
 * the vertex to set.
 * The index ranges from 0 to less than
 * the number of vertices in the mesh, not the
 * number of vertex indices.
 * @param {number|Array<number>} x X coordinate of the vertex normal.
 * Can also be a 3-element array giving
 * the X, Y, and Z coordinates, respectively, of the vertex
 * normal.
 * @param {number} y Y coordinate of the vertex normal.
 * May be null or omitted if "x" is an array.
 * @param {number} z Z coordinate of the vertex normal.
 * May be null or omitted if "x" is an array.
 * @returns {H3DU.Mesh} This object.
 */
Mesh.prototype.setVertexNormal = function(index, x, y, z) {
  if(index < 0)return this;

  if(typeof y === "undefined" && typeof z === "undefined") {
    y = x[1];
    z = x[2];
    x = x[0];
  }
  var c = this.vertexCount();
  if(index < c) {
    this._rebuildVertices(Mesh.NORMALS_BIT);
    index *= this.getStride();
    index += Mesh._normalOffset(this.attributeBits);
    this.vertices[index] = x;
    this.vertices[index + 1] = y;
    this.vertices[index + 2] = z;
  }
  return this;
};

/**
 * Gets the position of the vertex with the given
 * index in this mesh.
 * @param {number} index Zero-based index of
 * the vertex to get.
 * The index ranges from 0 to less than
 * the number of vertices in the mesh, not the
 * number of vertex indices.
 * @returns {Array<number>} A 3-element array giving
 * the X, Y, and Z coordinates, respectively, of the vertex
 * position, or null if the index is less than 0 or
 * equals the number of vertices in this mesh or greater.
 */
Mesh.prototype.getVertex = function(index) {
  if(index < 0)return null;
  var c = this.vertexCount();
  if(index < c) {
    this._rebuildVertices(Mesh.NORMALS_BIT);
    index *= this.getStride();
    return this.vertices.slice(index, index + 3);
  }
  return null;
};
/**
 * Gets the normal of the vertex with the given
 * index in this mesh.
 * @param {number} index Zero-based index of
 * the vertex normal to get.
 * The index ranges from 0 to less than
 * the number of vertices in the mesh, not the
 * number of vertex indices.
 * @returns {Array<number>} A 3-element array giving
 * the X, Y, and Z coordinates, respectively, of the vertex
 * normal, or null if the index is less than 0 or
 * equals the number of vertices in this mesh or greater.
 * Returns (0,0,0) if the given vertex exists but doesn't define
 * a normal.
 */
Mesh.prototype.getVertexNormal = function(index) {
  var c = this.vertexCount();
  if(index < c) {
    this._rebuildVertices(Mesh.NORMALS_BIT);
    index *= this.getStride();
    index += Mesh._normalOffset(this.attributeBits);
    return this.vertices.slice(index, index + 3);
  }
  return null;
};

 /**
  * Gets the number of vertices included in this mesh.
  * @returns {number} Return value.
  */
Mesh.prototype.vertexCount = function() {
  return this.vertices.length / this.getStride();
};
/** @ignore */
Mesh._initVertices = function(vertices, format) {
  if((format & (Mesh.TANGENTS_BIT | Mesh.BITANGENTS_BIT)) === 0) {
    // Simple case: no tangents or bitangents
    return vertices;
  }
  var stride = Mesh._getStride(format);
  var arrayStride = stride;
  if((format & Mesh.TANGENTS_BIT) !== 0) {
    arrayStride += 3;
  }
  if((format & Mesh.BITANGENTS_BIT) !== 0) {
    arrayStride += 3;
  }
  var ret = [];
  for(var i = 0; i < vertices.length; i += arrayStride) {
    for(var j = 0; j < stride; j++) {
      ret.push(vertices[i + j]);
    }
  }
  return ret;
};
/** @ignore */
Mesh._initTangents = function(vertices, format) {
  if((format & (Mesh.TANGENTS_BIT | Mesh.BITANGENTS_BIT)) === 0) {
    // Simple case: no tangents or bitangents
    return [];
  }
  var stride = Mesh._getStride(format);
  var arrayStride = stride;
  if((format & Mesh.TANGENTS_BIT) !== 0) {
    arrayStride += 3;
  }
  if((format & Mesh.BITANGENTS_BIT) !== 0) {
    arrayStride += 3;
  }
  var ret = [];
  for(var i = 0; i < vertices.length; i += arrayStride) {
    var t1 = 0;
    var t2 = 0;
    var t3 = 0;
    var t4 = 0;
    var t5 = 0;
    var t6 = 0;
    var idx = i + stride;
    if((format & Mesh.TANGENTS_BIT) !== 0) {
      t1 = vertices[idx];
      t2 = vertices[idx + 1];
      t3 = vertices[idx + 2];
      idx += 3;
    }
    if((format & Mesh.BITANGENTS_BIT) !== 0) {
      t4 = vertices[idx];
      t5 = vertices[idx + 1];
      t6 = vertices[idx + 2];
    }
    ret.push(t1, t2, t3, t4, t5, t6);
  }
  return ret;
};
/** @ignore */
Mesh.prototype._initialize = function(vertices, faces, format) {
  this.attributeBits = typeof format === "undefined" || format === null ? 0 : format;
  var verts = vertices || [];
  this.vertices = Mesh._initVertices(verts, this.attributeBits);
  this.indices = faces || [];
  this.tangents = Mesh._initTangents(verts, this.attributeBits);
  this.startIndex = 0;
  this.primitiveData = [0, 0, 0, 0];
  this.primitiveIndex = 0;
  this.primitiveOdd = false;
  var prim = format & Mesh.PRIMITIVES_BITS;
  if(prim !== 0 && prim !== Mesh.LINES_BIT && prim !== Mesh.POINTS_BIT) {
    throw new Error("invalid format");
  }
/** @ignore */
  this.getStride = function() {
    return Mesh._getStride(this.attributeBits);
  };
 /** @ignore */
  this.newPrimitive = function() {
    this.primitiveIndex = 0;
    this.primitiveOdd = false;
    return this;
  };
  this.primitiveType = function() {
    var primitive = Mesh.TRIANGLES;
    if((this.attributeBits & Mesh.LINES_BIT) !== 0)primitive = Mesh.LINES;
    if((this.attributeBits & Mesh.POINTS_BIT) !== 0)primitive = Mesh.POINTS;
    return primitive;
  };
 /** @ignore */
  this._rebuildVertices = function(newAttributes) {
    var oldBits = this.attributeBits;
    var newBits = oldBits | newAttributes & Mesh.ATTRIBUTES_BITS;
    if(newBits === oldBits)return;
    var currentStride = this.getStride();
    var x, y, z;
  // Rebuild the list of vertices if a new kind of
  // attribute is added to the mesh
    var newVertices = [];
    var newTangents = [];
    for(var i = 0; i < this.vertices.length; i += currentStride) {
      var vx = this.vertices[i];
      var vy = this.vertices[i + 1];
      var vz = this.vertices[i + 2];
      var s = i + 3;
      newVertices.push(vx, vy, vz);
      if((newBits & Mesh.NORMALS_BIT) !== 0) {
        if((oldBits & Mesh.NORMALS_BIT) !== 0) {
          x = this.vertices[s];
          y = this.vertices[s + 1];
          z = this.vertices[s + 2];
          s += 3;
          newVertices.push(x, y, z);
        } else {
          newVertices.push(0, 0, 0);
        }
      }
      if((newBits & Mesh.COLORS_BIT) !== 0) {
        if((oldBits & Mesh.COLORS_BIT) === 0) {
          newVertices.push(0, 0, 0);
        } else {
          var r = this.vertices[s];
          var g = this.vertices[s + 1];
          var b = this.vertices[s + 2];
          s += 3;
          newVertices.push(r, g, b);
        }
      }
      if((newBits & Mesh.TEXCOORDS_BIT) !== 0) {
        if((oldBits & Mesh.TEXCOORDS_BIT) === 0) {
          newVertices.push(0, 0);
        } else {
          var u = this.vertices[s];
          var v = this.vertices[s + 1];
          s += 2;
          newVertices.push(u, v);
        }
      }
      if((newBits & (Mesh.TANGENTS_BIT | Mesh.BITANGENTS_BIT)) !== 0) {
        if((oldBits & (Mesh.TANGENTS_BIT | Mesh.BITANGENTS_BIT)) === 0) {
          newTangents.push(0, 0, 0, 0, 0, 0);
        } else {
          x = this.tangents[s];
          y = this.tangents[s + 1];
          z = this.tangents[s + 2];
          newTangents.push(x, y, z);
          x = this.tangents[s + 3];
          y = this.tangents[s + 4];
          z = this.tangents[s + 5];
          newTangents.push(x, y, z);
        }
      }
    }
    this.vertices = newVertices;
    this.tangents = newTangents;
    this.attributeBits = newBits;
  };
  this._setTriangle = function(vertexStartIndex, stride, i1, i2, i3) {
    this.indices.push(i1, i2, i3);

  };
  this._vertex3 = function(x, y, z) {
    var currentMode = this.currentMode;
    if(currentMode === -1)throw new Error("mode() not called");
    this._rebuildVertices(this._elementsDefined);
    var vertexStartIndex = this.vertices.length;
    this.vertices.push(x, y, z);
    if((this.attributeBits & Mesh.NORMALS_BIT) !== 0) {
      this.vertices.push(this.normal[0], this.normal[1], this.normal[2]);
    }
    if((this.attributeBits & Mesh.COLORS_BIT) !== 0) {
      this.vertices.push(this.color[0], this.color[1], this.color[2]);
    }
    if((this.attributeBits & Mesh.TEXCOORDS_BIT) !== 0) {
      this.vertices.push(this.texCoord[0], this.texCoord[1]);
    }
    if((this.attributeBits & (Mesh.TANGENTS_BIT | Mesh.BITANGENTS_BIT)) !== 0) {
      this.tangents.push(this.tangent[0], this.tangent[1], this.tangent[2]);
      this.tangents.push(this.bitangent[0], this.bitangent[1], this.bitangent[2]);
    }
    var stride = this.getStride();
    var vertexIndex = vertexStartIndex / stride;
    if(Math.floor(vertexIndex) !== vertexIndex)throw new Error();
    this.primitiveData[this.primitiveIndex] = vertexIndex;
    this.primitiveIndex++;

    if(currentMode === Mesh.QUAD_STRIP && this.primitiveIndex >= 4) {
      this._setTriangle(vertexStartIndex, stride, this.primitiveData[0],
       this.primitiveData[1], this.primitiveData[2]);
      this._setTriangle(vertexStartIndex, stride, this.primitiveData[2],
       this.primitiveData[1], this.primitiveData[3]);
      this.primitiveData[0] = this.primitiveData[2];
      this.primitiveData[1] = this.primitiveData[3];
      this.primitiveIndex -= 2;
    } else if(currentMode === Mesh.QUADS && this.primitiveIndex >= 4) {
      this._setTriangle(vertexStartIndex, stride, this.primitiveData[0],
       this.primitiveData[1], this.primitiveData[2]);
      this._setTriangle(vertexStartIndex, stride, this.primitiveData[0],
       this.primitiveData[2], this.primitiveData[3]);
      this.primitiveIndex -= 4;
    } else if(currentMode === Mesh.TRIANGLES && this.primitiveIndex >= 3) {
      this._setTriangle(vertexStartIndex, stride, this.primitiveData[0],
       this.primitiveData[1], this.primitiveData[2]);
      this.primitiveIndex -= 3;
    } else if(currentMode === Mesh.LINES && this.primitiveIndex >= 2) {
      this.indices.push(this.primitiveData[0], this.primitiveData[1]);
      this.primitiveIndex -= 2;
    } else if(currentMode === Mesh.TRIANGLE_FAN && this.primitiveIndex >= 3) {
      this._setTriangle(vertexStartIndex, stride, this.primitiveData[0],
       this.primitiveData[1], this.primitiveData[2]);
      this.primitiveData[1] = this.primitiveData[2];
      this.primitiveIndex -= 1;
    } else if(currentMode === Mesh.LINE_STRIP && this.primitiveIndex >= 2) {
      this.indices.push(this.primitiveData[0], this.primitiveData[1]);
      this.primitiveData[0] = this.primitiveData[1];
      this.primitiveIndex--;
    } else if(currentMode === Mesh.POINTS) {
      this.indices.push(this.primitiveData[0]);
      this.primitiveIndex--;
    } else if(currentMode === Mesh.TRIANGLE_STRIP && this.primitiveIndex >= 3) {
      if(this.primitiveOdd) {
        this._setTriangle(vertexStartIndex, stride, this.primitiveData[1],
         this.primitiveData[0], this.primitiveData[2]);
      } else {
        this._setTriangle(vertexStartIndex, stride, this.primitiveData[0],
       this.primitiveData[1], this.primitiveData[2]);
      }
      this.primitiveData[0] = this.primitiveData[1];
      this.primitiveData[1] = this.primitiveData[2];
      this.primitiveIndex--;
    }
    this.primitiveOdd = !this.primitiveOdd;
    return this;
  };
};

/**
 * Gets the number of primitives (triangles, lines,
 * or points) that this mesh contains.
 * @returns {number} Return value.
 */
Mesh.prototype.primitiveCount = function() {
  if((this.attributeBits & Mesh.LINES_BIT) !== 0)
    return Math.floor(this.indices.length / 2);
  if((this.attributeBits & Mesh.POINTS_BIT) !== 0)
    return this.indices.length;
  return Math.floor(this.indices.length / 3);
};
/**
 * Generates a mesh buffer from the information in this mesh object.
 * @returns {H3DU.MeshBuffer} The generated mesh buffer.
 */
Mesh.prototype.toMeshBuffer = function() {
  var mb = new MeshBuffer();
  mb.setIndices(this.indices);
  mb.setPrimitiveType(this.primitiveType());
  var stride = Mesh._getStride(this.attributeBits);
  var vertices = new Float32Array(this.vertices);
  mb.setAttribute(H3DU.Semantic.POSITION, 0, vertices, 0, 3, stride);
  var o = Mesh._normalOffset(this.attributeBits);
  if(o >= 0) {
    mb.setAttribute(H3DU.Semantic.NORMAL, 0, vertices, o, 3, stride);
  }
  o = Mesh._colorOffset(this.attributeBits);
  if(o >= 0) {
    mb.setAttribute(H3DU.Semantic.COLOR, 0, vertices, o, 3, stride);
  }
  o = Mesh._texCoordOffset(this.attributeBits);
  if(o >= 0) {
    mb.setAttribute(H3DU.Semantic.TEXCOORD, 0, vertices, o, 2, stride);
  }
  var tangents = new Float32Array(this.tangents);
  if((this.attributeBits & Mesh.TANGENTS_BIT) !== 0) {
    mb.setAttribute(H3DU.Semantic.TANGENT, 0, tangents, 0, 3, 3);
  }
  if((this.attributeBits & Mesh.BITANGENTS_BIT) !== 0) {
    mb.setAttribute(H3DU.Semantic.BITANGENT, 0, tangents, 3, 3, 3);
  }
  return mb;
};

/**
 * Enumerates the primitives (lines, triangles, and points) included
 * in this mesh.
 * @param {Function} func A function that will be called
 * for each primitive in the mesh. The function takes a single
 * parameter, consisting of an array of one, two, or three vertex
 * objects. A point will have one vertex, a line two vertices and
 * a triangle three. Each vertex object may have these properties:<ul>
 * <li>"position": A 3-element array of the vertex's position.
 * Always present.
 * <li>"normal": A 3-element array of the vertex's normal.
 * May be absent.
 * <li>"color": An at least 3-element array of the vertex's color.
 * Each component generally ranges from 0 to 1. May be absent.
 * <li>"uv": A 2-element array of the vertex's texture coordinates
 * (the first element is U, the second is V).
 * Each component generally ranges from 0 to 1. May be absent.
 * </ul>
 * @returns {H3DU.Mesh} This object.
 */
Mesh.prototype.enumPrimitives = function(func) {
  // LATER: Implement and favor MeshBuffer version of this method
  var prim = this.primitiveType();
  var normals = Mesh._normalOffset(this.attributeBits);
  var colors = Mesh._colorOffset(this.attributeBits);
  var texcoords = Mesh._texCoordOffset(this.attributeBits);
  var stride = this.getStride();
  var v = this.vertices;
  var primSize = 3;
  if(prim === Mesh.LINES)primSize = 2;
  if(prim === Mesh.POINTS)primSize = 1;
  for(var j = 0; j < this.indices.length; j += primSize) {
    var p = [];
    for(var k = 0; k < primSize; k++) {
      var vi = this.indices[j + k] * stride;
      var info = {};
      info.position = [v[vi], v[vi + 1], v[vi + 2]];
      if(normals >= 0)
        info.normal = [v[vi + normals], v[vi + normals + 1], v[vi + normals + 2]];
      if(colors >= 0)
        info.color = [v[vi + colors], v[vi + colors + 1], v[vi + colors + 2]];
      if(texcoords >= 0)
        info.uv = [v[vi + texcoords], v[vi + texcoords + 1]];
      p.push(info);
    }
    func(p);
  }
  return this;
};
/** @ignore */
Mesh.prototype._carryOver = function(mesh) {
  this.vertices = mesh.vertices;
  this.attributeBits = mesh.attributeBits;
  this.indices = mesh.indices;
  this.tangents = mesh.tangents;
  this.newPrimitive();
  return this;
};

/** @ignore */
Mesh._getStride = function(format) {
  var s = [3, 6, 6, 9, 5, 8, 8, 11][format & (Mesh.NORMALS_BIT | Mesh.COLORS_BIT | Mesh.TEXCOORDS_BIT)];
  return s;
};
/** @ignore */
Mesh._normalOffset = function(format) {
  return [-1, 3, -1, 3, -1, 3, -1, 3][format & (Mesh.NORMALS_BIT | Mesh.COLORS_BIT | Mesh.TEXCOORDS_BIT)];
};
/** @ignore */
Mesh._colorOffset = function(format) {
  return [-1, -1, 3, 6, -1, -1, 3, 6][format & (Mesh.NORMALS_BIT | Mesh.COLORS_BIT | Mesh.TEXCOORDS_BIT)];
};
/** @ignore */
Mesh._texCoordOffset = function(format) {
  return [-1, -1, -1, -1, 3, 6, 6, 9][format & (Mesh.NORMALS_BIT | Mesh.COLORS_BIT | Mesh.TEXCOORDS_BIT)];
};
/** @ignore */
Mesh.ATTRIBUTES_BITS = 255;
/** @ignore */
Mesh.PRIMITIVES_BITS = 768;
/** The mesh contains normals for each vertex.
 * @const
 * @default
 */
Mesh.NORMALS_BIT = 1;
/** The mesh contains colors for each vertex.
 * @const
 * @default
 */
Mesh.COLORS_BIT = 2;
/** The mesh contains texture coordinates for each vertex.
 * @const
 * @default
 */
Mesh.TEXCOORDS_BIT = 4;
/**
 * The mesh contains tangent vectors for each vertex.
 * @deprecated Deprecated because the default shader no longer
 * uses tangent and bitangent attributes for normal mapping. To define
 * tangent vectors for a mesh, use the {@link H3DU.MeshBuffer} class
 * and create a buffer attribute with the {@link H3DU.Semantics.TANGENT}
 * semantic.
 * @const
 * @default
 */
Mesh.TANGENTS_BIT = 8;
/**
 * The mesh contains bitangent vectors for each vertex.
 * @deprecated Deprecated because the default shader no longer
 * uses tangent and bitangent attributes for normal mapping. To define
 * bitangent vectors for a mesh, use the {@link H3DU.MeshBuffer} class
 * and create a buffer attribute with the {@link H3DU.Semantics.BITANGENT}
 * semantic.
 * @const
 * @default
 */
Mesh.BITANGENTS_BIT = 16;
/** The mesh consists of lines (2 vertices per line) instead
 * of triangles (3 vertices per line).
 * @const
 * @default
 */
Mesh.LINES_BIT = 256;
/** The mesh consists of points (1 vertex per line).
 * @const
 * @default
 */
Mesh.POINTS_BIT = 512;
/**
 * Primitive mode for rendering triangles, made up
 * of 3 vertices each.
 * @const
 * @default
 */
Mesh.TRIANGLES = 4;
/**
 * Primitive mode for rendering a strip of quadrilaterals (quads).
 * The first 4 vertices make up the first quad, and each additional
 * quad is made up of the last 2 vertices of the previous quad and
 * 2 new vertices. Each quad is broken into two triangles: the first
 * triangle consists of the first, second, and third vertices, in that order,
 * and the second triangle consists of the third, second, and fourth
 * vertices, in that order.
 * @const
 * @default
 */
Mesh.QUAD_STRIP = 8;
/**
 * Primitive mode for rendering quadrilaterals, made up
 * of 4 vertices each. Each quadrilateral is broken into two triangles: the first
 * triangle consists of the first, second, and third vertices, in that order,
 * and the second triangle consists of the first, third, and fourth
 * vertices, in that order.
 * @const
 * @default
 */
Mesh.QUADS = 7;
/**
 * Primitive mode for rendering line segments, made up
 * of 2 vertices each.
 * @const
 */
Mesh.LINES = 1;
/**
 * Primitive mode for rendering a triangle fan. The first 3
 * vertices make up the first triangle, and each additional
 * triangle is made up of the first vertex of the first triangle,
 * the previous vertex, and 1 new vertex.
 * @const
 * @default
 */
Mesh.TRIANGLE_FAN = 6;
/**
 * Primitive mode for rendering a triangle strip. The first 3
 * vertices make up the first triangle, and each additional
 * triangle is made up of the last 2 vertices and 1
 * new vertex. For the second triangle in the strip, and
 * every other triangle after that, the first and second
 * vertices are swapped when generating that triangle.
 * @const
 * @default
 */
Mesh.TRIANGLE_STRIP = 5;
/**
 * Primitive mode for rendering connected line segments.
 * The first 2 vertices make up the first line, and each additional
 * line is made up of the last vertex and 1 new vertex.
 * @const
 * @default
 */
Mesh.LINE_STRIP = 3;
/**
 * Primitive mode for rendering points, made up
 * of 1 vertex each.
 * @const
 * @default
 */
Mesh.POINTS = 0;

// //////////////////////////////////////////////////////////////////////////

/**
 * Converts this mesh to a new mesh with triangles converted
 * to line segments. If the mesh consists
 * of points or line segments, it will remain
 * unchanged. Unlike in previous versions, the new mesh will
 * not necessarily reuse the vertices contained in this one.
 * @deprecated Use <code>mesh.toMeshBuffer().wireFrame()</code>
 * instead.
 * @returns {H3DU.Mesh} A new mesh with triangles converted
 * to lines.
 */
Mesh.prototype.toWireFrame = function() {
  if((this.attributeBits & Mesh.PRIMITIVES_BITS) !== 0) {
   // Not a triangle mesh
    return this;
  }
  return Mesh._fromMeshBuffer(this.toMeshBuffer().wireFrame(), null);
};

/** @ignore */
Mesh._getValue = function(helper, attr, attrIndex, value) {
  if(attr) {
    value[0] = 0;
    value[1] = 0;
    value[2] = 0;
    helper.getVec(attr, attrIndex, value);
    return true;
  }
  return false;
};
/** @ignore */
Mesh._fromMeshBufferOne = function(meshBuffer, srcMesh) {
  var helper = new H3DU.BufferHelper();
  var posAttr = meshBuffer.getAttribute(H3DU.Semantic.POSITION);
  var normalAttr = meshBuffer.getAttribute(H3DU.Semantic.NORMAL);
  var colorAttr = meshBuffer.getAttribute(H3DU.Semantic.COLOR);
  var uvAttr = meshBuffer.getAttribute(H3DU.Semantic.TEXCOORD);
  var scratch = [];
  var c = srcMesh.color.slice(0, 3);
  var n = srcMesh.normal.slice(0, 3);
  var t = srcMesh.texCoord.slice(0, 2);
  if(Mesh._getValue(helper, normalAttr, 0, scratch)) {
    srcMesh.normal3(scratch);
  }
  if(Mesh._getValue(helper, colorAttr, 0, scratch)) {
    srcMesh.color3(scratch);
  }
  if(Mesh._getValue(helper, uvAttr, 0, scratch)) {
    srcMesh.texCoord2(scratch);
  }
  if(Mesh._getValue(helper, posAttr, 0, scratch)) {
    srcMesh.vertex3(scratch);
  }
  srcMesh.color3(c).normal3(n).texCoord2(t);
};

/** @ignore */
Mesh._fromMeshBuffer = function(meshBuffer, srcMesh) {
  var helper = new H3DU.BufferHelper();
  var posAttr = meshBuffer.getAttribute(H3DU.Semantic.POSITION);
  var normalAttr = meshBuffer.getAttribute(H3DU.Semantic.NORMAL);
  var colorAttr = meshBuffer.getAttribute(H3DU.Semantic.COLOR);
  var uvAttr = meshBuffer.getAttribute(H3DU.Semantic.TEXCOORD);
  var tanAttr = meshBuffer.getAttribute(H3DU.Semantic.TANGENT);
  var bitanAttr = meshBuffer.getAttribute(H3DU.Semantic.BITANGENT);
  var indices = meshBuffer.getIndices();
  var scratch = [];
  var srcMeshValue = typeof srcMesh === "undefined" || srcMesh === null ? new Mesh() : srcMesh;
  var mesh = srcMeshValue.mode(meshBuffer.primitiveType());
  for(var i = 0; i < indices.length; i++) {
    var index = indices[i];
    if(Mesh._getValue(helper, normalAttr, index, scratch)) {
      mesh.normal3(scratch);
    }
    if(Mesh._getValue(helper, colorAttr, index, scratch)) {
      mesh.color3(scratch);
    }
    if(Mesh._getValue(helper, uvAttr, index, scratch)) {
      mesh.texCoord2(scratch);
    }
    if(Mesh._getValue(helper, tanAttr, index, scratch)) {
      mesh.tangent3(scratch);
    }
    if(Mesh._getValue(helper, bitanAttr, index, scratch)) {
      mesh.bitangent3(scratch);
    }
    if(Mesh._getValue(helper, posAttr, index, scratch)) {
      mesh.vertex3(scratch);
    }
  }
  mesh.newPrimitive();
  return mesh;
};
 /**
  * Transforms the positions and normals of all the vertices currently
  * in this mesh. The matrix won't affect vertices added afterwards, and
  * won't affect other attributes, including tangents and bitangents.
  * Also, resets the primitive
  * mode (see {@link H3DU.Mesh#mode}) so that future vertices given
  * will not build upon previous vertices. Future vertices should not be
  * added after calling this method without calling mode() first.
  * @deprecated Use <code>(this).toMeshBuffer().transform()</code> instead.
  * @param {Array<number>} matrix A 4x4 matrix described in
  * the {@link H3DU.Math.mat4projectVec3} method. The normals will be transformed using the
  * 3x3 inverse transpose of this matrix (see {@link H3DU.Math.mat4inverseTranspose3}).
  * (Normals need to be transformed specially because they describe directions, not points.)
  * @returns {H3DU.Mesh} This object.
  */
Mesh.prototype.transform = function(matrix) {
  return this._carryOver(
  Mesh._fromMeshBuffer(this.toMeshBuffer().transform(matrix), null));
};
/**
 * Finds the tightest axis-aligned
 * bounding box that holds all vertices in the mesh.
 * @deprecated Use <code>(this).toMeshBuffer().getBounds()</code> instead.
 * @returns {Array<number>} An array of six numbers describing the tightest
 * axis-aligned bounding box
 * that fits all vertices in the mesh. The first three numbers
 * are the smallest-valued X, Y, and Z coordinates, and the
 * last three are the largest-valued X, Y, and Z coordinates.
 * If the mesh is empty, returns the array [Inf, Inf, Inf, -Inf,
 * -Inf, -Inf].
 */
Mesh.prototype.getBoundingBox = function() {
  return this.toMeshBuffer().getBounds();
};
/**
 * Modifies this mesh by reversing the sign of normals it defines.
 * If this mesh defines normals, also resets the primitive
 * mode (see {@link H3DU.Mesh#mode}) so that future vertices given
 * will not build upon previous vertices.
 * @deprecated Use <code>(this).toMeshBuffer().reverseNormals()</code> instead.
 * @returns {H3DU.Mesh} This object.
 */
Mesh.prototype.reverseNormals = function() {
  var normalOffset = Mesh._normalOffset(
     this.attributeBits);
  if(normalOffset < 0) return this;
  return this._carryOver(
   Mesh._fromMeshBuffer(this.toMeshBuffer().reverseNormals(), null));
};

/**
 * Reverses the winding order of the triangles in this mesh
 * by swapping the second and third vertex indices of each one.
 * @deprecated Use <code>(this).toMeshBuffer().reverseWinding()</code> instead.
 * @returns {H3DU.Mesh} This object.
 */
Mesh.prototype.reverseWinding = function() {
  if((this.attributeBits & Mesh.PRIMITIVES_BITS) !== 0) {
   // Not a triangle mesh
    return this;
  }
  for(var i = 0; i < this.indices.length; i += 3) {
    var f2 = this.indices[i + 1];
    var f3 = this.indices[i + 2];
    this.indices[i + 2] = f2;
    this.indices[i + 1] = f3;
  }
  return this;
};

/**
 * Recalculates the normal vectors for triangles
 * in this mesh. For this to properly affect shading, each triangle in
 * the mesh must have its vertices defined in
 * counterclockwise order (if the triangle is being rendered
 * in a right-handed coordinate system). Each normal calculated will
 * be normalized to have a length of 1 (unless the normal is (0,0,0)).
 * @deprecated Use <code>(this).toMeshBuffer().recalcNormals()</code> instead.
 * @param {Boolean} flat If true, each triangle in the mesh
 * will have the same normal, which usually leads to a flat
 * appearance. If false, each unique vertex in the mesh
 * will have its own normal, which usually leads to a smooth
 * appearance.
 * @param {Boolean} inward If true, the generated normals
 * will point inward; otherwise, outward.
 * @returns {H3DU.Mesh} This object.
 */
Mesh.prototype.recalcNormals = function(flat, inward) {
  var primtype = this.primitiveType();
  if(primtype === Mesh.TRIANGLES) {
    return this._carryOver(
      Mesh._fromMeshBuffer(this.toMeshBuffer().recalcNormals(flat, inward), null));
  }
  return this;
};
/**
 * Merges the vertices from another mesh into this one.
 * The vertices from the other mesh will be copied into this one,
 * and the other mesh's indices copied or adapted.
 * Also, resets the primitive
 * mode (see {@link H3DU.Mesh#mode}) so that future vertices given
 * will not build upon previous vertices.
 * @deprecated Use <code>(mesh).toMeshBuffer().merge(other)</code> instead.
 * @param {H3DU.Mesh} other A mesh to merge into this one. The mesh
 * given in this parameter will remain unchanged.
 * Throws an error if this mesh's primitive type is incompatible with the
 * the other mesh's primitive type (for example, a triangle type with LINE_STRIP).
 * @returns {H3DU.Mesh} This object.
 */
Mesh.prototype.merge = function(other) {
  if(!(other instanceof H3DU.Mesh)) {
    throw new Error();
  }
  if(!Mesh._isCompatibleMode(this.currentMode, other.currentMode)) {
    throw new Error("Meshes have incompatible types");
  }
  return this._carryOver(Mesh._fromMeshBuffer(this.toMeshBuffer()
    .merge(other.toMeshBuffer()), null));
};
 /**
  * Sets all the vertices in this mesh to the given color.
  * This method doesn't change this mesh's current color.
  * Only the color's red, green, and blue components will be used.
  * @deprecated Use <code>(this).toMeshBuffer().setColor(r)</code> instead.
  * @param {Array<number>|number|string} r A [color vector or string]{@link H3DU.toGLColor},
  * or the red color component (0-1).
  * @param {number} g Green component of the color (0-1).
  * May be null or omitted if a string is given as the "r" parameter.
  * @param {number} b Blue component of the color (0-1).
  * May be null or omitted if a string is given as the "r" parameter.
  * @returns {H3DU.Mesh} This object.
  */
Mesh.prototype.setColor3 = function(r, g, b) {
  var offset = Mesh._colorOffset(
     this.attributeBits);
  if(offset < 0)return this;
  if(typeof r === "string") {
    return this._carryOver(
      Mesh._fromMeshBuffer(this.toMeshBuffer().setColor(r), null));
  } else {
    return this._carryOver(
      Mesh._fromMeshBuffer(this.toMeshBuffer().setColor([r, g, b]), null));
  }
};

/**
 * Modifies this mesh by converting the normals it defines
 * to ["unit vectors"]{@link glmath} ("normalized" vectors with a length of 1).
 * @deprecated Use <code>(this).toMeshBuffer().reverseNormals()</code> instead.
 * @returns {H3DU.Mesh} This object.
 */
Mesh.prototype.normalizeNormals = function() {
  var normalOffset = Mesh._normalOffset(
     this.attributeBits);
  if(normalOffset < 0) return this;
  return this._carryOver(
   Mesh._fromMeshBuffer(this.toMeshBuffer().normalizeNormals(), null));
};

/**
 * Sets the current tangent vector for this mesh. Future vertex positions
 * defined (with vertex3()) will have this normal. The new current
 * tangent will apply to future vertices even if the current mode
 * is TRIANGLE_FAN and some vertices were already given for
 * that mode. The tangent passed to this method will
 * not automatically be normalized to unit length.
 * @deprecated Deprecated because the default shader no longer
 * uses tangent and bitangent attributes for normal mapping. To define
 * tangent vectors for a mesh, use the {@link H3DU.MeshBuffer} class
 * and create a buffer attribute with the {@link H3DU.Semantics.TANGENT}
 * semantic.
 * @param {Array<number>|number} x X coordinate of the tangent vector.
 *   If "y" and "z" are null or omitted, this is instead
 * a 3-element array giving the X, Y, and Z coordinates, or a single number
 * giving the coordinate for all three dimensions.
 * @param {number} [y] Y coordinate of the tangent vector.
 * If "x" is an array, this parameter may be omitted.
 * @param {number} [z] Z coordinate of the tangent vector.
 * If "x" is an array, this parameter may be omitted.
 * @returns {H3DU.Mesh} This object.
 */
Mesh.prototype.tangent3 = function(x, y, z) {
  if(typeof x === "number" && typeof y === "number" && typeof z === "number") {
    this.tangent[0] = x;
    this.tangent[1] = y;
    this.tangent[2] = z;
  } else {
    this.tangent[0] = x[0];
    this.tangent[1] = x[1];
    this.tangent[2] = x[2];
  }
  this._elementsDefined |= Mesh.TANGENTS_BIT;
  return this;
};

/**
 * Sets the current bitangent vector for this mesh. Future vertex positions
 * defined (with vertex3()) will have this bitangent. The new current
 * bitangent will apply to future vertices even if the current mode
 * is TRIANGLE_FAN and some vertices were already given for
 * that mode. The bitangent passed to this method will
 * not automatically be normalized to unit length.
 * @deprecated Deprecated because the default shader no longer
 * uses tangent and bitangent attributes for normal mapping. To define
 * bitangent vectors for a mesh, use the {@link H3DU.MeshBuffer} class
 * and create a buffer attribute with the {@link H3DU.Semantics.BITANGENT}
 * semantic.
 * @param {Array<number>|number} x X coordinate of the bitangent vector.
 *   If "y" and "z" are null or omitted, this is instead
 * a 3-element array giving the X, Y, and Z coordinates, or a single number
 * giving the coordinate for all three dimensions.
 * @param {number} [y] Y coordinate of the bitangent vector.
 * If "x" is an array, this parameter may be omitted.
 * @param {number} [z] Z coordinate of the bitangent vector.
 * If "x" is an array, this parameter may be omitted.
 * @returns {H3DU.Mesh} This object.
 */
Mesh.prototype.bitangent3 = function(x, y, z) {
  if(typeof x === "number" && typeof y === "number" && typeof z === "number") {
    this.bitangent[0] = x;
    this.bitangent[1] = y;
    this.bitangent[2] = z;
  } else {
    this.bitangent[0] = x[0];
    this.bitangent[1] = x[1];
    this.bitangent[2] = x[2];
  }
  this._elementsDefined |= Mesh.BITANGENTS_BIT;
  return this;
};
 /**
  * Recalculates the tangent and bitangent vectors for triangles
  * in this mesh. This method only has an effect if this mesh
  * includes normals and texture coordinates.
  * @deprecated Deprecated because the default shader no longer
  * uses tangent and bitangent attributes for normal mapping. A similar method to
  * this one may be exposed in the {@link H3DU.MeshBuffer} class's public API
  * in the future.
  * @returns {H3DU.Mesh} This object.
  */
Mesh.prototype.recalcTangents = function() {
  if(this.primitiveType() !== Mesh.TRIANGLES) {
    return this;
  }
  return this._carryOver(
    Mesh._fromMeshBuffer(this.toMeshBuffer()._recalcTangents(), null));
};

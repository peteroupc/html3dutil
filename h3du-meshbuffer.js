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
/* global Float32Array, Uint16Array, Uint32Array */

import {BufferAccessor} from "./h3du-bufferaccessor.js";
import {MathInternal} from "./h3du-mathinternal.js";
import {MathUtil} from "./h3du-math";
import {Semantic} from "./h3du-semantic.js";
import {toGLColor} from "./h3du-misc";
/**
 * A geometric mesh in the form of buffer objects.
 * A mesh buffer is made up of one or more [vertex attribute objects]{@link BufferAccessor},
 * and an optional array of vertex indices. Each vertex attribute object contains
 * the values of one attribute of the mesh, such as positions,
 * vertex normals, and texture coordinates. A mesh buffer
 * can store vertices that make up triangles, line segments, or points.<p>
 * This constructor creates an empty mesh buffer and sets the array
 * of vertex indices to null and the primitive type to {@link MeshBuffer.TRIANGLES}.<p>
 * The `MeshBuffer` class contains four methods (`fromPositions`,
 * `fromPositionsNormals`, `fromPositionsUV`, and `fromPositionsNormalsUV`) that let you define a mesh buffer from a predefined array of vertex data. See the documentation for those methods for more information.<p>
 * The [`Meshes`]{@link Meshes} class includes several handy methods for creating built-in shapes; those methods return a `MeshBuffer` object that describes the triangles they
 * are composed of.
 * <p><b>Instancing</b>
 * <p>Some 3D rendering pipelines support <i>instancing</i>, which is a technique for rendering multiple versions of a mesh buffer with a single draw call. Instancing involves the use of a second mesh buffer (an <i>instance buffer</i>); rather than holding vertex data, the instance buffer holds <i>instance data</i>, that is, data to be used when rendering each instance of the first mesh buffer. Besides this, however, instance buffers are largely similar to vertex buffers as far as the <code>MeshBuffer</code> class is concerned; any reference to vertices in the documentation applies analogously to instances in instance buffers. However, instance buffers should use the primitive type <code>MeshBuffer.POINTS</code>; it makes little sense to have instance buffers describe triangles or line segments.
 * @constructor
 * @example <caption>The following example converts a MeshBuffer object to three.js buffer geometries (and thus serves as a bridge between this library and three.js). Pass the return value to the <code>THREE.Mesh</code>, <code>THREE.LineSegments</code>, or <code>THREE.Points</code> constructor to generate the appropriate kind of shape object depending on the MeshBuffer's primitive type. This example requires the three.js library.</caption>
 * function toBufferGeometry(mesh) {
 * var p=mesh.getAttribute("POSITION")
 * var n=mesh.getAttribute("NORMAL")
 * var t=mesh.getAttribute("TEXCOORD_0")
 * var c=mesh.getAttribute("COLOR")
 * var ind=mesh.getIndices()
 * var geom=new THREE.BufferGeometry()
 * var attributes=[p,n,t,c]
 * var attributeNames=["position","normal","uv","color"]
 * for(var i=0;i<attributes.length;i++) {
 * if(attributes[i]) {
 * var a=attributes[i]
 * var attr=new THREE.InterleavedBufferAttribute(
 * new THREE.InterleavedBuffer(a.buffer,a.stride),
 * a.countPerValue,a.offset)
 * geom.addAttribute(attributeNames[i],attr)
 * }
 * }
 * if(ind)geom.index=new THREE.BufferAttribute(
 * ind,1)
 * return geom
 * }
 */
export const MeshBuffer = function() {
  /** @ignore */
  this._primitiveType = MeshBuffer.TRIANGLES;
  /** @ignore */
  this.attributes = [];
  /** @ignore */
  this._bounds = null;
  /** @ignore */
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
 * Gets the array of vertex indices used by this mesh buffer, or if
 * such an array doesn't exist, builds an array containing one index
 * for each vertex in this mesh buffer, in the order in which those
 * vertices appear.
 * @returns {Uint16Array|Uint32Array|Uint8Array} The vertex index array.
 */
MeshBuffer.prototype.ensureIndices = function() {
  if(typeof this.indices === "undefined" || this.indices === null) {
    this.indices = BufferAccessor.makeIndices(this.vertexCount());
  }
  return this.indices;
};

/**
 * Sets the vertex indices used by this mesh buffer.
 * @param {Array<number>|Uint16Array|Uint32Array|Uint8Array|null} [indices] Array of vertex indices
 * that the mesh buffer will use. Can be null, in which case no index array is used and primitives in the mesh buffer are marked by consecutive vertices.
 * @returns {MeshBuffer} This object.
 */
MeshBuffer.prototype.setIndices = function(indices) {
  if(typeof indices === "undefined" || indices === null) {
    this.indices = null;
  } else if(indices instanceof Array) {
    let index = 0;
    let i;
    for (i = indices.length - 1; i >= 0; i--) {
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
 * By default, the primitive type is {@link MeshBuffer.TRIANGLES}.
 * @param {number} primType The primitive type, either {@link MeshBuffer.TRIANGLES},
 * {@link MeshBuffer.LINES}, or {@link MeshBuffer.POINTS}.
 * For TRIANGLES, every three vertices or vertex indices identify
 * a single triangle.
 * For LINES, every two vertices or vertex indices identify
 * a single line segment.
 * For POINTS, every vertex or vertex index identifies
 * a single point.
 * @returns {MeshBuffer} This object.
 */
MeshBuffer.prototype.setType = function(primType) {
  this._primitiveType = primType;
  return this;
};

/**
 * Adds information about a buffer attribute to this
 * mesh buffer (or sets an
 * existing attribute's information). An attribute
 * gives information about the per-vertex data used and
 * stored in a vertex buffer.
 * @param {number|string} name An attribute semantic, such
 * as {@link Semantic.POSITION}, "POSITION", or "TEXCOORD_0".
 * Throws an error if this value is a string and the string is invalid.
 * If this isn't a string, the set index of the attribute will be 0 (see {@link MeshBuffer#setAttributeEx}).
 * @param {Float32Array|Array} buffer The buffer where
 * the per-vertex data is stored. See {@link MeshBuffer#setAttributeEx}.
 * @param {number} countPerValue The number of elements in each
 * per-vertex item. See {@link MeshBuffer#setAttributeEx}.
 * @param {number} [offset] The index into the array
 * (starting from 0) where the first per-vertex
 * item starts.See {@link MeshBuffer#setAttributeEx}.
 * @param {number} [stride] The number of elements from the start of
 * one per-vertex item to the start of the next. See {@link MeshBuffer#setAttributeEx}.
 * @returns {MeshBuffer} This object. Throws an error if the given
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
 * as {@link Semantic.POSITION}, "POSITION", or "TEXCOORD_0".
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
 * If "buffer" is a {@link BufferAccessor}, the value of "countPerValue"
 * is taken from that accessor and this parameter is ignored; this parameter
 * is currently required otherwise.
 * @param {number} [offset] The index into the array
 * (starting from 0) where the first per-vertex
 * item starts. If null, undefined, or
 * omitted, the default is 0. Throws an error if less than 0.
 * If "buffer" is a {@link BufferAccessor}, the value of "offset"
 * is taken from that accessor and this parameter is ignored.
 * @param {number} [stride] The number of elements from the start of
 * one per-vertex item to the start of the next. If null, undefined, or omitted,
 * this value is the same as "countPerValue". Throws an error if this value is 0 or less.
 * If "buffer" is a {@link BufferAccessor}, the value of "stride"
 * is taken from that accessor and this parameter is ignored.
 * @returns {MeshBuffer} This object.Throws an error if the given
 * semantic is unsupported.
 */
MeshBuffer.prototype.setAttributeEx = function(
  name, index, buffer, countPerValue, offset, stride
) {
  let bufferArray;
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
  let semanticIndex = 0;
  let semantic = 0;
  const strideValue = typeof stride === "undefined" || stride === null ? countPerValue : stride;
  const startIndex = typeof offset === "undefined" || offset === null ? 0 : offset;
  if(countPerValue <= 0 || strideValue <= 0 || startIndex < 0)throw new Error();
  const sem = MeshBuffer._resolveSemantic(name, index);
  if(typeof sem === "undefined" || sem === null) {
    console.warn("Unsupported attribute semantic: " + name);
    return this;
  }
  semantic = sem[0];
  semanticIndex = sem[1];
  const attr = this.getAttribute(semantic, semanticIndex);
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
 * Gets the vertex data index for use in referencing
 * vertex data in buffer attributes.
 * @param {number} indicesIndex A number 0 or greater, and less
 * than the return value of {@link MeshBuffer#vertexCount}. For example,
 * if this mesh buffer holds triangles, 0 means the first vertex, 1 the
 * second vertex, and 2 the third vertex of the first triangle, regardless
 * of where that vertex's data is stored in the mesh buffer.
 * @returns {number} The vertex data index; this is <code>getIndices()[indicesIndex]</code>
 * if this mesh buffer includes an index array, or <code>indicesIndex</code> otherwise.
 */
MeshBuffer.prototype.getIndex = function(indicesIndex) {
  if(typeof this.indices === "undefined" || this.indices === null)return indicesIndex;
  return this.indices[indicesIndex];
};
/**
 * Gets a vertex attribute included in this mesh buffer.
 * @param {number|string} name An attribute semantic, such
 * as {@link Semantic.POSITION}, "POSITION", or "TEXCOORD_0".
 * Throws an error if this value is a string and the string is invalid.
 * @param {number} [semanticIndex] The set index of the attribute
 * for the given semantic.
 * 0 is the first index of the attribute, 1 is the second, and so on.
 * This is ignored if "name" is a string. Otherwise, if null or omitted, the default value is 0.
 * @returns {BufferAccessor} A vertex buffer accessor, or null
 * if the attribute doesn't exist.
 * @example <caption>The following function gets the positions,
 * normals, [texture coordinates]{@link Semantic.TEXCOORD} and colors of each primitive
 * (line, text, or point) in the mesh buffer. A point will have one
 * vertex per primitive, a line two vertices and a triangle three.
 * The attributes, if present, will be stored in the "position",
 * "normal", "uv", and "color" properties of each vertex.</caption>
 * function getPrimitives(mesh) {
 * var p=mesh.getAttribute("POSITION")
 * var n=mesh.getAttribute("NORMAL")
 * var t=mesh.getAttribute("TEXCOORD_0")
 * var c=mesh.getAttribute("COLOR")
 * var count=mesh.vertexCount()
 * var primSize = 3;
 * if(mesh.primitiveType() === MeshBuffer.LINES)
 * primSize = 2;
 * if(mesh.primitiveType() === MeshBuffer.POINTS)
 * primSize = 1;
 * var ret=[]
 * for(var i=0;i&lt;ind.length;i+=primSize) {
 * var prim=[]
 * var index=mesh.getIndex(i)
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
  const sem = MeshBuffer._resolveSemantic(name, semanticIndex);
  if(typeof sem === "undefined" || sem === null) {
    console.warn("Unsupported attribute semantic: " + name);
    return null;
  }
  let i;
  for (i = 0; i < this.attributes.length; i++) {
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
  const prim = this.primitiveType();
  const count = prim === MeshBuffer.LINES ? 2 :
    prim === MeshBuffer.POINTS ? 1 : 3;
  const i = primitiveIndex * count;
  if(typeof this.indices === "undefined" || this.indices === null) {
    if(i + count > this.vertexCount())throw new Error();
    ret[0] = i;
    if(count >= 2)ret[1] = i + 1;
    if(count >= 3)ret[2] = i + 2;
  } else {
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
 * @param {Array<number>|Uint16Array|Uint32Array|Uint8Array|null|undefined} [indices] Array of vertex indices
 * that the mesh buffer will use. Each index (n) is a number referring to the (n+1)th vertex. If you are defining a set of triangles, there should be 3 indices for each triangle; for line segments, 2 indices for each segment; and for points, 1 index for each point. Can be null, undefined, or omitted, in which case no index array is used and primitives in the mesh buffer are marked by consecutive vertices.
 * @returns {MeshBuffer} A new mesh buffer.
 * @example <caption>The following example shows how to define a mesh
 * buffer from a predefined array of vertex positions.</caption>
 * // First, create an array of numbers giving the X, Y, and
 * // Z coordinate for each vertex position. Here, three vertices
 * // are defined.
 * var vertices = [x1, y1, z1, x2, y2, z2, x3, y3, z3 ];
 * // Second -- and this is optional -- create a second array of numbers
 * // giving the indices to vertices defined in the previous step.
 * // Each index refers to the (n+1)th vertex; since 3 vertices
 * // were defined, the highest index is 2.
 * var indices = [0, 1, 2];
 * // Finally, create the mesh buffer. (If there are no indices,
 * // leave out the "indices" argument.)
 * var meshBuffer=MeshBuffer.fromPositions(vertices, indices);
 * @example <caption>The following example generates a mesh buffer
 * consisting of a 10x10x10 grid of points. This mesh buffer can serve, for
 * example, as instance data to draw multiple instances
 * of a 3-D cube in different positions.</caption>
 * var vertices=[]
 * for(var x=0;x<10;x++)
 * for(var y=0;y<10;y++)
 * for(var z=0;z<10;z++)vertices.push(x,y,z);
 * var meshBuffer=MeshBuffer.fromPositions(vertices)
 * .setType(MeshBuffer.POINTS);
 */
MeshBuffer.fromPositions = function(vertices, indices) {
  const vertarray = new Float32Array(vertices);
  return new MeshBuffer().setAttribute("POSITION", vertarray, 3, 0)
    .setIndices(indices);
};

/**
 * Creates a new mesh buffer with the given array of vertex positions
 * and vertex normals.
 * @param {Array<number>|Float32Array} vertices An array of vertex data. This
 * array's length must be divisible by 6; every 6 elements describe
 * one vertex and are in the following order:<ol>
 * <li>X, Y, and Z coordinates, in that order, of the vertex position.
 * <li>X, Y, and Z components, in that order, of the vertex normal.</ol>
 * @param {Array<number>|Uint16Array|Uint32Array|Uint8Array|null|undefined} [indices] Array of vertex indices
 * that the mesh buffer will use. Each index (n) is a number referring to the (n+1)th vertex. If you are defining a set of triangles, there should be 3 indices for each triangle; for line segments, 2 indices for each segment; and for points, 1 index for each point. Can be null, undefined, or omitted, in which case no index array is used and primitives in the mesh buffer are marked by consecutive vertices.
 * @returns {MeshBuffer} A new mesh buffer.
 * @example <caption>The following example shows how to define a mesh
 * buffer from a predefined array of vertex positions and normals.</caption>
 * // First, create an array of numbers giving the X, Y, and
 * // Z coordinate for each vertex position and normal. Here, three vertices
 * // are defined. For each vertex, the position is given, followed by
 * // the normal.
 * var vertices = [
 * x1, y1, z1, nx1, ny1, nz1,
 * x2, y2, z2, nx2, ny2, nz2,
 * x3, y3, z3, nx3, ny3, nz3 ];
 * // Second -- and this is optional -- create a second array of numbers
 * // giving the indices to vertices defined in the previous step.
 * // Each index refers to the (n+1)th vertex; since 3 vertices
 * // were defined, the highest index is 2.
 * var indices = [0, 1, 2];
 * // Finally, create the mesh buffer. (If there are no indices,
 * // leave out the "indices" argument.)
 * var meshBuffer=MeshBuffer.fromPositionsNormals(vertices, indices);
 */
MeshBuffer.fromPositionsNormals = function(vertices, indices) {
  const vertarray = new Float32Array(vertices);
  return new MeshBuffer()
    .setAttribute("POSITION", vertarray, 3, 0, 6)
    .setAttribute("NORMAL", vertarray, 3, 3, 6).setIndices(indices);
};

/**
 * Creates a new mesh buffer with the given array of vertex positions,
 * vertex normals, and texture coordinates.
 * @param {Array<number>|Float32Array} vertices An array of vertex data. This
 * array's length must be divisible by 8; every 8 elements describe
 * one vertex and are in the following order:<ol>
 * <li>X, Y, and Z coordinates, in that order, of the vertex position.
 * <li>X, Y, and Z components, in that order, of the vertex normal.
 * <li>U and V [texture coordinates]{@link Semantic.TEXCOORD} in that order, of the vertex.</ol>
 * @param {Array<number>|Uint16Array|Uint32Array|Uint8Array|null|undefined} [indices] Array of vertex indices
 * that the mesh buffer will use. Each index (n) is a number referring to the (n+1)th vertex. If you are defining a set of triangles, there should be 3 indices for each triangle; for line segments, 2 indices for each segment; and for points, 1 index for each point. Can be null, undefined, or omitted, in which case no index array is used and primitives in the mesh buffer are marked by consecutive vertices.
 * @returns {MeshBuffer} A new mesh buffer.
 * @example <caption>The following example shows how to define a mesh
 * buffer from a predefined array of vertex positions, normals,
 * and texture cordinates.</caption>
 * // First, create an array of numbers giving the X, Y, and
 * // Z coordinate for each vertex position and normal, and associated
 * // texture coordinates. Here, three vertices
 * // are defined. For each vertex, the position is given, followed by
 * // the normal, followed by the texture coordinates.
 * var vertices = [
 * x1, y1, z1, nx1, ny1, nz1, u1, v1,
 * x2, y2, z2, nx2, ny2, nz2, u2, v2,
 * x3, y3, z3, nx3, ny3, nz3, u3, v3 ];
 * // Second -- and this is optional -- create a second array of numbers
 * // giving the indices to vertices defined in the previous step.
 * // Each index refers to the (n+1)th vertex; since 3 vertices
 * // were defined, the highest index is 2.
 * var indices = [0, 1, 2];
 * // Finally, create the mesh buffer. (If there are no indices,
 * // leave out the "indices" argument.)
 * var meshBuffer=MeshBuffer.fromPositionsNormalsUV(vertices, indices);
 */
MeshBuffer.fromPositionsNormalsUV = function(vertices, indices) {
  const vertarray = new Float32Array(vertices);
  return new MeshBuffer()
    .setAttribute("POSITION", vertarray, 3, 0, 8)
    .setAttribute("NORMAL", vertarray, 3, 3, 8)
    .setAttribute("TEXCOORD", vertarray, 2, 6, 8).setIndices(indices);
};

/**
 * Creates a new mesh buffer with the given array of vertex positions
 * and vertex colors.
 * @param {Array<number>|Float32Array} vertices An array of vertex data. This
 * array's length must be divisible by 6; every 6 elements describe
 * one vertex and are in the following order:<ol>
 * <li>X, Y, and Z coordinates, in that order, of the vertex position.
 * <li>Red, green, and blue components, in that order, of the vertex color, where each component ranges from a low of 0 to a high of 1.</ol>
 * @param {Array<number>|Uint16Array|Uint32Array|Uint8Array|null|undefined} [indices] Array of vertex indices
 * that the mesh buffer will use. Each index (n) is a number referring to the (n+1)th vertex. If you are defining a set of triangles, there should be 3 indices for each triangle; for line segments, 2 indices for each segment; and for points, 1 index for each point. Can be null, undefined, or omitted, in which case no index array is used and primitives in the mesh buffer are marked by consecutive vertices.
 * @returns {MeshBuffer} A new mesh buffer.
 * @example <caption>The following example shows how to define a mesh
 * buffer from a predefined array of vertex positions, normals,
 * and texture cordinates.</caption>
 * // First, create an array of numbers giving the X, Y, and
 * // Z coordinate for each vertex position and associated
 * // color components. Here, three vertices
 * // are defined. For each vertex, the position is given, followed by
 * // the color components.
 * var vertices = [
 * x1, y1, z1, r1, g1, b1,
 * x2, y2, z2, r2, g2, b2,
 * x3, y3, z3, r3, g3, b3 ];
 * // Second -- and this is optional -- create a second array of numbers
 * // giving the indices to vertices defined in the previous step.
 * // Each index refers to the (n+1)th vertex; since 3 vertices
 * // were defined, the highest index is 2.
 * var indices = [0, 1, 2];
 * // Finally, create the mesh buffer. (If there are no indices,
 * // leave out the "indices" argument.)
 * var meshBuffer=MeshBuffer.fromPositionsColors(vertices, indices);
 */
MeshBuffer.fromPositionsColors = function(vertices, indices) {
  const vertarray = new Float32Array(vertices);
  return new MeshBuffer()
    .setAttribute("POSITION", vertarray, 3, 0, 6)
    .setAttribute("COLOR", vertarray, 3, 3, 6).setIndices(indices);
};

/**
 * Creates a new mesh buffer with the given array of vertex positions,
 * vertex normals, and vertex colors.
 * @param {Array<number>|Float32Array} vertices An array of vertex data. This
 * array's length must be divisible by 9; every 9 elements describe
 * one vertex and are in the following order:<ol>
 * <li>X, Y, and Z coordinates, in that order, of the vertex position.
 * <li>X, Y, and Z components, in that order, of the vertex normal.
 * <li>Red, green, and blue components, in that order, of the vertex color, where each component ranges from a low of 0 to a high of 1.</ol>
 * @param {Array<number>|Uint16Array|Uint32Array|Uint8Array|null|undefined} [indices] Array of vertex indices
 * that the mesh buffer will use. Each index (n) is a number referring to the (n+1)th vertex. If you are defining a set of triangles, there should be 3 indices for each triangle; for line segments, 2 indices for each segment; and for points, 1 index for each point. Can be null, undefined, or omitted, in which case no index array is used and primitives in the mesh buffer are marked by consecutive vertices.
 * @returns {MeshBuffer} A new mesh buffer.
 * @example <caption>The following example shows how to define a mesh
 * buffer from a predefined array of vertex positions, normals,
 * and texture cordinates.</caption>
 * // First, create an array of numbers giving the X, Y, and
 * // Z coordinate for each vertex position and normal, and associated
 * // color components. Here, three vertices
 * // are defined. For each vertex, the position is given, followed by
 * // the normal, followed by the color components.
 * var vertices = [
 * x1, y1, z1, nx1, ny1, nz1, r1, g1, b1,
 * x2, y2, z2, nx2, ny2, nz2, r2, g2, b2,
 * x3, y3, z3, nx3, ny3, nz3, r3, g3, b3 ];
 * // Second -- and this is optional -- create a second array of numbers
 * // giving the indices to vertices defined in the previous step.
 * // Each index refers to the (n+1)th vertex; since 3 vertices
 * // were defined, the highest index is 2.
 * var indices = [0, 1, 2];
 * // Finally, create the mesh buffer. (If there are no indices,
 * // leave out the "indices" argument.)
 * var meshBuffer=MeshBuffer.fromPositionsNormalsColors(vertices, indices);
 */
MeshBuffer.fromPositionsNormalsColors = function(vertices, indices) {
  const vertarray = new Float32Array(vertices);
  return new MeshBuffer()
    .setAttribute("POSITION", vertarray, 3, 0, 9)
    .setAttribute("NORMAL", vertarray, 3, 3, 9)
    .setAttribute("COLOR", vertarray, 3, 6, 9).setIndices(indices);
};

/**
 * Creates a new mesh buffer with the given array of vertex positions
 * and texture coordinates.
 * @param {Array<number>|Float32Array} vertices An array of vertex data. This
 * array's length must be divisible by 5; every 5 elements describe
 * one vertex and are in the following order:<ol>
 * <li>X, Y, and Z coordinates, in that order, of the vertex position.
 * <li>U and V [texture coordinates]{@link Semantic.TEXCOORD} in that order, of the vertex.</ol>
 * @param {Array<number>|Uint16Array|Uint32Array|Uint8Array|null|undefined} [indices] Array of vertex indices
 * that the mesh buffer will use. Each index (n) is a number referring to the (n+1)th vertex. If you are defining a set of triangles, there should be 3 indices for each triangle; for line segments, 2 indices for each segment; and for points, 1 index for each point. Can be null, undefined, or omitted, in which case no index array is used and primitives in the mesh buffer are marked by consecutive vertices.
 * @returns {MeshBuffer} A new mesh buffer.
 * @example <caption>The following example shows how to define a mesh
 * buffer from a predefined array of vertex positions, normals,
 * and texture cordinates.</caption>
 * // First, create an array of numbers giving the X, Y, and
 * // Z coordinate for each vertex position and associated
 * // texture coordinates. Here, three vertices
 * // are defined. For each vertex, the position is given, followed by
 * // the texture coordinates.
 * var vertices = [
 * x1, y1, z1, u1, v1,
 * x2, y2, z2, u2, v2,
 * x3, y3, z3, u3, v3 ];
 * // Second -- and this is optional -- create a second array of numbers
 * // giving the indices to vertices defined in the previous step.
 * // Each index refers to the (n+1)th vertex; since 3 vertices
 * // were defined, the highest index is 2.
 * var indices = [0, 1, 2];
 * // Finally, create the mesh buffer. (If there are no indices,
 * // leave out the "indices" argument.)
 * var meshBuffer=MeshBuffer.fromPositionsUV(vertices, indices);
 */
MeshBuffer.fromPositionsUV = function(vertices, indices) {
  const vertarray = new Float32Array(vertices);
  return new MeshBuffer()
    .setAttribute("POSITION", vertarray, 3, 0, 5)
    .setAttribute("TEXCOORD", vertarray, 2, 3, 5).setIndices(indices);
};
/**
 * Creates an array of vertex indices corresponding to triangles that make up a line strip, a series of vertices that make up a connected line segment path.
 * @param {number} vertexCount Number of vertices that make up the line loop.
 * @returns {Array<number>} Array of vertex indices corresponding to line segments that make up the line strip. Every two indices in the array is a separate line segment. Returns an empty array if 'vertexCount' is less than 2.
 * @example <caption>The following example sets appropriate indices for a mesh buffer with vertices ordered in line strip vertex order.</caption>
 * mesh.setIndices(
 * MeshBuffer.lineStripIndices(mesh.vertexCount())
 * .map(x=>mesh.getIndex(x)));
 */

MeshBuffer.lineStripIndices = function(vertexCount) {
  const ret = [];
  if(vertexCount >= 2) {
    let i;
    for (i = 1; i < vertexCount; i++)ret.push(i - 1, i);
  }
  return ret;
};
/**
 * Creates an array of vertex indices corresponding to triangles that make up a line loop, a series of vertices that make up a connected line segment path, with the last point also connected to the first.
 * @param {number} vertexCount Number of vertices that make up the line loop.
 * @returns {Array<number>} Array of vertex indices corresponding to line segments that make up the line loop. Every two indices in the array is a separate line segment. Returns an empty array if 'vertexCount' is less than 2.
 * @example <caption>The following example sets appropriate indices for a mesh buffer with vertices ordered in line loop vertex order.</caption>
 * mesh.setIndices(
 * MeshBuffer.lineLoopIndices(mesh.vertexCount())
 * .map(x=>mesh.getIndex(x)));
 */
MeshBuffer.lineLoopIndices = function(vertexCount) {
  const ret = [];
  if(vertexCount >= 2) {
    let i;
    for (i = 1; i < vertexCount; i++)ret.push(i - 1, i);
    ret.push(vertexCount - 1, 0);
  }
  return ret;
};
/**
 * Creates an array of vertex indices corresponding to triangles that make up a triangle fan or convex polygon. For triangle fans and convex polygons, the first 3
 * vertices make up the first triangle, and each additional
 * triangle is made up of the last vertex, the first vertex of
 * the first trangle, and 1 new vertex.
 * @param {number} vertexCount Number of vertices that make up the triangle fan or convex polygon.
 * @returns {Array<number>} Array of vertex indices corresponding to triangles that make up the triangle fan or convex polygon. Every three indices in the array is a separate triangle. Returns an empty array if 'vertexCount' is less than 3.
 * @example <caption>The following example sets appropriate indices for a mesh buffer with vertices ordered in triangle fan vertex order.</caption>
 * mesh.setIndices(
 * MeshBuffer.triangleFanIndices(mesh.vertexCount())
 * .map(x=>mesh.getIndex(x)));
 */
MeshBuffer.triangleFanIndices = function(vertexCount) {
  const ret = [];
  if(vertexCount >= 3) {
    let i;
    for (i = 2; i < vertexCount; i++)ret.push(0, i - 1, i);
  }
  return ret;
};
/**
 * Creates an array of vertex indices corresponding to triangles that make up a triangle strip. For a triangle strip, the first 3
 * vertices make up the first triangle, and each additional
 * triangle is made up of the last 2 vertices and 1
 * new vertex.
 * @param {number} vertexCount Number of vertices that make up the triangle strip.
 * @returns {Array<number>} Array of vertex indices corresponding to triangles that make up the triangle strip. Every three indices in the array is a separate triangle. Returns an empty array if 'vertexCount' is less than 3.
 * @example <caption>The following example sets appropriate indices for a mesh buffer with vertices ordered in triangle strip vertex order.</caption>
 * mesh.setIndices(
 * MeshBuffer.triangleStripIndices(mesh.vertexCount())
 * .map(x=>mesh.getIndex(x)));
 */
MeshBuffer.triangleStripIndices = function(vertexCount) {
  const ret = [];
  if(vertexCount >= 3) {
    const flip = false;
    let i;
    for (i = 2; i < vertexCount; i++) {
      ret.push(flip ? i - 2 : i - 1,
        flip ? i - 1 : i - 2, i);
    }
  }
  return ret;
};
/**
 * Creates an array of vertex indices corresponding to triangles that make up a series of quadrilaterals, where every 4 vertices is a separate quadrilateral.
 * @param {number} vertexCount Number of vertices that make up the quadrilaterals.
 * @returns {Array<number>} Array of vertex indices corresponding to triangles that make up the quadrilaterals. Every three indices in the array is a separate triangle. Returns an empty array if 'vertexCount' is less than 4. If 'vertexCount' is not divisible by 4, any excess vertices are ignored.
 * @example <caption>The following example sets appropriate indices for a mesh buffer with vertices ordered in quadrilateral vertex order.</caption>
 * mesh.setIndices(
 * MeshBuffer.quadsIndices(mesh.vertexCount())
 * .map(x=>mesh.getIndex(x)));
 */
MeshBuffer.quadsIndices = function(vertexCount) {
  const ret = [];
  if(vertexCount >= 4) {
    let i;
    for (i = 3; i < vertexCount; i += 4) {
      ret.push(i - 3, i - 2, i, i, i - 2, i - 1);
    }
  }
  return ret;
};

/**
 * Creates an array of vertex indices corresponding to triangles that make up a strip of quadrilaterals. For a quadrilateral strip, the first 4 vertices make up the first quadrilateral, and each additional
 * quadrilateral is made up of the last 2 vertices of the previous quadrilateral and
 * 2 new vertices.
 * @param {number} vertexCount Number of vertices that make up the quadrilateral strip.
 * @returns {Array<number>} Array of vertex indices corresponding to triangles that make up the quadrilateral strip. Every three indices in the array is a separate triangle. Returns an empty array if 'vertexCount' is less than 4. If 'vertexCount' is not divisible by 2, the excess vertex is ignored.
 * @example <caption>The following example sets appropriate indices for a mesh buffer with vertices ordered in quadrilateral strip vertex order.</caption>
 * mesh.setIndices(
 * MeshBuffer.quadStripIndices(mesh.vertexCount())
 * .map(x=>mesh.getIndex(x)));
 */
MeshBuffer.quadStripIndices = function(vertexCount) {
  const ret = [];
  if(vertexCount >= 4) {
    let i;
    for (i = 3; i < vertexCount; i += 2) {
      ret.push(i - 3, i - 2, i - 1, i - 1, i - 2, i);
    }
  }
  return ret;
};

/**
 * Gets the number of primitives (triangles, lines,
 * and points) composed by all shapes in this mesh.
 * @returns {number} Return value.
 */
MeshBuffer.prototype.primitiveCount = function() {
  if(this._primitiveType === MeshBuffer.LINES)
    return Math.floor(this.vertexCount() / 2);
  if(this._primitiveType === MeshBuffer.POINTS)
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
 * vertices; if lines, two; and if points, one. Each vertex is an array containing that vertex's coordinates (for example, if the attribute holds 3 elements per value, the coordinates are X, Y, and Z coordinates, in that order).
 */
MeshBuffer.prototype.getPositions = function() {
  const posattr = this.getAttribute(Semantic.POSITION, 0);
  if(!posattr) {
    return [];
  }
  const ret = [];
  const indices = [];
  const primcount = this.primitiveCount();
  let j;
  for (j = 0; j < primcount; j++) {
    this.vertexIndices(j, indices);
    const primitive = [];
    let k;
    for (k = 0; k < indices.length; k++) {
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
 * @returns {MeshBuffer} This object.
 */
MeshBuffer.prototype.normalizeNormals = function() {
  let i;
  for (i = 0; i < this.attributes.length; i++) {
    const attr = this.attributes[i];
    if(attr[0] !== Semantic.NORMAL) {
      continue;
    }
    const value = [];
    const count = attr[2].count();
    let j;
    for (j = 0; j < count; j++) {
      attr[2].getVec(j, value);
      MathInternal.vecNormalizeInPlace(value);
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
 * @returns {MeshBuffer} This object.
 * @example <caption>
 * The following code generates a two-sided mesh, where
 * the normals on each side face in the opposite direction.
 * This is only useful when drawing open geometric shapes, such as open
 * cylinders and two-dimensional planar shapes.
 * Due to the z-fighting effect, drawing a two-sided mesh is
 * recommended only if face culling is enabled.</caption>
 * var twoSidedMesh = originalMesh.merge(
 * new MeshBuffer().merge(originalMesh)
 * .reverseWinding().reverseNormals()
 * );
 */
MeshBuffer.prototype.reverseNormals = function() {
  let i;
  for (i = 0; i < this.attributes.length; i++) {
    const attr = this.attributes[i];
    if(attr[0] !== Semantic.NORMAL) {
      continue;
    }
    const value = [];
    const count = attr[2].count();
    let j;
    for (j = 0; j < count; j++) {
      attr[2].getVec(j, value);
      let k;
      for (k = 0; k < value.length; k++) {
        value[k] = -value[k];
      }
      attr[2].setVec(j, value);
    }
  }
  return this;
};
/**
 * Sets all the vertices in this mesh to the given color, by
 * assigning each value with the attribute semantic <code>COLOR</code>
 * to the given color. (If the attribute's [count per value]{@link BufferAccessor#countPerValue}
 * is less than 4, each such value will be set to as many elements of the converted 4-element
 * color as possible.) If an attribute with the semantic <code>COLOR</code>
 * doesn't exist, an attribute with the semantic <code>COLOR_0</code> and a count per
 * value of 3 is created.<p>
 * All attributes with the semantic <code>COLOR</code>,
 * regardless of semantic index, are affected by this method.
 * @param {Array<number>|number|string} color A [color vector or string]{@link toGLColor}
 * identifying the color to set.
 * @returns {MeshBuffer} This object.
 */
MeshBuffer.prototype.setColor = function(color) {
  const colorValue = toGLColor(color);
  let haveColor = false;
  let i;
  for (i = 0; i < this.attributes.length; i++) {
    const attr = this.attributes[i];
    const count = attr[2].count();
    if(attr[0] !== Semantic.COLOR) {
      continue;
    }
    haveColor = true;
    let j;
    for (j = 0; j < count; j++) {
      attr[2].setVec(j, colorValue);
    }
  }
  if(!haveColor) {
    this._ensureAttribute(Semantic.COLOR, 0, 3);
    return this.setColor(colorValue);
  }
  return this;
};

/**
 * Reverses the winding order of the triangles in this mesh buffer
 * by swapping the second and third vertex indices of each one.
 * Has an effect only if this mesh buffer consists of triangles.
 * @returns {MeshBuffer} This object.
 * @example <caption>
 * The following code generates a mesh that survives face culling,
 * since the same triangles occur on each side of the mesh, but
 * with different winding orders.
 * This is only useful when drawing open geometric shapes, such as open
 * cylinders and two-dimensional planar shapes.
 * Due to the z-fighting effect, drawing this kind of mesh is
 * recommended only if face culling is enabled.</caption>
 * var frontBackMesh = originalMesh.merge(
 * new MeshBuffer().merge(originalMesh).reverseWinding()
 * );
 */
MeshBuffer.prototype.reverseWinding = function() {
  if(this.primitiveType() === MeshBuffer.TRIANGLES) {
    this.ensureIndices();
    let i;
    for (i = 0; i + 2 < this.indices.length; i += 3) {
      const tmp = this.indices[i + 1];
      this.indices[i + 1] = this.indices[i + 2];
      this.indices[i + 2] = tmp;
    }
  }
  return this;
};

/** @ignore */
MeshBuffer._recalcNormals = function(positions, normals, indices, flat, inward) {
  const normDir = inward ? -1 : 1;
  const uniqueVertices = {};
  const dupverts = [];
  let dupvertcount = 0;
  let i;
  const normalsCount = normals.count();
  const count = Math.min(positions.count(), normalsCount);
  let v1 = [0, 0, 0];
  let v2 = [0, 0, 0];
  let v3 = [0, 0, 0];
  const normal = [0, 0, 0];
  for(i = 0; i < count; i++) {
    // Set normal to 0
    normals.setVec(i, v1);
    if(!flat) {
      // If non-flat shading is requested, find all vertices with
      // duplicate vertex positions
      const uv = positions.getVec(i, []);
      if(uniqueVertices[uv])uniqueVertices[uv].push(i);
      else uniqueVertices[uv] = [i];
    }
  }
  for(i = 0; i < indices.length; i += 3) {
    v1 = positions.getVec(indices[i], v1);
    v2 = positions.getVec(indices[i + 1], v2);
    v3 = positions.getVec(indices[i + 2], v3);
    const n1 = MathUtil.vec3sub(v1, v3);
    const n2 = MathUtil.vec3sub(v2, v3);
    // cross multiply n1 and n2
    const n1xn2 = MathUtil.vec3cross(n1, n2);
    MathUtil.vec3normalizeInPlace(n1xn2);
    MathUtil.vec3scaleInPlace(n1xn2, normDir);
    // add normalized normal to each vertex of the face
    normals.getVec(indices[i], v1);
    normals.getVec(indices[i + 1], v2);
    normals.getVec(indices[i + 2], v3);
    MathUtil.vec3addInPlace(v1, n1xn2);
    MathUtil.vec3addInPlace(v2, n1xn2);
    MathUtil.vec3addInPlace(v3, n1xn2);
    normals.setVec(indices[i], v1);
    normals.setVec(indices[i + 1], v2);
    normals.setVec(indices[i + 2], v3);
  }
  if(!flat) {
    // If non-flat shading is requested, make sure
    // that every vertex with the same position has the
    // same normal
    for(const key in uniqueVertices) {
      if(Object.prototype.hasOwnProperty.call(uniqueVertices, key)) {
        const v = uniqueVertices[key];
        if(v && v.constructor === Array && v.length >= 2) {
          const v0 = v[0];
          normals.getVec(v0, normal);
          const avg = [normal[0], normal[1], normal[2]];
          dupverts[0] = normal[0];
          dupverts[1] = normal[1];
          dupverts[2] = normal[2];
          dupvertcount = 3;
          for(i = 1; i < v.length; i++) {
            let dupfound = false;
            positions.getVec(v[i], normal);
            const nx = normal[0];
            const ny = normal[1];
            const nz = normal[2];
            let j;
            for (j = 0; j < dupvertcount; j += 3) {
              if(nx === dupverts[j] && ny === dupverts[j + 1] && nz === dupverts[j + 2]) {
                dupfound = true;
                break;
              }
            }
            if(!dupfound) {
              dupverts[dupvertcount++] = nx;
              dupverts[dupvertcount++] = ny;
              dupverts[dupvertcount++] = nz;
              MathUtil.vec3addInPlace(avg, normal);
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
    MathUtil.vec3normalize(normal);
    normals.setVec(i, normal);
  }
};

/** @ignore */
MeshBuffer._recalcTangentsInternal = function(positions, normals, texCoords, tangents, bitangents, indices) {
  let v1 = [0, 0, 0];
  let v2 = [0, 0, 0];
  let v3 = [0, 0, 0];
  let i;
  for (i = 0; i < indices.length; i += 3) {
    v1 = positions.getVec(indices[i], v1);
    v2 = positions.getVec(indices[i + 1], v2);
    v3 = positions.getVec(indices[i + 2], v3);
    // Find the tangent and bitangent
    let ret;
    const t1 = v2[0] - v1[0];
    const t2 = v2[1] - v1[1];
    const t3 = v2[2] - v1[2];
    const t4 = v3[0] - v1[0];
    const t5 = v3[1] - v1[1];
    const t6 = v3[2] - v1[2];
    v1 = texCoords.getVec(indices[i], v1);
    v2 = texCoords.getVec(indices[i + 1], v2);
    v3 = texCoords.getVec(indices[i + 2], v3);
    const t7 = v2[0] - v1[0];
    const t8 = v2[1] - v1[1];
    const t9 = v3[0] - v1[0];
    const t10 = v3[1] - v1[1];
    let t11 = t7 * t10 - t8 * t9;
    if(t11 === 0) {
    // Degenerate case
      ret = [0, 0, 0, 0, 0, 0];
    } else {
      t11 = 1.0 / t11;
      const t12 = -t8;
      const t13 = -t9;
      const t14 = (t10 * t1 + t12 * t4) * t11;
      const t15 = (t10 * t2 + t12 * t5) * t11;
      const t16 = (t10 * t3 + t12 * t6) * t11;
      const t17 = (t13 * t1 + t7 * t4) * t11;
      const t18 = (t13 * t2 + t7 * t5) * t11;
      const t19 = (t13 * t3 + t7 * t6) * t11;
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
    let j;
    for (j = 0; j < 3; j++) {
      const m = ret;
      v1 = normals.getVec(indices[i + j], v1);
      const norm0 = v1[0];
      const norm1 = v1[1];
      const norm2 = v1[2];
      const t20 = m[0] * norm0 + m[1] * norm1 + m[2] * norm2;
      const tangent = MathUtil.vec3normalizeInPlace([
        m[0] - t20 * norm0,
        m[1] - t20 * norm1,
        m[2] - t20 * norm2]);
      const t22 = m[3] * norm0 + m[4] * norm1 + m[5] * norm2;
      const t23 = m[3] * tangent[0] + m[4] * tangent[1] + m[5] * tangent[2];
      const bitangent = MathUtil.vec3normalizeInPlace([
        m[3] - t22 * norm0 - t23 * tangent[0],
        m[4] - t22 * norm1 - t23 * tangent[1],
        m[5] - t22 * norm2 - t23 * tangent[2]]);
      tangents.setVec(indices[i + j], tangent);
      bitangents.setVec(indices[i + j], bitangent);
    }
  }
};
/**
 * TODO: Not documented yet.
 * @returns {MeshBuffer} This object.
 */
MeshBuffer.prototype.deindex = function() {
  if(typeof this.indices === "undefined" || this.indices === null)return this;
  let nonUnique = false;
  let i;
  for (i = 0; i < this.indices.length; i++) {
    if(this.indices[i] !== i) {
      nonUnique = true; break;
    }
  }
  if(nonUnique) {
    this._makeRedundantInternal();
  }
  this.indices = null;
  return this;
};
/** @ignore */
MeshBuffer.prototype._makeRedundantInternal = function() {
  const newAttributes = [];
  let i;
  for (i = 0; i < this.attributes.length; i++) {
    const a = this.attributes[i];
    newAttributes.push([a[0], a[1],
      BufferAccessor.merge(a[2], this.indices, null, [])]);
  }
  this.attributes = newAttributes;
};
/** @ignore */
MeshBuffer.prototype._makeRedundant = function() {
  this.ensureIndices();
  this._makeRedundantInternal();
  this.setIndices(BufferAccessor.makeIndices(this.indices.length));
};
/** @ignore */
MeshBuffer.prototype._ensureAttribute = function(semantic, semanticIndex, desiredCount) {
  const attr = this.getAttribute(semantic, semanticIndex);
  const vertexCount = this.attributes.length === 0 ? 0 : this.attributes[0][2].count();
  const attrCount = typeof attr !== "undefined" && attr !== null ? attr.countPerValue : 0;
  if(attr && attrCount >= desiredCount)
    return attr;
  const newattr = BufferAccessor.makeBlank(vertexCount, desiredCount);
  if(attrCount > 0) {
    const vec = MathInternal.vecZeros(desiredCount);
    let i;
    for (i = 0; i < vertexCount; i++) {
      attr.getVec(i, vec);
      newattr.setVec(i, vec);
    }
  }
  this.attributes.push([semantic, semanticIndex, newattr]);
  return newattr;
};
/** @ignore */
MeshBuffer.prototype._countPerValue = function(sem) {
  const a = this.getAttribute(sem);
  return typeof a !== "undefined" && a !== null ? a.countPerValue : 0;
};

/**
 * Recalculates the normal vectors (directions that generally point up and away from the mesh buffer's surface) for triangles
 * in this mesh buffer, in order to give the shape described by this buffer a flat or smooth appearance or to shade the shape from the inside or the outside upon rendering.<p> Each normal calculated will
 * be normalized to have a length of 1 (unless the normal is (0,0,0)),
 * and will be stored in an attribute with semantic <code>NORMAL_0</code>.<p>
 * This method will have an effect only if the buffer includes an attribute with
 * semantic <code>POSITION_0</code> and each of that attribute's values is at least 3 elements
 * long. If the buffer already includes an attribute with semantic <code>NORMAL_0</code>,
 * ensures its values are each at least 3 elements long.<p>For normal calculation to properly affect shading:<ul>
 * <li>Each triangle's vertices in the mesh buffer (as they appear when the triangle's front side is seen) must be ordered in the same winding (counterclockwise or clockwise) throughout. If the vertices have the wrong order, use the [`reverseWinding()`]{@link MeshBuffer#reverseWinding}
 * method to change their order.
 * <li>If the mesh describes a closed convex surface (such as a sphere or cube) and is being rendered in a right-handed coordinate system (e.g., X-right, Y-up, Z-backward), each of its triangles must have counterclockwise winding for the shape to be shaded from the outside.</ul>
 * @param {boolean} [flat] If true, each triangle in the mesh
 * will have the same normal, which usually leads to a flat
 * appearance. If false, each unique vertex in the mesh
 * will have its own normal, which usually leads to a smooth
 * appearance. If null, undefined, or omitted, the default is false.
 * @param {boolean} [inward] If true, the generated normals
 * will point inward, so that the shape
 * is shaded from the inside upon rendering; otherwise, the normals will point outward. If null, undefined, or omitted, the default is false.
 * @returns {MeshBuffer} This object.
 * @example
 * // Use flat shading, and shape is shaded from the outside
 * meshBuffer.recalcNormals(true, false);
 * // Both parameters can be omitted, setting both to false
 * meshBuffer.recalcNormals();
 */
MeshBuffer.prototype.recalcNormals = function(flat, inward) {
  flat = typeof flat === "undefined" || flat === null ? false : flat;
  inward = typeof inward === "undefined" || inward === null ? false : inward;
  const primtype = this.primitiveType();
  if(primtype === MeshBuffer.TRIANGLES) {
    if(this._countPerValue(Semantic.POSITION) < 3) {
      return this;
    }
    this._makeRedundant();
    const positions = this.getAttribute(Semantic.POSITION);
    const normals = this._ensureAttribute(Semantic.NORMAL, 0, 3);
    // NOTE: Indices ensured by makeRedundant
    MeshBuffer._recalcNormals(positions, normals, this.indices, flat, inward);
  }
  return this;
};
/** @ignore */
MeshBuffer.prototype._recalcTangents = function() {
  if(this.primitiveType() === MeshBuffer.TRIANGLES) {
    if(this._countPerValue(Semantic.POSITION) < 3 ||
  this._countPerValue(Semantic.NORMAL) < 3 ||
        this._countPerValue(Semantic.TEXCOORD) < 2) {
      return this;
    }
    this._makeRedundant();
    const positions = this.getAttribute(Semantic.POSITION);
    const normals = this.getAttribute(Semantic.NORMAL);
    const texCoords = this.getAttribute(Semantic.TEXCOORD);
    const tangents = this._ensureAttribute(Semantic.TANGENT, 0, 3);
    const bitangents = this._ensureAttribute(Semantic.BITANGENT, 0, 3);
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
 * @param {MeshBuffer} other A mesh to merge into this one. The mesh
 * given in this parameter will remain unchanged.
 * Throws an error if this mesh's primitive type is not the same as
 * the other mesh's primitive type.
 * @returns {MeshBuffer} This object.
 * @example
 * var copiedMesh = new MeshBuffer().merge(meshToCopy);
 */
MeshBuffer.prototype.merge = function(other) {
  const newAttributes = [];
  let newAttribute;
  let attr;
  let oattr;
  let existingAttribute;
  if(!other)throw new Error();
  if(this._primitiveType !== other._primitiveType) {
    // Primitive types are different
    throw new Error();
  }
  if(other.indices.length === 0) {
    // Nothing to merge into this one, just return
    return this;
  } else if(this.indices && this.indices.length === 0) {
    let empty = true;
    let i;
    for (i = 0; i < this.attributes.length; i++) {
      attr = this.attributes[i][2];
      empty = empty && (typeof attr === "undefined" || attr === null || attr.count() === 0);
    }
    if(empty) {
      // If this object is empty, copy the attributes and
      // indices from the other object
      let i;
      for (i = 0; i < other.attributes.length; i++) {
        const o = other.attributes[i];
        newAttributes.push([o[0], o[1], o[2].copy()]);
      }
      this._bounds = null;
      this._primitiveType = other._primitiveType;
      this.attributes = newAttributes;
      // NOTE: Copies the index buffer
      if(typeof other.indices === "undefined" || other.indices === null) {
        this.indices = null;
        this.ensureIndices();
      } else {
        this.setIndices(other.indices.slice(0, other.indices.length));
      }
      return this;
    }
  }
  this.ensureIndices();
  other.ensureIndices();
  let i;
  for (i = 0; i < this.attributes.length; i++) {
    existingAttribute = null;
    newAttribute = null;
    attr = this.attributes[i];
    const sem = attr[0];
    const semIndex = attr[1];
    let j;
    for (j = 0; j < other.attributes.length; j++) {
      const oattr = other.attributes[j];
      if(oattr[0] === sem && oattr[1] === semIndex) {
        existingAttribute = oattr[2];
        break;
      }
    }
    newAttribute = BufferAccessor.merge(attr[2], this.indices, existingAttribute, other.indices);
    if(!newAttribute)throw new Error();
    newAttributes.push([sem, semIndex, newAttribute]);
  }

  for (i = 0; i < other.attributes.length; i++) {
    existingAttribute = null;
    oattr = other.attributes[i];
    let j;
    for (j = 0; j < this.attributes.length; j++) {
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
  const newIndices = BufferAccessor.makeIndices(this.indices.length + other.indices.length);
  this._bounds = null;
  this.attributes = newAttributes;
  this.setIndices(newIndices);
  return this;
};

/**
 * Transforms the positions and normals of all the vertices currently
 * in this mesh, with the help of a [4x4 matrix]{@tutorial glmath}. Only values with the attribute semantic <code>POSITION_0</code>
 * or <code>NORMAL_0</code> will be affected by this method; values of
 * other attributes will be unaffected.
 * @param {Array<number>} matrix A 4x4 matrix described in
 * the {@link MathUtil.mat4projectVec3} method. The normals will be transformed using the
 * 3x3 inverse transpose of this matrix (see {@link MathUtil.mat4inverseTranspose3}).
 * (Normals need to be transformed specially because they describe directions, not points.)
 * @returns {MeshBuffer} This object.
 * @example <caption>The following example transforms positions
 * and normals to move the mesh 2 units to the right.</caption>
 * mesh.transform(MathUtil.mat4translated(2, 0, 0));
 * @example <caption>The following example transforms positions
 * and normals to double the mesh's size.</caption>
 * mesh.transform(MathUtil.mat4scaled(2, 2, 2));
 */
MeshBuffer.prototype.transform = function(matrix) {
  const positionAttribute = this.getAttribute(Semantic.POSITION);
  if(!positionAttribute) {
    return this;
  }
  const normalAttribute = this.getAttribute(Semantic.NORMAL);
  const isNotLinearIdentity = !(matrix[0] === 1 && matrix[1] === 0 &&
    matrix[2] === 0 && matrix[4] === 0 && matrix[5] === 1 &&
    matrix[6] === 0 && matrix[8] === 0 && matrix[9] === 0 && matrix[10] === 1);
  let matrixForNormals = null;
  if(typeof normalAttribute !== "undefined" && normalAttribute !== null && isNotLinearIdentity) {
    matrixForNormals = MathUtil.mat4inverseTranspose3(matrix);
  }
  let count = positionAttribute.count();
  if(normalAttribute)count = Math.min(count, normalAttribute.count());
  const position = [0, 0, 0];
  const normal = [0, 0, 0];
  let i;
  for (i = 0; i < count; i++) {
    positionAttribute.getVec(i, position);
    let xform = MathUtil.mat4projectVec3(matrix,
      position[0], position[1], position[2]);
    positionAttribute.setVec(i, xform);
    if(normalAttribute && isNotLinearIdentity && (typeof matrixForNormals !== "undefined" && matrixForNormals !== null)) {
      // Transform and normalize the normals
      // (using a modified matrix) to ensure
      // they point in the correct direction
      normalAttribute.getVec(i, normal);
      xform = MathUtil.mat3transform(matrixForNormals,
        normal[0], normal[1], normal[2]);
      MathUtil.vec3normalizeInPlace(xform);
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
    const tmp = f1; f1 = f2; f2 = tmp;
  }
  const e = existingLines[f1];
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
 * Converts the triangles in this mesh to line segments.
 * Has no effect if this mesh doesn't use triangles as primitives.
 * @returns {MeshBuffer} This object.
 */
MeshBuffer.prototype.wireFrame = function() {
  if(this.primitiveType() !== MeshBuffer.TRIANGLES) {
    // Not a triangle mesh
    return this;
  }
  const lineIndices = [];
  const existingLines = {};
  const primitive = [];
  const primcount = this.primitiveCount();
  let i;
  for (i = 0; i < primcount; i++) {
    this.vertexIndices(i, primitive);
    const f1 = primitive[0];
    const f2 = primitive[1];
    const f3 = primitive[2];
    MeshBuffer._addLine(lineIndices, existingLines, f1, f2);
    MeshBuffer._addLine(lineIndices, existingLines, f2, f3);
    MeshBuffer._addLine(lineIndices, existingLines, f3, f1);
  }
  return this.setIndices(lineIndices)
    .setType(MeshBuffer.LINES);
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
    let empty = true;
    const inf = Number.POSITIVE_INFINITY;
    const ret = [inf, inf, inf, -inf, -inf, -inf];
    const posattr = this.getAttribute(Semantic.POSITION, 0);
    if(!posattr)return ret;
    const indices = [];
    const vec = [0, 0, 0];
    const primcount = this.primitiveCount();
    let j;
    for (j = 0; j < primcount; j++) {
      this.vertexIndices(j, indices);
      const primitive = [];
      let k;
      for (k = 0; k < indices.length; k++) {
        const v = posattr.getVec(indices[k], vec);
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
 * @returns {number} Either {@link MeshBuffer.TRIANGLES},
 * {@link MeshBuffer.LINES}, or {@link MeshBuffer.POINTS}.
 */
MeshBuffer.prototype.primitiveType = function() {
  return this._primitiveType;
};
/**
 * Gets the number of vertices in this mesh buffer, that
 * is, the number of vertex indices in its index buffer (some of which
 * may be duplicates), or if there is no index buffer, the lowest maximum
 * number of items that a buffer attribute can hold.
 * @returns {number} Return value.
 */
MeshBuffer.prototype.vertexCount = function() {
  if(typeof this.indices === "undefined" || this.indices === null) {
    let mincount = 0;
    let i;
    for (i = 0; i < this.attributes.length; i++) {
      const a = this.attributes[i][2];
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
    let wka = MeshBuffer._wellKnownAttributes[name];
    if(typeof wka === "undefined" || wka === null) {
      const io = name.indexOf("_");
      if(io < 0) {
        return null;
      }
      wka = MeshBuffer._wellKnownAttributes[name.substr(0, io)];
      if(typeof wka === "undefined" || wka === null) {
        return null;
      }
      const number = name.substr(io + 1);
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
/** Indicates that a mesh buffer contains line segments; the mesh
 * buffer stores each line segment using two consecutive vertices.
 * @constant
 * @default
 * @static */
MeshBuffer.LINES = 1;
/** Indicates that a mesh buffer contains triangles; the mesh
 * buffer stores each triangle using three consecutive vertices.
 * @constant
 * @default
 * @static */
MeshBuffer.TRIANGLES = 4;
/** Indicates that a mesh buffer contains points; the mesh
 * buffer stores each point using one vertex.
 * @constant
 * @default
 * @static */
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

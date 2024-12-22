/*
 Any copyright to this file is released to the Public Domain.
 In case this is not possible, this file is also licensed under the Unlicense: https://unlicense.org/
*/

/* global Float32Array, Uint16Array, Uint32Array */

import {BufferAccessor} from "./h3du-bufferaccessor.js";
import {MathUtil} from "./h3du-math.js";
import {Semantic} from "./h3du-semantic.js";
import {toGLColor} from "./h3du-misc.js";
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
 * @deprecated It is planned to render this class obsolete and rely on three.js's BufferGeometry.
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
 * consisting of a 10 &times; 10 &times; 3 grid of points. This mesh buffer can serve, for
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

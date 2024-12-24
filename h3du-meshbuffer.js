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
export const MeshBuffer = function() {};

/**
 * Gets an array of vertex positions held by this mesh buffer,
 * arranged by primitive.
 * Only values with the attribute semantic <code>POSITION_0</code> are returned.
 * @returns {Array<Array<number>>} An array of primitives,
 * each of which holds the vertices that make up that primitive.
 * If this mesh holds triangles, each primitive will contain three
 * vertices; if lines, two; and if points, one. Each vertex is an array containing that vertex's-coordinates (for example, if the attribute holds 3 elements per value, the coordinates are x-, y-, and Z coordinates, in that order).
 */
/*
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
};*/

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

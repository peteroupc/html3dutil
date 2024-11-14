/*
 Any copyright to this file is released to the Public Domain.
 In case this is not possible, this file is also licensed under the Unlicense: https://unlicense.org/
*/

/** The <code>extras/pathtomesh.js</code> module.
 * To import all symbols in this module, either of the following can be used:
 * <pre>
 * import * from "extras/pathtomesh.js";
 * // -- or --
 * import * as CustomModuleName from "extras/pathtomesh.js";</pre>
 * @module extras/pathtomesh */

import {MathUtil} from "../h3du_module.js";
import {GraphicsPath} from "../h3du_path.js";

// TODO: Adjust to use three.js

/**
 * Decomposes this path into triangles and generates a mesh
 * buffer with those triangles. Each triangle's normal will point
 * toward the Z axis, and each triangle vertex's texture coordinates will
 * be the same as that vertex's position.
 * @param {number} [z] The Z coordinate of each triangle generated.
 * If null, undefined, or omitted, default is 0.
 * @param {number} [flatness] When curves and arcs
 * are decomposed to line segments, the
 * segments will be close to the true path of the curve by this
 * value, given in units. If null, undefined, or omitted, default is 1.
 * @returns {MeshBuffer} The resulting mesh buffer.
 * @function
 */
export const toMeshBuffer = function(path, z, flatness) {
  if(typeof z === "undefined" || z === null)z = 0;
  const tris = getTriangles(path, flatness);
  const vertices = [];
  let i;
  for (i = 0; i < tris.length; i++) {
    const tri = tris[i];
    // Position X, Y, Z; Normal NX, NY, NZ; texture U, V
    vertices.push(
      tri[0], tri[1], z, 0, 0, 1, tri[0], tri[1],
      tri[2], tri[3], z, 0, 0, 1, tri[2], tri[3],
      tri[4], tri[5], z, 0, 0, 1, tri[4], tri[5]);
  }
  return MeshBuffer.fromPositionsNormalsUV(vertices);
};
/**
 * Generates a mesh buffer consisting of the approximate line segments that make up this graphics path.
 * @param {number} [z] Z coordinate for each line segment. If null, undefined, or omitted, the default is 0.
 * @param {number} [flatness] When curves and arcs
 * are decomposed to line segments, the
 * segments will be close to the true path of the curve by this
 * value, given in units. If null, undefined, or omitted, default is 1.
 * @returns {MeshBuffer} The resulting mesh buffer.
 * @function
 */
export const toLineMeshBuffer = function(z, flatness) {
  if(typeof z === "undefined" || z === null)z = 0;
  const lines = getLines(path, flatness);
  const vertices = [];
  let i;
  for (i = 0; i < lines.length; i++) {
    const line = lines[i];
    vertices.push(line[0], line[1], z,
      line[2], line[3], z);
  }
  return MeshBuffer.fromPositions(vertices).setType(
    MeshBuffer.LINES);
};
/**
 * Generates a mesh buffer consisting of "walls" that follow this graphics path approximately, and, optionally, a base and top.
 * @param {number} zStart Starting Z coordinate of the mesh buffer's "walls".
 * @param {number} zEnd Ending Z coordinate of the mesh buffer's "walls".
 * @param {number} [flatness] When curves and arcs
 * are decomposed to line segments, the
 * segments will be close to the true path of the curve by this
 * value, given in units. If null, undefined, or omitted, default is 1.
 * @param {boolean} [closed] If true, the generated mesh buffer will include a base and top. If null, undefined, or omitted, the default is false.
 * @returns {MeshBuffer} The resulting mesh buffer.
 * @function
 */
export const toExtrudedMeshBuffer = function(zStart, zEnd, flatness, closed) {
  if((typeof zStart === "undefined" || zStart === null) || zEnd === null)throw new Error();
  const isclosed = typeof closed === "undefined" || closed === null ? false : closed;
  if(isclosed) {
    const mesh = new MeshBuffer();
    mesh.merge(toExtrudedMeshBuffer(path, zStart, zEnd, flatness, false));
    mesh.merge(toMeshBuffer(path, zEnd, flatness));
    mesh.merge(toMeshBuffer(path, zStart, flatness).reverseWinding().reverseNormals());
    return mesh;
  }
  const lines = this.getLines(flatness);
  const z1 = Math.min(zStart, zEnd);
  const z2 = Math.max(zStart, zEnd);
  const vertices = [];
  let i;
  for (i = 0; i < lines.length; i++) {
    const line = lines[i];
    const dx = line[2] - line[0];
    const dy = line[3] - line[1];
    const dot = dx * dx + dy * dy;
    if(dot === 0)continue;
    vertices.push(line[0], line[1], z1,
      line[2], line[3], z1,
      line[0], line[1], z2,
      line[2], line[3], z1,
      line[2], line[3], z2,
      line[0], line[1], z2);
  }
  return MeshBuffer.fromPositions(vertices)
    .recalcNormals(true);
};

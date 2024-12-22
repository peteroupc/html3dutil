/*
 Any copyright to this file is released to the Public Domain.
 In case this is not possible, this file is also licensed under the Unlicense: https://unlicense.org/
*/

/** The <code>extras/createwasher.js</code> module.
 * To import all symbols in this module, either of the following can be used:
 * <pre>
 * import * from "extras/createwasher.js";
 * // -- or --
 * import * as CustomModuleName from "extras/createwasher.js";</pre>
 * @module extras/createwasher */

import {MathUtil, Meshes} from "../h3du-module.js";
/**
 * TODO: Not documented yet.
 * @param {*} inner
 * @param {*} outer
 * @param {*} height
 * @param {*} slices
 * @returns {*} Return value.
 * @function
 */
export const createWasher = function(three,inner, outer, height, slices) {
  const innerCylinder = Meshes.createCylinder(three,inner, inner, height, slices, 1, false, true);
  const outerCylinder = Meshes.createCylinder(three,outer, outer, height, slices, 1, false, false);
  const base = Meshes.createDisk(three,inner, outer, slices, 2, true).reverseWinding();
  const top = Meshes.createDisk(three,inner, outer, slices, 2, false);
  // move the top disk to the top of the cylinder
  top.transform(MathUtil.mat4translated(0, 0, height));
  // merge the base and the top
  return three.BufferGeometryUtils.mergeGeometries([innerCylinder,outerCylinder,base,top],false);
};

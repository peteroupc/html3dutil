/*
 Any copyright to this file is released to the Public Domain.
 http://creativecommons.org/publicdomain/zero/1.0/
 If you like this, you should donate
 to Peter O. (original author of
 the Public Domain HTML 3D Library) at:
 http://peteroupc.github.io/
*/
/* global console */

import {MathUtil} from "./h3du-math";
import {Transform} from "./h3du-transform";

/**
 * An object that associates a geometric mesh (the shape of the object) with
 * material data (which defines what is seen on the object's surface)
 * and a transformation matrix (which defines the object's position and size).
 * See the "{@tutorial shapes}" tutorial.<p>
 * NOTE: The default shader program assumes that all colors and the diffuse texture
 * specified in this object are in
 * [companded sRGB]{@link MathUtil.colorTosRGB}.
 * @constructor
 * @memberof H3DU
 * @param {MeshBuffer} mesh A mesh in the form of a buffer object.
 * Cannot be null.
 */
export var Shape = function(mesh) {
  if(typeof mesh === "undefined" || mesh === null)throw new Error("mesh is null");
  this.meshBuffer = mesh;
  this.transform = new Transform();
  this.parent = null;
  this.visible = true;
};
/**
 * Returns a reference to the mesh buffer used by this shape.
 * @returns {MeshBuffer} Return value.
 */
Shape.prototype.getMeshBuffer = function() {
  return this.meshBuffer;
};
/** @ignore */
Shape._meshBufferWarning = false;
/**
 * Gets the number of vertices composed by
 * all shapes in this scene.
 * @returns {number} Return value.
 */
Shape.prototype.vertexCount = function() {
  return this.meshBuffer ? this.meshBuffer.vertexCount() : 0;
};
/**
 * Gets the number of primitives (triangles, lines,
 * and points) composed by all shapes in this scene.
 * @returns {number} Return value.
 */
Shape.prototype.primitiveCount = function() {
  return this.meshBuffer ? this.meshBuffer.primitiveCount() : 0;
};
/**
 * Sets whether this shape will be drawn on rendering.
 * @param {boolean} value True if this shape will be visible; otherwise, false.
 * @returns {Shape} This object.
 */
Shape.prototype.setVisible = function(value) {
  this.visible = !!value;
  return this;
};
/**
 * Gets whether this shape will be drawn on rendering.
 * @returns {boolean} True if this shape will be visible; otherwise, false.
 */
Shape.prototype.getVisible = function() {
  return this.visible;
};
/**
 * Makes a copy of this object. The copied object
 * will have its own version of the transform and
 * material data, but any texture
 * image data and mesh buffers will not be duplicated,
 * but rather just references to them will be used.
 * The copied shape won't have a parent.
 * @returns {Shape} A copy of this object.
 */
Shape.prototype.copy = function() {
  const ret = new Shape(this.meshBuffer);
  ret.visible = this.visible;
  ret.parent = null;
  ret.transform = this.getTransform().copy();
  return ret;
};
/**
 * Returns the transform used by this shape object.
 * The transform won't be copied.
 * @returns {Transform} Return value.
 */
Shape.prototype.getTransform = function() {
  return this.transform;
};
/**
 * Finds a bounding box that holds all vertices in this shape.
 * The bounding box is not guaranteed to be the
 * tightest, and the box will be transformed to world space
 * using this object's transform.
 * @returns {Array<number>} An array of six numbers describing an
 * axis-aligned bounding box
 * that fits all vertices in the shape. The first three numbers
 * are the smallest-valued X, Y, and Z coordinates, and the
 * last three are the largest-valued X, Y, and Z coordinates.
 * If the shape has no vertices, returns the array [Inf, Inf, Inf, -Inf,
 * -Inf, -Inf].
 */
Shape.prototype.getBounds = function() {
  if(!this.meshBuffer) {
    const inf = Number.POSITIVE_INFINITY;
    return [inf, inf, inf, -inf, -inf, -inf];
  }
  const bounds = this.meshBuffer.getBounds();
  if(MathUtil.boxIsEmpty(bounds))return bounds;
  const matrix = this.getMatrix();
  if(MathUtil.mat4isIdentity(matrix)) {
    return bounds.slice(0, 6);
  } else if(matrix[1] === 0 && matrix[2] === 0 && matrix[3] === 0 &&
    matrix[4] === 0 && matrix[6] === 0 && matrix[7] === 0 && matrix[8] === 0 &&
    matrix[9] === 0 && matrix[11] === 0 && matrix[15] === 1) {
    // just a scale and/or translate
    const ret = [];
    const t2 = matrix[0];
    const t3 = matrix[12];
    ret[0] = t2 * bounds[0] + t3;
    const t4 = matrix[5];
    const t5 = matrix[13];
    ret[1] = t4 * bounds[1] + t5;
    const t6 = matrix[10];
    const t7 = matrix[14];
    ret[2] = t6 * bounds[2] + t7;
    const ret2 = [t2 * bounds[3] + t3, t4 * bounds[4] + t5, t6 * bounds[5] + t7];
    return [
      Math.min(ret[0], ret2[0]),
      Math.min(ret[1], ret2[1]),
      Math.min(ret[2], ret2[2]),
      Math.max(ret[0], ret2[0]),
      Math.max(ret[1], ret2[1]),
      Math.max(ret[2], ret2[2])
    ];
  } else {
    // rotation, shear, and/or non-affine transformation
    const boxVertices = [
      MathUtil.mat4projectVec3(matrix, bounds[0], bounds[1], bounds[2]),
      MathUtil.mat4projectVec3(matrix, bounds[0], bounds[1], bounds[5]),
      MathUtil.mat4projectVec3(matrix, bounds[0], bounds[4], bounds[2]),
      MathUtil.mat4projectVec3(matrix, bounds[0], bounds[4], bounds[5]),
      MathUtil.mat4projectVec3(matrix, bounds[3], bounds[1], bounds[2]),
      MathUtil.mat4projectVec3(matrix, bounds[3], bounds[1], bounds[5]),
      MathUtil.mat4projectVec3(matrix, bounds[3], bounds[4], bounds[2]),
      MathUtil.mat4projectVec3(matrix, bounds[3], bounds[4], bounds[5])
    ];
    let bv = boxVertices[0];
    const retval = [bv[0], bv[1], bv[2], bv[0], bv[1], bv[2]];
    for(let i = 1; i < 8; i++) {
      bv = boxVertices[i];
      retval[0] = Math.min(retval[0], bv[0]);
      retval[1] = Math.min(retval[1], bv[1]);
      retval[2] = Math.min(retval[2], bv[2]);
      retval[3] = Math.max(retval[3], bv[0]);
      retval[4] = Math.max(retval[4], bv[1]);
      retval[5] = Math.max(retval[5], bv[2]);
    }
    return retval;
  }
};
/** @ignore */
Shape.prototype.isCulled = function(frustum) {
  if(!this.meshBuffer || !this.visible)return true;
  return !MathUtil.frustumHasBox(frustum, this.getBounds());
};
/**
 * Sets this shape's transformation
 * to a copy of the given transformation.
 * @param {Transform} transform The transformation to
 * set to a copy of.
 * @returns {Shape} This object.
 */
Shape.prototype.setTransform = function(transform) {
  this.transform = transform.copy();
  return this;
};
/**
 * Sets the scale of this shape relative to its original
 * size. See {@link Transform#setScale}
 * @param {number|Array<number>} x Scaling factor for this object's width,
 * or a 3-element scaling array, as specified in {@link Transform#setScale}.
 * @param {number} y Scaling factor for this object's height.
 * @param {number} z Scaling factor for this object's depth.
 * @returns {Shape} This object.
 */
Shape.prototype.setScale = function(x, y, z) {
  this.getTransform().setScale(x, y, z);
  return this;
};
/**
 * Sets the relative position of this shape from its original
 * position. See {@link Transform#setPosition}
 * @param {number|Array<number>} x X coordinate
 * or a 3-element position array, as specified in {@link Transform#setScale}.
 * @param {number} y Y coordinate.
 * @param {number} z Z coordinate.
 * @returns {Shape} This object.
 */
Shape.prototype.setPosition = function(x, y, z) {
  this.getTransform().setPosition(x, y, z);
  return this;
};
/**
 * Sets this object's rotation in the form of a [quaternion]{@tutorial glmath}.
 * See {@link Transform#setQuaternion}.
 * @param {Array<number>} quat A four-element array describing the rotation.
 * @returns {Shape} This object.
 */
Shape.prototype.setQuaternion = function(quat) {
  this.getTransform().setQuaternion(quat);
  return this;
};
/**
 * Gets the transformation matrix used by this shape.
 * See {@link Transform#getMatrix}.
 * @returns {Array<number>} The current transformation matrix.
 */
Shape.prototype.getMatrix = function() {
  const xform = this.getTransform();
  const thisIdentity = xform.isIdentity();
  let mat;
  if(typeof this.parent === "undefined" || this.parent === null) {
    mat = xform.getMatrix();
  } else {
    const pmat = this.parent.getMatrix();
    if(thisIdentity) {
      mat = pmat;
    } else if(MathUtil.mat4isIdentity(pmat)) {
      mat = xform.getMatrix();
    } else {
      mat = MathUtil.mat4multiply(pmat, xform.getMatrix());
    }
  }
  return mat;
};

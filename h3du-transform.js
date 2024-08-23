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

import {MathUtil} from "./h3du-math";
/**
 * A class offering a convenient way to set a transformation
 * from one coordinate system to another.
 * @constructor
 */
export const Transform = function() {
  /** @ignore */
  this.scale = [1, 1, 1];
  /** @ignore */
  this.position = [0, 0, 0];
  /** @ignore */
  this.rotation = MathUtil.quatIdentity();
  /** @ignore */
  this.complexMatrix = false;
  /** @ignore */
  this._matrixDirty = false;
  /** @ignore */
  this._isIdentity = true;
  /** @ignore */
  this.matrix = MathUtil.mat4identity();
};
  /**
   * Returns a copy of a three-element array giving the scaling for an object's width,
   * height, and depth, respectively.
   * For each component, 1 means no scaling.
   * @returns {Array<number>} Return value.
   */
Transform.prototype.getScale = function() {
  if(this.complexMatrix) {
    return [this.matrix[0], this.matrix[5], this.matrix[10]];
  } else {
    return this.scale.slice(0, 3);
  }
};
/**
 * Returns a copy of a three-element array giving the X, Y, and Z coordinates of the position
 * of an object relative to its original position.
 * @returns {Array<number>} Return value.
 */
Transform.prototype.getPosition = function() {
  if(this.complexMatrix) {
    return [this.matrix[12], this.matrix[13], this.matrix[14]];
  } else {
    return this.position.slice(0, 3);
  }
};
/**
 * Returns a copy of the rotation of an object in the form of a [quaternion]{@tutorial glmath}.
 * @returns {Array<number>} Return value.
 */
Transform.prototype.getQuaternion = function() {
  if(this.complexMatrix) {
    return MathUtil.quatNormalizeInPlace(
      MathUtil.quatFromMat4(this.matrix));
  } else {
    return this.rotation.slice(0, 4);
  }
};
/**
 * Resets this transform to the untransformed state.
 * @returns {Transform} This object.
 */
Transform.prototype.reset = function() {
  this.matrix = MathUtil.mat4identity();
  this.position = [0, 0, 0];
  this.scale = [1, 1, 1];
  this.rotation = MathUtil.quatIdentity();
  this.complexMatrix = false;
  this._matrixDirty = false;
  this._isIdentity = true;
  return this;
};
/**
 * Sets this transform's transformation matrix. This method
 * will set the position, rotation, and scale properties
 * accordingly to the matrix given.
 * @param {Array<number>} value A 4x4 matrix.
 * This method will copy the value of this parameter.
 * @returns {Transform} This object.
 */
Transform.prototype.setMatrix = function(value) {
  this._matrixDirty = false;
  this.complexMatrix = true;
  this.matrix = value.slice(0, 16);
  this.position = [this.matrix[12], this.matrix[13], this.matrix[14]];
  this.rotation = MathUtil.quatFromMat4(this.matrix);
  this.rotation = MathUtil.quatNormalizeInPlace(this.rotation);
  this.scale = [this.matrix[0], this.matrix[5], this.matrix[10]];
  this._isIdentity =
    value[0] === 1 && value[1] === 0 && value[2] === 0 && value[3] === 0 &&
    value[4] === 0 && value[5] === 1 && value[6] === 0 && value[7] === 0 &&
    value[8] === 0 && value[9] === 0 && value[10] === 1 && value[11] === 0 &&
    value[12] === 0 && value[13] === 0 && value[14] === 0 && value[15] === 1
  ;
  return this;
};
/**
 * Returns whether this transform is the identity transform.
 * @returns {boolean} Return value.
 */
Transform.prototype.isIdentity = function() {
  if(this._matrixDirty) {
    if(this.complexMatrix) {
      this.getMatrix();
    } else {
      return this.position[0] === 0 && this.position[1] === 0 &&
    this.position[2] === 0 && this.scale[0] === 1 &&
    this.scale[1] === 1 && this.scale[2] === 1 &&
    MathUtil.quatIsIdentity(this.rotation);
    }
  }
  return this._isIdentity;
};
/**
 * Sets the scale of an object relative to its original
 * size. Has no effect if a matrix was defined with {@link Transform#setMatrix}
 * and the transform wasn't reset yet with {@link Transform#resetTransform}.
 * @param {number|Array<number>} x X axis scaling factor for this transform.
 *   If "y" and "z" are null, undefined, or omitted, this is instead
 * a 3-element array giving the scaling factors
 * for X, Y, and Z dimensions, respectively, or a single number
 * giving the scaling factor for all three dimensions.
 * @param {number} [y] Y axis scaling factor for this transform.
 * @param {number} [z] Z axis scaling factor for this transform.
 * @returns {Transform} This object.
 * @example
 * // scale coordinates by 2x in all axes
 * transform.setScale(2,2,2);
 * // same, but passing an array
 * transform.setScale([2,2,2]);
 */
Transform.prototype.setScale = function(x, y, z) {
  if(this.complexMatrix)return this;
  if(typeof x !== "undefined" && x !== null && (typeof y === "undefined" || y === null) && (typeof z === "undefined" || z === null)) {
    if(typeof x !== "number")
      this.scale = [x[0], x[1], x[2]];
    else
      this.scale = [x, x, x];
  } else {
    this.scale = [x, y, z];
  }
  this._isIdentity = this._isIdentity &&
   this.scale[0] === 1 &&
   this.scale[1] === 1 &&
   this.scale[2] === 1;
  this._matrixDirty = true;
  return this;
};
/**
 * Sets the relative position of an object from its original
 * position. Has no effect if a matrix was defined with {@link Transform#setMatrix}
 * and the transform wasn't reset yet with {@link Transform#resetTransform}.
 * @param {Array<number>|number} x The X coordinate.
 *   If "y" and "z" are null, undefined, or omitted, this is instead
 * a 3-element array giving the X, Y, and Z coordinates, or a single number
 * giving the coordinate for all three dimensions.
 * @param {number} [y] The Y coordinate.
 * If "x" is an array, this parameter may be omitted.
 * @param {number} [z] The Z coordinate.
 * If "x" is an array, this parameter may be omitted.
 * @returns {Transform} This object.
 * @example
 * // Set the relative position to 2 units along X axis, 4 units along Y axis,
 * // and 5 units along Z axis
 * transform.setPosition(2,4,5);
 * // same, but passing an array
 * transform.setPosition([2,4,5]);
 */
Transform.prototype.setPosition = function(x, y, z) {
  if(this.complexMatrix)return this;
  if(typeof x !== "undefined" && x !== null && (typeof y === "undefined" || y === null) && (typeof z === "undefined" || z === null)) {
    if(typeof x !== "number")
      this.position = [x[0], x[1], x[2]];
    else
      this.position = [x, x, x];
  } else {
    this.position = [x, y, z];
  }
  this._isIdentity = this._isIdentity &&
   this.position[0] === 0 &&
   this.position[1] === 0 &&
   this.position[2] === 0;
  this._matrixDirty = true;
  return this;
};

/**
 * Moves the relative position of an object from its original
 * position. Has no effect if a matrix was defined with {@link Transform#setMatrix}
 * and the transform wasn't reset yet with {@link Transform#resetTransform}.
 * @param {Array<number>|number} x Number to add to the X coordinate,
 *   If "y" and "z" are null, undefined, or omitted, this is instead
 * a 3-element array giving the numbers to add to the X, Y, and Z coordinates, or a single number
 * to add to all three coordinates.
 * @param {number} y Number to add to the Y coordinate.
 * If "x" is an array, this parameter may be omitted.
 * @param {number} z Number to add to the Z coordinate.
 * If "x" is an array, this parameter may be omitted.
 * @returns {Transform} This object.
 */
Transform.prototype.movePosition = function(x, y, z) {
  if(this.complexMatrix)return this;
  if(typeof x !== "undefined" && x !== null && (typeof y === "undefined" || y === null) && (typeof z === "undefined" || z === null)) {
    if(typeof x !== "number") {
      this.position[0] += x[0];
      this.position[1] += x[1];
      this.position[2] += x[2];
    } else {
      this.position[0] += x;
      this.position[1] += x;
      this.position[2] += x;
    }
  } else {
    this.position[0] += x;
    this.position[1] += y;
    this.position[2] += z;
  }
  this._isIdentity = this._isIdentity &&
   this.position[0] === 0 &&
   this.position[1] === 0 &&
   this.position[2] === 0;
  this._matrixDirty = true;
  return this;
};
/**
 * Sets this transform's rotation in the form of a [quaternion]{@tutorial glmath} (a 4-element array
 * for describing 3D rotations). Has no effect if a matrix was defined with {@link Transform#setMatrix}
 * and the transform wasn't reset yet with {@link Transform#resetTransform}.
 * @param {Array<number>} quat A four-element array describing the rotation.
 * A quaternion is returned from the methods {@link MathUtil.quatFromAxisAngle}
 * and {@link MathUtil.quatFromTaitBryan}, among others.
 * @returns {Transform} This object.
 * @example
 * // Set an object's rotation to 30 degrees about the X axis
 * transform.setQuaternion(MathUtil.quatFromAxisAngle(20,1,0,0));
 * // Set an object's rotation to identity (the object isn't transformed)
 * transform.setQuaternion(MathUtil.quatIdentity());
 * // Set an object's rotation to 30 degree pitch multiplied
 * // by 40 degree roll
 * transform.setQuaternion(MathUtil.quatFromTaitBryan(30,0,40));
 * // Set an object's rotation to 40 units about X axis, 20 units about Y axis,
 * // and 50 units about Z axis
 * transform.setQuaternion(H3DU.MathUtil.quatFromTaitBryan(40,20,50));
 * // Set an object's rotation to 20 units about Y axis
 * transform.setQuaternion(H3DU.MathUtil.quatFromAxisAngle(20,0,1,0));
 */
Transform.prototype.setQuaternion = function(quat) {
  if(this.complexMatrix)return this;
  this.rotation = quat.slice(0, 4);
  MathUtil.quatNormalizeInPlace(this.rotation);
  this._matrixDirty = true;
  return this;
};
/**
 * Sets this transform's rotation in the form of an angle and an axis of
 * rotation. Has no effect if a matrix was defined with {@link Transform#setMatrix}
 * and the transform wasn't reset yet with {@link Transform#resetTransform}.
 * @param {Array<number>|number} angle The desired angle
 * to rotate in degrees.  If "v", "vy", and "vz" are omitted, this can
 * instead be a 4-element array giving the axis
 * of rotation as the first three elements, followed by the angle
 * in degrees as the fourth element. If the axis of rotation
 * points backward from the "eye", a positive value means the angle runs in
 * a counterclockwise direction for right-handed coordinate systems and
 * in a clockwise direction for left-handed systems.
 * @param {Array<number>|number} v X-component of the point lying on the axis
 * of rotation.  If "vy" and "vz" are omitted, this can
 * instead be a 3-element array giving the axis
 * of rotation in x, y, and z, respectively.
 * @param {number} vy Y-component of the point lying on the axis
 * of rotation.
 * @param {number} vz Z-component of the point lying on the axis
 * of rotation.
 * @returns {Transform} This object.
 */
Transform.prototype.setRotation = function(angle, v, vy, vz) {
  return this.setQuaternion(MathUtil.quatFromAxisAngle(angle, v, vy, vz));
};

/**
 * Combines an object's current rotation with another rotation
 * described by a [quaternion]{@tutorial glmath} (a 4-element array
 * for describing 3D rotations). The combined rotation will have the
 * same effect as the new rotation followed by the existing rotation.
 * Has no effect if a matrix was defined with {@link Transform#setMatrix}
 * and the transform wasn't reset yet with {@link Transform#resetTransform}.
 * @param {Array<number>} quat A four-element array describing the rotation.
 * A quaternion is returned from the methods {@link MathUtil.quatFromAxisAngle}
 * or {@link MathUtil.quatFromTaitBryan}.
 * @returns {Transform} This object.
 * @example
 * // Combine an object's rotation with a rotation 20 degrees about the X axis
 * transform.multQuaternion(MathUtil.quatFromAxisAngle(20,1,0,0));
 * // Combine an object's rotation with identity
 * transform.multQuaternion(MathUtil.quatIdentity());
 * // Combine an object's rotation with 30 degree pitch multiplied
 * // by 40 degree roll
 * transform.multQuaternion(MathUtil.quatFromTaitBryan(30,0,40));
 */
Transform.prototype.multQuaternion = function(quat) {
  if(this.complexMatrix)return this;
  this.rotation = MathUtil.quatNormalizeInPlace(
    MathUtil.quatMultiply(this.rotation, quat));
  this._matrixDirty = true;
  return this;
};
/**
 * Combines an object's current rotation with another rotation
 * in the form of an angle and an axis of
 * rotation. The combined rotation will have the
 * same effect as the new rotation followed by the existing rotation.
 * Has no effect if a matrix was defined with {@link Transform#setMatrix}
 * and the transform wasn't reset yet with {@link Transform#resetTransform}.
 * @param {Array<number>|number} angle The desired angle
 * to rotate in degrees. See {@link Transform#setRotation}.
 * @param {Array<number>|number} v X-component of the point lying on the axis
 * of rotation.  If "vy" and "vz" are omitted, this can
 * instead be a 3-element array giving the axis
 * of rotation in x, y, and z, respectively.
 * @param {number} vy Y-component of the point lying on the axis
 * of rotation.
 * @param {number} vz Z-component of the point lying on the axis
 * of rotation.
 * @returns {Transform} This object.
 */
Transform.prototype.multRotation = function(angle, v, vy, vz) {
  return this.multQuaternion(MathUtil.quatFromAxisAngle(angle, v, vy, vz));
};

/**
 * Gets the transformation matrix used by an object. Depending
 * on the state of this transform, will return either:<ul>
 * <li>The 4x4 matrix passed to {@link Transform#setMatrix}, if the
 * matrix was defined with that method
 * and the transform wasn't reset yet with {@link Transform#resetTransform}.
 * <li>The matrix resulting from the position, rotation, and scale properties,
 * multiplied in that order, otherwise.
 * </ul>
 * @returns {Array<number>} Return value.
 */
Transform.prototype.getMatrix = function() {
  if(this._matrixDirty) {
    this._matrixDirty = false;
    if(MathUtil.quatIsIdentity(this.rotation)) {
      this.matrix = [this.scale[0], 0, 0, 0, 0,
        this.scale[1], 0, 0, 0, 0,
        this.scale[2], 0,
        this.position[0],
        this.position[1],
        this.position[2], 1];
      this._isIdentity = this.position[0] === 0 && this.position[1] === 0 &&
     this.position[2] === 0 && this.scale[0] === 1 &&
     this.scale[1] === 1 && this.scale[2] === 1;
    } else {
    // for best results, multiply in this order:
    // 1. translation
      this.matrix = [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0,
        this.position[0],
        this.position[1],
        this.position[2], 1];
      // 2. rotation
      this.matrix = MathUtil.mat4multiply(this.matrix,
        MathUtil.quatToMat4(this.rotation));
      // 3. scaling
      MathUtil.mat4scaleInPlace(this.matrix, this.scale);
      const m = this.matrix;
      this._isIdentity =
     m[0] === 1 && m[1] === 0 && m[2] === 0 && m[3] === 0 &&
     m[4] === 0 && m[5] === 1 && m[6] === 0 && m[7] === 0 &&
     m[8] === 0 && m[9] === 0 && m[10] === 1 && m[11] === 0 &&
     m[12] === 0 && m[13] === 0 && m[14] === 0 && m[15] === 1
      ;
    }
  } else if(this._isIdentity) {
    return MathUtil.mat4identity();
  }
  return this.matrix.slice(0, 16);
};

/**
 * Makes a copy of this transform. The copied object
 * will have its own version of the rotation, scale,
 * position, and matrix data.
 * @returns {Transform} A copy of this transform.
 */
Transform.prototype.copy = function() {
  const ret = new Transform();
  ret.scale = this.scale.slice(0, this.scale.length);
  ret.position = this.position.slice(0, this.scale.length);
  ret.complexMatrix = this.complexMatrix;
  ret._matrixDirty = this._matrixDirty;
  ret.matrix = this.matrix.slice(0, this.matrix.length);
  return ret;
};

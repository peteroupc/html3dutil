/*
 Any copyright to this file is released to the Public Domain.
 http://creativecommons.org/publicdomain/zero/1.0/
 If you like this, you should donate
 to Peter O. (original author of
 the Public Domain HTML 3D Library) at:
 http://peteroupc.github.io/
*/
/* global H3DU */
/**
*  A class offering a convenient way to set a transformation
* from one coordinate system to another.
* @class
* @alias H3DU.Transform
*/
H3DU.Transform = function() {
  "use strict";
  /** @private */

  this.scale = [1, 1, 1];
  /** @private */
  this.position = [0, 0, 0];
  /** @private */
  this.rotation = H3DU.Math.quatIdentity();
  /** @private */
  this.complexMatrix = false;
  /** @private */
  this._matrixDirty = false;
  /** @private */
  this._isIdentity = true;
  /** @private */
  this.matrix = H3DU.Math.mat4identity();
};
  /**
  * Returns a copy of a three-element array giving the scaling for an object's width,
  * height, and depth, respectively.
  * For each component, 1 means no scaling.
  * @returns {Array<Number>} Return value.
* @memberof! H3DU.Transform#
*/
H3DU.Transform.prototype.getScale = function() {
  "use strict";
  if(this.complexMatrix) {
    return [this.matrix[0], this.matrix[5], this.matrix[10]];
  } else {
    return this.scale.slice(0, 3);
  }
};
  /**
  * Returns a copy of a three-element array giving the X, Y, and Z coordinates of the position
  * of an object relative to its original position.
  * @returns {Array<Number>} Return value.
* @memberof! H3DU.Transform#
*/
H3DU.Transform.prototype.getPosition = function() {
  "use strict";
  if(this.complexMatrix) {
    return [this.matrix[12], this.matrix[13], this.matrix[14]];
  } else {
    return this.position.slice(0, 3);
  }
};
  /**
   * Returns a copy of the rotation of an object in the form of a [quaternion]{@tutorial glmath}.
   * @returns {Array<Number>} Return value.
* @memberof! H3DU.Transform#
*/
H3DU.Transform.prototype.getQuaternion = function() {
  "use strict";
  if(this.complexMatrix) {
    return H3DU.Math.quatNormInPlace(
    H3DU.Math.quatFromMat4(this.matrix));
  } else {
    return this.rotation.slice(0, 4);
  }
};
/**
* Resets this transform to the untransformed state.
* @returns {H3DU.Shape} This object.
* @memberof! H3DU.Transform#
*/
H3DU.Transform.prototype.reset = function() {
  "use strict";
  this.matrix = H3DU.Math.mat4identity();
  this.position = [0, 0, 0];
  this.scale = [1, 1, 1];
  this.rotation = H3DU.Math.quatIdentity();
  this.complexMatrix = false;
  this._matrixDirty = false;
  this._isIdentity = true;
  return this;
};
/**
 * Sets this transform's transformation matrix. This method
 * will set the position, rotation, and scale properties
 * accordingly to the matrix given.
 * @param {Array<Number>} value A 4x4 matrix.
 * This method will copy the value of this parameter.
 * @returns {H3DU.Transform} This object.
 * @memberof! H3DU.Transform#
*/
H3DU.Transform.prototype.setMatrix = function(value) {
  "use strict";
  this._matrixDirty = false;
  this.complexMatrix = true;
  this.matrix = value.slice(0, 16);
  this.position = [this.matrix[12], this.matrix[13], this.matrix[14]];
  this.rotation = H3DU.Math.quatFromMat4(this.matrix);
  this.rotation = H3DU.Math.quatNormInPlace(this.rotation);
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
 * @returns {Boolean} Return value.
* @memberof! H3DU.Transform#
*/
H3DU.Transform.prototype.isIdentity = function() {
  "use strict";
  if(this._matrixDirty) {
    if(this.complexMatrix) {
      this.getMatrix();
    } else {
      return this.position[0] === 0 && this.position[1] === 0 &&
    this.position[2] === 0 && this.scale[0] === 1 &&
    this.scale[1] === 1 && this.scale[2] === 1 &&
    H3DU.Math.quatIsIdentity(this.rotation);
    }
  }
  return this._isIdentity;
};
/**
* Resets this transform to the untransformed state.
* @deprecated Use the "reset" method instead.
* @returns {H3DU.Transform} This object.
* @memberof! H3DU.Transform#
*/
H3DU.Transform.prototype.resetTransform = function() {
  "use strict";
  return this.reset();
};
/**
 * Sets the scale of an object relative to its original
 * size. Has no effect if a matrix was defined with {@link H3DU.Transform#setMatrix}
 * and the transform wasn't reset yet with {@link H3DU.Transform#resetTransform}.
 * @param {number|Array<Number>} x Scaling factor for this transform's width.
 *   If "y" and "z" are null or omitted, this is instead
 *  a 3-element array giving the scaling factors
 * for width, height, and depth, respectively, or a single number
 * giving the scaling factor for all three dimensions.
 * @param {Number} y Scaling factor for this transform's height.
 * @param {Number} z Scaling factor for this transform's depth.
* @returns {H3DU.Transform} This object.
 * @memberof! H3DU.Transform#
*/
H3DU.Transform.prototype.setScale = function(x, y, z) {
  "use strict";
  if(this.complexMatrix)return this;
  if(x !== null && typeof x !== "undefined" && (y === null || typeof y === "undefined") && (z === null || typeof z === "undefined")) {
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
 * position.  Has no effect if a matrix was defined with {@link H3DU.Transform#setMatrix}
 * and the transform wasn't reset yet with {@link H3DU.Transform#resetTransform}.
 * @param {Array<Number>|number} x The X-coordinate.
 *   If "y" and "z" are null or omitted, this is instead
 *  a 3-element array giving the X, Y, and Z coordinates, or a single number
 * giving the coordinate for all three dimensions.
 * @param {Number} y The Y-coordinate.
 * If "x" is an array, this parameter may be omitted.
 * @param {Number} z The Z-coordinate.
 * If "x" is an array, this parameter may be omitted.
 * @returns {H3DU.Transform} This object.
 * @memberof! H3DU.Transform#
*/
H3DU.Transform.prototype.setPosition = function(x, y, z) {
  "use strict";
  if(this.complexMatrix)return this;
  if(x !== null && typeof x !== "undefined" && (y === null || typeof y === "undefined") && (z === null || typeof z === "undefined")) {
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
 * position.  Has no effect if a matrix was defined with {@link H3DU.Transform#setMatrix}
 * and the transform wasn't reset yet with {@link H3DU.Transform#resetTransform}.
 * @param {Array<Number>|number} x Number to add to the X-coordinate,
 *   If "y" and "z" are null or omitted, this is instead
 *  a 3-element array giving the numbers to add to the X, Y, and Z coordinates, or a single number
 * to add to all three coordinates.
 * @param {Number} y Number to add to the Y-coordinate.
 * If "x" is an array, this parameter may be omitted.
 * @param {Number} z Number to add to the Z-coordinate.
 * If "x" is an array, this parameter may be omitted.
 * @returns {H3DU.Transform} This object.
 * @memberof! H3DU.Transform#
*/
H3DU.Transform.prototype.movePosition = function(x, y, z) {
  "use strict";
  if(this.complexMatrix)return this;
  if(x !== null && typeof x !== "undefined" && (y === null || typeof y === "undefined") && (z === null || typeof z === "undefined")) {
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
 * Sets this transform's orientation in the form of a [quaternion]{@tutorial glmath} (a 4-element array
 * for describing 3D rotations). Has no effect if a matrix was defined with {@link H3DU.Transform#setMatrix}
 * and the transform wasn't reset yet with {@link H3DU.Transform#resetTransform}.
 * @param {Array<Number>} quat A four-element array describing the rotation.
 * A quaternion is returned from the methods {@link glmath.H3DU.Math.quatFromAxisAngle}
 * and {@link glmath.H3DU.Math.quatFromTaitBryan}, among others.
 * @returns {H3DU.Transform} This object.
 * @example
 * // Set an object's orientation to 30 degrees about the X-axis
 * transform.setQuaternion(H3DU.Math.quatFromAxisAngle(20,1,0,0));
 * // Set an object's orientation to identity (no rotation)
 * transform.setQuaternion(H3DU.Math.quatIdentity());
 * // Set an object's orientation to 30 degree pitch multiplied
 * // by 40 degree roll
 * transform.setQuaternion(H3DU.Math.quatFromTaitBryan(30,0,40));
 * @memberof! H3DU.Transform#
*/
H3DU.Transform.prototype.setQuaternion = function(quat) {
  "use strict";
  if(this.complexMatrix)return this;
  this.rotation = quat.slice(0, 4);
  H3DU.Math.quatNormInPlace(this.rotation);
  this._matrixDirty = true;
  return this;
};
/**
 * Sets this transform's orientation in the form of an angle and an axis of
 * rotation. Has no effect if a matrix was defined with {@link H3DU.Transform#setMatrix}
 * and the transform wasn't reset yet with {@link H3DU.Transform#resetTransform}.
 * @param {Array<Number>|number} angle The desired angle
 * to rotate in degrees.  If "v", "vy", and "vz" are omitted, this can
 * instead be a 4-element array giving the axis
 * of rotation as the first three elements, followed by the angle
 * in degrees as the fourth element.  If the axis of rotation
 * points toward the viewer, a positive value means the angle runs in
 * a counterclockwise direction for right-handed coordinate systems and
 * in a clockwise direction for left-handed systems.
 * @param {Array<Number>|number} v X-component of the point lying on the axis
 * of rotation.  If "vy" and "vz" are omitted, this can
 * instead be a 3-element array giving the axis
 * of rotation in x, y, and z, respectively.
 * @param {Number} vy Y-component of the point lying on the axis
 * of rotation.
 * @param {Number} vz Z-component of the point lying on the axis
 * of rotation.
 * @returns {H3DU.Transform} This object.
 * @memberof! H3DU.Transform#
*/
H3DU.Transform.prototype.setOrientation = function(angle, v, vy, vz) {
  "use strict";
  return this.setQuaternion(H3DU.Math.quatFromAxisAngle(angle, v, vy, vz));
};
/**
 * Combines an object's current rotation with another rotation
 * described by a [quaternion]{@tutorial glmath} (a 4-element array
 * for describing 3D rotations).  The combined rotation will have the
 * same effect as the new rotation followed by the existing rotation.
 *  Has no effect if a matrix was defined with {@link H3DU.Transform#setMatrix}
 * and the transform wasn't reset yet with {@link H3DU.Transform#resetTransform}.
 * @param {Array<Number>} quat A four-element array describing the rotation.
 * A quaternion is returned from the methods {@link glmath.H3DU.Math.quatFromAxisAngle}
 * or {@link glmath.H3DU.Math.quatFromTaitBryan}.
 * @returns {H3DU.Transform} This object.
 * @example
 * // Combine an object's orientation with a rotation 20 degrees about the X-axis
 * transform.multQuaternion(H3DU.Math.quatFromAxisAngle(20,1,0,0));
 * // Combine an object's orientation with identity (no rotation)
 * transform.multQuaternion(H3DU.Math.quatIdentity());
 * // Combine an object's orientation with 30 degree pitch multiplied
 * // by 40 degree roll
 * transform.multQuaternion(H3DU.Math.quatFromTaitBryan(30,0,40));
 * @memberof! H3DU.Transform#
*/
H3DU.Transform.prototype.multQuaternion = function(quat) {
  "use strict";
  if(this.complexMatrix)return this;
  this.rotation = H3DU.Math.quatNormInPlace(
   H3DU.Math.quatMultiply(this.rotation, quat));
  this._matrixDirty = true;
  return this;
};
/**
 * Combines an object's current rotation with another rotation
 * in the form of an angle and an axis of
 * rotation. The combined rotation will have the
 * same effect as the new rotation followed by the existing rotation.
 *  Has no effect if a matrix was defined with {@link H3DU.Transform#setMatrix}
 * and the transform wasn't reset yet with {@link H3DU.Transform#resetTransform}.
 * @param {Array<Number>|number} angle The desired angle
 * to rotate in degrees. See {@link H3DU.Transform#setOrientation}.
 * @param {Array<Number>|number} v X-component of the point lying on the axis
 * of rotation.  If "vy" and "vz" are omitted, this can
 * instead be a 3-element array giving the axis
 * of rotation in x, y, and z, respectively.
 * @param {Number} vy Y-component of the point lying on the axis
 * of rotation.
 * @param {Number} vz Z-component of the point lying on the axis
 * of rotation.
 * @returns {H3DU.Transform} This object.
 * @memberof! H3DU.Transform#
*/
H3DU.Transform.prototype.multOrientation = function(angle, v, vy, vz) {
  "use strict";
  return this.multQuaternion(H3DU.Math.quatFromAxisAngle(angle, v, vy, vz));
};
/**
 * Gets the transformation matrix used by an object.  Depending
 * on the state of this transform, will return either:<ul>
* <li>The 4x4 matrix passed to {@link H3DU.Transform#setMatrix}, if the
* matrix was defined with that method
 * and the transform wasn't reset yet with {@link H3DU.Transform#resetTransform}.
* <li>The matrix resulting from the position, rotation, and scale properties,
* multiplied in that order, otherwise.
* </ul>
 * @returns {Array<Number>} Return value.
* @memberof! H3DU.Transform#
*/
H3DU.Transform.prototype.getMatrix = function() {
  "use strict";
  if(this._matrixDirty) {
    this._matrixDirty = false;
    if(H3DU.Math.quatIsIdentity(this.rotation)) {
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
      this.matrix = H3DU.Math.mat4multiply(this.matrix,
      H3DU.Math.quatToMat4(this.rotation));
    // 3. scaling
      H3DU.Math.mat4scaleInPlace(this.matrix, this.scale);
      var m = this.matrix;
      this._isIdentity =
     m[0] === 1 && m[1] === 0 && m[2] === 0 && m[3] === 0 &&
     m[4] === 0 && m[5] === 1 && m[6] === 0 && m[7] === 0 &&
     m[8] === 0 && m[9] === 0 && m[10] === 1 && m[11] === 0 &&
     m[12] === 0 && m[13] === 0 && m[14] === 0 && m[15] === 1
    ;
    }
  } else if(this._isIdentity) {
    return H3DU.Math.mat4identity();
  }
  return this.matrix.slice(0, 16);
};

/**
* Makes a copy of this transform.  The copied object
* will have its own version of the rotation, scale,
* position, and matrix data.
* @returns {H3DU.Transform} A copy of this transform.
* @memberof! H3DU.Transform#
*/
H3DU.Transform.prototype.copy = function() {
  "use strict";
  var ret = new H3DU.Transform();
  ret.scale = this.scale.slice(0, this.scale.length);
  ret.position = this.position.slice(0, this.scale.length);
  ret.complexMatrix = this.complexMatrix;
  ret._matrixDirty = this._matrixDirty;
  ret.matrix = this.matrix.slice(0, this.matrix.length);
  return ret;
};

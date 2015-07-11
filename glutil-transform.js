/*
Written by Peter O. in 2015.

Any copyright is dedicated to the Public Domain.
http://creativecommons.org/publicdomain/zero/1.0/
If you like this, you should donate to Peter O.
at: http://upokecenter.dreamhosters.com/articles/donate-now-2/
*/

/**
*  A class offering a convenient way to set a transformation
* from one coordinate system to another.
* @class
* @alias glutil.Transform
*/
function Transform(){
  /**
  * A three-element array giving the scaling for an object's width,
  * height, and depth, respectively.
  * For each component, 1 means no scaling.
  * The value given here is informational only and should not be modified directly.
  * Use the setScale method to set this value.
  * @deprecated Will no longer be exposed as a public API in the next
  * major version.  Use the getScale() method instead.
  * @default
  */
  this.scale=[1,1,1];
  /**
  * A three-element array giving the X, Y, and Z coordinates of the position
  * of an object relative to its original position.
  * The value given here is informational only and should not be modified directly.
  * Use the setPosition method to set this value.
  * @deprecated Will no longer be exposed as a public API in the next
  * major version..  Use the getPosition() method instead.
  * @default
  */
  this.position=[0,0,0];
  /**
   * The rotation of an object in the form of a [quaternion]{@tutorial glmath}.
   * The value given here is informational only and should not be modified directly.
   * Use the setOrientation or setQuaternion method to set this value.
  * @deprecated Will no longer be exposed as a public API in the next
  * major version.  Use the getQuaternion() method instead.
   */
  this.rotation=GLMath.quatIdentity();
  this.complexMatrix=false;
  this._matrixDirty=false;
  this._isIdentity=true;
  /** @private */
  this.matrix=GLMath.mat4identity();
}
  /**
  * Returns a copy of a three-element array giving the scaling for an object's width,
  * height, and depth, respectively.
  * For each component, 1 means no scaling.
  * @return {Array<number>} Return value.   */
Transform.prototype.getScale=function(){
 if(!this.complexMatrix){
  return this.scale.slice(0,3)
 } else {
  return [this.matrix[0],this.matrix[5],this.matrix[10]]
 }
}
  /**
  * Returns a copy of a three-element array giving the X, Y, and Z coordinates of the position
  * of an object relative to its original position.
  * @return {Array<number>} Return value.   */
Transform.prototype.getPosition=function(){
 if(!this.complexMatrix){
  return this.position.slice(0,3)
 } else {
  return [this.matrix[12],this.matrix[13],this.matrix[14]]
 }
}
  /**
   * Returns a copy of the rotation of an object in the form of a [quaternion]{@tutorial glmath}.
   * @return {Array<number>} Return value.   */
Transform.prototype.getQuaternion=function(){
 if(!this.complexMatrix){
  return this.rotation.slice(0,4)
 } else {
  return GLMath.quatNormInPlace(
    GLMath.quatFromMat4(this.matrix))
 }
}
/**
* Resets this shape to the untransformed state.
* @return {glutil.Shape} This object.
*/
Transform.prototype.reset=function(){
 this.matrix=GLMath.mat4identity();
 this.position=[0,0,0];
 this.scale=[1,1,1];
 this.rotation=GLMath.quatIdentity();
 this.complexMatrix=false;
 this._matrixDirty=false;
 this._isIdentity=true;
 return this;
}
/**
 * Sets this shape's transformation matrix. This method
 * will set the position, rotation, and scale properties
 * accordingly to the matrix given.
 * @param {Array<number>} value A 4x4 matrix.
 * This method will copy the value of this parameter.
 * @return {glutil.Transform} This object.
 */
Transform.prototype.setMatrix=function(value){
 this._matrixDirty=false;
 this.complexMatrix=true;
 this.matrix=value.slice(0,16);
 this.position=[this.matrix[12],this.matrix[13],this.matrix[14]];
 this.rotation=GLMath.quatFromMat4(this.matrix);
 this.rotation=GLMath.quatNormInPlace(this.rotation);
 this.scale=[this.matrix[0],this.matrix[5],this.matrix[10]];
 this._isIdentity=(
    value[0]==1 && value[1]==0 && value[2]==0 && value[3]==0 &&
    value[4]==0 && value[5]==1 && value[6]==0 && value[7]==0 &&
    value[8]==0 && value[9]==0 && value[10]==1 && value[11]==0 &&
    value[12]==0 && value[13]==0 && value[14]==0 && value[15]==1
 );
 return this;
}
/**
 * Returns whether this transform is the identity transform.
 * @return {boolean} Return value. */
Transform.prototype.isIdentity=function(){
 if(this._matrixDirty){
  if(this.complexMatrix){
   this.getMatrix();
  } else {
   return this.position[0]==0 && this.position[1]==0 &&
    this.position[2]==0 && this.scale[0]==1 &&
    this.scale[1]==1 && this.scale[2]==1 &&
    GLMath.quatIsIdentity(this.rotation);
  }
 }
 return this._isIdentity;
}
/**
* Resets this transform to the untransformed state.
* @return {glutil.Transform} This object.
*/
Transform.prototype.resetTransform=function(){
 this.matrix=GLMath.mat4identity();
 this.position=[0,0,0];
 this.scale=[1,1,1];
 this._isIdentity=true;
 this.rotation=GLMath.quatIdentity();
 this.complexMatrix=false;
 this._matrixDirty=false;
 return this;
}
/**
 * Sets the scale of an object relative to its original
 * size. Has no effect if a matrix was defined with {@link glutil.Transform#setMatrix}
 * and the transform wasn't reset yet with {@link glutil.Transform#resetTransform}.
 * @param {number|Array<number>} x Scaling factor for this object's width.
 *   If "y" and "z" are null or omitted, this is instead
 *  a 3-element array giving the scaling factors
 * for width, height, and depth, respectively, or a single number
 * giving the scaling factor for all three dimensions.
 * @param {number} y Scaling factor for this object's height.
 * @param {number} z Scaling factor for this object's depth.
* @return {glutil.Transform} This object.
 */
Transform.prototype.setScale=function(x,y,z){
  if(this.complexMatrix)return this;
  if(x!=null && y==null && z==null){
   if(typeof x!="number")
    this.scale=[x[0],x[1],x[2]];
   else
    this.scale=[x,x,x];
  } else {
   this.scale=[x,y,z];
  }
  this._isIdentity=(this._isIdentity &&
   this.scale[0]==1 &&
   this.scale[1]==1 &&
   this.scale[2]==1);
  this._matrixDirty=true;
  return this;
}
/**
 * Sets the relative position of an object from its original
 * position.  Has no effect if a matrix was defined with {@link glutil.Transform#setMatrix}
 * and the transform wasn't reset yet with {@link glutil.Transform#resetTransform}.
 * @param {Array<number>|number} x The X-coordinate.
 *   If "y" and "z" are null or omitted, this is instead
 *  a 3-element array giving the X, Y, and Z coordinates, or a single number
 * giving the coordinate for all three dimensions.
 * @param {number} y The Y-coordinate.
 * If "x" is an array, this parameter may be omitted.
 * @param {number} z The Z-coordinate.
 * If "x" is an array, this parameter may be omitted.
 * @return {glutil.Transform} This object.
 */
Transform.prototype.setPosition=function(x,y,z){
  if(this.complexMatrix)return this;
  if(x!=null && y==null && z==null){
   if(typeof x!="number")
    this.position=[x[0],x[1],x[2]];
   else
    this.position=[x,x,x];
  } else {
   this.position=[x,y,z];
  }
  this._isIdentity=(this._isIdentity &&
   this.position[0]==0 &&
   this.position[1]==0 &&
   this.position[2]==0);
  this._matrixDirty=true;
  return this;
}

/**
 * Moves the relative position of an object from its original
 * position.  Has no effect if a matrix was defined with {@link glutil.Transform#setMatrix}
 * and the transform wasn't reset yet with {@link glutil.Transform#resetTransform}.
 * @param {Array<number>|number} x Number to add to the X-coordinate,
 *   If "y" and "z" are null or omitted, this is instead
 *  a 3-element array giving the numbers to add to the X, Y, and Z coordinates, or a single number
 * to add to all three coordinates.
 * @param {number} y Number to add to the Y-coordinate.
 * If "x" is an array, this parameter may be omitted.
 * @param {number} z Number to add to the Z-coordinate.
 * If "x" is an array, this parameter may be omitted.
 * @return {glutil.Transform} This object.
 */
Transform.prototype.movePosition=function(x,y,z){
  if(this.complexMatrix)return this;
  if(x!=null && y==null && z==null){
   if(typeof x!="number"){
    this.position[0]+=x[0];
    this.position[1]+=x[1];
    this.position[2]+=x[2];
   } else {
    this.position[0]+=x;
    this.position[1]+=x;
    this.position[2]+=x;
   }
  } else {
    this.position[0]+=x;
    this.position[1]+=y;
    this.position[2]+=z;
  }
  this._isIdentity=(this._isIdentity &&
   this.position[0]==0 &&
   this.position[1]==0 &&
   this.position[2]==0);
  this._matrixDirty=true;
  return this;
}
/**
 * Sets this object's orientation in the form of a [quaternion]{@tutorial glmath} (a 4-element array
 * for describing 3D rotations). Has no effect if a matrix was defined with {@link glutil.Transform#setMatrix}
 * and the transform wasn't reset yet with {@link glutil.Transform#resetTransform}.
 * @param {Array<number>} quat A four-element array describing the rotation.
 * A quaternion is returned from the methods {@link glmath.GLMath.quatFromAxisAngle}
 * and {@link glmath.GLMath.quatFromTaitBryan}, among others.
 * @return {glutil.Transform} This object.
 * @example
 * // Set an object's orientation to 30 degrees about the X-axis
 * transform.setQuaternion(GLMath.quatFromAxisAngle(20,1,0,0));
 * // Set an object's orientation to identity (no rotation)
 * transform.setQuaternion(GLMath.quatIdentity());
 * // Set an object's orientation to 30 degree pitch multiplied
 * // by 40 degree roll
 * transform.setQuaternion(GLMath.quatFromTaitBryan(30,0,40));
 */
Transform.prototype.setQuaternion=function(quat){
  if(this.complexMatrix)return this;
  this.rotation=quat.slice(0,4);
  GLMath.quatNormInPlace(this.rotation);
  this._matrixDirty=true;
  return this;
}
/**
 * Sets this object's orientation in the form of an angle and an axis of
 * rotation. Has no effect if a matrix was defined with {@link glutil.Transform#setMatrix}
 * and the transform wasn't reset yet with {@link glutil.Transform#resetTransform}.
 * @param {Array<number>|number} angle The desired angle
 * to rotate in degrees.  If "v", "vy", and "vz" are omitted, this can
 * instead be a 4-element array giving the axis
 * of rotation as the first three elements, followed by the angle
 * in degrees as the fourth element.  If the axis of rotation
 * points toward the viewer, a positive value means the angle runs in
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
 * @return {glutil.Transform} This object.
 */
Transform.prototype.setOrientation=function(angle, v,vy,vz){
 return this.setQuaternion(GLMath.quatFromAxisAngle(angle,v,vy,vz));
}
/**
 * Combines an object's current rotation with another rotation
 * described by a [quaternion]{@tutorial glmath} (a 4-element array
 * for describing 3D rotations).  The combined rotation will have the
 * same effect as the new rotation followed by the existing rotation.
 *  Has no effect if a matrix was defined with {@link glutil.Transform#setMatrix}
 * and the transform wasn't reset yet with {@link glutil.Transform#resetTransform}.
 * @param {Array<number>} quat A four-element array describing the rotation.
 * A quaternion is returned from the methods {@link glmath.GLMath.quatFromAxisAngle}
 * or {@link glmath.GLMath.quatFromTaitBryan}.
 * @return {glutil.Transform} This object.
 * @example
 * // Combine an object's orientation with a rotation 20 degrees about the X-axis
 * transform.multQuaternion(GLMath.quatFromAxisAngle(20,1,0,0));
 * // Combine an object's orientation with identity (no rotation)
 * transform.multQuaternion(GLMath.quatIdentity());
 * // Combine an object's orientation with 30 degree pitch multiplied
 * // by 40 degree roll
 * transform.multQuaternion(GLMath.quatFromTaitBryan(30,0,40));
 */
Transform.prototype.multQuaternion=function(quat){
  if(this.complexMatrix)return this;
  this.rotation=GLMath.quatNormInPlace(
   GLMath.quatMultiply(this.rotation,quat));
  this._matrixDirty=true;
  return this;
}
/**
 * Combines an object's current rotation with another rotation
 * in the form of an angle and an axis of
 * rotation. The combined rotation will have the
 * same effect as the new rotation followed by the existing rotation.
 *  Has no effect if a matrix was defined with {@link glutil.Transform#setMatrix}
 * and the transform wasn't reset yet with {@link glutil.Transform#resetTransform}.
 * @param {Array<number>|number} angle The desired angle
 * to rotate in degrees. See {@link glutil.Transform#setOrientation}.
 * @param {Array<number>|number} v X-component of the point lying on the axis
 * of rotation.  If "vy" and "vz" are omitted, this can
 * instead be a 3-element array giving the axis
 * of rotation in x, y, and z, respectively.
 * @param {number} vy Y-component of the point lying on the axis
 * of rotation.
 * @param {number} vz Z-component of the point lying on the axis
 * of rotation.
 * @return {glutil.Transform} This object.
 */
Transform.prototype.multOrientation=function(angle, v,vy,vz){
 return this.multQuaternion(GLMath.quatFromAxisAngle(angle,v,vy,vz));
}
/**
 * Gets the transformation matrix used by an object.  It is a combination
 * of the scale, position, and rotation properties,
 * unless a matrix was defined with {@link glutil.Transform#setMatrix}
 * and the transform wasn't reset yet with {@link glutil.Transform#resetTransform}.
 * @return {Array<number>} Return value. */
Transform.prototype.getMatrix=function(){
  if(this._matrixDirty){
   this._matrixDirty=false;
   if(GLMath.quatIsIdentity(this.rotation)){
    this.matrix=[this.scale[0],0,0,0,0,
     this.scale[1],0,0,0,0,
     this.scale[2],0,
     this.position[0],
     this.position[1],
     this.position[2],1];
    this._isIdentity=(this.position[0]==0 && this.position[1]==0 &&
     this.position[2]==0 && this.scale[0]==1 &&
     this.scale[1]==1 && this.scale[2]==1);
   } else {
    // for best results, multiply in this order:
    // 1. translation
   this.matrix=[1,0,0,0,0,1,0,0,0,0,1,0,
    this.position[0],
    this.position[1],
    this.position[2],1];
    // 2. rotation
    this.matrix=GLMath.mat4multiply(this.matrix,
      GLMath.quatToMat4(this.rotation));
    // 3. scaling
    GLMath.mat4scaleInPlace(this.matrix,this.scale);
    var m=this.matrix;
    this._isIdentity=(
     m[0]==1 && m[1]==0 && m[2]==0 && m[3]==0 &&
     m[4]==0 && m[5]==1 && m[6]==0 && m[7]==0 &&
     m[8]==0 && m[9]==0 && m[10]==1 && m[11]==0 &&
     m[12]==0 && m[13]==0 && m[14]==0 && m[15]==1
    );
   }
  } else if(this._isIdentity){
   return GLMath.mat4identity();
  }
  return this.matrix.slice(0,16);
}

/**
* Makes a copy of this object.  The copied object
* will have its own version of the rotation, scale,
* position, and matrix data.
* @return {glutil.Transform} A copy of this object.
*/
Transform.prototype.copy=function(){
 var ret=new Transform();
 ret.scale=this.scale.slice(0,this.scale.length);
 ret.position=this.position.slice(0,this.scale.length);
 ret.complexMatrix=this.complexMatrix;
 ret._matrixDirty=this._matrixDirty;
 ret.matrix=this.matrix.slice(0,this.matrix.length);
 return ret;
}

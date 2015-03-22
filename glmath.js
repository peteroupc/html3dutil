/*
Written by Peter O. in 2015.

Any copyright is dedicated to the Public Domain.
http://creativecommons.org/publicdomain/zero/1.0/
If you like this, you should donate to Peter O.
at: http://upokecenter.dreamhosters.com/articles/donate-now-2/
*/
/**
* A collection of math functions for working
* with vectors and matrices.
* @module glmath
*/
(function (g,f) {
	if (typeof define=="function" && define["amd"]) {
		define([ "exports" ], f);
	} else if (typeof exports=="object") {
		f(exports);
	} else {
		f(g);
	}
}(this, function (exports) {
	if (exports.GLMath) { return; }

/**
* A collection of math functions for working
* with vectors and matrices.<p>
* Vectors: A vector is simply a set of 3 or 4 elements that are related
* to each other.  As such, a vector can symbolize a position, a direction,
* a ray, a color, or anything else.  If a vector describes a position, direction,
* or normal, the four elements are given as X, Y, Z, and W, in that order.
* If a vector describes a color, the four elements are given as red, green,
* blue, and alpha, in that order (where each element ranges from 0-1).
* The methods in this class treat arrays as vectors.  Functions dealing
* with vectors begin with "vec".<p>
* Matrices:  A matrix is a 16- or 9-element array that describes a
* transformation from one coordinate system to another.
* All functions dealing with 4x4 matrices assume that
* the translation elements in x, y, and z are located in the
* 13th, 14th, and 15th elements of the matrix.  All functions also assume
* a right-handed coordinate system, in which the z-axis points
* toward the viewer, the x-axis points to the right and the y-axis
* points up. Functions dealing with matrices begin with "mat".<p>
* Quaternions:  A quaternion is a 4-element array that describes a
* 3D rotation.  The first three elements are the X, Y, and Z components
* (axis of rotation multiplied by the sine of half the angle)
* and the fourth component is the W component (cosine of half the angle).
* Functions dealing with quaternions begin with "quat".<p>
* @class
* @alias glmath.GLMath
*/
var GLMath={
/** Finds the cross product of two 3-element vectors.
 * @param {Array<number>} a The first vector.
 * @param {Array<number>} b The second vector.
 * @return {Array<number>} A 3-element vector containing the cross product.
 */
vec3cross:function(a,b){
return [a[1]*b[2]-a[2]*b[1],
 a[2]*b[0]-a[0]*b[2],
 a[0]*b[1]-a[1]*b[0]];
},
/**
 * Finds the dot product of two 3-element vectors.
 * @param {Array<number>} a The first vector.
 * @param {Array<number>} b The second vector.
 * @return {number} The dot product.
 */
vec3dot:function(a,b){
return a[0]*b[0]+a[1]*b[1]+a[2]*b[2];
},
/**
 * Adds two 3-element vectors and stores
 * the result in the first vector.
 * @param {Array<number>} a The first vector.
 * @param {Array<number>} b The second vector.
 * @return {Array<number>} The parameter "a"
 */
vec3addInPlace:function(a,b){
// Use variables in case a and b are the same
var b0=b[0];
var b1=b[1];
a[0]+=b0;
a[1]+=b1;
return a;
},
/**
 * Subtracts two 3-element vectors and stores
 * the result in the first vector.
 * @param {Array<number>} a
 * @param {Array<number>} b
 * @return {Array<number>} The parameter "a"
 */
vec3subInPlace:function(a,b){
// Use variables in case a and b are the same
var b0=b[0];
var b1=b[1];
a[0]-=b0;
a[1]-=b1;
return a;
},
/**
 * Multiplies each element of a 3-element vector by a factor
 * and stores the result in that vector.
 * @param {Array<number>} a A 3-element vector.
 * @param {number} scalar A factor to multiply.
 * @return {Array<number>} The parameter "a".
 */
vec3scaleInPlace:function(a,scalar){
a[0]*=scalar;
a[1]*=scalar;
a[2]*=scalar;
return a;
},
/**
 * Finds the dot product of two 4-element vectors.
 * @param {Array<number>} a
 * @param {Array<number>} b
 */
vec4dot:function(a,b){
return a[0]*b[0]+a[1]*b[1]+a[2]*b[2]+a[3]*b[3];
},
/**
 * Multiplies each element of a 4-element vector by a factor
 * and stores the result in that vector.
 * @param {Array<number>} a A 4-element vector.
 * @param {number} scalar A factor to multiply.
 * @return {Array<number>} The parameter "a".
 */
vec4scaleInPlace:function(a,scalar){
a[0]*=scalar;
a[1]*=scalar;
a[2]*=scalar;
a[3]*=scalar;
return a;
},
/**
 * Converts a 3-element vector to its normalized version.
 * When a vector is normalized, the distance from the origin
 * to that vector becomes 1 (unless all its components are 0.)
 * @param {Array<number>} vec A 3-element vector.
 * @return {Array<number>} The parameter "vec".
 */
vec3normInPlace:function(vec){
 var x=vec[0];
 var y=vec[1];
 var z=vec[2];
 len=Math.sqrt(x*x+y*y+z*z);
 if(len!=0){
  len=1.0/len;
  vec[0]*=len;
  vec[1]*=len;
  vec[2]*=len;
 }
 return vec;
},
/**
 * Converts a 4-element vector to its normalized version.
 * When a vector is normalized, the distance from the origin
 * to that vector becomes 1 (unless all its components are 0.)
 * @param {Array<number>} vec A 4-element vector.
 * @return {Array<number>} The parameter "vec".
 */
vec4normInPlace:function(vec){
 var x=vec[0];
 var y=vec[1];
 var z=vec[2];
 var w=vec[3];
 len=Math.sqrt(x*x+y*y+z*z+w*w);
 if(len!=0){
  len=1.0/len;
  vec[0]*=len;
  vec[1]*=len;
  vec[2]*=len;
  vec[3]*=len;
 }
 return vec;
},
/**
 * Returns a normalized version of a 3-element vector.
 * When a vector is normalized, the distance from the origin
 * to that vector becomes 1 (unless all its components are 0.)
 * @param {Array<number>} vec A 3-element vector.
 * @return {Array<number>} The resulting vector.
 */
vec3norm:function(vec){
 var ret=[vec[0],vec[1],vec[2]]
 GLMath.vec3normInPlace(ret);
 return ret;
},

/**
 * Returns a normalized version of a 4-element vector.
 * When a vector is normalized, the distance from the origin
 * to that vector becomes 1 (unless all its components are 0.)
 * @param {Array<number>} vec A 4-element vector.
 * @return {Array<number>} The resulting vector.
 */
vec4norm:function(vec){
 var ret=[vec[0],vec[1],vec[2],vec[3]]
 GLMath.vec4normInPlace(ret);
 return ret;
},
/**
 * Returns the distance of this three-element vector from the origin.
 * @param {Array<number>} a A three-element vector.
 * @return {number}
 */
vec3length:function(a){
 var dx=a[0];
 var dy=a[1];
 var dz=a[2];
 return Math.sqrt(dx*dx+dy*dy+dz*dz);
},
/**
 * Returns the distance of this four-element vector from the origin.
 * @param {Array<number>} a A four-element vector.
 * @return {number}
 */
vec4length:function(a){
 var dx=a[0];
 var dy=a[1];
 var dz=a[2];
 var dw=a[3];
 return Math.sqrt(dx*dx+dy*dy+dz*dz+dw*dw);
},
/**
 * Returns the identity 3x3 matrix.
 * @return {Array<number>}
 */
mat3identity:function(){
 return [1,0,0,0,1,0,0,0,1];
},
/**
 * Returns the identity 4x4 matrix.
 * @return {Array<number>}
 */
mat4identity:function(){
 return [1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1];
},
/** Returns the identity quaternion, (0, 0, 0, 1).
 @return {Array<number>} */
quatIdentity:function(){
 return [0,0,0,1];
},
/**
 * Returns a copy of a 4x4 matrix.
 * @return {Array<number>}
 */
mat4copy:function(mat){
 return mat.slice(0,16);
},
/**
 * Returns a copy of a 4-element vector.
 * @return {Array<number>}
 */
vec4copy:function(mat){
 return mat.slice(0,4);
},
/**
 * Finds the inverse of a 4x4 matrix.
 * @param {*} m A 4x4 matrix.
 * @return {Array<number>} The resulting 4x4 matrix.
 * Returns the identity matrix if this matrix is not invertible.
 */
mat4invert:function(m){
var tvar0 = m[0]*m[10];
var tvar1 = m[0]*m[11];
var tvar2 = m[0]*m[5];
var tvar3 = m[0]*m[6];
var tvar4 = m[0]*m[7];
var tvar5 = m[0]*m[9];
var tvar6 = m[10]*m[12];
var tvar7 = m[10]*m[13];
var tvar8 = m[10]*m[15];
var tvar9 = m[11]*m[12];
var tvar10 = m[11]*m[13];
var tvar11 = m[11]*m[14];
var tvar12 = m[1]*m[10];
var tvar13 = m[1]*m[11];
var tvar14 = m[1]*m[4];
var tvar15 = m[1]*m[6];
var tvar16 = m[1]*m[7];
var tvar17 = m[1]*m[8];
var tvar18 = m[2]*m[11];
var tvar19 = m[2]*m[4];
var tvar20 = m[2]*m[5];
var tvar21 = m[2]*m[7];
var tvar22 = m[2]*m[8];
var tvar23 = m[2]*m[9];
var tvar24 = m[3]*m[10];
var tvar25 = m[3]*m[4];
var tvar26 = m[3]*m[5];
var tvar27 = m[3]*m[6];
var tvar28 = m[3]*m[8];
var tvar29 = m[3]*m[9];
var tvar30 = m[4]*m[10];
var tvar31 = m[4]*m[11];
var tvar32 = m[4]*m[9];
var tvar33 = m[5]*m[10];
var tvar34 = m[5]*m[11];
var tvar35 = m[5]*m[8];
var tvar36 = m[6]*m[11];
var tvar37 = m[6]*m[8];
var tvar38 = m[6]*m[9];
var tvar39 = m[7]*m[10];
var tvar40 = m[7]*m[8];
var tvar41 = m[7]*m[9];
var tvar42 = m[8]*m[13];
var tvar43 = m[8]*m[14];
var tvar44 = m[8]*m[15];
var tvar45 = m[9]*m[12];
var tvar46 = m[9]*m[14];
var tvar47 = m[9]*m[15];
var tvar48 = tvar14-tvar2;
var tvar49 = tvar15-tvar20;
var tvar50 = tvar16-tvar26;
var tvar51 = tvar19-tvar3;
var tvar52 = tvar2-tvar14;
var tvar53 = tvar20-tvar15;
var tvar54 = tvar21-tvar27;
var tvar55 = tvar25-tvar4;
var tvar56 = tvar26-tvar16;
var tvar57 = tvar27-tvar21;
var tvar58 = tvar3-tvar19;
var tvar59 = tvar4-tvar25;
var det = tvar45*tvar57 + tvar6*tvar50 + tvar9*tvar53 + tvar42*tvar54 + tvar7*tvar55 +
tvar10*tvar58 + tvar43*tvar56 + tvar46*tvar59 + tvar11*tvar48 + tvar44*tvar49 +
tvar47*tvar51 + tvar8*tvar52;
if(det==0)return GLMath.mat4identity();
det=1.0/det;
var r=[]
r[0] = m[6]*tvar10 - m[7]*tvar7 + tvar41*m[14] - m[5]*tvar11 - tvar38*m[15] + m[5]*tvar8;
r[1] = m[3]*tvar7 - m[2]*tvar10 - tvar29*m[14] + m[1]*tvar11 + tvar23*m[15] - m[1]*tvar8;
r[2] = m[13]*tvar54 + m[14]*tvar56 + m[15]*tvar49;
r[3] = m[9]*tvar57 + m[10]*tvar50 + m[11]*tvar53;
r[4] = m[7]*tvar6 - m[6]*tvar9 - tvar40*m[14] + m[4]*tvar11 + tvar37*m[15] - m[4]*tvar8;
r[5] = m[2]*tvar9 - m[3]*tvar6 + m[14]*(tvar28-tvar1) + m[15]*(tvar0-tvar22);
r[6] = m[12]*tvar57 + m[14]*tvar59 + m[15]*tvar51;
r[7] = m[8]*tvar54 + m[10]*tvar55 + m[11]*tvar58;
r[8] = m[5]*tvar9 - tvar41*m[12] + tvar40*m[13] - m[4]*tvar10 + m[15]*(tvar32-tvar35);
r[9] = tvar29*m[12] - m[1]*tvar9 + m[13]*(tvar1-tvar28) + m[15]*(tvar17-tvar5);
r[10] = m[12]*tvar50 + m[13]*tvar55 + m[15]*tvar52;
r[11] = m[8]*tvar56 + m[9]*tvar59 + m[11]*tvar48;
r[12] = tvar38*m[12] - m[5]*tvar6 - tvar37*m[13] + m[4]*tvar7 + m[14]*(tvar35-tvar32);
r[13] = m[1]*tvar6 - tvar23*m[12] + m[13]*(tvar22-tvar0) + m[14]*(tvar5-tvar17);
r[14] = m[12]*tvar53 + m[13]*tvar58 + m[14]*tvar48;
r[15] = m[8]*tvar49 + m[9]*tvar51 + m[10]*tvar52;
for(var i=0;i<16;i++){
 r[i]*=det;
}
return r;
},
/**
 * Inverts the rotation given in this quaternion without normalizing it;
 * returns a new quaternion.
 * @param {Array<number>} quat A quaternion, containing four elements.
 */
quatConjugate:function(quat){
 return [-quat[0],-quat[1],-quat[2],quat[3]];
},
/**
 * Inverts the rotation given in this quaternion, then normalizes the result;
 * returns a new quaternion.
 * @param {Array<number>} quat A quaternion, containing four elements.
 */
quatInverse:function(quat){
 return GLMath.quatNormInPlace(
   GLMath.quatConjugate(quat));
},
/**
* Returns whether this quaternion is the identity quaternion, (0, 0, 0, 1).
* @return {boolean}
*/
quatIsIdentity:function(quat){
 return quat[0]==0 && quat[1]==0 && quat[2]==0 && quat[3]==1
},
/**
 * Generates a 4x4 matrix describing the rotation
 * described by this quaternion.
 * @param {*} quat A quaternion.
 */
quatToMat4:function(quat){
  var tx, ty, tz, xx, xy, xz, yy, yz, zz, wx, wy, wz;
  tx = 2.0 * quat[0];
  ty = 2.0 * quat[1];
  tz = 2.0 * quat[2];
  xx = tx * quat[0];
  xy = tx * quat[1];
  xz = tx * quat[2];
  yy = ty * quat[1];
  yz = tz * quat[1];
  zz = tz * quat[2];
  wx = tx * quat[3];
  wy = ty * quat[3];
  wz = tz * quat[3];
  return [
    1 - (yy + zz), xy + wz, xz - wy,0,
    xy - wz, 1 - (xx + zz), yz + wx,0,
    xz + wy, yz - wx, 1 - (xx + yy),0,
    0,0,0,1
  ]
},
/**
* Calculates the angle and axis of rotation for this
* quaternion.
* @param {Array<number>} A quaternion.
* @return  {Array<number>} A 4-element array giving the axis
 * of rotation as the first three elements, followed by the angle
 * in degrees as the fourth element.
*/
quatToAngleAxis:function(a){
 var w=a[3];
 var d=1.0-(w*w);
 if(d>0){
  d=1/Math.sqrt(d);
  return [a[0]*d,a[1]*d,a[2]*d,
    Math.acos(w)*GLMath.Num360DividedByPi];
 } else {
  return [0,1,0,0]
 }
},
/**
 * Generates a quaternion from an angle and axis of rotation.
 * @param {Array<number>|number} angle The desired angle
 * to rotate in degrees.  If "v", "vy", and "vz" are omitted, this can
 * instead be a 4-element array giving the axis
 * of rotation as the first three elements, followed by the angle
 * in degrees as the fourth element.
 * @param {Array<number>|number} v X-component of the axis
 * of rotation.  If "vy" and "vz" are omitted, this can
 * instead be a 3-element array giving the axis
 * of rotation in x, y, and z, respectively.
 * @param {number} vy Y-component of the axis
 * of rotation.
 * @param {number} vz Z-component of the axis
 * of rotation.
 * @return {Array<number>} The generated quaternion.
 */
quatFromAngleAxis:function(angle,v,vy,vz){
var v0,v1,v2,ang;
if(typeof vy!="undefined" && typeof vz!="undefined"){
 v0=v;
 v1=vy;
 v2=vz;
 ang=angle*GLMath.PiDividedBy360;
} else if(typeof v=="undefined"){
 v0=angle[0];
 v1=angle[1];
 v2=angle[2];
 ang=angle[3];
 ang=ang*GLMath.PiDividedBy360;
} else {
 v0=v[0];
 v1=v[1];
 v2=v[2];
 ang=angle*GLMath.PiDividedBy360;
}
var cost = Math.cos(ang);
var sint = Math.sin(ang);
var ret=[v0,v1,v2,cost];
ret[0]*=sint;
ret[1]*=sint;
ret[2]*=sint;
return ret;
},
/**
 * Generates a quaternion from pitch, yaw and roll angles
 * (sometimes known as bank, heading and attitude, respectively).
 * The rotation will occur as a pitch, then yaw, then roll.
 * @param {number} pitchDegrees Rotation about the x-axis, in degrees.
 * @param {number} yawDegrees Rotation about the y-axis, in degrees.
 * @param {number} rollDegrees Rotation about the z-axis, in degrees.
 * @return {Array<number>} The generated quaternion.
 */
quatFromPitchYawRoll:function(pitchDegrees,yawDegrees,rollDegrees){
 rollDegrees=(rollDegrees+180)%360.0-180.0;
 pitchDegrees=(pitchDegrees+180)%360.0-180.0;
 yawDegrees=(yawDegrees+180)%360.0-180.0;
 var rollRad=rollDegrees*GLMath.PiDividedBy360;
 var pitchRad=pitchDegrees*GLMath.PiDividedBy360;
 var yawRad=yawDegrees*GLMath.PiDividedBy360;
 var sp=Math.sin(pitchRad);
 var cp=Math.cos(pitchRad);
 var sy=Math.sin(yawRad);
 var cy=Math.cos(yawRad);
 var sr=Math.sin(rollRad);
 var cr=Math.cos(rollRad);
 var pitchYaw=[sp*cy,cp*sy,sp*sy,cp*cy];
 return [
  pitchYaw[0] * cr + pitchYaw[1] * sr,
  pitchYaw[1] * cr - pitchYaw[0] * sr,
  pitchYaw[3] * sr + pitchYaw[2] * cr,
  pitchYaw[3] * cr - pitchYaw[2] * sr
 ]
},
/**
 * Converts this quaternion to the same version of the rotation
 * in the form of pitch, yaw, and roll angles
  * (sometimes known as bank, heading and attitude, respectively).
  * The rotation described by the return value 
 * will occur as a pitch, then yaw, then roll.
 * @param {Array<number>} a A quaternion.  Should be normalized.
 * @return {Array<number>} A three-element array containing the
 * pitch, yaw, and roll angles, in that order, in degrees.
 */
quatToPitchYawRoll:function(a){
  var c0=a[3];
  var c1=a[0]; // first pitch
  var c2=a[1]; // then yaw
  var c3=a[2]; // then roll
	var sq1=c1*c1;
  var sq2=c2*c2;
  var sq3=c3*c3;
  var e1=Math.atan2(2*(c0*c1-c2*c3),1-(sq1+sq2)*2);
  var e2=Math.asin(2*(c0*c2+c1*c3));
  var e3=Math.atan2(2*(c0*c3-c1*c2),1-(sq2+sq3)*2);
  var euler=[
    e1*GLMath.Num180DividedByPi,
    e2*GLMath.Num180DividedByPi,
    e3*GLMath.Num180DividedByPi
  ]
  if(Math.abs(euler[1],90)<0.000001 ||
      Math.abs(euler[1],-90)<0.000001){
    euler[2]=0;
    euler[0]=Math.atan2(p1,p0)*GLMath.Num180DividedByPi;
  }
  return euler;
},
/**
 * Does a spherical linear interpolation between two quaternions.
 * This method is useful for smoothly animating between the two
 * rotations they describe.
 * @param {Array<number>} q1 The first quaternion.  Should be normalized.
 * @param {Array<number>} q2 The second quaternion.  Should be normalized.
 * @param {number} factor A value from 0 through 1.  Closer to 0 means
 * closer to q1, and closer to 1 means closer to q2.
 * @param {Array<number>} The interpolated quaternion.
 */
quatSlerp:function(q1,q2,factor){
 var cosval=GLMath.quatDot(q1,q2);
 var qd=q2;
 if(cosval<0){
  qd=[-q2[0],-q2[1],-q2[2],-q2[3]];
  cosval=GLMath.quatDot(q1,qd);
 }
 var angle=0;
 if(cosval>-1){
  if(cosval<1){
   angle=Math.acos(cosval);
   if(angle==0)return qd.slice(0,4);
  }
  else return qd.slice(0,4);
 } else {
  angle=Math.PI;
 }
 var s=Math.sin(angle);
 var sinv=1.0/s;
 var c1=Math.sin((1.0-factor)*angle)*sinv;
 var c2=Math.sin(factor*angle)*sinv;
 return [
  q1[0]*c1+qd[0]*c2,
  q1[1]*c1+qd[1]*c2,
  q1[2]*c1+qd[2]*c2,
  q1[3]*c1+qd[3]*c2
 ];
},
/**
 * Not documented yet.
 * @param {Array<number>} q
 * @param {Array<number>} v
 */
quatRotate:function(q,v){
var v1 = GLMath.vec3cross( q, v );
v1[0] += v[0] * q[3];
v1[1] += v[1] * q[3];
v1[2] += v[2] * q[3];
var v2 = GLMath.vec3cross( v1, q );
var dot = q[0] * v[0] + q[1] * v[1] + q[2] * v[2];
return [
q[0] * dot + v1[0] * q[3] - v2[0],
q[1] * dot + v1[1] * q[3] - v2[1],
q[2] * dot + v1[2] * q[3] - v2[2],
1]
},
/**
 * Generates a quaternion from the rotation described in a 4x4 matrix.
 * The results are undefined if the matrix doesn't describe a rotation.
 * @param {Array<number>} m A 4x4 matrix.
 * @return {Array<number>} The resulting quaternion.
 */
quatFromMat4:function(m){
var ret=[]
 var xy=m[1];
 var xz=m[2];
 var yx=m[4];
 var yz=m[6];
 var zx=m[8];
 var zy=m[9];
 var trace = m[0] + m[5] + m[10];
if (trace >= 0.0)
{
var s = Math.sqrt(trace + 1.0) * 0.5;
var t = 0.25/s;
ret[0] = (yz - zy) * t;
ret[1] = (zx - xz) * t;
ret[2] = (xy - yx) * t;
ret[3] = s;
}
else if((m[0] > m[5]) && (m[0] > m[10]))
{
// s=4*x
var s = Math.sqrt(1.0+m[0]-m[5]-m[10]) * 0.5;
var t = 0.25/s;
ret[0] = s;
ret[1] = (yx + xy) * t;
ret[2] = (xz + zx) * t;
ret[3] = (yz - zy) * t;
}
else if(m[5] > m[10])
{
// s=4*y
var s = Math.sqrt(1.0+m[5]-m[0]-m[10]) * 0.5;
var t = 0.25/s;
ret[0] = (yx + xy) * t;
ret[1] = s;
ret[2] = (zy + yz) * t;
ret[3] = (zx - xz) * t;
}
else
{
// s=4*z
var s = Math.sqrt(1.0+m[10]-m[0]-m[5]) * 0.5;
var t = 0.25/s;
ret[0] = (zx + xz) * t;
ret[1] = (zy + yz) * t;
ret[2] = s;
ret[3] = (xy - yx) * t;
}
return ret
},
/**
* Returns the transposed result of the inverted upper left corner of
* the given 4x4 matrix.
* @param {Array<number>} m4 A 4x4 matrix.
* @result {Array<number>} The resulting 3x3 matrix. If the matrix
* can't be inverted, returns the identity 3x3 matrix.
*/
mat4inverseTranspose3:function(m4){
 // Operation equivalent to transpose(invert(mat3(m4)))
var m=[m4[0],m4[1],m4[2],m4[4],m4[5],m4[6],
   m4[8],m4[9],m4[10]];
var det=m[0] * m[4] * m[8] +
m[3] * m[7] * m[2] +
m[6] * m[1] * m[5] -
m[6] * m[4] * m[2] -
m[3] * m[1] * m[8] -
m[0] * m[7] * m[5];
if(det==0) {
return [1,0,0,0,1,0,0,0,1];
}
det=1.0/det;
return [
 (-m[5] * m[7] + m[4] * m[8])*det,
 (m[5] * m[6] - m[3] * m[8])*det,
 (-m[4] * m[6] + m[3] * m[7])*det,
 (m[2] * m[7] - m[1] * m[8])*det,
 (-m[2] * m[6] + m[0] * m[8])*det,
 (m[1] * m[6] - m[0] * m[7])*det,
 (-m[2] * m[4] + m[1] * m[5])*det,
 (m[2] * m[3] - m[0] * m[5])*det,
 (-m[1] * m[3] + m[0] * m[4])*det]
},
/**
 * Multiplies a 4x4 matrix by a scaling transformation.
 * @param {Array<number>|number} v3 Scaling factor along the
 * X axis.  If "v3y" and "v3z" are omitted, this value can instead
 * be a 3-element array giving the scaling factors along the X, Y, and
 * Z axes.
 * @param {number} v3y Scaling factor along the Y axis.
 * @param {number} v3z Scaling factor along the Z axis.
 * @return {Array<number>} The resulting 4x4 matrix.
 */
mat4scale:function(mat,v3,v3y,v3z){
  var scaleX,scaleY,scaleZ;
  if(typeof v3y!="undefined" && typeof v3z!="undefined"){
      scaleX=v3;
      scaleY=v3y;
      scaleZ=v3z;
  } else {
      scaleX=v3[0];
      scaleY=v3[1];
      scaleZ=v3[2];
  }
	return [
  mat[0]*scaleX, mat[1]*scaleX, mat[2]*scaleX, mat[3]*scaleX,
  mat[4]*scaleY, mat[5]*scaleY, mat[6]*scaleY, mat[7]*scaleY,
  mat[8]*scaleZ, mat[9]*scaleZ, mat[10]*scaleZ, mat[11]*scaleZ,
  mat[12], mat[13], mat[14], mat[15]
	];
},
/**
 * Returns a 4x4 matrix representing a scaling transformation.
 * @param {Array<number>|number} v3 Scaling factor along the
 * X axis.  If "v3y" and "v3z" are omitted, this value can instead
 * be a 3-element array giving the scaling factors along the X, Y, and
 * Z axes.
 * @param {number} v3y Scaling factor along the Y axis.
 * @param {number} v3z Scaling factor along the Z axis.
 * @return {Array<number>} The resulting 4x4 matrix.
 */
mat4scaled:function(v3,v3y,v3z){
  if(typeof v3y!="undefined" && typeof v3z!="undefined"){
   return [v3,0,0,0,0,v3y,0,0,0,0,v3z,0,0,0,0,1]
  } else {
   return [v3[0],0,0,0,0,v3[1],0,0,0,0,v3[2],0,0,0,0,1]
  }
},
/**
 * Returns a 4x4 matrix representing a translation.
 * @param {Array<number>|number} v3 Translation along the
 * X axis.  If "v3y" and "v3z" are omitted, this value can instead
 * be a 3-element array giving the translations along the X, Y, and
 * Z axes.
 * @param {number} v3y Translation along the Y axis.
 * @param {number} v3z Translation along the Z axis.
 * @return {Array<number>} The resulting 4x4 matrix.
 */
mat4translated:function(v3,v3y,v3z){
  var x,y,z;
  if(typeof v3y!="undefined" && typeof v3z!="undefined"){
      x=v3;
      y=v3y;
      z=v3z;
  } else {
      x=v3[0];
      y=v3[1];
      z=v3[2];
  }
  return [1,0,0,0,0,1,0,0,0,0,1,0,x,y,z,1]
},
/**
 * Multiplies a 4x4 matrix by a translation transformation.
 * @param {Array<number>} mat The matrix to multiply.
 * @param {Array<number>|number} v3 Translation along the
 * X axis.  If "v3y" and "v3z" are omitted, this value can instead
 * be a 3-element array giving the translations along the X, Y, and
 * Z axes.
 * @param {number} v3y Translation along the Y axis.
 * @param {number} v3z Translation along the Z axis.
 * @return {Array<number>} The resulting 4x4 matrix.
 */
mat4translate:function(mat,v3,v3y,v3z){
  var x,y,z;
  if(typeof v3y!="undefined" && typeof v3z!="undefined"){
      x=v3;
      y=v3y;
      z=v3z;
  } else {
      x=v3[0];
      y=v3[1];
      z=v3[2];
  }
  return [
  mat[0],mat[1],mat[2],mat[3],
  mat[4],mat[5],mat[6],mat[7],
  mat[8],mat[9],mat[10],mat[11],
  mat[0] * x + mat[4] * y + mat[8] * z + mat[12],
  mat[1] * x + mat[5] * y + mat[9] * z + mat[13],
  mat[2] * x + mat[6] * y + mat[10] * z + mat[14],
  mat[3] * x + mat[7] * y + mat[11] * z + mat[15]
  ]
},
/**
 * Returns a 4x4 matrix representing a perspective view.
 * This method assumes a right-handed coordinate system, in which
 * the z-axis points toward the viewer.
* @param {number}  fovY Vertical field of view, in degrees.  (The smaller
* this number, the bigger close objects appear to be.  As a result,
* zoom can be implemented by multiplying field of view by an
* additional factor.)
* @param {number}  aspectRatio The ratio of width to height of the viewport, usually
*  the scene's aspect ratio.
* @param {number} near The distance from the camera to
* the near clipping plane. Objects closer than this distance won't be
* seen. This should be slightly greater than 0.
* @param {number}  farZ The distance from the camera to
* the far clipping plane. Objects beyond this distance will be too far
* to be seen.
 * @return {Array<number>} The resulting 4x4 matrix.
 */
mat4perspective:function(fovY,aspectRatio,nearZ,farZ){
 var f = 1/Math.tan(fovY*GLMath.PiDividedBy360);
 var nmf = nearZ-farZ;
 nmf=1/nmf;
 return [f/aspectRatio, 0, 0, 0, 0, f, 0, 0, 0, 0,
   nmf*(nearZ+farZ), -1, 0, 0, nmf*nearZ*farZ*2, 0]
},
/**
 * Returns a 4x4 matrix representing a camera view.
* @param {Array<number>} viewerPos A 3-element vector specifying
* the camera position in world space.
* @param {Array<number>} lookingAt A 3-element vector specifying
* the point in world space that the camera is looking at.
* @param {Array<number>} up A 3-element vector specifying
* the up-vector direction.  May be omitted, in which case
* the default is a vector pointing positive on the Y axis.  This
* vector must not point in the same or opposite direction as
* the camera's view direction.
 * @return {Array<number>} The resulting 4x4 matrix.
 */
mat4lookat:function(viewerPos,lookingAt,up){
 if(!up)up=[0,1,0];
 var f=[viewerPos[0]-lookingAt[0],viewerPos[1]-lookingAt[1],viewerPos[2]-lookingAt[2]];
 if(GLMath.vec3length(f)<1e-6){
   return GLMath.mat4identity();
 }
 GLMath.vec3normInPlace(f);
 var s=GLMath.vec3cross(up,f);
 GLMath.vec3normInPlace(s);
 var u=GLMath.vec3cross(f,s);
 GLMath.vec3normInPlace(u);
 return [s[0],u[0],f[0],0,s[1],u[1],f[1],0,s[2],u[2],f[2],0,
    -GLMath.vec3dot(viewerPos,s),
    -GLMath.vec3dot(viewerPos,u),
    -GLMath.vec3dot(viewerPos,f),1];
},
/**
 * Returns a 4x4 matrix representing an orthographic projection.
 * In this projection, the left clipping plane is parallel to the right clipping
 * plane and the top to the bottom.
 * @param {number} l
 * @param {number} r
 * @param {number} b
 * @param {number} t
 * @param {number} n
 * @param {number} f
 * @return {Array<number>} The resulting 4x4 matrix.
 */
mat4ortho:function(l,r,b,t,n,f){
 var width=1/(r-l);
 var height=1/(t-b);
 var depth=1/(f-n);
 return [2*width,0,0,0,0,2*height,0,0,0,0,-2*depth,0,
   -(l+r)*width,-(t+b)*height,-(n+f)*depth,1];
},
/**
 * Returns a 4x4 matrix representing a 2D orthographic view.
 * @param {number} l Leftmost coordinate of the 2D view.
 * @param {number} r Rightmost coordinate of the 2D view.
 * @param {number} b Bottommost coordinate of the 2D view.
 * @param {number} t Topmost coordinate of the 2D view.
 * @return {Array<number>} The resulting 4x4 matrix.
 */
mat4ortho2d:function(l,r,b,t){
 return GLMath.mat4ortho2d(l,r,b,t,-1,1);
},
/**
 * Returns a 4x4 matrix representing a view frustum.
 * @param {number} l
 * @param {number} r
 * @param {number} b
 * @param {number} t
* @param {number} near The distance from the camera to
* the near clipping plane. Objects closer than this distance won't be
* seen. This should be slightly greater than 0.
* @param {number}  farZ The distance from the camera to
* the far clipping plane. Objects beyond this distance will be too far
* to be seen.
 * @return {Array<number>} The resulting 4x4 matrix.
 */
mat4frustum:function(l,r,b,t,n,f){
 var dn=2*n;
 var onedx=1/(r-l);
 var onedy=1/(t-b);
 var onedz=1/(f-n);
return [
    dn*onedx,0,0,0,
    0,dn*onedy,0,0,
    (l+r)*onedx,(t+b)*onedy,-(f+n)*onedz,-1,
   0,0,-(dn*f)*onedz,0];
},
/**
 * Modifies a 4x4 matrix by multiplying it by a 3-element vector.
 * @param {*} mat A 4x4 matrix.
 * @param {*} v3 A 3-element vector.
 * @return {Array<number>} The same parameter as "mat".
 */
mat4scaleInPlace:function(mat,v3){
  var scaleX=v3[0];
  var scaleY=v3[1];
  var scaleZ=v3[2];
  mat[0]*=scaleX;
  mat[4]*=scaleX;
  mat[8]*=scaleX;
  mat[12]*=scaleX;
  mat[1]*=scaleY;
  mat[5]*=scaleY;
  mat[9]*=scaleY;
  mat[13]*=scaleY;
  mat[2]*=scaleZ;
  mat[6]*=scaleZ;
  mat[10]*=scaleZ;
  mat[14]*=scaleZ;
  return mat;
},
/**
 * Multiplies two 4x4 matrices.  A new matrix is returned.
 * @param {*} a The first matrix.
 * @param {*} b The second matrix.
 * @return {Array<number>} The resulting 4x4 matrix.
 */
mat4multiply:function(a,b){
  var dst=[];
	for(var i = 0; i < 16; i+= 4){
		for(var j = 0; j < 4; j++){
			dst[i+j] =
				b[i]   * a[j]   +
				b[i+1] * a[j+4] +
				b[i+2] * a[j+8] +
				b[i+3] * a[j+12];
    }
  }
  return dst;
},
/**
* Multiplies two quaternions, creating a composite rotation.
 * @param {*} a The first quaternion.
 * @param {*} b The second quaternion.
 * @return {Array<number>} The resulting quaternion.
*/
quatMultiply:function(a,b){
	return [
	a[3] * b[0] + a[0] * b[3] + a[1] * b[2] - a[2] * b[1],
	a[3] * b[1] + a[1] * b[3] + a[2] * b[0] - a[0] * b[2],
	a[3] * b[2] + a[2] * b[3] + a[0] * b[1] - a[1] * b[0],
    a[3] * b[3] - a[0] * b[0] - a[1] * b[1] - a[2] * b[2]]
},
/**
 * Multiplies a 4x4 matrix by a rotation transformation,
 * and returns a new matrix.
 * @param {Array<number>} mat A 4x4 matrix to multiply.
 * @param {Array<number>|number} angle The desired angle
 * to rotate in degrees.  If "v", "vy", and "vz" are omitted, this can
 * instead be a 4-element array giving the axis
 * of rotation as the first three elements, followed by the angle
 * in degrees as the fourth element.
 * @param {Array<number>|number} v X-component of the axis
 * of rotation.  If "vy" and "vz" are omitted, this can
 * instead be a 3-element array giving the axis
 * of rotation in x, y, and z, respectively.
 * @param {number} vy Y-component of the axis
 * of rotation.
 * @param {number} vz Z-component of the axis
 * of rotation.
 * @return {Array<number>} The resulting 4x4 matrix.
 */
mat4rotate:function(mat,angle,v,vy,vz){
var v0,v1,v2,ang;
if(typeof vy!="undefined" && typeof vz!="undefined"){
 v0=v;
 v1=vy;
 v2=vz;
 ang=angle*GLMath.PiDividedBy180;
} else if(typeof v=="undefined"){
 v0=angle[0];
 v1=angle[1];
 v2=angle[2];
 ang=angle[3];
 ang=ang*GLMath.PiDividedBy180;
} else {
 v0=v[0];
 v1=v[1];
 v2=v[2];
 ang=angle*GLMath.PiDividedBy180;
}
var cost = Math.cos(ang);
var sint = Math.sin(ang);
if( 1 == v0 && 0 == v1 && 0 == v2 ) {
  return [mat[0], mat[1], mat[2], mat[3],
  cost*mat[4]+mat[8]*sint, cost*mat[5]+mat[9]*sint, cost*mat[6]+mat[10]*sint, cost*mat[7]+mat[11]*sint,
  cost*mat[8]-sint*mat[4], cost*mat[9]-sint*mat[5], cost*mat[10]-sint*mat[6], cost*mat[11]-sint*mat[7],
  mat[12], mat[13], mat[14], mat[15]]
} else if( 0 == v0 && 1 == v1 && 0 == v2 ) {
return [cost*mat[0]-sint*mat[8], cost*mat[1]-sint*mat[9], cost*mat[2]-sint*mat[10], cost*mat[3]-sint*mat[11],
  mat[4], mat[5], mat[6], mat[7],
  cost*mat[8]+mat[0]*sint, cost*mat[9]+mat[1]*sint, cost*mat[10]+mat[2]*sint, cost*mat[11]+mat[3]*sint,
  mat[12], mat[13], mat[14], mat[15]]
} else if( 0 == v0 && 0 == v1 && 1 == v2 ) {
 return [cost*mat[0]+mat[4]*sint, cost*mat[1]+mat[5]*sint, cost*mat[2]+mat[6]*sint, cost*mat[3]+mat[7]*sint,
  cost*mat[4]-sint*mat[0], cost*mat[5]-sint*mat[1], cost*mat[6]-sint*mat[2], cost*mat[7]-sint*mat[3],
  mat[8], mat[9], mat[10], mat[11], mat[12], mat[13], mat[14], mat[15]]
} else if(0==v0 && 0 == v1 && 0==v2){
 return mat.slice(0,16);
} else {
var iscale = 1.0 / Math.sqrt(v0*v0+v1*v1+v2*v2);
v0 *=iscale;
v1 *=iscale;
v2 *=iscale;
var x2 = v0 * v0;
var y2 = v1 * v1;
var z2 = v2 * v2;
var mcos = 1.0 - cost;
var xy = v0 * v1;
var xz = v0 * v2;
var yz = v1 * v2;
var xs = v0 * sint;
var ys = v1 * sint;
var zs = v2 * sint;
var v1 = mcos*x2;
var v10 = mcos*yz;
var v12 = mcos*z2;
var v3 = mcos*xy;
var v5 = mcos*xz;
var v7 = mcos*y2;
var v15 = cost+v1;
var v16 = v3+zs;
var v17 = v5-ys;
var v18 = cost+v7;
var v19 = v3-zs;
var v20 = v10+xs;
var v21 = cost+v12;
var v22 = v5+ys;
var v23 = v10-xs;
return [
mat[0]*v15+mat[4]*v16+mat[8]*v17, mat[1]*v15+mat[5]*v16+mat[9]*v17,
mat[10]*v17+mat[2]*v15+mat[6]*v16, mat[11]*v17+mat[3]*v15+mat[7]*v16,
mat[0]*v19+mat[4]*v18+mat[8]*v20, mat[1]*v19+mat[5]*v18+mat[9]*v20,
mat[10]*v20+mat[2]*v19+mat[6]*v18, mat[11]*v20+mat[3]*v19+mat[7]*v18,
mat[0]*v22+mat[4]*v23+mat[8]*v21, mat[1]*v22+mat[5]*v23+mat[9]*v21,
mat[10]*v21+mat[2]*v22+mat[6]*v23, mat[11]*v21+mat[3]*v22+mat[7]*v23,
mat[12], mat[13], mat[14], mat[15]];
}
},
/**
 * Returns a 4x4 matrix representing a rotation transformation.
 * @param {Array<number>} mat A 4x4 matrix to multiply.
 * @param {Array<number>|number} angle The desired angle
 * to rotate in degrees.  If "v", "vy", and "vz" are omitted, this can
 * instead be a 4-element array giving the axis
 * of rotation as the first three elements, followed by the angle
 * in degrees as the fourth element.
 * @param {Array<number>|number} v X-component of the axis
 * of rotation.  If "vy" and "vz" are omitted, this can
 * instead be a 3-element array giving the axis
 * of rotation in x, y, and z, respectively.
 * @param {number} vy Y-component of the axis
 * of rotation.
 * @param {number} vz Z-component of the axis
 * of rotation.
 * @return {Array<number>} The resulting 4x4 matrix.
 */
mat4rotated:function(angle,v,vy,vz){
var v0,v1,v2,ang;
if(typeof vy!="undefined" && typeof vz!="undefined"){
 v0=v;
 v1=vy;
 v2=vz;
 ang=angle*GLMath.PiDividedBy180;
} else if(typeof v=="undefined"){
 v0=angle[0];
 v1=angle[1];
 v2=angle[2];
 ang=angle[3];
 ang=ang*GLMath.PiDividedBy180;
} else {
 v0=v[0];
 v1=v[1];
 v2=v[2];
 ang=angle*GLMath.PiDividedBy180;
}
var cost = Math.cos(ang);
var sint = Math.sin(ang);
if( 1 == v0 && 0 == v1 && 0 == v2 ) {
  return[1, 0, 0, 0, 0, cost, sint, 0, 0, -sint, cost, 0, 0, 0, 0, 1]
} else if( 0 == v0 && 1 == v1 && 0 == v2 ) {
return [cost, 0, -sint, 0, 0, 1, 0, 0, sint, 0, cost, 0, 0, 0, 0, 1]
} else if( 0 == v0 && 0 == v1 && 1 == v2 ) {
 return [cost, sint, 0, 0, -sint, cost, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1]
} else if(0==v0 && 0 == v1 && 0==v2){
 return [1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1];
} else {
var iscale = 1.0 / Math.sqrt(v0*v0+v1*v1+v2*v2);
v0 *=iscale;
v1 *=iscale;
v2 *=iscale;
var x2 = v0 * v0;
var y2 = v1 * v1;
var z2 = v2 * v2;
var xy = v0 * v1;
var xz = v0 * v2;
var yz = v1 * v2;
var xs = v0 * sint;
var ys = v1 * sint;
var zs = v2 * sint;
var mcos = 1.0 - cost;
var v0 = mcos*xy;
var v1 = mcos*xz;
var v2 = mcos*yz;
return [cost+mcos*x2, v0+zs, v1-ys, 0, v0-zs, cost+mcos*y2, v2+xs, 0, v1+ys,
  v2-xs, cost+mcos*z2, 0, 0, 0, 0, 1];
}
}
};
/** Finds the dot product of two quaternions.
 @function
 @param {Array<number>} a The first quaternion.
 @param {Array<number>} b The second quaternion.
 @return {number} */
GLMath.quatDot=GLMath.vec4dot;
/**
 * Converts a quaternion to its normalized version.
 * When a quaternion is normalized, the distance from the origin
 * to that quaternion becomes 1 (unless all its components are 0.)
 * @function
 * @param {Array<number>} vec A quaternion.
 * @return {Array<number>} The parameter "vec".
 */
GLMath.quatNormInPlace=GLMath.vec4normInPlace;
/**
 * Converts a quaternion to its normalized version; returns a new quaternion.
 * When a quaternion is normalized, the distance from the origin
 * to that quaternion becomes 1 (unless all its components are 0.)
 * @function
 * @param {Array<number>} vec A quaternion.
 * @return {Array<number>} The normalized quaternion.
 */
GLMath.quatNorm=GLMath.vec4norm;
/** Returns the distance of this quaternion from the origin.
* @function
 @param {Array<number>} quat The quaternion.
  @return {number} */
GLMath.quatLength=GLMath.vec4length;
/**
 * Multiplies each element of a quaternion by a factor
 * and stores the result in that vector.
 * @function
 * @param {Array<number>} a A quaternion.
 * @param {number} scalar A factor to multiply.
 * @return {Array<number>} The parameter "a".
 */
GLMath.quatScaleInPlace=GLMath.vec4scaleInPlace;
/**
 * Returns a copy of a quaternion.
* @function
 * @return {Array<number>}
 */
GLMath.quatCopy=GLMath.vec4copy;
/**
 @private
 @const
*/
GLMath.PiDividedBy180 = 0.01745329251994329576923690768489;
/**
 @private
 @const
*/
GLMath.PiDividedBy360 = 0.00872664625997164788461845384244;
/**
 @private
 @const
*/
GLMath.Num360DividedByPi = 114.59155902616464175359630962821;
/**
 @private
 @const
*/
GLMath.Num180DividedByPi = 57.295779513082320876798154814105;

	exports["GLMath"]=GLMath;
}));

/**
* Evaluator for a parametric surface in the form
* of a tube extruded from a parametric curve.
* @class
* @alias glutil.ExtrudedTube
* @param {Object} func An object that must contain a function
* named "evaluate", which takes the following parameter:<ul>
* <li><code>u</code> - A curve coordinate, generally from 0 to 1.
* </ul>
* The evaluator function returns a 3-element array: the first
* element is the X coordinate of the curve's position, the second
* element is the Y coordinate, and the third is the Z coordinate.
* @param {number|undefined} thickness Radius of the
* extruded tube.  If this parameter is null or omitted, the default is 0.125.
* @param {Object|undefined} sweptCurve Object describing
* a curve to serve as the cross section of the extruded shape,
* corresponding to the V coordinate of the ExtrudedTube's
* "evaluate" method. If this parameter is null or omitted, uses a circular cross section <code>(sin(u),
* cos(u), 0)</code> in which the V coordinate ranges from 0 through
* 1.  The curve object must contain a function
* named "evaluate", which takes the following parameter:<ul>
* <li><code>u</code> - A curve coordinate, generally from 0 to 1.
* </ul>
* The evaluator function returns an array with at least 2 elements:
* the first element is the X coordinate of the curve's position and
* the second element is the Y coordinate.<p>
* The cross section will generally have a radius of 1 unit; bigger
* or smaller cross sections will affect the meaning of the "thickness"
* parameter.
*/
ExtrudedTube._EPSILON=0.000001
function ExtrudedTube(func, thickness, sweptCurve){
 function distSq(a,b){
  var dx=b[0]-a[0];
  var dy=b[1]-a[1];
  var dz=b[2]-a[2];
  return dx*dx+dy*dy+dz*dz;
 }
 this.thickness=thickness==null ? 0.125 : thickness;
 this.sweptCurve=sweptCurve;
 this.func=func;
 this.normals=[];
 this.bitangents=[];
 this.tangents=[];
 var res=50;
 var nextSample=null;
 var firstSample=null;
 for(var i=0;i<=res;i++){
  var t=i/res;
  var e0=(nextSample) ? nextSample : func.evaluate(t);
  e0[2]=0;
  var e01=func.evaluate(i==res ? t-ExtrudedTube._EPSILON : t+ExtrudedTube._EPSILON);
  e01[2]=0;
  nextSample=(i==res) ? e0 : func.evaluate((i+1)/res);
  if(i==0)firstSample=e0;
  var tangent=GLMath.vec3normInPlace(
    GLMath.vec3sub(e01,e0));
  if(t==1){
   GLMath.vec3scaleInPlace(tangent,-1);
  }
  var normal;
  if(i>0){
   normal=GLMath.vec3normInPlace(
    GLMath.vec3cross(this.bitangents[i-1],tangent));
  } else {
   normal=ExtrudedTube._normalFromTangent(tangent);
  }
  var bitangent=GLMath.vec3normInPlace(
    GLMath.vec3cross(tangent,normal));
  this.normals[i]=normal;
  this.bitangents[i]=bitangent;
  this.tangents[i]=tangent;
 }
 var totaltheta=0;
 if(firstSample && nextSample &&
   distSq(firstSample,nextSample) < ExtrudedTube._EPSILON){
  // curve's positions are the same at 0 and 1
  this.normals[res]=this.normals[0];
  this.tangents[res]=this.tangents[0];
  this.bitangents[res]=this.bitangents[0];
  for(var i=0;i<this.tangents.length-1;i++){
   var bitangent=GLMath.vec3cross(this.tangents[i+1],this.tangents[i]);
   if(GLMath.vec3dot(bitangent,bitangent)<ExtrudedTube._EPSILON){
    this.normals[i+1]=this.normals[i];
    this.bitangents[i]=GLMath.vec3normInPlace(bitangent);
   } else {
     GLMath.vec3normInPlace(bitangent);
     // Both tangents will have been normalized, so cosTheta will be set to
     // the cosine of the angle between them
     var cosTheta=GLMath.vec3dot(this.tangents[i],this.tangents[i+1]);
     var norm=ExtrudedTube._rotateVectorGivenCosine(this.normals[i],cosTheta,bitangent);
     this.normals[i+1]=GLMath.vec3normInPlace(norm);
     this.bitangents[i]=bitangent;
   }
  }
 }
}
// NOTE: Assumes cosineOfAngle ranges from -1 through 1 and that
// rotationAxis is normalized
ExtrudedTube._rotateVectorGivenCosine=function(vector, cosineOfAngle, rotationAxis){
  var sineOfAngle = Math.sqrt(1.0 - cosineOfAngle * cosineOfAngle);
  var t2 = rotationAxis[0] * sineOfAngle;
  var t3 = rotationAxis[1] * sineOfAngle;
  var t4 = rotationAxis[2] * sineOfAngle;
  var t5 = 1.0 - cosineOfAngle;
  var t6 = rotationAxis[0] * t5;
  var t7 = rotationAxis[1] * t5;
  var t8 = rotationAxis[2] * t5;
  var t9 = [];
  var t10 = [];
  var t11 = [];
  t9[0] = ((rotationAxis[0] * t6) + cosineOfAngle);
  t9[1] = ((rotationAxis[1] * t6) + t4);
  t9[2] = ((rotationAxis[0] * t8) - t3);
  t10[0] = ((rotationAxis[0] * t7) - t4);
  t10[1] = ((rotationAxis[1] * t7) + cosineOfAngle);
  t10[2] = ((rotationAxis[1] * t8) + t2);
  t11[0] = ((rotationAxis[0] * t8) + t3);
  t11[1] = ((rotationAxis[1] * t8) - t2);
  t11[2] = ((rotationAxis[2] * t8) + cosineOfAngle);
  return [
    (((t9[0] * vector[0]) + t10[0] * vector[1]) + t11[0] * vector[2]), 
    (((t9[1] * vector[0]) + t10[1] * vector[1]) + t11[1] * vector[2]), 
    (((t9[2] * vector[0]) + t10[2] * vector[1]) + t11[2] * vector[2])];
}

ExtrudedTube.prototype._getBasisVectors=function(u,val){
 var b,n,t;
 if(u>=0&& u<=1 && false){
// if(u>=0&& u<=1){ // TODO
  var index=u*(this.bitangents.length-1);
   index=Math.floor(index);
   var e0=this.func.evaluate(u);
   var e01=this.func.evaluate(u+ExtrudedTube._EPSILON);
   var tangent=GLMath.vec3normInPlace(
    GLMath.vec3sub(e01,e0));
   var normal=GLMath.vec3normInPlace(
    GLMath.vec3cross(this.bitangents[index],tangent))
   var bitangent=GLMath.vec3normInPlace(
    GLMath.vec3cross(tangent,normal));
   
   b=bitangent;
   n=normal;
   t=tangent;
 } else {
  var e0=this.func.evaluate(u);
  var e01=this.func.evaluate(u+ExtrudedTube._EPSILON);
  var tangent=GLMath.vec3normInPlace(
    GLMath.vec3sub(e01,e0));
  var normal=ExtrudedTube._normalFromTangent(tangent);
  var bitangent=GLMath.vec3normInPlace(
    GLMath.vec3cross(tangent,normal));
  b=bitangent;
  n=normal;
  t=tangent;
 }
 val[0]=n[0];
 val[1]=n[1];
 val[2]=n[2];
 val[3]=b[0];
 val[4]=b[1];
 val[5]=b[2];
 val[6]=t[0];
 val[7]=t[1];
 val[8]=t[2];
}
ExtrudedTube._normalFromTangent=function(tangent){
 var normal=GLMath.vec3normInPlace(
   GLMath.vec3cross(tangent,[0,0,1]));
 if(GLMath.vec3dot(normal,normal)<ExtrudedTube._EPSILON){
   normal=GLMath.vec3normInPlace(GLMath.vec3cross(tangent,[0,1,0]));
 }
 return normal;
}
/**
* Generates a point on the extruded tube from the given u and v coordinates.
* @param {number} u U coordinate.
* @param {number} v V coordinate.
* @return {Array<number>} A 3-element array specifying a 3D point.
*/
ExtrudedTube.prototype.evaluate=function(u, v){
 var basisVectors=[];
 var sample=this.func.evaluate(u);
 this._getBasisVectors(u,basisVectors);
 var t1,t2,sx,sy,sz;
 if(this.sweptCurve){
  var vpos=this.sweptCurve.evaluate(v);
  t1 = vpos[0];
  t2 = vpos[1];
  var t3=vpos[2];
  sx = sample[0]+(basisVectors[0]*t2+basisVectors[3]*t1+basisVectors[6]*t3)*this.thickness;
  sy = sample[1]+(basisVectors[1]*t2+basisVectors[4]*t1+basisVectors[7]*t3)*this.thickness;
  sz = sample[2]+(basisVectors[2]*t2+basisVectors[5]*t1+basisVectors[8]*t3)*this.thickness;
 } else {
  var vt=GLMath.PiTimes2*v;
  t1 = Math.cos(vt);
  t2 = Math.sin(vt);
  sx = sample[0]+(basisVectors[0]*t2+basisVectors[3]*t1)*this.thickness;
  sy = sample[1]+(basisVectors[1]*t2+basisVectors[4]*t1)*this.thickness;
  sz = sample[2]+(basisVectors[2]*t2+basisVectors[5]*t1)*this.thickness;
 }
 return [sx,sy,sz];
}
/**
* Represents a knot given coefficients in the form of the Fourier series<p>
* <b>F</b>(u) = &FourierKnot;<sub>i=1, n</sub> <b>a</b> cos(<i>iu</i>) +  <b>b</b> sin(<i>iu</i>).<p>
* @class
* @alias glutil.ExtrudedTube
* @param {Array<Array<number>>} a
* @param {Array<Array<number>>} b
*/
function FourierKnot(a,b){
 this.a=a; // Cosine coefficients
 this.b=b; // Sine coefficients
 if(this.a.length!=this.b.length){
  throw new Error("a and b must be the same length");
 }
 this.evaluate=function(u){
  var ret=[0,0,0];
  for(var i=0;i<this.a.length;i++){
   var iu=(i+1)*u;
   var c=Math.cos(iu);
   var s=Math.sqrt(1-(c*c));
   ret[0]+=this.a[0]*c+this.b[0]*s;
   ret[1]+=this.a[1]*c+this.b[1]*s;
   ret[2]+=this.a[2]*c+this.b[2]*s;
  }
  return ret;
 }
}
/*
Written by Peter O. in 2015.

Any copyright is dedicated to the Public Domain.
http://creativecommons.org/publicdomain/zero/1.0/
If you like this, you should donate to Peter O.
at: http://upokecenter.dreamhosters.com/articles/donate-now-2/
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

var GLMath={
vec3cross:function(a,b){
return [a[1]*b[2]-a[2]*b[1],
 a[2]*b[0]-a[0]*b[2],
 a[0]*b[1]-a[1]*b[0]];
},
vec3dot:function(a,b){
return a[0]*b[0]+a[1]*b[1]+a[2]*b[2];
},
vec3addInPlace:function(a,b){
var b0=b[0];
var b1=b[1];
a[0]+=b0;
a[1]+=b1;
},
vec3subInPlace:function(a,b){
var b0=b[0];
var b1=b[1];
a[0]-=b0;
a[1]-=b1;
},
vec3scaleInPlace:function(a,scalar){
a[0]*=scalar;
a[1]*=scalar;
a[2]*=scalar;
},
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
vec3norm:function(vec){
 var ret=[vec[0],vec[1],vec[2]]
 GLMath.vec3normInPlace(ret);
 return ret;
},
vec3length:function(a){
 var dx=a[0];
 var dy=a[1];
 var dz=a[2];
 return Math.sqrt(dx*dx+dy*dy+dz*dz);
},
mat4identity:function(){
 return [1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1]
},
mat4copy:function(mat){
 return mat.slice(0,16);
},
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
mat4scale:function(mat,v3, v3y, v3z){
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
mat3identity:function(){
 return [1,0,0,0,1,0,0,0,1];
},
mat4scaled:function(v3,v3y,v3z){
  if(typeof v3y!="undefined" && typeof v3z!="undefined"){
   return [v3,0,0,0,0,v3y,0,0,0,0,v3z,0,0,0,0,1]
  } else {
   return [v3[0],0,0,0,0,v3[1],0,0,0,0,v3[2],0,0,0,0,1]
  }
},
mat4translated:function(v3,v3y,v3z){
  if(typeof v3y!="undefined" && typeof v3z!="undefined"){
   return [1,0,0,0,0,1,0,0,0,0,1,0,v3,v3y,v3z,1]
  } else {
   return [1,0,0,0,0,1,0,0,0,0,1,0,v3[0],v3[1],v3[2],1]
  }
},
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
mat4perspective:function(fovY,aspectRatio,nearZ,farZ){
 var f = 1/Math.tan(fovY*Math.PI/360);
 var nmf = nearZ-farZ;
 nmf=1/nmf;
 return [f/aspectRatio, 0, 0, 0, 0, f, 0, 0, 0, 0,
   nmf*(nearZ+farZ), -1, 0, 0, nmf*nearZ*farZ*2, 0]
},
mat4lookat:function(viewerPos, lookingAt, up){
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
mat4ortho:function(l,r,b,t,n,f){
 var width=1/(r-l);
 var height=1/(t-b);
 var depth=1/(f-n);
 return [2*width,0,0,0,0,2*height,0,0,0,0,-2*depth,0,
   -(l+r)*width,-(t+b)*height,-(n+f)*depth,1];
},
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
},
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
mat4rotate:function(mat, angle, v, vy, vz){
angle=angle*Math.PI/180;
var cost = Math.cos(angle);
var sint = Math.sin(angle);
var v0,v1,v2;
if(typeof vy!="undefined" && typeof vz!="undefined"){
 v0=v;
 v1=vy;
 v2=vz;
} else {
 v0=v[0];
 v1=v[1];
 v2=v[2];
}
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
mat4rotated:function(angle, v, vy, vz){
angle=angle*Math.PI/180;
var cost = Math.cos(angle);
var sint = Math.sin(angle);
var v0,v1,v2;
if(typeof vy!="undefined" && typeof vz!="undefined"){
 v0=v;
 v1=vy;
 v2=vz;
} else {
 v0=v[0];
 v1=v[1];
 v2=v[2];
}
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
	exports["GLMath"]=GLMath;
}));

/*
Written by Peter O. in 2015.

Any copyright is dedicated to the Public Domain.
http://creativecommons.org/publicdomain/zero/1.0/
If you like this, you should donate to Peter O.
at: http://peteroupc.github.io/
*/
/* global H3DU, H3DU.Mesh */

/** @private */
H3DU.SubMeshBuffer=function(mesh){
 "use strict";
 this.vertices=new Float32Array(mesh.vertices)
 if(mesh.vertices.length>=65536 || mesh.indices.length>=65536){
  this.indexBufferSize=4;
  this.indices=new Uint32Array(mesh.indices);
 } else if(mesh.vertices.length<=256 && mesh.indices.length<=256){
  this.indexBufferSize=1;
  this.indices=new Uint8Array(mesh.indices);
 } else {
  this.indexBufferSize=2;
  this.indices=new Uint16Array(mesh.indices);
 }
  this.stride=mesh.getStride;
  this.numVertices=mesh.vertices.length/this.stride;
  this.facesLength=mesh.indices.length;
  this.format=mesh.attributeBits;
  this._stride=H3DU.Mesh._getStride(this.format);
  this._attribsUsed=[
   0,
   H3DU.Mesh._normalOffset(this.format),
   H3DU.Mesh._colorOffset(this.format),
   H3DU.Mesh._texCoordOffset(this.format),
   H3DU.Mesh._tangentOffset(this.format),
   H3DU.Mesh._bitangentOffset(this.format)
  ];
  this._sizes=[3,3,3,2,3,3];
};
/**
 * @private */
H3DU.SubMeshBuffer.prototype.primitiveCount=function(){
  "use strict";
if((this.format&H3DU.Mesh.LINES_BIT)!==0)
   return Math.floor(this.facesLength/2);
  if((this.format&H3DU.Mesh.POINTS_BIT)!==0)
   return this.facesLength;
  return Math.floor(this.facesLength/3);
};
/**
* A geometric mesh in the form of buffer objects.
* @class
* @alias H3DU.MeshBuffer
* @param {H3DU.Mesh} mesh A geometric mesh object.
*/
H3DU.MeshBuffer = function(mesh){
 "use strict";
this.subMeshes=[];
 this._bounds=mesh.getBoundingBox();
 for(var i=0;i<mesh.subMeshes.length;i++){
  var sm=mesh.subMeshes[i];
  // skip empty submeshes
  if(sm.indices.length===0)continue;
  this.subMeshes.push(new H3DU.SubMeshBuffer(
    sm));
 }
}

H3DU.MeshBuffer.prototype.getBounds=function(){
 "use strict";
 if(!this._bounds){
  var empty=true;
  var inf=Number.POSITIVE_INFINITY;
  var ret=[inf,inf,inf,-inf,-inf,-inf];
  for(var i=0;i<this.subMeshes.length;i++){
   var sm=this.subMeshes[i];
   var stride=sm.stride;
   var v=sm.vertices;
   for(var j=0;j<sm.indices.length;j++){
    var vi=sm.indices[j]*stride;
    if(empty){
     empty=false;
     ret[0]=ret[3]=v[vi];
     ret[1]=ret[4]=v[vi+1];
     ret[2]=ret[5]=v[vi+2];
    } else {
     ret[0]=Math.min(ret[0],v[vi]);
     ret[3]=Math.max(ret[3],v[vi]);
     ret[1]=Math.min(ret[1],v[vi+1]);
     ret[4]=Math.max(ret[4],v[vi+1]);
     ret[2]=Math.min(ret[2],v[vi+2]);
     ret[5]=Math.max(ret[5],v[vi+2]);
    }
   }
  }
  this._bounds=ret;
 }
 return this._bounds;
};
/** @private */
H3DU.MeshBuffer.prototype.getFormat=function(){
 "use strict";
var format=0;
 for(var i=0;i<this.subMeshes.length;i++){
  var sm=this.subMeshes[i];
  format|=sm.format;
 }
 return format;
};
/**
 * Not documented yet.
 */
H3DU.MeshBuffer.prototype.vertexCount=function(){
 "use strict";
var ret=0;
 for(var i=0;i<this.subMeshes.length;i++){
  ret+=this.subMeshes[i].numVertices;
 }
 return ret;
};
/**
 * Gets the number of primitives (triangles, lines,
* and points) composed by all shapes in this mesh.
* @param {*} Return value.*/
H3DU.MeshBuffer.prototype.primitiveCount=function(){
 "use strict";
var ret=0;
 for(var i=0;i<this.subMeshes.length;i++){
  ret+=this.subMeshes[i].primitiveCount();
 }
 return ret;
};

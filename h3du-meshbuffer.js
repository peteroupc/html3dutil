/*
Written by Peter O. in 2015.

Any copyright is dedicated to the Public Domain.
http://creativecommons.org/publicdomain/zero/1.0/
If you like this, you should donate to Peter O.
at: http://upokecenter.dreamhosters.com/articles/donate-now-2/
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
  this.numVertices=mesh.vertices.length/mesh.getStride();
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
* @param {*} mesh A geometric mesh object.
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
/** @private */
H3DU.MeshBuffer.prototype._getBounds=function(){
 "use strict";
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

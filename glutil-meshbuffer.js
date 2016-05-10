/*
Written by Peter O. in 2015.

Any copyright is dedicated to the Public Domain.
http://creativecommons.org/publicdomain/zero/1.0/
If you like this, you should donate to Peter O.
at: http://upokecenter.dreamhosters.com/articles/donate-now-2/
*/
/* global GLUtil, Mesh */

/** @private */
var SubMeshBuffer=function(mesh){
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
  this._stride=Mesh._getStride(this.format);
  this._attribsUsed=[
   0,
   Mesh._normalOffset(this.format),
   Mesh._colorOffset(this.format),
   Mesh._texCoordOffset(this.format),
   Mesh._tangentOffset(this.format),
   Mesh._bitangentOffset(this.format)
  ];
  this._sizes=[3,3,3,2,3,3];
};
/**
 * @private */
SubMeshBuffer.prototype.primitiveCount=function(){
  "use strict";
if((this.format&Mesh.LINES_BIT)!==0)
   return Math.floor(this.facesLength/2);
  if((this.format&Mesh.POINTS_BIT)!==0)
   return this.facesLength;
  return Math.floor(this.facesLength/3);
};
/**
* A geometric mesh in the form of buffer objects.
* @class
* @private
* @alias glutil.MeshBuffer
* @param {*} mesh A geometric mesh object.
*/
function MeshBuffer(mesh){
 "use strict";
this.subMeshes=[];
 this._bounds=mesh.getBoundingBox();
 for(var i=0;i<mesh.subMeshes.length;i++){
  var sm=mesh.subMeshes[i];
  // skip empty submeshes
  if(sm.indices.length===0)continue;
  this.subMeshes.push(new SubMeshBuffer(
    sm));
 }
}
/** @private */
MeshBuffer.prototype._getBounds=function(){
 "use strict";
return this._bounds;
};
/** @private */
MeshBuffer.prototype.getFormat=function(){
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
MeshBuffer.prototype.vertexCount=function(){
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
MeshBuffer.prototype.primitiveCount=function(){
 "use strict";
var ret=0;
 for(var i=0;i<this.subMeshes.length;i++){
  ret+=this.subMeshes[i].primitiveCount();
 }
 return ret;
};

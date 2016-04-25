/*
Written by Peter O. in 2015.

Any copyright is dedicated to the Public Domain.
http://creativecommons.org/publicdomain/zero/1.0/
If you like this, you should donate to Peter O.
at: http://upokecenter.dreamhosters.com/articles/donate-now-2/
*/
/* global GLUtil, Mesh */

/** @private */
var BufferedSubMesh=function(mesh, context){
 "use strict";
 var vertbuffer=context.createBuffer();
 if(!vertbuffer)throw new Error("can't create buffer")
 var facebuffer=context.createBuffer();
 if(!facebuffer)throw new Error("can't create face buffer")
 this.arrayObjectExt=context.getExtension("OES_vertex_array_object")
 this.arrayObjectExtContext=context;
 this.vao=null;
 if(this.arrayObjectExt){
   this.vao=this.arrayObjectExt.createVertexArrayOES();
 }
 context.bindBuffer(context.ARRAY_BUFFER, vertbuffer);
 context.bindBuffer(context.ELEMENT_ARRAY_BUFFER, facebuffer);
 context.bufferData(context.ARRAY_BUFFER,
   new Float32Array(mesh.vertices), context.STATIC_DRAW);
 var type=context.UNSIGNED_SHORT;
 if(mesh.vertices.length>=65536 || mesh.indices.length>=65536){
  type=context.UNSIGNED_INT;
  context.bufferData(context.ELEMENT_ARRAY_BUFFER,
    new Uint32Array(mesh.indices), context.STATIC_DRAW);
 } else if(mesh.vertices.length<=256 && mesh.indices.length<=256){
  type=context.UNSIGNED_BYTE;
  context.bufferData(context.ELEMENT_ARRAY_BUFFER,
    new Uint8Array(mesh.indices), context.STATIC_DRAW);
 } else {
  context.bufferData(context.ELEMENT_ARRAY_BUFFER,
    new Uint16Array(mesh.indices), context.STATIC_DRAW);
 }
  this.verts=vertbuffer;
  this.faces=facebuffer;
  this.numVertices=mesh.vertices.length/mesh.getStride();
  this.facesLength=mesh.indices.length;
  this.type=type;
  this.format=mesh.attributeBits;
  this._stride=Mesh._getStride(this.format);
  this.context=context;
  this._lastKnownProgram=null;
  this._attribLocations=[];
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
BufferedSubMesh.prototype._getVaoExtension=function(context){
 if(this.arrayObjectExtContext==context){
  return this.arrayObjectExt;
 } else {
  return context.getExtension("OES_vertex_array_object")
 }
}
/**
* A geometric mesh in the form of buffer objects.
* @class
* @alias glutil.BufferedMesh
* @param {glutil.Mesh} mesh A geometric mesh object.
* @param {WebGLRenderingContext|object} context A WebGL context to
*  create a buffer from, or an object, such as Scene3D, that
* implements a no-argument <code>getContext</code> method
* that returns a WebGL context. (Note that this constructor uses
*  a WebGL context rather than a shader program because
*  buffer objects are not specific to shader programs.)
*/
function BufferedMesh(mesh, context){
 "use strict";
this.subMeshes=[];
 this.context=GLUtil._toContext(context);
 this._bounds=mesh.getBoundingBox();
 for(var i=0;i<mesh.subMeshes.length;i++){
  var sm=mesh.subMeshes[i];
  // skip empty submeshes
  if(sm.indices.length===0)continue;
  this.subMeshes.push(new BufferedSubMesh(
    sm,this.context));
 }
}
/** @private */
BufferedMesh.prototype._getBounds=function(){
 "use strict";
return this._bounds;
};
/**
 * Returns the WebGL context associated with this object.
 * @return {WebGLRenderingContext}
 */
BufferedMesh.prototype.getContext=function(){
 "use strict";
return this.context;
};
/** @private */
BufferedMesh.prototype.getFormat=function(){
 "use strict";
var format=0;
 for(var i=0;i<this.subMeshes.length;i++){
  var sm=this.subMeshes[i];
  format|=sm.format;
 }
 return format;
};

/**
* Binds the buffers in this object to attributes according
* to their data format, and draws the elements in this mesh
* according to the data in its buffers.
* @param {glutil.ShaderProgram} program A shader program object to get
* the IDs from for attributes named "position", "normal",
* "colorAttr", and "uv", and the "useColorAttr" uniform.
*/
BufferedMesh.prototype.draw=function(program){
 "use strict";
for(var i=0;i<this.subMeshes.length;i++){
  this.subMeshes[i].draw(program);
 }
};
/**
* Deletes the vertex and index buffers associated with this object.
*/
BufferedMesh.prototype.dispose=function(){
 "use strict";
for(var i=0;i<this.subMeshes.length;i++){
  this.subMeshes[i].dispose();
 }
 this.subMeshes=[];
};
/**
 * @private */
BufferedSubMesh.prototype.dispose=function(){
 "use strict";
if(this.verts!==null)
  this.context.deleteBuffer(this.verts);
 if(this.faces!==null)
  this.context.deleteBuffer(this.faces);
 if(this.vao!==null){
  this.arrayObjectExt.deleteVertexArrayOES(this.vao);
 }
 this.verts=null;
 this.faces=null;
 this.vao=null;
 this._lastKnownProgram=null;
 this._attribLocations=[];
};

BufferedSubMesh.prototype._getAttribLocations=function(program,context){
 if(this._lastKnownProgram!=program){
  this._lastKnownProgram=program;
  this._attribLocations=[
    program.get("position"),
    program.get("normal"),
    program.get("colorAttr"),
    program.get("uv"),
    program.get("tangent"),
    program.get("bitangent")];
  for(var i=0;i<6;i++){
   if(this._attribLocations[i]==null){
    this._attribLocations[i]=-1;
   }
  }
  return true;
 }
 return false;
}

/**
 * @private */
BufferedSubMesh.prototype._prepareDraw=function(program, context){
  var rebind=this._getAttribLocations(program,context);
  var vaoExt=this._getVaoExtension(context);
  if(this.vao) {
   vaoExt.bindVertexArrayOES(this.vao);
  } else {
   rebind=true;
  }
  if(rebind) {
   context.bindBuffer(context.ARRAY_BUFFER, this.verts);
   context.bindBuffer(context.ELEMENT_ARRAY_BUFFER, this.faces);
   for(var i=0;i<this._attribLocations.length;i++){
    var attrib=this._attribLocations[i];
    if(attrib>=0){
     if(this._attribsUsed[i]>=0){
      context.enableVertexAttribArray(attrib);
      context.vertexAttribPointer(attrib, this._sizes[i],
        context.FLOAT, false,this._stride*4, this._attribsUsed[i]*4);
     } else {
      context.disableVertexAttribArray(attrib);
     }
    }
   }
  }
  var useColorAttr=(this._attribsUsed[2]>=0) ? 1.0 : 0.0;
  program.setUniforms({"useColorAttr":useColorAttr});
}
/**
 * @private */
BufferedSubMesh.prototype.draw=function(program){
  // Binding phase
  "use strict";
  var context=program.getContext();
  if(this.verts===null || this.face===null){
   throw new Error("mesh buffer disposed");
  }
  if(context!==this.context){
   throw new Error("can't bind mesh: context mismatch");
  }
  this._prepareDraw(program,context);
  // Drawing phase
  var primitive=context.TRIANGLES;
  if((this.format&Mesh.LINES_BIT)!==0)primitive=context.LINES;
  if((this.format&Mesh.POINTS_BIT)!==0)primitive=context.POINTS;
  context.drawElements(primitive,
    this.facesLength,
    this.type, 0);
  var vaoExt=this._getVaoExtension(context);
  if(this.vao) {
   vaoExt.bindVertexArrayOES(null);
  }
};
/**
 * @private */
BufferedSubMesh.prototype.primitiveCount=function(){
  "use strict";
if((this.format&Mesh.LINES_BIT)!==0)
   return Math.floor(this.facesLength/2);
  if((this.format&Mesh.POINTS_BIT)!==0)
   return this.facesLength;
  return Math.floor(this.facesLength/3);
};
/**
 * Not documented yet.
 */
BufferedMesh.prototype.vertexCount=function(){
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
* @return {number}
*/
BufferedMesh.prototype.primitiveCount=function(){
 "use strict";
var ret=0;
 for(var i=0;i<this.subMeshes.length;i++){
  ret+=this.subMeshes[i].primitiveCount();
 }
 return ret;
};

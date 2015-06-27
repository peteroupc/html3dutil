/*
Written by Peter O. in 2015.

Any copyright is dedicated to the Public Domain.
http://creativecommons.org/publicdomain/zero/1.0/
If you like this, you should donate to Peter O.
at: http://upokecenter.dreamhosters.com/articles/donate-now-2/
*/

/**
* A geometric mesh in the form of vertex buffer objects.
* @class
* @alias glutil.BufferedMesh
* @param {glutil.Mesh} mesh A geometric mesh object.
* @param {WebGLRenderingContext|object} context A WebGL context to
*  create vertex buffers from, or an object, such as Scene3D, that
* implements a no-argument <code>getContext</code> method
* that returns a WebGL context. (Note that this constructor uses
*  a WebGL context rather than a shader program because
*  vertex buffer objects are not specific to shader programs.)
*/
function BufferedMesh(mesh, context){
 this.subMeshes=[];
 this.context=GLUtil._toContext(context);
 this._bounds=mesh.getBoundingBox();
 for(var i=0;i<mesh.subMeshes.length;i++){
  var sm=mesh.subMeshes[i];
  // skip empty submeshes
  if(sm.indices.length==0)continue;
  this.subMeshes.push(new BufferedSubMesh(
    sm,this.context));
 }
}
/** @private */
BufferedMesh.prototype._getBounds=function(){
 return this._bounds;
}
/**
 * Returns the WebGL context associated with this object.
 * @return {WebGLRenderingContext}
 */
BufferedMesh.prototype.getContext=function(){
 return this.context;
}
/** @private */
BufferedMesh.prototype.getFormat=function(){
 var format=0;
 for(var i=0;i<this.subMeshes.length;i++){
  var sm=this.subMeshes[i];
  format|=sm.format;
 }
 return format;
}

/**
* Binds the buffers in this object to attributes according
* to their data format, and draws the elements in this mesh
* according to the data in its vertex buffers.
* @param {glutil.ShaderProgram} program A shader program object to get
* the IDs from for attributes named "position", "normal",
* "colorAttr", and "uv", and the "useColorAttr" uniform.
*/
BufferedMesh.prototype.draw=function(program){
 for(var i=0;i<this.subMeshes.length;i++){
  this.subMeshes[i].draw(program);
 }
}
/**
* Deletes the vertex and index buffers associated with this object.
*/
BufferedMesh.prototype.dispose=function(){
 for(var i=0;i<this.subMeshes.length;i++){
  this.subMeshes[i].dispose();
 }
 this.subMeshes=[];
}
/** @private */
function BufferedSubMesh(mesh, context){
 var vertbuffer=context.createBuffer();
 var facebuffer=context.createBuffer();
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
  this.context=context;
}
/**
 * @private */
BufferedSubMesh.prototype.dispose=function(){
 if(this.verts!=null)
  this.context.deleteBuffer(this.verts);
 if(this.faces!=null)
  this.context.deleteBuffer(this.faces);
 this.verts=null;
 this.faces=null;
}

/**
 * @private */
BufferedSubMesh.prototype.draw=function(program){
  // Binding phase
  function _vertexAttrib(context, attrib, size, type, stride, offset){
    if(attrib!==null){
      context.enableVertexAttribArray(attrib);
      context.vertexAttribPointer(attrib,size,type,false,stride,offset);
    }
  }
  var context=program.getContext();
  if(this.verts==null || this.faces==null){
   throw new Error("mesh buffer disposed");
  }
  if(context!=this.context){
   throw new Error("can't bind mesh: context mismatch");
  }
  context.bindBuffer(context.ARRAY_BUFFER, this.verts);
  context.bindBuffer(context.ELEMENT_ARRAY_BUFFER, this.faces);
  var format=this.format;
  var stride=Mesh._getStride(format);
  var attr=program.get("position");
  _vertexAttrib(context,
    attr, 3, context.FLOAT, stride*4, 0);
  var offset=Mesh._normalOffset(format);
  if(offset>=0){
   attr=program.get("normal");
   _vertexAttrib(context,
    attr, 3,
    context.FLOAT, stride*4, offset*4);
  } else {
   attr=program.get("normal");
   if(attr!==null)context.disableVertexAttribArray(attr);
  }
  offset=Mesh._colorOffset(format);
  if(offset>=0){
   program.setUniforms({"useColorAttr":1.0});
   attr=program.get("colorAttr");
   _vertexAttrib(context,
    attr, 3,
    context.FLOAT, stride*4, offset*4);
  } else {
   program.setUniforms({"useColorAttr":0.0});
   attr=program.get("colorAttr");
   if(attr!==null)context.disableVertexAttribArray(attr);
  }
  offset=Mesh._texCoordOffset(format);
  if(offset>=0){
   attr=program.get("uv");
   _vertexAttrib(context,
     attr, 2,
    context.FLOAT, stride*4, offset*4);
  } else {
   attr=program.get("uv");
   if(attr!==null)context.disableVertexAttribArray(attr);
  }
  offset=Mesh._tangentOffset(format);
  if(offset>=0){
   attr=program.get("tangent");
   _vertexAttrib(context,
     attr, 3,
    context.FLOAT, stride*4, offset*4);
  } else {
   attr=program.get("tangent");
   if(attr!==null)context.disableVertexAttribArray(attr);
  }
  offset=Mesh._bitangentOffset(format);
  if(offset>=0){
   attr=program.get("bitangent");
   _vertexAttrib(context,
     attr, 3,
    context.FLOAT, stride*4, offset*4);
  } else {
   attr=program.get("bitangent");
   if(attr!==null)context.disableVertexAttribArray(attr);
  }
  // Drawing phase
  var context=program.getContext();
  if(this.verts==null || this.faces==null){
   throw new Error("mesh buffer disposed");
  }
  if(context!=this.context){
   throw new Error("can't bind mesh: context mismatch");
  }
  var primitive=context.TRIANGLES;
  if((this.format&Mesh.LINES_BIT)!=0)primitive=context.LINES;
  if((this.format&Mesh.POINTS_BIT)!=0)primitive=context.POINTS;
  context.drawElements(primitive,
    this.facesLength,
    this.type, 0);
}
/**
 * @private */
BufferedSubMesh.prototype.primitiveCount=function(){
  if((this.format&Mesh.LINES_BIT)!=0)
   return Math.floor(this.facesLength/2);
  if((this.format&Mesh.POINTS_BIT)!=0)
   return this.facesLength;
  return Math.floor(this.facesLength/3);
}
/**
 * Not documented yet.
 */
BufferedMesh.prototype.vertexCount=function(){
 var ret=0;
 for(var i=0;i<this.subMeshes.length;i++){
  ret+=this.subMeshes[i].numVertices;
 }
 return ret;
}
/**
 * Gets the number of primitives (triangles, lines,
* and points) composed by all shapes in this mesh.
* @return {number}
*/
BufferedMesh.prototype.primitiveCount=function(){
 var ret=0;
 for(var i=0;i<this.subMeshes.length;i++){
  ret+=this.subMeshes[i].primitiveCount();
 }
 return ret;
}

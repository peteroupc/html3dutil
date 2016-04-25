/**
* Represents a grouping of shapes.
* @class
* @alias glutil.ShapeGroup
*/
function ShapeGroup(){
 /** List of shapes contained in this group.
 * This property should only be used to access properties
 * and call methods on each shape, and not to add, remove
 * or replace shapes directly.
 * @readonly
 */
 this.shapes=[];
 this.parent=null;
 this.visible=true;
 this.transform=new Transform();
}
/**
* Adds a 3D shape to this shape group.  Its reference, not a copy,
* will be stored in the list of shapes.
* @param {glutil.Shape|glutil.ShapeGroup} shape A 3D shape.
* @return {glutil.ShapeGroup} This object.
*/
ShapeGroup.prototype.addShape=function(shape){
 shape.parent=this;
 this.shapes.push(shape);
 return this;
};
/**
 * Not documented yet.
 * @param {*} value
 */
ShapeGroup.prototype.setVisible=function(value){
 this.visible=!!value;
 return this;
};
/**
 * Not documented yet.
 */
ShapeGroup.prototype.getVisible=function(){
 return this.visible;
};
/**
 * Gets a reference to the transform used by this shape group object.
 * @return {glutil.Transform} Return value. */
ShapeGroup.prototype.getTransform=function(){
 return this.transform;
};
/**
 * Gets a copy of the transformation needed to transform
 * this shape group's coordinates to world coordinates.
 * @return {glutil.Transform} A 4x4 matrix.
 */
ShapeGroup.prototype.getMatrix=function(){
  var xform=this.getTransform();
  var thisIdentity=xform.isIdentity();
  var mat;
  if(this.parent!==null){
   var pmat=this.parent.getMatrix();
   if(thisIdentity){
    mat=GLMath.mat4multiply(pmat,xform.getMatrix());
   } else if(GLMath.mat4isIdentity(pmat)){
    mat=xform.getMatrix();
   } else {
    mat=pmat;
   }
  } else {
   mat=xform.getMatrix();
  }
  return mat;
};
/**
 * Sets the transform used by this shape group.  Child
 * shapes can set their own transforms, in which case, the
 * rendering process will multiply this shape group's transform
 * with the child shape's transform as it renders the child shape.
 * @param {glutil.Transform} transform
 */
ShapeGroup.prototype.setTransform=function(transform){
 this.transform=transform.copy();
 return this;
};
/**
 * Sets the material used by all shapes in this shape group.
 * @param {glutil.Material} material
 */
ShapeGroup.prototype.setMaterial=function(material){
 for(var i=0;i<this.shapes.length;i++){
  this.shapes[i].setMaterial(material);
 }
 return this;
};
/**
 * Sets the shader program used by all shapes in this shape group.
 * @param {glutil.Material} material
 */
ShapeGroup.prototype.setShader=function(material){
 for(var i=0;i<this.shapes.length;i++){
  this.shapes[i].setShader(material);
 }
 return this;
};
/**
* Removes all instances of a 3D shape from this shape group
* @param {glutil.Shape|glutil.ShapeGroup} shape The 3D shape to remove.
* @return {glutil.ShapeGroup} This object.
*/
ShapeGroup.prototype.removeShape=function(shape){
 for(var i=0;i<this.shapes.length;i++){
   if(this.shapes[i]===shape){
     this.shapes.splice(i,1);
     i--;
   }
 }
 return this;
};
/**
 * Not documented yet.
 */
ShapeGroup.prototype.getBounds=function(){
 var ret=[0,0,0,0,0,0];
 var first=true;
 for(var i=0;i<this.shapes.length;i++){
  var b=this.shapes[i].getBounds();
  if(!GLMath.boxIsEmpty(b)){
   if(first){
    ret[0]=b[0];
    ret[1]=b[1];
    ret[2]=b[2];
    ret[3]=b[3];
    ret[4]=b[4];
    ret[5]=b[5];
    first=false;
   } else {
    ret[0]=Math.min(b[0],ret[0]);
    ret[1]=Math.min(b[1],ret[1]);
    ret[2]=Math.min(b[2],ret[2]);
    ret[3]=Math.max(b[3],ret[3]);
    ret[4]=Math.max(b[4],ret[4]);
    ret[5]=Math.max(b[5],ret[5]);
   }
  }
 }
 if(first){
  return [0,0,0,-1,-1,-1];
 } else {
  return ret;
 }
};

/**
 * Gets the number of vertices composed by all shapes in this shape group.
 * @return {number} Return value. */
ShapeGroup.prototype.vertexCount=function(){
 var c=0;
 for(var i=0;i<this.shapes.length;i++){
  c+=this.shapes[i].vertexCount();
 }
 return c;
};
/**
 * Gets the number of primitives (triangles, lines,
* and points) composed by all shapes in this shape group.
 * @return {number} Return value. */
ShapeGroup.prototype.primitiveCount=function(){
 var c=0;
 for(var i=0;i<this.shapes.length;i++){
  c+=this.shapes[i].primitiveCount();
 }
 return c;
};
/**
 * Sets the relative position of the shapes in this group
 * from their original position.
 * See {@link glutil.Transform#setPosition}
 * This method will modify this shape group's transform
 * rather than the transform for each shape in the group.
 * @param {number|Array<number>} x X coordinate
 * or a 3-element position array, as specified in {@link glutil.Transform#setScale}.
 * @param {number} y Y-coordinate.
 * @param {number} z Z-coordinate.
* @return {glutil.Scene3D} This object.
 */
ShapeGroup.prototype.setPosition=function(x,y,z){
 this.transform.setPosition(x,y,z);
 return this;
};
/**
 * Sets this shape group's orientation in the form of a [quaternion]{@tutorial glmath}.
 * See {@link glutil.Transform#setQuaternion}.
 * This method will modify this shape group's transform
 * rather than the transform for each shape in the group.
 * @param {Array<number>} quat A four-element array describing the rotation.
 * @return {glutil.Shape} This object.
 */
ShapeGroup.prototype.setQuaternion=function(quat){
 this.transform.setQuaternion(quat);
 return this;
};
/**
 * Sets the scale of this shape group relative to its original
 * size. See {@link glutil.Transform#setScale}.
 * This method will modify this shape group's transform
 * rather than the transform for each shape in the group.
 * @param {number|Array<number>} x Scaling factor for this object's width,
 * or a 3-element scaling array, as specified in {@link glutil.Transform#setScale}.
 * @param {number} y Scaling factor for this object's height.
 * @param {number} z Scaling factor for this object's depth.
* @return {glutil.Scene3D} This object.
 */
ShapeGroup.prototype.setScale=function(x,y,z){
 this.transform.setScale(x,y,z);
 return this;
};

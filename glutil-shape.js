/**
 * An object that associates a geometric mesh (the shape of the object) with
 *  material data (which defines what is seen on the object's surface)
 * and a transformation matrix (which defines the object's position and size).
 * See the "{@tutorial shapes}" tutorial.
 *  @class
 * @alias glutil.Shape
* @param {glutil.BufferedMesh} mesh A mesh in the form of a buffer object.
* For {@link glutil.Mesh} objects, the shape
 * created will use the mesh in its current state and won't
 * track future changes.  <i>Using BufferedMesh objects as the parameter
 * is deprecated.</i>
  */
function Shape(mesh){
  if((mesh===null || typeof mesh==="undefined"))throw new Error("mesh is null");
  if(mesh instanceof Mesh){
   this.bufferedMesh=new MeshBuffer(mesh);
  } else {
   if(!Shape._bufferedMeshWarning && mesh instanceof BufferedMesh){
    console.warn("Using a BufferedMesh in Shape objects is deprecated.")
    Shape._bufferedMeshWarning=true
   }
   this.bufferedMesh=mesh;
  }
  this.transform=new Transform();
  this.material=new Material();
  this.parent=null;
  this.visible=true;
}
Shape._bufferedMeshWarning=false;
/**
 * Gets the number of vertices composed by
 * all shapes in this scene.
 * @return {number} Return value. */
Shape.prototype.vertexCount=function(){
 return (this.bufferedMesh) ? this.bufferedMesh.vertexCount() : 0;
};
/**
* Gets the number of primitives (triangles, lines,
* and points) composed by all shapes in this scene.
 * @return {number} Return value. */
Shape.prototype.primitiveCount=function(){
 return (this.bufferedMesh) ? this.bufferedMesh.primitiveCount() : 0;
};
/**
 * Not documented yet.
 * @param {*} value
 */
Shape.prototype.setVisible=function(value){
 this.visible=!!value;
 return this;
};
/**
 * Gets whether this shape will be drawn on rendering.
 * @return {Boolean} True if this shape will be visible; otherwise, false.
 */
Shape.prototype.getVisible=function(){
 return this.visible;
};
/**
* Sets material parameters that give the shape a certain color.
* (If a material is already defined, sets its ambient and diffusion
* colors.)
* However, if the mesh defines its own colors, those colors will take
* precedence over the color given in this method.
* @param {Array<number>|number|string} r A [color vector or string]{@link glutil.GLUtil.toGLColor},
* or the red color component (0-1).
* @param {number} g Green color component (0-1).
* May be null or omitted if a string or array is given as the "r" parameter.
* @param {number} b Blue color component (0-1).
* May be null or omitted if a string or array is given as the "r" parameter.
* @param {number} [a] Alpha color component (0-1).
* If the "r" parameter is given and this parameter is null or omitted,
* this value is treated as 1.0.
 * @return {glutil.Shape} This object.
*/
Shape.prototype.setColor=function(r,g,b,a){
  var c=GLUtil.toGLColor(r,g,b,a);
  return this.setMaterialParams({"ambient":c,"diffuse":c})
};
/**
 * Sets material parameters that give the shape a texture with the given URL.
 * @param {string} name {@link glutil.Texture} object, or a string with the
* URL of the texture data.  In the case of a string the texture will be loaded via
*  the JavaScript DOM's Image class.  However, this method
*  will not load that image if it hasn't been loaded yet.
 * @return {glutil.Shape} This object.
 */
Shape.prototype.setTexture=function(name){
 return this.setMaterialParams({"texture":name});
};
/**
 * Sets this shape's material to a shader with the given URL.
 * @param {glutil.ShaderProgram} shader
 * @return {glutil.Shape} This object.
 */
Shape.prototype.setShader=function(shader){
 return this.setMaterialParams({"shader":shader});
};
/**
 * Sets parameters of this shape's material.
 * @ {} params An object described in {@link glutil.Material#setParams}.
 * @ {} This object.
 */
Shape.prototype.setMaterialParams=function(shader){
 if(this.material){
   this.material.setParams(params)
 } else {
   this.material=new Material().setParams(params)
 }
 return this;
};
/**
* Sets this shape's material to the given texture and color.
 * @param {string} name {@link glutil.Texture} object, or a string with the
* URL of the texture data.  In the case of a string the texture will be loaded via
*  the JavaScript DOM's Image class.  However, this method
*  will not load that image if it hasn't been loaded yet.
* @param {Array<number>|number|string} r A [color vector or string]{@link glutil.GLUtil.toGLColor},
* or the red color component (0-1).
* @param {number} g Green color component (0-1).
* May be null or omitted if a string or array is given as the "r" parameter.
* @param {number} b Blue color component (0-1).
* May be null or omitted if a string or array is given as the "r" parameter.
* @param {number} [a] Alpha color component (0-1).
* If the "r" parameter is given and this parameter is null or omitted,
* this value is treated as 1.0.
 * @return {glutil.Shape} This object.
*/
Shape.prototype.setTextureAndColor=function(name,r,g,b,a){
 var c=GLUtil.toGLColor(r,g,b,a);
 return this.setMaterialParams({
  "texture":name,
  "ambient":c,
  "diffuse":c
 });
};
/**
* Sets this shape's material parameters.
* @param {Material} material
 * @return {glutil.Shape} This object.
*/
Shape.prototype.setMaterial=function(material){
 this.material=material;
 return this;
};
/**
* Makes a copy of this object.  The copied object
* will have its own version of the transform and
* material data, but any texture
* image data and buffered meshes will not be duplicated,
* but rather just references to them will be used.
* @return {glutil.Shape} A copy of this object.
*/
Shape.prototype.copy=function(){
 var ret=new Shape(this.bufferedMesh);
 ret.material=this.material.copy();
 ret.transform=this.getTransform().copy();
 return ret;
};
/**
 * Not documented yet.
 */
Shape.prototype.getTransform=function(){
 return this.transform;
};
/**
 * Not documented yet.
 */
Shape.prototype.getBounds=function(){
 if(!this.bufferedMesh){
  return [0,0,0,-1,-1,-1];
 }
 var bounds=this.bufferedMesh._getBounds();
 var matrix=this.getMatrix();
 if(!GLMath.mat4isIdentity(matrix)){
  var mn=GLMath.mat4transformVec3(matrix,bounds[0],bounds[1],bounds[2]);
  var mx=GLMath.mat4transformVec3(matrix,bounds[3],bounds[4],bounds[5]);
  return [
   Math.min(mn[0],mx[0]),
   Math.min(mn[1],mx[1]),
   Math.min(mn[2],mx[2]),
   Math.max(mn[0],mx[0]),
   Math.max(mn[1],mx[1]),
   Math.max(mn[2],mx[2])
  ];
 } else {
  return bounds.slice(0,6);
 }
}
/** @private */
Shape.prototype.isCulled=function(frustum){
 if(!this.bufferedMesh||!this.visible)return true;
 return !GLMath.frustumHasBox(frustum,this.getBounds());
};
/**
 * Not documented yet.
 * @param {*} transform
 */
Shape.prototype.setTransform=function(transform){
 this.transform=transform.copy();
 return this;
};
/**
 * Sets the scale of this shape relative to its original
 * size. See {@link glutil.Transform#setScale}
 * @param {number|Array<number>} x Scaling factor for this object's width,
 * or a 3-element scaling array, as specified in {@link glutil.Transform#setScale}.
 * @param {number} y Scaling factor for this object's height.
 * @param {number} z Scaling factor for this object's depth.
* @return {glutil.Scene3D} This object.
 */
Shape.prototype.setScale=function(x,y,z){
  this.getTransform().setScale(x,y,z);
  return this;
};
/**
 * Sets the relative position of this shape from its original
 * position.  See {@link glutil.Transform#setPosition}
 * @param {number|Array<number>} x X coordinate
 * or a 3-element position array, as specified in {@link glutil.Transform#setScale}.
 * @param {number} y Y-coordinate.
 * @param {number} z Z-coordinate.
* @return {glutil.Scene3D} This object.
 */
Shape.prototype.setPosition=function(x,y,z){
  this.getTransform().setPosition(x,y,z);
  return this;
};
/**
 * Sets this object's orientation in the form of a [quaternion]{@tutorial glmath}.
 * See {@link glutil.Transform#setQuaternion}.
 * @param {Array<number>} quat A four-element array describing the rotation.
 * @return {glutil.Shape} This object.
 */
Shape.prototype.setQuaternion=function(quat){
  this.getTransform().setQuaternion(quat);
  return this;
};
/**
 * Gets the transformation matrix used by this shape.
   * See {@link glutil.Transform#getMatrix}.
 * @return {Array<number>} The current transformation matrix.
 */
Shape.prototype.getMatrix=function(){
  var xform=this.getTransform();
  var thisIdentity=xform.isIdentity();
  var mat;
  if(this.parent!==null){
   var pmat=this.parent.getMatrix();
   if(thisIdentity){
    mat=pmat;
   } else if(GLMath.mat4isIdentity(pmat)){
    mat=xform.getMatrix();
   } else {
    mat=GLMath.mat4multiply(pmat,xform.getMatrix());
   }
  } else {
   mat=xform.getMatrix();
  }
  return mat;
};

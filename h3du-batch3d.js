/* global H3DU */
/*
Written by Peter O. in 2015.

Any copyright is dedicated to the Public Domain.
http://creativecommons.org/publicdomain/zero/1.0/
If you like this, you should donate to Peter O.
at: http://peteroupc.github.io/
*/
/**
* @class
* @alias H3DU.Batch3D
*/
H3DU.Batch3D = function(){
 "use strict";
this._projectionMatrix=H3DU.Math.mat4identity();
 this._viewMatrix=H3DU.Math.mat4identity();
 this.lights=new H3DU.Lights();
 this._projectionUpdater=null;
 this._frustum=null;
 this.shapes=[];
};
/** @private */
H3DU.Batch3D._PerspectiveView=function(scene,fov,near,far){
 "use strict";
this.fov=fov;
 this.near=near;
 this.far=far;
 this.scene=scene;
 this.lastAspect=null;
/**
 * Not documented yet.
 */
this.update=function(width,height){
  var aspect=width*1.0/height;
  if(aspect!==this.lastAspect){
   this.lastAspect=aspect;
   this.scene.setProjectionMatrix(
     H3DU.Math.mat4perspective(this.fov,aspect,this.near,this.far));
  }
 };
 this.update();
};
/** @private */
H3DU.Batch3D._OrthoView=function(scene,a,b,c,d,e,f){
 "use strict";
this.a=a;
 this.b=b;
 this.c=c;
 this.d=d;
 this.e=e;
 this.f=f;
 this.scene=scene;
 this.lastAspect=null;
/**
 * Not documented yet.
 */
this.update=function(width, height){
  var aspect=width*1.0/height;
  if(aspect!==this.lastAspect){
   this.lastAspect=aspect;
   this.scene.setProjectionMatrix(
     H3DU.Math.mat4orthoAspect(this.a,this.b,this.c,this.d,this.e,this.f,aspect));
  }
 };
 this.update();
};

/** @private */
H3DU.Batch3D._setupMatrices=function(
  program,
  projMatrix,
  viewMatrix,
  worldMatrix,
  projAndView){
  "use strict";
var uniforms={};
  var viewWorld;
  if(projAndView){
   uniforms.view=viewMatrix;
   uniforms.projection=projMatrix;
   uniforms.viewMatrix=viewMatrix;
   uniforms.projectionMatrix=projMatrix;
   var viewInvW=program.get("projView");
   if(viewInvW!==null && typeof viewInvW!=="undefined"){
    var projView=H3DU.Math.mat4multiply(projMatrix,viewMatrix);
    uniforms.projView=projView;
   }
  }
  var invTrans=H3DU.Math.mat4inverseTranspose3(worldMatrix);
  uniforms.world=worldMatrix;
  uniforms.modelMatrix=worldMatrix;
  uniforms.normalMatrix=invTrans;
  var mvm=program.get("modelViewMatrix");
  if((mvm!==null && typeof mvm!=="undefined")){
   if(H3DU._isIdentityExceptTranslate(viewMatrix)){
    // view matrix is just a translation matrix, so that getting the model-view
    // matrix amounts to simply adding the view's position
    viewWorld=worldMatrix.slice(0,16);
    viewWorld[12]+=viewMatrix[12];
    viewWorld[13]+=viewMatrix[13];
    viewWorld[14]+=viewMatrix[14];
   } else {
    viewWorld=H3DU.Math.mat4multiply(viewMatrix,
     worldMatrix);
   }
   uniforms.modelViewMatrix=viewWorld;

  invTrans=H3DU.Math.mat4inverseTranspose3(viewWorld);
  uniforms.world=viewWorld;
  uniforms.modelMatrix=viewWorld;
  uniforms.normalMatrix=invTrans;

  }
  program.setUniforms(uniforms);
};
/** @private */
H3DU.Batch3D._isSameMatrix=function(a,b){
 "use strict";
return (a[0]===b[0] && a[1]===b[1] && a[2]===b[2] &&
   a[3]===b[3] && a[4]===b[4] && a[5]===b[5] &&
   a[6]===b[6] && a[7]===b[7] && a[8]===b[8] &&
   a[9]===b[9] && a[10]===b[10] && a[11]===b[11] &&
   a[12]===b[12] && a[13]===b[13] && a[14]===b[14] &&
   a[15]===b[15]);
};
/**
 * Not documented yet.
 * @param {*} mat
 * @memberof! H3DU.Batch3D#
*/
H3DU.Batch3D.prototype.setProjectionMatrix=function(mat){
 "use strict";
if(!H3DU.Batch3D._isSameMatrix(this._projectionMatrix,mat)){
  this._projectionMatrix=mat.slice(0,16);
  this._frustum=null;
 }
 return this;
};
/**
 * Uses a perspective projection for this batch.  It will be adjusted
 * to the scene's aspect ratio each time this batch is rendered.<p>
 * For considerations when choosing the "near" and "far" parameters,
 * see glmath.H3DU.Math.mat4perspective.
 * @param {Number} fov Y-axis field of view, in degrees. Should be less than 180 degrees. (The smaller this number, the bigger close objects appear to be. As a result, zooming out can be implemented by raising this value, and zooming in by lowering it.)
 * @param {Number} near The distance from the camera to the near clipping plane. Objects closer than this distance won't be seen.
 * @param {Number} far The distance from the camera to the far clipping plane. Objects beyond this distance will be too far to be seen.
 * @returns {H3DU.Batch3D} This object.
 * @memberof! H3DU.Batch3D#
*/
H3DU.Batch3D.prototype.perspectiveAspect=function(fov,near,far){
 "use strict";
this._projectionUpdater=new H3DU.Batch3D._PerspectiveView(this,fov,near,far);
 return this;
};
/**
 * Not documented yet.
 * @param {*} eye
 * @param {*} center
 * @param {*} up
 * @returns {H3DU.Batch3D} This object.
 * @memberof! H3DU.Batch3D#
*/
H3DU.Batch3D.prototype.setLookAt=function(eye,center,up){
 "use strict";
return this.setViewMatrix(H3DU.Math.mat4lookat(eye,center,up));
};
/**
 * Uses an orthographic projection for this batch.  It will be adjusted
 * to the scene's aspect ratio each time this batch is rendered.<p>
* @param {Number} l Leftmost coordinate of the view rectangle.
 * @param {Number} r Rightmost coordinate of the view rectangle.
 * (If l is greater than r, X-coordinates increase rightward; otherwise,
 * they increase leftward.)
 * @param {Number} b Bottommost coordinate of the view rectangle.
 * @param {Number} t Topmost coordinate of the view rectangle.
 * (If b is greater than t, X-coordinates increase downward; otherwise,
 * they increase upward.)
 * @param {Number} e The distance from the camera to the near clipping plane. Objects closer than this distance won't be seen.
 * @param {Number} f The distance from the camera to the far clipping plane. Objects beyond this distance will be too far to be seen.
 * @returns {H3DU.Batch3D} This object.
 * @memberof! H3DU.Batch3D#
*/
H3DU.Batch3D.prototype.orthoAspect=function(l,r,b,t,e,f){
 "use strict";
this._projectionUpdater=new H3DU.Batch3D._OrthoView(this,l,r,b,t,e,f);
 return this;
};
/**
 * Not documented yet.
* @param {Number} l Leftmost coordinate of the view rectangle.
 * @param {Number} r Rightmost coordinate of the view rectangle.
 * (If l is greater than r, X-coordinates increase rightward; otherwise,
 * they increase leftward.)
 * @param {Number} b Bottommost coordinate of the view rectangle.
 * @param {Number} t Topmost coordinate of the view rectangle.
 * (If b is greater than t, X-coordinates increase downward; otherwise,
 * they increase upward.)
 * @returns {H3DU.Batch3D} This object.
 * @memberof! H3DU.Batch3D#
*/
H3DU.Batch3D.prototype.ortho2DAspect=function(l,r,b,t){
 "use strict";
return this.orthoAspect(l,r,b,t,-1,1);
};
/**
 * Sets the current view matrix for this batch of shapes.
 * @param {Array<Number>} mat
 * @returns {H3DU.Batch3D} This object.
 * @memberof! H3DU.Batch3D#
*/
H3DU.Batch3D.prototype.setViewMatrix=function(mat){
 "use strict";
if(!H3DU.Batch3D._isSameMatrix(this._viewMatrix,mat)){
  this._viewMatrix=mat.slice(0,16);
  this._frustum=null;
 }
 return this;
};
/**
 * Gets the current projection matrix for this batch of shapes.
 * @returns {Array<Number>} Return value.
* @memberof! H3DU.Batch3D#
*/
H3DU.Batch3D.prototype.getProjectionMatrix=function(){
 "use strict";
return this._projectionMatrix.slice(0,16);
};
/**
 * Gets the current view matrix for this batch of shapes.
 * @returns {Array<Number>} Return value.
* @memberof! H3DU.Batch3D#
*/
H3DU.Batch3D.prototype.getViewMatrix=function(){
 "use strict";
return this._viewMatrix.slice(0,16);
};
/** @private */
H3DU.Batch3D.prototype._getFrustum=function(){
 "use strict";
if(this._frustum === null){
  var projView=H3DU.Math.mat4multiply(this._projectionMatrix,this._viewMatrix);
  this._frustum=H3DU.Math.mat4toFrustumPlanes(projView);
 }
 return this._frustum;
};
/**
 * Not documented yet.
 * @returns {H3DU.Lights} Return value.
 * @memberof! H3DU.Batch3D#
*/
H3DU.Batch3D.prototype.getLights=function(){
 "use strict";
return this.lights;
};

/**
* Adds a 3D shape to this batch of shapes.  Its reference, not a copy,
* will be stored in the 3D scene's list of shapes.
* Its parent will be set to no parent.
* @param {H3DU.Shape|H3DU.ShapeGroup} shape A 3D shape.
* @returns {H3DU.Batch3D} This object.
* @memberof! H3DU.Batch3D#
*/
H3DU.Batch3D.prototype.addShape=function(shape){
 "use strict";
shape.parent=null;
 this.shapes.push(shape);
 return this;
};

/**
 * Gets the number of vertices composed by
 * all shapes in this batch of shapes.
 * @returns {Number} Return value.
* @memberof! H3DU.Batch3D#
*/
H3DU.Batch3D.prototype.vertexCount=function(){
 "use strict";
var c=0;
 for(var i=0;i<this.shapes.length;i++){
  c+=this.shapes[i].vertexCount();
 }
 return c;
};
/**
* Gets the number of primitives (triangles, lines,
* and points) composed by all shapes in this batch of shapes.
 * @returns {Number} Return value.
* @memberof! H3DU.Batch3D#
*/
H3DU.Batch3D.prototype.primitiveCount=function(){
 "use strict";
var c=0;
 for(var i=0;i<this.shapes.length;i++){
  c+=this.shapes[i].primitiveCount();
 }
 return c;
};

/**
* Removes all instances of a 3D shape from this batch of shapes.
* @param {H3DU.Shape|H3DU.ShapeGroup} shape The 3D shape to remove.
* @returns {H3DU.Batch3D} This object.
* @memberof! H3DU.Batch3D#
*/
H3DU.Batch3D.prototype.removeShape=function(shape){
 "use strict";
for(var i=0;i<this.shapes.length;i++){
   if(this.shapes[i]===shape){
     this.shapes.splice(i,1);
     i--;
   }
 }
 return this;
};

/** @private */
H3DU.Batch3D.prototype._renderShape=function(shape, renderContext){
 "use strict";
if(shape.constructor===H3DU.ShapeGroup){
  if(!shape.visible)return;
  for(var i=0;i<shape.shapes.length;i++){
   this._renderShape(shape.shapes[i], renderContext);
  }
 } else {
   if(shape.visible && !shape.isCulled(this._getFrustum())){
    var prog=null;
    var params={};
    var flags=0;
    if(shape.material instanceof H3DU.Material){
     if(shape.material.shader) {
       prog = renderContext.scene._programs.getCustomProgram(
         shape.material.shader, renderContext.context);
     }
     flags=H3DU.Scene3D._materialToFlags(shape.material);
    }
    if(shape._hasColorAttr()){
      flags|=H3DU.Scene3D.COLORATTR_ENABLED;
    }
    if((prog === null || typeof prog === "undefined")) {
      prog=renderContext.scene._programs.getProgram(
           flags,renderContext.context);
    }
    var projAndView=false;
    if(renderContext.prog!==prog){
     prog.use();
     projAndView=true;
     new H3DU._LightsBinder(this.lights).bind(prog,this._viewMatrix);
     renderContext.prog=prog;
    }
    H3DU.Batch3D._setupMatrices(prog,
      this._projectionMatrix,
      this._viewMatrix,
      shape.getMatrix(),
      projAndView);
    H3DU.Batch3D._getMaterialBinder(shape.material).bind(prog,
      renderContext.context,
      renderContext.scene._textureLoader);
    renderContext.scene._meshLoader.draw(shape.bufferedMesh,prog);
  }
 }
};

/** @private */
H3DU.Batch3D.prototype.resize=function(width, height) {
 "use strict";
if(this._projectionUpdater){
   this._projectionUpdater.update(width, height);
 }
};

/**
 * Not documented yet.
 * @memberof! H3DU.Batch3D#
*/
H3DU.Batch3D.prototype.render=function(scene){
  "use strict";
var rc={};
  rc.scene=scene;
  rc.context=scene.getContext();
  for(var i=0;i<this.shapes.length;i++){
   this._renderShape(this.shapes[i],rc);
  }
  return this;
};
/**
 * Not documented yet.
 * @param {*} scene
 * @param {*} fbo
 * @param {*} shader
 */
H3DU.Batch3D.forFilter=function(scene,fbo,shader){
  "use strict";
if((shader === null || typeof shader === "undefined")){
    shader=H3DU.ShaderProgram.makeCopyEffect(scene);
  }
  var ret=new H3DU.Batch3D(scene);
  var mesh=new H3DU.Mesh(
     [-1,1,0,0,1,
      -1,-1,0,0,0,
      1,1,0,1,1,
      1,-1,0,1,0],
     [0,1,2,2,1,3],
     H3DU.Mesh.TEXCOORDS_BIT);
  var shape=new H3DU.Shape(mesh);
  shape.setTexture(fbo);
  shape.setShader(shader);
  ret.addShape(shape);
   return ret;
};
/** @private */
H3DU.Batch3D._getMaterialBinder=function(material){
 "use strict";
if(material){
 if(material instanceof H3DU.Material){
  return new H3DU._MaterialBinder(material);
 }
 }
 // Return an empty binding object
 return {
/** @private */
bind:function(program){}};
};

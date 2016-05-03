/*
Written by Peter O. in 2015.

Any copyright is dedicated to the Public Domain.
http://creativecommons.org/publicdomain/zero/1.0/
If you like this, you should donate to Peter O.
at: http://upokecenter.dreamhosters.com/articles/donate-now-2/
*/

function Subscene3D(scene){
 this.parent=scene;
 this._projectionMatrix=GLMath.mat4identity();
 this._viewMatrix=GLMath.mat4identity();
 this.lights=new Lights();
 this._projectionUpdater=null;
 this._frustum=null;
 this.shapes=[];
}
/** @private */
Subscene3D._PerspectiveView=function(scene,fov,near,far){
 this.fov=fov;
 this.near=near;
 this.far=far;
 this.scene=scene;
 this.lastAspect=null;
/**
 * Not documented yet.
 */
this.update=function(){
  var aspect=this.scene.parent.getClientAspect();
  if(aspect!=this.lastAspect){
   this.lastAspect=aspect;
   this.scene.setProjectionMatrix(
     GLMath.mat4perspective(this.fov,aspect,this.near,this.far));
  }
 }
 this.update();
}
/** @private */
Subscene3D._OrthoView=function(scene,a,b,c,d,e,f){
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
this.update=function(){
  var aspect=this.scene.parent.getClientAspect();
  if(aspect!=this.lastAspect){
   this.lastAspect=aspect;
   this.scene.setProjectionMatrix(
     GLMath.mat4orthoAspect(this.a,this.b,this.c,this.d,this.e,this.f,aspect));
  }
 }
 this.update();
}

/** @private */
Subscene3D._setupMatrices=function(
  program,
  projMatrix,
  viewMatrix,
  worldMatrix,
  projAndView){
  var uniforms={};
  var viewWorld;
  if(projAndView){
   uniforms.view=viewMatrix;
   uniforms.projection=projMatrix;
   uniforms.viewMatrix=viewMatrix;
   uniforms.projectionMatrix=projMatrix;
   var viewInvW=program.get("viewInvW");
   if(viewInvW!==null && typeof viewInvW!=="undefined"){
    var invView=GLMath.mat4invert(viewMatrix);
    uniforms.viewInvW=[invView[12],invView[13],invView[14],invView[15]];
   }
   viewInvW=program.get("projView");
   if(viewInvW!==null && typeof viewInvW!=="undefined"){
    var projView=GLMath.mat4multiply(projMatrix,viewMatrix);
    uniforms.projView=projView;
   }
  }
  var invTrans=GLMath.mat4inverseTranspose3(worldMatrix);
  uniforms.world=worldMatrix;
  uniforms.modelMatrix=worldMatrix;
  uniforms.normalMatrix=invTrans;
  var mvm=program.get("modelViewMatrix");
  if((mvm!==null && typeof mvm!=="undefined")){
   if(GLUtil._isIdentityExceptTranslate(viewMatrix)){
    // view matrix is just a translation matrix, so that getting the model-view
    // matrix amounts to simply adding the view's position
    viewWorld=worldMatrix.slice(0,16);
    viewWorld[12]+=viewMatrix[12];
    viewWorld[13]+=viewMatrix[13];
    viewWorld[14]+=viewMatrix[14];
   } else {
    viewWorld=GLMath.mat4multiply(viewMatrix,
     worldMatrix);
   }
   uniforms.modelViewMatrix=viewWorld;

  var invTrans=GLMath.mat4inverseTranspose3(viewWorld);
  uniforms.world=viewWorld;
  uniforms.modelMatrix=viewWorld;
  uniforms.normalMatrix=invTrans;

  }
  program.setUniforms(uniforms);
};
/** @private */
Subscene3D._isSameMatrix=function(a,b){
 return (a[0]==b[0] && a[1]==b[1] && a[2]==b[2] &&
   a[3]==b[3] && a[4]==b[4] && a[5]==b[5] &&
   a[6]==b[6] && a[7]==b[7] && a[8]==b[8] &&
   a[9]==b[9] && a[10]==b[10] && a[11]==b[11] &&
   a[12]==b[12] && a[13]==b[13] && a[14]==b[14] &&
   a[15]==b[15]);
}
/**
 * Not documented yet.
 * @param {*} mat
 */
Subscene3D.prototype.setProjectionMatrix=function(mat){
 if(!Subscene3D._isSameMatrix(this._projectionMatrix,mat)){
  this._projectionMatrix=mat.slice(0,16)
  this._frustum=null
 }
 return this;
};
/**
 * Not documented yet.
 */
Subscene3D.prototype.getContext=function(){
 return this.parent.getContext();
}
/**
 * Not documented yet.
 * @param {*} fov
 * @param {*} near
 * @param {*} far
 */
Subscene3D.prototype.perspectiveAspect=function(fov,near,far){
 this._projectionUpdater=new Subscene3D._PerspectiveView(this,fov,near,far);
 return this;
};
/**
 * Not documented yet.
 * @param {*} eye
 * @param {*} center
 * @param {*} up
 */
Subscene3D.prototype.setLookAt=function(eye,center,up){
 return this.setViewMatrix(GLMath.mat4lookat(eye,center,up));
};
/**
 * Not documented yet.
 * @param {*} a
 * @param {*} b
 * @param {*} c
 * @param {*} d
 * @param {*} e
 * @param {*} f
 */
Subscene3D.prototype.orthoAspect=function(a,b,c,d,e,f){
 this._projectionUpdater=new Subscene3D._OrthoView(this,a,b,c,d,e,f);
 return this;
};
/**
 * Not documented yet.
 * @param {*} a
 * @param {*} b
 * @param {*} c
 * @param {*} d
 */
Subscene3D.prototype.ortho2DAspect=function(a,b,c,d){
 this._projectionUpdater=new Subscene3D._OrthoView(this,a,b,c,d,-1,1);
 return this;
};
/**
 * Not documented yet.
 * @param {*} mat
 */
Subscene3D.prototype.setViewMatrix=function(mat){
 if(!Subscene3D._isSameMatrix(this._viewMatrix,mat)){
  this._viewMatrix=mat.slice(0,16)
  this._frustum=null
 }
 return this;
};
/**
 * Gets the current projection matrix for this scene.
 * @return {Array<number>} Return value. */
Subscene3D.prototype.getProjectionMatrix=function(){
 return this._projectionMatrix.slice(0,16);
};
/**
 * Gets the current view matrix for this scene.
 * @return {Array<number>} Return value. */
Subscene3D.prototype.getViewMatrix=function(){
 return this._viewMatrix.slice(0,16);
};
/** @private */
Subscene3D.prototype._getFrustum=function(){
 if(this._frustum==null){
  var projView=GLMath.mat4multiply(this._projectionMatrix,this._viewMatrix);
  this._frustum=GLMath.mat4toFrustumPlanes(projView);
 }
 return this._frustum;
}
/**
 * Not documented yet.
 */
Subscene3D.prototype.getLights=function(){
 return this.lights;
};
/**
* Adds a 3D shape to this scene.  Its reference, not a copy,
* will be stored in the 3D scene's list of shapes.
* Its parent will be set to no parent.
* @param {glutil.Shape|glutil.ShapeGroup} shape A 3D shape.
* @return {glutil.Subscene3D} This object.
*/
Subscene3D.prototype.addShape=function(shape){
 shape.parent=null;
 this.shapes.push(shape);
 return this;
};
/**
* Removes all instances of a 3D shape from this scene.
* @param {glutil.Shape|glutil.ShapeGroup} shape The 3D shape to remove.
* @return {glutil.Subscene3D} This object.
*/
Subscene3D.prototype.removeShape=function(shape){
 for(var i=0;i<this.shapes.length;i++){
   if(this.shapes[i]===shape){
     this.shapes.splice(i,1);
     i--;
   }
 }
 return this;
};

/** @private */
Subscene3D.prototype._renderShape=function(shape, renderContext){
 if(shape.constructor===ShapeGroup){
  if(!shape.visible)return;
  for(var i=0;i<shape.shapes.length;i++){
   this._renderShape(shape.shapes[i], renderContext);
  }
 } else {
   if(!shape.isCulled(this._getFrustum())){
    var prog=null;
    var params={};
    var flags=0;
    if(shape.material instanceof Material){
     prog=shape.material.shader ?
       shape.material.shader :
       this.parent._programs.getProgram(Scene3D._materialToFlags(shape.material));
    } else {
     prog=this.parent._programs.getProgram(0);
    }
    var projAndView=false;
    if(renderContext.prog!=prog){
     prog.use();
     projAndView=true;
     new GLUtil._LightsBinder(this.lights).bind(prog,this._viewMatrix);
     renderContext.prog=prog;
    }
    Subscene3D._setupMatrices(prog,
      this._projectionMatrix,
      this._viewMatrix,
      shape.getMatrix(),
      projAndView);
    Subscene3D._getMaterialBinder(shape.material).bind(prog,
      this.parent._textureLoader);
    shape.bufferedMesh.draw(prog);
  }
 }
};
/**
 * Not documented yet.
 * @param {*} textureFiles
 * @param {*} resolve
 * @param {*} reject
 */
Subscene3D.prototype.loadAndMapTexturesAll=function(textureFiles,resolve,reject){
 return this.parent.loadAndMapTexturesAll(textureFiles,resolve,reject);
}
/**
 * Not documented yet.
 * @param {*} mesh
 */
Subscene3D.prototype.makeShape=function(mesh){
 return this.parent.makeShape(mesh)
}
/**
 * Not documented yet.
 */
Subscene3D.prototype.render=function(){
  var rc={};
  if(this._projectionUpdater){
   this._projectionUpdater.update();
  }
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
Subscene3D.forFilter=function(scene,fbo,shader){
  if(shader==null){
    shader=ShaderProgram.makeCopyEffect(scene);
  }
  var ret=new Subscene3D(scene);
  var mesh=new Mesh(
     [-1,1,0,0,1,
      -1,-1,0,0,0,
      1,1,0,1,1,
      1,-1,0,1,0],
     [0,1,2,2,1,3],
     Mesh.TEXCOORDS_BIT);
  var shape=ret.makeShape(mesh)
  shape.setTexture(fbo);
  shape.setShader(shader);
  ret.addShape(shape);
   return ret;
}
/** @private */
Subscene3D._getMaterialBinder=function(material){
 "use strict";
if(material){
 if(material instanceof Material){
  return new GLUtil._MaterialBinder(material);
 }
 }
 // Return an empty binding object
 return {
/** @private */
bind:function(program){}};
};

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
 this.lightSource=new Lights();
 this._projectionUpdater=null;
 this._frustum=null;
 this.shapes=[];
}
Subscene3D._PerspectiveView=function(scene,fov,near,far){
 this.fov=fov;
 this.near=near;
 this.far=far;
 this.scene=scene;
 this.lastAspect=null;
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
Subscene3D._OrthoView=function(scene,a,b,c,d,e,f){
 this.a=a;
 this.b=b;
 this.c=c;
 this.d=d;
 this.e=e;
 this.f=f;
 this.scene=scene;
 this.lastAspect=null;
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
  }
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
  }
  var invTrans=GLMath.mat4inverseTranspose3(worldMatrix);
  uniforms.world=worldMatrix;
  uniforms.modelMatrix=worldMatrix;
  uniforms.worldViewInvTrans3=invTrans;
  uniforms.normalMatrix=invTrans;
  program.setUniforms(uniforms);
};
/**
 * Not documented yet.
 * @param {*} mat
 */
Subscene3D.prototype.setProjectionMatrix=function(mat){
 this._projectionMatrix=mat.slice(0,16)
 this._frustum=null
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
 this._viewMatrix=mat.slice(0,16)
 this._frustum=null
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
Subscene3D.prototype.getLightSource=function(){
 return this.lightSource;
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
     new LightsBinder(this.lightSource).bind(prog);
     renderContext.prog=prog;
    }
    Subscene3D._setupMatrices(prog,
      this._projectionMatrix,
      this._viewMatrix,
      shape.getMatrix(),
      projAndView);
    Binders.getMaterialBinder(shape.material).bind(prog);
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
Subscene3D.prototype.loadAndMapTextures=function(textureFiles,resolve,reject){
 return this.parent.loadAndMapTextures(textureFiles,resolve,reject);
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

Subscene3D.forFilter=function(scene, fbo, shader){
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

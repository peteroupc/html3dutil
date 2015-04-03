/*
Written by Peter O. in 2015.

Any copyright is dedicated to the Public Domain.
http://creativecommons.org/publicdomain/zero/1.0/
If you like lightsObject, you should donate to Peter O.
at: http://upokecenter.dreamhosters.com/articles/donate-now-2/
*/

/**
* Contains classes that implement methods
* binding certain HTML 3D Library objects
* to WebGL contexts and programs.
*/

///////////////////////

function MaterialShadeBinder(mshade){
 this.mshade=mshade;
}
/**
 * Sets parameters for a shader program based on
 * the information in this material data object.  It will set
 * the following uniforms;
 * <ul>
 * <li>textureSize - Set to (0,0), since no textures are being used.
 * <li>mshin - Specular reflection exponent.
 * <li>ma - Ambient reflection.
 * <li>md - Diffuse reflection.
 * <li>ms - Specular reflection.
 * </ul>
 * @param {ShaderProgram} program A shader program object
 * where the locations of material-related uniforms will be retrieved.
 * @return {MaterialShadeBinder} This object.
 */
MaterialShadeBinder.prototype.bind=function(program){
 if(!this.mshade)return this;
 program.setUniforms({
 "textureSize":[0,0],
 "mshin":this.mshade.shininess,
 "ma":[this.mshade.ambient[0], this.mshade.ambient[1], this.mshade.ambient[2]],
 "md":[this.mshade.diffuse[0], this.mshade.diffuse[1], this.mshade.diffuse[2]],
 "ms":[this.mshade.specular[0],this.mshade.specular[1],this.mshade.specular[2]],
 "me":[this.mshade.emission[0],this.mshade.emission[1],this.mshade.emission[2]]
 });
 return this;
}

//////////////////////////

function LightsBinder(lights){
 this.lights=lights;
}

/**
 * Sets parameters for a shader program based on
 * the information in this light source object.
 * @param {ShaderProgram} program A shader program object
 * where locations of lighting uniforms will come from.
 * @return {LightsBinder} This object.
 */
LightsBinder.prototype.bind=function(program){
 var lightsObject=this.lights;
 if(!lightsObject)return this;
 if(!program)return this;
 var uniforms={};
 uniforms["sceneAmbient"]=lightsObject.sceneAmbient.slice(0,3);
 for(var i=0;i<lightsObject.lights.length;i++){
  var lt=lightsObject.lights[i]
  uniforms["lights["+i+"].diffuse"]=[lt.diffuse[0],lt.diffuse[1],lt.diffuse[2],1];
  uniforms["lights["+i+"].specular"]=[lt.specular[0],lt.specular[1],lt.specular[2],1];
  uniforms["lights["+i+"].position"]=lightsObject.lights[i].position;
 }
 // Set empty values for undefined lights up to MAX_LIGHTS
 for(var i=lightsObject.lights.length;i<Lights.MAX_LIGHTS;i++){
  uniforms["lights["+i+"].diffuse"]=[0,0,0,1];
  uniforms["lights["+i+"].specular"]=[0,0,0,1];
  uniforms["lights["+i+"].position"]=[0,0,0,0];
 }
 program.setUniforms(uniforms);
 return this;
}

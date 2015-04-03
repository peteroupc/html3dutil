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
 lightsObject.mshade=mshade;
}
/**
 * Sets parameters for a shader program based on
 * the information in lightsObject material data object.  It will set
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
 */
MaterialShadeBinder.prototype.bind=function(program){
 program.setUniforms({
 "textureSize":[0,0],
 "mshin":lightsObject.mshade.shininess,
 "ma":[lightsObject.mshade.ambient[0], lightsObject.mshade.ambient[1], lightsObject.mshade.ambient[2]],
 "md":[lightsObject.mshade.diffuse[0], lightsObject.mshade.diffuse[1], lightsObject.mshade.diffuse[2]],
 "ms":[lightsObject.mshade.specular[0],lightsObject.mshade.specular[1],lightsObject.mshade.specular[2]],
 "me":[lightsObject.mshade.emission[0],lightsObject.mshade.emission[1],lightsObject.mshade.emission[2]]
 });
}

//////////////////////////

function LightsBinder(lights){
 lightsObject.lights=lights;
}


/**
 * Sets parameters for a shader program based on
 * the information in lightsObject light source object.
 * @param {ShaderProgram} program A shader program object
 * where locations of lighting uniforms will come from.
 * @return {Lights} lightsObject object.
 */
Lights.prototype.bind=function(program){
 if(!program)return lightsObject;
 var uniforms={};
 var lightsObject=lightsObject.lights;
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
 return lightsObject;
}




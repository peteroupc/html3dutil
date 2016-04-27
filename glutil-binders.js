/*
Written by Peter O. in 2015.

Any copyright is dedicated to the Public Domain.
http://creativecommons.org/publicdomain/zero/1.0/
If you like this, you should donate to Peter O.
at: http://upokecenter.dreamhosters.com/articles/donate-now-2/
*/
/* global BufferedMesh, BufferedSubMesh, FrameBuffer, GLUtil, Lights, Material, Mesh */
/**
* Contains classes that implement methods
* binding certain HTML 3D Library objects
* to WebGL contexts and programs.
*/

///////////////////////

/** @private */
GLUtil._MaterialBinder=function(mshade){
 "use strict";
this.mshade=mshade;
}
/** @private */
GLUtil._MaterialBinder._textureSizeZeroZero=[0,0];
/** @private */
GLUtil._MaterialBinder.prototype.bind=function(program){
 "use strict";
 if(!this.mshade)return this;
 if(this.mshade.diffuse.length!==4){console.warn("creating new diffuse array")}
 if(this.mshade.ambient.length!==3){console.warn("creating new ambient array")}
 if(this.mshade.specular.length!==3){console.warn("creating new specular array")}
 if(this.mshade.emission.length!==3){console.warn("creating new emission array")}
 var uniforms={
  "textureSize":GLUtil._MaterialBinder._textureSizeZeroZero,
  "md":this.mshade.diffuse.length===4 ? this.mshade.diffuse :
    [this.mshade.diffuse[0], this.mshade.diffuse[1], this.mshade.diffuse[2],
       this.mshade.diffuse.length<4 ? 1.0 : this.mshade.diffuse[3]]
 };
 if(!this.mshade.basic){
  uniforms.mshin=this.mshade.shininess;
  uniforms.ma=this.mshade.ambient.length===3 ? this.mshade.ambient :
     [this.mshade.ambient[0], this.mshade.ambient[1], this.mshade.ambient[2]];
  uniforms.ms=this.mshade.specular.length===3 ? this.mshade.specular :
     [this.mshade.specular[0],this.mshade.specular[1],this.mshade.specular[2]];
  uniforms.me=this.mshade.emission.length===3 ? this.mshade.emission :
     [this.mshade.emission[0],this.mshade.emission[1],this.mshade.emission[2]];
 }
 program.setUniforms(uniforms);
 GLUtil._MaterialBinder.bindTexture(this.mshade.texture,program,0);
 GLUtil._MaterialBinder.bindTexture(this.mshade.specularMap,program,1);
 GLUtil._MaterialBinder.bindTexture(this.mshade.normalMap,program,2);
 return this;
};

//////////////////////////

/** @private */
GLUtil._LoadedTexture=function(textureImage, context){
  "use strict";
context=GLUtil._toContext(context);
  this.context=context;
  this.loadedTexture=context.createTexture();
  context.activeTexture(context.TEXTURE0);
  // In WebGL, texture coordinates start at the upper left corner rather than
  // the lower left as in OpenGL and OpenGL ES, so we use this method call
  // to reestablish the lower left corner.
  context.pixelStorei(context.UNPACK_FLIP_Y_WEBGL, 1);
  context.bindTexture(context.TEXTURE_2D, this.loadedTexture);
  if("src" in textureImage.image){
    context.texImage2D(context.TEXTURE_2D, 0,
      context.RGBA, context.RGBA, context.UNSIGNED_BYTE,
      textureImage.image);
  } else {
   context.texImage2D(context.TEXTURE_2D, 0,
     context.RGBA, textureImage.width, textureImage.height, 0,
     context.RGBA, context.UNSIGNED_BYTE, textureImage.image);
  }
  // generate mipmaps for power-of-two textures
  if(GLUtil._isPowerOfTwo(textureImage.width) &&
      GLUtil._isPowerOfTwo(textureImage.height)){
    context.generateMipmap(context.TEXTURE_2D);
  } else {
    context.texParameteri(context.TEXTURE_2D,
        context.TEXTURE_MIN_FILTER, context.LINEAR);
    context.texParameteri(context.TEXTURE_2D,
        context.TEXTURE_WRAP_S, context.CLAMP_TO_EDGE);
    context.texParameteri(context.TEXTURE_2D,
        context.TEXTURE_WRAP_T, context.CLAMP_TO_EDGE);
  }
}
/** @private */
GLUtil._LoadedTexture.prototype.dispose=function(){
 "use strict";
if(this.loadedTexture){
  this.context.deleteTexture(this.loadedTexture);
 }
};
/////////////////////////////////

/** @private */
GLUtil._MaterialBinder.bindTexture=function(texture,program,textureUnit){
 "use strict";
 if(!texture)return;
 var isFrameBuffer=(texture instanceof FrameBuffer)
 var context=program.getContext();
 if(!isFrameBuffer){
 if(typeof texture.image!=="undefined" && texture.image!==null &&
     (typeof texture.loadedTexture==="undefined" || texture.loadedTexture===null) ){
      // load the image as a texture
      texture.loadedTexture=new GLUtil._LoadedTexture(texture,context);
 } else if((typeof texture.image==="undefined" || texture.image===null) &&
     (typeof texture.loadedTexture==="undefined" || texture.loadedTexture===null) &&
   texture.loadStatus===0){
      var thisObj=this;
      var prog=program;
      texture.loadImage().then(function(e){
        // try again loading the image
        thisObj.bind(prog);
      });
      return;
 }
 }
 if ((texture.loadedTexture!=null) || isFrameBuffer) {
      var uniforms={};
      if((texture.anisotropic==null) && !isFrameBuffer){
       // Try to load anisotropic filtering extension
       texture.anisotropic=context.getExtension("EXT_texture_filter_anisotropic") ||
         context.getExtension("WEBKIT_EXT_texture_filter_anisotropic") ||
         context.getExtension("MOZ_EXT_texture_filter_anisotropic");
       if(((typeof texture.anisotropic==="undefined" || ((typeof texture.anisotropic==="undefined" || ((typeof texture.anisotropic==="undefined" || texture.anisotropic===null))))))){
        texture.anisotropic={};
        texture.maxAnisotropy=1;
       } else {
        texture.maxAnisotropy=context.getParameter(
          texture.anisotropic.MAX_TEXTURE_MAX_ANISOTROPY_EXT);
       }
      }
      if(textureUnit===0){
       uniforms.sampler=textureUnit;
       uniforms.textureSize=[texture.width,texture.height];
      }
      if(textureUnit===1){
       uniforms.specularMap=textureUnit;
      }
      if(textureUnit===2){
       uniforms.normalMap=textureUnit;
      }
      program.setUniforms(uniforms);
      context.activeTexture(context.TEXTURE0+textureUnit);
      if(isFrameBuffer) {
       context.bindTexture(context.TEXTURE_2D,
         texture.colorTexture);
       if(texture.colorTexture){
        context.texParameteri(context.TEXTURE_2D,
         context.TEXTURE_MAG_FILTER, context.NEAREST);
        context.texParameteri(context.TEXTURE_2D,
         context.TEXTURE_MIN_FILTER, context.NEAREST);
        context.texParameteri(context.TEXTURE_2D,
         context.TEXTURE_WRAP_S, context.CLAMP_TO_EDGE);
        context.texParameteri(context.TEXTURE_2D,
         context.TEXTURE_WRAP_T, context.CLAMP_TO_EDGE);
       }
      } else {
       context.bindTexture(context.TEXTURE_2D,
        texture.loadedTexture.loadedTexture);
       // Set texture parameters
       if(typeof texture.anisotropic.TEXTURE_MAX_ANISOTROPY_EXT!=="undefined"){
        // Set anisotropy if anisotropic filtering is supported
        context.texParameteri(context.TEXTURE_2D,
         texture.anisotropic.TEXTURE_MAX_ANISOTROPY_EXT,
         texture.maxAnisotropy);
       }
       // set magnification
       context.texParameteri(context.TEXTURE_2D,
        context.TEXTURE_MAG_FILTER, context.LINEAR);
       var wrapMode=context.CLAMP_TO_EDGE;
       if(GLUtil._isPowerOfTwo(texture.width) &&
          GLUtil._isPowerOfTwo(texture.height)){
         // Enable mipmaps if texture's dimensions are powers of two
         if(!texture.clamp)wrapMode=context.REPEAT;
         context.texParameteri(context.TEXTURE_2D,
           context.TEXTURE_MIN_FILTER, context.LINEAR_MIPMAP_LINEAR);
       } else {
        context.texParameteri(context.TEXTURE_2D,
         context.TEXTURE_MIN_FILTER, context.LINEAR);
       }
       context.texParameteri(context.TEXTURE_2D,
        context.TEXTURE_WRAP_S, wrapMode);
       context.texParameteri(context.TEXTURE_2D,
        context.TEXTURE_WRAP_T, wrapMode);
      }
    }
};

//////////////////////////

/** @private */
GLUtil._LightsBinder=function(lights){
 "use strict";
this.lights=lights;
}
/** @private */
GLUtil._LightsBinder.prototype.bind=function(program){
 "use strict";
var lightsObject=this.lights;
 if(!lightsObject)return this;
 if(!program)return this;
 var uniforms={};
 uniforms.sceneAmbient=lightsObject.sceneAmbient.slice(0,3);
 for(var i=0;i<lightsObject.lights.length;i++){
  var lt=lightsObject.lights[i];
  uniforms["lights["+i+"].diffuse"]=[lt.diffuse[0],lt.diffuse[1],lt.diffuse[2],
    lt.diffuse.length>3 ? lt.diffuse[3] : 1];
  uniforms["lights["+i+"].specular"]=[lt.specular[0],lt.specular[1],lt.specular[2],
    lt.specular.length>3 ? lt.specular[3] : 1];
  uniforms["lights["+i+"].position"]=lightsObject.lights[i].position;
 }
 // Set empty values for undefined lights up to MAX_LIGHTS
 for(i=lightsObject.lights.length;i<Lights.MAX_LIGHTS;i++){
  uniforms["lights["+i+"].diffuse"]=[0,0,0,1];
  uniforms["lights["+i+"].specular"]=[0,0,0,1];
  uniforms["lights["+i+"].position"]=[0,0,0,0];
 }
 program.setUniforms(uniforms);
 return this;
};

///////////////////////

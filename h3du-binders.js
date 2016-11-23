/*
Written by Peter O. in 2015.

Any copyright is dedicated to the Public Domain.
http://creativecommons.org/publicdomain/zero/1.0/
If you like this, you should donate to Peter O.
at: http://peteroupc.github.io/
*/
/* global H3DU.BufferedMesh, H3DU.FrameBuffer, H3DU, Lights, Material, H3DU.Mesh */
/**
* Contains classes that implement methods
* binding certain HTML 3D Library objects
* to WebGL contexts and programs.
*/

///////////////////////

/** @private */
H3DU._MaterialBinder=function(mshade){
 "use strict";
this.mshade=mshade;
}
/** @private */
H3DU._MaterialBinder._textureSizeZeroZero=[0,0];
/** @private */
H3DU._MaterialBinder.prototype.bind=function(program,context,loader){
 "use strict";
 if(!this.mshade)return this;
 if(this.mshade.diffuse.length!==4){console.warn("creating new diffuse array")}
 if(this.mshade.ambient.length!==3){console.warn("creating new ambient array")}
 if(this.mshade.specular.length!==3){console.warn("creating new specular array")}
 if(this.mshade.emission.length!==3){console.warn("creating new emission array")}
 var uniforms={
  "textureSize":H3DU._MaterialBinder._textureSizeZeroZero,
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
 H3DU._MaterialBinder.bindTexture(this.mshade.texture,context,program,0,loader);
 H3DU._MaterialBinder.bindTexture(this.mshade.specularMap,context,program,1,loader);
 H3DU._MaterialBinder.bindTexture(this.mshade.normalMap,context,program,2,loader);
 return this;
};

//////////////////////////

/** @private */
H3DU._LoadedTexture=function(textureImage, context){
  "use strict";
  context=H3DU._toContext(context);
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
  if(H3DU._isPowerOfTwo(textureImage.width) &&
      H3DU._isPowerOfTwo(textureImage.height)){
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
H3DU._LoadedTexture.prototype.dispose=function(){
 "use strict";
if(this.loadedTexture){
  this.context.deleteTexture(this.loadedTexture);
 }
};
/////////////////////////////////

/** @private */
H3DU._MaterialBinder.bindTexture=function(texture,context,program,textureUnit,loader){
 "use strict";
 if(!texture)return;
 var isFrameBuffer=(texture instanceof H3DU.FrameBuffer)
 var loadedTexture=null;
 if(!isFrameBuffer){
 if((typeof texture.image==="undefined" || texture.image===null)  &&
    texture.loadStatus===0){
      var thisObj=this;
      var prog=program;
      texture.loadImage().then(function(e){
        // try again loading the image
        thisObj.bind(prog);
      });
      return;
 } else {
  loadedTexture=loader.mapTexture(texture,context);
 }
 }
 if ((loadedTexture!=null) || isFrameBuffer) {
      var uniforms={};
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
        loadedTexture.loadedTexture);
       // Set texture parameters
       loader._setMaxAnisotropy(context);
       // set magnification
       context.texParameteri(context.TEXTURE_2D,
        context.TEXTURE_MAG_FILTER, context.LINEAR);
       var wrapMode=context.CLAMP_TO_EDGE;
       if(H3DU._isPowerOfTwo(texture.width) &&
          H3DU._isPowerOfTwo(texture.height)){
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
H3DU._LightsBinder=function(lights){
 "use strict";
this.lights=lights;
}
H3DU._LightsBinder.emptyW1 = [0,0,0,1];
H3DU._LightsBinder.emptyW0 = [0,0,0,0];
H3DU._LightsBinder.emptyAtten = [1,0,0,0];
/** @private */
H3DU._LightsBinder.prototype.bind=function(program,viewMatrix){
 "use strict";
var lightsObject=this.lights;
 if(!lightsObject)return this;
 if(!program)return this;
 var uniforms={};
 uniforms.sceneAmbient= lightsObject.sceneAmbient.length===3 ?
    lightsObject.sceneAmbient : lightsObject.sceneAmbient.slice(0,3);
 for(var i=0;i<lightsObject.lights.length;i++){
  var lt=lightsObject.lights[i];
  var ltname="lights["+i+"]";
  uniforms[ltname+".diffuse"]=lt.diffuse.length===4 ?
    lt.diffuse : [lt.diffuse[0],lt.diffuse[1],lt.diffuse[2],1];
  uniforms[ltname+".specular"]=lt.specular.length===4 ?
    lt.specular : [lt.specular[0],lt.specular[1],lt.specular[2],1];
  var pos=H3DU.Math.mat4transform(viewMatrix,lightsObject.lights[i].position)
  uniforms[ltname+".position"]=pos;
  uniforms[ltname+".radius"]=[Math.max(0.0,lt.radius*lt.radius*lt.radius*lt.radius),
    0,0,0];
 }
 // Set empty values for undefined lights up to MAX_LIGHTS
 for(i=lightsObject.lights.length;i<Lights.MAX_LIGHTS;i++){
  var ltname="lights["+i+"]";
  uniforms[ltname+".diffuse"]=H3DU._LightsBinder.emptyW1;
  uniforms[ltname+".specular"]=H3DU._LightsBinder.emptyW1;
  uniforms[ltname+".position"]=H3DU._LightsBinder.emptyW0;
  uniforms[ltname+".radius"]=H3DU._LightsBinder.emptyW0;
 }
 program.setUniforms(uniforms);
 return this;
};

///////////////////////

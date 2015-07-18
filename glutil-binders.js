/*
Written by Peter O. in 2015.

Any copyright is dedicated to the Public Domain.
http://creativecommons.org/publicdomain/zero/1.0/
If you like this, you should donate to Peter O.
at: http://upokecenter.dreamhosters.com/articles/donate-now-2/
*/

/**
* Contains classes that implement methods
* binding certain HTML 3D Library objects
* to WebGL contexts and programs.
*/

///////////////////////

/** @private */
function MaterialBinder(mshade){
 this.mshade=mshade;
 this.textureSize=[0,0];
}
/** @private */
MaterialBinder.prototype.bind=function(program){
 if(!this.mshade)return this;
 var uniforms={
  "textureSize":this.textureSize,
  "useSpecularMap":0,
  "useNormalMap":0
 }
 program.setUniforms(uniforms);
 uniforms={
  "mshin":this.mshade.shininess,
  "ma":this.mshade.ambient.length==3 ? this.mshade.ambient :
     [this.mshade.ambient[0], this.mshade.ambient[1], this.mshade.ambient[2]],
  "md":this.mshade.diffuse.length==4 ? this.mshade.diffuse :
    [this.mshade.diffuse[0], this.mshade.diffuse[1], this.mshade.diffuse[2],
       this.mshade.diffuse.length<4 ? 1.0 : this.mshade.diffuse[3]],
  "ms":this.mshade.specular.length==3 ? this.mshade.specular :
     [this.mshade.specular[0],this.mshade.specular[1],this.mshade.specular[2]],
  "me":this.mshade.emission.length==3 ? this.mshade.emission :
     [this.mshade.emission[0],this.mshade.emission[1],this.mshade.emission[2]]
 };
 if(this.mshade.texture){
  new TextureBinder(this.mshade.texture).bind(program,0);
 }
 if(this.mshade.specularMap){
  new TextureBinder(this.mshade.specularMap).bind(program,1);
 }
 if(this.mshade.normalMap){
  new TextureBinder(this.mshade.normalMap).bind(program,2);
 }
 program.setUniforms(uniforms);
 return this;
}

//////////////////////////

/** @private */
function LoadedTexture(textureImage, context){
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
LoadedTexture.prototype.dispose=function(){
 if(this.loadedTexture){
  this.context.deleteTexture(this.loadedTexture);
 }
}

/////////////////////////////////

function FrameBufferMaterialBinder(fb){
 this.fb=fb;
}
/** @private */
FrameBufferMaterialBinder.prototype.bind=function(program){
      var uniforms={};
      uniforms["sampler"]=this.fb.textureUnit;
      uniforms["textureSize"]=[this.fb.width,this.fb.height];
      program.setUniforms(uniforms);
      var ctx=program.getContext()
      ctx.activeTexture(ctx.TEXTURE0+this.fb.textureUnit);
      ctx.bindTexture(ctx.TEXTURE_2D,
        this.fb.colorTexture);
      if(this.fb.colorTexture){
       ctx.texParameteri(ctx.TEXTURE_2D,
        ctx.TEXTURE_MAG_FILTER, ctx.NEAREST);
       ctx.texParameteri(ctx.TEXTURE_2D,
        ctx.TEXTURE_MIN_FILTER, ctx.NEAREST);
      ctx.texParameteri(ctx.TEXTURE_2D,
       ctx.TEXTURE_WRAP_S, ctx.CLAMP_TO_EDGE);
      ctx.texParameteri(ctx.TEXTURE_2D,
       ctx.TEXTURE_WRAP_T, ctx.CLAMP_TO_EDGE);
     }
}

/////////////////////////////////

function TextureBinder(tex){
 this.texture=tex;
}
/** @private */
TextureBinder.prototype.bind=function(program,textureUnit){
 if(textureUnit==null)textureUnit=0;
 var texture=this.texture;
 var context=program.getContext();
 if(texture.image!==null && texture.loadedTexture===null){
      // load the image as a texture
      texture.loadedTexture=new LoadedTexture(texture,context);
 } else if(texture.image===null && texture.loadedTexture===null &&
   texture.loadStatus==0){
      var thisObj=this;
      var prog=program;
      texture.loadImage().then(function(e){
        // try again loading the image
        thisObj.bind(prog);
      });
      return;
 }
 if (texture.loadedTexture!==null) {
      var uniforms={};
      if(texture.anisotropic==null){
       // Try to load anisotropic filtering extension
       texture.anisotropic=context.getExtension("EXT_texture_filter_anisotropic") ||
         context.getExtension("WEBKIT_EXT_texture_filter_anisotropic") ||
         context.getExtension("MOZ_EXT_texture_filter_anisotropic");
       if(texture.anisotropic==null){
        texture.anisotropic={};
        texture.maxAnisotropy=1;
       } else {
        texture.maxAnisotropy=context.getParameter(
          texture.anisotropic.MAX_TEXTURE_MAX_ANISOTROPY_EXT);
       }
      }
      if(textureUnit==0){
       uniforms["sampler"]=textureUnit;
       uniforms["textureSize"]=[texture.width,texture.height];
      }
      if(textureUnit==1){
       uniforms["specularMap"]=textureUnit;
       uniforms["useSpecularMap"]=1;
      }
      if(textureUnit==2){
       uniforms["normalMap"]=textureUnit;
       uniforms["useNormalMap"]=1;
      }
      program.setUniforms(uniforms);
      context.activeTexture(context.TEXTURE0+textureUnit);
      context.bindTexture(context.TEXTURE_2D,
        texture.loadedTexture.loadedTexture);
      // Set texture parameters
      if(typeof texture.anisotropic.TEXTURE_MAX_ANISOTROPY_EXT!="undefined"){
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

//////////////////////////

function LightsBinder(lights){
 this.lights=lights;
}
/** @private */
LightsBinder.prototype.bind=function(program){
 var lightsObject=this.lights;
 if(!lightsObject)return this;
 if(!program)return this;
 var uniforms={};
 uniforms["sceneAmbient"]=lightsObject.sceneAmbient.slice(0,3);
 for(var i=0;i<lightsObject.lights.length;i++){
  var lt=lightsObject.lights[i]
  uniforms["lights["+i+"].diffuse"]=[lt.diffuse[0],lt.diffuse[1],lt.diffuse[2],
    lt.diffuse.length>3 ? lt.diffuse[3] : 1];
  uniforms["lights["+i+"].specular"]=[lt.specular[0],lt.specular[1],lt.specular[2],
    lt.specular.length>3 ? lt.specular[3] : 1];
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

///////////////////////

var Binders={};
Binders._texturedeprecation=false
Binders.getMaterialBinder=function(material){
 if(material){
 if(material instanceof Material){
  return new MaterialBinder(material);
 }
 if(material instanceof Texture){
  if(!Binders._texturedeprecation){
   console.warn("Setting shape materials directly to textures is deprecated.  Use Material.fromTexture instead.");
   Binders._texturedeprecation=true
  }
  return new TextureBinder(material);
 }
 if(material instanceof FrameBuffer){
  return new FrameBufferMaterialBinder(material);
 }
 }
 // Return an empty binding object
 return {
/** @private */
bind:function(program){}};
}

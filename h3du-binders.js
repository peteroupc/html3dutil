/*
 Any copyright to this file is released to the Public Domain.
 http://creativecommons.org/publicdomain/zero/1.0/
 If you like this, you should donate
 to Peter O. (original author of
 the Public Domain HTML 3D Library) at:
 http://peteroupc.github.io/
*/
/* global H3DU */
/**
 * Contains classes that implement methods
 * binding certain HTML 3D Library objects
 * to WebGL contexts and programs.
 */

// /////////////////////

/** @private */
H3DU._MaterialBinder = function(mshade) {
  "use strict";
  this.mshade = mshade;
};
/** @private */
H3DU._MaterialBinder._textureSizeZeroZero = [0, 0];
/** @private */
H3DU._MaterialBinder.prototype.bind = function(program, context, loader) {
  "use strict";
  if(!this.mshade)return this;
  var mat = this.mshade;
  var diffuse = mat.albedo !== null ? mat.albedo : mat.diffuse;
  var uniforms = {
    "textureSize":H3DU._MaterialBinder._textureSizeZeroZero,
    "md":diffuse.length === 4 ? diffuse :
    [diffuse[0], diffuse[1], diffuse[2],
      diffuse.length < 4 ? 1.0 : diffuse[3]]
  };
  if(!mat.basic) {
    if(typeof mat.shininess !== "undefined" && mat.shininess !== null)
      uniforms.mshin = mat.shininess;
    if(typeof mat.metalness !== "undefined" && mat.metalness !== null)
      uniforms.metalness = mat.metalness;
    if(typeof mat.roughness !== "undefined" && mat.roughness !== null)
      uniforms.roughness = mat.roughness;
    if(typeof mat.ambient !== "undefined" && mat.ambient !== null) {
      uniforms.ma = mat.ambient.length === 3 ? mat.ambient :
     [mat.ambient[0], mat.ambient[1], mat.ambient[2]];
    }
    uniforms.ms = mat.specular.length === 3 ? mat.specular :
     [mat.specular[0], mat.specular[1], mat.specular[2]];
    uniforms.me = mat.emission.length === 3 ? mat.emission :
     [mat.emission[0], mat.emission[1], mat.emission[2]];
  }
  program.setUniforms(uniforms);
  if(typeof mat.albedoMap !== "undefined" && mat.albedoMap !== null)
    H3DU._MaterialBinder.bindTexture(mat.albedoMap, context, program, 0, loader);
  else
    H3DU._MaterialBinder.bindTexture(mat.texture, context, program, 0, loader);
  H3DU._MaterialBinder.bindTexture(mat.specularMap, context, program, 1, loader);
  H3DU._MaterialBinder.bindTexture(mat.normalMap, context, program, 2, loader);
  H3DU._MaterialBinder.bindTexture(mat.metalnessMap, context, program, 3, loader);
  H3DU._MaterialBinder.bindTexture(mat.roughnessMap, context, program, 4, loader);
  H3DU._MaterialBinder.bindTexture(mat.environmentMap, context, program, 5, loader);
  return this;
};

// ////////////////////////

/** @private */
H3DU._LoadedTexture = function(textureImage, context) {
  "use strict";
  if(!textureImage.image)throw new Error();
  context = H3DU._toContext(context);
  this.context = context;
  this.loadedTexture = context.createTexture();
  context.activeTexture(context.TEXTURE0);
  // In WebGL, texture coordinates start at the upper left corner rather than
  // the lower left as in OpenGL and OpenGL ES, so we use this method call
  // to reestablish the lower left corner.
  context.pixelStorei(context.UNPACK_FLIP_Y_WEBGL, 1);
  var target = context.TEXTURE_2D;
  context.bindTexture(target, this.loadedTexture);
  if("src" in textureImage.image) {
    context.texImage2D(target, 0,
      context.RGBA, context.RGBA, context.UNSIGNED_BYTE,
      textureImage.image);
  } else {
    context.texImage2D(target, 0,
     context.RGBA, textureImage.getWidth(), textureImage.getHeight(), 0,
     context.RGBA, context.UNSIGNED_BYTE, textureImage.image);
  }
  // generate mipmaps for power-of-two textures
  if(H3DU._isPowerOfTwo(textureImage.getWidth()) &&
      H3DU._isPowerOfTwo(textureImage.getHeight())) {
    context.generateMipmap(context.TEXTURE_2D);
  } else {
    context.texParameteri(target,
        context.TEXTURE_MIN_FILTER, context.LINEAR);
    context.texParameteri(target,
        context.TEXTURE_WRAP_S, context.CLAMP_TO_EDGE);
    context.texParameteri(target,
        context.TEXTURE_WRAP_T, context.CLAMP_TO_EDGE);
  }
};
/** @private */
H3DU._LoadedCubeMap = function(textureImage, context) {
  "use strict";
  context = H3DU._toContext(context);
  this.context = context;
  this.loadedTexture = context.createTexture();
  context.activeTexture(context.TEXTURE0);
  // In WebGL, texture coordinates start at the upper left corner rather than
  // the lower left as in OpenGL and OpenGL ES, but for cubemap textures,
  // there is little benefit in reestablishing the lower left corner
  context.pixelStorei(context.UNPACK_FLIP_Y_WEBGL, 0);
  var target = context.TEXTURE_CUBE_MAP;
  context.bindTexture(target, this.loadedTexture);
  for(var i = 0;i < 6;i++) {
    if("src" in textureImage.textures[i].image) {
      context.texImage2D(context.TEXTURE_CUBE_MAP_POSITIVE_X + i, 0,
      context.RGBA, context.RGBA, context.UNSIGNED_BYTE,
      textureImage.textures[i].image);
    } else {
      context.texImage2D(context.TEXTURE_CUBE_MAP_POSITIVE_X + i, 0,
     context.RGBA, textureImage.getWidth(), textureImage.getHeight(), 0,
     context.RGBA, context.UNSIGNED_BYTE, textureImage.image);
    }
  }
  // generate mipmaps for power-of-two textures
  if(H3DU._isPowerOfTwo(textureImage.getWidth()) &&
      H3DU._isPowerOfTwo(textureImage.getHeight())) {
    context.generateMipmap(target);
  } else {
    context.texParameteri(target,
        context.TEXTURE_MIN_FILTER, context.LINEAR);
  }
  context.texParameteri(target,
        context.TEXTURE_WRAP_S, context.CLAMP_TO_EDGE);
  context.texParameteri(target,
        context.TEXTURE_WRAP_T, context.CLAMP_TO_EDGE);
};

/** @private */
H3DU._LoadedTexture.prototype.dispose = function() {
  "use strict";
  if(this.loadedTexture && this.context) {
    this.context.deleteTexture(this.loadedTexture);
  }
  this.context = null;
  this.loadedTexture = null;
};
/** @private */
H3DU._LoadedCubeMap.prototype.dispose = function() {
  "use strict";
  if(this.loadedTexture && this.context) {
    this.context.deleteTexture(this.loadedTexture);
  }
  this.context = null;
  this.loadedTexture = null;
};
// ///////////////////////////////

/** @private */
H3DU._MaterialBinder.bindTexture = function(texture, context, program, textureUnit, loader) {
  "use strict";
  if(texture === null || typeof texture === "undefined") {
    if(context) {
      context.activeTexture(context.TEXTURE0 + textureUnit);
      context.bindTexture(context.TEXTURE_2D, null);
      context.bindTexture(context.TEXTURE_CUBE_MAP, null);
    }
    return;
  }
  var isFrameBuffer = texture instanceof H3DU.FrameBufferInfo;
  if(!isFrameBuffer && !(texture instanceof H3DU.Texture) && !(texture instanceof H3DU.CubeMap)) {
    throw new Error("unsupported texture type");
  }
  var loadedTexture = null;
  // var cubeMap = texture instanceof H3DU.CubeMap;
  if(!isFrameBuffer) {
    if(texture.loadStatus === 0) {
      var that = this;
      var prog = program;
      texture.loadImage().then(function() {
        // try again loading the image
        that.bind(prog);
      });
      return;
    } else if(texture.loadStatus >= 2) {
      loadedTexture = loader.mapTexture(texture, context);
    }
  } else {
    texture = loader.mapFrameBuffer(texture, context);
  }
  if (loadedTexture !== null && typeof loadedTexture !== "undefined" || isFrameBuffer) {
    var uniforms = {};
    if(textureUnit === 0) {
      uniforms.sampler = textureUnit;
      uniforms.textureSize = [texture.getWidth(), texture.getHeight()];
    }
    if(textureUnit === 1) {
      uniforms.specularMap = textureUnit;
    }
    if(textureUnit === 2) {
      uniforms.normalMap = textureUnit;
    }
    if(textureUnit === 3) {
      uniforms.metalnessMap = textureUnit;
    }
    if(textureUnit === 4) {
      uniforms.roughnessMap = textureUnit;
    }
    if(textureUnit === 5) {
      uniforms.envMap = textureUnit;
    }
    program.setUniforms(uniforms);
    context.activeTexture(context.TEXTURE0 + textureUnit);
    if(isFrameBuffer) {
      context.bindTexture(context.TEXTURE_2D,
         texture.colorTexture);
      if(texture.colorTexture) {
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
      var target = texture instanceof H3DU.CubeMap ?
      context.TEXTURE_CUBE_MAP : context.TEXTURE_2D;
      context.bindTexture(target,
        loadedTexture.loadedTexture);
       // Set texture parameters
      loader._setMaxAnisotropy(context, target);
       // set magnification
      context.texParameteri(target,
        context.TEXTURE_MAG_FILTER, context.LINEAR);
      var wrapMode = context.CLAMP_TO_EDGE;
      if(H3DU._isPowerOfTwo(texture.getWidth()) &&
          H3DU._isPowerOfTwo(texture.getHeight())) {
         // Enable mipmaps if texture's dimensions are powers of two
        if(!texture.clamp)wrapMode = context.REPEAT;
        context.texParameteri(target,
           context.TEXTURE_MIN_FILTER, context.LINEAR_MIPMAP_LINEAR);
      } else {
        context.texParameteri(target,
         context.TEXTURE_MIN_FILTER, context.LINEAR);
      }
      context.texParameteri(target,
        context.TEXTURE_WRAP_S, wrapMode);
      context.texParameteri(target,
        context.TEXTURE_WRAP_T, wrapMode);
    }
  }
};

// ////////////////////////

/** @private */
H3DU._LightsBinder = function(lights) {
  "use strict";
  this.lights = lights;
};
H3DU._LightsBinder.emptyW1 = [0, 0, 0, 1];
H3DU._LightsBinder.emptyW0 = [0, 0, 0, 0];
H3DU._LightsBinder.emptyAtten = [1, 0, 0, 0];
/** @private */
H3DU._LightsBinder.prototype.bind = function(program, viewMatrix) {
  "use strict";
  var ltname;
  var lightsObject = this.lights;
  if(!lightsObject)return this;
  if(!program)return this;
  var uniforms = {};
  uniforms.sceneAmbient = lightsObject.sceneAmbient.length === 3 ?
    lightsObject.sceneAmbient : lightsObject.sceneAmbient.slice(0, 3);
  for(var i = 0;i < lightsObject.lights.length;i++) {
    var lt = lightsObject.lights[i];
    ltname = "lights[" + i + "]";
    uniforms[ltname + ".diffuse"] = lt.diffuse.length === 4 ?
    lt.diffuse : [lt.diffuse[0], lt.diffuse[1], lt.diffuse[2], 1];
    uniforms[ltname + ".specular"] = lt.specular.length === 4 ?
    lt.specular : [lt.specular[0], lt.specular[1], lt.specular[2], 1];
    var pos = H3DU.Math.mat4transform(viewMatrix, lightsObject.lights[i].position);
    uniforms[ltname + ".position"] = pos;
    uniforms[ltname + ".radius"] = [Math.max(0.0, lt.radius * lt.radius * lt.radius * lt.radius),
      0, 0, 0];
  }
 // Set empty values for undefined lights up to MAX_LIGHTS
  for(i = lightsObject.lights.length;i < H3DU.Lights.MAX_LIGHTS;i++) {
    ltname = "lights[" + i + "]";
    uniforms[ltname + ".diffuse"] = H3DU._LightsBinder.emptyW1;
    uniforms[ltname + ".specular"] = H3DU._LightsBinder.emptyW1;
    uniforms[ltname + ".position"] = H3DU._LightsBinder.emptyW0;
    uniforms[ltname + ".radius"] = H3DU._LightsBinder.emptyW0;
  }
  program.setUniforms(uniforms);
  return this;
};

// /////////////////////

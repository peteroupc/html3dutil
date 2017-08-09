/*
 Any copyright to this file is released to the Public Domain.
 http://creativecommons.org/publicdomain/zero/1.0/
 If you like this, you should donate
 to Peter O. (original author of
 the Public Domain HTML 3D Library) at:
 http://peteroupc.github.io/
*/
/* global H3DU, WebGL2RenderingContext */
/**
 * Contains classes that implement methods
 * binding certain HTML 3D Library objects
 * to WebGL contexts and programs.
 */

// /////////////////////

/** @ignore */
var _isPowerOfTwo = function(a) {
  if(Math.floor(a) !== a || a <= 0)return false;
  while(a > 1 && (a & 1) === 0) {
    a >>= 1;
  }
  return a === 1;
};

/**
 * @ignore
 * @constructor
 */
var _MaterialBinder = function(mshade) {
  this.mshade = mshade;
};
/** @ignore */
_MaterialBinder._textureSizeZeroZero = [0, 0];
/** @ignore */
_MaterialBinder.prototype.bind = function(program, context, loader) {
  if(!this.mshade)return this;
  var mat = this.mshade;
  var diffuse = typeof mat.albedo !== "undefined" && mat.albedo !== null ? mat.albedo : mat.diffuse;
  var uniforms = {
    "textureSize":_MaterialBinder._textureSizeZeroZero,
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
  var sampler = 0;
  var textures = [];
  textures.push([typeof mat.albedoMap === "undefined" ? null : mat.albedoMap, "texture", "textureSize"]);
  textures.push([typeof mat.texture === "undefined" ? null : mat.texture, "texture", "textureSize"]);
  textures.push([typeof mat.specularMap === "undefined" ? null : mat.specularMap, "specularMap"]);
  textures.push([typeof mat.normalMap === "undefined" ? null : mat.normalMap, "normalMap"]);
  textures.push([typeof mat.metalnessMap === "undefined" ? null : mat.metalnessMap, "metalnessMap"]);
  textures.push([typeof mat.occlusionMap === "undefined" ? null : mat.occlusionMap, "occlusionMap"]);
  textures.push([typeof mat.roughnessMap === "undefined" ? null : mat.roughnessMap, "roughnessMap"]);
  textures.push([typeof mat.environmentMap === "undefined" ? null : mat.environmentMap, "envMap"]);
  textures.push([typeof mat.emissionMap === "undefined" ? null : mat.emissionMap, "emissionMap"]);
  for(var i = 0; i < textures.length; i++) {
    if(typeof textures[i][0] !== "undefined" && textures[i][0] !== null) {
      var textureSizeName = typeof textures[i][2] === "undefined" ? null : textures[i][2];
      var tex = textures[i][0];
      var texInfo = tex instanceof H3DU.Texture ? tex._toInfo() : tex;
      _MaterialBinder.bindTexture(
        tex, texInfo, context, program,
        sampler++, loader, textures[i][1], textureSizeName);
    }
  }
  if(typeof mat.shader !== "undefined" && mat.shader !== null) {
    for(var k in mat.shader.uniformValues || {})
      if(Object.prototype.hasOwnProperty.call(mat.shader.uniformValues, k)) {
        var v = mat.shader.uniformValues[k];
        if(typeof v !== "undefined" && v !== null && v instanceof H3DU.TextureInfo) {
          _MaterialBinder.bindTexture(
            v, v, context, program,
            sampler++, loader, k, null);
        }
      }
  }
  return this;
};

// ////////////////////////

/**
 * @ignore
 * @constructor
 */
function _LoadedTexture(texture, textureInfo, context) {
  this._init(texture, textureInfo, context);
}
/** @ignore */
_LoadedTexture.textureFilters = function(context, texture, textureInfo, target) {
  context.texParameteri(target,
    context.TEXTURE_MAG_FILTER, textureInfo.magFilter);
  // generate mipmaps for power-of-two textures
  if(typeof WebGL2RenderingContext !== "undefined" && WebGL2RenderingContext !== null && context instanceof WebGL2RenderingContext ||
     _isPowerOfTwo(texture.getWidth()) &&
      _isPowerOfTwo(texture.getHeight())) {
    context.generateMipmap(target);
  } else {
    // WebGL 1 non-power-of-two texture
    var filter = textureInfo.minFilter;
    if(filter === context.NEAREST_MIPMAP_NEAREST ||
        filter === context.NEAREST_MIPMAP_LINEAR)
      filter = context.NEAREST;
    if(filter === context.LINEAR_MIPMAP_NEAREST ||
        filter === context.LINEAR_MIPMAP_LINEAR)
      filter = context.LINEAR;
    context.texParameteri(target,
      context.TEXTURE_MIN_FILTER, filter);
    context.texParameteri(target,
      context.TEXTURE_WRAP_S, context.CLAMP_TO_EDGE);
    context.texParameteri(target,
      context.TEXTURE_WRAP_T, context.CLAMP_TO_EDGE);
  }
};

/** @ignore */
_LoadedTexture.prototype._init = function(texture, textureInfo, context) {
  if(!texture.image)throw new Error();
  context = context && context.getContext ? context.getContext() : context;
  this.context = context;
  this.loadedTexture = context.createTexture();
  context.activeTexture(context.TEXTURE0);
  // In WebGL, texture coordinates start at the upper left corner rather than
  // the lower left as in OpenGL and OpenGL ES. If the texture info indicates
  // top-down texture coordinates, no flipping is needed.
  // NOTE: Non-DOMElement recommends top-down.
  context.pixelStorei(context.UNPACK_FLIP_Y_WEBGL,
    textureInfo.topDown ? 0 : 1);
  var target = textureInfo.target;
  context.bindTexture(target, this.loadedTexture);
  if("src" in texture.image) {
    context.texImage2D(target, 0,
      textureInfo.internalFormat, textureInfo.format, context.UNSIGNED_BYTE,
      texture.image);
  } else {
    context.texImage2D(target, 0,
      textureInfo.internalFormat, texture.getWidth(), texture.getHeight(), 0,
      textureInfo.format, context.UNSIGNED_BYTE, texture.image);
  }
  _LoadedTexture.textureFilters(context, texture, textureInfo, target);
};

/**
 * @ignore
 * @constructor
 */
function _LoadedCubeMap(textureImage, context) {
  context = context && context.getContext ? context.getContext() : context;
  this.context = context;
  this.loadedTexture = context.createTexture();
  context.activeTexture(context.TEXTURE0);
  // In WebGL, texture coordinates start at the upper left corner rather than
  // the lower left as in OpenGL and OpenGL ES, but for cubemap textures,
  // there is little benefit in reestablishing the lower left corner
  context.pixelStorei(context.UNPACK_FLIP_Y_WEBGL, 0);
  var target = context.TEXTURE_CUBE_MAP;
  context.bindTexture(target, this.loadedTexture);
  for(var i = 0; i < 6; i++) {
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
  _LoadedTexture.textureFilters(context, textureImage, new H3DU.TextureInfo(), target);
}

/** @ignore */
_LoadedTexture.prototype.dispose = function() {
  if(this.loadedTexture && this.context) {
    this.context.deleteTexture(this.loadedTexture);
  }
  this.context = null;
  this.loadedTexture = null;
};
/** @ignore */
_LoadedCubeMap.prototype.dispose = function() {
  if(this.loadedTexture && this.context) {
    this.context.deleteTexture(this.loadedTexture);
  }
  this.context = null;
  this.loadedTexture = null;
};
// ///////////////////////////////

/** @ignore */
_MaterialBinder.bindTexture = function(
  texture, textureInfo, context, program,
  textureUnit, loader, uniformName, sizeUniform) {
  if(!(typeof textureInfo !== "undefined" && textureInfo !== null))throw new Error();
  if(typeof texture === "undefined" || texture === null) {
    if(context) {
      context.activeTexture(context.TEXTURE0 + textureUnit);
      context.bindTexture(context.TEXTURE_2D, null);
      context.bindTexture(context.TEXTURE_CUBE_MAP, null);
    }
    return;
  }
  var isFrameBuffer = texture instanceof H3DU.FrameBufferInfo;
  if(!isFrameBuffer &&
     !(texture instanceof H3DU.Texture) &&
     !(texture instanceof H3DU.CubeMap) &&
     !(texture instanceof H3DU.TextureInfo)) {
    throw new Error("unsupported texture type");
  }
  var loadedTexture = null;
  if(!isFrameBuffer) {
    if(texture instanceof H3DU.TextureInfo) {
      var infoTexture = loader.getTexture(texture.uri);
      if(typeof infoTexture === "undefined" || infoTexture === null) {
        var that = this;
        var prog = program;
        loader.loadAndMapTexture(texture, context).then(function() {
        // try again loading the image
          that.bind(prog, context, loader);
        });
      } else {
        texture = infoTexture;
      }
    }
    if(texture.loadStatus === 0) {
      that = this;
      prog = program;
      texture.loadImage().then(function() {
        // try again loading the image
        that.bind(prog, context, loader);
      });
      return;
    } else if(texture.loadStatus >= 2) {
      loadedTexture = loader._mapTextureWithInfo(texture, textureInfo, context);
    }
  } else {
    texture = loader.mapFrameBuffer(texture, context);
  }
  if (typeof loadedTexture !== "undefined" && loadedTexture !== null || isFrameBuffer) {
    var uniforms = {};
    uniforms[uniformName] = textureUnit;
    if(typeof sizeUniform !== "undefined" && sizeUniform !== null) {
      uniforms[sizeUniform] = [texture.getWidth(), texture.getHeight()];
    }
    program.setUniforms(uniforms);
    context.activeTexture(context.TEXTURE0 + textureUnit);
    if(isFrameBuffer) {
      context.bindTexture(context.TEXTURE_2D,
        texture.colorTexture);
      if(texture.colorTexture) {
        context.texParameteri(context.TEXTURE_2D,
          context.TEXTURE_MIN_FILTER, textureInfo.magFilter);
        context.texParameteri(context.TEXTURE_2D,
          context.TEXTURE_MIN_FILTER, textureInfo.minFilter);
        context.texParameteri(context.TEXTURE_2D,
          context.TEXTURE_WRAP_S, textureInfo.wrapS);
        context.texParameteri(context.TEXTURE_2D,
          context.TEXTURE_WRAP_T, textureInfo.wrapT);
      }
    } else {
      var target = texture instanceof H3DU.CubeMap ?
        context.TEXTURE_CUBE_MAP : textureInfo.target;
      context.bindTexture(target,
        loadedTexture.loadedTexture);
      // Set texture parameters
      loader._setMaxAnisotropy(context, target);
      // set magnification
      context.texParameteri(target,
        context.TEXTURE_MAG_FILTER, textureInfo.magFilter);
      if(typeof WebGL2RenderingContext !== "undefined" && WebGL2RenderingContext !== null && context instanceof WebGL2RenderingContext ||
     _isPowerOfTwo(texture.getWidth()) &&
      _isPowerOfTwo(texture.getHeight())) {
        context.texParameteri(target,
          context.TEXTURE_MIN_FILTER, textureInfo.minFilter);
        context.texParameteri(target,
          context.TEXTURE_WRAP_S, textureInfo.wrapS);
        context.texParameteri(target,
          context.TEXTURE_WRAP_T, textureInfo.wrapT);
      } else {
        // WebGL 1 non-power-of-two texture
        var filter = textureInfo.minFilter;
        if(filter === context.NEAREST_MIPMAP_NEAREST ||
        filter === context.NEAREST_MIPMAP_LINEAR)
          filter = context.NEAREST;
        if(filter === context.LINEAR_MIPMAP_NEAREST ||
        filter === context.LINEAR_MIPMAP_LINEAR)
          filter = context.LINEAR;
        context.texParameteri(target,
          context.TEXTURE_MIN_FILTER, filter);
        context.texParameteri(target,
          context.TEXTURE_WRAP_S, context.CLAMP_TO_EDGE);
        context.texParameteri(target,
          context.TEXTURE_WRAP_T, context.CLAMP_TO_EDGE);
      }
    }
  }
};

// ////////////////////////

/**
 * @ignore
 * @constructor
 */
function _LightsBinder(lights) {
  this.lights = lights;
}
_LightsBinder.emptyW1 = [0, 0, 0, 1];
_LightsBinder.emptyW0 = [0, 0, 0, 0];
_LightsBinder.emptyAtten = [1, 0, 0, 0];
/** @ignore */
_LightsBinder.prototype.bind = function(program, viewMatrix) {
  var ltname;
  var lightsObject = this.lights;
  if(!lightsObject)return this;
  if(!program)return this;
  var uniforms = {};
  uniforms.sceneAmbient = lightsObject.sceneAmbient.length === 3 ?
    lightsObject.sceneAmbient : lightsObject.sceneAmbient.slice(0, 3);
  for(var i = 0; i < lightsObject.lights.length; i++) {
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
  for(i = lightsObject.lights.length; i < H3DU.Lights.MAX_LIGHTS; i++) {
    ltname = "lights[" + i + "]";
    uniforms[ltname + ".diffuse"] = _LightsBinder.emptyW1;
    uniforms[ltname + ".specular"] = _LightsBinder.emptyW1;
    uniforms[ltname + ".position"] = _LightsBinder.emptyW0;
    uniforms[ltname + ".radius"] = _LightsBinder.emptyW0;
  }
  program.setUniforms(uniforms);
  return this;
};

// /////////////////////
export {_LoadedTexture, _LoadedCubeMap, _LightsBinder, _MaterialBinder};

/*
 Any copyright to this file is released to the Public Domain.
 http://creativecommons.org/publicdomain/zero/1.0/
 If you like this, you should donate
 to Peter O. (original author of
 the Public Domain HTML 3D Library) at:
 http://peteroupc.github.io/
*/
/* global H3DU, console */
/**
 * An object that holds a rendering context for rendering
 * 3D objects.
 * @class
 * @alias H3DU.Scene3D
 * @param {WebGLRenderingContext|WebGL2RenderingContext|object} canvasOrContext
 * A WebGL context to associate with this scene, or an HTML
 * canvas element to create a WebGL context from, or an object, such as H3DU.Scene3D, that
 * implements a no-argument <code>getContext</code> method
 * that returns a WebGL context.
 */
H3DU.Scene3D = function(canvasOrContext) {
  "use strict";
  var context = canvasOrContext;
  if(typeof canvasOrContext.getContext === "function") {
  // This might be a canvas, so create a WebGL context.
    if(HTMLCanvasElement && context.constructor === HTMLCanvasElement) {
      context = H3DU.get3DContext(canvasOrContext);
    } else {
      context = H3DU._toContext(context);
    }
  }
  this.context = context;
  this.textureCache = {};
  this._textureLoader = new H3DU.TextureLoader();
  this._meshLoader = new H3DU.BufferedMesh._MeshLoader();
  this._renderedOutsideScene = false;
 /** An array of shapes that are part of the scene.
  * @deprecated Shapes should now be managed in {@link H3DU.Batch3D} objects,
  * rather than through this class.
  */
  this.shapes = [];
  this._errors = false;
  this._frontFace = H3DU.Scene3D.CCW;
  this._cullFace = H3DU.Scene3D.NONE;
  this.clearColor = [0, 0, 0, 1];
  this.fboFilter = null;
 // NOTE: Exists for compatibility only
  this._subScene = new H3DU.Batch3D();
  this._subScene.getLights().setBasic();
  this._programs = new H3DU.Scene3D.ProgramCache();
  this.useDevicePixelRatio = false;
  this._is3d = H3DU.is3DContext(this.context);
  this._pixelRatio = 1;
  this.autoResize = true;
  this.width = Math.ceil(this.context.canvas.clientWidth * 1.0);
  this.height = Math.ceil(this.context.canvas.clientHeight * 1.0);
  this.context.canvas.width = this.width;
  this.context.canvas.height = this.height;
  if(this._is3d) {
    this.context.viewport(0, 0, this.width, this.height);
    this.context.enable(this.context.BLEND);
    this.context.blendFunc(this.context.SRC_ALPHA, this.context.ONE_MINUS_SRC_ALPHA);
    this.context.enable(this.context.DEPTH_TEST);
    this.context.depthFunc(this.context.LEQUAL);
    this.context.disable(this.context.CULL_FACE);
    this.context.clearDepth(1.0);
    this._setClearColor();
    this._setFace();
  }
};
/**
 * Gets the HTML canvas associated with this scene.
 * @memberof! H3DU.Scene3D#
 * @returns {Object} Return value.
 */
H3DU.Scene3D.prototype.getCanvas = function() {
  "use strict";
  return this.context ? this.context.canvas : null;
};

/** @private */
H3DU.Scene3D.LIGHTING_ENABLED = 1;
/** @private */
H3DU.Scene3D.SPECULAR_MAP_ENABLED = 2;
/** @private */
H3DU.Scene3D.NORMAL_MAP_ENABLED = 4;
/** @private */
H3DU.Scene3D.SPECULAR_ENABLED = 8;
/** @private */
H3DU.Scene3D.TEXTURE_ENABLED = 16;
/** @private */
H3DU.Scene3D.COLORATTR_ENABLED = 32;
/** @private */
H3DU.Scene3D.ROUGHNESS_ENABLED = 1 << 6 | 0;
/** @private */
H3DU.Scene3D.ROUGHNESS_MAP_ENABLED = 1 << 7 | 0;
/** @private */
H3DU.Scene3D.METALNESS_ENABLED = 1 << 8 | 0;
/** @private */
H3DU.Scene3D.METALNESS_MAP_ENABLED = 1 << 9 | 0;
/** @private */
H3DU.Scene3D.PHYSICAL_BASED_ENABLED = 1 << 10 | 0;
/** @private */
H3DU.Scene3D.INVERT_ROUGHNESS_ENABLED = 1 << 11 | 0;
/** @private */
H3DU.Scene3D.ENV_MAP_ENABLED = 1 << 12 | 0;
/** @private */
H3DU.Scene3D.ENV_EQUIRECT_ENABLED = 1 << 13 | 0;
/** @private */
H3DU.Scene3D.EMISSION_MAP_ENABLED = 1 << 14 | 0;

/** @private */
H3DU.Scene3D._flagsForShape = function(shape) {
  "use strict";
  var flags = 0;
  var material = shape.material;
  if(material !== null && typeof material !== "undefined" && material instanceof H3DU.Material) {
    flags |= H3DU.Scene3D.LIGHTING_ENABLED;
    flags |= material.specular[0] !== 0 ||
        material.specular[1] !== 0 ||
        material.specular[2] !== 0 ? H3DU.Scene3D.SPECULAR_ENABLED : 0;
    flags |= material.specularMap ? H3DU.Scene3D.SPECULAR_MAP_ENABLED : 0;
    flags |= material.normalMap ? H3DU.Scene3D.NORMAL_MAP_ENABLED : 0;
    flags |= material.texture ? H3DU.Scene3D.TEXTURE_ENABLED : 0;
    flags |= material.emissionMap ? H3DU.Scene3D.EMISSION_MAP_ENABLED : 0;
  }
  if(material !== null && typeof material !== "undefined" && material instanceof H3DU.PbrMaterial) {
    flags |= H3DU.Scene3D.LIGHTING_ENABLED | H3DU.Scene3D.PHYSICAL_BASED_ENABLED;
    if(material.workflow === H3DU.PbrMaterial.Metallic) {
      flags |= typeof material.metalness === "number" ? H3DU.Scene3D.METALNESS_ENABLED : 0;
      flags |= material.metalnessMap ? H3DU.Scene3D.METALNESS_MAP_ENABLED : 0;
    } else {
      flags |= material.specular ? H3DU.Scene3D.SPECULAR_ENABLED : 0;
      flags |= material.specularMap ? H3DU.Scene3D.SPECULAR_MAP_ENABLED : 0;
    }
    flags |= material.normalMap ? H3DU.Scene3D.NORMAL_MAP_ENABLED : 0;
    flags |= material.emissionMap ? H3DU.Scene3D.EMISSION_MAP_ENABLED : 0;
    flags |= material.albedoMap ? H3DU.Scene3D.TEXTURE_ENABLED : 0;
    flags |= material.invertRoughness === true ? H3DU.Scene3D.INVERT_ROUGHNESS_ENABLED : 0;
    flags |= typeof material.roughness === "number" ? H3DU.Scene3D.ROUGHNESS_ENABLED : 0;
    flags |= material.roughnessMap ? H3DU.Scene3D.ROUGHNESS_MAP_ENABLED : 0;
    if(material.environmentMap) {
      if(material.environmentMap instanceof H3DU.CubeMap) {
        flags |= H3DU.Scene3D.ENV_MAP_ENABLED;
      } else {
        flags |= H3DU.Scene3D.ENV_EQUIRECT_ENABLED;
      }
    }
  }
  var buffer = shape.getMeshBuffer();
  if(buffer && !!buffer._getAttribute(H3DU.Semantic.COLOR)) {
    flags |= H3DU.Scene3D.COLORATTR_ENABLED;
  }
  return flags;
};
/** @private
 * @returns {Object} Return value.
 */
H3DU.Scene3D.ProgramCache = function() {
  "use strict";
  this._programs = [];
  this._customPrograms = [];
};
H3DU.Scene3D.ProgramCache.prototype.dispose = function() {
  "use strict";
  var i, p;
  for(i = 0; i < this._customPrograms.length; i++) {
    p = this._customPrograms[i];
    p[2].dispose();
  }
  for(i = 0; i < this._programs.length; i++) {
    p = this._programs[i];
    if(p)p.dispose();
  }
  this._customPrograms = [];
  this._programs = [];
};
/** @private */
H3DU.Scene3D.ProgramCache.prototype.getCustomProgram = function(info, context) {
  "use strict";
  if(!context)throw new Error();
  if(info instanceof H3DU.ShaderProgram) {
  // NOTE: Using H3DU.ShaderProgram objects in materials is deprecated
    return info;
  }
  for(var i = 0; i < this._customPrograms.length; i++) {
    var p = this._customPrograms[i];
    if(p[0] === info && p[1] === context) {
      p[2]._update();
      return p[2];
    }
  }
  var prog = H3DU.ShaderProgram._fromShaderInfo(context, info);
  this._customPrograms.push([info, context, prog]);
  return prog;
};
/** @private
 * @param {Object} flags Description of flags.
 * @param {Object} context Description of context.
 * @returns {Object} Return value.
 */
H3DU.Scene3D.ProgramCache.prototype.getProgram = function(flags, context) {
  "use strict";
  if(!context)throw new Error();
  var pf = this._programs[flags];
  if(pf) {
    for(var i = 0; i < pf.length; i++) {
      if(pf[i][0] === context) {
        return pf[i][1];
      }
    }
  } else {
    this._programs[flags] = [];
  }
  var defines = "";
  if((flags & H3DU.Scene3D.LIGHTING_ENABLED) !== 0)
    defines += "#define SHADING\n";
  if((flags & H3DU.Scene3D.SPECULAR_ENABLED) !== 0)
    defines += "#define SPECULAR\n";
  if((flags & H3DU.Scene3D.PHYSICAL_BASED_ENABLED) !== 0)
    defines += "#define PHYSICAL_BASED\n";
  if((flags & H3DU.Scene3D.METALNESS_ENABLED) !== 0)
    defines += "#define METALNESS\n";
  if((flags & H3DU.Scene3D.METALNESS_MAP_ENABLED) !== 0)
    defines += "#define METALNESS_MAP\n";
  if((flags & H3DU.Scene3D.ROUGHNESS_ENABLED) !== 0)
    defines += "#define ROUGHNESS\n";
  if((flags & H3DU.Scene3D.ROUGHNESS_MAP_ENABLED) !== 0)
    defines += "#define ROUGHNESS_MAP\n";
  if((flags & H3DU.Scene3D.NORMAL_MAP_ENABLED) !== 0)
    defines += "#define NORMAL_MAP\n";
  if((flags & H3DU.Scene3D.TEXTURE_ENABLED) !== 0)
    defines += "#define TEXTURE\n";
  if((flags & H3DU.Scene3D.COLORATTR_ENABLED) !== 0)
    defines += "#define COLORATTR\n";
  if((flags & H3DU.Scene3D.INVERT_ROUGHNESS_ENABLED) !== 0)
    defines += "#define INVERT_ROUGHNESS\n";
  if((flags & H3DU.Scene3D.ENV_MAP_ENABLED) !== 0)
    defines += "#define ENV_MAP\n";
  if((flags & H3DU.Scene3D.ENV_EQUIRECT_ENABLED) !== 0)
    defines += "#define ENV_EQUIRECT\n";
  if((flags & H3DU.Scene3D.EMISSION_MAP_ENABLED) !== 0)
    defines += "#define EMISSION_MAP\n";
  if((flags & H3DU.Scene3D.SPECULAR_MAP_ENABLED) !== 0)
    defines += "#define SPECULAR_MAP\n#define SPECULAR\n";
  var prog = new H3DU.ShaderProgram(context,
   defines + H3DU.ShaderProgram.getDefaultVertex(),
   defines + H3DU.ShaderProgram.getDefaultFragment());
  this._programs[flags].push([context, prog]);
  return prog;
};
/** Returns the WebGL context associated with this scene.
 * @returns {WebGLRenderingContext|WebGL2RenderingContext} Return value.
 * @memberof! H3DU.Scene3D#
 */
H3DU.Scene3D.prototype.getContext = function() {
  "use strict";
  return this.context;
};
/** No face culling.
 * @memberof! H3DU.Scene3D
 * @const
 */
H3DU.Scene3D.NONE = 0;
/** Back side of a triangle. By default, triangles with clockwise winding are back-facing.
 * @memberof! H3DU.Scene3D
 * @const
 */
H3DU.Scene3D.BACK = 1;
/**
 * Front side of a triangle. By default, triangles with counterclockwise winding are front-facing.
 * @memberof! H3DU.Scene3D
 * @const
 */
H3DU.Scene3D.FRONT = 2;
/**
 * Back and front sides of a triangle.
 * @memberof! H3DU.Scene3D
 * @const
 */
H3DU.Scene3D.FRONT_AND_BACK = 3;
/**
 * Counterclockwise winding. A triangle has counterclockwise winding (or orientation) if its vertices are ordered in a counterclockwise path from the first to second to third to first vertex, in the triangle's two-dimensional projection in _window coordinates_ (which roughly correspond to its location on the screen or frame buffer).
 * @memberof! H3DU.Scene3D
 * @const
 */
H3DU.Scene3D.CCW = 0;
/**
 * Clockwise winding, the opposite of counterclockwise winding.
 * @memberof! H3DU.Scene3D
 * @const
 */
H3DU.Scene3D.CW = 1;
/**
 * Specifies which kinds of triangle faces are culled (not drawn)
 * when rendering this scene.
 * @param {Number} value If this is {@link H3DU.Scene3D.BACK},
 * {@link H3DU.Scene3D.FRONT}, or {@link H3DU.Scene3D.FRONT_AND_BACK},
 * enables face culling of the specified faces. For any other value,
 * disables face culling. By default, face culling is disabled.
 * @returns {H3DU.Scene3D} This object.
 * @memberof! H3DU.Scene3D#
 */
H3DU.Scene3D.prototype.cullFace = function(value) {
  "use strict";
  if(value === H3DU.Scene3D.BACK ||
   value === H3DU.Scene3D.FRONT ||
   value === H3DU.Scene3D.FRONT_AND_BACK) {
    this._cullFace = value;
  } else {
    this._cullFace = 0;
  }
  return this;
};
/** @private */
H3DU.Scene3D.prototype._setFace = function() {
  "use strict";
  if(!this._is3d)return;
  if(this._cullFace === H3DU.Scene3D.BACK) {
    this.context.enable(this.context.CULL_FACE);
    this.context.cullFace(this.context.BACK);
  } else if(this._cullFace === H3DU.Scene3D.FRONT) {
    this.context.enable(this.context.CULL_FACE);
    this.context.cullFace(this.context.FRONT);
  } else if(this._cullFace === H3DU.Scene3D.FRONT_AND_BACK) {
    this.context.enable(this.context.CULL_FACE);
    this.context.cullFace(this.context.FRONT_AND_BACK);
  } else {
    this.context.disable(this.context.CULL_FACE);
  }
  if(this._frontFace === H3DU.Scene3D.CW) {
    this.context.frontFace(this.context.CW);
  } else {
    this.context.frontFace(this.context.CCW);
  }
  return this;
};
/**
 * Specifies the winding of front faces.
 * @param {Number} value If this is {@link H3DU.Scene3D.CW},
 * clockwise triangles are front-facing. For any other value,
 * counterclockwise triangles are front-facing, which is the
 * default behavior. If using a left-handed coordinate system,
 * set this value to {@link H3DU.Scene3D.CW}.
 * @returns {H3DU.Scene3D} This object.
 * @memberof! H3DU.Scene3D#
 */
H3DU.Scene3D.prototype.frontFace = function(value) {
  "use strict";
  if(value === H3DU.Scene3D.CW) {
    this._frontFace = value;
  } else {
    this._frontFace = 0;
  }
  return this;
};
/**
 * Sets whether to check whether to resize the canvas
 * when the render() method is called.
 * @param {Boolean} value If true, will check whether to resize the canvas
 * when the render() method is called. Default is true.
 * @returns {H3DU.Scene3D} This object.
 * @memberof! H3DU.Scene3D#
 */
H3DU.Scene3D.prototype.setAutoResize = function(value) {
  "use strict";
  this.autoResize = !!value;
  return this;
};
/**
 * Sets whether to use the device's pixel ratio (if supported by
 * the browser) in addition to the canvas's size when setting
 * the viewport's dimensions.<p>
 * When this value changes, the H3DU.Scene3D will automatically
 * adjust the viewport.
 * @param {Boolean} value If true, use the device's pixel ratio
 * when setting the viewport's dimensions. Default is true.
 * @returns {H3DU.Scene3D} This object.
 * @memberof! H3DU.Scene3D#
 */
H3DU.Scene3D.prototype.setUseDevicePixelRatio = function(value) {
  "use strict";
  var oldvalue = !!this.useDevicePixelRatio;
  this.useDevicePixelRatio = !!value;
  this._pixelRatio = this.useDevicePixelRatio && window.devicePixelRatio ?
   window.devicePixelRatio : 1;
  if(oldvalue !== this.useDevicePixelRatio) {
    this.setDimensions(this.width, this.height);
  }
  return this;
};
 /**
  * Gets the color used when clearing the screen each frame.
  * @returns {Array<Number>} An array of four numbers, from 0 through
  * 1, specifying the red, green, blue, and alpha components of the color.
  * @memberof! H3DU.Scene3D#
  */
H3DU.Scene3D.prototype.getClearColor = function() {
  "use strict";
  return this.clearColor.slice(0, 4);
};
/**
 * Has no effect. (In previous versions, this method changed
 * the active shader program for this scene
 * and prepared this object for the new program.)
 * @deprecated Instead of this method, use the "setShader" program of individual shapes
 * to set the shader programs they use.
 * @param {H3DU.ShaderProgram|null} program No longer used.
 * @returns {H3DU.Scene3D} This object.
 * @memberof! H3DU.Scene3D#
 */
H3DU.Scene3D.prototype.useProgram = function() {
  "use strict";
  console.warn("The 'useProgram' method is obsolete.  Instead of this method, " +
   "use the 'setShader' program of individual shapes to set the shader programs they use.");
};
/**
 * Sets the viewport width and height for this scene.
 * @param {Number} width Width of the scene, in pixels.
 * Will be rounded up.
 * @param {Number} height Height of the scene, in pixels.
 * Will be rounded up.
 * @returns {Number} Return value.
 * @memberof! H3DU.Scene3D#
 */
H3DU.Scene3D.prototype.setDimensions = function(width, height) {
  "use strict";
  if(width < 0 || height < 0)throw new Error("width or height negative");
  this.width = Math.ceil(width);
  this.height = Math.ceil(height);
  this.context.canvas.width = this.width * this._pixelRatio;
  this.context.canvas.height = this.height * this._pixelRatio;
  if(this._is3d) {
    this.context.viewport(0, 0, this.width * this._pixelRatio,
   this.height * this._pixelRatio);
  }
  if(typeof this.fbo !== "undefined" && this.fbo) {
    this.fbo.dispose();
    this.fbo = this.createBuffer();
    if(this.fboQuad)this.fboQuad.setMaterial(this.fbo);
  }
};
/**
 * Gets the viewport width for this scene.
 * Note that if auto-resizing is enabled, this value may change
 * after each call to the render() method.
 * @returns {Number} Return value.
 * @memberof! H3DU.Scene3D#
 */
H3DU.Scene3D.prototype.getWidth = function() {
  "use strict";
  return this.width;
};
/**
 * Gets the viewport height for this scene.
 * Note that if auto-resizing is enabled, this value may change
 * after each call to the render() method.
 * @returns {Number} Return value.
 * @memberof! H3DU.Scene3D#
 */
H3DU.Scene3D.prototype.getHeight = function() {
  "use strict";
  return this.height;
};
/**
 * Gets the ratio of width to height for this scene (getWidth()
 * divided by getHeight()).
 * Note that if auto-resizing is enabled, this value may change
 * after each call to the render() method.
 * @returns {Number} Aspect ratio, or 1 if height is 0.
 * @memberof! H3DU.Scene3D#
 */
H3DU.Scene3D.prototype.getAspect = function() {
  "use strict";
  var ch = this.getHeight();
  if(ch <= 0)return 1;
  return this.getWidth() / ch;
};
/** @private
 * @returns {Object} Return value.
 */
H3DU.Scene3D.prototype.getClientWidth = function() {
  "use strict";
  return this.context.canvas.clientWidth;
};
/** @private
 * @returns {Object} Return value.
 */
H3DU.Scene3D.prototype.getClientHeight = function() {
  "use strict";
  return this.context.canvas.clientHeight;
};
/**
 * Gets the ratio of width to height for this scene,
 * as actually displayed on the screen.
 * @returns {Number} Aspect ratio, or 1 if height is 0.
 * @memberof! H3DU.Scene3D#
 */
H3DU.Scene3D.prototype.getClientAspect = function() {
  "use strict";
  var ch = this.getClientHeight();
  if(ch <= 0)return 1;
  return this.getClientWidth() / ch;
};
/**
 * Creates a frame buffer object associated with this scene.
 * @returns {H3DU.FrameBuffer} A buffer with the same size as this scene.
 * @memberof! H3DU.Scene3D#
 */
H3DU.Scene3D.prototype.createBuffer = function() {
  "use strict";
  return new H3DU.FrameBuffer(this.context,
   this.getWidth(), this.getHeight());
};
/**
 * Gets the current projection matrix for this scene.
 * @deprecated Use {@link H3DU.Batch3D} instead. To get the projection matrix of a Batch3D, call its getProjectionMatrix method. For compatibility, existing code that doesn't use {@link H3DU.Batch3D} can still call this method until it renders a custom H3DU.Batch3D. This compatibility behavior may be dropped in the future.
 * @returns {Array<Number>} Return value.
 * @memberof! H3DU.Scene3D#
 */
H3DU.Scene3D.prototype.getProjectionMatrix = function() {
  "use strict";
  if(this._errors)throw new Error();
  if(this._renderedOutsideScene) {
    throw new Error("A non-default scene has been rendered, so this method is disabled.");
  }
  return this._subScene._projectionMatrix.slice(0, 16);
};
/**
 * Gets the current view matrix for this scene.
 * @deprecated Use {@link H3DU.Batch3D} instead. To get the view matrix of a Batch3D, call its getViewMatrix method. For compatibility, existing code that doesn't use {@link H3DU.Batch3D} can still call this method until it renders a custom H3DU.Batch3D. This compatibility behavior may be dropped in the future.
 * @returns {Array<Number>} Return value.
 * @memberof! H3DU.Scene3D#
 */
H3DU.Scene3D.prototype.getViewMatrix = function() {
  "use strict";
  if(this._errors)throw new Error();
  if(this._renderedOutsideScene) {
    throw new Error("A non-default scene has been rendered, so this method is disabled.");
  }
  return this._viewMatrix.slice(0, 16);
};
/**
 * Sets this scene's projection matrix to a perspective projection.
 * <p>
 * For considerations when choosing the "near" and "far" parameters,
 * see {@link H3DU.Math.mat4perspective}.
 * @deprecated Instead of this method, use {@link H3DU.Batch3D#setProjectionMatrix} in conjunction with {@link H3DU.Math.mat4perspective}. For compatibility, existing code that doesn't use H3DU.Batch3D can still call this method until it renders a custom H3DU.Batch3D. This compatibility behavior may be dropped in the future.
 * @param {Number} fov Y axis field of view, in degrees. Should be less
 * than 180 degrees. (The smaller
 * this number, the bigger close objects appear to be. As a result, zooming out
 * can be implemented by raising this value, and zooming in by lowering it.)
 * @param {Number} aspect The ratio of width to height of the viewport, usually
 * the scene's aspect ratio (getAspect() or getClientAspect()).
 * @param {Number} near The distance from the camera to
 * the near clipping plane. Objects closer than this distance won't be
 * seen.
 * @param {Number} far The distance from the camera to
 * the far clipping plane. Objects beyond this distance will be too far
 * to be seen.
 * @returns {H3DU.Scene3D} This object.
 * @example
 * // Set the perspective projection. Camera has a 45-degree field of view
 * // and will see objects from 0.1 to 100 units away.
 * scene.setPerspective(45,scene.getClientAspect(),0.1,100);
 * @memberof! H3DU.Scene3D#
 */
H3DU.Scene3D.prototype.setPerspective = function(fov, aspect, near, far) {
  "use strict";
  return this.setProjectionMatrix(H3DU.Math.mat4perspective(fov,
   aspect, near, far));
};

/**
 * Sets this scene's projection matrix to an orthographic projection.
 * In this projection, the left clipping plane is parallel to the right clipping
 * plane and the top to the bottom.<p>
 * If the view rectangle's aspect ratio doesn't match the desired aspect
 * ratio, the view rectangle will be centered on the 3D scene's viewport
 * or otherwise moved and scaled so as to keep the entire view rectangle visible without stretching
 * or squishing it.
 * @deprecated Instead of this method, use {@link H3DU.Batch3D#setProjectionMatrix} in conjunction with {@link H3DU.Math.mat4orthoAspect}. For compatibility, existing code that doesn't use {@link H3DU.Batch3D} can still call this method until it renders a custom H3DU.Batch3D. This compatibility behavior may be dropped in the future.
 * @param {Number} left Leftmost coordinate of the view rectangle.
 * @param {Number} right Rightmost coordinate of the view rectangle.
 * (Note that right can be greater than left or vice versa.)
 * @param {Number} bottom Bottommost coordinate of the view rectangle.
 * @param {Number} top Topmost coordinate of the view rectangle.
 * (Note that top can be greater than bottom or vice versa.)
 * @param {Number} near Distance from the camera to the near clipping
 * plane. A positive value means the plane is in front of the viewer.
 * @param {Number} far Distance from the camera to the far clipping
 * plane. A positive value means the plane is in front of the viewer.
 * (Note that near can be greater than far or vice versa.) The absolute difference
 * between near and far should be as small as the application can accept.
 * @param {Number} [aspect] Desired aspect ratio of the viewport (ratio
 * of width to height). If null or omitted, uses this scene's aspect ratio instead.
 * @returns {H3DU.Scene3D} This object.
 * @memberof! H3DU.Scene3D#
 */
H3DU.Scene3D.prototype.setOrthoAspect = function(left, right, bottom, top, near, far, aspect) {
  "use strict";
  if(aspect === null || typeof aspect === "undefined")aspect = this.getClientAspect();
  if(aspect === 0)aspect = 1;
  return this.setProjectionMatrix(H3DU.Math.mat4orthoAspect(
   left, right, bottom, top, near, far, aspect));
};
/**
 * Sets this scene's projection matrix to a 2D orthographic projection.
 * The near and far clipping planes will be set to -1 and 1, respectively.<p>
 * If the view rectangle's aspect ratio doesn't match the desired aspect
 * ratio, the view rectangle will be centered on the 3D scene's viewport
 * or otherwise moved and scaled so as to keep the entire view rectangle visible without stretching
 * or squishing it.
 * @deprecated Instead of this method, use {@link H3DU.Batch3D#setProjectionMatrix} in conjunction with {@link H3DU.Math.mat4ortho2dAspect}. For compatibility, existing code that doesn't use {@link H3DU.Batch3D} can still call this method until it renders a custom H3DU.Batch3D. This compatibility behavior may be dropped in the future.
 * @param {Number} left Leftmost coordinate of the view rectangle.
 * @param {Number} right Rightmost coordinate of the view rectangle.
 * (Note that right can be greater than left or vice versa.)
 * @param {Number} bottom Bottommost coordinate of the view rectangle.
 * @param {Number} top Topmost coordinate of the view rectangle.
 * (Note that top can be greater than bottom or vice versa.)
 * @param {Number} [aspect] Desired aspect ratio of the viewport (ratio
 * of width to height). If null or omitted, uses this scene's aspect ratio instead.
 * @returns {H3DU.Scene3D} This object.
 * @memberof! H3DU.Scene3D#
 */
H3DU.Scene3D.prototype.setOrtho2DAspect = function(left, right, bottom, top, aspect) {
  "use strict";
  return this.setOrthoAspect(left, right, bottom, top, -1, 1, aspect);
};

/**
 * Sets this scene's projection matrix to a perspective projection that defines
 * the view frustum, or the limits in the camera's view.
 * <p>
 * For considerations when choosing the "near" and "far" parameters,
 * see {@link H3DU.Math.mat4perspective}.
 * @deprecated Instead of this method, use {@link H3DU.Batch3D#setProjectionMatrix} in conjunction with {@link H3DU.Math.mat4frustum}. For compatibility, existing code that doesn't use {@link H3DU.Batch3D} can still call this method until it renders a custom H3DU.Batch3D. This compatibility behavior may be dropped in the future.
 * @param {Number} left X coordinate of the point where the left
 * clipping plane meets the near clipping plane.
 * @param {Number} right X coordinate of the point where the right
 * clipping plane meets the near clipping plane.
 * @param {Number} bottom Y coordinate of the point where the bottom
 * clipping plane meets the near clipping plane.
 * @param {Number} top Y coordinate of the point where the top
 * clipping plane meets the near clipping plane.
 * @param {Number} near The distance from the camera to
 * the near clipping plane. Objects closer than this distance won't be
 * seen.
 * @param {Number} far The distance from the camera to
 * the far clipping plane. Objects beyond this distance will be too far
 * to be seen.
 * @returns {H3DU.Scene3D} This object.
 * @memberof! H3DU.Scene3D#
 */
H3DU.Scene3D.prototype.setFrustum = function(left, right, bottom, top, near, far) {
  "use strict";
  return this.setProjectionMatrix(H3DU.Math.mat4frustum(
   left, right, top, bottom, near, far));
};
/**
 * Sets this scene's projection matrix to an orthographic projection.
 * In this projection, the left clipping plane is parallel to the right clipping
 * plane and the top to the bottom.
 * @deprecated Instead of this method, use {@link H3DU.Batch3D#setProjectionMatrix} in conjunction with {@link H3DU.Math.mat4ortho}. For compatibility, existing code that doesn't use {@link H3DU.Batch3D} can still call this method until it renders a custom H3DU.Batch3D. This compatibility behavior may be dropped in the future.
 * @param {Number} left Leftmost coordinate of the 3D view.
 * @param {Number} right Rightmost coordinate of the 3D view.
 * (Note that right can be greater than left or vice versa.)
 * @param {Number} bottom Bottommost coordinate of the 3D view.
 * @param {Number} top Topmost coordinate of the 3D view.
 * (Note that top can be greater than bottom or vice versa.)
 * @param {Number} near Distance from the camera to the near clipping
 * plane. A positive value means the plane is in front of the viewer.
 * @param {Number} far Distance from the camera to the far clipping
 * plane. A positive value means the plane is in front of the viewer.
 * (Note that near can be greater than far or vice versa.) The absolute difference
 * between near and far should be as small as the application can accept.
 * @returns {H3DU.Scene3D} This object.
 * @memberof! H3DU.Scene3D#
 */
H3DU.Scene3D.prototype.setOrtho = function(left, right, bottom, top, near, far) {
  "use strict";
  return this.setProjectionMatrix(H3DU.Math.mat4ortho(
   left, right, bottom, top, near, far));
};
/**
 * Sets this scene's projection matrix to a 2D orthographic projection.
 * The near and far clipping planes will be set to -1 and 1, respectively.
 * @deprecated Instead of this method, use {@link H3DU.Batch3D#setProjectionMatrix} in conjunction with {@link H3DU.Math.mat4ortho2d}. For compatibility, existing code that doesn't use {@link H3DU.Batch3D} can still call this method until it renders a custom H3DU.Batch3D. This compatibility behavior may be dropped in the future.
 * @param {Number} left Leftmost coordinate of the 2D view.
 * @param {Number} right Rightmost coordinate of the 2D view.
 * (Note that right can be greater than left or vice versa.)
 * @param {Number} bottom Bottommost coordinate of the 2D view.
 * @param {Number} top Topmost coordinate of the 2D view.
 * (Note that top can be greater than bottom or vice versa.)
 * @returns {H3DU.Scene3D} This object.
 * @memberof! H3DU.Scene3D#
 */
H3DU.Scene3D.prototype.setOrtho2D = function(left, right, bottom, top) {
  "use strict";
  return this.setProjectionMatrix(H3DU.Math.mat4ortho(
   left, right, bottom, top, -1, 1));
};
/** @private */
H3DU.Scene3D.prototype._setClearColor = function() {
  "use strict";
  if(this._is3d) {
    this.context.clearColor(this.clearColor[0], this.clearColor[1],
     this.clearColor[2], this.clearColor[3]);
  }
  return this;
};
/**
 * Disposes all resources used by this object.
 * @memberof! H3DU.Scene3D#
 * @returns {Object} Return value.
 */
H3DU.Scene3D.prototype.dispose = function() {
  "use strict";
  this.context = null;
  if(this._programs)
    this._programs.dispose();
  if(this._textureLoader)
    this._textureLoader.dispose();
  if(this._meshLoader)
    this._meshLoader.dispose();
  this._programs = null;
  this._textureLoader = null;
  this._meshLoader = null;
};
/**
 * Sets the color used when clearing the screen each frame.
 * This color is black by default.
 * @param {Array<Number>|number|string} r Array of three or
 * four color components; or the red color component (0-1); or a string
 * specifying an [HTML or CSS color]{@link H3DU.toGLColor}.
 * @param {Number} g Green color component (0-1).
 * May be null or omitted if a string or array is given as the "r" parameter.
 * @param {Number} b Blue color component (0-1).
 * May be null or omitted if a string or array is given as the "r" parameter.
 * @param {Number} [a] Alpha color component (0-1).
 * If the "r" parameter is given and this parameter is null or omitted,
 * this value is treated as 1.0.
 * @returns {H3DU.Scene3D} This object.
 * @memberof! H3DU.Scene3D#
 */
H3DU.Scene3D.prototype.setClearColor = function(r, g, b, a) {
  "use strict";
  this.clearColor = H3DU.toGLColor(r, g, b, a);
  return this._setClearColor();
};
/**
 * Loads a texture from an image URL.
 * @deprecated Use the H3DU.TextureLoader method loadTexture or
 * loadTexturesAll instead.
 * @param {String} name URL of the image to load.
 * @returns {Promise} A promise that is resolved when
 * the image is loaded successfully (the result will be an H3DU.Texture
 * object), and is rejected when an error occurs.
 * @memberof! H3DU.Scene3D#
 */
H3DU.Scene3D.prototype.loadTexture = function(name) {
  "use strict";
  return this._textureLoader.loadTexture(name);
};
/**
 * Loads a texture from an image URL and uploads it
 * to a texture buffer object.
 * @deprecated Use the H3DU.TextureLoader method loadAndMapTexturesAll
 * instead.
 * @param {string|H3DU.Texture} texture String giving the
 * URL of the image to load, or
 * an H3DU.Texture object whose data may or may not be loaded.
 * @returns {Promise} A promise that is resolved when
 * the image is loaded successfully and uploaded
 * to a texture buffer (the result will be an H3DU.Texture
 * object), and is rejected when an error occurs.
 * @memberof! H3DU.Scene3D#
 */
H3DU.Scene3D.prototype.loadAndMapTexture = function(texture) {
  "use strict";
  if(texture.constructor === H3DU.Texture) {
    return this._textureLoader.loadAndMapTexture(texture.name, this.context);
  } else if(typeof texture === "string") {
    return this._textureLoader.loadAndMapTexture(texture, this.context);
  }
};
/**
 * Loads one or more textures from an image URL and uploads each of them
 * to a texture buffer object.
 * @deprecated Use the H3DU.TextureLoader method loadAndMapTexturesAll
 * instead.
 * @param {Array<String>} textureFiles A list of URLs of the image to load.
 * @param {Function} [resolve] Called for each URL that is loaded successfully
 * and uploaded to a texture buffer (the argument will be an H3DU.Texture object.)
 * @param {Function} [reject] Called for each URL for which an error
 * occurs (the argument will be the data passed upon
 * rejection).
 * @returns {Promise} A promise that is resolved when
 * all the URLs in the textureFiles array are either resolved or rejected.
 * The result will be an object with three properties:
 * "successes", "failures", and "results".
 * See {@link H3DU.getPromiseResults}.
 * @memberof! H3DU.Scene3D#
 */
H3DU.Scene3D.prototype.loadAndMapTextures = function(textureFiles, resolve, reject) {
  "use strict";
  var promises = [];

  for(var i = 0; i < textureFiles.length; i++) {
    var objf = textureFiles[i];
    promises.push(this.loadAndMapTexture(objf));
  }
  return H3DU.getPromiseResults(promises, resolve, reject);
};
/**
 * Clears the color, depth, and stencil buffers used in this scene,
 * if any.
 * @returns {H3DU.Scene3D} This object.
 * @memberof! H3DU.Scene3D#
 */
H3DU.Scene3D.prototype.clear = function() {
  "use strict";
  if(this._is3d) {
    this.context.clear(
     this.context.COLOR_BUFFER_BIT |
     this.context.DEPTH_BUFFER_BIT |
     this.context.STENCIL_BUFFER_BIT);
  }
  return this;
};
/**
 * Clears the depth buffer used in this scene, if any.
 * @returns {H3DU.Scene3D} This object.
 * @memberof! H3DU.Scene3D#
 */
H3DU.Scene3D.prototype.clearDepth = function() {
  "use strict";
  if(this._is3d) {
    this.context.clear(this.context.DEPTH_BUFFER_BIT);
  }
  return this;
};
/**
 * Gets the number of vertices composed by
 * all shapes in this scene.
 * @deprecated Use the vertexCount method of {@link H3DU.Batch3D} objects instead. For compatibility, existing code that doesn't use {@link H3DU.Batch3D} can still call this method until it renders a custom H3DU.Batch3D. This compatibility behavior may be dropped in the future.
 * @returns {Number} Return value.
 * @memberof! H3DU.Scene3D#
 */
H3DU.Scene3D.prototype.vertexCount = function() {
  "use strict";
  if(this._errors)throw new Error();
  if(this._renderedOutsideScene) {
    throw new Error("A non-default scene has been rendered, so this method is disabled.");
  }
  return this._subScene.vertexCount();
};
/**
 * Gets the number of primitives (triangles, lines,
 * and points) composed by all shapes in this scene.
 * @deprecated Use the <code>primitiveCount</code> method of {@link H3DU.Batch3D} objects instead. For compatibility, existing code that doesn't use {@link H3DU.Batch3D} can still call this method until it renders a custom H3DU.Batch3D. This compatibility behavior may be dropped in the future.
 * @returns {Number} Return value.
 * @memberof! H3DU.Scene3D#
 */
H3DU.Scene3D.prototype.primitiveCount = function() {
  "use strict";
  if(this._errors)throw new Error();
  if(this._renderedOutsideScene) {
    throw new Error("A non-default scene has been rendered, so this method is disabled.");
  }
  return this._subScene.primitiveCount();
};
/**
 * Sets the projection matrix for this object. The projection
 * matrix can also be set using the {@link H3DU.Scene3D#setFrustum}, {@link H3DU.Scene3D#setOrtho},
 * {@link H3DU.Scene3D#setOrtho2D}, and {@link H3DU.Scene3D#setPerspective} methods.
 * @deprecated Instead of this method, use {@link H3DU.Batch3D#setProjectionMatrix}. For compatibility, existing code that doesn't use {@link H3DU.Batch3D} can still call this method until it renders a custom H3DU.Batch3D. This compatibility behavior may be dropped in the future.
 * @param {Array<Number>} matrix A 16-element matrix (4x4).
 * @returns {H3DU.Scene3D} This object.
 * @memberof! H3DU.Scene3D#
 */
H3DU.Scene3D.prototype.setProjectionMatrix = function(matrix) {
  "use strict";
  if(this._errors)throw new Error();
  if(this._renderedOutsideScene) {
    throw new Error("A non-default scene has been rendered, so this method is disabled.");
  }
  this._subScene.setProjectionMatrix(matrix);
  return this;
};
/**
 * Sets this scene's view matrix. The view matrix can also
 * be set using the {@link H3DU.Scene3D#setLookAt} method.
 * @deprecated Instead of this method, use {@link H3DU.Batch3D#setViewMatrix} in conjunction with {@link H3DU.Math.mat4ortho2dAspect}. For compatibility, existing code that doesn't use {@link H3DU.Batch3D} can still call this method until it renders a custom H3DU.Batch3D. This compatibility behavior may be dropped in the future.
 * @param {Array<Number>} matrix A 16-element matrix (4x4).
 * @returns {H3DU.Scene3D} This object.
 * @memberof! H3DU.Scene3D#
 */
H3DU.Scene3D.prototype.setViewMatrix = function(matrix) {
  "use strict";
  if(this._errors)throw new Error();
  if(this._renderedOutsideScene) {
    throw new Error("A non-default scene has been rendered, so this method is disabled.");
  }
  this._subScene.setViewMatrix(matrix);
  return this;
};
/**
 * Sets this scene's view matrix to represent a camera view.
 * This method takes a camera's position (<code>eye</code>), and the point the camera is viewing
 * (<code>center</code>).
 * @deprecated Instead of this method, use {@link H3DU.Batch3D#setLookAt}. For compatibility, existing code that doesn't use {@link H3DU.Batch3D} can still call this method until it renders a custom H3DU.Batch3D. This compatibility behavior may be dropped in the future.
 * @param {Array<Number>} eye A 3-element vector specifying
 * the camera position in world space.
 * @param {Array<Number>} [center] A 3-element vector specifying
 * the point in world space that the camera is looking at. May be null or omitted,
 * in which case the default is the coordinates (0,0,0).
 * @param {Array<Number>} [up] A 3-element vector specifying
 * the direction from the center of the camera to its top. This parameter may
 * be null or omitted, in which case the default is the vector (0, 1, 0),
 * the vector that results when the camera is held upright. This
 * vector must not point in the same or opposite direction as
 * the camera's view direction. (For best results, rotate the vector (0, 1, 0)
 * so it points perpendicular to the camera's view direction.)
 * @returns {H3DU.Scene3D} This object.
 * @memberof! H3DU.Scene3D#
 */
H3DU.Scene3D.prototype.setLookAt = function(eye, center, up) {
  "use strict";
  return this.setViewMatrix(H3DU.Math.mat4lookat(eye, center, up));
};
/**
 * Adds a 3D shape to this scene. Its reference, not a copy,
 * will be stored in the 3D scene's list of shapes.
 * Its parent will be set to no parent.
 * @deprecated Use the addShape method of individual {@link H3DU.Batch3D} instances
 * instead. For compatibility, existing code that doesn't use {@link H3DU.Batch3D} can still call this method until it renders a custom
 * H3DU.Batch3D. This compatibility behavior may be dropped in the future.
 * @param {H3DU.Shape|H3DU.ShapeGroup} shape A 3D shape.
 * @returns {H3DU.Scene3D} This object.
 * @memberof! H3DU.Scene3D#
 */
H3DU.Scene3D.prototype.addShape = function(shape) {
  "use strict";
  if(this._errors)throw new Error();
  if(this._renderedOutsideScene) {
    throw new Error("A non-default scene has been rendered, so this method is disabled.");
  }
  this._subScene.addShape(shape);
  return this;
};
/**
 * Creates a buffer from a geometric mesh and
 * returns a shape object.
 * @deprecated Use the H3DU.Shape constructor instead.
 * @param {H3DU.Mesh} mesh A geometric mesh object. The shape
 * created will use the mesh in its current state and won't
 * track future changes.
 * @returns {H3DU.Shape} The generated shape object.
 * @memberof! H3DU.Scene3D#
 */
H3DU.Scene3D.prototype.makeShape = function(mesh) {
  "use strict";
  if(this._errors)throw new Error();
  if(this._renderedOutsideScene) {
    throw new Error("A non-default scene has been rendered, so this method is disabled.");
  }
  return new H3DU.Shape(mesh);
};

/**
 * Removes all instances of a 3D shape from this scene.
 * @deprecated Use the removeShape method of individual {@link H3DU.Batch3D} instances
 * instead. For compatibility, existing code that doesn't use {@link H3DU.Batch3D} can still call this method until it renders a custom
 * H3DU.Batch3D. This compatibility behavior may be dropped in the future.
 * @param {H3DU.Shape|H3DU.ShapeGroup} shape The 3D shape to remove.
 * @returns {H3DU.Scene3D} This object.
 * @memberof! H3DU.Scene3D#
 */
H3DU.Scene3D.prototype.removeShape = function(shape) {
  "use strict";
  if(this._errors)throw new Error();
  if(this._renderedOutsideScene) {
    throw new Error("A non-default scene has been rendered, so this method is disabled.");
  }
  this._subScene.removeShape(shape);
  return this;
};
/**
 * Gets the light sources used in this scene.
 * @deprecated Use the removeShape method of individual {@link H3DU.Batch3D} instances
 * instead. For compatibility, existing code that doesn't use {@link H3DU.Batch3D} can still call this method until it renders a custom
 * H3DU.Batch3D. This compatibility behavior may be dropped in the future.
 * @returns {H3DU.Lights} The light sources used in this scene.
 * @memberof! H3DU.Scene3D#
 */
H3DU.Scene3D.prototype.getLights = function() {
  "use strict";
  if(this._errors)throw new Error();
  if(this._renderedOutsideScene) {
    throw new Error("A non-default scene has been rendered, so this method is disabled.");
  }
  return this._subScene.getLights();
};
/**
 * Sets a light source in this scene to a directional light.
 * @deprecated Use the Lights method setDirectionalLight instead and the {@link H3DU.Batch3D} method getLights. For compatibility, existing code that doesn't use {@link H3DU.Batch3D} can still call this method until it renders a custom H3DU.Batch3D. This compatibility behavior may be dropped in the future.
 * @param {Number} index Zero-based index of the light to set. The first
 * light has index 0, the second has index 1, and so on. Will be created
 * if the light doesn't exist.
 * @param {Array<Number>} position A 3-element vector giving the direction of the light, along the X, Y, and Z
 * axes, respectively. May be null, in which case the default
 * is (0, 0, 1).
 * @param {Array<Number>} [diffuse] A [color vector or string]{@link H3DU.toGLColor} giving the diffuse color of the light.
 * If null or omitted, the default is (1, 1, 1, 1) for light index 0 and (0, 0, 0, 0) otherwise.
 * @param {Array<Number>} [specular] A [color vector or string]{@link H3DU.toGLColor} giving the color of specular highlights caused by
 * the light.
 * If null or omitted, the default is (1, 1, 1) for light index 0 and (0, 0, 0) otherwise.
 * @returns {H3DU.Scene3D} This object.
 * @memberof! H3DU.Scene3D#
 */
H3DU.Scene3D.prototype.setDirectionalLight = function(index, position, diffuse, specular) {
  "use strict";
  if(this._errors)throw new Error();
  if(this._renderedOutsideScene) {
    throw new Error("A non-default scene has been rendered, so this method is disabled.");
  }
  this.getLights().setDirectionalLight(index, position, diffuse, specular);
  return this;
};
/**
 * Sets parameters for a light in this scene.
 * @deprecated Use the Lights method setParams instead and the {@link H3DU.Batch3D} method getLights. For compatibility, existing code that doesn't use {@link H3DU.Batch3D} can still call this method until it renders a custom H3DU.Batch3D. This compatibility behavior may be dropped in the future.
 * @param {Number} index Zero-based index of the light to set. The first
 * light has index 0, the second has index 1, and so on. Will be created
 * if the light doesn't exist.
 * @param {Object} params An object as described in {@link H3DU.LightSource.setParams}.
 * @returns {H3DU.Scene3D} This object.
 * @memberof! H3DU.Scene3D#
 */
H3DU.Scene3D.prototype.setLightParams = function(index, params) {
  "use strict";
  if(this._errors)throw new Error();
  if(this._renderedOutsideScene) {
    throw new Error("A non-default scene has been rendered, so this method is disabled.");
  }
  this.getLights().setParams(index, params);
  return this;
};

/**
 * Sets the color of the scene's ambient light.
 * @deprecated Use the Lights method setAmbient instead and the {@link H3DU.Batch3D} method getLights. For compatibility, existing code that doesn't use {@link H3DU.Batch3D} can still call this method until it renders a custom H3DU.Batch3D. This compatibility behavior may be dropped in the future.
 * @param {Array<Number>|number|string} r Array of three or
 * four color components; or the red color component (0-1); or a string
 * specifying an [HTML or CSS color]{@link H3DU.toGLColor}.
 * @param {Number} g Green color component (0-1).
 * May be null or omitted if a string or array is given as the "r" parameter.
 * @param {Number} b Blue color component (0-1).
 * May be null or omitted if a string or array is given as the "r" parameter.
 * @param {Number} [a] Alpha color component (0-1).
 * Currently not used.
 * @returns {H3DU.Scene3D} This object.
 * @memberof! H3DU.Scene3D#
 */
H3DU.Scene3D.prototype.setAmbient = function(r, g, b, a) {
  "use strict";
  if(this._errors)throw new Error();
  if(this._renderedOutsideScene) {
    throw new Error("A non-default scene has been rendered, so this method is disabled.");
  }
  this.getLights().setAmbient(r, g, b, a);
  return this;
};

/**
 * Sets a light source in this scene to a point light.
 * @deprecated Use the LightSource method setPointLight instead and the {@link H3DU.Batch3D} method getLights. For compatibility, existing code that doesn't use {@link H3DU.Batch3D} can still call this method until it renders a custom H3DU.Batch3D. This compatibility behavior may be dropped in the future.
 * @param {Number} index Zero-based index of the light to set. The first
 * light has index 0, the second has index 1, and so on.
 * @param {Array<Number>} position Light position. (See {@link H3DU.LightSource#position}.)
 * @param {Array<Number>} [diffuse] A [color vector or string]{@link H3DU.toGLColor} giving the diffuse color of the light.
 * If null or omitted, the default is (1, 1, 1, 1) for light index 0 and (0, 0, 0, 0) otherwise.
 * @param {Array<Number>} [specular] A [color vector or string]{@link H3DU.toGLColor} giving the color of specular highlights caused by
 * the light.
 * If null or omitted, the default is (1, 1, 1) for light index 0 and (0, 0, 0) otherwise.
 * @returns {H3DU.Scene3D} This object.
 * @memberof! H3DU.Scene3D#
 */
H3DU.Scene3D.prototype.setPointLight = function(index, position, diffuse, specular) {
  "use strict";
  if(this._errors)throw new Error();
  if(this._renderedOutsideScene) {
    throw new Error("A non-default scene has been rendered, so this method is disabled.");
  }
  this.getLights().setPointLight(index, position, diffuse, specular);
  return this;
};
/** @private */
H3DU.Scene3D.prototype._clearForPass = function(pass) {
  "use strict";
  var flags = 0;
  if(pass.clearColor)flags |= this.context.COLOR_BUFFER_BIT;
  if(pass.clearDepth)flags |= this.context.DEPTH_BUFFER_BIT;
  if(pass.clearStencil)flags |= this.context.STENCIL_BUFFER_BIT;
  if(this._is3d && flags !== 0) {
    this.context.clear(flags);
  }
};

/**
 * Renders all shapes added to this scene.
 * This is usually called in a render loop, such
 * as {@link H3DU.renderLoop}.<p>
 * NOTE: For compatibility, the "render" function with a null or omitted parameter will clear the color
 * buffer and depth buffer. This compatibility option may be dropped in the future.
 * @param {Array<H3DU.RenderPass3D>|H3DU.Batch3D} renderPasses An array of scenes
 * to draw, or a single batch to render. Can be null.
 * @returns {H3DU.Scene3D} This object.
 * @memberof! H3DU.Scene3D#
 */
H3DU.Scene3D.prototype.render = function(renderPasses) {
  "use strict";
  if(renderPasses instanceof H3DU.Batch3D) {
    return this.render([new H3DU.RenderPass3D(renderPasses)]);
  }
  if(this.autoResize) {
    var c = this.context.canvas;
    if(c.height !== Math.ceil(c.clientHeight) * this._pixelRatio ||
       c.width !== Math.ceil(c.clientWidth) * this._pixelRatio) {
    // Resize the canvas if needed
      this.setDimensions(c.clientWidth, c.clientHeight);
    }
  }
  this._setFace();
  var width = this.getClientWidth();
  var height = this.getClientHeight();
  if(renderPasses === null || typeof renderPasses === "undefined") {
    if(this._is3d) {
      this.context.clear(this.context.COLOR_BUFFER_BIT |
        this.context.DEPTH_BUFFER_BIT);
    }
    this._subScene.resize(width, height);
    this._subScene.render(this);
  } else {
    this._renderedOutsideScene = true;
    for(var i = 0; i < renderPasses.length; i++) {
      var pass = renderPasses[i];
      this._textureLoader.bindFrameBuffer(
          pass.frameBuffer, this.context);
      this._clearForPass(pass);
      renderPasses[i].subScene.resize(width, height);
      renderPasses[i].subScene.render(this, pass);
      this._textureLoader.unbindFrameBuffer(
          pass.frameBuffer, this.context);
    }
  }
  return this;
};

/**
 * Uses a shader program to apply a texture filter after the
 * scene is rendered.
 * @deprecated Use the {@link H3DU.Batch3D.forFilter} method to create a batch
 * for rendering filter effects from a frame buffer, or use the {@link H3DU.Batch3D.useShader}
 * method. For compatibility, existing code that doesn't use {@link H3DU.Batch3D} can still call this method
 * until it renders a custom H3DU.Batch3D. This compatibility behavior may be dropped in the future.
 * @param {H3DU.ShaderProgram|string|null} filterProgram The shader program to use.
 * @returns {H3DU.Scene3D} This object.
 * @memberof! H3DU.Scene3D#
 */
H3DU.Scene3D.prototype.useFilter = function(filterProgram) {
  "use strict";
  if(this._renderedOutsideScene) {
    throw new Error("A non-default scene has been rendered, so this method is disabled.");
  }
  console.warn("The useFilter method is deprecated. Use the {@link H3DU.Batch3D.forFilter} method to " +
    "create a batch for rendering filter effects from a frame buffer.");
  if(filterProgram instanceof H3DU.ShaderProgram) {
    this._subScene._useShader(filterProgram.shaderInfo);
  } else {
    this._subScene._useShader(filterProgram);
  }
  return this;
};

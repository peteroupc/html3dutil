/**
 * A holder object representing a 3D scene.</li>
 *</ul>
 * When a Scene3D object is created, it sets the projection and view matrices to identity.
*  @class
* @alias glutil.Scene3D
 * @param {WebGLRenderingContext|object} canvasOrContext
 * A WebGL 3D context to associate with this scene, or an HTML
 * canvas element to create a WebGL context from, or an object, such as Scene3D, that
* implements a no-argument <code>getContext</code> method
* that returns a WebGL context.
 */
function Scene3D(canvasOrContext){
 var context=canvasOrContext;
 if(typeof canvasOrContext.getContext==="function"){
  // This might be a canvas, so create a WebGL context.
  if(HTMLCanvasElement && context.constructor===HTMLCanvasElement){
   context=GLUtil.get3DContext(canvasOrContext);
  } else {
   context=GLUtil._toContext(context);
  }
 }
 this.context=context;
 this.textureCache={};
 this._textureLoader=new TextureLoader();
 this._renderedOutsideScene=false;
 /** An array of shapes that are part of the scene.
   @deprecated Shapes should now be managed in Subscene3D objects,
   rather than through this class.
   */
 this.shapes=[];
 this._frontFace=Scene3D.CCW;
 this._cullFace=Scene3D.NONE;
 this.clearColor=[0,0,0,1];
 this.fboFilter=null;
 this._subScene=new Subscene3D(this);
 this._programs=new Scene3D.ProgramCache(context);
 this.useDevicePixelRatio=false;
 this._pixelRatio=1;
 this.autoResize=true;
 this.width=Math.ceil(this.context.canvas.clientWidth*1.0);
 this.height=Math.ceil(this.context.canvas.clientHeight*1.0);
 this.context.canvas.width=this.width;
 this.context.canvas.height=this.height;
 this._is3d=GLUtil.is3DContext(this.context);
 this._init3DContext();
}
/** @private */
Scene3D.prototype._init3DContext=function(){
 if(!this._is3d)return;
 var params={};
 var flags=Scene3D.LIGHTING_ENABLED |
  Scene3D.SPECULAR_ENABLED |
  Scene3D.SPECULAR_MAP_ENABLED;
 this._programs.getProgram(flags);
 this.context.viewport(0,0,this.width,this.height);
 this.context.enable(this.context.BLEND);
 this.context.blendFunc(this.context.SRC_ALPHA,this.context.ONE_MINUS_SRC_ALPHA);
 this.context.enable(this.context.DEPTH_TEST);
 this.context.depthFunc(this.context.LEQUAL);
 this.context.disable(this.context.CULL_FACE);
 this.context.clearDepth(1.0);
 this._setClearColor();
 this._setIdentityMatrices();
};

Scene3D.LIGHTING_ENABLED = 1;
Scene3D.SPECULAR_MAP_ENABLED = 2;
Scene3D.NORMAL_ENABLED = 4;
Scene3D.SPECULAR_ENABLED = 8;

/** @private */
Scene3D._materialToFlags=function(material){
 var flags=0;
     flags|=(!material.basic) ? Scene3D.LIGHTING_ENABLED : 0;
     flags|=(material.specular[0]!=0 ||
        material.specular[1]!=0 ||
        material.specular[2]!=0) ? Scene3D.SPECULAR_ENABLED : 0;
     flags|=(!!material.specularMap) ? Scene3D.SPECULAR_MAP_ENABLED : 0;
     flags|=(!!material.normalMap) ? Scene3D.NORMAL_ENABLED : 0;
     return flags;
}

/** @private */
Scene3D.ProgramCache=function(context){
 this.context=context;
 this._programs=[];
}
/** @private */
Scene3D.ProgramCache.prototype.getProgram=function(flags){
 if(this._programs[flags]){
  return this._programs[flags];
 }
 var defines=""
 if((flags&Scene3D.LIGHTING_ENABLED)!=0)
   defines+="#define SHADING\n";
 if((flags&Scene3D.SPECULAR_ENABLED)!=0)
   defines+="#define SPECULAR\n";
 if((flags&Scene3D.NORMAL_ENABLED)!=0)
   defines+="#define NORMAL_MAP\n";
 if((flags&Scene3D.SPECULAR_MAP_ENABLED)!=0)
   defines+="#define SPECULAR_MAP\n#define SPECULAR\n";
 var prog=new ShaderProgram(this.context,
   defines+ShaderProgram.getDefaultVertex(),
   defines+ShaderProgram.getDefaultFragment());
 this._programs[flags]=prog;
 return prog;
}
/** Returns the WebGL context associated with this scene. */
Scene3D.prototype.getContext=function(){
 return this.context;
};
/** No face culling.
@const  */
Scene3D.NONE = 0;
/** Back side of a triangle.  By default, triangles with clockwise winding are back-facing.
@const */
Scene3D.BACK = 1;
/**
Front side of a triangle.  By default, triangles with counterclockwise winding are front-facing.
@const
*/
Scene3D.FRONT = 2;
/**
Back and front sides of a triangle.
@const
*/
Scene3D.FRONT_AND_BACK = 3;
/**
* Counterclockwise winding. A triangle has counterclockwise winding if
* its vertices are ordered such that the path from the first to second to third
* to first vertex, in window coordinates (X and Y only), runs counterclockwise.
* @const
*/
Scene3D.CCW = 0;
/**
* Clockwise winding, the opposite of counterclockwise winding.
* @const
*/
Scene3D.CW = 1;
/**
* Specifies which kinds of triangle faces are culled (not drawn)
* when rendering this scene.
* @param {number} value If this is {@link Scene3D.BACK},
* {@link Scene3D.FRONT}, or {@link Scene3D.FRONT_AND_BACK},
* enables face culling of the specified faces.  For any other value,
* disables face culling.  By default, face culling is disabled.
* @return {glutil.Scene3D} This object.
*/
Scene3D.prototype.cullFace=function(value){
 if(value===Scene3D.BACK ||
   value===Scene3D.FRONT ||
   value===Scene3D.FRONT_AND_BACK){
  this._cullFace=value;
 } else {
  this._cullFace=0;
 }
 return this;
};
/** @private */
Scene3D.prototype._setFace=function(){
 if(!this._is3d)return;
 if(this._cullFace===Scene3D.BACK){
  this.context.enable(this.context.CULL_FACE);
  this.context.cullFace(this.context.BACK);
 } else if(this._cullFace===Scene3D.FRONT){
  this.context.enable(this.context.CULL_FACE);
  this.context.cullFace(this.context.FRONT);
 } else if(this._cullFace===Scene3D.FRONT_AND_BACK){
  this.context.enable(this.context.CULL_FACE);
  this.context.cullFace(this.context.FRONT_AND_BACK);
 } else {
  this.context.disable(this.context.CULL_FACE);
 }
 if(this._frontFace===Scene3D.CW){
  this.context.frontFace(this.context.CW);
 } else {
  this.context.frontFace(this.context.CCW);
 }
 return this;
};
/**
* Specifies the winding of front faces.
* @param {number} value If this is {@link Scene3D.CW},
* clockwise triangles are front-facing.  For any other value,
* counterclockwise triangles are front-facing, which is the
* default behavior.  If using a left-handed coordinate system,
* set this value to {@link Scene3D.CW}.
* @return {glutil.Scene3D} This object.
*/
Scene3D.prototype.frontFace=function(value){
 if(value===Scene3D.CW){
  this._frontFace=value;
 } else {
  this._frontFace=0;
 }
 return this;
};
/**
* Sets whether to check whether to resize the canvas
* when the render() method is called.
* @param {boolean} value If true, will check whether to resize the canvas
* when the render() method is called. Default is true.
* @return {glutil.Scene3D} This object.
*/
Scene3D.prototype.setAutoResize=function(value){
 this.autoResize=!!value;
 return this;
};
/**
* Sets whether to use the device's pixel ratio (if supported by
* the browser) in addition to the canvas's size when setting
* the viewport's dimensions.<p>
* When this value changes, the Scene3D will automatically
* adjust the viewport.
* @param {boolean} value If true, use the device's pixel ratio
* when setting the viewport's dimensions.  Default is true.
* @return {glutil.Scene3D} This object.
  */
Scene3D.prototype.setUseDevicePixelRatio=function(value){
 var oldvalue=!!this.useDevicePixelRatio;
 this.useDevicePixelRatio=!!value;
 this._pixelRatio=(this.useDevicePixelRatio && window.devicePixelRatio) ?
   window.devicePixelRatio : 1;
 if(oldvalue!==this.useDevicePixelRatio){
  this.setDimensions(this.width,this.height);
 }
 return this;
};
 /**
  Gets the color used when clearing the screen each frame.
   @return {Array<number>} An array of four numbers, from 0 through
   1, specifying the red, green, blue, and alpha components of the color.
   */
Scene3D.prototype.getClearColor=function(){
 return this.clearColor.slice(0,4);
};
/**
* Has no effect. (In previous versions, this method changed
* the active shader program for this scene
* and prepared this object for the new program.)
* @deprecated Instead of this method, use the "setShader" program of individual shapes
* to set the shader programs they use.
* @param {glutil.ShaderProgram} program The shader program to use.
* @return {glutil.Scene3D} This object.
*/
Scene3D.prototype.useProgram=function(program){
 console.warn("The 'useProgram' method is obsolete.  Instead of this method, "+
   "use the 'setShader' program of individual shapes to set the shader programs they use.");
}
/**
* Sets the viewport width and height for this scene.
* @param {number} width Width of the scene, in pixels.
*  Will be rounded up.
* @param {number} height Height of the scene, in pixels.
*  Will be rounded up.
* @return {number} Return value.*/
Scene3D.prototype.setDimensions=function(width, height){
 if(width<0 || height<0)throw new Error("width or height negative");
 this.width=Math.ceil(width);
 this.height=Math.ceil(height);
 this.context.canvas.width=this.width*this._pixelRatio;
 this.context.canvas.height=this.height*this._pixelRatio;
 if(this._is3d){
  this.context.viewport(0,0,this.width*this._pixelRatio,
   this.height*this._pixelRatio);
 }
 if(typeof this.fbo!=="undefined" && this.fbo){
   this.fbo.dispose();
   this.fbo=this.createBuffer();
   if(this.fboQuad)this.fboQuad.setMaterial(this.fbo);
  }
};
/**
* Gets the viewport width for this scene.
* Note that if auto-resizing is enabled, this value may change
* after each call to the render() method.
* @return {number} Return value.*/
Scene3D.prototype.getWidth=function(){
 return this.width;
};
/**
* Gets the viewport height for this scene.
* Note that if auto-resizing is enabled, this value may change
* after each call to the render() method.
* @return {number} Return value.*/
Scene3D.prototype.getHeight=function(){
 return this.height;
};
/**
* Gets the ratio of width to height for this scene (getWidth()
* divided by getHeight()).
* Note that if auto-resizing is enabled, this value may change
* after each call to the render() method.
* @return {number} Return value.*/
Scene3D.prototype.getAspect=function(){
 return this.getWidth()/this.getHeight();
};
/**
* Gets the ratio of width to height for this scene,
* as actually displayed on the screen.
* @return {number} Return value.*/
Scene3D.prototype.getClientAspect=function(){
 var ch=this.context.canvas.clientHeight;
 if(ch<=0)return 1;
 return this.context.canvas.clientWidth/ch;
};
/**
 * Creates a frame buffer object associated with this scene.
 * @return {FrameBuffer} A buffer with the same size as this scene.
 */
Scene3D.prototype.createBuffer=function(){
 return new FrameBuffer(this.context,
   this.getWidth(),this.getHeight());
};
/**
 * Gets the current projection matrix for this scene.
* @deprecated TODO: Document the replacement for this method.  For compatibility, existing code that doesn't use Subscene3D can still call this method until it renders a custom Subscene3D.  This compatibility behavior may be dropped in the future.
 * @return {Array<number>} Return value. */
Scene3D.prototype.getProjectionMatrix=function(){
if(this._renderedOutsideScene){
 throw new Error("A non-default scene has been rendered, so this method is disabled.");
}
return this.Subscene3D._projectionMatrix.slice(0,16);
};
/**
 * Gets the current view matrix for this scene.
* @deprecated TODO: Document the replacement for this method.  For compatibility, existing code that doesn't use Subscene3D can still call this method until it renders a custom Subscene3D.  This compatibility behavior may be dropped in the future.
 * @return {Array<number>} Return value. */
Scene3D.prototype.getViewMatrix=function(){
if(this._renderedOutsideScene){
 throw new Error("A non-default scene has been rendered, so this method is disabled.");
}
 return this._viewMatrix.slice(0,16);
};
/**
*  Sets this scene's projection matrix to a perspective projection.
 * <p>
 * For considerations when choosing the "near" and "far" parameters,
 * see {@link glmath.GLMath.mat4perspective}.
* @deprecated TODO: Document the replacement for this method.  For compatibility, existing code that doesn't use Subscene3D can still call this method until it renders a custom Subscene3D.  This compatibility behavior may be dropped in the future.
 * @param {number}  fov Y-axis field of view, in degrees. Should be less
* than 180 degrees. (The smaller
* this number, the bigger close objects appear to be. As a result, zooming out
* can be implemented by raising this value, and zooming in by lowering it.)
* @param {number}  aspect The ratio of width to height of the viewport, usually
*  the scene's aspect ratio (getAspect() or getClientAspect()).
* @param {number} near The distance from the camera to
* the near clipping plane. Objects closer than this distance won't be
* seen.
* @param {number}  far The distance from the camera to
* the far clipping plane. Objects beyond this distance will be too far
* to be seen.
* @return {glutil.Scene3D} This object.
* @example
* // Set the perspective projection.  Camera has a 45-degree field of view
* // and will see objects from 0.1 to 100 units away.
* scene.setPerspective(45,scene.getClientAspect(),0.1,100);
*/
Scene3D.prototype.setPerspective=function(fov, aspect, near, far){
 return this.setProjectionMatrix(GLMath.mat4perspective(fov,
   aspect,near,far));
};

/**
 * Sets this scene's projection matrix to an orthographic projection.
 * In this projection, the left clipping plane is parallel to the right clipping
 * plane and the top to the bottom.<p>
 * If the view rectangle's aspect ratio doesn't match the desired aspect
 * ratio, the view rectangle will be centered on the 3D scene's viewport
 * or otherwise moved and scaled so as to keep the entire view rectangle visible without stretching
 * or squishing it.
* @deprecated TODO: Document the replacement for this method.  For compatibility, existing code that doesn't use Subscene3D can still call this method until it renders a custom Subscene3D.  This compatibility behavior may be dropped in the future.
 * @param {number} left Leftmost coordinate of the view rectangle.
 * @param {number} right Rightmost coordinate of the view rectangle.
 * (Note that right can be greater than left or vice versa.)
 * @param {number} bottom Bottommost coordinate of the view rectangle.
 * @param {number} top Topmost coordinate of the view rectangle.
 * (Note that top can be greater than bottom or vice versa.)
 * @param {number} near Distance from the camera to the near clipping
 * plane.  A positive value means the plane is in front of the viewer.
 * @param {number} far Distance from the camera to the far clipping
 * plane.  A positive value means the plane is in front of the viewer.
 * (Note that near can be greater than far or vice versa.)  The absolute difference
 * between near and far should be as small as the application can accept.
 * @param {number} [aspect] Desired aspect ratio of the viewport (ratio
 * of width to height).  If null or omitted, uses this scene's aspect ratio instead.
 * @return {glutil.Scene3D} This object.
 */
Scene3D.prototype.setOrthoAspect=function(left, right, bottom, top, near, far, aspect){
 if((aspect===null || typeof aspect==="undefined"))aspect=this.getClientAspect();
 if(aspect===0)aspect=1;
 return this.setProjectionMatrix(GLMath.mat4orthoAspect(
   left,right,bottom,top,near,far,aspect));
};
/**
 * Sets this scene's projection matrix to a 2D orthographic projection.
 * The near and far clipping planes will be set to -1 and 1, respectively.<p>
 * If the view rectangle's aspect ratio doesn't match the desired aspect
 * ratio, the view rectangle will be centered on the 3D scene's viewport
 * or otherwise moved and scaled so as to keep the entire view rectangle visible without stretching
 * or squishing it.
* @deprecated TODO: Document the replacement for this method.  For compatibility, existing code that doesn't use Subscene3D can still call this method until it renders a custom Subscene3D.  This compatibility behavior may be dropped in the future.
 * @param {number} left Leftmost coordinate of the view rectangle.
 * @param {number} right Rightmost coordinate of the view rectangle.
 * (Note that right can be greater than left or vice versa.)
 * @param {number} bottom Bottommost coordinate of the view rectangle.
 * @param {number} top Topmost coordinate of the view rectangle.
 * (Note that top can be greater than bottom or vice versa.)
 * @param {number} [aspect] Desired aspect ratio of the viewport (ratio
 * of width to height).  If null or omitted, uses this scene's aspect ratio instead.
 * @return {glutil.Scene3D} This object.
 */
Scene3D.prototype.setOrtho2DAspect=function(left, right, bottom, top, aspect){
 return this.setOrthoAspect(left, right, bottom, top, -1, 1, aspect);
};

/**
 * Sets this scene's projection matrix to a perspective projection that defines
 * the view frustum, or the limits in the camera's view.
 * <p>
 * For considerations when choosing the "near" and "far" parameters,
 * see {@link glmath.GLMath.mat4perspective}.
* @deprecated TODO: Document the replacement for this method.  For compatibility, existing code that doesn't use Subscene3D can still call this method until it renders a custom Subscene3D.  This compatibility behavior may be dropped in the future.
 * @param {number} left X-coordinate of the point where the left
 * clipping plane meets the near clipping plane.
 * @param {number} right X-coordinate of the point where the right
 * clipping plane meets the near clipping plane.
 * @param {number} bottom Y-coordinate of the point where the bottom
 * clipping plane meets the near clipping plane.
 * @param {number} top Y-coordinate of the point where the top
 * clipping plane meets the near clipping plane.
* @param {number} near The distance from the camera to
* the near clipping plane. Objects closer than this distance won't be
* seen.
* @param {number}  far The distance from the camera to
* the far clipping plane. Objects beyond this distance will be too far
* to be seen.
* @return {glutil.Scene3D} This object.
 */
Scene3D.prototype.setFrustum=function(left,right,bottom,top,near,far){
 return this.setProjectionMatrix(GLMath.mat4frustum(
   left, right, top, bottom, near, far));
};
/**
 * Sets this scene's projection matrix to an orthographic projection.
 * In this projection, the left clipping plane is parallel to the right clipping
 * plane and the top to the bottom.
* @deprecated TODO: Document the replacement for this method.  For compatibility, existing code that doesn't use Subscene3D can still call this method until it renders a custom Subscene3D.  This compatibility behavior may be dropped in the future.
 * @param {number} left Leftmost coordinate of the 3D view.
 * @param {number} right Rightmost coordinate of the 3D view.
 * (Note that right can be greater than left or vice versa.)
 * @param {number} bottom Bottommost coordinate of the 3D view.
 * @param {number} top Topmost coordinate of the 3D view.
 * (Note that top can be greater than bottom or vice versa.)
 * @param {number} near Distance from the camera to the near clipping
 * plane.  A positive value means the plane is in front of the viewer.
 * @param {number} far Distance from the camera to the far clipping
 * plane.  A positive value means the plane is in front of the viewer.
 * (Note that near can be greater than far or vice versa.)  The absolute difference
 * between near and far should be as small as the application can accept.
 * @return {glutil.Scene3D} This object.
 */
Scene3D.prototype.setOrtho=function(left,right,bottom,top,near,far){
 return this.setProjectionMatrix(GLMath.mat4ortho(
   left, right, bottom, top, near, far));
};
/**
 * Sets this scene's projection matrix to a 2D orthographic projection.
 * The near and far clipping planes will be set to -1 and 1, respectively.
* @deprecated TODO: Document the replacement for this method.  For compatibility, existing code that doesn't use Subscene3D can still call this method until it renders a custom Subscene3D.  This compatibility behavior may be dropped in the future.
 * @param {number} left Leftmost coordinate of the 2D view.
 * @param {number} right Rightmost coordinate of the 2D view.
 * (Note that right can be greater than left or vice versa.)
 * @param {number} bottom Bottommost coordinate of the 2D view.
 * @param {number} top Topmost coordinate of the 2D view.
 * (Note that top can be greater than bottom or vice versa.)
 * @return {glutil.Scene3D} This object.
 */
Scene3D.prototype.setOrtho2D=function(left,right,bottom,top){
 return this.setProjectionMatrix(GLMath.mat4ortho(
   left, right, bottom, top, -1, 1));
};
/** @private */
Scene3D.prototype._setClearColor=function(){
  if(this._is3d){
   this.context.clearColor(this.clearColor[0],this.clearColor[1],
     this.clearColor[2],this.clearColor[3]);
  }
  return this;
};

/**
* Sets the color used when clearing the screen each frame.
* This color is black by default.
* @param {Array<number>|number|string} r Array of three or
* four color components; or the red color component (0-1); or a string
* specifying an [HTML or CSS color]{@link glutil.GLUtil.toGLColor}.
* @param {number} g Green color component (0-1).
* May be null or omitted if a string or array is given as the "r" parameter.
* @param {number} b Blue color component (0-1).
* May be null or omitted if a string or array is given as the "r" parameter.
* @param {number} [a] Alpha color component (0-1).
* If the "r" parameter is given and this parameter is null or omitted,
* this value is treated as 1.0.
* @return {glutil.Scene3D} This object.
*/
Scene3D.prototype.setClearColor=function(r,g,b,a){
 this.clearColor=GLUtil.toGLColor(r,g,b,a);
 return this._setClearColor();
};
/**
* Loads a texture from an image URL.
* @param {string} name URL of the image to load.
* @return {Promise} A promise that is resolved when
* the image is loaded successfully (the result will be a Texture
* object), and is rejected when an error occurs.
*/
Scene3D.prototype.loadTexture=function(name){
 return this._textureLoader.loadTexture(name);
};
/**
* Loads a texture from an image URL and uploads it
* to a texture buffer object.
* @param {string|glutil.Texture} texture String giving the
* URL of the image to load, or
* a Texture object whose data may or may not be loaded.
* @return {Promise} A promise that is resolved when
* the image is loaded successfully and uploaded
* to a texture buffer (the result will be a Texture
* object), and is rejected when an error occurs.
*/
Scene3D.prototype.loadAndMapTexture=function(texture){
 var context=this.context;
 var tex=null;
 if(texture.constructor===Texture){
  return this.loadAndMapTexture(texture.name);
 } else {
   tex=this.loadTexture(texture);
 }
 var thisObject=this;
 return tex.then(function(textureInner){
    thisObject._textureLoader.mapTexture(textureInner,thisObject);
    return textureInner;
  });
};
/**
* Loads one or more textures from an image URL and uploads each of them
* to a texture buffer object.
* @param {Array<string>} textureFiles A list of URLs of the image to load.
* @param {Function} [resolve] Called for each URL that is loaded successfully
* and uploaded to a texture buffer (the argument will be a Texture object.)
* @param {Function} [reject] Called for each URL for which an error
* occurs (the argument will be the data passed upon
* rejection).
* @return {Promise} A promise that is resolved when
* all the URLs in the textureFiles array are either resolved or rejected.
* The result will be an object with three properties:
* "successes", "failures", and "results".
* See {@link glutil.GLUtil.getPromiseResults}.
*/
Scene3D.prototype.loadAndMapTextures=function(textureFiles, resolve, reject){
 var promises=[];
 var context=this.context;
 for(var i=0;i<textureFiles.length;i++){
  var objf=textureFiles[i];
  promises.push(this.loadAndMapTexture(objf));
 }
 return GLUtil.getPromiseResults(promises, resolve, reject);
};
/**
 * Not documented yet.
 * @param {*} textureFiles
 * @param {*} resolve
 * @param {*} reject
 */
Scene3D.prototype.loadAndMapTexturesAll=function(textureFiles,resolve,reject){
 var promises=[];
 var context=this.context;
 for(var i=0;i<textureFiles.length;i++){
  var objf=textureFiles[i];
  promises.push(this.loadAndMapTexture(objf));
 }
 return GLUtil.getPromiseResultsAll(promises, resolve, reject);
};

/** @private */
Scene3D.prototype._setIdentityMatrices=function(){
 this._projectionMatrix=GLMath.mat4identity();
 this._viewMatrix=GLMath.mat4identity();
 this._updateFrustum();
};
/** @private */
Scene3D.prototype._updateFrustum=function(){
 var projView=GLMath.mat4multiply(this._projectionMatrix,this._viewMatrix);
 this._frustum=GLMath.mat4toFrustumPlanes(projView);
};
/**
 * Gets the number of vertices composed by
 * all shapes in this scene.
 * @return {number} Return value. */
Scene3D.prototype.vertexCount=function(){
 var c=0;
 for(var i=0;i<this.shapes.length;i++){
  c+=this.shapes[i].vertexCount();
 }
 return c;
};
/**
 * Not documented yet.
 */
Scene3D.prototype.clear=function(){
 if(this._is3d){
    this.context.clear(
     this.context.COLOR_BUFFER_BIT |
     this.context.DEPTH_BUFFER_BIT |
     this.context.STENCIL_BUFFER_BIT);
  }
}
/**
 * Not documented yet.
 */
Scene3D.prototype.clearDepth=function(){
 if(this._is3d){
    this.context.clear(this.context.DEPTH_BUFFER_BIT);
  }
}
/**
* Gets the number of primitives (triangles, lines,
* and points) composed by all shapes in this scene.
 * @return {number} Return value. */
Scene3D.prototype.primitiveCount=function(){
 var c=0;
 for(var i=0;i<this.shapes.length;i++){
  c+=this.shapes[i].primitiveCount();
 }
 return c;
};
/**
 * Sets the projection matrix for this object.  The projection
 * matrix can also be set using the {@link glutil.Scene3D#setFrustum}, {@link glutil.Scene3D#setOrtho},
 * {@link glutil.Scene3D#setOrtho2D}, and {@link glutil.Scene3D#setPerspective} methods.
* @deprecated TODO: Document the replacement for this method.  For compatibility, existing code that doesn't use Subscene3D can still call this method until it renders a custom Subscene3D.  This compatibility behavior may be dropped in the future.
 * @param {Array<number>} matrix A 16-element matrix (4x4).
 * @return {glutil.Scene3D} This object.
 */
Scene3D.prototype.setProjectionMatrix=function(matrix){
if(this._renderedOutsideScene){
 throw new Error("A non-default scene has been rendered, so this method is disabled.");
}
this._subScene.setProjectionMatrix(matrix);
 return this;
};
/**
*  Sets this scene's view matrix. The view matrix can also
* be set using the {@link glutil.Scene3D#setLookAt} method.
* @deprecated TODO: Document the replacement for this method.  For compatibility, existing code that doesn't use Subscene3D can still call this method until it renders a custom Subscene3D.  This compatibility behavior may be dropped in the future.
 * @param {Array<number>} matrix A 16-element matrix (4x4).
 * @return {glutil.Scene3D} This object.
*/
Scene3D.prototype.setViewMatrix=function(matrix){
if(this._renderedOutsideScene){
 throw new Error("A non-default scene has been rendered, so this method is disabled.");
}
this._subScene.setViewMatrix(matrix);
 return this;
};
/**
*  Sets this scene's view matrix to represent a camera view.
* This method takes a camera's position (<code>eye</code>), and the point the camera is viewing
* (<code>center</code>).
* @deprecated TODO: Document the replacement for this method.  For compatibility, existing code that doesn't use Subscene3D can still call this method until it renders a custom Subscene3D.  This compatibility behavior may be dropped in the future.
* @param {Array<number>} eye A 3-element vector specifying
* the camera position in world space.
* @param {Array<number>} [center] A 3-element vector specifying
* the point in world space that the camera is looking at. May be null or omitted,
* in which case the default is the coordinates (0,0,0).
* @param {Array<number>} [up] A 3-element vector specifying
* the direction from the center of the camera to its top. This parameter may
* be null or omitted, in which case the default is the vector (0, 1, 0),
* the vector that results when the camera is held upright.  This
* vector must not point in the same or opposite direction as
* the camera's view direction. (For best results, rotate the vector (0, 1, 0)
* so it points perpendicular to the camera's view direction.)
* @return {glutil.Scene3D} This object.
*/
Scene3D.prototype.setLookAt=function(eye, center, up){
 return this.setViewMatrix(GLMath.mat4lookat(eye, center, up));
};
/**
* Adds a 3D shape to this scene.  Its reference, not a copy,
* will be stored in the 3D scene's list of shapes.
* Its parent will be set to no parent.
* @param {glutil.Shape|glutil.ShapeGroup} shape A 3D shape.
* @return {glutil.Scene3D} This object.
*/
Scene3D.prototype.addShape=function(shape){
  this._subScene.addShape(shape);
 return this;
};
/**
 * Creates a buffer from a geometric mesh and
 * returns a shape object.
 * @param {glutil.Mesh} mesh A geometric mesh object.  The shape
 * created will use the mesh in its current state and won't
 * track future changes.
 * @return {glutil.Shape} The generated shape object.
 */
Scene3D.prototype.makeShape=function(mesh){
 var buffer=new BufferedMesh(mesh,this.context);
 return new Shape(buffer);
};

/**
* Removes all instances of a 3D shape from this scene.
* @param {glutil.Shape|glutil.ShapeGroup} shape The 3D shape to remove.
* @return {glutil.Scene3D} This object.
*/
Scene3D.prototype.removeShape=function(shape){
  this._subScene.removeShape(shape);
 return this;
};
/** @private */
Scene3D.prototype.getLights=function(){
if(this._renderedOutsideScene){
 throw new Error("A non-default scene has been rendered, so this method is disabled.");
}
 return this._subScene.getLights();
};
/**
 * Sets a light source in this scene to a directional light.
* @deprecated Use the LightSource method setDirectionalLight instead and the Subscene3D method getLights.  For compatibility, existing code that doesn't use Subscene3D can still call this method until it renders a custom Subscene3D.  This compatibility behavior may be dropped in the future.
 * @param {number} index Zero-based index of the light to set.  The first
 * light has index 0, the second has index 1, and so on.  Will be created
 * if the light doesn't exist.
 * @param {Array<number>} position A 3-element vector giving the direction of the light, along the X, Y, and Z
 * axes, respectively.  May be null, in which case the default
 * is (0, 0, 1).
 * @param {Array<number>} [diffuse] A [color vector or string]{@link glutil.GLUtil.toGLColor} giving the diffuse color of the light.
 * If null or omitted, the default is (1, 1, 1, 1) for light index 0 and (0, 0, 0, 0) otherwise.
 * @param {Array<number>} [specular] A [color vector or string]{@link glutil.GLUtil.toGLColor}  giving the color of specular highlights caused by
 * the light.
 * If null or omitted, the default is (1, 1, 1) for light index 0 and (0, 0, 0) otherwise.
* @return {glutil.Scene3D} This object.
 */
Scene3D.prototype.setDirectionalLight=function(index,position,diffuse,specular){
if(this._renderedOutsideScene){
 throw new Error("A non-default scene has been rendered, so this method is disabled.");
}
 this.getLights().setDirectionalLight(index,position,diffuse,specular);
 return this;
};
/**
 * Sets parameters for a light in this scene.
* @deprecated Use the LightSource method setLightParams instead and the Subscene3D method getLights.  For compatibility, existing code that doesn't use Subscene3D can still call this method until it renders a custom Subscene3D.  This compatibility behavior may be dropped in the future.
 * @param {number} index Zero-based index of the light to set.  The first
 * light has index 0, the second has index 1, and so on.  Will be created
 * if the light doesn't exist.
 * @param {object} params An object as described in {@link glutil.LightSource.setParams}.
* @return {glutil.Scene3D} This object.
 */
Scene3D.prototype.setLightParams=function(index,params){
if(this._renderedOutsideScene){
 throw new Error("A non-default scene has been rendered, so this method is disabled.");
}
 this.getLights().setParams(index,params);
 return this;
};

/**
 * Sets the color of the scene's ambient light.
* @deprecated Use the LightSource method setAmbient instead and the Subscene3D method getLights.  For compatibility, existing code that doesn't use Subscene3D can still call this method until it renders a custom Subscene3D.  This compatibility behavior may be dropped in the future.
* @param {Array<number>|number|string} r Array of three or
* four color components; or the red color component (0-1); or a string
* specifying an [HTML or CSS color]{@link glutil.GLUtil.toGLColor}.
* @param {number} g Green color component (0-1).
* May be null or omitted if a string or array is given as the "r" parameter.
* @param {number} b Blue color component (0-1).
* May be null or omitted if a string or array is given as the "r" parameter.
* @param {number} [a] Alpha color component (0-1).
* Currently not used.
* @return {glutil.Scene3D} This object.
 */
Scene3D.prototype.setAmbient=function(r,g,b,a){
if(this._renderedOutsideScene){
 throw new Error("A non-default scene has been rendered, so this method is disabled.");
}
 this.getLights().setAmbient(r,g,b,a);
 return this;
};

/**
 * Sets a light source in this scene to a point light.
 * @deprecated Use the LightSource method setPointLight instead and the Subscene3D method getLights.  For compatibility, existing code that doesn't use Subscene3D can still call this method until it renders a custom Subscene3D.  This compatibility behavior may be dropped in the future.
 * @param {number} index Zero-based index of the light to set.  The first
 * light has index 0, the second has index 1, and so on.
 * @param {Array<number>} position
 * @param {Array<number>} [diffuse] A [color vector or string]{@link glutil.GLUtil.toGLColor}  giving the diffuse color of the light.
 * If null or omitted, the default is (1, 1, 1, 1) for light index 0 and (0, 0, 0, 0) otherwise.
 * @param {Array<number>} [specular] A [color vector or string]{@link glutil.GLUtil.toGLColor}  giving the color of specular highlights caused by
 * the light.
 * If null or omitted, the default is (1, 1, 1) for light index 0 and (0, 0, 0) otherwise.
* @return {glutil.Scene3D} This object.
 */
Scene3D.prototype.setPointLight=function(index,position,diffuse,specular){
if(this._renderedOutsideScene){
 throw new Error("A non-default scene has been rendered, so this method is disabled.");
}
 this.getLights().setPointLight(index,position,diffuse,specular);
 return this;
};
/** @private */
Scene3D.prototype._clearForPass=function(pass){
 var flags=0;
 if(pass.clearColor)flags|=this.context.COLOR_BUFFER_BIT;
 if(pass.clearDepth)flags|=this.context.DEPTH_BUFFER_BIT;
 if(pass.clearStencil)flags|=this.context.STENCIL_BUFFER_BIT;
 if(this._is3d && flags!=0){
  this.context.clear(flags);
 }
}

/**
 *  Renders all shapes added to this scene.
 *  This is usually called in a render loop, such
 *  as {@link glutil.GLUtil.renderLoop}.<p>
 * NOTE: For compatibility, the "render" function with a null or omitted parameter will clear the color
 * buffer and depth buffer. This compatibility option may be dropped in the future.
 * @param {Array<glutil.RenderPass3D>|glutil.Subscene3D} An array of scenes
 * to draw, or a single subscene to render. Can be null.
 * @return {glutil.Scene3D} This object.
 */
Scene3D.prototype.render=function(renderPasses){
  if(renderPasses instanceof Subscene3D){
    return this.render([new RenderPass3D(renderPasses)])
  }
  if(this.autoResize){
   var c=this.context.canvas;
   if(c.height!==Math.ceil(c.clientHeight)*this._pixelRatio ||
       c.width!==Math.ceil(c.clientWidth)*this._pixelRatio){
    // Resize the canvas if needed
    this.setDimensions(c.clientWidth,c.clientHeight);
   }
  }
  this._setFace();
  if(renderPasses==null){
    if(this._is3d){
      this.context.clear(this.context.COLOR_BUFFER_BIT |
        this.context.DEPTH_BUFFER_BIT);
    }
    this._subScene.render();
  } else {
    this._renderedOutsideScene=true;
    for(var i=0;i<renderPasses.length;i++){
      var pass=renderPasses[i];
      if(pass.frameBuffer)pass.frameBuffer.bind();
      this._clearForPass(pass);
      renderPasses[i].subScene.render();
      if(pass.frameBuffer)pass.frameBuffer.unbind();
    }
  }
  if(this._is3d)this.context.flush();
  return this;
};

/**
 * Has no effect. (Previously, used a shader program to apply a texture filter after the
 * scene is rendered.)
 * @deprecated Use the {@link Subscene3D.forFilter} method to create a subscene
 * for rendering filter effects from a frame buffer.
 * @param {ShaderProgram|string|null} filterProgram Not used.
 * @return {glutil.Scene3D} This object.
 */
Scene3D.prototype.useFilter=function(filterProgram){
  console.warn("Has no effect.");
  return this;
};

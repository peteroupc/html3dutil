/**
* A collection of light sources.  It stores the scene's
* ambient color as well as data on one or more light sources.
* When constructed, the default lighting will have a default
* ambient color and one directional light source.
* @class
* @alias glutil.Lights
*/
function Lights(){
 this.lights=[new LightSource()];
 /**
 *  Ambient color for the scene.  This is the color of the light
 *  that shines on every part of every object equally and in
 *  every direction. In the absence of
 *  other lighting effects, all objects will be given this color.<p>
 *  <small>Ambient light is a simplified simulation of the
 * real-world effect of light bouncing back and forth between
 * many different objects in an area.  One example of this
 * phenomenon is sunlight reaching an indoor room without
 * directly hitting it, such that the sunlight bounces off the walls
 * and so illuminates most of the room pretty much uniformly.
 * Ambient lights simulate this phenomenon.</small>
 *  @default
 */
 this.sceneAmbient=[0.2,0.2,0.2];
}
/** Maximum number of lights supported
   by the default shader program.
   @const
   */
Lights.MAX_LIGHTS = 3;
/** @private */
Lights._createNewLight=function(index){
 var ret=new LightSource();
 if(index!==0){
  ret.diffuse=[0,0,0,0];
  ret.specular=[0,0,0];
 }
 return ret;
};
/**
 * Gets the number of lights defined in this object.
 * @return {number} Return value. */
Lights.prototype.getCount=function(){
 return this.lights.length;
};

/**
 * Gets information about the light source at the given index.
 * @param {number} index Zero-based index of the light to set.  The first
 * light has index 0, the second has index 1, and so on.
 * If the light doesn't exist at that index, it will be created.
 * @return {LightSource} The corresponding light source object.
 */
Lights.prototype.getLight=function(index){
 var oldLength=this.lights.length;
 if(!this.lights[index])this.lights[index]=Lights._createNewLight(index);
 if(this.lights.length-oldLength>=2){
  // Ensure existence of lights that come between the new
  // light and the last light
  for(var i=oldLength;i<this.lights.length;i++){
   if(!this.lights[i]){
    this.lights[i]=Lights._createNewLight(i);
   }
  }
 }
 return this.lights[index];
};
/**
 * Sets parameters for the light source at the given index.
 * @param {number} index Zero-based index of the light to set.  The first
 * light has index 0, the second has index 1, and so on.
 * If the light doesn't exist at that index, it will be created.
 * @param {object} params An object as described in {@link glutil.LightSource.setParams}.
 * @return {Lights} This object.
 */
Lights.prototype.setParams=function(index,params){
 this.getLight(index).setParams(params);
 return this;
};

/**
 * Sets a directional light.
 * @param {number} index Zero-based index of the light to set.  The first
 * light has index 0, the second has index 1, and so on.
 * If the light doesn't exist at that index, it will be created.
 * @param {Array<number>} direction A 3-element vector giving the direction of the light, along the X, Y, and Z
 * axes, respectively.
 * @param {Array<number>} [diffuse] A [color vector or string]{@link glutil.GLUtil.toGLColor}  giving the diffuse color of the light.
 * If null or omitted, the diffuse color will remain unchanged. The default is (1, 1, 1, 1) for light index 0 and (0, 0, 0, 0) otherwise.
 * @param {Array<number>} [specular] A [color vector or string]{@link glutil.GLUtil.toGLColor}  giving the color of specular highlights caused by
 * the light.
 * If null or omitted, the specular highlight color will
 * remain unchanged.  The default is (1, 1, 1) for light index 0 and (0, 0, 0) otherwise.
 * @return {Lights} This object.
 */
Lights.prototype.setDirectionalLight=function(index,direction,diffuse,specular){
 var ret=this.setParams(index,{"position":[direction[0],direction[1],direction[2],0]});
 if(diffuse!=null)
   ret=ret.setParams(index,{"diffuse":diffuse});
 if(specular!=null)
   ret=ret.setParams(index,{"specular":specular});
 return ret;
};
/**
 * Sets a point light.
 * @param {number} index Zero-based index of the light to set.  The first
 * light has index 0, the second has index 1, and so on.
 * If the light doesn't exist at that index, it will be created.
 * @param {Array<number>} position A 3-element vector giving the X, Y, and Z
 * coordinates, respectively, of the light, in world coordinates.
 * @param {Array<number>} [diffuse] Diffuse color, as described in {@link glutil.Lights.setDirectionalLight}.
 * @param {Array<number>} [specular] Specular color, as described in {@link glutil.Lights.setDirectionalLight}.
 * @return {Lights} This object.
 */
Lights.prototype.setPointLight=function(index,position,diffuse,specular){
 var ret=this.setParams(index,{"position":[position[0],position[1],position[2],1]});
 if(diffuse!=null)
   ret=ret.setParams(index,{"diffuse":diffuse});
 if(specular!=null)
   ret=ret.setParams(index,{"specular":specular});
 return ret;
};

/**
 * Sets the color of the scene's ambient light.
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
Lights.prototype.setAmbient=function(r,g,b,a){
 this.sceneAmbient=GLUtil.toGLColor(r,g,b,a);
 return this;
}

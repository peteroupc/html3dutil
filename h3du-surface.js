/*
 Any copyright to this file is released to the Public Domain.
 http://creativecommons.org/publicdomain/zero/1.0/
 If you like this, you should donate
 to Peter O. (original author of
 the Public Domain HTML 3D Library) at:
 http://peteroupc.github.io/
*/
/**
 * A surface evaluator object for a parametric surface.<p>
 * A parametric surface is a surface whose points are based on a
 * parametric surface function. A surface function takes two numbers
 * (U and V) and returns a point (in 1, 2, 3 or more dimensions, but
 * usually 2 or 3) that lies on the surface. For example, in 3
 * dimensions, a surface function has the following form:<p>
 * <b>F</b>(u, v) = [ x(u, v), y(u, v), z(u, v) ]<p>
 * where x(u, v) returns an X coordinate, y(u, v) a Y coordinate,
 * and z(u, v) returns a Z coordinate.<p>
 * Specialized curves should subclass this class and implement
 * the methods mentioned in the "curve" parameter below.
 * @class
 * @memberof H3DU
 * @params {Object} curve A <b>surface evaluator object</b>, which is an object that
 * must contain an <code>evaluate</code> method and may contain the <code>endPoints</code>,
 * <code>tangent</code>, <code>bitangent</code>, and/or <code>gradient</code>
 * methods, as described in the corresponding methods of this class.
 */
H3DU.Surface = function(surface) {
  "use strict";
  this.surface = (typeof surface==="undefined" ? null : (surface));
};
/**
 * TODO: Not documented yet.
 * @param {*} u
 * @param {*} v
 * @returns {*} Return value.
 * @instance
 */
H3DU.Surface.prototype.tangent=function(u,v){
	if((typeof this.surface!=="undefined" && this.surface!==null) && (typeof this.surface.tangent!=="undefined" && this.surface.tangent!==null)){
		return this.surface.tangent(u,v)
	} else {
	}
}
/**
 * TODO: Not documented yet.
 * @param {*} u
 * @param {*} v
 * @returns {*} Return value.
 * @instance
 */
H3DU.Surface.prototype.bitangent=function(u,v){
	if((typeof this.surface!=="undefined" && this.surface!==null) && (typeof this.surface.bitangent!=="undefined" && this.surface.bitangent!==null)){
		return this.surface.bitangent(u,v)
	} else {
	}
}
/**
 * TODO: Not documented yet.
 * @param {*} u
 * @param {*} v
 * @returns {*} Return value.
 * @instance
 */
H3DU.Surface.prototype.gradient=function(u,v){
	if((typeof this.surface!=="undefined" && this.surface!==null) && (typeof this.surface.gradient!=="undefined" && this.surface.gradient!==null)){
		return this.surface.gradient(u,v)
	} else {
	}
}
/**
 * TODO: Not documented yet.
 * @param {*} u
 * @param {*} v
 * @returns {*} Return value.
 * @instance
 */
H3DU.Surface.prototype.evaluate=function(u,v){
	if((typeof this.evaluate!=="undefined" && this.evaluate!==null) && (typeof this.surface.evaluate!=="undefined" && this.surface.evaluate!==null)){
		return this.surface.evaluate(u,v)
	} else {
		return [0,0,0]
	}
}
/**
 * TODO: Not documented yet.
 * @returns {*} Return value.
 * @instance
 */
H3DU.Surface.prototype.endPoints=function(){
	if((typeof this.evaluate!=="undefined" && this.evaluate!==null) && (typeof this.surface.endPoints!=="undefined" && this.surface.endPoints!==null)){
		return this.surface.endPoints()
	} else {
		return [0,1]
	}
}

/*
 Any copyright to this file is released to the Public Domain.
 http://creativecommons.org/publicdomain/zero/1.0/
 If you like this, you should donate
 to Peter O. (original author of
 the Public Domain HTML 3D Library) at:
 http://peteroupc.github.io/
*/

import {MathInternal} from "./h3du-mathinternal";
import {MathUtil} from "./h3du-math";

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
 * Classes or JavaScript objects defining parametric surfaces should implement
 * the <code>evaluate</code> method and, optionally, the other methods mentioned in the "surface" parameter below.
 * @constructor
 * @memberof H3DU
 * @param {Object} surface A <b>surface evaluator object</b>, which is an object that
 * must contain an <code>evaluate</code> method and may contain an <code>endPoints</code>,
 * <code>tangent</code>, <code>bitangent</code>, and/or <code>gradient</code>
 * method, as described in the corresponding methods of this class.
 */
export var Surface = function(surface) {
  this.surface = typeof surface === "undefined" ? null : surface;
};
/** @ignore */
Surface._EPSILON = 0.00001;

/**
 * Finds an approximate tangent vector of this surface at the given U and V coordinates.
 * The implementation in {@link Surface} calls the evaluator's <code>tangent</code>
 * method if it implements it; otherwise, does a numerical differentiation
 * with respect to the U axis using the <code>evaluate</code> method.<p>
 * The <b>tangent vector</b> is the vector pointing in the direction of the U axis,
 * or alternatively, the partial derivative of the <code>evaluate</code> method with respect to <code>u</code>.
 * The tangent vector returned by this method <i>should not</i> be "normalized" to a [unit vector]{@tutorial glmath}.
 * @param {number} u U coordinate of a point on the surface.
 * @param {number} v V coordinate of a point on the surface.
 * @returns {Array<number>} An array describing a tangent vector. It should have at least as many
 * elements as the number of dimensions of the underlying surface.
 */
Surface.prototype.tangent = function(u, v) {
  if(typeof this.surface !== "undefined" && this.surface !== null && (typeof this.surface.tangent !== "undefined" && this.surface.tangent !== null)) {
    return this.surface.tangent(u, v);
  } else {
    var du = Surface._EPSILON;
    var vector = this.evaluate(u + du, v);
    if(vector[0] === 0 && vector[1] === 0 && vector[2] === 0) {
    // too abrupt, try the other direction
      du = -du;
      vector = this.evaluate(u + du, v);
    }
    return MathInternal.vecSubScaleInPlace(vector, this.evaluate(u, v), 1.0 / du);
  }
};
/**
 * Finds an approximate bitangent vector of this surface at the given U and V coordinates.<p>
 * The implementation in {@link Surface} calls the evaluator's <code>bitangent</code>
 * method if it implements it; otherwise, does a numerical differentiation
 * with respect to the V axis using the <code>evaluate</code> method.<p>
 * The <b>bitangent vector</b> is the vector pointing in the direction of the V axis, or alternatively,
 * the partial derivative of the <code>evaluate</code> method with respect to <code>v</code>.  The bitangent vector returned by this method <i>should not</i> be "normalized" to a [unit vector]{@tutorial glmath}.
 * @param {number} u U coordinate of a point on the surface.
 * @param {number} v V coordinate of a point on the surface.
 * @returns {Array<number>} An array describing a bitangent vector. It should have at least as many
 * elements as the number of dimensions of the underlying surface.
 * @example <caption> The following code is a very simple surface evaluator object.
 * var evaluator = new Surface({
 * "evaluate":function(u, v) {
 * // Take the U parameter as the X coordinate,
 * // the V parameter as the Y coordinate, and 0 as
 * // the Z coordinate.
 * return [u, v, 0];
 * }
 * });
 */
Surface.prototype.bitangent = function(u, v) {
  if(typeof this.surface !== "undefined" && this.surface !== null && (typeof this.surface.bitangent !== "undefined" && this.surface.bitangent !== null)) {
    return this.surface.bitangent(u, v);
  } else {
    var du = Surface._EPSILON;
    var vector = this.evaluate(u, v + du);
    if(vector[0] === 0 && vector[1] === 0 && vector[2] === 0) {
    // too abrupt, try the other direction
      du = -du;
      vector = this.evaluate(u, v + du);
    }
    return MathInternal.vecSubScaleInPlace(vector, this.evaluate(u, v), 1.0 / du);
  }
};

/**
 * Convenience method for finding an approximate normal vector of this surface at the given U and V coordinates.
 * The <b>normal vector</b> is the same as the gradient vector, but "normalized" to a unit vector.
 * @param {number} u U coordinate of a point on the surface.
 * @param {number} v V coordinate of a point on the surface.
 * @returns {Array<number>} An array describing a normal vector. It should have at least as many
 * elements as the number of dimensions of the underlying surface.
 */
Surface.prototype.normal = function(u, v) {
  return MathInternal.vecNormalizeInPlace(this.gradient(u, v));
};

/**
 * Finds an approximate gradient vector of this surface at the given U and V coordinates.<p>
 * The implementation in {@link Surface} calls the evaluator's <code>gradient</code>
 * method if it implements it; otherwise uses the surface's tangent and bitangent vectors to implement the gradient
 * (however, this approach is generally only meaningful for a surface in three-dimensional space).<p>
 * The <b>gradient</b> is a vector pointing up and away from the surface.
 * If the evaluator describes a regular three-dimensional surface (usually
 * a continuous, unbroken surface such as a sphere, an open
 * cylinder, or a disk rotated in three dimensions), this can be the cross product
 * of the [tangent vector]{@link Surface#tangent}
 * and [bitangent vector]{@link Surface#bitangent},
 * in that order. The gradient returned by this method <i>should not</i> be "normalized" to a [unit vector]{@tutorial glmath}.
 * @param {number} u U coordinate of a point on the surface.
 * @param {number} v V coordinate of a point on the surface.
 * @returns {Array<number>} An array describing a gradient vector. It should have at least as many
 * elements as the number of dimensions of the underlying surface.
 * @example <caption>The following example is a surface evaluator
 * object for a parametric surface with a gradient method. To illustrate how the gradient method is derived
 * from the vector calculation method, that method is also given below. To
 * derive the normal calculation, first look at the vector function:<p>
 * <b>F</b>(u, v) = (cos(u), sin(u), sin(u)*cos(v))<p>
 * Then, find the partial derivatives with respect to <i>u</i> and to <i>v</i>:<p>
 * &#x2202;<b>F</b>/&#x2202;<i>u</i> = (-sin(u), cos(u), cos(u)*cos(v))<br>
 * &#x2202;<b>F</b>/&#x2202;<i>v</i> = (0, 0, -sin(v)*sin(u))<p>
 * Next, take their cross product:<p>
 * <b>&Del;F</b>(u, v) = (-sin(v)*cos(u)*sin(u), -sin(v)*sin(u)*sin(u), 0)<br><p>
 * The result is the gradient, which will point up and away from the surface.
 * </caption>
 * var surface=new Surface({"evaluate":function(u,v) {
 * "use strict";
 * return [Math.cos(u),Math.sin(u),Math.sin(u)*Math.cos(v)];
 * },
 * "gradient":function(u,v) {
 * "use strict";
 * return [
 * Math.cos(u)*-Math.sin(v)*Math.sin(u),
 * Math.sin(u)*-Math.sin(v)*Math.sin(u),
 * 0];
 * }})
 */
Surface.prototype.gradient = function(u, v) {
  if(typeof this.surface !== "undefined" && this.surface !== null && (typeof this.surface.gradient !== "undefined" && this.surface.gradient !== null)) {
    return this.surface.gradient(u, v);
  } else {
    var tan = this.tangent(u, v);
    var bitan = this.bitangent(u, v);
    if(MathInternal.vecLength(bitan) === 0) {
      return tan;
    }
    if(MathInternal.vecLength(tan) !== 0) {
      if(tan.length !== 3 || bitan.length !== 3) {
        var dims = tan.length;
        var ret = MathInternal.vecZeros(dims);
        tan = [tan[0] || 0, tan[1] || 0, tan[2] || 0];
        bitan = [bitan[0] || 0, bitan[1] || 0, bitan[2] || 0];
        var cr = MathUtil.vec3cross(tan, bitan);
        ret[0] = cr[0];
        ret[1] = cr[1];
        ret[2] = cr[2];
        return ret.slice(0, dims);
      } else {
        return MathUtil.vec3cross(tan, bitan);
      }
    } else {
      return bitan;
    }

  }
};
/**
 * Finds the position of this surface at the given U and V coordinates.
 * @param {number} u U coordinate of a point on the surface.
 * @param {number} v V coordinate of a point on the surface.
 * @returns {Array<number>} An array describing a position. It should have at least as many
 * elements as the number of dimensions of the underlying surface.
 */
Surface.prototype.evaluate = function(u, v) {
  if(typeof this.surface !== "undefined" && this.surface !== null && (typeof this.surface.evaluate !== "undefined" && this.surface.evaluate !== null)) {
    return this.surface.evaluate(u, v);
  } else {
    return [0, 0, 0];
  }
};
/**
 * Returns the starting and ending U and V coordinates of this surface.
 * This method calls the evaluator's <code>endPoints</code>
 * method if it implements it; otherwise, returns <code>[0, 1, 0, 1]</code>
 * @returns A four-element array. The first and second
 * elements are the starting and ending U coordinates, respectively, of the surface, and the third
 * and fourth elements are its starting and ending V coordinates.
 * Returns <code>[0, 1, 0, 1]</code> if the evaluator doesn't implement an <code>endPoints</code>
 * method.
 */
Surface.prototype.endPoints = function() {
  if(typeof this.surface !== "undefined" && this.surface !== null && (typeof this.surface.endPoints !== "undefined" && this.surface.endPoints !== null)) {
    return this.surface.endPoints();
  } else {
    return [0, 1, 0, 1];
  }
};

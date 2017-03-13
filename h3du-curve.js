/*
 Any copyright to this file is released to the Public Domain.
 http://creativecommons.org/publicdomain/zero/1.0/
 If you like this, you should donate
 to Peter O. (original author of
 the Public Domain HTML 3D Library) at:
 http://peteroupc.github.io/
*/

import {_MathInternal} from "./h3du-mathinternal";

/**
 * A curve evaluator object for a parametric curve.<p>
 * A parametric curve is a curve whose points are based on a
 * parametric curve function. A curve function takes a number
 * (U) and returns a point (in 1, 2, 3 or more dimensions, but
 * usually 2 or 3) that lies on the curve. For example, in 3
 * dimensions, a curve function has the following form:<p>
 * <b>F</b>(u) = [ x(u), y(u), z(u) ]<p>
 * where x(u) returns an X coordinate, y(u) a Y coordinate,
 * and z(u) returns a Z coordinate.<p>
 * Specialized curves should [subclass]{@tutorial subclass} this class and implement
 * the <code>evaluate</code> method and, optionally, the other methods mentioned in the "curve" parameter below.
 * @constructor
 * @memberof H3DU
 * @param {Object} curve A <b>curve evaluator object</b>, which is an object that must contain an <code>evaluate</code> method and may contain the <code>endPoints</code>, <code>velocity</code>, <code>accel</code>, <code>jerk</code>, <code>normal</code>, and/or <code>arcLength</code> methods, as described in the corresponding methods of this class.
 * @example <caption>The following function defines a parametric circle curve. It demonstrates how all methods
 * defined for curve evaluator objects can be implemented.</caption>
 * var circle=new Curve({"evaluate":function(u) {
 * "use strict";
 * return [Math.cos(u),Math.sin(u),0]
 * },
 * "velocity":function(u) {
 * return [-Math.sin(u),Math.cos(u),0]
 * },
 * "accel":function(u) {
 * return [-Math.cos(u),-Math.sin(u),0]
 * },
 * "jerk":function(u) {
 * return [Math.sin(u),-Math.cos(u),0]
 * },
 * "normal":function(u) {
 * // NOTE: The velocity vector will already be a
 * // unit vector, so we use the accel vector instead
 * return H3DU.Math.vec3normalize(this.accel(u));
 * },
 * "arcLength":function(u) {
 * return u;
 * },
 * "endPoints":function(u) {
 * return [0,Math.PiTimes2]
 * }
 * });
 */
function Curve(curve) {
  this.curve = curve;
}
/**
 * Returns the starting and ending U coordinates of this curve.
 * @returns A two-element array. The first element is the starting coordinate of
 * the curve, and the second is its ending coordinate.
 * Returns <code>[0, 1]</code> if the evaluator doesn't implement an <code>endPoints</code>
 * method.
 */
Curve.prototype.endPoints = function() {
  if((typeof this.curve !== "undefined" && this.curve !== null) && typeof this.curve.endPoints !== "undefined" && this.curve.endPoints !== null) {
    return this.curve.endPoints();
  } else {
    return [0, 1];
  }
};
/** @ignore */
Curve._EPSILON = 0.00001;
/**
 * Finds the position of this curve at the given U coordinate.
 * @param {number} u U coordinate of a point on the curve.
 * @returns {Array<number>} An array describing a position. It should have at least as many
 * elements as the number of dimensions of the underlying curve.
 */
Curve.prototype.evaluate = function(u) {
  if((typeof this.curve !== "undefined" && this.curve !== null) && typeof this.curve.evaluate !== "undefined" && this.curve.evaluate !== null) {
    return this.curve.evaluate(u);
  } else {
    return [0, 0, 0];
  }
};
/**
 * Finds an approximate velocity vector at the given U coordinate of this curve.
 * The implementation in {@link H3DU.Curve} calls the evaluator's <code>velocity</code>
 * method if it implements it; otherwise, does a numerical differentiation using
 * the position (from the <code>evaluate</code> method).<p>
 * The <b>velocity</b> of a curve is a vector which is the derivative of the curve's position at the given coordinate.  The vector returned by this method <i>should not</i> be "normalized" to a [unit vector]{@tutorial glmath}.
 * @param {number} u U coordinate of a point on the curve.
 * @returns {Array<number>} An array describing a velocity vector. It should have at least as many
 * elements as the number of dimensions of the underlying curve.
 */
Curve.prototype.velocity = function(u) {
  if((typeof this.curve !== "undefined" && this.curve !== null) && typeof this.curve.velocity !== "undefined" && this.curve.velocity !== null) {
    return this.curve.velocity(u);
  } else {
    var du = Curve._EPSILON;
    var vector = this.evaluate(u + du);
    if(vector[0] === 0 && vector[1] === 0 && vector[2] === 0) {
    // too abrupt, try the other direction
      du = -du;
      vector = this.evaluate(u + du);
    }
    return _MathInternal.vecSubScaleInPlace(vector, this.evaluate(u), 1.0 / du);
  }
};
/**
 * Finds an approximate acceleration vector at the given U coordinate of this curve.
 * The implementation in {@link H3DU.Curve} calls the evaluator's <code>accel</code>
 * method if it implements it; otherwise, does a numerical differentiation using
 * the velocity vector.<p>
 * The <b>acceleration</b> of a curve is a vector which is the second derivative of the curve's position at the given coordinate.  The vector returned by this method <i>should not</i> be "normalized" to a [unit vector]{@tutorial glmath}.
 * @param {number} u U coordinate of a point on the curve.
 * @returns {Array<number>} An array describing an acceleration vector. It should have at least as many
 * elements as the number of dimensions of the underlying curve.
 */
Curve.prototype.accel = function(u) {
  if((typeof this.curve !== "undefined" && this.curve !== null) && typeof this.curve.accel !== "undefined" && this.curve.accel !== null) {
    return this.curve.accel(u);
  } else {
    var du = Curve._EPSILON;
    var vector = this.velocity(u + du);
    if(vector[0] === 0 && vector[1] === 0 && vector[2] === 0) {
    // too abrupt, try the other direction
      du = -du;
      vector = this.velocity(u + du);
    }
    return _MathInternal.vecSubScaleInPlace(vector, this.velocity(u), 1.0 / du);
  }
};
/**
 * Finds an approximate jerk vector at the given U coordinate of this curve.
 * The implementation in {@link H3DU.Curve} calls the evaluator's <code>jerk</code>
 * method if it implements it; otherwise, does a numerical differentiation using
 * the acceleration vector.<p>
 * The <b>jerk</b> of a curve is a vector which is the third derivative of the curve's position at the given coordinate.  The vector returned by this method <i>should not</i> be "normalized" to a [unit vector]{@tutorial glmath}.
 * @param {number} u U coordinate of a point on the curve.
 * @returns {Array<number>} An array describing a jerk vector. It should have at least as many
 * elements as the number of dimensions of the underlying curve.
 */
Curve.prototype.jerk = function(u) {
  if((typeof this.curve !== "undefined" && this.curve !== null) && typeof this.curve.jerk !== "undefined" && this.curve.jerk !== null) {
    return this.curve.jerk(u);
  } else {
    var du = Curve._EPSILON;
    var vector = this.accel(u + du);
    if(vector[0] === 0 && vector[1] === 0 && vector[2] === 0) {
    // too abrupt, try the other direction
      du = -du;
      vector = this.accel(u + du);
    }
    return _MathInternal.vecSubScaleInPlace(vector, this.accel(u), 1.0 / du);
  }
};
/**
 * Finds an approximate principal normal vector at the given U coordinate of this curve.
 * The implementation in {@link H3DU.Curve} calls the evaluator's <code>normal</code>
 * method if it implements it; otherwise, does a numerical differentiation using the velocity vector.<p>
 * The <b>principal normal</b> of a curve is the derivative of the "normalized" velocity
 * vector divided by that derivative's length. The normal returned by this method
 * <i>should</i> be "normalized" to a [unit vector]{@tutorial glmath}. (Compare with {@link H3DU.Surface#gradient}.)
 * @param {number} u U coordinate of a point on the curve.
 * @returns {Array<number>} An array describing a normal vector. It should have at least as many
 * elements as the number of dimensions of the underlying curve.
 */
Curve.prototype.normal = function(u) {
  if((typeof this.curve !== "undefined" && this.curve !== null) && typeof this.curve.normal !== "undefined" && this.curve.normal !== null) {
    return this.curve.normal(u);
  } else {
    var du = Curve._EPSILON;
    var vector = _MathInternal.vecNormalizeInPlace(this.velocity(u + du));
    if(vector[0] === 0 && vector[1] === 0 && vector[2] === 0) {
    // too abrupt, try the other direction
      du = -du;
      vector = _MathInternal.vecNormalizeInPlace(this.velocity(u + du));
    }
    var tangent = _MathInternal.vecNormalizeInPlace(this.velocity(u));
    _MathInternal.vecSubInPlace(vector, tangent);
    return _MathInternal.vecNormalizeInPlace(vector);
  }
};

Curve._legendreGauss24 = [
  0.12793819534675216, 0.06405689286260563,
  0.1258374563468283, 0.1911188674736163,
  0.12167047292780339, 0.3150426796961634,
  0.1155056680537256, 0.4337935076260451,
  0.10744427011596563, 0.5454214713888396,
  0.09761865210411388, 0.6480936519369755,
  0.08619016153195327, 0.7401241915785544,
  0.0733464814110803, 0.820001985973903,
  0.05929858491543678, 0.8864155270044011,
  0.04427743881741981, 0.9382745520027328,
  0.028531388628933663, 0.9747285559713095,
  0.0123412297999872, 0.9951872199970213
];
/**
 * Finds an approximate arc length (distance) between the start of this
 * curve and the point at the given U coordinate of this curve.
 * The implementation in {@link H3DU.Curve} calls the evaluator's <code>arcLength</code>
 * method if it implements it; otherwise, calculates a numerical integral using the velocity vector.<p>
 * The <b>arc length</b> function returns a number; if the curve is "smooth", this is the integral, from the starting point to <code>u</code>, of the length of the velocity vector.
 * @param {number} u U coordinate of a point on the curve.
 * @returns {number} The approximate arc length of this curve at the given U coordinate.
 */
Curve.prototype.arcLength = function(u) {
  if((typeof this.curve !== "undefined" && this.curve !== null) && typeof this.curve.arcLength !== "undefined" && this.curve.arcLength !== null) {
    return this.curve.arcLength(u);
  } else {
    var ep = this.endPoints();
    if(u === ep[0])return 0;
    var mn = Math.min(u, ep[0]);
    var mx = Math.max(u, ep[0]);
    var dir = u >= ep[0] ? 1 : -1;
    var bm = (mx - mn) * 0.5;
    var bp = (mx + mn) * 0.5;
    var ret = 0;
    var lg = Curve._legendreGauss24;
    for(var i = 0; i < lg.length; i += 2) {
      var weight = lg[i];
      var abscissa = lg[i + 1];
      var x = this.velocity(bm * abscissa + bp);
      ret += weight * _MathInternal.vecLength(x);
      x = this.velocity(-bm * abscissa + bp);
      ret += weight * _MathInternal.vecLength(x);
    }
    return ret * bm * dir;
  }
};

export {Curve};

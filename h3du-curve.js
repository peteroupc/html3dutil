/* global H3DU */
/*
 Any copyright to this file is released to the Public Domain.
 http://creativecommons.org/publicdomain/zero/1.0/
 If you like this, you should donate
 to Peter O. (original author of
 the Public Domain HTML 3D Library) at:
 http://peteroupc.github.io/
*/
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
 * @class
 * @memberof H3DU
 * @params {Object} A <b>curve evaluator object</b>, which is an object that must contain an <code>evaluate</code> method and may contain the <code>endPoints</code>, <code>velocity</code>, <code>accel</code>, <code>normal</code>, and/or <code>arcLength</code> methods, as described in the corresponding methods of this class.
 */
H3DU.Curve = function(params) {
  "use strict";
  this.curve = params;
};
/**
 * Returns the starting and ending U coordinates of this curve.
 * @returns A two-element array. The first element is the starting coordinate of
 * the curve, and the second is its ending coordinate.
 * Returns <code>[0, 1]</code> if the evaluator doesn't implement an <code>endPoints</code>
 * method.
 * @instance
 */
H3DU.Curve.prototype.endPoints = function() {
  "use strict";
  if((typeof this.curve !== "undefined" && this.curve !== null) && typeof this.curve.endPoints !== "undefined" && this.curve.endPoints !== null) {
    return this.curve.endPoints();
  } else {
    return [0, 1];
  }
};
/** @ignore */
H3DU.Curve._EPSILON = 0.00001;
/** @ignore */
H3DU.Curve._vecSubInPlace = function(vec, subVec) {
  "use strict";
  for(var i = 0; i < vec.length; i++) {
    vec[i] -= subVec[i];
  }
  return vec;
};
/** @ignore */
H3DU.Curve._vecScale = function(vec, scalar) {
  "use strict";
  var ret = [];
  for(var i = 0; i < vec.length; i++) {
    ret[i] = vec[i] * scalar;
  }
  return ret;
};
/** @ignore */
H3DU.Curve._vecSubScaleInPlace = function(vec, subVec, scaleNum) {
  "use strict";
  for(var i = 0; i < vec.length; i++) {
    vec[i] = (vec[i] - subVec[i]) * scaleNum;
  }
  return vec;
};
/** @ignore */
H3DU.Curve._vecNormalizeInPlace = function(vec) {
  "use strict";
  var len = 0;
  for(var i = 0; i < vec.length; i++) {
    len += vec[i] * vec[i];
  }
  len = Math.sqrt(len);
  if(len !== 0) {
    for(i = 0; i < vec.length; i++) {
      len += vec[i] * vec[i];
    }
  }
  return vec;
};
/** @ignore */
H3DU.Curve._vecLength = function(vec) {
  "use strict";
  var dsq = 0;
  for(var i = 0; i < vec.length; i++) {
    dsq += vec[i] * vec[i];
  }
  return Math.sqrt(dsq);
};
/**
 * Finds the position of this curve at the given U coordinate.
 * @param {Number} u U coordinate of a point on the curve.
 * @returns {Array<Number>} An array describing a position. It should have at least as many
 * elements as the number of dimensions of the underlying curve.
 * @instance
 */
H3DU.Curve.prototype.evaluate = function(u) {
  "use strict";
  if((typeof this.curve !== "undefined" && this.curve !== null) && typeof this.curve.evaluate !== "undefined" && this.curve.evaluate !== null) {
    return this.curve.evaluate(u);
  } else {
    return [0, 0, 0];
  }
};
/**
 * Finds an approximate velocity vector at the given U coordinate of this curve.
 * This method calls the evaluator's <code>velocity</code>
 * method if it implements it; otherwise, does a numerical differentiation using
 * the position (from the <code>evaluate</code> method).<p>
 * The <b>velocity</b> of a curve is a vector which is the derivative of the curve's position at the given coordinate.  The vector returned by this method <i>should not</i> be "normalized" to a [unit vector]{@tutorial glmath}.
 * @param {Number} u U coordinate of a point on the curve.
 * @returns {Array<Number>} An array describing a velocity vector. It should have at least as many
 * elements as the number of dimensions of the underlying curve.
 * @instance
 */
H3DU.Curve.prototype.velocity = function(u) {
  "use strict";
  if((typeof this.curve !== "undefined" && this.curve !== null) && typeof this.curve.velocity !== "undefined" && this.curve.velocity !== null) {
    return this.curve.velocity(u);
  } else {
    var du = H3DU.Curve._EPSILON;
    var vector = this.evaluate(u + du);
    if(vector[0] === 0 && vector[1] === 0 && vector[2] === 0) {
    // too abrupt, try the other direction
      du = -du;
      vector = this.evaluate(u + du);
    }
    return H3DU.Curve._vecSubScaleInPlace(vector, this.evaluate(u), 1.0 / du);
  }
};
/**
 * Finds an approximate acceleration vector at the given U coordinate of this curve.
 * This method calls the evaluator's <code>accel</code>
 * method if it implements it; otherwise, does a numerical differentiation using
 * the velocity vector.<p>
 * The <b>acceleration</b> of a curve is a vector which is the second derivative of the curve's position at the given coordinate.  The vector returned by this method <i>should not</i> be "normalized" to a [unit vector]{@tutorial glmath}.
 * @param {Number} u U coordinate of a point on the curve.
 * @returns {Array<Number>} An array describing an acceleration vector. It should have at least as many
 * elements as the number of dimensions of the underlying curve.
 * @instance
 */
H3DU.Curve.prototype.accel = function(u) {
  "use strict";
  if((typeof this.curve !== "undefined" && this.curve !== null) && typeof this.curve.accel !== "undefined" && this.curve.accel !== null) {
    return this.curve.accel(u);
  } else {
    var du = H3DU.Curve._EPSILON;
    var vector = this.velocity(u + du);
    if(vector[0] === 0 && vector[1] === 0 && vector[2] === 0) {
    // too abrupt, try the other direction
      du = -du;
      vector = this.velocity(u + du);
    }
    return H3DU.Curve._vecSubScaleInPlace(vector, this.velocity(u), 1.0 / du);
  }
};
/**
 * Finds an approximate principal normal vector at the given U coordinate of this curve.
 * This method calls the evaluator's <code>normal</code>
 * method if it implements it; otherwise, does a numerical differentiation using the velocity vector.<p>
 * The <b>principal normal</b> of a curve is the derivative of the "normalized" velocity
 * vector divided by that derivative's length. The normal returned by this method
 * <i>should</i> be "normalized" to a [unit vector]{@tutorial glmath}. (Compare with {@link H3DU.Surface#gradient}.)
 * @param {Number} u U coordinate of a point on the curve.
 * @returns {Array<Number>} An array describing a normal vector. It should have at least as many
 * elements as the number of dimensions of the underlying curve.
 * @instance
 */
H3DU.Curve.prototype.normal = function(u) {
  "use strict";
  if((typeof this.curve !== "undefined" && this.curve !== null) && typeof this.curve.normal !== "undefined" && this.curve.normal !== null) {
    return this.curve.normal(u);
  } else {
    var du = H3DU.Curve._EPSILON;
    var vector = H3DU.Curve._vecNormalizeInPlace(this.velocity(u + du));
    if(vector[0] === 0 && vector[1] === 0 && vector[2] === 0) {
    // too abrupt, try the other direction
      du = -du;
      vector = H3DU.Curve._vecNormalizeInPlace(this.velocity(u + du));
    }
    var tangent = H3DU.Curve._vecNormalizeInPlace(this.velocity(u));
    H3DU.Curve._vecSubInPlace(vector, tangent);
    return H3DU.Curve._vecNormalizeInPlace(vector);
  }
};

H3DU.Curve._legendreGauss24 = [
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
 * This method calls the evaluator's <code>arcLength</code>
 * method if it implements it; otherwise, calculates a numerical integral using the velocity vector.<p>
 * The <b>arc length</b> function returns a number; if the curve is "smooth", this is the integral, from the starting point to <code>u</code>, of the length of the velocity vector.
 * @param {Number} u U coordinate of a point on the curve.
 * @returns {Array<Number>} The approximate arc length of this curve at the given U coordinate.
 * @instance
 */
H3DU.Curve.prototype.arcLength = function(u) {
  "use strict";
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
    var lg = H3DU.Curve._legendreGauss24;
    for(var i = 0; i < lg.length; i += 2) {
      var weight = lg[i];
      var abscissa = lg[i + 1];
      var x = this.velocity(bm * abscissa + bp);
      ret += weight * H3DU.Curve._vecLength(x);
      x = this.velocity(-bm * abscissa + bp);
      ret += weight * H3DU.Curve._vecLength(x);
    }
    return ret * bm * dir;
  }
};

/*
 Any copyright to this file is released to the Public Domain.
 In case this is not possible, this file is also licensed under the Unlicense: https://unlicense.org/
*/
/*
 Any copyright to this file is released to the Public Domain.
 In case this is not possible, this file is also licensed under the Unlicense: https://unlicense.org/
*/
/*
 Any copyright to this file is released to the Public Domain.
 In case this is not possible, this file is also licensed under the Unlicense: https://unlicense.org/
*/
/*
 Any copyright to this file is released to the Public Domain.
 In case this is not possible, this file is also licensed under the Unlicense: https://unlicense.org/
*/
/*
 Any copyright to this file is released to the Public Domain.
 In case this is not possible, this file is also licensed under the Unlicense: https://unlicense.org/
*/
/*
 Any copyright to this file is released to the Public Domain.
 In case this is not possible, this file is also licensed under the Unlicense: https://unlicense.org/
*/
/*
 Any copyright to this file is released to the Public Domain.
 In case this is not possible, this file is also licensed under the Unlicense: https://unlicense.org/
*/
/*
 Any copyright to this file is released to the Public Domain.
 In case this is not possible, this file is also licensed under the Unlicense: https://unlicense.org/
*/
/*
 Any copyright to this file is released to the Public Domain.
 In case this is not possible, this file is also licensed under the Unlicense: https://unlicense.org/
*/
/*
 Any copyright to this file is released to the Public Domain.
 In case this is not possible, this file is also licensed under the Unlicense: https://unlicense.org/
*/
/*
 Any copyright to this file is released to the Public Domain.
 In case this is not possible, this file is also licensed under the Unlicense: https://unlicense.org/
*/
/*
 Any copyright to this file is released to the Public Domain.
 In case this is not possible, this file is also licensed under the Unlicense: https://unlicense.org/
*/
/*
 Any copyright to this file is released to the Public Domain.
 In case this is not possible, this file is also licensed under the Unlicense: https://unlicense.org/
*/
/*
 Any copyright to this file is released to the Public Domain.
 In case this is not possible, this file is also licensed under the Unlicense: https://unlicense.org/
*/
/*
 Any copyright to this file is released to the Public Domain.
 In case this is not possible, this file is also licensed under the Unlicense: https://unlicense.org/
*/
/*
 Any copyright to this file is released to the Public Domain.
 In case this is not possible, this file is also licensed under the Unlicense: https://unlicense.org/
*/
/*
 Any copyright to this file is released to the Public Domain.
 In case this is not possible, this file is also licensed under the Unlicense: https://unlicense.org/
*/
/*
 Any copyright to this file is released to the Public Domain.
 In case this is not possible, this file is also licensed under the Unlicense: https://unlicense.org/
*/
/*
 Any copyright to this file is released to the Public Domain.
 In case this is not possible, this file is also licensed under the Unlicense: https://unlicense.org/
*/
/*
 Any copyright to this file is released to the Public Domain.
 In case this is not possible, this file is also licensed under the Unlicense: https://unlicense.org/
*/
/*
 Any copyright to this file is released to the Public Domain.
 In case this is not possible, this file is also licensed under the Unlicense: https://unlicense.org/
*/
/*
 Any copyright to this file is released to the Public Domain.
 In case this is not possible, this file is also licensed under the Unlicense: https://unlicense.org/
*/

import {MathInternal} from "./h3du-mathinternal";

/**
 * A curve evaluator object for a parametric curve.<p>
 * A parametric curve is a curve whose points are based on a
 * parametric curve function. A curve function takes a number
 * (U) and returns a point (in 1 or more dimensions, but
 * usually 2 or 3) that lies on the curve. For example, in 3
 * dimensions, a curve function has the following form:<p>
 * <b>F</b>(u) = [ x(u), y(u), z(u) ]<p>
 * where x(u) returns an X coordinate, y(u) a Y coordinate,
 * and z(u) returns a Z coordinate.<p>
 * Classes or JavaScript objects defining parametric curves should implement
 * the <code>evaluate</code> method and, optionally, the other methods mentioned in the "curve" parameter below.
 * @constructor
 * @param {Object} curve A <b>curve evaluator object</b>, which is an object that must contain an <code>evaluate</code> method and may contain an <code>endPoints</code>, <code>velocity</code>, <code>accel</code>, <code>jerk</code>, <code>normal</code>, and/or <code>arcLength</code> method, as described in the corresponding methods of this class.
 * @param {Object} [curveParam] An object for reparameterizing a curve object. It implements a method
 * named <code>endPoints</code>, which has the same meaning as {@link Curve#endPoints} and whose
 * return value takes precedence over the given curve's <code>endPoints</code> method. It also implements
 * a method named <code>getCoordinate(u)</code>, which converts a U coordinate in the old parameterization
 * to a U coordinate in the new parameterization.
 * @example <caption>The following is a simple example of a parametric curve.</caption>
 * var simpleCurve = new Curve({
 * "evaluate":function(u) {
 * return [Math.cos(u) * 1.5, Math.sin(u) * 0.8, 0];
 * },
 * "endPoints":function() {
 * return [-Math.PI, Math.PI];
 * }
 * });
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
 * return MathUtil.vec3normalize(this.accel(u));
 * },
 * "arcLength":function(u) {
 * return u;
 * },
 * "endPoints":function(u) {
 * return [0,Math.PiTimes2]
 * }
 * });
 * @example <caption>The following method
 * starts a curve at a different offset and wraps the portion
 * of the curve behind that offset at the end of the original
 * curve. This is useful for offsetting the points retrieved
 * with the getPoints method.</caption>
 * function wrapAtOffset(curve, offset) {
 *   "use strict";
 * var c=curve
 * if(offset!=0) {
 * var ep=curve.endPoints();
 * c=new Curve({
 * evaluate:function(u) {curves.evaluate(
 * u+offset>ep[1] ? (u+offset)-ep[1] : (u+offset))},
 * endPoints:function() {return ep;}
 * });
 * }
 * return c;
 * }
 */
function Curve(curve, curveParam) {
// TODO: Consider using a non-prototype method
// rather than this constructor. If so, deprecate
// this constructor
  this.curve = curve;
  this.curveParam = curveParam;
}
/**
 * Returns the starting and ending U coordinates of this curve.
 * @returns A two-element array. The first element is the starting coordinate of
 * the curve, and the second is its ending coordinate.
 * Returns <code>[0, 1]</code> if the evaluator doesn't implement an <code>endPoints</code>
 * method.
 */
Curve.prototype.endPoints = function() {
  if(typeof this.curveParam !== "undefined" && this.curveParam !== null) {
    return this.curveParam.endPoints();
  }
  if(typeof this.curve !== "undefined" && this.curve !== null && this.curve !== this && typeof this.curve.endPoints !== "undefined" && this.curve.endPoints !== null) {
    return this.curve.endPoints();
  } else {
    return [0, 1];
  }
};
/** @ignore */
Curve.prototype._getCoord = function(u) {
  if(typeof this.curveParam !== "undefined" && this.curveParam !== null) {
    return this.curveParam.getCoordinate(u);
  }
  return u;
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
  if(typeof this.curve !== "undefined" && this.curve !== null && this.curve !== this && typeof this.curve.evaluate !== "undefined" && this.curve.evaluate !== null) {
    return this.curve.evaluate(this._getCoord(u));
  } else {
    return [0, 0, 0];
  }
};
/**
 * Finds an approximate velocity vector at the given U coordinate of this curve.
 * The implementation in {@link Curve} calls the evaluator's <code>velocity</code>
 * method if it implements it; otherwise, does a numerical differentiation using
 * the position (from the <code>evaluate</code> method).<p>
 * The <b>velocity</b> of a curve is a vector which is the derivative of the curve's position at the given coordinate.  The vector returned by this method <i>should not</i> be "normalized" to a [unit vector]{@tutorial glmath}.
 * @param {number} u U coordinate of a point on the curve.
 * @returns {Array<number>} An array describing a velocity vector. It should have at least as many
 * elements as the number of dimensions of the underlying curve.
 */
Curve.prototype.velocity = function(u) {
  if(typeof this.curve !== "undefined" && this.curve !== null && this.curve !== this && typeof this.curve.velocity !== "undefined" && this.curve.velocity !== null) {
    return this.curve.velocity(this._getCoord(u));
  } else {
    let du = Curve._EPSILON;
    let vector = this.evaluate(u + du);
    if(vector[0] === 0 && vector[1] === 0 && vector[2] === 0) {
    // too abrupt, try the other direction
      du = -du;
      vector = this.evaluate(u + du);
    }
    return MathInternal.vecSubScaleInPlace(vector, this.evaluate(u), 1.0 / du);
  }
};
/**
 * Finds an approximate acceleration vector at the given U coordinate of this curve.
 * The implementation in {@link Curve} calls the evaluator's <code>accel</code>
 * method if it implements it; otherwise, does a numerical differentiation using
 * the velocity vector.<p>
 * The <b>acceleration</b> of a curve is a vector which is the second-order derivative of the curve's position at the given coordinate.  The vector returned by this method <i>should not</i> be "normalized" to a [unit vector]{@tutorial glmath}.
 * @param {number} u U coordinate of a point on the curve.
 * @returns {Array<number>} An array describing an acceleration vector. It should have at least as many
 * elements as the number of dimensions of the underlying curve.
 */
Curve.prototype.accel = function(u) {
  if(typeof this.curve !== "undefined" && this.curve !== null && this.curve !== this && typeof this.curve.accel !== "undefined" && this.curve.accel !== null) {
    return this.curve.accel(this._getCoord(u));
  } else {
    let du = Curve._EPSILON;
    let vector = this.velocity(u + du);
    if(vector[0] === 0 && vector[1] === 0 && vector[2] === 0) {
    // too abrupt, try the other direction
      du = -du;
      vector = this.velocity(u + du);
    }
    return MathInternal.vecSubScaleInPlace(vector, this.velocity(u), 1.0 / du);
  }
};
/**
 * Finds an approximate jerk vector at the given U coordinate of this curve.
 * The implementation in {@link Curve} calls the evaluator's <code>jerk</code>
 * method if it implements it; otherwise, does a numerical differentiation using
 * the acceleration vector.<p>
 * The <b>jerk</b> of a curve is a vector which is the third-order derivative of the curve's position at the given coordinate.  The vector returned by this method <i>should not</i> be "normalized" to a [unit vector]{@tutorial glmath}.
 * @param {number} u U coordinate of a point on the curve.
 * @returns {Array<number>} An array describing a jerk vector. It should have at least as many
 * elements as the number of dimensions of the underlying curve.
 */
Curve.prototype.jerk = function(u) {
  if(typeof this.curve !== "undefined" && this.curve !== null && this.curve !== this && typeof this.curve.jerk !== "undefined" && this.curve.jerk !== null) {
    return this.curve.jerk(this._getCoord(u));
  } else {
    let du = Curve._EPSILON;
    let vector = this.accel(u + du);
    if(vector[0] === 0 && vector[1] === 0 && vector[2] === 0) {
    // too abrupt, try the other direction
      du = -du;
      vector = this.accel(u + du);
    }
    return MathInternal.vecSubScaleInPlace(vector, this.accel(u), 1.0 / du);
  }
};
/**
 * Finds an approximate principal normal vector at the given U coordinate of this curve.
 * The implementation in {@link Curve} calls the evaluator's <code>normal</code>
 * method if it implements it; otherwise, does a numerical differentiation using the velocity vector.<p>
 * The <b>principal normal</b> of a curve is the derivative of the "normalized" velocity
 * vector divided by that derivative's length. The normal returned by this method
 * <i>should</i> be "normalized" to a [unit vector]{@tutorial glmath}. (Compare with {@link Surface#gradient}.)
 * @param {number} u U coordinate of a point on the curve.
 * @returns {Array<number>} An array describing a normal vector. It should have at least as many
 * elements as the number of dimensions of the underlying curve.
 */
Curve.prototype.normal = function(u) {
  if(typeof this.curve !== "undefined" && this.curve !== null && this.curve !== this && typeof this.curve.normal !== "undefined" && this.curve.normal !== null) {
    return this.curve.normal(this._getCoord(u));
  } else {
    let du = Curve._EPSILON;
    let vector = this.tangent(u + du);
    if(vector[0] === 0 && vector[1] === 0 && vector[2] === 0) {
    // too abrupt, try the other direction
      du = -du;
      vector = MathInternal.vecScaleInPlace(this.tangent(u + du), -1);
    }
    vector = MathInternal.vecSubInPlace(vector, this.tangent(u));
    return MathInternal.vecNormalizeInPlace(vector);
  }
};

/**
 * Convenience method for finding an approximate tangent vector of this curve at the given U coordinate.
 * The <b>tangent vector</b> is the same as the velocity vector, but "normalized" to a unit vector.
 * @param {number} u U coordinate of a point on the curve.
 * @returns {Array<number>} An array describing a normal vector. It should have at least as many
 * elements as the number of dimensions of the underlying curve.
 */
Curve.prototype.tangent = function(u) {
  return MathInternal.vecNormalizeInPlace(this.velocity(u));
};

/**
 * Convenience method for getting the total length of this curve.
 * @returns {number} The distance from the start of the curve to its end.
 */
Curve.prototype.getLength = function() {
  const ep = this.endPoints();
  return this.arcLength(ep[1]);
};

const gaussKronrodArray = [
  0.99693392252959545, 0.00825771143316837, 0.00000000000000000,
  0.98156063424671924, 0.02303608403898155, 0.04717533638651112,
  0.95053779594312127, 0.03891523046929952, 0.00000000000000000,
  0.90411725637047491, 0.05369701760775668, 0.10693932599531891,
  0.84355812416115328, 0.06725090705083998, 0.00000000000000000,
  0.76990267419430469, 0.07992027533360173, 0.16007832854334625,
  0.68405989547005586, 0.09154946829504924, 0.00000000000000000,
  0.58731795428661748, 0.10164973227906016, 0.20316742672306579,
  0.48133945047815713, 0.11002260497764407, 0.00000000000000000,
  0.36783149899818018, 0.11671205350175679, 0.23349253653835478,
  0.24850574832046932, 0.12162630352394839, 0.00000000000000000,
  0.12523340851146891, 0.12458416453615606, 0.24914704581340283,
  0.00000000000000000, 0.12555689390547423, 0.00000000000000000
];
function gaussKronrod(func, mn, mx, dir, depth) {
  const bm = (mx - mn) * 0.5;
  const bp = mn + bm;
  let gauss = 0;
  let kronrod = 0;
  let i;
  for (i = 0; i < gaussKronrodArray.length; i += 3) {
    const gaussWeight = gaussKronrodArray[i + 2];
    const kronrodWeight = gaussKronrodArray[i + 1];
    const abscissa = gaussKronrodArray[i];
    let x = func(bm * abscissa + bp);
    gauss += gaussWeight * x;
    kronrod += kronrodWeight * x;
    if(abscissa > 0) {
      x = func(-bm * abscissa + bp);
      gauss += gaussWeight * x;
      kronrod += kronrodWeight * x;
    }
  }
  gauss = gauss * bm * dir;
  kronrod = kronrod * bm * dir;
  if(Math.abs(gauss - kronrod) < 1e-6) {
    return kronrod + (kronrod - gauss) / 8191.0;
  } else if(depth >= 10) {
    return kronrod + (kronrod - gauss) / 8191.0;
  } else {
    return gaussKronrod(func, mn, bp, dir, depth + 1) +
         gaussKronrod(func, bp, mx, dir, depth + 1);
  }
}

/**
 * Finds an approximate arc length (distance) between the start of this
 * curve and the point at the given U coordinate of this curve.
 * The implementation in {@link Curve} calls the evaluator's <code>arcLength</code>
 * method if it implements it; otherwise, calculates a numerical integral using the velocity vector.<p>
 * The <b>arc length</b> function returns a number; if the curve is "smooth", this is the integral, from the starting point to <code>u</code>, of the length of the velocity vector.
 * @param {number} u U coordinate of a point on the curve.
 * @returns {number} The approximate arc length of this curve at the given U coordinate.
 */
Curve.prototype.arcLength = function(u) {
  if(typeof this.curveParam !== "undefined" && this.curveParam !== null && this.curveParam instanceof Curve._ArcLengthParam) {
    return u;
  }
  if(typeof this.curve !== "undefined" && this.curve !== null && this.curve !== this && typeof this.curve.arcLength !== "undefined" && this.curve.arcLength !== null) {
    return this.curve.arcLength(this._getCoord(u));
  } else {
    const ep = this.endPoints();
    if(u === ep[0])return 0;
    const mn = Math.min(u, ep[0]);
    const mx = Math.max(u, ep[0]);
    const dir = u >= ep[0] ? 1 : -1;
    const that = this;
    return gaussKronrod(function(x) {
      return MathInternal.vecLength(that.velocity(x));
    }, mn, mx, dir, 0);
  }
};

function _pointToObject(p) {
  if(p.length === 1) {
    return {"x":p[0]};
  } else if(p.length === 2) {
    return {
      "x":p[0],
      "y":p[1]
    };
  } else if(p.length === 3) {
    return {
      "x":p[0],
      "y":p[1],
      "z":p[2]
    };
  } else if(p.length === 4) {
    return {
      "x":p[0],
      "y":p[1],
      "z":p[2],
      "w":p[3]
    };
  } else {
    return {};
  }
}

/**
 * Gets an array of positions on the curve at fixed intervals
 * of U coordinates. Note that these positions will not generally be
 * evenly spaced along the curve unless the curve uses
 * an arc-length parameterization.
 * @param {number} count Number of positions to generate. Throws
 * an error if this number is 0. If this value is 1, returns an array containing
 * the starting point of this curve.
 * @returns {Array<Array<number>>|Array<Object>} An array of curve positions. The first
 * element will be the start of the curve.  If "count" is 2 or greater, the last element
 * will be the end of the curve.
 */
Curve.prototype.getPoints = function(count) {
  if(count === 0)return [];
  if(count < 0)throw new Error();
  const ep = this.endPoints();
  const ret = [this.evaluate(ep[0])];
  let i;
  for (i = 1; i < count; i++) {
    const u = ep[0] + (ep[1] - ep[0]) * (i / (count - 1));
    const pt = this.evaluate(u);
    ret.push(pt);
  }
  return ret;
};

/**
 * Gets an array of positions on the curve at fixed intervals
 * of U coordinates. Note that these positions will not generally be
 * evenly spaced along the curve unless the curve uses
 * an arc-length parameterization. The positions will be in the form of objects with
 * up to four properties: x, y, z, and w retrieve the first, second, third,
 * and fourth coordinate of each position, respectively.
 * @param {number} count Number of positions to generate. Throws
 * an error if this number is 0. If this value is 1, returns an array containing
 * the starting point of this curve.
 * @returns {Array<Array<number>>|Array<Object>} An array of curve positions. The first
 * element will be the start of the curve.  If "count" is 2 or greater, the last element
 * will be the end of the curve.
 * @example <caption>The following example initializes a three.js BufferGeometry with the points retrieved by this method. This example requires the three.js library.</caption>
 * var points=curve.getPointsAsObjects(50)
 * var buffer=new THREE.BufferGeometry()
 * .setFromPoints(points);
 */
Curve.prototype.getPointsAsObjects = function(count) {
  if(count === 0)return [];
  if(count < 0)throw new Error();
  const ep = this.endPoints();
  const ret = [_pointToObject(this.evaluate(ep[0]))];
  let i;
  for (i = 1; i < count; i++) {
    const u = ep[0] + (ep[1] - ep[0]) * (i / (count - 1));
    const pt = this.evaluate(u);
    ret.push(_pointToObject(pt));
  }
  return ret;
};
/** @ignore
 * @constructor */
Curve._ChangeEnds = function(u1, u2) {
  this.u1 = u1;
  this.u2 = u2;
  this.getCoordinate = function(u) {
    return u;
  };
  this.endPoints = function() {
    return [this.u1, this.u2];
  };
};
/** @ignore
 * @constructor */
Curve._FitRange = function(curve, ep1, ep2) {
  this.newEp1 = ep1;
  this.newEp2 = ep2;
  this.invNewEpDelta = 1.0 / (ep2 - ep1);
  const ep = curve.endPoints();
  this.origEp1 = ep[0];
  this.origEp2 = ep[1];
  this.getCoordinate = function(u) {
    const uNorm = (u - this.newEp1) * this.invNewEpDelta;
    return this.origEp1 + (this.origEp2 - this.origEp1) * uNorm;
  };
  this.endPoints = function() {
    return [ep1, ep2];
  };
};
/** @ignore
 * @constructor */
Curve._ArcLengthParam = function(curve) {
  this.curve = curve;
  this.ep = this.curve.endPoints();
  this.segments = [];
  let lastT = this.ep[0];
  let lastS = 0;
  const totalLength = this.curve.getLength();
  const segments = Math.min(Math.max(10, Math.ceil(totalLength * 18)), 50);
  let i;
  for (i = 1; i <= segments; i++) {
    const t = this.ep[0] + (this.ep[1] - this.ep[0]) * (i / segments);
    const s = this.curve.arcLength(t);
    this.segments.push([lastS, s, lastT, t]);
    lastT = t;
    lastS = s;
  }
  this.length = this.segments.length === 0 ? 0 :
    this.segments[this.segments.length - 1][1];
  this._vecLength = function(vec) {
    let ret = 0;
    let i;
    for (i = 0; i < vec.length; i++) {
      ret += vec[i] * vec[i];
    }
    return Math.sqrt(ret);
  };
  // solve arcLength(t)-s = 0 numerically
  this._solveArcLength = function(s, guess, minValue, maxExclusive) {
    let ret = guess;
    let i;
    for (i = 0; i < 10; i++) {
      const val = this.curve.arcLength(ret) - s;
      if(Math.abs(val) < 1e-10 && ret >= minValue &&
       ret < maxExclusive) {
        // already accurate enough
        break;
      }
      // NOTE: Arc length is an integral of the speed,
      // so the derivative of arc length will be the speed;
      // this doesn't change even though we subtracted "s"
      // from the arc length above, since an antiderivative
      // plus any constant (s is a constant here because the
      // integral is with respect to time, not speed)
      // is another antiderivative of the same function.
      const deriv = this._vecLength(this.curve.velocity(ret));
      if(deriv === 0) {
        // won't converge anymore
        break;
      }
      const solutionDiff = val / deriv;
      const r = ret - solutionDiff;
      if(solutionDiff === 0) {
        // won't converge anymore
        break;
      }
      if(minValue !== Number.NEGATIVE_INFINITY &&
      maxExclusive !== Number.POSITIVE_INFINITY) {
        if(val < 0) {
          minValue = Math.max(minValue, ret);
          ret = r;
          if(r >= maxExclusive) {
            ret = minValue + (maxExclusive - minValue) * 0.5;
          }
        } else if(val > 0) {
          maxExclusive = Math.min(maxExclusive, ret);
          ret = r;
          if(r <= minValue) {
            ret = minValue + (maxExclusive - minValue) * 0.5;
          }
        }
      } else {
        ret = r;
      }
    }
    return ret;
  };
};
Curve._ArcLengthParam.prototype.getCoordinate = function(s) {
  // NOTE: Note that velocity and acceleration depend on parameterization; for
  // example, the length of the velocity vector may differ for the underlying curve object
  // than for this one, even though both vectors generally point in the same direction.
  let ep;
  let guess;
  if(Number.isNaN(s))throw new Error();
  if(s > this.length) {
    ep = this.curve.endPoints();
    guess = ep[0] + (ep[1] - ep[0]) * (s / this.length);
    return this._solveArcLength(s, guess, ep[0],
      Number.POSITIVE_INFINITY);
  } else if(s < 0) {
    ep = this.curve.endPoints();
    guess = ep[0] + (ep[1] - ep[0]) * (s / this.length);
    return this._solveArcLength(s, guess,
      Number.NEGATIVE_INFINITY, 0);
  } else if(s === this.length) {
    ep = this.curve.endPoints();
    return ep[1];
  } else if(s === 0) {
    ep = this.curve.endPoints();
    return ep[0];
  }
  let startPt = 0;
  let endPt = this.segments.length;
  let k = 0;
  while(startPt < endPt) {
    k += 1;
    if(k > 20)throw new Error();
    const middle = startPt + ((endPt - startPt) / 2 | 0);
    const m = this.segments[middle];
    if(s === m[0]) {
      return m[2];
    } else if(s === m[1]) {
      return m[3];
    } else if(s > m[0] && s < m[1]) {
      const r = (s - m[0]) / (m[1] - m[0]);
      const u = m[2] + (m[3] - m[2]) * r;
      if(m[1] - m[0] >= 1e-10) {
        return this._solveArcLength(s, u, m[2], m[3]);
      }
      return u;
    } else if(s < m[0]) {
      endPt = middle;
    } else {
      startPt = middle + 1;
    }
  }
  throw new Error("Internal error");
};
Curve._ArcLengthParam.prototype.endPoints = function() {
  return [0, this.length];
};
/**
 * Creates a curve evaluator object for a curve that is generated using
 * the same formula as this one (and uses the same U coordinates),
 * but has a different set of end points.
 * For example, this method can be used to shrink the path of a curve
 * from [0, &pi;] to [0, &pi;/8].<p>
 * Note, however, that in general, shrinking
 * the range of a curve will not shrink the length of a curve
 * in the same proportion, unless the curve's path runs at
 * constant speed with respect to time. For example, shrinking the range of a curve
 * from [0, 1] to [0, 0.5] will not generally result in a curve that's exactly half as
 * long as the original curve.<p>For some curves, this method can
 * also be used to grow the path of the curve.
 * @param {number} ep1 New start point of the curve.
 * @param {number} ep2 New end point of the curve.
 * @returns {Curve} Return value.
 */
Curve.prototype.changeEnds = function(ep1, ep2) {
  return new Curve(this, new Curve._ChangeEnds(ep1, ep2));
};

/**
 * Creates a curve evaluator object for a curve that follows the same
 * path as this one but has its U coordinates remapped to fit the given range.
 * For example, this method can be used to shrink the range of U coordinates
 * from [-&pi;, &pi;] to [0, 1] without shortening the path of the curve.
 * Here, -&pi; now maps to 0, and &pi; now maps to 1.
 * @param {number} ep1 New value to use as the start point of the curve.
 * @param {number} ep2 New value to use as the end point of the curve.
 * @returns {Curve} Return value.
 */
Curve.prototype.fitRange = function(ep1, ep2) {
  return new Curve(this, new Curve._FitRange(this, ep1, ep2));
};
/**
 * Gets a curve evaluator object for a curve that follows the same
 * path as this one but has its U coordinates remapped to
 * an <i>arc length parameterization</i>. Arc length
 * parameterization allows for moving along a curve's path at a uniform
 * speed and for generating points which are spaced evenly along that
 * path -- both features are more difficult with most other kinds
 * of curve parameterization.<p>
 * The <i>end points</i> of the curve (obtained by calling the <code>endPoints</code>
 * method) will be (0, N), where N is the distance to the end of the curve from its
 * start.<p>
 * When converting to an arc length parameterization, the curve
 * should be continuous and have a speed greater than 0 at every
 * point on the curve. The arc length parameterization used in
 * this method is approximate.
 * @returns {Curve} Return value. Returns this object if this curve already uses an arc length parameterization.
 * @example <caption>The following example uses the arc-length
 * parameterization to generate, uniformly at random, a point that lies anywhere
 * on a curve.</caption>
 * var arclen = curve.toArcLengthParam();
 * var point = arclen.evaluate(Math.random()*arclen.getLength())
 */
Curve.prototype.toArcLengthParam = function() {
  if(typeof this.curveParam !== "undefined" && this.curveParam !== null && this.curveParam instanceof Curve._ArcLengthParam) {
    return this;
  }
  return new Curve(this, new Curve._ArcLengthParam(this));
};

export {Curve};

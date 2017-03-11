/*
 Any copyright to this file is released to the Public Domain.
 http://creativecommons.org/publicdomain/zero/1.0/
 If you like this, you should donate
 to Peter O. (original author of
 the Public Domain HTML 3D Library) at:
 http://peteroupc.github.io/
*/
/* global H3DU */

import { Curve } from './h3du-curve';
import { Surface } from './h3du-surface';
import { _MathInternal } from './h3du-mathinternal';
import { HMath } from './h3du-math';

function linear(points, elementsPerValue, t) {
    var ret = [];
    var p0 = points[0];
    var p1 = points[1];
    for(var i = 0; i < elementsPerValue; i++) {
      var pp0 = p0[i];
      ret[i] = pp0 + (p1[i] - pp0) * t;
    }
    return ret;
  }
  function bezierCubic(points, elementsPerValue, t) {
    var ret = [];
    var p0 = points[0];
    var p1 = points[1];
    var p2 = points[2];
    var p3 = points[3];
    for(var i = 0; i < elementsPerValue; i++) {
      ret[i] = (((3 - t) * t - 3) * t + 1) * p0[i] + ((3 * t - 6) * t + 3) * t * p1[i] + (-3 * t + 3) * t * t * p2[i] + t * t * t * p3[i];
    }
    return ret;
  }

  function bezierCubicDerivative(points, elementsPerValue, t) {
    var ret = [];
    var p0 = points[0];
    var p1 = points[1];
    var p2 = points[2];
    var p3 = points[3];
    for(var i = 0; i < elementsPerValue; i++) {
      ret[i] = ((-3 * t + 6) * t - 3) * p0[i] + ((9 * t - 12) * t + 3) * p1[i] + (-9 * t + 6) * t * p2[i] + 3 * t * t * p3[i];
    }
    return ret;
  }
  function bezierQuadratic(points, elementsPerValue, t) {
    var ret = [];
    var p0 = points[0];
    var p1 = points[1];
    var p2 = points[2];
    for(var i = 0; i < elementsPerValue; i++) {
      ret[i] = ((t - 2) * t + 1) * p0[i] + (-2 * t + 2) * t * p1[i] + t * t * p2[i];
    }
    return ret;
  }
  function bezierQuadraticDerivative(points, elementsPerValue, t) {
    var ret = [];
    var p0 = points[0];
    var p1 = points[1];
    var p2 = points[2];
    for(var i = 0; i < elementsPerValue; i++) {
      ret[i] = (2 * t - 2) * p0[i] + (-4 * t + 2) * p1[i] + 2 * t * p2[i];
    }
    return ret;
  }
/**
 * A [curve evaluator object]{@link H3DU.Curve} for a B&eacute;zier curve.<p>
 * @constructor
 * @augments Curve
 * @deprecated Instead of this class, use {@link H3DU.BSplineCurve.fromBezierCurve}
 * to create a B&eacute;zier curve.
 * @memberof H3DU
 * @param {Array<Array<number>>} cp An array of control points as specified in {@link H3DU.BSplineCurve.fromBezierCurve}.
 * @param {number} [u1] No longer used since version 2.0. The starting and ending
 * points will be (0, 0). (This parameter was the starting point for the
 * purpose of interpolation.)
 * @param {number} [u2] No longer used since version 2.0. The starting and ending
 * points will be (0, 0). (This parameter was the ending point for the
 * purpose of interpolation.)
 */
  function BezierCurve(cp, u1, u2) {
    if(typeof u1 !== "undefined" && u1 !== null || typeof u2 !== "undefined" && u2 !== null)console.warn("Unused parameters u1 and/or u2 given");
    this.curve = BSplineCurve.clamped(cp, cp.length - 1, 0);
  };
  BezierCurve.prototype = Object.create(Curve.prototype);
  BezierCurve.prototype.constructor = BezierCurve;
/**
 * Returns the starting and ending U coordinates of this curve.
 * @returns {Array<number>} A two-element array. The first and second
 * elements are the starting and ending U coordinates, respectively, of the curve.
 */
  BezierCurve.prototype.endPoints = function() {
    return this.surface.endPoints();
  };
/**
 * Evaluates the curve function based on a point
 * in a B&eacute;zier curve.
 * @param {number} u Point on the curve to evaluate (generally within the range
 * given in the constructor).
 * @returns {Array<number>} An array of the result of
 * the evaluation. It will have as many elements as a control point, as specified in the constructor.
 * @example
 * // Generate 11 points forming the B&eacute;zier curve.
 * // Assumes the curve was created with u1=0 and u2=1 (the default).
 * var points=[];
 * for(var i=0;i<=10;i++) {
 * points.push(curve.evaluate(i/10.0));
 * }
 */
  BezierCurve.prototype.evaluate = function(u) {
    return this.curve.evaluate(u);
  };
/**
 * A [surface evaluator object]{@link H3DU.SurfaceEval#vertex} for a B&eacute;zier surface.<p>
 * @deprecated Instead of this class, use {@link H3DU.BSplineSurface.fromBezierSurface}
 * to create a B&eacute;zier surface.
 * @constructor
 * @memberof H3DU
 * @param {Array<Array<Array<number>>>} cp An array of control point
 * arrays as specified in {@link H3DU.BSplineSurface.fromBezierSurface}.
 * @param {number} [u1] No longer used since version 2.0. The starting and ending
 * points will be (0, 0). (This parameter was the starting point for the
 * purpose of interpolation along the U axis.)
 * @param {number} [u2] No longer used since version 2.0. The starting and ending
 * points will be (0, 0). (This parameter was the ending point for the
 * purpose of interpolation along the U axis.)
 * @param {number} [v1] No longer used since version 2.0. The starting and ending
 * points will be (0, 0). (This parameter was the starting point for the
 * purpose of interpolation along the V axis.)
 * @param {number} [v2] No longer used since version 2.0. The starting and ending
 * points will be (0, 0). (This parameter was the ending point for the
 * purpose of interpolation along the V axis.)
 */
  function BezierSurface(cp,u1,u2,v1,v2) {
    if(typeof u1!=="undefined" && u1!==null) { console.warn("Unused parameter u1 is defined"); };
    if(typeof u2!=="undefined" && u2!==null) { console.warn("Unused parameter u2 is defined"); };
    if(typeof v1!=="undefined" && v1!==null) { console.warn("Unused parameter v1 is defined"); };
    if(typeof v2!=="undefined" && v2!==null) { console.warn("Unused parameter v2 is defined"); };
    this.surface = BSplineSurface.clamped(cp, cp[0].length - 1, cp.length - 1, 0);
  };
  BezierSurface.prototype = Object.create(Surface.prototype);
  BezierSurface.prototype.constructor = BezierSurface;

/**
 * Evaluates the surface function based on a point
 * in a B&eacute;zier surface.
 * @param {number} u U coordinate of the surface to evaluate (generally within the range
 * given in the constructor).
 * @param {number} v V coordinate of the surface to evaluate.
 * @returns {Array<number>} An array of the result of
 * the evaluation. It will have as many elements as a control point, as specified in the constructor.
 */
  BezierSurface.prototype.evaluate = function(u, v) {
    return this.surface.evaluate(u, v);
  };
/**
 * Returns the starting and ending U and V coordinates of this surface.
 * @returns {Array<number>} A four-element array. The first and second
 * elements are the starting and ending U coordinates, respectively, of the surface, and the third
 * and fourth elements are its starting and ending V coordinates.
 */
  BezierSurface.prototype.endPoints = function() {
    return this.surface.endPoints();
  };
/**
 * A [curve evaluator object]{@link H3DU.Curve} for a B-spline (basis spline) curve.
 * B-spline curves can also represent all B&eacute;zier curves (see {@link H3DU.BSplineCurve.fromBezierCurve}).
 * <p><b>B&eacute;zier Curves</b><p>
 * A B&eacute;zier curve is defined by a series of control points, where
 * the first and last control points define the end points of the curve, and
 * the remaining control points define the curve's shape, though they don't
 * necessarily cross the curve.<p>
 * @constructor
 * @augments Curve
 * @memberof H3DU
 * @param {Array<Array<number>>} controlPoints An array of control points. Each
 * control point is an array with the same length as the other control points.
 * It is assumed that the first control point's length represents the size of all the control
 * points.
 * @param {Array<number>} knots Knot vector of the curve.
 * Its size must be at least 2 plus the number of control
 * points and not more than twice the number of control points.<br>
 * The length of this parameter minus 1, minus the number
 * of control points, represents the <i>degree</i> of the B-spline
 * curve. For example, a degree-3 (cubic) B-spline curve contains eight knots, that is,
 * four more knots than the number of control points (four). A degree of 1
 * results in straight line segments.<br>
 * The knot vector must be a monotonically nondecreasing sequence,
 * the first knot must not equal the last, and the same knot may not be repeated
 * more than N+1 times at the beginning and end of the vector, or more than
 * N times elsewhere, where N is the curve's degree.
 * If the difference between one knot and the next isn't the same,
 * the curve is considered a <i>non-uniform</i>B-spline curve. Usually the first
 * knot will be 0 or less and the last knot will be 1 or greater.<br>
 * If there are N times 2 knots with the first N knots equal to 0 and the rest
 * equal to 1, where N is the number of control points,
 * the control points describe a <i>B&eacute;zier</i> curve, in which the
 * first and last control points match the curve's end points.<p>
 * @param {number} [bits] Bits for defining input
 * and controlling output. Zero or more of BSplineCurve.WEIGHTED_BIT,
 * BSplineCurve.HOMOGENEOUS_BIT,
 * and BSplineCurve.DIVIDE_BIT. If null or omitted, no bits are set.
 */
function BSplineCurve(controlPoints, knots, bits) {
    if(controlPoints.length <= 0)throw new Error();
    if(!knots)throw new Error();
    this.bits = bits || 0;
    this.controlPoints = controlPoints;
    if((this.bits & BSplineCurve.WEIGHTED_BIT) !== 0 &&
   (this.bits & BSplineCurve.HOMOGENEOUS_BIT) === 0) {
      // NOTE: WEIGHTED_BIT is deprecated; convert to homogeneous
      // for compatibility
      this.controlPoints = BSplineCurve._convertToHomogen(this.controlPoints);
    }
    var order = knots.length - this.controlPoints.length;
    if(order < 1 || order > this.controlPoints.length)
      throw new Error();
    BSplineCurve._checkKnots(knots, order - 1);
    var cplen = this.controlPoints[0].length;
    var cplenNeeded = 1;
    if((this.bits & BSplineCurve.DIVIDE_BIT) !== 0) {
      cplenNeeded = 2;
    }
    if(cplen < cplenNeeded)throw new Error();
    this.fastBezier = false;
    if(order === controlPoints.length && order <= 4) {
      this.fastBezier = true;
      for(var i = 0; i < order; i++) {
        if(knots[0] !== 0) {
          this.fastBezier = false;
          break;
        }
      }
      for(i = order; this.fastBezier && i < knots.length; i++) {
        if(knots[0] !== 1) {
          this.fastBezier = false;
          break;
        }
      }
    }
    this.knots = knots;
    this.buffer = [];
    this.controlPoints = controlPoints;
  };
  BSplineCurve.prototype = Object.create(Curve.prototype);
  BSplineCurve.prototype.constructor = BSplineCurve;

/**
 * Indicates whether the last coordinate of each control point is a
 * weight. If some of the weights differ, the curve is
 * considered a <i>rational</i> B-spline curve.
 * If this bit is set, points returned by the curve's <code>evaluate</code>
 * method will be in homogeneous coordinates.
 * @deprecated Support for this control point format may be dropped
 * in the future. Instead of using this bit, supply control points in homogeneous
 * coordinates (where each other coordinate is premultiplied by the last)
 * and use <code>DIVIDE_BIT</code> to convert the
 * results to conventional coordinates.
 * @const
 * @default
 */
  BSplineCurve.WEIGHTED_BIT = 1;
/**
 * Indicates to divide each other coordinate of the returned point
 * by the last coordinate of the point and omit the last
 * coordinate. This is used to convert
 * homogeneous coordinates to conventional coordinates.
 * If this bit is set, the length of each control point must be at least 2.<p>
 * A B-spline curve that has control points whose last coordinate is other than
 * 1 is a <i>rational</i> B-spline curve.
 * @const
 * @default
 */
  BSplineCurve.DIVIDE_BIT = 2;
/**
 * Indicates that each other coordinate of each control point
 * was premultiplied by the last coordinate of the point, that is,
 * each control point is in homogeneous coordinates.
 * Only used with WEIGHTED_BIT.
 * @deprecated This bit is deprecated because the B-spline
 * equation works the same whether control points are in conventional
 * coordinates or in homogeneous coordinates.
 * @const
 * @default
 */
  BSplineCurve.HOMOGENEOUS_BIT = 4;
/**
 * Combination of WEIGHTED_BIT and DIVIDE_BIT.
 * @const
 * @deprecated Deprecated because WEIGHTED_BIT is deprecated.
 */
  BSplineCurve.WEIGHTED_DIVIDE_BITS = 3;
/** @ignore */
  BSplineCurve._checkKnots = function(knots, degree) {
    for(var i = 1; i < knots.length; i++) {
      if(knots[i] < knots[i - 1])
        throw new Error();
    }
    for(i = 1; i < knots.length - 2 - degree; i++) {
      if(knots[i + degree] <= knots[i])
        throw new Error();
    }
    if(knots[0] === knots[knots.length - 1] ||
       knots[0] >= knots[degree + 1])throw new Error();
    if(knots[knots.length - 2 - degree] >= knots[knots.length - 1])throw new Error();
    if(degree + 1 >= knots.length)throw new Error();
  };
/** @ignore */
  BSplineCurve._nfunc = function(i, d, u, kn) {
    if(d === 0) {
      return kn[i] <= u && u < kn[i + 1] ? 1 : 0;
    }
    if(kn[i] > u)return 0;
    if(kn[i] === kn[i + d] && kn[i + d + 1] === kn[i + 1])return 0;
    if(kn[i + d + 1] < u)return 0;
    var v1 = kn[i] === kn[i + d] ? 0 : BSplineCurve._nfunc(i, d - 1, u, kn);
    var v2 = kn[i + d + 1] === kn[i + 1] ? 0 : BSplineCurve._nfunc(i + 1, d - 1, u, kn);
    if(v1 + v2 === 0) {
      return 0;
    }
    var ret = 0;
    if(v1 !== 0) {
      var den2 = kn[i + d] - kn[i];
      ret += (u - kn[i]) * v1 * (den2 === 0 ? 1 : 1.0 / den2);
    }
    if(v2 !== 0) {
      den2 = kn[i + d + 1] - kn[i + 1];
      ret += (kn[i + d + 1] - u) * v2 * (den2 === 0 ? 1 : 1.0 / den2);
    }
    return ret;
  };
/** @ignore */
  BSplineCurve._getFactors = function(kn, t, degree, numPoints, buffer) {
    var multStart = 1;
    var multEnd = 1;
    for(var i = 0; i < numPoints; i++) {
      buffer[i] = 0;
    }
    for(i = 1; i < kn.length; i++) {
      if(kn[i] === kn[0]) {
        multStart += 1;
      } else {
        break;
      }
    }
    for(i = kn.length - 2; i >= 0; i--) {
      if(kn[i] === kn[kn.length - 1]) {
        multEnd += 1;
      } else {
        break;
      }
    }
    if(t >= kn[kn.length - 1 - degree] &&
        kn[kn.length - 1 - degree] === kn[kn.length - 1]) {
      buffer[numPoints - 1] = 1;
      return;
    }
    if(multStart !== degree + 1 || multEnd !== degree + 1) {
      // Not a clamped curve
      for(i = 0; i < numPoints; i++) {
        buffer[i] = BSplineCurve._nfunc(i, degree, t, kn);
      }
      return;
    }
    if(t <= kn[degree]) {
      buffer[0] = 1;

    } else if(t >= kn[kn.length - 1 - degree]) {
      buffer[numPoints - 1] = 1;

    } else {
      var k = -1;
      for(i = 0; i <= kn.length; i++) {
        if(kn[i] <= t && t < kn[i + 1]) {
          k = i;
          break;
        }
      }
      if(k < 0)return;
      var numAfter = kn[k + 1] - t;
      var knotStart = kn[k];
      var numBefore = t - knotStart;
      buffer[k] = 1;
      for(var d = 1; d <= degree; d++) {
        var den = kn[k + 1] - kn[k - d + 1];
        buffer[k - d] = buffer[k - d + 1] * numAfter / den;
        for(i = k - d + 1; i < k; i++) {
          var kni = kn[i];
          buffer[i] *= (t - kni) / (kn[i + d] - kni);
          buffer[i] += buffer[i + 1] * (kn[i + d + 1] - t) / (kn[i + d + 1] - kn[i + 1]);
        }
        buffer[k] *= numBefore / (kn[k + d] - knotStart);
      }
    }
  };

/**
 * Evaluates the curve function based on a point
 * in a B-spline curve.
 * @param {number} u Point on the curve to evaluate.
 * NOTE: Since version 2.0, this parameter is no longer scaled according
 * to the curve's knot vector. To get the curve's extents, call this object's
 * <code>endPoints</code> method.
 * @returns {Array<number>} An array of the result of
 * the evaluation. Its length will be equal to the
 * length of a control point (minus 1 if DIVIDE_BIT is set), as specified in the constructor.
 * @example
 * // Generate 11 points forming the curve.
 * var points=[];
 * for(var i=0;i<=10;i++) {
 * points.push(curve.evaluate(i/10.0));
 * }
 */
  BSplineCurve.prototype.evaluate = function(u) {
    var ret = [];
    if(this.fastBezier) {
      var cp = this.controlPoints;
      switch(cp.length) {
      case 1:
        ret = cp[0].slice(0, cp[0].length);
        break;
      case 2:
        ret = linear(cp, cp[0].length, u);
        break;
      case 3:
        ret = bezierQuadratic(cp, cp[0].length, u);
        break;
      case 4:
        ret = bezierCubic(cp, cp[0].length, u);
        break;
      default:
        break;
      }
    } else {
      var numPoints = this.controlPoints.length;
      var degree = this.knots.length - numPoints - 1;
      var elementsPerPoint = this.controlPoints[0].length;
      ret = null;
      if(u <= this.knots[degree]) {
        if(this.knots[degree] === this.knots[0]) {
          ret = this.controlPoints[0].slice(0, elementsPerPoint);
        } else {
          u = this.knots[degree];
        }
      } else if(u >= this.knots[this.knots.length - 1 - degree]) {
        if(this.knots[this.knots.length - 1 - degree] === this.knots[this.knots.length - 1]) {
          ret = this.controlPoints[numPoints - 1].slice(0, elementsPerPoint);
        } else {
          u = this.knots[this.knots.length - 1 - degree];
        }
      }

      if(typeof ret === "undefined" || ret === null) {
        var mult = 0;
        var index = -1;
        var i;
        for(i = 0; i < this.knots.length; i++) {
          var curKnot = this.knots[i];
          var isThisKnot = u === curKnot;
          if(isThisKnot)mult++;
          if(curKnot < this.knots[i + 1]) {
            if(isThisKnot) {
              index = i;
              break;
            } else if(curKnot < u && u < this.knots[i + 1]) {
              index = i;
              break;
            }
          }
        }
        if(index < 0)throw new Error();
        if(mult > degree)throw new Error();
        if(mult === degree) {
          ret = this.controlPoints[index - degree].slice(0, elementsPerPoint);
        } else {
          var h = degree - mult;
          var buffer = [];
          for(i = index - degree; i <= index - mult; i++) {
            buffer.push(this.controlPoints[i]);
          }
          for(var r = 1; r <= h; r++) {
            var lastPt = buffer[r - 1];
            for(i = r; i < buffer.length; i++) {
              var kindex = index - degree + i;
              var ki = this.knots[kindex];
              var a = (u - ki) / (this.knots[kindex + degree - r + 1] - ki);
              var thisPt = buffer[i];
              var newPt = [];
            // console.log("p"+[kindex,r]+"="+(1-a)+"*p"+[kindex-1,r-1]+"+"+(a)+"*p"+[kindex,r-1])
              for(var j = 0; j < elementsPerPoint; j++) {
                newPt[j] = lastPt[j] * (1 - a) + thisPt[j] * a;
              }
              buffer[i] = newPt;
              lastPt = thisPt;
            }
          }
          ret = buffer[buffer.length - 1].slice(0, elementsPerPoint);
        }
      }
    }
    if((this.bits & BSplineCurve.DIVIDE_BIT) !== 0) {
      ret = BSplineCurve._fromHomogen(ret);
    }
    return ret;
  };
/** @ignore */
  BSplineCurve._splitKnots = function(knots, degree, u) {
    var lastFront = -1;
    var firstBack = -1;
    var front = [];
    var back = [];
    for(var i = 0; i < knots.length; i++) {
      if(knots[i] > u) {
        firstBack = i;
        break;
      } else if(knots[i] < u) {
        lastFront = i;
      }
    }
    if(lastFront < 0 || firstBack < 0)throw new Error();
    for(i = 0; i <= lastFront; i++) {
      front.push(knots[i]);
    }
    for(i = 0; i < degree + 1; i++) {
      front.push(u);
      back.push(u);
    }
    for(i = firstBack; i < knots.length; i++) {
      back.push(knots[i]);
    }
    return [front, back];
  };
/**
 * Splits this B-spline curve into two at the given point.
 * @param {number} u Point on the curve where this curve will be split.
 * @returns {Array<H3DU.BSplineCurve>} An array containing two B-spline curves: the
 * first is the part of the curve before the given point, and the second
 * is the part of the curve after the given point. The first element
 * will be null if <code>u</code> is at or before the start of the curve.
 * The second element
 * will be null if <code>u</code> is at or after the end of the curve.
 */
  BSplineCurve.prototype.split = function(u) {
    var numPoints = this.controlPoints.length;
    var degree = this.knots.length - numPoints - 1;
    var elementsPerPoint = this.controlPoints[0].length;
    var i;
    if(u <= this.knots[degree]) {
      return [null, this];
    } else if(u >= this.knots[this.knots.length - 1 - degree]) {
      return [this, null];
    }
    var mult = 0;
    var index = -1;
    for(i = 0; i < this.knots.length; i++) {
      var curKnot = this.knots[i];
      var isThisKnot = u === curKnot;
      if(isThisKnot)mult++;
      if(curKnot < this.knots[i + 1]) {
        if(isThisKnot) {
          index = i;
          break;
        } else if(curKnot < u && u < this.knots[i + 1]) {
          index = i;
          break;
        }
      }
    }
    if(index < 0)throw new Error();
    if(mult > degree)throw new Error();
    var newKnots = BSplineCurve._splitKnots(this.knots, degree, u);
    var front = [];
    var backPoints = [];
    if(mult === degree) {
      front = this.controlPoints.slice(0, index - degree + 1);
      backPoints = this.controlPoints.slice(index - degree, this.controlPoints.length);
    } else {
      var h = degree - mult;
      var buffer = [];
      for(i = index - degree; i <= index - mult; i++) {
        buffer.push(this.controlPoints[i]);
      }
  // Start array of front points
      front = [];
      for(i = 0; i <= index - degree; i++) {
        front.push(this.controlPoints[i]);
      }
      var back = [];
      for(var r = 1; r <= h; r++) {
        var lastPt = buffer[r - 1];
        for(i = r; i < buffer.length; i++) {
          var kindex = index - degree + i;
          var ki = this.knots[kindex];
          var a = (u - ki) / (this.knots[kindex + degree - r + 1] - ki);
          var thisPt = buffer[i];
          var newPt = [];
          for(var j = 0; j < elementsPerPoint; j++) {
            newPt[j] = lastPt[j] * (1 - a) + thisPt[j] * a;
          }
          buffer[i] = newPt;
          lastPt = thisPt;
          if(i === r) {
            front.push(newPt);
          } else if(i + 1 === buffer.length) {
            back.push(newPt);
          }
        }
      }
  // Generate array of back points
      backPoints.push(front[front.length - 1]);
      for(i = back.length - 1; i >= 0; i--) {
        backPoints.push(back[i]);
      }
      for(i = index - mult; i < numPoints; i++) {
        backPoints.push(this.controlPoints[i]);
      }
    }
    var curve1 = new BSplineCurve(front, newKnots[0], this.bits);
    var curve2 = new BSplineCurve(backPoints, newKnots[1], this.bits);
    return [curve1, curve2];
  };

/**
 * Returns the starting and coordinates of this curve.
 * @returns {Array<number>} A two-element array containing
 * the starting and ending U coordinates, respectively, of the curve.
 */
  BSplineCurve.prototype.endPoints = function() {
    var numPoints = this.controlPoints.length;
    var degree = this.knots.length - numPoints - 1;
    return [this.knots[degree], this.knots[this.knots.length - 1 - degree]];
  };

/**
 * Gets a reference to the array of control points used
 * in this curve object.
 * @returns {Array<Array<number>>} An object described in the constructor to {@link H3DU.BSplineCurve}.
 */
  BSplineCurve.prototype.getPoints = function() {
    return this.controlPoints;
  };

/**
 * Finds the velocity (derivative) of
 * this curve at the given point.
 * @param {number} u Point on the curve to evaluate.
 * @returns {Array<number>} An array giving the velocity vector.
 * It will have as many elements as a control point (or one fewer
 * if DIVIDE_BIT is set), as specified in the constructor.
 */
  BSplineCurve.prototype.velocity = function(u) {
    var ret = [];
    if(this.fastBezier) {
      var cp = this.controlPoints;
      switch(cp.length) {
      case 1:
        ret = _MathInternal.vecZeros(cp[0].length);
        break;
      case 2:
        ret = _MathInternal.vecSub(cp[1], cp[0]);
        break;
      case 3:
        ret = bezierQuadraticDerivative(cp, cp[0].length, u);
        break;
      case 4:
        ret = bezierCubicDerivative(cp, cp[0].length, u);
        break;
      default:
        break;
      }
    } else {
      var numPoints = this.controlPoints.length;
      var degree = this.knots.length - numPoints - 1;
      var elementsPerPoint = this.controlPoints[0].length;
      BSplineCurve._getFactors(this.knots, u, degree - 1, numPoints,
     this.buffer);
      var i, j;
      var coeffs = [];
      for(i = 0; i < numPoints; i++) {
        coeffs[i] = 0;
      }
      for(j = 0; j < numPoints - 1; j++) {
        var pix = degree * this.buffer[j + 1] / (this.knots[j + degree + 1] - this.knots[j + 1]);
        coeffs[j + 1] += pix;
        coeffs[j] -= pix;
      }
      for(i = 0; i < elementsPerPoint; i++) {
        var value = 0;
        for(j = 0; j < numPoints; j++) {
          value += coeffs[j] * this.controlPoints[j][i];
        }
        ret[i] = value;
      }
    }
    if((this.bits & BSplineCurve.DIVIDE_BIT) !== 0) {
      ret = BSplineCurve._fromHomogen(ret);
    }
    return ret;
  };

  /** @ignore */
  BSplineCurve._convertToHomogen = function(cp) {
    var ret = [];
    var cplen = cp[0].length;
    for(var i = 0; i < cp.length; i++) {
      var outp = [];
      var w = cp[i][cplen - 1];
      for(var j = 0; j < cplen - 1; j++) {
        outp[j] = cp[i][j] * w;
      }
      outp[cplen - 1] = w;
      ret.push(outp);
    }
    return ret;
  };

/** @ignore */
  BSplineCurve._fromHomogen = function(cp) {
    var cplen = cp.length;
    var div = 1.0 / cp[cplen - 1];
    for(var i = 0; i < cplen - 1; i++) {
      cp[i] /= div;
    }
    cp = cp.slice(0, cplen - 1);
    return cp;
  };
/**
 * A [surface evaluator object]{@link H3DU.SurfaceEval#vertex} for a B-spline (basis spline) surface.
 * B-spline surfaces can also represent all B&eacute;zier surfaces (see {@link H3DU.BSplineSurface.fromBezierSurface}).
 * A B&eacute;zier surface is defined by a series of control points, where
 * the control points on each corner define the end points of the surface, and
 * the remaining control points define the surface's shape, though they don't
 * necessarily cross the surface.
 * @constructor
 * @memberof H3DU
 * @param {Array<Array<Array<number>>>} controlPoints An array of control point
 * arrays, which in turn contain a number of control points. Each
 * control point is an array with the same length as the other control points.
 * It is assumed that:<ul>
 * <li>The length of this parameter is the number of control points in each row of
 * the V axis.
 * <li>The length of the first control point array is the number of control points in
 * each column of the U axis.
 * <li>The first control point's length represents the size of all the control
 * points.
 * </ul>
 * @param {Array<number>} knotsU Knot vector of the curve, along the U axis.
 * For more information, see {@link H3DU.BSplineCurve}.
 * @param {Array<number>} knotsV Knot vector of the curve, along the V axis.
 * @param {number} [bits] Bits for defining input
 * and controlling output. Zero or more of BSplineCurve.WEIGHTED_BIT,
 * BSplineCurve.HOMOGENEOUS_BIT,
 * and BSplineCurve.DIVIDE_BIT. If null or omitted, no bits are set.
 */
function BSplineSurface(controlPoints, knotsU, knotsV, bits) {
    var cpoints = controlPoints;
    this.bits = bits || 0;
    if((this.bits & BSplineCurve.WEIGHTED_BIT) !== 0 &&
   (this.bits & BSplineCurve.HOMOGENEOUS_BIT) === 0) {
      // NOTE: WEIGHTED_BIT is deprecated; convert to homogeneous
      // for compatibility
      cpoints = BSplineSurface._convertToHomogen(cpoints);
    }
    var vcplen = cpoints.length;
    if(vcplen <= 0)throw new Error();
    var ucplen = cpoints[0].length;
    if(ucplen <= 0)throw new Error();
    var cplen = cpoints[0][0].length;
    var cplenNeeded = 1;
    if((this.bits & BSplineCurve.DIVIDE_BIT) !== 0) {
      cplenNeeded = 2;
    }
    if(cplen < cplenNeeded)throw new Error();
    if(!knotsU || !knotsV)throw new Error();
    this.degreeU = knotsU.length - ucplen - 1;
    this.degreeV = knotsV.length - vcplen - 1;
    this.vcplen = vcplen;
    this.ucplen = ucplen;
    if(this.degreeU < 1 || this.degreeU + 1 > ucplen)throw new Error();
    if(this.degreeV < 1 || this.degreeV + 1 > vcplen)throw new Error();
    BSplineCurve._checkKnots(knotsU, this.degreeU);
    BSplineCurve._checkKnots(knotsV, this.degreeV);
    this.knotsU = knotsU;
    this.knotsV = knotsV;
    this.bufferU = [];
    this.bufferV = [];
    this.controlPoints = cpoints;
  };
  BSplineSurface.prototype = Object.create(Surface.prototype);
  BSplineSurface.prototype.constructor = BSplineSurface;
/**
 * Creates a B-spline curve with uniform knots, except that
 * the curve will start and end at the first and last control points and will
 * be tangent to the line between the first and second control points
 * and to the line between the next-to-last and last control points.
 * @param {Array<Array<number>>} controlPoints Array of
 * control points as specified in the {@link H3DU.BSplineCurve} constructor.
 * @param {number} [degree] Degree of the B-spline
 * curve. For example, 3 means a degree-3 (cubic) curve.
 * If null or omitted, the default is 3.
 * @param {number} [bits] Bits as specified in the {@link H3DU.BSplineCurve} constructor.
 * @returns {H3DU.BSplineCurve} Return value. The first
 * knot of the curve will be 0 and the last knot will be 1. (This is a change from previous
 * versions.)
 */
  BSplineCurve.clamped = function(controlPoints, degree, bits) {
    return new BSplineCurve(controlPoints,
   BSplineCurve.clampedKnots(controlPoints.length, degree), bits);
  };

/**
 * Creates a B-spline curve from the control points of a B&eacute;zier curve.
 * @param {Array<Array<number>>} controlPoints An array of control points. Each
 * control point is an array with the same length as the other control points.
 * It is assumed that:<ul>
 * <li>The length of this parameter minus 1 represents the degree of the B&eacute;zier
 * curve. For example, a degree-3 (cubic) curve
 * contains 4 control points. A degree of 1 results in a straight line segment.
 * <li>The first control point's length represents the size of all the control
 * points.
 * </ul>
 * @param {number} [bits] Bits as specified in the {@link H3DU.BSplineCurve} constructor.
 * @returns {H3DU.BSplineCurve} Return value.
 */
  BSplineCurve.fromBezierCurve = function(controlPoints, bits) {
    return BSplineCurve.clamped(controlPoints, controlPoints.length - 1, bits);
  };

  /**
   * Creates a B-spline curve with uniform knots.
   * @param {Array<Array<number>>} controlPoints Array of
   * control points as specified in the {@link H3DU.BSplineCurve} constructor.
   * @param {number} [degree] Degree of the B-spline
   * curve. For example, 3 means a degree-3 (cubic) curve.
   * If null or omitted, the default is 3.
   * @param {number} [bits] Bits as specified in the {@link H3DU.BSplineCurve} constructor.
   * @returns {H3DU.BSplineCurve} Return value. The first
   * knot of the curve will be 0 and the last knot will be 1. (This is a change from previous
   * versions.)
   */
  BSplineCurve.uniform = function(controlPoints, degree, bits) {
    return new BSplineCurve(controlPoints,
   BSplineCurve.uniformKnots(controlPoints.length, degree), bits);
  };

/**
 * Creates a B-spline surface with uniform knots, except that
 * the surface's edges lie on the edges of the control point array.
 * @param {Array<Array<Array<number>>>} controlPoints Array of
 * control point arrays as specified in the {@link H3DU.BSplineSurface} constructor.
 * @param {number} [degreeU] Degree of the B-spline
 * surface along the U axis. For example, 3 means a degree-3 (cubic) curve.
 * If null or omitted, the default is 3.
 * @param {number} [degreeV] Degree of the B-spline
 * surface along the V axis
 * If null or omitted, the default is 3.
 * @param {number} [bits] Bits as specified in the {@link H3DU.BSplineSurface} constructor.
 * @returns {H3DU.BSplineSurface} Return value. The first
 * knot of the curve will be 0 and the last knot will be 1. (This is a change from previous
 * versions.)
 */
  BSplineSurface.clamped = function(controlPoints, degreeU, degreeV, bits) {
    return new BSplineSurface(controlPoints,
   BSplineCurve.clampedKnots(controlPoints[0].length, degreeU),
   BSplineCurve.clampedKnots(controlPoints.length, degreeV), bits);
  };
/**
 * Creates a B-spline surface with uniform knots.
 * @param {Array<Array<Array<number>>>} controlPoints Array of
 * control point arrays as specified in the {@link H3DU.BSplineSurface} constructor.
 * @param {number} [degreeU] Degree of the B-spline
 * surface along the U axis. For example, 3 means a degree-3 (cubic) curve.
 * If null or omitted, the default is 3.
 * @param {number} [degreeV] Degree of the B-spline
 * surface along the V axis
 * If null or omitted, the default is 3.
 * @param {number} [bits] Bits as specified in the {@link H3DU.BSplineSurface} constructor.
 * @returns {H3DU.BSplineSurface} Return value. The first
 * knot of the curve will be 0 and the last knot will be 1. (This is a change from previous
 * versions.)
 */
  BSplineSurface.uniform = function(controlPoints, degreeU, degreeV, bits) {
    return new BSplineSurface(controlPoints,
   BSplineCurve.uniformKnots(controlPoints[0].length, degreeU),
   BSplineCurve.uniformKnots(controlPoints.length, degreeV), bits);
  };
/**
 * Generates a knot vector with uniform knots, to be
 * passed to the {@link H3DU.BSplineCurve} or {@link H3DU.BSplineCurve} constructor.
 * @param {number|Object} controlPoints Number of control points the curve will have,
 * or an array of control points.
 * @param {number} [degree] Degree of the B-spline
 * curve. For example, 3 means a degree-3 (cubic) curve.
 * If null or omitted, the default is 3.
 * @returns {Array<number>} A uniform knot vector. The first
 * knot will be 0 and the last knot will be 1. (This is a change from previous
 * versions.)
 */
  BSplineCurve.uniformKnots = function(controlPoints, degree) {
    if(typeof controlPoints === "object")
      controlPoints = controlPoints.length;
    var deg=((typeof degree==="undefined" || degree===null) ? (3) : (degree));
    if(controlPoints < deg + 1)
      throw new Error("too few control points for degree " + deg + " curve");
    var order = deg + 1;
    var ret = [];
    var scale = 1.0 / (controlPoints + order - 1);
    for(var i = 0; i < controlPoints + order; i++) {
      ret.push(i * scale);
    }
    return ret;
  };
/**
 * Generates a knot vector with uniform knots, to be
 * passed to the {@link H3DU.BSplineCurve} or {@link H3DU.BSplineCurve} constructor,
 * except that with the knot vector curve will start and end at the first and last control points and will
 * be tangent to the line between the first and second control points
 * and to the line between the next-to-last and last control points.
 * @param {number|Object} controlPoints Number of control points the curve will have,
 * or an array of control points.
 * @param {number} [degree] Degree of the B-spline
 * curve. For example, 3 means a degree-3 (cubic) curve.
 * If null or omitted, the default is 3.
 * @returns {Array<number>} A clamped uniform knot vector.
 * The first knot will be 0 and the last knot will be 1.
 * (This is a change in version 2.0.)
 */
  BSplineCurve.clampedKnots = function(controlPoints, degree) {
    if(typeof controlPoints === "object")
      controlPoints = controlPoints.length;
    var deg=((typeof degree==="undefined" || degree===null) ? (3) : (degree));
    if(controlPoints < deg + 1)
      throw new Error("too few control points for degree " + deg + " curve");
    var order = deg + 1;
    var extras = controlPoints - order;
    var ret = [];
    for(var i = 0; i < order; i++) {
      ret.push(0);
    }
    for(i = 0; i < extras; i++) {
      ret.push((i + 1) * 1.0 / (extras + 1));
    }
    for(i = 0; i < order; i++) {
      ret.push(1);
    }
    return ret;
  };

/**
 * Evaluates the surface function based on a point
 * in a B-spline surface.
 * @param {number} u U coordinate of the surface to evaluate.
 * NOTE: Since version 2.0, this parameter and the "v" parameter
 * are no longer scaled according to the curve's knot vector.
 * To get the surface's extents, call this object's
 * <code>endPoints</code> method.
 * @param {number} v V coordinate of the surface to evaluate.
 * @returns {Array<number>} An array of the result of
 * the evaluation. It will have as many elements as a control point (or one fewer
 * if DIVIDE_BIT is set), as specified in the constructor.
 */
  BSplineSurface.prototype.evaluate = function(u, v) {
    var elementsPerPoint = this.controlPoints[0][0].length;
    var bu = this.bufferU;
    var bv = this.bufferV;
    var tt, uu, i, value;
    BSplineCurve._getFactors(this.knotsU, u, this.degreeU, this.ucplen,
     this.bufferU);
    BSplineCurve._getFactors(this.knotsV, v, this.degreeV, this.vcplen,
     this.bufferV);
    var output = [];
    for(i = 0; i < elementsPerPoint; i++) {
      value = 0;
      for(tt = 0; tt < this.ucplen; tt++) {
        for(uu = 0; uu < this.vcplen; uu++) {
          value += this.controlPoints[uu][tt][i] * bu[tt] * bv[uu];
        }
      }
      output[i] = value;
    }
    if((this.bits & BSplineCurve.DIVIDE_BIT) !== 0) {
      output = BSplineCurve._fromHomogen(output);
    }
    return output;
  };
/**
 * Gets a reference to the array of control point arrays used
 * in this surface object.
 * @returns {Array<Array<number>>} An object described in the constructor to {@link H3DU.BSplineCurve}.
 */
  BSplineSurface.getPoints = function() {
    return this.controlPoints;
  };

/**
 * Finds the [tangent vector]{@link H3DU.SurfaceEval#vertex} at the
 * given point on the surface.
 * @param {number} u U coordinate of the surface to evaluate.
 * @param {number} v V coordinate of the surface to evaluate.
 * @returns {Array<number>} An array giving the tangent vector.
 * It will have as many elements as a control point (or one fewer
 * if DIVIDE_BIT is set), as specified in the constructor.
 */
  BSplineSurface.prototype.tangent = function(u, v) {
    var elementsPerPoint = this.controlPoints[0][0].length;
    var bv = this.bufferV;
    var tt, uu, i, value;
    BSplineCurve._getFactors(this.knotsU, u, this.degreeU - 1, this.ucplen,
     this.bufferU);
    BSplineCurve._getFactors(this.knotsV, v, this.degreeV, this.vcplen,
     this.bufferV);
    var ret = [];
    var coeffs = [];
    for(i = 0; i < this.ucplen; i++) {
      coeffs[i] = 0;
    }
    for(var j = 0; j < this.ucplen - 1; j++) {
      var pix = this.degreeU * this.bufferU[j + 1] / (this.knotsU[j + this.degreeU + 1] - this.knotsU[j + 1]);
      coeffs[j + 1] += pix;
      coeffs[j] -= pix;
    }
    for(i = 0; i < elementsPerPoint; i++) {
      value = 0;
      for(tt = 0; tt < this.ucplen; tt++) {
        for(uu = 0; uu < this.vcplen; uu++) {
          value += this.controlPoints[uu][tt][i] * coeffs[tt] * bv[uu];
        }
      }
      ret[i] = value;
    }
    if((this.bits & BSplineCurve.DIVIDE_BIT) !== 0) {
      ret = BSplineCurve._fromHomogen(ret);
    }
    return ret;
  };
/**
 * Finds the [bitangent vector]{@link H3DU.SurfaceEval#vertex} at the
 * given point on the surface.
 * @param {number} u U coordinate of the surface to evaluate.
 * @param {number} v V coordinate of the surface to evaluate.
 * @returns {Array<number>} An array giving the bitangent vector.
 * It will have as many elements as a control point (or one fewer
 * if DIVIDE_BIT is set), as specified in the constructor.
 */
  BSplineSurface.prototype.bitangent = function(u, v) {
    var elementsPerPoint = this.controlPoints[0][0].length;
    var bu = this.bufferU;
    var tt, uu, i, value;
    BSplineCurve._getFactors(this.knotsU, u, this.degreeU, this.ucplen,
     this.bufferU);
    BSplineCurve._getFactors(this.knotsV, v, this.degreeV - 1, this.vcplen,
     this.bufferV);
    var ret = [];
    var coeffs = [];
    for(i = 0; i < this.vcplen; i++) {
      coeffs[i] = 0;
    }
    for(var j = 0; j < this.vcplen - 1; j++) {
      var pix = this.degreeV * this.bufferV[j + 1] / (this.knotsV[j + this.degreeV + 1] - this.knotsV[j + 1]);
      coeffs[j + 1] += pix;
      coeffs[j] -= pix;
    }
    for(i = 0; i < elementsPerPoint; i++) {
      value = 0;
      for(tt = 0; tt < this.ucplen; tt++) {
        for(uu = 0; uu < this.vcplen; uu++) {
          value += this.controlPoints[uu][tt][i] * bu[tt] * coeffs[uu];
        }
      }
      ret[i] = value;
    }
    if((this.bits & BSplineCurve.DIVIDE_BIT) !== 0) {
      ret = BSplineCurve._fromHomogen(ret);
    }
    return ret;
  };

  /** @ignore */
  BSplineSurface._convertToHomogen = function(cp) {
    var ret = [];
    for(var i = 0; i < cp.length; i++) {
      ret.push(BSplineCurve._convertToHomogen(cp[i]));
    }
    return ret;
  };

  /**
   * Creates a B-spline surface from the control points of a B&eacute;zier surface.
   * @param {Array<Array<Array<number>>>} controlPoints An array of control point
   * arrays, which in turn contain a number of control points. Each
   * control point is an array with the same length as the other control points.
   * It is assumed that:<ul>
   * <li>The length of this parameter minus 1 represents the degree of the B&eacute;zier
   * surface along the V axis. For example, a degree-3 (cubic) surface along the V axis
   * contains 4 control points, one in each control point array. A degree of 1 on
   * both the U and V axes results in a flat surface.
   * <li>The length of the first control point array minus 1 represents the degree of the B&eacute;zier
   * surface along the U axis.
   * <li>The number of elements in the first control point represents the number of elements in all the control points.
   * </ul>
   * @param {number} [bits] Bits as specified in the {@link H3DU.BSplineSurface} constructor.
   * @returns {H3DU.BSplineSurface} Return value.
   */
  BSplineSurface.fromBezierSurface = function(controlPoints, bits) {
    return BSplineSurface.clamped(controlPoints, controlPoints[0].length - 1,
       controlPoints.length - 1, bits);
  };

/**
 * An evaluator of curve evaluator objects for generating
 * vertex positions and colors of a curve.<p>
 * For more information, see the {@tutorial surfaces} tutorial.
 * @constructor
 * @memberof H3DU
 */
  export var CurveEval = function() {
    this.colorCurve = null;
    this.normalCurve = null;
    this.texCoordCurve = null;
    this.vertexCurve = null;
    this.vertexCurveHasNormal = false; // NOTE: For compatibility only
  };

/**
 * Specifies a curve evaluator object for generating the vertex positions of a parametric curve.
 * @param {H3DU.Curve|Object} evaluator An object described in {@link H3DU.Curve}. Can be null, in which case, disables generating vertex positions.
 * @returns {H3DU.CurveEval} This object.
 * @example <caption>The following function sets a circle as the curve
 * to use for generating vertex positions. It demonstrates how all methods
 * defined for curve evaluator objects can be implemented.</caption>
 * curveEval.vertex({"evaluate":function(u) {
 * "use strict";
 * return [Math.cos(u),Math.sin(u),0]
 * },
 * "velocity":function(u) {
 * return [-Math.sin(u),Math.cos(u),0]
 * },
 * "accel":function(u) {
 * return [-Math.cos(u),-Math.sin(u),0]
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
  CurveEval.prototype.vertex = function(evaluator) {
    this.vertexCurve = typeof evaluator !== "undefined" && evaluator !== null ?
       new Curve(evaluator) : null;
    this.vertexCurveHasNormal = typeof evaluator !== "undefined" && evaluator !== null && (typeof evaluator.normal !== "undefined" && evaluator.normal !== null);
    return this;
  };
/**
 * Specifies a parametric curve function for generating normals.
 * @deprecated Use the "vertex" method instead.
 * @param {Object} evaluator An object that must contain a method
 * named <code>evaluate</code> that takes a single U coordinate and returns a 3-element array.
 * @returns {H3DU.CurveEval} This object.
 */
  CurveEval.prototype.normal = function(evaluator) {
    this.normalCurve = evaluator;
    return this;
  };
/**
 * Specifies a parametric curve function for generating color values.
 * @param {Object} evaluator An object that must contain a method
 * named <code>evaluate</code> that takes a single U coordinate and returns a 3-element array.
 * @returns {H3DU.CurveEval} This object.
 */
  CurveEval.prototype.color = function(evaluator) {
    this.colorCurve = evaluator;
    return this;
  };
/**
 * Specifies a parametric curve function for generating texture coordinates.
 * @param {Object} evaluator An object that must contain a method
 * named <code>evaluate</code> that takes a single U coordinate and returns a 1- or 2-element array.
 * @returns {H3DU.CurveEval} This object.
 */
  CurveEval.prototype.texCoord = function(evaluator) {
    this.texCoordCurve = evaluator;
    return this;
  };
/**
 * Generates vertex positions and attributes based on a point
 * in a parametric curve.
 * @param {H3DU.Mesh} mesh H3DU.Mesh where vertex positions and attributes
 * will be generated. When this method returns, the current color, normal,
 * and texture coordinates will be the same as they were before the method
 * started.
 * @param {number} u Point of the curve to evaluate.
 * @returns {H3DU.CurveEval} This object.
 */
  CurveEval.prototype.evalOne = function(mesh, u) {
    var color = null;
    var normal = null;
    var texcoord = null;
    if(!this.texCoordCurve && !this.normalCurve) {
      return this._evalOneSimplified(mesh, u);
    }
    if(this.colorCurve) {
      color = this.colorCurve.evaluate(u);
    }
    if(this.texCoordCurve) {
      texcoord = this.texCoordCurve.evaluate(u);
      if(texcoord.length === 1)texcoord.push(0);
    }
    if(this.normalCurve) {
      // NOTE: This is deprecated
      normal = this.normalCurve.evaluate(u);
    } else if(this.vertexCurve && this.vertexCurveHasNormal) {
      // NOTE: Condition that vertexCurve must include a
      // "normal" method may no longer apply in versions beyond 2.0
      normal = this.vertexCurve.normal(u);
    }
    if(this.vertexCurve) {
      var oldColor = color ? mesh.color.slice(0, 3) : null;
      var oldNormal = normal ? mesh.normal.slice(0, 3) : null;
      var oldTexCoord = texcoord ? mesh.texCoord.slice(0, 2) : null;
      if(color)mesh.color3(color[0], color[1], color[2]);
      if(normal) {
        if(normal.length === 2)
          mesh.normal3(normal[0], normal[1], 0.0);
        else
    mesh.normal3(normal[0], normal[1], normal[2]);
      }
      if(texcoord)mesh.texCoord2(texcoord[0], texcoord[1]);
      var vertex = this.vertexCurve.evaluate(u);
      if(vertex.length === 2)
        mesh.vertex3(vertex[0], vertex[1], 0.0);
      else
   mesh.vertex3(vertex[0], vertex[1], vertex[2]);
      if(oldColor)mesh.color3(oldColor[0], oldColor[1], oldColor[2]);
      if(oldNormal)mesh.normal3(oldNormal[0], oldNormal[1], oldNormal[2]);
      if(oldTexCoord)mesh.texCoord2(oldTexCoord[0], oldTexCoord[1]);
    }
    return this;
  };
/** @ignore */
  CurveEval.prototype._evalOneSimplified = function(mesh, u) {
    var color = null;
    if(this.colorCurve) {
      color = this.colorCurve.evaluate(u);
    }
    if(this.vertexCurve) {
      var oldColor = color ? mesh.color.slice(0, 3) : null;
      if(color)mesh.color3(color[0], color[1], color[2]);
      var vertex = this.vertexCurve.evaluate(u);
      var vertex2 = vertex.length === 2 ? 0.0 : vertex[2];
      mesh.vertex3(vertex[0], vertex[1], vertex2);
      if(oldColor)mesh.color3(oldColor[0], oldColor[1], oldColor[2]);
    }
    return this;
  };

/**
 * Generates vertices and attribute values that follow a parametric curve
 * function.
 * @param {H3DU.Mesh} mesh A geometric mesh where the vertices will be
 * generated.
 * @param {number} [mode] If this value is H3DU.Mesh.LINES, or is null
 * or omitted, generates
 * a series of lines defining the curve. If this value is H3DU.Mesh.POINTS,
 * generates a series of points along the curve. For any other value,
 * this method has no effect.
 * @param {number} [n] Number of subdivisions of the curve to be drawn.
 * Default is 24.
 * @param {number} [u1] Starting point of the curve.
 * Default is the starting coordinate given by the [curve evaluator object]{@link H3DU.Curve}, or 0 if not given.
 * @param {number} [u2] Ending point of the curve.
 * Default is the ending coordinate given by the [curve evaluator object]{@link H3DU.Curve}, or 1 if not given.
 * @returns {H3DU.CurveEval} This object.
 */
  CurveEval.prototype.evalCurve = function(mesh, mode, n, u1, u2) {
    if(typeof n === "undefined")n = 24;
    if(n <= 0)throw new Error("invalid n");
    if(typeof u1 === "undefined" && typeof u2 === "undefined") {
      if(typeof this.vertexCurve !== "undefined" && this.vertexCurve !== null) {
        var endPoints = this.vertexCurve.endPoints();
        u1 = endPoints[0];
        u2 = endPoints[1];
      } else {
        u1 = 0.0;
        u2 = 1.0;
      }
    }
    if(typeof mode === "undefined" || mode === null)mode = H3DU.Mesh.LINES;
    if(mode === H3DU.Mesh.POINTS)
      mesh.mode(H3DU.Mesh.POINTS);
    else if(mode === H3DU.Mesh.LINES)
      mesh.mode(H3DU.Mesh.LINE_STRIP);
    else return this;
    var uv = (u2 - u1) / n;
    for(var i = 0; i <= n; i++) {
      this.evalOne(mesh, u1 + i * uv);
    }
    return this;
  };
/**
 * An evaluator of parametric functions for generating
 * vertex attributes of a surface.<p>
 * See the {@tutorial surfaces} tutorial for more information.
 * @constructor
 * @memberof H3DU
 */
 function SurfaceEval() {
    this.colorSurface = null;
    this.normalSurface = null;
    this.generateNormals = false;
    this.texCoordSurface = null;
    this.vertexSurface = null;
    this.autoNormal = false;
  };
/**
 * Sets whether this object will automatically generate
 * normals rather than use the parametric evaluator
 * specified for normal generation, if any.
 * By default, normals won't be generated automatically.
 * @deprecated In the future, this class may always generate
 * normals, rendering this method unnecessary.  You should use the "vertex"
 * method, specifying an object that implements a method named
 * "gradient".
 * @param {Boolean} value Either true or false. True means normals
 * will automatically be generated; false means they won't.
 * @returns {H3DU.SurfaceEval} This object.
 */
  SurfaceEval.prototype.setAutoNormal = function(value) {
     // TODO: Provide a different mechanism for choosing which attributes to generate
    this.autoNormal = !!value;
    return this;
  };
/**
 * Specifies a surface evaluator object for generating the vertex positions of a parametric surface.
 * @param {H3DU.Surface|Object} evaluator An object described in {@link H3DU.Surface}.
 * Can be null, in which case, disables generating vertex positions.
 * @returns {H3DU.SurfaceEval} This object.
 * @example <caption>The following example sets the vertex position and
 * normal generation
 * function for a parametric surface. To illustrate how the method is derived
 * from the vector calculation method, that method is also given below. To
 * derive the normal calculation, first look at the vector function:<p>
 * <b>F</b>(u, v) = (cos(u), sin(u), sin(u)*cos(v))<p>
 * Then, find the tangent and bitangent vectors:<p>
 * &#x2202;<b>F</b>/&#x2202;<i>u</i> = (-sin(u), cos(u), cos(u)*cos(v))<br>
 * &#x2202;<b>F</b>/&#x2202;<i>v</i> = (0, 0, -sin(v)*sin(u))<p>
 * Next, take their cross product:<p>
 * <b>c</b>(u, v) = (-sin(v)*cos(u)*sin(u), -sin(v)*sin(u)*sin(u), 0)<br><p>
 * The result is the gradient, which will be normal to the surface.
 * </caption>
 * surfaceEval.vertex({"evaluate":function(u,v) {
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
  SurfaceEval.prototype.vertex = function(evaluator) {
    this.vertexSurface = new H3DU.Surface(evaluator);
    this.generateNormals = this.normalSurface || !!this.autoNormal ||
    typeof this.vertexSurface !== "undefined" && this.vertexSurface !== null &&
    (typeof this.vertexSurface.gradient !== "undefined" && this.vertexSurface.gradient !== null);
    return this;
  };
/**
 * Specifies a parametric surface function for generating normals.
 * @deprecated Use the "vertex" method instead, specifying an object
 * that implements a method named "gradient".
 * @param {Object} evaluator An object that must contain a method
 * named <code>evaluate</code> that takes a U coordinate and a V coordinate and returns a 3-element array.
 * @returns {H3DU.SurfaceEval} This object.
 */
  SurfaceEval.prototype.normal = function(evaluator) {
    this.normalSurface = evaluator;
    this.generateNormals = this.normalSurface || !!this.autoNormal ||
    typeof this.vertexSurface !== "undefined" && this.vertexSurface !== null &&
    (typeof this.vertexSurface.gradient !== "undefined" && this.vertexSurface.gradient !== null);
    return this;
  };
/**
 * Specifies a parametric surface function for generating color values.
 * @param {Object} evaluator An object that must contain a method
 * named <code>evaluate</code> that takes a U coordinate and a V coordinate and returns a 3-element array.
 * @returns {H3DU.SurfaceEval} This object.
 */
  SurfaceEval.prototype.color = function(evaluator) {
    this.colorSurface = evaluator;
    return this;
  };
/**
 * Specifies a parametric surface function for generating texture coordinates.
 * @param {Object} evaluator An object that must contain a method
 * named <code>evaluate</code> that takes a U coordinate and a V coordinate and returns a 2-element array.
 * @returns {H3DU.SurfaceEval} This object.
 * @example <caption>The following example sets the surface
 * function to a linear evaluator. Thus, coordinates passed to the
 * evalOne and evalSurface methods will be interpolated as direct
 * texture coordinates.</caption>
 * surface.texCoord({"evaluate":function(u,v) {
 * "use strict"; return [u,v] }});
 */
  SurfaceEval.prototype.texCoord = function(evaluator) {
    this.texCoordSurface = evaluator;
    return this;
  };
/** @ignore */
  var _OLD_VALUES_SIZE = 8;
/** @ignore */
  var _RECORDED_VALUES_SIZE = 11;
/**
 * Generates vertex positions and attributes based on a point
 * in a parametric surface.
 * @param {H3DU.Mesh} mesh H3DU.Mesh where vertex positions and attributes
 * will be generated. When this method returns, the current color, normal,
 * and texture coordinates will be the same as they were before the method
 * started.
 * @param {number} u U coordinate of the surface to evaluate.
 * @param {number} v V coordinate of the surface to evaluate.
 * @returns {H3DU.SurfaceEval} This object.
 */
  SurfaceEval.prototype.evalOne = function(mesh, u, v) {
    var values = [];
    this._saveValues(mesh, values, 0);
    this._recordAndPlayBack(mesh, u, v, values, _OLD_VALUES_SIZE);
    this._restoreValues(mesh, values, 0);
    return this;
  };
/** @ignore */
  SurfaceEval.prototype._recordAndPlayBack = function(mesh, u, v, buffer, index) {
    this._record(u, v, buffer, index);
    this._playBack(mesh, buffer, index);
  };
/** @ignore */
  SurfaceEval.prototype._saveValues = function(mesh, buffer, index) {
    if(this.colorSurface) {
      buffer[index + 3] = mesh.color[0];
      buffer[index + 4] = mesh.color[1];
      buffer[index + 5] = mesh.color[2];
    }
    if(this.generateNormals) {
      buffer[index + 0] = mesh.normal[0];
      buffer[index + 1] = mesh.normal[1];
      buffer[index + 2] = mesh.normal[2];
    }
    if(this.texCoordSurface) {
      buffer[index + 6] = mesh.texCoord[0];
      buffer[index + 7] = mesh.texCoord[1];
    }
  };
/** @ignore */
  SurfaceEval.prototype._restoreValues = function(mesh, buffer, index) {
    if(this.colorSurface) {
      mesh.color3(buffer[index + 3], buffer[index + 4], buffer[index + 5]);
    }
    if(this.generateNormals) {
      mesh.normal3(buffer[index + 0], buffer[index + 1], buffer[index + 2]);
    }
    if(this.texCoordSurface) {
      mesh.texCoord2(buffer[index + 6], buffer[index + 7]);
    }
  };
/** @ignore */
  SurfaceEval.prototype._record = function(u, v, buffer, index) {
    var normal = null;
    if(this.colorSurface) {
      var color = this.colorSurface.evaluate(u, v);
      buffer[index + 6] = color[0];
      buffer[index + 7] = color[1];
      buffer[index + 8] = color[2];
    }
    if(this.texCoordSurface) {
      var texcoord = this.texCoordSurface.evaluate(u, v);
      buffer[index + 9] = texcoord[0];
      buffer[index + 10] = texcoord.length <= 1 ? 0 : texcoord[1];
    }
    if(!this.autoNormal && (typeof this.vertexSurface.gradient !== "undefined" && this.vertexSurface.gradient !== null)) {
      normal = this.vertexSurface.normal(u, v);
      buffer[index + 3] = normal[0];
      buffer[index + 4] = normal[1];
      buffer[index + 5] = normal[2];
    } else if(this.normalSurface && !this.autoNormal) {
      // NOTE: This is deprecated
      normal = this.normalSurface.evaluate(u, v);
      buffer[index + 3] = normal[0];
      buffer[index + 4] = normal[1];
      buffer[index + 5] = normal[2];
    }
    if(this.vertexSurface) {
      var vertex = this.vertexSurface.evaluate(u, v);
      buffer[index] = vertex[0];
      buffer[index + 1] = vertex[1];
      buffer[index + 2] = vertex[2];
      if(this.autoNormal) {
        normal = this.vertexSurface.normal(u, v);
        buffer[index + 3] = normal[0];
        buffer[index + 4] = normal[1];
        buffer[index + 5] = normal[2];
      }
    }
  };
/** @ignore */
  SurfaceEval.prototype._playBack = function(mesh, buffer, index) {
    if(this.vertexSurface) {
      if(this.colorSurface) {
        mesh.color3(buffer[index + 6], buffer[index + 7], buffer[index + 8]);
      }
      if(this.generateNormals) {
        mesh.normal3(buffer[index + 3], buffer[index + 4], buffer[index + 5]);
      }
      if(this.texCoordSurface) {
        mesh.texCoord2(buffer[index + 9], buffer[index + 10]);
      }
      mesh.vertex3(buffer[index + 0], buffer[index + 1], buffer[index + 2]);
    }
  };

/**
 * Generates the vertex positions and attributes of a parametric
 * surface.
 * @param {H3DU.Mesh} mesh H3DU.Mesh where vertex positions and attributes
 * will be generated. When this method returns, the current color, normal,
 * and texture coordinates will be the same as they were before the method
 * started.
 * @param {number} [mode] If this value is H3DU.Mesh.TRIANGLES, or is null
 * or omitted, generates a series of triangles defining the surface. If
 * this value is H3DU.Mesh.LINES, generates
 * a series of lines defining the surface. If this value is H3DU.Mesh.POINTS,
 * generates a series of points along the surface. For any other value,
 * this method has no effect.
 * @param {number} [un] Number of subdivisions along the U axis.
 * Default is 24.
 * @param {number} [vn] Number of subdivisions along the V axis.
 * Default is 24.
 * @param {number} [u1] Starting U coordinate of the surface to evaluate.
 * Default is the starting U coordinate given by the [surface evaluator object]{@link H3DU.SurfaceEval#vertex}, or 0 if not given.
 * @param {number} [u2] Ending U coordinate of the surface to evaluate.
 * Default is the ending U coordinate given by the [surface evaluator object]{@link H3DU.SurfaceEval#vertex}, or 1 if not given.
 * @param {number} [v1] Starting V coordinate of the surface to evaluate.
 * Default is the starting V coordinate given by the [surface evaluator object]{@link H3DU.SurfaceEval#vertex}, or 0 if not given.
 * @param {number} [v2] Ending V coordinate of the surface to evaluate.
 * Default is the ending V coordinate given by the [surface evaluator object]{@link H3DU.SurfaceEval#vertex}, or 1 if not given.
 * @returns {H3DU.SurfaceEval} This object.
 */
  SurfaceEval.prototype.evalSurface = function(mesh, mode, un, vn, u1, u2, v1, v2) {
    if(typeof un === "undefined")un = 24;
    if(typeof vn === "undefined")vn = 24;
    if(un <= 0)throw new Error("invalid un");
    if(vn <= 0)throw new Error("invalid vn");
    if(typeof mode === "undefined" || mode === null)mode = H3DU.Mesh.TRIANGLES;
    var endPoints = null;
    if(typeof v1 === "undefined" && typeof v2 === "undefined") {
      if(!endPoints)endPoints = typeof this.vertexSurface !== "undefined" && this.vertexSurface !== null ? this.vertexSurface.endPoints() : [0, 1];
      v1 = endPoints[2];
      v2 = endPoints[3];
    }
    if(typeof u1 === "undefined" && typeof u2 === "undefined") {
      if(!endPoints)endPoints =  typeof this.vertexSurface !== "undefined" && this.vertexSurface !== null ? this.vertexSurface.endPoints() : [0, 1];
      u1 = endPoints[0];
      u2 = endPoints[1];
    }
    var du = (u2 - u1) / un;
    var dv = (v2 - v1) / vn;
    var i, j, jx, prevIndex;
    if(mode === H3DU.Mesh.TRIANGLES) {
      var oldValues = [];
      var previousValues = [];
      this._saveValues(mesh, oldValues, 0);
      for(i = 0; i < vn; i++) {
        mesh.mode(H3DU.Mesh.TRIANGLE_STRIP);
        for(j = 0, prevIndex = 0; j <= un;
      j++, prevIndex += _RECORDED_VALUES_SIZE) {
          jx = j * du + u1;
          if(i === 0) {
            this._recordAndPlayBack(mesh, jx, i * dv + v1, oldValues, _OLD_VALUES_SIZE);
          } else {
            this._playBack(mesh, previousValues, prevIndex);
          }
          if(i === vn - 1) {
            this._recordAndPlayBack(mesh, jx, (i + 1) * dv + v1, oldValues, _OLD_VALUES_SIZE);
          } else {
            this._recordAndPlayBack(mesh, jx, (i + 1) * dv + v1, previousValues, prevIndex);
          }
        }
      }
      this._restoreValues(mesh, oldValues, 0);
    } else if(mode === H3DU.Mesh.POINTS) {
      mesh.mode(H3DU.Mesh.POINTS);
      for(i = 0; i <= vn; i++) {
        for(j = 0; j <= un; j++) {
          jx = j * du + u1;
          this.evalOne(mesh, jx, i * dv + v1);
        }
      }
    } else if(mode === H3DU.Mesh.LINES) {
      for(i = 0; i <= vn; i++) {
        mesh.mode(H3DU.Mesh.LINE_STRIP);
        for(j = 0; j <= un; j++) {
          jx = j * du + u1;
          this.evalOne(mesh, jx, i * dv + v1);
        }
      }
      for(i = 0; i <= un; i++) {
        mesh.mode(H3DU.Mesh.LINE_STRIP);
        for(j = 0; j <= vn; j++) {
          this.evalOne(mesh, i * du + u1, j * dv + v1);
        }
      }
    }
    return this;
  };

  export { BezierCurve, BezierSurface, BSplineSurface, BSplineCurve, SurfaceEval };

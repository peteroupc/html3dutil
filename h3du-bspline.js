/*
 Any copyright to this file is released to the Public Domain.
 http://creativecommons.org/publicdomain/zero/1.0/
 If you like this, you should donate
 to Peter O. (original author of
 the Public Domain HTML 3D Library) at:
 http://peteroupc.github.io/
*/

import {Curve} from "./h3du-curve";
import {MathInternal} from "./h3du-mathinternal";
import {Surface} from "./h3du-surface";

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
 * A [curve evaluator object]{@link Curve} for a B-spline (basis spline) curve.
 * A B-spline curve is a parametric curve based on polynomial functions.
 * Each polynomial is generated using one or more
 * <i>control points</i>, which more or less follow the path of the curve,
 * and a <i>knot vector</i>, which determines, more or less, where each control
 * point is spaced along the curve. Together with rational B-spline curves (see
 * below), this makes B-spline curves very powerful,
 * since they can describe nearly all curves commonly used in computer
 * graphics, including line segments, circles, ellipses, parabolas, and
 * irregular smooth curves. With the B-spline curves supported here, a perspective transformation (including a rotation, translation, or scaling) of the curve's control points leads to the same transformation of the resulting curve.
 * <p><b>B&eacute;zier Curves</b><p>
 * A B&eacute;zier curve is defined by a series of control points, where
 * the first and last control points define the end points of the curve, and
 * the remaining control points define the curve's shape, though they don't
 * necessarily cross the curve. An important property of these curves is
 * that the bounding box of the curve is contained within the bounding box
 * of the control points. Another important property is that the starting direction
 * is the same as the direction from the
 * first to the second control point, and the ending direction is the same as the
 * direction from the next-to-last to last control point.<p>
 * B&eacute;zier curves are a subset of B-spline curves
 * (see {@link BSplineCurve.fromBezierCurve}).<p>
 * Line segments are degree-1 B&eacute;zier curves with two control points.<p>
 * A B&eacute;zier curve's knot vector consists of as many zeros as the number
 * of control points, followed by that many ones. For example, a degree-3 (cubic)
 * B&eacute;zier curve contains four control points and the following knot vector:
 * <code>[0, 0, 0, 0, 1, 1, 1, 1]</code>.
 * <p><b>Non-Uniform Curves</b><p>
 * A non-uniform B-spline curve is one whose knot vector is not evenly spaced,
 * that is, the difference between one knot and the next isn't the same.
 * <p><b>Rational Curves</b><p>
 * A rational B-spline curve is an N-dimensional curve with N plus one coordinates
 * per control point (<i>homogeneous coordinates</i>). B-spline algorithms
 * work the same way with homogeneous coordinates as with conventional
 * coordinates, but if N-dimensional points are wanted, use the {@link BSplineCurve.DIVIDE_BIT}
 * flag to divide each coordinate by the last (and omit the last coordinate)
 * to convert to N-dimensional points.<p>
 * Rational B-spline curves can describe circles and ellipses, which non-rational B-spline curves can't.<p>
 * Note that some B-spline packages define rational B-spline curves as using control points and weights, that is,
 * N-dimensional control points in conventional coordinates, along with a separate number, or <i>weight</i>,
 * for each control point. To convert such control points to homogeneous coordinates, multiply each
 * conventional coordinate by its weight, then append the weight as the control point's last coordinate.
 * <p><b>NURBS Curves</b><p>
 * <i>NURBS</i> is an acronym for non-uniform rational B-spline curves.
 * <p><b>Polynomial Basis</b></p>
 * <p>Any kind of polynomial curve can be converted to a different kind
 * of polynomial curve, having the same degree and describing the same path,
 * by transforming its control points. For example, a Hermite curve (another
 * kind of polynomial curve) can be converted to the equivalent
 * B-spline curve this way, or vice versa.
 * <p>Each kind of polynomial curve (such as B-spline or B&eacute;zier) is
 * associated with a <i>basis matrix</i>, which defines the polynomial
 * coefficients for each control point in the curve. For a degree (N-1) curve,
 * the matrix will be N&times;N.<p>
 * Each "column" of a basis matrix is a polynomial
 * containing the coefficients for each control point, and the columns are
 * arranged from left to right. Each polynomial consists of coefficients, ranging from the
 * highest order to the lowest, with respect to the parameter
 * <code>t</code> and the corresponding control point. For example, the
 * column <code>(3, 4, 2, 10)</code> describes the polynomial
 * 3xt<sup>3</sup> + 4xt<sup>2</sup> + 2xt + 10x, where <code>x</code>
 * is the input control point. The polynomials
 * are added together to get the final coordinate of the curve at the
 * given <code>t</code> value.<p>
 * The following JavaScript code shows an example of a basis matrix -- the
 * cubic B&eacute;zier basis matrix.<br>
 * <pre>var bezierBasisMatrix = [
 * // For the purposes of the Math matrix functions,
 * // the polynomials are arranged "column-wise", like this:
 * // P1, P2, P3, P4
 * -1,3,-3,1,
 * 3,-6,3,0,
 * -3,3,0,0,
 * 1,0,0,0]</pre>
 * <p>For code that converts a curve from one kind to
 * another, see the example.
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
 * the curve is considered a <i>non-uniform</i> B-spline curve. Usually the first
 * knot will be 0 or less and the last knot will be 1 or greater.
 * @param {number} [bits] Bits for defining input
 * and controlling output. Zero or more of {@link BSplineCurve.DIVIDE_BIT}. If null, undefined, or omitted, no bits are set.
 * @example <caption>The following function can be used
 * to convert an array of control points, each consisting of conventional
 * coordinates and a weight, to homogeneous coordinates.
 * For example, the single-control point
 * '[[2, 3, 4, 0.1]]' becomes '[[0.2, 0.3, 0.4, 0.1]]'; the
 * return value can then be used in the BSplineCurve constructor
 * to create a rational B-Spline curve.</caption>
 * function convertToHomogen(cp) {
 * var ret = [];
 * var cplen = cp[0].length;
 * for(var i = 0; i < cp.length; i++) {
 * var outp = [];
 * var w = cp[i][cplen - 1];
 * for(var j = 0; j < cplen - 1; j++) {
 * outp[j] = cp[i][j] * w;
 * }
 * outp[cplen - 1] = w;
 * ret.push(outp);
 * }
 * return ret;
 * };
 * @example <caption>The following code converts a cubic (degree-3)
 * curve from one kind to another. The converted curve will generally
 * have the same path as the original curve.</caption>
 * // "srcBasis" is a 4x4 basis matrix for the source curve type;
 * // the control points will initially be of this type of curve.
 * // var srcBasis = [ .... ]; // To be supplied or filled in.
 * // "dstBasis" is a 4x4 basis matrix for the destination curve type.
 * // It's defined here as the B&eacute;zier basis matrix for this example
 * var dstBasis =[-1,3,-3,1, 3,-6,3,0, -3,3,0,0, 1,0,0,0];
 * // Step 1: Invert the destination basis matrix
 * var invertedDest=MathUtil.mat4invert(destBasis)
 * // Step 2: Multiply the inverted destination matrix by the source
 * // matrix
 * var resultMatrix=MathUtil.mat4multiply(invertedDest,srcBasis)
 * // Step 3: Convert the control points one dimension
 * // at a time
 * var newControlPoints=[[],[],[],[]]
 * for(var i=0;i &lt; controlPoints[0].length;i++) {
 * var cp=[controlPoints[0][i],controlPoints[1][i],controlPoints[2][i],
 * controlPoints[3][i]]
 * // Transform the control points using the result matrix
 * cp=MathUtil.vec4transform(resultMatrix,cp)
 * // Set the new coordinates
 * newControlPoints[0][i]=cp[0]
 * newControlPoints[1][i]=cp[1]
 * newControlPoints[2][i]=cp[2]
 * newControlPoints[3][i]=cp[3]
 * }
 * // Finally, generate a B&eacute;zier curve (which is a special case
 * // of a B-spline curve)
 * var curve=new BSplineCurve(
 * newControlPoints,
 * [0,0,0,0,1,1,1,1] // cubic B&eacute;zier knot vector
 * );
 * // Alternatively, the curve could be generated with the
 * // fromBezierCurve method:
 * // var curve=BSplineCurve.fromBezierCurve(newControlPoints);
 */
function BSplineCurve(controlPoints, knots, bits) {
  if(controlPoints.length <= 0)throw new Error();
  if(!knots)throw new Error();
  this.bits = bits || 0;
  this.controlPoints = controlPoints;
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
  if(order === this.controlPoints.length && order <= 4) {
    this.fastBezier = true;
    for(var i = 0; i < order; i++) {
      if(knots[i] !== 0) {
        this.fastBezier = false;
        break;
      }
    }
    for(i = order; this.fastBezier && i < knots.length; i++) {
      if(knots[i] !== 1) {
        this.fastBezier = false;
        break;
      }
    }
  }
  this.knots = knots;
  this.buffer = [];
}
BSplineCurve.prototype = Object.create(Curve.prototype);
BSplineCurve.prototype.constructor = BSplineCurve;

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
 * @param {number} u Point on the curve to evaluate. This parameter is not scaled according
 * to the curve's knot vector. To get the curve's extents, call this object's
 * <code>endPoints</code> method.
 * @returns {Array<number>} An array of the result of
 * the evaluation. Its length will be equal to the
 * length of a control point (minus 1 if DIVIDE_BIT is set), as specified in the constructor.
 * @example
 * // Generate 11 points forming the curve.
 * var points=[];
 * for(var i=0;i&lt;=10;i++) {
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
 * @returns {Array<BSplineCurve>} An array containing two B-spline curves: the
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
 * @returns {Array<Array<number>>} An object described in the constructor to {@link BSplineCurve}.
 */
BSplineCurve.prototype.getControlPoints = function() {
  return this.controlPoints;
};
/**
 * Gets a reference to the array of knots used
 * in this curve object.
 * @returns {Array<Array<number>>} An object described in the constructor to {@link BSplineCurve}.
 */
BSplineCurve.prototype.getKnots = function() {
  return this.knots;
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
      ret = MathInternal.vecZeros(cp[0].length);
      break;
    case 2:
      ret = MathInternal.vecSub(cp[1], cp[0]);
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
BSplineCurve._fromHomogen = function(cp) {
  var cplen = cp.length;
  var div = 1.0 / cp[cplen - 1];
  for(var i = 0; i < cplen - 1; i++) {
    cp[i] *= div;
  }
  cp = cp.slice(0, cplen - 1);
  return cp;
};
/**
 * A [surface evaluator object]{@link Surface} for a B-spline (basis spline) surface,
 * whose edges are made up of B-spline curves. For more on B-spline curves, see the constructor
 * for {@link BSplineCurve}.
 * @constructor
 * @augments Surface
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
 * For more information, see {@link BSplineCurve}.
 * @param {Array<number>} knotsV Knot vector of the curve, along the V axis.
 * @param {number} [bits] Bits for defining input
 * and controlling output. Zero or more of {@link BSplineCurve.DIVIDE_BIT}. If null, undefined, or omitted, no bits are set.
 * @example <caption>Together with 'convertToHomogen' given in the {@link BSplineCurve} documentation, the following function can be used
 * to convert an array of arrays of control points, each consisting of conventional
 * coordinates and a weight, to homogeneous coordinates.
 * For example, the single-control point array
 * '[[[2, 3, 4, 0.1]]]' becomes '[[[0.2, 0.3, 0.4, 0.1]]]'; the
 * return value can then be used in the BSplineSurface constructor
 * to create a rational B-Spline surface.</caption>
 * function convertSurfaceToHomogen(cp) {
 * var ret = [];
 * for(var i = 0; i < cp.length; i++) {
 * ret.push(convertToHomogen(cp[i]));
 * }
 * return ret;
 * };
 */
function BSplineSurface(controlPoints, knotsU, knotsV, bits) {
  var cpoints = controlPoints;
  this.bits = bits || 0;
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
}
BSplineSurface.prototype = Object.create(Surface.prototype);
BSplineSurface.prototype.constructor = BSplineSurface;
/**
 * Creates a B-spline curve with uniform knots, except that
 * the curve will start and end at the first and last control points and will
 * be tangent to the line between the first and second control points
 * and to the line between the next-to-last and last control points.
 * @param {Array<Array<number>>} controlPoints Array of
 * control points as specified in the {@link BSplineCurve} constructor.
 * @param {number} [degree] Degree of the B-spline
 * curve. For example, 3 means a degree-3 (cubic) curve.
 * If null, undefined, or omitted, the default is 3.
 * @param {number} [bits] Bits as specified in the {@link BSplineCurve} constructor.
 * @returns {BSplineCurve} Return value. The first
 * knot of the curve will be 0 and the last knot will be 1.
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
 * contains 4 control points. A degree of 1 (two control points) results in a straight line segment.
 * <li>The first control point's length represents the size of all the control
 * points.
 * </ul>
 * @param {number} [bits] Bits as specified in the {@link BSplineCurve} constructor.
 * @returns {BSplineCurve} Return value.
 * @example <caption>The following function generates a polygon curve using linear B&eacute;zier
 * curves.</caption>
 * function polygonCurve(points) {
 * var curves=[]
 * for(var i=0;i &lt; points.length;i++) {
 * var cp=points[i]
 * var np=(i==points.length-1) ? points[0] : points[i+1]
 * curves.push(BSplineCurve.fromBezierCurve([cp,np]))
 * }
 * return new PiecewiseCurve(curves)
 * }
 */
BSplineCurve.fromBezierCurve = function(controlPoints, bits) {
  return BSplineCurve.clamped(controlPoints, controlPoints.length - 1, bits);
};

/**
 * Creates a B-spline curve with uniform knots.
 * @param {Array<Array<number>>} controlPoints Array of
 * control points as specified in the {@link BSplineCurve} constructor.
 * @param {number} [degree] Degree of the B-spline
 * curve. For example, 3 means a degree-3 (cubic) curve.
 * If null, undefined, or omitted, the default is 3.
 * @param {number} [bits] Bits as specified in the {@link BSplineCurve} constructor.
 * @returns {BSplineCurve} Return value. The first
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
 * control point arrays as specified in the {@link BSplineSurface} constructor.
 * @param {number} [degreeU] Degree of the B-spline
 * surface along the U axis. For example, 3 means a degree-3 (cubic) curve.
 * If null, undefined, or omitted, the default is 3.
 * @param {number} [degreeV] Degree of the B-spline
 * surface along the V axis
 * If null, undefined, or omitted, the default is 3.
 * @param {number} [bits] Bits as specified in the {@link BSplineSurface} constructor.
 * @returns {BSplineSurface} Return value. The first
 * knot of the curve will be 0 and the last knot will be 1.
 */
BSplineSurface.clamped = function(controlPoints, degreeU, degreeV, bits) {
  return new BSplineSurface(controlPoints,
    BSplineCurve.clampedKnots(controlPoints[0].length, degreeU),
    BSplineCurve.clampedKnots(controlPoints.length, degreeV), bits);
};
/**
 * Creates a B-spline surface with uniform knots.
 * @param {Array<Array<Array<number>>>} controlPoints Array of
 * control point arrays as specified in the {@link BSplineSurface} constructor.
 * @param {number} [degreeU] Degree of the B-spline
 * surface along the U axis. For example, 3 means a degree-3 (cubic) curve.
 * If null, undefined, or omitted, the default is 3.
 * @param {number} [degreeV] Degree of the B-spline
 * surface along the V axis
 * If null, undefined, or omitted, the default is 3.
 * @param {number} [bits] Bits as specified in the {@link BSplineSurface} constructor.
 * @returns {BSplineSurface} Return value. The first
 * knot of the curve will be 0 and the last knot will be 1.
 */
BSplineSurface.uniform = function(controlPoints, degreeU, degreeV, bits) {
  return new BSplineSurface(controlPoints,
    BSplineCurve.uniformKnots(controlPoints[0].length, degreeU),
    BSplineCurve.uniformKnots(controlPoints.length, degreeV), bits);
};
/**
 * Generates a knot vector with uniform knots, to be
 * passed to the {@link BSplineCurve} or {@link BSplineCurve} constructor.
 * @param {number|Object} controlPoints Number of control points the curve will have,
 * or an array of control points.
 * @param {number} [degree] Degree of the B-spline
 * curve. For example, 3 means a degree-3 (cubic) curve.
 * If null, undefined, or omitted, the default is 3.
 * @returns {Array<number>} A uniform knot vector. The first
 * knot will be 0 and the last knot will be 1. (This is a change from previous
 * versions.)
 */
BSplineCurve.uniformKnots = function(controlPoints, degree) {
  if(typeof controlPoints === "object")
    controlPoints = controlPoints.length;
  var deg = typeof degree === "undefined" || degree === null ? 3 : degree;
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
 * passed to the {@link BSplineCurve} or {@link BSplineCurve} constructor,
 * except that with the knot vector the curve will start and end at the first and last control points and will
 * be tangent to the line between the first and second control points
 * and to the line between the next-to-last and last control points.
 * @param {number|Object} controlPoints Number of control points the curve will have,
 * or an array of control points.
 * @param {number} [degree] Degree of the B-spline
 * curve. For example, 3 means a degree-3 (cubic) curve.
 * If null, undefined, or omitted, the default is 3.
 * @returns {Array<number>} A clamped uniform knot vector.
 * The first knot will be 0 and the last knot will be 1.
 */
BSplineCurve.clampedKnots = function(controlPoints, degree) {
  if(typeof controlPoints === "object")
    controlPoints = controlPoints.length;
  var deg = typeof degree === "undefined" || degree === null ? 3 : degree;
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
 * @returns {Array<Array<number>>} An object described in the constructor to {@link BSplineCurve}.
 */
BSplineSurface.prototype.getControlPoints = function() {
  return this.controlPoints;
};
/**
 * Gets a reference to the array of knot vectors used
 * in this curve object.
 * @returns {Array<Array<number>>} An object described in the constructor to {@link BSplineSurface}.
 */
BSplineSurface.prototype.getKnots = function() {
  return this.knots;
};

/**
 * Finds the [tangent vector]{@link Surface} at the
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
 * Finds the [bitangent vector]{@link Surface} at the
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
 * @param {number} [bits] Bits as specified in the {@link BSplineSurface} constructor.
 * @returns {BSplineSurface} Return value.
 */
BSplineSurface.fromBezierSurface = function(controlPoints, bits) {
  return BSplineSurface.clamped(controlPoints, controlPoints[0].length - 1,
    controlPoints.length - 1, bits);
};

export {BSplineSurface, BSplineCurve};

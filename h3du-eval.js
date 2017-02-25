/*
 Any copyright to this file is released to the Public Domain.
 http://creativecommons.org/publicdomain/zero/1.0/
 If you like this, you should donate
 to Peter O. (original author of
 the Public Domain HTML 3D Library) at:
 http://peteroupc.github.io/
*/
/* global H3DU, elementsPerValue, vu */
(function(global) {
  "use strict";

  (function(H3DU) {
    function binco(n, i) {
      if(i === 0 || i === n) {
        return 1;
      } else if(n < binco._fact.length) {
        return binco._fact[n] / (binco._fact[i] * binco._fact[n - i]);
      } else {
        return binco(n - 1, i - 1) * n / i;
      }
    }
// Factorials that don't exceed MAX_SAFE_INTEGER
    binco._fact = [1, 1, 2, 6, 24, 120, 720, 5040, 40320, 362880,
      3628800, 39916800, 479001600, 6227020800, 87178291200,
      1307674368000, 20922789888000, 355687428096000,
      6402373705728000];
    function zeros(count) {
      var ret = [];
      for(var i = 0; i < count; i++) {
        ret.push(0);
      }
      return ret;
    }
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
    function subtract(p1, p0) {
      var ret = [];
      for(var i = 0; i < elementsPerValue; i++) {
        ret[i] = p1[i] - p0[i];
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
        var pp0 = p0[i];
        var pp1 = p1[i];
        var pp2 = p2[i];
        ret[i] =
    ((pp0 * -1 * t + pp0 * 3) * t + pp0 * -3) * t + pp0 +
    ((pp1 * 3 * t + pp1 * -6) * t + pp1 * 3) * t +
    (pp2 * -3 * t + pp2 * 3) * t * t +
    p3[i] * t * t * t;
      }
      return ret;
    }

    function bezierCubicDerivative(points, elementsPerValue, t) {
      var ret = [];
      var p0 = points[0];
      var p1 = points[1];

      var p3 = points[3];
      for(var i = 0; i < elementsPerValue; i++) {
        var pp0 = p0[i];
        var pp1 = p1[i];

        ret[i] = (-pp0 * 3 * t + pp0 * 6) * t + -pp0 * 3 +
   ((pp1 * 9 * t + -pp1 * 12) * t + pp1 * 3) +
   (-pp1 * 9 * t + pp1 * 6) * t +
   p3[i] * 3 * t * t;
      }
      return ret;
    }
    function bezierQuadratic(points, elementsPerValue, t) {
      var ret = [];
  // var t2 = t * t;
      var p0 = points[0];
      var p1 = points[1];
      var p2 = points[2];
      for(var i = 0; i < elementsPerValue; i++) {
        var pp0 = p0[i];
        var pp1 = p1[i];
        ret[i] =
    (pp0 * 1 * t + pp0 * -2) * t + pp0 +
    (pp1 * -2 * t + pp1 * 2) * t +
    p2[i] * t * t;
      }
      return ret;
    }
    function bezierQuadraticDerivative(points, elementsPerValue, t) {
      var ret = [];
  // var t2 = t * t;
      var p0 = points[0];
      var p1 = points[1];
      var p2 = points[2];
      for(var i = 0; i < elementsPerValue; i++) {
        var pp0 = p0[i];
        var pp1 = p1[i];
        ret[i] = pp0 * 2 * t + pp0 * -2 +
   (pp1 * -4 * t + pp1 * 2) +
   p2[i] * 2 * t;
      }
      return ret;
    }
    function evaluatePolys(matrix, rows, cols, points, elementsPerValue, t) {
      var ret = [];
      for(var i = 0; i < elementsPerValue; i++) {
        ret[i] = 0;
      }
      for(i = 0; i < rows; i++) {
        var index = cols * i + (cols - 1);
        var ct = 1.0;
        var point = points[i];
        for(var j = 0; j < cols; j++) {
          var c = matrix[index];
          if(c !== 0) {
            var cell = c * ct;
            for(var k = 0; k < elementsPerValue; k++) {
              ret[k] += cell * point[k];
            }
          }
          ct *= t;
          index--;
        }
      }
      return ret;
    }

    function getCoefficients(matrix, rows, cols, t) {
      var ret = [];
      for(var i = 0; i < rows; i++) {
        var index = cols * i + (cols - 1);
        var ct = 1.0;
        var coeff = 0;
        for(var j = 0; j < cols; j++) {
          coeff += matrix[index] * ct;
          ct *= t;
          index--;
        }
        ret.push(coeff);
      }
      return ret;
    }

    function combineCoeffs(coeffsU, coeffsV, cp, elementsPerValue) {
      var ret = [];
      for(var i = 0; i < elementsPerValue; i++) {
        ret[i] = 0;
      }
      for(i = 0; i < coeffsV.length; i++) {
        var ci = coeffsV[i];
        var pointsU = cp[i];
        for(var j = 0; j < coeffsU.length; j++) {
          var cell = ci * coeffsU[j];
          var point = pointsU[j];
          for(var k = 0; k < elementsPerValue; k++) {
            ret[k] += cell * point[k];
          }
        }
      }
      return ret;
    }

    function makeDerivativeMatrix(matrix, rows, cols) {
      var deriv = [];
      var derivIndex = 0;
  // NOTE: The derivative matrix will contain one
  // fewer column, since the degree of each polynomial
  // (row) will be reduced by 1
      for(var i = 0; i < rows; i++) {
        var index = cols * i;
        var power = cols - 1;
        for(var j = 0; j < cols - 1; j++) {
          deriv[derivIndex] = matrix[index] * power;
          derivIndex++;
          power--;
          index++;
        }
      }
      return deriv;
    }

    function makeBezierMatrix(degree) {
 // Generates a matrix where each row
  // is a Bernstein polynomial of the given degree.
      var mat = [];
      var negation = (degree & 1) === 0 ? 1 : -1;
      for(var i = 0; i <= degree; i++) {
        var minor = degree - i;
        var neg = negation;
        for(var j = 0; j <= degree; j++) {
          if(j > minor) {
            mat.push(0);
          } else {
            var binom = binco(minor, j);
            mat.push(binom * neg);
            neg = -neg;
          }
        }
        negation = -negation;
      }
      for(i = 1; i < degree; i++) {
        binom = binco(degree, i);
        var index = (degree + 1) * i;
        for(j = 0; j < degree; j++) {
          mat[index] *= binom;
          index++;
        }
      }
      return mat;
    }
/** @private */
    H3DU._PolynomialCurve = function(cp, u1, u2) {
      if(typeof u1 === "undefined" && typeof u2 === "undefined") {
        this.uoffset = 0;
        this.umul = 1;
      } else if(u1 === u2) {
        throw new Error("u1 and u2 can't be equal");
      } else {
        this.uoffset = u1;
        this.umul = 1.0 / (u2 - u1);
      }
      if(!cp || cp.length < 1)throw new Error();
      this.degree = cp.length - 1;
      this.matrix = null;
      this.derivMatrix = null;
      this.cp = cp;
      this.elements = cp[0].length;
    };
/** @private */
    H3DU._PolynomialCurve.prototype.setBasis = function(basis, degree) {
      this.matrix = basis;
      this.degree = degree;
      this.derivMatrix = makeDerivativeMatrix(this.matrix, degree, degree);
    };
/** @private */
    H3DU._PolynomialCurve.prototype.evaluate = function(u) {
      var t = (u - this.uoffset) * this.umul;
      if(this.degree === 0) {
      // Constant
        return this.cp[0].slice(0, this.cp[0].length);
      }
      return evaluatePolys(this.matrix, this.degree + 1, this.degree + 1,
       this.cp, this.elements, t);
    };
/** @private */
    H3DU._PolynomialCurve.prototype.tangent = function(u) {
      var t = (u - this.uoffset) * this.umul;
      if(this.degree === 0) {
        return zeros(this.cp[0].length);
      }
      return evaluatePolys(this.matrix, this.degree + 1, this.degree + 1,
       this.cp, this.elements, t);
    };
/** @private */
    H3DU._PolynomialSurface = function(cp, u1, u2, v1, v2) {
      if(typeof u1 === "undefined" && typeof u2 === "undefined" &&
    typeof v1 === "undefined" && typeof v2 === "undefined") {
        this.uoffset = 0;
        this.umul = 1;
        this.voffset = 0;
        this.vmul = 1;
      } else if(u1 === u2) {
        throw new Error("u1 and u2 can't be equal");
      } else if(v1 === v2) {
        throw new Error("v1 and v2 can't be equal");
      } else {
        this.uoffset = u1;
        this.umul = 1.0 / (u2 - u1);
        this.voffset = v1;
        this.vmul = 1.0 / (v2 - v1);
      }
      this.degreeU = cp[0].length - 1;
      this.degreeV = cp.length - 1;
      this.matrixU = null;
      this.derivMatrixU = null;
      this.cp = cp;
      this.elements = cp[0][0].length;
    };
/** @private */
    H3DU._PolynomialSurface.prototype.setBasis = function(basisU, basisV, degreeU, degreeV) {
      if(this.cp.length - 1 < degreeV)throw new Error();
      if(this.cp[0].length - 1 < degreeU)throw new Error();
      this.degreeU = degreeU;
      this.degreeV = degreeV;
      this.matrixU = basisU;
      this.derivMatrixU = makeDerivativeMatrix(this.matrixU, this.degreeU + 1, this.degreeU + 1);
      if(this.degreeU === this.degreeV) {
        this.matrixV = this.matrixU;
        this.derivMatrixV = this.derivMatrixU;
      } else {
        this.matrixV = basisV;
        this.derivMatrixV = makeDerivativeMatrix(this.matrixV, this.degreeV + 1, this.degreeV + 1);
      }
    };
/** @private */
    H3DU._PolynomialSurface.prototype.evaluate = function(u, v) {
      var tu = (u - this.uoffset) * this.umul;
      var tv = (v - this.voffset) * this.vmul;
      if(this.degreeU === 0 && this.degreeV === 0) {
      // Constant
        return this.cp[0][0].slice(0, this.cp[0][0].length);
      }
      var coeffsU = getCoefficients(this.matrixU, this.degreeU + 1, this.degreeU + 1, tu);
      var coeffsV = getCoefficients(this.matrixV, this.degreeV + 1, this.degreeV + 1, tv);
      var ret = combineCoeffs(coeffsU, coeffsV, this.cp, this.elements);
      return ret;
    };
/** @private */
    H3DU._PolynomialSurface.prototype.bitangent = function(u, v) {
      var tu = (u - this.uoffset) * this.umul;
      var tv = (v - this.voffset) * this.vmul;
      if(this.degreeU === 0 && this.degreeV === 0) {
        return zeros(this.cp[0][0].length);
      }
      var coeffsU = getCoefficients(this.matrixU, this.degreeU + 1, this.degreeU + 1, tu);
      var coeffsV = getCoefficients(this.derivMatrixV, this.degreeV + 1, this.degreeV, tv);
      var ret = combineCoeffs(coeffsU, coeffsV, this.cp, this.elements);
      return ret;
    };
/** @private */
    H3DU._PolynomialSurface.prototype.tangent = function(u, v) {
      var tu = (u - this.uoffset) * this.umul;
      var tv = (v - this.voffset) * this.vmul;
      if(this.degreeU === 0 && this.degreeV === 0) {
        return zeros(this.cp[0][0].length);
      }
      var coeffsU = getCoefficients(this.derivMatrixU, this.degreeU + 1, this.degreeU, tu);
      var coeffsV = getCoefficients(this.matrixV, this.degreeV + 1, this.degreeV + 1, tv);
      var ret = combineCoeffs(coeffsU, coeffsV, this.cp, this.elements);
      return ret;
    };

/**
 * A parametric evaluator for B&eacute;zier curves.<p>
 * A B&eacute;zier curve is defined by a series of control points, where
 * the first and last control points define the endpoints of the curve, and
 * the remaining control points define the curve's shape, though they don't
 * necessarily cross the curve.
 * @class
 * @alias H3DU.BezierCurve
 * @param {Array<Array<Number>>} cp An array of control points. Each
 * control point is an array with the same length as the other control points.
 * It is assumed that:<ul>
 * <li>The length of this parameter minus 1 represents the degree of the B&eacute;zier
 * curve. For example, a degree-3 (cubic) curve
 * contains 4 control points. A degree of 1 results in a straight line segment.
 * <li>The first control point's length represents the size of all the control
 * points.
 * </ul>
 * @param {Number} [u1] Starting point for the purpose of interpolation; it will correspond to 0.
 * May be omitted; default is 0.
 * @param {Number} [u2] Ending point for the purpose of interpolation; it will correspond to 1.
 * May be omitted; default is 1.
 */
    H3DU.BezierCurve = function(cp, u1, u2) {
      this.curve = new H3DU._PolynomialCurve(cp, u1, u2);
      if(this.curve.degree <= 3) {
        this.curve.setBasis(makeBezierMatrix(this.curve.degree), this.curve.degree);
      }
      if(!this.curve.cp)throw new Error();
    };
/**
 * Evaluates the curve function based on a point
 * in a B&eacute;zier curve.
 * @param {Number} u Point on the curve to evaluate (generally within the range
 * given in the constructor).
 * @returns {Array<Number>} An array of the result of
 * the evaluation. It will have as many elements as a control point, as specified in the constructor.
 * @example
 * // Generate 11 points forming the B&eacute;zier curve.
 * // Assumes the curve was created with u1=0 and u2=1 (the default).
 * var points=[];
 * for(var i=0;i<=10;i++) {
 * points.push(curve.evaluate(i/10.0));
 * }
 * @memberof! H3DU.BezierCurve#
 */
    H3DU.BezierCurve.prototype.evaluate = function(u) {
      if(!this.curve.cp)throw new Error();
      if(this.curve.degree === 2) {
        return bezierQuadratic(this.curve.cp, this.curve.elements,
      (u - this.curve.uoffset) * this.curve.umul);
      }
      if(this.curve.degree === 3) {
        return bezierCubic(this.curve.cp, this.curve.elements,
   (u - this.curve.uoffset) * this.curve.umul);
      }
      if(this.curve.degree === 1) {
        return linear(this.curve.cp, this.curve.elements,
      (u - this.curve.uoffset) * this.curve.umul);
      }
      return this.curve.evaluate(u);
    };
/**
 * TODO: Not documented yet.
 * @param {*} u
 * @returns {*} Return value.
 * @memberof! H3DU.BezierCurve#
 */
    H3DU.BezierCurve.prototype.tangent = function(u) {
      if(this.curve.degree === 2) {
        return bezierQuadraticDerivative(this.curve.cp, this.curve.elements,
      (u - this.curve.uoffset) * this.curve.umul);
      }
      if(this.curve.degree === 3) {
        return bezierCubicDerivative(this.curve.cp, this.curve.elements,
      (u - this.curve.uoffset) * this.curve.umul);
      }
      if(this.curve.degree === 1) {
        return subtract(this.curve.cp[1], this.curve.cp[0]);
      }
      return this.curve.evaluate(u);
    };

/**
 * A parametric evaluator for B&eacute;zier surfaces.<p>
 * A B&eacute;zier surface is defined by a series of control points, where
 * the control points on each corner define the endpoints of the surface, and
 * the remaining control points define the surface's shape, though they don't
 * necessarily cross the surface.
 * @class
 * @alias H3DU.BezierSurface
 * @param {Array<Array<Number>>} cp An array of control point
 * arrays, which in turn contain a number of control points. Each
 * control point is an array with the same length as the other control points.
 * It is assumed that:<ul>
 * <li>The length of this parameter minus 1 represents the degree of the B&eacute;zier
 * surface along the V axis. For example, a degree-3 (cubic) surface along the V axis
 * contains 4 control points, one in each control point array. A degree of 1 on
 * both the U and V axes results in a flat surface.
 * <li>The length of the first control point array minus 1 represents the degree of the B&eacute;zier
 * surface along the U axis.
 * <li>The number of elements in the first control point's represents the number of elements in all the control points.
 * </ul>
 * @param {Number} [u1] Starting point for the purpose of interpolation along the
 * U axis; it will correspond to 0.
 * May be omitted; default is 0.
 * @param {Number} [u2] Ending point for the purpose of interpolation along the
 * U axis; it will correspond to 1.
 * May be omitted; default is 1.
 * @param {Number} [v1] Starting point for the purpose of interpolation along the
 * V axis; it will correspond to 0.
 * May be omitted; default is 0.
 * @param {Number} [v2] Ending point for the purpose of interpolation along the
 * V axis; it will correspond to 1.
 * May be omitted; default is 1.
 */
    H3DU.BezierSurface = function(cp, u1, u2, v1, v2) {
      this.curve = new H3DU._PolynomialSurface(cp, u1, u2, v1, v2);
      this.curve.setBasis(makeBezierMatrix(this.curve.degreeU),
          makeBezierMatrix(this.curve.degreeV), this.curve.degreeU,
      this.curve.degreeV);
    };

/**
 * Evaluates the surface function based on a point
 * in a B&eacute;zier surface.
 * @param {Number} u U coordinate of the surface to evaluate (generally within the range
 * given in the constructor).
 * @param {Number} v V coordinate of the surface to evaluate.
 * @returns {Array<Number>} An array of the result of
 * the evaluation. It will have as many elements as a control point, as specified in the constructor.
 * @memberof! H3DU.BezierSurface#
 */
    H3DU.BezierSurface.prototype.evaluate = function(u, v) {
      return this.curve.evaluate(u, v);
    };
/**
 * Finds the [tangent vector]{@link H3DU.SurfaceEval#vertex} at the given point on this surface.
 * @param {Number} u U coordinate of the surface to evaluate (generally within the range
 * given in the constructor).
 * @param {Number} v V coordinate of the surface to evaluate.
 * @returns {Array<Number>} An array of the tangent vector at the given U and V
 * coordinates. It will have as many elements as a control point, as specified in the constructor.
 * @memberof! H3DU.BezierSurface#
 */
    H3DU.BezierSurface.prototype.tangent = function(u, v) {
      return this.curve.tangent(u, v);
    };
/**
 * Finds the [bitangent vector]{@link H3DU.SurfaceEval#vertex} at the given point on this surface.
 * @param {Number} u U coordinate of the surface to evaluate (generally within the range
 * given in the constructor).
 * @param {Number} v V coordinate of the surface to evaluate.
 * @returns {Array<Number>} An array of the bitangent vector at the given U and V
 * coordinates. It will have as many elements as a control point, as specified in the constructor.
 * @memberof! H3DU.BezierSurface#
 */
    H3DU.BezierSurface.prototype.bitangent = function(u, v) {
      return this.curve.bitangent(u, v);
    };
/**
 * Creates a B&eacute;zier curve from the control points of a Hermite curve.
 * @param {Array<Array<Number>>} curve An array of four control points,
 * each with the same number of elements. The first and second control points
 * are the start and end points of the Hermite curve, respectively; the third control
 * point is the tangent vector (derivative) at the start point; and the fourth control point is
 * the tangent vector at the end point.
 * @param {Number} [u1] Starting point for the purpose of interpolation; it will correspond to 0.
 * May be omitted; default is 0.
 * @param {Number} [u2] Ending point for the purpose of interpolation; it will correspond to 1.
 * May be omitted; default is 1.
 * @returns {H3DU.BezierCurve} A B&eacute;zier curve describing the same path as the Hermite curve.
 * @memberof! H3DU.BezierCurve#
 */
    H3DU.BezierCurve.fromHermiteCurve = function(curve, u1, u2) {
      // TODO: consider making this an extra, for splines
      var ret = [[], [], [], []];
      for(var i = 0; i < curve[0].length; i++) {
        var p1 = curve[0][i];
        var p4 = curve[1][i];
        var p2 = p1 + curve[2][i] / 3;
        var p3 = p4 - curve[3][i] / 3;
        ret[0][i] = p1;
        ret[1][i] = p2;
        ret[2][i] = p3;
        ret[3][i] = p4;
      }
      return new H3DU.BezierCurve(ret, u1, u2);
    };

/** @private */
    H3DU.BezierCurve._lerp = function(a, b, t) {
      var ret = [];
      for(var i = 0; i < a.length; i++) {
        ret[i] = a[i] + (b[i] - a[i]) * t;
      }
      return ret;
    };
/** @private */
    H3DU.BezierCurve.prototype._makeNew = function(c) {
      var ret = new H3DU.BezierCurve(c);
      ret.curve.uoffset = this.curve.uoffset;
      ret.curve.umul = this.curve.umul;
      return ret;
    };
/**
 * TODO: Not documented yet.
 * @returns {*} Return value.
 * @memberof! H3DU.BezierCurve#
 */
    H3DU.BezierCurve.prototype.getPoints = function() {
      return this.curve.cp;
    };
/**
 * Splits this B&eacute;zier curve into two.
 * @param {Number} u U coordinate of the point in the curve to split it in two (generally within the range
 * given in the constructor).
 * @returns {Array<BezierCurve>} An array of two B&eacute;zier curves: the
 * first is the curve from the start of the original curve to the point given in "u", and the second
 * is the curve from that point to the end of the original curve.
 * @memberof! H3DU.BezierCurve#
 */
    H3DU.BezierCurve.prototype.split = function(u) {
      var tu = (u - this.curve.uoffset) * this.curve.umul;
      if(this.curve.degree === 0)return [this, this];
      var points = this.curve.cp;
      var buffer = [];
      var front = [];
      var back = [];
      var stage = points.length;
      var frontIndex = 0;
      var backIndex = this.curve.degree;
      front[frontIndex] = points[frontIndex];
      back[backIndex] = points[backIndex];
      frontIndex++;
      backIndex--;
      while(stage > 1) {
        for(var i = 0; i < stage - 1; i++) {
          buffer[i] = H3DU.BezierCurve._lerp(points[i], points[i + 1], tu);
        }
        front[frontIndex] = buffer[0];
        back[backIndex] = buffer[stage - 2];
        frontIndex++;
        backIndex--;
        points = buffer;
        stage--;
      }
      return [this._makeNew(front), this._makeNew(back)];
    };
  }(H3DU));

/**
 * A parametric evaluator for B-spline (basis spline) curves.
 * @class
 * @alias H3DU.BSplineCurve
 * @param {Array<Array<Number>>} controlPoints An array of control points. Each
 * control point is an array with the same length as the other control points.
 * It is assumed that the first control point's length represents the size of all the control
 * points.
 * @param {Array<Number>} knots Knot vector of the curve.
 * Its size must be at least 2 plus the number of control
 * points and not more than twice the number of control points.<p>
 * The length of this parameter minus 1, minus the number
 * of control points, represents the <i>degree</i> of the B-spline
 * curve. For example, a degree-3 (cubic) B-spline curve contains 4 more
 * knots than the number of control points. A degree of 1
 * results in straight line segments.<p>
 * The knot vector must be a monotonically nondecreasing sequence and
 * the first knot must not equal the last.<p>
 * If the difference between one knot and the next isn't the same,
 * the curve is considered a <i>non-uniform</i>
 * B-spline curve.<p>
 * If there are N times 2 knots with the first N knots equal to 0 and the rest
 * equal to 1, where N is the number of control points,
 * the control points describe a <i>B&eacute;zier</i> curve, in which the
 * first and last control points match the curve's end points.<p>
 * @param {Boolean} [bits] Bits for defining input
 * and controlling output. Zero or more of H3DU.BSplineCurve.WEIGHTED_BIT,
 * H3DU.BSplineCurve.HOMOGENEOUS_BIT,
 * and H3DU.BSplineCurve.DIVIDE_BIT. If null or omitted, no bits are set.
 */
  H3DU.BSplineCurve = function(controlPoints, knots, bits) {
    if(controlPoints.length <= 0)throw new Error();
    if(!knots)throw new Error();
    this.bits = bits || 0;
    var order = knots.length - controlPoints.length;
    if(order < 2 || order > controlPoints.length)
      throw new Error();
    H3DU.BSplineCurve._checkKnots(knots);
    this.cplen = controlPoints[0].length;
    var cplenNeeded = 1;
    if((this.bits & (H3DU.BSplineCurve.WEIGHTED_BIT | H3DU.BSplineCurve.DIVIDE_BIT)) !== 0) {
      cplenNeeded = 2;
    }
    if((this.bits & H3DU.BSplineCurve.WEIGHTED_BIT) !== 0) {
      this.cplen--;
    }
    if(this.cplen < cplenNeeded)throw new Error();
    this.knots = knots;
    this.buffer = [];
    this.controlPoints = controlPoints;
  };

/**
 * Indicates whether the last coordinate of each control point is a
 * weight. If some of the weights differ, the curve is
 * considered a <i>rational</i> B-spline curve.
 * If this bit is set, the length of each control point must be at least 2,
 * and points returned by the curve's <code>evaluate</code>
 * method will be in homogeneous coordinates.
 * @const
 * @default
 * @memberof! H3DU.BSplineCurve
 */
  H3DU.BSplineCurve.WEIGHTED_BIT = 1;
/**
 * Indicates to divide each other coordinate of the returned point
 * by the last coordinate of the point and omit the last
 * coordinate. This is used with WEIGHTED_BIT to convert
 * homogeneous coordinates to conventional coordinates.
 * If this bit is set, the length of each control point must be at least 2.
 * @const
 * @default
 * @memberof! H3DU.BSplineCurve
 */
  H3DU.BSplineCurve.DIVIDE_BIT = 2;
/**
 * Indicates that each other coordinate of each control point
 * was premultiplied by the last coordinate of the point, that is,
 * each control point is in homogeneous coordinates.
 * Only used with WEIGHTED_BIT.
 * @const
 * @default
 * @memberof! H3DU.BSplineCurve
 */
  H3DU.BSplineCurve.HOMOGENEOUS_BIT = 4;
/**
 * Combination of WEIGHTED_BIT and DIVIDE_BIT.
 * @const
 * @memberof! H3DU.BSplineCurve
 */
  H3DU.BSplineCurve.WEIGHTED_DIVIDE_BITS = 3;
/** @private */
  H3DU.BSplineCurve._checkKnots = function(knots) {
    for(var i = 1; i < knots.length; i++) {
      if(knots[i] < knots[i - 1])
        throw new Error();
    }
    if(knots[0] === knots[knots.length - 1])throw new Error();
  };
/** @private */
  H3DU.BSplineCurve._getFactors = function(kn, t, order, numPoints, buffer) {
    var c = 1;
    for(var i = 0; i < numPoints; i++) {
      buffer[i] = 0;
    }
    if(t === kn[0]) {
      buffer[0] = 1;
    } else if(t === kn[kn.length - 1]) {
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
      var tmp = [];
      c = k - 1;
      tmp[k] = 1;
      for(var kk = 2; kk <= order; kk++, c--) {
        for(i = c; i <= k; i++) {
          var ret = 0,
            divisor = 0;
          var prv = i <= c ? 0 : tmp[i];
          var nxt = i >= k ? 0 : tmp[i + 1];
          if(prv !== 0) {
            divisor = kn[i + kk - 1] - kn[i];
            ret += divisor === 0 ? 0 : prv * (t - kn[i]) / divisor;
          }
          if(nxt !== 0) {
            var ikk = kn[i + kk];
            divisor = ikk - kn[i + 1];
            ret += divisor === 0 ? 0 : nxt * (ikk - t) / divisor;
          }
          buffer[i] = ret;
        }
        if(kk < order) {
          for(i = c; i <= k; i++) {
            tmp[i] = buffer[i];
          }
        }
      }
    }
  };

/**
 * Evaluates the curve function based on a point
 * in a B-spline curve.
 * @param {Number} u Point on the curve to evaluate (from 0 through 1).
 * @returns {Array<Number>} An array of the result of
 * the evaluation. Its length will be equal to the
 * length of a control point (minus 1 if DIVIDE_BIT is set), as specified in the constructor.
 * @example
 * // Generate 11 points forming the B-spline curve.
 * var points=[];
 * for(var i=0;i<=10;i++) {
 * points.push(curve.evaluate(i/10.0));
 * }
 * @memberof! H3DU.BSplineCurve#
 */
  H3DU.BSplineCurve.prototype.evaluate = function(u) {
    var numPoints = this.controlPoints.length;
    var order = this.knots.length - numPoints;
    u = this.knots[order - 1] + u * (this.knots[numPoints] -
    this.knots[order - 1]);
    H3DU.BSplineCurve._getFactors(this.knots, u, order, numPoints,
     this.buffer);
    var ret = [];
    var i, j, point;
    if((this.bits & H3DU.BSplineCurve.WEIGHTED_BIT) === 0) {
      ret = [];
      for(i = 0; i < this.cplen; i++) {
        point = 0;
        for(j = 0; j < numPoints; j++) {
          point += this.controlPoints[j][i] * this.buffer[j];
        }
        ret[i] = point;
      }
      if((this.bits & H3DU.BSplineCurve.DIVIDE_BIT) !== 0) {
        for(i = 0; i < this.cplen - 1; i++) {
          ret[i] /= ret[this.cplen - 1];
        }
        ret = ret.slice(0, this.cplen - 1);
      }
      return ret;
    } else {
  // this is a weighted NURBS
      var weight = 0;
      for(j = 0; j < numPoints; j++) {
        weight += this.buffer[j] * this.controlPoints[j][this.cplen];
      }
      var homogen = (this.bits & H3DU.BSplineCurve.HOMOGENEOUS_BIT) !== 0;
      for(i = 0; i < this.cplen + 1; i++) {
        point = 0;
        for(j = 0; j < numPoints; j++) {
          var w = this.buffer[j];
          if(!homogen)w *= this.controlPoints[j][this.cplen];
          point += this.controlPoints[j][i] * w;
        }
        ret[i] = point / weight;
      }
      if((this.bits & H3DU.BSplineCurve.DIVIDE_BIT) !== 0) {
        for(i = 0; i < this.cplen; i++) {
          ret[i] /= ret[this.cplen];
        }
        ret = ret.slice(0, this.cplen);
      }
      return ret;
    }
  };

/**
 * A parametric evaluator for B-spline (basis spline) surfaces.
 * @class
 * @alias H3DU.BSplineSurface
 * @param {Array<Array<Number>>} controlPoints An array of control point
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
 * @param {Array<Number>} knotsU Knot vector of the curve, along the U axis.
 * For more information, see {@link H3DU.BSplineCurve}.
 * @param {Array<Number>} knotsV Knot vector of the curve, along the V axis.
 * @param {Boolean} [bits] Bits for defining input
 * and controlling output. Zero or more of H3DU.BSplineCurve.WEIGHTED_BIT,
 * H3DU.BSplineCurve.HOMOGENEOUS_BIT,
 * and H3DU.BSplineCurve.DIVIDE_BIT. If null or omitted, no bits are set.
 */
  H3DU.BSplineSurface = function(controlPoints, knotsU, knotsV, bits) {
    var vcplen = controlPoints.length;
    if(vcplen <= 0)throw new Error();
    var ucplen = controlPoints[0].length;
    if(ucplen <= 0)throw new Error();
    var cplen = controlPoints[0][0].length;
    var cplenNeeded = 1;
    this.bits = bits || 0;
    if((this.bits & (H3DU.BSplineCurve.WEIGHTED_BIT | H3DU.BSplineCurve.DIVIDE_BIT)) !== 0) {
      cplenNeeded = 2;
    }
    if((this.bits & (H3DU.BSplineCurve.WEIGHTED_BIT | H3DU.BSplineCurve.HOMOGENEOUS_BIT)) !== 0) {
      cplen--;
    }
    if(cplen < cplenNeeded)throw new Error();
    if(!knotsU || !knotsV)throw new Error();
    this.orderU = knotsU.length - ucplen;
    this.orderV = knotsV.length - vcplen;
    this.vcplen = vcplen;
    this.ucplen = ucplen;
    this.cplen = cplen;
    if(this.orderU < 2 || this.orderU > ucplen)throw new Error();
    if(this.orderV < 2 || this.orderV > vcplen)throw new Error();
    H3DU.BSplineCurve._checkKnots(knotsU);
    H3DU.BSplineCurve._checkKnots(knotsV);
    this.knotsU = knotsU;
    this.knotsV = knotsV;
    this.bufferU = [];
    this.bufferV = [];
    this.controlPoints = controlPoints;
  };
/**
 * Creates a B-spline curve with uniform knots, except that
 * the curve will start and end at the first and last control points and will
 * be tangent to the line between the first and second control points
 * and to the line between the next-to-last and last control points.
 * @param {Array<Array<Number>>} controlPoints Array of
 * control points as specified in the {@link H3DU.BSplineCurve} constructor.
 * @param {Number} [degree] Degree of the B-Spline
 * curve. For example, 3 means a degree-3 (cubic) curve.
 * If null or omitted, the default is 3.
 * @param {Number} [bits] Bits as specified in the {@link H3DU.BSplineCurve} constructor.
 * @returns {H3DU.BSplineCurve} Return value.
 * @memberof! H3DU.BSplineCurve
 */
  H3DU.BSplineCurve.clamped = function(controlPoints, degree, bits) {
    return new H3DU.BSplineCurve(controlPoints,
   H3DU.BSplineCurve.clampedKnots(controlPoints.length, degree), bits);
  };
/**
 * Creates a B-spline curve with uniform knots.
 * @param {Array<Array<Number>>} controlPoints Array of
 * control points as specified in the {@link H3DU.BSplineCurve} constructor.
 * @param {Number} [degree] Degree of the B-Spline
 * curve. For example, 3 means a degree-3 (cubic) curve.
 * If null or omitted, the default is 3.
 * @param {Number} [bits] Bits as specified in the {@link H3DU.BSplineCurve} constructor.
 * @returns {H3DU.BSplineCurve} Return value.
 * @memberof! H3DU.BSplineCurve
 */
  H3DU.BSplineCurve.uniform = function(controlPoints, degree, bits) {
    return new H3DU.BSplineCurve(controlPoints,
   H3DU.BSplineCurve.uniformKnots(controlPoints.length, degree), bits);
  };
/**
 * Creates a B-spline surface with uniform knots, except that
 * the surface's edges lie on the edges of the control point array.
 * @param {Array<Array<Array<Number>>>} controlPoints Array of
 * control point arrays as specified in the {@link H3DU.BSplineSurface} constructor.
 * @param {Number} [degreeU] Degree of the B-Spline
 * surface along the U axis. For example, 3 means a degree-3 (cubic) curve.
 * If null or omitted, the default is 3.
 * @param {Number} [degreeV] Degree of the B-Spline
 * surface along the V axis
 * If null or omitted, the default is 3.
 * @param {Number} [bits] Bits as specified in the {@link H3DU.BSplineSurface} constructor.
 * @returns {H3DU.BSplineSurface} Return value.
 * @memberof! H3DU.BSplineSurface
 */
  H3DU.BSplineSurface.clamped = function(controlPoints, degreeU, degreeV, bits) {
    return new H3DU.BSplineSurface(controlPoints,
   H3DU.BSplineCurve.clampedKnots(controlPoints[0].length, degreeU),
   H3DU.BSplineCurve.clampedKnots(controlPoints.length, degreeV), bits);
  };
/**
 * Creates a B-spline surface with uniform knots.
 * @param {Array<Array<Array<Number>>>} controlPoints Array of
 * control point arrays as specified in the {@link H3DU.BSplineSurface} constructor.
 * @param {Number} [degreeU] Degree of the B-Spline
 * surface along the U axis. For example, 3 means a degree-3 (cubic) curve.
 * If null or omitted, the default is 3.
 * @param {Number} [degreeV] Degree of the B-Spline
 * surface along the V axis
 * If null or omitted, the default is 3.
 * @param {Number} [bits] Bits as specified in the {@link H3DU.BSplineSurface} constructor.
 * @returns {H3DU.BSplineSurface} Return value.
 * @memberof! H3DU.BSplineSurface
 */
  H3DU.BSplineSurface.uniform = function(controlPoints, degreeU, degreeV, bits) {
    return new H3DU.BSplineSurface(controlPoints,
   H3DU.BSplineCurve.uniformKnots(controlPoints[0].length, degreeU),
   H3DU.BSplineCurve.uniformKnots(controlPoints.length, degreeV), bits);
  };
/**
 * Generates a knot vector with uniform knots, to be
 * passed to the {@link H3DU.BSplineCurve} or {@link H3DU.BSplineCurve} constructor.
 * @param {Number} controlPoints Number of control points the curve will have.
 * @param {Number} degree Degree of the B-Spline
 * curve. For example, 3 means a degree-3 (cubic) curve.
 * If null or omitted, the default is 3.
 * @returns {Array<Number>} A uniform knot vector.
 * @memberof! H3DU.BSplineCurve
 */
  H3DU.BSplineCurve.uniformKnots = function(controlPoints, degree) {
    if(typeof controlPoints === "object")
      controlPoints = controlPoints.length;
    if(typeof degree === "undefined" || degree === null)degree = 3;
    if(controlPoints < degree + 1)
      throw new Error("too few control points for degree " + degree + " curve");
    var order = degree + 1;
    var ret = [];
    for(var i = 0; i < controlPoints + order; i++) {
      ret.push(i);
    }
    return ret;
  };
/**
 * Generates a knot vector with uniform knots, to be
 * passed to the {@link H3DU.BSplineCurve} or {@link H3DU.BSplineCurve} constructor,
 * except that with the knot vector, curve will start and end at the first and last control points and will
 * be tangent to the line between the first and second control points
 * and to the line between the next-to-last and last control points.
 * @param {Number} controlPoints Number of control points the curve will have.
 * @param {Number} degree Degree of the B-Spline
 * curve. For example, 3 means a degree-3 (cubic) curve.
 * If null or omitted, the default is 3.
 * @returns {Array<Number>} A clamped uniform knot vector.
 * @memberof! H3DU.BSplineCurve
 */
  H3DU.BSplineCurve.clampedKnots = function(controlPoints, degree) {
    if(typeof controlPoints === "object")
      controlPoints = controlPoints.length;
    if(typeof degree === "undefined" || degree === null)degree = 3;
    if(controlPoints < degree + 1)
      throw new Error("too few control points for degree " + degree + " curve");
    var order = degree + 1;
    var extras = controlPoints - order;
    var ret = [];
    for(var i = 0; i < order; i++) {
      ret.push(0);
    }
    for(i = 0; i < extras; i++) {
      ret.push(i + 1);
    }
    for(i = 0; i < order; i++) {
      ret.push(extras + 1);
    }
    return ret;
  };

/**
 * Evaluates the surface function based on a point
 * in a B-spline surface.
 * @param {Number} u U coordinate of the surface to evaluate (from 0 through 1).
 * @param {Number} v V coordinate of the surface to evaluate.
 * @returns {Array<Number>} An array of the result of
 * the evaluation. It will have as many elements as a control point (or one fewer
 * if DIVIDE_BIT is set), as specified in the constructor.
 * @memberof! H3DU.BSplineSurface#
 */
  H3DU.BSplineSurface.prototype.evaluate = function(u, v) {
    u = this.knotsU[this.orderU - 1] + u * (this.knotsU[this.ucplen] -
    this.knotsU[this.orderU - 1]);
    v = this.knotsV[this.orderV - 1] + v * (this.knotsV[this.vcplen] -
    this.knotsV[this.orderV - 1]);
    var bu = this.bufferU;
    var bv = this.bufferV;
    var tt, uu, w, i, value;
    if(this.orderU === this.orderV) {
      H3DU.BSplineCurve._getFactors(this.knotsU, u, this.orderU, this.ucplen,
     this.bufferU);
      H3DU.BSplineCurve._getFactors(this.knotsV, v, this.orderV, this.vcplen,
     this.bufferV);
    } else {
      H3DU.BSplineCurve._getFactors(this.knotsU, u, this.orderU, this.ucplen,
     this.bufferU);
      H3DU.BSplineCurve._getFactors(this.knotsV, v, this.orderV, this.vcplen,
     this.bufferV);
    }
    var output = [];
    if((this.bits & H3DU.BSplineCurve.WEIGHTED_BIT) === 0) {
      for(i = 0; i < this.cplen; i++) {
        value = 0;
        for(tt = 0; tt < this.ucplen; tt++) {
          for(uu = 0; uu < this.vcplen; uu++) {
            value += this.controlPoints[uu][tt][i] * bu[tt] * bv[uu];
          }
        }
        output[i] = value;
      }
      if((this.bits & H3DU.BSplineCurve.DIVIDE_BIT) !== 0) {
        for(i = 0; i < this.cplen - 1; i++) {
          output[i] /= output[this.cplen - 1];
        }
        output = output.slice(0, this.cplen - 1);
      }
      return output;
    } else {
  // this is a weighted NURBS
      var weight = 0;
      var homogen = (this.bits & H3DU.BSplineCurve.HOMOGENEOUS_BIT) !== 0;
      for(tt = 0; tt < this.ucplen; tt++) {
        for(uu = 0; uu < this.vcplen; uu++) {
          w = bu[tt] * bv[uu] * this.controlPoints[uu][tt][this.cplen];
          weight += w;
        }
      }
      for(i = 0; i < this.cplen + 1; i++) {
        value = 0;
        weight = 0;
        for(tt = 0; tt < this.ucplen; tt++) {
          for(uu = 0; uu < this.vcplen; uu++) {
            w = bu[tt] * bv[uu];
            if(!homogen)w *= this.controlPoints[uu][tt][this.cplen];
            value += this.controlPoints[uu][tt][i] * w;
          }
        }
        output[i] = weight === 0 ? value : value / weight;
      }
      if((this.bits & H3DU.BSplineCurve.DIVIDE_BIT) !== 0) {
        for(i = 0; i < this.cplen; i++) {
          output[i] /= output[this.cplen];
        }
        output = output.slice(0, this.cplen);
      }
      return output;
    }
  };

/**
 * An evaluator of parametric curve functions for generating
 * vertex positions and colors of a curve.<p>
 * A parametric curve is a curve whose points are based on a
 * parametric curve function. A curve function takes a number
 * (U) and returns a point (in 1, 2, 3 or more dimensions, but
 * usually 2 or 3) that lies on the curve. For example, in 3
 * dimensions, a curve function has the following form:<p>
 * <b>F</b>(u) = [ x(u), y(u), z(u) ]<p>
 * where x(u) returns an X coordinate, y(u) a Y coordinate,
 * and z(u) returns a Z coordinate.<p>
 * For more information, see the {@tutorial surfaces} tutorial.
 * @class
 * @alias H3DU.CurveEval
 */
  H3DU.CurveEval = function() {
    this.colorCurve = null;
    this.normalCurve = null;
    this.texCoordCurve = null;
    this.vertexCurve = null;
  };

/**
 * Specifies a parametric curve function for generating vertex positions.
 * @param {Object} evaluator An object that may or must contain the
 * following methods:<ul>
 * <li>evaluate(<code>u</code>) - A method that takes a curve coordinate (<code>u</code>),
 * generally from 0 to 1. This method is required. This method returns an array of the result of the evaluation.
 * <li>tangent(<code>u</code>) - A method that takes the same parameter as "evaluate"
 * and returns the tangent of the surface at the given coordinate.<p>
 * The <b>tangent</b> of a curve is a vector which is the derivative of the "evaluate" method at the given coordinate.  The tangent vector returned by the "tangent" method should not be "normalized" to a [unit vector]{@link tutorial}.
 * This method is optional.
 * </ul>
 * @returns {H3DU.CurveEval} This object.
 * @example <caption>The following function sets a circle as the curve
 * to use for generating vertex positions.</caption>
 * // "u" can range from 0 to 2*Math.PI
 * curveEval.vertex({"evaluate":function(u) {
 * "use strict";
 * return [Math.cos(u),Math.sin(u),0]
 * }});
 * @memberof! H3DU.CurveEval#
 */
  H3DU.CurveEval.prototype.vertex = function(evaluator) {
    // TODO: Document the "normal" method of evaluators.
    // TODO: Change the deprecation reason for CurveEval#normal
    this.vertexCurve = evaluator;
    return this;
  };
/**
 * Specifies a parametric curve function for generating normals.
 * @deprecated May be removed in the future; it makes little sense
 * to generate normals for a curve.
 * @param {Object} evaluator An object that must contain a function
 * named "evaluate", giving 3 values as a result. See {@link H3DU.CurveEval#vertex}.
 * </ul>
 * @returns {H3DU.CurveEval} This object.
 * @memberof! H3DU.CurveEval#
 */
  H3DU.CurveEval.prototype.normal = function(evaluator) {
    this.normalCurve = evaluator;
    return this;
  };
/**
 * Specifies a parametric curve function for generating color values.
 * @param {Object} evaluator An object that must contain a function
 * named "evaluate", giving 3 values as a result. See {@link H3DU.CurveEval#vertex}.
 * </ul>
 * @returns {H3DU.CurveEval} This object.
 * @memberof! H3DU.CurveEval#
 */
  H3DU.CurveEval.prototype.color = function(evaluator) {
    this.colorCurve = evaluator;
    return this;
  };
/**
 * Specifies a parametric curve function for generating texture coordinates.
 * @param {Object} evaluator An object that must contain a function
 * named "evaluate", giving one or two values as a result. See {@link H3DU.CurveEval#vertex}.
 * </ul>
 * @returns {H3DU.CurveEval} This object.
 * @memberof! H3DU.CurveEval#
 */
  H3DU.CurveEval.prototype.texCoord = function(evaluator) {
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
 * @param {Number} u Point of the curve to evaluate.
 * @returns {H3DU.CurveEval} This object.
 * @memberof! H3DU.CurveEval#
 */
  H3DU.CurveEval.prototype.evalOne = function(mesh, u) {
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
      normal = this.normalCurve.evaluate(u);
    }
    if(this.vertexCurve) {
      var oldColor = color ? mesh.color.slice(0, 3) : null;
      var oldNormal = normal ? mesh.normal.slice(0, 3) : null;
      var oldTexCoord = texcoord ? mesh.texCoord.slice(0, 2) : null;
      if(color)mesh.color3(color[0], color[1], color[2]);
      if(normal)mesh.normal3(normal[0], normal[1], normal[2]);
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
/** @private */
  H3DU.CurveEval.prototype._evalOneSimplified = function(mesh, u) {
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
 * @param {Number} [mode] If this value is H3DU.Mesh.LINES, or is null
 * or omitted, generates
 * a series of lines defining the curve. If this value is H3DU.Mesh.POINTS,
 * generates a series of points along the curve. For any other value,
 * this method has no effect.
 * @param {Number} [n] Number of subdivisions of the curve to be drawn.
 * May be omitted; default is 24.
 * @param {Number} [u1] Starting point of the curve (within the range
 * given in the <code>vector</code>, <code>normal</code>,
 * <code>color</code>, and <code>texCoord</code> methods).
 * May be omitted; default is 0.
 * @param {Number} [u2] Ending point of the curve (within the range
 * given in the <code>vector</code>, <code>normal</code>,
 * <code>color</code>, and <code>texCoord</code> methods).
 * May be omitted; default is 1.
 * @returns {H3DU.CurveEval} This object.
 * @memberof! H3DU.CurveEval#
 */
  H3DU.CurveEval.prototype.evalCurve = function(mesh, mode, n, u1, u2) {
    if(typeof n === "undefined")n = 24;
    if(n <= 0)throw new Error("invalid n");
    if(typeof u1 === "undefined" && typeof u2 === "undefined") {
      u1 = 0.0;
      u2 = 1.0;
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
 * vertex positions, normals, colors, and texture coordinates
 * of a surface.<p>
 * A parametric surface is a surface whose points are based on a
 * parametric surface function. A surface function takes two numbers
 * (U and V) and returns a point (in 1, 2, 3 or more dimensions, but
 * usually 2 or 3) that lies on the surface. For example, in 3
 * dimensions, a surface function has the following form:<p>
 * <b>F</b>(u, v) = [ x(u, v), y(u, v), z(u, v) ]<p>
 * where x(u, v) returns an X coordinate, y(u, v) a Y coordinate,
 * and z(u, v) returns a Z coordinate.<p>
 * See the {@tutorial surfaces} tutorial for more information.
 * @class
 * @alias H3DU.SurfaceEval
 */
  H3DU.SurfaceEval = function() {
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
 * @memberof! H3DU.SurfaceEval#
 */
  H3DU.SurfaceEval.prototype.setAutoNormal = function(value) {
    this.autoNormal = !!value;
    return this;
  };
/**
 * Specifies a parametric surface function for generating vertex positions.
 * @param {Object} evaluator An object that may or must contain the
 * following methods:<ul>
 * <li>evaluate(<code>u</code>, <code>v</code>) - A method that takes a horizontal-axis coordinate (<code>u</code>),
 * generally from 0 to 1, and a vertical-axis coordinate (<code>v</code>), generally from 0 to 1.
 * This method is required. This method returns a vector of the result of the evaluation.
 * <li>gradient(<code>u</code>, <code>v</code>) - A method that takes the same parameters as "evaluate"
 * and returns the gradient of the surface at the given coordinates.<br>
 * The <b>gradient</b> is a vector pointing up and away from the surface, or alternatively,
 * the cross product of the tangent vector and bitangent vector, in that order. The gradient returned by this method should not be "normalized" to a [unit vector]{@tutorial glmath}.
 * This method is optional.
 * <li><a id="tangentvector"></a>tangent(<code>u</code>, <code>v</code>) - A method that takes the same parameters as "evaluate"
 * and returns the tangent vector of the surface at the given coordinates.<br>
 * The <b>tangent vector</b> is the vector pointing toward the U axis, or alternatively,
 * the partial derivative of the "evaluate" method with respect to U. The bitangent vector returned by this method should not be "normalized" to a [unit vector]{@tutorial glmath}.
 * <li><a id="bitangentvector"></a>bitangent(<code>u</code>, <code>v</code>) - A method that takes the same parameters as "evaluate"
 * and returns the bitangent vector of the surface at the given coordinates.
 * This method is optional.<br>
 * The <b>bitangent vector</b> is the vector pointing toward the V axis, or alternatively,
 * the partial derivative of the "evaluate" method with respect to V.  The bitangent vector returned by this method should not be "normalized" to a [unit vector]{@tutorial glmath}.
 * </ul>
 * @returns {H3DU.SurfaceEval} This object.
 * @memberof! H3DU.SurfaceEval#
 * @example <caption>The following example sets the vertex position and
 * normal generation
 * function for a parametric surface. To illustrate how the method is derived
 * from the vector calculation method, that method is also given below. To
 * derive the normal calculation, first look at the vector function:<p>
 * <b>F</b>(u, v) = (cos(u), sin(u), sin(u)*cos(v))<p>
 * Then, find the partial derivatives with respect to u and v:<p>
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
  H3DU.SurfaceEval.prototype.vertex = function(evaluator) {
    this.vertexSurface = evaluator;
    this.generateNormals = this.normalSurface || !!this.autoNormal ||
    typeof this.vertexSurface !== "undefined" && this.vertexSurface !== null &&
    (typeof this.vertexSurface.gradient !== "undefined" && this.vertexSurface.gradient !== null);
    return this;
  };
/**
 * Specifies a parametric surface function for generating normals.
 * @deprecated Use the "vertex" method instead, specifying an object
 * that implements a method named "gradient".
 * @param {Object} evaluator An object that must contain a function
 * named "evaluate", giving 3 values as a result. See {@link H3DU.SurfaceEval#vertex}.
 * </ul>
 * @returns {H3DU.SurfaceEval} This object.
 * @memberof! H3DU.SurfaceEval#
 */
  H3DU.SurfaceEval.prototype.normal = function(evaluator) {
    this.normalSurface = evaluator;
    this.generateNormals = this.normalSurface || !!this.autoNormal ||
    typeof this.vertexSurface !== "undefined" && this.vertexSurface !== null &&
    (typeof this.vertexSurface.gradient !== "undefined" && this.vertexSurface.gradient !== null);
    return this;
  };
/**
 * Specifies a parametric surface function for generating color values.
 * @param {Object} evaluator An object that must contain a function
 * named "evaluate", giving 3 values as a result. See {@link H3DU.SurfaceEval#vertex}.
 * </ul>
 * @returns {H3DU.SurfaceEval} This object.
 * @memberof! H3DU.SurfaceEval#
 */
  H3DU.SurfaceEval.prototype.color = function(evaluator) {
    this.colorSurface = evaluator;
    return this;
  };
/**
 * Specifies a parametric surface function for generating texture coordinates.
 * @param {Object} evaluator An object that must contain a function
 * named "evaluate", giving 2 values as a result. See {@link H3DU.SurfaceEval#vertex}.
 * </ul>
 * @returns {H3DU.SurfaceEval} This object.
 * @example <caption>The following example sets the surface
 * function to a linear evaluator. Thus, coordinates passed to the
 * evalOne and evalSurface methods will be interpolated as direct
 * texture coordinates.</caption>
 * surface.texCoord({"evaluate":function(u,v) {
 * "use strict"; return [u,v] }});
 * @memberof! H3DU.SurfaceEval#
 */
  H3DU.SurfaceEval.prototype.texCoord = function(evaluator) {
    this.texCoordSurface = evaluator;
    return this;
  };
/**
 * TODO: Not documented yet.
 * @param {Object} e An object described in {@link H3DU.SurfaceEval#vertex}.
 * @param {Number} u U coordinate of the surface to evaluate.
 * @param {Number} v V coordinate of the surface to evaluate.
 * @returns {Array<Number>} A gradient vector of at least 3 elements. */
  H3DU.SurfaceEval.numGradient = function(e, u, v) {
    // TODO: Decide whether this method should be public; if not, remove all calls elsewhere
    var bitan, tan;
    if(typeof e.bitangent !== "undefined" && e.bitangent !== null && (typeof e.tangent !== "undefined" && e.tangent !== null)) {
      bitan = e.bitangent(u, v);
      tan = e.tangent(u, v);
    } else {
      bitan = H3DU.SurfaceEval.numBitangent(e, u, v);
      tan = H3DU.SurfaceEval.numTangent(e, u, v);
    }
    if(H3DU.Math.vec3length(bitan) === 0) {
      return tan;
    }
    if(H3DU.Math.vec3length(tan) !== 0) {
      return H3DU.Math.vec3cross(tan, bitan);
    } else {
      return bitan;
    }
  };
/**
 * Finds an approximate tangent vector for the given surface evaluator
 * at the given U and V coordinates by using numerical differentiation
 * of the "evaluate" method with respect to the U axis.
 * The tangent vector is the vector pointing toward the U axis, or alternatively,
 * the partial derivative of the "evaluate" method with respect to U.
 * @param {Object} e An object described in {@link H3DU.SurfaceEval#vertex}.
 * @param {Number} u U coordinate of the surface to evaluate.
 * @param {Number} v V coordinate of the surface to evaluate.
 * @returns {Array<Number>} A tangent vector of at least 3 elements. */
  H3DU.SurfaceEval.numTangent = function(e, u, v) {
    // TODO: Decide whether this method should be public; if not, remove all calls elsewhere
    var du = 0.00001;
    var vertex = e.evaluate(u, v);
    var vector = e.evaluate(u + du, v);
    if(vector[0] === 0 && vector[1] === 0 && vector[2] === 0) {
    // too abrupt, try the other direction
      du = -du;
      vector = e.evaluate(u + du, v);
    }
    H3DU.Math.vec3subInPlace(vector, vertex);
    H3DU.Math.vec3scaleInPlace(vector, 1.0 / du);
    return vector;
  };
/**
 * Finds an approximate bitangent vector for the given surface evaluator
 * at the given U and V coordinates by using numerical differentiation
 * of the "evaluate" method with respect to the V axis.
 * The bitangent vector is the vector pointing toward the V axis, or alternatively,
 * the partial derivative of the "evaluate" method with respect to V.
 * @param {Object} e An object described in {@link H3DU.SurfaceEval#vertex}.
 * @param {Number} u U coordinate of the surface to evaluate.
 * @param {Number} v V coordinate of the surface to evaluate.
 * @returns {Array<Number>} A bitangent vector of at least 3 elements. */
  H3DU.SurfaceEval.numBitangent = function(e, u, v) {
    // TODO: Decide whether this method should be public; if not, remove all calls elsewhere
    var du = 0.00001;
    var vertex = e.evaluate(u, v);
   // Find the partial derivatives of u and v
    var vector = e.evaluate(u, v + du);
    if(vector[0] === 0 && vector[1] === 0 && vector[2] === 0) {
    // too abrupt, try the other direction
      du = -du;
      vector = e.evaluate(u, v + du);
    }
    H3DU.Math.vec3subInPlace(vector, vertex);
    H3DU.Math.vec3scaleInPlace(vector, 1.0 / du);
    return vector;
  };
/**
 * TODO: Not documented yet.
 * @param {Object} e An object described in {@link H3DU.CurveEval#vertex}.
 * @param {Number} u U coordinate of the curve to evaluate.
 * @returns {*} Return value. */
  H3DU.CurveEval.numTangent = function(e, u) {
    // TODO: Decide whether this method should be public; if not, remove all calls elsewhere
    var du = 0.00001;
    var vertex = e.evaluate(u);
   // Find the partial derivatives of u and v
    var vector = e.evaluate(u + du);
    if(vector[0] === 0 && vector[1] === 0 && vector[2] === 0) {
    // too abrupt, try the other direction
      du = -du;
      vector = e.evaluate(u + du);
    }
    H3DU.Math.vec3subInPlace(vector, vertex);
    H3DU.Math.vec3scaleInPlace(vector, 1.0 / du);
    return vector;
  };
/**
 * Finds an approximate [gradient vector]{@link H3DU.SurfaceEval#vertex} for
 * the given surface evaluator
 * at the given U and V coordinates. This method calls the evaluator's "gradient"
 * method if it implements it; otherwise, calls the evaluator's "bitangent" and "tangent" methods if it implements them; otherwise, does a numerical differentiation using the "evaluate" method.
 * <p>To generate normals for a function for a regular surface (usually
 * a continuous, unbroken surface such as a sphere, disk, or open
 * cylinder), find the <a href="http://en.wikipedia.org/wiki/Partial_derivative">partial derivative</a> of
 * the function used for vertex calculation (we'll call it <b>F</b>) with
 * respect to u, then find the partial derivative of <b>F</b> with respect to
 * v, then take their [cross product]{@link H3DU.Math.vec3cross}. The result will be
 * the gradient, which will be normal to the surface.
 * In mathematical notation, this looks like:
 * <b>c</b> = &#x2202;<b>F</b>/&#x2202;<i>u</i> &times;
 * &#x2202;<b>F</b>/&#x2202;<i>v</i>.<p>
 * (Note: These two partial derivatives are also called the [tangent vector]{@link H3DU.SurfaceEval#vertex}
 * and the [bitangent (or binormal) vector]{@link H3DU.SurfaceEval#vertex}, respectively.)
 * @param {Object} e An object described in {@link H3DU.SurfaceEval#vertex}.
 * @param {Number} u U coordinate of the surface to evaluate.
 * @param {Number} v V coordinate of the surface to evaluate.
 * @returns {Array<Number>} A gradient vector of at least 3 elements. */
  H3DU.SurfaceEval.findGradient = function(e, u, v) {
    return typeof e.gradient !== "undefined" && e.gradient !== null ? e.gradient(u, v) :
     H3DU.SurfaceEval.numGradient(e, u, v);
  };
/**
 * Finds an approximate [tangent vector]{@link H3DU.SurfaceEval#vertex} for the given surface evaluator
 * at the given U and V coordinates. This method calls the evaluator's "tangent"
 * method if it implements it; otherwise, does a numerical differentiation
 * with respect to the U axis using the "evaluate" method.
 * @param {Object} e An object described in {@link H3DU.SurfaceEval#vertex}.
 * @param {Number} u U coordinate of the surface to evaluate.
 * @param {Number} v V coordinate of the surface to evaluate.
 * @returns {Array<Number>} A tangent vector of at least 3 elements. */
  H3DU.SurfaceEval.findTangent = function(e, u, v) {
    return typeof e.tangent !== "undefined" && e.tangent !== null ? e.tangent(u, v) :
     H3DU.SurfaceEval.numTangent(e, u, v);
  };
/**
 * Finds an approximate [bitangent vector]{@link H3DU.SurfaceEval#vertex} for the given surface evaluator
 * at the given U and V coordinates. This method calls the evaluator's "bitangent"
 * method if it implements it; otherwise, does a numerical differentiation
 * with respect to the V axis using the "evaluate" method.
 * @param {Object} e An object described in {@link H3DU.SurfaceEval#vertex}.
 * @param {Number} u U coordinate of the surface to evaluate.
 * @param {Number} v V coordinate of the surface to evaluate.
 * @returns {Array<Number>} A bitangent vector of at least 3 elements. */
  H3DU.SurfaceEval.findBitangent = function(e, u, v) {
    return typeof e.bitangent !== "undefined" && e.bitangent !== null ? e.bitangent(u, v) :
     H3DU.SurfaceEval.numBitangent(e, u, v);
  };
/**
 * TODO: Not documented yet.
 * @param {Object} e An object described in {@link H3DU.CurveEval#vertex}.
 * @param {Number} u U coordinate of the curve to evaluate.
 * @returns {*} Return value. */
  H3DU.CurveEval.findTangent = function(e, u) {
    return typeof e.tangent !== "undefined" && e.tangent !== null ? e.tangent(u) :
     H3DU.CurveEval.numTangent(e, u);
  };

/** @private */
  H3DU._OLD_VALUES_SIZE = 8;
/** @private */
  H3DU._RECORDED_VALUES_SIZE = 11;
/**
 * Generates vertex positions and attributes based on a point
 * in a parametric surface.
 * @param {H3DU.Mesh} mesh H3DU.Mesh where vertex positions and attributes
 * will be generated. When this method returns, the current color, normal,
 * and texture coordinates will be the same as they were before the method
 * started.
 * @param {Number} u U coordinate of the curve to evaluate.
 * @param {Number} v V coordinate of the curve to evaluate.
 * @returns {H3DU.SurfaceEval} This object.
 * @memberof! H3DU.SurfaceEval#
 */
  H3DU.SurfaceEval.prototype.evalOne = function(mesh, u, v) {
    var values = [];
    this._saveValues(mesh, values, 0);
    this._record(u, v, values, H3DU._OLD_VALUES_SIZE);
    this._playBack(mesh, values, H3DU._OLD_VALUES_SIZE);
    this._restoreValues(mesh, values, 0);
    return this;
  };
/** @private */
  H3DU.SurfaceEval.prototype._recordAndPlayBack = function(mesh, u, v, buffer, index) {
    this._record(u, v, buffer, index);
    this._playBack(mesh, buffer, index);
  };
/** @private */
  H3DU.SurfaceEval.prototype._saveValues = function(mesh, buffer, index) {
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
/** @private */
  H3DU.SurfaceEval.prototype._restoreValues = function(mesh, buffer, index) {
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
/** @private */
  H3DU.SurfaceEval.prototype._record = function(u, v, buffer, index) {
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
      normal = H3DU.Math.vec3norm(this.vertexSurface.gradient(u, v));
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
        var gradient;
        if(typeof this.vertexSurface.gradient !== "undefined" && this.vertexSurface.gradient !== null) {
          gradient = this.vertexSurface.gradient(u, v);
        } else {
          gradient = H3DU.SurfaceEval.numGradient(
       this.vertexSurface, u, v);
        }
        H3DU.Math.vec3normInPlace(gradient);
        buffer[index + 3] = vu[0];
        buffer[index + 4] = vu[1];
        buffer[index + 5] = vu[2];
      }
    }
  };
/** @private */
  H3DU.SurfaceEval.prototype._playBack = function(mesh, buffer, index) {
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
 * @param {Number} [mode] If this value is H3DU.Mesh.TRIANGLES, or is null
 * or omitted, generates a series of triangles defining the surface. If
 * this value is H3DU.Mesh.LINES, generates
 * a series of lines defining the curve. If this value is H3DU.Mesh.POINTS,
 * generates a series of points along the curve. For any other value,
 * this method has no effect.
 * @param {Number} [un] Number of subdivisions along the U axis.
 * Default is 24.
 * @param {Number} [vn] Number of subdivisions along the V axis.
 * Default is 24.
 * @param {Number} [u1] Starting U coordinate of the surface to evaluate.
 * Default is 0.
 * @param {Number} [u2] Ending U coordinate of the surface to evaluate.
 * Default is 1.
 * @param {Number} [v1] Starting U coordinate of the surface to evaluate.
 * Default is 0.
 * @param {Number} [v2] Ending U coordinate of the surface to evaluate.
 * Default is 1.
 * @returns {H3DU.SurfaceEval} This object.
 * @memberof! H3DU.SurfaceEval#
 */
  H3DU.SurfaceEval.prototype.evalSurface = function(mesh, mode, un, vn, u1, u2, v1, v2) {
    if(typeof un === "undefined")un = 24;
    if(typeof vn === "undefined")vn = 24;
    if(un <= 0)throw new Error("invalid un");
    if(vn <= 0)throw new Error("invalid vn");
    if(typeof mode === "undefined" || mode === null)mode = H3DU.Mesh.TRIANGLES;
    if(typeof v1 === "undefined" && typeof v2 === "undefined") {
      v1 = 0.0;
      v2 = 1.0;
    }
    if(typeof u1 === "undefined" && typeof u2 === "undefined") {
      u1 = 0.0;
      u2 = 1.0;
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
      j++, prevIndex += H3DU._RECORDED_VALUES_SIZE) {
          jx = j * du + u1;
          if(i === 0) {
            this._recordAndPlayBack(mesh, jx, i * dv + v1, oldValues, H3DU._OLD_VALUES_SIZE);
          } else {
            this._playBack(mesh, previousValues, prevIndex);
          }
          if(i === vn - 1) {
            this._recordAndPlayBack(mesh, jx, (i + 1) * dv + v1, oldValues, H3DU._OLD_VALUES_SIZE);
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
  global.H3DU.SurfaceEval = H3DU.SurfaceEval;
  global.H3DU.CurveEval = H3DU.CurveEval;
  global.H3DU.BezierCurve = H3DU.BezierCurve;
  global.H3DU.BezierSurface = H3DU.BezierSurface;
  global.H3DU.BSplineCurve = H3DU.BSplineCurve;
  global.H3DU.BSplineSurface = H3DU.BSplineSurface;
}(this));

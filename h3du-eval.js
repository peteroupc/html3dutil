/*
 Any copyright to this file is released to the Public Domain.
 http://creativecommons.org/publicdomain/zero/1.0/
 If you like this, you should donate
 to Peter O. (original author of
 the Public Domain HTML 3D Library) at:
 http://peteroupc.github.io/
*/
/* global H3DU */
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
    function subtract(p1, p0, elementsPerValue) {
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
      var p2 = points[2];
      var p3 = points[3];
      for(var i = 0; i < elementsPerValue; i++) {
        var pp0 = p0[i];
        var pp1 = p1[i];
        var pp2 = p2[i];
        ret[i] = (-pp0 * 3 * t + pp0 * 6) * t + -pp0 * 3 +
   ((pp1 * 9 * t + -pp1 * 12) * t + pp1 * 3) +
   (-pp2 * 9 * t + pp2 * 6) * t +
   p3[i] * 3 * t * t;
      }
      return ret;
    }
    function bezierQuadratic(points, elementsPerValue, t) {
      var ret = [];
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
        this.u2 = 1;
      } else if(u1 === u2) {
        throw new Error("u1 and u2 can't be equal");
      } else {
        this.uoffset = u1;
        this.umul = 1.0 / (u2 - u1);
        this.u2 = u2;
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
      this.derivMatrix = makeDerivativeMatrix(this.matrix, degree + 1, degree + 1);
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
        this.u2 = 1;
        this.v2 = 1;
      } else if(u1 === u2) {
        throw new Error("u1 and u2 can't be equal");
      } else if(v1 === v2) {
        throw new Error("v1 and v2 can't be equal");
      } else {
        this.uoffset = u1;
        this.umul = 1.0 / (u2 - u1);
        this.voffset = v1;
        this.vmul = 1.0 / (v2 - v1);
        this.u2 = u2;
        this.v2 = v2;
      }
      this.degreeU = cp[0].length - 1;
      this.degreeV = cp.length - 1;
      this.matrixU = null;
      this.derivMatrixU = null;
      this.cp = cp;
      this.elements = cp[0][0].length;
    };

/** @private */
    H3DU._PolynomialSurface.prototype.endpoints = function() {
      return [this.uoffset, this.u2];
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
/** @private */
    H3DU._PolynomialSurface.prototype.endpoints = function() {
      return [this.uoffset, this.u2, this.voffset, this.v2];
    };

/**
 * A [curve evaluator object]{@link H3DU.CurveEval#vertex} for a B&eacute;zier curve.<p>
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
 * Default is 0.
 * @param {Number} [u2] Ending point for the purpose of interpolation; it will correspond to 1.
 * Default is 1.
 */
    H3DU.BezierCurve = function(cp, u1, u2) {
      this.curve = new H3DU._PolynomialCurve(cp, u1, u2);
      if(this.curve.degree > 3) {
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
 * Finds the [tangent]{@link H3DU.CurveEval#vertex} (derivative) of
 * this curve at the given point.
 * @param {Number} u Point on the curve to evaluate (generally within the range
 * given in the constructor).
 * @returns {Array<Number>} An array giving the tangent at the given point.
 * It will have as many elements as a control point, as specified in the constructor.
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
        return subtract(this.curve.cp[1], this.curve.cp[0], this.curve.elements);
      }
      return this.curve.evaluate(u);
    };
/**
 * TODO: Not documented yet.
 * @returns {*} Return value.
 * @memberof! H3DU.BezierCurve#
 */
    H3DU.BezierCurve.prototype.endpoints = function() {
      return this.curve.endpoints();
    };

/**
 * A [surface evaluator object]{@link H3DU.SurfaceEval#vertex} for a B&eacute;zier surface.<p>
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
 * Default is 0.
 * @param {Number} [u2] Ending point for the purpose of interpolation along the
 * U axis; it will correspond to 1.
 * Default is 1.
 * @param {Number} [v1] Starting point for the purpose of interpolation along the
 * V axis; it will correspond to 0.
 * Default is 0.
 * @param {Number} [v2] Ending point for the purpose of interpolation along the
 * V axis; it will correspond to 1.
 * Default is 1.
 */
    H3DU.BezierSurface = function(cp, u1, u2, v1, v2) {
      // TODO: Consider deprecating u1/u2/v1/v2
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
 * TODO: Not documented yet.
 * @returns {*} Return value.
 * @memberof! H3DU.BezierSurface#
 */
    H3DU.BezierSurface.prototype.endpoints = function() {
      return this.curve.endpoints();
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
      ret.curve.u2 = this.curve.u2;
      return ret;
    };
/**
 * TODO: Not documented yet.
 * @returns {Array<Array<Number>>} TODO: Not documented yet.
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
 * A [curve evaluator object]{@link H3DU.CurveEval#vertex} for a B-spline (basis spline) curve.
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
    H3DU.BSplineCurve._checkKnots(knots);
    this.controlPoints = controlPoints;
    if((this.bits & H3DU.BSplineCurve.WEIGHTED_BIT) !== 0 &&
   (this.bits & H3DU.BSplineCurve.HOMOGENEOUS_BIT) === 0) {
      // NOTE: WEIGHTED_BIT is deprecated; convert to homogeneous
      // for compatibility
      this.controlPoints = H3DU.BSplineCurve._convertToHomogen(this.controlPoints);
    }
    var order = knots.length - this.controlPoints.length;
    if(order < 2 || order > this.controlPoints.length)
      throw new Error();
    var cplen = this.controlPoints[0].length;
    var cplenNeeded = 1;
    if((this.bits & H3DU.BSplineCurve.DIVIDE_BIT) !== 0) {
      cplenNeeded = 2;
    }
    if(cplen < cplenNeeded)throw new Error();
    this.knots = knots;
    this.buffer = [];
    this.controlPoints = controlPoints;
  };

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
 * @memberof! H3DU.BSplineCurve
 */
  H3DU.BSplineCurve.WEIGHTED_BIT = 1;
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
 * @memberof! H3DU.BSplineCurve
 */
  H3DU.BSplineCurve.DIVIDE_BIT = 2;
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
 * @memberof! H3DU.BSplineCurve
 */
  H3DU.BSplineCurve.HOMOGENEOUS_BIT = 4;
/**
 * Combination of WEIGHTED_BIT and DIVIDE_BIT.
 * @const
 * @deprecated Deprecated because WEIGHTED_BIT is deprecated.
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
    if(t === kn[kn.length - 1]) {
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
    var elementsPerPoint = this.controlPoints[0].length;
    u = this.knots[order - 1] + u * (this.knots[numPoints] -
    this.knots[order - 1]);
    H3DU.BSplineCurve._getFactors(this.knots, u, order, numPoints,
     this.buffer);
    var ret = [];
    var i, j;
    ret = [];
    for(i = 0; i < elementsPerPoint; i++) {
      ret[i] = 0;
    }
    for(j = 0; j < numPoints; j++) {
      for(i = 0; i < elementsPerPoint; i++) {
        ret[i] += this.controlPoints[j][i] * this.buffer[j];
      }
    }
    if((this.bits & H3DU.BSplineCurve.DIVIDE_BIT) !== 0) {
      ret = H3DU.BSplineCurve._fromHomogen(ret);
    }
    return ret;
  };
/**
 * TODO: Not documented yet.
 * @param {*} u
 * @returns {*} Return value.
 * @memberof! H3DU.BSplineCurve#
 */
  H3DU.BSplineCurve.prototype.tangent = function(u) {
    var numPoints = this.controlPoints.length;
    var order = this.knots.length - numPoints;
    var elementsPerPoint = this.controlPoints[0].length;
    u = this.knots[order - 1] + u * (this.knots[numPoints] -
    this.knots[order - 1]);
    H3DU.BSplineCurve._getFactors(this.knots, u, order - 1, numPoints,
     this.buffer);
    var ret = [];
    var i, j;
    var coeffs = [];
    for(i = 0; i < numPoints; i++) {
      coeffs[i] = 0;
    }
    for(j = 0; j < numPoints - 1; j++) {
      var pix = (order - 1) * this.buffer[j + 1] / (this.knots[j + order] - this.knots[j + 1]);
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
    if((this.bits & H3DU.BSplineCurve.DIVIDE_BIT) !== 0) {
      ret = H3DU.BSplineCurve._fromHomogen(ret);
    }
    return ret;
  };

  /** @private */
  H3DU.BSplineCurve._convertToHomogen = function(cp) {
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

/** @private */
  H3DU.BSplineCurve._fromHomogen = function(cp) {
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
    var cpoints = controlPoints;
    if((this.bits & H3DU.BSplineCurve.WEIGHTED_BIT) !== 0 &&
   (this.bits & H3DU.BSplineCurve.HOMOGENEOUS_BIT) === 0) {
      // NOTE: WEIGHTED_BIT is deprecated; convert to homogeneous
      // for compatibility
      cpoints = H3DU.BSplineSurface._convertToHomogen(cpoints);
    }
    var vcplen = cpoints.length;
    if(vcplen <= 0)throw new Error();
    var ucplen = cpoints[0].length;
    if(ucplen <= 0)throw new Error();
    var cplen = cpoints[0][0].length;
    var cplenNeeded = 1;
    this.bits = bits || 0;
    if((this.bits & H3DU.BSplineCurve.DIVIDE_BIT) !== 0) {
      cplenNeeded = 2;
    }
    if(cplen < cplenNeeded)throw new Error();
    if(!knotsU || !knotsV)throw new Error();
    this.orderU = knotsU.length - ucplen;
    this.orderV = knotsV.length - vcplen;
    this.vcplen = vcplen;
    this.ucplen = ucplen;
    if(this.orderU < 2 || this.orderU > ucplen)throw new Error();
    if(this.orderV < 2 || this.orderV > vcplen)throw new Error();
    H3DU.BSplineCurve._checkKnots(knotsU);
    H3DU.BSplineCurve._checkKnots(knotsV);
    this.knotsU = knotsU;
    this.knotsV = knotsV;
    this.bufferU = [];
    this.bufferV = [];
    this.controlPoints = cpoints;
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
 * @returns {H3DU.BSplineCurve} Return value. The first
 * knot of the curve will be 0 and the last knot will be 1. (This is a change from previous
 * versions.)
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
 * @returns {H3DU.BSplineCurve} Return value. The first
 * knot of the curve will be 0 and the last knot will be 1. (This is a change from previous
 * versions.)
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
 * @returns {H3DU.BSplineSurface} Return value. The first
 * knot of the curve will be 0 and the last knot will be 1. (This is a change from previous
 * versions.)
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
 * @returns {H3DU.BSplineSurface} Return value. The first
 * knot of the curve will be 0 and the last knot will be 1. (This is a change from previous
 * versions.)
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
 * @returns {Array<Number>} A uniform knot vector. The first
 * knot will be 0 and the last knot will be 1. (This is a change from previous
 * versions.)
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
 * @param {Number} controlPoints Number of control points the curve will have.
 * @param {Number} degree Degree of the B-Spline
 * curve. For example, 3 means a degree-3 (cubic) curve.
 * If null or omitted, the default is 3.
 * @returns {Array<Number>} A clamped uniform knot vector.
 * The first knot will be 0 and the last knot will be 1.
 * (This is a change in version 2.0.)
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
    var elementsPerPoint = this.controlPoints[0][0].length;
    var bu = this.bufferU;
    var bv = this.bufferV;
    var tt, uu, i, value;
    H3DU.BSplineCurve._getFactors(this.knotsU, u, this.orderU, this.ucplen,
     this.bufferU);
    H3DU.BSplineCurve._getFactors(this.knotsV, v, this.orderV, this.vcplen,
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
    if((this.bits & H3DU.BSplineCurve.DIVIDE_BIT) !== 0) {
      output = H3DU.BSplineCurve._fromHomogen(output);
    }
    return output;
  };
/**
 * TODO: Not documented yet.
 * @param {*} u
 * @param {*} v
 * @returns {*} Return value.
* @memberof! H3DU.BSplineSurface#
 */
  H3DU.BSplineSurface.prototype.tangent = function(u, v) {
    u = this.knotsU[this.orderU - 1] + u * (this.knotsU[this.ucplen] -
    this.knotsU[this.orderU - 1]);
    v = this.knotsV[this.orderV - 1] + v * (this.knotsV[this.vcplen] -
    this.knotsV[this.orderV - 1]);
    var elementsPerPoint = this.controlPoints[0][0].length;

    var bv = this.bufferV;
    var tt, uu, i, value;
    H3DU.BSplineCurve._getFactors(this.knotsU, u, this.orderU - 1, this.ucplen,
     this.bufferU);
    H3DU.BSplineCurve._getFactors(this.knotsV, v, this.orderV, this.vcplen,
     this.bufferV);
    var ret = [];
    var coeffs = [];
    for(i = 0; i < this.ucplen; i++) {
      coeffs[i] = 0;
    }
    for(var j = 0; j < this.ucplen - 1; j++) {
      var pix = (this.orderU - 1) * this.bufferU[j + 1] / (this.knotsU[j + this.orderU] - this.knotsU[j + 1]);
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
    if((this.bits & H3DU.BSplineCurve.DIVIDE_BIT) !== 0) {
      ret = H3DU.BSplineCurve._fromHomogen(ret);
    }
    return ret;
  };
/**
 * TODO: Not documented yet.
 * @param {*} u
 * @param {*} v
 * @returns {*} Return value.
* @memberof! H3DU.BSplineSurface#
 */
  H3DU.BSplineSurface.prototype.bitangent = function(u, v) {
    u = this.knotsU[this.orderU - 1] + u * (this.knotsU[this.ucplen] -
    this.knotsU[this.orderU - 1]);
    v = this.knotsV[this.orderV - 1] + v * (this.knotsV[this.vcplen] -
    this.knotsV[this.orderV - 1]);
    var elementsPerPoint = this.controlPoints[0][0].length;
    var bu = this.bufferU;

    var tt, uu, i, value;
    H3DU.BSplineCurve._getFactors(this.knotsU, u, this.orderU, this.ucplen,
     this.bufferU);
    H3DU.BSplineCurve._getFactors(this.knotsV, v, this.orderV - 1, this.vcplen,
     this.bufferV);
    var ret = [];
    var coeffs = [];
    for(i = 0; i < this.vcplen; i++) {
      coeffs[i] = 0;
    }
    for(var j = 0; j < this.vcplen - 1; j++) {
      var pix = (this.orderV - 1) * this.bufferV[j + 1] / (this.knotsV[j + this.orderV] - this.knotsV[j + 1]);
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
    if((this.bits & H3DU.BSplineCurve.DIVIDE_BIT) !== 0) {
      ret = H3DU.BSplineCurve._fromHomogen(ret);
    }
    return ret;
  };

  /** @private */
  H3DU.BSplineSurface._convertToHomogen = function(cp) {
    var ret = [];
    for(var i = 0; i < cp.length; i++) {
      ret.push(H3DU.BSplineCurve._convertToHomogen(cp[i]));
    }
    return ret;
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
 * Specifies a curve evaluator object for generating the vertex positions of a parametric curve.
 * @param {Object} evaluator A <b>curve evaluator object</b>, which is an object that may or must contain the
 * following methods:<ul>
 * <li><code>evaluate(u)</code> - A method that takes a curve coordinate (<code>u</code>),
 * generally from 0 to 1. This method is required. This method returns an array of the result of the evaluation.
 * <li><code>tangent(u)</code> - A method that takes the same parameter as <code>evaluate</code>
 * and returns the tangent of the surface at the given coordinate.<p>
 * The <b>tangent</b> of a curve is a vector which is the derivative of the <code>evaluate</code> method at the given coordinate.  The tangent vector returned by this method should not be "normalized" to a [unit vector]{@link tutorial}.
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
    // TODO: Document the "normal" and "endpoints" method of evaluators.
    // TODO: Change the deprecation reason for CurveEval#normal
   // TODO: Consider allowing evaluators to have an "arcLength" method
    this.vertexCurve = evaluator;
    return this;
  };
/**
 * Specifies a parametric curve function for generating normals.
 * @deprecated May be removed in the future; it makes little sense
 * to generate normals for a curve.
 * @param {Object} evaluator An object that must contain a function
 * named <code>evaluate</code>, giving 3 values as a result. See {@link H3DU.CurveEval#vertex}.
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
 * named <code>evaluate</code>, giving 3 values as a result. See {@link H3DU.CurveEval#vertex}.
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
 * named <code>evaluate</code>, giving one or two values as a result. See {@link H3DU.CurveEval#vertex}.
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
 * Default is 24.
 * @param {Number} [u1] Starting point of the curve.
 * Default is the starting coordinate given by the [curve evaluator object]{@link H3DU.CurveEval#vertex}, or 0 if not given.
 * @param {Number} [u2] Ending point of the curve.
 * Default is the ending coordinate given by the [curve evaluator object]{@link H3DU.CurveEval#vertex}, or 1 if not given.
 * @returns {H3DU.CurveEval} This object.
 * @memberof! H3DU.CurveEval#
 */
  H3DU.CurveEval.prototype.evalCurve = function(mesh, mode, n, u1, u2) {
    if(typeof n === "undefined")n = 24;
    if(n <= 0)throw new Error("invalid n");
    if(typeof u1 === "undefined" && typeof u2 === "undefined") {
      var endpoints = H3DU.CurveEval.findEndPoints(this.vertexSurface);
      u1 = endpoints[0];
      u2 = endpoints[1];
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
     // TODO: Provide a different mechanism for choosing which attributes to generate
    this.autoNormal = !!value;
    return this;
  };
/**
 * Specifies a surface evaluator object for generating the vertex positions of a parametric surface.
 * @param {Object} evaluator A <b>surface evaluator object</b>, which is an object that may or must contain the
 * following methods:<ul>
 * <li><code>evaluate(u, v)</code> - A method that takes a horizontal-axis coordinate (<code>u</code>),
 * generally from 0 to 1, and a vertical-axis coordinate (<code>v</code>), generally from 0 to 1.
 * This method is required. This method returns a vector of the result of the evaluation.
 * <li><code>gradient(u, v)</code> - A method that takes the same parameters as <code>evaluate</code>
 * and returns the gradient of the surface at the given coordinates. This method is optional.<br>
 * The <b>gradient</b> is a vector pointing up and away from the surface, or alternatively,
 * the cross product of the tangent vector and bitangent vector,
 * in that order. The gradient returned by this method should not be "normalized" to a [unit vector]{@tutorial glmath}.
 * <li><a id="tangentvector"></a><code>tangent(u, v)</code> - A method that takes the same parameters as <code>evaluate</code>
 * and returns the tangent vector of the surface at the given coordinates. This method is optional.<br>
 * The <b>tangent vector</b> is the vector pointing toward the U axis,
 * or alternatively, the partial derivative of the <code>evaluate</code> method with respect to U.
 * The tangent vector returned by this method should not be "normalized" to a [unit vector]{@tutorial glmath}.
 * <li><a id="bitangentvector"></a><code>bitangent(u, v)</code> -
 * A method that takes the same parameters as <code>evaluate</code>
 * and returns the bitangent vector of the surface at the given coordinates.
 * This method is optional.
 * <br>
 * The <b>bitangent vector</b> is the vector pointing toward the V axis, or alternatively,
 * the partial derivative of the <code>evaluate</code> method with respect to V.  The bitangent vector returned by this method should not be "normalized" to a [unit vector]{@tutorial glmath}.
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
    // TODO: Document the "endpoints" method of evaluators.
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
 * named <code>evaluate</code>, giving 3 values as a result. See {@link H3DU.SurfaceEval#vertex}.
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
 * named <code>evaluate</code>, giving 3 values as a result. See {@link H3DU.SurfaceEval#vertex}.
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
 * named <code>evaluate</code>, giving 2 values as a result. See {@link H3DU.SurfaceEval#vertex}.
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
/** @private */
  H3DU.SurfaceEval._EPSILON = 0.00001;
/** @private */
  H3DU.SurfaceEval._tangentHelper = function(e, u, v, sampleAtPoint) {
    var du = H3DU.SurfaceEval._EPSILON;
    var vector = e.evaluate(u + du, v);
    if(vector[0] === 0 && vector[1] === 0 && vector[2] === 0) {
    // too abrupt, try the other direction
      du = -du;
      vector = e.evaluate(u + du, v);
    }
    H3DU.Math.vec3subInPlace(vector, sampleAtPoint);
    H3DU.Math.vec3scaleInPlace(vector, 1.0 / du);
    return vector;
  };
/** @private */
  H3DU.SurfaceEval._bitangentHelper = function(e, u, v, sampleAtPoint) {
    var du = H3DU.SurfaceEval._EPSILON;
   // Find the partial derivatives of u and v
    var vector = e.evaluate(u, v + du);
    if(vector[0] === 0 && vector[1] === 0 && vector[2] === 0) {
    // too abrupt, try the other direction
      du = -du;
      vector = e.evaluate(u, v + du);
    }
    H3DU.Math.vec3subInPlace(vector, sampleAtPoint);
    H3DU.Math.vec3scaleInPlace(vector, 1.0 / du);
    return vector;
  };
/**
 * Finds an approximate [gradient vector]{@link H3DU.SurfaceEval#vertex} for
 * the given surface evaluator
 * at the given U and V coordinates. This method calls the evaluator's <code>gradient</code>
 * method if it implements it; otherwise, calls the evaluator's <code>bitangent</code> and <code>tangent</code> methods if it implements them; otherwise, does a numerical differentiation using the <code>evaluate</code> method.
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
 * @returns {Array<Number>} A gradient vector . */
  H3DU.SurfaceEval.findGradient = function(e, u, v) {
    if(typeof e.gradient !== "undefined" && e.gradient !== null) {
      return e.gradient(u, v);
    }
    var tan, bitan;
    if(typeof e.bitangent !== "undefined" && e.bitangent !== null && (typeof e.tangent !== "undefined" && e.tangent !== null)) {
      bitan = e.bitangent(u, v);
      tan = e.tangent(u, v);
    } else {
      var sample = e.evaluate(u, v);
      bitan = H3DU.SurfaceEval._bitangentHelper(e, u, v, sample);
      tan = H3DU.SurfaceEval._tangentHelper(e, u, v, sample);
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
 * Finds an approximate [tangent vector]{@link H3DU.SurfaceEval#vertex} for the given surface evaluator
 * at the given U and V coordinates. This method calls the evaluator's <code>tangent</code>
 * method if it implements it; otherwise, does a numerical differentiation
 * with respect to the U axis using the <code>evaluate</code> method.
 * @param {Object} e An object described in {@link H3DU.SurfaceEval#vertex}.
 * @param {Number} u U coordinate of the surface to evaluate.
 * @param {Number} v V coordinate of the surface to evaluate.
 * @returns {Array<Number>} A tangent vector . */
  H3DU.SurfaceEval.findTangent = function(e, u, v) {
    return typeof e.tangent !== "undefined" && e.tangent !== null ? e.tangent(u, v) :
     H3DU.SurfaceEval._tangentHelper(e, u, v, e.evaluate(u, v));
  };
/**
 * Finds an approximate [bitangent vector]{@link H3DU.SurfaceEval#vertex} for the given surface evaluator
 * at the given U and V coordinates. This method calls the evaluator's <code>bitangent</code>
 * method if it implements it; otherwise, does a numerical differentiation
 * with respect to the V axis using the <code>evaluate</code> method.
 * @param {Object} e An object described in {@link H3DU.SurfaceEval#vertex}.
 * @param {Number} u U coordinate of the surface to evaluate.
 * @param {Number} v V coordinate of the surface to evaluate.
 * @returns {Array<Number>} A bitangent vector . */
  H3DU.SurfaceEval.findBitangent = function(e, u, v) {
    return typeof e.bitangent !== "undefined" && e.bitangent !== null ? e.bitangent(u, v) :
     H3DU.SurfaceEval._bitangentHelper(e, u, v, e.evaluate(u, v));
  };
/**
 * Finds an approximate [tangent (derivative)]{@link H3DU.CurveEval#vertex} for the given curve evaluator
 * at the given U coordinate. This method calls the evaluator's <code>tangent</code>
 * method if it implements it; otherwise, does a numerical differentiation
 * with respect to the U axis using the <code>evaluate</code> method.
 * @param {Object} e An object described in {@link H3DU.CurveEval#vertex}.
 * @param {Number} u U coordinate of the curve to evaluate.
 * @returns {Array<Number>} A tangent vector. */
  H3DU.CurveEval.findTangent = function(e, u) {
    if(typeof e.tangent !== "undefined" && e.tangent !== null) {
      return e.tangent(u);
    }
    var du = H3DU.SurfaceEval._EPSILON;
    var vector = e.evaluate(u + du);
    if(vector[0] === 0 && vector[1] === 0 && vector[2] === 0) {
    // too abrupt, try the other direction
      du = -du;
      vector = e.evaluate(u + du);
    }
    H3DU.Math.vec3subInPlace(vector, e.evaluate(u));
    H3DU.Math.vec3scaleInPlace(vector, 1.0 / du);
    return vector;
  };
/**
 * TODO: Not documented yet.
 * @param {*} e
 * @param {*} u
 * @returns {*} Return value. */
  H3DU.CurveEval.findEndPoints = function(e) {
    if(typeof e !== "undefined" && e !== null && (typeof e.endpoints !== "undefined" && e.endpoints !== null))return e.endpoints();
    return [0, 1];
  };
/**
 * TODO: Not documented yet.
 * @param {*} e
 * @param {*} u
 * @returns {*} Return value. */
  H3DU.SurfaceEval.findEndPoints = function(e) {
    if(typeof e !== "undefined" && e !== null && (typeof e.endpoints !== "undefined" && e.endpoints !== null))return e.endpoints();
    return [0, 1, 0, 1];
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
 * @param {Number} u U coordinate of the surface to evaluate.
 * @param {Number} v V coordinate of the surface to evaluate.
 * @returns {H3DU.SurfaceEval} This object.
 * @memberof! H3DU.SurfaceEval#
 */
  H3DU.SurfaceEval.prototype.evalOne = function(mesh, u, v) {
    var values = [];
    this._saveValues(mesh, values, 0);
    this._recordAndPlayBack(mesh, u, v, values, H3DU._OLD_VALUES_SIZE);
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
        normal = H3DU.Math.vec3norm(H3DU.SurfaceEval.findGradient(
            this.vertexSurface, u, v));
        buffer[index + 3] = normal[0];
        buffer[index + 4] = normal[1];
        buffer[index + 5] = normal[2];
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
 * a series of lines defining the surface. If this value is H3DU.Mesh.POINTS,
 * generates a series of points along the surface. For any other value,
 * this method has no effect.
 * @param {Number} [un] Number of subdivisions along the U axis.
 * Default is 24.
 * @param {Number} [vn] Number of subdivisions along the V axis.
 * Default is 24.
 * @param {Number} [u1] Starting U coordinate of the surface to evaluate.
 * Default is the starting U coordinate given by the [surface evaluator object]{@link H3DU.SurfaceEval#vertex}, or 0 if not given.
 * @param {Number} [u2] Ending U coordinate of the surface to evaluate.
 * Default is the ending U coordinate given by the [surface evaluator object]{@link H3DU.SurfaceEval#vertex}, or 1 if not given.
 * @param {Number} [v1] Starting V coordinate of the surface to evaluate.
 * Default is the starting V coordinate given by the [surface evaluator object]{@link H3DU.SurfaceEval#vertex}, or 0 if not given.
 * @param {Number} [v2] Ending V coordinate of the surface to evaluate.
 * Default is the ending V coordinate given by the [surface evaluator object]{@link H3DU.SurfaceEval#vertex}, or 1 if not given.
 * @returns {H3DU.SurfaceEval} This object.
 * @memberof! H3DU.SurfaceEval#
 */
  H3DU.SurfaceEval.prototype.evalSurface = function(mesh, mode, un, vn, u1, u2, v1, v2) {
    if(typeof un === "undefined")un = 24;
    if(typeof vn === "undefined")vn = 24;
    if(un <= 0)throw new Error("invalid un");
    if(vn <= 0)throw new Error("invalid vn");
    if(typeof mode === "undefined" || mode === null)mode = H3DU.Mesh.TRIANGLES;
    var endpoints = null;
    if(typeof v1 === "undefined" && typeof v2 === "undefined") {
      if(!endpoints)endpoints = H3DU.SurfaceEval.findEndPoints(this.vertexSurface);
      v1 = endpoints[2];
      v2 = endpoints[3];
    }
    if(typeof u1 === "undefined" && typeof u2 === "undefined") {
      if(!endpoints)endpoints = H3DU.SurfaceEval.findEndPoints(this.vertexSurface);
      u1 = endpoints[0];
      u2 = endpoints[1];
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

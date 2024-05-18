/*
 Any copyright to this file is released to the Public Domain.
 In case this is not possible, this file is also licensed under Creative Commons Zero (CC0): https://creativecommons.org/publicdomain/zero/1.0/
*/

import {BSplineCurve} from "./h3du-bspline";
import {Curve} from "./h3du-curve";

/**
 * A [curve evaluator object]{@link Curve} for a curve
 * made up of one or more individual curves.<p>
 * The combined curve's U coordinates range from 0 to N,
 * where N is the number of curves. In this way, the integer
 * part of a U coordinate indicates the curve the coordinate
 * refers to. For example, if there are four curves, coordinates
 * from 0, but less than 1, belong to the first curve, and coordinates
 * from 1, but less than 2, belong to the second curve. The U
 * coordinate equal to N refers to the end of the last curve in
 * the piecewise curve.
 * @constructor
 * @extends Curve
 * @param {Array<Object>} curves An array of curve evaluator
 * objects, such as an instance of {@link Curve} or one
 * of its subclasses. The combined curve should be continuous
 * in that the curves that make it up should connect at their
 * end points (except the curve need not be closed).
 * @example
 * // Generates a piecewise polygon curve from an array of
 * // vectors (arrays with the same number of elements) that
 * // specify the points that make up the polygon.
 * function polygonCurve(points) {
 * var curves=[]
 * for(var i=0;&lt;points.length;i++) {
 * var cp=points[i]
 * var np=(i==points.length-1) ? points[0] : points[i+1]
 * curves.push(BSplineCurve.fromBezierCurve([cp,np]))
 * }
 * return new PiecewiseCurve(curves)
 * }
 */
const PiecewiseCurve = function(curves) {
  this.curves = [];
  this.curvesEp = [];
  this.runningCurveStart = [];
  let i;
  for (i = 0; i < curves.length; i++) {
    this.curves[i] = curves[i] instanceof Curve ?
      curves[i] : new Curve(curves[i]);
    this.curvesEp[i] = this.curves[i].endPoints();
    this.runningCurveStart[i] = i === 0 ? 0 : Number.NaN;
  }
};
PiecewiseCurve.prototype = Object.create(Curve.prototype);
PiecewiseCurve.prototype.constructor = PiecewiseCurve;
/**
 * Returns the starting and ending U coordinates of this curve.
 * @returns A two-element array. The first element is the starting coordinate of
 * the curve, and the second is its ending coordinate.
 * Returns <code>[0, n]</code>, where <code>n</code> is the number
 * of curves that make up this piecewise curve.
 */
PiecewiseCurve.prototype.endPoints = function() {
  return [0, this.curves.length];
};
/**
 * Gets a reference to the curves that make up this piecewise curve.
 * @returns {Array<Curve>} The curves that make up this piecewise curve.
 */
PiecewiseCurve.prototype.getCurves = function() {
  return this.curves;
};
/** @ignore */
PiecewiseCurve.prototype._getRunningCurveStart = function(uc) {
  if(uc === 0) {
    return 0;
  }
  if(isNaN(this.runningCurveStart[uc])) {
    let i;
    for (i = 1; i <= uc; i++) {
      if(isNaN(this.runningCurveStart[i])) {
        this.runningCurveStart[i] = this.runningCurveStart[i - 1] +
        this.curves[i - 1].arcLength(this.curvesEp[i - 1][1]);
      }
    }
  }
  return this.runningCurveStart[uc];
};
/** @ignore */
PiecewiseCurve.prototype._getCurveAndPoint = function(u) {
  let uc;
  let ut;
  if(u < 0) {
    uc = 0;
    ut = 0;
  } else if(u >= this.curves.length) {
    uc = this.curves.length - 1;
    ut = 1;
  } else {
    uc = Math.floor(u);
    ut = u - uc;
  }
  const ep = this.curvesEp[uc];
  return [uc, ep[0] + (ep[1] - ep[0]) * ut];
};
/**
 * Finds an approximate arc length (distance) between the start of this
 * curve and the point at the given U coordinate of this curve.
 * @param {number} u U coordinate of a point on the curve.
 * @returns {number} The approximate arc length of this curve at the given U coordinate.
 */
PiecewiseCurve.prototype.arcLength = function(u) {
  if(u <= 0) {
    return 0;
  }
  const cp = this._getCurveAndPoint(u);
  return this._getRunningCurveStart(cp[0]) +
    this.curves[cp[0]].arcLength(cp[1]);
};
/**
 * Finds the position of this curve at the given U coordinate.
 * @param {number} u U coordinate of a point on the curve.
 * @returns {Array<number>} An array describing a position. It should have at least as many
 * elements as the number of dimensions of the underlying curve.
 */
PiecewiseCurve.prototype.evaluate = function(u) {
  const cp = this._getCurveAndPoint(u);
  return this.curves[cp[0]].evaluate(cp[1]);
};
/**
 * Finds an approximate velocity vector at the given U coordinate of this curve.
 * @param {number} u U coordinate of a point on the curve.
 * @returns {Array<number>} An array describing a velocity vector. It should have at least as many
 * elements as the number of dimensions of the underlying curve.
 */
PiecewiseCurve.prototype.velocity = function(u) {
  const cp = this._getCurveAndPoint(u);
  return this.curves[cp[0]].velocity(cp[1]);
};

/**
 * Creates a piecewise curve made up of B-spline curves from the control points of a
 * cubic TCB spline (tension/continuity/bias spline, also known as Kochanek&ndash;Bartels spline).
 * (If tension, continuity, and bias are all 0, the result is a cubic Catmull&ndash;Rom spline
 * in uniform parameterization.)
 * @param {Array<Array<number>>} spline An array of control points,
 * each with the same number of values, that the curve will pass through.
 * Throws an error if there are fewer than two control points.
 * @param {number} [tension] A parameter that adjusts the length of the starting and ending
 * tangents of each curve segment. Ranges from -1 for double-length tangents to 1
 * for zero-length tangents. A value of 1 results in straight line segments. Default is 0.
 * @param {number} [continuity] A parameter that adjusts the direction of the starting and ending
 * tangents of each curve segment. Ranges from -1 to 1, where values closer to -1 or closer to 1
 * result in tangents that are closer to perpendicular.
 * A value of -1 results in straight line segments. Default is 0.
 * @param {number} [bias] A parameter that adjusts the influence of the starting and ending
 * tangents of each curve segment. The greater this number, the greater the
 * ending tangents influence the direction of the next curve segment in comparison to the starting tangents. Ranges from -1 to 1. Default is 0.
 * @param {number} [closed] If true, connects the last control point of the curve with the first.
 * Default is false.
 * @param {number} [rigidEnds] If true, the start and end of the piecewise curve
 * will, by default, more rigidly follow the direction to the next or previous control point, respectively.
 * This makes the curve compatible with GDI+ cardinal splines with 0
 * continuity, 0 bias, and tension equal to <code>-((T*2)-1)</code>, where
 * T is the GDI+ cardinal spline tension parameter. Default is false.
 * @returns {PiecewiseCurve} A piecewise curve made up of cubic B-spline curves describing the
 * same path as the TCB spline.
 */
PiecewiseCurve.fromTCBSpline = function(spline, tension, continuity, bias, closed, rigidEnds) {
  const elements = spline[0].length;
  if(spline.length < 2)throw new Error();
  const tensionValue = typeof tension === "undefined" || tension === null ? 0 : tension;
  const continValue = typeof continuity === "undefined" || continuity === null ? 0 : continuity;
  const biasValue = typeof bias === "undefined" || bias === null ? 0 : bias;
  const closedValue = typeof closed === "undefined" || closed === null ? false : closed;
  const rigidEndsValue = typeof rigidEnds === "undefined" || rigidEnds === null ? false : rigidEnds;
  const third = 1 / 3;
  const ret = [];
  const lastVecIndex = spline.length - 1;
  const numSplines = closedValue ? lastVecIndex + 1 : lastVecIndex;
  let j;
  for (j = 0; j < numSplines; j++) {
    const retcurve = [[], [], [], []];
    const pt0 = j > lastVecIndex ? spline[0] : spline[j];
    let pt1;
    let ptPrev;
    let ptNext;
    if(closedValue) {
      if(j === 0) {
        ptPrev = spline[lastVecIndex];
        pt1 = spline[j + 1];
        ptNext = spline.length === 2 ? spline[0] : spline[j + 2];
      } else if(j === lastVecIndex - 1) {
        ptPrev = spline[j - 1];
        pt1 = spline[j + 1];
        ptNext = spline[0];
      } else if(j === lastVecIndex) {
        ptPrev = spline[j - 1];
        pt1 = spline[0];
        ptNext = spline[1];
      } else {
        ptPrev = spline[j - 1];
        pt1 = spline[j + 1];
        ptNext = spline[j + 2];
      }
    } else {
      pt1 = spline[j + 1];
      ptPrev = j === 0 ? null : spline[j - 1];
      ptNext = j >= lastVecIndex ? null : spline[j + 2];
    }
    const mc = 1 - continValue;
    const pc = 1 + continValue;
    const mb = 1 - biasValue;
    const pb = 1 + biasValue;
    const mt = 1 - tensionValue;
    let i;
    for (i = 0; i < elements; i++) {
      const p1 = pt0[i];
      const p4 = pt1[i];
      const diffCurr = pt1[i] - pt0[i];
      const diffPrev = typeof ptPrev === "undefined" || ptPrev === null ? 0 : pt0[i] - ptPrev[i];
      const diffNext = typeof ptNext === "undefined" || ptNext === null ? 0 : ptNext[i] - pt1[i];
      let tgStart = 0.5 * mt * pc * pb * diffPrev + 0.5 * mt * mc * mb * diffCurr;
      let tgEnd = 0.5 * mt * mc * pb * diffCurr + 0.5 * mt * pc * mb * diffNext;
      if(!rigidEndsValue) {
        if(typeof ptPrev === "undefined" || ptPrev === null)tgStart = 0;
        if(typeof ptNext === "undefined" || ptNext === null)tgEnd = 0;
      }
      const p2 = p1 + tgStart * third;
      const p3 = p4 - tgEnd * third;
      retcurve[0][i] = p1;
      retcurve[1][i] = p2;
      retcurve[2][i] = p3;
      retcurve[3][i] = p4;
    }
    ret.push(BSplineCurve.clamped(retcurve, 3));
  }
  return new PiecewiseCurve(ret);
};

/**
 * Creates a piecewise curve made up of B-spline curves from the control points of a
 * Hermite spline. A Hermite spline is a collection of points that the curve will go through,
 * together with the velocity vectors (derivatives or instantaneous rates of change) at
 * those points.<p>
 * Hermite splines are useful for representing an approximate polynomial form
 * of a function or curve whose derivative is known; however, Hermite splines are not
 * guaranteed to preserve the increasing or decreasing nature of the function or curve.
 * @param {Array<Array<number>>} spline An array of control points,
 * each with the same number of values, that describe a Hermite spline.
 * Each pair of control points takes up two elements of the array and consists
 * of the coordinates of that point followed by the velocity vector (derivative) at that point.
 * The array must have an even number of control points and at least four control points.
 * @returns {PiecewiseCurve} A piecewise curve made up of cubic B-spline curves describing the
 * same path as the Hermite spline.
 */
PiecewiseCurve.fromHermiteSpline = function(spline) {
  const elements = spline[0].length;
  if(spline.length < 4 || spline.length % 2 !== 0)throw new Error();
  const third = 1 / 3;
  const ret = [];
  let j;
  for (j = 0; j < spline.length - 2; j += 2) {
    const retcurve = [[], [], [], []];
    const pt0 = spline[j];
    const tg0 = spline[j + 1];
    const pt1 = spline[j + 2];
    const tg1 = spline[j + 3];
    let i;
    for (i = 0; i < elements; i++) {
      const p1 = pt0[i];
      const p4 = pt1[i];
      const p2 = p1 + tg0[i] * third;
      const p3 = p4 - tg1[i] * third;
      retcurve[0][i] = p1;
      retcurve[1][i] = p2;
      retcurve[2][i] = p3;
      retcurve[3][i] = p4;
    }
    ret.push(BSplineCurve.clamped(retcurve, 3));
  }
  return new PiecewiseCurve(ret);
};

/**
 * Creates a piecewise curve made up of B-spline curves from the control points of a
 * cubic Catmull&ndash;Rom spline. A Catmull&ndash;Rom spline is defined by
 * a collection of control points that the spline
 * will go through, and the shape of each curve segment is also determined by the positions
 * of neighboring points on the spline.
 * @param {Array<Array<number>>} spline An array of control points,
 * each with the same number of values, that the curve will pass through.
 * Throws an error if there are fewer than two control points.
 * @param {number} [param] A value that describes the curve's parameterization.
 * Ranges from 0 to 1. A value of 0 indicates a uniform parameterization, 0.5 indicates a
 * centripetal parameterization, and 1 indicates a chordal parameterization.
 * Default is 0.5.
 * @param {number} [closed] If true, connects the last control point of the curve with the first.
 * Default is false.
 * @returns {PiecewiseCurve} A piecewise curve made up of cubic B-spline curves describing the same path as the Catmull&ndash;Rom spline.
 */
PiecewiseCurve.fromCatmullRomSpline = function(spline, param, closed) {
  const elements = spline[0].length;
  if(spline.length < 2)throw new Error();
  const paramValue = typeof param === "undefined" || param === null ? 0.5 : param;
  const closedValue = typeof closed === "undefined" || closed === null ? false : closed;
  const ret = [];
  const lastVecIndex = spline.length - 1;
  const numSplines = closedValue ? lastVecIndex + 1 : lastVecIndex;
  let j;
  for (j = 0; j < numSplines; j++) {
    const retcurve = [[], [], [], []];
    let pt0 = j === 0 ? spline[0] : spline[j - 1];
    const pt1 = spline[j];
    let pt2 = spline[j + 1];
    let pt3 = j + 2 > lastVecIndex ? spline[lastVecIndex] : spline[j + 2];
    let newpt;
    if(!closedValue && j + 2 > lastVecIndex) {
      newpt = [];
      let i;
      for (i = 0; i < elements; i++) {
        newpt[i] = pt0[i] + (pt1[i] - pt2[i]);
      }
      pt3 = newpt;
    }
    if(!closedValue && j === 0) {
      newpt = [];
      let i;
      for (i = 0; i < elements; i++) {
        newpt[i] = pt3[i] + (pt2[i] - pt1[i]);
      }
      pt0 = newpt;
    }
    if(closedValue) {
      if(j === 0) {
        pt0 = spline[lastVecIndex];
        pt3 = spline.length === 2 ? spline[0] : spline[j + 2];
      } else if(j === lastVecIndex - 1) {
        pt3 = spline[0];
      } else if(j === lastVecIndex) {
        pt2 = spline[0];
        pt3 = spline[1];
      }
    }
    let p1len = 0;
    let p2len = 0;
    let p3len = 0;
    let i;
    for (i = 0; i < elements; i++) {
      let dx = pt0[i] - pt1[i];
      p1len += dx * dx;
      dx = pt1[i] - pt2[i];
      p2len += dx * dx;
      dx = pt2[i] - pt3[i];
      p3len += dx * dx;
    }
    p1len = Math.sqrt(p1len);
    p2len = Math.sqrt(p2len);
    p3len = Math.sqrt(p3len);

    for (i = 0; i < elements; i++) {
      const p1 = pt0[i];
      const p2 = pt1[i];
      const p3 = pt2[i];
      const p4 = pt3[i];
      let t1 = 1;
      let t2 = 1;
      let t3 = 1;
      if(paramValue !== 0) {
        t1 = Math.pow(p1len, paramValue);
        t2 = Math.pow(p2len, paramValue);
        t3 = Math.pow(p3len, paramValue);
      }
      let den = 3 * t1 * (t1 + t2);
      let np2 = p2;
      let np3 = p3;
      den = 3 * t1 * (t1 + t2);
      if(den !== 0) {
        np2 = (t1 * t1 * p3 - t2 * t2 * p1 + p2 * (2 * t1 * t1 + 3 * t1 * t2 + t2 * t2)) / den;
      }
      den = 3 * t3 * (t3 + t2);
      if(den !== 0) {
        np3 = (t3 * t3 * p2 - t2 * t2 * p4 + p3 * (2 * t3 * t3 + 3 * t3 * t2 + t2 * t2)) / den;
      }
      retcurve[0][i] = p2;
      retcurve[1][i] = np2;
      retcurve[2][i] = np3;
      retcurve[3][i] = p3;
    }
    ret.push(BSplineCurve.clamped(retcurve, 3));
  }
  return new PiecewiseCurve(ret);
};
/**
 * Creates a piecewise curve that describes an arc running along an axis-aligned
 * ellipse, or a shape based on that arc and ellipse, given the ellipse's center
 * and dimensions, start angle, and sweep angle. The arc is rendered as
 * cubic rational B-spline curves.
 * @param {number} x X coordinate of the ellipse's center.
 * @param {number} y Y coordinate of the ellipse's center.
 * @param {number} w Width of the ellipse's bounding box.
 * @param {number} h Height of the ellipse's bounding box.
 * @param {number} start Starting angle of the arc, in degrees.
 * 0 means the positive X axis, 90 means the positive Y axis,
 * 180 means the negative X axis, and 270 means the negative Y axis.
 * @param {number} sweep Length of the arc in degrees. Can be positive or negative. Can be greater than 360 or
 * less than -360, in which case the arc will wrap around the ellipse multiple times. Assuming
 * the coordinate system's X axis points right and the Y axis down, positive angles run
 * clockwise and negative angles counterclockwise.
 * @returns {PiecewiseCurve} The resulting piecewise curve.
 */
PiecewiseCurve.fromEllipseArc = function(x, y, radiusX, radiusY, start, sweep) {
  if(typeof start === "undefined" || start === null)start = 0;
  if(typeof sweep === "undefined" || sweep === null)sweep = 0;
  sweep = sweep * Math.PI / 180;
  let abssweep = sweep;
  const sweepdir = sweep < 0 ? -1 : 1;
  const sweepSegments = abssweep > Math.PI * 0.5 &&
    abssweep <= Math.PI * 2 ? abssweep * 0.25 : Math.PI * 0.5;
  let arcstart = start;
  const curves = [];
  let sa0;
  let sa1;
  while(abssweep > 0) {
    const arcangle = Math.min(sweepSegments, abssweep);
    const arcend = arcstart + arcangle * sweepdir;
    const ca0 = Math.cos(arcstart);
    sa0 = arcstart >= 0 && arcstart < 6.283185307179586 ? arcstart <= 3.141592653589793 ? Math.sqrt(1.0 - ca0 * ca0) : -Math.sqrt(1.0 - ca0 * ca0) : Math.sin(arcstart);
    const ca1 = Math.cos(arcend);
    sa1 = arcend >= 0 && arcend < 6.283185307179586 ? arcend <= 3.141592653589793 ? Math.sqrt(1.0 - ca1 * ca1) : -Math.sqrt(1.0 - ca1 * ca1) : Math.sin(arcend);
    abssweep -= arcangle;
    arcstart += arcangle * sweepdir;
    const p0 = [ca0, sa0, 1];
    const p2 = [ca1, sa1, 1];
    const halfAngle = (Math.PI - arcangle) * 0.5;
    const weight = Math.sin(halfAngle);
    const dx = p2[0] - p0[0];
    const dy = p2[1] - p0[1];
    const m0 = p0[0] + dx * 0.5;
    const m1 = p0[1] + dy * 0.5;
    const dcx = m0;
    const dcy = m1;
    const mdist = Math.sqrt(dcx * dcx + dcy * dcy);
    const clen = 1.0 / mdist;
    const p1dist = 1.0 / weight;
    const p1 = [
      dcx * clen * p1dist,
      dcy * clen * p1dist,
      weight
    ];
    p0[0] = x + p0[0] * radiusX;
    p0[1] = y + p0[1] * radiusY;
    p2[0] = x + p2[0] * radiusX;
    p2[1] = y + p2[1] * radiusY;
    p1[0] = (x + p1[0] * radiusX) * weight;
    p1[1] = (y + p1[1] * radiusY) * weight;
    curves.push(BSplineCurve.fromBezierCurve(
      [p0, p1, p2], BSplineCurve.DIVIDE_BIT));
  }
  return new PiecewiseCurve(curves);
};

export {PiecewiseCurve};

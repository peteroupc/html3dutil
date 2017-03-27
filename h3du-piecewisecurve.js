/*
 Any copyright to this file is released to the Public Domain.
 http://creativecommons.org/publicdomain/zero/1.0/
 If you like this, you should donate
 to Peter O. (original author of
 the Public Domain HTML 3D Library) at:
 http://peteroupc.github.io/
*/

import {Curve} from "./h3du-curve";

/**
 * A [curve evaluator object]{@link H3DU.Curve} for a curve
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
 * @memberof H3DU
 * @extends H3DU.Curve
 * @param {Array<Object>} curves An array of curve evaluator
 * objects, such as an instance of {@link H3DU.Curve} or one
 * of its subclasses. The combined curve should be continuous
 * in that the curves that make it up should connect at their
 * end points (except the curve need not be closed).
 */
var PiecewiseCurve = function(curves) {
  this.curves = [];
  this.curvesEp = [];
  this.runningCurveStart = [];
  for(var i = 0; i < curves.length; i++) {
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
 * @returns {Array<H3DU.Curve>} The curves that make up this piecewise curve.
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
    for(var i = 1; i <= uc; i++) {
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
  var uc, ut;
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
  var ep = this.curvesEp[uc];
  return [uc, ep[0] + (ep[1] - ep[0]) * ut];
};
/**
 * TODO: Not documented yet.
 * @param {number} u
 * @returns {number} Return value.
 */
PiecewiseCurve.prototype.arcLength = function(u) {
  if(u <= 0) {
    return 0;
  }
  var cp = this._getCurveAndPoint(u);
  return this._getRunningCurveStart(cp[0]) +
    this.curves[cp[0]].arcLength(cp[1]);
};
/**
 * TODO: Not documented yet.
 * @param {*} u
 * @returns {*} Return value.
 */
PiecewiseCurve.prototype.evaluate = function(u) {
  var cp = this._getCurveAndPoint(u);
  return this.curves[cp[0]].evaluate(cp[1]);
};
/**
 * TODO: Not documented yet.
 * @param {*} u
 * @returns {*} Return value.
 */
PiecewiseCurve.prototype.velocity = function(u) {
  var cp = this._getCurveAndPoint(u);
  return this.curves[cp[0]].velocity(cp[1]);
};

export {PiecewiseCurve};

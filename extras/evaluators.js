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
/** The <code>extras/evaluators.js</code> module.
 * To import all symbols in this module, either of the following can be used:
 * <pre>
 * import * from "extras/evaluators.js";
 * // -- or --
 * import * as CustomModuleName from "extras/evaluators.js";</pre>
 * @module extras/evaluators */

/*
 Any copyright to this file is released to the Public Domain.
 In case this is not possible, this file is also licensed under the Unlicense: https://unlicense.org/
*/
import {Curve, MathUtil, Surface} from "../h3du_module.js";

/**
 * A [surface evaluator object]{@link Surface} for a surface of revolution,
 * which results by revolving a two-dimensional curve around an axis.
 * <p>This class is considered a supplementary class to the
 * Public Domain HTML 3D Library and is not considered part of that
 * library. <p>
 * @constructor
 * @param {Object} curve A [curve evaluator object]{@link Curve} that describes a 2-dimensional curve to rotate about the axis of rotation, as
 * specified in the "axis" parameter. The curve's X coordinates
 * correspond to elevation, and its Y coordinates correspond to radius.<p>
 * If the curve function draws a curve that goes both above and below the axis of rotation, such
 * as a circle or ellipse, the V coordinates given in _minval_ and _maxval_ must
 * restrict the curve definition to no more than half of the curve.
 * @param {number} minval Smallest V coordinate.
 * @param {number} maxval Largest V coordinate. If _minval_ is greater than
 * _maxval_, both values will be swapped.
 * @param {Array<number>} [axis] Axis of rotation, around which the curve
 * will be rotated to generate the surface of revolution. If null, undefined, or omitted, the positive
 * Z axis (0, 0, 1) will be the axis of rotation. This parameter is a 3-element array describing
 * the X, Y, and Z coordinates, respectively, of a 3D point. The axis of rotation will
 * run in the direction from the origin to the point given in this parameter. This
 * parameter need not be a [unit vector]{@tutorial glmath}.
 */
export const SurfaceOfRevolution = function(curve, minval, maxval, axis) {
  this.curve = curve;
  this.minval = Math.min(minval, maxval);
  this.maxval = Math.max(minval, maxval);
  this._axis = axis;
  this._axisQuat = null;
  if(this._axis) {
    this._axisQuat = MathUtil.quatFromVectors([0, 0, 1], this._axis);
  }
};
SurfaceOfRevolution.prototype = Object.create(Surface.prototype);
SurfaceOfRevolution.prototype.constructor = SurfaceOfRevolution;
/** @inheritdoc */
SurfaceOfRevolution.prototype.endPoints = function() {
  return [0, MathUtil.PiTimes2, this.minval, this.maxval];
};
/**
 * Finds the coordinates of the given point of this surface.
 * @param {number} u U coordinate of the surface to evaluate.
 * @param {number} v V coordinate of the surface to evaluate.
 * @returns {Array<number>} An array containing the coordinates
 * of the position at the given point. It will have three elements.
 */
SurfaceOfRevolution.prototype.evaluate = function(u, v) {
  const curvepos = this.curve.evaluate(v);
  const cosu = Math.cos(u);
  const sinu = u >= 0 && u < 6.283185307179586 ? u <= 3.141592653589793 ? Math.sqrt(1.0 - cosu * cosu) : -Math.sqrt(1.0 - cosu * cosu) : Math.sin(u);
  const cp1 = curvepos[1];
  const cp0 = curvepos[0];
  const x = cp1 * cosu;
  const y = cp1 * sinu;
  const z = cp0;
  const ret = [x, y, z];
  if(this._axisQuat) {
    SurfaceOfRevolution._quatTransformInPlace(this._axisQuat, ret);
  }
  return ret;
};
/** @ignore */
SurfaceOfRevolution._quatTransformInPlace = function(q, v) {
  const t1 = q[1] * v[2] - q[2] * v[1] + v[0] * q[3];
  const t2 = q[2] * v[0] - q[0] * v[2] + v[1] * q[3];
  const t3 = q[0] * v[1] - q[1] * v[0] + v[2] * q[3];
  const t4 = q[0] * v[0] + q[1] * v[1] + q[2] * v[2];
  v[0] = t1 * q[3] - (t2 * q[2] - t3 * q[1]) + q[0] * t4;
  v[1] = t2 * q[3] - (t3 * q[0] - t1 * q[2]) + q[1] * t4;
  v[2] = t3 * q[3] - (t1 * q[1] - t2 * q[0]) + q[2] * t4;
};
/**
 * Creates a [surface evaluator object]{@link Surface} for a surface of revolution
 * whose curve is the graph of a single-variable function.
 * The resulting surface will have a circular cross section
 * along its length.
 * Examples of surfaces generated by this technique are
 * cones, frustums, cylinders, spheres, and spheroids (the
 * bases of these surfaces won't be generated).
 * @param {Function} func Function whose graph will be
 * rotated about the axis of rotation, as
 * specified in the "axis" parameter. The function takes a number
 * as a single parameter and returns a number. The return
 * value is effectively the radius of each part of the surface
 * from beginning to end.
 * @param {number} minval Smallest parameter of the function.
 * This is a number of units from the origin along the axis of rotation.
 * @param {number} maxval Largest parameter of the function.
 * This is a number of units from the origin along the axis of rotation.
 * If _minval_ is greater than _maxval_, both values will be swapped.
 * @param {Array<number>} [axis] Axis of rotation, around which the
 * function graph will be rotated to generate the surface of revolution.
 * If null, undefined, or omitted, the positive Z axis (0, 0, 1) will be the axis of rotation.
 * This parameter is a 3-element array describing
 * the X, Y, and Z coordinates, respectively, of a 3D point. The axis of rotation will
 * run in the direction from the origin to the point given in this parameter. This
 * parameter need not be a [unit vector]{@tutorial glmath}.
 * @returns {SurfaceOfRevolution} Return value.
 * @example <caption>The following creates an evaluator for a cone
 * which starts at the origin and runs 10 units along the Z axis.</caption>
 * var surf=SurfaceOfRevolution.fromFunction(
 * function(x) {
 * "use strict"; return x/2; }, // use a constantly increasing function
 * 0, 10);
 * @example <caption>This is an evaluator for the same cone, but
 * shifted 3 units back.</caption>
 * var surf=SurfaceOfRevolution.fromFunction(
 * function(x) {
 * "use strict"; x+=3; return x/2; },
 * -3,7);
 * @example <caption>The following creates an evaluator for a cylinder
 * which runs from 5 to 10 units, and with a radius of 2 units.</caption>
 * var surf=SurfaceOfRevolution.fromFunction(
 * function(x) {
 * "use strict"; return 2; }, // use a constant radius
 * 5, 10);
 */
SurfaceOfRevolution.fromFunction = function(func, minval, maxval, axis) {
  return new SurfaceOfRevolution({
    "evaluate":function(u) {
      return [u, func(u), 0];
    }
  }, minval, maxval, axis);
};
/**
 * A [surface evaluator object]{@link Surface} for a torus, a special case of a surface of revolution.
 * @param {number} outerRadius Radius from the center to the innermost
 * part of the torus.
 * @param {number} innerRadius Radius from the inner edge to the innermost
 * part of the torus.
 * @param {Object} [curve] A [curve evaluator object]{@link Curve} that
 * describes a 2-dimensional curve to serve as
 * the cross section of the torus. The curve need not be closed; in fact, certain
 * special surfaces can result
 * by leaving the ends open.
 * If null, undefined, or omitted, uses a circular cross section with a radius of 1.
 * @param {Array<number>} [axis] Axis of rotation, which the torus
 * will pass through.
 * If null, undefined, or omitted, the positive Z axis (0, 0, 1) will be the axis of rotation.
 * This parameter is a 3-element array describing
 * the X, Y, and Z coordinates, respectively, of a 3D point. The axis of rotation will
 * run in the direction from the origin to the point given in this parameter. This
 * parameter need not be a [unit vector]{@tutorial glmath}.
 * @returns {SurfaceOfRevolution} Return value.
 */
SurfaceOfRevolution.torus = function(outerRadius, innerRadius, curve, axis) {
  if(!curve)curve = {
    "evaluate":function(u) {
      const cosu = Math.cos(u);
      const sinu = u >= 0 && u < 6.283185307179586 ? u <= 3.141592653589793 ? Math.sqrt(1.0 - cosu * cosu) : -Math.sqrt(1.0 - cosu * cosu) : Math.sin(u);
      return [cosu, sinu];
    },
    "velocity":function(u) {
      const cosu = Math.cos(u);
      const sinu = u >= 0 && u < 6.283185307179586 ? u <= 3.141592653589793 ? Math.sqrt(1.0 - cosu * cosu) : -Math.sqrt(1.0 - cosu * cosu) : Math.sin(u);
      return [-sinu, cosu];
    }
  };
  return new SurfaceOfRevolution({
    "evaluate":function(u) {
      const curvept = curve.evaluate(u);
      const x = innerRadius * curvept[1];
      const y = outerRadius + innerRadius * curvept[0];
      return [x, y, 0];
    },
    "endPoints":function() {
      return [0, MathUtil.PiTimes2];
    }
  }, 0, MathUtil.PiTimes2, axis);
};

// Complex multiplication
function cmul(a, b) {
  return [a[0] * b[0] - a[1] * b[1], a[1] * b[0] + a[0] * b[1]];
}
// Complex division
function cdiv(a, b) {
  return cmul(
    [a[0] * b[0] + a[1] * b[1], a[1] * b[0] - a[0] * b[1]],
    [1.0 / (b[0] * b[0] + b[1] * b[1]), 0]);
}

/** @ignore
 * @constructor */
function Circle(radius, rotationDegrees, reversed) {
  this.radius = radius;
  this.reversed = reversed || false;
  let phase = rotationDegrees || 0;
  phase = phase >= 0 && phase < 360 ? phase : phase % 360 +
       (phase < 0 ? 360 : 0);
  phase *= MathUtil.ToRadians;
  this.phase = phase;
  this.evaluate = function(u) {
    const angle = reversed ? Math.PI * 2 - (u + this.phase) :
      u + this.phase;
    const c = Math.cos(angle);
    const s = angle >= 0 && angle < 6.283185307179586 ? angle <= 3.141592653589793 ? Math.sqrt(1.0 - c * c) : -Math.sqrt(1.0 - c * c) : Math.sin(angle);
    return [this.radius * c,
      this.radius * s];
  };
  this.arcLength = function(u) {
    return this.radius * u;
  };
  this.endPoints = function() {
    return [0, Math.PI * 2];
  };
}
/*

const PolarCurve = function(radius, rotationDegrees, reversed) {
  this.radius = radius;
  this.reversed = reversed || false;
  let phase = rotationDegrees || 0;
  phase = phase >= 0 && phase < 360 ? phase : phase % 360 +
       (phase < 0 ? 360 : 0);
  phase *= MathUtil.ToRadians;
  this.phase = phase;
  this.evaluate = function(u) {
    const angle = reversed ? Math.PI * 2 - (u + this.phase) :
      u + this.phase;
    const c = Math.cos(angle);
    const s = angle >= 0 && angle < 6.283185307179586 ? angle <= 3.141592653589793 ? Math.sqrt(1.0 - c * c) : -Math.sqrt(1.0 - c * c) : Math.sin(angle);
    const r = this.radius(angle);
    return [r * c,
      r * s];
  };
  this.endPoints = function() {
    return [0, Math.PI * 2];
  };
};
*/
/** @ignore
 * @constructor */
function Line(length) {
  this.length = length;
  this.evaluate = function(u) {
    return [u, 0];
  };
  this.arcLength = function(u) {
    return u;
  };
  this.endPoints = function() {
    return [0, this.length];
  };
}

/**
 * A [curve evaluator object]{@link Curve} for a curve drawn by a curve that rolls along another curve whose position is fixed.<p>
 * This object generates two-dimensional curves, which are returned by the <code>evaluate</code> method as three-dimensional points with the third element (Z coordinate) set to 0.
 * @param {Object} rollingCurve A [curve evaluator object]{@link Curve} that describes the curve that rolls to generate the roulette curve.
 * This curve is assumed to be a smooth, convex closed curve such as a circle. The curve evaluator object <i>should</i> support extrapolating curve positions outside its <code>endPoints()</code> range.
 * @param {Object} fixedCurve A [curve evaluator object]{@link Curve} that describes the curve on which the rolling curve will move. This
 * curve is assumed to be smooth at every point;
 * this includes periodic waves and circles. The curve evaluator object <i>should</i> support extrapolating curve positions outside its <code>endPoints()</code> range.
 * @param {Array<number>} polePoint X and Y coordinates of a point, from the same coordinate
 * system (reference frame) as <i>rollingCurve</i>, that will generate the roulette curve.
 * @param {number} [revolutions] The roulette will be generated by rolling the rolling curve the distance of the fixed curve times this parameter; this will be reflected in this instance's <code>endPoints</code> method. This can be an integer or a noninteger number. If null, undefined, or omitted, the default is 1.
 * @augments Curve
 * @constructor
 */
export const Roulette = function(rollingCurve, fixedCurve, polePoint, revolutions) {
  /** @ignore */
  this.revolutions = typeof revolutions === "undefined" || revolutions === null ? 1 : revolutions;
  /** @ignore */
  this.rolling = new Curve(rollingCurve).toArcLengthParam();
  /** @ignore */
  this.fixedcurve = new Curve(fixedCurve).toArcLengthParam();
  /** @ignore */
  this.rollingCurveLength = this.rolling.getLength();
  /** @ignore */
  this.fixedCurveLength = this.fixedcurve.getLength();
  /** @ignore */
  this.polePoint = [polePoint[0], polePoint[1]];
  this.endPoints = () => [0, this.fixedCurveLength * this.revolutions];

  this.evaluate = function(u) {
    // See Wikipedia article "Roulette (curve)".
    const f = this.fixedcurve.evaluate(u);
    const df = this.fixedcurve.tangent(u);
    const r = this.rolling.evaluate(u);
    const dr = this.rolling.tangent(u);
    const pdiff = MathUtil.vec2sub(polePoint, r);
    const tmp = cmul(pdiff, cdiv(df, dr));
    const ret = MathUtil.vec2add(f, tmp);
    return [ret[0], ret[1], 0];
  };
};

Roulette.prototype = Object.create(Curve.prototype);
Roulette.prototype.constructor = Roulette;

/**
 * Creates a [curve evaluator object]{@link Curve} for a <i>hypotrochoid</i>, a curve drawn by a circle that rolls along the inside
 * of another circle, whose position is fixed, with a center of (0,0).<p>
 * This is a special case of a roulette in which the fixed and rolling curves are circles, and the pole point is the starting point of a circle with the same center as the rolling circle.<p>
 * The following curves can be generated with this class (in the following
 * descriptions, O = <code>outerRadius</code>, R means <code>innerRadius</code>,
 * and D = <code>distFromInnerCenter</code>).<ul>
 * <li>Hypocycloid: D = R (hypotrochoid touching the fixed circle).</li>
 * <li>Curtate hypocycloid: D < R (hypotrochoid not touching the fixed circle).</li>
 * <li>Prolate hypocycloid: D > R (hypotrochoid crossing the fixed circle).</li>
 * <li>Circle: O = R*2; the circle will have radius R - D.</li>
 * <li>Ellipse: O = R*2; the ellipse (unrotated) will have width abs(R+D)*2
 * and height abs(R-D)*2.</li>
 * <li>Line segment with length O*2: O = R*2; D = R.</li>
 * <li>Deltoid: O = R*3; D = R.</li>
 * <li>Astroid: O = R*4; D = R.</li>
 * <li>N-pointed hypocycloid: O = R * N; D = R.</li></ul>
 * @param {number} outerRadius Radius of the circle whose position
 * is fixed.
 * @param {number} innerRadius Radius of the rolling circle.
 * A hypocycloid results when distFromInnerCenter=innerRadius.
 * @param {number} distFromInnerCenter Distance from the center of the
 * rolling circle to the drawing pen.
 * @param {number} [rotationDegrees] Starting angle of the curve from the positive X axis toward the positive Y axis, in degrees. If null, undefined, or omitted, the default is 0.
 * @param {number} [revolutions] Number of times to roll the inner circle around the outer circle to generate the hypotrochoid. This can be an integer or a noninteger number. If null, undefined, or omitted, the default is 1.
 */
Roulette.hypotrochoid = function(outerRadius, innerRadius, distFromInnerCenter, rotationDegrees, revolutions) {
  const f = new Circle(outerRadius, rotationDegrees);
  const r = new Circle(innerRadius);
  const p = new Circle(distFromInnerCenter).evaluate(0);
  return new Roulette(r, f, p, revolutions);
};

/**
 * Creates a [curve evaluator object]{@link Curve} for an <i>epitrochoid</i>, a curve drawn by a circle that rolls along the outside
 * of another circle, whose position is fixed, with a center of (0,0).
 * The rolling circle will start at the positive X axis of the fixed circle
 * unless otherwise given in the parameter <code>rotationDegrees</code>.<p>
 * This is a special case of a roulette in which the fixed and rolling curves are circles, and the pole point is the starting point of a circle with the same center as the rolling circle.<p><p>
 * The following curves can be generated with this class (in the following
 * descriptions, O = <code>outerRadius</code>, R means <code>rollerRadius</code>,
 * and D = <code>distFromRollerCenter</code>).<ul>
 * <li>Epicycloid: D = R (epitrochoid touching the fixed circle).</li>
 * <li>Curtate epicycloid: D < R (epitrochoid not touching the fixed circle).</li>
 * <li>Prolate epicycloid: D > R (epitrochoid crossing the fixed circle).</li>
 * <li>Cardioid: R = O; D = O.</li>
 * <li>Nephroid: R = O/2; D = O/2.</li>
 * <li>Ranunculoid: R = O/5; D = O/5.</li>
 * <li>N-cusped epicycloid: R = O/N; D = O/N.</li>
 * <li>Circle: O = 0; the radius will be R - D.</li></ul>
 * @param {number} outerRadius Radius of the circle whose position
 * is fixed.
 * @param {number} rollerRadius Radius of the rolling circle.
 * An epicycloid results when distFromRollerCenter=rollerRadius.
 * @param {number} distFromRollerCenter Distance from the center of the
 * rolling circle to the drawing pen.
 * @param {number} [rotationDegrees] Starting angle of the curve from the positive X axis toward the positive Y axis, in degrees. If null, undefined, or omitted, the default is 0.
 * @param {number} [revolutions] Number of times to roll the inner circle around the outer circle to generate the epitrochoid. This can be an integer or a noninteger number. If null, undefined, or omitted, the default is 1.
 */
Roulette.epitrochoid = function(outerRadius, innerRadius, distFromInnerCenter, rotationDegrees, revolutions) {
  const f = new Circle(outerRadius, rotationDegrees);
  const r = new Circle(innerRadius, 0, true);
  const p = new Circle(distFromInnerCenter, 0, true).evaluate(0);
  return new Roulette(r, f, p, revolutions);
};

/**
 * Creates a [curve evaluator object]{@link Curve} for a <i>trochoid</i>, a curve drawn by a circle that rolls along the X axis.
 * <p>
 * The following curves can be generated with this class (in the following
 * descriptions, R = <code>radius</code>
 * and D = <code>distFromCenter</code>).<ul>
 * <li>Cycloid: D = R (trochoid touching the X axis).</li>
 * <li>Curtate cycloid: D < R (trochoid not touching the X axis).</li>
 * <li>Prolate cycloid: D > R (trochoid crossing the X axis).</li></ul>
 * @param {number} radius Radius of the rolling circle.
 * @param {number} distFromCenter Distance from the center of the
 * rolling circle to the drawing pen.
 * @param {number} [distance] Distance to roll the inner circle along the X axis to generate the epitrochoid. This can be an integer or a noninteger number. If null, undefined, or omitted, the default is 2 * &pi; * <code>radius</code>.
 */
Roulette.trochoid = function(radius, distFromCenter, distance) {
  const dist = typeof distance === "undefined" || distance === null ?
    Math.PI * 2 * radius : distance;
  const f = new Line(dist);
  const r = new Circle(radius);
  const p = new Circle(distFromCenter).evaluate(0);
  return new Roulette(r, f, p, 1);
};

/**
 * Creates a [curve evaluator object]{@link Curve} for a rose, a special
 * form of hypotrochoid (roulette curve generated when one circle rolls
 * inside another fixed circle).
 * @param {number} num Integer numerator of a parameter that determines the petal form of the rose.
 * For example, the rose is symmetrical if 'num' is even and 'den' is 1.
 * @param {number} denom Integer denominator of a parameter that determines the petal form of the rose. Must not be 0.
 * @param {number} distFromInnerCenter Distance from the center of the
 * rolling circle to the drawing pen.
 * @param {number} [rotationDegrees] Starting angle of the curve from the positive X axis toward the positive Y axis, in degrees. Default is 0.
 * @returns {Roulette} The resulting curve evaluator object.
 */
Roulette.rose = function(num, den, distFromInnerCenter, rotationDegrees) {
  if(den === 0)throw new Error();
  const revs = num * den;
  const n = num / den;
  const fac = distFromInnerCenter / (n + 1);
  return Roulette.hypotrochoid(
    2 * n * fac,
    (n - 1) * fac,
    distFromInnerCenter, rotationDegrees, revs);
};

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

import {BSplineCurve} from "./h3du-bspline";
import {Curve} from "./h3du-curve";
import {MathUtil} from "./h3du-math";
import {MeshBuffer} from "./h3du-meshbuffer";
import {PiecewiseCurve} from "./h3du-piecewisecurve";

/** @ignore
 * @private
 * @constructor */
const LinkedListNode = function(item) {
  this.data = item;
  this.prev = null;
  this.next = null;
};

/** @ignore
 * @constructor */
const LinkedList = function() {
  this.root = null;
  this._last = null;
  this.size = function() {
    let k = this.root;
    let ret = 0;
    while(k) {
      ret++;
      k = k.next;
    }
    return ret;
  };
  this.first = function() {
    return this.root;
  };
  this.last = function() {
    return this._last;
  };
  this.front = function() {
    return this.root ? this.root.data : null;
  };
  this.back = function() {
    return this._last ? this._last.data : null;
  };
  this.clear = function() {
    this.root = this._last = null;
  };
  this.spliceToBegin = function(list) {
    if(list.root) {
      this.root.prev = list._last;
      list._last.next = this.root;
      this.root = list.root;
      list.clear();
    }
  };
  this.spliceToEnd = function(list) {
    if(list.root) {
      this._last.next = list.root;
      list.root.prev = this._last;
      this._last = list._last;
      list.clear();
    }
  };
  this.spliceOneToEnd = function(list, listNode) {
    list.erase(listNode);
    return this.push(listNode.data);
  };
  this.erase = function(node) {
    if(!node)return this;
    if(node === this.root) {
      this.root = node.next;
    }
    if(node === this._last) {
      this._last = node.prev;
    }
    if(node.prev)
      node.prev.next = node.next;
    if(node.next)
      node.next.prev = node.prev;
    return this;
  };
  this.insertAfter = function(item, node) {
    const newNode = new LinkedListNode(item);
    if(node === this._last)
      this._last = newNode;
    const oldNext = node.next;
    node.next = newNode;
    newNode.prev = node;
    newNode.next = oldNext;
    if(oldNext) {
      oldNext.prev = newNode;
    }
    return newNode;
  };
  this.push = function(item) {
    if(!this.root) {
      this.root = this._last = new LinkedListNode(item);
    } else {
      const node = new LinkedListNode(item);
      this._last.next = node;
      node.prev = this._last;
      this._last = node;
    }
    return this;
  };
  this.reverse = function() {
    let s = this.root;
    const e = this._last;
    if(!s)return;
    const oldlast = e;
    const oldroot = s;
    while(s) {
      const n = s.next;
      const p = s.prev;
      s.prev = n;
      s.next = p;
      s = n;
    }
    this.root = oldlast;
    this._last = oldroot;
    return this;
  };
  this.unshift = function(item) {
    if(!this.root) {
      this.root = this._last = new LinkedListNode(item);
    } else {
      const node = new LinkedListNode(item);
      this.root.prev = node;
      node.next = this.root;
      this.root = node;
    }
    return this;
  };
  this.pop = function() {
    if(this._last) {
      if(this._last.prev)
        this._last.prev.next = null;
      this._last = this._last.prev;
    }
    return this;
  };
  this.shift = function() {
    if(this.root) {
      if(this.root.next)
        this.root.next.prev = null;
      this.root = this.root.next;
    }
    return this;
  };
};

// --------------------------------------------------

/** @ignore
 * @constructor */
function LineCurve(x1, y1, x2, y2) {
  this.x1 = x1;
  this.x2 = x2;
  this.y1 = y1;
  this.y2 = y2;
}
LineCurve.prototype = Object.create(Curve.prototype);
LineCurve.prototype.constructor = LineCurve;
/** @ignore */
LineCurve.prototype.evaluate = function(u) {
  return [
    this.x1 + (this.x2 - this.x1) * u,
    this.y1 + (this.y2 - this.y1) * u, 0
  ];
};
/** @ignore */
LineCurve.prototype.velocity = function() {
  return [
    this.x2 - this.x1,
    this.y2 - this.y1, 0
  ];
};
/** @ignore */
LineCurve.prototype.arcLength = function(u) {
  const x = this.x1 + (this.x2 - this.x1) * u;
  const y = this.y1 + (this.y2 - this.y1) * u;
  const dx = x - this.x1;
  const dy = y - this.y1;
  let ret = Math.sqrt(dx * dx + dy * dy);
  if(u < 0)ret = -ret;
  return ret;
};

/** @ignore
 * @constructor
 */
function ArcCurve(x1, y1, x2, y2, rx, ry, rot, cx, cy, theta, delta) {
  this.x1 = x1;
  this.x2 = x2;
  this.y1 = y1;
  this.y2 = y2;
  this.rx = rx;
  this.ry = ry;
  const cr = Math.cos(rot);
  const sr = rot >= 0 && rot < 6.283185307179586 ? rot <= 3.141592653589793 ? Math.sqrt(1.0 - cr * cr) : -Math.sqrt(1.0 - cr * cr) : Math.sin(rot);
  this.cr = cr;
  this.sr = sr;
  this.cx = cx;
  this.cy = cy;
  this.theta = theta;
  this.delta = delta;
}
ArcCurve.prototype = Object.create(Curve.prototype);
ArcCurve.prototype.constructor = ArcCurve;
/** @ignore */
ArcCurve.prototype.evaluate = function(t) {
  if(t === 0)return [this.x1, this.y1, 0];
  if(t === 1)return [this.x2, this.y2, 0];
  const angle = this.theta + this.delta * t;
  const ca = Math.cos(angle);
  const sa = angle >= 0 && angle < 6.283185307179586 ? angle <= 3.141592653589793 ? Math.sqrt(1.0 - ca * ca) : -Math.sqrt(1.0 - ca * ca) : Math.sin(angle);
  return [
    this.cr * ca * this.rx - this.sr * sa * this.rx + this.cx,
    this.sr * ca * this.rx + this.cr * sa * this.ry + this.cy, 0];
};
/** @ignore */
ArcCurve.prototype.velocity = function(t) {
  const angle = this.theta + this.delta * t;
  const ca = Math.cos(angle);
  const sa = angle >= 0 && angle < 6.283185307179586 ? angle <= 3.141592653589793 ? Math.sqrt(1.0 - ca * ca) : -Math.sqrt(1.0 - ca * ca) : Math.sin(angle);
  const caDeriv = -sa * this.delta;
  const saDeriv = ca * this.delta;
  return [
    this.cr * caDeriv * this.rx - this.sr * saDeriv * this.rx,
    this.sr * caDeriv * this.rx + this.cr * saDeriv * this.ry, 0];
};

// --------------------------------------------------
/**
 * Represents a two-dimensional path.
 * A path is a collection of two-dimensional line segments and/or curves. Many paths describe
 * closed figures or connected sequences of lines and curves. Specifically, a path is made up
 * of straight line segments, elliptical arcs, quadratic B&eacute;zier curves,
 * cubic B&eacute;zier curves, or any combination of these, and
 * the path can be discontinuous and/or contain closed parts.
 * <h4>Creating Paths</h4>
 * <p>
 * There are two ways to create paths: using an SVG path string (see {@link GraphicsPath.fromString}), or by calling methods that add its segments.
 * <p>A `GraphicsPath` object stores a current position and a starting position, and many methods don't have you specify a starting position, to cover the common case of drawing a series of connected lines and curves.
 * _.moveTo(x, y)_ - Moves the starting position and current position.
 * _.lineTo(x, y)_ - Adds a line segment from the current position to a new ending position.
 * _.closePath()_ - Closes the path by drawing a line to the starting point, if needed.
 * <h4>Path Segments</h4>
 * Each path can include a number of line segments, B&eacute;zier curves, and elliptical arcs.
 * Line segments are relatively easy to understand. The other two kinds of segments
 * deserve some discussion.
 * A _B&eacute;zier curve_ is a parametric curve based on a polynomial formula. In this kind of
 * curve the endpoints are defined as they are, but the other points define
 * the shape of the curve and generally don't cross the curve.
 * A quadratic B&eacute;zier curve uses 3 points. A cubic B&eacute;zier
 * curve uses 4 points.
 * An _elliptical arc_ is a curve which forms part of an ellipse. There are several ways to
 * parameterize an elliptical arc, as seen in the _.arc()_, _.arcTo()_, and _.arcSvgTo()_ methods
 * of the `GraphicsPath` class.
 * @constructor
 */
export const GraphicsPath = function() {
  this.segments = [];
  this.incomplete = false;
  this.startPos = [0, 0];
  this.endPos = [0, 0];
};
  /** @ignore */
const Triangulate = {};
/** @ignore */
GraphicsPath.CLOSE = 0;
/** @ignore */
GraphicsPath.LINE = 1;
/** @ignore */
GraphicsPath.QUAD = 2;
/** @ignore */
GraphicsPath.CUBIC = 3;
/** @ignore */
GraphicsPath.ARC = 4;
/**
 * Returns whether the curve path is incomplete
 * because of an error in parsing the curve string.
 * This flag will be reset if a moveTo command,
 * closePath command, or another path segment
 * is added to the path.
 * @returns {boolean} Return value.
 */
GraphicsPath.prototype.isIncomplete = function() {
  return this.incomplete;
};
/** @ignore */
GraphicsPath._startPoint = function(a) {
  if(a[0] === GraphicsPath.CLOSE) {
    return [0, 0];
  } else {
    return [a[1], a[2]];
  }
};
/** @ignore */
GraphicsPath._endPoint = function(a) {
  if(a[0] === GraphicsPath.CLOSE) {
    return [0, 0];
  } else if(a[0] === GraphicsPath.ARC) {
    return [a[8], a[9]];
  } else {
    return [a[a.length - 2], a[a.length - 1]];
  }
};
/** @ignore */
GraphicsPath._point = function(seg, t) {
  let a;
  let b;
  let x;
  let y;
  if(seg[0] === GraphicsPath.CLOSE) {
    return [0, 0];
  } else if(seg[0] === GraphicsPath.LINE) {
    return [
      seg[1] + (seg[3] - seg[1]) * t,
      seg[2] + (seg[4] - seg[2]) * t
    ];
  } else if(seg[0] === GraphicsPath.QUAD) {
    const mt = 1 - t;
    const mtsq = mt * mt;
    const mt2 = mt + mt;
    a = seg[1] * mtsq;
    b = seg[3] * mt2;
    x = a + t * (b + t * seg[5]);
    a = seg[2] * mtsq;
    b = seg[4] * mt2;
    y = a + t * (b + t * seg[6]);
    return [x, y];
  } else if(seg[0] === GraphicsPath.CUBIC) {
    a = (seg[3] - seg[1]) * 3;
    b = (seg[5] - seg[3]) * 3 - a;
    let c = seg[7] - a - b - seg[1];
    x = seg[1] + t * (a + t * (b + t * c));
    a = (seg[4] - seg[2]) * 3;
    b = (seg[6] - seg[4]) * 3 - a;
    c = seg[8] - a - b - seg[2];
    y = seg[2] + t * (a + t * (b + t * c));
    return [x, y];
  } else if(seg[0] === GraphicsPath.ARC) {
    if(t === 0)return [seg[1], seg[2]];
    if(t === 1)return [seg[8], seg[9]];
    const rx = seg[3];
    const ry = seg[4];
    const cx = seg[10];
    const cy = seg[11];
    const theta = seg[12];
    const delta = seg[13] - seg[12];
    const rot = seg[5];
    const angle = theta + delta * t;
    const cr = Math.cos(rot);
    const sr = rot >= 0 && rot < 6.283185307179586 ? rot <= 3.141592653589793 ? Math.sqrt(1.0 - cr * cr) : -Math.sqrt(1.0 - cr * cr) : Math.sin(rot);
    const ca = Math.cos(angle);
    const sa = angle >= 0 && angle < 6.283185307179586 ? angle <= 3.141592653589793 ? Math.sqrt(1.0 - ca * ca) : -Math.sqrt(1.0 - ca * ca) : Math.sin(angle);
    return [
      cr * ca * rx - sr * sa * ry + cx,
      sr * ca * rx + cr * sa * ry + cy];
  } else {
    return [0, 0];
  }
};
/** @ignore */
GraphicsPath._segToCurve = function(seg) {
  if(seg[0] === GraphicsPath.LINE) {
    return new LineCurve(seg[1], seg[2], seg[3], seg[4]);
  } else if(seg[0] === GraphicsPath.QUAD) {
    return BSplineCurve.fromBezierCurve([
      [seg[1], seg[2], 0], [seg[3], seg[4], 0], [seg[5], seg[6], 0]]);
  } else if(seg[0] === GraphicsPath.CUBIC) {
    return BSplineCurve.fromBezierCurve([
      [seg[1], seg[2], 0], [seg[3], seg[4], 0], [seg[5], seg[6], 0], [seg[7], seg[8], 0]]);
  } else if(seg[0] === GraphicsPath.ARC) {
    const rx = seg[3];
    const ry = seg[4];
    const cx = seg[10];
    const cy = seg[11];
    const theta = seg[12];
    const delta = seg[13] - seg[12];
    const rot = seg[5];
    return new ArcCurve(seg[1], seg[2], seg[8], seg[9], rx, ry, rot, cx, cy, theta, delta);
  } else {
    throw new Error();
  }
};

/** @ignore */
GraphicsPath._subdivide2 = function(a1, a2, a3, a4, a5, a6, a7, a8, t1, t2, tcut, list, flatness, mode, depth) {
  const x1 = a1 + (a3 - a1) * tcut;
  const x2 = a3 + (a5 - a3) * tcut;
  const xc1 = x1 + (x2 - x1) * tcut;
  const x3 = a5 + (a7 - a5) * tcut;
  const xc2 = x2 + (x3 - x2) * tcut;
  const xd = xc1 + (xc2 - xc1) * tcut;
  const y1 = a2 + (a4 - a2) * tcut;
  const y2 = a4 + (a6 - a4) * tcut;
  const yc1 = y1 + (y2 - y1) * tcut;
  const y3 = a6 + (a8 - a6) * tcut;
  const yc2 = y2 + (y3 - y2) * tcut;
  const yd = yc1 + (yc2 - yc1) * tcut;
  const tmid = t1 + (t2 - t1) * tcut;
  GraphicsPath._flattenCubic(a1, a2, x1, y1, xc1, yc1, xd, yd, t1, tmid, list, flatness, mode, depth + 1);
  GraphicsPath._flattenCubic(xd, yd, xc2, yc2, x3, y3, a7, a8, tmid, t2, list, flatness, mode, depth + 1);
};
/** @ignore */
GraphicsPath._subdivide3 = function(a1, a2, a3, a4, a5, a6, a7, a8, t1, t2, tcut, tcut2, list, flatness, mode, depth) {
  const x1 = a1 + (a3 - a1) * tcut;
  const x2 = a3 + (a5 - a3) * tcut;
  const xc1 = x1 + (x2 - x1) * tcut;
  const x3 = a5 + (a7 - a5) * tcut;
  const xc2 = x2 + (x3 - x2) * tcut;
  const xd = xc1 + (xc2 - xc1) * tcut;
  const y1 = a2 + (a4 - a2) * tcut;
  const y2 = a4 + (a6 - a4) * tcut;
  const yc1 = y1 + (y2 - y1) * tcut;
  const y3 = a6 + (a8 - a6) * tcut;
  const yc2 = y2 + (y3 - y2) * tcut;
  const yd = yc1 + (yc2 - yc1) * tcut;
  const tmid = t1 + (t2 - t1) * tcut;
  const tcutx = (tcut2 - tmid) / (t2 - tmid);
  GraphicsPath._flattenCubic(a1, a2, x1, y1, xc1, yc1, xd, yd, t1, tmid, list, flatness, mode, depth + 1);
  GraphicsPath._subdivide2(xd, yd, xc2, yc2, x3, y3, a7, a8, tmid, t2, tcutx, list, flatness, mode, depth + 1);
};
/** @ignore */
GraphicsPath._flattenCubic = function(a1, a2, a3, a4, a5, a6, a7, a8, t1, t2, list, flatness, mode, depth) {
  if(typeof depth === "undefined" || depth === null)depth = 0;
  if(depth >= 20 || Math.abs(a1 - a3 - a3 + a5) + Math.abs(a3 - a5 - a5 + a7) +
    Math.abs(a2 - a4 - a4 + a6) + Math.abs(a4 - a6 - a6 + a8) <= flatness) {
    if(mode === 0) {
      list.push([a1, a2, a7, a8]);
    } else {
      const dx = a7 - a1;
      const dy = a8 - a2;
      const length = Math.sqrt(dx * dx + dy * dy);
      list.push(t1, t2, length);
    }
  } else {
    GraphicsPath._subdivide2(a1, a2, a3, a4, a5, a6, a7, a8, t1, t2, 0.5, list, flatness, mode, depth);
  }
};
/** @ignore */
GraphicsPath._flattenQuad = function(a1, a2, a3, a4, a5, a6, t1, t2, list, flatness, mode, depth) {
  if(typeof depth === "undefined" || depth === null)depth = 0;
  if(depth >= 20 || Math.abs(a1 - a3 - a3 + a5) + Math.abs(a2 - a4 - a4 + a6) <= flatness) {
    if(mode === 0) {
      list.push([a1, a2, a5, a6]);
    } else {
      const dx = a5 - a1;
      const dy = a6 - a2;
      const length = Math.sqrt(dx * dx + dy * dy);
      list.push(t1, t2, length);
    }
  } else {
    const x1 = (a1 + a3) * 0.5;
    const x2 = (a3 + a5) * 0.5;
    const xc = (x1 + x2) * 0.5;
    const y1 = (a2 + a4) * 0.5;
    const y2 = (a4 + a6) * 0.5;
    const yc = (y1 + y2) * 0.5;
    const tmid = (t1 + t2) * 0.5;
    GraphicsPath._flattenQuad(a1, a2, x1, y1, xc, yc, t1, tmid, list, flatness, mode, depth + 1);
    GraphicsPath._flattenQuad(xc, yc, x2, y2, a5, a6, tmid, t2, list, flatness, mode, depth + 1);
  }
};
/** @ignore */
GraphicsPath._flattenArc = function(a, t1, t2, list, flatness, mode, depth) {
  const rot = a[5];
  const crot = Math.cos(rot);
  const srot = rot >= 0 && rot < 6.283185307179586 ? rot <= 3.141592653589793 ? Math.sqrt(1.0 - crot * crot) : -Math.sqrt(1.0 - crot * crot) : Math.sin(rot);
  const ellipseInfo = [a[3], a[4], a[10], a[11], crot, srot];
  GraphicsPath._flattenArcInternal(ellipseInfo, a[1], a[2], a[8], a[9], a[12], a[13], t1, t2, list, flatness, mode, depth);
};
/** @ignore */
GraphicsPath._flattenArcInternal = function(ellipseInfo, x1, y1, x2, y2, theta1, theta2, t1, t2, list, flatness, mode, depth) {
  if(typeof depth === "undefined" || depth === null)depth = 0;
  const thetaMid = (theta1 + theta2) * 0.5;
  const tmid = (t1 + t2) * 0.5;
  const ca = Math.cos(thetaMid);
  const sa = thetaMid >= 0 && thetaMid < 6.283185307179586 ? thetaMid <= 3.141592653589793 ? Math.sqrt(1.0 - ca * ca) : -Math.sqrt(1.0 - ca * ca) : Math.sin(thetaMid);
  const xmid = ellipseInfo[4] * ca * ellipseInfo[0] - ellipseInfo[5] * sa * ellipseInfo[1] + ellipseInfo[2];
  const ymid = ellipseInfo[5] * ca * ellipseInfo[0] + ellipseInfo[4] * sa * ellipseInfo[1] + ellipseInfo[3];
  if(depth >= 20 || Math.abs(x1 - xmid - xmid + x2) + Math.abs(y1 - ymid - ymid + y2) <= flatness) {
    if(mode === 0) {
      list.push([x1, y1, xmid, ymid]);
      list.push([xmid, ymid, x2, y2]);
    } else {
      let dx = xmid - x1;
      let dy = ymid - y1;
      let length = Math.sqrt(dx * dx + dy * dy);
      list.push(t1, tmid, length);
      dx = x2 - xmid;
      dy = y2 - ymid;
      length = Math.sqrt(dx * dx + dy * dy);
      list.push(tmid, t2, length);
    }
  } else {
    GraphicsPath._flattenArcInternal(ellipseInfo, x1, y1, xmid, ymid, theta1, thetaMid, t1, tmid, list, flatness, mode, depth + 1);
    GraphicsPath._flattenArcInternal(ellipseInfo, xmid, ymid, x2, y2, thetaMid, theta2, tmid, t2, list, flatness, mode, depth + 1);
  }
};
/** @ignore */
GraphicsPath.prototype._start = function() {
  let i;
  for (i = 0; i < this.segments.length; i++) {
    const s = this.segments[i];
    if(s[0] !== GraphicsPath.CLOSE)return GraphicsPath._startPoint(s);
  }
  return [0, 0];
};
/** @ignore */
GraphicsPath.prototype._end = function() {
  let i;
  for (i = this.segments.length - 1; i >= 0; i--) {
    const s = this.segments[i];
    if(s[0] !== GraphicsPath.CLOSE)return GraphicsPath._endPoint(s);
  }
  return [0, 0];
};

/**
 * Merges the path segments in another path onto this one.
 * @param {GraphicsPath} path Another graphics path.
 * Can be null.
 * @returns {GraphicsPath} This object.
 */
GraphicsPath.prototype.merge = function(path) {
  let oldpos = null;
  if(!path)return this;
  const segsLength = path.segments.length;
  let i;
  for (i = 0; i < segsLength; i++) {
    const a = path.segments[i];
    if(a[0] === GraphicsPath.CLOSE) {
      this.closePath();
    } else {
      const start = GraphicsPath._startPoint(a);
      if(!oldpos || oldpos[0] !== start[0] || oldpos[1] !== start[1]) {
        this.moveTo(start[0], start[1]);
      }
      oldpos = GraphicsPath._endPoint(a);
      if(a[0] === GraphicsPath.LINE) {
        this.lineTo(a[3], a[4]);
      }
      if(a[0] === GraphicsPath.QUAD) {
        this.quadraticCurveTo(a[3], a[4], a[5], a[6]);
      }
      if(a[0] === GraphicsPath.CUBIC) {
        this.bezierCurveTo(a[3], a[4], a[5], a[6], a[7], a[8]);
      }
      if(a[0] === GraphicsPath.ARC) {
        const delta = a[13] - a[12];
        const largeArc = Math.abs(delta) > Math.PI;
        this.arcSvgTo(a[3], a[4], a[5] * GraphicsPath._toDegrees,
          largeArc, delta > 0, a[8], a[9]);
      }
    }
  }
  return this;
};

/**
 * Returns this path in the form of a string in SVG path format.
 * See {@link GraphicsPath.fromString}.
 * @returns {string} A string describing the path in the SVG path
 * format.
 */
GraphicsPath.prototype.toString = function() {
  let oldpos = null;
  let ret = "";

  let i;
  for (i = 0; i < this.segments.length; i++) {
    const a = this.segments[i];
    if(a[0] === GraphicsPath.CLOSE) {
      ret += "Z";
    } else {
      const start = GraphicsPath._startPoint(a);
      if(!oldpos || oldpos[0] !== start[0] || oldpos[1] !== start[1]) {
        ret += "M" + start[0] + "," + start[1];
      }
      oldpos = GraphicsPath._endPoint(a);
      if(a[0] === GraphicsPath.LINE) {
        ret += "L" + a[3] + "," + a[4];
      }
      if(a[0] === GraphicsPath.QUAD) {
        ret += "Q" + a[3] + "," + a[4] + "," + a[5] + "," + a[6];
      }
      if(a[0] === GraphicsPath.CUBIC) {
        ret += "C" + a[3] + "," + a[4] + "," + a[5] + "," + a[6] + "," + a[7] + "," + a[8];
      }
      if(a[0] === GraphicsPath.ARC) {
        const delta = a[13] - a[12];
        const largeArc = Math.abs(delta) > Math.PI;
        ret += "A" + a[3] + "," + a[4] + "," + a[5] * 180 / Math.PI + "," +
      (largeArc ? "1" : "0") + (delta > 0 ? "1" : "0") + a[8] + "," + a[9];
      }
    }
  }
  return ret;
};
/**
 * Finds the approximate length of this path.
 * @param {number} [flatness] No longer used by this method.
 * @returns {number} Approximate length of this path
 * in units.
 */
GraphicsPath.prototype.pathLength = function(flatness) {
  if(this.segments.length === 0)return 0;
  if(typeof flatness !== "undefined" && flatness !== null) {
    console.warn("Unused parameter flatness is defined");
  }
  return this.getCurves().getLength();
};
/**
 * Gets an array of line segments approximating
 * the path.
 * @param {number} [flatness] When curves and arcs
 * are decomposed to line segments, the
 * segments will be close to the true path of the curve by this
 * value, given in units. If null, undefined, or omitted, default is 1.
 * @returns {Array<Array<number>>} Array of line segments.
 * Each line segment is an array of four numbers: the X and
 * Y coordinates of the start point, respectively, then the X and
 * Y coordinates of the end point, respectively.
 */
GraphicsPath.prototype.getLines = function(flatness) {
  const ret = [];
  if(typeof flatness === "undefined" || flatness === null)flatness = 1.0;
  let i;
  for (i = 0; i < this.segments.length; i++) {
    const s = this.segments[i];
    if(s[0] === GraphicsPath.QUAD) {
      GraphicsPath._flattenQuad(s[1], s[2], s[3], s[4],
        s[5], s[6], 0.0, 1.0, ret, flatness * 2, 0, 0);
    } else if(s[0] === GraphicsPath.CUBIC) {
      GraphicsPath._flattenCubic(s[1], s[2], s[3], s[4],
        s[5], s[6], s[7], s[8], 0.0, 1.0, ret, flatness * 2, 0, 0);
    } else if(s[0] === GraphicsPath.ARC) {
      GraphicsPath._flattenArc(s, 0.0, 1.0, ret, flatness * 2, 0, 0);
    } else if(s[0] !== GraphicsPath.CLOSE) {
      ret.push([s[1], s[2], s[3], s[4]]);
    }
  }
  return ret;
};
/**
 * Creates a path in which curves and arcs are decomposed
 * to line segments.
 * @param {number} [flatness] When curves and arcs
 * are decomposed to line segments, the
 * segments will be close to the true path of the curve by this
 * value, given in units. If null, undefined, or omitted, default is 1.
 * @returns {GraphicsPath} A path consisting only of line
 * segments and close commands.
 */
GraphicsPath.prototype.toLinePath = function(flatness) {
  const ret = [];
  const path = new GraphicsPath();
  let last = null;
  if(typeof flatness === "undefined" || flatness === null)flatness = 1.0;
  let i;
  for (i = 0; i < this.segments.length; i++) {
    const s = this.segments[i];
    if(s[0] === GraphicsPath.CLOSE) {
      path.closePath();
      continue;
    }
    let j;
    const endpt = GraphicsPath._endPoint(s);
    const startpt = GraphicsPath._startPoint(s);
    if(!last || last[0] !== startpt[0] || last[1] !== startpt[1]) {
      path.moveTo(startpt[0], startpt[1]);
    }
    last = endpt;
    ret.splice(0, ret.length);
    if(s[0] === GraphicsPath.QUAD) {
      GraphicsPath._flattenQuad(s[1], s[2], s[3], s[4],
        s[5], s[6], 0.0, 1.0, ret, flatness * 2, 0, 0);
      for(j = 0; j < ret.length; j++) {
        path.lineTo(ret[j][2], ret[j][3]);
      }
    } else if(s[0] === GraphicsPath.CUBIC) {
      GraphicsPath._flattenCubic(s[1], s[2], s[3], s[4],
        s[5], s[6], s[7], s[8], 0.0, 1.0, ret, flatness * 2, 0, 0);
      for(j = 0; j < ret.length; j++) {
        path.lineTo(ret[j][2], ret[j][3]);
      }
    } else if(s[0] === GraphicsPath.ARC) {
      GraphicsPath._flattenArc(s, 0.0, 1.0, ret, flatness * 2, 0, 0);
      for(j = 0; j < ret.length; j++) {
        path.lineTo(ret[j][2], ret[j][3]);
      }
    } else if(s[0] !== GraphicsPath.CLOSE) {
      path.lineTo(s[3], s[4]);
    } else {
      path.closePath();
    }
  }
  return path;
};

/**
 * Creates a path in which arcs are decomposed
 * to cubic B&eacute;zier curves (which will approximate those arcs).
 * @returns {GraphicsPath} A path consisting only of line
 * segments, B&eacute;zier curves, and close commands.
 */
GraphicsPath.prototype.toCurvePath = function() {
  const path = new GraphicsPath();
  let last = null;
  let i;
  for (i = 0; i < this.segments.length; i++) {
    const s = this.segments[i];
    if(s[0] === GraphicsPath.CLOSE) {
      path.closePath();
      continue;
    }
    let j;
    const endpt = GraphicsPath._endPoint(s);
    const startpt = GraphicsPath._startPoint(s);
    if(!last || last[0] !== startpt[0] || last[1] !== startpt[1]) {
      path.moveTo(startpt[0], startpt[1]);
    }
    last = endpt;
    if(s[0] === GraphicsPath.QUAD) {
      path.quadraticCurveTo(s[3], s[4],
        s[5], s[6]);
    } else if(s[0] === GraphicsPath.CUBIC) {
      path.bezierCurveTo(s[3], s[4],
        s[5], s[6], s[7], s[8]);
    } else if(s[0] === GraphicsPath.ARC) {
      const curves = GraphicsPath._arcToBezierCurves(s[10], s[11], s[3], s[4], s[5], s[12], s[13]);
      for(j = 0; j < curves.length; j++) {
        path.bezierCurveTo(curves[j][2], curves[j][3], curves[j][4],
          curves[j][5], curves[j][6], curves[j][7]);
      }
    } else if(s[0] === GraphicsPath.LINE) {
      path.lineTo(s[3], s[4]);
    }
  }
  return path;
};

/** @ignore */
GraphicsPath._accBounds = function(ret, s, t) {
  if(t >= 0 && t <= 1) {
    const pt = GraphicsPath._point(s, t);
    ret[0] = Math.min(pt[0], ret[0]);
    ret[1] = Math.min(pt[1], ret[1]);
    ret[2] = Math.max(pt[0], ret[2]);
    ret[3] = Math.max(pt[1], ret[3]);
  }
};
/** @ignore */
GraphicsPath._accBoundsPoint = function(ret, x, y) {
  ret[0] = Math.min(x, ret[0]);
  ret[1] = Math.min(y, ret[1]);
  ret[2] = Math.max(x, ret[2]);
  ret[3] = Math.max(y, ret[3]);
};
/** @ignore */
GraphicsPath._accBoundsArc = function(ret, rx, ry, cphi, sphi, cx, cy, angle) {
  const ca = Math.cos(angle);
  const sa = angle >= 0 && angle < 6.283185307179586 ? angle <= 3.141592653589793 ? Math.sqrt(1.0 - ca * ca) : -Math.sqrt(1.0 - ca * ca) : Math.sin(angle);
  const px = cphi * ca * rx - sphi * sa * ry + cx;
  const py = sphi * ca * rx + cphi * sa * ry + cy;
  ret[0] = Math.min(px, ret[0]);
  ret[1] = Math.min(py, ret[1]);
  ret[2] = Math.max(px, ret[2]);
  ret[3] = Math.max(py, ret[3]);
};
/** @ignore */
GraphicsPath._normAngleRadians = function(angle) {
  const twopi = Math.PI * 2;
  let normAngle = angle;
  if(normAngle >= 0) {
    normAngle = normAngle < twopi ? normAngle : normAngle % twopi;
  } else {
    normAngle %= twopi;
    normAngle += twopi;
  }
  return normAngle;
};
/** @ignore */
GraphicsPath._angleInRange = function(angle, startAngle, endAngle) {
  const twopi = Math.PI * 2;
  const diff = endAngle - startAngle;
  if(Math.abs(diff) >= twopi)return true;
  const normAngle = GraphicsPath._normAngleRadians(angle);
  const normStart = GraphicsPath._normAngleRadians(startAngle);
  const normEnd = GraphicsPath._normAngleRadians(endAngle);
  if(startAngle === endAngle) {
    return normAngle === normStart;
  } else if(startAngle < endAngle) {
    if(normStart < normEnd) {
      return normAngle >= normStart && normAngle <= normEnd;
    } else {
      return normAngle >= normStart || normAngle <= normEnd;
    }
  } else if(normEnd < normStart) {
    return normAngle >= normEnd && normAngle <= normStart;
  } else {
    return normAngle >= normEnd || normAngle <= normStart;
  }
};
/**
 * Calculates an axis-aligned bounding box that tightly
 * fits this graphics path.
 * @returns {Array<number>} An array of four numbers
 * describing the bounding box. The first two are
 * the lowest X and Y coordinates, and the last two are
 * the highest X and Y coordinates. If the path is empty,
 * returns the array (Infinity, Infinity, -Infinity, -Infinity).
 */
GraphicsPath.prototype.getBounds = function() {
  const inf = Number.POSITIVE_INFINITY;
  const ret = [inf, inf, -inf, inf];
  let first = true;
  let i;
  for (i = 0; i < this.segments.length; i++) {
    const s = this.segments[i];
    let ax;
    let ay;
    if(s[0] === GraphicsPath.CLOSE)continue;
    const endpt = GraphicsPath._endPoint(s);
    const x1 = s[1];
    const y1 = s[2];
    let x2 = endpt[0];
    let y2 = endpt[1];
    let bx;
    let by;
    if(first) {
      ret[0] = Math.min(x1, x2);
      ret[1] = Math.min(y1, y2);
      ret[2] = Math.max(x1, x2);
      ret[3] = Math.max(y1, y2);
    } else {
      ret[0] = Math.min(x1, x2, ret[0]);
      ret[1] = Math.min(y1, y2, ret[1]);
      ret[2] = Math.max(x1, x2, ret[2]);
      ret[3] = Math.max(y1, y2, ret[3]);
    }
    first = false;
    if(s[0] === GraphicsPath.QUAD) {
      x2 = s[5];
      y2 = s[6];
      ax = x1 - 2 * s[3] + x2;
      ay = y1 - 2 * s[4] + y2;
      if(ax !== 0) {
        GraphicsPath._accBounds(ret, s, (x1 - s[3]) / ax);
      }
      if(ay !== 0) {
        GraphicsPath._accBounds(ret, s, (y1 - s[4]) / ay);
      }
    } else if(s[0] === GraphicsPath.CUBIC) {
      x2 = s[7];
      y2 = s[8];
      const denomX = x1 - 3 * s[3] + 3 * s[5] - x2;
      const denomY = y1 - 3 * s[4] + 3 * s[6] - y2;
      if(denomX !== 0 || denomY !== 0) {
        ax = x1 - 2 * s[3] + s[5];
        ay = y1 - 2 * s[4] + s[6];
        bx = s[3] * s[3] + s[5] * s[5] - s[5] * (x1 + s[3]) + x2 * (x1 - s[3]);
        by = s[4] * s[4] + s[6] * s[6] - s[6] * (y1 + s[4]) + y2 * (y1 - s[4]);
        if(bx >= 0 && denomX !== 0) {
          bx = Math.sqrt(bx);
          GraphicsPath._accBounds(ret, s, (ax - bx) / denomX);
          GraphicsPath._accBounds(ret, s, (ax + bx) / denomX);
        }
        if(by >= 0 && denomY !== 0) {
          by = Math.sqrt(by);
          GraphicsPath._accBounds(ret, s, (ay - by) / denomY);
          GraphicsPath._accBounds(ret, s, (ay + by) / denomY);
        }
      }
    } else if(s[0] === GraphicsPath.ARC) {
      const rx = s[3];
      const ry = s[4];
      const cx = s[10];
      const cy = s[11];
      const theta = s[12];
      const delta = s[13];
      const rot = s[5]; // Rotation in radians
      let cosp;
      let sinp;
      if(Math.abs(delta - theta) >= Math.PI * 2) {
        // This arc goes around the entire ellipse, giving
        // it a much simpler formula for the bounding box
        let distx;
        let disty;
        if(rx === ry) {
          // The arc forms a circle
          distx = rx;
          disty = ry;
        } else {
          cosp = Math.cos(rot);
          sinp = rot >= 0 && rot < 6.283185307179586 ? rot <= 3.141592653589793 ? Math.sqrt(1.0 - cosp * cosp) : -Math.sqrt(1.0 - cosp * cosp) : Math.sin(rot);
          ax = cosp * rx;
          ay = sinp * rx;
          bx = -sinp * ry;
          by = cosp * ry;
          distx = Math.sqrt(ax * ax + bx * bx);
          disty = Math.sqrt(ay * ay + by * by);
        }
        GraphicsPath._accBoundsPoint(ret, cx + distx, cy + disty);
        GraphicsPath._accBoundsPoint(ret, cx + distx, cy - disty);
        GraphicsPath._accBoundsPoint(ret, cx - distx, cy + disty);
        GraphicsPath._accBoundsPoint(ret, cx - distx, cy - disty);
      } else if(delta !== theta) { // NOTE: Endpoints were already included in case delta==theta
        cosp = Math.cos(rot);
        sinp = rot >= 0 && rot < 6.283185307179586 ? rot <= 3.141592653589793 ? Math.sqrt(1.0 - cosp * cosp) : -Math.sqrt(1.0 - cosp * cosp) : Math.sin(rot);
        const angles = [];
        let angle;
        if(cosp !== 0 && sinp !== 0) {
          angle = Math.atan2(-ry * sinp / cosp, rx);
          angles.push(angle, angle + Math.PI);
          angle = Math.atan2(ry * cosp / sinp, rx);
          angles.push(angle, angle + Math.PI);
        } else {
          angles.push(0, Math.PI, Math.PI * 0.5, Math.PI * 1.5);
        }
        let k;
        for (k = 0; k < angles.length; k++) {
          if(GraphicsPath._angleInRange(angles[k], theta, delta)) {
            GraphicsPath._accBoundsArc(ret, rx, ry, cosp, sinp, cx, cy, angles[k]);
          }
        }
      }
    }
  }
  return ret;
};

/**
 * Returns a path that reverses the course of this path.
 * @returns {GraphicsPath} A GraphicsPath
 * object with its path segments reversed.
 */
GraphicsPath.prototype.reverse = function() {
  let lastptx = 0;
  let lastpty = 0;
  let lastClosed = false;
  let pathStartX = 0;
  let pathStartY = 0;
  const ret = new GraphicsPath();
  let i;
  for (i = this.segments.length - 1; i >= 0; i--) {
    const s = this.segments[i];
    let startpt = GraphicsPath._startPoint(s);
    let endpt = GraphicsPath._endPoint(s);
    if(s[0] !== GraphicsPath.CLOSE) {
      if(i === this.segments.length - 1) {
        ret.moveTo(endpt[0], endpt[1]);
      } else if(lastptx !== endpt[0] || lastpty !== endpt[1]) {
        if(lastClosed) {
          ret.closePath();
        }
        lastClosed = false;
        ret.moveTo(endpt[0], endpt[1]);
      }
      lastptx = startpt[0];
      lastpty = startpt[1];
    }
    if(s[0] === GraphicsPath.CLOSE) {
      if(lastClosed) {
        ret.closePath();
      }
      lastClosed = true;
      let havePathStart = false;
      let j;
      for (j = i - 1; j >= 0; j--) {
        if(this.segments[j][0] === GraphicsPath.CLOSE) {
          break;
        }
        startpt = GraphicsPath._startPoint(this.segments[j]);
        endpt = GraphicsPath._endPoint(this.segments[j]);
        if(havePathStart) {
          if(pathStartX !== endpt[0] || pathStartY !== endpt[1]) {
            break;
          }
        }
        pathStartX = startpt[0];
        pathStartY = startpt[1];
        havePathStart = true;
      }
      if(havePathStart) {
        ret.moveTo(pathStartX, pathStartY);
        endpt = GraphicsPath._endPoint(this.segments[i - 1]);
        if(pathStartX !== endpt[0] || pathStartY !== endpt[1]) {
          ret.lineTo(endpt[0], endpt[1]);
        }
        lastptx = endpt[0];
        lastpty = endpt[1];
      }
    } else if(s[0] === GraphicsPath.QUAD) {
      ret.quadraticCurveTo(s[3], s[4], s[1], s[2]);
    } else if(s[0] === GraphicsPath.CUBIC) {
      ret.bezierCurveTo(s[5], s[6], s[3], s[4], s[1], s[2]);
    } else if(s[0] === GraphicsPath.ARC) {
      const delta = s[13] - s[12];
      const reversedSweep = delta < 0;
      const largeArc = Math.abs(delta) > Math.PI;
      ret.arcSvgTo(s[3], s[4], s[5] * GraphicsPath._toDegrees,
        largeArc, reversedSweep, s[1], s[2]);
    } else if(s[0] === GraphicsPath.LINE) {
      ret.lineTo(s[1], s[2]);
    }
  }
  if(lastClosed)
    ret.closePath();
  return ret;
};
/** @ignore */
GraphicsPath._pushXY = function(curPath, x, y, nodegen) {
  if(!nodegen) {
    curPath.push(x, y);
  } else if(curPath.length === 0) {
    curPath.push(x, y);
  } else if(curPath[curPath.length - 1] !== y || curPath[curPath.length - 2] !== x) {
    curPath.push(x, y);
  }
};

/** @ignore */
GraphicsPath.prototype._getSubpaths = function(flatness, nodegen) {
  const tmp = [];
  const subpaths = [];
  let j;
  if(typeof flatness === "undefined" || flatness === null)flatness = 1.0;
  let lastptx = 0;
  let lastpty = 0;
  let first = true;
  let curPath = null;
  let i;
  for (i = 0; i < this.segments.length; i++) {
    const s = this.segments[i];
    const startpt = GraphicsPath._startPoint(s);
    const endpt = GraphicsPath._endPoint(s);
    tmp.splice(0, tmp.length);
    if(s[0] !== GraphicsPath.CLOSE) {
      if(first || lastptx !== startpt[0] || lastpty !== startpt[1]) {
        curPath = startpt;
        subpaths.push(curPath);
        first = false;
      }
      lastptx = endpt[0];
      lastpty = endpt[1];
    }
    if(s[0] === GraphicsPath.QUAD) {
      GraphicsPath._flattenQuad(s[1], s[2], s[3], s[4],
        s[5], s[6], 0.0, 1.0, tmp, flatness * 2, 0, 0);
      for(j = 0; j < tmp.length; j++) {
        GraphicsPath._pushXY(curPath, tmp[j][2], tmp[j][3], nodegen);
      }
    } else if(s[0] === GraphicsPath.CUBIC) {
      GraphicsPath._flattenCubic(s[1], s[2], s[3], s[4],
        s[5], s[6], s[7], s[8], 0.0, 1.0, tmp, flatness * 2, 0, 0);
      for(j = 0; j < tmp.length; j++) {
        GraphicsPath._pushXY(curPath, tmp[j][2], tmp[j][3], nodegen);
      }
    } else if(s[0] === GraphicsPath.ARC) {
      GraphicsPath._flattenArc(s, 0.0, 1.0, tmp, flatness * 2, 0, 0);
      for(j = 0; j < tmp.length; j++) {
        GraphicsPath._pushXY(curPath, tmp[j][2], tmp[j][3], nodegen);
      }
    } else if(s[0] !== GraphicsPath.CLOSE) {
      GraphicsPath._pushXY(curPath, s[3], s[4], nodegen);
    }
  }
  return subpaths;
};

/** @ignore
 * @private
 * @constructor */
GraphicsPath._CurveList = function(curves) {
  Curve.prototype.constructor.apply(this,
    [new PiecewiseCurve(curves).toArcLengthParam().fitRange(0, 1)]);
  this.curves = curves;
};
GraphicsPath._CurveList.prototype = Object.create(Curve.prototype);
GraphicsPath._CurveList.prototype.constructor = GraphicsPath._CurveList;
GraphicsPath._CurveList.prototype.getCurves = function() {
  return this.curves;
};
/**
 * Does a linear interpolation between two graphics paths.
 * @param {GraphicsPath} other The second graphics path.
 * @param {number} t An interpolation factor, generally ranging from 0 through 1.
 * Closer to 0 means closer to this path, and closer to 1 means closer
 * to "other". If the input paths contain arc
 * segments that differ in the large arc and sweep flags, the flags from
 * the first path's arc are used if "t" is less than 0.5; and the flags from
 * the second path's arc are used otherwise.<p>For a nonlinear
 * interpolation, define a function that takes a value that usually ranges from 0 through 1
 * and generally returns a value that usually ranges from 0 through 1,
 * and pass the result of that function to this method.
 * See the documentation for {@link MathUtil.vec3lerp}
 * for examples of interpolation functions.
 * @returns {GraphicsPath} The interpolated path.
 */
GraphicsPath.prototype.interpolate = function(other, t) {
  if(!other || other.segments.length !== this.segments.length) {
    return null;
  }
  const tmpThis = [];
  const tmpOther = [];
  const tmp = [];
  let j;
  const ret = new GraphicsPath();
  let oldpos;
  let i;
  for (i = 0; i < this.segments.length; i++) {
    let segThis = this.segments[i];
    let segOther = other.segments[i];
    let domove = false;
    if(segThis[0] !== GraphicsPath.CLOSE) {
      const start = GraphicsPath._startPoint(segThis);
      if(!oldpos || oldpos[0] !== start[0] || oldpos[1] !== start[1]) {
        domove = true;
      }
      oldpos = GraphicsPath._endPoint(segThis);
    }
    let tx;
    let ty;
    if(segThis[0] === GraphicsPath.QUAD) {
      tmpThis[0] = GraphicsPath.CUBIC;
      tmpThis[1] = segThis[1];
      tmpThis[2] = segThis[2];
      tx = 2 * segThis[3];
      ty = 2 * segThis[4];
      tmpThis[3] = (segThis[1] + tx) / 3;
      tmpThis[4] = (segThis[2] + ty) / 3;
      tmpThis[5] = (segThis[5] + tx) / 3;
      tmpThis[6] = (segThis[6] + ty) / 3;
      tmpThis[7] = segThis[5];
      tmpThis[8] = segThis[6];
      segThis = tmpThis;
    }
    if(segOther[0] === GraphicsPath.QUAD) {
      tmpOther[0] = GraphicsPath.CUBIC;
      tmpOther[1] = segOther[1];
      tmpOther[2] = segOther[2];
      tx = 2 * segOther[3];
      ty = 2 * segOther[4];
      tmpOther[3] = (segOther[1] + tx) / 3;
      tmpOther[4] = (segOther[2] + ty) / 3;
      tmpOther[5] = (segOther[5] + tx) / 3;
      tmpOther[6] = (segOther[6] + ty) / 3;
      tmpOther[7] = segOther[5];
      tmpOther[8] = segOther[6];
      segOther = tmpOther;
    }
    if(segThis[0] !== segOther[0]) {
      return null;
    }
    switch(segThis[0]) {
    case GraphicsPath.CLOSE:
      ret.closePath();
      oldpos = null;
      break;
    case GraphicsPath.LINE:
    case GraphicsPath.QUAD:
    case GraphicsPath.CUBIC:
      for(j = 1; j < segThis.length; j++) {
        tmp[j] = segThis[j] + (segOther[j] - segThis[j]) * t;
      }
      if(domove)ret.moveTo(tmp[1], tmp[2]);
      if(segThis[0] === GraphicsPath.LINE)
        ret.lineTo(tmp[3], tmp[4]);
      else if(segThis[0] === GraphicsPath.QUAD)
        ret.quadraticCurveTo(tmp[3], tmp[4], tmp[5], tmp[6]);
      else if(segThis[0] === GraphicsPath.CUBIC)
        ret.bezierCurveTo(tmp[3], tmp[4], tmp[5], tmp[6], tmp[7], tmp[8]);
      break;
    case GraphicsPath.ARC:{
      const deltaThis = segThis[13] - segThis[12];
      const largeArcThis = Math.abs(deltaThis) > Math.PI;
      const deltaOther = segOther[13] - segOther[12];
      const largeArcOther = Math.abs(deltaOther) > Math.PI;

      const largeArc = t < 0.5 ? largeArcThis : largeArcOther;
      const sweep = t < 0.5 ? deltaThis > 0 : deltaOther > 0;
      const sx = segThis[1] + (segOther[1] - segThis[1]) * t;
      const sy = segThis[2] + (segOther[2] - segThis[2]) * t;
      const rx = segThis[3] + (segOther[3] - segThis[3]) * t;
      const ry = segThis[4] + (segOther[4] - segThis[4]) * t;
      const rot = segThis[5] + (segOther[5] - segThis[5]) * t;
      const ex = segThis[8] + (segOther[8] - segThis[8]) * t;
      const ey = segThis[9] + (segOther[9] - segThis[9]) * t;
      if(domove)ret.moveTo(sx, sy);
      ret.arcSvgTo(rx, ry, rot * GraphicsPath._toDegrees,
        largeArc, sweep, ex, ey);
      break;
    }
    default:
      console.log("unknown kind");
      return null;
    }
  }
  return ret;
};
/** @ignore */
GraphicsPath._addSegment = function(a, c) {
  if(a.length > 0 && c instanceof LineCurve) {
    if(c.x1 === c.x2 && c.y1 === c.y2) {
      // Degenerate line segment, don't add
      return;
    }
  }
  a.push(c);
};

/**
 * Gets a [curve evaluator object]{@link Curve} for
 * the curves described by this path. The return value doesn't track changes to the path.
 * @returns {Object} A [curve evaluator object]{@link Curve} that implements
 * the following additional method:<ul>
 * <li><code>getCurves()</code> - Returns a list of [curve evaluator objects]{@link Curve}
 * described by this path. The list will contain one curve evaluator object for each disconnected
 * portion of the path. For example, if the path contains one polygon, the list will contain
 * one curve object. And if the path is empty, the list will be empty too. Each curve
 * takes U coordinates that range from 0 to 1, depending on how far the point is from the start or
 * the end of the path (similar to arc-length parameterization). Each curve
 * returns a 3-element array containing
 * the X, Y, and Z coordinates of the point lying on the curve at the given
 * "u" position (however, the z will always be 0 since paths can currently
 * only be 2-dimensional).
 * </ul>
 */
GraphicsPath.prototype.getCurves = function() {
  // TODO: Consider returning a list of curves and require
  // callers to use PiecewiseCurve to get the prior behavior
  const subpaths = [];
  const curves = [];
  let lastptx = 0;
  let lastpty = 0;
  let startptx = 0;
  let startpty = 0;
  let first = true;
  let curPath = null;
  let i;
  for (i = 0; i < this.segments.length; i++) {
    const s = this.segments[i];
    const startpt = GraphicsPath._startPoint(s);
    const endpt = GraphicsPath._endPoint(s);
    if(s[0] !== GraphicsPath.CLOSE) {
      if(first || lastptx !== startpt[0] || lastpty !== startpt[1]) {
        curPath = [];
        subpaths.push(curPath);
        startptx = startpt[0];
        startpty = startpt[1];
        first = false;
      }
      lastptx = endpt[0];
      lastpty = endpt[1];
      GraphicsPath._addSegment(curPath, GraphicsPath._segToCurve(s));
    } else {
      GraphicsPath._addSegment(curPath,
        new LineCurve(lastptx, lastpty, startptx, startpty));
      lastptx = startptx;
      lastpty = startpty;
    }
  }

  for (i = 0; i < subpaths.length; i++) {
    curves.push(new PiecewiseCurve(subpaths[i]).toArcLengthParam().fitRange(0, 1));
  }
  return new GraphicsPath._CurveList(curves);
};
/**
 * Creates an array of the disconnected portions of this path.
 * @returns {Array<GraphicsPath>} An array containing a GraphicsPath object
 * for each disconnected portion of this path. Returns an empty
 * array if this path has no subpaths.
 */
GraphicsPath.prototype.getSubpaths = function() {
  const subpaths = [];
  let lastptx = 0;
  let lastpty = 0;

  let first = true;
  let curPath = null;
  let i;
  for (i = 0; i < this.segments.length; i++) {
    const s = this.segments[i];
    const startpt = GraphicsPath._startPoint(s);
    const endpt = GraphicsPath._endPoint(s);
    if(s[0] !== GraphicsPath.CLOSE) {
      if(first || lastptx !== startpt[0] || lastpty !== startpt[1]) {
        curPath = new GraphicsPath().moveTo(startpt[0], startpt[1]);
        subpaths.push(curPath);
        first = false;
      }
      curPath.segments.push(s.slice(0, s.length));
      lastptx = endpt[0];
      lastpty = endpt[1];
      curPath.setEndPos(endpt[0], endpt[1]);
    } else {
      curPath.closePath();
    }
  }
  return subpaths;
};

/**
 * Gets an array of the end points of
 * line segments approximating the path.
 * @param {number} [flatness] When curves and arcs
 * are decomposed to line segments, the
 * segments will be close to the true path of the curve by this
 * value, given in units. If null, undefined, or omitted, default is 1.
 * @returns {Array<Array<number>>} Array of the end points of
 * line segments approximating the path.
 */
GraphicsPath.prototype.getLinePoints = function(flatness) {
  const lines = this.getLines(flatness);
  const points = [];
  let lastx = 0;
  let lasty = 0;
  let i;
  for (i = 0; i < lines.length; i++) {
    const line = lines[i];
    if(i === 0 || lastx !== line[0] || lasty !== line[1]) {
      points.push([line[0], line[1]]);
    }
    points.push([line[2], line[3]]);
    lastx = line[2];
    lasty = line[3];
  }
  return points;
};

/**
 * Gets an array of the end points of
 * line segments approximating the path. The positions will be in the form of objects with
 * two properties: x and y retrieve the X or Y coordinate of each position, respectively.
 * @param {number} [flatness] When curves and arcs
 * are decomposed to line segments, the
 * segments will be close to the true path of the curve by this
 * value, given in units. If null, undefined, or omitted, default is 1.
 * @returns {Array<Array<number>>} Array of the end points of
 * line segments approximating the path.
 * @example <caption>The following example initializes a three.js BufferGeometry with the points retrieved by this method. This example requires the three.js library.</caption>
 * var points=path.getLinePointsAsObjects()
 * var buffer=new THREE.BufferGeometry()
 * .setFromPoints(points);
 */
GraphicsPath.prototype.getLinePointsAsObjects = function(flatness) {
  const lines = this.getLines(flatness);
  const points = [];
  let lastx = 0;
  let lasty = 0;
  let i;
  for (i = 0; i < lines.length; i++) {
    const line = lines[i];
    if(i === 0 || lastx !== line[0] || lasty !== line[1]) {
      points.push({
        "x":line[0],
        "y":line[1]
      });
    }
    points.push({
      "x":line[2],
      "y":line[3]
    });
    lastx = line[2];
    lasty = line[3];
  }
  return points;
};

/**
 * Gets an array of points evenly spaced across the length
 * of the path.
 * @param {number} numPoints Number of points to return.
 * @returns {Array<Array<number>>} Array of points lying on
 * the path and evenly spaced across the length of the path,
 * starting and ending with the path's endPoints. Returns
 * an empty array if <i>numPoints</i> is less than 1. Returns
 * an array consisting of the start point if <i>numPoints</i>
 * is 1.
 */
GraphicsPath.prototype.getPoints = function(numPoints) {
  if(numPoints < 1 || this.segments.length === 0)return [];
  if(numPoints === 1) {
    return [this._start()];
  }
  if(numPoints === 2) {
    return [this._start(), this._end()];
  }
  const curves = this.getCurves();
  const points = [];
  let i;
  for (i = 0; i < numPoints; i++) {
    const t = i / (numPoints - 1);
    const ev = curves.evaluate(t);
    points.push([ev[0], ev[1]]);
  }
  return points;
};

/**
 * Gets an array of points evenly spaced across the length
 * of the path. The positions will be in the form of objects with
 * two properties: x and y retrieve the X or Y coordinate of each position, respectively.
 * @param {number} numPoints Number of points to return.
 * @returns {Array<Array<number>>} Array of points lying on
 * the path and evenly spaced across the length of the path,
 * starting and ending with the path's endPoints. Returns
 * an empty array if <i>numPoints</i> is less than 1. Returns
 * an array consisting of the start point if <i>numPoints</i>
 * is 1.
 * @example <caption>The following example initializes a three.js BufferGeometry with the points retrieved by this method. This example requires the three.js library.</caption>
 * var points=path.getPointsAsObjects(50)
 * var buffer=new THREE.BufferGeometry()
 * .setFromPoints(points);
 */
GraphicsPath.prototype.getPointsAsObjects = function(numPoints) {
  if(numPoints < 1 || this.segments.length === 0)return [];
  if(numPoints === 1) {
    const pt = this._start();
    return [{
      "x":pt[0],
      "y":pt[1]
    }];
  }
  if(numPoints === 2) {
    const pt1 = this._start();
    const pt2 = this._end();
    return [{
      "x":pt1[0],
      "y":pt1[1]
    },
    {
      "x":pt2[0],
      "y":pt2[1]
    }];
  }
  const curves = this.getCurves();
  const points = [];
  let i;
  for (i = 0; i < numPoints; i++) {
    const t = i / (numPoints - 1);
    const ev = curves.evaluate(t);
    points.push({
      "x":ev[0],
      "y":ev[1]
    });
  }
  return points;
};
/**
 * Makes this path closed. Adds a line segment to the
 * path's start position, if necessary.
 * @returns {GraphicsPath} This object.
 */
GraphicsPath.prototype.closePath = function() {
  if(this.startPos[0] !== this.endPos[0] ||
   this.startPos[1] !== this.endPos[1]) {
    this.lineTo(this.startPos[0], this.startPos[1]);
  }
  if(this.segments.length > 0) {
    this.segments.push([GraphicsPath.CLOSE]);
  }
  this.incomplete = false;
  return this;
};

/**
 * Moves the current start position and end position to the given position.
 * @param {number} x X coordinate of the position.
 * @param {number} y Y coordinate of the position.
 * @returns {GraphicsPath} This object.
 */
GraphicsPath.prototype.moveTo = function(x, y) {
  this.startPos[0] = x;
  this.startPos[1] = y;
  this.endPos[0] = x;
  this.endPos[1] = y;
  this.incomplete = false;
  return this;
};
/**
 * Adds a line segment to the path, starting
 * at the path's end position, then
 * sets the end position to the end of the segment.
 * @param {number} x X coordinate of the end of the line segment.
 * @param {number} y Y coordinate of the end of the line segment.
 * @returns {GraphicsPath} This object.
 */
GraphicsPath.prototype.lineTo = function(x, y) {
  this.segments.push([GraphicsPath.LINE,
    this.endPos[0], this.endPos[1], x, y]);
  this.endPos[0] = x;
  this.endPos[1] = y;
  this.incomplete = false;
  return this;
};

/** @ignore
 * @private */
GraphicsPath.prototype.setEndPos = function(x, y) {
  this.endPos[0] = x;
  this.endPos[1] = y;
  return this;
};

/**
 * Gets the current point stored in this path.
 * @returns {Array<number>} A two-element array giving the X and Y coordinates of the current point.
 */
GraphicsPath.prototype.getCurrentPoint = function() {
  return [this.endPos[0], this.endPos[1]];
};

/** @ignore */
GraphicsPath._areCollinear = function(x0, y0, x1, y1, x2, y2) {
  const t1 = x1 - x0;
  const t2 = y1 - y0;
  const t3 = [x2 - x0, y2 - y0];
  const denom = t1 * t1 + t2 * t2;
  if(denom === 0) {
    return true; // first two points are the same
  }
  const t4 = (t1 * t3[0] + t2 * t3[1]) / denom;
  const t5 = [x0 + t4 * t1, y0 + t4 * t2];
  const t6 = [x2 - t5[0], y2 - t5[1]];
  return t6[0] * t6[0] + t6[1] * t6[1] === 0;
};
/**
 * Adds path segments in the form of a circular arc to this path,
 * using the parameterization specified in the "arcTo" method of the
 * HTML Canvas 2D Context.
 * @param {number} x1 X coordinate of a point that, along with the
 * current end point, forms a tangent line. The point where the
 * circle touches this tangent line is the start point of the arc, and if the
 * point isn't the same as the current end point, this method adds
 * a line segment connecting the two points. (Note that the start point
 * of the arc is not necessarily the same as (x1, y1) or the current end point.)
 * @param {number} y1 Y coordinate of the point described under "x1".
 * @param {number} x2 X coordinate of a point that, along with the
 * point (x1, y1), forms a tangent line. The point where the
 * circle touches this tangent line is the end point of the arc. (Note that the
 * end point of the arc is not necessarily the same as (x1, y1) or (x2, y2).)
 * When this method returns, the current end point will be set to the end
 * point of the arc.
 * @param {number} y2 Y coordinate of the point described under "x2".
 * @param {number} radius Radius of the circle the arc forms a part of.
 * @returns {GraphicsPath} This object.
 */
GraphicsPath.prototype.arcTo = function(x1, y1, x2, y2, radius) {
  if(radius < 0) {
    throw new Error("IndexSizeError");
  }
  const x0 = this.endPos[0];
  const y0 = this.endPos[1];
  if(radius === 0 || x0 === x1 && y0 === y1 || x1 === x2 && y1 === y2 ||
   GraphicsPath._areCollinear(x0, y0, x1, y1, x2, y2)) {
    return this.lineTo(x1, y1);
  }
  const t1 = [x0 - x1, y0 - y1];
  const t2 = 1.0 / Math.sqrt(t1[0] * t1[0] + t1[1] * t1[1]);
  const t3 = [t1[0] * t2, t1[1] * t2]; // tangent vector from p1 to p0
  const t4 = [x2 - x1, y2 - y1];
  const t5 = 1.0 / Math.sqrt(t4[0] * t4[0] + t4[1] * t4[1]);
  const t6 = [t4[0] * t5, t4[1] * t5]; // tangent vector from p2 to p1
  const cross = t3[0] * t6[1] - t3[1] * t6[0];
  const t7 = (1.0 + (t3[0] * t6[0] + t3[1] * t6[1])) * radius / Math.abs(cross);
  const t8 = [t3[0] * t7, t3[1] * t7];
  const t10 = [t6[0] * t7, t6[1] * t7];
  const startTangent = [x1 + t8[0], y1 + t8[1]];
  const endTangent = [x1 + t10[0], y1 + t10[1]];
  this.lineTo(startTangent[0], startTangent[1]);
  const sweep = cross < 0;
  return this.arcSvgTo(radius, radius, 0, false, sweep, endTangent[0], endTangent[1]);
};
/**
 * Adds path segments in the form of a circular arc to this path,
 * using the parameterization specified in the "arc" method of the
 * HTML Canvas 2D Context.
 * @param {number} x X coordinate of the center of the circle that the arc forms a part of.
 * @param {number} y Y coordinate of the circle's center.
 * @param {number} radius Radius of the circle.
 * @param {number} startAngle Starting angle of the arc, in radians.
 * 0 means the positive X axis, &pi;/2 means the positive Y axis,
 * &pi; means the negative X axis, and &pi;*1.5 means the negative Y axis.
 * @param {number} endAngle Ending angle of the arc, in radians.
 * @param {boolean} ccw Whether the arc runs counterclockwise
 * (assuming the X axis points right and the Y axis points
 * down under the coordinate system).
 * @returns {GraphicsPath} This object.
 */
GraphicsPath.prototype.arc = function(x, y, radius, startAngle, endAngle, ccw) {
  return this._arcInternal(x, y, radius, startAngle, endAngle, ccw, true);
};
/** @ignore */
GraphicsPath.prototype._arcInternal = function(x, y, radius, startAngle, endAngle, ccw, drawLine) {
  if(radius < 0) {
    throw new Error("IndexSizeError");
  }
  const normStart = GraphicsPath._normAngleRadians(startAngle);
  const normEnd = GraphicsPath._normAngleRadians(endAngle);
  const twopi = Math.PI * 2;
  const cosStart = Math.cos(normStart);
  const sinStart = normStart <= 3.141592653589793 ? Math.sqrt(1.0 - cosStart * cosStart) : -Math.sqrt(1.0 - cosStart * cosStart);
  const cosEnd = Math.cos(normEnd);
  const sinEnd = normEnd <= 3.141592653589793 ? Math.sqrt(1.0 - cosEnd * cosEnd) : -Math.sqrt(1.0 - cosEnd * cosEnd);
  const startX = x + radius * cosStart;
  const startY = y + radius * sinStart;
  const endX = x + radius * cosEnd;
  const endY = y + radius * sinEnd;
  if(drawLine) {
    this.lineTo(startX, startY);
  }
  if(startX === endX && startY === endY && startAngle === endAngle || radius === 0) {
    return this.lineTo(endX, endY);
  }
  if(!ccw && endAngle - startAngle >= twopi ||
   ccw && startAngle - endAngle >= twopi) {
    return this
      ._arcInternal(x, y, radius, startAngle, startAngle + Math.PI, ccw, false)
      ._arcInternal(x, y, radius, startAngle + Math.PI, startAngle + Math.PI * 2, ccw, false)
      ._arcInternal(x, y, radius, normStart, normEnd, ccw, false);
  } else {
    let delta = endAngle - startAngle;
    if(delta >= twopi || delta < 0) {
      const d = delta % twopi;
      if(d === 0 && delta !== 0) {
        return this
          ._arcInternal(x, y, radius, startAngle, startAngle + Math.PI, ccw, false)
          ._arcInternal(x, y, radius, startAngle + Math.PI, startAngle + Math.PI * 2, ccw, false)
          ._arcInternal(x, y, radius, normStart, normEnd, ccw, false);
      }
      delta = d;
    }
    const largeArc = !!(Math.abs(delta) > Math.PI ^ !!ccw ^ startAngle > endAngle);
    const sweep = !!(delta > 0 ^ !!ccw ^ startAngle > endAngle);
    return this.lineTo(startX, startY)
      .arcSvgTo(radius, radius, 0, largeArc, sweep, endX, endY);
  }
};

/**
 * Adds a quadratic B&eacute;zier curve to this path starting
 * at this path's current position. The current position will be
 * the curve's first control point.
 * @param {number} x X coordinate of the curve's second control point.
 * @param {number} y Y coordinate of the curve's second control point.
 * @param {number} x2 X coordinate of the curve's end point (third control point).
 * @param {number} y2 Y coordinate of the curve's end point (third control point).
 * @returns {GraphicsPath} This object.
 */
GraphicsPath.prototype.quadraticCurveTo = function(x, y, x2, y2) {
  this.segments.push([GraphicsPath.QUAD,
    this.endPos[0], this.endPos[1], x, y, x2, y2]);
  this.endPos[0] = x2;
  this.endPos[1] = y2;
  this.incomplete = false;
  return this;
};
/**
 * Adds a cubic B&eacute;zier curve to this path starting
 * at this path's current position. The current position will be
 * the curve's first control point.
 * @param {number} x X coordinate of the curve's second control point.
 * @param {number} y X coordinate of the curve's second control point.
 * @param {number} x2 Y coordinate of the curve's third control point.
 * @param {number} y2 Y coordinate of the curve's third control point.
 * @param {number} x3 X coordinate of the curve's end point (fourth control point).
 * @param {number} y3 Y coordinate of the curve's end point (fourth control point).
 * @returns {GraphicsPath} This object.
 */
GraphicsPath.prototype.bezierCurveTo = function(x, y, x2, y2, x3, y3) {
  this.segments.push([GraphicsPath.CUBIC,
    this.endPos[0], this.endPos[1], x, y, x2, y2, x3, y3]);
  this.endPos[0] = x3;
  this.endPos[1] = y3;
  this.incomplete = false;
  return this;
};

/** @ignore */
GraphicsPath._vecangle = function(a, b, c, d) {
  let dot = a * c + b * d;
  const denom = Math.sqrt(a * a + b * b) * Math.sqrt(c * c + d * d);
  dot /= denom;
  const sgn = a * d - b * c;
  // avoid NaN when dot is just slightly out of range
  // for acos
  if(dot < -1)dot = -1;
  else if(dot > 1)dot = 1;
  let ret = Math.acos(dot);
  if(sgn < 0)ret = -ret;
  return ret;
};
/** @ignore */
GraphicsPath._arcSvgToCenterParam = function(a) {
  const x1 = a[1];
  const y1 = a[2];
  const x2 = a[8];
  const y2 = a[9];
  const rx = a[3];
  const ry = a[4];
  const rot = a[5]; // rotation in radians
  const xmid = (x1 - x2) * 0.5;
  const ymid = (y1 - y2) * 0.5;
  const xpmid = (x1 + x2) * 0.5;
  const ypmid = (y1 + y2) * 0.5;
  const crot = Math.cos(rot);
  const srot = rot >= 0 && rot < 6.283185307179586 ? rot <= 3.141592653589793 ? Math.sqrt(1.0 - crot * crot) : -Math.sqrt(1.0 - crot * crot) : Math.sin(rot);
  const x1p = crot * xmid + srot * ymid;
  const y1p = crot * ymid - srot * xmid;
  const rxsq = rx * rx;
  const rysq = ry * ry;
  const x1psq = x1p * x1p;
  const y1psq = y1p * y1p;
  const rxXy = rxsq * y1psq + rysq * x1psq;
  const cxsqrt = Math.sqrt(Math.max(0, (rxsq * rysq - rxXy) / rxXy));
  let cxp = rx * y1p * cxsqrt / ry;
  let cyp = ry * x1p * cxsqrt / rx;
  if(a[6] === a[7]) {
    cxp = -cxp;
  } else {
    cyp = -cyp;
  }
  const cx = crot * cxp - srot * cyp + xpmid;
  const cy = srot * cxp + crot * cyp + ypmid;
  const vecx = (x1p - cxp) / rx;
  const vecy = (y1p - cyp) / ry;
  const nvecx = (-x1p - cxp) / rx;
  const nvecy = (-y1p - cyp) / ry;
  let cosTheta1 = vecx / Math.sqrt(vecx * vecx + vecy * vecy);
  // avoid NaN when cosTheta1 is just slightly out of range
  // for acos
  if(cosTheta1 < -1)cosTheta1 = -1;
  else if(cosTheta1 > 1)cosTheta1 = 1;
  let theta1 = Math.acos(cosTheta1);
  if(vecy < 0)theta1 = -theta1;
  let delta = GraphicsPath._vecangle(vecx, vecy, nvecx, nvecy);
  delta = delta < 0 ? Math.PI * 2 + delta : delta;
  if(!a[7] && delta > 0) {
    delta -= Math.PI * 2;
  } else if(a[7] && delta < 0) {
    delta += Math.PI * 2;
  }
  delta += theta1;
  return [cx, cy, theta1, delta];
};
GraphicsPath._toRadians = Math.PI / 180;
GraphicsPath._toDegrees = 180.0 / Math.PI;
/** @ignore */
GraphicsPath._arcToBezierCurves = function(cx, cy, rx, ry, rot, angle1, angle2) {
  const crot = Math.cos(rot);
  const srot = rot >= 0 && rot < 6.283185307179586 ? rot <= 3.141592653589793 ? Math.sqrt(1.0 - crot * crot) : -Math.sqrt(1.0 - crot * crot) : Math.sin(rot);
  const arcsize = Math.abs(angle2 - angle1);
  let arcs = 16;
  if(arcsize < Math.PI / 8)arcs = 2;
  else if(arcsize < Math.PI / 4)arcs = 4;
  else if(arcsize < Math.PI / 2)arcs = 6;
  else if(arcsize < Math.PI)arcs = 10;
  const third = 1 / 3;
  let step = (angle2 - angle1) / arcs;
  const ret = [];
  const t5 = Math.tan(step * 0.5);
  const t7 = Math.sin(step) * third * (Math.sqrt(3.0 * t5 * t5 + 4.0) - 1.0);
  step = Math.PI * 2.0 / arcs;
  const cosStep = Math.cos(step);
  const sinStep = step >= 0 && step < 6.283185307179586 ? step <= 3.141592653589793 ? Math.sqrt(1.0 - cosStep * cosStep) : -Math.sqrt(1.0 - cosStep * cosStep) : Math.sin(step);
  let t2 = Math.cos(angle1);
  let t1 = angle1 >= 0 && angle1 < 6.283185307179586 ? angle1 <= 3.141592653589793 ? Math.sqrt(1.0 - t2 * t2) : -Math.sqrt(1.0 - t2 * t2) : Math.sin(angle1);
  let i;
  for (i = 0; i < arcs; i++) {
    const ts = cosStep * t1 + sinStep * t2;
    const tc = cosStep * t2 - sinStep * t1;
    const t3 = ts;
    const t4 = tc;
    const t8 = [cx + rx * crot * t2 - ry * srot * t1, cy + rx * srot * t2 + ry * crot * t1];
    const t9 = [cx + rx * crot * t4 - ry * srot * t3, cy + rx * srot * t4 + ry * crot * t3];
    const t10 = [-rx * crot * t1 - ry * srot * t2, -rx * srot * t1 + ry * crot * t2];
    const t11 = [-rx * crot * t3 - ry * srot * t4, -rx * srot * t3 + ry * crot * t4];
    const t12 = [t8[0] + t10[0] * t7, t8[1] + t10[1] * t7];
    const t13 = [t9[0] - t11[0] * t7, t9[1] - t11[1] * t7];
    ret.push([t8[0], t8[1], t12[0], t12[1], t13[0], t13[1], t9[0], t9[1]]);
    t2 = tc;
    t1 = ts;
  }
  return ret;
};

/**
 * Adds path segments in the form of an elliptical arc to this path,
 * using the parameterization used by the SVG specification.
 * @param {number} rx X axis radius of the ellipse that the arc will
 * be formed from.
 * @param {number} ry Y axis radius of the ellipse that the arc will
 * be formed from.
 * @param {number} rot Rotation of the ellipse in degrees (clockwise
 * assuming the X axis points right and the Y axis points
 * down under the coordinate system).
 * @param {boolean} largeArc In general, there are four possible solutions
 * for arcs given the start and end points, rotation, and x- and y-radii. If true,
 * chooses an arc solution with the larger arc length; if false, smaller.
 * @param {boolean} sweep If true, the arc solution chosen will run
 * clockwise (assuming the X axis points right and the Y axis points
 * down under the coordinate system); if false, counterclockwise.
 * @param {number} x2 X coordinate of the arc's end point.
 * @param {number} y2 Y coordinate of the arc's end point.
 * @returns {GraphicsPath} This object.
 */
GraphicsPath.prototype.arcSvgTo = function(rx, ry, rot, largeArc, sweep, x2, y2) {
  if(rx === 0 || ry === 0) {
    return this.lineTo(x2, y2);
  }
  const x1 = this.endPos[0];
  const y1 = this.endPos[1];
  if(x1 === x2 && y1 === y2) {
    return this;
  }
  rot = rot >= 0 && rot < 360 ? rot : rot % 360 +
       (rot < 0 ? 360 : 0);
  rot *= GraphicsPath._toRadians;
  rx = Math.abs(rx);
  ry = Math.abs(ry);
  const xmid = (x1 - x2) * 0.5;
  const ymid = (y1 - y2) * 0.5;
  const crot = Math.cos(rot);
  const srot = rot >= 0 && rot < 6.283185307179586 ? rot <= 3.141592653589793 ? Math.sqrt(1.0 - crot * crot) : -Math.sqrt(1.0 - crot * crot) : Math.sin(rot);
  const x1p = crot * xmid + srot * ymid;
  const y1p = crot * ymid - srot * xmid;
  let lam = x1p * x1p / (rx * rx) + y1p * y1p / (ry * ry);
  if(lam > 1) {
    lam = Math.sqrt(lam);
    rx *= lam;
    ry *= lam;
  }
  const arc = [GraphicsPath.ARC,
    x1, y1, rx, ry, rot, !!largeArc, !!sweep, x2, y2];
  const cp = GraphicsPath._arcSvgToCenterParam(arc);
  arc[6] = null; // unused
  arc[7] = null; // unused
  arc[10] = cp[0];
  arc[11] = cp[1];
  arc[12] = cp[2];
  arc[13] = cp[3];
  this.segments.push(arc);
  this.endPos[0] = x2;
  this.endPos[1] = y2;
  this.incomplete = false;
  return this;
};
/** @ignore */
GraphicsPath._nextAfterWs = function(str, index) {
  while(index[0] < str.length) {
    const c = str.charCodeAt(index[0]);
    index[0]++;
    if(c === 0x20 || c === 0x0d || c === 0x09 || c === 0x0a)
      continue;
    return c;
  }
  return -1;
};
/** @ignore */
GraphicsPath._nextAfterSepReq = function(str, index) {
  let comma = false;
  let havesep = false;
  while(index[0] < str.length) {
    const c = str.charCodeAt(index[0]);
    index[0]++;
    if(c === 0x20 || c === 0x0d || c === 0x09 || c === 0x0a) {
      havesep = true;
      continue;
    }
    if(!comma && c === 0x2c) {
      havesep = true;
      comma = true;
      continue;
    }
    return !havesep ? -1 : c;
  }
  return -1;
};
/** @ignore */
GraphicsPath._nextAfterSep = function(str, index) {
  let comma = false;
  while(index[0] < str.length) {
    const c = str.charCodeAt(index[0]);
    index[0]++;
    if(c === 0x20 || c === 0x0d || c === 0x09 || c === 0x0a)
      continue;
    if(!comma && c === 0x2c) {
      comma = true;
      continue;
    }
    return c;
  }
  return -1;
};
/** @ignore */
GraphicsPath._peekNextNumber = function(str, index) {
  const oldindex = index[0];
  const ret = GraphicsPath._nextNumber(str, index, true) !== null;
  index[0] = oldindex;
  return ret;
};
/** @ignore */
GraphicsPath._nextNumber = function(str, index, afterSep) {
  const oldindex = index[0];
  let c = afterSep ?
    GraphicsPath._nextAfterSep(str, index) :
    GraphicsPath._nextAfterWs(str, index);
  const startIndex = index[0] - 1;
  let dot = false;
  let digit = false;
  let exponent = false;
  let ret;
  if(c === 0x2e)dot = true;
  else if(c >= 0x30 && c <= 0x39)digit = true;
  else if(c !== 0x2d && c !== 0x2b) { // plus or minus
    index[0] = oldindex;
    return null;
  }
  while(index[0] < str.length) {
    c = str.charCodeAt(index[0]);
    index[0]++;
    if(c === 0x2e) { // dot
      if(dot) {
        index[0] = oldindex;
        return null;
      }
      dot = true;
    } else if(c >= 0x30 && c <= 0x39) {
      digit = true;
    } else if(c === 0x45 || c === 0x65) {
      if(!digit) {
        index[0] = oldindex;
        return null;
      }
      exponent = true;
      break;
    } else {
      if(!digit) {
        index[0] = oldindex;
        return null;
      }
      index[0]--;
      ret = parseFloat(str.substr(startIndex, index[0] - startIndex));
      if(Number.isNaN(ret)) {
        index[0] = ret;
        return null;
      }
      if(ret === Number.POSITIVE_INFINITY || ret === Number.NEGATIVE_INFINITY)
        return 0;
      return ret;
    }
  }
  if(exponent) {
    c = str.charCodeAt(index[0]);
    if(c < 0) {
      index[0] = oldindex;
      return null;
    }
    index[0]++;
    digit = false;
    if(c >= 0x30 && c <= 0x39)digit = true;
    else if(c !== 0x2d && c !== 0x2b) {
      index[0] = oldindex;
      return null;
    }
    while(index[0] < str.length) {
      c = str.charCodeAt(index[0]);
      index[0]++;
      if(c >= 0x30 && c <= 0x39) {
        digit = true;
      } else {
        if(!digit) {
          index[0] = oldindex;
          return null;
        }
        index[0]--;
        ret = parseFloat(str.substr(startIndex, index[0] - startIndex));
        // console.log([str.substr(startIndex,index[0]-startIndex),ret])
        if(Number.isNaN(ret)) {
          index[0] = oldindex;
          return null;
        }
        if(ret === Number.POSITIVE_INFINITY || ret === Number.NEGATIVE_INFINITY)
          return 0;
        return ret;
      }
    }
    if(!digit) {
      index[0] = oldindex;
      return null;
    }
  } else if(!digit) {
    index[0] = oldindex;
    return null;
  }
  ret = parseFloat(str.substr(startIndex, str.length - startIndex));
  if(Number.isNaN(ret)) {
    index[0] = oldindex;
    return null;
  }
  if(ret === Number.POSITIVE_INFINITY || ret === Number.NEGATIVE_INFINITY)
    return 0;
  return ret;
};

/**
 * Returns a modified version of this path that is transformed
 * according to the given affine transformation (a transformation
 * that keeps straight lines straight and parallel lines parallel).
 * @param {Array<number>} trans An array of six numbers
 * describing a 2-dimensional affine transformation. For each
 * point in the current path, its new X coordinate is `trans[0] * X +
 * trans[2] * Y + trans[4]`, and its new Y coordinate is `trans[1] * X +
 * trans[3] * Y + trans[5]`.
 * @returns {GraphicsPath} The transformed version of this path.
 */
GraphicsPath.prototype.transform = function(trans) {
  const ret = new GraphicsPath();
  const a = trans[0];
  const b = trans[1];
  const c = trans[2];
  const d = trans[3];
  const e = trans[4];
  const f = trans[5];
  let x;
  let y;
  let i;
  let j;
  const tmp = [0];
  let oldpos = null;
  for(i = 0; i < this.segments.length; i++) {
    const s = this.segments[i];
    let domove = false;
    if(s[0] !== GraphicsPath.CLOSE) {
      const start = GraphicsPath._startPoint(s);
      if(!oldpos || oldpos[0] !== start[0] || oldpos[1] !== start[1]) {
        domove = true;
      }
      oldpos = GraphicsPath._endPoint(s);
    }
    switch(s[0]) {
    case GraphicsPath.CLOSE:
      ret.closePath();
      oldpos = null;
      break;
    case GraphicsPath.LINE:
    case GraphicsPath.QUAD:
    case GraphicsPath.CUBIC:
      for(j = 1; j < s.length; j += 2) {
        tmp[j] = a * s[j] + c * s[j + 1] + e;
        tmp[j + 1] = b * s[j] + d * s[j + 1] + f;
      }
      if(domove)
        ret.moveTo(tmp[1], tmp[2]);
      if(s[0] === GraphicsPath.LINE)
        ret.lineTo(tmp[3], tmp[4]);
      else if(s[0] === GraphicsPath.QUAD)
        ret.quadraticCurveTo(tmp[3], tmp[4], tmp[5], tmp[6]);
      else if(s[0] === GraphicsPath.CUBIC)
        ret.bezierCurveTo(tmp[3], tmp[4], tmp[5], tmp[6], tmp[7], tmp[8]);
      break;
    case GraphicsPath.ARC: {
      let largeArc;
      let delta;
      if(a === 1 && b === 0 && c === 0 && d === 1) {
        // just a translation
        delta = s[13] - s[12];
        largeArc = Math.abs(delta) > Math.PI;
        if(domove)ret.moveTo(s[1] + e, s[2] + f);
        ret.arcSvgTo(s[3], s[4], s[5] * GraphicsPath._toDegrees,
          largeArc, delta > 0, s[8] + e, s[9] + f);
        break;
      }
      if(b === 0 && c === 0 && s[5] === 0) {
        // any scale and ellipse rotation 0
        delta = s[13] - s[12];
        largeArc = Math.abs(delta) > Math.PI;
        if(domove)ret.moveTo(a * s[1] + e, d * s[2] + f);
        ret.arcSvgTo(a * s[3], d * s[4], 0,
          largeArc, delta > 0, a * s[8] + e, d * s[9] + f);
        break;
      }
      const curves = GraphicsPath._arcToBezierCurves(s[10], s[11], s[3], s[4], s[5], s[12], s[13]);
      curves[0][0] = s[1];
      curves[0][1] = s[2];
      curves[curves.length - 1][6] = s[8];
      curves[curves.length - 1][7] = s[9];
      for(j = 0; j < curves.length; j++) {
        const cs = curves[j];
        let k;
        for (k = 0; k < 8; k += 2) {
          x = a * cs[k] + c * cs[k + 1] + e;
          y = b * cs[k] + d * cs[k + 1] + f;
          cs[k] = x;
          cs[k + 1] = y;
        }
        if(domove && j === 0)ret.moveTo(cs[0], cs[1]);
        ret.bezierCurveTo(cs[2], cs[3], cs[4], cs[5], cs[6], cs[7]);
      }
      break;
    }
    default:
      break;
    }
  }
  return ret;
};

/**
 * Adds path segments to this path that form an axis-aligned rectangle.
 * @param {number} x X coordinate of the rectangle's upper-left corner (assuming the
 * coordinate system's X axis points right and the Y axis down).
 * @param {number} y Y coordinate of the rectangle's upper-left corner (assuming the
 * coordinate system's X axis points right and the Y axis down).
 * @param {number} w Width of the rectangle.
 * @param {number} h Height of the rectangle.
 * @returns {GraphicsPath} This object. If "w" or "h" is 0, no path segments will be appended.
 */
GraphicsPath.prototype.rect = function(x, y, w, h) {
  if(w < 0 || h < 0)return this;
  return this.moveTo(x, y)
    .lineTo(x + w, y)
    .lineTo(x + w, y + h)
    .lineTo(x, y + h)
    .closePath();
};

/**
 * Adds a line segment to this path.
 * @param {number} x0 X coordinate of the line segment's starting point.
 * The <code>moveTo</code> method will be called on the starting point.
 * @param {number} y0 Y coordinate of the line segment's starting point.
 * @param {number} x1 X coordinate of the line segment's ending point.
 * The <code>lineTo</code> method will be called on the ending point.
 * @param {number} y1 X coordinate of the line segment's ending point.
 * @returns {GraphicsPath} This object.
 */
GraphicsPath.prototype.line = function(x0, y0, x1, y1) {
  return this.moveTo(x0, y0).lineTo(x1, y1);
};
/**
 * Adds path segments to this path that form a polygon or a connected line segment strand.
 * @param {Array<number>} pointCoords An array of numbers containing the X and Y coordinates
 * of each point in the sequence of line segments. Each pair of numbers gives the X and Y
 * coordinates, in that order, of one of the points in the sequence.
 * The number of elements in the array must be even. If two or more pairs of numbers are given, line
 * segments will connect each point given (except the last) to the next point given.
 * @param {number} closed If "true", the sequence of points describes a closed polygon and a command
 * to close the path will be added to the path (even if only one pair of numbers is given in "pointCoords").
 * @returns {GraphicsPath} This object. If "pointCoords" is empty, no path segments will be appended.
 * Throws an error if "pointCoords" has an odd length.
 */
GraphicsPath.prototype.polyline = function(pointCoords, closed) {
  const closedValue = typeof closed !== "undefined" && closed !== null ? closed : false;
  if(pointCoords.length === 0)return this;
  if(pointCoords.length % 2 !== 0)throw new Error();
  this.moveTo(pointCoords[0], pointCoords[1]);
  let i;
  for (i = 2; i < pointCoords.length; i += 2) {
    this.lineTo(pointCoords[i], pointCoords[i + 1]);
  }
  if(closedValue)this.closePath();
  return this;
};

/**
 * Adds path segments to this path that form an axis-aligned rounded rectangle.
 * @param {number} x X coordinate of the rectangle's upper-left corner (assuming the
 * coordinate system's X axis points right and the Y axis down).
 * @param {number} y Y coordinate of the rectangle's upper-left corner (assuming the
 * coordinate system's X axis points right and the Y axis down).
 * @param {number} w Width of the rectangle.
 * @param {number} h Height of the rectangle.
 * @param {number} arccx Horizontal extent (from end to end) of the ellipse formed by each arc that makes
 * up the rectangle's corners.
 * Will be adjusted to be not less than 0 and not greater than "w".
 * @param {number} arccy Vertical extent (from end to end) of the ellipse formed by each arc that makes
 * up the rectangle's corners.
 * Will be adjusted to be not less than 0 and not greater than "h".
 * @returns {GraphicsPath} This object. If "w" or "h" is less than 0, no path segments will be appended.
 */
GraphicsPath.prototype.roundRect = function(x, y, w, h, arccx, arccy) {
  if(w < 0 || h < 0)return this;
  let px;
  let py;
  arccx = Math.min(w, Math.max(0, arccx));
  arccy = Math.min(h, Math.max(0, arccy));
  const harccx = arccx * 0.5;
  const harccy = arccy * 0.5;
  px = x + harccx;
  py = y;
  this.moveTo(px, py);
  px += w - arccx;
  this.lineTo(px, py);
  px += harccx;
  py += harccy;
  this.arcSvgTo(harccx, harccy, 0, false, true, px, py);
  py += h - arccy;
  this.lineTo(px, py);
  px -= harccx;
  py += harccy;
  this.arcSvgTo(harccx, harccy, 0, false, true, px, py);
  px -= w - arccx;
  this.lineTo(px, py);
  px -= harccx;
  py -= harccy;
  this.arcSvgTo(harccx, harccy, 0, false, true, px, py);
  py -= h - arccy;
  this.lineTo(px, py);
  px += harccx;
  py -= harccy;
  this.arcSvgTo(harccx, harccy, 0, false, true, px, py);
  this.closePath();
  return this;
};

/**
 * Adds path segments to this path that form an axis-aligned rectangle with beveled corners.
 * @param {number} x X coordinate of the rectangle's upper-left corner (assuming the
 * coordinate system's X axis points right and the Y axis down).
 * @param {number} y Y coordinate of the rectangle's upper-left corner (assuming the
 * coordinate system's X axis points right and the Y axis down).
 * @param {number} w Width of the rectangle.
 * @param {number} h Height of the rectangle.
 * @param {number} arccx Horizontal extent (from end to end) of the rectangle's corners.
 * Will be adjusted to be not less than 0 and not greater than "w".
 * @param {number} arccy Vertical extent (from end to end) of the rectangle's corners.
 * Will be adjusted to be not less than 0 and not greater than "h".
 * @returns {GraphicsPath} This object. If "w" or "h" is less than 0, no path segments will be appended.
 */
GraphicsPath.prototype.bevelRect = function(x, y, w, h, arccx, arccy) {
  if(w < 0 || h < 0)return this;
  let px;
  let py;
  arccx = Math.min(w, Math.max(0, arccx));
  arccy = Math.min(h, Math.max(0, arccy));
  const harccx = arccx * 0.5;
  const harccy = arccy * 0.5;
  px = x + harccx;
  py = y;
  this.moveTo(px, py);
  px += w - arccx;
  this.lineTo(px, py);
  px += harccx;
  py += harccy;
  this.lineTo(px, py);
  py += h - arccy;
  this.lineTo(px, py);
  px -= harccx;
  py += harccy;
  this.lineTo(px, py);
  px -= w - arccx;
  this.lineTo(px, py);
  px -= harccx;
  py -= harccy;
  this.lineTo(px, py);
  py -= h - arccy;
  this.lineTo(px, py);
  px += harccx;
  py -= harccy;
  this.lineTo(px, py);
  this.closePath();
  return this;
};
/**
 * Adds path segments to this path that form an axis-aligned ellipse given its center
 * and dimensions.
 * @param {number} cx X coordinate of the ellipse's center.
 * @param {number} cy Y coordinate of the ellipse's center.
 * @param {number} w Width of the ellipse's bounding box.
 * @param {number} h Height of the ellipse's bounding box.
 * @returns {GraphicsPath} This object. If "w" or "h" is 0, no path segments will be appended.
 */
GraphicsPath.prototype.ellipse = function(cx, cy, w, h) {
  if(w < 0 || h < 0)return this;
  const hw = w * 0.5;
  const hh = h * 0.5;
  const px = cx + hw;
  return this.moveTo(px, cy)
    .arcSvgTo(hw, hh, 0, false, true, px - w, cy)
    .arcSvgTo(hw, hh, 0, false, true, px, cy)
    .closePath();
};
/**
 * Adds path segments to this path that form an axis-aligned ellipse, given the ellipse's corner point
 * and dimensions.
 * @param {number} x X coordinate of the ellipse's bounding box's upper-left corner (assuming the
 * coordinate system's X axis points right and the Y axis down).
 * @param {number} y Y coordinate of the ellipse's bounding box's upper-left corner (assuming the
 * coordinate system's X axis points right and the Y axis down).
 * @param {number} w Width of the ellipse's bounding box.
 * @param {number} h Height of the ellipse's bounding box.
 * @returns {GraphicsPath} This object. If "w" or "h" is 0, no path segments will be appended.
 */
GraphicsPath.prototype.ellipseForBox = function(x, y, w, h) {
  return this.ellipse(x + w * 0.5, y + h * 0.5, w, h);
};
/**
 * Adds path segments to this path that form an arc running along an axis-aligned
 * ellipse, or a shape based on that arc and ellipse, given the ellipse's center
 * and dimensions, start angle, and sweep angle.
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
 * @param {number} type Type of arc to append to the path. If 0,
 * will append an unclosed arc. If 1, will append an elliptical segment to the path
 * (the arc and a line segment connecting its ends). If 2,
 * will append a "pie slice" to the path (the arc and two line segments connecting
 * each end of the arc to the ellipse's center).
 * @returns {GraphicsPath} This object. If "w" or "h" is 0, no path segments will be appended.
 */
GraphicsPath.prototype.arcShape = function(x, y, w, h, start, sweep, type) {
  if(w < 0 || h < 0)return this;
  const pidiv180 = Math.PI / 180;
  const e = start + sweep;
  const hw = w * 0.5;
  const hh = h * 0.5;
  const eRad = (e >= 0 && e < 360 ? e : e % 360 + (e < 0 ? 360 : 0)) * pidiv180;
  const startRad = (start >= 0 && start < 360 ? start : start % 360 + (start < 0 ? 360 : 0)) * pidiv180;
  const cosEnd = Math.cos(eRad);
  const sinEnd = eRad <= 3.141592653589793 ? Math.sqrt(1.0 - cosEnd * cosEnd) : -Math.sqrt(1.0 - cosEnd * cosEnd);
  const cosStart = Math.cos(startRad);
  const sinStart = startRad <= 3.141592653589793 ? Math.sqrt(1.0 - cosStart * cosStart) : -Math.sqrt(1.0 - cosStart * cosStart);
  this.moveTo(x + cosStart * hw, y + sinStart * hh);
  let angleInit;
  let angleStep;
  let cw;
  if(sweep > 0) {
    angleInit = start + 180;
    angleStep = 180;
    cw = true;
  } else {
    angleInit = start - 180;
    angleStep = -180;
    cw = false;
  }
  let a;
  for (a = angleInit; cw ? a < e : a > e; a += angleStep) {
    const angleRad = (a >= 0 && a < 360 ? a : a % 360 + (a < 0 ? 360 : 0)) * pidiv180;
    const cosAng = Math.cos(angleRad);
    const sinAng = angleRad <= 3.141592653589793 ? Math.sqrt(1.0 - cosAng * cosAng) : -Math.sqrt(1.0 - cosAng * cosAng);
    this.arcSvgTo(hw, hh, 0, false, cw, x + cosAng * hw, y + sinAng * hh);
  }
  this.arcSvgTo(hw, hh, 0, false, cw, x + cosEnd * hw, y + sinEnd * hh);
  if(type === 2) {
    this.lineTo(x, y).closePath();
  } else if(type === 1) {
    this.closePath();
  }
  return this;
};
/**
 * Adds path segments to this path that form an arc running along an axis-aligned
 * ellipse, or a shape based on that arc and ellipse, given the ellipse's corner point
 * and dimensions, start angle, and sweep angle.
 * @param {number} x X coordinate of the ellipse's bounding box's upper-left corner (assuming the
 * coordinate system's X axis points right and the Y axis down).
 * @param {number} y Y coordinate of the ellipse's bounding box's upper-left corner (assuming the
 * coordinate system's X axis points right and the Y axis down).
 * @param {number} w Width of the ellipse's bounding box.
 * @param {number} h Height of the ellipse's bounding box.
 * @param {number} start Starting angle of the arc, in degrees.
 * 0 means the positive X axis, 90 means the positive Y axis,
 * 180 means the negative X axis, and 270 means the negative Y axis.
 * @param {number} sweep Length of the arc in degrees. Can be greater than 360 or
 * less than -360, in which case the arc will wrap around the ellipse multiple times. Assuming
 * the coordinate system's X axis points right and the Y axis down, positive angles run
 * clockwise and negative angles counterclockwise.
 * @param {number} type Type of arc to append to the path. If 0,
 * will append an unclosed arc. If 1, will append an elliptical segment to the path
 * (the arc and a line segment connecting its ends). If 2,
 * will append a "pie slice" to the path (the arc and two line segments connecting
 * each end of the arc to the ellipse's center).
 * @returns {GraphicsPath} This object. If "w" or "h" is 0, no path segments will be appended.
 */
GraphicsPath.prototype.arcShapeForBox = function(x, y, w, h, start, sweep, type) {
  return this.arcShape(x + w * 0.5, y + h * 0.5, w, h, start, sweep, type);
};
/**
 * Adds path segments to this path in the form of an arrow shape.
 * @param {number} x0 X coordinate of the arrow's tail, at its very end.
 * @param {number} y0 Y coordinate of the arrow's tail, at its very end.
 * @param {number} x1 X coordinate of the arrow's tip.
 * @param {number} y1 Y coordinate of the arrow's tip.
 * @param {number} headWidth Width of the arrowhead's base from side to side.
 * @param {number} headLength Length of the arrowhead from its tip to its base.
 * @param {number} tailWidth Width of the arrow's tail from side to side
 * @returns {GraphicsPath} This object. Nothing will be added to the path if the distance
 * from (x0, y0) and (x1, y1) is 0 or extremely close to 0.
 */
GraphicsPath.prototype.arrow = function(x0, y0, x1, y1, headWidth, headLength, tailWidth) {
  const dx = x1 - x0;
  const dy = y1 - y0;
  const arrowLen = Math.sqrt(dx * dx + dy * dy);
  if(arrowLen === 0)return this;
  const halfTailWidth = tailWidth * 0.5;
  const halfHeadWidth = headWidth * 0.5;
  const invArrowLen = 1.0 / arrowLen;
  const cosRot = dx * invArrowLen;
  const sinRot = dy * invArrowLen;
  headLength = Math.min(headLength, arrowLen);
  const shaftLength = arrowLen - headLength;
  let x;
  let y;
  this.moveTo(x0, y0);
  x = halfTailWidth * sinRot + x0;
  y = -halfTailWidth * cosRot + y0;
  this.lineTo(x, y);
  x = shaftLength * cosRot + halfTailWidth * sinRot + x0;
  y = shaftLength * sinRot - halfTailWidth * cosRot + y0;
  this.lineTo(x, y);
  x = shaftLength * cosRot + halfHeadWidth * sinRot + x0;
  y = shaftLength * sinRot - halfHeadWidth * cosRot + y0;
  this.lineTo(x, y).lineTo(x1, y1);
  x = shaftLength * cosRot - halfHeadWidth * sinRot + x0;
  y = shaftLength * sinRot + halfHeadWidth * cosRot + y0;
  this.lineTo(x, y);
  x = shaftLength * cosRot - halfTailWidth * sinRot + x0;
  y = shaftLength * sinRot + halfTailWidth * cosRot + y0;
  this.lineTo(x, y);
  x = -halfTailWidth * sinRot + x0;
  y = halfTailWidth * cosRot + y0;
  this.lineTo(x, y);
  this.closePath();
  return this;
};
/**
 * Adds path segments to this path that form a regular polygon.
 * @param {number} cx X coordinate of the center of the polygon.
 * @param {number} cy Y coordinate of the center of the polygon.
 * @param {number} sides Number of sides the polygon has. Nothing will be added to the path if this
 * value is 2 or less.
 * @param {number} radius Radius from the center to each vertex of the polygon.
 * @param {number} [phaseInDegrees] Starting angle of the first vertex of the polygon, in degrees.
 * 0 means the positive X axis, 90 means the positive Y axis,
 * 180 means the negative X axis, and 270 means the negative Y axis.
 * If null, undefined, or omitted, the default is 0.
 * @returns {GraphicsPath} This object.
 */
GraphicsPath.prototype.regularPolygon = function(cx, cy, sides, radius, phaseInDegrees) {
  if(sides <= 2)return this;
  let phase = typeof phaseInDegrees === "undefined" || phaseInDegrees === null ? phaseInDegrees : 0;
  phase = phase >= 0 && phase < 360 ? phase : phase % 360 +
       (phase < 0 ? 360 : 0);
  phase *= MathUtil.ToRadians;
  const angleStep = MathUtil.PiTimes2 / sides;
  const cosStep = Math.cos(angleStep);
  const sinStep = angleStep <= 3.141592653589793 ? Math.sqrt(1.0 - cosStep * cosStep) : -Math.sqrt(1.0 - cosStep * cosStep);
  let c = Math.cos(phase);
  let s = phase <= 3.141592653589793 ? Math.sqrt(1.0 - c * c) : -Math.sqrt(1.0 - c * c);
  let i;
  for (i = 0; i < sides; i++) {
    const x = cx + c * radius;
    const y = cy + s * radius;
    if(i === 0) {
      this.moveTo(x, y);
    } else {
      this.lineTo(x, y);
    }
    const ts = cosStep * s + sinStep * c;
    const tc = cosStep * c - sinStep * s;
    s = ts;
    c = tc;
  }
  return this.closePath();
};
/**
 * Adds path segments to this path that form a regular N-pointed star.
 * @param {number} cx X coordinate of the center of the star.
 * @param {number} cy Y coordinate of the center of the star.
 * @param {number} points Number of points the star has. Nothing will be added to the path if this
 * value is 0 or less.
 * @param {number} radiusOut Radius from the center to each outer vertex of the star.
 * @param {number} radiusIn Radius from the center to each inner vertex of the star.
 * @param {number} phaseInDegrees Starting angle of the first vertex of the polygon, in degrees.
 * 0 means the positive X axis, 90 means the positive Y axis,
 * 180 means the negative X axis, and 270 means the negative Y axis.
 * @returns {GraphicsPath} This object.
 */
GraphicsPath.prototype.regularStar = function(cx, cy, points, radiusOut, radiusIn, phaseInDegrees) {
  if(points <= 0)return this;
  let phase = phaseInDegrees || 0;
  phase = phase >= 0 && phase < 360 ? phase : phase % 360 +
       (phase < 0 ? 360 : 0);
  phase *= MathUtil.ToRadians;
  const sides = points * 2;
  const angleStep = MathUtil.PiTimes2 / sides;
  const cosStep = Math.cos(angleStep);
  const sinStep = angleStep <= 3.141592653589793 ? Math.sqrt(1.0 - cosStep * cosStep) : -Math.sqrt(1.0 - cosStep * cosStep);
  let c = Math.cos(phase);
  let s = phase <= 3.141592653589793 ? Math.sqrt(1.0 - c * c) : -Math.sqrt(1.0 - c * c);
  let i;
  for (i = 0; i < sides; i++) {
    const radius = (i & 1) === 0 ? radiusOut : radiusIn;
    const x = cx + c * radius;
    const y = cy + s * radius;
    if(i === 0) {
      this.moveTo(x, y);
    } else {
      this.lineTo(x, y);
    }
    const ts = cosStep * s + sinStep * c;
    const tc = cosStep * c - sinStep * s;
    s = ts;
    c = tc;
  }
  return this.closePath();
};
/**
 * Creates a graphics path from a string whose format follows
 * the SVG (Scalable Vector Graphics) specification.
 * @param {string} str A string, in the SVG path format, representing
 * a two-dimensional path. An SVG path consists of a number of
 * path segments, starting with a single letter, as follows:
 * <ul>
 * <li>M/m (x y) - Moves the current position to (x, y). Further
 * XY pairs specify line segments.
 * <li>L/l (x y) - Specifies line segments to the given XY points.
 * <li>H/h (x) - Specifies horizontal line segments to the given X points.
 * <li>V/v (y) - Specifies vertical line segments to the given Y points.
 * <li>Q/q (cx cx x y) - Specifies quadratic B&eacute;zier curves
 * (see quadraticCurveTo).
 * <li>T/t (x y) - Specifies quadratic curves tangent to the previous
 * quadratic curve.
 * <li>C/c (c1x c1y c2x c2y x y) - Specifies cubic B&eacute;zier curves
 * (see bezierCurveTo).
 * <li>S/s (c2x c2y x y) - Specifies cubic curves tangent to the previous
 * cubic curve.
 * <li>A/a (rx ry rot largeArc sweep x y) - Specifies arcs (see arcSvgTo).
 * "largeArc" and "sweep" are flags, "0" for false and "1" for true.
 * "rot" is in degrees.
 * <li>Z/z - Closes the current path; similar to adding a line segment
 * to the first XY point given in the last M/m command.
 * </ul>
 * Lower-case letters mean any X and Y coordinates are relative
 * to the current position of the path. Each group of parameters
 * can be repeated in the same path segment. Each parameter after
 * the starting letter is separated by whitespace and/or a single comma,
 * and the starting letter can be separated by whitespace.
 * This separation can be left out as long as doing so doesn't
 * introduce ambiguity. All commands set the current point
 * to the end of the path segment (including Z/z, which adds a line
 * segment if needed). Examples of this parameter are "M50,50L100,100,100,150,150,200", "M50,20C230,245,233,44,22,44", and "M50,50H80V60H50V70H50"
 * @returns {GraphicsPath} The resulting path. If an error
 * occurs while parsing the path, the path's "isIncomplete()" method
 * will return <code>true</code>.
 * @example <caption>The following example creates a graphics path
 * from an SVG string describing a polyline.</caption>
 * var path=GraphicsPath.fromString("M10,20L40,30,24,32,55,22")
 * @example <caption>The following example creates a graphics path
 * from an SVG string describing a curved path.</caption>
 * var path=GraphicsPath.fromString("M50,20C230,245,233,44,22,44")
 */
GraphicsPath.fromString = function(str) {
  const index = [0];
  let started = false;
  const ret = new GraphicsPath();
  let failed = false;
  let endx;
  let endy;
  let sep;
  let curx;
  let cury;
  let x;
  let y;
  let curpt;
  let x2;
  let y2;
  let xcp;
  let ycp;
  while(!failed && index[0] < str.length) {
    const c = GraphicsPath._nextAfterWs(str, index);
    if(!started && c !== 0x4d && c !== 0x6d) {
      // not a move-to command when path
      // started
      failed = true; break;
    }
    // NOTE: Doesn't implement SVG2 meaning of Z
    // command yet because it's not yet fully specified
    switch(c) {
    case 0x5a:case 0x7a:{ // 'Z', 'z'
      ret.closePath();
      break;
    }
    case 0x4d:case 0x6d:{ // 'M', 'm'
      sep = false;
      for (;;) {
        curx = c === 0x6d ? ret.endPos[0] : 0;
        cury = c === 0x6d ? ret.endPos[1] : 0;
        x = GraphicsPath._nextNumber(str, index, sep);
        if(typeof x === "undefined" || x === null) {
          if(!sep)failed = true; break;
        }
        y = GraphicsPath._nextNumber(str, index, true);
        if(typeof y === "undefined" || y === null) {
          failed = true; break;
        }
        // console.log([x,y])
        if(sep)ret.lineTo(curx + x, cury + y);
        else ret.moveTo(curx + x, cury + y);
        sep = true;
      }
      started = true;
      break;
    }
    case 0x4c:case 0x6c:{ // 'L', 'l'
      sep = false;
      for (;;) {
        curx = c === 0x6c ? ret.endPos[0] : 0;
        cury = c === 0x6c ? ret.endPos[1] : 0;
        x = GraphicsPath._nextNumber(str, index, sep);
        if(typeof x === "undefined" || x === null) {
          if(!sep)failed = true; break;
        }
        y = GraphicsPath._nextNumber(str, index, true);
        if(typeof y === "undefined" || y === null) {
          failed = true; break;
        }
        ret.lineTo(curx + x, cury + y);
        sep = true;
      }
      break;
    }
    case 0x48:case 0x68:{ // 'H', 'h'
      sep = false;
      for (;;) {
        curpt = c === 0x68 ? ret.endPos[0] : 0;
        x = GraphicsPath._nextNumber(str, index, sep);
        if(typeof x === "undefined" || x === null) {
          if(!sep)failed = true; break;
        }
        ret.lineTo(curpt + x, ret.endPos[1]);
        sep = true;
      }
      break;
    }
    case 0x56:case 0x76:{ // 'V', 'v'
      sep = false;
      for (;;) {
        curpt = c === 0x76 ? ret.endPos[1] : 0;
        x = GraphicsPath._nextNumber(str, index, sep);
        if(typeof x === "undefined" || x === null) {
          if(!sep)failed = true; break;
        }
        ret.lineTo(ret.endPos[0], curpt + x);
        sep = true;
      }
      break;
    }
    case 0x43:case 0x63:{ // 'C', 'c'
      sep = false;
      for (;;) {
        curx = c === 0x63 ? ret.endPos[0] : 0;
        cury = c === 0x63 ? ret.endPos[1] : 0;
        x = GraphicsPath._nextNumber(str, index, sep);
        if(typeof x === "undefined" || x === null) {
          if(!sep)failed = true; break;
        }

        const arr = [];
        let k;
        for (k = 0; k < 5; k++) {
          arr[k] = GraphicsPath._nextNumber(str, index, true);
          if(typeof arr[k] === "undefined" || arr[k] === null) {
            failed = true; break;
          }
        }
        if(failed)break;
        y = arr[0]; x2 = arr[1]; y2 = arr[2]; const x3 = arr[3]; const y3 = arr[4];
        ret.bezierCurveTo(curx + x, cury + y, curx + x2, cury + y2,
          curx + x3, cury + y3);
        sep = true;
      }
      break;
    }
    case 0x51:case 0x71:{ // 'Q', 'q'
      sep = false;
      for (;;) {
        curx = c === 0x71 ? ret.endPos[0] : 0;
        cury = c === 0x71 ? ret.endPos[1] : 0;
        x = GraphicsPath._nextNumber(str, index, sep);
        if(typeof x === "undefined" || x === null) {
          if(!sep)failed = true; break;
        }
        y = GraphicsPath._nextNumber(str, index, true);
        if(typeof y === "undefined" || y === null) {
          failed = true; break;
        }
        x2 = GraphicsPath._nextNumber(str, index, true);
        if(typeof x2 === "undefined" || x2 === null) {
          failed = true; break;
        }
        y2 = GraphicsPath._nextNumber(str, index, true);
        if(typeof y2 === "undefined" || y2 === null) {
          failed = true; break;
        }
        ret.quadraticCurveTo(curx + x, cury + y, curx + x2, cury + y2);
        sep = true;
      }
      break;
    }
    case 0x41:case 0x61:{ // 'A', 'a'
      sep = false;
      for (;;) {
        curx = c === 0x61 ? ret.endPos[0] : 0;
        cury = c === 0x61 ? ret.endPos[1] : 0;
        x = GraphicsPath._nextNumber(str, index, sep);
        if(typeof x === "undefined" || x === null) {
          if(!sep)failed = true; break;
        }
        y = GraphicsPath._nextNumber(str, index, true);
        if(typeof y === "undefined" || y === null) {
          failed = true; break;
        }
        const rot = GraphicsPath._nextNumber(str, index, true);
        if(typeof rot === "undefined" || rot === null) {
          failed = true; break;
        }
        const largeArc = GraphicsPath._nextAfterSepReq(str, index);
        const sweep = GraphicsPath._nextAfterSep(str, index);
        if(largeArc === -1 || sweep === -1) {
          failed = true; break;
        }
        x2 = GraphicsPath._nextNumber(str, index, true);
        if(typeof x2 === "undefined" || x2 === null) {
          failed = true; break;
        }
        y2 = GraphicsPath._nextNumber(str, index, true);
        if(typeof y2 === "undefined" || y2 === null) {
          failed = true; break;
        }
        ret.arcSvgTo(x + curx, y + cury, rot, largeArc !== 0x30,
          sweep !== 0x30, x2 + curx, y2 + cury);
        sep = true;
      }
      break;
    }
    case 0x53:case 0x73:{ // 'S', 's'
      sep = false;
      for (;;) {
        curx = c === 0x73 ? ret.endPos[0] : 0;
        cury = c === 0x73 ? ret.endPos[1] : 0;
        x = GraphicsPath._nextNumber(str, index, sep);
        if(typeof x === "undefined" || x === null) {
          if(!sep)failed = true; break;
        }
        y = GraphicsPath._nextNumber(str, index, true);
        if(typeof y === "undefined" || y === null) {
          failed = true; break;
        }
        x2 = GraphicsPath._nextNumber(str, index, true);
        if(typeof x2 === "undefined" || x2 === null) {
          failed = true; break;
        }
        y2 = GraphicsPath._nextNumber(str, index, true);
        if(typeof y2 === "undefined" || y2 === null) {
          failed = true; break;
        }
        // second control point to use if previous segment is not a cubic
        xcp = ret.endPos[0];
        ycp = ret.endPos[1];
        endx = ret.endPos[0];
        endy = ret.endPos[1];
        // NOTE: If previous segment is not a cubic, second control
        // point is same as current point.
        if(ret.segments.length > 0 &&
        ret.segments[ret.segments.length - 1][0] === GraphicsPath.CUBIC) {
          xcp = ret.segments[ret.segments.length - 1][5];
          ycp = ret.segments[ret.segments.length - 1][6];
        }
        ret.bezierCurveTo(2 * endx - xcp, 2 * endy - ycp, x + curx, y + cury, x2 + curx, y2 + cury);
        sep = true;
      }
      break;
    }
    case 0x54:case 0x74:{ // 'T', 't'
      sep = false;
      for (;;) {
        curx = c === 0x74 ? ret.endPos[0] : 0;
        cury = c === 0x74 ? ret.endPos[1] : 0;
        x = GraphicsPath._nextNumber(str, index, sep);
        if(typeof x === "undefined" || x === null) {
          if(!sep)failed = true; break;
        }
        y = GraphicsPath._nextNumber(str, index, true);
        if(typeof y === "undefined" || y === null) {
          failed = true; break;
        }
        xcp = ret.endPos[0]; // control point to use if previous segment is not a quad
        ycp = ret.endPos[1];
        endx = ret.endPos[0];
        endy = ret.endPos[1];
        // NOTE: If previous segment is not a quad, first control
        // point is same as current point.
        if(ret.segments.length > 0 &&
        ret.segments[ret.segments.length - 1][0] === GraphicsPath.QUAD) {
          xcp = ret.segments[ret.segments.length - 1][3];
          ycp = ret.segments[ret.segments.length - 1][4];
        }
        ret.quadraticCurveTo(2 * endx - xcp, 2 * endy - ycp, x + curx, y + cury);
        sep = true;
      }
      break;
    }
    default:
      ret.incomplete = true;
      return ret;
    }
  }
  if(failed)ret.incomplete = true;
  return ret;
};

Triangulate._CONVEX = 1;
Triangulate._EAR = 2;
Triangulate._REFLEX = 3;

const EPSILON = 1.1102230246251565e-16;
const ORIENT_ERROR_BOUND_2D = (3.0 + 16.0 * EPSILON) * EPSILON;

// orient2D was
// Adapted by Peter O. from the HE_Mesh library
// written by Frederik Vanhoutte.

function orient2D(pa, pb, pc) {
  let detsum;

  const detleft = (pa[0] - pc[0]) * (pb[1] - pc[1]);

  const detright = (pa[1] - pc[1]) * (pb[0] - pc[0]);

  const det = detleft - detright;
  if (detleft > 0.0) {
    if (detright <= 0.0) {
      return det < 0 ? -1 : det === 0 ? 0 : 1;
    } else {
      detsum = detleft + detright;
    }
  } else if (detleft < 0.0) {
    if (detright >= 0.0) {
      return det < 0 ? -1 : det === 0 ? 0 : 1;
    } else {
      detsum = -detleft - detright;
    }
  } else {
    return det < 0 ? -1 : det === 0 ? 0 : 1;
  }

  const errbound = ORIENT_ERROR_BOUND_2D * detsum;
  if (det >= errbound || -det >= errbound) {
    return det < 0 ? -1 : det === 0 ? 0 : 1;
  }
  /* TODO: use higher precision math for:
    detleft = (pa[0] - pc[0]) * (pb[1] - pc[1]);
    detright = (pa[1] - pc[1]) * (pb[0] - pc[0]);
    det = detleft - detright;
    return sgn(det); */
  return 0;
}

/** @ignore */
Triangulate._pointInTri = function(i1, i2, i3, p) {
  if(p[0] === i1[0] && p[1] === i1[1])return false;
  if(p[0] === i2[0] && p[1] === i2[1])return false;
  if(p[0] === i3[0] && p[1] === i3[1])return false;
  const t3 = i2[0] - i3[0];
  const t4 = i2[1] - i3[1];
  const t5 = i2[0] - i1[0];
  const t6 = i2[1] - i1[1];
  const t7 = t5 * t3 + t6 * t4;
  const t8 = t5 * t5 + t6 * t6 - t7 * t7 / (
    t3 * t3 + t4 * t4);
  if (Math.sqrt(Math.abs(t8)) > 1e-9) {
    let p1 = orient2D(i2, i3, p);
    let p2 = orient2D(i2, i3, i1);
    let b = p1 === 0 || p2 === 0 || p1 === p2;
    p1 = orient2D(i1, i3, p);
    p2 = orient2D(i1, i3, i2);
    b = b && (p1 === 0 || p2 === 0 || p1 === p2);
    p1 = orient2D(i1, i2, p);
    p2 = orient2D(i1, i2, i3);
    return b && (p1 === 0 || p2 === 0 || p1 === p2);
  } else {
    return false;
  }
};

/** @ignore
 * @constructor */
Triangulate._Contour = function(vertices) {
  this.vertexList = new LinkedList();
  let vertLength = vertices.length;
  // For convenience, eliminate the last
  // vertex if it matches the first vertex
  if(vertLength >= 4 &&
    vertices[0] === vertices[vertLength - 2] &&
    vertices[1] === vertices[vertLength - 1]) {
    vertLength -= 2;
  }
  let lastX = -1;
  let lastY = -1;
  let maxXNode = null;
  let maxX = -1;
  const inf = Number.POSITIVE_INFINITY;
  const bounds = [inf, inf, -inf, -inf];
  let firstVertex = true;
  this.vertexCount = 0;
  let i;
  for(i = 0; i < vertLength; i += 2) {
    const x = vertices[i];
    const y = vertices[i + 1];
    if(i > 0 && x === lastX && y === lastY) {
      // skip consecutive duplicate points
      continue;
    }
    lastX = x;
    lastY = y;
    this.vertexList.push([x, y]);
    if(!maxXNode || x > maxX) {
      maxX = x;
      maxXNode = this.vertexList.last();
    }
    if(firstVertex) {
      bounds[0] = bounds[2] = x;
      bounds[1] = bounds[3] = y;
      firstVertex = false;
    } else {
      bounds[0] = Math.min(bounds[0], x);
      bounds[1] = Math.min(bounds[1], y);
      bounds[2] = Math.max(bounds[2], x);
      bounds[3] = Math.max(bounds[3], y);
    }
    this.vertexCount++;
  }
  this.maxXNode = maxXNode;
  this.bounds = bounds;
  // Find the prevailing winding of the polygon
  let ori = 0;
  let convex = true;
  let convexOri = -2;
  let vert = this.vertexList.first();
  const lastVert = this.vertexList.last().data;
  const firstVert = vert.data;
  while(vert) {
    const vn = vert.next ? vert.next.data : firstVert;
    const vp = vert.prev ? vert.prev.data : lastVert;
    if(convex) {
      const cori = orient2D(vp, vert.data, vn);
      if(convexOri !== -2 && cori !== convexOri)convex = false;
      convexOri = cori;
    }
    ori += vert.data[0] * vn[1] - vert.data[1] * vn[0];
    vert = vert.next;
  }
  this.convex = convex;
  this.winding = ori === 0 ? 0 : ori < 0 ? -1 : 1;
};
Triangulate._Contour.prototype.findVisiblePoint = function(x, y) {
  let vert = this.vertexList.first();
  if(typeof vert === "undefined" || vert === null)return null;
  const bounds = this.bounds;
  if(x < bounds[0] || y < bounds[1] || x > bounds[2] || y > bounds[2])return null;
  const lastVert = this.vertexList.last();
  const firstVert = vert;
  let closeVertices = [];
  while(vert) {
    const vn = vert.next ? vert.next : firstVert;
    const x1 = vert.data[0];
    const x2 = vn.data[0];
    const y1 = vert.data[1];
    const y2 = vn.data[1];
    const xmin = Math.min(x1, x2);
    const xmax = Math.max(x1, x2);
    const ymin = Math.min(y1, y2);
    const ymax = Math.max(y1, y2);
    if(x1 === x && y1 === y) {
      return vert;
    } else if(x2 === x && y2 === y) {
      return vn;
    }
    if(x <= xmax && y >= ymin && y <= ymax) {
      if(y1 === y2) {
        // parallel to the ray
        closeVertices.push([
          xmin, xmin === vert.data[0] ? vert : vn, true]);
      } else {
        const dx = x2 - x1;
        const t = (y - y1) / (y2 - y1);
        const xi = x + dx * t;
        if(xi >= x) {
          if(xi === x1) {
            closeVertices.push([xi, vert, true]);
          } else if(xi === x2) {
            closeVertices.push([xi, vn, true]);
          } else {
            closeVertices.push([xi, vert, false]);
          }
        }
      }
    }
    vert = vert.next;
  }
  if(closeVertices.length === 0) {
    // no visible vertices
    return null;
  } else if(closeVertices.length > 1) {
    // sort by X coordinate
    closeVertices = closeVertices.sort(function(a, b) {
      if(a[0] === b[0])return 0;
      return a[0] < b[0] ? -1 : 1;
    });
  }
  if(closeVertices[0][2]) {
    // closest vertex is already a vertex of
    // the contour
    return closeVertices[0][1];
  }
  vert = closeVertices[0][1];
  const nextVert = vert.next ? vert.next : firstVert;
  const triangle1 = [x, y];
  const triangle2 = [closeVertices[0][0], y];
  let iterVert = firstVert;
  let innerReflexes = [];
  while(iterVert) {
    if(iterVert !== nextVert) {
      const iterPrev = iterVert.prev ? iterVert.prev : lastVert;
      const iterNext = iterVert.next ? iterVert.next : firstVert;
      const orient = orient2D(iterPrev.data, iterVert.data, iterNext.data);
      if(orient !== 0 && orient !== this.winding) {
        // This is a reflex vertex
        const pointIn = Triangulate._pointInTri(
          triangle1, triangle2, nextVert.data, iterVert.data);
        if(pointIn) {
          // The reflex vertex is in the triangle
          const t1 = iterVert.data[0] - triangle1[0];
          const t2 = iterVert.data[1] - triangle1[1];
          const distance = Math.sqrt(t1 * t1 + t2 * t2);
          let angle = t1 / distance;
          if(angle < -1)angle = -1;
          if(angle > 1)angle = 1;
          innerReflexes.push([Math.acos(angle), distance, iterVert]);
        }
      }
    }
    iterVert = iterVert.next;
  }
  if(innerReflexes.length === 0) {
    // vertex after the intersected vertex is visible
    return nextVert;
  }
  // sort by angle, then by distance
  if(innerReflexes.length > 1) {
    innerReflexes = innerReflexes.sort(function(a, b) {
      if(a[0] === b[0]) {
        if(a[1] === b[1])return 0;
        return a[1] < b[1] ? -1 : 1;
      }
      return a[0] < b[0] ? -1 : 1;
    });
  }
  return innerReflexes[0][2];
};

/*
  function getLineIntersectionInto2D(a1, a2, b1, b2, p) {
    var s1 = [a1[0] - a2[0], a1[1] - a2[1]];
    var s2 = [b1[0] - b2[0], b1[1] - b2[1]];
    var det = s1[0] * s2[1] - s1[1] * s2[0];
    if (Math.abs(det) <= 1e-9) {
      return false;
    } else {
      det = 1.0 / det;
      var t2 = det * (a1[0] * s1[1] - a1[1] * s1[0] - (b1[0] * s1[1] - b1[1] * s1[0]));
      p[0] = b1[0] * (1.0 - t2) + b2[0] * t2;
      p[1] = b1[1] * (1.0 - t2) + b2[1] * t2;
      return true;
    }
  }

  function getSegmentIntersection2D(ap1, ap2, bp1, bp2) {
    var A = [ap2[0] - ap1[0], ap2[1] - ap1[1], 0];
    var B = [bp2[0] - bp1[0], bp2[1] - bp1[1], 0];
    var BxA = B[0] * A[1] - B[1] * A[0];
    if (Math.abs(BxA) <= 1e-9) {
      return null;
    }
    var v1 = [ap1[0] - bp1[0], ap1[1] - bp1[1], 0];
    var ambxA = v1[0] * A[1] - v1[1] * A[0];
    if (Math.abs(ambxA) <= 1e-9) {
      return null;
    }
    var tb = ambxA / BxA;
    if (tb < 0.0 || tb > 1.0) {
      return null;
    }
    var ip = [B[0] * tb, B[1] * tb, 0];
    ip[0] += bp1[0];
    ip[1] += bp1[1];
    var ta = [ip[0] - ap1[0], ip[1] - ap1[1], 0];
    ta = (ta[0] * A[0] + ta[1] * A[1]) / (A[0] * A[0] + A[1] * A[1]);
    if (ta < 0.0 || ta > 1.0 || isNaN(ta)) {
      return null;
    }
    return ip;
  }
*/
function decomposePolygon(pointlist, accumulator) {
  if (pointlist.length < 3) {
    return;
  }
  // TODO
  console.warn("not implemented");
  accumulator.push(pointlist);
}

function decomposeTriangles(points, tris, isConvex) {
  const polys = [];
  if(isConvex) {
    // Already found to be convex, so
    // this is trivial
    polys.push(points);
  } else {
    decomposePolygon(points, polys);
  }
  if(points.length > 0 && polys.length === 0)throw new Error();
  let i;
  for (i = 0; i < polys.length; i++) {
    const poly = polys[i];
    let j;
    for (j = 0; j < poly.length - 2; j++) {
      tris.push([
        poly[0][0], poly[0][1],
        poly[j + 1][0], poly[j + 1][1],
        poly[j + 2][0], poly[j + 2][1]]);
    }
  }
}

/**
 * Converts the subpaths in this path to triangles.
 * Treats each subpath as a polygon even if it isn't closed.
 * Each subpath should not contain self-intersections or
 * duplicate vertices, except duplicate vertices that appear
 * consecutively or at the start and end.<p>
 * The path can contain holes. In this case, subpaths
 * whose winding order (counterclockwise or clockwise)
 * differs from the first subpath's winding order can be holes.
 * @param {number} [flatness] When curves and arcs
 * are decomposed to line segments, the
 * segments will be close to the true path of the curve by this
 * value, given in units. If null, undefined, or omitted, default is 1.
 * @returns {Array<Array<number>>} Array of six-element
 * arrays each describing a single triangle. For each six-element
 * array, the first two, next two, and last two numbers each
 * describe a vertex position of that triangle (X and Y coordinates
 * in that order).
 */
GraphicsPath.prototype.getTriangles = function(flatness) {
  if(typeof flatness === "undefined" || flatness === null)flatness = 1.0;
  // NOTE: _getSubpaths doesn't add degenerate line segments
  const subpaths = this._getSubpaths(flatness, true);
  const contours1 = [];
  const contours2 = [];
  let firstOrient = 0;
  const tris = [];
  let i;
  let j;
  for(i = 0; i < subpaths.length; i++) {
    const contour = new Triangulate._Contour(subpaths[i]);
    // NOTE: Ignores contours with winding 0
    // (empty, zero area, sometimes self-intersecting)
    if(contour.winding > 0) {
      if(firstOrient === 0)firstOrient = 1;
      contours1.push(contour);
    } else if(contour.winding < 0) {
      if(firstOrient === 0)firstOrient = -1;
      contours2.push(contour);
    }
  }
  if(contours2.length === 0 || contours1.length === 0) {
    // All the contours have the same winding order
    const c = contours2.length === 0 ? contours1 : contours2;
    for(i = 0; i < c.length; i++) {
      Triangulate._triangulate(c[i], tris);
    }
    // if(tris.length==0) {
    // console.log("no triangles added! "+[contours1.length,contours2.length])
    // throw new Error()
    // }
  } else {
    const c1 = firstOrient > 0 ? contours1 : contours2;
    const c2 = firstOrient > 0 ? contours2 : contours1;
    for(i = 0; i < c2.length; i++) {
      if(!c2[i])continue;
      for(j = 0; j < c1.length; j++) {
        if(!c1[j])continue;
        const maxPoint = c2[i].maxXNode;
        // Find out if the contour is inside another contour,
        // and if so, connect its vertices to that contour
        const vp = c1[j].findVisiblePoint(
          maxPoint.data[0], maxPoint.data[1]);
        if(vp) {
          c1[j].vertexCount += Triangulate._connectContours(
            c2[i].vertexList, c1[j].vertexList, maxPoint, vp);
          c2[i] = null;
          break;
        }
      }
    }
    for(i = 0; i < c1.length; i++) {
      Triangulate._triangulate(c1[i], tris);
    }
    for(i = 0; i < c2.length; i++) {
      Triangulate._triangulate(c2[i], tris);
    }
  }
  return tris;
};
/**
 * Decomposes this path into triangles and generates a mesh
 * buffer with those triangles. Each triangle's normal will point
 * toward the Z axis, and each triangle vertex's texture coordinates will
 * be the same as that vertex's position.
 * @param {number} [z] The Z coordinate of each triangle generated.
 * If null, undefined, or omitted, default is 0.
 * @param {number} [flatness] When curves and arcs
 * are decomposed to line segments, the
 * segments will be close to the true path of the curve by this
 * value, given in units. If null, undefined, or omitted, default is 1.
 * @returns {MeshBuffer} The resulting mesh buffer.
 */
GraphicsPath.prototype.toMeshBuffer = function(z, flatness) {
  if(typeof z === "undefined" || z === null)z = 0;
  const tris = this.getTriangles(flatness);
  const vertices = [];
  let i;
  for (i = 0; i < tris.length; i++) {
    const tri = tris[i];
    // Position X, Y, Z; Normal NX, NY, NZ; texture U, V
    vertices.push(
      tri[0], tri[1], z, 0, 0, 1, tri[0], tri[1],
      tri[2], tri[3], z, 0, 0, 1, tri[2], tri[3],
      tri[4], tri[5], z, 0, 0, 1, tri[4], tri[5]);
  }
  return MeshBuffer.fromPositionsNormalsUV(vertices);
};
/**
 * Generates a mesh buffer consisting of the approximate line segments that make up this graphics path.
 * @param {number} [z] Z coordinate for each line segment. If null, undefined, or omitted, the default is 0.
 * @param {number} [flatness] When curves and arcs
 * are decomposed to line segments, the
 * segments will be close to the true path of the curve by this
 * value, given in units. If null, undefined, or omitted, default is 1.
 * @returns {MeshBuffer} The resulting mesh buffer.
 */
GraphicsPath.prototype.toLineMeshBuffer = function(z, flatness) {
  if(typeof z === "undefined" || z === null)z = 0;
  const lines = this.getLines(flatness);
  const vertices = [];
  let i;
  for (i = 0; i < lines.length; i++) {
    const line = lines[i];
    vertices.push(line[0], line[1], z,
      line[2], line[3], z);
  }
  return MeshBuffer.fromPositions(vertices).setType(
    MeshBuffer.LINES);
};
/**
 * Generates a mesh buffer consisting of "walls" that follow this graphics path approximately, and, optionally, a base and toop.
 * @param {number} zStart Starting Z coordinate of the mesh buffer's "walls".
 * @param {number} zEnd Ending Z coordinate of the mesh buffer's "walls".
 * @param {number} [flatness] When curves and arcs
 * are decomposed to line segments, the
 * segments will be close to the true path of the curve by this
 * value, given in units. If null, undefined, or omitted, default is 1.
 * @param {boolean} [closed] If true, the generated mesh buffer will include a base and top. If null, undefined, or omitted, the default is false.
 * @returns {MeshBuffer} The resulting mesh buffer.
 */
GraphicsPath.prototype.toExtrudedMeshBuffer = function(zStart, zEnd, flatness, closed) {
  if((typeof zStart === "undefined" || zStart === null) || zEnd === null)throw new Error();
  const isclosed = typeof closed === "undefined" || closed === null ? false : closed;
  if(isclosed) {
    const mesh = new MeshBuffer();
    mesh.merge(this.toExtrudedMeshBuffer(zStart, zEnd, flatness, false));
    mesh.merge(this.toMeshBuffer(zEnd, flatness));
    mesh.merge(this.toMeshBuffer(zStart, flatness).reverseWinding().reverseNormals());
    return mesh;
  }
  const lines = this.getLines(flatness);
  const z1 = Math.min(zStart, zEnd);
  const z2 = Math.max(zStart, zEnd);
  const vertices = [];
  let i;
  for (i = 0; i < lines.length; i++) {
    const line = lines[i];
    const dx = line[2] - line[0];
    const dy = line[3] - line[1];
    const dot = dx * dx + dy * dy;
    if(dot === 0)continue;
    vertices.push(line[0], line[1], z1,
      line[2], line[3], z1,
      line[0], line[1], z2,
      line[2], line[3], z1,
      line[2], line[3], z2,
      line[0], line[1], z2);
  }
  return MeshBuffer.fromPositions(vertices)
    .recalcNormals(true);
};

/** @ignore */
Triangulate._connectContours = function(src, dst, maxPoint, dstNode) {
  let vpnode = dstNode;
  let c2node = maxPoint;
  let count = 0;
  while(c2node) {
    vpnode = dst.insertAfter(c2node.data, vpnode);
    c2node = c2node.next;
    count++;
  }
  c2node = src.first();
  while(c2node !== maxPoint && (typeof c2node !== "undefined" && c2node !== null)) {
    vpnode = dst.insertAfter(c2node.data, vpnode);
    c2node = c2node.next;
    count++;
  }
  vpnode = dst.insertAfter(maxPoint.data, vpnode);
  dst.insertAfter(dstNode.data, vpnode);
  // Connecting two polygons, even if convex, may not
  // result in a convex polygon
  dst.convex = false;
  count += 2;
  return count;
};
/** @ignore */
Triangulate._triangulate = function(contour, tris) {
  let t1;
  let tri;
  if(!contour || contour.vertexCount < 3 || contour.winding === 0) {
    // too few vertices, or the winding
    // suggests a zero area or even a certain
    // self-intersecting polygon
    return;
  } else if(contour.vertexCount === 3) {
    // just one triangle
    t1 = contour.vertexList.first();
    tri = [];
    while(t1) {
      tri.push(t1.data[0], t1.data[1]);
      t1 = t1.next;
    }
    tris.push(tri);
    return;
  }
  const first = contour.vertexList.first();
  const vertices = [];
  let vert = first;
  while(vert) {
    vertices.push([vert.data[0], vert.data[1]]);
    vert = vert.next;
  }
  decomposeTriangles(vertices, tris, contour.convex);
};

// //////////////////////////////////////////////////////////////////////////////////////////////
// Data structures
// //////////////////////////////////////////////////////////////////////////////////////////////

/** @ignore
 * @constructor */
const PriorityQueue = function(comparer) {
  // Based on Doug Lea's public domain Heap class in Java
  this.comparer = comparer;
  this.nodes = [];
  this._size = 0;
  this.size = function() {
    return this._size;
  };
  this._compare = function(a, b) {
    if(this.comparer) {
      return this.comparer(a, b);
    } else {
      if(a === b)return 0;
      return a < b ? -1 : 1;
    }
  };
  this.push = function(item) {
    let x = this._size;
    while(x > 0) {
      const p = (x - 1) / 2 | 0;
      // NOTE: comparer > 0, not comparer < 0, as
      // in Doug Lea's implementation
      if(this.comparer(item, this.nodes[p]) > 0) {
        this.nodes[x] = this.nodes[p];
        x = p;
      } else break;
    }
    this.nodes[x] = item;
    this._size += 1;
    return this;
  };
  // NOTE: Pops out the greatest element, not
  // the least, as in Doug Lea's implementation
  this.pop = function() {
    let data = null;
    if(this._size > 0) {
      let k = 0;
      data = this.nodes[k];
      this._size--;
      const x = this.nodes[this._size];
      for (;;) {
        const left = 1 + 2 * k;
        const right = 2 * (k + 1);
        if(left < this._size) {
          const child = right >= this._size ||
        this.comparer(this.nodes[left], this.nodes[right]) > 0 ? left : right;
          if(this.comparer(x, this.nodes[child]) < 0) {
            this.nodes[k] = this.nodes[child];
            k = child;
          } else break;
        } else break;
      }
      this.nodes[k] = x;
    }
    return data;
  };
};
  // Mostly based on Julienne Walker's
  // public domain C implementation
  /** @ignore
   * @constructor */
const RedBlackTreeNode = function(data) {
  this.left = null;
  this.right = null;
  this.red = true;
  this.p = null;
  this.data = data;
  this.link = function(dir) {
    return dir ? this.right : this.left;
  };
  this.copy = function() {
    const c = new RedBlackTreeNode(this.data);
    c.left = this.left;
    c.right = this.right;
    c.red = this.red;
    c.p = this.p;
    c.data = this.data;
    return c;
  };
  this.setLink = function(dir, child) {
    if(dir) {
      this.right = child;
    } else {
      this.left = child;
    }
    if(typeof child !== "undefined" && child !== null) {
      child.p = this;
    }
  };
  this.prev = function() {
    if(typeof this.left !== "undefined" && this.left !== null) {
      let r = this.left;
      while(typeof r.right !== "undefined" && r.right !== null)r = r.right;
      return r;
    } else {
      let p = this.p;
      const that = this;
      let tmp = that;
      while(typeof p !== "undefined" && p !== null && tmp === p.left) {
        tmp = p;
        p = p.p;
      }
      return p;
    }
  };
  this.next = function() {
    if(typeof this.right !== "undefined" && this.right !== null) {
      let r = this.right;
      while(typeof r.left !== "undefined" && r.left !== null)r = r.left;
      return r;
    } else {
      let p = this.p;
      const that = this;
      let tmp = that;
      while(typeof p !== "undefined" && p !== null && tmp === p.right) {
        tmp = p;
        p = p.p;
      }
      return p;
    }
  };
};
  /** @ignore
   * @constructor */
const RedBlackTree = function(comparer) {
  if(!comparer) {
    this.comparer = RedBlackTree._defaultCompare;
  } else {
    this.comparer = comparer;
  }
  this.root = null;
  this._size = 0;
  this.size = function() {
    return this._size;
  };
};
  /** @ignore */
RedBlackTree._defaultCompare = function(a, b) {
  if(a === b)return 0;
  return a < b ? -1 : 1;
};
/** @ignore */
RedBlackTree.prototype.first = function() {
  let r = this.root;
  if(typeof r === "undefined" || r === null)return null;
  while(typeof r.left !== "undefined" && r.left !== null)r = r.left;
  return r;
};
/** @ignore */
RedBlackTree.prototype.last = function() {
  let r = this.root;
  if(typeof r === "undefined" || r === null)return null;
  while(typeof r.right !== "undefined" && r.right !== null)r = r.right;
  return r;
};
/** @ignore */
RedBlackTree.prototype.find = function(data) {
  let it = this.root;
  while(typeof it !== "undefined" && it !== null) {
    const cmp = this.comparer(it.data, data);
    if(cmp === 0)break;
    it = cmp < 0 ? it.right : it.left;
  }
  return typeof it === "undefined" || it === null ? null : it.data;
};
/** @ignore */
RedBlackTree._red = function(node) {
  return typeof node !== "undefined" && node !== null && node.red === 1;
};
/** @ignore */
RedBlackTree._single = function(root, dir) {
  const save = root.link(!dir);
  root.setLink(!dir, save.link(dir));
  save.setLink(dir, root);
  root.red = true;
  save.red = false;
  return save;
};
/** @ignore */
RedBlackTree._double = function(root, dir) {
  root.setLink(!dir, RedBlackTree._single( root.link(!dir), !dir ));
  return RedBlackTree._single( root, dir );
};
/** @ignore */
RedBlackTree.prototype.erase = function(data) {
  if(typeof this.root !== "undefined" && this.root !== null) {
    const head = new RedBlackTreeNode(null); /* False tree root */
    let q;
    let p;
    let g; /* Helpers */
    let f = null; /* Found item */
    let dir = true;

    /* Set up our helpers */
    q = head;
    g = p = null;
    q.setLink(true, this.root);

    /*
      Search and push a red node down
      to fix red violations as we go
    */
    while( q.link(dir) !== null ) {
      const last = dir;

      /* Move the helpers down */
      g = p;
      p = q;
      q = q.link(dir);
      const cmp = this.comparer( q.data, data );
      dir = cmp < 0;
      /*
        Save the node with matching data and keep
        going; we'll do removal tasks at the end
      */
      if( cmp === 0 )
        f = q;
        /* Push the red node down with rotations and color flips */
      if( !RedBlackTree._red( q ) && !RedBlackTree._red( q.link(dir) ) ) {
        if( RedBlackTree._red( q.link(!dir) ) )
          p.setLink(last, p = RedBlackTree._single( q, dir ));
        else if( !RedBlackTree._red( q.link(!dir) ) ) {
          const s = p.link(!last);
          if( typeof s !== "undefined" && s !== null ) {
            if( !RedBlackTree._red( s.link(!last) ) && !RedBlackTree._red( s.link(last) ) ) {
              /* Color flip */
              p.red = false;
              s.red = true;
              q.red = true;
            } else {
              const dir2 = g.right === p;

              if( RedBlackTree._red( s.link(last) ) )
                g.setLink(dir2, RedBlackTree._double( p, last ));
              else if( RedBlackTree._red( s.link(!last) ) )
                g.setLink(dir2, RedBlackTree._single( p, last ));
                /* Ensure correct coloring */
              q.red = g.link(dir2).red = false;
              g.link(dir2).left.red = true;
              g.link(dir2).right.red = true;
            }
          }
        }
      }
    }

    /* Replace and remove the saved node */
    if( typeof f !== "undefined" && f !== null ) {
      f.data = q.data;
      p.setLink(p.right === q, q.link(typeof q.left === "undefined" || q.left === null));
    }

    /* Update the root(it may be different) */
    this.root = head.right;

    /* Make the root black for simplified logic */
    if(typeof this.root !== "undefined" && this.root !== null) {
      this.root.p = null;
      this.root.red = false;
    }
    --this._size;
  }
};
/** @ignore */
RedBlackTree.prototype.insert = function(data) {
  if(!data)throw new Error();
  let retval = null;
  if (typeof this.root === "undefined" || this.root === null) {
    /*
      We have an empty tree; attach the
      new node directly to the root
    */
    this.root = new RedBlackTreeNode(data);
    retval = this.root;
  } else {
    const head = new RedBlackTreeNode(null); /* False tree root */
    let g;
    let t; /* Grandparent & parent */
    let p;
    let q; /* Iterator & parent */
    let dir = false,
      last = false;

    /* Set up our helpers */
    t = head;
    g = p = null;
    q = this.root;
    t.setLink(true, q);

    /* Search down the tree for a place to insert */
    for (;;) {
      if ( typeof q === "undefined" || q === null ) {
        /* Insert a new node at the first null link */
        p.setLink(dir, q = new RedBlackTreeNode(data));
      } else if ( RedBlackTree._red( q.left ) && RedBlackTree._red( q.right ) ) {
        /* Simple red violation: color flip */
        q.red = true;
        q.left.red = false;
        q.right.red = false;
      }

      if ( RedBlackTree._red( q ) && RedBlackTree._red( p ) ) {
        /* Hard red violation: rotations necessary */
        const dir2 = t.right === g;
        if ( q === p.link(last) )
          t.setLink(dir2, RedBlackTree._single( g, !last ));
        else
          t.setLink(dir2, RedBlackTree._double( g, !last ));
      }
      /*
        Stop working if we inserted a node. This
        check also disallows duplicates in the tree
      */
      const cmp = this.comparer( q.data, data );
      if ( cmp === 0 ) {
        retval = q;
        break;
      }
      last = dir;
      dir = cmp < 0;

      /* Move the helpers down */
      if ( typeof g !== "undefined" && g !== null )
        t = g;

      g = p;
      p = q;
      q = q.link(dir);
    }

    /* Update the root (it may be different) */
    this.root = head.right;
    if(typeof this.root !== "undefined" && this.root !== null)
      this.root.p = null;
  }

  /* Make the root black for simplified logic */
  this.root.red = false;
  ++this._size;
  return retval;
};

// NOTE: Much of the Polygon, Connector, and Clipper classes
// was adapted for JavaScript by Peter O. from the public domain
// C++ code by Francisco Martinez and others.
/** @constructor
 * @private
 * @ignore */
const Polygon = function(path, flatness) {
  this.subpaths = [];
  this.contours = [];
  if(typeof path !== "undefined" && path !== null) {
    // Ignore degenerate line segments
    this.subpaths = path._getSubpaths(flatness, true);
    let i;
    for (i = 0; i < this.subpaths.length; i++) {
      this.contours[i] = new Polygon._Contour(this.subpaths[i]);
    }
  }
  this.path = path;
  this.getBounds = function() {
    return this.path.getBounds();
  };
  this.ncontours = function() {
    return this.subpaths.length;
  };
  this.contour = function(i) {
    return this.contours[i];
  };
  this.push = function(c) {
    this.contours.push(c);
  };
  this.toPath = function() {
    const p = new GraphicsPath();
    let i;
    for (i = 0; i < this.contours.length; i++) {
      const c = this.contours[i];
      const cv = c.vertices;
      let j;
      for (j = 0; j < cv.length; j += 2) {
        if(j === 0) {
          p.moveTo(cv[j], cv[j + 1]);
        } else {
          p.lineTo(cv[j], cv[j + 1]);
        }
      }
      p.closePath();
    }
    return p;
  };
};
/** @constructor
 * @private
 * @ignore */
Polygon._Contour = function(subpath) {
  this.vertices = subpath;
  this.nvertices = function() {
    return this.vertices.length / 2;
  };
  this.segment = function(i) {
    if(i === this.nvertices() - 1) {
      return [[this.vertices[i * 2], this.vertices[i * 2 + 1]], [this.vertices[0], this.vertices[1]]];
    } else {
      return [[this.vertices[i * 2], this.vertices[i * 2 + 1]], [this.vertices[i * 2 + 2], this.vertices[i * 2 + 3]]];
    }
  };
};
/** @constructor
 * @private
 * @ignore */
const Clipper = function(s, c) {
  this.eq = new PriorityQueue(Clipper.sweepEventCompNum);
  this.eventHolder = [];
  this.subject = s;
  this.clipping = c;
  this.nint = 0;
};
/** @constructor
 * @private
 * @ignore */
function Connector() {
  this.openPolygons = new LinkedList();
  this.closedPolygons = new LinkedList();
  this.clear = function() {
    this.openPolygons.clear();
    this.closedPolygons.clear();
  };
  this.size = function() {
    return this.closedPolygons.size();
  };
}
/** @constructor
 * @private
 * @ignore */
Polygon.PointChain = function() {
  this.l = new LinkedList();
  this._closed = false;
  this.closed = function() {
    return this._closed;
  };
  this.clear = function() {
    this.l.clear();
  };
  this.first = function() {
    return this.l.first();
  };
  this.size = function() {
    return this.l.size();
  };
  this.init = function(s) {
    this.l.push(s[0]).push(s[1]);
  };
  this.linkSegment = function(s) {
    if(Clipper._ptEq(s[0], this.l.front())) {
      if(Clipper._ptEq(s[1], this.l.back()))
        this._closed = true;
      else
        this.l.unshift(s[1]);
      return true;
    }
    if(Clipper._ptEq(s[1], this.l.back())) {
      if(Clipper._ptEq(s[0], this.l.front()))
        this._closed = true;
      else
        this.l.push(s[0]);
      return true;
    }
    if(Clipper._ptEq(s[1], this.l.front())) {
      if(Clipper._ptEq(s[0], this.l.back()))
        this._closed = true;
      else
        this.l.unshift(s[0]);
      return true;
    }
    if(Clipper._ptEq(s[0], this.l.back())) {
      if(Clipper._ptEq(s[1], this.l.front()))
        this._closed = true;
      else
        this.l.push(s[1]);
      return true;
    }
    return false;
  };
};

Polygon.PointChain.prototype.linkPointChain = function(chain) {
  if(Clipper._ptEq(chain.l.front(), this.l.back())) {
    chain.l.shift();
    this.l.spliceToEnd(chain.l);
    return true;
  }
  if(Clipper._ptEq(chain.l.back(), this.l.front())) {
    this.l.shift();
    this.l.spliceToBegin(chain.l);
    return true;
  }
  if(Clipper._ptEq(chain.l.front(), this.l.front())) {
    this.l.shift();
    chain.l.reverse();
    this.l.spliceToBegin(chain.l);
    return true;
  }
  if(Clipper._ptEq(chain.l.back(), this.l.back())) {
    this.l.pop();
    chain.l.reverse();
    this.l.spliceToEnd(chain.l);
    return true;
  }
  return false;
};
/** @ignore */
Connector.prototype.add = function(s) {
  let j = this.openPolygons.first();
  while(j) {
    if(j.data.linkSegment(s)) {
      if(j.data.closed())
        this.closedPolygons.spliceOneToEnd(this.openPolygons, j);
      else {
        let k = j.next;
        while(k) {
          if(j.data.linkPointChain(k.data)) {
            this.openPolygons.erase(k);
            break;
          }
          k = k.next;
        }
      }
      return;
    }
    j = j.next;
  }
  // The segment cannot be connected with any open polygon
  const chain = new Polygon.PointChain();
  chain.init(s);
  this.openPolygons.push(chain);
};
/** @ignore */
Connector.prototype.toPolygon = function() {
  const polygon = new Polygon(null, null);
  let j = this.closedPolygons.first();
  while(j) {
    const contour = new Polygon._Contour([]);
    let k = j.data.first();
    while(k) {
      contour.vertices.push(k.data[0], k.data[1]);
      k = k.next;
    }
    polygon.contours.push(contour);
    j = j.next;
  }
  return polygon;
};

const NORMAL = 0;
const SUBJECT = 0;
const CLIPPING = 1;
const INTERSECTION = 0;
const UNION = 1;
const DIFFERENCE = 2;
const XOR = 3;
const NON_CONTRIBUTING = 1;
const SAME_TRANSITION = 2;
const DIFFERENT_TRANSITION = 3;
/** @constructor
 * @private
 * @ignore */
Clipper.SweepEvent = function(pp, b, apl, o, t) {
  this.p = pp;
  this.id = -1;
  this.left = b;
  this.pl = apl;
  this.other = o;
  this.type = typeof t === "undefined" || t === null ? NORMAL : t;
  this.poss = null;
  this.inOut = false;
  this.inside = false;
  this.segment = function() {
    return [this.p, this.other.p];
  };
  this.below = function(x) {
    return this.left ?
      Clipper.signedArea(this.p, this.other.p, x) > 0 :
      Clipper.signedArea(this.other.p, this.p, x) > 0;
  };
  this.above = function(x) {
    return !this.below(x);
  };
};
/** @ignore */
Clipper.signedArea = function(a, b, c) {
  const xa = a[0] - c[0];
  const ya = a[1] - c[1];
  const xb = b[0] - c[0];
  const yb = b[1] - c[1];
  return 0.5 * (xa * yb - xb * ya);
};
/** @ignore */
Clipper._ptEq = function(a, b) {
  return a[0] === b[0] && a[1] === b[1];
};
// Compare two sweep events
// Return true means that e1 is placed at the event queue after e2, i.e,, e1 is processed by the algorithm after e2
Clipper.sweepEventComp = function(e1, e2) {
  if(e1.p[0] > e2.p[0]) // Different X coordinate
    return true;
  if(e2.p[0] > e1.p[0]) // Different X coordinate
    return false;
  if(!Clipper._ptEq(e1.p, e2.p)) // Different points, but same X coordinate. The event with lower Y coordinate is processed first
    return e1.p[1] > e2.p[1];
  if(e1.left !== e2.left) // Same point, but one is a left endpoint and the other a right endpoint. The right endpoint is processed first
    return e1.left;
    // Same point, both events are left endPoints or both are right endPoints. The event associate to the bottom segment is processed first
  return e1.above(e2.other.p);
};
/** @ignore */
Clipper.sweepEventCompNum = function(e1, e2) {
  if(e1 === e2)return 0;
  return Clipper.sweepEventComp(e1, e2) ? -1 : 1;
};
// e1 and a2 are the left events of line segments(e1.p, e1.other.p) and(e2.p, e2.other.p)
Clipper.segmentComp = function(e1, e2) {
  if(e1 === e2)
    return false;
  if(Clipper.signedArea(e1.p, e1.other.p, e2.p) !== 0 || Clipper.signedArea(e1.p, e1.other.p, e2.other.p) !== 0) {
    // Segments are not collinear
    // if they share their left endpoint use the right endpoint to sort
    if(Clipper._ptEq(e1.p, e2.p))
      return e1.below(e2.other.p);

    // Different points
    if(Clipper.sweepEventComp(e1, e2)) // has the line segment associated to e1 been inserted into S after the line segment associated to e2 ?
      return e2.above(e1.p);
      // The line segment associated to e2 has been inserted into S after the line segment associated to e1
    return e1.below(e2.p);
  }
  // Segments are collinear. Just a consistent criterion is used
  if(Clipper._ptEq(e1.p, e2.p)) {
    // console.log("collinear segments")
    return e1.id < e2.id;
  }
  return Clipper.sweepEventComp(e1, e2);
};
/** @ignore */
Clipper.segmentCompNum = function(e1, e2) {
  if(e1 === e2)return 0;
  return Clipper.segmentComp(e1, e2) ? -1 : 1;
};
/** @ignore */
Clipper.prototype.storeSweepEvent = function(e) {
  e.id = this.eventHolder.length;
  this.eventHolder.push(e);
  return e;
};
/*
  Clipper._print = function(e) {
    if(!e)return "null";
    var namesEventTypes = [
      " (NORMAL) ", " (NON_CONTRIBUTING) ", " (SAME_TRANSITION) ", " (DIFFERENT_TRANSITION) "];
    return "Point: (" + e.p + ") Other point: (" + e.other.p + ")" + (e.left ? " (Left) " : " (Right) ") +
         (e.inside ? " (Inside) " : " (Outside) ") +  (e.inOut ? " (In-Out) " : " (Out-In) ") + "Type: " +
         namesEventTypes[e.type] + " Polygon: " + (e.pl === SUBJECT ? " (SUBJECT)" : " (CLIPPING)");
  };*/
/** @ignore */
Clipper.prototype.compute = function(op) {
  // Test 1 for trivial result case
  if(this.subject.ncontours() * this.clipping.ncontours() === 0) {
    // At least one of the polygons is empty
    if(op === DIFFERENCE)
      return this.subject;
    if(op === UNION)
      return this.subject.ncontours() === 0 ? this.clipping : this.subject;
    return new Polygon(null, null);
  }
  let i;
  let j;
  let result = new Polygon(null, null);
  // Test 2 for trivial result case
  const subjBounds = this.subject.getBounds();
  const clipBounds = this.clipping.getBounds();
  const minsubj = [subjBounds[0], subjBounds[1]];
  const maxsubj = [subjBounds[2], subjBounds[3]];
  const minclip = [clipBounds[0], clipBounds[1]];
  const maxclip = [clipBounds[2], clipBounds[3]];
  if(minsubj[0] > maxclip[0] || minclip[0] > maxsubj[0] ||
     minsubj[1] > maxclip[1] || minclip[1] > maxsubj[1]) {
    // the bounding boxes do not overlap
    if(op === DIFFERENCE)
      return this.subject;
    if(op === UNION) {
      result = this.subject;
      for(i = 0; i < this.clipping.ncontours(); i++)
        result.push(this.clipping.contour(i));
    }
    return result;
  }
  // Boolean operation is not trivial
  // Insert all the endPoints associated to the line segments into the event queue
  for(i = 0; i < this.subject.ncontours(); i++)
    for(j = 0; j < this.subject.contour(i).nvertices(); j++)
      this.processSegment(this.subject.contour(i).segment(j), SUBJECT);
  for(i = 0; i < this.clipping.ncontours(); i++)
    for(j = 0; j < this.clipping.contour(i).nvertices(); j++)
      this.processSegment(this.clipping.contour(i).segment(j), CLIPPING);
  const S = new RedBlackTree(Clipper.segmentCompNum);
  let it;
  let sli;
  let prev;
  let next;
  const connector = new Connector(); // to connect the edge solutions
  let e;
  const minMaxx = Math.min(maxsubj[0], maxclip[0]); // for optimization 1
  while(this.eq.size() > 0) {
    e = this.eq.pop();
    // console.log("Process event:  "+e.toString())
    // optimization 1
    if(op === INTERSECTION && e.p[0] > minMaxx ||
       op === DIFFERENCE && e.p[0] > maxsubj[0]) {
      return connector.toPolygon();
    }
    if(op === UNION && e.p[0] > minMaxx) {
      // add all the non-processed line segments to the result
      if(!e.left)
        connector.add(e.segment());
      while(this.eq.size() > 0) {
        e = this.eq.pop();
        if(!e.left)
          connector.add(e.segment());
      }
      return connector.toPolygon();
    }
    // end of optimization 1

    if(e.left) { // the line segment must be inserted into S
      it = S.insert(e);
      e.poss = it;
      if(!it)throw new Error();
      next = prev = it;
      if(next && !next.data)throw new Error();
      if(prev !== S.first())
        prev = prev.prev();
      else
        prev = null;
        // Compute the inside and inOut flags
      if(typeof prev === "undefined" || prev === null) { // there is not a previous line segment in S?
        // console.log("prev is end")
        e.inside = e.inOut = false;
      } else if(prev.data.type !== NORMAL) {
        if(prev === S.first()) { // e overlaps with prev
          e.inside = true; // it is not relevant to set true or false
          e.inOut = false;
        } else { // the previous two line segments in S are overlapping line segments
          sli = prev;
          sli = sli.prev();
          if(prev.data.pl === e.pl) {
            e.inOut = !prev.data.inOut;
            e.inside = !sli.data.inOut;
          } else {
            e.inOut = !sli.data.inOut;
            e.inside = !prev.data.inOut;
          }
        }
      } else if(e.pl === prev.data.pl) { // previous line segment in S belongs to the same polygon that "e" belongs to
        e.inside = prev.data.inside;
        e.inOut = !prev.data.inOut;
      } else {                          // previous line segment in S belongs to a different polygon that "e" belongs to
        e.inside = !prev.data.inOut;
        e.inOut = prev.data.inside;
      }
      /*
      console.log("Status line after insertion:")
      var bgn=S.first()
      while(bgn) {
       console.log(" "+bgn.data.toString())
       bgn=bgn.next()
      }*/
      // Process a possible intersection between "e" and its next neighbor in S
      next = next.next();
      if(typeof next !== "undefined" && next !== null)
        this.possibleIntersection(e, next.data);

      // Process a possible intersection between "e" and its previous neighbor in S
      if(typeof prev !== "undefined" && prev !== null)
        this.possibleIntersection(prev.data, e);
    } else { // the line segment must be removed from S
      // console.log([e.other.p,e.other.id])
      next = prev = sli = e.other.poss;
      // Get the next and previous line segments to "e" in S
      next = next.next();
      if(prev !== S.first())
        prev = prev.prev();
      else
        prev = null;
        // Check if the line segment belongs to the Boolean operation
      switch(e.type) {
      default:throw new Error();
      case NORMAL:
        switch(op) {
        default:throw new Error();
        case INTERSECTION:
          if(e.other.inside)
            connector.add(e.segment());
          break;
        case UNION:
          if(!e.other.inside)
            connector.add(e.segment());
          break;
        case DIFFERENCE:
          if(e.pl === SUBJECT && !e.other.inside ||
                e.pl === CLIPPING && e.other.inside)
            connector.add(e.segment());
          break;
        case XOR:
          connector.add(e.segment());
          break;
        }
        break;
      case SAME_TRANSITION:
        if(op === INTERSECTION || op === UNION)
          connector.add(e.segment());
        break;
      case DIFFERENT_TRANSITION:
        if(op === DIFFERENCE)
          connector.add(e.segment());
        break;
      }
      // delete line segment associated to e from S and check for intersection between the neighbors of "e" in S
      S.erase(sli.data);
      if(typeof next !== "undefined" && next !== null && (typeof prev !== "undefined" && prev !== null)) {
        this.possibleIntersection(prev.data, next.data);
      }
    }
    /*
    console.log("Status line after processing intersections:")
      var bgn=S.first()
      while(bgn) {
       console.log(" "+bgn.data.toString())
       bgn=bgn.next()
      }
      console.log(" ")*/
  }
  return connector.toPolygon();
};
/** @ignore */
Clipper.prototype.processSegment = function(s, pl) {
  if(Clipper._ptEq(s[0], s[1])) // if the two edge endPoints are equal the segment is discarded
    return;                 // in the future this can be done as preprocessing to avoid "polygons" with less than 3 edges
  const e1 = this.storeSweepEvent(new Clipper.SweepEvent(s[0], true, pl, null, NORMAL));
  const e2 = this.storeSweepEvent(new Clipper.SweepEvent(s[1], true, pl, e1, NORMAL));
  e1.other = e2;
  if(e1.p[0] < e2.p[0]) {
    e2.left = false;
  } else if(e1.p[0] > e2.p[0]) {
    e1.left = false;
  } else if(e1.p[1] < e2.p[1]) { // the line segment is vertical. The bottom endpoint is the left endpoint
    e2.left = false;
  } else {
    e1.left = false;
  }
  this.eq.push(e1);
  this.eq.push(e2);
};
/** @ignore */
Clipper.findIntersection = function(a, b, e, f) {
  const ret = Clipper._findIntersectionInternal(a[0][0], a[0][1], a[1][0], a[1][1],
    b[0][0], b[0][1], b[1][0], b[1][1]);
  if(ret.length > 0) {
    e[0] = ret[0][0];
    e[1] = ret[0][1];
  }
  if(ret.length > 1) {
    f[0] = ret[1][0];
    f[1] = ret[1][1];
  }
  return ret.length;
};
/** @ignore */
Clipper._findIntersectionInternal = function(a1x, a1y, a2x, a2y, b1x, b1y, b2x, b2y) {
  const t2 = a2x - a1x;
  const t3 = a2y - a1y;
  const t4 = b2x - b1x;
  const t5 = b2y - b1y;
  const t6 = t2 * t2 + t3 * t3;
  const t7 = t4 * t4 + t5 * t5;
  const ret = [];
  let smin;
  let smax;
  if (t6 === 0.0) {
    if (t7 === 0.0) {
      if (a1x === b1x && a1y === b1y) {
        ret.push([a1x, a1y]);
      }
    } else {
      const t9 = ((a1x - b1x) * t4 + (a1y - b1y) * t5) / t7;
      if (t9 >= 0.0 && t9 <= 1.0) {
        const t10 = [b1x + t4 * t9, b1y + t5 * t9];
        const t11 = a1x - t10[0];
        const t12 = a1y - t10[1];
        const t13 = Math.sqrt(t11 * t11 + t12 * t12);
        if (t13 <= 1e-09) {
          ret.push([a1x, a1y]);
        }
      }
    }
    return ret;
  } else if (t7 === 0.0) {
    const t15 = ((b1x - a1x) * t2 + (b1y - a1y) * t3) / t6;
    if (t15 >= 0.0 && t15 <= 1.0) {
      const t16 = [a1x + t2 * t15, a1y + t3 * t15];
      const t17 = b1x - t16[0];
      const t18 = b1y - t16[1];
      const t19 = Math.sqrt(t17 * t17 + t18 * t18);
      if (t19 <= 1e-09) {
        ret.push([b1x, b1y]);
      }
    }
    return ret;
  }
  const t21 = t2 * t5 - t4 * t3;
  const t22 = b1x - a1x;
  const t23 = b1y - a1y;
  const t24 = t22 * t5 - t4 * t23;
  const dpdeltad0 = t22 * t3 - t2 * t23;
  if (t21 === 0.0) {
    if (t24 === 0.0 && dpdeltad0 === 0) {
      const s1 = (t2 * (b1x - a1x) + t3 * (b1y - a1y)) / (t2 * t2 + t3 * t3);
      const s2 = (t2 * (b2x - a1x) + t3 * (b2y - a1y)) / (t2 * t2 + t3 * t3);
      if(s1 <= 0 && s2 >= 1 || s1 >= 1 && s2 <= 0) {
        // first line contains second line
        return [[a1x, a1y], [a2x, a2y]];
      } else if(s1 < 0 && s2 < 0 || s1 > 1 && s2 > 1) {
        // lines don't overlap
        return [];
      } else if(s1 <= 0 && s2 <= 0) {
        // meets at the first point of first line
        return [[a1x, a1y]];
      } else if(s1 >= 1 && s2 >= 1) {
        // meets at the second point of first line
        return [[a2x, a2y]];
      } else if(s1 < 0 || s2 < 0) {
        smax = Math.max(s1, s2);
        return [[a1x, a1y], [
          a1x + t2 * smax, a1y + t3 * smax
        ]];
      } else if(s1 > 1 || s2 > 1) {
        smin = Math.min(s1, s2);
        return [[
          a1x + t2 * smin, a1y + t3 * smin
        ], [a2x, a2y]];
      } else {
        smin = Math.min(s1, s2);
        smax = Math.max(s1, s2);
        return [[
          a1x + t2 * smin, a1y + t3 * smin
        ], [
          a1x + t2 * smax, a1y + t3 * smax
        ]];
      }
    } else {
      // console.log("parallel")
    }
  } else {
    const t29 = t24 / t21;
    const t30 = dpdeltad0 / t21;
    if (t29 >= 0.0 && t29 <= 1.0 && t30 >= 0.0 && t30 <= 1.0) {
      const t31 = [a1x + t2 * t29, a1y + t3 * t29];
      ret.push(t31);
    }
  }
  return ret;
};

/** @ignore */
Clipper.prototype.possibleIntersection = function(e1, e2) {
  // if((e1.pl == e2.pl) ) // you can uncomment these two lines if(self-intersecting polygons are not allowed
  // return false;

  const ip1 = [];
  const ip2 = []; // intersection points
  let nintersections;
  // console.log(JSON.stringify(["possibleIntersections",e1.segment(), e2.segment()]))
  if(!(nintersections = Clipper.findIntersection(e1.segment(), e2.segment(), ip1, ip2)))
    return;
    // console.log([ip1,ip2])
  if(nintersections === 1 && (Clipper._ptEq(e1.p, e2.p) || Clipper._ptEq(e1.other.p, e2.other.p)))
    return; // the line segments intersect at an endpoint of both line segments

  if(nintersections === 2 && e1.pl === e2.pl)
    return; // the line segments overlap, but they belong to the same polygon

  // The line segments associated to e1 and e2 intersect
  // nint += nintersections;

  if(nintersections === 1) {
    if(!Clipper._ptEq(e1.p, ip1) && !Clipper._ptEq(e1.other.p, ip1))  // if(ip1 is not an endpoint of the line segment associated to e1 then divide "e1"
      this._divideSegment(e1, ip1);
    if(!Clipper._ptEq(e2.p, ip1) && !Clipper._ptEq(e2.other.p, ip1))  // if(ip1 is not an endpoint of the line segment associated to e2 then divide "e2"
      this._divideSegment(e2, ip1);
    return;
  }

  // The line segments overlap
  const sortedEvents = [];
  if(Clipper._ptEq(e1.p, e2.p)) {
    sortedEvents.push(null);
  } else if(Clipper.sweepEventComp(e1, e2)) {
    sortedEvents.push(e2);
    sortedEvents.push(e1);
  } else {
    sortedEvents.push(e1);
    sortedEvents.push(e2);
  }
  if(Clipper._ptEq(e1.other.p, e2.other.p)) {
    sortedEvents.push(null);
  } else if(Clipper.sweepEventComp(e1.other, e2.other)) {
    sortedEvents.push(e2.other);
    sortedEvents.push(e1.other);
  } else {
    sortedEvents.push(e1.other);
    sortedEvents.push(e2.other);
  }

  if(sortedEvents.length === 2) { // are both line segments equal?
    e1.type = e1.other.type = NON_CONTRIBUTING;
    e2.type = e2.other.type = e1.inOut === e2.inOut ? SAME_TRANSITION : DIFFERENT_TRANSITION;
    return;
  }
  if(sortedEvents.length === 3) { // the line segments share an endpoint
    sortedEvents[1].type = sortedEvents[1].other.type = NON_CONTRIBUTING;
    if(sortedEvents[0]) // is the right endpoint the shared point?
      sortedEvents[0].other.type = e1.inOut === e2.inOut ? SAME_TRANSITION : DIFFERENT_TRANSITION;
    else // the shared point is the left endpoint
      sortedEvents[2].other.type = e1.inOut === e2.inOut ? SAME_TRANSITION : DIFFERENT_TRANSITION;
    this._divideSegment(sortedEvents[0] ? sortedEvents[0] : sortedEvents[2].other, sortedEvents[1].p);
    return;
  }
  if(sortedEvents[0] !== sortedEvents[3].other) { // no line segment includes totally the other one
    sortedEvents[1].type = NON_CONTRIBUTING;
    sortedEvents[2].type = e1.inOut === e2.inOut ? SAME_TRANSITION : DIFFERENT_TRANSITION;
    this._divideSegment(sortedEvents[0], sortedEvents[1].p);
    this._divideSegment(sortedEvents[1], sortedEvents[2].p);
    return;
  }
  // one line segment includes the other one
  sortedEvents[1].type = sortedEvents[1].other.type = NON_CONTRIBUTING;
  this._divideSegment(sortedEvents[0], sortedEvents[1].p);
  sortedEvents[3].other.type = e1.inOut === e2.inOut ? SAME_TRANSITION : DIFFERENT_TRANSITION;
  this._divideSegment(sortedEvents[3].other, sortedEvents[2].p);
};
/** @ignore */
Clipper.prototype._divideSegment = function(e, p) {
  // "Right event" of the "left line segment" resulting from dividing e(the line segment associated to e)
  const r = this.storeSweepEvent(new Clipper.SweepEvent(p, false, e.pl, e, e.type));
  // "Left event" of the "right line segment" resulting from dividing e(the line segment associated to e)
  const l = this.storeSweepEvent(new Clipper.SweepEvent(p, true, e.pl, e.other, e.other.type));
  if(Clipper.sweepEventComp(l, e.other)) { // avoid a rounding error. The left event would be processed after the right event
    // console.log("Oops")
    e.other.left = true;
    l.left = false;
  }
  // avoid a rounding error. The left event would be processed after the right event
  Clipper.sweepEventComp(e, r);
  e.other.other = l;
  e.other = r;
  this.eq.push(l);
  this.eq.push(r);
};

/**
 * Computes the combination of this path's shape with another
 * path's shape. The following points apply to this method:<ul>
 * <li>This method treats unclosed subpaths as implicitly closed
 * by connecting their end points with their start points.
 * <li>Currently, the algorithm supports only polygons made up
 * of line segments, so curves and arcs are converted to line
 * segments before applying the operation.
 * <li>Each polygon can be concave or have self-intersections
 * or holes. Subpaths that are holes have the opposite winding
 * order (clockwise or counterclockwise) from the subpath
 * that contains them.
 * </ul>
 * @param {GraphicsPath} path A path to combine with this one.
 * @param {number} [flatness] When curves and arcs
 * are decomposed to line segments, the
 * segments will be close to the true path of the curve by this
 * value, given in units. If null, undefined, or omitted, default is 1.
 * @returns {GraphicsPath} The union of the two paths.
 */
GraphicsPath.prototype.union = function(path, flatness) {
  if(typeof path === "undefined" || path === null)return this;
  const polygon1 = new Polygon(this, flatness);
  const polygon2 = new Polygon(path, flatness);
  const retval = new Clipper(polygon1, polygon2).compute(UNION);
  return retval.toPath();
};
/**
 * Computes the difference between this path's shape and another
 * path's shape. The points given in the {@link GraphicsPath#union} method
 * apply to this method.
 * @param {GraphicsPath} path A path to combine with this one.
 * @param {number} [flatness] When curves and arcs
 * are decomposed to line segments, the
 * segments will be close to the true path of the curve by this
 * value, given in units. If null, undefined, or omitted, default is 1.
 * @returns {GraphicsPath} The difference between this path
 * and the other path.
 */
GraphicsPath.prototype.difference = function(path, flatness) {
  if(typeof path === "undefined" || path === null)return this;
  const polygon1 = new Polygon(this, flatness);
  const polygon2 = new Polygon(path, flatness);
  const retval = new Clipper(polygon1, polygon2).compute(DIFFERENCE);
  return retval.toPath();
};
/**
 * Computes the intersection, or the area common to both this path's shape
 * and another path's shape. The points given in the {@link GraphicsPath#union} method
 * apply to this method.
 * @param {GraphicsPath} path A path to combine with this one.
 * @param {number} [flatness] When curves and arcs
 * are decomposed to line segments, the
 * segments will be close to the true path of the curve by this
 * value, given in units. If null, undefined, or omitted, default is 1.
 * @returns {GraphicsPath} A path whose shape is contained in
 * both paths.
 */
GraphicsPath.prototype.intersection = function(path, flatness) {
  if(typeof path === "undefined" || path === null)return this;
  const polygon1 = new Polygon(this, flatness);
  const polygon2 = new Polygon(path, flatness);
  const retval = new Clipper(polygon1, polygon2).compute(INTERSECTION);
  return retval.toPath();
};
/**
 * Computes the shape contained in either this path or another path,
 * but not both. The points given in the {@link GraphicsPath#union} method
 * apply to this method.
 * @param {GraphicsPath} path A path to combine with this one.
 * @param {number} [flatness] When curves and arcs
 * are decomposed to line segments, the
 * segments will be close to the true path of the curve by this
 * value, given in units. If null, undefined, or omitted, default is 1.
 * @returns {GraphicsPath} A path whose shape is contained in
 * only one of the two paths.
 */
GraphicsPath.prototype.xor = function(path, flatness) {
  if(typeof path === "undefined" || path === null)return this;
  const polygon1 = new Polygon(this, flatness);
  const polygon2 = new Polygon(path, flatness);
  const retval = new Clipper(polygon1, polygon2).compute(XOR);
  return retval.toPath();
};

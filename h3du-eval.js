/*
 Any copyright to this file is released to the Public Domain.
 http://creativecommons.org/publicdomain/zero/1.0/
 If you like this, you should donate
 to Peter O. (original author of
 the Public Domain HTML 3D Library) at:
 http://peteroupc.github.io/
*/
/* global H3DU */

import {Curve} from "./h3du-curve";
import {Surface} from "./h3du-surface";

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
}
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
 */
SurfaceEval.prototype.vertex = function(evaluator) {
  this.vertexSurface = new Surface(evaluator);
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

// ///////////////////////

export {SurfaceEval};

/*
 Any copyright to this file is released to the Public Domain.
 http://creativecommons.org/publicdomain/zero/1.0/
 If you like this, you should donate
 to Peter O. (original author of
 the Public Domain HTML 3D Library) at:
 http://peteroupc.github.io/
*/
/* global H3DU */

import {CurveBuilder, SurfaceBuilder} from "./h3du-meshbuilder";

/**
 * An evaluator of curve evaluator objects for generating
 * vertex positions and colors of a curve.<p>
 * For more information, see the {@tutorial surfaces} tutorial.
 * @deprecated Use {@link H3DU.CurveBuilder} instead.
 * @constructor
 * @memberof H3DU
 */
export var CurveEval = function() {
  this.builder = new CurveBuilder();
};

/**
 * Specifies a curve evaluator object for generating the vertex positions of a parametric curve.
 * @param {H3DU.Curve|Object} evaluator An object described in {@link H3DU.Curve}. Can be null, in which case, disables generating vertex positions.
 * @returns {H3DU.CurveEval} This object.
 */
CurveEval.prototype.vertex = function(evaluator) {
  this.builder.position(evaluator);
  return this;
};
/**
 * Specifies a parametric curve function for generating normals.
 * @param {Object} evaluator An object that must contain a method
 * named <code>evaluate</code> that takes a single U coordinate and returns a 3-element array.
 * @returns {H3DU.CurveEval} This object.
 */
CurveEval.prototype.normal = function(evaluator) {
  this.builder.attribute(evaluator, H3DU.Semantic.NORMAL, 0);
  return this;
};
/**
 * Specifies a parametric curve function for generating color values.
 * @param {Object} evaluator An object that must contain a method
 * named <code>evaluate</code> that takes a single U coordinate and returns a 3-element array.
 * @returns {H3DU.CurveEval} This object.
 */
CurveEval.prototype.color = function(evaluator) {
  this.builder.attribute(evaluator, H3DU.Semantic.COLOR, 0);
  return this;
};
/**
 * Specifies a parametric curve function for generating texture coordinates.
 * @param {Object} evaluator An object that must contain a method
 * named <code>evaluate</code> that takes a single U coordinate and returns a 1- or 2-element array.
 * @returns {H3DU.CurveEval} This object.
 */
CurveEval.prototype.texCoord = function(evaluator) {
  this.builder.attribute(evaluator, H3DU.Semantic.TEXCOORD, 0, 2);
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
  this.builder.clearVertices().evalCurve(H3DU.Mesh.POINTS, 1, u, u);
  H3DU.Mesh._fromMeshBufferOne(this.builder.toMeshBuffer(), mesh);
  return this;
};

/**
 * Generates vertices and attribute values that follow a parametric curve
 * function.
 * @param {H3DU.Mesh} mesh A geometric mesh where the vertices will be
 * generated.
 * @param {number} [mode] If this value is {@link H3DU.Mesh.LINES}, or is null
 * or omitted, generates
 * a series of lines defining the curve. If this value is {@link H3DU.Mesh.POINTS},
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
  if(!mesh)throw new Error();
  var c = mesh.color.slice(0, 3);
  var nm = mesh.normal.slice(0, 3);
  var tc = mesh.texCoord.slice(0, 2);
  this.builder.clearVertices().evalCurve(mode, n, u1, u2);
  H3DU.Mesh._fromMeshBuffer(this.builder.toMeshBuffer(), mesh);
  mesh.color3(c).normal3(nm).texCoord2(tc);
  return this;
};
/**
 * An evaluator of parametric functions for generating
 * vertex attributes of a surface.<p>
 * See the {@tutorial surfaces} tutorial for more information.
 * @deprecated Use {@link H3DU.SurfaceBuilder} instead.
 * @constructor
 * @memberof H3DU
 */
function SurfaceEval() {
  this.builder = new SurfaceBuilder();
  this.pos = null;
  this.norm = null;
  this.autoNormal = false;
}
/**
 * Sets whether this object will automatically generate
 * normals rather than use the parametric evaluator
 * specified for normal generation, if any.
 * By default, normals won't be generated automatically.
 * @param {Boolean} value Either true or false. True means normals
 * will automatically be generated; false means they won't.
 * @returns {H3DU.SurfaceEval} This object.
 */
SurfaceEval.prototype.setAutoNormal = function(value) {
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
  this.pos = evaluator;
  return this;
};
/**
 * Specifies a parametric surface function for generating normals.
 * @param {Object} evaluator An object that must contain a method
 * named <code>evaluate</code> that takes a U coordinate and a V coordinate and returns a 3-element array.
 * @returns {H3DU.SurfaceEval} This object.
 */
SurfaceEval.prototype.normal = function(evaluator) {
  this.norm = evaluator;
  return this;
};
/**
 * Specifies a parametric surface function for generating color values.
 * @param {Object} evaluator An object that must contain a method
 * named <code>evaluate</code> that takes a U coordinate and a V coordinate and returns a 3-element array.
 * @returns {H3DU.SurfaceEval} This object.
 */
SurfaceEval.prototype.color = function(evaluator) {
  this.builder.attribute(evaluator, H3DU.Semantic.COLOR, 0, 3);
  return this;
};
/**
 * Specifies a parametric surface function for generating texture coordinates.
 * @param {Object} evaluator An object that must contain a method
 * named <code>evaluate</code> that takes a U coordinate and a V coordinate and returns a 2-element array.
 * @returns {H3DU.SurfaceEval} This object.
 */
SurfaceEval.prototype.texCoord = function(evaluator) {
  this.builder.attribute(evaluator, H3DU.Semantic.TEXCOORD, 0, 2);
  return this;
};
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
  this.builder.clearVertices().evalCurve(H3DU.Mesh.POINTS, 1, 1, u, u, v, v);
  H3DU.Mesh._fromMeshBufferOne(this.builder.toMeshBuffer(), mesh);
  return this;
};

/**
 * Generates the vertex positions and attributes of a parametric
 * surface.
 * @param {H3DU.Mesh} mesh The mesh where vertex positions and attributes
 * will be generated. When this method returns, the current color, normal,
 * and texture coordinates will be the same as they were before the method
 * started.
 * @param {number} [mode] If this value is {@link H3DU.Mesh.TRIANGLES}, or is null
 * or omitted, generates a series of triangles defining the surface. If
 * this value is {@link H3DU.Mesh.LINES}, generates
 * a series of lines defining the surface. If this value is {@link H3DU.Mesh.POINTS},
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
  if(!mesh)throw new Error();
  if(this.autoNormal) {
    this.builder.positionNormal(this.pos);
  } else {
    this.builder.position(this.pos).attribute(this.norm, H3DU.Semantic.NORMAL);
  }
  var c = mesh.color.slice(0, 3);
  var nm = mesh.normal.slice(0, 3);
  var tc = mesh.texCoord.slice(0, 2);
  this.builder.clearVertices().evalSurface(mode, un, vn, u1, u2, v1, v2);
  H3DU.Mesh._fromMeshBuffer(this.builder.toMeshBuffer(), mesh);
  mesh.color3(c).normal3(nm).texCoord2(tc);
  return this;
};

// ///////////////////////

export {SurfaceEval};

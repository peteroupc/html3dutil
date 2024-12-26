/*
 Any copyright to this file is released to the Public Domain.
 In case this is not possible, this file is also licensed under the Unlicense: https://unlicense.org/
*/

/* global Uint16Array, Uint32Array */

import {Curve} from "./h3du-curve.js";
import {MeshBuffer} from "./h3du-meshbuffer.js";
import {Semantic} from "./h3du-semantic.js";
import {Surface} from "./h3du-surface.js";
import {toGLColor} from "./h3du-misc.js";

/**
 * An evaluator of curve evaluator objects for generating
 * vertex attributes for a curve.<p>
 * For more information, see the {@tutorial surfaces} tutorial.
 * @constructor
 */
export const CurveBuilder = function() {
  this.attributes = [];
  this.vertexCount = 0;
  this.indices = [];
  this.mode = MeshBuffer.TRIANGLES;
};
/**
 * An evaluator of surface evaluator objects for generating
 * vertex attributes for a surface.<p>
 * For more information, see the {@tutorial surfaces} tutorial.
 * @constructor
 */
export const SurfaceBuilder = function() {
  this.attributes = [];
  this.vertexCount = 0;
  this.indices = [];
  this.mode = MeshBuffer.TRIANGLES;
};

// ------ Common internals

/** @ignore */
CurveBuilder._toMeshBuffer = function(three, attributes, indices, mode) {
  let i;
  const geom = three["BufferGeometry"]();
  const indexArray = new Uint32Array(indices);
  geom.index=new three["BufferAttribute"](new Uint32Array(indexArray),1)
  for (i = 0; i < attributes.length; i++) {
    const a = attributes[i];
    if(a[1]!==0)throw new Error();
    switch(a[0]){
      case "POSITION":
      case "position":
        var attr=new three["InterleavedBufferAttribute"](new Float32Array(a[3]),a[2],0)
        geom["setAttribute"]("position",attr)
        break;
      case "NORMAL":
      case "normal":
        var attr=new three["InterleavedBufferAttribute"](new Float32Array(a[3]),a[2],0)
        geom["setAttribute"]("normal",attr)
        break;
      case "TEXCOORD":
      case "uv":
        var attr=new three["InterleavedBufferAttribute"](new Float32Array(a[3]),a[2],0)
        geom["setAttribute"]("uv",attr)
        break;
      case "COLOR":
      case "color":
        var attr=new three["InterleavedBufferAttribute"](new Float32Array(a[3]),a[2],0)
        geom["setAttribute"]("color",attr)
        break;
      default:
        throw new Error("unsupported attr:"+a[0])
    }
  }
  // NOTE: Pass the return value to the <code>THREE.Mesh</code>,
  // <code>THREE.LineSegments</code>, or <code>THREE.Points</code> constructor to
  // generate the appropriate kind of shape object depending on the buffer geometry's
  // primitive type.
  return geom;
};
/** @ignore */
CurveBuilder._blank = function(count) {
  const ret = [];
  let i;
  for (i = 0; i < count; i++) {
    ret.push(0);
  }
  return ret;
};
/** @ignore */
CurveBuilder._resize = function(a, newsize) {
  if(a[2] !== newsize) {
    const oldcount = a[3].length / a[2];
    const minsize = Math.min(a[2], newsize);
    const arr = CurveBuilder._blank(oldcount * newsize);
    let oldindex = 0;
    let newindex = 0;
    let i;
    for (i = 0; i < oldcount; i++) {
      let j;
      for (j = 0; j < minsize; j++) {
        arr[newindex + j] = a[3][oldindex + j];
      }
      oldindex += a[2];
      newindex += newsize;
    }
    a[2] = newsize;
    a[3] = arr;
  }
};
/** @ignore */
CurveBuilder._addValue = function(a, value) {
  const mm = Math.min(value.length, a[2]);
  let i;
  for (i = 0; i < mm; i++) {
    a[3].push(value[i]);
  }
  for(i = mm; i < a[2]; i++) {
    a[3].push(0);
  }
};
/** @ignore */
CurveBuilder._defaultEndPointsCurve = function(attributes) {
  let i;
  for (i = 0; i < attributes.length; i++) {
    const a = attributes[i];
    if(a[0] === "position" && a[1] === 0) {
      const a4 = a[4];
      if(typeof a4.endPoints !== "undefined" && a4.endPoints !== null) {
        return a[4].endPoints();
      }
      break;
    }
  }
  return [0, 1];
};

/** @ignore */
CurveBuilder._defaultSubdivisionsCurve = function(attributes) {
  let i;
  for (i = 0; i < attributes.length; i++) {
    const a = attributes[i];
    if(a[0] === "position" && a[1] === 0) {
      const a4 = a[4];
      return Math.max(200, Math.ceil(new Curve(a4).getLength() / 4));
    }
  }
  return 24;
};
/** @ignore */
CurveBuilder._defaultEndPointsSurface = function(attributes) {
  let i;
  for (i = 0; i < attributes.length; i++) {
    const a = attributes[i];
    if(a[0] === "position" && a[1] === 0) {
      const a4 = a[4];
      if(typeof a4 !== "undefined" && a4 !== null && (typeof a4.endPoints !== "undefined" && a4.endPoints !== null)) {
        return a[4].endPoints();
      }
      break;
    }
  }
  return [0, 1, 0, 1];
};
/** @ignore */
CurveBuilder._toCurve = function(curve) {
  return typeof curve !== "undefined" && curve !== null &&
   !(curve instanceof Curve) ? new Curve(curve) : curve;
};
/** @ignore */
CurveBuilder._toSurface = function(surface) {
  return typeof surface !== "undefined" && surface !== null &&
   !(surface instanceof Surface) ? new Surface(surface) : surface;
};

/** @ignore */
CurveBuilder._setAttribute = function(
  attributes, vertexCount, curve, semantic, semanticIndex, size
) {
  const sizeValue = typeof size === "undefined" || size === null ? 3 : size;
  const semanticIndexValue = typeof semanticIndex === "undefined" || semanticIndex === null ?
    0 : semanticIndex;
  const iscurve = typeof curve !== "undefined" && curve !== null;
  if(size <= 0)throw new Error("Invalid attribute size");
  const sem = [semantic,
    semanticIndexValue||0];
  if(typeof sem === "undefined" || sem === null)throw new Error();
  let i;
  for (i = 0; i < attributes.length; i++) {
    const a = attributes[i];
    if(a[0] === sem[0] && a[1] === sem[1]) {
      if(iscurve) {
        a[4] = curve;
        CurveBuilder._resize(a, sizeValue);
        return;
      } else {
        // Remove the attribute
        attributes.splice(i, 1);
        return;
      }
    }
  }
  if(iscurve) {
    const newAttr = [sem[0], sem[1], sizeValue,
      CurveBuilder._blank(sizeValue * vertexCount), curve];
    attributes.push(newAttr);
  }
};
/**
 * @constructor
 * @ignore
 */
CurveBuilder._NormalSurface = function(surface) {
  this.surface = new Surface(surface);
  this.endPoints = function() {
    return this.surface.endPoints();
  };
  this.evaluate = function(u, v) {
    return this.surface.normal(u, v);
  };
};

// ------ End common internals

/**
 * Clears the arrays of attribute values (such as positions and normals)
 * and vertex indices generated so far. The attributes themselves will remain.
 * @returns {CurveBuilder} This object.
 */
CurveBuilder.prototype.clearVertices = function() {
  this.vertexCount = 0;
  this.indices = [];
  let i;
  for (i = 0; i < this.attributes.length; i++) {
    this.attributes[i][3] = [];
  }
  return this;
};
/**
 * Generates a mesh buffer containing the vertex attributes
 * generated so far. The mesh buffer's primitive type will equal the
 * last type passed to the "mode" parameter in the {@link CurveBuilder.curveEval} method.
 * @returns {MeshBuffer} The generated mesh buffer.
 */
CurveBuilder.prototype.toMeshBuffer = function(three) {
  return CurveBuilder._toMeshBuffer(three, this.attributes, this.indices, this.mode);
};
/**
 * Sets the parametric curve used to generate vertex positions.
 * @param {Object} curve A [curve evaluator object]{@link Curve} that
 * describes the parametric curve used to generate positions.
 * @param {number} [size] The number of elements in each position value. For
 * example, if the attribute is 3-dimensional, this parameter is 3. If null, undefined, or omitted, the default
 * is 3. Throws an error if this value is 0 or less.
 * @returns {CurveBuilder} This object.
 */
CurveBuilder.prototype.position = function(curve, size) {
  return this.attribute(curve, "position", 0, size);
};
/**
 * Sets the parametric curve used to generate vertex attribute values.
 * @param {Object} curve A [curve evaluator object]{@link Curve} that
 * describes the parametric curve used to generate attribute values.
 * u-coordinates for the given curve correspond to u-coordinates for
 * the curve used to generate vertex positions.
 * @param {number|string} semantic An attribute semantic, such
 * as "position" or "uv".
 * @param {number} [semanticIndex] The set index of the attribute
 * for the given semantic.
 * 0 is the first index of the attribute, 1 is the second, and so on.
 * This is ignored if "name" is a string. If null, undefined, or omitted, the default is 0.
 * @param {number} [size] The number of elements in each position value. For
 * example, if the attribute is 3-dimensional, this parameter is 3. If null, undefined, or omitted, the default
 * is 3. Throws an error if this value is 0 or less.
 * @returns {CurveBuilder} This object.
 */
CurveBuilder.prototype.attribute = function(curve, semantic, semanticIndex, size) {
  CurveBuilder._setAttribute(this.attributes, this.vertexCount,
    curve, semantic, semanticIndex, size);
  return this;
};

/**
 * Sets a value for an attribute semantic that will be the same for all
 * future vertices generated by the "evalCurve" method.
 * @param {Object|number} constantValue A constant value for the attribute semantic.
 * @param {number|string} semantic An attribute semantic, such
 * as {@link "position"}, "POSITION", or "TEXCOORD_0".
 * Throws an error if this value is a string and the string is invalid.
 * @param {number} [semanticIndex] The set index of the attribute
 * for the given semantic.
 * 0 is the first index of the attribute, 1 is the second, and so on.
 * This is ignored if "name" is a string. If null, undefined, or omitted, the default is 0.
 * @returns {CurveBuilder} This object.
 * @example <caption>This example sets the color to use for future
 * vertices to be generated for the curve.</caption>
 * // Set color to red
 * curve.constantAttribute([1,0,0],"COLOR");
 */
CurveBuilder.prototype.constantAttribute = function(
  constantValue, semantic, semanticIndex) {
  if(typeof constantValue === "number") {
    return this.attribute({
      "evaluate":function() {
        return [constantValue];
      }
    },
    semantic, semanticIndex, 1 );
  } else {
    return this.attribute({
      "evaluate":function() {
        return constantValue;
      }
    },
    semantic, semanticIndex, constantValue.length );
  }
};

/**
 * Sets a value for a color attribute that will be the same for all
 * future vertices generated by the "evalCurve" method.
 * @param {Array<number>|number|string} color A [color vector or string]{@link toGLColor}
 * identifying the constant color value. The alpha channel of the resulting color will be ignored.
 * @param {number} [semanticIndex] The set index of the attribute
 * for the given semantic.
 * 0 is the first index of the attribute, 1 is the second, and so on. If null, undefined, or omitted, the default is 0.
 * @returns {CurveBuilder} This object.
 * @example <caption>This example sets the color to use for future
 * vertices to be generated for the curve.</caption>
 * // Set color to red
 * curve.constantColor("red");
 */
CurveBuilder.prototype.constantColor = function(color, semanticIndex) {
  const c = toGLColor(color);
  return this.constantAttribute([c[0], c[1], c[2]],
    "color", semanticIndex);
};
/**
 * Convenience method for creating a mesh buffer from a parametric
 * curve. The mesh buffer will contain positions and vertex normals that
 * cover the given surface.
 * @param {Object} curve A [curve evaluator object]{@link Curve} that
 * describes the parametric curve used to generate positions.
 * @param {number} [mode] If this value is {@link MeshBuffer.LINES}, or is null, undefined, or omitted, generates
 * a series of lines defining the curve. If this value is {@link MeshBuffer.POINTS},
 * generates a series of points along the curve. For any other value,
 * this method has no effect.
 * @param {number} [n] Number of subdivisions of the curve to be drawn.
 * If null or undefined, a default is determined automatically based on the position curve's arc length, or the distance taken by its path (or the default is 24 if no position curve was defined). If 0, this method has no effect. Throws an error if this value is less than 0.
 * @param {number} [u1] Starting point of the curve.
 * Default is the starting coordinate given by the [curve evaluator object]{@link Curve}, or 0 if not given.
 * @param {number} [u2] Ending point of the curve.
 * Default is the ending coordinate given by the [curve evaluator object]{@link Curve}, or 1 if not given.
 * @returns {MeshBuffer} The generated mesh buffer.
 */
CurveBuilder.curveToBuffer = function(three, curve, mode, n, u1, u2) {
  return new CurveBuilder()
    .position(curve, 3)
    .evalCurve(mode, n, u1, u2).toMeshBuffer(three);
};
/**
 * Clears the arrays of attribute values (such as positions and normals)
 * and vertex indices generated so far. The attributes themselves will remain.
 * @returns {SurfaceBuilder} This object.
 */
SurfaceBuilder.prototype.clearVertices = function() {
  this.vertexCount = 0;
  this.indices = [];
  let i;
  for (i = 0; i < this.attributes.length; i++) {
    this.attributes[i][3] = [];
  }
  return this;
};
/**
 * Generates a mesh buffer containing the vertex attributes
 * generated so far. The mesh buffer's primitive type will equal the
 * last type passed to the "mode" parameter in the {@link SurfaceBuilder.surfaceEval} method.
 * @returns {MeshBuffer} The generated mesh buffer.
 */
SurfaceBuilder.prototype.toMeshBuffer = function(three) {
  return CurveBuilder._toMeshBuffer(three, this.attributes, this.indices, this.mode);
};
/**
 * Sets the parametric surface used to generate vertex positions.
 * @param {Object} surface A [surface evaluator object]{@link Surface} that
 * describes the parametric surface
 * used to generate position values.
 * @param {number} [size] The number of elements in each position value. For
 * example, if the attribute is 3-dimensional, this parameter is 3. If null, undefined, or omitted, the default
 * is 3. Throws an error if this value is 0 or less.
 * @returns {SurfaceBuilder} This object.
 */
SurfaceBuilder.prototype.position = function(surface, size) {
  return this.attribute(surface, "position", 0, size);
};
/**
 * Sets the parametric surface used to generate texture coordinates.
 * @param {Object} surface A [surface evaluator object]{@link Surface} that
 * describes the parametric surface
 * used to generate texture coordinates.
 * u- and v-coordinates for the given surface correspond to U and V
 * coordinates, respectively, for
 * the surface used to generate vertex positions.
 * @param {number} [size] The number of elements in each value of the attribute. For
 * example, if the attribute is 3-dimensional, this parameter is 3. If null, undefined, or omitted, the default
 * is 2.
 * @returns {SurfaceBuilder} This object.
 */
SurfaceBuilder.prototype.texCoord = function(surface, size) {
  return this.attribute(surface, "uv", 0, typeof size === "undefined" || size === null ? 2 : size);
};
/**
 * Sets the parametric surface used to generate vertex positions and normals.
 * @param {Object} surface A [surface evaluator object]{@link Surface} that
 * describes the parametric surface
 * used to generate positions.
 * @param {number} [size] The number of elements in each position and normal. For
 * example, if the attribute is 3-dimensional, this parameter is 3. If null, undefined, or omitted, the default
 * is 3. Throws an error if this value is 0 or less.
 * @returns {SurfaceBuilder} This object.
 */
SurfaceBuilder.prototype.positionNormal = function(surface, size) {
  const norm = typeof surface !== "undefined" && surface !== null ? new CurveBuilder._NormalSurface(surface) : null;
  return this.attribute(surface, "position", 0, size)
    .attribute(norm, "normal", 0, size);
};
/**
 * @constructor
 * @ignore */
SurfaceBuilder._TexCoord = function(s) {
  const ep = new Surface(s).endPoints();
  this.u1 = ep[0];
  this.v1 = ep[2];
  this.uinv = ep[0] === ep[1] ? 0 : 1 / (ep[1] - ep[0]);
  this.vinv = ep[2] === ep[3] ? 0 : 1 / (ep[3] - ep[2]);
  this.evaluate = function(u, v) {
    return [(u - this.u1) * this.uinv, (v - this.v1) * this.vinv];
  };
};
/**
 * Sets the parametric surface used to generate vertex positions, and
 * sets a surface evaluator that generates texture coordinates in the interval [0, 1] along the u- and v-axes of the surface.
 * @param {Object|null} surface A [surface evaluator object]{@link Surface} that
 * describes the parametric surface
 * used to generate positions.
 * U and V texture coordinates, which will each be in the interval [0, 1] by this method,
 * correspond to u- and v-coordinates, respectively, for
 * the given surface.
 * @param {number} [size] The number of elements in each position. For
 * example, if the attribute is 3-dimensional, this parameter is 3. If null, undefined, or omitted, the default
 * is 3. The texture coordinates will be 2-dimensional. Throws an error if this value is 0 or less.
 * @returns {SurfaceBuilder} This object.
 */
SurfaceBuilder.prototype.positionTexCoord = function(surface, size) {
  const tc = typeof surface !== "undefined" && surface !== null ? new SurfaceBuilder._TexCoord(surface) : null;
  return this.attribute(surface, "position", 0, size)
    .attribute(tc, "uv", 0, 2);
};

/**
 * Sets the parametric surface used to generate vertex positions and normals, and
 * sets a surface evaluator that generates texture coordinates in the interval [0, 1] along the u- and v-axes of the surface.
 * @param {Object|null} surface A [surface evaluator object]{@link Surface} that
 * describes the parametric surface
 * used to generate positions.
 * U and V texture coordinates, which will each be in the interval [0, 1] by this method,
 * correspond to u- and v-coordinates, respectively, for
 * the given surface.
 * @param {number} [size] The number of elements in each position and normal. For
 * example, if the attribute is 3-dimensional, this parameter is 3. If null, undefined, or omitted, the default
 * is 3. The texture coordinates will be 2-dimensional.
 * @returns {SurfaceBuilder} This object.
 */
SurfaceBuilder.prototype.positionNormalTexCoord = function(surface, size) {
  const tc = typeof surface !== "undefined" && surface !== null ? new SurfaceBuilder._TexCoord(surface) : null;
  return this.positionNormal(surface, size)
    .attribute(tc, "uv", 0, 2);
};

/**
 * Sets the parametric surface used to generate vertex attribute values.
 * @param {Object} surface A [surface evaluator object]{@link Surface} that
 * describes the parametric surface
 * used to generate attribute values.
 * u- and v-coordinates for the given surface correspond to U and V
 * coordinates, respectively, for
 * the surface used to generate vertex positions.
 * @param {number|string} semantic An attribute semantic, such
 * as "position" or "uv".
 * @param {number} [semanticIndex] The set index of the attribute
 * for the given semantic.
 * 0 is the first index of the attribute, 1 is the second, and so on.
 * This is ignored if "name" is a string. If null, undefined, or omitted, the default is 0.
 * @param {number} [size] The number of elements in each position and normal. For
 * example, if the attribute is 3-dimensional, this parameter is 3. If null, undefined, or omitted, the default
 * is 3. Throws an error if this value is 0 or less.
 * @returns {SurfaceBuilder} This object.
 * @example <caption>The following example sets the surface
 * function for texture coordinates to a linear evaluator. Thus, coordinates passed to the
 * evalSurface method will be interpolated as direct
 * texture coordinates.</caption>
 * surface.attribute({"evaluate":function(u,v) {
 * "use strict"; return [u,v] }},"uv");
 */
SurfaceBuilder.prototype.attribute = function(surface, semantic, semanticIndex, size) {
  CurveBuilder._setAttribute(this.attributes, this.vertexCount,
    surface, semantic, semanticIndex, size);
  return this;
};

/**
 * Sets a value for an attribute semantic that will be the same for all
 * future vertices generated by the "evalSurface" method.
 * @param {Object|number} constantValue A constant value for the attribute semantic.
 * @param {number|string} semantic An attribute semantic, such
 * as {@link "position"}, "POSITION", or "TEXCOORD_0".
 * Throws an error if this value is a string and the string is invalid.
 * @param {number} [semanticIndex] The set index of the attribute
 * for the given semantic.
 * 0 is the first index of the attribute, 1 is the second, and so on.
 * This is ignored if "name" is a string. If null, undefined, or omitted, the default is 0.
 * @returns {SurfaceBuilder} This object.
 * @example <caption>This example sets the color to use for future
 * vertices to be generated for the surface.</caption>
 * // Set color to red
 * surface.constantAttribute([1,0,0],"COLOR");
 */
SurfaceBuilder.prototype.constantAttribute = function(constantValue, semantic, semanticIndex) {
  if(typeof constantValue === "number") {
    return this.attribute({
      "evaluate":function() {
        return [constantValue];
      }
    },
    semantic, semanticIndex, 1 );
  } else {
    return this.attribute({
      "evaluate":function() {
        return constantValue;
      }
    },
    semantic, semanticIndex, constantValue.length );
  }
};
/**
 * Sets a value for a color attribute that will be the same for all
 * future vertices generated by the "evalSurface" method.
 * @param {Array<number>|number|string} color A [color vector or string]{@link toGLColor}
 * identifying the constant color value. The alpha channel of the resulting color will be ignored.
 * @param {number} [semanticIndex] The set index of the attribute
 * for the given semantic.
 * 0 is the first index of the attribute, 1 is the second, and so on. If null, undefined, or omitted, the default is 0.
 * @returns {SurfaceBuilder} This object.
 * @example <caption>This example sets the color to use for future
 * vertices to be generated for the surface.</caption>
 * // Set color to red
 * surface.constantColor("red");
 */
SurfaceBuilder.prototype.constantColor = function(color, semanticIndex) {
  const c = toGLColor(color);
  return this.constantAttribute([c[0], c[1], c[2]],
    "color", semanticIndex);
};

/**
 * Convenience method for creating a mesh buffer from a parametric
 * surface. The mesh buffer will contain positions, vertex normals, and
 * texture coordinates that cover the given surface.
 * @param {Object} surface A [surface evaluator object]{@link Surface} that
 * describes the parametric surface
 * used to generate positions.
 * U and V texture coordinates, which will each be in the interval [0, 1] by this method,
 * correspond to u- and v-coordinates, respectively, for
 * the given surface.
 * @param {number} [mode] If this value is {@link MeshBuffer.TRIANGLES}, or is null, undefined, or omitted, generates a series of triangles defining the surface. If
 * this value is {@link MeshBuffer.LINES}, generates
 * a series of lines defining the surface. If this value is {@link MeshBuffer.POINTS},
 * generates a series of points along the surface. For any other value,
 * this method has no effect.
 * @param {number} [un] Number of subdivisions along the u-axis.
 * Default is 24.
 * @param {number} [vn] Number of subdivisions along the v-axis.
 * Default is 24.
 * @param {number} [u1] Starting u-coordinate of the surface to evaluate.
 * Default is the starting u-coordinate given by the [surface evaluator object]{@link Surface}, or 0 if not given.
 * @param {number} [u2] Ending u-coordinate of the surface to evaluate.
 * Default is the ending u-coordinate given by the [surface evaluator object]{@link Surface}, or 1 if not given.
 * @param {number} [v1] Starting v-coordinate of the surface to evaluate.
 * Default is the starting v-coordinate given by the [surface evaluator object]{@link Surface}, or 0 if not given.
 * @param {number} [v2] Ending v-coordinate of the surface to evaluate.
 * Default is the ending v-coordinate given by the [surface evaluator object]{@link Surface}, or 1 if not given.
 * @returns {MeshBuffer} The generated mesh buffer.
 */
SurfaceBuilder.surfaceToBuffer = function(three, surface, mode, un, vn, u1, u2, v1, v2) {
  return new SurfaceBuilder()
    .positionNormalTexCoord(surface, 3)
    .evalSurface(mode, un, vn, u1, u2, vn, v2).toMeshBuffer(three);
};
/**
 * Generates the vertex attributes of the parametric curves.
 * @param {number} [mode] If this value is {@link MeshBuffer.LINES}, or is null, undefined, or omitted, generates
 * a series of lines defining the curve. If this value is {@link MeshBuffer.POINTS},
 * generates a series of points along the curve. For any other value,
 * this method has no effect.
 * @param {number} [n] Number of subdivisions of the curve to be drawn.
 * If null or undefined, a default is determined automatically based on the position curve's arc length, or the distance taken by its path (or the default is 24 if no position curve was defined). If 0, this method has no effect. Throws an error if this value is less than 0.
 * @param {number} [u1] Starting point of the curve.
 * Default is the starting coordinate given by the [curve evaluator object]{@link Curve}, or 0 if not given.
 * @param {number} [u2] Ending point of the curve.
 * Default is the ending coordinate given by the [curve evaluator object]{@link Curve}, or 1 if not given.
 * @returns {CurveBuilder} This object.
 */
CurveBuilder.prototype.evalCurve = function(mode, n, u1, u2) {
  n = typeof n === "undefined" || n === null ?
    CurveBuilder._defaultSubdivisionsCurve(this.attributes) :
    Math.ceil(n);
  if(n === 0)return this;
  if(n < 0)throw new Error();
  if(typeof mode === "undefined" || mode === null)mode = MeshBuffer.LINES;
  if(typeof u1 === "undefined" || u1 === null ||
     (typeof u2 === "undefined" || u2 === null)) {
    const ep = CurveBuilder._defaultEndPointsCurve(this.attributes);
    u1 = ep[0];
    u2 = ep[1];
  }
  let i;
  const uv = (u2 - u1) / n;
  const firstIndex = this.vertexCount;
  if(mode === MeshBuffer.LINES || (typeof mode === "undefined" || mode === null)) {
    for(i = 0; i < n; i++) {
      this.indices.push(firstIndex + i, firstIndex + i + 1);
    }
    this.vertexCount += n + 1;
  } else if(mode === MeshBuffer.POINTS) {
    for(i = 0; i < n; i++) {
      this.indices.push(firstIndex + i);
    }
    this.vertexCount += n + 1;
  } else {
    return this;
  }
  this.mode = mode;
  for(i = 0; i <= n; i++) {
    const u = u1 + i * uv;
    let j;
    for (j = 0; j < this.attributes.length; j++) {
      const a = this.attributes[j];
      const value = typeof a[4] !== "undefined" && a[4] !== null ? a[4].evaluate(u) : [];
      CurveBuilder._addValue(a, value);
    }
  }
  return this;
};
/**
 * Generates the vertex attributes of the parametric surfaces.
 * @param {number} [mode] If this value is {@link MeshBuffer.TRIANGLES}, or is null, undefined, or omitted, generates a series of triangles defining the surface. If
 * this value is {@link MeshBuffer.LINES}, generates
 * a series of lines defining the surface. If this value is {@link MeshBuffer.POINTS},
 * generates a series of points along the surface. For any other value,
 * this method has no effect.
 * @param {number} [un] Number of subdivisions along the u-axis.
 * Default is 24. If 0, this method has no effect. Throws an error if this value is less than 0.
 * @param {number} [vn] Number of subdivisions along the v-axis.
 * Default is 24. If 0, this method has no effect. Throws an error if this value is less than 0.
 * @param {number} [u1] Starting u-coordinate of the surface to evaluate.
 * Default is the starting u-coordinate given by the [surface evaluator object]{@link Surface}, or 0 if not given.
 * @param {number} [u2] Ending u-coordinate of the surface to evaluate.
 * Default is the ending u-coordinate given by the [surface evaluator object]{@link Surface}, or 1 if not given.
 * @param {number} [v1] Starting v-coordinate of the surface to evaluate.
 * Default is the starting v-coordinate given by the [surface evaluator object]{@link Surface}, or 0 if not given.
 * @param {number} [v2] Ending v-coordinate of the surface to evaluate.
 * Default is the ending v-coordinate given by the [surface evaluator object]{@link Surface}, or 1 if not given.
 * @returns {SurfaceBuilder} This object.
 */
SurfaceBuilder.prototype.evalSurface = function(mode, un, vn, u1, u2, v1, v2) {
  un = typeof un === "undefined" || un === null ? 24 : Math.ceil(un);
  vn = typeof vn === "undefined" || vn === null ? 24 : Math.ceil(vn);
  if(un === 0 || vn === 0)return this;
  if(un <= 0)throw new Error();
  if(vn <= 0)throw new Error();
  if(typeof mode === "undefined" || mode === null)mode = MeshBuffer.TRIANGLES;
  if(typeof u1 === "undefined" || u1 === null || (typeof u2 === "undefined" || u2 === null) || (typeof v1 === "undefined" || v1 === null) || (typeof v2 === "undefined" || v2 === null)) {
    const ep = CurveBuilder._defaultEndPointsSurface(this.attributes);
    u1 = ep[0];
    u2 = ep[1];
    v1 = ep[2];
    v2 = ep[3];
  }
  if(mode !== MeshBuffer.TRIANGLES && mode !== MeshBuffer.LINES && mode !== MeshBuffer.POINTS) {
    return this;
  }
  let u;
  let v;
  let i;
  let j;
  const du = (u2 - u1) / un;
  const dv = (v2 - v1) / vn;
  const numVertices = (vn + 1) * (un + 1);
  const firstVertex = this.vertexCount;
  this.vertexCount += numVertices;
  for(i = 0; i <= vn; i++) {
    for(j = 0; j <= un; j++) {
      u = j * du + u1;
      v = i * dv + v1;
      let k;
      for (k = 0; k < this.attributes.length; k++) {
        const a = this.attributes[k];
        const value = typeof a[4] !== "undefined" && a[4] !== null ?
          a[4].evaluate(u, v) : [];
        CurveBuilder._addValue(a, value);
      }
    }
  }
  this.mode = mode;
  let unp1;
  let index1;
  let index2;
  if(mode === MeshBuffer.TRIANGLES) {
    unp1 = un + 1;
    let y;
    for (y = 0; y < vn; y++) {
      let x;
      for (x = 0; x < un; x++) {
        const index0 = y * unp1 + x + firstVertex;
        index1 = index0 + unp1;
        index2 = index0 + 1;
        const index3 = index1 + 1;
        this.indices.push(index0, index1, index2);
        this.indices.push(index2, index1, index3);
      }
    }
  } else if(mode === MeshBuffer.POINTS) {
    const lastVertex = this.vertexCount;
    for(i = firstVertex; i < lastVertex; i++) {
      this.indices.push(i);
    }
  } else if(mode === MeshBuffer.LINES) {
    unp1 = un + 1;
    for(i = 0; i <= un; i++) {
      for(j = 0; j <= vn; j++) {
        index1 = j * unp1 + i + firstVertex;
        if(j < vn) {
          index2 = index1 + unp1;
          this.indices.push(index1, index2);
        }
        if(i < un) {
          index2 = index1 + 1;
          this.indices.push(index2, index1);
        }
      }
    }
  }
  return this;
};

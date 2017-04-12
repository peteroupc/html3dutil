/* global Float32Array, Uint16Array, Uint32Array */
/*
 Any copyright to this file is released to the Public Domain.
 http://creativecommons.org/publicdomain/zero/1.0/
 If you like this, you should donate
 to Peter O. (original author of
 the Public Domain HTML 3D Library) at:
 http://peteroupc.github.io/
*/

import {BufferHelper} from "./h3du-bufferhelper.js";
import {Mesh} from "./h3du-mesh";
import {MeshBuffer} from "./h3du-meshbuffer";
import {Semantic} from "./h3du-semantic";
import {Surface} from "./h3du-surface";

/**
 * An evaluator of curve evaluator objects for generating
 * vertex attributes for a curve.<p>
 * For more information, see the {@tutorial surfaces} tutorial.
 * @constructor
 * @memberof H3DU
 */
export var CurveBuilder = function() {
  this.attributes = [];
  this.vertexCount = 0;
  this.indices = [];
  this.mode = Mesh.TRIANGLES;
};
/**
 * An evaluator of surface evaluator objects for generating
 * vertex attributes for a surface.<p>
 * For more information, see the {@tutorial surfaces} tutorial.
 * @constructor
 * @memberof H3DU
 */
export var SurfaceBuilder = function() {
  this.attributes = [];
  this.vertexCount = 0;
  this.indices = [];
  this.mode = Mesh.TRIANGLES;
};

// ------ Common internals

/** @ignore */
CurveBuilder._toMeshBuffer = function(attributes, indices, mode) {
  var maxIndex = 0;
  for(var i = indices.length - 1; i >= 0; i--) {
    maxIndex = Math.max(maxIndex, indices[i]);
    if(maxIndex >= 65536)break;
  }
  var mb = new MeshBuffer();
  var indexArray = maxIndex < 65536 ?
     new Uint16Array(indices) :
     new Uint32Array(indices);
  mb.setPrimitiveType(mode);
  mb.setIndices(indexArray);
  for(i = 0; i < attributes.length; i++) {
    var a = attributes[i];
    var buffer = new Float32Array(a[3]);
    mb.setAttribute(a[0], a[1], buffer, 0, a[2], a[2]);
  }
  return mb;
};
/** @ignore */
CurveBuilder._blank = function(count) {
  var ret = [];
  for(var i = 0; i < count; i++) {
    ret.push(0);
  }
  return ret;
};
/** @ignore */
CurveBuilder._resize = function(a, newsize) {
  if(a[2] !== newsize) {
    var oldcount = a[3].length / a[2];
    var minsize = Math.min(a[2], newsize);
    var arr = CurveBuilder._blank(oldcount * newsize);
    var oldindex = 0;
    var newindex = 0;
    for(var i = 0; i < oldcount; i++) {
      for(var j = 0; j < minsize; j++) {
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
  var mm = Math.min(value.length, a[2]);
  for(var i = 0; i < mm; i++) {
    a[3].push(value[i]);
  }
  for(i = mm; i < a[2]; i++) {
    a[3].push(0);
  }
};
/** @ignore */
CurveBuilder._defaultEndPointsCurve = function(attributes) {
  for(var i = 0; i < attributes.length; i++) {
    var a = attributes[i];
    if(a[0] === Semantic.POSITION && a[1] === 0) {
      var a4 = a[4];
      if(typeof a4.endPoints !== "undefined" && a4.endPoints !== null) {
        return a[4].endPoints();
      }
      break;
    }
  }
  return [0, 1];
};
/** @ignore */
CurveBuilder._defaultEndPointsSurface = function(attributes) {
  for(var i = 0; i < attributes.length; i++) {
    var a = attributes[i];
    if(a[0] === Semantic.POSITION && a[1] === 0) {
      var a4 = a[4];
      if(typeof a4 !== "undefined" && a4 !== null && (typeof a4.endPoints !== "undefined" && a4.endPoints !== null)) {
        return a[4].endPoints();
      }
      break;
    }
  }
  return [0, 1, 0, 1];
};
/** @ignore */
CurveBuilder._setAttribute = function(
   attributes, vertexCount, curve, semantic, semanticIndex, size
) {
  var sizeValue = typeof size === "undefined" || size === null ? 3 : size;
  // var semanticIndexValue = typeof semanticIndex === "undefined" || semanticIndex === null ? 0 : semanticIndex;
  var iscurve = typeof curve !== "undefined" && curve !== null;
  if(size <= 0)throw new Error("Invalid attribute size");
  var sem = new BufferHelper().resolveSemantic(semantic, semanticIndex);
  if(typeof sem === "undefined" || sem === null)throw new Error();
  for(var i = 0; i < attributes.length; i++) {
    var a = attributes[i];
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
    var newAttr = [sem[0], sem[1], sizeValue,
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
 * @returns {H3DU.CurveBuilder} This object.
 */
CurveBuilder.prototype.clearVertices = function() {
  this.vertexCount = 0;
  this.indices = [];
  for(var i = 0; i < this.attributes.length; i++) {
    this.attributes[i][3] = [];
  }
  return this;
};
/**
 * Generates a mesh buffer containing the vertex attributes
 * generated so far. The mesh buffer's primitive type will equal the
 * last type passed to the "mode" parameter in the {@link H3DU.CurveBuilder.curveEval} method.
 * @returns {H3DU.MeshBuffer} The generated mesh buffer.
 */
CurveBuilder.prototype.toMeshBuffer = function() {
  return CurveBuilder._toMeshBuffer(this.attributes, this.indices, this.mode);
};
/**
 * Sets the parametric curve used to generate vertex positions.
 * @param {Object} curve A [curve evaluator object]{@link H3DU.Curve} that
 * describes the parametric curve used to generate positions.
 * @param {number} [size] The number of elements in each position value. For
 * example, if the attribute is 3-dimensional, this parameter is 3. If null, undefined, or omitted, the default
 * is 3.
 * @returns {H3DU.CurveBuilder} This object.
 */
CurveBuilder.prototype.position = function(curve, size) {
  return this.attribute(curve, Semantic.POSITION, 0, size);
};
/**
 * Sets the parametric curve used to generate vertex attribute values.
 * @param {Object} curve A [curve evaluator object]{@link H3DU.Curve} that
 * describes the parametric curve used to generate attribute.
 * @param {number|string} semantic An attribute semantic, such
 * as {@link H3DU.Semantic.POSITION}, "POSITION", or "TEXCOORD_0".
 * Throws an error if this value is a string and the string is invalid.
 * @param {number} semanticIndex The set index of the attribute
 * for the given semantic.
 * 0 is the first index of the attribute, 1 is the second, and so on.
 * This is ignored if "name" is a string.
 * @param {number} [size] The number of elements in each position value. For
 * example, if the attribute is 3-dimensional, this parameter is 3. If null, undefined, or omitted, the default
 * is 3.
 * @returns {H3DU.CurveBuilder} This object.
 */
CurveBuilder.prototype.attribute = function(curve, semantic, semanticIndex, size) {
  CurveBuilder._setAttribute(this.attributes, this.vertexCount,
     curve, semantic, semanticIndex, size);
  return this;
};
/**
 * Convenience method for creating a mesh buffer from a parametric
 * curve. The mesh buffer will contain positions and vertex normals that
 * cover the given surface.
 * @param {Object} curve A [curve evaluator object]{@link H3DU.Curve} that
 * describes the parametric curve used to generate positions.
 * @param {number} [mode] If this value is {@link H3DU.Mesh.LINES}, or is null, undefined, or omitted, generates
 * a series of lines defining the curve. If this value is {@link H3DU.Mesh.POINTS},
 * generates a series of points along the curve. For any other value,
 * this method has no effect.
 * @param {number} [n] Number of subdivisions of the curve to be drawn.
 * Default is 24.
 * @param {number} [u1] Starting point of the curve.
 * Default is the starting coordinate given by the [curve evaluator object]{@link H3DU.Curve}, or 0 if not given.
 * @param {number} [u2] Ending point of the curve.
 * Default is the ending coordinate given by the [curve evaluator object]{@link H3DU.Curve}, or 1 if not given.
 * @returns {H3DU.MeshBuffer} The generated mesh buffer.
 */
CurveBuilder.curveToBuffer = function(curve, mode, n, u1, u2) {
  return new CurveBuilder()
     .position(curve, 3)
     .evalCurve(mode, n, u1, u2).toMeshBuffer();
};
/**
 * Clears the arrays of attribute values (such as positions and normals)
 * and vertex indices generated so far. The attributes themselves will remain.
 * @returns {H3DU.SurfaceBuilder} This object.
 */
SurfaceBuilder.prototype.clearVertices = function() {
  this.vertexCount = 0;
  this.indices = [];
  for(var i = 0; i < this.attributes.length; i++) {
    this.attributes[i][3] = [];
  }
  return this;
};
/**
 * Generates a mesh buffer containing the vertex attributes
 * generated so far. The mesh buffer's primitive type will equal the
 * last type passed to the "mode" parameter in the {@link H3DU.SurfaceBuilder.surfaceEval} method.
 * @returns {H3DU.MeshBuffer} The generated mesh buffer.
 */
SurfaceBuilder.prototype.toMeshBuffer = function() {
  return CurveBuilder._toMeshBuffer(this.attributes, this.indices, this.mode);
};
/**
 * TODO: Not documented yet.
 * @param {Object} surface A [surface evaluator object]{@link H3DU.Surface} that
 * describes the parametric surface
 * used to generate position values.
 * @param {number} [size] The number of elements in each position value. For
 * example, if the attribute is 3-dimensional, this parameter is 3. If null, undefined, or omitted, the default
 * is 3.
 * @returns {H3DU.SurfaceBuilder} This object.
 */
SurfaceBuilder.prototype.position = function(surface, size) {
  return this.attribute(surface, Semantic.POSITION, 0, size);
};
/**
 * Sets the parametric surface used to generate texture coordinates.
 * @param {Object} surface A [surface evaluator object]{@link H3DU.Surface} that
 * describes the parametric surface
 * used to generate texture coordinates.
 * @param {number} [size] The number of elements in each value of the attribute. For
 * example, if the attribute is 3-dimensional, this parameter is 3. If null, undefined, or omitted, the default
 * is 2.
 * @returns {H3DU.SurfaceBuilder} This object.
 */
SurfaceBuilder.prototype.texCoord = function(surface, size) {
  return this.attribute(surface, Semantic.TEXCOORD, 0, typeof size === "undefined" || size === null ? 2 : size);
};
/**
 * Sets the parametric surface used to generate vertex positions and normals.
 * @param {Object} surface A [surface evaluator object]{@link H3DU.Surface} that
 * describes the parametric surface
 * used to generate positions.
 * @param {number} [size] The number of elements in each position and normal. For
 * example, if the attribute is 3-dimensional, this parameter is 3. If null, undefined, or omitted, the default
 * is 3.
 * @returns {H3DU.SurfaceBuilder} This object.
 */
SurfaceBuilder.prototype.positionNormal = function(surface, size) {
  var norm = typeof surface !== "undefined" && surface !== null ? new CurveBuilder._NormalSurface(surface) : null;
  return this.attribute(surface, Semantic.POSITION, 0, size)
        .attribute(norm, Semantic.NORMAL, 0, size);
};
/**
 * @constructor
 * @ignore */
SurfaceBuilder._TexCoord = function(s) {
  var ep = new Surface(s).endPoints();
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
 * sets a surface evaluator that generates texture coordinates ranging
 * from (0,1) along the U and V axes of the surface.
 * @param {Object} surface A [surface evaluator object]{@link H3DU.Surface} that
 * describes the parametric surface
 * used to generate positions.
 * @param {number} [size] The number of elements in each position. For
 * example, if the attribute is 3-dimensional, this parameter is 3. If null, undefined, or omitted, the default
 * is 3. The texture coordinates will be 2-dimensional.
 * @returns {H3DU.SurfaceBuilder} This object.
 */
SurfaceBuilder.prototype.positionTexCoord = function(surface, size) {
  var tc = typeof surface !== "undefined" && surface !== null ? new SurfaceBuilder._TexCoord(surface) : null;
  return this.attribute(surface, Semantic.POSITION, 0, size)
        .attribute(tc, Semantic.TEXCOORD, 0, 2);
};

/**
 * Sets the parametric surface used to generate vertex positions and normals, and
 * sets a surface evaluator that generates texture coordinates ranging
 * from (0,1) along the U and V axes of the surface.
 * @param {Object} surface A [surface evaluator object]{@link H3DU.Surface} that
 * describes the parametric surface
 * used to generate positions.
 * @param {number} [size] The number of elements in each position and normal. For
 * example, if the attribute is 3-dimensional, this parameter is 3. If null, undefined, or omitted, the default
 * is 3. The texture coordinates will be 2-dimensional.
 * @returns {H3DU.SurfaceBuilder} This object.
 */
SurfaceBuilder.prototype.positionNormalTexCoord = function(surface, size) {
  return this.positionNormal(surface, size).positionTexCoord(surface, size);
};

/**
 * Sets the parametric surface used to generate vertex attribute values.
 * @param {Object} surface A [surface evaluator object]{@link H3DU.Surface} that
 * describes the parametric surface
 * used to generate attribute's values.
 * @param {number|string} semantic An attribute semantic, such
 * as {@link H3DU.Semantic.POSITION}, "POSITION", or "TEXCOORD_0".
 * Throws an error if this value is a string and the string is invalid.
 * @param {number} [semanticIndex] The set index of the attribute
 * for the given semantic.
 * 0 is the first index of the attribute, 1 is the second, and so on.
 * This is ignored if "name" is a string.
 * @param {number} [size] The number of elements in each position and normal. For
 * example, if the attribute is 3-dimensional, this parameter is 3. If null, undefined, or omitted, the default
 * is 3.
 * @returns {H3DU.SurfaceBuilder} This object.
 * @example <caption>The following example sets the surface
 * function for texture coordinates to a linear evaluator. Thus, coordinates passed to the
 * evalSurface method will be interpolated as direct
 * texture coordinates.</caption>
 * surface.attribute({"evaluate":function(u,v) {
 * "use strict"; return [u,v] }},H3DU.Semantic.TEXCOORD);
 */
SurfaceBuilder.prototype.attribute = function(surface, semantic, semanticIndex, size) {
  CurveBuilder._setAttribute(this.attributes, this.vertexCount,
     surface, semantic, semanticIndex, size);
  return this;
};

/**
 * Convenience method for creating a mesh buffer from a parametric
 * surface. The mesh buffer will contain positions, vertex normals, and
 * texture coordinates that cover the given surface.
 * @param {Object} surface A [surface evaluator object]{@link H3DU.Surface} that
 * describes the parametric surface
 * used to generate positions.
 * @param {number} [mode] If this value is {@link H3DU.Mesh.TRIANGLES}, or is null, undefined, or omitted, generates a series of triangles defining the surface. If
 * this value is {@link H3DU.Mesh.LINES}, generates
 * a series of lines defining the surface. If this value is {@link H3DU.Mesh.POINTS},
 * generates a series of points along the surface. For any other value,
 * this method has no effect.
 * @param {number} [un] Number of subdivisions along the U axis.
 * Default is 24.
 * @param {number} [vn] Number of subdivisions along the V axis.
 * Default is 24.
 * @param {number} [u1] Starting U coordinate of the surface to evaluate.
 * Default is the starting U coordinate given by the [surface evaluator object]{@link H3DU.Surface}, or 0 if not given.
 * @param {number} [u2] Ending U coordinate of the surface to evaluate.
 * Default is the ending U coordinate given by the [surface evaluator object]{@link H3DU.Surface}, or 1 if not given.
 * @param {number} [v1] Starting V coordinate of the surface to evaluate.
 * Default is the starting V coordinate given by the [surface evaluator object]{@link H3DU.Surface}, or 0 if not given.
 * @param {number} [v2] Ending V coordinate of the surface to evaluate.
 * Default is the ending V coordinate given by the [surface evaluator object]{@link H3DU.Surface}, or 1 if not given.
 * @returns {H3DU.MeshBuffer} The generated mesh buffer.
 */
SurfaceBuilder.surfaceToBuffer = function(surface, mode, un, vn, u1, u2, v1, v2) {
  return new SurfaceBuilder()
     .positionNormalTexCoord(surface, 3)
     .evalSurface(mode, un, vn, u1, u2, vn, v2).toMeshBuffer();
};
/**
 * Generates the vertex attributes of the parametric curves.
 * @param {number} [mode] If this value is {@link H3DU.Mesh.LINES}, or is null, undefined, or omitted, generates
 * a series of lines defining the curve. If this value is {@link H3DU.Mesh.POINTS},
 * generates a series of points along the curve. For any other value,
 * this method has no effect.
 * @param {number} [n] Number of subdivisions of the curve to be drawn.
 * Default is 24.
 * @param {number} [u1] Starting point of the curve.
 * Default is the starting coordinate given by the [curve evaluator object]{@link H3DU.Curve}, or 0 if not given.
 * @param {number} [u2] Ending point of the curve.
 * Default is the ending coordinate given by the [curve evaluator object]{@link H3DU.Curve}, or 1 if not given.
 * @returns {H3DU.CurveBuilder} This object.
 */
CurveBuilder.prototype.evalCurve = function(mode, n, u1, u2) {
  n = typeof n === "undefined" || n === null ? 24 : Math.ceil(n);
  if(n <= 0)throw new Error();
  if(typeof u1 === "undefined" || u1 === null || (typeof u2 === "undefined" || u2 === null)) {
    var ep = CurveBuilder._defaultEndPointsCurve(this.attributes);
    u1 = ep[0];
    u2 = ep[1];
  }
  var i;
  var uv = (u2 - u1) / n;
  var firstIndex = this.vertexCount;
  if(mode === Mesh.LINES || (typeof mode === "undefined" || mode === null)) {
    for(i = 0; i < n; i++) {
      this.indices.push(firstIndex + i, firstIndex + i + 1);
    }
    this.vertexCount += n + 1;
  } else if(mode === Mesh.POINTS) {
    for(i = 0; i < n; i++) {
      this.indices.push(firstIndex + i);
    }
    this.vertexCount += n + 1;
  } else {
    return this;
  }
  this.mode = mode;
  for(i = 0; i <= n; i++) {
    var u = u1 + i * uv;
    for(var j = 0; j < this.attributes.length; j++) {
      var a = this.attributes[j];
      var value = typeof a[4] !== "undefined" && a[4] !== null ? a[4].evaluate(u) : [];
      CurveBuilder._addValue(a, value);
    }
  }
  return this;
};
/** @ignore */
SurfaceBuilder.prototype._evalOne = function(u, v) {
  for(var k = 0; k < this.attributes.length; k++) {
    var a = this.attributes[k];
    var value = typeof a[4] !== "undefined" && a[4] !== null ? a[4].evaluate(u, v) : [];
    CurveBuilder._addValue(a, value);
  }
};
/**
 * Generates the vertex attributes of the parametric surfaces.
 * @param {number} [mode] If this value is {@link H3DU.Mesh.TRIANGLES}, or is null, undefined, or omitted, generates a series of triangles defining the surface. If
 * this value is {@link H3DU.Mesh.LINES}, generates
 * a series of lines defining the surface. If this value is {@link H3DU.Mesh.POINTS},
 * generates a series of points along the surface. For any other value,
 * this method has no effect.
 * @param {number} [un] Number of subdivisions along the U axis.
 * Default is 24.
 * @param {number} [vn] Number of subdivisions along the V axis.
 * Default is 24.
 * @param {number} [u1] Starting U coordinate of the surface to evaluate.
 * Default is the starting U coordinate given by the [surface evaluator object]{@link H3DU.Surface}, or 0 if not given.
 * @param {number} [u2] Ending U coordinate of the surface to evaluate.
 * Default is the ending U coordinate given by the [surface evaluator object]{@link H3DU.Surface}, or 1 if not given.
 * @param {number} [v1] Starting V coordinate of the surface to evaluate.
 * Default is the starting V coordinate given by the [surface evaluator object]{@link H3DU.Surface}, or 0 if not given.
 * @param {number} [v2] Ending V coordinate of the surface to evaluate.
 * Default is the ending V coordinate given by the [surface evaluator object]{@link H3DU.Surface}, or 1 if not given.
 * @returns {H3DU.SurfaceBuilder} This object.
 */
SurfaceBuilder.prototype.evalSurface = function(mode, un, vn, u1, u2, v1, v2) {
  un = typeof un === "undefined" || un === null ? 24 : Math.ceil(un);
  vn = typeof vn === "undefined" || vn === null ? 24 : Math.ceil(vn);
  if(un <= 0)throw new Error();
  if(vn <= 0)throw new Error();
  if(typeof u1 === "undefined" || u1 === null || (typeof u2 === "undefined" || u2 === null) || (typeof v1 === "undefined" || v1 === null) || (typeof v2 === "undefined" || v2 === null)) {
    var ep = CurveBuilder._defaultEndPointsSurface(this.attributes);
    u1 = ep[0];
    u2 = ep[1];
    v1 = ep[2];
    v2 = ep[3];
  }
  var u, v, i, j;
  var du = (u2 - u1) / un;
  var dv = (v2 - v1) / vn;
  if(mode === Mesh.TRIANGLES || (typeof mode === "undefined" || mode === null)) {
    for(i = 0; i < vn; i++) {
      var vertex = this.vertexCount;
      for(j = 0; j < un; j++) {
        this.indices.push(vertex, vertex + 1, vertex + 2);
        this.indices.push(vertex + 2, vertex + 1, vertex + 3);
        vertex += 2;
      }
      this.vertexCount += (un + 1) * 2;
      for(j = 0; j <= un; j++) {
        u = j * du + u1;
        this._evalOne(u, i * dv + v1);
        this._evalOne(u, (i + 1) * dv + v1);
      }
    }
    this.mode = mode;
  } else if(mode === Mesh.POINTS) {
    for(i = 0; i <= vn; i++) {
      for(j = 0; j <= un; j++) {
        u = j * du + u1;
        v = i * dv + v1;
        this._evalOne(u, v);
        this.indices.push(this.vertexCount++);
      }
    }
    this.mode = mode;
  } else if(mode === Mesh.LINES) {
    for(i = 0; i <= vn; i++) {
      for(j = 0; j <= un; j++) {
        this._evalOne(j * du + u1, i * dv + v1);
        if(j < vn) {
          this.indices.push(this.vertexCount, this.vertexCount + 1);
        }
        this.vertexCount++;
      }
    }
    for(i = 0; i <= un; i++) {
      for(j = 0; j <= vn; j++) {
        u = i * du + u1;
        v = j * dv + v1;
        this._evalOne(i * du + u1, j * dv + v1);
        if(j < vn) {
          this.indices.push(this.vertexCount, this.vertexCount + 1);
        }
        this.vertexCount++;
      }
    }
    this.mode = mode;
  }
  return this;
};

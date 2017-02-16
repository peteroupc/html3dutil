/* global AABBTree, H3DU, classifyPointToPlane3D, classifyPolygonToPlane3D, getIntersectionRayPlane, makeRay, triangleToPlane */
/*
 Any copyright to this file is released to the Public Domain.
 http://creativecommons.org/publicdomain/zero/1.0/
 If you like this, you should donate
 to Peter O. (original author of
 the Public Domain HTML 3D Library) at:
 http://peteroupc.github.io/
*/

/**
 * A binary space partitioning (BSP) tree.
 * @param {Array<Polygon>} An array of polygons forming the BSP tree
 */
function BspTree(polygons) {
  "use strict";
  this.plane = null;
  this.frontTree = null;
  this.backTree = null;
  this.faces = null;
  this._buildNode(polygons);
}
/** @private */
BspTree._negatePlane = function(plane) {
  "use strict";
  return [-plane[0], -plane[1], -plane[2], plane[3], plane[4], plane[5]];
};
/**
 * Generates a mesh buffer containing the polygons
 * stored in this BSP tree.
 * @returns {H3DU.MeshBuffer} Return value.
 * @memberof! BspTree#
 */
BspTree.prototype.toMeshBuffer = function() {
  "use strict";
  var mesh = new H3DU.Mesh();
  this._toMeshInternal(mesh);
  return new H3DU.MeshBuffer(mesh);
};
/** @private */
BspTree.prototype._toMeshInternal = function(mesh) {
  "use strict";
  if(typeof this.faces !== "undefined" && this.faces !== null) {
    for(var polyIndex = 0; polyIndex < this.faces.length; polyIndex++) {
      var poly = this.faces[polyIndex];
      mesh.mode(H3DU.Mesh.TRIANGLE_FAN);
      mesh.normal3(poly.plane);
      for(var i = 0; i < poly.vertices.length; i++) {
        mesh.vertex3(poly.vertices[i]);
      }
      mesh.vertex3(poly.vertices[0]);
    }
  }
  if(typeof this.frontTree !== "undefined" && this.frontTree !== null) {
    this.frontTree._toMeshInternal(mesh);
  }
  if(typeof this.backTree !== "undefined" && this.backTree !== null) {
    this.backTree._toMeshInternal(mesh);
  }
};
/** @private */
BspTree.prototype._getFacesInternal = function(polygons) {
  "use strict";
  if(typeof this.faces !== "undefined" && this.faces !== null) {
    for(var polygonIndex = 0; polygonIndex < this.faces.length; polygonIndex++) {
      var polygon = this.faces[polygonIndex];
      polygons.push(polygon.copy());
    }
  }
  if(typeof this.frontTree !== "undefined" && this.frontTree !== null) {
    this.frontTree._getFacesInternal(polygons);
  }
  if(typeof this.backTree !== "undefined" && this.backTree !== null) {
    this.backTree._getFacesInternal(polygons);
  }
};
/**
 * Gets a copy of the polygons used in this BSP tree.
 * @returns {Array<Polygon>} An array of the polygons.
 * @memberof! BspTree#
 */
BspTree.prototype.getPolygons = function() {
  "use strict";
  var p = [];
  this._getFacesInternal(p);
  return p;
};
/**
 * Flips the solid and empty space for this BSP tree.
 * @returns {BspTree} This object.
 * @memberof! BspTree#
 */
BspTree.prototype.flip = function() {
  "use strict";
  if(this.plane) {
    this.plane = BspTree._negatePlane(this.plane);
  }
  if(typeof this.faces !== "undefined" && this.faces !== null) {
    for(var i = 0; i < this.faces.length; i++) {
      this.faces[i].reverseWinding();
    }
  }
  var ft = this.frontTree;
  var bt = this.backTree;
  if(typeof ft !== "undefined" && ft !== null) {
    ft.flip();
  }
  if(typeof bt !== "undefined" && bt !== null) {
    bt.flip();
  }
  this.frontTree = bt;
  this.backTree = ft;
  return this;
};
/**
 * Describes a convex polygon.
 * @param {<Array<Array<Number>>} verts An array of three 3-element vectors
 * describing a triangle.
 */
function Polygon(verts) {
  "use strict";
  this.plane = null;
  this.vertices = [];
  if(verts) {
    if(verts.length !== 3)throw new Error();
    this.vertices = verts;
    this.plane = triangleToPlane(verts);
  }
  this.copy = function() {
    var p = new Polygon();
    p.plane = this.plane.slice(0, this.plane.length);
    p.vertices = this.vertices.slice(0, this.vertices.length);
    return p;
  };
  this.reverseWinding = function() {
    var half = this.vertices.length / 2 | 0;
    var right = this.vertices.length - 1;
    for (var i = 0; i < half; i++, right--) {
      var value = this.vertices[i];
      this.vertices[i] = this.vertices[right];
      this.vertices[right] = value;
    }
    this.plane = BspTree._negatePlane(this.plane);
  };
}
/** @private */
BspTree._classifyPolygons = function(polygons, plane) {
  "use strict";
  var frontFaces = [];
  var backFaces = [];
  var crossingFaces = [];
  var onFaces = [];
  for(var polyIndex = 0; polyIndex < polygons.length; polyIndex++) {
    var poly = polygons[polyIndex];
    switch (classifyPolygonToPlane3D(poly.vertices, plane)) {
    case AABBTree.FRONT:
      frontFaces.push(poly);
      break;
    case AABBTree.BACK:
      backFaces.push(poly);
      break;
    case AABBTree.ON:
      onFaces.push(poly);
      break;
    case AABBTree.CROSSING:
      crossingFaces.push(poly);
      break;
    default:
      break;
    }
  }
  return {
    "plane":plane,
    "frontFaces":frontFaces,
    "backFaces":backFaces,
    "crossingFaces":crossingFaces,
    "onFaces":onFaces
  };
};
/** @private */
BspTree._splitPolygon = function(poly, splitPlane, info) {
  "use strict";
  var front = new Polygon();
  var back = new Polygon();
  if(!poly.plane)throw new Error();
  front.plane = back.plane = poly.plane;
  var p1, p2, c1, c2;
  p1 = poly.vertices[poly.vertices.length - 1];
  c1 = classifyPointToPlane3D(splitPlane, p1);
  for (var i = 0; i < poly.vertices.length; i++) {
    p2 = poly.vertices[i];
    c2 = classifyPointToPlane3D(splitPlane, p2);
    var cls = c1 << 4 | c2;
    if(cls === (AABBTree.BACK << 4 | AABBTree.FRONT) ||
    cls === (AABBTree.FRONT << 4 | AABBTree.BACK)) {
      var p = getIntersectionRayPlane(makeRay(p1, p2),
    splitPlane);
      front.vertices.push(p);
      back.vertices.push(p);
    }
    if (c2 !== AABBTree.FRONT) {
      back.vertices.push(p2);
    }
    if (c2 !== AABBTree.BACK) {
      front.vertices.push(p2);
    }
    p1 = p2;
    c1 = c2;
  }
  if(front.vertices.length < 3 || back.vertices.length < 3) {
    throw new Error();
  }
  info.frontFaces.push(front);
  info.backFaces.push(back);
};
/** @private */
BspTree._addAll = function(dst, src) {
  "use strict";
  for(var elemIndex = 0; elemIndex < src.length; elemIndex++) {
    var elem = src[elemIndex];
    dst.push(elem);
  }
};
/** @private */
BspTree._handleOnAndCrossing = function(info, plane) {
  "use strict";
  var splittingPlaneNormal = plane.slice(0, 3);
  for(var i = 0; i < info.onFaces.length; i++) {
    var polygon = info.onFaces[i];
    var polyNormal = polygon.plane.slice(0, 3);
    var dot = H3DU.Math.vec3dot(splittingPlaneNormal, polyNormal);
    if (dot > 0) {
      info.frontFaces.push(polygon);
    } else {
      info.backFaces.push(polygon);
    }
  }
  for(i = 0; i < info.crossingFaces.length; i++) {
    BspTree._splitPolygon(info.crossingFaces[i], plane, info);
  }
};
/** @private */
BspTree.prototype._clipInternal = function(polygons) {
  "use strict";
  polygons = polygons || [];
  var ret = [];
  var info;
  if(this.plane) {
    info = BspTree._classifyPolygons(polygons, this.plane);
    BspTree._handleOnAndCrossing(info, this.plane);
    BspTree._addAll(ret, info.frontFaces);
  } else {
    return polygons.slice(0, polygons.length);
  }
  if(typeof this.frontTree !== "undefined" && this.frontTree !== null) {
    if(this.frontTree.plane) {
      ret = this.frontTree._clipInternal(ret);
    }
  }
  if(typeof this.backTree !== "undefined" && this.backTree !== null) {
    BspTree._addAll(ret, this.backTree._clipInternal(info.backFaces));
  }
  return ret;
};
/**
 * TODO: Not documented yet.
 * @param {*} node
 * @returns {BspTree} This object.
 * @memberof! BspTree#
 */
BspTree.prototype.clip = function(node) {
  "use strict";
  this.faces = node._clipInternal(this.faces);
  if(typeof this.frontTree !== "undefined" && this.frontTree !== null) {
    this.frontTree.clip(node);
  }
  if(typeof this.backTree !== "undefined" && this.backTree !== null) {
    this.backTree.clip(node);
  }
  return this;
};
/**
 * Generates a BSP tree from a mesh buffer.
 * @param {H3DU.MeshBuffer} mesh A mesh buffer.
 * @returns {BspTree} The resulting BSP tree.
 */
BspTree.fromMeshBuffer = function(mesh) {
  "use strict";
  if(mesh.primitiveType() === H3DU.Mesh.TRIANGLES) {
    var polys = mesh.getPositions();
    var polygons = [];
    for(var polyIndex = 0; polyIndex < polys.length; polyIndex++) {
      var poly = polys[polyIndex];
      polygons.push(new Polygon(poly));
    }
    return new BspTree(polygons);
  } else {
    return new BspTree([]);
  }
};
/**
 * Creates a copy of this BSP tree.
 * @returns {BspTree} A copy of this object.
 * @memberof! BspTree#
 */
BspTree.prototype.copy = function() {
  "use strict";
  return new BspTree(this.getPolygons());
};
/** @private */
BspTree.prototype._clipflip2 = function(other) {
  "use strict";
  for(var i = 0; i < 2; i++) {
    this.clip(other).flip();
  }
  return this;
};
/**
 * TODO: Not documented yet.
 * @param {*} other
 * @returns {BspTree} The resulting tree.
 * @memberof! BspTree#
 */
BspTree.prototype.union = function(other) {
  "use strict";
  var otherBsp = other.copy();
  var thisBsp = this.copy().clip(otherBsp);
  return new BspTree(
     thisBsp.getPolygons().concat(
        otherBsp._clipflip2(thisBsp).getPolygons()));
};
/**
 * TODO: Not documented yet.
 * @param {*} other
 * @returns {BspTree} The resulting tree.
 * @memberof! BspTree#
 */
BspTree.prototype.difference = function(other) {
  "use strict";
  var otherBsp = other.copy();
  var thisBsp = this.copy().flip().clip(otherBsp);
  return new BspTree(
     thisBsp.getPolygons().concat(
         otherBsp._clipflip2(thisBsp).getPolygons())).flip();
};
/**
 * TODO: Not documented yet.
 * @param {*} other
 * @returns {BspTree} The resulting tree.
 * @memberof! BspTree#
 */
BspTree.prototype.intersection = function(other) {
  "use strict";
  var thisBsp = this.copy().flip();
  var otherBsp = other.copy().clip(thisBsp).flip();
  return new BspTree(
     thisBsp.clip(otherBsp).getPolygons().concat(
         otherBsp.getPolygons())).flip();
};
/**
 * TODO: Not documented yet.
 * @param {*} other
 * @returns {BspTree} The resulting tree.
 * @memberof! BspTree#
 */
BspTree.prototype.xor = function(other) {
  "use strict";
  return this.union(other).difference(this.intersection(other));
};
/** @private */
BspTree.prototype._buildNode = function(polygons) {
  "use strict";
  if(polygons.length === 0) {
    this.faces = [];
    this.plane = [0, 0, 0];
    return this;
  }
  if(polygons.length === 1) {
    this.faces = polygons;
    this.plane = polygons[0].plane;
    if(typeof polygons[0].plane === "undefined" || polygons[0].plane === null)throw new Error();
    return this;
  }
  var info = null;
  var best = -1;
  for(var p1Index = 0; p1Index < polygons.length; p1Index++) {
    var p1 = polygons[p1Index];
    var r = BspTree._classifyPolygons(polygons, p1.plane);
    // See <https://groups.google.com/d/msg/comp.graphics.algorithms/XRtRJvWLDLA/cEJCV9AlimcJ>,
     // by Tim Sweeney
    var score = Math.abs(r.frontFaces.length - r.backFaces.length) * 20 +
      r.crossingFaces.length * 80;
    if (best === -1 || score < best) {
      best = score;
      info = r;
    }
  }
  var splittingPlane = info.plane;
  for(var i = 0; i < info.crossingFaces.length; i++) {
    BspTree._splitPolygon(info.crossingFaces[i], splittingPlane, info);
  }
  if(info.onFaces.length > 0) {
    if(!this.faces) {
      this.faces = [];
    }
    this.plane = splittingPlane;
    BspTree._addAll(this.faces, info.onFaces);
  }
  if (info.frontFaces.length > 0) {
    this.frontTree = new BspTree(info.frontFaces);
  }
  if(info.backFaces.length > 0) {
    this.backTree = new BspTree(info.backFaces);
  }
  return this;
};
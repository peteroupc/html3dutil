/* global H3DU */
/*
 Any copyright to this file is released to the Public Domain.
 http://creativecommons.org/publicdomain/zero/1.0/
 If you like this, you should donate
 to Peter O. (original author of
 the Public Domain HTML 3D Library) at:
 http://peteroupc.github.io/
*/

/* exported getPoints */
function getPoints(curves, numPoints, offset) {
  "use strict";
  var points = [];
  for(var i = 0; i < numPoints; i++) {
    var t = i / (numPoints - 1) + offset;
    if(t >= 0.0 && t <= 1.0) {
      var ev = curves.evaluate(t);
      points.push([ev[0], ev[1]]);
    }
  }
  return points;
}

/* exported pathFloor */
function pathFloor(path, z, flatness) {
  "use strict";
  if(z === null || typeof z === "undefined")z = 0;
  var tris = path.getTriangles(flatness);
  var mesh = new H3DU.Mesh().mode(H3DU.Mesh.TRIANGLES)
   .normal3(0, 0, 1);
  for(var i = 0; i < tris.length; i++) {
    var tri = tris[i];
    mesh.vertex3(tri[0], tri[1], z)
   .vertex3(tri[2], tri[3], z)
   .vertex3(tri[4], tri[5], z);
  }
  return mesh;
}

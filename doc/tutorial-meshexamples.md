# Examples of Creating Meshes on the Fly

[Back to documentation index.](index.md)

This page contains source code for creating various kinds of 3D models on the fly.

TODO: Place in documentation examples, not here.

<a id=Contents></a>
## Contents

- [**Contents**](#Contents)
- [**Miscellaneous**](#Miscellaneous)

<a id=Miscellaneous></a>
## Miscellaneous

function pathClosedFigure(path, zBottom, zTop, flatness) {
  "use strict";
  var mesh = new H3DU.MeshBuffer();
  mesh.merge(path.toExtrudedMeshBuffer(zBottom, zTop, flatness));
  mesh.merge(path.toMeshBuffer(zTop, flatness));
  mesh.merge(path.toMeshBuffer(zBottom, flatness).reverseWinding().reverseNormals());
  return mesh;
}

[Back to documentation index.](index.md)

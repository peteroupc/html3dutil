This page contains source code for creating various kinds of 3D models on the fly.

<a id=Contents></a>
## Contents

- [**Contents**](#Contents)
- [**3D Line**](#3D_Line)
- [**Miscellaneous**](#Miscellaneous)

<a id=3D_Line></a>
## 3D Line

This method creates a thin line-like 3D object.

    // point1, point2 - end points of the line
    // thickness - thickness of the line in units, default 1
    function create3DLine(point1,point2,thickness){
      if(thickness==null)thickness=1
      var vector=H3DU.MathUtil.vec3sub(point1,point2);
      var dist=H3DU.MathUtil.vec3length(vector);
      var normVector=H3DU.MathUtil.vec3norm(vector);
      var midPoint=H3DU.MathUtil.vec3lerp(point1,point2,0.5);
      var line=H3DU.Meshes.createCapsule(thickness/2,dist,6,4);
      var matrix=H3DU.MathUtil.quatToMat4(H3DU.MathUtil.quatFromVectors([0,0,1],normVector));
      matrix[12]=midPoint[0]
      matrix[13]=midPoint[1]
      matrix[14]=midPoint[2]
      return line.transform(matrix);
    }

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

    function wireBox(box, color){
     var boxMesh=H3DU.Meshes.createBox(1,1,1)
       .setColor(color).wireFrame()
     var shape=new H3DU.Shape(boxMesh)
     shape.setPosition(H3DU.MathUtil.boxCenter(box))
     shape.setScale(H3DU.MathUtil.boxDimensions(box))
     return shape
    }

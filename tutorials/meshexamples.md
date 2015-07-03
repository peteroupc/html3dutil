This page contains source code for creating various kinds of 3D models on the fly.

## Contents <a id=Contents></a>

[Contents](#Contents)<br>[Cone](#Cone)<br>[Striped Disk](#Striped_Disk)<br>[Washer](#Washer)<br>

## Cone <a id=Cone></a>

This method creates a cone that's closed at its base.

![Image of a cone](mesh1.png)

    function createClosedCone(radius,height,slices){
      return Meshes.createClosedCylinder(radius,0,height,slices,1);
    }

## Striped Disk <a id=Striped_Disk></a>

This method creates a ring or disk striped in two colors.

![Image of a disk striped in red and almost-white](mesh2.png)

    // inner, outer - inner and outer radius of the disk
    // color1, color2 - colors of each stripe; for example:
    //   "red", "#223344", "rgb(255,0,0)", [0,1,0]
    // sections - number of stripes
    // sectionCount - number of sections per stripe
    function stripedDisk(inner,outer,color1,color2,sections,sectionCount){
     if(sectionCount==null)sectionCount=4
     var firstColor=true
     var ret=new Mesh()
     var sweep=360.0/sections;
     for(var i=0;i<sections;i++){
      var angle=360.0*(i*1.0/sections);
      var mesh=Meshes.createPartialDisk(inner,outer,sectionCount,1,angle,sweep)
         .setColor3(firstColor ? color1 : color2)
      firstColor=!firstColor
      ret.merge(mesh);
     }
     return ret;
    }

## Washer <a id=Washer></a>

This method creates a washer-shaped 3D model.

![Image of a washer](mesh3.png)

    function createWasher(inner,outer,height,slices){
      var innerCylinder=Meshes.createCylinder(inner,inner,height,slices,1,false,true);
      var outerCylinder=Meshes.createCylinder(outer,outer,height,slices,1,false,false);
      var base=Meshes.createDisk(inner,outer,slices,2,true).reverseWinding();
      var top=Meshes.createDisk(inner,outer,slices,2,false);
      // move the top disk to the top of the cylinder
      top.transform(GLMath.mat4translated(0,0,height));
      // merge the base and the top
      return innerCylinder.merge(outerCylinder).merge(base).merge(top);
    }

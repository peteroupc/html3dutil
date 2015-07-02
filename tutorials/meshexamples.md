This page contains source code for creating various kinds of 3D models on the fly.

## Contents <a id=Contents></a>

[Contents](#Contents)<br>[Striped Disk](#Striped_Disk)<br>

## Striped Disk <a id=Striped_Disk></a>

This method creates a ring or disk striped in two colors.

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
      var mesh=Meshes.createPartialDisk(inner,outer,sectionCount,1,angle,sweep,true)
         .setColor3(firstColor ? color1 : color2)
      firstColor=!firstColor
      ret.merge(mesh);
     }
     return ret;
    }

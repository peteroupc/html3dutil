/*
 Any copyright to this file is released to the Public Domain.
 In case this is not possible, this file is also licensed under the Unlicense: https://unlicense.org/
*/

import {MathUtil} from "./h3du-math.js";
import {toGLColor} from "./h3du-misc.js";

/**
 * Contains methods that create meshes
 * of various geometric shapes and solids, such as cubes, cylinders,
 * and spheres.<p>
 * <img src='shapes.png' alt='An assortment of shapes: a red box, a blue sphere, a bright green 2D ring, and an
 * orange partial ring on the first row; and a yellow 3D ring, a brown cylinder, a dark
 * green square, and a purple cone on the second row.'/>
 * <b>What are normals?</b> A normal is a set of numbers (usually three numbers) describing a particular direction. Generally, a normal's direction is perpendicular to a surface's edges, and points up and
 * away from the surface. For 3D graphics libraries to calculate a mesh buffer's lighting and shading correctly, that mesh buffer must specify normals for all its vertices.<p><p>
 * Normals are important in the lighting and shading model. When light hits an object's surface, how brightly the surface will be lit depends on how directly the light points to the surface. It will be lit the most brightly if the light is directly opposite to its normal, and not at all if the light is perpendicular to the normal or in the same direction as the normal.<p>
 * In general, vertex normals are 3-dimensional
 * and are defined for a mesh buffer only if it
 * also contains vertex positions.<p>
 * <b>What are texture coordinates?</b> If a texture (array of memory units) will be applied to a mesh buffer's geometry, then texture coordinates need to be specified for each vertex in that mesh buffer. In general, a texture coordinate is one of two numbers, called U and V, that map to a specific point in the texture. Each texture coordinate ranges from 0 to 1.<p>
 * In most 3D graphics pipelines, u-coordinates start at the left of the texture (0) and increase to the right (1). In some graphics pipelines, such as OpenGL, v-coordinates start by default at the bottom of the texture (0) and increase to the top (1), whereas in others, such as WebGL, Vulkan, Metal, and Direct3D, v-coordinates start by default at the top of the texture and increase to the bottom. Thus, for example, in OpenGL by default, texture coordinates (0, 1) indicate the upper-left corner of the texture, and texture coordinates (0.5, 0.5) indicate the center of the texture.<p>
 * In general, texture coordinates describe 2-dimensional points.
 * However, for such texturing tasks as mapping
 * a square to a trapezoid, trios of 3-dimensional texture coordinates (U, V, and Z)
 * are useful to ensure the texturing remains perspective-correct.
 * In this case, the 3-D texture coordinates are converted
 * to 2-D by dividing the U and V components by the Z component.
 * In a fragment shader or pixel shader, this can look like
 * the following
 * code: <code>texCoord.xy/texCoord.z</code>.
 * @constructor
 */
export const Meshes = {};

/**
 * Creates an array of vertex indices corresponding to triangles that make up a line strip, a series of vertices that make up a connected line segment path.
 * @param {number} vertexCount Number of vertices that make up the line loop.
 * @returns {Array<number>} Array of vertex indices corresponding to line segments that make up the line strip. Every two indices in the array is a separate line segment. Returns an empty array if 'vertexCount' is less than 2.
 * @example <caption>The following example sets appropriate indices for a mesh buffer with vertices ordered in line strip vertex order.</caption>
 * mesh.setIndices(
 * Meshes.lineStripIndices(mesh.vertexCount())
 * .map(x=>mesh.getIndex(x)));
 */

Meshes.lineStripIndices = function(vertexCount) {
  const ret = [];
  if(vertexCount >= 2) {
    let i;
    for (i = 1; i < vertexCount; i++)ret.push(i - 1, i);
  }
  return ret;
};
/**
 * Creates an array of vertex indices corresponding to triangles that make up a line loop, a series of vertices that make up a connected line segment path, with the last point also connected to the first.
 * @param {number} vertexCount Number of vertices that make up the line loop.
 * @returns {Array<number>} Array of vertex indices corresponding to line segments that make up the line loop. Every two indices in the array is a separate line segment. Returns an empty array if 'vertexCount' is less than 2.
 * @example <caption>The following example sets appropriate indices for a mesh buffer with vertices ordered in line loop vertex order.</caption>
 * mesh.setIndices(
 * Meshes.lineLoopIndices(mesh.vertexCount())
 * .map(x=>mesh.getIndex(x)));
 */
Meshes.lineLoopIndices = function(vertexCount) {
  const ret = [];
  if(vertexCount >= 2) {
    let i;
    for (i = 1; i < vertexCount; i++)ret.push(i - 1, i);
    ret.push(vertexCount - 1, 0);
  }
  return ret;
};
/**
 * Creates an array of vertex indices corresponding to triangles that make up a triangle fan or convex polygon. For triangle fans and convex polygons, the first 3
 * vertices make up the first triangle, and each additional
 * triangle is made up of the last vertex, the first vertex of
 * the first trangle, and 1 new vertex.
 * @param {number} vertexCount Number of vertices that make up the triangle fan or convex polygon.
 * @returns {Array<number>} Array of vertex indices corresponding to triangles that make up the triangle fan or convex polygon. Every three indices in the array is a separate triangle. Returns an empty array if 'vertexCount' is less than 3.
 * @example <caption>The following example sets appropriate indices for a mesh buffer with vertices ordered in triangle fan vertex order.</caption>
 * mesh.setIndices(
 * Meshes.triangleFanIndices(mesh.vertexCount())
 * .map(x=>mesh.getIndex(x)));
 */
Meshes.triangleFanIndices = function(vertexCount) {
  const ret = [];
  if(vertexCount >= 3) {
    let i;
    for (i = 2; i < vertexCount; i++)ret.push(0, i - 1, i);
  }
  return ret;
};
/**
 * Creates an array of vertex indices corresponding to triangles that make up a triangle strip. For a triangle strip, the first 3
 * vertices make up the first triangle, and each additional
 * triangle is made up of the last 2 vertices and 1
 * new vertex.
 * @param {number} vertexCount Number of vertices that make up the triangle strip.
 * @returns {Array<number>} Array of vertex indices corresponding to triangles that make up the triangle strip. Every three indices in the array is a separate triangle. Returns an empty array if 'vertexCount' is less than 3.
 * @example <caption>The following example sets appropriate indices for a mesh buffer with vertices ordered in triangle strip vertex order.</caption>
 * mesh.setIndices(
 * Meshes.triangleStripIndices(mesh.vertexCount())
 * .map(x=>mesh.getIndex(x)));
 */
Meshes.triangleStripIndices = function(vertexCount) {
  const ret = [];
  if(vertexCount >= 3) {
    const flip = false;
    let i;
    for (i = 2; i < vertexCount; i++) {
      ret.push(flip ? i - 2 : i - 1,
        flip ? i - 1 : i - 2, i);
    }
  }
  return ret;
};
/**
 * Creates an array of vertex indices corresponding to triangles that make up a series of quadrilaterals, where every 4 vertices is a separate quadrilateral.
 * @param {number} vertexCount Number of vertices that make up the quadrilaterals.
 * @returns {Array<number>} Array of vertex indices corresponding to triangles that make up the quadrilaterals. Every three indices in the array is a separate triangle. Returns an empty array if 'vertexCount' is less than 4. If 'vertexCount' is not divisible by 4, any excess vertices are ignored.
 * @example <caption>The following example sets appropriate indices for a mesh buffer with vertices ordered in quadrilateral vertex order.</caption>
 * mesh.setIndices(
 * Meshes.quadsIndices(mesh.vertexCount())
 * .map(x=>mesh.getIndex(x)));
 */
Meshes.quadsIndices = function(vertexCount) {
  const ret = [];
  if(vertexCount >= 4) {
    let i;
    for (i = 3; i < vertexCount; i += 4) {
      ret.push(i - 3, i - 2, i, i, i - 2, i - 1);
    }
  }
  return ret;
};

/**
 * Creates an array of vertex indices corresponding to triangles that make up a strip of quadrilaterals. For a quadrilateral strip, the first 4 vertices make up the first quadrilateral, and each additional
 * quadrilateral is made up of the last 2 vertices of the previous quadrilateral and
 * 2 new vertices.
 * @param {number} vertexCount Number of vertices that make up the quadrilateral strip.
 * @returns {Array<number>} Array of vertex indices corresponding to triangles that make up the quadrilateral strip. Every three indices in the array is a separate triangle. Returns an empty array if 'vertexCount' is less than 4. If 'vertexCount' is not divisible by 2, the excess vertex is ignored.
 * @example <caption>The following example sets appropriate indices for a mesh buffer with vertices ordered in quadrilateral strip vertex order.</caption>
 * mesh.setIndices(
 * Meshes.quadStripIndices(mesh.vertexCount())
 * .map(x=>mesh.getIndex(x)));
 */
Meshes.quadStripIndices = function(vertexCount) {
  const ret = [];
  if(vertexCount >= 4) {
    let i;
    for (i = 3; i < vertexCount; i += 2) {
      ret.push(i - 3, i - 2, i - 1, i - 1, i - 2, i);
    }
  }
  return ret;
};

/**
 * Primitive mode for rendering a triangle fan. The first 3
 * vertices make up the first triangle, and each additional
 * triangle is made up of the first vertex of the first triangle,
 * the previous vertex, and 1 new vertex.
 * @constructor
 * @ignore
 */
const TriangleFan = function(indices) {
  this.indices = indices;
  this.start = -1;
  this.last = -1;
  this.addIndex = function(index) {
    if(this.start < 0) {
      this.start = index;
    } else if(this.last < 0) {
      this.last = index;
    } else {
      this.indices.push(this.start);
      this.indices.push(this.last);
      this.indices.push(index);
      this.last = index;
    }
  };
};
/**
 * TODO: Not documented yet.
 * @param {*} three TODO: Not documented yet.
 * @param {*} buffer TODO: Not documented yet.
 * @param {*} r TODO: Not documented yet.
 * @param {*} g TODO: Not documented yet.
 * @param {*} b TODO: Not documented yet.
 * @returns {*} TODO: Not documented yet.
 */
Meshes.setColor=function(three,buffer,r,g,b){
 var color=toGLColor(r,g,b)
 var ret=[]
 var pos=0
 for(var i=0;i<buffer.index.count;i++,pos+=3){
  ret[pos]=color[0]
  ret[pos+1]=color[1]
  ret[pos+2]=color[2]
 }
 buffer.setAttribute("color",
    new three["BufferAttribute"](new Float32Array(ret),3))
 return buffer
}

function normNormals(buffer) {
  buffer["normalizeNormals"]();
  return buffer;
}
/**
 * TODO: Not documented yet.
 * @param {*} buffer TODO: Not documented yet.
 * @returns {*} TODO: Not documented yet.
 */
Meshes.reverseWinding=function(buffer){
  var arr=buffer["index"]["array"]
  if(arr.length%3!=0)throw new Error()
  for(var pos=0;pos<arr.length;pos+=3){
    var t=arr[pos+1]
    arr[pos+1]=arr[pos+2]
    arr[pos+2]=t
  }
  return buffer
}

/**
 * TODO: Not documented yet.
 * @param {*} buffer TODO: Not documented yet.
 * @param {*} inside TODO: Not documented yet.
 * @returns {*} TODO: Not documented yet.
 */
Meshes.recalcNormals=function(buffer,inside) {
 buffer["computeVectorNormals"]();
 if(inside){
  var attr=buffer.getAttribute("normal")
  if(attr){
  for(var i=0;i<attr.count;i++){
   attr.setX(i,-attr.getX(i))
   attr.setY(i,-attr.getY(i))
   attr.setZ(i,-attr.getZ(i))
  }
  }
 }
 return buffer;
}
/**
 * TODO: Not documented yet.
 * @param {*} three TODO: Not documented yet.
 * @param {Array<number>} vertices TODO: Not documented yet.
 * @param {Array<number>} [indices] TODO: Not documented yet.
 * @returns {*} A buffer geometry. TODO: Not documented yet.
 */
Meshes.fromPositions=function(three,vertices,indices) {
  if(!three["BufferGeometry"])return null;
  if(!indices){
    indices=[]
    for(var i=0;i<(vertices.length/3)|0;i++){
       indices[i]=i
    }
  }
  var geom=new three["BufferGeometry"]()
  var attr;
  var buffer=new three["InterleavedBuffer"](new Float32Array(vertices),3)
  attr=new three["InterleavedBufferAttribute"](buffer,3,0)
  geom["setAttribute"]("position",attr)
  geom.index=new three["BufferAttribute"](new Uint32Array(indices),1)
  return geom
}
/**
 * TODO: Not documented yet.
 * @param {*} three TODO: Not documented yet.
 * @param {Array<number>} vertices TODO: Not documented yet.
 * @param {Array<number>} indices TODO: Not documented yet.
 * @returns {*} TODO: Not documented yet.
 */
Meshes.fromPositionsAutoNormals=function(three,vertices,indices) {
  return Meshes.recalcNormals(Meshes.fromPositions(three,vertices,indices), false)
}

function fromVertsTwoAttr(three,vertices,indices, a1, a2) {
  if(!three["BufferGeometry"])return null;
  if(!indices){
    indices=[]
    for(var i=0;i<(vertices.length/6)|0;i++){
       indices[i]=i
    }
  }
  var geom=new three["BufferGeometry"]()
  var attr;
  var buffer=new three["InterleavedBuffer"](new Float32Array(vertices),6)
  attr=new three["InterleavedBufferAttribute"](buffer,3,0)
  geom["setAttribute"](a1,attr)
  attr=new three["InterleavedBufferAttribute"](buffer,3,3)
  geom["setAttribute"](a2,attr)
  geom.index=new three["BufferAttribute"](new Uint32Array(indices),1)
  // NOTE: Pass the return value to the <code>THREE.Mesh</code>, <code>THREE.LineSegments</code>, or <code>THREE.Points</code> constructor to generate the appropriate kind of shape object depending on the buffer geometry's primitive type.
  return geom
}
/**
 * TODO: Not documented yet.
 * @param {*} three TODO: Not documented yet.
 * @param {*} vertices TODO: Not documented yet.
 * @param {*} indices TODO: Not documented yet.
 * @returns {*} TODO: Not documented yet.
 */
Meshes.fromPositionsNormals=function(three,vertices,indices) {
  return fromVertsTwoAttr(three,vertices,indices,"position","normal")
}
/**
 * TODO: Not documented yet.
 * @param {*} three TODO: Not documented yet.
 * @param {*} vertices TODO: Not documented yet.
 * @param {*} indices TODO: Not documented yet.
 * @returns {*} TODO: Not documented yet.
 */
Meshes.fromPositionsColors=function(three,vertices,indices) {
  return fromVertsTwoAttr(three,vertices,indices,"position","color")
}

/**
 * TODO: Not documented yet.
 * @param {*} three TODO: Not documented yet.
 * @param {Array<number>} vertices TODO: Not documented yet.
 * @param {Array<number>} indices TODO: Not documented yet.
 * @returns {*} TODO: Not documented yet.
 */
Meshes.fromPositionsNormalsUV=function(three,vertices,indices) {
  if(!three["BufferGeometry"])return null;
  var geom=new three["BufferGeometry"]()
  var attr;
  var buffer=new three["InterleavedBuffer"](new Float32Array(vertices),8)
  attr=new three["InterleavedBufferAttribute"](buffer,3,0)
  geom["setAttribute"]("position",attr)
  attr=new three["InterleavedBufferAttribute"](buffer,3,3)
  geom["setAttribute"]("normal",attr)
  attr=new three["InterleavedBufferAttribute"](buffer,2,6)
  geom["setAttribute"]("uv",attr)
  geom.index=new three["BufferAttribute"](new Uint32Array(indices),1)
  // NOTE: Pass the return value to the <code>THREE.Mesh</code>, <code>THREE.LineSegments</code>, or <code>THREE.Points</code> constructor to generate the appropriate kind of shape object depending on the buffer geometry's primitive type.
  return geom
}

function meshBufferFromVertexGrid(three, vertices, width, height) {
  const indices = [];
  let y;
  for (y = 0; y < height - 1; y++) {
    let x;
    for (x = 0; x < width - 1; x++) {
      const index0 = y * width + x;
      const index1 = index0 + width;
      const index2 = index0 + 1;
      const index3 = index1 + 1;
      indices.push(index0, index1, index2);
      indices.push(index2, index1, index3);
    }
  }
  return Meshes.fromPositionsNormalsUV(three, vertices, indices);
}

function meshBufferFromUWrapVertexGrid(three, vertices, width, height) {
  const indices = [];
  let y;
  for (y = 0; y < height - 1; y++) {
    let x;
    for (x = 0; x < width; x++) {
      const index0 = y * width + x;
      const index1 = index0 + width;
      const index2 = x === width - 1 ? y * width : index0 + 1;
      const index3 = x === width - 1 ? (y + 1) * width : index1 + 1;
      indices.push(index0, index1, index2);
      indices.push(index2, index1, index3);
    }
  }
  return Meshes.fromPositionsNormalsUV(three, vertices, indices);
}

/**
 * Creates a mesh of a box (rectangular prism), which
 * will be centered at the origin.
 * Will create texture coordinates such that the same texture
 * is used on each face of the box. Texture coordinates are generated assuming that the coordinate (0,0)
 * is at the lower-left corner of the texture and (1,1) is at the upper-right
 * corner. The resulting mesh buffer
 * will use 36 vertex indices divided into 12 triangles, with each
 * face using two triangles. The faces will be ordered as follows:
 * Negative-x axis-facing face, positive-x axis-facing face, negative-y axis-facing face,
 * positive-y axis-facing face, negative-z axis-facing face, positive-z axis-facing face.
 * @param {number} xSize Width of the box.
 * @param {number} ySize Height of the box.
 * @param {number} zSize Depth of the box. If xSize, ySize, and zSize are the
 * same number, the result is a cube.
 * @param {boolean} [inward] If true, the normals generated by this
 * method will point inward; otherwise, outward. Should normally be false
 * unless the box will be viewed from the inside.
 * @returns {*} A buffer geometry. The generated mesh.
 */
Meshes.createBox = function(three,xSize, ySize, zSize, inward) {
  const x = 0.5 * xSize;
  const y = 0.5 * ySize;
  const z = 0.5 * zSize;
  return Meshes.createBoxEx(three,[-x, -y, -z, x, y, z], inward);
};

/**
 * Creates a mesh of a box (rectangular prism) given the box's smallest and largest coordinates.
 * Will create texture coordinates such that the same texture
 * is used on each face of the box. Texture coordinates are generated assuming that the coordinate (0,0)
 * is at the lower-left corner of the texture and (1,1) is at the upper-right
 * corner. The resulting mesh buffer
 * will use 36 vertex indices divided into 12 triangles, with each
 * face using two triangles. The faces will be ordered as follows:
 * Negative-x axis-facing face, positive-x axis-facing face, negative-y axis-facing face,
 * positive-y axis-facing face, negative-z axis-facing face, positive-z axis-facing face.
 * @param {Array<number>} box An axis-aligned bounding
 * box, which is an array of six values, that bounds the box mesh.
 * The first three values are the smallest x-, y-, and z-coordinates,
 * and the last three values are the largest X, Y, and Z
 * coordinates. If the dimensions along all three axes are the
 * same, the result is a cube.
 * @param {boolean} [inward] If true, the normals generated by this
 * method will point inward; otherwise, outward. Should normally be false
 * unless the box will be viewed from the inside.
 * @returns {*} A buffer geometry. The generated mesh.  Throws an error if "box" is null or contains negative dimensions along any of its axes.
 * @example <caption>The following example creates a wire-frame box of the given corner coordinates (<code>box</code>) and color (<code>color</code>).</caption>
 * var boxMesh=Meshes.createBoxEx(box)
 * .setColor(color).wireFrame()
 */
Meshes.createBoxEx = function(three,box, inward) {
  if(!box)throw new Error();
  const dims = MathUtil.boxDimensions(box);
  if(dims[0] < 0 || dims[1] < 0 || dims[2] < 0)throw new Error();
  const posNormal = inward ? -1.0 : 1.0;
  const negNormal = inward ? 1.0 : -1.0;
  // Position X, Y, Z, normal NX, NY, NZ, texture U, V
  const vertices = [
    box[0], box[1], box[5], negNormal, 0.0, 0.0, 1.0, 0.0,
    box[0], box[4], box[5], negNormal, 0.0, 0.0, 1.0, 1.0,
    box[0], box[4], box[2], negNormal, 0.0, 0.0, 0.0, 1.0,
    box[0], box[1], box[2], negNormal, 0.0, 0.0, 0.0, 0.0,
    box[3], box[1], box[2], posNormal, 0.0, 0.0, 1.0, 0.0,
    box[3], box[4], box[2], posNormal, 0.0, 0.0, 1.0, 1.0,
    box[3], box[4], box[5], posNormal, 0.0, 0.0, 0.0, 1.0,
    box[3], box[1], box[5], posNormal, 0.0, 0.0, 0.0, 0.0,
    box[3], box[1], box[2], 0.0, negNormal, 0.0, 1.0, 0.0,
    box[3], box[1], box[5], 0.0, negNormal, 0.0, 1.0, 1.0,
    box[0], box[1], box[5], 0.0, negNormal, 0.0, 0.0, 1.0,
    box[0], box[1], box[2], 0.0, negNormal, 0.0, 0.0, 0.0,
    box[3], box[4], box[5], 0.0, posNormal, 0.0, 1.0, 0.0,
    box[3], box[4], box[2], 0.0, posNormal, 0.0, 1.0, 1.0,
    box[0], box[4], box[2], 0.0, posNormal, 0.0, 0.0, 1.0,
    box[0], box[4], box[5], 0.0, posNormal, 0.0, 0.0, 0.0,
    box[0], box[1], box[2], 0.0, 0.0, negNormal, 1.0, 0.0,
    box[0], box[4], box[2], 0.0, 0.0, negNormal, 1.0, 1.0,
    box[3], box[4], box[2], 0.0, 0.0, negNormal, 0.0, 1.0,
    box[3], box[1], box[2], 0.0, 0.0, negNormal, 0.0, 0.0,
    box[3], box[1], box[5], 0.0, 0.0, posNormal, 1.0, 0.0,
    box[3], box[4], box[5], 0.0, 0.0, posNormal, 1.0, 1.0,
    box[0], box[4], box[5], 0.0, 0.0, posNormal, 0.0, 1.0,
    box[0], box[1], box[5], 0.0, 0.0, posNormal, 0.0, 0.0];
  const indices = [0, 1, 2, 0, 2, 3, 4, 5, 6, 4, 6, 7, 8, 9, 10, 8, 10, 11, 12,
    13, 14, 12, 14, 15, 16, 17, 18, 16, 18, 19, 20, 21, 22, 20, 22, 23];
  return Meshes.fromPositionsNormalsUV(three,vertices, indices);
};

/**
 * Creates a mesh of a cylinder or cone. The cylinder's base will
 * be centered at the origin and its height will run along the
 * positive z-axis. The base and top themselves will not be
 * included in the mesh.<p>
 * Texture coordinates for the cylinder (other than the base) will
 * be generated such that the V (vertical)
 * coordinates start from the bottom of the texture and increase from the origin
 * to the positive z-axis, and the U (horizontal) coordinates start from the left of the
 * texture and increase from the positive X to positive Y to negative X to negative
 * Y to positive x-axis. Texture coordinates are generated assuming that the coordinate (0,0)
 * is at the lower-left corner of the texture and (1,1) is at the upper-right
 * corner. <p>
 * The x-, y-, and z-coordinates of a point on the cylinder are
 * <code>(-R*cos(&lambda;), -R*sin(&lambda;), H*&phi;)</code>,
 * where &phi; = <code>(&pi;/2 + L)/&pi;</code>, L is the latitude in radians,
 * &lambda; is the longitude in radians, H = <code>height</code>,
 * R = <code>baseRad + (topRad - baseRad) * &phi;</code>,
 * and west and south latitudes and
 * longitudes are negative. (The formula for converting latitude
 * and longitude is mentioned here because their meaning depends on
 * exactly how the texture coordinates are generated on the cylinder.
 * It assumes that in the texture, longitudes range from -180&deg; to 0&deg; to 180&deg; from
 * left to right, and latitudes range from 90&deg; to 0&deg; to -90&deg; from top to bottom.)<p>
 * See the "{@tutorial shapes}" tutorial.
 * @param {number} baseRad Radius of the base of the cylinder. If 0,
 * this function will create an approximation to a downward pointing cone.
 * @param {number} topRad Radius of the top of the cylinder. If 0,
 * this function will create an approximation to an upward pointing cone.
 * @param {number} height Height of the cylinder.
 * @param {number} [slices] Number of lengthwise "slices" the cylinder consists
 * of, each slice going through the center of the cylinder. This function will
 * create a triangular prism if "slices" is 3
 * and both radii are the same; a triangular pyramid if "slices" is
 * 3 and either radius is zero; a rectangular prism if "slices" is 4
 * and both radii are the same; and a rectangular pyramid if "slices"
 * is 4 and either radius is zero. Must be 3 or greater.
 * May be null, undefined, or omitted, in which case the default is 32.
 * @param {number} [stacks] Number of vertical stacks the cylinder consists of.
 * May be null, undefined, or omitted, in which case the default is 1.
 * @param {boolean} [flat] If true, will generate normals such that the
 * cylinder will be flat shaded; otherwise, will generate normals such that the
 * cylinder will be smooth shaded.
 * @param {boolean} [inside] If true, the normals generated by this
 * method will point inward; otherwise, outward. Should normally be false
 * unless the cylinder will be viewed from the inside.
 * @returns {*} A buffer geometry. The generated mesh.
 */
Meshes.createCylinder = function(three,baseRad, topRad, height, slices, stacks, flat, inside) {
  if(typeof slices === "undefined" || slices === null)slices = 32;
  if(typeof stacks === "undefined" || stacks === null)stacks = 1;
  if(slices <= 2)throw new Error("too few slices");
  if(stacks < 1)throw new Error("too few stacks");
  if(height < 0)throw new Error("negative height");
  if(baseRad <= 0 && topRad <= 0 || height === 0) {
  // both baseRad and topRad are zero or negative,
  // or height is zero
    return new three["BufferGeometry"]();
  }
  const normDir = inside ? -1 : 1;
  const sc = [];
  const tc = [];
  const angleStep = MathUtil.PiTimes2 / slices;
  const cosStep = Math.cos(angleStep);
  const sinStep = angleStep <= 3.141592653589793 ? Math.sqrt(1.0 - cosStep * cosStep) : -Math.sqrt(1.0 - cosStep * cosStep);
  let sangle = 1.0; // sin(90.0deg)
  let cangle = 0; // cos(90.0deg)
  let i;
  for (i = 0; i < slices; i++) {
    const t = i * 1.0 / slices;
    sc.push(sangle, cangle);
    tc.push(t);
    const tsin = cosStep * sangle + sinStep * cangle;
    const tcos = cosStep * cangle - sinStep * sangle;
    cangle = tcos;
    sangle = tsin;
  }
  sc.push(sc[0], sc[1]);
  tc.push(1);
  if(height > 0) {
    let sinSlopeNorm;
    let cosSlopeNorm;
    if(baseRad === topRad) {
      sinSlopeNorm = 0;
      cosSlopeNorm = normDir;
    } else {
      let dy = baseRad - topRad;
      let dx = height;
      const len = Math.sqrt(dx * dx + dy * dy);
      // Convert to a unit vector
      if(len !== 0) {
        const ilen = 1.0 / len;
        dy *= ilen;
        dx *= ilen;
      }
      cosSlopeNorm = dx * normDir;
      sinSlopeNorm = dy * normDir;
    }
    const recipstacks = 1.0 / stacks;
    const vertices = [];
    let i;
    for (i = 0; i <= stacks; i++) {
      const zStart = i === stacks ? 1.0 : i * recipstacks;
      const zStartHeight = height * zStart;
      const radiusStart = baseRad + (topRad - baseRad) * zStart;
      let j;
      for (j = 0; j <= slices; j++) {
        const x = sc[j * 2];

        const y = sc[j * 2 + 1];
        vertices.push(x * radiusStart, y * radiusStart, zStartHeight,
          x * cosSlopeNorm, y * cosSlopeNorm, sinSlopeNorm,
          1 - tc[j], zStart);
      }
    }
    const mesh = meshBufferFromVertexGrid(three,vertices, slices + 1, stacks + 1);
    return flat ? Meshes.recalcNormals(mesh["toNonIndexed"](),inside) : mesh;
  } else {
    return Meshes.fromPositionsNormalsUV(three,[], []);
  }
};
/**
 * Creates a mesh of a figure generated by revolving a path of 2-dimensional
 * points about the z-axis.<p>
 * Texture coordinates will
 * be generated such that the V (vertical)
 * coordinates start from the bottom of the texture and increase along the z-axis in the direction
 * of the given path, and the U (horizontal) coordinates start from the left of the
 * texture and increase from the positive X to positive Y to negative X to negative
 * Y to positive x-axis. Texture coordinates are generated assuming that the coordinate (0,0)
 * is at the lower-left corner of the texture and (1,1) is at the upper-right
 * corner. <p>
 * @param {Array<number>} points Array of alternating x- and z-coordinates describing
 * a two-dimensional path that will revolve around the z-axis to generate the figure
 * (the first number is an x-coordinate, the second is a z-coordinate, and so on).
 * Each z-coordinate is a z-coordinate of the point where the path lies, and
 * each x-coordinate is the radius of the figure at that point. The z-coordinates
 * should be given in increasing order and should not be the same from
 * one point to the next. This parameter's
 * length must be 4 or greater and be an even number.
 * @param {number} [slices] Number of lengthwise "slices" the figure consists of.
 * Must be 3 or greater. May be null or omitted; default is 32.
 * @param {boolean} [flat] If true, will generate normals such that the
 * figure will be flat shaded; otherwise, will generate normals such that the
 * figure will be smooth shaded.
 * @param {boolean} [inside] If true, the normals generated by this
 * method will point inward; otherwise, outward. Should normally be false
 * unless the figure will be viewed from the inside.
 * @returns {*} A buffer geometry. The generated mesh.
 */
Meshes.createLathe = function(three,points, slices, flat, inside) {
  // NOTE: y-coordinate should not be the same from one point to the next
  if(points.length < 4)throw new Error("too few points");
  if(typeof slices === "undefined" || slices === null)slices = 32;
  if(slices <= 2)throw new Error("too few slices");
  if(points.length % 1 !== 0)throw new Error("points array length is not an even number");
  let i;
  for(i = 0; i < points.length; i += 2) {
    if(points[i << 1] < 0)throw new Error("point's x is less than 0");
  }
  const sc = [];
  const tc = [];
  const angleStep = MathUtil.PiTimes2 / slices;
  const cosStep = Math.cos(angleStep);
  const sinStep = angleStep <= 3.141592653589793 ? Math.sqrt(1.0 - cosStep * cosStep) : -Math.sqrt(1.0 - cosStep * cosStep);
  let sangle = 1.0; // sin(90.0deg)
  let cangle = 0; // cos(90.0deg)
  for(i = 0; i < slices; i++) {
    const t = i * 1.0 / slices;
    sc.push(sangle, cangle);
    tc.push(t);
    const tsin = cosStep * sangle + sinStep * cangle;
    const tcos = cosStep * cangle - sinStep * sangle;
    cangle = tcos;
    sangle = tsin;
  }
  sc.push(sc[0], sc[1]);
  tc.push(1);
  const stacks = points.length / 2 - 1;
  const recipstacks = 1.0 / stacks;
  const vertices = [];
  for(i = 0; i <= stacks; i++) {
    const zStart = i === stacks ? 1.0 : i * recipstacks;
    const index = i << 1;
    const zStartHeight = points[index + 1];
    const radiusStart = points[index];
    let j;
    for (j = 0; j <= slices; j++) {
      vertices.push(sc[j * 2] * radiusStart,
        sc[j * 2 + 1] * radiusStart, zStartHeight,
        0, 0, 0,
        1 - tc[j], zStart);
    }
  }
  const mesh = meshBufferFromVertexGrid(three,vertices, slices + 1, stacks + 1);
  return Meshes.recalcNormals((flat ? mesh["toNonIndexed"]() : mesh),inside);
};

function matTo4D(three, mat){
var r=new three["Matrix4"]()
r.set(mat[0],mat[4],mat[8],mat[12],
      mat[1],mat[5],mat[9],mat[13],
      mat[2],mat[6],mat[10],mat[14],
      mat[3],mat[7],mat[11],mat[15])
return r
}

/**
 * Creates a mesh of a closed cylinder or closed cone. The cylinder's base will
 * be centered at the origin and its height will run along the
 * positive z-axis. The base and top will be included in the mesh if
 * their radius is greater than 0. Will generate texture coordinates for
 * the cylinder and for the base and top.
 * The base's and top's texture coordinates will be such that the
 * texture will be flat as seen from either. Texture coordinates are generated assuming that the coordinate (0,0)
 * is at the lower-left corner of the texture and (1,1) is at the upper-right
 * corner. <p>
 * See {@link Meshes.createCylinder} for information on how texture
 * coordinates for the cylinder (other than the base and top) are generated and how
 * to find the coordinates of a particular point on the cylinder.<p>
 * See the "{@tutorial shapes}" tutorial.
 * @param {number} baseRad Radius of the base of the cylinder.
 * See {@link Meshes.createCylinder}.
 * @param {number} topRad Radius of the top of the cylinder.
 * See {@link Meshes.createCylinder}.
 * @param {number} height Height of the cylinder.
 * @param {number} slices  Number of lengthwise "slices" the cylinder consists
 * of. See {@link Meshes.createCylinder}.
 * @param {number} stacks Number of vertical stacks the cylinder consists of.
 * May be null, undefined, or omitted, in which case the default is 1.
 * @param {boolean} [flat] If true, will generate normals such that the
 * cylinder will be flat shaded; otherwise, will generate normals such that the
 * cylinder will be smooth shaded.
 * @param {boolean} [inside] If true, the normals generated by this
 * method will point inward; otherwise, outward. Should normally be false
 * unless the cylinder will be viewed from the inside.
 * @returns {*} A buffer geometry. The generated mesh.
 * @example <caption>The following method creates a cone that's closed at its base.
 * <img src="mesh1.png"></caption>
 * function createClosedCone(radius,height,slices) {
 * return Meshes.createClosedCylinder(radius,0,height,slices,1);
 * }
 */
Meshes.createClosedCylinder = function(three,baseRad, topRad, height, slices, stacks, flat, inside) {
  const cylinder = Meshes.createCylinder(three["THREE"],baseRad, topRad, height, slices, stacks, flat, inside);
  const base = Meshes.reverseWinding(Meshes.createDisk(three["THREE"],0.0, baseRad, slices, 2, !inside));
  const top = Meshes.createDisk(three["THREE"],0.0, topRad, slices, 2, inside);
  // move the top disk to the top of the cylinder
  top.applyMatrix4(matTo4D(three["THREE"],MathUtil.mat4translated(0, 0, height)));
  // merge the base and the top
  return three["BufferGeometryUtils"]["mergeGeometries"]([cylinder,base,top],false);
};

/**
 * Creates a mesh of a 2D circular disk or regular polygon, possibly with a hole in the middle, centered at the origin.
 * Assuming the y-axis points up, the x-axis right,
 * and the z-axis backward from the "eye", the first vertex in the outer edge
 * of the 2D disk will be at the 12 o'clock position.
 * Will also generate texture coordinates, assuming that the coordinate (0,0)
 * is at the lower-left corner of the texture and (1,1) is at the upper-right
 * corner.
 * See the "{@tutorial shapes}" tutorial.
 * @param {number} inner Radius of the hole in the middle of the
 * disk. If 0, no hole is created and the method will generate a regular
 * polygon with n sides, where n is the value of "slices". For example,
 * if "inner" is 0 and "slices" is 3, the result will be an equilateral triangle;
 * a square for 4 "slices", a regular pentagon for 5 "slices", and so on.
 * @param {number} outer Outer radius of the disk.
 * @param {number} [slices] Number of slices going around the disk.
 * May be null or omitted; default is 16.
 * @param {number} [loops] Number of concentric rings the disk makes up.
 * May be null or omitted; default is 1.
 * @param {boolean} [inward] If true, the normals generated by this
 * method will point in the opposite direction of the positive z-axis; otherwise,
 * in the same direction of the positive z-axis. Default is false.
 * @returns {*} A buffer geometry. The generated mesh.
 */
Meshes.createDisk = function(three,inner, outer, slices, loops, inward) {
  return Meshes.createPartialDisk(three,inner, outer, slices, loops, 0, 360, inward);
};

/**
 * Creates a mesh of a 2D circular disk or regular polygon or a part of either, possibly with a hole where the middle of the complete disk or polygon would be; the middle of the complete disk or polygon is placed at the origin.
 * Will also generate texture coordinates, assuming that the coordinate (0,0)
 * is at the lower-left corner of the texture and (1,1) is at the upper-right
 * corner.
 * See the "{@tutorial shapes}" tutorial.
 * @param {number} inner Radius of the hole where the middle of the
 * complete disk would be. If 0, no hole is created.
 * @param {number} outer Outer radius of the disk.
 * @param {number} [slices] Number of slices going around the partial disk.
 * May be null or omitted; default is 32.
 * @param {number} [loops] Number of concentric rings the partial disk makes up.
 * May be null or omitted; default is 1.
 * @param {number} [start] Starting angle of the partial disk, in degrees.
 * May be null or omitted; default is 0.
 * 0 degrees is at the positive y-axis,
 * and 90 degrees at the positive x-axis.
 * Assuming the y-axis points up, the x-axis right,
 * and the z-axis backward from the "eye", 0 degrees is at the 12 o'clock position,
 * and 90 degrees at the 3 o'clock position.
 * @param {number} [sweep] Arc length of the partial disk, in degrees.
 * May be null or omitted; default is 360. May be negative.
 * @param {boolean} [inward] If true, the normals generated by this
 * method will point in the opposite direction of the positive z-axis; otherwise,
 * in the same direction of the positive z-axis. Default is false.
 * @returns {*} A buffer geometry. The generated mesh.
 */
Meshes.createPartialDisk = function(three,inner, outer, slices, loops, start, sweep, inward) {
  if(typeof slices === "undefined" || slices === null)slices = 32;
  if(typeof loops === "undefined" || loops === null)loops = 1;
  if(typeof start === "undefined" || start === null)start = 0;
  if(typeof sweep === "undefined" || sweep === null)sweep = 360;
  if(slices <= 2)throw new Error("too few slices");
  if(loops < 1)throw new Error("too few loops");
  if(inner > outer)throw new Error("inner greater than outer");
  if(inner < 0)inner = 0;
  if(outer < 0)outer = 0;
  if(outer === 0 || sweep === 0)return new three["BufferGeometry"]();
  const fullCircle = sweep === 360 && start === 0;
  const sweepDir = sweep < 0 ? -1 : 1;
  if(sweep < 0)sweep = -sweep;
  sweep %= 360;
  if(sweep === 0)sweep = 360;
  const sc = [];
  const tc = [];
  let i;
  const twopi = MathUtil.PiTimes2;
  let arcLength = sweep === 360 ? twopi : sweep * MathUtil.PiDividedBy180;
  start *= MathUtil.PiDividedBy180;
  if(sweepDir < 0) {
    arcLength = -arcLength;
  }
  const angleStep = arcLength / slices;
  const cosStep = Math.cos(angleStep);
  const sinStep = angleStep >= 0 && angleStep < 6.283185307179586 ? angleStep <= 3.141592653589793 ? Math.sqrt(1.0 - cosStep * cosStep) : -Math.sqrt(1.0 - cosStep * cosStep) : Math.sin(angleStep);
  let cangle = Math.cos(start);
  let sangle = start >= 0 && start < 6.283185307179586 ? start <= 3.141592653589793 ? Math.sqrt(1.0 - cangle * cangle) : -Math.sqrt(1.0 - cangle * cangle) : Math.sin(start);
  const cstart = cangle;
  const sstart = sangle;

  let radius;

  let height;
  let vertices;
  for(i = 0; i <= slices; i++) {
    if(i === slices && arcLength === twopi) {
      sc.push(sstart, cstart);
    } else {
      sc.push(sangle, cangle);
    }
    const t = i * 1.0 / slices;
    tc.push(t);
    const tsin = cosStep * sangle + sinStep * cangle;
    const tcos = cosStep * cangle - sinStep * sangle;
    cangle = tcos;
    sangle = tsin;
  }
  if(fullCircle) {
    sc[0] = 0;
    sc[1] = 1;
    sc[sc.length - 1] = 1;
    sc[sc.length - 2] = 0;
    tc[0] = 0;
    tc[tc.length - 1] = 1;
  }
  const normalZ = inward ? -1 : 1;
  const slp1 = sweep === 360 ? slices : slices + 1;
  let x;
  let y;
  let k;
  let rso;
  if(inner === 0 && loops === 1 && sweep === 360) {
    vertices = [];
    const indices = [];
    const fan = new TriangleFan(indices);
    const radius = outer;
    rso = radius / outer;
    for(k = 0; k < slices; k++) {
      x = sc[k*2];
      y = sc[k*2 + 1];
      vertices.push(x * radius, y * radius, 0,
        0, 0, normalZ,
        (1 + x * rso) * 0.5, (1 + y * rso) * 0.5);
      fan.addIndex(k);
    }
    fan.addIndex(0);
    return Meshes.fromPositionsNormalsUV(three,vertices, indices);
  } else {
    height = outer - inner;
    const invouter = 1.0 / outer;
    vertices = [];
    for(i = 0; i <= loops; i++) {
      radius = inner + height * (i / loops);
      rso = radius * invouter;
      for(k = 0; k < slp1; k++) {
        x = sc[k*2];
        y = sc[k*2 + 1];
        vertices.push(x * radius, y * radius, 0,
          0, 0, normalZ,
          (1 + x * rso) * 0.5, (1 + y * rso) * 0.5);
      }
    }
    return sweep === 360 ?
      meshBufferFromUWrapVertexGrid(three,vertices, slp1, loops + 1) :
      meshBufferFromVertexGrid(three,vertices, slp1, loops + 1);
  }
};

/**
 * Creates a mesh of a torus (doughnut shape), centered at the origin.
 * Will also generate texture coordinates, assuming that the coordinate (0,0)
 * is at the lower-left corner of the texture and (1,1) is at the upper-right
 * corner.
 * See the "{@tutorial shapes}" tutorial.
 * @param {number} inner Inner radius (thickness) of the torus.
 * @param {number} outer Outer radius of the torus (distance from the
 * center to the innermost part of the torus).
 * @param {number} [lengthwise] Number of lengthwise subdivisions.
 * May be null or omitted; default is 16.
 * @param {number} [crosswise] Number of crosswise subdivisions.
 * May be null or omitted; default is 16.
 * @param {boolean} [flat] If true, will generate normals such that the
 * torus will be flat shaded; otherwise, will generate normals such that it
 * will be smooth shaded.
 * @param {boolean} [inward] If true, the normals generated by this
 * method will point inward; otherwise, outward. Default is false.
 * @returns {*} A buffer geometry. The generated mesh.
 */
Meshes.createTorus = function(three,inner, outer, lengthwise, crosswise, flat, inward) {
  if(typeof crosswise === "undefined" || crosswise === null)crosswise = 16;
  if(typeof lengthwise === "undefined" || lengthwise === null)lengthwise = 16;
  if(crosswise < 3)throw new Error("crosswise is less than 3");
  if(lengthwise < 3)throw new Error("lengthwise is less than 3");
  if(inner < 0 || outer < 0)throw new Error("inner or outer is less than 0");
  if(outer === 0 || inner === 0)return new three["BufferGeometry"]();
  const tubeRadius = inner;
  const circleRad = outer;
  const sci = [];
  const scj = [];
  let cangle;
  let sangle;
  let u;
  let angleStep = MathUtil.PiTimes2 / crosswise;
  let cosStep = Math.cos(angleStep);
  let sinStep = angleStep >= 0 && angleStep < 6.283185307179586 ? angleStep <= 3.141592653589793 ? Math.sqrt(1.0 - cosStep * cosStep) : -Math.sqrt(1.0 - cosStep * cosStep) : Math.sin(angleStep);
  sangle = 0.0; // sin(0.0deg)
  cangle = 1.0; // cos(0.0deg)
  let i;
  for (i = 0; i < crosswise; i++) {
    sci.push(sangle, cangle);
    const ts = cosStep * sangle + sinStep * cangle;
    const tc = cosStep * cangle - sinStep * sangle;
    cangle = tc;
    sangle = ts;
  }
  sci.push(sci[0]);
  sci.push(sci[1]);
  angleStep = MathUtil.PiTimes2 / lengthwise;
  cosStep = Math.cos(angleStep);
  sinStep = angleStep >= 0 && angleStep < 6.283185307179586 ? angleStep <= 3.141592653589793 ? Math.sqrt(1.0 - cosStep * cosStep) : -Math.sqrt(1.0 - cosStep * cosStep) : Math.sin(angleStep);
  sangle = 0.0; // sin(0.0deg)
  cangle = 1.0; // cos(0.0deg)
  let ts;
  let tc;
  for (i = 0; i < lengthwise; i++) {
    scj.push(sangle, cangle);
    ts = cosStep * sangle + sinStep * cangle;
    tc = cosStep * cangle - sinStep * sangle;
    cangle = tc;
    sangle = ts;

  }
  scj.push(scj[0]);
  scj.push(scj[1]);
  const vertices = [];
  let j;
  for (j = 0; j <= lengthwise; j++) {
    const v0 = j / lengthwise;
    const sinr0 = scj[j * 2];
    const cosr0 = scj[j * 2 + 1];
    let i;
    for (i = 0; i <= crosswise; i++) {
      u = i / crosswise;
      const sint = sci[i * 2];
      const cost = sci[i * 2 + 1];
      const x = cost * (circleRad + cosr0 * tubeRadius);
      const y = sint * (circleRad + cosr0 * tubeRadius);
      const z = sinr0 * tubeRadius;
      const nx = cosr0 * cost;
      const ny = cosr0 * sint;
      const nz = sinr0;
      vertices.push(x, y, z, nx, ny, nz, u, v0);
    }
  }
  const mesh = meshBufferFromVertexGrid(three,vertices, crosswise + 1, lengthwise + 1);
  return flat ? Meshes.recalcNormals(mesh["toNonIndexed"](),inward) : mesh;
};

/**
 * Creates a mesh of a 2D rectangle, centered at the origin.
 * The plane's z-coordinate will be 0.
 * Will also generate texture coordinates that increase toward
 * the positive x- and y-axes. The texture coordinates will range
 * from 0 to 1 on each end of the 2D rectangle. Texture coordinates are generated assuming that the coordinate (0,0)
 * is at the lower-left corner of the texture and (1,1) is at the upper-right
 * corner.
 * See the "{@tutorial shapes}" tutorial.
 * @param {number} [width] Width of the rectangle.
 * May be null or omitted; default is 1.
 * @param {number} [height] Height of the rectangle.
 * May be null or omitted; default is 1.
 * @param {number} [widthDiv] Number of horizontal subdivisions.
 * May be null or omitted; default is 1.
 * @param {number} [heightDiv] Number of vertical subdivisions.
 * May be null or omitted; default is 1.
 * @param {boolean} [inward] If true, the normals generated by this
 * method will point in the opposite direction of the positive z-axis; otherwise,
 * in the same direction of the positive z-axis. Default is false.
 * @returns {*} A buffer geometry. The generated mesh.
 */
Meshes.createPlane = function(three,width, height, widthDiv, heightDiv, inward) {
  if(typeof width === "undefined" || width === null)width = 1;
  if(typeof height === "undefined" || height === null)height = 1;
  if(typeof widthDiv === "undefined" || widthDiv === null)widthDiv = 1;
  if(typeof heightDiv === "undefined" || heightDiv === null)heightDiv = 1;
  if(width < 0 || height < 0)throw new Error("width or height is less than 0");
  if(heightDiv <= 0 || widthDiv <= 0)
    throw new Error("widthDiv or heightDiv is 0 or less");
  if(width === 0 || height === 0)return new three["BufferGeometry"]();
  const xStart = -width * 0.5;
  const yStart = -height * 0.5;
  const normalZ = inward ? -1 : 1;
  const vertices = [];
  let i;
  for (i = 0; i <= heightDiv; i++) {
    const iStart = i / heightDiv;
    const y = yStart + height * iStart;
    let j;
    for (j = 0; j <= widthDiv; j++) {
      const jx = j / widthDiv;
      const x = xStart + width * jx;
      vertices.push(x, y, 0, 0, 0, normalZ, jx, iStart);
    }
  }
  return meshBufferFromVertexGrid(three,vertices, widthDiv + 1, heightDiv + 1);
};

/**
 * Creates a mesh of a sphere, centered at the origin.<p>
 * Will also generate texture coordinates such that the V (vertical)
 * coordinates start from the bottom of the texture and increase from the negative
 * to positive z-axis, and the U (horizontal) coordinates start from the left of the
 * texture and increase from the positive X to positive Y to negative X to negative
 * Y to positive x-axis. Texture coordinates are generated assuming that the coordinate (0,0)
 * is at the lower-left corner of the texture and (1,1) is at the upper-right
 * corner. <p>
 * The x-, y-, and z-coordinates of a point on the sphere are
 * <code>(-R*cos(&delta;)*cos(&lambda;), -R*cos(&delta;)*sin(&lambda;), R*sin(&delta;))</code>,
 * where &delta; and &lambda; are the latitude and longitude, respectively, in radians, R is the sphere's radius,
 * and west and south latitudes and
 * longitudes are negative. (The formula for converting latitude
 * and longitude is mentioned here because their meaning depends on
 * exactly how the texture coordinates are generated on the sphere.
 * It assumes that in the texture, longitudes range from -180&deg; to 0&deg; to 180&deg; from
 * left to right, and latitudes range from 90&deg; to 0&deg; to -90&deg; from top to bottom.)<p>
 * See the "{@tutorial shapes}" tutorial.
 * @param {number} [radius] Radius of the sphere.
 * May be null, undefined, or omitted, in which case the default is 1.
 * @param {number} [slices] Number of vertical sections the sphere consists
 * of.  This function will create an octahedron if "slices" is 4 and "stacks" is 2.
 * Must be 3 or greater. May be null, undefined, or omitted, in which case the default is 16.
 * @param {number} [stacks] Number of horizontal sections the sphere consists of.
 * May be null, undefined, or omitted, in which case the default is 16.
 * @param {boolean} [flat] If true, will generate normals such that the
 * sphere will be flat shaded; otherwise, will generate normals such that the
 * sphere will be smooth shaded.
 * @param {boolean} [inside] If true, the normals generated by this
 * method will point inward; otherwise, outward. Should normally be false
 * unless the sphere will be viewed from the inside.
 * @returns {*} A buffer geometry. The generated mesh.
 */
Meshes.createSphere = function(three,radius, slices, stacks, flat, inside) {
  return Meshes._createCapsule(three,radius, 0, slices, stacks, 1, flat, inside);
};

/**
 * Creates a mesh of a capsule, centered at the origin.
 * The length of the capsule will run along the z-axis. (If the capsule
 * has a high length and a very low radius, it will resemble a 3D line
 * with rounded corners; see the example.)<p>
 * Will also generate texture coordinates such that the V (vertical)
 * coordinates start from the bottom of the texture and increase from the negative
 * to positive z-axis, and the U (horizontal) coordinates start from the left of the
 * texture and increase from the positive X to positive Y to negative X to negative
 * Y to positive x-axis. Texture coordinates are generated assuming that the coordinate (0,0)
 * is at the lower-left corner of the texture and (1,1) is at the upper-right
 * corner. <p>
 * If the "length" parameter is 0, the x-, y-, and z-coordinates of a point on the solid
 * are as described in {@link Meshes.createSphere}.
 * See the "{@tutorial shapes}" tutorial.
 * @param {number} [radius] Radius of each spherical
 * end of the capsule.
 * May be null, undefined, or omitted, in which case the default is 1.
 * @param {number} [length] Length of the middle section.
 * May be null, undefined, or omitted, in which case the default is 1.
 * If this value is 0, an approximation to a sphere will be generated.
 * @param {number} [slices] Number of vertical sections the capsule consists
 * of.  This function will create an octahedron if "slices" is 4 and "stacks" is 2.
 * Must be 3 or greater. May be null, undefined, or omitted, in which case the default is 16.
 * @param {number} [stacks] Number of horizontal sections
 * each spherical half consists of.
 * May be null, undefined, or omitted, in which case the default is 8.
 * @param {number} [middleStacks] Number of vertical sections
 * the middle of the capsule consists of.
 * May be null, undefined, or omitted, in which case the default is 1.
 * @param {boolean} [flat] If true, will generate normals such that the
 * capsule will be flat shaded; otherwise, will generate normals such that the
 * capsule will be smooth shaded.
 * @param {boolean} [inside] If true, the normals generated by this
 * method will point inward; otherwise, outward. Should normally be false
 * unless the capsule will be viewed from the inside.
 * @returns {*} A buffer geometry. The generated mesh.
 * @example <caption>The following method uses <code>createCapsule</code> to create a thin line-like 3D object. </caption>
 * // point1, point2 - end points of the line
 * // thickness - thickness of the line in units, default 1
 * function create3DLine(point1,point2,thickness) {
 * if(thickness==null)thickness=1
 * var vector=MathUtil.vec3sub(point1,point2);
 * var dist=MathUtil.vec3length(vector);
 * var normVector=MathUtil.vec3norm(vector);
 * var midPoint=MathUtil.vec3lerp(point1,point2,0.5);
 * var line=Meshes.createCapsule(thickness/2,dist,6,4);
 * var matrix=MathUtil.quatToMat4(
 * MathUtil.quatFromVectors([0,0,1],normVector));
 * matrix[12]=midPoint[0]
 * matrix[13]=midPoint[1]
 * matrix[14]=midPoint[2]
 * return line.transform(matrix);
 * }
 */
Meshes.createCapsule = function(three,radius, length, slices, stacks, middleStacks, flat, inside) {
  if(typeof stacks === "undefined" || stacks === null)stacks = 8;
  if(stacks < 1)throw new Error("too few stacks");
  return Meshes._createCapsule(three,radius, length, slices, stacks * 2, middleStacks, flat, inside);
};

/** @ignore */
Meshes._createCapsule = function(three,radius, length, slices, stacks, middleStacks, flat, inside) {
  if(typeof slices === "undefined" || slices === null)slices = 16;
  if(typeof stacks === "undefined" || stacks === null)stacks = 16;
  if(typeof middleStacks === "undefined" || middleStacks === null)middleStacks = 1;
  if(typeof radius === "undefined" || radius === null)radius = 1;
  if(typeof length === "undefined" || length === null)length = 1;
  if(stacks < 2)throw new Error("too few stacks");
  if(slices <= 2)throw new Error("too few slices");
  if(middleStacks < 1 && length > 0)throw new Error("too few middle stacks");
  if(length < 0)throw new Error("negative length");
  if(radius < 0)throw new Error("negative radius");
  if(radius === 0) {
  // radius is zero
    return new three["BufferGeometry"]();
  }
  let cangle;
  let sangle;
  const halfLength = length * 0.5;
  const halfStacks = stacks / 2;
  const normDir = inside ? -1 : 1;
  const sc = [];
  const scStack = [];
  const verticalTexCoords = [];
  const tc = [];
  let s;
  // Generate longitude and horizontal texture coordinates
  let angleStep = MathUtil.PiTimes2 / slices;
  let cosStep = Math.cos(angleStep);
  let sinStep = angleStep >= 0 && angleStep < 6.283185307179586 ? angleStep <= 3.141592653589793 ? Math.sqrt(1.0 - cosStep * cosStep) : -Math.sqrt(1.0 - cosStep * cosStep) : Math.sin(angleStep);
  sangle = 1.0; // sin(90.0deg)
  cangle = 0; // cos(90.0deg)
  let i;
  for (i = 0; i < slices; i++) {
    const t = i * 1.0 / slices;
    sc.push(sangle, cangle);
    tc.push(t);
    const tsin = cosStep * sangle + sinStep * cangle;
    const tcos = cosStep * cangle - sinStep * sangle;
    sangle = tsin;
    cangle = tcos;
  }
  sc.push(sc[0], sc[1]);
  tc.push(1);
  let sphereRatio = radius * 2;
  sphereRatio /= sphereRatio + length;
  const zEnd = [];
  zEnd.push(-1);
  scStack.push(0);
  verticalTexCoords.push(0);
  // Generate latitude and vertical texture coordinates
  angleStep = Math.PI / stacks;
  cosStep = Math.cos(angleStep);
  sinStep = angleStep >= 0 && angleStep < 6.283185307179586 ? angleStep <= 3.141592653589793 ? Math.sqrt(1.0 - cosStep * cosStep) : -Math.sqrt(1.0 - cosStep * cosStep) : Math.sin(angleStep);
  sangle = sinStep;
  cangle = cosStep;
  let tsin;
  let tcos;
  for (i = 0; i < stacks; i++) {
    const origt = (i + 1) * 1.0 / stacks;
    scStack.push(sangle);
    zEnd.push(-cangle);
    const tex = origt;
    verticalTexCoords.push(tex);
    tsin = cosStep * sangle + sinStep * cangle;
    tcos = cosStep * cangle - sinStep * sangle;
    sangle = tsin;
    cangle = tcos;
  }
  // Generate the vertex data
  const vertices = [];
  let tx;
  let x;
  let y;
  let gridHeight = 0;

  for (i = 0; i <= stacks; i++) {
    const zeCen = zEnd[i];
    let txe = verticalTexCoords[i];
    const zStartHeight = radius * zeCen;
    const offset = i < halfStacks ? -halfLength : halfLength;
    const radiusEnd = radius * scStack[i];
    gridHeight++;
    let j;
    for (j = 0; j <= slices; j++) {
      tx = tc[j];
      x = sc[j * 2];
      y = sc[j * 2 + 1];
      vertices.push(
        x * radiusEnd, y * radiusEnd, zStartHeight + offset,
        x * radiusEnd * normDir, y * radiusEnd * normDir, zStartHeight * normDir,
        1 - tx, txe);
    }
    if(i + 1 === halfStacks && length > 0) {
      const sr2 = sphereRatio * 0.5;
      const hl = halfLength * 2;
      const he = 1.0 - sphereRatio;
      let m;
      for (m = 0; m <= middleStacks; m++) {
        s = -halfLength + (m === 0 ? 0 : hl * m / middleStacks);
        txe = sr2 + (m === 0 ? 0 : he * m / middleStacks);
        gridHeight++;
        let j;
        for (j = 0; j <= slices; j++) {
          tx = tc[j];
          x = sc[j * 2];
          y = sc[j * 2 + 1];
          vertices.push(
            x * radiusEnd, y * radiusEnd, zStartHeight + s,
            x * radiusEnd * normDir, y * radiusEnd * normDir, zStartHeight * normDir,
            1 - tx, txe);
        }
      }
    }
  }
  const mesh = meshBufferFromVertexGrid(three,vertices, slices + 1, gridHeight);
  if(!mesh)throw new Error();
  return flat ? Meshes.recalcNormals(mesh["toNonIndexed"](),inside) : normNormals(mesh);
};

/**
 * Creates a mesh in the form of a two-dimensional n-pointed star.
 * Will also generate texture coordinates, assuming that the coordinate (0,0)
 * is at the lower-left corner of the texture and (1,1) is at the upper-right
 * corner.
 * @param {number} points Number of points in the star.
 * Must be 2 or greater.
 * @param {number} firstRadius First radius of the star.
 * Must be 0 or greater; this parameter and secondRadius
 * can't both be 0.
 * @param {number} secondRadius Second radius of the star.
 * Must be 0 or greater; this parameter and firstRadius
 * can't both be 0.
 * @param {boolean} [inward] If true, the normals generated by this
 * method will point in the opposite direction of the positive z-axis; otherwise,
 * in the same direction of the positive z-axis. Default is false.
 * @returns {*} A buffer geometry. The generated mesh.
 */
Meshes.createPointedStar = function(three,points, firstRadius, secondRadius, inward) {
  if(points < 2 || firstRadius < 0 || secondRadius < 0)return new three["BufferGeometry"]();
  if(firstRadius <= 0 && secondRadius <= 0)return new three["BufferGeometry"]();
  if(firstRadius === secondRadius) {
    return Meshes.createDisk(three,firstRadius, firstRadius, points, 1, inward);
  }
  const vertices = [];
  const indices = [];
  const triangleFan = new TriangleFan(indices);
  let lastIndex = 0;
  const recipRadius = 1.0 / Math.max(firstRadius, secondRadius);
  const normalZ = inward ? -1 : 1;
  // Position X, Y, Z, normal NX, NY, NZ, texture U, V
  vertices.push(0, 0, 0, 0, 0, normalZ, 0.5, 0.5);
  triangleFan.addIndex(lastIndex++);
  const angleStep = MathUtil.PiTimes2 / (points * 2);
  const cosStep = Math.cos(angleStep);
  const sinStep = angleStep <= 3.141592653589793 ? Math.sqrt(1.0 - cosStep * cosStep) : -Math.sqrt(1.0 - cosStep * cosStep);
  let sangle = 0.0; // sin(0.0deg)
  let cangle = 1.0; // cos(0.0deg)
  let i;
  for (i = 0; i < points * 2; i++) {
    const radius = (i & 1) === 0 ? firstRadius : secondRadius;
    const x = -sangle * radius;
    const y = cangle * radius;
    const tcx = (1 + x * recipRadius) * 0.5;
    const tcy = (1 + y * recipRadius) * 0.5;
    vertices.push(x, y, 0, 0, 0, normalZ, tcx, tcy);
    triangleFan.addIndex(lastIndex);
    const ts = cosStep * sangle + sinStep * cangle;
    const tc = cosStep * cangle - sinStep * sangle;
    sangle = ts;
    cangle = tc;
  }
  // Re-add the second index to close the pointed star
  triangleFan.addIndex(1);
  return Meshes.fromPositionsNormalsUV(three,vertices, indices);
};

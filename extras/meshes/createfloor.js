/*
 Any copyright to this file is released to the Public Domain.
 In case this is not possible, this file is also licensed under the Unlicense: https://unlicense.org/
*/

/** The <code>extras/createfloor.js</code> module.
 * To import all symbols in this module, either of the following can be used:
 * <pre>
 * import * from "extras/createfloor.js";
 * // -- or --
 * import * as CustomModuleName from "extras/createfloor.js";</pre>
 * @module extras/createfloor */

function threejsGeometryFromPositionsNormalsUV(three, vertices, indices) {
  if(!three.BufferGeometry)return null;
  var geom=new three.BufferGeometry()
  var attr;
  var buffer=new three.InterleavedBuffer(new Float32Array(vertices),8)
  attr=new three.InterleavedBufferAttribute(buffer,3,0)
  geom.setAttribute("position",attr)
  attr=new three.InterleavedBufferAttribute(buffer,3,3)
  geom.setAttribute("normal",attr)
  attr=new three.InterleavedBufferAttribute(buffer,2,6)
  geom.setAttribute("uv",attr)
  geom.index=new three.BufferAttribute(new Uint32Array(indices),1)
  // NOTE: Pass the return value to the <code>THREE.Mesh</code>, <code>THREE.LineSegments</code>, or <code>THREE.Points</code> constructor to generate the appropriate kind of shape object depending on the buffer geometry's primitive type.
  return geom
}

/**
 * Generates a mesh buffer of a tiled floor. Texture coordinates
 * of each tile will range from [0,1] across the width and height
 * of that tile. Thus, any texture used to render the mesh buffer should
 * entirely be of a square tile.
 * @param {number} xStart The Xcoordinate of the start of the floor.
 * @param {number} yStart The Ycoordinate of the start of the floor.
 * @param {number} width Total width of the floor.
 * @param {number} height Total height of the floor.
 * @param {number} tileSize Width and height of each floor tile.
 * @param {number} [z] The Zcoordinate where the floor will be placed. If null, undefined, or omitted, the default is 0.
 * @returns {MeshBuffer} The resulting mesh buffer.
 * @function
 */
export const createFloor = function(three,xStart, yStart, width, height, tileSize, z) {
  if(typeof z === "undefined" || z === null)z = 0.0;
  const vertices = [];
  const indices = [];
  let index = 0;
  const tilesX = Math.ceil(width / tileSize);
  const tilesY = Math.ceil(height / tileSize);
  let lastY = (height - tilesY * tileSize) / tileSize;
  let lastX = (width - tilesX * tileSize) / tileSize;
  if(lastY <= 0)lastY = 1.0;
  if(lastX <= 0)lastX = 1.0;
  let y;
  for (y = 0; y < tilesY; y++) {
    const endY = y === tilesY - 1 ? 1.0 - lastY : 0.0;
    const endPosY = y === tilesY - 1 ? yStart + height : yStart + (y + 1) * tileSize;
    let x;
    for (x = 0; x < tilesX; x++) {
      const endX = x === tilesX - 1 ? lastX : 1.0;
      const endPosX = x === tilesX - 1 ? xStart + width : xStart + (x + 1) * tileSize;
      vertices.push(
        xStart + x * tileSize, yStart + y * tileSize, z, 0, 0, 1, 0, 1,
        xStart + x * tileSize, endPosY, z, 0, 0, 1, 0, endY,
        endPosX, yStart + y * tileSize, z, 0, 0, 1, endX, 1,
        endPosX, endPosY, z, 0, 0, 1, endX, endY);
      indices.push(index, index + 1, index + 2, index + 2, index + 1, index + 3);
      index += 4;
    }
  }
  return MesthreejsGeometryFromPositionsNormalsUV(three,vertices, indices);
};

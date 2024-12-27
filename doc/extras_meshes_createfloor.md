# module:extras/meshes/createfloor

[Back to documentation index.](index.md)

<a name='extras_meshes_createfloor'></a>
### module:extras/meshes/createfloor()

The <code>extras/meshes/createfloor.js</code> module.
To import all symbols in this module, either of the following can be used:

    import * from "extras/meshes/createfloor.js";
    // -- or --
    import * as CustomModuleName from "extras/meshes/createfloor.js";

### Methods

* [createFloor](#extras_meshes_createfloor.createFloor)<br>Generates a mesh buffer of a tiled floor.

<a name='extras_meshes_createfloor.createFloor'></a>
### (static) module:extras/meshes/createfloor.createFloor(three, xStart, yStart, width, height, tileSize, [z])

Generates a mesh buffer of a tiled floor. Texture coordinates
of each tile will range from [0,1] across the width and height
of that tile. Thus, any texture used to render the mesh buffer should
entirely be of a square tile.

#### Parameters

* `three` (Type: *)<br>Reference to THREE.js.
* `xStart` (Type: number)<br>The x-coordinate of the start of the floor.
* `yStart` (Type: number)<br>The y-coordinate of the start of the floor.
* `width` (Type: number)<br>Total width of the floor.
* `height` (Type: number)<br>Total height of the floor.
* `tileSize` (Type: number)<br>Width and height of each floor tile.
* `z` (Type: number) (optional)<br>The z-coordinate where the floor will be placed. If null, undefined, or omitted, the default is 0.

#### Return Value

A buffer geometry object. The resulting mesh buffer. (Type: *)

[Back to documentation index.](index.md)

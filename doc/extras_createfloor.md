# module:extras/createfloor

[Back to documentation index.](index.md)

<a name='extras_createfloor'></a>
### module:extras/createfloor()

The <code>extras/createfloor.js</code> module.
To import all symbols in this module, either of the following can be used:

    import * from "extras/createfloor.js";
    // -- or --
    import * as CustomModuleName from "extras/createfloor.js";

### Methods

* [createFloor](#extras_createfloor.createFloor)<br>Generates a mesh buffer of a tiled floor.

<a name='extras_createfloor.createFloor'></a>
### (static) module:extras/createfloor.createFloor(xStart, yStart, width, height, tileSize, [z])

Generates a mesh buffer of a tiled floor. Texture coordinates
of each tile will range from [0,1] across the width and height
of that tile. Thus, any texture used to render the mesh buffer should
entirely be of a square tile.

#### Parameters

* `xStart` (Type: number)<br>X coordinate of the start of the floor.
* `yStart` (Type: number)<br>Y coordinate of the start of the floor.
* `width` (Type: number)<br>Total width of the floor.
* `height` (Type: number)<br>Total height of the floor.
* `tileSize` (Type: number)<br>Width and height of each floor tile.
* `z` (Type: number) (optional)<br>Z coordinate where the floor will be placed. If null, undefined, or omitted, the default is 0.

#### Return Value

The resulting mesh buffer. (Type: <a href="MeshBuffer.md">MeshBuffer</a>)

[Back to documentation index.](index.md)

# H3DU.TextureAtlas

[Back to documentation index.](index.md)

 <a name='H3DU.TextureAtlas'></a>
### H3DU.TextureAtlas()

A texture atlas specifies the location and size of images within a single
texture. It is useful when multiple different images should be drawn at
once without having to load multiple textures or doing multiple texture
binds. Instead, those images can be packed into one texture and the
application can draw different portions of that texture at once. The
texture atlas can specify where those portions are found.

This implementation supports the ".atlas" format.

NOTE: The constructor should not be called directly by applications.
Use the <a href="H3DU.TextureAtlas.md#H3DU.TextureAtlas.load">H3DU.TextureAtlas.load</a> method to get an H3DU.TextureAtlas object.

This class is considered a supplementary class to the
Public Domain HTML 3D Library and is not considered part of that
library.

To use this class, you must include the script "extras/text.js"; the
class is not included in the "h3du_min.js" file which makes up
the HTML 3D Library. Example:

    <script type="text/javascript" src="extras/text.js"></script>

### Methods

* [load](#H3DU.TextureAtlas.load)<br>Loads a texture atlas definition from a file.
* [loadTextures](#H3DU.TextureAtlas_loadTextures)<br>Loads the texture files used by this texture atlas.
* [loadWithTextures](#H3DU.TextureAtlas.loadWithTextures)<br>Loads a texture atlas definition from a file along with the textures
it uses.
* [makeSprites](#H3DU.TextureAtlas_makeSprites)<br>Makes a shape group used to display one or more sprites.

 <a name='H3DU.TextureAtlas.load'></a>
### (static) H3DU.TextureAtlas.load(atlasFileName)

Loads a texture atlas definition from a file.
Note that this method only loads the texture atlas data and not the bitmaps
used by the texture atlas.

#### Parameters

* `atlasFileName` (Type: String)<br>
    The URL of the texture atlas to load.

#### Return Value

A promise that is resolved
when the texture atlas data is loaded successfully (the result will be
an H3DU.TextureAtlas object), and is rejected when an error occurs. (Type: <a href="Promise.md">Promise</a>.&lt;<a href="H3DU.TextureAtlas.md">H3DU.TextureAtlas</a>>)

 <a name='H3DU.TextureAtlas_loadTextures'></a>
### H3DU.TextureAtlas#loadTextures(textureLoader)

Loads the texture files used by this texture atlas.

#### Parameters

* `textureLoader` (Type: <a href="H3DU.TextureLoader.md">H3DU.TextureLoader</a>)<br>
    Texture loader object to use when loading the textures.

#### Return Value

A promise as described in
<a href="H3DU.md#H3DU.getPromiseResultsAll">H3DU.getPromiseResultsAll</a>. If the promise
resolves, each item in the resulting array will be a loaded
<a href="H3DU.Texture.md">H3DU.Texture</a> object. (Type: <a href="Promise.md">Promise</a>.&lt;Array.&lt;<a href="H3DU.Texture.md">H3DU.Texture</a>>>)

 <a name='H3DU.TextureAtlas.loadWithTextures'></a>
### (static) H3DU.TextureAtlas.loadWithTextures(atlasFileName, textureLoader)

Loads a texture atlas definition from a file along with the textures
it uses.

#### Parameters

* `atlasFileName` (Type: String)<br>
    The URL of the texture atlas to load.
* `textureLoader` (Type: <a href="H3DU.TextureLoader.md">H3DU.TextureLoader</a>)<br>
    Texture loader object to use when loading the textures.

#### Return Value

A promise that is resolved
when the texture atlas data and textures are loaded successfully,
and is rejected when an error occurs.
If the promise is resolved, the result will be an object with the
following keys:<ul>
<li><code>url</code> - The URL of the texture atlas data file.
<li><code>atlas</code> - The texture atlas data in the form of an <a href="H3DU.TextureAtlas.md">H3DU.TextureAtlas</a> object.
<li><code>textures</code> - An array of <a href="H3DU.Texture.md">H3DU.Texture</a> objects used by the font,
in the order in which they are declared in the font data file.
</ul> (Type: <a href="Promise.md">Promise</a>)

 <a name='H3DU.TextureAtlas_makeSprites'></a>
### H3DU.TextureAtlas#makeSprites(sprites)

Makes a shape group used to display one or more sprites.
For the sprites to show upright, the coordinate system should have the
X axis pointing right and the Y axis pointing down (for example, an
orthographic projection where the left and top coordinates are less
than the right and bottom coordinates, respectively). The size of each
sprite will be in pixels; therefore, for best results, the coordinate system
should be scaled so that one unit equals one pixel.

#### Parameters

* `sprites` (Type: Array.&lt;Object>)<br>
    An array of objects whose keys have the possibilities given below, and whose values are those allowed for each key.<ul> <li><code>name</code> - Name of the sprite, as listed in this texture atlas. <li><code>index</code> - If a sprite has multiple versions, use this index parameter to distinguish them. Index can't be less than 0. If a sprite doesn't have multiple versions, this value is not required. <li><code>x</code> - X coordinate of the sprite. <li><code>y</code> - Y coordinate of the sprite. </ul>

#### Return Value

The generated group of shapes. (Type: <a href="H3DU.ShapeGroup.md">H3DU.ShapeGroup</a>)

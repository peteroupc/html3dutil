# module:extras/meshes/text.TextFont

[Back to documentation index.](index.md)

<a name='extras_meshes_text.TextFont'></a>
### new module:extras/meshes/text.TextFont()

Represents an image font, which supports drawing two-dimensional
text. This class supports
traditional image fonts, also known as BMFONT, and signed distance field fonts.

Image fonts consist of a font definition file and one
or more textures containing the shape of each font glyph. The glyphs
are packed so that the glyphs don't overlap each other.

In a signed distance field font, each pixel's alpha value depends on the
distance from that location to the edge of the glyph. A pixel alpha less
than 0.5 (127 in most image formats) means the pixel is outside the
glyph, greater than 0.5 means the pixel is inside the glyph, and 0 (for
outside the glyph) and 1 (for inside the glyph) means the pixel is
outside a buffer zone formed by the glyph's outline. Each glyph is usually
given extra space to accommodate the signed distance field information.

The font definition file formats supported are text (".fnt"),
JSON (".json"), binary (".fnt" or ".bin"), and XML (".xml").
The text and binary file formats are specified at
<a href="http://www.angelcode.com/products/bmfont/doc/file_format.md">this
page</a>. The XML format is very similar to the text file format.
The JSON format is described at
<a href="https://github.com/Jam3/load-bmfont/blob/master/json-specification.md">this
page</a>.

See <a href="https://github.com/mattdesl/text-modules#bitmap-text">this page</a>
for a list of image font generation tools. (No one tool is recommended over any
other, and the mention of this link is not an endorsement or sponsorship
of any particular tool.)

NOTE: The constructor should not be called directly by applications.
Use the TextFont.load method to get an TextFont object. This
constructor's parameters are undocumented and are subject to change.

This class is considered a supplementary class to the
Public Domain HTML 3D Library and is not considered part of that
library.

To use this class, you must include the script "extras/meshes/text.js"; the
class is not included in the "h3du_min.js" file which makes up
the HTML 3D Library. Example:

    <script type="text/javascript" src="extras/meshes/text.js"></script>

### Methods

* [loadData](#extras_meshes_text_TextFont.loadData)<br>Loads an image font definition from a file.
* [loadTextures](#extras_meshes_text_TextFont_loadTextures)<br>Loads the texture files used by this font object.
* [loadWithTextures](#extras_meshes_text_TextFont.loadWithTextures)<br>Loads an image font definition from a file along with the textures
used by that font.
* [makeTextMeshes](#extras_meshes_text_TextFont_makeTextMeshes)<br>Creates an array of meshes containing the primitives
needed to draw text with this font.
* [measure](#extras_meshes_text_TextFont_measure)<br>Calculates the width and height of a text string when
drawn using this font.
* [textShape](#extras_meshes_text_TextFont_textShape)<br>Creates a group of shapes containing the primitives needed to
draw text in the specified position, size, and color.

<a name='extras_meshes_text_TextFont.loadData'></a>
### (static) module:extras/meshes/text~TextFont.loadData(data, fontFileName)

Loads an image font definition from a file.
Note that this method only loads the font data and not the images
used to represent the font.

#### Parameters

* `data` (Type: ArrayBuffer)<br>The data containing an image font definition.
* `fontFileName` (Type: string)<br>The URL of the font data file to load. The following file extensions are read as the following formats:<ul> <li>".xml": XML</li> <li>".json": JSON</li> <li>".bin": Binary</li> <li>".fnt": Text or binary</li> <li>All others: Text</li></ul>

#### Return Value

Text font data, or null if an error occurs. (Type: TextFont | null)

<a name='extras_meshes_text_TextFont_loadTextures'></a>
### module:extras/meshes/text~TextFont#loadTextures(textureLoader)

Loads the texture files used by this font object.

#### Parameters

* `textureLoader` (Type: H3DU.TextureLoader)<br>Texture loader object to use when loading the textures.

#### Return Value

A promise as described in
<a href="getPromiseResultsAll.md">getPromiseResultsAll</a>. If the promise
resolves, each item in the resulting array will be a loaded
Texture object. (Type: Promise.&lt;H3DU.Texture>)

<a name='extras_meshes_text_TextFont.loadWithTextures'></a>
### (static) module:extras/meshes/text~TextFont.loadWithTextures(fontFileName, textureLoader)

Loads an image font definition from a file along with the textures
used by that font.

#### Parameters

* `fontFileName` (Type: string)<br>The URL of the font data file to load. The following file extensions are read as the following formats:<ul> <li>".xml": XML</li> <li>".json": JSON</li> <li>".bin": Binary</li> <li>".fnt": Text or binary</li> <li>All others: Text</li></ul>
* `textureLoader` (Type: H3DU.TextureLoader)<br>Texture loader object to use when loading the textures.

#### Return Value

A promise that is resolved
when the font data and textures are loaded successfully,
and is rejected when an error occurs.
If the promise is resolved, the result will be an object with the
following keys:<ul>
<li><code>url</code> - The URL of the font data file.
<li><code>font</code> - The font data in the form of an TextFont object.
<li><code>textures</code> - An array of Texture objects used by the font,
in the order in which they are declared in the font data file.
</ul> (Type: Promise)

<a name='extras_meshes_text_TextFont_makeTextMeshes'></a>
### module:extras/meshes/text~TextFont#makeTextMeshes(str, params)

Creates an array of meshes containing the primitives
needed to draw text with this font.

#### Parameters

* `str` (Type: string)<br>The text to draw. Line breaks ("\n", "\r", "\r\n") are recognized by this method.
* `params` (Type: Object)<br>An object whose keys have the possibilities given later, and whose values are those allowed for each key.<ul> <li><code>x</code> - x-coordinate of the upper-left corner of the text. If null, undefined, or omitted, uses 0. For the text to show upright, the coordinate system should have the x-axis pointing right and the y-axis pointing down (for example, an orthographic projection where the left and top coordinates are less than the right and bottom coordinates, respectively). <li><code>y</code> - y-coordinate of the upper-left corner of the text. If null, undefined, or omitted, uses 0. <li><code>lineHeight</code> - Height of each line of the text in units. If null, undefined, or omitted, uses the line height given in the font. <li><code>width</code> - Maximum width of each line. Lines that exceed this width will be wrapped. <li><code>align</code> - Horizontal text alignment. Can be "left", "center", or "right" (all strings). </ul>

#### Return Value

An array of meshes representing the text.
There is one mesh for each texture page of the font. If none of the
text uses a given page, the corresponding mesh will be null. (Type: Array.&lt;H3DU.MeshBuffer>)

<a name='extras_meshes_text_TextFont_measure'></a>
### module:extras/meshes/text~TextFont#measure(str, params)

Calculates the width and height of a text string when
drawn using this font.

#### Parameters

* `str` (Type: string)<br>The text string to measure. Line breaks ("\n", "\r", "\r\n") are recognized by this method.
* `params` (Type: Object)<br>An object described in TextFont#makeTextMeshes.

#### Return Value

An array of two numbers;
the first is the width of the string, and the second is the
height of the string (taking into account line feed characters,
U+000A, that break lines). (Type: Array.&lt;number>)

<a name='extras_meshes_text_TextFont_textShape'></a>
### module:extras/meshes/text~TextFont#textShape(str, params)

Creates a group of shapes containing the primitives needed to
draw text in the specified position, size, and color.
For the text to show upright, the coordinate system should have the
x-axis pointing right and the y-axis pointing down (for example, an
orthographic projection where the left and top coordinates are less
than the right and bottom coordinates, respectively).

#### Parameters

* `str` (Type: string)<br>The text to draw. Line breaks ("\n", "\r", "\r\n") are recognized by this method.
* `params` (Type: Object)<br>An object described in TextFont#makeTextMeshes. Can also contain the following keys:<ul> <li><code>color</code> - A <a href="toGLColor.md">color vector or string</a> giving the color to draw the text with. If this value is given, the image font is assumed to be a signed distance field font. <li><code>msdf</code> - Treat the image font as a multichannel signed distance field font. <li><code>texture</code> - An array of textures (Texture) to use with this font, or a single Texture if only one texture page is used. If null, undefined, or omitted, uses the default filenames for texture pages defined in this font. </ul>

#### Return Value

The generated group of shapes. (Type: H3DU.ShapeGroup)

[Back to documentation index.](index.md)

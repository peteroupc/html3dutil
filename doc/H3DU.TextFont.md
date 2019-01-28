# H3DU.TextFont

[Back to documentation index.](index.md)

<a name='H3DU.TextFont'></a>
### new H3DU.TextFont()

Represents a bitmap font, which supports drawing two-dimensional
text. This class supports
traditional bitmap fonts and signed distance field fonts.

Bitmap fonts consist of a font definition file and one
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
<a href="https://github.com/Jam3/load-bmfont/blob/master/json-spec.md">this
page</a>.

See <a href="https://github.com/mattdesl/text-modules#bitmap-text">this page</a>
for a list of bitmap font generation tools. (No one tool is recommended over any
other, and the mention of this link is not an endorsement or sponsorship
of any particular tool.)

NOTE: The constructor should not be called directly by applications.
Use the TextFont.load method to get an H3DU.TextFont object. This
constructor's parameters are undocumented and are subject to change.

This class is considered a supplementary class to the
Public Domain HTML 3D Library and is not considered part of that
library.

To use this class, you must include the script "extras/text.js"; the
class is not included in the "h3du_min.js" file which makes up
the HTML 3D Library. Example:

    <script type="text/javascript" src="extras/text.js"></script>

[Back to documentation index.](index.md)

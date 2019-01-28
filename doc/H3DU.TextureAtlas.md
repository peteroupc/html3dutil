# H3DU.TextureAtlas

[Back to documentation index.](index.md)

<a name='H3DU.TextureAtlas'></a>
### new H3DU.TextureAtlas()

A texture atlas specifies the location and size of images within a single
texture. It is useful when multiple different images should be drawn at
once without having to load multiple textures or doing multiple texture
binds. Instead, those images can be packed into one texture and the
application can draw different portions of that texture at once. The
texture atlas can specify where those portions are found.

This implementation supports the ".atlas" format.

NOTE: The constructor should not be called directly by applications.
Use the TextureAtlas.load method to get an H3DU.TextureAtlas object.

This class is considered a supplementary class to the
Public Domain HTML 3D Library and is not considered part of that
library.

To use this class, you must include the script "extras/text.js"; the
class is not included in the "h3du_min.js" file which makes up
the HTML 3D Library. Example:

    <script type="text/javascript" src="extras/text.js"></script>

[Back to documentation index.](index.md)

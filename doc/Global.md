### Members

* [checkerboardShader](#checkerboardShader)<br>TODO: Not documented yet.
* [colorMatrixShader](#colorMatrixShader)<br>GLSL shader data for a family of image processing filters, which modify colors based on a transformation matrix, a 4x4 matrix that is multiplied by the red/green/blue color to get a new color.
* [horGradientShader](#horGradientShader)<br>TODO: Not documented yet.
* [kernelMatrixShader](#kernelMatrixShader)<br>TODO: Not documented yet.
* [leftButton](#leftButton)<br>True if the left mouse button was detected as being down.
* [marbleShader](#marbleShader)<br>TODO: Not documented yet.
* [marbleShader2](#marbleShader2)<br>TODO: Not documented yet.
* [middleButton](#middleButton)<br>True if the middle mouse button was detected as being down.
* [mirrorShader](#mirrorShader)<br>TODO: Not documented yet.
* [pixelateShader](#pixelateShader)<br>TODO: Not documented yet.
* [radialGradientShader](#radialGradientShader)<br>TODO: Not documented yet.
* [rightButton](#rightButton)<br>True if the right mouse button was detected as being down.
* [skySphereCubeMapShader](#skySphereCubeMapShader)<br>TODO: Not documented yet.
* [skySphereShader](#skySphereShader)<br>TODO: Not documented yet.
* [stripesBackShader](#stripesBackShader)<br>TODO: Not documented yet.
* [sunburstBackShader](#sunburstBackShader)<br>TODO: Not documented yet.
* [vignetteShader](#vignetteShader)<br>TODO: Not documented yet.
* [warpShader](#warpShader)<br>TODO: Not documented yet.
* [waterpaintShader](#waterpaintShader)<br>TODO: Not documented yet.
* [waveShader](#waveShader)<br>TODO: Not documented yet.
* [woodShader](#woodShader)<br>TODO: Not documented yet.

### Methods

* [FourierKnot](#FourierKnot)<br>A curve evaluator object that calculates a knot in the form of the Fourier series

<b>F</b>(u) = &Sigma;<sub>i=1, n</sub> <b>a</b> cos(<i>iu</i>) + <b>b</b> sin(<i>iu</i>).
* [MoebiusLikeStrip](#MoebiusLikeStrip)<br>TODO: Not documented yet.
* [Roulette](#Roulette)<br>TODO: Not documented yet.
* [StarField](#StarField)<br>TODO: Not documented yet.
* [contourLines](#contourLines)<br>Generates contour lines for two-dimensional data.
* [createConvexHull](#createConvexHull)<br>Generates the convex hull of a set of 3-dimensional points, that is, the smallest convex set
that contains all the points given.
* [createFloor](#createFloor)<br>Generates a mesh buffer of a tiled floor.
* [createGear](#createGear)<br>Builds a mesh buffer representing a gear centered at the origin.
* [createMultiColoredArrow](#createMultiColoredArrow)<br>TODO: Not documented yet.
* [createWasher](#createWasher)<br>TODO: Not documented yet.
* [curveCatacaustic](#curveCatacaustic)<br>TODO: Not documented yet.
* [curveEvolute](#curveEvolute)<br>TODO: Not documented yet.
* [curveInverse](#curveInverse)<br>TODO: Not documented yet.
* [curveInvolute](#curveInvolute)<br>TODO: Not documented yet.
* [curveOrthotomic](#curveOrthotomic)<br>TODO: Not documented yet.
* [curvePedalCurve](#curvePedalCurve)<br>TODO: Not documented yet.
* [curveRadialCurve](#curveRadialCurve)<br>TODO: Not documented yet.
* [fragmentShaderLib](#fragmentShaderLib)<br>TODO: Not documented yet.
* [fromStlString](#fromStlString)<br>TODO: Not documented yet.
* [getColorMatrix](#getColorMatrix)<br>Gets a specific kind of color matrix for the color
matrix shader.
* [getKernelMatrix](#getKernelMatrix)<br>TODO: Not documented yet.
* [horizontalGradient](#horizontalGradient)<br>Generates a 32x32 bitmap of a linear gradient in the horizontal direction.
* [loadTga](#loadTga)<br>TODO: Not documented yet.
* [normalizeKernelInPlace](#normalizeKernelInPlace)<br>TODO: Not documented yet.
* [planePointsToConvexHull](#planePointsToConvexHull)<br>Generates a convex hull of the half-space representation
of several planes.
* [polarCurve](#polarCurve)<br>TODO: Not documented yet.
* [radialGradient](#radialGradient)<br>Generates a 32x32 bitmap of a radial gradient.
* [randomConvexPolyhedron](#randomConvexPolyhedron)<br>Generates a mesh buffer of a convex polyhedron at random.
* [raypick](#raypick)<br>Finds the three-dimensional shape object and world-space coordinates
corresponding to the given two-dimensional (X and Y) coordinates.
* [ruledSurface](#ruledSurface)<br>TODO: Not documented yet.
* [spiralCurve](#spiralCurve)<br>TODO: Not documented yet.

<a name='checkerboardShader'></a>
### checkerboardShader

TODO: Not documented yet.

<a name='colorMatrixShader'></a>
### colorMatrixShader

GLSL shader data for a family of image processing filters, which modify colors based on a transformation matrix, a 4x4 matrix that is multiplied by the red/green/blue color to get a new color. The shader program takes three uniforms: "sampler", which
is the input texture, "t", a value from 0 to 1 indicating how strongly to
apply the color matrix, and "matrix", which is the 4x4 matrix just described.

<a name='horGradientShader'></a>
### horGradientShader

TODO: Not documented yet.

<a name='kernelMatrixShader'></a>
### kernelMatrixShader

TODO: Not documented yet.

<a name='leftButton'></a>
### leftButton

True if the left mouse button was detected as being down.

Type: boolean

<a name='marbleShader'></a>
### marbleShader

TODO: Not documented yet.

<a name='marbleShader2'></a>
### marbleShader2

TODO: Not documented yet.

<a name='middleButton'></a>
### middleButton

True if the middle mouse button was detected as being down.

Type: boolean

<a name='mirrorShader'></a>
### mirrorShader

TODO: Not documented yet.

<a name='pixelateShader'></a>
### pixelateShader

TODO: Not documented yet.

<a name='radialGradientShader'></a>
### radialGradientShader

TODO: Not documented yet.

<a name='rightButton'></a>
### rightButton

True if the right mouse button was detected as being down.

Type: boolean

<a name='skySphereCubeMapShader'></a>
### skySphereCubeMapShader

TODO: Not documented yet.

<a name='skySphereShader'></a>
### skySphereShader

TODO: Not documented yet.

<a name='stripesBackShader'></a>
### stripesBackShader

TODO: Not documented yet.

<a name='sunburstBackShader'></a>
### sunburstBackShader

TODO: Not documented yet.

<a name='vignetteShader'></a>
### vignetteShader

TODO: Not documented yet.

<a name='warpShader'></a>
### warpShader

TODO: Not documented yet.

<a name='waterpaintShader'></a>
### waterpaintShader

TODO: Not documented yet.

<a name='waveShader'></a>
### waveShader

TODO: Not documented yet.

<a name='woodShader'></a>
### woodShader

TODO: Not documented yet.

<a name='FourierKnot'></a>
### FourierKnot(a, b)

A curve evaluator object that calculates a knot in the form of the Fourier series

<b>F</b>(u) = &Sigma;<sub>i=1, n</sub> <b>a</b> cos(<i>iu</i>) + <b>b</b> sin(<i>iu</i>).

#### Parameters

* `a` (Type: Array.&lt;Array.&lt;number>>)<br>The cosine coefficients.
* `b` (Type: Array.&lt;Array.&lt;number>>)<br>The sine coefficients.

<a name='MoebiusLikeStrip'></a>
### MoebiusLikeStrip(maj, a, b)

TODO: Not documented yet.

#### Parameters

* `maj` (Type: *)
* `a` (Type: *)
* `b` (Type: *)

#### Return Value

Return value. (Type: *)

<a name='Roulette'></a>
### Roulette(rollingCurve, fixedCurve, polePoint, [revolutions])

TODO: Not documented yet.

#### Parameters

* `rollingCurve` (Type: Object)<br>A curve evaluator object that describes the curve that rolls to generate the roulette curve. This curve is assumed to be a smooth closed curve such as a circle.
* `fixedCurve` (Type: Object)<br>A curve evaluator object that describes the curve on which the rolling curve will move. This curve is assumed to be repeating (periodic) and smooth at every point; this includes periodic waves and circles.
* `polePoint` (Type: Array.&lt;number>)<br>X and Y coordinates of a point, from the same coordinate system (reference frame) as <i>rollingCurve</i>, that will generate the roulette curve.
* `revolutions` (Type: number) (optional)

<a name='StarField'></a>
### StarField(range)

TODO: Not documented yet.

#### Parameters

* `range` (Type: *)

#### Return Value

Return value. (Type: *)

<a name='contourLines'></a>
### contourLines(func, levels, u1, u2, v1, v2, usize, vsize)

Generates contour lines for two-dimensional data.

#### Parameters

* `func` (Type: function)<br>A function that takes two parameters--a U coordinate and a V coordinate--and returns a number at that point.
* `levels` (Type: Array.&lt;number>)<br>An array of values at which to draw contour lines. For example, if levels is `[20, 25]`, this function will draw contour lines along the values 20 and 25.
* `u1` (Type: number)<br>Starting U coordinate to sample.
* `u2` (Type: number)<br>Ending U coordinate to sample.
* `v1` (Type: number)<br>Starting V coordinate to sample.
* `v2` (Type: number)<br>Ending V coordinate to sample.
* `usize` (Type: number)<br>The number of levels between grid points along the U axis. This method will sample (usize+1)\*(vsize+1) grid points in total.
* `vsize` (Type: number)<br>The number of levels between grid points along the V axis.

#### Return Value

A mesh buffer of line segments for the contour lines. (Type: MeshBuffer)

#### Example

This example generates contour lines for a simple
function. This method samples the function at integer grid points.

    var mesh=contourLines((u,v)=>(Math.sin((u+v)/6)),
    [0, 1, 2, 3],
    0,10,0,10,10,10);

<a name='createConvexHull'></a>
### createConvexHull(points, [flat], [inside])

Generates the convex hull of a set of 3-dimensional points, that is, the smallest convex set
that contains all the points given.

#### Parameters

* `points` (Type: Array.&lt;number>)<br>An array of 3-element vectors each identifying a 3-dimensional point.
* `flat` (Type: boolean) (optional)<br>If true, will generate normals such that the figure will be flat shaded; otherwise, will generate normals such that the figure will be smooth shaded.
* `inside` (Type: boolean) (optional)<br>If true, the normals generated by this method will point inward; otherwise, outward. Should normally be false unless the figure will be viewed from the inside.

#### Return Value

The generated convex hull. (Type: MeshBuffer)

<a name='createFloor'></a>
### createFloor(xStart, yStart, width, height, tileSize, [z])

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

The resulting mesh buffer. (Type: MeshBuffer)

<a name='createGear'></a>
### createGear(innerRadius, outerRadius, thickness, teeth, toothDepth)

Builds a mesh buffer representing a gear centered at the origin.

#### Parameters

* `innerRadius` (Type: number)<br>Inner radius of the gear wheel
* `outerRadius` (Type: number)<br>Outer radius of the gear wheel, at the valleys between teeth.
* `thickness` (Type: number)<br>Thickness of the gear
* `teeth` (Type: number)<br>Number of teeth.
* `toothDepth` (Type: number)<br>Depth of each gear tooth.

#### Return Value

Return value. (Type: MeshBuffer)

<a name='createMultiColoredArrow'></a>
### createMultiColoredArrow(shaftLength, pointerLength, shaftRadius, pointerRadius, shaftColor, pointerColor)

TODO: Not documented yet.

#### Parameters

* `shaftLength` (Type: number)
* `pointerLength` (Type: number)
* `shaftRadius` (Type: number)
* `pointerRadius` (Type: number)
* `shaftColor` (Type: Array.&lt;number> | number | string)<br>A color vector or string specifying the color of the shaft.
* `pointerColor` (Type: Array.&lt;number> | number | string)<br>A color vector or string specifying the color of the pointer.

#### Return Value

A mesh buffer of the resulting shape. (Type: MeshBuffer)

<a name='createWasher'></a>
### createWasher(inner, outer, height, slices)

TODO: Not documented yet.

#### Parameters

* `inner` (Type: *)
* `outer` (Type: *)
* `height` (Type: *)
* `slices` (Type: *)

#### Return Value

Return value. (Type: *)

<a name='curveCatacaustic'></a>
### curveCatacaustic(evaluator, ox, oy)

TODO: Not documented yet.

#### Parameters

* `evaluator` (Type: *)
* `ox` (Type: *)
* `oy` (Type: *)

#### Return Value

Return value. (Type: *)

<a name='curveEvolute'></a>
### curveEvolute(evaluator)

TODO: Not documented yet.

#### Parameters

* `evaluator` (Type: *)

#### Return Value

Return value. (Type: *)

<a name='curveInverse'></a>
### curveInverse(evaluator, ox, oy, radius)

TODO: Not documented yet.

#### Parameters

* `evaluator` (Type: *)
* `ox` (Type: *)
* `oy` (Type: *)
* `radius` (Type: *)

#### Return Value

Return value. (Type: *)

<a name='curveInvolute'></a>
### curveInvolute(evaluator)

TODO: Not documented yet.

#### Parameters

* `evaluator` (Type: *)

#### Return Value

Return value. (Type: *)

<a name='curveOrthotomic'></a>
### curveOrthotomic(evaluator, ox, oy)

TODO: Not documented yet.

#### Parameters

* `evaluator` (Type: *)
* `ox` (Type: *)
* `oy` (Type: *)

#### Return Value

Return value. (Type: *)

<a name='curvePedalCurve'></a>
### curvePedalCurve(evaluator, ox, oy)

TODO: Not documented yet.

#### Parameters

* `evaluator` (Type: *)
* `ox` (Type: *)
* `oy` (Type: *)

#### Return Value

Return value. (Type: *)

<a name='curveRadialCurve'></a>
### curveRadialCurve(evaluator, ox, oy)

TODO: Not documented yet.

#### Parameters

* `evaluator` (Type: *)
* `ox` (Type: *)
* `oy` (Type: *)

#### Return Value

Return value. (Type: *)

<a name='fragmentShaderLib'></a>
### fragmentShaderLib()

TODO: Not documented yet.

#### Return Value

Return value. (Type: *)

<a name='fromStlString'></a>
### fromStlString(str)

TODO: Not documented yet.

#### Parameters

* `str` (Type: *)

#### Return Value

Return value. (Type: *)

<a name='getColorMatrix'></a>
### getColorMatrix(kind)

Gets a specific kind of color matrix for the color
matrix shader.

#### Parameters

* `kind` (Type: string)<br>One of the following:<ul> <li>"grayscale" - Filter that averages the red, green, and blue components to result in black, white, or a shade of gray. <li>"boosted-red" - Filter that boosts the red component of the input. <li>"boosted-blue" - Filter that boosts the blue component of the input. <li>"sepia" or "sepia2" - One of two filters that adjust the colors of the image to achieve a sepia coloring. <li>"invert" - Filter that inverts the colors of the input so the effect looks like a film negative. </ul>

#### Return Value

4x4 color matrix. (Type: Array.&lt;number>)

<a name='getKernelMatrix'></a>
### getKernelMatrix(kind)

TODO: Not documented yet.

#### Parameters

* `kind` (Type: *)

#### Return Value

Return value. (Type: *)

<a name='horizontalGradient'></a>
### horizontalGradient(color1, color2)

Generates a 32x32 bitmap of a linear gradient in the horizontal direction. This function demonstrates generating a custom texture.

#### Parameters

* `color1` (Type: Array.&lt;number> | number | string)<br>A color vector or string identifying the color at the left edge of the gradient.
* `color2` (Type: Array.&lt;number> | number | string)<br>A color vector or string identifying the color at the right edge of the gradient.

#### Return Value

An array with 32x32x4 bytes, arranged in 32 rows of 32 pixels
of 4 bytes each. For each pixel, the four bytes are color components
in the following order: red, green, blue, alpha. (Type: UInt8Array)

<a name='loadTga'></a>
### loadTga(data)

TODO: Not documented yet.

#### Parameters

* `data` (Type: *)

#### Return Value

Return value. (Type: *)

<a name='normalizeKernelInPlace'></a>
### normalizeKernelInPlace(matrix)

TODO: Not documented yet.

#### Parameters

* `matrix` (Type: *)

#### Return Value

Return value. (Type: *)

<a name='planePointsToConvexHull'></a>
### planePointsToConvexHull(planepoints)

Generates a convex hull of the half-space representation
of several planes. Each plane is defined by the triangle it lies on.

#### Parameters

* `planepoints` (Type: Array.&lt;Array.&lt;number>>)<br>An array of planes. Each plane is defined by three points that form a triangle that lies on the plane. The triangle's normal vector will point outward, meaning all points on the side pointed to by the normal vector will be "outside" the plane, and other points will be "inside" the plane.

#### Return Value

The generated convex hull. (Type: MeshBuffer)

<a name='polarCurve'></a>
### polarCurve(func, phase)

TODO: Not documented yet.

#### Parameters

* `func` (Type: *)
* `phase` (Type: *)

#### Return Value

Return value. (Type: *)

<a name='radialGradient'></a>
### radialGradient(colorCenter, colorEdges)

Generates a 32x32 bitmap of a radial gradient. This function demonstrates generating a custom texture.

#### Parameters

* `colorCenter` (Type: Array.&lt;number> | number | string)<br>A color vector or string identifying the color at the center of the gradient.
* `colorEdges` (Type: Array.&lt;number> | number | string)<br>A color vector or string identifying the color at the edges of the gradient.

#### Return Value

An array with 32x32x4 bytes, arranged in 32 rows of 32 pixels
of 4 bytes each. For each pixel, the four bytes are color components
in the following order: red, green, blue, alpha. (Type: UInt8Array)

<a name='randomConvexPolyhedron'></a>
### randomConvexPolyhedron(avgsize, maxfaces)

Generates a mesh buffer of a convex polyhedron at random.

#### Parameters

* `avgsize` (Type: number)<br>Average size of the polyhedron generated.
* `maxfaces` (Type: number)<br>Maximum number of faces for the convex polyhedron.

#### Return Value

The resulting polyhedron. (Type: MeshBuffer)

<a name='raypick'></a>
### raypick(x, y, projView, viewport, objects)

Finds the three-dimensional shape object and world-space coordinates
corresponding to the given two-dimensional (X and Y) coordinates.

#### Parameters

* `x`<br>Two-dimensional X coordinate in window space (usually lying within the viewport rectangle). See also the first parameter of MathUtil.vec3fromWindowPoint.
* `y`<br>Two-dimensional Y coordinate in window space (usually lying within the viewport rectangle). See also the first parameter of MathUtil.vec3fromWindowPoint.
* `projView`<br>Same meaning as second parameter of MathUtil.vec3fromWindowPoint. For example, to convert to world space coordinates, pass a projection matrix (projection matrix multiplied by the view matrix, in that order) to this parameter.
* `viewport`<br>Same meaning as third parameter of MathUtil.vec3fromWindowPoint.
* `objects`<br>Shape objects from which this method will choose one.

#### Return Value

An object with the following properties:<ul>
<li><code>index</code> - Index, starting from 0, into the objects array
of the shape object that was picked. Is -1 if no object was picked
(and the "local" and "world" properties will be absent).
<li><code>local</code> - 3-element array giving the X, Y, and
Z coordinates of the picked point in object (model) space.
<li><code>world</code> - 3-element array giving the X, Y, and
Z coordinates of the picked point in world space.</ul>

#### Example

The following example shows how a hypothetical scene graph could implement picking objects based on the position of the mouse cursor.

    var mousePos = scene.getMousePosInPixels();
    var viewport = [0, 0, scene.getWidth(), scene.getHeight()];
    var projview = scene.getProjectionViewMatrix();
    var o = raypick(mousePos.cx, mousePos.cy, projview, viewport, objects);
    if(o.index >= 0) {
    pickedShape = objects[o.index];
    } else {
    pickedShape = null;
    }

<a name='ruledSurface'></a>
### ruledSurface(directrix, director)

TODO: Not documented yet.

#### Parameters

* `directrix` (Type: *)
* `director` (Type: *)

#### Return Value

Return value. (Type: *)

<a name='spiralCurve'></a>
### spiralCurve(radius, phase)

TODO: Not documented yet.

#### Parameters

* `radius` (Type: *)
* `phase` (Type: *)

#### Return Value

Return value. (Type: *)

[Back to documentation index.](index.md)

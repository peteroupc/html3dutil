# 2-Dimensional Graphics Paths

[Back to documentation index.](index.md)

<a id=Introduction></a>
## Introduction

This article describes two-dimensional paths. This is an extra included in the HTML 3D Library.

**Download the latest version of the Public Domain HTML 3D
Library at the [HTML 3D Library's Releases page](https://github.com/peteroupc/html3dutil/releases).**

<a id=Contents></a>
## Contents

[Introduction](#Introduction)<br>[Contents](#Contents)<br>[Paths](#Paths)<br>[How to Use](#How_to_Use)<br>[Creating Paths](#Creating_Paths)<br>&nbsp;&nbsp;[SVG Path String](#SVG_Path_String)<br>&nbsp;&nbsp;[Building Paths](#Building_Paths)<br>[Path Segments](#Path_Segments)<br>[Methods](#Methods)<br>

## Paths

A path is a collection of two-dimensional line segments and/or curves. Many paths describe
closed figures or connected strings of lines and curves. The `GraphicsPath` class
currently supports line segments, quadratic and cubic B&eacute;zier curves, and elliptical arcs,
as well as closed figures made from several path segments.

<a id=How_to_Use></a>
## How to Use

2D paths are implemented in a class called <a href="H3DU.GraphicsPath.md">`H3DU.GraphicsPath`</a>, found in the file _extras/path.js_ in
the HTML 3D Library download.  To use this class, you must include the script "extras/path.js",
as in this example.

    <script type="text/javascript" src="h3du_min.js"></script>
    <script type="text/javascript" src="extras/path.js"></script>

<a id=Creating_Paths></a>
## Creating Paths

There are two ways to create paths: using an SVG path string, or by calling methods that add
its segments.

<a id=SVG_Path_String></a>
### SVG Path String

If you've worked with SVG, you may be familiar with this format for describing 2D paths. An
SVG path string consists of one or more path commands that start with a single letter.
The following are examples of SVG path strings:

    M50,50L100,100,100,150,150,200

    M50,20C230,245,233,44,22,44

    M50,50H80V60H50V70H50

The "M" command moves the current position, the "L", "H", and "V" commands create
lines, the "Q", "C", "S", and "T" commands create B&eacute;zier curves, the "A" command
creates elliptical arcs, and the "Z" command closes the path. If the letters are
lower-cased, X and Y coordinates are relative to the current position.

For more information, see the <a href="H3DU.GraphicsPath.md#H3DU.GraphicsPath.fromString">H3DU.GraphicsPath.fromString</a> method documentation.
That method is also how you create a 2D path from an SVG path string, as in this
example:

    var path = H3DU.GraphicsPath.fromString("M50,20C230,245,233,44,22,44")

<a id=Building_Paths></a>
### Building Paths

The other way to make paths is to call the `H3DU.GraphicsPath` constructor and call methods
to add path segments to the path.

The `H3DU.GraphicsPath` object stores a current position and a starting position, and many methods
don't have you specify a starting position, to cover the common case of drawing a series
of connected lines and curves.

* _.moveTo(x, y)_ - Moves the starting position and current position.
* _.lineTo(x, y)_ - Adds a line segment from the current position to a new ending position.
* _.closePath()_ - Closes the path by drawing a line to the starting point, if needed.

<a id=Path_Segments></a>
## Path Segments

Each path can include a number of line segments, B&eacute;zier curves, and elliptical arcs.
Line segments are relatively easy to understand. The other two kinds of segments
deserve some discussion.

A _B&eacute;zier curve_ is a parametric curve based on a polynomial formula. In this kind of
curve the endpoints are defined as they are, but the other points, the _control points_, define
the shape of the curve, which generally doesn't pass through the control points but still
follows them. A quadratic B&eacute;zier curve uses 3 points (for the three coefficients of the
quadratic polynomial in each dimension), one of which is the control point. A cubic B&eacute;zier
curve uses 4 points, two of which are control points.

An _elliptic arc_ is a curve which forms part of an ellipse. There are several ways to
parameterize an elliptic arc, as seen in the _.arc()_, _.arcTo()_, and _.arcSvgTo()_ methods
of the `H3DU.GraphicsPath` class.

<a id=Methods></a>
## Methods

* The H3DU.GraphicsPath.getLength method finds the approximate length of a path.
* The H3DU.GraphicsPath.getBounds method finds the axis-aligned bounding box of a path.

[Back to documentation index.](index.md)

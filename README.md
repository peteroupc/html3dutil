Geometry Utilities
====

**Download source code: [ZIP file](https://github.com/peteroupc/html3dutil/archive/master.zip)**

If you like this software, consider donating to me at this link: [http://peteroupc.github.io/](http://peteroupc.github.io/)

----

This is a public-domain library with classes and methods that were formerly in the Public Domain HTML 3D Library.  Classes and methods that involved WebGL, shaders, or a 3D scene graph were removed, to make this library much more general-purpose.  In any case, maintaining a 3D scene graph, textures, materials, and shaders is not trivial and is better handled by established 3D engines, such as three.js.  The classes and methods remaining in this library don't assume the existence of a 3D rendering pipeline such as WebGL or OpenGL ES, or even the existence of an HTML DOM, and are thus more easily portable to other programming languages.

(Speaking of OpenGL ES, there are some things supported by some implementations that are strictly not necessary, since they can be implemented with shaders and clever mesh construction.  These things include line primitives, triangle fans, triangle strips, and built-in antialiasing.)

API documentation is found at: [https://peteroupc.github.io/html3dutil](https://peteroupc.github.io/html3dutil)
or [https://github.com/peteroupc/html3dutil/blob/master/doc/index.md](https://github.com/peteroupc/html3dutil/blob/master/doc/index.md).

The file "h3du_min.js" is a minified single-file version of the library.  Include it in your HTML
as follows:

```html
  <script type="text/javascript" src="h3du_min.js"></script>
```

Source Code and Building
---------

Source code is available in the [project page](https://github.com/peteroupc/html3dutil).

To build, you will need a Java runtime environment, Ruby, and a JavaScript environment
that supports `npm`.

* Put `compiler.jar` (the JAR file for the Closure Compiler) in the `build` directory.
* Install [JSDoc](https://github.com/jsdoc3/jsdoc) and `rollup` via `npm`.
* Run `npm run build`. This will generate the documentation and compile
the library's source code into a single file called `h3du_min.js`.

Overview and Demos
---------

For detailed instructions on using this library and a summary of the library's features, visit:

[https://peteroupc.github.io/html3dutil/tutorial-overview.html](https://peteroupc.github.io/html3dutil/tutorial-overview.html)

## History

See [the history page](https://peteroupc.github.io/html3dutil/tutorial-history.html) to find
information about what has changed in this library.

## Possible Later Improvements

- Support "deg", "grad", "rad", and "turn" in CSS color hue parsing

## About

Any copyright is dedicated to the Public Domain.
[http://creativecommons.org/publicdomain/zero/1.0/](http://creativecommons.org/publicdomain/zero/1.0/)

If you like this, you should donate to Peter O. (original author of
the Public Domain HTML 3D Library) at:
[http://peteroupc.github.io/](http://peteroupc.github.io/)

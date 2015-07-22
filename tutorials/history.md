## Old Version History

Version 1.3.1:

- Fixed touch events in some of the interactive demos
- Fixed issues with BezierCurve, BezierSurface
- Robustness improvement in autonormal feature of SurfaceEval
- Correctness and other fixes

Version 1.3:

- Camera class rewritten again, but backwards compatible with
version 1.0
- Add vec3add, vec3sub, vec3copy, vec3assign, vec4assign methods
to GLMath
- Fix quatInvert method and optimize mat4inverseTranspose
method of GLMath
- Add reverseNormals method to GLMath
- Add createCanvasElement, getTimePosition, and newFrames methods to GLUtil
- Deprecate createCanvas method of GLUtil
- Improve renderLoop method of GLUtil
- Improved specular highlights
- Allow coordinate arrays in vertex2 and vertex3 methods of Mesh class
- Resolve some autonormal degenerate cases in SurfaceEval class
- Add getCount method to Lights class
- Add face culling, auto resize, and pixel depth methods to Scene3D class
- Add getClientAspect method to Scene3D class
- Other fixes and improvements

Version 1.2.1:

- Fix bug that occurs when a shape derived from a mesh that defines its own
colors is drawn before a shape derived from a mesh that doesn't define its own colors

Version 1.2:

- Support TGA textures
- Camera class rewritten and support added for the mouse wheel
and middle mouse button
- Lines and points supported in OBJ files
- Support loading custom textures from byte arrays
- Add method to create capsule shapes in Meshes class
- Mesh builder (vector3 method) avoids adding degenerate triangles
- Optimizations and bug fixes

Version 1.1:

- Add frame.js, a frame counter helper used in some of the demos
- Add quatInvert method to the GLMath class
- Fix texture mapping bugs
- Expand use of the color3 method of the Mesh class
- Optimize setUniforms method of the ShaderProgram class
- Add movePosition method of the Transform class
- New methods in the ShapeGroup and Scene3D classes
- Bug fixes

Version 1.0:

- Adds setOrtho2DAspect and setOrthoAspect methods to Scene3D
- Adds mat4TransposeInPlace method and two constants to GLMath
- Renames fromEuler and toEuler methods in GLMath to fromTaitBryan
 and toTaitBryan
- Modifies the Lights class
- Allows alpha component in material diffuse
- Optimizes setting uniforms in shader programs
- Adds vertex2 method to Mesh class
- New classes: Transform and ShapeGroup
- Most methods that affect transforms removed, and their functionality
  now uses a new getTransform method and the Transform class
- Bug fixes

Version 0.2:

- First Code Project release

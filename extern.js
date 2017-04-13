/*
 Any copyright to this file is released to the Public Domain.
 http://creativecommons.org/publicdomain/zero/1.0/
 If you like this, you should donate
 to Peter O. (original author of
 the Public Domain HTML 3D Library) at:
 http://peteroupc.github.io/
*/
/* exported H3DU, WebGL2RenderingContext, define, exports, module */
var H3DU, define, exports, module;
/** @typedef {WebGL2RenderingContext} */ var WebGL2RenderingContext;
/** @typedef {Texture} */ H3DU.Texture;
/** @typedef {TextureInfo} */ H3DU.TextureInfo;
/** @typedef {CubeMap} */H3DU.CubeMap;
/** @typedef {FrameBuffer} */H3DU.FrameBuffer;
/** @typedef {FrameBufferInfo} */H3DU.FrameBufferInfo;
/** @typedef {ShaderInfo} */H3DU.ShaderInfo;
/** @typedef {Scene3D} */ H3DU.Scene3D;
/** @typedef {Curve} */H3DU.Curve;
/** @typedef {CurveEval} */H3DU.CurveEval;
/** @typedef {SurfaceEval} */H3DU.SurfaceEval;
/** @typedef {CurveBuilder} */H3DU.CurveBuilder;
/** @typedef {SurfaceBuilder} */H3DU.SurfaceBuilder;
/** @typedef {RenderPass} */H3DU.RenderPass;
/** @typedef {BufferHelper} */H3DU.BufferHelper;
/** @typedef {BufferAccessor} */H3DU.BufferAccessor;
/** @typedef {BSplineCurve} */H3DU.BSplineCurve;
/** @typedef {BSplineSurface} */H3DU.BSplineSurface;
/** @typedef {Surface} */H3DU.Surface;
/** @typedef {ShaderProgram} */ H3DU.ShaderProgram;
/** @typedef {Mesh} */ H3DU.Mesh;
/** @typedef {MeshBuffer} */ H3DU.MeshBuffer;
/** @typedef {Lights} */ H3DU.Lights;
/** @typedef {LightSource} */ H3DU.LightSource;
/** @typedef {Shape} */ H3DU.Shape;
/** @typedef {Material} */ H3DU.Material;
/** @typedef {Batch3D} */ H3DU.Batch3D;
/** @typedef {PbrMaterial} */H3DU.PbrMaterial;
/** @typedef {ShapeGroup} */H3DU.ShapeGroup;
/** @typedef {Transform} */H3DU.Transform;
/** @typedef {BufferedMesh} */H3DU.BufferedMesh;
goog.forwardDeclare('WebGL2RenderingContext');

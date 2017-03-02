/* global H3DU */
/*
 Any copyright to this file is released to the Public Domain.
 http://creativecommons.org/publicdomain/zero/1.0/
 If you like this, you should donate
 to Peter O. (original author of
 the Public Domain HTML 3D Library) at:
 http://peteroupc.github.io/
*/
/**
 * Contains constants for assigning semantics
 * to uniforms and vertex attributes.
 * @class
 * @alias H3DU.Semantic
 */
H3DU.Semantic = {};
/** Attribute semantic for a vertex position.
 * @const
 */
H3DU.Semantic.POSITION = 0;
/** Attribute semantic for a vertex normal.
 * @const
 */
H3DU.Semantic.NORMAL = 1;
/** Attribute semantic for a texture coordinate.
 * @const
 */
H3DU.Semantic.TEXCOORD = 2;
 /** Attribute semantic for a color.
  * @const
  */
H3DU.Semantic.COLOR = 3;
  /** Attribute semantic for a skinning joint.
   * @const
   */
H3DU.Semantic.JOINT = 4;
/** Attribute semantic for a skinning weight.
 * @const
 */
H3DU.Semantic.WEIGHT = 5;
/** Attribute semantic for a tangent vector.
 * @const
 */
H3DU.Semantic.TANGENT = 6;
/** Attribute semantic for a bitangent vector.
 * @const
 */
H3DU.Semantic.BITANGENT = 7;
/** Uniform semantic for a model matrix.
 * @const
 */
H3DU.Semantic.MODEL = 101;
/** Uniform semantic for a view matrix.
 * @const
 */
H3DU.Semantic.VIEW = 102;
/** Uniform semantic for a projection matrix.
 * @const
 */
H3DU.Semantic.PROJECTION = 103;
/** Uniform semantic for a model-view matrix.
 * @const
 */
H3DU.Semantic.MODELVIEW = 104;
/** Uniform semantic for a model-view-projection matrix.
 * @const
 */
H3DU.Semantic.MODELVIEWPROJECTION = 105;
/** Uniform semantic for the inverse of the 3x3 transpose of the model view matrix.
 * @const
 */
H3DU.Semantic.MODELVIEWINVERSETRANSPOSE = 106;
/** Uniform semantic for an inverse view matrix.
 * @const
 */
H3DU.Semantic.VIEWINVERSE = 107;

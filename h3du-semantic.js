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
 * @constructor
 * @alias H3DU.Semantic
 */
export var Semantic = {};
/** Attribute semantic for a vertex position.
 * The default shader uses 3-dimensional positions.
 * @const
 * @static
 */
Semantic.POSITION = 0;
/** Attribute semantic for a vertex normal.
 * The default shader uses 3-dimensional normals.
 * @const
 * @static
 */
Semantic.NORMAL = 1;
/** Attribute semantic for a texture coordinate.<p>
 * Note that the default shader supports only 2-dimensional
 * texture coordinates. For such texturing tasks as mapping
 * a square to a trapezoid, 3-dimensional texture coordinates
 * are useful to ensure the texturing is perspective-correct.
 * In this case, the 3-D texture coordinates are converted
 * to 2-D by dividing the X and Y components by the Z component.
 * In a fragment shader, this can look like the following
 * code: <code>texCoord.xy/texCoord.z</code>.
 * @const
 * @static
 */
Semantic.TEXCOORD = 2;
 /** Attribute semantic for a color.
  * The default shader uses 3-component colors.
  * @const
  * @static
  */
Semantic.COLOR = 3;
  /** Attribute semantic for a skinning joint.
   * @const
   * @static
   */
Semantic.JOINT = 4;
/** Attribute semantic for a skinning weight.
 * @const
 * @static
 */
Semantic.WEIGHT = 5;
/** Attribute semantic for a tangent vector.
 * @const
 * @static
 */
Semantic.TANGENT = 6;
/** Attribute semantic for a bitangent vector.
 * @const
 * @static
 */
Semantic.BITANGENT = 7;
/** Attribute semantic for custom attributes.
 * @const
 * @static
 */
Semantic.CUSTOM = 8;
/** Uniform semantic for a model matrix.
 * @const
 */
Semantic.MODEL = 101;
/** Uniform semantic for a view matrix.
 * @const
 */
Semantic.VIEW = 102;
/** Uniform semantic for a projection matrix.
 * @const
 */
Semantic.PROJECTION = 103;
/** Uniform semantic for a model-view matrix.
 * @const
 */
Semantic.MODELVIEW = 104;
/** Uniform semantic for a model-view-projection matrix.
 * @const
 */
Semantic.MODELVIEWPROJECTION = 105;
/** Uniform semantic for the inverse of the 3x3 transpose of the model-view matrix.
 * @const
 */
Semantic.MODELVIEWINVERSETRANSPOSE = 106;
/** Uniform semantic for an inverse view matrix.
 * @const
 */
Semantic.VIEWINVERSE = 107;

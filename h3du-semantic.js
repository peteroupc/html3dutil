/*
 Any copyright to this file is released to the Public Domain.
 In case this is not possible, this file is also licensed under the Unlicense: https://unlicense.org/
*/
/*
 Any copyright to this file is released to the Public Domain.
 In case this is not possible, this file is also licensed under the Unlicense: https://unlicense.org/
*/
/*
 Any copyright to this file is released to the Public Domain.
 In case this is not possible, this file is also licensed under the Unlicense: https://unlicense.org/
*/
/*
 Any copyright to this file is released to the Public Domain.
 In case this is not possible, this file is also licensed under the Unlicense: https://unlicense.org/
*/
/*
 Any copyright to this file is released to the Public Domain.
 In case this is not possible, this file is also licensed under the Unlicense: https://unlicense.org/
*/
/*
 Any copyright to this file is released to the Public Domain.
 In case this is not possible, this file is also licensed under the Unlicense: https://unlicense.org/
*/
/*
 Any copyright to this file is released to the Public Domain.
 In case this is not possible, this file is also licensed under the Unlicense: https://unlicense.org/
*/
/*
 Any copyright to this file is released to the Public Domain.
 In case this is not possible, this file is also licensed under the Unlicense: https://unlicense.org/
*/
/*
 Any copyright to this file is released to the Public Domain.
 In case this is not possible, this file is also licensed under the Unlicense: https://unlicense.org/
*/
/*
 Any copyright to this file is released to the Public Domain.
 In case this is not possible, this file is also licensed under the Unlicense: https://unlicense.org/
*/
/*
 Any copyright to this file is released to the Public Domain.
 In case this is not possible, this file is also licensed under the Unlicense: https://unlicense.org/
*/
/*
 Any copyright to this file is released to the Public Domain.
 In case this is not possible, this file is also licensed under the Unlicense: https://unlicense.org/
*/
/*
 Any copyright to this file is released to the Public Domain.
 In case this is not possible, this file is also licensed under the Unlicense: https://unlicense.org/
*/
/*
 Any copyright to this file is released to the Public Domain.
 In case this is not possible, this file is also licensed under the Unlicense: https://unlicense.org/
*/
/*
 Any copyright to this file is released to the Public Domain.
 In case this is not possible, this file is also licensed under the Unlicense: https://unlicense.org/
*/
/*
 Any copyright to this file is released to the Public Domain.
 In case this is not possible, this file is also licensed under the Unlicense: https://unlicense.org/
*/
/*
 Any copyright to this file is released to the Public Domain.
 In case this is not possible, this file is also licensed under the Unlicense: https://unlicense.org/
*/
/*
 Any copyright to this file is released to the Public Domain.
 In case this is not possible, this file is also licensed under the Unlicense: https://unlicense.org/
*/
/*
 Any copyright to this file is released to the Public Domain.
 In case this is not possible, this file is also licensed under the Unlicense: https://unlicense.org/
*/
/*
 Any copyright to this file is released to the Public Domain.
 In case this is not possible, this file is also licensed under the Unlicense: https://unlicense.org/
*/
/*
 Any copyright to this file is released to the Public Domain.
 In case this is not possible, this file is also licensed under the Unlicense: https://unlicense.org/
*/
/*
 Any copyright to this file is released to the Public Domain.
 In case this is not possible, this file is also licensed under the Unlicense: https://unlicense.org/
*/
/*
 Any copyright to this file is released to the Public Domain.
 In case this is not possible, this file is also licensed under the Unlicense: https://unlicense.org/
*/
/*
 Any copyright to this file is released to the Public Domain.
 In case this is not possible, this file is also licensed under the Unlicense: https://unlicense.org/
*/
/*
 Any copyright to this file is released to the Public Domain.
 In case this is not possible, this file is also licensed under the Unlicense: https://unlicense.org/
*/
/*
 Any copyright to this file is released to the Public Domain.
 In case this is not possible, this file is also licensed under the Unlicense: https://unlicense.org/
*/
/*
 Any copyright to this file is released to the Public Domain.
 In case this is not possible, this file is also licensed under the Unlicense: https://unlicense.org/
*/
/**
 * Contains constants for assigning semantics
 * to vertex attributes found in mesh buffers and
 * to data that is uniform throughout a particular
 * geometry draw call.
 * @constructor
 * @readonly
 */
export const Semantic = {};
/** Attribute semantic for a vertex position.
 * In general, vertex positions are 2-dimensional or 3-dimensional.
 * @const
 * @static
 */
Semantic.POSITION = 0;
/** Attribute semantic for a vertex normal.<p>
 * For 3D graphics libraries to calculate a mesh buffer's lighting and shading correctly, that mesh buffer must specify normals for all its vertices.<p>
 * <b>What are normals?</b> A normal is a set of numbers (usually three numbers) describing a particular direction. Generally, a normal's direction is perpendicular to a surface's edges, and points up and
 * away from the surface.<p>
 * Normals are important in the lighting and shading model. When light hits an object's surface, how brightly the surface will be lit depends on how directly the light points to the surface. It will be lit the most brightly if the light is directly opposite to its normal, and not at all if the light is perpendicular to the normal or in the same direction as the normal.<p>
 * In general, vertex normals are 3-dimensional
 * and are defined for a mesh buffer only if it
 * also contains vertex positions.
 * @const
 * @static
 */
Semantic.NORMAL = 1;
/** Attribute semantic for a tuple of texture coordinates.<p>
 * If a texture (array of memory units) will be applied to a mesh buffer's geometry, then texture coordinates need to be specified for each vertex in that mesh buffer. In general, a texture coordinate is one of two numbers, called U and V, that map to a specific point in the texture. Each texture coordinate ranges from 0 to 1.<p>
 * In most 3D graphics pipelines, U coordinates start at the left of the texture (0) and increase to the right (1). In some graphics pipelines, such as OpenGL, V coordinates start by default at the bottom of the texture (0) and increase to the top (1), while in others, such as WebGL, Vulkan, Metal, and DirectX, V coordinates start by default at the top of the texture and increase to the bottom. Thus, for example, in OpenGL by default, texture coordinates (0, 1) indicate the top left corner of the texture, and texture coordinates (0.5, 0.5) indicate the center of the texture.<p>
 * In general, texture coordinates describe 2-dimensional points.
 * However, for such texturing tasks as mapping
 * a square to a trapezoid, trios of 3-dimensional texture coordinates (U, V, and Z)
 * are useful to ensure the texturing remains perspective-correct.
 * In this case, the 3-D texture coordinates are converted
 * to 2-D by dividing the U and V components by the Z component.
 * In a fragment shader or pixel shader, this can look like
 * the following
 * code: <code>texCoord.xy/texCoord.z</code>.
 * @const
 * @static
 */
Semantic.TEXCOORD = 2;
/** Attribute semantic for a color.
 * In general, each color consists of three components.
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
 * @const */
Semantic.MODEL = 101;
/** Uniform semantic for a view matrix.
 * @const */
Semantic.VIEW = 102;
/** Uniform semantic for a projection matrix.
 * @const */
Semantic.PROJECTION = 103;
/** Uniform semantic for a model-view matrix.
 * @const */
Semantic.MODELVIEW = 104;
/** Uniform semantic for a model-view-projection matrix.
 * @const */
Semantic.MODELVIEWPROJECTION = 105;
/** Uniform semantic for the inverse of the 3x3 transpose of the model-view matrix.
 * @const */
Semantic.MODELVIEWINVERSETRANSPOSE = 106;
/** Uniform semantic for an inverse view matrix.
 * @const */
Semantic.VIEWINVERSE = 107;
/** Uniform semantic for a joint matrix.
 * @const */
Semantic.JOINTMATRIX = 108;

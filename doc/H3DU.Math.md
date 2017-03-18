# H3DU.Math

[Back to documentation index.](index.md)

<a name='H3DU.Math'></a>
### H3DU.Math()

A collection of math functions for working
with vectors, matrices, quaternions, and other
mathematical objects.

See the tutorial "<a href="tutorial-glmath.md">H3DU's Math Functions</a>" for more information.

### Members

* [GlobalPitchRollYaw](#H3DU.Math.GlobalPitchRollYaw)<br>Indicates that a vector's rotation occurs as a pitch, then roll, then yaw (each rotation around the original axes).
* [GlobalPitchYawRoll](#H3DU.Math.GlobalPitchYawRoll)<br>Indicates that a vector's rotation occurs as a pitch, then yaw, then roll (each rotation around the original axes),
or in the reverse order around
* [GlobalRollPitchYaw](#H3DU.Math.GlobalRollPitchYaw)<br>Indicates that a vector's rotation occurs as a roll, then pitch, then yaw (each rotation around the original axes).
* [GlobalRollYawPitch](#H3DU.Math.GlobalRollYawPitch)<br>Indicates that a vector's rotation occurs as a roll, then yaw, then pitch (each rotation around the original axes).
* [GlobalYawPitchRoll](#H3DU.Math.GlobalYawPitchRoll)<br>Indicates that a vector's rotation occurs as a yaw, then pitch, then roll (each rotation around the original axes).
* [GlobalYawRollPitch](#H3DU.Math.GlobalYawRollPitch)<br>Indicates that a vector's rotation occurs as a yaw, then roll, then pitch (each rotation around the original axes).
* [HalfPi](#H3DU.Math.HalfPi)<br>Closest approximation to pi divided by 2, or a 90-degree turn in radians.
* [LocalPitchRollYaw](#H3DU.Math.LocalPitchRollYaw)<br>Indicates that a vector's rotation occurs as a pitch, then roll, then yaw, where the roll and yaw
occur around the rotated object's new axes and not necessarily the original axes.
* [LocalPitchYawRoll](#H3DU.Math.LocalPitchYawRoll)<br>Indicates that a vector's rotation occurs as a pitch, then yaw, then roll, where the yaw and roll
occur around the rotated object's new axes and not necessarily the original axes.
* [LocalRollPitchYaw](#H3DU.Math.LocalRollPitchYaw)<br>Indicates that a vector's rotation occurs as a roll, then pitch, then yaw, where the pitch and yaw
occur around the rotated object's new axes and not necessarily the original axes.
* [LocalRollYawPitch](#H3DU.Math.LocalRollYawPitch)<br>Indicates that a vector's rotation occurs as a roll, then yaw, then pitch, where the yaw and pitch
occur around the rotated object's new axes and not necessarily the original axes.
* [LocalYawPitchRoll](#H3DU.Math.LocalYawPitchRoll)<br>Indicates that a vector's rotation occurs as a yaw, then pitch, then roll, where the pitch and roll
occur around the rotated object's new axes and not necessarily the original axes.
* [LocalYawRollPitch](#H3DU.Math.LocalYawRollPitch)<br>Indicates that a vector's rotation occurs as a yaw, then roll, then pitch, where the roll and pitch
occur around the rotated object's new axes and not necessarily the original axes.
* [Num180DividedByPi](#H3DU.Math.Num180DividedByPi)<br>Closest approximation to 180 divided by pi, or the number of
degrees in a radian.
* [PiDividedBy180](#H3DU.Math.PiDividedBy180)<br>Closest approximation to pi divided by 180, or the number
of radians in a degree.
* [PiTimes2](#H3DU.Math.PiTimes2)<br>Closest approximation to pi times 2, or a 360-degree turn in radians.
* [PitchRollYaw](#H3DU.Math.PitchRollYaw)<br><b>Deprecated: This constant's name is ambiguous between local and global rotations.
Use <a href="H3DU.Math.md#H3DU.Math.GlobalPitchRollYaw">H3DU.Math.GlobalPitchRollYaw</a> instead.</b>
* [PitchYawRoll](#H3DU.Math.PitchYawRoll)<br><b>Deprecated: This constant's name is ambiguous between local and global rotations.
Use <a href="H3DU.Math.md#H3DU.Math.GlobalPitchYawRoll">H3DU.Math.GlobalPitchYawRoll</a> instead.</b>
* [RollPitchYaw](#H3DU.Math.RollPitchYaw)<br><b>Deprecated: This constant's name is ambiguous between local and global rotations.
Use <a href="H3DU.Math.md#H3DU.Math.GlobalRollPitchYaw">H3DU.Math.GlobalRollPitchYaw</a> instead.</b>
* [RollYawPitch](#H3DU.Math.RollYawPitch)<br><b>Deprecated: This constant's name is ambiguous between local and global rotations.
Use <a href="H3DU.Math.md#H3DU.Math.GlobalRollYawPitch">H3DU.Math.GlobalRollYawPitch</a> instead.</b>
* [ToDegrees](#H3DU.Math.ToDegrees)<br>Closest approximation to 180 divided by pi, or the number of
degrees in a radian.
* [ToRadians](#H3DU.Math.ToRadians)<br>Closest approximation to pi divided by 180, or the number
of radians in a degree.
* [YawPitchRoll](#H3DU.Math.YawPitchRoll)<br><b>Deprecated: This constant's name is ambiguous between local and global rotations.
Use <a href="H3DU.Math.md#H3DU.Math.GlobalYawPitchRoll">H3DU.Math.GlobalYawPitchRoll</a> instead.</b>
* [YawRollPitch](#H3DU.Math.YawRollPitch)<br><b>Deprecated: This constant's name is ambiguous between local and global rotations.
Use <a href="H3DU.Math.md#H3DU.Math.GlobalYawRollPitch">H3DU.Math.GlobalYawRollPitch</a> instead.</b>

### Methods

* [boxCenter](#H3DU.Math.boxCenter)<br>Finds the center of a 3D bounding box.
* [boxDimensions](#H3DU.Math.boxDimensions)<br>Finds the dimensions of a 3D bounding box.
* [boxIsEmpty](#H3DU.Math.boxIsEmpty)<br>Determines whether a 3D bounding box is empty.
* [colorToLinear](#H3DU.Math.colorToLinear)<br>Converts a color in sRGB to the linear RGB color space, and returns
a new vector with the result.
* [colorTosRGB](#H3DU.Math.colorTosRGB)<br>Converts a color in linear RGB to the sRGB color space, and returns
a new vector with the result.
* [frustumHasBox](#H3DU.Math.frustumHasBox)<br>Determines whether an axis-aligned bounding box
is at least partially inside a view frustum.
* [frustumHasPoint](#H3DU.Math.frustumHasPoint)<br>Determines whether a point is
outside or inside a view frustum.
* [frustumHasSphere](#H3DU.Math.frustumHasSphere)<br>Determines whether a sphere is at least
partially inside a view frustum.
* [interpCubicBezier](#H3DU.Math.interpCubicBezier)<br>An interpolation timing function based on the path of a
cubic B&eacute;zier
curve with end points (0, 0) and (1, 1) and with two
configurable control points.
* [mat3copy](#H3DU.Math.mat3copy)<br>Returns a copy of a 3x3 matrix.
* [mat3identity](#H3DU.Math.mat3identity)<br>Returns the identity 3x3 matrix (a matrix that keeps
vectors unchanged when they are transformed with this matrix).
* [mat3invert](#H3DU.Math.mat3invert)<br>Finds the inverse of a 3x3 matrix, describing a transformation that undoes the given transformation.
* [mat3multiply](#H3DU.Math.mat3multiply)<br>Multiplies two 3x3 matrices.
* [mat3transform](#H3DU.Math.mat3transform)<br>Transforms a 3-element vector with a 3x3 matrix and returns
the transformed vector.
* [mat3transpose](#H3DU.Math.mat3transpose)<br>Returns the transpose of a 3x3 matrix.
* [mat3transposeInPlace](#H3DU.Math.mat3transposeInPlace)<br>Transposes a 3x3 matrix in place without creating
a new matrix.
* [mat4copy](#H3DU.Math.mat4copy)<br>Returns a copy of a 4x4 matrix.
* [mat4frustum](#H3DU.Math.mat4frustum)<br>Returns a 4x4 matrix representing a <a href="tutorial-camera.md">perspective projection</a>
in the form of a view frustum, or the limits in the "camera"'s view.
* [mat4identity](#H3DU.Math.mat4identity)<br>Returns the identity 4x4 matrix (a matrix that keeps
vectors unchanged when they are transformed with this matrix).
* [mat4inverseTranspose3](#H3DU.Math.mat4inverseTranspose3)<br>Returns the transposed result of the inverted 3x3 upper left corner of
the given 4x4 matrix.
* [mat4invert](#H3DU.Math.mat4invert)<br>Finds the inverse of a 4x4 matrix, describing a transformation that undoes the given transformation.
* [mat4isIdentity](#H3DU.Math.mat4isIdentity)<br>Returns whether a 4x4 matrix is the identity matrix.
* [mat4lookat](#H3DU.Math.mat4lookat)<br>Returns a 4x4 matrix that represents a camera view,
transforming world space coordinates to <i>eye space</i>
(or <i>camera space</i>).
* [mat4multiply](#H3DU.Math.mat4multiply)<br>Multiplies two 4x4 matrices.
* [mat4ortho](#H3DU.Math.mat4ortho)<br>Returns a 4x4 matrix representing an <a href="tutorial-camera.md">orthographic projection</a>.
* [mat4ortho2d](#H3DU.Math.mat4ortho2d)<br>Returns a 4x4 matrix representing a 2D <a href="tutorial-camera.md">orthographic projection</a>.
* [mat4ortho2dAspect](#H3DU.Math.mat4ortho2dAspect)<br>Returns a 4x4 matrix representing a 2D <a href="tutorial-camera.md">orthographic projection</a>,
retaining the view rectangle's aspect ratio.
* [mat4orthoAspect](#H3DU.Math.mat4orthoAspect)<br>Returns a 4x4 matrix representing an <a href="tutorial-camera.md">orthographic projection</a>,
retaining the view rectangle's aspect ratio.
* [mat4perspective](#H3DU.Math.mat4perspective)<br>Returns a 4x4 matrix representing a <a href="tutorial-camera.md">perspective projection</a>.
* [mat4perspectiveHorizontal](#H3DU.Math.mat4perspectiveHorizontal)<br>Returns a 4x4 matrix representing a <a href="tutorial-camera.md">perspective projection</a>,
given an X axis field of view.
* [mat4projectVec3](#H3DU.Math.mat4projectVec3)<br>Transforms a 3-element vector with a 4x4 matrix and returns
a perspective-correct version of the vector as a 3D point.
* [mat4rotate](#H3DU.Math.mat4rotate)<br>Multiplies a 4x4 matrix by a rotation transformation that rotates vectors
by the given rotation angle and around the given <a href="tutorial-glmath.md">axis of rotation</a>,
and returns a new matrix.
* [mat4rotated](#H3DU.Math.mat4rotated)<br>Returns a 4x4 matrix representing a rotation transformation that rotates vectors
by the given rotation angle and around the given <a href="tutorial-glmath.md">axis of rotation</a>.
* [mat4scale](#H3DU.Math.mat4scale)<br>Multiplies a 4x4 matrix by a scaling transformation.
* [mat4scaleInPlace](#H3DU.Math.mat4scaleInPlace)<br>Modifies a 4x4 matrix by multiplying it by a
scaling transformation.
* [mat4scaled](#H3DU.Math.mat4scaled)<br>Returns a 4x4 matrix representing a scaling transformation.
* [mat4toFrustumPlanes](#H3DU.Math.mat4toFrustumPlanes)<br>Finds the six clipping planes of a view frustum defined
by a 4x4 matrix.
* [mat4toMat3](#H3DU.Math.mat4toMat3)<br>Returns the upper-left part of a 4x4 matrix as a new
3x3 matrix.
* [mat4transform](#H3DU.Math.mat4transform)<br>Transforms a 4-element vector with a 4x4 matrix and returns
the transformed vector.
* [mat4transformVec3](#H3DU.Math.mat4transformVec3)<br>Transforms a 3-element vector with a 4x4 matrix as though it were
an affine transformation matrix (without perspective) and returns the transformed vector.
* [mat4translate](#H3DU.Math.mat4translate)<br>Multiplies a 4x4 matrix by a translation transformation.
* [mat4translated](#H3DU.Math.mat4translated)<br>Returns a 4x4 matrix representing a translation.
* [mat4transpose](#H3DU.Math.mat4transpose)<br>Returns the transpose of a 4x4 matrix.
* [mat4transposeInPlace](#H3DU.Math.mat4transposeInPlace)<br>Transposes a 4x4 matrix in place without creating
a new matrix.
* [planeNorm](#H3DU.Math.planeNorm)<br><b>Deprecated: Use <a href="H3DU.Math.md#H3DU.Math.planeNormalize">H3DU.Math.planeNormalize</a> instead.
The name of this method may be confused with a vector's "norm", another name for its length.</b>
* [planeNormInPlace](#H3DU.Math.planeNormInPlace)<br><b>Deprecated: Use <a href="H3DU.Math.md#H3DU.Math.planeNormalizeInPlace">H3DU.Math.planeNormalizeInPlace</a> instead.
The name of this method may be confused with a vector's "norm", another name for its length.</b>
* [planeNormalize](#H3DU.Math.planeNormalize)<br>Normalizes this plane so that its normal is a <a href="tutorial-glmath.md">unit vector</a>,
unless all the normal's components are 0, and returns a new plane with the result.
* [planeNormalizeInPlace](#H3DU.Math.planeNormalizeInPlace)<br>Normalizes this plane so that its normal is a <a href="tutorial-glmath.md">unit vector</a>,
unless all the normal's components are 0, and sets this plane to the result.
* [quatConjugate](#H3DU.Math.quatConjugate)<br>Returns a quaternion that describes a rotation that undoes the given rotation (an "inverted" rotation); this is done by reversing the sign of the X, Y, and Z components (which describe the quaternion's <a href="tutorial-glmath.md">axis of rotation</a>).
* [quatCopy](#H3DU.Math.quatCopy)<br>Returns a copy of a quaternion.
* [quatDot](#H3DU.Math.quatDot)<br>Finds the dot product of two quaternions.
* [quatFromAxisAngle](#H3DU.Math.quatFromAxisAngle)<br>Generates a quaternion from a rotation transformation that rotates vectors
by the given rotation angle and around the given <a href="tutorial-glmath.md">axis of rotation</a>,
* [quatFromMat4](#H3DU.Math.quatFromMat4)<br>Generates a quaternion from the vector rotation described in a 4x4 matrix.
* [quatFromTaitBryan](#H3DU.Math.quatFromTaitBryan)<br>Generates a quaternion from pitch, yaw and roll angles (or <i>Tait-Bryan angles</i>).
* [quatFromVectors](#H3DU.Math.quatFromVectors)<br>Generates a quaternion describing a rotation between
two 3-element vectors.
* [quatIdentity](#H3DU.Math.quatIdentity)<br>Returns the identity quaternion of multiplication, (0, 0, 0, 1).
* [quatInverse](#H3DU.Math.quatInverse)<br><b>Deprecated: Use <a href="H3DU.Math.md#H3DU.Math.quatInvert">H3DU.Math.quatInvert</a> instead.</b>
* [quatInvert](#H3DU.Math.quatInvert)<br>Returns a quaternion that describes a rotation that undoes the given rotation (an "inverted" rotation) and is converted to a <a href="tutorial-glmath.md">unit vector</a>.
* [quatIsIdentity](#H3DU.Math.quatIsIdentity)<br>Returns whether this quaternion is the identity quaternion, (0, 0, 0, 1).
* [quatLength](#H3DU.Math.quatLength)<br>Returns the distance of this quaternion from the origin.
* [quatMultiply](#H3DU.Math.quatMultiply)<br>Multiplies two quaternions, creating a composite rotation.
* [quatNlerp](#H3DU.Math.quatNlerp)<br>Returns a quaternion that lies along the shortest path between the
given two quaternion rotations, using a linear interpolation function, and converts
it to a <a href="tutorial-glmath.md">unit vector</a>.
* [quatNorm](#H3DU.Math.quatNorm)<br><b>Deprecated: Use <a href="H3DU.Math.md#H3DU.Math.quatNormalize">H3DU.Math.quatNormalize</a> instead.
The name of this method may be confused with a vector's "norm", another name for its length.</b>
* [quatNormInPlace](#H3DU.Math.quatNormInPlace)<br><b>Deprecated: Use <a href="H3DU.Math.md#H3DU.Math.quatNormalizeInPlace">H3DU.Math.quatNormalizeInPlace</a> instead.
The name of this method may be confused with a vector's "norm", another name for its length.</b>
* [quatNormalize](#H3DU.Math.quatNormalize)<br>Converts a quaternion to a <a href="tutorial-glmath.md">unit vector</a>; returns a new quaternion.
* [quatNormalizeInPlace](#H3DU.Math.quatNormalizeInPlace)<br>Converts a quaternion to a <a href="tutorial-glmath.md">unit vector</a>.
* [quatRotate](#H3DU.Math.quatRotate)<br>Multiplies a quaternion by a rotation transformation that rotates vectors
by the given rotation angle and around the given <a href="tutorial-glmath.md">axis of rotation</a>.
* [quatScale](#H3DU.Math.quatScale)<br>Multiplies each element of a quaternion by a factor
and returns the result as a new quaternion.
* [quatScaleInPlace](#H3DU.Math.quatScaleInPlace)<br>Multiplies each element of a quaternion by a factor
and stores the result in that quaternion.
* [quatSlerp](#H3DU.Math.quatSlerp)<br>Returns a quaternion that lies along the shortest path between the
given two quaternion rotations, using a spherical interpolation function.
* [quatToAxisAngle](#H3DU.Math.quatToAxisAngle)<br>Calculates the vector rotation for this quaternion in the form
of the angle to rotate the vector by and an <a href="tutorial-glmath.md">axis of rotation</a> to
rotate that vector around.
* [quatToMat4](#H3DU.Math.quatToMat4)<br>Generates a 4x4 matrix describing the rotation
described by this quaternion.
* [quatToTaitBryan](#H3DU.Math.quatToTaitBryan)<br>Converts this quaternion to the same version of the rotation
in the form of pitch, yaw, and roll angles (or <i>Tait-Bryan angles</i>).
* [quatTransform](#H3DU.Math.quatTransform)<br>Transforms a 3- or 4-element vector using a
quaternion's vector rotation.
* [vec3abs](#H3DU.Math.vec3abs)<br>Returns a new 3-element
vector with the absolute value of each of its components.
* [vec3absInPlace](#H3DU.Math.vec3absInPlace)<br>Sets each component of the given 3-element
vector to its absolute value.
* [vec3add](#H3DU.Math.vec3add)<br>Adds two 3-element vectors and returns a new
vector with the result.
* [vec3addInPlace](#H3DU.Math.vec3addInPlace)<br>Adds two 3-element vectors and stores
the result in the first vector.
* [vec3assign](#H3DU.Math.vec3assign)<br>Assigns the values of a 3-element vector into another
3-element vector.
* [vec3clamp](#H3DU.Math.vec3clamp)<br>Returns a 3-element vector in which each element of the given 3-element vector is clamped
so it's not less than one value or greater than another value.
* [vec3clampInPlace](#H3DU.Math.vec3clampInPlace)<br>Clamps each element of the given 3-element vector
so it's not less than one value or greater than another value.
* [vec3copy](#H3DU.Math.vec3copy)<br>Returns a copy of a 3-element vector.
* [vec3cross](#H3DU.Math.vec3cross)<br>Finds the cross product of two 3-element vectors (called A and B).
* [vec3dist](#H3DU.Math.vec3dist)<br>Finds the straight-line distance from one three-element vector
to another, treating both as 3D points.
* [vec3dot](#H3DU.Math.vec3dot)<br>Finds the dot product of two 3-element vectors.
* [vec3fromWindowPoint](#H3DU.Math.vec3fromWindowPoint)<br>Unprojects the <i>window coordinates</i> given in a
3-element vector,
using the given transformation matrix and viewport
rectangle.
* [vec3length](#H3DU.Math.vec3length)<br>Returns the distance of this 3-element vector from the origin,
also known as its <i>length</i> or <i>magnitude</i>.
* [vec3lerp](#H3DU.Math.vec3lerp)<br>Does a linear interpolation between two 3-element vectors;
returns a new vector.
* [vec3mul](#H3DU.Math.vec3mul)<br>Multiplies each of the components of two 3-element vectors and returns a new
vector with the result.
* [vec3mulInPlace](#H3DU.Math.vec3mulInPlace)<br>Multiplies each of the components of two 3-element vectors and stores
the result in the first vector.
* [vec3negate](#H3DU.Math.vec3negate)<br>Negates a 3-element vector and returns a new
vector with the result, which is generally a vector with
the same length but opposite direction.
* [vec3negateInPlace](#H3DU.Math.vec3negateInPlace)<br>Negates a 3-element vector in place, generally resulting in a vector with
the same length but opposite direction.
* [vec3norm](#H3DU.Math.vec3norm)<br><b>Deprecated: Use <a href="H3DU.Math.md#H3DU.Math.vec3normalize">H3DU.Math.vec3normalize</a> instead.
The name of this method may be confused with a vector's "norm", another name for its length.</b>
* [vec3normInPlace](#H3DU.Math.vec3normInPlace)<br><b>Deprecated: Use <a href="H3DU.Math.md#H3DU.Math.vec3normalizeInPlace">H3DU.Math.vec3normalizeInPlace</a> instead.
The name of this method may be confused with a vector's "norm", another name for its length.</b>
* [vec3normalize](#H3DU.Math.vec3normalize)<br>Converts a 3-element vector to a <a href="tutorial-glmath.md">unit vector</a>; returns a new vector.
* [vec3normalizeInPlace](#H3DU.Math.vec3normalizeInPlace)<br>Converts a 3-element vector to a <a href="tutorial-glmath.md">unit vector</a>.
* [vec3perp](#H3DU.Math.vec3perp)<br>Returns an arbitrary 3-element vector that is perpendicular
(orthogonal) to the given 3-element vector.
* [vec3proj](#H3DU.Math.vec3proj)<br>Returns the projection of a 3-element vector on the given
reference vector.
* [vec3reflect](#H3DU.Math.vec3reflect)<br>Returns a vector that reflects off a surface.
* [vec3scale](#H3DU.Math.vec3scale)<br>Multiplies each element of a 3-element vector by a factor.
* [vec3scaleInPlace](#H3DU.Math.vec3scaleInPlace)<br>Multiplies each element of a 3-element vector by a factor, so
that the vector points in the same direction
but its length is multiplied by the given factor.
* [vec3sub](#H3DU.Math.vec3sub)<br>Subtracts the second vector from the first vector and returns a new
vector with the result.
* [vec3subInPlace](#H3DU.Math.vec3subInPlace)<br>Subtracts the second vector from the first vector and stores
the result in the first vector.
* [vec3toWindowPoint](#H3DU.Math.vec3toWindowPoint)<br>Transforms the 3D point specified in this 3-element vector to its
<i>window coordinates</i>
using the given transformation matrix and viewport rectangle.
* [vec3triple](#H3DU.Math.vec3triple)<br>Finds the scalar triple product of three vectors (A, B, and C).
* [vec4abs](#H3DU.Math.vec4abs)<br>Returns a new 4-element
vector with the absolute value of each of its components.
* [vec4absInPlace](#H3DU.Math.vec4absInPlace)<br>Sets each component of the given 4-element
vector to its absolute value.
* [vec4add](#H3DU.Math.vec4add)<br>Adds two 4-element vectors and returns a new
vector with the result.
* [vec4addInPlace](#H3DU.Math.vec4addInPlace)<br>Adds two 4-element vectors and stores
the result in the first vector.
* [vec4assign](#H3DU.Math.vec4assign)<br>Assigns the values of a 4-element vector into another
4-element vector.
* [vec4clamp](#H3DU.Math.vec4clamp)<br>Returns a 4-element vector in which each element of the given 4-element vector is clamped
* [vec4clampInPlace](#H3DU.Math.vec4clampInPlace)<br>Clamps each element of the given 4-element vector
so it's not less than one value or greater than another value.
* [vec4copy](#H3DU.Math.vec4copy)<br>Returns a copy of a 4-element vector.
* [vec4dot](#H3DU.Math.vec4dot)<br>Finds the dot product of two 4-element vectors.
* [vec4length](#H3DU.Math.vec4length)<br>Returns the distance of this 4-element vector from the origin,
also known as its <i>length</i> or <i>magnitude</i>.
* [vec4lerp](#H3DU.Math.vec4lerp)<br>Does a linear interpolation between two 4-element vectors;
returns a new vector.
* [vec4negate](#H3DU.Math.vec4negate)<br>Negates a 4-element vector and returns a new
vector with the result, which is generally a vector with
the same length but opposite direction.
* [vec4negateInPlace](#H3DU.Math.vec4negateInPlace)<br>Negates a 4-element vector in place, generally resulting in a vector with
the same length but opposite direction.
* [vec4norm](#H3DU.Math.vec4norm)<br><b>Deprecated: Use <a href="H3DU.Math.md#H3DU.Math.vec4normalize">H3DU.Math.vec4normalize</a> instead.
The name of this method may be confused with a vector's "norm", another name for its length.</b>
* [vec4normInPlace](#H3DU.Math.vec4normInPlace)<br><b>Deprecated: Use <a href="H3DU.Math.md#H3DU.Math.vec4normalizeInPlace">H3DU.Math.vec4normalizeInPlace</a> instead.
The name of this method may be confused with a vector's "norm", another name for its length.</b>
* [vec4normalize](#H3DU.Math.vec4normalize)<br>Converts a 4-element vector to a <a href="tutorial-glmath.md">unit vector</a>; returns a new vector.
* [vec4normalizeInPlace](#H3DU.Math.vec4normalizeInPlace)<br>Converts a 4-element vector to a <a href="tutorial-glmath.md">unit vector</a>.
* [vec4proj](#H3DU.Math.vec4proj)<br>Returns the projection of a 4-element vector on the given
reference vector.
* [vec4scale](#H3DU.Math.vec4scale)<br>Multiplies each element of a 4-element vector by a factor, returning
a new vector that will point in the same direction
but with its length multiplied by the given factor.
* [vec4scaleInPlace](#H3DU.Math.vec4scaleInPlace)<br>Multiplies each element of a 4-element vector by a factor, so
that the vector points in the same direction
but its length is multiplied by the given factor.
* [vec4sub](#H3DU.Math.vec4sub)<br>Subtracts the second vector from the first vector and returns a new
vector with the result.
* [vec4subInPlace](#H3DU.Math.vec4subInPlace)<br>Subtracts the second vector from the first vector and stores
the result in the first vector.

<a name='H3DU.Math.GlobalPitchRollYaw'></a>
### H3DU.Math.GlobalPitchRollYaw (constant)

Indicates that a vector's rotation occurs as a pitch, then roll, then yaw (each rotation around the original axes).

<a name='H3DU.Math.GlobalPitchYawRoll'></a>
### H3DU.Math.GlobalPitchYawRoll (constant)

Indicates that a vector's rotation occurs as a pitch, then yaw, then roll (each rotation around the original axes),
or in the reverse order around

<a name='H3DU.Math.GlobalRollPitchYaw'></a>
### H3DU.Math.GlobalRollPitchYaw (constant)

Indicates that a vector's rotation occurs as a roll, then pitch, then yaw (each rotation around the original axes).

<a name='H3DU.Math.GlobalRollYawPitch'></a>
### H3DU.Math.GlobalRollYawPitch (constant)

Indicates that a vector's rotation occurs as a roll, then yaw, then pitch (each rotation around the original axes).

<a name='H3DU.Math.GlobalYawPitchRoll'></a>
### H3DU.Math.GlobalYawPitchRoll (constant)

Indicates that a vector's rotation occurs as a yaw, then pitch, then roll (each rotation around the original axes).

<a name='H3DU.Math.GlobalYawRollPitch'></a>
### H3DU.Math.GlobalYawRollPitch (constant)

Indicates that a vector's rotation occurs as a yaw, then roll, then pitch (each rotation around the original axes).

<a name='H3DU.Math.HalfPi'></a>
### H3DU.Math.HalfPi (constant)

Closest approximation to pi divided by 2, or a 90-degree turn in radians.

Default Value: `1.5707963267948966`

<a name='H3DU.Math.LocalPitchRollYaw'></a>
### H3DU.Math.LocalPitchRollYaw (constant)

Indicates that a vector's rotation occurs as a pitch, then roll, then yaw, where the roll and yaw
occur around the rotated object's new axes and not necessarily the original axes.

<a name='H3DU.Math.LocalPitchYawRoll'></a>
### H3DU.Math.LocalPitchYawRoll (constant)

Indicates that a vector's rotation occurs as a pitch, then yaw, then roll, where the yaw and roll
occur around the rotated object's new axes and not necessarily the original axes.

<a name='H3DU.Math.LocalRollPitchYaw'></a>
### H3DU.Math.LocalRollPitchYaw (constant)

Indicates that a vector's rotation occurs as a roll, then pitch, then yaw, where the pitch and yaw
occur around the rotated object's new axes and not necessarily the original axes.

<a name='H3DU.Math.LocalRollYawPitch'></a>
### H3DU.Math.LocalRollYawPitch (constant)

Indicates that a vector's rotation occurs as a roll, then yaw, then pitch, where the yaw and pitch
occur around the rotated object's new axes and not necessarily the original axes.

<a name='H3DU.Math.LocalYawPitchRoll'></a>
### H3DU.Math.LocalYawPitchRoll (constant)

Indicates that a vector's rotation occurs as a yaw, then pitch, then roll, where the pitch and roll
occur around the rotated object's new axes and not necessarily the original axes.

<a name='H3DU.Math.LocalYawRollPitch'></a>
### H3DU.Math.LocalYawRollPitch (constant)

Indicates that a vector's rotation occurs as a yaw, then roll, then pitch, where the roll and pitch
occur around the rotated object's new axes and not necessarily the original axes.

<a name='H3DU.Math.Num180DividedByPi'></a>
### H3DU.Math.Num180DividedByPi (constant)

Closest approximation to 180 divided by pi, or the number of
degrees in a radian. Multiply by this number to convert radians to degrees.

Default Value: `57.29577951308232`

<a name='H3DU.Math.PiDividedBy180'></a>
### H3DU.Math.PiDividedBy180 (constant)

Closest approximation to pi divided by 180, or the number
of radians in a degree. Multiply by this number to convert degrees to radians.

Default Value: `0.017453292519943295`

<a name='H3DU.Math.PiTimes2'></a>
### H3DU.Math.PiTimes2 (constant)

Closest approximation to pi times 2, or a 360-degree turn in radians.

Default Value: `6.283185307179586`

<a name='H3DU.Math.PitchRollYaw'></a>
### H3DU.Math.PitchRollYaw (constant)

<b>Deprecated: This constant's name is ambiguous between local and global rotations.
Use <a href="H3DU.Math.md#H3DU.Math.GlobalPitchRollYaw">H3DU.Math.GlobalPitchRollYaw</a> instead.</b>

Indicates that a vector's rotation occurs as a pitch, then roll, then yaw (each rotation around the original axes).

<a name='H3DU.Math.PitchYawRoll'></a>
### H3DU.Math.PitchYawRoll (constant)

<b>Deprecated: This constant's name is ambiguous between local and global rotations.
Use <a href="H3DU.Math.md#H3DU.Math.GlobalPitchYawRoll">H3DU.Math.GlobalPitchYawRoll</a> instead.</b>

Indicates that a vector's rotation occurs as a pitch, then yaw, then roll (each rotation around the original axes).

<a name='H3DU.Math.RollPitchYaw'></a>
### H3DU.Math.RollPitchYaw (constant)

<b>Deprecated: This constant's name is ambiguous between local and global rotations.
Use <a href="H3DU.Math.md#H3DU.Math.GlobalRollPitchYaw">H3DU.Math.GlobalRollPitchYaw</a> instead.</b>

Indicates that a vector's rotation occurs as a roll, then pitch, then yaw (each rotation around the original axes).

<a name='H3DU.Math.RollYawPitch'></a>
### H3DU.Math.RollYawPitch (constant)

<b>Deprecated: This constant's name is ambiguous between local and global rotations.
Use <a href="H3DU.Math.md#H3DU.Math.GlobalRollYawPitch">H3DU.Math.GlobalRollYawPitch</a> instead.</b>

Indicates that a vector's rotation occurs as a roll, then yaw, then pitch (each rotation around the original axes).

<a name='H3DU.Math.ToDegrees'></a>
### H3DU.Math.ToDegrees (constant)

Closest approximation to 180 divided by pi, or the number of
degrees in a radian. Multiply by this number to convert radians to degrees.

<a name='H3DU.Math.ToRadians'></a>
### H3DU.Math.ToRadians (constant)

Closest approximation to pi divided by 180, or the number
of radians in a degree. Multiply by this number to convert degrees to radians.

<a name='H3DU.Math.YawPitchRoll'></a>
### H3DU.Math.YawPitchRoll (constant)

<b>Deprecated: This constant's name is ambiguous between local and global rotations.
Use <a href="H3DU.Math.md#H3DU.Math.GlobalYawPitchRoll">H3DU.Math.GlobalYawPitchRoll</a> instead.</b>

Indicates that a vector's rotation occurs as a yaw, then pitch, then roll (each rotation around the original axes).

<a name='H3DU.Math.YawRollPitch'></a>
### H3DU.Math.YawRollPitch (constant)

<b>Deprecated: This constant's name is ambiguous between local and global rotations.
Use <a href="H3DU.Math.md#H3DU.Math.GlobalYawRollPitch">H3DU.Math.GlobalYawRollPitch</a> instead.</b>

Indicates that a vector's rotation occurs as a yaw, then roll, then pitch (each rotation around the original axes).

<a name='H3DU.Math.boxCenter'></a>
### (static) H3DU.Math.boxCenter(box)

Finds the center of a 3D bounding box.

#### Parameters

* `box` (Type: Array.&lt;number>)<br>An axis-aligned bounding box, which is an array of six values. The first three values are the smallest X, Y, and Z coordinates, and the last three values are the largest X, Y, and Z coordinates.

#### Return Value

A 3-element array containing the
X, Y, and Z coordinates, respectively, of the bounding box's
center. (Type: Array.&lt;number>)

<a name='H3DU.Math.boxDimensions'></a>
### (static) H3DU.Math.boxDimensions(box)

Finds the dimensions of a 3D bounding box. This is done by subtracting
the first three values of the given array with its last three values.

#### Parameters

* `box` (Type: Array.&lt;number>)<br>An axis-aligned bounding box, which is an array of six values. The first three values are the smallest X, Y, and Z coordinates, and the last three values are the largest X, Y, and Z coordinates.

#### Return Value

A 3-element array containing the
width, height, and depth of the bounding box, respectively. If
at least one of the minimum coordinates is greater than its
corresponding maximum coordinate, the array can contain
negative values. (Type: Array.&lt;number>)

<a name='H3DU.Math.boxIsEmpty'></a>
### (static) H3DU.Math.boxIsEmpty(box)

Determines whether a 3D bounding box is empty.
This is determined if the minimum coordinate
is larger than the corresponding maximum coordinate.

#### Parameters

* `box` (Type: Array.&lt;number>)<br>An axis-aligned bounding box, which is an array of six values. The first three values are the smallest X, Y, and Z coordinates, and the last three values are the largest X, Y, and Z coordinates.

#### Return Value

<code>true</code> if at least one
of the minimum coordinates is greater than its
corresponding maximum coordinate; otherwise, <code>false</code>. (Type: boolean)

<a name='H3DU.Math.colorToLinear'></a>
### (static) H3DU.Math.colorToLinear(srgb)

Converts a color in sRGB to the linear RGB color space, and returns
a new vector with the result.

The sRGB color space is a nonlinear red-green-blue color space;
it <i>roughly</i> differs from linear RGB in having an exponent
of 1/2.2 from linear RGB. Linear RGB is linear because of its linear relationship of light emitted
by a surface of the given color.

#### Parameters

* `srgb` (Type: Array.&lt;number>)<br>A three- or four-element vector giving the red, green, and blue components, in that order, of an sRGB color. The alpha component is either the fourth element in the case of a four-element vector, or 1.0 in the case of a three-element vector. Each element in the vector ranges from 0 through 1.

#### Return Value

A three-element vector giving
the red, green, and blue components, in that order, of the given color
in linear RGB. The alpha component will be as specified
in the "srgb" parameter. (Type: Array.&lt;number>)

<a name='H3DU.Math.colorTosRGB'></a>
### (static) H3DU.Math.colorTosRGB(lin)

Converts a color in linear RGB to the sRGB color space, and returns
a new vector with the result.

The sRGB color space is a nonlinear red-green-blue color space;
it <i>roughly</i> differs from linear RGB in having an exponent
of 1/2.2 from linear RGB. Linear RGB is linear because of its linear relationship of light emitted
by a surface of the given color.

#### Parameters

* `lin` (Type: Array.&lt;number>)<br>A three- or four-element vector giving the red, green, and blue components, in that order, of a linear RGB color. The alpha component is either the fourth element in the case of a four-element vector, or 1.0 in the case of a three-element vector. Each element in the vector ranges from 0 through 1.

#### Return Value

lin A four-element vector giving
the red, green, blue, and alpha components, in that order, of the given color
in the sRGB color space. The alpha component will be as specified
in the "lin" parameter. (Type: Array.&lt;number>)

<a name='H3DU.Math.frustumHasBox'></a>
### (static) H3DU.Math.frustumHasBox(frustum, box)

Determines whether an axis-aligned bounding box
is at least partially inside a view frustum.

#### Parameters

* `frustum` (Type: Array.&lt;Array.&lt;number>>)<br>An array of six 4-element arrays representing the six clipping planes of the view frustum. In order, they are the left, right, top, bottom, near, and far clipping planes.
* `box` (Type: Array.&lt;number>)<br>An axis-aligned bounding box in world space, which is an array of six values. The first three values are the smallest X, Y, and Z coordinates, and the last three values are the largest X, Y, and Z coordinates.

#### Return Value

<code>true</code> if the box
may be partially or totally
inside the frustum; <code>false</code> if the box is
definitely outside the frustum, or if the box is empty
(see "boxIsEmpty"). (Type: boolean)

<a name='H3DU.Math.frustumHasPoint'></a>
### (static) H3DU.Math.frustumHasPoint(frustum, x, y, z)

Determines whether a point is
outside or inside a view frustum.

#### Parameters

* `frustum` (Type: Array.&lt;Array.&lt;number>>)<br>An array of six 4-element arrays representing the six clipping planes of the view frustum. In order, they are the left, right, top, bottom, near, and far clipping planes.
* `x` (Type: number)<br>X coordinate of a point in world space.
* `y` (Type: number)<br>Y coordinate of a point in world space.
* `z` (Type: number)<br>Z coordinate of a point in world space.

#### Return Value

true if the point is inside;
otherwise false; (Type: boolean)

<a name='H3DU.Math.frustumHasSphere'></a>
### (static) H3DU.Math.frustumHasSphere(frustum, x, y, z, radius)

Determines whether a sphere is at least
partially inside a view frustum.

#### Parameters

* `frustum` (Type: Array.&lt;Array.&lt;number>>)<br>An array of six 4-element arrays representing the six clipping planes of the view frustum. In order, they are the left, right, top, bottom, near, and far clipping planes.
* `x` (Type: number)<br>X coordinate of the sphere's center in world space.
* `y` (Type: number)<br>Y coordinate of the sphere's center in world space.
* `z` (Type: number)<br>Z coordinate of the sphere's center in world space.
* `radius` (Type: number)<br>Radius of the sphere in world-space units.

#### Return Value

<code>true</code> if the sphere
is partially or totally
inside the frustum; <code>false</code> otherwise. (Type: boolean)

<a name='H3DU.Math.interpCubicBezier'></a>
### (static) H3DU.Math.interpCubicBezier(a, b, c, d, t)

An interpolation timing function based on the path of a
cubic B&eacute;zier
curve with end points (0, 0) and (1, 1) and with two
configurable control points. The X coordinates of the
curve indicate time, and the Y coordinates of the curve
indicate how far the interpolation has reached.

To use this method, you must include the script "extras/interp.js". Example:

    <script type="text/javascript" src="extras/interp.js"></script>

#### Parameters

* `a` (Type: number)<br>X coordinate of the first control point of the curve. Should be within the range 0 through 1.
* `b` (Type: number)<br>Y coordinate of the first control point of the curve. Should be within the range 0 through 1, but may exceed this range.
* `c` (Type: number)<br>X coordinate of the second control point of the curve. Should be within the range 0 through 1.
* `d` (Type: number)<br>Y coordinate of the second control point of the curve. Should be within the range 0 through 1, but may exceed this range.
* `t` (Type: number)<br>Number ranging from 0 through 1 that indicates time.

#### Return Value

Number ranging from 0 through 1 that indicates
how far the interpolation has reached. Returns 0 if <code>t</code>
is 0 or less, and 1 if <code>t</code> is 1 or greater. (Type: number)

<a name='H3DU.Math.mat3copy'></a>
### (static) H3DU.Math.mat3copy(mat)

Returns a copy of a 3x3 matrix.

#### Parameters

* `mat` (Type: Array.&lt;number>)<br>A 3x3atrix.

#### Return Value

Return value. (Type: Array.&lt;number>)

<a name='H3DU.Math.mat3identity'></a>
### (static) H3DU.Math.mat3identity()

Returns the identity 3x3 matrix (a matrix that keeps
vectors unchanged when they are transformed with this matrix).

#### Return Value

Return value. (Type: Array.&lt;number>)

<a name='H3DU.Math.mat3invert'></a>
### (static) H3DU.Math.mat3invert(m)

Finds the inverse of a 3x3 matrix, describing a transformation that undoes the given transformation.

#### Parameters

* `m` (Type: Array.&lt;number>)<br>A 3x3 matrix.

#### Return Value

The resulting 3x3 matrix.
Returns the identity matrix if this matrix's determinant, or overall scaling factor, is 0 or extremely close to 0. (Type: Array.&lt;number>)

<a name='H3DU.Math.mat3multiply'></a>
### (static) H3DU.Math.mat3multiply(a, b)

Multiplies two 3x3 matrices. A new matrix is returned.
The matrices are multiplied such that the transformations
they describe happen in reverse order. For example, if the first
matrix (input matrix) describes a translation and the second
matrix describes a scaling, the multiplied matrix will describe
the effect of scaling then translation. (Multiplying the first matrix
by the second is the same as multiplying the second matrix
by the first matrix's transpose; a transpose is a matrix whose rows
are converted to columns and vice versa.)

The matrix multiplication is effectively done by breaking up matrix <code>b</code>
into three 3-element vectors (the first 3 elements make up the first vector, and so on),
<a href="H3DU.Math.md#H3DU.Math.mat3transform">transforming</a> each vector with
matrix <code>a</code>, and putting the vectors back together into a new matrix.

#### Parameters

* `a` (Type: Array.&lt;number>)<br>The first matrix.
* `b` (Type: Array.&lt;number>)<br>The second matrix.

#### Return Value

The resulting 3x3 matrix. (Type: Array.&lt;number>)

<a name='H3DU.Math.mat3transform'></a>
### (static) H3DU.Math.mat3transform(mat, v, [vy], [vz])

Transforms a 3-element vector with a 3x3 matrix and returns
the transformed vector.

Transforming a vector (<code>v</code>) with a matrix (<code>mat</code>)
is effectively done by breaking up <code>mat</code> into three 3-element vectors
(the first 3 elements make up the first vector, and so on), multiplying
each vector in <code>mat</code> by the corresponding component in
<code>v</code>, and adding up the resulting vectors (except <code>v</code>) to
get the transformed vector.

#### Parameters

* `mat` (Type: Array.&lt;number>)<br>A 3x3 matrix.
* `v` (Type: Array.&lt;number> | Number)<br>X coordinate. If "vy", and "vz" are omitted, this value can instead be a 4-element array giving the X, Y, and Z coordinates.
* `vy` (Type: number) (optional)<br>Y coordinate.
* `vz` (Type: number) (optional)<br>Z coordinate. To transform a 2D point, set Z to 1, and divide the result's X and Y by the result's Z.

#### Return Value

The transformed vector. (Type: Array.&lt;number>)

<a name='H3DU.Math.mat3transpose'></a>
### (static) H3DU.Math.mat3transpose(m3)

Returns the transpose of a 3x3 matrix. (A transpose is a
matrix whose rows are converted to columns and vice versa.)

#### Parameters

* `m3` (Type: Array.&lt;number>)<br>A 3x3 matrix.

#### Return Value

The resulting 3x3 matrix. (Type: Array.&lt;number>)

<a name='H3DU.Math.mat3transposeInPlace'></a>
### (static) H3DU.Math.mat3transposeInPlace(mat)

Transposes a 3x3 matrix in place without creating
a new matrix. (A transpose is a matrix whose rows
are converted to columns and vice versa.)

#### Parameters

* `mat` (Type: Array.&lt;number>)<br>A 3x3 matrix.

#### Return Value

The parameter "mat". (Type: Array.&lt;number>)

<a name='H3DU.Math.mat4copy'></a>
### (static) H3DU.Math.mat4copy(mat)

Returns a copy of a 4x4 matrix.

#### Parameters

* `mat` (Type: Array.&lt;number>)<br>A 4x4 matrix.

#### Return Value

Return value. (Type: Array.&lt;number>)

<a name='H3DU.Math.mat4frustum'></a>
### (static) H3DU.Math.mat4frustum(l, r, b, t, near, far)

Returns a 4x4 matrix representing a <a href="tutorial-camera.md">perspective projection</a>
in the form of a view frustum, or the limits in the "camera"'s view.

This method is designed for enabling a <a href="tutorial-glmath.md">right-handed coordinate system</a>.
To adjust the result of this method for a left-handed system,
reverse the sign of the 9th, 10th, 11th, and 12th
elements of the result (zero-based indices 8, 9, 10, and 11).

#### Parameters

* `l` (Type: number)<br>X coordinate of the point in eye space where the left clipping plane meets the near clipping plane.
* `r` (Type: number)<br>X coordinate of the point in eye space where the right clipping plane meets the near clipping plane. ("l" is usually less than "r", so that X coordinates increase leftward. If "l" is greater than "r", X coordinates increase in the opposite direction.)
* `b` (Type: number)<br>Y coordinate of the point in eye space where the bottom clipping plane meets the near clipping plane.
* `t` (Type: number)<br>Y coordinate of the point in eye space where the top clipping plane meets the near clipping plane. ("b" is usually less than "t", so that Y coordinates increase upward, as they do in WebGL when just this matrix is used to transform vertices. If "b" is greater than "t", Y coordinates increase in the opposite direction.)
* `near` (Type: number)<br>The distance, in eye space, from the "camera" to the near clipping plane. Objects closer than this distance won't be seen.

This value should be greater than 0, and should be set to the highest distance from the "camera" that the application can afford to clip out for being too close, for example, 0.5, 1, or higher.
* `far` (Type: number)<br>The distance, in eye space, from the "camera" to the far clipping plane. Objects beyond this distance will be too far to be seen.<br>This value is usually greater than "near", should be greater than 0, and should be set so that the absolute ratio of "far" to "near" is as small as the application can accept.<br> In the usual case that "far" is greater than "near", depth buffer values will be more concentrated around the near plane than around the far plane due to the perspective projection. The greater the ratio of "far" to "near", the more concentrated the values will be around the near plane, and the more likely two objects close to the far plane will have identical depth values. (Most WebGL implementations support 24-bit depth buffers, meaning they support 16,777,216 possible values per pixel.)

#### Return Value

The resulting 4x4 matrix. (Type: Array.&lt;number>)

<a name='H3DU.Math.mat4identity'></a>
### (static) H3DU.Math.mat4identity()

Returns the identity 4x4 matrix (a matrix that keeps
vectors unchanged when they are transformed with this matrix).

#### Return Value

Return value. (Type: Array.&lt;number>)

<a name='H3DU.Math.mat4inverseTranspose3'></a>
### (static) H3DU.Math.mat4inverseTranspose3(m4)

Returns the transposed result of the inverted 3x3 upper left corner of
the given 4x4 matrix.

This is usually used to convert a model-view matrix (view matrix multiplied by model or world matrix) to a matrix
for transforming surface normals in order to keep them perpendicular
to a surface transformed by the model-view matrix. Normals are then
transformed by this matrix and then converted to <a href="tutorial-glmath.md">unit vectors</a>. But if the
input matrix uses only rotations, translations, and/or uniform scaling
(same scaling in X, Y, and Z), the 3x3 upper left of the input matrix can
be used instead of the inverse-transpose matrix to transform the normals.

#### Parameters

* `m4` (Type: Array.&lt;number>)<br>A 4x4 matrix.

#### Return Value

The resulting 3x3 matrix. If the matrix
can't be inverted, returns the identity 3x3 matrix. (Type: Array.&lt;number>)

<a name='H3DU.Math.mat4invert'></a>
### (static) H3DU.Math.mat4invert(m)

Finds the inverse of a 4x4 matrix, describing a transformation that undoes the given transformation.

#### Parameters

* `m` (Type: Array.&lt;number>)<br>A 4x4 matrix.

#### Return Value

The resulting 4x4 matrix.
Returns the identity matrix if this matrix's determinant, or overall scaling factor, is 0 or extremely close to 0. (Type: Array.&lt;number>)

<a name='H3DU.Math.mat4isIdentity'></a>
### (static) H3DU.Math.mat4isIdentity(mat)

Returns whether a 4x4 matrix is the identity matrix.

#### Parameters

* `mat` (Type: Array.&lt;number>)<br>A 4x4 matrix.

#### Return Value

Return value. (Type: boolean)

<a name='H3DU.Math.mat4lookat'></a>
### (static) H3DU.Math.mat4lookat(viewerPos, [lookingAt], [up])

Returns a 4x4 matrix that represents a camera view,
transforming world space coordinates to <i>eye space</i>
(or <i>camera space</i>). This essentially rotates a "camera"
and moves it to somewhere in the scene. In eye space:<ul>
<li>The "camera" is located at the origin (0,0,0), or
at <code>viewerPos</code> in world space,
and points away from the viewer toward the <code>lookingAt</code>
position in world space. This generally
puts <code>lookingAt</code> at the center of the view.
<li>The X axis points rightward from the "camera"'s viewpoint.
<li>The Y axis points upward from the center of the "camera" to its top. The
<code>up</code> vector guides this direction.
<li>The Z axis is parallel to the direction from the "camera"
to the <code>lookingAt</code> point.</ul>

This method is designed for use in a <a href="tutorial-glmath.md">right-handed coordinate system</a>
(the Z axis's direction will be from the "camera" to the point looked at).
To adjust the result of this method for a left-handed system,
reverse the sign of the 1st, 3rd, 5th, 7th, 9th, 11th,
13th, and 15th elements of the result (zero-based indices 0, 2, 4, 6, 8,
10, 12, and 14); the Z axis's direction will thus be from the point looked at to the "camera".

#### Parameters

* `viewerPos` (Type: Array.&lt;number>)<br>A 3-element vector specifying the "camera" position in world space.
* `lookingAt` (Type: Array.&lt;number>) (optional)<br>A 3-element vector specifying the point in world space that the "camera" is looking at. May be null or omitted, in which case the default is the coordinates (0,0,0).
* `up` (Type: Array.&lt;number>) (optional)<br>A 3-element vector specifying the direction from the center of the "camera" to its top. This parameter may be null or omitted, in which case the default is the vector (0, 1, 0), the vector that results when the "camera" is held upright.<br> This vector must not be parallel to the view direction (the direction from "viewerPos" to "lookingAt"). (See the example for one way to ensure this.)<br>

#### Return Value

The resulting 4x4 matrix. (Type: Array.&lt;number>)

#### Example

The following example calls this method with an
up vector of (0, 1, 0) except if the view direction is parallel to that
vector or nearly so.

    var upVector=[0,1,0]; // Y axis
    var viewdir=HMath.vec3sub(lookingAt, viewerPos);
    var par=HMath.vec3length(HMath.vec3cross(viewdir,upVector));
    if(par<0.00001)upVector=[0,0,1]; // view is almost parallel, so use Z axis
    var matrix=HMath.mat4lookat(viewerPos,lookingAt,upVector);

<a name='H3DU.Math.mat4multiply'></a>
### (static) H3DU.Math.mat4multiply(a, b)

Multiplies two 4x4 matrices. A new matrix is returned.
The matrices are multiplied such that the transformations
they describe happen in reverse order. For example, if the first
matrix (input matrix) describes a translation and the second
matrix describes a scaling, the multiplied matrix will describe
the effect of scaling then translation. (Multiplying the first matrix
by the second is the same as multiplying the second matrix
by the first matrix's transpose; a transpose is a matrix whose rows
are converted to columns and vice versa.)

The matrix multiplication is effectively done by breaking up matrix <code>b</code>
into four 4-element vectors (the first 4 elements make up the first vector, and so on),
<a href="H3DU.Math.md#H3DU.Math.mat4transform">transforming</a> each vector with
matrix <code>a</code>, and putting the vectors back together into a new matrix.

#### Parameters

* `a` (Type: Array.&lt;number>)<br>The first matrix.
* `b` (Type: Array.&lt;number>)<br>The second matrix.

#### Return Value

The resulting 4x4 matrix. (Type: Array.&lt;number>)

<a name='H3DU.Math.mat4ortho'></a>
### (static) H3DU.Math.mat4ortho(l, r, b, t, n, f)

Returns a 4x4 matrix representing an <a href="tutorial-camera.md">orthographic projection</a>.
In this projection, the left clipping plane is parallel to the right clipping
plane and the top to the bottom.

This method is designed for enabling a <a href="tutorial-glmath.md">right-handed coordinate system</a>.
To adjust the result of this method for a left-handed system,
reverse the sign of the 9th, 10th, 11th, and 12th
elements of the result (zero-based indices 8, 9, 10, and 11).

The projection returned by this method only scales and/or shifts the view, so that
objects with the same size won't appear smaller as they get more distant from the "camera".

#### Parameters

* `l` (Type: number)<br>Leftmost coordinate of the orthographic view.
* `r` (Type: number)<br>Rightmost coordinate of the orthographic view. ("l" is usually less than "r", so that X coordinates increase leftward. If "l" is greater than "r", X coordinates increase in the opposite direction.)
* `b` (Type: number)<br>Bottommost coordinate of the orthographic view.
* `t` (Type: number)<br>Topmost coordinate of the orthographic view. ("b" is usually less than "t", so that Y coordinates increase upward, as they do in WebGL when just this matrix is used to transform vertices. If "b" is greater than "t", Y coordinates increase in the opposite direction.)
* `n` (Type: number)<br>Distance from the "camera" to the near clipping plane. A positive value means the plane is in front of the viewer.
* `f` (Type: number)<br>Distance from the "camera" to the far clipping plane. A positive value means the plane is in front of the viewer. (Note that n can be greater than f or vice versa.) The absolute difference between n and f should be as small as the application can accept.

#### Return Value

The resulting 4x4 matrix. (Type: Array.&lt;number>)

<a name='H3DU.Math.mat4ortho2d'></a>
### (static) H3DU.Math.mat4ortho2d(l, r, b, t)

Returns a 4x4 matrix representing a 2D <a href="tutorial-camera.md">orthographic projection</a>.

This is the same as mat4ortho() with the near clipping plane
set to -1 and the far clipping plane set to 1.

This method is designed for enabling a <a href="tutorial-glmath.md">right-handed coordinate system</a>; see <a href="H3DU.Math.md#H3DU.Math.mat4ortho">mat4ortho()</a>.

#### Parameters

* `l` (Type: number)<br>Leftmost coordinate of the orthographic view.
* `r` (Type: number)<br>Rightmost coordinate of the orthographic view. ("l" is usually less than "r", so that X coordinates increase leftward. If "l" is greater than "r", X coordinates increase in the opposite direction.)
* `b` (Type: number)<br>Bottommost coordinate of the orthographic view.
* `t` (Type: number)<br>Topmost coordinate of the orthographic view. ("b" is usually less than "t", so that Y coordinates increase upward, as they do in WebGL when just this matrix is used to transform vertices. If "b" is greater than "t", Y coordinates increase in the opposite direction.)

#### Return Value

The resulting 4x4 matrix. (Type: Array.&lt;number>)

<a name='H3DU.Math.mat4ortho2dAspect'></a>
### (static) H3DU.Math.mat4ortho2dAspect(l, r, b, t, aspect)

Returns a 4x4 matrix representing a 2D <a href="tutorial-camera.md">orthographic projection</a>,
retaining the view rectangle's aspect ratio.

If the view rectangle's aspect ratio doesn't match the desired aspect
ratio, the view rectangle will be centered on the viewport
or otherwise moved and scaled so as to keep the entire view rectangle visible without stretching
or squishing it.

This is the same as mat4orthoAspect() with the near clipping plane
set to -1 and the far clipping plane set to 1.

This method is designed for enabling a <a href="tutorial-glmath.md">right-handed coordinate system</a>; see <a href="H3DU.Math.md#H3DU.Math.mat4ortho">mat4ortho()</a>.

#### Parameters

* `l` (Type: number)<br>Leftmost coordinate of the view rectangle.
* `r` (Type: number)<br>Rightmost coordinate of the orthographic view. ("l" is usually less than "r", so that X coordinates increase leftward. If "l" is greater than "r", X coordinates increase in the opposite direction.)
* `b` (Type: number)<br>Bottommost coordinate of the orthographic view.
* `t` (Type: number)<br>Topmost coordinate of the orthographic view. ("b" is usually less than "t", so that Y coordinates increase upward, as they do in WebGL when just this matrix is used to transform vertices. If "b" is greater than "t", Y coordinates increase in the opposite direction.)
* `aspect` (Type: number)<br>The ratio of width to height of the viewport, usually the scene's aspect ratio.

#### Return Value

The resulting 4x4 matrix. (Type: Array.&lt;number>)

<a name='H3DU.Math.mat4orthoAspect'></a>
### (static) H3DU.Math.mat4orthoAspect(l, r, b, t, n, f, aspect)

Returns a 4x4 matrix representing an <a href="tutorial-camera.md">orthographic projection</a>,
retaining the view rectangle's aspect ratio.

If the view rectangle's aspect ratio doesn't match the desired aspect
ratio, the view rectangle will be centered on the viewport
or otherwise moved and scaled so as to keep the entire view rectangle visible without stretching
or squishing it.

This method is designed for enabling a <a href="tutorial-glmath.md">right-handed coordinate system</a>; see <a href="H3DU.Math.md#H3DU.Math.mat4ortho">mat4ortho()</a>.

The projection returned by this method only scales and/or shifts the view, so that
objects with the same size won't appear smaller as they get more distant from the "camera".

#### Parameters

* `l` (Type: number)<br>Leftmost coordinate of the view rectangle.
* `r` (Type: number)<br>Rightmost coordinate of the orthographic view. ("l" is usually less than "r", so that X coordinates increase leftward. If "l" is greater than "r", X coordinates increase in the opposite direction.)
* `b` (Type: number)<br>Bottommost coordinate of the orthographic view.
* `t` (Type: number)<br>Topmost coordinate of the orthographic view. ("b" is usually less than "t", so that Y coordinates increase upward, as they do in WebGL when just this matrix is used to transform vertices. If "b" is greater than "t", Y coordinates increase in the opposite direction.)
* `n` (Type: number)<br>Distance from the "camera" to the near clipping plane. A positive value means the plane is in front of the viewer.
* `f` (Type: number)<br>Distance from the "camera" to the far clipping plane. A positive value means the plane is in front of the viewer. (Note that n can be greater than f or vice versa.) The absolute difference between n and f should be as small as the application can accept.
* `aspect` (Type: number)<br>The ratio of width to height of the viewport, usually the scene's aspect ratio.

#### Return Value

The resulting 4x4 matrix. (Type: Array.&lt;number>)

<a name='H3DU.Math.mat4perspective'></a>
### (static) H3DU.Math.mat4perspective(fovY, aspectRatio, near, far)

Returns a 4x4 matrix representing a <a href="tutorial-camera.md">perspective projection</a>.

This method is designed for enabling a <a href="tutorial-glmath.md">right-handed coordinate system</a>.
To adjust the result of this method for a left-handed system,
reverse the sign of the 9th, 10th, 11th, and 12th
elements of the result (zero-based indices 8, 9, 10, and 11).

#### Parameters

* `fovY` (Type: number)<br>Y axis field of view, in degrees, that is, the shortest angle between the top and bottom clipping planes. Should be less than 180 degrees. (The smaller this number, the bigger close objects appear to be. As a result, zooming out can be implemented by raising this value, and zooming in by lowering it.)
* `aspectRatio` (Type: number)<br>The ratio of width to height of the viewport, usually the scene's aspect ratio.
* `near` (Type: number)<br>The distance, in eye space, from the "camera" to the near clipping plane. Objects closer than this distance won't be seen.

This value should be greater than 0, and should be set to the highest distance from the "camera" that the application can afford to clip out for being too close, for example, 0.5, 1, or higher.
* `far` (Type: number)<br>The distance, in eye space, from the "camera" to the far clipping plane. Objects beyond this distance will be too far to be seen.<br>This value is usually greater than "near", should be greater than 0, and should be set so that the absolute ratio of "far" to "near" is as small as the application can accept.<br> In the usual case that "far" is greater than "near", depth buffer values will be more concentrated around the near plane than around the far plane due to the perspective projection. The greater the ratio of "far" to "near", the more concentrated the values will be around the near plane, and the more likely two objects close to the far plane will have identical depth values. (Most WebGL implementations support 24-bit depth buffers, meaning they support 16,777,216 possible values per pixel.)

#### Return Value

The resulting 4x4 matrix. (Type: Array.&lt;number>)

<a name='H3DU.Math.mat4perspectiveHorizontal'></a>
### (static) H3DU.Math.mat4perspectiveHorizontal(fovX, aspectRatio, near, far)

Returns a 4x4 matrix representing a <a href="tutorial-camera.md">perspective projection</a>,
given an X axis field of view.
This method is designed for enabling a <a href="tutorial-glmath.md">right-handed coordinate system</a>.
To adjust the result of this method for a left-handed system,
reverse the sign of the 9th, 10th, 11th, and 12th
elements of the result (zero-based indices 8, 9, 10, and 11).

#### Parameters

* `fovX` (Type: number)<br>X axis field of view, in degrees, that is, the shortest angle between the left and right clipping planes. Should be less than 180 degrees. (The smaller this number, the bigger close objects appear to be. As a result, zooming out can be implemented by raising this value, and zooming in by lowering it.)
* `aspectRatio` (Type: number)<br>The ratio of width to height of the viewport, usually the scene's aspect ratio.
* `near` (Type: number)<br>The distance, in eye space, from the "camera" to the near clipping plane. Objects closer than this distance won't be seen.

This value should be greater than 0, and should be set to the highest distance from the "camera" that the application can afford to clip out for being too close, for example, 0.5, 1, or higher.
* `far` (Type: number)<br>The distance, in eye space, from the "camera" to the far clipping plane. Objects beyond this distance will be too far to be seen.<br>This value is usually greater than "near", should be greater than 0, and should be set so that the absolute ratio of "far" to "near" is as small as the application can accept.<br> In the usual case that "far" is greater than "near", depth buffer values will be more concentrated around the near plane than around the far plane due to the perspective projection. The greater the ratio of "far" to "near", the more concentrated the values will be around the near plane, and the more likely two objects close to the far plane will have identical depth values. (Most WebGL implementations support 24-bit depth buffers, meaning they support 16,777,216 possible values per pixel.)

#### Return Value

The resulting 4x4 matrix. (Type: Array.&lt;number>)

<a name='H3DU.Math.mat4projectVec3'></a>
### (static) H3DU.Math.mat4projectVec3(mat, v, [vy], [vz])

Transforms a 3-element vector with a 4x4 matrix and returns
a perspective-correct version of the vector as a 3D point.

The transformation involves transforming a 4-element vector with the same X,
Y, and Z coordinates, but with a W coordinate equal to 1, with the 4x4 matrix, and
then dividing X, Y, and Z of the transformed 4-element
vector by that vector's W (a <i>perspective divide</i>),
then returning that vector's new X, Y, and Z.

#### Parameters

* `mat` (Type: Array.&lt;number>)<br>A 4x4 matrix to use to transform the vector. This will generally be a projection-view matrix (projection matrix multiplied by the view matrix, in that order), if the vector to transform is in <i>world space</i>, or a model-view-projection matrix, that is, (projection-view matrix multiplied by the model [world] matrix, in that order), if the vector is in <i>model (object) space</i>.<br> If the matrix includes a projection transform returned by <a href="H3DU.Math.md#H3DU.Math.mat4ortho">H3DU.Math.mat4ortho</a>, <a href="H3DU.Math.md#H3DU.Math.mat4perspective">H3DU.Math.mat4perspective</a>, or similar <a href="H3DU.Math.md">H3DU.Math</a> methods, the X, Y, and Z coordinates within the view volume (as is the case in WebGL) will range from -1 to 1 and increase from left to right, front to back, and bottom to top, unless otherwise specified in those methods' documentation.
* `v` (Type: Array.&lt;number> | Number)<br>X coordinate of a 3D point to transform. If "vy" and "vz" are omitted, this value can instead be a 3-element array giving the X, Y, and Z coordinates.
* `vy` (Type: number) (optional)<br>Y coordinate.
* `vz` (Type: number) (optional)<br>Z coordinate. To transform a 2D point, set Z to 0.

#### Return Value

The transformed 3-element vector.
The elements, in order, are
the transformed vector's X, Y, and Z coordinates. (Type: Array.&lt;number>)

<a name='H3DU.Math.mat4rotate'></a>
### (static) H3DU.Math.mat4rotate(mat, angle, v, vy, vz)

Multiplies a 4x4 matrix by a rotation transformation that rotates vectors
by the given rotation angle and around the given <a href="tutorial-glmath.md">axis of rotation</a>,
and returns a new matrix.
The effect will be that the rotation transformation will
happen before the transformation described in the given matrix,
when applied in the global coordinate frame.

#### Parameters

* `mat` (Type: Array.&lt;number>)<br>A 4x4 matrix to multiply.
* `angle` (Type: Array.&lt;number> | Number)<br>The desired angle to rotate in degrees. If "v", "vy", and "vz" are omitted, this can instead be a 4-element array giving the <a href="tutorial-glmath.md">axis of rotation</a> as the first three elements, followed by the angle in degrees as the fourth element.
* `v` (Type: Array.&lt;number> | Number)<br>X-component of the point lying on the axis of rotation. If "vy" and "vz" are omitted, this can instead be a 3-element array giving the axis of rotation.
* `vy` (Type: number)<br>Y-component of the point lying on the axis of rotation.
* `vz` (Type: number)<br>Z-component of the point lying on the axis of rotation.

#### Return Value

The resulting 4x4 matrix. (Type: Array.&lt;number>)

<a name='H3DU.Math.mat4rotated'></a>
### (static) H3DU.Math.mat4rotated(angle, v, vy, vz)

Returns a 4x4 matrix representing a rotation transformation that rotates vectors
by the given rotation angle and around the given <a href="tutorial-glmath.md">axis of rotation</a>.

#### Parameters

* `angle` (Type: Array.&lt;number> | Number)<br>The desired angle to rotate in degrees. If "v", "vy", and "vz" are omitted, this can instead be a 4-element array giving the axis of rotation as the first three elements, followed by the angle in degrees as the fourth element.
* `v` (Type: Array.&lt;number> | Number)<br>X-component of the point lying on the axis of rotation. If "vy" and "vz" are omitted, this can instead be a 3-element array giving the axis of rotation.
* `vy` (Type: number)<br>Y-component of the point lying on the axis of rotation.
* `vz` (Type: number)<br>Z-component of the point lying on the axis of rotation.

#### Return Value

The resulting 4x4 matrix. (Type: Array.&lt;number>)

<a name='H3DU.Math.mat4scale'></a>
### (static) H3DU.Math.mat4scale(mat, v3, v3y, v3z)

Multiplies a 4x4 matrix by a scaling transformation.

#### Parameters

* `mat` (Type: Array.&lt;number>)<br>4x4 matrix to multiply.
* `v3` (Type: Array.&lt;number> | Number)<br>Scale factor along the X axis. A scale factor can be negative, in which case the transformation also causes reflection about the corresponding axis. If "v3y" and "v3z" are omitted, this value can instead be a 3-element array giving the scale factors along the X, Y, and Z axes.
* `v3y` (Type: number)<br>Scale factor along the Y axis.
* `v3z` (Type: number)<br>Scale factor along the Z axis.

#### Return Value

The resulting 4x4 matrix. (Type: Array.&lt;number>)

<a name='H3DU.Math.mat4scaleInPlace'></a>
### (static) H3DU.Math.mat4scaleInPlace(mat, v3, [v3y], [v3z])

Modifies a 4x4 matrix by multiplying it by a
scaling transformation.

#### Parameters

* `mat` (Type: Array.&lt;number>)<br>A 4x4 matrix.
* `v3` (Type: Array.&lt;number> | Number)<br>Scale factor along the X axis. A scale factor can be negative, in which case the transformation also causes reflection about the corresponding axis. If "v3y" and "v3z" are omitted, this value can instead be a 3-element array giving the scale factors along the X, Y, and Z axes.
* `v3y` (Type: number) (optional)<br>Scale factor along the Y axis.
* `v3z` (Type: number) (optional)<br>Scale factor along the Z axis.

#### Return Value

The same parameter as "mat". (Type: Array.&lt;number>)

<a name='H3DU.Math.mat4scaled'></a>
### (static) H3DU.Math.mat4scaled(v3, v3y, v3z)

Returns a 4x4 matrix representing a scaling transformation.

#### Parameters

* `v3` (Type: Array.&lt;number> | Number)<br>Scale factor along the X axis. A scale factor can be negative, in which case the transformation also causes reflection about the corresponding axis. If "v3y" and "v3z" are omitted, this value can instead be a 3-element array giving the scale factors along the X, Y, and Z axes.
* `v3y` (Type: number)<br>Scale factor along the Y axis.
* `v3z` (Type: number)<br>Scale factor along the Z axis.

#### Return Value

The resulting 4x4 matrix. (Type: Array.&lt;number>)

<a name='H3DU.Math.mat4toFrustumPlanes'></a>
### (static) H3DU.Math.mat4toFrustumPlanes(matrix)

Finds the six clipping planes of a view frustum defined
by a 4x4 matrix. These six planes together form the
shape of a "chopped-off" pyramid (or frustum).

In this model, the eye, or camera, is placed at the top
of the pyramid (before being chopped off), four planes are placed at the pyramid's
sides, one plane (the far plane) forms its base, and a
final plane (the near plane) is the pyramid's chopped
off top.

#### Parameters

* `matrix` (Type: Array.&lt;number>)<br>A 4x4 matrix. This will usually be a projection-view matrix (projection matrix multiplied by view matrix, in that order).

#### Return Value

An array of six
4-element arrays representing the six clipping planes of the
view frustum. In order, they are the left, right, top,
bottom, near, and far clipping planes. All six planes
will be normalized (see <a href="H3DU.Math.md#H3DU.Math.planeNormalizeInPlace">H3DU.Math.planeNormalizeInPlace</a>). (Type: Array.&lt;Array.&lt;number>>)

<a name='H3DU.Math.mat4toMat3'></a>
### (static) H3DU.Math.mat4toMat3(m4)

Returns the upper-left part of a 4x4 matrix as a new
3x3 matrix.

#### Parameters

* `m4` (Type: Array.&lt;number>)<br>A 4x4 matrix.

#### Return Value

The resulting 3x3 matrix. (Type: Array.&lt;number>)

<a name='H3DU.Math.mat4transform'></a>
### (static) H3DU.Math.mat4transform(mat, v, [vy], [vz], [vw])

Transforms a 4-element vector with a 4x4 matrix and returns
the transformed vector.

Transforming a vector (<code>v</code>) with a matrix (<code>mat</code>)
is effectively done by breaking up <code>mat</code> into four 4-element vectors
(the first 4 elements make up the first vector, and so on), multiplying
each vector in <code>mat</code> by the corresponding component in
<code>v</code>, and adding up the resulting vectors (except <code>v</code>) to
get the transformed vector.

#### Parameters

* `mat` (Type: Array.&lt;number>)<br>A 4x4 matrix.
* `v` (Type: Array.&lt;number> | Number)<br>X coordinate. If "vy", "vz", and "vw" are omitted, this value can instead be a 4-element array giving the X, Y, Z, and W coordinates.
* `vy` (Type: number) (optional)<br>Y coordinate.
* `vz` (Type: number) (optional)<br>Z coordinate.
* `vw` (Type: number) (optional)<br>W coordinate. To transform a 3D point, set W to 1 and divide the result's X, Y, and Z by the result's W. To transform a 2D point, set Z to 0 and W to 1 and divide the result's X and Y by the result's W.

#### Return Value

The transformed vector. (Type: Array.&lt;number>)

<a name='H3DU.Math.mat4transformVec3'></a>
### (static) H3DU.Math.mat4transformVec3(mat, v, [vy], [vz])

Transforms a 3-element vector with a 4x4 matrix as though it were
an affine transformation matrix (without perspective) and returns the transformed vector.
The effect is as though elements
3, 7, 11, and 15 (counting from 0) of the matrix
were assumed to be (0, 0, 0, 1) instead of their actual values and as though the 3-element
vector had a fourth element valued at 1.

For most purposes, use
the <a href="H3DU.Math.md#H3DU.Math.mat4projectVec3">H3DU.Math.mat4projectVec3</a> method instead, which supports
4x4 matrices that may be in a perspective
projection (whose last row is not necessarily (0, 0, 0, 1)).

#### Parameters

* `mat` (Type: Array.&lt;number>)<br>A 4x4 matrix.
* `v` (Type: Array.&lt;number> | Number)<br>X coordinate. If "vy" and "vz" are omitted, this value can instead be a 4-element array giving the X, Y, and Z coordinates.
* `vy` (Type: number) (optional)<br>Y coordinate.
* `vz` (Type: number) (optional)<br>Z coordinate. To transform a 2D point, set Z to 0.

#### Return Value

The transformed 3-element vector. (Type: Array.&lt;number>)

<a name='H3DU.Math.mat4translate'></a>
### (static) H3DU.Math.mat4translate(mat, v3, v3y, v3z)

Multiplies a 4x4 matrix by a translation transformation.

#### Parameters

* `mat` (Type: Array.&lt;number>)<br>The matrix to multiply.
* `v3` (Type: Array.&lt;number> | Number)<br>Translation along the X axis. If "v3y" and "v3z" are omitted, this value can instead be a 3-element array giving the translations along the X, Y, and Z axes.
* `v3y` (Type: number)<br>Translation along the Y axis.
* `v3z` (Type: number)<br>Translation along the Z axis.

#### Return Value

The resulting 4x4 matrix. (Type: Array.&lt;number>)

<a name='H3DU.Math.mat4translated'></a>
### (static) H3DU.Math.mat4translated(v3, v3y, v3z)

Returns a 4x4 matrix representing a translation.

#### Parameters

* `v3` (Type: Array.&lt;number> | Number)<br>Translation along the X axis. If "v3y" and "v3z" are omitted, this value can instead be a 3-element array giving the translations along the X, Y, and Z axes.
* `v3y` (Type: number)<br>Translation along the Y axis.
* `v3z` (Type: number)<br>Translation along the Z axis.

#### Return Value

The resulting 4x4 matrix. (Type: Array.&lt;number>)

<a name='H3DU.Math.mat4transpose'></a>
### (static) H3DU.Math.mat4transpose(m4)

Returns the transpose of a 4x4 matrix. (A transpose is a
matrix whose rows are converted to columns and vice versa.)

#### Parameters

* `m4` (Type: Array.&lt;number>)<br>A 4x4 matrix.

#### Return Value

The resulting 4x4 matrix. (Type: Array.&lt;number>)

<a name='H3DU.Math.mat4transposeInPlace'></a>
### (static) H3DU.Math.mat4transposeInPlace(mat)

Transposes a 4x4 matrix in place without creating
a new matrix. (A transpose is a matrix whose rows
are converted to columns and vice versa.)

#### Parameters

* `mat` (Type: Array.&lt;number>)<br>A 4x4 matrix.

#### Return Value

The parameter "mat". (Type: Array.&lt;number>)

<a name='H3DU.Math.planeNorm'></a>
### (static) H3DU.Math.planeNorm(plane)

<b>Deprecated: Use <a href="H3DU.Math.md#H3DU.Math.planeNormalize">H3DU.Math.planeNormalize</a> instead.
The name of this method may be confused with a vector's "norm", another name for its length.</b>

Deprecated alias for <a href="H3DU.Math.md#H3DU.Math.planeNormalize">H3DU.Math.planeNormalize</a>.

#### Parameters

* `plane` (Type: Array.&lt;number>)<br>Plane to normalize.

#### Return Value

The normalized plane. (Type: Array.&lt;number>)

<a name='H3DU.Math.planeNormInPlace'></a>
### (static) H3DU.Math.planeNormInPlace(plane)

<b>Deprecated: Use <a href="H3DU.Math.md#H3DU.Math.planeNormalizeInPlace">H3DU.Math.planeNormalizeInPlace</a> instead.
The name of this method may be confused with a vector's "norm", another name for its length.</b>

Deprecated alias for <a href="H3DU.Math.md#H3DU.Math.planeNormalizeInPlace">H3DU.Math.planeNormalizeInPlace</a>.

#### Parameters

* `plane` (Type: Array.&lt;number>)<br>Plane to normalize in place.

#### Return Value

The parameter "plane" (Type: Array.&lt;number>)

<a name='H3DU.Math.planeNormalize'></a>
### (static) H3DU.Math.planeNormalize(plane)

Normalizes this plane so that its normal is a <a href="tutorial-glmath.md">unit vector</a>,
unless all the normal's components are 0, and returns a new plane with the result.
The plane's distance will be divided by the
normal's length. Returns a new plane.

#### Parameters

* `plane` (Type: Array.&lt;number>)<br>A four-element array defining the plane. The first three elements of the array are the X, Y, and Z components of the plane's normal vector, and the fourth element is the shortest distance from the plane to the origin, or if negative, from the origin to the plane, divided by the normal's length.

#### Return Value

A normalized version of
the plane.
Note that due to rounding error, the length of the plane's normal might not be exactly equal to 1, and that the vector will remain unchanged if its length is 0 or extremely close to 0. (Type: Array.&lt;number>)

<a name='H3DU.Math.planeNormalizeInPlace'></a>
### (static) H3DU.Math.planeNormalizeInPlace(plane)

Normalizes this plane so that its normal is a <a href="tutorial-glmath.md">unit vector</a>,
unless all the normal's components are 0, and sets this plane to the result.
The plane's distance will be divided by the
current normal's length.

#### Parameters

* `plane` (Type: Array.&lt;number>)<br>A four-element array defining the plane. The first three elements of the array are the X, Y, and Z components of the plane's normal vector, and the fourth element is the shortest distance from the plane to the origin, or if negative, from the origin to the plane, divided by the normal's length.

#### Return Value

The parameter "plane". (Type: Array.&lt;number>)

<a name='H3DU.Math.quatConjugate'></a>
### (static) H3DU.Math.quatConjugate(quat)

Returns a quaternion that describes a rotation that undoes the given rotation (an "inverted" rotation); this is done by reversing the sign of the X, Y, and Z components (which describe the quaternion's <a href="tutorial-glmath.md">axis of rotation</a>). The return value won't necessarily be a <a href="tutorial-glmath.md">unit vector</a>.

#### Parameters

* `quat` (Type: Array.&lt;number>)<br>A quaternion, containing four elements.

#### Return Value

Return value. (Type: Array.&lt;number>)

<a name='H3DU.Math.quatCopy'></a>
### (static) H3DU.Math.quatCopy(a)

Returns a copy of a quaternion.

#### Parameters

* `a` (Type: Array.&lt;number>)<br>A quaternion.

#### Return Value

Return value. (Type: Array.&lt;number>)

#### See Also

<a href="H3DU.Math.md#H3DU.Math.vec4copy">H3DU.Math.vec4copy</a>

<a name='H3DU.Math.quatDot'></a>
### (static) H3DU.Math.quatDot(a, b)

Finds the dot product of two quaternions.
It's equal to the sum of the products of
their components (for example, <b>a</b>'s X times <b>b</b>'s X).

#### Parameters

* `a` (Type: Array.&lt;number>)<br>The first quaternion.
* `b` (Type: Array.&lt;number>)<br>The second quaternion.

#### Return Value

Return value. (Type: number)

#### See Also

<a href="H3DU.Math.md#H3DU.Math.vec4dot">H3DU.Math.vec4dot</a>

<a name='H3DU.Math.quatFromAxisAngle'></a>
### (static) H3DU.Math.quatFromAxisAngle(angle, v, vy, vz)

Generates a quaternion from a rotation transformation that rotates vectors
by the given rotation angle and around the given <a href="tutorial-glmath.md">axis of rotation</a>,

#### Parameters

* `angle` (Type: Array.&lt;number> | Number)<br>The desired angle to rotate in degrees. If "v", "vy", and "vz" are omitted, this can instead be a 4-element array giving the axis of rotation as the first three elements, followed by the angle in degrees as the fourth element.
* `v` (Type: Array.&lt;number> | Number)<br>X-component of the point lying on the axis of rotation. If "vy" and "vz" are omitted, this can instead be a 3-element array giving the axis of rotation.
* `vy` (Type: number)<br>Y-component of the point lying on the axis of rotation.
* `vz` (Type: number)<br>Z-component of the point lying on the axis of rotation.

#### Return Value

The generated quaternion.
A quaternion's first three elements (X, Y, Z) describe an
<a href="tutorial-glmath.md">axis of rotation</a> whose length is the sine of half of "angle",
and its fourth element (W) is the cosine of half of "angle". (Type: Array.&lt;number>)

<a name='H3DU.Math.quatFromMat4'></a>
### (static) H3DU.Math.quatFromMat4(m)

Generates a quaternion from the vector rotation described in a 4x4 matrix.
The upper 3x3 portion of the matrix is used for this calculation.
The results are undefined if the matrix includes any transformation
other than rotation.

#### Parameters

* `m` (Type: Array.&lt;number>)<br>A 4x4 matrix.

#### Return Value

The resulting quaternion. (Type: Array.&lt;number>)

<a name='H3DU.Math.quatFromTaitBryan'></a>
### (static) H3DU.Math.quatFromTaitBryan(pitchDegrees, yawDegrees, rollDegrees, [mode])

Generates a quaternion from pitch, yaw and roll angles (or <i>Tait-Bryan angles</i>).
See "Axis of Rotation" in "<a href="tutorial-glmath.md">H3DU's Math Functions</a>" for the meaning of each angle.

#### Parameters

* `pitchDegrees` (Type: number)<br>Vector rotation about the X axis (upward or downward turn), in degrees. This can instead be a 3-element array giving the rotation about the X axis, Y axis, and Z axis, respectively.
* `yawDegrees` (Type: number)<br>Vector rotation about the Y axis (left or right turn), in degrees. May be null or omitted if "pitchDegrees" is an array.
* `rollDegrees` (Type: number)<br>Vector rotation about the Z axis (swaying side by side), in degrees. May be null or omitted if "pitchDegrees" is an array.
* `mode` (Type: number) (optional)<br>Specifies the order in which the rotations will occur (in terms of their effect). This is one of the <a href="H3DU.Math.md">H3DU.Math</a> constants such as <a href="H3DU.Math.md#H3DU.Math.LocalPitchYawRoll">H3DU.Math.LocalPitchYawRoll</a> and <a href="H3DU.Math.md#H3DU.Math.GlobalYawRollPitch">H3DU.Math.GlobalYawRollPitch</a>. If null or omitted, the default is <a href="H3DU.Math.md#H3DU.Math.GlobalRollPitchYaw">H3DU.Math.GlobalRollPitchYaw</a>. The constants starting with <code>Global</code> describe a vector rotation in the order given, each about the original axes (these angles are also called <i>extrinsic</i> angles). The constants starting with <code>Local</code> describe a vector rotation in the order given, where the second and third rotations occur around the rotated object's new axes and not necessarily the original axes (these angles are also called <i>intrinsic</i> angles). The order of <code>Local</code> rotations has the same result as the reversed order of <code>Global</code> rotations and vice versa.

#### Return Value

The generated quaternion. (Type: Array.&lt;number>)

<a name='H3DU.Math.quatFromVectors'></a>
### (static) H3DU.Math.quatFromVectors(vec1, vec2)

Generates a quaternion describing a rotation between
two 3-element vectors. The quaternion
will describe the rotation required to rotate
the ray described in the first vector toward the ray described
in the second vector. The vectors need not be <a href="tutorial-glmath.md">unit vectors</a>.

#### Parameters

* `vec1` (Type: Array.&lt;number>)<br>The first 3-element vector.
* `vec2` (Type: Array.&lt;number>)<br>The second 3-element vector.

#### Return Value

The generated quaternion, which
will be a unit vector. (Type: Array.&lt;number>)

<a name='H3DU.Math.quatIdentity'></a>
### (static) H3DU.Math.quatIdentity()

Returns the identity quaternion of multiplication, (0, 0, 0, 1).

#### Return Value

Return value. (Type: Array.&lt;number>)

<a name='H3DU.Math.quatInverse'></a>
### (static) H3DU.Math.quatInverse(quat)

<b>Deprecated: Use <a href="H3DU.Math.md#H3DU.Math.quatInvert">H3DU.Math.quatInvert</a> instead.</b>

Inverts the rotation given in this quaternion, describing a rotation that undoes the given rotation.
Returns a new quaternion; same as the quatInverse method.

#### Parameters

* `quat` (Type: Array.&lt;number>)<br>A quaternion, containing four elements.

#### Return Value

Return value. (Type: Array.&lt;number>)

<a name='H3DU.Math.quatInvert'></a>
### (static) H3DU.Math.quatInvert(quat)

Returns a quaternion that describes a rotation that undoes the given rotation (an "inverted" rotation) and is converted to a <a href="tutorial-glmath.md">unit vector</a>.

#### Parameters

* `quat` (Type: Array.&lt;number>)<br>A quaternion, containing four elements.

#### Return Value

Return value. (Type: Array.&lt;number>)

#### See Also

<a href="H3DU.Math.md#H3DU.Math.quatConjugate">H3DU.Math.quatConjugate</a>

<a name='H3DU.Math.quatIsIdentity'></a>
### (static) H3DU.Math.quatIsIdentity(quat)

Returns whether this quaternion is the identity quaternion, (0, 0, 0, 1).

#### Parameters

* `quat` (Type: Array.&lt;number>)<br>A quaternion, containing four elements.

#### Return Value

Return value. (Type: boolean)

<a name='H3DU.Math.quatLength'></a>
### (static) H3DU.Math.quatLength(quat)

Returns the distance of this quaternion from the origin.
It's the same as the square root of the sum of the squares
of its components.

#### Parameters

* `quat` (Type: Array.&lt;number>)<br>The quaternion.

#### Return Value

Return value. (Type: number)

#### See Also

<a href="H3DU.Math.md#H3DU.Math.vec4length">H3DU.Math.vec4length</a>

<a name='H3DU.Math.quatMultiply'></a>
### (static) H3DU.Math.quatMultiply(a, b)

Multiplies two quaternions, creating a composite rotation.
The quaternions are multiplied such that the second quaternion's
rotation happens before the first quaternion's rotation when applied
in the global coordinate frame.

If both quaternions are <a href="tutorial-glmath.md">unit vectors</a>, the resulting
quaternion will also be a unit vector. However, for best results, you should
normalize the quaternions every few multiplications (using
<a href="H3DU.Math.md#H3DU.Math.quatNormalize">H3DU.Math.quatNormalize</a> or <a href="H3DU.Math.md#H3DU.Math.quatNormalizeInPlace">H3DU.Math.quatNormalizeInPlace</a>), since successive
multiplications can cause rounding errors.

Quaternion multiplication is not commutative except in the last component
of the resulting quaternion, since the definition of quaternion multiplication
includes taking a cross product of <code>a</code>'s and <code>b</code>'s first three components,
in that order, and the cross product is not commutative (see also <a href="H3DU.Math.md#H3DU.Math.vec3cross">H3DU.Math.vec3cross</a>).

#### Parameters

* `a` (Type: Array.&lt;number>)<br>The first quaternion.
* `b` (Type: Array.&lt;number>)<br>The second quaternion.

#### Return Value

The resulting quaternion. (Type: Array.&lt;number>)

<a name='H3DU.Math.quatNlerp'></a>
### (static) H3DU.Math.quatNlerp(q1, q2, factor)

Returns a quaternion that lies along the shortest path between the
given two quaternion rotations, using a linear interpolation function, and converts
it to a <a href="tutorial-glmath.md">unit vector</a>.
This is called a normalized linear interpolation, or "nlerp".

Because the shortest path is curved, not straight, this method
will generally not interpolate at constant velocity;
however, the difference in this velocity when interpolating is
rarely noticeable and this method is generally faster than
the <a href="H3DU.Math.md#H3DU.Math.quatSlerp">H3DU.Math.quatSlerp</a> method.

#### Parameters

* `q1` (Type: Array.&lt;number>)<br>The first quaternion. Must be a unit vector.
* `q2` (Type: Array.&lt;number>)<br>The second quaternion. Must be a unit vector.
* `factor` (Type: number)<br>A value that usually ranges from 0 through 1. Closer to 0 means closer to q1, and closer to 1 means closer to q2.

#### Return Value

The interpolated quaternion,
which will be a unit vector. (Type: Array.&lt;number>)

<a name='H3DU.Math.quatNorm'></a>
### (static) H3DU.Math.quatNorm(quat)

<b>Deprecated: Use <a href="H3DU.Math.md#H3DU.Math.quatNormalize">H3DU.Math.quatNormalize</a> instead.
The name of this method may be confused with a vector's "norm", another name for its length.</b>

Deprecated alias for <a href="H3DU.Math.md#H3DU.Math.quatNormalize">H3DU.Math.quatNormalize</a>.

#### Parameters

* `quat` (Type: Array.&lt;number>)<br>Quaternion to normalize.

#### Return Value

The normalized quaternion. (Type: Array.&lt;number>)

<a name='H3DU.Math.quatNormInPlace'></a>
### (static) H3DU.Math.quatNormInPlace(quat)

<b>Deprecated: Use <a href="H3DU.Math.md#H3DU.Math.quatNormalizeInPlace">H3DU.Math.quatNormalizeInPlace</a> instead.
The name of this method may be confused with a vector's "norm", another name for its length.</b>

Deprecated alias for <a href="H3DU.Math.md#H3DU.Math.quatNormalizeInPlace">H3DU.Math.quatNormalizeInPlace</a>.

#### Parameters

* `quat` (Type: Array.&lt;number>)<br>Quaternion to normalize in place.

#### Return Value

The parameter "quat" (Type: Array.&lt;number>)

<a name='H3DU.Math.quatNormalize'></a>
### (static) H3DU.Math.quatNormalize(quat)

Converts a quaternion to a <a href="tutorial-glmath.md">unit vector</a>; returns a new quaternion.
When a quaternion is normalized, the distance from the origin
to that quaternion becomes 1 (unless all its components are 0).
A quaternion is normalized by dividing each of its components
by its <a href="H3DU.Math.md#H3DU.Math.quatLength">length</a>.

#### Parameters

* `quat` (Type: Array.&lt;number>)<br>A quaternion, containing four elements.

#### Return Value

The normalized quaternion.
Note that due to rounding error, the vector's length might not be exactly equal to 1, and that the vector will remain unchanged if its length is 0 or extremely close to 0. (Type: Array.&lt;number>)

#### See Also

<a href="H3DU.Math.md#H3DU.Math.vec4normalize">H3DU.Math.vec4normalize</a>

<a name='H3DU.Math.quatNormalizeInPlace'></a>
### (static) H3DU.Math.quatNormalizeInPlace(quat)

Converts a quaternion to a <a href="tutorial-glmath.md">unit vector</a>.
When a quaternion is normalized, it describes the same rotation but the distance from the origin
to that quaternion becomes 1 (unless all its components are 0).
A quaternion is normalized by dividing each of its components
by its <a href="H3DU.Math.md#H3DU.Math.quatLength">length</a>.

#### Parameters

* `quat` (Type: Array.&lt;number>)<br>A quaternion, containing four elements.

#### Return Value

The parameter "quat".
Note that due to rounding error, the vector's length might not be exactly equal to 1, and that the vector will remain unchanged if its length is 0 or extremely close to 0. (Type: Array.&lt;number>)

#### See Also

<a href="H3DU.Math.md#H3DU.Math.vec4normalizeInPlace">H3DU.Math.vec4normalizeInPlace</a>

<a name='H3DU.Math.quatRotate'></a>
### (static) H3DU.Math.quatRotate(quat, angle, v, vy, vz)

Multiplies a quaternion by a rotation transformation that rotates vectors
by the given rotation angle and around the given <a href="tutorial-glmath.md">axis of rotation</a>.
The result is such that the angle-axis
rotation happens before the quaternion's rotation when applied
in the global coordinate frame.

This method is equivalent to the following (see also <a href="H3DU.Math.md#H3DU.Math.quatMultiply">H3DU.Math.quatMultiply</a>):

    return quatMultiply(quat,quatFromAxisAngle(angle,v,vy,vz));

#### Parameters

* `quat` (Type: Array.&lt;number>)<br>Quaternion to rotate.
* `angle` (Type: Array.&lt;number> | Number)<br>The desired angle to rotate in degrees. If "v", "vy", and "vz" are omitted, this can instead be a 4-element array giving the axis of rotation as the first three elements, followed by the angle in degrees as the fourth element.
* `v` (Type: Array.&lt;number> | Number)<br>X-component of the point lying on the axis of rotation. If "vy" and "vz" are omitted, this can instead be a 3-element array giving the axis of rotation.
* `vy` (Type: number)<br>Y-component of the point lying on the axis of rotation.
* `vz` (Type: number)<br>Z-component of the point lying on the axis of rotation.

#### Return Value

The resulting quaternion. (Type: Array.&lt;number>)

<a name='H3DU.Math.quatScale'></a>
### (static) H3DU.Math.quatScale(a, scalar)

Multiplies each element of a quaternion by a factor
and returns the result as a new quaternion.

#### Parameters

* `a` (Type: Array.&lt;number>)<br>A quaternion.
* `scalar` (Type: number)<br>A factor to multiply.

#### Return Value

The resulting quaternion. (Type: Array.&lt;number>)

#### See Also

<a href="H3DU.Math.md#H3DU.Math.vec4scaleInPlace">H3DU.Math.vec4scaleInPlace</a>

<a name='H3DU.Math.quatScaleInPlace'></a>
### (static) H3DU.Math.quatScaleInPlace(a, scalar)

Multiplies each element of a quaternion by a factor
and stores the result in that quaternion.

#### Parameters

* `a` (Type: Array.&lt;number>)<br>A quaternion.
* `scalar` (Type: number)<br>A factor to multiply.

#### Return Value

The parameter "a". (Type: Array.&lt;number>)

#### See Also

<a href="H3DU.Math.md#H3DU.Math.vec4scaleInPlace">H3DU.Math.vec4scaleInPlace</a>

<a name='H3DU.Math.quatSlerp'></a>
### (static) H3DU.Math.quatSlerp(q1, q2, factor)

Returns a quaternion that lies along the shortest path between the
given two quaternion rotations, using a spherical interpolation function.
This is called spherical linear interpolation, or "slerp". (A spherical
interpolation finds the shortest angle between the two quaternions -- which
are treated as 4D vectors -- and then finds a vector with a smaller angle
between it and the first quaternion. The "factor" parameter specifies
how small the new angle will be relative to the original angle.)

This method will generally interpolate at constant velocity; however,
this method is commutative (the order in which the quaternions are given
matters), unlike <a href="H3DU.Math.md#H3DU.Math.quatNlerp">quatNlerp</a>, making it
unsuitable for blending multiple quaternion rotations,
and this method is generally more computationally expensive
than the <a href="H3DU.Math.md#H3DU.Math.quatNlerp">quatNlerp</a> method.

#### Parameters

* `q1` (Type: Array.&lt;number>)<br>The first quaternion. Must be a <a href="tutorial-glmath.md">unit vector</a>.
* `q2` (Type: Array.&lt;number>)<br>The second quaternion. Must be a unit vector.
* `factor` (Type: number)<br>A value that usually ranges from 0 through 1. Closer to 0 means closer to q1, and closer to 1 means closer to q2.

#### Return Value

The interpolated quaternion. (Type: Array.&lt;number>)

#### See Also

["Understanding Slerp, Then Not Using It", Jonathan Blow](http://number-none.com/product/Understanding%20Slerp,%20Then%20Not%20Using%20It/),
for additional background

<a name='H3DU.Math.quatToAxisAngle'></a>
### (static) H3DU.Math.quatToAxisAngle(a)

Calculates the vector rotation for this quaternion in the form
of the angle to rotate the vector by and an <a href="tutorial-glmath.md">axis of rotation</a> to
rotate that vector around.

#### Parameters

* `a` (Type: Array.&lt;number>)<br>A quaternion. Must be a <a href="tutorial-glmath.md">unit vector</a>.

#### Return Value

A 4-element array giving the axis
of rotation as the first three elements, followed by the angle
in degrees as the fourth element. If "a" is a unit vector, the axis
of rotation will be a unit vector. (Type: Array.&lt;number>)

<a name='H3DU.Math.quatToMat4'></a>
### (static) H3DU.Math.quatToMat4(quat)

Generates a 4x4 matrix describing the rotation
described by this quaternion.

#### Parameters

* `quat` (Type: Array.&lt;number>)<br>A quaternion, containing four elements.

#### Return Value

The generated 4x4 matrix. (Type: Array.&lt;number>)

<a name='H3DU.Math.quatToTaitBryan'></a>
### (static) H3DU.Math.quatToTaitBryan(a, [mode])

Converts this quaternion to the same version of the rotation
in the form of pitch, yaw, and roll angles (or <i>Tait-Bryan angles</i>).

#### Parameters

* `a` (Type: Array.&lt;number>)<br>A quaternion. Should be a <a href="tutorial-glmath.md">unit vector</a>.
* `mode` (Type: number) (optional)<br>Specifies the order in which the rotations will occur (in terms of their effect, not in terms of how they will be returned by this method). This is one of the <a href="H3DU.Math.md">H3DU.Math</a> constants such as <a href="H3DU.Math.md#H3DU.Math.LocalPitchYawRoll">H3DU.Math.LocalPitchYawRoll</a> and <a href="H3DU.Math.md#H3DU.Math.GlobalYawRollPitch">H3DU.Math.GlobalYawRollPitch</a>. If null or omitted, the default is <a href="H3DU.Math.md#H3DU.Math.GlobalRollPitchYaw">H3DU.Math.GlobalRollPitchYaw</a>. The constants starting with <code>Global</code> describe a vector rotation in the order given, each about the original axes (these angles are also called <i>extrinsic</i> angles). The constants starting with <code>Local</code> describe a vector rotation in the order given, where the second and third rotations occur around the rotated object's new axes and not necessarily the original axes (these angles are also called <i>intrinsic</i> angles). The order of <code>Local</code> rotations has the same result as the reversed order of <code>Global</code> rotations and vice versa.

#### Return Value

A 3-element array containing the
pitch, yaw, and roll angles (X, Y, and Z axis angles), in that order and in degrees, by which to rotate vectors.
See "Axis of Rotation" in "<a href="tutorial-glmath.md">H3DU's Math Functions</a>" for the meaning of each angle. (Type: Array.&lt;number>)

<a name='H3DU.Math.quatTransform'></a>
### (static) H3DU.Math.quatTransform(q, v)

Transforms a 3- or 4-element vector using a
quaternion's vector rotation.

#### Parameters

* `q` (Type: Array.&lt;number>)<br>A quaternion describing the rotation.
* `v` (Type: Array.&lt;number>)<br>A 3- or 4-element vector to transform. The fourth element, if any, is ignored.

#### Return Value

A 4-element vector representing
the transformed vector. The fourth element will be 1.0.
If the input vector has 3 elements, a 3-element vector will
be returned instead. (Type: Array.&lt;number>)

<a name='H3DU.Math.vec3abs'></a>
### (static) H3DU.Math.vec3abs(a)

Returns a new 3-element
vector with the absolute value of each of its components.

#### Parameters

* `a` (Type: Array.&lt;number>)<br>A 3-element vector.

#### Return Value

The resulting 3-element vector. (Type: Array.&lt;number>)

<a name='H3DU.Math.vec3absInPlace'></a>
### (static) H3DU.Math.vec3absInPlace(a)

Sets each component of the given 3-element
vector to its absolute value.

#### Parameters

* `a` (Type: Array.&lt;number>)<br>A 3-element vector.

#### Return Value

The vector "a". (Type: Array.&lt;number>)

<a name='H3DU.Math.vec3add'></a>
### (static) H3DU.Math.vec3add(a, b)

Adds two 3-element vectors and returns a new
vector with the result. Adding two vectors
is the same as adding each of their components.
The resulting vector describes a straight-line path for the
combined paths described by the given vectors, in either order.

#### Parameters

* `a` (Type: Array.&lt;number>)<br>The first 3-element vector.
* `b` (Type: Array.&lt;number>)<br>The second 3-element vector.

#### Return Value

The resulting 3-element vector. (Type: Array.&lt;number>)

<a name='H3DU.Math.vec3addInPlace'></a>
### (static) H3DU.Math.vec3addInPlace(a, b)

Adds two 3-element vectors and stores
the result in the first vector. Adding two vectors
is the same as adding each of their components.
The resulting vector describes a straight-line path for the
combined paths described by the given vectors, in either order.

#### Parameters

* `a` (Type: Array.&lt;number>)<br>The first 3-element vector.
* `b` (Type: Array.&lt;number>)<br>The second 3-element vector.

#### Return Value

The parameter "a" (Type: Array.&lt;number>)

<a name='H3DU.Math.vec3assign'></a>
### (static) H3DU.Math.vec3assign(dst, src)

Assigns the values of a 3-element vector into another
3-element vector.

#### Parameters

* `dst` (Type: Array.&lt;number>)<br>The 3-element vector to assign to.
* `src` (Type: Array.&lt;number>)<br>The 3-element vector whose values will be copied.

#### Return Value

The parameter "dst" (Type: Array.&lt;number>)

<a name='H3DU.Math.vec3clamp'></a>
### (static) H3DU.Math.vec3clamp(a, min, max)

Returns a 3-element vector in which each element of the given 3-element vector is clamped
so it's not less than one value or greater than another value.

#### Parameters

* `a` (Type: Array.&lt;number>)<br>The vector to clamp.
* `min` (Type: number)<br>Lowest possible value. Should not be greater than "max".
* `max` (Type: number)<br>Highest possible value. Should not be less than "min".

#### Return Value

The resulting vector. (Type: Array.&lt;number>)

<a name='H3DU.Math.vec3clampInPlace'></a>
### (static) H3DU.Math.vec3clampInPlace(a, min, max)

Clamps each element of the given 3-element vector
so it's not less than one value or greater than another value.

#### Parameters

* `a` (Type: Array.&lt;number>)<br>The vector to clamp.
* `min` (Type: number)<br>Lowest possible value. Should not be greater than "max".
* `max` (Type: number)<br>Highest possible value. Should not be less than "min".

#### Return Value

The resulting vector. (Type: Array.&lt;number>)

<a name='H3DU.Math.vec3copy'></a>
### (static) H3DU.Math.vec3copy(vec)

Returns a copy of a 3-element vector.

#### Parameters

* `vec` (Type: Array.&lt;number>)<br>A 3-element vector.

#### Return Value

Return value. (Type: Array.&lt;number>)

<a name='H3DU.Math.vec3cross'></a>
### (static) H3DU.Math.vec3cross(a, b)

Finds the cross product of two 3-element vectors (called A and B).
The following are properties of the cross product:<ul>
<li>The cross product will be a vector that is <i>orthogonal</i> (perpendicular) to both A and B.
<li>Switching the order of A and B results in a cross product
vector with the same length but opposite direction. (Thus, the cross product is not <i>commutative</i>,
but it is <i>anticommutative</i>.)
<li>Let there be a triangle formed by point A, point B, and the point (0,0,0) in that order.
While the cross product of A and B points toward the viewer,
the triangle's vertices are oriented counterclockwise for <a href="tutorial-glmath.md">right-handed coordinate systems</a>,
or clockwise for left-handed systems. The triangle's area is half of the cross product's length.
<li>The length of the cross
product equals |<b>a</b>| &#x2a; |<b>b</b>| &#x2a; |sin &theta;|
where |<b>x</b>| is the length of vector <b>x</b>, and
&theta; is the shortest angle between <b>a</b> and <b>b</b>.
It follows that:<ul>
<li>If the length is 0, then A and B are parallel vectors (0 or 180 degrees apart).
<li>If A and B are <a href="tutorial-glmath.md">unit vectors</a>, the length equals the absolute value
of the sine of the shortest angle between A and B.
<li>If A and B are unit vectors, the cross product will be a unit vector only if A is perpendicular
to B (the shortest angle between A and B will be 90 degrees, since sin 90&deg; = 1).
</ul></ul>
The cross product (<b>c</b>) of vectors <b>a</b> and <b>b</b> is found as
follows:<br>
<b>c</b>.x = <b>a</b>.y &#x2a; <b>b</b>.z - <b>a</b>.z &#x2a; <b>b</b>.y<br>
<b>c</b>.y = <b>a</b>.z &#x2a; <b>b</b>.x - <b>a</b>.x &#x2a; <b>b</b>.z<br>
<b>c</b>.z = <b>a</b>.x &#x2a; <b>b</b>.y - <b>a</b>.y &#x2a; <b>b</b>.x<br>

#### Parameters

* `a` (Type: Array.&lt;number>)<br>The first 3-element vector.
* `b` (Type: Array.&lt;number>)<br>The second 3-element vector.

#### Return Value

A 3-element vector containing the cross product. (Type: Array.&lt;number>)

#### Example

The following example uses the cross product to
calculate a triangle's normal vector and its area.

    var a=triangle[0];
    var b=triangle[1];
    var c=triangle[2];
    // Find vector from C to A
    var da=H3DU.Math.vec3sub(a,c);
    // Find vector from C to B
    var db=H3DU.Math.vec3sub(b,c);
    // The triangle's normal is the cross product of da and db
    var normal=H3DU.Math.vec3cross(da,db);
    // Find the triangle's area
    var area=H3DU.Math.vec3length(normal)*0.5;

The following example finds the cosine and sine of
the angle between two unit vectors and the orthogonal unit vector of both.

    var cr=H3DU.Math.vec3cross(unitA,unitB);
    // Cosine of the angle. Will be positive or negative depending on
    // the shortest angle between the vectors.
    var cosine=H3DU.Math.vec3dot(unitA,unitB);
    // Sine of the angle. Note that the sine will always be 0 or greater because
    // the shortest angle betw0] ? cr : H3DU.Math.vec3scale(cr,1.0/sine);

<a name='H3DU.Math.vec3dist'></a>
### (static) H3DU.Math.vec3dist(vecFrom, vecTo)

Finds the straight-line distance from one three-element vector
to another, treating both as 3D points.

#### Parameters

* `vecFrom` (Type: Array.&lt;number>)<br>The first 3-element vector.
* `vecTo` (Type: Array.&lt;number>)<br>The second 3-element vector.

#### Return Value

The distance between the two vectors. (Type: number)

<a name='H3DU.Math.vec3dot'></a>
### (static) H3DU.Math.vec3dot(a, b)

Finds the dot product of two 3-element vectors. It's the
sum of the products of their components (for example, <b>a</b>'s X times
<b>b</b>'s X).

The following are properties of the dot product:
<ul>
<li>The dot
product equals |<b>a</b>| &#x2a; |<b>b</b>| &#x2a; cos &theta;
where |<b>x</b>| is the length of vector <b>x</b>, and
&theta; is the shortest angle between <b>a</b> and <b>b</b>.
It follows that:<ul>
<li>A dot product of 0 indicates that the vectors are 90
degrees apart, making them <i>orthogonal</i>
(perpendicular to each other).
<li>A dot product greater than 0 means less than 90 degrees apart.
<li>A dot product less than 0 means greater than 90 degrees apart.
<li>If both vectors are <a href="tutorial-glmath.md">unit vectors</a>, the cosine
of the shortest angle between them is equal to their dot product.
However, <code>Math.acos</code> won't return a negative angle
from that cosine, so the dot product can't
be used to determine if one vector is "ahead of" or "behind" another
vector.
<li>If both vectors are unit vectors, a dot product of 1 or -1 indicates
that the two vectors are parallel (and the vectors are 0 or
180 degrees apart, respectively.)
<li>If one of the vectors is a unit vector, the dot product's absolute
value will be the length that vector must have to make the closest
approach to the other vector's endpoint. If the dot product is negative,
the unit vector must also be in the opposite direction to approach the
other vector's endpoint.
</ul></li>
<li>If the two vectors are the same, the return value indicates
the vector's length squared. This is illustrated in the example.
<li>Switching the order of the two vectors results in the
same cross product. (Thus, the dot product is <i>commutative</i>.)
</ul>

#### Parameters

* `a` (Type: Array.&lt;number>)<br>The first 3-element vector.
* `b` (Type: Array.&lt;number>)<br>The second 3-element vector.

#### Return Value

A number representing the dot product. (Type: number)

#### Example

The following shows a fast way to compare
a vector's length using the dot product.

    // Check if the vector's length squared is less than 20 units squared
    if(H3DU.Math.vec3dot(vector, vector)<20*20) {
    // The vector's length is shorter than 20 units
    }

<a name='H3DU.Math.vec3fromWindowPoint'></a>
### (static) H3DU.Math.vec3fromWindowPoint(vector, matrix, viewport, [yUp])

Unprojects the <i>window coordinates</i> given in a
3-element vector,
using the given transformation matrix and viewport
rectangle.

In the window coordinate space, X coordinates increase
rightward and Y coordinates increase upward
or downward depending on the "yUp" parameter, and
Z coordinates within the view volume range from 0 to 1 and
increase from front to back.

#### Parameters

* `vector` (Type: Array.&lt;number>)<br>A 3-element vector giving the X, Y, and Z coordinates of the 3D point to transform.
* `matrix` (Type: Array.&lt;number>)<br>A 4x4 matrix. After undoing the transformation to window coordinates, the vector will be transformed by the inverse of this matrix according to the <a href="H3DU.Math.md#H3DU.Math.mat4projectVec3">H3DU.Math.mat4projectVec3</a> method.<br> To convert to world space, this parameter will generally be a projection-view matrix (projection matrix multiplied by the view matrix, in that order). To convert to object (model) space, this parameter will generally be a model-view-projection matrix (projection-view matrix multiplied by the world [model] matrix, in that order). See <a href="H3DU.Math.md#H3DU.Math.vec3toWindowPoint">H3DU.Math.vec3toWindowPoint</a> for the meaning of window coordinates with respect to the "matrix" and "yUp" parameters.
* `viewport` (Type: Boolean)<br>Has the same meaning as "viewport" in the <a href="H3DU.Math.md#H3DU.Math.vec3toWindowPoint">H3DU.Math.vec3toWindowPoint</a> method.
* `yUp` (Type: Boolean) (optional)<br>Has the same meaning as "yUp" in the <a href="H3DU.Math.md#H3DU.Math.vec3toWindowPoint">H3DU.Math.vec3toWindowPoint</a> method.

#### Return Value

A 3-element array giving the coordinates
of the unprojected point, in that order. (Type: Array.&lt;number>)

<a name='H3DU.Math.vec3length'></a>
### (static) H3DU.Math.vec3length(a)

Returns the distance of this 3-element vector from the origin,
also known as its <i>length</i> or <i>magnitude</i>.
It's the same as the square root of the sum of the squares
of its components.

Note that if vectors are merely sorted or compared by their lengths (and
those lengths are not added or multiplied together or the like),
it's faster to sort or compare them by the squares of their lengths (to find
the square of a 3-element vector's length, call <a href="H3DU.Math.md#H3DU.Math.vec3dot">H3DU.Math.vec3dot</a>
passing the same vector as both of its arguments).

#### Parameters

* `a` (Type: Array.&lt;number>)<br>A 3-element vector.

#### Return Value

Return value. (Type: number)

<a name='H3DU.Math.vec3lerp'></a>
### (static) H3DU.Math.vec3lerp(v1, v2, factor)

Does a linear interpolation between two 3-element vectors;
returns a new vector.

#### Parameters

* `v1` (Type: Array.&lt;number>)<br>The first vector to interpolate. The interpolation will occur on each component of this vector and v2.
* `v2` (Type: Array.&lt;number>)<br>The second vector to interpolate.
* `factor` (Type: number)<br>A value that usually ranges from 0 through 1. Closer to 0 means closer to v1, and closer to 1 means closer to v2.<br>For a nonlinear interpolation, define a function that takes a value that usually ranges from 0 through 1 and returns a value generally ranging from 0 through 1, and pass the result of that function to this method.<br> The following are examples of interpolation functions. See also the code examples following this list.<ul> <li>Linear: <code>factor</code>. Constant speed. <li>Powers: <code>Math.pow(factor, N)</code>, where N &gt; 0. For example, N=2 means a square, N=3 means cube, N=1/2 means square root, and N=1/3 means cube root. If N &gt; 1, this function starts slow and ends fast. If N &lt; 1, this function starts fast and ends slow. <li>Sine: <code>Math.sin(Math.PI\*0.5\*factor)</code>. This function starts fast and ends slow. <li>Smoothstep: <code>(3.0-2.0\*factor)\*factor\*factor</code>. This function starts and ends slow, and speeds up in the middle. <li>Perlin's "Smootherstep": <code>(10+factor\*(factor\*6-15))\*factor\*factor\*factor</code>. This function starts and ends slow, and speeds up in the middle. <li>Discrete-step timing, where N is a number of steps greater than 0:<ul> <li>Position start: <code>factor &lt; 0 ? 0 : Math.max(1.0,(1.0+Math.floor(factor\*N))/N)</code>.</li> <li>Position end: <code>Math.floor(factor\*N)/N</code>.</li></ul> <li>Inverted interpolation: <code>1.0-INTF(1.0-factor)</code>, where <code>INTF(x)</code> is another interpolation function. This function reverses the speed behavior; for example, a function that started fast now starts slow. <li>Ease: <code>factor &lt; 0.5 ? INTF(factor\*2)\*0.5 : 1.0-(INTF((1.0-factor)\*2)\*0.5)</code>, where <code>INTF(x)</code> is another interpolation function. Depending on the underlying function, this function eases in, then eases out, or vice versa. </ul>

#### Return Value

The interpolated vector. (Type: Array.&lt;number>)

#### Example

The following code does a nonlinear
interpolation of two vectors that uses the cube of "factor" rather than
"factor". Rather than at a constant speed, the vectors are interpolated
slowly then very fast.

    factor = factor*factor*factor; // cube the interpolation factor
    var newVector = H3DU.Math.vec3lerp(vector1, vector2, factor);

The following code does an inverted cubic
interpolation. This time, vectors are interpolated fast then very slowly.

    factor = 1 - factor; // Invert the factor
    factor = factor*factor*factor; // cube the interpolation factor
    factor = 1 - factor; // Invert the result
    var newVector = H3DU.Math.vec3lerp(vector1, vector2, factor);

The following code does the nonlinear
 interpolation called "smoothstep". It slows down at the beginning
and end, and speeds up in the middle.

    factor = (3.0-2.0*factor)*factor*factor; // smoothstep interpolation
    var newVector = H3DU.Math.vec3lerp(vector1, vector2, factor);

<a name='H3DU.Math.vec3mul'></a>
### (static) H3DU.Math.vec3mul(a, b)

Multiplies each of the components of two 3-element vectors and returns a new
vector with the result.

#### Parameters

* `a` (Type: Array.&lt;number>)<br>The first 3-element vector.
* `b` (Type: Array.&lt;number>)<br>The second 3-element vector.

#### Return Value

The resulting 3-element vector. (Type: Array.&lt;number>)

<a name='H3DU.Math.vec3mulInPlace'></a>
### (static) H3DU.Math.vec3mulInPlace(a, b)

Multiplies each of the components of two 3-element vectors and stores
the result in the first vector.

#### Parameters

* `a` (Type: Array.&lt;number>)<br>The first 3-element vector.
* `b` (Type: Array.&lt;number>)<br>The second 3-element vector.

#### Return Value

The parameter "a" (Type: Array.&lt;number>)

<a name='H3DU.Math.vec3negate'></a>
### (static) H3DU.Math.vec3negate(a)

Negates a 3-element vector and returns a new
vector with the result, which is generally a vector with
the same length but opposite direction. Negating a vector
is the same as reversing the sign of each of its components.

#### Parameters

* `a` (Type: Array.&lt;number>)<br>A 3-element vector.

#### Return Value

The resulting 3-element vector. (Type: Array.&lt;number>)

<a name='H3DU.Math.vec3negateInPlace'></a>
### (static) H3DU.Math.vec3negateInPlace(a)

Negates a 3-element vector in place, generally resulting in a vector with
the same length but opposite direction.
Negating a vector
is the same as reversing the sign of each of its components.

#### Parameters

* `a` (Type: Array.&lt;number>)<br>A 3-element vector.

#### Return Value

The parameter "a". (Type: Array.&lt;number>)

<a name='H3DU.Math.vec3norm'></a>
### (static) H3DU.Math.vec3norm(vec)

<b>Deprecated: Use <a href="H3DU.Math.md#H3DU.Math.vec3normalize">H3DU.Math.vec3normalize</a> instead.
The name of this method may be confused with a vector's "norm", another name for its length.</b>

Deprecated alias for <a href="H3DU.Math.md#H3DU.Math.vec3normalize">H3DU.Math.vec3normalize</a>.

#### Parameters

* `vec` (Type: Array.&lt;number>)<br>Vector to normalize.

#### Return Value

The normalized vector. (Type: Array.&lt;number>)

<a name='H3DU.Math.vec3normInPlace'></a>
### (static) H3DU.Math.vec3normInPlace(vec)

<b>Deprecated: Use <a href="H3DU.Math.md#H3DU.Math.vec3normalizeInPlace">H3DU.Math.vec3normalizeInPlace</a> instead.
The name of this method may be confused with a vector's "norm", another name for its length.</b>

Deprecated alias for <a href="H3DU.Math.md#H3DU.Math.vec3normalizeInPlace">H3DU.Math.vec3normalizeInPlace</a>.

#### Parameters

* `vec` (Type: Array.&lt;number>)<br>Vector to normalize in place.

#### Return Value

The parameter "vec" (Type: Array.&lt;number>)

<a name='H3DU.Math.vec3normalize'></a>
### (static) H3DU.Math.vec3normalize(vec)

Converts a 3-element vector to a <a href="tutorial-glmath.md">unit vector</a>; returns a new vector.
When a vector is normalized, its direction remains the same but the distance from the origin
to that vector becomes 1 (unless all its components are 0).
A vector is normalized by dividing each of its components
by its <a href="H3DU.Math.md#H3DU.Math.vec3length">length</a>.

#### Parameters

* `vec` (Type: Array.&lt;number>)<br>A 3-element vector.

#### Return Value

The resulting vector.
Note that due to rounding error, the vector's length might not be exactly equal to 1, and that the vector will remain unchanged if its length is 0 or extremely close to 0. (Type: Array.&lt;number>)

#### Example

The following example changes the
length of a line segment.

    var startPt=[x1,y1,z1]; // Line segment's start
    var endPt=[x2,y2,z2]; // Line segment's end
    // Find difference between endPt and startPt
    var delta=H3DU.Math.vec3sub(endPt,startPt);
    // Normalize delta to a unit vector
    var deltaNorm=H3DU.Math.vec3normalize(delta);
    // Rescale to the desired length, here, 10
    H3DU.Math.vec3scaleInPlace(deltaNorm,10);
    // Find the new endpoint
    endPt=H3DU.Math.vec3add(startPt,deltaNorm);

<a name='H3DU.Math.vec3normalizeInPlace'></a>
### (static) H3DU.Math.vec3normalizeInPlace(vec)

Converts a 3-element vector to a <a href="tutorial-glmath.md">unit vector</a>.
When a vector is normalized, its direction remains the same but the distance from the origin
to that vector becomes 1 (unless all its components are 0).
A vector is normalized by dividing each of its components
by its <a href="H3DU.Math.md#H3DU.Math.vec3length">length</a>.

#### Parameters

* `vec` (Type: Array.&lt;number>)<br>A 3-element vector.

#### Return Value

The parameter "vec".
Note that due to rounding error, the vector's length might not be exactly equal to 1, and that the vector will remain unchanged if its length is 0 or extremely close to 0. (Type: Array.&lt;number>)

<a name='H3DU.Math.vec3perp'></a>
### (static) H3DU.Math.vec3perp(vec)

Returns an arbitrary 3-element vector that is perpendicular
(orthogonal) to the given 3-element vector. The return value
will not be converted to a <a href="tutorial-glmath.md">unit vector</a>.

#### Parameters

* `vec` (Type: Array.&lt;number>)<br>A 3-element vector.

#### Return Value

A perpendicular 3-element
vector. Returns (0,0,0) if "vec" is (0,0,0). (Type: Array.&lt;number>)

<a name='H3DU.Math.vec3proj'></a>
### (static) H3DU.Math.vec3proj(vec, refVec)

Returns the projection of a 3-element vector on the given
reference vector. Assuming both vectors
start at the same point, the resulting vector
will be parallel to the
reference vector but will make the closest
approach possible to the projected vector's
endpoint. The difference between the projected
vector and the return value will be perpendicular
to the reference vector.

#### Parameters

* `vec` (Type: Array.&lt;number>)<br>The vector to project.
* `refVec` (Type: Array.&lt;number>)<br>The reference vector whose length will be adjusted.

#### Return Value

The projection of
"vec" on "refVec". Returns (0,0,0) if "refVec"'s
length is 0 or extremely close to 0. (Type: Array.&lt;number>)

<a name='H3DU.Math.vec3reflect'></a>
### (static) H3DU.Math.vec3reflect(incident, normal)

Returns a vector that reflects off a surface.

#### Parameters

* `incident` (Type: Array.&lt;number>)<br>Incident vector, or a vector headed in the direction of the surface, as a 3-element vector.
* `normal` (Type: Array.&lt;number>)<br>Surface normal vector, or a vector that's perpendicular to the surface, as a 3-element vector. Should be a <a href="tutorial-glmath.md">unit vector</a>.

#### Return Value

A vector that has the same length
as "incident" but is reflected away from the surface. (Type: Array.&lt;number>)

<a name='H3DU.Math.vec3scale'></a>
### (static) H3DU.Math.vec3scale(a, scalar)

Multiplies each element of a 3-element vector by a factor. Returns
a new vector that will point in the same direction
but with its length multiplied by the given factor.

#### Parameters

* `a` (Type: Array.&lt;number>)<br>A 3-element vector.
* `scalar` (Type: number)<br>A factor to multiply. To divide a vector by a number, the factor will be 1 divided by that number.

#### Return Value

The parameter "a". (Type: Array.&lt;number>)

<a name='H3DU.Math.vec3scaleInPlace'></a>
### (static) H3DU.Math.vec3scaleInPlace(a, scalar)

Multiplies each element of a 3-element vector by a factor, so
that the vector points in the same direction
but its length is multiplied by the given factor.

#### Parameters

* `a` (Type: Array.&lt;number>)<br>A 3-element vector.
* `scalar` (Type: number)<br>A factor to multiply. To divide a vector by a number, the factor will be 1 divided by that number.

#### Return Value

The parameter "a". (Type: Array.&lt;number>)

<a name='H3DU.Math.vec3sub'></a>
### (static) H3DU.Math.vec3sub(a, b)

Subtracts the second vector from the first vector and returns a new
vector with the result. Subtracting two vectors
is the same as subtracting each of their components.

#### Parameters

* `a` (Type: Array.&lt;number>)<br>The first 3-element vector.
* `b` (Type: Array.&lt;number>)<br>The second 3-element vector.

#### Return Value

The resulting 3-element vector.
This is the vector <i>to <code>a</code> from <code>b</code></i>. (Type: Array.&lt;number>)

<a name='H3DU.Math.vec3subInPlace'></a>
### (static) H3DU.Math.vec3subInPlace(a, b)

Subtracts the second vector from the first vector and stores
the result in the first vector. Subtracting two vectors
is the same as subtracting each of their components.

#### Parameters

* `a` (Type: Array.&lt;number>)<br>The first 3-element vector.
* `b` (Type: Array.&lt;number>)<br>The second 3-element vector.

#### Return Value

The parameter "a".
This is the vector <i>to the previous <code>a</code> from <code>b</code></i>. (Type: Array.&lt;number>)

<a name='H3DU.Math.vec3toWindowPoint'></a>
### (static) H3DU.Math.vec3toWindowPoint(vector, matrix, viewport, [yUp])

Transforms the 3D point specified in this 3-element vector to its
<i>window coordinates</i>
using the given transformation matrix and viewport rectangle.

#### Parameters

* `vector` (Type: Array.&lt;number>)<br>A 3-element vector giving the X, Y, and Z coordinates of the 3D point to transform.
* `matrix` (Type: Array.&lt;number>)<br>A 4x4 matrix to use to transform the vector according to the <a href="H3DU.Math.md#H3DU.Math.mat4projectVec3">H3DU.Math.mat4projectVec3</a> method, before the transformed vector is converted to window coordinates. <br>This parameter will generally be a projection-view matrix (projection matrix multiplied by the view matrix, in that order), if the vector to transform is in <i>world space</i>, or a model-view-projection matrix, that is, (projection-view matrix multiplied by the model [world] matrix, in that order), if the vector is in <i>model (object) space</i>. <br>If the matrix includes a projection transform returned by <a href="H3DU.Math.md#H3DU.Math.mat4ortho">H3DU.Math.mat4ortho</a>, <a href="H3DU.Math.md#H3DU.Math.mat4perspective">H3DU.Math.mat4perspective</a>, or similar <a href="H3DU.Math.md">H3DU.Math</a> methods, then in the <i>window coordinate</i> space, X coordinates increase rightward, Y coordinates increase upward, and Z coordinates within the view volume range from 0 to 1 and increase from front to back, unless otherwise specified in those methods' documentation. If "yUp" is omitted or is a "falsy" value, the Y coordinates increase downward instead of upward or vice versa.
* `viewport` (Type: Array.&lt;number>)<br>A 4-element array specifying the starting position and size of the viewport in window units (such as pixels). In order, the four elements are the starting position's X coordinate, its Y coordinate, the viewport's width, and the viewport's height. Throws an error if the width or height is less than 0.
* `yUp` (Type: Boolean) (optional)<br>If omitted or a "falsy" value, reverses the sign of the Y coordinate returned by the <a href="H3DU.Math.md#H3DU.Math.mat4projectVec3">H3DU.Math.mat4projectVec3</a> method before converting it to window coordinates. If true, the Y coordinate will remain unchanged. If window Y coordinates increase upward, the viewport's starting position is at the lower left corner. If those coordinates increase downward, the viewport's starting position is at the upper left corner.

#### Return Value

A 3-element array giving the window
coordinates, in that order. (Type: Array.&lt;number>)

<a name='H3DU.Math.vec3triple'></a>
### (static) H3DU.Math.vec3triple(a, b, c)

Finds the scalar triple product of three vectors (A, B, and C). The triple
product is the <a href="H3DU.Math.md#H3DU.Math.vec3dot">dot product</a> of both A and the
<a href="H3DU.Math.md#H3DU.Math.vec3cross">cross product</a>
of B and C. The following are properties of the scalar triple product
(called triple product in what follows):<ul>
<li>Switching the order of B and C, A and C, or A and B results in a triple product
with its sign reversed. Moving all three parameters to different positions, though,
results in the same triple product.
<li>The triple product's absolute value is the volume of a parallelepiped (skewed
box) where three of its sides having a vertex in common are
defined by A, B, and C, in any order.
<li>If the triple product is 0, all three vectors lie on the same plane (are <i>coplanar</i>).
<li>The triple product is the same as the <i>determinant</i> (overall scaling factor)
of a 3x3 matrix whose rows or columns are the vectors A, B, and C, in that order.
<li>Assume A is perpendicular to vectors B and C. If the triple product is positive,
then A points in the same direction as the cross product of
B and C -- which will be perpendicular -- and the angle from B to C, when rotated
about vector A, is positive. If the triple product is negative, then A points in the
opposite direction from that cross product, and that angle is negative.
(See the example below.)
</ul>

#### Parameters

* `a` (Type: Array.&lt;number>)<br>The first 3-element vector.
* `b` (Type: Array.&lt;number>)<br>The second 3-element vector, or the first parameter to the cross product.
* `c` (Type: Array.&lt;number>)<br>The third 3-element vector, or the second parameter to the cross product.

#### Return Value

A number giving the triple product. (Type: number)

<a name='H3DU.Math.vec4abs'></a>
### (static) H3DU.Math.vec4abs(a)

Returns a new 4-element
vector with the absolute value of each of its components.

#### Parameters

* `a` (Type: Array.&lt;number>)<br>A 4-element vector.

#### Return Value

The resulting 4-element vector. (Type: Array.&lt;number>)

<a name='H3DU.Math.vec4absInPlace'></a>
### (static) H3DU.Math.vec4absInPlace(a)

Sets each component of the given 4-element
vector to its absolute value.

#### Parameters

* `a` (Type: Array.&lt;number>)<br>A 4-element vector.

#### Return Value

The vector "a". (Type: Array.&lt;number>)

<a name='H3DU.Math.vec4add'></a>
### (static) H3DU.Math.vec4add(a, b)

Adds two 4-element vectors and returns a new
vector with the result. Adding two vectors
is the same as adding each of their components.
The resulting vector describes a straight-line path for the
combined paths described by the given vectors, in either order.

#### Parameters

* `a` (Type: Array.&lt;number>)<br>The first 4-element vector.
* `b` (Type: Array.&lt;number>)<br>The second 4-element vector.

#### Return Value

The resulting 4-element vector. (Type: Array.&lt;number>)

<a name='H3DU.Math.vec4addInPlace'></a>
### (static) H3DU.Math.vec4addInPlace(a, b)

Adds two 4-element vectors and stores
the result in the first vector. Adding two vectors
is the same as adding each of their components.
The resulting vector describes a straight-line path for the
combined paths described by the given vectors, in either order.

#### Parameters

* `a` (Type: Array.&lt;number>)<br>The first 4-element vector.
* `b` (Type: Array.&lt;number>)<br>The second 4-element vector.

#### Return Value

The parameter "a".
This is the vector <i>to the previous <code>a</code> from <code>b</code></i>. (Type: Array.&lt;number>)

<a name='H3DU.Math.vec4assign'></a>
### (static) H3DU.Math.vec4assign(dst, src)

Assigns the values of a 4-element vector into another
4-element vector.

#### Parameters

* `dst` (Type: Array.&lt;number>)<br>The 4-element vector to copy the source values to.
* `src` (Type: Array.&lt;number>)<br>The 4-element vector whose values will be copied.

#### Return Value

The parameter "dst". (Type: Array.&lt;number>)

<a name='H3DU.Math.vec4clamp'></a>
### (static) H3DU.Math.vec4clamp(a, min, max)

Returns a 4-element vector in which each element of the given 4-element vector is clamped

#### Parameters

* `a` (Type: Array.&lt;number>)<br>The vector to clamp.
* `min` (Type: number)<br>Lowest possible value. Should not be greater than "max".
* `max` (Type: number)<br>Highest possible value. Should not be less than "min".

#### Return Value

The resulting vector. (Type: Array.&lt;number>)

<a name='H3DU.Math.vec4clampInPlace'></a>
### (static) H3DU.Math.vec4clampInPlace(a, min, max)

Clamps each element of the given 4-element vector
so it's not less than one value or greater than another value.

#### Parameters

* `a` (Type: Array.&lt;number>)<br>The vector to clamp.
* `min` (Type: number)<br>Lowest possible value. Should not be greater than "max".
* `max` (Type: number)<br>Highest possible value. Should not be less than "min".

#### Return Value

The resulting vector. (Type: Array.&lt;number>)

<a name='H3DU.Math.vec4copy'></a>
### (static) H3DU.Math.vec4copy(vec)

Returns a copy of a 4-element vector.

#### Parameters

* `vec` (Type: Array.&lt;number>)<br>A 4-element vector.

#### Return Value

Return value. (Type: Array.&lt;number>)

<a name='H3DU.Math.vec4dot'></a>
### (static) H3DU.Math.vec4dot(a, b)

Finds the dot product of two 4-element vectors. It's the
sum of the products of their components (for example, <b>a</b>'s X times <b>b</b>'s X).
For properties of the dot product, see <a href="H3DU.Math.md#H3DU.Math.vec3dot">H3DU.Math.vec3dot</a>.

#### Parameters

* `a` (Type: Array.&lt;number>)<br>The first 4-element vector.
* `b` (Type: Array.&lt;number>)<br>The second 4-element vector.

#### Return Value

Return value. (Type: number)

<a name='H3DU.Math.vec4length'></a>
### (static) H3DU.Math.vec4length(a)

Returns the distance of this 4-element vector from the origin,
also known as its <i>length</i> or <i>magnitude</i>.
It's the same as the square root of the sum of the squares
of its components.

Note that if vectors are merely sorted or compared by their lengths,
it's faster to sort or compare them by the squares of their lengths (to find
the square of a 4-element vector's length, call <a href="H3DU.Math.md#H3DU.Math.vec4dot">H3DU.Math.vec4dot</a>
passing the same vector as both of its arguments).

#### Parameters

* `a` (Type: Array.&lt;number>)<br>A 4-element vector.

#### Return Value

Return value. (Type: number)

<a name='H3DU.Math.vec4lerp'></a>
### (static) H3DU.Math.vec4lerp(v1, v2, factor)

Does a linear interpolation between two 4-element vectors;
returns a new vector.

#### Parameters

* `v1` (Type: Array.&lt;number>)<br>The first vector to interpolate. The interpolation will occur on each component of this vector and v2.
* `v2` (Type: Array.&lt;number>)<br>The second vector to interpolate.
* `factor` (Type: number)<br>A value that usually ranges from 0 through 1. Closer to 0 means closer to v1, and closer to 1 means closer to v2. For a nonlinear interpolation, define a function that takes a value that usually ranges from 0 through 1 and generally returns A value that usually ranges from 0 through 1, and pass the result of that function to this method. See the documentation for <a href="H3DU.Math.md#H3DU.Math.vec3lerp">H3DU.Math.vec3lerp</a> for examples of interpolation functions.

#### Return Value

The interpolated vector. (Type: Array.&lt;number>)

<a name='H3DU.Math.vec4negate'></a>
### (static) H3DU.Math.vec4negate(a)

Negates a 4-element vector and returns a new
vector with the result, which is generally a vector with
the same length but opposite direction. Negating a vector
is the same as reversing the sign of each of its components.

#### Parameters

* `a` (Type: Array.&lt;number>)<br>A 4-element vector.

#### Return Value

The resulting 4-element vector. (Type: Array.&lt;number>)

<a name='H3DU.Math.vec4negateInPlace'></a>
### (static) H3DU.Math.vec4negateInPlace(a)

Negates a 4-element vector in place, generally resulting in a vector with
the same length but opposite direction.
Negating a vector
is the same as reversing the sign of each of its components.

#### Parameters

* `a` (Type: Array.&lt;number>)<br>A 4-element vector.

#### Return Value

The parameter "a". (Type: Array.&lt;number>)

<a name='H3DU.Math.vec4norm'></a>
### (static) H3DU.Math.vec4norm(vec)

<b>Deprecated: Use <a href="H3DU.Math.md#H3DU.Math.vec4normalize">H3DU.Math.vec4normalize</a> instead.
The name of this method may be confused with a vector's "norm", another name for its length.</b>

Deprecated alias for <a href="H3DU.Math.md#H3DU.Math.vec4normalize">H3DU.Math.vec4normalize</a>.

#### Parameters

* `vec` (Type: Array.&lt;number>)<br>Vector to normalize.

#### Return Value

The normalized vector. (Type: Array.&lt;number>)

<a name='H3DU.Math.vec4normInPlace'></a>
### (static) H3DU.Math.vec4normInPlace(vec)

<b>Deprecated: Use <a href="H3DU.Math.md#H3DU.Math.vec4normalizeInPlace">H3DU.Math.vec4normalizeInPlace</a> instead.
The name of this method may be confused with a vector's "norm", another name for its length.</b>

Deprecated alias for <a href="H3DU.Math.md#H3DU.Math.vec4normalizeInPlace">H3DU.Math.vec4normalizeInPlace</a>.

#### Parameters

* `vec` (Type: Array.&lt;number>)<br>Vector to normalize in place.

#### Return Value

The parameter "vec" (Type: Array.&lt;number>)

<a name='H3DU.Math.vec4normalize'></a>
### (static) H3DU.Math.vec4normalize(vec)

Converts a 4-element vector to a <a href="tutorial-glmath.md">unit vector</a>; returns a new vector.
When a vector is normalized, its direction remains the same but the distance from the origin
to that vector becomes 1 (unless all its components are 0).
A vector is normalized by dividing each of its components
by its <a href="H3DU.Math.md#H3DU.Math.vec4length">length</a>.

#### Parameters

* `vec` (Type: Array.&lt;number>)<br>A 4-element vector.

#### Return Value

The resulting vector.
Note that due to rounding error, the vector's length might not be exactly equal to 1, and that the vector will remain unchanged if its length is 0 or extremely close to 0. (Type: Array.&lt;number>)

<a name='H3DU.Math.vec4normalizeInPlace'></a>
### (static) H3DU.Math.vec4normalizeInPlace(vec)

Converts a 4-element vector to a <a href="tutorial-glmath.md">unit vector</a>.
When a vector is normalized, its direction remains the same but the distance from the origin
to that vector becomes 1 (unless all its components are 0).
A vector is normalized by dividing each of its components
by its <a href="H3DU.Math.md#H3DU.Math.vec4length">length</a>.

#### Parameters

* `vec` (Type: Array.&lt;number>)<br>A 4-element vector.

#### Return Value

The parameter "vec".
Note that due to rounding error, the vector's length might not be exactly equal to 1, and that the vector will remain unchanged if its length is 0 or extremely close to 0. (Type: Array.&lt;number>)

<a name='H3DU.Math.vec4proj'></a>
### (static) H3DU.Math.vec4proj(vec, refVec)

Returns the projection of a 4-element vector on the given
reference vector. Assuming both vectors
start at the same point, the resulting vector
will be parallel to the
reference vector but will make the closest
approach possible to the projected vector's
endpoint. The difference between the projected
vector and the return value will be perpendicular
to the reference vector.

#### Parameters

* `vec` (Type: Array.&lt;number>)<br>The vector to project.
* `refVec` (Type: Array.&lt;number>)<br>The reference vector whose length will be adjusted.

#### Return Value

The projection of
"vec" on "refVec". Returns (0,0,0,0) if "refVec"'s
length is 0 or extremely close to 0. (Type: Array.&lt;number>)

<a name='H3DU.Math.vec4scale'></a>
### (static) H3DU.Math.vec4scale(a, scalar)

Multiplies each element of a 4-element vector by a factor, returning
a new vector that will point in the same direction
but with its length multiplied by the given factor.

#### Parameters

* `a` (Type: Array.&lt;number>)<br>A 4-element vector.
* `scalar` (Type: number)<br>A factor to multiply. To divide a vector by a number, the factor will be 1 divided by that number.

#### Return Value

The resulting 4-element vector. (Type: Array.&lt;number>)

<a name='H3DU.Math.vec4scaleInPlace'></a>
### (static) H3DU.Math.vec4scaleInPlace(a, scalar)

Multiplies each element of a 4-element vector by a factor, so
that the vector points in the same direction
but its length is multiplied by the given factor.

#### Parameters

* `a` (Type: Array.&lt;number>)<br>A 4-element vector.
* `scalar` (Type: number)<br>A factor to multiply. To divide a vector by a number, the factor will be 1 divided by that number.

#### Return Value

The parameter "a". (Type: Array.&lt;number>)

<a name='H3DU.Math.vec4sub'></a>
### (static) H3DU.Math.vec4sub(a, b)

Subtracts the second vector from the first vector and returns a new
vector with the result. Subtracting two vectors
is the same as subtracting each of their components.

#### Parameters

* `a` (Type: Array.&lt;number>)<br>The first 4-element vector.
* `b` (Type: Array.&lt;number>)<br>The second 4-element vector.

#### Return Value

The resulting 4-element vector.
This is the vector <i>to <code>a</code> from <code>b</code></i>. (Type: Array.&lt;number>)

<a name='H3DU.Math.vec4subInPlace'></a>
### (static) H3DU.Math.vec4subInPlace(a, b)

Subtracts the second vector from the first vector and stores
the result in the first vector. Subtracting two vectors
is the same as subtracting each of their components.

#### Parameters

* `a` (Type: Array.&lt;number>)<br>The first 4-element vector.
* `b` (Type: Array.&lt;number>)<br>The second 4-element vector.

#### Return Value

The parameter "a" (Type: Array.&lt;number>)

[Back to documentation index.](index.md)

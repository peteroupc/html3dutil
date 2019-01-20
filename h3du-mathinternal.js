/*
 Any copyright to this file is released to the Public Domain.
 http://creativecommons.org/publicdomain/zero/1.0/
 If you like this, you should donate
 to Peter O. (original author of
 the Public Domain HTML 3D Library) at:
 http://peteroupc.github.io/
*/
/** @ignore */
export const MathInternal = {
  "vecZeros":function(count) {
    const vec = [];
    let i;
    for (i = 0; i < count; i++) {
      vec[i] = 0;
    }
    return vec;
  },
  "vecSub":function(vec, subVec) {
    const ret = [];
    let i;
    for (i = 0; i < vec.length; i++) {
      ret[i] = vec[i] - subVec[i];
    }
    return ret;
  },
  "vecSubInPlace":function(vec, subVec) {
    let i;
    for (i = 0; i < vec.length; i++) {
      vec[i] -= subVec[i];
    }
    return vec;
  },
  "vecScale":function(vec, scalar) {
    const ret = [];
    let i;
    for (i = 0; i < vec.length; i++) {
      ret[i] = vec[i] * scalar;
    }
    return ret;
  },
  "vecSubScaleInPlace":function(vec, subVec, scaleNum) {
    let i;
    for (i = 0; i < vec.length; i++) {
      vec[i] = (vec[i] - subVec[i]) * scaleNum;
    }
    return vec;
  },
  "vecScaleInPlace":function(vec, scaleNum) {
    let i;
    for (i = 0; i < vec.length; i++) {
      vec[i] *= scaleNum;
    }
    return vec;
  },
  "vecNormalizeInPlace":function(vec) {
    let len = 0;
    let i;
    for (i = 0; i < vec.length; i++) {
      len += vec[i] * vec[i];
    }
    len = Math.sqrt(len);
    if(len !== 0) {
      const invlen = 1.0 / len;
      let i;
      for (i = 0; i < vec.length; i++) {
        vec[i] *= invlen;
      }
    }
    return vec;
  },
  "vecLength":function(vec) {
    let dsq = 0;
    let i;
    for (i = 0; i < vec.length; i++) {
      dsq += vec[i] * vec[i];
    }
    return Math.sqrt(dsq);
  }
};

/* global H3DU */
/*
 Any copyright to this file is released to the Public Domain.
 http://creativecommons.org/publicdomain/zero/1.0/
 If you like this, you should donate
 to Peter O. (original author of
 the Public Domain HTML 3D Library) at:
 http://peteroupc.github.io/
*/
/** @ignore */
H3DU._MathInternal = {
  "vecZeros":function(count) {
    "use strict";
    var vec = [];
    for(var i = 0; i < count; i++) {
      vec[i] = 0;
    }
    return vec;
  },
  "vecSub":function(vec, subVec) {
    "use strict";
    var ret = [];
    for(var i = 0; i < vec.length; i++) {
      ret[i] = vec[i] - subVec[i];
    }
    return ret;
  },
  "vecSubInPlace":function(vec, subVec) {
    "use strict";
    for(var i = 0; i < vec.length; i++) {
      vec[i] -= subVec[i];
    }
    return vec;
  },
  "vecScale":function(vec, scalar) {
    "use strict";
    var ret = [];
    for(var i = 0; i < vec.length; i++) {
      ret[i] = vec[i] * scalar;
    }
    return ret;
  },
  "vecSubScaleInPlace":function(vec, subVec, scaleNum) {
    "use strict";
    for(var i = 0; i < vec.length; i++) {
      vec[i] = (vec[i] - subVec[i]) * scaleNum;
    }
    return vec;
  },
  "vecNormalizeInPlace":function(vec) {
    "use strict";
    var len = 0;
    for(var i = 0; i < vec.length; i++) {
      len += vec[i] * vec[i];
    }
    len = Math.sqrt(len);
    if(len !== 0) {
      for(i = 0; i < vec.length; i++) {
        len += vec[i] * vec[i];
      }
    }
    return vec;
  },
  "vecLength":function(vec) {
    "use strict";
    var dsq = 0;
    for(var i = 0; i < vec.length; i++) {
      dsq += vec[i] * vec[i];
    }
    return Math.sqrt(dsq);
  }
};

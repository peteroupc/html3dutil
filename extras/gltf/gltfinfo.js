/* global H3DU */
/*
 Any copyright to this file is released to the Public Domain.
 http://creativecommons.org/publicdomain/zero/1.0/
 If you like this, you should donate
 to Peter O. (original author of
 the Public Domain HTML 3D Library) at:
 http://peteroupc.github.io/
*/
import {GltfUtil} from "./gltfutil";

function GltfInfo() {
  this.animChannels = [];
  this.batch = null;
  this.timer = {};
  this.imageUris = [];
}
/** @ignore */
GltfInfo.prototype.getImageURIs = function() {
  return this.imageUris.slice(0, this.imageUris.length);
};

/** @ignore */
GltfInfo.prototype.getShape = function() {
  return this.batch;
};
/** @ignore */
GltfInfo._interpolate = function(node, s, e, t, path) {
  switch(path) {
  case 0: {
      // translation
    node.getTransform().setPosition(
         GltfUtil._lerp(s, e, t));
    break;
  }
  case 1: {
      // scale
    node.getTransform().setScale(
         GltfUtil._lerp(s, e, t));
    break;
  }
  case 2: {
      // rotation
    node.getTransform().setQuaternion(
         GltfUtil._slerp(s, e, t));
    break;
  }
  default:
    break;
  }
};
/** @ignore */
GltfInfo.prototype.update = function(time) {
  if(this.maxEndTimeSecs > 0) {
    for(var i = 0; i < this.animChannels.length; i++) {
      var ch = this.animChannels[i];
      var node = ch.target;
      var maxInput = ch.sampler.input[ch.sampler.input.length - 1];
      var pos = H3DU.getTimePosition(this.timer, time,
      this.maxEndTimeSecs * 1000.0);
      if(pos * this.maxEndTimeSecs > maxInput) {
        // Reached end of animation
        var last = ch.sampler.output[ch.sampler.output.length - 1];
        GltfInfo._interpolate(node, last, last, 0, ch.path);
      } else {
        var invEnd = 1.0 / this.maxEndTimeSecs;
        var inputLen = ch.sampler.input.length;
        for(var j = 0; j < inputLen; j++) {
          var s = ch.sampler.input[j] * invEnd;
          var e = ch.sampler.input[j + 1] * invEnd;
      // LATER: Support STEP interpolation
          if(pos >= s && pos <= e) {
            var fac = s === e ? 0.0 : (pos - s) / (e - s);
            GltfInfo._interpolate(node,
      ch.sampler.output[j],
            ch.sampler.output[j + 1], fac, ch.path);
          }
        }
      }
    }
  }
};

export {GltfInfo};

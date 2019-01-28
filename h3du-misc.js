/*
 Any copyright to this file is released to the Public Domain.
 http://creativecommons.org/publicdomain/zero/1.0/
 If you like this, you should donate
 to Peter O. (original author of
 the Public Domain HTML 3D Library) at:
 http://peteroupc.github.io/
*/
/* global JSON, Promise */

/**
 * This is a library with classes and methods that were formerly in the Public Domain HTML 3D Library.<p>
 * This page describes miscellaneous utility methods included in the
 * library.
 * @namespace H3DU
 * @license CC0-1.0
 */
// TODO: Maybe bring back H3DU.RenderLoop
/** @suppress {checkTypes}
 * @ignore */
function objectKeysPolyfill() {
  if(typeof Object.keys === "undefined" || Object.keys === null) {
    Object.keys = function(o) {
      const ret = [];
      for(const i in o) {
        if(Object.prototype.hasOwnProperty.call(o, i)) {
          ret[ret.length] = i;
        }
      }
      return ret;
    };
  }
}
objectKeysPolyfill();

/**
 * Utility function that returns a promise that
 * resolves after the given list of promises finishes
 * its work.
 * @param {Array<Promise>} promises - an array containing promise objects
 * @param {Function} [progressResolve] A function called as each
 * individual promise is resolved.
 * @param {Function} [progressReject] A function called as each
 * individual promise is rejected.
 * @returns {Promise} A promise that is never rejected and resolves when
 * all of the promises are each resolved or rejected. The result
 * of the promise will be an object with
 * three keys:<ul>
 *  <li>"successes" - contains a list of results from the
 * promises that succeeded, in the order in which those promises were listed.
 *  <li>"failures" - contains a list of results from the
 * promises that failed, in the order in which those promises were listed.
 *  <li>"results" - contains a list of boolean values for each
 * promise, in the order in which the promises were listed.
 * True means success, and false means failure.</ul>
 * @function
 */
export const getPromiseResults = function(promises,
  progressResolve, progressReject) {
  if(!promises || promises.length === 0) {
    return Promise.resolve({
      "successes":[],
      "failures":[],
      "results":[]
    });
  }
  function promiseResolveFunc(pr, ret, index) {
    return function(x) {
      if(pr)pr(x);
      ret.successes[index] = x;
      return true;
    };
  }
  function promiseRejectFunc(pr, ret, index) {
    return function(x) {
      if(pr)pr(x);
      ret.failures[index] = x;
      return true;
    };
  }
  const ret = {
    "successes":[],
    "failures":[],
    "results":[]
  };
  const newPromises = [];
  let i;
  for (i = 0; i < promises.length; i++) {
    const index = i;
    newPromises.push(promises[i].then(
      promiseResolveFunc(progressResolve, ret, index),
      promiseRejectFunc(progressReject, ret, index)
    ));
  }
  return Promise.all(newPromises).then(function(results) {
  // compact the successes and failures arrays
    let i;
    for (i = 0; i < ret.successes.length; i++) {
      if(typeof ret.successes[i] === "undefined") {
        ret.successes.splice(i, 1);
        i -= 1;
      }
    }

    for (i = 0; i < ret.failures.length; i++) {
      if(typeof ret.failures[i] === "undefined") {
        ret.failures.splice(i, 1);
        i -= 1;
      }
    }
    ret.results = results;
    return Promise.resolve(ret);
  });
};
/**
 * Utility function that returns a promise that
 * resolves or is rejected after the given list of promises finishes
 * its work.
 * @param {Array<Promise>} promises - an array containing promise objects
 * @param {Function} [progressResolve] - a function called as each
 * individual promise is resolved; optional
 * @param {Function} [progressReject] - a function called as each
 * individual promise is rejected; optional
 * @returns {Promise} A promise that is resolved when
 * all of the promises are each resolved; the result will
 * be an array of results from those promises,
 * in the order in which those promises were listed.
 * Will be rejected if any of the promises is rejected; the result
 * will be an object as specified in {@link getPromiseResults}.</ul>
 * @function
 */
export const getPromiseResultsAll = function(promises,
  progressResolve, progressReject) {
  return getPromiseResults(promises, progressResolve, progressReject)
    .then(function(results) {
      if(results.failures.length > 0) {
        return Promise.reject(results);
      } else {
        return Promise.resolve(results.successes);
      }
    });
};

/**
 * Gets the position of a time value within an interval.
 * This is useful for doing animation cycles lasting a certain number
 * of seconds, such as rotating a shape in a 5-second cycle.
 * This method may be called any number of times each frame.
 * @param {Object} timer An object that will hold two
 * properties:<ul>
 * <li>"time" - initial time value, in milliseconds.
 * <li>"lastTime" - last known time value, in milliseconds.
 * Will be set to the value given in "timeInMs" before returning.
 * </ul>
 * The object should be initialized using the idiom <code>{}</code>
 * or <code>new Object()</code>.
 * @param {number} timeInMs A time value, in milliseconds.
 * This could be the parameter received in a
 * <code>requestAnimationFrame()</code> callback method.
 * @param {number} intervalInMs The length of the interval
 * (animation cycle), in milliseconds.
 * @returns {number} A value in the range [0, 1), where closer
 * to 0 means "timeInMs" lies
 * closer to the start, and closer to 1 means closer
 * to the end of the interval. If an initial time wasn't set, returns 0.
 * @example <caption>The following code sets an angle of
 * rotation, in degrees, such that an object rotated with the
 * angle does a 360-degree turn in 5 seconds (5000 milliseconds).
 * The variable <code>time</code> is assumed to be a time
 * value in milliseconds, such as the parameter of a
 * <code>requestAnimationFrame()</code> callback method.
 * </caption>
 * var angle = 360 * getTimePosition(timer, time, 5000);
 * @function
 */
export const getTimePosition = function(timer, timeInMs, intervalInMs) {
  if(typeof timer.time === "undefined" || timer.time === null) {
    timer.time = timeInMs;
    timer.lastTime = timeInMs;
    return 0;
  } else {
    if(typeof timer.lastTime === "undefined" || timer.lastTime === null)timer.lastTime = timeInMs;
    return (timeInMs - timer.time) * 1.0 % intervalInMs / intervalInMs;
  }
};
/**
 * Returns the number of frame-length intervals that occurred since
 * the last known time, where a frame's length is 1/60 of a second.
 * This method should be called only once each frame.
 * @param {Object} timer An object described
 * in {@link getTimePosition}.
 * @param {number} timeInMs A time value, in milliseconds.
 * This could be the parameter received in a
 * <code>requestAnimationFrame()</code> callback method.
 * </code>.
 * @returns {number} The number of frame-length intervals relative to
 * the last known time held in the parameter "timer".
 * The number can include fractional frames. If an
 * initial time or last known time wasn't set, returns 0.
 * @function
 */
export const newFrames = function(timer, timeInMs) {
  if(typeof timer.time === "undefined" || timer.time === null) {
    timer.time = timeInMs;
    timer.lastTime = timeInMs;
    return 0;
  } else if(typeof timer.lastTime === "undefined" || timer.lastTime === null) {
    timer.lastTime = timeInMs;
    return 0;
  } else {
    const diff = timeInMs - timer.lastTime;
    timer.lastTime = timeInMs;
    return diff * 60.0 / 1000.0;
  }
};

const ColorValidator = function() {
  throw new Error();
};
(function(constructor) {
  constructor.skipWhite = function(str, index, endIndex) {
    while (index < endIndex) {
      const c = str.charCodeAt(index);
      if (c === 32 || c === 13 || c === 12 || c === 9 || c === 10) {
        ++index;
      } else {
        break;
      }
    }
    return index;
  };

  constructor.parseComma = function(str, index, endIndex) {
    const indexStart = index;
    index = constructor.skipWhite(str, index, endIndex);
    if (index < endIndex && str.charCodeAt(index) === 44) {
      return constructor.skipWhite(str, index + 1, endIndex);
    } else {
      return indexStart;
    }
  };

  constructor.parseEndparen = function(str, index, endIndex) {
    const indexStart = index;
    index = constructor.skipWhite(str, index, endIndex);
    if (index < endIndex && str.charCodeAt(index) === 41) {
      return index + 1;
    } else {
      return indexStart;
    }
  };

  constructor.hsl = function(str, index, endIndex, ret) {
    let indexTemp;
    let tx2;

    const indexStart = index;
    indexTemp = index;
    if ((tx2 = constructor.parseHue(str, index, endIndex, ret, 0)) === index) {
      return indexStart;
    }
    index = tx2;
    if ((tx2 = constructor.sepPct(str, index, endIndex, ret, 1)) === index) {
      return indexStart;
    }
    index = tx2;
    if ((tx2 = constructor.sepPct(str, index, endIndex, ret, 2)) === index) {
      return indexStart;
    }
    index = tx2;
    tx2 = constructor.parseEndparen(str, index, endIndex);
    if (tx2 === index) {
      return indexStart;
    } else {
      index = tx2;
    }
    const rgb = constructor.hlsToRgb(ret[0], ret[2], ret[1]);
    ret[0] = rgb[0];
    ret[1] = rgb[1];
    ret[2] = rgb[2];
    ret[3] = 255.0;
    indexTemp = index;
    return indexTemp;
  };
  constructor.pct = function(str, index, endIndex, ret, retIndex) {
    const tx2 = constructor.parseNumber(str, index, endIndex);
    if (tx2 !== index) {
      if (tx2 >= endIndex || str.charAt(tx2) !== 37)
        return index;
      ret[retIndex] = constructor.stringToPercent(str, index, tx2) * 255.0 / 100.0;
      return tx2 + 1;
    }
    return tx2;
  };
  constructor.parseByte = function(str, index, endIndex, ret, retIndex) {
    const tx2 = constructor.parseInteger(str, index, endIndex, true);
    if (tx2 !== index) {
      ret[retIndex] = constructor.stringToByte(str, index, tx2);
    }
    return tx2;
  };
  constructor.parseHue = function(str, index, endIndex, ret, retIndex) {
    const start = index;
    index = constructor.skipWhite(str, index, endIndex);
    const tx2 = constructor.parseNumber(str, index, endIndex);
    if (tx2 !== index) {
      ret[retIndex] = constructor.stringToHue(str, index, tx2);
      return tx2;
    } else {
      return start;
    }
  };
  constructor.sepByte = function(str, index, endIndex, ret, retIndex) {
    const tx2 = constructor.parseComma(str, index, endIndex);
    return tx2 !== index ? constructor.parseByte(str, tx2, endIndex, ret, retIndex) : tx2;
  };
  constructor.sepPct = function(str, index, endIndex, ret, retIndex) {
    const tx2 = constructor.parseComma(str, index, endIndex);
    return tx2 !== index ? constructor.pct(str, tx2, endIndex, ret, retIndex) : tx2;
  };
  constructor.sepAlpha = function(str, index, endIndex, ret, retIndex) {
    let tx2 = constructor.parseComma(str, index, endIndex);
    if (tx2 !== index) {
      index = tx2;
      tx2 = constructor.parseNumber(str, index, endIndex);
      if (tx2 !== index) {
        ret[retIndex] = constructor.stringToAlpha(str, index, tx2);
      }
    }
    return tx2;
  };

  constructor.hsla = function(str, index, endIndex, ret) {
    let indexTemp;
    let tx2;
    const indexStart = index;
    indexTemp = index;
    if ((tx2 = constructor.parseHue(str, index, endIndex, ret, 0)) === index) {
      return indexStart;
    }
    index = tx2;
    if ((tx2 = constructor.sepPct(str, index, endIndex, ret, 1)) === index) {
      return indexStart;
    }
    index = tx2;
    if ((tx2 = constructor.sepPct(str, index, endIndex, ret, 2)) === index) {
      return indexStart;
    }
    index = tx2;
    if ((tx2 = constructor.sepAlpha(str, index, endIndex, ret, 3)) === index) {
      return indexStart;
    }
    index = tx2;
    const rgb = constructor.hlsToRgb(ret[0], ret[2], ret[1]);
    ret[0] = rgb[0];
    ret[1] = rgb[1];
    ret[2] = rgb[2];
    tx2 = constructor.parseEndparen(str, index, endIndex);
    if (tx2 === index) {
      return indexStart;
    } else {
      index = tx2;
    }
    indexTemp = index;
    return indexTemp;
  };

  constructor.rgba = function(str, index, endIndex, result) {
    const indexStart = index;
    let tx2;
    index = constructor.skipWhite(str, index, endIndex);
    const st = index;
    let continuing = true;
    if ((tx2 = constructor.pct(str, index, endIndex, result, 0)) === index) {
      continuing = false;
    } else {
      index = tx2;
    }
    if (continuing && (tx2 = constructor.sepPct(str, index, endIndex, result, 1)) === index) {
      continuing = false;
    } else {
      index = tx2;
    }
    if (continuing && (tx2 = constructor.sepPct(str, index, endIndex, result, 2)) === index) {
      continuing = false;
    } else {
      index = tx2;
    }
    if (continuing && (tx2 = constructor.sepAlpha(str, index, endIndex, result, 3)) === index) {
      continuing = false;
    } else {
      index = tx2;
    }
    if (!continuing) {
      index = st;
      continuing = true;
      if ((tx2 = constructor.parseByte(str, index, endIndex, result, 0)) === index) {
        continuing = false;
      } else {
        index = tx2;
      }
      if (continuing && (tx2 = constructor.sepByte(str, index, endIndex, result, 1)) === index) {
        continuing = false;
      } else {
        index = tx2;
      }
      if (continuing && (tx2 = constructor.sepByte(str, index, endIndex, result, 2)) === index) {
        continuing = false;
      } else {
        index = tx2;
      }
      if (continuing && (tx2 = constructor.sepAlpha(str, index, endIndex, result, 3)) === index) {
        continuing = false;
      } else {
        index = tx2;
      }
    }
    if (!continuing) {
      return indexStart;
    }
    tx2 = constructor.parseEndparen(str, index, endIndex);
    index = tx2 === index ? indexStart : tx2;
    return index;
  };
  constructor.rgb = function(str, index, endIndex, result) {
    let tx2;
    const indexStart = index;
    index = constructor.skipWhite(str, index, endIndex);
    const st = index;
    let continuing = true;
    if ((tx2 = constructor.pct(str, index, endIndex, result, 0)) === index) {
      continuing = false;
    } else {
      index = tx2;
    }
    if (continuing && (tx2 = constructor.sepPct(str, index, endIndex, result, 1)) === index) {
      continuing = false;
    } else {
      index = tx2;
    }
    if (continuing && (tx2 = constructor.sepPct(str, index, endIndex, result, 2)) === index) {
      continuing = false;
    } else {
      index = tx2;
    }
    if (!continuing) {
      index = st;
      continuing = true;
      if ((tx2 = constructor.parseByte(str, index, endIndex, result, 0)) === index) {
        continuing = false;
      } else {
        index = tx2;
      }
      if (continuing && (tx2 = constructor.sepByte(str, index, endIndex, result, 1)) === index) {
        continuing = false;
      } else {
        index = tx2;
      }
      if (continuing && (tx2 = constructor.sepByte(str, index, endIndex, result, 2)) === index) {
        continuing = false;
      } else {
        index = tx2;
      }
    }
    if (!continuing) {
      return indexStart;
    }
    result[3] = 255.0;
    tx2 = constructor.parseEndparen(str, index, endIndex);
    if (tx2 === index) {
      return indexStart;
    } else {
      return tx2;
    }
  };
  constructor.stringToNumber = function(str, index, endIndex) {
    const str2 = str.substring(index, index + (endIndex - index));
    return parseFloat(str2);
  };
  constructor.stringToPercent = function(str, index, endIndex) {
    const num = constructor.stringToNumber(str, index, endIndex);
    return Number.isNaN(num) ? -1 : num < 0 ? 0 : num > 100 ? 100 : num;
  };
  constructor.stringToAlpha = function(str, index, endIndex) {
    const num = constructor.stringToNumber(str, index, endIndex);
    return num < 0 ? 0 : num > 1.0 ? 255 : num * 255.0;
  };
  constructor.stringToHue = function(str, index, endIndex) {
    const num = constructor.stringToNumber(str, index, endIndex);
    return Number.isNaN(num) || num === Number.POSITIVE_INFINITY || num === Number.NEGATIVE_INFINITY ? 0 : (num % 360 + 360) % 360;
  };
  constructor.stringToByte = function(str, index, endIndex) {
    const num = constructor.stringToNumber(str, index, endIndex);
    return num < 0 ? 0 : num > 255 ? 255 : num;
  };

  constructor.parseInteger = function(str, index, endIndex, posneg) {
    let digits = false;
    const indexStart = index;
    if (posneg && index < endIndex && (str.charCodeAt(index) === 43 || str.charCodeAt(index) === 45)) {
      ++index;
    }
    while (index < endIndex && (str.charCodeAt(index) >= 48 && str.charCodeAt(index) <= 57)) {
      ++index;
      digits = true;
    }
    return digits ? index : indexStart;
  };

  constructor.parseNumber = function(str, index, endIndex) {
    const indexStart = index;
    let tmp = index;
    let tmp2 = 0;
    if ((tmp = constructor.parseInteger(str, index, endIndex, true)) !== indexStart) {
      index = tmp;
      if (index < endIndex && str.charCodeAt(index) === 46) {
        ++index;
        if ((tmp = constructor.parseInteger(str, index, endIndex, false)) !== index) {
          if(index < endIndex && (str.charCodeAt(index) === 0x45 || str.charCodeAt(index) === 0x65) &&
            (tmp2 = constructor.parseInteger(str, index + 1, endIndex, true)) !== index + 1) {
            return tmp2;
          }
          return tmp;
        } else {
          return index - 1;
        }
      }
      return index;
    } else {
      if (index < endIndex && (str.charCodeAt(index) === 43 || str.charCodeAt(index) === 45)) {
        ++index;
      }
      if (index < endIndex && str.charCodeAt(index) === 46) {
        ++index;
        if ((tmp = constructor.parseInteger(str, index, endIndex, false)) !== index) {
          if(index < endIndex && (str.charCodeAt(index) === 0x45 || str.charCodeAt(index) === 0x65) &&
            (tmp2 = constructor.parseInteger(str, index + 1, endIndex, true)) !== index + 1) {
            return tmp2;
          }
          return tmp;
        } else {
          return indexStart;
        }
      }
      return indexStart;
    }
  };

  constructor.hlsToRgb = constructor.HlsToRgb = function(hueval, lum, sat) {
    lum = lum < 0 ? 0 : lum > 255 ? 255 : lum;
    sat = sat < 0 ? 0 : sat > 255 ? 255 : sat;
    if (sat === 0) {
      return [lum, lum, lum];
    }
    let b = 0;
    if (lum <= 127.5) {
      b = lum * (255.0 + sat) / 255.0;
    } else {
      b = lum * sat;
      b /= 255.0;
      b = lum + sat - b;
    }
    const a = lum * 2 - b;
    if (hueval < 0 || hueval >= 360) {
      hueval = (hueval % 360 + 360) % 360;
    }
    let hue = hueval + 120;
    if (hue >= 360) {
      hue -= 360;
    }
    const r = hue < 60 ? a + (b - a) * hue / 60 : hue < 180 ? b : hue < 240 ? a + (b - a) * (240 - hue) / 60 : a;
    hue = hueval;

    const g = hue < 60 ? a + (b - a) * hue / 60 : hue < 180 ? b : hue < 240 ? a + (b - a) * (240 - hue) / 60 : a;
    hue = hueval - 120;
    if (hue < 0) {
      hue += 360;
    }

    const bl = hue < 60 ? a + (b - a) * hue / 60 : hue < 180 ? b : hue < 240 ? a + (b - a) * (240 - hue) / 60 : a;
    return [r < 0 ? 0 : r > 255 ? 255 : r, g < 0 ? 0 : g > 255 ? 255 : g, bl < 0 ? 0 : bl > 255 ? 255 : bl];
  };

  constructor.dehexchar = function(c) {
    if (c >= 48 && c <= 57) {
      return c - 48;
    }
    return c >= 65 && c <= 70 ? c + 10 - 65 : c >= 97 && c <= 102 ? c + 10 - 97 : -1;
  };
  constructor.rgbHex = function(str, hexval, hash) {
    if (typeof str === "undefined" || str === null || str.length === 0) {
      return false;
    }
    let slen = str.length;
    const hexes = [0, 0, 0, 0, 0, 0, 0, 0];
    let index = 0;
    let hexIndex = 0;
    if (str.charAt(0) === "#") {
      --slen;
      ++index;
    } else if (hash) {
      return false;
    }
    if (slen !== 3 && slen !== 4 && slen !== 6 && slen !== 8) {
      return false;
    }
    let i;
    for (i = index; i < str.length; ++i) {
      const hex = constructor.dehexchar(str.charCodeAt(i));
      if (hex < 0) {
        return false;
      }
      hexes[hexIndex++] = hex;
    }
    if (slen === 4) {
      hexval[3] = hexes[3] | hexes[3] << 4;
    } else if (slen === 8) {
      hexval[3] = hexes[7] | hexes[6] << 4;
    } else {
      hexval[3] = 255.0;
    }
    if (slen === 3 || slen === 4) {
      hexval[0] = hexes[0] | hexes[0] << 4;
      hexval[1] = hexes[1] | hexes[1] << 4;
      hexval[2] = hexes[2] | hexes[2] << 4;
    } else if (slen >= 6) {
      hexval[0] = hexes[1] | hexes[0] << 4;
      hexval[1] = hexes[3] | hexes[2] << 4;
      hexval[2] = hexes[5] | hexes[4] << 4;
    }
    return true;
  };
  function trimSpaces(str) {
    let s = 0,
      e = str.length;
    while(s < str.length) {
      if(str.charAt(s) === 0x20 || str.charAt(s) === 0x0a ||
str.charAt(s) === 0x09 || str.charAt(s) === 0x0c || str.charAt(s) === 0x0d)
        s++;
      else break;
    }
    while(e > 0) {
      if(str.charAt(e - 1) === 0x20 || str.charAt(e - 1) === 0x0a ||
str.charAt(e - 1) === 0x09 || str.charAt(e - 1) === 0x0c || str.charAt(e - 1) === 0x0d)
        e--;
      else break;
    }
    return str.substring(s, e);
  }
  constructor.colorToRgba = constructor.colorToRgba = function(x) {
    if (typeof x === "undefined" || x === null || x.length === 0) {
      return null;
    }
    x = trimSpaces(x).toLowerCase();
    if (x === "transparent") {
      return [0, 0, 0, 0];
    }
    if (typeof x === "undefined" || x === null || x.length === 0) {
      return null;
    }
    const ret = [0, 0, 0, 0];
    if (x.charAt(0) === "#") {
      if (constructor.rgbHex(x, ret, true)) {
        return ret;
      }
    }
    if (x.length > 4 && x.substring(0, 4) === "rgb(") {
      return constructor.rgb(x, 4, x.length, ret) === x.length ? ret : null;
    }
    if (x.length > 5 && x.substring(0, 5) === "rgba(") {
      return constructor.rgba(x, 5, x.length, ret) === x.length ? ret : null;
    }
    if (x.length > 4 && x.substring(0, 4) === "hsl(") {
      return constructor.hsl(x, 4, x.length, ret) === x.length ? ret : null;
    }
    if (x.length > 5 && x.substring(0, 5) === "hsla(") {
      return constructor.hsla(x, 5, x.length, ret) === x.length ? ret : null;
    }
    const colors = constructor.colorToRgbaSetUpNamedColors();
    if (typeof colors[x] !== "undefined" && colors[x] !== null) {
      const colorValue = colors[x];
      constructor.rgbHex(colorValue, ret, false);
      return ret;
    }
    return null;
  };

  constructor.namedColorMap = constructor.namedColorMap = null;

  constructor.nc = ["aliceblue", "f0f8ff", "antiquewhite", "faebd7", "aqua", "00ffff", "aquamarine", "7fffd4", "azure", "f0ffff", "beige", "f5f5dc", "bisque", "ffe4c4", "black", "000000", "blanchedalmond", "ffebcd", "blue", "0000ff", "blueviolet", "8a2be2", "brown", "a52a2a", "burlywood", "deb887", "cadetblue", "5f9ea0", "chartreuse", "7fff00", "chocolate", "d2691e", "coral", "ff7f50", "cornflowerblue", "6495ed", "cornsilk", "fff8dc", "crimson", "dc143c", "cyan", "00ffff", "darkblue", "00008b", "darkcyan", "008b8b", "darkgoldenrod", "b8860b", "darkgray", "a9a9a9", "darkgreen", "006400", "darkkhaki", "bdb76b", "darkmagenta", "8b008b", "darkolivegreen", "556b2f", "darkorange", "ff8c00", "darkorchid", "9932cc", "darkred", "8b0000", "darksalmon", "e9967a", "darkseagreen", "8fbc8f", "darkslateblue", "483d8b", "darkslategray", "2f4f4f", "darkturquoise", "00ced1", "darkviolet", "9400d3", "deeppink", "ff1493", "deepskyblue", "00bfff", "dimgray", "696969", "dodgerblue", "1e90ff", "firebrick", "b22222", "floralwhite", "fffaf0", "forestgreen", "228b22", "fuchsia", "ff00ff", "gainsboro", "dcdcdc", "ghostwhite", "f8f8ff", "gold", "ffd700", "goldenrod", "daa520", "gray", "808080", "green", "008000", "greenyellow", "adff2f", "honeydew", "f0fff0", "hotpink", "ff69b4", "indianred", "cd5c5c", "indigo", "4b0082", "ivory", "fffff0", "khaki", "f0e68c", "lavender", "e6e6fa", "lavenderblush", "fff0f5", "lawngreen", "7cfc00", "lemonchiffon", "fffacd", "lightblue", "add8e6", "lightcoral", "f08080", "lightcyan", "e0ffff", "lightgoldenrodyellow", "fafad2", "lightgray", "d3d3d3", "lightgreen", "90ee90", "lightpink", "ffb6c1", "lightsalmon", "ffa07a", "lightseagreen", "20b2aa", "lightskyblue", "87cefa", "lightslategray", "778899", "lightsteelblue", "b0c4de", "lightyellow", "ffffe0", "lime", "00ff00", "limegreen", "32cd32", "linen", "faf0e6", "magenta", "ff00ff", "maroon", "800000", "mediumaquamarine", "66cdaa", "mediumblue", "0000cd", "mediumorchid", "ba55d3", "mediumpurple", "9370d8", "mediumseagreen", "3cb371", "mediumslateblue", "7b68ee", "mediumspringgreen", "00fa9a", "mediumturquoise", "48d1cc", "mediumvioletred", "c71585", "midnightblue", "191970", "mintcream", "f5fffa", "mistyrose", "ffe4e1", "moccasin", "ffe4b5", "navajowhite", "ffdead", "navy", "000080", "oldlace", "fdf5e6", "olive", "808000", "olivedrab", "6b8e23", "orange", "ffa500", "orangered", "ff4500", "orchid", "da70d6", "palegoldenrod", "eee8aa", "palegreen", "98fb98", "paleturquoise", "afeeee", "palevioletred", "d87093", "papayawhip", "ffefd5", "peachpuff", "ffdab9", "peru", "cd853f", "pink", "ffc0cb", "plum", "dda0dd", "powderblue", "b0e0e6", "purple", "800080", "rebeccapurple", "663399", "red", "ff0000", "rosybrown", "bc8f8f", "royalblue", "4169e1", "saddlebrown", "8b4513", "salmon", "fa8072", "sandybrown", "f4a460", "seagreen", "2e8b57", "seashell", "fff5ee", "sienna", "a0522d", "silver", "c0c0c0", "skyblue", "87ceeb", "slateblue", "6a5acd", "slategray", "708090", "snow", "fffafa", "springgreen", "00ff7f", "steelblue", "4682b4", "tan", "d2b48c", "teal", "008080", "thistle", "d8bfd8", "tomato", "ff6347", "turquoise", "40e0d0", "violet", "ee82ee", "wheat", "f5deb3", "white", "ffffff", "whitesmoke", "f5f5f5", "yellow", "ffff00", "yellowgreen", "9acd32"];

  constructor.colorToRgbaSetUpNamedColors = function() {
    if (typeof constructor.namedColorMap === "undefined" || constructor.namedColorMap === null) {
      const ncm = {};
      let i;
      for (i = 0; i < constructor.nc.length; i += 2) {
        ncm[constructor.nc[i]] = constructor.nc[i + 1];
      }
      const altnames = ["grey", "gray", "darkgrey", "darkgray",
        "darkslategrey", "darkslategray", "dimgrey", "dimgray",
        "lightgrey", "lightgray",
        "lightslategrey", "lightslategray",
        "slategrey", "slategray"];

      for (i = 0; i < altnames.length; i += 2) {
        ncm[altnames[i]] = ncm[altnames[i + 1]];
      }
      constructor.namedColorMap = ncm;
    }
    return constructor.namedColorMap;
  };
}(ColorValidator));

const clampRgba = function(x) {
  x[0] = x[0] < 0 ? 0 : Math.min(x[0], 1);
  x[1] = x[1] < 0 ? 0 : Math.min(x[1], 1);
  x[2] = x[2] < 0 ? 0 : Math.min(x[2], 1);
  x[3] = x[3] < 0 ? 0 : Math.min(x[3], 1);
  return x;
};
/**
 * Creates a 4-element array representing a color. Each element
 * can range from 0 to 1 and specifies the red, green, blue or alpha
 * component, respectively.
 * This method also converts HTML and CSS colors to 4-element RGB
 * colors. The following lists the kinds of colors accepted:
 * <ul>
 * <li>HTML colors with the syntax <code>#RRGGBB</code> or <code>#RRGGBBAA</code>, where
 * RR is the hexadecimal form of the red component (00-FF), GG
 * is the hexadecimal green component, BB is the hexadecimal
 * blue component, and AA is the hexadecimal alpha component. Example: #88DFE0.
 * <li>HTML colors with the syntax <code>#RGB</code> or <code>#RGBA</code>, where
 * R is the hexadecimal form of the red component (0-F), G
 * is the hexadecimal green component, B is the hexadecimal
 * blue component, and A is the hexadecimal alpha component. Example: #8DE.
 * <li>CSS colors with the syntax <code>rgb(red, green, blue)</code> or
 * <code>rgba(red, green, blue, alpha)</code> where
 * <code>red</code>, <code>green</code>, and <code>blue</code>
 * are the red, green, and blue components, respectively, either as a
 * number (0-255) or as a percent, and <code>alpha</code> is
 * a number from 0-1 specifying the alpha component.
 * Examples: <code>rgb(255,0,0)</code>,
 * <code>rgb(100%,50%,0%)</code>, <code>rgba(20,255,255,0.5)</code>.
 * <li>CSS colors with the syntax <code>hsl(hue, sat, light)</code> or
 * <code>hsla(hue, sat, light, alpha)</code> where
 * <code>hue</code> is the hue component in degrees (0-360),
 * <code>sat</code> and <code>light</code>
 * are the saturation and lightness components, respectively, as percents,
 * and <code>alpha</code> is
 * a number from 0-1 specifying the alpha component.
 * Examples: <code>rgb(255,0,0)</code>,
 * <code>hsl(200,50%,50%)</code>, <code>hsla(20,80%,90%,0.5)</code>.
 * <li>CSS colors such as <code>red</code>, <code>green</code>,
 * <code>white</code>, <code>lemonchiffon</code>, <code>chocolate</code>,
 * and so on, including the newly added <code>rebeccapurple</code>.
 * <li>The value <code>transparent</code>, meaning transparent black.
 * </ul>
 * For more information, see the "{@tutorial colors}" tutorial.
 * @param {Array<number>|number|string} r One of the following:<ul>
 * <li>A <b>color vector or string</b>, which can be one of these:<ul>
 * <li>An array of three color components, each of which ranges from 0 to 1.
 * The three components are red, green, and blue in that order.</li>
 * <li>An array of four color components, each of which ranges from 0 to 1.
 * The three components are red, green, blue, and alpha in that order.</li>
 * <li>A string specifying an HTML or CSS color, in one of the formats mentioned
 * above in the method description.</li></ul></li>
 * <li>A number specifying the red component. Must range from 0 to 1.</li>
 * </ul>
 * Returns (0,0,0,0) if this value is null.
 * @param {number} [g] Green color component (0-1).
 * May be null or omitted if a string or array is given as the "r" parameter.
 * @param {number} [b] Blue color component (0-1).
 * May be null or omitted if a string or array is given as the "r" parameter.
 * @param {number} [a] Alpha color component (0-1).
 * If the "r" parameter is given and this parameter is null, undefined, or omitted,
 * this value is treated as 1.0.
 * @returns {Array<number>} The color as a 4-element array; if the color is
 * invalid, returns [0,0,0,0], or transparent black. Numbers less
 * than 0 are clamped to 0, and numbers greater than 1 are
 * clamped to 1.
 * @function
 */
export const toGLColor = function(r, g, b, a) {
  if(typeof r === "undefined" || r === null)return [0, 0, 0, 0];
  if(typeof r === "string") {
    const rgba = ColorValidator.colorToRgba(r) || [0, 0, 0, 0];
    const mul = 1.0 / 255;
    rgba[0] *= mul;
    rgba[1] *= mul;
    rgba[2] *= mul;
    rgba[3] *= mul;
    return clampRgba(rgba);
  }
  if(typeof r === "number" &&
     typeof g === "number" && typeof b === "number") {
    return [r, g, b, typeof a !== "number" ? 1.0 : a];
  } else if(r.constructor === Array) {
    return clampRgba([r[0] || 0, r[1] || 0, r[2] || 0,
      typeof r[3] !== "number" ? 1.0 : r[3]]);
  } else {
    return clampRgba(r || [0, 0, 0, 0]);
  }
};

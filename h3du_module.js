/*
 Any copyright to this file is released to the Public Domain.
 http://creativecommons.org/publicdomain/zero/1.0/
 If you like this, you should donate
 to Peter O. (original author of
 the Public Domain HTML 3D Library) at:
 http://peteroupc.github.io/
*/

/* eslint no-extend-native: "off", callback-return: "off" */
// Notes by Peter O.:
// 2016-12-14: This is a polyfill for Promises, and it's only used
// when the environment doesn't support promises
// already, so the no-extend-native rule is disabled for this file.
// The callback-return rule is also disabled here in order
// to communicate the callback's return value properly.
// 2015-03-09: This file was taken
// from https://github.com/ondras/promise/.
if (typeof window !== "undefined" && window !== null && !(typeof window.Promise !== "undefined" && window.Promise !== null)) {
 /**
  * A promise holds a value to be resolved in the future.<p>
  * This class is a "polyfill" for the standard <code>Promise</code>
  * class; it is only used when the running JavaScript environment
  * doesn't support or include a <code>Promise</code> class
  * on its own.
  * @constructor
  * @alias Promise
  * @param {Function} [resolver] Function that takes
  * two arguments: the first is a function to call when
  * resolving the promise, and the second is a function
  * to call when rejecting the promise.
  */
  var Promise$1 = function(resolver) {
    this._state = 0; /* 0 = pending, 1 = fulfilled, 2 = rejected */
    this._value = null; /* fulfillment / rejection value */
    this._timeout = null;

    this._cb = {
      "fulfilled": [],
      "rejected": []
    };

    this._thenPromises = []; /* promises returned by then() */

    if (resolver) {
      this._invokeResolver(resolver);
    }
  };

  /**
   * Returns a promise that resolves.
   * @param {Object} value The value associated with the promise.
   * @returns {Promise} A promise that resolves and takes the given value
   * as its argument.
   * @method
   */
  Promise$1.resolve = function(value) {
    return new this(function(resolve) {
      resolve(value);
    });
  };

  /**
   * Returns a promise that is rejected.
   * @param {Object} reason The value associated with the promise.
   * @returns {Promise} A promise that is rejected and takes the given value
   * as its argument.
   * @method
   */
  Promise$1.reject = function(reason) {
    return new this(function(resolve, reject) {
      reject(reason);
    });
  };

  /**
   * Wait for all these promises to complete. One failed => this fails too.
   * @param {Array<Promise>} all An array of promises.
   * @returns {Promise} A promise that is resolved when all promises have resolved.
   * @method
   */
  Promise$1.all = Promise$1.when = function(all) {
    return new this(function(resolve, reject) {
      var counter = 0;
      var results = [];

      all.forEach(function(promise, index) {
        counter++;
        promise.then(function(result) {
          results[index] = result;
          counter--;
          if (!counter) {
            resolve(results);
          }
        }, function(reason) {
          counter = 1 / 0;
          reject(reason);
        });
      });
    });
  };
/**
 * Creates a promise that resolves or is rejected when one of those promises
 * resolves or is rejected.
 * @param {Array<Promise>} all An array of promises.
 * @returns {Promise} A promise that resolves or is rejected according to
 * the first promise that resolves or is rejected. It will receive the
 * value associated with that promise.
 * @method
 */
  Promise$1.race = function(all) {
    return new this(function(resolve, reject) {
      all.forEach(function(promise) {
        promise.then(resolve, reject);
      });
    });
  };

  /**
   * Creates a promise that calls a function depending on whether
   * this promise resolves or is rejected.
   * @suppress {checkTypes}
   * @param {Function} onFulfilled To be called once this promise gets fulfilled
   * @param {Function} [onRejected] To be called once this promise gets rejected
   * @returns {Promise} A promise.
   * @memberof Promise#
   */
  Promise$1.prototype.then = function(onFulfilled, onRejected) {
    this._cb.fulfilled.push(onFulfilled);
    this._cb.rejected.push(onRejected);

    var thenPromise = new Promise$1(null);

    this._thenPromises.push(thenPromise);

    if (this._state > 0) {
      this._schedule();
    }

    /* 2.2.7. then must return a promise. */
    return thenPromise;
  };
  /** @ignore */
  Promise$1.prototype.fulfill = function(value) {
    if (this._state !== 0) {
      return this;
    }

    this._state = 1;
    this._value = value;

    if (this._thenPromises.length) {
      this._schedule();
    }

    return this;
  };
  /** @ignore */
  Promise$1.prototype.reject = function(value) {
    if (this._state !== 0) {
      return this;
    }

    this._state = 2;
    this._value = value;

    if (this._thenPromises.length) {
      this._schedule();
    }

    return this;
  };
  /** @ignore */
  Promise$1.prototype.resolve = function(x) {
    /* 2.3.1. If promise and x refer to the same object, reject promise with a TypeError as the reason. */
    if (x === this) {
      this.reject(new TypeError("Promise resolved by its own instance"));
      return;
    }

    /* 2.3.2. If x is a promise, adopt its state */
    if (x instanceof this.constructor) {
      x.chain(this);
      return;
    }
    var then;
    /* 2.3.3. Otherwise, if x is an object or function, */
    if (typeof x !== "undefined" && x !== null && (typeof x === "object" || typeof x === "function")) {
      try {
        then = x.then;
      } catch (e) {
        /* 2.3.3.2. If retrieving the property x.then results in a thrown exception e, reject promise with e as the reason. */
        this.reject(e);
        return;
      }

      if (typeof then === "function") {
        /* 2.3.3.3. If then is a function, call it */
        var called = false;
        var resolvePromise = function(y) {
          /* 2.3.3.3.1. If/when resolvePromise is called with a value y, run [[Resolve]](promise, y). */
          if (called) {
            return;
          }
          called = true;
          this.resolve(y);
        };
        var rejectPromise = function(r) {
          /* 2.3.3.3.2. If/when rejectPromise is called with a reason r, reject promise with r. */
          if (called) {
            return;
          }
          called = true;
          this.reject(r);
        };

        try {
          then.call(x, resolvePromise.bind(this), rejectPromise.bind(this));
        } catch (e) { /* 2.3.3.3.4. If calling then throws an exception e, */
          /* 2.3.3.3.4.1. If resolvePromise or rejectPromise have been called, ignore it. */
          if (called) {
            return;
          }
          /* 2.3.3.3.4.2. Otherwise, reject promise with e as the reason. */
          this.reject(e);
        }
      } else {
        /* 2.3.3.4 If then is not a function, fulfill promise with x. */
        this.fulfill(x);
      }
      return;
    }

    /* 2.3.4. If x is not an object or function, fulfill promise with x. */
    this.fulfill(x);
  };
  /** @ignore */
  Promise$1.prototype.chain = function(promise) {
    var resolve = function(value) {
      promise.resolve(value);
    };
    var reject = function(value) {
      promise.reject(value);
    };
    return this.then(resolve, reject);
  };

  /**
   * Creates a promise that calls a function if
   * this promise is rejected.
   * @param {Function} onRejected To be called once this promise gets rejected
   * @returns {Promise} A promise.
   * @memberof Promise#
   */
  Promise$1.prototype.catch = function(onRejected) {
    return this.then(null, onRejected);
  };
/** @ignore */
  Promise$1.prototype._schedule = function() {
    if (this._timeout) {
      return;
    } /* resolution already scheduled */
    this._timeout = setTimeout(this._processQueue.bind(this), 0);
  };
/** @ignore */
  Promise$1.prototype._processQueue = function() {
    this._timeout = null;

    while (this._thenPromises.length) {
      var onFulfilled = this._cb.fulfilled.shift();
      var onRejected = this._cb.rejected.shift();
      this._executeCallback(this._state === 1 ? onFulfilled : onRejected);
    }
  };
/** @ignore */
  Promise$1.prototype._executeCallback = function(cb) {
    var thenPromise = this._thenPromises.shift();

    if (typeof cb !== "function") {
      if (this._state === 1) {
        /* 2.2.7.3. If onFulfilled is not a function and promise1 is fulfilled, promise2 must be fulfilled with the same value. */
        thenPromise.fulfill(this._value);
      } else {
        /* 2.2.7.4. If onRejected is not a function and promise1 is rejected, promise2 must be rejected with the same reason. */
        thenPromise.reject(this._value);
      }
      return;
    }

    try {
      var x = cb(this._value);
      /* 2.2.7.1. If either onFulfilled or onRejected returns a value x, run the Promise Resolution Procedure [[Resolve]](promise2, x). */
      thenPromise.resolve(x);
      return x;
    } catch (e) {
      /* 2.2.7.2. If either onFulfilled or onRejected throws an exception, promise2 must be rejected with the thrown exception as the reason. */
      thenPromise.reject(e);
    }
  };
/** @ignore */
  Promise$1.prototype._invokeResolver = function(resolver) {
    try {
      resolver(this.resolve.bind(this), this.reject.bind(this));
    } catch (e) {
      this.reject(e);
    }
  };
  if(typeof window !== "undefined" && window !== null) {
    /** @suppress {checkTypes}
     * @ignore */function promfunc() {
      window.Promise = Promise$1;
    }
    promfunc();
  }
}/*
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
const getPromiseResults = function(promises,
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
const getPromiseResultsAll = function(promises,
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
const getTimePosition = function(timer, timeInMs, intervalInMs) {
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
const newFrames = function(timer, timeInMs) {
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
const toGLColor = function(r, g, b, a) {
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
};/* global yupFalse */
/*
 Any copyright to this file is released to the Public Domain.
 http://creativecommons.org/publicdomain/zero/1.0/
 If you like this, you should donate
 to Peter O. (original author of
 the Public Domain HTML 3D Library) at:
 http://peteroupc.github.io/
*/

/**
 * A collection of math functions for working
 * with vectors, matrices, quaternions, and other
 * mathematical objects.<p>
 * See the tutorial "{@tutorial glmath}" for more information.
 * @class
 */
const MathUtil = {
/** @ignore */
  "_frustumPoints":function(frustum) {
    const p0 = frustum[0];
    const p1 = frustum[1];
    const p2 = frustum[2];
    const p3 = frustum[3];
    const p4 = frustum[4];
    const p5 = frustum[5];
    // left-top-near, left-bottom-near, right-top-near, ..., right-bottom-far
    const ret = [];
    const t1 = p2[1] * p4[2];
    const t2 = p2[2] * p4[1];
    const t3 = t1 - t2;
    const t4 = p2[2] * p4[0];
    const t5 = p2[0] * p4[2];
    const t6 = t4 - t5;
    const t7 = p2[0] * p4[1];
    const t8 = p2[1] * p4[0];
    const t9 = t7 - t8;
    const t10 = p0[2] * p2[0];
    const t11 = p0[0] * p2[2];
    const t12 = p0[0] * p2[1];
    const t13 = p0[1] * p2[0];
    const t14 = p4[2] * p0[0];
    const t15 = p4[0] * p0[2];
    const t16 = p4[0] * p0[1];
    const t17 = p4[1] * p0[0];
    const t18 = 1.0 / (p0[0] * t3 + p0[1] * t6 + p0[2] * t9);
    const t19 = p4[1] * p0[2];
    const t20 = p4[2] * p0[1];
    const t21 = p0[1] * p2[2];
    const t22 = p0[2] * p2[1];
    const t23 = -p0[3];
    const t24 = -p2[3];
    const t25 = -p4[3];
    ret[0] = (t3 * t23 + (t19 - t20) * t24 + (t21 - t22) * t25) * t18;
    ret[1] = (t6 * t23 + (t14 - t15) * t24 + (t10 - t11) * t25) * t18;
    ret[2] = (t9 * t23 + (t16 - t17) * t24 + (t12 - t13) * t25) * t18;
    const t26 = p3[1] * p4[2];
    const t27 = p3[2] * p4[1];
    const t28 = t26 - t27;
    const t29 = p3[2] * p4[0];
    const t30 = p3[0] * p4[2];
    const t31 = t29 - t30;
    const t32 = p3[0] * p4[1];
    const t33 = p3[1] * p4[0];
    const t34 = t32 - t33;
    const t35 = p0[2] * p3[0];
    const t36 = p0[0] * p3[2];
    const t37 = p0[0] * p3[1];
    const t38 = p0[1] * p3[0];
    const t39 = 1.0 / (p0[0] * t28 + p0[1] * t31 + p0[2] * t34);
    const t40 = p0[1] * p3[2];
    const t41 = p0[2] * p3[1];
    const t42 = -p3[3];
    ret[3] = (t28 * t23 + (t19 - t20) * t42 + (t40 - t41) * t25) * t39;
    ret[4] = (t31 * t23 + (t14 - t15) * t42 + (t35 - t36) * t25) * t39;
    ret[5] = (t34 * t23 + (t16 - t17) * t42 + (t37 - t38) * t25) * t39;
    const t43 = t1 - t2;
    const t44 = t4 - t5;
    const t45 = t7 - t8;
    const t46 = p1[2] * p2[0];
    const t47 = p1[0] * p2[2];
    const t48 = p1[0] * p2[1];
    const t49 = p1[1] * p2[0];
    const t50 = p4[2] * p1[0];
    const t51 = p4[0] * p1[2];
    const t52 = p4[0] * p1[1];
    const t53 = p4[1] * p1[0];
    const t54 = 1.0 / (p1[0] * t43 + p1[1] * t44 + p1[2] * t45);
    const t55 = p4[1] * p1[2];
    const t56 = p4[2] * p1[1];
    const t57 = p1[1] * p2[2];
    const t58 = p1[2] * p2[1];
    const t59 = -p1[3];
    ret[6] = (t43 * t59 + (t55 - t56) * t24 + (t57 - t58) * t25) * t54;
    ret[7] = (t44 * t59 + (t50 - t51) * t24 + (t46 - t47) * t25) * t54;
    ret[8] = (t45 * t59 + (t52 - t53) * t24 + (t48 - t49) * t25) * t54;
    const t60 = t26 - t27;
    const t61 = t29 - t30;
    const t62 = t32 - t33;
    const t63 = p1[2] * p3[0];
    const t64 = p1[0] * p3[2];
    const t65 = p1[0] * p3[1];
    const t66 = p1[1] * p3[0];
    const t67 = 1.0 / (p1[0] * t60 + p1[1] * t61 + p1[2] * t62);
    const t68 = p1[1] * p3[2];
    const t69 = p1[2] * p3[1];
    ret[9] = (t60 * t59 + (t55 - t56) * t42 + (t68 - t69) * t25) * t67;
    ret[10] = (t61 * t59 + (t50 - t51) * t42 + (t63 - t64) * t25) * t67;
    ret[11] = (t62 * t59 + (t52 - t53) * t42 + (t65 - t66) * t25) * t67;
    const t70 = p2[1] * p5[2];
    const t71 = p2[2] * p5[1];
    const t72 = t70 - t71;
    const t73 = p2[2] * p5[0];
    const t74 = p2[0] * p5[2];
    const t75 = t73 - t74;
    const t76 = p2[0] * p5[1];
    const t77 = p2[1] * p5[0];
    const t78 = t76 - t77;
    const t79 = p5[2] * p0[0];
    const t80 = p5[0] * p0[2];
    const t81 = p5[0] * p0[1];
    const t82 = p5[1] * p0[0];
    const t83 = 1.0 / (p0[0] * t72 + p0[1] * t75 + p0[2] * t78);
    const t84 = p5[1] * p0[2];
    const t85 = p5[2] * p0[1];
    const t86 = -p5[3];
    ret[12] = (t72 * t23 + (t84 - t85) * t24 + (t21 - t22) * t86) * t83;
    ret[13] = (t75 * t23 + (t79 - t80) * t24 + (t10 - t11) * t86) * t83;
    ret[14] = (t78 * t23 + (t81 - t82) * t24 + (t12 - t13) * t86) * t83;
    const t87 = p3[1] * p5[2];
    const t88 = p3[2] * p5[1];
    const t89 = t87 - t88;
    const t90 = p3[2] * p5[0];
    const t91 = p3[0] * p5[2];
    const t92 = t90 - t91;
    const t93 = p3[0] * p5[1];
    const t94 = p3[1] * p5[0];
    const t95 = t93 - t94;
    const t96 = 1.0 / (p0[0] * t89 + p0[1] * t92 + p0[2] * t95);
    ret[15] = (t89 * t23 + (t84 - t85) * t42 + (t40 - t41) * t86) * t96;
    ret[16] = (t92 * t23 + (t79 - t80) * t42 + (t35 - t36) * t86) * t96;
    ret[17] = (t95 * t23 + (t81 - t82) * t42 + (t37 - t38) * t86) * t96;
    const t97 = t70 - t71;
    const t98 = t73 - t74;
    const t99 = t76 - t77;
    const t100 = p5[2] * p1[0];
    const t101 = p5[0] * p1[2];
    const t102 = p5[0] * p1[1];
    const t103 = p5[1] * p1[0];
    const t104 = 1.0 / (p1[0] * t97 + p1[1] * t98 + p1[2] * t99);
    const t105 = p5[1] * p1[2];
    const t106 = p5[2] * p1[1];
    ret[18] = (t97 * t59 + (t105 - t106) * t24 + (t57 - t58) * t86) * t104;
    ret[19] = (t98 * t59 + (t100 - t101) * t24 + (t46 - t47) * t86) * t104;
    ret[20] = (t99 * t59 + (t102 - t103) * t24 + (t48 - t49) * t86) * t104;
    const t107 = t87 - t88;
    const t108 = t90 - t91;
    const t109 = t93 - t94;
    const t110 = 1.0 / (p1[0] * t107 + p1[1] * t108 + p1[2] * t109);
    ret[21] = (t107 * t59 + (t105 - t106) * t42 + (t68 - t69) * t86) * t110;
    ret[22] = (t108 * t59 + (t100 - t101) * t42 + (t63 - t64) * t86) * t110;
    ret[23] = (t109 * t59 + (t102 - t103) * t42 + (t65 - t66) * t86) * t110;
    return ret;
  },
  /**
   * Finds the center of a 3D bounding box.
   * @param {Array<number>} box An axis-aligned bounding
   * box, which is an array of six values.
   * The first three values are the smallest X, Y, and Z coordinates,
   * and the last three values are the largest X, Y, and Z
   * coordinates.
   * @returns {Array<number>} A 3-element array containing the
   * X, Y, and Z coordinates, respectively, of the bounding box's
   * center.
   */
  "boxCenter":function(box) {
    return [box[0] + (box[3] - box[0]) * 0.5,
      box[1] + (box[4] - box[1]) * 0.5,
      box[2] + (box[5] - box[2]) * 0.5];
  },
  /**
   * Finds the dimensions of a 3D bounding box. This is done by subtracting
   * the first three values of the given array with its last three values.
   * @param {Array<number>} box An axis-aligned bounding
   * box, which is an array of six values.
   * The first three values are the smallest X, Y, and Z coordinates,
   * and the last three values are the largest X, Y, and Z
   * coordinates.
   * @returns {Array<number>} A 3-element array containing the
   * width, height, and depth of the bounding box, respectively. If
   * at least one of the minimum coordinates is greater than its
   * corresponding maximum coordinate, the array can contain
   * negative values.
   */
  "boxDimensions":function(box) {
    return [box[3] - box[0], box[4] - box[1], box[5] - box[2]];
  },
  /**
   * Determines whether a 3D bounding box is empty.
   * This is determined if the minimum coordinate
   * is larger than the corresponding maximum coordinate.
   * @param {Array<number>} box An axis-aligned bounding
   * box, which is an array of six values.
   * The first three values are the smallest X, Y, and Z coordinates,
   * and the last three values are the largest X, Y, and Z
   * coordinates.
   * @returns {boolean} <code>true</code> if at least one
   * of the minimum coordinates is greater than its
   * corresponding maximum coordinate; otherwise, <code>false</code>.
   */
  "boxIsEmpty":function(box) {
    return box[0] > box[3] || box[1] > box[4] || box[2] > box[5];
  },
  /**
   * Converts a color from encoded sRGB to linear sRGB using the sRGB transfer function, and returns
   * a new vector with the result.<p>Linear RGB is linear because of its linear relationship of light emitted
   * by a surface of the given color.
   * @param {Array<number>} srgb A three- or four-element vector giving
   * the red, green, and blue components, in that order, of an sRGB color. The alpha component
   * is either the fourth element in the case of a four-element vector, or 1.0
   * in the case of a three-element vector. Each element in the vector ranges from 0 through 1.
   * @returns {Array<number>} A three-element vector giving
   * the red, green, and blue components, in that order, of the given color
   * in linear sRGB. The alpha component will be as specified
   * in the "srgb" parameter.
   */
  "colorToLinear":function(srgb) {
    return [
      srgb[0] <= 0.04045 ? srgb[0] / 12.92 : Math.pow((0.055 + srgb[0]) / 1.055, 2.4),
      srgb[1] <= 0.04045 ? srgb[1] / 12.92 : Math.pow((0.055 + srgb[1]) / 1.055, 2.4),
      srgb[2] <= 0.04045 ? srgb[2] / 12.92 : Math.pow((0.055 + srgb[2]) / 1.055, 2.4),
      srgb.length <= 3 ? 1.0 : srgb[3]];
  },
  /**
   * Converts a color from linear sRGB to encoded sRGB using the sRGB transfer function, and returns
   * a new vector with the result.<p>Linear RGB is linear because of its linear relationship of light emitted
   * by a surface of the given color.
   * @param {Array<number>} lin A three- or four-element vector giving
   * the red, green, and blue components, in that order, of a linear RGB color. The alpha component
   * is either the fourth element in the case of a four-element vector, or 1.0
   * in the case of a three-element vector. Each element in the vector ranges from 0 through 1.
   * @returns {Array<number>} lin A four-element vector giving
   * the red, green, blue, and alpha components, in that order, of the given color
   * in encoded sRGB. The alpha component will be as specified
   * in the "lin" parameter.
   */
  "colorTosRGB":function(lin) {
    return [
      lin[0] <= 0.0031308 ? 12.92 * lin[0] : Math.pow(lin[0], 1.0 / 2.4) * 1.055 - 0.055,
      lin[1] <= 0.0031308 ? 12.92 * lin[1] : Math.pow(lin[1], 1.0 / 2.4) * 1.055 - 0.055,
      lin[2] <= 0.0031308 ? 12.92 * lin[2] : Math.pow(lin[2], 1.0 / 2.4) * 1.055 - 0.055,
      lin.length <= 3 ? 1.0 : lin[3]];
  },
  /**
   * Determines whether an axis-aligned bounding box
   * is at least partially inside a view frustum.
   * @param {Array<Array<number>>} frustum An array of six
   * 4-element arrays representing the six clipping planes of the
   * view frustum. In order, they are the left, right, top,
   * bottom, near, and far clipping planes.
   * @param {Array<number>} box An axis-aligned bounding
   * box in world space, which is an array of six values.
   * The first three values are the smallest X, Y, and Z coordinates,
   * and the last three values are the largest X, Y, and Z
   * coordinates.
   * @returns {boolean} <code>true</code> if the box
   * may be partially or totally
   * inside the frustum; <code>false</code> if the box is
   * definitely outside the frustum, or if the box is empty
   * (see "boxIsEmpty").
   */
  "frustumHasBox":function(frustum, box) {
    if(MathUtil.boxIsEmpty(box)) {
      return false;
    }
    let i;
    for (i = 0; i < 6; i++) {
      const plane = frustum[i];
      const p3 = plane[3];
      const p0b0 = plane[0] * box[0];
      const p2b2 = plane[2] * box[2];
      const p1b1 = plane[1] * box[1];
      if( p0b0 + p1b1 + p2b2 + p3 <= 0.0 &&
      plane[0] * box[3] + plane[1] * box[4] + plane[2] * box[5] + p3 <= 0.0 &&
      p0b0 + plane[1] * box[4] + p2b2 + p3 <= 0.0 &&
      p0b0 + plane[1] * box[4] + plane[2] * box[5] + p3 <= 0.0 &&
      p0b0 + p1b1 + plane[2] * box[5] + p3 <= 0.0 &&
      plane[0] * box[3] + plane[1] * box[4] + p2b2 + p3 <= 0.0 &&
      plane[0] * box[3] + p1b1 + p2b2 + p3 <= 0.0 &&
      plane[0] * box[3] + p1b1 + plane[2] * box[5] + p3 <= 0.0) {
        return false;
      }
    }
    // To increase robustness in frustum culling; see
    // <http://www.iquilezles.org/www/articles/frustumcorrect/frustumcorrect.htm>
    const pts = MathUtil._frustumPoints(frustum);

    for (i = 0; i < 3; i++) {
      const minval = box[i];
      if(pts[i] < minval && pts[3 + i] < minval && pts[6 + i] < minval &&
      pts[9 + i] < minval && pts[12 + i] < minval && pts[15 + i] < minval &&
    pts[18 + i] < minval && pts[21 + i] < minval) {
        return false;
      }
      const maxval = box[i + 3];
      if(pts[i] > maxval && pts[3 + i] > maxval && pts[6 + i] > maxval &&
      pts[9 + i] > maxval && pts[12 + i] > maxval && pts[15 + i] > maxval &&
    pts[18 + i] > maxval && pts[21 + i] > maxval) {
        return false;
      }
    }
    return true;
  },
  /**
   * Determines whether a point is
   * outside or inside a view frustum.
   * @param {Array<Array<number>>} frustum An array of six
   * 4-element arrays representing the six clipping planes of the
   * view frustum. In order, they are the left, right, top,
   * bottom, near, and far clipping planes.
   * @param {number} x X coordinate of a point
   * in world space.
   * @param {number} y Y coordinate of a point
   * in world space.
   * @param {number} z Z coordinate of a point
   * in world space.
   * @returns {boolean} true if the point is inside;
   * otherwise false;
   */
  "frustumHasPoint":function(frustum, x, y, z) {
    let i;
    for (i = 0; i < 6; i++) {
      const d = frustum[i][0] * x + frustum[i][1] * y +
     frustum[i][2] * z + frustum[i][3];
      if(d <= 0)return false;
    }
    return true;
  },
  /**
   * Determines whether a sphere is at least
   * partially inside a view frustum.
   * @param {Array<Array<number>>} frustum An array of six
   * 4-element arrays representing the six clipping planes of the
   * view frustum. In order, they are the left, right, top,
   * bottom, near, and far clipping planes.
   * @param {number} x X coordinate of the sphere's center
   * in world space.
   * @param {number} y Y coordinate of the sphere's center
   * in world space.
   * @param {number} z Z coordinate of the sphere's center
   * in world space.
   * @param {number} radius Radius of the sphere
   * in world-space units.
   * @returns {boolean} <code>true</code> if the sphere
   * is partially or totally
   * inside the frustum; <code>false</code> otherwise.
   */
  "frustumHasSphere":function(frustum, x, y, z, radius) {
    if(radius < 0)throw new Error("radius is negative");
    let i;
    for (i = 0; i < 6; i++) {
      const plane = frustum[i];
      const dot = plane[3] + plane[0] * x +
     plane[1] * y + plane[2] * z;
      if(dot < -radius)return false;
    }
    return true;
  },
  /**
   * Returns a copy of a 3x3 matrix.
   * @param {Array<number>} mat A 3x3atrix.
   * @returns {Array<number>} Return value. */
  "mat3copy":function(mat) {
    return [mat[0], mat[1], mat[2], mat[3],
      mat[4], mat[5], mat[6], mat[7],
      mat[8]];
  },
  /**
   * Returns the identity 3x3 matrix (a matrix that keeps
   * vectors unchanged when they are transformed with this matrix).
   * @returns {Array<number>} Return value. */
  "mat3identity":function() {
    return [1, 0, 0, 0, 1, 0, 0, 0, 1];
  },

  /**
   * Finds the inverse of a 3x3 matrix, describing a transformation that undoes the given transformation.
   * @param {Array<number>} m A 3x3 matrix.
   * @returns {Array<number>} The resulting 3x3 matrix.
   * Returns the identity matrix if this matrix's determinant, or overall scaling factor, is 0 or extremely close to 0.
   */
  "mat3invert":function(m) {
    const ret = [];
    const t4 = m[4] * m[8] - m[5] * m[7];
    const t5 = m[5] * m[6] - m[3] * m[8];
    const t6 = m[3] * m[7] - m[4] * m[6];
    const t7 = 1.0 / (
      m[0] * t4 + m[1] * t5 + m[2] * t6);
    if(t7 === 0)return MathUtil.mat3identity();
    ret[0] = t4 * t7;
    ret[1] = (m[2] * m[7] - m[1] * m[8]) * t7;
    ret[2] = (m[1] * m[5] - m[2] * m[4]) * t7;
    ret[3] = t5 * t7;
    ret[4] = (m[0] * m[8] - m[2] * m[6]) * t7;
    ret[5] = (m[2] * m[3] - m[0] * m[5]) * t7;
    ret[6] = t6 * t7;
    ret[7] = (m[1] * m[6] - m[0] * m[7]) * t7;
    ret[8] = (m[0] * m[4] - m[1] * m[3]) * t7;
    return ret;
  },
  /**
   * Multiplies two 3x3 matrices. A new matrix is returned.
   * The matrices are multiplied such that the transformations
   * they describe happen in reverse order. For example, if the first
   * matrix (input matrix) describes a translation and the second
   * matrix describes a scaling, the multiplied matrix will describe
   * the effect of scaling then translation.
   * <p>The matrix multiplication is effectively done by breaking up matrix <code>b</code>
   * into three 3-element vectors (the first 3 elements make up the first vector, and so on),
   * [transforming]{@link MathUtil.mat3transform} each vector with
   * matrix <code>a</code>, and putting the vectors back together into a new matrix.
   * @param {Array<number>} a The first matrix.
   * @param {Array<number>} b The second matrix.
   * @returns {Array<number>} The resulting 3x3 matrix.
   */
  "mat3multiply":function(a, b) {
    const ret = [];
    ret[0] = b[0] * a[0] + b[1] * a[3] + b[2] * a[6];
    ret[1] = b[0] * a[1] + b[1] * a[4] + b[2] * a[7];
    ret[2] = b[0] * a[2] + b[1] * a[5] + b[2] * a[8];
    ret[3] = b[3] * a[0] + b[4] * a[3] + b[5] * a[6];
    ret[4] = b[3] * a[1] + b[4] * a[4] + b[5] * a[7];
    ret[5] = b[3] * a[2] + b[4] * a[5] + b[5] * a[8];
    ret[6] = b[6] * a[0] + b[7] * a[3] + b[8] * a[6];
    ret[7] = b[6] * a[1] + b[7] * a[4] + b[8] * a[7];
    ret[8] = b[6] * a[2] + b[7] * a[5] + b[8] * a[8];
    return ret;
  },
  /**
   * Transforms a 3-element vector with a 3x3 matrix and returns
   * the transformed vector.<p>
   * Transforming a vector (<code>v</code>) with a matrix (<code>mat</code>)
   * is effectively done by breaking up <code>mat</code> into three 3-element vectors
   * (the first 3 elements make up the first vector, and so on), multiplying
   * each vector in <code>mat</code> by the corresponding component in
   * <code>v</code>, and adding up the resulting vectors (except <code>v</code>) to
   * get the transformed vector.
   * @param {Array<number>} mat A 3x3 matrix.
   * @param {Array<number>|number} v X coordinate.
   * If "vy", and "vz" are omitted, this value can instead
   * be a 4-element array giving the X, Y, and Z coordinates.
   * @param {number} [vy] Y coordinate.
   * @param {number} [vz] Z coordinate. To transform a 2D
   * point, set Z to 1, and divide the result's X and Y by
   * the result's Z.
   * @returns {Array<number>} The transformed vector.
   */
  "mat3transform":function(mat, v, vy, vz) {
    let x;
    let y;
    let z;
    if(typeof vy !== "undefined" && typeof vz !== "undefined") {
      x = v;
      y = vy;
      z = vz;
    } else {
      x = v[0];
      y = v[1];
      z = v[2];
    }
    return [x * mat[0] + y * mat[3] + z * mat[6],
      x * mat[1] + y * mat[4] + z * mat[7],
      x * mat[2] + y * mat[5] + z * mat[8]];
  },
  /**
   * Returns the transpose of a 3x3 matrix. (A transpose is a
   * matrix whose rows are converted to columns and vice versa.)
   * @param {Array<number>} m3 A 3x3 matrix.
   * @returns {Array<number>} The resulting 3x3 matrix.
   */
  "mat3transpose":function(m3) {
    return MathUtil.mat3transposeInPlace(MathUtil.mat3copy(m3));
  },
  /**
   * Transposes a 3x3 matrix in place without creating
   * a new matrix. (A transpose is a matrix whose rows
   * are converted to columns and vice versa.)
   * @param {Array<number>} mat A 3x3 matrix.
   * @returns {Array<number>} The parameter "mat".
   */
  "mat3transposeInPlace":function(mat) {
    let tmp = mat[1]; mat[1] = mat[3]; mat[3] = tmp;
    tmp = mat[2]; mat[2] = mat[6]; mat[6] = tmp;
    tmp = mat[5]; mat[5] = mat[7]; mat[7] = tmp;
    return mat;
  },
  /**
   * Returns a copy of a 4x4 matrix.
   * @param {Array<number>} mat A 4x4 matrix.
   * @returns {Array<number>} Return value. */
  "mat4copy":function(mat) {
    return [mat[0], mat[1], mat[2], mat[3],
      mat[4], mat[5], mat[6], mat[7],
      mat[8], mat[9], mat[10], mat[11],
      mat[12], mat[13], mat[14], mat[15]];
  },
  /**
   * Returns a 4x4 matrix representing a [perspective projection]{@tutorial camera}
   * in the form of a view frustum, or the limits in the "eye"'s view.<p>
   * When just this matrix is used to transform vertices, transformed coordinates in the view volume will have the following meanings:<ul>
   * <li>X coordinates range from -W to W (where W is the fourth component of the transformed vertex) and increase from "l" to "r".</li>
   * <li>Y coordinates range from -W to W and increase from "b" to "t" (or from "t" to "b" by default in Vulkan).</li>
   * <li>Z coordinates range from -W to W and increase from "near" to "far". (For view volume Z coordinates ranging from 0 to W, to accommodate how DirectX, Metal, and Vulkan handle such coordinates by default, divide the 15th element of the result, or zero-based index 14, by 2.)</li></ul>
   * The transformed coordinates have the meanings given above assuming that the eye space (untransformed) X, Y, and Z coordinates increase rightward, upward, and from the "eye" backward, respectively (so that the eye space is a [right-handed coordinate system]{@tutorial glmath}). To adjust this method's result for the opposite "hand", reverse the sign of the result's:<ul>
   * <li>1st to 4th elements (zero-based indices 0 to 3), to reverse the direction in which X coordinates increase, or
   * <li>5th to 8th elements (zero-based indices 4 to 7), to reverse the direction in which Y coordinates increase (e.g., to make those coordinates increase upward in Vulkan rather than downward), or
   * <li>9th to 12th elements (zero-based indices 8 to 11), to reverse the direction in which Z coordinates increase.</ul>
   * @param {number} l X coordinate of the point in eye space where the left
   * clipping plane meets the near clipping plane.
   * @param {number} r X coordinate of the point in eye space where the right
   * clipping plane meets the near clipping plane.
   * ("l" is usually less than "r", so that X coordinates increase from left to right when just this matrix is used to transform vertices.
   * If "l" is greater than "r", X coordinates increase in the opposite direction.)
   * @param {number} b Y coordinate of the point in eye space where the bottom
   * clipping plane meets the near clipping plane.
   * @param {number} t Y coordinate of the point in eye space where the top
   * clipping plane meets the near clipping plane.
   * ("b" is usually less than "t", so that, in WebGL and OpenGL by default, Y coordinates increase upward when just this matrix is used to transform vertices.
   * If "b" is greater than "t", Y coordinates increase in the opposite direction.)
   * @param {number} near The distance, in eye space, from the "eye" to
   * the near clipping plane. Objects closer than this distance won't be
   * seen.<br>This value should be greater than 0, and should be set to the highest distance
   * from the "eye" that the application can afford to clip out for being too
   * close, for example, 0.5, 1, or higher.
   * @param {number} far The distance, in eye space, from the "eye" to
   * the far clipping plane. Objects farther than this distance won't
   * be seen.<br>This value should be greater than 0 and should be set
   * so that the absolute ratio of "far" to "near" is as small as
   * the application can accept.
   * ("near" is usually less than "far", so that, in WebGL and most other graphics pipelines by default, Z coordinates increase from the "eye" backward when just this matrix is used to transform vertices.
   * If "near" is greater than "far", Z coordinates increase in the opposite direction.)<br>
   * In the usual case that "far" is greater than "near", depth
   * buffer values will be more concentrated around the near
   * plane than around the far plane due to the perspective
   * projection.  The greater the ratio of "far" to "near", the more
   * concentrated the values will be around the near plane, and the
   * more likely two objects close to the far plane will have identical depth values.
   * (Most WebGL implementations support 24-bit depth buffers, meaning they support 16,777,216 possible values per pixel.)
   * @returns {Array<number>} The resulting 4x4 matrix.
   */
  "mat4frustum":function(l, r, b, t, near, far) {
    const dn = 2 * near;
    const onedx = 1 / (r - l);
    const onedy = 1 / (t - b);
    const onedz = 1 / (far - near);
    return [
      dn * onedx, 0, 0, 0,
      0, dn * onedy, 0, 0,
      (l + r) * onedx, (t + b) * onedy, -(far + near) * onedz, -1,
      0, 0, -(dn * far) * onedz, 0];
  },
  /**
   * Returns the identity 4x4 matrix (a matrix that keeps
   * vectors unchanged when they are transformed with this matrix).
   * @returns {Array<number>} Return value. */
  "mat4identity":function() {
    return [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1];
  },
  /**
   * Returns the transposed result of the inverted 3x3 upper left corner of
   * the given 4x4 matrix.<p>
   * This is usually used to convert a model-view matrix (view matrix multiplied by model or world matrix) to a matrix
   * for transforming surface normals in order to keep them perpendicular
   * to a surface transformed by the model-view matrix. Normals are then
   * transformed by this matrix and then converted to [unit vectors]{@tutorial glmath}. But if the
   * input matrix uses only rotations, translations, and/or uniform scaling
   * (same scaling in X, Y, and Z), the 3x3 upper left of the input matrix can
   * be used instead of the inverse-transpose matrix to transform the normals.
   * @param {Array<number>} m4 A 4x4 matrix.
   * @returns {Array<number>} The resulting 3x3 matrix. If the matrix
   * can't be inverted, returns the identity 3x3 matrix.
   */
  "mat4inverseTranspose3":function(m4) {
    if(m4[1] === 0 && m4[2] === 0 && m4[4] === 0 &&
   m4[6] === 0 && m4[8] === 0 && m4[9] === 0) {
      if(m4[0] === 1 && m4[5] === 1 && m4[10] === 1) {
        // upper 3x3 is identity
        return [1, 0, 0, 0, 1, 0, 0, 0, 1];
      } else if(m4[0] * m4[5] * m4[10] !== 0) {
        // upper 3x3 is simple scaling
        return [1 / m4[0], 0, 0, 0, 1 / m4[5], 0, 0, 0, 1 / m4[10]];
      } else {
        // upper 3x3 is uninvertable scaling
        return [1, 0, 0, 0, 1, 0, 0, 0, 1];
      }
    }
    const m = [m4[0], m4[1], m4[2], m4[4], m4[5], m4[6],
      m4[8], m4[9], m4[10]];
    let det = m[0] * m[4] * m[8] +
m[3] * m[7] * m[2] +
m[6] * m[1] * m[5] -
m[6] * m[4] * m[2] -
m[3] * m[1] * m[8] -
m[0] * m[7] * m[5];
    if(det === 0) {
      return [1, 0, 0, 0, 1, 0, 0, 0, 1];
    }
    det = 1.0 / det;
    return [
      (-m[5] * m[7] + m[4] * m[8]) * det,
      (m[5] * m[6] - m[3] * m[8]) * det,
      (-m[4] * m[6] + m[3] * m[7]) * det,
      (m[2] * m[7] - m[1] * m[8]) * det,
      (-m[2] * m[6] + m[0] * m[8]) * det,
      (m[1] * m[6] - m[0] * m[7]) * det,
      (-m[2] * m[4] + m[1] * m[5]) * det,
      (m[2] * m[3] - m[0] * m[5]) * det,
      (-m[1] * m[3] + m[0] * m[4]) * det];
  },
  /**
   * Finds the inverse of a 4x4 matrix, describing a transformation that undoes the given transformation.
   * @param {Array<number>} m A 4x4 matrix.
   * @returns {Array<number>} The resulting 4x4 matrix.
   * Returns the identity matrix if this matrix's determinant, or overall scaling factor, is 0 or extremely close to 0.
   */
  "mat4invert":function(m) {
    const tvar0 = m[0] * m[10];
    const tvar1 = m[0] * m[11];
    const tvar2 = m[0] * m[5];
    const tvar3 = m[0] * m[6];
    const tvar4 = m[0] * m[7];
    const tvar5 = m[0] * m[9];
    const tvar6 = m[10] * m[12];
    const tvar7 = m[10] * m[13];
    const tvar8 = m[10] * m[15];
    const tvar9 = m[11] * m[12];
    const tvar10 = m[11] * m[13];
    const tvar11 = m[11] * m[14];
    const tvar14 = m[1] * m[4];
    const tvar15 = m[1] * m[6];
    const tvar16 = m[1] * m[7];
    const tvar17 = m[1] * m[8];
    const tvar19 = m[2] * m[4];
    const tvar20 = m[2] * m[5];
    const tvar21 = m[2] * m[7];
    const tvar22 = m[2] * m[8];
    const tvar23 = m[2] * m[9];
    const tvar25 = m[3] * m[4];
    const tvar26 = m[3] * m[5];
    const tvar27 = m[3] * m[6];
    const tvar28 = m[3] * m[8];
    const tvar29 = m[3] * m[9];
    const tvar32 = m[4] * m[9];
    const tvar35 = m[5] * m[8];
    const tvar37 = m[6] * m[8];
    const tvar38 = m[6] * m[9];
    const tvar40 = m[7] * m[8];
    const tvar41 = m[7] * m[9];
    const tvar42 = m[8] * m[13];
    const tvar43 = m[8] * m[14];
    const tvar44 = m[8] * m[15];
    const tvar45 = m[9] * m[12];
    const tvar46 = m[9] * m[14];
    const tvar47 = m[9] * m[15];
    const tvar48 = tvar14 - tvar2;
    const tvar49 = tvar15 - tvar20;
    const tvar50 = tvar16 - tvar26;
    const tvar51 = tvar19 - tvar3;
    const tvar52 = tvar2 - tvar14;
    const tvar53 = tvar20 - tvar15;
    const tvar54 = tvar21 - tvar27;
    const tvar55 = tvar25 - tvar4;
    const tvar56 = tvar26 - tvar16;
    const tvar57 = tvar27 - tvar21;
    const tvar58 = tvar3 - tvar19;
    const tvar59 = tvar4 - tvar25;
    let det = tvar45 * tvar57 + tvar6 * tvar50 + tvar9 * tvar53 + tvar42 * tvar54 + tvar7 * tvar55 +
tvar10 * tvar58 + tvar43 * tvar56 + tvar46 * tvar59 + tvar11 * tvar48 + tvar44 * tvar49 +
tvar47 * tvar51 + tvar8 * tvar52;
    if(det === 0)return MathUtil.mat4identity();
    det = 1.0 / det;
    const r = [];
    r[0] = m[6] * tvar10 - m[7] * tvar7 + tvar41 * m[14] - m[5] * tvar11 - tvar38 * m[15] + m[5] * tvar8;
    r[1] = m[3] * tvar7 - m[2] * tvar10 - tvar29 * m[14] + m[1] * tvar11 + tvar23 * m[15] - m[1] * tvar8;
    r[2] = m[13] * tvar54 + m[14] * tvar56 + m[15] * tvar49;
    r[3] = m[9] * tvar57 + m[10] * tvar50 + m[11] * tvar53;
    r[4] = m[7] * tvar6 - m[6] * tvar9 - tvar40 * m[14] + m[4] * tvar11 + tvar37 * m[15] - m[4] * tvar8;
    r[5] = m[2] * tvar9 - m[3] * tvar6 + m[14] * (tvar28 - tvar1) + m[15] * (tvar0 - tvar22);
    r[6] = m[12] * tvar57 + m[14] * tvar59 + m[15] * tvar51;
    r[7] = m[8] * tvar54 + m[10] * tvar55 + m[11] * tvar58;
    r[8] = m[5] * tvar9 - tvar41 * m[12] + tvar40 * m[13] - m[4] * tvar10 + m[15] * (tvar32 - tvar35);
    r[9] = tvar29 * m[12] - m[1] * tvar9 + m[13] * (tvar1 - tvar28) + m[15] * (tvar17 - tvar5);
    r[10] = m[12] * tvar50 + m[13] * tvar55 + m[15] * tvar52;
    r[11] = m[8] * tvar56 + m[9] * tvar59 + m[11] * tvar48;
    r[12] = tvar38 * m[12] - m[5] * tvar6 - tvar37 * m[13] + m[4] * tvar7 + m[14] * (tvar35 - tvar32);
    r[13] = m[1] * tvar6 - tvar23 * m[12] + m[13] * (tvar22 - tvar0) + m[14] * (tvar5 - tvar17);
    r[14] = m[12] * tvar53 + m[13] * tvar58 + m[14] * tvar48;
    r[15] = m[8] * tvar49 + m[9] * tvar51 + m[10] * tvar52;
    let i;
    for (i = 0; i < 16; i++) {
      r[i] *= det;
    }
    return r;
  },
  /**
   * Returns whether a 4x4 matrix is the identity matrix.
   * @param {Array<number>} mat A 4x4 matrix.
   * @returns {boolean} Return value. */
  "mat4isIdentity":function(mat) {
    return (
      mat[0] === 1 && mat[1] === 0 && mat[2] === 0 && mat[3] === 0 &&
    mat[4] === 0 && mat[5] === 1 && mat[6] === 0 && mat[7] === 0 &&
    mat[8] === 0 && mat[9] === 0 && mat[10] === 1 && mat[11] === 0 &&
    mat[12] === 0 && mat[13] === 0 && mat[14] === 0 && mat[15] === 1
    );
  },
  /**
   * Returns a 4x4 matrix that represents a "camera" view,
   * transforming world space coordinates, shared by every object in a scene, to coordinates in <i>eye space</i>
   * (also called <i>camera space</i> or <i>view space</i>). This essentially rotates a "camera"
   * and moves it to somewhere in the scene. In eye space, when just this matrix is used to transform vertices:<ul>
   * <li>The "camera" is located at the origin (0,0,0), or
   * at <code>cameraPos</code> in world space,
   * and points forward to the <code>lookingAt</code>
   * position in world space. This generally
   * puts <code>lookingAt</code> at the center of the view.
   * <li>The X axis points rightward from the "camera"'s viewpoint.
   * <li>The Y axis points upward from the center of the "camera" to its top. The
   * <code>up</code> vector guides this direction.
   * <li>The Z axis points away from the <code>lookingAt</code> point toward the "camera", so that the eye space is a [right-handed coordinate system]{@tutorial glmath}.</ul><p>
   * To adjust the result of this method for a left-handed coordinate system (so that the Z axis points in the opposite direction), reverse the sign of the 1st, 3rd, 5th, 7th, 9th, 11th, 13th, and 15th elements of the result (zero-based indices 0, 2, 4, 6, 8, 10, 12, and 14).<p>
   * @param {Array<number>} cameraPos A 3-element vector specifying
   * the "camera" position in world space.<br>
   * When used in conjunction with an [orthographic projection]{@link MathUtil.mat4ortho}, set this parameter to
   * the value of <code>lookingAt</code> plus a [unit vector]{@tutorial glmath}
   * (for example, using {@link MathUtil.vec3add}) to form an
   * <i>axonometric projection</i> (if the unit vector is <code>[sqrt(1/3),sqrt(1/3),sqrt(1/3)]</code>, the result is
   * an <i>isometric projection</i>). See the examples below.
   * @param {Array<number>} [lookingAt] A 3-element vector specifying
   * the point in world space that the "camera" is looking at. May be null or omitted,
   * in which case the default is the coordinates (0,0,0).
   * @param {Array<number>} [up] A 3-element vector specifying
   * the direction from the center of the "camera" to its top. This parameter may
   * be null or omitted, in which case the default is the vector (0, 1, 0),
   * the vector that results when the "camera" is held upright.<br>
   * This vector must not be parallel to the view direction
   * (the direction from "cameraPos" to "lookingAt").
   * (See the example for one way to ensure this.)<br>
   * @returns {Array<number>} The resulting 4x4 matrix.
   * @example <caption>The following example calls this method with an
   * up vector of (0, 1, 0) except if the view direction is parallel to that
   * vector or nearly so.</caption>
   * var upVector=[0,1,0]; // Y axis
   * var viewdir=MathUtil.vec3sub(lookingAt, cameraPos);
   * var par=MathUtil.vec3length(MathUtil.vec3cross(viewdir,upVector));
   * if(par<0.00001)upVector=[0,0,1]; // view is almost parallel, so use Z axis
   * var matrix=MathUtil.mat4lookat(cameraPos,lookingAt,upVector);
   * @example <caption>The following example creates an
   * isometric projection for a right-handed coordinate system. The Y
   * axis will point up, the Z axis toward the bottom left, and the X axis toward
   * the bottom right.</caption>
   * // Assumes an orthographic projection matrix is used. Example:
   * // var projectionMatrix=MathUtil.mat4ortho(-10,10,-10,10,-50,50);
   * // "Camera" will be at (1,1,1) -- actually (sqrt(1/3),sqrt(1/3),sqrt(1/3)) --
   * // and point toward [0,0,0]
   * var lookPoint=[0,0,0];
   * var cameraPoint=MathUtil.vec3normalize([1,1,1]);
   * cameraPoint=MathUtil.vec3add(cameraPoint,lookPoint);
   * var matrix=MathUtil.mat4lookat(cameraPoint,lookPoint);
   * @example <caption>The following example is like the previous
   * example, but with the Z axis pointing up.</caption>
   * var lookPoint=[0,0,0];
   * var cameraPoint=MathUtil.vec3normalize([1,1,1]);
   * cameraPoint=MathUtil.vec3add(cameraPoint,lookPoint);
   * // Positive Z axis is the up vector
   * var matrix=MathUtil.mat4lookat(cameraPoint,lookPoint,[0,0,1]);
   * @example <caption>The following example creates a "camera" view matrix using the
   * viewer position, the viewing direction, and the up vector (a "look-to" matrix):</caption>
   * var viewDirection=[0,0,1]
   * var cameraPos=[0,0,0]
   * var upVector=[0,1,0]
   * var lookingAt=MathUtil.vec3add(cameraPos,viewDirection);
   * var matrix=MathUtil.mat4lookat(cameraPos,lookingAt,upVector);
   */
  "mat4lookat":function(cameraPos, lookingAt, up) {
    if(typeof up === "undefined" || up === null)up = [0, 1, 0];
    if(typeof lookingAt === "undefined" || lookingAt === null)lookingAt = [0, 0, 0];
    const f = MathUtil.vec3sub(lookingAt, cameraPos);
    const len = MathUtil.vec3length(f);
    if(len < 1e-6) {
      return MathUtil.mat4identity();
    }
    // "f" is the normalized vector from "cameraPos" to "lookingAt"
    MathUtil.vec3scaleInPlace(f, 1.0 / len);
    // normalize the "up" vector
    up = MathUtil.vec3normalize(up);
    // make "s" a vector perpendicular to "f" and "up" vector;
    // "s" will point rightward from the "camera"'s viewpoint.
    const s = MathUtil.vec3cross(f, up);
    MathUtil.vec3normalizeInPlace(s);
    // orthogonalize the "up" vector
    const u = MathUtil.vec3cross(s, f);
    MathUtil.vec3normalizeInPlace(u);
    // negate the "f" vector so that it points forward from
    // the "camera"'s viewpoint
    MathUtil.vec3negateInPlace(f);
    return [s[0], u[0], f[0], 0, s[1], u[1], f[1], 0, s[2], u[2], f[2], 0,
      -MathUtil.vec3dot(cameraPos, s),
      -MathUtil.vec3dot(cameraPos, u),
      -MathUtil.vec3dot(cameraPos, f), 1];
  },
  /**
   * Multiplies two 4x4 matrices. A new matrix is returned.
   * The matrices are multiplied such that the transformations
   * they describe happen in reverse order. For example, if the first
   * matrix (input matrix) describes a translation and the second
   * matrix describes a scaling, the multiplied matrix will describe
   * the effect of scaling then translation.
   * <p>The matrix multiplication is effectively done by breaking up matrix <code>b</code>
   * into four 4-element vectors (the first 4 elements make up the first vector, and so on),
   * [transforming]{@link MathUtil.mat4transform} each vector with
   * matrix <code>a</code>, and putting the vectors back together into a new matrix.
   * @param {Array<number>} a The first matrix.
   * @param {Array<number>} b The second matrix.
   * @returns {Array<number>} The resulting 4x4 matrix.
   */
  "mat4multiply":function(a, b) {
    const dst = [];
    let i;
    for (i = 0; i < 16; i += 4) {
      let j;
      for (j = 0; j < 4; j++) {
        dst[i + j] =
    b[i] * a[j] +
    b[i + 1] * a[j + 4] +
    b[i + 2] * a[j + 8] +
    b[i + 3] * a[j + 12];
      }
    }
    return dst;
  },
  /**
   * Returns a 4x4 view matrix representing an oblique "eye" view,
   * when used in conjunction with an [orthographic projection]{@link MathUtil.mat4ortho}.<p>
   * This method works the same way in right-handed and left-handed
   * coordinate systems.
   * @param {number} alpha Controls how much the Z axis is stretched. In degrees. A value of 45
   * (<code>arctan(1)</code>) indicates
   * a cabinet projection, and a value of 63.435 (<code>arctan(2)</code>) indicates a cavalier projection.
   * @param {number} phi Controls the apparent angle of the negative Z axis in relation to the
   * positive X axis. In degrees. 0 means the negative Z axis appears to point in the same direction as
   * the positive X axis, and 90, in the same direction as the positive Y axis.
   * @returns {Array<number>} The resulting 4x4 matrix.
   */
  "mat4oblique":function(alpha, phi) {
    const alphaAngle = (alpha >= 0 && alpha < 360 ? alpha : alpha % 360 + (alpha < 0 ? 360 : 0)) * MathUtil.PiDividedBy180;
    const phiAngle = (phi >= 0 && phi < 360 ? phi : phi % 360 + (phi < 0 ? 360 : 0)) * MathUtil.PiDividedBy180;
    const ca = Math.cos(alphaAngle);
    const sa = alphaAngle >= 0 && alphaAngle < 6.283185307179586 ? alphaAngle <= 3.141592653589793 ? Math.sqrt(1.0 - ca * ca) : -Math.sqrt(1.0 - ca * ca) : Math.sin(alphaAngle);
    const cp = Math.cos(phiAngle);
    const sp = phiAngle >= 0 && phiAngle < 6.283185307179586 ? phiAngle <= 3.141592653589793 ? Math.sqrt(1.0 - cp * cp) : -Math.sqrt(1.0 - cp * cp) : Math.sin(phiAngle);
    const cota = ca / sa;
    return [
      1, 0, 0, 0,
      0, 1, 0, 0,
      -cp * cota, -sp * cota, 1, 0,
      0, 0, 0, 1
    ];
  },
  /**
   * Returns a 4x4 matrix representing an [orthographic projection]{@tutorial camera}.
   * In this projection, the left clipping plane is parallel to the right clipping
   * plane and the top to the bottom.<p>
   * The projection returned by this method only scales and/or shifts the view, so that
   * objects with the same size won't appear smaller as they get more distant from the  "camera".<p>
   * When just this matrix is used to transform vertices, transformed coordinates in the view volume will have the following meanings:<ul>
   * <li>X coordinates range from -1 to 1 and increase from "l" to "r".</li>
   * <li>Y coordinates range from -1 to 1 and increase from "b" to "t" (or from "t" to "b" by default in Vulkan).</li>
   * <li>Z coordinates range from -1 to 1 and increase from "n" to "f". (For view volume Z coordinates ranging from 0 to 1, to accommodate how DirectX, Metal, and Vulkan handle such coordinates by default, divide the 11th and 15th elements of the result, or zero-based indices 10 and 14, by 2, then add 0.5 to the 15th element.)</li></ul>
   * The transformed coordinates have the meanings given above assuming that the eye space (untransformed) X, Y, and Z coordinates increase rightward, upward, and from the "eye" backward, respectively (so that the eye space is a [right-handed coordinate system]{@tutorial glmath}). To adjust this method's result for the opposite "hand", reverse the sign of the result's:<ul>
   * <li>1st to 4th elements (zero-based indices 0 to 3), to reverse the direction in which X coordinates increase, or
   * <li>5th to 8th elements (zero-based indices 4 to 7), to reverse the direction in which Y coordinates increase (e.g., to make those coordinates increase upward in Vulkan rather than downward), or
   * <li>9th to 12th elements (zero-based indices 8 to 11), to reverse the direction in which Z coordinates increase.</ul>
   * @param {number} l Leftmost coordinate of the orthographic view.
   * @param {number} r Rightmost coordinate of the orthographic view.
   * ("l" is usually less than "r", so that X coordinates increase from left to right when just this matrix is used to transform vertices.
   * If "l" is greater than "r", X coordinates increase in the opposite direction.)
   * @param {number} b Bottommost coordinate of the orthographic view.
   * @param {number} t Topmost coordinate of the orthographic view.
   * ("b" is usually less than "t", so that, in WebGL and OpenGL by default, Y coordinates increase upward when just this matrix is used to transform vertices.
   * If "b" is greater than "t", Y coordinates increase in the opposite direction.)
   * @param {number} n Z coordinate, in eye space, of the near clipping plane. If Z coordinates in eye space increase from the "eye" forward, a positive value for "n" means the plane is in front of the "eye".
   * @param {number} f Z coordinate, in eye space, of the far clipping plane. If Z coordinates in eye space increase from the "eye" forward, a positive value for "f" means the plane is in front of the "eye".
   *  ("n" is usually less than "f", so that, in WebGL and most other graphics pipelines by default, Z coordinates increase from the "eye" backward when just this matrix is used to transform vertices.
   * If "n" is greater than "f", Z coordinates increase in the opposite direction.)
   * The absolute difference
   * between n and f should be as small as the application can accept.
   * @returns {Array<number>} The resulting 4x4 matrix.
   */
  "mat4ortho":function(l, r, b, t, n, f) {
    const width = 1 / (r - l);
    const height = 1 / (t - b);
    const depth = 1 / (f - n);
    return [
      2 * width, 0, 0, 0,
      0, 2 * height, 0, 0,
      0, 0, -2 * depth, 0,
      -(l + r) * width, -(t + b) * height, -(n + f) * depth, 1];
  },

  /**
   * Returns a 4x4 matrix representing a 2D [orthographic projection]{@tutorial camera}.<p>
   * This is the same as mat4ortho() with the near clipping plane
   * set to -1 and the far clipping plane set to 1.<p>
   * See [mat4ortho()]{@link MathUtil.mat4ortho} for information on the meaning of coordinates
   * when using this matrix and on adjusting the matrix for different coordinate systems.
   * @param {number} l Leftmost coordinate of the orthographic view.
   * @param {number} r Rightmost coordinate of the orthographic view. See [mat4ortho()]{@link MathUtil.mat4ortho} for more information on the relationship between the "l" and "r" parameters.
   * @param {number} b Bottommost coordinate of the orthographic view.
   * @param {number} t Topmost coordinate of the orthographic view. See [mat4ortho()]{@link MathUtil.mat4ortho} for more information on the relationship between the "b" and "t" parameters.
   * @returns {Array<number>} The resulting 4x4 matrix.
   */
  "mat4ortho2d":function(l, r, b, t) {
    return MathUtil.mat4ortho(l, r, b, t, -1, 1);
  },
  /**
   * Returns a 4x4 matrix representing a 2D [orthographic projection]{@tutorial camera},
   * retaining the view rectangle's aspect ratio.<p>
   * If the view rectangle's aspect ratio doesn't match the desired aspect
   * ratio, the view rectangle will be centered on the viewport
   * or otherwise moved and scaled so as to keep the entire view rectangle visible without stretching
   * or squishing it; the projection matrix generated will then use a view volume based on the new view rectangle.<p>
   * This is the same as mat4orthoAspect() with the near clipping plane
   * set to -1 and the far clipping plane set to 1.<p>
   * See [mat4ortho()]{@link MathUtil.mat4ortho} for information on the meaning
   * of coordinates when using this matrix and on adjusting the matrix for different coordinate systems.
   * @param {number} l Leftmost coordinate of the orthographic view.
   * @param {number} r Rightmost coordinate of the orthographic view. See [mat4ortho()]{@link MathUtil.mat4ortho} for more information on the relationship between the "l" and "r" parameters.
   * @param {number} b Bottommost coordinate of the orthographic view.
   * @param {number} t Topmost coordinate of the orthographic view. See [mat4ortho()]{@link MathUtil.mat4ortho} for more information on the relationship between the "b" and "t" parameters.
   * @param {number} aspect The ratio of width to height of the viewport, usually
   * the scene's aspect ratio.
   * @returns {Array<number>} The resulting 4x4 matrix.
   * @example <caption>The following example generates an orthographic
   * projection matrix with a square view rectangle and an aspect ratio
   * retrieved from the HTML DOM.</caption>
   * var matrix=MathUtil.mat4ortho2dAspect(0,100,0,100,
   * window.innerWidth/Math.max(1,window.innerHeight));
   */
  "mat4ortho2dAspect":function(l, r, b, t, aspect) {
    return MathUtil.mat4orthoAspect(l, r, b, t, -1, 1, aspect);
  },
  /**
   * Returns a 4x4 matrix representing an [orthographic projection]{@tutorial camera},
   * retaining the view rectangle's aspect ratio.<p>
   * If the view rectangle's aspect ratio doesn't match the desired aspect
   * ratio, the view rectangle will be centered on the viewport
   * or otherwise moved and scaled so as to keep the entire view rectangle visible without stretching
   * or squishing it; the projection matrix generated will then use a view volume based on the new view rectangle.
   * <p>The projection returned by this method only scales and/or shifts the view, so that
   * objects with the same size won't appear smaller as they get more distant from the  "eye".<p>
   * See [mat4ortho()]{@link MathUtil.mat4ortho} for information on the meaning of coordinates
   * when using this matrix and on adjusting the matrix for different coordinate systems.
   * @param {number} l Leftmost coordinate of the orthographic view.
   * @param {number} r Rightmost coordinate of the orthographic view. See [mat4ortho()]{@link MathUtil.mat4ortho} for more information on the relationship between the "l" and "r" parameters.
   * @param {number} b Bottommost coordinate of the orthographic view.
   * @param {number} t Topmost coordinate of the orthographic view. See [mat4ortho()]{@link MathUtil.mat4ortho} for more information on the relationship between the "b" and "t" parameters.
   * @param {number} n Distance, in eye space, from the "eye" to the near clipping
   * plane.
   * @param {number} f Distance, in eye space, from the "eye" to the far clipping
   * plane. See [mat4ortho()]{@link MathUtil.mat4ortho} for more information on the "n" and "f" parameters and the relationship between them.
   * @param {number} aspect The ratio of width to height of the viewport, usually
   * the scene's aspect ratio.
   * @returns {Array<number>} The resulting 4x4 matrix.
   * @example <caption>The following example generates an orthographic
   * projection matrix with a square view rectangle, a Z range of 0 to 100, and an aspect ratio
   * retrieved from the HTML DOM.</caption>
   * var matrix=MathUtil.mat4orthoAspect(0,100,0,100,
   * 0, 100,
   * window.innerWidth/Math.max(1,window.innerHeight));
   */
  "mat4orthoAspect":function(l, r, b, t, n, f, aspect) {
    let newDim;
    const boxAspect = Math.abs((r - l) / (t - b));
    aspect /= boxAspect;
    const w = Math.abs(r - l);
    const h = Math.abs(t - b);
    if (aspect < 1.0) {
      newDim = h / aspect;
      if(t > b) {
        b -= (newDim - h) * 0.5;
        t += (newDim - h) * 0.5;
      } else {
        t -= (newDim - h) * 0.5;
        b += (newDim - h) * 0.5;
      }
    } else {
      newDim = w * aspect;
      if(r > l) {
        l -= (newDim - w) * 0.5;
        r += (newDim - w) * 0.5;
      } else {
        r -= (newDim - w) * 0.5;
        l += (newDim - w) * 0.5;
      }
    }
    return MathUtil.mat4ortho(l, r, b, t, n, f);
  },
  /**
   * Returns a 4x4 matrix representing a [perspective projection]{@tutorial camera}.<p>
   * When just this matrix is used to transform vertices, transformed coordinates in the view volume will have the following meanings:<ul>
   * <li>X coordinates range from -W to W (where W is the fourth component of the transformed vertex) and increase from left to right.</li>
   * <li>Y coordinates range from -W to W and increase upward (or downward by default in Vulkan).</li>
   * <li>Z coordinates range from -W to W and increase from "near" to "far". (For view volume Z coordinates ranging from 0 to W, to accommodate how DirectX, Metal, and Vulkan handle such coordinates by default, divide the 15th element of the result, or zero-based index 14, by 2.)</li></ul>
   * The transformed coordinates have the meanings given above assuming that the eye space (untransformed) X, Y, and Z coordinates increase rightward, upward, and from the "eye" backward, respectively (so that the eye space is a [right-handed coordinate system]{@tutorial glmath}). To adjust this method's result for the opposite "hand", reverse the sign of the result's:<ul>
   * <li>1st to 4th elements (zero-based indices 0 to 3), to reverse the direction in which X coordinates increase, or
   * <li>5th to 8th elements (zero-based indices 4 to 7), to reverse the direction in which Y coordinates increase (e.g., to make those coordinates increase upward in Vulkan rather than downward), or
   * <li>9th to 12th elements (zero-based indices 8 to 11), to reverse the direction in which Z coordinates increase.</ul>
   * @param {number} fovY Y axis field of view, in degrees, that is, the shortest angle
   * between the top and bottom clipping planes. Should be less
   * than 180 degrees. (The smaller
   * this number, the bigger close objects appear to be. As a result, zooming out
   * can be implemented by raising this value, and zooming in by lowering it.)
   * @param {number} aspectRatio The ratio of width to height of the viewport, usually
   * the scene's aspect ratio.
   * @param {number} near The distance, in eye space, from the "eye" to
   * the near clipping plane. Objects closer than this distance won't be
   * seen.<br>This value should be greater than 0, and should be set to the highest distance
   * from the "eye" that the application can afford to clip out for being too
   * close, for example, 0.5, 1, or higher.
   * @param {number} far The distance, in eye space, from the "eye" to
   * the far clipping plane. Objects farther than this distance won't
   * be seen.<br>This value should be greater than 0 and should be set
   * so that the absolute ratio of "far" to "near" is as small as
   * the application can accept.
   * ("near" is usually less than "far", so that, in WebGL and most other graphics pipelines by default, Z coordinates increase from the "eye" backward when just this matrix is used to transform vertices.
   * If "near" is greater than "far", Z coordinates increase in the opposite direction.)<br>
   * In the usual case that "far" is greater than "near", depth
   * buffer values will be more concentrated around the near
   * plane than around the far plane due to the perspective
   * projection.  The greater the ratio of "far" to "near", the more
   * concentrated the values will be around the near plane, and the
   * more likely two objects close to the far plane will have identical depth values.
   * (Most WebGL implementations support 24-bit depth buffers, meaning they support 16,777,216 possible values per pixel.)
   * @returns {Array<number>} The resulting 4x4 matrix.
   * @example <caption>The following example generates a perspective
   * projection matrix with a 55 degree field of view and an aspect ratio
   * retrieved from the HTML DOM.</caption>
   * var matrix=MathUtil.mat4perspective(55,
   * window.innerWidth/Math.max(1,window.innerHeight),
   * 0.01,100);
   */
  "mat4perspective":function(fovY, aspectRatio, near, far) {
    // NOTE: Converts fovY to radians then divides it by 2
    const fov = (fovY >= 0 && fovY < 360 ? fovY : fovY % 360 + (fovY < 0 ? 360 : 0)) * MathUtil.PiDividedBy360;
    const f = 1 / Math.tan(fov);
    let nmf = near - far;
    nmf = 1 / nmf;
    return [f / aspectRatio, 0, 0, 0, 0, f, 0, 0, 0, 0,
      nmf * (near + far), -1, 0, 0, nmf * near * far * 2, 0];
  },
  /**
   * Returns a 4x4 matrix representing a [perspective projection]{@tutorial camera},
   * given an X axis field of view.<p>
   * See [mat4perspective()]{@link MathUtil.mat4perspective} for information on the meaning of coordinates
   * when using this matrix and on adjusting the matrix for different coordinate systems.
   * @param {number} fovX X axis field of view, in degrees, that is, the shortest angle
   * between the left and right clipping planes. Should be less
   * than 180 degrees. (The smaller
   * this number, the bigger close objects appear to be. As a result, zooming out
   * can be implemented by raising this value, and zooming in by lowering it.)
   * @param {number} aspectRatio The ratio of width to height of the viewport, usually
   * the scene's aspect ratio.
   * @param {number} near The distance, in eye space, from the "eye" to
   * the near clipping plane. Objects closer than this distance won't be
   * seen.<br>See [mat4perspective()]{@link MathUtil.mat4perspective} for further information on this parameter.
   * @param {number} far The distance, in eye space, from the "eye" to
   * the far clipping plane. Objects farther than this distance won't
   * be seen.<br>See [mat4perspective()]{@link MathUtil.mat4perspective} for further information on this parameter.
   * @returns {Array<number>} The resulting 4x4 matrix.
   * @example <caption>The following example generates a perspective
   * projection matrix with a 120 degree horizontal field of view and an aspect ratio
   * retrieved from the HTML DOM.</caption>
   * var matrix=MathUtil.mat4perspectiveHorizontal(120,
   * window.innerWidth/Math.max(1,window.innerHeight),
   * 0.01,100);
   */
  "mat4perspectiveHorizontal":function(fovX, aspectRatio, near, far) {
    // NOTE: Converts fovX to radians then divides it by 2
    const fov = (fovX >= 0 && fovX < 360 ? fovX : fovX % 360 + (fovX < 0 ? 360 : 0)) * MathUtil.PiDividedBy360;
    // NOTE: Converts to degrees then multiplies by 2
    const fovY = MathUtil.Num360DividedByPi * Math.atan2(Math.tan(fov), aspectRatio);
    return MathUtil.mat4perspective(fovY, aspectRatio, near, far);
  },

  /**
   * Returns a 4x4 matrix that transforms the view to the center of the viewport. The resulting matrix should be multiplied by a projection matrix (such as that returned by {@link MathUtil.mat4perspective}), a projection-view matrix (projection matrix multiplied
   * by the view matrix, in that order),
   * or a model-view-projection matrix, that is, (projection-view matrix multiplied
   * by the model [world] matrix, in that order).
   * @param {number} wx X coordinate of the center of the desired viewport portion, in window coordinates.
   * @param {number} wy Y coordinate of the center of the desired viewport portion, in window coordinates.
   * @param {number} ww Width of the desired viewport portion.
   * @param {number} wh Height of the desired viewport portion.
   * @param {Array<number>} vp A 4-element array giving the X and Y coordinates
   * of the current viewport's origin followed by the width and height
   * of a rectangle indicating the current viewport. If the return value of this method will be multiplied by another matrix (such as that returned
   * by {@link MathUtil.mat4ortho}, {@link MathUtil.mat4perspective}, or
   * similar {@link MathUtil} methods), the viewport's origin is the lower left corner if X and Y coordinates within the view volume increase rightward and upward, respectively, or the upper left corner if X and Y coordinates within the view volume increase rightward and downward, respectively.
   * @returns {Array<number>} The resulting 4x4 matrix.
   */
  "mat4pickMatrix":function(wx, wy, ww, wh, vp) {
    const invww = 1.0 / ww;
    const invwh = 1.0 / wh;
    const t5 = -(wx - vp[0]) * 2.0 * invww;
    const t6 = -(wy - vp[1]) * 2.0 * invwh;
    const t7 = vp[2] * invww * 2.0;
    const t8 = -(vp[3] * invwh) * 2.0;
    // const mat = this.stack[this.stack.length - 1];
    return [
      0.5 * t7, 0, 0, 0,
      0, -0.5 * t8, 0, 0,
      0, 0, 1, 0,
      0.5 * t7 + t5,
      -0.5 * t8 + t6, 0, 1];
  },
  /**
   * Transforms a 3-element vector with a 4x4 matrix and returns
   * a perspective-correct version of the vector as a 3D point. <p>
   * The transformation involves transforming a 4-element vector with the same X,
   * Y, and Z coordinates, but with a W coordinate equal to 1, with the 4x4 matrix, and
   * then dividing X, Y, and Z of the transformed 4-element
   * vector by that vector's W (a <i>perspective divide</i>),
   * then returning that vector's new X, Y, and Z.<p>
   * @param {Array<number>} mat A 4x4 matrix to use to transform
   * the vector. This will generally be
   * a projection-view matrix (projection matrix multiplied
   * by the view matrix, in that order), if the vector to transform is in <i>world space</i>,
   * or a model-view-projection matrix, that is, (projection-view matrix multiplied
   * by the model [world] matrix, in that order), if the vector is in <i>model
   * (object) space</i>.<br>
   * If the matrix includes a projection transform returned
   * by {@link MathUtil.mat4ortho}, {@link MathUtil.mat4perspective}, or
   * similar {@link MathUtil} methods, the X, Y, and Z coordinates within the
   * view volume, before the perspective divide, will have the range specified in those methods' documentation and increase in the direction given in that documentation, and those coordinates, after the perspective divide will range from -1 to 1 (or 0 to 1) if they previously ranged from -W to W (or 0 to W, respectively).
   * @param {Array<number>|number} v X coordinate of a 3D point to transform.
   * If "vy" and "vz" are omitted, this value can instead
   * be a 3-element array giving the X, Y, and Z coordinates.
   * @param {number} [vy] Y coordinate.
   * @param {number} [vz] Z coordinate. To transform a 2D
   * point, set Z to 0.
   * @returns {Array<number>} The transformed 3-element vector.
   * The elements, in order, are
   * the transformed vector's X, Y, and Z coordinates.
   */
  "mat4projectVec3":function(mat, v, vy, vz) {
    let x;
    let y;
    let z;
    if(typeof vy !== "undefined" && typeof vz !== "undefined") {
      x = v;
      y = vy;
      z = vz;
    } else {
      x = v[0];
      y = v[1];
      z = v[2];
    }
    const x1 = x * mat[0] + y * mat[4] + z * mat[8] + mat[12];
    const y1 = x * mat[1] + y * mat[5] + z * mat[9] + mat[13];
    const z1 = x * mat[2] + y * mat[6] + z * mat[10] + mat[14];
    const w = 1.0 / (x * mat[3] + y * mat[7] + z * mat[11] + mat[15]);
    return [x1 * w, y1 * w, z1 * w];
  },
  /**
   * Multiplies a 4x4 matrix by a rotation transformation that rotates vectors
   * by the given rotation angle and around the given [axis of rotation]{@tutorial glmath},
   * and returns a new matrix.
   * The effect will be that the rotation transformation will
   * happen before the transformation described in the given matrix,
   * when applied in the global coordinate frame.
   * @param {Array<number>} mat A 4x4 matrix to multiply.
   * @param {Array<number>|number} angle The desired angle
   * to rotate in degrees.  If "v", "vy", and "vz" are omitted, this can
   * instead be a 4-element array giving the [axis of rotation]{@tutorial glmath}
   * as the first three elements, followed by the angle
   * in degrees as the fourth element.
   * @param {Array<number>|number} v X-component of the point lying on the axis
   * of rotation.  If "vy" and "vz" are omitted, this can
   * instead be a 3-element array giving the axis
   * of rotation.
   * @param {number} vy Y-component of the point lying on the axis
   * of rotation.
   * @param {number} vz Z-component of the point lying on the axis
   * of rotation.
   * @returns {Array<number>} The resulting 4x4 matrix.
   */
  "mat4rotate":function(mat, angle, v, vy, vz) {
    let v0;
    let v1;
    let v2;
    let ang;
    if(typeof vy !== "undefined" && typeof vz !== "undefined") {
      v0 = v;
      v1 = vy;
      v2 = vz;
      ang = angle;
    } else if(typeof v === "undefined") {
      v0 = angle[0];
      v1 = angle[1];
      v2 = angle[2];
      ang = angle[3];
    } else {
      v0 = v[0];
      v1 = v[1];
      v2 = v[2];
      ang = angle;
    }
    ang = (ang >= 0 && ang < 360 ? ang : ang % 360 + (ang < 0 ? 360 : 0)) * MathUtil.PiDividedBy180;
    const cost = Math.cos(ang);
    const sint = ang <= 3.141592653589793 ? Math.sqrt(1.0 - cost * cost) : -Math.sqrt(1.0 - cost * cost);
    if( v0 === 1 && v1 === 0 && v2 === 0 ) {
      return [mat[0], mat[1], mat[2], mat[3],
        cost * mat[4] + mat[8] * sint, cost * mat[5] + mat[9] * sint, cost * mat[6] + mat[10] * sint, cost * mat[7] + mat[11] * sint,
        cost * mat[8] - sint * mat[4], cost * mat[9] - sint * mat[5], cost * mat[10] - sint * mat[6], cost * mat[11] - sint * mat[7],
        mat[12], mat[13], mat[14], mat[15]];
    } else if( v0 === 0 && v1 === 1 && v2 === 0 ) {
      return [cost * mat[0] - sint * mat[8], cost * mat[1] - sint * mat[9], cost * mat[2] - sint * mat[10], cost * mat[3] - sint * mat[11],
        mat[4], mat[5], mat[6], mat[7],
        cost * mat[8] + mat[0] * sint, cost * mat[9] + mat[1] * sint, cost * mat[10] + mat[2] * sint, cost * mat[11] + mat[3] * sint,
        mat[12], mat[13], mat[14], mat[15]];
    } else if( v0 === 0 && v1 === 0 && v2 === 1 ) {
      return [cost * mat[0] + mat[4] * sint, cost * mat[1] + mat[5] * sint, cost * mat[2] + mat[6] * sint, cost * mat[3] + mat[7] * sint,
        cost * mat[4] - sint * mat[0], cost * mat[5] - sint * mat[1], cost * mat[6] - sint * mat[2], cost * mat[7] - sint * mat[3],
        mat[8], mat[9], mat[10], mat[11], mat[12], mat[13], mat[14], mat[15]];
    } else if(v0 === 0 && v1 === 0 && v2 === 0) {
      return MathUtil.mat4copy(mat);
    } else {
      const iscale = 1.0 / Math.sqrt(v0 * v0 + v1 * v1 + v2 * v2);
      v0 *= iscale;
      v1 *= iscale;
      v2 *= iscale;
      const x2 = v0 * v0;
      const y2 = v1 * v1;
      const z2 = v2 * v2;
      const mcos = 1.0 - cost;
      const xy = v0 * v1;
      const xz = v0 * v2;
      const yz = v1 * v2;
      const xs = v0 * sint;
      const ys = v1 * sint;
      const zs = v2 * sint;
      v1 = mcos * x2;
      const v10 = mcos * yz;
      const v12 = mcos * z2;
      const v3 = mcos * xy;
      const v5 = mcos * xz;
      const v7 = mcos * y2;
      const v15 = cost + v1;
      const v16 = v3 + zs;
      const v17 = v5 - ys;
      const v18 = cost + v7;
      const v19 = v3 - zs;
      const v20 = v10 + xs;
      const v21 = cost + v12;
      const v22 = v5 + ys;
      const v23 = v10 - xs;
      return [
        mat[0] * v15 + mat[4] * v16 + mat[8] * v17, mat[1] * v15 + mat[5] * v16 + mat[9] * v17,
        mat[10] * v17 + mat[2] * v15 + mat[6] * v16, mat[11] * v17 + mat[3] * v15 + mat[7] * v16,
        mat[0] * v19 + mat[4] * v18 + mat[8] * v20, mat[1] * v19 + mat[5] * v18 + mat[9] * v20,
        mat[10] * v20 + mat[2] * v19 + mat[6] * v18, mat[11] * v20 + mat[3] * v19 + mat[7] * v18,
        mat[0] * v22 + mat[4] * v23 + mat[8] * v21, mat[1] * v22 + mat[5] * v23 + mat[9] * v21,
        mat[10] * v21 + mat[2] * v22 + mat[6] * v23, mat[11] * v21 + mat[3] * v22 + mat[7] * v23,
        mat[12], mat[13], mat[14], mat[15]];
    }
  },
  /**
   * Returns a 4x4 matrix representing a rotation transformation that rotates vectors
   * by the given rotation angle and around the given [axis of rotation]{@tutorial glmath}.
   * @param {Array<number>|number} angle The desired angle
   * to rotate in degrees.  If "v", "vy", and "vz" are omitted, this can
   * instead be a 4-element array giving the axis of rotation as the first three elements, followed by the angle
   * in degrees as the fourth element.
   * @param {Array<number>|number} v X-component of the point lying on the axis
   * of rotation.  If "vy" and "vz" are omitted, this can
   * instead be a 3-element array giving the axis
   * of rotation.
   * @param {number} vy Y-component of the point lying on the axis
   * of rotation.
   * @param {number} vz Z-component of the point lying on the axis
   * of rotation.
   * @returns {Array<number>} The resulting 4x4 matrix.
   * @example <caption>The following example rotates a vector,
   * "vec", about the Z axis by the given angle, "angle".</caption>
   * var newVector H3DU.MathUtil.mat4projectVec3(
   * H3DU.MathUtil.mat4rotated(angle, 0, 0, 1), vec);
   */
  "mat4rotated":function(angle, v, vy, vz) {
    let v0;
    let v1;
    let v2;
    let ang;
    if(typeof vy !== "undefined" && typeof vz !== "undefined") {
      v0 = v;
      v1 = vy;
      v2 = vz;
      ang = angle;
    } else if(typeof v === "undefined") {
      v0 = angle[0];
      v1 = angle[1];
      v2 = angle[2];
      ang = angle[3];
    } else {
      v0 = v[0];
      v1 = v[1];
      v2 = v[2];
      ang = angle;
    }
    ang = (ang >= 0 && ang < 360 ? ang : ang % 360 + (ang < 0 ? 360 : 0)) * MathUtil.PiDividedBy180;
    let iscale;
    if(ang === 90 || ang === -270) {
      iscale = 1.0 / Math.sqrt(v0 * v0 + v1 * v1 + v2 * v2);
      v0 *= iscale;
      v1 *= iscale;
      v2 *= iscale;
      return [v0 * v0, v0 * v1 + v2, v0 * v2 - v1, 0.0,
        v1 * v0 - v2, v1 * v1, v1 * v2 + v0, 0.0,
        v2 * v0 + v1, v2 * v1 - v0, v2 * v2, 0.0,
        0.0, 0.0, 0.0, 1.0];
    }
    if(ang === -90 || ang === 270) {
      iscale = 1.0 / Math.sqrt(v0 * v0 + v1 * v1 + v2 * v2);
      v0 *= iscale;
      v1 *= iscale;
      v2 *= iscale;
      return [v0 * v0, v0 * v1 - v2, v0 * v2 + v1, 0.0,
        v1 * v0 + v2, v1 * v1, v1 * v2 - v0, 0,
        v2 * v0 - v1, v2 * v1 + v0, v2 * v2, 0,
        0.0, 0.0, 0.0, 1.0];
    }
    if(ang === 180 || ang === -180) {
      iscale = 1.0 / Math.sqrt(v0 * v0 + v1 * v1 + v2 * v2);
      v0 *= iscale;
      v1 *= iscale;
      v2 *= iscale;
      return [v0 * v0 * 2.0 - 1.0,
        v0 * v1 * 2.0,
        v0 * v2 * 2.0,
        0.0,
        v1 * v0 * 2.0,
        v1 * v1 * 2.0 - 1.0,
        v1 * v2 * 2.0,
        0.0,
        v2 * v0 * 2.0,
        v2 * v1 * 2.0,
        v2 * v2 * 2.0 - 1.0,
        0.0, 0.0, 0.0, 0.0, 1.0];
    }
    const cost = Math.cos(ang);
    const sint = ang >= 0 && ang < 6.283185307179586 ? ang <= 3.141592653589793 ? Math.sqrt(1.0 - cost * cost) : -Math.sqrt(1.0 - cost * cost) : Math.sin(ang);
    if( v0 === 1 && v1 === 0 && v2 === 0 ) {
      return [1, 0, 0, 0, 0, cost, sint, 0, 0, -sint, cost, 0, 0, 0, 0, 1];
    } else if( v0 === 0 && v1 === 1 && v2 === 0 ) {
      return [cost, 0, -sint, 0, 0, 1, 0, 0, sint, 0, cost, 0, 0, 0, 0, 1];
    } else if( v0 === 0 && v1 === 0 && v2 === 1 ) {
      return [cost, sint, 0, 0, -sint, cost, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1];
    } else if(v0 === 0 && v1 === 0 && v2 === 0) {
      return [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1];
    } else {
      iscale = 1.0 / Math.sqrt(v0 * v0 + v1 * v1 + v2 * v2);
      v0 *= iscale;
      v1 *= iscale;
      v2 *= iscale;
      const x2 = v0 * v0;
      const y2 = v1 * v1;
      const z2 = v2 * v2;
      const xy = v0 * v1;
      const xz = v0 * v2;
      const yz = v1 * v2;
      const xs = v0 * sint;
      const ys = v1 * sint;
      const zs = v2 * sint;
      const mcos = 1.0 - cost;
      v0 = mcos * xy;
      v1 = mcos * xz;
      v2 = mcos * yz;
      return [cost + mcos * x2, v0 + zs, v1 - ys, 0, v0 - zs, cost + mcos * y2, v2 + xs, 0, v1 + ys,
        v2 - xs, cost + mcos * z2, 0, 0, 0, 0, 1];
    }
  },
  /**
   * Multiplies a 4x4 matrix by a scaling transformation.
   * @param {Array<number>} mat 4x4 matrix to multiply.
   * @param {Array<number>|number} v3 Scale factor along the
   * X axis. A scale factor can be negative, in which case the transformation
   * also causes reflection about the corresponding axis.  If "v3y" and "v3z" are omitted, this value can instead
   * be a 3-element array giving the scale factors along the X, Y, and
   * Z axes.
   * @param {number} v3y Scale factor along the Y axis.
   * @param {number} v3z Scale factor along the Z axis.
   * @returns {Array<number>} The resulting 4x4 matrix.
   */
  "mat4scale":function(mat, v3, v3y, v3z) {
    let scaleX;
    let scaleY;
    let scaleZ;
    if(typeof v3y !== "undefined" && typeof v3z !== "undefined") {
      scaleX = v3;
      scaleY = v3y;
      scaleZ = v3z;
    } else {
      scaleX = v3[0];
      scaleY = v3[1];
      scaleZ = v3[2];
    }
    return [
      mat[0] * scaleX, mat[1] * scaleX, mat[2] * scaleX, mat[3] * scaleX,
      mat[4] * scaleY, mat[5] * scaleY, mat[6] * scaleY, mat[7] * scaleY,
      mat[8] * scaleZ, mat[9] * scaleZ, mat[10] * scaleZ, mat[11] * scaleZ,
      mat[12], mat[13], mat[14], mat[15]
    ];
  },
  /**
   * Modifies a 4x4 matrix by multiplying it by a
   * scaling transformation.
   * @param {Array<number>} mat A 4x4 matrix.
   * @param {Array<number>|number} v3 Scale factor along the
   * X axis. A scale factor can be negative, in which case the transformation
   * also causes reflection about the corresponding axis.  If "v3y" and "v3z" are omitted, this value can instead
   * be a 3-element array giving the scale factors along the X, Y, and
   * Z axes.
   * @param {number} [v3y] Scale factor along the Y axis.
   * @param {number} [v3z] Scale factor along the Z axis.
   * @returns {Array<number>} The same parameter as "mat".
   */
  "mat4scaleInPlace":function(mat, v3, v3y, v3z) {
    let x;
    let y;
    let z;
    if(typeof v3y !== "undefined" && typeof v3z !== "undefined") {
      x = v3;
      y = v3y;
      z = v3z;
    } else {
      x = v3[0];
      y = v3[1];
      z = v3[2];
    }
    mat[0] *= x;
    mat[1] *= x;
    mat[2] *= x;
    mat[3] *= x;
    mat[4] *= y;
    mat[5] *= y;
    mat[6] *= y;
    mat[7] *= y;
    mat[8] *= z;
    mat[9] *= z;
    mat[10] *= z;
    mat[11] *= z;
    return mat;
  },

  /**
   * Returns a 4x4 matrix representing a scaling transformation.
   * @param {Array<number>|number} v3 Scale factor along the
   * X axis. A scale factor can be negative, in which case the transformation
   * also causes reflection about the corresponding axis.  If "v3y" and "v3z" are omitted, this value can instead
   * be a 3-element array giving the scale factors along the X, Y, and
   * Z axes.
   * @param {number} v3y Scale factor along the Y axis.
   * @param {number} v3z Scale factor along the Z axis.
   * @returns {Array<number>} The resulting 4x4 matrix.
   */
  "mat4scaled":function(v3, v3y, v3z) {
    if(typeof v3y !== "undefined" && typeof v3z !== "undefined") {
      return [v3, 0, 0, 0, 0, v3y, 0, 0, 0, 0, v3z, 0, 0, 0, 0, 1];
    } else {
      return [v3[0], 0, 0, 0, 0, v3[1], 0, 0, 0, 0, v3[2], 0, 0, 0, 0, 1];
    }
  },
  /**
   * Finds the six clipping planes of a view frustum defined
   * by a 4x4 matrix. These six planes together form the
   * shape of a "chopped-off" pyramid (or frustum).<p>
   * In this model, the "eye" is placed at the top
   * of the pyramid (before being chopped off), four planes are placed at the pyramid's
   * sides, one plane (the far plane) forms its base, and a
   * final plane (the near plane) is the pyramid's chopped
   * off top.
   * @param {Array<number>} matrix A 4x4 matrix. This will
   * usually be a projection-view matrix (projection matrix
   * multiplied by view matrix, in that order).
   * @returns {Array<Array<number>>} An array of six
   * 4-element arrays representing the six clipping planes of the
   * view frustum. In order, they are the left, right, top,
   * bottom, near, and far clipping planes. All six planes
   * will be normalized (see {@link MathUtil.planeNormalizeInPlace}).
   */
  "mat4toFrustumPlanes":function(matrix) {
    const frustum = [[], [], [], [], [], []];
    // Left clipping plane
    frustum[0] = MathUtil.planeNormalizeInPlace([
      matrix[3] + matrix[0],
      matrix[7] + matrix[4],
      matrix[11] + matrix[8],
      matrix[15] + matrix[12]
    ]);
    // Right clipping plane
    frustum[1] = MathUtil.planeNormalizeInPlace([
      matrix[3] - matrix[0],
      matrix[7] - matrix[4],
      matrix[11] - matrix[8],
      matrix[15] - matrix[12]
    ]);
    // Top clipping plane
    frustum[2] = MathUtil.planeNormalizeInPlace([
      matrix[3] - matrix[1],
      matrix[7] - matrix[5],
      matrix[11] - matrix[9],
      matrix[15] - matrix[13]
    ]);
    // Bottom clipping plane
    frustum[3] = MathUtil.planeNormalizeInPlace([
      matrix[3] + matrix[1],
      matrix[7] + matrix[5],
      matrix[11] + matrix[9],
      matrix[15] + matrix[13]
    ]);
    // Near clipping plane
    frustum[4] = MathUtil.planeNormalizeInPlace([
      matrix[3] + matrix[2],
      matrix[7] + matrix[6],
      matrix[11] + matrix[10],
      matrix[15] + matrix[14]
    ]);
    // Far clipping plane
    frustum[5] = MathUtil.planeNormalizeInPlace([
      matrix[3] - matrix[2],
      matrix[7] - matrix[6],
      matrix[11] - matrix[10],
      matrix[15] - matrix[14]
    ]);
    return frustum;
  },
  /**
   * Returns the upper-left part of a 4x4 matrix as a new
   * 3x3 matrix.
   * @param {Array<number>} m4 A 4x4 matrix.
   * @returns {Array<number>} The resulting 3x3 matrix.
   */
  "mat4toMat3":function(m4) {
    return [
      m4[0], m4[1], m4[2],
      m4[4], m4[5], m4[6],
      m4[8], m4[9], m4[10]
    ];
  },
  /**
   * Transforms a 4-element vector with a 4x4 matrix and returns
   * the transformed vector.<p>
   * Transforming a vector (<code>v</code>) with a matrix (<code>mat</code>)
   * is effectively done by breaking up <code>mat</code> into four 4-element vectors
   * (the first 4 elements make up the first vector, and so on), multiplying
   * each vector in <code>mat</code> by the corresponding component in
   * <code>v</code>, and adding up the resulting vectors (except <code>v</code>) to
   * get the transformed vector.
   * @param {Array<number>} mat A 4x4 matrix.
   * @param {Array<number>|number} v X coordinate.
   * If "vy", "vz", and "vw" are omitted, this value can instead
   * be a 4-element array giving the X, Y, Z, and W coordinates.
   * @param {number} [vy] Y coordinate.
   * @param {number} [vz] Z coordinate.
   * @param {number} [vw] W coordinate. To transform a 3D
   * point, set W to 1 and divide the result's X, Y, and Z by the
   * result's W. To transform a 2D point, set Z to 0 and W to 1
   * and divide the result's X and Y by the result's W.
   * @returns {Array<number>} The transformed vector.
   */
  "mat4transform":function(mat, v, vy, vz, vw) {
    let x;
    let y;
    let z;
    let w;
    if(typeof vy !== "undefined" && typeof vz !== "undefined" &&
      typeof vw !== "undefined") {
      x = v;
      y = vy;
      z = vz;
      w = vw;
    } else {
      x = v[0];
      y = v[1];
      z = v[2];
      w = v[3];
    }
    return [x * mat[0] + y * mat[4] + z * mat[8] + w * mat[12],
      x * mat[1] + y * mat[5] + z * mat[9] + w * mat[13],
      x * mat[2] + y * mat[6] + z * mat[10] + w * mat[14],
      x * mat[3] + y * mat[7] + z * mat[11] + w * mat[15]];
  },
  /**
   * Transforms a 3-element vector with a 4x4 matrix as though it were
   * an affine transformation matrix (without perspective) and returns the transformed vector.
   * The effect is as though elements
   * 3, 7, 11, and 15 (counting from 0) of the matrix
   * were assumed to be (0, 0, 0, 1) instead of their actual values and as though the 3-element
   * vector had a fourth element valued at 1.<p>
   * For most purposes, use
   * the {@link MathUtil.mat4projectVec3} method instead, which supports
   * 4x4 matrices that may be in a perspective
   * projection (whose last row is not necessarily (0, 0, 0, 1)).
   * @param {Array<number>} mat A 4x4 matrix.
   * @param {Array<number>|number} v X coordinate.
   * If "vy" and "vz" are omitted, this value can instead
   * be a 4-element array giving the X, Y, and Z coordinates.
   * @param {number} [vy] Y coordinate.
   * @param {number} [vz] Z coordinate. To transform a 2D
   * point, set Z to 0.
   * @returns {Array<number>} The transformed 3-element vector.
   */
  "mat4transformVec3":function(mat, v, vy, vz) {
    let x;
    let y;
    let z;
    if(typeof vy !== "undefined" && typeof vz !== "undefined") {
      x = v;
      y = vy;
      z = vz;
    } else {
      x = v[0];
      y = v[1];
      z = v[2];
    }
    return [x * mat[0] + y * mat[4] + z * mat[8] + mat[12],
      x * mat[1] + y * mat[5] + z * mat[9] + mat[13],
      x * mat[2] + y * mat[6] + z * mat[10] + mat[14]];
  },
  /**
   * Multiplies a 4x4 matrix by a translation transformation.
   * @param {Array<number>} mat The matrix to multiply.
   * @param {Array<number>|number} v3 Translation along the
   * X axis.  If "v3y" and "v3z" are omitted, this value can instead
   * be a 3-element array giving the translations along the X, Y, and
   * Z axes.
   * @param {number} v3y Translation along the Y axis.
   * @param {number} v3z Translation along the Z axis.
   * @returns {Array<number>} The resulting 4x4 matrix.
   */
  "mat4translate":function(mat, v3, v3y, v3z) {
    let x;
    let y;
    let z;
    if(typeof v3y !== "undefined" && typeof v3z !== "undefined") {
      x = v3;
      y = v3y;
      z = v3z;
    } else {
      x = v3[0];
      y = v3[1];
      z = v3[2];
    }
    return [
      mat[0], mat[1], mat[2], mat[3],
      mat[4], mat[5], mat[6], mat[7],
      mat[8], mat[9], mat[10], mat[11],
      mat[0] * x + mat[4] * y + mat[8] * z + mat[12],
      mat[1] * x + mat[5] * y + mat[9] * z + mat[13],
      mat[2] * x + mat[6] * y + mat[10] * z + mat[14],
      mat[3] * x + mat[7] * y + mat[11] * z + mat[15]
    ];
  },
  /**
   * Returns a 4x4 matrix representing a translation.
   * @param {Array<number>|number} v3 Translation along the
   * X axis.  If "v3y" and "v3z" are omitted, this value can instead
   * be a 3-element array giving the translations along the X, Y, and
   * Z axes.
   * @param {number} v3y Translation along the Y axis.
   * @param {number} v3z Translation along the Z axis.
   * @returns {Array<number>} The resulting 4x4 matrix.
   */
  "mat4translated":function(v3, v3y, v3z) {
    let x;
    let y;
    let z;
    if(typeof v3y !== "undefined" && typeof v3z !== "undefined") {
      x = v3;
      y = v3y;
      z = v3z;
    } else {
      x = v3[0];
      y = v3[1];
      z = v3[2];
    }
    return [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, x, y, z, 1];
  },
  /**
   * Returns the transpose of a 4x4 matrix. (A transpose is a
   * matrix whose rows are converted to columns and vice versa.)
   * @param {Array<number>} m4 A 4x4 matrix.
   * @returns {Array<number>} The resulting 4x4 matrix.
   */
  "mat4transpose":function(m4) {
    return MathUtil.mat4transposeInPlace(MathUtil.mat4copy(m4));
  },
  /**
   * Transposes a 4x4 matrix in place without creating
   * a new matrix. (A transpose is a matrix whose rows
   * are converted to columns and vice versa.)
   * @param {Array<number>} mat A 4x4 matrix.
   * @returns {Array<number>} The parameter "mat".
   */
  "mat4transposeInPlace":function(mat) {
    let tmp = mat[1]; mat[1] = mat[4]; mat[4] = tmp;
    tmp = mat[2]; mat[2] = mat[8]; mat[8] = tmp;
    tmp = mat[3]; mat[3] = mat[12]; mat[12] = tmp;
    tmp = mat[6]; mat[6] = mat[9]; mat[9] = tmp;
    tmp = mat[7]; mat[7] = mat[13]; mat[13] = tmp;
    tmp = mat[11]; mat[11] = mat[14]; mat[14] = tmp;
    return mat;
  },
  /**
   * Creates a plane from a normal vector and a point on the plane.
   * @param {Array<number>} normal A three-element array identifying the plane's normal vector.
   * @param {Array<number>} point A three-element array identifying a point on the plane.
   * @returns {Array<number>} A four-element array describing the plane.
   */
  "planeFromNormalAndPoint":function(normal, point) {
    const d = -(normal[0] * point[0] + normal[1] * point[1] + normal[2] * point[2]);
    return [normal[0], normal[1], normal[2], d];
  },
  /**
   * Normalizes this plane so that its normal is a [unit vector]{@tutorial glmath},
   * unless all the normal's components are 0, and returns a new plane with the result.
   * The plane's distance will be divided by the
   * normal's length. Returns a new plane.
   * @param {Array<number>} plane A four-element array
   * defining the plane. The first three elements of the array
   * are the X, Y, and Z components of the plane's normal vector, and
   * the fourth element is the shortest distance from the plane
   * to the origin, or if negative, from the origin to the plane,
   * divided by the normal's length.
   * @returns {Array<number>} A normalized version of
   * the plane.
   * Note that due to rounding error, the length of the plane's normal might not be exactly equal to 1, and that the vector will remain unchanged if its length is 0 or extremely close to 0.
   */
  "planeNormalize":function(plane) {
    return MathUtil.planeNormalizeInPlace(MathUtil.vec4copy(plane));
  },
  /**
   * Normalizes this plane so that its normal is a [unit vector]{@tutorial glmath},
   * unless all the normal's components are 0, and sets this plane to the result.
   * The plane's distance will be divided by the
   * current normal's length.<p>
   * @param {Array<number>} plane A four-element array
   * defining the plane. The first three elements of the array
   * are the X, Y, and Z components of the plane's normal vector, and
   * the fourth element is the shortest distance from the plane
   * to the origin, or if negative, from the origin to the plane,
   * divided by the normal's length.
   * @returns {Array<number>} The parameter "plane".
   */
  "planeNormalizeInPlace":function(plane) {
    const x = plane[0];
    const y = plane[1];
    const z = plane[2];

    let len = Math.sqrt(x * x + y * y + z * z);
    if(len !== 0) {
      len = 1.0 / len;
      plane[0] *= len;
      plane[1] *= len;
      plane[2] *= len;
      plane[3] *= len;
    }
    return plane;
  },
  /**
   * Returns a quaternion that describes a rotation that undoes the given rotation (an "inverted" rotation); this is done by reversing the sign of the X, Y, and Z components (which describe the quaternion's [axis of rotation]{@tutorial glmath}). The return value won't necessarily be a [unit vector]{@tutorial glmath}.
   * @param {Array<number>} quat A quaternion, containing four elements.
   * @returns {Array<number>} Return value. */
  "quatConjugate":function(quat) {
    return [-quat[0], -quat[1], -quat[2], quat[3]];
  },
  /**
   * Generates a quaternion from a rotation transformation that rotates vectors
   * by the given rotation angle and around the given [axis of rotation]{@tutorial glmath},
   * @param {Array<number>|number} angle The desired angle
   * to rotate in degrees.  If "v", "vy", and "vz" are omitted, this can
   * instead be a 4-element array giving the axis
   * of rotation as the first three elements, followed by the angle
   * in degrees as the fourth element.
   * @param {Array<number>|number} v X-component of the point lying on the axis
   * of rotation.  If "vy" and "vz" are omitted, this can
   * instead be a 3-element array giving the axis
   * of rotation.
   * @param {number} vy Y-component of the point lying on the axis
   * of rotation.
   * @param {number} vz Z-component of the point lying on the axis
   * of rotation.
   * @returns {Array<number>} The generated quaternion.
   * A quaternion's first three elements (X, Y, Z) describe an
   * [axis of rotation]{@tutorial glmath} whose length is the sine of half of "angle",
   * and its fourth element (W) is the cosine of half of "angle".
   */
  "quatFromAxisAngle":function(angle, v, vy, vz) {
    let v0;
    let v1;
    let v2;
    let ang;
    if(typeof vy !== "undefined" && typeof vz !== "undefined") {
      v0 = v;
      v1 = vy;
      v2 = vz;
      ang = (angle >= 0 && angle < 360 ? angle : angle % 360 + (angle < 0 ? 360 : 0)) * MathUtil.PiDividedBy360;
    } else if(typeof v === "undefined") {
      v0 = angle[0];
      v1 = angle[1];
      v2 = angle[2];
      ang = angle[3];
      ang = (angle >= 0 && angle < 360 ? angle : angle % 360 + (angle < 0 ? 360 : 0)) * MathUtil.PiDividedBy360;
    } else {
      v0 = v[0];
      v1 = v[1];
      v2 = v[2];
      ang = (angle >= 0 && angle < 360 ? angle : angle % 360 + (angle < 0 ? 360 : 0)) * MathUtil.PiDividedBy360;
    }
    const cost = Math.cos(ang);
    const sint = ang >= 0 && ang < 6.283185307179586 ? ang <= 3.141592653589793 ? Math.sqrt(1.0 - cost * cost) : -Math.sqrt(1.0 - cost * cost) : Math.sin(ang);
    const vec = MathUtil.vec3normalizeInPlace([v0, v1, v2]);
    const ret = [vec[0], vec[1], vec[2], cost];
    ret[0] *= sint;
    ret[1] *= sint;
    ret[2] *= sint;
    return ret;
  },
  /**
   * Generates a quaternion from the vector rotation described in a 4x4 matrix.
   * The upper 3x3 portion of the matrix is used for this calculation.
   * The results are undefined if the matrix includes any transformation
   * other than rotation.
   * @param {Array<number>} m A 4x4 matrix.
   * @returns {Array<number>} The resulting quaternion.
   */
  "quatFromMat4":function(m) {
    const ret = [];
    const xy = m[1];
    const xz = m[2];
    const yx = m[4];
    const yz = m[6];
    const zx = m[8];
    const zy = m[9];
    const trace = m[0] + m[5] + m[10];
    let s;
    let t;
    if (trace >= 0.0) {
      s = Math.sqrt(trace + 1.0) * 0.5;
      t = 0.25 / s;
      ret[0] = (yz - zy) * t;
      ret[1] = (zx - xz) * t;
      ret[2] = (xy - yx) * t;
      ret[3] = s;
    } else if(m[0] > m[5] && m[0] > m[10]) {
      // s=4*x
      s = Math.sqrt(1.0 + m[0] - m[5] - m[10]) * 0.5;
      t = 0.25 / s;
      ret[0] = s;
      ret[1] = (yx + xy) * t;
      ret[2] = (xz + zx) * t;
      ret[3] = (yz - zy) * t;
    } else if(m[5] > m[10]) {
      // s=4*y
      s = Math.sqrt(1.0 + m[5] - m[0] - m[10]) * 0.5;
      t = 0.25 / s;
      ret[0] = (yx + xy) * t;
      ret[1] = s;
      ret[2] = (zy + yz) * t;
      ret[3] = (zx - xz) * t;
    } else{
      // s=4*z
      s = Math.sqrt(1.0 + m[10] - m[0] - m[5]) * 0.5;
      t = 0.25 / s;
      ret[0] = (zx + xz) * t;
      ret[1] = (zy + yz) * t;
      ret[2] = s;
      ret[3] = (xy - yx) * t;
    }
    return ret;
  },
  /**
   * Generates a quaternion from pitch, yaw and roll angles (or <i>Tait&ndash;Bryan angles</i>).
   * See "Axis of Rotation" in "{@tutorial glmath}" for the meaning of each angle.
   * @param {number} pitchDegrees Vector rotation about the X axis (upward or downward turn), in degrees.
   * This can instead be a 3-element
   * array giving the rotation about the X axis, Y axis, and Z axis,
   * respectively.
   * @param {number} yawDegrees Vector rotation about the Y axis (left or right turn), in degrees.
   * May be null or omitted if "pitchDegrees" is an array.
   * @param {number} rollDegrees Vector rotation about the Z axis (swaying side by side), in degrees.
   * May be null or omitted if "pitchDegrees" is an array.
   * @param {number} [mode] Specifies the order in which the rotations will occur (in terms of their effect).
   * This is one of the {@link MathUtil} constants such as {@link MathUtil.LocalPitchYawRoll}
   * and {@link MathUtil.GlobalYawRollPitch}. If null, undefined, or omitted, the default is {@link MathUtil.GlobalRollPitchYaw}.
   * The constants starting with <code>Global</code>
   * describe a vector rotation in the order given, each about the original axes (these angles are also called <i>extrinsic</i>
   * angles). The constants starting with <code>Local</code> describe a vector rotation in the order given,
   * where the second and third rotations occur around the rotated object's new axes
   * and not necessarily the original axes (these angles are also called <i>intrinsic</i>
   * angles). The order of <code>Local</code> rotations has the same result as the reversed
   * order of <code>Global</code> rotations and vice versa.
   * @returns {Array<number>} The generated quaternion.
   */
  "quatFromTaitBryan":function(pitchDegrees, yawDegrees, rollDegrees, mode) {
    let rollRad;
    let pitchRad;
    let yawRad;
    if(typeof mode === "undefined" || mode === null)mode = MathUtil.GlobalRollPitchYaw;
    if(mode < 0 || mode >= 6)throw new Error("invalid mode");
    if(pitchDegrees.constructor === Array) {
      rollRad = (pitchDegrees[2] >= 0 && pitchDegrees[2] < 360 ? pitchDegrees[2] : pitchDegrees[2] % 360 + (pitchDegrees[2] < 0 ? 360 : 0)) * MathUtil.PiDividedBy360;
      pitchRad = (pitchDegrees[0] >= 0 && pitchDegrees[0] < 360 ? pitchDegrees[0] : pitchDegrees[0] % 360 + (pitchDegrees[0] < 0 ? 360 : 0)) * MathUtil.PiDividedBy360;
      yawRad = (pitchDegrees[1] >= 0 && pitchDegrees[1] < 360 ? pitchDegrees[1] : pitchDegrees[1] % 360 + (pitchDegrees[1] < 0 ? 360 : 0)) * MathUtil.PiDividedBy360;
    } else {
      rollRad = (rollDegrees >= 0 && rollDegrees < 360 ? rollDegrees : rollDegrees % 360 + (rollDegrees < 0 ? 360 : 0)) * MathUtil.PiDividedBy360;
      pitchRad = (pitchDegrees >= 0 && pitchDegrees < 360 ? pitchDegrees : pitchDegrees % 360 + (pitchDegrees < 0 ? 360 : 0)) * MathUtil.PiDividedBy360;
      yawRad = (yawDegrees >= 0 && yawDegrees < 360 ? yawDegrees : yawDegrees % 360 + (yawDegrees < 0 ? 360 : 0)) * MathUtil.PiDividedBy360;
    }
    const py = Math.cos(pitchRad);
    const px = pitchRad >= 0 && pitchRad < 6.283185307179586 ? pitchRad <= 3.141592653589793 ? Math.sqrt(1.0 - py * py) : -Math.sqrt(1.0 - py * py) : Math.sin(pitchRad);
    const yy = Math.cos(yawRad);
    const yx = yawRad >= 0 && yawRad < 6.283185307179586 ? yawRad <= 3.141592653589793 ? Math.sqrt(1.0 - yy * yy) : -Math.sqrt(1.0 - yy * yy) : Math.sin(yawRad);
    const ry = Math.cos(rollRad);
    const rx = rollRad >= 0 && rollRad < 6.283185307179586 ? rollRad <= 3.141592653589793 ? Math.sqrt(1.0 - ry * ry) : -Math.sqrt(1.0 - ry * ry) : Math.sin(rollRad);
    let t8;
    let t7;
    if(mode === MathUtil.GlobalPitchYawRoll || mode === MathUtil.GlobalPitchRollYaw) {
      t7 = [rx * yx, ry * yx, rx * yy, ry * yy];
      if(mode === MathUtil.GlobalPitchYawRoll)t7[0] = -t7[0];
      t8 = [t7[3] * px + t7[0] * py, t7[1] * py + t7[2] * px, t7[2] * py - t7[1] * px, t7[3] * py - t7[0] * px];
    } else if(mode === MathUtil.GlobalYawPitchRoll || mode === MathUtil.GlobalYawRollPitch) {
      t7 = [ry * px, rx * px, rx * py, ry * py];
      if(mode === MathUtil.GlobalYawRollPitch)t7[1] = -t7[1];
      t8 = [t7[0] * yy - t7[2] * yx, t7[3] * yx + t7[1] * yy, t7[2] * yy + t7[0] * yx, t7[3] * yy - t7[1] * yx];
    } else {
      t7 = [yy * px, yx * py, yx * px, yy * py];
      if(mode === MathUtil.GlobalRollPitchYaw)t7[2] = -t7[2];
      t8 = [t7[0] * ry + t7[1] * rx, t7[1] * ry - t7[0] * rx, t7[3] * rx + t7[2] * ry, t7[3] * ry - t7[2] * rx];
    }
    return t8;
  },
  /**
   * Generates a quaternion describing a rotation between
   * two 3-element vectors. The quaternion
   * will describe the rotation required to rotate
   * the ray described in the first vector toward the ray described
   * in the second vector. The vectors need not be [unit vectors]{@tutorial glmath}.
   * @param {Array<number>} vec1 The first 3-element vector.
   * @param {Array<number>} vec2 The second 3-element vector.
   * @returns {Array<number>} The generated quaternion, which
   * will be a unit vector.
   */
  "quatFromVectors":function(vec1, vec2) {
    let ret = MathUtil.vec3cross(vec1, vec2);
    if(MathUtil.vec3dot(ret, ret) < 1e-9) {
      // The vectors are parallel or close to parallel; there are two possible cases
      const dot = MathUtil.vec3dot(vec1, vec2);
      if(dot > 0) {
        // The vectors point in the same direction or almost so
        return [0, 0, 0, 1];
      } else {
        // The vectors point in opposite directions
        ret = MathUtil.vec3perp(vec1);
        ret[3] = 0;
      }
    } else {
      let vecLengths = MathUtil.vec3length(vec1) * MathUtil.vec3length(vec2);
      if(vecLengths === 0)vecLengths = 1; // degenerate case
      ret[3] = vecLengths + MathUtil.vec3dot(vec1, vec2);
    }
    return MathUtil.quatNormalizeInPlace(ret);
  },
  /** Returns the identity quaternion of multiplication, (0, 0, 0, 1).
   * @returns {Array<number>} Return value.
   */
  "quatIdentity":function() {
    return [0, 0, 0, 1];
  },
  /**
   * Returns a quaternion that describes a rotation that undoes the given rotation (an "inverted" rotation) and is converted to a [unit vector]{@tutorial glmath}.
   * @param {Array<number>} quat A quaternion, containing four elements.
   * @returns {Array<number>} Return value.
   * @see {@link MathUtil.quatConjugate}
   */
  "quatInvert":function(quat) {
    const lsq = 1.0 / MathUtil.quatDot(quat, quat);
    return MathUtil.vec4scaleInPlace(
      MathUtil.quatConjugate(quat), lsq);
  },
  /**
   * Returns whether this quaternion is the identity quaternion, (0, 0, 0, 1).
   * @param {Array<number>} quat A quaternion, containing four elements.
   * @returns {boolean} Return value.
   */
  "quatIsIdentity":function(quat) {
    return quat[0] === 0 && quat[1] === 0 && quat[2] === 0 && quat[3] === 1;
  },
  /**
   * Multiplies two quaternions, creating a composite rotation.
   * The quaternions are multiplied such that the second quaternion's
   * rotation happens before the first quaternion's rotation when applied
   * in the global coordinate frame.<p>
   * If both quaternions are [unit vectors]{@tutorial glmath}, the resulting
   * quaternion will also be a unit vector. However, for best results, you should
   * normalize the quaternions every few multiplications (using
   * {@link MathUtil.quatNormalize} or {@link MathUtil.quatNormalizeInPlace}), since successive
   * multiplications can cause rounding errors.<p>
   * Quaternion multiplication is not commutative except in the last component
   * of the resulting quaternion, since the definition of quaternion multiplication
   * includes taking a cross product of <code>a</code>'s and <code>b</code>'s first three components,
   * in that order, and the cross product is not commutative (see also {@link MathUtil.vec3cross}).
   * @param {Array<number>} a The first quaternion.
   * @param {Array<number>} b The second quaternion.
   * @returns {Array<number>} The resulting quaternion.
   */
  "quatMultiply":function(a, b) {
    return [
      a[3] * b[0] + a[0] * b[3] + a[1] * b[2] - a[2] * b[1],
      a[3] * b[1] + a[1] * b[3] + a[2] * b[0] - a[0] * b[2],
      a[3] * b[2] + a[2] * b[3] + a[0] * b[1] - a[1] * b[0],
      a[3] * b[3] - a[0] * b[0] - a[1] * b[1] - a[2] * b[2]];
  },
  /**
   * Returns a quaternion that lies along the shortest path between the
   * given two quaternion rotations, using a linear interpolation function, and converts
   * it to a [unit vector]{@tutorial glmath}.
   * This is called a normalized linear interpolation, or "nlerp".<p>
   * Because the shortest path is curved, not straight, this method
   * will generally not interpolate at constant velocity;
   * however, the difference in this velocity when interpolating is
   * rarely noticeable and this method is generally faster than
   * the {@link MathUtil.quatSlerp} method.
   * @param {Array<number>} q1 The first quaternion. Must be a unit vector.
   * @param {Array<number>} q2 The second quaternion. Must be a unit vector.
   * @param {number} factor A value that usually ranges from 0 through 1. Closer to 0 means
   * closer to q1, and closer to 1 means closer to q2.
   * @returns {Array<number>} The interpolated quaternion,
   * which will be a unit vector.
   */
  "quatNlerp":function(q1, q2, factor) {
    const t1 = 1.0 - factor;
    const t2 = q1[0] * t1;
    const t3 = q1[1] * t1;
    const t4 = q1[2] * t1;
    const t5 = q1[3] * t1;
    const t6 = q2[0] * factor;
    const t7 = q2[1] * factor;
    const t8 = q2[2] * factor;
    const t9 = q2[3] * factor;
    const t10 = q1[0] * q2[0] + q1[1] * q2[1] + q1[2] * q2[2] + q1[3] * q2[3];
    if (t10 < 0.0) {
      return MathUtil.quatNormalizeInPlace([t2 - t6, t3 - t7, t4 - t8, t5 - t9]);
    } else {
      return MathUtil.quatNormalizeInPlace([t2 + t6, t3 + t7, t4 + t8, t5 + t9]);
    }
  },
  /**
   * Multiplies a quaternion by a rotation transformation that rotates vectors
   * by the given rotation angle and around the given [axis of rotation]{@tutorial glmath}.
   * The result is such that the angle-axis
   * rotation happens before the quaternion's rotation when applied
   * in the global coordinate frame.<p>
   * This method is equivalent to the following (see also {@link MathUtil.quatMultiply}):<pre>
   * return quatMultiply(quat,quatFromAxisAngle(angle,v,vy,vz));
   * </pre>
   * @param {Array<number>} quat Quaternion to rotate.
   * @param {Array<number>|number} angle The desired angle
   * to rotate in degrees.  If "v", "vy", and "vz" are omitted, this can
   * instead be a 4-element array giving the axis
   * of rotation as the first three elements, followed by the angle
   * in degrees as the fourth element.
   * @param {Array<number>|number} v X-component of the point lying on the axis
   * of rotation.  If "vy" and "vz" are omitted, this can
   * instead be a 3-element array giving the axis
   * of rotation.
   * @param {number} vy Y-component of the point lying on the axis
   * of rotation.
   * @param {number} vz Z-component of the point lying on the axis
   * of rotation.
   * @returns {Array<number>} The resulting quaternion.
   */
  "quatRotate":function(quat, angle, v, vy, vz) {
    return MathUtil.quatMultiply(quat,
      MathUtil.quatFromAxisAngle(angle, v, vy, vz));
  },
  /**
   * Returns a quaternion that lies along the shortest path between the
   * given two quaternion rotations, using a spherical interpolation function.
   * This is called spherical linear interpolation, or "slerp". (A spherical
   * interpolation finds the shortest angle between the two quaternions -- which
   * are treated as 4D vectors -- and then finds a vector with a smaller angle
   * between it and the first quaternion.  The "factor" parameter specifies
   * how small the new angle will be relative to the original angle.)<p>
   * This method will generally interpolate at constant velocity; however,
   * this method is not commutative (that is, the order in which the quaternions are given
   * matters), unlike [quatNlerp]{@link MathUtil.quatNlerp}, making it
   * unsuitable for blending multiple quaternion rotations,
   * and this method is generally more computationally expensive
   * than the [quatNlerp]{@link MathUtil.quatNlerp} method.
   * @param {Array<number>} q1 The first quaternion. Must be a [unit vector]{@tutorial glmath}.
   * @param {Array<number>} q2 The second quaternion. Must be a unit vector.
   * @param {number} factor A value that usually ranges from 0 through 1. Closer to 0 means
   * closer to q1, and closer to 1 means closer to q2.
   * @returns {Array<number>} The interpolated quaternion.
   * @see ["Understanding Slerp, Then Not Using It", Jonathan Blow](http://number-none.com/product/Understanding%20Slerp,%20Then%20Not%20Using%20It/),
   * for additional background
   */
  "quatSlerp":function(q1, q2, factor) {
    let cosval = MathUtil.quatDot(q1, q2);
    let qd = q2;
    if(cosval < 0) {
      qd = [-q2[0], -q2[1], -q2[2], -q2[3]];
      cosval = MathUtil.quatDot(q1, qd);
    }
    let angle = 0;
    if(cosval > -1) {
      if(cosval < 1) {
        angle = Math.acos(cosval);
        if(angle === 0)
          return MathUtil.quatNlerp(q1, q2, factor);
      } else {
        return MathUtil.quatNlerp(q1, q2, factor);
      }
    } else {
      angle = Math.PI;
    }
    const s = Math.sin(angle);
    const sinv = 1.0 / s;
    const c1 = Math.sin((1.0 - factor) * angle) * sinv;
    const c2 = Math.sin(factor * angle) * sinv;
    return [
      q1[0] * c1 + qd[0] * c2,
      q1[1] * c1 + qd[1] * c2,
      q1[2] * c1 + qd[2] * c2,
      q1[3] * c1 + qd[3] * c2
    ];
  },
  /**
   * Calculates the vector rotation for this quaternion in the form
   * of the angle to rotate the vector by and an [axis of rotation]{@tutorial glmath} to
   * rotate that vector around.
   * @param {Array<number>} a A quaternion. Must be a [unit vector]{@tutorial glmath}.
   * @returns {Array<number>} A 4-element array giving the axis
   * of rotation as the first three elements, followed by the angle
   * in degrees as the fourth element. If "a" is a unit vector, the axis
   * of rotation will be a unit vector.
   */
  "quatToAxisAngle":function(a) {
    const w = a[3];
    let d = 1.0 - w * w;
    if(d > 0) {
      d = 1 / Math.sqrt(d);
      return [a[0] * d, a[1] * d, a[2] * d,
        Math.acos(Math.min(1.0, Math.max(0.0, w))) * MathUtil.Num360DividedByPi];
    } else {
      return [0, 1, 0, 0];
    }
  },
  /**
   * Generates a 4x4 matrix describing the rotation
   * described by this quaternion.
   * @param {Array<number>} quat A quaternion, containing four elements.
   * @returns {Array<number>} The generated 4x4 matrix.
   */
  "quatToMat4":function(quat) {
    const tx = 2.0 * quat[0];

    const ty = 2.0 * quat[1];

    const tz = 2.0 * quat[2];

    const xx = tx * quat[0];

    const xy = tx * quat[1];

    const xz = tx * quat[2];

    const yy = ty * quat[1];

    const yz = tz * quat[1];

    const zz = tz * quat[2];

    const wx = tx * quat[3];

    const wy = ty * quat[3];

    const wz = tz * quat[3];
    return [
      1 - (yy + zz), xy + wz, xz - wy, 0,
      xy - wz, 1 - (xx + zz), yz + wx, 0,
      xz + wy, yz - wx, 1 - (xx + yy), 0,
      0, 0, 0, 1
    ];
  },
  /**
   * Converts this quaternion to the same version of the rotation
   * in the form of pitch, yaw, and roll angles (or <i>Tait&ndash;Bryan angles</i>).
   * @param {Array<number>} a A quaternion. Should be a [unit vector]{@tutorial glmath}.
   * @param {number} [mode] Specifies the order in which the rotations will occur
   * (in terms of their effect, not in terms of how they will be returned by this method).
   * This is one of the {@link MathUtil} constants such as {@link MathUtil.LocalPitchYawRoll}
   * and {@link MathUtil.GlobalYawRollPitch}. If null, undefined, or omitted, the default is {@link MathUtil.GlobalRollPitchYaw}.
   * The constants starting with <code>Global</code>
   * describe a vector rotation in the order given, each about the original axes (these angles are also called <i>extrinsic</i>
   * angles). The constants starting with <code>Local</code> describe a vector rotation in the order given,
   * where the second and third rotations occur around the rotated object's new axes
   * and not necessarily the original axes (these angles are also called <i>intrinsic</i>
   * angles). The order of <code>Local</code> rotations has the same result as the reversed
   * order of <code>Global</code> rotations and vice versa.
   * @returns {Array<number>} A 3-element array containing the
   * pitch, yaw, and roll angles (X, Y, and Z axis angles), in that order and in degrees, by which to rotate vectors.
   * See "Axis of Rotation" in "{@tutorial glmath}" for the meaning of each angle.
   */
  "quatToTaitBryan":function(a, mode) {
    const c0 = a[3];
    let c1;
    let c2;
    let c3;
    let e = 1;
    if(typeof mode === "undefined" || mode === null)mode = MathUtil.GlobalRollPitchYaw;
    if(mode < 0 || mode >= 6)throw new Error("invalid mode");
    if(mode === MathUtil.GlobalRollPitchYaw) {
      c1 = a[1]; c2 = a[0]; c3 = a[2];
      e = -1;
    } else if(mode === MathUtil.GlobalPitchYawRoll) {
      c1 = a[2]; c2 = a[1]; c3 = a[0];
      e = -1;
    } else if(mode === MathUtil.GlobalPitchRollYaw) {
      c1 = a[1]; c2 = a[2]; c3 = a[0];
    } else if(mode === MathUtil.GlobalYawPitchRoll) {
      c1 = a[2]; c2 = a[0]; c3 = a[1];
    } else if(mode === MathUtil.GlobalYawRollPitch) {
      c1 = a[0]; c2 = a[2]; c3 = a[1];
      e = -1;
    } else {
      c1 = a[0]; c2 = a[1]; c3 = a[2];
    }
    const sq1 = c1 * c1;
    const sq2 = c2 * c2;
    const sq3 = c3 * c3;
    let e1 = Math.atan2(2 * (c0 * c1 - e * c2 * c3), 1 - (sq1 + sq2) * 2);
    let sine = 2 * (c0 * c2 + e * c1 * c3);
    if(sine > 1.0)sine = 1.0; // for stability
    if(sine < -1.0)sine = -1.0; // for stability
    let e2 = Math.asin(sine);
    let e3 = Math.atan2(2 * (c0 * c3 - e * c1 * c2), 1 - (sq2 + sq3) * 2);
    e1 *= MathUtil.Num180DividedByPi;
    e2 *= MathUtil.Num180DividedByPi;
    e3 *= MathUtil.Num180DividedByPi;
    // Singularity near the poles
    if(Math.abs(e2 - 90) < 0.000001 ||
      Math.abs(e2 + 90) < 0.000001) {
      e3 = 0;
      e1 = Math.atan2(c1, c0) * MathUtil.Num180DividedByPi;
      if(isNaN(e1))e1 = 0;
    }
    // Return the pitch/yaw/roll angles in the standard order
    const angles = [];
    if(mode === MathUtil.GlobalRollPitchYaw) {
      angles[0] = e2; angles[1] = e1; angles[2] = e3;
    } else if(mode === MathUtil.GlobalPitchYawRoll) {
      angles[0] = e3; angles[1] = e2; angles[2] = e1;
    } else if(mode === MathUtil.GlobalPitchRollYaw) {
      angles[0] = e3; angles[1] = e1; angles[2] = e2;
    } else if(mode === MathUtil.GlobalYawPitchRoll) {
      angles[0] = e2; angles[1] = e3; angles[2] = e1;
    } else if(mode === MathUtil.GlobalYawRollPitch) {
      angles[0] = e1; angles[1] = e3; angles[2] = e2;
    } else {
      angles[0] = e1; angles[1] = e2; angles[2] = e3;
    }
    return angles;
  },
  /**
   * Transforms a 3- or 4-element vector using a
   * quaternion's vector rotation.
   * @param {Array<number>} q A quaternion describing
   * the rotation.
   * @param {Array<number>} v A 3- or 4-element vector to
   * transform. The fourth element, if any, is ignored.
   * @returns {Array<number>} A 4-element vector representing
   * the transformed vector. The fourth element will be 1.0.
   * If the input vector has 3 elements, a 3-element vector will
   * be returned instead.
   */
  "quatTransform":function(q, v) {
    const t1 = q[1] * v[2] - q[2] * v[1] + v[0] * q[3];
    const t2 = q[2] * v[0] - q[0] * v[2] + v[1] * q[3];
    const t3 = q[0] * v[1] - q[1] * v[0] + v[2] * q[3];
    const t4 = q[0] * v[0] + q[1] * v[1] + q[2] * v[2];
    if(v.length === 3) {
      return [t1 * q[3] - (t2 * q[2] - t3 * q[1]) + q[0] * t4,
        t2 * q[3] - (t3 * q[0] - t1 * q[2]) + q[1] * t4,
        t3 * q[3] - (t1 * q[1] - t2 * q[0]) + q[2] * t4];
    }
    return [t1 * q[3] - (t2 * q[2] - t3 * q[1]) + q[0] * t4,
      t2 * q[3] - (t3 * q[0] - t1 * q[2]) + q[1] * t4,
      t3 * q[3] - (t1 * q[1] - t2 * q[0]) + q[2] * t4, 1.0];
  },
  /**
   * Returns a new 2-element
   * vector with the absolute value of each of its components.
   * @param {Array<number>} a A 2-element vector.
   * @returns {Array<number>} The resulting 2-element vector.
   */
  "vec2abs":function(a) {
    return [Math.abs(a[0]), Math.abs(a[1])];
  },
  /**
   * Sets each component of the given 2-element
   * vector to its absolute value.
   * @param {Array<number>} a A 2-element vector.
   * @returns {Array<number>} The vector "a".
   */
  "vec2absInPlace":function(a) {
    a[0] = Math.abs(a[0]);
    a[1] = Math.abs(a[1]);
    return a;
  },
  /**
   * Adds two 2-element vectors and returns a new
   * vector with the result. Adding two vectors
   * is the same as adding each of their components.
   * The resulting vector:<ul>
   * <li>describes a straight-line path for the
   * combined paths described by the given vectors, in either order, and
   * <li>will come "between" the two vectors given (at their shortest angle) if all three start
   * at the same position.</ul>
   * @param {Array<number>} a The first 2-element vector.
   * @param {Array<number>} b The second 2-element vector.
   * @returns {Array<number>} The resulting 2-element vector.
   */
  "vec2add":function(a, b) {
    return [a[0] + b[0], a[1] + b[1]];
  },
  /**
   * Adds two 2-element vectors and stores
   * the result in the first vector. Adding two vectors
   * is the same as adding each of their components.
   * The resulting vector:<ul>
   * <li>describes a straight-line path for the
   * combined paths described by the given vectors, in either order, and
   * <li>will come "between" the two vectors given (at their shortest angle) if all three start
   * at the same position.</ul>
   * @param {Array<number>} a The first 2-element vector.
   * @param {Array<number>} b The second 2-element vector.
   * @returns {Array<number>} The parameter "a"
   */
  "vec2addInPlace":function(a, b) {
    // Use variables in case a and b are the same
    const b0 = b[0];
    const b1 = b[1];
    a[0] += b0;
    a[1] += b1;
    return a;
  },
  /**
   * Assigns the values of a 2-element vector into another
   * 2-element vector.
   * @param {Array<number>} dst The 2-element vector to
   * assign to.
   * @param {Array<number>} src The 2-element vector whose
   * values will be copied.
   * @returns {Array<number>} The parameter "dst"
   */
  "vec2assign":function(dst, src) {
    dst[0] = src[0];
    dst[1] = src[1];
    return dst;
  },
  /**
   * Returns a 2-element vector in which each element of the given 2-element vector is clamped
   * so it's not less than one value or greater than another value.
   * @param {Array<number>} a The vector to clamp.
   * @param {number} min Lowest possible value. Should not be greater than "max".
   * @param {number} max Highest possible value. Should not be less than "min".
   * @returns {Array<number>} The resulting vector. */
  "vec2clamp":function(a, min, max) {
    return MathUtil.vec2clampInPlace(MathUtil.vec2copy(a), min, max);
  },
  /**
   * Clamps each element of the given 2-element vector
   * so it's not less than one value or greater than another value.
   * @param {Array<number>} a The vector to clamp.
   * @param {number} min Lowest possible value. Should not be greater than "max".
   * @param {number} max Highest possible value. Should not be less than "min".
   * @returns {Array<number>} The resulting vector. */
  "vec2clampInPlace":function(a, min, max) {
    const x = Math.min(max, Math.max(min, a[0]));
    const y = Math.min(max, Math.max(min, a[1]));
    a[0] = x;
    a[1] = y;
    return a;
  },
  /**
   * Returns a copy of a 2-element vector.
   * @param {Array<number>} vec A 2-element vector.
   * @returns {Array<number>} Return value. */
  "vec2copy":function(vec) {
    return [vec[0], vec[1]];
  },
  /**
   * Finds the straight-line distance from one three-element vector
   * to another, treating both as 3D points.
   * @param {Array<number>} vecFrom The first 2-element vector.
   * @param {Array<number>} vecTo The second 2-element vector.
   * @returns {number} The distance between the two vectors.
   */
  "vec2dist":function(vecFrom, vecTo) {
    return MathUtil.vec2length(MathUtil.vec2sub(vecFrom, vecTo));
  },
  /**
   * Finds the dot product of two 2-element vectors. It's the
   * sum of the products of their components (for example, <b>a</b>'s X times
   * <b>b</b>'s X).<p> For properties of the dot product, see {@link MathUtil.vec3dot}.
   * @param {Array<number>} a The first 2-element vector.
   * @param {Array<number>} b The second 2-element vector.
   * @returns {number} A number representing the dot product.
   * @example <caption>The following shows a fast way to compare
   * a vector's length using the dot product.</caption>
   * // Check if the vector's length squared is less than 20 units squared
   * if(MathUtil.vec2dot(vector, vector)<20*20) {
   * // The vector's length is shorter than 20 units
   * }
   */
  "vec2dot":function(a, b) {
    return a[0] * b[0] + a[1] * b[1];
  },
  /**
   * Returns the distance of this 2-element vector from the origin,
   * also known as its <i>length</i> or <i>magnitude</i>.
   * It's the same as the square root of the sum of the squares
   * of its components.<p>
   * Note that if vectors are merely sorted or compared by their lengths (and
   * those lengths are not added or multiplied together or the like),
   * it's faster to sort or compare them by the squares of their lengths (to find
   * the square of a 2-element vector's length, call {@link MathUtil.vec2dot}
   * passing the same vector as both of its arguments).
   * @param {Array<number>} a A 2-element vector.
   * @returns {number} Return value. */
  "vec2length":function(a) {
    const dx = a[0];
    const dy = a[1];
    return Math.sqrt(dx * dx + dy * dy);
  },
  /**
   * Does a linear interpolation between two 2-element vectors;
   * returns a new vector.
   * @param {Array<number>} v1 The first vector to interpolate.
   * The interpolation will occur on each component of this vector and v2.
   * @param {Array<number>} v2 The second vector to interpolate.
   * @param {number} factor A value that usually ranges from 0 through 1. Closer to 0 means
   * closer to v1, and closer to 1 means closer to v2.<br>For a nonlinear
   * interpolation, define a function that takes a value that usually ranges from 0 through 1 and returns
   * a value generally ranging from 0 through 1, and pass the result of that
   * function to this method. For examples, see {@link MathUtil.vec3lerp}.
   * @returns {Array<number>} The interpolated vector.
   */
  "vec2lerp":function(v1, v2, factor) {
    return [
      v1[0] + (v2[0] - v1[0]) * factor,
      v1[1] + (v2[1] - v1[1]) * factor
    ];
  },
  /**
   * Multiplies each of the components of two 2-element vectors and returns a new
   * vector with the result.
   * @param {Array<number>} a The first 2-element vector.
   * @param {Array<number>} b The second 2-element vector.
   * @returns {Array<number>} The resulting 2-element vector.
   */
  "vec2mul":function(a, b) {
    return [a[0] * b[0], a[1] * b[1]];
  },
  /**
   * Multiplies each of the components of two 2-element vectors and stores
   * the result in the first vector.
   * @param {Array<number>} a The first 2-element vector.
   * @param {Array<number>} b The second 2-element vector.
   * @returns {Array<number>} The parameter "a"
   */
  "vec2mulInPlace":function(a, b) {
    // Use variables in case a and b are the same
    const b0 = b[0];
    const b1 = b[1];
    a[0] *= b0;
    a[1] *= b1;
    return a;
  },
  /**
   * Negates a 2-element vector and returns a new
   * vector with the result, which is generally a vector with
   * the same length but opposite direction. Negating a vector
   * is the same as reversing the sign of each of its components.
   * @param {Array<number>} a A 2-element vector.
   * @returns {Array<number>} The resulting 2-element vector.
   */
  "vec2negate":function(a) {
    return [-a[0], -a[1]];
  },
  /**
   * Negates a 2-element vector in place, generally resulting in a vector with
   * the same length but opposite direction.
   * Negating a vector
   * is the same as reversing the sign of each of its components.
   * @param {Array<number>} a A 2-element vector.
   * @returns {Array<number>} The parameter "a".
   */
  "vec2negateInPlace":function(a) {
    a[0] = -a[0];
    a[1] = -a[1];
    return a;
  },
  /**
   * Converts a 2-element vector to a [unit vector]{@tutorial glmath}; returns a new vector.
   * When a vector is normalized, its direction remains the same but the distance from the origin
   * to that vector becomes 1 (unless all its components are 0).
   * A vector is normalized by dividing each of its components
   * by its [length]{@link MathUtil.vec2length}.<p>
   * @param {Array<number>} vec A 2-element vector.
   * @returns {Array<number>} The resulting vector.
   * Note that due to rounding error, the vector's length might not be exactly equal to 1, and that the vector will remain unchanged if its length is 0 or extremely close to 0.
   * @example <caption>The following example changes the
   * length of a line segment. </caption>
   * var startPt=[x1,y1]; // Line segment's start
   * var endPt=[x2,y2]; // Line segment's end
   * // Find difference between endPt and startPt
   * var delta=MathUtil.vec2sub(endPt,startPt);
   * // Normalize delta to a unit vector
   * var deltaNorm=MathUtil.vec2normalize(delta);
   * // Rescale to the desired length, here, 10
   * MathUtil.vec2scaleInPlace(deltaNorm,10);
   * // Find the new endpoint
   * endPt=MathUtil.vec2add(startPt,deltaNorm);
   */
  "vec2normalize":function(vec) {
    return MathUtil.vec2normalizeInPlace([vec[0], vec[1]]);
  },
  /**
   * Converts a 2-element vector to a [unit vector]{@tutorial glmath}.
   * When a vector is normalized, its direction remains the same but the distance from the origin
   * to that vector becomes 1 (unless all its components are 0).
   * A vector is normalized by dividing each of its components
   * by its [length]{@link MathUtil.vec2length}.<p>
   * @param {Array<number>} vec A 2-element vector.
   * @returns {Array<number>} The parameter "vec".
   * Note that due to rounding error, the vector's length might not be exactly equal to 1, and that the vector will remain unchanged if its length is 0 or extremely close to 0.
   */
  "vec2normalizeInPlace":function(vec) {
    const x = vec[0];
    const y = vec[1];
    let len = Math.sqrt(x * x + y * y);
    if(len !== 0) {
      len = 1.0 / len;
      vec[0] *= len;
      vec[1] *= len;
    }
    return vec;
  },
  /**
   * Returns an arbitrary 2-element vector that is perpendicular
   * (orthogonal) to the given 2-element vector. The return value
   * will not be converted to a [unit vector]{@tutorial glmath}.
   * @param {Array<number>} vec A 2-element vector.
   * @returns {Array<number>} A perpendicular 2-element
   * vector.  Returns (0,0) if "vec" is (0,0).
   */
  "vec2perp":function(vec) {
    return [-vec[1], vec[0]];
  },
  /**
   * Returns the projection of a 2-element vector on the given
   * reference vector. Assuming both vectors
   * start at the same point, the resulting vector
   * will be parallel to the
   * reference vector but will make the closest
   * approach possible to the projected vector's
   * endpoint. The difference between the projected
   * vector and the return value will be perpendicular
   * to the reference vector.
   * @param {Array<number>} vec The vector to project.
   * @param {Array<number>} refVec The reference vector whose length
   * will be adjusted.
   * @returns {Array<number>} The projection of
   * "vec" on "refVec".  Returns (0,0,0) if "refVec"'s
   * length is 0 or extremely close to 0.
   */
  "vec2proj":function(vec, refVec) {
    const lensq = MathUtil.vec2dot(refVec, refVec);
    if(lensq === 0.0)return [0, 0];
    return MathUtil.vec2scale(refVec,
      MathUtil.vec2dot(vec, refVec) / lensq);
  },
  /**
   * Returns a vector that reflects off a surface.
   * @param {Array<number>} incident Incident vector, or
   * a vector headed in the direction of the surface, as a 2-element vector.
   * @param {Array<number>} normal Surface normal vector, or
   * a vector that's perpendicular to the surface, as a 2-element vector.
   * Should be a [unit vector]{@tutorial glmath}.
   * @returns {Array<number>} A vector that has the same length
   * as "incident" but is reflected away from the surface.
   */
  "vec2reflect":function(incident, normal) {
    return MathUtil.vec2sub(incident,
      MathUtil.vec2scale(normal, 2 * MathUtil.vec2dot(normal, incident)));
  },
  /**
   * Multiplies each element of a 2-element vector by a factor. Returns
   * a new vector that is parallel to the old vector
   * but with its length multiplied by the given factor. If the factor
   * is positive, the vector will point in the same direction; if negative,
   * in the opposite direction; if zero, the vector's components will all be 0.
   * @param {Array<number>} a A 2-element vector.
   * @param {number} scalar A factor to multiply. To divide
   * a vector by a number, the factor will be 1 divided by that number.
   * @returns {Array<number>} The parameter "a".
   */
  "vec2scale":function(a, scalar) {
    return MathUtil.vec2scaleInPlace([a[0], a[1]], scalar);
  },
  /**
   * Multiplies each element of a 2-element vector by a factor, so
   * that the vector is parallel to the old vector
   * but its length is multiplied by the given factor. If the factor
   * is positive, the vector will point in the same direction; if negative,
   * in the opposite direction; if zero, the vector's components will all be 0.
   * @param {Array<number>} a A 2-element vector.
   * @param {number} scalar A factor to multiply. To divide
   * a vector by a number, the factor will be 1 divided by that number.
   * @returns {Array<number>} The parameter "a".
   */
  "vec2scaleInPlace":function(a, scalar) {
    a[0] *= scalar;
    a[1] *= scalar;
    return a;
  },
  /**
   * Subtracts the second vector from the first vector and returns a new
   * vector with the result. Subtracting two vectors
   * is the same as subtracting each of their components.<p>
   * @param {Array<number>} a The first 2-element vector.
   * @param {Array<number>} b The second 2-element vector.
   * @returns {Array<number>} The resulting 2-element vector.
   * This is the vector <i>to <code>a</code> from <code>b</code></i>.
   */
  "vec2sub":function(a, b) {
    return [a[0] - b[0], a[1] - b[1]];
  },
  /**
   * Subtracts the second vector from the first vector and stores
   * the result in the first vector. Subtracting two vectors
   * is the same as subtracting each of their components.
   * @param {Array<number>} a The first 2-element vector.
   * @param {Array<number>} b The second 2-element vector.
   * @returns {Array<number>} The parameter "a".
   * This is the vector <i>to the previous <code>a</code> from <code>b</code></i>.
   */
  "vec2subInPlace":function(a, b) {
    // Use variables in case a and b are the same
    const b0 = b[0];
    const b1 = b[1];
    a[0] -= b0;
    a[1] -= b1;
    return a;
  },
  /**
   * Returns a new 3-element
   * vector with the absolute value of each of its components.
   * @param {Array<number>} a A 3-element vector.
   * @returns {Array<number>} The resulting 3-element vector.
   */
  "vec3abs":function(a) {
    return [Math.abs(a[0]), Math.abs(a[1]), Math.abs(a[2])];
  },
  /**
   * Sets each component of the given 3-element
   * vector to its absolute value.
   * @param {Array<number>} a A 3-element vector.
   * @returns {Array<number>} The vector "a".
   */
  "vec3absInPlace":function(a) {
    a[0] = Math.abs(a[0]);
    a[1] = Math.abs(a[1]);
    a[2] = Math.abs(a[2]);
    return a;
  },
  /**
   * Adds two 3-element vectors and returns a new
   * vector with the result. Adding two vectors
   * is the same as adding each of their components.
   * The resulting vector:<ul>
   * <li>describes a straight-line path for the
   * combined paths described by the given vectors, in either order, and
   * <li>will come "between" the two vectors given (at their shortest angle) if all three start
   * at the same position.</ul>
   * @param {Array<number>} a The first 3-element vector.
   * @param {Array<number>} b The second 3-element vector.
   * @returns {Array<number>} The resulting 3-element vector.
   */
  "vec3add":function(a, b) {
    return [a[0] + b[0], a[1] + b[1], a[2] + b[2]];
  },
  /**
   * Adds two 3-element vectors and stores
   * the result in the first vector. Adding two vectors
   * is the same as adding each of their components.
   * The resulting vector:<ul>
   * <li>describes a straight-line path for the
   * combined paths described by the given vectors, in either order, and
   * <li>will come "between" the two vectors given (at their shortest angle) if all three start
   * at the same position.</ul>
   * @param {Array<number>} a The first 3-element vector.
   * @param {Array<number>} b The second 3-element vector.
   * @returns {Array<number>} The parameter "a"
   */
  "vec3addInPlace":function(a, b) {
    // Use variables in case a and b are the same

    const b0 = b[0];
    const b1 = b[1];
    const b2 = b[2];
    a[0] += b0;
    a[1] += b1;
    a[2] += b2;
    return a;
  },
  /**
   * Assigns the values of a 3-element vector into another
   * 3-element vector.
   * @param {Array<number>} dst The 3-element vector to
   * assign to.
   * @param {Array<number>} src The 3-element vector whose
   * values will be copied.
   * @returns {Array<number>} The parameter "dst"
   */
  "vec3assign":function(dst, src) {
    dst[0] = src[0];
    dst[1] = src[1];
    dst[2] = src[2];
    return dst;
  },
  /**
   * Returns a 3-element vector in which each element of the given 3-element vector is clamped
   * so it's not less than one value or greater than another value.
   * @param {Array<number>} a The vector to clamp.
   * @param {number} min Lowest possible value. Should not be greater than "max".
   * @param {number} max Highest possible value. Should not be less than "min".
   * @returns {Array<number>} The resulting vector. */
  "vec3clamp":function(a, min, max) {
    return MathUtil.vec3clampInPlace(MathUtil.vec3copy(a), min, max);
  },
  /**
   * Clamps each element of the given 3-element vector
   * so it's not less than one value or greater than another value.
   * @param {Array<number>} a The vector to clamp.
   * @param {number} min Lowest possible value. Should not be greater than "max".
   * @param {number} max Highest possible value. Should not be less than "min".
   * @returns {Array<number>} The resulting vector. */
  "vec3clampInPlace":function(a, min, max) {
    const x = Math.min(max, Math.max(min, a[0]));
    const y = Math.min(max, Math.max(min, a[1]));
    const z = Math.min(max, Math.max(min, a[2]));
    a[0] = x;
    a[1] = y;
    a[2] = z;
    return a;
  },
  /**
   * Returns a copy of a 3-element vector.
   * @param {Array<number>} vec A 3-element vector.
   * @returns {Array<number>} Return value. */
  "vec3copy":function(vec) {
    return [vec[0], vec[1], vec[2]];
  },
  /**
   * Finds the cross product of two 3-element vectors (called A and B).
   * The following are properties of the cross product:<ul>
   * <li>The cross product will be a vector that is <i>orthogonal</i> (perpendicular) to both A and B.
   * <li>Switching the order of A and B results in a cross product
   * vector with the same length but opposite direction. (Thus, the cross product is not <i>commutative</i>,
   * but it is <i>anticommutative</i>.)
   * <li>Let there be a triangle formed by point A, point B, and the point (0,0,0) in that order.
   * While the cross product of A and B points backward from the "eye",
   * the triangle's vertices are oriented counterclockwise for [right-handed coordinate systems]{@tutorial glmath},
   * or clockwise for left-handed systems. The triangle's area is half of the cross product's length.
   * <li>The length of the cross
   * product equals |<b>a</b>| &#x2a; |<b>b</b>| &#x2a; |sin &theta;|
   * where |<b>x</b>| is the length of vector <b>x</b>, and
   * &theta; is the shortest angle between <b>a</b> and <b>b</b>.
   * It follows that:<ul>
   * <li>If the length is 0, then A and B are parallel vectors (0 or 180 degrees apart).
   * <li>If A and B are [unit vectors]{@tutorial glmath}, the length equals the absolute value
   * of the sine of the shortest angle between A and B.
   * <li>If A and B are unit vectors, the cross product will be a unit vector only if A is perpendicular
   * to B (the shortest angle between A and B will be 90 degrees, since sin 90&deg; = 1).
   * </ul></ul>
   * The cross product (<b>c</b>) of vectors <b>a</b> and <b>b</b> is found as
   * follows:<br>
   * <b>c</b>.x = <b>a</b>.y &#x2a; <b>b</b>.z - <b>a</b>.z &#x2a; <b>b</b>.y<br>
   * <b>c</b>.y = <b>a</b>.z &#x2a; <b>b</b>.x - <b>a</b>.x &#x2a; <b>b</b>.z<br>
   * <b>c</b>.z = <b>a</b>.x &#x2a; <b>b</b>.y - <b>a</b>.y &#x2a; <b>b</b>.x<br>
   * @param {Array<number>} a The first 3-element vector.
   * @param {Array<number>} b The second 3-element vector.
   * @returns {Array<number>} A 3-element vector containing the cross product.
   * @example <caption>The following example uses the cross product to
   * calculate a triangle's normal vector and its area.</caption>
   * var a=triangle[0];
   * var b=triangle[1];
   * var c=triangle[2];
   * // Find vector from C to A
   * var da=MathUtil.vec3sub(a,c);
   * // Find vector from C to B
   * var db=MathUtil.vec3sub(b,c);
   * // The triangle's normal is the cross product of da and db
   * var normal=MathUtil.vec3cross(da,db);
   * // Find the triangle's area
   * var area=MathUtil.vec3length(normal)*0.5;
   * @example <caption>The following example finds the cosine and sine of
   * the angle between two unit vectors and the orthogonal unit vector of both.</caption>
   * var cr=MathUtil.vec3cross(unitA,unitB);
   * // Cosine of the angle. Will be positive or negative depending on
   * // the shortest angle between the vectors.
   * var cosine=MathUtil.vec3dot(unitA,unitB);
   * // Sine of the angle. Note that the sine will always be 0 or greater because
   * // the shortest angle between them is positive or 0 degrees.
   * var sine=MathUtil.vec3length(cr);
   */
  "vec3cross":function(a, b) {
    return [a[1] * b[2] - a[2] * b[1],
      a[2] * b[0] - a[0] * b[2],
      a[0] * b[1] - a[1] * b[0]];
  },
  /**
   * Finds the straight-line distance from one three-element vector
   * to another, treating both as 3D points.
   * @param {Array<number>} vecFrom The first 3-element vector.
   * @param {Array<number>} vecTo The second 3-element vector.
   * @returns {number} The distance between the two vectors.
   */
  "vec3dist":function(vecFrom, vecTo) {
    return MathUtil.vec3length(MathUtil.vec3sub(vecFrom, vecTo));
  },
  /**
   * Finds the dot product of two 3-element vectors. It's the
   * sum of the products of their components (for example, <b>a</b>'s X times
   * <b>b</b>'s X).<p>
   * The following are properties of the dot product:
   * <ul>
   * <li>The dot
   * product equals |<b>a</b>| &#x2a; |<b>b</b>| &#x2a; cos &theta;
   * where |<b>x</b>| is the length of vector <b>x</b>, and
   * &theta; is the shortest angle between <b>a</b> and <b>b</b>.
   * It follows that:<ul>
   * <li>A dot product of 0 indicates that the vectors are 90
   * degrees apart, making them <i>orthogonal</i>
   * (perpendicular to each other).
   * <li>A dot product greater than 0 means less than 90 degrees apart.
   * <li>A dot product less than 0 means greater than 90 degrees apart.
   * <li>If both vectors are [unit vectors]{@tutorial glmath}, the cosine
   * of the shortest angle between them is equal to their dot product.
   * However, <code>Math.acos</code> won't return a negative angle
   * from that cosine, so the dot product can't
   * be used to determine if one vector is "ahead of" or "behind" another
   * vector.
   * <li>If both vectors are unit vectors, a dot product of 1 or -1 indicates
   * that the two vectors are parallel (and the vectors are 0 or
   * 180 degrees apart, respectively.)
   * <li>If one of the vectors is a unit vector, the dot product's absolute
   * value will be the length that vector must have to make the closest
   * approach to the other vector's endpoint. If the dot product is negative,
   * the unit vector must also be in the opposite direction to approach the
   * other vector's endpoint.
   * </ul></li>
   * <li>If the two vectors are the same, the return value indicates
   * the vector's length squared. This is illustrated in the example.
   * <li>Switching the order of the two vectors results in the
   * same dot product. (Thus, the dot product is <i>commutative</i>.)
   * </ul>
   * @param {Array<number>} a The first 3-element vector.
   * @param {Array<number>} b The second 3-element vector.
   * @returns {number} A number representing the dot product.
   * @example <caption>The following shows a fast way to compare
   * a vector's length using the dot product.</caption>
   * // Check if the vector's length squared is less than 20 units squared
   * if(MathUtil.vec3dot(vector, vector)<20*20) {
   * // The vector's length is shorter than 20 units
   * }
   */
  "vec3dot":function(a, b) {
    return a[0] * b[0] + a[1] * b[1] + a[2] * b[2];
  },
  /**
   * Unprojects the <i>window coordinates</i> given in a
   * 3-element vector,
   * using the given transformation matrix and viewport
   * rectangle.<p>
   * In the window coordinate space, X coordinates increase
   * rightward and Y coordinates increase upward
   * or downward depending on the "yUp" parameter, and
   * Z coordinates within the view volume range from 0 to 1 (assuming
   * {@link MathUtil.mat4projectVec3} treated view volume Z coordinates as ranging from
   * -1 to 1) and increase from front to back.
   * @param {Array<number>} vector A 3-element vector giving
   * the X, Y, and Z coordinates of the 3D point to transform, in window coordinates.
   * @param {Array<number>} matrix A 4x4 matrix.
   * After undoing the transformation to window coordinates, the vector will
   * be transformed by the inverse of this matrix according to the
   * {@link MathUtil.mat4projectVec3} method.<br>
   * To convert to
   * world space, this parameter will generally be a projection-view matrix
   * (projection matrix multiplied by the view matrix, in that order). To convert to
   * object (model) space, this parameter will generally be a model-view-projection
   * matrix (projection-view matrix
   * multiplied by the world [model] matrix, in that order).
   * See {@link MathUtil.vec3toWindowPoint} for the meaning of window coordinates
   * with respect to the "matrix" and "yUp" parameters.
   * @param {Array<number>} viewport A 4-element array specifying
   * the starting position and size of the viewport in window units
   * (such as pixels). In order, the four elements are the starting position's
   * X coordinate, its Y coordinate, the viewport's width, and the viewport's
   * height. Throws an error if the width or height is less than 0.
   * @param {boolean} [yUp] If false, null, undefined, or omitted, reverses the sign of
   * the Y coordinate returned by the {@link MathUtil.mat4projectVec3} method
   * before converting it to window coordinates. If true, the Y
   * coordinate will remain unchanged. If window Y coordinates increase
   * upward, the viewport's starting position is at the lower left corner. If those
   * coordinates increase downward, the viewport's starting position is
   * at the upper left corner.
   * @returns {Array<number>} A 3-element array giving the coordinates
   * of the unprojected point, in that order.
   */
  "vec3fromWindowPoint":function(vector, matrix, viewport, yUp) {
    const halfWidth = viewport[2] * 0.5;
    const halfHeight = viewport[3] * 0.5;
    let x = 0;
    let y = 0;
    const z = vector[2] * 2.0 - 1.0;
    if(halfWidth !== 0 && halfHeight !== 0) {
      x = (vector[0] - viewport[0] - halfWidth) / halfWidth;
      y = (vector[1] - viewport[1] - halfHeight) / halfHeight;
    }

    const yupfalse = typeof yUp === "undefined" || yUp === null || yUp === false;
    y = !yupfalse ? y : -y;
    const invMatrix = MathUtil.mat4invert(matrix);
    return MathUtil.mat4projectVec3(invMatrix, [x, y, z]);
  },
  /**
   * Returns the distance of this 3-element vector from the origin,
   * also known as its <i>length</i> or <i>magnitude</i>.
   * It's the same as the square root of the sum of the squares
   * of its components.<p>
   * Note that if vectors are merely sorted or compared by their lengths (and
   * those lengths are not added or multiplied together or the like),
   * it's faster to sort or compare them by the squares of their lengths (to find
   * the square of a 3-element vector's length, call {@link MathUtil.vec3dot}
   * passing the same vector as both of its arguments).
   * @param {Array<number>} a A 3-element vector.
   * @returns {number} Return value. */
  "vec3length":function(a) {
    const dx = a[0];
    const dy = a[1];
    const dz = a[2];
    return Math.sqrt(dx * dx + dy * dy + dz * dz);
  },
  /**
   * Does a linear interpolation between two 3-element vectors;
   * returns a new vector.
   * @param {Array<number>} v1 The first vector to interpolate.
   * The interpolation will occur on each component of this vector and v2.
   * @param {Array<number>} v2 The second vector to interpolate.
   * @param {number} factor A value that usually ranges from 0 through 1. Closer to 0 means
   * closer to v1, and closer to 1 means closer to v2.<br>For a nonlinear
   * interpolation, define a function that takes a value that usually ranges from 0 through 1 and returns
   * a value generally ranging from 0 through 1, and pass the result of that
   * function to this method.<br>
   * The following are examples of interpolation functions. See also
   * the code examples following this list.<ul>
   * <li>Linear: <code>factor</code>. Constant speed.
   * <li>Powers: <code>Math.pow(factor, N)</code>, where N &gt; 0.
   * For example, N=2 means a square, N=3 means cube, N=1/2 means square root,
   * and N=1/3 means cube root. If N &gt; 1, this
   * function starts slow and ends fast. If N &lt; 1,
   * this function starts fast and ends slow.
   * <li>Sine: <code>Math.sin(Math.PI*0.5*factor)</code>. This function starts fast and ends slow.
   * <li>Smoothstep: <code>(3.0-2.0*factor)*factor*factor</code>. This function
   * starts and ends slow, and speeds up in the middle.
   * <li>Perlin's "Smootherstep": <code>(10+factor*(factor*6-15))*factor*factor*factor</code>. This function
   * starts and ends slow, and speeds up in the middle.
   * <li>Discrete-step timing, where N is a number of steps greater than 0:<ul>
   * <li>Position start: <code>factor &lt; 0 ? 0 : Math.max(1.0,(1.0+Math.floor(factor*N))/N)</code>.</li>
   * <li>Position end: <code>Math.floor(factor*N)/N</code>.</li></ul>
   * <li>Inverted interpolation: <code>1.0-INTF(1.0-factor)</code>,
   * where <code>INTF(x)</code>
   * is another interpolation function. This function reverses the speed behavior;
   * for example, a function that started fast now starts slow.
   * <li>Ease: <code>factor &lt; 0.5 ? INTF(factor*2)*0.5 : 1.0-(INTF((1.0-factor)*2)*0.5)</code>,
   * where <code>INTF(x)</code> is another interpolation function.
   * Depending on the underlying function, this function eases in,
   * then eases out, or vice versa.
   * </ul>
   * @returns {Array<number>} The interpolated vector.
   * @example <caption>The following code does a nonlinear
   * interpolation of two vectors that uses the cube of "factor" rather than
   * "factor". Rather than at a constant speed, the vectors are interpolated
   * slowly then very fast.</caption>
   * factor = factor*factor*factor; // cube the interpolation factor
   * var newVector = MathUtil.vec3lerp(vector1, vector2, factor);
   * @example <caption>The following code does an inverted cubic
   * interpolation. This time, vectors are interpolated fast then very slowly.</caption>
   * factor = 1 - factor; // Invert the factor
   * factor = factor*factor*factor; // cube the interpolation factor
   * factor = 1 - factor; // Invert the result
   * var newVector = MathUtil.vec3lerp(vector1, vector2, factor);
   * @example <caption>The following code does the nonlinear
   *  interpolation called "smoothstep". It slows down at the beginning
   * and end, and speeds up in the middle.</caption>
   * factor = (3.0-2.0*factor)*factor*factor; // smoothstep interpolation
   * var newVector = MathUtil.vec3lerp(vector1, vector2, factor);
   */
  "vec3lerp":function(v1, v2, factor) {
    return [
      v1[0] + (v2[0] - v1[0]) * factor,
      v1[1] + (v2[1] - v1[1]) * factor,
      v1[2] + (v2[2] - v1[2]) * factor
    ];
  },
  /**
   * Multiplies each of the components of two 3-element vectors and returns a new
   * vector with the result.
   * @param {Array<number>} a The first 3-element vector.
   * @param {Array<number>} b The second 3-element vector.
   * @returns {Array<number>} The resulting 3-element vector.
   */
  "vec3mul":function(a, b) {
    return [a[0] * b[0], a[1] * b[1], a[2] * b[2]];
  },
  /**
   * Multiplies each of the components of two 3-element vectors and stores
   * the result in the first vector.
   * @param {Array<number>} a The first 3-element vector.
   * @param {Array<number>} b The second 3-element vector.
   * @returns {Array<number>} The parameter "a"
   */
  "vec3mulInPlace":function(a, b) {
    // Use variables in case a and b are the same

    const b0 = b[0];
    const b1 = b[1];
    const b2 = b[2];
    a[0] *= b0;
    a[1] *= b1;
    a[2] *= b2;
    return a;
  },
  /**
   * Negates a 3-element vector and returns a new
   * vector with the result, which is generally a vector with
   * the same length but opposite direction. Negating a vector
   * is the same as reversing the sign of each of its components.
   * @param {Array<number>} a A 3-element vector.
   * @returns {Array<number>} The resulting 3-element vector.
   */
  "vec3negate":function(a) {
    return [-a[0], -a[1], -a[2]];
  },
  /**
   * Negates a 3-element vector in place, generally resulting in a vector with
   * the same length but opposite direction.
   * Negating a vector
   * is the same as reversing the sign of each of its components.
   * @param {Array<number>} a A 3-element vector.
   * @returns {Array<number>} The parameter "a".
   */
  "vec3negateInPlace":function(a) {
    a[0] = -a[0];
    a[1] = -a[1];
    a[2] = -a[2];
    return a;
  },
  /**
   * Converts a 3-element vector to a [unit vector]{@tutorial glmath}; returns a new vector.
   * When a vector is normalized, its direction remains the same but the distance from the origin
   * to that vector becomes 1 (unless all its components are 0).
   * A vector is normalized by dividing each of its components
   * by its [length]{@link MathUtil.vec3length}.<p>
   * @param {Array<number>} vec A 3-element vector.
   * @returns {Array<number>} The resulting vector.
   * Note that due to rounding error, the vector's length might not be exactly equal to 1, and that the vector will remain unchanged if its length is 0 or extremely close to 0.
   * @example <caption>The following example changes the
   * length of a line segment. </caption>
   * var startPt=[x1,y1,z1]; // Line segment's start
   * var endPt=[x2,y2,z2]; // Line segment's end
   * // Find difference between endPt and startPt
   * var delta=MathUtil.vec3sub(endPt,startPt);
   * // Normalize delta to a unit vector
   * var deltaNorm=MathUtil.vec3normalize(delta);
   * // Rescale to the desired length, here, 10
   * MathUtil.vec3scaleInPlace(deltaNorm,10);
   * // Find the new endpoint
   * endPt=MathUtil.vec3add(startPt,deltaNorm);
   */
  "vec3normalize":function(vec) {
    return MathUtil.vec3normalizeInPlace([vec[0], vec[1], vec[2]]);
  },
  /**
   * Converts a 3-element vector to a [unit vector]{@tutorial glmath}.
   * When a vector is normalized, its direction remains the same but the distance from the origin
   * to that vector becomes 1 (unless all its components are 0).
   * A vector is normalized by dividing each of its components
   * by its [length]{@link MathUtil.vec3length}.<p>
   * @param {Array<number>} vec A 3-element vector.
   * @returns {Array<number>} The parameter "vec".
   * Note that due to rounding error, the vector's length might not be exactly equal to 1, and that the vector will remain unchanged if its length is 0 or extremely close to 0.
   */
  "vec3normalizeInPlace":function(vec) {
    const x = vec[0];
    const y = vec[1];
    const z = vec[2];
    let len = Math.sqrt(x * x + y * y + z * z);
    if(len !== 0) {
      len = 1.0 / len;
      vec[0] *= len;
      vec[1] *= len;
      vec[2] *= len;
    }
    return vec;
  },
  /**
   * Returns an arbitrary 3-element vector that is perpendicular
   * (orthogonal) to the given 3-element vector. The return value
   * will not be converted to a [unit vector]{@tutorial glmath}.
   * @param {Array<number>} vec A 3-element vector.
   * @returns {Array<number>} A perpendicular 3-element
   * vector.  Returns (0,0,0) if "vec" is (0,0,0).
   */
  "vec3perp":function(vec) {
    const absx = Math.abs(vec[0]);
    const absy = Math.abs(vec[1]);
    const absz = Math.abs(vec[2]);
    const mx = Math.max(absx, absy, absz);
    const normal = [0, 0, 0];
    if(mx === absx) {
      normal[0] = vec[1];
      normal[1] = -vec[0];
      normal[2] = 0;
    } else if(mx === absy) {
      normal[0] = 0;
      normal[1] = vec[2];
      normal[2] = -vec[1];
    } else {
      normal[0] = -vec[2];
      normal[1] = 0;
      normal[2] = vec[0];
    }
    return normal;
  },
  /**
   * Returns the projection of a 3-element vector on the given
   * reference vector. Assuming both vectors
   * start at the same point, the resulting vector
   * will be parallel to the
   * reference vector but will make the closest
   * approach possible to the projected vector's
   * endpoint. The difference between the projected
   * vector and the return value will be perpendicular
   * to the reference vector.
   * @param {Array<number>} vec The vector to project.
   * @param {Array<number>} refVec The reference vector whose length
   * will be adjusted.
   * @returns {Array<number>} The projection of
   * "vec" on "refVec".  Returns (0,0,0) if "refVec"'s
   * length is 0 or extremely close to 0.
   */
  "vec3proj":function(vec, refVec) {
    const lensq = MathUtil.vec3dot(refVec, refVec);
    if(lensq === 0.0)return [0, 0, 0];
    return MathUtil.vec3scale(refVec,
      MathUtil.vec3dot(vec, refVec) / lensq);
  },
  /**
   * Returns a vector that reflects off a surface.
   * @param {Array<number>} incident Incident vector, or
   * a vector headed in the direction of the surface, as a 3-element vector.
   * @param {Array<number>} normal Surface normal vector, or
   * a vector that's perpendicular to the surface, as a 3-element vector.
   * Should be a [unit vector]{@tutorial glmath}.
   * @returns {Array<number>} A vector that has the same length
   * as "incident" but is reflected away from the surface.
   */
  "vec3reflect":function(incident, normal) {
    return MathUtil.vec3sub(incident,
      MathUtil.vec3scale(normal, 2 * MathUtil.vec3dot(normal, incident)));
  },
  /**
   * Multiplies each element of a 3-element vector by a factor. Returns
   * a new vector that is parallel to the old vector
   * but with its length multiplied by the given factor. If the factor
   * is positive, the vector will point in the same direction; if negative,
   * in the opposite direction; if zero, the vector's components will all be 0.
   * @param {Array<number>} a A 3-element vector.
   * @param {number} scalar A factor to multiply. To divide
   * a vector by a number, the factor will be 1 divided by that number.
   * @returns {Array<number>} The parameter "a".
   */
  "vec3scale":function(a, scalar) {
    return MathUtil.vec3scaleInPlace([a[0], a[1], a[2]], scalar);
  },
  /**
   * Multiplies each element of a 3-element vector by a factor, so
   * that the vector is parallel to the old vector
   * but its length is multiplied by the given factor. If the factor
   * is positive, the vector will point in the same direction; if negative,
   * in the opposite direction; if zero, the vector's components will all be 0.
   * @param {Array<number>} a A 3-element vector.
   * @param {number} scalar A factor to multiply. To divide
   * a vector by a number, the factor will be 1 divided by that number.
   * @returns {Array<number>} The parameter "a".
   */
  "vec3scaleInPlace":function(a, scalar) {
    a[0] *= scalar;
    a[1] *= scalar;
    a[2] *= scalar;
    return a;
  },
  /**
   * Subtracts the second vector from the first vector and returns a new
   * vector with the result. Subtracting two vectors
   * is the same as subtracting each of their components.<p>
   * @param {Array<number>} a The first 3-element vector.
   * @param {Array<number>} b The second 3-element vector.
   * @returns {Array<number>} The resulting 3-element vector.
   * This is the vector <i>to <code>a</code> from <code>b</code></i>.
   */
  "vec3sub":function(a, b) {
    return [a[0] - b[0], a[1] - b[1], a[2] - b[2]];
  },
  /**
   * Subtracts the second vector from the first vector and stores
   * the result in the first vector. Subtracting two vectors
   * is the same as subtracting each of their components.
   * @param {Array<number>} a The first 3-element vector.
   * @param {Array<number>} b The second 3-element vector.
   * @returns {Array<number>} The parameter "a".
   * This is the vector <i>to the previous <code>a</code> from <code>b</code></i>.
   */
  "vec3subInPlace":function(a, b) {
    // Use variables in case a and b are the same
    const b0 = b[0];
    const b1 = b[1];
    const b2 = b[2];
    a[0] -= b0;
    a[1] -= b1;
    a[2] -= b2;
    return a;
  },
  /**
   * Transforms the 3D point specified in this 3-element vector to its
   * <i>window coordinates</i>
   * using the given transformation matrix and viewport rectangle.
   * @param {Array<number>} vector A 3-element vector giving
   * the X, Y, and Z coordinates of the 3D point to transform.
   * @param {Array<number>} matrix A 4x4 matrix to use to transform
   * the vector according to the {@link MathUtil.mat4projectVec3} method,
   * before the transformed vector is converted to window coordinates.
   * <br>This parameter will generally be
   * a projection-view matrix (projection matrix multiplied
   * by the view matrix, in that order), if the vector to transform is in <i>world space</i>,
   * or a model-view-projection matrix, that is, (projection-view matrix multiplied
   * by the model [world] matrix, in that order), if the vector is in <i>model
   * (object) space</i>.<br>
   * If the matrix includes a projection transform returned
   * by {@link MathUtil.mat4ortho}, {@link MathUtil.mat4perspective}, or
   * similar {@link MathUtil} methods, the X, Y, and Z coordinates within the
   * view volume will increase in the direction given in those methods' documentation (except that if "yUp" is false, null, undefined, or omitted, Y coordinates increase in the opposite direction), and Z coordinates in the view volume will range from 0 to 1 in <card>window coordinates</card>, assuming {@link MathUtil.mat4projectVec3} made such Z coordinates range from -1 to 1.
   * @param {Array<number>} viewport A 4-element array specifying
   * the starting position and size of the viewport in window units
   * (such as pixels). In order, the four elements are the starting position's
   * X coordinate, its Y coordinate, the viewport's width, and the viewport's
   * height. Throws an error if the width or height is less than 0.
   * @param {boolean} [yUp] If false, null, undefined, or omitted, reverses the sign of
   * the Y coordinate returned by the {@link MathUtil.mat4projectVec3} method
   * before converting it to window coordinates. If true, the Y
   * coordinate will remain unchanged. If window Y coordinates increase
   * upward, the viewport's starting position is at the lower left corner. If those
   * coordinates increase downward, the viewport's starting position is
   * at the upper left corner.
   * @returns {Array<number>} A 3-element array giving the window
   * coordinates, in that order.
   */
  "vec3toWindowPoint":function(vector, matrix, viewport) {
    if(viewport[2] < 0 || viewport[3] < 0)throw new Error();
    // Transform the vector and do a perspective divide
    const vec = MathUtil.mat4projectVec3(matrix, vector);
    // Now convert the projected vector to window coordinates
    // const yupfalse = typeof yUp === "undefined" || yUp === null || yUp === false;
    const halfWidth = viewport[2] * 0.5;
    const halfHeight = viewport[3] * 0.5;
    const vecY = !yupFalse ? vec[1] : -vec[1];
    const x = vec[0] * halfWidth + halfWidth + viewport[0];
    const y = vecY * halfHeight + halfHeight + viewport[1];
    const z = (vec[2] + 1.0) * 0.5;
    return [x, y, z];
  },
  /**
   * Finds the scalar triple product of three vectors (A, B, and C). The triple
   * product is the [dot product]{@link MathUtil.vec3dot} of both A and the
   * [cross product]{@link MathUtil.vec3cross}
   * of B and C. The following are properties of the scalar triple product
   * (called triple product in what follows):<ul>
   * <li>Switching the order of B and C, A and C, or A and B results in a triple product
   * with its sign reversed. Moving all three parameters to different positions, though,
   * results in the same triple product.
   * <li>The triple product's absolute value is the volume of a parallelepiped (skewed
   * box) where three of its sides having a vertex in common are
   * defined by A, B, and C, in any order.
   * <li>The triple product's absolute value divided by 6 is the volume of a tetrahedron,
   * where three of its sides having a vertex in common are
   * defined by A, B, and C, in any order.
   * <li>If the triple product is 0, all three vectors lie on the same plane (are <i>coplanar</i>).
   * <li>The triple product is the same as the <i>determinant</i> (overall scaling factor)
   * of a 3x3 matrix whose rows or columns are the vectors A, B, and C, in that order.
   * <li>Assume A is perpendicular to vectors B and C. If the triple product is positive,
   * then A points in the same direction as the cross product of
   * B and C -- which will be perpendicular -- and the angle from B to C, when rotated
   * about vector A, is positive. If the triple product is negative, then A points in the
   * opposite direction from that cross product, and that angle is negative.
   * (See the example below.)
   * </ul>
   * @param {Array<number>} a The first 3-element vector.
   * @param {Array<number>} b The second 3-element vector, or the
   * first parameter to the cross product.
   * @param {Array<number>} c The third 3-element vector, or the
   * second parameter to the cross product.
   * @returns {number} A number giving the triple product.
   */
  "vec3triple":function(a, b, c) {
    return MathUtil.vec3dot(a, MathUtil.vec3cross(b, c));
  },
  /**
   * Returns a new 4-element
   * vector with the absolute value of each of its components.
   * @param {Array<number>} a A 4-element vector.
   * @returns {Array<number>} The resulting 4-element vector.
   */
  "vec4abs":function(a) {
    return [Math.abs(a[0]), Math.abs(a[1]), Math.abs(a[2]), Math.abs(a[3])];
  },
  /**
   * Sets each component of the given 4-element
   * vector to its absolute value.
   * @param {Array<number>} a A 4-element vector.
   * @returns {Array<number>} The vector "a".
   */
  "vec4absInPlace":function(a) {
    a[0] = Math.abs(a[0]);
    a[1] = Math.abs(a[1]);
    a[2] = Math.abs(a[2]);
    a[3] = Math.abs(a[3]);
    return a;
  },
  /**
   * Adds two 4-element vectors and returns a new
   * vector with the result. Adding two vectors
   * is the same as adding each of their components.
   * The resulting vector:<ul>
   * <li>describes a straight-line path for the
   * combined paths described by the given vectors, in either order, and
   * <li>will come "between" the two vectors given (at their shortest angle) if all three start
   * at the same position.</ul>
   * @param {Array<number>} a The first 4-element vector.
   * @param {Array<number>} b The second 4-element vector.
   * @returns {Array<number>} The resulting 4-element vector.
   */
  "vec4add":function(a, b) {
    return [a[0] + b[0], a[1] + b[1], a[2] + b[2], a[3] + b[3]];
  },
  /**
   * Adds two 4-element vectors and stores
   * the result in the first vector. Adding two vectors
   * is the same as adding each of their components.
   * The resulting vector:<ul>
   * <li>describes a straight-line path for the
   * combined paths described by the given vectors, in either order, and
   * <li>will come "between" the two vectors given (at their shortest angle) if all three start
   * at the same position.</ul>
   * @param {Array<number>} a The first 4-element vector.
   * @param {Array<number>} b The second 4-element vector.
   * @returns {Array<number>} The parameter "a".
   * This is the vector <i>to the previous <code>a</code> from <code>b</code></i>.
   */
  "vec4addInPlace":function(a, b) {
    // Use variables in case a and b are the same

    const b0 = b[0];
    const b1 = b[1];
    const b2 = b[2];
    const b3 = b[3];
    a[0] += b0;
    a[1] += b1;
    a[2] += b2;
    a[3] += b3;
    return a;
  },
  /**
   * Assigns the values of a 4-element vector into another
   * 4-element vector.
   * @param {Array<number>} dst The 4-element vector to copy
   * the source values to.
   * @param {Array<number>} src The 4-element vector whose
   * values will be copied.
   * @returns {Array<number>} The parameter "dst".
   */
  "vec4assign":function(dst, src) {
    dst[0] = src[0];
    dst[1] = src[1];
    dst[2] = src[2];
    dst[3] = src[3];
    return dst;
  },
  /**
   * Returns a 4-element vector in which each element of the given 4-element vector is clamped
   * @param {Array<number>} a The vector to clamp.
   * @param {number} min Lowest possible value. Should not be greater than "max".
   * @param {number} max Highest possible value. Should not be less than "min".
   * @returns {Array<number>} The resulting vector. */
  "vec4clamp":function(a, min, max) {
    return MathUtil.vec4clampInPlace(MathUtil.vec4copy(a), min, max);
  },
  /**
   * Clamps each element of the given 4-element vector
   * so it's not less than one value or greater than another value.
   * @param {Array<number>} a The vector to clamp.
   * @param {number} min Lowest possible value. Should not be greater than "max".
   * @param {number} max Highest possible value. Should not be less than "min".
   * @returns {Array<number>} The resulting vector. */
  "vec4clampInPlace":function(a, min, max) {
    const x = Math.min(max, Math.max(min, a[0]));
    const y = Math.min(max, Math.max(min, a[1]));
    const z = Math.min(max, Math.max(min, a[2]));
    const w = Math.min(max, Math.max(min, a[3]));
    a[0] = x;
    a[1] = y;
    a[2] = z;
    a[3] = w;
    return a;
  },
  /**
   * Returns a copy of a 4-element vector.
   * @param {Array<number>} vec A 4-element vector.
   * @returns {Array<number>} Return value. */
  "vec4copy":function(vec) {
    return [vec[0], vec[1], vec[2], vec[3]];
  },
  /**
   * Finds the dot product of two 4-element vectors. It's the
   * sum of the products of their components (for example, <b>a</b>'s X times <b>b</b>'s X).
   * For properties of the dot product, see {@link MathUtil.vec3dot}.
   * @param {Array<number>} a The first 4-element vector.
   * @param {Array<number>} b The second 4-element vector.
   * @returns {number} Return value.
   */
  "vec4dot":function(a, b) {
    return a[0] * b[0] + a[1] * b[1] + a[2] * b[2] + a[3] * b[3];
  },
  /**
   * Returns the distance of this 4-element vector from the origin,
   * also known as its <i>length</i> or <i>magnitude</i>.
   * It's the same as the square root of the sum of the squares
   * of its components.<p>
   * Note that if vectors are merely sorted or compared by their lengths,
   * it's faster to sort or compare them by the squares of their lengths (to find
   * the square of a 4-element vector's length, call {@link MathUtil.vec4dot}
   * passing the same vector as both of its arguments).
   * @param {Array<number>} a A 4-element vector.
   * @returns {number} Return value. */
  "vec4length":function(a) {
    const dx = a[0];
    const dy = a[1];
    const dz = a[2];
    const dw = a[3];
    return Math.sqrt(dx * dx + dy * dy + dz * dz + dw * dw);
  },
  /**
   * Does a linear interpolation between two 4-element vectors;
   * returns a new vector.
   * @param {Array<number>} v1 The first vector to interpolate.
   * The interpolation will occur on each component of this vector and v2.
   * @param {Array<number>} v2 The second vector to interpolate.
   * @param {number} factor A value that usually ranges from 0 through 1. Closer to 0 means
   * closer to v1, and closer to 1 means closer to v2. For a nonlinear
   * interpolation, define a function that takes a value that usually ranges from 0 through 1
   * and generally returns
   * A value that usually ranges from 0 through 1, and pass the result of that function to this method.
   * See the documentation for {@link MathUtil.vec3lerp}
   * for examples of interpolation functions.
   * @returns {Array<number>} The interpolated vector.
   */
  "vec4lerp":function(v1, v2, factor) {
    return [
      v1[0] + (v2[0] - v1[0]) * factor,
      v1[1] + (v2[1] - v1[1]) * factor,
      v1[2] + (v2[2] - v1[2]) * factor,
      v1[3] + (v2[3] - v1[3]) * factor
    ];
  },
  /**
   * Negates a 4-element vector and returns a new
   * vector with the result, which is generally a vector with
   * the same length but opposite direction. Negating a vector
   * is the same as reversing the sign of each of its components.
   * @param {Array<number>} a A 4-element vector.
   * @returns {Array<number>} The resulting 4-element vector.
   */
  "vec4negate":function(a) {
    return [-a[0], -a[1], -a[2], -a[3]];
  },
  /**
   * Negates a 4-element vector in place, generally resulting in a vector with
   * the same length but opposite direction.
   * Negating a vector
   * is the same as reversing the sign of each of its components.
   * @param {Array<number>} a A 4-element vector.
   * @returns {Array<number>} The parameter "a".
   */
  "vec4negateInPlace":function(a) {
    a[0] = -a[0];
    a[1] = -a[1];
    a[2] = -a[2];
    a[3] = -a[3];
    return a;
  },
  /**
   * Converts a 4-element vector to a [unit vector]{@tutorial glmath}; returns a new vector.
   * When a vector is normalized, its direction remains the same but the distance from the origin
   * to that vector becomes 1 (unless all its components are 0).
   * A vector is normalized by dividing each of its components
   * by its [length]{@link MathUtil.vec4length}.<p>
   * @param {Array<number>} vec A 4-element vector.
   * @returns {Array<number>} The resulting vector.
   * Note that due to rounding error, the vector's length might not be exactly equal to 1, and that the vector will remain unchanged if its length is 0 or extremely close to 0.
   */
  "vec4normalize":function(vec) {
    return MathUtil.vec4normalizeInPlace([vec[0], vec[1], vec[2], vec[3]]);
  },
  /**
   * Converts a 4-element vector to a [unit vector]{@tutorial glmath}.
   * When a vector is normalized, its direction remains the same but the distance from the origin
   * to that vector becomes 1 (unless all its components are 0).
   * A vector is normalized by dividing each of its components
   * by its [length]{@link MathUtil.vec4length}.<p>
   * @param {Array<number>} vec A 4-element vector.
   * @returns {Array<number>} The parameter "vec".
   * Note that due to rounding error, the vector's length might not be exactly equal to 1, and that the vector will remain unchanged if its length is 0 or extremely close to 0.
   */
  "vec4normalizeInPlace":function(vec) {
    const x = vec[0];
    const y = vec[1];
    const z = vec[2];
    const w = vec[3];
    let len = Math.sqrt(x * x + y * y + z * z + w * w);
    if(len !== 0) {
      len = 1.0 / len;
      vec[0] *= len;
      vec[1] *= len;
      vec[2] *= len;
      vec[3] *= len;
    }
    return vec;
  },
  /**
   * Returns the projection of a 4-element vector on the given
   * reference vector. Assuming both vectors
   * start at the same point, the resulting vector
   * will be parallel to the
   * reference vector but will make the closest
   * approach possible to the projected vector's
   * endpoint. The difference between the projected
   * vector and the return value will be perpendicular
   * to the reference vector.
   * @param {Array<number>} vec The vector to project.
   * @param {Array<number>} refVec The reference vector whose length
   * will be adjusted.
   * @returns {Array<number>} The projection of
   * "vec" on "refVec".  Returns (0,0,0,0) if "refVec"'s
   * length is 0 or extremely close to 0.
   */
  "vec4proj":function(vec, refVec) {
    const lensq = MathUtil.vec4dot(refVec, refVec);
    if(lensq === 0.0)return [0, 0, 0];
    return MathUtil.vec4scale(refVec,
      MathUtil.vec4dot(vec, refVec) / lensq);
  },
  /**
   * Multiplies each element of a 4-element vector by a factor, returning
   * a new vector that is parallel to the old vector
   * but with its length multiplied by the given factor. If the factor
   * is positive, the vector will point in the same direction; if negative,
   * in the opposite direction; if zero, the vector's components will all be 0.
   * @param {Array<number>} a A 4-element vector.
   * @param {number} scalar A factor to multiply. To divide
   * a vector by a number, the factor will be 1 divided by that number.
   * @returns {Array<number>} The resulting 4-element vector.
   */
  "vec4scale":function(a, scalar) {
    return [a[0] * scalar, a[1] * scalar, a[2] * scalar, a[3] * scalar];
  },
  /**
   * Multiplies each element of a 4-element vector by a factor, so
   * that the vector is parallel to the old vector
   * but its length is multiplied by the given factor. If the factor
   * is positive, the vector will point in the same direction; if negative,
   * in the opposite direction; if zero, the vector's components will all be 0.
   * @param {Array<number>} a A 4-element vector.
   * @param {number} scalar A factor to multiply. To divide
   * a vector by a number, the factor will be 1 divided by that number.
   * @returns {Array<number>} The parameter "a".
   */
  "vec4scaleInPlace":function(a, scalar) {
    a[0] *= scalar;
    a[1] *= scalar;
    a[2] *= scalar;
    a[3] *= scalar;
    return a;
  },
  /**
   * Subtracts the second vector from the first vector and returns a new
   * vector with the result. Subtracting two vectors
   * is the same as subtracting each of their components.<p>
   * @param {Array<number>} a The first 4-element vector.
   * @param {Array<number>} b The second 4-element vector.
   * @returns {Array<number>} The resulting 4-element vector.
   * This is the vector <i>to <code>a</code> from <code>b</code></i>.
   */
  "vec4sub":function(a, b) {
    return [a[0] - b[0], a[1] - b[1], a[2] - b[2], a[3] - b[3]];
  },
  /**
   * Subtracts the second vector from the first vector and stores
   * the result in the first vector. Subtracting two vectors
   * is the same as subtracting each of their components.
   * @param {Array<number>} a The first 4-element vector.
   * @param {Array<number>} b The second 4-element vector.
   * @returns {Array<number>} The parameter "a"
   */
  "vec4subInPlace":function(a, b) {
    // Use variables in case a and b are the same
    const b0 = b[0];
    const b1 = b[1];
    const b2 = b[2];
    const b3 = b[3];
    a[0] -= b0;
    a[1] -= b1;
    a[2] -= b2;
    a[3] -= b3;
    return a;
  }
};

/**
 * An interpolation timing function based on the path of a
 * cubic B&eacute;zier
 * curve with end points (0, 0) and (1, 1) and with two
 * configurable control points. The X coordinates of the
 * curve indicate time, and the Y coordinates of the curve
 * indicate how far the interpolation has reached.
 * @param {number} a X coordinate of the first configurable control
 * point of the curve. Should be within the range 0 through 1.
 * @param {number} b Y coordinate of the first configurable control
 * point of the curve. Should be within the range 0 through 1,
 * but may exceed this range.
 * @param {number} c X coordinate of the second configurable control
 * point of the curve. Should be within the range 0 through 1.
 * @param {number} d Y coordinate of the second configurable control
 * point of the curve. Should be within the range 0 through 1,
 * but may exceed this range.
 * @param {number} t Number ranging from 0 through 1 that
 * indicates time.
 * @returns {number} Number ranging from 0 through 1 that indicates
 * how far the interpolation has reached. Returns 0 if <code>t</code>
 * is 0 or less, and 1 if <code>t</code> is 1 or greater.
 */
MathUtil.interpCubicBezier = function(a, b, c, d, t) {
  if(t <= 0)return 0;
  if(t >= 1)return 1;
  // Find Bezier curve's T for given X coordinate ("t" parameter passed to
  // this method) using Newton's method
  let tx = t;
  let i;
  for (i = 0; i < 10; i++) {
    const fx = tx * (3 * a * (tx * (tx - 2) + 1) - 3 * c * tx * (tx - 1) + tx * tx) - t;
    if(Math.abs(fx) < 1e-9)break;
    const dfx = 3 * (((3 * tx - 4) * tx + 1) * a + (-3 * tx + 2) * tx * c + tx * tx);
    tx -= fx / dfx;
  }
  // Get Y coordinate
  return tx * (3 * b * (tx * (tx - 2) + 1) - 3 * d * tx * (tx - 1) + tx * tx);
};
/**
 * Finds the dot product of two quaternions.
 * It's equal to the sum of the products of
 * their components (for example, <b>a</b>'s X times <b>b</b>'s X).
 * @function
 * @param {Array<number>} a The first quaternion.
 * @param {Array<number>} b The second quaternion.
 * @returns {number} Return value.
 * @method
 * @static
 * @see {@link MathUtil.vec4dot}
 */
MathUtil.quatDot = MathUtil.vec4dot;
/**
 * Converts a quaternion to a [unit vector]{@tutorial glmath}.
 * When a quaternion is normalized, it describes the same rotation but the distance from the origin
 * to that quaternion becomes 1 (unless all its components are 0).
 * A quaternion is normalized by dividing each of its components
 * by its [length]{@link MathUtil.quatLength}.<p>
 * @function
 * @param {Array<number>} quat A quaternion, containing four elements.
 * @returns {Array<number>} The parameter "quat".
 * Note that due to rounding error, the vector's length might not be exactly equal to 1, and that the vector will remain unchanged if its length is 0 or extremely close to 0.
 * @method
 * @static
 * @see {@link MathUtil.vec4normalizeInPlace}
 */
MathUtil.quatNormalizeInPlace = MathUtil.vec4normalizeInPlace;
/**
 * Converts a quaternion to a [unit vector]{@tutorial glmath}; returns a new quaternion.
 * When a quaternion is normalized, the distance from the origin
 * to that quaternion becomes 1 (unless all its components are 0).
 * A quaternion is normalized by dividing each of its components
 * by its [length]{@link MathUtil.quatLength}.<p>
 * @function
 * @param {Array<number>} quat A quaternion, containing four elements.
 * @returns {Array<number>} The normalized quaternion.
 * Note that due to rounding error, the vector's length might not be exactly equal to 1, and that the vector will remain unchanged if its length is 0 or extremely close to 0.
 * @method
 * @static
 * @see {@link MathUtil.vec4normalize}
 */
MathUtil.quatNormalize = MathUtil.vec4normalize;
/**
 * Returns the distance of this quaternion from the origin.
 * It's the same as the square root of the sum of the squares
 * of its components.
 * @function
 * @param {Array<number>} quat The quaternion.
 * @returns {number} Return value.
 * @method
 * @static
 * @see {@link MathUtil.vec4length}
 */
MathUtil.quatLength = MathUtil.vec4length;
/**
 * Multiplies each element of a quaternion by a factor
 * and stores the result in that quaternion.
 * @function
 * @param {Array<number>} a A quaternion.
 * @param {number} scalar A factor to multiply.
 * @returns {Array<number>} The parameter "a".
 * @method
 * @static
 * @see {@link MathUtil.vec4scaleInPlace}
 */
MathUtil.quatScaleInPlace = MathUtil.vec4scaleInPlace;
/**
 * Multiplies each element of a quaternion by a factor
 * and returns the result as a new quaternion.
 * @function
 * @param {Array<number>} a A quaternion.
 * @param {number} scalar A factor to multiply.
 * @returns {Array<number>} The resulting quaternion.
 * @method
 * @static
 * @see {@link MathUtil.vec4scaleInPlace}
 */
MathUtil.quatScale = MathUtil.vec4scale;
/**
 * Returns a copy of a quaternion.
 * @function
 * @param {Array<number>} a A quaternion.
 * @returns {Array<number>} Return value.
 * @method
 * @static
 * @see {@link MathUtil.vec4copy}
 */
MathUtil.quatCopy = MathUtil.vec4copy;
/**
 * Closest approximation to pi times 2, or a 360-degree turn in radians.
 * @const
 * @default
 */
MathUtil.PiTimes2 = 6.283185307179586476925286766559;
/**
 * Closest approximation to pi divided by 2, or a 90-degree turn in radians.
 * @const
 * @default
 */
MathUtil.HalfPi = 1.5707963267948966192313216916398;
/**
 * Closest approximation to pi divided by 180, or the number
 * of radians in a degree. Multiply by this number to convert degrees to radians.
 * @const
 * @default
 */
MathUtil.PiDividedBy180 = 0.01745329251994329576923690768489;
/**
 * Closest approximation to pi divided by 180, or the number
 * of radians in a degree. Multiply by this number to convert degrees to radians.
 * @const
 * @default
 */
MathUtil.ToRadians = MathUtil.PiDividedBy180;
/**
 * @private
 * @const */
MathUtil.PiDividedBy360 = 0.00872664625997164788461845384244;
/**
 * @private
 * @const */
MathUtil.Num360DividedByPi = 114.59155902616464175359630962821;
/**
 * Closest approximation to 180 divided by pi, or the number of
 * degrees in a radian. Multiply by this number to convert radians to degrees.
 * @const
 * @default
 */
MathUtil.Num180DividedByPi = 57.295779513082320876798154814105;
/**
 * Closest approximation to 180 divided by pi, or the number of
 * degrees in a radian. Multiply by this number to convert radians to degrees.
 * @const
 * @default
 */
MathUtil.ToDegrees = MathUtil.Num180DividedByPi;
/**
 * Indicates that a vector's rotation occurs as a pitch, then yaw, then roll (each rotation around the original axes),
 * or in the reverse order around
 * @const */
MathUtil.GlobalPitchYawRoll = 0;
/**
 * Indicates that a vector's rotation occurs as a pitch, then roll, then yaw (each rotation around the original axes).
 * @const */
MathUtil.GlobalPitchRollYaw = 1;
/**
 * Indicates that a vector's rotation occurs as a yaw, then pitch, then roll (each rotation around the original axes).
 * @const */
MathUtil.GlobalYawPitchRoll = 2;
/**
 * Indicates that a vector's rotation occurs as a yaw, then roll, then pitch (each rotation around the original axes).
 * @const */
MathUtil.GlobalYawRollPitch = 3;
/**
 * Indicates that a vector's rotation occurs as a roll, then pitch, then yaw (each rotation around the original axes).
 * @const */
MathUtil.GlobalRollPitchYaw = 4;
/**
 * Indicates that a vector's rotation occurs as a roll, then yaw, then pitch (each rotation around the original axes).
 * @const */
MathUtil.GlobalRollYawPitch = 5;
/**
 * Indicates that a vector's rotation occurs as a pitch, then yaw, then roll, where the yaw and roll
 * occur around the rotated object's new axes and not necessarily the original axes.
 * @const */
MathUtil.LocalPitchYawRoll = MathUtil.GlobalRollYawPitch;
/**
 * Indicates that a vector's rotation occurs as a pitch, then roll, then yaw, where the roll and yaw
 * occur around the rotated object's new axes and not necessarily the original axes.
 * @const */
MathUtil.LocalPitchRollYaw = MathUtil.GlobalYawRollPitch;
/**
 * Indicates that a vector's rotation occurs as a yaw, then pitch, then roll, where the pitch and roll
 * occur around the rotated object's new axes and not necessarily the original axes.
 * @const */
MathUtil.LocalYawPitchRoll = MathUtil.GlobalRollPitchYaw;
/**
 * Indicates that a vector's rotation occurs as a yaw, then roll, then pitch, where the roll and pitch
 * occur around the rotated object's new axes and not necessarily the original axes.
 * @const */
MathUtil.LocalYawRollPitch = MathUtil.GlobalPitchRollYaw;
/**
 * Indicates that a vector's rotation occurs as a roll, then pitch, then yaw, where the pitch and yaw
 * occur around the rotated object's new axes and not necessarily the original axes.
 * @const */
MathUtil.LocalRollPitchYaw = MathUtil.GlobalYawPitchRoll;
/**
 * Indicates that a vector's rotation occurs as a roll, then yaw, then pitch, where the yaw and pitch
 * occur around the rotated object's new axes and not necessarily the original axes.
 * @const */
MathUtil.LocalRollYawPitch = MathUtil.GlobalPitchYawRoll;/*
 Any copyright to this file is released to the Public Domain.
 http://creativecommons.org/publicdomain/zero/1.0/
 If you like this, you should donate
 to Peter O. (original author of
 the Public Domain HTML 3D Library) at:
 http://peteroupc.github.io/
*/
/** @ignore */
const MathInternal = {
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
};/*
 Any copyright to this file is released to the Public Domain.
 http://creativecommons.org/publicdomain/zero/1.0/
 If you like this, you should donate
 to Peter O. (original author of
 the Public Domain HTML 3D Library) at:
 http://peteroupc.github.io/
*/

/**
 * A curve evaluator object for a parametric curve.<p>
 * A parametric curve is a curve whose points are based on a
 * parametric curve function. A curve function takes a number
 * (U) and returns a point (in 1 or more dimensions, but
 * usually 2 or 3) that lies on the curve. For example, in 3
 * dimensions, a curve function has the following form:<p>
 * <b>F</b>(u) = [ x(u), y(u), z(u) ]<p>
 * where x(u) returns an X coordinate, y(u) a Y coordinate,
 * and z(u) returns a Z coordinate.<p>
 * Classes or JavaScript objects defining parametric curves should implement
 * the <code>evaluate</code> method and, optionally, the other methods mentioned in the "curve" parameter below.
 * @constructor
 * @param {Object} curve A <b>curve evaluator object</b>, which is an object that must contain an <code>evaluate</code> method and may contain an <code>endPoints</code>, <code>velocity</code>, <code>accel</code>, <code>jerk</code>, <code>normal</code>, and/or <code>arcLength</code> method, as described in the corresponding methods of this class.
 * @param {Object} [curveParam] An object for reparameterizing a curve object. It implements a method
 * named <code>endPoints</code>, which has the same meaning as {@link Curve#endPoints} and whose
 * return value takes precedence over the given curve's <code>endPoints</code> method. It also implements
 * a method named <code>getCoordinate(u)</code>, which converts a U coordinate in the old parameterization
 * to a U coordinate in the new parameterization.
 * @example <caption>The following is a simple example of a parametric curve.</caption>
 * var simpleCurve = new Curve({
 * "evaluate":function(u) {
 * return [Math.cos(u) * 1.5, Math.sin(u) * 0.8, 0];
 * },
 * "endPoints":function() {
 * return [-Math.PI, Math.PI];
 * }
 * });
 * @example <caption>The following function defines a parametric circle curve. It demonstrates how all methods
 * defined for curve evaluator objects can be implemented.</caption>
 * var circle=new Curve({"evaluate":function(u) {
 * "use strict";
 * return [Math.cos(u),Math.sin(u),0]
 * },
 * "velocity":function(u) {
 * return [-Math.sin(u),Math.cos(u),0]
 * },
 * "accel":function(u) {
 * return [-Math.cos(u),-Math.sin(u),0]
 * },
 * "jerk":function(u) {
 * return [Math.sin(u),-Math.cos(u),0]
 * },
 * "normal":function(u) {
 * // NOTE: The velocity vector will already be a
 * // unit vector, so we use the accel vector instead
 * return MathUtil.vec3normalize(this.accel(u));
 * },
 * "arcLength":function(u) {
 * return u;
 * },
 * "endPoints":function(u) {
 * return [0,Math.PiTimes2]
 * }
 * });
 * @example <caption>The following method
 * starts a curve at a different offset and wraps the portion
 * of the curve behind that offset at the end of the original
 * curve. This is useful for offsetting the points retrieved
 * with the getPoints method.</caption>
 * function wrapAtOffset(curve, offset) {
 *   "use strict";
 * var c=curve
 * if(offset!=0) {
 * var ep=curve.endPoints();
 * c=new Curve({
 * evaluate:function(u) {curves.evaluate(
 * u+offset>ep[1] ? (u+offset)-ep[1] : (u+offset))},
 * endPoints:function() {return ep;}
 * });
 * }
 * return c;
 * }
 */
function Curve(curve, curveParam) {
// TODO: Consider using a non-prototype method
// rather than this constructor. If so, deprecate
// this constructor
  this.curve = curve;
  this.curveParam = curveParam;
}
/**
 * Returns the starting and ending U coordinates of this curve.
 * @returns A two-element array. The first element is the starting coordinate of
 * the curve, and the second is its ending coordinate.
 * Returns <code>[0, 1]</code> if the evaluator doesn't implement an <code>endPoints</code>
 * method.
 */
Curve.prototype.endPoints = function() {
  if(typeof this.curveParam !== "undefined" && this.curveParam !== null) {
    return this.curveParam.endPoints();
  }
  if(typeof this.curve !== "undefined" && this.curve !== null && this.curve !== this && typeof this.curve.endPoints !== "undefined" && this.curve.endPoints !== null) {
    return this.curve.endPoints();
  } else {
    return [0, 1];
  }
};
/** @ignore */
Curve.prototype._getCoord = function(u) {
  if(typeof this.curveParam !== "undefined" && this.curveParam !== null) {
    return this.curveParam.getCoordinate(u);
  }
  return u;
};

/** @ignore */
Curve._EPSILON = 0.00001;
/**
 * Finds the position of this curve at the given U coordinate.
 * @param {number} u U coordinate of a point on the curve.
 * @returns {Array<number>} An array describing a position. It should have at least as many
 * elements as the number of dimensions of the underlying curve.
 */
Curve.prototype.evaluate = function(u) {
  if(typeof this.curve !== "undefined" && this.curve !== null && this.curve !== this && typeof this.curve.evaluate !== "undefined" && this.curve.evaluate !== null) {
    return this.curve.evaluate(this._getCoord(u));
  } else {
    return [0, 0, 0];
  }
};
/**
 * Finds an approximate velocity vector at the given U coordinate of this curve.
 * The implementation in {@link Curve} calls the evaluator's <code>velocity</code>
 * method if it implements it; otherwise, does a numerical differentiation using
 * the position (from the <code>evaluate</code> method).<p>
 * The <b>velocity</b> of a curve is a vector which is the derivative of the curve's position at the given coordinate.  The vector returned by this method <i>should not</i> be "normalized" to a [unit vector]{@tutorial glmath}.
 * @param {number} u U coordinate of a point on the curve.
 * @returns {Array<number>} An array describing a velocity vector. It should have at least as many
 * elements as the number of dimensions of the underlying curve.
 */
Curve.prototype.velocity = function(u) {
  if(typeof this.curve !== "undefined" && this.curve !== null && this.curve !== this && typeof this.curve.velocity !== "undefined" && this.curve.velocity !== null) {
    return this.curve.velocity(this._getCoord(u));
  } else {
    let du = Curve._EPSILON;
    let vector = this.evaluate(u + du);
    if(vector[0] === 0 && vector[1] === 0 && vector[2] === 0) {
    // too abrupt, try the other direction
      du = -du;
      vector = this.evaluate(u + du);
    }
    return MathInternal.vecSubScaleInPlace(vector, this.evaluate(u), 1.0 / du);
  }
};
/**
 * Finds an approximate acceleration vector at the given U coordinate of this curve.
 * The implementation in {@link Curve} calls the evaluator's <code>accel</code>
 * method if it implements it; otherwise, does a numerical differentiation using
 * the velocity vector.<p>
 * The <b>acceleration</b> of a curve is a vector which is the second-order derivative of the curve's position at the given coordinate.  The vector returned by this method <i>should not</i> be "normalized" to a [unit vector]{@tutorial glmath}.
 * @param {number} u U coordinate of a point on the curve.
 * @returns {Array<number>} An array describing an acceleration vector. It should have at least as many
 * elements as the number of dimensions of the underlying curve.
 */
Curve.prototype.accel = function(u) {
  if(typeof this.curve !== "undefined" && this.curve !== null && this.curve !== this && typeof this.curve.accel !== "undefined" && this.curve.accel !== null) {
    return this.curve.accel(this._getCoord(u));
  } else {
    let du = Curve._EPSILON;
    let vector = this.velocity(u + du);
    if(vector[0] === 0 && vector[1] === 0 && vector[2] === 0) {
    // too abrupt, try the other direction
      du = -du;
      vector = this.velocity(u + du);
    }
    return MathInternal.vecSubScaleInPlace(vector, this.velocity(u), 1.0 / du);
  }
};
/**
 * Finds an approximate jerk vector at the given U coordinate of this curve.
 * The implementation in {@link Curve} calls the evaluator's <code>jerk</code>
 * method if it implements it; otherwise, does a numerical differentiation using
 * the acceleration vector.<p>
 * The <b>jerk</b> of a curve is a vector which is the third-order derivative of the curve's position at the given coordinate.  The vector returned by this method <i>should not</i> be "normalized" to a [unit vector]{@tutorial glmath}.
 * @param {number} u U coordinate of a point on the curve.
 * @returns {Array<number>} An array describing a jerk vector. It should have at least as many
 * elements as the number of dimensions of the underlying curve.
 */
Curve.prototype.jerk = function(u) {
  if(typeof this.curve !== "undefined" && this.curve !== null && this.curve !== this && typeof this.curve.jerk !== "undefined" && this.curve.jerk !== null) {
    return this.curve.jerk(this._getCoord(u));
  } else {
    let du = Curve._EPSILON;
    let vector = this.accel(u + du);
    if(vector[0] === 0 && vector[1] === 0 && vector[2] === 0) {
    // too abrupt, try the other direction
      du = -du;
      vector = this.accel(u + du);
    }
    return MathInternal.vecSubScaleInPlace(vector, this.accel(u), 1.0 / du);
  }
};
/**
 * Finds an approximate principal normal vector at the given U coordinate of this curve.
 * The implementation in {@link Curve} calls the evaluator's <code>normal</code>
 * method if it implements it; otherwise, does a numerical differentiation using the velocity vector.<p>
 * The <b>principal normal</b> of a curve is the derivative of the "normalized" velocity
 * vector divided by that derivative's length. The normal returned by this method
 * <i>should</i> be "normalized" to a [unit vector]{@tutorial glmath}. (Compare with {@link Surface#gradient}.)
 * @param {number} u U coordinate of a point on the curve.
 * @returns {Array<number>} An array describing a normal vector. It should have at least as many
 * elements as the number of dimensions of the underlying curve.
 */
Curve.prototype.normal = function(u) {
  if(typeof this.curve !== "undefined" && this.curve !== null && this.curve !== this && typeof this.curve.normal !== "undefined" && this.curve.normal !== null) {
    return this.curve.normal(this._getCoord(u));
  } else {
    let du = Curve._EPSILON;
    let vector = this.tangent(u + du);
    if(vector[0] === 0 && vector[1] === 0 && vector[2] === 0) {
    // too abrupt, try the other direction
      du = -du;
      vector = MathInternal.vecScaleInPlace(this.tangent(u + du), -1);
    }
    vector = MathInternal.vecSubInPlace(vector, this.tangent(u));
    return MathInternal.vecNormalizeInPlace(vector);
  }
};

/**
 * Convenience method for finding an approximate tangent vector of this curve at the given U coordinate.
 * The <b>tangent vector</b> is the same as the velocity vector, but "normalized" to a unit vector.
 * @param {number} u U coordinate of a point on the curve.
 * @returns {Array<number>} An array describing a normal vector. It should have at least as many
 * elements as the number of dimensions of the underlying curve.
 */
Curve.prototype.tangent = function(u) {
  return MathInternal.vecNormalizeInPlace(this.velocity(u));
};

/**
 * Convenience method for getting the total length of this curve.
 * @returns {number} The distance from the start of the curve to its end.
 */
Curve.prototype.getLength = function() {
  const ep = this.endPoints();
  return this.arcLength(ep[1]);
};

const gaussKronrodArray = [
  0.99693392252959545, 0.00825771143316837, 0.00000000000000000,
  0.98156063424671924, 0.02303608403898155, 0.04717533638651112,
  0.95053779594312127, 0.03891523046929952, 0.00000000000000000,
  0.90411725637047491, 0.05369701760775668, 0.10693932599531891,
  0.84355812416115328, 0.06725090705083998, 0.00000000000000000,
  0.76990267419430469, 0.07992027533360173, 0.16007832854334625,
  0.68405989547005586, 0.09154946829504924, 0.00000000000000000,
  0.58731795428661748, 0.10164973227906016, 0.20316742672306579,
  0.48133945047815713, 0.11002260497764407, 0.00000000000000000,
  0.36783149899818018, 0.11671205350175679, 0.23349253653835478,
  0.24850574832046932, 0.12162630352394839, 0.00000000000000000,
  0.12523340851146891, 0.12458416453615606, 0.24914704581340283,
  0.00000000000000000, 0.12555689390547423, 0.00000000000000000
];
function gaussKronrod(func, mn, mx, dir, depth) {
  const bm = (mx - mn) * 0.5;
  const bp = mn + bm;
  let gauss = 0;
  let kronrod = 0;
  let i;
  for (i = 0; i < gaussKronrodArray.length; i += 3) {
    const gaussWeight = gaussKronrodArray[i + 2];
    const kronrodWeight = gaussKronrodArray[i + 1];
    const abscissa = gaussKronrodArray[i];
    let x = func(bm * abscissa + bp);
    gauss += gaussWeight * x;
    kronrod += kronrodWeight * x;
    if(abscissa > 0) {
      x = func(-bm * abscissa + bp);
      gauss += gaussWeight * x;
      kronrod += kronrodWeight * x;
    }
  }
  gauss = gauss * bm * dir;
  kronrod = kronrod * bm * dir;
  if(Math.abs(gauss - kronrod) < 1e-6) {
    return kronrod + (kronrod - gauss) / 8191.0;
  } else if(depth >= 10) {
    return kronrod + (kronrod - gauss) / 8191.0;
  } else {
    return gaussKronrod(func, mn, bp, dir, depth + 1) +
         gaussKronrod(func, bp, mx, dir, depth + 1);
  }
}

/**
 * Finds an approximate arc length (distance) between the start of this
 * curve and the point at the given U coordinate of this curve.
 * The implementation in {@link Curve} calls the evaluator's <code>arcLength</code>
 * method if it implements it; otherwise, calculates a numerical integral using the velocity vector.<p>
 * The <b>arc length</b> function returns a number; if the curve is "smooth", this is the integral, from the starting point to <code>u</code>, of the length of the velocity vector.
 * @param {number} u U coordinate of a point on the curve.
 * @returns {number} The approximate arc length of this curve at the given U coordinate.
 */
Curve.prototype.arcLength = function(u) {
  if(typeof this.curveParam !== "undefined" && this.curveParam !== null && this.curveParam instanceof Curve._ArcLengthParam) {
    return u;
  }
  if(typeof this.curve !== "undefined" && this.curve !== null && this.curve !== this && typeof this.curve.arcLength !== "undefined" && this.curve.arcLength !== null) {
    return this.curve.arcLength(this._getCoord(u));
  } else {
    const ep = this.endPoints();
    if(u === ep[0])return 0;
    const mn = Math.min(u, ep[0]);
    const mx = Math.max(u, ep[0]);
    const dir = u >= ep[0] ? 1 : -1;
    const that = this;
    return gaussKronrod(function(x) {
      return MathInternal.vecLength(that.velocity(x));
    }, mn, mx, dir, 0);
  }
};

function _pointToObject(p) {
  if(p.length === 1) {
    return {"x":p[0]};
  } else if(p.length === 2) {
    return {
      "x":p[0],
      "y":p[1]
    };
  } else if(p.length === 3) {
    return {
      "x":p[0],
      "y":p[1],
      "z":p[2]
    };
  } else if(p.length === 4) {
    return {
      "x":p[0],
      "y":p[1],
      "z":p[2],
      "w":p[3]
    };
  } else {
    return {};
  }
}

/**
 * Gets an array of positions on the curve at fixed intervals
 * of U coordinates. Note that these positions will not generally be
 * evenly spaced along the curve unless the curve uses
 * an arc-length parameterization.
 * @param {number} count Number of positions to generate. Throws
 * an error if this number is 0. If this value is 1, returns an array containing
 * the starting point of this curve.
 * @returns {Array<Array<number>>|Array<Object>} An array of curve positions. The first
 * element will be the start of the curve.  If "count" is 2 or greater, the last element
 * will be the end of the curve.
 */
Curve.prototype.getPoints = function(count) {
  if(count === 0)return [];
  if(count < 0)throw new Error();
  const ep = this.endPoints();
  const ret = [this.evaluate(ep[0])];
  let i;
  for (i = 1; i < count; i++) {
    const u = ep[0] + (ep[1] - ep[0]) * (i / (count - 1));
    const pt = this.evaluate(u);
    ret.push(pt);
  }
  return ret;
};

/**
 * Gets an array of positions on the curve at fixed intervals
 * of U coordinates. Note that these positions will not generally be
 * evenly spaced along the curve unless the curve uses
 * an arc-length parameterization. The positions will be in the form of objects with
 * up to four properties: x, y, z, and w retrieve the first, second, third,
 * and fourth coordinate of each position, respectively.
 * @param {number} count Number of positions to generate. Throws
 * an error if this number is 0. If this value is 1, returns an array containing
 * the starting point of this curve.
 * @returns {Array<Array<number>>|Array<Object>} An array of curve positions. The first
 * element will be the start of the curve.  If "count" is 2 or greater, the last element
 * will be the end of the curve.
 * @example <caption>The following example initializes a three.js BufferGeometry with the points retrieved by this method. This example requires the three.js library.</caption>
 * var points=curve.getPointsAsObjects(50)
 * var buffer=new THREE.BufferGeometry()
 * .setFromPoints(points);
 */
Curve.prototype.getPointsAsObjects = function(count) {
  if(count === 0)return [];
  if(count < 0)throw new Error();
  const ep = this.endPoints();
  const ret = [_pointToObject(this.evaluate(ep[0]))];
  let i;
  for (i = 1; i < count; i++) {
    const u = ep[0] + (ep[1] - ep[0]) * (i / (count - 1));
    const pt = this.evaluate(u);
    ret.push(_pointToObject(pt));
  }
  return ret;
};
/** @ignore
 * @constructor */
Curve._ChangeEnds = function(u1, u2) {
  this.u1 = u1;
  this.u2 = u2;
  this.getCoordinate = function(u) {
    return u;
  };
  this.endPoints = function() {
    return [this.u1, this.u2];
  };
};
/** @ignore
 * @constructor */
Curve._FitRange = function(curve, ep1, ep2) {
  this.newEp1 = ep1;
  this.newEp2 = ep2;
  this.invNewEpDelta = 1.0 / (ep2 - ep1);
  const ep = curve.endPoints();
  this.origEp1 = ep[0];
  this.origEp2 = ep[1];
  this.getCoordinate = function(u) {
    const uNorm = (u - this.newEp1) * this.invNewEpDelta;
    return this.origEp1 + (this.origEp2 - this.origEp1) * uNorm;
  };
  this.endPoints = function() {
    return [ep1, ep2];
  };
};
/** @ignore
 * @constructor */
Curve._ArcLengthParam = function(curve) {
  this.curve = curve;
  this.ep = this.curve.endPoints();
  this.segments = [];
  let lastT = this.ep[0];
  let lastS = 0;
  const totalLength = this.curve.getLength();
  const segments = Math.min(Math.max(10, Math.ceil(totalLength * 18)), 50);
  let i;
  for (i = 1; i <= segments; i++) {
    const t = this.ep[0] + (this.ep[1] - this.ep[0]) * (i / segments);
    const s = this.curve.arcLength(t);
    this.segments.push([lastS, s, lastT, t]);
    lastT = t;
    lastS = s;
  }
  this.length = this.segments.length === 0 ? 0 :
    this.segments[this.segments.length - 1][1];
  this._vecLength = function(vec) {
    let ret = 0;
    let i;
    for (i = 0; i < vec.length; i++) {
      ret += vec[i] * vec[i];
    }
    return Math.sqrt(ret);
  };
  // solve arcLength(t)-s = 0 numerically
  this._solveArcLength = function(s, guess, minValue, maxExclusive) {
    let ret = guess;
    let i;
    for (i = 0; i < 10; i++) {
      const val = this.curve.arcLength(ret) - s;
      if(Math.abs(val) < 1e-10 && ret >= minValue &&
       ret < maxExclusive) {
        // already accurate enough
        break;
      }
      // NOTE: Arc length is an integral of the speed,
      // so the derivative of arc length will be the speed;
      // this doesn't change even though we subtracted "s"
      // from the arc length above, since an antiderivative
      // plus any constant (s is a constant here because the
      // integral is with respect to time, not speed)
      // is another antiderivative of the same function.
      const deriv = this._vecLength(this.curve.velocity(ret));
      if(deriv === 0) {
        // won't converge anymore
        break;
      }
      const solutionDiff = val / deriv;
      const r = ret - solutionDiff;
      if(solutionDiff === 0) {
        // won't converge anymore
        break;
      }
      if(minValue !== Number.NEGATIVE_INFINITY &&
      maxExclusive !== Number.POSITIVE_INFINITY) {
        if(val < 0) {
          minValue = Math.max(minValue, ret);
          ret = r;
          if(r >= maxExclusive) {
            ret = minValue + (maxExclusive - minValue) * 0.5;
          }
        } else if(val > 0) {
          maxExclusive = Math.min(maxExclusive, ret);
          ret = r;
          if(r <= minValue) {
            ret = minValue + (maxExclusive - minValue) * 0.5;
          }
        }
      } else {
        ret = r;
      }
    }
    return ret;
  };
};
Curve._ArcLengthParam.prototype.getCoordinate = function(s) {
  // NOTE: Note that velocity and acceleration depend on parameterization; for
  // example, the length of the velocity vector may differ for the underlying curve object
  // than for this one, even though both vectors generally point in the same direction.
  let ep;
  let guess;
  if(Number.isNaN(s))throw new Error();
  if(s > this.length) {
    ep = this.curve.endPoints();
    guess = ep[0] + (ep[1] - ep[0]) * (s / this.length);
    return this._solveArcLength(s, guess, ep[0],
      Number.POSITIVE_INFINITY);
  } else if(s < 0) {
    ep = this.curve.endPoints();
    guess = ep[0] + (ep[1] - ep[0]) * (s / this.length);
    return this._solveArcLength(s, guess,
      Number.NEGATIVE_INFINITY, 0);
  } else if(s === this.length) {
    ep = this.curve.endPoints();
    return ep[1];
  } else if(s === 0) {
    ep = this.curve.endPoints();
    return ep[0];
  }
  let startPt = 0;
  let endPt = this.segments.length;
  let k = 0;
  while(startPt < endPt) {
    k += 1;
    if(k > 20)throw new Error();
    const middle = startPt + ((endPt - startPt) / 2 | 0);
    const m = this.segments[middle];
    if(s === m[0]) {
      return m[2];
    } else if(s === m[1]) {
      return m[3];
    } else if(s > m[0] && s < m[1]) {
      const r = (s - m[0]) / (m[1] - m[0]);
      const u = m[2] + (m[3] - m[2]) * r;
      if(m[1] - m[0] >= 1e-10) {
        return this._solveArcLength(s, u, m[2], m[3]);
      }
      return u;
    } else if(s < m[0]) {
      endPt = middle;
    } else {
      startPt = middle + 1;
    }
  }
  throw new Error("Internal error");
};
Curve._ArcLengthParam.prototype.endPoints = function() {
  return [0, this.length];
};
/**
 * Creates a curve evaluator object for a curve that is generated using
 * the same formula as this one (and uses the same U coordinates),
 * but has a different set of end points.
 * For example, this method can be used to shrink the path of a curve
 * from [0, &pi;] to [0, &pi;/8].<p>
 * Note, however, that in general, shrinking
 * the range of a curve will not shrink the length of a curve
 * in the same proportion, unless the curve's path runs at
 * constant speed with respect to time. For example, shrinking the range of a curve
 * from [0, 1] to [0, 0.5] will not generally result in a curve that's exactly half as
 * long as the original curve.<p>For some curves, this method can
 * also be used to grow the path of the curve.
 * @param {number} ep1 New start point of the curve.
 * @param {number} ep2 New end point of the curve.
 * @returns {Curve} Return value.
 */
Curve.prototype.changeEnds = function(ep1, ep2) {
  return new Curve(this, new Curve._ChangeEnds(ep1, ep2));
};

/**
 * Creates a curve evaluator object for a curve that follows the same
 * path as this one but has its U coordinates remapped to fit the given range.
 * For example, this method can be used to shrink the range of U coordinates
 * from [-&pi;, &pi;] to [0, 1] without shortening the path of the curve.
 * Here, -&pi; now maps to 0, and &pi; now maps to 1.
 * @param {number} ep1 New value to use as the start point of the curve.
 * @param {number} ep2 New value to use as the end point of the curve.
 * @returns {Curve} Return value.
 */
Curve.prototype.fitRange = function(ep1, ep2) {
  return new Curve(this, new Curve._FitRange(this, ep1, ep2));
};
/**
 * Gets a curve evaluator object for a curve that follows the same
 * path as this one but has its U coordinates remapped to
 * an <i>arc length parameterization</i>. Arc length
 * parameterization allows for moving along a curve's path at a uniform
 * speed and for generating points which are spaced evenly along that
 * path -- both features are more difficult with most other kinds
 * of curve parameterization.<p>
 * The <i>end points</i> of the curve (obtained by calling the <code>endPoints</code>
 * method) will be (0, N), where N is the distance to the end of the curve from its
 * start.<p>
 * When converting to an arc length parameterization, the curve
 * should be continuous and have a speed greater than 0 at every
 * point on the curve. The arc length parameterization used in
 * this method is approximate.
 * @returns {Curve} Return value. Returns this object if this curve already uses an arc length parameterization.
 * @example <caption>The following example uses the arc-length
 * parameterization to generate, uniformly at random, a point that lies anywhere
 * on a curve.</caption>
 * var arclen = curve.toArcLengthParam();
 * var point = arclen.evaluate(Math.random()*arclen.getLength())
 */
Curve.prototype.toArcLengthParam = function() {
  if(typeof this.curveParam !== "undefined" && this.curveParam !== null && this.curveParam instanceof Curve._ArcLengthParam) {
    return this;
  }
  return new Curve(this, new Curve._ArcLengthParam(this));
};/*
 Any copyright to this file is released to the Public Domain.
 http://creativecommons.org/publicdomain/zero/1.0/
 If you like this, you should donate
 to Peter O. (original author of
 the Public Domain HTML 3D Library) at:
 http://peteroupc.github.io/
*/

/**
 * A surface evaluator object for a parametric surface.<p>
 * A parametric surface is a surface whose points are based on a
 * parametric surface function. A surface function takes two numbers
 * (U and V) and returns a point (in 1, 2, 3 or more dimensions, but
 * usually 2 or 3) that lies on the surface. For example, in 3
 * dimensions, a surface function has the following form:<p>
 * <b>F</b>(u, v) = [ x(u, v), y(u, v), z(u, v) ]<p>
 * where x(u, v) returns an X coordinate, y(u, v) a Y coordinate,
 * and z(u, v) returns a Z coordinate.<p>
 * Classes or JavaScript objects defining parametric surfaces should implement
 * the <code>evaluate</code> method and, optionally, the other methods mentioned in the "surface" parameter below.
 * @constructor
 * @param {Object} surface A <b>surface evaluator object</b>, which is an object that
 * must contain an <code>evaluate</code> method and may contain an <code>endPoints</code>,
 * <code>tangent</code>, <code>bitangent</code>, and/or <code>gradient</code>
 * method, as described in the corresponding methods of this class.
 */
const Surface = function(surface) {
  this.surface = typeof surface === "undefined" ? null : surface;
};
/** @ignore */
Surface._EPSILON = 0.00001;

/**
 * Finds an approximate tangent vector of this surface at the given U and V coordinates.
 * The implementation in {@link Surface} calls the evaluator's <code>tangent</code>
 * method if it implements it; otherwise, does a numerical differentiation
 * with respect to the U axis using the <code>evaluate</code> method.<p>
 * The <b>tangent vector</b> is the vector pointing in the direction of the U axis,
 * or alternatively, the partial derivative of the <code>evaluate</code> method with respect to <code>u</code>.
 * The tangent vector returned by this method <i>should not</i> be "normalized" to a [unit vector]{@tutorial glmath}.
 * @param {number} u U coordinate of a point on the surface.
 * @param {number} v V coordinate of a point on the surface.
 * @returns {Array<number>} An array describing a tangent vector. It should have at least as many
 * elements as the number of dimensions of the underlying surface.
 */
Surface.prototype.tangent = function(u, v) {
  if(typeof this.surface !== "undefined" && this.surface !== null && (typeof this.surface.tangent !== "undefined" && this.surface.tangent !== null)) {
    return this.surface.tangent(u, v);
  } else {
    let du = Surface._EPSILON;
    let vector = this.evaluate(u + du, v);
    if(vector[0] === 0 && vector[1] === 0 && vector[2] === 0) {
    // too abrupt, try the other direction
      du = -du;
      vector = this.evaluate(u + du, v);
    }
    return MathInternal.vecSubScaleInPlace(vector, this.evaluate(u, v), 1.0 / du);
  }
};
/**
 * Finds an approximate bitangent vector of this surface at the given U and V coordinates.<p>
 * The implementation in {@link Surface} calls the evaluator's <code>bitangent</code>
 * method if it implements it; otherwise, does a numerical differentiation
 * with respect to the V axis using the <code>evaluate</code> method.<p>
 * The <b>bitangent vector</b> is the vector pointing in the direction of the V axis, or alternatively,
 * the partial derivative of the <code>evaluate</code> method with respect to <code>v</code>.  The bitangent vector returned by this method <i>should not</i> be "normalized" to a [unit vector]{@tutorial glmath}.
 * @param {number} u U coordinate of a point on the surface.
 * @param {number} v V coordinate of a point on the surface.
 * @returns {Array<number>} An array describing a bitangent vector. It should have at least as many
 * elements as the number of dimensions of the underlying surface.
 * @example <caption> The following code is a very simple surface evaluator object.
 * var evaluator = new Surface({
 * "evaluate":function(u, v) {
 * // Take the U parameter as the X coordinate,
 * // the V parameter as the Y coordinate, and 0 as
 * // the Z coordinate.
 * return [u, v, 0];
 * }
 * });
 */
Surface.prototype.bitangent = function(u, v) {
  if(typeof this.surface !== "undefined" && this.surface !== null && (typeof this.surface.bitangent !== "undefined" && this.surface.bitangent !== null)) {
    return this.surface.bitangent(u, v);
  } else {
    let du = Surface._EPSILON;
    let vector = this.evaluate(u, v + du);
    if(vector[0] === 0 && vector[1] === 0 && vector[2] === 0) {
    // too abrupt, try the other direction
      du = -du;
      vector = this.evaluate(u, v + du);
    }
    return MathInternal.vecSubScaleInPlace(vector, this.evaluate(u, v), 1.0 / du);
  }
};

/**
 * Convenience method for finding an approximate normal vector of this surface at the given U and V coordinates.
 * The <b>normal vector</b> is the same as the gradient vector, but "normalized" to a unit vector.
 * @param {number} u U coordinate of a point on the surface.
 * @param {number} v V coordinate of a point on the surface.
 * @returns {Array<number>} An array describing a normal vector. It should have at least as many
 * elements as the number of dimensions of the underlying surface.
 */
Surface.prototype.normal = function(u, v) {
  return MathInternal.vecNormalizeInPlace(this.gradient(u, v));
};

/**
 * Finds an approximate gradient vector of this surface at the given U and V coordinates.<p>
 * The implementation in {@link Surface} calls the evaluator's <code>gradient</code>
 * method if it implements it; otherwise uses the surface's tangent and bitangent vectors to implement the gradient
 * (however, this approach is generally only meaningful for a surface in three-dimensional space).<p>
 * The <b>gradient</b> is a vector pointing up and away from the surface.
 * If the evaluator describes a regular three-dimensional surface (usually
 * a continuous, unbroken surface such as a sphere, an open
 * cylinder, or a disk rotated in three dimensions), this can be the cross product
 * of the [tangent vector]{@link Surface#tangent}
 * and [bitangent vector]{@link Surface#bitangent},
 * in that order. The gradient returned by this method <i>should not</i> be "normalized" to a [unit vector]{@tutorial glmath}.
 * @param {number} u U coordinate of a point on the surface.
 * @param {number} v V coordinate of a point on the surface.
 * @returns {Array<number>} An array describing a gradient vector. It should have at least as many
 * elements as the number of dimensions of the underlying surface.
 * @example <caption>The following example is a surface evaluator
 * object for a parametric surface with a gradient method. To illustrate how the gradient method is derived
 * from the vector calculation method, that method is also given below. To
 * derive the normal calculation, first look at the vector function:<p>
 * <b>F</b>(u, v) = (cos(u), sin(u), sin(u)*cos(v))<p>
 * Then, find the partial derivatives with respect to <i>u</i> and to <i>v</i>:<p>
 * &#x2202;<b>F</b>/&#x2202;<i>u</i> = (-sin(u), cos(u), cos(u)*cos(v))<br>
 * &#x2202;<b>F</b>/&#x2202;<i>v</i> = (0, 0, -sin(v)*sin(u))<p>
 * Next, take their cross product:<p>
 * <b>&Del;F</b>(u, v) = (-sin(v)*cos(u)*sin(u), -sin(v)*sin(u)*sin(u), 0)<br><p>
 * The result is the gradient, which will point up and away from the surface.
 * </caption>
 * var surface=new Surface({"evaluate":function(u,v) {
 * "use strict";
 * return [Math.cos(u),Math.sin(u),Math.sin(u)*Math.cos(v)];
 * },
 * "gradient":function(u,v) {
 * "use strict";
 * return [
 * Math.cos(u)*-Math.sin(v)*Math.sin(u),
 * Math.sin(u)*-Math.sin(v)*Math.sin(u),
 * 0];
 * }})
 */
Surface.prototype.gradient = function(u, v) {
  if(typeof this.surface !== "undefined" && this.surface !== null && (typeof this.surface.gradient !== "undefined" && this.surface.gradient !== null)) {
    return this.surface.gradient(u, v);
  } else {
    let tan = this.tangent(u, v);
    let bitan = this.bitangent(u, v);
    if(MathInternal.vecLength(bitan) === 0) {
      return tan;
    }
    if(MathInternal.vecLength(tan) !== 0) {
      if(tan.length !== 3 || bitan.length !== 3) {
        const dims = tan.length;
        const ret = MathInternal.vecZeros(dims);
        tan = [tan[0] || 0, tan[1] || 0, tan[2] || 0];
        bitan = [bitan[0] || 0, bitan[1] || 0, bitan[2] || 0];
        const cr = MathUtil.vec3cross(tan, bitan);
        ret[0] = cr[0];
        ret[1] = cr[1];
        ret[2] = cr[2];
        return ret.slice(0, dims);
      } else {
        return MathUtil.vec3cross(tan, bitan);
      }
    } else {
      return bitan;
    }

  }
};
/**
 * Finds the position of this surface at the given U and V coordinates.
 * @param {number} u U coordinate of a point on the surface.
 * @param {number} v V coordinate of a point on the surface.
 * @returns {Array<number>} An array describing a position. It should have at least as many
 * elements as the number of dimensions of the underlying surface.
 */
Surface.prototype.evaluate = function(u, v) {
  if(typeof this.surface !== "undefined" && this.surface !== null && (typeof this.surface.evaluate !== "undefined" && this.surface.evaluate !== null)) {
    return this.surface.evaluate(u, v);
  } else {
    return [0, 0, 0];
  }
};
/**
 * Returns the starting and ending U and V coordinates of this surface.
 * This method calls the evaluator's <code>endPoints</code>
 * method if it implements it; otherwise, returns <code>[0, 1, 0, 1]</code>
 * @returns A four-element array. The first and second
 * elements are the starting and ending U coordinates, respectively, of the surface, and the third
 * and fourth elements are its starting and ending V coordinates.
 * Returns <code>[0, 1, 0, 1]</code> if the evaluator doesn't implement an <code>endPoints</code>
 * method.
 */
Surface.prototype.endPoints = function() {
  if(typeof this.surface !== "undefined" && this.surface !== null && (typeof this.surface.endPoints !== "undefined" && this.surface.endPoints !== null)) {
    return this.surface.endPoints();
  } else {
    return [0, 1, 0, 1];
  }
};/* global ArrayBuffer, Float32Array, Uint16Array, Uint32Array */

/**
 * A <b>vertex attribute object</b>.
 * @constructor
 * @param {Float32Array} buffer A buffer to store vertex attribute data; see
 * {@link BufferAccessor#buffer}.
 * @param {number} countPerValue Number of elements per value; see
 * {@link BufferAccessor#countPerValue}. Throws an error if 0 or less.
 * @param {number} [offset] Offset to the first value; see
 * {@link BufferAccessor#offset}. If null, undefined, or
 * omitted, the default is 0. Throws an error if less than 0.
 * @param {number} [stride] Number of elements from the start of one
 * value to the start of the next; see
 * {@link BufferAccessor#stride}. If null, undefined, or
 * omitted, has the same value as "countPerValue".
 * Throws an error if 0 or less.
 */
const BufferAccessor = function(buffer, countPerValue, offset, stride) {
  if(typeof stride === "undefined" || stride === null)stride = countPerValue;
  if(typeof offset === "undefined" || offset === null)offset = 0;
  if(offset < 0 || countPerValue <= 0 || stride <= 0)throw new Error();
  /**
   * A <i>buffer</i> of arbitrary size. This buffer
   * is made up of <i>values</i>, one for each vertex, and each value
   * takes up one or more <i>elements</i> in the buffer, which are numbers such
   * as X coordinates or red components, depending on the attribute's semantic.
   * Each value has the same number of elements. An example of a <i>value</i>
   * is (10, 20, 5), which can take up three consecutive <i>elements</i>
   * in a <code>Float32Array</code> buffer such as the one given in this
   * property.
   * @type {Float32Array} */
  this.buffer = buffer;
  /**
   * An offset, which identifies the index, starting from 0, of the first value
   * of the attribute within the buffer. The offset counts the number of
   * elements in the buffer to the first value. For example, if this property is 6,
   * then the first element of the first value in the buffer is found at
   * <code>acc.buffer[acc.offset]</code> (assuming the buffer is
   * more than 6 elements long).
   * @type {number} */
  this.offset = offset;
  /**
   * A count of the number of elements each value has. For example, 3-dimensional
   * positions will have 3 elements, one for each coordinate.
   * @type {number} */
  this.countPerValue = countPerValue;
  /**
   * A stride, which gives the number of elements from the start of one
   * value to the start of the next.  A "packed" buffer will have a stride
   * equal to the [count per value]{@link BufferAccessor#countPerValue}.
   * @type {number} */
  this.stride = stride;
};
/**
 * Gets the number of [values]{@link BufferAccessor#buffer} defined for this accessor.
 * @returns {number} The number of values defined in this accessor's buffer.
 */
BufferAccessor.prototype.count = function() {
  const olen = this.buffer.length - this.offset;
  const odiv = Math.floor(olen / this.stride);
  return odiv + (olen % this.stride >= this.countPerValue ? 1 : 0);
};
/**
 * Gets the first element of the attribute value with the given vertex index.<p>
 * Note that currently, this method does no bounds checking beyond the
 * checking naturally done when accessing the attribute's buffer.
 * @param {number} index A numeric index, starting from 0, that identifies
 * a value stored in the attribute's buffer. For example, 0 identifies the first
 * value, 1 identifies the second, and so on.
 * @returns {number} The first element of the given attribute value.
 */
BufferAccessor.prototype.get = function( index) {
  const o = this.offset + index * this.stride;
  return this.buffer[o];
};
/**
 * Sets the first element of the attribute value with the given vertex index.<p>
 * Note that currently, this method does no bounds checking beyond the
 * checking naturally done when writing to the attribute's buffer.
 * @param {number} index A numeric index, starting from 0, that identifies
 * a value stored in the attribute's buffer. For example, 0 identifies the first
 * value, 1 identifies the second, and so on.
 * @param {number} value The number to set the first element to.
 * @returns {BufferAccessor} This object.
 */
BufferAccessor.prototype.set = function(index, value) {
  const o = this.offset + index * this.stride;
  this.buffer[o] = value;
  return this;
};
/**
 * Gets the elements of a vertex attribute value.<p>
 * Note that currently, this method does no bounds checking beyond the
 * checking naturally done when accessing the attribute's buffer.
 * @param {number} index A numeric index, starting from 0, that identifies
 * a value stored in the attribute's buffer. For example, 0 identifies the first
 * value, 1 identifies the second, and so on.
 * @param {Array<number>} vec An array whose elements will be set to those
 * of the value at the given index. The number of elements copied to this
 * array is the attribute's count per value (see {@link BufferAccessor#countPerValue}).
 * @returns {Array<number>} The parameter "vec".
 */
BufferAccessor.prototype.getVec = function(index, vec) {
  const o = this.offset + index * this.stride;
  const buffer = this.buffer;
  let i;
  for (i = 0; i < this.countPerValue; i++) {
    vec[i] = buffer[o + i];
  }
  return vec;
};
/**
 * Sets the elements of a vertex attribute value.<p>
 * Note that currently, this method does no bounds checking beyond the
 * checking naturally done when writing to the attribute's buffer, except
 * where noted otherwise.
 * @param {number} index A numeric index, starting from 0, that identifies
 * a value stored in the attribute's buffer. For example, 0 identifies the first
 * value, 1 identifies the second, and so on.
 * @param {Array<number>} vec An array containing the elements
 * to copy to the value at the given index. The number of elements copied is this
 * array's length or the attribute's count per value (see {@link BufferAccessor#countPerValue}),
 * whichever is less.
 * @returns {BufferAccessor} This object.
 */
BufferAccessor.prototype.setVec = function(index, vec) {
  const o = this.offset + index * this.stride;
  const buffer = this.buffer;
  const alen = Math.min(vec.length, this.countPerValue);
  let i;
  for (i = 0; i < alen; i++) {
    buffer[o + i] = vec[i];
  }
  return this;
};
/**
 * Sets the first and second elements of a vertex attribute value.<p>
 * Note that currently, this method does no bounds checking beyond the
 * checking naturally done when writing to the attribute's buffer, except
 * where noted otherwise.
 * @param {number} index A numeric index, starting from 0, that identifies
 * a value stored in the attribute's buffer. For example, 0 identifies the first
 * value, 1 identifies the second, and so on.
 * @param {number} x The value to copy to the first element of the value at the given
 * index, if the attribute stores 1-element or bigger values.
 * @param {number} y The value to copy to the second element of the value at the given
 * index, if the attribute stores 2-element or bigger values.
 * @returns {BufferAccessor} This object.
 */
BufferAccessor.prototype.setXy = function(index, x, y) {
  const o = this.offset + index * this.stride;
  const buffer = this.buffer;
  if(this.countPerValue >= 1)buffer[o] = x;
  if(this.countPerValue >= 2)buffer[o + 1] = y;
  return this;
};
/**
 * Sets the first, second, and third elements of a vertex attribute value.<p>
 * Note that currently, this method does no bounds checking beyond the
 * checking naturally done when writing to the attribute's buffer, except
 * where noted otherwise.
 * @param {number} index A numeric index, starting from 0, that identifies
 * a value stored in the attribute's buffer. For example, 0 identifies the first
 * value, 1 identifies the second, and so on.
 * @param {number} x The value to copy to the first element of the value at the given
 * index, if the attribute stores 1-element or bigger values.
 * @param {number} y The value to copy to the second element of the value at the given
 * index, if the attribute stores 2-element or bigger values.
 * @param {number} z The value to copy to the third element of the value at the given
 * index, if the attribute stores 3-element or bigger values.
 * @returns {BufferAccessor} This object.
 */
BufferAccessor.prototype.setXyz = function(index, x, y, z) {
  const o = this.offset + index * this.stride;
  const buffer = this.buffer;
  if(this.countPerValue >= 1)buffer[o] = x;
  if(this.countPerValue >= 2)buffer[o + 1] = y;
  if(this.countPerValue >= 2)buffer[o + 2] = z;
  return this;
};
/**
 * Copies the values of this accessor into a new vertex attribute object.
 * @returns {BufferAccessor} A copy of the vertex attribute object.
 */
BufferAccessor.prototype.copy = function() {
  const c = this.count();
  const newAttribute = BufferAccessor.makeBlank(c, this.countPerValue);
  const value = [];
  let i;
  for (i = 0; i < c; i++) {
    this.getVec(i, value);
    newAttribute.setVec( i, value);
  }
  return newAttribute;
};
/**
 * Generates a vertex attribute buffer, with each value set to all zeros.
 * @param {number} count The number of [values]{@link BufferAccessor#buffer}
 * the buffer will hold. For example, (10, 20, 5) is a 3-element value.
 * @param {number} countPerValue The number of elements each value will take in the buffer.
 * @returns {BufferAccessor} A blank vertex attribute buffer.
 */
BufferAccessor.makeBlank = function(count, countPerValue) {
  return new BufferAccessor(
    new Float32Array(new ArrayBuffer(count * countPerValue * 4)), countPerValue);
};

/**
 * Generates an array of increasing vertex indices.
 * @param {number} numIndices The number of vertex indices to generate.
 * The array will range from 0 to the number of vertex indices minus 1.
 * @returns {Uint16Array|Uint32Array} An array of vertex indices.
 */
BufferAccessor.makeIndices = function(numIndices) {
  let array;
  if(numIndices < 65536) {
    array = new Uint16Array(new ArrayBuffer(numIndices * 2));
  } else {
    array = new Uint32Array(new ArrayBuffer(numIndices * 4));
  }
  let i;
  for (i = 0; i < numIndices; i++) {
    array[i] = i;
  }
  return array;
};
/**
 * Merges two vertex attributes, whose vertices can be indexed differently, into one
 * combined vertex attribute.
 * @param {BufferAccessor} attr1 A vertex buffer accessor for the first vertex attribute.
 * Can be null, in which case it is assumed that the attribute contains as many values
 * as the length of "indices1" and all the values are zeros.
 * @param {Array<number>|Uint16Array|Uint8Array|Uint32Array} indices1 An array of vertex indices
 * associated with the first vertex attribute.
 * @param {BufferAccessor} attr2 A vertex buffer accessor for the second vertex attribute.
 * Can be null, in which case it is assumed that the attribute contains as many values as the
 * length of "indices2" and all the values are zeros.
 * @param {Array<number>|Uint16Array|Uint8Array|Uint32Array} indices2 An array of vertex indices
 * associated with the second vertex attribute.
 * @returns {BufferAccessor} The merged attribute, where the vertices from the first vertex
 * attribute come before those from the second. The merged attribute will have as many
 * values as the sum of the lengths of "indices1" and "indices2".
 */
BufferAccessor.merge = function(attr1, indices1, attr2, indices2) {
  const countPerValue1 = typeof attr1 === "undefined" || attr1 === null ? 0 : attr1.countPerValue;
  const countPerValue2 = typeof attr2 === "undefined" || attr2 === null ? 0 : attr2.countPerValue;
  let i;
  const elementsPerValue = Math.max(countPerValue1, countPerValue2);
  // NOTE: Buffer returned by makeBlank will be all zeros
  const newAttribute = BufferAccessor.makeBlank(
    indices1.length + indices2.length, elementsPerValue);
  const value = MathInternal.vecZeros(elementsPerValue);
  // NOTE: If undefined or null, first part of buffer will remain all zeros
  if(typeof attr1 !== "undefined" && attr1 !== null) {
    for(i = 0; i < indices1.length; i++) {
      if(attr1)attr1.getVec(indices1[i], value);
      newAttribute.setVec(i, value);
    }
  }
  // NOTE: If undefined or null, second part of buffer will remain all zeros
  if(typeof attr2 !== "undefined" && attr2 !== null) {
    for(i = 0; i < indices2.length; i++) {
      if(attr2)attr2.getVec(indices2[i], value);
      newAttribute.setVec(indices1.length + i, value);
    }
  }
  return newAttribute;
};/*
 Any copyright to this file is released to the Public Domain.
 http://creativecommons.org/publicdomain/zero/1.0/
 If you like this, you should donate
 to Peter O. (original author of
 the Public Domain HTML 3D Library) at:
 http://peteroupc.github.io/
*/
/**
 * Contains constants for assigning semantics
 * to vertex attributes found in mesh buffers and
 * to data that is uniform throughout a particular
 * geometry draw call.
 * @constructor
 * @readonly
 */
const Semantic = {};
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
Semantic.JOINTMATRIX = 108;/*
 Any copyright to this file is released to the Public Domain.
 http://creativecommons.org/publicdomain/zero/1.0/
 If you like this, you should donate
 to Peter O. (original author of
 the Public Domain HTML 3D Library) at:
 http://peteroupc.github.io/
*/
/**
 * A geometric mesh in the form of buffer objects.
 * A mesh buffer is made up of one or more [vertex attribute objects]{@link BufferAccessor},
 * and an optional array of vertex indices. Each vertex attribute object contains
 * the values of one attribute of the mesh, such as positions,
 * vertex normals, and texture coordinates. A mesh buffer
 * can store vertices that make up triangles, line segments, or points.<p>
 * This constructor creates an empty mesh buffer and sets the array
 * of vertex indices to null and the primitive type to {@link MeshBuffer.TRIANGLES}.<p>
 * The `MeshBuffer` class contains four methods (`fromPositions`,
 * `fromPositionsNormals`, `fromPositionsUV`, and `fromPositionsNormalsUV`) that let you define a mesh buffer from a predefined array of vertex data. See the documentation for those methods for more information.<p>
 * The [`Meshes`]{@link Meshes} class includes several handy methods for creating built-in shapes; those methods return a `MeshBuffer` object that describes the triangles they
 * are composed of.
 * <p><b>Instancing</b>
 * <p>Some 3D rendering pipelines support <i>instancing</i>, which is a technique for rendering multiple versions of a mesh buffer with a single draw call. Instancing involves the use of a second mesh buffer (an <i>instance buffer</i>); rather than holding vertex data, the instance buffer holds <i>instance data</i>, that is, data to be used when rendering each instance of the first mesh buffer. Besides this, however, instance buffers are largely similar to vertex buffers as far as the <code>MeshBuffer</code> class is concerned; any reference to vertices in the documentation applies analogously to instances in instance buffers. However, instance buffers should use the primitive type <code>MeshBuffer.POINTS</code>; it makes little sense to have instance buffers describe triangles or line segments.
 * @constructor
 * @example <caption>The following example converts a MeshBuffer object to three.js buffer geometries (and thus serves as a bridge between this library and three.js). Pass the return value to the <code>THREE.Mesh</code>, <code>THREE.LineSegments</code>, or <code>THREE.Points</code> constructor to generate the appropriate kind of shape object depending on the MeshBuffer's primitive type. This example requires the three.js library.</caption>
 * function toBufferGeometry(mesh) {
 * var p=mesh.getAttribute("POSITION")
 * var n=mesh.getAttribute("NORMAL")
 * var t=mesh.getAttribute("TEXCOORD_0")
 * var c=mesh.getAttribute("COLOR")
 * var ind=mesh.getIndices()
 * var geom=new THREE.BufferGeometry()
 * var attributes=[p,n,t,c]
 * var attributeNames=["position","normal","uv","color"]
 * for(var i=0;i<attributes.length;i++) {
 * if(attributes[i]) {
 * var a=attributes[i]
 * //console.log(a)
 * var attr=new THREE.InterleavedBufferAttribute(
 * new THREE.InterleavedBuffer(a.buffer,a.stride),
 * a.countPerValue,a.offset)
 * geom.addAttribute(attributeNames[i],attr)
 * }
 * }
 * if(ind)geom.index=new THREE.BufferAttribute(
 * ind,1)
 * return geom
 * }
 */
const MeshBuffer = function() {
  /** @ignore */
  this._primitiveType = MeshBuffer.TRIANGLES;
  /** @ignore */
  this.attributes = [];
  /** @ignore */
  this._bounds = null;
  /** @ignore */
  this.indices = null;
};
/**
 * Gets the array of vertex indices used by this mesh buffer.
 * @returns {Uint16Array|Uint32Array|Uint8Array} Return value.
 */
MeshBuffer.prototype.getIndices = function() {
  return this.indices;
};
/**
 * Gets the array of vertex indices used by this mesh buffer, or if
 * such an array doesn't exist, builds an array containing one index
 * for each vertex in this mesh buffer, in the order in which those
 * vertices appear.
 * @returns {Uint16Array|Uint32Array|Uint8Array} The vertex index array.
 */
MeshBuffer.prototype.ensureIndices = function() {
  if(typeof this.indices === "undefined" || this.indices === null) {
    this.indices = BufferAccessor.makeIndices(this.vertexCount());
  }
  return this.indices;
};

/**
 * Sets the vertex indices used by this mesh buffer.
 * @param {Array<number>|Uint16Array|Uint32Array|Uint8Array|null} [indices] Array of vertex indices
 * that the mesh buffer will use. Can be null, in which case no index array is used and primitives in the mesh buffer are marked by consecutive vertices.
 * @returns {MeshBuffer} This object.
 */
MeshBuffer.prototype.setIndices = function(indices) {
  if(typeof indices === "undefined" || indices === null) {
    this.indices = null;
  } else if(indices instanceof Array) {
    let index = 0;
    let i;
    for (i = indices.length - 1; i >= 0; i--) {
      index = Math.max(index, indices[i]);
      if(index >= 65536)break;
    }
    if(index >= 65536) {
      this.indices = new Uint32Array(indices);
    } else {
      this.indices = new Uint16Array(indices);
    }
  } else {
    this.indices = indices.slice(0, indices.length);
  }
  return this;
};
/**
 * Sets the type of graphics primitives stored in this mesh buffer.
 * By default, the primitive type is {@link MeshBuffer.TRIANGLES}.
 * @param {number} primType The primitive type, either {@link MeshBuffer.TRIANGLES},
 * {@link MeshBuffer.LINES}, or {@link MeshBuffer.POINTS}.
 * For TRIANGLES, every three vertices or vertex indices identify
 * a single triangle.
 * For LINES, every two vertices or vertex indices identify
 * a single line segment.
 * For POINTS, every vertex or vertex index identifies
 * a single point.
 * @returns {MeshBuffer} This object.
 */
MeshBuffer.prototype.setType = function(primType) {
  this._primitiveType = primType;
  return this;
};

/**
 * Adds information about a buffer attribute to this
 * mesh buffer (or sets an
 * existing attribute's information). An attribute
 * gives information about the per-vertex data used and
 * stored in a vertex buffer.
 * @param {number|string} name An attribute semantic, such
 * as {@link Semantic.POSITION}, "POSITION", or "TEXCOORD_0".
 * Throws an error if this value is a string and the string is invalid.
 * If this isn't a string, the set index of the attribute will be 0 (see {@link MeshBuffer#setAttributeEx}).
 * @param {Float32Array|Array} buffer The buffer where
 * the per-vertex data is stored. See {@link MeshBuffer#setAttributeEx}.
 * @param {number} countPerValue The number of elements in each
 * per-vertex item. See {@link MeshBuffer#setAttributeEx}.
 * @param {number} [offset] The index into the array
 * (starting from 0) where the first per-vertex
 * item starts.See {@link MeshBuffer#setAttributeEx}.
 * @param {number} [stride] The number of elements from the start of
 * one per-vertex item to the start of the next. See {@link MeshBuffer#setAttributeEx}.
 * @returns {MeshBuffer} This object. Throws an error if the given
 * semantic is unsupported.
 */
MeshBuffer.prototype.setAttribute = function(
  name, buffer, countPerValue, offset, stride
) {
  return this.setAttributeEx(name, 0, buffer, countPerValue, offset, stride);
};

/**
 * Adds information about a buffer attribute to this
 * mesh buffer (or sets an
 * existing attribute's information), taking a semantic index as
 * an additional parameter. An attribute
 * gives information about the per-vertex data used and
 * stored in a vertex buffer.
 * @param {number|string} name An attribute semantic, such
 * as {@link Semantic.POSITION}, "POSITION", or "TEXCOORD_0".
 * Throws an error if this value is a string and the string is invalid.
 * @param {number} index The semantic index of the attribute
 * for the given semantic.
 * 0 is the first index of the attribute, 1 is the second, and so on.
 * This is ignored if "name" is a string.
 * @param {Float32Array|Array|BufferAccessor} buffer The buffer where
 * the per-vertex data is stored. If this parameter is an (untyped) Array, converts
 * that parameter to a Float32Array.
 * @param {number} [countPerValue] The number of elements in each
 * per-vertex item. For example, if each vertex is a 3-element
 * vector, this value is 3. Throws an error if this value is 0 or less.
 * If "buffer" is a {@link BufferAccessor}, the value of "countPerValue"
 * is taken from that accessor and this parameter is ignored; this parameter
 * is currently required otherwise.
 * @param {number} [offset] The index into the array
 * (starting from 0) where the first per-vertex
 * item starts. If null, undefined, or
 * omitted, the default is 0. Throws an error if less than 0.
 * If "buffer" is a {@link BufferAccessor}, the value of "offset"
 * is taken from that accessor and this parameter is ignored.
 * @param {number} [stride] The number of elements from the start of
 * one per-vertex item to the start of the next. If null, undefined, or omitted,
 * this value is the same as "countPerValue". Throws an error if this value is 0 or less.
 * If "buffer" is a {@link BufferAccessor}, the value of "stride"
 * is taken from that accessor and this parameter is ignored.
 * @returns {MeshBuffer} This object.Throws an error if the given
 * semantic is unsupported.
 */
MeshBuffer.prototype.setAttributeEx = function(
  name, index, buffer, countPerValue, offset, stride
) {
  let bufferArray;
  if(buffer instanceof BufferAccessor) {
    if(buffer.buffer instanceof BufferAccessor)throw new Error();
    return this.setAttributeEx(name, index, buffer.buffer,
      buffer.countPerValue, buffer.offset, buffer.stride);
  } else if(typeof countPerValue === "undefined" || countPerValue === null)throw new Error();
  if(buffer instanceof Array) {
    bufferArray = new Float32Array(buffer);
  } else {
    bufferArray = buffer;
  }
  let semanticIndex = 0;
  let semantic = 0;
  const strideValue = typeof stride === "undefined" || stride === null ? countPerValue : stride;
  const startIndex = typeof offset === "undefined" || offset === null ? 0 : offset;
  if(countPerValue <= 0 || strideValue <= 0 || startIndex < 0)throw new Error();
  const sem = MeshBuffer._resolveSemantic(name, index);
  if(typeof sem === "undefined" || sem === null) {
    console.warn("Unsupported attribute semantic: " + name);
    return this;
  }
  semantic = sem[0];
  semanticIndex = sem[1];
  const attr = this.getAttribute(semantic, semanticIndex);
  if(attr) {
    attr[2].buffer = buffer;
    attr[2].offset = startIndex;
    attr[2].countPerValue = countPerValue;
    attr[2].stride = strideValue;
  } else {
    this.attributes.push([semantic, semanticIndex,
      new BufferAccessor(bufferArray, countPerValue, startIndex, strideValue)]);
  }
  this._bounds = null;
  return this;
};

/** @ignore */
MeshBuffer.prototype._getAttributes = function() {
  return this.attributes;
};
/**
 * Gets the vertex data index for use in referencing
 * vertex data in buffer attributes.
 * @param {number} indicesIndex A number 0 or greater, and less
 * than the return value of {@link MeshBuffer#vertexCount}. For example,
 * if this mesh buffer holds triangles, 0 means the first vertex, 1 the
 * second vertex, and 2 the third vertex of the first triangle, regardless
 * of where that vertex's data is stored in the mesh buffer.
 * @returns {number} The vertex data index; this is <code>getIndices()[indicesIndex]</code>
 * if this mesh buffer includes an index array, or <code>indicesIndex</code> otherwise.
 */
MeshBuffer.prototype.getIndex = function(indicesIndex) {
  if(typeof this.indices === "undefined" || this.indices === null)return indicesIndex;
  return this.indices[indicesIndex];
};
/**
 * Gets a vertex attribute included in this mesh buffer.
 * @param {number|string} name An attribute semantic, such
 * as {@link Semantic.POSITION}, "POSITION", or "TEXCOORD_0".
 * Throws an error if this value is a string and the string is invalid.
 * @param {number} [semanticIndex] The set index of the attribute
 * for the given semantic.
 * 0 is the first index of the attribute, 1 is the second, and so on.
 * This is ignored if "name" is a string. Otherwise, if null or omitted, the default value is 0.
 * @returns {BufferAccessor} A vertex buffer accessor, or null
 * if the attribute doesn't exist.
 * @example <caption>The following function gets the positions,
 * normals, [texture coordinates]{@link Semantic.TEXCOORD} and colors of each primitive
 * (line, text, or point) in the mesh buffer. A point will have one
 * vertex per primitive, a line two vertices and a triangle three.
 * The attributes, if present, will be stored in the "position",
 * "normal", "uv", and "color" properties of each vertex.</caption>
 * function getPrimitives(mesh) {
 * var p=mesh.getAttribute("POSITION")
 * var n=mesh.getAttribute("NORMAL")
 * var t=mesh.getAttribute("TEXCOORD_0")
 * var c=mesh.getAttribute("COLOR")
 * var count=mesh.vertexCount()
 * var primSize = 3;
 * if(mesh.primitiveType() === MeshBuffer.LINES)
 * primSize = 2;
 * if(mesh.primitiveType() === MeshBuffer.POINTS)
 * primSize = 1;
 * var ret=[]
 * for(var i=0;i&lt;ind.length;i+=primSize) {
 * var prim=[]
 * var index=mesh.getIndex(i)
 * for(var j=0;j&lt;primSize;j++) {
 * var info={}
 * if(p)info.position=p.getVec(index,[])
 * if(n)info.normal=n.getVec(index,[])
 * if(t)info.uv=t.getVec(index,[])
 * if(c)info.color=c.getVec(index,[])
 * }
 * ret.push(prim)
 * }
 * return ret
 * }
 */
MeshBuffer.prototype.getAttribute = function(name, semanticIndex) {
  const sem = MeshBuffer._resolveSemantic(name, semanticIndex);
  if(typeof sem === "undefined" || sem === null) {
    console.warn("Unsupported attribute semantic: " + name);
    return null;
  }
  let i;
  for (i = 0; i < this.attributes.length; i++) {
    if(this.attributes[i][0] === sem[0] &&
    this.attributes[i][1] === sem[1]) {
      return this.attributes[i][2];
    }
  }
  return null;
};
/**
 * Gets the vertex indices of a given primitive (triangle, line,
 * or point) in this mesh buffer.
 * @param {number} primitiveIndex The index (counting from 0)
 * of the primitive whose indices will be retrieved.
 * @param {Array<number>} ret An array where the vertex indices for
 * the given primitive will be stored. If this mesh buffer stores
 * triangles, three indices will be stored; if lines, two; and if
 * points, one.
 * @returns {Array<number>} The parameter "ret".
 */
MeshBuffer.prototype.vertexIndices = function(primitiveIndex, ret) {
  const prim = this.primitiveType();
  const count = prim === MeshBuffer.LINES ? 2 :
    prim === MeshBuffer.POINTS ? 1 : 3;
  const i = primitiveIndex * count;
  if(typeof this.indices === "undefined" || this.indices === null) {
    if(i + count > this.vertexCount())throw new Error();
    ret[0] = i;
    if(count >= 2)ret[1] = i + 1;
    if(count >= 3)ret[2] = i + 2;
  } else {
    ret[0] = this.indices[i];
    if(count >= 2)ret[1] = this.indices[i + 1];
    if(count >= 3)ret[2] = this.indices[i + 2];
  }
  return ret;
};

/**
 * Creates a new mesh buffer with the given array of vertex positions.
 * @param {Array<number>|Float32Array} vertices An array of vertex positions. This
 * array's length must be divisible by 3; every 3 elements are the
 * X, Y, and Z coordinates, in that order, of one vertex.
 * @param {Array<number>|Uint16Array|Uint32Array|Uint8Array|null|undefined} [indices] Array of vertex indices
 * that the mesh buffer will use. Each index (n) is a number referring to the (n+1)th vertex. If you are defining a set of triangles, there should be 3 indices for each triangle; for line segments, 2 indices for each segment; and for points, 1 index for each point. Can be null, undefined, or omitted, in which case no index array is used and primitives in the mesh buffer are marked by consecutive vertices.
 * @returns {MeshBuffer} A new mesh buffer.
 * @example <caption>The following example shows how to define a mesh
 * buffer from a predefined array of vertex positions.</caption>
 * // First, create an array of numbers giving the X, Y, and
 * // Z coordinate for each vertex position. Here, three vertices
 * // are defined.
 * var vertices = [x1, y1, z1, x2, y2, z2, x3, y3, z3 ];
 * // Second -- and this is optional -- create a second array of numbers
 * // giving the indices to vertices defined in the previous step.
 * // Each index refers to the (n+1)th vertex; since 3 vertices
 * // were defined, the highest index is 2.
 * var indices = [0, 1, 2];
 * // Finally, create the mesh buffer. (If there are no indices,
 * // leave out the "indices" argument.)
 * var meshBuffer=MeshBuffer.fromPositions(vertices, indices);
 * @example <caption>The following example generates a mesh buffer
 * consisting of a 10x10x10 grid of points. This mesh buffer can serve, for
 * example, as instance data to draw multiple instances
 * of a 3-D cube in different positions.</caption>
 * var vertices=[]
 * for(var x=0;x<10;x++)
 * for(var y=0;y<10;y++)
 * for(var z=0;z<10;z++)vertices.push(x,y,z);
 * var meshBuffer=MeshBuffer.fromPositions(vertices)
 * .setType(MeshBuffer.POINTS);
 */
MeshBuffer.fromPositions = function(vertices, indices) {
  const vertarray = new Float32Array(vertices);
  return new MeshBuffer().setAttribute("POSITION", vertarray, 3, 0)
    .setIndices(indices);
};

/**
 * Creates a new mesh buffer with the given array of vertex positions
 * and vertex normals.
 * @param {Array<number>|Float32Array} vertices An array of vertex data. This
 * array's length must be divisible by 6; every 6 elements describe
 * one vertex and are in the following order:<ol>
 * <li>X, Y, and Z coordinates, in that order, of the vertex position.
 * <li>X, Y, and Z components, in that order, of the vertex normal.</ol>
 * @param {Array<number>|Uint16Array|Uint32Array|Uint8Array|null|undefined} [indices] Array of vertex indices
 * that the mesh buffer will use. Each index (n) is a number referring to the (n+1)th vertex. If you are defining a set of triangles, there should be 3 indices for each triangle; for line segments, 2 indices for each segment; and for points, 1 index for each point. Can be null, undefined, or omitted, in which case no index array is used and primitives in the mesh buffer are marked by consecutive vertices.
 * @returns {MeshBuffer} A new mesh buffer.
 * @example <caption>The following example shows how to define a mesh
 * buffer from a predefined array of vertex positions and normals.</caption>
 * // First, create an array of numbers giving the X, Y, and
 * // Z coordinate for each vertex position and normal. Here, three vertices
 * // are defined. For each vertex, the position is given, followed by
 * // the normal.
 * var vertices = [
 * x1, y1, z1, nx1, ny1, nz1,
 * x2, y2, z2, nx2, ny2, nz2,
 * x3, y3, z3, nx3, ny3, nz3 ];
 * // Second -- and this is optional -- create a second array of numbers
 * // giving the indices to vertices defined in the previous step.
 * // Each index refers to the (n+1)th vertex; since 3 vertices
 * // were defined, the highest index is 2.
 * var indices = [0, 1, 2];
 * // Finally, create the mesh buffer. (If there are no indices,
 * // leave out the "indices" argument.)
 * var meshBuffer=MeshBuffer.fromPositionsNormals(vertices, indices);
 */
MeshBuffer.fromPositionsNormals = function(vertices, indices) {
  const vertarray = new Float32Array(vertices);
  return new MeshBuffer()
    .setAttribute("POSITION", vertarray, 3, 0, 6)
    .setAttribute("NORMAL", vertarray, 3, 3, 6).setIndices(indices);
};

/**
 * Creates a new mesh buffer with the given array of vertex positions,
 * vertex normals, and texture coordinates.
 * @param {Array<number>|Float32Array} vertices An array of vertex data. This
 * array's length must be divisible by 8; every 8 elements describe
 * one vertex and are in the following order:<ol>
 * <li>X, Y, and Z coordinates, in that order, of the vertex position.
 * <li>X, Y, and Z components, in that order, of the vertex normal.
 * <li>U and V [texture coordinates]{@link Semantic.TEXCOORD} in that order, of the vertex.</ol>
 * @param {Array<number>|Uint16Array|Uint32Array|Uint8Array|null|undefined} [indices] Array of vertex indices
 * that the mesh buffer will use. Each index (n) is a number referring to the (n+1)th vertex. If you are defining a set of triangles, there should be 3 indices for each triangle; for line segments, 2 indices for each segment; and for points, 1 index for each point. Can be null, undefined, or omitted, in which case no index array is used and primitives in the mesh buffer are marked by consecutive vertices.
 * @returns {MeshBuffer} A new mesh buffer.
 * @example <caption>The following example shows how to define a mesh
 * buffer from a predefined array of vertex positions, normals,
 * and texture cordinates.</caption>
 * // First, create an array of numbers giving the X, Y, and
 * // Z coordinate for each vertex position and normal, and associated
 * // texture coordinates. Here, three vertices
 * // are defined. For each vertex, the position is given, followed by
 * // the normal, followed by the texture coordinates.
 * var vertices = [
 * x1, y1, z1, nx1, ny1, nz1, u1, v1,
 * x2, y2, z2, nx2, ny2, nz2, u2, v2,
 * x3, y3, z3, nx3, ny3, nz3, u3, v3 ];
 * // Second -- and this is optional -- create a second array of numbers
 * // giving the indices to vertices defined in the previous step.
 * // Each index refers to the (n+1)th vertex; since 3 vertices
 * // were defined, the highest index is 2.
 * var indices = [0, 1, 2];
 * // Finally, create the mesh buffer. (If there are no indices,
 * // leave out the "indices" argument.)
 * var meshBuffer=MeshBuffer.fromPositionsNormalsUV(vertices, indices);
 */
MeshBuffer.fromPositionsNormalsUV = function(vertices, indices) {
  const vertarray = new Float32Array(vertices);
  return new MeshBuffer()
    .setAttribute("POSITION", vertarray, 3, 0, 8)
    .setAttribute("NORMAL", vertarray, 3, 3, 8)
    .setAttribute("TEXCOORD", vertarray, 2, 6, 8).setIndices(indices);
};

/**
 * Creates a new mesh buffer with the given array of vertex positions
 * and vertex colors.
 * @param {Array<number>|Float32Array} vertices An array of vertex data. This
 * array's length must be divisible by 6; every 6 elements describe
 * one vertex and are in the following order:<ol>
 * <li>X, Y, and Z coordinates, in that order, of the vertex position.
 * <li>Red, green, and blue components, in that order, of the vertex color, where each component ranges from a low of 0 to a high of 1.</ol>
 * @param {Array<number>|Uint16Array|Uint32Array|Uint8Array|null|undefined} [indices] Array of vertex indices
 * that the mesh buffer will use. Each index (n) is a number referring to the (n+1)th vertex. If you are defining a set of triangles, there should be 3 indices for each triangle; for line segments, 2 indices for each segment; and for points, 1 index for each point. Can be null, undefined, or omitted, in which case no index array is used and primitives in the mesh buffer are marked by consecutive vertices.
 * @returns {MeshBuffer} A new mesh buffer.
 * @example <caption>The following example shows how to define a mesh
 * buffer from a predefined array of vertex positions, normals,
 * and texture cordinates.</caption>
 * // First, create an array of numbers giving the X, Y, and
 * // Z coordinate for each vertex position and associated
 * // color components. Here, three vertices
 * // are defined. For each vertex, the position is given, followed by
 * // the color components.
 * var vertices = [
 * x1, y1, z1, r1, g1, b1,
 * x2, y2, z2, r2, g2, b2,
 * x3, y3, z3, r3, g3, b3 ];
 * // Second -- and this is optional -- create a second array of numbers
 * // giving the indices to vertices defined in the previous step.
 * // Each index refers to the (n+1)th vertex; since 3 vertices
 * // were defined, the highest index is 2.
 * var indices = [0, 1, 2];
 * // Finally, create the mesh buffer. (If there are no indices,
 * // leave out the "indices" argument.)
 * var meshBuffer=MeshBuffer.fromPositionsColors(vertices, indices);
 */
MeshBuffer.fromPositionsColors = function(vertices, indices) {
  const vertarray = new Float32Array(vertices);
  return new MeshBuffer()
    .setAttribute("POSITION", vertarray, 3, 0, 6)
    .setAttribute("COLOR", vertarray, 3, 3, 6).setIndices(indices);
};

/**
 * Creates a new mesh buffer with the given array of vertex positions,
 * vertex normals, and vertex colors.
 * @param {Array<number>|Float32Array} vertices An array of vertex data. This
 * array's length must be divisible by 9; every 9 elements describe
 * one vertex and are in the following order:<ol>
 * <li>X, Y, and Z coordinates, in that order, of the vertex position.
 * <li>X, Y, and Z components, in that order, of the vertex normal.
 * <li>Red, green, and blue components, in that order, of the vertex color, where each component ranges from a low of 0 to a high of 1.</ol>
 * @param {Array<number>|Uint16Array|Uint32Array|Uint8Array|null|undefined} [indices] Array of vertex indices
 * that the mesh buffer will use. Each index (n) is a number referring to the (n+1)th vertex. If you are defining a set of triangles, there should be 3 indices for each triangle; for line segments, 2 indices for each segment; and for points, 1 index for each point. Can be null, undefined, or omitted, in which case no index array is used and primitives in the mesh buffer are marked by consecutive vertices.
 * @returns {MeshBuffer} A new mesh buffer.
 * @example <caption>The following example shows how to define a mesh
 * buffer from a predefined array of vertex positions, normals,
 * and texture cordinates.</caption>
 * // First, create an array of numbers giving the X, Y, and
 * // Z coordinate for each vertex position and normal, and associated
 * // color components. Here, three vertices
 * // are defined. For each vertex, the position is given, followed by
 * // the normal, followed by the color components.
 * var vertices = [
 * x1, y1, z1, nx1, ny1, nz1, r1, g1, b1,
 * x2, y2, z2, nx2, ny2, nz2, r2, g2, b2,
 * x3, y3, z3, nx3, ny3, nz3, r3, g3, b3 ];
 * // Second -- and this is optional -- create a second array of numbers
 * // giving the indices to vertices defined in the previous step.
 * // Each index refers to the (n+1)th vertex; since 3 vertices
 * // were defined, the highest index is 2.
 * var indices = [0, 1, 2];
 * // Finally, create the mesh buffer. (If there are no indices,
 * // leave out the "indices" argument.)
 * var meshBuffer=MeshBuffer.fromPositionsNormalsColors(vertices, indices);
 */
MeshBuffer.fromPositionsNormalsColors = function(vertices, indices) {
  const vertarray = new Float32Array(vertices);
  return new MeshBuffer()
    .setAttribute("POSITION", vertarray, 3, 0, 9)
    .setAttribute("NORMAL", vertarray, 3, 3, 9)
    .setAttribute("COLOR", vertarray, 3, 6, 9).setIndices(indices);
};

/**
 * Creates a new mesh buffer with the given array of vertex positions
 * and texture coordinates.
 * @param {Array<number>|Float32Array} vertices An array of vertex data. This
 * array's length must be divisible by 5; every 5 elements describe
 * one vertex and are in the following order:<ol>
 * <li>X, Y, and Z coordinates, in that order, of the vertex position.
 * <li>U and V [texture coordinates]{@link Semantic.TEXCOORD} in that order, of the vertex.</ol>
 * @param {Array<number>|Uint16Array|Uint32Array|Uint8Array|null|undefined} [indices] Array of vertex indices
 * that the mesh buffer will use. Each index (n) is a number referring to the (n+1)th vertex. If you are defining a set of triangles, there should be 3 indices for each triangle; for line segments, 2 indices for each segment; and for points, 1 index for each point. Can be null, undefined, or omitted, in which case no index array is used and primitives in the mesh buffer are marked by consecutive vertices.
 * @returns {MeshBuffer} A new mesh buffer.
 * @example <caption>The following example shows how to define a mesh
 * buffer from a predefined array of vertex positions, normals,
 * and texture cordinates.</caption>
 * // First, create an array of numbers giving the X, Y, and
 * // Z coordinate for each vertex position and associated
 * // texture coordinates. Here, three vertices
 * // are defined. For each vertex, the position is given, followed by
 * // the texture coordinates.
 * var vertices = [
 * x1, y1, z1, u1, v1,
 * x2, y2, z2, u2, v2,
 * x3, y3, z3, u3, v3 ];
 * // Second -- and this is optional -- create a second array of numbers
 * // giving the indices to vertices defined in the previous step.
 * // Each index refers to the (n+1)th vertex; since 3 vertices
 * // were defined, the highest index is 2.
 * var indices = [0, 1, 2];
 * // Finally, create the mesh buffer. (If there are no indices,
 * // leave out the "indices" argument.)
 * var meshBuffer=MeshBuffer.fromPositionsUV(vertices, indices);
 */
MeshBuffer.fromPositionsUV = function(vertices, indices) {
  const vertarray = new Float32Array(vertices);
  return new MeshBuffer()
    .setAttribute("POSITION", vertarray, 3, 0, 5)
    .setAttribute("TEXCOORD", vertarray, 2, 3, 5).setIndices(indices);
};
/**
 * Creates an array of vertex indices corresponding to triangles that make up a line strip, a series of vertices that make up a connected line segment path.
 * @param {number} vertexCount Number of vertices that make up the line loop.
 * @returns {Array<number>} Array of vertex indices corresponding to line segments that make up the line strip. Every two indices in the array is a separate line segment. Returns an empty array if 'vertexCount' is less than 2.
 * @example <caption>The following example sets appropriate indices for a mesh buffer with vertices ordered in line strip vertex order.</caption>
 * mesh.setIndices(
 * MeshBuffer.lineStripIndices(mesh.vertexCount())
 * .map(x=>mesh.getIndex(x)));
 */

MeshBuffer.lineStripIndices = function(vertexCount) {
  const ret = [];
  if(vertexCount >= 2) {
    let i;
    for (i = 1; i < vertexCount; i++)ret.push(i - 1, i);
  }
  return ret;
};
/**
 * Creates an array of vertex indices corresponding to triangles that make up a line loop, a series of vertices that make up a connected line segment path, with the last point also connected to the first.
 * @param {number} vertexCount Number of vertices that make up the line loop.
 * @returns {Array<number>} Array of vertex indices corresponding to line segments that make up the line loop. Every two indices in the array is a separate line segment. Returns an empty array if 'vertexCount' is less than 2.
 * @example <caption>The following example sets appropriate indices for a mesh buffer with vertices ordered in line loop vertex order.</caption>
 * mesh.setIndices(
 * MeshBuffer.lineLoopIndices(mesh.vertexCount())
 * .map(x=>mesh.getIndex(x)));
 */
MeshBuffer.lineLoopIndices = function(vertexCount) {
  const ret = [];
  if(vertexCount >= 2) {
    let i;
    for (i = 1; i < vertexCount; i++)ret.push(i - 1, i);
    ret.push(vertexCount - 1, 0);
  }
  return ret;
};
/**
 * Creates an array of vertex indices corresponding to triangles that make up a triangle fan or convex polygon. For triangle fans and convex polygons, the first 3
 * vertices make up the first triangle, and each additional
 * triangle is made up of the last vertex, the first vertex of
 * the first trangle, and 1 new vertex.
 * @param {number} vertexCount Number of vertices that make up the triangle fan or convex polygon.
 * @returns {Array<number>} Array of vertex indices corresponding to triangles that make up the triangle fan or convex polygon. Every three indices in the array is a separate triangle. Returns an empty array if 'vertexCount' is less than 3.
 * @example <caption>The following example sets appropriate indices for a mesh buffer with vertices ordered in triangle fan vertex order.</caption>
 * mesh.setIndices(
 * MeshBuffer.triangleFanIndices(mesh.vertexCount())
 * .map(x=>mesh.getIndex(x)));
 */
MeshBuffer.triangleFanIndices = function(vertexCount) {
  const ret = [];
  if(vertexCount >= 3) {
    let i;
    for (i = 2; i < vertexCount; i++)ret.push(0, i - 1, i);
  }
  return ret;
};
/**
 * Creates an array of vertex indices corresponding to triangles that make up a triangle strip. For a triangle strip, the first 3
 * vertices make up the first triangle, and each additional
 * triangle is made up of the last 2 vertices and 1
 * new vertex.
 * @param {number} vertexCount Number of vertices that make up the triangle strip.
 * @returns {Array<number>} Array of vertex indices corresponding to triangles that make up the triangle strip. Every three indices in the array is a separate triangle. Returns an empty array if 'vertexCount' is less than 3.
 * @example <caption>The following example sets appropriate indices for a mesh buffer with vertices ordered in triangle strip vertex order.</caption>
 * mesh.setIndices(
 * MeshBuffer.triangleStripIndices(mesh.vertexCount())
 * .map(x=>mesh.getIndex(x)));
 */
MeshBuffer.triangleStripIndices = function(vertexCount) {
  const ret = [];
  if(vertexCount >= 3) {
    let i;
    for (i = 2; i < vertexCount; i++) {
      ret.push(i - 1,
        i - 2, i);
    }
  }
  return ret;
};
/**
 * Creates an array of vertex indices corresponding to triangles that make up a series of quadrilaterals, where every 4 vertices is a separate quadrilateral.
 * @param {number} vertexCount Number of vertices that make up the quadrilaterals.
 * @returns {Array<number>} Array of vertex indices corresponding to triangles that make up the quadrilaterals. Every three indices in the array is a separate triangle. Returns an empty array if 'vertexCount' is less than 4. If 'vertexCount' is not divisible by 4, any excess vertices are ignored.
 * @example <caption>The following example sets appropriate indices for a mesh buffer with vertices ordered in quadrilateral vertex order.</caption>
 * mesh.setIndices(
 * MeshBuffer.quadsIndices(mesh.vertexCount())
 * .map(x=>mesh.getIndex(x)));
 */
MeshBuffer.quadsIndices = function(vertexCount) {
  const ret = [];
  if(vertexCount >= 4) {
    let i;
    for (i = 3; i < vertexCount; i += 4) {
      ret.push(i - 3, i - 2, i, i, i - 2, i - 1);
    }
  }
  return ret;
};

/**
 * Creates an array of vertex indices corresponding to triangles that make up a strip of quadrilaterals. For a quadrilateral strip, the first 4 vertices make up the first quadrilateral, and each additional
 * quadrilateral is made up of the last 2 vertices of the previous quadrilateral and
 * 2 new vertices.
 * @param {number} vertexCount Number of vertices that make up the quadrilateral strip.
 * @returns {Array<number>} Array of vertex indices corresponding to triangles that make up the quadrilateral strip. Every three indices in the array is a separate triangle. Returns an empty array if 'vertexCount' is less than 4. If 'vertexCount' is not divisible by 2, the excess vertex is ignored.
 * @example <caption>The following example sets appropriate indices for a mesh buffer with vertices ordered in quadrilateral strip vertex order.</caption>
 * mesh.setIndices(
 * MeshBuffer.quadStripIndices(mesh.vertexCount())
 * .map(x=>mesh.getIndex(x)));
 */
MeshBuffer.quadStripIndices = function(vertexCount) {
  const ret = [];
  if(vertexCount >= 4) {
    let i;
    for (i = 3; i < vertexCount; i += 2) {
      ret.push(i - 3, i - 2, i - 1, i - 1, i - 2, i);
    }
  }
  return ret;
};

/**
 * Gets the number of primitives (triangles, lines,
 * and points) composed by all shapes in this mesh.
 * @returns {number} Return value.
 */
MeshBuffer.prototype.primitiveCount = function() {
  if(this._primitiveType === MeshBuffer.LINES)
    return Math.floor(this.vertexCount() / 2);
  if(this._primitiveType === MeshBuffer.POINTS)
    return this.vertexCount();
  return Math.floor(this.vertexCount() / 3);
};
/**
 * Gets an array of vertex positions held by this mesh buffer,
 * arranged by primitive.
 * Only values with the attribute semantic <code>POSITION_0</code> are returned.
 * @returns {Array<Array<number>>} An array of primitives,
 * each of which holds the vertices that make up that primitive.
 * If this mesh holds triangles, each primitive will contain three
 * vertices; if lines, two; and if points, one. Each vertex is an array containing that vertex's coordinates (for example, if the attribute holds 3 elements per value, the coordinates are X, Y, and Z coordinates, in that order).
 */
MeshBuffer.prototype.getPositions = function() {
  const posattr = this.getAttribute(Semantic.POSITION, 0);
  if(!posattr) {
    return [];
  }
  const ret = [];
  const indices = [];
  const primcount = this.primitiveCount();
  let j;
  for (j = 0; j < primcount; j++) {
    this.vertexIndices(j, indices);
    const primitive = [];
    let k;
    for (k = 0; k < indices.length; k++) {
      primitive.push(posattr.getVec(indices[k], [0, 0, 0]));
    }
    ret.push(primitive);
  }
  return ret;
};

/**
 * Modifies this mesh buffer by converting the normals it defines to [unit vectors]{@tutorial glmath}
 * ("normalized" vectors with a length of 1).
 * Has no effect if this mesh buffer doesn't define any normals.
 * All attributes with the semantic <code>NORMAL</code>,
 * regardless of semantic index, are affected.
 * @returns {MeshBuffer} This object.
 */
MeshBuffer.prototype.normalizeNormals = function() {
  let i;
  for (i = 0; i < this.attributes.length; i++) {
    const attr = this.attributes[i];
    if(attr[0] !== Semantic.NORMAL) {
      continue;
    }
    const value = [];
    const count = attr[2].count();
    let j;
    for (j = 0; j < count; j++) {
      attr[2].getVec(j, value);
      MathInternal.vecNormalizeInPlace(value);
      attr[2].setVec(j, value);
    }
  }
  return this;
};

/**
 * Modifies this mesh buffer by reversing the sign of normals it defines.
 * Has no effect if this mesh buffer doesn't define any normals.
 * All attributes with the semantic <code>NORMAL</code>,
 * regardless of semantic index, are affected.
 * @returns {MeshBuffer} This object.
 * @example <caption>
 * The following code generates a two-sided mesh, where
 * the normals on each side face in the opposite direction.
 * This is only useful when drawing open geometric shapes, such as open
 * cylinders and two-dimensional planar shapes.
 * Due to the z-fighting effect, drawing a two-sided mesh is
 * recommended only if face culling is enabled.</caption>
 * var twoSidedMesh = originalMesh.merge(
 * new MeshBuffer().merge(originalMesh)
 * .reverseWinding().reverseNormals()
 * );
 */
MeshBuffer.prototype.reverseNormals = function() {
  let i;
  for (i = 0; i < this.attributes.length; i++) {
    const attr = this.attributes[i];
    if(attr[0] !== Semantic.NORMAL) {
      continue;
    }
    const value = [];
    const count = attr[2].count();
    let j;
    for (j = 0; j < count; j++) {
      attr[2].getVec(j, value);
      let k;
      for (k = 0; k < value.length; k++) {
        value[k] = -value[k];
      }
      attr[2].setVec(j, value);
    }
  }
  return this;
};
/**
 * Sets all the vertices in this mesh to the given color, by
 * assigning each value with the attribute semantic <code>COLOR</code>
 * to the given color. (If the attribute's [count per value]{@link BufferAccessor#countPerValue}
 * is less than 4, each such value will be set to as many elements of the converted 4-element
 * color as possible.) If an attribute with the semantic <code>COLOR</code>
 * doesn't exist, an attribute with the semantic <code>COLOR_0</code> and a count per
 * value of 3 is created.<p>
 * All attributes with the semantic <code>COLOR</code>,
 * regardless of semantic index, are affected by this method.
 * @param {Array<number>|number|string} color A [color vector or string]{@link toGLColor}
 * identifying the color to set.
 * @returns {MeshBuffer} This object.
 */
MeshBuffer.prototype.setColor = function(color) {
  const colorValue = toGLColor(color);
  let haveColor = false;
  let i;
  for (i = 0; i < this.attributes.length; i++) {
    const attr = this.attributes[i];
    const count = attr[2].count();
    if(attr[0] !== Semantic.COLOR) {
      continue;
    }
    haveColor = true;
    let j;
    for (j = 0; j < count; j++) {
      attr[2].setVec(j, colorValue);
    }
  }
  if(!haveColor) {
    this._ensureAttribute(Semantic.COLOR, 0, 3);
    return this.setColor(colorValue);
  }
  return this;
};

/**
 * Reverses the winding order of the triangles in this mesh buffer
 * by swapping the second and third vertex indices of each one.
 * Has an effect only if this mesh buffer consists of triangles.
 * @returns {MeshBuffer} This object.
 * @example <caption>
 * The following code generates a mesh that survives face culling,
 * since the same triangles occur on each side of the mesh, but
 * with different winding orders.
 * This is only useful when drawing open geometric shapes, such as open
 * cylinders and two-dimensional planar shapes.
 * Due to the z-fighting effect, drawing this kind of mesh is
 * recommended only if face culling is enabled.</caption>
 * var frontBackMesh = originalMesh.merge(
 * new MeshBuffer().merge(originalMesh).reverseWinding()
 * );
 */
MeshBuffer.prototype.reverseWinding = function() {
  if(this.primitiveType() === MeshBuffer.TRIANGLES) {
    this.ensureIndices();
    let i;
    for (i = 0; i + 2 < this.indices.length; i += 3) {
      const tmp = this.indices[i + 1];
      this.indices[i + 1] = this.indices[i + 2];
      this.indices[i + 2] = tmp;
    }
  }
  return this;
};

/** @ignore */
MeshBuffer._recalcNormals = function(positions, normals, indices, flat, inward) {
  const normDir = inward ? -1 : 1;
  const uniqueVertices = {};
  const dupverts = [];
  let dupvertcount = 0;
  let i;
  const normalsCount = normals.count();
  const count = Math.min(positions.count(), normalsCount);
  let v1 = [0, 0, 0];
  let v2 = [0, 0, 0];
  let v3 = [0, 0, 0];
  const normal = [0, 0, 0];
  for(i = 0; i < count; i++) {
    // Set normal to 0
    normals.setVec(i, v1);
    if(!flat) {
      // If non-flat shading is requested, find all vertices with
      // duplicate vertex positions
      const uv = positions.getVec(i, []);
      if(uniqueVertices[uv])uniqueVertices[uv].push(i);
      else uniqueVertices[uv] = [i];
    }
  }
  for(i = 0; i < indices.length; i += 3) {
    v1 = positions.getVec(indices[i], v1);
    v2 = positions.getVec(indices[i + 1], v2);
    v3 = positions.getVec(indices[i + 2], v3);
    const n1 = MathUtil.vec3sub(v1, v3);
    const n2 = MathUtil.vec3sub(v2, v3);
    // cross multiply n1 and n2
    const n1xn2 = MathUtil.vec3cross(n1, n2);
    MathUtil.vec3normalizeInPlace(n1xn2);
    MathUtil.vec3scaleInPlace(n1xn2, normDir);
    // add normalized normal to each vertex of the face
    normals.getVec(indices[i], v1);
    normals.getVec(indices[i + 1], v2);
    normals.getVec(indices[i + 2], v3);
    MathUtil.vec3addInPlace(v1, n1xn2);
    MathUtil.vec3addInPlace(v2, n1xn2);
    MathUtil.vec3addInPlace(v3, n1xn2);
    normals.setVec(indices[i], v1);
    normals.setVec(indices[i + 1], v2);
    normals.setVec(indices[i + 2], v3);
  }
  if(!flat) {
    // If non-flat shading is requested, make sure
    // that every vertex with the same position has the
    // same normal
    for(const key in uniqueVertices) {
      if(Object.prototype.hasOwnProperty.call(uniqueVertices, key)) {
        const v = uniqueVertices[key];
        if(v && v.constructor === Array && v.length >= 2) {
          const v0 = v[0];
          normals.getVec(v0, normal);
          const avg = [normal[0], normal[1], normal[2]];
          dupverts[0] = normal[0];
          dupverts[1] = normal[1];
          dupverts[2] = normal[2];
          dupvertcount = 3;
          for(i = 1; i < v.length; i++) {
            let dupfound = false;
            positions.getVec(v[i], normal);
            const nx = normal[0];
            const ny = normal[1];
            const nz = normal[2];
            let j;
            for (j = 0; j < dupvertcount; j += 3) {
              if(nx === dupverts[j] && ny === dupverts[j + 1] && nz === dupverts[j + 2]) {
                dupfound = true;
                break;
              }
            }
            if(!dupfound) {
              dupverts[dupvertcount++] = nx;
              dupverts[dupvertcount++] = ny;
              dupverts[dupvertcount++] = nz;
              MathUtil.vec3addInPlace(avg, normal);
            }
          }
          for(i = 0; i < v.length; i++) {
            normals.setVec(v[i], avg);
          }
        }
      }
    }
  }
  // Normalize each normal of the vertex
  for(i = 0; i < normalsCount; i++) {
    normals.getVec(i, normal);
    MathUtil.vec3normalize(normal);
    normals.setVec(i, normal);
  }
};

/** @ignore */
MeshBuffer._recalcTangentsInternal = function(positions, normals, texCoords, tangents, bitangents, indices) {
  let v1 = [0, 0, 0];
  let v2 = [0, 0, 0];
  let v3 = [0, 0, 0];
  let i;
  for (i = 0; i < indices.length; i += 3) {
    v1 = positions.getVec(indices[i], v1);
    v2 = positions.getVec(indices[i + 1], v2);
    v3 = positions.getVec(indices[i + 2], v3);
    // Find the tangent and bitangent
    let ret;
    const t1 = v2[0] - v1[0];
    const t2 = v2[1] - v1[1];
    const t3 = v2[2] - v1[2];
    const t4 = v3[0] - v1[0];
    const t5 = v3[1] - v1[1];
    const t6 = v3[2] - v1[2];
    v1 = texCoords.getVec(indices[i], v1);
    v2 = texCoords.getVec(indices[i + 1], v2);
    v3 = texCoords.getVec(indices[i + 2], v3);
    const t7 = v2[0] - v1[0];
    const t8 = v2[1] - v1[1];
    const t9 = v3[0] - v1[0];
    const t10 = v3[1] - v1[1];
    let t11 = t7 * t10 - t8 * t9;
    if(t11 === 0) {
    // Degenerate case
      ret = [0, 0, 0, 0, 0, 0];
    } else {
      t11 = 1.0 / t11;
      const t12 = -t8;
      const t13 = -t9;
      const t14 = (t10 * t1 + t12 * t4) * t11;
      const t15 = (t10 * t2 + t12 * t5) * t11;
      const t16 = (t10 * t3 + t12 * t6) * t11;
      const t17 = (t13 * t1 + t7 * t4) * t11;
      const t18 = (t13 * t2 + t7 * t5) * t11;
      const t19 = (t13 * t3 + t7 * t6) * t11;
      ret = [t14, t15, t16, t17, t18, t19];
    }
    // NOTE: It would be more mathematically correct to use the inverse
    // of the matrix
    // [ Ax Bx Nx ]
    // [ Ay By Ny ]
    // [ Az Bz Nz ]
    // (where A and B are the tangent and bitangent in the "ret" variable above)
    // as the tangent space transformation, that is, include three
    // different vectors (tangent, bitangent, and modified normal).
    // Instead we use the matrix
    // [ AAx AAy AAz ]
    // [ BBx BBy BBz ]
    // [ Nx Ny Nz ]
    // (where AA and BB are the orthonormalized versions of the tangent
    // and bitangent) as the tangent space transform, in order to avoid
    // the need to also specify a transformed normal due to matrix inversion.
    let j;
    for (j = 0; j < 3; j++) {
      const m = ret;
      v1 = normals.getVec(indices[i + j], v1);
      const norm0 = v1[0];
      const norm1 = v1[1];
      const norm2 = v1[2];
      const t20 = m[0] * norm0 + m[1] * norm1 + m[2] * norm2;
      const tangent = MathUtil.vec3normalizeInPlace([
        m[0] - t20 * norm0,
        m[1] - t20 * norm1,
        m[2] - t20 * norm2]);
      const t22 = m[3] * norm0 + m[4] * norm1 + m[5] * norm2;
      const t23 = m[3] * tangent[0] + m[4] * tangent[1] + m[5] * tangent[2];
      const bitangent = MathUtil.vec3normalizeInPlace([
        m[3] - t22 * norm0 - t23 * tangent[0],
        m[4] - t22 * norm1 - t23 * tangent[1],
        m[5] - t22 * norm2 - t23 * tangent[2]]);
      tangents.setVec(indices[i + j], tangent);
      bitangents.setVec(indices[i + j], bitangent);
    }
  }
};
/**
 * TODO: Not documented yet.
 * @returns {MeshBuffer} This object.
 */
MeshBuffer.prototype.deindex = function() {
  if(typeof this.indices === "undefined" || this.indices === null)return this;
  let nonUnique = false;
  let i;
  for (i = 0; i < this.indices.length; i++) {
    if(this.indices[i] !== i) {
      nonUnique = true; break;
    }
  }
  if(nonUnique) {
    this._makeRedundantInternal();
  }
  this.indices = null;
  return this;
};
/** @ignore */
MeshBuffer.prototype._makeRedundantInternal = function() {
  const newAttributes = [];
  let i;
  for (i = 0; i < this.attributes.length; i++) {
    const a = this.attributes[i];
    newAttributes.push([a[0], a[1],
      BufferAccessor.merge(a[2], this.indices, null, [])]);
  }
  this.attributes = newAttributes;
};
/** @ignore */
MeshBuffer.prototype._makeRedundant = function() {
  this.ensureIndices();
  this._makeRedundantInternal();
  this.setIndices(BufferAccessor.makeIndices(this.indices.length));
};
/** @ignore */
MeshBuffer.prototype._ensureAttribute = function(semantic, semanticIndex, desiredCount) {
  const attr = this.getAttribute(semantic, semanticIndex);
  const vertexCount = this.attributes.length === 0 ? 0 : this.attributes[0][2].count();
  const attrCount = typeof attr !== "undefined" && attr !== null ? attr.countPerValue : 0;
  if(attr && attrCount >= desiredCount)
    return attr;
  const newattr = BufferAccessor.makeBlank(vertexCount, desiredCount);
  if(attrCount > 0) {
    const vec = MathInternal.vecZeros(desiredCount);
    let i;
    for (i = 0; i < vertexCount; i++) {
      attr.getVec(i, vec);
      newattr.setVec(i, vec);
    }
  }
  this.attributes.push([semantic, semanticIndex, newattr]);
  return newattr;
};
/** @ignore */
MeshBuffer.prototype._countPerValue = function(sem) {
  const a = this.getAttribute(sem);
  return typeof a !== "undefined" && a !== null ? a.countPerValue : 0;
};

/**
 * Recalculates the normal vectors (directions that generally point up and away from the mesh buffer's surface) for triangles
 * in this mesh buffer, in order to give the shape described by this buffer a flat or smooth appearance or to shade the shape from the inside or the outside upon rendering.<p> Each normal calculated will
 * be normalized to have a length of 1 (unless the normal is (0,0,0)),
 * and will be stored in an attribute with semantic <code>NORMAL_0</code>.<p>
 * This method will have an effect only if the buffer includes an attribute with
 * semantic <code>POSITION_0</code> and each of that attribute's values is at least 3 elements
 * long. If the buffer already includes an attribute with semantic <code>NORMAL_0</code>,
 * ensures its values are each at least 3 elements long.<p>For normal calculation to properly affect shading:<ul>
 * <li>Each triangle's vertices in the mesh buffer (as they appear when the triangle's front side is seen) must be ordered in the same winding (counterclockwise or clockwise) throughout. If the vertices have the wrong order, use the [`reverseWinding()`]{@link MeshBuffer#reverseWinding}
 * method to change their order.
 * <li>If the mesh describes a closed convex surface (such as a sphere or cube) and is being rendered in a right-handed coordinate system (e.g., X-right, Y-up, Z-backward), each of its triangles must have counterclockwise winding for the shape to be shaded from the outside.</ul>
 * @param {boolean} [flat] If true, each triangle in the mesh
 * will have the same normal, which usually leads to a flat
 * appearance. If false, each unique vertex in the mesh
 * will have its own normal, which usually leads to a smooth
 * appearance. If null, undefined, or omitted, the default is false.
 * @param {boolean} [inward] If true, the generated normals
 * will point inward, so that the shape
 * is shaded from the inside upon rendering; otherwise, the normals will point outward. If null, undefined, or omitted, the default is false.
 * @returns {MeshBuffer} This object.
 * @example
 * // Use flat shading, and shape is shaded from the outside
 * meshBuffer.recalcNormals(true, false);
 * // Both parameters can be omitted, setting both to false
 * meshBuffer.recalcNormals();
 */
MeshBuffer.prototype.recalcNormals = function(flat, inward) {
  flat = typeof flat === "undefined" || flat === null ? false : flat;
  inward = typeof inward === "undefined" || inward === null ? false : inward;
  const primtype = this.primitiveType();
  if(primtype === MeshBuffer.TRIANGLES) {
    if(this._countPerValue(Semantic.POSITION) < 3) {
      return this;
    }
    this._makeRedundant();
    const positions = this.getAttribute(Semantic.POSITION);
    const normals = this._ensureAttribute(Semantic.NORMAL, 0, 3);
    // NOTE: Indices ensured by makeRedundant
    MeshBuffer._recalcNormals(positions, normals, this.indices, flat, inward);
  }
  return this;
};
/** @ignore */
MeshBuffer.prototype._recalcTangents = function() {
  if(this.primitiveType() === MeshBuffer.TRIANGLES) {
    if(this._countPerValue(Semantic.POSITION) < 3 ||
  this._countPerValue(Semantic.NORMAL) < 3 ||
        this._countPerValue(Semantic.TEXCOORD) < 2) {
      return this;
    }
    this._makeRedundant();
    const positions = this.getAttribute(Semantic.POSITION);
    const normals = this.getAttribute(Semantic.NORMAL);
    const texCoords = this.getAttribute(Semantic.TEXCOORD);
    const tangents = this._ensureAttribute(Semantic.TANGENT, 0, 3);
    const bitangents = this._ensureAttribute(Semantic.BITANGENT, 0, 3);
    // NOTE: Indices ensured by makeRedundant
    MeshBuffer._recalcTangentsInternal(positions, normals, texCoords,
      tangents, bitangents, this.indices);
  }
  return this;
};

/**
 * Merges the vertices from another mesh into this one.
 * The vertices from the other mesh will be copied into this one,
 * and the other mesh's indices copied or adapted.
 * @param {MeshBuffer} other A mesh to merge into this one. The mesh
 * given in this parameter will remain unchanged.
 * Throws an error if this mesh's primitive type is not the same as
 * the other mesh's primitive type.
 * @returns {MeshBuffer} This object.
 * @example
 * var copiedMesh = new MeshBuffer().merge(meshToCopy);
 */
MeshBuffer.prototype.merge = function(other) {
  const newAttributes = [];
  let newAttribute;
  let attr;
  let oattr;
  let existingAttribute;
  if(!other)throw new Error();
  if(this._primitiveType !== other._primitiveType) {
    // Primitive types are different
    throw new Error();
  }
  if(other.indices.length === 0) {
    // Nothing to merge into this one, just return
    return this;
  } else if(this.indices && this.indices.length === 0) {
    let empty = true;
    let i;
    for (i = 0; i < this.attributes.length; i++) {
      attr = this.attributes[i][2];
      empty = empty && (typeof attr === "undefined" || attr === null || attr.count() === 0);
    }
    if(empty) {
      // If this object is empty, copy the attributes and
      // indices from the other object
      let i;
      for (i = 0; i < other.attributes.length; i++) {
        const o = other.attributes[i];
        newAttributes.push([o[0], o[1], o[2].copy()]);
      }
      this._bounds = null;
      this._primitiveType = other._primitiveType;
      this.attributes = newAttributes;
      // NOTE: Copies the index buffer
      if(typeof other.indices === "undefined" || other.indices === null) {
        this.indices = null;
        this.ensureIndices();
      } else {
        this.setIndices(other.indices.slice(0, other.indices.length));
      }
      return this;
    }
  }
  this.ensureIndices();
  other.ensureIndices();
  let i;
  for (i = 0; i < this.attributes.length; i++) {
    existingAttribute = null;
    newAttribute = null;
    attr = this.attributes[i];
    const sem = attr[0];
    const semIndex = attr[1];
    let j;
    for (j = 0; j < other.attributes.length; j++) {
      const oattr = other.attributes[j];
      if(oattr[0] === sem && oattr[1] === semIndex) {
        existingAttribute = oattr[2];
        break;
      }
    }
    newAttribute = BufferAccessor.merge(attr[2], this.indices, existingAttribute, other.indices);
    if(!newAttribute)throw new Error();
    newAttributes.push([sem, semIndex, newAttribute]);
  }

  for (i = 0; i < other.attributes.length; i++) {
    existingAttribute = null;
    oattr = other.attributes[i];
    let j;
    for (j = 0; j < this.attributes.length; j++) {
      attr = this.attributes[j];
      if(oattr[0] === attr[0] && oattr[1] === attr[1]) {
        existingAttribute = attr;
        break;
      }
    }
    if(typeof existingAttribute === "undefined" || existingAttribute === null) {
      newAttribute = BufferAccessor.merge(null, this.indices, oattr[2], other.indices);
      if(!newAttribute)throw new Error();
      newAttributes.push([oattr[0], oattr[1], newAttribute]);
    }
  }
  const newIndices = BufferAccessor.makeIndices(this.indices.length + other.indices.length);
  this._bounds = null;
  this.attributes = newAttributes;
  this.setIndices(newIndices);
  return this;
};

/**
 * Transforms the positions and normals of all the vertices currently
 * in this mesh, with the help of a [4x4 matrix]{@tutorial glmath}. Only values with the attribute semantic <code>POSITION_0</code>
 * or <code>NORMAL_0</code> will be affected by this method; values of
 * other attributes will be unaffected.
 * @param {Array<number>} matrix A 4x4 matrix described in
 * the {@link MathUtil.mat4projectVec3} method. The normals will be transformed using the
 * 3x3 inverse transpose of this matrix (see {@link MathUtil.mat4inverseTranspose3}).
 * (Normals need to be transformed specially because they describe directions, not points.)
 * @returns {MeshBuffer} This object.
 * @example <caption>The following example transforms positions
 * and normals to move the mesh 2 units to the right.</caption>
 * mesh.transform(MathUtil.mat4translated(2, 0, 0));
 * @example <caption>The following example transforms positions
 * and normals to double the mesh's size.</caption>
 * mesh.transform(MathUtil.mat4scaled(2, 2, 2));
 */
MeshBuffer.prototype.transform = function(matrix) {
  const positionAttribute = this.getAttribute(Semantic.POSITION);
  if(!positionAttribute) {
    return this;
  }
  const normalAttribute = this.getAttribute(Semantic.NORMAL);
  const isNotLinearIdentity = !(matrix[0] === 1 && matrix[1] === 0 &&
    matrix[2] === 0 && matrix[4] === 0 && matrix[5] === 1 &&
    matrix[6] === 0 && matrix[8] === 0 && matrix[9] === 0 && matrix[10] === 1);
  let matrixForNormals = null;
  if(typeof normalAttribute !== "undefined" && normalAttribute !== null && isNotLinearIdentity) {
    matrixForNormals = MathUtil.mat4inverseTranspose3(matrix);
  }
  let count = positionAttribute.count();
  if(normalAttribute)count = Math.min(count, normalAttribute.count());
  const position = [0, 0, 0];
  const normal = [0, 0, 0];
  let i;
  for (i = 0; i < count; i++) {
    positionAttribute.getVec(i, position);
    let xform = MathUtil.mat4projectVec3(matrix,
      position[0], position[1], position[2]);
    positionAttribute.setVec(i, xform);
    if(normalAttribute && isNotLinearIdentity && (typeof matrixForNormals !== "undefined" && matrixForNormals !== null)) {
      // Transform and normalize the normals
      // (using a modified matrix) to ensure
      // they point in the correct direction
      normalAttribute.getVec(i, normal);
      xform = MathUtil.mat3transform(matrixForNormals,
        normal[0], normal[1], normal[2]);
      MathUtil.vec3normalizeInPlace(xform);
      normalAttribute.setVec(i, xform);
    }
  }
  this._bounds = null;
  return this;
};
// Adds a line only if it doesn't exist
MeshBuffer._addLine = function(lineIndices, existingLines, f1, f2) {
  // Ensure ordering of the indices
  if(f1 < f2) {
    const tmp = f1; f1 = f2; f2 = tmp;
  }
  const e = existingLines[f1];
  if(e) {
    if(e.indexOf(f2) < 0) {
      e.push(f2);
      lineIndices.push(f1, f2);
    }
  } else {
    existingLines[f1] = [f2];
    lineIndices.push(f1, f2);
  }
};

/**
 * Converts the triangles in this mesh to line segments.
 * Has no effect if this mesh doesn't use triangles as primitives.
 * @returns {MeshBuffer} This object.
 */
MeshBuffer.prototype.wireFrame = function() {
  if(this.primitiveType() !== MeshBuffer.TRIANGLES) {
    // Not a triangle mesh
    return this;
  }
  const lineIndices = [];
  const existingLines = {};
  const primitive = [];
  const primcount = this.primitiveCount();
  let i;
  for (i = 0; i < primcount; i++) {
    this.vertexIndices(i, primitive);
    const f1 = primitive[0];
    const f2 = primitive[1];
    const f3 = primitive[2];
    MeshBuffer._addLine(lineIndices, existingLines, f1, f2);
    MeshBuffer._addLine(lineIndices, existingLines, f2, f3);
    MeshBuffer._addLine(lineIndices, existingLines, f3, f1);
  }
  return this.setIndices(lineIndices)
    .setType(MeshBuffer.LINES);
};
/**
 * Finds the tightest
 * bounding box that holds all vertices in the mesh buffer.
 * Only positions with attribute semantic <code>POSITION</code> are
 * used in the bounding box calculation.
 * @returns {Array<number>} An array of six numbers describing the tightest
 * axis-aligned bounding box
 * that fits all vertices in the mesh. The first three numbers
 * are the smallest-valued X, Y, and Z coordinates, and the
 * last three are the largest-valued X, Y, and Z coordinates.
 * This calculation uses the attribute with the semantic POSITION
 * and set index 0. If there is no such attribute,
 * or no vertices are defined in this buffer, returns the array
 * [Inf, Inf, Inf, -Inf, -Inf, -Inf].
 */
MeshBuffer.prototype.getBounds = function() {
  if(!this._bounds) {
    let empty = true;
    const inf = Number.POSITIVE_INFINITY;
    const ret = [inf, inf, inf, -inf, -inf, -inf];
    const posattr = this.getAttribute(Semantic.POSITION, 0);
    if(!posattr)return ret;
    const indices = [];
    const vec = [0, 0, 0];
    const primcount = this.primitiveCount();
    let j;
    for (j = 0; j < primcount; j++) {
      this.vertexIndices(j, indices);
      const primitive = [];
      let k;
      for (k = 0; k < indices.length; k++) {
        const v = posattr.getVec(indices[k], vec);
        if(empty) {
          empty = false;
          ret[0] = ret[3] = v[0];
          ret[1] = ret[4] = v[1];
          ret[2] = ret[5] = v[2];
        } else {
          ret[0] = Math.min(ret[0], v[0]);
          ret[3] = Math.max(ret[3], v[0]);
          ret[1] = Math.min(ret[1], v[1]);
          ret[4] = Math.max(ret[4], v[1]);
          ret[2] = Math.min(ret[2], v[2]);
          ret[5] = Math.max(ret[5], v[2]);
        }
      }
      ret.push(primitive);
    }
    this._bounds = ret.slice(0, 6);
    return ret;
  }
  return this._bounds.slice(0, 6);
};
/**
 * Gets the type of primitive stored in this mesh buffer.
 * @returns {number} Either {@link MeshBuffer.TRIANGLES},
 * {@link MeshBuffer.LINES}, or {@link MeshBuffer.POINTS}.
 */
MeshBuffer.prototype.primitiveType = function() {
  return this._primitiveType;
};
/**
 * Gets the number of vertices in this mesh buffer, that
 * is, the number of vertex indices in its index buffer (some of which
 * may be duplicates), or if there is no index buffer, the lowest maximum
 * number of items that a buffer attribute can hold.
 * @returns {number} Return value.
 */
MeshBuffer.prototype.vertexCount = function() {
  if(typeof this.indices === "undefined" || this.indices === null) {
    let mincount = 0;
    let i;
    for (i = 0; i < this.attributes.length; i++) {
      const a = this.attributes[i][2];
      if(i === 0 || a.count() < mincount)mincount = a.count();
    }
    return mincount;
  } else {
    return this.indices.length;
  }
};

/** @ignore */
MeshBuffer._resolveSemantic = function(name, index) {
  if(typeof name === "number") {
    return [name, index | 0];
  } else {
    let wka = MeshBuffer._wellKnownAttributes[name];
    if(typeof wka === "undefined" || wka === null) {
      const io = name.indexOf("_");
      if(io < 0) {
        return null;
      }
      wka = MeshBuffer._wellKnownAttributes[name.substr(0, io)];
      if(typeof wka === "undefined" || wka === null) {
        return null;
      }
      const number = name.substr(io + 1);
      if(number.length <= 5 && (/^\d$/).test(number)) {
        // Only allow 5-digit-or-less numbers; more than
        // that is unreasonable
        return [wka, parseInt(number, 10)];
      } else {
        return null;
      }
    } else {
      return [wka, 0];
    }
  }
};
/** Indicates that a mesh buffer contains line segments; the mesh
 * buffer stores each line segment using two consecutive vertices.
 * @constant
 * @default
 * @static */
MeshBuffer.LINES = 1;
/** Indicates that a mesh buffer contains triangles; the mesh
 * buffer stores each triangle using three consecutive vertices.
 * @constant
 * @default
 * @static */
MeshBuffer.TRIANGLES = 4;
/** Indicates that a mesh buffer contains points; the mesh
 * buffer stores each point using one vertex.
 * @constant
 * @default
 * @static */
MeshBuffer.POINTS = 0;

MeshBuffer._wellKnownAttributes = {
  "POSITION":0,
  "TEXCOORD":2,
  "TEXCOORD_0":2,
  "NORMAL":1,
  "COLOR":3,
  "JOINT":4,
  "WEIGHT":5,
  "JOINTS":4,
  "WEIGHTS":5,
  "TANGENT":6,
  "BITANGENT":7
};/* global Uint16Array, Uint32Array */

/**
 * An evaluator of curve evaluator objects for generating
 * vertex attributes for a curve.<p>
 * For more information, see the {@tutorial surfaces} tutorial.
 * @constructor
 */
const CurveBuilder = function() {
  this.attributes = [];
  this.vertexCount = 0;
  this.indices = [];
  this.mode = MeshBuffer.TRIANGLES;
};
/**
 * An evaluator of surface evaluator objects for generating
 * vertex attributes for a surface.<p>
 * For more information, see the {@tutorial surfaces} tutorial.
 * @constructor
 */
const SurfaceBuilder = function() {
  this.attributes = [];
  this.vertexCount = 0;
  this.indices = [];
  this.mode = MeshBuffer.TRIANGLES;
};

// ------ Common internals

/** @ignore */
CurveBuilder._toMeshBuffer = function(attributes, indices, mode) {
  let maxIndex = 0;
  let i;
  for (i = indices.length - 1; i >= 0; i--) {
    maxIndex = Math.max(maxIndex, indices[i]);
    if(maxIndex >= 65536)break;
  }
  const mb = new MeshBuffer();
  const indexArray = maxIndex < 65536 ?
    new Uint16Array(indices) :
    new Uint32Array(indices);
  mb.setType(mode);
  mb.setIndices(indexArray);

  for (i = 0; i < attributes.length; i++) {
    const a = attributes[i];
    mb.setAttributeEx(a[0], a[1], a[3], a[2]);
  }
  return mb;
};
/** @ignore */
CurveBuilder._blank = function(count) {
  const ret = [];
  let i;
  for (i = 0; i < count; i++) {
    ret.push(0);
  }
  return ret;
};
/** @ignore */
CurveBuilder._resize = function(a, newsize) {
  if(a[2] !== newsize) {
    const oldcount = a[3].length / a[2];
    const minsize = Math.min(a[2], newsize);
    const arr = CurveBuilder._blank(oldcount * newsize);
    let oldindex = 0;
    let newindex = 0;
    let i;
    for (i = 0; i < oldcount; i++) {
      let j;
      for (j = 0; j < minsize; j++) {
        arr[newindex + j] = a[3][oldindex + j];
      }
      oldindex += a[2];
      newindex += newsize;
    }
    a[2] = newsize;
    a[3] = arr;
  }
};
/** @ignore */
CurveBuilder._addValue = function(a, value) {
  const mm = Math.min(value.length, a[2]);
  let i;
  for (i = 0; i < mm; i++) {
    a[3].push(value[i]);
  }
  for(i = mm; i < a[2]; i++) {
    a[3].push(0);
  }
};
/** @ignore */
CurveBuilder._defaultEndPointsCurve = function(attributes) {
  let i;
  for (i = 0; i < attributes.length; i++) {
    const a = attributes[i];
    if(a[0] === Semantic.POSITION && a[1] === 0) {
      const a4 = a[4];
      if(typeof a4.endPoints !== "undefined" && a4.endPoints !== null) {
        return a[4].endPoints();
      }
      break;
    }
  }
  return [0, 1];
};

/** @ignore */
CurveBuilder._defaultSubdivisionsCurve = function(attributes) {
  let i;
  for (i = 0; i < attributes.length; i++) {
    const a = attributes[i];
    if(a[0] === Semantic.POSITION && a[1] === 0) {
      const a4 = a[4];
      return Math.max(200, Math.ceil(new Curve(a4).getLength() / 4));
    }
  }
  return 24;
};
/** @ignore */
CurveBuilder._defaultEndPointsSurface = function(attributes) {
  let i;
  for (i = 0; i < attributes.length; i++) {
    const a = attributes[i];
    if(a[0] === Semantic.POSITION && a[1] === 0) {
      const a4 = a[4];
      if(typeof a4 !== "undefined" && a4 !== null && (typeof a4.endPoints !== "undefined" && a4.endPoints !== null)) {
        return a[4].endPoints();
      }
      break;
    }
  }
  return [0, 1, 0, 1];
};
/** @ignore */
CurveBuilder._toCurve = function(curve) {
  return typeof curve !== "undefined" && curve !== null &&
   !(curve instanceof Curve) ? new Curve(curve) : curve;
};
/** @ignore */
CurveBuilder._toSurface = function(surface) {
  return typeof surface !== "undefined" && surface !== null &&
   !(surface instanceof Surface) ? new Surface(surface) : surface;
};

/** @ignore */
CurveBuilder._setAttribute = function(
  attributes, vertexCount, curve, semantic, semanticIndex, size
) {
  const sizeValue = typeof size === "undefined" || size === null ? 3 : size;
  const semanticIndexValue = typeof semanticIndex === "undefined" || semanticIndex === null ?
    0 : semanticIndex;
  const iscurve = typeof curve !== "undefined" && curve !== null;
  if(size <= 0)throw new Error("Invalid attribute size");
  const sem = MeshBuffer._resolveSemantic(semantic,
    semanticIndexValue);
  if(typeof sem === "undefined" || sem === null)throw new Error();
  let i;
  for (i = 0; i < attributes.length; i++) {
    const a = attributes[i];
    if(a[0] === sem[0] && a[1] === sem[1]) {
      if(iscurve) {
        a[4] = curve;
        CurveBuilder._resize(a, sizeValue);
        return;
      } else {
        // Remove the attribute
        attributes.splice(i, 1);
        return;
      }
    }
  }
  if(iscurve) {
    const newAttr = [sem[0], sem[1], sizeValue,
      CurveBuilder._blank(sizeValue * vertexCount), curve];
    attributes.push(newAttr);
  }
};
/**
 * @constructor
 * @ignore
 */
CurveBuilder._NormalSurface = function(surface) {
  this.surface = new Surface(surface);
  this.endPoints = function() {
    return this.surface.endPoints();
  };
  this.evaluate = function(u, v) {
    return this.surface.normal(u, v);
  };
};

// ------ End common internals

/**
 * Clears the arrays of attribute values (such as positions and normals)
 * and vertex indices generated so far. The attributes themselves will remain.
 * @returns {CurveBuilder} This object.
 */
CurveBuilder.prototype.clearVertices = function() {
  this.vertexCount = 0;
  this.indices = [];
  let i;
  for (i = 0; i < this.attributes.length; i++) {
    this.attributes[i][3] = [];
  }
  return this;
};
/**
 * Generates a mesh buffer containing the vertex attributes
 * generated so far. The mesh buffer's primitive type will equal the
 * last type passed to the "mode" parameter in the {@link CurveBuilder.curveEval} method.
 * @returns {MeshBuffer} The generated mesh buffer.
 */
CurveBuilder.prototype.toMeshBuffer = function() {
  return CurveBuilder._toMeshBuffer(this.attributes, this.indices, this.mode);
};
/**
 * Sets the parametric curve used to generate vertex positions.
 * @param {Object} curve A [curve evaluator object]{@link Curve} that
 * describes the parametric curve used to generate positions.
 * @param {number} [size] The number of elements in each position value. For
 * example, if the attribute is 3-dimensional, this parameter is 3. If null, undefined, or omitted, the default
 * is 3. Throws an error if this value is 0 or less.
 * @returns {CurveBuilder} This object.
 */
CurveBuilder.prototype.position = function(curve, size) {
  return this.attribute(curve, Semantic.POSITION, 0, size);
};
/**
 * Sets the parametric curve used to generate vertex attribute values.
 * @param {Object} curve A [curve evaluator object]{@link Curve} that
 * describes the parametric curve used to generate attribute values.
 * U coordinates for the given curve correspond to U coordinates for
 * the curve used to generate vertex positions.
 * @param {number|string} semantic An attribute semantic, such
 * as {@link Semantic.POSITION}, "POSITION", or "TEXCOORD_0".
 * Throws an error if this value is a string and the string is invalid.
 * @param {number} [semanticIndex] The set index of the attribute
 * for the given semantic.
 * 0 is the first index of the attribute, 1 is the second, and so on.
 * This is ignored if "name" is a string. If null, undefined, or omitted, the default is 0.
 * @param {number} [size] The number of elements in each position value. For
 * example, if the attribute is 3-dimensional, this parameter is 3. If null, undefined, or omitted, the default
 * is 3. Throws an error if this value is 0 or less.
 * @returns {CurveBuilder} This object.
 */
CurveBuilder.prototype.attribute = function(curve, semantic, semanticIndex, size) {
  CurveBuilder._setAttribute(this.attributes, this.vertexCount,
    curve, semantic, semanticIndex, size);
  return this;
};

/**
 * Sets a value for an attribute semantic that will be the same for all
 * future vertices generated by the "evalCurve" method.
 * @param {Object|number} constantValue A constant value for the attribute semantic.
 * @param {number|string} semantic An attribute semantic, such
 * as {@link Semantic.POSITION}, "POSITION", or "TEXCOORD_0".
 * Throws an error if this value is a string and the string is invalid.
 * @param {number} [semanticIndex] The set index of the attribute
 * for the given semantic.
 * 0 is the first index of the attribute, 1 is the second, and so on.
 * This is ignored if "name" is a string. If null, undefined, or omitted, the default is 0.
 * @returns {CurveBuilder} This object.
 * @example <caption>This example sets the color to use for future
 * vertices to be generated for the curve.</caption>
 * // Set color to red
 * curve.constantAttribute([1,0,0],"COLOR");
 */
CurveBuilder.prototype.constantAttribute = function(
  constantValue, semantic, semanticIndex) {
  if(typeof constantValue === "number") {
    return this.attribute({
      "evaluate":function() {
        return [constantValue];
      }
    },
    semantic, semanticIndex, 1 );
  } else {
    return this.attribute({
      "evaluate":function() {
        return constantValue;
      }
    },
    semantic, semanticIndex, constantValue.length );
  }
};

/**
 * Sets a value for a color attribute that will be the same for all
 * future vertices generated by the "evalCurve" method.
 * @param {Array<number>|number|string} color A [color vector or string]{@link toGLColor}
 * identifying the constant color value. The alpha channel of the resulting color will be ignored.
 * @param {number} [semanticIndex] The set index of the attribute
 * for the given semantic.
 * 0 is the first index of the attribute, 1 is the second, and so on. If null, undefined, or omitted, the default is 0.
 * @returns {CurveBuilder} This object.
 * @example <caption>This example sets the color to use for future
 * vertices to be generated for the curve.</caption>
 * // Set color to red
 * curve.constantColor("red");
 */
CurveBuilder.prototype.constantColor = function(color, semanticIndex) {
  const c = toGLColor(color);
  return this.constantAttribute([c[0], c[1], c[2]],
    Semantic.COLOR, semanticIndex);
};
/**
 * Convenience method for creating a mesh buffer from a parametric
 * curve. The mesh buffer will contain positions and vertex normals that
 * cover the given surface.
 * @param {Object} curve A [curve evaluator object]{@link Curve} that
 * describes the parametric curve used to generate positions.
 * @param {number} [mode] If this value is {@link MeshBuffer.LINES}, or is null, undefined, or omitted, generates
 * a series of lines defining the curve. If this value is {@link MeshBuffer.POINTS},
 * generates a series of points along the curve. For any other value,
 * this method has no effect.
 * @param {number} [n] Number of subdivisions of the curve to be drawn.
 * If null or undefined, a default is determined automatically based on the position curve's arc length, or the distance taken by its path (or the default is 24 if no position curve was defined). If 0, this method has no effect. Throws an error if this value is less than 0.
 * @param {number} [u1] Starting point of the curve.
 * Default is the starting coordinate given by the [curve evaluator object]{@link Curve}, or 0 if not given.
 * @param {number} [u2] Ending point of the curve.
 * Default is the ending coordinate given by the [curve evaluator object]{@link Curve}, or 1 if not given.
 * @returns {MeshBuffer} The generated mesh buffer.
 */
CurveBuilder.curveToBuffer = function(curve, mode, n, u1, u2) {
  return new CurveBuilder()
    .position(curve, 3)
    .evalCurve(mode, n, u1, u2).toMeshBuffer();
};
/**
 * Clears the arrays of attribute values (such as positions and normals)
 * and vertex indices generated so far. The attributes themselves will remain.
 * @returns {SurfaceBuilder} This object.
 */
SurfaceBuilder.prototype.clearVertices = function() {
  this.vertexCount = 0;
  this.indices = [];
  let i;
  for (i = 0; i < this.attributes.length; i++) {
    this.attributes[i][3] = [];
  }
  return this;
};
/**
 * Generates a mesh buffer containing the vertex attributes
 * generated so far. The mesh buffer's primitive type will equal the
 * last type passed to the "mode" parameter in the {@link SurfaceBuilder.surfaceEval} method.
 * @returns {MeshBuffer} The generated mesh buffer.
 */
SurfaceBuilder.prototype.toMeshBuffer = function() {
  return CurveBuilder._toMeshBuffer(this.attributes, this.indices, this.mode);
};
/**
 * Sets the parametric surface used to generate vertex positions.
 * @param {Object} surface A [surface evaluator object]{@link Surface} that
 * describes the parametric surface
 * used to generate position values.
 * @param {number} [size] The number of elements in each position value. For
 * example, if the attribute is 3-dimensional, this parameter is 3. If null, undefined, or omitted, the default
 * is 3. Throws an error if this value is 0 or less.
 * @returns {SurfaceBuilder} This object.
 */
SurfaceBuilder.prototype.position = function(surface, size) {
  return this.attribute(surface, Semantic.POSITION, 0, size);
};
/**
 * Sets the parametric surface used to generate texture coordinates.
 * @param {Object} surface A [surface evaluator object]{@link Surface} that
 * describes the parametric surface
 * used to generate texture coordinates.
 * U and V coordinates for the given surface correspond to U and V
 * coordinates, respectively, for
 * the surface used to generate vertex positions.
 * @param {number} [size] The number of elements in each value of the attribute. For
 * example, if the attribute is 3-dimensional, this parameter is 3. If null, undefined, or omitted, the default
 * is 2.
 * @returns {SurfaceBuilder} This object.
 */
SurfaceBuilder.prototype.texCoord = function(surface, size) {
  return this.attribute(surface, Semantic.TEXCOORD, 0, typeof size === "undefined" || size === null ? 2 : size);
};
/**
 * Sets the parametric surface used to generate vertex positions and normals.
 * @param {Object} surface A [surface evaluator object]{@link Surface} that
 * describes the parametric surface
 * used to generate positions.
 * @param {number} [size] The number of elements in each position and normal. For
 * example, if the attribute is 3-dimensional, this parameter is 3. If null, undefined, or omitted, the default
 * is 3. Throws an error if this value is 0 or less.
 * @returns {SurfaceBuilder} This object.
 */
SurfaceBuilder.prototype.positionNormal = function(surface, size) {
  const norm = typeof surface !== "undefined" && surface !== null ? new CurveBuilder._NormalSurface(surface) : null;
  return this.attribute(surface, Semantic.POSITION, 0, size)
    .attribute(norm, Semantic.NORMAL, 0, size);
};
/**
 * @constructor
 * @ignore */
SurfaceBuilder._TexCoord = function(s) {
  const ep = new Surface(s).endPoints();
  this.u1 = ep[0];
  this.v1 = ep[2];
  this.uinv = ep[0] === ep[1] ? 0 : 1 / (ep[1] - ep[0]);
  this.vinv = ep[2] === ep[3] ? 0 : 1 / (ep[3] - ep[2]);
  this.evaluate = function(u, v) {
    return [(u - this.u1) * this.uinv, (v - this.v1) * this.vinv];
  };
};
/**
 * Sets the parametric surface used to generate vertex positions, and
 * sets a surface evaluator that generates texture coordinates in the interval [0, 1] along the U and V axes of the surface.
 * @param {Object|null} surface A [surface evaluator object]{@link Surface} that
 * describes the parametric surface
 * used to generate positions.
 * U and V texture coordinates, which will each be in the interval [0, 1] by this method,
 * correspond to U and V coordinates, respectively, for
 * the given surface.
 * @param {number} [size] The number of elements in each position. For
 * example, if the attribute is 3-dimensional, this parameter is 3. If null, undefined, or omitted, the default
 * is 3. The texture coordinates will be 2-dimensional. Throws an error if this value is 0 or less.
 * @returns {SurfaceBuilder} This object.
 */
SurfaceBuilder.prototype.positionTexCoord = function(surface, size) {
  const tc = typeof surface !== "undefined" && surface !== null ? new SurfaceBuilder._TexCoord(surface) : null;
  return this.attribute(surface, Semantic.POSITION, 0, size)
    .attribute(tc, Semantic.TEXCOORD, 0, 2);
};

/**
 * Sets the parametric surface used to generate vertex positions and normals, and
 * sets a surface evaluator that generates texture coordinates in the interval [0, 1] along the U and V axes of the surface.
 * @param {Object|null} surface A [surface evaluator object]{@link Surface} that
 * describes the parametric surface
 * used to generate positions.
 * U and V texture coordinates, which will each be in the interval [0, 1] by this method,
 * correspond to U and V coordinates, respectively, for
 * the given surface.
 * @param {number} [size] The number of elements in each position and normal. For
 * example, if the attribute is 3-dimensional, this parameter is 3. If null, undefined, or omitted, the default
 * is 3. The texture coordinates will be 2-dimensional.
 * @returns {SurfaceBuilder} This object.
 */
SurfaceBuilder.prototype.positionNormalTexCoord = function(surface, size) {
  const tc = typeof surface !== "undefined" && surface !== null ? new SurfaceBuilder._TexCoord(surface) : null;
  return this.positionNormal(surface, size)
    .attribute(tc, Semantic.TEXCOORD, 0, 2);
};

/**
 * Sets the parametric surface used to generate vertex attribute values.
 * @param {Object} surface A [surface evaluator object]{@link Surface} that
 * describes the parametric surface
 * used to generate attribute values.
 * U and V coordinates for the given surface correspond to U and V
 * coordinates, respectively, for
 * the surface used to generate vertex positions.
 * @param {number|string} semantic An attribute semantic, such
 * as {@link Semantic.POSITION}, "POSITION", or "TEXCOORD_0".
 * Throws an error if this value is a string and the string is invalid.
 * @param {number} [semanticIndex] The set index of the attribute
 * for the given semantic.
 * 0 is the first index of the attribute, 1 is the second, and so on.
 * This is ignored if "name" is a string. If null, undefined, or omitted, the default is 0.
 * @param {number} [size] The number of elements in each position and normal. For
 * example, if the attribute is 3-dimensional, this parameter is 3. If null, undefined, or omitted, the default
 * is 3. Throws an error if this value is 0 or less.
 * @returns {SurfaceBuilder} This object.
 * @example <caption>The following example sets the surface
 * function for texture coordinates to a linear evaluator. Thus, coordinates passed to the
 * evalSurface method will be interpolated as direct
 * texture coordinates.</caption>
 * surface.attribute({"evaluate":function(u,v) {
 * "use strict"; return [u,v] }},Semantic.TEXCOORD);
 */
SurfaceBuilder.prototype.attribute = function(surface, semantic, semanticIndex, size) {
  CurveBuilder._setAttribute(this.attributes, this.vertexCount,
    surface, semantic, semanticIndex, size);
  return this;
};

/**
 * Sets a value for an attribute semantic that will be the same for all
 * future vertices generated by the "evalSurface" method.
 * @param {Object|number} constantValue A constant value for the attribute semantic.
 * @param {number|string} semantic An attribute semantic, such
 * as {@link Semantic.POSITION}, "POSITION", or "TEXCOORD_0".
 * Throws an error if this value is a string and the string is invalid.
 * @param {number} [semanticIndex] The set index of the attribute
 * for the given semantic.
 * 0 is the first index of the attribute, 1 is the second, and so on.
 * This is ignored if "name" is a string. If null, undefined, or omitted, the default is 0.
 * @returns {SurfaceBuilder} This object.
 * @example <caption>This example sets the color to use for future
 * vertices to be generated for the surface.</caption>
 * // Set color to red
 * surface.constantAttribute([1,0,0],"COLOR");
 */
SurfaceBuilder.prototype.constantAttribute = function(constantValue, semantic, semanticIndex) {
  if(typeof constantValue === "number") {
    return this.attribute({
      "evaluate":function() {
        return [constantValue];
      }
    },
    semantic, semanticIndex, 1 );
  } else {
    return this.attribute({
      "evaluate":function() {
        return constantValue;
      }
    },
    semantic, semanticIndex, constantValue.length );
  }
};
/**
 * Sets a value for a color attribute that will be the same for all
 * future vertices generated by the "evalSurface" method.
 * @param {Array<number>|number|string} color A [color vector or string]{@link toGLColor}
 * identifying the constant color value. The alpha channel of the resulting color will be ignored.
 * @param {number} [semanticIndex] The set index of the attribute
 * for the given semantic.
 * 0 is the first index of the attribute, 1 is the second, and so on. If null, undefined, or omitted, the default is 0.
 * @returns {SurfaceBuilder} This object.
 * @example <caption>This example sets the color to use for future
 * vertices to be generated for the surface.</caption>
 * // Set color to red
 * surface.constantColor("red");
 */
SurfaceBuilder.prototype.constantColor = function(color, semanticIndex) {
  const c = toGLColor(color);
  return this.constantAttribute([c[0], c[1], c[2]],
    Semantic.COLOR, semanticIndex);
};

/**
 * Convenience method for creating a mesh buffer from a parametric
 * surface. The mesh buffer will contain positions, vertex normals, and
 * texture coordinates that cover the given surface.
 * @param {Object} surface A [surface evaluator object]{@link Surface} that
 * describes the parametric surface
 * used to generate positions.
 * U and V texture coordinates, which will each be in the interval [0, 1] by this method,
 * correspond to U and V coordinates, respectively, for
 * the given surface.
 * @param {number} [mode] If this value is {@link MeshBuffer.TRIANGLES}, or is null, undefined, or omitted, generates a series of triangles defining the surface. If
 * this value is {@link MeshBuffer.LINES}, generates
 * a series of lines defining the surface. If this value is {@link MeshBuffer.POINTS},
 * generates a series of points along the surface. For any other value,
 * this method has no effect.
 * @param {number} [un] Number of subdivisions along the U axis.
 * Default is 24.
 * @param {number} [vn] Number of subdivisions along the V axis.
 * Default is 24.
 * @param {number} [u1] Starting U coordinate of the surface to evaluate.
 * Default is the starting U coordinate given by the [surface evaluator object]{@link Surface}, or 0 if not given.
 * @param {number} [u2] Ending U coordinate of the surface to evaluate.
 * Default is the ending U coordinate given by the [surface evaluator object]{@link Surface}, or 1 if not given.
 * @param {number} [v1] Starting V coordinate of the surface to evaluate.
 * Default is the starting V coordinate given by the [surface evaluator object]{@link Surface}, or 0 if not given.
 * @param {number} [v2] Ending V coordinate of the surface to evaluate.
 * Default is the ending V coordinate given by the [surface evaluator object]{@link Surface}, or 1 if not given.
 * @returns {MeshBuffer} The generated mesh buffer.
 */
SurfaceBuilder.surfaceToBuffer = function(surface, mode, un, vn, u1, u2, v1, v2) {
  return new SurfaceBuilder()
    .positionNormalTexCoord(surface, 3)
    .evalSurface(mode, un, vn, u1, u2, vn, v2).toMeshBuffer();
};
/**
 * Generates the vertex attributes of the parametric curves.
 * @param {number} [mode] If this value is {@link MeshBuffer.LINES}, or is null, undefined, or omitted, generates
 * a series of lines defining the curve. If this value is {@link MeshBuffer.POINTS},
 * generates a series of points along the curve. For any other value,
 * this method has no effect.
 * @param {number} [n] Number of subdivisions of the curve to be drawn.
 * If null or undefined, a default is determined automatically based on the position curve's arc length, or the distance taken by its path (or the default is 24 if no position curve was defined). If 0, this method has no effect. Throws an error if this value is less than 0.
 * @param {number} [u1] Starting point of the curve.
 * Default is the starting coordinate given by the [curve evaluator object]{@link Curve}, or 0 if not given.
 * @param {number} [u2] Ending point of the curve.
 * Default is the ending coordinate given by the [curve evaluator object]{@link Curve}, or 1 if not given.
 * @returns {CurveBuilder} This object.
 */
CurveBuilder.prototype.evalCurve = function(mode, n, u1, u2) {
  n = typeof n === "undefined" || n === null ?
    CurveBuilder._defaultSubdivisionsCurve(this.attributes) :
    Math.ceil(n);
  if(n === 0)return this;
  if(n < 0)throw new Error();
  if(typeof mode === "undefined" || mode === null)mode = MeshBuffer.LINES;
  if(typeof u1 === "undefined" || u1 === null ||
     (typeof u2 === "undefined" || u2 === null)) {
    const ep = CurveBuilder._defaultEndPointsCurve(this.attributes);
    u1 = ep[0];
    u2 = ep[1];
  }
  let i;
  const uv = (u2 - u1) / n;
  const firstIndex = this.vertexCount;
  if(mode === MeshBuffer.LINES || (typeof mode === "undefined" || mode === null)) {
    for(i = 0; i < n; i++) {
      this.indices.push(firstIndex + i, firstIndex + i + 1);
    }
    this.vertexCount += n + 1;
  } else if(mode === MeshBuffer.POINTS) {
    for(i = 0; i < n; i++) {
      this.indices.push(firstIndex + i);
    }
    this.vertexCount += n + 1;
  } else {
    return this;
  }
  this.mode = mode;
  for(i = 0; i <= n; i++) {
    const u = u1 + i * uv;
    let j;
    for (j = 0; j < this.attributes.length; j++) {
      const a = this.attributes[j];
      const value = typeof a[4] !== "undefined" && a[4] !== null ? a[4].evaluate(u) : [];
      CurveBuilder._addValue(a, value);
    }
  }
  return this;
};
/**
 * Generates the vertex attributes of the parametric surfaces.
 * @param {number} [mode] If this value is {@link MeshBuffer.TRIANGLES}, or is null, undefined, or omitted, generates a series of triangles defining the surface. If
 * this value is {@link MeshBuffer.LINES}, generates
 * a series of lines defining the surface. If this value is {@link MeshBuffer.POINTS},
 * generates a series of points along the surface. For any other value,
 * this method has no effect.
 * @param {number} [un] Number of subdivisions along the U axis.
 * Default is 24. If 0, this method has no effect. Throws an error if this value is less than 0.
 * @param {number} [vn] Number of subdivisions along the V axis.
 * Default is 24. If 0, this method has no effect. Throws an error if this value is less than 0.
 * @param {number} [u1] Starting U coordinate of the surface to evaluate.
 * Default is the starting U coordinate given by the [surface evaluator object]{@link Surface}, or 0 if not given.
 * @param {number} [u2] Ending U coordinate of the surface to evaluate.
 * Default is the ending U coordinate given by the [surface evaluator object]{@link Surface}, or 1 if not given.
 * @param {number} [v1] Starting V coordinate of the surface to evaluate.
 * Default is the starting V coordinate given by the [surface evaluator object]{@link Surface}, or 0 if not given.
 * @param {number} [v2] Ending V coordinate of the surface to evaluate.
 * Default is the ending V coordinate given by the [surface evaluator object]{@link Surface}, or 1 if not given.
 * @returns {SurfaceBuilder} This object.
 */
SurfaceBuilder.prototype.evalSurface = function(mode, un, vn, u1, u2, v1, v2) {
  un = typeof un === "undefined" || un === null ? 24 : Math.ceil(un);
  vn = typeof vn === "undefined" || vn === null ? 24 : Math.ceil(vn);
  if(un === 0 || vn === 0)return this;
  if(un <= 0)throw new Error();
  if(vn <= 0)throw new Error();
  if(typeof mode === "undefined" || mode === null)mode = MeshBuffer.TRIANGLES;
  if(typeof u1 === "undefined" || u1 === null || (typeof u2 === "undefined" || u2 === null) || (typeof v1 === "undefined" || v1 === null) || (typeof v2 === "undefined" || v2 === null)) {
    const ep = CurveBuilder._defaultEndPointsSurface(this.attributes);
    u1 = ep[0];
    u2 = ep[1];
    v1 = ep[2];
    v2 = ep[3];
  }
  if(mode !== MeshBuffer.TRIANGLES && mode !== MeshBuffer.LINES && mode !== MeshBuffer.POINTS) {
    return this;
  }
  let u;
  let v;
  let i;
  let j;
  const du = (u2 - u1) / un;
  const dv = (v2 - v1) / vn;
  const numVertices = (vn + 1) * (un + 1);
  const firstVertex = this.vertexCount;
  this.vertexCount += numVertices;
  for(i = 0; i <= vn; i++) {
    for(j = 0; j <= un; j++) {
      u = j * du + u1;
      v = i * dv + v1;
      let k;
      for (k = 0; k < this.attributes.length; k++) {
        const a = this.attributes[k];
        const value = typeof a[4] !== "undefined" && a[4] !== null ?
          a[4].evaluate(u, v) : [];
        CurveBuilder._addValue(a, value);
      }
    }
  }
  this.mode = mode;
  let unp1;
  let index1;
  let index2;
  if(mode === MeshBuffer.TRIANGLES) {
    unp1 = un + 1;
    let y;
    for (y = 0; y < vn; y++) {
      let x;
      for (x = 0; x < un; x++) {
        const index0 = y * unp1 + x + firstVertex;
        index1 = index0 + unp1;
        index2 = index0 + 1;
        const index3 = index1 + 1;
        this.indices.push(index0, index1, index2);
        this.indices.push(index2, index1, index3);
      }
    }
  } else if(mode === MeshBuffer.POINTS) {
    const lastVertex = this.vertexCount;
    for(i = firstVertex; i < lastVertex; i++) {
      this.indices.push(i);
    }
  } else if(mode === MeshBuffer.LINES) {
    unp1 = un + 1;
    for(i = 0; i <= un; i++) {
      for(j = 0; j <= vn; j++) {
        index1 = j * unp1 + i + firstVertex;
        if(j < vn) {
          index2 = index1 + unp1;
          this.indices.push(index1, index2);
        }
        if(i < un) {
          index2 = index1 + 1;
          this.indices.push(index2, index1);
        }
      }
    }
  }
  return this;
};/*
 Any copyright to this file is released to the Public Domain.
 http://creativecommons.org/publicdomain/zero/1.0/
 If you like this, you should donate
 to Peter O. (original author of
 the Public Domain HTML 3D Library) at:
 http://peteroupc.github.io/
*/

function linear(points, elementsPerValue, t) {
  const ret = [];
  const p0 = points[0];
  const p1 = points[1];
  let i;
  for (i = 0; i < elementsPerValue; i++) {
    const pp0 = p0[i];
    ret[i] = pp0 + (p1[i] - pp0) * t;
  }
  return ret;
}
function bezierCubic(points, elementsPerValue, t) {
  const ret = [];
  const p0 = points[0];
  const p1 = points[1];
  const p2 = points[2];
  const p3 = points[3];
  let i;
  for (i = 0; i < elementsPerValue; i++) {
    ret[i] = (((3 - t) * t - 3) * t + 1) * p0[i] + ((3 * t - 6) * t + 3) * t * p1[i] + (-3 * t + 3) * t * t * p2[i] + t * t * t * p3[i];
  }
  return ret;
}

function bezierCubicDerivative(points, elementsPerValue, t) {
  const ret = [];
  const p0 = points[0];
  const p1 = points[1];
  const p2 = points[2];
  const p3 = points[3];
  let i;
  for (i = 0; i < elementsPerValue; i++) {
    ret[i] = ((-3 * t + 6) * t - 3) * p0[i] + ((9 * t - 12) * t + 3) * p1[i] + (-9 * t + 6) * t * p2[i] + 3 * t * t * p3[i];
  }
  return ret;
}
function bezierQuadratic(points, elementsPerValue, t) {
  const ret = [];
  const p0 = points[0];
  const p1 = points[1];
  const p2 = points[2];
  let i;
  for (i = 0; i < elementsPerValue; i++) {
    ret[i] = ((t - 2) * t + 1) * p0[i] + (-2 * t + 2) * t * p1[i] + t * t * p2[i];
  }
  return ret;
}
function bezierQuadraticDerivative(points, elementsPerValue, t) {
  const ret = [];
  const p0 = points[0];
  const p1 = points[1];
  const p2 = points[2];
  let i;
  for (i = 0; i < elementsPerValue; i++) {
    ret[i] = (2 * t - 2) * p0[i] + (-4 * t + 2) * p1[i] + 2 * t * p2[i];
  }
  return ret;
}
/**
 * A [curve evaluator object]{@link Curve} for a B-spline (basis spline) curve.
 * A B-spline curve is a parametric curve based on polynomial functions.
 * Each polynomial is generated using one or more
 * <i>control points</i>, which more or less follow the path of the curve,
 * and a <i>knot vector</i>, which determines, more or less, where each control
 * point is spaced along the curve. Together with rational B-spline curves (see
 * below), this makes B-spline curves very powerful,
 * since they can describe nearly all curves commonly used in computer
 * graphics, including line segments, circles, ellipses, parabolas, and
 * irregular smooth curves. With the B-spline curves supported here, a perspective transformation (including a rotation, translation, or scaling) of the curve's control points leads to the same transformation of the resulting curve.
 * <p><b>B&eacute;zier Curves</b><p>
 * A B&eacute;zier curve is defined by a series of control points, where
 * the first and last control points are the curve's end points, and
 * the remaining control points define the curve's shape, though they don't
 * necessarily cross the curve. An important property of these curves is
 * that the bounding box of the curve is contained within the bounding box
 * of the control points. Another important property is that the starting direction
 * is the same as the direction from the
 * first to the second control point, and the ending direction is the same as the
 * direction from the next-to-last to last control point.<p>
 * B&eacute;zier curves are a subset of B-spline curves
 * (see {@link BSplineCurve.fromBezierCurve}).<p>
 * Line segments are degree-1 B&eacute;zier curves with two control points.<p>
 * A B&eacute;zier curve's knot vector consists of as many zeros as the number
 * of control points, followed by that many ones. For example, a degree-3 (cubic)
 * B&eacute;zier curve contains four control points and the following knot vector:
 * <code>[0, 0, 0, 0, 1, 1, 1, 1]</code>.
 * <p><b>Non-Uniform Curves</b><p>
 * A non-uniform B-spline curve is one whose knot vector is not evenly spaced,
 * that is, the difference between one knot and the next isn't the same.
 * <p><b>Rational Curves</b><p>
 * A rational B-spline curve is an N-dimensional curve with N plus one coordinates
 * per control point (<i>homogeneous coordinates</i>). B-spline algorithms
 * work the same way with homogeneous coordinates as with conventional
 * coordinates, but if N-dimensional points are wanted, use the {@link BSplineCurve.DIVIDE_BIT}
 * flag to divide each coordinate by the last (and omit the last coordinate)
 * to convert to N-dimensional points.<p>
 * Rational B-spline curves can describe circles and ellipses, which non-rational B-spline curves can't.<p>
 * Note that some B-spline packages define rational B-spline curves as using control points and weights, that is,
 * N-dimensional control points in conventional coordinates, along with a separate number, or <i>weight</i>,
 * for each control point. To convert such a control point to homogeneous coordinates, multiply each of its
 * conventional coordinates by its weight, then append the weight as the control point's last coordinate.
 * <p><b>NURBS Curves</b><p>
 * <i>NURBS</i> is an acronym for non-uniform rational B-spline curves.
 * <p><b>Polynomial Basis</b></p>
 * <p>Any kind of polynomial curve can be converted to a different kind
 * of polynomial curve, having the same degree and describing the same path,
 * by transforming its control points. For example, a Hermite curve (another
 * kind of polynomial curve) can be converted to the equivalent
 * B-spline curve this way, or vice versa.
 * <p>Each kind of polynomial curve (such as B-spline or B&eacute;zier) is
 * associated with a <i>basis matrix</i>, which defines the polynomial
 * coefficients for each control point in the curve. For a degree (N-1) curve,
 * the matrix will be N&times;N.<p>
 * Each "column" of a basis matrix is a polynomial
 * containing the coefficients for each control point, and the columns are
 * arranged from left to right. Each polynomial consists of coefficients, ranging from the
 * highest order to the lowest, with respect to the parameter
 * <code>t</code> and the corresponding control point. For example, the
 * column <code>(3, 4, 2, 10)</code> describes the polynomial
 * 3xt<sup>3</sup> + 4xt<sup>2</sup> + 2xt + 10x, where <code>x</code>
 * is the input control point. The polynomials
 * are added together to get the final coordinate of the curve at the
 * given <code>t</code> value.<p>
 * The following JavaScript code shows an example of a basis matrix -- the
 * cubic B&eacute;zier basis matrix.<br>
 * <pre>var bezierBasisMatrix = [
 * // For the purposes of the Math matrix functions,
 * // the polynomials are arranged "column-wise", like this:
 * // P1, P2, P3, P4
 * -1,3,-3,1,
 * 3,-6,3,0,
 * -3,3,0,0,
 * 1,0,0,0]</pre>
 * <p>For code that converts a curve from one kind to
 * another, see the example.
 * @constructor
 * @augments Curve
 * @param {Array<Array<number>>} controlPoints An array of control points. Each
 * control point is an array with the same length as the other control points.
 * It is assumed that the first control point's length represents the size of all the control
 * points.
 * @param {Array<number>} knots Knot vector of the curve.
 * Its size must be at least 2 plus the number of control
 * points and not more than twice the number of control points.<br>
 * The length of this parameter minus 1, minus the number
 * of control points, represents the <i>degree</i> of the B-spline
 * curve. For example, a degree-3 (cubic) B-spline curve with four control points must contain eight knots, which is four (1 plus degree 3) more knots than the number of control points. A degree of 1
 * results in straight line segments.<br>
 * The knot vector must be a monotonically nondecreasing sequence,
 * the first knot must not equal the last, and the same knot may not be repeated
 * more than N+1 times at the beginning and end of the vector, or more than
 * N times elsewhere, where N is the curve's degree.
 * If the difference between one knot and the next isn't the same,
 * the curve is considered a <i>non-uniform</i> B-spline curve. Usually the first
 * knot will be 0 or less and the last knot will be 1 or greater.  (Note that this class uses the definition of knot vectors given by <a href="https://pages.mtu.edu/~shene/COURSES/cs3621/NOTES/spline/B-spline/bspline-curve.html">C.-K. Shene</a>. There are computer-aided design programs that use knot vectors in which the first and last knot are omitted; they can be converted to Shene's definition by repeating the first knot at the beginning and repeating the last knot at the end.)
 * @param {number} [bits] Bits for defining input
 * and controlling output. Zero or more of {@link BSplineCurve.DIVIDE_BIT}. If null, undefined, or omitted, no bits are set.
 * @example <caption>The following function can be used
 * to convert an array of control points, each consisting of conventional
 * coordinates and a weight, to homogeneous coordinates.
 * For example, the single-control point
 * '[[2, 3, 4, 0.1]]' becomes '[[0.2, 0.3, 0.4, 0.1]]'; the
 * return value can then be used in the BSplineCurve constructor
 * to create a rational B-Spline curve.</caption>
 * function convertToHomogen(cp) {
 * var ret = [];
 * var cplen = cp[0].length;
 * for(var i = 0; i < cp.length; i++) {
 * var outp = [];
 * var w = cp[i][cplen - 1];
 * for(var j = 0; j < cplen - 1; j++) {
 * outp[j] = cp[i][j] * w;
 * }
 * outp[cplen - 1] = w;
 * ret.push(outp);
 * }
 * return ret;
 * };
 * @example <caption>The following code converts a cubic (degree-3)
 * curve from one kind to another. The converted curve will generally
 * have the same path as the original curve.</caption>
 * // "srcBasis" is a 4x4 basis matrix for the source curve type;
 * // the control points will initially be of this type of curve.
 * // var srcBasis = [ .... ]; // To be supplied or filled in.
 * // "dstBasis" is a 4x4 basis matrix for the destination curve type.
 * // It's defined here as the B&eacute;zier basis matrix for this example
 * var dstBasis =[-1,3,-3,1, 3,-6,3,0, -3,3,0,0, 1,0,0,0];
 * // Step 1: Invert the destination basis matrix
 * var invertedDest=MathUtil.mat4invert(destBasis)
 * // Step 2: Multiply the inverted destination matrix by the source
 * // matrix
 * var resultMatrix=MathUtil.mat4multiply(invertedDest,srcBasis)
 * // Step 3: Convert the control points one dimension
 * // at a time
 * var newControlPoints=[[],[],[],[]]
 * for(var i=0;i &lt; controlPoints[0].length;i++) {
 * var cp=[controlPoints[0][i],controlPoints[1][i],controlPoints[2][i],
 * controlPoints[3][i]]
 * // Transform the control points using the result matrix
 * cp=MathUtil.vec4transform(resultMatrix,cp)
 * // Set the new coordinates
 * newControlPoints[0][i]=cp[0]
 * newControlPoints[1][i]=cp[1]
 * newControlPoints[2][i]=cp[2]
 * newControlPoints[3][i]=cp[3]
 * }
 * // Finally, generate a B&eacute;zier curve (which is a special case
 * // of a B-spline curve)
 * var curve=new BSplineCurve(
 * newControlPoints,
 * [0,0,0,0,1,1,1,1] // cubic B&eacute;zier knot vector
 * );
 * // Alternatively, the curve could be generated with the
 * // fromBezierCurve method:
 * // var curve=BSplineCurve.fromBezierCurve(newControlPoints);
 */
function BSplineCurve(controlPoints, knots, bits) {
  if(controlPoints.length <= 0)throw new Error();
  if(!knots)throw new Error("no knots");
  this.bits = bits || 0;
  this.controlPoints = controlPoints;
  const order = knots.length - this.controlPoints.length;
  if(order < 1)throw new Error("degree 0 or less");
  if(order > this.controlPoints.length)
    throw new Error();
  BSplineCurve._checkKnots(knots, order - 1);
  const cplen = this.controlPoints[0].length;
  let cplenNeeded = 1;
  if((this.bits & BSplineCurve.DIVIDE_BIT) !== 0) {
    cplenNeeded = 2;
  }
  if(cplen < cplenNeeded)throw new Error();
  this.fastBezier = false;
  if(order === this.controlPoints.length && order <= 4) {
    this.fastBezier = true;
    let i;
    for (i = 0; i < order; i++) {
      if(knots[i] !== 0) {
        this.fastBezier = false;
        break;
      }
    }
    for(i = order; this.fastBezier && i < knots.length; i++) {
      if(knots[i] !== 1) {
        this.fastBezier = false;
        break;
      }
    }
  }
  this.knots = knots;
  this.buffer = [];
}
BSplineCurve.prototype = Object.create(Curve.prototype);
BSplineCurve.prototype.constructor = BSplineCurve;

/**
 * Indicates to divide each other coordinate of the returned point
 * by the last coordinate of the point and omit the last
 * coordinate. This is used to convert
 * homogeneous coordinates to conventional coordinates.
 * If this bit is set, the length of each control point must be at least 2.<p>
 * A B-spline curve that has control points whose last coordinate is other than
 * 1 is a <i>rational</i> B-spline curve.
 * @const
 * @default
 */
BSplineCurve.DIVIDE_BIT = 2;
/** @ignore */
BSplineCurve._checkKnots = function(knots, degree) {
  let i;
  for (i = 1; i < knots.length; i++) {
    if(knots[i] < knots[i - 1])
      throw new Error(knots + "---/" + [knots[i - 1], knots[i]]);
  }
  for(i = 1; i < knots.length - 2 - degree; i++) {
    if(knots[i + degree] <= knots[i])
      throw new Error();
  }
  if(knots[0] === knots[knots.length - 1] ||
       knots[0] >= knots[degree + 1])throw new Error();
  if(knots[knots.length - 2 - degree] >= knots[knots.length - 1])throw new Error();
  if(degree + 1 >= knots.length)throw new Error();
};
/** @ignore */
BSplineCurve._nfunc = function(i, d, u, kn) {
  if(d === 0) {
    return kn[i] <= u && u < kn[i + 1] ? 1 : 0;
  }
  if(kn[i] > u)return 0;
  if(kn[i] === kn[i + d] && kn[i + d + 1] === kn[i + 1])return 0;
  if(kn[i + d + 1] < u)return 0;
  const v1 = kn[i] === kn[i + d] ? 0 : BSplineCurve._nfunc(i, d - 1, u, kn);
  const v2 = kn[i + d + 1] === kn[i + 1] ? 0 : BSplineCurve._nfunc(i + 1, d - 1, u, kn);
  if(v1 + v2 === 0) {
    return 0;
  }
  let ret = 0;
  let den2;
  if(v1 !== 0) {
    den2 = kn[i + d] - kn[i];
    ret += (u - kn[i]) * v1 * (den2 === 0 ? 1 : 1.0 / den2);
  }
  if(v2 !== 0) {
    den2 = kn[i + d + 1] - kn[i + 1];
    ret += (kn[i + d + 1] - u) * v2 * (den2 === 0 ? 1 : 1.0 / den2);
  }
  return ret;
};
/** @ignore */
BSplineCurve._getFactors = function(kn, t, degree, numPoints, buffer) {
  let multStart = 1;
  let multEnd = 1;
  let i;
  for (i = 0; i < numPoints; i++) {
    buffer[i] = 0;
  }
  for(i = 1; i < kn.length; i++) {
    if(kn[i] === kn[0]) {
      multStart += 1;
    } else {
      break;
    }
  }
  for(i = kn.length - 2; i >= 0; i--) {
    if(kn[i] === kn[kn.length - 1]) {
      multEnd += 1;
    } else {
      break;
    }
  }
  if(t >= kn[kn.length - 1 - degree] &&
        kn[kn.length - 1 - degree] === kn[kn.length - 1]) {
    buffer[numPoints - 1] = 1;
    return;
  }
  if(multStart !== degree + 1 || multEnd !== degree + 1) {
    // Not a clamped curve
    let i;
    for (i = 0; i < numPoints; i++) {
      buffer[i] = BSplineCurve._nfunc(i, degree, t, kn);
    }
    return;
  }
  if(t <= kn[degree]) {
    buffer[0] = 1;

  } else if(t >= kn[kn.length - 1 - degree]) {
    buffer[numPoints - 1] = 1;

  } else {
    let k = -1;
    let i;
    for (i = 0; i <= kn.length; i++) {
      if(kn[i] <= t && t < kn[i + 1]) {
        k = i;
        break;
      }
    }
    if(k < 0)return;
    const numAfter = kn[k + 1] - t;
    const knotStart = kn[k];
    const numBefore = t - knotStart;
    buffer[k] = 1;
    let d;
    for (d = 1; d <= degree; d++) {
      const den = kn[k + 1] - kn[k - d + 1];
      buffer[k - d] = buffer[k - d + 1] * numAfter / den;
      for(i = k - d + 1; i < k; i++) {
        const kni = kn[i];
        buffer[i] *= (t - kni) / (kn[i + d] - kni);
        buffer[i] += buffer[i + 1] * (kn[i + d + 1] - t) / (kn[i + d + 1] - kn[i + 1]);
      }
      buffer[k] *= numBefore / (kn[k + d] - knotStart);
    }
  }
};

/**
 * Evaluates the curve function based on a point
 * in a B-spline curve.
 * @param {number} u Point on the curve to evaluate. This parameter is not scaled according
 * to the curve's knot vector. To get the curve's extents, call this object's
 * <code>endPoints</code> method.
 * @returns {Array<number>} An array of the result of
 * the evaluation. Its length will be equal to the
 * length of a control point (minus 1 if DIVIDE_BIT is set), as specified in the constructor.
 * @example
 * // Generate 11 points forming the curve.
 * var points=[];
 * for(var i=0;i&lt;=10;i++) {
 * points.push(curve.evaluate(i/10.0));
 * }
 */
BSplineCurve.prototype.evaluate = function(u) {
  let ret = [];
  if(this.fastBezier) {
    const cp = this.controlPoints;
    switch(cp.length) {
    case 1:
      ret = cp[0].slice(0, cp[0].length);
      break;
    case 2:
      ret = linear(cp, cp[0].length, u);
      break;
    case 3:
      ret = bezierQuadratic(cp, cp[0].length, u);
      break;
    case 4:
      ret = bezierCubic(cp, cp[0].length, u);
      break;
    default:
      break;
    }
  } else {
    const numPoints = this.controlPoints.length;
    const degree = this.knots.length - numPoints - 1;
    const elementsPerPoint = this.controlPoints[0].length;
    ret = null;
    if(u <= this.knots[degree]) {
      if(this.knots[degree] === this.knots[0]) {
        ret = this.controlPoints[0].slice(0, elementsPerPoint);
      } else {
        u = this.knots[degree];
      }
    } else if(u >= this.knots[this.knots.length - 1 - degree]) {
      if(this.knots[this.knots.length - 1 - degree] === this.knots[this.knots.length - 1]) {
        ret = this.controlPoints[numPoints - 1].slice(0, elementsPerPoint);
      } else {
        u = this.knots[this.knots.length - 1 - degree];
      }
    }

    if(typeof ret === "undefined" || ret === null) {
      let mult = 0;
      let index = -1;
      let i;
      for(i = 0; i < this.knots.length; i++) {
        const curKnot = this.knots[i];
        const isThisKnot = u === curKnot;
        if(isThisKnot)mult++;
        if(curKnot < this.knots[i + 1]) {
          if(isThisKnot) {
            index = i;
            break;
          } else if(curKnot < u && u < this.knots[i + 1]) {
            index = i;
            break;
          }
        }
      }
      if(index < 0)throw new Error();
      if(mult > degree)throw new Error();
      if(mult === degree) {
        ret = this.controlPoints[index - degree].slice(0, elementsPerPoint);
      } else {
        const h = degree - mult;
        const buffer = [];
        for(i = index - degree; i <= index - mult; i++) {
          buffer.push(this.controlPoints[i]);
        }
        let r;
        for (r = 1; r <= h; r++) {
          let lastPt = buffer[r - 1];
          for(i = r; i < buffer.length; i++) {
            const kindex = index - degree + i;
            const ki = this.knots[kindex];
            const a = (u - ki) / (this.knots[kindex + degree - r + 1] - ki);
            const thisPt = buffer[i];
            const newPt = [];
            // console.log("p"+[kindex,r]+"="+(1-a)+"*p"+[kindex-1,r-1]+"+"+(a)+"*p"+[kindex,r-1])
            let j;
            for (j = 0; j < elementsPerPoint; j++) {
              newPt[j] = lastPt[j] * (1 - a) + thisPt[j] * a;
            }
            buffer[i] = newPt;
            lastPt = thisPt;
          }
        }
        ret = buffer[buffer.length - 1].slice(0, elementsPerPoint);
      }
    }
  }
  if((this.bits & BSplineCurve.DIVIDE_BIT) !== 0) {
    ret = BSplineCurve._fromHomogen(ret);
  }
  return ret;
};
/** @ignore */
BSplineCurve._splitKnots = function(knots, degree, u) {
  let lastFront = -1;
  let firstBack = -1;
  const front = [];
  const back = [];
  let i;
  for (i = 0; i < knots.length; i++) {
    if(knots[i] > u) {
      firstBack = i;
      break;
    } else if(knots[i] < u) {
      lastFront = i;
    }
  }
  if(lastFront < 0 || firstBack < 0)throw new Error();

  for (i = 0; i <= lastFront; i++) {
    front.push(knots[i]);
  }

  for (i = 0; i < degree + 1; i++) {
    front.push(u);
    back.push(u);
  }
  for(i = firstBack; i < knots.length; i++) {
    back.push(knots[i]);
  }
  return [front, back];
};
/**
 * Splits this B-spline curve into two at the given point.
 * @param {number} u Point on the curve where this curve will be split.
 * @returns {Array<BSplineCurve>} An array containing two B-spline curves: the
 * first is the part of the curve before the given point, and the second
 * is the part of the curve after the given point. The first element
 * will be null if <code>u</code> is at or before the start of the curve.
 * The second element
 * will be null if <code>u</code> is at or after the end of the curve.
 */
BSplineCurve.prototype.split = function(u) {
  const numPoints = this.controlPoints.length;
  const degree = this.knots.length - numPoints - 1;
  const elementsPerPoint = this.controlPoints[0].length;
  let i;
  if(u <= this.knots[degree]) {
    return [null, this];
  } else if(u >= this.knots[this.knots.length - 1 - degree]) {
    return [this, null];
  }
  let mult = 0;
  let index = -1;
  for(i = 0; i < this.knots.length; i++) {
    const curKnot = this.knots[i];
    const isThisKnot = u === curKnot;
    if(isThisKnot)mult++;
    if(curKnot < this.knots[i + 1]) {
      if(isThisKnot) {
        index = i;
        break;
      } else if(curKnot < u && u < this.knots[i + 1]) {
        index = i;
        break;
      }
    }
  }
  if(index < 0)throw new Error();
  if(mult > degree)throw new Error();
  const newKnots = BSplineCurve._splitKnots(this.knots, degree, u);
  let front = [];
  let backPoints = [];
  if(mult === degree) {
    front = this.controlPoints.slice(0, index - degree + 1);
    backPoints = this.controlPoints.slice(index - degree, this.controlPoints.length);
  } else {
    const h = degree - mult;
    const buffer = [];
    for(i = index - degree; i <= index - mult; i++) {
      buffer.push(this.controlPoints[i]);
    }
    // Start array of front points
    front = [];
    for(i = 0; i <= index - degree; i++) {
      front.push(this.controlPoints[i]);
    }
    const back = [];
    let r;
    for (r = 1; r <= h; r++) {
      let lastPt = buffer[r - 1];
      for(i = r; i < buffer.length; i++) {
        const kindex = index - degree + i;
        const ki = this.knots[kindex];
        const a = (u - ki) / (this.knots[kindex + degree - r + 1] - ki);
        const thisPt = buffer[i];
        const newPt = [];
        let j;
        for (j = 0; j < elementsPerPoint; j++) {
          newPt[j] = lastPt[j] * (1 - a) + thisPt[j] * a;
        }
        buffer[i] = newPt;
        lastPt = thisPt;
        if(i === r) {
          front.push(newPt);
        } else if(i + 1 === buffer.length) {
          back.push(newPt);
        }
      }
    }
    // Generate array of back points
    backPoints.push(front[front.length - 1]);
    for(i = back.length - 1; i >= 0; i--) {
      backPoints.push(back[i]);
    }
    for(i = index - mult; i < numPoints; i++) {
      backPoints.push(this.controlPoints[i]);
    }
  }
  const curve1 = new BSplineCurve(front, newKnots[0], this.bits);
  const curve2 = new BSplineCurve(backPoints, newKnots[1], this.bits);
  return [curve1, curve2];
};

/**
 * Returns the starting and coordinates of this curve.
 * @returns {Array<number>} A two-element array containing
 * the starting and ending U coordinates, respectively, of the curve.
 */
BSplineCurve.prototype.endPoints = function() {
  const numPoints = this.controlPoints.length;
  const degree = this.knots.length - numPoints - 1;
  return [this.knots[degree], this.knots[this.knots.length - 1 - degree]];
};

/**
 * Gets a reference to the array of control points used
 * in this curve object.
 * @returns {Array<Array<number>>} An object described in the constructor to {@link BSplineCurve}.
 */
BSplineCurve.prototype.getControlPoints = function() {
  return this.controlPoints;
};
/**
 * Gets a reference to the array of knots used
 * in this curve object.
 * @returns {Array<Array<number>>} An object described in the constructor to {@link BSplineCurve}.
 */
BSplineCurve.prototype.getKnots = function() {
  return this.knots;
};

/**
 * Finds the velocity (derivative) of
 * this curve at the given point.
 * @param {number} u Point on the curve to evaluate.
 * @returns {Array<number>} An array giving the velocity vector.
 * It will have as many elements as a control point (or one fewer
 * if DIVIDE_BIT is set), as specified in the constructor.
 */
BSplineCurve.prototype.velocity = function(u) {
  let ret = [];
  if(this.fastBezier) {
    const cp = this.controlPoints;
    switch(cp.length) {
    case 1:
      ret = MathInternal.vecZeros(cp[0].length);
      break;
    case 2:
      ret = MathInternal.vecSub(cp[1], cp[0]);
      break;
    case 3:
      ret = bezierQuadraticDerivative(cp, cp[0].length, u);
      break;
    case 4:
      ret = bezierCubicDerivative(cp, cp[0].length, u);
      break;
    default:
      break;
    }
  } else {
    const numPoints = this.controlPoints.length;
    const degree = this.knots.length - numPoints - 1;
    const elementsPerPoint = this.controlPoints[0].length;
    BSplineCurve._getFactors(this.knots, u, degree - 1, numPoints,
      this.buffer);
    let i;
    let j;
    const coeffs = [];
    for(i = 0; i < numPoints; i++) {
      coeffs[i] = 0;
    }
    for(j = 0; j < numPoints - 1; j++) {
      const pix = degree * this.buffer[j + 1] / (this.knots[j + degree + 1] - this.knots[j + 1]);
      coeffs[j + 1] += pix;
      coeffs[j] -= pix;
    }
    for(i = 0; i < elementsPerPoint; i++) {
      let value = 0;
      for(j = 0; j < numPoints; j++) {
        value += coeffs[j] * this.controlPoints[j][i];
      }
      ret[i] = value;
    }
  }
  if((this.bits & BSplineCurve.DIVIDE_BIT) !== 0) {
    ret = BSplineCurve._fromHomogen(ret);
  }
  return ret;
};

/** @ignore */
BSplineCurve._fromHomogen = function(cp) {
  const cplen = cp.length;
  const div = 1.0 / cp[cplen - 1];
  let i;
  for (i = 0; i < cplen - 1; i++) {
    cp[i] *= div;
  }
  cp = cp.slice(0, cplen - 1);
  return cp;
};
/**
 * A [surface evaluator object]{@link Surface} for a B-spline (basis spline) surface,
 * whose edges are made up of B-spline curves. For more on B-spline curves, see the constructor
 * for {@link BSplineCurve}.
 * @constructor
 * @augments Surface
 * @param {Array<Array<Array<number>>>} controlPoints An array of control point
 * arrays, which in turn contain a number of control points. Each
 * control point is an array with the same length as the other control points.
 * It is assumed that:<ul>
 * <li>The length of this parameter is the number of control points in each row of
 * the V axis.
 * <li>The length of the first control point array is the number of control points in
 * each column of the U axis.
 * <li>The first control point's length represents the size of all the control
 * points.
 * </ul>
 * @param {Array<number>} knotsU Knot vector of the surface, along the U axis.
 * For more information, see {@link BSplineCurve}.
 * @param {Array<number>} knotsV Knot vector of the surface, along the V axis.
 * @param {number} [bits] Bits for defining input
 * and controlling output. Zero or more of {@link BSplineCurve.DIVIDE_BIT}. If null, undefined, or omitted, no bits are set.
 * @example <caption>Together with 'convertToHomogen' given in the {@link BSplineCurve} documentation, the following function can be used
 * to convert an array of arrays of control points, each consisting of conventional
 * coordinates and a weight, to homogeneous coordinates.
 * For example, the single-control point array
 * '[[[2, 3, 4, 0.1]]]' becomes '[[[0.2, 0.3, 0.4, 0.1]]]'; the
 * return value can then be used in the BSplineSurface constructor
 * to create a rational B-Spline surface.</caption>
 * function convertSurfaceToHomogen(cp) {
 * var ret = [];
 * for(var i = 0; i < cp.length; i++) {
 * ret.push(convertToHomogen(cp[i]));
 * }
 * return ret;
 * };
 */
function BSplineSurface(controlPoints, knotsU, knotsV, bits) {
  const cpoints = controlPoints;
  this.bits = bits || 0;
  const vcplen = cpoints.length;
  if(vcplen <= 0)throw new Error();
  const ucplen = cpoints[0].length;
  if(ucplen <= 0)throw new Error();
  const cplen = cpoints[0][0].length;
  let cplenNeeded = 1;
  if((this.bits & BSplineCurve.DIVIDE_BIT) !== 0) {
    cplenNeeded = 2;
  }
  if(cplen < cplenNeeded)throw new Error();
  if(!knotsU || !knotsV)throw new Error();
  this.degreeU = knotsU.length - ucplen - 1;
  this.degreeV = knotsV.length - vcplen - 1;
  this.vcplen = vcplen;
  this.ucplen = ucplen;
  if(this.degreeU < 1 || this.degreeU + 1 > ucplen)throw new Error();
  if(this.degreeV < 1 || this.degreeV + 1 > vcplen)throw new Error();
  BSplineCurve._checkKnots(knotsU, this.degreeU);
  BSplineCurve._checkKnots(knotsV, this.degreeV);
  this.knotsU = knotsU;
  this.knotsV = knotsV;
  this.bufferU = [];
  this.bufferV = [];
  this.controlPoints = cpoints;
}
BSplineSurface.prototype = Object.create(Surface.prototype);
BSplineSurface.prototype.constructor = BSplineSurface;
/**
 * Creates a B-spline curve with uniform knots, except that
 * the curve will start and end at the first and last control points and will
 * be tangent to the line between the first and second control points
 * and to the line between the next-to-last and last control points.
 * @param {Array<Array<number>>} controlPoints Array of
 * control points as specified in the {@link BSplineCurve} constructor.
 * @param {number} [degree] Degree of the B-spline
 * curve. For example, 3 means a degree-3 (cubic) curve.
 * If null, undefined, or omitted, the default is 3.
 * @param {number} [bits] Bits as specified in the {@link BSplineCurve} constructor.
 * @returns {BSplineCurve} Return value. The first
 * knot of the curve will be 0 and the last knot will be 1.
 */
BSplineCurve.clamped = function(controlPoints, degree, bits) {
  return new BSplineCurve(controlPoints,
    BSplineCurve.clampedKnots(controlPoints.length, degree), bits);
};

/**
 * Creates a B-spline curve from the control points of a B&eacute;zier curve.
 * @param {Array<Array<number>>} controlPoints An array of control points. Each
 * control point is an array with the same length as the other control points.
 * It is assumed that:<ul>
 * <li>The length of this parameter minus 1 represents the degree of the B&eacute;zier
 * curve. For example, a degree-3 (cubic) curve
 * contains 4 control points. A degree of 1 (two control points) results in a straight line segment.
 * <li>The first control point's length represents the size of all the control
 * points.
 * </ul>
 * @param {number} [bits] Bits as specified in the {@link BSplineCurve} constructor.
 * @returns {BSplineCurve} Return value.
 * @example <caption>The following function generates a polygon curve using linear B&eacute;zier
 * curves.</caption>
 * function polygonCurve(points) {
 * var curves=[]
 * for(var i=0;i &lt; points.length;i++) {
 * var cp=points[i]
 * var np=(i==points.length-1) ? points[0] : points[i+1]
 * curves.push(BSplineCurve.fromBezierCurve([cp,np]))
 * }
 * return new PiecewiseCurve(curves)
 * }
 */
BSplineCurve.fromBezierCurve = function(controlPoints, bits) {
  return BSplineCurve.clamped(controlPoints, controlPoints.length - 1, bits);
};

/**
 * Creates a B-spline curve with uniform knots.
 * @param {Array<Array<number>>} controlPoints Array of
 * control points as specified in the {@link BSplineCurve} constructor.
 * @param {number} [degree] Degree of the B-spline
 * curve. For example, 3 means a degree-3 (cubic) curve.
 * If null, undefined, or omitted, the default is 3.
 * @param {number} [bits] Bits as specified in the {@link BSplineCurve} constructor.
 * @returns {BSplineCurve} Return value. The first
 * knot of the curve will be 0 and the last knot will be 1. (This is a change from previous
 * versions.)
 */
BSplineCurve.uniform = function(controlPoints, degree, bits) {
  return new BSplineCurve(controlPoints,
    BSplineCurve.uniformKnots(controlPoints.length, degree), bits);
};

/**
 * Creates a B-spline surface with uniform knots, except that
 * the surface's edges lie on the edges of the control point array.
 * @param {Array<Array<Array<number>>>} controlPoints Array of
 * control point arrays as specified in the {@link BSplineSurface} constructor.
 * @param {number} [degreeU] Degree of the B-spline
 * surface along the U axis. For example, 3 means a degree-3 (cubic) curve.
 * If null, undefined, or omitted, the default is 3.
 * @param {number} [degreeV] Degree of the B-spline
 * surface along the V axis
 * If null, undefined, or omitted, the default is 3.
 * @param {number} [bits] Bits as specified in the {@link BSplineSurface} constructor.
 * @returns {BSplineSurface} Return value. The first
 * knot of the curve will be 0 and the last knot will be 1.
 */
BSplineSurface.clamped = function(controlPoints, degreeU, degreeV, bits) {
  return new BSplineSurface(controlPoints,
    BSplineCurve.clampedKnots(controlPoints[0].length, degreeU),
    BSplineCurve.clampedKnots(controlPoints.length, degreeV), bits);
};
/**
 * Creates a B-spline surface with uniform knots.
 * @param {Array<Array<Array<number>>>} controlPoints Array of
 * control point arrays as specified in the {@link BSplineSurface} constructor.
 * @param {number} [degreeU] Degree of the B-spline
 * surface along the U axis. For example, 3 means a degree-3 (cubic) curve.
 * If null, undefined, or omitted, the default is 3.
 * @param {number} [degreeV] Degree of the B-spline
 * surface along the V axis
 * If null, undefined, or omitted, the default is 3.
 * @param {number} [bits] Bits as specified in the {@link BSplineSurface} constructor.
 * @returns {BSplineSurface} Return value. The first
 * knot of the curve will be 0 and the last knot will be 1.
 */
BSplineSurface.uniform = function(controlPoints, degreeU, degreeV, bits) {
  return new BSplineSurface(controlPoints,
    BSplineCurve.uniformKnots(controlPoints[0].length, degreeU),
    BSplineCurve.uniformKnots(controlPoints.length, degreeV), bits);
};
/**
 * Generates a knot vector with uniform knots, to be
 * passed to the {@link BSplineCurve} or {@link BSplineSurface} constructor.
 * @param {number|Object} controlPoints Number of control points the curve will have,
 * or an array of control points.
 * @param {number} [degree] Degree of the B-spline
 * curve. For example, 3 means a degree-3 (cubic) curve.
 * If null, undefined, or omitted, the default is 3.
 * @returns {Array<number>} A uniform knot vector. The first
 * knot will be 0 and the last knot will be 1. (This is a change from previous
 * versions.)
 */
BSplineCurve.uniformKnots = function(controlPoints, degree) {
  if(typeof controlPoints === "object")
    controlPoints = controlPoints.length;
  const deg = typeof degree === "undefined" || degree === null ? 3 : degree;
  if(controlPoints < deg + 1)
    throw new Error("too few control points for degree " + deg + " curve");
  const order = deg + 1;
  const ret = [];
  const scale = 1.0 / (controlPoints + order - 1);
  let i;
  for (i = 0; i < controlPoints + order; i++) {
    ret.push(i * scale);
  }
  return ret;
};
/**
 * Generates a knot vector with uniform knots, to be
 * passed to the {@link BSplineCurve} or {@link BSplineSurface} constructor,
 * except that with the knot vector the curve will start and end at the first and last control points and will
 * be tangent to the line between the first and second control points
 * and to the line between the next-to-last and last control points.
 * @param {number|Object} controlPoints Number of control points the curve will have,
 * or an array of control points.
 * @param {number} [degree] Degree of the B-spline
 * curve. For example, 3 means a degree-3 (cubic) curve.
 * If null, undefined, or omitted, the default is 3.
 * @returns {Array<number>} A clamped uniform knot vector.
 * The first knot will be 0 and the last knot will be 1.
 */
BSplineCurve.clampedKnots = function(controlPoints, degree) {
  if(typeof controlPoints === "object")
    controlPoints = controlPoints.length;
  const deg = typeof degree === "undefined" || degree === null ? 3 : degree;
  if(controlPoints < deg + 1)
    throw new Error("too few control points for degree " + deg + " curve");
  const order = deg + 1;
  const extras = controlPoints - order;
  const ret = [];
  let i;
  for (i = 0; i < order; i++) {
    ret.push(0);
  }

  for (i = 0; i < extras; i++) {
    ret.push((i + 1) * 1.0 / (extras + 1));
  }

  for (i = 0; i < order; i++) {
    ret.push(1);
  }
  return ret;
};

/**
 * Evaluates the surface function based on a point
 * in a B-spline surface.
 * @param {number} u U coordinate of the surface to evaluate.
 * @param {number} v V coordinate of the surface to evaluate.
 * @returns {Array<number>} An array of the result of
 * the evaluation. It will have as many elements as a control point (or one fewer
 * if DIVIDE_BIT is set), as specified in the constructor.
 */
BSplineSurface.prototype.evaluate = function(u, v) {
  const elementsPerPoint = this.controlPoints[0][0].length;
  const bu = this.bufferU;
  const bv = this.bufferV;
  let tt;
  let uu;
  let i;
  let value;
  BSplineCurve._getFactors(this.knotsU, u, this.degreeU, this.ucplen,
    this.bufferU);
  BSplineCurve._getFactors(this.knotsV, v, this.degreeV, this.vcplen,
    this.bufferV);
  let output = [];
  for(i = 0; i < elementsPerPoint; i++) {
    value = 0;
    for(tt = 0; tt < this.ucplen; tt++) {
      for(uu = 0; uu < this.vcplen; uu++) {
        value += this.controlPoints[uu][tt][i] * bu[tt] * bv[uu];
      }
    }
    output[i] = value;
  }
  if((this.bits & BSplineCurve.DIVIDE_BIT) !== 0) {
    output = BSplineCurve._fromHomogen(output);
  }
  return output;
};
/**
 * Gets a reference to the array of control point arrays used
 * in this surface object.
 * @returns {Array<Array<number>>} An object described in the constructor to {@link BSplineCurve}.
 */
BSplineSurface.prototype.getControlPoints = function() {
  return this.controlPoints;
};
/**
 * Gets a reference to the array of knot vectors used
 * in this curve object.
 * @returns {Array<Array<number>>} An object described in the constructor to {@link BSplineSurface}.
 */
BSplineSurface.prototype.getKnots = function() {
  return this.knots;
};

/**
 * Finds the [tangent vector]{@link Surface} at the
 * given point on the surface.
 * @param {number} u U coordinate of the surface to evaluate.
 * @param {number} v V coordinate of the surface to evaluate.
 * @returns {Array<number>} An array giving the tangent vector.
 * It will have as many elements as a control point (or one fewer
 * if DIVIDE_BIT is set), as specified in the constructor.
 */
BSplineSurface.prototype.tangent = function(u, v) {
  const elementsPerPoint = this.controlPoints[0][0].length;
  const bv = this.bufferV;
  let tt;
  let uu;
  let i;
  let value;
  BSplineCurve._getFactors(this.knotsU, u, this.degreeU - 1, this.ucplen,
    this.bufferU);
  BSplineCurve._getFactors(this.knotsV, v, this.degreeV, this.vcplen,
    this.bufferV);
  let ret = [];
  const coeffs = [];
  for(i = 0; i < this.ucplen; i++) {
    coeffs[i] = 0;
  }
  let j;
  for (j = 0; j < this.ucplen - 1; j++) {
    const pix = this.degreeU * this.bufferU[j + 1] / (this.knotsU[j + this.degreeU + 1] - this.knotsU[j + 1]);
    coeffs[j + 1] += pix;
    coeffs[j] -= pix;
  }
  for(i = 0; i < elementsPerPoint; i++) {
    value = 0;
    for(tt = 0; tt < this.ucplen; tt++) {
      for(uu = 0; uu < this.vcplen; uu++) {
        value += this.controlPoints[uu][tt][i] * coeffs[tt] * bv[uu];
      }
    }
    ret[i] = value;
  }
  if((this.bits & BSplineCurve.DIVIDE_BIT) !== 0) {
    ret = BSplineCurve._fromHomogen(ret);
  }
  return ret;
};
/**
 * Finds the [bitangent vector]{@link Surface} at the
 * given point on the surface.
 * @param {number} u U coordinate of the surface to evaluate.
 * @param {number} v V coordinate of the surface to evaluate.
 * @returns {Array<number>} An array giving the bitangent vector.
 * It will have as many elements as a control point (or one fewer
 * if DIVIDE_BIT is set), as specified in the constructor.
 */
BSplineSurface.prototype.bitangent = function(u, v) {
  const elementsPerPoint = this.controlPoints[0][0].length;
  const bu = this.bufferU;
  let tt;
  let uu;
  let i;
  let value;
  BSplineCurve._getFactors(this.knotsU, u, this.degreeU, this.ucplen,
    this.bufferU);
  BSplineCurve._getFactors(this.knotsV, v, this.degreeV - 1, this.vcplen,
    this.bufferV);
  let ret = [];
  const coeffs = [];
  for(i = 0; i < this.vcplen; i++) {
    coeffs[i] = 0;
  }
  let j;
  for (j = 0; j < this.vcplen - 1; j++) {
    const pix = this.degreeV * this.bufferV[j + 1] / (this.knotsV[j + this.degreeV + 1] - this.knotsV[j + 1]);
    coeffs[j + 1] += pix;
    coeffs[j] -= pix;
  }
  for(i = 0; i < elementsPerPoint; i++) {
    value = 0;
    for(tt = 0; tt < this.ucplen; tt++) {
      for(uu = 0; uu < this.vcplen; uu++) {
        value += this.controlPoints[uu][tt][i] * bu[tt] * coeffs[uu];
      }
    }
    ret[i] = value;
  }
  if((this.bits & BSplineCurve.DIVIDE_BIT) !== 0) {
    ret = BSplineCurve._fromHomogen(ret);
  }
  return ret;
};

/**
 * Creates a B-spline surface from the control points of a B&eacute;zier surface.
 * @param {Array<Array<Array<number>>>} controlPoints An array of control point
 * arrays, which in turn contain a number of control points. Each
 * control point is an array with the same length as the other control points.
 * It is assumed that:<ul>
 * <li>The length of this parameter minus 1 represents the degree of the B&eacute;zier
 * surface along the V axis. For example, a degree-3 (cubic) surface along the V axis
 * contains 4 control points, one in each control point array. A degree of 1 on
 * both the U and V axes results in a flat surface.
 * <li>The length of the first control point array minus 1 represents the degree of the B&eacute;zier
 * surface along the U axis.
 * <li>The number of elements in the first control point represents the number of elements in all the control points.
 * </ul>
 * @param {number} [bits] Bits as specified in the {@link BSplineSurface} constructor.
 * @returns {BSplineSurface} Return value.
 */
BSplineSurface.fromBezierSurface = function(controlPoints, bits) {
  return BSplineSurface.clamped(controlPoints, controlPoints[0].length - 1,
    controlPoints.length - 1, bits);
};/*
 Any copyright to this file is released to the Public Domain.
 http://creativecommons.org/publicdomain/zero/1.0/
 If you like this, you should donate
 to Peter O. (original author of
 the Public Domain HTML 3D Library) at:
 http://peteroupc.github.io/
*/

/**
 * A [curve evaluator object]{@link Curve} for a curve
 * made up of one or more individual curves.<p>
 * The combined curve's U coordinates range from 0 to N,
 * where N is the number of curves. In this way, the integer
 * part of a U coordinate indicates the curve the coordinate
 * refers to. For example, if there are four curves, coordinates
 * from 0, but less than 1, belong to the first curve, and coordinates
 * from 1, but less than 2, belong to the second curve. The U
 * coordinate equal to N refers to the end of the last curve in
 * the piecewise curve.
 * @constructor
 * @extends Curve
 * @param {Array<Object>} curves An array of curve evaluator
 * objects, such as an instance of {@link Curve} or one
 * of its subclasses. The combined curve should be continuous
 * in that the curves that make it up should connect at their
 * end points (except the curve need not be closed).
 * @example
 * // Generates a piecewise polygon curve from an array of
 * // vectors (arrays with the same number of elements) that
 * // specify the points that make up the polygon.
 * function polygonCurve(points) {
 * var curves=[]
 * for(var i=0;&lt;points.length;i++) {
 * var cp=points[i]
 * var np=(i==points.length-1) ? points[0] : points[i+1]
 * curves.push(BSplineCurve.fromBezierCurve([cp,np]))
 * }
 * return new PiecewiseCurve(curves)
 * }
 */
const PiecewiseCurve = function(curves) {
  this.curves = [];
  this.curvesEp = [];
  this.runningCurveStart = [];
  let i;
  for (i = 0; i < curves.length; i++) {
    this.curves[i] = curves[i] instanceof Curve ?
      curves[i] : new Curve(curves[i]);
    this.curvesEp[i] = this.curves[i].endPoints();
    this.runningCurveStart[i] = i === 0 ? 0 : Number.NaN;
  }
};
PiecewiseCurve.prototype = Object.create(Curve.prototype);
PiecewiseCurve.prototype.constructor = PiecewiseCurve;
/**
 * Returns the starting and ending U coordinates of this curve.
 * @returns A two-element array. The first element is the starting coordinate of
 * the curve, and the second is its ending coordinate.
 * Returns <code>[0, n]</code>, where <code>n</code> is the number
 * of curves that make up this piecewise curve.
 */
PiecewiseCurve.prototype.endPoints = function() {
  return [0, this.curves.length];
};
/**
 * Gets a reference to the curves that make up this piecewise curve.
 * @returns {Array<Curve>} The curves that make up this piecewise curve.
 */
PiecewiseCurve.prototype.getCurves = function() {
  return this.curves;
};
/** @ignore */
PiecewiseCurve.prototype._getRunningCurveStart = function(uc) {
  if(uc === 0) {
    return 0;
  }
  if(isNaN(this.runningCurveStart[uc])) {
    let i;
    for (i = 1; i <= uc; i++) {
      if(isNaN(this.runningCurveStart[i])) {
        this.runningCurveStart[i] = this.runningCurveStart[i - 1] +
        this.curves[i - 1].arcLength(this.curvesEp[i - 1][1]);
      }
    }
  }
  return this.runningCurveStart[uc];
};
/** @ignore */
PiecewiseCurve.prototype._getCurveAndPoint = function(u) {
  let uc;
  let ut;
  if(u < 0) {
    uc = 0;
    ut = 0;
  } else if(u >= this.curves.length) {
    uc = this.curves.length - 1;
    ut = 1;
  } else {
    uc = Math.floor(u);
    ut = u - uc;
  }
  const ep = this.curvesEp[uc];
  return [uc, ep[0] + (ep[1] - ep[0]) * ut];
};
/**
 * Finds an approximate arc length (distance) between the start of this
 * curve and the point at the given U coordinate of this curve.
 * @param {number} u U coordinate of a point on the curve.
 * @returns {number} The approximate arc length of this curve at the given U coordinate.
 */
PiecewiseCurve.prototype.arcLength = function(u) {
  if(u <= 0) {
    return 0;
  }
  const cp = this._getCurveAndPoint(u);
  return this._getRunningCurveStart(cp[0]) +
    this.curves[cp[0]].arcLength(cp[1]);
};
/**
 * Finds the position of this curve at the given U coordinate.
 * @param {number} u U coordinate of a point on the curve.
 * @returns {Array<number>} An array describing a position. It should have at least as many
 * elements as the number of dimensions of the underlying curve.
 */
PiecewiseCurve.prototype.evaluate = function(u) {
  const cp = this._getCurveAndPoint(u);
  return this.curves[cp[0]].evaluate(cp[1]);
};
/**
 * Finds an approximate velocity vector at the given U coordinate of this curve.
 * @param {number} u U coordinate of a point on the curve.
 * @returns {Array<number>} An array describing a velocity vector. It should have at least as many
 * elements as the number of dimensions of the underlying curve.
 */
PiecewiseCurve.prototype.velocity = function(u) {
  const cp = this._getCurveAndPoint(u);
  return this.curves[cp[0]].velocity(cp[1]);
};

/**
 * Creates a piecewise curve made up of B-spline curves from the control points of a
 * cubic TCB spline (tension/continuity/bias spline, also known as Kochanek&ndash;Bartels spline).
 * (If tension, continuity, and bias are all 0, the result is a cubic Catmull&ndash;Rom spline
 * in uniform parameterization.)
 * @param {Array<Array<number>>} spline An array of control points,
 * each with the same number of values, that the curve will pass through.
 * Throws an error if there are fewer than two control points.
 * @param {number} [tension] A parameter that adjusts the length of the starting and ending
 * tangents of each curve segment. Ranges from -1 for double-length tangents to 1
 * for zero-length tangents. A value of 1 results in straight line segments. Default is 0.
 * @param {number} [continuity] A parameter that adjusts the direction of the starting and ending
 * tangents of each curve segment. Ranges from -1 to 1, where values closer to -1 or closer to 1
 * result in tangents that are closer to perpendicular.
 * A value of -1 results in straight line segments. Default is 0.
 * @param {number} [bias] A parameter that adjusts the influence of the starting and ending
 * tangents of each curve segment. The greater this number, the greater the
 * ending tangents influence the direction of the next curve segment in comparison to the starting tangents. Ranges from -1 to 1. Default is 0.
 * @param {number} [closed] If true, connects the last control point of the curve with the first.
 * Default is false.
 * @param {number} [rigidEnds] If true, the start and end of the piecewise curve
 * will, by default, more rigidly follow the direction to the next or previous control point, respectively.
 * This makes the curve compatible with GDI+ cardinal splines with 0
 * continuity, 0 bias, and tension equal to <code>-((T*2)-1)</code>, where
 * T is the GDI+ cardinal spline tension parameter. Default is false.
 * @returns {PiecewiseCurve} A piecewise curve made up of cubic B-spline curves describing the
 * same path as the TCB spline.
 */
PiecewiseCurve.fromTCBSpline = function(spline, tension, continuity, bias, closed, rigidEnds) {
  const elements = spline[0].length;
  if(spline.length < 2)throw new Error();
  const tensionValue = typeof tension === "undefined" || tension === null ? 0 : tension;
  const continValue = typeof continuity === "undefined" || continuity === null ? 0 : continuity;
  const biasValue = typeof bias === "undefined" || bias === null ? 0 : bias;
  const closedValue = typeof closed === "undefined" || closed === null ? false : closed;
  const rigidEndsValue = typeof rigidEnds === "undefined" || rigidEnds === null ? false : rigidEnds;
  const third = 1 / 3;
  const ret = [];
  const lastVecIndex = spline.length - 1;
  const numSplines = closedValue ? lastVecIndex + 1 : lastVecIndex;
  let j;
  for (j = 0; j < numSplines; j++) {
    const retcurve = [[], [], [], []];
    const pt0 = j > lastVecIndex ? spline[0] : spline[j];
    let pt1;
    let ptPrev;
    let ptNext;
    if(closedValue) {
      if(j === 0) {
        ptPrev = spline[lastVecIndex];
        pt1 = spline[j + 1];
        ptNext = spline.length === 2 ? spline[0] : spline[j + 2];
      } else if(j === lastVecIndex - 1) {
        ptPrev = spline[j - 1];
        pt1 = spline[j + 1];
        ptNext = spline[0];
      } else if(j === lastVecIndex) {
        ptPrev = spline[j - 1];
        pt1 = spline[0];
        ptNext = spline[1];
      } else {
        ptPrev = spline[j - 1];
        pt1 = spline[j + 1];
        ptNext = spline[j + 2];
      }
    } else {
      pt1 = spline[j + 1];
      ptPrev = j === 0 ? null : spline[j - 1];
      ptNext = j >= lastVecIndex ? null : spline[j + 2];
    }
    const mc = 1 - continValue;
    const pc = 1 + continValue;
    const mb = 1 - biasValue;
    const pb = 1 + biasValue;
    const mt = 1 - tensionValue;
    let i;
    for (i = 0; i < elements; i++) {
      const p1 = pt0[i];
      const p4 = pt1[i];
      const diffCurr = pt1[i] - pt0[i];
      const diffPrev = typeof ptPrev === "undefined" || ptPrev === null ? 0 : pt0[i] - ptPrev[i];
      const diffNext = typeof ptNext === "undefined" || ptNext === null ? 0 : ptNext[i] - pt1[i];
      let tgStart = 0.5 * mt * pc * pb * diffPrev + 0.5 * mt * mc * mb * diffCurr;
      let tgEnd = 0.5 * mt * mc * pb * diffCurr + 0.5 * mt * pc * mb * diffNext;
      if(!rigidEndsValue) {
        if(typeof ptPrev === "undefined" || ptPrev === null)tgStart = 0;
        if(typeof ptNext === "undefined" || ptNext === null)tgEnd = 0;
      }
      const p2 = p1 + tgStart * third;
      const p3 = p4 - tgEnd * third;
      retcurve[0][i] = p1;
      retcurve[1][i] = p2;
      retcurve[2][i] = p3;
      retcurve[3][i] = p4;
    }
    ret.push(BSplineCurve.clamped(retcurve, 3));
  }
  return new PiecewiseCurve(ret);
};

/**
 * Creates a piecewise curve made up of B-spline curves from the control points of a
 * Hermite spline. A Hermite spline is a collection of points that the curve will go through,
 * together with the velocity vectors (derivatives or instantaneous rates of change) at
 * those points.<p>
 * Hermite splines are useful for representing an approximate polynomial form
 * of a function or curve whose derivative is known; however, Hermite splines are not
 * guaranteed to preserve the increasing or decreasing nature of the function or curve.
 * @param {Array<Array<number>>} spline An array of control points,
 * each with the same number of values, that describe a Hermite spline.
 * Each pair of control points takes up two elements of the array and consists
 * of the coordinates of that point followed by the velocity vector (derivative) at that point.
 * The array must have an even number of control points and at least four control points.
 * @returns {PiecewiseCurve} A piecewise curve made up of cubic B-spline curves describing the
 * same path as the Hermite spline.
 */
PiecewiseCurve.fromHermiteSpline = function(spline) {
  const elements = spline[0].length;
  if(spline.length < 4 || spline.length % 2 !== 0)throw new Error();
  const third = 1 / 3;
  const ret = [];
  let j;
  for (j = 0; j < spline.length - 2; j += 2) {
    const retcurve = [[], [], [], []];
    const pt0 = spline[j];
    const tg0 = spline[j + 1];
    const pt1 = spline[j + 2];
    const tg1 = spline[j + 3];
    let i;
    for (i = 0; i < elements; i++) {
      const p1 = pt0[i];
      const p4 = pt1[i];
      const p2 = p1 + tg0[i] * third;
      const p3 = p4 - tg1[i] * third;
      retcurve[0][i] = p1;
      retcurve[1][i] = p2;
      retcurve[2][i] = p3;
      retcurve[3][i] = p4;
    }
    ret.push(BSplineCurve.clamped(retcurve, 3));
  }
  return new PiecewiseCurve(ret);
};

/**
 * Creates a piecewise curve made up of B-spline curves from the control points of a
 * cubic Catmull&ndash;Rom spline. A Catmull&ndash;Rom spline is defined by
 * a collection of control points that the spline
 * will go through, and the shape of each curve segment is also determined by the positions
 * of neighboring points on the spline.
 * @param {Array<Array<number>>} spline An array of control points,
 * each with the same number of values, that the curve will pass through.
 * Throws an error if there are fewer than two control points.
 * @param {number} [param] A value that describes the curve's parameterization.
 * Ranges from 0 to 1. A value of 0 indicates a uniform parameterization, 0.5 indicates a
 * centripetal parameterization, and 1 indicates a chordal parameterization.
 * Default is 0.5.
 * @param {number} [closed] If true, connects the last control point of the curve with the first.
 * Default is false.
 * @returns {PiecewiseCurve} A piecewise curve made up of cubic B-spline curves describing the same path as the Catmull&ndash;Rom spline.
 */
PiecewiseCurve.fromCatmullRomSpline = function(spline, param, closed) {
  const elements = spline[0].length;
  if(spline.length < 2)throw new Error();
  const paramValue = typeof param === "undefined" || param === null ? 0.5 : param;
  const closedValue = typeof closed === "undefined" || closed === null ? false : closed;
  const ret = [];
  const lastVecIndex = spline.length - 1;
  const numSplines = closedValue ? lastVecIndex + 1 : lastVecIndex;
  let j;
  for (j = 0; j < numSplines; j++) {
    const retcurve = [[], [], [], []];
    let pt0 = j === 0 ? spline[0] : spline[j - 1];
    const pt1 = spline[j];
    let pt2 = spline[j + 1];
    let pt3 = j + 2 > lastVecIndex ? spline[lastVecIndex] : spline[j + 2];
    let newpt;
    if(!closedValue && j + 2 > lastVecIndex) {
      newpt = [];
      let i;
      for (i = 0; i < elements; i++) {
        newpt[i] = pt0[i] + (pt1[i] - pt2[i]);
      }
      pt3 = newpt;
    }
    if(!closedValue && j === 0) {
      newpt = [];
      let i;
      for (i = 0; i < elements; i++) {
        newpt[i] = pt3[i] + (pt2[i] - pt1[i]);
      }
      pt0 = newpt;
    }
    if(closedValue) {
      if(j === 0) {
        pt0 = spline[lastVecIndex];
        pt3 = spline.length === 2 ? spline[0] : spline[j + 2];
      } else if(j === lastVecIndex - 1) {
        pt3 = spline[0];
      } else if(j === lastVecIndex) {
        pt2 = spline[0];
        pt3 = spline[1];
      }
    }
    let p1len = 0;
    let p2len = 0;
    let p3len = 0;
    let i;
    for (i = 0; i < elements; i++) {
      let dx = pt0[i] - pt1[i];
      p1len += dx * dx;
      dx = pt1[i] - pt2[i];
      p2len += dx * dx;
      dx = pt2[i] - pt3[i];
      p3len += dx * dx;
    }
    p1len = Math.sqrt(p1len);
    p2len = Math.sqrt(p2len);
    p3len = Math.sqrt(p3len);

    for (i = 0; i < elements; i++) {
      const p1 = pt0[i];
      const p2 = pt1[i];
      const p3 = pt2[i];
      const p4 = pt3[i];
      let t1 = 1;
      let t2 = 1;
      let t3 = 1;
      if(paramValue !== 0) {
        t1 = Math.pow(p1len, paramValue);
        t2 = Math.pow(p2len, paramValue);
        t3 = Math.pow(p3len, paramValue);
      }
      let den = 3 * t1 * (t1 + t2);
      let np2 = p2;
      let np3 = p3;
      den = 3 * t1 * (t1 + t2);
      if(den !== 0) {
        np2 = (t1 * t1 * p3 - t2 * t2 * p1 + p2 * (2 * t1 * t1 + 3 * t1 * t2 + t2 * t2)) / den;
      }
      den = 3 * t3 * (t3 + t2);
      if(den !== 0) {
        np3 = (t3 * t3 * p2 - t2 * t2 * p4 + p3 * (2 * t3 * t3 + 3 * t3 * t2 + t2 * t2)) / den;
      }
      retcurve[0][i] = p2;
      retcurve[1][i] = np2;
      retcurve[2][i] = np3;
      retcurve[3][i] = p3;
    }
    ret.push(BSplineCurve.clamped(retcurve, 3));
  }
  return new PiecewiseCurve(ret);
};
/**
 * Creates a piecewise curve that describes an arc running along an axis-aligned
 * ellipse, or a shape based on that arc and ellipse, given the ellipse's center
 * and dimensions, start angle, and sweep angle.
 * @param {number} x X coordinate of the ellipse's center.
 * @param {number} y Y coordinate of the ellipse's center.
 * @param {number} w Width of the ellipse's bounding box.
 * @param {number} h Height of the ellipse's bounding box.
 * @param {number} start Starting angle of the arc, in degrees.
 * 0 means the positive X axis, 90 means the positive Y axis,
 * 180 means the negative X axis, and 270 means the negative Y axis.
 * @param {number} sweep Length of the arc in degrees. Can be positive or negative. Can be greater than 360 or
 * less than -360, in which case the arc will wrap around the ellipse multiple times. Assuming
 * the coordinate system's X axis points right and the Y axis down, positive angles run
 * clockwise and negative angles counterclockwise.
 * @returns {PiecewiseCurve} The resulting piecewise curve.
 */
PiecewiseCurve.fromEllipseArc = function(x, y, radiusX, radiusY, start, sweep) {
  if(typeof start === "undefined" || start === null)start = 0;
  if(typeof sweep === "undefined" || sweep === null)sweep = 0;
  sweep = sweep * Math.PI / 180;
  let abssweep = sweep;
  const sweepdir = sweep < 0 ? -1 : 1;
  const sweepSegments = abssweep > Math.PI * 0.5 &&
    abssweep <= Math.PI * 2 ? abssweep * 0.25 : Math.PI * 0.5;
  let arcstart = start;
  const curves = [];
  let sa0;
  let sa1;
  while(abssweep > 0) {
    const arcangle = Math.min(sweepSegments, abssweep);
    const arcend = arcstart + arcangle * sweepdir;
    const ca0 = Math.cos(arcstart);
    sa0 = arcstart >= 0 && arcstart < 6.283185307179586 ? arcstart <= 3.141592653589793 ? Math.sqrt(1.0 - ca0 * ca0) : -Math.sqrt(1.0 - ca0 * ca0) : Math.sin(arcstart);
    const ca1 = Math.cos(arcend);
    sa1 = arcend >= 0 && arcend < 6.283185307179586 ? arcend <= 3.141592653589793 ? Math.sqrt(1.0 - ca1 * ca1) : -Math.sqrt(1.0 - ca1 * ca1) : Math.sin(arcend);
    abssweep -= arcangle;
    arcstart += arcangle * sweepdir;
    const p0 = [ca0, sa0, 1];
    const p2 = [ca1, sa1, 1];
    const halfAngle = (Math.PI - arcangle) * 0.5;
    const weight = Math.sin(halfAngle);
    const dx = p2[0] - p0[0];
    const dy = p2[1] - p0[1];
    const m0 = p0[0] + dx * 0.5;
    const m1 = p0[1] + dy * 0.5;
    const dcx = m0;
    const dcy = m1;
    const mdist = Math.sqrt(dcx * dcx + dcy * dcy);
    const clen = 1.0 / mdist;
    const p1dist = 1.0 / weight;
    const p1 = [
      dcx * clen * p1dist,
      dcy * clen * p1dist,
      weight
    ];
    p0[0] = x + p0[0] * radiusX;
    p0[1] = y + p0[1] * radiusY;
    p2[0] = x + p2[0] * radiusX;
    p2[1] = y + p2[1] * radiusY;
    p1[0] = (x + p1[0] * radiusX) * weight;
    p1[1] = (y + p1[1] * radiusY) * weight;
    curves.push(BSplineCurve.fromBezierCurve(
      [p0, p1, p2], BSplineCurve.DIVIDE_BIT));
  }
  return new PiecewiseCurve(curves);
};/*
 Any copyright to this file is released to the Public Domain.
 http://creativecommons.org/publicdomain/zero/1.0/
 If you like this, you should donate
 to Peter O. (original author of
 the Public Domain HTML 3D Library) at:
 http://peteroupc.github.io/
*/

/** @ignore
 * @private
 * @constructor */
const LinkedListNode = function(item) {
  this.data = item;
  this.prev = null;
  this.next = null;
};

/** @ignore
 * @constructor */
const LinkedList = function() {
  this.root = null;
  this._last = null;
  this.size = function() {
    let k = this.root;
    let ret = 0;
    while(k) {
      ret++;
      k = k.next;
    }
    return ret;
  };
  this.first = function() {
    return this.root;
  };
  this.last = function() {
    return this._last;
  };
  this.front = function() {
    return this.root ? this.root.data : null;
  };
  this.back = function() {
    return this._last ? this._last.data : null;
  };
  this.clear = function() {
    this.root = this._last = null;
  };
  this.spliceToBegin = function(list) {
    if(list.root) {
      this.root.prev = list._last;
      list._last.next = this.root;
      this.root = list.root;
      list.clear();
    }
  };
  this.spliceToEnd = function(list) {
    if(list.root) {
      this._last.next = list.root;
      list.root.prev = this._last;
      this._last = list._last;
      list.clear();
    }
  };
  this.spliceOneToEnd = function(list, listNode) {
    list.erase(listNode);
    return this.push(listNode.data);
  };
  this.erase = function(node) {
    if(!node)return this;
    if(node === this.root) {
      this.root = node.next;
    }
    if(node === this._last) {
      this._last = node.prev;
    }
    if(node.prev)
      node.prev.next = node.next;
    if(node.next)
      node.next.prev = node.prev;
    return this;
  };
  this.insertAfter = function(item, node) {
    const newNode = new LinkedListNode(item);
    if(node === this._last)
      this._last = newNode;
    const oldNext = node.next;
    node.next = newNode;
    newNode.prev = node;
    newNode.next = oldNext;
    if(oldNext) {
      oldNext.prev = newNode;
    }
    return newNode;
  };
  this.push = function(item) {
    if(!this.root) {
      this.root = this._last = new LinkedListNode(item);
    } else {
      const node = new LinkedListNode(item);
      this._last.next = node;
      node.prev = this._last;
      this._last = node;
    }
    return this;
  };
  this.reverse = function() {
    let s = this.root;
    const e = this._last;
    if(!s)return;
    const oldlast = e;
    const oldroot = s;
    while(s) {
      const n = s.next;
      const p = s.prev;
      s.prev = n;
      s.next = p;
      s = n;
    }
    this.root = oldlast;
    this._last = oldroot;
    return this;
  };
  this.unshift = function(item) {
    if(!this.root) {
      this.root = this._last = new LinkedListNode(item);
    } else {
      const node = new LinkedListNode(item);
      this.root.prev = node;
      node.next = this.root;
      this.root = node;
    }
    return this;
  };
  this.pop = function() {
    if(this._last) {
      if(this._last.prev)
        this._last.prev.next = null;
      this._last = this._last.prev;
    }
    return this;
  };
  this.shift = function() {
    if(this.root) {
      if(this.root.next)
        this.root.next.prev = null;
      this.root = this.root.next;
    }
    return this;
  };
};

// --------------------------------------------------

/** @ignore
 * @constructor */
function LineCurve(x1, y1, x2, y2) {
  this.x1 = x1;
  this.x2 = x2;
  this.y1 = y1;
  this.y2 = y2;
}
LineCurve.prototype = Object.create(Curve.prototype);
LineCurve.prototype.constructor = LineCurve;
/** @ignore */
LineCurve.prototype.evaluate = function(u) {
  return [
    this.x1 + (this.x2 - this.x1) * u,
    this.y1 + (this.y2 - this.y1) * u, 0
  ];
};
/** @ignore */
LineCurve.prototype.velocity = function() {
  return [
    this.x2 - this.x1,
    this.y2 - this.y1, 0
  ];
};
/** @ignore */
LineCurve.prototype.arcLength = function(u) {
  const x = this.x1 + (this.x2 - this.x1) * u;
  const y = this.y1 + (this.y2 - this.y1) * u;
  const dx = x - this.x1;
  const dy = y - this.y1;
  let ret = Math.sqrt(dx * dx + dy * dy);
  if(u < 0)ret = -ret;
  return ret;
};

/** @ignore
 * @constructor
 */
function ArcCurve(x1, y1, x2, y2, rx, ry, rot, cx, cy, theta, delta) {
  this.x1 = x1;
  this.x2 = x2;
  this.y1 = y1;
  this.y2 = y2;
  this.rx = rx;
  this.ry = ry;
  const cr = Math.cos(rot);
  const sr = rot >= 0 && rot < 6.283185307179586 ? rot <= 3.141592653589793 ? Math.sqrt(1.0 - cr * cr) : -Math.sqrt(1.0 - cr * cr) : Math.sin(rot);
  this.cr = cr;
  this.sr = sr;
  this.cx = cx;
  this.cy = cy;
  this.theta = theta;
  this.delta = delta;
}
ArcCurve.prototype = Object.create(Curve.prototype);
ArcCurve.prototype.constructor = ArcCurve;
/** @ignore */
ArcCurve.prototype.evaluate = function(t) {
  if(t === 0)return [this.x1, this.y1, 0];
  if(t === 1)return [this.x2, this.y2, 0];
  const angle = this.theta + this.delta * t;
  const ca = Math.cos(angle);
  const sa = angle >= 0 && angle < 6.283185307179586 ? angle <= 3.141592653589793 ? Math.sqrt(1.0 - ca * ca) : -Math.sqrt(1.0 - ca * ca) : Math.sin(angle);
  return [
    this.cr * ca * this.rx - this.sr * sa * this.rx + this.cx,
    this.sr * ca * this.rx + this.cr * sa * this.ry + this.cy, 0];
};
/** @ignore */
ArcCurve.prototype.velocity = function(t) {
  const angle = this.theta + this.delta * t;
  const ca = Math.cos(angle);
  const sa = angle >= 0 && angle < 6.283185307179586 ? angle <= 3.141592653589793 ? Math.sqrt(1.0 - ca * ca) : -Math.sqrt(1.0 - ca * ca) : Math.sin(angle);
  const caDeriv = -sa * this.delta;
  const saDeriv = ca * this.delta;
  return [
    this.cr * caDeriv * this.rx - this.sr * saDeriv * this.rx,
    this.sr * caDeriv * this.rx + this.cr * saDeriv * this.ry, 0];
};

// --------------------------------------------------
/**
 * Represents a two-dimensional path.
 * A path is a collection of two-dimensional line segments and/or curves. Many paths describe
 * closed figures or connected sequences of lines and curves. Specifically, a path is made up
 * of straight line segments, elliptical arcs, quadratic B&eacute;zier curves,
 * cubic B&eacute;zier curves, or any combination of these, and
 * the path can be discontinuous and/or contain closed parts.
 * <h4>Creating Paths</h4>
 * <p>
 * There are two ways to create paths: using an SVG path string (see {@link GraphicsPath.fromString}), or by calling methods that add its segments.
 * <p>A `GraphicsPath` object stores a current position and a starting position, and many methods don't have you specify a starting position, to cover the common case of drawing a series of connected lines and curves.
 * _.moveTo(x, y)_ - Moves the starting position and current position.
 * _.lineTo(x, y)_ - Adds a line segment from the current position to a new ending position.
 * _.closePath()_ - Closes the path by drawing a line to the starting point, if needed.
 * <h4>Path Segments</h4>
 * Each path can include a number of line segments, B&eacute;zier curves, and elliptical arcs.
 * Line segments are relatively easy to understand. The other two kinds of segments
 * deserve some discussion.
 * A _B&eacute;zier curve_ is a parametric curve based on a polynomial formula. In this kind of
 * curve the endpoints are defined as they are, but the other points define
 * the shape of the curve and generally don't cross the curve.
 * A quadratic B&eacute;zier curve uses 3 points. A cubic B&eacute;zier
 * curve uses 4 points.
 * An _elliptical arc_ is a curve which forms part of an ellipse. There are several ways to
 * parameterize an elliptical arc, as seen in the _.arc()_, _.arcTo()_, and _.arcSvgTo()_ methods
 * of the `GraphicsPath` class.
 * @constructor
 */
const GraphicsPath = function() {
  this.segments = [];
  this.incomplete = false;
  this.startPos = [0, 0];
  this.endPos = [0, 0];
};
  /** @ignore */
const Triangulate = {};
/** @ignore */
GraphicsPath.CLOSE = 0;
/** @ignore */
GraphicsPath.LINE = 1;
/** @ignore */
GraphicsPath.QUAD = 2;
/** @ignore */
GraphicsPath.CUBIC = 3;
/** @ignore */
GraphicsPath.ARC = 4;
/**
 * Returns whether the curve path is incomplete
 * because of an error in parsing the curve string.
 * This flag will be reset if a moveTo command,
 * closePath command, or another path segment
 * is added to the path.
 * @returns {boolean} Return value.
 */
GraphicsPath.prototype.isIncomplete = function() {
  return this.incomplete;
};
/** @ignore */
GraphicsPath._startPoint = function(a) {
  if(a[0] === GraphicsPath.CLOSE) {
    return [0, 0];
  } else {
    return [a[1], a[2]];
  }
};
/** @ignore */
GraphicsPath._endPoint = function(a) {
  if(a[0] === GraphicsPath.CLOSE) {
    return [0, 0];
  } else if(a[0] === GraphicsPath.ARC) {
    return [a[8], a[9]];
  } else {
    return [a[a.length - 2], a[a.length - 1]];
  }
};
/** @ignore */
GraphicsPath._point = function(seg, t) {
  let a;
  let b;
  let x;
  let y;
  if(seg[0] === GraphicsPath.CLOSE) {
    return [0, 0];
  } else if(seg[0] === GraphicsPath.LINE) {
    return [
      seg[1] + (seg[3] - seg[1]) * t,
      seg[2] + (seg[4] - seg[2]) * t
    ];
  } else if(seg[0] === GraphicsPath.QUAD) {
    const mt = 1 - t;
    const mtsq = mt * mt;
    const mt2 = mt + mt;
    a = seg[1] * mtsq;
    b = seg[3] * mt2;
    x = a + t * (b + t * seg[5]);
    a = seg[2] * mtsq;
    b = seg[4] * mt2;
    y = a + t * (b + t * seg[6]);
    return [x, y];
  } else if(seg[0] === GraphicsPath.CUBIC) {
    a = (seg[3] - seg[1]) * 3;
    b = (seg[5] - seg[3]) * 3 - a;
    let c = seg[7] - a - b - seg[1];
    x = seg[1] + t * (a + t * (b + t * c));
    a = (seg[4] - seg[2]) * 3;
    b = (seg[6] - seg[4]) * 3 - a;
    c = seg[8] - a - b - seg[2];
    y = seg[2] + t * (a + t * (b + t * c));
    return [x, y];
  } else if(seg[0] === GraphicsPath.ARC) {
    if(t === 0)return [seg[1], seg[2]];
    if(t === 1)return [seg[8], seg[9]];
    const rx = seg[3];
    const ry = seg[4];
    const cx = seg[10];
    const cy = seg[11];
    const theta = seg[12];
    const delta = seg[13] - seg[12];
    const rot = seg[5];
    const angle = theta + delta * t;
    const cr = Math.cos(rot);
    const sr = rot >= 0 && rot < 6.283185307179586 ? rot <= 3.141592653589793 ? Math.sqrt(1.0 - cr * cr) : -Math.sqrt(1.0 - cr * cr) : Math.sin(rot);
    const ca = Math.cos(angle);
    const sa = angle >= 0 && angle < 6.283185307179586 ? angle <= 3.141592653589793 ? Math.sqrt(1.0 - ca * ca) : -Math.sqrt(1.0 - ca * ca) : Math.sin(angle);
    return [
      cr * ca * rx - sr * sa * ry + cx,
      sr * ca * rx + cr * sa * ry + cy];
  } else {
    return [0, 0];
  }
};
/** @ignore */
GraphicsPath._segToCurve = function(seg) {
  if(seg[0] === GraphicsPath.LINE) {
    return new LineCurve(seg[1], seg[2], seg[3], seg[4]);
  } else if(seg[0] === GraphicsPath.QUAD) {
    return BSplineCurve.fromBezierCurve([
      [seg[1], seg[2], 0], [seg[3], seg[4], 0], [seg[5], seg[6], 0]]);
  } else if(seg[0] === GraphicsPath.CUBIC) {
    return BSplineCurve.fromBezierCurve([
      [seg[1], seg[2], 0], [seg[3], seg[4], 0], [seg[5], seg[6], 0], [seg[7], seg[8], 0]]);
  } else if(seg[0] === GraphicsPath.ARC) {
    const rx = seg[3];
    const ry = seg[4];
    const cx = seg[10];
    const cy = seg[11];
    const theta = seg[12];
    const delta = seg[13] - seg[12];
    const rot = seg[5];
    return new ArcCurve(seg[1], seg[2], seg[8], seg[9], rx, ry, rot, cx, cy, theta, delta);
  } else {
    throw new Error();
  }
};

/** @ignore */
GraphicsPath._subdivide2 = function(a1, a2, a3, a4, a5, a6, a7, a8, t1, t2, tcut, list, flatness, mode, depth) {
  const x1 = a1 + (a3 - a1) * tcut;
  const x2 = a3 + (a5 - a3) * tcut;
  const xc1 = x1 + (x2 - x1) * tcut;
  const x3 = a5 + (a7 - a5) * tcut;
  const xc2 = x2 + (x3 - x2) * tcut;
  const xd = xc1 + (xc2 - xc1) * tcut;
  const y1 = a2 + (a4 - a2) * tcut;
  const y2 = a4 + (a6 - a4) * tcut;
  const yc1 = y1 + (y2 - y1) * tcut;
  const y3 = a6 + (a8 - a6) * tcut;
  const yc2 = y2 + (y3 - y2) * tcut;
  const yd = yc1 + (yc2 - yc1) * tcut;
  const tmid = t1 + (t2 - t1) * tcut;
  GraphicsPath._flattenCubic(a1, a2, x1, y1, xc1, yc1, xd, yd, t1, tmid, list, flatness, mode, depth + 1);
  GraphicsPath._flattenCubic(xd, yd, xc2, yc2, x3, y3, a7, a8, tmid, t2, list, flatness, mode, depth + 1);
};
/** @ignore */
GraphicsPath._subdivide3 = function(a1, a2, a3, a4, a5, a6, a7, a8, t1, t2, tcut, tcut2, list, flatness, mode, depth) {
  const x1 = a1 + (a3 - a1) * tcut;
  const x2 = a3 + (a5 - a3) * tcut;
  const xc1 = x1 + (x2 - x1) * tcut;
  const x3 = a5 + (a7 - a5) * tcut;
  const xc2 = x2 + (x3 - x2) * tcut;
  const xd = xc1 + (xc2 - xc1) * tcut;
  const y1 = a2 + (a4 - a2) * tcut;
  const y2 = a4 + (a6 - a4) * tcut;
  const yc1 = y1 + (y2 - y1) * tcut;
  const y3 = a6 + (a8 - a6) * tcut;
  const yc2 = y2 + (y3 - y2) * tcut;
  const yd = yc1 + (yc2 - yc1) * tcut;
  const tmid = t1 + (t2 - t1) * tcut;
  const tcutx = (tcut2 - tmid) / (t2 - tmid);
  GraphicsPath._flattenCubic(a1, a2, x1, y1, xc1, yc1, xd, yd, t1, tmid, list, flatness, mode, depth + 1);
  GraphicsPath._subdivide2(xd, yd, xc2, yc2, x3, y3, a7, a8, tmid, t2, tcutx, list, flatness, mode, depth + 1);
};
/** @ignore */
GraphicsPath._flattenCubic = function(a1, a2, a3, a4, a5, a6, a7, a8, t1, t2, list, flatness, mode, depth) {
  if(typeof depth === "undefined" || depth === null)depth = 0;
  if(depth >= 20 || Math.abs(a1 - a3 - a3 + a5) + Math.abs(a3 - a5 - a5 + a7) +
    Math.abs(a2 - a4 - a4 + a6) + Math.abs(a4 - a6 - a6 + a8) <= flatness) {
    if(mode === 0) {
      list.push([a1, a2, a7, a8]);
    } else {
      const dx = a7 - a1;
      const dy = a8 - a2;
      const length = Math.sqrt(dx * dx + dy * dy);
      list.push(t1, t2, length);
    }
  } else {
    GraphicsPath._subdivide2(a1, a2, a3, a4, a5, a6, a7, a8, t1, t2, 0.5, list, flatness, mode, depth);
  }
};
/** @ignore */
GraphicsPath._flattenQuad = function(a1, a2, a3, a4, a5, a6, t1, t2, list, flatness, mode, depth) {
  if(typeof depth === "undefined" || depth === null)depth = 0;
  if(depth >= 20 || Math.abs(a1 - a3 - a3 + a5) + Math.abs(a2 - a4 - a4 + a6) <= flatness) {
    if(mode === 0) {
      list.push([a1, a2, a5, a6]);
    } else {
      const dx = a5 - a1;
      const dy = a6 - a2;
      const length = Math.sqrt(dx * dx + dy * dy);
      list.push(t1, t2, length);
    }
  } else {
    const x1 = (a1 + a3) * 0.5;
    const x2 = (a3 + a5) * 0.5;
    const xc = (x1 + x2) * 0.5;
    const y1 = (a2 + a4) * 0.5;
    const y2 = (a4 + a6) * 0.5;
    const yc = (y1 + y2) * 0.5;
    const tmid = (t1 + t2) * 0.5;
    GraphicsPath._flattenQuad(a1, a2, x1, y1, xc, yc, t1, tmid, list, flatness, mode, depth + 1);
    GraphicsPath._flattenQuad(xc, yc, x2, y2, a5, a6, tmid, t2, list, flatness, mode, depth + 1);
  }
};
/** @ignore */
GraphicsPath._flattenArc = function(a, t1, t2, list, flatness, mode, depth) {
  const rot = a[5];
  const crot = Math.cos(rot);
  const srot = rot >= 0 && rot < 6.283185307179586 ? rot <= 3.141592653589793 ? Math.sqrt(1.0 - crot * crot) : -Math.sqrt(1.0 - crot * crot) : Math.sin(rot);
  const ellipseInfo = [a[3], a[4], a[10], a[11], crot, srot];
  GraphicsPath._flattenArcInternal(ellipseInfo, a[1], a[2], a[8], a[9], a[12], a[13], t1, t2, list, flatness, mode, depth);
};
/** @ignore */
GraphicsPath._flattenArcInternal = function(ellipseInfo, x1, y1, x2, y2, theta1, theta2, t1, t2, list, flatness, mode, depth) {
  if(typeof depth === "undefined" || depth === null)depth = 0;
  const thetaMid = (theta1 + theta2) * 0.5;
  const tmid = (t1 + t2) * 0.5;
  const ca = Math.cos(thetaMid);
  const sa = thetaMid >= 0 && thetaMid < 6.283185307179586 ? thetaMid <= 3.141592653589793 ? Math.sqrt(1.0 - ca * ca) : -Math.sqrt(1.0 - ca * ca) : Math.sin(thetaMid);
  const xmid = ellipseInfo[4] * ca * ellipseInfo[0] - ellipseInfo[5] * sa * ellipseInfo[1] + ellipseInfo[2];
  const ymid = ellipseInfo[5] * ca * ellipseInfo[0] + ellipseInfo[4] * sa * ellipseInfo[1] + ellipseInfo[3];
  if(depth >= 20 || Math.abs(x1 - xmid - xmid + x2) + Math.abs(y1 - ymid - ymid + y2) <= flatness) {
    if(mode === 0) {
      list.push([x1, y1, xmid, ymid]);
      list.push([xmid, ymid, x2, y2]);
    } else {
      let dx = xmid - x1;
      let dy = ymid - y1;
      let length = Math.sqrt(dx * dx + dy * dy);
      list.push(t1, tmid, length);
      dx = x2 - xmid;
      dy = y2 - ymid;
      length = Math.sqrt(dx * dx + dy * dy);
      list.push(tmid, t2, length);
    }
  } else {
    GraphicsPath._flattenArcInternal(ellipseInfo, x1, y1, xmid, ymid, theta1, thetaMid, t1, tmid, list, flatness, mode, depth + 1);
    GraphicsPath._flattenArcInternal(ellipseInfo, xmid, ymid, x2, y2, thetaMid, theta2, tmid, t2, list, flatness, mode, depth + 1);
  }
};
/** @ignore */
GraphicsPath.prototype._start = function() {
  let i;
  for (i = 0; i < this.segments.length; i++) {
    const s = this.segments[i];
    if(s[0] !== GraphicsPath.CLOSE)return GraphicsPath._startPoint(s);
  }
  return [0, 0];
};
/** @ignore */
GraphicsPath.prototype._end = function() {
  let i;
  for (i = this.segments.length - 1; i >= 0; i--) {
    const s = this.segments[i];
    if(s[0] !== GraphicsPath.CLOSE)return GraphicsPath._endPoint(s);
  }
  return [0, 0];
};

/**
 * Merges the path segments in another path onto this one.
 * @param {GraphicsPath} path Another graphics path.
 * Can be null.
 * @returns {GraphicsPath} This object.
 */
GraphicsPath.prototype.merge = function(path) {
  let oldpos = null;
  if(!path)return this;
  const segsLength = path.segments.length;
  let i;
  for (i = 0; i < segsLength; i++) {
    const a = path.segments[i];
    if(a[0] === GraphicsPath.CLOSE) {
      this.closePath();
    } else {
      const start = GraphicsPath._startPoint(a);
      if(!oldpos || oldpos[0] !== start[0] || oldpos[1] !== start[1]) {
        this.moveTo(start[0], start[1]);
      }
      oldpos = GraphicsPath._endPoint(a);
      if(a[0] === GraphicsPath.LINE) {
        this.lineTo(a[3], a[4]);
      }
      if(a[0] === GraphicsPath.QUAD) {
        this.quadraticCurveTo(a[3], a[4], a[5], a[6]);
      }
      if(a[0] === GraphicsPath.CUBIC) {
        this.bezierCurveTo(a[3], a[4], a[5], a[6], a[7], a[8]);
      }
      if(a[0] === GraphicsPath.ARC) {
        const delta = a[13] - a[12];
        const largeArc = Math.abs(delta) > Math.PI;
        this.arcSvgTo(a[3], a[4], a[5] * GraphicsPath._toDegrees,
          largeArc, delta > 0, a[8], a[9]);
      }
    }
  }
  return this;
};

/**
 * Returns this path in the form of a string in SVG path format.
 * See {@link GraphicsPath.fromString}.
 * @returns {string} A string describing the path in the SVG path
 * format.
 */
GraphicsPath.prototype.toString = function() {
  let oldpos = null;
  let ret = "";

  let i;
  for (i = 0; i < this.segments.length; i++) {
    const a = this.segments[i];
    if(a[0] === GraphicsPath.CLOSE) {
      ret += "Z";
    } else {
      const start = GraphicsPath._startPoint(a);
      if(!oldpos || oldpos[0] !== start[0] || oldpos[1] !== start[1]) {
        ret += "M" + start[0] + "," + start[1];
      }
      oldpos = GraphicsPath._endPoint(a);
      if(a[0] === GraphicsPath.LINE) {
        ret += "L" + a[3] + "," + a[4];
      }
      if(a[0] === GraphicsPath.QUAD) {
        ret += "Q" + a[3] + "," + a[4] + "," + a[5] + "," + a[6];
      }
      if(a[0] === GraphicsPath.CUBIC) {
        ret += "C" + a[3] + "," + a[4] + "," + a[5] + "," + a[6] + "," + a[7] + "," + a[8];
      }
      if(a[0] === GraphicsPath.ARC) {
        const delta = a[13] - a[12];
        const largeArc = Math.abs(delta) > Math.PI;
        ret += "A" + a[3] + "," + a[4] + "," + a[5] * 180 / Math.PI + "," +
      (largeArc ? "1" : "0") + (delta > 0 ? "1" : "0") + a[8] + "," + a[9];
      }
    }
  }
  return ret;
};
/**
 * Finds the approximate length of this path.
 * @param {number} [flatness] No longer used by this method.
 * @returns {number} Approximate length of this path
 * in units.
 */
GraphicsPath.prototype.pathLength = function(flatness) {
  if(this.segments.length === 0)return 0;
  if(typeof flatness !== "undefined" && flatness !== null) {
    console.warn("Unused parameter flatness is defined");
  }
  return this.getCurves().getLength();
};
/**
 * Gets an array of line segments approximating
 * the path.
 * @param {number} [flatness] When curves and arcs
 * are decomposed to line segments, the
 * segments will be close to the true path of the curve by this
 * value, given in units. If null, undefined, or omitted, default is 1.
 * @returns {Array<Array<number>>} Array of line segments.
 * Each line segment is an array of four numbers: the X and
 * Y coordinates of the start point, respectively, then the X and
 * Y coordinates of the end point, respectively.
 */
GraphicsPath.prototype.getLines = function(flatness) {
  const ret = [];
  if(typeof flatness === "undefined" || flatness === null)flatness = 1.0;
  let i;
  for (i = 0; i < this.segments.length; i++) {
    const s = this.segments[i];
    if(s[0] === GraphicsPath.QUAD) {
      GraphicsPath._flattenQuad(s[1], s[2], s[3], s[4],
        s[5], s[6], 0.0, 1.0, ret, flatness * 2, 0, 0);
    } else if(s[0] === GraphicsPath.CUBIC) {
      GraphicsPath._flattenCubic(s[1], s[2], s[3], s[4],
        s[5], s[6], s[7], s[8], 0.0, 1.0, ret, flatness * 2, 0, 0);
    } else if(s[0] === GraphicsPath.ARC) {
      GraphicsPath._flattenArc(s, 0.0, 1.0, ret, flatness * 2, 0, 0);
    } else if(s[0] !== GraphicsPath.CLOSE) {
      ret.push([s[1], s[2], s[3], s[4]]);
    }
  }
  return ret;
};
/**
 * Creates a path in which curves and arcs are decomposed
 * to line segments.
 * @param {number} [flatness] When curves and arcs
 * are decomposed to line segments, the
 * segments will be close to the true path of the curve by this
 * value, given in units. If null, undefined, or omitted, default is 1.
 * @returns {GraphicsPath} A path consisting only of line
 * segments and close commands.
 */
GraphicsPath.prototype.toLinePath = function(flatness) {
  const ret = [];
  const path = new GraphicsPath();
  let last = null;
  if(typeof flatness === "undefined" || flatness === null)flatness = 1.0;
  let i;
  for (i = 0; i < this.segments.length; i++) {
    const s = this.segments[i];
    if(s[0] === GraphicsPath.CLOSE) {
      path.closePath();
      continue;
    }
    let j;
    const endpt = GraphicsPath._endPoint(s);
    const startpt = GraphicsPath._startPoint(s);
    if(!last || last[0] !== startpt[0] || last[1] !== startpt[1]) {
      path.moveTo(startpt[0], startpt[1]);
    }
    last = endpt;
    ret.splice(0, ret.length);
    if(s[0] === GraphicsPath.QUAD) {
      GraphicsPath._flattenQuad(s[1], s[2], s[3], s[4],
        s[5], s[6], 0.0, 1.0, ret, flatness * 2, 0, 0);
      for(j = 0; j < ret.length; j++) {
        path.lineTo(ret[j][2], ret[j][3]);
      }
    } else if(s[0] === GraphicsPath.CUBIC) {
      GraphicsPath._flattenCubic(s[1], s[2], s[3], s[4],
        s[5], s[6], s[7], s[8], 0.0, 1.0, ret, flatness * 2, 0, 0);
      for(j = 0; j < ret.length; j++) {
        path.lineTo(ret[j][2], ret[j][3]);
      }
    } else if(s[0] === GraphicsPath.ARC) {
      GraphicsPath._flattenArc(s, 0.0, 1.0, ret, flatness * 2, 0, 0);
      for(j = 0; j < ret.length; j++) {
        path.lineTo(ret[j][2], ret[j][3]);
      }
    } else if(s[0] !== GraphicsPath.CLOSE) {
      path.lineTo(s[3], s[4]);
    } else {
      path.closePath();
    }
  }
  return path;
};

/**
 * Creates a path in which arcs are decomposed
 * to cubic B&eacute;zier curves (which will approximate those arcs).
 * @returns {GraphicsPath} A path consisting only of line
 * segments, B&eacute;zier curves, and close commands.
 */
GraphicsPath.prototype.toCurvePath = function() {
  const path = new GraphicsPath();
  let last = null;
  let i;
  for (i = 0; i < this.segments.length; i++) {
    const s = this.segments[i];
    if(s[0] === GraphicsPath.CLOSE) {
      path.closePath();
      continue;
    }
    let j;
    const endpt = GraphicsPath._endPoint(s);
    const startpt = GraphicsPath._startPoint(s);
    if(!last || last[0] !== startpt[0] || last[1] !== startpt[1]) {
      path.moveTo(startpt[0], startpt[1]);
    }
    last = endpt;
    if(s[0] === GraphicsPath.QUAD) {
      path.quadraticCurveTo(s[3], s[4],
        s[5], s[6]);
    } else if(s[0] === GraphicsPath.CUBIC) {
      path.bezierCurveTo(s[3], s[4],
        s[5], s[6], s[7], s[8]);
    } else if(s[0] === GraphicsPath.ARC) {
      const curves = GraphicsPath._arcToBezierCurves(s[10], s[11], s[3], s[4], s[5], s[12], s[13]);
      for(j = 0; j < curves.length; j++) {
        path.bezierCurveTo(curves[j][2], curves[j][3], curves[j][4],
          curves[j][5], curves[j][6], curves[j][7]);
      }
    } else if(s[0] === GraphicsPath.LINE) {
      path.lineTo(s[3], s[4]);
    }
  }
  return path;
};

/** @ignore */
GraphicsPath._accBounds = function(ret, s, t) {
  if(t >= 0 && t <= 1) {
    const pt = GraphicsPath._point(s, t);
    ret[0] = Math.min(pt[0], ret[0]);
    ret[1] = Math.min(pt[1], ret[1]);
    ret[2] = Math.max(pt[0], ret[2]);
    ret[3] = Math.max(pt[1], ret[3]);
  }
};
/** @ignore */
GraphicsPath._accBoundsPoint = function(ret, x, y) {
  ret[0] = Math.min(x, ret[0]);
  ret[1] = Math.min(y, ret[1]);
  ret[2] = Math.max(x, ret[2]);
  ret[3] = Math.max(y, ret[3]);
};
/** @ignore */
GraphicsPath._accBoundsArc = function(ret, rx, ry, cphi, sphi, cx, cy, angle) {
  const ca = Math.cos(angle);
  const sa = angle >= 0 && angle < 6.283185307179586 ? angle <= 3.141592653589793 ? Math.sqrt(1.0 - ca * ca) : -Math.sqrt(1.0 - ca * ca) : Math.sin(angle);
  const px = cphi * ca * rx - sphi * sa * ry + cx;
  const py = sphi * ca * rx + cphi * sa * ry + cy;
  ret[0] = Math.min(px, ret[0]);
  ret[1] = Math.min(py, ret[1]);
  ret[2] = Math.max(px, ret[2]);
  ret[3] = Math.max(py, ret[3]);
};
/** @ignore */
GraphicsPath._normAngleRadians = function(angle) {
  const twopi = Math.PI * 2;
  let normAngle = angle;
  if(normAngle >= 0) {
    normAngle = normAngle < twopi ? normAngle : normAngle % twopi;
  } else {
    normAngle %= twopi;
    normAngle += twopi;
  }
  return normAngle;
};
/** @ignore */
GraphicsPath._angleInRange = function(angle, startAngle, endAngle) {
  const twopi = Math.PI * 2;
  const diff = endAngle - startAngle;
  if(Math.abs(diff) >= twopi)return true;
  const normAngle = GraphicsPath._normAngleRadians(angle);
  const normStart = GraphicsPath._normAngleRadians(startAngle);
  const normEnd = GraphicsPath._normAngleRadians(endAngle);
  if(startAngle === endAngle) {
    return normAngle === normStart;
  } else if(startAngle < endAngle) {
    if(normStart < normEnd) {
      return normAngle >= normStart && normAngle <= normEnd;
    } else {
      return normAngle >= normStart || normAngle <= normEnd;
    }
  } else if(normEnd < normStart) {
    return normAngle >= normEnd && normAngle <= normStart;
  } else {
    return normAngle >= normEnd || normAngle <= normStart;
  }
};
/**
 * Calculates an axis-aligned bounding box that tightly
 * fits this graphics path.
 * @returns {Array<number>} An array of four numbers
 * describing the bounding box. The first two are
 * the lowest X and Y coordinates, and the last two are
 * the highest X and Y coordinates. If the path is empty,
 * returns the array (Infinity, Infinity, -Infinity, -Infinity).
 */
GraphicsPath.prototype.getBounds = function() {
  const inf = Number.POSITIVE_INFINITY;
  const ret = [inf, inf, -inf, inf];
  let first = true;
  let i;
  for (i = 0; i < this.segments.length; i++) {
    const s = this.segments[i];
    let ax;
    let ay;
    if(s[0] === GraphicsPath.CLOSE)continue;
    const endpt = GraphicsPath._endPoint(s);
    const x1 = s[1];
    const y1 = s[2];
    let x2 = endpt[0];
    let y2 = endpt[1];
    let bx;
    let by;
    if(first) {
      ret[0] = Math.min(x1, x2);
      ret[1] = Math.min(y1, y2);
      ret[2] = Math.max(x1, x2);
      ret[3] = Math.max(y1, y2);
    } else {
      ret[0] = Math.min(x1, x2, ret[0]);
      ret[1] = Math.min(y1, y2, ret[1]);
      ret[2] = Math.max(x1, x2, ret[2]);
      ret[3] = Math.max(y1, y2, ret[3]);
    }
    first = false;
    if(s[0] === GraphicsPath.QUAD) {
      x2 = s[5];
      y2 = s[6];
      ax = x1 - 2 * s[3] + x2;
      ay = y1 - 2 * s[4] + y2;
      if(ax !== 0) {
        GraphicsPath._accBounds(ret, s, (x1 - s[3]) / ax);
      }
      if(ay !== 0) {
        GraphicsPath._accBounds(ret, s, (y1 - s[4]) / ay);
      }
    } else if(s[0] === GraphicsPath.CUBIC) {
      x2 = s[7];
      y2 = s[8];
      const denomX = x1 - 3 * s[3] + 3 * s[5] - x2;
      const denomY = y1 - 3 * s[4] + 3 * s[6] - y2;
      if(denomX !== 0 || denomY !== 0) {
        ax = x1 - 2 * s[3] + s[5];
        ay = y1 - 2 * s[4] + s[6];
        bx = s[3] * s[3] + s[5] * s[5] - s[5] * (x1 + s[3]) + x2 * (x1 - s[3]);
        by = s[4] * s[4] + s[6] * s[6] - s[6] * (y1 + s[4]) + y2 * (y1 - s[4]);
        if(bx >= 0 && denomX !== 0) {
          bx = Math.sqrt(bx);
          GraphicsPath._accBounds(ret, s, (ax - bx) / denomX);
          GraphicsPath._accBounds(ret, s, (ax + bx) / denomX);
        }
        if(by >= 0 && denomY !== 0) {
          by = Math.sqrt(by);
          GraphicsPath._accBounds(ret, s, (ay - by) / denomY);
          GraphicsPath._accBounds(ret, s, (ay + by) / denomY);
        }
      }
    } else if(s[0] === GraphicsPath.ARC) {
      const rx = s[3];
      const ry = s[4];
      const cx = s[10];
      const cy = s[11];
      const theta = s[12];
      const delta = s[13];
      const rot = s[5]; // Rotation in radians
      let cosp;
      let sinp;
      if(Math.abs(delta - theta) >= Math.PI * 2) {
        // This arc goes around the entire ellipse, giving
        // it a much simpler formula for the bounding box
        let distx;
        let disty;
        if(rx === ry) {
          // The arc forms a circle
          distx = rx;
          disty = ry;
        } else {
          cosp = Math.cos(rot);
          sinp = rot >= 0 && rot < 6.283185307179586 ? rot <= 3.141592653589793 ? Math.sqrt(1.0 - cosp * cosp) : -Math.sqrt(1.0 - cosp * cosp) : Math.sin(rot);
          ax = cosp * rx;
          ay = sinp * rx;
          bx = -sinp * ry;
          by = cosp * ry;
          distx = Math.sqrt(ax * ax + bx * bx);
          disty = Math.sqrt(ay * ay + by * by);
        }
        GraphicsPath._accBoundsPoint(ret, cx + distx, cy + disty);
        GraphicsPath._accBoundsPoint(ret, cx + distx, cy - disty);
        GraphicsPath._accBoundsPoint(ret, cx - distx, cy + disty);
        GraphicsPath._accBoundsPoint(ret, cx - distx, cy - disty);
      } else if(delta !== theta) { // NOTE: Endpoints were already included in case delta==theta
        cosp = Math.cos(rot);
        sinp = rot >= 0 && rot < 6.283185307179586 ? rot <= 3.141592653589793 ? Math.sqrt(1.0 - cosp * cosp) : -Math.sqrt(1.0 - cosp * cosp) : Math.sin(rot);
        const angles = [];
        let angle;
        if(cosp !== 0 && sinp !== 0) {
          angle = Math.atan2(-ry * sinp / cosp, rx);
          angles.push(angle, angle + Math.PI);
          angle = Math.atan2(ry * cosp / sinp, rx);
          angles.push(angle, angle + Math.PI);
        } else {
          angles.push(0, Math.PI, Math.PI * 0.5, Math.PI * 1.5);
        }
        let k;
        for (k = 0; k < angles.length; k++) {
          if(GraphicsPath._angleInRange(angles[k], theta, delta)) {
            GraphicsPath._accBoundsArc(ret, rx, ry, cosp, sinp, cx, cy, angles[k]);
          }
        }
      }
    }
  }
  return ret;
};

/**
 * Returns a path that reverses the course of this path.
 * @returns {GraphicsPath} A GraphicsPath
 * object with its path segments reversed.
 */
GraphicsPath.prototype.reverse = function() {
  let lastptx = 0;
  let lastpty = 0;
  let lastClosed = false;
  let pathStartX = 0;
  let pathStartY = 0;
  const ret = new GraphicsPath();
  let i;
  for (i = this.segments.length - 1; i >= 0; i--) {
    const s = this.segments[i];
    let startpt = GraphicsPath._startPoint(s);
    let endpt = GraphicsPath._endPoint(s);
    if(s[0] !== GraphicsPath.CLOSE) {
      if(i === this.segments.length - 1) {
        ret.moveTo(endpt[0], endpt[1]);
      } else if(lastptx !== endpt[0] || lastpty !== endpt[1]) {
        if(lastClosed) {
          ret.closePath();
        }
        lastClosed = false;
        ret.moveTo(endpt[0], endpt[1]);
      }
      lastptx = startpt[0];
      lastpty = startpt[1];
    }
    if(s[0] === GraphicsPath.CLOSE) {
      if(lastClosed) {
        ret.closePath();
      }
      lastClosed = true;
      let havePathStart = false;
      let j;
      for (j = i - 1; j >= 0; j--) {
        if(this.segments[j][0] === GraphicsPath.CLOSE) {
          break;
        }
        startpt = GraphicsPath._startPoint(this.segments[j]);
        endpt = GraphicsPath._endPoint(this.segments[j]);
        if(havePathStart) {
          if(pathStartX !== endpt[0] || pathStartY !== endpt[1]) {
            break;
          }
        }
        pathStartX = startpt[0];
        pathStartY = startpt[1];
        havePathStart = true;
      }
      if(havePathStart) {
        ret.moveTo(pathStartX, pathStartY);
        endpt = GraphicsPath._endPoint(this.segments[i - 1]);
        if(pathStartX !== endpt[0] || pathStartY !== endpt[1]) {
          ret.lineTo(endpt[0], endpt[1]);
        }
        lastptx = endpt[0];
        lastpty = endpt[1];
      }
    } else if(s[0] === GraphicsPath.QUAD) {
      ret.quadraticCurveTo(s[3], s[4], s[1], s[2]);
    } else if(s[0] === GraphicsPath.CUBIC) {
      ret.bezierCurveTo(s[5], s[6], s[3], s[4], s[1], s[2]);
    } else if(s[0] === GraphicsPath.ARC) {
      const delta = s[13] - s[12];
      const reversedSweep = delta < 0;
      const largeArc = Math.abs(delta) > Math.PI;
      ret.arcSvgTo(s[3], s[4], s[5] * GraphicsPath._toDegrees,
        largeArc, reversedSweep, s[1], s[2]);
    } else if(s[0] === GraphicsPath.LINE) {
      ret.lineTo(s[1], s[2]);
    }
  }
  if(lastClosed)
    ret.closePath();
  return ret;
};
/** @ignore */
GraphicsPath._pushXY = function(curPath, x, y, nodegen) {
  if(!nodegen) {
    curPath.push(x, y);
  } else if(curPath.length === 0) {
    curPath.push(x, y);
  } else if(curPath[curPath.length - 1] !== y || curPath[curPath.length - 2] !== x) {
    curPath.push(x, y);
  }
};

/** @ignore */
GraphicsPath.prototype._getSubpaths = function(flatness, nodegen) {
  const tmp = [];
  const subpaths = [];
  let j;
  if(typeof flatness === "undefined" || flatness === null)flatness = 1.0;
  let lastptx = 0;
  let lastpty = 0;
  let first = true;
  let curPath = null;
  let i;
  for (i = 0; i < this.segments.length; i++) {
    const s = this.segments[i];
    const startpt = GraphicsPath._startPoint(s);
    const endpt = GraphicsPath._endPoint(s);
    tmp.splice(0, tmp.length);
    if(s[0] !== GraphicsPath.CLOSE) {
      if(first || lastptx !== startpt[0] || lastpty !== startpt[1]) {
        curPath = startpt;
        subpaths.push(curPath);
        first = false;
      }
      lastptx = endpt[0];
      lastpty = endpt[1];
    }
    if(s[0] === GraphicsPath.QUAD) {
      GraphicsPath._flattenQuad(s[1], s[2], s[3], s[4],
        s[5], s[6], 0.0, 1.0, tmp, flatness * 2, 0, 0);
      for(j = 0; j < tmp.length; j++) {
        GraphicsPath._pushXY(curPath, tmp[j][2], tmp[j][3], nodegen);
      }
    } else if(s[0] === GraphicsPath.CUBIC) {
      GraphicsPath._flattenCubic(s[1], s[2], s[3], s[4],
        s[5], s[6], s[7], s[8], 0.0, 1.0, tmp, flatness * 2, 0, 0);
      for(j = 0; j < tmp.length; j++) {
        GraphicsPath._pushXY(curPath, tmp[j][2], tmp[j][3], nodegen);
      }
    } else if(s[0] === GraphicsPath.ARC) {
      GraphicsPath._flattenArc(s, 0.0, 1.0, tmp, flatness * 2, 0, 0);
      for(j = 0; j < tmp.length; j++) {
        GraphicsPath._pushXY(curPath, tmp[j][2], tmp[j][3], nodegen);
      }
    } else if(s[0] !== GraphicsPath.CLOSE) {
      GraphicsPath._pushXY(curPath, s[3], s[4], nodegen);
    }
  }
  return subpaths;
};

/** @ignore
 * @private
 * @constructor */
GraphicsPath._CurveList = function(curves) {
  Curve.prototype.constructor.apply(this,
    [new PiecewiseCurve(curves).toArcLengthParam().fitRange(0, 1)]);
  this.curves = curves;
};
GraphicsPath._CurveList.prototype = Object.create(Curve.prototype);
GraphicsPath._CurveList.prototype.constructor = GraphicsPath._CurveList;
GraphicsPath._CurveList.prototype.getCurves = function() {
  return this.curves;
};
/**
 * Does a linear interpolation between two graphics paths.
 * @param {GraphicsPath} other The second graphics path.
 * @param {number} t An interpolation factor, generally ranging from 0 through 1.
 * Closer to 0 means closer to this path, and closer to 1 means closer
 * to "other". If the input paths contain arc
 * segments that differ in the large arc and sweep flags, the flags from
 * the first path's arc are used if "t" is less than 0.5; and the flags from
 * the second path's arc are used otherwise.<p>For a nonlinear
 * interpolation, define a function that takes a value that usually ranges from 0 through 1
 * and generally returns a value that usually ranges from 0 through 1,
 * and pass the result of that function to this method.
 * See the documentation for {@link MathUtil.vec3lerp}
 * for examples of interpolation functions.
 * @returns {GraphicsPath} The interpolated path.
 */
GraphicsPath.prototype.interpolate = function(other, t) {
  if(!other || other.segments.length !== this.segments.length) {
    return null;
  }
  const tmpThis = [];
  const tmpOther = [];
  const tmp = [];
  let j;
  const ret = new GraphicsPath();
  let oldpos;
  let i;
  for (i = 0; i < this.segments.length; i++) {
    let segThis = this.segments[i];
    let segOther = other.segments[i];
    let domove = false;
    if(segThis[0] !== GraphicsPath.CLOSE) {
      const start = GraphicsPath._startPoint(segThis);
      if(!oldpos || oldpos[0] !== start[0] || oldpos[1] !== start[1]) {
        domove = true;
      }
      oldpos = GraphicsPath._endPoint(segThis);
    }
    let tx;
    let ty;
    if(segThis[0] === GraphicsPath.QUAD) {
      tmpThis[0] = GraphicsPath.CUBIC;
      tmpThis[1] = segThis[1];
      tmpThis[2] = segThis[2];
      tx = 2 * segThis[3];
      ty = 2 * segThis[4];
      tmpThis[3] = (segThis[1] + tx) / 3;
      tmpThis[4] = (segThis[2] + ty) / 3;
      tmpThis[5] = (segThis[5] + tx) / 3;
      tmpThis[6] = (segThis[6] + ty) / 3;
      tmpThis[7] = segThis[5];
      tmpThis[8] = segThis[6];
      segThis = tmpThis;
    }
    if(segOther[0] === GraphicsPath.QUAD) {
      tmpOther[0] = GraphicsPath.CUBIC;
      tmpOther[1] = segOther[1];
      tmpOther[2] = segOther[2];
      tx = 2 * segOther[3];
      ty = 2 * segOther[4];
      tmpOther[3] = (segOther[1] + tx) / 3;
      tmpOther[4] = (segOther[2] + ty) / 3;
      tmpOther[5] = (segOther[5] + tx) / 3;
      tmpOther[6] = (segOther[6] + ty) / 3;
      tmpOther[7] = segOther[5];
      tmpOther[8] = segOther[6];
      segOther = tmpOther;
    }
    if(segThis[0] !== segOther[0]) {
      return null;
    }
    switch(segThis[0]) {
    case GraphicsPath.CLOSE:
      ret.closePath();
      oldpos = null;
      break;
    case GraphicsPath.LINE:
    case GraphicsPath.QUAD:
    case GraphicsPath.CUBIC:
      for(j = 1; j < segThis.length; j++) {
        tmp[j] = segThis[j] + (segOther[j] - segThis[j]) * t;
      }
      if(domove)ret.moveTo(tmp[1], tmp[2]);
      if(segThis[0] === GraphicsPath.LINE)
        ret.lineTo(tmp[3], tmp[4]);
      else if(segThis[0] === GraphicsPath.QUAD)
        ret.quadraticCurveTo(tmp[3], tmp[4], tmp[5], tmp[6]);
      else if(segThis[0] === GraphicsPath.CUBIC)
        ret.bezierCurveTo(tmp[3], tmp[4], tmp[5], tmp[6], tmp[7], tmp[8]);
      break;
    case GraphicsPath.ARC:{
      const deltaThis = segThis[13] - segThis[12];
      const largeArcThis = Math.abs(deltaThis) > Math.PI;
      const deltaOther = segOther[13] - segOther[12];
      const largeArcOther = Math.abs(deltaOther) > Math.PI;

      const largeArc = t < 0.5 ? largeArcThis : largeArcOther;
      const sweep = t < 0.5 ? deltaThis > 0 : deltaOther > 0;
      const sx = segThis[1] + (segOther[1] - segThis[1]) * t;
      const sy = segThis[2] + (segOther[2] - segThis[2]) * t;
      const rx = segThis[3] + (segOther[3] - segThis[3]) * t;
      const ry = segThis[4] + (segOther[4] - segThis[4]) * t;
      const rot = segThis[5] + (segOther[5] - segThis[5]) * t;
      const ex = segThis[8] + (segOther[8] - segThis[8]) * t;
      const ey = segThis[9] + (segOther[9] - segThis[9]) * t;
      if(domove)ret.moveTo(sx, sy);
      ret.arcSvgTo(rx, ry, rot * GraphicsPath._toDegrees,
        largeArc, sweep, ex, ey);
      break;
    }
    default:
      console.log("unknown kind");
      return null;
    }
  }
  return ret;
};
/** @ignore */
GraphicsPath._addSegment = function(a, c) {
  if(a.length > 0 && c instanceof LineCurve) {
    if(c.x1 === c.x2 && c.y1 === c.y2) {
      // Degenerate line segment, don't add
      return;
    }
  }
  a.push(c);
};

/**
 * Gets a [curve evaluator object]{@link Curve} for
 * the curves described by this path. The return value doesn't track changes to the path.
 * @returns {Object} A [curve evaluator object]{@link Curve} that implements
 * the following additional method:<ul>
 * <li><code>getCurves()</code> - Returns a list of [curve evaluator objects]{@link Curve}
 * described by this path. The list will contain one curve evaluator object for each disconnected
 * portion of the path. For example, if the path contains one polygon, the list will contain
 * one curve object. And if the path is empty, the list will be empty too. Each curve
 * takes U coordinates that range from 0 to 1, depending on how far the point is from the start or
 * the end of the path (similar to arc-length parameterization). Each curve
 * returns a 3-element array containing
 * the X, Y, and Z coordinates of the point lying on the curve at the given
 * "u" position (however, the z will always be 0 since paths can currently
 * only be 2-dimensional).
 * </ul>
 */
GraphicsPath.prototype.getCurves = function() {
  // TODO: Consider returning a list of curves and require
  // callers to use PiecewiseCurve to get the prior behavior
  const subpaths = [];
  const curves = [];
  let lastptx = 0;
  let lastpty = 0;
  let startptx = 0;
  let startpty = 0;
  let first = true;
  let curPath = null;
  let i;
  for (i = 0; i < this.segments.length; i++) {
    const s = this.segments[i];
    const startpt = GraphicsPath._startPoint(s);
    const endpt = GraphicsPath._endPoint(s);
    if(s[0] !== GraphicsPath.CLOSE) {
      if(first || lastptx !== startpt[0] || lastpty !== startpt[1]) {
        curPath = [];
        subpaths.push(curPath);
        startptx = startpt[0];
        startpty = startpt[1];
        first = false;
      }
      lastptx = endpt[0];
      lastpty = endpt[1];
      GraphicsPath._addSegment(curPath, GraphicsPath._segToCurve(s));
    } else {
      GraphicsPath._addSegment(curPath,
        new LineCurve(lastptx, lastpty, startptx, startpty));
      lastptx = startptx;
      lastpty = startpty;
    }
  }

  for (i = 0; i < subpaths.length; i++) {
    curves.push(new PiecewiseCurve(subpaths[i]).toArcLengthParam().fitRange(0, 1));
  }
  return new GraphicsPath._CurveList(curves);
};
/**
 * Creates an array of the disconnected portions of this path.
 * @returns {Array<GraphicsPath>} An array containing a GraphicsPath object
 * for each disconnected portion of this path. Returns an empty
 * array if this path has no subpaths.
 */
GraphicsPath.prototype.getSubpaths = function() {
  const subpaths = [];
  let lastptx = 0;
  let lastpty = 0;

  let first = true;
  let curPath = null;
  let i;
  for (i = 0; i < this.segments.length; i++) {
    const s = this.segments[i];
    const startpt = GraphicsPath._startPoint(s);
    const endpt = GraphicsPath._endPoint(s);
    if(s[0] !== GraphicsPath.CLOSE) {
      if(first || lastptx !== startpt[0] || lastpty !== startpt[1]) {
        curPath = new GraphicsPath().moveTo(startpt[0], startpt[1]);
        subpaths.push(curPath);
        first = false;
      }
      curPath.segments.push(s.slice(0, s.length));
      lastptx = endpt[0];
      lastpty = endpt[1];
      curPath.setEndPos(endpt[0], endpt[1]);
    } else {
      curPath.closePath();
    }
  }
  return subpaths;
};

/**
 * Gets an array of the end points of
 * line segments approximating the path.
 * @param {number} [flatness] When curves and arcs
 * are decomposed to line segments, the
 * segments will be close to the true path of the curve by this
 * value, given in units. If null, undefined, or omitted, default is 1.
 * @returns {Array<Array<number>>} Array of the end points of
 * line segments approximating the path.
 */
GraphicsPath.prototype.getLinePoints = function(flatness) {
  const lines = this.getLines(flatness);
  const points = [];
  let lastx = 0;
  let lasty = 0;
  let i;
  for (i = 0; i < lines.length; i++) {
    const line = lines[i];
    if(i === 0 || lastx !== line[0] || lasty !== line[1]) {
      points.push([line[0], line[1]]);
    }
    points.push([line[2], line[3]]);
    lastx = line[2];
    lasty = line[3];
  }
  return points;
};

/**
 * Gets an array of the end points of
 * line segments approximating the path. The positions will be in the form of objects with
 * two properties: x and y retrieve the X or Y coordinate of each position, respectively.
 * @param {number} [flatness] When curves and arcs
 * are decomposed to line segments, the
 * segments will be close to the true path of the curve by this
 * value, given in units. If null, undefined, or omitted, default is 1.
 * @returns {Array<Array<number>>} Array of the end points of
 * line segments approximating the path.
 * @example <caption>The following example initializes a three.js BufferGeometry with the points retrieved by this method. This example requires the three.js library.</caption>
 * var points=path.getLinePointsAsObjects()
 * var buffer=new THREE.BufferGeometry()
 * .setFromPoints(points);
 */
GraphicsPath.prototype.getLinePointsAsObjects = function(flatness) {
  const lines = this.getLines(flatness);
  const points = [];
  let lastx = 0;
  let lasty = 0;
  let i;
  for (i = 0; i < lines.length; i++) {
    const line = lines[i];
    if(i === 0 || lastx !== line[0] || lasty !== line[1]) {
      points.push({
        "x":line[0],
        "y":line[1]
      });
    }
    points.push({
      "x":line[2],
      "y":line[3]
    });
    lastx = line[2];
    lasty = line[3];
  }
  return points;
};

/**
 * Gets an array of points evenly spaced across the length
 * of the path.
 * @param {number} numPoints Number of points to return.
 * @returns {Array<Array<number>>} Array of points lying on
 * the path and evenly spaced across the length of the path,
 * starting and ending with the path's endPoints. Returns
 * an empty array if <i>numPoints</i> is less than 1. Returns
 * an array consisting of the start point if <i>numPoints</i>
 * is 1.
 */
GraphicsPath.prototype.getPoints = function(numPoints) {
  if(numPoints < 1 || this.segments.length === 0)return [];
  if(numPoints === 1) {
    return [this._start()];
  }
  if(numPoints === 2) {
    return [this._start(), this._end()];
  }
  const curves = this.getCurves();
  const points = [];
  let i;
  for (i = 0; i < numPoints; i++) {
    const t = i / (numPoints - 1);
    const ev = curves.evaluate(t);
    points.push([ev[0], ev[1]]);
  }
  return points;
};

/**
 * Gets an array of points evenly spaced across the length
 * of the path. The positions will be in the form of objects with
 * two properties: x and y retrieve the X or Y coordinate of each position, respectively.
 * @param {number} numPoints Number of points to return.
 * @returns {Array<Array<number>>} Array of points lying on
 * the path and evenly spaced across the length of the path,
 * starting and ending with the path's endPoints. Returns
 * an empty array if <i>numPoints</i> is less than 1. Returns
 * an array consisting of the start point if <i>numPoints</i>
 * is 1.
 * @example <caption>The following example initializes a three.js BufferGeometry with the points retrieved by this method. This example requires the three.js library.</caption>
 * var points=path.getPointsAsObjects(50)
 * var buffer=new THREE.BufferGeometry()
 * .setFromPoints(points);
 */
GraphicsPath.prototype.getPointsAsObjects = function(numPoints) {
  if(numPoints < 1 || this.segments.length === 0)return [];
  if(numPoints === 1) {
    const pt = this._start();
    return [{
      "x":pt[0],
      "y":pt[1]
    }];
  }
  if(numPoints === 2) {
    const pt1 = this._start();
    const pt2 = this._end();
    return [{
      "x":pt1[0],
      "y":pt1[1]
    },
    {
      "x":pt2[0],
      "y":pt2[1]
    }];
  }
  const curves = this.getCurves();
  const points = [];
  let i;
  for (i = 0; i < numPoints; i++) {
    const t = i / (numPoints - 1);
    const ev = curves.evaluate(t);
    points.push({
      "x":ev[0],
      "y":ev[1]
    });
  }
  return points;
};
/**
 * Makes this path closed. Adds a line segment to the
 * path's start position, if necessary.
 * @returns {GraphicsPath} This object.
 */
GraphicsPath.prototype.closePath = function() {
  if(this.startPos[0] !== this.endPos[0] ||
   this.startPos[1] !== this.endPos[1]) {
    this.lineTo(this.startPos[0], this.startPos[1]);
  }
  if(this.segments.length > 0) {
    this.segments.push([GraphicsPath.CLOSE]);
  }
  this.incomplete = false;
  return this;
};

/**
 * Moves the current start position and end position to the given position.
 * @param {number} x X coordinate of the position.
 * @param {number} y Y coordinate of the position.
 * @returns {GraphicsPath} This object.
 */
GraphicsPath.prototype.moveTo = function(x, y) {
  this.startPos[0] = x;
  this.startPos[1] = y;
  this.endPos[0] = x;
  this.endPos[1] = y;
  this.incomplete = false;
  return this;
};
/**
 * Adds a line segment to the path, starting
 * at the path's end position, then
 * sets the end position to the end of the segment.
 * @param {number} x X coordinate of the end of the line segment.
 * @param {number} y Y coordinate of the end of the line segment.
 * @returns {GraphicsPath} This object.
 */
GraphicsPath.prototype.lineTo = function(x, y) {
  this.segments.push([GraphicsPath.LINE,
    this.endPos[0], this.endPos[1], x, y]);
  this.endPos[0] = x;
  this.endPos[1] = y;
  this.incomplete = false;
  return this;
};

/** @ignore
 * @private */
GraphicsPath.prototype.setEndPos = function(x, y) {
  this.endPos[0] = x;
  this.endPos[1] = y;
  return this;
};

/**
 * Gets the current point stored in this path.
 * @returns {Array<number>} A two-element array giving the X and Y coordinates of the current point.
 */
GraphicsPath.prototype.getCurrentPoint = function() {
  return [this.endPos[0], this.endPos[1]];
};

/** @ignore */
GraphicsPath._areCollinear = function(x0, y0, x1, y1, x2, y2) {
  const t1 = x1 - x0;
  const t2 = y1 - y0;
  const t3 = [x2 - x0, y2 - y0];
  const denom = t1 * t1 + t2 * t2;
  if(denom === 0) {
    return true; // first two points are the same
  }
  const t4 = (t1 * t3[0] + t2 * t3[1]) / denom;
  const t5 = [x0 + t4 * t1, y0 + t4 * t2];
  const t6 = [x2 - t5[0], y2 - t5[1]];
  return t6[0] * t6[0] + t6[1] * t6[1] === 0;
};
/**
 * Adds path segments in the form of a circular arc to this path,
 * using the parameterization specified in the "arcTo" method of the
 * HTML Canvas 2D Context.
 * @param {number} x1 X coordinate of a point that, along with the
 * current end point, forms a tangent line. The point where the
 * circle touches this tangent line is the start point of the arc, and if the
 * point isn't the same as the current end point, this method adds
 * a line segment connecting the two points. (Note that the start point
 * of the arc is not necessarily the same as (x1, y1) or the current end point.)
 * @param {number} y1 Y coordinate of the point described under "x1".
 * @param {number} x2 X coordinate of a point that, along with the
 * point (x1, y1), forms a tangent line. The point where the
 * circle touches this tangent line is the end point of the arc. (Note that the
 * end point of the arc is not necessarily the same as (x1, y1) or (x2, y2).)
 * When this method returns, the current end point will be set to the end
 * point of the arc.
 * @param {number} y2 Y coordinate of the point described under "x2".
 * @param {number} radius Radius of the circle the arc forms a part of.
 * @returns {GraphicsPath} This object.
 */
GraphicsPath.prototype.arcTo = function(x1, y1, x2, y2, radius) {
  if(radius < 0) {
    throw new Error("IndexSizeError");
  }
  const x0 = this.endPos[0];
  const y0 = this.endPos[1];
  if(radius === 0 || x0 === x1 && y0 === y1 || x1 === x2 && y1 === y2 ||
   GraphicsPath._areCollinear(x0, y0, x1, y1, x2, y2)) {
    return this.lineTo(x1, y1);
  }
  const t1 = [x0 - x1, y0 - y1];
  const t2 = 1.0 / Math.sqrt(t1[0] * t1[0] + t1[1] * t1[1]);
  const t3 = [t1[0] * t2, t1[1] * t2]; // tangent vector from p1 to p0
  const t4 = [x2 - x1, y2 - y1];
  const t5 = 1.0 / Math.sqrt(t4[0] * t4[0] + t4[1] * t4[1]);
  const t6 = [t4[0] * t5, t4[1] * t5]; // tangent vector from p2 to p1
  const cross = t3[0] * t6[1] - t3[1] * t6[0];
  const t7 = (1.0 + (t3[0] * t6[0] + t3[1] * t6[1])) * radius / Math.abs(cross);
  const t8 = [t3[0] * t7, t3[1] * t7];
  const t10 = [t6[0] * t7, t6[1] * t7];
  const startTangent = [x1 + t8[0], y1 + t8[1]];
  const endTangent = [x1 + t10[0], y1 + t10[1]];
  this.lineTo(startTangent[0], startTangent[1]);
  const sweep = cross < 0;
  return this.arcSvgTo(radius, radius, 0, false, sweep, endTangent[0], endTangent[1]);
};
/**
 * Adds path segments in the form of a circular arc to this path,
 * using the parameterization specified in the "arc" method of the
 * HTML Canvas 2D Context.
 * @param {number} x X coordinate of the center of the circle that the arc forms a part of.
 * @param {number} y Y coordinate of the circle's center.
 * @param {number} radius Radius of the circle.
 * @param {number} startAngle Starting angle of the arc, in radians.
 * 0 means the positive X axis, &pi;/2 means the positive Y axis,
 * &pi; means the negative X axis, and &pi;*1.5 means the negative Y axis.
 * @param {number} endAngle Ending angle of the arc, in radians.
 * @param {boolean} ccw Whether the arc runs counterclockwise
 * (assuming the X axis points right and the Y axis points
 * down under the coordinate system).
 * @returns {GraphicsPath} This object.
 */
GraphicsPath.prototype.arc = function(x, y, radius, startAngle, endAngle, ccw) {
  return this._arcInternal(x, y, radius, startAngle, endAngle, ccw, true);
};
/** @ignore */
GraphicsPath.prototype._arcInternal = function(x, y, radius, startAngle, endAngle, ccw, drawLine) {
  if(radius < 0) {
    throw new Error("IndexSizeError");
  }
  const normStart = GraphicsPath._normAngleRadians(startAngle);
  const normEnd = GraphicsPath._normAngleRadians(endAngle);
  const twopi = Math.PI * 2;
  const cosStart = Math.cos(normStart);
  const sinStart = normStart <= 3.141592653589793 ? Math.sqrt(1.0 - cosStart * cosStart) : -Math.sqrt(1.0 - cosStart * cosStart);
  const cosEnd = Math.cos(normEnd);
  const sinEnd = normEnd <= 3.141592653589793 ? Math.sqrt(1.0 - cosEnd * cosEnd) : -Math.sqrt(1.0 - cosEnd * cosEnd);
  const startX = x + radius * cosStart;
  const startY = y + radius * sinStart;
  const endX = x + radius * cosEnd;
  const endY = y + radius * sinEnd;
  if(drawLine) {
    this.lineTo(startX, startY);
  }
  if(startX === endX && startY === endY && startAngle === endAngle || radius === 0) {
    return this.lineTo(endX, endY);
  }
  if(!ccw && endAngle - startAngle >= twopi ||
   ccw && startAngle - endAngle >= twopi) {
    return this
      ._arcInternal(x, y, radius, startAngle, startAngle + Math.PI, ccw, false)
      ._arcInternal(x, y, radius, startAngle + Math.PI, startAngle + Math.PI * 2, ccw, false)
      ._arcInternal(x, y, radius, normStart, normEnd, ccw, false);
  } else {
    let delta = endAngle - startAngle;
    if(delta >= twopi || delta < 0) {
      const d = delta % twopi;
      if(d === 0 && delta !== 0) {
        return this
          ._arcInternal(x, y, radius, startAngle, startAngle + Math.PI, ccw, false)
          ._arcInternal(x, y, radius, startAngle + Math.PI, startAngle + Math.PI * 2, ccw, false)
          ._arcInternal(x, y, radius, normStart, normEnd, ccw, false);
      }
      delta = d;
    }
    const largeArc = !!(Math.abs(delta) > Math.PI ^ !!ccw ^ startAngle > endAngle);
    const sweep = !!(delta > 0 ^ !!ccw ^ startAngle > endAngle);
    return this.lineTo(startX, startY)
      .arcSvgTo(radius, radius, 0, largeArc, sweep, endX, endY);
  }
};

/**
 * Adds a quadratic B&eacute;zier curve to this path starting
 * at this path's current position. The current position will be
 * the curve's first control point.
 * @param {number} x X coordinate of the curve's second control point.
 * @param {number} y Y coordinate of the curve's second control point.
 * @param {number} x2 X coordinate of the curve's end point (third control point).
 * @param {number} y2 Y coordinate of the curve's end point (third control point).
 * @returns {GraphicsPath} This object.
 */
GraphicsPath.prototype.quadraticCurveTo = function(x, y, x2, y2) {
  this.segments.push([GraphicsPath.QUAD,
    this.endPos[0], this.endPos[1], x, y, x2, y2]);
  this.endPos[0] = x2;
  this.endPos[1] = y2;
  this.incomplete = false;
  return this;
};
/**
 * Adds a cubic B&eacute;zier curve to this path starting
 * at this path's current position. The current position will be
 * the curve's first control point.
 * @param {number} x X coordinate of the curve's second control point.
 * @param {number} y X coordinate of the curve's second control point.
 * @param {number} x2 Y coordinate of the curve's third control point.
 * @param {number} y2 Y coordinate of the curve's third control point.
 * @param {number} x3 X coordinate of the curve's end point (fourth control point).
 * @param {number} y3 Y coordinate of the curve's end point (fourth control point).
 * @returns {GraphicsPath} This object.
 */
GraphicsPath.prototype.bezierCurveTo = function(x, y, x2, y2, x3, y3) {
  this.segments.push([GraphicsPath.CUBIC,
    this.endPos[0], this.endPos[1], x, y, x2, y2, x3, y3]);
  this.endPos[0] = x3;
  this.endPos[1] = y3;
  this.incomplete = false;
  return this;
};

/** @ignore */
GraphicsPath._vecangle = function(a, b, c, d) {
  let dot = a * c + b * d;
  const denom = Math.sqrt(a * a + b * b) * Math.sqrt(c * c + d * d);
  dot /= denom;
  const sgn = a * d - b * c;
  // avoid NaN when dot is just slightly out of range
  // for acos
  if(dot < -1)dot = -1;
  else if(dot > 1)dot = 1;
  let ret = Math.acos(dot);
  if(sgn < 0)ret = -ret;
  return ret;
};
/** @ignore */
GraphicsPath._arcSvgToCenterParam = function(a) {
  const x1 = a[1];
  const y1 = a[2];
  const x2 = a[8];
  const y2 = a[9];
  const rx = a[3];
  const ry = a[4];
  const rot = a[5]; // rotation in radians
  const xmid = (x1 - x2) * 0.5;
  const ymid = (y1 - y2) * 0.5;
  const xpmid = (x1 + x2) * 0.5;
  const ypmid = (y1 + y2) * 0.5;
  const crot = Math.cos(rot);
  const srot = rot >= 0 && rot < 6.283185307179586 ? rot <= 3.141592653589793 ? Math.sqrt(1.0 - crot * crot) : -Math.sqrt(1.0 - crot * crot) : Math.sin(rot);
  const x1p = crot * xmid + srot * ymid;
  const y1p = crot * ymid - srot * xmid;
  const rxsq = rx * rx;
  const rysq = ry * ry;
  const x1psq = x1p * x1p;
  const y1psq = y1p * y1p;
  const rxXy = rxsq * y1psq + rysq * x1psq;
  const cxsqrt = Math.sqrt(Math.max(0, (rxsq * rysq - rxXy) / rxXy));
  let cxp = rx * y1p * cxsqrt / ry;
  let cyp = ry * x1p * cxsqrt / rx;
  if(a[6] === a[7]) {
    cxp = -cxp;
  } else {
    cyp = -cyp;
  }
  const cx = crot * cxp - srot * cyp + xpmid;
  const cy = srot * cxp + crot * cyp + ypmid;
  const vecx = (x1p - cxp) / rx;
  const vecy = (y1p - cyp) / ry;
  const nvecx = (-x1p - cxp) / rx;
  const nvecy = (-y1p - cyp) / ry;
  let cosTheta1 = vecx / Math.sqrt(vecx * vecx + vecy * vecy);
  // avoid NaN when cosTheta1 is just slightly out of range
  // for acos
  if(cosTheta1 < -1)cosTheta1 = -1;
  else if(cosTheta1 > 1)cosTheta1 = 1;
  let theta1 = Math.acos(cosTheta1);
  if(vecy < 0)theta1 = -theta1;
  let delta = GraphicsPath._vecangle(vecx, vecy, nvecx, nvecy);
  delta = delta < 0 ? Math.PI * 2 + delta : delta;
  if(!a[7] && delta > 0) {
    delta -= Math.PI * 2;
  } else if(a[7] && delta < 0) {
    delta += Math.PI * 2;
  }
  delta += theta1;
  return [cx, cy, theta1, delta];
};
GraphicsPath._toRadians = Math.PI / 180;
GraphicsPath._toDegrees = 180.0 / Math.PI;
/** @ignore */
GraphicsPath._arcToBezierCurves = function(cx, cy, rx, ry, rot, angle1, angle2) {
  const crot = Math.cos(rot);
  const srot = rot >= 0 && rot < 6.283185307179586 ? rot <= 3.141592653589793 ? Math.sqrt(1.0 - crot * crot) : -Math.sqrt(1.0 - crot * crot) : Math.sin(rot);
  const arcsize = Math.abs(angle2 - angle1);
  let arcs = 16;
  if(arcsize < Math.PI / 8)arcs = 2;
  else if(arcsize < Math.PI / 4)arcs = 4;
  else if(arcsize < Math.PI / 2)arcs = 6;
  else if(arcsize < Math.PI)arcs = 10;
  const third = 1 / 3;
  let step = (angle2 - angle1) / arcs;
  const ret = [];
  const t5 = Math.tan(step * 0.5);
  const t7 = Math.sin(step) * third * (Math.sqrt(3.0 * t5 * t5 + 4.0) - 1.0);
  step = Math.PI * 2.0 / arcs;
  const cosStep = Math.cos(step);
  const sinStep = step >= 0 && step < 6.283185307179586 ? step <= 3.141592653589793 ? Math.sqrt(1.0 - cosStep * cosStep) : -Math.sqrt(1.0 - cosStep * cosStep) : Math.sin(step);
  let t2 = Math.cos(angle1);
  let t1 = angle1 >= 0 && angle1 < 6.283185307179586 ? angle1 <= 3.141592653589793 ? Math.sqrt(1.0 - t2 * t2) : -Math.sqrt(1.0 - t2 * t2) : Math.sin(angle1);
  let i;
  for (i = 0; i < arcs; i++) {
    const ts = cosStep * t1 + sinStep * t2;
    const tc = cosStep * t2 - sinStep * t1;
    const t3 = ts;
    const t4 = tc;
    const t8 = [cx + rx * crot * t2 - ry * srot * t1, cy + rx * srot * t2 + ry * crot * t1];
    const t9 = [cx + rx * crot * t4 - ry * srot * t3, cy + rx * srot * t4 + ry * crot * t3];
    const t10 = [-rx * crot * t1 - ry * srot * t2, -rx * srot * t1 + ry * crot * t2];
    const t11 = [-rx * crot * t3 - ry * srot * t4, -rx * srot * t3 + ry * crot * t4];
    const t12 = [t8[0] + t10[0] * t7, t8[1] + t10[1] * t7];
    const t13 = [t9[0] - t11[0] * t7, t9[1] - t11[1] * t7];
    ret.push([t8[0], t8[1], t12[0], t12[1], t13[0], t13[1], t9[0], t9[1]]);
    t2 = tc;
    t1 = ts;
  }
  return ret;
};

/**
 * Adds path segments in the form of an elliptical arc to this path,
 * using the parameterization used by the SVG specification.
 * @param {number} rx X axis radius of the ellipse that the arc will
 * be formed from.
 * @param {number} ry Y axis radius of the ellipse that the arc will
 * be formed from.
 * @param {number} rot Rotation of the ellipse in degrees (clockwise
 * assuming the X axis points right and the Y axis points
 * down under the coordinate system).
 * @param {boolean} largeArc In general, there are four possible solutions
 * for arcs given the start and end points, rotation, and x- and y-radii. If true,
 * chooses an arc solution with the larger arc length; if false, smaller.
 * @param {boolean} sweep If true, the arc solution chosen will run
 * clockwise (assuming the X axis points right and the Y axis points
 * down under the coordinate system); if false, counterclockwise.
 * @param {number} x2 X coordinate of the arc's end point.
 * @param {number} y2 Y coordinate of the arc's end point.
 * @returns {GraphicsPath} This object.
 */
GraphicsPath.prototype.arcSvgTo = function(rx, ry, rot, largeArc, sweep, x2, y2) {
  if(rx === 0 || ry === 0) {
    return this.lineTo(x2, y2);
  }
  const x1 = this.endPos[0];
  const y1 = this.endPos[1];
  if(x1 === x2 && y1 === y2) {
    return this;
  }
  rot = rot >= 0 && rot < 360 ? rot : rot % 360 +
       (rot < 0 ? 360 : 0);
  rot *= GraphicsPath._toRadians;
  rx = Math.abs(rx);
  ry = Math.abs(ry);
  const xmid = (x1 - x2) * 0.5;
  const ymid = (y1 - y2) * 0.5;
  const crot = Math.cos(rot);
  const srot = rot >= 0 && rot < 6.283185307179586 ? rot <= 3.141592653589793 ? Math.sqrt(1.0 - crot * crot) : -Math.sqrt(1.0 - crot * crot) : Math.sin(rot);
  const x1p = crot * xmid + srot * ymid;
  const y1p = crot * ymid - srot * xmid;
  let lam = x1p * x1p / (rx * rx) + y1p * y1p / (ry * ry);
  if(lam > 1) {
    lam = Math.sqrt(lam);
    rx *= lam;
    ry *= lam;
  }
  const arc = [GraphicsPath.ARC,
    x1, y1, rx, ry, rot, !!largeArc, !!sweep, x2, y2];
  const cp = GraphicsPath._arcSvgToCenterParam(arc);
  arc[6] = null; // unused
  arc[7] = null; // unused
  arc[10] = cp[0];
  arc[11] = cp[1];
  arc[12] = cp[2];
  arc[13] = cp[3];
  this.segments.push(arc);
  this.endPos[0] = x2;
  this.endPos[1] = y2;
  this.incomplete = false;
  return this;
};
/** @ignore */
GraphicsPath._nextAfterWs = function(str, index) {
  while(index[0] < str.length) {
    const c = str.charCodeAt(index[0]);
    index[0]++;
    if(c === 0x20 || c === 0x0d || c === 0x09 || c === 0x0a)
      continue;
    return c;
  }
  return -1;
};
/** @ignore */
GraphicsPath._nextAfterSepReq = function(str, index) {
  let comma = false;
  let havesep = false;
  while(index[0] < str.length) {
    const c = str.charCodeAt(index[0]);
    index[0]++;
    if(c === 0x20 || c === 0x0d || c === 0x09 || c === 0x0a) {
      havesep = true;
      continue;
    }
    if(!comma && c === 0x2c) {
      havesep = true;
      comma = true;
      continue;
    }
    return !havesep ? -1 : c;
  }
  return -1;
};
/** @ignore */
GraphicsPath._nextAfterSep = function(str, index) {
  let comma = false;
  while(index[0] < str.length) {
    const c = str.charCodeAt(index[0]);
    index[0]++;
    if(c === 0x20 || c === 0x0d || c === 0x09 || c === 0x0a)
      continue;
    if(!comma && c === 0x2c) {
      comma = true;
      continue;
    }
    return c;
  }
  return -1;
};
/** @ignore */
GraphicsPath._peekNextNumber = function(str, index) {
  const oldindex = index[0];
  const ret = GraphicsPath._nextNumber(str, index, true) !== null;
  index[0] = oldindex;
  return ret;
};
/** @ignore */
GraphicsPath._nextNumber = function(str, index, afterSep) {
  const oldindex = index[0];
  let c = afterSep ?
    GraphicsPath._nextAfterSep(str, index) :
    GraphicsPath._nextAfterWs(str, index);
  const startIndex = index[0] - 1;
  let dot = false;
  let digit = false;
  let exponent = false;
  let ret;
  if(c === 0x2e)dot = true;
  else if(c >= 0x30 && c <= 0x39)digit = true;
  else if(c !== 0x2d && c !== 0x2b) { // plus or minus
    index[0] = oldindex;
    return null;
  }
  while(index[0] < str.length) {
    c = str.charCodeAt(index[0]);
    index[0]++;
    if(c === 0x2e) { // dot
      if(dot) {
        index[0] = oldindex;
        return null;
      }
      dot = true;
    } else if(c >= 0x30 && c <= 0x39) {
      digit = true;
    } else if(c === 0x45 || c === 0x65) {
      if(!digit) {
        index[0] = oldindex;
        return null;
      }
      exponent = true;
      break;
    } else {
      if(!digit) {
        index[0] = oldindex;
        return null;
      }
      index[0]--;
      ret = parseFloat(str.substr(startIndex, index[0] - startIndex));
      if(Number.isNaN(ret)) {
        index[0] = ret;
        return null;
      }
      if(ret === Number.POSITIVE_INFINITY || ret === Number.NEGATIVE_INFINITY)
        return 0;
      return ret;
    }
  }
  if(exponent) {
    c = str.charCodeAt(index[0]);
    if(c < 0) {
      index[0] = oldindex;
      return null;
    }
    index[0]++;
    digit = false;
    if(c >= 0x30 && c <= 0x39)digit = true;
    else if(c !== 0x2d && c !== 0x2b) {
      index[0] = oldindex;
      return null;
    }
    while(index[0] < str.length) {
      c = str.charCodeAt(index[0]);
      index[0]++;
      if(c >= 0x30 && c <= 0x39) {
        digit = true;
      } else {
        if(!digit) {
          index[0] = oldindex;
          return null;
        }
        index[0]--;
        ret = parseFloat(str.substr(startIndex, index[0] - startIndex));
        // console.log([str.substr(startIndex,index[0]-startIndex),ret])
        if(Number.isNaN(ret)) {
          index[0] = oldindex;
          return null;
        }
        if(ret === Number.POSITIVE_INFINITY || ret === Number.NEGATIVE_INFINITY)
          return 0;
        return ret;
      }
    }
    if(!digit) {
      index[0] = oldindex;
      return null;
    }
  } else if(!digit) {
    index[0] = oldindex;
    return null;
  }
  ret = parseFloat(str.substr(startIndex, str.length - startIndex));
  if(Number.isNaN(ret)) {
    index[0] = oldindex;
    return null;
  }
  if(ret === Number.POSITIVE_INFINITY || ret === Number.NEGATIVE_INFINITY)
    return 0;
  return ret;
};

/**
 * Returns a modified version of this path that is transformed
 * according to the given affine transformation (a transformation
 * that keeps straight lines straight and parallel lines parallel).
 * @param {Array<number>} trans An array of six numbers
 * describing a 2-dimensional affine transformation. For each
 * point in the current path, its new X coordinate is `trans[0] * X +
 * trans[2] * Y + trans[4]`, and its new Y coordinate is `trans[1] * X +
 * trans[3] * Y + trans[5]`.
 * @returns {GraphicsPath} The transformed version of this path.
 */
GraphicsPath.prototype.transform = function(trans) {
  const ret = new GraphicsPath();
  const a = trans[0];
  const b = trans[1];
  const c = trans[2];
  const d = trans[3];
  const e = trans[4];
  const f = trans[5];
  let x;
  let y;
  let i;
  let j;
  const tmp = [0];
  let oldpos = null;
  for(i = 0; i < this.segments.length; i++) {
    const s = this.segments[i];
    let domove = false;
    if(s[0] !== GraphicsPath.CLOSE) {
      const start = GraphicsPath._startPoint(s);
      if(!oldpos || oldpos[0] !== start[0] || oldpos[1] !== start[1]) {
        domove = true;
      }
      oldpos = GraphicsPath._endPoint(s);
    }
    switch(s[0]) {
    case GraphicsPath.CLOSE:
      ret.closePath();
      oldpos = null;
      break;
    case GraphicsPath.LINE:
    case GraphicsPath.QUAD:
    case GraphicsPath.CUBIC:
      for(j = 1; j < s.length; j += 2) {
        tmp[j] = a * s[j] + c * s[j + 1] + e;
        tmp[j + 1] = b * s[j] + d * s[j + 1] + f;
      }
      if(domove)
        ret.moveTo(tmp[1], tmp[2]);
      if(s[0] === GraphicsPath.LINE)
        ret.lineTo(tmp[3], tmp[4]);
      else if(s[0] === GraphicsPath.QUAD)
        ret.quadraticCurveTo(tmp[3], tmp[4], tmp[5], tmp[6]);
      else if(s[0] === GraphicsPath.CUBIC)
        ret.bezierCurveTo(tmp[3], tmp[4], tmp[5], tmp[6], tmp[7], tmp[8]);
      break;
    case GraphicsPath.ARC: {
      let largeArc;
      let delta;
      if(a === 1 && b === 0 && c === 0 && d === 1) {
        // just a translation
        delta = s[13] - s[12];
        largeArc = Math.abs(delta) > Math.PI;
        if(domove)ret.moveTo(s[1] + e, s[2] + f);
        ret.arcSvgTo(s[3], s[4], s[5] * GraphicsPath._toDegrees,
          largeArc, delta > 0, s[8] + e, s[9] + f);
        break;
      }
      if(b === 0 && c === 0 && s[5] === 0) {
        // any scale and ellipse rotation 0
        delta = s[13] - s[12];
        largeArc = Math.abs(delta) > Math.PI;
        if(domove)ret.moveTo(a * s[1] + e, d * s[2] + f);
        ret.arcSvgTo(a * s[3], d * s[4], 0,
          largeArc, delta > 0, a * s[8] + e, d * s[9] + f);
        break;
      }
      const curves = GraphicsPath._arcToBezierCurves(s[10], s[11], s[3], s[4], s[5], s[12], s[13]);
      curves[0][0] = s[1];
      curves[0][1] = s[2];
      curves[curves.length - 1][6] = s[8];
      curves[curves.length - 1][7] = s[9];
      for(j = 0; j < curves.length; j++) {
        const cs = curves[j];
        let k;
        for (k = 0; k < 8; k += 2) {
          x = a * cs[k] + c * cs[k + 1] + e;
          y = b * cs[k] + d * cs[k + 1] + f;
          cs[k] = x;
          cs[k + 1] = y;
        }
        if(domove && j === 0)ret.moveTo(cs[0], cs[1]);
        ret.bezierCurveTo(cs[2], cs[3], cs[4], cs[5], cs[6], cs[7]);
      }
      break;
    }
    default:
      break;
    }
  }
  return ret;
};

/**
 * Adds path segments to this path that form an axis-aligned rectangle.
 * @param {number} x X coordinate of the rectangle's upper-left corner (assuming the
 * coordinate system's X axis points right and the Y axis down).
 * @param {number} y Y coordinate of the rectangle's upper-left corner (assuming the
 * coordinate system's X axis points right and the Y axis down).
 * @param {number} w Width of the rectangle.
 * @param {number} h Height of the rectangle.
 * @returns {GraphicsPath} This object. If "w" or "h" is 0, no path segments will be appended.
 */
GraphicsPath.prototype.rect = function(x, y, w, h) {
  if(w < 0 || h < 0)return this;
  return this.moveTo(x, y)
    .lineTo(x + w, y)
    .lineTo(x + w, y + h)
    .lineTo(x, y + h)
    .closePath();
};

/**
 * Adds a line segment to this path.
 * @param {number} x0 X coordinate of the line segment's starting point.
 * The <code>moveTo</code> method will be called on the starting point.
 * @param {number} y0 Y coordinate of the line segment's starting point.
 * @param {number} x1 X coordinate of the line segment's ending point.
 * The <code>lineTo</code> method will be called on the ending point.
 * @param {number} y1 X coordinate of the line segment's ending point.
 * @returns {GraphicsPath} This object.
 */
GraphicsPath.prototype.line = function(x0, y0, x1, y1) {
  return this.moveTo(x0, y0).lineTo(x1, y1);
};
/**
 * Adds path segments to this path that form a polygon or a connected line segment strand.
 * @param {Array<number>} pointCoords An array of numbers containing the X and Y coordinates
 * of each point in the sequence of line segments. Each pair of numbers gives the X and Y
 * coordinates, in that order, of one of the points in the sequence.
 * The number of elements in the array must be even. If two or more pairs of numbers are given, line
 * segments will connect each point given (except the last) to the next point given.
 * @param {number} closed If "true", the sequence of points describes a closed polygon and a command
 * to close the path will be added to the path (even if only one pair of numbers is given in "pointCoords").
 * @returns {GraphicsPath} This object. If "pointCoords" is empty, no path segments will be appended.
 * Throws an error if "pointCoords" has an odd length.
 */
GraphicsPath.prototype.polyline = function(pointCoords, closed) {
  const closedValue = typeof closed !== "undefined" && closed !== null ? closed : false;
  if(pointCoords.length === 0)return this;
  if(pointCoords.length % 2 !== 0)throw new Error();
  this.moveTo(pointCoords[0], pointCoords[1]);
  let i;
  for (i = 2; i < pointCoords.length; i += 2) {
    this.lineTo(pointCoords[i], pointCoords[i + 1]);
  }
  if(closedValue)this.closePath();
  return this;
};

/**
 * Adds path segments to this path that form an axis-aligned rounded rectangle.
 * @param {number} x X coordinate of the rectangle's upper-left corner (assuming the
 * coordinate system's X axis points right and the Y axis down).
 * @param {number} y Y coordinate of the rectangle's upper-left corner (assuming the
 * coordinate system's X axis points right and the Y axis down).
 * @param {number} w Width of the rectangle.
 * @param {number} h Height of the rectangle.
 * @param {number} arccx Horizontal extent (from end to end) of the ellipse formed by each arc that makes
 * up the rectangle's corners.
 * Will be adjusted to be not less than 0 and not greater than "w".
 * @param {number} arccy Vertical extent (from end to end) of the ellipse formed by each arc that makes
 * up the rectangle's corners.
 * Will be adjusted to be not less than 0 and not greater than "h".
 * @returns {GraphicsPath} This object. If "w" or "h" is less than 0, no path segments will be appended.
 */
GraphicsPath.prototype.roundRect = function(x, y, w, h, arccx, arccy) {
  if(w < 0 || h < 0)return this;
  let px;
  let py;
  arccx = Math.min(w, Math.max(0, arccx));
  arccy = Math.min(h, Math.max(0, arccy));
  const harccx = arccx * 0.5;
  const harccy = arccy * 0.5;
  px = x + harccx;
  py = y;
  this.moveTo(px, py);
  px += w - arccx;
  this.lineTo(px, py);
  px += harccx;
  py += harccy;
  this.arcSvgTo(harccx, harccy, 0, false, true, px, py);
  py += h - arccy;
  this.lineTo(px, py);
  px -= harccx;
  py += harccy;
  this.arcSvgTo(harccx, harccy, 0, false, true, px, py);
  px -= w - arccx;
  this.lineTo(px, py);
  px -= harccx;
  py -= harccy;
  this.arcSvgTo(harccx, harccy, 0, false, true, px, py);
  py -= h - arccy;
  this.lineTo(px, py);
  px += harccx;
  py -= harccy;
  this.arcSvgTo(harccx, harccy, 0, false, true, px, py);
  this.closePath();
  return this;
};

/**
 * Adds path segments to this path that form an axis-aligned rectangle with beveled corners.
 * @param {number} x X coordinate of the rectangle's upper-left corner (assuming the
 * coordinate system's X axis points right and the Y axis down).
 * @param {number} y Y coordinate of the rectangle's upper-left corner (assuming the
 * coordinate system's X axis points right and the Y axis down).
 * @param {number} w Width of the rectangle.
 * @param {number} h Height of the rectangle.
 * @param {number} arccx Horizontal extent (from end to end) of the rectangle's corners.
 * Will be adjusted to be not less than 0 and not greater than "w".
 * @param {number} arccy Vertical extent (from end to end) of the rectangle's corners.
 * Will be adjusted to be not less than 0 and not greater than "h".
 * @returns {GraphicsPath} This object. If "w" or "h" is less than 0, no path segments will be appended.
 */
GraphicsPath.prototype.bevelRect = function(x, y, w, h, arccx, arccy) {
  if(w < 0 || h < 0)return this;
  let px;
  let py;
  arccx = Math.min(w, Math.max(0, arccx));
  arccy = Math.min(h, Math.max(0, arccy));
  const harccx = arccx * 0.5;
  const harccy = arccy * 0.5;
  px = x + harccx;
  py = y;
  this.moveTo(px, py);
  px += w - arccx;
  this.lineTo(px, py);
  px += harccx;
  py += harccy;
  this.lineTo(px, py);
  py += h - arccy;
  this.lineTo(px, py);
  px -= harccx;
  py += harccy;
  this.lineTo(px, py);
  px -= w - arccx;
  this.lineTo(px, py);
  px -= harccx;
  py -= harccy;
  this.lineTo(px, py);
  py -= h - arccy;
  this.lineTo(px, py);
  px += harccx;
  py -= harccy;
  this.lineTo(px, py);
  this.closePath();
  return this;
};
/**
 * Adds path segments to this path that form an axis-aligned ellipse given its center
 * and dimensions.
 * @param {number} cx X coordinate of the ellipse's center.
 * @param {number} cy Y coordinate of the ellipse's center.
 * @param {number} w Width of the ellipse's bounding box.
 * @param {number} h Height of the ellipse's bounding box.
 * @returns {GraphicsPath} This object. If "w" or "h" is 0, no path segments will be appended.
 */
GraphicsPath.prototype.ellipse = function(cx, cy, w, h) {
  if(w < 0 || h < 0)return this;
  const hw = w * 0.5;
  const hh = h * 0.5;
  const px = cx + hw;
  return this.moveTo(px, cy)
    .arcSvgTo(hw, hh, 0, false, true, px - w, cy)
    .arcSvgTo(hw, hh, 0, false, true, px, cy)
    .closePath();
};
/**
 * Adds path segments to this path that form an axis-aligned ellipse, given the ellipse's corner point
 * and dimensions.
 * @param {number} x X coordinate of the ellipse's bounding box's upper-left corner (assuming the
 * coordinate system's X axis points right and the Y axis down).
 * @param {number} y Y coordinate of the ellipse's bounding box's upper-left corner (assuming the
 * coordinate system's X axis points right and the Y axis down).
 * @param {number} w Width of the ellipse's bounding box.
 * @param {number} h Height of the ellipse's bounding box.
 * @returns {GraphicsPath} This object. If "w" or "h" is 0, no path segments will be appended.
 */
GraphicsPath.prototype.ellipseForBox = function(x, y, w, h) {
  return this.ellipse(x + w * 0.5, y + h * 0.5, w, h);
};
/**
 * Adds path segments to this path that form an arc running along an axis-aligned
 * ellipse, or a shape based on that arc and ellipse, given the ellipse's center
 * and dimensions, start angle, and sweep angle.
 * @param {number} x X coordinate of the ellipse's center.
 * @param {number} y Y coordinate of the ellipse's center.
 * @param {number} w Width of the ellipse's bounding box.
 * @param {number} h Height of the ellipse's bounding box.
 * @param {number} start Starting angle of the arc, in degrees.
 * 0 means the positive X axis, 90 means the positive Y axis,
 * 180 means the negative X axis, and 270 means the negative Y axis.
 * @param {number} sweep Length of the arc in degrees. Can be positive or negative. Can be greater than 360 or
 * less than -360, in which case the arc will wrap around the ellipse multiple times. Assuming
 * the coordinate system's X axis points right and the Y axis down, positive angles run
 * clockwise and negative angles counterclockwise.
 * @param {number} type Type of arc to append to the path. If 0,
 * will append an unclosed arc. If 1, will append an elliptical segment to the path
 * (the arc and a line segment connecting its ends). If 2,
 * will append a "pie slice" to the path (the arc and two line segments connecting
 * each end of the arc to the ellipse's center).
 * @returns {GraphicsPath} This object. If "w" or "h" is 0, no path segments will be appended.
 */
GraphicsPath.prototype.arcShape = function(x, y, w, h, start, sweep, type) {
  if(w < 0 || h < 0)return this;
  const pidiv180 = Math.PI / 180;
  const e = start + sweep;
  const hw = w * 0.5;
  const hh = h * 0.5;
  const eRad = (e >= 0 && e < 360 ? e : e % 360 + (e < 0 ? 360 : 0)) * pidiv180;
  const startRad = (start >= 0 && start < 360 ? start : start % 360 + (start < 0 ? 360 : 0)) * pidiv180;
  const cosEnd = Math.cos(eRad);
  const sinEnd = eRad <= 3.141592653589793 ? Math.sqrt(1.0 - cosEnd * cosEnd) : -Math.sqrt(1.0 - cosEnd * cosEnd);
  const cosStart = Math.cos(startRad);
  const sinStart = startRad <= 3.141592653589793 ? Math.sqrt(1.0 - cosStart * cosStart) : -Math.sqrt(1.0 - cosStart * cosStart);
  this.moveTo(x + cosStart * hw, y + sinStart * hh);
  let angleInit;
  let angleStep;
  let cw;
  if(sweep > 0) {
    angleInit = start + 180;
    angleStep = 180;
    cw = true;
  } else {
    angleInit = start - 180;
    angleStep = -180;
    cw = false;
  }
  let a;
  for (a = angleInit; cw ? a < e : a > e; a += angleStep) {
    const angleRad = (a >= 0 && a < 360 ? a : a % 360 + (a < 0 ? 360 : 0)) * pidiv180;
    const cosAng = Math.cos(angleRad);
    const sinAng = angleRad <= 3.141592653589793 ? Math.sqrt(1.0 - cosAng * cosAng) : -Math.sqrt(1.0 - cosAng * cosAng);
    this.arcSvgTo(hw, hh, 0, false, cw, x + cosAng * hw, y + sinAng * hh);
  }
  this.arcSvgTo(hw, hh, 0, false, cw, x + cosEnd * hw, y + sinEnd * hh);
  if(type === 2) {
    this.lineTo(x, y).closePath();
  } else if(type === 1) {
    this.closePath();
  }
  return this;
};
/**
 * Adds path segments to this path that form an arc running along an axis-aligned
 * ellipse, or a shape based on that arc and ellipse, given the ellipse's corner point
 * and dimensions, start angle, and sweep angle.
 * @param {number} x X coordinate of the ellipse's bounding box's upper-left corner (assuming the
 * coordinate system's X axis points right and the Y axis down).
 * @param {number} y Y coordinate of the ellipse's bounding box's upper-left corner (assuming the
 * coordinate system's X axis points right and the Y axis down).
 * @param {number} w Width of the ellipse's bounding box.
 * @param {number} h Height of the ellipse's bounding box.
 * @param {number} start Starting angle of the arc, in degrees.
 * 0 means the positive X axis, 90 means the positive Y axis,
 * 180 means the negative X axis, and 270 means the negative Y axis.
 * @param {number} sweep Length of the arc in degrees. Can be greater than 360 or
 * less than -360, in which case the arc will wrap around the ellipse multiple times. Assuming
 * the coordinate system's X axis points right and the Y axis down, positive angles run
 * clockwise and negative angles counterclockwise.
 * @param {number} type Type of arc to append to the path. If 0,
 * will append an unclosed arc. If 1, will append an elliptical segment to the path
 * (the arc and a line segment connecting its ends). If 2,
 * will append a "pie slice" to the path (the arc and two line segments connecting
 * each end of the arc to the ellipse's center).
 * @returns {GraphicsPath} This object. If "w" or "h" is 0, no path segments will be appended.
 */
GraphicsPath.prototype.arcShapeForBox = function(x, y, w, h, start, sweep, type) {
  return this.arcShape(x + w * 0.5, y + h * 0.5, w, h, start, sweep, type);
};
/**
 * Adds path segments to this path in the form of an arrow shape.
 * @param {number} x0 X coordinate of the arrow's tail, at its very end.
 * @param {number} y0 Y coordinate of the arrow's tail, at its very end.
 * @param {number} x1 X coordinate of the arrow's tip.
 * @param {number} y1 Y coordinate of the arrow's tip.
 * @param {number} headWidth Width of the arrowhead's base from side to side.
 * @param {number} headLength Length of the arrowhead from its tip to its base.
 * @param {number} tailWidth Width of the arrow's tail from side to side
 * @returns {GraphicsPath} This object. Nothing will be added to the path if the distance
 * from (x0, y0) and (x1, y1) is 0 or extremely close to 0.
 */
GraphicsPath.prototype.arrow = function(x0, y0, x1, y1, headWidth, headLength, tailWidth) {
  const dx = x1 - x0;
  const dy = y1 - y0;
  const arrowLen = Math.sqrt(dx * dx + dy * dy);
  if(arrowLen === 0)return this;
  const halfTailWidth = tailWidth * 0.5;
  const halfHeadWidth = headWidth * 0.5;
  const invArrowLen = 1.0 / arrowLen;
  const cosRot = dx * invArrowLen;
  const sinRot = dy * invArrowLen;
  headLength = Math.min(headLength, arrowLen);
  const shaftLength = arrowLen - headLength;
  let x;
  let y;
  this.moveTo(x0, y0);
  x = halfTailWidth * sinRot + x0;
  y = -halfTailWidth * cosRot + y0;
  this.lineTo(x, y);
  x = shaftLength * cosRot + halfTailWidth * sinRot + x0;
  y = shaftLength * sinRot - halfTailWidth * cosRot + y0;
  this.lineTo(x, y);
  x = shaftLength * cosRot + halfHeadWidth * sinRot + x0;
  y = shaftLength * sinRot - halfHeadWidth * cosRot + y0;
  this.lineTo(x, y).lineTo(x1, y1);
  x = shaftLength * cosRot - halfHeadWidth * sinRot + x0;
  y = shaftLength * sinRot + halfHeadWidth * cosRot + y0;
  this.lineTo(x, y);
  x = shaftLength * cosRot - halfTailWidth * sinRot + x0;
  y = shaftLength * sinRot + halfTailWidth * cosRot + y0;
  this.lineTo(x, y);
  x = -halfTailWidth * sinRot + x0;
  y = halfTailWidth * cosRot + y0;
  this.lineTo(x, y);
  this.closePath();
  return this;
};
/**
 * Adds path segments to this path that form a regular polygon.
 * @param {number} cx X coordinate of the center of the polygon.
 * @param {number} cy Y coordinate of the center of the polygon.
 * @param {number} sides Number of sides the polygon has. Nothing will be added to the path if this
 * value is 2 or less.
 * @param {number} radius Radius from the center to each vertex of the polygon.
 * @param {number} [phaseInDegrees] Starting angle of the first vertex of the polygon, in degrees.
 * 0 means the positive X axis, 90 means the positive Y axis,
 * 180 means the negative X axis, and 270 means the negative Y axis.
 * If null, undefined, or omitted, the default is 0.
 * @returns {GraphicsPath} This object.
 */
GraphicsPath.prototype.regularPolygon = function(cx, cy, sides, radius, phaseInDegrees) {
  if(sides <= 2)return this;
  let phase = typeof phaseInDegrees === "undefined" || phaseInDegrees === null ? phaseInDegrees : 0;
  phase = phase >= 0 && phase < 360 ? phase : phase % 360 +
       (phase < 0 ? 360 : 0);
  phase *= MathUtil.ToRadians;
  const angleStep = MathUtil.PiTimes2 / sides;
  const cosStep = Math.cos(angleStep);
  const sinStep = angleStep <= 3.141592653589793 ? Math.sqrt(1.0 - cosStep * cosStep) : -Math.sqrt(1.0 - cosStep * cosStep);
  let c = Math.cos(phase);
  let s = phase <= 3.141592653589793 ? Math.sqrt(1.0 - c * c) : -Math.sqrt(1.0 - c * c);
  let i;
  for (i = 0; i < sides; i++) {
    const x = cx + c * radius;
    const y = cy + s * radius;
    if(i === 0) {
      this.moveTo(x, y);
    } else {
      this.lineTo(x, y);
    }
    const ts = cosStep * s + sinStep * c;
    const tc = cosStep * c - sinStep * s;
    s = ts;
    c = tc;
  }
  return this.closePath();
};
/**
 * Adds path segments to this path that form a regular N-pointed star.
 * @param {number} cx X coordinate of the center of the star.
 * @param {number} cy Y coordinate of the center of the star.
 * @param {number} points Number of points the star has. Nothing will be added to the path if this
 * value is 0 or less.
 * @param {number} radiusOut Radius from the center to each outer vertex of the star.
 * @param {number} radiusIn Radius from the center to each inner vertex of the star.
 * @param {number} phaseInDegrees Starting angle of the first vertex of the polygon, in degrees.
 * 0 means the positive X axis, 90 means the positive Y axis,
 * 180 means the negative X axis, and 270 means the negative Y axis.
 * @returns {GraphicsPath} This object.
 */
GraphicsPath.prototype.regularStar = function(cx, cy, points, radiusOut, radiusIn, phaseInDegrees) {
  if(points <= 0)return this;
  let phase = phaseInDegrees || 0;
  phase = phase >= 0 && phase < 360 ? phase : phase % 360 +
       (phase < 0 ? 360 : 0);
  phase *= MathUtil.ToRadians;
  const sides = points * 2;
  const angleStep = MathUtil.PiTimes2 / sides;
  const cosStep = Math.cos(angleStep);
  const sinStep = angleStep <= 3.141592653589793 ? Math.sqrt(1.0 - cosStep * cosStep) : -Math.sqrt(1.0 - cosStep * cosStep);
  let c = Math.cos(phase);
  let s = phase <= 3.141592653589793 ? Math.sqrt(1.0 - c * c) : -Math.sqrt(1.0 - c * c);
  let i;
  for (i = 0; i < sides; i++) {
    const radius = (i & 1) === 0 ? radiusOut : radiusIn;
    const x = cx + c * radius;
    const y = cy + s * radius;
    if(i === 0) {
      this.moveTo(x, y);
    } else {
      this.lineTo(x, y);
    }
    const ts = cosStep * s + sinStep * c;
    const tc = cosStep * c - sinStep * s;
    s = ts;
    c = tc;
  }
  return this.closePath();
};
/**
 * Creates a graphics path from a string whose format follows
 * the SVG (Scalable Vector Graphics) specification.
 * @param {string} str A string, in the SVG path format, representing
 * a two-dimensional path. An SVG path consists of a number of
 * path segments, starting with a single letter, as follows:
 * <ul>
 * <li>M/m (x y) - Moves the current position to (x, y). Further
 * XY pairs specify line segments.
 * <li>L/l (x y) - Specifies line segments to the given XY points.
 * <li>H/h (x) - Specifies horizontal line segments to the given X points.
 * <li>V/v (y) - Specifies vertical line segments to the given Y points.
 * <li>Q/q (cx cx x y) - Specifies quadratic B&eacute;zier curves
 * (see quadraticCurveTo).
 * <li>T/t (x y) - Specifies quadratic curves tangent to the previous
 * quadratic curve.
 * <li>C/c (c1x c1y c2x c2y x y) - Specifies cubic B&eacute;zier curves
 * (see bezierCurveTo).
 * <li>S/s (c2x c2y x y) - Specifies cubic curves tangent to the previous
 * cubic curve.
 * <li>A/a (rx ry rot largeArc sweep x y) - Specifies arcs (see arcSvgTo).
 * "largeArc" and "sweep" are flags, "0" for false and "1" for true.
 * "rot" is in degrees.
 * <li>Z/z - Closes the current path; similar to adding a line segment
 * to the first XY point given in the last M/m command.
 * </ul>
 * Lower-case letters mean any X and Y coordinates are relative
 * to the current position of the path. Each group of parameters
 * can be repeated in the same path segment. Each parameter after
 * the starting letter is separated by whitespace and/or a single comma,
 * and the starting letter can be separated by whitespace.
 * This separation can be left out as long as doing so doesn't
 * introduce ambiguity. All commands set the current point
 * to the end of the path segment (including Z/z, which adds a line
 * segment if needed). Examples of this parameter are "M50,50L100,100,100,150,150,200", "M50,20C230,245,233,44,22,44", and "M50,50H80V60H50V70H50"
 * @returns {GraphicsPath} The resulting path. If an error
 * occurs while parsing the path, the path's "isIncomplete()" method
 * will return <code>true</code>.
 * @example <caption>The following example creates a graphics path
 * from an SVG string describing a polyline.</caption>
 * var path=GraphicsPath.fromString("M10,20L40,30,24,32,55,22")
 * @example <caption>The following example creates a graphics path
 * from an SVG string describing a curved path.</caption>
 * var path=GraphicsPath.fromString("M50,20C230,245,233,44,22,44")
 */
GraphicsPath.fromString = function(str) {
  const index = [0];
  let started = false;
  const ret = new GraphicsPath();
  let failed = false;
  let endx;
  let endy;
  let sep;
  let curx;
  let cury;
  let x;
  let y;
  let curpt;
  let x2;
  let y2;
  let xcp;
  let ycp;
  while(!failed && index[0] < str.length) {
    const c = GraphicsPath._nextAfterWs(str, index);
    if(!started && c !== 0x4d && c !== 0x6d) {
      // not a move-to command when path
      // started
      failed = true; break;
    }
    // NOTE: Doesn't implement SVG2 meaning of Z
    // command yet because it's not yet fully specified
    switch(c) {
    case 0x5a:case 0x7a:{ // 'Z', 'z'
      ret.closePath();
      break;
    }
    case 0x4d:case 0x6d:{ // 'M', 'm'
      sep = false;
      for (;;) {
        curx = c === 0x6d ? ret.endPos[0] : 0;
        cury = c === 0x6d ? ret.endPos[1] : 0;
        x = GraphicsPath._nextNumber(str, index, sep);
        if(typeof x === "undefined" || x === null) {
          if(!sep)failed = true; break;
        }
        y = GraphicsPath._nextNumber(str, index, true);
        if(typeof y === "undefined" || y === null) {
          failed = true; break;
        }
        // console.log([x,y])
        if(sep)ret.lineTo(curx + x, cury + y);
        else ret.moveTo(curx + x, cury + y);
        sep = true;
      }
      started = true;
      break;
    }
    case 0x4c:case 0x6c:{ // 'L', 'l'
      sep = false;
      for (;;) {
        curx = c === 0x6c ? ret.endPos[0] : 0;
        cury = c === 0x6c ? ret.endPos[1] : 0;
        x = GraphicsPath._nextNumber(str, index, sep);
        if(typeof x === "undefined" || x === null) {
          if(!sep)failed = true; break;
        }
        y = GraphicsPath._nextNumber(str, index, true);
        if(typeof y === "undefined" || y === null) {
          failed = true; break;
        }
        ret.lineTo(curx + x, cury + y);
        sep = true;
      }
      break;
    }
    case 0x48:case 0x68:{ // 'H', 'h'
      sep = false;
      for (;;) {
        curpt = c === 0x68 ? ret.endPos[0] : 0;
        x = GraphicsPath._nextNumber(str, index, sep);
        if(typeof x === "undefined" || x === null) {
          if(!sep)failed = true; break;
        }
        ret.lineTo(curpt + x, ret.endPos[1]);
        sep = true;
      }
      break;
    }
    case 0x56:case 0x76:{ // 'V', 'v'
      sep = false;
      for (;;) {
        curpt = c === 0x76 ? ret.endPos[1] : 0;
        x = GraphicsPath._nextNumber(str, index, sep);
        if(typeof x === "undefined" || x === null) {
          if(!sep)failed = true; break;
        }
        ret.lineTo(ret.endPos[0], curpt + x);
        sep = true;
      }
      break;
    }
    case 0x43:case 0x63:{ // 'C', 'c'
      sep = false;
      for (;;) {
        curx = c === 0x63 ? ret.endPos[0] : 0;
        cury = c === 0x63 ? ret.endPos[1] : 0;
        x = GraphicsPath._nextNumber(str, index, sep);
        if(typeof x === "undefined" || x === null) {
          if(!sep)failed = true; break;
        }

        const arr = [];
        let k;
        for (k = 0; k < 5; k++) {
          arr[k] = GraphicsPath._nextNumber(str, index, true);
          if(typeof arr[k] === "undefined" || arr[k] === null) {
            failed = true; break;
          }
        }
        if(failed)break;
        y = arr[0]; x2 = arr[1]; y2 = arr[2]; const x3 = arr[3]; const y3 = arr[4];
        ret.bezierCurveTo(curx + x, cury + y, curx + x2, cury + y2,
          curx + x3, cury + y3);
        sep = true;
      }
      break;
    }
    case 0x51:case 0x71:{ // 'Q', 'q'
      sep = false;
      for (;;) {
        curx = c === 0x71 ? ret.endPos[0] : 0;
        cury = c === 0x71 ? ret.endPos[1] : 0;
        x = GraphicsPath._nextNumber(str, index, sep);
        if(typeof x === "undefined" || x === null) {
          if(!sep)failed = true; break;
        }
        y = GraphicsPath._nextNumber(str, index, true);
        if(typeof y === "undefined" || y === null) {
          failed = true; break;
        }
        x2 = GraphicsPath._nextNumber(str, index, true);
        if(typeof x2 === "undefined" || x2 === null) {
          failed = true; break;
        }
        y2 = GraphicsPath._nextNumber(str, index, true);
        if(typeof y2 === "undefined" || y2 === null) {
          failed = true; break;
        }
        ret.quadraticCurveTo(curx + x, cury + y, curx + x2, cury + y2);
        sep = true;
      }
      break;
    }
    case 0x41:case 0x61:{ // 'A', 'a'
      sep = false;
      for (;;) {
        curx = c === 0x61 ? ret.endPos[0] : 0;
        cury = c === 0x61 ? ret.endPos[1] : 0;
        x = GraphicsPath._nextNumber(str, index, sep);
        if(typeof x === "undefined" || x === null) {
          if(!sep)failed = true; break;
        }
        y = GraphicsPath._nextNumber(str, index, true);
        if(typeof y === "undefined" || y === null) {
          failed = true; break;
        }
        const rot = GraphicsPath._nextNumber(str, index, true);
        if(typeof rot === "undefined" || rot === null) {
          failed = true; break;
        }
        const largeArc = GraphicsPath._nextAfterSepReq(str, index);
        const sweep = GraphicsPath._nextAfterSep(str, index);
        if(largeArc === -1 || sweep === -1) {
          failed = true; break;
        }
        x2 = GraphicsPath._nextNumber(str, index, true);
        if(typeof x2 === "undefined" || x2 === null) {
          failed = true; break;
        }
        y2 = GraphicsPath._nextNumber(str, index, true);
        if(typeof y2 === "undefined" || y2 === null) {
          failed = true; break;
        }
        ret.arcSvgTo(x + curx, y + cury, rot, largeArc !== 0x30,
          sweep !== 0x30, x2 + curx, y2 + cury);
        sep = true;
      }
      break;
    }
    case 0x53:case 0x73:{ // 'S', 's'
      sep = false;
      for (;;) {
        curx = c === 0x73 ? ret.endPos[0] : 0;
        cury = c === 0x73 ? ret.endPos[1] : 0;
        x = GraphicsPath._nextNumber(str, index, sep);
        if(typeof x === "undefined" || x === null) {
          if(!sep)failed = true; break;
        }
        y = GraphicsPath._nextNumber(str, index, true);
        if(typeof y === "undefined" || y === null) {
          failed = true; break;
        }
        x2 = GraphicsPath._nextNumber(str, index, true);
        if(typeof x2 === "undefined" || x2 === null) {
          failed = true; break;
        }
        y2 = GraphicsPath._nextNumber(str, index, true);
        if(typeof y2 === "undefined" || y2 === null) {
          failed = true; break;
        }
        // second control point to use if previous segment is not a cubic
        xcp = ret.endPos[0];
        ycp = ret.endPos[1];
        endx = ret.endPos[0];
        endy = ret.endPos[1];
        // NOTE: If previous segment is not a cubic, second control
        // point is same as current point.
        if(ret.segments.length > 0 &&
        ret.segments[ret.segments.length - 1][0] === GraphicsPath.CUBIC) {
          xcp = ret.segments[ret.segments.length - 1][5];
          ycp = ret.segments[ret.segments.length - 1][6];
        }
        ret.bezierCurveTo(2 * endx - xcp, 2 * endy - ycp, x + curx, y + cury, x2 + curx, y2 + cury);
        sep = true;
      }
      break;
    }
    case 0x54:case 0x74:{ // 'T', 't'
      sep = false;
      for (;;) {
        curx = c === 0x74 ? ret.endPos[0] : 0;
        cury = c === 0x74 ? ret.endPos[1] : 0;
        x = GraphicsPath._nextNumber(str, index, sep);
        if(typeof x === "undefined" || x === null) {
          if(!sep)failed = true; break;
        }
        y = GraphicsPath._nextNumber(str, index, true);
        if(typeof y === "undefined" || y === null) {
          failed = true; break;
        }
        xcp = ret.endPos[0]; // control point to use if previous segment is not a quad
        ycp = ret.endPos[1];
        endx = ret.endPos[0];
        endy = ret.endPos[1];
        // NOTE: If previous segment is not a quad, first control
        // point is same as current point.
        if(ret.segments.length > 0 &&
        ret.segments[ret.segments.length - 1][0] === GraphicsPath.QUAD) {
          xcp = ret.segments[ret.segments.length - 1][3];
          ycp = ret.segments[ret.segments.length - 1][4];
        }
        ret.quadraticCurveTo(2 * endx - xcp, 2 * endy - ycp, x + curx, y + cury);
        sep = true;
      }
      break;
    }
    default:
      ret.incomplete = true;
      return ret;
    }
  }
  if(failed)ret.incomplete = true;
  return ret;
};

Triangulate._CONVEX = 1;
Triangulate._EAR = 2;
Triangulate._REFLEX = 3;

const EPSILON = 1.1102230246251565e-16;
const ORIENT_ERROR_BOUND_2D = (3.0 + 16.0 * EPSILON) * EPSILON;

// orient2D was
// Adapted by Peter O. from the HE_Mesh library
// written by Frederik Vanhoutte.

function orient2D(pa, pb, pc) {
  let detsum;

  const detleft = (pa[0] - pc[0]) * (pb[1] - pc[1]);

  const detright = (pa[1] - pc[1]) * (pb[0] - pc[0]);

  const det = detleft - detright;
  if (detleft > 0.0) {
    if (detright <= 0.0) {
      return det < 0 ? -1 : det === 0 ? 0 : 1;
    } else {
      detsum = detleft + detright;
    }
  } else if (detleft < 0.0) {
    if (detright >= 0.0) {
      return det < 0 ? -1 : det === 0 ? 0 : 1;
    } else {
      detsum = -detleft - detright;
    }
  } else {
    return det < 0 ? -1 : det === 0 ? 0 : 1;
  }

  const errbound = ORIENT_ERROR_BOUND_2D * detsum;
  if (det >= errbound || -det >= errbound) {
    return det < 0 ? -1 : det === 0 ? 0 : 1;
  }
  /* TODO: use higher precision math for:
    detleft = (pa[0] - pc[0]) * (pb[1] - pc[1]);
    detright = (pa[1] - pc[1]) * (pb[0] - pc[0]);
    det = detleft - detright;
    return sgn(det); */
  return 0;
}

/** @ignore */
Triangulate._pointInTri = function(i1, i2, i3, p) {
  if(p[0] === i1[0] && p[1] === i1[1])return false;
  if(p[0] === i2[0] && p[1] === i2[1])return false;
  if(p[0] === i3[0] && p[1] === i3[1])return false;
  const t3 = i2[0] - i3[0];
  const t4 = i2[1] - i3[1];
  const t5 = i2[0] - i1[0];
  const t6 = i2[1] - i1[1];
  const t7 = t5 * t3 + t6 * t4;
  const t8 = t5 * t5 + t6 * t6 - t7 * t7 / (
    t3 * t3 + t4 * t4);
  if (Math.sqrt(Math.abs(t8)) > 1e-9) {
    let p1 = orient2D(i2, i3, p);
    let p2 = orient2D(i2, i3, i1);
    let b = p1 === 0 || p2 === 0 || p1 === p2;
    p1 = orient2D(i1, i3, p);
    p2 = orient2D(i1, i3, i2);
    b = b && (p1 === 0 || p2 === 0 || p1 === p2);
    p1 = orient2D(i1, i2, p);
    p2 = orient2D(i1, i2, i3);
    return b && (p1 === 0 || p2 === 0 || p1 === p2);
  } else {
    return false;
  }
};

/** @ignore
 * @constructor */
Triangulate._Contour = function(vertices) {
  this.vertexList = new LinkedList();
  let vertLength = vertices.length;
  // For convenience, eliminate the last
  // vertex if it matches the first vertex
  if(vertLength >= 4 &&
    vertices[0] === vertices[vertLength - 2] &&
    vertices[1] === vertices[vertLength - 1]) {
    vertLength -= 2;
  }
  let lastX = -1;
  let lastY = -1;
  let maxXNode = null;
  let maxX = -1;
  const inf = Number.POSITIVE_INFINITY;
  const bounds = [inf, inf, -inf, -inf];
  let firstVertex = true;
  this.vertexCount = 0;
  let i;
  for(i = 0; i < vertLength; i += 2) {
    const x = vertices[i];
    const y = vertices[i + 1];
    if(i > 0 && x === lastX && y === lastY) {
      // skip consecutive duplicate points
      continue;
    }
    lastX = x;
    lastY = y;
    this.vertexList.push([x, y]);
    if(!maxXNode || x > maxX) {
      maxX = x;
      maxXNode = this.vertexList.last();
    }
    if(firstVertex) {
      bounds[0] = bounds[2] = x;
      bounds[1] = bounds[3] = y;
      firstVertex = false;
    } else {
      bounds[0] = Math.min(bounds[0], x);
      bounds[1] = Math.min(bounds[1], y);
      bounds[2] = Math.max(bounds[2], x);
      bounds[3] = Math.max(bounds[3], y);
    }
    this.vertexCount++;
  }
  this.maxXNode = maxXNode;
  this.bounds = bounds;
  // Find the prevailing winding of the polygon
  let ori = 0;
  let convex = true;
  let convexOri = -2;
  let vert = this.vertexList.first();
  const lastVert = this.vertexList.last().data;
  const firstVert = vert.data;
  while(vert) {
    const vn = vert.next ? vert.next.data : firstVert;
    const vp = vert.prev ? vert.prev.data : lastVert;
    if(convex) {
      const cori = orient2D(vp, vert.data, vn);
      if(convexOri !== -2 && cori !== convexOri)convex = false;
      convexOri = cori;
    }
    ori += vert.data[0] * vn[1] - vert.data[1] * vn[0];
    vert = vert.next;
  }
  this.convex = convex;
  this.winding = ori === 0 ? 0 : ori < 0 ? -1 : 1;
};
Triangulate._Contour.prototype.findVisiblePoint = function(x, y) {
  let vert = this.vertexList.first();
  if(typeof vert === "undefined" || vert === null)return null;
  const bounds = this.bounds;
  if(x < bounds[0] || y < bounds[1] || x > bounds[2] || y > bounds[2])return null;
  const lastVert = this.vertexList.last();
  const firstVert = vert;
  let closeVertices = [];
  while(vert) {
    const vn = vert.next ? vert.next : firstVert;
    const x1 = vert.data[0];
    const x2 = vn.data[0];
    const y1 = vert.data[1];
    const y2 = vn.data[1];
    const xmin = Math.min(x1, x2);
    const xmax = Math.max(x1, x2);
    const ymin = Math.min(y1, y2);
    const ymax = Math.max(y1, y2);
    if(x1 === x && y1 === y) {
      return vert;
    } else if(x2 === x && y2 === y) {
      return vn;
    }
    if(x <= xmax && y >= ymin && y <= ymax) {
      if(y1 === y2) {
        // parallel to the ray
        closeVertices.push([
          xmin, xmin === vert.data[0] ? vert : vn, true]);
      } else {
        const dx = x2 - x1;
        const t = (y - y1) / (y2 - y1);
        const xi = x + dx * t;
        if(xi >= x) {
          if(xi === x1) {
            closeVertices.push([xi, vert, true]);
          } else if(xi === x2) {
            closeVertices.push([xi, vn, true]);
          } else {
            closeVertices.push([xi, vert, false]);
          }
        }
      }
    }
    vert = vert.next;
  }
  if(closeVertices.length === 0) {
    // no visible vertices
    return null;
  } else if(closeVertices.length > 1) {
    // sort by X coordinate
    closeVertices = closeVertices.sort(function(a, b) {
      if(a[0] === b[0])return 0;
      return a[0] < b[0] ? -1 : 1;
    });
  }
  if(closeVertices[0][2]) {
    // closest vertex is already a vertex of
    // the contour
    return closeVertices[0][1];
  }
  vert = closeVertices[0][1];
  const nextVert = vert.next ? vert.next : firstVert;
  const triangle1 = [x, y];
  const triangle2 = [closeVertices[0][0], y];
  let iterVert = firstVert;
  let innerReflexes = [];
  while(iterVert) {
    if(iterVert !== nextVert) {
      const iterPrev = iterVert.prev ? iterVert.prev : lastVert;
      const iterNext = iterVert.next ? iterVert.next : firstVert;
      const orient = orient2D(iterPrev.data, iterVert.data, iterNext.data);
      if(orient !== 0 && orient !== this.winding) {
        // This is a reflex vertex
        const pointIn = Triangulate._pointInTri(
          triangle1, triangle2, nextVert.data, iterVert.data);
        if(pointIn) {
          // The reflex vertex is in the triangle
          const t1 = iterVert.data[0] - triangle1[0];
          const t2 = iterVert.data[1] - triangle1[1];
          const distance = Math.sqrt(t1 * t1 + t2 * t2);
          let angle = t1 / distance;
          if(angle < -1)angle = -1;
          if(angle > 1)angle = 1;
          innerReflexes.push([Math.acos(angle), distance, iterVert]);
        }
      }
    }
    iterVert = iterVert.next;
  }
  if(innerReflexes.length === 0) {
    // vertex after the intersected vertex is visible
    return nextVert;
  }
  // sort by angle, then by distance
  if(innerReflexes.length > 1) {
    innerReflexes = innerReflexes.sort(function(a, b) {
      if(a[0] === b[0]) {
        if(a[1] === b[1])return 0;
        return a[1] < b[1] ? -1 : 1;
      }
      return a[0] < b[0] ? -1 : 1;
    });
  }
  return innerReflexes[0][2];
};

/*
  function getLineIntersectionInto2D(a1, a2, b1, b2, p) {
    var s1 = [a1[0] - a2[0], a1[1] - a2[1]];
    var s2 = [b1[0] - b2[0], b1[1] - b2[1]];
    var det = s1[0] * s2[1] - s1[1] * s2[0];
    if (Math.abs(det) <= 1e-9) {
      return false;
    } else {
      det = 1.0 / det;
      var t2 = det * (a1[0] * s1[1] - a1[1] * s1[0] - (b1[0] * s1[1] - b1[1] * s1[0]));
      p[0] = b1[0] * (1.0 - t2) + b2[0] * t2;
      p[1] = b1[1] * (1.0 - t2) + b2[1] * t2;
      return true;
    }
  }

  function getSegmentIntersection2D(ap1, ap2, bp1, bp2) {
    var A = [ap2[0] - ap1[0], ap2[1] - ap1[1], 0];
    var B = [bp2[0] - bp1[0], bp2[1] - bp1[1], 0];
    var BxA = B[0] * A[1] - B[1] * A[0];
    if (Math.abs(BxA) <= 1e-9) {
      return null;
    }
    var v1 = [ap1[0] - bp1[0], ap1[1] - bp1[1], 0];
    var ambxA = v1[0] * A[1] - v1[1] * A[0];
    if (Math.abs(ambxA) <= 1e-9) {
      return null;
    }
    var tb = ambxA / BxA;
    if (tb < 0.0 || tb > 1.0) {
      return null;
    }
    var ip = [B[0] * tb, B[1] * tb, 0];
    ip[0] += bp1[0];
    ip[1] += bp1[1];
    var ta = [ip[0] - ap1[0], ip[1] - ap1[1], 0];
    ta = (ta[0] * A[0] + ta[1] * A[1]) / (A[0] * A[0] + A[1] * A[1]);
    if (ta < 0.0 || ta > 1.0 || isNaN(ta)) {
      return null;
    }
    return ip;
  }
*/
function decomposePolygon(pointlist, accumulator) {
  if (pointlist.length < 3) {
    return;
  }
  // TODO
  console.warn("not implemented");
  accumulator.push(pointlist);
}

function decomposeTriangles(points, tris, isConvex) {
  const polys = [];
  if(isConvex) {
    // Already found to be convex, so
    // this is trivial
    polys.push(points);
  } else {
    decomposePolygon(points, polys);
  }
  if(points.length > 0 && polys.length === 0)throw new Error();
  let i;
  for (i = 0; i < polys.length; i++) {
    const poly = polys[i];
    let j;
    for (j = 0; j < poly.length - 2; j++) {
      tris.push([
        poly[0][0], poly[0][1],
        poly[j + 1][0], poly[j + 1][1],
        poly[j + 2][0], poly[j + 2][1]]);
    }
  }
}

/**
 * Converts the subpaths in this path to triangles.
 * Treats each subpath as a polygon even if it isn't closed.
 * Each subpath should not contain self-intersections or
 * duplicate vertices, except duplicate vertices that appear
 * consecutively or at the start and end.<p>
 * The path can contain holes. In this case, subpaths
 * whose winding order (counterclockwise or clockwise)
 * differs from the first subpath's winding order can be holes.
 * @param {number} [flatness] When curves and arcs
 * are decomposed to line segments, the
 * segments will be close to the true path of the curve by this
 * value, given in units. If null, undefined, or omitted, default is 1.
 * @returns {Array<Array<number>>} Array of six-element
 * arrays each describing a single triangle. For each six-element
 * array, the first two, next two, and last two numbers each
 * describe a vertex position of that triangle (X and Y coordinates
 * in that order).
 */
GraphicsPath.prototype.getTriangles = function(flatness) {
  if(typeof flatness === "undefined" || flatness === null)flatness = 1.0;
  // NOTE: _getSubpaths doesn't add degenerate line segments
  const subpaths = this._getSubpaths(flatness, true);
  const contours1 = [];
  const contours2 = [];
  let firstOrient = 0;
  const tris = [];
  let i;
  let j;
  for(i = 0; i < subpaths.length; i++) {
    const contour = new Triangulate._Contour(subpaths[i]);
    // NOTE: Ignores contours with winding 0
    // (empty, zero area, sometimes self-intersecting)
    if(contour.winding > 0) {
      if(firstOrient === 0)firstOrient = 1;
      contours1.push(contour);
    } else if(contour.winding < 0) {
      if(firstOrient === 0)firstOrient = -1;
      contours2.push(contour);
    }
  }
  if(contours2.length === 0 || contours1.length === 0) {
    // All the contours have the same winding order
    const c = contours2.length === 0 ? contours1 : contours2;
    for(i = 0; i < c.length; i++) {
      Triangulate._triangulate(c[i], tris);
    }
    // if(tris.length==0) {
    // console.log("no triangles added! "+[contours1.length,contours2.length])
    // throw new Error()
    // }
  } else {
    const c1 = firstOrient > 0 ? contours1 : contours2;
    const c2 = firstOrient > 0 ? contours2 : contours1;
    for(i = 0; i < c2.length; i++) {
      if(!c2[i])continue;
      for(j = 0; j < c1.length; j++) {
        if(!c1[j])continue;
        const maxPoint = c2[i].maxXNode;
        // Find out if the contour is inside another contour,
        // and if so, connect its vertices to that contour
        const vp = c1[j].findVisiblePoint(
          maxPoint.data[0], maxPoint.data[1]);
        if(vp) {
          c1[j].vertexCount += Triangulate._connectContours(
            c2[i].vertexList, c1[j].vertexList, maxPoint, vp);
          c2[i] = null;
          break;
        }
      }
    }
    for(i = 0; i < c1.length; i++) {
      Triangulate._triangulate(c1[i], tris);
    }
    for(i = 0; i < c2.length; i++) {
      Triangulate._triangulate(c2[i], tris);
    }
  }
  return tris;
};
/**
 * Decomposes this path into triangles and generates a mesh
 * buffer with those triangles. Each triangle's normal will point
 * toward the Z axis, and each triangle vertex's texture coordinates will
 * be the same as that vertex's position.
 * @param {number} [z] The Z coordinate of each triangle generated.
 * If null, undefined, or omitted, default is 0.
 * @param {number} [flatness] When curves and arcs
 * are decomposed to line segments, the
 * segments will be close to the true path of the curve by this
 * value, given in units. If null, undefined, or omitted, default is 1.
 * @returns {MeshBuffer} The resulting mesh buffer.
 */
GraphicsPath.prototype.toMeshBuffer = function(z, flatness) {
  if(typeof z === "undefined" || z === null)z = 0;
  const tris = this.getTriangles(flatness);
  const vertices = [];
  let i;
  for (i = 0; i < tris.length; i++) {
    const tri = tris[i];
    // Position X, Y, Z; Normal NX, NY, NZ; texture U, V
    vertices.push(
      tri[0], tri[1], z, 0, 0, 1, tri[0], tri[1],
      tri[2], tri[3], z, 0, 0, 1, tri[2], tri[3],
      tri[4], tri[5], z, 0, 0, 1, tri[4], tri[5]);
  }
  return MeshBuffer.fromPositionsNormalsUV(vertices);
};
/**
 * Generates a mesh buffer consisting of the approximate line segments that make up this graphics path.
 * @param {number} [z] Z coordinate for each line segment. If null, undefined, or omitted, the default is 0.
 * @param {number} [flatness] When curves and arcs
 * are decomposed to line segments, the
 * segments will be close to the true path of the curve by this
 * value, given in units. If null, undefined, or omitted, default is 1.
 * @returns {MeshBuffer} The resulting mesh buffer.
 */
GraphicsPath.prototype.toLineMeshBuffer = function(z, flatness) {
  if(typeof z === "undefined" || z === null)z = 0;
  const lines = this.getLines(flatness);
  const vertices = [];
  let i;
  for (i = 0; i < lines.length; i++) {
    const line = lines[i];
    vertices.push(line[0], line[1], z,
      line[2], line[3], z);
  }
  return MeshBuffer.fromPositions(vertices).setType(
    MeshBuffer.LINES);
};
/**
 * Generates a mesh buffer consisting of "walls" that follow this graphics path approximately, and, optionally, a base and toop.
 * @param {number} zStart Starting Z coordinate of the mesh buffer's "walls".
 * @param {number} zEnd Ending Z coordinate of the mesh buffer's "walls".
 * @param {number} [flatness] When curves and arcs
 * are decomposed to line segments, the
 * segments will be close to the true path of the curve by this
 * value, given in units. If null, undefined, or omitted, default is 1.
 * @param {boolean} [closed] If true, the generated mesh buffer will include a base and top. If null, undefined, or omitted, the default is false.
 * @returns {MeshBuffer} The resulting mesh buffer.
 */
GraphicsPath.prototype.toExtrudedMeshBuffer = function(zStart, zEnd, flatness, closed) {
  if((typeof zStart === "undefined" || zStart === null) || zEnd === null)throw new Error();
  const isclosed = typeof closed === "undefined" || closed === null ? false : closed;
  if(isclosed) {
    const mesh = new MeshBuffer();
    mesh.merge(this.toExtrudedMeshBuffer(zStart, zEnd, flatness, false));
    mesh.merge(this.toMeshBuffer(zEnd, flatness));
    mesh.merge(this.toMeshBuffer(zStart, flatness).reverseWinding().reverseNormals());
    return mesh;
  }
  const lines = this.getLines(flatness);
  const z1 = Math.min(zStart, zEnd);
  const z2 = Math.max(zStart, zEnd);
  const vertices = [];
  let i;
  for (i = 0; i < lines.length; i++) {
    const line = lines[i];
    const dx = line[2] - line[0];
    const dy = line[3] - line[1];
    const dot = dx * dx + dy * dy;
    if(dot === 0)continue;
    vertices.push(line[0], line[1], z1,
      line[2], line[3], z1,
      line[0], line[1], z2,
      line[2], line[3], z1,
      line[2], line[3], z2,
      line[0], line[1], z2);
  }
  return MeshBuffer.fromPositions(vertices)
    .recalcNormals(true);
};

/** @ignore */
Triangulate._connectContours = function(src, dst, maxPoint, dstNode) {
  let vpnode = dstNode;
  let c2node = maxPoint;
  let count = 0;
  while(c2node) {
    vpnode = dst.insertAfter(c2node.data, vpnode);
    c2node = c2node.next;
    count++;
  }
  c2node = src.first();
  while(c2node !== maxPoint && (typeof c2node !== "undefined" && c2node !== null)) {
    vpnode = dst.insertAfter(c2node.data, vpnode);
    c2node = c2node.next;
    count++;
  }
  vpnode = dst.insertAfter(maxPoint.data, vpnode);
  dst.insertAfter(dstNode.data, vpnode);
  // Connecting two polygons, even if convex, may not
  // result in a convex polygon
  dst.convex = false;
  count += 2;
  return count;
};
/** @ignore */
Triangulate._triangulate = function(contour, tris) {
  let t1;
  let tri;
  if(!contour || contour.vertexCount < 3 || contour.winding === 0) {
    // too few vertices, or the winding
    // suggests a zero area or even a certain
    // self-intersecting polygon
    return;
  } else if(contour.vertexCount === 3) {
    // just one triangle
    t1 = contour.vertexList.first();
    tri = [];
    while(t1) {
      tri.push(t1.data[0], t1.data[1]);
      t1 = t1.next;
    }
    tris.push(tri);
    return;
  }
  const first = contour.vertexList.first();
  const vertices = [];
  let vert = first;
  while(vert) {
    vertices.push([vert.data[0], vert.data[1]]);
    vert = vert.next;
  }
  decomposeTriangles(vertices, tris, contour.convex);
};

// //////////////////////////////////////////////////////////////////////////////////////////////
// Data structures
// //////////////////////////////////////////////////////////////////////////////////////////////

/** @ignore
 * @constructor */
const PriorityQueue = function(comparer) {
  // Based on Doug Lea's public domain Heap class in Java
  this.comparer = comparer;
  this.nodes = [];
  this._size = 0;
  this.size = function() {
    return this._size;
  };
  this._compare = function(a, b) {
    if(this.comparer) {
      return this.comparer(a, b);
    } else {
      if(a === b)return 0;
      return a < b ? -1 : 1;
    }
  };
  this.push = function(item) {
    let x = this._size;
    while(x > 0) {
      const p = (x - 1) / 2 | 0;
      // NOTE: comparer > 0, not comparer < 0, as
      // in Doug Lea's implementation
      if(this.comparer(item, this.nodes[p]) > 0) {
        this.nodes[x] = this.nodes[p];
        x = p;
      } else break;
    }
    this.nodes[x] = item;
    this._size += 1;
    return this;
  };
  // NOTE: Pops out the greatest element, not
  // the least, as in Doug Lea's implementation
  this.pop = function() {
    let data = null;
    if(this._size > 0) {
      let k = 0;
      data = this.nodes[k];
      this._size--;
      const x = this.nodes[this._size];
      for (;;) {
        const left = 1 + 2 * k;
        const right = 2 * (k + 1);
        if(left < this._size) {
          const child = right >= this._size ||
        this.comparer(this.nodes[left], this.nodes[right]) > 0 ? left : right;
          if(this.comparer(x, this.nodes[child]) < 0) {
            this.nodes[k] = this.nodes[child];
            k = child;
          } else break;
        } else break;
      }
      this.nodes[k] = x;
    }
    return data;
  };
};
  // Mostly based on Julienne Walker's
  // public domain C implementation
  /** @ignore
   * @constructor */
const RedBlackTreeNode = function(data) {
  this.left = null;
  this.right = null;
  this.red = true;
  this.p = null;
  this.data = data;
  this.link = function(dir) {
    return dir ? this.right : this.left;
  };
  this.copy = function() {
    const c = new RedBlackTreeNode(this.data);
    c.left = this.left;
    c.right = this.right;
    c.red = this.red;
    c.p = this.p;
    c.data = this.data;
    return c;
  };
  this.setLink = function(dir, child) {
    if(dir) {
      this.right = child;
    } else {
      this.left = child;
    }
    if(typeof child !== "undefined" && child !== null) {
      child.p = this;
    }
  };
  this.prev = function() {
    if(typeof this.left !== "undefined" && this.left !== null) {
      let r = this.left;
      while(typeof r.right !== "undefined" && r.right !== null)r = r.right;
      return r;
    } else {
      let p = this.p;
      const that = this;
      let tmp = that;
      while(typeof p !== "undefined" && p !== null && tmp === p.left) {
        tmp = p;
        p = p.p;
      }
      return p;
    }
  };
  this.next = function() {
    if(typeof this.right !== "undefined" && this.right !== null) {
      let r = this.right;
      while(typeof r.left !== "undefined" && r.left !== null)r = r.left;
      return r;
    } else {
      let p = this.p;
      const that = this;
      let tmp = that;
      while(typeof p !== "undefined" && p !== null && tmp === p.right) {
        tmp = p;
        p = p.p;
      }
      return p;
    }
  };
};
  /** @ignore
   * @constructor */
const RedBlackTree = function(comparer) {
  if(!comparer) {
    this.comparer = RedBlackTree._defaultCompare;
  } else {
    this.comparer = comparer;
  }
  this.root = null;
  this._size = 0;
  this.size = function() {
    return this._size;
  };
};
  /** @ignore */
RedBlackTree._defaultCompare = function(a, b) {
  if(a === b)return 0;
  return a < b ? -1 : 1;
};
/** @ignore */
RedBlackTree.prototype.first = function() {
  let r = this.root;
  if(typeof r === "undefined" || r === null)return null;
  while(typeof r.left !== "undefined" && r.left !== null)r = r.left;
  return r;
};
/** @ignore */
RedBlackTree.prototype.last = function() {
  let r = this.root;
  if(typeof r === "undefined" || r === null)return null;
  while(typeof r.right !== "undefined" && r.right !== null)r = r.right;
  return r;
};
/** @ignore */
RedBlackTree.prototype.find = function(data) {
  let it = this.root;
  while(typeof it !== "undefined" && it !== null) {
    const cmp = this.comparer(it.data, data);
    if(cmp === 0)break;
    it = cmp < 0 ? it.right : it.left;
  }
  return typeof it === "undefined" || it === null ? null : it.data;
};
/** @ignore */
RedBlackTree._red = function(node) {
  return typeof node !== "undefined" && node !== null && node.red === 1;
};
/** @ignore */
RedBlackTree._single = function(root, dir) {
  const save = root.link(!dir);
  root.setLink(!dir, save.link(dir));
  save.setLink(dir, root);
  root.red = true;
  save.red = false;
  return save;
};
/** @ignore */
RedBlackTree._double = function(root, dir) {
  root.setLink(!dir, RedBlackTree._single( root.link(!dir), !dir ));
  return RedBlackTree._single( root, dir );
};
/** @ignore */
RedBlackTree.prototype.erase = function(data) {
  if(typeof this.root !== "undefined" && this.root !== null) {
    const head = new RedBlackTreeNode(null); /* False tree root */
    let q;
    let p;
    let g; /* Helpers */
    let f = null; /* Found item */
    let dir = true;

    /* Set up our helpers */
    q = head;
    g = p = null;
    q.setLink(true, this.root);

    /*
      Search and push a red node down
      to fix red violations as we go
    */
    while( q.link(dir) !== null ) {
      const last = dir;

      /* Move the helpers down */
      g = p;
      p = q;
      q = q.link(dir);
      const cmp = this.comparer( q.data, data );
      dir = cmp < 0;
      /*
        Save the node with matching data and keep
        going; we'll do removal tasks at the end
      */
      if( cmp === 0 )
        f = q;
        /* Push the red node down with rotations and color flips */
      if( !RedBlackTree._red( q ) && !RedBlackTree._red( q.link(dir) ) ) {
        if( RedBlackTree._red( q.link(!dir) ) )
          p.setLink(last, p = RedBlackTree._single( q, dir ));
        else if( !RedBlackTree._red( q.link(!dir) ) ) {
          const s = p.link(!last);
          if( typeof s !== "undefined" && s !== null ) {
            if( !RedBlackTree._red( s.link(!last) ) && !RedBlackTree._red( s.link(last) ) ) {
              /* Color flip */
              p.red = false;
              s.red = true;
              q.red = true;
            } else {
              const dir2 = g.right === p;

              if( RedBlackTree._red( s.link(last) ) )
                g.setLink(dir2, RedBlackTree._double( p, last ));
              else if( RedBlackTree._red( s.link(!last) ) )
                g.setLink(dir2, RedBlackTree._single( p, last ));
                /* Ensure correct coloring */
              q.red = g.link(dir2).red = false;
              g.link(dir2).left.red = true;
              g.link(dir2).right.red = true;
            }
          }
        }
      }
    }

    /* Replace and remove the saved node */
    if( typeof f !== "undefined" && f !== null ) {
      f.data = q.data;
      p.setLink(p.right === q, q.link(typeof q.left === "undefined" || q.left === null));
    }

    /* Update the root(it may be different) */
    this.root = head.right;

    /* Make the root black for simplified logic */
    if(typeof this.root !== "undefined" && this.root !== null) {
      this.root.p = null;
      this.root.red = false;
    }
    --this._size;
  }
};
/** @ignore */
RedBlackTree.prototype.insert = function(data) {
  if(!data)throw new Error();
  let retval = null;
  if (typeof this.root === "undefined" || this.root === null) {
    /*
      We have an empty tree; attach the
      new node directly to the root
    */
    this.root = new RedBlackTreeNode(data);
    retval = this.root;
  } else {
    const head = new RedBlackTreeNode(null); /* False tree root */
    let g;
    let t; /* Grandparent & parent */
    let p;
    let q; /* Iterator & parent */
    let dir = false,
      last = false;

    /* Set up our helpers */
    t = head;
    g = p = null;
    q = this.root;
    t.setLink(true, q);

    /* Search down the tree for a place to insert */
    for (;;) {
      if ( typeof q === "undefined" || q === null ) {
        /* Insert a new node at the first null link */
        p.setLink(dir, q = new RedBlackTreeNode(data));
      } else if ( RedBlackTree._red( q.left ) && RedBlackTree._red( q.right ) ) {
        /* Simple red violation: color flip */
        q.red = true;
        q.left.red = false;
        q.right.red = false;
      }

      if ( RedBlackTree._red( q ) && RedBlackTree._red( p ) ) {
        /* Hard red violation: rotations necessary */
        const dir2 = t.right === g;
        if ( q === p.link(last) )
          t.setLink(dir2, RedBlackTree._single( g, !last ));
        else
          t.setLink(dir2, RedBlackTree._double( g, !last ));
      }
      /*
        Stop working if we inserted a node. This
        check also disallows duplicates in the tree
      */
      const cmp = this.comparer( q.data, data );
      if ( cmp === 0 ) {
        retval = q;
        break;
      }
      last = dir;
      dir = cmp < 0;

      /* Move the helpers down */
      if ( typeof g !== "undefined" && g !== null )
        t = g;

      g = p;
      p = q;
      q = q.link(dir);
    }

    /* Update the root (it may be different) */
    this.root = head.right;
    if(typeof this.root !== "undefined" && this.root !== null)
      this.root.p = null;
  }

  /* Make the root black for simplified logic */
  this.root.red = false;
  ++this._size;
  return retval;
};

// NOTE: Much of the Polygon, Connector, and Clipper classes
// was adapted for JavaScript by Peter O. from the public domain
// C++ code by Francisco Martinez and others.
/** @constructor
 * @private
 * @ignore */
const Polygon = function(path, flatness) {
  this.subpaths = [];
  this.contours = [];
  if(typeof path !== "undefined" && path !== null) {
    // Ignore degenerate line segments
    this.subpaths = path._getSubpaths(flatness, true);
    let i;
    for (i = 0; i < this.subpaths.length; i++) {
      this.contours[i] = new Polygon._Contour(this.subpaths[i]);
    }
  }
  this.path = path;
  this.getBounds = function() {
    return this.path.getBounds();
  };
  this.ncontours = function() {
    return this.subpaths.length;
  };
  this.contour = function(i) {
    return this.contours[i];
  };
  this.push = function(c) {
    this.contours.push(c);
  };
  this.toPath = function() {
    const p = new GraphicsPath();
    let i;
    for (i = 0; i < this.contours.length; i++) {
      const c = this.contours[i];
      const cv = c.vertices;
      let j;
      for (j = 0; j < cv.length; j += 2) {
        if(j === 0) {
          p.moveTo(cv[j], cv[j + 1]);
        } else {
          p.lineTo(cv[j], cv[j + 1]);
        }
      }
      p.closePath();
    }
    return p;
  };
};
/** @constructor
 * @private
 * @ignore */
Polygon._Contour = function(subpath) {
  this.vertices = subpath;
  this.nvertices = function() {
    return this.vertices.length / 2;
  };
  this.segment = function(i) {
    if(i === this.nvertices() - 1) {
      return [[this.vertices[i * 2], this.vertices[i * 2 + 1]], [this.vertices[0], this.vertices[1]]];
    } else {
      return [[this.vertices[i * 2], this.vertices[i * 2 + 1]], [this.vertices[i * 2 + 2], this.vertices[i * 2 + 3]]];
    }
  };
};
/** @constructor
 * @private
 * @ignore */
const Clipper = function(s, c) {
  this.eq = new PriorityQueue(Clipper.sweepEventCompNum);
  this.eventHolder = [];
  this.subject = s;
  this.clipping = c;
  this.nint = 0;
};
/** @constructor
 * @private
 * @ignore */
function Connector() {
  this.openPolygons = new LinkedList();
  this.closedPolygons = new LinkedList();
  this.clear = function() {
    this.openPolygons.clear();
    this.closedPolygons.clear();
  };
  this.size = function() {
    return this.closedPolygons.size();
  };
}
/** @constructor
 * @private
 * @ignore */
Polygon.PointChain = function() {
  this.l = new LinkedList();
  this._closed = false;
  this.closed = function() {
    return this._closed;
  };
  this.clear = function() {
    this.l.clear();
  };
  this.first = function() {
    return this.l.first();
  };
  this.size = function() {
    return this.l.size();
  };
  this.init = function(s) {
    this.l.push(s[0]).push(s[1]);
  };
  this.linkSegment = function(s) {
    if(Clipper._ptEq(s[0], this.l.front())) {
      if(Clipper._ptEq(s[1], this.l.back()))
        this._closed = true;
      else
        this.l.unshift(s[1]);
      return true;
    }
    if(Clipper._ptEq(s[1], this.l.back())) {
      if(Clipper._ptEq(s[0], this.l.front()))
        this._closed = true;
      else
        this.l.push(s[0]);
      return true;
    }
    if(Clipper._ptEq(s[1], this.l.front())) {
      if(Clipper._ptEq(s[0], this.l.back()))
        this._closed = true;
      else
        this.l.unshift(s[0]);
      return true;
    }
    if(Clipper._ptEq(s[0], this.l.back())) {
      if(Clipper._ptEq(s[1], this.l.front()))
        this._closed = true;
      else
        this.l.push(s[1]);
      return true;
    }
    return false;
  };
};

Polygon.PointChain.prototype.linkPointChain = function(chain) {
  if(Clipper._ptEq(chain.l.front(), this.l.back())) {
    chain.l.shift();
    this.l.spliceToEnd(chain.l);
    return true;
  }
  if(Clipper._ptEq(chain.l.back(), this.l.front())) {
    this.l.shift();
    this.l.spliceToBegin(chain.l);
    return true;
  }
  if(Clipper._ptEq(chain.l.front(), this.l.front())) {
    this.l.shift();
    chain.l.reverse();
    this.l.spliceToBegin(chain.l);
    return true;
  }
  if(Clipper._ptEq(chain.l.back(), this.l.back())) {
    this.l.pop();
    chain.l.reverse();
    this.l.spliceToEnd(chain.l);
    return true;
  }
  return false;
};
/** @ignore */
Connector.prototype.add = function(s) {
  let j = this.openPolygons.first();
  while(j) {
    if(j.data.linkSegment(s)) {
      if(j.data.closed())
        this.closedPolygons.spliceOneToEnd(this.openPolygons, j);
      else {
        let k = j.next;
        while(k) {
          if(j.data.linkPointChain(k.data)) {
            this.openPolygons.erase(k);
            break;
          }
          k = k.next;
        }
      }
      return;
    }
    j = j.next;
  }
  // The segment cannot be connected with any open polygon
  const chain = new Polygon.PointChain();
  chain.init(s);
  this.openPolygons.push(chain);
};
/** @ignore */
Connector.prototype.toPolygon = function() {
  const polygon = new Polygon(null, null);
  let j = this.closedPolygons.first();
  while(j) {
    const contour = new Polygon._Contour([]);
    let k = j.data.first();
    while(k) {
      contour.vertices.push(k.data[0], k.data[1]);
      k = k.next;
    }
    polygon.contours.push(contour);
    j = j.next;
  }
  return polygon;
};

const NORMAL = 0;
const SUBJECT = 0;
const CLIPPING = 1;
const INTERSECTION = 0;
const UNION = 1;
const DIFFERENCE = 2;
const XOR = 3;
const NON_CONTRIBUTING = 1;
const SAME_TRANSITION = 2;
const DIFFERENT_TRANSITION = 3;
/** @constructor
 * @private
 * @ignore */
Clipper.SweepEvent = function(pp, b, apl, o, t) {
  this.p = pp;
  this.id = -1;
  this.left = b;
  this.pl = apl;
  this.other = o;
  this.type = typeof t === "undefined" || t === null ? NORMAL : t;
  this.poss = null;
  this.inOut = false;
  this.inside = false;
  this.segment = function() {
    return [this.p, this.other.p];
  };
  this.below = function(x) {
    return this.left ?
      Clipper.signedArea(this.p, this.other.p, x) > 0 :
      Clipper.signedArea(this.other.p, this.p, x) > 0;
  };
  this.above = function(x) {
    return !this.below(x);
  };
};
/** @ignore */
Clipper.signedArea = function(a, b, c) {
  const xa = a[0] - c[0];
  const ya = a[1] - c[1];
  const xb = b[0] - c[0];
  const yb = b[1] - c[1];
  return 0.5 * (xa * yb - xb * ya);
};
/** @ignore */
Clipper._ptEq = function(a, b) {
  return a[0] === b[0] && a[1] === b[1];
};
// Compare two sweep events
// Return true means that e1 is placed at the event queue after e2, i.e,, e1 is processed by the algorithm after e2
Clipper.sweepEventComp = function(e1, e2) {
  if(e1.p[0] > e2.p[0]) // Different X coordinate
    return true;
  if(e2.p[0] > e1.p[0]) // Different X coordinate
    return false;
  if(!Clipper._ptEq(e1.p, e2.p)) // Different points, but same X coordinate. The event with lower Y coordinate is processed first
    return e1.p[1] > e2.p[1];
  if(e1.left !== e2.left) // Same point, but one is a left endpoint and the other a right endpoint. The right endpoint is processed first
    return e1.left;
    // Same point, both events are left endPoints or both are right endPoints. The event associate to the bottom segment is processed first
  return e1.above(e2.other.p);
};
/** @ignore */
Clipper.sweepEventCompNum = function(e1, e2) {
  if(e1 === e2)return 0;
  return Clipper.sweepEventComp(e1, e2) ? -1 : 1;
};
// e1 and a2 are the left events of line segments(e1.p, e1.other.p) and(e2.p, e2.other.p)
Clipper.segmentComp = function(e1, e2) {
  if(e1 === e2)
    return false;
  if(Clipper.signedArea(e1.p, e1.other.p, e2.p) !== 0 || Clipper.signedArea(e1.p, e1.other.p, e2.other.p) !== 0) {
    // Segments are not collinear
    // if they share their left endpoint use the right endpoint to sort
    if(Clipper._ptEq(e1.p, e2.p))
      return e1.below(e2.other.p);

    // Different points
    if(Clipper.sweepEventComp(e1, e2)) // has the line segment associated to e1 been inserted into S after the line segment associated to e2 ?
      return e2.above(e1.p);
      // The line segment associated to e2 has been inserted into S after the line segment associated to e1
    return e1.below(e2.p);
  }
  // Segments are collinear. Just a consistent criterion is used
  if(Clipper._ptEq(e1.p, e2.p)) {
    // console.log("collinear segments")
    return e1.id < e2.id;
  }
  return Clipper.sweepEventComp(e1, e2);
};
/** @ignore */
Clipper.segmentCompNum = function(e1, e2) {
  if(e1 === e2)return 0;
  return Clipper.segmentComp(e1, e2) ? -1 : 1;
};
/** @ignore */
Clipper.prototype.storeSweepEvent = function(e) {
  e.id = this.eventHolder.length;
  this.eventHolder.push(e);
  return e;
};
/*
  Clipper._print = function(e) {
    if(!e)return "null";
    var namesEventTypes = [
      " (NORMAL) ", " (NON_CONTRIBUTING) ", " (SAME_TRANSITION) ", " (DIFFERENT_TRANSITION) "];
    return "Point: (" + e.p + ") Other point: (" + e.other.p + ")" + (e.left ? " (Left) " : " (Right) ") +
         (e.inside ? " (Inside) " : " (Outside) ") +  (e.inOut ? " (In-Out) " : " (Out-In) ") + "Type: " +
         namesEventTypes[e.type] + " Polygon: " + (e.pl === SUBJECT ? " (SUBJECT)" : " (CLIPPING)");
  };*/
/** @ignore */
Clipper.prototype.compute = function(op) {
  // Test 1 for trivial result case
  if(this.subject.ncontours() * this.clipping.ncontours() === 0) {
    // At least one of the polygons is empty
    if(op === DIFFERENCE)
      return this.subject;
    if(op === UNION)
      return this.subject.ncontours() === 0 ? this.clipping : this.subject;
    return new Polygon(null, null);
  }
  let i;
  let j;
  let result = new Polygon(null, null);
  // Test 2 for trivial result case
  const subjBounds = this.subject.getBounds();
  const clipBounds = this.clipping.getBounds();
  const minsubj = [subjBounds[0], subjBounds[1]];
  const maxsubj = [subjBounds[2], subjBounds[3]];
  const minclip = [clipBounds[0], clipBounds[1]];
  const maxclip = [clipBounds[2], clipBounds[3]];
  if(minsubj[0] > maxclip[0] || minclip[0] > maxsubj[0] ||
     minsubj[1] > maxclip[1] || minclip[1] > maxsubj[1]) {
    // the bounding boxes do not overlap
    if(op === DIFFERENCE)
      return this.subject;
    if(op === UNION) {
      result = this.subject;
      for(i = 0; i < this.clipping.ncontours(); i++)
        result.push(this.clipping.contour(i));
    }
    return result;
  }
  // Boolean operation is not trivial
  // Insert all the endPoints associated to the line segments into the event queue
  for(i = 0; i < this.subject.ncontours(); i++)
    for(j = 0; j < this.subject.contour(i).nvertices(); j++)
      this.processSegment(this.subject.contour(i).segment(j), SUBJECT);
  for(i = 0; i < this.clipping.ncontours(); i++)
    for(j = 0; j < this.clipping.contour(i).nvertices(); j++)
      this.processSegment(this.clipping.contour(i).segment(j), CLIPPING);
  const S = new RedBlackTree(Clipper.segmentCompNum);
  let it;
  let sli;
  let prev;
  let next;
  const connector = new Connector(); // to connect the edge solutions
  let e;
  const minMaxx = Math.min(maxsubj[0], maxclip[0]); // for optimization 1
  while(this.eq.size() > 0) {
    e = this.eq.pop();
    // console.log("Process event:  "+e.toString())
    // optimization 1
    if(op === INTERSECTION && e.p[0] > minMaxx ||
       op === DIFFERENCE && e.p[0] > maxsubj[0]) {
      return connector.toPolygon();
    }
    if(op === UNION && e.p[0] > minMaxx) {
      // add all the non-processed line segments to the result
      if(!e.left)
        connector.add(e.segment());
      while(this.eq.size() > 0) {
        e = this.eq.pop();
        if(!e.left)
          connector.add(e.segment());
      }
      return connector.toPolygon();
    }
    // end of optimization 1

    if(e.left) { // the line segment must be inserted into S
      it = S.insert(e);
      e.poss = it;
      if(!it)throw new Error();
      next = prev = it;
      if(next && !next.data)throw new Error();
      if(prev !== S.first())
        prev = prev.prev();
      else
        prev = null;
        // Compute the inside and inOut flags
      if(typeof prev === "undefined" || prev === null) { // there is not a previous line segment in S?
        // console.log("prev is end")
        e.inside = e.inOut = false;
      } else if(prev.data.type !== NORMAL) {
        if(prev === S.first()) { // e overlaps with prev
          e.inside = true; // it is not relevant to set true or false
          e.inOut = false;
        } else { // the previous two line segments in S are overlapping line segments
          sli = prev;
          sli = sli.prev();
          if(prev.data.pl === e.pl) {
            e.inOut = !prev.data.inOut;
            e.inside = !sli.data.inOut;
          } else {
            e.inOut = !sli.data.inOut;
            e.inside = !prev.data.inOut;
          }
        }
      } else if(e.pl === prev.data.pl) { // previous line segment in S belongs to the same polygon that "e" belongs to
        e.inside = prev.data.inside;
        e.inOut = !prev.data.inOut;
      } else {                          // previous line segment in S belongs to a different polygon that "e" belongs to
        e.inside = !prev.data.inOut;
        e.inOut = prev.data.inside;
      }
      /*
      console.log("Status line after insertion:")
      var bgn=S.first()
      while(bgn) {
       console.log(" "+bgn.data.toString())
       bgn=bgn.next()
      }*/
      // Process a possible intersection between "e" and its next neighbor in S
      next = next.next();
      if(typeof next !== "undefined" && next !== null)
        this.possibleIntersection(e, next.data);

      // Process a possible intersection between "e" and its previous neighbor in S
      if(typeof prev !== "undefined" && prev !== null)
        this.possibleIntersection(prev.data, e);
    } else { // the line segment must be removed from S
      // console.log([e.other.p,e.other.id])
      next = prev = sli = e.other.poss;
      // Get the next and previous line segments to "e" in S
      next = next.next();
      if(prev !== S.first())
        prev = prev.prev();
      else
        prev = null;
        // Check if the line segment belongs to the Boolean operation
      switch(e.type) {
      default:throw new Error();
      case NORMAL:
        switch(op) {
        default:throw new Error();
        case INTERSECTION:
          if(e.other.inside)
            connector.add(e.segment());
          break;
        case UNION:
          if(!e.other.inside)
            connector.add(e.segment());
          break;
        case DIFFERENCE:
          if(e.pl === SUBJECT && !e.other.inside ||
                e.pl === CLIPPING && e.other.inside)
            connector.add(e.segment());
          break;
        case XOR:
          connector.add(e.segment());
          break;
        }
        break;
      case SAME_TRANSITION:
        if(op === INTERSECTION || op === UNION)
          connector.add(e.segment());
        break;
      case DIFFERENT_TRANSITION:
        if(op === DIFFERENCE)
          connector.add(e.segment());
        break;
      }
      // delete line segment associated to e from S and check for intersection between the neighbors of "e" in S
      S.erase(sli.data);
      if(typeof next !== "undefined" && next !== null && (typeof prev !== "undefined" && prev !== null)) {
        this.possibleIntersection(prev.data, next.data);
      }
    }
    /*
    console.log("Status line after processing intersections:")
      var bgn=S.first()
      while(bgn) {
       console.log(" "+bgn.data.toString())
       bgn=bgn.next()
      }
      console.log(" ")*/
  }
  return connector.toPolygon();
};
/** @ignore */
Clipper.prototype.processSegment = function(s, pl) {
  if(Clipper._ptEq(s[0], s[1])) // if the two edge endPoints are equal the segment is discarded
    return;                 // in the future this can be done as preprocessing to avoid "polygons" with less than 3 edges
  const e1 = this.storeSweepEvent(new Clipper.SweepEvent(s[0], true, pl, null, NORMAL));
  const e2 = this.storeSweepEvent(new Clipper.SweepEvent(s[1], true, pl, e1, NORMAL));
  e1.other = e2;
  if(e1.p[0] < e2.p[0]) {
    e2.left = false;
  } else if(e1.p[0] > e2.p[0]) {
    e1.left = false;
  } else if(e1.p[1] < e2.p[1]) { // the line segment is vertical. The bottom endpoint is the left endpoint
    e2.left = false;
  } else {
    e1.left = false;
  }
  this.eq.push(e1);
  this.eq.push(e2);
};
/** @ignore */
Clipper.findIntersection = function(a, b, e, f) {
  const ret = Clipper._findIntersectionInternal(a[0][0], a[0][1], a[1][0], a[1][1],
    b[0][0], b[0][1], b[1][0], b[1][1]);
  if(ret.length > 0) {
    e[0] = ret[0][0];
    e[1] = ret[0][1];
  }
  if(ret.length > 1) {
    f[0] = ret[1][0];
    f[1] = ret[1][1];
  }
  return ret.length;
};
/** @ignore */
Clipper._findIntersectionInternal = function(a1x, a1y, a2x, a2y, b1x, b1y, b2x, b2y) {
  const t2 = a2x - a1x;
  const t3 = a2y - a1y;
  const t4 = b2x - b1x;
  const t5 = b2y - b1y;
  const t6 = t2 * t2 + t3 * t3;
  const t7 = t4 * t4 + t5 * t5;
  const ret = [];
  let smin;
  let smax;
  if (t6 === 0.0) {
    if (t7 === 0.0) {
      if (a1x === b1x && a1y === b1y) {
        ret.push([a1x, a1y]);
      }
    } else {
      const t9 = ((a1x - b1x) * t4 + (a1y - b1y) * t5) / t7;
      if (t9 >= 0.0 && t9 <= 1.0) {
        const t10 = [b1x + t4 * t9, b1y + t5 * t9];
        const t11 = a1x - t10[0];
        const t12 = a1y - t10[1];
        const t13 = Math.sqrt(t11 * t11 + t12 * t12);
        if (t13 <= 1e-09) {
          ret.push([a1x, a1y]);
        }
      }
    }
    return ret;
  } else if (t7 === 0.0) {
    const t15 = ((b1x - a1x) * t2 + (b1y - a1y) * t3) / t6;
    if (t15 >= 0.0 && t15 <= 1.0) {
      const t16 = [a1x + t2 * t15, a1y + t3 * t15];
      const t17 = b1x - t16[0];
      const t18 = b1y - t16[1];
      const t19 = Math.sqrt(t17 * t17 + t18 * t18);
      if (t19 <= 1e-09) {
        ret.push([b1x, b1y]);
      }
    }
    return ret;
  }
  const t21 = t2 * t5 - t4 * t3;
  const t22 = b1x - a1x;
  const t23 = b1y - a1y;
  const t24 = t22 * t5 - t4 * t23;
  const dpdeltad0 = t22 * t3 - t2 * t23;
  if (t21 === 0.0) {
    if (t24 === 0.0 && dpdeltad0 === 0) {
      const s1 = (t2 * (b1x - a1x) + t3 * (b1y - a1y)) / (t2 * t2 + t3 * t3);
      const s2 = (t2 * (b2x - a1x) + t3 * (b2y - a1y)) / (t2 * t2 + t3 * t3);
      if(s1 <= 0 && s2 >= 1 || s1 >= 1 && s2 <= 0) {
        // first line contains second line
        return [[a1x, a1y], [a2x, a2y]];
      } else if(s1 < 0 && s2 < 0 || s1 > 1 && s2 > 1) {
        // lines don't overlap
        return [];
      } else if(s1 <= 0 && s2 <= 0) {
        // meets at the first point of first line
        return [[a1x, a1y]];
      } else if(s1 >= 1 && s2 >= 1) {
        // meets at the second point of first line
        return [[a2x, a2y]];
      } else if(s1 < 0 || s2 < 0) {
        smax = Math.max(s1, s2);
        return [[a1x, a1y], [
          a1x + t2 * smax, a1y + t3 * smax
        ]];
      } else if(s1 > 1 || s2 > 1) {
        smin = Math.min(s1, s2);
        return [[
          a1x + t2 * smin, a1y + t3 * smin
        ], [a2x, a2y]];
      } else {
        smin = Math.min(s1, s2);
        smax = Math.max(s1, s2);
        return [[
          a1x + t2 * smin, a1y + t3 * smin
        ], [
          a1x + t2 * smax, a1y + t3 * smax
        ]];
      }
    }
  } else {
    const t29 = t24 / t21;
    const t30 = dpdeltad0 / t21;
    if (t29 >= 0.0 && t29 <= 1.0 && t30 >= 0.0 && t30 <= 1.0) {
      const t31 = [a1x + t2 * t29, a1y + t3 * t29];
      ret.push(t31);
    }
  }
  return ret;
};

/** @ignore */
Clipper.prototype.possibleIntersection = function(e1, e2) {
  // if((e1.pl == e2.pl) ) // you can uncomment these two lines if(self-intersecting polygons are not allowed
  // return false;

  const ip1 = [];
  const ip2 = []; // intersection points
  let nintersections;
  // console.log(JSON.stringify(["possibleIntersections",e1.segment(), e2.segment()]))
  if(!(nintersections = Clipper.findIntersection(e1.segment(), e2.segment(), ip1, ip2)))
    return;
    // console.log([ip1,ip2])
  if(nintersections === 1 && (Clipper._ptEq(e1.p, e2.p) || Clipper._ptEq(e1.other.p, e2.other.p)))
    return; // the line segments intersect at an endpoint of both line segments

  if(nintersections === 2 && e1.pl === e2.pl)
    return; // the line segments overlap, but they belong to the same polygon

  // The line segments associated to e1 and e2 intersect
  // nint += nintersections;

  if(nintersections === 1) {
    if(!Clipper._ptEq(e1.p, ip1) && !Clipper._ptEq(e1.other.p, ip1))  // if(ip1 is not an endpoint of the line segment associated to e1 then divide "e1"
      this._divideSegment(e1, ip1);
    if(!Clipper._ptEq(e2.p, ip1) && !Clipper._ptEq(e2.other.p, ip1))  // if(ip1 is not an endpoint of the line segment associated to e2 then divide "e2"
      this._divideSegment(e2, ip1);
    return;
  }

  // The line segments overlap
  const sortedEvents = [];
  if(Clipper._ptEq(e1.p, e2.p)) {
    sortedEvents.push(null);
  } else if(Clipper.sweepEventComp(e1, e2)) {
    sortedEvents.push(e2);
    sortedEvents.push(e1);
  } else {
    sortedEvents.push(e1);
    sortedEvents.push(e2);
  }
  if(Clipper._ptEq(e1.other.p, e2.other.p)) {
    sortedEvents.push(null);
  } else if(Clipper.sweepEventComp(e1.other, e2.other)) {
    sortedEvents.push(e2.other);
    sortedEvents.push(e1.other);
  } else {
    sortedEvents.push(e1.other);
    sortedEvents.push(e2.other);
  }

  if(sortedEvents.length === 2) { // are both line segments equal?
    e1.type = e1.other.type = NON_CONTRIBUTING;
    e2.type = e2.other.type = e1.inOut === e2.inOut ? SAME_TRANSITION : DIFFERENT_TRANSITION;
    return;
  }
  if(sortedEvents.length === 3) { // the line segments share an endpoint
    sortedEvents[1].type = sortedEvents[1].other.type = NON_CONTRIBUTING;
    if(sortedEvents[0]) // is the right endpoint the shared point?
      sortedEvents[0].other.type = e1.inOut === e2.inOut ? SAME_TRANSITION : DIFFERENT_TRANSITION;
    else // the shared point is the left endpoint
      sortedEvents[2].other.type = e1.inOut === e2.inOut ? SAME_TRANSITION : DIFFERENT_TRANSITION;
    this._divideSegment(sortedEvents[0] ? sortedEvents[0] : sortedEvents[2].other, sortedEvents[1].p);
    return;
  }
  if(sortedEvents[0] !== sortedEvents[3].other) { // no line segment includes totally the other one
    sortedEvents[1].type = NON_CONTRIBUTING;
    sortedEvents[2].type = e1.inOut === e2.inOut ? SAME_TRANSITION : DIFFERENT_TRANSITION;
    this._divideSegment(sortedEvents[0], sortedEvents[1].p);
    this._divideSegment(sortedEvents[1], sortedEvents[2].p);
    return;
  }
  // one line segment includes the other one
  sortedEvents[1].type = sortedEvents[1].other.type = NON_CONTRIBUTING;
  this._divideSegment(sortedEvents[0], sortedEvents[1].p);
  sortedEvents[3].other.type = e1.inOut === e2.inOut ? SAME_TRANSITION : DIFFERENT_TRANSITION;
  this._divideSegment(sortedEvents[3].other, sortedEvents[2].p);
};
/** @ignore */
Clipper.prototype._divideSegment = function(e, p) {
  // "Right event" of the "left line segment" resulting from dividing e(the line segment associated to e)
  const r = this.storeSweepEvent(new Clipper.SweepEvent(p, false, e.pl, e, e.type));
  // "Left event" of the "right line segment" resulting from dividing e(the line segment associated to e)
  const l = this.storeSweepEvent(new Clipper.SweepEvent(p, true, e.pl, e.other, e.other.type));
  if(Clipper.sweepEventComp(l, e.other)) { // avoid a rounding error. The left event would be processed after the right event
    // console.log("Oops")
    e.other.left = true;
    l.left = false;
  }
  // avoid a rounding error. The left event would be processed after the right event
  Clipper.sweepEventComp(e, r);
  e.other.other = l;
  e.other = r;
  this.eq.push(l);
  this.eq.push(r);
};

/**
 * Computes the combination of this path's shape with another
 * path's shape. The following points apply to this method:<ul>
 * <li>This method treats unclosed subpaths as implicitly closed
 * by connecting their end points with their start points.
 * <li>Currently, the algorithm supports only polygons made up
 * of line segments, so curves and arcs are converted to line
 * segments before applying the operation.
 * <li>Each polygon can be concave or have self-intersections
 * or holes. Subpaths that are holes have the opposite winding
 * order (clockwise or counterclockwise) from the subpath
 * that contains them.
 * </ul>
 * @param {GraphicsPath} path A path to combine with this one.
 * @param {number} [flatness] When curves and arcs
 * are decomposed to line segments, the
 * segments will be close to the true path of the curve by this
 * value, given in units. If null, undefined, or omitted, default is 1.
 * @returns {GraphicsPath} The union of the two paths.
 */
GraphicsPath.prototype.union = function(path, flatness) {
  if(typeof path === "undefined" || path === null)return this;
  const polygon1 = new Polygon(this, flatness);
  const polygon2 = new Polygon(path, flatness);
  const retval = new Clipper(polygon1, polygon2).compute(UNION);
  return retval.toPath();
};
/**
 * Computes the difference between this path's shape and another
 * path's shape. The points given in the {@link GraphicsPath#union} method
 * apply to this method.
 * @param {GraphicsPath} path A path to combine with this one.
 * @param {number} [flatness] When curves and arcs
 * are decomposed to line segments, the
 * segments will be close to the true path of the curve by this
 * value, given in units. If null, undefined, or omitted, default is 1.
 * @returns {GraphicsPath} The difference between this path
 * and the other path.
 */
GraphicsPath.prototype.difference = function(path, flatness) {
  if(typeof path === "undefined" || path === null)return this;
  const polygon1 = new Polygon(this, flatness);
  const polygon2 = new Polygon(path, flatness);
  const retval = new Clipper(polygon1, polygon2).compute(DIFFERENCE);
  return retval.toPath();
};
/**
 * Computes the intersection, or the area common to both this path's shape
 * and another path's shape. The points given in the {@link GraphicsPath#union} method
 * apply to this method.
 * @param {GraphicsPath} path A path to combine with this one.
 * @param {number} [flatness] When curves and arcs
 * are decomposed to line segments, the
 * segments will be close to the true path of the curve by this
 * value, given in units. If null, undefined, or omitted, default is 1.
 * @returns {GraphicsPath} A path whose shape is contained in
 * both paths.
 */
GraphicsPath.prototype.intersection = function(path, flatness) {
  if(typeof path === "undefined" || path === null)return this;
  const polygon1 = new Polygon(this, flatness);
  const polygon2 = new Polygon(path, flatness);
  const retval = new Clipper(polygon1, polygon2).compute(INTERSECTION);
  return retval.toPath();
};
/**
 * Computes the shape contained in either this path or another path,
 * but not both. The points given in the {@link GraphicsPath#union} method
 * apply to this method.
 * @param {GraphicsPath} path A path to combine with this one.
 * @param {number} [flatness] When curves and arcs
 * are decomposed to line segments, the
 * segments will be close to the true path of the curve by this
 * value, given in units. If null, undefined, or omitted, default is 1.
 * @returns {GraphicsPath} A path whose shape is contained in
 * only one of the two paths.
 */
GraphicsPath.prototype.xor = function(path, flatness) {
  if(typeof path === "undefined" || path === null)return this;
  const polygon1 = new Polygon(this, flatness);
  const polygon2 = new Polygon(path, flatness);
  const retval = new Clipper(polygon1, polygon2).compute(XOR);
  return retval.toPath();
};/*
 Any copyright to this file is released to the Public Domain.
 http://creativecommons.org/publicdomain/zero/1.0/
 If you like this, you should donate
 to Peter O. (original author of
 the Public Domain HTML 3D Library) at:
 http://peteroupc.github.io/
*/
/**
 * A class offering a convenient way to set a transformation
 * from one coordinate system to another.
 * @constructor
 */
const Transform = function() {
  /** @ignore */
  this.scale = [1, 1, 1];
  /** @ignore */
  this.position = [0, 0, 0];
  /** @ignore */
  this.rotation = MathUtil.quatIdentity();
  /** @ignore */
  this.complexMatrix = false;
  /** @ignore */
  this._matrixDirty = false;
  /** @ignore */
  this._isIdentity = true;
  /** @ignore */
  this.matrix = MathUtil.mat4identity();
};
  /**
   * Returns a copy of a three-element array giving the scaling for an object's width,
   * height, and depth, respectively.
   * For each component, 1 means no scaling.
   * @returns {Array<number>} Return value.
   */
Transform.prototype.getScale = function() {
  if(this.complexMatrix) {
    return [this.matrix[0], this.matrix[5], this.matrix[10]];
  } else {
    return this.scale.slice(0, 3);
  }
};
/**
 * Returns a copy of a three-element array giving the X, Y, and Z coordinates of the position
 * of an object relative to its original position.
 * @returns {Array<number>} Return value.
 */
Transform.prototype.getPosition = function() {
  if(this.complexMatrix) {
    return [this.matrix[12], this.matrix[13], this.matrix[14]];
  } else {
    return this.position.slice(0, 3);
  }
};
/**
 * Returns a copy of the rotation of an object in the form of a [quaternion]{@tutorial glmath}.
 * @returns {Array<number>} Return value.
 */
Transform.prototype.getQuaternion = function() {
  if(this.complexMatrix) {
    return MathUtil.quatNormalizeInPlace(
      MathUtil.quatFromMat4(this.matrix));
  } else {
    return this.rotation.slice(0, 4);
  }
};
/**
 * Resets this transform to the untransformed state.
 * @returns {Transform} This object.
 */
Transform.prototype.reset = function() {
  this.matrix = MathUtil.mat4identity();
  this.position = [0, 0, 0];
  this.scale = [1, 1, 1];
  this.rotation = MathUtil.quatIdentity();
  this.complexMatrix = false;
  this._matrixDirty = false;
  this._isIdentity = true;
  return this;
};
/**
 * Sets this transform's transformation matrix. This method
 * will set the position, rotation, and scale properties
 * accordingly to the matrix given.
 * @param {Array<number>} value A 4x4 matrix.
 * This method will copy the value of this parameter.
 * @returns {Transform} This object.
 */
Transform.prototype.setMatrix = function(value) {
  this._matrixDirty = false;
  this.complexMatrix = true;
  this.matrix = value.slice(0, 16);
  this.position = [this.matrix[12], this.matrix[13], this.matrix[14]];
  this.rotation = MathUtil.quatFromMat4(this.matrix);
  this.rotation = MathUtil.quatNormalizeInPlace(this.rotation);
  this.scale = [this.matrix[0], this.matrix[5], this.matrix[10]];
  this._isIdentity =
    value[0] === 1 && value[1] === 0 && value[2] === 0 && value[3] === 0 &&
    value[4] === 0 && value[5] === 1 && value[6] === 0 && value[7] === 0 &&
    value[8] === 0 && value[9] === 0 && value[10] === 1 && value[11] === 0 &&
    value[12] === 0 && value[13] === 0 && value[14] === 0 && value[15] === 1
  ;
  return this;
};
/**
 * Returns whether this transform is the identity transform.
 * @returns {boolean} Return value.
 */
Transform.prototype.isIdentity = function() {
  if(this._matrixDirty) {
    if(this.complexMatrix) {
      this.getMatrix();
    } else {
      return this.position[0] === 0 && this.position[1] === 0 &&
    this.position[2] === 0 && this.scale[0] === 1 &&
    this.scale[1] === 1 && this.scale[2] === 1 &&
    MathUtil.quatIsIdentity(this.rotation);
    }
  }
  return this._isIdentity;
};
/**
 * Sets the scale of an object relative to its original
 * size. Has no effect if a matrix was defined with {@link Transform#setMatrix}
 * and the transform wasn't reset yet with {@link Transform#resetTransform}.
 * @param {number|Array<number>} x X axis scaling factor for this transform.
 *   If "y" and "z" are null, undefined, or omitted, this is instead
 * a 3-element array giving the scaling factors
 * for X, Y, and Z dimensions, respectively, or a single number
 * giving the scaling factor for all three dimensions.
 * @param {number} [y] Y axis scaling factor for this transform.
 * @param {number} [z] Z axis scaling factor for this transform.
 * @returns {Transform} This object.
 * @example
 * // scale coordinates by 2x in all axes
 * transform.setScale(2,2,2);
 * // same, but passing an array
 * transform.setScale([2,2,2]);
 */
Transform.prototype.setScale = function(x, y, z) {
  if(this.complexMatrix)return this;
  if(typeof x !== "undefined" && x !== null && (typeof y === "undefined" || y === null) && (typeof z === "undefined" || z === null)) {
    if(typeof x !== "number")
      this.scale = [x[0], x[1], x[2]];
    else
      this.scale = [x, x, x];
  } else {
    this.scale = [x, y, z];
  }
  this._isIdentity = this._isIdentity &&
   this.scale[0] === 1 &&
   this.scale[1] === 1 &&
   this.scale[2] === 1;
  this._matrixDirty = true;
  return this;
};
/**
 * Sets the relative position of an object from its original
 * position. Has no effect if a matrix was defined with {@link Transform#setMatrix}
 * and the transform wasn't reset yet with {@link Transform#resetTransform}.
 * @param {Array<number>|number} x The X coordinate.
 *   If "y" and "z" are null, undefined, or omitted, this is instead
 * a 3-element array giving the X, Y, and Z coordinates, or a single number
 * giving the coordinate for all three dimensions.
 * @param {number} [y] The Y coordinate.
 * If "x" is an array, this parameter may be omitted.
 * @param {number} [z] The Z coordinate.
 * If "x" is an array, this parameter may be omitted.
 * @returns {Transform} This object.
 * @example
 * // Set the relative position to 2 units along X axis, 4 units along Y axis,
 * // and 5 units along Z axis
 * transform.setPosition(2,4,5);
 * // same, but passing an array
 * transform.setPosition([2,4,5]);
 */
Transform.prototype.setPosition = function(x, y, z) {
  if(this.complexMatrix)return this;
  if(typeof x !== "undefined" && x !== null && (typeof y === "undefined" || y === null) && (typeof z === "undefined" || z === null)) {
    if(typeof x !== "number")
      this.position = [x[0], x[1], x[2]];
    else
      this.position = [x, x, x];
  } else {
    this.position = [x, y, z];
  }
  this._isIdentity = this._isIdentity &&
   this.position[0] === 0 &&
   this.position[1] === 0 &&
   this.position[2] === 0;
  this._matrixDirty = true;
  return this;
};

/**
 * Moves the relative position of an object from its original
 * position. Has no effect if a matrix was defined with {@link Transform#setMatrix}
 * and the transform wasn't reset yet with {@link Transform#resetTransform}.
 * @param {Array<number>|number} x Number to add to the X coordinate,
 *   If "y" and "z" are null, undefined, or omitted, this is instead
 * a 3-element array giving the numbers to add to the X, Y, and Z coordinates, or a single number
 * to add to all three coordinates.
 * @param {number} y Number to add to the Y coordinate.
 * If "x" is an array, this parameter may be omitted.
 * @param {number} z Number to add to the Z coordinate.
 * If "x" is an array, this parameter may be omitted.
 * @returns {Transform} This object.
 */
Transform.prototype.movePosition = function(x, y, z) {
  if(this.complexMatrix)return this;
  if(typeof x !== "undefined" && x !== null && (typeof y === "undefined" || y === null) && (typeof z === "undefined" || z === null)) {
    if(typeof x !== "number") {
      this.position[0] += x[0];
      this.position[1] += x[1];
      this.position[2] += x[2];
    } else {
      this.position[0] += x;
      this.position[1] += x;
      this.position[2] += x;
    }
  } else {
    this.position[0] += x;
    this.position[1] += y;
    this.position[2] += z;
  }
  this._isIdentity = this._isIdentity &&
   this.position[0] === 0 &&
   this.position[1] === 0 &&
   this.position[2] === 0;
  this._matrixDirty = true;
  return this;
};
/**
 * Sets this transform's rotation in the form of a [quaternion]{@tutorial glmath} (a 4-element array
 * for describing 3D rotations). Has no effect if a matrix was defined with {@link Transform#setMatrix}
 * and the transform wasn't reset yet with {@link Transform#resetTransform}.
 * @param {Array<number>} quat A four-element array describing the rotation.
 * A quaternion is returned from the methods {@link MathUtil.quatFromAxisAngle}
 * and {@link MathUtil.quatFromTaitBryan}, among others.
 * @returns {Transform} This object.
 * @example
 * // Set an object's rotation to 30 degrees about the X axis
 * transform.setQuaternion(MathUtil.quatFromAxisAngle(20,1,0,0));
 * // Set an object's rotation to identity (the object isn't transformed)
 * transform.setQuaternion(MathUtil.quatIdentity());
 * // Set an object's rotation to 30 degree pitch multiplied
 * // by 40 degree roll
 * transform.setQuaternion(MathUtil.quatFromTaitBryan(30,0,40));
 * // Set an object's rotation to 40 units about X axis, 20 units about Y axis,
 * // and 50 units about Z axis
 * transform.setQuaternion(H3DU.MathUtil.quatFromTaitBryan(40,20,50));
 * // Set an object's rotation to 20 units about Y axis
 * transform.setQuaternion(H3DU.MathUtil.quatFromAxisAngle(20,0,1,0));
 */
Transform.prototype.setQuaternion = function(quat) {
  if(this.complexMatrix)return this;
  this.rotation = quat.slice(0, 4);
  MathUtil.quatNormalizeInPlace(this.rotation);
  this._matrixDirty = true;
  return this;
};
/**
 * Sets this transform's rotation in the form of an angle and an axis of
 * rotation. Has no effect if a matrix was defined with {@link Transform#setMatrix}
 * and the transform wasn't reset yet with {@link Transform#resetTransform}.
 * @param {Array<number>|number} angle The desired angle
 * to rotate in degrees.  If "v", "vy", and "vz" are omitted, this can
 * instead be a 4-element array giving the axis
 * of rotation as the first three elements, followed by the angle
 * in degrees as the fourth element. If the axis of rotation
 * points backward from the "eye", a positive value means the angle runs in
 * a counterclockwise direction for right-handed coordinate systems and
 * in a clockwise direction for left-handed systems.
 * @param {Array<number>|number} v X-component of the point lying on the axis
 * of rotation.  If "vy" and "vz" are omitted, this can
 * instead be a 3-element array giving the axis
 * of rotation in x, y, and z, respectively.
 * @param {number} vy Y-component of the point lying on the axis
 * of rotation.
 * @param {number} vz Z-component of the point lying on the axis
 * of rotation.
 * @returns {Transform} This object.
 */
Transform.prototype.setRotation = function(angle, v, vy, vz) {
  return this.setQuaternion(MathUtil.quatFromAxisAngle(angle, v, vy, vz));
};

/**
 * Combines an object's current rotation with another rotation
 * described by a [quaternion]{@tutorial glmath} (a 4-element array
 * for describing 3D rotations). The combined rotation will have the
 * same effect as the new rotation followed by the existing rotation.
 * Has no effect if a matrix was defined with {@link Transform#setMatrix}
 * and the transform wasn't reset yet with {@link Transform#resetTransform}.
 * @param {Array<number>} quat A four-element array describing the rotation.
 * A quaternion is returned from the methods {@link MathUtil.quatFromAxisAngle}
 * or {@link MathUtil.quatFromTaitBryan}.
 * @returns {Transform} This object.
 * @example
 * // Combine an object's rotation with a rotation 20 degrees about the X axis
 * transform.multQuaternion(MathUtil.quatFromAxisAngle(20,1,0,0));
 * // Combine an object's rotation with identity
 * transform.multQuaternion(MathUtil.quatIdentity());
 * // Combine an object's rotation with 30 degree pitch multiplied
 * // by 40 degree roll
 * transform.multQuaternion(MathUtil.quatFromTaitBryan(30,0,40));
 */
Transform.prototype.multQuaternion = function(quat) {
  if(this.complexMatrix)return this;
  this.rotation = MathUtil.quatNormalizeInPlace(
    MathUtil.quatMultiply(this.rotation, quat));
  this._matrixDirty = true;
  return this;
};
/**
 * Combines an object's current rotation with another rotation
 * in the form of an angle and an axis of
 * rotation. The combined rotation will have the
 * same effect as the new rotation followed by the existing rotation.
 * Has no effect if a matrix was defined with {@link Transform#setMatrix}
 * and the transform wasn't reset yet with {@link Transform#resetTransform}.
 * @param {Array<number>|number} angle The desired angle
 * to rotate in degrees. See {@link Transform#setRotation}.
 * @param {Array<number>|number} v X-component of the point lying on the axis
 * of rotation.  If "vy" and "vz" are omitted, this can
 * instead be a 3-element array giving the axis
 * of rotation in x, y, and z, respectively.
 * @param {number} vy Y-component of the point lying on the axis
 * of rotation.
 * @param {number} vz Z-component of the point lying on the axis
 * of rotation.
 * @returns {Transform} This object.
 */
Transform.prototype.multRotation = function(angle, v, vy, vz) {
  return this.multQuaternion(MathUtil.quatFromAxisAngle(angle, v, vy, vz));
};

/**
 * Gets the transformation matrix used by an object. Depending
 * on the state of this transform, will return either:<ul>
 * <li>The 4x4 matrix passed to {@link Transform#setMatrix}, if the
 * matrix was defined with that method
 * and the transform wasn't reset yet with {@link Transform#resetTransform}.
 * <li>The matrix resulting from the position, rotation, and scale properties,
 * multiplied in that order, otherwise.
 * </ul>
 * @returns {Array<number>} Return value.
 */
Transform.prototype.getMatrix = function() {
  if(this._matrixDirty) {
    this._matrixDirty = false;
    if(MathUtil.quatIsIdentity(this.rotation)) {
      this.matrix = [this.scale[0], 0, 0, 0, 0,
        this.scale[1], 0, 0, 0, 0,
        this.scale[2], 0,
        this.position[0],
        this.position[1],
        this.position[2], 1];
      this._isIdentity = this.position[0] === 0 && this.position[1] === 0 &&
     this.position[2] === 0 && this.scale[0] === 1 &&
     this.scale[1] === 1 && this.scale[2] === 1;
    } else {
    // for best results, multiply in this order:
    // 1. translation
      this.matrix = [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0,
        this.position[0],
        this.position[1],
        this.position[2], 1];
      // 2. rotation
      this.matrix = MathUtil.mat4multiply(this.matrix,
        MathUtil.quatToMat4(this.rotation));
      // 3. scaling
      MathUtil.mat4scaleInPlace(this.matrix, this.scale);
      const m = this.matrix;
      this._isIdentity =
     m[0] === 1 && m[1] === 0 && m[2] === 0 && m[3] === 0 &&
     m[4] === 0 && m[5] === 1 && m[6] === 0 && m[7] === 0 &&
     m[8] === 0 && m[9] === 0 && m[10] === 1 && m[11] === 0 &&
     m[12] === 0 && m[13] === 0 && m[14] === 0 && m[15] === 1
      ;
    }
  } else if(this._isIdentity) {
    return MathUtil.mat4identity();
  }
  return this.matrix.slice(0, 16);
};

/**
 * Makes a copy of this transform. The copied object
 * will have its own version of the rotation, scale,
 * position, and matrix data.
 * @returns {Transform} A copy of this transform.
 */
Transform.prototype.copy = function() {
  const ret = new Transform();
  ret.scale = this.scale.slice(0, this.scale.length);
  ret.position = this.position.slice(0, this.scale.length);
  ret.complexMatrix = this.complexMatrix;
  ret._matrixDirty = this._matrixDirty;
  ret.matrix = this.matrix.slice(0, this.matrix.length);
  return ret;
};/*
 Any copyright to this file is released to the Public Domain.
 http://creativecommons.org/publicdomain/zero/1.0/
 If you like this, you should donate
 to Peter O. (original author of
 the Public Domain HTML 3D Library) at:
 http://peteroupc.github.io/
*/

/**
 * An object that associates a geometric mesh (the shape of the object) with
 * a transformation matrix (which defines the object's position and size).
 * See the "{@tutorial shapes}" tutorial.<p>
 * @constructor
 * @param {MeshBuffer} mesh A mesh in the form of a buffer object.
 * Cannot be null.
 */
const Shape = function(mesh) {
  if(typeof mesh === "undefined" || mesh === null)throw new Error("mesh is null");
  this.meshBuffer = mesh;
  this.transform = new Transform();
  this.parent = null;
  this.visible = true;
};
/**
 * Returns a reference to the mesh buffer used by this shape.
 * @returns {MeshBuffer} Return value.
 */
Shape.prototype.getMeshBuffer = function() {
  return this.meshBuffer;
};
/**
 * Gets the number of vertices composed by
 * all shapes in this scene.
 * @returns {number} Return value.
 */
Shape.prototype.vertexCount = function() {
  return this.meshBuffer ? this.meshBuffer.vertexCount() : 0;
};
/**
 * Gets the number of primitives (triangles, lines,
 * and points) composed by all shapes in this scene.
 * @returns {number} Return value.
 */
Shape.prototype.primitiveCount = function() {
  return this.meshBuffer ? this.meshBuffer.primitiveCount() : 0;
};
/**
 * Sets whether this shape will be drawn on rendering.
 * @param {boolean} value True if this shape will be visible; otherwise, false.
 * @returns {Shape} This object.
 */
Shape.prototype.setVisible = function(value) {
  this.visible = !!value;
  return this;
};
/**
 * Gets whether this shape will be drawn on rendering.
 * @returns {boolean} True if this shape will be visible; otherwise, false.
 */
Shape.prototype.getVisible = function() {
  return this.visible;
};
/**
 * Makes a copy of this object. The copied object
 * will have its own version of the transform.
 * The copied shape won't have a parent.
 * @returns {Shape} A copy of this object.
 */
Shape.prototype.copy = function() {
  const ret = new Shape(this.meshBuffer);
  ret.visible = this.visible;
  ret.parent = null;
  ret.transform = this.getTransform().copy();
  return ret;
};
/**
 * Returns the transform used by this shape object.
 * The transform won't be copied.
 * @returns {Transform} Return value.
 */
Shape.prototype.getTransform = function() {
  return this.transform;
};
/**
 * Finds a bounding box that holds all vertices in this shape.
 * The bounding box is not guaranteed to be the
 * tightest, and the box will be transformed to world space
 * using this object's transform.
 * @returns {Array<number>} An array of six numbers describing an
 * axis-aligned bounding box
 * that fits all vertices in the shape. The first three numbers
 * are the smallest-valued X, Y, and Z coordinates, and the
 * last three are the largest-valued X, Y, and Z coordinates.
 * If the shape has no vertices, returns the array [Inf, Inf, Inf, -Inf,
 * -Inf, -Inf].
 */
Shape.prototype.getBounds = function() {
  if(!this.meshBuffer) {
    const inf = Number.POSITIVE_INFINITY;
    return [inf, inf, inf, -inf, -inf, -inf];
  }
  const bounds = this.meshBuffer.getBounds();
  if(MathUtil.boxIsEmpty(bounds))return bounds;
  const matrix = this.getMatrix();
  if(MathUtil.mat4isIdentity(matrix)) {
    return bounds.slice(0, 6);
  } else if(matrix[1] === 0 && matrix[2] === 0 && matrix[3] === 0 &&
    matrix[4] === 0 && matrix[6] === 0 && matrix[7] === 0 && matrix[8] === 0 &&
    matrix[9] === 0 && matrix[11] === 0 && matrix[15] === 1) {
    // just a scale and/or translate
    const ret = [];
    const t2 = matrix[0];
    const t3 = matrix[12];
    ret[0] = t2 * bounds[0] + t3;
    const t4 = matrix[5];
    const t5 = matrix[13];
    ret[1] = t4 * bounds[1] + t5;
    const t6 = matrix[10];
    const t7 = matrix[14];
    ret[2] = t6 * bounds[2] + t7;
    const ret2 = [t2 * bounds[3] + t3, t4 * bounds[4] + t5, t6 * bounds[5] + t7];
    return [
      Math.min(ret[0], ret2[0]),
      Math.min(ret[1], ret2[1]),
      Math.min(ret[2], ret2[2]),
      Math.max(ret[0], ret2[0]),
      Math.max(ret[1], ret2[1]),
      Math.max(ret[2], ret2[2])
    ];
  } else {
    // rotation, shear, and/or non-affine transformation
    const boxVertices = [
      MathUtil.mat4projectVec3(matrix, bounds[0], bounds[1], bounds[2]),
      MathUtil.mat4projectVec3(matrix, bounds[0], bounds[1], bounds[5]),
      MathUtil.mat4projectVec3(matrix, bounds[0], bounds[4], bounds[2]),
      MathUtil.mat4projectVec3(matrix, bounds[0], bounds[4], bounds[5]),
      MathUtil.mat4projectVec3(matrix, bounds[3], bounds[1], bounds[2]),
      MathUtil.mat4projectVec3(matrix, bounds[3], bounds[1], bounds[5]),
      MathUtil.mat4projectVec3(matrix, bounds[3], bounds[4], bounds[2]),
      MathUtil.mat4projectVec3(matrix, bounds[3], bounds[4], bounds[5])
    ];
    let bv = boxVertices[0];
    const retval = [bv[0], bv[1], bv[2], bv[0], bv[1], bv[2]];
    let i;
    for (i = 1; i < 8; i++) {
      bv = boxVertices[i];
      retval[0] = Math.min(retval[0], bv[0]);
      retval[1] = Math.min(retval[1], bv[1]);
      retval[2] = Math.min(retval[2], bv[2]);
      retval[3] = Math.max(retval[3], bv[0]);
      retval[4] = Math.max(retval[4], bv[1]);
      retval[5] = Math.max(retval[5], bv[2]);
    }
    return retval;
  }
};
/** @ignore */
Shape.prototype.isCulled = function(frustum) {
  if(!this.meshBuffer || !this.visible)return true;
  return !MathUtil.frustumHasBox(frustum, this.getBounds());
};
/**
 * Sets this shape's transformation
 * to a copy of the given transformation.
 * @param {Transform} transform The transformation to
 * set to a copy of.
 * @returns {Shape} This object.
 */
Shape.prototype.setTransform = function(transform) {
  this.transform = transform.copy();
  return this;
};
/**
 * Sets the scale of this shape relative to its original
 * size. See {@link Transform#setScale}
 * @param {number|Array<number>} x X axis scaling factor for this shape object.
 *   If "y" and "z" are null, undefined, or omitted, this is instead
 * a 3-element array giving the scaling factors
 * for the X, Y, and Z dimensions, respectively, or a single number
 * giving the scaling factor for all three dimensions.
 * @param {number} [y] Y axis scaling factor for this shape object.
 * @param {number} [z] Z axis scaling factor for this shape object.
 * @returns {Shape} This object.
 * @example
 * // scale the shape by 2x in all axes
 * shape.setScale(2,2,2);
 * // same, but passing an array
 * shape.setScale([2,2,2]);
 */
Shape.prototype.setScale = function(x, y, z) {
  this.getTransform().setScale(x, y, z);
  return this;
};
/**
 * Sets the relative position of this shape from its original
 * position. See {@link Transform#setPosition}
 * @param {Array<number>|number} x The X coordinate.
 *   If "y" and "z" are null, undefined, or omitted, this is instead
 * a 3-element array giving the X, Y, and Z coordinates, or a single number
 * giving the coordinate for all three dimensions.
 * @param {number} [y] The Y coordinate.
 * If "x" is an array, this parameter may be omitted.
 * @param {number} [z] The Z coordinate.
 * If "x" is an array, this parameter may be omitted.
 * @returns {Shape} This object.
 * @example
 * // Set the relative position to 2 units along X axis, 4 units along Y axis,
 * // and 5 units along Z axis
 * shape.setPosition(2,4,5);
 * // same, but passing an array
 * shape.setPosition([2,4,5]);
 */
Shape.prototype.setPosition = function(x, y, z) {
  this.getTransform().setPosition(x, y, z);
  return this;
};
/**
 * Sets this object's rotation in the form of a [quaternion]{@tutorial glmath}.
 * See {@link Transform#setQuaternion}.
 * @param {Array<number>} quat A four-element array describing the rotation.
 * @returns {Shape} This object.
 * @example
 * // rotate the shape 40 units about X axis, 20 units about Y axis,
 * // and 50 units about Z axis
 * shape.setQuaternion(H3DU.MathUtil.quatFromTaitBryan(40,20,50));
 * // rotate the shape 20 units about Y axis
 * shape.setQuaternion(H3DU.MathUtil.quatFromAxisAngle(20,0,1,0));
 */
Shape.prototype.setQuaternion = function(quat) {
  this.getTransform().setQuaternion(quat);
  return this;
};
/**
 * Gets the transformation matrix used by this shape.
 * See {@link Transform#getMatrix}.
 * @returns {Array<number>} The current transformation matrix.
 */
Shape.prototype.getMatrix = function() {
  const xform = this.getTransform();
  const thisIdentity = xform.isIdentity();
  let mat;
  if(typeof this.parent === "undefined" || this.parent === null) {
    mat = xform.getMatrix();
  } else {
    const pmat = this.parent.getMatrix();
    if(thisIdentity) {
      mat = pmat;
    } else if(MathUtil.mat4isIdentity(pmat)) {
      mat = xform.getMatrix();
    } else {
      mat = MathUtil.mat4multiply(pmat, xform.getMatrix());
    }
  }
  return mat;
};/*
 Any copyright to this file is released to the Public Domain.
 http://creativecommons.org/publicdomain/zero/1.0/
 If you like this, you should donate
 to Peter O. (original author of
 the Public Domain HTML 3D Library) at:
 http://peteroupc.github.io/
*/
/**
 * Represents a grouping of shapes. This object
 * can hold both {@link Shape} objects and
 * other {@link ShapeGroup} objects.
 * @constructor
 */
const ShapeGroup = function() {
  this._init();
};
/** @ignore */
ShapeGroup.prototype._init = function() {
  /** @ignore */
  this.shapes = [];
  this.parent = null;
  this.visible = true;
  this.transform = new Transform();
};
/**
 * Returns the number of shapes and/or shape groups that
 * are direct children of this shape group.
 * @returns {number} Return value.
 */
ShapeGroup.prototype.shapeCount = function() {
  return this.shapes.length;
};
/**
 * Gets the shape or shape group located
 * in this shape group at the given index.
 * @param {number} index Integer index, starting from 0, of the shape or shape group to set.
 * @returns {Shape|ShapeGroup} The shape or shape group located
 * in this shape group at the given index, or null if none is found there.
 */
ShapeGroup.prototype.getShape = function(index) {
  return typeof this.shapes[index] === "undefined" ? null : this.shapes[index];
};
/**
 * Sets a shape or shape group at the given index in this shape group.
 * @param {number} index Integer index, starting from 0, to set the shape or shape group at.
 * @param {Shape|ShapeGroup} shape Shape object to set at the given index.
 * @returns {ShapeGroup} This object.
 */
ShapeGroup.prototype.setShape = function(index, shape) {
  this.shapes[index] = shape;
  return this;
};

/**
 * Makes a copy of this shape group and the objects contained
 * in it. The copied object will
 * will have its own version of the transform and
 * visibility flag, and any objects contained in this one
 * will be copied using their <code>copy()</code> method.
 * The copied shape group won't have a parent.
 * @returns {ShapeGroup} A copy of this shape group.
 */
ShapeGroup.prototype.copy = function() {
  const ret = new ShapeGroup();
  ret.visible = this.visible;
  ret.transform = this.transform.copy();
  let i;
  for (i = 0; i < this.shapes.length; i++) {
    ret.addShape(this.shapes[i].copy());
  }
  return ret;
};

/**
 * Adds a 3D shape to this shape group, at the end of the list
 * of shapes. Its reference, not a copy,
 * will be stored in the list of shapes.
 * @param {Shape|ShapeGroup} shape A 3D shape.
 * Throws an error if null.
 * @returns {ShapeGroup} This object.
 */
ShapeGroup.prototype.addShape = function(shape) {
  if(!shape)throw new Error();
  shape.parent = this;
  this.shapes.push(shape);
  return this;
};
/**
 * Sets whether this shape group will be drawn on rendering.
 * @param {boolean} value True if this shape group will be visible; otherwise, false.
 * @returns {ShapeGroup} This object.
 */
ShapeGroup.prototype.setVisible = function(value) {
  this.visible = !!value;
  return this;
};
/**
 * Gets whether this shape group will be drawn on rendering.
 * @returns {boolean} value True if this shape group will be visible; otherwise, false.
 */
ShapeGroup.prototype.getVisible = function() {
  return this.visible;
};
/**
 * Gets a reference to the transform used by this shape group object.
 * @returns {Transform} Return value.
 */
ShapeGroup.prototype.getTransform = function() {
  return this.transform;
};
/**
 * Gets a copy of the transformation needed to transform
 * this shape group's coordinates to world coordinates.
 * @returns {Transform} A 4x4 matrix.
 */
ShapeGroup.prototype.getMatrix = function() {
  const xform = this.getTransform();
  const thisIdentity = xform.isIdentity();
  let mat;
  if(typeof this.parent !== "undefined" && this.parent !== null) {
    const pmat = this.parent.getMatrix();
    if(thisIdentity) {
      mat = MathUtil.mat4multiply(pmat, xform.getMatrix());
    } else if(MathUtil.mat4isIdentity(pmat)) {
      mat = xform.getMatrix();
    } else {
      mat = pmat;
    }
  } else {
    mat = xform.getMatrix();
  }
  return mat;
};
/**
 * Sets the transform used by this shape group to a copy
 * of the given transform. Child
 * shapes can set their own transforms, in which case the
 * rendering process will multiply this shape group's transform
 * with the child shape's transform as it renders the child shape.
 * @param {Transform} transform The transform to
 * copy for the use of this shape group.
 * @returns {Object} Return value.
 */
ShapeGroup.prototype.setTransform = function(transform) {
  this.transform = transform.copy();
  return this;
};

/**
 * Removes all instances of a 3D shape from this shape group
 * @param {Shape|ShapeGroup} shape The 3D shape to remove.
 * @returns {ShapeGroup} This object.
 */
ShapeGroup.prototype.removeShape = function(shape) {
  let i;
  for (i = 0; i < this.shapes.length; i++) {
    if(this.shapes[i] === shape) {
      this.shapes.splice(i, 1);
      i--;
    }
  }
  return this;
};
/**
 * Finds a bounding box that holds all vertices in this shape group.
 * The bounding box is not guaranteed to be the
 * tightest, and the box will be in world space coordinates.
 * @returns {Array<number>} An array of six numbers describing an
 * axis-aligned bounding box
 * that fits all vertices in the shape group. The first three numbers
 * are the smallest-valued X, Y, and Z coordinates, and the
 * last three are the largest-valued X, Y, and Z coordinates.
 * If the shape group has no vertices, returns the array [Inf, Inf, Inf, -Inf,
 * -Inf, -Inf].
 */
ShapeGroup.prototype.getBounds = function() {
  const inf = Number.POSITIVE_INFINITY;
  const ret = [inf, inf, inf, -inf, -inf, -inf];
  let first = true;
  let i;
  for (i = 0; i < this.shapes.length; i++) {
    const b = this.shapes[i].getBounds();
    // NOTE: The returned bounding
    if(!MathUtil.boxIsEmpty(b)) {
      if(first) {
        ret[0] = b[0];
        ret[1] = b[1];
        ret[2] = b[2];
        ret[3] = b[3];
        ret[4] = b[4];
        ret[5] = b[5];
        first = false;
      } else {
        ret[0] = Math.min(b[0], ret[0]);
        ret[1] = Math.min(b[1], ret[1]);
        ret[2] = Math.min(b[2], ret[2]);
        ret[3] = Math.max(b[3], ret[3]);
        ret[4] = Math.max(b[4], ret[4]);
        ret[5] = Math.max(b[5], ret[5]);
      }
    }
  }
  return ret;
};

/**
 * Gets the number of vertices composed by all shapes in this shape group.
 * @returns {number} Return value.
 */
ShapeGroup.prototype.vertexCount = function() {
  let c = 0;
  let i;
  for (i = 0; i < this.shapes.length; i++) {
    c += this.shapes[i].vertexCount();
  }
  return c;
};
/**
 * Gets the number of primitives (triangles, lines,
 * and points) composed by all shapes in this shape group.
 * @returns {number} Return value.
 */
ShapeGroup.prototype.primitiveCount = function() {
  let c = 0;
  let i;
  for (i = 0; i < this.shapes.length; i++) {
    c += this.shapes[i].primitiveCount();
  }
  return c;
};
/**
 * Sets the relative position of the shapes in this group
 * from their original position.
 * See {@link Transform#setPosition}
 * This method will modify this shape group's transform
 * rather than the transform for each shape in the group.
 * @param {number|Array<number>} x X coordinate
 * or a 3-element position array, as specified in {@link Transform#setScale}.
 * @param {number} y Y coordinate.
 * @param {number} z Z coordinate.
 * @returns {ShapeGroup} This object.
 */
ShapeGroup.prototype.setPosition = function(x, y, z) {
  this.transform.setPosition(x, y, z);
  return this;
};
/**
 * Sets this shape group's rotation in the form of a [quaternion]{@tutorial glmath}.
 * See {@link Transform#setQuaternion}.
 * This method will modify this shape group's transform
 * rather than the transform for each shape in the group.
 * @param {Array<number>} quat A four-element array describing the rotation.
 * @returns {ShapeGroup} This object.
 */
ShapeGroup.prototype.setQuaternion = function(quat) {
  this.transform.setQuaternion(quat);
  return this;
};
/**
 * Sets the scale of this shape group relative to its original
 * size. See {@link Transform#setScale}.
 * This method will modify this shape group's transform
 * rather than the transform for each shape in the group.
 * @param {number|Array<number>} x Scaling factor for this object's width,
 * or a 3-element scaling array, as specified in {@link Transform#setScale}.
 * @param {number} y Scaling factor for this object's height.
 * @param {number} z Scaling factor for this object's depth.
 * @returns {ShapeGroup} This object.
 */
ShapeGroup.prototype.setScale = function(x, y, z) {
  this.transform.setScale(x, y, z);
  return this;
};/*
 Any copyright to this file is released to the Public Domain.
 http://creativecommons.org/publicdomain/zero/1.0/
 If you like this, you should donate
 to Peter O. (original author of
 the Public Domain HTML 3D Library) at:
 http://peteroupc.github.io/
*/
/**
 * Contains methods that create meshes
 * of various geometric shapes and solids, such as cubes, cylinders,
 * and spheres.<p>
 * <img src='shapes.png' alt='An assortment of shapes: a red box, a blue sphere, a bright green 2D ring, and an
 * orange partial ring on the first row; and a yellow 3D ring, a brown cylinder, a dark
 * green square, and a purple cone on the second row.'/>
 * @constructor
 */
const Meshes = {};

/**
 * Primitive mode for rendering a triangle fan. The first 3
 * vertices make up the first triangle, and each additional
 * triangle is made up of the first vertex of the first triangle,
 * the previous vertex, and 1 new vertex.
 * @constructor
 * @ignore
 */
const TriangleFan = function(indices) {
  this.indices = indices;
  this.start = -1;
  this.last = -1;
  this.addIndex = function(index) {
    if(this.start < 0) {
      this.start = index;
    } else if(this.last < 0) {
      this.last = index;
    } else {
      this.indices.push(this.start);
      this.indices.push(this.last);
      this.indices.push(index);
      this.last = index;
    }
  };
};

function meshBufferFromVertexGrid(vertices, width, height) {
  const indices = [];
  let y;
  for (y = 0; y < height - 1; y++) {
    let x;
    for (x = 0; x < width - 1; x++) {
      const index0 = y * width + x;
      const index1 = index0 + width;
      const index2 = index0 + 1;
      const index3 = index1 + 1;
      indices.push(index0, index1, index2);
      indices.push(index2, index1, index3);
    }
  }
  return MeshBuffer.fromPositionsNormalsUV(vertices, indices);
}

function meshBufferFromUWrapVertexGrid(vertices, width, height) {
  const indices = [];
  let y;
  for (y = 0; y < height - 1; y++) {
    let x;
    for (x = 0; x < width; x++) {
      const index0 = y * width + x;
      const index1 = index0 + width;
      const index2 = x === width - 1 ? y * width : index0 + 1;
      const index3 = x === width - 1 ? (y + 1) * width : index1 + 1;
      indices.push(index0, index1, index2);
      indices.push(index2, index1, index3);
    }
  }
  return MeshBuffer.fromPositionsNormalsUV(vertices, indices);
}

/**
 * Creates a mesh of a box (rectangular prism), which
 * will be centered at the origin.
 * Will create texture coordinates such that the same texture
 * is used on each face of the box. Texture coordinates are generated assuming that the coordinate (0,0)
 * is at the lower-left corner of the texture and (1,1) is at the upper-right
 * corner. The resulting mesh buffer
 * will use 36 vertex indices divided into 12 triangles, with each
 * face using two triangles. The faces will be ordered as follows:
 * Negative-X axis-facing face, positive-X axis-facing face, negative-Y axis-facing face,
 * positive-Y axis-facing face, negative-Z axis-facing face, positive-Z axis-facing face.
 * @param {number} xSize Width of the box.
 * @param {number} ySize Height of the box.
 * @param {number} zSize Depth of the box. If xSize, ySize, and zSize are the
 * same number, the result is a cube.
 * @param {boolean} [inward] If true, the normals generated by this
 * method will point inward; otherwise, outward. Should normally be false
 * unless the box will be viewed from the inside.
 * @returns {MeshBuffer} The generated mesh.
 */
Meshes.createBox = function(xSize, ySize, zSize, inward) {
  const x = 0.5 * xSize;
  const y = 0.5 * ySize;
  const z = 0.5 * zSize;
  return Meshes.createBoxEx([-x, -y, -z, x, y, z], inward);
};

/**
 * Creates a mesh of a box (rectangular prism) given the box's smallest and largest coordinates.
 * Will create texture coordinates such that the same texture
 * is used on each face of the box. Texture coordinates are generated assuming that the coordinate (0,0)
 * is at the lower-left corner of the texture and (1,1) is at the upper-right
 * corner. The resulting mesh buffer
 * will use 36 vertex indices divided into 12 triangles, with each
 * face using two triangles. The faces will be ordered as follows:
 * Negative-X axis-facing face, positive-X axis-facing face, negative-Y axis-facing face,
 * positive-Y axis-facing face, negative-Z axis-facing face, positive-Z axis-facing face.
 * @param {Array<number>} box An axis-aligned bounding
 * box, which is an array of six values, that bounds the box mesh.
 * The first three values are the smallest X, Y, and Z coordinates,
 * and the last three values are the largest X, Y, and Z
 * coordinates. If the dimensions along all three axes are the
 * same, the result is a cube.
 * @param {boolean} [inward] If true, the normals generated by this
 * method will point inward; otherwise, outward. Should normally be false
 * unless the box will be viewed from the inside.
 * @returns {MeshBuffer} The generated mesh.  Throws an error if "box" is null or contains negative dimensions along any of its axes.
 * @example <caption>The following example creates a wire-frame box of the given corner coordinates (<code>box</code>) and color (<code>color</code>).</caption>
 * var boxMesh=Meshes.createBoxEx(box)
 * .setColor(color).wireFrame()
 */
Meshes.createBoxEx = function(box, inward) {
  if(!box)throw new Error();
  const dims = MathUtil.boxDimensions(box);
  if(dims[0] < 0 || dims[1] < 0 || dims[2] < 0)throw new Error();
  const posNormal = inward ? -1.0 : 1.0;
  const negNormal = inward ? 1.0 : -1.0;
  // Position X, Y, Z, normal NX, NY, NZ, texture U, V
  const vertices = [
    box[0], box[1], box[5], negNormal, 0.0, 0.0, 1.0, 0.0,
    box[0], box[4], box[5], negNormal, 0.0, 0.0, 1.0, 1.0,
    box[0], box[4], box[2], negNormal, 0.0, 0.0, 0.0, 1.0,
    box[0], box[1], box[2], negNormal, 0.0, 0.0, 0.0, 0.0,
    box[3], box[1], box[2], posNormal, 0.0, 0.0, 1.0, 0.0,
    box[3], box[4], box[2], posNormal, 0.0, 0.0, 1.0, 1.0,
    box[3], box[4], box[5], posNormal, 0.0, 0.0, 0.0, 1.0,
    box[3], box[1], box[5], posNormal, 0.0, 0.0, 0.0, 0.0,
    box[3], box[1], box[2], 0.0, negNormal, 0.0, 1.0, 0.0,
    box[3], box[1], box[5], 0.0, negNormal, 0.0, 1.0, 1.0,
    box[0], box[1], box[5], 0.0, negNormal, 0.0, 0.0, 1.0,
    box[0], box[1], box[2], 0.0, negNormal, 0.0, 0.0, 0.0,
    box[3], box[4], box[5], 0.0, posNormal, 0.0, 1.0, 0.0,
    box[3], box[4], box[2], 0.0, posNormal, 0.0, 1.0, 1.0,
    box[0], box[4], box[2], 0.0, posNormal, 0.0, 0.0, 1.0,
    box[0], box[4], box[5], 0.0, posNormal, 0.0, 0.0, 0.0,
    box[0], box[1], box[2], 0.0, 0.0, negNormal, 1.0, 0.0,
    box[0], box[4], box[2], 0.0, 0.0, negNormal, 1.0, 1.0,
    box[3], box[4], box[2], 0.0, 0.0, negNormal, 0.0, 1.0,
    box[3], box[1], box[2], 0.0, 0.0, negNormal, 0.0, 0.0,
    box[3], box[1], box[5], 0.0, 0.0, posNormal, 1.0, 0.0,
    box[3], box[4], box[5], 0.0, 0.0, posNormal, 1.0, 1.0,
    box[0], box[4], box[5], 0.0, 0.0, posNormal, 0.0, 1.0,
    box[0], box[1], box[5], 0.0, 0.0, posNormal, 0.0, 0.0];
  const indices = [0, 1, 2, 0, 2, 3, 4, 5, 6, 4, 6, 7, 8, 9, 10, 8, 10, 11, 12,
    13, 14, 12, 14, 15, 16, 17, 18, 16, 18, 19, 20, 21, 22, 20, 22, 23];
  return MeshBuffer.fromPositionsNormalsUV(vertices, indices);
};

/**
 * Creates a mesh of a cylinder or cone. The cylinder's base will
 * be centered at the origin and its height will run along the
 * positive Z axis. The base and top themselves will not be
 * included in the mesh.<p>
 * Texture coordinates for the cylinder (other than the base) will
 * be generated such that the V (vertical)
 * coordinates start from the bottom of the texture and increase from the origin
 * to the positive Z axis, and the U (horizontal) coordinates start from the left of the
 * texture and increase from the positive X to positive Y to negative X to negative
 * Y to positive X axis. Texture coordinates are generated assuming that the coordinate (0,0)
 * is at the lower-left corner of the texture and (1,1) is at the upper-right
 * corner. <p>
 * The X, Y, and Z coordinates of a point on the cylinder are
 * <code>(-R*cos(&lambda;), -R*sin(&lambda;), H*&phi;)</code>,
 * where &phi; = <code>(&pi;/2 + L)/&pi;</code>, L is the latitude in radians,
 * &lambda; is the longitude in radians, H = <code>height</code>,
 * R = <code>baseRad + (topRad - baseRad) * &phi;</code>,
 * and west and south latitudes and
 * longitudes are negative. (The formula for converting latitude
 * and longitude is mentioned here because their meaning depends on
 * exactly how the texture coordinates are generated on the cylinder.
 * It assumes that in the texture, longitudes range from -180&deg; to 0&deg; to 180&deg; from
 * left to right, and latitudes range from 90&deg; to 0&deg; to -90&deg; from top to bottom.)<p>
 * See the "{@tutorial shapes}" tutorial.
 * @param {number} baseRad Radius of the base of the cylinder. If 0,
 * this function will create an approximation to a downward pointing cone.
 * @param {number} topRad Radius of the top of the cylinder. If 0,
 * this function will create an approximation to an upward pointing cone.
 * @param {number} height Height of the cylinder.
 * @param {number} [slices] Number of lengthwise "slices" the cylinder consists
 * of, each slice going through the center of the cylinder. This function will
 * create a triangular prism if "slices" is 3
 * and both radii are the same; a triangular pyramid if "slices" is
 * 3 and either radius is zero; a rectangular prism if "slices" is 4
 * and both radii are the same; and a rectangular pyramid if "slices"
 * is 4 and either radius is zero. Must be 3 or greater.
 * May be null, undefined, or omitted, in which case the default is 32.
 * @param {number} [stacks] Number of vertical stacks the cylinder consists of.
 * May be null, undefined, or omitted, in which case the default is 1.
 * @param {boolean} [flat] If true, will generate normals such that the
 * cylinder will be flat shaded; otherwise, will generate normals such that the
 * cylinder will be smooth shaded.
 * @param {boolean} [inside] If true, the normals generated by this
 * method will point inward; otherwise, outward. Should normally be false
 * unless the cylinder will be viewed from the inside.
 * @returns {MeshBuffer} The generated mesh.
 */
Meshes.createCylinder = function(baseRad, topRad, height, slices, stacks, flat, inside) {
  if(typeof slices === "undefined" || slices === null)slices = 32;
  if(typeof stacks === "undefined" || stacks === null)stacks = 1;
  if(slices <= 2)throw new Error("too few slices");
  if(stacks < 1)throw new Error("too few stacks");
  if(height < 0)throw new Error("negative height");
  if(baseRad <= 0 && topRad <= 0 || height === 0) {
  // both baseRad and topRad are zero or negative,
  // or height is zero
    return new MeshBuffer();
  }
  const normDir = inside ? -1 : 1;
  const sc = [];
  const tc = [];
  const angleStep = MathUtil.PiTimes2 / slices;
  const cosStep = Math.cos(angleStep);
  const sinStep = angleStep <= 3.141592653589793 ? Math.sqrt(1.0 - cosStep * cosStep) : -Math.sqrt(1.0 - cosStep * cosStep);
  let sangle = 1.0; // sin(90.0deg)
  let cangle = 0; // cos(90.0deg)
  let i;
  for (i = 0; i < slices; i++) {
    const t = i * 1.0 / slices;
    sc.push(sangle, cangle);
    tc.push(t);
    const tsin = cosStep * sangle + sinStep * cangle;
    const tcos = cosStep * cangle - sinStep * sangle;
    cangle = tcos;
    sangle = tsin;
  }
  sc.push(sc[0], sc[1]);
  tc.push(1);
  if(height > 0) {
    let sinSlopeNorm;
    let cosSlopeNorm;
    if(baseRad === topRad) {
      sinSlopeNorm = 0;
      cosSlopeNorm = normDir;
    } else {
      let dy = baseRad - topRad;
      let dx = height;
      const len = Math.sqrt(dx * dx + dy * dy);
      // Convert to a unit vector
      if(len !== 0) {
        const ilen = 1.0 / len;
        dy *= ilen;
        dx *= ilen;
      }
      cosSlopeNorm = dx * normDir;
      sinSlopeNorm = dy * normDir;
    }
    const recipstacks = 1.0 / stacks;
    const vertices = [];
    let i;
    for (i = 0; i <= stacks; i++) {
      const zStart = i === stacks ? 1.0 : i * recipstacks;
      const zStartHeight = height * zStart;
      const radiusStart = baseRad + (topRad - baseRad) * zStart;
      let j;
      for (j = 0; j <= slices; j++) {
        const x = sc[j * 2];

        const y = sc[j * 2 + 1];
        vertices.push(x * radiusStart, y * radiusStart, zStartHeight,
          x * cosSlopeNorm, y * cosSlopeNorm, sinSlopeNorm,
          1 - tc[j], zStart);
      }
    }
    const mesh = meshBufferFromVertexGrid(vertices, slices + 1, stacks + 1);
    return flat ? mesh.recalcNormals(flat, inside) : mesh;
  } else {
    return MeshBuffer.fromPositionsNormalsUV([], []);
  }
};
/**
 * Creates a mesh of a figure generated by revolving a path of 2-dimensional
 * points about the Z axis.<p>
 * Texture coordinates will
 * be generated such that the V (vertical)
 * coordinates start from the bottom of the texture and increase along the Z axis in the direction
 * of the given path, and the U (horizontal) coordinates start from the left of the
 * texture and increase from the positive X to positive Y to negative X to negative
 * Y to positive X axis. Texture coordinates are generated assuming that the coordinate (0,0)
 * is at the lower-left corner of the texture and (1,1) is at the upper-right
 * corner. <p>
 * @param {Array<number>} points Array of alternating X and Z coordinates describing
 * a two-dimensional path that will revolve around the Z axis to generate the figure
 * (the first number is an X coordinate, the second is a Z coordinate, and so on).
 * Each Z coordinate is a Z coordinate of the point where the path lies, and
 * each X coordinate is the radius of the figure at that point. The Z coordinates
 * should be given in increasing order and should not be the same from
 * one point to the next. This parameter's
 * length must be 4 or greater and be an even number.
 * @param {number} [slices] Number of lengthwise "slices" the figure consists of.
 * Must be 3 or greater. May be null or omitted; default is 32.
 * @param {boolean} [flat] If true, will generate normals such that the
 * figure will be flat shaded; otherwise, will generate normals such that the
 * figure will be smooth shaded.
 * @param {boolean} [inside] If true, the normals generated by this
 * method will point inward; otherwise, outward. Should normally be false
 * unless the figure will be viewed from the inside.
 * @returns {MeshBuffer} The generated mesh.
 */
Meshes.createLathe = function(points, slices, flat, inside) {
  // NOTE: Y coordinate should not be the same from one point to the next
  if(points.length < 4)throw new Error("too few points");
  if(typeof slices === "undefined" || slices === null)slices = 32;
  if(slices <= 2)throw new Error("too few slices");
  if(points.length % 1 !== 0)throw new Error("points array length is not an even number");
  let i;
  for(i = 0; i < points.length; i += 2) {
    if(points[i << 1] < 0)throw new Error("point's x is less than 0");
  }
  const sc = [];
  const tc = [];
  const angleStep = MathUtil.PiTimes2 / slices;
  const cosStep = Math.cos(angleStep);
  const sinStep = angleStep <= 3.141592653589793 ? Math.sqrt(1.0 - cosStep * cosStep) : -Math.sqrt(1.0 - cosStep * cosStep);
  let sangle = 1.0; // sin(90.0deg)
  let cangle = 0; // cos(90.0deg)
  for(i = 0; i < slices; i++) {
    const t = i * 1.0 / slices;
    sc.push(sangle, cangle);
    tc.push(t);
    const tsin = cosStep * sangle + sinStep * cangle;
    const tcos = cosStep * cangle - sinStep * sangle;
    cangle = tcos;
    sangle = tsin;
  }
  sc.push(sc[0], sc[1]);
  tc.push(1);
  const stacks = points.length / 2 - 1;
  const recipstacks = 1.0 / stacks;
  const vertices = [];
  for(i = 0; i <= stacks; i++) {
    const zStart = i === stacks ? 1.0 : i * recipstacks;
    const index = i << 1;
    const zStartHeight = points[index + 1];
    const radiusStart = points[index];
    let j;
    for (j = 0; j <= slices; j++) {
      vertices.push(sc[j * 2] * radiusStart,
        sc[j * 2 + 1] * radiusStart, zStartHeight,
        0, 0, 0,
        1 - tc[j], zStart);
    }
  }
  const mesh = meshBufferFromVertexGrid(vertices, slices + 1, stacks + 1);
  return mesh.recalcNormals(flat, inside);
};

/**
 * Creates a mesh of a closed cylinder or closed cone. The cylinder's base will
 * be centered at the origin and its height will run along the
 * positive Z axis. The base and top will be included in the mesh if
 * their radius is greater than 0. Will generate texture coordinates for
 * the cylinder and for the base and top.
 * The base's and top's texture coordinates will be such that the
 * texture will be flat as seen from either. Texture coordinates are generated assuming that the coordinate (0,0)
 * is at the lower-left corner of the texture and (1,1) is at the upper-right
 * corner. <p>
 * See {@link Meshes.createCylinder} for information on how texture
 * coordinates for the cylinder (other than the base and top) are generated and how
 * to find the coordinates of a particular point on the cylinder.<p>
 * See the "{@tutorial shapes}" tutorial.
 * @param {number} baseRad Radius of the base of the cylinder.
 * See {@link Meshes.createCylinder}.
 * @param {number} topRad Radius of the top of the cylinder.
 * See {@link Meshes.createCylinder}.
 * @param {number} height Height of the cylinder.
 * @param {number} slices  Number of lengthwise "slices" the cylinder consists
 * of. See {@link Meshes.createCylinder}.
 * @param {number} stacks Number of vertical stacks the cylinder consists of.
 * May be null, undefined, or omitted, in which case the default is 1.
 * @param {boolean} [flat] If true, will generate normals such that the
 * cylinder will be flat shaded; otherwise, will generate normals such that the
 * cylinder will be smooth shaded.
 * @param {boolean} [inside] If true, the normals generated by this
 * method will point inward; otherwise, outward. Should normally be false
 * unless the cylinder will be viewed from the inside.
 * @returns {MeshBuffer} The generated mesh.
 * @example <caption>The following method creates a cone that's closed at its base.
 * <img src="mesh1.png"></caption>
 * function createClosedCone(radius,height,slices) {
 * return Meshes.createClosedCylinder(radius,0,height,slices,1);
 * }
 */
Meshes.createClosedCylinder = function(baseRad, topRad, height, slices, stacks, flat, inside) {
  const cylinder = Meshes.createCylinder(baseRad, topRad, height, slices, stacks, flat, inside);
  const base = Meshes.createDisk(0.0, baseRad, slices, 2, !inside).reverseWinding();
  const top = Meshes.createDisk(0.0, topRad, slices, 2, inside);
  // move the top disk to the top of the cylinder
  top.transform(MathUtil.mat4translated(0, 0, height));
  // merge the base and the top
  return cylinder.merge(base).merge(top);
};

/**
 * Creates a mesh of a 2D circular disk or regular polygon, possibly with a hole in the middle, centered at the origin.
 * Assuming the Y axis points up, the X axis right,
 * and the Z axis backward from the "eye", the first vertex in the outer edge
 * of the 2D disk will be at the 12 o'clock position.
 * Will also generate texture coordinates, assuming that the coordinate (0,0)
 * is at the lower-left corner of the texture and (1,1) is at the upper-right
 * corner.
 * See the "{@tutorial shapes}" tutorial.
 * @param {number} inner Radius of the hole in the middle of the
 * disk. If 0, no hole is created and the method will generate a regular
 * polygon with n sides, where n is the value of "slices". For example,
 * if "inner" is 0 and "slices" is 3, the result will be an equilateral triangle;
 * a square for 4 "slices", a regular pentagon for 5 "slices", and so on.
 * @param {number} outer Outer radius of the disk.
 * @param {number} [slices] Number of slices going around the disk.
 * May be null or omitted; default is 16.
 * @param {number} [loops] Number of concentric rings the disk makes up.
 * May be null or omitted; default is 1.
 * @param {boolean} [inward] If true, the normals generated by this
 * method will point in the opposite direction of the positive Z axis; otherwise,
 * in the same direction of the positive Z axis. Default is false.
 * @returns {MeshBuffer} The generated mesh.
 */
Meshes.createDisk = function(inner, outer, slices, loops, inward) {
  return Meshes.createPartialDisk(inner, outer, slices, loops, 0, 360, inward);
};

/**
 * Creates a mesh of a 2D circular disk or regular polygon or a part of either, possibly with a hole where the middle of the complete disk or polygon would be; the middle of the complete disk or polygon is placed at the origin.
 * Will also generate texture coordinates, assuming that the coordinate (0,0)
 * is at the lower-left corner of the texture and (1,1) is at the upper-right
 * corner.
 * See the "{@tutorial shapes}" tutorial.
 * @param {number} inner Radius of the hole where the middle of the
 * complete disk would be. If 0, no hole is created.
 * @param {number} outer Outer radius of the disk.
 * @param {number} [slices] Number of slices going around the partial disk.
 * May be null or omitted; default is 32.
 * @param {number} [loops] Number of concentric rings the partial disk makes up.
 * May be null or omitted; default is 1.
 * @param {number} [start] Starting angle of the partial disk, in degrees.
 * May be null or omitted; default is 0.
 * 0 degrees is at the positive Y axis,
 * and 90 degrees at the positive X axis.
 * Assuming the Y axis points up, the X axis right,
 * and the Z axis backward from the "eye", 0 degrees is at the 12 o'clock position,
 * and 90 degrees at the 3 o'clock position.
 * @param {number} [sweep] Arc length of the partial disk, in degrees.
 * May be null or omitted; default is 360. May be negative.
 * @param {boolean} [inward] If true, the normals generated by this
 * method will point in the opposite direction of the positive Z axis; otherwise,
 * in the same direction of the positive Z axis. Default is false.
 * @returns {MeshBuffer} The generated mesh.
 * @example <caption>This method creates a ring or disk striped in two colors.<br/>
 * <img src='mesh2.png' alt='Image of a disk striped in red and almost-white'/></caption>
 * // inner, outer - inner and outer radius of the disk
 * // color1, color2 - each a color vector or string specifying
 * // one of the two stripe colors
 * // sections - number of stripes
 * // sectionCount - number of sections per stripe
 * function stripedDisk(inner,outer,color1,color2,sections,sectionCount) {
 * if(sectionCount==null)sectionCount=4
 * var firstColor=true
 * var ret=new MeshBuffer()
 * var sweep=360.0/sections;
 * for(var i=0;i<sections;i++) {
 * var angle=360.0*(i*1.0/sections);
 * var mesh=Meshes.createPartialDisk(inner,outer,
 * sectionCount,1,angle,sweep)
 * .setColor(firstColor ? color1 : color2)
 * firstColor=!firstColor
 * ret.merge(mesh);
 * }
 * return ret;
 * }
 */
Meshes.createPartialDisk = function(inner, outer, slices, loops, start, sweep, inward) {
  if(typeof slices === "undefined" || slices === null)slices = 32;
  if(typeof loops === "undefined" || loops === null)loops = 1;
  if(typeof start === "undefined" || start === null)start = 0;
  if(typeof sweep === "undefined" || sweep === null)sweep = 360;
  if(slices <= 2)throw new Error("too few slices");
  if(loops < 1)throw new Error("too few loops");
  if(inner > outer)throw new Error("inner greater than outer");
  if(inner < 0)inner = 0;
  if(outer < 0)outer = 0;
  if(outer === 0 || sweep === 0)return new MeshBuffer();
  const fullCircle = sweep === 360 && start === 0;
  const sweepDir = sweep < 0 ? -1 : 1;
  if(sweep < 0)sweep = -sweep;
  sweep %= 360;
  if(sweep === 0)sweep = 360;
  const sc = [];
  const tc = [];
  let i;
  const twopi = MathUtil.PiTimes2;
  let arcLength = sweep === 360 ? twopi : sweep * MathUtil.PiDividedBy180;
  start *= MathUtil.PiDividedBy180;
  if(sweepDir < 0) {
    arcLength = -arcLength;
  }
  const angleStep = arcLength / slices;
  const cosStep = Math.cos(angleStep);
  const sinStep = angleStep >= 0 && angleStep < 6.283185307179586 ? angleStep <= 3.141592653589793 ? Math.sqrt(1.0 - cosStep * cosStep) : -Math.sqrt(1.0 - cosStep * cosStep) : Math.sin(angleStep);
  let cangle = Math.cos(start);
  let sangle = start >= 0 && start < 6.283185307179586 ? start <= 3.141592653589793 ? Math.sqrt(1.0 - cangle * cangle) : -Math.sqrt(1.0 - cangle * cangle) : Math.sin(start);
  const cstart = cangle;
  const sstart = sangle;

  let radius;

  let height;
  let vertices;
  for(i = 0; i <= slices; i++) {
    if(i === slices && arcLength === twopi) {
      sc.push(sstart, cstart);
    } else {
      sc.push(sangle, cangle);
    }
    const t = i * 1.0 / slices;
    tc.push(t);
    const tsin = cosStep * sangle + sinStep * cangle;
    const tcos = cosStep * cangle - sinStep * sangle;
    cangle = tcos;
    sangle = tsin;
  }
  if(fullCircle) {
    sc[0] = 0;
    sc[1] = 1;
    sc[sc.length - 1] = 1;
    sc[sc.length - 2] = 0;
    tc[0] = 0;
    tc[tc.length - 1] = 1;
  }
  const normalZ = inward ? -1 : 1;
  const slp1 = sweep === 360 ? slices : slices + 1;
  let x;
  let y;
  let k;
  let rso;
  if(inner === 0 && loops === 1 && sweep === 360) {
    vertices = [];
    const indices = [];
    const fan = new TriangleFan(indices);
    const radius = outer * (i / loops);
    rso = radius / outer;
    for(k = 0; k < slices; k++) {
      x = sc[k];
      y = sc[k + 1];
      vertices.push(x * radius, y * radius, 0,
        0, 0, normalZ,
        (1 + x * rso) * 0.5, (1 + y * rso) * 0.5);
      fan.addIndex(k);
    }
    fan.addIndex(0);
    return MeshBuffer.fromPositionsNormalsUV(vertices, indices);
  } else {
    height = outer - inner;
    const invouter = 1.0 / outer;
    vertices = [];
    for(i = 0; i <= loops; i++) {
      radius = inner + height * (i / loops);
      rso = radius * invouter;
      for(k = 0; k < slp1; k++) {
        x = sc[k];
        y = sc[k + 1];
        vertices.push(x * radius, y * radius, 0,
          0, 0, normalZ,
          (1 + x * rso) * 0.5, (1 + y * rso) * 0.5);
      }
    }
    return sweep === 360 ?
      meshBufferFromUWrapVertexGrid(vertices, slp1, loops + 1) :
      meshBufferFromVertexGrid(vertices, slp1, loops + 1);
  }
};

/**
 * Creates a mesh of a torus (doughnut shape), centered at the origin.
 * Will also generate texture coordinates, assuming that the coordinate (0,0)
 * is at the lower-left corner of the texture and (1,1) is at the upper-right
 * corner.
 * See the "{@tutorial shapes}" tutorial.
 * @param {number} inner Inner radius (thickness) of the torus.
 * @param {number} outer Outer radius of the torus (distance from the
 * center to the innermost part of the torus).
 * @param {number} [lengthwise] Number of lengthwise subdivisions.
 * May be null or omitted; default is 16.
 * @param {number} [crosswise] Number of crosswise subdivisions.
 * May be null or omitted; default is 16.
 * @param {boolean} [flat] If true, will generate normals such that the
 * torus will be flat shaded; otherwise, will generate normals such that it
 * will be smooth shaded.
 * @param {boolean} [inward] If true, the normals generated by this
 * method will point inward; otherwise, outward. Default is false.
 * @returns {MeshBuffer} The generated mesh.
 */
Meshes.createTorus = function(inner, outer, lengthwise, crosswise, flat, inward) {
  if(typeof crosswise === "undefined" || crosswise === null)crosswise = 16;
  if(typeof lengthwise === "undefined" || lengthwise === null)lengthwise = 16;
  if(crosswise < 3)throw new Error("crosswise is less than 3");
  if(lengthwise < 3)throw new Error("lengthwise is less than 3");
  if(inner < 0 || outer < 0)throw new Error("inner or outer is less than 0");
  if(outer === 0 || inner === 0)return new MeshBuffer();
  const tubeRadius = inner;
  const circleRad = outer;
  const sci = [];
  const scj = [];
  let cangle;
  let sangle;
  let u;
  let angleStep = MathUtil.PiTimes2 / crosswise;
  let cosStep = Math.cos(angleStep);
  let sinStep = angleStep >= 0 && angleStep < 6.283185307179586 ? angleStep <= 3.141592653589793 ? Math.sqrt(1.0 - cosStep * cosStep) : -Math.sqrt(1.0 - cosStep * cosStep) : Math.sin(angleStep);
  sangle = 0.0; // sin(0.0deg)
  cangle = 1.0; // cos(0.0deg)
  let i;
  for (i = 0; i < crosswise; i++) {
    sci.push(sangle, cangle);
    const ts = cosStep * sangle + sinStep * cangle;
    const tc = cosStep * cangle - sinStep * sangle;
    cangle = tc;
    sangle = ts;
  }
  sci.push(sci[0]);
  sci.push(sci[1]);
  angleStep = MathUtil.PiTimes2 / lengthwise;
  cosStep = Math.cos(angleStep);
  sinStep = angleStep >= 0 && angleStep < 6.283185307179586 ? angleStep <= 3.141592653589793 ? Math.sqrt(1.0 - cosStep * cosStep) : -Math.sqrt(1.0 - cosStep * cosStep) : Math.sin(angleStep);
  sangle = 0.0; // sin(0.0deg)
  cangle = 1.0; // cos(0.0deg)
  let ts;
  let tc;
  for (i = 0; i < lengthwise; i++) {
    scj.push(sangle, cangle);
    ts = cosStep * sangle + sinStep * cangle;
    tc = cosStep * cangle - sinStep * sangle;
    cangle = tc;
    sangle = ts;

  }
  scj.push(scj[0]);
  scj.push(scj[1]);
  const vertices = [];
  let j;
  for (j = 0; j <= lengthwise; j++) {
    const v0 = j / lengthwise;
    const sinr0 = scj[j * 2];
    const cosr0 = scj[j * 2 + 1];
    let i;
    for (i = 0; i <= crosswise; i++) {
      u = i / crosswise;
      const sint = sci[i * 2];
      const cost = sci[i * 2 + 1];
      const x = cost * (circleRad + cosr0 * tubeRadius);
      const y = sint * (circleRad + cosr0 * tubeRadius);
      const z = sinr0 * tubeRadius;
      const nx = cosr0 * cost;
      const ny = cosr0 * sint;
      const nz = sinr0;
      vertices.push(x, y, z, nx, ny, nz, u, v0);
    }
  }
  const mesh = meshBufferFromVertexGrid(vertices, crosswise + 1, lengthwise + 1);
  return flat ? mesh.recalcNormals(flat, inward) : mesh;
};

/**
 * Creates a mesh of a 2D rectangle, centered at the origin.
 * The plane's Z coordinate will be 0.
 * Will also generate texture coordinates that increase toward
 * the positive X and Y axes. The texture coordinates will range
 * from 0 to 1 on each end of the 2D rectangle. Texture coordinates are generated assuming that the coordinate (0,0)
 * is at the lower-left corner of the texture and (1,1) is at the upper-right
 * corner.
 * See the "{@tutorial shapes}" tutorial.
 * @param {number} [width] Width of the rectangle.
 * May be null or omitted; default is 1.
 * @param {number} [height] Height of the rectangle.
 * May be null or omitted; default is 1.
 * @param {number} [widthDiv] Number of horizontal subdivisions.
 * May be null or omitted; default is 1.
 * @param {number} [heightDiv] Number of vertical subdivisions.
 * May be null or omitted; default is 1.
 * @param {boolean} [inward] If true, the normals generated by this
 * method will point in the opposite direction of the positive Z axis; otherwise,
 * in the same direction of the positive Z axis. Default is false.
 * @returns {MeshBuffer} The generated mesh.
 */
Meshes.createPlane = function(width, height, widthDiv, heightDiv, inward) {
  if(typeof width === "undefined" || width === null)width = 1;
  if(typeof height === "undefined" || height === null)height = 1;
  if(typeof widthDiv === "undefined" || widthDiv === null)widthDiv = 1;
  if(typeof heightDiv === "undefined" || heightDiv === null)heightDiv = 1;
  if(width < 0 || height < 0)throw new Error("width or height is less than 0");
  if(heightDiv <= 0 || widthDiv <= 0)
    throw new Error("widthDiv or heightDiv is 0 or less");
  if(width === 0 || height === 0)return new MeshBuffer();
  const xStart = -width * 0.5;
  const yStart = -height * 0.5;
  const normalZ = inward ? -1 : 1;
  const vertices = [];
  let i;
  for (i = 0; i <= heightDiv; i++) {
    const iStart = i / heightDiv;
    const y = yStart + height * iStart;
    let j;
    for (j = 0; j <= widthDiv; j++) {
      const jx = j / widthDiv;
      const x = xStart + width * jx;
      vertices.push(x, y, 0, 0, 0, normalZ, jx, iStart);
    }
  }
  return meshBufferFromVertexGrid(vertices, widthDiv + 1, heightDiv + 1);
};

/**
 * Creates a mesh of a sphere, centered at the origin.<p>
 * Will also generate texture coordinates such that the V (vertical)
 * coordinates start from the bottom of the texture and increase from the negative
 * to positive Z axis, and the U (horizontal) coordinates start from the left of the
 * texture and increase from the positive X to positive Y to negative X to negative
 * Y to positive X axis. Texture coordinates are generated assuming that the coordinate (0,0)
 * is at the lower-left corner of the texture and (1,1) is at the upper-right
 * corner. <p>
 * The X, Y, and Z coordinates of a point on the sphere are
 * <code>(-R*cos(&delta;)*cos(&lambda;), -R*cos(&delta;)*sin(&lambda;), R*sin(&delta;))</code>,
 * where &delta; and &lambda; are the latitude and longitude, respectively, in radians, R is the sphere's radius,
 * and west and south latitudes and
 * longitudes are negative. (The formula for converting latitude
 * and longitude is mentioned here because their meaning depends on
 * exactly how the texture coordinates are generated on the sphere.
 * It assumes that in the texture, longitudes range from -180&deg; to 0&deg; to 180&deg; from
 * left to right, and latitudes range from 90&deg; to 0&deg; to -90&deg; from top to bottom.)<p>
 * See the "{@tutorial shapes}" tutorial.
 * @param {number} [radius] Radius of the sphere.
 * May be null, undefined, or omitted, in which case the default is 1.
 * @param {number} [slices] Number of vertical sections the sphere consists
 * of.  This function will create an octahedron if "slices" is 4 and "stacks" is 2.
 * Must be 3 or greater. May be null, undefined, or omitted, in which case the default is 16.
 * @param {number} [stacks] Number of horizontal sections the sphere consists of.
 * May be null, undefined, or omitted, in which case the default is 16.
 * @param {boolean} [flat] If true, will generate normals such that the
 * sphere will be flat shaded; otherwise, will generate normals such that the
 * sphere will be smooth shaded.
 * @param {boolean} [inside] If true, the normals generated by this
 * method will point inward; otherwise, outward. Should normally be false
 * unless the sphere will be viewed from the inside.
 * @returns {MeshBuffer} The generated mesh.
 */
Meshes.createSphere = function(radius, slices, stacks, flat, inside) {
  return Meshes._createCapsule(radius, 0, slices, stacks, 1, flat, inside);
};

/**
 * Creates a mesh of a capsule, centered at the origin.
 * The length of the capsule will run along the Z axis. (If the capsule
 * has a high length and a very low radius, it will resemble a 3D line
 * with rounded corners; see the example.)<p>
 * Will also generate texture coordinates such that the V (vertical)
 * coordinates start from the bottom of the texture and increase from the negative
 * to positive Z axis, and the U (horizontal) coordinates start from the left of the
 * texture and increase from the positive X to positive Y to negative X to negative
 * Y to positive X axis. Texture coordinates are generated assuming that the coordinate (0,0)
 * is at the lower-left corner of the texture and (1,1) is at the upper-right
 * corner. <p>
 * If the "length" parameter is 0, the X, Y, and Z coordinates of a point on the solid
 * are as described in {@link Meshes.createSphere}.
 * See the "{@tutorial shapes}" tutorial.
 * @param {number} [radius] Radius of each spherical
 * end of the capsule.
 * May be null, undefined, or omitted, in which case the default is 1.
 * @param {number} [length] Length of the middle section.
 * May be null, undefined, or omitted, in which case the default is 1.
 * If this value is 0, an approximation to a sphere will be generated.
 * @param {number} [slices] Number of vertical sections the capsule consists
 * of.  This function will create an octahedron if "slices" is 4 and "stacks" is 2.
 * Must be 3 or greater. May be null, undefined, or omitted, in which case the default is 16.
 * @param {number} [stacks] Number of horizontal sections
 * each spherical half consists of.
 * May be null, undefined, or omitted, in which case the default is 8.
 * @param {number} [middleStacks] Number of vertical sections
 * the middle of the capsule consists of.
 * May be null, undefined, or omitted, in which case the default is 1.
 * @param {boolean} [flat] If true, will generate normals such that the
 * capsule will be flat shaded; otherwise, will generate normals such that the
 * capsule will be smooth shaded.
 * @param {boolean} [inside] If true, the normals generated by this
 * method will point inward; otherwise, outward. Should normally be false
 * unless the capsule will be viewed from the inside.
 * @returns {MeshBuffer} The generated mesh.
 * @example <caption>The following method uses <code>createCapsule</code> to create a thin line-like 3D object. </caption>
 * // point1, point2 - end points of the line
 * // thickness - thickness of the line in units, default 1
 * function create3DLine(point1,point2,thickness) {
 * if(thickness==null)thickness=1
 * var vector=MathUtil.vec3sub(point1,point2);
 * var dist=MathUtil.vec3length(vector);
 * var normVector=MathUtil.vec3norm(vector);
 * var midPoint=MathUtil.vec3lerp(point1,point2,0.5);
 * var line=Meshes.createCapsule(thickness/2,dist,6,4);
 * var matrix=MathUtil.quatToMat4(
 * MathUtil.quatFromVectors([0,0,1],normVector));
 * matrix[12]=midPoint[0]
 * matrix[13]=midPoint[1]
 * matrix[14]=midPoint[2]
 * return line.transform(matrix);
 * }
 */
Meshes.createCapsule = function(radius, length, slices, stacks, middleStacks, flat, inside) {
  if(typeof stacks === "undefined" || stacks === null)stacks = 8;
  if(stacks < 1)throw new Error("too few stacks");
  return Meshes._createCapsule(radius, length, slices, stacks * 2, middleStacks, flat, inside);
};

/** @ignore */
Meshes._createCapsule = function(radius, length, slices, stacks, middleStacks, flat, inside) {
  if(typeof slices === "undefined" || slices === null)slices = 16;
  if(typeof stacks === "undefined" || stacks === null)stacks = 16;
  if(typeof middleStacks === "undefined" || middleStacks === null)middleStacks = 1;
  if(typeof radius === "undefined" || radius === null)radius = 1;
  if(typeof length === "undefined" || length === null)length = 1;
  if(stacks < 2)throw new Error("too few stacks");
  if(slices <= 2)throw new Error("too few slices");
  if(middleStacks < 1 && length > 0)throw new Error("too few middle stacks");
  if(length < 0)throw new Error("negative length");
  if(radius < 0)throw new Error("negative radius");
  if(radius === 0) {
  // radius is zero
    return new MeshBuffer();
  }
  let cangle;
  let sangle;
  const halfLength = length * 0.5;
  const halfStacks = stacks / 2;
  const normDir = inside ? -1 : 1;
  const sc = [];
  const scStack = [];
  const verticalTexCoords = [];
  const tc = [];
  let s;
  // Generate longitude and horizontal texture coordinates
  let angleStep = MathUtil.PiTimes2 / slices;
  let cosStep = Math.cos(angleStep);
  let sinStep = angleStep >= 0 && angleStep < 6.283185307179586 ? angleStep <= 3.141592653589793 ? Math.sqrt(1.0 - cosStep * cosStep) : -Math.sqrt(1.0 - cosStep * cosStep) : Math.sin(angleStep);
  sangle = 1.0; // sin(90.0deg)
  cangle = 0; // cos(90.0deg)
  let i;
  for (i = 0; i < slices; i++) {
    const t = i * 1.0 / slices;
    sc.push(sangle, cangle);
    tc.push(t);
    const tsin = cosStep * sangle + sinStep * cangle;
    const tcos = cosStep * cangle - sinStep * sangle;
    sangle = tsin;
    cangle = tcos;
  }
  sc.push(sc[0], sc[1]);
  tc.push(1);
  let sphereRatio = radius * 2;
  sphereRatio /= sphereRatio + length;
  const zEnd = [];
  zEnd.push(-1);
  scStack.push(0);
  verticalTexCoords.push(0);
  // Generate latitude and vertical texture coordinates
  angleStep = Math.PI / stacks;
  cosStep = Math.cos(angleStep);
  sinStep = angleStep >= 0 && angleStep < 6.283185307179586 ? angleStep <= 3.141592653589793 ? Math.sqrt(1.0 - cosStep * cosStep) : -Math.sqrt(1.0 - cosStep * cosStep) : Math.sin(angleStep);
  sangle = sinStep;
  cangle = cosStep;
  let tsin;
  let tcos;
  for (i = 0; i < stacks; i++) {
    const origt = (i + 1) * 1.0 / stacks;
    scStack.push(sangle);
    zEnd.push(-cangle);
    const tex = origt;
    verticalTexCoords.push(tex);
    tsin = cosStep * sangle + sinStep * cangle;
    tcos = cosStep * cangle - sinStep * sangle;
    sangle = tsin;
    cangle = tcos;
  }
  // Generate the vertex data
  const vertices = [];
  let tx;
  let x;
  let y;
  let gridHeight = 0;

  for (i = 0; i <= stacks; i++) {
    const zeCen = zEnd[i];
    let txe = verticalTexCoords[i];
    const zStartHeight = radius * zeCen;
    const offset = i < halfStacks ? -halfLength : halfLength;
    const radiusEnd = radius * scStack[i];
    gridHeight++;
    let j;
    for (j = 0; j <= slices; j++) {
      tx = tc[j];
      x = sc[j * 2];
      y = sc[j * 2 + 1];
      vertices.push(
        x * radiusEnd, y * radiusEnd, zStartHeight + offset,
        x * radiusEnd * normDir, y * radiusEnd * normDir, zStartHeight * normDir,
        1 - tx, txe);
    }
    if(i + 1 === halfStacks && length > 0) {
      const sr2 = sphereRatio * 0.5;
      const hl = halfLength * 2;
      const he = 1.0 - sphereRatio;
      let m;
      for (m = 0; m <= middleStacks; m++) {
        s = -halfLength + (m === 0 ? 0 : hl * m / middleStacks);
        txe = sr2 + (m === 0 ? 0 : he * m / middleStacks);
        gridHeight++;
        let j;
        for (j = 0; j <= slices; j++) {
          tx = tc[j];
          x = sc[j * 2];
          y = sc[j * 2 + 1];
          vertices.push(
            x * radiusEnd, y * radiusEnd, zStartHeight + s,
            x * radiusEnd * normDir, y * radiusEnd * normDir, zStartHeight * normDir,
            1 - tx, txe);
        }
      }
    }
  }
  const mesh = meshBufferFromVertexGrid(vertices, slices + 1, gridHeight);
  return flat ? mesh.recalcNormals(flat, inside) : mesh.normalizeNormals();
};

/**
 * Creates a mesh in the form of a two-dimensional n-pointed star.
 * Will also generate texture coordinates, assuming that the coordinate (0,0)
 * is at the lower-left corner of the texture and (1,1) is at the upper-right
 * corner.
 * @param {number} points Number of points in the star.
 * Must be 2 or greater.
 * @param {number} firstRadius First radius of the star.
 * Must be 0 or greater; this parameter and secondRadius
 * can't both be 0.
 * @param {number} secondRadius Second radius of the star.
 * Must be 0 or greater; this parameter and firstRadius
 * can't both be 0.
 * @param {boolean} [inward] If true, the normals generated by this
 * method will point in the opposite direction of the positive Z axis; otherwise,
 * in the same direction of the positive Z axis. Default is false.
 * @returns {MeshBuffer} The generated mesh.
 */
Meshes.createPointedStar = function(points, firstRadius, secondRadius, inward) {
  if(points < 2 || firstRadius < 0 || secondRadius < 0)return new MeshBuffer();
  if(firstRadius <= 0 && secondRadius <= 0)return new MeshBuffer();
  if(firstRadius === secondRadius) {
    return Meshes.createDisk(firstRadius, firstRadius, points, 1, inward);
  }
  const vertices = [];
  const indices = [];
  const triangleFan = new TriangleFan(indices);
  let lastIndex = 0;
  const recipRadius = 1.0 / Math.max(firstRadius, secondRadius);
  const normalZ = inward ? -1 : 1;
  // Position X, Y, Z, normal NX, NY, NZ, texture U, V
  vertices.push(0, 0, 0, 0, 0, normalZ, 0.5, 0.5);
  triangleFan.addIndex(lastIndex++);
  const angleStep = MathUtil.PiTimes2 / (points * 2);
  const cosStep = Math.cos(angleStep);
  const sinStep = angleStep <= 3.141592653589793 ? Math.sqrt(1.0 - cosStep * cosStep) : -Math.sqrt(1.0 - cosStep * cosStep);
  let sangle = 0.0; // sin(0.0deg)
  let cangle = 1.0; // cos(0.0deg)
  let i;
  for (i = 0; i < points * 2; i++) {
    const radius = (i & 1) === 0 ? firstRadius : secondRadius;
    const x = -sangle * radius;
    const y = cangle * radius;
    const tcx = (1 + x * recipRadius) * 0.5;
    const tcy = (1 + y * recipRadius) * 0.5;
    vertices.push(x, y, 0, 0, 0, normalZ, tcx, tcy);
    triangleFan.addIndex(lastIndex);
    const ts = cosStep * sangle + sinStep * cangle;
    const tc = cosStep * cangle - sinStep * sangle;
    sangle = ts;
    cangle = tc;
  }
  // Re-add the second index to close the pointed star
  triangleFan.addIndex(1);
  return MeshBuffer.fromPositionsNormalsUV(vertices, indices);
};/*
 Any copyright to this file is released to the Public Domain.
 http://creativecommons.org/publicdomain/zero/1.0/
 If you like this, you should donate
 to Peter O. (original author of
 the Public Domain HTML 3D Library) at:
 http://peteroupc.github.io/
*/export{MathUtil,Curve,Surface,CurveBuilder,SurfaceBuilder,PiecewiseCurve,BSplineCurve,BSplineSurface,GraphicsPath,Shape,ShapeGroup,Transform,Meshes,BufferAccessor,MeshBuffer,Semantic,getPromiseResults,getPromiseResultsAll,getTimePosition,newFrames,toGLColor};

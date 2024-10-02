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
/*
 Any copyright to this file is released to the Public Domain.
 In case this is not possible, this file is also licensed under the Unlicense: https://unlicense.org/
*/
/*
 Any copyright to this file is released to the Public Domain.
 In case this is not possible, this file is also licensed under the Unlicense: https://unlicense.org/
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
  var Promise = function(resolver) {
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
  Promise.resolve = function(value) {
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
  Promise.reject = function(reason) {
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
  Promise.all = Promise.when = function(all) {
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
  Promise.race = function(all) {
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
  Promise.prototype.then = function(onFulfilled, onRejected) {
    this._cb.fulfilled.push(onFulfilled);
    this._cb.rejected.push(onRejected);

    var thenPromise = new Promise(null);

    this._thenPromises.push(thenPromise);

    if (this._state > 0) {
      this._schedule();
    }

    /* 2.2.7. then must return a promise. */
    return thenPromise;
  };
  /** @ignore */
  Promise.prototype.fulfill = function(value) {
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
  Promise.prototype.reject = function(value) {
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
  Promise.prototype.resolve = function(x) {
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
  Promise.prototype.chain = function(promise) {
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
  Promise.prototype.catch = function(onRejected) {
    return this.then(null, onRejected);
  };
/** @ignore */
  Promise.prototype._schedule = function() {
    if (this._timeout) {
      return;
    } /* resolution already scheduled */
    this._timeout = setTimeout(this._processQueue.bind(this), 0);
  };
/** @ignore */
  Promise.prototype._processQueue = function() {
    this._timeout = null;

    while (this._thenPromises.length) {
      var onFulfilled = this._cb.fulfilled.shift();
      var onRejected = this._cb.rejected.shift();
      this._executeCallback(this._state === 1 ? onFulfilled : onRejected);
    }
  };
/** @ignore */
  Promise.prototype._executeCallback = function(cb) {
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
  Promise.prototype._invokeResolver = function(resolver) {
    try {
      resolver(this.resolve.bind(this), this.reject.bind(this));
    } catch (e) {
      this.reject(e);
    }
  };
  if(typeof window !== "undefined" && window !== null) {
    /** @suppress {checkTypes}
     * @ignore */function promfunc() {
      window.Promise = Promise;
    }
    promfunc();
  }
}

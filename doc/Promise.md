# Promise

[Back to documentation index.](index.md)

### Promise([resolver]) <a id='Promise'></a>

A promise holds a value to be resolved in the future.

This class is a "polyfill" for the standard <code>Promise</code>
class; it is only used when the running JavaScript environment
doesn't support or include a <code>Promise</code> class
on its own.

#### Parameters

* `resolver` (Type: function) (optional)<br>
    Function that takes two arguments: the first is a function to call when resolving the promise, and the second is a function to call when rejecting the promise.

### Methods

* [all](#Promise.all)<br>Wait for all these promises to complete.
* [catch](#Promise_catch)
* [reject](#Promise.reject)<br>Returns a promise that is rejected.
* [resolve](#Promise.resolve)<br>Returns a promise that resolves.
* [then](#Promise_then)

### (static) Promise.all(all) <a id='Promise.all'></a>

Wait for all these promises to complete. One failed => this fails too.

#### Parameters

* `all` (Type: Array.&lt;<a href="Promise.md">Promise</a>>)<br>
    An array of promises.

#### Return Value

A promise that is resolved when all promises have resolved. (Type: <a href="Promise.md">Promise</a>)

### Promise#catch(onRejected) <a id='Promise_catch'></a>

#### Parameters

* `onRejected` (Type: function)<br>
    To be called once this promise gets rejected

#### Return Value

A promise. (Type: <a href="Promise.md">Promise</a>)

### (static) Promise.reject(value) <a id='Promise.reject'></a>

Returns a promise that is rejected.

#### Parameters

* `value` (Type: Object)<br>
    The value associated with the promise.

#### Return Value

A promise that is rejected and takes the given value
as its argument. (Type: <a href="Promise.md">Promise</a>)

### (static) Promise.resolve(value) <a id='Promise.resolve'></a>

Returns a promise that resolves.

#### Parameters

* `value` (Type: Object)<br>
    The value associated with the promise.

#### Return Value

A promise that resolves and takes the given value
as its argument. (Type: <a href="Promise.md">Promise</a>)

### Promise#then(onFulfilled, onRejected) <a id='Promise_then'></a>

#### Parameters

* `onFulfilled` (Type: function)<br>
    To be called once this promise gets fulfilled
* `onRejected` (Type: function)<br>
    To be called once this promise gets rejected

#### Return Value

A promise. (Type: <a href="Promise.md">Promise</a>)

# Promise

[Back to documentation index.](index.md)

<a name='Promise'></a>
### new Promise([resolver])

A promise holds a value to be resolved in the future.

This class is a "polyfill" for the standard <code>Promise</code>
class; it is only used when the running JavaScript environment
doesn't support or include a <code>Promise</code> class
on its own.

#### Parameters

* `resolver` (Type: function) (optional)<br>Function that takes two arguments: the first is a function to call when resolving the promise, and the second is a function to call when rejecting the promise.

### Methods

* [all](#Promise.all)<br>Wait for all these promises to complete.
* [race](#Promise.race)<br>Creates a promise that resolves or is rejected when one of those promises
resolves or is rejected.
* [reject](#Promise.reject)<br>Returns a promise that is rejected.
* [resolve](#Promise.resolve)<br>Returns a promise that resolves.

<a name='Promise.all'></a>
### (static) Promise.all(all)

Wait for all these promises to complete. One failed => this fails too.

#### Parameters

* `all` (Type: Array.&lt;<a href="Promise.md">Promise</a>>)<br>An array of promises.

#### Return Value

A promise that is resolved when all promises have resolved. (Type: <a href="Promise.md">Promise</a>)

<a name='Promise.race'></a>
### (static) Promise.race(all)

Creates a promise that resolves or is rejected when one of those promises
resolves or is rejected.

#### Parameters

* `all` (Type: Array.&lt;<a href="Promise.md">Promise</a>>)<br>An array of promises.

#### Return Value

A promise that resolves or is rejected according to
the first promise that resolves or is rejected. It will receive the
value associated with that promise. (Type: <a href="Promise.md">Promise</a>)

<a name='Promise.reject'></a>
### (static) Promise.reject(reason)

Returns a promise that is rejected.

#### Parameters

* `reason` (Type: Object)<br>The value associated with the promise.

#### Return Value

A promise that is rejected and takes the given value
as its argument. (Type: <a href="Promise.md">Promise</a>)

<a name='Promise.resolve'></a>
### (static) Promise.resolve(value)

Returns a promise that resolves.

#### Parameters

* `value` (Type: Object)<br>The value associated with the promise.

#### Return Value

A promise that resolves and takes the given value
as its argument. (Type: <a href="Promise.md">Promise</a>)

[Back to documentation index.](index.md)

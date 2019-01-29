### Methods

* [getPromiseResults](#getPromiseResults)<br>Utility function that returns a promise that
resolves after the given list of promises finishes
its work.
* [getPromiseResultsAll](#getPromiseResultsAll)<br>Utility function that returns a promise that
resolves or is rejected after the given list of promises finishes
its work.
* [getTimePosition](#getTimePosition)<br>Gets the position of a time value within an interval.
* [newFrames](#newFrames)<br>Returns the number of frame-length intervals that occurred since
the last known time, where a frame's length is 1/60 of a second.
* [toGLColor](#toGLColor)<br>Creates a 4-element array representing a color.

<a name='getPromiseResults'></a>
### getPromiseResults(promises, [progressResolve], [progressReject])

Utility function that returns a promise that
resolves after the given list of promises finishes
its work.

#### Parameters

* `promises` (Type: Array.&lt;<a href="Promise.md">Promise</a>>)<br>an array containing promise objects
* `progressResolve` (Type: function) (optional)<br>A function called as each individual promise is resolved.
* `progressReject` (Type: function) (optional)<br>A function called as each individual promise is rejected.

#### Return Value

A promise that is never rejected and resolves when
all of the promises are each resolved or rejected. The result
of the promise will be an object with
three keys:<ul>
 <li>"successes" - contains a list of results from the
promises that succeeded, in the order in which those promises were listed.
 <li>"failures" - contains a list of results from the
promises that failed, in the order in which those promises were listed.
 <li>"results" - contains a list of boolean values for each
promise, in the order in which the promises were listed.
True means success, and false means failure.</ul> (Type: <a href="Promise.md">Promise</a>)

<a name='getPromiseResultsAll'></a>
### getPromiseResultsAll(promises, [progressResolve], [progressReject])

Utility function that returns a promise that
resolves or is rejected after the given list of promises finishes
its work.

#### Parameters

* `promises` (Type: Array.&lt;<a href="Promise.md">Promise</a>>)<br>an array containing promise objects
* `progressResolve` (Type: function) (optional)<br>a function called as each individual promise is resolved; optional
* `progressReject` (Type: function) (optional)<br>a function called as each individual promise is rejected; optional

#### Return Value

A promise that is resolved when
all of the promises are each resolved; the result will
be an array of results from those promises,
in the order in which those promises were listed.
Will be rejected if any of the promises is rejected; the result
will be an object as specified in <a href="getPromiseResults.md">getPromiseResults</a>.</ul> (Type: <a href="Promise.md">Promise</a>)

<a name='getTimePosition'></a>
### getTimePosition(timer, timeInMs, intervalInMs)

Gets the position of a time value within an interval.
This is useful for doing animation cycles lasting a certain number
of seconds, such as rotating a shape in a 5-second cycle.
This method may be called any number of times each frame.

#### Parameters

* `timer` (Type: Object)<br>An object that will hold two properties:<ul> <li>"time" - initial time value, in milliseconds. <li>"lastTime" - last known time value, in milliseconds. Will be set to the value given in "timeInMs" before returning. </ul> The object should be initialized using the idiom <code>{}</code> or <code>new Object()</code>.
* `timeInMs` (Type: number)<br>A time value, in milliseconds. This could be the parameter received in a <code>requestAnimationFrame()</code> callback method.
* `intervalInMs` (Type: number)<br>The length of the interval (animation cycle), in milliseconds.

#### Return Value

A value in the range [0, 1), where closer
to 0 means "timeInMs" lies
closer to the start, and closer to 1 means closer
to the end of the interval. If an initial time wasn't set, returns 0. (Type: number)

#### Examples

The following code sets an angle of
rotation, in degrees, such that an object rotated with the
angle does a 360-degree turn in 5 seconds (5000 milliseconds).
The variable <code>time</code> is assumed to be a time
value in milliseconds, such as the parameter of a
<code>requestAnimationFrame()</code> callback method.

    var angle = 360 * getTimePosition(timer, time, 5000);

<a name='newFrames'></a>
### newFrames(timer, timeInMs)

Returns the number of frame-length intervals that occurred since
the last known time, where a frame's length is 1/60 of a second.
This method should be called only once each frame.

#### Parameters

* `timer` (Type: Object)<br>An object described in <a href="getTimePosition.md">getTimePosition</a>.
* `timeInMs` (Type: number)<br>A time value, in milliseconds. This could be the parameter received in a <code>requestAnimationFrame()</code> callback method. </code>.

#### Return Value

The number of frame-length intervals relative to
the last known time held in the parameter "timer".
The number can include fractional frames. If an
initial time or last known time wasn't set, returns 0. (Type: number)

<a name='toGLColor'></a>
### toGLColor(r, [g], [b], [a])

Creates a 4-element array representing a color. Each element
can range from 0 to 1 and specifies the red, green, blue or alpha
component, respectively.
This method also converts HTML and CSS colors to 4-element RGB
colors. The following lists the kinds of colors accepted:
<ul>
<li>HTML colors with the syntax <code>#RRGGBB</code> or <code>#RRGGBBAA</code>, where
RR is the hexadecimal form of the red component (00-FF), GG
is the hexadecimal green component, BB is the hexadecimal
blue component, and AA is the hexadecimal alpha component. Example: #88DFE0.
<li>HTML colors with the syntax <code>#RGB</code> or <code>#RGBA</code>, where
R is the hexadecimal form of the red component (0-F), G
is the hexadecimal green component, B is the hexadecimal
blue component, and A is the hexadecimal alpha component. Example: #8DE.
<li>CSS colors with the syntax <code>rgb(red, green, blue)</code> or
<code>rgba(red, green, blue, alpha)</code> where
<code>red</code>, <code>green</code>, and <code>blue</code>
are the red, green, and blue components, respectively, either as a
number (0-255) or as a percent, and <code>alpha</code> is
a number from 0-1 specifying the alpha component.
Examples: <code>rgb(255,0,0)</code>,
<code>rgb(100%,50%,0%)</code>, <code>rgba(20,255,255,0.5)</code>.
<li>CSS colors with the syntax <code>hsl(hue, sat, light)</code> or
<code>hsla(hue, sat, light, alpha)</code> where
<code>hue</code> is the hue component in degrees (0-360),
<code>sat</code> and <code>light</code>
are the saturation and lightness components, respectively, as percents,
and <code>alpha</code> is
a number from 0-1 specifying the alpha component.
Examples: <code>rgb(255,0,0)</code>,
<code>hsl(200,50%,50%)</code>, <code>hsla(20,80%,90%,0.5)</code>.
<li>CSS colors such as <code>red</code>, <code>green</code>,
<code>white</code>, <code>lemonchiffon</code>, <code>chocolate</code>,
and so on, including the newly added <code>rebeccapurple</code>.
<li>The value <code>transparent</code>, meaning transparent black.
</ul>
For more information, see the "<a href="tutorial-colors.md">Color Strings</a>" tutorial.

#### Parameters

* `r` (Type: Array.&lt;number> | number | string)<br>One of the following:<ul> <li>A <b>color vector or string</b>, which can be one of these:<ul> <li>An array of three color components, each of which ranges from 0 to 1. The three components are red, green, and blue in that order.</li> <li>An array of four color components, each of which ranges from 0 to 1. The three components are red, green, blue, and alpha in that order.</li> <li>A string specifying an HTML or CSS color, in one of the formats mentioned above in the method description.</li></ul></li> <li>A number specifying the red component. Must range from 0 to 1.</li> </ul> Returns (0,0,0,0) if this value is null.
* `g` (Type: number) (optional)<br>Green color component (0-1). May be null or omitted if a string or array is given as the "r" parameter.
* `b` (Type: number) (optional)<br>Blue color component (0-1). May be null or omitted if a string or array is given as the "r" parameter.
* `a` (Type: number) (optional)<br>Alpha color component (0-1). If the "r" parameter is given and this parameter is null, undefined, or omitted, this value is treated as 1.0.

#### Return Value

The color as a 4-element array; if the color is
invalid, returns [0,0,0,0], or transparent black. Numbers less
than 0 are clamped to 0, and numbers greater than 1 are
clamped to 1. (Type: Array.&lt;number>)

[Back to documentation index.](index.md)

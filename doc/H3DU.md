# H3DU

[Back to documentation index.](index.md)

### H3DU <a id='H3DU'></a>

The Public Domain HTML 3D Library contains classes and utility
methods to ease the development of HTML 3D applications, such
as Web sites, in browsers that support 3D drawing using the HTML5 Canvas.
See the <a href="tutorial-overview.md">Library Overview</a> tutorial.

This page describes miscellaneous utility methods included in the
library.

### Methods

* [createCanvasElement](#H3DU_createCanvasElement)
* [get3DContext](#H3DU_get3DContext)
* [get3DOr2DContext](#H3DU_get3DOr2DContext)
* [getPromiseResults](#H3DU_getPromiseResults)
* [getPromiseResultsAll](#H3DU_getPromiseResultsAll)
* [getTimePosition](#H3DU_getTimePosition)
* [is3DContext](#H3DU_is3DContext)
* [loadFileFromUrl](#H3DU_loadFileFromUrl)
* [newFrames](#H3DU_newFrames)
* [renderLoop](#H3DU_renderLoop)
* [toGLColor](#H3DU_toGLColor)

### (static) H3DU.createCanvasElement(parent, width, height) <a id='H3DU_createCanvasElement'></a>

Creates an HTML canvas element, optionally appending
it to an existing HTML element.

#### Parameters

* `parent` (Type: HTMLElement | null)<br>
    If non-null, the parent element of the new HTML canvas element. The element will be appended as a child of this parent.
* `width` (Type: number | null)<br>
    Width of the new canvas element, or if null, the width a <code>canvas</code> element would ordinarily have under the CSS rules currently in effect where the canvas is. The resulting width will be rounded up. This parameter can't be a negative number.
* `height` (Type: number | null)<br>
    Height of the new canvas element, or if null, the height a <code>canvas</code> element would ordinarily have under the CSS rules currently in effect where the canvas is. The resulting height will be rounded up. This parameter can't be a negative number.

#### Return Value

The resulting canvas element. (Type: HTMLCanvasElement)

### (static) H3DU.get3DContext(canvasElement, err) <a id='H3DU_get3DContext'></a>

Creates a 3D rendering context from an HTML canvas element.

#### Parameters

* `canvasElement` (Type: HTMLCanvasElement)<br>
    An HTML canvas element.
* `err` (Type: function)<br>
    A function to call if an error occurs in creating the context. The function takes one parameter consisting of a human- readable error message. If "err" is null, window.alert() will be used instead.

#### Return Value

A 3D rendering context, or null
if an error occurred in creating the context. Returns null if "canvasElement"
is null or not an HTML canvas element. (Type: WebGLRenderingContext)

### (static) H3DU.get3DOr2DContext(canvasElement) <a id='H3DU_get3DOr2DContext'></a>

Creates a 3D rendering context from an HTML canvas element,
falling back to a 2D context if that fails.

#### Parameters

* `canvasElement` (Type: HTMLCanvasElement)<br>
    An HTML canvas element.

#### Return Value

A 3D or 2D rendering context, or null
if an error occurred in creating the context. Returns null if "canvasElement"
is null or not an HTML canvas element. (Type: WebGLRenderingContext)

### (static) H3DU.getPromiseResults(promises, [progressResolve], [progressReject]) <a id='H3DU_getPromiseResults'></a>

Utility function that returns a promise that
resolves after the given list of promises finishes
its work.

#### Parameters

* `promises` (Type: Array.&lt;<a href="Promise.md">Promise</a>>)<br>
    an array containing promise objects
* `progressResolve` (Type: function) (optional)<br>
    A function called as each individual promise is resolved.
* `progressReject` (Type: function) (optional)<br>
    A function called as each individual promise is rejected.

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

### (static) H3DU.getPromiseResultsAll(promises, [progressResolve], [progressReject]) <a id='H3DU_getPromiseResultsAll'></a>

Utility function that returns a promise that
resolves or is rejected after the given list of promises finishes
its work.

#### Parameters

* `promises` (Type: Array.&lt;<a href="Promise.md">Promise</a>>)<br>
    an array containing promise objects
* `progressResolve` (Type: function) (optional)<br>
    a function called as each individual promise is resolved; optional
* `progressReject` (Type: function) (optional)<br>
    a function called as each individual promise is rejected; optional

#### Return Value

A promise that is resolved when
all of the promises are each resolved; the result will
be an array of results from those promises,
in the order in which those promises were listed.
Will be rejected if any of the promises is rejected; the result
will be an object as specified in <a href="H3DU.md#H3DU_getPromiseResults">H3DU.getPromiseResults</a>.</ul> (Type: <a href="Promise.md">Promise</a>)

### (static) H3DU.getTimePosition(timer, timeInMs, intervalInMs) <a id='H3DU_getTimePosition'></a>

Gets the position of a time value within an interval.
This is useful for doing animation cycles lasting a certain number
of seconds, such as rotating a shape in a 5-second cycle.
This method may be called any number of times each frame.

#### Parameters

* `timer` (Type: Object)<br>
    An object that will hold two properties:<ul> <li>"time" - initial time value, in milliseconds. <li>"lastTime" - last known time value, in milliseconds. Will be set to the value given in "timeInMs" before returning. </ul> The object should be initialized using the idiom <code>{}</code> or <code>new Object()</code>.
* `timeInMs` (Type: Number)<br>
    A time value, in milliseconds. This could be the parameter received in a <code>requestAnimationFrame()</code> callback method.
* `intervalInMs` (Type: Number)<br>
    The length of the interval (animation cycle), in milliseconds.

#### Return Value

A value in the range [0, 1), where closer
to 0 means "timeInMs" lies
closer to the start, and closer to 1 means closer
to the end of the interval. If an initial time wasn't set, returns 0. (Type: Number)

#### Example

The following code sets an angle of
rotation, in degrees, such that an object rotated with the
angle does a 360-degree turn in 5 seconds (5000 milliseconds).
The variable <code>time</code> is assumed to be a time
value in milliseconds, such as the parameter of a
<code>requestAnimationFrame()</code> callback method.

    var angle = 360 \* H3DU.getTimePosition(timer, time, 5000);

### (static) H3DU.is3DContext(context) <a id='H3DU_is3DContext'></a>

#### Parameters

* `context` (Type: Object)<br>
    Description of context. Returns whether the given object is a 3D rendering context.

#### Return Value

Return value. (Type: Boolean)

### (static) H3DU.loadFileFromUrl(url, responseType) <a id='H3DU_loadFileFromUrl'></a>

Loads a file from a URL asynchronously, using XMLHttpRequest.

#### Parameters

* `url` (Type: String)<br>
    URL of the file to load.
* `responseType` (Type: string | null)<br>
    Expected data type of the file. Can be "json", "xml", "text", or "arraybuffer". If null or omitted, the default is "text".

#### Return Value

A promise that resolves when the data
file is loaded successfully (the result will be an object with
two properties: "url", the URL of the file, and "data", the
file's text or data), as given below, and is rejected when an error occurs (the
result may be an object with
one property: "url", the URL of the file). If the promise resolves,
the parameter's "data" property will be:<ul>
<li>For response type "xml", an XML document object.
<li>For response type "arraybuffer", an ArrayBuffer object.
<li>For response type "json", the JavaScript object decoded
from JSON.
<li>For any other type, a string of the file's text.</ul> (Type: <a href="Promise.md">Promise</a>)

### (static) H3DU.newFrames(timer, timeInMs) <a id='H3DU_newFrames'></a>

Returns the number of frame-length intervals that occurred since
the last known time, where a frame's length is 1/60 of a second.
This method should be called only once each frame.

#### Parameters

* `timer` (Type: Object)<br>
    An object described in <a href="H3DU.md#H3DU_getTimePosition">H3DU.getTimePosition</a>.
* `timeInMs` (Type: Number)<br>
    A time value, in milliseconds. This could be the parameter received in a <code>requestAnimationFrame()</code> callback method. </code>.

#### Return Value

The number of frame-length intervals relative to
the last known time held in the parameter "timer".
The number can include fractional frames. If an
initial time or last known time wasn't set, returns 0. (Type: Number)

### (static) H3DU.renderLoop(func) <a id='H3DU_renderLoop'></a>

This method will call a function once before returning,
and queue requests to call that function once per frame,
using <code>window.requestAnimationFrame</code>
or a "polyfill" method.

#### Parameters

* `func` (Type: function)<br>
    The function to call. The function takes one parameter, "time", which is the number of milliseconds since the page was loaded.

#### Return Value

Return value. (Type: Object)

### (static) H3DU.toGLColor(r, g, b, [a]) <a id='H3DU_toGLColor'></a>

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

* `r` (Type: Array.&lt;Number> | number | string)<br>
    One of the following:<ul> <li>A <b>color vector or string</b>, which can be one of these:<ul> <li>An array of three color components, each of which ranges from 0 to 1. The three components are red, green, and blue in that order.</li> <li>An array of four color components, each of which ranges from 0 to 1. The three components are red, green, blue, and alpha in that order.</li> <li>A string specifying an HTML or CSS color, in one of the formats mentioned above in the method description.</li></ul></li> <li>A number specifying the red component. Must range from 0 to 1.</li> </ul> Returns (0,0,0,0) if this value is null.
* `g` (Type: Number)<br>
    Green color component (0-1). May be null or omitted if a string or array is given as the "r" parameter.
* `b` (Type: Number)<br>
    Blue color component (0-1). May be null or omitted if a string or array is given as the "r" parameter.
* `a` (Type: Number) (optional)<br>
    Alpha color component (0-1). If the "r" parameter is given and this parameter is null or omitted, this value is treated as 1.0.

#### Return Value

The color as a 4-element array; if the color is
invalid, returns [0,0,0,0], or transparent black. Numbers less
than 0 are clamped to 0, and numbers greater than 1 are
clamped to 1. (Type: Array.&lt;Number>)

/* global GltfState2, H3DU, Promise */
/*
 Any copyright to this file is released to the Public Domain.
 http://creativecommons.org/publicdomain/zero/1.0/
 If you like this, you should donate
 to Peter O. (original author of
 the Public Domain HTML 3D Library) at:
 http://peteroupc.github.io/
*/

import {GltfState1} from "./gltf1";
// import {GltfState2} from "./gltf2";
// LATER: Convert batches/shape groups to glTF

/**
 * Loads a 3D scene stored in glTF format, together with the buffers and
 * shaders it uses.
 * <p>This method is considered a supplementary method to the
 * Public Domain HTML 3D Library and is not considered part of that
 * library. <p>
 * To use this class, you must include the script "extras/gltf.js"; the
 * class is not included in the "h3du_min.js" file which makes up
 * the HTML 3D Library. Example:<pre>
 * &lt;script type="text/javascript" src="extras/gltf.js">&lt;/script></pre>
 * @param {string} url URL of the glTF file to load.
 * @returns {Promise<Object>} A promise; when it resolves, the result will
 * be an object that implements the following methods:<ul>
 * <li><code>getShape()</code> - Gets an {@link H3DU.ShapeGroup} object described
 * by the glTF data.
 * <li><code>getImageURIs()</code> - Gets an array of URI (uniform resource identifier)
 * strings for the texture images described by the glTF data. Each URI will be relative
 * to the "url" parameter of the loadGltfFromFile method.
 * <li><code>update(time)</code> - A single-parameter method that should be called
 * if the glTF data describes an animation; this method updates the state of the
 * 3D batch in accordance with that animation. The single parameter, <code>time</code>
 * (type Number), is a time stamp in milliseconds.
 * </ul>If an error occurs in loading the glTF data or any of the buffers and shaders
 * it uses, the promise will be rejected.
 */
H3DU.loadGltfFromUrl = function(url) {
  return H3DU.loadFileFromUrl(url, "json").then(function(data) {
    var gltf = data.data;

    if(typeof gltf.asset !== "undefined" && gltf.asset !== null && (typeof gltf.asset.version !== "undefined" && gltf.asset.version !== null)) {
      if(gltf.asset.version === "2.0" && (typeof GltfState2 !== "undefined" && GltfState2 !== null)) {
        return GltfState2.readGltf(gltf, data.url);
      } else if(gltf.asset.version === "1.1") {
        return Promise.reject({"url":url});
      } else if(gltf.asset.version !== "1.0" && gltf.asset.version !== "1.0.1") {
        throw new Error("Not supported yet");
      }
    }
    return GltfState1.readGltf(gltf, data.url);
  });
};

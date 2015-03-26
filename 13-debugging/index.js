// Pour débogguer ce script, le lancer avec `node-debug`:
//
// ```
// > node-debug -c index.js
// Node Inspector is now available from http://localhost:8080/debug?port=5858
// Debugging `index.js`
//
// debugger listening on port 5858
// ```

'use strict';

//====================================================================

var Bluebird = require('bluebird');

var readFile = Bluebird.promisify(require('fs').readFile);

//====================================================================

function square(x) {
  return x * x;
}

readFile(__filename).then(function (content) {
  return content.length;
}).then(square).then(function (value) {
  console.log(value);
});

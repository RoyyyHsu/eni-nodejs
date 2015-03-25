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

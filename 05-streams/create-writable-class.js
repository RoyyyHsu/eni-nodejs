'use strict';

//====================================================================

// Bonne pratique : utiliser le paquet `readable-stream`
// (http://npmjs.org/package/readable-stream) à la place du module
// standard `stream` de Node car le développeur s'assure qu'il
// utilisera toujours une version compatible avec son code.
var Writable = require('readable-stream/writable');

var inherits = require('util').inherits;

function StdoutStream() {
  StdoutStream.super_.call(this, {
    objectMode: true,
  });
}
inherits(StdoutStream, Writable);

// Implémentation de notre flux qui va écrire les données sur la
// sortie standard.
StdoutStream.prototype._write = function (chunk, encoding, next) {
  console.log(String(chunk));

  // Signale que le message courant a fini d'être traité.
  next();
};

//====================================================================

var writable = new StdoutStream();

writable.write('foo');
writable.write('bar');
writable.write('baz');

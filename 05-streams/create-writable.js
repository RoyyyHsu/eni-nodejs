'use strict';

//====================================================================

// Bonne pratique : utiliser le paquet `readable-stream`
// (http://npmjs.org/package/readable-stream) à la place du module
// standard `stream` de Node car le développeur s'assure qu'il
// utilisera toujours une version compatible avec son code.
var Writable = require('readable-stream/writable');

// Instanciation de notre flux de lecture.
var writable = new Writable({

  // Le mode objet indique le flux ne gère pas uniquement des chaînes
  // et des tampons.
  objectMode: true,
});

// Implémentation de notre flux qui va écrire les données sur la
// sortie standard.
writable._write = function (chunk, encoding, next) {
  console.log(String(chunk));

  // Signale que le message courant a fini d'être traité.
  next();
};

//====================================================================

writable.write('foo');
writable.write('bar');
writable.write('baz');

'use strict';

//====================================================================

// Bonne pratique : utiliser le paquet `readable-stream`
// (http://npmjs.org/package/readable-stream) à la place du module
// standard `stream` de Node car le développeur s'assure qu'il
// utilisera toujours une version compatible avec son code.
var Readable = require('readable-stream');

var inherits = require('util').inherits;

function ArrayStream(array) {
  ArrayStream.super_.call(this, {
    objectMode: true,
  });

  this._array = array;
  this._i = 0;
  this._n = array.length;
}
inherits(ArrayStream, Readable);

ArrayStream.prototype._read = function () {
  // Tant qu'il reste des entrées dans le tableau, on tente de les
  // envoyer.
  while (this._i < this._n) {

    // Si push renvoie false, c'est que le consommateur n'a pas
    // fini de traiter les messages envoyés.
    //
    // Il n'est donc pas nécessaire de continuer pour le moment pour
    // éviter de saturer la mémoire (contre-pression).
    if (!this.push(this._array[this._i++])) {
      return;
    }
  }

  // Signale la fin du flux.
  this.push(null);
};

//====================================================================

var readable = new ArrayStream(['foo', 'bar', 'baz']);

// Il est maintenant possible de consommer notre flux.
readable.on('data', function (item) {
  console.log(item);
});

'use strict';

//====================================================================

// Bonne pratique : utiliser le paquet `readable-stream`
// (http://npmjs.org/package/readable-stream) à la place du module
// standard `stream` de Node car le développeur s'assure qu'il
// utilisera toujours une version compatible avec son code.
var Readable = require('readable-stream');

// Instanciation de notre flux de lecture.
var readable = new Readable({

  // Le mode objet indique le flux ne gère pas uniquement des chaînes
  // et des tampons.
  objectMode: true,
});

var array = ['foo', 'bar', 'baz'];
var i = 0;
var n = array.length;

// Implémentation de notre flux qui va émettre toutes les entrées du
// tableau `array`.
readable._read = function () {
  // Tant qu'il reste des entrées dans le tableau, on tente de les
  // envoyer.
  while (i < n) {

    // Si push renvoie false, c'est que le consommateur n'a pas
    // fini de traiter les messages envoyés.
    //
    // Il n'est donc pas nécessaire de continuer pour le moment pour
    // éviter de saturer la mémoire (contre-pression).
    if (!this.push(array[i++])) {
      return;
    }
  }

  // Signale la fin du flux.
  this.push(null);
};

//====================================================================

// Il est maintenant possible de consommer notre flux.
readable.on('data', function (item) {
  console.log(item);
});

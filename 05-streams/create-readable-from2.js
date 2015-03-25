'use strict';

//====================================================================

var from2 = require('from2');

var array = ['foo', 'bar', 'baz'];
var i = 0;
var n = array.length;

// Création et implémentation de notre flux qui va émettre toutes les
// entrées du tableau `array`.
var readable = new from2.obj(function () {
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
});

//====================================================================

// Il est maintenant possible de consommer notre flux.
readable.on('data', function (item) {
  console.log(item);
});

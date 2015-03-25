'use strict';

//====================================================================

// Bonne pratique : utiliser le paquet `readable-stream`
// (http://npmjs.org/package/readable-stream) à la place du module
// standard `stream` de Node car le développeur s'assure qu'il
// utilisera toujours une version compatible avec son code.
var Transform = require('readable-stream/transform');

// Instanciation de notre flux de lecture.
var transform = new Transform({

  // Le mode objet indique le flux ne gère pas uniquement des chaînes
  // et des tampons.
  objectMode: true,
});

// Cette méthode est appelée pour chaque donnée entrant dans le flux
// d'entrée.
transform._transform = function (chunk, encoding, next) {
  // Convertie en chaîne si nécessaire.
  chunk = String(chunk);

  // On vérifie que chunk ne soit pas vide.
  if (!chunk.length) {
    // Signale une erreur.
    next(new Error('entrée invalide'));

    return;
  }

  // Pousse le ou les nouveaux messages après transformation.
  this.push(chunk.toUpperCase());

  // Signale que le traitement de ce message est terminé.
  next();
};

// Cette méthode est appelée à la fin du flux d'entrée.
transform._flush = function (next) {
  this.push('\nFIN DE LA TRANSFORMATION !!\n');

  // Signale que le traitement de ce message est terminé.
  //
  // Peut également servir à émettre une erreur en paramètre.
  next(null);
};

//====================================================================

process.stdin.pipe(transform).pipe(process.stdout);

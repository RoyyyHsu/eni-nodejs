'use strict';

//====================================================================

var through2 = require('through2');

var transform = through2.obj(
  // Cette méthode est appelée pour chaque donnée entrant dans le flux
  // d'entrée.
  function (chunk, encoding, next) {
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
  },

  // Cette méthode est appelée à la fin du flux d'entrée.
  function (next) {
    this.push('\nFIN DE LA TRANSFORMATION !!\n');

    // Signale que le traitement de ce message est terminé.
    //
    // Peut également servir à émettre une erreur en paramètre.
    next(null);
  }
);

//====================================================================

process.stdin.pipe(transform).pipe(process.stdout);

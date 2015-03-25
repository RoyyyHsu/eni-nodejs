// Exemple, réimplémentation de la commande `tee` de Unix qui copie
// l'entrée standard sur la sortie sortie standard et dans des fichiers.
//
// Utilisation :
//
// ```
// > echo 'foo bar' | node tee.js trace.txt
// foo bar
// > cat trace.txt
// foo bar
// ```

'use strict';

// Importe la fonction createWriteStream du module fs qui permet
// d'écrire un fichier via un flux.
var createWriteStream = require('fs').createWriteStream;

// Récupère le tableaux des arguments passés au programme.
var args = process.argv.slice(2);

// Options de l'écriture du fichier.
var opts = {

  // Si l'argument -a est passé au programme alors le fichier sera
  // ouvert en mode d'ajout et son contenu ne sera pas remplacé mais
  // étendu.
  flags: args.indexOf('-a') === -1 ? 'w' : 'a',
};

// Transfère le contenu lu depuis l'entrée standard vers la sortie
// standard.
process.stdin.pipe(process.stdout);

// Pour chaque fichier, transfère également le contenu de l'entrée
// standard vers eux.
args.forEach(function (file) {
  process.stdin.pipe(createWriteStream(file, opts));
});

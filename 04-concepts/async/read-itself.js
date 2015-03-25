'use strict';

var readFile = require('fs').readFile;

// De part la convention Node, le dernier paramètre de la fonction
// asynchrone est une continuation (ou callback) qui prend en
// paramètre l'erreur si l'opération a échoué (`null` sinon) ainsi que
// le résultat.
readFile(__filename, function (error, content) {
  // Il ne faut pas oublier de vérifier l'existence d'une erreur.
  if (error) {
    console.error(error);
    return;
  }

  // Le résultat est un tampon (`Buffer`), ici on souhaite l'afficher
  // sous forme de chaîne.
  console.log(content.toString());
});

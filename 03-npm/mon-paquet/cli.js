#!/usr/bin/env node

// Pour bien comprendre la structure de ce module, voir le chapitre 8
// sur la réalisation d'un programme en ligne de commande.

'use strict';

// Fonction principale de notre programme.
function main(args) {

  // Si l'argument `--help` est passé alors un message d'aide est
  // retourné.
  if (args.indexOf('--help') !== -1) {
    return 'Message d\'aide.';
  }

  // Sinon on retourne le message suivant.
  return 'Bonjour tout le monde !';
}

// La fonction est exportée afin de pouvoir être testée dans
// `cli.spec.js`.
exports = module.exports = main;

// Si le module n'est pas importé mais appelé directement, on exécute
// la fonction `main()`.
if (!module.parent) {
  require('exec-promise')(main);
}

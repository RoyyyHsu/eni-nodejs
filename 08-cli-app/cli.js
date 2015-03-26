#!/usr/bin/env node

// La ligne ci-dessus indique que ce script doit être exécuté avec
// Node.

'use strict';

var eventToPromise = require('event-to-promise');
var express = require('express');
var minimist = require('minimist');
var serveStatic = require('serve-static');

// Fonction principale du programme, c'est elle qui est appelée au
// moment de l'exécution.
//
// En paramètre elle reçoit un tableau qui est la liste des arguments
// de la ligne de commandes.
function main(args) {

  // minimist est utilisé pour analyser les arguments de la ligne de
  // commandes à partir de la configuration suivante.
  var opts = minimist(args, {
    boolean: ['help'],
    string: ['port'],

    default: {
      port: '80'
    }
  });

  // Si l'argument `--help` est passé alors la fonction retourne un
  // message d'aide.
  if (opts.help) {
    return 'Usage: mon-serveur [--port=<port>] <dossier>...';
  }

  var app = express();

  opts._.forEach(function (directory) {
    app.use(serveStatic(directory));
  });

  var server = app.listen(opts.port);

  // Afin que le programme ne se termine pas immédiatement (de part le
  // module `exec-promise`), on retourne une promesse.
  //
  // `eventToPromise()` retourne une promesse qui sera résolue quand
  // `l'événement `close` est émis par le serveur.
  return eventToPromise(server, 'close');
}

// Il est important d'exporter la fonction principale afin de la
// rendre testable.
module.exports = exports = main;

// Si le module courant n'a pas été inclus mais est exécuté
// directement alors, la fonction principale est exécutée par le
// module `exec-promise`.
if (!module.parent) {
  var execPromise = require('exec-promise');
  execPromise(main);
}

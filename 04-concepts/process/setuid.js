'use strict';

var http = require('http');

function showCurrentUser() {
  console.log('exécution en que %s:%s', process.getuid(), process.getgid());
}

showCurrentUser();

// Change l'utilisateur du processus Node pour `nobody`.
//
// Grâce à cela, il est possible d'utiliser l'utiliser `root` pour
// lancer notre programme afin de pouvoir s'attacher au port numéro 80
// puis immédiatement d'abaisser les droits du processus afin de
// limiter les risques de sécurité.
http.createServer().listen(80, function onListening() {
  process.setgid('nogroup');
  process.setuid('nobody');

  showCurrentUser();
});

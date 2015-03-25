// Cette exemple requiert l'installation de dépendances :
//
// ```
// > npm install
// ```

'use strict';

function showCurrentUser() {
  console.log('exécution en que %s:%s', process.getuid(), process.getgid());
}

var http = require('http');
var tcpBind = require('tcp-bind');

// S'associe de façon synchrone à un port.
var descriptor = tcpBind(80);

showCurrentUser();

// Diminue le niveau de permission en changeant le groupe et
// l'utilisateur courant.
process.setgid('nogroup');
process.setuid('nobody');

showCurrentUser();

// Créer un serveur HTTP écoutant sur ce port.
http.createServer().listen({ fd: descriptor });

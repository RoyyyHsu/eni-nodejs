'use strict';

// `server` est un émetteur d'événement.
var server = require('http').createServer();

// On enregistre ici un auditeur pour l'événement `listening` qui sera
// émit quand le serveur commencera à écouter sur le port demandé.
server.on('listening', function () {
  var address = this.address();

  console.log('http://%s:%s', address.address, address.port);
});

// On enregistre ici un auditeur pour l'événement `request` qui sera
// émit à l'arrivée d'une requête.
server.on('request', function (request, response) {
  // Affiche une trace de la requête.
  console.log('%s %s', request.method, request.url);

  // Renvoie une réponse.
  response.setHeader('content-type', 'text/plain');
  response.write('nothing to see here');
  response.end();
});

server.listen(8080);

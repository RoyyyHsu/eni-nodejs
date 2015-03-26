'use strict';

//====================================================================
// Instanciation d'une application Express.

// Import du module express.
var express = require('express');

// Création de l'instance de l'application.
var app = express();

//====================================================================
// Création d'un serveur HTTP.

// Instancie un serveur HTTP sur le port 8080 et l'associe à
// l'application.
app.listen(8080, function serverOnListen() {
  var address = this.address();

  var port = address.port;
  address = address.address;

  // Correctly handle IPv6 addresses.
  if (address.indexOf(':') !== -1) {
    address = '['+ address +']';
  }

  console.log('Serveur écoute sur http://'+ address +':'+ port);
});

//====================================================================
// Analyse de la requête.

var bodyParser = require('body-parser');

// Support du JSON.
app.use(bodyParser.json());

// Support des formulaires HTML.
app.use(bodyParser.urlencoded({
  extended: true,
}));

//====================================================================
// Trace.

// Associe un middleware de log à l'application.
app.use(function (request, response, next) {
  // Log la requête courante.
  console.log('==== %s %s', request.method, request.path);
  console.log('  - Données :', request.body);

  // Passe la main au middleware suivant.
  next();
});

//====================================================================
// Routage.

app.get('/', function (request, response) {
  // Renvoie du texte.
  response.send('Page d\'accueil');
});

app.get('/json', function (request, response) {
  // Renvoie du JSON.
  response.json({
    foo: 'bar',
  });
});

app.get('/itself', function (request, response) {
  // Propose ce script en téléchargement.
  response.download(__filename);
});

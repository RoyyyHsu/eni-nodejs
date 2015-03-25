'use strict';

var config = {
  foo: 0,
};

function reloadConfig() {
  ++config.foo;
}

function showConfig() {
  console.log('config.foo:', config.foo);
}

// Ce signal est couramment utilisé pour indiquer à un programme de
// recharger sa configuration.
process.on('SIGHUP', function () {
  console.log('rechargement de la configuration');

  reloadConfig();
});


// Pour le test, on envoie le signal SIGHUP (pour recharger la
// configuration) au processus courant, ce qui serait peu utile dans
// la réalité où l'on préférerait appeler `reloadConfig()`
// directement.
process.kill(process.pid, 'SIGHUP');

// Comme les signaux sont émis de façon asynchrone, on peut toujours
// constater la configuration d'origine même après le
// `process.kill()`.
showConfig();

// Par contre, dans 1 seconde on pourra constater que la configuration
// a bel et bien été mise à jour.
setTimeout(showConfig, 1e3);

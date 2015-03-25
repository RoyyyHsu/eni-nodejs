'use strict';

// Cet événement est émis lorsque Node s'arrête.
//
// À partir de là la boucle d'événement est stoppée et il est
// impossible d'effectuer des opérations asynchrones.
process.on('exit', function () {
  console.log('le programme se termine');
});

// Cet événement est émis lorsqu'une exception n'est pas rattrapée
// (par un bloc `try { ... } catch (error) { ... }`).
//
// Node est à présent dans un état instable et il est fortement
// conseillé d'arrêter le processus comme ci-dessous.
process.on('uncaughtException', function (exception) {
  console.error('Erreur', exception);

  process.exit(1);
});

throw new Error('foo');

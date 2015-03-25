'use strict';

function foo() {
  console.log('foo (setImmediate)');
}

function bar() {
  console.log('bar (nextTick)');
}

function baz() {
  console.log('baz (sync)');
}

setImmediate(foo);
process.nextTick(bar);
baz();

// Dans l'ordre ça afficher :
//   baz (sync)
//   bar (nextTick)
//   foo (setImmediate)
//
// Car l'exécution de la boucle est la suivante :
//
// 1. code synchrone
// 2. tous les `process.nextTick()`
// 3. tous les `setImmediate()`
//
// Il faut noter qu'il n'y a qu'un seul fil d'exécution et que tant
// que chaque appel ne sera pas terminer, la fonction suivante ne se
// lancera pas.

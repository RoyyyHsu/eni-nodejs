'use strict';

//====================================================================
// Affiche des valeurs JavaScript comme un objet.

console.log({foo: ['bar', 'baz']});
// > { foo: [ 'bar', 'baz' ] }

//====================================================================
// Affiche selon un formatage.

console.log('Valeur %d: %j', 1, 'foo');
// > Valeur 1: "foo"

//====================================================================
// Affiche sur la sortie d'erreur.

console.error('Erreur de lecture');
// > Erreur de lecture

//====================================================================
// Affiche une trace de la pile.

function foo() {
  console.trace('Foo');
}

foo();
// > Trace: Foo
// >     at foo (repl:2:9)
// >     at repl:1:1
// >     at REPLServer.self.eval (repl.js:112:21)
// >     at repl.js:249:20
// >     at REPLServer.self.eval (repl.js:122:7)
// >     at Interface.<anonymous> (repl.js:239:12)
// >     at Interface.emit (events.js:95:17)
// >     at Interface._onLine (readline.js:203:10)
// >     at Interface._line (readline.js:532:8)
// >     at Interface._ttyWrite (readline.js:768:16)

//====================================================================
// Permet de mesurer le temps d'exécution de portions de code.

function bar() {
  for (var i = 0; i < 1e9; ++i) {}
}
function baz() {
  for (var i = 0; i < 1e8; ++i) {}
}

console.time('bar + baz');

console.time('bar');
bar();
console.timeEnd('bar');
// > bar: 1526ms

baz();
console.timeEnd('bar + baz');
// > bar + baz: 2193ms

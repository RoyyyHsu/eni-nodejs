// Essayez de lancer ce script avec des configurations différentes :
//
// ```
// > node debug.js
// > DEBUG=myApp:foo node debug.js
//   myApp:foo Foo! +0ms
// > DEBUG=myApp:* node debug.js
//   myApp:foo Foo! +0ms
//   myApp:bar Bar! +2ms
// ```

// Le module `debug` (https://github.com/visionmedia/debug) exporte
// une fonction *factory* qui permet de construire un loggueur
// (c'est-à-dire une fonction qui peut être utiliser pour afficher
// des traces de log) associé à un nom.
var createDebug = require('debug');

// Ici on construit 2 loggueurs, un avec le nom `myApp:foo` et l'autre
// `myApp:bar`.
var fooDebug = createDebug('myApp:foo');
var barDebug = createDebug('myApp:bar');

// On écrit un message avec chacun des loggeurs.
fooDebug('Foo!');
barDebug('Bar!');

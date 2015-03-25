// Cette exemple requiert l'installation de dépendances :
//
// ```
// > npm install
// ```

'use strict';

var humanFormat = require('human-format')

var usage = process.memoryUsage();

console.log('Utilisation en mémoire :', humanFormat(usage.rss));
console.log('Utilisation du tas : %s sur %s',
  humanFormat(usage.heapUsed),
  humanFormat(usage.heapTotal)
);

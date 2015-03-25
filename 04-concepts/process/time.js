'use strict';

function foo() {
  for (var i = 0; i < 1e9; ++i) {}
}

var start = process.hrtime();

foo();

var duration = process.hrtime(start);

console.log('%s secondes et %s nanosecondes', duration[0], duration[1]);

'use strict';

// Plus grand dénominateur commun utilisant l'algorithme d'Euclide.
function gcd(a, b) {
  return b ? gcd(b, a % b) : a;
}
module.exports.gcd = gcd;

// Factorielle en récursion terminale (plus rapide avec ECMAScript 6).
function fac(n, acc) {
  acc || (acc = 1);
  return n ? fac(n - 1, acc * n) : acc;
}
exports.fac = fac;

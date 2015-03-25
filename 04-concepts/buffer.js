'use strict';

var buf;

//====================================================================
// Construction

// Création d'un tampon de 50Ko non initialisé.
buf = new Buffer(50 * 1e3);

// Tampon dont la valeur en ASCII est foo bar.
buf = new Buffer([102, 111, 111, 32, 98, 97, 114]);

// Deux tampons dont la valeur en ASCII est foo bar.
buf = new Buffer('foo bar');
buf = new Buffer('666f6f20626172', 'hex');

//====================================================================
// Conversion

buf = new Buffer('foo bar');

// En chaîne (UTF-8).
console.log(buf.toString());
// > 'foo bar'

// En chaîne (hexadécimal).
console.log(buf.toString('hex'));
// > '666f6f20626172'

// En JSON (tableau d'entiers).
console.log(buf.toJSON());
// > [102, 111, 111, 32, 98, 97, 114]

//====================================================================
// Manipulation

buf = new Buffer('foo bar');

// Chaque octet peut être accédé par l'opérateur `[]` comme pour les
// tableaux.
buf[0];
// > 102

// Cela fonctionne aussi pour la modification.
buf[6] = 122;
console.log(buf.toString());
// > 'foo baz'


// La méthode `fill()`` permet de remplir tout ou partie du tampon
// avec une valeur.
buf.fill('z', 0, 3);
console.log(buf.toString());
// > 'zzz baz'

// La méthode `write()` permet d'écrire une chaîne dans un tampon.
buf = new Buffer(3);
buf.write('foo');
console.log(buf.toString());
// > 'foo'

// Il est possible de lire et écrire des valeurs binaires comme un
// entier non signé de 32 bits en *little endian*.
buf = new Buffer(4);
buf.writeUInt32LE(0xdeadbeef, 0);
console.log(buf.toJSON());
// > [ 239, 190, 173, 222 ]

// La méthode `slice()` permet de récupérer une tranche du tampon.
buf = new Buffer('foo bar baz');
var slice = buf.slice(4, 7);
console.log(slice.toString());
// > 'bar'

// La méthode `copy()` permet de copier du contenu dans un autre
// tampon.
buf = new Buffer('foo bar');
var other = new Buffer('baz');
other.copy(buf);
console.log(buf.toString());
// > 'baz bar'

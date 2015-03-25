'use strict';

//====================================================================

var Readable = require('readable-stream');
var Writable = require('readable-stream/writable');
var Duplex = require('readable-stream/duplex');
var Transform = require('readable-stream/transform');

var from2 = require('from2');
var inherits = require('util').inherits;
var through2 = require('through2');

//====================================================================

function fromArray1(array) {
  var stream = new Readable({
    objectMode: true
  });

  var i = 0;
  var n = array.length;

  stream._read = function (size) {
    while (i < n) {

      // Si push renvoie false, c'est que le consommateur n'a pas
      // finit de traiter les messages envoyés.
      //
      // Il n'est donc pas nécessaire de continuer pour le moment.
      if (!this.push(array[i++])) {
        return;
      }
    }

    // Signale la fin du flux.
    this.push(null);
  };

  return stream;
}
exports.fromArray1 = fromArray1;

//--------------------------------------------------------------------

function fromArray2(array) {
  var i = 0;
  var n = array.length;

  return from2.obj(function (size) {
    while (i < n) {
      if (!this.push(array[i++])) {
        return;
      }
    }

    this.push(null);
  });
}
exports.fromArray2 = fromArray2;

//--------------------------------------------------------------------

function ArrayStream1(array) {
  Readable.call(this, {
    objectMode: true
  });

  this._array = array;
  this._i = 0;
  this._n = array.length;
}
inherits(Readable, ArrayStream1);

ArrayStream1.prototype._read = function (size) {
  while (this._i < this._n) {
    if (!this.push(this._array[this._i++])) {
      return;
    }
  }

  this.push(null);
};

exports.ArrayStream1 = ArrayStream1;

//--------------------------------------------------------------------

function writableStream() {
  var stream = new Writable({
    objectMode: true
  });

  stream._write = function (chunk, encoding, next) {
    console.log(chunk);

    // Signale que le message courant a fini d'être traité.
    next();
  };

  return stream;
}
exports.writableStream = writableStream;

//--------------------------------------------------------------------

function transformStream() {
  var stream = new Transform({
    objectMode: true
  });

  stream._transform = function (chunk, encoding, next) {
    // Convertie en chaîne si nécessaire.
    chunk = String(chunk);

    // On vérifie que chunk ne soit pas vide.
    if (!chunk.length) {
      // Signale une erreur.
      next(new Error('entrée invalide'));

      return;
    }

    // Pousse le ou les nouveaux messages après transformation.
    this.push(chunk.toUpperCase());

    // Signale que le traitement de ce message est terminé.
    next();
  };

  stream._flush = function (next) {
    this.push('THE');
    next(null, 'END');
  };

  return stream;
}
exports.transformStream = transformStream;

//--------------------------------------------------------------------

var UpperCaseStream = through2.ctor({
  objectMode: true
}, function (chunk, encoding, next) {
  chunk = String(chunk);

  if (!chunk.length) {
    next(new Error('entrée invalide'));

    return;
  }

  this.push(chunk.toUpperCase());

  next();
}, function (next) {
  this.push('THE END');

  next();
});
exports.UpperCaseStream = UpperCaseStream;

//--------------------------------------------------------------------

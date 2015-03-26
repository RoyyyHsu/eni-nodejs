'use strict';

// Pour bien comprendre la structure de ce module, voir le chapitre 11
// sur les tests.

//====================================================================

var cli = require('./cli');

var expect = require('chai').expect;

//====================================================================

describe('cli()', function () {
  it('returns the usage when --help is passed', function () {
    expect(cli(['--help'])).to.equal('Usage: mon-serveur [--port=<port>] <dossier>...');
  });
});

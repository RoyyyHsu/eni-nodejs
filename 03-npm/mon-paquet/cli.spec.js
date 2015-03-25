'use strict';

// Pour bien comprendre la structure de ce module, voir le chapitre 11
// sur les tests.

//====================================================================

var cli = require('./cli');

var expect = require('chai').expect;

//====================================================================

describe('cli()', function () {
  it('returns the expected message', function () {
    expect(cli([])).to.equal('Bonjour tout le monde !');
  })

  it('returns the expected help message if --help is passed', function () {
    expect(cli(['--help'])).to.equal('Message d\'aide.');
  });
});

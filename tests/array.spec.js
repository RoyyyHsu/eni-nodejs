'use strict';

//====================================================================

var expect = require('chai').expect;

//====================================================================

describe('Array', function () {

  beforeEach(function () {
    this.array = ['foo', 'bar', 'baz'];
  });

  describe('.length', function () {

    it('returns the number of items', function () {
      expect(this.array).to.have.a.property('length').that.equal(3);
    });

    it('can be used to change the size', function () {
      this.array.length = 0;

      expect(this.array.length).to.equal(0);
      expect(this.array[0]).to.be.undefined;
    });

  });

  describe('[] operator', function () {

    it('returns the item at a given position', function () {
      expect(this.array[0]).to.equal('foo');
    });

    it('returns undefined for a missing item', function () {
      expect(this.array[99]).to.be.undefined;
    });

    it('can be used to set an item at a given position', function () {
      this.array[0] = 42;

      expect(this.array[0]).to.equal(42);
    });
    it('updates the size if an item is set after the end', function () {
      this.array[99] = 3.14;

      expect(this.array.length).to.equal(100);
    });

  });

  describe('#indexOf()', function () {

    it('returns the index of the first strictly equal item', function () {
      this.array.push('bar');

      expect(this.array.indexOf('bar')).to.equal(1);
    });

    it('returns -1 if there is no strictly equal item', function () {
      expect(this.array.indexOf('plop')).to.equal(-1);
    });

  });

});

var assert = require('assert');

// Kasza
describe('Kasza', function() {

  var Kasza = require('../dist/kasza.min.js');

  // require
  describe('typeof', function() {
    it('Kasza.js should be typeof object', function() {
      assert.equal(typeof Kasza, 'object');
    });
  });

  // set and get
  describe('basic set and get', function() {
    Kasza.set('ogorek', 'kiszony');
    it('should return value that has been set', function() {
      assert.equal(Kasza.get('ogorek'), 'kiszony');
    });
  });

});

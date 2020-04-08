// Prepare chai
const chai = require('chai');
const expect = chai.expect;

describe('global', function() {
  describe('#isNode', function() {
    it('Returns `true` for Node JS env', function() {
      expect(global.isNodeJs).to.be.true;
    });
  });

  describe('#getLanguage', function() {
    it('Returns proper language code', function() {
      expect(global.getLanguage()).to.be.equal('en');
    });
  });

  describe('#getCountry', function() {
    it('Returns proper country code', function() {
      expect(global.getCountry()).to.be.equal('US');
    });
  });

  describe('#isNumeric', function() {
    it('Resturns `true` when giving proper numeric string', function() {
      expect(global.isNumeric('123.123')).to.be.true;
      expect(global.isNumeric('1e0')).to.be.true;
    });

    it('Returns `false` when giving invalid numeric string', function() {
      expect(global.isNumeric('123.123.')).to.be.false;
      expect(global.isNumeric('.')).to.be.false;
      expect(global.isNumeric('1a0')).to.be.false;
    });
  });

  describe('#parseValue', function() {
    it('Returns number if given string that is numeric', function() {
      expect(global.parseValue('111')).to.be.equal(111);
    });

    it('Returns `true` if given string that is true', function() {
      expect(global.parseValue('true')).to.be.true;
    });

    it('Returns `false` if given string that is false', function() {
      expect(global.parseValue('false')).to.be.false;
    });

    it('Returns the same string that has been given, but not parsed', function() {
      expect(global.parseValue('wololo')).to.be.equal('wololo');
    });

    it('Returns the same value that has been given if it isn\'t a string', function() {
      var test = [];
      expect(global.parseValue(test)).to.be.equal(test);
    });
  });

  describe('md5', function() {
    it('Returns properly calculated hash', function() {
      expect(global.md5('')).to.be.equal('d41d8cd98f00b204e9800998ecf8427e');
    });

    it('Returns properly calculated hash for longer strings', function() {
      var test = '';
      for(var i = 0; i < 1000; i++) {
        test += 'ABC';
      }
      expect(global.md5(test)).to.be.equal('0c101c2013f996d63f1f01450a4c73e9');
    });
  });
});

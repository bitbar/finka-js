// Prepare chai
const chai = require('chai');
const expect = chai.expect;

describe('Number', function() {
  describe('#isNumber', function() {
    it('string is not a number', function() {
      expect(Number.isNumber('a')).to.be.false;
    });

    it('null is not a number', function() {
      expect(Number.isNumber(null)).to.be.false;
    });

    it('undefined is not a number', function() {
      expect(Number.isNumber('undefined')).to.be.false;
    });

    it('1 is a number', function() {
      expect(Number.isNumber(1)).to.be.true;
    });
  });
});

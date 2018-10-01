// Prepare chai
const chai = require('chai');
const expect = chai.expect;

describe('Boolean', function () {

  describe('#xor', function () {
    it('0 xor 0 = 0', function() {
      expect(Boolean.xor(false, false)).to.be.false;
    });

    it('1 xor 0 = 1', function() {
      expect(Boolean.xor(true, false)).to.be.true;
    });

    it('0 xor 1 = 1', function() {
      expect(Boolean.xor(false, true)).to.be.true;
    });

    it('1 xor 1 = 0', function() {
      expect(Boolean.xor(true, true)).to.be.false;
    });
  });
});

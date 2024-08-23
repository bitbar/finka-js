// Prepare chai
import {expect} from 'chai';

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

  describe('#isNegativeZero', function() {
    it('Returns `false` for +0', function() {
      expect(Number.isNegativeZero(+0)).to.be.false;
    });

    it('Returns `true` for -0', function() {
      expect(Number.isNegativeZero(-0)).to.be.true;
    });
  });

  describe('#isInteger', function() {
    it('1.1 is not an integer', function() {
      expect(Number.isInteger(1.1)).to.be.false;
    });

    it('1.00000001 is not an integer', function() {
      expect(Number.isInteger(1.00000001)).to.be.false;
    });

    it('0 is an integer', function() {
      expect(Number.isInteger(0)).to.be.true;
    });

    it('1 is an integer', function() {
      expect(Number.isInteger(1)).to.be.true;
    });
  });

  describe('#isNatural', function() {
    it('-1 is not an natural', function() {
      expect(Number.isNatural(-1)).to.be.false;
    });

    it('1.1 is not an natural', function() {
      expect(Number.isNatural(1.1)).to.be.false;
    });

    it('-0 is not an natural', function() {
      expect(Number.isNatural(-0)).to.be.false;
    });

    it('+0 is an natural', function() {
      expect(Number.isNatural(+0)).to.be.true;
    });

    it('1 is an natural', function() {
      expect(Number.isNatural(1)).to.be.true;
    });
  });

  describe('#isFloat', function() {
    it('1 is not an float', function() {
      expect(Number.isFloat(1)).to.be.false;
    });

    it('0 is not an float', function() {
      expect(Number.isFloat(0)).to.be.false;
    });

    it('1.1 is an float', function() {
      expect(Number.isFloat(1.1)).to.be.true;
    });
  });

  describe('.pad', function() {
    describe('Working with integers', function() {
      const test = 10;

      it('Should not add any padding', function() {
        expect(test.pad(2)).to.be.equal('10');
      });

      it('Should add 2 leading zeros', function() {
        expect(test.pad(4)).to.be.equal('0010');
      });
    });

    describe('Working with floats', function() {
      const test = 10.0101;

      it('Should not add any padding', function() {
        expect(test.pad(2)).to.be.equal('10.0101');
      });

      it('Should add 2 leading zeros', function() {
        expect(test.pad(4)).to.be.equal('0010.0101');
      });
    });
  });

});

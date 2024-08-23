// Prepare chai
import {expect} from 'chai';

describe('Math', function () {
  describe('#rand', function () {
    const test = [];
    for(let i = 0; i < 1000; i++) {
      test.push(Math.rand());
    }

    it('999 of 1000 generated numbers should be unique (0.1% margin error)', function() {
      expect(test.unique().length).to.be.at.least(999);
    });

    it('Average of generated numbers should be equal 0.5 ±0.05', function() {
      expect(Math.avg(test)).to.be.within(0.45, 0.55);
    });
  });

  describe('#log10', function() {
    const tests = [
      [NaN, NaN],
      [-1, NaN],
      [+0, -Infinity],
      [-0, -Infinity],
      [1, +0],
      [Infinity, Infinity],
      [2, 0.3010299956639812],
      [100000, 5]
    ];

    for(let test of tests) {
      it(`x = ${test[0]}`, function() {
        expect(Math.log10(test[0])).to.be.deep.equal(test[1]);
      });
    }
  });

  describe('#roundTo', function() {
    const num = 1.01299016289;
    const tests = [
      [0, 1],
      [1, 1],
      [2, 1.01],
      [3, 1.013],
      [4, 1.013],
      [5, 1.01299],
      [6, 1.01299],
      [7, 1.0129902],
      [8, 1.01299016],
      [9, 1.012990163],
      [10, 1.0129901629],
      [11, 1.01299016289]
    ];

    for(let test of tests) {
      it(`precision = ${test[0]}`, function() {
        expect(Math.roundTo(num, test[0])).to.be.deep.equal(test[1]);
      });
    }
  });

  describe('#median', function() {
    it('Returns properly calculated median for odd number of numbers', function() {
      const numbers = [1, 2, 3, 4, 5, 6, 7];

      expect(Math.median(numbers)).to.be.equal(4);
    });

    it('Returns properly calculated median for even number of numbers', function() {
      const numbers = [1, 2, 3, 4, 5, 6];
      expect(Math.median(numbers)).to.be.equal(3.5);
    });

    it('Returns 0 when empty Array given', function() {
      expect(Math.median([])).to.be.equal(0);
    });
  });

  describe('#sum', function() {
    it('Returns properly calculated sum of numbers', function() {
      const numbers = [1, 2, 3, 4, 5, 6, 7];
      expect(Math.sum(numbers)).to.be.equal(28);
    });

    it('Returns 0 when empty Array given', function() {
      expect(Math.sum([])).to.be.equal(0);
    });
  });

  describe('#avg', function() {
    it('Returns properly calculated average of numbers', function() {
      const numbers = [1, 2, 3, 4, 5, 6, 7];
      expect(Math.avg(numbers)).to.be.equal(4);
    });

    it('Returns 0 when empty Array given', function() {
      expect(Math.avg([])).to.be.equal(0);
    });
  });

});

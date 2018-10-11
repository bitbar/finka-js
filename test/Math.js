// Prepare chai
const chai = require('chai');
const expect = chai.expect;

describe('Math', function () {
  describe('#rand', function () {
    var test = [];
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
    var tests = [
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
    var num = 1.01299016289;
    var tests = [
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
      var numbers = [1, 2, 3, 4, 5, 6, 7];
      expect(Math.avg(numbers)).to.equal(4);
    });
    it('Returns properly calculated median for even number of numbers', function() {
      var numbers = [1, 2, 3, 4, 5, 6];
      expect(Math.avg(numbers)).to.equal(3.5);
    });
  });

  describe('#sum', function() {
    it('Returns properly calculated sum of numbers', function() {
      var numbers = [1, 2, 3, 4, 5, 6, 7];
      expect(Math.sum(numbers)).to.equal(28);
    });
  });

  describe('#avg', function() {
    it('Returns properly calculated avarage of numbers', function() {
      var numbers = [1, 2, 3, 4, 5, 6, 7];
      expect(Math.avg(numbers)).to.equal(4);
    });
  });

});

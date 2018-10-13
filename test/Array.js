// Prepare chai
const chai = require('chai');
const expect = chai.expect;

describe('Array', function () {

  describe('#sortArrayOfObjects', function () {
    var test = [{
      a: 1,
      b: 'c'
    }, {
      a: 2,
      b: 'a'
    }, {
      a: 3,
      b: 'b'
    }, {
      a: 2,
      b: 'a'
    }];

    it('Sort ascending numbers', function() {
      Array.sortArrayOfObjects(test, 'a');
      expect(test).to.deep.equal([{
        a: 1,
        b: 'c'
      }, {
        a: 2,
        b: 'a'
      }, {
        a: 2,
        b: 'a'
      }, {
        a: 3,
        b: 'b'
      }]);
    });

    it('Sort descending numbers', function() {
      Array.sortArrayOfObjects(test, 'a', true);
      expect(test).to.deep.equal([{
        a: 3,
        b: 'b'
      }, {
        a: 2,
        b: 'a'
      }, {
        a: 2,
        b: 'a'
      }, {
        a: 1,
        b: 'c'
      }]);
    });

    it('Sort ascending strings', function() {
      Array.sortArrayOfObjects(test, 'b');
      expect(test).to.deep.equal([{
        a: 2,
        b: 'a'
      }, {
        a: 2,
        b: 'a'
      }, {
        a: 3,
        b: 'b'
      }, {
        a: 1,
        b: 'c'
      }]);
    });

    it('Sort descending strings', function() {
      Array.sortArrayOfObjects(test, 'b', true);
      expect(test).to.deep.equal([{
        a: 1,
        b: 'c'
      }, {
        a: 3,
        b: 'b'
      }, {
        a: 2,
        b: 'a'
      }, {
        a: 2,
        b: 'a'
      }]);
    });
  });

  describe('#deepCloneArrayOfObjects', function () {
    it('Clone array and check if it\'s deep copy', function() {
      var test = [{ a: 1 }];
      var clone = Array.deepCloneArrayOfObjects(test);
      expect(clone).to.be.an.instanceof(Array).that.have.length(1);
      expect(clone[0]).to.have.property('a');

      clone[0].a = 2;
      expect(clone[0].a).to.be.equal(2);
      expect(test[0].a).to.be.equal(1);
    });
  });

  describe('#wrap', function () {
    var test = Array.wrap(1);

    it('Wrap primitve data', function() {
      expect(test).to.be.an.instanceof(Array).that.have.length(1);
      expect(test[0]).to.be.equal(1);
    });

    it('Array shouldn\'t be wrapped again', function() {
      test = Array.wrap(test);
      expect(test).to.be.an.instanceof(Array).that.have.length(1);
      expect(test[0]).to.be.equal(1);
    });
  });

  describe('.empty', function () {
    it('Emptied Array have length 0', function() {
      var test = [1, 2, 3];
      test.empty();
      expect(test).to.be.an.instanceof(Array).that.is.empty;
    });
  });

  describe('.absorb', function () {
    it('Array should have length 5', function() {
      var test = [1, 2, 3];
      test.absorb([4, 5]);
      expect(test).to.be.an.instanceof(Array).that.have.length(5);
      expect(test).to.be.deep.equal([1, 2, 3, 4, 5]);
    });
  });

  describe('.diff', function () {
    var test = [1, 2, 3];

    it('There should be a difference in 2 elements', function() {  
      var diff = test.diff([2]);
      expect(diff).to.be.an.instanceof(Array).that.have.length(2);
      expect(diff).to.be.deep.equal([1, 3]);
    });

    it('There should be no difference', function() {  
      var diff = test.diff([3, 1, 2]);
      expect(diff).to.be.an.instanceof(Array).that.is.empty;
    });
  });

  describe('.clone', function () {
    it('Clone array of primitive values', function() {
      var test = [1, 2, 3];
      var clone = test.clone();
      expect(clone).to.be.an.instanceof(Array).that.have.length(3);
      expect(clone).to.be.deep.equal(test);
    });

    it('Clone array of objects', function() {
      var test = [{ a: 1 }, { a: 2 }];
      var clone = test.clone();
      expect(clone).to.be.an.instanceof(Array).that.have.length(2);
      expect(clone).to.be.deep.equal(test);

      // it's not deep copy - reference should be the same
      clone[0].a = 3;
      expect(test[0].a).to.be.equal(3);
    });
  });

  describe('.lookFor', function () {
    var test = [{
      a: 1,
      b: 2
    }, {
      a: 2,
      b: -1
    }];

    it('Should find matching element', function() {
      var query = { b: -1 };
      var idx = test.lookFor(query);
      expect(idx).to.be.equal(1);
      expect(test[idx]).to.be.include(query);
    });

    it('Shouldn\'t find matching element', function() {
      var query = { b: 0 };
      var idx = test.lookFor(query);
      expect(idx).to.be.equal(-1);
    });
  });

  describe('.filterLike', function () {
    var test = [{
      a: 1,
      b: 2
    }, {
      a: 2,
      b: -1
    }, {
      a: 1,
      b: 3
    }];

    it('Should create Array of length 2', function() {
      var query = { a: 1 };
      var result = test.filterLike(query);
      expect(result).to.be.an.instanceof(Array).that.have.length(2);
      expect(result).to.be.deep.equal([{ a: 1, b: 2 }, { a: 1, b: 3 }]);
    });

    it('Should create empty Array', function() {
      var query = { b: 0 };
      var result = test.filterLike(query);
      expect(result).to.be.an.instanceof(Array).that.is.empty;
    });

    it('Returns empty Array when query is undefined', function() {
      var result = test.filterLike();
      expect(result).to.be.an.instanceof(Array).that.is.empty;
    });
  });

  describe('.unique', function () {
    it('Should return Array of 3 unique elements', function() {
      var test = [2, 0, 1, 1, 0, 2, 2, 1, 0, 0, 1, 1, 1, 2];
      var result = test.unique();
      expect(result).to.be.an.instanceof(Array).that.have.length(3);
      expect(result).to.have.members([0, 1, 2]);
    });
  });

  describe('.shuffle', function () {
    /**
     * Why only 12 elements?
     * For 12 element items there is 479,001,600 permutations.
     * It means that in theory probability that input array and output array is the same
     * equals 0.000000002%. I think that it's sufficient :)
     */

    // Generate test array
    var test = [];
    for(let i = 0; i < 12; i++) {
      test.push(i);
    }
    var original = [ test.join('-') ];

    it('Shuffle 12 element arrays and generate 1000 different combinations', function() {
      // generate results
      var results = [];
      for(let i = 0; i < 1000; i++) {
        results.push(test.clone().shuffle().join('-'));
      }

      // calculate diff
      var diff = results.diff(original);
      expect(diff).to.have.lengthOf.at.least(999); // allow 1% margin error

      // calculate unique
      var unique = results.unique();
      expect(unique).to.have.lengthOf.at.least(999); // allow 1% margin error
    });
  
    it('Shuffle 12 element array 1000 times and generate different combinations', function() {
      // generate results
      var results = [];
      for(let i = 0; i < 1000; i++) {
        results.push(test.shuffle().join('-'));
      }

      // calculate diff
      var diff = results.diff(original);
      expect(diff).to.have.lengthOf.at.least(999); // allow 1% margin error

      // calculate unique
      var unique = results.unique();
      expect(unique).to.have.lengthOf.at.least(999); // allow 1% margin error
    });
  });

});

// Prepare chai
const chai = require('chai');
const expect = chai.expect;

describe('Promise', function () {
  describe('#isPromise', function () {
    it('Returns `false` when it isn\'t proper Promise', function() {
      expect(Promise.isPromise('')).to.be.false;
      expect(Promise.isPromise(1)).to.be.false;
      expect(Promise.isPromise(true)).to.be.false;
      expect(Promise.isPromise(undefined)).to.be.false;
      expect(Promise.isPromise(null)).to.be.false;
      expect(Promise.isPromise({})).to.be.false;
      expect(Promise.isPromise([])).to.be.false;
    });

    it('Returns `true` when it is proper Promise', function() {
      var test = new Promise(function(resolve) {
        resolve();
      });

      expect(Promise.isPromise(test)).to.be.true;
    });
  });
});

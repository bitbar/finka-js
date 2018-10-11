// Prepare chai
const chai = require('chai');
const expect = chai.expect;

describe('RegExp', function () {

  describe('#escapeString', function () {
    it('Returns properly escaped string', function() {
      var test = '-\\/[]{}()*+?.^$|';
      expect(RegExp.escapeString(test)).to.be.equal('\\-\\\\\\/\\[\\]\\{\\}\\(\\)\\*\\+\\?\\.\\^\\$\\|');
    });
  });
});

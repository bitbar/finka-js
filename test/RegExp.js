// Prepare chai
import {expect} from 'chai';

describe('RegExp', function () {

  describe('#escapeString', function () {
    it('Returns properly escaped string', function() {
      const test = '-\\/[]{}()*+?.^$|';
      expect(RegExp.escapeString(test)).to.be.equal('\\-\\\\\\/\\[\\]\\{\\}\\(\\)\\*\\+\\?\\.\\^\\$\\|');
    });
  });
});

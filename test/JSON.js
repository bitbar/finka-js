// Prepare chai
import {expect} from 'chai';

describe('JSON', function () {

  describe('#isJSONString', function () {
    it('Returns false when invalid JSON string', function() {
      expect(JSON.isJSONString('{ a: 1 }')).to.be.false;
    });

    it('Returns true when valid JSON string', function() {
      expect(JSON.isJSONString('{ "a": 1 }')).to.be.true;
    });
  });
});

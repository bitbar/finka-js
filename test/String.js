// Prepare chai
const chai = require('chai');
const expect = chai.expect;

describe('String', function () {

  describe('.noCase', function () {
    it('Supports camelCase', function() {
      var test = 'mySuperTest111HeHe111HTML';
      expect(test.noCase()).to.be.equal('my super test 111 he he 111 HTML');
    });

    it('Supports PascalCase', function() {
      var test = 'MySuperTest111HeHe111HTML';
      expect(test.noCase()).to.be.equal('my super test 111 he he 111 HTML');
    });

    it('Supports kebab-case', function() {
      var test = 'my-super-test-111-he-he-111-HTML';
      expect(test.noCase()).to.be.equal('my super test 111 he he 111 HTML');
    });

    it('Supports snake_case', function() {
      var test = 'my_super_test_111_he_111_HTML';
      expect(test.noCase()).to.be.equal('my super test 111 he 111 HTML');
    });

    it('Supports CAPITALIZED_SNAKE_CASE', function() {
      var test = 'MY_SUPER_TEST_111_HE';
      expect(test.noCase()).to.be.equal('my super test 111 he');
    });
  });
});

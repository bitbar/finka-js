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

  describe('.editDistance', function () {

    it('Is associative', function() {
      var word1 = 'kitte';
      var word2 = 'kitten';
      expect(String.editDistance(word1, word2)).to.be.equal(1);
      expect(String.editDistance(word2, word1)).to.be.equal(1);
    });

    it('Returns proper edit distance when two words are equal', function() {
      var word = 'kitten';
      expect(String.editDistance(word, word)).to.be.equal(0);
    });

    it('Returns proper edit distance when words differs in one letter', function() {
      var word1 = 'kitte';
      var word2 = 'kitten';
      expect(String.editDistance(word1, word2)).to.be.equal(1);
    });

    it('Returns proper edit distance between two words', function() {
      var word1 = 'kitten';
      var word2 = 'sitting';
      expect(String.editDistance(word1, word2)).to.be.equal(3);
    });

    it('Takes into account camelCase', function() {
      var word1 = 'Kitten';
      var word2 = 'kitten';
      expect(String.editDistance(word1, word2)).to.be.equal(1);
    });
  });

  describe('.capitaliseFirstLetter', function () {

    it('Return string with only first letter capitalized', function() {
      var word = 'que Tal?';
      var result = 'Que Tal?';
      expect(word.capitaliseFirstLetter()).to.be.equal(result);
    });

    it('Return string with very first letter capitalized', function() {
      var word = '?works!';
      var result = '?Works!';
      expect(word.capitaliseFirstLetter()).to.be.equal(result);
    });

    it('Return string with all letters capitalized', function() {
      var word = '?wORKS!';
      var result = '?Works!';
      expect(word.capitaliseFirstLetter(true)).to.be.equal(result);
    });
  });

  describe('.toSnakeCase', function () {

    it('CamelCase to snake_case', function() {
      var test = 'itShouldWorks';
      expect(test.toSnakeCase()).to.be.equal('it_should_works');
    });

    it('PascalCase to snake_case', function() {
      var test = 'ItShouldWorks';
      expect(test.toSnakeCase()).to.be.equal('it_should_works');
    });

    it('kebab-case to snake_case', function() {
      var test = 'it-should-works';
      expect(test.toSnakeCase()).to.be.equal('it_should_works');
    });

    it('CAPITALIZED_SNAKE_CASE to snake_case', function() {
      var test = 'IT_SHOULD_WORKS';
      expect(test.toSnakeCase()).to.be.equal('it_should_works');
    });
    it('CamelCase to CAPITALIZED_SNAKE_CASE', function() {
      var test = 'itShouldWorks';
      expect(test.toSnakeCase(true)).to.be.equal('IT_SHOULD_WORKS');
    });
    it('PascalCase to CAPITALIZED_SNAKE_CASE', function() {
      var test = 'ItShouldWorks';
      expect(test.toSnakeCase(true)).to.be.equal('IT_SHOULD_WORKS');
    });

    it('kebab-case to CAPITALIZED_SNAKE_CASE', function() {
      var test = 'it-should-works';
      expect(test.toSnakeCase(true)).to.be.equal('IT_SHOULD_WORKS');
    });

    it('snake_case to CAPITALIZED_SNAKE_CASE', function() {
      var test = 'it_should_works';
      expect(test.toSnakeCase(true)).to.be.equal('IT_SHOULD_WORKS');
    });
  });
});

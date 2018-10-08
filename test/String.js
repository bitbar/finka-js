// Prepare chai
const chai = require('chai');
const expect = chai.expect;

describe('String', function () {

  describe('#editDistance', function () {
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

    it('Is case sensitive', function() {
      var word1 = 'Kitten';
      var word2 = 'kitten';
      expect(String.editDistance(word1, word2)).to.be.equal(1);
    });
  });

  describe('#getSimilarity', function() {
    it('Is associative', function() {
      var word1 = 'chleb';
      var word2 = 'chlep';
      expect(String.getSimilarity(word1, word2)).to.be.equal(0.8);
      expect(String.getSimilarity(word2, word1)).to.be.equal(0.8);
    });

    it('Returns 100% (1.0) similarity when no difference between strings', function() {
      var word = 'chleb';
      expect(String.getSimilarity(word, word)).to.be.equal(1);
    });

    it('Returns proper similarity', function() {
      var word1 = 'chleb';
      var word2 = 'chlebeczek';
      expect(String.getSimilarity(word1, word2)).to.be.equal(0.5);
    });

    it('Returns proper similarity (2)', function() {
      var word1 = 'chleb';
      var word2 = 'belhc';
      expect(String.getSimilarity(word1, word2)).to.be.equal(0.2);
    });

    it('Is case sensitive', function() {
      var word1 = 'Chleb';
      var word2 = 'chleb';
      expect(String.getSimilarity(word1, word2)).to.be.equal(0.8);
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

  describe('.lowerFirstLetter', function () {
    it('Return string with only first letter lowered', function() {
      var word = 'Que Tal?';
      var result = 'que Tal?';
      expect(word.lowerFirstLetter()).to.be.equal(result);
    });

    it('Return string with very first letter lowered', function() {
      var word = '?Works!';
      var result = '?works!';
      expect(word.lowerFirstLetter()).to.be.equal(result);
    });
  });

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

  describe('.toCamelCase', function () {
    it('Should make no change at all', function() {
      var test = 'hello';
      expect(test.toCamelCase()).to.be.equal(test);
    });

    it('Supports normal sentence', function() {
      var test = "Hello, I'm from District 9 and I'm looking for a job!";
      expect(test.toCamelCase()).to.be.equal('helloImFromDistrict9AndImLookingForAJob');
    });

    it('Supports kebab-case', function() {
      var test = 'my-super-test-111-he-he-111-HTML';
      expect(test.toCamelCase()).to.be.equal('mySuperTest111HeHe111HTML');
    });

    it('Supports snake_case', function() {
      var test = 'my_super_test_111_he_111_HTML';
      expect(test.toCamelCase()).to.be.equal('mySuperTest111He111HTML');
    });

    it('Supports CAPITALIZED_SNAKE_CASE', function() {
      var test = 'MY_SUPER_TEST_111_HE';
      expect(test.toCamelCase()).to.be.equal('mySuperTest111He');
    });
  });

});

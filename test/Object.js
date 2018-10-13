// Prepare chai
const chai = require('chai');
const expect = chai.expect;

describe('Object', function () {
  describe('#isObject', function () {
    it('Returns `false` when it isn\'t proper Object', function() {
      expect(Object.isObject('')).to.be.false;
      expect(Object.isObject(1)).to.be.false;
      expect(Object.isObject(true)).to.be.false;
      expect(Object.isObject(undefined)).to.be.false;
      expect(Object.isObject(null)).to.be.false;
    });

    it('Returns `true` when it is proper Object', function() {
      expect(Object.isObject({})).to.be.true;
      expect(Object.isObject([])).to.be.true;
      expect(Object.isObject(new Number(1))).to.be.true;
    });
  });

  describe('#copy', function() {
    var src = {
      a: 1,
      b: '2',
      c: null
    };

    it('Copies all elements from source to destination', function() {
      var dst = {
        c: '#yolo',
        d: -1
      };

      Object.copy(src, dst);
      expect(dst).to.be.deep.equal({
        a: 1,
        b: '2',
        c: null,
        d: -1
      });
    });

    it('Copies only listed elements from source to destination', function() {
      var dst = {
        c: '#yolo',
        d: -1
      };

      Object.copy(src, dst, ['a', 'b']);
      expect(dst).to.be.deep.equal({
        a: 1,
        b: '2',
        c: '#yolo',
        d: -1
      });
    });
  });

  describe('#isLike', function () {
    var subject = {
      a: 1,
      b: '2',
      c: null,
      d: -1
    };

    it('Returns `false` when given subject doesn\'t match given query', function() {
      var query = {
        a: 1,
        e: null,
        c: null
      };

      expect(Object.isLike(subject, query)).to.be.false;
    });

    it('Returns `true` when given subject matches given query', function() {
      var query = {
        a: 1,
        c: null,
        d: -1
      };

      expect(Object.isLike(subject, query)).to.be.true;
    });

    it('Returns `true` when given subject object matches given query and one of subjects params is function', function() {
      var query = {
        a: 1,
        c: null,
        d: -1,
        e: false
      };
      subject.e = () => false;

      expect(Object.isLike(subject, query)).to.be.true;
    });

    it('Returns `false` when given subject and query are not objects and doesn\'t match by default comparator', function() {
      expect(Object.isLike(true, false)).to.be.false;
    });
  });

  describe('#count', function () {
    var test = {
      a: 1,
      b: 3
    };

    it('Returns proper number of own properties for normal Object', function() {
      expect(Object.count(test)).to.be.equal(2);
    });

    it('Returns proper number of own properties for Object that is inheriting some properties', function() {
      var test2 = Object.create(test);
      test2.a = 2;

      expect(Object.count(test2)).to.be.equal(1);
    });
  });

  describe('#values', function () {
    it('Returns array of values generated from given object values', function() {
      var test = {
        a: 1,
        b: 2,
        c: 3
      };

      expect(Object.values(test)).to.be.deep.equal([1, 2, 3]);
    });
  });

  describe('#assign', function () {
    it('Extends existing object with given couple', function() {
      var test = {
        a: 1
      };
      var ext1 = {
        b: 3
      };
      var ext2 = {
        a: 3,
        c: 7
      };

      Object.assign(test, ext1, ext2);
      expect(test).to.be.deep.equal({
        a: 3,
        b: 3,
        c: 7
      });
    });

    it('Overwrites nested non-primitive properties', function() {
      var test = {
        a: {
          say: 'yolo'
        },
        c: {
          test: true
        }
      };
      var ext1 = {
        b: [0]
      };
      var ext2 = {
        a: {
          say: 'hello'
        },
        b: [1]
      };

      Object.assign(test, ext1, ext2);
      expect(test).to.be.deep.equal({
        a: {
          say: 'hello'
        },
        b: [1],
        c: {
          test: true
        }
      });
    });

    it('Executes correctly if one of given arguments is null or undefined', function() {
      var test = {
        a: 0
      };
      var ext1 = {
        a: 1
      };
      var ext2 = {
        b: 2
      };

      Object.assign(test, null, ext1, undefined, ext2);
      expect(test).to.be.deep.equal({
        a: 1,
        b: 2
      });
    });
  });

  describe('#deepAssign', function () {
    it('Extends existing object with given couple', function() {
      var test = {
        a: 1
      };
      var ext1 = {
        b: 3
      };
      var ext2 = {
        a: 3,
        c: 7
      };

      Object.deepAssign(test, ext1, ext2);
      expect(test).to.be.deep.equal({
        a: 3,
        b: 3,
        c: 7
      });
    });

    it('Extends nested non-primitive properties', function() {
      var test = {
        a: {
          say: 'yolo',
          test: true
        },
        c: {
          test: true
        }
      };
      var ext1 = {
        b: [0, -1, 3],
        c: {
          extra: 'stuff'
        }
      };
      var ext2 = {
        a: {
          say: 'hello'
        },
        b: [1, 2]
      };

      Object.deepAssign(test, ext1, ext2);
      expect(test).to.be.deep.equal({
        a: {
          say: 'hello',
          test: true
        },
        b: [1, 2, 3],
        c: {
          test: true,
          extra: 'stuff'
        }
      });
    });

    it('Executes correctly if one of given arguments is null or undefined', function() {
      var test = {
        a: 0,
        x: {
          a: 0
        }
      };
      var ext1 = {
        a: 1,
        x: {
          a: 1
        }
      };
      var ext2 = {
        b: 2,
        x: {
          b: 2
        }
      };

      Object.deepAssign(test, null, ext1, undefined, ext2);
      expect(test).to.be.deep.equal({
        a: 1,
        b: 2,
        x: {
          a: 1,
          b: 2
        }
      });
    });
  });
});

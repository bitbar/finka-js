// Prepare chai
import {expect} from 'chai';

describe('FileSize', function () {

  describe('static constants', function () {
    it('B', function() {
      expect(FileSize.B).to.be.equal(1);
    });

    it('KB', function() {
      expect(FileSize.KB).to.be.equal(Math.pow(2, 10));
    });

    it('MB', function() {
      expect(FileSize.MB).to.be.equal(Math.pow(2, 20));
    });

    it('GB', function() {
      expect(FileSize.GB).to.be.equal(Math.pow(2, 30));
    });

    it('TB', function() {
      expect(FileSize.TB).to.be.equal(Math.pow(2, 40));
    });

    it('EB', function() {
      expect(FileSize.EB).to.be.equal(Math.pow(2, 50));
    });
  });

  describe('#getReadableString', function () {
    it('Returns readable string for 999B', function() {
      expect(FileSize.getReadableString(999)).to.be.equal('999B');
    });

    it('Returns readable string for 1000B', function() {
      expect(FileSize.getReadableString(1000)).to.be.equal('1.0KB');
    });

    it('Returns readable string for 1024B', function() {
      expect(FileSize.getReadableString(1024)).to.be.equal('1.0KB');
    });

    it('Returns readable string for 10240B', function() {
      expect(FileSize.getReadableString(10240)).to.be.equal('10.0KB');
    });

    it('Returns readable string for 102400B', function() {
      expect(FileSize.getReadableString(102400)).to.be.equal('100.0KB');
    });

    it('Returns readable string for 1024000B', function() {
      expect(FileSize.getReadableString(1024000)).to.be.equal('1.0MB');
    });
  });

  describe('constructor', function () {
    const test = new FileSize(2222);

    it('Returns instance', function() {
      expect(test).to.be.instanceOf(FileSize);
    });

    describe('instance', function() {
      it('Has property bytes', function() {
        expect(test).to.have.property('bytes', 2222);
      });

      it('Has method toReadableString', function() {
        expect(test).to.have.property('toReadableString');
        expect(test.toReadableString()).to.be.equal('2.2KB');
      });
    });
  });
});

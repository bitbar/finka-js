// Prepare chai
const chai = require('chai');
const expect = chai.expect;

require('../dist/finka');

// Array
describe('Array', function () {

  describe('#sortArrayOfObjects', function () {
    var test = [{
      a: 1,
      b: 0
    }, {
      a: 4,
      b: 2
    }, {
      a: 3,
      b: 1
    }, {
      a: 2,
      b: -1
    }];

    it('Sort ascending', function() {
      Array.sortArrayOfObjects(test, 'a');
      expect(test).to.deep.equal([{
        a: 1,
        b: 0
      }, {
        a: 2,
        b: -1
      }, {
        a: 3,
        b: 1
      }, {
        a: 4,
        b: 2
      }]);
    });

    it('Sort descending', function() {
      Array.sortArrayOfObjects(test, 'b', true);
      expect(test).to.deep.equal([{
        a: 4,
        b: 2
      }, {
        a: 3,
        b: 1
      }, {
        a: 1,
        b: 0
      }, {
        a: 2,
        b: -1
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


// Boolean
describe('Boolean', function () {

  describe('#xor', function () {
    it('0 xor 0 = 0', function() {
      expect(Boolean.xor(false, false)).to.be.false;
    });

    it('1 xor 0 = 1', function() {
      expect(Boolean.xor(true, false)).to.be.true;
    });

    it('0 xor 1 = 1', function() {
      expect(Boolean.xor(false, true)).to.be.true;
    });

    it('1 xor 1 = 0', function() {
      expect(Boolean.xor(true, true)).to.be.false;
    });
  });
});


// Date
describe('Date', function () {
  var day = 86400000;

  describe('static constants', function () {
    it('SECOND', function() {
      expect(Date.SECOND).to.be.equal(1000);
    });

    it('MINUTE', function() {
      expect(Date.MINUTE).to.be.equal(60000);
    });

    it('HOUR', function() {
      expect(Date.HOUR).to.be.equal(3600000);
    });

    it('DAY', function() {
      expect(Date.DAY).to.be.equal(day);
    });

    it('WEEK', function() {
      expect(Date.WEEK).to.be.equal(604800000);
    });
  });

  describe('static getters', function () {
    var now = Date.now();
    var today = day * Math.floor(now / day);

    it('TODAY', function() {
      expect(Date.TODAY).to.be.equal(today);
    });

    it('YESTERDAY', function() {
      expect(Date.YESTERDAY).to.be.equal(today - day);
    });

    it('TOMORROW', function() {
      expect(Date.TOMORROW).to.be.equal(today + day);
    });

    it('DAYAFTERTOMORROW', function() {
      expect(Date.DAYAFTERTOMORROW).to.be.equal(today + 2 * day);
    });
  });

  describe('#daysFromNow', function () {
    it('Returns proper timestamp', function() {
      expect(Date.daysFromNow(1)).to.be.equal(Date.now() + day);
    });
  });

  describe('#getLocalDateFormat', function () {
    it('Returns MDY for US', function() {
      global.userCountry = 'US';
      expect(Date.getLocalDateFormat()).to.be.equal('mm/dd/yyyy');
    });

    it('Returns YMD for JP', function() {
      global.userCountry = 'JP';
      expect(Date.getLocalDateFormat()).to.be.equal('yyyy-mm-dd');
    });

    it('Returns DMY for PL', function() {
      global.userCountry = 'PL';
      expect(Date.getLocalDateFormat()).to.be.equal('dd.mm.yyyy');
    });

    // clear
    global.userCountry = undefined;
  });

  describe('#getTimezoneName', function () {
    it('Returns proper timezone', function() {
      var timezone = new Date().toString().match(/\(([^)]+)\)$/)[1];
      expect(Date.getTimezoneName()).to.be.equal(timezone);
    });
  });

  describe('#getHms', function () {
    it('Returns proper object', function() {
      expect(Date.getHms(3723004)).to.be.deep.equal({
        h: 1,
        m: 2,
        s: 3,
        ms: 4
      });
    });
  });

  describe('#toHmsFormat', function () {
    it('Returns proper string for default accuracy', function() {
      expect(Date.toHmsFormat(3723004)).to.be.equal('1h 2m 3s');
    });

    it('Returns proper string for hours accuracy', function() {
      expect(Date.toHmsFormat(3723004, 'hours')).to.be.equal('1h');
    });

    it('Returns proper string for minutes accuracy', function() {
      expect(Date.toHmsFormat(3723004, 'minutes')).to.be.equal('1h 2m');
    });

    it('Returns proper string for seconds accuracy', function() {
      expect(Date.toHmsFormat(3723004, 'seconds')).to.be.equal('1h 2m 3s');
    });
  });

  describe('#toStopwatchFormat', function () {
    it('Returns proper string', function() {
      expect(Date.toStopwatchFormat(3723004)).to.be.equal('01:02:03.0');
    });
  });
  
  describe('#toTimerFormat', function () {
    it('Returns proper string', function() {
      expect(Date.toTimerFormat(3723004)).to.be.equal('01:02:03');
    });
  });

  describe('.daysPassed', function () {
    it('Returns proper number', function() {
      var date1 = new Date(612622800000);
      var date2 = new Date(1307224800000);
      expect(date1.daysPassed(date2)).to.be.equal(8039);
    });
  });
  
  describe('.toCustomDate', function () {
    it('Returns proper string', function() {
      var test = new Date(612622800000);
      expect(test.toCustomDate('d~m~y')).to.be.equal('31~05~1989');
    });
  });

  describe('.toUiTime', function () {
    it('Returns proper string', function() {
      var test = new Date(1989, 4, 31, 21, 11, 1);
      expect(test.toUiTime()).to.be.equal('21:11:01');
    });
  });

  describe('.toUiDate', function () {
    it('Returns proper string', function() {
      global.userCountry = 'PL';
      var test = new Date(1989, 4, 31, 21, 11, 1);
      expect(test.toUiDate()).to.be.equal('31.05.1989');
      global.userCountry = undefined;
    });
  });

  describe('.toUiDateTime', function () {
    it('Returns proper string', function() {
      global.userCountry = 'PL';
      var test = new Date(1989, 4, 31, 21, 11, 1);
      expect(test.toUiDateTime()).to.be.equal('31.05.1989 21:11:01');
      global.userCountry = undefined;
    });
  });

  describe('.toInputTimeFormat', function () {
    it('Returns proper string', function() {
      var test = new Date(1989, 4, 31, 21, 11, 1);
      expect(test.toInputTimeFormat()).to.be.equal('21:11');
    });
  });

  describe('.toInputDateFormat', function () {
    it('Returns proper string', function() {
      var test = new Date(1989, 4, 31, 21, 11, 1);
      expect(test.toInputDateFormat()).to.be.equal('1989-05-31');
    });
  });
  
  describe('.addTime', function () {
    it('Returns proper timestamp', function() {
      var test = new Date(612622800000);
      expect(test.addTime(694602000000)).to.be.equal(1307224800000);
    });
  });
  
});

// Prepare chai
const chai = require('chai');
const expect = chai.expect;

describe('Date', function () {
  var day = 24 * 60 * 60 * 1000;

  describe('static constants', function () {
    it('SECOND', function() {
      expect(Date.SECOND).to.be.equal(1000);
    });

    it('MINUTE', function() {
      expect(Date.MINUTE).to.be.equal(60 * 1000);
    });

    it('HOUR', function() {
      expect(Date.HOUR).to.be.equal(60 * 60 * 1000);
    });

    it('DAY', function() {
      expect(Date.DAY).to.be.equal(day);
    });

    it('WEEK', function() {
      expect(Date.WEEK).to.be.equal(7 * 24 * 60 * 60 * 1000);
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

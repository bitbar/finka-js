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

  describe('#parseValue', function () {
    it('Supports "today" string', function() {
      var test = Date.parseValue('today');
      expect(test.getTime()).to.be.equal(Date.TODAY);
    });

    it('Supports "yesterday" string', function() {
      var test = Date.parseValue('yesterday');
      expect(test.getTime()).to.be.equal(Date.YESTERDAY);
    });

    it('Supports "tomorrow" string', function() {
      var test = Date.parseValue('tomorrow');
      expect(test.getTime()).to.be.equal(Date.TOMORROW);
    });

    it('Supports "dayaftertomorrow" string', function() {
      var test = Date.parseValue('dayaftertomorrow');
      expect(test.getTime()).to.be.equal(Date.DAYAFTERTOMORROW);
    });

    it('Supports "now" string', function() {
      var expected = Date.now();
      var test = Date.parseValue('now');
      expect(test.getTime()).to.be.within(expected, expected + 1);
    });

    it('Throws error when unsupported string', function() {
      var str = 'my birthday';
      expect(Date.parseValue.bind(Date, str)).to.throw('Unsupported string: ' + str);
    });

    it('Supports numbers', function() {
      var test = Date.parseValue(612622800000);
      expect(test.getTime()).to.be.equal(612622800000);
    });

    it('Supports Date (clones it)', function() {
      var expected = new Date();
      var test = Date.parseValue(expected);
      expect(test.getTime()).to.be.equal(expected.getTime());
      expect(test).to.not.be.equal(expected);
    });

    it('Throws error when unsupported value', function() {
      var test = [];
      expect(Date.parseValue.bind(Date, test)).to.throw(TypeError, 'Unsupported value type');
    });
  });

  describe('#daysFromNow', function () {
    it('Returns proper timestamp', function() {
      var expected = Date.now() + day;
      var test = Date.daysFromNow(1);
      expect(test).to.be.within(expected, expected + 1);
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

    it('Returns MDY for default country', function() {
      global.userCountry = undefined;
      expect(Date.getLocalDateFormat()).to.be.equal('mm/dd/yyyy');
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

    it('Throws Error when unsupported accuracy given', function() {
      expect(Date.toHmsFormat.bind(Date, 3723004, 'meters')).to.throw(TypeError, 'Unknown accuracy');
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
    var date1 = new Date(612622800000);

    it('Supports comparison to Date instance', function() {
      var date2 = new Date(1307224800000);
      expect(date1.daysPassed(date2)).to.be.equal(8039);
    });

    it('Supports comparison to Number (Timestamp)', function() {
      var date2 = 1307224800000;
      expect(date1.daysPassed(date2)).to.be.equal(8039);
    });

    it('Supports comparison to String', function() {
      var date2 = '2011-06-04T22:00:00.000Z';
      expect(date1.daysPassed(date2)).to.be.equal(8039);
    });

    it('Supports not giving any param - setting current Date', function() {
      expect(new Date().daysPassed()).to.be.equal(0);
    });

    it('Throws Error when giving unsupported param', function() {
      expect(date1.daysPassed.bind(date1, [])).to.throw(TypeError, 'toDate is not instance of Date');
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

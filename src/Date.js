/**
 * @namespace Date
 */

var DATE_LOCAL_FORMAT_YMD = ['AF', 'CN', 'HU', 'JP', 'KP', 'KR', 'LT', 'MN', 'TW'];
var DATE_LOCAL_FORMAT_MDY = ['BZ', 'FM', 'US'];

/**
 * Second in milliseconds
 *
 * @constant
 * @type {number}
 */
Date.SECOND = 1000;

/**
 * Minute in milliseconds
 *
 * @constant
 * @type {number}
 */
Date.MINUTE = 60 * Date.SECOND;

/**
 * Hour in milliseconds
 *
 * @constant
 * @type {number}
 */
Date.HOUR = 60 * Date.MINUTE;

/**
 * Day in milliseconds
 *
 * @constant
 * @type {number}
 */
Date.DAY = 24 * Date.HOUR;

/**
 * Week in milliseconds
 *
 * @constant
 * @type {number}
 */
Date.WEEK = 7 * Date.DAY;

/**
 * Today in milliseconds
 *
 * @constant
 * @type {number}
 */
Date.TODAY = Date.HOUR * Math.floor( Date.now() / Date.HOUR );

/**
 * Yesterday in milliseconds
 *
 * @constant
 * @type {number}
 */
Date.YESTERDAY = Date.TODAY - Date.DAY;

/**
 * Tomorrow in milliseconds
 *
 * @constant
 * @type {number}
 */
Date.TOMORROW = Date.TODAY + Date.DAY;

/**
 * Day after tomorrow in milliseconds
 *
 * @constant
 * @type {number}
 */
Date.DAYAFTERTOMORROW = Date.TOMORROW + Date.DAY;

/**
 * Return timestamp of now + days
 *
 * @param {number} days Number of days difference
 * @returns {number} Timestamp
 */
Date.daysFromNow = function(days) {
  return Date.now() + Date.DAY * days;
};

/**
 * Get local date format
 *
 * @param {boolean} [fullFormat=true] Flag if it should be full date format like dd.mm.yyyy instead d.m.y
 * @returns {string} Local date format
 */
Date.getLocalDateFormat = function(fullFormat) {
  var countryCode, format;

  if(typeof fullFormat == 'undefined') {
    fullFormat = true;
  }

  try {
    countryCode = getCountry() || 'US';
  } catch(e) {
    countryCode = 'US';
  }

  if(DATE_LOCAL_FORMAT_YMD.indexOf(countryCode) >= 0) {
    format = 'y-m-d';
  } else if(DATE_LOCAL_FORMAT_MDY.indexOf(countryCode) >= 0) {
    format = 'm/d/y';
  } else {
    format = 'd.m.y';
  }

  if(fullFormat == true) {
    format = format.replace('d', 'dd');
    format = format.replace('m', 'mm');
    format = format.replace('y', 'yyyy');
  }

  return format;
};

/**
 * Get timezone name
 *
 * @returns {string} Timezone
 */
Date.getTimezoneName = function() {
  return new this().toString().match(/\(([^)]+)\)$/)[1];
};

/**
 * Returns object with time parts
 *
 * @example
 * // returns { h: 0, m: 1, s: 1, ms: 500 }
 * Date.getHms(61500)
 * @param {number} time Time to be used
 * @returns {Object} Time in stopwatch format
 */
Date.getHms = function(time) {
  var obj = {
    h: 0,
    m: 0,
    s: 0,
    ms: 0
  };

  obj.ms = Math.max(0, time % 1000);
  time -= obj.ms;

  time /= 1000;
  obj.s = Math.max(0, time % 60);
  time -= obj.s;

  time /= 60;
  obj.m = Math.max(0, time % 60);
  time -= obj.m;

  time /= 60;
  obj.h = Math.max(0, time);

  return obj;
};

/**
 * Returns given time (in milliseconds) in HMS format
 *
 * @example
 * // returns '1m 5s'
 * Date.toHmsFormat(61500)
 * @param {number} time Time to be converted
 * @param {string} [accuracy=seconds] Accuracy
 * @returns {string} Time in HMS format
 */
Date.toHmsFormat = function(time, accuracy) {
  if(typeof accuracy == 'undefined') {
    accuracy = 'seconds';
  }

  var obj = Date.getHms(time);
  var ret = [];

  switch(accuracy) {
    case 'hours':
      ret.push(obj.h + 'h');
      break;

    case 'minutes':
      if(obj.h > 0) {
        ret.push(obj.h + 'h');
      }

      ret.push(obj.m + 'm');
      break;

    case 'seconds':
      if(obj.h > 0) {
        ret.push(obj.h + 'h');
        ret.push(obj.m + 'm');
      } else if(obj.m > 0) {
        ret.push(obj.m + 'm');
      }

      ret.push(obj.s + 's');
      break;

    default:
      throw new TypeError('Unknown accuracy');
  }

  return ret.join(' ');
};

/**
 * Returns given time (in milliseconds) in stopwatch format - [HH:]MM:SS.XXX
 *
 * @example
 * // returns '01:01.5'
 * Date.toStopwatchFormat(61500)
 * @param {number} time Time to be converted
 * @returns {string} Time in stopwatch format
 */
Date.toStopwatchFormat = function(time) {
  var obj = Date.getHms(time);
  var ret = obj.m.pad(2) + ':' + obj.s.pad(2) + '.' + Math.floor(obj.ms / 100);

  if(obj.h > 0) {
    ret = obj.h.pad(2) + ':' + ret;
  }

  return ret;
};

/**
 * Returns given time (in milliseconds) in timer format - [HH:]MM:SS
 *
 * @example
 * // returns '01:01'
 * Date.toStopwatchFormat(61500)
 * @param {number} time Time to be converted
 * @returns {string} Time in timer format
 */
Date.toTimerFormat = function(time) {
  var obj = Date.getHms(time);
  var ret = obj.m.pad(2) + ':' + obj.s.pad(2);

  if(obj.h > 0) {
    ret = obj.h.pad(2) + ':' + ret;
  }

  return ret;
};

/**
 * Return number of days passed between this Date and given in argument
 *
 * @param {(Date|string|number)} [toDate=now] Proper date
 * @returns {number} Number of days passed
 */
Date.prototype.daysPassed = function(toDate) {
  if(typeof toDate == 'undefined') {
    toDate = new Date();
  } else if(typeof toDate == 'number' || typeof toDate == 'string') {
    toDate = new Date(toDate);
  }

  if(!(toDate instanceof Date)) {
    throw new TypeError('toDate is not instance of Date');
  }

  return Math.floor(Math.abs((this.getTime() - toDate.getTime()) / Date.DAY));
};

/**
 * Returns this Date in custom date format
 *
 * @param {string} format String representing date format
 * @returns {string} Date string
 */
Date.prototype.toCustomDate = function(format) {
  format = format.replace('d', this.getDate().pad(2));
  format = format.replace('m', (this.getMonth() + 1).pad(2));
  format = format.replace('y', this.getFullYear());

  return format;
};

/**
 * Returns this Date in UI time string
 *
 * @param {boolean} [showSeconds=true] Flag if seconds also should be returned
 * @returns {string} Time string
 */
Date.prototype.toUiTime = function(showSeconds) {
  if(typeof showSeconds == 'undefined') {
    showSeconds = true;
  }

  if(showSeconds) {
    showSeconds = ':' + this.getSeconds().pad(2);
  } else {
    showSeconds = '';
  }

  return this.getHours().pad(2) + ':' + this.getMinutes().pad(2) + showSeconds;
};

/**
 * Returns this Date in UI date string
 *
 * @see Date#getLocalDateFormat
 * @returns {string} Date string
 */
Date.prototype.toUiDate = function() {
  return this.toCustomDate(Date.getLocalDateFormat(false));
};

/**
 * Returns this Date in UI datetime string
 *
 * @param {boolean} [showSeconds=true] Flag if seconds also should be returned
 * @returns {string} Time string
 */
Date.prototype.toUiDateTime = function(showSeconds) {
  return this.toUiDate() + ' ' + this.toUiTime(showSeconds);
};

/**
 * Returns this Date in form inputs time string
 *
 * @returns {string} Time string
 */
Date.prototype.toInputTimeFormat = function() {
  return this.toUiTime(false);
};

/**
 * Returns this Date in forms input date string
 *
 * @returns {string} Date string
 */
Date.prototype.toInputDateFormat = function() {
  return this.toCustomDate('y-m-d');
};

/**
 * Add time to this Date
 *
 * @param {number} time Time to add
 * @returns {number} New timestamp of this Date
 */
Date.prototype.addTime = function(time) {
  return this.setTime(this.getTime() + time );
};

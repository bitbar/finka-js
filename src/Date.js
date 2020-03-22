/**
 * @namespace Date
 */

var LOCAL_FORMAT_YMD = ['AF', 'CN', 'HU', 'JP', 'KP', 'KR', 'LT', 'MN', 'TW'];
var LOCAL_FORMAT_MDY = ['BZ', 'FM', 'US'];

/**
 * Second in milliseconds
 *
 * @memberof Date
 * @constant
 * @type {number}
 */
var SECOND = 1000;

/**
 * Minute in milliseconds
 *
 * @memberof Date
 * @constant
 * @type {number}
 */
var MINUTE = 60 * SECOND;

/**
 * Hour in milliseconds
 *
 * @memberof Date
 * @constant
 * @type {number}
 */
var HOUR = 60 * MINUTE;

/**
 * Day in milliseconds
 *
 * @memberof Date
 * @constant
 * @type {number}
 */
var DAY = 24 * HOUR;

/**
 * Week in milliseconds
 *
 * @memberof Date
 * @constant
 * @type {number}
 */
var WEEK = 7 * DAY;

/**
 * Today in milliseconds
 *
 * @memberof Date
 * @constant
 * @type {number}
 */
function TODAY() {
  return DAY * Math.floor( Date.now() / DAY );
}

/**
 * Yesterday in milliseconds
 *
 * @memberof Date
 * @constant
 * @type {number}
 */
function YESTERDAY() {
  return Date.TODAY - DAY;
}

/**
 * Tomorrow in milliseconds
 *
 * @memberof Date
 * @constant
 * @type {number}
 */
function TOMORROW() {
  return Date.TODAY + DAY;
}

/**
 * Day after tomorrow in milliseconds
 *
 * @memberof Date
 * @constant
 * @type {number}
 */
function DAYAFTERTOMORROW() {
  return Date.TOMORROW + DAY;
}

/**
 * Return new Date instance from given value
 *
 * It's simmilar to native Date.parse, but you can use such strings like:
 * 'today', 'yesterday', 'tomorrow', 'dayaftertomorrow', 'now'
 *
 * Feel free to contribute if you think that this method should support even more!
 *
 * @memberof Date
 * @param {*} value Value to be parsed
 * @throws Will throw an error if the value is not supported.
 * @returns {Date} New Date
 */
function parseValue(value) {
  var type = typeof value;
  if(type === 'string') {
    switch(value.toLowerCase()) {
    case 'today' :
      return new Date(Date.TODAY);

    case 'yesterday' :
      return new Date(Date.YESTERDAY);

    case 'tomorrow' :
      return new Date(Date.TOMORROW);

    case 'dayaftertomorrow' :
      return new Date(Date.DAYAFTERTOMORROW);

    case 'now' :
      return new Date();

    default :
      throw new Error('Unsupported string: ' + value);
    }
  } else if(type === 'number' || value instanceof Date) {
    return new Date(value);
  } else {
    throw new TypeError('Unsupported value type');
  }
}

/**
 * Return timestamp of now + days
 *
 * @memberof Date
 * @param {number} days Number of days difference
 * @returns {number} Timestamp
 */
function daysFromNow(days) {
  return Date.now() + Date.DAY * days;
}

/**
 * Get local date format
 *
 * @memberof Date
 * @param {boolean} [fullFormat=true] Flag if it should be full date format like dd.mm.yyyy instead d.m.y
 * @returns {string} Local date format
 */
function getLocalDateFormat(fullFormat) {
  var countryCode, format;

  if(typeof fullFormat === 'undefined') {
    fullFormat = true;
  }

  countryCode = global.getCountry() || 'US';

  if(LOCAL_FORMAT_YMD.indexOf(countryCode) >= 0) {
    format = 'y-m-d';
  } else if(LOCAL_FORMAT_MDY.indexOf(countryCode) >= 0) {
    format = 'm/d/y';
  } else {
    format = 'd.m.y';
  }

  if(fullFormat) {
    format = format.replace('d', 'dd');
    format = format.replace('m', 'mm');
    format = format.replace('y', 'yyyy');
  }

  return format;
}

/**
 * Get timezone name
 *
 * @memberof Date
 * @returns {string} Timezone
 */
function getTimezoneName() {
  return new this().toString().match(/\(([^)]+)\)$/)[1];
}

/**
 * Returns object with time parts
 *
 * @memberof Date
 * @example
 * // returns { h: 0, m: 1, s: 1, ms: 500 }
 * Date.getHms(61500)
 * @param {number} time Time to be used
 * @returns {Object} Time in stopwatch format
 */
function getHms(time) {
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
}

/**
 * Returns given time (in milliseconds) in HMS format
 *
 * @memberof Date
 * @example
 * // returns '1m 5s'
 * Date.toHmsFormat(61500)
 * @param {number} time Time to be converted
 * @param {string} [accuracy=seconds] Accuracy
 * @returns {string} Time in HMS format
 */
function toHmsFormat(time, accuracy) {
  if(typeof accuracy === 'undefined') {
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
    }
    if(obj.m > 0) {
      ret.push(obj.m + 'm');
    }

    ret.push(obj.s + 's');
    break;

  default:
    throw new TypeError('Unknown accuracy');
  }

  return ret.join(' ');
}

/**
 * Returns given time (in milliseconds) in stopwatch format - [HH:]MM:SS.XXX
 *
 * @memberof Date
 * @example
 * // returns '01:01.5'
 * Date.toStopwatchFormat(61500)
 * @param {number} time Time to be converted
 * @returns {string} Time in stopwatch format
 */
function toStopwatchFormat(time) {
  var obj = Date.getHms(time);
  var ret = obj.m.pad(2) + ':' + obj.s.pad(2) + '.' + Math.floor(obj.ms / 100);

  if(obj.h > 0) {
    ret = obj.h.pad(2) + ':' + ret;
  }

  return ret;
}

/**
 * Returns given time (in milliseconds) in timer format - [HH:]MM:SS
 *
 * @memberof Date
 * @example
 * // returns '01:01'
 * Date.toStopwatchFormat(61500)
 * @param {number} time Time to be converted
 * @returns {string} Time in timer format
 */
function toTimerFormat(time) {
  var obj = Date.getHms(time);
  var ret = obj.m.pad(2) + ':' + obj.s.pad(2);

  if(obj.h > 0) {
    ret = obj.h.pad(2) + ':' + ret;
  }

  return ret;
}

/**
 * Return number of days passed between this Date and given in argument
 *
 * @memberof Date.prototype
 * @param {(Date|string|number)} [toDate=now] Proper date
 * @returns {number} Number of days passed
 */
function daysPassed(toDate) {
  var toDateType = typeof toDate;
  if(toDateType === 'undefined') {
    toDate = new Date();
  } else if(toDateType === 'number' || toDateType === 'string') {
    toDate = new Date(toDate);
  }

  if(!(toDate instanceof Date)) {
    throw new TypeError('toDate is not instance of Date');
  }

  return Math.floor(Math.abs((this.getTime() - toDate.getTime()) / Date.DAY));
}

/**
 * Returns this Date in custom date format
 *
 * @memberof Date.prototype
 * @param {string} format String representing date format
 * @returns {string} Date string
 */
function toCustomDate(format) {
  format = format.replace('d', this.getDate().pad(2));
  format = format.replace('m', (this.getMonth() + 1).pad(2));
  format = format.replace('y', this.getFullYear());

  return format;
}

/**
 * Returns this Date in UI time string
 *
 * @memberof Date.prototype
 * @param {boolean} [showSeconds=true] Flag if seconds also should be returned
 * @returns {string} Time string
 */
function toUiTime(showSeconds) {
  if(typeof showSeconds === 'undefined') {
    showSeconds = true;
  }

  if(showSeconds) {
    showSeconds = ':' + this.getSeconds().pad(2);
  } else {
    showSeconds = '';
  }

  return this.getHours().pad(2) + ':' + this.getMinutes().pad(2) + showSeconds;
}

/**
 * Returns this Date in UI date string
 *
 * @memberof Date.prototype
 * @see Date#getLocalDateFormat
 * @returns {string} Date string
 */
function toUiDate() {
  return this.toCustomDate(Date.getLocalDateFormat(false));
}

/**
 * Returns this Date in UI datetime string
 *
 * @memberof Date.prototype
 * @param {boolean} [showSeconds=true] Flag if seconds also should be returned
 * @returns {string} Time string
 */
function toUiDateTime(showSeconds) {
  return this.toUiDate() + ' ' + this.toUiTime(showSeconds);
}

/**
 * Returns this Date in form inputs time string
 *
 * @memberof Date.prototype
 * @returns {string} Time string
 */
function toInputTimeFormat() {
  return this.toUiTime(false);
}

/**
 * Returns this Date in forms input date string
 *
 * @memberof Date.prototype
 * @returns {string} Date string
 */
function toInputDateFormat() {
  return this.toCustomDate('y-m-d');
}

/**
 * Add time to this Date
 *
 * @memberof Date.prototype
 * @param {number} time Time to add
 * @returns {number} New timestamp of this Date
 */
function addTime(time) {
  return this.setTime(this.getTime() + time );
}


module.exports = {
  constant: {
    SECOND,
    MINUTE,
    HOUR,
    DAY,
    WEEK
  },

  getter: {
    TODAY,
    YESTERDAY,
    TOMORROW,
    DAYAFTERTOMORROW
  },

  static: {
    parseValue,
    daysFromNow,
    getLocalDateFormat,
    getTimezoneName,
    getHms,
    toHmsFormat,
    toStopwatchFormat,
    toTimerFormat
  },

  method: {
    daysPassed,
    toCustomDate,
    toUiTime,
    toUiDate,
    toUiDateTime,
    toInputTimeFormat,
    toInputDateFormat,
    addTime
  }
};

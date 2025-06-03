/* Finka.js v3.0.3 |  Copyright 2025 (c) Smartbear Software and contributors | https://github.com/bitbar/finka-js/blob/master/LICENSE.md */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.finka = factory());
})(this, (function () { 'use strict';

  var add32 = function add32(a, b) {
    return a + b & 0xFFFFFFFF;
  };
  function md5cycle(x, k) {
    var a = x[0],
      b = x[1],
      c = x[2],
      d = x[3];
    a = ff(a, b, c, d, k[0], 7, -680876936);
    d = ff(d, a, b, c, k[1], 12, -389564586);
    c = ff(c, d, a, b, k[2], 17, 606105819);
    b = ff(b, c, d, a, k[3], 22, -1044525330);
    a = ff(a, b, c, d, k[4], 7, -176418897);
    d = ff(d, a, b, c, k[5], 12, 1200080426);
    c = ff(c, d, a, b, k[6], 17, -1473231341);
    b = ff(b, c, d, a, k[7], 22, -45705983);
    a = ff(a, b, c, d, k[8], 7, 1770035416);
    d = ff(d, a, b, c, k[9], 12, -1958414417);
    c = ff(c, d, a, b, k[10], 17, -42063);
    b = ff(b, c, d, a, k[11], 22, -1990404162);
    a = ff(a, b, c, d, k[12], 7, 1804603682);
    d = ff(d, a, b, c, k[13], 12, -40341101);
    c = ff(c, d, a, b, k[14], 17, -1502002290);
    b = ff(b, c, d, a, k[15], 22, 1236535329);
    a = gg(a, b, c, d, k[1], 5, -165796510);
    d = gg(d, a, b, c, k[6], 9, -1069501632);
    c = gg(c, d, a, b, k[11], 14, 643717713);
    b = gg(b, c, d, a, k[0], 20, -373897302);
    a = gg(a, b, c, d, k[5], 5, -701558691);
    d = gg(d, a, b, c, k[10], 9, 38016083);
    c = gg(c, d, a, b, k[15], 14, -660478335);
    b = gg(b, c, d, a, k[4], 20, -405537848);
    a = gg(a, b, c, d, k[9], 5, 568446438);
    d = gg(d, a, b, c, k[14], 9, -1019803690);
    c = gg(c, d, a, b, k[3], 14, -187363961);
    b = gg(b, c, d, a, k[8], 20, 1163531501);
    a = gg(a, b, c, d, k[13], 5, -1444681467);
    d = gg(d, a, b, c, k[2], 9, -51403784);
    c = gg(c, d, a, b, k[7], 14, 1735328473);
    b = gg(b, c, d, a, k[12], 20, -1926607734);
    a = hh(a, b, c, d, k[5], 4, -378558);
    d = hh(d, a, b, c, k[8], 11, -2022574463);
    c = hh(c, d, a, b, k[11], 16, 1839030562);
    b = hh(b, c, d, a, k[14], 23, -35309556);
    a = hh(a, b, c, d, k[1], 4, -1530992060);
    d = hh(d, a, b, c, k[4], 11, 1272893353);
    c = hh(c, d, a, b, k[7], 16, -155497632);
    b = hh(b, c, d, a, k[10], 23, -1094730640);
    a = hh(a, b, c, d, k[13], 4, 681279174);
    d = hh(d, a, b, c, k[0], 11, -358537222);
    c = hh(c, d, a, b, k[3], 16, -722521979);
    b = hh(b, c, d, a, k[6], 23, 76029189);
    a = hh(a, b, c, d, k[9], 4, -640364487);
    d = hh(d, a, b, c, k[12], 11, -421815835);
    c = hh(c, d, a, b, k[15], 16, 530742520);
    b = hh(b, c, d, a, k[2], 23, -995338651);
    a = ii(a, b, c, d, k[0], 6, -198630844);
    d = ii(d, a, b, c, k[7], 10, 1126891415);
    c = ii(c, d, a, b, k[14], 15, -1416354905);
    b = ii(b, c, d, a, k[5], 21, -57434055);
    a = ii(a, b, c, d, k[12], 6, 1700485571);
    d = ii(d, a, b, c, k[3], 10, -1894986606);
    c = ii(c, d, a, b, k[10], 15, -1051523);
    b = ii(b, c, d, a, k[1], 21, -2054922799);
    a = ii(a, b, c, d, k[8], 6, 1873313359);
    d = ii(d, a, b, c, k[15], 10, -30611744);
    c = ii(c, d, a, b, k[6], 15, -1560198380);
    b = ii(b, c, d, a, k[13], 21, 1309151649);
    a = ii(a, b, c, d, k[4], 6, -145523070);
    d = ii(d, a, b, c, k[11], 10, -1120210379);
    c = ii(c, d, a, b, k[2], 15, 718787259);
    b = ii(b, c, d, a, k[9], 21, -343485551);
    x[0] = add32(a, x[0]);
    x[1] = add32(b, x[1]);
    x[2] = add32(c, x[2]);
    x[3] = add32(d, x[3]);
  }
  function cmn(q, a, b, x, s, t) {
    a = add32(add32(a, q), add32(x, t));
    return add32(a << s | a >>> 32 - s, b);
  }
  function ff(a, b, c, d, x, s, t) {
    return cmn(b & c | ~b & d, a, b, x, s, t);
  }
  function gg(a, b, c, d, x, s, t) {
    return cmn(b & d | c & ~d, a, b, x, s, t);
  }
  function hh(a, b, c, d, x, s, t) {
    return cmn(b ^ c ^ d, a, b, x, s, t);
  }
  function ii(a, b, c, d, x, s, t) {
    return cmn(c ^ (b | ~d), a, b, x, s, t);
  }
  function md51(s) {
    var n = s.length,
      state = [1732584193, -271733879, -1732584194, 271733878],
      i;
    for (i = 64; i <= n; i += 64) {
      md5cycle(state, md5blk(s.substring(i - 64, i)));
    }
    s = s.substring(i - 64);
    var tail = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    for (i = 0; i < s.length; i++) {
      tail[i >> 2] |= s.charCodeAt(i) << (i % 4 << 3);
    }
    tail[i >> 2] |= 0x80 << (i % 4 << 3);
    if (i > 55) {
      md5cycle(state, tail);
      for (i = 0; i < 16; i++) {
        tail[i] = 0;
      }
    }
    tail[14] = n * 8;
    md5cycle(state, tail);
    return state;
  }
  function md5blk(s) {
    var md5blks = [],
      i;
    for (i = 0; i < 64; i += 4) {
      md5blks[i >> 2] = s.charCodeAt(i) + (s.charCodeAt(i + 1) << 8) + (s.charCodeAt(i + 2) << 16) + (s.charCodeAt(i + 3) << 24);
    }
    return md5blks;
  }
  var hex_chr = '0123456789abcdef'.split('');
  function rhex(n) {
    var s = '',
      j = 0;
    for (; j < 4; j++) {
      s += hex_chr[n >> j * 8 + 4 & 0x0F] + hex_chr[n >> j * 8 & 0x0F];
    }
    return s;
  }
  function hex(x) {
    for (var i = 0; i < x.length; i++) {
      x[i] = rhex(x[i]);
    }
    return x.join('');
  }
  function md5(s) {
    return hex(md51(s));
  }

  /**
   * Flag if environment is Node JS
   *
   * @global
   * @type {boolean}
   */
  var isNodeJs = global.process && global.process.release && global.process.release.name === 'node';

  /**
   * Get ISO 639-1 language string
   *
   * @global
   * @returns {string} ISO 639-1 language string
   */
  function getLanguage() {
    var lang;
    if (global.isNodeJs) {
      lang = process.env.LANGUAGE || process.env.LANG;
    } else {
      lang = navigator.language || navigator.languages && navigator.languages[0];
    }
    lang = lang.substr(0, 2);
    return lang;
  }

  /**
   * Tries to get country from language
   *
   * @global
   * @returns {(string|null)} Country code or null if it couldn't find
   */
  function getCountry() {
    if (typeof global.userCountry !== 'undefined') {
      return global.userCountry;
    }
    var country;
    if (global.isNodeJs) {
      country = process.env.LANG;
    } else {
      country = navigator.language;
      if (country.length < 3 && navigator.languages) {
        for (var i = 0; i < navigator.languages.length; i++) {
          if (navigator.languages[i].length > 2) {
            country = navigator.languages[i];
            break;
          }
        }
      }
    }
    var countryMatch = country.match(/^[a-z]{2}[_-]([A-Z]{2})/);
    if (countryMatch !== null) {
      country = countryMatch[1];
    }
    return country;
  }

  /**
   * Check if given argument is numeric
   *
   * @global
   * @param {*} n Subject of examination
   * @returns {boolean} Verdict
   */
  function isNumeric(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
  }

  /**
   * Parse value to proper type
   *
   * @global
   * @param {*} value Value to be parsed
   * @returns {number|boolean|object} Parsed value
   */
  function parseValue$1(value) {
    // check if it's even a string
    if (typeof value !== 'string') {
      return value;
    }

    // check if it's number
    if (global.isNumeric(value)) {
      return parseFloat(value);
    }

    // check if it's a boolean
    var _value = value.toLowerCase();
    if (_value === 'true' || _value === 'false') {
      return _value === 'true';
    }

    // add more check here if you want

    // return not parsed value in the end
    return value;
  }
  var globalExt = {
    constant: {
      isNodeJs: isNodeJs
    },
    static: {
      getLanguage: getLanguage,
      getCountry: getCountry,
      isNumeric: isNumeric,
      parseValue: parseValue$1,
      md5: md5
    }
  };

  /**
   * @namespace Array
   */

  /**
   * Sort array of objects
   *
   * @memberof Array
   * @param {Object[]} arr Array of objects that should be sorted
   * @param {string} propertyName Name of property by which sorting will be done
   * @param [descending=false] {boolean} Flag to sort in descending order
   */
  function sortArrayOfObjects(arr, propertyName, descending) {
    var order = descending ? -1 : 1;
    var _a, _b;
    arr.sort(function (a, b) {
      _a = a[propertyName];
      _b = b[propertyName];
      if (typeof _a === 'string') {
        _a = _a.toLowerCase();
      }
      if (typeof _b === 'string') {
        _b = _b.toLowerCase();
      }
      if (_a > _b) {
        return order * 1;
      } else if (_a < _b) {
        return order * -1;
      }
      return 0;
    });
  }

  /**
   * Deep clone array of object
   *
   * @memberof Array
   * @param arr Array of objects
   * @returns {Object[]} Clone of arr
   */
  function deepCloneArrayOfObjects(arr) {
    return arr.map(function (obj) {
      return Object.assign({}, obj);
    });
  }

  /**
   * Wrap in Array if @param is not an Array already
   *
   * @memberof Array
   * @param {(*|Array)} something Something that should be an Array
   * @returns {Array}
   */
  function wrap(something) {
    return Array.isArray(something) ? something : [something];
  }

  /**
   * Checks is given value is Array and is empty
   *
   * @memberof Array
   * @param {Array} arr Something to check
   * @returns {boolean} Verdict
   */
  function isEmpty$1(arr) {
    return Array.isArray(arr) && arr.length === 0;
  }

  /**
   * Checks is given value is Array and is non-empty
   *
   * @memberof Array
   * @param {Array} arr Something to check
   * @returns {boolean} Verdict
   */
  function isNotEmpty$1(arr) {
    return Array.isArray(arr) && arr.length > 0;
  }

  /**
   * Checks is given value isn't Array or is empty
   *
   * @memberof Array
   * @param {Array} arr Something to check
   * @returns {boolean} Verdict
   */
  function isInvalidOrEmpty$1(arr) {
    return !Array.isArray(arr) || arr.length === 0;
  }

  /**
   * Empty this Array
   *
   * @memberof Array.prototype
   * @returns {Array} this
   */
  function empty() {
    this.length = 0;
    return this;
  }

  /**
   * Absorb (push) every item of given array to this Array
   *
   * @memberof Array.prototype
   * @param {Array} arr Array to be absorbed
   * @returns {Array} this
   */
  function absorb(arr) {
    this.push.apply(this, arr);
    return this;
  }

  /**
   * Returns the difference between this Array and given in argument
   *
   * @memberof Array.prototype
   * @param {Array} arr Array to compare
   * @returns {Array} Array with elements that are different
   */
  function diff(arr) {
    return this.filter(function (i) {
      return arr.indexOf(i) < 0;
    });
  }

  /**
   * Clone this Array
   *
   * @memberof Array.prototype
   * @returns {Array} Clone of this Array
   */
  function clone$1() {
    return Object.clone(this);
  }

  /**
   * Look for index of item matching to query
   *
   * @memberof Array.prototype
   * @param {Object} query Query
   * @returns {number} Index of matching index; -1 if not found
   */
  function lookFor(query) {
    for (var i = 0; i < this.length; i++) {
      if (Object.isLike(this[i], query)) {
        return i;
      }
    }
    return -1;
  }

  /**
   * Returns the new array based on current one by filtering according to query
   *
   * @memberof Array.prototype
   * @see Object#isLike
   * @param {Object} query Query
   * @returns {Array} New Array with matching elements
   */
  function filterLike(query) {
    if (typeof query === 'undefined') {
      return [];
    }
    return this.filter(function (item) {
      return Object.isLike(item, query);
    });
  }

  /**
   * Unique this Array - remove all duplicate items
   *
   * @memberof Array.prototype
   * @returns {Array} this
   */
  function unique() {
    for (var i = 0; i < this.length; ++i) {
      for (var j = i + 1; j < this.length; ++j) {
        if (this[i] === this[j]) {
          this.splice(j--, 1);
        }
      }
    }
    return this;
  }

  /**
   * Shuffle this Array
   *
   * @memberof Array.prototype
   * @returns {Array} this
   */
  function shuffle() {
    for (var i = this.length - 1; i > 0; i--) {
      var j = Math.floor(Math.rand() * (i + 1));
      var temp = this[i];
      this[i] = this[j];
      this[j] = temp;
    }
    return this;
  }
  var ArrayExt = {
    static: {
      sortArrayOfObjects: sortArrayOfObjects,
      deepCloneArrayOfObjects: deepCloneArrayOfObjects,
      wrap: wrap,
      isEmpty: isEmpty$1,
      isNotEmpty: isNotEmpty$1,
      isInvalidOrEmpty: isInvalidOrEmpty$1
    },
    method: {
      empty: empty,
      absorb: absorb,
      diff: diff,
      clone: clone$1,
      lookFor: lookFor,
      filterLike: filterLike,
      unique: unique,
      shuffle: shuffle
    }
  };

  /**
   * @namespace Boolean
   */

  /**
   * Returns result of logic XOR operation between a and b arguments
   *
   * @memberof Boolean
   * @param {boolean} a A
   * @param {boolean} b B
   * @returns {boolean} Result
   */
  function xor(a, b) {
    return !a !== !b;
  }
  var BooleanExt = {
    static: {
      xor: xor
    }
  };

  function _typeof(o) {
    "@babel/helpers - typeof";

    return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) {
      return typeof o;
    } : function (o) {
      return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o;
    }, _typeof(o);
  }

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
    return DAY * Math.floor(Date.now() / DAY);
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
   * @param {string|number|Date} value Value to be parsed
   * @throws Will throw an error if the value is not supported.
   * @returns {Date} New Date
   */
  function parseValue(value) {
    var type = _typeof(value);
    if (type === 'string') {
      switch (value.toLowerCase()) {
        case 'today':
          return new Date(Date.TODAY);
        case 'yesterday':
          return new Date(Date.YESTERDAY);
        case 'tomorrow':
          return new Date(Date.TOMORROW);
        case 'dayaftertomorrow':
          return new Date(Date.DAYAFTERTOMORROW);
        case 'now':
          return new Date();
        default:
          throw new Error('Unsupported string: ' + value);
      }
    } else if (type === 'number' || value instanceof Date) {
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
    if (typeof fullFormat === 'undefined') {
      fullFormat = true;
    }
    countryCode = global.getCountry() || 'US';
    if (LOCAL_FORMAT_YMD.indexOf(countryCode) >= 0) {
      format = 'y-m-d';
    } else if (LOCAL_FORMAT_MDY.indexOf(countryCode) >= 0) {
      format = 'm/d/y';
    } else {
      format = 'd.m.y';
    }
    if (fullFormat) {
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
    if (typeof accuracy === 'undefined') {
      accuracy = 'seconds';
    }
    var obj = Date.getHms(time);
    var ret = [];
    switch (accuracy) {
      case 'hours':
        ret.push(obj.h + 'h');
        break;
      case 'minutes':
        if (obj.h > 0) {
          ret.push(obj.h + 'h');
        }
        ret.push(obj.m + 'm');
        break;
      case 'seconds':
        if (obj.h > 0) {
          ret.push(obj.h + 'h');
        }
        if (obj.m > 0) {
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
    if (obj.h > 0) {
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
    if (obj.h > 0) {
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
    var toDateType = _typeof(toDate);
    if (toDateType === 'undefined') {
      toDate = new Date();
    } else if (toDateType === 'number' || toDateType === 'string') {
      toDate = new Date(toDate);
    }
    if (!(toDate instanceof Date)) {
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
  function toUiTime() {
    var showSeconds = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
    var seconds = showSeconds ? ":".concat(this.getSeconds().pad(2)) : '';
    return this.getHours().pad(2) + ':' + this.getMinutes().pad(2) + seconds;
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
  function toUiDateTime() {
    var showSeconds = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
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
    return this.setTime(this.getTime() + time);
  }
  var DateExt = {
    constant: {
      SECOND: SECOND,
      MINUTE: MINUTE,
      HOUR: HOUR,
      DAY: DAY,
      WEEK: WEEK
    },
    getter: {
      TODAY: TODAY,
      YESTERDAY: YESTERDAY,
      TOMORROW: TOMORROW,
      DAYAFTERTOMORROW: DAYAFTERTOMORROW
    },
    static: {
      parseValue: parseValue,
      daysFromNow: daysFromNow,
      getLocalDateFormat: getLocalDateFormat,
      getTimezoneName: getTimezoneName,
      getHms: getHms,
      toHmsFormat: toHmsFormat,
      toStopwatchFormat: toStopwatchFormat,
      toTimerFormat: toTimerFormat
    },
    method: {
      daysPassed: daysPassed,
      toCustomDate: toCustomDate,
      toUiTime: toUiTime,
      toUiDate: toUiDate,
      toUiDateTime: toUiDateTime,
      toInputTimeFormat: toInputTimeFormat,
      toInputDateFormat: toInputDateFormat,
      addTime: addTime
    }
  };

  /**
   * @namespace JSON
   */

  /**
   * Returns verdict if given string is valid JSON or not
   *
   * @memberof JSON
   * @param {string} str JSON string to be checked
   * @returns {boolean} Verdict
   */
  function isJSONString(str) {
    try {
      JSON.parse(str);
    } catch (_unused) {
      return false;
    }
    return true;
  }
  var JSONExt = {
    static: {
      isJSONString: isJSONString
    }
  };

  function Mash() {
    var n = 0xefc8249d;
    return function (data) {
      data = data.toString();
      for (var i = 0; i < data.length; i++) {
        n += data.charCodeAt(i);
        var h = 0.02519603282416938 * n;
        n = h >>> 0;
        h -= n;
        h *= n;
        n = h >>> 0;
        h -= n;
        n += h * 0x100000000; // 2^32
      }
      return (n >>> 0) * 2.3283064365386963e-10; // 2^-32
    };
  }
  function MRG32k3a() {
    var args = Array.prototype.slice.call(arguments);
    var m1 = 4294967087;
    var m2 = 4294944443;
    var s10 = 12345,
      s11 = 12345,
      s12 = 123,
      s20 = 12345,
      s21 = 12345,
      s22 = 123;
    if (args.length === 0) {
      args = [+new Date()];
    }
    var mash = Mash();
    for (var i = 0; i < args.length; i++) {
      s10 += mash(args[i]) * 0x100000000; // 2 ^ 32
      s11 += mash(args[i]) * 0x100000000;
      s12 += mash(args[i]) * 0x100000000;
      s20 += mash(args[i]) * 0x100000000;
      s21 += mash(args[i]) * 0x100000000;
      s22 += mash(args[i]) * 0x100000000;
    }
    s10 %= m1;
    s11 %= m1;
    s12 %= m1;
    s20 %= m2;
    s21 %= m2;
    s22 %= m2;
    mash = null;
    var uint32 = function uint32() {
      var m1 = 4294967087;
      var m2 = 4294944443;
      var a12 = 1403580;
      var a13n = 810728;
      var a21 = 527612;
      var a23n = 1370589;
      var k, p1, p2;
      p1 = a12 * s11 - a13n * s10;
      k = p1 / m1 | 0;
      p1 -= k * m1;
      if (p1 < 0) p1 += m1;
      s10 = s11;
      s11 = s12;
      s12 = p1;
      p2 = a21 * s22 - a23n * s20;
      k = p2 / m2 | 0;
      p2 -= k * m2;
      if (p2 < 0) p2 += m2;
      s20 = s21;
      s21 = s22;
      s22 = p2;
      if (p1 <= p2) return p1 - p2 + m1;else return p1 - p2;
    };
    return function () {
      return uint32() * 2.3283064365386963e-10; // 2^-32
    };
  }

  /**
   * @namespace Math
   */

  var _MRG32k3a = new MRG32k3a();

  /**
   * Better alternative to Math.random based on MRG32k2a algorithm
   *
   * @memberof Math
   * @see {@link http://www.iro.umontreal.ca/~lecuyer/myftp/papers/streams00.pdf|PDF paper about it}
   * @returns {number} Random float number between 0 and 1
   */
  function rand() {
    return _MRG32k3a();
  }

  /**
   * Polyfill for ECMAScript 2015 for Math.log10
   * https://www.ecma-international.org/ecma-262/6.0/#sec-math.log10
   *
   * @memberof Math
   * @param {number} x X
   * @returns {number} Result
   */
  function log10(x) {
    return Math.log(x) * Math.LOG10E;
  }

  /**
   * Round given number to given precision
   *
   * @memberof Math
   * @param {number} num Number to be rounded
   * @param {number} precision Precision
   */
  function roundTo(num, precision) {
    var magnitude = Math.pow(10, precision);
    return Math.round(num * magnitude) / magnitude;
  }

  /**
   * Calculate median of given array of numbers
   *
   * @memberof Math
   * @param {number[]} values Array of numbers
   * @returns {number} Median
   */
  function median(values) {
    if (values.length === 0) {
      return 0;
    }
    values.sort(function (a, b) {
      return a - b;
    });
    var half = Math.floor(values.length / 2);
    return values.length % 2 ? values[half] : (values[half - 1] + values[half]) / 2;
  }

  /**
   * Sum given array of numbers
   *
   * @memberof Math
   * @param {number[]} values Array of numbers
   * @returns {number} Sum
   */
  function sum(values) {
    if (values.length === 0) {
      return 0;
    }
    return values.reduce(function (a, b) {
      return a + b;
    });
  }

  /**
   * Calculate average of given array of numbers
   *
   * @memberof Math
   * @param {number[]} values Array of numbers
   * @returns {number} Average
   */
  function avg(values) {
    if (values.length === 0) {
      return 0;
    }
    return Math.sum(values) / values.length;
  }
  var MathExt = {
    static: {
      rand: rand,
      log10: log10,
      roundTo: roundTo,
      median: median,
      sum: sum,
      avg: avg
    }
  };

  /**
   * @namespace Number
   */

  /**
   * Check if given number is number
   *
   * @memberof Number
   * @param {*} n Number to check
   * @returns {boolean} Verdict
   */
  function isNumber(n) {
    return n === Number(n);
  }

  /**
   * Check if given number is negative zero (-0)
   *
   * @memberof Number
   * @param {number} n Number to check
   * @returns {boolean} Verdict
   */
  function isNegativeZero(n) {
    return 1 / n === -Infinity;
  }

  /**
   * Polyfill for ECMAScript 2015 for Number.isInteger
   *
   * @memberof Number
   * @param {number} n Number to check
   * @returns {boolean} Verdict
   */
  function isInteger(n) {
    return Number.isNumber(n) && n % 1 === 0;
  }

  /**
   * Check if given number is natural (this function assumes that 0 is also natural)
   *
   * @memberof Number
   * @param {number} n Number to check
   * @returns {boolean} Verdict
   */
  function isNatural(n) {
    return Number.isInteger(n) && n >= 0 && !Number.isNegativeZero(n);
  }

  /**
   * Check if given number is float
   *
   * @memberof Number
   * @param {number} n Number to check
   * @returns {boolean} Verdict
   */
  function isFloat(n) {
    return Number.isNumber(n) && n % 1 !== 0;
  }

  /**
   * Returns string padded with leading zeros to length equal given length
   *
   * @memberof Number.prototype
   * @param {number} padding Length to which number should be padded
   * @returns {string} Padded string
   */
  function pad(padding) {
    var value = this.toString();
    var pointIndex = value.indexOf('.');
    var toAdd = padding;
    if (pointIndex > -1) {
      toAdd -= pointIndex;
    } else {
      toAdd -= value.length;
    }
    for (var i = 0; i < toAdd; i++) {
      value = '0' + value;
    }
    return value;
  }
  var NumberExt = {
    static: {
      isNumber: isNumber,
      isNegativeZero: isNegativeZero,
      isInteger: isInteger,
      isNatural: isNatural,
      isFloat: isFloat
    },
    method: {
      pad: pad
    }
  };

  /**
   * @namespace Object
   */

  /**
   * Returns verdict if given subject is Object or not
   *
   * @memberof Object
   * @param {*} subject Subject of examination
   * @returns {boolean} Verdict
   */
  function isObject(subject) {
    return subject !== null && _typeof(subject) === 'object';
  }

  /**
   * Copy key and values from src Object to dst  Object
   *
   * @memberof Object
   * @param {Object} src Source
   * @param {Object} dst Destination
   * @param {(Array|null)} [what] What should be copied? By default, those are all keys and values from source
   * @returns {void}
   */
  function copy(src, dst, what) {
    var i;
    if (what == null || what.length === 0) {
      for (i in src) {
        dst[i] = src[i];
      }
    } else {
      for (i = 0; i < what.length; i++) {
        dst[what[i]] = src[what[i]];
      }
    }
  }

  /**
   * Returns verdict if subject match query
   *
   * @memberof Object
   * @param {Object} subject Subject of examination
   * @param {Object|*} query Query - if object then will compare each key of query with subject,
   * otherwise will just use standard comparator
   * @returns {boolean} Verdict
   */
  function isLike$1(subject, query) {
    var k, v;
    if (_typeof(query) == 'object' && _typeof(subject) == 'object') {
      for (k in query) {
        v = typeof subject[k] == 'function' ? subject[k]() : subject[k];
        if (v !== query[k]) {
          return false;
        }
      }
    } else {
      if (subject !== query) {
        return false;
      }
    }
    return true;
  }

  /**
   * Count number of items in given subject
   *
   * @memberof Object
   * @param {Object} subject Subject of examination
   * @returns {number} Number of items
   */
  function count(subject) {
    var items = 0;
    for (var i in subject) {
      if (subject.hasOwnProperty(i)) {
        items += 1;
      }
    }
    return items;
  }

  /**
   * Polyfill for ECMAScript 2017 for Object.values
   * https://www.ecma-international.org/ecma-262/8.0/#sec-object.values
   *
   * @memberof Object
   */
  function values(o) {
    var obj = Object(o);
    var values = [];
    for (var k in obj) {
      values.push(obj[k]);
    }
    return values;
  }

  /**
   * Polyfill for ECMAScript 2015 for Object.assign
   * https://www.ecma-international.org/ecma-262/6.0/#sec-object.assign
   *
   * @memberof Object
   */
  function assign() {
    var args = Array.prototype.slice.call(arguments, 0);
    var to = Object(args[0]);
    if (args.length !== 1) {
      var sources = args.slice(1);
      var nextSource, keys, from, nextKey, propValue;
      for (var i = 0; i < sources.length; i++) {
        nextSource = sources[i];
        from = Object(nextSource);
        if (typeof nextSource === 'undefined' || nextSource === null) {
          keys = [];
        } else {
          keys = Object.keys(from);
        }
        for (var j = 0; j < keys.length; j++) {
          nextKey = keys[j];
          propValue = from[nextKey];
          if (typeof propValue !== 'undefined' && from.propertyIsEnumerable(nextKey)) {
            to[nextKey] = propValue;
          }
        }
      }
    }
    return to;
  }

  /**
   * This is similar to Object.assign, but extends also deep nested Objects
   *
   * @memberof Object
   * @returns {object} Object
   */
  function deepAssign() {
    var args = Array.prototype.slice.call(arguments, 0);
    var to = Object(args[0]);
    if (args.length !== 1) {
      var sources = args.slice(1);
      var nextSource, keys, from, nextKey, propValue;
      for (var i = 0; i < sources.length; i++) {
        nextSource = sources[i];
        from = Object(nextSource);
        if (typeof nextSource === 'undefined' || nextSource === null) {
          keys = [];
        } else {
          keys = Object.keys(from);
        }
        for (var j = 0; j < keys.length; j++) {
          nextKey = keys[j];
          propValue = from[nextKey];
          if (typeof propValue !== 'undefined' && from.propertyIsEnumerable(nextKey)) {
            if (_typeof(to[nextKey]) === 'object' && _typeof(propValue) === 'object') {
              var areArrays = Array.isArray(to[nextKey]) && Array.isArray(propValue);
              to[nextKey] = Object.deepAssign({}, to[nextKey], propValue);
              if (areArrays) {
                to[nextKey] = Object.values(to[nextKey]);
              }
            } else {
              to[nextKey] = propValue;
            }
          }
        }
      }
    }
    return to;
  }

  /**
   * Clone an Object
   * @param {Object} o Object to clone
   */
  function clone(o) {
    return JSON.parse(JSON.stringify(o));
  }
  var ObjectExt = {
    static: {
      isObject: isObject,
      copy: copy,
      isLike: isLike$1,
      count: count,
      values: values,
      assign: assign,
      deepAssign: deepAssign,
      clone: clone
    }
  };

  /**
   * @namespace Promise
   */

  /**
   * Returns verdict if given subject is Promise or not
   *
   * @memberof Promise
   * @param {*} subject Subject of examination
   * @returns {boolean} Verdict
   */
  function isPromise(subject) {
    return Object.isObject(subject) && (subject instanceof Promise || typeof subject.then === 'function');
  }
  var PromiseExt = {
    static: {
      isPromise: isPromise
    }
  };

  /**
   * @namespace RegExp
   */

  /**
   * Escape given string, so it can be safely used in RegExp
   *
   * @memberof RegExp
   * @param {string} str String to be escaped
   * @returns {string} Escaped string
   */
  function escapeString(str) {
    return str.replace(/[-[\]/\\{}()*+?.^$|]/g, '\\$&');
  }
  var RegExpExt = {
    static: {
      escapeString: escapeString
    }
  };

  /**
   * @namespace String
   */

  /**
   * Calculate edit distance between string a and b
   *
   * @memberof String
   * @see {@link https://en.wikipedia.org/wiki/Edit_distance|Article on Wikipedia}
   * @param {string} a A
   * @param {string} b B
   * @returns {number} Distance
   */
  function editDistance(a, b) {
    var matrix = [],
      i,
      j;
    if (a.length === 0) {
      return b.length;
    }
    if (b.length === 0) {
      return a.length;
    }
    if (a === b) {
      return 0;
    }

    // increment along the first column of each row
    for (i = 0; i <= b.length; i++) {
      matrix[i] = [i];
    }

    // increment each column in the first row
    for (j = 0; j <= a.length; j++) {
      matrix[0][j] = j;
    }

    // Fill in the rest of the matrix
    for (i = 1; i <= b.length; i++) {
      for (j = 1; j <= a.length; j++) {
        if (b.charAt(i - 1) === a.charAt(j - 1)) {
          matrix[i][j] = matrix[i - 1][j - 1];
        } else {
          matrix[i][j] = Math.min(matrix[i - 1][j - 1] + 1,
          // substitution
          Math.min(matrix[i][j - 1] + 1,
          // insertion
          matrix[i - 1][j] + 1)); // deletion
        }
      }
    }
    return matrix[b.length][a.length];
  }

  /**
   * Get similarity ratio based on edit distance
   *
   * @memberof String
   * @see {@link String.editDistance}
   * @param {string} a A
   * @param {string} b B
   * @returns {number} Ratio
   */
  function getSimilarity(a, b) {
    var l = Math.max(a.length, b.length);
    return (l - String.editDistance(a, b)) / l;
  }

  /**
   * Checks is given value is String and is empty
   *
   * @memberof String
   * @param {string} sth Something to check
   * @returns {boolean} Verdict
   */
  function isEmpty(sth) {
    return typeof sth === 'string' && sth.length === 0;
  }

  /**
   * Checks is given value is String and is not empty
   *
   * @memberof String
   * @param {string} sth Something to check
   * @returns {boolean} Verdict
   */
  function isNotEmpty(sth) {
    return typeof sth === 'string' && sth.length > 0;
  }

  /**
   * Checks is given value isn't a String, or it is empty
   *
   * @memberof String
   * @param {string} sth Something to check
   * @returns {boolean} Verdict
   */
  function isInvalidOrEmpty(sth) {
    return typeof sth !== 'string' || sth.length === 0;
  }

  /**
   * Returns string with capitalised first letter
   *
   * @memberof String.prototype
   * @param {boolean} [lower=false] Flag if it should lower all letters first
   * @returns {string} New string
   */
  function capitaliseFirstLetter(lower) {
    var value = this.valueOf();
    if (lower) {
      value = value.toLowerCase();
    }
    return value.replace(/[a-z]/i, function (m) {
      return m.toUpperCase();
    });
  }

  /**
   * Returns string with lower first letter
   *
   * @memberof String.prototype
   * @returns {string} New string
   */
  function lowerFirstLetter() {
    return this.valueOf().replace(/[a-z]/i, function (m) {
      return m.toLowerCase();
    });
  }

  /**
   * Returns string with removed cases
   *
   * @memberof String.prototype
   * @returns {string} New string
   */
  function noCase() {
    var value = this.valueOf();

    // detect capitalized snake case
    if (/^[A-Z0-9_]+$/.test(value)) {
      return value.replace(/_/g, ' ').toLowerCase();
    }

    // clean kebab and snake case
    value = value.replace(/[-_]/g, ' ');

    // clean special characters
    value = value.replace(/[^a-z0-9 ]/gi, '');

    // clean pascal case
    value = value.lowerFirstLetter();

    // clean camel case
    value = value.replace(/([A-Za-z])([0-9])/g, function (m, m1, m2) {
      return m1 + ' ' + m2;
    });
    value = value.replace(/[A-Z][a-z]/g, function (m) {
      return ' ' + m.toLowerCase();
    });
    value = value.replace(/([a-z0-9])([A-Z])/g, function (m, m1, m2) {
      return m1 + ' ' + m2;
    });

    // minimize white spaces
    value = value.trim().replace(/\s{2,}/g, ' ');
    return value;
  }

  /**
   * Returns string in camelCase
   *
   * @memberof String.prototype
   * @returns {string} String in camelCase
   */
  function toCamelCase() {
    var value = this.valueOf();

    // normalize
    value = value.noCase();

    // replace
    value = value.replace(/ [a-z0-9]/gi, function (m) {
      return m[1].toUpperCase();
    });
    return value;
  }

  /**
   * Returns string in PascalCase
   *
   * @memberof String.prototype
   * @returns {string} String in PascalCase
   */
  function toPascalCase() {
    return this.toCamelCase().capitaliseFirstLetter(false);
  }

  /**
   * Returns string in kebab-case
   *
   * @memberof String.prototype
   * @returns {string} String in kebab-case
   */
  function toKebabCase() {
    var value = this.valueOf();

    // normalize
    value = value.noCase();

    // replace
    value = value.replace(/\s/g, '-');
    return value;
  }

  /**
   * Returns string in snake_case
   *
   * @memberof String.prototype
   * @param {boolean} [convertToUpperCase=false] Set this flag to convert to UpperCase
   * @returns {string} String in snake_case
   */
  function toSnakeCase(convertToUpperCase) {
    var toUpperCase = convertToUpperCase || false;
    var value = this.valueOf();

    // normalize
    value = value.noCase();

    // replace
    value = value.replace(/\s/g, '_');
    if (toUpperCase) return value.toUpperCase();
    return value;
  }

  /**
   * Returns checksum crc32
   *
   * @memberof String.prototype
   * @author joelpt
   * @author schnaader
   * @see {@link https://stackoverflow.com/a/3276730 | Stack Overflow Answer}
   * @returns {string} Checksum
   */
  function toChecksum() {
    var value, i, chk;
    value = this.valueOf();
    chk = 0x12345678;
    for (i = 0; i < value.length; i++) {
      chk += value.charCodeAt(i) * (i + 1);
    }
    return chk;
  }

  /**
   * Returns string in boolean
   *
   * @memberof String.prototype
   * @returns {boolean} True if string looks somehow like 'true'
   */
  function toBoolean() {
    return this.valueOf().toLowerCase() === 'true';
  }

  /**
   * Returns reversed string
   *
   * @memberof String.prototype
   * @returns {string} Reversed string
   */
  function reverse() {
    return this.valueOf().split('').reverse().join('');
  }

  /**
   * Check if string is like given query (you can use regexp notation)
   *
   * @memberof String.prototype
   * @param {string} query Query
   * @returns {boolean} Verdict
   */
  function isLike(query) {
    return new RegExp('^' + query + '$').test(this.valueOf());
  }

  /**
   * Polyfill for ECMAScript 2015 for String.prototype.includes
   *
   * @memberof String.prototype
   * @param {string} search Search for
   * @param {number} [start=0] Searching start position
   * @returns {boolean} Verdict
   */
  function includes(search, start) {
    var _start = typeof start !== 'number' ? 0 : start;
    if (_start + search.length > this.length) {
      return false;
    }
    return this.indexOf(search, _start) !== -1;
  }
  var StringExt = {
    static: {
      editDistance: editDistance,
      getSimilarity: getSimilarity,
      isEmpty: isEmpty,
      isNotEmpty: isNotEmpty,
      isInvalidOrEmpty: isInvalidOrEmpty
    },
    method: {
      capitaliseFirstLetter: capitaliseFirstLetter,
      lowerFirstLetter: lowerFirstLetter,
      noCase: noCase,
      toCamelCase: toCamelCase,
      toPascalCase: toPascalCase,
      toKebabCase: toKebabCase,
      toSnakeCase: toSnakeCase,
      toChecksum: toChecksum,
      toBoolean: toBoolean,
      reverse: reverse,
      isLike: isLike,
      includes: includes
    }
  };

  /**
   * Creates a new FileSize
   *
   * @param {number} bytes Number of bytes
   * @constructor
   */
  function FileSize(bytes) {
    /**
     * Number of bytes
     * @type {number}
     */
    this.bytes = bytes;

    /**
     * Returns this.bytes as human-readable file size string
     *
     * @returns {string} Human-readable file size string
     */
    this.toReadableString = function () {
      return FileSize.getReadableString(this.bytes);
    };
  }

  /**
   * List of available size units
   *
   * @constant
   * @type {string[]}
   */
  FileSize.UNITS = ['B', 'KB', 'MB', 'GB', 'TB', 'EB', 'ZB', 'YB'];

  /**
   * 1B in bytes
   *
   * @constant
   * @type {number}
   */
  FileSize.B = 1;

  /**
   * 1KB in bytes
   *
   * @constant
   * @type {number}
   */
  FileSize.KB = 1024 * FileSize.B;

  /**
   * 1MB in bytes
   *
   * @constant
   * @type {number}
   */
  FileSize.MB = 1024 * FileSize.KB;

  /**
   * 1GB in bytes
   *
   * @constant
   * @type {number}
   */
  FileSize.GB = 1024 * FileSize.MB;

  /**
   * 1TB in bytes
   *
   * @constant
   * @type {number}
   */
  FileSize.TB = 1024 * FileSize.GB;

  /**
   * 1EB in bytes
   *
   * @constant
   * @type {number}
   */
  FileSize.EB = 1024 * FileSize.TB;

  /**
   * Returns human-readable file size string from given number of bytes
   *
   * @param {number} bytes Number of bytes
   * @returns {string} Human-readable file size string
   */
  FileSize.getReadableString = function (bytes) {
    var i;
    var val = bytes;
    for (i = 0; i < FileSize.UNITS.length; i++) {
      if (val < 1000) break;
      val /= 1024;
    }
    return (i === 0 ? val : val.toFixed(1)) + FileSize.UNITS[i];
  };

  var extensions = {
    global: globalExt,
    Array: ArrayExt,
    Boolean: BooleanExt,
    Date: DateExt,
    JSON: JSONExt,
    Math: MathExt,
    Number: NumberExt,
    Object: ObjectExt,
    Promise: PromiseExt,
    RegExp: RegExpExt,
    String: StringExt
  };
  var libraries = {
    FileSize: FileSize
  };
  function finka() {
    // Enable extensions
    for (var extName in extensions) {
      var ext = extensions[extName];
      var target = extName === 'global' ? global : global[extName];

      // constant
      if (typeof ext.constant !== 'undefined') {
        for (var name in ext.constant) {
          if (typeof target[name] === 'undefined') {
            target[name] = ext.constant[name];
          }
        }
      }

      // getter
      if (typeof ext.getter !== 'undefined') {
        for (var _name in ext.getter) {
          if (typeof target[_name] === 'undefined') {
            Object.defineProperty(target, _name, {
              get: ext.getter[_name]
            });
          }
        }
      }

      // static
      if (typeof ext.static !== 'undefined') {
        for (var _name2 in ext.static) {
          if (typeof target[_name2] === 'undefined') {
            target[_name2] = ext.static[_name2].bind(target);
          }
        }
      }

      // method
      if (typeof ext.method !== 'undefined') {
        for (var _name3 in ext.method) {
          if (typeof target.prototype[_name3] === 'undefined') {
            target.prototype[_name3] = ext.method[_name3];
          }
        }
      }
    }

    // Enable libraries
    for (var libName in libraries) {
      if (typeof global[libName] === 'undefined') {
        global[libName] = libraries[libName];
      }
    }
  }

  return finka;

}));

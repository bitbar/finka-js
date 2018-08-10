/* Finka.js v0.1.0 | (c) Bitbar Technologies and contributors | https://github.com/bitbar/finka-js/blob/master/LICENSE.md */
(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(factory());
}(this, (function () { 'use strict';

	var commonjsGlobal = typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

	function createCommonjsModule(fn, module) {
		return module = { exports: {} }, fn(module, module.exports), module.exports;
	}

	var global_1 = createCommonjsModule(function (module) {
	commonjsGlobal.isNodeJs = module != null && module.exports != null;

	commonjsGlobal.isJSONString = function(str) {
	  try {
	    JSON.parse(str);
	  } catch(e) {
	    return false;
	  }
	  return true;
	};

	commonjsGlobal.getLanguage = function() {
	  if(isNodeJs) {
	    var lang = process.env.LANG || process.env.LANGUAGE || process.env.LC_ALL || process.env.LC_MESSAGES;
	    return lang.replace(/^([a-z]{2})_([A-Z]{2}).+$/, (m, m1, m2) => m1 + '-' + m2);
	  } else {
	    return navigator.language;
	  }
	};

	commonjsGlobal.getCountry = function() {
	  return getLanguage().substr(0, 2).toUpperCase();
	};

	commonjsGlobal.parseValue = function(value) {
	  // check if it's even a string
	  if(typeof value != 'string') {
	    return value;
	  }

	  // check if it's number
	  if (isNumeric(value)) {
	    return parseFloat(value);
	  }

	  // check if it's a boolean
	  var _value = value.toLowerCase();
	  if (_value === 'true' || _value === 'false') {
	    return _value === 'true';
	  }

	  // add more check here if you want

	  // return unparsed value in the end
	  return value;
	};

	commonjsGlobal.xor = function(a, b) {
	  return !a != !b;
	};
	});

	Object.copy = function(src, dst, what) {
	  if(what == null || what.length == 0) {
	    for(var i in src) {
	      dst[i] = src[i];
	    }
	  } else {
	    for(var i = 0; i < what.length; i++) {
	      dst[what[i]] = src[what[i]];
	    }
	  }

	};

	Object.isLike = function(subject, query) {
	  var k, v;
	  if(typeof query == 'object' && typeof subject == 'object') {
	    for(k in query) {
	      v = typeof subject[k] == 'function' ? subject[k]() : subject[k];
	      if(v !== query[k]) {
	        return false;
	      }
	    }
	  } else {
	    if(subject !== query) {
	      return false;
	    }
	  }
	  return true;
	};

	Object.count = function(obj) {
	  var size = 0;
	  for(let i in obj) {
	    if(obj.hasOwnProperty(i)) {
	      size += 1;
	    }
	  }
	  return size;
	};

	Array.prototype.empty = function() {
	  this.length = 0;
	  return this;
	};

	Array.prototype.absorb = function(arr) {
	  this.push.apply(this, arr);
	  return this;
	};

	Array.prototype.diff = function(arr) {
	  return this.filter((i) => arr.indexOf(i) < 0);
	};

	Array.prototype.clone = function() {
	  return this.slice(0);
	};

	Array.prototype.lookFor = function(query) {
	  var i;

	  for(i = 0; i < this.length; i++) {
	    if(Object.isLike(this[i], query)) {
	      return i;
	    }
	  }

	  return -1;
	};

	Array.prototype.filterLike = function(query) {
	  var i, ret;

	  if(query == null) {
	    return this;
	  }

	  ret = [];
	  for(i = 0; i < this.length; i++) {
	    if(Object.isLike(this[i], query)) {
	      ret.push(this[i]);
	    }
	  }

	  return ret;
	};

	Array.prototype.unique = function() {
	  var a = this.concat();
	  for(var i=0; i<a.length; ++i) {
	    for(var j=i+1; j<a.length; ++j) {
	      if(a[i] === a[j])
	        a.splice(j--, 1);
	    }
	  }

	  return a;
	};

	Array.prototype.shuffle = function() {
	  for (var i = this.length - 1; i > 0; i--) {
	    var j = Math.floor(Math.rand() * (i + 1));
	    var temp = this[i];
	    this[i] = this[j];
	    this[j] = temp;
	  }
	};

	Array.sortArrayOfObjects = function(arr, propertyName, inverted) {
	  var _a, _b;

	  if(inverted == null) {
	    inverted = false;
	  }
	  inverted = inverted ? -1 : 1;

	  arr.sort(function(a, b) {
	    _a = a[propertyName];
	    _b = b[propertyName];

	    if(typeof _a == 'string') {
	      _a = _a.toLowerCase();
	    }
	    if(typeof _b == 'string') {
	      _b = _b.toLowerCase();
	    }

	    if(_a > _b) {
	      return inverted * 1;
	    } else if(_a < _b) {
	      return inverted * -1;
	    }
	    return 0;
	  });
	};

	Array.cloneArrayOfObjects = function(arr) {
	  return arr.map(function(obj) {
	    return $.extend({}, obj);
	  });
	};

	// Wrap in Array if needed
	Array.wrap = function(val) {
	  return Array.isArray(val) ? val : [val];
	};

	commonjsGlobal.isNumeric = function(n) {
	  return !isNaN(parseFloat(n)) && isFinite(n);
	};

	Number.isInt = function(n){
	  return Number(n) === n && n % 1 === 0;
	};

	Number.isFloat = function(n){
	  return n === Number(n) && n % 1 !== 0;
	};

	Number.prototype.pad = function(n) {
	  var value, i, toAdd;

	  value = this.toString();
	  toAdd = n - value.length;

	  for(i = 0; i < toAdd; i++) {
	    value = '0' + value;
	  }

	  return value;
	};

	// not sure if it should be here or in Date
	Number.prototype.toClockString = function(inSeconds) {
	  var value, minutes, seconds;

	  value = this.valueOf();

	  if(typeof inSeconds == 'undefined') {
	    inSeconds = false;
	    // if inSeconds param is set to true, then value will be treated as seconds
	    // by default value is treated as milliseconds
	  }

	  if(!inSeconds) {
	    value = Math.round(value/1000);
	  }

	  minutes = Math.floor(value/60);
	  seconds = Math.floor(value-minutes*60);

	  return minutes.pad(2)+':'+seconds.pad(2);
	};

	String.editDistance = function(a, b) {
	  var matrix = [], i, j;

	  if(a.length === 0) { return b.length; }
	  if(b.length === 0) { return a.length; }
	  if(a == b) { return 0; }

	  // increment along the first column of each row
	  for(i = 0; i <= b.length; i++) {
	    matrix[i] = [i];
	  }

	  // increment each column in the first row
	  for(j = 0; j <= a.length; j++){
	    matrix[0][j] = j;
	  }

	  // Fill in the rest of the matrix
	  for(i = 1; i <= b.length; i++){
	    for(j = 1; j <= a.length; j++){
	      if(b.charAt(i-1) == a.charAt(j-1)){
	        matrix[i][j] = matrix[i-1][j-1];
	      } else {
	        matrix[i][j] = Math.min(matrix[i-1][j-1] + 1, // substitution
	          Math.min(matrix[i][j-1] + 1, // insertion
	            matrix[i-1][j] + 1)); // deletion
	      }
	    }
	  }

	  return matrix[b.length][a.length];
	};

	String.getSimilarity = function(a, b) {
	  var l = Math.max(a.length, b.length);
	  return (l - String.editDistance(a, b) / 2) / l;
	};


	String.prototype.capitaliseFirstLetter = function(lower) {
	  var value = this.valueOf();

	  if(lower) {
	    value = value.toLowerCase();
	  }

	  return value.replace(/[a-z]/i, (m) => m.toUpperCase());
	};

	String.prototype.lowerFirstLetter = function() {
	  return this.valueOf().replace(/[a-z]/i, (m) => m.toLowerCase());
	};

	String.prototype.toCamelCase = function() {
	  var value, arr, ret, i;
	  value = this.valueOf();

	  if(value.indexOf('-') < 0) {
	    return value;
	  }

	  arr = value.split('-');
	  ret = arr[0];
	  for(i = 1; i < arr.length; i++) {
	    ret += arr[i].capitaliseFirstLetter();
	  }

	  return ret;
	};

	String.prototype.toPascalCase = function() {
	  return this.toCamelCase().capitaliseFirstLetter();
	};

	String.prototype.toKebabCase = function() {
	  return this.valueOf().trim().toLowerCase().replace(/\s/g, '-');
	};

	// Checksum CRC32 - By schnaader (MIT Licensed)
	String.prototype.toChecksum = function() {
	  var value, i, chk;

	  value = this.valueOf();
	  chk = 0x12345678;

	  for (i = 0; i < value.length; i++) {
	    chk += value.charCodeAt(i) * (i + 1);
	  }

	  return chk;
	};

	String.prototype.reverse = function() {
	  return this.valueOf().split('').reverse().join('');
	};

	String.prototype.toBoolean = function() {
	  return this.valueOf().toLowerCase() === 'true';
	};

	String.prototype.isLike = function(str) {
	  return new RegExp('^' + str + '$').test(this.valueOf());
	};

	if(typeof String.prototype.includes != 'function') {
	  String.prototype.includes = function(str) {
	    return this.valueOf().indexOf(str) > -1;
	  };
	}

	Date.SECOND = 1000;
	Date.MINUTE = 60 * Date.SECOND;
	Date.HOUR   = 60 * Date.MINUTE;
	Date.DAY    = 24 * Date.HOUR;
	Date.WEEK   = 7  * Date.DAY;

	Date.TODAY            = Date.HOUR * Math.floor( Date.now() / Date.HOUR );
	Date.YESTERDAY        = Date.TODAY - Date.DAY;
	Date.TOMORROW         = Date.TODAY + Date.DAY;
	Date.DAYAFTERTOMORROW = Date.TOMORROW + Date.DAY;

	Date.daysFromNow = function(days) {
	  return Date.now() + Date.DAY * days;
	};

	Date.getFormat = function(full) {
	  var ymd, mdy, countryCode, format;

	  if(typeof full == 'undefined') {
	    full = true;
	  }

	  ymd = ['AF', 'CN', 'HU', 'JP', 'KP', 'KR', 'LT', 'MN', 'TW'];
	  mdy = ['BZ', 'FM', 'US'];

	  try {
	    countryCode = getCountry() || 'US';
	  } catch(e) {
	    countryCode = 'US';
	  }

	  if(ymd.indexOf(countryCode) >= 0) {
	    format = 'y-m-d';
	  } else if(mdy.indexOf(countryCode) >= 0) {
	    format = 'm/d/y';
	  } else {
	    format = 'd.m.y';
	  }

	  if(full == true) {
	    format = format.replace('d', 'dd');
	    format = format.replace('m', 'mm');
	    format = format.replace('y', 'yyyy');
	  }

	  return format;
	};

	Date.getTimezoneName = function() {
	  return new this().toString().match(/\(([^)]+)\)$/)[1];
	};

	Date.toHmsFormat = function(time, round, accuracy, inSeconds) {
	  var h, m, s, seconds = 0, ret,
	    format, setRet;

	  if(typeof round == 'undefined') {
	    round = 'round';
	  }
	  if(typeof accuracy == 'undefined') {
	    accuracy = 'seconds';
	  }

	  format = function(value, suffix){
	    return value > 0 ? value + suffix : '';
	  };

	  setRet = function() {
	    ret = (h + m + s).trim();
	  };

	  time = parseInt(time);
	  if(typeof inSeconds != 'undefined' && inSeconds){
	    seconds = time;
	  } else {
	    seconds = Math.round(time / 1000);
	  }

	  if (accuracy == 'hours'){
	    h = format(Math[round](seconds / 3600), 'h ');
	    m = format(0, 'm ');
	    s = format(0 + 's');

	    setRet();
	    if(ret.length == 0) {
	      ret = '0h';
	    }

	  } else if (accuracy == 'minutes'){
	    h = format(Math.floor(seconds / 3600), 'h ');
	    m = format(Math[round](seconds % 3600 / 60), 'm ');
	    s = format(0 + 's');

	    setRet();
	    if(ret.length == 0) {
	      ret = '0m';
	    }

	  } else { // accuracy == "seconds"
	    h = format(Math.floor(seconds / 3600), 'h ');
	    m = format(Math.floor(seconds % 3600 / 60), 'm ');
	    s = Math[round](seconds % 3600 % 60) + 's';

	    setRet();
	    if(ret.length == 0) {
	      ret = '0s';
	    }

	  }

	  return ret;
	};

	Date.toStopwatchFormat = function(time) {
	  // [HH:]MM:SS.XXX

	  var ms, s, m, h, ret;

	  ms = Math.max(0, time % 1000);
	  time -= ms;
	  ms = Math.floor(ms / 100);

	  time /= 1000;
	  s = Math.max(0, time % 60);
	  time -= s;

	  time /= 60;
	  m = Math.max(0, time % 60);
	  time -= m;

	  time /= 60;
	  h = Math.max(0, time);

	  ret = m.pad(2) + ':' + s.pad(2) + '.' + ms;
	  if(h > 0) {
	    ret = h.pad(2) + ':' + ret;
	  }

	  return ret;
	};

	Date.prototype.daysPassed = function(toDate) {
	  if(typeof toDate == 'undefined') {
	    toDate = new Date();
	  } else if(typeof toDate == 'number' || typeof toDate == 'string') {
	    toDate = new Date(toDate);
	  }

	  if(!(toDate instanceof Date)) {
	    throw 'Date.daysPassed: toDate is not instance of Date';
	  }

	  return Math.floor(Math.abs((this.getTime() - toDate.getTime()) / 86400000));
	};


	Date.prototype.toUiTime = function(showSeconds) {
	  if(typeof showSeconds == 'undefined') {
	    showSeconds = true;
	  }

	  if(showSeconds) {
	    showSeconds = ':' + this.getSeconds().pad(2);
	  } else {
	    showSeconds = '';
	  }

	  return this.getHours().pad(2)+':'+this.getMinutes().pad(2)+showSeconds;
	};

	Date.prototype.toCustomDate = function(format) {
	  format = format.replace('d', this.getDate().pad(2));
	  format = format.replace('m', (this.getMonth()+1).pad(2));
	  format = format.replace('y', this.getFullYear());

	  return format;
	};
	Date.prototype.toUiDate = function() {
	  return this.toCustomDate(Date.getFormat(false));
	};

	Date.prototype.toUiDateTime = function(showSeconds) {
	  return this.toUiDate()+' '+this.toUiTime(showSeconds);
	};

	Date.prototype.toInputDateFormat = function() {
	  return this.toCustomDate('y-m-d');
	};
	Date.prototype.toInputTimeFormat = function() {
	  return this.toUiTime(false);
	};

	Date.prototype.addTime = function(time) {
	  return this.setTime( this.getTime() + time );
	};

	function Mash() {
	  var n = 0xefc8249d;

	  var mash = function(data) {
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

	  return mash;
	}

	function MRG32k3a() {
	  return (function(args) {
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

	    var uint32 = function() {
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

	      if (p1 <= p2) return p1 - p2 + m1;
	      else return p1 - p2;
	    };

	    var random = function() {
	      return uint32() * 2.3283064365386963e-10; // 2^-32
	    };
	    random.uint32 = uint32;
	    random.fract53 = function() {
	      return random() +
	        (uint32() & 0x1fffff) * 1.1102230246251565e-16; // 2^-53
	    };
	    random.args = args;

	    return random;
	  } (Array.prototype.slice.call(arguments)));
	}

	var MRG32k3a$1 = /*#__PURE__*/Object.freeze({
		default: MRG32k3a
	});

	function md5cycle(x, k) {
	  var a = x[0], b = x[1], c = x[2], d = x[3];

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
	    state = [1732584193, -271733879, -1732584194, 271733878], i;
	  for (i=64; i<=s.length; i+=64) {
	    md5cycle(state, md5blk(s.substring(i-64, i)));
	  }
	  s = s.substring(i-64);
	  var tail = [0,0,0,0, 0,0,0,0, 0,0,0,0, 0,0,0,0];
	  for (i=0; i<s.length; i++)
	  {tail[i>>2] |= s.charCodeAt(i) << (i%4 << 3);}
	  tail[i>>2] |= 0x80 << (i%4 << 3);
	  if (i > 55) {
	    md5cycle(state, tail);
	    for (i=0; i<16; i++) {tail[i] = 0;}
	  }
	  tail[14] = n*8;
	  md5cycle(state, tail);
	  return state;
	}

	/* there needs to be support for Unicode here,
	 * unless we pretend that we can redefine the MD-5
	 * algorithm for multi-byte characters (perhaps
	 * by adding every four 16-bit characters and
	 * shortening the sum to 32 bits). Otherwise
	 * I suggest performing MD-5 as if every character
	 * was two bytes--e.g., 0040 0025 = @%--but then
	 * how will an ordinary MD-5 sum be matched?
	 * There is no way to standardize text to something
	 * like UTF-8 before transformation; speed cost is
	 * utterly prohibitive. The JavaScript standard
	 * itself needs to look at this: it should start
	 * providing access to strings as preformed UTF-8
	 * 8-bit unsigned value arrays.
	 */
	function md5blk(s) { /* I figured global was faster.   */
	  var md5blks = [], i; /* Andy King said do it this way. */
	  for (i=0; i<64; i+=4) {
	    md5blks[i>>2] = s.charCodeAt(i)
	      + (s.charCodeAt(i+1) << 8)
	      + (s.charCodeAt(i+2) << 16)
	      + (s.charCodeAt(i+3) << 24);
	  }
	  return md5blks;
	}

	var hex_chr = '0123456789abcdef'.split('');

	function rhex(n)
	{
	  var s='', j=0;
	  for(; j<4; j++)
	  {s += hex_chr[n >> j * 8 + 4 & 0x0F]
	    + hex_chr[n >> j * 8 & 0x0F];}
	  return s;
	}

	function hex(x) {
	  for (var i=0; i<x.length; i++)
	  {x[i] = rhex(x[i]);}
	  return x.join('');
	}

	function md5(s) {
	  return hex(md51(s));
	}

	/* this function is much faster,
	so if possible we use it. Some IEs
	are the only ones I know of that
	need the idiotic second function,
	generated by an if clause.  */

	function add32(a, b) {
	  return a + b & 0xFFFFFFFF;
	}

	if (md5('hello') != '5d41402abc4b2a76b9719d911017c592') {
	  function add32(x, y) {
	    var lsw = (x & 0xFFFF) + (y & 0xFFFF),
	      msw = (x >> 16) + (y >> 16) + (lsw >> 16);
	    return msw << 16 | lsw & 0xFFFF;
	  }
	}

	var md5$1 = /*#__PURE__*/Object.freeze({
		default: md5
	});

	var MRG32k3a$2 = ( MRG32k3a$1 && MRG32k3a ) || MRG32k3a$1;

	var require$$0 = ( md5$1 && md5 ) || md5$1;

	commonjsGlobal.md5 = require$$0;

	Math.MRG32k2a = new MRG32k3a$2();

	Math.rand = function() {
	  return this.MRG32k2a();
	};

	Math.roundTo = function(num, scale) {
	  if(!("" + num).includes("e")) {
	    return +(Math.round(num + "e+" + scale)  + "e-" + scale);
	  } else {
	    var arr = ("" + num).split("e");
	    var sig = "";
	    if(+arr[1] + scale > 0) {
	      sig = "+";
	    }
	    return +(Math.round(+arr[0] + "e" + sig + (+arr[1] + scale)) + "e-" + scale);
	  }
	};

	Math.median = function(values) {
	  if(values.length === 0) {
	    return 0;
	  }

	  values.sort(function(a,b) {
	    return a - b;
	  });

	  var half = Math.floor(values.length / 2);
	  return values.length % 2 ? values[half] : (values[half - 1] + values[half]) / 2;
	};

	Math.sum = function(values) {
	  if(values.length === 0) {
	    return 0;
	  }

	  return values.reduce(function(a, b) { return a + b; });
	};

	Math.avg = function(values) {
	  if(values.length === 0) {
	    return 0;
	  }

	  return Math.sum(values) / values.length;
	};

	RegExp.escapeString = function(str) {
	  return str.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&");
	};

	Promise.isPromise = function(value) {
	  return typeof value === 'object' && (value instanceof Promise || typeof value.then === 'function');
	};

	var FileSize = {};
	commonjsGlobal.FileSize = FileSize;

	FileSize.B  = 1;
	FileSize.KB = 1024 * FileSize.B;
	FileSize.MB = 1024 * FileSize.KB;
	FileSize.GB = 1024 * FileSize.MB;
	FileSize.TB = 1024 * FileSize.GB;

	commonjsGlobal.isWebpSupported = false;

	if(Image != null) {
	  var img = new Image();

	  img.onload = function() {
	    commonjsGlobal.isWebpSupported = img.width > 0 && img.height > 0;
	  };

	  img.src = 'data:image/webp;base64,UklGRhoAAABXRUJQVlA4TA0AAAAvAAAAEAcQERGIiP4HAA==';
	}

	if(HTMLCanvasElement != null) {
	  HTMLCanvasElement.prototype.defaultDataType = function() {
	    if(global.isWebpSupported) {
	      return 'image/webp';
	    }
	    return 'image/jpeg';

	  };

	  HTMLCanvasElement.prototype.toBase64 = function(type) {
	    if(typeof type == 'undefined') {
	      type = this.defaultDataType();
	    }

	    return this.toDataURL(type);
	  };
	  HTMLCanvasElement.prototype.toAlphaBase64 = function() {
	    var type = 'image/png';
	    if(global.isWebpSupported && false) { // disabled due to https://code.google.com/p/chromium/issues/detail?id=170565 :(
	      type = 'image/webp';
	    }
	    return this.toBase64(type);
	  };

	  HTMLCanvasElement.prototype.toBlobType = function(callback, type) {
	    var tmp, binary, arr, i;

	    if(typeof type == 'undefined') {
	      type = this.defaultDataType();
	    }

	    // First check if toBlob is supported
	    if(typeof this.toBlob == 'function') {
	      // Yep
	      this.toBlob(callback, type, 0.9);

	    } else {
	      // Nope

	      // So maybe MS?
	      if(typeof this.msToBlob == 'function') {
	        // Yeah!
	        // This will be PNG file
	        callback(this.msToBlob());

	      } else {
	        // OMG...
	        tmp = this.toBase64(type);
	        binary = atob(tmp.split(',')[1]);
	        arr = [];
	        tmp = binary.length;
	        for(i = 0; i < tmp; i++) {
	          arr.push(binary.charCodeAt(i));
	        }

	        callback(new Blob([new Uint8Array(arr)], {type: type}));
	      }
	    }
	  };

	  // Canvas downscale high quality - By GameAlchemist (MIT Licensed)
	  // prototype implementation by Marek `marverix` Sierociński
	  HTMLCanvasElement.prototype.downsize = function(scale) {
	    var cv, sqScale,
	      sw, sh, sx, sy, sIndex,
	      tw, th, tx, tX, ty, tY,
	      w, nw, wx, nwx, wy, nwy,
	      crossX, crossY,
	      yIndex, tIndex,
	      sBuffer, tBuffer, pxIndex,
	      sR, sG, sB, sA,
	      resCV, resCtx, imgRes, tByteBuffer;

	    cv = this;
	    if (!(scale < 1) || !(scale > 0)) {throw 'scale must be a positive number <1 ';}
	    sqScale = scale * scale; // square scale = area of source pixel within target
	    sw = cv.width; // source image width
	    sh = cv.height; // source image height
	    tw = Math.floor(sw * scale); // target image width
	    th = Math.floor(sh * scale); // target image height
	    // EDIT (credits to @Enric ) : was ceil before, and creating artifacts :
	    //                           var tw = Math.ceil(sw * scale); // target image width
	    //                           var th = Math.ceil(sh * scale); // target image height
	    sx = 0, sy = 0, sIndex = 0; // source x,y, index within source array
	    tx = 0, ty = 0, yIndex = 0, tIndex = 0; // target x,y, x,y index within target array
	    tX = 0, tY = 0; // rounded tx, ty
	    w = 0, nw = 0, wx = 0, nwx = 0, wy = 0, nwy = 0; // weight / next weight x / y
	    // weight is weight of current source point within target.
	    // next weight is weight of current source point within next target's point.
	    crossX = false; // does scaled px cross its current px right border ?
	    crossY = false; // does scaled px cross its current px bottom border ?
	    sBuffer = cv.getContext('2d').getImageData(0, 0, sw, sh).data; // source buffer 8 bit rgba
	    tBuffer = new Float32Array(4 * sw * sh); // target buffer Float32 rgb
	    sR = sG = sB = sA = 0; // source's current point r,g,b

	    for (sy = 0; sy < sh; sy++) {
	      ty = sy * scale; // y src position within target
	      tY = 0 | ty;     // rounded : target pixel's y
	      yIndex = 4 * tY * tw;  // line index within target array
	      crossY = tY != (0 | ty + scale);
	      if (crossY) { // if pixel is crossing botton target pixel
	        wy = tY + 1 - ty; // weight of point within target pixel
	        nwy = ty + scale - tY - 1; // ... within y+1 target pixel
	      }
	      for (sx = 0; sx < sw; sx++, sIndex += 4) {
	        tx = sx * scale; // x src position within target
	        tX = 0 | tx;    // rounded : target pixel's x
	        tIndex = yIndex + tX * 4; // target pixel index within target array
	        crossX = tX != (0 | tx + scale);
	        if (crossX) { // if pixel is crossing target pixel's right
	          wx = tX + 1 - tx; // weight of point within target pixel
	          nwx = tx + scale - tX - 1; // ... within x+1 target pixel
	        }
	        sR = sBuffer[sIndex ];   // retrieving r,g,b for curr src px.
	        sG = sBuffer[sIndex + 1];
	        sB = sBuffer[sIndex + 2];
	        sA = sBuffer[sIndex + 3];

	        /*
	         if(!sA) continue;
	         if (sA != 0xFF) {
	         sR = (sR * sA) >> 8;
	         sG = (sG * sA) >> 8;
	         sB = (sB * sA) >> 8;
	         }
	         */

	        if (!crossX && !crossY) { // pixel does not cross
	          // just add components weighted by squared scale.
	          tBuffer[tIndex ] += sR * sqScale;
	          tBuffer[tIndex + 1] += sG * sqScale;
	          tBuffer[tIndex + 2] += sB * sqScale;
	          tBuffer[tIndex + 3] += sA * sqScale;
	        } else if (crossX && !crossY) { // cross on X only
	          w = wx * scale;
	          // add weighted component for current px
	          tBuffer[tIndex ] += sR * w;
	          tBuffer[tIndex + 1] += sG * w;
	          tBuffer[tIndex + 2] += sB * w;
	          tBuffer[tIndex + 3] += sA * w;
	          // add weighted component for next (tX+1) px
	          nw = nwx * scale;
	          tBuffer[tIndex + 4] += sR * nw;
	          tBuffer[tIndex + 5] += sG * nw;
	          tBuffer[tIndex + 6] += sB * nw;
	          tBuffer[tIndex + 7] += sA * nw;
	        } else if (crossY && !crossX) { // cross on Y only
	          w = wy * scale;
	          // add weighted component for current px
	          tBuffer[tIndex ] += sR * w;
	          tBuffer[tIndex + 1] += sG * w;
	          tBuffer[tIndex + 2] += sB * w;
	          tBuffer[tIndex + 3] += sA * w;
	          // add weighted component for next (tY+1) px
	          nw = nwy * scale;
	          tBuffer[tIndex + 4 * tw ] += sR * nw;
	          tBuffer[tIndex + 4 * tw + 1] += sG * nw;
	          tBuffer[tIndex + 4 * tw + 2] += sB * nw;
	          tBuffer[tIndex + 4 * tw + 3] += sA * nw;
	        } else { // crosses both x and y : four target points involved
	          // add weighted component for current px
	          w = wx * wy;
	          tBuffer[tIndex ] += sR * w;
	          tBuffer[tIndex + 1] += sG * w;
	          tBuffer[tIndex + 2] += sB * w;
	          tBuffer[tIndex + 3] += sA * w;
	          // for tX + 1; tY px
	          nw = nwx * wy;
	          tBuffer[tIndex + 4] += sR * nw;
	          tBuffer[tIndex + 5] += sG * nw;
	          tBuffer[tIndex + 6] += sB * nw;
	          tBuffer[tIndex + 7] += sA * nw;
	          // for tX ; tY + 1 px
	          nw = wx * nwy;
	          tBuffer[tIndex + 4 * tw ] += sR * nw;
	          tBuffer[tIndex + 4 * tw + 1] += sG * nw;
	          tBuffer[tIndex + 4 * tw + 2] += sB * nw;
	          tBuffer[tIndex + 4 * tw + 3] += sA * nw;
	          // for tX + 1 ; tY +1 px
	          nw = nwx * nwy;
	          tBuffer[tIndex + 4 * tw + 4] += sR * nw;
	          tBuffer[tIndex + 4 * tw + 5] += sG * nw;
	          tBuffer[tIndex + 4 * tw + 6] += sB * nw;
	          tBuffer[tIndex + 4 * tw + 7] += sA * nw;
	        }
	      } // end for sx
	    } // end for sy

	    // create result canvas
	    resCV = document.createElement('canvas');
	    resCV.width = tw;
	    resCV.height = th;
	    resCtx = resCV.getContext('2d');
	    imgRes = resCtx.getImageData(0, 0, tw, th);
	    tByteBuffer = imgRes.data;
	    // convert float32 array into a UInt8Clamped Array
	    pxIndex = 0; //
	    for (sIndex = 0, tIndex = 0; pxIndex < tw * th; sIndex += 4, tIndex += 4, pxIndex++) {
	      tByteBuffer[tIndex] = Math.ceil(tBuffer[sIndex]);
	      tByteBuffer[tIndex + 1] = Math.ceil(tBuffer[sIndex + 1]);
	      tByteBuffer[tIndex + 2] = Math.ceil(tBuffer[sIndex + 2]);
	      tByteBuffer[tIndex + 3] = Math.ceil(tBuffer[sIndex + 3]);
	    }
	    // writing result to canvas.
	    resCtx.putImageData(imgRes, 0, 0);

	    return resCV;
	  };
	}

})));

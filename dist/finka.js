/* Finka.js v0.10.0 | (c) Bitbar Technologies and contributors | https://github.com/bitbar/finka-js/blob/master/LICENSE.md */
(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(factory());
}(this, (function () { 'use strict';

	var commonjsGlobal = typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

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

	var require$$0 = ( md5$1 && md5 ) || md5$1;

	/**
	 * Flag if environment is Node JS
	 *
	 * @global
	 * @type {boolean}
	 */
	commonjsGlobal.isNodeJs = typeof commonjsGlobal.module != 'undefined' && typeof commonjsGlobal.module.exports != 'undefined';

	/**
	 * Get ISO 639-1 language string
	 *
	 * @global
	 * @returns {string} ISO 639-1 language string
	 */
	commonjsGlobal.getLanguage = function() {
	  var lang;

	  if(isNodeJs) {
	    lang = process.env.LANGUAGE || process.env.LANG;
	  } else {
	    lang = navigator.language || navigator.languages && navigator.languages[0];
	  }

	  lang = lang.substr(0, 2);

	  return lang;
	};

	/**
	 * Tries to get country from language
	 *
	 * @global
	 * @returns {(string|null)} Country code or null if couldn't find
	 */
	commonjsGlobal.getCountry = function() {
	  if(typeof commonjsGlobal.userCountry != 'undefined') {
	    return commonjsGlobal.userCountry;
	  }

	  var country;

	  if(isNodeJs) {
	    country = process.env.LANG;
	  } else {
	    country = navigator.language;

	    if(country.length < 3 && navigator.languages) {
	      for(let i = 0; i < navigator.languages.length; i++) {
	        if(navigator.languages[i].length > 2) {
	          country = navigator.languages[i];
	          break;
	        }
	      }
	    }
	  }

	  var country = country.match(/^[a-z]{2}[_-]([A-Z]{2})/);
	  if(country != null) {
	    country = country[1];
	  }

	  return country;
	};

	/**
	 * Check if given argument is numeric
	 *
	 * @global
	 * @param n {*} Subject of examination
	 * @returns {boolean} Verdict
	 */
	commonjsGlobal.isNumeric = function(n) {
	  return !isNaN(parseFloat(n)) && isFinite(n);
	};

	/**
	 * Parse value to proper type
	 *
	 * @global
	 * @param value {*} Value to be parsed
	 * @returns {*} Parsed value
	 */
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

	  // return not parsed value in the end
	  return value;
	};

	/**
	 * MD5
	 *
	 * @global
	 * @method
	 * @param {string} String to be hashed
	 * @returns {string} Hash
	 */
	commonjsGlobal.md5 = require$$0;

	/**
	 * @namespace Boolean
	 */

	/**
	 * Returns result of logic XOR operation between a and b arguments
	 *
	 * @returns {boolean} Result
	 */
	Boolean.xor = function(a, b) {
	  return !a != !b;
	};

	/**
	 * @namespace Number
	 */

	/**
	 * Check if given number is integer
	 *
	 * @param n {number} Number to check
	 * @returns {boolean} Verdict
	 */
	Number.isInt = function(n) {
	  return Number(n) === n && n % 1 === 0;
	};

	/**
	 * Check if given number is float
	 *
	 * @param n {number} Number to check
	 * @returns {boolean} Verdict
	 */
	Number.isFloat = function(n){
	  return n === Number(n) && n % 1 !== 0;
	};

	/**
	 * Returns string padded with leading zeros to length equal given length
	 *
	 * @param length {number} Length to which should be number padded
	 * @returns {string} Padded string
	 */
	Number.prototype.pad = function(length) {
	  var value, i, toAdd;

	  value = this.toString();
	  toAdd = length - value.length;

	  for(i = 0; i < toAdd; i++) {
	    value = '0' + value;
	  }

	  return value;
	};

	/**
	 * @namespace String
	 */

	/**
	 * Calculate edit distance between string a and b
	 *
	 * @see {@link https://en.wikipedia.org/wiki/Edit_distance|Article on Wikipedia}
	 * @param a {string} A
	 * @param b {string} B
	 * @returns {number} Distance
	 */
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

	/**
	 * Get similarity ratio based on edit distance
	 *
	 * @see {@link String.editDistance}
	 * @param a {string} A
	 * @param b {string} B
	 * @returns {number} Ratio
	 */
	String.getSimilarity = function(a, b) {
	  var l = Math.max(a.length, b.length);
	  return (l - String.editDistance(a, b) / 2) / l;
	};

	/**
	 * Returns string with capitalised first letter
	 *
	 * @param [lower=false] {boolean} Flag if should lower all letters first
	 * @returns {string} New string
	 */
	String.prototype.capitaliseFirstLetter = function(lower) {
	  var value = this.valueOf();

	  if(lower) {
	    value = value.toLowerCase();
	  }

	  return value.replace(/[a-z]/i, (m) => m.toUpperCase());
	};

	/**
	 * Returns string with lower first letter
	 *
	 * @returns {string} New string
	 */
	String.prototype.lowerFirstLetter = function() {
	  return this.valueOf().replace(/[a-z]/i, (m) => m.toLowerCase());
	};

	/**
	 * Returns string with removed cases
	 *
	 * @returns {string} New string
	 */
	String.prototype.noCase = function() {
	  var value = this.valueOf();

	  // clean kebab and snake case
	  value = value.replace(/[-_]/g, ' ');

	  // clean pascal case
	  value = value.lowerFirstLetter();

	  // clean camel case
	  value = value.replace(/[A-Z][a-z]/g, (m) => ' ' + m.toLowerCase());
	  value = value.replace(/([a-z])([A-Z])/g, (m, m1, m2) => m1 + ' ' + m2);

	  return value;
	};

	/**
	 * Returns string in camelCase
	 *
	 * @returns {string} String in camelCase
	 */
	String.prototype.toCamelCase = function() {
	  var value = this.valueOf();

	  // normalize
	  value = value.noCase();

	  // replace
	  value = value.replace(/ [a-z]/gi, (m) => m[1].toUpperCase());

	  return value;
	};

	/**
	 * Returns string in PascalCase
	 *
	 * @returns {string} String in PascalCase
	 */
	String.prototype.toPascalCase = function() {
	  return this.toCamelCase().capitaliseFirstLetter();
	};

	/**
	 * Returns string in kebab-case
	 *
	 * @returns {string} String in kebab-case
	 */
	String.prototype.toKebabCase = function() {
	  var value = this.valueOf();

	  // normalize
	  value = value.noCase();

	  // replace
	  value = value.trim().toLowerCase().replace(/\s/g, '-');

	  return value;
	};

	/**
	 * Returns checksum crc32
	 *
	 * @author schnaader
	 * @returns {number} Checksum
	 */
	String.prototype.toChecksum = function() {
	  var value, i, chk;

	  value = this.valueOf();
	  chk = 0x12345678;

	  for (i = 0; i < value.length; i++) {
	    chk += value.charCodeAt(i) * (i + 1);
	  }

	  return chk;
	};

	/**
	 * Returns string in boolean
	 *
	 * @returns {boolean} True if string looks somehow like 'true'
	 */
	String.prototype.toBoolean = function() {
	  return this.valueOf().toLowerCase() === 'true';
	};

	/**
	 * Returns reversed string
	 *
	 * @returns {string} Reversed string
	 */
	String.prototype.reverse = function() {
	  return this.valueOf().split('').reverse().join('');
	};

	/**
	 * Check if string is like given query (you can use regexp notation)
	 *
	 * @param query {string} Query
	 * @returns {boolean} Verdict
	 */
	String.prototype.isLike = function(query) {
	  return new RegExp('^' + query + '$').test(this.valueOf());
	};

	if(typeof String.prototype.includes != 'function') {
	  /**
	   * Polyfill for ECMAScript 2015 for String.prototype.includes
	   *
	   * @param search {string} Search for
	   * @param [start=0] {number} Searching start position
	   * @returns {boolean} Verdict
	   */
	  String.prototype.includes = function(search, start) {
	    if (typeof start !== 'number') {
	      start = 0;
	    }

	    if (start + search.length > this.length) {
	      return false;
	    } else {
	      return this.indexOf(search, start) !== -1;
	    }
	  };
	}

	/**
	 * @namespace Object
	 */

	/**
	 * Returns verdict if given subject is Object or not
	 *
	 * @param subject {*} Subject of examination
	 * @returns {boolean} Verdict
	 */
	Object.isObject = function(subject) {
	  return subject !== null && typeof subject === 'object';
	};

	/**
	 * Copy key and values from src Object to dst  Object
	 *
	 * @param src {Object} Source
	 * @param dst {Object} Destination
	 * @param [what] {(Array|null)} What should be copied? By default those are all keys and values from source
	 */
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

	/**
	 * Returns verdict if subject match query
	 *
	 * @param subject {Object} Subject of examination
	 * @param query {Object|*} Query - if object then will compare each key of query with subject,
	 * otherwise will just use standard comparator
	 * @returns {boolean} Verdict
	 */
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

	/**
	 * Count number of items in given subject
	 *
	 * @param subject {Object} Subject of examination
	 * @returns {number} Number of items
	 */
	Object.count = function(subject) {
	  var items = 0;
	  for(let i in subject) {
	    if(subject.hasOwnProperty(i)) {
	      items += 1;
	    }
	  }
	  return items;
	};

	/**
	 * @namespace Array
	 */

	/**
	 * Sort array of objects
	 *
	 * @param arr {Object[]} Array of objects that should be sorted
	 * @param propertyName {string} Name of property by which sorting will be done
	 * @param [descending=false] {boolean} Flag to sort in descending order
	 */
	Array.sortArrayOfObjects = function(arr, propertyName, descending) {
	  var _a, _b;

	  if(descending == null) {
	    descending = false;
	  }
	  descending = descending ? -1 : 1;

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
	      return descending * 1;
	    } else if(_a < _b) {
	      return descending * -1;
	    }
	    return 0;
	  });
	};

	/**
	 * Deep clone array of object
	 *
	 * @param arr Array of objects
	 * @returns {Object[]} Clone of arr
	 */
	Array.deepCloneArrayOfObjects = function(arr) {
	  return arr.map(function(obj) {
	    return Object.assign({}, obj);
	  });
	};

	/**
	 * Wrap in Array if @param is not an Array already
	 *
	 * @param something {(*|Array)} Something that should be an Array
	 * @returns {Array}
	 */
	Array.wrap = function(something) {
	  return Array.isArray(something) ? something : [something];
	};

	/**
	 * Empty this Array
	 *
	 * @returns {Array} this
	 */
	Array.prototype.empty = function() {
	  this.length = 0;
	  return this;
	};

	/**
	 * Absorb (push) every item of given array to this Array
	 *
	 * @param arr {Array} Array to be absorbed
	 * @returns {Array} this
	 */
	Array.prototype.absorb = function(arr) {
	  this.push.apply(this, arr);
	  return this;
	};

	/**
	 * Returns the difference between this Array and given in argument
	 *
	 * @param arr {Array} Array to compare
	 * @returns {Array} Array with elements that are different
	 */
	Array.prototype.diff = function(arr) {
	  return this.filter((i) => arr.indexOf(i) < 0);
	};

	/**
	 * Clone this Array
	 *
	 * @returns {Array} Clone of this Array
	 */
	Array.prototype.clone = function() {
	  return this.slice(0);
	};

	/**
	 * Look for index of item matching to query
	 *
	 * @param query {Object} Query
	 * @returns {number} Index of matching index; -1 if not found
	 */
	Array.prototype.lookFor = function(query) {
	  for(let i = 0; i < this.length; i++) {
	    if(Object.isLike(this[i], query)) {
	      return i;
	    }
	  }

	  return -1;
	};

	/**
	 * Returns the new array based on current one by filtering according to query
	 *
	 * @see Object#isLike
	 * @param query {Object} Query
	 * @returns {Array} New Array with matching elements
	 */
	Array.prototype.filterLike = function(query) {
	  if(query == null) {
	    return [];
	  } else {
	    return this.filter((item) => Object.isLike(item, query));
	  }
	};

	/**
	 * Unique this Array - remove all duplicate items
	 *
	 * @returns {Array} this
	 */
	Array.prototype.unique = function() {
	  for(var i = 0; i < this.length; ++i) {
	    for(var j = i + 1; j < this.length; ++j) {
	      if(this[i] === this[j])
	        this.splice(j--, 1);
	    }
	  }

	  return this;
	};

	/**
	 * Shuffle this Array
	 *
	 * @returns {Array} this
	 */
	Array.prototype.shuffle = function() {
	  for (var i = this.length - 1; i > 0; i--) {
	    var j = Math.floor(Math.rand() * (i + 1));
	    var temp = this[i];
	    this[i] = this[j];
	    this[j] = temp;
	  }

	  return this;
	};

	/**
	 * @namespace Date
	 */

	const DATE_LOCAL_FORMAT_YMD = ['AF', 'CN', 'HU', 'JP', 'KP', 'KR', 'LT', 'MN', 'TW'];
	const DATE_LOCAL_FORMAT_MDY = ['BZ', 'FM', 'US'];

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
	Date.WEEK = 7  * Date.DAY;

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
	 * @param days {number} Number of days difference
	 * @returns {number} Timestamp
	 */
	Date.daysFromNow = function(days) {
	  return Date.now() + Date.DAY * days;
	};

	/**
	 * Get local date format
	 *
	 * @param [fullFormat=true] Flag if it should be full date format like dd.mm.yyyy instead d.m.y
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
	 * @returns {string}
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
	 * @param time {number} Time to be used
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
	 * @param time {number} Time to be converted
	 * @param [accuracy=seconds] {string} Accuracy
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
	      break

	    default:
	      throw new TypeError('Unknown accuracy');
	      break;
	  }

	  return ret.join(' ');
	};

	/**
	 * Returns given time (in milliseconds) in stopwatch format - [HH:]MM:SS.XXX
	 *
	 * @example
	 * // returns '01:01.5'
	 * Date.toStopwatchFormat(61500)
	 * @param time {number} Time to be converted
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
	 * @param time {number} Time to be converted
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
	 * @param [toDate=now] {(Date|string|number)} Proper date
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
	 * @param format {string} String representing date format
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
	 * @param [showSeconds=true] {boolean} Flag if seconds also should be returned
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
	 * @param [showSeconds=true] {boolean} Flag if seconds also should be returned
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
	 * @param time {number} Time to add
	 * @returns {number} New timestamp of this Date
	 */
	Date.prototype.addTime = function(time) {
	  return this.setTime(this.getTime() + time );
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

	var MRG32k3a$2 = ( MRG32k3a$1 && MRG32k3a ) || MRG32k3a$1;

	/**
	 * @namespace Math
	 */


	const _MRG32k3a = new MRG32k3a$2();

	/**
	 * Better alternative to Math.random based on MRG32k2a algorithm
	 *
	 * @see {@link http://www.iro.umontreal.ca/~lecuyer/myftp/papers/streams00.pdf|PDF paper about it}
	 * @returns {number} Random float number between 0 and 1
	 */
	Math.rand = function() {
	  return _MRG32k3a();
	};

	/**
	 * Round given number to given scale
	 *
	 * @param num {number} Number to round
	 * @param scale {number} Scale
	 * @returns {number} Rounded number
	 */
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

	/**
	 * Calculate median of given array of numbers
	 *
	 * @param values {number[]} Array of numbers
	 * @returns {number} Median
	 */
	Math.median = function(values) {
	  if(values.length === 0) {
	    return 0;
	  }

	  values.sort((a,b) => a - b);

	  var half = Math.floor(values.length / 2);
	  return values.length % 2 ? values[half] : (values[half - 1] + values[half]) / 2;
	};

	/**
	 * Sum given array of numbers
	 *
	 * @param values {number[]} Array of numbers
	 * @returns {number} Sum
	 */
	Math.sum = function(values) {
	  if(values.length === 0) {
	    return 0;
	  }

	  return values.reduce((a, b) => a + b);
	};

	/**
	 * Calculate average of given array of numbers
	 *
	 * @param values {number[]} Array of numbers
	 * @returns {number} Average
	 */
	Math.avg = function(values) {
	  if(values.length === 0) {
	    return 0;
	  }

	  return Math.sum(values) / values.length;
	};

	/**
	 * @namespace RegExp
	 */

	/**
	 * Escape given string so it can be safely used in RegExp
	 *
	 * @param str {string} String to be escaped
	 * @returns {string} Escaped string
	 */
	RegExp.escapeString = function(str) {
	  return str.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&");
	};

	/**
	 * @namespace JSON
	 */

	/**
	 * Returns verdict if given string is valid JSON or not
	 *
	 * @returns {boolean} Verdict
	 */
	JSON.isJSONString = function(str) {
	  try {
	    JSON.parse(str);
	  } catch(e) {
	    return false;
	  }
	  return true;
	};

	/**
	 * @namespace Promise
	 */

	/**
	 * Returns verdict if given subject is Promise or not
	 *
	 * @param subject {*} Subject of examination
	 * @returns {boolean} Verdict
	 */
	Promise.isPromise = function(subject) {
	  return typeof subject === 'object' && (subject instanceof Promise || typeof subject.then === 'function');
	};

	/**
	 * Creates a new FileSize
	 *
	 * @param bytes {number} Number of bytes
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
	  this.toReadableString = function() {
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
	FileSize.B  = 1;

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
	 * @param bytes {number} Number of bytes
	 * @returns {string} Human-readable file size string
	 */
	FileSize.getReadableString = function(bytes) {
	  var i;

	  for (i = 0; i < FileSize.UNITS.length; i++) {
	    if(bytes < 1000) break;
	    bytes /= 1024;
	  }

	  return parseFloat(bytes).toFixed(1) + FileSize.UNITS[i];
	};

	commonjsGlobal.FileSize = FileSize;

})));

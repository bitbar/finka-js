/**
 * Flag if environment is Node JS
 *
 * @global
 * @type {boolean}
 */
global.isNodeJs = typeof global.module != 'undefined' && typeof global.module.exports != 'undefined';

/**
 * Get ISO 639-1 language string
 *
 * @global
 * @returns {string} ISO 639-1 language string
 */
global.getLanguage = function() {
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
global.getCountry = function() {
  if(typeof global.userCountry != 'undefined') {
    return global.userCountry;
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
global.isNumeric = function(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
};

/**
 * Parse value to proper type
 *
 * @global
 * @param value {*} Value to be parsed
 * @returns {*} Parsed value
 */
global.parseValue = function(value) {
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
global.md5 = require('./md5');

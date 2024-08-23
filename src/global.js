/**
 * Flag if environment is Node JS
 *
 * @global
 * @type {boolean}
 */
const isNodeJs = global.process && global.process.release && global.process.release.name === 'node';

/**
 * Get ISO 639-1 language string
 *
 * @global
 * @returns {string} ISO 639-1 language string
 */
function getLanguage() {
  let lang;

  if(global.isNodeJs) {
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
  if(typeof global.userCountry !== 'undefined') {
    return global.userCountry;
  }

  let country;

  if(global.isNodeJs) {
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

  const countryMatch = country.match(/^[a-z]{2}[_-]([A-Z]{2})/);
  if(countryMatch !== null) {
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
function parseValue(value) {
  // check if it's even a string
  if(typeof value !== 'string') {
    return value;
  }

  // check if it's number
  if (global.isNumeric(value)) {
    return parseFloat(value);
  }

  // check if it's a boolean
  const _value = value.toLowerCase();
  if (_value === 'true' || _value === 'false') {
    return _value === 'true';
  }

  // add more check here if you want

  // return not parsed value in the end
  return value;
}

/**
 * MD5
 *
 * @global
 * @method
 * @param {string} String to be hashed
 * @returns {string} Hash
 */
import md5 from'./md5';


export default  {
  constant: {
    isNodeJs
  },

  static: {
    getLanguage,
    getCountry,
    isNumeric,
    parseValue,
    md5
  }
};

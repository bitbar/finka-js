/**
 * @namespace Number
 */

/**
 * Check if given number is number
 *
 * @memberof Number
 * @param {number} n Number to check
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
function isFloat(n){
  return Number.isNumber(n) && n % 1 !== 0;
}

/**
 * Returns string padded with leading zeros to length equal given length
 *
 * @memberof Number.prototype
 * @param {number} padding Length to which should be number padded
 * @returns {string} Padded string
 */
function pad(padding) {
  var value = this.toString();
  var pointIndex = value.indexOf('.');
  var toAdd = padding;

  if(pointIndex > -1) {
    toAdd -= pointIndex;
  } else {
    toAdd -= value.length;
  }

  for(var i = 0; i < toAdd; i++) {
    value = '0' + value;
  }

  return value;
}


module.exports = {
  static: {
    isNumber,
    isNegativeZero,
    isInteger,
    isNatural,
    isFloat
  },

  method: {
    pad
  }
};

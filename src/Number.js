/**
 * @namespace Number
 */

/**
 * Check if given number is number
 *
 * @param {number} n Number to check
 * @returns {boolean} Verdict
 */
Number.isNumber = function(n) {
  return n === Number(n);
};

/**
 * Check if given number is negative zero (-0)
 * 
 * @param {number} n Number to check 
 * @returns {boolean} Verdict
 */
Number.isNegativeZero = function(n) {
  return 1 / n === -Infinity;
};

if(typeof Number.isInteger != 'function') {

  /**
   * Polyfill for ECMAScript 2015 for Number.isInteger
   *
   * @param {number} n Number to check
   * @returns {boolean} Verdict
   */
  Number.isInteger = function(n) {
    return Number.isNumber(n) && n % 1 === 0;
  };
}

/**
 * Check if given number is natural (this function assumes that 0 is also natural)
 *
 * @param {number} n Number to check
 * @returns {boolean} Verdict
 */
Number.isNatural = function(n) {
  return Number.isInteger(n) && n >= 0 && !Number.isNegativeZero(n);
};

/**
 * Check if given number is float
 *
 * @param {number} n Number to check
 * @returns {boolean} Verdict
 */
Number.isFloat = function(n){
  return Number.isNumber(n) && n % 1 !== 0;
};

/**
 * Returns string padded with leading zeros to length equal given length
 *
 * @param {number} padding Length to which should be number padded
 * @returns {string} Padded string
 */
Number.prototype.pad = function(padding) {
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
};

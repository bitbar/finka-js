/**
 * @namespace Number
 */

/**
 * Check if given number is integer
 *
 * @param {number} n Number to check
 * @returns {boolean} Verdict
 */
Number.isInt = function(n) {
  return Number(n) === n && n % 1 === 0;
};

/**
 * Check if given number is float
 *
 * @param {number} n Number to check
 * @returns {boolean} Verdict
 */
Number.isFloat = function(n){
  return n === Number(n) && n % 1 !== 0;
};

/**
 * Returns string padded with leading zeros to length equal given length
 *
 * @param {number} length Length to which should be number padded
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

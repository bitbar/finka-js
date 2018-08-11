/**
 * @namespace Math
 */

const MRG32k3a = require('./MRG32k3a');
const _MRG32k3a = new MRG32k3a();

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
    var sig = ""
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

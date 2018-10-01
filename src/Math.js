/**
 * @namespace Math
 */

var MRG32k3a = require('./MRG32k3a');
var _MRG32k3a = new MRG32k3a();

/**
 * Better alternative to Math.random based on MRG32k2a algorithm
 *
 * @see {@link http://www.iro.umontreal.ca/~lecuyer/myftp/papers/streams00.pdf|PDF paper about it}
 * @returns {number} Random float number between 0 and 1
 */
Math.rand = function() {
  return _MRG32k3a();
};

if(typeof Math.log10 != 'function') {

  /**
   * Polyfill for ECMAScript 2015 for Math.log10
   * https://www.ecma-international.org/ecma-262/6.0/#sec-math.log10
   *
   * @param {number} x X
   * @returns {number} Result
   */
  Math.log10 = function(x) {
    return Math.log(x) * Math.LOG10E;
  };

}

/**
 * Round given number to given precision
 * 
 * @param {number} num Number to be rounded
 * @param {number} precision Precision
 */
Math.roundTo = function(num, precision) {
  var magnitude = Math.pow(10, precision);
  return Math.round(num * magnitude) / magnitude;
};

/**
 * Calculate median of given array of numbers
 *
 * @param {number[]} values Array of numbers
 * @returns {number} Median
 */
Math.median = function(values) {
  if(values.length === 0) {
    return 0;
  }

  values.sort(function(a, b) { return a - b; });

  var half = Math.floor(values.length / 2);
  return values.length % 2 ? values[half] : (values[half - 1] + values[half]) / 2;
};

/**
 * Sum given array of numbers
 *
 * @param {number[]} values Array of numbers
 * @returns {number} Sum
 */
Math.sum = function(values) {
  if(values.length === 0) {
    return 0;
  }

  return values.reduce(function(a, b) { return a + b; });
};

/**
 * Calculate average of given array of numbers
 *
 * @param {number[]} values Array of numbers
 * @returns {number} Average
 */
Math.avg = function(values) {
  if(values.length === 0) {
    return 0;
  }

  return Math.sum(values) / values.length;
};

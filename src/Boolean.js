/**
 * @namespace Boolean
 */

/**
 * Returns result of logic XOR operation between a and b arguments
 *
 * @param {boolean} a A
 * @param {boolean} b B
 * @returns {boolean} Result
 */
Boolean.xor = function(a, b) {
  return !a !== !b;
};

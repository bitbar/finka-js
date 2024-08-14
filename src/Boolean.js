/**
 * @namespace Boolean
 */

/**
 * Returns result of logic XOR operation between a and b arguments
 *
 * @memberof Boolean
 * @param {boolean} a A
 * @param {boolean} b B
 * @returns {boolean} Result
 */
function xor(a, b) {
  return !a !== !b;
}


export default {
  static: {
    xor
  }
};

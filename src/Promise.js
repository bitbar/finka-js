/**
 * @namespace Promise
 */

/**
 * Returns verdict if given subject is Promise or not
 *
 * @param {*} subject Subject of examination
 * @returns {boolean} Verdict
 */
Promise.isPromise = function(subject) {
  return typeof subject === 'object' && (subject instanceof Promise || typeof subject.then === 'function');
};

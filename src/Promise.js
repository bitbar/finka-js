/**
 * @namespace Promise
 */

/**
 * Returns verdict if given subject is Promise or not
 *
 * @memberof Promise
 * @param {*} subject Subject of examination
 * @returns {boolean} Verdict
 */
function isPromise(subject) {
  return Object.isObject(subject) && (subject instanceof Promise || typeof subject.then === 'function');
}


module.exports = {
  static: {
    isPromise
  }
};

/**
 * @namespace Promise
 */

if(typeof Promise !== 'undefined') {

  /**
   * Returns verdict if given subject is Promise or not
   *
   * @param {*} subject Subject of examination
   * @returns {boolean} Verdict
   */
  Promise.isPromise = function(subject) {
    return Object.isObject(subject) && (subject instanceof Promise || typeof subject.then === 'function');
  };

}

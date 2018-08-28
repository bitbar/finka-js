/**
 * @namespace Object
 */

/**
 * Returns verdict if given subject is Object or not
 *
 * @param {*} subject Subject of examination
 * @returns {boolean} Verdict
 */
Object.isObject = function(subject) {
  return subject !== null && typeof subject === 'object';
};

/**
 * Copy key and values from src Object to dst  Object
 *
 * @param {Object} src Source
 * @param {Object} dst Destination
 * @param {(Array|null)} [what] What should be copied? By default those are all keys and values from source
 * @returns {void}
 */
Object.copy = function(src, dst, what) {
  var i;
  if(what == null || what.length == 0) {
    for(i in src) {
      dst[i] = src[i];
    }
  } else {
    for(i = 0; i < what.length; i++) {
      dst[what[i]] = src[what[i]];
    }
  }
};

/**
 * Returns verdict if subject match query
 *
 * @param {Object} subject Subject of examination
 * @param {Object|*} query Query - if object then will compare each key of query with subject,
 * otherwise will just use standard comparator
 * @returns {boolean} Verdict
 */
Object.isLike = function(subject, query) {
  var k, v;
  if(typeof query == 'object' && typeof subject == 'object') {
    for(k in query) {
      v = typeof subject[k] == 'function' ? subject[k]() : subject[k];
      if(v !== query[k]) {
        return false;
      }
    }
  } else {
    if(subject !== query) {
      return false;
    }
  }
  return true;
};

/**
 * Count number of items in given subject
 *
 * @param {Object} subject Subject of examination
 * @returns {number} Number of items
 */
Object.count = function(subject) {
  var items = 0;
  for(var i in subject) {
    if(subject.hasOwnProperty(i)) {
      items += 1;
    }
  }
  return items;
};

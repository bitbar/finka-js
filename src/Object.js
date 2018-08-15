/**
 * @namespace Object
 */

/**
 * Returns verdict if given subject is Object or not
 *
 * @param subject {*} Subject of examination
 * @returns {boolean} Verdict
 */
Object.isObject = function(subject) {
  return subject !== null && typeof subject === 'object';
};

/**
 * Copy key and values from src Object to dst  Object
 *
 * @param src {Object} Source
 * @param dst {Object} Destination
 * @param [what] {(Array|null)} What should be copied? By default those are all keys and values from source
 */
Object.copy = function(src, dst, what) {
  if(what == null || what.length == 0) {
    for(var i in src) {
      dst[i] = src[i];
    }
  } else {
    for(var i = 0; i < what.length; i++) {
      dst[what[i]] = src[what[i]];
    }
  }
};

/**
 * Returns verdict if subject match query
 *
 * @param subject {Object} Subject of examination
 * @param query {Object|*} Query - if object then will compare each key of query with subject,
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
 * @param subject {Object} Subject of examination
 * @returns {number} Number of items
 */
Object.count = function(subject) {
  var items = 0;
  for(let i in subject) {
    if(subject.hasOwnProperty(i)) {
      items += 1;
    }
  }
  return items;
};

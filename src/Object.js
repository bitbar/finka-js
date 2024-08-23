/**
 * @namespace Object
 */

/**
 * Returns verdict if given subject is Object or not
 *
 * @memberof Object
 * @param {*} subject Subject of examination
 * @returns {boolean} Verdict
 */
function isObject(subject) {
  return subject !== null && typeof subject === 'object';
}

/**
 * Copy key and values from src Object to dst  Object
 *
 * @memberof Object
 * @param {Object} src Source
 * @param {Object} dst Destination
 * @param {(Array|null)} [what] What should be copied? By default, those are all keys and values from source
 * @returns {void}
 */
function copy(src, dst, what) {
  let i;
  if(what == null || what.length === 0) {
    for(i in src) {
      dst[i] = src[i];
    }
  } else {
    for(i = 0; i < what.length; i++) {
      dst[what[i]] = src[what[i]];
    }
  }
}

/**
 * Returns verdict if subject match query
 *
 * @memberof Object
 * @param {Object} subject Subject of examination
 * @param {Object|*} query Query - if object then will compare each key of query with subject,
 * otherwise will just use standard comparator
 * @returns {boolean} Verdict
 */
function isLike(subject, query) {
  let k, v;
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
}

/**
 * Count number of items in given subject
 *
 * @memberof Object
 * @param {Object} subject Subject of examination
 * @returns {number} Number of items
 */
function count(subject) {
  let items = 0;
  for(const i in subject) {
    if(subject.hasOwnProperty(i)) {
      items += 1;
    }
  }
  return items;
}

/**
 * Polyfill for ECMAScript 2017 for Object.values
 * https://www.ecma-international.org/ecma-262/8.0/#sec-object.values
 *
 * @memberof Object
 */
function values(o) {
  const obj = Object(o);
  const values = [];

  for(const k in obj) {
    values.push(obj[k]);
  }

  return values;
}

/**
 * Polyfill for ECMAScript 2015 for Object.assign
 * https://www.ecma-international.org/ecma-262/6.0/#sec-object.assign
 *
 * @memberof Object
 */
function assign() {
  const args = Array.prototype.slice.call(arguments, 0);
  const to = Object(args[0]);

  if(args.length !== 1) {
    const sources = args.slice(1);
    let nextSource, keys, from, nextKey, propValue;

    for(let i = 0; i < sources.length; i++) {
      nextSource = sources[i];
      from = Object(nextSource);

      if(typeof nextSource === 'undefined' || nextSource === null) {
        keys = [];
      } else {
        keys = Object.keys(from);
      }

      for(let j = 0; j < keys.length; j++) {
        nextKey = keys[j];
        propValue = from[nextKey];
        if(typeof propValue !== 'undefined' && from.propertyIsEnumerable(nextKey)) {
          to[nextKey] = propValue;
        }
      }
    }
  }

  return to;
}

/**
 * This is similar to Object.assign, but extends also deep nested Objects
 *
 * @memberof Object
 * @returns {object} Object
 */
function deepAssign() {
  const args = Array.prototype.slice.call(arguments, 0);
  const to = Object(args[0]);

  if(args.length !== 1) {
    const sources = args.slice(1);
    let nextSource, keys, from, nextKey, propValue;

    for(let i = 0; i < sources.length; i++) {
      nextSource = sources[i];
      from = Object(nextSource);

      if(typeof nextSource === 'undefined' || nextSource === null) {
        keys = [];
      } else {
        keys = Object.keys(from);
      }

      for(let j = 0; j < keys.length; j++) {
        nextKey = keys[j];
        propValue = from[nextKey];
        if(typeof propValue !== 'undefined' && from.propertyIsEnumerable(nextKey)) {
          if(typeof to[nextKey] === 'object' && typeof propValue === 'object') {
            const areArrays = Array.isArray(to[nextKey]) && Array.isArray(propValue);

            to[nextKey] = Object.deepAssign({}, to[nextKey], propValue);

            if(areArrays) {
              to[nextKey] = Object.values(to[nextKey]);
            }
          } else {
            to[nextKey] = propValue;
          }
        }
      }
    }
  }

  return to;
}

/**
 * Clone an Object
 * @param {Object} o Object to clone
 */
function clone(o) {
  return JSON.parse(JSON.stringify(o));
}


export default {
  static: {
    isObject,
    copy,
    isLike,
    count,
    values,
    assign,
    deepAssign,
    clone
  }
};

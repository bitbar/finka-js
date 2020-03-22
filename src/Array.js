/**
 * @namespace Array
 */

/**
 * Sort array of objects
 *
 * @memberof Array
 * @param {Object[]} arr Array of objects that should be sorted
 * @param {string} propertyName Name of property by which sorting will be done
 * @param [descending=false] {boolean} Flag to sort in descending order
 */
function sortArrayOfObjects(arr, propertyName, descending) {
  var order = descending ? -1 : 1;
  var _a, _b;

  arr.sort(function(a, b) {
    _a = a[propertyName];
    _b = b[propertyName];

    if(typeof _a === 'string') {
      _a = _a.toLowerCase();
    }
    if(typeof _b === 'string') {
      _b = _b.toLowerCase();
    }

    if(_a > _b) {
      return order * 1;
    } else if(_a < _b) {
      return order * -1;
    }
    return 0;
  });
}

/**
 * Deep clone array of object
 *
 * @memberof Array
 * @param arr Array of objects
 * @returns {Object[]} Clone of arr
 */
function deepCloneArrayOfObjects(arr) {
  return arr.map(function(obj) {
    return Object.assign({}, obj);
  });
}

/**
 * Wrap in Array if @param is not an Array already
 *
 * @memberof Array
 * @param {(*|Array)} something Something that should be an Array
 * @returns {Array}
 */
function wrap(something) {
  return Array.isArray(something) ? something : [something];
}

/**
 * Empty this Array
 *
 * @memberof Array.prototype
 * @returns {Array} this
 */
function empty() {
  this.length = 0;
  return this;
}

/**
 * Absorb (push) every item of given array to this Array
 *
 * @memberof Array.prototype
 * @param {Array} arr Array to be absorbed
 * @returns {Array} this
 */
function absorb(arr) {
  this.push.apply(this, arr);
  return this;
}

/**
 * Returns the difference between this Array and given in argument
 *
 * @memberof Array.prototype
 * @param {Array} arr Array to compare
 * @returns {Array} Array with elements that are different
 */
function diff(arr) {
  return this.filter(function(i) { return arr.indexOf(i) < 0; });
}

/**
 * Clone this Array
 *
 * @memberof Array.prototype
 * @returns {Array} Clone of this Array
 */
function clone() {
  return this.slice(0);
}

/**
 * Look for index of item matching to query
 *
 * @memberof Array.prototype
 * @param {Object} query Query
 * @returns {number} Index of matching index; -1 if not found
 */
function lookFor(query) {
  for(var i = 0; i < this.length; i++) {
    if(Object.isLike(this[i], query)) {
      return i;
    }
  }

  return -1;
}

/**
 * Returns the new array based on current one by filtering according to query
 *
 * @memberof Array.prototype
 * @see Object#isLike
 * @param {Object} query Query
 * @returns {Array} New Array with matching elements
 */
function filterLike(query) {
  if(typeof query === 'undefined') {
    return [];
  }

  return this.filter(function(item) {
    return Object.isLike(item, query);
  });
}

/**
 * Unique this Array - remove all duplicate items
 *
 * @memberof Array.prototype
 * @returns {Array} this
 */
function unique() {
  for(var i = 0; i < this.length; ++i) {
    for(var j = i + 1; j < this.length; ++j) {
      if(this[i] === this[j]) {
        this.splice(j--, 1);
      }
    }
  }

  return this;
}

/**
 * Shuffle this Array
 *
 * @memberof Array.prototype
 * @returns {Array} this
 */
function shuffle() {
  for (var i = this.length - 1; i > 0; i--) {
    var j = Math.floor(Math.rand() * (i + 1));
    var temp = this[i];
    this[i] = this[j];
    this[j] = temp;
  }

  return this;
}


module.exports = {
  static: {
    sortArrayOfObjects,
    deepCloneArrayOfObjects,
    wrap
  },

  method: {
    empty,
    absorb,
    diff,
    clone,
    lookFor,
    filterLike,
    unique,
    shuffle
  }
};

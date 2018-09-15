/**
 * @namespace Array
 */

/**
 * Sort array of objects
 *
 * @param {Object[]} arr Array of objects that should be sorted
 * @param {string} propertyName Name of property by which sorting will be done
 * @param [descending=false] {boolean} Flag to sort in descending order
 */
Array.sortArrayOfObjects = function(arr, propertyName, descending) {
  var _a, _b;

  if(descending == null) {
    descending = false;
  }
  descending = descending ? -1 : 1;

  arr.sort(function(a, b) {
    _a = a[propertyName];
    _b = b[propertyName];

    if(typeof _a == 'string') {
      _a = _a.toLowerCase();
    }
    if(typeof _b == 'string') {
      _b = _b.toLowerCase();
    }

    if(_a > _b) {
      return descending * 1;
    } else if(_a < _b) {
      return descending * -1;
    }
    return 0;
  });
};

/**
 * Deep clone array of object
 *
 * @param arr Array of objects
 * @returns {Object[]} Clone of arr
 */
Array.deepCloneArrayOfObjects = function(arr) {
  return arr.map(function(obj) {
    return Object.assign({}, obj);
  });
};

/**
 * Wrap in Array if @param is not an Array already
 *
 * @param {(*|Array)} something Something that should be an Array
 * @returns {Array}
 */
Array.wrap = function(something) {
  return Array.isArray(something) ? something : [something];
};

/**
 * Empty this Array
 *
 * @returns {Array} this
 */
Array.prototype.empty = function() {
  this.length = 0;
  return this;
};

/**
 * Absorb (push) every item of given array to this Array
 *
 * @param {Array} arr Array to be absorbed
 * @returns {Array} this
 */
Array.prototype.absorb = function(arr) {
  this.push.apply(this, arr);
  return this;
};

/**
 * Returns the difference between this Array and given in argument
 *
 * @param {Array} arr Array to compare
 * @returns {Array} Array with elements that are different
 */
Array.prototype.diff = function(arr) {
  return this.filter(function(i) { return arr.indexOf(i) < 0; });
};

/**
 * Clone this Array
 *
 * @returns {Array} Clone of this Array
 */
Array.prototype.clone = function() {
  return this.slice(0);
};

/**
 * Look for index of item matching to query
 *
 * @param {Object} query Query
 * @returns {number} Index of matching index; -1 if not found
 */
Array.prototype.lookFor = function(query) {
  for(var i = 0; i < this.length; i++) {
    if(Object.isLike(this[i], query)) {
      return i;
    }
  }

  return -1;
};

/**
 * Returns the new array based on current one by filtering according to query
 *
 * @see Object#isLike
 * @param {Object} query Query
 * @returns {Array} New Array with matching elements
 */
Array.prototype.filterLike = function(query) {
  if(query == null) {
    return [];
  }
  
  return this.filter(function(item) {
    return Object.isLike(item, query);
  });
};

/**
 * Unique this Array - remove all duplicate items
 *
 * @returns {Array} this
 */
Array.prototype.unique = function() {
  for(var i = 0; i < this.length; ++i) {
    for(var j = i + 1; j < this.length; ++j) {
      if(this[i] === this[j]) {
        this.splice(j--, 1);
      }
    }
  }

  return this;
};

/**
 * Shuffle this Array
 *
 * @returns {Array} this
 */
Array.prototype.shuffle = function() {
  for (var i = this.length - 1; i > 0; i--) {
    var j = Math.floor(Math.rand() * (i + 1));
    var temp = this[i];
    this[i] = this[j];
    this[j] = temp;
  }

  return this;
};

/**
 * @namespace String
 */

/**
 * Calculate edit distance between string a and b
 *
 * @memberof String
 * @see {@link https://en.wikipedia.org/wiki/Edit_distance|Article on Wikipedia}
 * @param {string} a A
 * @param {string} b B
 * @returns {number} Distance
 */
function editDistance(a, b) {
  var matrix = [], i, j;

  if(a.length === 0) { return b.length; }
  if(b.length === 0) { return a.length; }
  if(a === b) { return 0; }

  // increment along the first column of each row
  for(i = 0; i <= b.length; i++) {
    matrix[i] = [i];
  }

  // increment each column in the first row
  for(j = 0; j <= a.length; j++){
    matrix[0][j] = j;
  }

  // Fill in the rest of the matrix
  for(i = 1; i <= b.length; i++){
    for(j = 1; j <= a.length; j++){
      if(b.charAt(i-1) === a.charAt(j-1)){
        matrix[i][j] = matrix[i-1][j-1];
      } else {
        matrix[i][j] = Math.min(matrix[i-1][j-1] + 1, // substitution
          Math.min(matrix[i][j-1] + 1, // insertion
            matrix[i-1][j] + 1)); // deletion
      }
    }
  }

  return matrix[b.length][a.length];
}

/**
 * Get similarity ratio based on edit distance
 *
 * @memberof String
 * @see {@link String.editDistance}
 * @param {string} a A
 * @param {string} b B
 * @returns {number} Ratio
 */
function getSimilarity(a, b) {
  var l = Math.max(a.length, b.length);
  return (l - String.editDistance(a, b)) / l;
}

/**
 * Returns string with capitalised first letter
 *
 * @memberof String.prototype
 * @param {boolean} [lower=false] Flag if should lower all letters first
 * @returns {string} New string
 */
function capitaliseFirstLetter(lower) {
  var value = this.valueOf();

  if(lower) {
    value = value.toLowerCase();
  }

  return value.replace(/[a-z]/i, function(m) { return m.toUpperCase(); });
}

/**
 * Returns string with lower first letter
 *
 * @memberof String.prototype
 * @returns {string} New string
 */
function lowerFirstLetter() {
  return this.valueOf().replace(/[a-z]/i, function(m) { return m.toLowerCase(); });
}

/**
 * Returns string with removed cases
 *
 * @memberof String.prototype
 * @returns {string} New string
 */
function noCase() {
  var value = this.valueOf();

  // detect capitalized snake case
  if(/^[A-Z0-9_]+$/.test(value)) {
    return value.replace(/_/g, ' ').toLowerCase();
  }

  // clean kebab and snake case
  value = value.replace(/[-_]/g, ' ');

  // clean special characters
  value = value.replace(/[^a-z0-9 ]/gi, '');

  // clean pascal case
  value = value.lowerFirstLetter();

  // clean camel case
  value = value.replace(/([A-Za-z])([0-9])/g, function(m, m1, m2) { return m1 + ' ' + m2; });
  value = value.replace(/[A-Z][a-z]/g, function(m) { return ' ' + m.toLowerCase(); });
  value = value.replace(/([a-z0-9])([A-Z])/g, function(m, m1, m2) { return m1 + ' ' + m2; });

  // minimize white spaces
  value = value.trim().replace(/\s{2,}/g, ' ');

  return value;
}

/**
 * Returns string in camelCase
 *
 * @memberof String.prototype
 * @returns {string} String in camelCase
 */
function toCamelCase() {
  var value = this.valueOf();

  // normalize
  value = value.noCase();

  // replace
  value = value.replace(/ [a-z0-9]/gi, function(m) { return m[1].toUpperCase(); });

  return value;
}

/**
 * Returns string in PascalCase
 *
 * @memberof String.prototype
 * @returns {string} String in PascalCase
 */
function toPascalCase() {
  return this.toCamelCase().capitaliseFirstLetter();
}

/**
 * Returns string in kebab-case
 *
 * @memberof String.prototype
 * @returns {string} String in kebab-case
 */
function toKebabCase() {
  var value = this.valueOf();

  // normalize
  value = value.noCase();

  // replace
  value = value.replace(/\s/g, '-');

  return value;
}

/**
 * Returns string in snake_case
 *
 * @memberof String.prototype
 * @param {boolean} [convertToUpperCase=false] Set this flag to convert to UpperCase
 * @returns {string} String in snake_case
 */
function toSnakeCase(convertToUpperCase) {

  var toUpperCase = convertToUpperCase || false;

  var value = this.valueOf();

  // normalize
  value = value.noCase();

  // replace
  value = value.replace(/\s/g, '_');

  if(toUpperCase) return value.toUpperCase();

  return value;
}

/**
 * Returns checksum crc32
 *
 * @memberof String.prototype
 * @author joelpt
 * @author schnaader
 * @see {@link https://stackoverflow.com/a/3276730|Stack Overflow Answer}
 * @returns {number} Checksum
 */
function toChecksum() {
  var value, i, chk;

  value = this.valueOf();
  chk = 0x12345678;

  for (i = 0; i < value.length; i++) {
    chk += value.charCodeAt(i) * (i + 1);
  }

  return chk;
}

/**
 * Returns string in boolean
 *
 * @memberof String.prototype
 * @returns {boolean} True if string looks somehow like 'true'
 */
function toBoolean() {
  return this.valueOf().toLowerCase() === 'true';
}

/**
 * Returns reversed string
 *
 * @memberof String.prototype
 * @returns {string} Reversed string
 */
function reverse() {
  return this.valueOf().split('').reverse().join('');
}

/**
 * Check if string is like given query (you can use regexp notation)
 *
 * @memberof String.prototype
 * @param {string} query Query
 * @returns {boolean} Verdict
 */
function isLike(query) {
  return new RegExp('^' + query + '$').test(this.valueOf());
}

/**
 * Polyfill for ECMAScript 2015 for String.prototype.includes
 *
 * @memberof String.prototype
 * @param {string} search Search for
 * @param {number} [start=0] Searching start position
 * @returns {boolean} Verdict
 */
function includes(search, start) {
  var _start = typeof start !== 'number' ? 0 : start;

  if (_start + search.length > this.length) {
    return false;
  }

  return this.indexOf(search, _start) !== -1;
}


module.exports = {
  static: {
    editDistance,
    getSimilarity
  },

  method: {
    capitaliseFirstLetter,
    lowerFirstLetter,
    noCase,
    toCamelCase,
    toPascalCase,
    toKebabCase,
    toSnakeCase,
    toChecksum,
    toBoolean,
    reverse,
    isLike,
    includes
  }
};

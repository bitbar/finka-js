/**
 * @namespace RegExp
 */

/**
 * Escape given string, so it can be safely used in RegExp
 *
 * @memberof RegExp
 * @param {string} str String to be escaped
 * @returns {string} Escaped string
 */
function escapeString(str) {
  return str.replace(/[-[\]/\\{}()*+?.^$|]/g, '\\$&');
}


export default {
  static: {
    escapeString
  }
};

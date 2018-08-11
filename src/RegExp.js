/**
 * @namespace RegExp
 */

/**
 * Escape given string so it can be safely used in RegExp
 *
 * @param str {string} String to be escaped
 * @returns {string} Escaped string
 */
RegExp.escapeString = function(str) {
  return str.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&");
};

/**
 * @namespace JSON
 */

/**
 * Returns verdict if given string is valid JSON or not
 *
 * @returns {boolean} Verdict
 */
JSON.isJSONString = function(str) {
  try {
    JSON.parse(str);
  } catch(e) {
    return false;
  }
  return true;
};

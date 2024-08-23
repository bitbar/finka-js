/**
 * @namespace JSON
 */

/**
 * Returns verdict if given string is valid JSON or not
 *
 * @memberof JSON
 * @param {string} str JSON string to be checked
 * @returns {boolean} Verdict
 */
function isJSONString(str) {
  try {
    JSON.parse(str);
  } catch {
    return false;
  }
  return true;
}


export default {
  static: {
    isJSONString
  }
};

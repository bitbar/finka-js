/**
 * Creates a new FileSize
 *
 * @param {number} bytes Number of bytes
 * @constructor
 */
function FileSize(bytes) {

  /**
   * Number of bytes
   * @type {number}
   */
  this.bytes = bytes;


  /**
   * Returns this.bytes as human-readable file size string
   *
   * @returns {string} Human-readable file size string
   */
  this.toReadableString = function() {
    return FileSize.getReadableString(this.bytes);
  };

}

/**
 * List of available size units
 *
 * @constant
 * @type {string[]}
 */
FileSize.UNITS = ['B', 'KB', 'MB', 'GB', 'TB', 'EB', 'ZB', 'YB'];

/**
 * 1B in bytes
 *
 * @constant
 * @type {number}
 */
FileSize.B = 1;

/**
 * 1KB in bytes
 *
 * @constant
 * @type {number}
 */
FileSize.KB = 1024 * FileSize.B;

/**
 * 1MB in bytes
 *
 * @constant
 * @type {number}
 */
FileSize.MB = 1024 * FileSize.KB;

/**
 * 1GB in bytes
 *
 * @constant
 * @type {number}
 */
FileSize.GB = 1024 * FileSize.MB;

/**
 * 1TB in bytes
 *
 * @constant
 * @type {number}
 */
FileSize.TB = 1024 * FileSize.GB;

/**
 * 1EB in bytes
 *
 * @constant
 * @type {number}
 */
FileSize.EB = 1024 * FileSize.TB;

/**
 * Returns human-readable file size string from given number of bytes
 *
 * @param {number} bytes Number of bytes
 * @returns {string} Human-readable file size string
 */
FileSize.getReadableString = function(bytes) {
  var i;
  var val = bytes;

  for (i = 0; i < FileSize.UNITS.length; i++) {
    if(val < 1000) break;
    val /= 1024;
  }

  return (i === 0 ? val : val.toFixed(1)) + FileSize.UNITS[i];
};


module.exports = FileSize;

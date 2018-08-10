String.editDistance = function(a, b) {
  var matrix = [], i, j;

  if(a.length === 0) { return b.length; }
  if(b.length === 0) { return a.length; }
  if(a == b) { return 0; }

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
      if(b.charAt(i-1) == a.charAt(j-1)){
        matrix[i][j] = matrix[i-1][j-1];
      } else {
        matrix[i][j] = Math.min(matrix[i-1][j-1] + 1, // substitution
          Math.min(matrix[i][j-1] + 1, // insertion
            matrix[i-1][j] + 1)); // deletion
      }
    }
  }

  return matrix[b.length][a.length];
};

String.getSimilarity = function(a, b) {
  var l = Math.max(a.length, b.length);
  return (l - String.editDistance(a, b) / 2) / l;
};


String.prototype.capitaliseFirstLetter = function(lower) {
  var value = this.valueOf();

  if(lower) {
    value = value.toLowerCase();
  }

  return value.replace(/[a-z]/i, (m) => m.toUpperCase());
};

String.prototype.lowerFirstLetter = function() {
  return this.valueOf().replace(/[a-z]/i, (m) => m.toLowerCase());
};

String.prototype.toCamelCase = function() {
  var value, arr, ret, i;
  value = this.valueOf();

  if(value.indexOf('-') < 0) {
    return value;
  }

  arr = value.split('-');
  ret = arr[0];
  for(i = 1; i < arr.length; i++) {
    ret += arr[i].capitaliseFirstLetter();
  }

  return ret;
};

String.prototype.toPascalCase = function() {
  return this.toCamelCase().capitaliseFirstLetter();
};

String.prototype.toKebabCase = function() {
  return this.valueOf().trim().toLowerCase().replace(/\s/g, '-');
};

// Checksum CRC32 - By schnaader (MIT Licensed)
String.prototype.toChecksum = function() {
  var value, i, chk;

  value = this.valueOf();
  chk = 0x12345678;

  for (i = 0; i < value.length; i++) {
    chk += value.charCodeAt(i) * (i + 1);
  }

  return chk;
};

String.prototype.reverse = function() {
  return this.valueOf().split('').reverse().join('');
};

String.prototype.toBoolean = function() {
  return this.valueOf().toLowerCase() === 'true';
};

String.prototype.isLike = function(str) {
  return new RegExp('^' + str + '$').test(this.valueOf());
};

if(typeof String.prototype.includes != 'function') {
  String.prototype.includes = function(str) {
    return this.valueOf().indexOf(str) > -1;
  }
}

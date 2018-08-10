global.isNodeJs = typeof global.module != 'undefined' && typeof global.module.exports != 'undefined';

global.isJSONString = function(str) {
  try {
    JSON.parse(str);
  } catch(e) {
    return false;
  }
  return true;
};

global.getLanguage = function() {
  if(isNodeJs) {
    var lang = process.env.LANG || process.env.LANGUAGE || process.env.LC_ALL || process.env.LC_MESSAGES;
    return lang.replace(/^([a-z]{2})_([A-Z]{2}).+$/, (m, m1, m2) => m1 + '-' + m2);
  } else {
    return navigator.language;
  }
};

global.getCountry = function() {
  return getLanguage().substr(0, 2).toUpperCase();
};

global.parseValue = function(value) {
  // check if it's even a string
  if(typeof value != 'string') {
    return value;
  }

  // check if it's number
  if (isNumeric(value)) {
    return parseFloat(value);
  }

  // check if it's a boolean
  var _value = value.toLowerCase();
  if (_value === 'true' || _value === 'false') {
    return _value === 'true';
  }

  // add more check here if you want

  // return unparsed value in the end
  return value;
};

global.xor = function(a, b) {
  return !a != !b;
};

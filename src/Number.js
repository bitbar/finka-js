global.isNumeric = function(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
};

Number.isInt = function(n){
  return Number(n) === n && n % 1 === 0;
};

Number.isFloat = function(n){
  return n === Number(n) && n % 1 !== 0;
};

Number.prototype.pad = function(n) {
  var value, i, toAdd;

  value = this.toString();
  toAdd = n - value.length;

  for(i = 0; i < toAdd; i++) {
    value = '0' + value;
  }

  return value;
};

// not sure if it should be here or in Date
Number.prototype.toClockString = function(inSeconds) {
  var value, minutes, seconds;

  value = this.valueOf();

  if(typeof inSeconds == 'undefined') {
    inSeconds = false;
    // if inSeconds param is set to true, then value will be treated as seconds
    // by default value is treated as milliseconds
  }

  if(!inSeconds) {
    value = Math.round(value/1000);
  }

  minutes = Math.floor(value/60);
  seconds = Math.floor(value-minutes*60);

  return minutes.pad(2)+':'+seconds.pad(2);
};

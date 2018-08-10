Date.SECOND = 1000;
Date.MINUTE = 60 * Date.SECOND;
Date.HOUR   = 60 * Date.MINUTE;
Date.DAY    = 24 * Date.HOUR;
Date.WEEK   = 7  * Date.DAY;

Date.TODAY            = Date.HOUR * Math.floor( Date.now() / Date.HOUR );
Date.YESTERDAY        = Date.TODAY - Date.DAY;
Date.TOMORROW         = Date.TODAY + Date.DAY;
Date.DAYAFTERTOMORROW = Date.TOMORROW + Date.DAY;

Date.daysFromNow = function(days) {
  return Date.now() + Date.DAY * days;
};

Date.getFormat = function(full) {
  var ymd, mdy, countryCode, format;

  if(typeof full == 'undefined') {
    full = true;
  }

  ymd = ['AF', 'CN', 'HU', 'JP', 'KP', 'KR', 'LT', 'MN', 'TW'];
  mdy = ['BZ', 'FM', 'US'];

  try {
    countryCode = getCountry() || 'US';
  } catch(e) {
    countryCode = 'US';
  }

  if(ymd.indexOf(countryCode) >= 0) {
    format = 'y-m-d';
  } else if(mdy.indexOf(countryCode) >= 0) {
    format = 'm/d/y';
  } else {
    format = 'd.m.y';
  }

  if(full == true) {
    format = format.replace('d', 'dd');
    format = format.replace('m', 'mm');
    format = format.replace('y', 'yyyy');
  }

  return format;
};

Date.getTimezoneName = function() {
  return new this().toString().match(/\(([^)]+)\)$/)[1];
};

Date.toHmsFormat = function(time, round, accuracy, inSeconds) {
  var h, m, s, seconds = 0, ret,
    format, setRet;

  if(typeof round == 'undefined') {
    round = 'round';
  }
  if(typeof accuracy == 'undefined') {
    accuracy = 'seconds';
  }

  format = function(value, suffix){
    return value > 0 ? value + suffix : '';
  };

  setRet = function() {
    ret = (h + m + s).trim();
  };

  time = parseInt(time);
  if(typeof inSeconds != 'undefined' && inSeconds){
    seconds = time;
  } else {
    seconds = Math.round(time / 1000);
  }

  if (accuracy == 'hours'){
    h = format(Math[round](seconds / 3600), 'h ');
    m = format(0, 'm ');
    s = format(0 + 's');

    setRet();
    if(ret.length == 0) {
      ret = '0h';
    }

  } else if (accuracy == 'minutes'){
    h = format(Math.floor(seconds / 3600), 'h ');
    m = format(Math[round](seconds % 3600 / 60), 'm ');
    s = format(0 + 's');

    setRet();
    if(ret.length == 0) {
      ret = '0m';
    }

  } else { // accuracy == "seconds"
    h = format(Math.floor(seconds / 3600), 'h ');
    m = format(Math.floor(seconds % 3600 / 60), 'm ');
    s = Math[round](seconds % 3600 % 60) + 's';

    setRet();
    if(ret.length == 0) {
      ret = '0s';
    }

  }

  return ret;
};

Date.toStopwatchFormat = function(time) {
  // [HH:]MM:SS.XXX

  var ms, s, m, h, ret;

  ms = Math.max(0, time % 1000);
  time -= ms;
  ms = Math.floor(ms / 100);

  time /= 1000;
  s = Math.max(0, time % 60);
  time -= s;

  time /= 60;
  m = Math.max(0, time % 60);
  time -= m;

  time /= 60;
  h = Math.max(0, time);

  ret = m.pad(2) + ':' + s.pad(2) + '.' + ms;
  if(h > 0) {
    ret = h.pad(2) + ':' + ret;
  }

  return ret;
};

Date.prototype.daysPassed = function(toDate) {
  if(typeof toDate == 'undefined') {
    toDate = new Date();
  } else if(typeof toDate == 'number' || typeof toDate == 'string') {
    toDate = new Date(toDate);
  }

  if(!(toDate instanceof Date)) {
    throw 'Date.daysPassed: toDate is not instance of Date';
  }

  return Math.floor(Math.abs((this.getTime() - toDate.getTime()) / 86400000));
};


Date.prototype.toUiTime = function(showSeconds) {
  if(typeof showSeconds == 'undefined') {
    showSeconds = true;
  }

  if(showSeconds) {
    showSeconds = ':' + this.getSeconds().pad(2);
  } else {
    showSeconds = '';
  }

  return this.getHours().pad(2)+':'+this.getMinutes().pad(2)+showSeconds;
};

Date.prototype.toCustomDate = function(format) {
  format = format.replace('d', this.getDate().pad(2));
  format = format.replace('m', (this.getMonth()+1).pad(2));
  format = format.replace('y', this.getFullYear());

  return format;
};
Date.prototype.toUiDate = function() {
  return this.toCustomDate(Date.getFormat(false));
};

Date.prototype.toUiDateTime = function(showSeconds) {
  return this.toUiDate()+' '+this.toUiTime(showSeconds);
};

Date.prototype.toInputDateFormat = function() {
  return this.toCustomDate('y-m-d');
};
Date.prototype.toInputTimeFormat = function() {
  return this.toUiTime(false);
};

Date.prototype.addTime = function(time) {
  return this.setTime( this.getTime() + time );
};

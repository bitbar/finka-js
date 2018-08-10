Array.prototype.empty = function() {
  this.length = 0;
  return this;
};

Array.prototype.absorb = function(arr) {
  this.push.apply(this, arr);
  return this;
};

Array.prototype.diff = function(arr) {
  return this.filter((i) => arr.indexOf(i) < 0);
};

Array.prototype.clone = function() {
  return this.slice(0);
};

Array.prototype.lookFor = function(query) {
  var i;

  for(i = 0; i < this.length; i++) {
    if(Object.isLike(this[i], query)) {
      return i;
    }
  }

  return -1;
};

Array.prototype.filterLike = function(query) {
  var i, ret;

  if(query == null) {
    return this;
  }

  ret = [];
  for(i = 0; i < this.length; i++) {
    if(Object.isLike(this[i], query)) {
      ret.push(this[i]);
    }
  }

  return ret;
};

Array.prototype.unique = function() {
  var a = this.concat();
  for(var i=0; i<a.length; ++i) {
    for(var j=i+1; j<a.length; ++j) {
      if(a[i] === a[j])
        a.splice(j--, 1);
    }
  }

  return a;
};

Array.prototype.shuffle = function() {
  for (var i = this.length - 1; i > 0; i--) {
    var j = Math.floor(Math.rand() * (i + 1));
    var temp = this[i];
    this[i] = this[j];
    this[j] = temp;
  }
};

Array.sortArrayOfObjects = function(arr, propertyName, inverted) {
  var _a, _b;

  if(inverted == null) {
    inverted = false;
  }
  inverted = inverted ? -1 : 1;

  arr.sort(function(a, b) {
    _a = a[propertyName];
    _b = b[propertyName];

    if(typeof _a == 'string') {
      _a = _a.toLowerCase();
    }
    if(typeof _b == 'string') {
      _b = _b.toLowerCase();
    }

    if(_a > _b) {
      return inverted * 1;
    } else if(_a < _b) {
      return inverted * -1;
    }
    return 0;
  });
};

Array.cloneArrayOfObjects = function(arr) {
  return arr.map(function(obj) {
    return $.extend({}, obj);
  });
};

// Wrap in Array if needed
Array.wrap = function(val) {
  return Array.isArray(val) ? val : [val];
};

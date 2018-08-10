Object.copy = function(src, dst, what) {
  if(what == null || what.length == 0) {
    for(var i in src) {
      dst[i] = src[i];
    }
  } else {
    for(var i = 0; i < what.length; i++) {
      dst[what[i]] = src[what[i]];
    }
  }

};

Object.isLike = function(subject, query) {
  var k, v;
  if(typeof query == 'object' && typeof subject == 'object') {
    for(k in query) {
      v = typeof subject[k] == 'function' ? subject[k]() : subject[k];
      if(v !== query[k]) {
        return false;
      }
    }
  } else {
    if(subject !== query) {
      return false;
    }
  }
  return true;
};

Object.count = function(obj) {
  var size = 0;
  for(let i in obj) {
    if(obj.hasOwnProperty(i)) {
      size += 1;
    }
  }
  return size;
};

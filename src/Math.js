const MRG32k3a = require('./MRG32k3a');

global.md5 = require('./md5');

Math.MRG32k2a = new MRG32k3a();

Math.rand = function() {
  return this.MRG32k2a();
};

Math.roundTo = function(num, scale) {
  if(!("" + num).includes("e")) {
    return +(Math.round(num + "e+" + scale)  + "e-" + scale);
  } else {
    var arr = ("" + num).split("e");
    var sig = ""
    if(+arr[1] + scale > 0) {
      sig = "+";
    }
    return +(Math.round(+arr[0] + "e" + sig + (+arr[1] + scale)) + "e-" + scale);
  }
};

Math.median = function(values) {
  if(values.length === 0) {
    return 0;
  }

  values.sort(function(a,b) {
    return a - b;
  });

  var half = Math.floor(values.length / 2);
  return values.length % 2 ? values[half] : (values[half - 1] + values[half]) / 2;
};

Math.sum = function(values) {
  if(values.length === 0) {
    return 0;
  }

  return values.reduce(function(a, b) { return a + b; });
};

Math.avg = function(values) {
  if(values.length === 0) {
    return 0;
  }

  return Math.sum(values) / values.length;
};

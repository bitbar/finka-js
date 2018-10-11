// remove all orginal methods that should be polyfilled if missing
String.prototype.includes = undefined;
Object.values = undefined;
Object.assign = undefined;
Number.isInteger = undefined;
Math.log10 = undefined;

// require 
require('../dist/finka');

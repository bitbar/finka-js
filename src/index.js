/* eslint-disable no-undef */
const extensions = {
  global: require('./global'),
  Array: require('./Array'),
  Boolean: require('./Boolean'),
  Date: require('./Date'),
  JSON: require('./JSON'),
  Math: require('./Math'),
  Number: require('./Number'),
  Object: require('./Object'),
  Promise: require('./Promise'),
  RegExp: require('./RegExp'),
  String: require('./String'),
};

const libraries = {
  FileSize: require('./FileSize'),
};


function finka() {
  // Enable extensions
  for (let extName in extensions) {
    let ext = extensions[extName];
    let target = global[extName];

    // constant
    if (typeof ext.constant !== 'undefined') {
      for (let name in ext.constant) {
        if (typeof target[name] === 'undefined') {
          target[name] = ext.constant[name];
        }
      }
    }

    // getter
    if (typeof ext.getter !== 'undefined') {
      for (let name in ext.getter) {
        if (typeof target[name] === 'undefined') {
          Object.defineProperty(target, name, {
            get: ext.getter[name]
          });
        }
      }
    }

    // static
    if (typeof ext.static !== 'undefined') {
      for (let name in ext.static) {
        if (typeof target[name] === 'undefined') {
          target[name] = ext.static[name].bind(target);
        }
      }
    }

    // method
    if (typeof ext.method !== 'undefined') {
      for (let name in ext.method) {
        if (typeof target.prototype[name] === 'undefined') {
          target.prototype[name] = ext.method[name];
        }
      }
    }
  }


  // Enable libraries
  for (let libName in libraries) {
    if (typeof global[libName] === 'undefined') {
      global[libName] = libraries[libName];
    }
  }

}

module.exports = finka;

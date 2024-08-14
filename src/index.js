import globalExt from './global';
import ArrayExt from './Array';
import BooleanExt from './Boolean';
import DateExt from './Date';
import JSONExt from './JSON';
import MathExt from './Math';
import NumberExt from './Number';
import ObjectExt from './Object';
import PromiseExt from './Promise';
import RegExpExt from './RegExp';
import StringExt from './String';
import FileSizeExt from './FileSize';

const extensions = {
  global: globalExt,
  Array: ArrayExt,
  Boolean: BooleanExt,
  Date: DateExt,
  JSON: JSONExt,
  Math: MathExt,
  Number: NumberExt,
  Object: ObjectExt,
  Promise: PromiseExt,
  RegExp: RegExpExt,
  String: StringExt
};

const libraries = {
  FileSize: FileSizeExt
};


function finka() {
  // Enable extensions
  for (let extName in extensions) {
    let ext = extensions[extName];
    let target = extName === 'global' ? global : global[extName];

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

export default finka;

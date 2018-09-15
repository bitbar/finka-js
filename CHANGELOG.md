#### 1.2.0 (2018-09-15)

* `Number`

  * added `isNumber` static method
  * static method `isInt` has been renamed to `isInteger` and now is Polyfill to
    [ES2015 method](https://www.ecma-international.org/ecma-262/6.0/#sec-isinteger)
  * added `isNatural` static method

* `Object`

  * added `assign` which is Polyfill to
    [ES2015 method](https://www.ecma-international.org/ecma-262/6.0/#sec-object.assign)
  * added `deepAssign` which is similar to `assign`, but extends also deep nested Objects

* `Array`

  * added tests for all methods

* added this CHANGELOG file

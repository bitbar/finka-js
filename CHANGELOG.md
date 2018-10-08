#### 1.2.3 (2018-10-07)

* `String`

  * fixed `getSimilarity` static method
  * fixed `toCamelCase` method

* `Date`

  * fixed `daysFromNow` test


#### 1.2.2 (2018-09-21)

* `FileSize`

  * fixed `getReadableString` static method
  * added tests

* `JSON`

  * added tests

* `Math`

  * added `log10` which is Polyfill to
    [ES2015 method](https://www.ecma-international.org/ecma-262/6.0/#sec-math.log10)
  * added tests


#### 1.2.1 (2018-09-20)

* `Date`

  * fixed `TODAY` constant
  * `TODAY`, `YESTERDAY`, `TOMORROW` and `DAYAFTERTOMORROW` are now getters - you use them as normal variables, but
    are calculated on the fly
  * added tests

* added [Coveralls](https://coveralls.io/github/bitbar/finka-js?branch=master) support


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

  * added tests

* added this CHANGELOG file

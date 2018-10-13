#### 1.3.1 (2018-10-13)

* added missing tests for branches according to
  [instanbul](https://github.com/gotwarlost/istanbul) coverage report
* fixing minor issues


#### 1.3.0 (2018-10-11)

* `Math`

  * added missing tests

* `Number`

  * added missing tests
  * added static method `isNegativeZero`

* `Object`

  * added tests
  * added `values` which is Polyfill to
    [ES2017 method](https://www.ecma-international.org/ecma-262/8.0/#sec-object.values)

* `Promise`

  * added tests

* `RegExp`

  * added tests

* `String`

  * added missing tests


#### 1.2.3 (2018-10-07)

* `String`

  * fixed `getSimilarity` static method
  * fixed `toCamelCase` method
  * added `toSnakeCase` method
  * added test to this method

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

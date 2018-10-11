<p align="center">
  <img src="https://raw.githubusercontent.com/bitbar/finka-js/master/_static/logo.png"
       alt="Finka.js"
       title="Finka.js" />
</p>

# Finka.js

[![Build Status](https://img.shields.io/travis/com/bitbar/finka-js/master.svg)](https://travis-ci.com/bitbar/finka-js)
[![Coverage Status](https://img.shields.io/coveralls/github/bitbar/finka-js/master.svg)](https://coveralls.io/github/bitbar/finka-js?branch=master)
[![Language grade: JavaScript](https://img.shields.io/lgtm/grade/javascript/g/bitbar/finka-js.svg)](https://lgtm.com/projects/g/bitbar/finka-js/context:javascript)
[![Current Release](https://img.shields.io/github/release/bitbar/finka-js.svg)](releases)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE.md)

Handy tool in nowadays JavaScript jungle.

It's extending default JS classes like `Array` or `String` with new handy methods,
that probably sooner or later you are going to search for on Stack Overflow ;) 


## What means _Finka_?

_Finka_ is Polish word and means a knife usually used by scouts. It's also abbreviation to _nóż fiński_ so _Finnish knife_.
According to _Wikipedia_ it's originally really Finnish knife called [Puukko](https://en.wikipedia.org/wiki/Puukko).

[Bitbar](https://bitbar.com/) is Finnish company responsible for [Bitbar Cloud](https://bitbar.com/testing/),
which hosts hundreds of Android and iOS devices, enabling users to create and test high quality mobile apps and games.
Main R&D team is in Wrocław, Poland.


## Getting Started

### Prerequisites

This package is using [UMD](https://github.com/umdjs/umd/blob/master/templates/returnExportsGlobal.js) pattern, so it means that you can use it:

  * in Node.js project
  * browser running project
    * without AMD
    * with AMD

### Usage

#### Option A: With `npm`
    
Install:

```sh
npm install finka
```

And then in you main JS file:

```js
require('finka');
```

That's all!


#### Option B: Download

Download version that fits your better:

[Compressed version - 13KB](https://raw.githubusercontent.com/bitbar/finka-js/master/dist/finka.min.js)

[Uncompressed version - 33KB](https://raw.githubusercontent.com/bitbar/finka-js/master/dist/finka.js)

And simply add HTML tag:

```html
<script type="text/javascript" src="finka.min.js"></script>
```

Done!


### Documentation

[https://bitbar.github.io/finka-js/](https://bitbar.github.io/finka-js/)


## Contribution

### Checking code quality

```sh
npm run lint
```

### Running tests

```sh
npm run test
```

### Building

```sh
npm run build
```

### Updating documentation

```sh
npm run docs
```


## Authors

* **Marek Sierociński** - [marverix](https://github.com/marverix)
* **tpiechaczek** - [tpiechaczek](https://github.com/tpiechaczek)
* **Bartosz Trzos** - [Trzosoo](https://github.com/Trzosoo)
* **Alberto Luis Fernandez Reyes** - [alberto-f](https://github.com/alberto-f)
* **ToniaR** - [ToniaR](https://github.com/ToniaR)
* **Toni** - [ToniVaakanainen](https://github.com/ToniVaakanainen)
* **gfduszynski** - [gfduszynski](https://github.com/gfduszynski)

See also the list of [contributors](https://github.com/bitbar/finka-js/contributors) who participated in this project.


## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

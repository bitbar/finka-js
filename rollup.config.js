import cjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import {babel} from '@rollup/plugin-babel';
import terser from '@rollup/plugin-terser';

import $package from './package.json';

const input = 'src/index.js';
const external = Object.keys($package.dependencies || []);
const globals = {};

for(let ext of external) {
  globals[ext] = ext;
}

function getOutput(min, sufix = '') {
  return {
    file: `dist/finka${sufix}${(min ? '.min' : '')}.js`,
    format: 'umd',
    name:  'finka',
    banner: `/* Finka.js v${$package.version} ` +
            `|  Copyright ${new Date().getFullYear()} (c) Smartbear Software and contributors ` +
            '| https://github.com/bitbar/finka-js/blob/master/LICENSE.md ' +
            '*/',
    globals
  };
}

function getTerserPlugin() {
  return terser({
    ecma: 2020,
    output: {
      comments: (node, comment) => {
        if (comment.type === 'comment2') {
          // multiline comment
          return /LICENSE|\(c\)/.test(comment.value);
        }
        return false;
      }
    }
  });
}

function getBabel() {
  return babel({
    babelHelpers: 'bundled',
    presets: [
      [
        '@babel/env',
        {
          useBuiltIns: 'entry',
          corejs: '3.6'
        }
      ]
    ]
  });
}


// Export
export default [
  // Uncompressed config
  {
    input,
    output: getOutput(),
    plugins: [
      cjs(),
      resolve(),
      getBabel()
    ],
    external
  },

  // Compressed config
  {
    input,
    output: getOutput(true),
    plugins: [
      cjs(),
      resolve(),
      getBabel(),
      getTerserPlugin()
    ],
    external
  },

  // Embed
  {
    input: 'src/embed.js',
    output: getOutput(true, '.embed'),
    plugins: [
      cjs(),
      resolve(),
      getBabel(),
      getTerserPlugin()
    ],
    external
  }
];

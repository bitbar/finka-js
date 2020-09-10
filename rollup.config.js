// Imports
import cjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import babel from 'rollup-plugin-babel';
import { uglify } from 'rollup-plugin-uglify';

import $package from './package.json';

const input = 'src/index.js';
const external = Object.keys($package.dependencies || []);
const globals = {};

for(let ext of external) {
  globals[ext] = ext;
}

var output = function(min, sufix = '') {
  return {
    file: `dist/finka${sufix}${(min ? '.min' : '')}.js`,
    format: 'umd',
    name:  'finka',
    banner: `/* Finka.js v${$package.version} ` +
            `|  Copyright ${new Date().getFullYear()} (c) Bitbar Technologies and contributors ` +
            '| https://github.com/bitbar/finka-js/blob/master/LICENSE.md ' +
            '*/',
    globals
  };
};

var plugins = [
  cjs(),
  resolve(),
  babel({
    presets: [
      [
        '@babel/env',
        {
          useBuiltIns: 'entry',
          corejs: '3.6',
          modules: false
        }
      ]
    ]
  })
];

// Export
export default [
  // Uncompressed config
  {
    input,
    output: output(),
    plugins,
    external
  },

  // Compressed config
  {
    input,
    output: output(true),
    plugins: plugins.concat([
      uglify({
        output: {
          comments: /license/i
        }
      })
    ]),
    external
  },

  // Embed
  {
    input: 'src/embed.js',
    output: output(true, '.embed'),
    plugins: plugins.concat([
      uglify({
        output: {
          comments: /license/i
        }
      })
    ]),
    external
  }
];

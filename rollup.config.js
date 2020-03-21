// Imports
import commonjs from '@rollup/plugin-commonjs';
import nodeResolve from '@rollup/plugin-node-resolve';
import { uglify } from 'rollup-plugin-uglify';

import $package from './package.json';

// Common
var config = {
  input: 'src/index.js',

  output: {
    file: 'dist/finka',
    format: 'umd',
    name: 'finka-js',
    banner: `/* Finka.js v${$package.version} ` +
            '| (c) Bitbar Technologies and contributors ' +
            '| https://github.com/bitbar/finka-js/blob/master/LICENSE.md ' +
            '*/'
  },

  extensions: ['.js']
};

var input = config.input;

var output = function(min) {
  return {
    file: config.output.file + (min ? '.min' : '') + '.js',
    format: config.output.format,
    name:  config.output.name,
    banner: config.output.banner
  };
};

var plugins = [
  nodeResolve({
    extensions: config.extensions
  }),
  commonjs({
    extensions: config.extensions
  })
];

// Export
export default [
  // Uncompressed config
  {
    input: input,
    output: output(),
    plugins: plugins
  },

  // Compressed config
  {
    input: input,
    output: output(true),
    plugins: plugins.concat([
      uglify({
        output: {
          comments: /license/i
        }
      })
    ])
  }
];

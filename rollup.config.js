// Imports
import commonjs from 'rollup-plugin-commonjs';
import nodeResolve from 'rollup-plugin-node-resolve';
import uglify from 'rollup-plugin-uglify';

import $package from './package.json';

// Common
var config = {
  input: 'src/index.js',

  output: {
    file: 'dist/finka',
    format: 'umd',
    name: 'finka-js',
    banner: '/* Finka.js v' + $package.version + ' | (c) Bitbar Technologies and contributors | https://github.com/bitbar/finka-js/blob/master/LICENSE.md */'
  },

  extensions: ['.js']
};

// Export
export default [
  // Uncompressed config
  {
    input: config.input,
  
    output: {
      file: config.output.file + '.js',
      format: config.output.format,
      name:  config.output.name,
      banner: config.output.banner
    },
  
    plugins: [
      nodeResolve({
        extensions: config.extensions
      }),
      commonjs({
        extensions: config.extensions
      })
    ]
  },

  // Compressed config
  {
    input: config.input,
  
    output: {
      file: config.output.file + '.min.js',
      format: config.output.format,
      name:  config.output.name,
      banner: config.output.banner
    },
  
    plugins: [
      nodeResolve({
        extensions: config.extensions
      }),
      commonjs({
        extensions: config.extensions
      }),
      uglify({
        output: {
          comments: /license/i
        }
      })
    ]
  }
];

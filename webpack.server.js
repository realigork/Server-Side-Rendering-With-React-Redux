const path = require('path');
const merge = require('webpack-merge');
const baseConfig = require('./webpack.base.js');
const webpackNodeExternals = require('webpack-node-externals');

const config = {
  // Inform Webpack that we're building a bundle for Node
  target: 'node',

  // Root file of server app
  entry: './src/index.js',

  // Where to put the output file
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'build')
  },

  // Tell Webpack to not bundle any libs into the output bundle if that
  // lib exists in node_modules
  externals: [webpackNodeExternals()]
};

module.exports = merge(baseConfig, config);

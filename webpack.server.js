const path = require('path');

module.exports = {
  // Inform Webpack that we're building a bundle for Node
  target: 'node',

  // Root file of server app
  entry: './src/index.js',

  // Where to put the output file
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'build')
  },

  // 
  module: {
    rules: [
      {
        test: /\.js?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        options: {
          presets: [
            'react',
            'stage-0',
            [
              'env',
              {
                targets: {
                  browsers: ['last 2 versions']
                }
              }
            ]
          ]
        }
      }
    ]
  }
};

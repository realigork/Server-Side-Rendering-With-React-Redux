const path = require('path');

module.exports = {
  // Root file of client app
  entry: './src/client/client.js',

  // Where to put the output file
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'public')
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

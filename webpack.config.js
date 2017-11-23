var path = require('path');
var webpack = require('webpack');

module.exports = {
  entry: [
    "./index.js",
  ],
  output: {
    path: path.resolve(__dirname, ""),
    filename: "bundle.js"
  },
  plugins: [
    new webpack.optimize.UglifyJsPlugin({
      compress: { warnings: false },
      ecma: 6,
      mangle: true,
    })
  ],
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        query: {
          presets: ['es2015']
        }
      }
    ]
  },
  plugins: [
    new webpack.optimize.UglifyJsPlugin({
      compress: { warnings: false }
    })
  ],
  stats: {
     colors: true
  },
  devtool: 'source-map'
};

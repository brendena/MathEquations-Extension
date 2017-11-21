

const webpack = require('webpack');
const merge = require('webpack-merge');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const baseConfig = require('./base.config.js');

module.exports = merge(baseConfig, {

  module: {
  },

  plugins: [
    // Minify JS
    new UglifyJsPlugin(
    //caused errors
      //{
    //  sourceMap: false,
    //  compress: true,
    //}
    ),
    // Minify CSS
    new webpack.LoaderOptionsPlugin({
      minimize: true,
    }),
  ],
});
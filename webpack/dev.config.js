const merge = require('webpack-merge');
const baseConfig = require('./base.config.js');

module.exports = merge(baseConfig, {
//causes the popup UI to break
//  devtool: 'eval-source-map',


  module: {
   
  },
});
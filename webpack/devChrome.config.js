const ChromeExtensionReloader  = require('webpack-chrome-extension-reloader');
//https://medium.com/front-end-hacking/hot-reloading-extensions-using-webpack-cdfa0e4d5a08

const merge = require('webpack-merge');
const devConfig = require('./base.config.js');

module.exports = merge(devConfig, {
  module: {
   
  },
  plugins: [
    new ChromeExtensionReloader({
      port: 9090, // Which port use to create the server
      reloadPage: true, // Force the reload of the page also
      entries: { //The entries used for the content/background scripts
        contentScript: 'contentScript',
        background: 'background'
      }
    })
   ]
});
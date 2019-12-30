var path = require("path");
const WebpackShellPlugin = require('webpack-shell-plugin');
var CopyWebpackPlugin = require('copy-webpack-plugin');
const webpack = require('webpack');
//const ChromeExtensionReloader  = require('webpack-chrome-extension-reloader');
//https://medium.com/front-end-hacking/hot-reloading-extensions-using-webpack-cdfa0e4d5a08

//multiple configs
//https://simonsmith.io/organising-webpack-config-environments/

/*webpack optimization tips
https://www.youtube.com/watch?v=zFoBYfMLUCM
*/ 
/*
elm-css-loader
https://github.com/tcoopman/elm-css-webpack-loader
*/
/*
Image Loader - load iamges as base 64 
// to reduce server alls.
// not implemented
https://medium.com/a-beginners-guide-for-webpack-2/handling-images-e1a2a2c28f8d
https://medium.com/@bogdan_plieshka/loading-static-and-dynamic-images-with-webpack-8a933e82cb1e
*/
/**~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
 * webpack-chrome-extension-reloader
 * This will reload the chrome extension on the fly.
 * https://www.npmjs.com/package/webpack-chrome-extension-reloader
 ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/
 /*
 https://github.com/TypeStrong/ts-loader
 */


module.exports = {
  entry: {
    contentScript: "./src/webPackContentScript.js",
    background: "./src/webPackBackground.js"
  },
  output: {
    path: path.resolve(__dirname + '/../dist'),
    filename: '[name].js',
  },
  mode: "production",// development //production
  devtool:"source-map",
	optimization: {
		// We no not want to minimize our code.
		minimize: false
	},
  plugins: [
    new WebpackShellPlugin({onBuildStart:['echo "Webpack Start"'], onBuildEnd:['echo "Webpack End"']}),
    new CopyWebpackPlugin([
      { from: "./src/manifest.json" },
      { from: "./src/StaticFiles/Img", to: "./Img" },
      { from: "./src/Background/Html/background.html" },
      { from: "./src/Background/Js/background.js" },
      { from: "./src/MathEquation/lib/custom-mathjax/custom-mathjax.min.js" }
    ])
  ],
  module: {
    rules: [
        {
            test: /\.js?$/,
            exclude: /node_module/,
            use: 'babel-loader'
        },
        {
            test: /\.css?$/,
            use: [  { loader: "react-web-component-style-loader" },
                    { loader: 'css-loader'} 
                ]
        },
        {
            test: /\.(png|j?g|svg|gif)?$/,
            use: 'file-loader'
        },
        {
            test: /\.(woff(2)?)(\?v=\d+\.\d+\.\d+)?$/,
            use: [
              {
                loader: 'file-loader',
                options: {
                  name: '[name].[ext]',
                  outputPath: 'src/lib/fontello'
                }
              }
            ]
          }
      ]
  }
};
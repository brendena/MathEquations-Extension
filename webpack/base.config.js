var path = require("path");
var ExtractTextPlugin = require('extract-text-webpack-plugin')
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


const extractCSSElm = new ExtractTextPlugin({ filename: 'css/mathEquationComponentElm.css' })
const extractCSSOther = new ExtractTextPlugin({ filename: 'css/mathEquationComponent.css' })
module.exports = {
  entry: {
    mathEquationComponent: "./src/webPackMathEquation.js",
    contentScript: "./src/webPackContentScript.js",
    popUp: "./src/webPackPopUp.js",
    background: "./src/webPackBackground.js",
    mathEquationComponentOnload: "./src/webPackMathEquationOnload.js"
  },
  output: {
    path: path.resolve(__dirname + '/../dist'),
    filename: '[name].js',
  },
  plugins: [
    new WebpackShellPlugin({onBuildStart:['echo "Webpack Start"'], onBuildEnd:['echo "Webpack End"']}),
    //new WebpackShellPlugin({onBuildStart: ['elm-css src/MathEquation/Stylesheets/StylesheetCompiler.elm --output src/MathEquation/Stylesheets/']}),
    new CopyWebpackPlugin([
      { from: "./src/manifest.json" },
      { from: "./src/PopUpMenu/Html/popUp.html" },
      { from: "./src/StaticFiles/Img", to: "./Img" },
      { from: "./bower_components/webcomponentsjs/webcomponents-loader.js"},
      { from: "./bower_components/webcomponentsjs/webcomponents-hi-sd-ce.js"},

      { from: "./src/Background/Html/background.html" },
      { from: "./src/Background/Js/background.js" },
      { from: "./src/StaticFiles/Edge" },

      { from: "./node_modules/katex/dist/katex.min.js"},
      { from: "./node_modules/katex/dist/katex.min.css"},
      { from: "./node_modules/katex/dist/fonts", to :"./fonts"},

      { from: "./src/MathEquation/Stylesheets/fontello/font", to :"./font"}
    ]),
    new webpack.EnvironmentPlugin([
      'NODE_ENV',
    ]),
    extractCSSElm,
    extractCSSOther
    

  ],
  module: {
    rules: [
      {
        test:    /\.html$/,
        exclude: /node_modules/,
        loader:  'file-loader?name=[name].[ext]',
      },
      //*
      {
        test:    /\.elm$/,
        exclude: [/elm-stuff/, /node_modules/, /StylesheetCompiler\.elm/],
        loader:  'elm-webpack-loader?verbose=true&warn=true',
      },
      ///*
      {
        test: /\.(css|scss)$/,
        exclude : [/MathEquation/],
        use: [
          'style-loader',
          'css-loader',
        ]
      },
      ///*
      {
        test: /\.(css|scss)$/,
        include : [/MathEquation/],
        use: extractCSSOther.extract({
          fallback: 'style-loader',
          use: [
            'css-loader',
          ]
        })
      },
      //*/
      ///*
      {
        test: /StylesheetCompiler\.elm$/,
        use: extractCSSElm.extract({
          fallback: 'style-loader',
          use: [
            'css-loader',
            'elm-css-webpack-loader'
          ]
        })
       
      },
      //*/
      {
        test:    /\.(html|json)$/,
        exclude: /node_modules/,
        loader:  'file-loader?name=[name].[ext]',
      },
      {
        test: /\.(ttf|eot|svg|png)$/,
        loader: 'file-loader',
        options: {
          //potential problem since i'm not using the directory of the image
          name: '[name].[ext]', 
          outputPath: 'Img/'
        }
      },
      { 
        test: /\.(ts)?$/,
        exclude: /node_modules/, 
        include: /src/,
        loader: 'ts-loader'
      },
      {  //loading font data
        test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: 'url-loader'//?limit=10000&mimetype=application/font-woff',
      }
    ]
    ,noParse: /^((?!StylesheetCompiler).)*\.elm.*$/
  }
};
var path = require("path");
var ExtractTextPlugin = require('extract-text-webpack-plugin')
const WebpackShellPlugin = require('webpack-shell-plugin');
var CopyWebpackPlugin = require('copy-webpack-plugin');
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
    mathEquationComponent: "./src/webPackMathEquation.js",
    contentScripts: "./src/webPackContentScripts.js",
    popUp: "./src/webPackPopUp.js"
  },
  output: {
    path: path.resolve(__dirname + '/dist'),
    filename: '[name].js',
  },
  plugins: [
    new WebpackShellPlugin({onBuildStart:['echo "Webpack Start"'], onBuildEnd:['echo "Webpack End"']}),
    new WebpackShellPlugin({onBuildStart: ['elm-css src/MathEquation/Stylesheets/StylesheetCompiler.elm --output src/MathEquation/Stylesheets/']}),
    new CopyWebpackPlugin([
      { from: "./src/manifest.json" },
      { from: "./src/PopUpMenu/Html/popUp.html" },
      { from: "./src/MathEquation/Img", to: "./Img" }
    ])
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
        exclude: [/elm-stuff/, /node_modules/,"/src/MathEquation/Stylesheets/StylesheetCompiler.elm"],
        loader:  'elm-webpack-loader?verbose=true&warn=true',
      },
      ///*
      {
        test: /\.(css|scss)$/,
        use: [
          'style-loader',
          'css-loader',
        ]
      },
      //*/
      /*
      {
        //test: /StylesheetsCompiler\.elm$/,
        //include: "/src/MathEquation/Elm",
        test:    /\.elm$/,
        exclude:["/src/MathEquation/Elm","/elm-stuff"],
        include: "/src/MathEquation/Stylesheets/StylesheetCompiler.elm",
        use: [
          'style-loader',
          'css-loader',
          'elm-css-webpack-loader'
        ]
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
      }
    ],
    noParse: /^((?!StylesheetCompiler).)*\.elm.*$/,
    //noParse: [/.elm$/]
  }
};
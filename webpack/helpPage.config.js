var path = require("path");
const WebpackShellPlugin = require('webpack-shell-plugin');
var CopyWebpackPlugin = require('copy-webpack-plugin');
const webpack = require('webpack');
const HtmlWebPackPlugin = require( 'html-webpack-plugin' );


module.exports = {
  entry:"./src/webPackHelpPage.js",
  output: {
    path: path.resolve(__dirname + '/../docs'),
    filename: '[name].js',
  },
  mode: "production",// development //production
  devtool:"source-map",
	optimization: {
		minimize: false
	},
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
  },
	plugins: [
    
    new WebpackShellPlugin({onBuildStart:['echo "Webpack Start"'], onBuildEnd:['echo "Webpack End"']}),
    new CopyWebpackPlugin([
      { from: "./src/StaticFiles/Img", to: "./Img" },
      { from: "./src/MathEquation/lib/custom-mathjax/custom-mathjax.min.js" },
      { from: "./src/HelpPage/styles.css" }
    ]),
		new HtmlWebPackPlugin({
			template: path.resolve( __dirname, '../src/HelpPage/index.html' ),
			filename: 'index.html'
		})
	]
};
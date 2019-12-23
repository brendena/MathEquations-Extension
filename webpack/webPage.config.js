const HtmlWebPackPlugin = require( 'html-webpack-plugin' );
const path = require( 'path' );

module.exports = {
	context: __dirname,
	entry: '../src/MathEquation/index.js',
	output: {
		path: path.resolve(__dirname + '/../dist'),
		filename: '[name].js'
	},
	devServer: {
		historyApiFallback: true
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
				use: [ 'style-loader', 'css-loader' ]
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
		new HtmlWebPackPlugin({
			template: path.resolve( __dirname, '../public/index.html' ),
			filename: 'index.html'
		})
	]
};
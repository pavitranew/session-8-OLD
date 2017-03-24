const path = require('path');
const webpack = require('webpack');

module.exports = {
	devtool: 'source-map',
	entry: {
		filename: './app.js'
	},
	output: {
		path: path.resolve(__dirname, '_build'),
		filename: 'bundle.js'
	},
	module: {
		loaders: [
		{
			test: /\.js$/,
			exclude: /node_modules/,
			loader: 'babel-loader',
			query: {
				presets: [
				["es2015", { "modules": false }]
				]
			}
		},
		{
			test: /\.(png|jpg|gif)$/,
			loader: 'url-loader'
		},
		{ 
			test: /\.css$/, 
			loader: "style-loader!css-loader" 
		}
		]
	},
	plugins: [
	new webpack.optimize.UglifyJsPlugin({
		compress: { warnings: false },
		output: { comments: false },
		sourceMap: true
	})
	]
};


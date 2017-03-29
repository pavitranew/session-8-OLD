module.exports = {
	devtool: 'source-map',
	entry: {
		filename: './app.js'
	},
	output: {
		filename: '_build/bundle.js'
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
			test: /\.css$/, 
			loader: "style-loader!css-loader" 
		},
		{
			test: /\.(png|jpg|gif)$/,
			loader: 'url-loader'
		}
		]
	}
};










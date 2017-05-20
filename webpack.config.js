var webpack = require('webpack');

module.exports = {
	entry: [
		'script-loader!jquery/dist/jquery.min.js',
		'./app/app.jsx'
	],
	externals: {
		jquery: 'jQuery'
	},
	plugins: [
		new webpack.ProvidePlugin({
			'$': 'jquery',
			'jQuery': 'jquery'
		})
	],
	output: {
		path: __dirname,
		filename: './public/bundle.js'
	},
	resolve: {
		modules: [
			__dirname, 
			"node_modules", 
			"./app/components", 
			"./app/api", 
			"./app/actions", 
			"./app/reducers", 
			"./app/store", 
			"./app/firebase"
		],
		alias: {
			applicationStyles: 'app/styles/app.scss',
		},
		extensions: ['.js', '.jsx']
	},
	module: {
		loaders: [
			{
				loader: 'babel-loader',
				query: {
					presets: ['react', 'es2015', 'stage-0']
				},
				test: /\.jsx?$/,
				exclude: /(node_modules|bower_components)/
			}
		]
	}
};
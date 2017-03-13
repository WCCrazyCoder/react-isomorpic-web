require('babel-polyfill');

const path = require('path');
const webpack = require('webpack');

var Webpack_isomorphic_tools_plugin = require('webpack-isomorphic-tools/plugin');
var webpack_isomorphic_tools_plugin = new Webpack_isomorphic_tools_plugin(require('./webpack-isomorphic-tools-configuration')).development();

const port = (+process.env.PORT + 1) || 8001;
const host = (process.env.HOST) || 'localhost';

let config = {
	devtool: 'inline-source-map',
	context: path.resolve(__dirname, '..'),
	entry: {
		bundle: [
			'./src/client',
			'webpack-hot-middleware/client?path=http://' + host + ':' + port + '/__webpack_hmr&timeout=20000&reload=true'
		],
		vendor: [
			'react',
			'react-dom',
			'redux',
			'react-redux',
			'superagent'
		]
	},
	output: {
		path: path.resolve(__dirname, '../dist/client'),
		filename: '[name].js',
		chunkFilename: 'chunk.[name].js',
		publicPath: 'http://' + host + ':' + port + '/dist/client/'
	},
	module: {
		rules: [
			{
				test: /\.jsx?$/,
	            exclude: /node_modules/,
	            loader: 'babel-loader'
			}, {
				test: /\.json$/, 
				loader: 'json-loader'
			}, {
				test: /\.css$/, 
				use: [{ loader: 'style-loader' }, { loader: 'css-loader' }]
			}, {
				test: /\.scss$/,
				loader: [
					{ loader: 'style-loader'}, 
					{ loader: 'css-loader?modules&camelCase&importLoaders=1&sourceMap&localIdentName=[name]__[local]__[hash:base64:8]' }, 
					{ loader: 'sass-loader', options: { sourceMap: true } },
	                { loader: 'postcss-loader' }
				]
			}, {
				test: webpack_isomorphic_tools_plugin.regular_expression('images'),
				loader: 'url-loader?limit=10240'
			}
		]
	},
	plugins: [
		new webpack.HotModuleReplacementPlugin(),
		new webpack.optimize.CommonsChunkPlugin({
			names: ['vendor', 'manifest'],
			filename: '[name].js',
			minChunks: Infinity
		}),
		new webpack.DefinePlugin({
			"process.env": {
				NODE_ENV: JSON.stringify('development')
			},
			__CLIENT__: true,
			__DEVELOPMENT__: true,
			__DEVTOOLS__: true
		}),
		webpack_isomorphic_tools_plugin
	],
	resolve: { 
		modules: ["src", "node_modules"],
		extensions: ['.js', '.json', '.jsx', '.scss'] 
	}
};

// enable React Hot loader
// if (process.env.NODE_ENV === 'development') {
//   	// config.module.rules[0].options.plugins.push('react-transform');
//   	config.module.rules[0].options.plugins.push(['react-transform', {
//   		transforms: [{
// 	    'react-transform': [{
// 	      target: 'react-transform-hmr',
// 	      imports: ['react'],
// 	      locals: ['module']
// 	    }]
// 	  }]
// 	}]);
// }

module.exports = config;

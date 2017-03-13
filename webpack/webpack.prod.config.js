require('babel-polyfill');
require('../server.babel');

const path = require('path');
const fs = require('fs');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
let clientConfig, serverConfig;

var Webpack_isomorphic_tools_plugin = require('webpack-isomorphic-tools/plugin');
var webpack_isomorphic_tools_plugin = new Webpack_isomorphic_tools_plugin(require('./webpack-isomorphic-tools-configuration'));

module.exports = {
    devtool: 'source-map',
    context: path.resolve(__dirname, '..'),
    entry: {
        bundle: './src/client',
        vendor: [
            'react',
            'react-dom',
            'redux',
            'react-redux',
            'superagent'
        ]
    },
    output: {
        path: path.resolve(__dirname, '../static/dist/client'),
        filename: '[name].js',
        chunkFilename: 'chunk.[name].js',
        publicPath: '/dist/client/'
    },
    module: {
        loaders: [{
            test: /\.js$/,
            exclude: /node_modules/,
            loader: 'babel-loader',
            options: {
                presets: ['es2015', 'react', 'stage-0'],
                plugins: ['transform-runtime', 'add-module-exports', 'transform-decorators-legacy', 'transform-react-display-name'],
                cacheDirectory: true
            }
        }, {
            test: /\.css$/, 
            loader: ExtractTextPlugin.extract({
                fallback: 'style-loader',
                use: "css-loader"
            })
        }, {
            test: /\.scss$/,
            use: ExtractTextPlugin.extract({
                fallback: 'style-loader',
                use: [
                    'css-loader?modules&camelCase&importLoaders=2&sourceMap&localIdentName=[name]__[hash:base64:8]',
                    'postcss-loader?sourceMap=inline',
                    'sass-loader?outputStyle=expanded'
                ]
            })
        }, {
            test: webpack_isomorphic_tools_plugin.regular_expression('images'),
            loader: 'url-loader?limit=10240'
        }, {
            test: /\.json$/,
            loader: 'json-loader'
        }]
    },
    resolve: {
        modules: ["src", "node_modules"],
        extensions: ['.js', '.json', '.scss']
    },
    plugins: [
        new webpack.optimize.CommonsChunkPlugin({
            names: ['vendor', 'manifest'],
            filename: '[name].js'
        }),
        new webpack.optimize.UglifyJsPlugin({
            compress: {warnings: false},
            comments: false
        }),
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify('production')
            },
            __CLIENT__: true,
            __DEVELOPMENT__: false,
            __DEVTOOLS__: false
        }),
        new ExtractTextPlugin({ filename: '[name]__[contenthash:8].css',  allChunks: true }),
        webpack_isomorphic_tools_plugin
    ]
}

const Express = require('express');
const webpack = require('webpack');

const webpackConfig = require('./webpack.dev.config');
const compiler = webpack(webpackConfig);

const host = process.env.HOST || 'localhost';
const port = (+process.env.PORT + 1) || 8001;

const options = {
	contentBase: 'http://' + host + ':' + port,
	quiet: true,
	noInfo: true,
	hot: true,
	lazy: false,
	inline: true,
	publicPath: webpackConfig.output.publicPath,
	headers: { 'Access-Control-Allow-Origin': '*' },
	stats: { colors: true }
};

const devMiddleware = require('webpack-dev-middleware')(compiler, options);
const hotMiddleware = require('webpack-hot-middleware')(compiler);

const app = new Express();
app.use(devMiddleware);
app.use(hotMiddleware);
app.listen(port, (err) => {
	if (err) {
		console.error(err);
	} else {
		console.info('\n 🌏 ====> Webpack development server listening on port %s \n', port);
	} 
});

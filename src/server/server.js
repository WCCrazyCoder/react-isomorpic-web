// Provide custom regenerator runtime and core-js
require('babel-polyfill');

// Javascript require hook
require('../../server.babel');

global.__CLIENT__ = false;
global.__DEVTOOLS__ = true;
global.__DEVELOPMENT__ = process.env.NODE_ENV !== 'production';

var Webpack_isomorphic_tools = require('webpack-isomorphic-tools');
var project_base_path = require('path').resolve(__dirname, '..', '..');

global.webpack_isomorphic_tools = new Webpack_isomorphic_tools(require('../../webpack/webpack-isomorphic-tools-configuration'))
.server(project_base_path, () => {
	if (process.env.NODE_ENV === 'development') {
		require('./server.dev.js');
	} else {
		require('./server.prod.js');
	}
});

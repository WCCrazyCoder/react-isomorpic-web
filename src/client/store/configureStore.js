if (__DEVELOPMENT__ && process.env.NODE_ENV === 'production') {
	module.exports = require('./configureStore.prod');
} else {
	module.exports = require('./configureStore.dev');
}

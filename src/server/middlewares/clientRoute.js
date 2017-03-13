import React from 'react';
import ReactDOM from 'react-dom/server';
import PrettyError from 'pretty-error';
import { Provider } from 'react-redux';
import { match, RouterContext } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import { ReduxAsyncConnect, loadOnServer } from 'redux-async-connect';
import createHistory from 'react-router/lib/createMemoryHistory';
import configureStore from  '../../client/store/configureStore';
import Html from '../../client/containers/Html';
import ApiClient from '../../helpers/ApiClient';

const routes = require('../../client/routes');

const clientRoute = () => (req, res, next) => {
	if (__DEVELOPMENT__) {
		webpack_isomorphic_tools.refresh();
	}
	const memoryHistory = createHistory(req.originalUrl);
	const client = new ApiClient(req);
	const store = configureStore(memoryHistory, client);
	const history = syncHistoryWithStore(memoryHistory, store);
	match({ history, routes: routes(), location: req.originalUrl }, (error, redirectLocation, renderProps) => {
		if(redirectLocation) {
			res.redirect(redirectLocation.pathname + redirectLocation.search);
		} else if (error) {
			console.error('ROUTER ERROR:' + pretty.render(error));
		} else if (renderProps) {
			loadOnServer({ ...renderProps, store }).then(() => {
				res.status(200);
				global.navigator = { userAgent: req.headers['user-agent'] };
				const component = (
					<Provider store={store} key="provider">
						<ReduxAsyncConnect {...renderProps} />
					</Provider>
				);
				// console.log(ReactDOM.renderToString(component));
				const html = '<!doctype html>' + 
					ReactDOM.renderToString(<Html assets={webpack_isomorphic_tools.assets()} store={store} component={component} />);
				res.send(html);
			});
		} else {
			res.status(404).send('404 Not Found');
		}

	});
}

export default clientRoute;

import React from 'react';
import ReactDOM from 'react-dom';
import ReactDOMS from 'react-dom/server';
import { ReduxAsyncConnect } from 'redux-async-connect';
import { Provider } from 'react-redux';
import { match, Router, RouterContext, browserHistory, applyRouterMiddleware } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import { useScroll } from 'react-router-scroll';
import DevTools from './containers/DevTools';

import routes from './routes';
import configureStore from './store/configureStore';
import ApiClient from '../helpers/ApiClient';

const client = new ApiClient();
const store = configureStore(browserHistory, client , window.__redux_state__);
const history = syncHistoryWithStore(browserHistory, store);

match({ history, routes:routes() }, (error, redirectLocation, renderProps) => {
	ReactDOM.render(
			<Provider store={store} key="provider">
				<Router {...renderProps} />
			</Provider>,
			document.getElementById('content')
		)
})


// const useReduxConnect = () => ({
// 	renderRouterContext: (child, props) => 
// 		<ReduxAsyncConnect {...props} filter={item => !item.deferred}> 
// 			{child}
// 		</ReduxAsyncConnect>
// });

// const component = (
// 	<Router
// 		render={ applyRouterMiddleware(useScroll(), useReduxConnect()) }
// 		history={ history }
// 	>
// 		{ routes() }
// 	</Router>
// );

// ReactDOM.render(
// 	<Provider store={store} key="provider">
// 		{ component }
// 	</Provider>,
// 	document.getElementById('content')
// );

// if (__DEVTOOLS__) {
// 	<Provider store={store} key="provider">
// 		<div>
// 			{ component }
// 			<DevTools />
// 		</div>
// 	</Provider>,
// 	document.getElementById('content')
// }

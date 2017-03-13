import { applyMiddleware, compose, createStore } from 'redux';
import thunk from 'redux-thunk';
import promise from 'redux-promise-middleware';
import { routerMiddleware } from 'react-router-redux';
import clientMiddleware from '../redux/middleware/clientMiddleware';
import reducers from '../redux/reducers';
import DevTools from '../containers/DevTools';

export default function configureStore(history, client, preloadedState) {
	const store = createStore(
		reducers,
		preloadedState,
		compose(
			applyMiddleware(routerMiddleware(history), thunk, clientMiddleware(client), promise())
		)
	);
	return store;
}

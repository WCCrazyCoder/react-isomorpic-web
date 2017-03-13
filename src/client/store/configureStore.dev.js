import { applyMiddleware, compose, createStore } from 'redux';
import thunk from 'redux-thunk';
import promise from 'redux-promise-middleware';
import { routerMiddleware } from 'react-router-redux';
import clientMiddleware from '../redux/middleware/clientMiddleware';
import reducers from '../redux/reducers';
import DevTools from '../containers/DevTools';

export default function configureStore(history, client, preloadedState) {
	let store;
	if (__CLIENT__ && __DEVTOOLS__) {
		const { persistState } = require('redux-devtools');
		store = createStore(
			reducers,
			preloadedState,
			compose(
				applyMiddleware(routerMiddleware(history), clientMiddleware(client), thunk, promise()),
				window.devToolsExtension ? window.devToolsExtension() : DevTools.instrument(),
				persistState(window.location.href.match(/[?&]debug_session=([^&]+)\b/))
			)
		);
	} else {
		store = createStore(
			reducers,
			preloadedState,
			compose(
				applyMiddleware(routerMiddleware(history), clientMiddleware(client), thunk, promise()),
				DevTools.instrument()
			)
		);
	}
    if (module.hot) {
	    module.hot.accept('../redux/reducers', () => {
	        const nextRootReducer = require('../redux/reducers')
	        store.replaceReducer(nextRootReducer)
	    })
    }

	return store;
}

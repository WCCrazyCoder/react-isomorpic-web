import { routerReducer } from 'react-router-redux';
import { combineReducers } from 'redux';
import { ReduxAsyncConnect, asyncConnect, loadOnServer, reducer as reduxAsyncConnect } from 'redux-async-connect'

import home from './home';

const reducers = combineReducers({
	routing: routerReducer,
	reduxAsyncConnect,
	home
});

export default reducers;

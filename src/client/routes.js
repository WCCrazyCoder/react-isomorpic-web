import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './containers/App';
import Home from './containers/Home';

// Hook for server
if (typeof require.ensure !== 'function') {
    require.ensure = function(dependencies, callback) {
        callback(require)
    }
}

export default () => {
	return (
		<Route breadcrumbName="首页" path="/" component={ App }>
			<IndexRoute 
				getComponent={(nextState, callback) =>{
					require.ensure([], require => {
						callback(null, require('./containers/Home'));
					});
				}}
			/>
		</Route>
	);
}

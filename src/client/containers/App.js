import React, { Component } from 'react';
import { asyncConnect } from 'redux-async-connect';
import superagent from 'superagent';

// @asyncConnect([{
// 	deferred: true,
// 	promise: ({ store: { dispatch, getState }, params, location }) => {
// 		Promise.resolve({id: 1, name: 'wang'});	
// 	}
// }])


export default class App extends Component {
	render() {
		const astyles = require('./App.scss');
		return (
			<div className={astyles.app}>
				<h1>Hello World</h1>
				<div>
					{ this.props.children }
				</div>
			</div>
		);
	}
}

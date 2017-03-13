import React, { Component } from 'react';
import { asyncConnect } from 'redux-async-connect';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { loadHomepageStores } from '../redux/home';

// @asyncConnect([{
// 	deferred: true,
// 	promise: ({ store: { dispatch, getState }, params, location }) => {
// 		return dispatch(loadHomepageStores());
// 	}
// }])

@connect(
	state => ({
		homepageStories: state.home.homepageStories
	}),
	dispatch => bindActionCreators({ loadHomepageStores }, dispatch)
)

export default class Home extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		const styles = require('./Home.scss');
		return (
			<div>
				<h1>Hello World</h1>
				<div className={styles.scolor}>
					abcd
				</div>
				<div onClick={this.props.loadHomepageStores}> click me to loading homepage stories </div>
				<div>{JSON.stringify(this.props.homepageStories)}</div>
				<div style={{ color: 'blue' }}>
					123456
				</div>
				<img src='108.png' /> <br />
				<img src='http://o9vi0jo2t.bkt.clouddn.com/client_uploads/images/113/C5DDCF3E4FF171BD84359802B946E683' />
				<img src='http://o9vi0jo2t.bkt.clouddn.com/client_uploads/images/113/C5DDCF3E4FF171BD84359802B946E683' />
				<img src='http://o9vi0jo2t.bkt.clouddn.com/client_uploads/images/113/C5DDCF3E4FF171BD84359802B946E683' />
				<img src='http://o9vi0jo2t.bkt.clouddn.com/client_uploads/images/113/C5DDCF3E4FF171BD84359802B946E683' />
				<img src='http://o9vi0jo2t.bkt.clouddn.com/client_uploads/images/113/C5DDCF3E4FF171BD84359802B946E683' />
				<img src='http://o9vi0jo2t.bkt.clouddn.com/client_uploads/images/113/C5DDCF3E4FF171BD84359802B946E683' />
				<img src='http://o9vi0jo2t.bkt.clouddn.com/client_uploads/images/113/C5DDCF3E4FF171BD84359802B946E683' />

			</div>
		);
	}
}

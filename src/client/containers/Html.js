import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom/server';
import serialize from 'serialize-javascript';

export default class Html extends Component {
	static propTypes = {
		assets: PropTypes.object,
		component: PropTypes.node,
		store: PropTypes.object
	};

	render() {
		const { assets, component, store } = this.props;
		const content = component ? ReactDOM.renderToString(component) : '';
		return (
			<html lang="en-US">
				<head>
					<title>React Demo</title>
					{Object.keys(assets.styles).map((style, key) =>
			            <link
			              href={assets.styles[style]}
			              key={key}
			              media="screen, projection"
			              rel="stylesheet"
			              type="text/css"
			              charSet="UTF-8"
			            />
			          )}
					{ Object.keys(assets.styles).length === 0 ? <style dangerouslySetInnerHTML={{ __html: require('./App.scss')._style }} /> : null }
				</head>
				<body>
					<div id="content" dangerouslySetInnerHTML={{ __html: content }} />
					<script dangerouslySetInnerHTML={{ __html: `window.__redux_state__=${serialize(store.getState())};` }} charSet="UTF-8" />
					{Object.keys(assets.javascript).reverse().map((js, key) =>
						<script
							type="text/javascript"
							key={key}
							src={assets.javascript[js]}
							charSet="UTF-8"
						/>
					)}
				</body>
			</html>
		);
	}
}

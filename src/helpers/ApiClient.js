import superagent from 'superagent';

const methods = ['get', 'post', 'put', 'del'];

function formatUrl(path) {
	const adjustedPath = path[0] !== '/' ? '/' + path : path;
	return 'http://beegree.cc/api/v1' + adjustedPath;
}

export default class ApiClient {
	constructor(req) {
		methods.forEach((method) => {
			this[method] = (path, { params, data, authHeaders } = {}) => new Promise((resolve, reject) => {
				const request = superagent[method](formatUrl(path));
				if (params) {
					request.query(params);
				}
				if (authHeaders) {
					authHeaders.forEach((header) => {
						request.set(header.key, header.value);
					})
				}

				if (data) {
					request.set('content-Type', 'application/json');
					request.send(data);
				}

				request.end((err, {  body } = {}) => {
					if (err) {
						reject(err || body);
					} else {
						resolve(body);
					}
				});
			})
		});
	}
	empty() {}
}




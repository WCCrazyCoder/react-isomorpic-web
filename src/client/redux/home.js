
const initialState = {
	name: 'Jack'
}

function home(state=initialState, action) {
	switch(action.type) {
		case 'start': {
			console.log('---------start------------');
			return {
				...state,
			}
		}
		case 'success': {
			console.log('---------success------------');
			return {
				...state,
				homepageStories: action.result
			}
		}
		case 'failure': {
			console.log('----------failure-------------');
			return {
				...state,
			}
		}
		default:
			return state;
	}
}


export function loadHomepageStores() {
	return {
		types: ['start', 'success', 'failure'],
		promise: (client) => client.get('/web/homepage?count=21')
	}
}

export default home;

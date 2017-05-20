import * as redux from 'redux';
import thunk from 'redux-thunk';

import {jobsReducer} from 'reducers';

export var configure = (initialState = {}) => {
	var reducer = redux.combineReducers({
		jobs: jobsReducer,
	});

	var store = redux.createStore(reducer, initialState, redux.compose(
		redux.applyMiddleware(thunk),
		window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
	));

	return store;
};
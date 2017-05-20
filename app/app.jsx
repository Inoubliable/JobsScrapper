var React = require('react');
var ReactDOM = require('react-dom');
var {Route, Router, IndexRoute, hashHistory} = require('react-router');
var {Provider} = require('react-redux');
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

import JobsApp from 'JobsApp';

var actions = require('actions');
var store = require('configureStore').configure();

store.dispatch(actions.startAddJobs());

// app css
require('style-loader!css-loader!sass-loader!applicationStyles');

const muiTheme = getMuiTheme({
	
});

ReactDOM.render(
	<MuiThemeProvider muiTheme={muiTheme}>
		<Provider store={store}>
			<Router history={hashHistory}>
				<Route path="/">
					<IndexRoute component={JobsApp}></IndexRoute>
				</Route>
			</Router>
		</Provider>
	</MuiThemeProvider>,
	document.getElementById('app')
);
var React = require('react');
var ReactDOM = require('react-dom');
var {Route, Router, IndexRoute, hashHistory} = require('react-router');
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

// app css
require('style-loader!css-loader!sass-loader!applicationStyles');

const muiTheme = getMuiTheme({
	
});

ReactDOM.render(
	<MuiThemeProvider muiTheme={muiTheme}>
		<p>Boilerplate</p>
	</MuiThemeProvider>,
	document.getElementById('app')
);
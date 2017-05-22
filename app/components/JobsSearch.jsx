var React = require('react');
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';

class JobsApp extends React.Component {

	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div>
				<TextField floatingLabelText="Search"/>
			</div>
		)
	}

}

module.exports = JobsApp;
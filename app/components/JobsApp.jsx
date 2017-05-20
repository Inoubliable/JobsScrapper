var React = require('react');
import FlatButton from 'material-ui/FlatButton';

import JobsSearch from 'JobsSearch';
import JobsList from 'JobsList';

class JobsApp extends React.Component {

	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div>
				<JobsSearch></JobsSearch>
				<JobsList></JobsList>
			</div>
		)
	}

}

module.exports = JobsApp;
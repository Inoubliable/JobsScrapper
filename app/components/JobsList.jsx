var React = require('react');
var {connect} = require('react-redux');

import Job from 'Job';

class JobsList extends React.Component {

	constructor(props) {
		super(props);
	}

	render() {
		var {jobs} = this.props;

		var renderJobs = () => {
			return jobs.map((job) => {
				return (
					<Job key={job.id} {...job}></Job>
				)
			});
		};

		return (
			<div>
				{renderJobs()}
			</div>
		)
	}

}

export default connect(
	(state) => {
		return state;
	}
)(JobsList);
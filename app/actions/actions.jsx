var $ = require('jquery');

export var addJobs = (jobs) => {
	return {
		type: 'ADD_JOBS',
		jobs
	};
};

export var startAddJobs = () => {
	return (dispatch, getState) => {
		$.get('/jobs', (jobs) => {
			dispatch(addJobs(jobs));
		});
	};
};
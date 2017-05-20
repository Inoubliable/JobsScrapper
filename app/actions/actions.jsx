import firebase, {firebaseRef} from 'index';

export var addJobs = (jobs) => {
	return {
		type: 'ADD_JOBS',
		jobs
	};
};

export var startAddJobs = () => {
	return (dispatch, getState) => {
		var jobsRef = firebaseRef.child('jobs');

		jobsRef.once('value').then((snapshot) => {
			var jobs = snapshot.val() || {};
			var keys = Object.keys(jobs);
			var parsedJobs = [];
			keys.forEach((key) => {
				parsedJobs.push({
					id: key,
					...jobs[key]
				});
			});
			dispatch(addJobs(parsedJobs));
		});
	};
};
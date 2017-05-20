export var jobsReducer = (state = [], action) => {
	switch(action.type) {
		case 'ADD_JOBS':
			return [
				...state,
				...action.jobs
			];
		default:
			return state;
	};
};
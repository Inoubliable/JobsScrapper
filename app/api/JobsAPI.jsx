var $ = require('jquery');

module.exports = {
	filterJobs: function(searchText) {
		var filteredJobs = [];

		// Filter by searchText
		filteredJobs = filteredJobs.filter((todo) => {
			var todoText = todo.text.toLowerCase();
			return todo.searchText || todo.searchText == '' || todoText.indexOf(searchText) != -1;
		});

		return filteredJobs;
	}
};
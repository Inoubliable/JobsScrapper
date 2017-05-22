var express = require('express');
var bodyParser = require('body-parser');
var moment = require('moment');

// Firebase
var db = require('./config/database');
var firebaseRef = db.database().ref();

// begin app
var app = express();
const PORT = process.env.PORT || 3000;

// Route folders
var scrape = require('./routes/scrape');

// Middleware
app.use(bodyParser.json());

app.use('/scrape', scrape);

app.get('/jobs', (req, res) => {
	var jobsRef = firebaseRef.child('jobs');

	jobsRef.once('value').then((snapshot) => {
		var jobs = snapshot.val() || {};
		var keys = Object.keys(jobs);
		var parsedJobs = [];
		var lastJob;
		var jobDate;
		var today = moment();
		var yesterday = moment().add(-1, 'days');
		keys.forEach((key) => {
			parsedJobs.push(jobs[key]);
			lastJob = parsedJobs.slice(-1)[0];
			lastJob.id = key;
		});
		// newer jobs first
		parsedJobs.sort((a, b) => {
			if(a.postedDate < b.postedDate) return 1;
			if(a.postedDate > b.postedDate) return -1;
			return 0;
		});
		parsedJobs.forEach((job) => {
			jobDate = moment(new Date(job.postedDate));
			if(today.isSame(jobDate, 'd')) {
				job.postedDate = 'Danes';
			} else if(yesterday.isSame(jobDate, 'd')) {
				job.postedDate = 'Včeraj';
			} else {
				job.postedDate = moment(new Date(job.postedDate)).format('D.M.Y');
			}
		});

		res.json(parsedJobs);
	});
});

app.use(express.static('public'));
app.listen(PORT, function() {
	console.log('Server is up at port ' + PORT);
});
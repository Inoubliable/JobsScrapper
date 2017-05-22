var express = require('express');
var bodyParser = require('body-parser');

// Firebase
var db = require('./config/database');
var firebaseRef = db.database().ref();

// begin app
var app = express();
const PORT = process.env.PORT || 3000;

// Routes
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
		keys.forEach((key) => {
			parsedJobs.push(jobs[key]);
			parsedJobs.slice(-1)[0].id = key;
		});

		res.json(parsedJobs);
	});
});

app.use(express.static('public'));
app.listen(PORT, function() {
	console.log('Server is up at port ' + PORT);
});
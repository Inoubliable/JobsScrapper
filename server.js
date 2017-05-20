var express = require('express');
var request = require('request');
var cheerio = require('cheerio');

var firebase = require('firebase');
try {
	var config = {
		apiKey: "AIzaSyAqGjI9qu456g2Gn5TCOod64XZoozv_t1s",
		authDomain: "jobs-scraper.firebaseapp.com",
		databaseURL: "https://jobs-scraper.firebaseio.com",
		projectId: "jobs-scraper",
		storageBucket: "jobs-scraper.appspot.com",
		messagingSenderId: "492330748598"
	};
	firebase.initializeApp(config);
} catch(e) {

}

var firebaseRef = firebase.database().ref();

// begin app
var app = express();
const PORT = process.env.PORT || 3000;

app.get('/scrape', function(req, res){
	var jobs = [];

    var mojeDeloUrl = 'https://www.mojedelo.com/prosta-delovna-mesta/racunalnistvo-programiranje/vse-regije';
    var mojaZaposlitevUrl = 'https://www.mojazaposlitev.si/prosta-delovna-mesta/?1=1&podrocja=7&_action=submit&adsPerPage=50&_action=submit#jobsAds';
    var studentskiServisUrl = 'https://www.studentski-servis.com/index.php?t=prostaDela&page=1&perPage=150&sort=1&workType=1&skupinaDel[]=004&skupinaDel[]=A832&skupinaDel[]=A210&skupinaDel[]=A055&skupinaDel[]=A078&skupinaDel[]=A090&skupinaDel[]=A095&keyword=';

    getJobs(doAfter);

    function doAfter(jobs) {
    	firebaseRef.child('jobs').set(jobs);
    }

    function getJobs(callback) {
    	mojeDelo(callback);
	    mojaZaposlitev();
	    studentskiServis();
    }

    function mojeDelo(callback) {
	    request(mojeDeloUrl, function(error, response, html){

	        if(!error){

	            var $ = cheerio.load(html);
	            var details = $('.jobResults .ad-list .job-ad .details');
	            var title, description, employer, place;

	            details.each(function() {
	            	title = $(this).find('.title').text();
	            	description = $(this).children('p').text();
	            	employer = $(this).find('.box-details .boxItemGroup:nth-child(2) .detail').text();
	            	place = $(this).find('.box-details .boxItemGroup:nth-child(3) .detail').text();

	            	jobs.push({
	            		title,
	            		description,
	            		employer,
	            		place
	            	});
	            });
	        }

    		callback(jobs);
	    });
	}

    function mojaZaposlitev() {
	    request(mojaZaposlitevUrl, function(error, response, html){

	        if(!error){

	            var $ = cheerio.load(html);
	            var details = $('.jobAdsList .jobAdItem .desc');
	            var title, description, employer, place;

	            details.each(function() {
	            	title = $(this).children('h4').text();
	            	description = $(this).find('.description').text();
	            	employer = $(this).find('.company').text();
	            	placeRaw = $(this).find('.location').text();
	            	place = placeRaw.replace(' Kraj dela: ', '')

	            	jobs.push({
	            		title,
	            		description,
	            		employer,
	            		place
	            	});
	            });
	        }
	    });
	}

	function studentskiServis() {
	    request(studentskiServisUrl, function(error, response, html){

	        if(!error){

	            var $ = cheerio.load(html);
	            var details = $('.resultsDisplay .jobItem');
	            var title, description, employer, place;

	            details.each(function() {
	            	title = $(this).find('.jobTitle .title').text();
	            	description = $(this).find('.jobData .jobContent p').text();
	            	employer = $(this).find('.box-details .boxItemGroup:nth-child(2) .detail').text();
	            	place = $(this).find('.lokacija strong').text();

	            	jobs.push({
	            		title,
	            		description,
	            		employer,
	            		place
	            	});
	            });
	        }
	    });
	}
});

app.use(express.static('public'));
app.listen(PORT, function() {
	console.log('Server is up at port ' + PORT);
});
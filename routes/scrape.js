var express = require('express');
var router = express.Router();
var request = require('request');
var cheerio = require('cheerio');

// Firebase
var db = require('../config/database');
var firebaseRef = db.database().ref();

var links = [];
firebaseRef.child('jobs').once('value').then((snapshot) => {
	var jobs = snapshot.val() || {};
	jobs.forEach((job) => {
		links.push(job.link);
	});
});

router.get('/', (req, res, next) => {
	var jobs = [];

    var mojeDeloUrl = 'https://www.mojedelo.com/prosta-delovna-mesta/racunalnistvo-programiranje/vse-regije';
    var mojaZaposlitevUrl = 'https://www.mojazaposlitev.si/prosta-delovna-mesta/?1=1&podrocja=7&_action=submit&adsPerPage=50&_action=submit#jobsAds';
    var studentskiServisUrl = 'https://www.studentski-servis.com/index.php?t=prostaDela&page=1&perPage=150&sort=1&workType=1&skupinaDel[]=004&skupinaDel[]=A832&skupinaDel[]=A210&skupinaDel[]=A055&skupinaDel[]=A078&skupinaDel[]=A090&skupinaDel[]=A095&keyword=';

    getJobs(doAfter);

    function doAfter(jobs) {
    	firebaseRef.child('jobs').set(jobs).then(() => {
    		res.end();
    	});
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
	            var jobAds = $('.jobResults .ad-list .job-ad');
	            var title, description, employer, location, postedDateRaw, postedDate, link, linkEnd;

	            jobAds.each(function() {
	            	title = $(this).find('.details .title').text();
	            	description = $(this).find('.details').children('p').text();
	            	postedDateRaw = $(this).find('.details .box-details .boxItemGroup:nth-child(1) .detail').text();
	            	if(postedDateRaw == 'Danes') {
	            		postedDate = Date.now();
	            	} else if(postedDateRaw == 'Včeraj') {
	            		var postedDate = new Date();
	            		postedDate.setDate(postedDate.getDate() - 1);
	            	} else {
	            		postedDate = parseDate(postedDateRaw);
	            	}
	            	
	            	employer = $(this).find('.details .box-details .boxItemGroup:nth-child(2) .detail').text();
	            	location = $(this).find('.details .box-details .boxItemGroup:nth-child(3) .detail').text();
	            	linkEnd = $(this).attr('href');
	            	if(!linkEnd) {
	            		linkEnd = $(this).children('a.details').attr('href');
	            	}
	            	link = 'https://www.mojedelo.com' + linkEnd;

	            	jobs.push({
	            		title,
	            		description,
	            		employer,
	            		location,
	            		postedDate,
	            		link
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
	            var title, description, employer, locationRaw, location, postedDateRaw, postedDate, link;

	            details.each(function() {
	            	title = $(this).children('h4').text();
	            	description = $(this).find('.description').text();
	            	employer = $(this).find('.company').text();
	            	locationRaw = $(this).find('.location').text();
	            	location = locationRaw.replace(' Kraj dela: ', '');
	            	postedDateRaw = $(this).find('.date').text();
	            	postedDate = postedDateRaw.replace(' Objavljeno: ', '');
	            	postedDate = postedDate.trim();
	            	postedDate = parseDate(postedDate);
	            	link = 'https://www.mojazaposlitev.si/' + $(this).children('h4').children('a').attr('href');

	            	jobs.push({
	            		title,
	            		description,
	            		employer,
	            		location,
	            		postedDate,
	            		link
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
	            var title, description, employer, location, postedDate, link;

	            details.each(function() {
	            	title = $(this).find('.jobTitle .title').text();
	            	description = $(this).find('.jobData .jobContent p').text();
	            	employer = $(this).find('.box-details .boxItemGroup:nth-child(2) .detail').text();
	            	location = $(this).find('.lokacija strong').text();
	            	link = $(this).find('.jobData .actionBlock a.button1').attr('href');

	            	if(links.indexOf(link) == -1) {
	            		postedDate = new Date().getTime();
	            	} else {
	            		// For now some date before 22.5., after some time all dates will be right
	            		postedDateRaw = '15.5.2017';
	            		postedDate = parseDate(postedDateRaw);
	            	}

	            	jobs.push({
	            		title,
	            		description,
	            		employer,
	            		location,
	            		postedDate,
	            		link
	            	});
	            });
	        }
	    });
	}
});

function parseDate(input) {
	var parts = input.split('.');
	// new Date(year, month [, day [, hours[, minutes[, seconds[, ms]]]]])
	var date = new Date(parts[2], parts[1]-1, parts[0]); // months are 0-based
	return date.valueOf();
}

module.exports = router;
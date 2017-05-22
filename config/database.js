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

module.exports = firebase;
/**********************************************************
*
* APP NAME
* 2012 [COMPANY NAME]
* Authors: David DeRemer
* [File Description]
*
**********************************************************/

/*********************************************************
* Dependencies.
*********************************************************/

// Require modules
var url = require('url'),
		express = require('express'),
		async = require('async');


/*********************************************************
* Create & Configure Express
* (http://expressjs.com/)
*********************************************************/

// Create Express App
var app = express();

// Set config based on environment
app.configure('development', require('../config/environments/development.js'));
app.configure('testing', require('../config/environments/testing.js'));
app.configure('production', require('../config/environments/production.js'));
app.configure(require('../config/environments/all.js'));



/*********************************************************
* Bind Models & Routes
*********************************************************/
require('./routes/routes.js').bind(app, require('./models/models.js').bind());



/*********************************************************
* Start Webserver
*********************************************************/

if (module.parent) { throw new Error('Oops! Not the parent!'); }
else {
	// Set port if dynamically allocated (e.g., by Heroku)
	var port = parseInt(process.env.PORT) || 3000;
	var dburl = url.parse(app.set('mongodb-uri'));
	var redisurl = url.parse(app.set('redisSession-uri'));
	
	////////////////////////////////////////////
	// Start listening!
	////////////////////////////////////////////
	app.listen(port, function(){
	
	  // Show startup messages
		console.log(app.set('name') + " listening on port: " + port);
		console.log('BASEURL: ' + app.set('baseurl'));
		console.log('MONGODB-URI: ' + dburl.hostname + ':' + dburl.port + dburl.pathname);
		console.log('REDIS-URI: ' + redisurl.hostname + ':' + redisurl.port);
		console.log('////////////////////////////////////////////////////////////');
	});
	
} 


/*********************************************************
* Module Exports.
*********************************************************/

// Set exports
module.exports = app;
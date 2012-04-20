/**********************************************************
*
* App Config For Production Environment
*
**********************************************************/

// Require modules
var express = require('express'),
		qs = require('querystring'),
		url = require('url');

// Require params
var appParams = require('../params/params');

// Get Redis Config
var redisSessionUrl = url.parse(appParams.production.redisSession),
		redisSessionAuth = redisSessionUrl.auth.split(':'),
		redisSessionConfig = { 'host' : redisSessionUrl.hostname, 'port' : redisSessionUrl.port, 'db' : redisSessionAuth[0], 'pass' : redisSessionAuth[1]};	



/*********************************************************
* Parse out passwords from the log
* Function replaces password=12345 with password=XXXXX
*********************************************************/
express.logger.token('url', function(req) {
  var pURL = url.parse(req.originalUrl, true);
  if (pURL.query && pURL.query.password) {
  	pURL.query.password = 'XXXXXXXXXX'; 
		var hostStr = (pURL.protocol || '');
  	if (hostStr != '') { hostStr += '//'; }
  	hostStr += (pURL.hostname || '');
  	return hostStr + (pURL.pathname || '') + '?' + qs.stringify(pURL.query);
  } else { return req.originalUrl; }
});




/*********************************************************
* Module Exports.
* Define Express Configuration
*********************************************************/

module.exports = function() {
	
	// Set params
	this.set('env', 'Production');
	this.set('envParams', appParams.production);
	this.set('baseURL', appParams.production.url);
	this.set('sessionSecret', appParams.production.sessionSecret);
	
	// Set Express Defaults 
	this.use(express.logger());
	
	// Set Redis Session Store Config
	this.set('redisSession-uri', appParams.production.redisSession);
	this.set('redisSessionConfig', redisSessionConfig);
	
	// MongoDB primary database config
  this.set('mongodb-uri', appParams.production.mongoStore);
  
  // Redirect all requests to HTTPS									
	/*this.use(function(req, res, next) {
	    var schema = req.headers["x-forwarded-proto"];
	    // --- Do nothing if schema is already https
	    if (schema === "https") { return next(); }
	    // --- Else, redirect to https
	    else { res.redirect("https://" + req.headers.host + req.url); }
	});
	*/

};





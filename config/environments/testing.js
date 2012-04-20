/**********************************************************
*
* App Config For Testing Environment
*
**********************************************************/

// Require modules
var express = require('express'),
		qs = require('querystring'),
		url = require('url');

// Require params
var appParams = require('../params/params');

// Get Redis Config
var redisSessionUrl = url.parse(appParams.testing.redisSession),
		redisSessionAuth = redisSessionUrl.auth.split(':'),
		redisSessionConfig = { 'host' : redisSessionUrl.hostname, 'port' : redisSessionUrl.port, 'db' : redisSessionAuth[0], 'pass' : redisSessionAuth[1]};	



/*********************************************************
* Module Exports.
* Define Express Configuration
*********************************************************/

module.exports = function() {
	
	// Set params
	this.set('env', 'Testing');
	this.set('envParams', appParams.testing);
	this.set('baseURL', appParams.testing.url);
	this.set('sessionSecret', appParams.testing.sessionSecret);
	
	// Set Express Defaults 
	this.use(express.logger());
	
	// Set Redis Session Store Config
	this.set('redisSession-uri', appParams.testing.redisSession);
	this.set('redisSessionConfig', redisSessionConfig);
	
	// MongoDB primary database config
  this.set('mongodb-uri', appParams.testing.mongoStore);
  
};





/**********************************************************
*
* App Config For Development Environment
*
**********************************************************/

// Require modules
var express = require('express'),
		qs = require('querystring'),
		url = require('url');

// Require params
var appParams = require('../params/params');

// Get Redis Config
var redisSessionUrl = url.parse(appParams.dev.redisSession),
		redisSessionAuth = redisSessionUrl.auth.split(':'),
		redisSessionConfig = { 'host' : redisSessionUrl.hostname, 'port' : redisSessionUrl.port, 'db' : redisSessionAuth[0], 'pass' : redisSessionAuth[1]};	



/*********************************************************
* Module Exports.
* Define Express Configuration
*********************************************************/

module.exports = function() {
	
	// Set params
	this.set('env', 'Development');
	this.set('envParams', appParams.dev);
	this.set('baseURL', appParams.dev.url);
	this.set('sessionSecret', appParams.dev.sessionSecret);
	
	// Set Express Defaults 
	this.use(express.logger());
	
	// Set Redis Session Store Config
	this.set('redisSession-uri', appParams.dev.redisSession);
	this.set('redisSessionConfig', redisSessionConfig);
	
	// MongoDB primary database config
  this.set('mongodb-uri', appParams.dev.mongoStore);
  
};





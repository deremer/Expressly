/**********************************************************
*
* App Config For All Environments
*
**********************************************************/

// Require modules
var express = require('express'),
		connect_redis = require('connect-redis')(express),
		mongoose = require('mongoose'),
		url = require('url');

// Require params
var appParams = require('../params/params.js');



/*********************************************************
* Module Exports.
* Define Express Configuration
*********************************************************/

module.exports = function() {

	// Set params
	this.set('globalParams', appParams.global);
	this.set('name', appParams.global.name);
	this.set('basepath', (url.parse(this.set('baseURL'))).host);
	this.set('baseprotocol', (url.parse(this.set('baseURL'))).protocol);
	this.set('baseurl', (this.set('baseURL')));

	// Set middleware
  this.use(express.bodyParser());
  this.use(express.cookieParser());
  this.use(express.methodOverride());
  
  // Set Routes
  this.use(this.router);
  this.set('publicPath', __dirname + '/../../public');
  this.use(express.static(this.set('publicPath')));
	this.use(express.favicon(this.set('publicPath') + '/favicon.ico'));

	// Set Redis session store
  this.use(express.session({ store: new connect_redis(this.set('redisSessionConfig')), secret: this.set('sessionSecret')}));
  
  // Define Mongo database connection for Mongoose
	this.set('mongoose', mongoose.connect(this.set('mongodb-uri')));

	  
	// Set View Config	
  this.set('view engine', 'ejs');
  this.set('views', __dirname + '/../../app/views');
   	    
  
	////////////////////////////////////////////////////////////
	// Configure error output to the client
	////////////////////////////////////////////////////////////
	
	var resultHandler = function(err, result, res, finish) { 
		if (result && !err) { res.send({'response' : result}); }
		else { finish(err); }
	};
	
	this.set('resultHandler', resultHandler);
	
	if (this.set('errorOutput') == 'json') {
		this.error(function(err, req, res, next) {
			// Set the X-INTERNAL-ERROR custom header
			res.header('X-INTERNAL-ERROR', JSON.stringify(err));
			res.send({'error': err.error || err }, err.status || 500);
		});
	} else { 
		if (this.set('env') == 'Production') { this.use(express.errorHandler({ dumpExceptions: true })); }
		else { this.use(express.errorHandler({ dumpExceptions: true, showStack: true })); }
	}
  
};

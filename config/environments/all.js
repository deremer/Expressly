/**********************************************************
*
* App Config For All Environments
*
**********************************************************/

// Require modules
var express = require('express'),
		connect_redis = require('connect-redis')(express),
		compiler = require('connect-compiler'),
		mongoose = require('mongoose'),
		ejs = require('ejs'),
		url = require('url'),
		fs = require('fs');

// Require params
var appParams = require('../params/params.js'),
		appErrors = require('../params/errors.js');



/*********************************************************
* Module Exports.
* Define Express Configuration
*********************************************************/

module.exports = function() {

	var app = this;
	
	////////////////////////////////////////////////////////////
	// Configure Express Params and Connect Middleware
	////////////////////////////////////////////////////////////

	// Set params
	this.set('globalParams', appParams.global);
	this.set('name', appParams.global.name);
	this.set('basepath', (url.parse(this.set('baseURL'))).host);
	this.set('baseprotocol', (url.parse(this.set('baseURL'))).protocol);
	this.set('baseurl', (this.set('baseURL')));
	  
  // Define Mongo database connection for Mongoose
	this.set('mongoose', mongoose.connect(this.set('mongodb-uri')));

	// Set connect middleware
  this.use(express.bodyParser());
  this.use(express.cookieParser(this.set('sessionSecret')));
  this.use(express.methodOverride());
  
  // Set Redis session store
  this.use(express.session({ store: new connect_redis(this.set('redisSessionConfig')), secret: this.set('sessionSecret')}));
  
  // Enable JSONP
	this.enable('jsonp callback');
  
  // Set static paths and view engine
  this.set('publicPath', __dirname + '/../../public');
  this.set('privatePath', __dirname + '/../../private');
  this.set('views', __dirname + '/../../app/views');
	this.set('view engine', 'ejs');
    
  // Enable dynamic recompiling of less derived files at serve-time
  // OLD WAY -> this.use(express.compiler({ src: this.set('publicPath'), enable: ['less'] }));
	this.use(compiler({
              enabled : [ 'less' ],
              src     : 'private',
              dest     : 'public'
          }));

	// Set static file server
	this.use(express.static(this.set('publicPath')));
  this.use(express.staticCache());
  this.use(express.favicon(this.set('publicPath') + '/ico/favicon.ico'));


	////////////////////////////////////////////////////////////
	// Hack to enable patial-like behavior with EJS
	// Currently only enables static HTML blocks 
	////////////////////////////////////////////////////////////
	var getPartials = function() {
		var partialViewFiles = fs.readdirSync(app.set('views') + '/partials');
		var partials = {};
		if (partialViewFiles && partialViewFiles.length > 1) {
			// For each file, if it's not this file, bind routes
			partialViewFiles.forEach(function(file) {
				var shortname = file.replace('.ejs','');
				partials[shortname] = fs.readFileSync(app.set('views') + '/partials/' + file, 'utf8');
			});
		}
		return partials;
	}

	this.set('partials', getPartials());
	
	
	
	////////////////////////////////////////////////////////////
	// View Locals
	////////////////////////////////////////////////////////////
	
	app.locals.use(function(req, res) {
	  res.locals.partials = app.set('partials');
	  res.locals.session = req.session;
	});
		
	
	////////////////////////////////////////////////////////////
	// Prefix middleware
	////////////////////////////////////////////////////////////
	
	this.use('/', function(req, res, next) {
		req.x = {}; // Set X object that contains application data
		next();
	});
	
	this.use('/api', function(req, res, next) {
		req.x.json = true;
		next();
	});
	
	
	////////////////////////////////////////////////////////////
	// Bind Routes
	////////////////////////////////////////////////////////////
	
	this.use(this.router);



	////////////////////////////////////////////////////////////
	// Post-route middleware (success/error handling) 
	////////////////////////////////////////////////////////////
	
	
	/**** SUCCESSES ****************************************************************
	*
	* For API return, controllers should set the following and call next()
	* 	- req.x.response = output to return to client
	*		- req.x.status = HTTP status code to return to client
	*
	*	For direct output to client, controllers should call res.send, res.render
	*
	********************************************************************************/
	
	
	this.use(function(req, res, next) {
		if (req.x) {
			console.log(req.x);
			if (req.x.json) {
				res.json(req.x.status || 200, {'status': req.x.status || 200, 'response': req.x.response });
			} else if (req.x.response) {
				res.send(req.x.status || 200, req.x.response);
			} else { next(); }
		} else { next(); }
	});
	
	
	/**** ERRORS ****/
	
	this.use(function(err, req, res, next) {
		if (req.x && req.x.json) {
			var errObj = appErrors.errorHandler(err);
			res.set('X-INTERNAL-ERROR', JSON.stringify(errObj));
			res.send(errObj.status || 404, errObj);
		} else {
			res.set('X-INTERNAL-ERROR', err);
			next(err);
		}	
	});	
	
	if (this.set('env') == 'Production') {
		this.use(express.errorHandler({ dumpExceptions: true })); 
	} else {
		this.use(express.errorHandler({ dumpExceptions: true, showStack: true })); 
	}

};

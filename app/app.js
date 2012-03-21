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
var express = require('express'),
		async = require('async');


/*********************************************************
* Create & Configure Express
* (http://expressjs.com/)
*********************************************************/

// Create Express App
var app = express.createServer();

// Set config based on environment
app.configure('development', require('../config/environments/development.js'));
app.configure('testing', require('../config/environments/testing.js'));
app.configure('production', require('../config/environments/production.js'));
app.configure(require('../config/environments/all.js'));


/*********************************************************
* Bind Models & Routes
*********************************************************/
var models = require('./models/models.js').bind();
var routes = require('./routes/routes.js').bind(app, models);


/*********************************************************
* Module Exports.
*********************************************************/

// Set exports
module.exports = app;
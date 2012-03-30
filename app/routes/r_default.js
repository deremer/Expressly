/**********************************************************
*
* [TYPE] Routes For App
*
**********************************************************/
var less = require('less'),
		fs = require('fs');


/*********************************************************
* Define Routes for App
*********************************************************/
var bind = function (app, controller) {

	// Default Route
	app.get('/', function(req, res, next) {
		controller.index(req, res, function (err, result) { app.set('resultHandler')(err, result, res, next); }); 
	});
	
	app.get('/bootstrap', function(req, res, next) {
		controller.bootstrap(req, res, function (err, result) { app.set('resultHandler')(err, result, res, next); }); 
	});

};













/*********************************************************
* Module Exports.
*********************************************************/
exports.bind = bind;
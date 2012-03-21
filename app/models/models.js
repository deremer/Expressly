/**********************************************************
*
* Mongoose Model Loader
*
**********************************************************/

// Require modules
var fs = require('fs'),
		async = require('async'),
		mongoose = require('mongoose');

/*********************************************************
* Mount models to App
*********************************************************/

var bind = function(app) {

	var self = this;

	var modelNames = [];
	var models = {};
	
	// Get file names in current directory
	var files = fs.readdirSync( __dirname);
	if (files && files.length > 1) {
		files.forEach(function(file) {
			if (file != 'models.js' && file != '.DS_Store') {
				var shortname = file.replace('m_','').replace('.js',''); 
				modelNames.push(shortname);
				
				var model = require('./' + file); 
				models[shortname.toUpperCase()] = model.define(app);
			}
		});
		console.log('Models Bound: ' + modelNames);
		return models;
			/*
			// For each file, if it's not this file, bind models
			async.forEach(files, function(file, next) {
				if (file != 'models.js' && file != '.DS_Store') {
					var shortname = file.replace('m_','').replace('.js',''); 
					modelNames.push(shortname);
					
					var model = require('./' + file); 
					models[shortname.toUpperCase()] = model.define(app);
					next();
					
				} else { next(); }
			}, function(err) {
				if (err) { throw new Error('Error binding models'); }
				else {
					console.log('Models Bound: ' + modelNames);
					callback(models);
				}
			});
			*/
	} else { throw new Error('No model files present'); }
};

/*********************************************************
* Module Exports.
*********************************************************/
exports.bind = bind;
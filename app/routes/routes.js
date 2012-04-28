/**********************************************************
*
* Route Loader
*
**********************************************************/

// Require modules
var fs = require('fs'),
		async = require('async');

/*********************************************************
* Mount routes to App
*********************************************************/
var mount = function(app, m) {

	var routes = [];
	
	// Get file names in current directory
	var files = fs.readdirSync(__dirname);
	
	if (files && files.length > 1) {
				
		// For each file, if it's not this file, mount routes
		files.forEach(function(file) {
			if (file != 'routes.js' && file != '.DS_Store') {
				var shortname = file.replace('r_','').replace('.js','');
				routes.push(shortname);
				
				// Get controller file
				var controller;
				var controllerFn = file.replace('r_', 'c_');
				var controllerPath = __dirname + '/../controllers/' + controllerFn;
				
				// Verify controller exists
				var stats = fs.statSync(controllerPath);
				if (stats.isFile()) {
				
					// Get controller
					var controller = require(controllerPath);
					controller.mount(app, m);
					
					// mount route with controller
					var route = require('./' + file); 
					route.mount(app, controller);
					
				} else { throw new Error('Could not get controller: ' + controllerFn); }
			}
		});
		console.log('Routes Bound: ' + routes);
	} else { throw new Error('No route files present'); }
};

/*********************************************************
* Module Exports.
*********************************************************/
exports.mount = mount;
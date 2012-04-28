/**********************************************************
*
* [TYPE] Routes For App
*
**********************************************************/
var less = require('less'),
		fs = require('fs');


/*********************************************************
* Define Routes for App
* 	Use routes to define controllers
*		Make endpoints available
*		Define route access via middleware
*********************************************************/
var mount = function (app, controller) {

	// Default route, render HTML
	app.get('/', controller.index);
	
	// Call a controller, render Twitter Bootstrap
	app.get('/bootstrap', controller.bootstrap);
	
	// Call a controller and handle the response in the route
	app.get('/dosomething', function(req, res, next) { 
		controller.dosomething(req, res, function(err, result) {
			if (err) { throw new Error(err); }
			else {
				res.send(result);
			}
		});	
	});
	
	// Return response as json 
	// HINT! req.x.json is set to true by route prefix middleware
	app.get('/api/', controller.api);
	
	// Return a string as json
	app.get('/api/string', controller.string);
	
	// Return result as jsonp (requies ?callback=<functionname> in querystring)
	app.get('/jsonp', controller.jsonp);
	
	// Return result and set http status code
	app.get('/responsewithstatus', controller.responsewithstatus);
	
	// Return error by throwing an error
	app.get('/error', controller.error);
	
	// Return error by calling next with an error
	app.get('/error1', controller.error1);
	
	// Return error as json by setting req.x.json to true and throwing an error
	app.get('/errorjson', controller.errorjson);
	
};













/*********************************************************
* Module Exports.
*********************************************************/
exports.mount = mount;
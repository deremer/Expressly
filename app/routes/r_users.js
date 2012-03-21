/**********************************************************
*
* [TYPE] Routes For App
*
**********************************************************/



/*********************************************************
* Define Routes for App
*********************************************************/
var bind = function (app, controller) {



	app.get('/users', function(req, res, next) {
		controller.getUsers(req, res, function (err, result) { app.set('resultHandler')(err, result, res, next); }); 
	});




};













/*********************************************************
* Module Exports.
*********************************************************/
exports.bind = bind;
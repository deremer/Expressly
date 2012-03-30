/**********************************************************
*
* [TYPE] Controller For App
*
**********************************************************/



/*********************************************************
* Define Controller for App Route
*********************************************************/
var bind = function (app, m) {



	this.index = function(req, res, callback) {
		res.render('home.ejs');
	}
	
	
	this.bootstrap = function(req, res, callback) {
		res.render('bootstrap.ejs');
	}




};













/*********************************************************
* Module Exports.
*********************************************************/
exports.bind = bind;
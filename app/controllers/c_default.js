/**********************************************************
*
* [TYPE] Controller For App
*
**********************************************************/



/*********************************************************
* Define Controller for App Route
*********************************************************/
var mount = function (app, m) {


	this.index = function(req, res, next) {
		res.render('home.ejs');
	}	
	
	this.bootstrap = function(req, res, next) {
		res.render('bootstrap.ejs');
	}
	
	this.dosomething = function(req, res, callback) {
		callback(null, 'did it!');
	}
	
	this.api = function(req, res, next) {
		req.x.response = {'key': 'value'};
		next();
	}
	
	this.string = function(req, res, next) {
		req.x.response = 'some random string';
		next();
	}
	
	this.jsonp = function(req, res, next) {
		req.x.response = {'obj': 'testing jsonp'};
		next();
	}
	
	this.responsewithstatus = function(req, res, next) {
		req.x.response = 'Hello world';
		req.x.status = 500;
		next();
	}
	
	this.error = function(req, res, next) {
		throw new Error('You can throw errors');
	}
	
	this.error1 = function(req, res, next) {
		next('You can return errors by calling next');
	}
	
	this.errorjson = function(req, res, next) {
		req.x.json = true;
		throw new Error('You can throw errors as json');
	}

};













/*********************************************************
* Module Exports.
*********************************************************/
exports.mount = mount;
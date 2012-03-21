/**********************************************************
*
* [TYPE] Controller For App
*
**********************************************************/



/*********************************************************
* Define Controller for App Route
*********************************************************/
var bind = function (app, m) {



	this.getUsers = function(req, res, callback) {
		m.USER.get({'field1': req.param('field1'), 'field2': req.param('field2')}, function(err, result) {
			if (err) { callback(err); }
			else { callback(null, result); }
		});
	}




};













/*********************************************************
* Module Exports.
*********************************************************/
exports.bind = bind;
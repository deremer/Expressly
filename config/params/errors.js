/**********************************************************
* Error Codes for Centralized Error Message control
* 
* Codes contain:
* 	- code: the error code
*		- message: message for the error
*   - status: response status code (default: 404)
**********************************************************/
var _u = require('underscore');


/**********************************************************
*
* code: short code for easier error handling
* error: error message for developers
* message: optional message to display to client user (optional)
* status: http status code for response (optional, default 404)
*
**********************************************************/

var errorCodes = {

	// 1000s are for authentication and access errors
	 '1000': { 'code': 1000, 'error': 'Token is required', 'message': 'Token is required', 'status': 401}
	,'1001': { 'code': 1001, 'error': 'Not Authorized', 'message': 'Not Authorized', 'status': 401} 
	
	// 2000s are for data related errors
	,'2000': { 'code': 2000, 'error': 'Error accessing resource', 'message': 'Error accessing resource'}
	,'2001': { 'code': 2001, 'error': 'Resource not found', 'message': 'Resource not found'}
	
	// 9000s are for system errors

};


var errorHandler = function(err) {
	var errObj = {};
	
	// Pass a number to send just a status code
	// Or to use a pre-configured code from erroCodes
	if (typeof err == 'number') {
		if (err >= 1000) {
			if (errorCodes[err]) { errObj = errorCodes[err]; }
		} else {
			errObj.status = err;
		}
	} 
	
	// Allow passing of error object directly
	// But filter output to template response
	if (typeof err == 'object') {
		if (err.status) { errObj.status = err.status } else { errObj.status = 404; }
		if (err.error) { errObj.error = err.error; } 
		else if (err.errors) { errObj.error = err.errors; }
		else if (err.err) { errObj.error = err.err; }
		else { errObj.error = 'unspecified error'; }
		if (err.message) { errObj.message = err.message; }
		if (err.code && _u.has(errorCodes, err.code)) { errObj.code = err.code; }
	}
	
	// If error format is unhandled just set the error object as the error
	if (_u.isEmpty(errObj)) { errObj.error = err; }
	
	return errObj;
};

	
/*********************************************************
* Module Exports.
*********************************************************/

exports.errorCodes = errorCodes;
exports.errorHandler = errorHandler;


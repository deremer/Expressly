/**********************************************************
* Error Codes for Centralized Error Message control
* 
* Codes contain:
* 	- code: the error code
*		- message: message for the error
*   - status: response status code (default: 500)
**********************************************************/



var errorCodes = {

		// 1000s are for authentication and user user
			'1000': { 'code': 1000, 'message': 'User not found'}
		, '1001': { 'code': 1001, 'message': 'Token is required', 'status': 401}
		
		// 2000s are for content creation related errors
			'2000': { 'code': 2000, 'message': 'Error creating user'}
		, '2001': { 'code': 2001, 'message': 'Missing required field to create new user'}
		
		// 3000s are for content lookup errors
		
		// 9000s are for system errors
	
	};
	
	
/*********************************************************
* Module Exports.
*********************************************************/

module.exports = errorCodes;


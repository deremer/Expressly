/**********************************************************
*
* Run App Cluster Forever
*   Starts app as a cluster that runs "forever"
*   https://github.com/nodejitsu/forever
*
**********************************************************/

// Require modules
var forever = require('forever');

// Require params
var appParams = require('../config/params/params.js');

// Start appserver
var appserver = new (forever.Monitor)('./cluster.js', appParams.global.forever);
appserver.start();

// Report messages to console
appserver.on('start', function(err) {
	console.log(appParams.global.name + ' (' + (process.env.NODE_ENV || 'Development') + ')');
});
/**********************************************************
*
* Create Webserver Cluster for App
*   Uses Cluster to replicate App to multiple workers
*   Max workers: 1 per CPU core
*   https://github.com/LearnBoost/cluster
*
**********************************************************/

// Require modules
var url = require('url'),
		cluster = require('cluster');

// Create app instance
var app = require('./app.js');

// Launch cluster
if (!module.parent) {
	
	// Set port if dynamically allocated (e.g., by Heroku)
	var port = parseInt(process.env.PORT) || 3000;
	
	cluster(app)
		.set('workers', app.set('clusterWorkers'))
	  //.use(cluster.debug())
  	.listen(port, function() {
  		// Show startup messages
			console.log("PORT: " + port);
			console.log('BASEURL: ' + app.set('baseurl'));
			var dburl = url.parse(app.set('mongodb-uri'));
			console.log('MONGODB-URI: ' + dburl.hostname + ':' + dburl.port + dburl.pathname);
			var redisurl = url.parse(app.set('redisSession-uri'));
			console.log('REDIS-URI: ' + redisurl.hostname + ':' + redisurl.port);
			console.log('WORKERS: ' + app.set('clusterWorkers'));
		});
		
} else { throw new Error('Oops, this is the parent module!'); }
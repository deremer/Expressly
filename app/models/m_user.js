/**********************************************************
*
* [MODELNAME] Model For App
* 
*
**********************************************************/

// Require modules
var mongoose = require('mongoose'),
		async = require('async');

// Set variables
var Schema = mongoose.Schema,
		ObjectId = Schema.ObjectId,
		ObjectIdType = mongoose.Types.ObjectId;



// Model Define function 
exports.define = function (app) {



	/**********************************************************
	* Schema definition 
	**********************************************************/

	var User = new Schema({
	  field1	    : { type : String },
	  field2	    : { type : {} }
	});




	/**********************************************************
	* Indexes
	**********************************************************/
	
	User.index({ 'field2': 1 });



	/**********************************************************
	* Virtuals and middleware
	**********************************************************/
	
	User.virtual('id')
	    .get(function() { return this.field1; });
	    
	User.pre('save', function(next) {
  	// Do something before saving
    next();
	});



	/**********************************************************
	* Methods: Manipulate a record
	**********************************************************/

	User.method('initialize', function(field1, field2, callback) {
		this.field1 = field1;
		this.field2 = field2;
		this.save(function(err) {
	  	if (err) { callback(err); }
	  	else { callback(); }
	  });
	});
	
	
	
	/**********************************************************
	* Statics: Manipulate a model
	**********************************************************/

	User.statics.get = function (query, callback) {
		this.find(query, function(err, result) {
			if (err) { callback(err); }
			else { callback(null, result); }
		});
	};
	
	
	
	/**********************************************************
	* Return Model
	**********************************************************/
	
	return mongoose.model('User', User);
	

};
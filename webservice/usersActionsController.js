var mogoose = require('mongoose');
var db = mogoose.connect('mongodb://db_user:db_pass@ds047632.mongolab.com:47632/momentapp');


var usersSchema  = require('./users_schema').usersSchema;
mogoose.model('usersM', usersSchema);
var usersAction;



mogoose.connection.once('open',function(){
	var Users = this.model('usersM');
var query = Users.find();
query.where('userId').ne('99');

query.exec(function(err, docs){
	usersAction = docs;
	console.log("docs: " + usersAction);
	mogoose.disconnect();
	return usersAction;
	
	});
});

exports.getData = function(){
	return usersAction;
};
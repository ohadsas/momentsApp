var mongoose = require('mongoose');
var db = mongoose.connect('mongodb://db_user:db_pass@ds047632.mongolab.com:47632/momentapp');

var usersSchema  = require('./users_schema').usersSchema;
mongoose.model('usersM', usersSchema);
var usersAction;

mongoose.connection.once('open',function(){
	var Users = this.model('usersM');
	var query = Users.find();
	query.where('userId');

query.exec(function(err, docs){
	usersAction = docs;
	console.log("docs: " + usersAction);
	return usersAction;
	});
});

exports.getData = function(){
	return usersAction;
};

exports.userLogin = function(_email, _password, cb){
	console.log(_email + " " + _password);
	var Users = mongoose.model('usersM');
	Users.findOne({
		'email' : _email,
		'pass' : _password
	}, null, function(err, data) {
		console.log(err);
		console.log(data);
		cb(err, data);
	});
}

exports.createMoment = function(_userId, _coorLat, _coorLong, _message, _color, cb){
	console.log(_userId + " " + _coorLat + " " + _coorLong + " " + _message + " " + _color);
	var Users = mongoose.model('usersM');
	console.log(" createMoment Called");
		// console.log(_address);

	Users.findOne({
		'userId' : _userId
	}, null, function(err, data) {
		data.myMoments.push({	'coor':{'latitude' : _coorLat, 'longitude' : _coorLong},
		 	'momMessage': _message,
			'color':_color,
		
			});
		data.save();
		console.log(err + "ERR");
		console.log(data + "OK");
		cb(err, data);
	});
}



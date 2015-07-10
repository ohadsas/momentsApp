var mongoose = require('mongoose');
var schema = mongoose.Schema;

var usersSchema = new schema({

userId: {type:Number, required:true, unique:true},
sign: {type:String, required:true, unique:true},
pass: {type:Number, required:true},
myMoments: [{
	momId: {type:Number, required:true, unique:true},
	momMessage: {type:String, required:true},
	color: {type:String, required:true},
	address: {type:String, required:true},
	coor: [{
		longitude:{type:Number, required:true},
		latitude:{type:Number, required:true}
	}],
	date: String,
	time: String,
	explores: Number,
	saveTheMom: Boolean,
	remoments: [{
		sign: {type:String, required:true, unique:true},
		remMessage: {type:String, required:true},
		date: String,
		time: String,
		flag: Boolean
	}]
}],
savedMom: [{
	momId: {type:Number, required:true, unique:true},
	momMessage: {type:String, required:true},
	address: {type:String, required:true},
	saveTheMom: Boolean
}]
}, {collection: 'users'});

exports.usersSchema = usersSchema;

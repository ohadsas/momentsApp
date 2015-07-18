var mongoose = require('mongoose');
var schema = mongoose.Schema;

var usersSchema = new schema({

userId: {type:String, required:true, unique:true},
email:{type:String, required:true, unique:true},
sign: {type:String, required:true, unique:true},
pass: {type:String, required:true},
myMoments: [{
	momId: {type:Number, required:true, unique:true},
	// _id: mongoose.Schema.Type,
	momMessage: {type:String},
	color: {type:String},
	address: {type:String},
	coor: [{
		latitude:{type:Number},
		longitude:{type:Number}
	}],
	date: String,
	time: String,
	explores: Number,
	saveTheMom: Boolean,
	remoments: [{
		sign: {type:String},
		remMessage: String,
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

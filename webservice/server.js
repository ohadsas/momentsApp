/* create express instance and listen to port 8080 */
/* DONOT forget (cmd, at project folder): $npm install express -- save */
var express = require('express');
var app = express();
app.use('/', express.static('./public'));
var usersAction = require('./usersActionsController');
var bodyParser = require('body-parser');
var cors = require('cors');
app.use(cors());
app.use(bodyParser());


app.get('/get', function(req,res){
	console.log("out Docs :" + usersAction.getData());
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Header", "Origin, X-Requested-With,Content-Type, Accept");
	app.set('json spaces',4);
	res.set("Content-Type", "application/json");
	res.status(200);
	res.json(usersAction.getData());
});


app.post('/createmoment', function(req,res){
	var Obj = (req.body);
	console.log(" req.body !!!!!" + Obj);
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Header", "Origin, X-Requested-With,Content-Type, Accept");
	res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE');
	app.set('json spaces',4);
	res.set("Content-Type", "application/json");

	usersAction.createMoment(Obj.email, Obj.coor.latitude, Obj.coor.longitude , Obj.message, Obj.color, function(err, docs){
	
		if(docs){
		return res.send(JSON.stringify(docs));
		//console.log(docs);				
			console.log( " Docs !!!!!" + docs);
		res.status(200);
		}
		else{
			res.status(500).send(err);	
		}
		});
});

app.post('/login', function(req,res){
	var Obj = (req.body);
	console.log("User Details:"  + Obj.email + " - " + Obj.password);
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Header", "Origin, X-Requested-With,Content-Type, Accept");
	res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE');
	app.set('json spaces',4);
	res.set("Content-Type", "application/json");
	
	//console.log("Is User Exist :" + usersAction.userLogin(Obj.email,Obj.password));
	usersAction.userLogin(Obj.email,Obj.password, function(err, docs){
		console.log(docs);
		if(docs){
		return res.send(JSON.stringify(docs));
		//console.log(docs);				
		res.status(200);
		}
		else{
			res.status(404).send(err);
		}

		});
});

app.listen(process.env.PORT || 3000);
console.log("service is listening on port 3000 !!!!!");
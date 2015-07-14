/* create express instance and listen to port 8080 */
/* DONOT forget (cmd, at project folder): $npm install express -- save */
var express = require('express');
var app = express();
app.use('/', express.static('./public'));
var usersAction = require('./usersActionsController');
var bodyParser = require('body-parser');

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


app.post('/login', function(req,res){
	console.log("dskjlkdsjlfkjsdlkfjsdlkjfldkjsdflkfdsjl");
	console.log("POST :" + req);
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Header", "Origin, X-Requested-With,Content-Type, Accept");
	res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE');
	app.set('json spaces',4);
	res.set("Content-Type", "application/json");
	res.status(200);
	res.json("POST:"  + req);
});






app.listen(process.env.PORT || 3000);
console.log("service is listening on port 3000 !!!!!")
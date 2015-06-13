/* create express instance and listen to port 8080 */
/* DONOT forget (cmd, at project folder): $npm install express -- save */
var express = require('express');
var app = express();
//app.use('/', express.static('./public')).listen(3000);
var todoAction = require('./usersActionsController');

app.get('/ws_todo/getActionsData', function(req,res){
	console.log("out Docs :" + todoAction.getData());
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Header", "Origin, X-Requested-With,Content-Type, Accept");
	app.set('json spaces',4);
	res.set("Content-Type", "application/json");
	res.status(200);
	res.json(todoAction.getData());
});

app.listen(3000);
console.log("service is listening on port 3000 !!!!!")
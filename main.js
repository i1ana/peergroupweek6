

var fs = require('fs')
var express = require('express');
var bodyParser = require('body-parser');
var logger = require('morgan');
var app = express();


app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.get('/', function(req, res){
	res.sendFile('main.html', {root: './public'})
})

app.get('/:location', function(req, res){
	console.log("xxx", req.params.location)
	try {
		var stat = fs.statSync("/Users/student/projects/magellan/public/" + req.params.location)
		if (stat.isFile()){
			console.log("exists")
		res.sendFile(req.params.location, {root: './public'})
		} else {
			console.log("404 error")
			res.status(404); 
			res.send("Magellan didn't go here bro")
			}
	} catch(err){
		console.log("404 error")
			res.status(404); 
			res.send("not found")
	}
})



// app.use(function(req, res){
// 	res.send("Couldn't find page")
// });

// var oops = function(req, res, next){
// 	console.log("Oops!")
// 	var theError = new Error()
// 	theError.whatHappened = 'everything is on fire'
// 	next(theError)
// }
// app.use(oops)

var port = 3000
app.listen(port, function(){
	console.log("I am working")
})


'use strict'

var path = require('path');
var bodyParser = require('body-parser');
var fs = require('fs');

var express = require('express')
var app = require('express')();
var server = require('http').Server(app);
// var io = require('socket.io')(server);
var colors = require('colors/safe');

var http = require('http');
var port = 9027;

colors.setTheme({
	setup: ['green','underline'],
	info: ['grey','underline'],
	error: ['red','underline'],
	title: ['cyan','bold'],
});

app.use(bodyParser.urlencoded({extended: true}));
app.use('/templates',express.static(__dirname + '/pages/templates'));
app.use('/assets', express.static(__dirname + '/assets'));
app.use('/project',express.static(__dirname + '/pages/project'));
app.use('/images',express.static(__dirname + '/images'));

app.get('/', function(req,res){
	print("[Connect] Get request to '/'");
	res.sendFile(__dirname+'/pages/index.html', function(){
		res.end();
	});
});

app.get('/information', function(req,res){
	print("[Connect] Get request to '/information'");
	res.sendFile(__dirname+'/pages/information.html', function(){
		res.end();
	});
});

app.post('/response', function(req,	res){
	print("[Connect] Post request to '/response'");
	if(req.body.name.length <= 20 && req.body.email.length <= 40 && req.body.message.length <= 200){
		fs.appendFile('response', req.body.name + ' ' + req.body.email + ' ' + req.body.message + '\n', function (err) {
			if (err) throw err;
		});
		res.sendFile(__dirname+'/pages/response.html', function(){
			res.end();
		});
	}
	else{
		console.log('[System] submit refused');
		res.redirect('back');
	}
});

app.get('/project/math', function(req,res){
	print("[Connect] Get request to '/math'");
	res.sendFile(__dirname+'/pages/project/math/category.html', function(){
		res.end();
	});
});
app.get('/project/physics', function(req,res){
	print("[Connect] Get request to '/physics'");
	res.sendFile(__dirname+'/pages/project/physics/category.html', function(){
		res.end();
	});
});
app.get('/project/chemistry', function(req,res){
	print("[Connect] Get request to '/chemistry'");
	res.sendFile(__dirname+'/pages/project/chemistry/category.html', function(){
		res.end();
	});
});
app.get('/project/biology', function(req,res){
	print("[Connect] Get request to '/biology'");
	res.sendFile(__dirname+'/pages/project/biology/category.html', function(){
		res.end();
	});
});
app.get('/project/earth_science', function(req,res){
	print("[Connect] Get request to '/earth_science'");
	res.sendFile(__dirname+'/pages/project/earth_science/category.html', function(){
		res.end();
	});
});
app.get('/project/information_technology', function(req,res){
	print("[Connect] Get request to '/information_technology'");
	res.sendFile(__dirname+'/pages/project/information_technology/category.html', function(){
		res.end();
	});
});

function getTime(){
	let now = new Date();
	return now.toLocaleDateString() + ' ' + now.toLocaleTimeString();
}

function print(text){
	var i = 0, tag, message;
	for(; i < text.length; i++){
		if(text[i] == ' '){
			tag = text.substr(0,i);
			message = text.substr(i);
			break;
		}
	}
	console.log(colors.title(tag) + colors.magenta(message));
}


server.listen(port,function(){
	console.log(colors.setup("Server is running at port "+port));
});

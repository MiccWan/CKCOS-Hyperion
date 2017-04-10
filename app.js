'use strict'

var path = require('path');
// var bodyParser = require('body-parser');

var express = require('express')
var app = require('express')();
var server = require('http').Server(app);
// var io = require('socket.io')(server);
var colors = require('colors/safe');

var http = require('http');
var port = 9002;

colors.setTheme({
	setup: ['green','underline'],
	info: ['grey','underline'],
	error: ['red','underline'],
	title: ['cyan','bold'],
});

app.use('/assets', express.static(__dirname + '/assets'));
app.use('/',express.static(__dirname + '/pages'));
app.use('/project',express.static(__dirname + '/pages/project'));
app.use('/images',express.static(__dirname + '/images'));

app.get('/', function(req,res){
	print("[System] Get request to '/'")
	res.sendFile(__dirname+'/pages/index.html', function(){
		res.end();
	});
});
app.get('/regist', function(req,res){
	print("[System] Get request to '/regist'")
	res.send("你以為會有東西嗎 哈哈哈你被騙ㄌ");
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

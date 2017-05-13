'use strict'

// Require package
var path = require('path')
var bodyParser = require('body-parser')
var fs = require('fs')
var express = require('express')
var app = require('express')()
var server = require('http').Server(app)
var http = require('http')
var colors = require('colors/safe')
var pug = require('pug')

// Default settings
var config = require('./config.json')
var port = config.port

colors.setTheme({
	setup: ['green','underline'],
	info: ['grey','underline'],
	error: ['red','underline'],
	title: ['cyan','bold'],
	time: ['white', 'underline']
})

// Check if response file exisit
if (!fs.existsSync(__dirname + '/response')){
	fs.closeSync(fs.openSync(__dirname + '/response', 'w'))
	console.log("Response file created.")
}

// app.use for public folder
app.use(bodyParser.urlencoded({extended: true}))
app.use('/templates',express.static(__dirname + '/pages/templates'))
app.use('/assets', express.static(__dirname + '/assets'))
app.use('/project',express.static(__dirname + '/pages/project'))
app.use('/images',express.static(__dirname + '/images'))

// Set view engine
app.set('view engine', 'pug')

// Routers
app.get('/', function(req, res){
	print("[Connect] Get request to '/'")
	res.render('index')
})

app.get('/information', function(req, res){
	print("[Connect] Get request to '/information'")
	res.render('information')
})

app.post('/response', function(req,	res){
	print("[Connect] Post request to '/response'")
	if (req.body.name.length <= 20 && req.body.email.length <= 40 && req.body.message.length <= 200){
		fs.appendFile('response', req.body.name + ' ' + req.body.email + ' ' + req.body.message + '\n', function (err) {
			if (err) throw err
		})
		res.render('response')
	}
	else {
		console.log('[System] submit refused')
		res.redirect('back')
	}
})

app.get('/project/:id', function(req, res){
	print("[Connect] Get request to /project/" + req.params.id)
	let path = 'project/' + req.params.id + '/cate'
	if (fs.existsSync(__dirname + '/views/' + path + '.pug')){
		res.render(path)
	}
	else res.redirect('/')
})

app.get('/project/:id1/:id2', function(req, res){
	print("[Connect] Get request to /project/" + req.params.id1 + '/' + req.params.id2)
	let path = 'project/' + req.params.id1 + '/' + req.params.id2
	if (fs.existsSync(__dirname + '/views/' + path + '.pug')){
		res.render(path)
	}
	else res.redirect('/')
})

// Functions
function getTime(){
	let now = new Date()
	return now.toLocaleDateString() + ' ' + now.toLocaleTimeString()
}

function print(text){
	var tag, message
	for(let i = 0; i < text.length; i++){
		if(text[i] == ' '){
			tag = text.substr(0, i)
			message = text.substr(i)
			break
		}
	}
	console.log(colors.time(getTime()), colors.title(tag) + colors.magenta(message))
}

// Listen on port
server.listen(port, function(){
	console.log(colors.setup("Server is running at port " + port))
})

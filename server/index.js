const path = require('path');
const express = require('express');
const app = express();
const server = require('http').createServer(app);
const bodyParser = require('body-parser');


const io = module.exports.io = require('socket.io').listen(server);

const port = process.env.PORT || 5000;

var fs = require('fs');

const SocketManager = require('./SocketManager');

io.on('connection', ( socket ) => { 
	SocketManager(socket);
});

app.use(express.static(path.join(__dirname)));
app.use(bodyParser.urlencoded({extended: false}));

server.listen(port, () => {
	console.log("Connected on port " + port + "!");
});
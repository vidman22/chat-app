const path = require('path');
const express = require('express');
const app = express();
const server = require('http').Server(app);


const io = module.exports.io = require('socket.io')(server);

const PORT = process.env.PORT || 5000;


const SocketManager = require('./SocketManager');

io.on('connection', ( socket ) => { 
	SocketManager(socket);
});

app.use(express.static(__dirname + ' /../build'));


server.listen(PORT, () => {
	console.log("Connected on port " + port + "!");
});
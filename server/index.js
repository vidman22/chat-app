const express = require('express');
const app = express();
const server = require('http').Server(app);


const io = module.exports.io = require('socket.io')(server);



const SocketManager = require('./SocketManager');

io.on('connection', ( socket ) => { 
	SocketManager(socket);
});

const port = process.env.PORT || 5000;

app.use(express.static(__dirname + '/../build'));

server.listen(port, () => {
	console.log("Connected on port " + port + "!");
});
const express = require('express');
const app = express();
const path = require('path');
const server = require('http').Server(app);

const io = module.exports.io = require('socket.io')(server);



const SocketManager = require('./SocketManager');

io.on('connection', ( socket ) => { 
	SocketManager(socket);
});


const PORT = process.env.PORT || 80;

app.use(express.static(__dirname + '/../build'));

app.get('/*', function(req, res) {
	res.sendFile(path.join(__dirname, +'/../build'), function(err) {
		if (err) {
			res.status(500).send(err)
		}
	});
});


server.listen(PORT, () => {
	console.log("Connected on port " + PORT + "!");
});

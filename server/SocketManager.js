const io = require('./index.js').io;

// const uuidv1 = require('uuid/v1');
// const uuidv3 = require('uuid/v3');

const sessions = [];

class SessionObject {
	constructor() {
		this.connectedUsers = [],
		this.turn = 0,
		this.room = '';
	}

	
}



module.exports = function(socket) {

	console.log("Socket ID " + socket.id);
	

	socket.on('NEW_ROOM', room => {
		let newRoom = new SessionObject();
		newRoom.room = room;
		sessions.push(newRoom);
		console.log(newRoom.room);
		socket.join(newRoom.room);
		io.to(newRoom.room).emit('JOINED');
		console.log('sessions ', sessions);
	});

	socket.on('JOIN_ROOM', (room, callback) => {
		socket.join(room);
		// io.to(room).emit('JOINED');
		let temp_room = '';
		let message = '';
		for ( let i = 0; i < sessions.length; i++) {
			if ( sessions[i].room === room) {
				temp_room = room;
			}
		}
		if ( temp_room ) {
			message ='';
		} else {
			message = 'no game by that code';
		}
		callback(message);
	});

	socket.on('NEW_PLAYER', (room, name) => {

		const index = searchSessions( room );
		const users = sessions[index].connectedUsers;
		users.push(name);
		
		io.to(room).emit('UPDATED_PLAYERS', (room, users ));
	});


	socket.on('SHUFFLE', (room, users, cb) =>{
		const index = searchSessions( room );

		

		let arrayOfTeams = [];
		if ( users.length > 3 && users.length < 9 ) {
			arrayOfTeams = createTwoTeams(users);
		}
		if ( users.length > 8 && users.length < 12 ) {
			arrayOfTeams = createThreeTeams(users);
		}
		if ( users.length > 11 && users.length < 17 ) {
			arrayOfTeams = createFourTeams(users);
		}

		sessions[index].teams = arrayOfTeams;

		cb(arrayOfTeams);
	});

	socket.on('START_GAME', (room, users, game) => {
		io.to(room).emit('START_GAME', game);
	})

	socket.on('disconnect', () => {
	
		console.log('socket ' + socket.id + ' disconnected');

	});

}

searchSessions = (room) => {

	for ( let i = 0; i < sessions.length; i++ ) {
		if (sessions[i].room === room) {
			return i;
		}
	}

}

randomizeArray = (users) => {

	let array = users;
	let currentIndex = array.length, temporaryValue, randomIndex;

		while (0 !== currentIndex) {

			randomIndex = Math.floor(Math.random() * currentIndex);
			currentIndex -= 1;

			temporaryValue = array[currentIndex];
			array[currentIndex] = array[randomIndex];
			array[randomIndex] = temporaryValue;

		} return array;

}

createTwoTeams = ( users ) => {
	const array = randomizeArray(users);

	const midPoint = Math.floor(array.length/2);

	const teamOne = array.slice(0, midPoint);

	const teamTwo = array.slice(midPoint, array.length)

	return [teamOne, teamTwo];
}

createThreeTeams = ( users ) => {
	const array = randomizeArray( users );

	const firstBreak = Math.floor(array.length/3);

	const teamOne = array.slice(0, firstBreak);

	const secondBreak = firstBreak * 2;

	const teamTwo = array.slice(firstBreak, secondBreak);

	const teamThree = array.slice(secondBreak, array.length);

	return [teamOne, teamTwo, teamThree];
}

createFourTeams = ( users ) => {
	const array = randomizeArray( users );

	const firstBreak = Math.floor(array.length/4);

	const teamOne = array.slice(0, firstBreak);

	const secondBreak = firstBreak * 2;

	const teamTwo = array.slice(firstBreak, secondBreak);

	const thirdBreak = firstBreak * 3;

	const teamThree = array.slice(secondBreak, thirdBreak);

	const teamFour = array.slice(thirdBreak, array.length);

	return [teamOne, teamTwo, teamThree, teamFour];
}
// function randomDigits() {
		
// 		let code = '';
// 		for ( let i = 0; i < 6; i++ ) {
// 			let rand_num = Math.floor((Math.random() * 10 ));
// 			code += rand_num;
// 		}
// 		return code;
// }
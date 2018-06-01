const io = require('./index.js').io;

// const uuidv1 = require('uuid/v1');
// const uuidv3 = require('uuid/v3');

let sessions = [];

class SessionObject {
	constructor() {
		this.connectedUsers = [],
		this.turn = 0,
		this.room = '';
	}

	
}



module.exports = function(socket) {
	

	socket.on('NEW_ROOM', room => {
		let newRoom = new SessionObject();
		newRoom.room = room;
		sessions.push(newRoom);
		
		socket.join(newRoom.room);
		io.to(newRoom.room).emit('JOINED');
		
	});

	socket.on('JOIN_ROOM', (room, callback) => {
		socket.join(room);
		
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

		const user = {
			name: name,
			id: socket.id,
			score: 0
		}
		users.push(user);
		
		io.to(room).emit('UPDATED_PLAYERS', (room, users ));
	});


	socket.on('SHUFFLE', (room, users, cb) =>{
		const index = searchSessions( room );

		const arrayOfTeams = createTeams(users);

		sessions[index].teams = arrayOfTeams;

		cb(arrayOfTeams);
	});

	socket.on('START_GAME', (room, users, game) => {
		io.to(room).emit('START_GAME', game);
	});

	socket.on('SUCCESS',  (room, name)  => {
		console.log("success for " + name);
		const index = searchSessions(room);

		let connectedUsers = sessions[index].connectedUsers;
		console.log("connected users ln 86", connectedUsers);
		for ( let i = 0; i < connectedUsers.length; i ++) {
			if ( connectedUsers[i].name === name ) {
				connectedUsers[i].score++;
				io.to(room).emit('SCORE', connectedUsers);
				console.log("connected users after success " , connectedUsers);
			}
		}
		

	});

	socket.on('FAILURE', room => {

	});

	socket.on('disconnect', () => {
	
		for ( let i = 0; i < sessions.length; i++ ) {
		  if (sessions[i].connectedUsers.length !== undefined) {	
			for ( let j = 0; j < sessions[i].connectedUsers.length; j++){
				if (sessions[i].connectedUsers[j].id === socket.id ) {
					const id = sessions[i].connectedUsers[j].id; 

					sessions[i].connectedUsers = sessions[i].connectedUsers.filter((user) => user.id !== id);

					io.to(sessions[i].room).emit('USER_DISCONNECTED', sessions[i].connectedUsers[j]);

					console.log('session ', sessions[i].connectedUsers, ' updated after disconnect');
				}
				if (sessions[i].connectedUsers.length === 0) {
					sessions = sessions.filter((session) => sessions[i] );
					console.log("new session after disconnect ", sessions );
				}
			}
		  }
		}
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

createTeams = ( users ) => {
	console.log("create teams triggered");
	const numberOfTeams = Math.ceil(users.length/4); 
	const array = randomizeArray(users);
	
	const firstSegment = Math.floor(array.length/numberOfTeams);
	let firstBreak = 0;
	let newBreak = Math.floor(array.length/numberOfTeams);

	let teams = [];
	console.log("number of teams " + numberOfTeams );
	for ( let i = 0; i < numberOfTeams; i++) {
		const team = array.slice(firstBreak, newBreak);
		newBreak = newBreak + firstSegment;
		firstBreak = firstBreak + firstSegment;
		teams.push(team);
		console.log("team ", team);
	}
	return teams;
	console.log("create teams ", teams);
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
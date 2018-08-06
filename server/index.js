const express = require('express');
const app = express();
const path = require('path');
const server = require('http').Server(app);
const mongoose = require('./config/mongoose');
const graphqlHTTP = require('express-graphql');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { APP_SECRET, getUserId } = require('./oauth/config/utils');
const token = jwt.sign({ session: ''}, 'super duper pooper scooper')
const cors = require('cors');
const db = mongoose();

const LessonSet = require('./models/lessonSet');
const User = require('./models/user');


const io = module.exports.io = require('socket.io')(server);



const SocketManager = require('./SocketManager');

io.on('connection', ( socket ) => { 
	SocketManager(socket);
});


const PORT = process.env.PORT || 5000;

app.use('/*', cors({ origin: 'http://localhost:3000' }));

const schema  = require('./graphql/typeDefs');


var root = {
	 
	 	lessonSet: async (  _id ) => {
	 		console.log("lesson triggered");
	 		return await LessonSet.findById(_id.id)
	 	},
	 	lessonSets: async () => {
	 		console.log("lsets triggered");
	 		return await LessonSet.find()
	 	},
	 	user:  (root, {_id}) => {
	 		return User.findById(_id)
	 	},
	 	createLessonSet: async ( {title, author, sentences} ) => {
	 		const lessonSet = new LessonSet({ title, author, sentences });
	 		return await lessonSet.save(); 
	 		if (!lessonSet) {
      			throw new Error('Error');
   			}
   			console.log("create lesson set success");
	 	},
	 	signUp: async ({firstname, lastname, email, password }) => {
	 		console.log("signUp triggered")
	 		const hash = await bcrypt.hash(password, 12 )
	 		const user = new User({firstname, lastname, email, password: hash });
	 		

	 		const existingUser = await User.findOne({ email });

	 		if ( existingUser) {
	 			throw new Error('Email already used');
	 		}
	 		await user.save();

	 		const token = jwt.sign({ userId: user.id }, APP_SECRET)

  			return {
   			 	token,
    			user,
  			}			
	 	},
	 	login: async ({email, password}) => {
	 		console.log("login triggered")
	 		const user = await User.findOne({ email });

	 		if (!user) {
	 			throw new Error('Email not found');
	 		}

	 		const validPassword = await bcrypt.compare(password, user.password);
	 		if (!validPassword) {
	 			throw new Error('Password is incorrect');
	 		}

	 		return {
    			token: jwt.sign({ userId: user.id }, APP_SECRET),
    			user,
  			}
	 	}
};

app.use('/graphql', cors(), graphqlHTTP({
  schema: schema,
  rootValue: root,
  graphiql: true
}));


server.listen(PORT, () => {
	console.log("Connected on port " + PORT + "!");
});

const express = require('express');
const app = express();
const path = require('path');
const server = require('http').Server(app);
const mongoose = require('./config/mongoose');
const graphqlHTTP = require('express-graphql');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { APP_SECRET, getUserId } = require('./oauth/config/utils');
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



const schema  = require('./graphql/typeDefs');


var root = {
	 
	 	lessonSet: async (args, ctx, info ) => {
	 		console.log("lesson triggered ctx", ctx.headers.authorization );
	 		return await LessonSet.findById(args.id)
	 	},
	 	lessonSets: async (args, parent, ctx, info) => {
	 		return await LessonSet.find()
	 	},
	 	user: async ({_id}) => {
	 		return await User.findById(_id)
	 	},
	 	userLessons: async ( authorID ) => {
	 		console.log('author id' , authorID)
	 		return await LessonSet.find(authorID);
	 	},
	 	createLessonSet: async ( {title, author, authorID, sentences}, ctx, info ) => {
	 		const lessonSet = new LessonSet({ title, author, authorID, sentences });
	 		return await lessonSet.save(); 
	 		if (!lessonSet) {
      			throw new Error('Error');
   			}
   			console.log("create lesson set success");
	 	},
	 	signUp: async ({ username, email, password }) => {
	 		console.log("signUp triggered")
	 		const hash = await bcrypt.hash(password, 12 )
	 		const user = new User({username, email, picture: null, password: hash });
	 		

	 		const existingUser = await User.findOne({ email });

	 		if ( existingUser) {
	 			throw new Error('Email already used');
	 		}
	 		await user.save();

	 		const token = jwt.sign({ userId: user.id }, APP_SECRET);
	 		const expiresIn = 7200;

  			return {
   			 	token,
   			 	expiresIn,
    			user
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

	 		const token = jwt.sign({ userId: user.id }, APP_SECRET);
	 		const expiresIn = 7200;

	 		return {
    			token,
    			expiresIn,
    			user
  			}
	 	},
	 	oAuthSignIn: async ({ email, username, picture, userID, token, expiresIn}) => {
	 		console.log("oAuth signin email " + email);
	 		console.log("oAuth signin name " + username);
	 		console.log("oAuth signin picture " + picture);
	 		console.log("oAuth signin userID " + userID);
	 		console.log("oAuth signin token " + token);
	 		console.log("oAuth signin expiresIn " + expiresIn);
	 		let user = await User.findOne({ email });

	 		if (!user ) {
	 			user = new User({email, username, picture, userID });
	 			await user.save(); 
	 		} 
	 		return {
	 			token,
	 			expiresIn,
	 			user
	 		}
	 	}
};

app.use('/graphql', cors(), graphqlHTTP({
  schema: schema,
  rootValue: root,
  graphiql:true
}));

app.use(cors({
	origin: 'http://localhost:3000'
}));


server.listen(PORT, () => {
	console.log("Connected on port " + PORT + "!");
});

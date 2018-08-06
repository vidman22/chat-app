const { buildSchema } = require('graphql');



const schema = buildSchema(`
	type Query {
		lessonSet(id: String): LessonSet
		lessonSets: [LessonSet]
		user(id: String): User
	}

	type LessonSet {
		id: ID
		title: String
		author: String
		sentences: [Sentence!]!
	}

	input SentenceInput {
		sentence: String
		answer: String
		hint: String
		alts: [String]
	}

	type Sentence {
		id: String
		sentence: String
		answer: String
		hint: String
		alts: [String]
	}

	type AuthPayload {
  		token: String
  		user: User
	}

	type User {
		id: String
		firstname: String
		lastname: String
		email: String
		password: String
		lessonsets: [LessonSet]
	}


	type Mutation {
		createLessonSet(title: String, author: String, sentences: [SentenceInput] ): LessonSet
		signUp( firstname: String!, lastname: String!, email: String!, password: String! ): AuthPayload
		login(email: String!, password: String! ) : AuthPayload
	}
`);



module.exports =  schema;
// module.exports = root;
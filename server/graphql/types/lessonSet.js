
const graphql = require('graphql');

const { GraphQLObjectType, GraphQLString, GraphQLList, GraphQLID } = graphql;

const lessonSetType = new GraphQLObjectType({
	name: 'set',
	fields: () => ({
		id: {type: GraphQLID},
		title: {type: GraphQLString},
		author: {type: GraphQLString},
		sentences: {type: GraphQLList}
	})
});

module.exports = lessonSetType;


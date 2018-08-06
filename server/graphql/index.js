var { lessonSet } = require('./queries/index');
var { lessonSets } = require('./queries/index');
var mutations = require('./mutations/index');
var GraphQLObjectType = require('graphql').GraphQLObjectType;
var GraphQLSchema = require('graphql').GraphQLSchema;

var queries = { lessonSets, lessonSet };

var RootQuery = new GraphQLObjectType({
	name: 'RootQueryType',
	fields: {
		queries,
		mutations
	},
});

module.exports = new GraphQLSchema({
	RootQuery
});
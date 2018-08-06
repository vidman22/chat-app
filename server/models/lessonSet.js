var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var SentenceSchema = new Schema({
	sentence: String,
	answer: String,
	hint: String,
	alts: [String]
});

var lessonSetSchema = new Schema({
	title: String,
	author: String,
	date: { type: Date, default: Date.now},
	meta: {
		votes: Number,
		favs: Number
	},
    sentences: [SentenceSchema]
});



var LessonSet = mongoose.model('LessonSet', lessonSetSchema);
module.exports = LessonSet;
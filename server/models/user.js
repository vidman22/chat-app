var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
  firstname: String,
  lastname: String,
  email: String,
  password: String,
  lessonsets: {
  	type: [String]
  }

});
var User = mongoose.model('User', userSchema);
module.exports = User;
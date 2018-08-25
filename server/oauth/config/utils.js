const jwt = require('jsonwebtoken');

// const GoogleStrategy = require('passport-google-oauth20').Strategy;
// const FacebookStrategy = require('passport-facebook').Strategy
const User = require('../../models/user');
const keys = require('./keys');


// passport.use(new FacebookStrategy({
//     clientID: keys.facebook.AppID,
//     clientSecret: keys.facebook.AppSecret,
    
//   },
//   function(accessToken, refreshToken, profile, cb) {
//     User.findById({ userID: profile.id }, function (err, user) {
//       return cb(err, user);
//     });
//   }
// ));

// passport.use(
// 	new GoogleStrategy({
// 	clientID: keys.google.clientID,
// 	clientSecret: keys.google.clientSecret
// 	}, 
// 	(accessToken, refreshToken, profile, cb) => {
// 		User.findById({ userID: profile.id }, (err, user) => {
//       return cb(err, user);
//     });
//   }
// ));

getUserId = async (Authorization) => {

    const token = Authorization.replace('Bearer ', '');
    console.log('app secret' + keys.app.APP_SECRET);
    const { userID } = jwt.verify(token, keys.app.APP_SECRET);
    console.log('userID ', userID);
    return await User.findOne({userID});
}

module.exports = {
  getUserId
}
const passport = require('passport');
const chalk = require('chalk');
const Users = require('../database/models/user');
const { GOOGLE, GITHUB, FACEBOOK } = require('./config.json');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const GithubStrategy = require('passport-github2').Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;


let user = {};
function updateOrCreate(_user, _cb){
    Users.findOneAndUpdate({ id: _user.id }, user, { upsert: true, new: true, setDefaultsOnInsert: true }, (err, result) => {
        _cb(err, result);
    });
}


passport.serializeUser((dbUser, cb) => {
    cb(null, dbUser.id);
});
passport.deserializeUser((id, cb) => {
    Users.findOne({ id: id }).then((dbUser) => {
        cb(null, dbUser);
    }).catch((err) => {
        cb(err, null);
    });
});


passport.use("google", new GoogleStrategy(GOOGLE, (accessToken, refreshToken, profile, cb) => {
    user = { id: profile.id,  displayName: profile.displayName, provider: 'google' };
    updateOrCreate(user, cb);
}));

passport.use("github", new GithubStrategy(GITHUB, (accessToken, refreshToken, profile, cb) => {
    user = { id: profile.id, displayName: profile.displayName, provider: 'github' };
    updateOrCreate(user, cb);
}));

passport.use("facebook", new FacebookStrategy(FACEBOOK, (accessToken, refreshToken, profile, cb) => {
    user = { id: profile.id, displayName: profile.displayName, provider: 'facebook' };
    updateOrCreate(user, cb);
}));
const passport = require('passport');
const localStrategy = require('passport-local').Strategy;
const JWTstrategy = require('passport-jwt').Strategy;

const UserModel = require('../models/userModel.js');

passport.use('signup', new localStrategy({
    usernameField: 'username',
    passwordField: 'password',
    passReqToCallback: true
}, async (req, username, password, done) => {
    try {
        const { username } = req.body;
        const user = await UserModel.create({ username, password });
        return done(null, user);
    } catch (error) {
        done(error);
    }
}));

passport.use('login', new localStrategy({
    usernameField: 'username',
    passwordField: 'password'
}, async (username, password, done) => {
    try {
        const user = await UserModel.findOne({ username });
        if (!user) {
            return done(null, false, { message: 'User not Found' });
        }
        const validate = await user.isValidPassword(password);
        if (!validate) {
            return done(null, false, { message: 'Wrong Password' });
        }
        return done(null, user, { message: 'Login Successful' });
    } catch (error) {
        return done(error);
    }
}));

passport.use(new JWTstrategy({
    secretOrKey: 'top_secret',
    jwtFromRequest: function (req) {
        let token = null;
        if (req && req.cookies) token = req.cookies['jwt'];
        return token;
    }
}, async (token, done) => {
    try {
        return done(null, token.user);
    } catch (error) {
        done(error);
    }
}));
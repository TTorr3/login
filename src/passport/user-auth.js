const passport = require('passport');
const {Strategy} = require('passport-local');

const User = require('../models/users');

//Connect session with an user
passport.serializeUser((user, done) => {
    done(null, user.id);
});

//disconnect session 
passport.deserializeUser(async (id, done) => {
    const user = await User.findById(id);
    done(null, user);
});

passport.use('registerAuth', new Strategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
}, async (req, email, password, done) => {
    const {confirmPassword} = req.body;
    try {
        const user = await User.findOne({email: email});
    
        //Check params
        if(user){ //Email already taken
            return done(null, false, req.flash('registerMessage', 'Email already taken'));
    
        } else if (password !== confirmPassword){ //Password confirmed wrong
            return done(null, false, req.flash('registerMessage', 'The passwords doesnt match'));
    
        } else { //All fields are okey
            let newUser = new User;
            newUser.email = email;
            newUser.password = newUser.encryptPassword(password);
            await newUser.save();
            return done(null, newUser, req.flash('registerMessage', 'Welcome'));
        }
    } catch (err) {
        console.log(err);
        done(null,false);
    }
}));

passport.use('loginAuth', new Strategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
}, async (req, email, password, done) => {
    try {
        const user = await User.findOne({email: email});
    
        //Check params
        if(!user){//Email doesn't exists
            return done(null, false, req.flash('loginMessage', 'Email not found'));
        
        } else if(!user.comparePassword(password, user.password)){//Wrong password
            return done(null, false, req.flash('loginMessage', 'Password incorrect'));
    
        } else {//All fields are okey
            return done(null, user, req.flash('loginMessage', 'Welcome back'));
        }
    } catch (err){
        console.log(err);
        done(null,false);
    }
}));
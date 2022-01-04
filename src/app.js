const express = require('express');
const session = require('express-session');
const flash = require('connect-flash');
const passport = require('passport');
const engine = require('ejs-mate');
const path = require('path');
const morgan = require('morgan');

//Initializing 
const app = express();
require('./passport/user-auth');
require('./database');

//Settings
app.use(express.static('public'));
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.engine('ejs', engine);
app.set('view engine', 'ejs');

//Middlewares
app.use(morgan('dev'));
app.use(express.urlencoded({extended:false}));
app.use(session({
    secret: 'I miss me spider',
    resave: false,
    saveUninitialized: false
}))
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());

//middleware to save the message into locals to use in ejs
app.use((req,res,next) => {
    res.locals.loginMessage = req.flash('loginMessage');
    res.locals.registerMessage = req.flash('registerMessage');
    res.locals.user = req.user;
    next();
});

//Routes
app.use('/', require('./routes/index'));

//Server listings
app.listen(app.get('port'), () => {
    console.log('Server listing at port ', app.get('port'));
})
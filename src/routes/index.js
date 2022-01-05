const router = require('express').Router();
const passport = require('passport');

router.get('/', (req,res) => {
    res.render('index');
});

router.get('/login', (req, res) => {
    res.render('login');
});

router.post('/login', passport.authenticate('loginAuth', {
    successRedirect: '/profile',
    failureRedirect: '/login',
    failureFlash: true,
    successFlash: true
}));

router.get('/register', (req, res) => {
    res.render('register');
});

router.get('/logout', (req,res) => {
    req.logOut();
    res.redirect('/');
});

router.post('/register', passport.authenticate('registerAuth', {
    successRedirect: '/profile',
    failureRedirect: '/register',
    failureFlash: true,
    successFlash: true
}));

router.get('/profile', checkAuthentication, (req,res) => {
    res.render('profile');
});

function checkAuthentication(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect('/');
}

module.exports = router;
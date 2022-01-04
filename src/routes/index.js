const router = require('express').Router();

const User  =require('../models/users');

router.get('/', (req,res) =>{
    res.json('Hola');
});

router.get('/register', (req,res)=>{
    res.render('register');
});

router.post('/register', async(req,res)=>{
    const {username, password} = req.body;
    const user = await User.findOne({username: username});
    if(!user){
        res.json('El username no esta disponible, por favor elija otro');
    } else {
        user.username = username;
        user.password = password;
        await user.save();
        res.json('Felicitaciones, usuario creado!')
    }
});

module.exports = router;
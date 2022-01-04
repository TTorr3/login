const mongoose = require('mongoose');
const {Schema} = mongoose;

//New schema
const userSchema = new Schema ({
    'username': String,
    'password': String
});

//Creating model
const User = mongoose.model('User', userSchema);

module.exports = User;
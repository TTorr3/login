const mongoose = require('mongoose');
const {Schema} = mongoose;
const bcrypt = require('bcrypt');

//Defining the schema
const userSchema = new Schema({
    email: String,
    password: String
});

//Add a method on User to encrypt the password
userSchema.methods.encryptPassword = (password) => {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(10));
};

//Add a method on User to compare the password with the encrypted password on db
userSchema.methods.comparePassword = function (password) {
    return bcrypt.compareSync(password, this.password);
};

//Create and export model
module.exports = mongoose.model('User', userSchema);
const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URI || 'mongodb+srv://ttorr3:Geogenicas73@cluster0.o6c5y.mongodb.net/loginProject?retryWrites=true&w=majority')
    .then(db => console.log('Database connected'))
    .catch(err => console.error(err));
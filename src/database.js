const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URI)
    .then(db => console.log('Database connected'))
    .catch(err => console.error(err));
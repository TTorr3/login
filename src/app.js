const express =  require('express');
const morgan = require('morgan');
const path = require('path');
const bodyParser = require('body-parser');

const app = express();

//Configs
app.set('port', process.env.PORT || 3000);

//Middlewares
app.use(morgan('dev'));
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

//Routes
app.use('/', require('./routes/index'));

//Server listening
app.listen(app.get('port'), () => {
    console.log('Server listening at port ',app.get('port'));
});
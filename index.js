const express = require('express');
const app = express();
const helmet = require('helmet');
const logger = require('./middleware/logger');
const morgan = require('morgan');
const config = require('config');
const startupDebugger = require('debug')('app:startup');
const postsRoute = require('./routes/posts');
const homeRoute = require('./routes/posts');
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/ameen', {useNewUrlParser: true, useUnifiedTopology: true})
        .then(() => console.log('Connected to server ...'))
        .catch(err => console.log(err.message));

app.use(express.json());
app.use(express.urlencoded({extended: true }));
app.use(express.static('public'));
app.use(helmet());
app.use(logger.log);
app.use('/api/posts', postsRoute);
app.use('/', homeRoute);


if(app.get('env') === 'development'){
    app.use(morgan('tiny'));
    startupDebugger(`Morgan Enabled`);
}
console.log(`NODE Env: ${app.get('env')}`);


//Configutarion
console.log("App Name : " + config.get('Ameen.App_Name'));
// console.log("Password : " + config.get('Ameen.mail.password'));


const port = process.env.PORT || 3000
app.listen(port, () => console.log(`Listening of ${port} port ... `));

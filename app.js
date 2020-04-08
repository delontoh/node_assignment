/**
 * Required External Modules
 */
const express = require('express');
const bodyParser = require('body-parser');

/**
 * App Variables
 */
const app = express();
const port = process.env.PORT || "3000";

/**
 *  App Configuration
 */
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));

/**
 * Connect to DB
 */
const db = require('./config/db');
db.connect((status, result) => {
    if(status) {
        console.log('Connection to database established');
    }
});

/**
 * Routes Definitions
 */
app.use('/', require('./api/index'));
app.use('/dbconfig', require('./config/dbconfig'));
app.use('/register', require('./api/register'));
app.use('/commonstudents', require('./api/students'));
app.use('/suspend', require('./api/studentStatus'));
app.use('/retrievefornotifications', require('./api/notifications'));

/**
 * Server Activation
 */
app.listen(port, () => {
    console.log('\nO===> Start Environment on : ' + app.get('env') + ' ' + (new Date()) + '\n');
    console.log(`Listening on port: ${port} \n`);
});

module.exports = app;

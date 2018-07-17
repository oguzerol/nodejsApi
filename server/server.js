var express = require('express');
var app = express();
var apiRouter = require('./api');
var err = require('./middleware/err');

var config = require('./config');
// db.url is different depending on NODE_ENV
require('mongoose').connect(config.db.url,{ useNewUrlParser: true });

// setup the app middlware
require('./middleware/appMiddleware')(app);


// setup the apiRouter
app.use('/api', apiRouter);
app.use(err());

// export the app for testing
module.exports = app;
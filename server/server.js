var express = require('express');
var app = express();
var apiRouter = require('./api');

// setup the app middlware
require('./middleware/appMiddleware')(app);


// setup the apiRouter
app.use('/api', apiRouter);

// export the app for testing
module.exports = app;
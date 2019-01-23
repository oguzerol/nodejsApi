const express = require('express');
const app = express();
const apiRouter = require('./api');
const err = require('./middleware/err');
const bluebird = require('bluebird');
const config = require('./config');
const mongoose = require('mongoose');

mongoose.Promise = bluebird;
// db.url is different depending on NODE_ENV
mongoose.connect(config.db.url,{ useNewUrlParser: true });
// setup the app middlware
require('./middleware/appMiddleware')(app);

// setup the apiRouter
app.use('/api', apiRouter);
app.use(err());

// export the app for testing
module.exports = app;
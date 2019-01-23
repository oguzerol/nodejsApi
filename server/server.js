const express = require('express');
const app = express();
const apiRouter = require('./api');
const err = require('./middleware/err');
const bluebird = require('bluebird');
const config = require('./config');
const passport = require('passport'),
  LocalStrategy = require('passport-local').Strategy;

const User = require('./api/user/userModel');

const mongoose = require('mongoose');

mongoose.Promise = bluebird;
// db.url is different depending on NODE_ENV
mongoose.connect(
  config.db.url,
  { useNewUrlParser: true }
);

passport.use(
  new LocalStrategy(function(username, password, done) {
    User.findOne({ username: username }, function(err, user) {
      if (err) {
        return done(err);
      }
      if (!user) {
        return done(null, false, { message: 'Incorrect username.' });
      }
      if (!user.authenticate(password)) {
        return done(null, false);
      }
      return done(null, user);
    });
  })
);

// setup the app middlware
require('./middleware/appMiddleware')(app);

app.post(
  '/login',
  passport.authenticate('local', {
    session: false,
    successRedirect: '/api/users',
    failureRedirect: '/api/categories',
  })
);

// setup the apiRouter
app.use('/api', apiRouter);
app.use(err());

// export the app for testing
module.exports = app;

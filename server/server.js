const express = require('express');
const app = express();
const apiRouter = require('./api');
const err = require('./middleware/err');
const bluebird = require('bluebird');
const config = require('./config');
const passport = require('passport'),
  LocalStrategy = require('passport-local').Strategy;

const JwtStrategy = require('passport-jwt').Strategy,
  ExtractJwt = require('passport-jwt').ExtractJwt;
const opts = {}
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = 'secret';
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();

const User = require('./api/user/userModel');

const mongoose = require('mongoose');

mongoose.Promise = bluebird;
// db.url is different depending on NODE_ENV
mongoose.connect(
  config.db.url,
  { useNewUrlParser: true }
);


// local strategy
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

// JWT
passport.use(new JwtStrategy(opts, function(jwt_payload, done) {
  User.findOne({id: jwt_payload.sub}, function(err, user) {
      if (err) {
          return done(err, false);
      }
      if (user) {
          return done(null, user);
      } else {
          return done(null, false);
          // or you could create a new account
      }
  });
}));

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

app.get('/profile', passport.authenticate('jwt', { session: false }),
    function(req, res) {
        res.send(req.user.profile);
    }
);

// setup the apiRouter
app.use('/api', apiRouter);
app.use(err());

// export the app for testing
module.exports = app;

var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var _ = require('lodash');
var morgan = require('morgan');

var users = [];
var id = 0;

app.use(morgan('dev'))
app.use(express.static('client'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var findUserFromId = function (req, res, next) {
  var user = _.find(users, { id: req.params.id });

  if (user) {
    req.user = user;
    next();
  } else {
    res.status(500).send({ error: 'we cannot find user' });
  }
};


app.get('/users', function (req, res) {
  res.json(users);
});

app.post('/users', function (req, res) {
  var user = req.body;
  id++;
  user.id = id + '';

  users.push(user);
  res.json(user);
});

app.get('/users/:id', findUserFromId, function (req, res) {
    console.log(req.user);
    res.json(req.user);
});

app.listen(3000);
console.log('on port 3000');

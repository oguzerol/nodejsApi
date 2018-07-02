
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


app.get('/users', function (req, res) {
  res.json(users);  2
});

app.post('/users', function (req, res) {
  var user = req.body;
  id++;
  user.id = id + '';

  users.push(user);
  res.json(user);
});

app.get('/users/:id', function (req, res) {
  console.log(req.params.id);
  if (req.params.id) {
    var user = _.find(users, { id: req.params.id });
    console.log(user);
    res.json(user);
  } else {
    res.send();
  }
});

app.listen(3000);
console.log('on port 3000');

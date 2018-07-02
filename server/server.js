
var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var _ = require('lodash');
var morgan = require('morgan');

var users = [];
var id = 0;

app.use(morgan('dev'))
app.use(express.static('client'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());


app.get('/users', function(req, res){
  res.json(users);
});

app.listen(3000);
console.log('on port 3000');

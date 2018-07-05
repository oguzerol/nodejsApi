var morgan = require('morgan'); // all request shower
var bodyParser = require('body-parser'); // handle url requests


// global middleware setups
module.exports = function(app) {
  app.use(morgan('dev'));
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());
};

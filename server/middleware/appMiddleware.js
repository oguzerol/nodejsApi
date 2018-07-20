var morgan = require('morgan'); // all request shower
var bodyParser = require('body-parser'); // handle url requests
var cors = require('cors'); 
var override = require('method-override'); 


// global middleware setups
module.exports = function(app) {
  app.use(morgan('dev'));
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());
  app.use(cors());
  app.use(override());
};

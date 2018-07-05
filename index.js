var config = require('./server/config'); // we need config file for port
var app = require('./server/server'); // our api server

var logger = require('./server/util/logger');

app.listen(config.port);
logger.log('listening on http://localhost:' + config.port);
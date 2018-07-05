var categoryRouter = require('express').Router();
var logger = require('../../util/logger');

categoryRouter.route('/')
  .get(function(req, res){
    logger.log('Hey from category!!');
    res.send({ok: true});
  });

module.exports = categoryRouter;

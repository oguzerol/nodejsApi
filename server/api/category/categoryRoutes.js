var categoryRouter = require('express').Router();
var logger = require('../../util/logger');

categoryRouter.route('/')
  .get(function(req, res, next){
    logger.log('Hey from category!!');
    return next(new Error('category error'));
    res.send({ok: true});
  });

module.exports = categoryRouter;

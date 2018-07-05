var postRouter = require('express').Router();
var logger = require('../../util/logger');

postRouter.route('/')
  .get(function(req, res){
    logger.log('Hey from post!!');
    res.send({ok: true});
  });

module.exports = postRouter;

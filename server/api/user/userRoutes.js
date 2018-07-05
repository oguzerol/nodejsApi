var userRouter = require('express').Router();
var logger = require('../../util/logger');

userRouter.route('/')
  .get(function(req, res){
    logger.log('Hey from user!!');
    res.send({ok: true});
  });

module.exports = userRouter;

var router = require('express').Router();
var userRouter = require('./user/userRoutes')
var categoryRouter = require('./category/categoryRoutes')
var postRouter = require('./post/postRoutes')

router.use('/users', userRouter);
router.use('/categories', categoryRouter);
router.use('/posts', postRouter);

module.exports = router;

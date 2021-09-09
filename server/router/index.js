const express = require('express');
const router = express.Router();

const ProductRouter = require('./product');
const CommentRouter = require('./comment');
const UserRouter = require('./user');

router.use('/product', ProductRouter);
router.use('/comment', CommentRouter);
router.use('/user', UserRouter);

module.exports = router;

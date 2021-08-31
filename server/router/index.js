const express = require('express');
const router = express.Router();

const ProductRouter = require('./product');

router.use('/product', ProductRouter);

module.exports = router;

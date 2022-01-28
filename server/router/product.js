const express = require('express');
const router = express.Router();
const validUser = require('../middleware/auth');
const ProductModel = require('../models/product');

router.get('/', validUser, async function (req, res) {
  const products = await ProductModel.find({}).exec();
  console.log(`user: ${req.user.username}`);
  res.send(products);
});

router.get('/:id', async function (req, res) {
  const id = req.params.id;
  const product = await ProductModel.findOne({ _id: id }).exec();
  res.send(product);
});

router.post('/', validUser, async function (req, res) {
  const { title, imgLink, detail, price } = req.body;
  const currentUser = req.user.username;
  await ProductModel.create({
    title,
    imgLink,
    detail,
    price,
    writer: currentUser,
  });
  res.send('Post Product');
});

router.put('/', validUser, async function (req, res) {
  const { id, title, imgLink, detail, price } = req.body;
  const currentUser = req.user.username;
  await ProductModel.updateOne(
    { _id: id, writer: currentUser },
    {
      title,
      imgLink,
      detail,
      price,
    }
  );
  res.send('Put Product');
});

router.delete('/:id', async function (req, res) {
  const id = req.params.id;
  await ProductModel.deleteOne({ _id: id }).exec();
  res.send('Delete Product');
});

module.exports = router;

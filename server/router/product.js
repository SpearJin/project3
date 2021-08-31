const express = require('express');
const router = express.Router();

const ProductModel = require('../models/product');

router.get('/', async function (req, res) {
  const products = await ProductModel.find({}).exec();
  res.send(products);
});

router.get('/:id', async function (req, res) {
  const id = req.params.id;
  const product = await ProductModel.findOne({ _id: id }).exec();
  res.send(product);
});

router.post('', async function (req, res) {
  const { title, imgLink, detail, price } = req.body;
  await ProductModel.create({
    title,
    imgLink,
    detail,
    price,
  });
  res.send('Post Product');
});

router.put('', async function (req, res) {
  const { id, title, imgLink, detail, price } = req.body;
  await ProductModel.updateOne(
    { _id: id },
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

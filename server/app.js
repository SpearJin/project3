const express = require('express');
const app = express();
const cors = require('cors');

const { connect: dbConenct } = require('./models');
const ProductModel = require('./models/product');

app.use(cors());
dbConenct();

app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

app.get('/product', async function (req, res) {
  const products = await ProductModel.find({}).exec();
  res.send(products);
});

app.get('/product/:id', async function (req, res) {
  const id = req.params.id;
  const product = await ProductModel.findOne({ _id: id }).exec();
  res.send(product);
});

app.post('/product', async function (req, res) {
  const { title, imgLink, detail, price } = req.body;
  await ProductModel.create({
    title,
    imgLink,
    detail,
    price,
  });
  res.send('Post Product');
});

app.put('/product', async function (req, res) {
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

app.delete('/product/:id', async function (req, res) {
  const id = req.params.id;
  await ProductModel.deleteOne({ _id: id }).exec();
  res.send('Delete Product');
});

app.listen(4000, () => {
  console.log('Server Start');
});

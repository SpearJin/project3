const { Schema, model } = require('mongoose');

const ProductSchema = new Schema({
  title: {
    type: String,
  },
  imgLink: {
    type: String,
  },
  detail: {
    type: String,
  },
  price: {
    type: Number,
  },
  writer: {
    type: String,
  },
});

module.exports = model('product', ProductSchema);

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
});

module.exports = model('product', ProductSchema);

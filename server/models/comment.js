const { Schema, model } = require('mongoose');

const CommentSchema = new Schema({
  productId: {
    type: String,
  },
  comment: {
    type: Array,
  },
});

module.exports = model('comments', CommentSchema);

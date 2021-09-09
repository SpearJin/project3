const express = require('express');
const router = express.Router();
const CommentModel = require('../models/comment');

router.get('/', async function (req, res) {
  const comments = await CommentModel.find({}).exec();
  res.send(comments);
});

router.get('/:productId', async function (req, res) {
  const id = req.params.productId;
  const comments = await CommentModel.findOne({ productId: id }).exec();
  res.send(comments);
});

router.put('/', async function (req, res) {
  const { id, comment, index } = req.body;
  const commentModel = await CommentModel.findOne({ productId: id }).exec();

  commentModel.comment[index] = comment;
  await CommentModel.updateOne(
    { productId: id },
    { comment: [...commentModel.comment] }
  );
  res.send('update comment');
});

router.post('/', async function (req, res) {
  const { id, comment } = req.body;
  const commentModel = await CommentModel.findOne({ productId: id }).exec();

  if (commentModel === null) {
    await CommentModel.create({
      productId: id,
      comment: [comment],
    });
    res.send('create model');
  } else {
    await CommentModel.updateOne(
      { productId: id },
      { comment: [...commentModel.comment, comment] }
    );
    res.send('add comment');
  }
});

router.delete('/:id/:index', async function (req, res) {
  const { id, index } = req.params;
  const commentModel = await CommentModel.findOne({ productId: id }).exec();

  commentModel.comment.splice(index, 1);
  await CommentModel.updateOne(
    { productId: id },
    { comment: [...commentModel.comment] }
  );
  res.send('delete comment');
});

module.exports = router;

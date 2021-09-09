const express = require('express');
const router = express.Router();
const UserModel = require('../models/user');

router.post('/login', async function (req, res) {
  const { id, password } = req.body;
  const userInfo = await UserModel.findOne({
    userId: id,
    userPassword: password,
  });
  if (userInfo) {
    res.send(userInfo);
  } else {
    res.send('불일치');
  }
});

router.post('/', async function (req, res) {
  const { id, name, password, gender } = req.body;
  await UserModel.create({
    userId: id,
    userName: name,
    userPassword: password,
    userGender: gender,
  });
  res.send('Sign Up');
});

module.exports = router;

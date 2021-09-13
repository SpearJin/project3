const express = require('express');
const router = express.Router();
const argon2 = require('argon2');

const UserModel = require('../models/user');

router.post('/login', async function (req, res) {
  const { id, password } = req.body;
  const userInfo = await UserModel.findOne({
    userId: id,
  });
  if (!userInfo) {
    res.status(403);
    res.send('아이디가 일치하지 않습니다.');
    return;
  }

  const verifyPassword = await argon2.verify(userInfo?.userPassword, password);

  /* 1. 아이디가 일치하는지 비교한다.
        > 일치하면 2로 넘어간다.
        > 일치하지 않으면 '아이디가 일치하지 않습니다' 보냄
     2. 비밀번호가 일치하는지 비교핞다.
        > 일치하면 userInfo를 응답한다.
        > 일치하지 않으면 '비밀번호가 일치하지 않습니다' 보낸다
  */
  console.log(userInfo);
  if (verifyPassword) {
    res.send(userInfo);
  } else {
    res.status(403);
    res.send('비밀번호가 일치하지 않습니다.');
  }
});

router.post('/', async function (req, res) {
  const { id, name, password, gender } = req.body;
  const hash = await argon2.hash(password);

  if (!id) {
    res.status(403).send('아이디를 입력 하세요');
    return;
  }

  if (!name) {
    res.status(403).send('닉네임을 입력 하세요');
    return;
  } else {
    const strName = String(name);
    for (let i = 0; i < strName.length; i++) {
      console.log(strName[i]);
      console.log(`아스키: ${strName[i].charCodeAt()}`);
      const c = strName[i].charCodeAt();
      if (!((c >= 65 && c <= 90) || (c >= 97 && c <= 122))) {
        console.log('실행 되니?');
        res.status(403).send('영어만 입력 하세요');
        return;
      }
    }
  }

  if (!password) {
    res.status(403).send('패스워드를 입력 하세요');
    return;
  } else {
    if (password.length < 4) {
      res.status(403).send('패스워드 4자리이상 입력 하세요');
      return;
    }
  }

  if (!gender) {
    res.status(403).send('성별을 선택 하세요');
    return;
  }
  console.log(gender);

  await UserModel.create({
    userId: id,
    userName: name,
    userPassword: hash,
    userGender: gender,
  });
  res.send('Sign Up');
});

module.exports = router;

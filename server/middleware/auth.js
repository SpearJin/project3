const jwt = require('jsonwebtoken');

const validUser = (req, res, next) => {
  // const access_token = req.cookies?.access_token;
  const access_token = req.headers.authorization.split(' ')[1];
  console.log(`access: ${JSON.stringify(access_token)}`);
  if (!access_token) {
    res.status(401).send('로그인 하세요');
    return;
  }

  try {
    const decoded = jwt.verify(access_token, 'test');
    req.user = { username: decoded.username };
    console.log(decoded);
  } catch (error) {
    console.log(error);
    res.status(500).send('토큰 에러입니다');
  }
  next();
};

module.exports = validUser;

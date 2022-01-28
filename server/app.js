const express = require('express');
const app = express();
const cors = require('cors');
const cookieParser = require('cookie-parser');

const { connect: dbConnect } = require('./models');
const router = require('./router');

app.use(cors());
dbConnect();

app.use(cookieParser());

app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use(router);

app.listen(4000, () => {
  console.log('Server Start');
});

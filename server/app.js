const express = require('express');
const app = express();

app.get('/product', function (req, res) {
  res.send('Get Product');
});

app.post('/product', function (req, res) {
  res.send('Post Product');
});

app.put('/product', function (req, res) {
  res.send('Put Product');
});

app.delete('/product', function (req, res) {
  res.send('Delete Product');
});

app.listen(3000);

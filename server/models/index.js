const mongoose = require('mongoose');
const { getDBUri } = require('../config');

let db;

const connect = async () => {
  const DB_URI = getDBUri();

  if (db) {
    return;
  }

  mongoose.connect(DB_URI, {
    useNewUrlParser: true,
  });

  db = mongoose.connection;
};

const disconnect = () => {
  if (!db) {
    return;
  }
  mongoose.disconnect();
};

module.exports = { connect, disconnect };

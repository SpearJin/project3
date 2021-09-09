const { Schema, model } = require('mongoose');

const UserSchema = new Schema({
  userId: {
    type: String,
  },
  userName: {
    type: String,
  },
  userPassword: {
    type: String,
  },
  userGender: {
    type: String,
  },
});

module.exports = model('user', UserSchema);

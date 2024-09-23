const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  nom: String,
  prenom: String,
  email: String,
  phone: String,
  password: String,
  image: String
});
const User = mongoose.model('User', userSchema);
module.exports = User;

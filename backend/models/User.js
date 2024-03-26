const mongoose = require('mongoose');
const Schema = mongoose.Schema; // You need to use 'Schema' instead of 'schema' with a capital 'S'

const UserSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique:true, 
  },
  password: {
    type: String,
    required: true,
  },
  date: {
    type: Date, // 'date' should be capitalized to 'Date'
    default: Date.now,
  },
}); 
const User=mongoose.model('user',UserSchema);

module.exports = mongoose.model('User', UserSchema); // 'user' should be capitalized to 'User' as the model name

const mongoose = require('mongoose')
const plm = require('passport-local-mongoose')

// Connecting with mongoose
mongoose.connect('mongodb://127.0.0.1:27017/LMS')

// Defining userSchema

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  name: {
    type: String,
    required: true
  },
  password: {
    type: String,
  }
})

userSchema.plugin(plm)

const userModel = mongoose.model('user', userSchema)

module.exports = userModel;

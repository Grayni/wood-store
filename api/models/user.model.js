const {model, Schema} = require('mongoose')

const userSchema = new Schema({
  surname: {
    type: String
  },
  name: {
    type: String
  },
  email: {
    type: String,
    unique: true,
    lowercase: true,
    required: true
  },
  login: {
    type: String,
    lowercase: true,
    index: {
      unique: true,
      partialFilterExpression: {
        email: {
          $type: "string"
        }
      }
    },
    default: null
  },
  pass: {
    type: String,
    required: true,
    minLength: 6
  },
  phone: {
    type: String,
    unique: true,
    reuqired: true
  },
  adress: {
    type: String
  },
  birthday: {
    type: Date
  },
  status: {
    type: String,
    default: 'new'
  },
  dateRegistration: {
    type: Date,
    default: Date.now
  },
  isVerified: {
    type: Boolean,
    default: false
  }
})

module.exports = model('users', userSchema)
const {model, Schema} = require('mongoose')

const categoriesSchema = new Schema({
  title: {
    type: String,
    lowercase: true,
    required: true
  },
  identifier: {
    type: String,
    lowercase: true,
    required: true,
    unique: true
  },
  parent: {
    label: {
      type: String,
      lowercase: true,
      required: true
    },
    value: {
      type: String,
      lowercase: true,
      required: true
    }
  },
  status: {
    type: Boolean,
    required: true
  }
})

module.exports = model('categories', categoriesSchema)
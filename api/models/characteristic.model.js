const {model, Schema} = require('mongoose')

const characterSchema = new Schema({
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
  status: {
    type: Boolean,
    required: true
  },
  values: {
    type: Array,
    items: {
      type: String,
      uniqueItems: true
    }
  }
})

module.exports = model('characteristics', characterSchema)
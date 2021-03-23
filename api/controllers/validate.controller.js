const User = require('../models/user.model')
const Character = require('../models/characteristics.model.js')
const bcrypt = require('bcryptjs')
const ObjectId = require('mongodb').ObjectId

module.exports.uniqueValue = async (req, res) => {
  try {
    const isExistValue = await User.findOne({[req.body.field]: req.body.value})
    const response = isExistValue ? true : false
    
    res.status(200).json(response)
    
  } catch(e) {
    res.status(500).json(e)
  }
}

module.exports.checkPass = async (req, res) => {
  try {
    const candidate = await User.findOne({'_id': ObjectId(req.body.id)})
    const isPassCorrect = bcrypt.compareSync(req.body.pass, candidate.pass)

    const response = isPassCorrect ? true : false
    res.status(200).json(response)

  } catch (e) {
    res.status(500).json(e)
  }
}

module.exports.checkIdentifier = async (req, res) => {
  try {
      const isExistValue = await Character.findOne({identifier: req.body.value})
      const response = isExistValue ? true : false

      res.status(200).json(response)

  } catch (e) {
    res.status(500).json(e)
  }
}
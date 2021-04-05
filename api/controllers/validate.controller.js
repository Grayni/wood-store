const User = require('../models/user.model')
const Character = require('../models/characteristic.model.js')
const Category = require('../models/category.model.js')
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
  const collections = {
    'characteristics': Character,
    'categories': Category
  }

  try {
    const isExistValue = await collections[req.params.section].findOne({identifier: req.body.value})
    const response = isExistValue ? true : false

    res.status(200).json(response)
  } catch (e) {
    res.status(500).json(e)
  }
}

module.exports.uniqueOthers = async(req, res) => {
  try {
    // if exist coincidence with myself
    const isExistValue = await User.findOne({[req.body.field]: req.body.value, _id: {$ne : req.body.id} })

    const response = isExistValue ? true : false
    res.status(200).json(response)
  } catch (e) {
    res.status(500).json(e)
  }
}
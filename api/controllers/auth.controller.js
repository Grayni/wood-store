const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const keys = require('../keys')
const User = require('../models/user.model')

module.exports.login = async (req, res) => {
  const candidate = await User.findOne({$or: [{login: req.body.login}, {email: req.body.login}]})
  
  if (candidate) {
    const isPassCorrect = bcrypt.compareSync(req.body.pass, candidate.pass)

    if (isPassCorrect) {
      const token = jwt.sign({
        login: candidate.login,
        userId: candidate._id
      }, keys.JWT, {expiresIn: 60 * 60})
      res.status(200).json({token})
    } else {
      res.status(401).json({message: 'Login/Email или Пароль неверный'})
    }

  } else {
    res.status(401).json({message: 'Login/Email или Пароль неверный'})
  }
}

module.exports.getUsersList = async (req, res) => {
  try {
    const users = await User.find()
    res.status(200).json(users)
  } catch (e) {
    res.status(500).json(e)
  }
}

module.exports.createUser = async (req, res) => {
    const salt = bcrypt.genSaltSync(10)

    const user = new User({
      surname: req.body.surname,
      name: req.body.name,
      email: req.body.email,
      login: req.body.login,
      pass: bcrypt.hashSync(req.body.pass, salt),
      phone: req.body.phone,
      adress: req.body.adress,
      birthday: req.body.birthday,
      status: req.body.status,
      isVerified: req.body.isVerified
    })

    await user.save()
    res.status(201).json('Пользователь создан.')
}

module.exports.updateUser = async (req, res) => {
  const salt = bcrypt.genSaltSync(10)
  const $set = {}

  Object.assign($set, req.body)

  if (req.body.pass) {
    $set.pass = bcrypt.hashSync(req.body.pass, salt)
  }

  try {
    const user = await User.findOneAndUpdate({_id: req.params.id}, {$set}, {new: true})
    res.status(200).json(user)
  } catch(e) {
    res.status(500).json(e)
  }
}
const User = require('../models/user.model')

module.exports.remove = async (req, res) => {
  try {
    await User.deleteOne({_id: req.params.id})
    res.status(200).json({message: 'Пользователь удален!'})
  } catch(e) {
    res.status(500).json(e)
  }
}

module.exports.getUserById = async (req, res) => {
  try {
    const userData = await User.findOne({_id: req.params.id})
    res.status(200).json(userData)
  } catch(e) {
    res.status(500).json(e)
  }
}

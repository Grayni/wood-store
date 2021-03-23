const Char = require('../models/characteristics.model')


module.exports.create = async (req, res) => {
  try {
    const characteristics = new Char({
      title: req.body.title,
      identifier: req.body.identifier,
      status: req.body.status,
      values: req.body.values
    })

    await characteristics.save()

    res.status(201).json('Характеристика успешно создана!')
  } catch (e) {
    res.status(500).json(e)
  }
}

module.exports.getNames = async (req, res) => {
  try {
    const list = await Char.find({}, {title: 1, identifier: 1, _id: 0})

    res.status(200).json(list)
  } catch (e) {
    res.status(500).json(e)
  }
}

module.exports.getCharacter = async (req, res) => {
  try {
    const character = await Char.findOne({identifier: req.params.identifier})
    res.status(200).json(character)
  } catch (e) {
    res.status(500).json(e)
  }
}

module.exports.update = async (req, res) => {
  try {
    const $set = {}
    Object.assign($set, req.body)
    await Char.findOneAndUpdate({identifier: req.params.identifier}, {$set})
    res.status(200).json('Характеристика успешно обновлена!')
  } catch(e) {
    res.status(500).json(e)
  }
}

module.exports.delete = async (req, res) => {
  try {
    await Char.findOneAndRemove({identifier: req.params.identifier})
    res.status(200).json('Характеристика успешно удалена!')
  } catch (e) {
    res.status(500).json(e)
  }
}

module.exports.getAll = async (req, res) => {
  try {
    const chars = await Char.find()
    res.status(200).json(chars)
  } catch(e) {
    res.status(500).json(e)
  }
}

// example push in array
// module.exports.addValueCharacter = async (req, res) => {
//   try {
//     await Char.findOneAndUpdate(
//       { identifier: req.params.identifier },
//       { $push: {values: req.body.value} }
//     )
//     res.status(200).json(`Значение ${req.body.value.toUpperCase()} добавлено!`)
//   } catch (e) {
//     res.status(500).json(e)
//   }
// }

module.exports.deleteValueCharacter = async (req, res) => {
  try {
    await Char.findOneAndUpdate(
      { identifier: req.params.identifier },
      { $pull: {values: {$in: [req.body.value]}} }
    )
    res.status(200).json(`Значение ${req.body.value.toUpperCase()} удалено.`)
  } catch (e) {
    res.status(500).json(e)
  }
}
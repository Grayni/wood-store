const Category = require('../models/category.model')

module.exports.create = async (req, res) => {
  try {

    const category = new Category({
      title: req.body.title,
      identifier: req.body.identifier,
      parent: req.body.parent,
      status: req.body.status
    })

    await category.save()
    res.status(201).json('Категория создана!')
  } catch (e) {
    res.status(500).json(e)
  }
}

module.exports.getAll = async (req, res) => {
  try {
    const categories = await Category.find()
    res.status(200).json(categories)
  } catch (e) {
    res.status(500).json(e)
  }
}

module.exports.getFirstborns = async (req, res) => {
  try {
    // sort for show firstborn first in list
    const firstborns = await Category.find({'parent.value': 'firstborn'}, {'title': 1, 'identifier': 1}).sort({__v: -1})
    const categories = []

    for (let i=0; i< firstborns.length; i++) {
      categories.push({'label': firstborns[i].title, 'value': firstborns[i].identifier})
    }

    res.status(200).json(categories)
  } catch (e) {
    res.status(500).json(e)
  }
}

module.exports.getCategory = async (req, res) => {
  try {
    const category = await Category.findOne({identifier: req.params.identifier}, {_id: 0, __v: 0})
    res.status(200).json(category)
  } catch (e) {
    res.status(500).json(e)
  }
}

module.exports.updateCategory = async (req, res) => {
  try {
    const $set = {}

    Object.assign($set, req.body)

    const category = await Category.findOneAndUpdate({identifier: req.params.identifier}, {$set})
    res.status(200).json('Категория успешно обновлена!')
  } catch (e) {
    res.status(500).json(e)
  }
}

// update dependencies childrens categories from parents, if parent change identifier or title
module.exports.updateFirstborns = async (req, res) => {
  try {
    const $set = {
      parent: req.body
    }
    console.log(req.body, req.params.identifier)
    await Category.updateMany({'parent.value': req.params.identifier}, {$set})
    res.status(200).json('Первородный обновлен!')
  } catch (e) {
    res.status(500).json(e)
  }
}

module.exports.removeCategory = async (req, res) => {
  try {
    await Category.findOneAndDelete({'identifier': req.params.identifier})
    res.status(200).json('Категория удалена!')
  } catch(e) {
    res.status(500).json(e)
  }
}

module.exports.changeStatus = async (req, res) => {
  try {
    const $set = {
      status: req.body.status
    }
    const response = await Category.findOneAndUpdate({identifier: req.params.identifier}, {$set})
    res.status(200).json(`Статус категории "${response.title.toUpperCase()}" изменен`)
  } catch(e) {
    res.status(500).json(e)
  }
}

module.exports.getChildrens = async (req, res) => {
  try {
    const childrens = await Category.find({'parent.value': req.params.identifier}, {title: 1, identifier: 1, _id: 0})
    res.status(200).json(childrens)
  } catch (e) {
    res.status(500).json(e)
  }
}

module.exports.getSubcategories = async (req, res) => {
  try {
    const scat = await Category
    .find({'parent.value': {$ne: 'firstborn'}}, {title: 1, identifier: 1, 'parent.label': 1, _id: 0})
    .sort({'parent.label': 1})

    const options = [
      {
        label: scat[0].parent.label,
        options: [
          {
            label: scat[0].title,
            value: scat[0].identifier
          }
        ]
      }
    ]
    // create select options for category-products
    for (let i=1; i<scat.length; i++) {
      if (scat[i].parent.label !== scat[i-1].parent.label) {

        options.push(
          {
            label: scat[i].parent.label,
            options: [
              {
                label: scat[i].title,
                value: scat[i].identifier
              }
            ]
          }
        )

      } else {
        options[options.length-1].options.push(
          {
            label: scat[i].title,
            value: scat[i].identifier
          }
        )
      }
    }

    res.status(200).json(options)
  } catch (e) {
    res.status(500).json(e)
  }
}
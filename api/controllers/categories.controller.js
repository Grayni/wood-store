const Category = require('../models/category.model')

module.exports.create = async (req, res) => {
  try {

    const category = new Category({
      title: req.body.title,
      tag: req.body.tag,
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
    const firstborns = await Category.find({'parent.value': req.body.value}, {'title': 1, 'tag': 1}).sort({__v: -1})
    const categories = []

    for (let i=0; i< firstborns.length; i++) {
      categories.push({'label': firstborns[i].title, 'value': firstborns[i].tag})
    }

    res.status(200).json(categories)
  } catch (e) {
    res.status(500).json(e)
  }
}

module.exports.getCategory = async (req, res) => {
  try {
    const category = await Category.findOne({tag: req.params.tag}, {_id: 0, __v: 0})
    res.status(200).json(category)
  } catch (e) {
    res.status(500).json(e)
  }
}

module.exports.updateCategory = async (req, res) => {
  try {
    const $set = {}

    Object.assign($set, req.body)

    const category = await Category.findOneAndUpdate({tag: req.params.tag}, {$set})
    res.status(200).json({good: 'good'})
  } catch (e) {
    res.status(500).json(e)
  }
}

module.exports.updateFirstborns = async (req, res) => {
  try {
    const $set = {
      parent: req.body
    }
    await Category.updateMany({'parent.value': req.params.tag}, {$set})
    res.status(200).json('Первородный обновлен!')
  } catch (e) {
    res.status(500).json(e)
  }
}

module.exports.removeCategory = async (req, res) => {
  try {
    await Category.findOneAndDelete({'tag': req.params.tag})
    res.status(200).json('Категория удалена!')
  } catch(e) {
    res.status(500).json(e)
  }
}

module.exports.saveStatus = async (req, res) => {
  try {
    const $set = {
      status: req.body.status
    }

    await Category.findOneAndUpdate({tag: req.params.tag}, {$set})

    res.status(200).json(`Статус категории ${req.params.tag} изменен`)
  } catch(e) {
    res.status(500).json(e)
  }
}

module.exports.getChildrens = async (req, res) => {
  try {
    const childrens = await Category.find({'parent.value': req.params.tag}, {title: 1, _id: 0})
    res.status(200).json(childrens)
  } catch (e) {
    res.status(500).json(e)
  }
}

module.exports.getSubcategories = async (req, res) => {
  try {
    const scat = await Category
    .find({'parent.value': {$ne: 'firstborn'}}, {title: 1, tag: 1, 'parent.label': 1, _id: 0})
    .sort({'parent.label': 1})

    const options = [
      {
        label: scat[0].parent.label,
        options: [
          {
            label: scat[0].title,
            value: scat[0].tag
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
                value: scat[i].tag
              }
            ]
          }
        )

      } else {
        options[options.length-1].options.push(
          {
            label: scat[i].title,
            value: scat[i].tag
          }
        )
      }
    }

    res.status(200).json(options)
  } catch (e) {
    res.status(500).json(e)
  }
}
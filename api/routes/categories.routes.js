const passport = require('passport')
const {Router} = require('express')
const controller = require('../controllers/categories.controller')
const router = Router()

// Admin

// /api/categories/admin/create-category'
router.post(
  '/admin/create-category',
  passport.authenticate('jwt', {session: false}),
  controller.create
)

// /api/categories/admin/categories-list
router.get(
  '/admin/categories-list',
  passport.authenticate('jwt', {session: false}),
  controller.getAll
)

// /api/categories/admin/subcategories
router.get(
  '/admin/subcategories',
  passport.authenticate('jwt', {session: false}),
  controller.getSubcategories
)

// /api/categories/admin/category-parent
router.post(
  '/admin/category-parent',
  passport.authenticate('jwt', {session: false}),
  controller.getFirstborns
)

// /api/categories/admin/:tag
router.get(
  '/admin/:tag',
  passport.authenticate('jwt', {session: false}),
  controller.getCategory
)

// /api/categories/admin/:tag
router.put(
  '/admin/:tag',
  passport.authenticate('jwt', {session: false}),
  controller.updateCategory
)

// /api/categories/admin/firstborns/:tag
router.put(
  '/admin/f/:tag',
  passport.authenticate('jwt', {session: false}),
  controller.updateFirstborns
)

// /api/categories/admin/:tag
router.delete(
  '/admin/:tag',
  passport.authenticate('jwt', {session: false}),
  controller.removeCategory
)

// /api/categories/admin/status/:tag
router.put(
  '/admin/status/:tag',
  passport.authenticate('jwt', {session: false}),
  controller.saveStatus
)

// /api/categories/admin/childrens/:tag
router.get(
  '/admin/childrens/:tag',
  passport.authenticate('jwt', {session: false}),
  controller.getChildrens
)

module.exports = router

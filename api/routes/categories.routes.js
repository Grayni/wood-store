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

// /api/categories/admin/:identifier
router.get(
  '/admin/:identifier',
  passport.authenticate('jwt', {session: false}),
  controller.getCategory
)

// /api/categories/admin/:identifier
router.put(
  '/admin/:identifier',
  passport.authenticate('jwt', {session: false}),
  controller.updateCategory
)

// /api/categories/admin/firstborns/:identifier
router.put(
  '/admin/f/:identifier',
  passport.authenticate('jwt', {session: false}),
  controller.updateFirstborns
)

// /api/categories/admin/:identifier
router.delete(
  '/admin/:identifier',
  passport.authenticate('jwt', {session: false}),
  controller.removeCategory
)

// /api/categories/admin/status/:identifier
router.put(
  '/admin/status/:identifier',
  passport.authenticate('jwt', {session: false}),
  controller.changeStatus
)

// /api/categories/admin/childrens/:identifier
router.get(
  '/admin/childrens/:identifier',
  passport.authenticate('jwt', {session: false}),
  controller.getChildrens
)

module.exports = router

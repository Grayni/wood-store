const passport = require('passport')
const {Router} = require('express')
const controller = require('../controllers/characteristics.controller')
const router = Router()

// /api/caracteristics/admin/characteristic-create
router.post(
  '/admin/characteristic-create',
  passport.authenticate('jwt', {session: false}),
  controller.create
)

// /api/characteristics/admin/characteristics-names-list
router.get(
  '/admin/characteristics-names-list',
  passport.authenticate('jwt', {session: false}),
  controller.getNames
)

// /api/caracteristics/admin/:identifier
router.get(
  '/admin/:identifier',
  passport.authenticate('jwt', {session: false}),
  controller.getCharacter
)

router.put(
  '/admin/:identifier',
  passport.authenticate('jwt', {session: false}),
  controller.update
)
// /api/characteristics/admin/${identifier}
router.delete(
  '/admin/:identifier',
  passport.authenticate('jwt', {session: false}),
  controller.delete
)

// /api/characteristics/admin/value/${identifier}
router.put(
  '/admin/value/:identifier',
  passport.authenticate('jwt', {session: false}),
  controller.deleteValueCharacter
)

// client

router.get( '/', controller.getAll)

module.exports = router
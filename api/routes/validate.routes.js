const {Router} = require('express')
const controller = require('../controllers/validate.controller')
const passport = require('passport')
const router = Router()

// /api/validate/unique-value
router.post(
  '/unique-value',
  passport.authenticate('jwt', {session: false}),
  controller.uniqueValue
)

router.post(
  '/check-pass',
  passport.authenticate('jwt', {session: false}),
  controller.checkPass
)
module.exports = router

// /api/validate/unique-identifier/:section
router.post(
  '/unique-identifier/:section',
  passport.authenticate('jwt', {session: false}),
  controller.checkIdentifier
)

router.post(
  '/uniqueOthers',
  passport.authenticate('jwt', {session: false}),
  controller.uniqueOthers
)
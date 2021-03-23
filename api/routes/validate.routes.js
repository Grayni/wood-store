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

// /api/validate/unique-identifier
router.post(
  '/unique-identifier',
  passport.authenticate('jwt', {session: false}),
  controller.checkIdentifier
)
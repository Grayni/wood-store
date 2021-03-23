const passport = require('passport')
const {Router} = require('express')
const controller = require('../controllers/users.controller')
const router = Router()

// /api/users/admin/id
router.delete(
  '/admin/:id',
  passport.authenticate('jwt', {session: false}),
  controller.remove
)

router.get(
  '/admin/:id',
  passport.authenticate('jwt', {session: false}),
  controller.getUserById
)

module.exports = router
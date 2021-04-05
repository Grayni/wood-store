const {Router} = require('express')
const passport = require('passport')
const controller = require('../controllers/auth.controller')
const router = Router()

// /api/auth/admin/login
router.post('/admin/login', controller.login)

// /api/auth/admin/users-list
router.get(
  '/admin/users-list',
  passport.authenticate('jwt', {session: false}),
  controller.getUsersList
)

// /api/auth/admin/create-user
router.post(
  '/admin/create-user',
  // comment password for create user and lock middleware 'admin-auth.js' !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
  passport.authenticate('jwt', {session: false}),
  controller.createUser
)

router.put(
  '/admin/update-users/:id',
  passport.authenticate('jwt', {session: false}),
  controller.updateUser
)

// /api/auth/admin/id
router.delete(
  '/admin/:id',
  passport.authenticate('jwt', {session: false}),
  controller.remove
)

router.get(
  '/admin/:id',
  passport.authenticate('jwt', {session: false}),
  controller.fetchUserById
)

module.exports = router
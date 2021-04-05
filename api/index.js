const app = require('express')()
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const passport = require('passport')
const passportStrategy = require('./middleware/passport-strategy')

// routes
const categoriesRoutes = require('./routes/categories.routes')
const authRoutes = require('./routes/auth.routes')
const validateRoutes = require('./routes/validate.routes')
const characterRoutes = require('./routes/characteristics.routes')

const keys = require('./keys/index.js')


app.disable('x-powered-by')

// mongo
  mongoose.set('useCreateIndex', true) //  useUnifiedTopology: true
  mongoose.set('useFindAndModify', false)

  mongoose.connect(keys.MONGO_URI, {useNewUrlParser: true, useUnifiedTopology: true})
  .then(() => console.log('MongoDB connected...'))
  .catch(error => console.log(error))

// passport
  app.use(passport.initialize())
  passport.use(passportStrategy)


// bodyParser
  app.use(bodyParser.urlencoded({extended: true}))
  app.use(bodyParser.json())


// routes
  app.use('/api/categories', categoriesRoutes)
  app.use('/api/auth', authRoutes)
  app.use('/api/validate', validateRoutes)
  app.use('/api/characteristics', characterRoutes)

module.exports = { handler: app }
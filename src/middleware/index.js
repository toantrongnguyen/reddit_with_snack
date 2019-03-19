// const authenticationMiddleware = require('./authentication.middleware')
const passport = require('passport')

module.exports = function middleware(app) {
  // app.use('authentication', authenticationMiddleware)
  app.use(
    '/',
    (req, res, next) => {
      if ((req.url === '/users' && req.method === 'POST') || req.url === '/authentication') {
        next()
        return
      }
      passport.authenticate('bearer', { session: false })(req, res, next)
    },
    (req, res, next) => {
      req.feathers.user = req.user
      next()
    },
  )
}
